// Hearing auto-detect with confidence + semantics (spec §2).
// Every candidate date carries its semantic kind; administrative dates are
// provenance only; the stale-date guard keeps past dates off the calendar.

import type { CandidateSetting, OaaExtraction } from '../domain/oaa';

/** Extract candidate settings from a parsed OAA. `todayIso` is injectable for
 *  tests ("YYYY-MM-DD"). */
export function detectSettings(ex: OaaExtraction, todayIso: string): CandidateSetting[] {
  const out: CandidateSetting[] = [];
  const isPast = (isoDate: string) => isoDate.slice(0, 10) < todayIso;

  // A "DOCKET SETTING <date>" line is an actual setting — calendared as a
  // hearing when future (and past ones trip the stale-date guard, §2.3).
  if (ex.docketSetting && /^\d{4}-\d{2}-\d{2}$/.test(ex.docketSetting.value)) {
    const d = ex.docketSetting.value;
    out.push({
      kind: 'confirmed_setting',
      startLocal: d,
      allDay: true,
      label: 'Docket setting',
      provenance: ex.docketSetting.provenance,
      inPast: isPast(d),
      autoCreate: false, // resolved below once ambiguity is known
    });
  }

  // Docket availability (Uvalde-style remarks line) — calendared, but labeled
  // as availability, never as a confirmed setting (spec §2.1).
  if (ex.docketAvailability && /^\d{4}-\d{2}-\d{2}$/.test(ex.docketAvailability.value)) {
    const d = ex.docketAvailability.value;
    out.push({
      kind: 'docket_availability',
      startLocal: d,
      allDay: true,
      label: 'Docket availability (not a confirmed setting)',
      provenance: ex.docketAvailability.provenance,
      inPast: isPast(d),
      autoCreate: false, // resolved below once ambiguity is known
    });
  }

  // Administrative dates: appointment/designee dates — never calendared (§2.1).
  if (ex.appointmentDate?.value) {
    out.push({
      kind: 'administrative',
      startLocal: ex.appointmentDate.value,
      allDay: !ex.appointmentDate.value.includes('T'),
      label: 'Appointment date (administrative — not calendared)',
      provenance: ex.appointmentDate.provenance,
      inPast: isPast(ex.appointmentDate.value),
      autoCreate: false,
    });
  }

  // Confidence gate (§2.2): Tier 1 + exactly one unambiguous FUTURE calendarable
  // date → auto-create (visibly flagged in review). Any ambiguity → pause.
  // Tier 2 never auto-creates (§1 hard rule).
  const calendarable = out.filter((c) => c.kind !== 'administrative' && !c.inPast);
  if (ex.tier === 1 && calendarable.length === 1) calendarable[0].autoCreate = true;

  return out;
}

/** True when nothing future and calendarable was found → the UI prompts
 *  "Is a hearing already set on this matter?" (spec §2.4). */
export function noFutureSettingFound(candidates: CandidateSetting[]): boolean {
  return !candidates.some((c) => c.kind !== 'administrative' && !c.inPast);
}
