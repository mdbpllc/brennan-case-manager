// Ladder assignment is by declaration, not name-matching (2026-07-21 audit
// item 4): every declared case type must resolve, and an undeclared one must
// fail loudly rather than silently getting a wrong-but-plausible ladder.

import { describe, expect, it } from 'vitest';
import type { PracticeArea } from '../types';
import { CASE_TYPES, STATUSES, statusesFor, showsMedicalTab } from '../caseTypes';

describe('statusesFor', () => {
  it('resolves a declared ladder for every case type', () => {
    for (const pa of Object.keys(CASE_TYPES) as PracticeArea[]) {
      for (const t of CASE_TYPES[pa]) {
        const ladder = statusesFor(pa, t);
        expect(ladder.length).toBeGreaterThan(0);
        expect(ladder[ladder.length - 1]).toBe('Closed');
      }
    }
  });

  it('relief case types get the relief ladder, trial types the criminal ladder', () => {
    expect(statusesFor('Criminal', 'Expunction')).toBe(STATUSES._reliefDefault);
    expect(statusesFor('Criminal', 'Felony')).toBe(STATUSES._criminalDefault);
  });

  it('throws on an undeclared case type instead of falling through', () => {
    expect(() => statusesFor('Criminal', 'Felonyy')).toThrow(/No status ladder declared/);
    expect(() => statusesFor('Personal Injury', 'Renamed type')).toThrow(/No status ladder declared/);
  });
});

describe('showsMedicalTab — RULED 2026-08-12', () => {
  it('shows the Medical tab on personal-injury matters', () => {
    expect(showsMedicalTab('Personal Injury')).toBe(true);
  });

  it('hides it on civil litigation — a Servpro lien has no medical workup', () => {
    expect(showsMedicalTab('General Civil Litigation')).toBe(false);
  });

  it('hides it on criminal matters', () => {
    expect(showsMedicalTab('Criminal')).toBe(false);
  });

  it('is the ONLY place the rule lives, so it cannot drift between screens', () => {
    // §1983 civil-rights matters are the other half of Michael's ruling, and
    // they are NOT implementable yet: no such case type exists and PR-3 holds
    // the case-type tree shut. When the type lands, it is added HERE and
    // nowhere else. Recorded in docs/spec-feedback.md.
    const areas: PracticeArea[] = ['Personal Injury', 'General Civil Litigation', 'Criminal'];
    expect(areas.filter(showsMedicalTab)).toEqual(['Personal Injury']);
  });
});
