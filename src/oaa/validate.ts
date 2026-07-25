// Validation rules for OAA intake (spec §1c) — both tiers.

import type { CaseRecord } from '../domain/types';
import type { Charge } from '../domain/oaa';

/** The appointed attorney must be Michael. Single source for the check —
 *  accepts any reasonable variant ("Michael Brennan", "M. Brennan",
 *  "BRENNAN, MICHAEL"); the surname is the anchor. */
const ATTORNEY_SURNAME = 'BRENNAN';

export type AttorneyCheck =
  | { result: 'match'; extracted: string }
  /** The DeWitt substitution scenario: a different attorney on the order is a
   *  HARD STOP — silently proceeding is the worst failure mode (spec §1c). */
  | { result: 'mismatch'; extracted: string }
  /** Nothing extracted — review must confirm the appointment by hand. */
  | { result: 'missing' };

export function checkAttorney(extractedName: string | undefined): AttorneyCheck {
  const name = extractedName?.trim();
  if (!name) return { result: 'missing' };
  const tokens = name.toUpperCase().split(/[^A-Z]+/).filter(Boolean);
  return tokens.includes(ATTORNEY_SURNAME)
    ? { result: 'match', extracted: name }
    : { result: 'mismatch', extracted: name };
}

/** Cause numbers are compared after stripping everything but letters/digits,
 *  uppercased — "2026-05-14822" and "202605 14822" collide on purpose. */
export function normalizeCauseNumber(cause: string): string {
  return cause.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export interface DuplicateMatch {
  causeNumber: string; // as extracted
  caseId: string;
  fileNumber: string;
  caption?: string;
}

/** Duplicate-matter check (spec §1c): extracted cause numbers vs. existing
 *  cases' cause numbers and charge records. Match → the UI offers "update
 *  existing matter" instead of creating a duplicate. */
export function findDuplicateMatters(
  extractedCauses: string[],
  cases: CaseRecord[],
  charges: Charge[],
): DuplicateMatch[] {
  const byNorm = new Map<string, CaseRecord>();
  for (const c of cases) {
    if (c.causeNumber) byNorm.set(normalizeCauseNumber(c.causeNumber), c);
  }
  const caseById = new Map(cases.map((c) => [c.id, c]));
  for (const ch of charges) {
    if (!ch.causeNumber) continue;
    const rec = caseById.get(ch.caseId);
    if (rec) byNorm.set(normalizeCauseNumber(ch.causeNumber), rec);
  }

  const out: DuplicateMatch[] = [];
  const seen = new Set<string>();
  for (const cause of extractedCauses) {
    const norm = normalizeCauseNumber(cause);
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);
    const hit = byNorm.get(norm);
    if (hit) out.push({ causeNumber: cause, caseId: hit.id, fileNumber: hit.fileNumber, caption: hit.caption });
  }
  return out;
}
