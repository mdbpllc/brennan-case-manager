// FIRM OBLIGATIONS — both adapters.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 4 and §7 items 16,
// 20 and 21. FOS-1 RULED YES 2026-09-10.
//
// Three things are pinned here that no domain test can see:
//  1. BOTH adapters implement every firm method, and each act writes EXACTLY ONE
//     review_log line with the named action and entity type (§7 item 16).
//  2. The Supabase adapter writes in the order the database's own guard demands:
//     the fake client below ENFORCES the one-open partial unique index
//     (firm_obligation_occurrences_one_open_idx), so a close that inserted the next
//     occurrence before closing the current one — or an undo that reopened before
//     removing — fails here exactly as it would fail live.
//  3. Nothing reaches a case: no firm occurrence appears in a case's event list or
//     in the case event queue, and the Calendar tab never mentions them (§7 item 20).
//
// The SQL itself is exercised only by Michael's hand; the fake is a model of ONE
// guard, stated as such, not a database.

import { describe, it, expect, beforeEach } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import adapterSource from '../adapter.ts?raw';
import localSource from '../localAdapter.ts?raw';
import supabaseSource from '../supabaseAdapter.ts?raw';
import calendarTabSource from '../../pages/CalendarTab.tsx?raw';
import type { FirmObligationCreate } from '../../domain/firmObligations';

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

// ---------------------------------------------------------------- local

describe('LocalAdapter — every act writes exactly one review_log line (§7 item 16)', () => {
  beforeEach(() => mem.clear());

  it('activation → created; Done → done; Undo → undone; override → edited; edit → edited; retire/re-activate → edited', async () => {
    const db = new LocalAdapter();
    const lines = async () => (await db.listFirmObligationReviewLog()).length;
    let n = await lines();

    const { obligation, occurrence } = await db.createFirmObligation(monthly({ conditionalPerPeriod: true }));
    expect(await lines()).toBe(++n);
    expect((await db.listFirmObligationReviewLog()).at(-1)).toMatchObject({ action: 'created', entityType: 'firm_obligation', entityId: obligation.id });

    const done = await db.markOccurrenceDone(occurrence!.id, {});
    expect(await lines()).toBe(++n);
    expect((await db.listFirmObligationReviewLog()).at(-1)).toMatchObject({ action: 'done', entityType: 'firm_obligation_occurrence' });

    await db.undoOccurrence(occurrence!.id);
    expect(await lines()).toBe(++n);
    expect((await db.listFirmObligationReviewLog()).at(-1)!.action).toBe('undone');
    expect((await db.listFirmObligationOccurrences()).some((o) => o.id === done.next!.id)).toBe(false);

    const na = await db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' });
    expect(await lines()).toBe(++n);
    expect((await db.listFirmObligationReviewLog()).at(-1)!.action).toBe('not-applicable');

    await db.setOccurrenceDueOverride(na.next!.id, na.next!.dueOn);
    expect(await lines()).toBe(++n);

    await db.updateFirmObligation(obligation.id, { leadDays: 7 });
    expect(await lines()).toBe(++n);

    await db.retireFirmObligation(obligation.id);
    expect(await lines()).toBe(++n);
    await db.reactivateFirmObligation(obligation.id);
    expect(await lines()).toBe(++n);
    expect((await db.listFirmObligationReviewLog()).slice(-3).map((l) => l.action)).toEqual(['edited', 'edited', 'edited']);
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
interface Call { table: string; op: 'select' | 'insert' | 'update' | 'delete'; row?: Row }

/** A recording PostgREST stand-in that enforces ONE database guard: the one-open
 *  partial unique index on firm_obligation_occurrences. */
function fakeSupabase() {
  const tables: Record<string, Row[]> = {};
  const calls: Call[] = [];
  let seq = 0;
  const openClash = (rows: Row[], candidate: Row, exceptId?: unknown) =>
    candidate.state === 'open'
    && rows.some((x) => x.id !== exceptId && x.obligation_id === candidate.obligation_id && x.state === 'open');
  const indexError = { message: 'duplicate key value violates unique constraint "firm_obligation_occurrences_one_open_idx"' };

  function from(table: string) {
    const st: { op: Call['op']; row?: Row; filters: ((r: Row) => boolean)[]; order?: string; single?: 'single' | 'maybe' } = { op: 'select', filters: [] };
    const exec = (): { data: unknown; error: { message: string } | null } => {
      const rows = tables[table] ?? (tables[table] = []);
      if (st.op !== 'select') calls.push({ table, op: st.op, row: st.row });
      const hits = () => rows.filter((r) => st.filters.every((f) => f(r)));
      if (st.op === 'insert') {
        const r: Row = { id: st.row!.id ?? `gen-${++seq}`, ...st.row };
        if (table === 'review_log') r.timestamp = new Date(Date.UTC(2026, 0, 1, 0, 0, 0, ++seq)).toISOString();
        if (table === 'firm_obligation_occurrences' && openClash(rows, r)) return { data: null, error: indexError };
        rows.push(r);
        return { data: st.single ? r : [r], error: null };
      }
      if (st.op === 'update') {
        const h = hits();
        for (const x of h) {
          if (table === 'firm_obligation_occurrences' && openClash(rows, { ...x, ...st.row }, x.id)) return { data: null, error: indexError };
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
  const writes = () => calls.map((c) => `${c.op}:${c.table}`);
  return { client: client as unknown as SupabaseClient, tables, calls, writes, reset: () => { calls.length = 0; } };
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
