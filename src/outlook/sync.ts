// Push orchestration. Called after every create/edit/cancel, and by the
// "Sync now" retry. Not connected is not an error: events simply stay
// 'pending' and the queue drains on the first successful sync.
import type { DataAdapter } from '../data/adapter';
import type { CalendarEvent } from '../domain/calendar';
import type { CaseRecord } from '../domain/types';
import { outlookConfigured } from './config';
import { getSignedInAccount, getToken } from './auth';
import type { FirmObligation, FirmObligationOccurrence } from '../domain/firmObligations';
import {
  ensureCalendar, forgetCalendar, pushToOutlook, GraphNotFoundError,
  ensureFirmCalendar, forgetFirmCalendar, pushFirmOccurrenceToOutlook, deleteFirmOutlookEvent,
} from './graph';

/** Attempt to push a single event. Returns the event (with sync fields
 *  updated when a push was attempted; unchanged when not connected). */
export async function syncEvent(db: DataAdapter, ev: CalendarEvent, caseRec: CaseRecord): Promise<CalendarEvent> {
  if (!outlookConfigured || !(await getSignedInAccount())) return ev;
  // A cancelled event that never reached Outlook needs no call at all.
  if (ev.status === 'cancelled' && !ev.outlookEventId) {
    return db.updateEvent(ev.id, { syncStatus: 'synced', syncError: '', lastSyncAt: new Date().toISOString() });
  }
  try {
    const token = await getToken();
    let calendarId = await ensureCalendar(token);
    let outlookEventId: string | undefined;
    try {
      outlookEventId = await pushToOutlook(token, calendarId, ev, caseRec);
    } catch (e) {
      if (!(e instanceof GraphNotFoundError)) throw e;
      // Cached calendar id went stale (calendar deleted in Outlook) — refresh once.
      forgetCalendar();
      calendarId = await ensureCalendar(token);
      outlookEventId = await pushToOutlook(token, calendarId, ev, caseRec);
    }
    return await db.updateEvent(ev.id, {
      outlookEventId, syncStatus: 'synced', syncError: '', lastSyncAt: new Date().toISOString(),
    });
  } catch (e) {
    return await db.updateEvent(ev.id, {
      syncStatus: 'error', syncError: e instanceof Error ? e.message : String(e),
    });
  }
}

/** Push one FIRM-OBLIGATION occurrence (DECISION 7; firm-obligations-build-slice.md
 *  §3 item 7). The firm sibling of syncEvent: its own calendar ("MDBP Firm"), its own
 *  payload (toGraphFirmEvent — no matter, no CaseRecord), and the occurrence's own
 *  four sync fields. Not connected is not an error: the row stays 'pending'. */
export async function syncFirmOccurrence(
  db: DataAdapter, occ: FirmObligationOccurrence, ob: FirmObligation,
): Promise<FirmObligationOccurrence> {
  if (!outlookConfigured || !(await getSignedInAccount())) return occ;
  // A closed occurrence that never reached Outlook needs no event at all — the
  // case path's rule for a cancelled event that never reached it.
  if (occ.state === 'done' && !occ.outlookEventId) {
    return db.updateFirmOccurrenceSync(occ.id, { syncStatus: 'synced', syncError: '', lastSyncAt: new Date().toISOString() });
  }
  try {
    const token = await getToken();
    let calendarId = await ensureFirmCalendar(token);
    let outlookEventId: string;
    try {
      outlookEventId = await pushFirmOccurrenceToOutlook(token, calendarId, occ, ob);
    } catch (e) {
      if (!(e instanceof GraphNotFoundError)) throw e;
      // Cached firm-calendar id went stale (calendar deleted in Outlook) — refresh once.
      forgetFirmCalendar();
      calendarId = await ensureFirmCalendar(token);
      outlookEventId = await pushFirmOccurrenceToOutlook(token, calendarId, occ, ob);
    }
    return await db.updateFirmOccurrenceSync(occ.id, {
      outlookEventId, syncStatus: 'synced', syncError: '', lastSyncAt: new Date().toISOString(),
    });
  } catch (e) {
    return await db.updateFirmOccurrenceSync(occ.id, {
      syncStatus: 'error', syncError: e instanceof Error ? e.message : String(e),
    });
  }
}

/** Undo removes an untouched next occurrence (FOD-7); this deletes its Outlook
 *  event. The row is already gone, so there is nothing to queue — the outcome is
 *  returned for the register to say plainly. */
export async function removeFirmOccurrenceFromOutlook(
  outlookEventId: string,
): Promise<'deleted' | 'not-connected' | 'failed'> {
  if (!outlookConfigured || !(await getSignedInAccount())) return 'not-connected';
  try {
    await deleteFirmOutlookEvent(await getToken(), outlookEventId);
    return 'deleted';
  } catch {
    return 'failed';
  }
}

/** Drain the retry queue — the case events across all cases, then the firm-obligation
 *  occurrences ("the existing push queue drains both kinds", slice §3 item 7).
 *  Returns counts for the UI. */
export async function syncAllPending(db: DataAdapter): Promise<{ synced: number; failed: number }> {
  if (!outlookConfigured || !(await getSignedInAccount())) return { synced: 0, failed: 0 };
  let synced = 0;
  let failed = 0;
  const queue = await db.listEventsPendingSync();
  if (queue.length > 0) {
    const cases = await db.getCases([...new Set(queue.map((e) => e.caseId))]);
    const caseById = new Map(cases.map((c) => [c.id, c]));
    for (const ev of queue) {
      const caseRec = caseById.get(ev.caseId);
      if (!caseRec) { failed += 1; continue; }
      const result = await syncEvent(db, ev, caseRec);
      if (result.syncStatus === 'synced') synced += 1;
      else failed += 1;
    }
  }

  // The firm half. On a central database the firm-obligation tables exist only
  // once db/migrations/2026-09-10-firm-obligations.sql has run by Michael's hand;
  // until then the read fails, and the case half above must never depend on it.
  let firmQueue: FirmObligationOccurrence[];
  try {
    firmQueue = await db.listFirmOccurrencesPendingSync();
  } catch {
    return { synced, failed };
  }
  if (firmQueue.length > 0) {
    const obligationById = new Map((await db.listFirmObligations()).map((o) => [o.id, o]));
    for (const occ of firmQueue) {
      const ob = obligationById.get(occ.obligationId);
      if (!ob) { failed += 1; continue; }
      const result = await syncFirmOccurrence(db, occ, ob);
      if (result.syncStatus === 'synced') synced += 1;
      else failed += 1;
    }
  }
  return { synced, failed };
}
