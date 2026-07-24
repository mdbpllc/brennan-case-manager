// Push orchestration. Called after every create/edit/cancel, and by the
// "Sync now" retry. Not connected is not an error: events simply stay
// 'pending' and the queue drains on the first successful sync.
import type { DataAdapter } from '../data/adapter';
import type { CalendarEvent } from '../domain/calendar';
import type { CaseRecord } from '../domain/types';
import { outlookConfigured } from './config';
import { getSignedInAccount, getToken } from './auth';
import { ensureCalendar, forgetCalendar, pushToOutlook, GraphNotFoundError } from './graph';

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

/** Drain the retry queue across all cases. Returns counts for the UI. */
export async function syncAllPending(db: DataAdapter): Promise<{ synced: number; failed: number }> {
  if (!outlookConfigured || !(await getSignedInAccount())) return { synced: 0, failed: 0 };
  const queue = await db.listEventsPendingSync();
  if (queue.length === 0) return { synced: 0, failed: 0 };
  const cases = await db.getCases([...new Set(queue.map((e) => e.caseId))]);
  const caseById = new Map(cases.map((c) => [c.id, c]));
  let synced = 0;
  let failed = 0;
  for (const ev of queue) {
    const caseRec = caseById.get(ev.caseId);
    if (!caseRec) { failed += 1; continue; }
    const result = await syncEvent(db, ev, caseRec);
    if (result.syncStatus === 'synced') synced += 1;
    else failed += 1;
  }
  return { synced, failed };
}
