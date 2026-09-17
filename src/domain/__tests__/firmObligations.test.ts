// FIRM OBLIGATIONS — the domain module's invariants.
//
// Authority: docs/specs/firm-obligations-build-slice.md §7 — items 1–10, 14 and 21
// (the slice's §9 item 2), plus the domain halves of items 11–13 (the card, the
// Overdue pin, Later and Inactive), whose surfaces are tested again where they
// render. FOS-1 RULED YES 2026-09-10.
//
// And docs/specs/firm-obligations-fix-slice.md §7 — items 1–3, 6 and the domain half of
// item 7 — with the three of Michael's rulings at the fix build's stops, 2026-09-16,
// that reach the domain: the reminder default ("min(30, lead) everywhere"), Undo with
// no next ("Keep as built; read one flag") and `touched` ("Same as today"). FOS-2
// RULED YES 2026-09-12 (#156). §7 item 1's lighting snapshot is its own file
// (firmObligationsLighting.test.ts).
//
// Every date is a fixture. The weekday facts the weekend rule turns on are ASSERTED
// before anything leans on them (the first describe), so a wrong premise fails
// loudly instead of letting the rule tests prove nothing.

import { describe, it, expect } from 'vitest';
import * as FO from '../firmObligations';
import {
  dayOfWeek, isWeekend, lastBusinessDayBefore, nextBusinessDayAfter,
  materializeFirst, materializeNext, periodLabel, defaultMissedPeriods,
  targetDate, dueDate, lightsOn, stateOf, daysOverdue, strongLine,
  cardItems, cardCounts, registerView,
  planActivation, planDone, planNotApplicable, planUndo, canUndo, planOverride, planEdit, planRetire, planReactivate,
  defaultReminderDays, reminderOn, outlookReminderIsOn, nextOf, latestClosed, planActivateFromInactive,
  reactivationProblem, queuedDeletes, settledDeletes, DEFAULT_OUTLOOK_REMINDER_DAYS, PENDING_DELETE_ATTENTION_ATTEMPTS,
  WEEKEND_RULES,
  type ActContext, type FirmObligation, type FirmObligationCreate, type FirmObligationOccurrence,
  type FirmObligationPatch, type LogDraft, type PendingOutlookDelete, type RecurrenceRule, type WeekendRule,
} from '../firmObligations';
import type { ReviewLogEntry } from '../billing';
import { activationFromTemplate } from '../firmObligationActivation';
import { FIRM_OBLIGATION_TEMPLATES } from '../firmObligationTemplates';

// ------------------------------------------------------------------ fixtures

const STAMP = '2026-01-01T00:00:00.000Z';

function obWith(over: Partial<FirmObligation> = {}): FirmObligation {
  return {
    id: 'ob', name: 'Fixture obligation', category: 'custom', ownerScope: 'firm',
    recurrence: { kind: 'fixed-annual', month: 1, day: 30 }, precision: 'day', missedPeriods: 'serial',
    conditionalPerPeriod: false, weekendRule: 'unknown', leadDays: 30, weight: 'hard',
    outlookReminderDays: 30, pendingOutlookDeletes: [], active: true,
    createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

function occAt(dueOn: string, over: Partial<FirmObligationOccurrence> = {}): FirmObligationOccurrence {
  return {
    id: `o-${dueOn}`, obligationId: 'ob', periodLabel: 'fixture', dueOn, state: 'open', syncStatus: 'pending',
    touched: false, createdAt: STAMP, updatedAt: STAMP, ...over,
  };
}

function activation(rule: RecurrenceRule, over: Partial<FirmObligationCreate> = {}): FirmObligationCreate {
  return {
    name: 'Fixture obligation', category: 'custom', ownerScope: 'firm', recurrence: rule, precision: 'day',
    missedPeriods: defaultMissedPeriods(rule.kind), conditionalPerPeriod: false, weekendRule: 'unknown',
    leadDays: 30, weight: 'hard', active: true, ...over,
  };
}

/** A tiny store that APPLIES the plans exactly as an adapter does — so sequences
 *  (Done, then Undo, then Re-activate) are exercised through the same plans the
 *  adapters apply, not through a re-implementation. */
function world(start: string) {
  let seq = 0;
  let clock = 0;
  let today = start;
  const obligations: FirmObligation[] = [];
  const occurrences: FirmObligationOccurrence[] = [];
  const log: ReviewLogEntry[] = [];
  // Each act reads the clock once, and the clock advances one millisecond per act, so
  // created-at order is real: canUndo's created-at check and latestClosed read it
  // (#156 A3). Every sequence here moves `today` forward only, so the order holds
  // across setToday too.
  const ctx = (): ActContext => ({
    today, nowIso: new Date(Date.parse(`${today}T12:00:00.000Z`) + ++clock).toISOString(), newId: () => `id-${++seq}`, user: 'test',
  });
  const write = (d: LogDraft, c: ActContext) => { log.push({ ...d, id: `log-${log.length + 1}`, timestamp: c.nowIso }); };
  const ob = (id: string) => obligations.find((o) => o.id === id)!;
  const occ = (id: string) => occurrences.find((o) => o.id === id)!;
  const occsOf = (obId: string) => occurrences.filter((o) => o.obligationId === obId);
  const logFor = (obId: string) => {
    const ids = new Set([obId, ...occsOf(obId).map((o) => o.id)]);
    return log.filter((l) => ids.has(l.entityId));
  };
  const applyClose = (p: ReturnType<typeof planDone>, c: ActContext) => {
    const o = occ(p.occurrenceId);
    Object.assign(o, p.occurrencePatch);
    if (p.next) occurrences.push(p.next);
    if (p.obligationPatch) Object.assign(ob(o.obligationId), p.obligationPatch);
    write(p.log, c);
  };
  return {
    setToday: (t: string) => { today = t; },
    getToday: () => today,
    obligations, occurrences, log, ob, occ, occsOf, logFor,
    openOf: (obId: string) => occsOf(obId).filter((o) => o.state === 'open'),
    activate(input: FirmObligationCreate) {
      const c = ctx();
      const p = planActivation(input, c);
      obligations.push(p.obligation);
      if (p.occurrence) occurrences.push(p.occurrence);
      write(p.log, c);
      return p;
    },
    done(occId: string, input: { doneOn?: string; doneNote?: string; filedAt?: string } = {}) {
      const c = ctx();
      const o = occ(occId);
      const p = planDone(ob(o.obligationId), o, occsOf(o.obligationId), input, c);
      applyClose(p, c);
      return p;
    },
    na(occId: string, input: Parameters<typeof planNotApplicable>[3]) {
      const c = ctx();
      const o = occ(occId);
      const p = planNotApplicable(ob(o.obligationId), o, occsOf(o.obligationId), input, c);
      applyClose(p, c);
      return p;
    },
    canUndo(occId: string) {
      const o = occ(occId);
      return canUndo(ob(o.obligationId), o, occsOf(o.obligationId), logFor(o.obligationId));
    },
    undo(occId: string) {
      const c = ctx();
      const o = occ(occId);
      const obId = o.obligationId;
      const p = planUndo(ob(obId), o, occsOf(obId), logFor(obId), c);
      Object.assign(o, p.reopenPatch);
      if (p.removeOccurrence) occurrences.splice(occurrences.findIndex((x) => x.id === p.removeOccurrence!.id), 1);
      if (p.obligationPatch) Object.assign(ob(obId), p.obligationPatch);
      write(p.log, c);
      return p;
    },
    override(occId: string, date: string) {
      const c = ctx();
      const o = occ(occId);
      const p = planOverride(ob(o.obligationId), o, date, c);
      Object.assign(o, p.patch);
      write(p.log, c);
      return p;
    },
    edit(obId: string, patch: FirmObligationPatch) {
      const c = ctx();
      const p = planEdit(ob(obId), patch, occsOf(obId), c, logFor(obId));
      Object.assign(ob(obId), p.obligationPatch);
      if (p.occurrence) Object.assign(occ(p.occurrence.id), p.occurrence.patch);
      write(p.log, c);
      return p;
    },
    retire(obId: string) {
      const c = ctx();
      const p = planRetire(ob(obId), c);
      Object.assign(ob(obId), p.obligationPatch);
      write(p.log, c);
    },
    reactivate(obId: string, inputs: { lastPeriodCompleted?: string } = {}) {
      const c = ctx();
      const p = planReactivate(ob(obId), occsOf(obId), c, inputs);
      Object.assign(ob(obId), p.obligationPatch);
      if (p.occurrence) occurrences.push(p.occurrence);
      write(p.log, c);
      return p;
    },
    /** #156 A7: the Inactive row's "Activate…", one act, applied as an adapter does. */
    activateFromInactive(obId: string, patch: FirmObligationPatch, inputs: { lastPeriodCompleted?: string } = {}) {
      const c = ctx();
      const p = planActivateFromInactive(ob(obId), patch, occsOf(obId), c, logFor(obId), inputs);
      Object.assign(ob(obId), p.obligationPatch);
      if (p.updateOccurrence) Object.assign(occ(p.updateOccurrence.id), p.updateOccurrence.patch);
      if (p.openOccurrence) occurrences.push(p.openOccurrence);
      write(p.log, c);
      return p;
    },
  };
}

const QUARTERLY_941: RecurrenceRule = {
  kind: 'fixed-quarterly', dates: [{ month: 4, day: 30 }, { month: 7, day: 31 }, { month: 10, day: 31 }, { month: 1, day: 31 }],
};

// ------------------------------------------------------------------ premises

describe('premises — the weekday facts the fixtures turn on', () => {
  it('reads the calendar the way the fixtures assume', () => {
    expect(dayOfWeek('2027-01-29')).toBe(5); // Fri
    expect(dayOfWeek('2027-01-30')).toBe(6); // Sat
    expect(dayOfWeek('2027-01-31')).toBe(0); // Sun
    expect(dayOfWeek('2027-02-01')).toBe(1); // Mon
    expect(dayOfWeek('2025-10-15')).toBe(3); // Wed
    expect(dayOfWeek('2026-10-15')).toBe(4); // Thu
    expect(dayOfWeek('2026-09-10')).toBe(4); // Thu
    expect(dayOfWeek('2026-11-01')).toBe(0); // Sun
  });
});

describe('weekends — and only weekends (FOM-12(b))', () => {
  it('finds the business day either side of a weekend', () => {
    expect(isWeekend('2027-01-30')).toBe(true);
    expect(isWeekend('2027-01-29')).toBe(false);
    expect(lastBusinessDayBefore('2027-01-30')).toBe('2027-01-29');
    expect(lastBusinessDayBefore('2027-01-31')).toBe('2027-01-29');
    expect(nextBusinessDayAfter('2027-01-30')).toBe('2027-02-01');
    expect(nextBusinessDayAfter('2027-01-29')).toBe('2027-02-01');
  });

  it('computes NO holiday — Christmas Day is a business day to this module', () => {
    // 2026-12-25 is a Friday. A holiday table would skip it; this module has none.
    expect(nextBusinessDayAfter('2026-12-24')).toBe('2026-12-25');
    const onChristmas = occAt('2026-12-25');
    expect(targetDate(onChristmas)).toBe('2026-12-25');
    expect(dueDate(obWith({ weekendRule: 'rolls-forward' }), onChristmas)).toBe('2026-12-25');
  });

  it('ships no holiday list — the only export naming a holiday is the FOD-24 line', () => {
    expect(Object.keys(FO).filter((k) => /holiday/i.test(k))).toEqual(['HOLIDAY_LINE']);
  });
});

// ------------------------------------------ §7 item 5 — the weekend rule (§2.3)

describe('§7 item 5 — the weekend rule, R = Sat Jan 30 2027, a 30-day lead', () => {
  const R = '2027-01-30';
  const o = occAt(R);

  it('puts the target on Fri Jan 29 and lights on Dec 30 2026 under all three settings', () => {
    for (const weekendRule of ['rolls-forward', 'no-roll', 'unknown'] as WeekendRule[]) {
      const ob = obWith({ weekendRule });
      expect(targetDate(o)).toBe('2027-01-29');
      expect(lightsOn(ob, o)).toBe('2026-12-30');
      expect(stateOf(ob, o, '2026-12-29')).toBe('pending');
      expect(stateOf(ob, o, '2026-12-30')).toBe('lit');
      expect(stateOf(ob, o, '2027-01-29')).toBe('lit');
    }
  });

  it('rolls-forward: due Mon Feb 1; target-passed Sat–Mon; overdue Tue Feb 2 with count 1', () => {
    const ob = obWith({ weekendRule: 'rolls-forward' });
    expect(dueDate(ob, o)).toBe('2027-02-01');
    for (const d of ['2027-01-30', '2027-01-31', '2027-02-01']) expect(stateOf(ob, o, d)).toBe('target-passed');
    expect(stateOf(ob, o, '2027-02-02')).toBe('overdue');
    expect(daysOverdue(ob, o, '2027-02-02')).toBe(1);
  });

  it('no-roll: due Sat Jan 30; Sun Jan 31 is overdue with count 1', () => {
    const ob = obWith({ weekendRule: 'no-roll' });
    expect(dueDate(ob, o)).toBe('2027-01-30');
    expect(stateOf(ob, o, '2027-01-30')).toBe('target-passed');
    expect(stateOf(ob, o, '2027-01-31')).toBe('overdue');
    expect(daysOverdue(ob, o, '2027-01-31')).toBe(1);
  });

  it('unknown: past-date-unknown from Sat Jan 30 — never "overdue", never a count, however late', () => {
    const ob = obWith({ weekendRule: 'unknown' });
    for (const d of ['2027-01-30', '2027-01-31', '2027-02-01', '2027-02-02', '2027-12-31']) {
      expect(stateOf(ob, o, d)).toBe('past-date-unknown');
      expect(daysOverdue(ob, o, d)).toBeNull();
      const line = strongLine(ob, o, d).text;
      expect(line).not.toMatch(/overdue/i);
      expect(line).not.toMatch(/\d+\s+days?/);
    }
  });

  it('a weekday R: all three settings agree and T = D = R', () => {
    const weekday = occAt('2027-01-29');
    for (const weekendRule of ['rolls-forward', 'no-roll', 'unknown'] as WeekendRule[]) {
      const ob = obWith({ weekendRule });
      expect(targetDate(weekday)).toBe('2027-01-29');
      expect(dueDate(ob, weekday)).toBe('2027-01-29');
      expect(stateOf(ob, weekday, '2027-01-29')).toBe('lit');
      expect(stateOf(ob, weekday, '2027-01-30')).toBe('overdue');
      expect(daysOverdue(ob, weekday, '2027-01-30')).toBe(1);
    }
  });

  it('pinned for R = Sun Jan 31 2027 too', () => {
    const sun = occAt('2027-01-31');
    expect(targetDate(sun)).toBe('2027-01-29');
    expect(dueDate(obWith({ weekendRule: 'rolls-forward' }), sun)).toBe('2027-02-01');
    const noRoll = obWith({ weekendRule: 'no-roll' });
    expect(dueDate(noRoll, sun)).toBe('2027-01-31');
    expect(stateOf(noRoll, sun, '2027-02-01')).toBe('overdue');
    expect(daysOverdue(noRoll, sun, '2027-02-01')).toBe(1);
  });
});

describe('FOD-25 — the strong line (PROVISIONAL text, pinned so a change is deliberate)', () => {
  const R = occAt('2027-01-30');

  it('before T: the three weekend shapes, and a weekday', () => {
    expect(strongLine(obWith({ weekendRule: 'rolls-forward' }), R, '2027-01-10').text)
      .toBe('Due Mon Feb 1 (rolled from Sat Jan 30) · aim for Fri Jan 29');
    expect(strongLine(obWith({ weekendRule: 'no-roll' }), R, '2027-01-10').text)
      .toBe('Due Sat Jan 30 · aim for Fri Jan 29');
    expect(strongLine(obWith({ weekendRule: 'unknown' }), R, '2027-01-10').text)
      .toBe('Rule date Sat Jan 30 — a next-business-day rule may apply; not computed · aim for Fri Jan 29');
    expect(strongLine(obWith(), occAt('2027-01-29'), '2027-01-10').text).toBe('Due Fri Jan 29');
  });

  it('after T and after D', () => {
    const rf = obWith({ weekendRule: 'rolls-forward' });
    expect(strongLine(rf, R, '2027-01-31').text).toBe('target passed — due Mon Feb 1');
    expect(strongLine(rf, R, '2027-02-02').text).toBe('overdue · 1 day');
    expect(strongLine(rf, R, '2027-02-03').text).toBe('overdue · 2 days');
    expect(strongLine(obWith({ weekendRule: 'unknown' }), R, '2027-01-31').text)
      .toBe('past its date — a next-business-day rule may apply; not computed');
  });
});

// ------------------------------------------------------ §7 item 6 — FOM-6

describe('§7 item 6 — FOM-6, month precision lights at the earlier of the 1st and T − lead', () => {
  const monthRow = (leadDays: number) => obWith({
    recurrence: { kind: 'anniversary', anchorDate: '2026-06-10' }, precision: 'month', leadDays,
  });

  it('the rule date of a month-precision period is the last day of the month (FOD-31)', () => {
    expect(materializeFirst(monthRow(45), '2026-01-01')!.dueOn).toBe('2026-06-30');
  });

  it('a 45-day lead lights before the 1st; a 5-day lead lights on the 1st', () => {
    const o = occAt('2026-06-30'); // a Tuesday, so T = R
    expect(lightsOn(monthRow(45), o)).toBe('2026-05-16');
    expect(lightsOn(monthRow(5), o)).toBe('2026-06-01');
  });

  it('once the real date is known (dueOnOverride), the occurrence lights by its lead alone', () => {
    expect(lightsOn(monthRow(5), occAt('2026-06-30', { dueOnOverride: '2026-06-17' }))).toBe('2026-06-12');
  });
});

// ------------------------------------------------ §7 item 14 — periodLabel (FOM-7)

describe('§7 item 14 — periodLabel for all six kinds', () => {
  it('annual, quarterly in the rule\'s own order, monthly, membership year', () => {
    expect(periodLabel(obWith({ recurrence: { kind: 'fixed-annual', month: 10, day: 15 } }), '2026-10-15')).toBe('2026');
    const q = obWith({ recurrence: QUARTERLY_941 });
    expect(periodLabel(q, '2026-04-30')).toBe('2026 Q1');
    expect(periodLabel(q, '2026-10-31')).toBe('2026 Q3');
    // Jan 31 closes the PREVIOUS year's fourth quarter.
    expect(periodLabel(q, '2027-01-31')).toBe('2026 Q4');
    expect(periodLabel(obWith({ recurrence: { kind: 'fixed-monthly', day: 5 } }), '2026-10-05')).toBe('2026-10');
    expect(periodLabel(obWith({ recurrence: { kind: 'anniversary', anchorDate: '2020-07-01' } }), '2026-07-01')).toBe('2026–27');
    expect(periodLabel(obWith({ recurrence: { kind: 'anniversary', anchorDate: '2019-05-01', everyYears: 4 } }), '2027-05-01')).toBe('2027–2031');
  });

  it('interval: "by <due date>"; one-time: the due year', () => {
    const interval = activation({ kind: 'interval-from-completion', days: 91 });
    expect(materializeFirst(interval, '2026-09-10')!.periodLabel).toBe('by Thu Sep 10, 2026');
    expect(materializeFirst(activation({ kind: 'one-time', dueOn: '2027-03-01' }), '2026-09-10')!.periodLabel).toBe('2027');
  });
});

// --------------------------------------------------- §7 item 4 — FOM-4 (activation)

describe('§7 item 4 — FOM-4, the first occurrence at activation', () => {
  const annual = activation({ kind: 'fixed-annual', month: 10, day: 15 });

  it('a serial annual with "last period completed" 2024, activated 2026-09-10, opens 2025 — overdue', () => {
    const first = materializeFirst(annual, '2026-09-10', { lastPeriodCompleted: '2024-10-15' })!;
    expect(first).toEqual({ dueOn: '2025-10-15', periodLabel: '2025' });
    expect(stateOf(obWith(), occAt(first.dueOn), '2026-09-10')).toBe('overdue');
  });

  it('without it, the first rule date on or after today', () => {
    expect(materializeFirst(annual, '2026-09-10')!.dueOn).toBe('2026-10-15');
  });

  it('the fixed kinds follow the same first-occurrence rule, today inclusive', () => {
    expect(materializeFirst(activation(QUARTERLY_941), '2026-09-10')!.dueOn).toBe('2026-10-31');
    expect(materializeFirst(activation({ kind: 'fixed-monthly', day: 5 }), '2026-09-10')!.dueOn).toBe('2026-10-05');
    expect(materializeFirst(activation({ kind: 'fixed-monthly', day: 10 }), '2026-09-10')!.dueOn).toBe('2026-09-10');
    expect(materializeFirst(activation({ kind: 'anniversary', anchorDate: '2019-05-01', everyYears: 4 }), '2026-09-10')!.dueOn).toBe('2027-05-01');
  });

  it('"last period completed" exists only on a serial row — a cadence ignores it and activation drops it', () => {
    const monthly = activation({ kind: 'fixed-monthly', day: 5 }, { lastPeriodCompleted: '2025-01-05' });
    expect(materializeFirst(monthly, '2026-09-10', { lastPeriodCompleted: '2025-01-05' })!.dueOn).toBe('2026-10-05');
    const plan = planActivation(monthly, { today: '2026-09-10', nowIso: STAMP, newId: () => 'x', user: 't' });
    expect(plan.obligation.lastPeriodCompleted).toBeUndefined();
  });

  it('FOD-16: an interval row is due NOW unless a last-done date is entered', () => {
    const interval = activation({ kind: 'interval-from-completion', days: 91 });
    expect(materializeFirst(interval, '2026-09-10')!.dueOn).toBe('2026-09-10');
    expect(materializeFirst(interval, '2026-09-10', { lastDone: '2026-06-01' })!.dueOn).toBe('2026-08-31');
  });

  it('an undated one-time cannot be activated — the software never guesses a date (FOD-9)', () => {
    const undated = activation({ kind: 'one-time' });
    expect(materializeFirst(undated, '2026-09-10')).toBeNull();
    expect(() => planActivation(undated, { today: '2026-09-10', nowIso: STAMP, newId: () => 'x', user: 't' })).toThrow();
    // …but it can be ADDED inactive, undated.
    const inactive = planActivation({ ...undated, active: false }, { today: '2026-09-10', nowIso: STAMP, newId: () => 'x', user: 't' });
    expect(inactive.occurrence).toBeNull();
  });
});

// ------------------------------------------------ §7 item 2 — serial (DECISION 2)

describe('§7 item 2 — serial: a late filing materializes the next period already overdue', () => {
  it('the 2025 report done in 2027 opens 2026 overdue; Done again opens 2027; nothing skipped', () => {
    const w = world('2025-09-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }));
    expect(a.occurrence).toMatchObject({ dueOn: '2025-10-15', periodLabel: '2025' });

    w.setToday('2027-03-01');
    const d1 = w.done(a.occurrence!.id);
    expect(d1.next).toMatchObject({ dueOn: '2026-10-15', periodLabel: '2026' });
    expect(stateOf(w.ob(a.obligation.id), d1.next!, '2027-03-01')).toBe('overdue');
    expect(w.openOf(a.obligation.id)).toHaveLength(1);

    const d2 = w.done(d1.next!.id);
    expect(d2.next).toMatchObject({ dueOn: '2027-10-15', periodLabel: '2027' });
    expect(w.occsOf(a.obligation.id).map((o) => o.periodLabel)).toEqual(['2025', '2026', '2027']);
  });
});

// --------------------------------------------- §7 item 3 — collapse (FOM-1, both limbs)

describe('§7 item 3 — collapse, both FOM-1 limbs', () => {
  const monthly = obWith({ recurrence: { kind: 'fixed-monthly', day: 5 }, missedPeriods: 'collapse' });

  it('a Sept 5 monthly done Oct 2 → Nov 5; done Sept 3 → Oct 5', () => {
    expect(materializeNext(monthly, { dueOn: '2026-09-05' }, '2026-10-02')!.dueOn).toBe('2026-11-05');
    expect(materializeNext(monthly, { dueOn: '2026-09-05' }, '2026-09-03')!.dueOn).toBe('2026-10-05');
  });

  it('never re-materializes its own date, even completed in the month before', () => {
    expect(materializeNext(monthly, { dueOn: '2026-09-05' }, '2026-08-30')!.dueOn).toBe('2026-10-05');
  });

  it('an annual Oct 15 row under collapse done Sept 20 → Oct 15 of the FOLLOWING year', () => {
    const annual = obWith({ recurrence: { kind: 'fixed-annual', month: 10, day: 15 }, missedPeriods: 'collapse' });
    expect(materializeNext(annual, { dueOn: '2026-10-15' }, '2026-09-20')!.dueOn).toBe('2027-10-15');
    expect(materializeNext(annual, { dueOn: '2026-10-15' }, '2026-11-20')!.dueOn).toBe('2027-10-15');
  });

  it('interval-from-completion: completion + 91 days, collapse by construction whatever is stored', () => {
    const interval = obWith({ recurrence: { kind: 'interval-from-completion', days: 91 }, missedPeriods: 'serial' });
    expect(materializeNext(interval, { dueOn: '2026-06-01' }, '2026-06-10')!.dueOn).toBe('2026-09-09');
  });
});

// -------------------------------------------- §7 item 1 — the one-open invariant

describe('§7 item 1 — exactly one open occurrence per obligation', () => {
  it('at creation, after Done, after Not-applicable, after Undo, after Retire', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 20 }, { conditionalPerPeriod: true }));
    const id = a.obligation.id;
    expect(w.openOf(id)).toHaveLength(1);

    const d = w.done(a.occurrence!.id);
    expect(w.openOf(id)).toHaveLength(1);

    const n = w.na(d.next!.id, { reason: 'condition-not-met' });
    expect(w.openOf(id)).toHaveLength(1);

    w.undo(d.next!.id);
    expect(w.openOf(id)).toHaveLength(1);
    expect(w.occsOf(id).some((o) => o.id === n.next!.id)).toBe(false);

    w.retire(id);
    expect(w.openOf(id)).toHaveLength(1);
  });

  it('refuses to act on an obligation whose invariant is already broken', () => {
    const ob = obWith();
    const two = [occAt('2027-01-29', { id: 'a' }), occAt('2028-01-29', { id: 'b' })];
    expect(() => planDone(ob, two[0], two, {}, { today: '2026-09-10', nowIso: STAMP, newId: () => 'x', user: 't' })).toThrow(/one-open/);
  });
});

// ------------------------------------------------------------ §7 item 7 — FOD-4

describe('§7 item 7 — FOD-4: edits re-evaluate the open occurrence, never a done one, never later when overdue', () => {
  it('an override later than the current D on an overdue occurrence is REFUSED; earlier is allowed', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    const o = a.occurrence!;
    expect(stateOf(a.obligation, o, '2026-09-10')).toBe('overdue');
    expect(() => w.override(o.id, '2026-01-01')).toThrow(/never be moved later/);
    w.override(o.id, '2025-10-01');
    expect(w.occ(o.id).dueOnOverride).toBe('2025-10-01');
  });

  it('refuses an override that would take an overdue occurrence out of "overdue" even if earlier', () => {
    // Overdue on a weekday under `unknown`; an EARLIER Saturday would make it
    // past-date-unknown — no "overdue" label — which is a back door, so refused.
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    expect(() => w.override(a.occurrence!.id, '2025-10-11')).toThrow(/never be moved later/);
  });

  it('a not-overdue occurrence takes a later override', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    w.override(a.occurrence!.id, '2026-12-15');
    expect(w.occ(a.occurrence!.id).dueOnOverride).toBe('2026-12-15');
  });

  it('a rule edit re-evaluates the open occurrence and leaves a done one untouched', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 1 }));
    w.setToday('2026-10-02');
    const d = w.done(a.occurrence!.id);
    expect(d.next!.dueOn).toBe('2027-10-01');
    w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 10, day: 20 } });
    expect(w.occ(d.next!.id).dueOn).toBe('2027-10-20');
    expect(w.occ(a.occurrence!.id).dueOn).toBe('2026-10-01');
  });

  it('a rule edit that would move an OVERDUE occurrence later keeps its date and says so', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    const p = w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 11, day: 16 } });
    expect(p.kept).toMatch(/keeps its date/);
    expect(w.occ(a.occurrence!.id).dueOn).toBe('2025-10-15');
    expect(w.ob(a.obligation.id).recurrence).toEqual({ kind: 'fixed-annual', month: 11, day: 16 });
  });

  // REPLACED by the fix slice: under #156 A1 the Outlook reminder keys off its own
  // days, not the lead, so a lead edit no longer changes anything the event carries.
  it('a lead edit moves no stored date and queues no Outlook re-push — the lead is the register\'s window only (#156 A1)', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    w.occ(a.occurrence!.id).syncStatus = 'synced';
    const p = w.edit(a.obligation.id, { leadDays: 45 });
    expect(p.occurrence).toBeNull();
    expect(w.occ(a.occurrence!.id)).toMatchObject({ dueOn: '2026-12-01', syncStatus: 'synced', touched: false });
    expect(w.ob(a.obligation.id).leadDays).toBe(45);
  });

  it('a weekend-rule edit on an overdue occurrence is refused when it would un-overdue it', () => {
    const w = world('2026-12-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 1, day: 30 }, { weekendRule: 'no-roll' }));
    expect(a.occurrence!.dueOn).toBe('2027-01-30');
    w.setToday('2027-01-31');
    expect(stateOf(w.ob(a.obligation.id), w.occ(a.occurrence!.id), '2027-01-31')).toBe('overdue');
    expect(() => w.edit(a.obligation.id, { weekendRule: 'rolls-forward' })).toThrow(/FOD-4/);
    expect(() => w.edit(a.obligation.id, { weekendRule: 'unknown' })).toThrow(/FOD-4/);
  });

  it('a weekend-rule edit on a not-overdue occurrence is his to make', () => {
    const w = world('2026-12-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 1, day: 30 }));
    w.edit(a.obligation.id, { weekendRule: 'rolls-forward' });
    expect(w.ob(a.obligation.id).weekendRule).toBe('rolls-forward');
  });

  it('refuses a patch key outside the editable set', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    expect(() => w.edit(a.obligation.id, { active: false } as unknown as FirmObligationPatch)).toThrow(/unsupported patch key/);
  });
});

// ---------------------------------------------------- §7 item 8 — Undo (FOD-7, FOM-11)

describe('§7 item 8 — Undo, allowed only while the materialized next is untouched', () => {
  const monthly = () => activation({ kind: 'fixed-monthly', day: 20 });

  it('reopens, removes the untouched next, queues the Outlook restore, writes exactly one "undone"', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const d = w.done(a.occurrence!.id, { doneNote: 'reconciled', filedAt: 'OneDrive/Firm/2026-09' });
    expect(w.canUndo(a.occurrence!.id)).toEqual({ ok: true });
    const before = w.log.length;
    const u = w.undo(a.occurrence!.id);
    expect(u.removeOccurrence!.id).toBe(d.next!.id);
    expect(w.occ(a.occurrence!.id)).toMatchObject({ state: 'open', syncStatus: 'pending' });
    expect(w.occ(a.occurrence!.id).doneOn).toBeUndefined();
    expect(w.occ(a.occurrence!.id).doneNote).toBeUndefined();
    expect(w.occsOf(a.obligation.id).some((o) => o.id === d.next!.id)).toBe(false);
    expect(w.log.length).toBe(before + 1);
    expect(w.log.at(-1)!.action).toBe('undone');
  });

  it('is refused once the next has been edited', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const d = w.done(a.occurrence!.id);
    w.override(d.next!.id, '2026-10-19');
    expect(w.canUndo(a.occurrence!.id).ok).toBe(false);
    expect(() => w.undo(a.occurrence!.id)).toThrow(/FOD-7/);
  });

  it('is refused once the next has been done', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const d = w.done(a.occurrence!.id);
    w.done(d.next!.id);
    expect(w.canUndo(a.occurrence!.id).ok).toBe(false);
    expect(w.canUndo(d.next!.id).ok).toBe(true);
  });

  it('is refused once a re-activation has opened another', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    w.retire(a.obligation.id);
    const d = w.done(a.occurrence!.id);
    expect(d.next).toBeNull();
    expect(w.canUndo(a.occurrence!.id).ok).toBe(true);
    w.reactivate(a.obligation.id);
    expect(w.openOf(a.obligation.id)).toHaveLength(1);
    expect(w.canUndo(a.occurrence!.id).ok).toBe(false);
  });

  it('is refused once a rule edit has re-evaluated the next', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    w.done(a.occurrence!.id);
    w.edit(a.obligation.id, { recurrence: { kind: 'fixed-monthly', day: 25 } });
    expect(w.canUndo(a.occurrence!.id).ok).toBe(false);
  });

  it('survives an edit that touches no occurrence (notes, weight)', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    w.done(a.occurrence!.id);
    w.edit(a.obligation.id, { notes: 'portal login in the vault', weight: 'routine' });
    expect(w.canUndo(a.occurrence!.id).ok).toBe(true);
  });

  it('a one-time Done retires the obligation (FOD-32); its Undo re-activates it', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
    const d = w.done(a.occurrence!.id);
    expect(d.next).toBeNull();
    expect(w.ob(a.obligation.id).active).toBe(false);
    expect(d.log.reason).toMatch(/retires itself/);
    w.undo(a.occurrence!.id);
    expect(w.ob(a.obligation.id).active).toBe(true);
    expect(w.openOf(a.obligation.id)).toHaveLength(1);
  });

  it('refuses an occurrence with no close record (history that predates the module)', () => {
    const ob = obWith();
    const doneRow = occAt('2026-01-30', { state: 'done', doneOn: '2026-01-29', outcome: 'completed' });
    expect(canUndo(ob, doneRow, [doneRow], []).ok).toBe(false);
  });
});

// ---------------------------------------------- §7 item 9 — Not applicable (FOD-18)

describe('§7 item 9 — Not applicable', () => {
  it('is refused on a non-conditional row', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }));
    expect(() => w.na(a.occurrence!.id, { reason: 'condition-not-met' })).toThrow(/FOD-18/);
  });

  it('is refused without a reason', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { conditionalPerPeriod: true }));
    expect(() => w.na(a.occurrence!.id, {})).toThrow(/reason is required/);
  });

  it('with a reason on a conditional row: closes the period and materializes the next', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation(QUARTERLY_941, { conditionalPerPeriod: true }));
    const n = w.na(a.occurrence!.id, { reason: 'performed-elsewhere', note: 'the payroll service filed it' });
    expect(w.occ(a.occurrence!.id)).toMatchObject({
      state: 'done', outcome: 'not-applicable', outcomeReason: 'performed-elsewhere', doneOn: '2026-09-10',
    });
    expect(n.next).toMatchObject({ dueOn: '2027-01-31', periodLabel: '2026 Q4' });
    expect(n.log.action).toBe('not-applicable');
  });
});

// ------------------------------------------------------ §7 item 10 — Retire (FOD-8)

describe('§7 item 10 — Retire closes nothing', () => {
  it('an open occurrence stays lit, stays on the card if hard, and materializes no next when done', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 15 }, { leadDays: 10, weight: 'hard' }));
    expect(a.occurrence!.dueOn).toBe('2026-09-15');
    w.retire(a.obligation.id);
    expect(w.openOf(a.obligation.id)).toHaveLength(1);
    expect(stateOf(w.ob(a.obligation.id), w.occ(a.occurrence!.id), '2026-09-10')).toBe('lit');
    expect(cardItems(w.obligations, w.occurrences, '2026-09-10').map((i) => i.occurrence.id)).toEqual([a.occurrence!.id]);
    const d = w.done(a.occurrence!.id);
    expect(d.next).toBeNull();
    expect(w.openOf(a.obligation.id)).toHaveLength(0);
    expect(w.ob(a.obligation.id).active).toBe(false);
  });

  it('refuses to retire twice and to re-activate an active obligation', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 15 }));
    expect(() => w.reactivate(a.obligation.id)).toThrow(/already active/);
    w.retire(a.obligation.id);
    expect(() => w.retire(a.obligation.id)).toThrow(/already retired/);
  });
});

describe('the done date', () => {
  it('cannot be in the future — an interval row would otherwise move its next date later on paper', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'interval-from-completion', days: 91 }));
    expect(() => w.done(a.occurrence!.id, { doneOn: '2026-09-11' })).toThrow(/future/);
  });

  it('an early completion of a not-yet-lit occurrence is allowed (FOD-15)', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'anniversary', anchorDate: '2027-03-01' }, { leadDays: 30 }));
    expect(stateOf(a.obligation, a.occurrence!, '2026-09-10')).toBe('pending');
    const d = w.done(a.occurrence!.id);
    expect(d.next!.dueOn).toBe('2028-03-01');
  });
});

// ----------------------------------------------------- §7 item 11 — the card (FOM-13)

describe('§7 item 11 — the card, at the domain level', () => {
  const today = '2026-09-09'; // Wed; +9 days = Fri Sep 18
  const hard = (id: string, over: Partial<FirmObligation> = {}) => obWith({ id, weight: 'hard', ...over });
  const at = (obligationId: string, dueOn: string) => occAt(dueOn, { id: `occ-${obligationId}`, obligationId });

  it('a hard row with a 5-day lead due in 9 days is NOT on the card; lit and due in 9 days IS', () => {
    expect(cardItems([hard('a', { leadDays: 5 })], [at('a', '2026-09-18')], today)).toEqual([]);
    expect(cardItems([hard('b', { leadDays: 10 })], [at('b', '2026-09-18')], today)).toHaveLength(1);
  });

  it('a hard row overdue 40 days IS on it; a routine row overdue 40 days is NOT', () => {
    expect(daysOverdue(hard('c'), at('c', '2026-07-31'), today)).toBe(40);
    expect(cardItems([hard('c')], [at('c', '2026-07-31')], today)).toHaveLength(1);
    expect(cardItems([obWith({ id: 'd', weight: 'routine' })], [at('d', '2026-07-31')], today)).toEqual([]);
  });

  it('an item past its target on a weekend (target passed, or past its date) is still lit and stays on', () => {
    const rf = hard('e', { weekendRule: 'rolls-forward' });
    const unk = hard('f', { weekendRule: 'unknown' });
    const items = cardItems([rf, unk], [at('e', '2027-01-30'), at('f', '2027-01-30')], '2027-01-31');
    expect(items.map((i) => i.state).sort()).toEqual(['past-date-unknown', 'target-passed']);
  });

  it('Fixture B — nothing overdue and no hard item lit within 14 days — renders nothing', () => {
    const lit20 = hard('g', { leadDays: 30 });
    const routineLit = obWith({ id: 'h', weight: 'routine', leadDays: 30 });
    expect(cardItems([lit20, routineLit], [at('g', '2026-09-29'), at('h', '2026-09-14')], today)).toEqual([]);
  });

  it('orders by target date and counts due vs overdue', () => {
    const obs = [hard('i', { leadDays: 10 }), hard('j'), hard('k', { leadDays: 14 })];
    const occs = [at('i', '2026-09-18'), at('j', '2026-07-31'), at('k', '2026-09-11')];
    const items = cardItems(obs, occs, today);
    expect(items.map((i) => i.obligation.id)).toEqual(['j', 'k', 'i']);
    expect(cardCounts(items)).toEqual({ due: 2, overdue: 1 });
  });
});

// -------------------------------------- §7 items 12 and 13 — the register (FOM-9, FOM-3, FOM-5)

describe('§7 item 12 — the Overdue pin: hard first, then most overdue', () => {
  it('hard 27 days overdue sits above routine 31; within hard, 352 above 27', () => {
    const today = '2026-09-10';
    const obs = [obWith({ id: 'h27' }), obWith({ id: 'r31', weight: 'routine' }), obWith({ id: 'h352' })];
    const occs = [
      occAt('2026-08-14', { id: 'o1', obligationId: 'h27' }),
      occAt('2026-08-10', { id: 'o2', obligationId: 'r31' }),
      occAt('2025-09-23', { id: 'o3', obligationId: 'h352' }),
    ];
    const view = registerView(obs, occs, today);
    expect(view.overdue.map((i) => [i.obligation.id, i.daysOverdue])).toEqual([['h352', 352], ['h27', 27], ['r31', 31]]);
  });
});

describe('§7 item 13 — twelve months, Later and Inactive', () => {
  it('twelve month groups from the current month', () => {
    const view = registerView([], [], '2026-09-10');
    expect(view.months.map((m) => m.key)).toEqual([
      '2026-09', '2026-10', '2026-11', '2026-12', '2027-01', '2027-02',
      '2027-03', '2027-04', '2027-05', '2027-06', '2027-07', '2027-08',
    ]);
  });

  it('a 2031 assumed-name row is in Later, and Done is allowed there', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'anniversary', anchorDate: '2021-03-15', everyYears: 10 }, { leadDays: 180 }));
    expect(a.occurrence!.dueOn).toBe('2031-03-15');
    const view = registerView(w.obligations, w.occurrences, '2026-09-10');
    expect(view.later.map((i) => i.occurrence.id)).toEqual([a.occurrence!.id]);
    expect(view.months.every((m) => m.items.length === 0)).toBe(true);
    expect(() => w.done(a.occurrence!.id)).not.toThrow();
  });

  it('an item whose target fell in the month just ended, and is not overdue, stays in the current month', () => {
    // R = Sun Nov 1 2026, so T = Fri Oct 30; on Sun Nov 1 it is target-passed under rolls-forward.
    const ob = obWith({ weekendRule: 'rolls-forward' });
    const view = registerView([ob], [occAt('2026-11-01')], '2026-11-01');
    expect(view.months[0].key).toBe('2026-11');
    expect(view.months[0].items.map((i) => i.state)).toEqual(['target-passed']);
  });

  it('Inactive lists retired and added-inactive obligations; a retired one with an open occurrence stays in its month too', () => {
    const w = world('2026-09-10');
    const kept = w.activate(activation({ kind: 'fixed-monthly', day: 20 }, { name: 'Retired but lit' }));
    w.retire(kept.obligation.id);
    const boi = w.activate(activation({ kind: 'one-time' }, { name: 'BOI note', active: false }));
    const view = registerView(w.obligations, w.occurrences, '2026-09-10');
    expect(view.inactive.map((i) => i.obligation.name)).toEqual(['BOI note', 'Retired but lit']);
    expect(view.inactive.find((i) => i.obligation.id === kept.obligation.id)!.open!.id).toBe(kept.occurrence!.id);
    expect(view.months[0].items.map((i) => i.occurrence.id)).toEqual([kept.occurrence!.id]);
    expect(boi.occurrence).toBeNull();
  });
});

// -------------------------------------------------------- §7 item 21 — nothing snoozes

describe('§7 item 21 — nothing snoozes', () => {
  it('exports no snooze, dismiss, later, remind-me or bulk function', () => {
    // The only names the pattern reaches are #156 A1's OUTLOOK reminder — the event's
    // own reminder limb, which unlights nothing — pinned by name so any other export
    // it reaches still fails here.
    expect(Object.keys(FO).filter((k) => /snooze|dismiss|later|remind|bulk/i.test(k)).sort())
      .toEqual(['DEFAULT_OUTLOOK_REMINDER_DAYS', 'defaultReminderDays', 'outlookReminderIsOn', 'reminderOn']);
  });

  it('the only close actions a plan can write are done and not-applicable; the only reversal is undone', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 20 }, { conditionalPerPeriod: true }));
    const d = w.done(a.occurrence!.id);
    w.na(d.next!.id, { reason: 'condition-not-met' });
    w.undo(d.next!.id);
    const occurrenceActions = new Set(w.log.filter((l) => l.entityType === 'firm_obligation_occurrence').map((l) => l.action));
    expect([...occurrenceActions].sort()).toEqual(['done', 'not-applicable', 'undone']);
  });
});

// ------------------------------------------------ the whole-build review's fixes
// Each block pins a defect the adversarial review of 2026-09-11 confirmed, so a
// regression fails here by name.

describe('review — FOD-4 guards the condition beneath past-date-unknown, not the label', () => {
  // R = Sat Jan 30 2027 under `unknown`: T = Fri Jan 29, D = R.
  const setup = (today: string) => {
    const w = world('2026-12-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 1, day: 30 }));
    expect(a.occurrence!.dueOn).toBe('2027-01-30');
    w.setToday(today);
    return { w, id: a.occurrence!.id, obId: a.obligation.id };
  };

  it('past its date: a later override is refused, though the screen never says "overdue"', () => {
    const { w, id, obId } = setup('2027-03-15');
    expect(stateOf(w.ob(obId), w.occ(id), '2027-03-15')).toBe('past-date-unknown');
    expect(FO.isPastDue(w.ob(obId), w.occ(id), '2027-03-15')).toBe(true);
    expect(() => w.override(id, '2028-01-31')).toThrow(/never be moved later/);
  });

  it('on the rule date itself it is not yet past due, so a later override is his', () => {
    const { w, id, obId } = setup('2027-01-30');
    expect(stateOf(w.ob(obId), w.occ(id), '2027-01-30')).toBe('past-date-unknown');
    expect(FO.isPastDue(w.ob(obId), w.occ(id), '2027-01-30')).toBe(false);
    w.override(id, '2027-02-15');
    expect(w.occ(id).dueOnOverride).toBe('2027-02-15');
  });

  it('past its date: a rule edit that would move it later keeps its date', () => {
    const { w, id, obId } = setup('2027-03-15');
    const p = w.edit(obId, { recurrence: { kind: 'fixed-annual', month: 12, day: 30 } });
    expect(p.kept).toMatch(/keeps its date/);
    expect(w.occ(id).dueOn).toBe('2027-01-30');
  });

  it('past its date: → no-roll turns it overdue and is allowed; → rolls-forward would move D later and is refused', () => {
    const one = setup('2027-03-15');
    one.w.edit(one.obId, { weekendRule: 'no-roll' });
    expect(stateOf(one.w.ob(one.obId), one.w.occ(one.id), '2027-03-15')).toBe('overdue');
    const two = setup('2027-03-15');
    expect(() => two.w.edit(two.obId, { weekendRule: 'rolls-forward' })).toThrow(/FOD-4/);
  });

  it('the reverse route: a rule edit that would turn "overdue" into past-date-unknown keeps its date', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    expect(dayOfWeek('2025-10-11')).toBe(6);
    const p = w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 10, day: 11 } });
    expect(p.kept).toMatch(/keeps its date/);
    expect(w.occ(a.occurrence!.id).dueOn).toBe('2025-10-15');
    expect(stateOf(w.ob(a.obligation.id), w.occ(a.occurrence!.id), '2026-09-11')).toBe('overdue');
  });

  it('the three-step route (edit onto a Saturday, override it away, edit back) is closed at its first step', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    const id = a.occurrence!.id;
    w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 10, day: 11 } });
    expect(() => w.override(id, '2027-03-01')).toThrow(/never be moved later/);
    expect(cardItems(w.obligations, w.occurrences, '2026-09-11').map((i) => i.occurrence.id)).toEqual([id]);
  });

  it('a LIT occurrence can still return to pending by a lead edit — FOD-4 and §7 item 21 allow it; the conflict with slice §8 is reported for Michael, not decided here', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 1 }, { leadDays: 60 }));
    const id = a.occurrence!.id;
    expect(stateOf(w.ob(a.obligation.id), w.occ(id), '2026-09-11')).toBe('lit');
    w.edit(a.obligation.id, { leadDays: 5 });
    expect(stateOf(w.ob(a.obligation.id), w.occ(id), '2026-09-11')).toBe('pending');
  });
});

describe('review — FOM-4\'s "last period completed" names a period by its due date', () => {
  it('month precision (FOT-1, FOT-25): any day in the due month names that period; the first occurrence is the one after', () => {
    for (const key of ['FOT-1', 'FOT-25']) {
      const t = FIRM_OBLIGATION_TEMPLATES.find((x) => x.key === key)!;
      const input = activationFromTemplate(t, {
        recurrence: { kind: 'anniversary', anchorDate: '2025-07-15' }, weekendRule: 'unknown', lastPeriodCompleted: '2025-07-15',
      });
      expect(input.precision).toBe('month');
      const plan = planActivation(input, { today: '2026-09-11', nowIso: STAMP, newId: () => 'x', user: 't' });
      expect(plan.occurrence).toMatchObject({ dueOn: '2026-07-31', periodLabel: '2026–27' });
    }
  });

  it('month precision: this year\'s period, entered on the 1st, opens next year\'s', () => {
    const ob = activation({ kind: 'anniversary', anchorDate: '2025-07-15' }, { precision: 'month' });
    expect(materializeFirst(ob, '2026-09-11', { lastPeriodCompleted: '2026-07-01' })).toEqual({ dueOn: '2027-07-31', periodLabel: '2027–28' });
  });

  it('a date that names no period is refused rather than guessed, at either precision', () => {
    const annual = activation({ kind: 'fixed-annual', month: 10, day: 15 });
    expect(() => materializeFirst(annual, '2026-09-11', { lastPeriodCompleted: '2024-10-10' })).toThrow(/not one of this rule's due dates/);
    const byMonth = activation({ kind: 'anniversary', anchorDate: '2025-07-15' }, { precision: 'month' });
    expect(() => materializeFirst(byMonth, '2026-09-11', { lastPeriodCompleted: '2025-09-10' })).toThrow(/not in a month this rule falls due/);
  });
});

describe('review — Done after a kept rule edit never opens the closed period again', () => {
  it('serial annual: Oct 15 → Nov 15 kept on the overdue 2025 report; Done opens 2026, not 2025 again', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    expect(w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 11, day: 15 } }).kept).toMatch(/keeps its date/);
    const d = w.done(a.occurrence!.id);
    expect(d.next).toMatchObject({ dueOn: '2026-11-15', periodLabel: '2026' });
    expect(w.occsOf(a.obligation.id).map((o) => o.periodLabel)).toEqual(['2025', '2026']);
  });

  it('anniversary: the anchor moved a month later on an overdue term; Done opens the next term', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'anniversary', anchorDate: '2024-07-15' }, { lastPeriodCompleted: '2024-07-15' }));
    expect(a.occurrence).toMatchObject({ dueOn: '2025-07-15', periodLabel: '2025–26' });
    expect(w.edit(a.obligation.id, { recurrence: { kind: 'anniversary', anchorDate: '2024-08-15' } }).kept).toMatch(/keeps its date/);
    expect(w.done(a.occurrence!.id).next).toMatchObject({ dueOn: '2026-08-15', periodLabel: '2026–27' });
  });

  it('collapse annual with the completion backdated before the new rule date: still the next period', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 11, day: 15 }, missedPeriods: 'collapse' });
    expect(w.done(a.occurrence!.id, { doneOn: '2025-10-20' }).next).toMatchObject({ dueOn: '2026-11-15', periodLabel: '2026' });
  });
});

describe('review — an interval occurrence re-dates only from the completion it was measured from', () => {
  it('a first occurrence dated from a last-done date re-dates when the interval changes', () => {
    const w = world('2026-09-11');
    const a = w.activate({ ...activation({ kind: 'interval-from-completion', days: 91 }), lastDone: '2026-08-01' });
    expect(a.occurrence!.dueOn).toBe('2026-10-31');
    w.edit(a.obligation.id, { recurrence: { kind: 'interval-from-completion', days: 30 } });
    expect(w.occ(a.occurrence!.id).dueOn).toBe('2026-08-31');
  });

  it('"due now" keeps its date — it was measured from nothing the rule can reproduce', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'interval-from-completion', days: 91 }));
    const p = w.edit(a.obligation.id, { recurrence: { kind: 'interval-from-completion', days: 30 } });
    expect(p.occurrence).toBeNull();
    expect(w.occ(a.occurrence!.id).dueOn).toBe('2026-09-11');
  });

  it('after Done, the next re-dates from that done date', () => {
    const w = world('2026-06-01');
    const a = w.activate(activation({ kind: 'interval-from-completion', days: 91 }));
    const d = w.done(a.occurrence!.id);
    expect(d.next!.dueOn).toBe('2026-08-31');
    w.setToday('2026-06-10');
    w.edit(a.obligation.id, { recurrence: { kind: 'interval-from-completion', days: 60 } });
    expect(w.occ(d.next!.id).dueOn).toBe('2026-07-31');
  });

  it('after retire → done → re-activate, the re-activated occurrence keeps its date', () => {
    const w = world('2026-06-01');
    const a = w.activate(activation({ kind: 'interval-from-completion', days: 91 }));
    w.retire(a.obligation.id);
    w.done(a.occurrence!.id);
    w.setToday('2026-09-11');
    const r = w.reactivate(a.obligation.id);
    expect(r.occurrence!.dueOn).toBe('2026-09-11');
    w.edit(a.obligation.id, { recurrence: { kind: 'interval-from-completion', days: 30 } });
    expect(w.occ(r.occurrence!.id).dueOn).toBe('2026-09-11');
  });
});

describe('review — an edit that changes nothing is not logged as a change', () => {
  it('compares rules by meaning: a missing everyYears, jsonb key order and an empty note change nothing', () => {
    const seeded = obWith({ recurrence: { kind: 'anniversary', anchorDate: '2026-03-01' } });
    expect(FO.changedFields(seeded, { recurrence: { kind: 'anniversary', anchorDate: '2026-03-01', everyYears: 1 }, notes: '' })).toEqual([]);
    const fromJsonb = obWith({ recurrence: { day: 15, kind: 'fixed-annual', month: 10 } as RecurrenceRule });
    expect(FO.changedFields(fromJsonb, { recurrence: { kind: 'fixed-annual', month: 10, day: 15 } })).toEqual([]);
    expect(FO.changedFields(fromJsonb, { recurrence: { kind: 'fixed-annual', month: 10, day: 16 }, leadDays: 30, weight: 'routine' }))
      .toEqual(['recurrence', 'weight']);
  });

  it('the log reason names the changed fields in words', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    w.edit(a.obligation.id, { leadDays: 45, weekendRule: 'no-roll' });
    expect(w.log.at(-1)!.reason).toBe('Edited: lead, weekend rule');
  });
});

describe('review — re-activation never reopens a closed period', () => {
  it('a dated row retired, done early, then re-activated before its date: the next period, not the one just done', () => {
    const w = world('2026-09-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }));
    w.retire(a.obligation.id);
    w.done(a.occurrence!.id);
    w.setToday('2026-09-20');
    expect(w.reactivate(a.obligation.id).occurrence).toMatchObject({ dueOn: '2027-10-15', periodLabel: '2027' });
  });

  it('a one-time row already done is refused, not reopened overdue', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
    w.done(a.occurrence!.id);
    w.setToday('2026-10-05');
    expect(() => w.reactivate(a.obligation.id)).toThrow(/already done/);
  });

  it('Activate… from Inactive takes a date: an undated row is refused until it has one (§7 item 13)', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'one-time' }, { name: 'BOI note', active: false }));
    expect(() => w.reactivate(a.obligation.id)).toThrow(/needs its due date/);
    w.edit(a.obligation.id, { recurrence: { kind: 'one-time', dueOn: '2026-12-01' } });
    expect(w.reactivate(a.obligation.id).occurrence).toMatchObject({ dueOn: '2026-12-01', periodLabel: '2026' });
  });

  it('a first activation from Inactive takes FOM-4\'s "last period completed" on a serial row (FOT-7\'s shape)', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'anniversary' }, { active: false }));
    w.edit(a.obligation.id, { recurrence: { kind: 'anniversary', anchorDate: '2020-03-02' } });
    const r = w.reactivate(a.obligation.id, { lastPeriodCompleted: '2024-03-02' });
    expect(r.occurrence).toMatchObject({ dueOn: '2025-03-02', periodLabel: '2025–26' });
    expect(w.ob(a.obligation.id).lastPeriodCompleted).toBe('2024-03-02');
  });

  it('refuses "last period completed" on a row that already has history', () => {
    const w = world('2026-09-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }));
    w.retire(a.obligation.id);
    w.done(a.occurrence!.id);
    expect(() => w.reactivate(a.obligation.id, { lastPeriodCompleted: '2025-10-15' })).toThrow(/first activation/);
  });
});

describe('review — the card line, the card summary, the stranded list, plain text on screen', () => {
  it('a lit weekend row under `unknown` carries no day count on the card (slice §8); under a roll it does', () => {
    const today = '2027-01-20';
    const unk = obWith({ id: 'u', weekendRule: 'unknown' });
    const rf = obWith({ id: 'r', weekendRule: 'rolls-forward' });
    const items = cardItems([unk, rf], [occAt('2027-01-30', { id: 'ou', obligationId: 'u' }), occAt('2027-01-30', { id: 'or', obligationId: 'r' })], today);
    const byOb = Object.fromEntries(items.map((i) => [i.obligation.id, FO.cardLine(i, today)]));
    expect(byOb.u).toBe('Fixture obligation · aim for Fri Jan 29');
    expect(byOb.r).toBe('Fixture obligation · aim for Fri Jan 29 · 9 days');
  });

  it('cardSummary: three lines, then "and N more"', () => {
    const today = '2026-09-09';
    const obs = ['a', 'b', 'c', 'd', 'e'].map((id) => obWith({ id }));
    const occs = obs.map((o, i) => occAt(`2026-07-${13 + i}`, { id: `o${o.id}`, obligationId: o.id }));
    const s = FO.cardSummary(cardItems(obs, occs, today), today);
    expect(s.lines).toHaveLength(3);
    expect(s.more).toBe(2);
    expect([s.due, s.overdue]).toEqual([0, 5]);
    expect(FO.cardSummary(cardItems(obs.slice(0, 2), occs.slice(0, 2), today), today).more).toBe(0);
  });

  it('the register lists an active obligation with no open occurrence as stranded — no act leaves one since #156 A5, but a store written before could hold one', () => {
    const view = registerView(
      [obWith({ id: 'stranded' }), obWith({ id: 'retired', active: false }), obWith({ id: 'fine' })],
      [occAt('2026-12-01', { id: 'of', obligationId: 'fine' })],
      '2026-09-11',
    );
    expect(view.stranded.map((o) => o.id)).toEqual(['stranded']);
  });

  it('plainText drops the SPEC cells\' markdown for display and leaves an ordinary asterisk alone', () => {
    expect(FO.plainText('Domain renewal — `brennanstx.com`')).toBe('Domain renewal — brennanstx.com');
    expect(FO.plainText('31 CFR 1010.380 — **TIER B** — his read')).toBe('31 CFR 1010.380 — TIER B — his read');
    expect(FO.plainText('an *emphasised* word')).toBe('an emphasised word');
    expect(FO.plainText('2 * 3 * 4')).toBe('2 * 3 * 4');
  });
});

describe('§7 item 9 — the eight FOM-2 templates carry Not applicable through activation; FOT-1 does not', () => {
  const RULE: Partial<Record<string, RecurrenceRule>> = {
    'fixed-annual': { kind: 'fixed-annual', month: 12, day: 1 },
    'fixed-quarterly': QUARTERLY_941,
    anniversary: { kind: 'anniversary', anchorDate: '2026-12-01' },
  };

  it.each(['FOT-8', 'FOT-10', 'FOT-11', 'FOT-13', 'FOT-14', 'FOT-15', 'FOT-16', 'FOT-17'])('%s offers it and accepts it', (key) => {
    const t = FIRM_OBLIGATION_TEMPLATES.find((x) => x.key === key)!;
    const w = world('2026-09-11');
    const a = w.activate(activationFromTemplate(t, { recurrence: RULE[t.kind]!, weekendRule: 'unknown' }));
    expect(a.obligation.conditionalPerPeriod).toBe(true);
    expect(() => w.na(a.occurrence!.id, { reason: 'condition-not-met' })).not.toThrow();
  });

  it('FOT-1 refuses it', () => {
    const t = FIRM_OBLIGATION_TEMPLATES.find((x) => x.key === 'FOT-1')!;
    const w = world('2026-09-11');
    const a = w.activate(activationFromTemplate(t, { recurrence: RULE.anniversary!, weekendRule: 'unknown' }));
    expect(a.obligation.conditionalPerPeriod).toBe(false);
    expect(() => w.na(a.occurrence!.id, { reason: 'condition-not-met' })).toThrow(/FOD-18/);
  });
});

describe('review — the Inactive "Activate…" asks before it edits (reactivationProblem)', () => {
  it('returns the refusal the re-activation would give, or null, and writes nothing by asking', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'fixed-annual' }, { active: false }));
    const ob = w.ob(a.obligation.id);
    const rule = { recurrence: { kind: 'fixed-annual' as const, month: 3, day: 15 } };
    expect(FO.reactivationProblem(ob, rule, w.occsOf(ob.id), '2026-09-11', { lastPeriodCompleted: '2026-03-10' }))
      .toMatch(/not one of this rule's due dates/);
    expect(FO.reactivationProblem(ob, rule, w.occsOf(ob.id), '2026-09-11', { lastPeriodCompleted: '2026-03-15' })).toBeNull();
    expect(FO.reactivationProblem(ob, {}, w.occsOf(ob.id), '2026-09-11')).toMatch(/fixed-annual/);
    expect(w.log).toHaveLength(1);
    expect(w.ob(ob.id)).toMatchObject({ active: false, recurrence: { kind: 'fixed-annual' } });
  });

  it('a one-time row already done on its date is refused before any edit, and a new date clears it', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
    w.done(a.occurrence!.id);
    w.setToday('2026-10-05');
    const ob = w.ob(a.obligation.id);
    expect(FO.reactivationProblem(ob, {}, w.occsOf(ob.id), '2026-10-05')).toMatch(/already done/);
    expect(FO.reactivationProblem(ob, { recurrence: { kind: 'one-time', dueOn: '2027-10-01' } }, w.occsOf(ob.id), '2026-10-05')).toBeNull();
  });
});

// ================================================================ the fix slice (FOS-2)
// docs/specs/firm-obligations-fix-slice.md §7, domain halves. Each describe names the
// §7 item it pins and the ruling it builds, so a regression fails here by name.

const FIX_CTX: ActContext = { today: '2026-09-10', nowIso: STAMP, newId: () => 'x', user: 't' };

/** A close line as planClose writes it: the `done` line whose JSON is the close record. */
function closeLine(
  occurrenceId: string, record: { nextOccurrenceId?: string | null; retiredObligation?: boolean } = {},
): ReviewLogEntry {
  return {
    id: `close-${occurrenceId}`, entityType: FO.FIRM_OCCURRENCE_ENTITY, entityId: occurrenceId, action: 'done',
    user: 't', timestamp: STAMP,
    newValue: JSON.stringify({
      kind: 'close', doneOn: '2026-09-10',
      nextOccurrenceId: record.nextOccurrenceId ?? null, retiredObligation: record.retiredObligation ?? false,
    }),
  };
}

// ------------------------------------------ §7 item 1 — the Outlook reminder days (A1)

describe('fix slice §7 item 1 — the Outlook reminder days (#156 A1; FXD-1, FXD-9; "min(30, lead) everywhere", the fix build\'s stop 2026-09-16)', () => {
  const annual = (over: Partial<FirmObligationCreate> = {}) => activation({ kind: 'fixed-annual', month: 12, day: 1 }, over);

  it('defaultReminderDays is min(30, lead): thirty days, or the lead where the lead is shorter', () => {
    expect(DEFAULT_OUTLOOK_REMINDER_DAYS).toBe(30);
    expect([180, 45, 31, 30, 29, 14, 5, 3, 1, 0].map(defaultReminderDays)).toEqual([30, 30, 30, 30, 29, 14, 5, 3, 1, 0]);
  });

  it('planActivation takes that default where nobody typed a value — an activation, and Add as inactive', () => {
    expect(planActivation(annual({ leadDays: 180 }), FIX_CTX).obligation.outlookReminderDays).toBe(30);
    expect(planActivation(annual({ leadDays: 30 }), FIX_CTX).obligation.outlookReminderDays).toBe(30);
    expect(planActivation(annual({ leadDays: 5 }), FIX_CTX).obligation.outlookReminderDays).toBe(5);
    expect(planActivation(activation({ kind: 'one-time' }, { active: false, leadDays: 14 }), FIX_CTX).obligation.outlookReminderDays).toBe(14);
  });

  it('…and honours his typed value exactly: above the lead (FXD-9), below it, and zero', () => {
    expect(planActivation(annual({ leadDays: 30, outlookReminderDays: 60 }), FIX_CTX).obligation.outlookReminderDays).toBe(60);
    expect(planActivation(annual({ leadDays: 180, outlookReminderDays: 7 }), FIX_CTX).obligation.outlookReminderDays).toBe(7);
    expect(planActivation(annual({ leadDays: 5, outlookReminderDays: 0 }), FIX_CTX).obligation.outlookReminderDays).toBe(0);
  });

  it('activationFromTemplate passes his typed value through and supplies none of its own (FXD-1)', () => {
    const t = FIRM_OBLIGATION_TEMPLATES.find((x) => x.key === 'FOT-4')!;
    const inputs = { recurrence: { kind: 'fixed-annual', month: 12, day: 1 } as RecurrenceRule, weekendRule: 'unknown' as WeekendRule };
    expect(activationFromTemplate(t, inputs).outlookReminderDays).toBeUndefined();
    expect(activationFromTemplate(t, { ...inputs, outlookReminderDays: 45 }).outlookReminderDays).toBe(45);
    expect(planActivation(activationFromTemplate(t, { ...inputs, leadDays: 10 }), FIX_CTX).obligation.outlookReminderDays).toBe(10);
    expect(planActivation(activationFromTemplate(t, { ...inputs, leadDays: 10, outlookReminderDays: 45 }), FIX_CTX).obligation.outlookReminderDays).toBe(45);
  });

  it('the queue of Outlook deletes always starts empty, whatever the input carries', () => {
    const smuggled = { ...annual(), pendingOutlookDeletes: [{ eventId: 'e', occurrenceId: 'o', recordedAt: STAMP, attempts: 9 }] } as FirmObligationCreate;
    expect(planActivation(smuggled, FIX_CTX).obligation.pendingOutlookDeletes).toEqual([]);
    expect(planActivation(annual(), FIX_CTX).obligation.pendingOutlookDeletes).toEqual([]);
  });

  it('validation: a whole number ≥ 0 — a negative, a fraction, NaN or a missing value is refused, on activation and on an edit', () => {
    for (const bad of [-1, 1.5, Number.NaN]) {
      expect(() => planActivation(annual({ outlookReminderDays: bad }), FIX_CTX), String(bad)).toThrow(/Outlook reminder days must be a whole number ≥ 0/);
    }
    const missing: Partial<FirmObligation> = obWith();
    delete missing.outlookReminderDays;
    expect(() => FO.validateObligation(missing as FirmObligation)).toThrow(/Outlook reminder days must be a whole number ≥ 0/);
    const w = world('2026-09-10');
    const a = w.activate(annual());
    expect(() => w.edit(a.obligation.id, { outlookReminderDays: -5 })).toThrow(/Outlook reminder days must be a whole number ≥ 0/);
    expect(() => w.edit(a.obligation.id, { outlookReminderDays: 2.5 })).toThrow(/Outlook reminder days must be a whole number ≥ 0/);
    expect(w.ob(a.obligation.id).outlookReminderDays).toBe(30);
    expect(w.log).toHaveLength(1);
  });

  it('is an editable field, logged in words', () => {
    const w = world('2026-09-10');
    const a = w.activate(annual());
    w.edit(a.obligation.id, { outlookReminderDays: 90 });
    expect(w.ob(a.obligation.id).outlookReminderDays).toBe(90);
    expect(w.log.at(-1)!.reason).toBe('Edited: Outlook reminder');
  });
});

// --------------------------- §7 items 1 and 2 — the reminder day, and whether it rings

describe('fix slice §7 items 1 and 2 — the reminder day and whether it rings (#156 A1, A2; FXD-8, FXD-10, FXD-11)', () => {
  const R = '2027-03-15'; // a Monday, so T = R

  it('reminderOn is T − the stored days, exactly: lead 180 with 30 days rings at T − 30 while the lead still lights at T − 180', () => {
    expect(dayOfWeek(R)).toBe(1);
    const ob = obWith({ leadDays: 180, outlookReminderDays: 30 });
    expect(reminderOn(ob, occAt(R))).toBe('2027-02-13');
    expect(FO.daysBetween('2027-02-13', R)).toBe(30);
    expect(lightsOn(ob, occAt(R))).toBe('2026-09-16');
  });

  it('a lead of 5 pre-fills 5 and rings at T − 5', () => {
    const ob = obWith({ leadDays: 5, outlookReminderDays: defaultReminderDays(5) });
    expect(reminderOn(ob, occAt(R))).toBe('2027-03-10');
  });

  it('raised by hand to 60 over a lead of 30: rings at T − 60, before the row lights (FXD-9)', () => {
    const ob = obWith({ leadDays: 30, outlookReminderDays: 60 });
    expect(reminderOn(ob, occAt(R))).toBe('2027-01-14');
    expect(FO.daysBetween('2027-01-14', R)).toBe(60);
    expect(lightsOn(ob, occAt(R))).toBe('2027-02-13');
    expect(stateOf(ob, occAt(R), '2027-01-14')).toBe('pending');
  });

  it('keys off the TARGET: a Saturday rule date rings back from its Friday under every weekend rule; an override moves it with T', () => {
    expect(dayOfWeek('2027-01-30')).toBe(6);
    for (const weekendRule of WEEKEND_RULES) {
      expect(reminderOn(obWith({ weekendRule, outlookReminderDays: 30 }), occAt('2027-01-30')), weekendRule).toBe('2026-12-30');
    }
    expect(dayOfWeek('2027-02-10')).toBe(3);
    expect(reminderOn(obWith({ outlookReminderDays: 5 }), occAt('2027-01-30', { dueOnOverride: '2027-02-10' }))).toBe('2027-02-05');
  });

  it('FXD-11: a month-precision row keys its reminder off T as a day row does — FOM-6\'s earlier-of stays with the lit moment', () => {
    const monthRow = (leadDays: number, outlookReminderDays: number) => obWith({
      recurrence: { kind: 'anniversary', anchorDate: '2026-06-10' }, precision: 'month', leadDays, outlookReminderDays,
    });
    const o = occAt('2026-06-30'); // a Tuesday, so T = R
    expect(dayOfWeek('2026-06-30')).toBe(2);
    expect(lightsOn(monthRow(5, 5), o)).toBe('2026-06-01');
    expect(reminderOn(monthRow(5, 5), o)).toBe('2026-06-25');
    expect(lightsOn(monthRow(45, 30), o)).toBe('2026-05-16');
    expect(reminderOn(monthRow(45, 30), o)).toBe('2026-05-31');
  });

  it('rings on a hard open occurrence only — never on a routine one (FXD-8), never on a closed one (A2, FXD-10)', () => {
    const done = { state: 'done' as const, doneOn: '2027-03-01', outcome: 'completed' as const };
    expect(outlookReminderIsOn(obWith({ weight: 'hard' }), occAt(R))).toBe(true);
    expect(outlookReminderIsOn(obWith({ weight: 'routine' }), occAt(R))).toBe(false);
    expect(outlookReminderIsOn(obWith({ weight: 'hard' }), occAt(R, done))).toBe(false);
    expect(outlookReminderIsOn(obWith({ weight: 'routine' }), occAt(R, done))).toBe(false);
  });

  it('Done and Not applicable turn it off; Undo turns it back on for a hard row, and a routine row stays off throughout', () => {
    const w = world('2026-09-10');
    const hard = w.activate(activation({ kind: 'fixed-monthly', day: 20 }, { conditionalPerPeriod: true }));
    const hardOb = () => w.ob(hard.obligation.id);
    const first = hard.occurrence!.id;
    expect(outlookReminderIsOn(hardOb(), w.occ(first))).toBe(true);
    const d = w.done(first);
    expect(outlookReminderIsOn(hardOb(), w.occ(first))).toBe(false);
    expect(outlookReminderIsOn(hardOb(), w.occ(d.next!.id))).toBe(true);
    w.na(d.next!.id, { reason: 'condition-not-met' });
    expect(outlookReminderIsOn(hardOb(), w.occ(d.next!.id))).toBe(false);
    w.undo(d.next!.id);
    expect(outlookReminderIsOn(hardOb(), w.occ(d.next!.id))).toBe(true);

    const routine = w.activate(activation({ kind: 'fixed-monthly', day: 20 }, { weight: 'routine' }));
    const rid = routine.occurrence!.id;
    expect(outlookReminderIsOn(w.ob(routine.obligation.id), w.occ(rid))).toBe(false);
    w.done(rid);
    expect(outlookReminderIsOn(w.ob(routine.obligation.id), w.occ(rid))).toBe(false);
    w.undo(rid);
    expect(w.occ(rid).state).toBe('open');
    expect(outlookReminderIsOn(w.ob(routine.obligation.id), w.occ(rid))).toBe(false);
  });
});

// ----------------------------------- §7 item 3 — the two columns (A3; touched "Same as today")

describe('fix slice §7 item 3 — materializedFrom on the next, touched by the acts that end Undo (#156 A3; "Same as today", the fix build\'s stop 2026-09-16)', () => {
  const monthly = () => activation({ kind: 'fixed-monthly', day: 20 }, { conditionalPerPeriod: true });

  it('a close names itself on the next it materializes; an activation\'s and a re-activation\'s occurrences name nothing; every new occurrence starts untouched', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const obId = a.obligation.id;
    expect(a.occurrence).not.toHaveProperty('materializedFrom');
    expect(a.occurrence!.touched).toBe(false);
    const d = w.done(a.occurrence!.id);
    expect(d.next).toMatchObject({ materializedFrom: a.occurrence!.id, touched: false });
    const n = w.na(d.next!.id, { reason: 'performed-elsewhere' });
    expect(n.next).toMatchObject({ materializedFrom: d.next!.id, touched: false });
    expect(nextOf(a.occurrence!.id, w.occsOf(obId))!.id).toBe(d.next!.id);
    expect(nextOf(d.next!.id, w.occsOf(obId))!.id).toBe(n.next!.id);
    expect(nextOf(n.next!.id, w.occsOf(obId))).toBeNull();
    w.retire(obId);
    expect(w.done(n.next!.id).next).toBeNull();
    const r = w.reactivate(obId);
    expect(r.occurrence).not.toHaveProperty('materializedFrom');
    expect(r.occurrence!.touched).toBe(false);
  });

  it('touched flips on a close — Done and Not applicable', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const d = w.done(a.occurrence!.id);
    expect(d.occurrencePatch.touched).toBe(true);
    expect(w.occ(a.occurrence!.id).touched).toBe(true);
    const n = w.na(d.next!.id, { reason: 'condition-not-met' });
    expect(n.occurrencePatch.touched).toBe(true);
    expect(w.occ(d.next!.id).touched).toBe(true);
  });

  it('touched flips on a due-date override', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    expect(w.override(a.occurrence!.id, '2026-12-15').patch.touched).toBe(true);
    expect(w.occ(a.occurrence!.id).touched).toBe(true);
  });

  it('touched flips on a re-dating rule edit and on a re-dating precision edit', () => {
    const w = world('2026-09-10');
    const rule = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    const pr = w.edit(rule.obligation.id, { recurrence: { kind: 'fixed-annual', month: 12, day: 10 } });
    expect(pr.occurrence!.patch).toMatchObject({ dueOn: '2026-12-10', touched: true });
    expect(w.occ(rule.occurrence!.id).touched).toBe(true);
    const prec = w.activate(activation({ kind: 'anniversary', anchorDate: '2020-12-10' }));
    expect(prec.occurrence!.dueOn).toBe('2026-12-10');
    const pp = w.edit(prec.obligation.id, { precision: 'month' });
    expect(pp.occurrence!.patch).toMatchObject({ dueOn: '2026-12-31', touched: true });
    expect(w.occ(prec.occurrence!.id).touched).toBe(true);
  });

  it('a rule edit KEPT on a past-due occurrence re-dates nothing and so touches nothing', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }, { lastPeriodCompleted: '2024-10-15' }));
    const p = w.edit(a.obligation.id, { recurrence: { kind: 'fixed-annual', month: 11, day: 16 } });
    expect(p.kept).toMatch(/keeps its date/);
    expect(p.occurrence).toBeNull();
    expect(w.occ(a.occurrence!.id).touched).toBe(false);
  });

  it('a re-push-only edit (weekend rule, weight, Outlook reminder days) re-queues the push and touches nothing; a lead or notes edit does neither', () => {
    const cases: [string, FirmObligationPatch, boolean][] = [
      ['weekend rule', { weekendRule: 'rolls-forward' }, true],
      ['weight', { weight: 'routine' }, true],
      ['Outlook reminder days', { outlookReminderDays: 45 }, true],
      ['lead', { leadDays: 60 }, false],
      ['notes', { notes: 'portal login in the vault' }, false],
    ];
    for (const [label, patch, repush] of cases) {
      const w = world('2026-09-10');
      const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
      const id = a.occurrence!.id;
      w.occ(id).syncStatus = 'synced';
      const p = w.edit(a.obligation.id, patch);
      if (repush) {
        expect(p.occurrence, label).toMatchObject({ id, patch: { syncStatus: 'pending' } });
        expect(p.occurrence!.patch, label).not.toHaveProperty('touched');
        expect(p.occurrence!.patch, label).not.toHaveProperty('dueOn');
      } else {
        expect(p.occurrence, label).toBeNull();
      }
      expect(w.occ(id), label).toMatchObject({ dueOn: '2026-12-01', syncStatus: repush ? 'pending' : 'synced', touched: false });
      expect(JSON.parse(w.log.at(-1)!.newValue!).reevaluatedOccurrenceId, label).toBeNull();
    }
  });

  it('…so Undo survives a weekend-rule, weight, Outlook-reminder, lead or notes edit made after the close', () => {
    const patches: FirmObligationPatch[] = [
      { weekendRule: 'no-roll' }, { weight: 'routine' }, { outlookReminderDays: 3 }, { leadDays: 9 }, { notes: 'x' },
    ];
    for (const patch of patches) {
      const w = world('2026-09-10');
      const a = w.activate(monthly());
      w.done(a.occurrence!.id);
      w.edit(a.obligation.id, patch);
      expect(w.canUndo(a.occurrence!.id), JSON.stringify(patch)).toEqual({ ok: true });
    }
  });
});

// ------------------------------------------ §7 item 3 — Undo decided from the columns

describe('fix slice §7 item 3 — canUndo decided from the columns (#156 A3; "Keep as built; read one flag", the fix build\'s stop 2026-09-16)', () => {
  const monthly = () => activation({ kind: 'fixed-monthly', day: 20 });
  const UNTOUCHED = 'The next occurrence is no longer untouched — undo is no longer available (FOD-7).';
  const LATER = 'A later occurrence has been opened since — undo is no longer available (FOD-7).';

  it('allowed iff the next exists, is untouched and is the only open occurrence — the columns decide, not the log', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const A = a.occurrence!.id;
    const B = w.done(A).next!.id;
    expect(w.canUndo(A)).toEqual({ ok: true });
    // The column alone ends it: no log line says anything happened.
    w.occ(B).touched = true;
    expect(w.canUndo(A)).toEqual({ ok: false, why: UNTOUCHED });
    w.occ(B).touched = false;
    expect(w.canUndo(A)).toEqual({ ok: true });
    // A log line alone does not: the columns still say untouched.
    w.log.push({ id: 'stray', entityType: FO.FIRM_OCCURRENCE_ENTITY, entityId: B, action: 'edited', user: 'test', timestamp: STAMP });
    expect(w.canUndo(A)).toEqual({ ok: true });
    // A second open occurrence (a broken store): refused rather than leave two open.
    w.occurrences.push(occAt('2027-01-29', { id: 'stray-open', obligationId: a.obligation.id }));
    expect(w.canUndo(A)).toEqual({ ok: false, why: 'Another occurrence is open — undo would leave two open (FOD-5).' });
  });

  it('refused once the next is re-dated, overridden or closed, each by its own act — and on a next carrying an override with no touched mark', () => {
    const acts: [string, (w: ReturnType<typeof world>, obId: string, next: string) => void][] = [
      ['re-dated by a rule edit', (w, obId) => { w.edit(obId, { recurrence: { kind: 'fixed-monthly', day: 25 } }); }],
      ['re-dated by a precision edit', (w, obId) => { w.edit(obId, { precision: 'month' }); }],
      ['overridden', (w, _obId, next) => { w.override(next, '2026-10-19'); }],
      ['done', (w, _obId, next) => { w.done(next); }],
      ['an override written with no touched mark', (w, _obId, next) => { w.occ(next).dueOnOverride = '2026-10-19'; }],
    ];
    for (const [label, act] of acts) {
      const w = world('2026-09-10');
      const a = w.activate(monthly());
      const next = w.done(a.occurrence!.id).next!.id;
      act(w, a.obligation.id, next);
      expect(w.canUndo(a.occurrence!.id), label).toEqual({ ok: false, why: UNTOUCHED });
    }
  });

  it('a close that materialized no next stays undoable while nothing has opened since — a one-time Done that retired its obligation, and a Done on a retired obligation with earlier history', () => {
    const w = world('2026-09-10');
    const one = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
    expect(w.done(one.occurrence!.id).next).toBeNull();
    expect(w.ob(one.obligation.id).active).toBe(false);
    expect(w.canUndo(one.occurrence!.id)).toEqual({ ok: true });

    // Its earlier occurrence was created before it, so only an occurrence created AFTER
    // it ends Undo — created-at order is real here because the world's clock advances.
    const m = w.activate(monthly());
    const B = w.done(m.occurrence!.id).next!;
    w.retire(m.obligation.id);
    expect(w.done(B.id).next).toBeNull();
    expect(w.openOf(m.obligation.id)).toHaveLength(0);
    expect(w.canUndo(B.id)).toEqual({ ok: true });
    expect(latestClosed(w.occsOf(m.obligation.id))!.id).toBe(B.id);
    expect(w.canUndo(m.occurrence!.id)).toEqual({ ok: false, why: UNTOUCHED });
  });

  it('refused once a re-activation has opened another — while it is open, and EVEN after it has closed in turn (the created-at check)', () => {
    const w = world('2026-09-10');
    const a = w.activate(monthly());
    const obId = a.obligation.id;
    const A = a.occurrence!.id;
    w.retire(obId);
    expect(w.done(A).next).toBeNull();
    expect(w.canUndo(A)).toEqual({ ok: true });
    const R = w.reactivate(obId).occurrence!;
    expect(w.canUndo(A)).toEqual({ ok: false, why: 'Another occurrence has been opened since — undo would leave two open (FOD-5).' });
    w.retire(obId);
    expect(w.done(R.id).next).toBeNull();
    expect(w.openOf(obId)).toHaveLength(0);
    expect(R.materializedFrom).toBeUndefined();
    expect(w.canUndo(A)).toEqual({ ok: false, why: LATER });
    expect(w.canUndo(R.id)).toEqual({ ok: true });
    expect(latestClosed(w.occsOf(obId))!.id).toBe(R.id);
  });

  it('the same on a one-time row re-dated and activated from Inactive, then done again: only the later close can be undone', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
    const obId = a.obligation.id;
    w.done(a.occurrence!.id);
    const B = w.activateFromInactive(obId, { recurrence: { kind: 'one-time', dueOn: '2027-10-01' } }).openOccurrence!.id;
    expect(w.canUndo(a.occurrence!.id).ok).toBe(false);
    w.done(B);
    expect(w.ob(obId).active).toBe(false);
    expect(w.openOf(obId)).toHaveLength(0);
    expect(w.canUndo(a.occurrence!.id)).toEqual({ ok: false, why: LATER });
    expect(w.canUndo(B)).toEqual({ ok: true });
  });

  it('refused with no close record (FXD-7) — no line at all, or a close line whose value is no close record — even over an untouched next', () => {
    const ob = obWith({ recurrence: { kind: 'fixed-monthly', day: 20 }, missedPeriods: 'collapse' });
    const closed = occAt('2026-09-20', { id: 'c', state: 'done', doneOn: '2026-09-10', outcome: 'completed', touched: true });
    const next = occAt('2026-10-20', { id: 'n', materializedFrom: 'c' });
    const why = 'No close record for this occurrence — it cannot be undone.';
    expect(canUndo(ob, closed, [closed, next], [])).toEqual({ ok: false, why });
    const plain: ReviewLogEntry = {
      id: 'l', entityType: FO.FIRM_OCCURRENCE_ENTITY, entityId: 'c', action: 'done', user: 't', timestamp: STAMP, newValue: 'completed',
    };
    expect(canUndo(ob, closed, [closed, next], [plain])).toEqual({ ok: false, why });
    expect(() => planUndo(ob, closed, [closed, next], [plain], FIX_CTX)).toThrow(why);
    // With its record, the same shape is undoable.
    expect(canUndo(ob, closed, [closed, next], [closeLine('c', { nextOccurrenceId: 'n' })])).toEqual({ ok: true });
  });
});

describe('fix slice §7 item 3 — planUndo removes the column\'s next and re-activates on the record\'s flag alone', () => {
  it('removes the occurrence materializedFrom names — not whatever id the close record carries', () => {
    const ob = obWith({ recurrence: { kind: 'fixed-monthly', day: 20 }, missedPeriods: 'collapse' });
    const closed = occAt('2026-09-20', { id: 'c', state: 'done', doneOn: '2026-09-10', outcome: 'completed', touched: true });
    const next = occAt('2026-10-20', { id: 'n', materializedFrom: 'c', outlookEventId: 'ev-n' });
    const p = planUndo(ob, closed, [closed, next], [closeLine('c', { nextOccurrenceId: 'some-other-id' })], FIX_CTX);
    expect(p.removeOccurrence!.id).toBe('n');
    expect(JSON.parse(p.log.newValue!)).toEqual({
      kind: 'undo', removedNextOccurrenceId: 'n', removedNextOutlookEventId: 'ev-n', reactivatedObligation: false,
    });
    expect(p.reopenPatch).toMatchObject({ state: 'open', syncStatus: 'pending' });
    // Undo reverses the close; it does not un-touch the reopened occurrence (touched
    // flips only on the three acts — "Same as today").
    expect(p.reopenPatch).not.toHaveProperty('touched');
    expect(p.obligationPatch).toBeNull();
  });

  it('re-activates only when the close record says that close retired the obligation', () => {
    const w = world('2026-09-10');
    // A one-time Done retired it: Undo re-activates.
    const one = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
    w.done(one.occurrence!.id);
    expect(w.undo(one.occurrence!.id).obligationPatch).toMatchObject({ active: true });
    expect(w.ob(one.obligation.id).active).toBe(true);
    // A Done on an obligation already retired: Undo reopens it and leaves it retired.
    const m = w.activate(activation({ kind: 'fixed-monthly', day: 20 }));
    w.retire(m.obligation.id);
    w.done(m.occurrence!.id);
    expect(w.undo(m.occurrence!.id).obligationPatch).toBeNull();
    expect(w.ob(m.obligation.id).active).toBe(false);
    expect(w.occ(m.occurrence!.id).state).toBe('open');
    // The flag decides, not the kind.
    const closed = occAt('2026-10-01', { id: 'c', state: 'done', doneOn: '2026-09-10', outcome: 'completed', touched: true });
    const oneTime = obWith({ recurrence: { kind: 'one-time', dueOn: '2026-10-01' }, active: false });
    const monthlyRetired = obWith({ recurrence: { kind: 'fixed-monthly', day: 20 }, missedPeriods: 'collapse', active: false });
    expect(planUndo(oneTime, closed, [closed], [closeLine('c', { retiredObligation: false })], FIX_CTX).obligationPatch).toBeNull();
    expect(planUndo(monthlyRetired, closed, [closed], [closeLine('c', { retiredObligation: true })], FIX_CTX).obligationPatch)
      .toMatchObject({ active: true });
  });
});

describe('fix slice §7 item 3 — latestClosed, the close the register offers Undo on', () => {
  it('is the most recently created done occurrence, null while nothing is closed, and steps back when an Undo reopens', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 20 }));
    const obId = a.obligation.id;
    expect(latestClosed(w.occsOf(obId))).toBeNull();
    const d1 = w.done(a.occurrence!.id);
    expect(latestClosed(w.occsOf(obId))!.id).toBe(a.occurrence!.id);
    w.done(d1.next!.id);
    expect(latestClosed(w.occsOf(obId))!.id).toBe(d1.next!.id);
    w.undo(d1.next!.id);
    expect(latestClosed(w.occsOf(obId))!.id).toBe(a.occurrence!.id);
    expect(latestClosed([occAt('2026-12-01')])).toBeNull();
  });
});

// ------------------------------- §7 item 6 — Activate… from Inactive, one act (A7)

describe('fix slice §7 item 6 — Activate… from Inactive is one act and one line (#156 A7)', () => {
  it('an undated inactive row, dated and activated: ONE edited line on the obligation, carrying the fields, the values and the occurrence it opened', () => {
    const w = world('2026-09-11');
    const a = w.activate(activation({ kind: 'anniversary' }, { active: false }));
    const obId = a.obligation.id;
    const before = w.log.length;
    const p = w.activateFromInactive(
      obId, { recurrence: { kind: 'anniversary', anchorDate: '2020-03-02' }, outlookReminderDays: 10 }, { lastPeriodCompleted: '2024-03-02' },
    );
    expect(w.log.length).toBe(before + 1);
    const line = w.log.at(-1)!;
    expect(line).toMatchObject({ entityType: 'firm_obligation', entityId: obId, action: 'edited' });
    expect(JSON.parse(line.newValue!)).toEqual({
      kind: 'obligation', act: 'activated-from-inactive', fields: ['recurrence', 'outlookReminderDays'],
      reevaluatedOccurrenceId: null, openedOccurrenceId: p.openOccurrence!.id,
      values: {
        active: true, recurrence: { kind: 'anniversary', anchorDate: '2020-03-02' }, outlookReminderDays: 10, lastPeriodCompleted: '2024-03-02',
      },
    });
    expect(JSON.parse(line.oldValue!)).toEqual({ active: false, recurrence: { kind: 'anniversary' }, outlookReminderDays: 30 });
    expect(line.reason).toMatch(/^Activated from Inactive · edited: rule, Outlook reminder · occurrence 2025–26 opened, rule date /);
    expect(p.openOccurrence).toMatchObject({ dueOn: '2025-03-02', periodLabel: '2025–26', touched: false });
    expect(p.openOccurrence).not.toHaveProperty('materializedFrom');
    expect(p.updateOccurrence).toBeNull();
    expect(w.ob(obId)).toMatchObject({ active: true, outlookReminderDays: 10, lastPeriodCompleted: '2024-03-02' });
    expect(w.openOf(obId)).toHaveLength(1);
  });

  it('a retired row whose occurrence is still open: a re-dating edit re-dates it (touched) and names it; nothing new opens', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
    const obId = a.obligation.id;
    const id = a.occurrence!.id;
    w.retire(obId);
    const before = w.log.length;
    const p = w.activateFromInactive(obId, { recurrence: { kind: 'fixed-annual', month: 12, day: 10 }, notes: 'renewal portal' });
    expect(w.log.length).toBe(before + 1);
    expect(p.openOccurrence).toBeNull();
    expect(p.updateOccurrence).toMatchObject({ id, patch: { dueOn: '2026-12-10', touched: true } });
    expect(w.occ(id)).toMatchObject({ state: 'open', dueOn: '2026-12-10', touched: true });
    expect(w.openOf(obId)).toHaveLength(1);
    expect(w.ob(obId)).toMatchObject({ active: true, notes: 'renewal portal' });
    expect(JSON.parse(w.log.at(-1)!.newValue!)).toMatchObject({
      act: 'activated-from-inactive', fields: ['recurrence', 'notes'], reevaluatedOccurrenceId: id, openedOccurrenceId: null,
    });
    expect(w.log.at(-1)!.reason).toBe('Activated from Inactive · edited: rule, notes');
  });

  it('a retired row with an untouched next still open: a re-push-only edit re-queues it and touches nothing — re-activation never sets touched, and Undo survives', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 20 }));
    const obId = a.obligation.id;
    const B = w.done(a.occurrence!.id).next!.id;
    w.retire(obId);
    const p = w.activateFromInactive(obId, { weight: 'routine', outlookReminderDays: 10 });
    expect(p.openOccurrence).toBeNull();
    expect(p.updateOccurrence).toMatchObject({ id: B, patch: { syncStatus: 'pending' } });
    expect(p.updateOccurrence!.patch).not.toHaveProperty('touched');
    expect(w.occ(B).touched).toBe(false);
    expect(JSON.parse(w.log.at(-1)!.newValue!)).toMatchObject({ reevaluatedOccurrenceId: null, openedOccurrenceId: null });
    expect(w.canUndo(a.occurrence!.id)).toEqual({ ok: true });
  });

  it('an unchanged form writes no field patch — only the re-activation, with no fields named', () => {
    const w = world('2026-09-01');
    const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }));
    const obId = a.obligation.id;
    w.retire(obId);
    w.done(a.occurrence!.id);
    w.setToday('2026-09-20');
    const p = w.activateFromInactive(obId, { recurrence: { kind: 'fixed-annual', month: 10, day: 15 }, leadDays: 30, weight: 'hard', notes: '' });
    expect(p.obligationPatch).toEqual({ active: true, updatedAt: expect.any(String) });
    expect(p.openOccurrence).toMatchObject({ dueOn: '2027-10-15', periodLabel: '2027' });
    const line = w.log.at(-1)!;
    expect(JSON.parse(line.newValue!)).toMatchObject({ fields: [], values: { active: true }, openedOccurrenceId: p.openOccurrence!.id });
    expect(JSON.parse(line.oldValue!)).toEqual({ active: false });
    expect(line.reason).toMatch(/^Activated from Inactive · occurrence 2027 opened, rule date /);
  });

  it('refuses exactly what the two plans it replaced refused, with the same sentence, and plans the same writes where they allowed — reactivationProblem returns the same refusal', () => {
    type Built = { w: ReturnType<typeof world>; obId: string };
    const inactiveAnnual = (): Built => {
      const w = world('2026-09-11');
      return { w, obId: w.activate(activation({ kind: 'fixed-annual' }, { active: false })).obligation.id };
    };
    const retiredOpenAnnual = (): Built => {
      const w = world('2026-09-10');
      const a = w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 }));
      w.retire(a.obligation.id);
      return { w, obId: a.obligation.id };
    };
    const doneOneTime = (): Built => {
      const w = world('2026-09-11');
      const a = w.activate(activation({ kind: 'one-time', dueOn: '2026-10-01' }));
      w.done(a.occurrence!.id);
      w.setToday('2026-10-05');
      return { w, obId: a.obligation.id };
    };
    const MARCH_15: FirmObligationPatch = { recurrence: { kind: 'fixed-annual', month: 3, day: 15 } };
    const cases: { label: string; build: () => Built; patch: FirmObligationPatch; inputs?: { lastPeriodCompleted?: string }; refused: boolean }[] = [
      { label: 'already active', build: () => {
        const w = world('2026-09-11');
        return { w, obId: w.activate(activation({ kind: 'fixed-annual', month: 12, day: 1 })).obligation.id };
      }, patch: {}, refused: true },
      { label: 'still undated', build: inactiveAnnual, patch: {}, refused: true },
      { label: '"last period completed" names no period', build: inactiveAnnual, patch: MARCH_15, inputs: { lastPeriodCompleted: '2026-03-10' }, refused: true },
      { label: '"last period completed" in the future', build: inactiveAnnual, patch: MARCH_15, inputs: { lastPeriodCompleted: '2027-03-15' }, refused: true },
      { label: 'an Outlook reminder below zero', build: inactiveAnnual, patch: { ...MARCH_15, outlookReminderDays: -1 }, refused: true },
      { label: 'a key outside the editable set', build: inactiveAnnual, patch: { active: true } as unknown as FirmObligationPatch, refused: true },
      { label: '"last period completed" on a row with history', build: () => {
        const w = world('2026-09-01');
        const a = w.activate(activation({ kind: 'fixed-annual', month: 10, day: 15 }));
        w.retire(a.obligation.id);
        w.done(a.occurrence!.id);
        return { w, obId: a.obligation.id };
      }, patch: {}, inputs: { lastPeriodCompleted: '2025-10-15' }, refused: true },
      { label: 'a one-time row already done on its date', build: doneOneTime, patch: {}, refused: true },
      { label: 'a weekend-rule change that would un-overdue a retired row\'s open occurrence (FOD-4)', build: () => {
        const w = world('2026-12-01');
        const a = w.activate(activation({ kind: 'fixed-annual', month: 1, day: 30 }, { weekendRule: 'no-roll' }));
        w.retire(a.obligation.id);
        w.setToday('2027-01-31');
        return { w, obId: a.obligation.id };
      }, patch: { weekendRule: 'rolls-forward' }, refused: true },
      { label: 'dated, with a "last period completed" that names a period', build: inactiveAnnual, patch: MARCH_15, inputs: { lastPeriodCompleted: '2026-03-15' }, refused: false },
      { label: 'a one-time row given a new date', build: doneOneTime, patch: { recurrence: { kind: 'one-time', dueOn: '2027-10-01' } }, refused: false },
      { label: 'a retired row with its occurrence open, re-dated', build: retiredOpenAnnual, patch: { recurrence: { kind: 'fixed-annual', month: 12, day: 10 } }, refused: false },
      { label: 'a retired row with its occurrence open, unchanged', build: retiredOpenAnnual, patch: {}, refused: false },
    ];
    const refusal = (f: () => unknown): string | null => {
      try { f(); return null; } catch (e) { return e instanceof Error ? e.message : String(e); }
    };
    for (const c of cases) {
      const { w, obId } = c.build();
      const ob = w.ob(obId);
      const all = w.occsOf(obId);
      const log = w.logFor(obId);
      const today = w.getToday();
      const ctxFor = (): ActContext => {
        let n = 0;
        return { today, nowIso: `${today}T12:00:00.000Z`, newId: () => `n-${++n}`, user: 't' };
      };
      // The path the Inactive form took before #156 A7: the edit (only when something
      // changed), then the re-activation of the edited obligation — two plans, two lines.
      const twoPlans = (ctx: ActContext) => {
        const edit = FO.changedFields(ob, c.patch).length > 0 ? planEdit(ob, c.patch, all, ctx, log) : null;
        const re = planReactivate(edit ? { ...ob, ...edit.obligationPatch } : ob, all, ctx, c.inputs);
        return { edit, re };
      };
      const before = refusal(() => twoPlans(ctxFor()));
      const after = refusal(() => planActivateFromInactive(ob, c.patch, all, ctxFor(), log, c.inputs));
      expect(after, c.label).toBe(before);
      expect(after === null, `${c.label} — ${after}`).toBe(!c.refused);
      expect(reactivationProblem(ob, c.patch, all, today, c.inputs), c.label).toBe(after);
      if (!c.refused) {
        const old = twoPlans(ctxFor());
        const one = planActivateFromInactive(ob, c.patch, all, ctxFor(), log, c.inputs);
        expect(one.obligationPatch, c.label).toEqual({ ...(old.edit?.obligationPatch ?? {}), ...old.re.obligationPatch });
        expect(one.updateOccurrence, c.label).toEqual(old.edit?.occurrence ?? null);
        expect(one.openOccurrence, c.label).toEqual(old.re.occurrence);
        expect(one.kept, c.label).toBe(old.edit?.kept ?? null);
      }
    }
  });
});

// ------------------------- §7 item 7, domain half — the Outlook-delete queue (A6; FXD-2)

describe('fix slice §7 item 7 (domain half) — Undo\'s Outlook delete, queued and retried (#156 A6; FXD-2)', () => {
  const at = (n: number) => `2026-09-1${n}T12:00:00.000Z`;
  const entry = (eventId: string, attempts: number): PendingOutlookDelete => ({ eventId, occurrenceId: `occ-${eventId}`, recordedAt: at(0), attempts });

  it('queuedDeletes appends the event at zero attempts, writes nothing in place, and queues one event once however often asked', () => {
    const ob = obWith();
    const one = queuedDeletes(ob, { eventId: 'ev-1', occurrenceId: 'occ-1' }, at(0));
    expect(one).toEqual([{ eventId: 'ev-1', occurrenceId: 'occ-1', recordedAt: at(0), attempts: 0 }]);
    expect(ob.pendingOutlookDeletes).toEqual([]);
    expect(queuedDeletes({ pendingOutlookDeletes: one }, { eventId: 'ev-1', occurrenceId: 'occ-1' }, at(5))).toEqual(one);
    const two = queuedDeletes({ pendingOutlookDeletes: one }, { eventId: 'ev-2', occurrenceId: 'occ-2' }, at(1));
    expect(two.map((e) => e.eventId)).toEqual(['ev-1', 'ev-2']);
    expect(queuedDeletes({ pendingOutlookDeletes: two }, { eventId: 'ev-2', occurrenceId: 'occ-2' }, at(2))).toEqual(two);
    // A row read before the v18 step carries no queue: it queues from empty.
    expect(queuedDeletes({} as Pick<FirmObligation, 'pendingOutlookDeletes'>, { eventId: 'ev-3', occurrenceId: 'occ-3' }, at(3))).toHaveLength(1);
  });

  it('settledDeletes: "deleted" (2xx or 404) removes the entry; "failed" counts the attempt and keeps it; other entries are untouched', () => {
    const queue = [entry('ev-1', 0), entry('ev-2', 4)];
    expect(settledDeletes({ pendingOutlookDeletes: queue }, 'ev-1', 'deleted')).toEqual([queue[1]]);
    expect(settledDeletes({ pendingOutlookDeletes: queue }, 'ev-2', 'failed')).toEqual([queue[0], { ...queue[1], attempts: 5 }]);
    expect(settledDeletes({ pendingOutlookDeletes: queue }, 'ev-unknown', 'failed')).toEqual(queue);
    expect(settledDeletes({ pendingOutlookDeletes: queue }, 'ev-unknown', 'deleted')).toEqual(queue);
    expect(queue[1].attempts).toBe(4);
  });

  it('Undo → queued → failed drains → named under Needs attention at the third, never before → a later success removes it', () => {
    const w = world('2026-09-10');
    const a = w.activate(activation({ kind: 'fixed-monthly', day: 20 }));
    const next = w.done(a.occurrence!.id).next!;
    w.occ(next.id).outlookEventId = 'ev-next';
    const u = w.undo(a.occurrence!.id);
    expect(JSON.parse(u.log.newValue!).removedNextOutlookEventId).toBe('ev-next');
    const ob = w.ob(a.obligation.id);
    ob.pendingOutlookDeletes = queuedDeletes(ob, { eventId: u.removeOccurrence!.outlookEventId!, occurrenceId: u.removeOccurrence!.id }, at(0));
    const stuck = () => registerView(w.obligations, w.occurrences, '2026-09-10').stuckDeletes;
    expect(PENDING_DELETE_ATTENTION_ATTEMPTS).toBe(3);
    expect(stuck()).toEqual([]);
    for (const attempt of [1, 2]) {
      ob.pendingOutlookDeletes = settledDeletes(ob, 'ev-next', 'failed');
      expect(stuck(), `after failed attempt ${attempt}`).toEqual([]);
    }
    ob.pendingOutlookDeletes = settledDeletes(ob, 'ev-next', 'failed');
    expect(stuck()).toEqual([{ obligation: ob, entry: { eventId: 'ev-next', occurrenceId: next.id, recordedAt: at(0), attempts: 3 } }]);
    ob.pendingOutlookDeletes = settledDeletes(ob, 'ev-next', 'failed');
    expect(stuck().map((s) => s.entry.attempts)).toEqual([4]);
    ob.pendingOutlookDeletes = settledDeletes(ob, 'ev-next', 'deleted');
    expect(ob.pendingOutlookDeletes).toEqual([]);
    expect(stuck()).toEqual([]);
  });

  it('registerView.stuckDeletes names every entry at three attempts or more with its obligation, by obligation name — retired rows too — and nothing below', () => {
    const obs = [
      obWith({ id: 'b', name: 'Beta', pendingOutlookDeletes: [entry('b3', 3), entry('b2', 2)] }),
      obWith({ id: 'a', name: 'Alpha', active: false, pendingOutlookDeletes: [entry('a7', 7)] }),
      obWith({ id: 'c', name: 'Gamma', pendingOutlookDeletes: undefined as unknown as PendingOutlookDelete[] }),
      obWith({ id: 'd', name: 'Delta', pendingOutlookDeletes: [entry('d0', 0)] }),
    ];
    const view = registerView(obs, [], '2026-09-10');
    expect(view.stuckDeletes.map((s) => [s.obligation.id, s.entry.eventId, s.entry.attempts])).toEqual([['a', 'a7', 7], ['b', 'b3', 3]]);
    expect(obs.map((o) => o.id)).toEqual(['b', 'a', 'c', 'd']);
    expect(registerView([obWith()], [], '2026-09-10').stuckDeletes).toEqual([]);
  });
});
