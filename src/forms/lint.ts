/**
 * FE-10 render lint — built from birth, per the FE-D1 slice.
 *
 * Two jobs the slice names explicitly:
 *  - the unfilled-token scan, which is §14's placeholder discipline automated
 *    ("a document ships with zero unaccounted placeholders");
 *  - the numbering pass: gapless, duplicate-free VISIBLE numbering, and
 *    continuous LOGICAL numbering with no hard-coded restarts.
 *
 * It also carries the consistency class the master's own defect table records
 * (D-1 to D-4): caption parties, the TO: list, the certificate list and the
 * (b)(1) response all naming the same people. In the exemplar this master was
 * built from, those four lists named parties from FIVE different matters and
 * the document was served anyway.
 *
 * WHAT THIS DOES NOT DO — and it matters: lint findings NEVER change the
 * generated text. They are reported beside the document, exactly as §5's
 * warning gates are reported beside the wizard. A lint that edited the document
 * would be the same defect class as a gate that wrote into it.
 *
 * REFUSE-OR-WARN IS UNRULED. `REQ-CAPTURE_disclosures-master-skeleton_
 * 2026-08-20.md` §5 Q5 asks whether a consistency mismatch should refuse to
 * render or render with a warning, and observes that a hard refusal mid-draft
 * would be worse than useless. It is not ruled, so this reports severity and
 * refuses nothing; the caller decides. Recorded in `docs/spec-feedback.md`.
 */

export type LintSeverity = 'error' | 'warning' | 'info';

export interface LintFinding {
  rule: string;
  severity: LintSeverity;
  message: string;
  detail?: string;
}

export interface LintReport {
  findings: LintFinding[];
  /** Canonical names of tokens that survived the render. */
  unresolvedTokens: string[];
  /** True when nothing at `error` severity was found. Advisory: the caller
   *  decides what to do with it — this module refuses nothing. */
  clean: boolean;
}

/**
 * The firm's legacy four-digit merge tokens.
 *
 * D-5: the served exemplar carried `1111` (a party) and `2222` (a date)
 * unreplaced through roughly a dozen sentences of its expert section — a served
 * document with visible placeholders that nobody caught. REQ-06 requires the
 * gate to recognise this family as well as the current one, so a document that
 * merely LOOKS clean of `{{…}}` is still checked for it.
 */
const LEGACY_NUMERIC_TOKENS = /(?<![\d.,($/-])(1111|2222|3333|4444)(?![\d.,)%$/-])/g;

const SURVIVING_TOKEN = /\{\{?([^{}]+)\}?\}/g;
const REGION_MARKER = /\{\{[#/](each|table|select|case)\b[^}]*\}\}/g;

export function lintRender(plainText: string, xml?: string): LintReport {
  const findings: LintFinding[] = [];
  const unresolved = new Set<string>();

  // ---- unfilled tokens (§14, REQ-06) ----
  for (const m of plainText.matchAll(SURVIVING_TOKEN)) {
    const body = m[1].trim();
    if (/^[#/]/.test(body)) continue; // markers get their own rule
    const name = body.split('|')[0].trim();
    unresolved.add(name);
  }
  if (unresolved.size > 0) {
    findings.push({
      rule: 'unresolved-token',
      severity: 'error',
      message: `${unresolved.size} token${unresolved.size === 1 ? '' : 's'} survived the render.`,
      detail: [...unresolved].sort().join(', '),
    });
  }

  // ---- legacy numeric tokens (D-5) ----
  const legacy = [...new Set([...plainText.matchAll(LEGACY_NUMERIC_TOKENS)].map((m) => m[1]))];
  if (legacy.length > 0) {
    findings.push({
      rule: 'legacy-numeric-token',
      severity: 'error',
      message: 'Legacy numeric merge tokens are still present in the document text.',
      detail: legacy.join(', '),
    });
  }

  // ---- region markers must never reach the document ----
  const markers = [...new Set([...plainText.matchAll(REGION_MARKER)].map((m) => m[0]))];
  if (markers.length > 0) {
    findings.push({
      rule: 'unstripped-region-marker',
      severity: 'error',
      message: 'Repeat-region markers survived into the document.',
      detail: markers.join(' '),
    });
  }

  findings.push(...lintNumbering(plainText));
  findings.push(...lintPartyConsistency(plainText));
  if (xml) {
    findings.push(...lintPagination(xml));
    findings.push(...lintXmlSafety(xml));
  }

  return {
    findings,
    unresolvedTokens: [...unresolved].sort(),
    clean: !findings.some((f) => f.severity === 'error'),
  };
}

// ------------------------------------------------------------- numbering

/**
 * The numbering pass.
 *
 * Visible numbering must be gapless and duplicate-free; logical numbering must
 * be continuous, with no hard-coded restarts. Both sequences in this instrument
 * are hand-typed labels in the template rather than Word list numbering, which
 * is exactly why they need checking: a hand-typed `(7)` that should read `(6)`
 * renders perfectly and is wrong.
 */
export function lintNumbering(plainText: string): LintFinding[] {
  const findings: LintFinding[] = [];
  const lines = plainText.split('\n');

  // 194.2(b)(n) — the twelve disclosure items.
  const ruleItems: number[] = [];
  for (const line of lines) {
    const m = line.trim().match(/^194\.2\(b\)\((\d+)\)/);
    if (m) ruleItems.push(Number(m[1]));
  }
  findings.push(...checkSequence(ruleItems, '194.2(b)', 'numbering-194-2b'));

  // 195.5(a) subitems (1)-(4). Only counted inside the 195.5 block, so the
  // (b)(n) labels above cannot bleed into this sequence.
  const start = lines.findIndex((l) => /^195\.5\(a\)/.test(l.trim()));
  if (start >= 0) {
    const subs: number[] = [];
    for (let i = start; i < lines.length; i++) {
      const t = lines[i].trim();
      if (/^194\.2\(b\)\(6\)/.test(t)) break; // the instrument resumes here
      // The subitem label runs straight into its text — "(2)The subject matter"
      // — with no space. Requiring that is what keeps a phone number out of the
      // sequence: "(555) 010-4400" has a space and one to two digits does not
      // describe it either. An earlier pass read the fixture's area codes as
      // subitems and reported 550 missing items.
      const m = t.match(/^\((\d{1,2})\)(?=[A-Za-z])/);
      if (m) subs.push(Number(m[1]));
    }
    findings.push(...checkSequence(subs, '195.5(a)', 'numbering-195-5a'));
  }

  return findings;
}

function checkSequence(nums: number[], label: string, rule: string): LintFinding[] {
  if (nums.length === 0) return [];
  const findings: LintFinding[] = [];

  const dupes = nums.filter((n, i) => nums.indexOf(n) !== i);
  if (dupes.length > 0) {
    findings.push({
      rule,
      severity: 'error',
      message: `${label} numbering repeats an item.`,
      detail: `duplicated: ${[...new Set(dupes)].join(', ')}`,
    });
  }

  const gaps: number[] = [];
  for (let i = 1; i <= Math.max(...nums); i++) if (!nums.includes(i)) gaps.push(i);
  if (gaps.length > 0) {
    findings.push({
      rule,
      severity: 'error',
      message: `${label} numbering has gaps.`,
      detail: `missing: ${gaps.join(', ')}`,
    });
  }

  // A hard-coded restart: the sequence goes back down without a new block.
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      findings.push({
        rule,
        severity: 'warning',
        message: `${label} numbering restarts mid-sequence.`,
        detail: `…${nums[i - 1]} then ${nums[i]}`,
      });
      break;
    }
  }
  return findings;
}

// ----------------------------------------------------------- consistency

/**
 * REQ-11 / defects D-1 to D-4: the same parties must appear in the caption, the
 * TO: block, the certificate of service and the (b)(1) party response.
 *
 * Reported, never enforced — see the refuse-or-warn note at the top.
 */
export function lintPartyConsistency(plainText: string): LintFinding[] {
  const lines = plainText.split('\n').map((l) => l.trim());
  const findings: LintFinding[] = [];

  const toNames = new Set<string>();
  for (const l of lines) {
    const m = l.match(/^TO:\s*DEFENDANT\s+(.+?),\s*by and through/i);
    if (m) toNames.add(normalizeName(m[1]));
  }

  const itemOneNames = new Set<string>();
  for (const l of lines) {
    const m = l.match(/^Defendant:\s*(.+)$/);
    if (m) itemOneNames.add(normalizeName(m[1]));
  }

  const servedNames = new Set<string>();
  for (let i = 0; i < lines.length; i++) {
    if (/^ATTORNEY FOR DEFENDANT$/i.test(lines[i]) && i + 1 < lines.length) {
      servedNames.add(normalizeName(lines[i + 1]));
    }
  }

  const compare = (a: Set<string>, b: Set<string>, aLabel: string, bLabel: string) => {
    if (a.size === 0 || b.size === 0) return;
    const onlyA = [...a].filter((n) => !b.has(n));
    const onlyB = [...b].filter((n) => !a.has(n));
    if (onlyA.length || onlyB.length) {
      findings.push({
        rule: 'party-consistency',
        severity: 'warning',
        message: `${aLabel} and ${bLabel} do not name the same parties.`,
        detail: [
          onlyA.length ? `only in ${aLabel}: ${onlyA.join('; ')}` : '',
          onlyB.length ? `only in ${bLabel}: ${onlyB.join('; ')}` : '',
        ].filter(Boolean).join(' · '),
      });
    }
  };

  compare(toNames, itemOneNames, 'the TO: block', 'the 194.2(b)(1) response');
  compare(toNames, servedNames, 'the TO: block', 'the certificate of service');

  // D-4's second half: the exemplar repeated one defendant four times.
  const seen = new Map<string, number>();
  for (const l of lines) {
    const m = l.match(/^Defendant:\s*(.+)$/);
    if (!m) continue;
    const k = normalizeName(m[1]);
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  const repeated = [...seen.entries()].filter(([, n]) => n > 1);
  if (repeated.length > 0) {
    findings.push({
      rule: 'party-duplicate',
      severity: 'warning',
      message: 'The 194.2(b)(1) response lists the same party more than once.',
      detail: repeated.map(([n, c]) => `${n} ×${c}`).join('; '),
    });
  }

  return findings;
}

function normalizeName(raw: string): string {
  return raw.replace(/[.,]+$/, '').replace(/\s+/g, ' ').trim().toUpperCase();
}

// ------------------------------------------------------------ pagination

/**
 * The cheap half of §12.5's first ship gate.
 *
 * Full XSD validation needs a schema processor that neither the browser nor
 * vitest has. What IS checkable here is the failure mode that actually
 * occurred: a substituted value carrying `&` or `<` straight into the markup,
 * which makes `word/document.xml` not well-formed and makes Word refuse the
 * file. A firm called "Feldspar & Gneiss PLLC" did exactly that during this
 * build, and an ampersand in a firm name is entirely ordinary.
 *
 * This is an ERROR, not a warning: an unopenable document is not a judgment
 * call. It is also the one lint rule that reads the XML rather than the text,
 * because by the time a bad ampersand reaches the plain text it looks fine.
 */
export function lintXmlSafety(xml: string): LintFinding[] {
  const findings: LintFinding[] = [];

  const bareAmp = [...xml.matchAll(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g)];
  if (bareAmp.length > 0) {
    findings.push({
      rule: 'xml-unescaped-ampersand',
      severity: 'error',
      message: `${bareAmp.length} unescaped ampersand(s) in the document XML — Word will refuse this file.`,
      detail: xml.slice(Math.max(0, bareAmp[0].index - 40), bareAmp[0].index + 40),
    });
  }

  // A stray `<` inside a text node. `[^<]*` is how every text node in this
  // engine is matched, so an unescaped `<` silently TRUNCATES one rather than
  // erroring — worse than the ampersand case, not better, because the document
  // still opens and simply loses text.
  const strayLt = xml.match(/<w:t(?: [^>]*)?>[^<]*<(?!\/w:t>)/);
  if (strayLt) {
    findings.push({
      rule: 'xml-malformed-text-node',
      severity: 'error',
      message: 'A text node is not closed by </w:t> — a value probably contained a raw "<".',
      detail: strayLt[0].slice(0, 80),
    });
  }

  return findings;
}

/**
 * D-11: the exemplar pushed content to the next page with runs of empty
 * paragraphs, which reflow the moment any upstream content changes length.
 * Explicit page breaks are the fix; this flags the pattern reappearing.
 */
export function lintPagination(xml: string): LintFinding[] {
  // Table content is excluded. §8 requires the caption's three cells to carry
  // equal paragraph counts, several of them deliberately empty spacers — that
  // is structural vertical alignment, not pagination padding, and counting it
  // made the rule fire on every correctly-built document.
  const body = xml.replace(/<w:tbl>[\s\S]*?<\/w:tbl>/g, '');
  const paras = [...body.matchAll(/<w:p\b[^>]*(?:\/>|>[\s\S]*?<\/w:p>)/g)].map((m) => m[0]);
  let run = 0;
  let worst = 0;
  for (const p of paras) {
    const hasText = /<w:t(?: [^>]*)?>[^<]/.test(p);
    const hasBreak = /<w:br\b/.test(p);
    if (!hasText && !hasBreak) { run++; worst = Math.max(worst, run); }
    else run = 0;
  }
  if (worst >= 4) {
    return [{
      rule: 'empty-paragraph-pagination',
      severity: 'warning',
      message: 'A run of empty paragraphs is being used to push content down the page.',
      detail: `longest run: ${worst} consecutive empty paragraphs — use an explicit page break instead`,
    }];
  }
  return [];
}
