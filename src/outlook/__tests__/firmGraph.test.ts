// FIRM OBLIGATIONS — the no-case Outlook sibling in src/outlook/graph.ts.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 7 and §7 item 15
// (DECISION 7; FOD-22, FOD-28, FOD-29), with §2.3 and §7 item 5 for the weekend
// dates. FOS-1 RULED YES by Michael 2026-09-10 ("Yes"), session log #155.
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
import { FOD1_NOTE, WEEKEND_RULES, formatDate } from '../../domain/firmObligations';

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

  it('isReminderOn is TRUE open and done alike — slice §3 item 7 names it true', () => {
    // A build reading had turned it off on Done; the verifier caught that as a
    // departure from a value the slice names, and it was put back (2026-09-11).
    const ob = obligation();
    expect(toGraphFirmEvent(occurrence(), ob).isReminderOn).toBe(true);
    expect(
      toGraphFirmEvent(occurrence({ state: 'done', doneOn: '2026-10-01', outcome: 'completed' }), ob).isReminderOn,
    ).toBe(true);
  });
});

describe('reminderMinutesBeforeStart — AT THE LIT MOMENT (FOD-29 as Michael ruled it, 2026-09-11)', () => {
  const minutes = (ob: FirmObligation, occ: FirmObligationOccurrence) =>
    toGraphFirmEvent(occ, ob).reminderMinutesBeforeStart;
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

  it('day precision, no clock change inside the window: exactly lead × 1440, counted back from T', () => {
    // T = Thu Oct 15 2026; the longest window starts Apr 18 — after March's change, before November's.
    for (const leadDays of [0, 5, 30, 45, 180]) {
      expect(minutes(obligation({ leadDays }), occurrence())).toBe(leadDays * 1440);
    }
    // §7 item 5: T = Fri Jan 29 2027 and lightsOn Dec 30 2026 — thirty days to T, not to R.
    const { ob, occ } = jan30('rolls-forward');
    expect(minutes(ob, occ)).toBe(30 * 1440);
  });

  it("month precision: FOM-6's earlier-of, measured midnight to midnight", () => {
    const monthly = (leadDays: number) => obligation({ precision: 'month', leadDays });
    // R = Wed Mar 31 2027, the month's last day (FOD-31).
    const mar = occurrence({ periodLabel: '2027', dueOn: '2027-03-31' });
    expect(minutes(monthly(5), mar)).toBe(realMinutes('2027-03-01', '2027-03-31')); // lights Mar 1, not Mar 26
    expect(minutes(monthly(45), mar)).toBe(realMinutes('2027-02-14', '2027-03-31')); // lights Feb 14, before Mar 1
    // R = Sun Jan 31 2027: T = Fri Jan 29, lights Jan 1 — 28 days, counted to T, no clock change.
    expect(minutes(monthly(5), occurrence({ periodLabel: '2027', dueOn: '2027-01-31' }))).toBe(28 * 1440);
    // Once the override carries the real date the occurrence is day-precise (FOD-31).
    expect(minutes(monthly(5), { ...mar, dueOnOverride: '2027-03-19' })).toBe(realMinutes('2027-03-14', '2027-03-19'));
  });

  it('across a clock change the reminder still rings at midnight on the lit day — NOT lead × 1440', () => {
    // The zone is PINNED for this test (review L2-F7). Left to the machine's zone, a
    // runner on UTC has no clock change in either window and a naive days × 1440 would
    // pass. Node re-reads TZ when process.env.TZ is ASSIGNED, so every Date below — the
    // implementation's and realMinutes' alike — runs in America/Chicago. The zone in
    // force before the pin is put back by assigning it again: DELETING TZ does not make
    // Node re-read the zone (checked on Node 24), so a delete would leave Chicago pinned
    // for every later test. (`process` is reached through globalThis: the app's
    // type-check does not load Node's types.)
    const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } }).process.env;
    const saved = env.TZ ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
    env.TZ = 'America/Chicago';
    try {
      // Fail loudly if the pin did not take: without a real offset change inside each
      // window, the assertions below would prove nothing.
      expect(offsetsDiffer('2027-03-01', '2027-03-31'), 'TZ pin did not take: no clock change Mar 1 – Mar 31 2027').toBe(true);
      expect(offsetsDiffer('2027-11-01', '2027-11-30'), 'TZ pin did not take: no clock change Nov 1 – Nov 30 2027').toBe(true);

      // Spring forward (Sun Mar 14 2027) inside: lights Mar 1, T Wed Mar 31 — an hour short.
      const spring = minutes(obligation({ precision: 'month', leadDays: 5 }), occurrence({ periodLabel: '2027', dueOn: '2027-03-31' }));
      expect(spring).toBe(realMinutes('2027-03-01', '2027-03-31'));
      expect(spring).toBe(30 * 1440 - 60);

      // Fall back (Sun Nov 7 2027) inside: lights Nov 1, T Tue Nov 30 — an hour long.
      const fall = minutes(obligation({ precision: 'month', leadDays: 5 }), occurrence({ periodLabel: '2027', dueOn: '2027-11-30' }));
      expect(fall).toBe(realMinutes('2027-11-01', '2027-11-30'));
      expect(fall).toBe(29 * 1440 + 60);
    } finally {
      env.TZ = saved;
    }
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

  it('PATCHes the event it already has — the Done subject rides that PATCH (FOD-22)', async () => {
    const occ = occurrence({ outlookEventId: 'evt-1', state: 'done', doneOn: '2026-10-01', outcome: 'completed' });
    const { calls } = stubGraph(reply({ id: 'evt-1' }));
    expect(await pushFirmOccurrenceToOutlook('tok', 'cal-firm', occ, ob)).toBe('evt-1');
    expect(calls()).toEqual([
      { url: `${GRAPH}/me/events/evt-1`, method: 'PATCH', body: toGraphFirmEvent(occ, ob) },
    ]);
    expect((calls()[0].body as { subject: string }).subject)
      .toBe('Done — Firm obligation: Practice-time report (2026)');
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
