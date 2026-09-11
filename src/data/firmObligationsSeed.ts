// FOD-21 — THE DEMO FIXTURE FIRM'S OBLIGATIONS. DEMO MODE ONLY.
//
// ⚠ EVERY DATE IN THIS FILE IS INVENTED, AND NOTHING IN IT IS A FACT ABOUT THE FIRM.
// Supabase mode seeds NOTHING (FOD-9; slice §8): this module is imported by the
// localStorage adapter and by nothing else.
//
// Authority: docs/specs/firm-obligations-build-slice.md FOD-21 — the twelve
// `suggestedAtGoLive` templates activated with invented dates chosen so the
// register shows every state at once: two hard overdue, one routine overdue, three
// lit, a weekend-dated row past its target under each weekendRule, the rest
// pending, and a FOM-4 backlog on the practice-time report — plus the BOI note row
// added inactive (DECISION 9B).
//
// RULED 2026-09-11 at the build session's FOD-21 stop — Michael, choosing among
// options Claude wrote: "Seed from the day the demo store is created
// (Recommended)". FOD-21 as named cannot hold on every day: under `unknown` a
// weekend-dated row past its target is past-date-unknown and never target-passed
// (§2.3's precedence), and the product reads the real today, so target-passed
// under the other two settings exists only on the days that state can exist
// (Sat–Mon for rolls-forward, the weekend day itself for no-roll). So every date is
// computed from the day the demo store is created; each weekend row sits on the
// most recent weekend whose target has passed and shows its post-target state under
// its own setting — target-passed where that state can exist that day, overdue
// otherwise, past-date-unknown under `unknown`. The states then move as real days
// pass, which is the product working, not the fixture decaying.
//
// THE NON-UNKNOWN SETTINGS SIT ONLY ON ROWS WITH NO LAW BEHIND THEM (a PRACTICE
// cadence and a HIS-FACT renewal), so not even the fiction pairs a statute with a
// roll: the slice's DO-NOT "do not infer a roll from a cite or a source note".
//
// Each row is built through `activationFromTemplate` and `planActivation` — the
// exact path his own activations take — so the fixture cannot hold a row the
// product could not have created.

import {
  addDays, dayOfWeek, isWeekend, makeDate, planActivation,
  type ActContext, type FirmObligation, type FirmObligationOccurrence,
} from '../domain/firmObligations';
import { activationFromTemplate, type ActivationInputs } from '../domain/firmObligationActivation';
import { FIRM_OBLIGATION_TEMPLATES } from '../domain/firmObligationTemplates';
import type { ReviewLogEntry } from '../domain/billing';

export const DEMO_SEED_USER = 'system (demo fixture, FOD-21 — every date invented)';

function parts(d: string): { y: number; m: number; d: number } {
  const [y, m, day] = d.split('-').map(Number);
  return { y, m, d: day };
}
function weekdayOnOrBefore(d: string): string {
  let x = d;
  while (isWeekend(x)) x = addDays(x, -1);
  return x;
}
function weekdayOnOrAfter(d: string): string {
  let x = d;
  while (isWeekend(x)) x = addDays(x, 1);
  return x;
}
function yearBefore(d: string): string {
  const p = parts(d);
  return makeDate(p.y - 1, p.m, p.d);
}

/** The most recent Saturday whose Friday target is already behind `today`. */
function saturdayPastTarget(today: string): string {
  return addDays(today, -((dayOfWeek(today) + 1) % 7));
}
/** The weekend day for the no-roll row: today on a Saturday or Sunday (target
 *  passed, due today); otherwise the most recent Sunday (overdue since Monday). */
function noRollWeekendDay(today: string): string {
  const w = dayOfWeek(today);
  return w === 6 || w === 0 ? today : addDays(today, -w);
}

function template(key: string) {
  const t = FIRM_OBLIGATION_TEMPLATES.find((x) => x.key === key);
  if (!t) throw new Error(`FOD-21 fixture: no template ${key}`);
  return t;
}

/** The fixture's twelve activations, dated relative to `today`. */
export function demoActivations(today: string): { key: string; inputs: ActivationInputs }[] {
  const { y, m } = parts(today);

  // FOM-4's backlog: the most recent past October 15 that fell on a weekday is the
  // overdue period; "last period completed" is the one before it.
  let backlogYear = y;
  for (let yy = y; yy >= y - 8; yy--) {
    const d = makeDate(yy, 10, 15);
    if (d < today && !isWeekend(d)) { backlogYear = yy; break; }
  }

  const malpractice = weekdayOnOrBefore(addDays(today, -27));
  const docsRestoreDue = weekdayOnOrBefore(addDays(today, -31));
  const sat = saturdayPastTarget(today);
  const noRollDay = noRollWeekendDay(today);
  const trust = weekdayOnOrAfter(addDays(today, 3));
  const heartbeat = weekdayOnOrAfter(addDays(today, 1));

  return [
    // --- two hard overdue ---
    { key: 'FOT-4', inputs: {
      recurrence: { kind: 'fixed-annual', month: 10, day: 15 }, weekendRule: 'unknown',
      lastPeriodCompleted: makeDate(backlogYear - 1, 10, 15),
      notes: 'Fixture checklist: County A · County B (invented).',
    } },
    { key: 'FOT-19', inputs: {
      recurrence: { kind: 'anniversary', anchorDate: malpractice }, weekendRule: 'unknown',
      lastPeriodCompleted: yearBefore(malpractice),
    } },
    // --- one routine overdue ---
    { key: 'FOT-22', inputs: {
      recurrence: { kind: 'interval-from-completion', days: 91 }, weekendRule: 'unknown',
      lastDone: addDays(docsRestoreDue, -91),
    } },
    // --- three lit ---
    { key: 'FOT-1', inputs: {
      recurrence: { kind: 'anniversary', anchorDate: makeDate(y, m, 1) }, weekendRule: 'unknown',
    } },
    { key: 'FOT-6', inputs: {
      recurrence: { kind: 'fixed-monthly', day: parts(trust).d }, weekendRule: 'unknown',
    } },
    { key: 'FOT-24', inputs: {
      recurrence: { kind: 'fixed-monthly', day: parts(heartbeat).d }, weekendRule: 'unknown',
    } },
    // --- a weekend-dated row past its target under each weekendRule ---
    { key: 'FOT-23', inputs: {
      recurrence: { kind: 'interval-from-completion', days: 91 }, weekendRule: 'rolls-forward',
      lastDone: addDays(sat, -91),
    } },
    { key: 'FOT-27', inputs: {
      recurrence: { kind: 'anniversary', anchorDate: noRollDay }, weekendRule: 'no-roll',
      lastPeriodCompleted: yearBefore(noRollDay),
    } },
    { key: 'FOT-2', inputs: {
      recurrence: { kind: 'anniversary', anchorDate: sat }, weekendRule: 'unknown',
      lastPeriodCompleted: yearBefore(sat),
    } },
    // --- the rest pending ---
    { key: 'FOT-8', inputs: { recurrence: { kind: 'fixed-annual', month: 5, day: 15 }, weekendRule: 'unknown' } },
    { key: 'FOT-9', inputs: { recurrence: { kind: 'fixed-annual', month: 5, day: 15 }, weekendRule: 'unknown' } },
    { key: 'FOT-25', inputs: {
      recurrence: { kind: 'anniversary', anchorDate: makeDate(y, m + 6, 1) }, weekendRule: 'unknown',
    } },
  ];
}

export function firmObligationsDemoSeed(
  today: string, nowIso: string, newId: () => string,
): { obligations: FirmObligation[]; occurrences: FirmObligationOccurrence[]; reviewLog: ReviewLogEntry[] } {
  const ctx: ActContext = { today, nowIso, newId, user: DEMO_SEED_USER };
  const obligations: FirmObligation[] = [];
  const occurrences: FirmObligationOccurrence[] = [];
  const reviewLog: ReviewLogEntry[] = [];
  const add = (key: string, inputs: ActivationInputs) => {
    const plan = planActivation(activationFromTemplate(template(key), inputs), ctx);
    obligations.push(plan.obligation);
    if (plan.occurrence) occurrences.push(plan.occurrence);
    reviewLog.push({ ...plan.log, id: newId(), timestamp: nowIso });
  };
  for (const { key, inputs } of demoActivations(today)) add(key, inputs);
  // DECISION 9B: the BOI note row, added inactive and undated.
  add('boi-note', { recurrence: { kind: 'one-time' }, weekendRule: 'unknown', active: false });
  return { obligations, occurrences, reviewLog };
}
