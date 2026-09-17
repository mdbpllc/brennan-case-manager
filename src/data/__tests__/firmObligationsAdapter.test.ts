// FIRM OBLIGATIONS — both adapters.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 4 and §7 items 16,
// 20 and 21 (FOS-1 RULED YES 2026-09-10); docs/specs/firm-obligations-fix-slice.md §3
// items 4 and 6–8 and §7 items 3 and 5–7 (FOS-2 RULED YES 2026-09-12, #156).
//
// Five things are pinned here that no domain test can see:
//  1. BOTH adapters implement every firm method, and each act writes EXACTLY ONE
//     review_log line with the named action and entity type (§7 item 16). One walk
//     through the DataAdapter seam runs on each adapter and asserts both (review L3-3).
//  2. The Supabase adapter makes exactly ONE rpc() call per act and writes no table of
//     its own (#156 A5). The fake client below EMULATES the nine Postgres functions as
//     the fix build's contract states them — their guards, their statement order, the
//     one-open partial unique index (firm_obligation_occurrences_one_open_idx), the row
//     CHECKs, the one review_log row, their returns — each ATOMICALLY: a function that
//     raises, at any statement, leaves every table as it was. It mirrors what the fix
//     build's review added to the migration too: the incomplete-request refusal, the
//     obligation locked first, the three race guards (review L1-4, L6-5), and
//     created_at / updated_at stamped by the function's own clock (review L4-1).
//  3. A failing function has ONE message: "<act> was not saved: <its own words>", and
//     changes nothing. The FOS-1 build's compensation and its three message classes are
//     retired (fix slice §3 item 6; §7 item 5 replaced their tests with these).
//  4. The fix slice's fields cross both adapters: Undo's two columns through a Done →
//     Undo round trip (A3), activateFromInactive as one act (A7), the Outlook-delete
//     queue (A6, FXD-2).
//  5. Nothing reaches a case: no firm occurrence appears in a case's event list or in the
//     case event queue, and the Calendar tab never mentions them (§7 item 20).
//
// The SQL itself is exercised only by Michael's hand; the fake is a model of the call
// contract, stated as such, not a database.

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import migrationSql from '../../../db/migrations/2026-09-10-firm-obligations.sql?raw';
import adapterSource from '../adapter.ts?raw';
import localSource from '../localAdapter.ts?raw';
import supabaseSource from '../supabaseAdapter.ts?raw';
import calendarTabSource from '../../pages/CalendarTab.tsx?raw';
import type { DataAdapter } from '../adapter';
import type { ReviewLogEntry } from '../../domain/billing';
import { localISODate } from '../../domain/dates';
import {
  addDays, latestClosed, makeDate, registerView,
  type FirmObligation, type FirmObligationCreate, type FirmObligationPatch,
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
  'retireFirmObligation', 'reactivateFirmObligation', 'activateFromInactive', 'listFirmObligationOccurrences',
  'markOccurrenceDone', 'markOccurrenceNotApplicable', 'undoOccurrence', 'setOccurrenceDueOverride',
  'listFirmObligationReviewLog', 'listFirmOccurrencesPendingSync', 'updateFirmOccurrenceSync',
  'queueFirmOutlookDelete', 'settleFirmOutlookDelete',
];

/** The nine functions, one per act (#156 A5; fix slice §5.3). */
const FIRM_FUNCTIONS = [
  'firm_activate', 'firm_activate_from_inactive', 'firm_update', 'firm_retire', 'firm_reactivate',
  'firm_mark_done', 'firm_mark_not_applicable', 'firm_undo', 'firm_set_due_override',
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

  // #156 A7: the Inactive row's "Activate…" — an edit AND a re-activation — is ONE line.
  await db.retireFirmObligation(obligation.id);
  await oneLine('edited', 'firm_obligation', obligation.id);
  await db.activateFromInactive(obligation.id, { leadDays: 8 });
  await oneLine('edited', 'firm_obligation', obligation.id);

  // #156 A6: the Outlook-delete queue is bookkeeping, not an act — it writes no line.
  await db.queueFirmOutlookDelete(obligation.id, { eventId: 'AAMk-removed', occurrenceId: done.next!.id });
  await db.settleFirmOutlookDelete(obligation.id, 'AAMk-removed', 'failed');
  await db.settleFirmOutlookDelete(obligation.id, 'AAMk-removed', 'deleted');
  expect(await db.listFirmObligationReviewLog()).toHaveLength(n);
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

/** #156 A7, "One act, one line": the Inactive row's "Activate…" applies its edit AND
 *  re-activates in ONE act — FOM-4's "last period completed" included — writing ONE
 *  edited / firm_obligation line whose record carries both. A refusal (here FOM-4's) is
 *  refused before anything is written: the edit does not land without the activation. */
async function activateFromInactiveIsOneAct(db: DataAdapter): Promise<void> {
  const [y, m] = localISODate().split('-').map(Number);
  const lastPeriodCompleted = makeDate(y, m - 3, 1);
  const expectedDue = makeDate(y, m - 2, 1);
  const { obligation } = await db.createFirmObligation(monthly({ active: false, missedPeriods: 'serial' }));
  expect(obligation).toMatchObject({ leadDays: 5, outlookReminderDays: 5 });
  const n = (await db.listFirmObligationReviewLog()).length;

  await expect(db.activateFromInactive(obligation.id, { leadDays: 9 }, { lastPeriodCompleted: makeDate(y, m - 3, 2) }))
    .rejects.toThrow(/FOM-4/);
  expect(await db.listFirmObligationReviewLog()).toHaveLength(n);
  expect(await db.getFirmObligation(obligation.id)).toMatchObject({ active: false, leadDays: 5 });
  expect((await db.listFirmObligationOccurrences()).filter((o) => o.obligationId === obligation.id)).toEqual([]);

  const res = await db.activateFromInactive(obligation.id, { leadDays: 9, outlookReminderDays: 12 }, { lastPeriodCompleted });
  expect(res.obligation).toMatchObject({ active: true, leadDays: 9, outlookReminderDays: 12, lastPeriodCompleted });
  expect(res.occurrence).toMatchObject({ obligationId: obligation.id, state: 'open', dueOn: expectedDue, touched: false });
  expect(res.kept).toBeNull();
  expect(await db.getFirmObligation(obligation.id)).toMatchObject({ active: true, leadDays: 9, outlookReminderDays: 12, lastPeriodCompleted });
  const lines = await db.listFirmObligationReviewLog();
  expect(lines).toHaveLength(n + 1);
  expect(lines.at(-1)).toMatchObject({ action: 'edited', entityType: 'firm_obligation', entityId: obligation.id });
  expect(JSON.parse(lines.at(-1)!.newValue!)).toMatchObject({
    kind: 'obligation', act: 'activated-from-inactive', openedOccurrenceId: res.occurrence!.id,
    values: { active: true, leadDays: 9, outlookReminderDays: 12, lastPeriodCompleted },
  });
}

/** #156 A3: `materializedFrom` and `touched` cross the adapter both ways. A Done links its
 *  next to the close and leaves it untouched; Undo removes it (and returns it, link and
 *  all); a second Done links a new next; an override reaches that next, and Undo over it
 *  is refused (FOD-7). */
async function undoColumnsRoundTrip(db: DataAdapter): Promise<void> {
  const read = async (id: string) => (await db.listFirmObligationOccurrences()).find((o) => o.id === id);
  const { occurrence } = await db.createFirmObligation(monthly());
  expect(occurrence).toMatchObject({ touched: false });
  expect(occurrence!.materializedFrom).toBeUndefined();

  const done = await db.markOccurrenceDone(occurrence!.id, {});
  expect(done.closed).toMatchObject({ id: occurrence!.id, state: 'done', touched: true });
  expect(done.next).toMatchObject({ state: 'open', materializedFrom: occurrence!.id, touched: false });
  expect(await read(occurrence!.id)).toMatchObject({ state: 'done', touched: true });
  expect(await read(done.next!.id)).toMatchObject({ materializedFrom: occurrence!.id, touched: false });

  const undone = await db.undoOccurrence(occurrence!.id);
  expect(undone.removed).toMatchObject({ id: done.next!.id, materializedFrom: occurrence!.id, touched: false });
  expect(undone.reopened).toMatchObject({ id: occurrence!.id, state: 'open' });
  expect(await read(done.next!.id)).toBeUndefined();

  const again = await db.markOccurrenceDone(occurrence!.id, {});
  expect(again.next!.id).not.toBe(done.next!.id);
  expect(await read(again.next!.id)).toMatchObject({ materializedFrom: occurrence!.id, touched: false });

  await db.setOccurrenceDueOverride(again.next!.id, again.next!.dueOn);
  expect(await read(again.next!.id)).toMatchObject({ materializedFrom: occurrence!.id, touched: true });
  await expect(db.undoOccurrence(occurrence!.id)).rejects.toThrow(/FOD-7/);
}

/** #156 A6 (FXD-2): the Outlook-delete queue. Queuing an event twice keeps it once; a
 *  failed drain counts the attempt and keeps the entry; at three failures it is also
 *  named under "Needs attention" and stays queued; a later success removes it. No act,
 *  so no review_log line. Returns the obligation's id. */
async function outlookDeleteQueue(db: DataAdapter): Promise<string> {
  const { obligation } = await db.createFirmObligation(monthly());
  expect(obligation.pendingOutlookDeletes).toEqual([]);
  const n = (await db.listFirmObligationReviewLog()).length;
  const a = { eventId: 'AAMk-removed-1', occurrenceId: 'occ-removed-1' };
  const b = { eventId: 'AAMk-removed-2', occurrenceId: 'occ-removed-2' };

  expect((await db.queueFirmOutlookDelete(obligation.id, a)).pendingOutlookDeletes)
    .toEqual([{ ...a, recordedAt: expect.any(String), attempts: 0 }]);
  expect((await db.queueFirmOutlookDelete(obligation.id, a)).pendingOutlookDeletes).toHaveLength(1);
  expect((await db.queueFirmOutlookDelete(obligation.id, b)).pendingOutlookDeletes.map((e) => e.eventId))
    .toEqual([a.eventId, b.eventId]);

  for (let attempt = 1; attempt <= 3; attempt++) {
    const s = await db.settleFirmOutlookDelete(obligation.id, a.eventId, 'failed');
    expect(s.pendingOutlookDeletes).toEqual([
      { ...a, recordedAt: expect.any(String), attempts: attempt },
      { ...b, recordedAt: expect.any(String), attempts: 0 },
    ]);
  }
  const view = registerView(await db.listFirmObligations(), await db.listFirmObligationOccurrences(), localISODate());
  expect(view.stuckDeletes.map((s) => [s.obligation.id, s.entry.eventId, s.entry.attempts])).toEqual([[obligation.id, a.eventId, 3]]);

  expect((await db.settleFirmOutlookDelete(obligation.id, a.eventId, 'deleted')).pendingOutlookDeletes.map((e) => e.eventId))
    .toEqual([b.eventId]);
  expect(await db.getFirmObligation(obligation.id)).toMatchObject({ pendingOutlookDeletes: [{ ...b, attempts: 0 }] });
  expect(await db.listFirmObligationReviewLog()).toHaveLength(n);
  return obligation.id;
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

describe('LocalAdapter — the fix slice (#156)', () => {
  beforeEach(() => mem.clear());

  it('A7: Activate… from Inactive is ONE act writing ONE line, and a refusal writes nothing', async () => {
    await activateFromInactiveIsOneAct(new LocalAdapter());
  });

  it('A3: materializedFrom and touched come back through a Done → Undo round trip', async () => {
    await undoColumnsRoundTrip(new LocalAdapter());
  });

  it('A6: the Outlook-delete queue — idempotent queue, a failure counted and kept, a success removed, no line', async () => {
    await outlookDeleteQueue(new LocalAdapter());
  });

  it('A6: a queue write changes ONLY pendingOutlookDeletes on the obligation, and no occurrence', async () => {
    const db = new LocalAdapter();
    const { obligation } = await db.createFirmObligation(monthly());
    const occurrencesBefore = await db.listFirmObligationOccurrences();
    const queued = await db.queueFirmOutlookDelete(obligation.id, { eventId: 'AAMk-x', occurrenceId: 'occ-x' });
    expect({ ...queued, pendingOutlookDeletes: [] }).toEqual(obligation);
    const settled = await db.settleFirmOutlookDelete(obligation.id, 'AAMk-x', 'failed');
    expect({ ...settled, pendingOutlookDeletes: [] }).toEqual(obligation);
    expect(await db.listFirmObligationOccurrences()).toEqual(occurrencesBefore);
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

// ---------------------------------------------------------------- supabase: the fake

type Row = Record<string, unknown>;
type Op = 'select' | 'insert' | 'update' | 'delete' | 'rpc';
interface Call { table: string; op: Op; row?: Row; failed?: boolean }

const OB = 'firm_obligations';
const OCC = 'firm_obligation_occurrences';
const LOG = 'review_log';

/** The contract's explicit UPDATE column lists: a patch key outside them is not written. */
const OB_MUTABLE = [
  'recurrence', 'precision', 'missed_periods', 'weekend_rule', 'lead_days', 'weight', 'notes',
  'outlook_reminder_days', 'last_period_completed', 'active', 'updated_at',
];
const OCC_MUTABLE = [
  'period_label', 'due_on', 'due_on_override', 'state', 'done_on', 'done_by', 'outcome', 'outcome_reason',
  'done_note', 'filed_at', 'sync_status', 'touched', 'updated_at',
];
/** The not-null-with-default columns an INSERT coalesces. */
const OB_DEFAULTS: Row = {
  owner_scope: 'firm', precision: 'day', conditional_per_period: false, weekend_rule: 'unknown', lead_days: 30,
  weight: 'routine', active: true, outlook_reminder_days: 30, pending_outlook_deletes: [],
};
const OCC_DEFAULTS: Row = { state: 'open', sync_status: 'pending', touched: false };
const LOG_COLUMNS = ['entity_type', 'entity_id', 'action', 'user', 'old_value', 'new_value', 'reason'];

const INDEX_ERROR = 'duplicate key value violates unique constraint "firm_obligation_occurrences_one_open_idx"';
// The fake's raise texts. The migration's own are PROVISIONAL text acts; the adapter
// passes whatever the function says through, so these need only be the function's words.
const NOT_FOUND = 'Firm obligation not found.';
const NOT_OPEN = 'This occurrence is no longer open — reload the register.';
const NOT_CLOSED = 'This occurrence is no longer closed — reload the register.';
const NOT_UNTOUCHED = 'The next occurrence is no longer untouched — reload the register.';
const ALREADY_ACTIVE = 'This obligation is already active — reload the register.';
const ALREADY_RETIRED = 'This obligation is already retired — reload the register.';
const WRONG_OUTCOME = 'This close does not match its function.';
const CHECK_ERROR = 'new row for relation "firm_obligation_occurrences" violates check constraint';
// The fix build's review's refusals, in the migration's own words.
const INCOMPLETE = 'The request was incomplete — reload the register.';
const REACTIVATED = 'This obligation was re-activated — reload the register.';
const CLOSED_SINCE = 'Its open occurrence has since closed — reload the register.';
const OPENED_SINCE = 'Another occurrence has been opened since — reload the register.';

/** The parts of `p` each function cannot go without, and the JSON type each must be —
 *  the migration's first statement in each function (pinned against it below). */
const REQUIRED_PARTS: Record<string, [key: string, type: 'object' | 'string'][]> = {
  firm_activate: [['obligation', 'object'], ['log', 'object']],
  firm_activate_from_inactive: [['obligation_id', 'string'], ['obligation_patch', 'object'], ['log', 'object']],
  firm_update: [['obligation_id', 'string'], ['obligation_patch', 'object'], ['log', 'object']],
  firm_retire: [['obligation_id', 'string'], ['obligation_patch', 'object'], ['log', 'object']],
  firm_reactivate: [['obligation_id', 'string'], ['obligation_patch', 'object'], ['log', 'object']],
  firm_mark_done: [['occurrence_id', 'string'], ['occurrence_patch', 'object'], ['obligation_id', 'string'], ['log', 'object']],
  firm_mark_not_applicable: [['occurrence_id', 'string'], ['occurrence_patch', 'object'], ['obligation_id', 'string'], ['log', 'object']],
  firm_undo: [['occurrence_id', 'string'], ['reopen_patch', 'object'], ['obligation_id', 'string'], ['log', 'object']],
  firm_set_due_override: [['occurrence_id', 'string'], ['patch', 'object'], ['log', 'object']],
};

/** jsonb_typeof, for a value parsed from JSON: null for SQL NULL (an absent key or a JSON null). */
const jsonType = (v: unknown): string | null =>
  v === undefined || v === null ? null : Array.isArray(v) ? 'array' : typeof v;
const isObject = (v: unknown) => jsonType(v) === 'object';

/** A statement in a function raised: the transaction is rolled back. */
class Raise extends Error {}

/**
 * A recording PostgREST stand-in.
 *
 * `from(table)` serves the reads and the few plain writes left (the sync write, the
 * Outlook-delete queue). `rpc(fn, { p })` EMULATES each of the nine functions against
 * the in-memory tables as the fix build's contract states them: every guard, the order of
 * statements, the one-open partial unique index and the occurrence row CHECKs checked
 * after every statement, ONE review_log row, and the contract's return. It runs on a copy
 * of the tables and commits only if nothing raised, so a function is ATOMIC. One call is
 * recorded per rpc, as op 'rpc' on table = the function's name.
 *
 * Each call has ONE server time, `now()` — the transaction's — from a clock of the fake's
 * own that starts in 2020, well behind any browser stamp a plan carries, and moves one
 * second per call. Every insert takes it for created_at and updated_at (`lastNow()` reads
 * the latest), as the migration's inserts do.
 *
 * `failOn(table, op, nth)` makes the nth such call — counted from when it is armed —
 * return an error and change nothing (for an rpc, `table` is the function's name).
 * `landsBefore(table, op, land, nth)` runs `land` just before that nth call: another
 * writer landing between the adapter's reads and its call.
 */
function fakeSupabase() {
  let tables: Record<string, Row[]> = {};
  const calls: Call[] = [];
  const injectors: { table: string; op: Op; nth: number; seen: number }[] = [];
  const arrivals: { table: string; op: Op; nth: number; seen: number; land: () => void }[] = [];
  let seq = 0;
  const gen = () => `gen-${++seq}`;
  const logTimestamp = () => new Date(Date.UTC(2026, 0, 1, 0, 0, 0, ++seq)).toISOString();
  /** The database's clock: one tick per function call; `txNow` is the running call's now(). */
  let clock = Date.UTC(2020, 0, 1, 0, 0, 0);
  let txNow = '';

  /** Arms arrivals and injectors for one call; true when this call is to fail. */
  const arm = (table: string, op: Op): boolean => {
    for (const a of arrivals) {
      if (a.table === table && a.op === op && ++a.seen === a.nth) a.land();
    }
    let injected = false;
    for (const f of injectors) {
      if (f.table === table && f.op === op && ++f.seen === f.nth) injected = true;
    }
    return injected;
  };

  const openClash = (rows: Row[], candidate: Row, exceptId?: unknown) =>
    candidate.state === 'open'
    && rows.some((x) => x.id !== exceptId && x.obligation_id === candidate.obligation_id && x.state === 'open');

  function from(table: string) {
    const st: { op: Op; row?: Row; filters: ((r: Row) => boolean)[]; order?: string; single?: 'single' | 'maybe' } = { op: 'select', filters: [] };
    const exec = (): { data: unknown; error: { message: string } | null } => {
      const rows = tables[table] ?? (tables[table] = []);
      if (st.op !== 'select') {
        const injected = arm(table, st.op);
        calls.push({ table, op: st.op, row: st.row, ...(injected ? { failed: true } : {}) });
        if (injected) return { data: null, error: { message: `injected failure: ${st.op} ${table}` } };
      }
      const refuse = () => { calls[calls.length - 1].failed = true; return { data: null, error: { message: INDEX_ERROR } }; };
      const hits = () => rows.filter((r) => st.filters.every((f) => f(r)));
      if (st.op === 'insert') {
        const r: Row = { id: st.row!.id ?? gen(), ...st.row };
        if (table === LOG) r.timestamp = logTimestamp();
        if (table === OCC && openClash(rows, r)) return refuse();
        rows.push(r);
        return { data: st.single ? r : [r], error: null };
      }
      if (st.op === 'update') {
        const h = hits();
        for (const x of h) {
          if (table === OCC && openClash(rows, { ...x, ...st.row }, x.id)) return refuse();
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

  // ---- the nine functions, over a draft copy of the tables

  type Db = Record<string, Row[]>;
  const t = (db: Db, name: string) => db[name] ?? (db[name] = []);
  /** After every statement on the occurrences: the partial unique index and the row CHECKs. */
  const guardOccurrences = (db: Db) => {
    const open = t(db, OCC).filter((r) => r.state === 'open');
    if (new Set(open.map((r) => r.obligation_id)).size !== open.length) throw new Raise(INDEX_ERROR);
    for (const r of t(db, OCC)) {
      const done = r.state === 'done';
      if (done !== (r.done_on != null)) throw new Raise(CHECK_ERROR);
      if (done !== (r.outcome != null)) throw new Raise(CHECK_ERROR);
      if ((r.outcome === 'not-applicable') !== (r.outcome_reason != null)) throw new Raise(CHECK_ERROR);
    }
  };
  /** jsonb_populate_record(v, patch), then UPDATE … SET <the explicit list> = v.<col>. */
  const applyPatch = (row: Row, patch: unknown, columns: string[]) => {
    const p = (patch ?? {}) as Row;
    for (const c of columns) if (c in p) row[c] = p[c];
  };
  /** INSERT from jsonb_populate_record(null::table, row), coalescing the defaults — and
   *  created_at / updated_at = now(), whatever the row carries (review L4-1). */
  const insert = (db: Db, table: string, row: unknown, defaults: Row): Row => {
    const r: Row = { ...(row as Row) };
    for (const [k, v] of Object.entries(defaults)) if (r[k] == null) r[k] = v;
    if (r.id == null) r.id = gen();
    r.created_at = txNow;
    r.updated_at = txNow;
    t(db, table).push(r);
    if (table === OCC) guardOccurrences(db);
    return r;
  };
  const insertLog = (db: Db, log: unknown) => {
    const l = (log ?? {}) as Row;
    const r: Row = { id: gen(), timestamp: logTimestamp() };
    for (const c of LOG_COLUMNS) r[c] = l[c] ?? null;
    t(db, LOG).push(r);
  };
  /** select … for update; not found raises. Every function that takes it takes it FIRST. */
  const lockObligation = (db: Db, id: unknown): Row => {
    const r = t(db, OB).find((x) => x.id === id);
    if (!r) throw new Raise(NOT_FOUND);
    return r;
  };
  /** not exists (select 1 … where obligation_id = … and state = 'open') — negated. */
  const hasOpen = (db: Db, obligationId: unknown) =>
    t(db, OCC).some((x) => x.obligation_id === obligationId && x.state === 'open');
  /** UPDATE … WHERE id = … AND state = <state> RETURNING *; none raises. */
  const updateWhere = (db: Db, id: unknown, state: 'open' | 'done', patch: unknown, missing: string): Row => {
    const r = t(db, OCC).find((x) => x.id === id && x.state === state);
    if (!r) throw new Raise(missing);
    applyPatch(r, patch, OCC_MUTABLE);
    guardOccurrences(db);
    return r;
  };
  const close = (outcome: 'completed' | 'not-applicable') => (db: Db, p: Row) => {
    if ((p.occurrence_patch as Row | null)?.outcome !== outcome) throw new Raise(WRONG_OUTCOME);
    // The obligation FIRST (every function's lock order), then the occurrence.
    const obligation = lockObligation(db, p.obligation_id);
    // No next and no obligation patch: planned on a RETIRED obligation. Refused if it is
    // active again — a close with no next would leave it active with nothing open.
    if (!isObject(p.next) && !isObject(p.obligation_patch) && obligation.active === true) throw new Raise(REACTIVATED);
    // The closed occurrence, then the next: the one-open index.
    const closed = updateWhere(db, p.occurrence_id, 'open', p.occurrence_patch, NOT_OPEN);
    const next = isObject(p.next) ? insert(db, OCC, p.next, OCC_DEFAULTS) : null;
    if (isObject(p.obligation_patch)) applyPatch(obligation, p.obligation_patch, OB_MUTABLE);
    insertLog(db, p.log);
    return { closed, next, obligation };
  };
  const functions: Record<string, (db: Db, p: Row) => Row> = {
    firm_activate: (db, p) => {
      const obligation = insert(db, OB, p.obligation, OB_DEFAULTS);
      const occurrence = isObject(p.occurrence) ? insert(db, OCC, p.occurrence, OCC_DEFAULTS) : null;
      insertLog(db, p.log);
      return { obligation, occurrence };
    },
    firm_activate_from_inactive: (db, p) => {
      const obligation = lockObligation(db, p.obligation_id);
      if (obligation.active === true) throw new Raise(ALREADY_ACTIVE);
      // Opening nothing, the plan found an occurrence open: refused if none is open now.
      if (!isObject(p.occurrence_insert) && !hasOpen(db, p.obligation_id)) throw new Raise(CLOSED_SINCE);
      applyPatch(obligation, p.obligation_patch, OB_MUTABLE);
      let occurrence: Row | null = null;
      const upd = p.occurrence_update as Row | null;
      if (isObject(upd)) occurrence = updateWhere(db, upd!.id, 'open', upd!.patch, NOT_OPEN);
      if (isObject(p.occurrence_insert)) occurrence = insert(db, OCC, p.occurrence_insert, OCC_DEFAULTS);
      insertLog(db, p.log);
      return { obligation, occurrence };
    },
    firm_update: (db, p) => {
      const obligation = lockObligation(db, p.obligation_id);
      applyPatch(obligation, p.obligation_patch, OB_MUTABLE);
      const occ = p.occurrence as Row | null;
      const occurrence = occ ? updateWhere(db, occ.id, 'open', occ.patch, NOT_OPEN) : null;
      insertLog(db, p.log);
      return { obligation, occurrence };
    },
    firm_retire: (db, p) => {
      const obligation = lockObligation(db, p.obligation_id);
      if (obligation.active === false) throw new Raise(ALREADY_RETIRED);
      applyPatch(obligation, p.obligation_patch, OB_MUTABLE);
      insertLog(db, p.log);
      return { obligation };
    },
    firm_reactivate: (db, p) => {
      const obligation = lockObligation(db, p.obligation_id);
      if (obligation.active === true) throw new Raise(ALREADY_ACTIVE);
      if (!isObject(p.occurrence) && !hasOpen(db, p.obligation_id)) throw new Raise(CLOSED_SINCE);
      applyPatch(obligation, p.obligation_patch, OB_MUTABLE);
      const occurrence = isObject(p.occurrence) ? insert(db, OCC, p.occurrence, OCC_DEFAULTS) : null;
      insertLog(db, p.log);
      return { obligation, occurrence };
    },
    firm_mark_done: close('completed'),
    firm_mark_not_applicable: close('not-applicable'),
    firm_undo: (db, p) => {
      const obligation = lockObligation(db, p.obligation_id);
      if (p.remove_occurrence_id == null) {
        // No next to remove: canUndo's rule, re-checked — nothing else open, and nothing
        // created at or after the close (timestamptz order; the stamps are ISO strings).
        const closedAt = t(db, OCC).find((x) => x.id === p.occurrence_id)?.created_at;
        if (t(db, OCC).some((x) => x.obligation_id === p.obligation_id && x.id !== p.occurrence_id
          && (x.state === 'open' || (closedAt != null && String(x.created_at) >= String(closedAt))))) {
          throw new Raise(OPENED_SINCE);
        }
      }
      let removed: Row | null = null;
      if (p.remove_occurrence_id != null) {
        // DELETE … WHERE id = remove AND state = 'open' AND touched = false AND
        // materialized_from = occurrence_id RETURNING * — BEFORE the reopen (the index).
        const occs = t(db, OCC);
        const i = occs.findIndex((x) => x.id === p.remove_occurrence_id && x.state === 'open'
          && x.touched === false && x.materialized_from === p.occurrence_id);
        if (i < 0) throw new Raise(NOT_UNTOUCHED);
        [removed] = occs.splice(i, 1);
        // materialized_from … ON DELETE SET NULL.
        for (const x of occs) if (x.materialized_from === removed.id) x.materialized_from = null;
      }
      const reopened = updateWhere(db, p.occurrence_id, 'done', p.reopen_patch, NOT_CLOSED);
      if (isObject(p.obligation_patch)) applyPatch(obligation, p.obligation_patch, OB_MUTABLE);
      insertLog(db, p.log);
      return { reopened, removed, obligation };
    },
    firm_set_due_override: (db, p) => {
      const occurrence = updateWhere(db, p.occurrence_id, 'open', p.patch, NOT_OPEN);
      insertLog(db, p.log);
      return { occurrence };
    },
  };

  function rpc(fn: string, args: { p: Row }) {
    const injected = arm(fn, 'rpc');
    const call: Call = { table: fn, op: 'rpc', row: args.p };
    calls.push(call);
    if (injected) {
      call.failed = true;
      return Promise.resolve({ data: null, error: { message: `injected failure: rpc ${fn}` } });
    }
    const run = functions[fn];
    if (!run) throw new Error(`the fake has no function ${fn}`);
    const draft = JSON.parse(JSON.stringify(tables)) as Db;
    // This call's now(): one server time for the whole transaction.
    clock += 1000;
    txNow = new Date(clock).toISOString();
    try {
      const p = (args.p == null ? {} : JSON.parse(JSON.stringify(args.p))) as Row;
      // The first statement of every function: a required part missing, or of the wrong
      // JSON type, is refused before anything else runs.
      for (const [key, type] of REQUIRED_PARTS[fn]) if (jsonType(p[key]) !== type) throw new Raise(INCOMPLETE);
      const data = run(draft, p);
      tables = draft;
      return Promise.resolve({ data: JSON.parse(JSON.stringify(data)) as unknown, error: null });
    } catch (e) {
      if (!(e instanceof Raise)) throw e;
      call.failed = true;
      return Promise.resolve({ data: null, error: { message: e.message } });
    }
  }

  const client = { from, rpc, auth: { getSession: async () => ({ data: { session: null } }) } };
  const writes = () => calls.map((c) => `${c.op}:${c.table}${c.failed ? ' FAILED' : ''}`);
  /** A table as the database would read it back: sorted by id, and a NULL column the
   *  same as one never written. */
  const snapshot = (table: string): Row[] => (JSON.parse(JSON.stringify(tables[table] ?? [])) as Row[])
    .map((r) => Object.fromEntries(Object.entries(r).filter(([, v]) => v !== null)))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const failOn = (table: string, op: Exclude<Op, 'select'>, nth = 1) => { injectors.push({ table, op, nth, seen: 0 }); };
  const landsBefore = (table: string, op: Exclude<Op, 'select'>, land: () => void, nth = 1) => {
    arrivals.push({ table, op, nth, seen: 0, land });
  };
  return {
    client: client as unknown as SupabaseClient,
    /** The live tables (a committed function replaces the object, so read through this). */
    table: (name: string): Row[] => tables[name] ?? (tables[name] = []),
    calls, writes, snapshot, failOn, landsBefore,
    /** The latest function call's now() — what its inserts stamped. */
    lastNow: () => txNow,
    reset: () => { calls.length = 0; injectors.length = 0; arrivals.length = 0; },
  };
}

type Fake = ReturnType<typeof fakeSupabase>;
type Sb = InstanceType<typeof SupabaseAdapter>;

/** Every table a firm act touches, as the database would read it back. */
const dbState = (fake: Fake) => ({ obligations: fake.snapshot(OB), occurrences: fake.snapshot(OCC), log: fake.snapshot(LOG) });

/** The message an act failed with; the test fails if the act did not. */
const messageOf = (act: Promise<unknown>): Promise<string> =>
  act.then(() => { throw new Error('the act did not fail'); }, (e: unknown) => (e as Error).message);

const RULE_EDIT: FirmObligationPatch = { recurrence: { kind: 'fixed-monthly', day: 15 }, leadDays: 9 };

/** An activated obligation whose first occurrence was pushed to Outlook, with the call
 *  record cleared. */
async function activated(over: Partial<FirmObligationCreate> = {}) {
  const fake = fakeSupabase();
  const db = new SupabaseAdapter(fake.client);
  const { obligation, occurrence } = await db.createFirmObligation(monthly(over));
  if (occurrence) await db.updateFirmOccurrenceSync(occurrence.id, { outlookEventId: 'AAMk-first', syncStatus: 'synced' });
  fake.reset();
  return { fake, db, obligation, occurrence };
}

/** activated(), then Done once, the next occurrence pushed too. */
async function closedOnce(over: Partial<FirmObligationCreate> = {}) {
  const s = await activated(over);
  const done = await s.db.markOccurrenceDone(s.occurrence!.id, {});
  await s.db.updateFirmOccurrenceSync(done.next!.id, {
    outlookEventId: 'AAMk-next', syncStatus: 'synced', lastSyncAt: '2026-09-11T12:00:00.000Z',
  });
  s.fake.reset();
  return { ...s, done };
}

/** Every act, set up on its own fake with the name given, ready to run once: its function
 *  and the exact act label its one failure message begins with. */
interface Scenario { fake: Fake; db: Sb; fn: string; act: string; run: () => Promise<unknown> }
const SCENARIOS: [string, (name: string, plain: string) => Promise<Scenario>][] = [
  ['activation', async (name, plain) => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    return { fake, db, fn: 'firm_activate', act: `Activating ${plain}`, run: () => db.createFirmObligation(monthly({ name })) };
  }],
  ['Edit…', async (name, plain) => {
    const { fake, db, obligation } = await activated({ name });
    return { fake, db, fn: 'firm_update', act: `The edit to ${plain}`, run: () => db.updateFirmObligation(obligation.id, RULE_EDIT) };
  }],
  ['Retire', async (name, plain) => {
    const { fake, db, obligation } = await activated({ name });
    return { fake, db, fn: 'firm_retire', act: `Retiring ${plain}`, run: () => db.retireFirmObligation(obligation.id) };
  }],
  ['Re-activate', async (name, plain) => {
    const { fake, db, obligation } = await activated({ name, active: false });
    return { fake, db, fn: 'firm_reactivate', act: `Activating ${plain}`, run: () => db.reactivateFirmObligation(obligation.id) };
  }],
  ['Activate… from Inactive', async (name, plain) => {
    const { fake, db, obligation } = await activated({ name, active: false });
    return {
      fake, db, fn: 'firm_activate_from_inactive', act: `Activating ${plain}`,
      run: () => db.activateFromInactive(obligation.id, { leadDays: 9 }),
    };
  }],
  ['Done', async (name, plain) => {
    const { fake, db, occurrence } = await activated({ name });
    return {
      fake, db, fn: 'firm_mark_done', act: `Done for ${plain} (${occurrence!.periodLabel})`,
      run: () => db.markOccurrenceDone(occurrence!.id, {}),
    };
  }],
  ['Not applicable', async (name, plain) => {
    const { fake, db, occurrence } = await activated({ name, conditionalPerPeriod: true });
    return {
      fake, db, fn: 'firm_mark_not_applicable', act: `Not applicable for ${plain} (${occurrence!.periodLabel})`,
      run: () => db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' }),
    };
  }],
  ['Undo', async (name, plain) => {
    const { fake, db, occurrence } = await closedOnce({ name });
    return {
      fake, db, fn: 'firm_undo', act: `Undo for ${plain} (${occurrence!.periodLabel})`,
      run: () => db.undoOccurrence(occurrence!.id),
    };
  }],
  ['the due-date change', async (name, plain) => {
    const { fake, db, occurrence } = await activated({ name });
    return {
      fake, db, fn: 'firm_set_due_override', act: `The due-date change for ${plain} (${occurrence!.periodLabel})`,
      run: () => db.setOccurrenceDueOverride(occurrence!.id, addDays(occurrence!.dueOn, 3)),
    };
  }],
];

const escaped = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ---------------------------------------------------------------- supabase: the tests

describe('SupabaseAdapter — one act, one function call (#156 A5)', () => {
  it('listing reads and writes nothing — Supabase mode seeds NOTHING (FOD-9, FOD-21)', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    expect(await db.listFirmObligations()).toEqual([]);
    expect(await db.listFirmObligationOccurrences()).toEqual([]);
    expect(fake.writes()).toEqual([]);
  });

  it('the scenarios cover all nine functions, once each', async () => {
    const fns: string[] = [];
    for (const [, scenario] of SCENARIOS) fns.push((await scenario('Adapter fixture', 'Adapter fixture')).fn);
    expect(fns.sort()).toEqual([...FIRM_FUNCTIONS].sort());
  });

  for (const [label, scenario] of SCENARIOS) {
    it(`${label}: exactly ONE rpc() call, to its own function, and no table write of its own`, async () => {
      const s = await scenario('Adapter fixture', 'Adapter fixture');
      await s.run();
      expect(s.fake.writes()).toEqual([`rpc:${s.fn}`]);
    });
  }

  it('the source: every act calls its function, and the only plain firm writes left are the sync write and the delete queue', () => {
    for (const fn of FIRM_FUNCTIONS) expect(supabaseSource, fn).toContain(`'${fn}'`);
    expect(supabaseSource).toContain('this.sb.rpc(fn, { p })');
    expect(supabaseSource).not.toMatch(/insertRow<\w+>\('firm_obligation/);
    expect(supabaseSource).not.toMatch(/deleteRows\('firm_obligation/);
    expect(supabaseSource.match(/updateRow<FirmObligation>\('firm_obligations'/g)).toHaveLength(2);
    expect(supabaseSource.match(/updateRow<FirmObligationOccurrence>\('firm_obligation_occurrences'/g)).toHaveLength(1);
  });

  it('activation: firm_activate carries the obligation row, its first occurrence and the ONE log line', async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const res = await db.createFirmObligation(monthly());
    expect(fake.calls[0].row).toMatchObject({
      obligation: { id: res.obligation.id, name: 'Adapter fixture', lead_days: 5, outlook_reminder_days: 5, pending_outlook_deletes: [] },
      occurrence: { id: res.occurrence!.id, obligation_id: res.obligation.id, state: 'open', touched: false },
      log: { action: 'created', entity_type: 'firm_obligation', entity_id: res.obligation.id },
    });
    expect(res.obligation).toMatchObject({ outlookReminderDays: 5, pendingOutlookDeletes: [], active: true });
    expect(res.occurrence).toMatchObject({ state: 'open', touched: false });
    expect(dbState(fake).log).toHaveLength(1);
  });

  it('Done: firm_mark_done carries the close (touched, done_by from the session) and the next linked to it; one open after', async () => {
    const { fake, db, occurrence } = await activated();
    const res = await db.markOccurrenceDone(occurrence!.id, {});
    expect(fake.calls[0].row).toMatchObject({
      occurrence_id: occurrence!.id,
      occurrence_patch: { state: 'done', outcome: 'completed', outcome_reason: null, touched: true, done_by: null },
      next: { id: res.next!.id, materialized_from: occurrence!.id, touched: false, state: 'open' },
      obligation_patch: null,
      log: { action: 'done', entity_type: 'firm_obligation_occurrence', entity_id: occurrence!.id },
    });
    expect(res.closed).toMatchObject({ id: occurrence!.id, state: 'done' });
    expect(res.next).toMatchObject({ state: 'open', materializedFrom: occurrence!.id });
    expect(res.obligation).toMatchObject({ active: true });
    expect(fake.table(OCC).filter((r) => r.state === 'open')).toHaveLength(1);
  });

  it('Undo: firm_undo names the next to remove and the close to reopen; the next is gone and returned', async () => {
    const { fake, db, occurrence, done } = await closedOnce();
    const res = await db.undoOccurrence(occurrence!.id);
    expect(fake.calls[0].row).toMatchObject({
      occurrence_id: occurrence!.id, remove_occurrence_id: done.next!.id, obligation_patch: null,
      reopen_patch: { state: 'open', done_on: null, outcome: null },
      log: { action: 'undone', entity_type: 'firm_obligation_occurrence' },
    });
    expect(res.removed).toMatchObject({ id: done.next!.id, outlookEventId: 'AAMk-next' });
    expect(res.reopened).toMatchObject({ id: occurrence!.id, state: 'open' });
    expect(res.reopened.doneOn).toBeUndefined();
    expect(fake.table(OCC).map((r) => r.id)).toEqual([occurrence!.id]);
  });

  it('a one-time Done retires the obligation in the same call (FOD-32)', async () => {
    const { fake, db, occurrence } = await activated({ recurrence: { kind: 'one-time', dueOn: '2026-01-02' } });
    const res = await db.markOccurrenceDone(occurrence!.id, {});
    expect(fake.writes()).toEqual(['rpc:firm_mark_done']);
    expect(fake.calls[0].row).toMatchObject({ next: null, obligation_patch: { active: false } });
    expect(res.obligation.active).toBe(false);
    expect(res.next).toBeNull();
  });

  it('Activate… from Inactive (A7): ONE call carrying the edit and the re-activation — never firm_update then firm_reactivate', async () => {
    const { fake, db, obligation } = await activated({ active: false });
    const res = await db.activateFromInactive(obligation.id, { leadDays: 9, outlookReminderDays: 12 });
    expect(fake.writes()).toEqual(['rpc:firm_activate_from_inactive']);
    expect(fake.calls[0].row).toMatchObject({
      obligation_id: obligation.id,
      obligation_patch: { active: true, lead_days: 9, outlook_reminder_days: 12 },
      occurrence_update: null,
      occurrence_insert: { id: res.occurrence!.id, obligation_id: obligation.id, state: 'open', touched: false },
      log: { action: 'edited', entity_type: 'firm_obligation', entity_id: obligation.id },
    });
    expect(dbState(fake).log.filter((l) => l.entity_id === obligation.id)).toHaveLength(2);
  });

  it('a refused act writes nothing at all — the domain refuses before the call', async () => {
    const { fake, db, occurrence } = await activated();
    await expect(db.markOccurrenceNotApplicable(occurrence!.id, { reason: 'condition-not-met' })).rejects.toThrow(/FOD-18/);
    expect(fake.writes()).toEqual([]);
  });

  it('the sync write sends ONLY the four sync columns', async () => {
    const { fake, db, occurrence } = await activated();
    await db.updateFirmOccurrenceSync(occurrence!.id, {
      syncStatus: 'synced', outlookEventId: 'AAMk-fixture', ...({ state: 'done' } as object),
    });
    expect(Object.keys(fake.calls[0].row!).sort()).toEqual(['outlook_event_id', 'sync_status']);
  });
});

describe('SupabaseAdapter — a failing function: ONE message, and nothing changes (#156 A5)', () => {
  for (const [label, scenario] of SCENARIOS) {
    it(`${label}: exactly "<act> was not saved: <the function's message>", every table as it was`, async () => {
      const s = await scenario('Adapter fixture', 'Adapter fixture');
      const before = dbState(s.fake);
      s.fake.failOn(s.fn, 'rpc');
      expect(await messageOf(s.run())).toBe(`${s.act} was not saved: injected failure: rpc ${s.fn}`);
      expect(s.fake.writes()).toEqual([`rpc:${s.fn} FAILED`]);
      expect(dbState(s.fake)).toEqual(before);
    });
  }

  it('the compensation is retired: no restore, no "could not be restored", no "saved without its review-log line"', () => {
    // Executable lines only: the section's header comment names what was retired.
    const code = supabaseSource.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    for (const gone of [
      'firmPrior', 'firmRestore', 'firmFirstWrite', 'firmSavedWithoutLog', 'firmNotRestored', 'firmWhereToLook',
      'firmOrphanedEvent', 'firmNotCarried', 'firmNotSaved', 'writeFirmLog',
      'stopped part-way', 'could not be restored', 'was saved, but', 'saved without its first occurrence',
    ]) {
      expect(code, gone).not.toContain(gone);
    }
    // The one message class is still there, on an executable line.
    expect(code).toContain('`${act} was not saved: ${res.error.message}`');
  });

  it('a guard inside the function: Edit… after another writer closed the occurrence — the obligation patch that already ran is rolled back', async () => {
    const { fake, db, obligation, occurrence } = await activated();
    fake.landsBefore('firm_update', 'rpc', () => {
      Object.assign(fake.table(OCC).find((r) => r.id === occurrence!.id)!, { state: 'done', done_on: '2026-09-01', outcome: 'completed' });
    });
    const before = dbState(fake);
    const message = await messageOf(db.updateFirmObligation(obligation.id, RULE_EDIT));
    expect(message).toBe(`The edit to Adapter fixture was not saved: ${NOT_OPEN}`);
    expect(fake.writes()).toEqual(['rpc:firm_update FAILED']);
    const after = dbState(fake);
    expect(after.obligations).toEqual(before.obligations);
    expect(after.obligations[0]).toMatchObject({ lead_days: 5 });
    expect(after.log).toEqual(before.log);
  });

  it('a guard inside the function: Undo after another writer touched the next — nothing removed, nothing reopened', async () => {
    const { fake, db, occurrence, done } = await closedOnce();
    fake.landsBefore('firm_undo', 'rpc', () => {
      fake.table(OCC).find((r) => r.id === done.next!.id)!.touched = true;
    });
    const message = await messageOf(db.undoOccurrence(occurrence!.id));
    expect(message).toBe(`Undo for Adapter fixture (${occurrence!.periodLabel}) was not saved: ${NOT_UNTOUCHED}`);
    const after = dbState(fake);
    expect(after.occurrences.map((r) => [r.id, r.state])).toEqual(
      [[occurrence!.id, 'done'], [done.next!.id, 'open']].sort((a, b) => a[0].localeCompare(b[0])),
    );
  });

  it('a guard inside the function: Activate… from Inactive after another writer activated the row — refused, nothing written', async () => {
    const { fake, db, obligation } = await activated({ active: false });
    fake.landsBefore('firm_activate_from_inactive', 'rpc', () => {
      fake.table(OB).find((r) => r.id === obligation.id)!.active = true;
    });
    const before = dbState(fake);
    expect(await messageOf(db.activateFromInactive(obligation.id, { leadDays: 9 })))
      .toBe(`Activating Adapter fixture was not saved: ${ALREADY_ACTIVE}`);
    // Only the other writer's change stands: the patch did not land, and no line was written.
    const after = dbState(fake);
    expect(after.obligations).toEqual([{ ...before.obligations[0], active: true }]);
    expect(after.obligations[0]).toMatchObject({ lead_days: 5 });
    expect(after.occurrences).toEqual(before.occurrences);
    expect(after.log).toEqual(before.log);
  });

  it('the fake models the one-open index inside a function: a second open occurrence raises it, and the patch before it rolls back', async () => {
    // Retire closes nothing (FOD-8), so a retired row still has its open occurrence; a
    // re-activation that inserted another would break FOD-5 at the database.
    const { fake, db, obligation, occurrence } = await activated();
    await db.retireFirmObligation(obligation.id);
    const before = dbState(fake);
    const res = await (fake.client as unknown as { rpc: (fn: string, a: { p: Row }) => Promise<{ error: { message: string } | null }> })
      .rpc('firm_reactivate', { p: {
        obligation_id: obligation.id, obligation_patch: { active: true },
        occurrence: { id: 'second-open', obligation_id: obligation.id, period_label: 'x', due_on: occurrence!.dueOn },
        log: { entity_type: 'firm_obligation', entity_id: obligation.id, action: 'edited' },
      } });
    expect(res.error?.message).toBe(INDEX_ERROR);
    expect(dbState(fake)).toEqual(before);
  });

  // ---- the race guards (the fix build's review, L1-4 and L6-5): two acts, each correct
  // on the rows it read, that together would leave a row active with nothing open, or undo
  // a close that is no longer the latest. The other writer lands between the adapter's
  // reads and its call.

  for (const [label, fn, close] of [
    ['Done', 'firm_mark_done', (db: Sb, id: string) => db.markOccurrenceDone(id, {})],
    ['Not applicable', 'firm_mark_not_applicable', (db: Sb, id: string) => db.markOccurrenceNotApplicable(id, { reason: 'condition-not-met' })],
  ] as const) {
    it(`a race guard inside the function: ${label} on a retired row's open occurrence after another writer re-activated the row — refused, nothing written; reloaded, it closes with its next`, async () => {
      const { fake, db, obligation, occurrence } = await activated({ conditionalPerPeriod: true });
      await db.retireFirmObligation(obligation.id);
      fake.reset();
      fake.landsBefore(fn, 'rpc', () => {
        fake.table(OB).find((r) => r.id === obligation.id)!.active = true;
      });
      const before = dbState(fake);
      expect(await messageOf(close(db, occurrence!.id)))
        .toBe(`${label} for Adapter fixture (${occurrence!.periodLabel}) was not saved: ${REACTIVATED}`);
      // The plan was built on the retired row: no next, and no obligation patch.
      expect(fake.calls[0].row).toMatchObject({ next: null, obligation_patch: null });
      expect(fake.writes()).toEqual([`rpc:${fn} FAILED`]);
      // Only the other writer's change stands.
      const after = dbState(fake);
      expect(after.obligations).toEqual([{ ...before.obligations[0], active: true }]);
      expect(after.occurrences).toEqual(before.occurrences);
      expect(after.log).toEqual(before.log);
      // Reloaded, the same close plans its next: the row is never left active with nothing open.
      const res = await close(db, occurrence!.id);
      expect(res.next).toMatchObject({ state: 'open', materializedFrom: occurrence!.id });
      expect(fake.table(OCC).filter((r) => r.obligation_id === obligation.id && r.state === 'open')).toHaveLength(1);
    });
  }

  for (const [label, fn, key, act] of [
    ['Re-activate', 'firm_reactivate', 'occurrence', (db: Sb, id: string) => db.reactivateFirmObligation(id)],
    ['Activate… from Inactive', 'firm_activate_from_inactive', 'occurrence_insert', (db: Sb, id: string) => db.activateFromInactive(id, { leadDays: 9 })],
  ] as const) {
    it(`a race guard inside the function: ${label} of a retired row after another writer closed its open occurrence — refused, nothing written; reloaded, it opens an occurrence of its own`, async () => {
      const { fake, db, obligation, occurrence } = await activated();
      await db.retireFirmObligation(obligation.id);
      fake.reset();
      const closedByOther = { state: 'done', done_on: '2026-09-01', outcome: 'completed' };
      fake.landsBefore(fn, 'rpc', () => {
        Object.assign(fake.table(OCC).find((r) => r.id === occurrence!.id)!, closedByOther);
      });
      const before = dbState(fake);
      expect(await messageOf(act(db, obligation.id))).toBe(`Activating Adapter fixture was not saved: ${CLOSED_SINCE}`);
      // The plan found the occurrence open, so it opened none.
      expect(fake.calls[0].row![key]).toBeNull();
      expect(fake.writes()).toEqual([`rpc:${fn} FAILED`]);
      // Only the other writer's close stands: the row is still retired, its patch unapplied.
      const after = dbState(fake);
      expect(after.obligations).toEqual(before.obligations);
      expect(after.obligations[0]).toMatchObject({ active: false, lead_days: 5 });
      expect(after.occurrences).toEqual(before.occurrences.map((r) => (r.id === occurrence!.id ? { ...r, ...closedByOther } : r)));
      expect(after.log).toEqual(before.log);
      // Reloaded, the activation opens an occurrence: active, with exactly one open.
      const res = await act(db, obligation.id);
      expect(res.obligation.active).toBe(true);
      expect(res.occurrence).toMatchObject({ state: 'open' });
      expect(fake.table(OCC).filter((r) => r.obligation_id === obligation.id && r.state === 'open')).toHaveLength(1);
    });
  }

  it("a race guard inside the function: Undo of a close that opened no next, after another writer opened an occurrence — refused (canUndo's rule, re-checked at the database)", async () => {
    // A one-time Done retires its obligation and materializes no next (FOD-32); it stays
    // undoable while nothing has opened since (Michael's stop ruling 2, 2026-09-16).
    const oneTime: Partial<FirmObligationCreate> = { recurrence: { kind: 'one-time', dueOn: '2026-01-02' } };
    for (const since of ['open', 'done'] as const) {
      const { fake, db, obligation, occurrence } = await activated(oneTime);
      await db.markOccurrenceDone(occurrence!.id, {});
      fake.reset();
      const closedAt = String(fake.table(OCC).find((r) => r.id === occurrence!.id)!.created_at);
      fake.landsBefore('firm_undo', 'rpc', () => {
        // Another writer's re-activation opened a second occurrence — still open, or already
        // closed in turn (then only its created_at shows it). The OPEN one is stamped BEFORE
        // the close, so only the guard's open limb can refuse it; the done one after, so only
        // its created_at limb can (the fix build's re-sweep, F1 verifier).
        fake.table(OCC).push({
          id: `opened-since-${since}`, obligation_id: obligation.id, period_label: '2026-03-02', due_on: '2026-03-02',
          state: since, sync_status: 'pending', touched: since === 'done',
          ...(since === 'done' ? { done_on: '2026-03-02', outcome: 'completed' } : {}),
          created_at: new Date(Date.parse(closedAt) + (since === 'open' ? -60_000 : 60_000)).toISOString(),
        });
      });
      const before = dbState(fake);
      expect(await messageOf(db.undoOccurrence(occurrence!.id)), since)
        .toBe(`Undo for Adapter fixture (${occurrence!.periodLabel}) was not saved: ${OPENED_SINCE}`);
      // The plan found nothing opened since: no next to remove, the retirement to put back.
      expect(fake.calls[0].row, since).toMatchObject({ remove_occurrence_id: null, obligation_patch: { active: true } });
      const after = dbState(fake);
      expect(after.obligations, since).toEqual(before.obligations);
      expect(after.obligations[0], since).toMatchObject({ active: false });
      expect(after.occurrences.find((r) => r.id === occurrence!.id), since).toMatchObject({ state: 'done' });
      expect(after.log, since).toEqual(before.log);
    }
    // With nothing opened since, the same Undo lands and puts the retirement back.
    const { db, occurrence } = await activated(oneTime);
    await db.markOccurrenceDone(occurrence!.id, {});
    expect(await db.undoOccurrence(occurrence!.id)).toMatchObject({ removed: null, reopened: { state: 'open' }, obligation: { active: true } });
  });
});

describe("SupabaseAdapter — the database's clock orders occurrences (the fix build's review, L4-1)", () => {
  it("a returned row carries the function's now() as created_at and updated_at — not the stamp the plan sent", async () => {
    const fake = fakeSupabase();
    const db = new SupabaseAdapter(fake.client);
    const res = await db.createFirmObligation(monthly());
    const sent = fake.calls[0].row as { obligation: Row; occurrence: Row };
    const stamp = fake.lastNow();
    // The plan still sends the browser's stamp; the function does not keep it.
    expect(sent.occurrence.created_at).toEqual(expect.any(String));
    expect(sent.occurrence.created_at).not.toBe(stamp);
    expect(sent.obligation.created_at).not.toBe(stamp);
    expect(res.occurrence).toMatchObject({ createdAt: stamp, updatedAt: stamp });
    expect(res.obligation).toMatchObject({ createdAt: stamp, updatedAt: stamp });

    const done = await db.markOccurrenceDone(res.occurrence!.id, {});
    const nextSent = (fake.calls[1].row as { next: Row }).next;
    expect(done.next!.createdAt).toBe(fake.lastNow());
    expect(done.next!.createdAt).not.toBe(nextSent.created_at);
    expect(done.next!.createdAt > res.occurrence!.createdAt).toBe(true);
  });

  it('a browser clock set back cannot reorder closes: latestClosed and canUndo read the order the database stamped', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    try {
      vi.setSystemTime(new Date('2026-09-16T15:00:00.000Z'));
      const fake = fakeSupabase();
      const db = new SupabaseAdapter(fake.client);
      const { obligation, occurrence: first } = await db.createFirmObligation(monthly());
      const firstSent = (fake.calls[0].row as { occurrence: Row }).occurrence;
      await db.retireFirmObligation(obligation.id);
      await db.markOccurrenceDone(first!.id, {}); // a Done on a retired row: no next

      // The browser's clock steps back five minutes before the row is activated again.
      vi.setSystemTime(new Date('2026-09-16T14:55:00.000Z'));
      const { occurrence: second } = await db.activateFromInactive(obligation.id, {});
      const secondSent = (fake.calls.at(-1)!.row as { occurrence_insert: Row }).occurrence_insert;
      await db.retireFirmObligation(obligation.id);
      await db.markOccurrenceDone(second!.id, {});

      // By the plans' own stamps the second came first ...
      expect(String(secondSent.created_at) < String(firstSent.created_at)).toBe(true);
      // ... but the database stamped the order the acts happened in,
      const all = (await db.listFirmObligationOccurrences()).filter((o) => o.obligationId === obligation.id);
      expect(all.find((o) => o.id === second!.id)!.createdAt > all.find((o) => o.id === first!.id)!.createdAt).toBe(true);
      // so the latest close is the second, and the first can no longer be undone.
      expect(latestClosed(all)!.id).toBe(second!.id);
      await expect(db.undoOccurrence(first!.id)).rejects.toThrow(/A later occurrence has been opened since/);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('SupabaseAdapter — an incomplete request is refused before anything runs (#156 §1 item 9, A5)', () => {
  const rpcOf = (fake: Fake) =>
    (fake.client as unknown as { rpc: (fn: string, a: { p: unknown }) => Promise<{ error: { message: string } | null }> }).rpc;

  it("the fake's required parts, and the refusal words it uses, are the migration's own, function by function", () => {
    const code = migrationSql.replace(/--[^\n]*/g, '');
    const firsts = [...code.matchAll(/create or replace function public\.(\w+)\(p jsonb\)[\s\S]*?\bbegin\s+if ([\s\S]*?) then\s+raise exception '([^']*)';/g)];
    expect(firsts.map((m) => m[1]).sort()).toEqual([...FIRM_FUNCTIONS].sort());
    for (const [, fn, condition, message] of firsts) {
      expect(message, fn).toBe(INCOMPLETE);
      const parts = [...condition.matchAll(/jsonb_typeof\(p->'(\w+)'\) is distinct from '(\w+)'/g)].map((m) => [m[1], m[2]]);
      expect(parts, fn).toEqual(REQUIRED_PARTS[fn]);
    }
    for (const message of [NOT_FOUND, NOT_OPEN, NOT_CLOSED, NOT_UNTOUCHED, ALREADY_ACTIVE, ALREADY_RETIRED, INCOMPLETE, REACTIVATED, CLOSED_SINCE, OPENED_SINCE]) {
      expect(migrationSql, message).toContain(`raise exception '${message}';`);
    }
  });

  for (const [label, scenario] of SCENARIOS) {
    it(`${label}: each required part absent, null or of the wrong JSON type is refused with the one message, and nothing changes; the whole request lands`, async () => {
      const s = await scenario('Adapter fixture', 'Adapter fixture');
      // The request the act sends, captured from a call made to fail — so nothing landed.
      s.fake.failOn(s.fn, 'rpc');
      await messageOf(s.run());
      const p = s.fake.calls[0].row!;
      const before = dbState(s.fake);
      const rpc = rpcOf(s.fake);
      for (const [key, type] of REQUIRED_PARTS[s.fn]) {
        const absent: Row = { ...p };
        delete absent[key];
        for (const bad of [absent, { ...p, [key]: null }, { ...p, [key]: type === 'object' ? 'not an object' : { id: p[key] } }]) {
          expect((await rpc(s.fn, { p: bad })).error?.message, `${s.fn}: ${key}`).toBe(INCOMPLETE);
        }
      }
      expect(dbState(s.fake)).toEqual(before);
      expect((await rpc(s.fn, { p })).error).toBeNull();
    });
  }
});

describe("SupabaseAdapter — no failure message carries a name's markup (SUP2-1, over the one message class)", () => {
  // A catalog name is SPEC §7's cell, copied byte-for-byte, markdown and all. The page
  // shows a thrown message verbatim, so every act label is built from plainText(name).
  const MARKED = '`Form 1295` *annual* **report**';
  const PLAIN = 'Form 1295 annual report';

  for (const [label, scenario] of SCENARIOS) {
    it(label, async () => {
      const s = await scenario(MARKED, PLAIN);
      s.fake.failOn(s.fn, 'rpc');
      const message = await messageOf(s.run());
      expect(message).toMatch(new RegExp(`^${escaped(s.act)} was not saved: `));
      expect(message).toContain(PLAIN);
      expect(message).not.toMatch(/[`*]/);
    });
  }
});

describe('SupabaseAdapter — every act writes exactly one review_log line (§7 item 16)', () => {
  it('each act: one line, with its exact action AND entity type (review L3-3)', async () => {
    await everyActWritesOneLine(new SupabaseAdapter(fakeSupabase().client));
  });

  it('FOM-4: a first activation from Inactive takes "last period completed" on a serial row', async () => {
    await firstActivationTakesLastPeriodCompleted(new SupabaseAdapter(fakeSupabase().client));
  });
});

describe('SupabaseAdapter — the fix slice (#156)', () => {
  it('A7: Activate… from Inactive is ONE act writing ONE line, and a refusal writes nothing', async () => {
    const fake = fakeSupabase();
    await activateFromInactiveIsOneAct(new SupabaseAdapter(fake.client));
    // The refusal never reached the database: two calls in all — the activation and the act.
    expect(fake.writes()).toEqual(['rpc:firm_activate', 'rpc:firm_activate_from_inactive']);
  });

  it('A3: materializedFrom and touched come back through a Done → Undo round trip', async () => {
    await undoColumnsRoundTrip(new SupabaseAdapter(fakeSupabase().client));
  });

  it('A6: the Outlook-delete queue — idempotent queue, a failure counted and kept, a success removed, no line', async () => {
    await outlookDeleteQueue(new SupabaseAdapter(fakeSupabase().client));
  });

  it('A6: a queue write is ONE plain update sending ONLY pending_outlook_deletes — no function, no log line', async () => {
    const { fake, db, obligation } = await activated();
    await db.queueFirmOutlookDelete(obligation.id, { eventId: 'AAMk-x', occurrenceId: 'occ-x' });
    await db.settleFirmOutlookDelete(obligation.id, 'AAMk-x', 'failed');
    await db.settleFirmOutlookDelete(obligation.id, 'AAMk-x', 'deleted');
    expect(fake.writes()).toEqual([`update:${OB}`, `update:${OB}`, `update:${OB}`]);
    for (const c of fake.calls) expect(Object.keys(c.row!)).toEqual(['pending_outlook_deletes']);
    expect(fake.calls.map((c) => (c.row!.pending_outlook_deletes as FirmObligation['pendingOutlookDeletes']).map((e) => e.attempts)))
      .toEqual([[0], [1], []]);
  });
});
