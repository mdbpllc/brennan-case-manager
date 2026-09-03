/**
 * The skeleton renderer.
 *
 * BINDING INVARIANT (`form-engine.md` §1, restated by the FE-D1 slice): the
 * renderer SUBSTITUTES TOKENS IN THE REAL .docx SKELETON. It never regenerates
 * a document. Unzip → swap text nodes and clone paragraphs inside
 * `word/document.xml` → rezip. Formatting is preserved because nothing is
 * rebuilt — that is the fix for the caption-drift defect this design exists to
 * kill, and `partsDiff` is the gate that proves it held.
 *
 * SECOND BINDING INVARIANT (§5, and the slice again): WARNING GATES NEVER WRITE
 * INTO THE DOCUMENT. Gates, flags and deadline displays are wizard-screen only;
 * generated text is identical regardless of gate state. The render context has
 * no route by which a gate could reach the document, and a regression test
 * asserts byte-identical output across every gate state.
 */

import {
  readZip, writeZip, entryText, setEntryText, partsDiff, type ZipEntry,
} from './zip';
import {
  mergeRuns, setParagraphRuns, dedupBookmarks, stripBookmarks,
  paragraphTexts, visibleText, escapeXmlText, DocxAssertionError,
  setParagraphLeadAndBody, withKeepNext,
} from './docx';
import {
  parseRegionMarker, resolveTokens, harvestFilters, type TokenContext,
} from './tokens';
import { lintRender, type LintReport } from './lint';

const DOCUMENT_PART = 'word/document.xml';

/** One repeat item — a flat bag of token values scoped to this iteration. */
export type RegionItem = Record<string, string>;

/**
 * ONE narrative paragraph under an item, with its own optional bold LEAD.
 *
 * A `testifying_expert` item can carry SEVERAL of these — a treating paragraph,
 * a radiology split, a rider — and the renderer clones the archetype's own
 * `<w:p>` once for each (`#147`). Kept out of `RegionItem` deliberately: an
 * item's values are strings that get spliced into text nodes, and a narrative
 * is not one of those.
 */
export interface NarrativeParagraph {
  /** Rendered as its own explicitly-bold run, ahead of the text. */
  lead?: string;
  text: string;
}

export interface RenderContext {
  /** Document-scope scalars. */
  scalars: Record<string, string>;
  /** Repeat regions by name, each a list of per-iteration value bags. */
  regions: Record<string, RegionItem[]>;
  /** For `#select` regions: which `#case` to keep, by region name. */
  selects?: Record<string, string>;
  /** Per-item select choice, keyed `${regionName}:${index}` — the expert
   *  archetype varies per expert, not per document. */
  itemSelects?: Record<string, string>;
  /** Per-item narrative paragraphs, keyed the same way. When present, the item's
   *  archetype paragraph is cloned once per entry (the split and the rider,
   *  `#147`); when absent, the item's `__narrative` string is used as before. */
  itemNarratives?: Record<string, NarrativeParagraph[]>;
  /** Stock answers harvested from the master's `|default:` filters. */
  defaults?: Record<string, string>;
  /** Tokens whose absence drops the line (`|optional:`). */
  optional?: Set<string>;
  /** Party lines in the caption's left cell — drives the COMPUTED § count. */
  captionPartyLineCount?: number;
}

export interface RenderResult {
  docx: Uint8Array;
  /** Plain text of what was generated — what the retention record stores. */
  plainText: string;
  lint: LintReport;
  /** Members that differ from the shell. MUST be exactly [word/document.xml]. */
  changedParts: string[];
}

// --------------------------------------------------------------- regions

interface ParagraphRef {
  start: number;
  end: number;
  text: string;
}

function paragraphRefs(xml: string): ParagraphRef[] {
  const out: ParagraphRef[] = [];
  for (const m of xml.matchAll(/<w:p\b[^>]*(?:\/>|>[\s\S]*?<\/w:p>)/g)) {
    let text = '';
    for (const t of m[0].matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)) text += t[1];
    out.push({ start: m.index, end: m.index + m[0].length, text });
  }
  return out;
}

interface RegionSpan {
  kind: 'each' | 'table' | 'select';
  name: string;
  /** Offsets of the marker paragraphs themselves. */
  openStart: number;
  openEnd: number;
  closeStart: number;
  closeEnd: number;
}

/**
 * Locate the OUTERMOST region in the XML, if any.
 *
 * Rendering works outside-in and re-scans after each splice rather than
 * caching offsets, because every splice invalidates every offset after it.
 * That is slower and correct; caching would be faster and wrong.
 */
function findOutermostRegion(xml: string): RegionSpan | null {
  const paras = paragraphRefs(xml);
  for (let i = 0; i < paras.length; i++) {
    const marker = parseRegionMarker(paras[i].text);
    if (!marker || !marker.open || marker.kind === 'case') continue;

    // Find its matching close, honouring nesting of the same kind+name.
    let depth = 0;
    for (let j = i; j < paras.length; j++) {
      const m2 = parseRegionMarker(paras[j].text);
      if (!m2 || m2.kind === 'case') continue;
      const sameRegion = m2.kind === marker.kind && m2.name === marker.name;
      if (!sameRegion) continue;
      if (m2.open) depth++;
      else {
        depth--;
        if (depth === 0) {
          return {
            kind: marker.kind,
            name: marker.name,
            openStart: paras[i].start,
            openEnd: paras[i].end,
            closeStart: paras[j].start,
            closeEnd: paras[j].end,
          };
        }
      }
    }
    throw new DocxAssertionError(
      `region {{#${marker.kind} ${marker.name}}} has no matching close marker`,
      marker.name,
    );
  }
  return null;
}

/**
 * Render one token string against a scoped context, reporting unresolved.
 *
 * VALUES ARE XML-ESCAPED HERE, and that is not a detail. This function
 * substitutes into `word/document.xml` directly — tokens live inside `<w:t>`
 * nodes and run-merge has already made each one contiguous — so a value
 * containing `&` or `<` goes straight into the markup. A firm called
 * "Feldspar & Gneiss PLLC" produced a document that was not well-formed XML,
 * which Word refuses to open; the fixture carries that ampersand deliberately
 * so the case stays covered.
 *
 * The paragraph helpers in `docx.ts` escape for the same reason. Escaping is
 * done at the XML boundary rather than inside `resolveTokens`, because that
 * function is also used on PLAIN text — the §9 variant bodies — where escaping
 * would corrupt the string instead of protecting it.
 */
function scopedResolve(
  fragment: string,
  values: Record<string, string>,
  ctx: RenderContext,
): string {
  const tokenCtx: TokenContext = {
    values: escapeValues(values),
    defaults: ctx.defaults ? escapeValues(ctx.defaults) : undefined,
    optional: ctx.optional,
  };
  return resolveTokens(fragment, tokenCtx).text;
}

function escapeValues(values: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(values)) out[k] = escapeXmlText(v);
  return out;
}

/**
 * Replace the text of the first text-bearing paragraph in a fragment.
 *
 * This is how an APPROVED §9 narrative reaches the document: the master's
 * archetype block supplies the paragraph — its `pPr`, its justification, its
 * spacing — and §9's verbatim text supplies the words. The paragraph is cloned
 * from the document itself and only its `<w:t>` content changes, so this is the
 * §12.3 in-place text-node swap and not a rebuild.
 */
function overrideNarrative(fragment: string, text: string | NarrativeParagraph[]): string {
  const paras = paragraphRefs(fragment);
  for (const p of paras) {
    if (p.text.trim() === '') continue;
    if (parseRegionMarker(p.text)) continue;
    const original = fragment.slice(p.start, p.end);
    const replacement = typeof text === 'string'
      ? setParagraphRuns(original, [text])
      : renderNarrativeParagraphs(original, text);
    return fragment.slice(0, p.start) + replacement + fragment.slice(p.end);
  }
  return fragment;
}

/**
 * ONE archetype paragraph, cloned once per narrative paragraph (`#147`).
 *
 * The master renders ONE narrative per region item — a `testifying_expert` item
 * is a provider block PLUS one narrative paragraph — so the radiologist split
 * and the mid-level rider cannot be modelled as extra ITEMS: two items would
 * print the facility's block twice, which `AS-Q7c`'s block design forbids.
 *
 * Michael's ruling is to clone the archetype's OWN `<w:p>` once per paragraph:
 * §12.3 applied per paragraph rather than per record. Every paragraph emitted
 * here is a copy of the master's own markup with its text nodes swapped — its
 * `pPr`, its justification, its spacing, its run properties all come from the
 * shell. **No XML is fabricated**, which is the whole point of the mechanic.
 *
 * `keepNext` on every paragraph but the last keeps a facility's block and its
 * paragraphs on one page (§12.11).
 */
function renderNarrativeParagraphs(template: string, entries: NarrativeParagraph[]): string {
  if (entries.length === 0) return setParagraphRuns(template, ['']);
  return entries
    .map((entry, i) => {
      const body = entry.lead
        ? setParagraphLeadAndBody(template, entry.lead, entry.text)
        : setParagraphRuns(template, [entry.text]);
      return i < entries.length - 1 ? withKeepNext(body) : body;
    })
    .join('');
}

/**
 * Expand a `#select` block inside an already-scoped fragment: keep the `#case`
 * whose value matches, drop the others and every marker.
 */
function expandSelects(
  fragment: string,
  choice: string | undefined,
  narrative?: string | NarrativeParagraph[],
): string {
  let out = fragment;
  for (;;) {
    const paras = paragraphRefs(out);
    let openIdx = -1;
    let closeIdx = -1;
    let depth = 0;
    for (let i = 0; i < paras.length; i++) {
      const m = parseRegionMarker(paras[i].text);
      if (!m || m.kind !== 'select') continue;
      if (m.open) { if (depth === 0) openIdx = i; depth++; }
      else { depth--; if (depth === 0) { closeIdx = i; break; } }
    }
    if (openIdx < 0 || closeIdx < 0) return out;

    const inner = out.slice(paras[openIdx].end, paras[closeIdx].start);
    const innerParas = paragraphRefs(inner);
    let kept = '';
    let caseOpen = -1;
    let caseName = '';
    for (let i = 0; i < innerParas.length; i++) {
      const m = parseRegionMarker(innerParas[i].text);
      if (!m || m.kind !== 'case') continue;
      if (m.open) { caseOpen = i; caseName = m.name; }
      else if (caseOpen >= 0) {
        if (caseName === choice) {
          kept = inner.slice(innerParas[caseOpen].end, innerParas[i].start);
          if (narrative !== undefined && narrative !== '') kept = overrideNarrative(kept, narrative);
        }
        caseOpen = -1;
      }
    }
    out = out.slice(0, paras[openIdx].start) + kept + out.slice(paras[closeIdx].end);
  }
}

/**
 * Expand a `#table` region: repeat the specimen data row once per item.
 *
 * The specimen row is located by CONTENT — the row carrying the item's own
 * tokens — never by position, for the same reason paragraphs are never indexed
 * by position: a self-closing or merged row silently shifts every index.
 */
function expandTableRegion(
  body: string,
  items: RegionItem[],
  ctx: RenderContext,
): string {
  const tbl = body.match(/<w:tbl>[\s\S]*<\/w:tbl>/);
  if (!tbl) throw new DocxAssertionError('table region contains no <w:tbl>', 'table');

  const itemFields = new Set(items.flatMap((i) => Object.keys(i)));
  const rows = [...tbl[0].matchAll(/<w:tr\b[^>]*>[\s\S]*?<\/w:tr>/g)];
  let specimen: RegExpMatchArray | undefined;
  for (const r of rows) {
    const text = visibleText(r[0]);
    const hasItemToken = [...itemFields].some((f) => text.includes(`{{${f}}}`) || text.includes(`{${f}}`));
    if (hasItemToken) { specimen = r; break; }
  }
  if (!specimen) {
    // No specimen row means the table carries no per-item row; leave it be and
    // let the lint report the tokens that survive rather than guessing.
    return body;
  }

  const rendered = items
    .map((item) => scopedResolve(stripBookmarks(specimen[0]), { ...ctx.scalars, ...item }, ctx))
    .join('');

  // Splice on the specimen row's OWN offset. An earlier version re-found the
  // row by using its first 40 characters as an anchor, which is generic run
  // markup — `<w:tr w:rsidR="…"` — and matched the HEADER row instead, leaving
  // the specimen row unexpanded and its tokens to survive into the document.
  // Offsets inside the table are stable here because nothing before this point
  // has edited `body`.
  const tblStart = body.indexOf(tbl[0]);
  if (specimen.index === undefined) {
    throw new DocxAssertionError('specimen row has no source offset', 'table');
  }
  const start = tblStart + specimen.index;
  const end = start + specimen[0].length;
  return body.slice(0, start) + rendered + body.slice(end);
}

/**
 * Delete paragraphs that a substitution emptied — never blank-and-leave.
 *
 * §12.3: "an emptied paragraph renders as a stray blank line — a formatting
 * change." A contact block whose second address line is absent must close up,
 * not leave a gap. Only paragraphs that CARRIED TOKENS and are now empty are
 * removed; the shell's own deliberate spacer paragraphs never held a token, so
 * they are untouched and the §8 spacing survives.
 */
function dropEmptiedParagraphs(before: string, after: string): string {
  const beforeParas = paragraphRefs(before);
  const afterParas = paragraphRefs(after);
  if (beforeParas.length !== afterParas.length) return after;

  let out = '';
  let pos = 0;
  for (let i = 0; i < afterParas.length; i++) {
    const hadToken = /\{\{?[^{}]+\}?\}/.test(beforeParas[i].text);
    const isEmptyNow = afterParas[i].text.trim() === '';
    if (hadToken && isEmptyNow) {
      out += after.slice(pos, afterParas[i].start);
      pos = afterParas[i].end;
    }
  }
  out += after.slice(pos);
  return out;
}

/**
 * Expand an `#each` region: rebuild the span from the specimen block, once per
 * item, preserving the document's own inter-item spacing.
 *
 * This is §12.3's span-capture-and-rebuild: the document supplies its own
 * templates and its own spacer; the engine never fabricates paragraph XML.
 */
function expandEachRegion(
  body: string,
  items: RegionItem[],
  regionName: string,
  ctx: RenderContext,
): string {
  const specimen = stripBookmarks(body);
  if (items.length === 0) return '';
  return items
    .map((item, index) => {
      const choice = ctx.itemSelects?.[`${regionName}:${index}`] ?? ctx.selects?.[regionName];
      // `__narrative` is a rendered paragraph, not a token — it is pulled out
      // before substitution so it can never be treated as a value to splice
      // into a `<w:t>` node alongside the others.
      const { __narrative: narrative, ...values } = item;
      const paragraphs = ctx.itemNarratives?.[`${regionName}:${index}`];
      const selected = expandSelects(specimen, choice, paragraphs ?? narrative);
      const resolved = scopedResolve(selected, { ...ctx.scalars, ...values }, ctx);
      return dropEmptiedParagraphs(selected, resolved);
    })
    .join('');
}

// -------------------------------------------------- computed § column (§8)

/**
 * Recompute the caption's middle column.
 *
 * §8 is explicit: vertical alignment is paragraph-count dependent and the
 * engine must COMPUTE the `§` count from the number of party lines — NEVER
 * freeze at 12. Michael's master is frozen at 12 (measured 2026-08-20: three
 * cells of twelve paragraphs each), so this is the one §11.3 item the supplied
 * artifact did not already carry, and it is done here rather than in the file.
 *
 * The rule: all three caption cells carry the same paragraph count, and that
 * count is driven by whichever cell needs the most lines. Growing the party
 * block therefore grows the § column and the court block with it, which is what
 * keeps the three columns vertically aligned.
 */
export function recomputeCaptionSectionMarks(xml: string, partyLineCount: number): string {
  const tblMatch = xml.match(/<w:tbl>[\s\S]*?<\/w:tbl>/);
  if (!tblMatch) return xml;
  const tbl = tblMatch[0];
  const cells = [...tbl.matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)];
  if (cells.length !== 3) return xml;

  const cellParas = cells.map((c) => [...c[0].matchAll(/<w:p\b[^>]*(?:\/>|>[\s\S]*?<\/w:p>)/g)]);
  const current = cellParas[1].length;
  const target = Math.max(partyLineCount, cellParas[0].length, cellParas[2].length);
  if (target === current || target < 1) return xml;

  let newTbl = tbl;
  for (let ci = 0; ci < 3; ci++) {
    const paras = cellParas[ci];
    const have = paras.length;
    if (target === have) continue;
    const cellXml = cells[ci][0];
    let newCell = cellXml;
    if (target > have) {
      // Clone the cell's own LAST paragraph as the spacer template, blanked.
      // The middle column clones a § paragraph so the marks keep coming; the
      // outer columns clone a blank so nothing is invented.
      const template = ci === 1 ? paras[paras.length - 1][0] : paras[paras.length - 1][0];
      const blank = ci === 1 ? template : setParagraphRuns(template, ['']);
      const add = Array.from({ length: target - have }, () => stripBookmarks(blank)).join('');
      const lastEnd = paras[paras.length - 1].index + paras[paras.length - 1][0].length;
      newCell = cellXml.slice(0, lastEnd) + add + cellXml.slice(lastEnd);
    } else {
      // Trim from the end, but only paragraphs that are blank — never drop a
      // party line to make the count fit.
      let removed = 0;
      newCell = cellXml;
      for (let i = paras.length - 1; i >= 0 && removed < have - target; i--) {
        const pText = paragraphTexts(paras[i][0])[0] ?? '';
        if (ci !== 1 && pText.trim() !== '') continue;
        newCell = newCell.replace(paras[i][0], '');
        removed++;
      }
    }
    newTbl = newTbl.replace(cellXml, newCell);
  }
  return xml.replace(tbl, newTbl);
}

// ----------------------------------------------------------- the render

export async function renderInstrument(
  skeleton: Uint8Array,
  ctx: RenderContext,
): Promise<RenderResult> {
  const shell = await readZip(skeleton);
  const original = entryText(shell, DOCUMENT_PART);

  // §12.1 — run-merge FIRST, every time, before any anchor search.
  let xml = mergeRuns(original);

  // Harvest the master's own stock answers so `|default:` survives import as a
  // setting (FC-2) rather than being discarded.
  const harvested = harvestFilters(visibleText(xml));
  const merged: RenderContext = {
    ...ctx,
    defaults: { ...harvested.defaults, ...ctx.defaults },
    optional: new Set([...harvested.optional, ...(ctx.optional ?? [])]),
  };

  // Regions, outermost first, re-scanning after every splice.
  let guard = 0;
  for (;;) {
    if (guard++ > 200) throw new DocxAssertionError('region expansion did not converge', 'region');
    const region = findOutermostRegion(xml);
    if (!region) break;
    const body = xml.slice(region.openEnd, region.closeStart);
    const items = merged.regions[region.name] ?? [];
    const expanded = region.kind === 'table'
      ? expandTableRegion(body, items, merged)
      : expandEachRegion(body, items, region.name, merged);
    xml = xml.slice(0, region.openStart) + expanded + xml.slice(region.closeEnd);
  }

  // §8 — the computed § column. Done AFTER region expansion so the party block
  // has its final line count.
  if (merged.captionPartyLineCount !== undefined) {
    xml = recomputeCaptionSectionMarks(xml, merged.captionPartyLineCount);
  }

  // Document-scope scalars last, so a region item never has its value shadowed
  // by a same-named document scalar.
  xml = scopedResolve(xml, merged.scalars, merged);

  // §12.4 — mandatory global post-pass after any clone-bearing edit.
  xml = dedupBookmarks(xml);

  const out: ZipEntry[] = setEntryText(shell, DOCUMENT_PART, xml);
  const docx = await writeZip(out);

  const plainText = visibleText(xml);
  const lint = lintRender(plainText, xml);
  const changedParts = partsDiff(shell, out);

  return { docx, plainText, lint, changedParts };
}
