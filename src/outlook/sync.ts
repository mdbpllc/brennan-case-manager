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
 *  event. The outcome is returned for the register to act on: the row is already gone,
 *  so on anything but 'deleted' the register queues the event on its OBLIGATION
 *  (queueFirmOutlookDelete) and syncAllPending's drain retries it (#156 §1 item 9, A6;
 *  FXD-2). */
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
 *  occurrences ("the existing push queue drains both kinds", slice §3 item 7), then the
 *  Outlook events Undo could not delete, queued on their obligations (#156 §1 item 9,
 *  A6; firm-obligations-fix-slice.md §3 item 8; FXD-2). Returns counts for the UI: a
 *  queued delete that went through counts as synced, one that did not as failed. */
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
  // The obligations are read ONCE, for both firm passes: the pushes need each row's
  // obligation, and the delete drain reads the queue each obligation carries — so they
  // are read even when no occurrence is pending (#156 A6).
  let obligations: FirmObligation[];
  try {
    obligations = await db.listFirmObligations();
  } catch {
    // The queue read but its obligations did not: no row can be pushed without its
    // obligation, so each counts as failed, and the case half's counts still come back.
    // No queued delete can be read either, so none is tried: each stays queued for the
    // next sync.
    return { synced, failed: failed + firmQueue.length };
  }
  const obligationById = new Map(obligations.map((o) => [o.id, o]));
  for (const occ of firmQueue) {
    const ob = obligationById.get(occ.obligationId);
    if (!ob) { failed += 1; continue; }
    try {
      const result = await syncFirmOccurrence(db, occ, ob);
      if (result.syncStatus === 'synced') synced += 1;
      else failed += 1;
    } catch {
      // The push failed AND writing its error back failed too (review C4-8). Count the
      // row as failed and go on: one bad row never stops the rest of the queue.
      failed += 1;
    }
  }

  // The delete drain (#156 §1 item 9, A6: "Retry on next sync"; FXD-2). Each event Undo
  // could not delete is tried again here, on every obligation, retired ones included. A
  // 2xx or a 404 settles it 'deleted' (deleteFirmOutlookEvent treats a 404 as the event
  // already gone) and the entry leaves the queue; anything else settles it 'failed',
  // which counts the attempt and KEEPS it — retrying never stops. Each settle is the
  // adapter's own read-compute-write on the obligation (settledDeletes), never a write
  // of the list read above, so two entries settled in turn on one row do not overwrite
  // each other.
  for (const ob of obligations) {
    for (const entry of ob.pendingOutlookDeletes ?? []) {
      let outcome: 'deleted' | 'failed';
      try {
        await deleteFirmOutlookEvent(await getToken(), entry.eventId);
        outcome = 'deleted';
      } catch {
        outcome = 'failed';
      }
      try {
        await db.settleFirmOutlookDelete(ob.id, entry.eventId, outcome);
        if (outcome === 'deleted') synced += 1;
        else failed += 1;
      } catch {
        // The settle write itself failed: the entry stays as it was, so the next sync tries
        // it again (an event already deleted then answers 404 and settles). Count it as
        // failed and go on: one bad entry never stops the rest.
        failed += 1;
      }
    }
  }
  return { synced, failed };
}
