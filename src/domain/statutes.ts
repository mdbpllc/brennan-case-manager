// Statute cache domain — statute-text-and-bill-tracking-design.md Module A (T2).
// The cache holds current-codification chapter text from the official site;
// per-section content hashes feed the A4 tripwire (registry re-verification
// flags). Advisory only, system-wide: nothing here ever touches a rule's
// verified status (registry rules 1–2).

import { codeByCd } from '../cites/codes';
import type { ParsedCite } from '../cites/parser';

/** O2 decision (Michael, 2026-07-25): the firm's working-set codes — the
 *  design's core nine plus TX, LG, and TN (Michael's addition). Prefetch and
 *  T3 watch scoping key off this list. */
export const WORKING_SET_CODES = [
  'FA', 'PE', 'CR', 'CP', 'GV', 'HS', 'IN', 'PR', 'ES', 'TX', 'LG', 'TN',
] as const;

/** One cached chapter file from the official site (design §6 statute_cache). */
export interface StatuteChapter {
  id: string;
  /** Two-letter site code, e.g. 'CP'. */
  code: string;
  /** Chapter as in the file name, e.g. '41', '55A'. */
  chapter: string;
  /** From the file's <title>, e.g. "CIVIL PRACTICE AND REMEDIES CODE CHAPTER 41. DAMAGES". */
  title?: string;
  sourceUrl: string;
  /** Raw chapter HTML as served — kept verbatim so parses can be re-run. */
  html: string;
  fetchedAt: string;
}

/** Chapter without the (large) html payload — for list views. */
export type StatuteChapterMeta = Omit<StatuteChapter, 'html'>;

/** One section extracted from a cached chapter (design §6 statute_sections). */
export interface StatuteSection {
  id: string;
  chapterId: string;
  code: string;
  chapter: string;
  /** As anchored in the file, e.g. '41.0105', '55A.053'. */
  sectionNumber: string;
  /** "DEFINITIONS." — from the section heading line, when present. */
  heading?: string;
  /** Normalized plain text of the section incl. source credits. */
  text: string;
  /** Hash of the normalized text — the tripwire's change signal. */
  contentHash: string;
}

/** Pins the text a verification actually saw (design §6 / A4). */
export interface RegistryVerificationSnapshot {
  id: string;
  ruleId: string;
  /** 'CP 41.0105' (section) or 'PR ch. 55' (whole chapter). */
  sectionRef: string;
  contentHash: string;
  verifiedAt: string;
}

export type WatchFlagKind =
  | 'text-changed-since-verified' // A4 tripwire
  | 'section-removed'             // A4 tripwire: cited section gone from a refreshed chapter (repeal/renumbering)
  | 'pending-bill'                // B2 (T3)
  | 'enacted-change-pending';     // B3 (T3)

/** Advisory watch flag on a registry entry (design §6 watch_flags). */
export interface WatchFlag {
  id: string;
  ruleId: string;
  kind: WatchFlagKind;
  /** What raised it: a sectionRef (A4) or bill number (T3). */
  sourceRef: string;
  detail?: string;
  /** enacted-change-pending only: when the change takes effect — the flag
   *  joins the re-verification worklist on that date (B3). */
  effectiveDate?: string;
  raisedAt: string;
  clearedAt?: string;
  clearedBy?: string;
}

// ---- sectionRef helpers ----

export function sectionRef(code: string, sectionNumber: string): string {
  return `${code} ${sectionNumber}`;
}

export function chapterRef(code: string, chapter: string): string {
  return `${code} ch. ${chapter}`;
}

/** The snapshot target for a parsed cite: a section ref, a chapter ref for
 *  chapter-level cites, or null for anything that isn't a cacheable TX
 *  statute (case law, federal, rules, unverified codes). */
export function snapshotRefForCite(parsed: ParsedCite): { ref: string; code: string; chapter: string; section?: string } | null {
  if (parsed.kind !== 'statute' && parsed.kind !== 'ccp-article') return null;
  if (!parsed.code || !parsed.chapter || !parsed.url) return null; // unverified codes never got a URL
  if (parsed.section) {
    return { ref: sectionRef(parsed.code, parsed.section), code: parsed.code, chapter: parsed.chapter, section: parsed.section };
  }
  return { ref: chapterRef(parsed.code, parsed.chapter), code: parsed.code, chapter: parsed.chapter };
}

export function flagKindLabel(kind: WatchFlagKind): string {
  switch (kind) {
    case 'text-changed-since-verified': return 'Text changed since verification';
    case 'section-removed': return 'Cited section removed (repealed or renumbered)';
    case 'pending-bill': return 'Pending bill';
    case 'enacted-change-pending': return 'Enacted change pending';
  }
}

/** Copyable cite text for the viewer's per-section button. */
export function formatCite(code: string, sectionNumber: string): string {
  const def = codeByCd(code);
  if (!def) return sectionNumber;
  if (def.kind === 'ccp') return `${def.name} art. ${sectionNumber}`;
  if (def.kind === 'constitution') return `Tex. Const. ${sectionNumber}`;
  return `${def.name} § ${sectionNumber}`;
}
