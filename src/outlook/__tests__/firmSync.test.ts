// FIRM OBLIGATIONS — the firm half of src/outlook/sync.ts.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 7 (DECISION 7: the
// existing push queue drains both kinds). Review L3-6 found the firm sync path with no
// test of its own; review C4-8 found that one row whose push AND error write both threw
// stopped the rest of the firm queue; and a failed obligations read, after the queue had
// read, still rejected the whole drain, case half included (SUP2-7).
//
// NO NETWORK and no MSAL: config, auth and graph are mocked whole, and the DataAdapter
// is a small hand-made fake holding only the methods sync.ts calls. The case half's
// Graph functions stay mocked and are never called here — the one test that runs the
// case half takes the case path's own no-Graph branch (a cancelled event that never
// reached Outlook). Every fixture is fictional.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { DataAdapter } from '../../data/adapter';
import type { CalendarEvent } from '../../domain/calendar';
import type { CaseRecord } from '../../domain/types';
import type { FirmObligation, FirmObligationOccurrence } from '../../domain/firmObligations';
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
    createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

function occurrence(over: Partial<FirmObligationOccurrence> = {}): FirmObligationOccurrence {
  return {
    id: 'occ-1', obligationId: 'ob-1', periodLabel: '2026', dueOn: '2026-10-15', state: 'open',
    syncStatus: 'pending', createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

function caseEvent(over: Partial<CalendarEvent> = {}): CalendarEvent {
  return {
    id: 'ev-1', caseId: 'case-1', title: 'Fixture hearing', eventType: 'hearing', startLocal: '2026-10-01',
    allDay: true, status: 'scheduled', syncStatus: 'pending', createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

type SyncPatch = Partial<Pick<FirmObligationOccurrence, 'outlookEventId' | 'syncStatus' | 'syncError' | 'lastSyncAt'>>;

/** Only what sync.ts calls. Each write answers with the row as it would read after it. */
function fakeDb(seed: {
  occurrences?: FirmObligationOccurrence[]; obligations?: FirmObligation[];
  events?: CalendarEvent[]; cases?: CaseRecord[];
} = {}) {
  const occById = new Map((seed.occurrences ?? []).map((o) => [o.id, o]));
  const evById = new Map((seed.events ?? []).map((e) => [e.id, e]));
  const fns = {
    listEventsPendingSync: vi.fn(async (): Promise<CalendarEvent[]> => seed.events ?? []),
    getCases: vi.fn(async (ids: string[]): Promise<CaseRecord[]> => (seed.cases ?? []).filter((c) => ids.includes(c.id))),
    updateEvent: vi.fn(async (id: string, patch: Partial<CalendarEvent>): Promise<CalendarEvent> =>
      ({ ...evById.get(id)!, ...patch })),
    listFirmOccurrencesPendingSync: vi.fn(async (): Promise<FirmObligationOccurrence[]> => seed.occurrences ?? []),
    listFirmObligations: vi.fn(async (): Promise<FirmObligation[]> => seed.obligations ?? []),
    updateFirmOccurrenceSync: vi.fn(async (id: string, patch: SyncPatch): Promise<FirmObligationOccurrence> =>
      ({ ...occById.get(id)!, ...patch })),
  };
  return { fns, db: fns as unknown as DataAdapter };
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
    expect(ensureCalendar).not.toHaveBeenCalled();
    expect(pushToOutlook).not.toHaveBeenCalled();
    graphUntouched();
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
