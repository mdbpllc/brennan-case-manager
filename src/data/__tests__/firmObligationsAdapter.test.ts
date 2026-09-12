// FIRM OBLIGATIONS — both adapters.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 4 and §7 items 16,
// 20 and 21. FOS-1 RULED YES 2026-09-10.
//
// Four things are pinned here that no domain test can see:
//  1. BOTH adapters implement every firm method, and each act writes EXACTLY ONE
//     review_log line with the named action and entity type (§7 item 16). One walk
//     through the DataAdapter seam runs on each adapter and asserts both (review L3-3).
//  2. The Supabase adapter writes in the order the database's own guard demands:
//     the fake client below ENFORCES the one-open partial unique index
//     (firm_obligation_occurrences_one_open_idx), so a close that inserted the next
//     occurrence before closing the current one — or an undo that reopened before
//     removing — fails here exactly as it would fail live.
//  3. Nothing reaches a case: no firm occurrence appears in a case's event list or
//     in the case event queue, and the Calendar tab never mentions them (§7 item 20).
//  4. When a central write fails part-way (PostgREST gives no transaction), the
//     Supabase adapter compensates best effort and NEVER by a delete. The fake takes a
//     failure injector, and every act's failure points end in one of three messages:
//     not saved, saved without its review-log line, or could not be restored
//     (review L1-F4). A could-not-restore sends him where the register really shows
//     what it left, and a restore never un-queues a push the act had queued (SUP2-3, -4).
//
// The SQL itself is exercised only by Michael's hand; the fake is a model of ONE
// guard and of a failed statement, stated as such, not a database.

import { describe, it, expect, beforeEach } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import adapterSource from '../adapter.ts?raw';
import localSource from '../localAdapter.ts?raw';
import supabaseSource from '../supabaseAdapter.ts?raw';
import calendarTabSource from '../../pages/CalendarTab.tsx?raw';
import type { DataAdapter } from '../adapter';
import type { ReviewLogEntry } from '../../domain/billing';
import { localISODate } from '../../domain/dates';
import {
  addDays, formatDate, makeDate, planDone, registerView,
  type ActContext, type ClosePlan, type FirmObligation, type FirmObligationCreate, type FirmObligationOccurrence,
  type FirmObligationPatch,
} from '../../domain/firmObligations';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { LocalAdapter } = await import('../localAdapter');
const { SupabaseAdapter } = await import('../supabaseAdapter');

const FIRM_METHODS = [
  'listFirmObligations', 'getFirmObligation', 'createFirmObligation', 'updateFirmObligation',
  'retireFirmObligation', 'reactivateFirmObligation', 'listFirmObligationOccurrences',
  'markOccurrenceDone', 'markOccurrenceNotApplicable', 'undoOccurrence', 'setOccurrenceDueOverride',
  'listFirmObligationReviewLog', 'listFirmOccurrencesPendingSync', 'updateFirmOccurrenceSync',
];

function monthly(over: Partial<FirmObligationCreate> = {}): FirmObligationCreate {
  return {
    name: 'Adapter fixture', category: 'custom', ownerScope: 'firm',
    recurrence: { kind: 'fixed-monthly', day: 1 }, precision: 'day', missedPeriods: 'collapse',
    conditionalPerPeriod: false, weekendRule: 'unknown', leadDays: 5, weight: 'hard', active: true, ...over,
  };
}

// ---------------------------------------------------------------- the seam

describe('the adapter seam', () => {
  it('declares every firm method on DataAdapter and implements it in BOTH adapters', () => {
    for (const m of FIRM_METHODS) {
      expect(adapterSource, `DataAdapter.${m}`).toContain(`${m}(`);
      expect(localSource, `LocalAdapter.${m}`).toContain(`async ${m}(`);
      expect(supabaseSource, `SupabaseAdapter.${m}`).toContain(`async ${m}(`);
    }
  });

  it('§7 item 21 — no adapter has a snooze, dismiss, later, bulk or obligation-delete method', () => {
    for (const src of [adapterSource, localSource, supabaseSource]) {
      expect(src).not.toMatch(/\b(snooze|dismiss|remindLater|bulk)\w*\s*\(/i);
      expect(src).not.toMatch(/deleteFirmObligation/);
    }
  });
});

// ---------------------------------------------------------------- both adapters

/** Every act once, in an order the plans allow, through the DataAdapter seam alone. After
 *  each act: exactly ONE new review_log line, naming that act's action AND entity type
 *  exactly (§7 item 16; review L3-3 — most entity types had gone unasserted). */
async function everyActWritesOneLine(db: DataAdapter): Promise<void> {
  let n = (await db.listFirmObligationReviewLog()).length;
  const oneLine = async (action: ReviewLogEntry['action'], entityType: string, entityId: string) => {
    const lines = await db.listFirmObligationReviewLog();
    expect(lines, `${action} / ${entityType}: exactly one new line`).toHaveLength(++n);
    expect(lines.at(-1)).toMatchObject({ action, entityType, entityId });
  };

  const { obligation, occurrence } = await db.createFirmObligation(monthly({ conditionalPerPeriod: true }));
  await oneLine('created', 'firm_obligation', obligation.id);

  const done = await db.markOccurrenceDone(occurrence!.id, {});
  await oneLine('done', 'firm_obligation_occurrence', occurrence!.id);

  const undone = await db.undoOccurrence(occurrence!.id);
  await oneLine('undone', 'firm_obligation_occurrence', occurrence!.id);
  expect(undone.removed!.id).toBe(done.next!.id);
  expect((await db.listFirmObligationOccurrences()).some((o) => o.id === done.next!.id)).toBe(false);

  const na = await db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' });
  await oneLine('not-applicable', 'firm_obligation_occurrence', occurrence!.id);

  await db.setOccurrenceDueOverride(na.next!.id, na.next!.dueOn);
  await oneLine('edited', 'firm_obligation_occurrence', na.next!.id);

  await db.updateFirmObligation(obligation.id, { leadDays: 7 });
  await oneLine('edited', 'firm_obligation', obligation.id);

  await db.retireFirmObligation(obligation.id);
  await oneLine('edited', 'firm_obligation', obligation.id);

  await db.reactivateFirmObligation(obligation.id);
  await oneLine('edited', 'firm_obligation', obligation.id);
}

/** FOM-4 on a FIRST activation from Inactive: an added-inactive SERIAL row takes "last
 *  period completed", opens the period after it (here already past), keeps the date on
 *  the obligation, and writes one edited / firm_obligation line. A day-precision date
 *  that is not one of the rule's own dates is refused first, and writes nothing. */
async function firstActivationTakesLastPeriodCompleted(db: DataAdapter): Promise<void> {
  const [y, m] = localISODate().split('-').map(Number);
  const lastPeriodCompleted = makeDate(y, m - 3, 1); // the rule's own date (the 1st), three months back
  const expectedDue = makeDate(y, m - 2, 1);
  const { obligation, occurrence } = await db.createFirmObligation(monthly({ active: false, missedPeriods: 'serial' }));
  expect(occurrence).toBeNull();
  const n = (await db.listFirmObligationReviewLog()).length;

  await expect(db.reactivateFirmObligation(obligation.id, { lastPeriodCompleted: makeDate(y, m - 3, 2) }))
    .rejects.toThrow(/FOM-4/);
  expect(await db.listFirmObligationReviewLog()).toHaveLength(n);
  expect(await db.getFirmObligation(obligation.id)).toMatchObject({ active: false });

  const res = await db.reactivateFirmObligation(obligation.id, { lastPeriodCompleted });
  expect(res.obligation).toMatchObject({ active: true, lastPeriodCompleted });
  // The period AFTER the one he names — not the first rule date on or after today.
  expect(res.occurrence).toMatchObject({ state: 'open', dueOn: expectedDue, periodLabel: expectedDue.slice(0, 7) });
  expect(await db.getFirmObligation(obligation.id)).toMatchObject({ active: true, lastPeriodCompleted });
  const lines = await db.listFirmObligationReviewLog();
  expect(lines).toHaveLength(n + 1);
  expect(lines.at(-1)).toMatchObject({ action: 'edited', entityType: 'firm_obligation', entityId: obligation.id });
}

// ---------------------------------------------------------------- local

describe('LocalAdapter — every act writes exactly one review_log line (§7 item 16)', () => {
  beforeEach(() => mem.clear());

  it('each act: one line, with its exact action AND entity type (review L3-3)', async () => {
    await everyActWritesOneLine(new LocalAdapter());
  });

  it('FOM-4: a first activation from Inactive takes "last period completed" on a serial row', async () => {
    await firstActivationTakesLastPeriodCompleted(new LocalAdapter());
  });

  it('a refused act writes nothing', async () => {
    const db = new LocalAdapter();
    const { occurrence } = await db.createFirmObligation(monthly({ conditionalPerPeriod: false }));
    const n = (await db.listFirmObligationReviewLog()).length;
    await expect(db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' })).rejects.toThrow(/FOD-18/);
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow();
    expect((await db.listFirmObligationReviewLog()).length).toBe(n);
  });

  it('the sync write passes ONLY the four sync fields', async () => {
    const db = new LocalAdapter();
    const { occurrence } = await db.createFirmObligation(monthly());
    const updated = await db.updateFirmOccurrenceSync(occurrence!.id, {
      outlookEventId: 'AAMk-fixture', syncStatus: 'synced',
      // An attempt to smuggle a close through the sync write:
      ...({ state: 'done', dueOn: '2099-01-01' } as object),
    });
    expect(updated).toMatchObject({ outlookEventId: 'AAMk-fixture', syncStatus: 'synced', state: 'open', dueOn: occurrence!.dueOn });
    expect((await db.listFirmOccurrencesPendingSync()).some((o) => o.id === occurrence!.id)).toBe(false);
  });
});

describe('§7 item 20 — no firm occurrence reaches a case (FOD-13)', () => {
  beforeEach(() => mem.clear());

  it('no case\'s event list and no case event queue contains a firm occurrence', async () => {
    const db = new LocalAdapter();
    await db.createFirmObligation(monthly());
    const firmIds = new Set((await db.listFirmObligationOccurrences()).map((o) => o.id));
    expect(firmIds.size).toBeGreaterThan(0);
    for (const c of await db.listCases()) {
      for (const ev of await db.listEventsForCase(c.id)) expect(firmIds.has(ev.id)).toBe(false);
    }
    for (const ev of await db.listEventsPendingSync()) expect(firmIds.has(ev.id)).toBe(false);
  });

  it('the Calendar tab reads only case events and never mentions firm obligations', () => {
    const flat = calendarTabSource.replace(/\s+/g, ' ');
    // Word-bounded: `window.confirm` contains "firm" and is not a firm obligation.
    expect(flat).not.toMatch(/\bfirm\b|FirmObligation|firmObligation|firm_obligation/i);
    expect(flat).toContain('listEventsForCase(caseRec.id)');
  });
});

// ---------------------------------------------------------------- supabase

type Row = Record<string, unknown>;
type Op = 'select' | 'insert' | 'update' | 'delete';
interface Call { table: string; op: Op; row?: Row; failed?: boolean }

/** A recording PostgREST stand-in that enforces ONE database guard: the one-open
 *  partial unique index on firm_obligation_occurrences. For review L1-F4 it also takes
 *  a failure injector: `failOn(table, op, nth)` makes the nth write of that op on that
 *  table — counted from when it is armed — return an error and change nothing, as a
 *  failed PostgREST statement does. A failed write is still recorded, marked FAILED.
 *  `landsBefore(table, op, land, nth)` runs `land` just before that nth write, counted
 *  the same way: another writer (an Outlook push) landing in the middle of an act. */
function fakeSupabase() {
  const tables: Record<string, Row[]> = {};
  const calls: Call[] = [];
  const injectors: { table: string; op: Op; nth: number; seen: number }[] = [];
  const arrivals: { table: string; op: Op; nth: number; seen: number; land: () => void }[] = [];
  let seq = 0;
  const openClash = (rows: Row[], candidate: Row, exceptId?: unknown) =>
    candidate.state === 'open'
    && rows.some((x) => x.id !== exceptId && x.obligation_id === candidate.obligation_id && x.state === 'open');
  const indexError = { message: 'duplicate key value violates unique constraint "firm_obligation_occurrences_one_open_idx"' };
  const refuse = () => { calls[calls.length - 1].failed = true; return { data: null, error: indexError }; };

  function from(table: string) {
    const st: { op: Call['op']; row?: Row; filters: ((r: Row) => boolean)[]; order?: string; single?: 'single' | 'maybe' } = { op: 'select', filters: [] };
    const exec = (): { data: unknown; error: { message: string } | null } => {
      const rows = tables[table] ?? (tables[table] = []);
      if (st.op !== 'select') {
        for (const a of arrivals) {
          if (a.table === table && a.op === st.op && ++a.seen === a.nth) a.land();
        }
        let injected = false;
        for (const f of injectors) {
          if (f.table === table && f.op === st.op && ++f.seen === f.nth) injected = true;
        }
        calls.push({ table, op: st.op, row: st.row, ...(injected ? { failed: true } : {}) });
        if (injected) return { data: null, error: { message: `injected failure: ${st.op} ${table}` } };
      }
      const hits = () => rows.filter((r) => st.filters.every((f) => f(r)));
      if (st.op === 'insert') {
        const r: Row = { id: st.row!.id ?? `gen-${++seq}`, ...st.row };
        if (table === 'review_log') r.timestamp = new Date(Date.UTC(2026, 0, 1, 0, 0, 0, ++seq)).toISOString();
        if (table === 'firm_obligation_occurrences' && openClash(rows, r)) return refuse();
        rows.push(r);
        return { data: st.single ? r : [r], error: null };
      }
      if (st.op === 'update') {
        const h = hits();
        for (const x of h) {
          if (table === 'firm_obligation_occurrences' && openClash(rows, { ...x, ...st.row }, x.id)) return refuse();
        }
        h.forEach((x) => Object.assign(x, st.row));
        return { data: st.single ? h[0] ?? null : h, error: null };
      }
      if (st.op === 'delete') {
        tables[table] = rows.filter((r) => !st.filters.every((f) => f(r)));
        return { data: null, error: null };
      }
      let h = hits();
      if (st.order) h = [...h].sort((a, b) => String(a[st.order!]).localeCompare(String(b[st.order!])));
      if (st.single === 'maybe') return { data: h[0] ?? null, error: null };
      if (st.single === 'single') return h[0] ? { data: h[0], error: null } : { data: null, error: { message: 'no rows' } };
      return { data: h, error: null };
    };
    const b = {
      select: () => b,
      insert: (row: Row) => { st.op = 'insert'; st.row = row; return b; },
      update: (row: Row) => { st.op = 'update'; st.row = row; return b; },
      delete: () => { st.op = 'delete'; return b; },
      eq: (c: string, v: unknown) => { st.filters.push((r) => r[c] === v); return b; },
      neq: (c: string, v: unknown) => { st.filters.push((r) => r[c] !== v); return b; },
      in: (c: string, vs: unknown[]) => { st.filters.push((r) => vs.includes(r[c])); return b; },
      order: (c: string) => { st.order = c; return b; },
      single: () => { st.single = 'single'; return Promise.resolve(exec()); },
      maybeSingle: () => { st.single = 'maybe'; return Promise.resolve(exec()); },
      then: (ok: (v: unknown) => unknown, bad?: (e: unknown) => unknown) => Promise.resolve(exec()).then(ok, bad),
    };
    return b;
  }
  const client = { from, auth: { getSession: async () => ({ data: { session: null } }) } };
  const writes = () => calls.map((c) => `${c.op}:${c.table}${c.failed ? ' FAILED' : ''}`);
  /** A table as the database would read it back: sorted by id, and a NULL column the
   *  same as one never written (an insert leaves empty columns out; a restore writes NULL). */
  const snapshot = (table: string): Row[] => (JSON.parse(JSON.stringify(tables[table] ?? [])) as Row[])
    .map((r) => Object.fromEntries(Object.entries(r).filter(([, v]) => v !== null)))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const failOn = (table: string, op: Exclude<Op, 'select'>, nth = 1) => { injectors.push({ table, op, nth, seen: 0 }); };
  const landsBefore = (table: string, op: Exclude<Op, 'select'>, land: () => void, nth = 1) => {
    arrivals.push({ table, op, nth, seen: 0, land });
  };
  return {
    client: client as unknown as SupabaseClient, tables, calls, writes, snapshot, failOn, landsBefore,
    reset: () => { calls.length = 0; injectors.length = 0; arrivals.length = 0; },
  };
}

describe('SupabaseAdapter — the write order the database\'s own guards demand', () => {
  it('listing reads and writes nothing — Supabase mode seeds NOTHING (FOD-9, FOD-21)', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    expect(await db.listFirmObligations()).toEqual([]);
    expect(await db.listFirmObligationOccurrences()).toEqual([]);
    expect(fake.writes()).toEqual([]);
  });

  it('activation: the obligation, then its first occurrence, then the one log line', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    await db.createFirmObligation(monthly());
    expect(fake.writes()).toEqual(['insert:firm_obligations', 'insert:firm_obligation_occurrences', 'insert:review_log']);
    expect(fake.calls.at(-1)!.row).toMatchObject({ action: 'created', entity_type: 'firm_obligation' });
  });

  it('Done: closes the current occurrence BEFORE inserting the next (the one-open index), then logs', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const { occurrence } = await db.createFirmObligation(monthly());
    fake.reset();
    const res = await db.markOccurrenceDone(occurrence!.id, {});
    expect(fake.writes()).toEqual(['update:firm_obligation_occurrences', 'insert:firm_obligation_occurrences', 'insert:review_log']);
    expect(res.closed.state).toBe('done');
    expect(res.next!.state).toBe('open');
    expect(fake.calls.at(-1)!.row).toMatchObject({ action: 'done', entity_type: 'firm_obligation_occurrence' });
    expect(fake.tables.firm_obligation_occurrences.filter((r) => r.state === 'open')).toHaveLength(1);
  });

  it('Undo: removes the untouched next BEFORE reopening, then logs', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const { occurrence } = await db.createFirmObligation(monthly());
    const done = await db.markOccurrenceDone(occurrence!.id, {});
    fake.reset();
    const res = await db.undoOccurrence(occurrence!.id);
    expect(fake.writes()).toEqual(['delete:firm_obligation_occurrences', 'update:firm_obligation_occurrences', 'insert:review_log']);
    expect(res.removed!.id).toBe(done.next!.id);
    expect(res.reopened.state).toBe('open');
    expect(res.reopened.doneOn).toBeUndefined();
    expect(fake.calls.at(-1)!.row).toMatchObject({ action: 'undone' });
  });

  it('a one-time Done retires the obligation in the same act (FOD-32)', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const { occurrence } = await db.createFirmObligation(monthly({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } }));
    fake.reset();
    const res = await db.markOccurrenceDone(occurrence!.id, {});
    expect(fake.writes()).toEqual(['update:firm_obligation_occurrences', 'update:firm_obligations', 'insert:review_log']);
    expect(res.obligation.active).toBe(false);
    expect(res.next).toBeNull();
  });

  it('the sync write sends ONLY the four sync columns', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const { occurrence } = await db.createFirmObligation(monthly());
    fake.reset();
    await db.updateFirmOccurrenceSync(occurrence!.id, {
      syncStatus: 'synced', outlookEventId: 'AAMk-fixture', ...({ state: 'done' } as object),
    });
    expect(Object.keys(fake.calls[0].row!).sort()).toEqual(['outlook_event_id', 'sync_status']);
  });

  it('a refused act writes nothing at all', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const { occurrence } = await db.createFirmObligation(monthly());
    fake.reset();
    await expect(db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' })).rejects.toThrow(/FOD-18/);
    expect(fake.writes()).toEqual([]);
  });
});

describe('SupabaseAdapter — every act writes exactly one review_log line (§7 item 16)', () => {
  it('each act: one line, with its exact action AND entity type (review L3-3)', async () => {
    await everyActWritesOneLine(new SupabaseAdapter(fakeSupabase().client));
  });

  it('FOM-4: a first activation from Inactive takes "last period completed" on a serial row', async () => {
    await firstActivationTakesLastPeriodCompleted(new SupabaseAdapter(fakeSupabase().client));
  });
});

// ------------------------------------------ supabase: a write that fails part-way

const OB = 'firm_obligations';
const OCC = 'firm_obligation_occurrences';
const LOG = 'review_log';

// The three endings a write failure has (review L1-F4), and activation's own.
const NOT_SAVED = / was not saved: injected failure: \w+ \w+$/;
const SAVED_WITHOUT_LOG = / was saved, but its review-log line did not write \(injected failure: insert review_log\)/;
const STOPPED = ' stopped part-way \\(injected failure: \\w+ \\w+\\), and the earlier state could not be restored \\(injected failure: \\w+ \\w+\\)\\.';
// A could-not-restore ends by sending him where the register shows what it left (SUP2-4):
// "Needs attention" lists only an ACTIVE obligation with nothing open; any other state is
// on the obligation's own row. Every such test also asserts that the register agrees.
const IN_NEEDS_ATTENTION = ' Check "Needs attention" on the register\\.$';
const ON_ITS_ROW = ' Check the Adapter fixture row and its Details › Review log on the register\\.$';
const NOT_RESTORED_STRANDED = new RegExp(`${STOPPED}${IN_NEEDS_ATTENTION}`);
const NOT_RESTORED_ON_ROW = new RegExp(`${STOPPED}${ON_ITS_ROW}`);
const escaped = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** SUP2-6: the sentence naming a removed next occurrence's Outlook event, as a pattern. */
const orphaned = (periodLabel: string) =>
  ` The removed next occurrence \\(${escaped(periodLabel)}\\) still has its Outlook event; delete it in Outlook\\.`;
const SAVED_WITHOUT_FIRST = /^Adapter fixture was saved without its first occurrence \(injected failure: insert firm_obligation_occurrences\)\. It is listed under "Needs attention" on the register: Retire it, then Activate… it from Inactive\.$/;
/** SUP2-2: that message, then `tail` — a date the activation carried that re-activation will not. */
const savedWithoutFirst = (tail: string) => new RegExp(`${SAVED_WITHOUT_FIRST.source.slice(0, -1)}${escaped(tail)}$`);

const RULE_EDIT: FirmObligationPatch = { recurrence: { kind: 'fixed-monthly', day: 15 }, leadDays: 9 };

type Fake = ReturnType<typeof fakeSupabase>;
type Sb = InstanceType<typeof SupabaseAdapter>;
/** The adapter's private close, for the one guard no plan reaches. */
type PrivateClose = {
  firmClose(
    id: string,
    plan: (ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[], ctx: ActContext) => ClosePlan,
  ): Promise<unknown>;
};

/** Every table a firm act touches, as the database would read it back. */
const dbState = (fake: Fake) => ({ obligations: fake.snapshot(OB), occurrences: fake.snapshot(OCC), log: fake.snapshot(LOG) });
type DbState = ReturnType<typeof dbState>;

/** A row a write left standing: the patch as sent over the row as it was, a NULL read
 *  back as absent — the way `snapshot` reads it. */
const withWrite = (row: Row, patch: Row | undefined): Row =>
  Object.fromEntries(Object.entries({ ...row, ...patch }).filter(([, v]) => v !== null));

/** SUP2-3: `state` with these occurrences queued for a push again — what a restore leaves
 *  where the act it took back had queued one. Every other column exactly as it was. */
const requeued = (state: DbState, ...ids: string[]): DbState => ({
  ...state,
  occurrences: state.occurrences.map((r) => (ids.includes(String(r.id)) ? { ...r, sync_status: 'pending' } : r)),
});

/** The message an act failed with; the test fails if the act did not. */
const messageOf = (act: Promise<unknown>): Promise<string> =>
  act.then(() => { throw new Error('the act did not fail'); }, (e: unknown) => (e as Error).message);

/** No compensation ever deletes. The only delete an act issues is Undo's own planned
 *  removal of the next occurrence, and that is always the act's FIRST write. */
const expectNoCompensatingDelete = (fake: Fake) =>
  expect(fake.calls.slice(1).filter((c) => c.op === 'delete')).toEqual([]);

/** The obligations with no open occurrence that the register lists under "Needs attention". */
const stranded = async (db: Sb) =>
  registerView(await db.listFirmObligations(), await db.listFirmObligationOccurrences(), localISODate()).stranded.map((o) => o.name);

/** An activated obligation whose first occurrence was pushed to Outlook — so a restore
 *  that forgot the sync columns would show — with the call record cleared. */
async function activated(over: Partial<FirmObligationCreate> = {}) {
  const fake = fakeSupabase();
  const db = new SupabaseAdapter(fake.client);
  const { obligation, occurrence } = await db.createFirmObligation(monthly(over));
  if (occurrence) await db.updateFirmOccurrenceSync(occurrence.id, { outlookEventId: 'AAMk-first', syncStatus: 'synced' });
  fake.reset();
  return { fake, db, obligation, occurrence };
}

/** activated(), then Done once, the next occurrence pushed too — so "exactly as it was"
 *  includes its Outlook link. */
async function closedOnce() {
  const s = await activated();
  const done = await s.db.markOccurrenceDone(s.occurrence!.id, {});
  await s.db.updateFirmOccurrenceSync(done.next!.id, {
    outlookEventId: 'AAMk-next', syncStatus: 'synced', lastSyncAt: '2026-09-11T12:00:00.000Z',
  });
  s.fake.reset();
  return { ...s, done };
}

describe('SupabaseAdapter — a write that fails part-way is compensated, never by a delete (review L1-F4)', () => {
  const closes: [string, (db: Sb, id: string) => Promise<unknown>][] = [
    ['Done', (db, id) => db.markOccurrenceDone(id, {})],
    ['Not applicable', (db, id) => db.markOccurrenceNotApplicable(id, { reason: 'condition-not-met' })],
  ];

  for (const [label, close] of closes) {
    describe(label, () => {
      it('the next occurrence insert fails → the close is put back exactly, its push still queued; not saved', async () => {
        const { fake, db, occurrence } = await activated({ conditionalPerPeriod: true });
        const before = dbState(fake);
        expect(before.occurrences[0]).toMatchObject({ sync_status: 'synced' });
        fake.failOn(OCC, 'insert');
        await expect(close(db, occurrence!.id))
          .rejects.toThrow(new RegExp(`^${label} for Adapter fixture \\(${occurrence!.periodLabel}\\)${NOT_SAVED.source}`));
        expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${OCC} FAILED`, `update:${OCC}`]);
        // The close had queued a push, so the restore leaves it queued (SUP2-3).
        expect(dbState(fake)).toEqual(requeued(before, occurrence!.id));
        expectNoCompensatingDelete(fake);
      });

      it('the next insert fails AND putting the close back fails → could not be restored; nothing open, under Needs attention', async () => {
        const { fake, db, occurrence } = await activated({ conditionalPerPeriod: true });
        const before = dbState(fake);
        fake.failOn(OCC, 'insert');
        fake.failOn(OCC, 'update', 2);
        await expect(close(db, occurrence!.id)).rejects.toThrow(new RegExp(
          `^${label} for Adapter fixture \\(${escaped(occurrence!.periodLabel)}\\)${STOPPED}${IN_NEEDS_ATTENTION}`,
        ));
        expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${OCC} FAILED`, `update:${OCC} FAILED`]);
        const after = dbState(fake);
        expect(after.occurrences.map((r) => r.state)).toEqual(['done']);
        expect(after.log).toEqual(before.log);
        expect(await stranded(db)).toEqual(['Adapter fixture']);
        expectNoCompensatingDelete(fake);
      });

      it('only the log line fails → the rows stand, closed with the next open; saved without its line, so no Undo', async () => {
        const { fake, db, occurrence } = await activated({ conditionalPerPeriod: true });
        const before = dbState(fake);
        fake.failOn(LOG, 'insert');
        await expect(close(db, occurrence!.id)).rejects.toThrow(new RegExp(
          `^${label} for Adapter fixture \\(${occurrence!.periodLabel}\\)${SAVED_WITHOUT_LOG.source}, so Undo will not be offered for it\\.$`,
        ));
        expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${OCC}`, `insert:${LOG} FAILED`]);
        const after = dbState(fake);
        expect(after.occurrences.find((r) => r.id === occurrence!.id)).toMatchObject({ state: 'done' });
        expect(after.occurrences.filter((r) => r.state === 'open')).toHaveLength(1);
        expect(after.log).toEqual(before.log);
        expectNoCompensatingDelete(fake);
      });
    });
  }

  it('one-time Done: the obligation update fails → the close is put back exactly, its push still queued; not saved (FOD-32)', async () => {
    const { fake, db, occurrence } = await activated({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } });
    const before = dbState(fake);
    expect(before.occurrences[0]).toMatchObject({ sync_status: 'synced' });
    fake.failOn(OB, 'update');
    await expect(db.markOccurrenceDone(occurrence!.id, {})).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`update:${OCC}`, `update:${OB} FAILED`, `update:${OCC}`]);
    expect(dbState(fake)).toEqual(requeued(before, occurrence!.id));
    expectNoCompensatingDelete(fake);
  });

  it('one-time Done: the obligation update fails AND reopening fails → could not be restored; under Needs attention (SUP2-4)', async () => {
    const { fake, db, occurrence } = await activated({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } });
    const before = dbState(fake);
    fake.failOn(OB, 'update');
    fake.failOn(OCC, 'update', 2);
    await expect(db.markOccurrenceDone(occurrence!.id, {})).rejects.toThrow(NOT_RESTORED_STRANDED);
    expect(fake.writes()).toEqual([`update:${OCC}`, `update:${OB} FAILED`, `update:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.occurrences).toEqual([withWrite(before.occurrences[0], fake.calls[0].row)]);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual(['Adapter fixture']);
    expectNoCompensatingDelete(fake);
  });

  it("a close's guard no plan reaches (a next AND an obligation change) → could not be restored; on its row (SUP2-4)", async () => {
    // Only a one-time close changes the obligation, and it has no next, so the adapter's
    // private close is driven with a plan that pairs them — as the undo test below writes
    // its own unreachable state straight into the fake.
    const { fake, db, occurrence } = await activated();
    const before = dbState(fake);
    fake.failOn(OB, 'update');
    await expect((db as unknown as PrivateClose).firmClose(occurrence!.id, (ob, occ, all, ctx) => ({
      ...planDone(ob, occ, all, {}, ctx), obligationPatch: { active: false, updatedAt: ctx.nowIso },
    }))).rejects.toThrow(new RegExp(
      `^Done for Adapter fixture \\(${escaped(occurrence!.periodLabel)}\\) stopped part-way \\(injected failure: update firm_obligations\\), `
      + `and the earlier state could not be restored \\(reopening it would first need its next occurrence deleted, and this app never deletes one\\)\\.${ON_ITS_ROW}`,
    ));
    expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${OCC}`, `update:${OB} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.occurrences).toHaveLength(2);
    expect(after.occurrences.find((r) => r.id === occurrence!.id)).toEqual(withWrite(before.occurrences[0], fake.calls[0].row));
    expect(after.occurrences.find((r) => r.id !== occurrence!.id)).toEqual(fake.calls[1].row);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  // ---- activation

  it('activation: the obligation insert fails → not saved, nothing written', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    fake.failOn(OB, 'insert');
    await expect(db.createFirmObligation(monthly()))
      .rejects.toThrow(/^Activating Adapter fixture was not saved: injected failure: insert firm_obligations$/);
    expect(fake.writes()).toEqual([`insert:${OB} FAILED`]);
    expect(dbState(fake)).toEqual({ obligations: [], occurrences: [], log: [] });
  });

  it('activation: the first occurrence insert fails → the obligation stands unlogged under Needs attention, and Retire then Activate… mends it', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    fake.failOn(OCC, 'insert');
    await expect(db.createFirmObligation(monthly())).rejects.toThrow(SAVED_WITHOUT_FIRST);
    expect(fake.writes()).toEqual([`insert:${OB}`, `insert:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toHaveLength(1);
    expect(after.obligations[0]).toMatchObject({ name: 'Adapter fixture', active: true });
    expect(after.occurrences).toEqual([]);
    // Its activation line names a first occurrence that does not exist, so it is not written.
    expect(after.log).toEqual([]);
    expectNoCompensatingDelete(fake);
    expect(await stranded(db)).toEqual(['Adapter fixture']);

    // The message's own instructions work: Retire it, then Activate… it from Inactive.
    const id = String(after.obligations[0].id);
    await db.retireFirmObligation(id);
    const res = await db.reactivateFirmObligation(id);
    expect(res.occurrence).toMatchObject({ state: 'open' });
    expect(await stranded(db)).toEqual([]);
  });

  it('activation: the first occurrence fails on a serial row given "last period completed" → the message gives that date to re-enter, and re-entering it works (SUP2-2)', async () => {
    const [y, m] = localISODate().split('-').map(Number);
    const lastPeriodCompleted = makeDate(y, m - 3, 1);
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    fake.failOn(OCC, 'insert');
    await expect(db.createFirmObligation(monthly({ missedPeriods: 'serial', lastPeriodCompleted }))).rejects.toThrow(savedWithoutFirst(
      ` When you activate it again, re-enter the last period completed (${formatDate(lastPeriodCompleted)}).`,
    ));
    // Retire, then Activate… from Inactive with that date: the period after it opens, as the activation would have.
    const id = String(fake.tables[OB][0].id);
    await db.retireFirmObligation(id);
    const res = await db.reactivateFirmObligation(id, { lastPeriodCompleted });
    expect(res.occurrence).toMatchObject({ state: 'open', dueOn: makeDate(y, m - 2, 1) });
  });

  it('activation: the first occurrence fails on an interval row given its last-done date → the message names it and says it will open due now (SUP2-2)', async () => {
    const today = localISODate();
    const lastDone = addDays(today, -10);
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    fake.failOn(OCC, 'insert');
    await expect(db.createFirmObligation(monthly({ recurrence: { kind: 'interval-from-completion', days: 30 }, lastDone })))
      .rejects.toThrow(savedWithoutFirst(
        ` Activate… from Inactive takes no last-done date, so it will open due now, not measured from the last-done date you entered (${formatDate(lastDone)}).`,
      ));
    // What the message says is what happens.
    const id = String(fake.tables[OB][0].id);
    await db.retireFirmObligation(id);
    expect((await db.reactivateFirmObligation(id)).occurrence).toMatchObject({ state: 'open', dueOn: today });
  });

  it('activation: a date the rule never reads is not named (SUP2-2)', async () => {
    const [y, m] = localISODate().split('-').map(Number);
    for (const input of [
      // A collapse row: planActivation drops "last period completed".
      monthly({ lastPeriodCompleted: makeDate(y, m - 3, 1) }),
      // A monthly rule: only an interval reads a last-done date.
      monthly({ lastDone: addDays(localISODate(), -10) }),
    ]) {
      const fake = fakeSupabase();
      fake.failOn(OCC, 'insert');
      await expect(new SupabaseAdapter(fake.client).createFirmObligation(input)).rejects.toThrow(SAVED_WITHOUT_FIRST);
    }
  });

  it('activation: the log line fails → both inserts stand (no delete); saved without its line', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    fake.failOn(LOG, 'insert');
    await expect(db.createFirmObligation(monthly())).rejects.toThrow(
      /^Activating Adapter fixture was saved, but its review-log line did not write \(injected failure: insert review_log\)$/,
    );
    expect(fake.writes()).toEqual([`insert:${OB}`, `insert:${OCC}`, `insert:${LOG} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toHaveLength(1);
    expect(after.occurrences.filter((r) => r.state === 'open')).toHaveLength(1);
    expect(after.log).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  // ---- Edit…

  it('edit: the occurrence update fails → the obligation is put back exactly; not saved', async () => {
    const { fake, db, obligation } = await activated();
    const before = dbState(fake);
    fake.failOn(OCC, 'update');
    await expect(db.updateFirmObligation(obligation.id, RULE_EDIT))
      .rejects.toThrow(/^The edit to Adapter fixture was not saved: injected failure: update firm_obligation_occurrences$/);
    expect(fake.writes()).toEqual([`update:${OB}`, `update:${OCC} FAILED`, `update:${OB}`]);
    expect(dbState(fake)).toEqual(before);
    expectNoCompensatingDelete(fake);
  });

  it('edit: the occurrence update fails and putting the obligation back fails → could not be restored; on its row (SUP2-4)', async () => {
    const { fake, db, obligation } = await activated();
    const before = dbState(fake);
    fake.failOn(OCC, 'update');
    fake.failOn(OB, 'update', 2);
    await expect(db.updateFirmObligation(obligation.id, RULE_EDIT)).rejects.toThrow(NOT_RESTORED_ON_ROW);
    expect(fake.writes()).toEqual([`update:${OB}`, `update:${OCC} FAILED`, `update:${OB} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.occurrences).toEqual(before.occurrences);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  it('edit: the log line fails → the occurrence, then the obligation, are put back exactly, the push still queued; not saved', async () => {
    const { fake, db, obligation } = await activated();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    await expect(db.updateFirmObligation(obligation.id, RULE_EDIT)).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`update:${OB}`, `update:${OCC}`, `insert:${LOG} FAILED`, `update:${OCC}`, `update:${OB}`]);
    // The act really did re-date the occurrence before it was put back.
    expect(fake.calls[1].row).toMatchObject({ due_on: expect.stringMatching(/-15$/) });
    expect(before.occurrences[0]).toMatchObject({ sync_status: 'synced' });
    // Put back exactly, except that the re-date had queued a push, which stays queued (SUP2-3).
    expect(dbState(fake)).toEqual(requeued(before, String(before.occurrences[0].id)));
    expectNoCompensatingDelete(fake);
  });

  it('edit: the log line fails and putting the occurrence back fails → could not be restored; on its row', async () => {
    const { fake, db, obligation } = await activated();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    fake.failOn(OCC, 'update', 2);
    await expect(db.updateFirmObligation(obligation.id, RULE_EDIT)).rejects.toThrow(NOT_RESTORED_ON_ROW);
    expect(fake.writes()).toEqual([`update:${OB}`, `update:${OCC}`, `insert:${LOG} FAILED`, `update:${OCC} FAILED`]);
    // The restore stopped at the occurrence, so both of the act's writes stand.
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.occurrences).toEqual([withWrite(before.occurrences[0], fake.calls[1].row)]);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  it('edit of an obligation with nothing open: the log line fails and putting it back fails → could not be restored; still under Needs attention (SUP2-4)', async () => {
    // An activation whose first occurrence did not save: active with nothing open. An edit
    // changes neither, so a could-not-restore leaves it where the register already lists it.
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    fake.failOn(OCC, 'insert');
    await expect(db.createFirmObligation(monthly())).rejects.toThrow(SAVED_WITHOUT_FIRST);
    fake.reset();
    const before = dbState(fake);
    expect(await stranded(db)).toEqual(['Adapter fixture']);
    fake.failOn(LOG, 'insert');
    fake.failOn(OB, 'update', 2);
    await expect(db.updateFirmObligation(String(before.obligations[0].id), { leadDays: 9 })).rejects.toThrow(NOT_RESTORED_STRANDED);
    // Nothing is open, so there is no push to re-queue: the obligation is the edit's one row.
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${LOG} FAILED`, `update:${OB} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.obligations[0]).toMatchObject({ active: true, lead_days: 9 });
    expect(after.occurrences).toEqual([]);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual(['Adapter fixture']);
    expectNoCompensatingDelete(fake);
  });

  // ---- Retire

  it('retire: the log line fails → active again; not saved', async () => {
    const { fake, db, obligation } = await activated();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    await expect(db.retireFirmObligation(obligation.id))
      .rejects.toThrow(/^Retiring Adapter fixture was not saved: injected failure: insert review_log$/);
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${LOG} FAILED`, `update:${OB}`]);
    expect(dbState(fake)).toEqual(before);
    expectNoCompensatingDelete(fake);
  });

  it('retire: the log line fails and the restore fails → could not be restored; still retired, on its row', async () => {
    const { fake, db, obligation } = await activated();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    fake.failOn(OB, 'update', 2);
    await expect(db.retireFirmObligation(obligation.id)).rejects.toThrow(NOT_RESTORED_ON_ROW);
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${LOG} FAILED`, `update:${OB} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.obligations[0]).toMatchObject({ active: false });
    // Retire closes nothing (FOD-8).
    expect(after.occurrences).toEqual(before.occurrences);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  // ---- the due-date override

  it('due-date change: the log line fails → the occurrence is put back exactly; not saved', async () => {
    const { fake, db, occurrence } = await activated();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    await expect(db.setOccurrenceDueOverride(occurrence!.id, addDays(occurrence!.dueOn, 3))).rejects.toThrow(
      new RegExp(`^The due-date change for Adapter fixture \\(${occurrence!.periodLabel}\\) was not saved: injected failure: insert review_log$`),
    );
    expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${LOG} FAILED`, `update:${OCC}`]);
    expect(before.occurrences[0]).toMatchObject({ sync_status: 'synced' });
    // Put back exactly, except that the change had queued a push, which stays queued (SUP2-3).
    expect(dbState(fake)).toEqual(requeued(before, occurrence!.id));
    expectNoCompensatingDelete(fake);
  });

  it('due-date change: the log line fails and the restore fails → could not be restored; on its row', async () => {
    const { fake, db, occurrence } = await activated();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    fake.failOn(OCC, 'update', 2);
    await expect(db.setOccurrenceDueOverride(occurrence!.id, addDays(occurrence!.dueOn, 3))).rejects.toThrow(NOT_RESTORED_ON_ROW);
    expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${LOG} FAILED`, `update:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.occurrences).toEqual([withWrite(before.occurrences[0], fake.calls[0].row)]);
    expect(after.occurrences[0]).toMatchObject({ due_on_override: addDays(occurrence!.dueOn, 3) });
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  it('due-date change: a push lands between the act and its restore → the restore leaves the row queued, so Outlook is put right (SUP2-3)', async () => {
    const { fake, db, occurrence } = await activated();
    const before = dbState(fake);
    const pushedAt = '2026-09-11T13:00:00.000Z';
    // The change is written and queued; Outlook takes the new date before the log line fails.
    fake.landsBefore(LOG, 'insert', () => {
      Object.assign(fake.tables[OCC].find((r) => r.id === occurrence!.id)!, { sync_status: 'synced', last_sync_at: pushedAt });
    });
    fake.failOn(LOG, 'insert');
    await expect(db.setOccurrenceDueOverride(occurrence!.id, addDays(occurrence!.dueOn, 3))).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`update:${OCC}`, `insert:${LOG} FAILED`, `update:${OCC}`]);
    // Outlook shows the date the restore took away: only another push puts it right.
    expect((await db.listFirmOccurrencesPendingSync()).map((o) => o.id)).toEqual([occurrence!.id]);
    const after = dbState(fake);
    expect(after.occurrences).toEqual([{ ...before.occurrences[0], sync_status: 'pending', last_sync_at: pushedAt }]);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.log).toEqual(before.log);
  });

  // ---- Re-activate / Activate… from Inactive

  it('re-activation: the occurrence insert fails → active = false and "last period completed" put back; not saved', async () => {
    const [y, m] = localISODate().split('-').map(Number);
    const lastPeriodCompleted = makeDate(y, m - 3, 1);
    const { fake, db, obligation } = await activated({ active: false, missedPeriods: 'serial' });
    const before = dbState(fake);
    fake.failOn(OCC, 'insert');
    await expect(db.reactivateFirmObligation(obligation.id, { lastPeriodCompleted }))
      .rejects.toThrow(/^Activating Adapter fixture was not saved: injected failure: insert firm_obligation_occurrences$/);
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${OCC} FAILED`, `update:${OB}`]);
    // The act set both; the restore cleared both.
    expect(fake.calls[0].row).toMatchObject({ active: true, last_period_completed: lastPeriodCompleted });
    expect(fake.calls[2].row).toMatchObject({ active: false, last_period_completed: null });
    expect(dbState(fake)).toEqual(before);
    expectNoCompensatingDelete(fake);
  });

  it('re-activation: the log line fails after the insert → both stand (no delete); saved without its line', async () => {
    const { fake, db, obligation } = await activated({ active: false });
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    await expect(db.reactivateFirmObligation(obligation.id)).rejects.toThrow(
      /^Activating Adapter fixture was saved, but its review-log line did not write \(injected failure: insert review_log\)$/,
    );
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${OCC}`, `insert:${LOG} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.obligations[0]).toMatchObject({ active: true });
    expect(before.occurrences).toEqual([]);
    expect(after.occurrences).toEqual([fake.calls[1].row]);
    expect(after.occurrences[0]).toMatchObject({ state: 'open', obligation_id: obligation.id });
    expect(after.log).toEqual(before.log);
    expectNoCompensatingDelete(fake);
  });

  it('re-activation with an occurrence still open (nothing inserted): the log line fails → the one update is put back; not saved', async () => {
    const { fake, db, obligation } = await activated();
    await db.retireFirmObligation(obligation.id); // Retire closes nothing: the occurrence stays open (FOD-8).
    fake.reset();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    await expect(db.reactivateFirmObligation(obligation.id)).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${LOG} FAILED`, `update:${OB}`]);
    expect(dbState(fake)).toEqual(before);
    expectNoCompensatingDelete(fake);
  });

  it('re-activation: the insert fails and putting active back fails → could not be restored; under Needs attention', async () => {
    const { fake, db, obligation } = await activated({ active: false });
    const before = dbState(fake);
    fake.failOn(OCC, 'insert');
    fake.failOn(OB, 'update', 2);
    await expect(db.reactivateFirmObligation(obligation.id)).rejects.toThrow(NOT_RESTORED_STRANDED);
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${OCC} FAILED`, `update:${OB} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.obligations[0]).toMatchObject({ active: true });
    expect(after.occurrences).toEqual([]);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual(['Adapter fixture']);
    expectNoCompensatingDelete(fake);
  });

  it('re-activation with an occurrence still open: the log line fails and putting active back fails → could not be restored; on its row (SUP2-4)', async () => {
    const { fake, db, obligation } = await activated();
    await db.retireFirmObligation(obligation.id);
    fake.reset();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    fake.failOn(OB, 'update', 2);
    await expect(db.reactivateFirmObligation(obligation.id)).rejects.toThrow(NOT_RESTORED_ON_ROW);
    expect(fake.writes()).toEqual([`update:${OB}`, `insert:${LOG} FAILED`, `update:${OB} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual([withWrite(before.obligations[0], fake.calls[0].row)]);
    expect(after.occurrences).toEqual(before.occurrences);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  // ---- Undo

  it('undo: the planned removal itself fails → not saved, and nothing else is written', async () => {
    const { fake, db, occurrence } = await closedOnce();
    const before = dbState(fake);
    fake.failOn(OCC, 'delete');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`delete:${OCC} FAILED`]);
    expect(dbState(fake)).toEqual(before);
  });

  it('undo: the reopen fails → the removed next is re-inserted exactly as it was, Outlook link and all; not saved', async () => {
    const { fake, db, occurrence, done } = await closedOnce();
    const before = dbState(fake);
    fake.failOn(OCC, 'update');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(
      new RegExp(`^Undo for Adapter fixture \\(${occurrence!.periodLabel}\\) was not saved: injected failure: update firm_obligation_occurrences$`),
    );
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC} FAILED`, `insert:${OCC}`]);
    expect(dbState(fake)).toEqual(before);
    expect(dbState(fake).occurrences.find((r) => r.id === done.next!.id)).toMatchObject({
      outlook_event_id: 'AAMk-next', sync_status: 'synced', last_sync_at: '2026-09-11T12:00:00.000Z',
    });
    expectNoCompensatingDelete(fake);
  });

  it('undo: the obligation update fails → the reopened occurrence is closed again FIRST, then the next re-inserted; not saved', async () => {
    // No plan pairs a removed next with re-activating the obligation (only a one-time
    // close retires, and it has no next), so that state is written straight into the
    // fake: the close line says it retired the obligation, and the obligation is inactive.
    // It is the one path that runs both compensations, and their order is the point —
    // the fake's one-open index refuses the next back while the reopened one is open.
    const { fake, db, obligation, occurrence } = await closedOnce();
    const closeLine = fake.tables[LOG].find((r) => r.entity_id === occurrence!.id && r.action === 'done')!;
    closeLine.new_value = JSON.stringify({ ...JSON.parse(String(closeLine.new_value)), retiredObligation: true });
    fake.tables[OB].find((r) => r.id === obligation.id)!.active = false;
    const before = dbState(fake);
    fake.failOn(OB, 'update');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC}`, `update:${OB} FAILED`, `update:${OCC}`, `insert:${OCC}`]);
    expect(dbState(fake)).toEqual(before);
    expectNoCompensatingDelete(fake);
  });

  it('undo: the obligation update fails, it is closed again, and the next will not go back → could not be restored; its Outlook event named, on its row (SUP2-6)', async () => {
    // The state the test above writes. Closing it again lands, so nothing is open, but the
    // obligation is still retired: on its row, never under "Needs attention".
    const { fake, db, obligation, occurrence, done } = await closedOnce();
    const closeLine = fake.tables[LOG].find((r) => r.entity_id === occurrence!.id && r.action === 'done')!;
    closeLine.new_value = JSON.stringify({ ...JSON.parse(String(closeLine.new_value)), retiredObligation: true });
    fake.tables[OB].find((r) => r.id === obligation.id)!.active = false;
    const before = dbState(fake);
    // The sentence names an event only when the removed next was pushed.
    expect(before.occurrences.find((r) => r.id === done.next!.id)).toMatchObject({ outlook_event_id: 'AAMk-next' });
    fake.failOn(OB, 'update');
    fake.failOn(OCC, 'insert');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(new RegExp(
      `^Undo for Adapter fixture \\(${escaped(occurrence!.periodLabel)}\\)${STOPPED}${orphaned(done.next!.periodLabel)}${ON_ITS_ROW}`,
    ));
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC}`, `update:${OB} FAILED`, `update:${OCC}`, `insert:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.obligations[0]).toMatchObject({ active: false });
    // The closed occurrence exactly as it was; the removed next is gone.
    expect(after.occurrences).toEqual(before.occurrences.filter((r) => r.id === occurrence!.id));
    expect(after.occurrences.map((r) => r.state)).toEqual(['done']);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  it('undo of a one-time Done: the obligation update fails → closed again, still retired; not saved', async () => {
    const { fake, db, occurrence } = await activated({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } });
    await db.markOccurrenceDone(occurrence!.id, {});
    fake.reset();
    const before = dbState(fake);
    fake.failOn(OB, 'update');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`update:${OCC}`, `update:${OB} FAILED`, `update:${OCC}`]);
    expect(dbState(fake)).toEqual(before);
    expectNoCompensatingDelete(fake);
  });

  it('undo of a one-time Done whose close was pushed: the obligation update fails → closed again, its push queued again (SUP2-3)', async () => {
    const { fake, db, occurrence } = await activated({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } });
    await db.markOccurrenceDone(occurrence!.id, {});
    await db.updateFirmOccurrenceSync(occurrence!.id, { syncStatus: 'synced', lastSyncAt: '2026-09-11T12:00:00.000Z' });
    fake.reset();
    const before = dbState(fake);
    expect(before.occurrences[0]).toMatchObject({ state: 'done', sync_status: 'synced' });
    fake.failOn(OB, 'update');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(NOT_SAVED);
    expect(fake.writes()).toEqual([`update:${OCC}`, `update:${OB} FAILED`, `update:${OCC}`]);
    expect(dbState(fake)).toEqual(requeued(before, occurrence!.id));
    expectNoCompensatingDelete(fake);
  });

  it('undo of a one-time Done: the obligation update fails and closing it again fails → could not be restored; open, on its row (SUP2-4)', async () => {
    const { fake, db, occurrence } = await activated({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } });
    await db.markOccurrenceDone(occurrence!.id, {});
    fake.reset();
    const before = dbState(fake);
    fake.failOn(OB, 'update');
    fake.failOn(OCC, 'update', 2);
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(NOT_RESTORED_ON_ROW);
    expect(fake.writes()).toEqual([`update:${OCC}`, `update:${OB} FAILED`, `update:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.occurrences).toEqual([withWrite(before.occurrences[0], fake.calls[0].row)]);
    expect(after.occurrences[0]).toMatchObject({ state: 'open' });
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });

  it('undo: the log line fails → reopened with the next gone, left standing; saved without its line, the Outlook event named', async () => {
    const { fake, db, occurrence, done } = await closedOnce();
    const before = dbState(fake);
    fake.failOn(LOG, 'insert');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(new RegExp(
      `^Undo for Adapter fixture \\(${occurrence!.periodLabel}\\)${SAVED_WITHOUT_LOG.source}\\. The removed next occurrence \\(${done.next!.periodLabel}\\) still has its Outlook event; delete it in Outlook\\.$`,
    ));
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC}`, `insert:${LOG} FAILED`]);
    const after = dbState(fake);
    expect(after.occurrences.map((r) => [r.id, r.state])).toEqual([[occurrence!.id, 'open']]);
    expect(after.log).toEqual(before.log);
    expectNoCompensatingDelete(fake);
  });

  it('undo: the reopen fails and the next will not go back → could not be restored; nothing open, its Outlook event named, under Needs attention', async () => {
    const { fake, db, occurrence, done } = await closedOnce();
    const before = dbState(fake);
    fake.failOn(OCC, 'update');
    fake.failOn(OCC, 'insert');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(new RegExp(
      `^Undo for Adapter fixture \\(${escaped(occurrence!.periodLabel)}\\)${STOPPED}${orphaned(done.next!.periodLabel)}${IN_NEEDS_ATTENTION}`,
    ));
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC} FAILED`, `insert:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    // The closed occurrence exactly as it was; the removed next is gone.
    expect(after.occurrences).toEqual(before.occurrences.filter((r) => r.id === occurrence!.id));
    expect(after.occurrences.map((r) => r.state)).toEqual(['done']);
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual(['Adapter fixture']);
    expectNoCompensatingDelete(fake);
  });

  it('undo: the same failure when the next was never pushed → no Outlook sentence (SUP2-6)', async () => {
    const { fake, db, occurrence } = await activated();
    await db.markOccurrenceDone(occurrence!.id, {});
    fake.reset();
    fake.failOn(OCC, 'update');
    fake.failOn(OCC, 'insert');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(new RegExp(
      `^Undo for Adapter fixture \\(${escaped(occurrence!.periodLabel)}\\)${STOPPED}${IN_NEEDS_ATTENTION}`,
    ));
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC} FAILED`, `insert:${OCC} FAILED`]);
    expect(await stranded(db)).toEqual(['Adapter fixture']);
  });

  it('undo on a RETIRED obligation: the reopen fails and the next will not go back → could not be restored; on its row, not Needs attention (SUP2-4)', async () => {
    const { fake, db, obligation, occurrence, done } = await closedOnce();
    // Retire touches no occurrence, so Undo is still offered (canUndo).
    await db.retireFirmObligation(obligation.id);
    fake.reset();
    const before = dbState(fake);
    fake.failOn(OCC, 'update');
    fake.failOn(OCC, 'insert');
    await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(new RegExp(
      `^Undo for Adapter fixture \\(${escaped(occurrence!.periodLabel)}\\)${STOPPED}${orphaned(done.next!.periodLabel)}${ON_ITS_ROW}`,
    ));
    expect(fake.writes()).toEqual([`delete:${OCC}`, `update:${OCC} FAILED`, `insert:${OCC} FAILED`]);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.obligations[0]).toMatchObject({ active: false });
    expect(after.occurrences).toEqual(before.occurrences.filter((r) => r.id === occurrence!.id));
    expect(after.log).toEqual(before.log);
    expect(await stranded(db)).toEqual([]);
    expectNoCompensatingDelete(fake);
  });
});

// ------------------------------------------ supabase: a SPEC cell's name in a message

describe("SupabaseAdapter — no failure message carries a name's markup (SUP2-1)", () => {
  // A catalog name is SPEC §7's cell, copied byte-for-byte, markdown and all. The page
  // shows a thrown message verbatim, so every act label is built from plainText(name).
  const MARKED = '`Form 1295` *annual* **report**';
  const PLAIN = 'Form 1295 annual report';

  const acts: [string, () => Promise<string>][] = [
    ['activation: not saved', async () => {
      const fake = fakeSupabase();
      fake.failOn(OB, 'insert');
      return messageOf(new SupabaseAdapter(fake.client).createFirmObligation(monthly({ name: MARKED })));
    }],
    ['activation: saved without its first occurrence', async () => {
      const fake = fakeSupabase();
      fake.failOn(OCC, 'insert');
      return messageOf(new SupabaseAdapter(fake.client).createFirmObligation(monthly({ name: MARKED })));
    }],
    ['Done: saved without its line', async () => {
      const { fake, db, occurrence } = await activated({ name: MARKED });
      fake.failOn(LOG, 'insert');
      return messageOf(db.markOccurrenceDone(occurrence!.id, {}));
    }],
    ['Not applicable: not saved', async () => {
      const { fake, db, occurrence } = await activated({ name: MARKED, conditionalPerPeriod: true });
      fake.failOn(OCC, 'insert');
      return messageOf(db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' }));
    }],
    ['the edit: could not be restored — the name in the act AND in where to look', async () => {
      const { fake, db, obligation } = await activated({ name: MARKED });
      fake.failOn(LOG, 'insert');
      fake.failOn(OCC, 'update', 2);
      return messageOf(db.updateFirmObligation(obligation.id, RULE_EDIT));
    }],
    ['Retire: not saved', async () => {
      const { fake, db, obligation } = await activated({ name: MARKED });
      fake.failOn(LOG, 'insert');
      return messageOf(db.retireFirmObligation(obligation.id));
    }],
    ['Activate… from Inactive: not saved', async () => {
      const { fake, db, obligation } = await activated({ name: MARKED, active: false });
      fake.failOn(OCC, 'insert');
      return messageOf(db.reactivateFirmObligation(obligation.id));
    }],
    ['Undo: saved without its line', async () => {
      const { fake, db, occurrence } = await activated({ name: MARKED });
      await db.markOccurrenceDone(occurrence!.id, {});
      fake.reset();
      fake.failOn(LOG, 'insert');
      return messageOf(db.undoOccurrence(occurrence!.id));
    }],
    ['the due-date change: not saved', async () => {
      const { fake, db, occurrence } = await activated({ name: MARKED });
      fake.failOn(LOG, 'insert');
      return messageOf(db.setOccurrenceDueOverride(occurrence!.id, addDays(occurrence!.dueOn, 3)));
    }],
  ];

  for (const [label, act] of acts) {
    it(label, async () => {
      const message = await act();
      expect(message).toContain(PLAIN);
      expect(message).not.toMatch(/[`*]/);
    });
  }
});
