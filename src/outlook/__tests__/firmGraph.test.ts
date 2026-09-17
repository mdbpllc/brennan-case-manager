// FIRM OBLIGATIONS — the no-case Outlook sibling in src/outlook/graph.ts.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 7 and §7 item 15
// (DECISION 7; FOD-22, FOD-28, FOD-29), with §2.3 and §7 item 5 for the weekend
// dates. FOS-1 RULED YES by Michael 2026-09-10 ("Yes"), session log #155.
//
// The reminder limb as amended: docs/specs/firm-obligations-fix-slice.md §3 items 2 and 3,
// §7 items 1 and 2 (#156 §1 item 6(a) and 6(b) — A1, A2; FXD-8, FXD-9, FXD-10, FXD-11).
// FOS-2 RULED YES by Michael 2026-09-12 ("Yes"), session log #156. Everything in the
// payload but its two reminder keys is pinned UNCHANGED by that amendment (slice §8).
//
// NO NETWORK. `fetch` is a stub that answers from a queue and throws on any call it
// was not given a reply for; `localStorage` is an in-memory map (the
// addressModelStoreV16 idiom), so both calendar-id caches can be inspected.
//
// The weekend rows are slice §7 item 5's own: R = Sat Jan 30 2027 (and Sun Jan 31),
// T = Fri Jan 29, D = Mon Feb 1 under rolls-forward. The dates are asserted as
// literals AND checked against the domain's formatDate first, so a wrong fixture and
// a wrong formatter cannot pass by agreeing with each other.

import { describe, it, expect, vi, beforeEach, afterEach, expectTypeOf } from 'vitest';
import type { FirmObligation, FirmObligationOccurrence } from '../../domain/firmObligations';
import {
  FOD1_NOTE, WEEKEND_RULES, defaultReminderDays, formatDate, lightsOn, reminderOn,
} from '../../domain/firmObligations';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

// config.ts reads both calendar names from import.meta.env when it evaluates, and a
// developer's .env may set either. Unset both BEFORE graph.ts (and the config it
// imports) loads, so these tests see the shipped defaults and nothing local.
vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', undefined);
vi.stubEnv('VITE_OUTLOOK_CALENDAR_NAME', undefined);

const {
  MATTER_PROP_ID, GraphNotFoundError, ensureCalendar,
  ensureFirmCalendar, forgetFirmCalendar, toGraphFirmEvent,
  pushFirmOccurrenceToOutlook, deleteFirmOutlookEvent,
} = await import('../graph');
const { OUTLOOK_CALENDAR_NAME, OUTLOOK_FIRM_CALENDAR_NAME } = await import('../config');

const GRAPH = 'https://graph.microsoft.com/v1.0';
const FIRM_KEY = 'bcm-outlook-firm-calendar-id';
const CASE_KEY = 'bcm-outlook-calendar-id';
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const STAMP = '2026-09-11T00:00:00.000Z';

// ---- fixtures: fictional rows — no firm fact, no client data

function obligation(over: Partial<FirmObligation> = {}): FirmObligation {
  return {
    id: 'ob-1',
    name: 'Practice-time report',
    category: 'court-appointments',
    ownerScope: 'attorney',
    recurrence: { kind: 'fixed-annual', month: 10, day: 15 },
    precision: 'day',
    missedPeriods: 'serial',
    conditionalPerPeriod: false,
    weekendRule: 'unknown',
    leadDays: 30,
    weight: 'hard',
    outlookReminderDays: 30,
    pendingOutlookDeletes: [],
    active: true,
    createdAt: STAMP,
    updatedAt: STAMP,
    ...over,
  };
}

function occurrence(over: Partial<FirmObligationOccurrence> = {}): FirmObligationOccurrence {
  return {
    id: 'occ-1',
    obligationId: 'ob-1',
    periodLabel: '2026',
    dueOn: '2026-10-15',
    state: 'open',
    syncStatus: 'pending',
    touched: false,
    createdAt: STAMP,
    updatedAt: STAMP,
    ...over,
  };
}

/** Slice §7 item 5's row: R = Sat Jan 30 2027, a 30-day lead. */
const jan30 = (weekendRule: FirmObligation['weekendRule']) => ({
  ob: obligation({ name: 'Annual filing', recurrence: { kind: 'fixed-annual', month: 1, day: 30 }, weekendRule }),
  occ: occurrence({ periodLabel: '2027', dueOn: '2027-01-30' }),
});

const bodyLines = (p: Record<string, unknown>) =>
  (p.body as { contentType: string; content: string }).content.split('\n');
const startOf = (p: Record<string, unknown>) => (p.start as { dateTime: string }).dateTime;
const endOf = (p: Record<string, unknown>) => (p.end as { dateTime: string }).dateTime;

// ---- the Graph stub

/** A fetch that answers from `replies` in order and throws on any call beyond them. */
function stubGraph(...replies: Response[]) {
  const spy = vi.fn<typeof fetch>(async () => {
    const next = replies.shift();
    if (!next) throw new Error('unexpected fetch: no stubbed Graph reply left');
    return next;
  });
  vi.stubGlobal('fetch', spy);
  const calls = () => spy.mock.calls.map(([input, init]) => ({
    url: String(input),
    method: init?.method ?? 'GET',
    body: typeof init?.body === 'string' ? (JSON.parse(init.body) as unknown) : undefined,
  }));
  return { spy, calls };
}
const reply = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const bare = (status: number) => new Response(status === 204 ? null : 'stub', { status });

beforeEach(() => mem.clear());
afterEach(() => vi.unstubAllGlobals());

describe('the dates the domain formats — checked before anything leans on them', () => {
  it('names the slice §7 item 5 days correctly', () => {
    expect(formatDate('2027-01-29')).toBe('Fri Jan 29, 2027');
    expect(formatDate('2027-01-30')).toBe('Sat Jan 30, 2027');
    expect(formatDate('2027-01-31')).toBe('Sun Jan 31, 2027');
    expect(formatDate('2027-02-01')).toBe('Mon Feb 1, 2027');
    expect(formatDate('2026-10-15')).toBe('Thu Oct 15, 2026');
  });
});

describe('toGraphFirmEvent — the payload (DECISION 7; slice §7 item 15)', () => {
  it('a weekday rule date: all-day on R itself, the whole payload exact', () => {
    expect(toGraphFirmEvent(occurrence(), obligation())).toEqual({
      subject: 'Firm obligation: Practice-time report (2026)',
      body: { contentType: 'text', content: 'Firm obligation — no matter\nDue Thu Oct 15, 2026' },
      isAllDay: true,
      start: { dateTime: '2026-10-15T00:00:00', timeZone: tz },
      end: { dateTime: '2026-10-16T00:00:00', timeZone: tz },
      categories: ['MDBP Firm'],
      singleValueExtendedProperties: [{ id: MATTER_PROP_ID, value: 'FIRM|ob-1|occ-1' }],
      isReminderOn: true,
      reminderMinutesBeforeStart: 30 * 1440,
    });
  });

  it('on a weekday rule date all three weekend rules agree — T = D = R, no roll line', () => {
    const [first, ...rest] = WEEKEND_RULES.map((weekendRule) =>
      toGraphFirmEvent(occurrence(), obligation({ weekendRule })));
    for (const p of rest) expect(p).toEqual(first);
    expect(bodyLines(first)).toEqual(['Firm obligation — no matter', 'Due Thu Oct 15, 2026']);
  });

  it('the end is exclusive, across a month and a year boundary', () => {
    const p = toGraphFirmEvent(occurrence({ dueOn: '2026-12-31' }), obligation());
    expect(startOf(p)).toBe('2026-12-31T00:00:00');
    expect(endOf(p)).toBe('2027-01-01T00:00:00');
  });

  describe('R = Sat Jan 30 2027 — the event sits on the TARGET, Fri Jan 29, under every weekend rule', () => {
    it.each(WEEKEND_RULES)('%s: all-day Fri Jan 29', (rule) => {
      const { ob, occ } = jan30(rule);
      const p = toGraphFirmEvent(occ, ob);
      expect(p.isAllDay).toBe(true);
      expect(startOf(p)).toBe('2027-01-29T00:00:00');
      expect(endOf(p)).toBe('2027-01-30T00:00:00');
    });

    it('rolls-forward: due Mon Feb 1, and the roll said plainly', () => {
      const { ob, occ } = jan30('rolls-forward');
      expect(bodyLines(toGraphFirmEvent(occ, ob))).toEqual([
        'Firm obligation — no matter',
        'Due Mon Feb 1, 2027',
        'Rule date Sat Jan 30, 2027 — rolls to Mon Feb 1, 2027',
      ]);
    });

    it('no-roll: due Sat Jan 30, and no roll line', () => {
      const { ob, occ } = jan30('no-roll');
      expect(bodyLines(toGraphFirmEvent(occ, ob))).toEqual([
        'Firm obligation — no matter',
        'Due Sat Jan 30, 2027',
      ]);
    });

    it("unknown: the FOD-1 note in the roll line's place — no roll computed, no Monday anywhere", () => {
      const { ob, occ } = jan30('unknown');
      const p = toGraphFirmEvent(occ, ob);
      expect(bodyLines(p)).toEqual([
        'Firm obligation — no matter',
        'Due Sat Jan 30, 2027',
        `Rule date Sat Jan 30, 2027 — ${FOD1_NOTE}`,
      ]);
      const text = JSON.stringify(p);
      expect(text).not.toContain('rolls to');
      expect(text).not.toContain('Feb 1');
      expect(text).not.toMatch(/overdue/i);
    });
  });

  it('R = Sun Jan 31 2027 pins the same way: Fri Jan 29; rolls-forward due Mon Feb 1; no-roll due Sun Jan 31', () => {
    const ob = (weekendRule: FirmObligation['weekendRule']) =>
      obligation({ recurrence: { kind: 'fixed-annual', month: 1, day: 31 }, weekendRule });
    const occ = occurrence({ periodLabel: '2027', dueOn: '2027-01-31' });
    for (const rule of WEEKEND_RULES) {
      expect(startOf(toGraphFirmEvent(occ, ob(rule)))).toBe('2027-01-29T00:00:00');
    }
    expect(bodyLines(toGraphFirmEvent(occ, ob('rolls-forward'))).slice(1)).toEqual([
      'Due Mon Feb 1, 2027',
      'Rule date Sun Jan 31, 2027 — rolls to Mon Feb 1, 2027',
    ]);
    expect(bodyLines(toGraphFirmEvent(occ, ob('no-roll'))).slice(1)).toEqual(['Due Sun Jan 31, 2027']);
  });

  it('the due-date override IS R: a weekday override moves the event and clears the roll', () => {
    const { ob } = jan30('rolls-forward');
    const p = toGraphFirmEvent(
      occurrence({ periodLabel: '2027', dueOn: '2027-01-30', dueOnOverride: '2027-02-03' }), ob,
    );
    expect(startOf(p)).toBe('2027-02-03T00:00:00');
    expect(bodyLines(p).slice(1)).toEqual(['Due Wed Feb 3, 2027']);
  });

  it("the subject is DECISION 7's own shape; Done prefixes it and keeps the event; reopening restores it (FOD-22)", () => {
    const ob = obligation();
    const open = occurrence();
    const done: FirmObligationOccurrence = { ...open, state: 'done', doneOn: '2026-10-01', outcome: 'completed' };
    const pOpen = toGraphFirmEvent(open, ob);
    const pDone = toGraphFirmEvent(done, ob);
    expect(pOpen.subject).toBe('Firm obligation: Practice-time report (2026)');
    expect(pDone.subject).toBe('Done — Firm obligation: Practice-time report (2026)');
    // Kept, not moved: the same day and the same identity on the extended property.
    expect(startOf(pDone)).toBe(startOf(pOpen));
    expect(pDone.singleValueExtendedProperties).toEqual(pOpen.singleValueExtendedProperties);
    // Undo reopens the row; its re-push is the open payload again — subject and reminder both.
    const reopened: FirmObligationOccurrence = { ...done, state: 'open', doneOn: undefined, outcome: undefined };
    expect(toGraphFirmEvent(reopened, ob)).toEqual(pOpen);
  });

  it("a SPEC §7 name reaches the subject without its markdown — FOT-27's backticks never reach Outlook (review L5-08)", () => {
    const ob = obligation({ name: 'Domain renewal — `brennanstx.com`' });
    const open = toGraphFirmEvent(occurrence(), ob);
    expect(open.subject).toBe('Firm obligation: Domain renewal — brennanstx.com (2026)');
    expect(toGraphFirmEvent(occurrence({ state: 'done', doneOn: '2026-10-01', outcome: 'completed' }), ob).subject)
      .toBe('Done — Firm obligation: Domain renewal — brennanstx.com (2026)');
    expect(JSON.stringify(open)).not.toContain('`');
    // Only the display changed: the stored name keeps its backticks.
    expect(ob.name).toBe('Domain renewal — `brennanstx.com`');
  });

  it('category MDBP Firm, and FIRM|obligationId|occurrenceId on the EXISTING property id', () => {
    expect(MATTER_PROP_ID).toBe('String {b7f2a6e0-52c1-47d8-9b3a-1e64c02f7d15} Name bcmMatterRef');
    const p = toGraphFirmEvent(occurrence({ id: 'occ-77', obligationId: 'ob-42' }), obligation({ id: 'ob-42' }));
    expect(p.categories).toEqual(['MDBP Firm']);
    expect(p.singleValueExtendedProperties).toEqual([{ id: MATTER_PROP_ID, value: 'FIRM|ob-42|occ-77' }]);
    expect(JSON.stringify(p)).not.toContain('MDBP Case');
  });
});

// REPLACED 2026-09-16 (FOS-2): the FOS-1 tests here pinned `isReminderOn: true` open and
// done alike, and `reminderMinutesBeforeStart` at the LIT moment (FOD-29 as ruled
// 2026-09-11). #156 amended both — the reminder rings on a HARD row only, on the
// reminder day, and a closed occurrence's reminder is off — so those pins are replaced
// by the rule below, not kept beside it.

/** The REAL minutes between two local midnights, computed from elapsed milliseconds —
 *  independently of the implementation's days-plus-offset arithmetic. */
const realMinutes = (from: string, to: string) => {
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  return (new Date(ty, tm - 1, td).getTime() - new Date(fy, fm - 1, fd).getTime()) / 60000;
};
const offsetsDiffer = (a: string, b: string) => {
  const off = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).getTimezoneOffset(); };
  return off(a) !== off(b);
};

/** Runs `body` with the zone PINNED to America/Chicago (review L2-F7). Left to the
 *  machine's zone, a runner on UTC has no clock change in any window and a naive
 *  days × 1440 would pass. Node re-reads TZ when process.env.TZ is ASSIGNED, so every
 *  Date inside — the implementation's and realMinutes' alike — runs in Chicago. The
 *  zone in force before the pin is put back by assigning it again: DELETING TZ does not
 *  make Node re-read the zone (checked on Node 24), so a delete would leave Chicago
 *  pinned for every later test. (`process` is reached through globalThis: the app's
 *  type-check does not load Node's types.) */
function inChicago(body: () => void): void {
  const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } }).process.env;
  const saved = env.TZ ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  env.TZ = 'America/Chicago';
  try {
    body();
  } finally {
    env.TZ = saved;
  }
}

describe('reminderMinutesBeforeStart — ON THE REMINDER DAY (#156 §1 item 6(b), A1; slice §3 item 2, §7 item 1)', () => {
  const minutes = (ob: FirmObligation, occ: FirmObligationOccurrence) =>
    toGraphFirmEvent(occ, ob).reminderMinutesBeforeStart;

  it('hard, lead 180, reminder 30: the real minutes from 00:00 on T−30 to 00:00 on T — 43,200, or 43,140 / 43,260 across a clock change', () => {
    inChicago(() => {
      // Fail loudly if the pin did not take: without a real offset change inside the two
      // clock-change windows (and none in the plain one), the assertions prove nothing.
      expect(offsetsDiffer('2026-09-15', '2026-10-15'), 'no clock change expected Sep 15 – Oct 15 2026').toBe(false);
      expect(offsetsDiffer('2027-03-01', '2027-03-31'), 'TZ pin did not take: no clock change Mar 1 – Mar 31 2027').toBe(true);
      expect(offsetsDiffer('2027-10-31', '2027-11-30'), 'TZ pin did not take: no clock change Oct 31 – Nov 30 2027').toBe(true);
      const ob = obligation({ leadDays: 180, outlookReminderDays: 30 });

      // No clock change: T Thu Oct 15 2026, the reminder day Tue Sep 15.
      const plain = occurrence();
      expect(reminderOn(ob, plain)).toBe('2026-09-15');
      expect(toGraphFirmEvent(plain, ob).isReminderOn).toBe(true);
      expect(minutes(ob, plain)).toBe(realMinutes('2026-09-15', '2026-10-15'));
      expect(minutes(ob, plain)).toBe(43_200);
      // The lead is the register's window, not the reminder's: the row lights 180 days out.
      expect(lightsOn(ob, plain)).toBe('2026-04-18');

      // Spring forward (Sun Mar 14 2027) inside: T Wed Mar 31 2027, the reminder day Mon Mar 1 — an hour short.
      const spring = occurrence({ periodLabel: '2027', dueOn: '2027-03-31' });
      expect(reminderOn(ob, spring)).toBe('2027-03-01');
      expect(minutes(ob, spring)).toBe(realMinutes('2027-03-01', '2027-03-31'));
      expect(minutes(ob, spring)).toBe(43_140);

      // Fall back (Sun Nov 7 2027) inside: T Tue Nov 30 2027, the reminder day Sun Oct 31 — an hour long.
      const fall = occurrence({ periodLabel: '2027', dueOn: '2027-11-30' });
      expect(reminderOn(ob, fall)).toBe('2027-10-31');
      expect(minutes(ob, fall)).toBe(realMinutes('2027-10-31', '2027-11-30'));
      expect(minutes(ob, fall)).toBe(43_260);
    });
  });

  it('the stored days are what fire, whatever the lead: days × 1440, counted back from T', () => {
    inChicago(() => {
      // T = Thu Oct 15 2026; the longest window starts Apr 18 — after March's change, before November's.
      for (const outlookReminderDays of [0, 5, 30, 45, 180]) {
        for (const leadDays of [5, 30, 180]) {
          expect(minutes(obligation({ leadDays, outlookReminderDays }), occurrence())).toBe(outlookReminderDays * 1440);
        }
      }
      // §7 item 5's weekend row: T = Fri Jan 29 2027, the reminder day Dec 30 2026 — thirty days to T, not to R.
      const { ob, occ } = jan30('rolls-forward');
      expect(reminderOn(ob, occ)).toBe('2026-12-30');
      expect(minutes(ob, occ)).toBe(30 * 1440);
    });
  });

  it('hard, lead 5: the pre-fill is 5 (FXD-9), and 5 days is what fires', () => {
    inChicago(() => {
      const ob = obligation({ leadDays: 5, outlookReminderDays: defaultReminderDays(5) });
      expect(ob.outlookReminderDays).toBe(5);
      const p = toGraphFirmEvent(occurrence(), ob);
      expect(p.isReminderOn).toBe(true);
      expect(p.reminderMinutesBeforeStart).toBe(5 * 1440);
      expect(reminderOn(ob, occurrence())).toBe('2026-10-10');
    });
  });

  it('hard, raised by hand to 60 with lead 30: 60 days fires — it rings BEFORE the row lights (FXD-9)', () => {
    inChicago(() => {
      const ob = obligation({ leadDays: 30, outlookReminderDays: 60 });
      const p = toGraphFirmEvent(occurrence(), ob);
      expect(p.isReminderOn).toBe(true);
      // T Thu Oct 15 2026 back to Sun Aug 16 — no clock change inside.
      expect(p.reminderMinutesBeforeStart).toBe(realMinutes('2026-08-16', '2026-10-15'));
      expect(p.reminderMinutesBeforeStart).toBe(60 * 1440);
      expect(reminderOn(ob, occurrence())).toBe('2026-08-16');
      expect(lightsOn(ob, occurrence())).toBe('2026-09-15');
      expect(reminderOn(ob, occurrence()) < lightsOn(ob, occurrence())).toBe(true);
    });
  });

  it('routine: NO reminder — isReminderOn false and 0 minutes, whatever the days and the lead (FXD-8)', () => {
    for (const outlookReminderDays of [0, 5, 30, 60]) {
      for (const leadDays of [5, 30, 180]) {
        const p = toGraphFirmEvent(occurrence(), obligation({ weight: 'routine', leadDays, outlookReminderDays }));
        expect(p.isReminderOn).toBe(false);
        expect(p.reminderMinutesBeforeStart).toBe(0);
      }
    }
  });

  it("month precision keys off T exactly as day precision does — never FOM-6's 1st of the month (FXD-11)", () => {
    inChicago(() => {
      const monthly = (leadDays: number, outlookReminderDays: number) =>
        obligation({ precision: 'month', leadDays, outlookReminderDays });
      // R = Wed Mar 31 2027, the month's last day (FOD-31). The row LIGHTS Mar 1 (FOM-6,
      // unchanged); the reminder rings Fri Mar 26, five days before T.
      const mar = occurrence({ periodLabel: '2027', dueOn: '2027-03-31' });
      expect(lightsOn(monthly(5, 5), mar)).toBe('2027-03-01');
      expect(reminderOn(monthly(5, 5), mar)).toBe('2027-03-26');
      expect(minutes(monthly(5, 5), mar)).toBe(5 * 1440);
      // R = Sun Jan 31 2027: T = Fri Jan 29; lights Jan 1, but the reminder is 30 days before T.
      const jan = occurrence({ periodLabel: '2027', dueOn: '2027-01-31' });
      expect(lightsOn(monthly(5, 30), jan)).toBe('2027-01-01');
      expect(reminderOn(monthly(5, 30), jan)).toBe('2026-12-30');
      expect(minutes(monthly(5, 30), jan)).toBe(30 * 1440);
      // The override carries the real date (FOD-31): T Fri Mar 19, the reminder day Sun Mar 14 —
      // the spring-forward day itself, so the real minutes are an hour short of 5 × 1440.
      const overridden = { ...mar, dueOnOverride: '2027-03-19' };
      expect(reminderOn(monthly(5, 5), overridden)).toBe('2027-03-14');
      expect(minutes(monthly(5, 5), overridden)).toBe(realMinutes('2027-03-14', '2027-03-19'));
      expect(minutes(monthly(5, 5), overridden)).toBe(5 * 1440 - 60);
    });
  });
});

describe('Done, Not applicable and Undo on the event (#156 §1 item 6(a), A2; FXD-10; slice §3 item 3, §7 item 2)', () => {
  const open = occurrence();
  const done: FirmObligationOccurrence = { ...open, state: 'done', doneOn: '2026-10-01', outcome: 'completed' };
  const notApplicable: FirmObligationOccurrence = {
    ...open, state: 'done', doneOn: '2026-10-01', outcome: 'not-applicable', outcomeReason: 'condition-not-met',
  };

  it('Done: the subject "Done — …" and the reminder OFF, with 0 minutes — the event kept on its day', () => {
    for (const weight of ['hard', 'routine'] as const) {
      const ob = obligation({ weight });
      const p = toGraphFirmEvent(done, ob);
      expect(p.subject).toBe('Done — Firm obligation: Practice-time report (2026)');
      expect(p.isReminderOn).toBe(false);
      expect(p.reminderMinutesBeforeStart).toBe(0);
      expect(startOf(p)).toBe(startOf(toGraphFirmEvent(open, ob)));
    }
  });

  it('Not applicable closes the event exactly as Done does (FXD-10)', () => {
    for (const weight of ['hard', 'routine'] as const) {
      const ob = obligation({ weight });
      const p = toGraphFirmEvent(notApplicable, ob);
      expect(p.subject).toBe('Done — Firm obligation: Practice-time report (2026)');
      expect(p.isReminderOn).toBe(false);
      expect(p.reminderMinutesBeforeStart).toBe(0);
      expect(p).toEqual(toGraphFirmEvent(done, ob));
    }
  });

  it('Undo (the state open again): the original subject, and the reminder per weight — on for hard, off for routine', () => {
    inChicago(() => {
      for (const closed of [done, notApplicable]) {
        const reopened: FirmObligationOccurrence = {
          ...closed, state: 'open', doneOn: undefined, outcome: undefined, outcomeReason: undefined,
        };
        const hard = toGraphFirmEvent(reopened, obligation());
        expect(hard.subject).toBe('Firm obligation: Practice-time report (2026)');
        expect(hard.isReminderOn).toBe(true);
        expect(hard.reminderMinutesBeforeStart).toBe(30 * 1440);
        expect(hard).toEqual(toGraphFirmEvent(open, obligation()));

        const routine = toGraphFirmEvent(reopened, obligation({ weight: 'routine' }));
        expect(routine.subject).toBe('Firm obligation: Practice-time report (2026)');
        expect(routine.isReminderOn).toBe(false);
        expect(routine.reminderMinutesBeforeStart).toBe(0);
      }
    });
  });
});

describe('everything but the two reminder keys is UNCHANGED by #156 — all-day shape, start/end, subject, body, category, property (slice §8; DECISION 7)', () => {
  // Pinned against the FOS-1 expectations above, restated literally per shape, so a
  // payload change outside `isReminderOn` / `reminderMinutesBeforeStart` fails here. The
  // CALENDAR is not in the payload: the POST's URL (pushFirmOccurrenceToOutlook, below)
  // and ensureFirmCalendar's tests pin it.
  const REMINDER_KEYS = ['isReminderOn', 'reminderMinutesBeforeStart'];
  const withoutReminder = (p: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(p).filter(([k]) => !REMINDER_KEYS.includes(k)));
  const HEAD = 'Firm obligation — no matter';
  const pre = (subject: string, lines: string[], start: string, end: string, ids = 'FIRM|ob-1|occ-1') => ({
    subject,
    body: { contentType: 'text', content: [HEAD, ...lines].join('\n') },
    isAllDay: true,
    start: { dateTime: `${start}T00:00:00`, timeZone: tz },
    end: { dateTime: `${end}T00:00:00`, timeZone: tz },
    categories: ['MDBP Firm'],
    singleValueExtendedProperties: [{ id: MATTER_PROP_ID, value: ids }],
  });
  const PTR = 'Firm obligation: Practice-time report (2026)';
  const oct15 = pre(PTR, ['Due Thu Oct 15, 2026'], '2026-10-15', '2026-10-16');
  const sun31 = (weekendRule: FirmObligation['weekendRule']) =>
    obligation({ recurrence: { kind: 'fixed-annual', month: 1, day: 31 }, weekendRule });
  const closed = { state: 'done', doneOn: '2026-10-01' } as const;

  const shapes: [string, FirmObligationOccurrence, FirmObligation, Record<string, unknown>][] = [
    ['weekday R, hard', occurrence(), obligation(), oct15],
    ['weekday R, routine', occurrence(), obligation({ weight: 'routine' }), oct15],
    ['weekday R, reminder raised past the lead', occurrence(), obligation({ outlookReminderDays: 60 }), oct15],
    ['weekday R, lead 180', occurrence(), obligation({ leadDays: 180 }), oct15],
    ['weekday R, reminder 0', occurrence(), obligation({ outlookReminderDays: 0 }), oct15],
    ...WEEKEND_RULES.map((weekendRule): [string, FirmObligationOccurrence, FirmObligation, Record<string, unknown>] =>
      [`weekday R, ${weekendRule}`, occurrence(), obligation({ weekendRule }), oct15]),
    ['across the year boundary', occurrence({ dueOn: '2026-12-31' }), obligation(),
      pre(PTR, ['Due Thu Dec 31, 2026'], '2026-12-31', '2027-01-01')],
    ['Sat Jan 30 2027, rolls-forward', jan30('rolls-forward').occ, jan30('rolls-forward').ob,
      pre('Firm obligation: Annual filing (2027)', ['Due Mon Feb 1, 2027', 'Rule date Sat Jan 30, 2027 — rolls to Mon Feb 1, 2027'], '2027-01-29', '2027-01-30')],
    ['Sat Jan 30 2027, no-roll', jan30('no-roll').occ, jan30('no-roll').ob,
      pre('Firm obligation: Annual filing (2027)', ['Due Sat Jan 30, 2027'], '2027-01-29', '2027-01-30')],
    ['Sat Jan 30 2027, unknown', jan30('unknown').occ, jan30('unknown').ob,
      pre('Firm obligation: Annual filing (2027)', ['Due Sat Jan 30, 2027', `Rule date Sat Jan 30, 2027 — ${FOD1_NOTE}`], '2027-01-29', '2027-01-30')],
    ['Sat Jan 30 2027, unknown, routine', jan30('unknown').occ, { ...jan30('unknown').ob, weight: 'routine' },
      pre('Firm obligation: Annual filing (2027)', ['Due Sat Jan 30, 2027', `Rule date Sat Jan 30, 2027 — ${FOD1_NOTE}`], '2027-01-29', '2027-01-30')],
    ['Sun Jan 31 2027, rolls-forward', occurrence({ periodLabel: '2027', dueOn: '2027-01-31' }), sun31('rolls-forward'),
      pre('Firm obligation: Practice-time report (2027)', ['Due Mon Feb 1, 2027', 'Rule date Sun Jan 31, 2027 — rolls to Mon Feb 1, 2027'], '2027-01-29', '2027-01-30')],
    ['Sun Jan 31 2027, no-roll', occurrence({ periodLabel: '2027', dueOn: '2027-01-31' }), sun31('no-roll'),
      pre('Firm obligation: Practice-time report (2027)', ['Due Sun Jan 31, 2027'], '2027-01-29', '2027-01-30')],
    ['a weekday due-date override', occurrence({ periodLabel: '2027', dueOn: '2027-01-30', dueOnOverride: '2027-02-03' }), jan30('rolls-forward').ob,
      pre('Firm obligation: Annual filing (2027)', ['Due Wed Feb 3, 2027'], '2027-02-03', '2027-02-04')],
    ['month precision, R Wed Mar 31 2027', occurrence({ periodLabel: '2027', dueOn: '2027-03-31' }),
      obligation({ precision: 'month', leadDays: 5, outlookReminderDays: 5 }),
      pre('Firm obligation: Practice-time report (2027)', ['Due Wed Mar 31, 2027'], '2027-03-31', '2027-04-01')],
    ['Done, hard', occurrence({ ...closed, outcome: 'completed' }), obligation(),
      pre(`Done — ${PTR}`, ['Due Thu Oct 15, 2026'], '2026-10-15', '2026-10-16')],
    ['Done, routine', occurrence({ ...closed, outcome: 'completed' }), obligation({ weight: 'routine' }),
      pre(`Done — ${PTR}`, ['Due Thu Oct 15, 2026'], '2026-10-15', '2026-10-16')],
    ['Not applicable', occurrence({ ...closed, outcome: 'not-applicable', outcomeReason: 'performed-elsewhere' }), obligation(),
      pre(`Done — ${PTR}`, ['Due Thu Oct 15, 2026'], '2026-10-15', '2026-10-16')],
    ['a SPEC §7 name with markdown', occurrence(), obligation({ name: 'Domain renewal — `brennanstx.com`' }),
      pre('Firm obligation: Domain renewal — brennanstx.com (2026)', ['Due Thu Oct 15, 2026'], '2026-10-15', '2026-10-16')],
    ['other ids', occurrence({ id: 'occ-77', obligationId: 'ob-42' }), obligation({ id: 'ob-42' }),
      pre(PTR, ['Due Thu Oct 15, 2026'], '2026-10-15', '2026-10-16', 'FIRM|ob-42|occ-77')],
  ];

  it.each(shapes)('%s', (_label, occ, ob, want) => {
    const p = toGraphFirmEvent(occ, ob);
    // The same keys as before, plus the two reminder keys — nothing added, nothing dropped.
    expect(Object.keys(p).sort()).toEqual([...Object.keys(want), ...REMINDER_KEYS].sort());
    expect(withoutReminder(p)).toEqual(want);
  });
});

describe('the firm calendar — SEPARATE, found by name, its own cache (DECISION 7; FOD-28)', () => {
  it("the shipped name is MDBP Firm, never the case calendar's", () => {
    expect(OUTLOOK_FIRM_CALENDAR_NAME).toBe('MDBP Firm');
    expect(OUTLOOK_CALENDAR_NAME).toBe('MDBP Cases');
  });

  it('VITE_OUTLOOK_FIRM_CALENDAR_NAME overrides it', async () => {
    vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', 'Firm Calendar Override');
    try {
      vi.resetModules();
      const fresh = await import('../config');
      expect(fresh.OUTLOOK_FIRM_CALENDAR_NAME).toBe('Firm Calendar Override');
    } finally {
      vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', undefined);
    }
  });

  it('the configured name — not a literal — is the name ensureFirmCalendar asks Graph for', async () => {
    vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', 'Firm Calendar Override');
    try {
      vi.resetModules();
      const fresh = await import('../graph');
      const { calls } = stubGraph(reply({ value: [{ id: 'cal-x' }] }));
      await fresh.ensureFirmCalendar('tok');
      expect(decodeURIComponent(calls()[0].url)).toBe(`${GRAPH}/me/calendars?$filter=name eq 'Firm Calendar Override'`);
    } finally {
      vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', undefined);
      vi.resetModules();
    }
  });

  it('REFUSES when the firm name is the case calendar name — before any Graph call, cached id or not', async () => {
    vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', 'mdbp cases');
    try {
      vi.resetModules();
      const fresh = await import('../graph');
      const { spy } = stubGraph();
      mem.set(FIRM_KEY, 'cal-cached');
      await expect(fresh.ensureFirmCalendar('tok')).rejects.toThrow(/separate calendars/);
      expect(spy).not.toHaveBeenCalled();
    } finally {
      vi.stubEnv('VITE_OUTLOOK_FIRM_CALENDAR_NAME', undefined);
      vi.resetModules();
    }
  });

  it('asks Graph for "MDBP Firm" and caches the id under its own key, never the case key', async () => {
    const { calls } = stubGraph(reply({ value: [{ id: 'cal-firm' }] }));
    expect(await ensureFirmCalendar('tok')).toBe('cal-firm');
    expect(calls()).toHaveLength(1);
    expect(calls()[0].method).toBe('GET');
    expect(decodeURIComponent(calls()[0].url)).toBe(`${GRAPH}/me/calendars?$filter=name eq 'MDBP Firm'`);
    expect(mem.get(FIRM_KEY)).toBe('cal-firm');
    expect(mem.has(CASE_KEY)).toBe(false);
  });

  it('creates it by that name when Graph has none', async () => {
    const { calls } = stubGraph(reply({ value: [] }), reply({ id: 'cal-new' }, 201));
    expect(await ensureFirmCalendar('tok')).toBe('cal-new');
    expect(calls()[1]).toEqual({ url: `${GRAPH}/me/calendars`, method: 'POST', body: { name: 'MDBP Firm' } });
    expect(mem.get(FIRM_KEY)).toBe('cal-new');
    expect(mem.has(CASE_KEY)).toBe(false);
  });

  it('a cached CASE calendar id never answers for the firm calendar', async () => {
    mem.set(CASE_KEY, 'cal-case');
    stubGraph(reply({ value: [{ id: 'cal-firm' }] }));
    expect(await ensureFirmCalendar('tok')).toBe('cal-firm');
    expect(mem.get(CASE_KEY)).toBe('cal-case');
  });

  it('and a cached FIRM calendar id never answers for the case calendar', async () => {
    mem.set(FIRM_KEY, 'cal-firm');
    const { calls } = stubGraph(reply({ value: [{ id: 'cal-case' }] }));
    expect(await ensureCalendar('tok')).toBe('cal-case');
    expect(decodeURIComponent(calls()[0].url)).toContain(`name eq '${OUTLOOK_CALENDAR_NAME}'`);
    expect(mem.get(FIRM_KEY)).toBe('cal-firm');
  });

  it('a cached firm id is served with no Graph call; forgetFirmCalendar clears that key alone', async () => {
    mem.set(FIRM_KEY, 'cal-firm');
    mem.set(CASE_KEY, 'cal-case');
    const { spy } = stubGraph();
    expect(await ensureFirmCalendar('tok')).toBe('cal-firm');
    expect(spy).not.toHaveBeenCalled();
    forgetFirmCalendar();
    expect(mem.has(FIRM_KEY)).toBe(false);
    expect(mem.get(CASE_KEY)).toBe('cal-case');
  });
});

describe('pushFirmOccurrenceToOutlook — PATCH, POST, and the 404 recreate', () => {
  const ob = obligation();

  it('POSTs into the firm calendar when the occurrence has never been pushed', async () => {
    const occ = occurrence();
    const { calls } = stubGraph(reply({ id: 'evt-new' }, 201));
    expect(await pushFirmOccurrenceToOutlook('tok', 'cal-firm', occ, ob)).toBe('evt-new');
    expect(calls()).toEqual([
      { url: `${GRAPH}/me/calendars/cal-firm/events`, method: 'POST', body: toGraphFirmEvent(occ, ob) },
    ]);
  });

  it('PATCHes the event it already has — the Done subject AND the reminder off ride that PATCH (FOD-22; #156 A2)', async () => {
    const occ = occurrence({ outlookEventId: 'evt-1', state: 'done', doneOn: '2026-10-01', outcome: 'completed' });
    const { calls } = stubGraph(reply({ id: 'evt-1' }));
    expect(await pushFirmOccurrenceToOutlook('tok', 'cal-firm', occ, ob)).toBe('evt-1');
    expect(calls()).toEqual([
      { url: `${GRAPH}/me/events/evt-1`, method: 'PATCH', body: toGraphFirmEvent(occ, ob) },
    ]);
    expect(calls()[0].body).toMatchObject({
      subject: 'Done — Firm obligation: Practice-time report (2026)',
      isReminderOn: false,
      reminderMinutesBeforeStart: 0,
    });
  });

  it("Undo's re-push PATCHes the SAME event back — the original subject and the hard row's reminder; no new event (#156 A2)", async () => {
    const reopened = occurrence({ outlookEventId: 'evt-1' });
    const { calls } = stubGraph(reply({ id: 'evt-1' }));
    expect(await pushFirmOccurrenceToOutlook('tok', 'cal-firm', reopened, ob)).toBe('evt-1');
    expect(calls().map((c) => `${c.method} ${c.url}`)).toEqual([`PATCH ${GRAPH}/me/events/evt-1`]);
    expect(calls()[0].body).toMatchObject({
      subject: 'Firm obligation: Practice-time report (2026)',
      isReminderOn: true,
      reminderMinutesBeforeStart: realMinutes('2026-09-15', '2026-10-15'),
    });
  });

  it('a 404 on the PATCH (deleted in Outlook) recreates it by POST and returns the new id', async () => {
    const occ = occurrence({ outlookEventId: 'evt-gone' });
    const { calls } = stubGraph(bare(404), reply({ id: 'evt-2' }, 201));
    expect(await pushFirmOccurrenceToOutlook('tok', 'cal-firm', occ, ob)).toBe('evt-2');
    expect(calls().map((c) => `${c.method} ${c.url}`)).toEqual([
      `PATCH ${GRAPH}/me/events/evt-gone`,
      `POST ${GRAPH}/me/calendars/cal-firm/events`,
    ]);
  });

  it('any other PATCH failure throws, and nothing is created', async () => {
    const { calls } = stubGraph(bare(500));
    await expect(pushFirmOccurrenceToOutlook('tok', 'cal-firm', occurrence({ outlookEventId: 'evt-1' }), ob))
      .rejects.toThrow(/PATCH .* 500/);
    expect(calls()).toHaveLength(1);
  });

  it('a 404 on the POST (the cached calendar deleted) surfaces as GraphNotFoundError for the caller to refresh', async () => {
    stubGraph(bare(404));
    await expect(pushFirmOccurrenceToOutlook('tok', 'cal-stale', occurrence(), ob))
      .rejects.toBeInstanceOf(GraphNotFoundError);
  });
});

describe('deleteFirmOutlookEvent', () => {
  it('DELETEs the event by id', async () => {
    const { calls } = stubGraph(bare(204));
    await expect(deleteFirmOutlookEvent('tok', 'evt-9')).resolves.toBeUndefined();
    expect(calls()).toEqual([{ url: `${GRAPH}/me/events/evt-9`, method: 'DELETE', body: undefined }]);
  });

  it('a 404 is fine — the event is already gone', async () => {
    stubGraph(bare(404));
    await expect(deleteFirmOutlookEvent('tok', 'evt-gone')).resolves.toBeUndefined();
  });

  it('any other failure throws', async () => {
    stubGraph(bare(500));
    await expect(deleteFirmOutlookEvent('tok', 'evt-9')).rejects.toThrow(/DELETE .* 500/);
  });
});

describe('no CaseRecord anywhere on the firm path (slice §7 item 15 — a type test)', () => {
  it('toGraphFirmEvent takes (occurrence, obligation) and nothing else', () => {
    // Compile-time: a function that still needed a CaseRecord would not be assignable
    // here, and the type-check fails before vitest ever runs.
    const noCase: (occ: FirmObligationOccurrence, obligation: FirmObligation) => Record<string, unknown> =
      toGraphFirmEvent;
    expectTypeOf(toGraphFirmEvent).parameters.toEqualTypeOf<[FirmObligationOccurrence, FirmObligation]>();
    expect(noCase(occurrence(), obligation()).subject).toBe('Firm obligation: Practice-time report (2026)');
  });
});
