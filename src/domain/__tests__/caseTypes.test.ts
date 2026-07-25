// Ladder assignment is by declaration, not name-matching (2026-07-21 audit
// item 4): every declared case type must resolve, and an undeclared one must
// fail loudly rather than silently getting a wrong-but-plausible ladder.

import { describe, expect, it } from 'vitest';
import type { PracticeArea } from '../types';
import { CASE_TYPES, STATUSES, statusesFor } from '../caseTypes';

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
