// FIRM OBLIGATIONS — the firm half of src/outlook/sync.ts.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 7 (DECISION 7: the
// existing push queue drains both kinds). Review L3-6 found the firm sync path with no
// test of its own; review C4-8 found that one row whose push AND error write both threw
// stopped the rest of the firm queue; and a failed obligations read, after the queue had
// read, still rejected the whole drain, case half included (SUP2-7).
//
// The delete drain: docs/specs/firm-obligations-fix-slice.md §3 item 8 and §7 item 7 (the
// drain half — the register's queueing is the page's), #156 §1 item 9 (A6, "Retry on
// next sync"), FXD-2. FOS-2 RULED YES by Michael 2026-09-12 ("Yes"), session log #156.
//
// NO NETWORK and no MSAL: config, auth and graph are mocked whole, and the DataAdapter
// is a small hand-made fake holding only the methods sync.ts calls. The case half's
// Graph functions stay mocked and are never called here — the one test that runs the
// case half takes the case path's own no-Graph branch (a cancelled event that never
// reached Outlook). The ONE hand-through: the delete drain's tests route the mocked
// deleteFirmOutlookEvent to the REAL one over a stubbed fetch, so a 204, a 404 and a 500
// there are Graph's own answers reaching graph.ts's own handling. Every fixture is
// fictional.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { DataAdapter } from '../../data/adapter';
import type { CalendarEvent } from '../../domain/calendar';
import type { CaseRecord } from '../../domain/types';
import type { FirmObligation, FirmObligationOccurrence, PendingOutlookDelete } from '../../domain/firmObligations';
import { PENDING_DELETE_ATTENTION_ATTEMPTS, settledDeletes } from '../../domain/firmObligations';
import { getSignedInAccount, getToken } from '../auth';
import {
  ensureCalendar, forgetCalendar, pushToOutlook, GraphNotFoundError,
  ensureFirmCalendar, forgetFirmCalendar, pushFirmOccurrenceToOutlook, deleteFirmOutlookEvent,
} from '../graph';
import { removeFirmOccurrenceFromOutlook, syncAllPending, syncFirmOccurrence } from '../sync';

vi.mock('../config', () => ({ outlookConfigured: true }));
vi.mock('../auth', () => ({ getSignedInAccount: vi.fn(), getToken: vi.fn() }));
vi.mock('../graph', () => {
  // sync.ts tests `instanceof GraphNotFoundError` against what it imports — this class.
  class GraphNotFoundError extends Error {
    constructor(path: string) {
      super(`Graph resource not found: ${path}`);
    }
  }
  return {
    GraphNotFoundError,
    ensureCalendar: vi.fn(), forgetCalendar: vi.fn(), pushToOutlook: vi.fn(),
    ensureFirmCalendar: vi.fn(), forgetFirmCalendar: vi.fn(),
    pushFirmOccurrenceToOutlook: vi.fn(), deleteFirmOutlookEvent: vi.fn(),
  };
});

const STAMP = '2026-09-11T00:00:00.000Z';
const ACCOUNT = { username: 'fixture@example.test' } as NonNullable<Awaited<ReturnType<typeof getSignedInAccount>>>;

// ---- fixtures: fictional rows — no firm fact, no client data

function obligation(over: Partial<FirmObligation> = {}): FirmObligation {
  return {
    id: 'ob-1', name: 'Practice-time report', category: 'court-appointments', ownerScope: 'attorney',
    recurrence: { kind: 'fixed-annual', month: 10, day: 15 }, precision: 'day', missedPeriods: 'serial',
    conditionalPerPeriod: false, weekendRule: 'unknown', leadDays: 30, weight: 'hard', active: true,
    outlookReminderDays: 30, pendingOutlookDeletes: [], createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

function occurrence(over: Partial<FirmObligationOccurrence> = {}): FirmObligationOccurrence {
  return {
    id: 'occ-1', obligationId: 'ob-1', periodLabel: '2026', dueOn: '2026-10-15', state: 'open',
    syncStatus: 'pending', touched: false, createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

/** An Outlook event Undo could not delete, as the register queues it (FXD-2). */
function queued(over: Partial<PendingOutlookDelete> = {}): PendingOutlookDelete {
  return { eventId: 'evt-9', occurrenceId: 'occ-next', recordedAt: STAMP, attempts: 0, ...over };
}

function caseEvent(over: Partial<CalendarEvent> = {}): CalendarEvent {
  return {
    id: 'ev-1', caseId: 'case-1', title: 'Fixture hearing', eventType: 'hearing', startLocal: '2026-10-01',
    allDay: true, status: 'scheduled', syncStatus: 'pending', createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

type SyncPatch = Partial<Pick<FirmObligationOccurrence, 'outlookEventId' | 'syncStatus' | 'syncError' | 'lastSyncAt'>>;

/** Only what sync.ts calls. Each write answers with the row as it would read after it.
 *  The obligations are HELD, so a settled delete is what the next sync reads — computed
 *  by the domain's own settledDeletes, as both adapters compute it. `obligationNow` reads
 *  the held row without counting as a listFirmObligations call. */
function fakeDb(seed: {
  occurrences?: FirmObligationOccurrence[]; obligations?: FirmObligation[];
  events?: CalendarEvent[]; cases?: CaseRecord[];
} = {}) {
  const occById = new Map((seed.occurrences ?? []).map((o) => [o.id, o]));
  const obById = new Map((seed.obligations ?? []).map((o) => [o.id, o]));
  const evById = new Map((seed.events ?? []).map((e) => [e.id, e]));
  const fns = {
    listEventsPendingSync: vi.fn(async (): Promise<CalendarEvent[]> => seed.events ?? []),
    getCases: vi.fn(async (ids: string[]): Promise<CaseRecord[]> => (seed.cases ?? []).filter((c) => ids.includes(c.id))),
    updateEvent: vi.fn(async (id: string, patch: Partial<CalendarEvent>): Promise<CalendarEvent> =>
      ({ ...evById.get(id)!, ...patch })),
    listFirmOccurrencesPendingSync: vi.fn(async (): Promise<FirmObligationOccurrence[]> => seed.occurrences ?? []),
    listFirmObligations: vi.fn(async (): Promise<FirmObligation[]> => [...obById.values()]),
    updateFirmOccurrenceSync: vi.fn(async (id: string, patch: SyncPatch): Promise<FirmObligationOccurrence> =>
      ({ ...occById.get(id)!, ...patch })),
    settleFirmOutlookDelete: vi.fn(async (
      obligationId: string, eventId: string, outcome: 'deleted' | 'failed',
    ): Promise<FirmObligation> => {
      const ob = obById.get(obligationId)!;
      const next = { ...ob, pendingOutlookDeletes: settledDeletes(ob, eventId, outcome) };
      obById.set(obligationId, next);
      return next;
    }),
  };
  return { fns, db: fns as unknown as DataAdapter, obligationNow: (id: string) => obById.get(id) };
}

const graphUntouched = () => {
  expect(getToken).not.toHaveBeenCalled();
  expect(ensureFirmCalendar).not.toHaveBeenCalled();
  expect(pushFirmOccurrenceToOutlook).not.toHaveBeenCalled();
  expect(deleteFirmOutlookEvent).not.toHaveBeenCalled();
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(getSignedInAccount).mockResolvedValue(ACCOUNT);
  vi.mocked(getToken).mockResolvedValue('tok');
  vi.mocked(ensureFirmCalendar).mockResolvedValue('cal-firm');
});

describe('syncFirmOccurrence', () => {
  it('not connected: the occurrence comes back unchanged and nothing is written', async () => {
    vi.mocked(getSignedInAccount).mockResolvedValue(null);
    const occ = occurrence();
    const { fns, db } = fakeDb({ occurrences: [occ] });
    expect(await syncFirmOccurrence(db, occ, obligation())).toBe(occ);
    expect(fns.updateFirmOccurrenceSync).not.toHaveBeenCalled();
    graphUntouched();
  });

  it('pushes into the FIRM calendar and records the event id — never the case calendar', async () => {
    vi.mocked(pushFirmOccurrenceToOutlook).mockResolvedValue('evt-1');
    const occ = occurrence();
    const ob = obligation();
    const { fns, db } = fakeDb({ occurrences: [occ] });
    const res = await syncFirmOccurrence(db, occ, ob);
    expect(pushFirmOccurrenceToOutlook).toHaveBeenCalledWith('tok', 'cal-firm', occ, ob);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledTimes(1);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledWith('occ-1', {
      outlookEventId: 'evt-1', syncStatus: 'synced', syncError: '', lastSyncAt: expect.any(String),
    });
    expect(res).toMatchObject({ outlookEventId: 'evt-1', syncStatus: 'synced', syncError: '' });
    expect(ensureCalendar).not.toHaveBeenCalled();
    expect(pushToOutlook).not.toHaveBeenCalled();
  });

  it('a done occurrence never pushed is marked synced with NO Graph call', async () => {
    const done = occurrence({ state: 'done', doneOn: '2026-10-01', outcome: 'completed' });
    const { fns, db } = fakeDb({ occurrences: [done] });
    const res = await syncFirmOccurrence(db, done, obligation());
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledTimes(1);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledWith('occ-1', {
      syncStatus: 'synced', syncError: '', lastSyncAt: expect.any(String),
    });
    expect(res.syncStatus).toBe('synced');
    expect(res.outlookEventId).toBeUndefined();
    graphUntouched();
  });

  it('a stale firm calendar (GraphNotFoundError): forgets the FIRM cache, finds it again, retries once', async () => {
    vi.mocked(ensureFirmCalendar).mockResolvedValueOnce('cal-stale').mockResolvedValueOnce('cal-fresh');
    vi.mocked(pushFirmOccurrenceToOutlook)
      .mockRejectedValueOnce(new GraphNotFoundError('/me/calendars/cal-stale/events'))
      .mockResolvedValueOnce('evt-1');
    const occ = occurrence();
    const { fns, db } = fakeDb({ occurrences: [occ] });
    const res = await syncFirmOccurrence(db, occ, obligation());
    expect(forgetFirmCalendar).toHaveBeenCalledTimes(1);
    expect(forgetCalendar).not.toHaveBeenCalled();
    expect(ensureFirmCalendar).toHaveBeenCalledTimes(2);
    expect(vi.mocked(pushFirmOccurrenceToOutlook).mock.calls.map(([, calendarId]) => calendarId)).toEqual(['cal-stale', 'cal-fresh']);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledTimes(1);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledWith('occ-1', {
      outlookEventId: 'evt-1', syncStatus: 'synced', syncError: '', lastSyncAt: expect.any(String),
    });
    expect(res.syncStatus).toBe('synced');
  });

  it('ONE retry only: a second GraphNotFoundError is recorded as an error, not retried again', async () => {
    vi.mocked(pushFirmOccurrenceToOutlook)
      .mockRejectedValueOnce(new GraphNotFoundError('/me/calendars/cal-firm/events'))
      .mockRejectedValueOnce(new GraphNotFoundError('/me/calendars/cal-firm/events'));
    const occ = occurrence();
    const { fns, db } = fakeDb({ occurrences: [occ] });
    const res = await syncFirmOccurrence(db, occ, obligation());
    expect(pushFirmOccurrenceToOutlook).toHaveBeenCalledTimes(2);
    expect(forgetFirmCalendar).toHaveBeenCalledTimes(1);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledWith('occ-1', {
      syncStatus: 'error', syncError: 'Graph resource not found: /me/calendars/cal-firm/events',
    });
    expect(res.syncStatus).toBe('error');
  });

  it('a push error: syncStatus error, with the message — and no calendar refresh', async () => {
    vi.mocked(pushFirmOccurrenceToOutlook).mockRejectedValueOnce(new Error('Graph POST /me/calendars/cal-firm/events → 500: stub'));
    const occ = occurrence();
    const { fns, db } = fakeDb({ occurrences: [occ] });
    const res = await syncFirmOccurrence(db, occ, obligation());
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledTimes(1);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenCalledWith('occ-1', {
      syncStatus: 'error', syncError: 'Graph POST /me/calendars/cal-firm/events → 500: stub',
    });
    expect(res).toMatchObject({ syncStatus: 'error', syncError: 'Graph POST /me/calendars/cal-firm/events → 500: stub' });
    expect(pushFirmOccurrenceToOutlook).toHaveBeenCalledTimes(1);
    expect(forgetFirmCalendar).not.toHaveBeenCalled();
  });
});

describe('syncAllPending — the firm half', () => {
  it('C4-8: a row whose push AND error write both throw counts as failed, and the queue goes on', async () => {
    const bad = occurrence({ id: 'occ-bad' });
    const good = occurrence({ id: 'occ-good', periodLabel: '2027', dueOn: '2027-10-15' });
    const { fns, db } = fakeDb({ occurrences: [bad, good], obligations: [obligation()] });
    vi.mocked(pushFirmOccurrenceToOutlook).mockImplementation(async (_token, _calendarId, occ) => {
      if (occ.id === 'occ-bad') throw new Error('Graph POST → 500: stub');
      return 'evt-good';
    });
    fns.updateFirmOccurrenceSync.mockImplementation(async (id, patch) => {
      if (id === 'occ-bad') throw new Error('the error write failed too: stub');
      return { ...good, ...patch };
    });

    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 1 });
    // The bad row came FIRST; the good one after it was still pushed and recorded.
    expect(vi.mocked(pushFirmOccurrenceToOutlook).mock.calls.map(([, , occ]) => occ.id)).toEqual(['occ-bad', 'occ-good']);
    expect(fns.updateFirmOccurrenceSync).toHaveBeenLastCalledWith('occ-good', {
      outlookEventId: 'evt-good', syncStatus: 'synced', syncError: '', lastSyncAt: expect.any(String),
    });
  });

  it("SUP2-7: the firm queue reads but its obligations do not → every firm row counts as failed, and the case half's counts come back", async () => {
    const { fns, db } = fakeDb({
      events: [
        // Synced with no Graph call: cancelled before it ever reached Outlook.
        caseEvent({ id: 'ev-1', caseId: 'case-1', status: 'cancelled' }),
        // Failed with no Graph call: its case is not found.
        caseEvent({ id: 'ev-2', caseId: 'case-gone' }),
      ],
      cases: [{ id: 'case-1' } as CaseRecord],
      occurrences: [occurrence({ id: 'occ-a' }), occurrence({ id: 'occ-b', periodLabel: '2027', dueOn: '2027-10-15' })],
    });
    fns.listFirmObligations.mockRejectedValue(new Error('permission denied for table firm_obligations'));

    // One case event synced; the other case event and BOTH firm rows failed.
    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 3 });
    expect(fns.updateEvent).toHaveBeenCalledWith('ev-1', expect.objectContaining({ syncStatus: 'synced' }));
    expect(fns.listFirmOccurrencesPendingSync).toHaveBeenCalledTimes(1);
    expect(fns.listFirmObligations).toHaveBeenCalledTimes(1);
    expect(fns.updateFirmOccurrenceSync).not.toHaveBeenCalled();
    expect(fns.settleFirmOutlookDelete).not.toHaveBeenCalled();
    graphUntouched();
  });

  it("the firm tables not there yet (migration not run): the case half's counts come back", async () => {
    const { fns, db } = fakeDb({
      events: [
        // Synced with no Graph call: cancelled before it ever reached Outlook.
        caseEvent({ id: 'ev-1', caseId: 'case-1', status: 'cancelled' }),
        // Failed with no Graph call: its case is not found.
        caseEvent({ id: 'ev-2', caseId: 'case-gone' }),
      ],
      cases: [{ id: 'case-1' } as CaseRecord],
    });
    fns.listFirmOccurrencesPendingSync.mockRejectedValue(new Error('relation "firm_obligation_occurrences" does not exist'));

    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 1 });
    expect(fns.updateEvent).toHaveBeenCalledWith('ev-1', expect.objectContaining({ syncStatus: 'synced' }));
    expect(fns.listFirmOccurrencesPendingSync).toHaveBeenCalledTimes(1);
    expect(fns.listFirmObligations).not.toHaveBeenCalled();
    expect(fns.updateFirmOccurrenceSync).not.toHaveBeenCalled();
    expect(fns.settleFirmOutlookDelete).not.toHaveBeenCalled();
    expect(ensureCalendar).not.toHaveBeenCalled();
    expect(pushToOutlook).not.toHaveBeenCalled();
    graphUntouched();
  });
});

describe("syncAllPending — the delete drain: the events Undo could not delete (#156 §1 item 9, A6; FXD-2; slice §3 item 8, §7 item 7)", () => {
  // The REAL deleteFirmOutlookEvent, handed through the mock, over a stubbed fetch.
  const GRAPH = 'https://graph.microsoft.com/v1.0';
  const DELETE_EVT_9 = `DELETE ${GRAPH}/me/events/evt-9`;

  /** A fetch answering the given statuses in order, throwing on any call beyond them;
   *  returns a reader of the calls made, as "METHOD url". */
  function stubDeletes(...statuses: number[]) {
    const spy = vi.fn<typeof fetch>(async () => {
      const status = statuses.shift();
      if (status === undefined) throw new Error('unexpected fetch: no stubbed Graph reply left');
      return new Response(status === 204 ? null : 'stub', { status });
    });
    vi.stubGlobal('fetch', spy);
    return () => spy.mock.calls.map(([input, init]) => `${init?.method ?? 'GET'} ${String(input)}`);
  }

  beforeEach(async () => {
    const actual = await vi.importActual<typeof import('../graph')>('../graph');
    vi.mocked(deleteFirmOutlookEvent).mockImplementation(actual.deleteFirmOutlookEvent);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("Undo with Outlook disconnected leaves the entry queued; the next connected sync takes it — a 204: the DELETE sent once, settled 'deleted', the entry gone, counted synced", async () => {
    const { fns, db, obligationNow } = fakeDb({ obligations: [obligation({ pendingOutlookDeletes: [queued()] })] });
    const deletes = stubDeletes(204);

    // Not connected: nothing runs, nothing is read, the queue is as the register left it.
    vi.mocked(getSignedInAccount).mockResolvedValue(null);
    expect(await syncAllPending(db)).toEqual({ synced: 0, failed: 0 });
    expect(deletes()).toEqual([]);
    expect(fns.listFirmObligations).not.toHaveBeenCalled();
    expect(fns.settleFirmOutlookDelete).not.toHaveBeenCalled();
    graphUntouched();
    expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([queued()]);

    // Connected.
    vi.mocked(getSignedInAccount).mockResolvedValue(ACCOUNT);
    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 0 });
    expect(deletes()).toEqual([DELETE_EVT_9]);
    expect(deleteFirmOutlookEvent).toHaveBeenCalledTimes(1);
    expect(deleteFirmOutlookEvent).toHaveBeenCalledWith('tok', 'evt-9');
    expect(fns.settleFirmOutlookDelete).toHaveBeenCalledTimes(1);
    expect(fns.settleFirmOutlookDelete).toHaveBeenCalledWith('ob-1', 'evt-9', 'deleted');
    expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([]);

    // Drained: the next sync sends nothing.
    expect(await syncAllPending(db)).toEqual({ synced: 0, failed: 0 });
    expect(deletes()).toEqual([DELETE_EVT_9]);
  });

  it("a 404 — the event already gone in Outlook — settles 'deleted' too, and the entry leaves the queue", async () => {
    const { fns, db, obligationNow } = fakeDb({ obligations: [obligation({ pendingOutlookDeletes: [queued()] })] });
    const deletes = stubDeletes(404);
    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 0 });
    expect(deletes()).toEqual([DELETE_EVT_9]);
    expect(fns.settleFirmOutlookDelete).toHaveBeenCalledWith('ob-1', 'evt-9', 'deleted');
    expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([]);
  });

  it("a failure settles 'failed': attempts + 1, the entry KEPT, counted failed — retrying never stops, and a later success still removes it", async () => {
    const { fns, db, obligationNow } = fakeDb({ obligations: [obligation({ pendingOutlookDeletes: [queued()] })] });
    const deletes = stubDeletes(500, 500, 500, 204);
    // Past PENDING_DELETE_ATTENTION_ATTEMPTS the register ALSO names it (FXD-2); the drain
    // goes on trying it all the same.
    expect(PENDING_DELETE_ATTENTION_ATTEMPTS).toBe(3);
    for (const attempts of [1, 2, 3]) {
      expect(await syncAllPending(db)).toEqual({ synced: 0, failed: 1 });
      expect(fns.settleFirmOutlookDelete).toHaveBeenLastCalledWith('ob-1', 'evt-9', 'failed');
      expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([queued({ attempts })]);
    }
    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 0 });
    expect(fns.settleFirmOutlookDelete).toHaveBeenLastCalledWith('ob-1', 'evt-9', 'deleted');
    expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([]);
    expect(deletes()).toEqual([DELETE_EVT_9, DELETE_EVT_9, DELETE_EVT_9, DELETE_EVT_9]);
  });

  it('one bad entry never stops the rest: a failed delete whose settle write ALSO throws counts failed, and the entries after it — on its obligation and another — are still deleted and settled', async () => {
    const a = obligation({
      id: 'ob-a', pendingOutlookDeletes: [queued({ eventId: 'evt-bad' }), queued({ eventId: 'evt-a2', occurrenceId: 'occ-a2' })],
    });
    const b = obligation({ id: 'ob-b', pendingOutlookDeletes: [queued({ eventId: 'evt-b', occurrenceId: 'occ-b' })] });
    const { fns, db, obligationNow } = fakeDb({ obligations: [a, b] });
    const deletes = stubDeletes(500, 204, 404);
    const settle = fns.settleFirmOutlookDelete.getMockImplementation()!;
    fns.settleFirmOutlookDelete.mockImplementation(async (obligationId, eventId, outcome) => {
      if (eventId === 'evt-bad') throw new Error('the settle write failed too: stub');
      return settle(obligationId, eventId, outcome);
    });

    expect(await syncAllPending(db)).toEqual({ synced: 2, failed: 1 });
    expect(deletes()).toEqual([
      `DELETE ${GRAPH}/me/events/evt-bad`, `DELETE ${GRAPH}/me/events/evt-a2`, `DELETE ${GRAPH}/me/events/evt-b`,
    ]);
    expect(fns.settleFirmOutlookDelete.mock.calls).toEqual([
      ['ob-a', 'evt-bad', 'failed'], ['ob-a', 'evt-a2', 'deleted'], ['ob-b', 'evt-b', 'deleted'],
    ]);
    // The bad entry's settle never landed, so it stays exactly as queued, for the next sync.
    expect(obligationNow('ob-a')!.pendingOutlookDeletes).toEqual([queued({ eventId: 'evt-bad' })]);
    expect(obligationNow('ob-b')!.pendingOutlookDeletes).toEqual([]);
  });

  it("a token failure is a failed attempt like any other: settled 'failed', no DELETE sent, and the next entry still tried", async () => {
    const ob = obligation({ pendingOutlookDeletes: [queued({ eventId: 'evt-1' }), queued()] });
    const { fns, db, obligationNow } = fakeDb({ obligations: [ob] });
    const deletes = stubDeletes(204);
    vi.mocked(getToken).mockRejectedValueOnce(new Error('interaction required: stub'));
    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 1 });
    expect(deletes()).toEqual([DELETE_EVT_9]);
    expect(fns.settleFirmOutlookDelete.mock.calls).toEqual([['ob-1', 'evt-1', 'failed'], ['ob-1', 'evt-9', 'deleted']]);
    expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([queued({ eventId: 'evt-1', attempts: 1 })]);
  });

  it('the drain needs no occurrence pending: the obligations are read once for it, a retired row included', async () => {
    const { fns, db, obligationNow } = fakeDb({
      obligations: [obligation({ active: false, pendingOutlookDeletes: [queued()] })],
    });
    const deletes = stubDeletes(204);
    expect(await syncAllPending(db)).toEqual({ synced: 1, failed: 0 });
    expect(fns.listFirmOccurrencesPendingSync).toHaveBeenCalledTimes(1);
    expect(fns.listFirmObligations).toHaveBeenCalledTimes(1);
    expect(pushFirmOccurrenceToOutlook).not.toHaveBeenCalled();
    expect(deletes()).toEqual([DELETE_EVT_9]);
    expect(obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([]);
  });

  it('it runs AFTER the occurrence half, on the one read of the obligations both halves share; the counts add up', async () => {
    const { fns, db } = fakeDb({
      occurrences: [occurrence()], obligations: [obligation({ pendingOutlookDeletes: [queued()] })],
    });
    vi.mocked(pushFirmOccurrenceToOutlook).mockResolvedValue('evt-1');
    stubDeletes(204);
    expect(await syncAllPending(db)).toEqual({ synced: 2, failed: 0 });
    expect(fns.listFirmObligations).toHaveBeenCalledTimes(1);
    const [pushed] = vi.mocked(pushFirmOccurrenceToOutlook).mock.invocationCallOrder;
    const [recorded] = fns.updateFirmOccurrenceSync.mock.invocationCallOrder;
    const [deleted] = vi.mocked(deleteFirmOutlookEvent).mock.invocationCallOrder;
    const [settled] = fns.settleFirmOutlookDelete.mock.invocationCallOrder;
    expect([pushed, recorded, deleted, settled]).toEqual([pushed, recorded, deleted, settled].sort((x, y) => x - y));
    expect(pushed).toBeLessThan(deleted);
  });

  it('the guards hold with an entry queued: no firm tables → the obligations never read; the obligations read failing → nothing deleted, the entry kept, the firm rows failed as before', async () => {
    const deletes = stubDeletes();

    // The firm tables not there yet (migration not run).
    const absent = fakeDb({ obligations: [obligation({ pendingOutlookDeletes: [queued()] })] });
    absent.fns.listFirmOccurrencesPendingSync.mockRejectedValue(new Error('relation "firm_obligation_occurrences" does not exist'));
    expect(await syncAllPending(absent.db)).toEqual({ synced: 0, failed: 0 });
    expect(absent.fns.listFirmObligations).not.toHaveBeenCalled();
    expect(absent.fns.settleFirmOutlookDelete).not.toHaveBeenCalled();

    // The queue reads, the obligations do not — with one occurrence pending, and with none.
    for (const occurrences of [[occurrence()], []]) {
      const unread = fakeDb({ occurrences, obligations: [obligation({ pendingOutlookDeletes: [queued()] })] });
      unread.fns.listFirmObligations.mockRejectedValue(new Error('permission denied for table firm_obligations'));
      expect(await syncAllPending(unread.db)).toEqual({ synced: 0, failed: occurrences.length });
      expect(unread.fns.settleFirmOutlookDelete).not.toHaveBeenCalled();
      expect(unread.obligationNow('ob-1')!.pendingOutlookDeletes).toEqual([queued()]);
    }

    expect(deletes()).toEqual([]);
    expect(deleteFirmOutlookEvent).not.toHaveBeenCalled();
  });
});

describe("removeFirmOccurrenceFromOutlook — Undo's removed next occurrence (FOD-7)", () => {
  it("'deleted': the firm event is deleted by its id, with the signed-in token", async () => {
    vi.mocked(deleteFirmOutlookEvent).mockResolvedValue(undefined);
    expect(await removeFirmOccurrenceFromOutlook('evt-9')).toBe('deleted');
    expect(deleteFirmOutlookEvent).toHaveBeenCalledTimes(1);
    expect(deleteFirmOutlookEvent).toHaveBeenCalledWith('tok', 'evt-9');
  });

  it("'not-connected': no token asked for, nothing deleted", async () => {
    vi.mocked(getSignedInAccount).mockResolvedValue(null);
    expect(await removeFirmOccurrenceFromOutlook('evt-9')).toBe('not-connected');
    graphUntouched();
  });

  it("'failed': a Graph failure is reported, never thrown", async () => {
    vi.mocked(deleteFirmOutlookEvent).mockRejectedValue(new Error('Graph DELETE /me/events/evt-9 → 500: stub'));
    expect(await removeFirmOccurrenceFromOutlook('evt-9')).toBe('failed');
    expect(deleteFirmOutlookEvent).toHaveBeenCalledWith('tok', 'evt-9');
  });
});
