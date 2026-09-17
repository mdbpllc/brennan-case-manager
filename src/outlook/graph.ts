// Microsoft Graph calls for the one-way calendar push. Direction of
// authority is software → Outlook: create posts a new event, edit patches
// it, cancel deletes it. Every pushed event carries an extended property
// tying it back to its matter — the Phase 2 matching hook the spec requires.
// Firm obligations (DECISION 7) push through SIBLINGS at the foot of this file,
// never through a branch in the case path: no CaseRecord, their own calendar,
// their own cache key.
import type { CalendarEvent } from '../domain/calendar';
import type { FirmObligation, FirmObligationOccurrence } from '../domain/firmObligations';
import type { CaseRecord } from '../domain/types';
import {
  daysBetween, dueDate, FOD1_NOTE, formatDate, isUnknownWeekend, outlookReminderIsOn, plainText, reminderOn, ruleDate,
  targetDate,
} from '../domain/firmObligations';
import { OUTLOOK_CALENDAR_NAME } from './config';
import { OUTLOOK_FIRM_CALENDAR_NAME } from './config';

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

// ------------------------------------------------------------------------------
// FIRM OBLIGATIONS — the no-case sibling (DECISION 7).
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 7 and §7 item 15
// (FOD-10 as amended by DECISION 7; FOD-22, FOD-28, FOD-29), §2.3 items 2–5 for the
// dates; FOS-1 RULED YES by Michael 2026-09-10, session log #155. The reminder limb as
// amended, and the delete Undo could not make: docs/specs/firm-obligations-fix-slice.md
// §3 items 2, 3 and 8 (#156 §1 items 6(a), 6(b) and 9 — A1, A2, A6); FOS-2 RULED YES by
// Michael 2026-09-12, session log #156.
//
// A SIBLING, never a branch: toGraphEvent's case path above is untouched (slice §8),
// so nothing a firm row does can change what a matter event pushes — and nothing
// below takes a CaseRecord, because a firm obligation has no matter (FOD-13). Every
// date comes from the domain module's one derivation, so the event, the register
// and the card cannot disagree about T, D or the lit moment.

/** The firm calendar's OWN cache key. One shared key would put a firm event in the
 *  case calendar (or a case event in the firm one) the moment either id was cached. */
const FIRM_CAL_ID_KEY = 'bcm-outlook-firm-calendar-id';

/** Find-or-create the SEPARATE "MDBP Firm" calendar (DECISION 7; FOD-28) — the same
 *  mechanism as ensureCalendar, repeated rather than factored out so the case path
 *  stays byte-identical. A calendar, not a category on MDBP Cases: Outlook, and
 *  Outlook mobile above all, toggles calendars cleanly and filters categories
 *  poorly (module spec §5.3).
 *
 *  REFUSES when the two configured names are the same: a firm calendar found by the
 *  case calendar's name IS the case calendar, and every firm event would then land
 *  among the matters — the one thing a separate calendar exists to prevent. */
export async function ensureFirmCalendar(token: string): Promise<string> {
  if (OUTLOOK_FIRM_CALENDAR_NAME.trim().toLowerCase() === OUTLOOK_CALENDAR_NAME.trim().toLowerCase()) {
    throw new Error(`The firm-obligations calendar name ("${OUTLOOK_FIRM_CALENDAR_NAME}") is the case calendar's name — they must be separate calendars (DECISION 7). Set VITE_OUTLOOK_FIRM_CALENDAR_NAME to another name.`);
  }
  const cached = localStorage.getItem(FIRM_CAL_ID_KEY);
  if (cached) return cached;
  const name = OUTLOOK_FIRM_CALENDAR_NAME.replace(/'/g, "''");
  const list = await graphFetch<{ value: { id: string }[] }>(
    token, `/me/calendars?$filter=name eq '${encodeURIComponent(name)}'`,
  );
  let id = list.value[0]?.id;
  if (!id) {
    const created = await graphFetch<{ id: string }>(token, '/me/calendars', {
      method: 'POST', body: { name: OUTLOOK_FIRM_CALENDAR_NAME },
    });
    id = created.id;
  }
  localStorage.setItem(FIRM_CAL_ID_KEY, id);
  return id;
}

/** Clear the cached firm calendar id (after a 404 — the calendar deleted in
 *  Outlook). The case calendar's cached id is left alone. */
export function forgetFirmCalendar(): void {
  localStorage.removeItem(FIRM_CAL_ID_KEY);
}

/** The REAL minutes from 00:00 local on `from` to 00:00 local on `to`, in the runtime's
 *  own time zone — the zone the payload's start and end already name. It is
 *  days × 1440 plus the change in UTC offset between the two midnights, so across a
 *  daylight-saving change it is 60 minutes more or less than days × 1440 — which is
 *  the point: the reminder still rings at midnight on its day (FOD-29's rule as ruled
 *  2026-09-11, re-based from the lit day to the reminder day by #156 A1). */
export function minutesBetweenLocalMidnights(from: string, to: string): number {
  const offset = (d: string) => {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day).getTimezoneOffset();
  };
  return daysBetween(from, to) * 1440 + (offset(to) - offset(from));
}

/**
 * The Graph payload for one firm occurrence. NO CaseRecord parameter (§7 item 15).
 *
 *  - ALL-DAY on the TARGET T (§2.3 items 3 and 5) — the last business day before a
 *    weekend rule date, R itself on a weekday — under EVERY weekendRule: the event
 *    marks the day to have it done by; the body says when it is actually due.
 *  - The body carries D; and, where R and D differ (which only the obligation's own
 *    `rolls-forward` can make happen), the roll; under `unknown` on a weekend R, the
 *    FOD-1 note in the roll line's place. No roll is ever inferred (slice §0, rule 1).
 *  - The reminder fires ON THE REMINDER DAY — #156 §1 item 6(b) (A1), Michael's "That
 *    looks correct." on the reminder composite, 2026-09-12: `reminderOn` = T − the
 *    obligation's stored `outlookReminderDays`, and the minutes are the real minutes from
 *    00:00 local on that day to 00:00 local on T. That is FOD-29's rule as he ruled it at
 *    the FOS-1 build's stop, 2026-09-11 (his pick then: "Fire at the lit moment"),
 *    RE-BASED from the lit day to the reminder day: days × 1440 except across a
 *    daylight-saving change. The stored value is the value that fires, so a value raised
 *    past the lead rings before the row lights (FXD-9); a month-precision row keys off its
 *    T like a day-precision one (FXD-11) — FOM-6's earlier-of rule stays with the lit
 *    moment, which the register and the card still use; a reminder day already past at
 *    push time is sent as computed (FXD-3). Capped at nothing: whether Graph honours a
 *    reminder that long on an all-day event is FOM-8's live check; nothing here can
 *    know it.
 *  - HARD rows only (A1: "I do not want all of the events to carry a reminder."): a
 *    routine obligation's event carries `isReminderOn: false` and 0 minutes — Graph's
 *    default reminder is not relied on (FXD-8).
 *  - A closed occurrence keeps its event under a "Done — " subject (FOD-22) with its
 *    reminder OFF and 0 minutes — #156 §1 item 6(a) (A2), "Keep it, retitled, but kill
 *    the reminder" — and Not applicable closes it exactly as Done does (FXD-10). The
 *    FOS-1 build's `isReminderOn: true` on a done occurrence (slice §3 item 7 as then
 *    named) is superseded by that ruling. Undo reopens the row, and its ordinary re-push
 *    restores both: the original subject, and the reminder per weight.
 *  - The subject shows the name through plainText: SPEC §7's names are stored with
 *    their markdown (FOT-27's backticks), and Outlook shows the words (review L5-08).
 *    The body names no obligation, so the subject is the only place the name appears.
 *
 * T, D, the reminder day and whether the reminder is on come from the domain module's one
 * derivation; only the end date's "+1 day" uses this file's own local addDays, which
 * agrees for naive dates.
 */
export function toGraphFirmEvent(
  occ: FirmObligationOccurrence, obligation: FirmObligation,
): Record<string, unknown> {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const R = ruleDate(occ);
  const T = targetDate(occ);
  const D = dueDate(obligation, occ);
  const reminder = outlookReminderIsOn(obligation, occ); // hard AND not closed — #156 A1, A2
  const subject = `Firm obligation: ${plainText(obligation.name)} (${occ.periodLabel})`; // PROVISIONAL — DECISION 7
  const lines = [
    'Firm obligation — no matter', // PROVISIONAL — FOD-10 as amended by DECISION 7
    `Due ${formatDate(D)}`, // PROVISIONAL — DECISION 7 (slice §2.3 item 5)
  ];
  if (isUnknownWeekend(obligation, occ)) {
    lines.push(`Rule date ${formatDate(R)} — ${FOD1_NOTE}`); // PROVISIONAL — FOD-1 as amended by FOM-12
  } else if (R !== D) {
    lines.push(`Rule date ${formatDate(R)} — rolls to ${formatDate(D)}`); // PROVISIONAL — FOD-1 as amended by FOM-12
  }
  return {
    subject: occ.state === 'done' ? `Done — ${subject}` : subject, // PROVISIONAL — FOD-22
    body: { contentType: 'text', content: lines.join('\n') },
    isAllDay: true,
    // Graph all-day events run midnight to midnight, end exclusive.
    start: { dateTime: `${T}T00:00:00`, timeZone: tz },
    end: { dateTime: `${addDays(T, 1)}T00:00:00`, timeZone: tz },
    categories: ['MDBP Firm'], // PROVISIONAL — FOD-10 as amended by DECISION 7
    singleValueExtendedProperties: [
      // The existing property id, with FIRM where a case puts its file number —
      // how the Phase 2 matching hook tells the two kinds apart.
      { id: MATTER_PROP_ID, value: `FIRM|${obligation.id}|${occ.id}` },
    ],
    isReminderOn: reminder, // #156 A1 (hard only; FXD-8) and A2 (off once closed; FXD-10)
    // The reminder day's midnight to T's (#156 A1; FOD-29's rule re-based; FXD-9, FXD-11); 0 when off (FXD-8).
    reminderMinutesBeforeStart: reminder ? minutesBetweenLocalMidnights(reminderOn(obligation, occ), T) : 0,
  };
}

/** Push one firm occurrence's current state; returns the Outlook event id. There is
 *  no delete branch: Done and Not applicable PATCH the kept event (FOD-22; its subject
 *  and its reminder, #156 A2), and Undo's re-push PATCHes it back, so every state is a
 *  create or a patch. An event deleted directly in Outlook is recreated (software is the
 *  authority). A 404 on the POST itself — the cached calendar deleted in Outlook —
 *  propagates as GraphNotFoundError, so the caller can forgetFirmCalendar() and
 *  retry once, exactly as syncEvent does for a case. */
export async function pushFirmOccurrenceToOutlook(
  token: string, calendarId: string, occ: FirmObligationOccurrence, obligation: FirmObligation,
): Promise<string> {
  const payload = toGraphFirmEvent(occ, obligation);
  if (occ.outlookEventId) {
    try {
      await graphFetch(token, `/me/events/${occ.outlookEventId}`, { method: 'PATCH', body: payload });
      return occ.outlookEventId;
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

/** Delete one firm event. It exists for Undo, which removes the untouched next
 *  occurrence (FOD-7) and so that occurrence's event — at once, or, when that could not
 *  be done, from the obligation's queue by syncAllPending's drain (#156 A6; FXD-2).
 *  Done never deletes (FOD-22). A 404 means the event is already gone in Outlook — the
 *  state asked for, so the drain settles it as deleted. */
export async function deleteFirmOutlookEvent(token: string, eventId: string): Promise<void> {
  try {
    await graphFetch(token, `/me/events/${eventId}`, { method: 'DELETE' });
  } catch (e) {
    if (!(e instanceof GraphNotFoundError)) throw e; // already gone in Outlook — fine
  }
}
