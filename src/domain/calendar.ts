// Calendar events — Outlook push Phase 1 (outlook-calendar-sync.md).
// Direction of authority: software → Outlook. Events are created here and
// pushed on create/edit/cancel; Outlook never holds an event this system
// doesn't know about (Phase 2 two-way sync is explicitly backlogged).

export type CalendarEventType = 'hearing' | 'deadline' | 'appointment' | 'reminder' | 'other';

export const CALENDAR_EVENT_TYPES: { value: CalendarEventType; label: string }[] = [
  { value: 'hearing', label: 'Hearing' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'appointment', label: 'Appointment' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'other', label: 'Other' },
];

/** Cancelled events stay as tombstones (audit trail via ReviewLog); the
 *  cancellation is pushed to Outlook as a deletion. */
export type CalendarEventStatus = 'scheduled' | 'cancelled';

/** 'pending' = not yet reflected in Outlook (includes "Outlook not connected
 *  yet" — the queue drains on connect); 'error' = last push attempt failed. */
export type OutlookSyncStatus = 'pending' | 'synced' | 'error';

export interface CalendarEvent {
  id: string;
  caseId: string;
  title: string;
  eventType: CalendarEventType;
  /** Naive LOCAL datetime "YYYY-MM-DDTHH:mm" — or "YYYY-MM-DD" when allDay.
   *  Deliberately timezone-free storage (see the v0.1 UTC date-opened bug);
   *  the Graph layer attaches the browser's IANA timezone at push time. */
  startLocal: string;
  /** Same format as startLocal. Optional — the push layer defaults it. */
  endLocal?: string;
  allDay: boolean;
  location?: string;
  notes?: string;
  status: CalendarEventStatus;
  /** Graph event id once pushed — the handle for edit/cancel pushes and
   *  Phase 2's matching hook. */
  outlookEventId?: string;
  syncStatus: OutlookSyncStatus;
  /** Last push failure, '' when cleared (empty-string clearing keeps the
   *  localStorage and Supabase adapters behaviorally identical). */
  syncError?: string;
  lastSyncAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Display formatting for the stored naive-local values. */
export function formatEventWhen(ev: Pick<CalendarEvent, 'startLocal' | 'endLocal' | 'allDay'>): string {
  const fmtDate = (d: string) => {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day).toLocaleDateString(undefined, {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });
  };
  if (ev.allDay) {
    const start = fmtDate(ev.startLocal);
    return ev.endLocal && ev.endLocal !== ev.startLocal ? `${start} – ${fmtDate(ev.endLocal)}` : `${start} (all day)`;
  }
  const [datePart, timePart = ''] = ev.startLocal.split('T');
  const time = (t: string) => {
    const [h, min] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(min).padStart(2, '0')} ${ampm}`;
  };
  let out = `${fmtDate(datePart)}, ${time(timePart)}`;
  if (ev.endLocal?.startsWith(datePart)) out += ` – ${time(ev.endLocal.split('T')[1])}`;
  return out;
}
