// Cite parser/resolver — design A1, T1. Pure TypeScript, unit-tested against
// the design-space test table (docs/specs/cite-parser-test-cases.md) verbatim.
// Classifies before it links: rules, federal cites, and bill numbers are
// recognized and routed elsewhere — never mapped onto a Texas code URL.

import { CODES, resolveCode, chapterUrl, chapterFetchUrl, type CodeDef } from './codes';

export type CiteKind =
  | 'statute'
  | 'ccp-article'
  | 'constitution'
  | 'rule'
  | 'federal'
  | 'bill-number'
  | 'not-a-cite'
  /** A bare article/section with no code context — candidates listed,
   *  never silently guessed (test #19). */
  | 'ambiguous';

export interface ParsedCite {
  kind: CiteKind;
  /** Two-letter code (statute/ccp-article/constitution kinds). */
  code?: string;
  chapter?: string;
  /** Section (or CCP article) number, e.g. "153.002", "55A.053". Absent for
   *  chapter-level cites. */
  section?: string;
  /** "(b)(2)" — captured separately; the URL anchor stays the bare section. */
  subsection?: string;
  /** Constitution article (roman numeral as printed, e.g. "I"). */
  article?: string;
  /** Inclusive section range (test #22) — endpoints as printed. */
  range?: { start: string; end: string; inclusive: true };
  /** User-facing deep link (browser). Only when the code is live-verified. */
  url?: string;
  /** Machine-fetch URL on the backing file host (A2's target). */
  fetchUrl?: string;
  anchor?: string;
  /** Rule cites: which rule set (TRCP / TRE / TRAP). */
  ruleSet?: string;
  rule?: string;
  /** Bill numbers: normalized chamber+number, e.g. "HB 2929". */
  bill?: string;
  /** For 'ambiguous': the possible readings. */
  candidates?: ParsedCite[];
}

export interface ParseContext {
  /** Two-letter code hint from surrounding text (e.g. 'CR' inside a CCP
   *  chapter, or 'GV' for a §§411.x range in a Gov't Code discussion). */
  codeHint?: string;
}

const SECTION = /\d+[A-Z]?\.\d+[A-Za-z0-9-]*/;
const SUBSECTION = /((?:\(\w{1,4}\))+)/;

function chapterOf(section: string): string {
  return section.split('.')[0];
}

function statuteResult(def: CodeDef, section: string, subsection?: string): ParsedCite {
  const chapter = chapterOf(section);
  const kind: CiteKind = def.kind === 'ccp' ? 'ccp-article' : 'statute';
  const out: ParsedCite = { kind, code: def.cd, chapter, section };
  if (subsection) out.subsection = subsection;
  if (def.verified) {
    out.anchor = section;
    out.url = chapterUrl(def.cd, chapter, section);
    out.fetchUrl = chapterFetchUrl(def.cd, chapter);
  }
  return out;
}

function chapterResult(def: CodeDef, chapter: string): ParsedCite {
  const kind: CiteKind = def.kind === 'ccp' ? 'ccp-article' : 'statute';
  const out: ParsedCite = { kind, code: def.cd, chapter };
  if (def.verified) {
    out.url = chapterUrl(def.cd, chapter); // chapter-level: no anchor (test #20)
    out.fetchUrl = chapterFetchUrl(def.cd, chapter);
  }
  return out;
}

const ROMAN: Record<string, number> = {
  i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10,
  xi: 11, xii: 12, xiii: 13, xiv: 14, xv: 15, xvi: 16, xvii: 17,
};

/** Parse ONE cite string. Never guesses silently: no code context on a bare
 *  section → 'ambiguous' (with candidates) or 'not-a-cite'. */
export function parseCite(input: string, context?: ParseContext): ParsedCite {
  const s = input.trim().replace(/\s+/g, ' ');

  // ---- Guards first: things that must never become Texas statutes ----

  // Federal: U.S.C. / C.F.R. (test #26–27)
  if (/\bU\.?\s?S\.?\s?C\.?\b/i.test(s) || /\bC\.?\s?F\.?\s?R\.?\b/i.test(s)) {
    return { kind: 'federal' };
  }

  // Bill numbers: HB 2929 / S.B. 30 / "HB 2929 (2019)" (test #28)
  const bill = s.match(/^(H\.?\s?B\.?|S\.?\s?B\.?|H\.?\s?J\.?\s?R\.?|S\.?\s?J\.?\s?R\.?)\s*(\d{1,5})(?:\s*\(\d{4}\))?$/i);
  if (bill) {
    const chamber = bill[1].replace(/[^A-Za-z]/g, '').toUpperCase();
    return { kind: 'bill-number', bill: `${chamber} ${bill[2]}` };
  }

  // Cause numbers: 2025-CI-08841 and kin (test #29) — transcript routing's
  // normalizer family; do not cross wires.
  if (/^\d{2,4}-[A-Z]{1,3}-\d{3,}$/i.test(s)) return { kind: 'not-a-cite' };

  // Court rules (test #24–25): classified, not linked — different source and
  // watch channel (SCOTX orders, not bills).
  const ruleM = s.match(/^Tex\.?\s?R\.?\s?(Civ|App|Evid)\.?\s?(?:P\.?\s?)?(\d+[A-Za-z]?(?:\.\d+)?)\s*((?:\(\w{1,4}\))*)$/i);
  if (ruleM) {
    const set = { civ: 'TRCP', app: 'TRAP', evid: 'TRE' }[ruleM[1].toLowerCase()]!;
    const out: ParsedCite = { kind: 'rule', ruleSet: set, rule: ruleM[2] };
    if (ruleM[3]) out.subsection = ruleM[3];
    return out;
  }

  // Constitution: "Tex. Const. art. I, § 9" (test #21)
  const constM = s.match(/^(?:Tex(?:as)?\.?\s+)?Const(?:itution)?\.?\s+art(?:icle)?\.?\s+([IVXivx]+)\s*,?\s*§+\s*(\d+[a-z]?(?:-[a-z0-9]+)?)/i);
  if (constM) {
    const article = constM[1].toUpperCase();
    const artNum = ROMAN[constM[1].toLowerCase()];
    const out: ParsedCite = { kind: 'constitution', code: 'CN', article, section: constM[2] };
    if (artNum) {
      // Verified live: CN.{art}.htm with anchors like name="1.9".
      out.anchor = `${artNum}.${constM[2]}`;
      out.url = chapterUrl('CN', String(artNum), out.anchor);
      out.fetchUrl = chapterFetchUrl('CN', String(artNum));
      out.chapter = String(artNum);
    }
    return out;
  }

  // ---- Section ranges: "§§ 411.071–411.0775" (test #22) ----
  const rangeM = s.match(new RegExp(`^§§\\s*(${SECTION.source})\\s*[–—-]\\s*(${SECTION.source})$`));
  if (rangeM) {
    const def = context?.codeHint ? resolveCodeByCd(context.codeHint) : null;
    const base: ParsedCite = {
      kind: def?.kind === 'ccp' ? 'ccp-article' : 'statute',
      range: { start: rangeM[1], end: rangeM[2], inclusive: true },
    };
    if (!def) return { ...base, kind: 'ambiguous', candidates: [] }; // code only from context
    base.code = def.cd;
    base.chapter = chapterOf(rangeM[1]);
    if (def.verified) {
      base.url = chapterUrl(def.cd, base.chapter, rangeM[1]);
      base.fetchUrl = chapterFetchUrl(def.cd, base.chapter);
      base.anchor = rangeM[1];
    }
    return base;
  }

  // ---- Chapter-level: "Chapter 55A, Code of Criminal Procedure" (#20, #23),
  // plus the registry's name-first form "Tex. Prop. Code Ch. 55" ----
  const chapM = s.match(/^Chapter\s+(\d+[A-Z]?)\s*,\s*(.+)$/i);
  if (chapM) {
    const def = resolveCode(chapM[2]);
    if (def) return chapterResult(def, chapM[1]);
  }
  const chapNameFirst = s.match(/^(.+(?:Code|CPRC|CCP|Proc\.?))\s+Ch(?:apter)?\.?\s+(\d+[A-Z]?)$/i);
  if (chapNameFirst) {
    const def = resolveCode(chapNameFirst[1]);
    if (def) return chapterResult(def, chapNameFirst[2]);
  }

  // ---- Drafting order: "§/Section/Article <sec>(<subsec>), <Code Name>" (#14, #15, #18) ----
  const draftM = s.match(new RegExp(
    `^(?:§+|Section|Sec\\.?|Article|Art\\.?)\\s*(${SECTION.source})\\s*${SUBSECTION.source}?\\s*,\\s*(.+)$`, 'i',
  ));
  if (draftM) {
    const def = resolveCode(draftM[3]);
    if (def) return statuteResult(def, draftM[1], draftM[2]);
    return { kind: 'not-a-cite' }; // "§ 3.01 of the partnership agreement" never lands here (no comma-code)
  }

  // ---- Name-first statutory forms: "<Code Name> [§|Section] <sec>" (#1–13, #16–17) ----
  // Greedy optional prefix so "Tex. Code Crim. Proc." isn't cut off at
  // "Tex. Code", while bare "CCP"/"CPRC" still match with no prefix.
  const nameFirst = s.match(new RegExp(
    `^((?:.+\\s)?(?:Code|CPRC|CCP|Proc\\.?))\\s+(?:§+|Section|Sec\\.?|art(?:icle)?\\.?)?\\s*(${SECTION.source})\\s*${SUBSECTION.source}?$`, 'i',
  ));
  if (nameFirst) {
    const def = resolveCode(nameFirst[1]);
    if (def) return statuteResult(def, nameFirst[2], nameFirst[3]);
  }

  // ---- Bare article/section: "Art. 38.23" (#19) — context or candidates ----
  const bareM = s.match(new RegExp(`^(?:§+|Section|Sec\\.?|Art(?:icle)?\\.?)\\s*(${SECTION.source})\\s*${SUBSECTION.source}?$`, 'i'));
  if (bareM) {
    const isArticleWord = /^art/i.test(s);
    if (context?.codeHint) {
      const def = resolveCodeByCd(context.codeHint);
      if (def) return statuteResult(def, bareM[1], bareM[2]);
    }
    // No context → candidates, never a silent guess. An "Art." reading most
    // plausibly means the CCP; a "§" could be any code.
    const ccp = resolveCodeByCd('CR')!;
    const candidates: ParsedCite[] = isArticleWord ? [statuteResult(ccp, bareM[1], bareM[2])] : [];
    return { kind: 'ambiguous', section: bareM[1], subsection: bareM[2], candidates };
  }

  return { kind: 'not-a-cite' };
}

function resolveCodeByCd(cd: string): CodeDef | null {
  return CODES.find((c) => c.cd === cd.toUpperCase()) ?? null;
}
