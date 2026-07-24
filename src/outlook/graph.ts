// Microsoft Graph calls for the one-way calendar push. Direction of
// authority is software → Outlook: create posts a new event, edit patches
// it, cancel deletes it. Every pushed event carries an extended property
// tying it back to its matter — the Phase 2 matching hook the spec requires.
import type { CalendarEvent } from '../domain/calendar';
import type { CaseRecord } from '../domain/types';
import { OUTLOOK_CALENDAR_NAME } from './config';

const GRAPH = 'https://graph.microsoft.com/v1.0';

/** Fixed app GUID namespacing the matter-reference extended property. */
export const MATTER_PROP_ID = 'String {b7f2a6e0-52c1-47d8-9b3a-1e64c02f7d15} Name bcmMatterRef';

const CAL_ID_KEY = 'bcm-outlook-calendar-id';

async function graphFetch<T>(token: string, path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(`${GRAPH}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  if (res.status === 404) throw new GraphNotFoundError(path);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph ${init?.method ?? 'GET'} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export class GraphNotFoundError extends Error {
  constructor(path: string) {
    super(`Graph resource not found: ${path}`);
  }
}

/** Find-or-create the dedicated case calendar; id cached locally. */
export async function ensureCalendar(token: string): Promise<string> {
  const cached = localStorage.getItem(CAL_ID_KEY);
  if (cached) return cached;
  const name = OUTLOOK_CALENDAR_NAME.replace(/'/g, "''");
  const list = await graphFetch<{ value: { id: string }[] }>(
    token, `/me/calendars?$filter=name eq '${encodeURIComponent(name)}'`,
  );
  let id = list.value[0]?.id;
  if (!id) {
    const created = await graphFetch<{ id: string }>(token, '/me/calendars', {
      method: 'POST', body: { name: OUTLOOK_CALENDAR_NAME },
    });
    id = created.id;
  }
  localStorage.setItem(CAL_ID_KEY, id);
  return id;
}

/** Clear the cached calendar id (e.g. after a 404 — calendar deleted in Outlook). */
export function forgetCalendar(): void {
  localStorage.removeItem(CAL_ID_KEY);
}

function addDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(y, m - 1, d + days);
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${dt.getFullYear()}-${mm}-${dd}`;
}

function addHour(naive: string): string {
  const [datePart, timePart] = naive.split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, min] = timePart.split(':').map(Number);
  const dt = new Date(y, m - 1, d, hh + 1, min);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}T${p(dt.getHours())}:${p(dt.getMinutes())}`;
}

function toGraphEvent(ev: CalendarEvent, caseRec: CaseRecord): Record<string, unknown> {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const matterLine = `Matter: ${caseRec.fileNumber}${caseRec.caption ? ` — ${caseRec.caption}` : ''}`;
  let start: string;
  let end: string;
  if (ev.allDay) {
    // Graph all-day events run midnight to midnight, end exclusive.
    start = `${ev.startLocal}T00:00:00`;
    end = `${addDays(ev.endLocal || ev.startLocal, 1)}T00:00:00`;
  } else {
    start = ev.startLocal;
    end = ev.endLocal || addHour(ev.startLocal);
  }
  return {
    subject: ev.title,
    body: { contentType: 'text', content: [matterLine, ev.notes].filter(Boolean).join('\n\n') },
    ...(ev.location ? { location: { displayName: ev.location } } : {}),
    isAllDay: ev.allDay,
    start: { dateTime: start, timeZone: tz },
    end: { dateTime: end, timeZone: tz },
    categories: ['MDBP Case'],
    singleValueExtendedProperties: [
      { id: MATTER_PROP_ID, value: `${caseRec.fileNumber}|${caseRec.id}|${ev.id}` },
    ],
  };
}

/** Push one event's current state to Outlook. Returns the Outlook event id
 *  (undefined after a cancellation, which deletes the Outlook event). */
export async function pushToOutlook(
  token: string, calendarId: string, ev: CalendarEvent, caseRec: CaseRecord,
): Promise<string | undefined> {
  if (ev.status === 'cancelled') {
    if (ev.outlookEventId) {
      try {
        await graphFetch(token, `/me/events/${ev.outlookEventId}`, { method: 'DELETE' });
      } catch (e) {
        if (!(e instanceof GraphNotFoundError)) throw e; // already gone in Outlook — fine
      }
    }
    return undefined;
  }
  const payload = toGraphEvent(ev, caseRec);
  if (ev.outlookEventId) {
    try {
      await graphFetch(token, `/me/events/${ev.outlookEventId}`, { method: 'PATCH', body: payload });
      return ev.outlookEventId;
    } catch (e) {
      if (!(e instanceof GraphNotFoundError)) throw e;
      // Deleted directly in Outlook — recreate (software is the authority).
    }
  }
  const created = await graphFetch<{ id: string }>(
    token, `/me/calendars/${calendarId}/events`, { method: 'POST', body: payload },
  );
  return created.id;
}
