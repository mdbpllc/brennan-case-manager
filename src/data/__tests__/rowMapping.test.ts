// Update-row mapping. This exists because of a silent, live defect: on
// Supabase, "Undo disbursed" did nothing at all, and so did every other
// clear-a-field action, while the same clicks worked in demo mode.
//
// The two adapters must agree on what a patch MEANS (2026-07-21 audit item 9).
// The local adapter's semantics are the canonical ones, because they fall out
// of `{ ...record, ...patch }`:
//   - key absent        → leave the column alone
//   - key === undefined → clear it
// `toRow` collapsed both to "leave alone", so Postgres was the outlier.

import { describe, it, expect } from 'vitest';
import { toUpdateRow } from '../supabaseAdapter';

describe('toUpdateRow', () => {
  it('maps a present-but-undefined key to null so the column is CLEARED', () => {
    // The exact payload behind "Undo disbursed".
    expect(toUpdateRow({ disbursedAt: undefined })).toEqual({ disbursed_at: null });
  });

  it('never produces an empty update from a non-empty patch', () => {
    // The failure mode itself: an empty object asks Postgres to change nothing,
    // and PostgREST reports that as success. Silent no-op.
    const patch = { disbursedAt: undefined };
    expect(Object.keys(toUpdateRow(patch)).length).toBe(Object.keys(patch).length);
  });

  it('leaves absent keys absent — untouched columns stay untouched', () => {
    expect(toUpdateRow({ posture: 'claimant' })).toEqual({ posture: 'claimant' });
  });

  it('camelCase → snake_case, including multi-word keys', () => {
    expect(toUpdateRow({ statuteOfLimitations: '2028-07-28', solBasis: undefined }))
      .toEqual({ statute_of_limitations: '2028-07-28', sol_basis: null });
  });

  it('passes falsy values through instead of nulling them', () => {
    // 0, '' and false are values, not absences — nulling them would be a
    // different bug in the opposite direction.
    expect(toUpdateRow({ displayOrder: 0, notes: '', mtrMta: false }))
      .toEqual({ display_order: 0, notes: '', mtr_mta: false });
  });

  it('leaves JSON payloads intact', () => {
    const fee = { type: 'contingency', contingencyPercent: 33.33 };
    expect(toUpdateRow({ feeArrangement: fee })).toEqual({ fee_arrangement: fee });
  });
});

describe('adapter parity on clearing a field', () => {
  /** What the local adapter does, reduced to one line. */
  function localApply<T extends object>(record: T, patch: Partial<T>): T {
    return { ...record, ...patch };
  }

  it('local clears on present-undefined — the behaviour Supabase now matches', () => {
    const client = { id: 'c1', disbursedAt: '2026-07-29' };
    const after = localApply(client, { disbursedAt: undefined });
    expect(after.disbursedAt).toBeUndefined();

    // Same patch, Supabase side: an explicit null, not a dropped key.
    expect(toUpdateRow({ disbursedAt: undefined })).toEqual({ disbursed_at: null });
  });

  it('local leaves absent keys alone — so does the row mapping', () => {
    const client = { id: 'c1', disbursedAt: '2026-07-29', posture: 'claimant' };
    const after = localApply(client, { posture: 'defendant' });
    expect(after.disbursedAt).toBe('2026-07-29');
    expect(toUpdateRow({ posture: 'defendant' })).not.toHaveProperty('disbursed_at');
  });
});
