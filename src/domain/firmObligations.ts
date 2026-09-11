// FIRM OBLIGATIONS — the domain module.
//
// Authority, in order: docs/specs/firm-obligations-rulings-2026-09-10.md
// (DECISION 0–10 and FOM-1–FOM-15 in Michael's words; session log #155);
// docs/specs/firm-obligations-module-spec.md §2–§5 as AMENDED by its §16;
// docs/specs/firm-obligations-build-slice.md §2.3, §3 item 1, §6 and §7.
// FOS-1 RULED YES by Michael 2026-09-10 ("Yes"), FOD-20 IN.
//
// Pure functions over naive local YYYY-MM-DD dates (FOD-3). NOTHING HERE READS A
// CLOCK: `today` is always an argument, so the register, the dashboard card, the
// Outlook payload and the tests all derive one state from one set of inputs — and
// nothing runs on a timer, because nothing can (spec §4.1).
//
// THREE RULES BIND EVERYTHING BELOW (slice §0):
//  1. No legal conclusion the record has not given. A roll is shown ONLY where
//     the obligation's own `weekendRule` says so; weekends are computed and NO
//     holiday is — there is no holiday list in this file or anywhere (FOM-12(b)).
//  2. Nothing touches a matter. There is no case id in this module (FOD-13).
//  3. FO-2 has no back door. The only closes are Done and, on a
//     conditionalPerPeriod row only, Not applicable; Undo is the only reversal and
//     it is logged. There is no snooze, no "later", no dismiss, no bulk act.

import type { OutlookSyncStatus } from './calendar';
import type { ReviewLogEntry } from './billing';

// ---------------------------------------------------------------- the types

export type FirmObligationCategory =
  | 'licensing' | 'court-appointments' | 'practice-rules'
  | 'tax-entity-and-employment' | 'insurance' | 'infrastructure' | 'custom';

/** DECISION 4 (`FO-5` closed): the field exists from the first migration and
 *  changes NOTHING on screen at the solo stage (FOM-15). */
export type OwnerScope = 'firm' | 'attorney';

export type RuleKind =
  | 'fixed-annual' | 'fixed-quarterly' | 'fixed-monthly'
  | 'anniversary' | 'interval-from-completion' | 'one-time';

/** DECISION 2: filings serial, cadences collapse, per-obligation override. */
export type MissedPeriods = 'serial' | 'collapse';

/** FOD-17 / FOD-31: `month` = the exact day is unknown until the bill arrives. */
export type Precision = 'day' | 'month';

/** FOM-12 (Michael's composite, 2026-09-10) as synthesized in slice §2.3 and
 *  confirmed by FOS-1. `unknown` is the seed value on EVERY template. */
export type WeekendRule = 'rolls-forward' | 'no-roll' | 'unknown';

/** DECISION 6: order and emphasis ONLY — weight never changes behaviour. */
export type Weight = 'hard' | 'routine';

export interface MonthDay { month: number; day: number }

/** The declarative rule (spec §3.2), stored as jsonb — re-evaluated from the rule,
 *  never resolved once. Only the fields its kind names are read. */
export interface RecurrenceRule {
  kind: RuleKind;
  /** fixed-annual */
  month?: number;
  /** fixed-annual, fixed-monthly */
  day?: number;
  /** fixed-quarterly — four dates, in the rule's own period order */
  dates?: MonthDay[];
  /** anniversary — HIS date, entered once */
  anchorDate?: string;
  /** anniversary — defaults to 1 */
  everyYears?: number;
  /** interval-from-completion */
  days?: number;
  /** one-time — undated until he dates it (FOT-32 and its like) */
  dueOn?: string;
}

export interface FirmObligation {
  id: string;
  name: string;
  category: FirmObligationCategory;
  ownerScope: OwnerScope;
  /** NULL = the firm's one attorney. Never filled at the solo stage. */
  ownerUserId?: string;
  /** The FOT- label (or `boi-note`) a row was activated from; absent on a custom row. */
  templateKey?: string;
  recurrence: RecurrenceRule;
  precision: Precision;
  missedPeriods: MissedPeriods;
  /** FOM-2 / FOD-18: the ONLY rows on which Not applicable exists. */
  conditionalPerPeriod: boolean;
  weekendRule: WeekendRule;
  leadDays: number;
  weight: Weight;
  /** FOM-4's optional activation input on a serial row, kept for the record. */
  lastPeriodCompleted?: string;
  /** The SPEC §7 cite-and-status string, copied — never reworded. */
  sourceNote?: string;
  /** FOM-2: the activation fact, split from the per-period lapse flag. */
  appliesIf?: string;
  /** His free text — where to file, the portal, a per-county checklist. */
  notes?: string;
  active: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type OccurrenceState = 'open' | 'done';
export type OccurrenceOutcome = 'completed' | 'not-applicable';
export type OutcomeReason = 'condition-not-met' | 'performed-elsewhere';

export interface FirmObligationOccurrence {
  id: string;
  obligationId: string;
  periodLabel: string;
  /** The RULE date for the period, computed at materialization. */
  dueOn: string;
  /** THIS occurrence's real date when it differs from the rule's (FOD-4-guarded). */
  dueOnOverride?: string;
  /** THAT IS ALL THAT IS STORED — pending / lit / target-passed / overdue /
   *  past-date-unknown are derived at render (stateOf). */
  state: OccurrenceState;
  doneOn?: string;
  doneBy?: string;
  outcome?: OccurrenceOutcome;
  outcomeReason?: OutcomeReason;
  doneNote?: string;
  /** Where the proof lives — a pointer string only, never a stored file. */
  filedAt?: string;
  /** The same four sync fields `calendar_events` carries (DECISION 7). */
  outlookEventId?: string;
  syncStatus: OutlookSyncStatus;
  syncError?: string;
  lastSyncAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** An activation — from a template or blank. `lastDone` is FOD-16's optional
 *  input on an interval row and is recorded in the activation's log line only. */
export type FirmObligationCreate =
  Omit<FirmObligation, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> & { lastDone?: string };

/** What Edit… may change (slice §3 item 4: rule, lead, weight, weekendRule,
 *  notes — plus DECISION 2's per-obligation missed-period override). Name,
 *  category, owner scope, template, source and the lapse flag are fixed at
 *  activation; `active` moves only through Retire / Re-activate. */
export type FirmObligationPatch = Partial<Pick<FirmObligation,
  'recurrence' | 'precision' | 'missedPeriods' | 'leadDays' | 'weight' | 'weekendRule' | 'notes'>>;

const MUTABLE_OBLIGATION_KEYS = new Set<string>([
  'recurrence', 'precision', 'missedPeriods', 'leadDays', 'weight', 'weekendRule', 'notes',
]);

/** Both adapters refuse a patch key outside the mutable set, identically. */
export function assertObligationPatchKeys(patch: object): void {
  const extra = Object.keys(patch).filter((k) => !MUTABLE_OBLIGATION_KEYS.has(k));
  if (extra.length > 0) {
    throw new Error(`updateFirmObligation: unsupported patch key(s) ${extra.join(', ')} — only ${[...MUTABLE_OBLIGATION_KEYS].join(', ')} are editable`);
  }
}

export const FIRM_OBLIGATION_ENTITY = 'firm_obligation';
export const FIRM_OCCURRENCE_ENTITY = 'firm_obligation_occurrence';

/** FOD-14 as amended by FOM-13. */
export const CARD_HORIZON_DAYS = 14;
/** FOD-2. */
export const DEFAULT_LEAD_DAYS = 30;

export const WEEKEND_RULES: WeekendRule[] = ['rolls-forward', 'no-roll', 'unknown'];
export const RULE_KINDS: RuleKind[] = [
  'fixed-annual', 'fixed-quarterly', 'fixed-monthly', 'anniversary', 'interval-from-completion', 'one-time',
];
export const CATEGORIES: FirmObligationCategory[] = [
  'licensing', 'court-appointments', 'practice-rules', 'tax-entity-and-employment', 'insurance', 'infrastructure', 'custom',
];

// ------------------------------------------------- naive-date arithmetic (FOD-3)
// Every date is a naive local YYYY-MM-DD. The arithmetic runs in UTC milliseconds
// purely as a calendar: no instant is ever meant, so no timezone can shift a day.

const DAY_MS = 86_400_000;
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toMs(d: string): number {
  const [y, m, day] = d.split('-').map(Number);
  return Date.UTC(y, m - 1, day);
}
function fromMs(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}
function parts(d: string): { y: number; m: number; d: number } {
  const [y, m, day] = d.split('-').map(Number);
  return { y, m, d: day };
}
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function isIsoDate(s: unknown): s is string {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const { y, m, d } = parts(s);
  return m >= 1 && m <= 12 && d >= 1 && d <= daysInMonth(y, m);
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Builds a date, clamping the day to the month (Feb 29 → Feb 28, Apr 31 → Apr 30). */
export function makeDate(y: number, m: number, d: number): string {
  // Normalise the month first so month arithmetic (m = 0, m = 13) lands correctly.
  const yy = y + Math.floor((m - 1) / 12);
  const mm = ((((m - 1) % 12) + 12) % 12) + 1;
  return `${yy}-${pad2(mm)}-${pad2(Math.min(d, daysInMonth(yy, mm)))}`;
}

export function addDays(d: string, n: number): string {
  return fromMs(toMs(d) + n * DAY_MS);
}
export function daysBetween(from: string, to: string): number {
  return Math.round((toMs(to) - toMs(from)) / DAY_MS);
}
export function dayOfWeek(d: string): number {
  return new Date(toMs(d)).getUTCDay();
}
export function firstOfMonth(d: string): string {
  const { y, m } = parts(d);
  return `${y}-${pad2(m)}-01`;
}
export function endOfMonth(d: string): string {
  const { y, m } = parts(d);
  return `${y}-${pad2(m)}-${pad2(daysInMonth(y, m))}`;
}
function maxDate(a: string, b: string): string {
  return a > b ? a : b;
}

// -------------------------------------------------- weekends — and ONLY weekends

/** Saturday or Sunday. Nothing else is a non-business day to this module:
 *  holidays are flagged on screen, never computed (FOM-12(b); FOD-24). */
export function isWeekend(d: string): boolean {
  const w = dayOfWeek(d);
  return w === 0 || w === 6;
}
export function lastBusinessDayBefore(d: string): string {
  let x = addDays(d, -1);
  while (isWeekend(x)) x = addDays(x, -1);
  return x;
}
export function nextBusinessDayAfter(d: string): string {
  let x = addDays(d, 1);
  while (isWeekend(x)) x = addDays(x, 1);
  return x;
}

// --------------------------------------------------------------- formatting

/** "Sat Jan 30" — the register's short form (slice §2.3's own example shape). */
export function formatDay(d: string): string {
  const { m, d: day } = parts(d);
  return `${WEEKDAY_SHORT[dayOfWeek(d)]} ${MONTH_SHORT[m - 1]} ${day}`;
}
/** "Sat Jan 30, 2027" — the date in full (FOM-3's Later group; the Outlook body). */
export function formatDate(d: string): string {
  return `${formatDay(d)}, ${parts(d).y}`;
}
/** "October 2026" */
export function formatMonth(key: string): string {
  const [y, m] = key.split('-').map(Number);
  const long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${long[m - 1]} ${y}`;
}

// ------------------------------------------------------ rule evaluation (§3.2)

interface PeriodPoint {
  /** The period's own date before precision is applied. */
  base: string;
  /** The RULE date: the base, or the last day of its month under month precision (FOD-31). */
  rule: string;
  /** fixed-quarterly: the index of the date in the rule's list. */
  index?: number;
}

function applyPrecision(ob: Pick<FirmObligation, 'precision'>, base: string): string {
  return ob.precision === 'month' ? endOfMonth(base) : base;
}

/** The kind's candidate periods near `around`, sorted by rule date. */
function candidatePeriods(ob: Pick<FirmObligation, 'recurrence' | 'precision'>, around: string): PeriodPoint[] {
  const r = ob.recurrence;
  const { y, m } = parts(around);
  const out: PeriodPoint[] = [];
  const push = (base: string, index?: number) => out.push({ base, rule: applyPrecision(ob, base), index });
  switch (r.kind) {
    case 'fixed-annual':
      for (let yy = y - 2; yy <= y + 2; yy++) push(makeDate(yy, r.month!, r.day!));
      break;
    case 'fixed-quarterly':
      for (let yy = y - 2; yy <= y + 2; yy++) {
        (r.dates ?? []).forEach((dt, i) => push(makeDate(yy, dt.month, dt.day), i));
      }
      break;
    case 'fixed-monthly':
      for (let k = -3; k <= 3; k++) push(makeDate(y, m + k, r.day!));
      break;
    case 'anniversary': {
      const a = parts(r.anchorDate!);
      const every = r.everyYears && r.everyYears > 0 ? r.everyYears : 1;
      const kLo = Math.floor((y - a.y) / every) - 2;
      for (let k = kLo; k <= kLo + 4; k++) push(makeDate(a.y + k * every, a.m, a.d));
      break;
    }
    default:
      break;
  }
  return out.sort((p, q) => (p.rule < q.rule ? -1 : p.rule > q.rule ? 1 : 0));
}

/** The first period whose RULE date is after `after` — or on/after it when `inclusive`. */
function nextPeriod(
  ob: Pick<FirmObligation, 'recurrence' | 'precision'>, after: string, inclusive: boolean,
): PeriodPoint {
  const hit = candidatePeriods(ob, after).find((p) => (inclusive ? p.rule >= after : p.rule > after));
  if (!hit) throw new Error(`No ${ob.recurrence.kind} period found after ${after}`);
  return hit;
}

// ------------------------------------------------------- periodLabel (FOM-7)

function periodLabelFor(ob: Pick<FirmObligation, 'recurrence'>, p: PeriodPoint): string {
  const r = ob.recurrence;
  const { y, m, d } = parts(p.base);
  switch (r.kind) {
    case 'fixed-annual':
      return String(y);
    case 'fixed-quarterly': {
      // By the RULE'S OWN list order: the i-th date is "Q<i+1>"; a date that
      // precedes the list's first date in the calendar belongs to the prior year
      // (941's Jan 31 closes the previous year's Q4).
      const dates = r.dates ?? [];
      const i = p.index ?? dates.findIndex((dt) => dt.month === m && dt.day === d);
      const first = dates[0];
      const own = dates[i];
      const wraps = !!first && !!own && (own.month < first.month || (own.month === first.month && own.day < first.day));
      return `${wraps ? y - 1 : y} Q${i + 1}`;
    }
    case 'fixed-monthly':
      return `${y}-${pad2(m)}`;
    case 'anniversary': {
      const every = r.everyYears && r.everyYears > 0 ? r.everyYears : 1;
      // The membership-year shape the spec names ("2026–27"); a multi-year term in full.
      return every === 1 ? `${y}–${String(y + 1).slice(2)}` : `${y}–${y + every}`;
    }
    case 'interval-from-completion':
      return `by ${formatDate(p.rule)}`;
    case 'one-time':
      return String(y);
  }
}

/** The label a period would carry — exported for the tests and the catalog. */
export function periodLabel(ob: Pick<FirmObligation, 'recurrence' | 'precision'>, ruleDateOfPeriod: string): string {
  const r = ob.recurrence;
  if (r.kind === 'interval-from-completion' || r.kind === 'one-time') {
    return periodLabelFor(ob, { base: ruleDateOfPeriod, rule: ruleDateOfPeriod });
  }
  const hit = candidatePeriods(ob, ruleDateOfPeriod).find((p) => p.rule === ruleDateOfPeriod);
  return periodLabelFor(ob, hit ?? { base: ruleDateOfPeriod, rule: ruleDateOfPeriod });
}

/** Interval kinds are collapse by construction (§3.2), whatever is stored. */
export function effectiveMissedPeriods(ob: Pick<FirmObligation, 'recurrence' | 'missedPeriods'>): MissedPeriods {
  return ob.recurrence.kind === 'interval-from-completion' ? 'collapse' : ob.missedPeriods;
}

/** Spec §3.2's per-kind default. */
export function defaultMissedPeriods(kind: RuleKind): MissedPeriods {
  return kind === 'fixed-monthly' || kind === 'interval-from-completion' ? 'collapse' : 'serial';
}

// ------------------------------------------------------ materialization (§4.1)

export interface OccurrenceDraft { periodLabel: string; dueOn: string }

/**
 * The FIRST occurrence at activation (FOM-4, FOD-16).
 *  - interval-from-completion: due NOW (today) unless he enters a last-done date,
 *    in which case last-done + days.
 *  - one-time: its dueOn; null while undated (an undated one-time cannot be active).
 *  - every other kind: the first rule date ON OR AFTER today — unless the row is
 *    serial and he gives the optional "last period completed" date, in which case
 *    the period AFTER it, possibly already overdue.
 */
export function materializeFirst(
  ob: Pick<FirmObligation, 'recurrence' | 'precision' | 'missedPeriods'>,
  today: string,
  inputs: { lastPeriodCompleted?: string; lastDone?: string } = {},
): OccurrenceDraft | null {
  const r = ob.recurrence;
  if (r.kind === 'interval-from-completion') {
    const due = inputs.lastDone ? addDays(inputs.lastDone, r.days!) : today;
    return { dueOn: due, periodLabel: periodLabelFor(ob, { base: due, rule: due }) };
  }
  if (r.kind === 'one-time') {
    if (!r.dueOn) return null;
    const rule = applyPrecision(ob, r.dueOn);
    return { dueOn: rule, periodLabel: periodLabelFor(ob, { base: r.dueOn, rule }) };
  }
  const p = effectiveMissedPeriods(ob) === 'serial' && inputs.lastPeriodCompleted
    ? nextPeriod(ob, inputs.lastPeriodCompleted, false)
    : nextPeriod(ob, today, true);
  return { dueOn: p.rule, periodLabel: periodLabelFor(ob, p) };
}

/**
 * The NEXT occurrence when one closes (FOD-5 as amended by FOM-1 and FOM-4).
 *  - one-time: none — the obligation retires itself (FOD-32).
 *  - a RETIRED obligation: none (FOD-8).
 *  - interval-from-completion: completion + days (collapse by construction).
 *  - serial: the next PERIOD after the closed rule date, even if already past —
 *    each Done materializes the next already-overdue period, so two years behind
 *    is two clicks (FOM-10).
 *  - collapse, both FOM-1 limbs at once: a cadence completion closes the period it
 *    falls in (next = the first rule date in a LATER period); a dated kind never
 *    re-materializes its own date (next = the first rule date after the later of
 *    its due date and the completion). For fixed-monthly both limbs are the one
 *    rule "after the later of the completion's month-end and the due date".
 */
export function materializeNext(
  ob: Pick<FirmObligation, 'recurrence' | 'precision' | 'missedPeriods' | 'active'>,
  closed: Pick<FirmObligationOccurrence, 'dueOn'>,
  completion: string,
): OccurrenceDraft | null {
  const r = ob.recurrence;
  if (r.kind === 'one-time') return null;
  if (!ob.active) return null;
  if (r.kind === 'interval-from-completion') {
    const due = addDays(completion, r.days!);
    return { dueOn: due, periodLabel: periodLabelFor(ob, { base: due, rule: due }) };
  }
  let p: PeriodPoint;
  if (effectiveMissedPeriods(ob) === 'serial') {
    p = nextPeriod(ob, closed.dueOn, false);
  } else if (r.kind === 'fixed-monthly') {
    p = nextPeriod(ob, maxDate(endOfMonth(completion), closed.dueOn), false);
  } else {
    p = nextPeriod(ob, maxDate(closed.dueOn, completion), false);
  }
  return { dueOn: p.rule, periodLabel: periodLabelFor(ob, p) };
}

/**
 * FOD-4's re-evaluation of the OPEN occurrence under an edited rule. The occurrence
 * keeps its PERIOD — the 2027 report stays the 2027 report — and takes the new
 * rule's date for that period; only where no period of the new rule carries the
 * same label (the kind itself changed) does it take the nearest new rule date. An
 * interval row moves only when a completion exists to measure from: its first
 * occurrence was dated from an activation input (FOD-16's last-done date, or
 * "now") that the rule alone cannot reproduce, so it keeps its date.
 */
export function reevaluateOpen(
  ob: Pick<FirmObligation, 'recurrence' | 'precision' | 'missedPeriods'>,
  open: Pick<FirmObligationOccurrence, 'dueOn' | 'periodLabel'>,
  all: FirmObligationOccurrence[],
): OccurrenceDraft | null {
  const r = ob.recurrence;
  if (r.kind === 'interval-from-completion') {
    const lastDone = all
      .filter((o) => o.state === 'done' && o.doneOn)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .at(-1);
    if (!lastDone) return null;
    const due = addDays(lastDone.doneOn!, r.days!);
    return { dueOn: due, periodLabel: periodLabelFor(ob, { base: due, rule: due }) };
  }
  if (r.kind === 'one-time') return materializeFirst(ob, open.dueOn);
  const candidates = candidatePeriods(ob, open.dueOn);
  if (candidates.length === 0) return null;
  const sameLabel = candidates.find((p) => periodLabelFor(ob, p) === open.periodLabel);
  const pick = sameLabel ?? candidates.reduce((best, p) =>
    Math.abs(daysBetween(open.dueOn, p.rule)) < Math.abs(daysBetween(open.dueOn, best.rule)) ? p : best);
  return { dueOn: pick.rule, periodLabel: periodLabelFor(ob, pick) };
}

// ------------------------------------------ the derived dates and states (§2.3)

/** R — the rule date for this occurrence: his override, else the materialized date. */
export function ruleDate(occ: Pick<FirmObligationOccurrence, 'dueOn' | 'dueOnOverride'>): string {
  return occ.dueOnOverride ?? occ.dueOn;
}

/** T — the TARGET: the last business day before a weekend R; R itself on a weekday.
 *  The lit moment, the lead window, the card horizon and the Outlook event and
 *  reminder ALL key off T (§2.3 item 3). */
export function targetDate(occ: Pick<FirmObligationOccurrence, 'dueOn' | 'dueOnOverride'>): string {
  const r = ruleDate(occ);
  return isWeekend(r) ? lastBusinessDayBefore(r) : r;
}

/** D — the DUE date: rolled to the next business day ONLY under the obligation's
 *  own `rolls-forward`; the rule date under `no-roll` and under `unknown`. */
export function dueDate(
  ob: Pick<FirmObligation, 'weekendRule'>, occ: Pick<FirmObligationOccurrence, 'dueOn' | 'dueOnOverride'>,
): string {
  const r = ruleDate(occ);
  if (!isWeekend(r)) return r;
  return ob.weekendRule === 'rolls-forward' ? nextBusinessDayAfter(r) : r;
}

/** `unknown` with a weekend R — the one shape that never prints "overdue". */
export function isUnknownWeekend(
  ob: Pick<FirmObligation, 'weekendRule'>, occ: Pick<FirmObligationOccurrence, 'dueOn' | 'dueOnOverride'>,
): boolean {
  return ob.weekendRule === 'unknown' && isWeekend(ruleDate(occ));
}

/** The lit moment: T − lead; for a month-precision occurrence whose real date is
 *  not yet known, the EARLIER of that and the 1st of its month (FOM-6 — imprecision
 *  about the day never shortens a lead). Once `dueOnOverride` carries the real date
 *  (FOD-31), the occurrence is a day-precise one. */
export function lightsOn(
  ob: Pick<FirmObligation, 'leadDays' | 'precision'>,
  occ: Pick<FirmObligationOccurrence, 'dueOn' | 'dueOnOverride'>,
): string {
  const byLead = addDays(targetDate(occ), -ob.leadDays);
  if (ob.precision === 'month' && !occ.dueOnOverride) {
    const first = firstOfMonth(ruleDate(occ));
    return byLead < first ? byLead : first;
  }
  return byLead;
}

export type DisplayState = 'pending' | 'lit' | 'target-passed' | 'overdue' | 'past-date-unknown' | 'done';

/**
 * The FIVE display states plus done, derived at render — nothing stored (§2.3 item 4).
 *   pending            today < lightsOn
 *   lit                lightsOn ≤ today ≤ T
 *   target-passed      T < today ≤ D
 *   overdue            today > D
 *   past-date-unknown  `unknown` with R on a weekend, from the day after T until done
 * Precedence: done over everything; past-date-unknown over target-passed and overdue.
 */
export function stateOf(
  ob: Pick<FirmObligation, 'leadDays' | 'precision' | 'weekendRule'>,
  occ: FirmObligationOccurrence,
  today: string,
): DisplayState {
  if (occ.state === 'done') return 'done';
  if (today < lightsOn(ob, occ)) return 'pending';
  if (today <= targetDate(occ)) return 'lit';
  if (isUnknownWeekend(ob, occ)) return 'past-date-unknown';
  if (today <= dueDate(ob, occ)) return 'target-passed';
  return 'overdue';
}

/** The day count from D — ONLY in the overdue state. Null everywhere else, and
 *  therefore always null under `unknown` on a weekend-dated occurrence. */
export function daysOverdue(
  ob: Pick<FirmObligation, 'leadDays' | 'precision' | 'weekendRule'>,
  occ: FirmObligationOccurrence,
  today: string,
): number | null {
  return stateOf(ob, occ, today) === 'overdue' ? daysBetween(dueDate(ob, occ), today) : null;
}

/** The register's "lit" in FO-2's sense — entered its window and not done (spec §2:
 *  "OVERDUE — lit and past its due date. Both are the same 'lit'"). */
export function isLitInFo2Sense(state: DisplayState): boolean {
  return state === 'lit' || state === 'target-passed' || state === 'past-date-unknown' || state === 'overdue';
}

// --------------------------------------------- the strong line — TEXT ACTS (FOD-25)
// Every string below is PROVISIONAL (FOD-25, TEXT ACT). Michael rules the wording
// at the FIRM-OBLIGATIONS HANDS-ON SITTING; nothing here is approved text.

export const FOD1_NOTE = 'a next-business-day rule may apply; not computed'; // PROVISIONAL — FOD-1 as amended by FOM-12 (FOD-25)

export interface StrongLine {
  text: string;
  tone: 'quiet' | 'strong' | 'warn' | 'danger';
}

/** The row's strong line, per §2.3 item 4 and FOD-25. The encouragement (aim for
 *  the target) is the strong line in every state before T. */
export function strongLine(
  ob: Pick<FirmObligation, 'leadDays' | 'precision' | 'weekendRule'>,
  occ: FirmObligationOccurrence,
  today: string,
  opts: { withYear?: boolean } = {},
): StrongLine {
  const fmt = opts.withYear ? formatDate : formatDay;
  const st = stateOf(ob, occ, today);
  const R = ruleDate(occ);
  const T = targetDate(occ);
  const D = dueDate(ob, occ);
  switch (st) {
    case 'done':
      return { text: `Done ${fmt(occ.doneOn ?? today)}`, tone: 'quiet' }; // PROVISIONAL — FOD-25
    case 'past-date-unknown':
      return { text: `past its date — ${FOD1_NOTE}`, tone: 'warn' }; // PROVISIONAL — FOD-25
    case 'target-passed':
      return { text: `target passed — due ${fmt(D)}`, tone: 'warn' }; // PROVISIONAL — FOD-25
    case 'overdue': {
      const n = daysBetween(D, today);
      return { text: `overdue · ${n} day${n === 1 ? '' : 's'}`, tone: 'danger' }; // PROVISIONAL — FOD-25
    }
    default: {
      const tone = st === 'lit' ? 'strong' : 'quiet';
      if (!isWeekend(R)) return { text: `Due ${fmt(D)}`, tone }; // PROVISIONAL — FOD-25
      if (ob.weekendRule === 'rolls-forward') {
        return { text: `Due ${fmt(D)} (rolled from ${fmt(R)}) · aim for ${fmt(T)}`, tone }; // PROVISIONAL — FOD-25
      }
      if (ob.weekendRule === 'no-roll') {
        return { text: `Due ${fmt(R)} · aim for ${fmt(T)}`, tone }; // PROVISIONAL — FOD-25
      }
      return { text: `Rule date ${fmt(R)} — ${FOD1_NOTE} · aim for ${fmt(T)}`, tone }; // PROVISIONAL — FOD-25
    }
  }
}

/** One /cases card line (FOD-26): "<name> · aim for <T> · N days" while lit; after the
 *  target, the strong line's own FOD-25 wording — so a weekend row under `unknown`
 *  never reads "overdue" or a day count on the card either. PROVISIONAL. */
export function cardLine(
  item: Pick<ViewItem, 'obligation' | 'occurrence' | 'state' | 'target'>, today: string,
): string {
  const { obligation: ob, occurrence: occ } = item;
  if (item.state === 'lit') {
    const n = daysBetween(today, item.target);
    return `${ob.name} · aim for ${formatDay(item.target)} · ${n} day${n === 1 ? '' : 's'}`; // PROVISIONAL — FOD-26
  }
  return `${ob.name} · ${strongLine(ob, occ, today).text}`; // PROVISIONAL — FOD-26 with FOD-25
}

/** FOD-24 — the standing holiday line (register foot; card expander). PROVISIONAL. */
export const HOLIDAY_LINE = 'Holidays are not computed — a rule date that falls on a holiday may roll; check it.'; // PROVISIONAL — FOD-24

// ------------------------------------------------------------- the card (FOM-13)

export interface ViewItem {
  obligation: FirmObligation;
  occurrence: FirmObligationOccurrence;
  state: DisplayState;
  target: string;
  due: string;
  daysOverdue: number | null;
}

function viewItem(ob: FirmObligation, occ: FirmObligationOccurrence, today: string): ViewItem {
  return {
    obligation: ob,
    occurrence: occ,
    state: stateOf(ob, occ, today),
    target: targetDate(occ),
    due: dueDate(ob, occ),
    daysOverdue: daysOverdue(ob, occ, today),
  };
}

function openItems(
  obligations: FirmObligation[], occurrences: FirmObligationOccurrence[], today: string,
): ViewItem[] {
  const byId = new Map(obligations.map((o) => [o.id, o]));
  const out: ViewItem[] = [];
  for (const occ of occurrences) {
    if (occ.state !== 'open') continue;
    const ob = byId.get(occ.obligationId);
    // A RETIRED obligation's open occurrence stays (FOD-8): no `active` filter here.
    if (ob) out.push(viewItem(ob, occ, today));
  }
  return out;
}

const byTarget = (a: ViewItem, b: ViewItem) =>
  a.target < b.target ? -1 : a.target > b.target ? 1
    : a.obligation.weight !== b.obligation.weight ? (a.obligation.weight === 'hard' ? -1 : 1)
      : a.obligation.name.localeCompare(b.obligation.name);

/**
 * The /cases card (FOM-13, conjunctive; DECISION 6). A `hard` item is on it when it
 * is OVERDUE — however long overdue (FO-2) — or when the register has LIT it (lit,
 * target-passed or past-date-unknown: entered its window and not done) AND its
 * TARGET is within 14 days. The card never shows what the register has not lit,
 * and routine items never reach it. Ordered by target date.
 */
export function cardItems(
  obligations: FirmObligation[], occurrences: FirmObligationOccurrence[], today: string,
): ViewItem[] {
  return openItems(obligations, occurrences, today)
    .filter((it) => it.obligation.weight === 'hard')
    .filter((it) => it.state === 'overdue'
      || ((it.state === 'lit' || it.state === 'target-passed' || it.state === 'past-date-unknown')
        && daysBetween(today, it.target) <= CARD_HORIZON_DAYS))
    .sort(byTarget);
}

export function cardCounts(items: ViewItem[]): { due: number; overdue: number } {
  const overdue = items.filter((i) => i.state === 'overdue').length;
  return { due: items.length - overdue, overdue };
}

// --------------------------------------------------------- the register (§5.2)

export interface RegisterMonth { key: string; label: string; items: ViewItem[] }
export interface RegisterView {
  overdue: ViewItem[];
  months: RegisterMonth[];
  later: ViewItem[];
  inactive: { obligation: FirmObligation; lastDone: FirmObligationOccurrence | null; open: FirmObligationOccurrence | null }[];
}

/**
 * Overdue pinned (FOM-9: every hard above every routine; within each class, most
 * days overdue first); then twelve months from the current one holding EVERY open
 * occurrence (FOM-14), grouped by TARGET month — the date the event, the lead and
 * the card all key off; an occurrence whose target fell in an earlier month and is
 * not overdue (target passed, or past its date under `unknown`) stays in the
 * current month rather than vanishing; then Later (FOM-3); then Inactive (FOM-5).
 */
export function registerView(
  obligations: FirmObligation[], occurrences: FirmObligationOccurrence[], today: string,
): RegisterView {
  const items = openItems(obligations, occurrences, today);
  const overdue = items.filter((i) => i.state === 'overdue').sort((a, b) => {
    if (a.obligation.weight !== b.obligation.weight) return a.obligation.weight === 'hard' ? -1 : 1;
    const d = (b.daysOverdue ?? 0) - (a.daysOverdue ?? 0);
    return d !== 0 ? d : a.obligation.name.localeCompare(b.obligation.name);
  });

  const { y, m } = parts(today);
  const keys: string[] = [];
  for (let i = 0; i < 12; i++) keys.push(makeDate(y, m + i, 1).slice(0, 7));
  const months = new Map<string, ViewItem[]>(keys.map((k) => [k, []]));
  const later: ViewItem[] = [];
  for (const it of items) {
    if (it.state === 'overdue') continue;
    const key = it.target.slice(0, 7);
    if (months.has(key)) months.get(key)!.push(it);
    else if (key < keys[0]) months.get(keys[0])!.push(it);
    else later.push(it);
  }

  const occsByOb = new Map<string, FirmObligationOccurrence[]>();
  for (const occ of occurrences) {
    const list = occsByOb.get(occ.obligationId) ?? [];
    list.push(occ);
    occsByOb.set(occ.obligationId, list);
  }
  const inactive = obligations
    .filter((o) => !o.active)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((o) => {
      const list = occsByOb.get(o.id) ?? [];
      const done = list.filter((x) => x.state === 'done').sort((a, b) => (a.doneOn ?? '').localeCompare(b.doneOn ?? ''));
      return { obligation: o, lastDone: done.at(-1) ?? null, open: list.find((x) => x.state === 'open') ?? null };
    });

  return {
    overdue,
    months: keys.map((k) => ({ key: k, label: formatMonth(k), items: months.get(k)!.sort(byTarget) })),
    later: later.sort(byTarget),
    inactive,
  };
}

// ------------------------------------------------------------- validation

/** `allowUndated`: an INACTIVE row may omit its DATE parameters — the seeded-inactive
 *  templates (FOT-7, FOT-32–FOT-34, the BOI note) have no date until he has one. Its
 *  non-date parameters (every N years, an interval's days) are still checked. */
export function validateRule(rule: RecurrenceRule, opts: { allowUndated?: boolean } = {}): string[] {
  const errs: string[] = [];
  const undated = !!opts.allowUndated;
  const md = (month: unknown, day: unknown, what: string) => {
    if (!Number.isInteger(month) || (month as number) < 1 || (month as number) > 12) errs.push(`${what}: month must be 1–12`);
    if (!Number.isInteger(day) || (day as number) < 1 || (day as number) > 31) errs.push(`${what}: day must be 1–31`);
  };
  switch (rule.kind) {
    case 'fixed-annual':
      if (!(undated && rule.month === undefined && rule.day === undefined)) md(rule.month, rule.day, 'fixed-annual');
      break;
    case 'fixed-quarterly':
      if (undated && rule.dates === undefined) break;
      if (!Array.isArray(rule.dates) || rule.dates.length !== 4) errs.push('fixed-quarterly needs exactly four dates');
      else rule.dates.forEach((d, i) => md(d.month, d.day, `quarter ${i + 1}`));
      break;
    case 'fixed-monthly':
      if (undated && rule.day === undefined) break;
      if (!Number.isInteger(rule.day) || rule.day! < 1 || rule.day! > 31) errs.push('fixed-monthly: day must be 1–31');
      break;
    case 'anniversary':
      if (!(undated && rule.anchorDate === undefined) && !isIsoDate(rule.anchorDate)) errs.push('anniversary needs its anchor date');
      if (rule.everyYears !== undefined && (!Number.isInteger(rule.everyYears) || rule.everyYears < 1)) errs.push('everyYears must be a whole number ≥ 1');
      break;
    case 'interval-from-completion':
      if (!Number.isInteger(rule.days) || rule.days! < 1) errs.push('interval needs a whole number of days ≥ 1');
      break;
    case 'one-time':
      if (rule.dueOn === undefined ? !opts.allowUndated : !isIsoDate(rule.dueOn)) errs.push('one-time needs its due date');
      break;
    default:
      errs.push(`unknown rule kind ${(rule as { kind: string }).kind}`);
  }
  return errs;
}

/** Throws on a shape both adapters must refuse identically. An INACTIVE row may be
 *  undated (a seeded-inactive template); an active one never is — the software
 *  never guesses a date (FOD-9). */
export function validateObligation(ob: Omit<FirmObligation, 'id' | 'createdAt' | 'updatedAt'>): void {
  const errs: string[] = [];
  if (!ob.name || !ob.name.trim()) errs.push('a name is required');
  if (!CATEGORIES.includes(ob.category)) errs.push('unknown category');
  if (ob.ownerScope !== 'firm' && ob.ownerScope !== 'attorney') errs.push('owner scope must be firm or attorney');
  if (ob.precision !== 'day' && ob.precision !== 'month') errs.push('precision must be day or month');
  if (ob.missedPeriods !== 'serial' && ob.missedPeriods !== 'collapse') errs.push('missed periods must be serial or collapse');
  if (!WEEKEND_RULES.includes(ob.weekendRule)) errs.push('weekend rule must be rolls-forward, no-roll or unknown');
  if (!Number.isInteger(ob.leadDays) || ob.leadDays < 0) errs.push('lead days must be a whole number ≥ 0');
  if (ob.weight !== 'hard' && ob.weight !== 'routine') errs.push('weight must be hard or routine');
  if (ob.lastPeriodCompleted !== undefined && !isIsoDate(ob.lastPeriodCompleted)) errs.push('last period completed must be a date');
  errs.push(...validateRule(ob.recurrence, { allowUndated: !ob.active }));
  if (errs.length) throw new Error(`Firm obligation refused: ${errs.join('; ')}`);
}

// --------------------------------------------------------------- the acts
//
// Every act is PLANNED here as pure data — the rows to write and the ONE review_log
// line it writes (FOD-6) — and APPLIED by each adapter. That is how the localStorage
// and Supabase modes cannot diverge: neither adapter decides anything.
//
// THE CLOSE TRAIL. Undo's only test (FOD-7, FOM-11) needs to know which occurrence a
// close materialized, and whether a later act touched it. §5.2's columns carry no
// such link, so the close line itself carries it: the `done` / `not-applicable`
// line's newValue is a small JSON record naming the next occurrence's id. Every act
// that could touch that occurrence writes its own line (FOD-6), so the log is the
// complete, ordered record of what happened after the close — by construction, in
// both modes.

export type LogDraft = Omit<ReviewLogEntry, 'id' | 'timestamp'>;

export interface ActContext {
  today: string;
  nowIso: string;
  newId: () => string;
  user: string;
}

interface CloseTrail {
  kind: 'close';
  doneOn: string;
  nextOccurrenceId: string | null;
  retiredObligation: boolean;
}
interface ObligationTrail {
  kind: 'obligation';
  act: 'activated' | 'edited' | 'retired' | 're-activated';
  fields?: string[];
  openedOccurrenceId?: string | null;
  reevaluatedOccurrenceId?: string | null;
}
interface UndoTrail {
  kind: 'undo';
  removedNextOccurrenceId: string | null;
  removedNextOutlookEventId: string | null;
  reactivatedObligation: boolean;
}
type Trail = CloseTrail | ObligationTrail | UndoTrail;

export function readTrail(line: Pick<ReviewLogEntry, 'newValue'>): Trail | null {
  if (!line.newValue || line.newValue[0] !== '{') return null;
  try {
    const t = JSON.parse(line.newValue) as Trail;
    return t && typeof t === 'object' && 'kind' in t ? t : null;
  } catch {
    return null;
  }
}

function assertOneOpen(occs: FirmObligationOccurrence[]): void {
  if (occs.filter((o) => o.state === 'open').length > 1) {
    throw new Error('More than one open occurrence on this obligation — the one-open invariant is broken (FOD-5); refusing to act.');
  }
}

function newOccurrence(ob: Pick<FirmObligation, 'id'>, draft: OccurrenceDraft, ctx: ActContext): FirmObligationOccurrence {
  return {
    id: ctx.newId(),
    obligationId: ob.id,
    periodLabel: draft.periodLabel,
    dueOn: draft.dueOn,
    state: 'open',
    syncStatus: 'pending',
    createdAt: ctx.nowIso,
    updatedAt: ctx.nowIso,
  };
}

// ---- activation ----

export interface ActivationPlan {
  obligation: FirmObligation;
  occurrence: FirmObligationOccurrence | null;
  log: LogDraft;
}

export function planActivation(input: FirmObligationCreate, ctx: ActContext): ActivationPlan {
  const { lastDone, ...rest } = input;
  const serial = effectiveMissedPeriods(rest) === 'serial';
  const obligation: FirmObligation = {
    ...rest,
    missedPeriods: effectiveMissedPeriods(rest),
    // FOM-4's input exists only on a serial row.
    lastPeriodCompleted: serial ? rest.lastPeriodCompleted : undefined,
    id: ctx.newId(),
    createdAt: ctx.nowIso,
    updatedAt: ctx.nowIso,
  };
  validateObligation(obligation);
  if (lastDone !== undefined && !isIsoDate(lastDone)) throw new Error('last done must be a date');
  if (lastDone && lastDone > ctx.today) throw new Error('last done cannot be a future date');
  if (obligation.lastPeriodCompleted && obligation.lastPeriodCompleted > ctx.today) {
    throw new Error('last period completed cannot be a future date');
  }

  let occurrence: FirmObligationOccurrence | null = null;
  if (obligation.active) {
    const draft = materializeFirst(obligation, ctx.today, {
      lastPeriodCompleted: obligation.lastPeriodCompleted, lastDone,
    });
    if (!draft) throw new Error('This obligation has no date yet — enter it to activate (FOD-9).');
    occurrence = newOccurrence(obligation, draft, ctx);
  }
  const trail: ObligationTrail = { kind: 'obligation', act: 'activated', openedOccurrenceId: occurrence?.id ?? null };
  return {
    obligation,
    occurrence,
    log: {
      entityType: FIRM_OBLIGATION_ENTITY,
      entityId: obligation.id,
      action: 'created',
      user: ctx.user,
      newValue: JSON.stringify({ ...trail, templateKey: obligation.templateKey ?? null, lastDone: lastDone ?? null }),
      reason: occurrence
        ? `Activated${obligation.templateKey ? ` from ${obligation.templateKey}` : ' (custom)'}; first occurrence ${occurrence.periodLabel}, rule date ${formatDate(occurrence.dueOn)}`
        : `Added inactive${obligation.templateKey ? ` from ${obligation.templateKey}` : ''}`,
    },
  };
}

// ---- Done / Not applicable ----

export interface ClosePlan {
  occurrenceId: string;
  occurrencePatch: Partial<FirmObligationOccurrence>;
  next: FirmObligationOccurrence | null;
  obligationPatch: Partial<FirmObligation> | null;
  log: LogDraft;
}

function planClose(
  ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[],
  outcome: OccurrenceOutcome, input: { doneOn?: string; doneNote?: string; filedAt?: string; reason?: OutcomeReason },
  ctx: ActContext,
): ClosePlan {
  if (occ.obligationId !== ob.id) throw new Error('occurrence does not belong to this obligation');
  if (occ.state !== 'open') throw new Error('Only an open occurrence can be closed.');
  assertOneOpen(all);
  const doneOn = input.doneOn ?? ctx.today;
  if (!isIsoDate(doneOn)) throw new Error('The done date must be a date.');
  // A future done date would move an interval row's next due date later on paper —
  // a back door out of FO-2 — so it is refused.
  if (doneOn > ctx.today) throw new Error('The done date cannot be in the future.');

  const draft = materializeNext(ob, occ, doneOn);
  const next = draft ? newOccurrence(ob, draft, ctx) : null;
  const retires = ob.recurrence.kind === 'one-time' && ob.active; // FOD-32
  const trail: CloseTrail = { kind: 'close', doneOn, nextOccurrenceId: next?.id ?? null, retiredObligation: retires };
  const note = input.doneNote?.trim() || undefined;
  return {
    occurrenceId: occ.id,
    occurrencePatch: {
      state: 'done',
      doneOn,
      outcome,
      outcomeReason: outcome === 'not-applicable' ? input.reason : undefined,
      doneNote: note,
      filedAt: outcome === 'completed' ? input.filedAt?.trim() || undefined : undefined,
      // The Done PATCH to Outlook (FOD-22) is pending until pushed.
      syncStatus: 'pending',
      updatedAt: ctx.nowIso,
    },
    next,
    obligationPatch: retires ? { active: false, updatedAt: ctx.nowIso } : null,
    log: {
      entityType: FIRM_OCCURRENCE_ENTITY,
      entityId: occ.id,
      action: outcome === 'completed' ? 'done' : 'not-applicable',
      user: ctx.user,
      newValue: JSON.stringify(trail),
      reason: [
        outcome === 'completed' ? `Done ${formatDate(doneOn)}` : `Not applicable (${input.reason}) ${formatDate(doneOn)}`,
        note ? `— ${note}` : '',
        next ? `· next: ${next.periodLabel}, rule date ${formatDate(next.dueOn)}` : '',
        retires ? '· one-time: the obligation retires itself' : '',
        !next && !retires && !ob.active ? '· retired: no next occurrence' : '',
      ].filter(Boolean).join(' '),
    },
  };
}

export function planDone(
  ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[],
  input: { doneOn?: string; doneNote?: string; filedAt?: string }, ctx: ActContext,
): ClosePlan {
  return planClose(ob, occ, all, 'completed', input, ctx);
}

/** FOD-18: offered ONLY on a conditionalPerPeriod obligation, and a reason is required. */
export function planNotApplicable(
  ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[],
  input: { reason?: OutcomeReason; note?: string; doneOn?: string }, ctx: ActContext,
): ClosePlan {
  if (!ob.conditionalPerPeriod) {
    throw new Error('Not applicable is offered only on an obligation that can lapse for a period (FOD-18).');
  }
  if (input.reason !== 'condition-not-met' && input.reason !== 'performed-elsewhere') {
    throw new Error('A reason is required: condition not met, or performed elsewhere (FOD-18).');
  }
  return planClose(ob, occ, all, 'not-applicable', { doneOn: input.doneOn, doneNote: input.note, reason: input.reason }, ctx);
}

// ---- Undo (FOD-7, FOM-11) ----

export type UndoCheck = { ok: true } | { ok: false; why: string };

/**
 * Undo's ONLY test (FOM-11): allowed while the occurrence this close materialized
 * is untouched — refused once it has been edited, done, or a re-activation opened
 * another. `log` holds every line on the obligation and its occurrences in the
 * order they were written.
 */
export function canUndo(
  ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[], log: ReviewLogEntry[],
): UndoCheck {
  if (occ.obligationId !== ob.id) return { ok: false, why: 'This occurrence does not belong to that obligation.' };
  if (occ.state !== 'done') return { ok: false, why: 'Only a closed occurrence can be undone.' };
  let closeIdx = -1;
  for (let i = log.length - 1; i >= 0; i--) {
    const l = log[i];
    if (l.entityId === occ.id && (l.action === 'done' || l.action === 'not-applicable')) { closeIdx = i; break; }
  }
  const trail = closeIdx >= 0 ? readTrail(log[closeIdx]) : null;
  if (!trail || trail.kind !== 'close') {
    return { ok: false, why: 'No close record for this occurrence — it cannot be undone.' };
  }
  for (const later of log.slice(closeIdx + 1)) {
    if (later.entityType === FIRM_OCCURRENCE_ENTITY && later.entityId !== occ.id) {
      return { ok: false, why: 'A later act has touched the next occurrence — undo is no longer available (FOD-7).' };
    }
    if (later.entityType === FIRM_OBLIGATION_ENTITY) {
      const t = readTrail(later);
      if (t?.kind === 'obligation' && (t.openedOccurrenceId || t.reevaluatedOccurrenceId)) {
        return { ok: false, why: 'A later edit or re-activation changed the open occurrence — undo is no longer available (FOD-7).' };
      }
    }
  }
  const open = all.filter((o) => o.state === 'open');
  if (trail.nextOccurrenceId) {
    const next = all.find((o) => o.id === trail.nextOccurrenceId);
    if (!next || next.state !== 'open' || next.dueOnOverride) {
      return { ok: false, why: 'The next occurrence is no longer untouched — undo is no longer available (FOD-7).' };
    }
    if (open.length !== 1 || open[0].id !== next.id) {
      return { ok: false, why: 'Another occurrence is open — undo would leave two open (FOD-5).' };
    }
  } else if (open.length > 0) {
    return { ok: false, why: 'Another occurrence has been opened since — undo would leave two open (FOD-5).' };
  }
  return { ok: true };
}

export interface UndoPlan {
  occurrenceId: string;
  reopenPatch: Partial<FirmObligationOccurrence>;
  removeOccurrence: FirmObligationOccurrence | null;
  obligationPatch: Partial<FirmObligation> | null;
  log: LogDraft;
}

export function planUndo(
  ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[], log: ReviewLogEntry[],
  ctx: ActContext,
): UndoPlan {
  const check = canUndo(ob, occ, all, log);
  if (!check.ok) throw new Error(check.why);
  let closeLine: ReviewLogEntry | undefined;
  for (let i = log.length - 1; i >= 0; i--) {
    if (log[i].entityId === occ.id && (log[i].action === 'done' || log[i].action === 'not-applicable')) { closeLine = log[i]; break; }
  }
  const trail = readTrail(closeLine!) as CloseTrail;
  const removeOccurrence = trail.nextOccurrenceId ? all.find((o) => o.id === trail.nextOccurrenceId) ?? null : null;
  const undoTrail: UndoTrail = {
    kind: 'undo',
    removedNextOccurrenceId: removeOccurrence?.id ?? null,
    removedNextOutlookEventId: removeOccurrence?.outlookEventId ?? null,
    reactivatedObligation: trail.retiredObligation,
  };
  return {
    occurrenceId: occ.id,
    reopenPatch: {
      state: 'open',
      doneOn: undefined,
      doneBy: undefined,
      outcome: undefined,
      outcomeReason: undefined,
      doneNote: undefined,
      filedAt: undefined,
      // Restores the Outlook subject (FOD-22).
      syncStatus: 'pending',
      updatedAt: ctx.nowIso,
    },
    removeOccurrence,
    obligationPatch: trail.retiredObligation ? { active: true, updatedAt: ctx.nowIso } : null,
    log: {
      entityType: FIRM_OCCURRENCE_ENTITY,
      entityId: occ.id,
      action: 'undone',
      user: ctx.user,
      newValue: JSON.stringify(undoTrail),
      reason: [
        'Reopened',
        removeOccurrence ? `· the untouched next occurrence (${removeOccurrence.periodLabel}) removed` : '',
        trail.retiredObligation ? '· the obligation re-activated' : '',
      ].filter(Boolean).join(' '),
    },
  };
}

// ---- the due-date override (FOD-4) ----

export interface OverridePlan {
  occurrenceId: string;
  patch: Partial<FirmObligationOccurrence>;
  log: LogDraft;
}

/** Sets THIS occurrence's real date. Refused on a done occurrence, and on an OVERDUE
 *  one whenever it would move the due date later or take it out of "overdue" — the
 *  never-later rule, so an override is never a back door out of FO-2 (FOD-4). */
export function planOverride(
  ob: FirmObligation, occ: FirmObligationOccurrence, date: string, ctx: ActContext,
): OverridePlan {
  if (occ.state !== 'open') throw new Error('Only an open occurrence takes a due-date override.');
  if (!isIsoDate(date)) throw new Error('The due date must be a date.');
  const before = stateOf(ob, occ, ctx.today);
  const after = { ...occ, dueOnOverride: date };
  if (before === 'overdue') {
    if (dueDate(ob, after) > dueDate(ob, occ) || stateOf(ob, after, ctx.today) !== 'overdue') {
      throw new Error('This occurrence is overdue; its due date can never be moved later (FOD-4).');
    }
  }
  return {
    occurrenceId: occ.id,
    patch: { dueOnOverride: date, syncStatus: 'pending', updatedAt: ctx.nowIso },
    log: {
      entityType: FIRM_OCCURRENCE_ENTITY,
      entityId: occ.id,
      action: 'edited',
      user: ctx.user,
      oldValue: ruleDate(occ),
      newValue: date,
      reason: `Due date for ${occ.periodLabel} set to ${formatDate(date)} (was ${formatDate(ruleDate(occ))})`,
    },
  };
}

// ---- Edit… (FOD-4) ----

export interface EditPlan {
  obligationPatch: Partial<FirmObligation>;
  occurrence: { id: string; patch: Partial<FirmObligationOccurrence> } | null;
  /** Set when a rule change would have moved an OVERDUE occurrence later: the rule
   *  still changes for every future period; this occurrence keeps its date. */
  kept: string | null;
  log: LogDraft;
}

/**
 * An edit re-evaluates the OPEN occurrence, never a done one, and never moves an
 * OVERDUE occurrence later (FOD-4). A weekend-rule change is refused on an overdue
 * occurrence when it would move D later or take the occurrence out of "overdue" —
 * the same no-back-door reading, applied to the one setting that moves D without
 * moving the stored date.
 */
export function planEdit(
  ob: FirmObligation, patch: FirmObligationPatch, all: FirmObligationOccurrence[], ctx: ActContext,
): EditPlan {
  assertObligationPatchKeys(patch);
  assertOneOpen(all);
  const changed = (Object.keys(patch) as (keyof FirmObligationPatch)[])
    .filter((k) => JSON.stringify(patch[k]) !== JSON.stringify(ob[k]));
  const nextOb: FirmObligation = { ...ob, ...patch };
  nextOb.missedPeriods = effectiveMissedPeriods(nextOb);
  validateObligation(nextOb);

  const open = all.find((o) => o.state === 'open') ?? null;
  let occurrence: EditPlan['occurrence'] = null;
  let kept: string | null = null;

  if (open) {
    const before = stateOf(ob, open, ctx.today);
    if (changed.includes('weekendRule') && before === 'overdue') {
      const stateAfter = stateOf(nextOb, open, ctx.today);
      if (stateAfter !== 'overdue' || dueDate(nextOb, open) > dueDate(ob, open)) {
        throw new Error('This occurrence is overdue; changing its weekend rule would move its due date later or take it out of overdue (FOD-4). Mark it done first.');
      }
    }
    // The missed-period override changes how the NEXT occurrence materializes, not
    // this one's date — so only the rule and its precision re-evaluate it.
    const ruleChanged = changed.includes('recurrence') || changed.includes('precision');
    if (ruleChanged) {
      const draft = reevaluateOpen(nextOb, open, all);
      if (draft && (draft.dueOn !== open.dueOn || draft.periodLabel !== open.periodLabel)) {
        const moved = { ...open, dueOn: draft.dueOn };
        if (before === 'overdue' && dueDate(nextOb, moved) > dueDate(ob, open)) {
          kept = `The open occurrence (${open.periodLabel}) is overdue, so it keeps its date; the new rule applies from the next period (FOD-4).`;
        } else {
          occurrence = {
            id: open.id,
            patch: { dueOn: draft.dueOn, periodLabel: draft.periodLabel, syncStatus: 'pending', updatedAt: ctx.nowIso },
          };
        }
      }
    }
    if (!occurrence && (changed.includes('leadDays') || changed.includes('weekendRule'))) {
      // The reminder minutes and the body's due date change: re-push, stored dates untouched.
      occurrence = { id: open.id, patch: { syncStatus: 'pending', updatedAt: ctx.nowIso } };
    }
  }

  const obligationPatch: Partial<FirmObligation> = { ...patch, missedPeriods: nextOb.missedPeriods, updatedAt: ctx.nowIso };
  const trail: ObligationTrail = {
    kind: 'obligation',
    act: 'edited',
    fields: changed,
    reevaluatedOccurrenceId: occurrence && occurrence.patch.dueOn !== undefined ? occurrence.id : null,
  };
  const oldValues: Record<string, unknown> = {};
  const newValues: Record<string, unknown> = {};
  for (const k of changed) { oldValues[k] = ob[k]; newValues[k] = patch[k]; }
  return {
    obligationPatch,
    occurrence,
    kept,
    log: {
      entityType: FIRM_OBLIGATION_ENTITY,
      entityId: ob.id,
      action: 'edited',
      user: ctx.user,
      oldValue: JSON.stringify(oldValues),
      newValue: JSON.stringify({ ...trail, values: newValues }),
      reason: `Edited: ${changed.length ? changed.join(', ') : 'nothing changed'}${kept ? ` — ${kept}` : ''}`,
    },
  };
}

// ---- Retire / Re-activate (FOD-8) ----

export function planRetire(ob: FirmObligation, ctx: ActContext): { obligationPatch: Partial<FirmObligation>; log: LogDraft } {
  if (!ob.active) throw new Error('This obligation is already retired.');
  const trail: ObligationTrail = { kind: 'obligation', act: 'retired' };
  return {
    obligationPatch: { active: false, updatedAt: ctx.nowIso },
    log: {
      entityType: FIRM_OBLIGATION_ENTITY, entityId: ob.id, action: 'edited', user: ctx.user,
      oldValue: 'active', newValue: JSON.stringify(trail),
      // Retire closes nothing: an open occurrence stays lit until done (FOD-8).
      reason: 'Retired — an open occurrence stays until done',
    },
  };
}

export function planReactivate(
  ob: FirmObligation, all: FirmObligationOccurrence[], ctx: ActContext,
): { obligationPatch: Partial<FirmObligation>; occurrence: FirmObligationOccurrence | null; log: LogDraft } {
  if (ob.active) throw new Error('This obligation is already active.');
  assertOneOpen(all);
  const reactivated = { ...ob, active: true };
  validateObligation(reactivated);
  const hasOpen = all.some((o) => o.state === 'open');
  let occurrence: FirmObligationOccurrence | null = null;
  if (!hasOpen) {
    // Re-activation is an activation: the first rule date on or after today (FOM-4).
    const draft = materializeFirst(reactivated, ctx.today, {});
    if (!draft) throw new Error('This obligation has no date yet — set it with Edit… first (FOD-9).');
    occurrence = newOccurrence(ob, draft, ctx);
  }
  const trail: ObligationTrail = { kind: 'obligation', act: 're-activated', openedOccurrenceId: occurrence?.id ?? null };
  return {
    obligationPatch: { active: true, updatedAt: ctx.nowIso },
    occurrence,
    log: {
      entityType: FIRM_OBLIGATION_ENTITY, entityId: ob.id, action: 'edited', user: ctx.user,
      oldValue: 'retired', newValue: JSON.stringify(trail),
      reason: occurrence
        ? `Re-activated; occurrence ${occurrence.periodLabel} opened, rule date ${formatDate(occurrence.dueOn)}`
        : 'Re-activated',
    },
  };
}
