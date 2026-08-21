/**
 * Docx surgery mechanics.
 *
 * A TypeScript port of the helpers proven on the 2026-07-31 live POC and
 * recorded at `docs/specs/form-engine-helpers.md`, with the rules from
 * `form-engine.md` §12 carried across as behaviour rather than as comments:
 *
 *  - §12.1  run-merge is a hard precondition, run before ANY anchor search;
 *  - §12.2  anchors are node-delimited, and every replacement asserts a count;
 *  - §12.3  two mechanics only — in-place text-node swap, whole-paragraph clone;
 *  - §12.4  bookmark dedup is a mandatory post-pass after any clone.
 *
 * Nothing here fabricates paragraph XML. Every structural operation captures a
 * template *from the document itself*, which is what preserves `pPr` — spacing,
 * tabs, small caps, justification — without ever parsing it. That is the whole
 * reason the engine substitutes instead of regenerating.
 */

/** Thrown when a count assertion fails. Carries the anchor so the caller can say which. */
export class DocxAssertionError extends Error {
  /** Declared rather than a constructor parameter property: the build runs with
   *  `erasableSyntaxOnly`, which rejects the shorthand. */
  anchor: string;

  constructor(message: string, anchor: string) {
    super(message);
    this.name = 'DocxAssertionError';
    this.anchor = anchor;
  }
}

// ------------------------------------------------------------ run merging

const RUN_RE = /<w:r(?: [^>]*)?>[\s\S]*?<\/w:r>/g;
const RPR_RE = /^<w:r(?: [^>]*)?>(<w:rPr>[\s\S]*?<\/w:rPr>)?/;

/** A run is mergeable only if its content is purely text nodes. A run holding a
 *  break, a tab, a field, or a drawing carries structure that concatenation
 *  would destroy. */
function runIsPlainText(run: string): boolean {
  const inner = run.replace(RPR_RE, '').replace(/<\/w:r>$/, '');
  const withoutText = inner.replace(/<w:t(?: [^>]*)?>[^<]*<\/w:t>/g, '');
  return withoutText.trim() === '';
}

function runProps(run: string): string {
  const m = run.match(RPR_RE);
  return m && m[1] ? m[1] : '';
}

function runText(run: string): string {
  let out = '';
  for (const m of run.matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)) out += m[1];
  return out;
}

/**
 * Coalesce adjacent text-only runs that share identical run properties.
 *
 * Word fragments visible text across many `<w:r>` elements for reasons that
 * have nothing to do with formatting — revision IDs, spell-check state, where
 * the cursor happened to be. On the live shell this pass coalesced 464 runs.
 * Without it, anchor strings that are plainly visible in the document simply do
 * not exist as contiguous XML and every downstream find fails, silently or
 * partially. This runs every time, before anything else looks at the XML.
 */
export function mergeRuns(xml: string): string {
  return xml.replace(/<w:p\b[^>]*(?:\/>|>[\s\S]*?<\/w:p>)/g, (para) => {
    if (!para.includes('<w:r')) return para;
    const runs = para.match(RUN_RE);
    if (!runs || runs.length < 2) return para;

    let result = para;
    // Walk runs in document order, merging each into its predecessor when the
    // properties match. Rebuild by string surgery so untouched XML is untouched.
    let i = 0;
    while (i < runs.length - 1) {
      const a = runs[i];
      const b = runs[i + 1];
      if (
        runIsPlainText(a) && runIsPlainText(b) &&
        runProps(a) === runProps(b) &&
        result.includes(a + b)
      ) {
        const merged = buildRun(runProps(a), runText(a) + runText(b));
        result = result.replace(a + b, merged);
        runs.splice(i, 2, merged);
        continue; // try to absorb the next one into the merged run too
      }
      i++;
    }
    return result;
  });
}

function buildRun(props: string, text: string): string {
  return `<w:r>${props}<w:t xml:space="preserve">${text}</w:t></w:r>`;
}

// ------------------------------------------------------- xml text escaping

export function escapeXmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function unescapeXmlText(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

// ------------------------------------------------------------ replacement

export interface ReplaceOptions {
  /** How many occurrences MUST exist. A mismatch is a wrong-shell or
   *  wrong-mapping signal and hard-fails; it is never powered through. */
  expect?: number;
  /** 1-based occurrence indices to replace. Default: all of them. */
  which?: number[];
}

/**
 * Replace `oldStr` with `newStr`, asserting the occurrence count.
 *
 * The assertion is the point. On the POC this caught a short party name
 * colliding with a longer caption line that contained it as a substring —
 * immediately, instead of silently editing the caption. Anchor at the text-node
 * level (`>NAME<`) whenever the target could be a substring of a longer line.
 */
export function replaceInXml(
  xml: string,
  oldStr: string,
  newStr: string,
  opts: ReplaceOptions = {},
): string {
  const idxs: number[] = [];
  let start = 0;
  for (;;) {
    const i = xml.indexOf(oldStr, start);
    if (i < 0) break;
    idxs.push(i);
    start = i + oldStr.length;
  }
  if (opts.expect !== undefined && idxs.length !== opts.expect) {
    throw new DocxAssertionError(
      `EXPECT ${opts.expect} got ${idxs.length} for: ${JSON.stringify(oldStr.slice(0, 70))}`,
      oldStr,
    );
  }
  const targets = opts.which ? opts.which.map((w) => idxs[w - 1]).filter((n) => n !== undefined) : idxs;
  let out = xml;
  for (const i of [...targets].sort((a, b) => b - a)) {
    out = out.slice(0, i) + newStr + out.slice(i + oldStr.length);
  }
  return out;
}

// -------------------------------------------------------------- paragraphs

/**
 * Byte offsets of the paragraph containing the `occ`-th occurrence of `anchor`.
 *
 * Self-closing empty paragraphs (`<w:p .../>`) are invisible to naive
 * `<w:p>…</w:p>` splitting, so paragraphs are NEVER indexed by position —
 * always located by anchor. That rule is inherited from the POC and is why this
 * takes an anchor and not an index.
 */
export function paraSpan(xml: string, anchor: string, occ = 1): { start: number; end: number } {
  let start = 0;
  let i = -1;
  for (let n = 0; n < occ; n++) {
    i = xml.indexOf(anchor, start);
    if (i < 0) throw new DocxAssertionError(`anchor not found: ${JSON.stringify(anchor.slice(0, 60))}`, anchor);
    start = i + anchor.length;
  }
  const s = xml.lastIndexOf('<w:p ', i);
  const sAlt = xml.lastIndexOf('<w:p>', i);
  const open = Math.max(s, sAlt);
  if (open < 0) throw new DocxAssertionError(`no enclosing paragraph for: ${anchor}`, anchor);
  const close = xml.indexOf('</w:p>', i);
  if (close < 0) throw new DocxAssertionError(`unterminated paragraph for: ${anchor}`, anchor);
  return { start: open, end: close + '</w:p>'.length };
}

export function paragraphAt(xml: string, anchor: string, occ = 1): string {
  const { start, end } = paraSpan(xml, anchor, occ);
  return xml.slice(start, end);
}

/**
 * Clone mechanic: blank every `<w:t>` in a captured paragraph template and set
 * the first to `text`. The paragraph's `pPr` survives byte-for-byte, which is
 * what preserves formatting without parsing it.
 *
 * `text` is XML-escaped here so callers pass plain strings — an ampersand in a
 * firm name would otherwise produce invalid XML that only surfaces at the
 * validate gate.
 */
export function setParagraphText(template: string, text: string): string {
  let done = false;
  let out = '';
  let pos = 0;
  for (const m of template.matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)) {
    out += template.slice(pos, m.index);
    out += `<w:t xml:space="preserve">${done ? '' : escapeXmlText(text)}</w:t>`;
    done = true;
    pos = m.index + m[0].length;
  }
  out += template.slice(pos);
  if (!done) throw new DocxAssertionError('template paragraph had no w:t node', template.slice(0, 60));
  return out;
}

/**
 * Set text run-by-run across a paragraph template, one string per text node.
 *
 * Needed where a line's runs carry different roles — §12.9's style-by-role
 * finding: a `TO:` line is a bold label run plus a roman remainder run, and
 * collapsing it into one run would inherit the label's style across the whole
 * line. Shorter arrays blank the remaining nodes.
 */
export function setParagraphRuns(template: string, texts: string[]): string {
  let n = 0;
  let out = '';
  let pos = 0;
  for (const m of template.matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)) {
    out += template.slice(pos, m.index);
    const value = n < texts.length ? escapeXmlText(texts[n]) : '';
    out += `<w:t xml:space="preserve">${value}</w:t>`;
    n++;
    pos = m.index + m[0].length;
  }
  out += template.slice(pos);
  if (n === 0) throw new DocxAssertionError('template paragraph had no w:t node', template.slice(0, 60));
  return out;
}

/**
 * Delete the whole paragraph containing `anchor` from a cloned block.
 *
 * Delete, never blank: an emptied paragraph renders as a stray blank line,
 * which is a formatting change and therefore a defect.
 */
export function deleteParagraphIn(block: string, anchor: string): string {
  const i = block.indexOf(anchor);
  if (i < 0) throw new DocxAssertionError(`clone anchor missing: ${JSON.stringify(anchor)}`, anchor);
  const s = Math.max(block.lastIndexOf('<w:p ', i), block.lastIndexOf('<w:p>', i));
  const e = block.indexOf('</w:p>', i) + '</w:p>'.length;
  return block.slice(0, s) + block.slice(e);
}

// --------------------------------------------------------------- bookmarks

/** Strip bookmarks from a fragment ABOUT TO BE CLONED, so the clone cannot
 *  duplicate bookmark IDs. */
export function stripBookmarks(frag: string): string {
  return frag.replace(/<w:bookmark(?:Start|End)\b[^>]*\/>/g, '');
}

/**
 * Global post-pass, run unconditionally after any clone-bearing edit: keep the
 * first bookmarkStart/End per ID, drop later duplicates. Duplicate IDs fail XSD
 * validation, and the failure surfaces only at the validate gate — long after
 * the edit that caused it.
 */
export function dedupBookmarks(xml: string): string {
  const seenStart = new Set<string>();
  const seenEnd = new Set<string>();
  return xml.replace(/<w:bookmark(?:Start|End)\b[^>]*\/>/g, (tag) => {
    const isStart = tag.includes('bookmarkStart');
    const idMatch = tag.match(/w:id="(\d+)"/);
    if (!idMatch) return tag;
    const pool = isStart ? seenStart : seenEnd;
    if (pool.has(idMatch[1])) return '';
    pool.add(idMatch[1]);
    return tag;
  });
}

// ------------------------------------------------------------ table rows

/** Byte offsets of the table row containing the `occ`-th occurrence of `anchor`. */
export function rowSpan(xml: string, anchor: string, occ = 1): { start: number; end: number } {
  let start = 0;
  let i = -1;
  for (let n = 0; n < occ; n++) {
    i = xml.indexOf(anchor, start);
    if (i < 0) throw new DocxAssertionError(`row anchor not found: ${JSON.stringify(anchor.slice(0, 60))}`, anchor);
    start = i + anchor.length;
  }
  const open = Math.max(xml.lastIndexOf('<w:tr ', i), xml.lastIndexOf('<w:tr>', i));
  if (open < 0) throw new DocxAssertionError(`no enclosing table row for: ${anchor}`, anchor);
  const close = xml.indexOf('</w:tr>', i);
  return { start: open, end: close + '</w:tr>'.length };
}

/** Visible text of every paragraph in a fragment, in document order. */
export function paragraphTexts(xml: string): string[] {
  const out: string[] = [];
  for (const m of xml.matchAll(/<w:p\b[^>]*(?:\/>|>[\s\S]*?<\/w:p>)/g)) {
    let text = '';
    for (const t of m[0].matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)) text += t[1];
    out.push(unescapeXmlText(text));
  }
  return out;
}

/** All visible text of a document part, paragraphs newline-separated. */
export function visibleText(xml: string): string {
  return paragraphTexts(xml).join('\n');
}
