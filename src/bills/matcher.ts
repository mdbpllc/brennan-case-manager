// Bill-text statute-reference matcher (design B2). Texas drafting
// conventions make amended statutes findable as literal strings —
// "Section 18.001, Civil Practice and Remedies Code", "Article 55A.053,
// Code of Criminal Procedure", "Chapter 55, Property Code", "Subchapter
// E-1, Chapter 411, Government Code" — extracted here and resolved through
// the T1 cite registry. Weighted suggestion, never auto-commit: output
// feeds advisory watch flags only.

import { resolveCode } from '../cites/codes';
import type { LegalRule } from '../domain/billing';
import type { BillStatuteRef } from '../domain/bills';
import { snapshotTargetsForRule } from '../statutes/tripwire';

export type ExtractedRef = Omit<BillStatuteRef, 'id' | 'trackedBillId'>;

const SECTION_TOKEN = /\d+[A-Z]?\.\d+[0-9A-Za-z-]*/g;
const CHAPTER_TOKEN = /\d+[A-Z]?/g;

// Code names capitalize substantive words but keep connectors lowercase
// ("Civil Practice and Remedies Code", "Code of Criminal Procedure").
const CODE_NAME = String.raw`((?:(?:[A-Z][A-Za-z'&.-]*|and|of)\s+)*Code(?:\s+of\s+Criminal\s+Procedure)?)`;

// "Section(s) <list>, <Code Name>" / "Article(s) <list>, Code of Criminal Procedure"
const SECTION_LIST = new RegExp(String.raw`\b(?:Section|Article)s?\s+((?:\d+[A-Z]?\.\d+[0-9A-Za-z-]*(?:\([a-z0-9-]+\))*)(?:(?:,|,?\s+and)\s+\d+[A-Z]?\.\d+[0-9A-Za-z-]*(?:\([a-z0-9-]+\))*)*)\s*,\s+${CODE_NAME}`, 'g');

// "Chapter(s) <list>, <Code Name>" — chapter-level amendments
const CHAPTER_LIST = new RegExp(String.raw`\bChapters?\s+((?:\d+[A-Z]?)(?:(?:,|,?\s+and)\s+\d+[A-Z]?)*)\s*,\s+${CODE_NAME}`, 'g');

// "Subchapter X, Chapter <n>, <Code Name>" — treated as chapter-level
const SUBCHAPTER = new RegExp(String.raw`\bSubchapter\s+[A-Z0-9-]+\s*,\s+Chapter\s+(\d+[A-Z]?)\s*,\s+${CODE_NAME}`, 'g');

function excerptAround(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + length + 40);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ').trim()}${end < text.length ? '…' : ''}`;
}

/** Every Texas-code statute reference in a bill's text, deduped. Codes the
 *  registry doesn't know (or non-TX text) simply don't match — the resolver
 *  is the gate, same classify-don't-guess posture as T1. */
export function extractStatuteRefs(text: string): ExtractedRef[] {
  const out = new Map<string, ExtractedRef>();

  const add = (code: string, chapter: string, section: string | undefined, excerpt: string) => {
    const key = `${code}|${chapter}|${section ?? ''}`;
    if (!out.has(key)) {
      out.set(key, {
        code, chapter, section,
        matchConfidence: section ? 'exact' : 'chapter',
        matchedTextExcerpt: excerpt,
      });
    }
  };

  for (const m of text.matchAll(SECTION_LIST)) {
    const def = resolveCode(m[2]);
    if (!def) continue;
    const excerpt = excerptAround(text, m.index, m[0].length);
    for (const token of m[1].match(SECTION_TOKEN) ?? []) {
      add(def.cd, token.split('.')[0], token, excerpt);
    }
  }

  for (const m of text.matchAll(CHAPTER_LIST)) {
    const def = resolveCode(m[2]);
    if (!def) continue;
    const excerpt = excerptAround(text, m.index, m[0].length);
    for (const token of m[1].match(CHAPTER_TOKEN) ?? []) {
      add(def.cd, token, undefined, excerpt);
    }
  }

  for (const m of text.matchAll(SUBCHAPTER)) {
    const def = resolveCode(m[2]);
    if (!def) continue;
    add(def.cd, m[1], undefined, excerptAround(text, m.index, m[0].length));
  }

  return [...out.values()];
}

/** Does a bill reference touch a rule's cite target? Exact section hit, or
 *  chapter overlap in either direction (a chapter-level amendment can touch
 *  any section; a section amendment touches a chapter-level cite). */
export function refTouchesTarget(
  ref: Pick<ExtractedRef, 'code' | 'chapter' | 'section'>,
  target: { code: string; chapter: string; section?: string },
): boolean {
  if (ref.code !== target.code || ref.chapter !== target.chapter) return false;
  if (ref.section && target.section) return ref.section === target.section;
  return true; // one side (or both) is chapter-level
}

/** Registry entries a bill's references touch (design B2's join). */
export function rulesTouchedByRefs(
  refs: Pick<ExtractedRef, 'code' | 'chapter' | 'section'>[],
  rules: LegalRule[],
): { rule: LegalRule; matchedRefs: string[] }[] {
  const out: { rule: LegalRule; matchedRefs: string[] }[] = [];
  for (const rule of rules) {
    const targets = snapshotTargetsForRule(rule);
    const matched = new Set<string>();
    for (const target of targets) {
      for (const ref of refs) {
        if (refTouchesTarget(ref, target)) matched.add(target.ref);
      }
    }
    if (matched.size) out.push({ rule, matchedRefs: [...matched] });
  }
  return out;
}
