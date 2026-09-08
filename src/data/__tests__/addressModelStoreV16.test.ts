// THE ADDRESS MODEL — the v15 → v16 demo-store migration.
//
// Authority: docs/specs/cc1-rulings-and-address-model-slice.md §2.2 (D1 and
// D1(iii), Michael's words 2026-09-07, session log #149), §5.2 and §5.3.
//
// WHAT THIS STEP IS. Michael was offered three places to split a one-line
// address and chose the first: ***"1"*** — once, at the record, by the step
// that adds the two fields, each split row MARKED, confirm-or-edit on the party
// page, and THE RENDER PATH NEVER PARSES. This function is one of the two
// places the rule runs; `db/migrations/2026-09-07-address-model-split.sql` is
// the other, over the live rows.
//
// The seed's own facilities are the fixture on purpose. `p-hosp-ctrmc` carries
// ONE location written as a single line — "3100 S 31st St, Temple, TX" — and
// `p-prov-procare` carries two, so the step is exercised on the records the
// slice's §3 item 17(g) names, not on a fixture written to make it pass.

import { describe, it, expect, beforeEach } from 'vitest';
import { splitMark } from '../../domain/addressSplit';
import type { PartyRecord } from '../../domain/types';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { migrateV15ToV16, STORE_VERSION } = await import('../localAdapter');
const { seedData } = await import('../seed');

const KEY = 'brennan-case-manager-v1';

type Loc = Record<string, unknown>;
type Party = PartyRecord;

/** A v15 store: the seed exactly as it is, stamped 15. `seedData()` returns a
 *  full store shape, so this is a stamp and nothing else. */
function v15Store() {
  return { ...seedData(), version: 15 };
}

const locationsOf = (p: Party | undefined): Loc[] =>
  (Array.isArray(p?.fields?.locations) ? p.fields.locations : []) as Loc[];
const partyById = (store: { parties: Party[] }, id: string) =>
  store.parties.find((p) => p.id === id);

beforeEach(() => mem.clear());

describe('v15 → v16: the address model', () => {
  it('lands on v16 — the version this step actually produces', () => {
    // Literal, deliberately not STORE_VERSION: the v10→v11 step read the
    // constant and stamped a v11 store as v12, skipping a migration entirely.
    // Every step in this chain is pinned to a literal because of it.
    const old = v15Store();
    expect(migrateV15ToV16(old, JSON.stringify(old)).version).toBe(16);
    expect(STORE_VERSION).toBe(16);
  });

  it('writes a full pre-migration backup before changing anything', () => {
    const old = v15Store();
    const raw = JSON.stringify(old);
    migrateV15ToV16(old, raw);
    expect(mem.get(`${KEY}-backup-v15`)).toBe(raw);
  });

  it('splits the seed hospital\'s one-line location into two fields, marked', () => {
    const old = v15Store();
    // The premise, asserted rather than assumed: this record really does start
    // as a single line. If the seed changes shape, this test says so instead of
    // quietly proving nothing.
    const before = locationsOf(partyById(old, 'p-hosp-ctrmc'));
    expect(before).toHaveLength(1);
    expect(before[0].address).toBe('3100 S 31st St, Temple, TX');
    expect(before[0].addressLine1).toBeUndefined();

    const after = locationsOf(partyById(migrateV15ToV16(old, JSON.stringify(old)), 'p-hosp-ctrmc'));
    expect(after[0].addressLine1).toBe('3100 S 31st St');
    expect(after[0].cityStateZip).toBe('Temple, TX');
    expect(splitMark(after[0])).toBe('rule');
    // SD-5 — the one-line value is still there. The split is reversible by hand
    // precisely because nothing was destroyed.
    expect(after[0].address).toBe('3100 S 31st St, Temple, TX');
  });

  it('splits BOTH of the two-location facility\'s campuses and ids them', () => {
    const old = v15Store();
    expect(locationsOf(partyById(old, 'p-prov-procare'))).toHaveLength(2);
    const after = locationsOf(partyById(migrateV15ToV16(old, JSON.stringify(old)), 'p-prov-procare'));
    expect(after.map((l) => l.addressLine1)).toEqual(['2200 S WS Young Dr', '810 W Adams Ave']);
    expect(after.map((l) => l.cityStateZip)).toEqual(['Killeen, TX', 'Temple, TX']);
    expect(after.every((l) => splitMark(l) === 'rule')).toBe(true);
    // SD-4 — every item leaves with a stable id, and the two are distinct.
    expect(after.every((l) => typeof l.id === 'string' && l.id !== '')).toBe(true);
    expect(after[0].id).not.toBe(after[1].id);
  });

  it('splits a NON-facility party\'s top-level address — D1(iv), one shape', () => {
    // The court is the case in the seed: `court.address` was its own single
    // textarea, and D1(iv) ("1") brought it under the same treatment as the
    // shared CONTACT block.
    const old = v15Store();
    const court = old.parties.find((p) => p.partyType === 'court');
    expect(typeof court?.fields.address).toBe('string');

    const after = partyById(migrateV15ToV16(old, JSON.stringify(old)), court!.id);
    expect(after?.fields.addressLine1).toBeTruthy();
    expect(splitMark(after?.fields as Record<string, unknown>)).toBeDefined();
    expect(after?.fields.address).toBe(court?.fields.address);
  });

  it('is IDEMPOTENT — a second run finds nothing and reports nothing split', () => {
    const old = v15Store();
    const once = migrateV15ToV16(old, JSON.stringify(old));
    const oncePayload = JSON.stringify({ ...once, version: 15, reviewLog: [] });

    const twice = migrateV15ToV16(
      { ...once, version: 15 } as unknown as Parameters<typeof migrateV15ToV16>[0],
      JSON.stringify({ ...once, version: 15 }),
    );
    // Nothing about the parties moved. `reviewLog` and `version` are excluded
    // because the step always logs itself — the claim is about the DATA.
    expect(JSON.stringify({ ...twice, version: 15, reviewLog: [] })).toBe(oncePayload);
  });

  it('never overwrites a mark Michael set by hand', () => {
    const old = v15Store();
    const hosp = partyById(old, 'p-hosp-ctrmc')!;
    hosp.fields.locations = [{
      id: 'l-fixed', label: 'Main campus',
      address: '3100 S 31st St, Temple, TX',
      addressLine1: '3100 South 31st Street',
      cityStateZip: 'Temple, TX 76502',
      addressSplitBy: 'hand',
    }];
    const after = locationsOf(partyById(migrateV15ToV16(old, JSON.stringify(old)), 'p-hosp-ctrmc'));
    expect(after[0].addressLine1).toBe('3100 South 31st Street');
    expect(splitMark(after[0])).toBe('hand');
  });

  it('records what it did in the review log, including what it could NOT split', () => {
    const old = v15Store();
    const hosp = partyById(old, 'p-hosp-ctrmc')!;
    hosp.fields.locations = [{ label: 'Main campus', address: '3100 S 31st St, Temple TX 76502' }];
    const after = migrateV15ToV16(old, JSON.stringify(old));
    const entry = (after.reviewLog as { reason: string }[]).at(-1)!;
    expect(entry.reason).toContain('could not be split by the rule');
    // Named, so a rule-unsplit record is a record he can go and find.
    expect(entry.reason).toContain('Central Texas Regional Medical Center');
    expect(entry.reason).toContain(`${KEY}-backup-v15`);
  });
});

describe('a FRESH store lands in the same shape a MIGRATED one does', () => {
  // FOUND BY CLICKING, not by a test. A browser that has never held a store
  // seeds straight to STORE_VERSION and never runs a migration — so the seed's
  // two single-line facility addresses would have stayed unsplit forever, and
  // `p-hosp-ctrmc` would have rendered addressless on a fresh demo machine
  // while rendering correctly on an upgraded one. The seed keeps its one-line
  // values on purpose (§3 item 17(g)); the SEED PATH runs the same rule.
  it('seeds the hospital with split fields and a marked location', async () => {
    mem.clear();
    const { LocalAdapter } = await import('../localAdapter');
    const adapter = new LocalAdapter();
    const hosp = await adapter.getParty('p-hosp-ctrmc');
    const locs = locationsOf(hosp ?? undefined);
    expect(locs).toHaveLength(1);
    expect(locs[0].addressLine1).toBe('3100 S 31st St');
    expect(locs[0].cityStateZip).toBe('Temple, TX');
    expect(splitMark(locs[0])).toBe('rule');
    expect(typeof locs[0].id).toBe('string');
    // Nothing destroyed, here either.
    expect(locs[0].address).toBe('3100 S 31st St, Temple, TX');
    // And it landed at STORE_VERSION rather than mid-chain — the seed writes a
    // current store, and the split is part of writing it. (`beforeEach` clears
    // the store, so this is asserted here rather than in a second `it`.)
    expect(JSON.parse(mem.get(KEY)!).version).toBe(STORE_VERSION);
  });
});
