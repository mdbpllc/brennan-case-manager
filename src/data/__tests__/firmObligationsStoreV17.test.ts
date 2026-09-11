// FIRM OBLIGATIONS — the v16 → v17 demo-store step, and FOD-21's fixture firm.
//
// Authority: docs/specs/firm-obligations-build-slice.md §7 item 17 and FOD-21, as
// RULED by Michael at the build session's FOD-21 stop (2026-09-11, his pick among
// options Claude wrote): "Seed from the day the demo store is created
// (Recommended)". Every date the fixture holds is invented and computed from the day
// the store is created, so every state is pinned here at a FIXTURE CLOCK:
//
//   Sun 2026-09-13 — the one kind of day on which all three weekend rows show the
//                    state FOD-21 names: target-passed under rolls-forward AND
//                    no-roll, past-date-unknown under unknown.
//   Wed 2026-09-16 — a weekday, where target-passed cannot exist under either
//                    rolling setting, so those two rows are overdue — the ruled
//                    behaviour, pinned so nobody "fixes" it back.

import { describe, it, expect, beforeEach } from 'vitest';
import { stateOf, cardItems, registerView, type DisplayState } from '../../domain/firmObligations';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { migrateV16ToV17, migrateV15ToV16, STORE_VERSION, LocalAdapter } = await import('../localAdapter');
const { seedData } = await import('../seed');
const { DEMO_SEED_USER } = await import('../firmObligationsSeed');

const KEY = 'brennan-case-manager-v1';

/** A v16 store: the seed as it is, stamped 16, with no firm collections at all. */
function v16Store() {
  return { ...seedData(), version: 16 };
}

type Store = ReturnType<typeof migrateV16ToV17>;

function statesAt(store: Store, today: string): Record<string, DisplayState> {
  const out: Record<string, DisplayState> = {};
  for (const ob of store.firmObligations) {
    const open = store.firmObligationOccurrences.find((o) => o.obligationId === ob.id && o.state === 'open');
    if (open) out[ob.templateKey!] = stateOf(ob, open, today);
  }
  return out;
}

beforeEach(() => mem.clear());

describe('v16 → v17: the step itself', () => {
  it('lands on v17 — the version this step actually produces — and STORE_VERSION is 17', () => {
    const old = v16Store();
    expect(migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' }).version).toBe(17);
    expect(STORE_VERSION).toBe(17);
  });

  it('writes a full pre-migration backup before changing anything', () => {
    const old = v16Store();
    const raw = JSON.stringify(old);
    migrateV16ToV17(old, raw, { today: '2026-09-13' });
    expect(mem.get(`${KEY}-backup-v16`)).toBe(raw);
  });

  it('with nothing seeded — the shape a central database starts in — both collections are present and EMPTY', () => {
    const old = v16Store();
    const out = migrateV16ToV17(old, JSON.stringify(old), { seedDemo: false });
    expect(out.firmObligations).toEqual([]);
    expect(out.firmObligationOccurrences).toEqual([]);
  });

  it('is purely additive — nothing that existed is read, moved or reshaped', () => {
    const old = v16Store();
    const before = JSON.parse(JSON.stringify(old));
    const out = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    const strip = (s: Record<string, unknown>) => {
      const { version: _v, reviewLog: _r, firmObligations: _f, firmObligationOccurrences: _o, ...rest } = s;
      return rest;
    };
    expect(strip(JSON.parse(JSON.stringify(out)))).toEqual(strip(before));
    // seedData() carries no review log of its own; whatever a store held is kept, in front.
    const prior = (before.reviewLog ?? []) as unknown[];
    expect(out.reviewLog.slice(0, prior.length)).toEqual(prior);
  });

  it('chains a v15 store through v16 to v17, each backup holding its own version\'s text', async () => {
    const v15 = { ...seedData(), version: 15 };
    mem.set(KEY, JSON.stringify(v15));
    await new LocalAdapter().listFirmObligations();
    expect(JSON.parse(mem.get(KEY)!).version).toBe(17);
    expect(JSON.parse(mem.get(`${KEY}-backup-v15`)!).version).toBe(15);
    expect(JSON.parse(mem.get(`${KEY}-backup-v16`)!).version).toBe(16);
  });

  it('the v15 → v16 step is untouched by this one', () => {
    const v15 = { ...seedData(), version: 15 };
    expect(migrateV15ToV16(v15, JSON.stringify(v15)).version).toBe(16);
  });
});

describe('FOD-21 — the fixture firm, at the fixture clocks', () => {
  it('Sun 2026-09-13: two hard overdue, one routine overdue, three lit, a weekend row past target under each rule, three pending', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    expect(statesAt(store, '2026-09-13')).toEqual({
      'FOT-4': 'overdue', 'FOT-19': 'overdue', // hard
      'FOT-22': 'overdue', // routine
      'FOT-1': 'lit', 'FOT-6': 'lit', 'FOT-24': 'lit',
      'FOT-23': 'target-passed', // rolls-forward
      'FOT-27': 'target-passed', // no-roll
      'FOT-2': 'past-date-unknown', // unknown
      'FOT-8': 'pending', 'FOT-9': 'pending', 'FOT-25': 'pending',
    });
    const weights = Object.fromEntries(store.firmObligations.map((o) => [o.templateKey, o.weight]));
    expect([weights['FOT-4'], weights['FOT-19'], weights['FOT-22']]).toEqual(['hard', 'hard', 'routine']);
  });

  it('Wed 2026-09-16: target-passed cannot exist on a weekday, so the two rolling rows are overdue; unknown still never is', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-16' });
    const s = statesAt(store, '2026-09-16');
    expect(s['FOT-23']).toBe('overdue');
    expect(s['FOT-27']).toBe('overdue');
    expect(s['FOT-2']).toBe('past-date-unknown');
    expect([s['FOT-4'], s['FOT-19'], s['FOT-22']]).toEqual(['overdue', 'overdue', 'overdue']);
    expect([s['FOT-1'], s['FOT-6'], s['FOT-24']]).toEqual(['lit', 'lit', 'lit']);
  });

  it('the practice-time report carries the FOM-4 backlog: the 2025 report opened, overdue, from "last period completed" 2024', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    const tidc = store.firmObligations.find((o) => o.templateKey === 'FOT-4')!;
    expect(tidc.lastPeriodCompleted).toBe('2024-10-15');
    const open = store.firmObligationOccurrences.find((o) => o.obligationId === tidc.id)!;
    expect(open).toMatchObject({ dueOn: '2025-10-15', periodLabel: '2025', state: 'open' });
  });

  it('the card and the pin at Sunday: five hard lines (three shown, two more), the pin hard-first', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    const card = cardItems(store.firmObligations, store.firmObligationOccurrences, '2026-09-13');
    expect(card.map((i) => i.obligation.templateKey).sort()).toEqual(['FOT-19', 'FOT-2', 'FOT-27', 'FOT-4', 'FOT-6'].sort());
    const view = registerView(store.firmObligations, store.firmObligationOccurrences, '2026-09-13');
    expect(view.overdue.map((i) => i.obligation.templateKey)).toEqual(['FOT-4', 'FOT-19', 'FOT-22']);
    expect(view.inactive.map((i) => i.obligation.templateKey)).toEqual(['boi-note']);
  });

  it('twelve activations plus the BOI note row added inactive — one open occurrence each, none for the BOI row', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    expect(store.firmObligations).toHaveLength(13);
    expect(store.firmObligations.filter((o) => o.active)).toHaveLength(12);
    expect(store.firmObligationOccurrences).toHaveLength(12);
    const boi = store.firmObligations.find((o) => o.templateKey === 'boi-note')!;
    expect(boi.active).toBe(false);
    expect(store.firmObligationOccurrences.some((o) => o.obligationId === boi.id)).toBe(false);
  });

  it('a non-unknown weekend rule sits ONLY on rows with no law behind them — never on a statute\'s row', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    const rolled = store.firmObligations.filter((o) => o.weekendRule !== 'unknown').map((o) => o.templateKey).sort();
    expect(rolled).toEqual(['FOT-23', 'FOT-27']);
  });

  it('every fixture act is logged as the demo fixture, invented', () => {
    const old = v16Store();
    const store = migrateV16ToV17(old, JSON.stringify(old), { today: '2026-09-13' });
    const created = store.reviewLog.filter((l) => l.entityType === 'firm_obligation');
    expect(created).toHaveLength(13);
    expect(created.every((l) => l.user === DEMO_SEED_USER && l.action === 'created')).toBe(true);
    expect(DEMO_SEED_USER).toMatch(/invented/);
  });
});

describe('a FRESH store lands where a migrated one does (the v16 lesson)', () => {
  it('seeds straight to v17 with the fixture firm present', async () => {
    const adapter = new LocalAdapter();
    const obligations = await adapter.listFirmObligations();
    expect(JSON.parse(mem.get(KEY)!).version).toBe(STORE_VERSION);
    expect(obligations).toHaveLength(13);
    expect((await adapter.listFirmObligationOccurrences()).filter((o) => o.state === 'open')).toHaveLength(12);
  });
});
