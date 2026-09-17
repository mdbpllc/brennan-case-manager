// FIRM OBLIGATIONS — the v17 → v18 demo-store step (the fix slice's store).
//
// Authority: docs/specs/firm-obligations-fix-slice.md §3 item 9 and §7 items 3 and 8
// (FOS-2 RULED YES 2026-09-12, #156), as Michael ruled at the fix build's stops,
// 2026-09-16:
//   "min(30, lead) everywhere" — a row nobody typed a reminder for takes min(30, its
//     lead), the upgrade of an existing row included; §3 item 9's "30 on every row" is
//     superseded, so the FOD-21 fixture carries FOT-6 5, FOT-22 14, FOT-23 14, FOT-24 3
//     and 30 everywhere else;
//   "Same as today" — `touched` is set by a re-dating edit, a due-date override or a
//     close, never by a re-push; the upgrade reads it FROM THE LOG by that rule.
// FXD-7: `materializedFrom` is back-filled from the close line's JSON record; a close
// with no record links nothing, and Undo is refused on it.
//
// The v17 store below is built the way a v17 store came to be: FOD-21's fixture at a
// fixed day with the four new fields STRIPPED, then acts written through the v17 shapes
// and the close-line JSON the FOS-1 build wrote.

import { describe, it, expect, beforeEach } from 'vitest';
import localSource from '../localAdapter.ts?raw';
import type { ReviewLogEntry } from '../../domain/billing';
import {
  canUndo, defaultReminderDays, FIRM_OBLIGATION_ENTITY, FIRM_OCCURRENCE_ENTITY,
  type FirmObligation, type FirmObligationOccurrence,
} from '../../domain/firmObligations';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { migrateV17ToV18, STORE_VERSION, LocalAdapter } = await import('../localAdapter');
const { seedData } = await import('../seed');
const { firmObligationsDemoSeed } = await import('../firmObligationsSeed');

const KEY = 'brennan-case-manager-v1';
const DAY = '2026-09-13';
const STAMP = '2026-09-13T12:00:00.000Z';

type V17Obligation = Omit<FirmObligation, 'outlookReminderDays' | 'pendingOutlookDeletes'>;
type V17Occurrence = Omit<FirmObligationOccurrence, 'materializedFrom' | 'touched'>;

/** The fixture's reminder days under "min(30, lead) everywhere". */
const FIXTURE_REMINDER_DAYS = {
  'FOT-4': 30, 'FOT-19': 30, 'FOT-22': 14, 'FOT-1': 30, 'FOT-6': 5, 'FOT-24': 3,
  'FOT-23': 14, 'FOT-27': 30, 'FOT-2': 30, 'FOT-8': 30, 'FOT-9': 30, 'FOT-25': 30, 'boi-note': 30,
};

/**
 * A v17 store holding every shape the upgrade reads:
 *  - FOT-6:  Done → Undo → Done again. The first next (y1) is gone; the LATEST close line
 *            names y2, untouched → linked, and Undo is available on y0.
 *  - FOT-24: Done, then a due-date override on the next (x1) → linked, touched; Undo refused.
 *  - FOT-1:  Not applicable → the next (a1) linked, untouched.
 *  - FOT-8:  a re-dating rule edit; the obligation line's record names z0 → touched.
 *  - FOT-9:  a re-push-only edit (the lead, which re-pushed in v17); names no occurrence →
 *            w0 NOT touched.
 *  - FOT-25: a Done whose close line carries NO JSON → v1 not linked (FXD-7).
 *  - FOT-19: a Done whose close line names a next that no longer exists → no link.
 *  - FOT-22: Done then Undo → r0 open again, with a `done` line of its own → touched.
 *  Every other fixture occurrence is untouched.
 */
function v17Store() {
  let n = 0;
  const newId = () => `v17-${String(++n).padStart(4, '0')}`;
  const fixture = firmObligationsDemoSeed(DAY, STAMP, newId);
  const obligations: V17Obligation[] = fixture.obligations.map(
    ({ outlookReminderDays: _r, pendingOutlookDeletes: _p, ...rest }) => rest,
  );
  const occurrences: V17Occurrence[] = fixture.occurrences.map(({ materializedFrom: _m, touched: _t, ...rest }) => rest);
  const reviewLog: ReviewLogEntry[] = [...fixture.reviewLog];

  let tick = 0;
  const at = () => `2026-09-13T13:${String(++tick).padStart(2, '0')}:00.000Z`;
  const ob = (key: string) => obligations.find((o) => o.templateKey === key)!;
  const openOf = (key: string) => occurrences.find((o) => o.obligationId === ob(key).id && o.state === 'open')!;
  const log = (line: Omit<ReviewLogEntry, 'id' | 'timestamp' | 'user'>) => {
    reviewLog.push({ id: newId(), timestamp: at(), user: 'Michael Brennan (attorney)', ...line });
  };
  const next = (key: string, dueOn: string, periodLabel: string): V17Occurrence => {
    const stamp = at();
    const o: V17Occurrence = {
      id: newId(), obligationId: ob(key).id, periodLabel, dueOn, state: 'open', syncStatus: 'pending', createdAt: stamp, updatedAt: stamp,
    };
    occurrences.push(o);
    return o;
  };
  /** A close written the v17 way: the row closed, and its line with the FOS-1 JSON record
   *  naming its next — or, `json: false`, with no record at all. */
  const close = (
    occ: V17Occurrence, nextId: string | null,
    opts: { outcome?: 'completed' | 'not-applicable'; json?: boolean } = {},
  ) => {
    const outcome = opts.outcome ?? 'completed';
    Object.assign(occ, {
      state: 'done', doneOn: DAY, outcome, syncStatus: 'pending', updatedAt: at(),
      ...(outcome === 'not-applicable' ? { outcomeReason: 'condition-not-met' } : {}),
    });
    log({
      entityType: FIRM_OCCURRENCE_ENTITY, entityId: occ.id, action: outcome === 'completed' ? 'done' : 'not-applicable',
      ...(opts.json === false ? {} : {
        newValue: JSON.stringify({ kind: 'close', doneOn: DAY, nextOccurrenceId: nextId, retiredObligation: false }),
      }),
      reason: 'Done Sun Sep 13, 2026',
    });
  };
  /** An Undo written the v17 way: the next deleted, the close reopened, the `undone` line. */
  const undo = (occ: V17Occurrence, removed: V17Occurrence) => {
    occurrences.splice(occurrences.indexOf(removed), 1);
    const o = occ as Partial<V17Occurrence>;
    delete o.doneOn; delete o.outcome; delete o.outcomeReason;
    Object.assign(occ, { state: 'open', syncStatus: 'pending', updatedAt: at() });
    log({
      entityType: FIRM_OCCURRENCE_ENTITY, entityId: occ.id, action: 'undone',
      newValue: JSON.stringify({ kind: 'undo', removedNextOccurrenceId: removed.id, removedNextOutlookEventId: null, reactivatedObligation: false }),
      reason: 'Reopened',
    });
  };

  // FOT-6: Done → Undo → Done again.
  const y0 = openOf('FOT-6');
  const y1 = next('FOT-6', '2026-10-16', '2026-10');
  close(y0, y1.id);
  undo(y0, y1);
  const y2 = next('FOT-6', '2026-10-16', '2026-10');
  close(y0, y2.id);

  // FOT-24: Done, then an override on the next.
  const x0 = openOf('FOT-24');
  const x1 = next('FOT-24', '2026-10-14', '2026-10');
  close(x0, x1.id);
  log({
    entityType: FIRM_OCCURRENCE_ENTITY, entityId: x1.id, action: 'edited', oldValue: x1.dueOn, newValue: '2026-10-20',
    reason: 'Rule date for 2026-10 set to Tue Oct 20, 2026 (was Wed Oct 14, 2026)',
  });
  Object.assign(x1, { dueOnOverride: '2026-10-20', syncStatus: 'pending', updatedAt: at() });

  // FOT-1: Not applicable.
  const a0 = openOf('FOT-1');
  const a1 = next('FOT-1', '2027-09-30', '2027–28');
  close(a0, a1.id, { outcome: 'not-applicable' });

  // FOT-8: a re-dating rule edit.
  const z0 = openOf('FOT-8');
  const oldRule = ob('FOT-8').recurrence;
  const newRule = { kind: 'fixed-annual' as const, month: 2, day: 1 };
  Object.assign(ob('FOT-8'), { recurrence: newRule, updatedAt: at() });
  Object.assign(z0, { dueOn: '2027-02-01', syncStatus: 'pending', updatedAt: at() });
  log({
    entityType: FIRM_OBLIGATION_ENTITY, entityId: ob('FOT-8').id, action: 'edited',
    oldValue: JSON.stringify({ recurrence: oldRule }),
    newValue: JSON.stringify({ kind: 'obligation', act: 'edited', fields: ['recurrence'], reevaluatedOccurrenceId: z0.id, values: { recurrence: newRule } }),
    reason: 'Edited: rule',
  });

  // FOT-9: a re-push-only edit.
  const w0 = openOf('FOT-9');
  const oldLead = ob('FOT-9').leadDays;
  Object.assign(ob('FOT-9'), { leadDays: 60, updatedAt: at() });
  Object.assign(w0, { syncStatus: 'pending', updatedAt: at() });
  log({
    entityType: FIRM_OBLIGATION_ENTITY, entityId: ob('FOT-9').id, action: 'edited',
    oldValue: JSON.stringify({ leadDays: oldLead }),
    newValue: JSON.stringify({ kind: 'obligation', act: 'edited', fields: ['leadDays'], reevaluatedOccurrenceId: null, values: { leadDays: 60 } }),
    reason: 'Edited: lead',
  });

  // FOT-25: a Done with no JSON record.
  const v0 = openOf('FOT-25');
  const v1 = next('FOT-25', '2028-03-01', '2028–29');
  close(v0, v1.id, { json: false });

  // FOT-19: a Done naming a next that no longer exists.
  const m0 = openOf('FOT-19');
  close(m0, 'v17-gone');

  // FOT-22: Done, then Undo.
  const r0 = openOf('FOT-22');
  const r1 = next('FOT-22', '2026-12-12', 'by Sat Dec 12, 2026');
  close(r0, r1.id);
  undo(r0, r1);

  const store = {
    ...seedData(), version: 17,
    firmObligations: obligations, firmObligationOccurrences: occurrences, reviewLog,
  };
  return { store, ids: { y0, y1, y2, x0, x1, a0, a1, z0, w0, v0, v1, m0, r0 }, ob };
}

type V18 = ReturnType<typeof migrateV17ToV18>;

/** The v17 store through the step, with its raw text. */
function migrated() {
  const built = v17Store();
  const raw = JSON.stringify(built.store);
  const out = migrateV17ToV18(built.store as never, raw);
  return { ...built, raw, out };
}

const occurrenceIn = (out: V18, id: string) => out.firmObligationOccurrences.find((o) => o.id === id);
const obligationIn = (out: V18, key: string) => out.firmObligations.find((o) => o.templateKey === key)!;
const occurrencesOf = (out: V18, key: string) =>
  out.firmObligationOccurrences.filter((o) => o.obligationId === obligationIn(out, key).id);
const reminderDaysByKey = (obligations: FirmObligation[]) =>
  Object.fromEntries(obligations.map((o) => [o.templateKey, o.outlookReminderDays]));

beforeEach(() => mem.clear());

describe('v17 → v18: the step itself', () => {
  it('lands on v18 — a literal, not STORE_VERSION — and STORE_VERSION is 18', () => {
    const { out } = migrated();
    expect(out.version).toBe(18);
    expect(STORE_VERSION).toBe(18);
    const body = localSource.slice(localSource.indexOf('export function migrateV17ToV18('), localSource.indexOf('function load()'));
    expect(body).toMatch(/\n {4}version: 18,\n/);
    expect(body).not.toMatch(/version: STORE_VERSION/);
  });

  it('writes a full pre-migration backup holding the v17 text before changing anything', () => {
    const { raw } = migrated();
    expect(mem.get(`${KEY}-backup-v17`)).toBe(raw);
    const backup = JSON.parse(raw) as { version: number; firmObligations: object[]; firmObligationOccurrences: object[] };
    expect(backup.version).toBe(17);
    expect(backup.firmObligations.some((o) => 'outlookReminderDays' in o || 'pendingOutlookDeletes' in o)).toBe(false);
    expect(backup.firmObligationOccurrences.some((o) => 'touched' in o || 'materializedFrom' in o)).toBe(false);
  });

  it('every obligation gains outlookReminderDays = min(30, lead) and an empty Outlook-delete queue: FOT-6 5, FOT-22 14, FOT-23 14, FOT-24 3, every other row 30', () => {
    const { out } = migrated();
    expect(reminderDaysByKey(out.firmObligations)).toEqual(FIXTURE_REMINDER_DAYS);
    for (const o of out.firmObligations) {
      expect(o.outlookReminderDays, o.templateKey).toBe(defaultReminderDays(o.leadDays));
      expect(o.pendingOutlookDeletes, o.templateKey).toEqual([]);
    }
  });

  it('every occurrence gains touched, a boolean', () => {
    const { out } = migrated();
    for (const o of out.firmObligationOccurrences) expect(typeof o.touched, o.id).toBe('boolean');
  });

  it('materializedFrom comes from each closed occurrence\'s LATEST close line, where the next it names still exists — Done or Not applicable', () => {
    const { out, ids } = migrated();
    // Done → Undo → Done: the second close's next, not the removed first one.
    expect(occurrenceIn(out, ids.y2.id)).toMatchObject({ state: 'open', materializedFrom: ids.y0.id, touched: false });
    expect(occurrenceIn(out, ids.y1.id)).toBeUndefined();
    expect(occurrenceIn(out, ids.x1.id)).toMatchObject({ materializedFrom: ids.x0.id });
    expect(occurrenceIn(out, ids.a1.id)).toMatchObject({ materializedFrom: ids.a0.id, touched: false });
    // Nothing else is linked: not FOT-25's (no record), not FOT-19's (its next is gone),
    // not the reopened FOT-22 close, not a first occurrence.
    expect(out.firmObligationOccurrences.filter((o) => o.materializedFrom !== undefined).map((o) => o.id).sort())
      .toEqual([ids.y2.id, ids.x1.id, ids.a1.id].sort());
  });

  it('FXD-7: a close line with no JSON links nothing, and Undo is refused on that close', () => {
    const { out, ids } = migrated();
    const v1 = occurrenceIn(out, ids.v1.id)!;
    expect(v1).toMatchObject({ state: 'open', touched: false });
    expect(v1.materializedFrom).toBeUndefined();
    const check = canUndo(obligationIn(out, 'FOT-25'), occurrenceIn(out, ids.v0.id)!, occurrencesOf(out, 'FOT-25'), out.reviewLog);
    expect(check).toMatchObject({ ok: false, why: expect.stringMatching(/No close record/) });
  });

  it('touched FROM THE LOG: a close, an override, a re-dating edit and an undone close set it; a re-push-only edit and an untouched row do not', () => {
    const { out, ids } = migrated();
    expect(occurrenceIn(out, ids.x1.id)).toMatchObject({ state: 'open', dueOnOverride: '2026-10-20', touched: true }); // override
    expect(occurrenceIn(out, ids.z0.id)).toMatchObject({ state: 'open', dueOn: '2027-02-01', touched: true }); // re-dating edit
    expect(occurrenceIn(out, ids.r0.id)).toMatchObject({ state: 'open', touched: true }); // its own done line
    expect(occurrenceIn(out, ids.w0.id)).toMatchObject({ state: 'open', syncStatus: 'pending', touched: false }); // re-push only
    expect(out.firmObligationOccurrences.filter((o) => o.touched).map((o) => o.id).sort()).toEqual(
      [ids.y0.id, ids.x0.id, ids.x1.id, ids.a0.id, ids.z0.id, ids.v0.id, ids.m0.id, ids.r0.id].sort(),
    );
  });

  it('Undo is decided from the columns once upgraded: allowed over the untouched next, refused over the overridden one (FOD-7)', () => {
    const { out, ids } = migrated();
    expect(canUndo(obligationIn(out, 'FOT-6'), occurrenceIn(out, ids.y0.id)!, occurrencesOf(out, 'FOT-6'), out.reviewLog))
      .toEqual({ ok: true });
    expect(canUndo(obligationIn(out, 'FOT-24'), occurrenceIn(out, ids.x0.id)!, occurrencesOf(out, 'FOT-24'), out.reviewLog))
      .toMatchObject({ ok: false, why: expect.stringMatching(/FOD-7/) });
    expect(canUndo(obligationIn(out, 'FOT-1'), occurrenceIn(out, ids.a0.id)!, occurrencesOf(out, 'FOT-1'), out.reviewLog))
      .toEqual({ ok: true });
  });

  it('nothing else changes: every other collection as it was, every firm row as it was plus its new fields, the log kept in front with ONE line added', () => {
    const { out, raw } = migrated();
    const before = JSON.parse(raw) as Record<string, unknown> & {
      firmObligations: object[]; firmObligationOccurrences: object[]; reviewLog: ReviewLogEntry[];
    };
    const after = JSON.parse(JSON.stringify(out)) as typeof before;
    const rest = (s: Record<string, unknown>) => {
      const { version: _v, reviewLog: _r, firmObligations: _f, firmObligationOccurrences: _o, ...others } = s;
      return others;
    };
    expect(rest(after)).toEqual(rest(before));
    expect(after.firmObligations.map(({ outlookReminderDays: _a, pendingOutlookDeletes: _b, ...o }: Partial<FirmObligation>) => o))
      .toEqual(before.firmObligations);
    expect(after.firmObligationOccurrences.map(({ materializedFrom: _a, touched: _b, ...o }: Partial<FirmObligationOccurrence>) => o))
      .toEqual(before.firmObligationOccurrences);
    expect(after.reviewLog.slice(0, before.reviewLog.length)).toEqual(before.reviewLog);
    expect(after.reviewLog).toHaveLength(before.reviewLog.length + 1);
    expect(after.reviewLog.at(-1)).toMatchObject({
      entityType: 'demo_store', entityId: KEY, action: 'edited', user: expect.stringContaining('v18'),
    });
    expect(after.reviewLog.at(-1)!.reason).toContain(`"${KEY}-backup-v17"`);
  });

  it('run on its own output, the step changes nothing in the firm collections', () => {
    const { out } = migrated();
    const again = migrateV17ToV18(out, JSON.stringify(out));
    expect(again.firmObligations).toEqual(out.firmObligations);
    expect(again.firmObligationOccurrences).toEqual(out.firmObligationOccurrences);
  });
});

describe('the chain through load()', () => {
  it('every older version\'s branch in load() ends in the v18 step (v9 … v17)', () => {
    const body = localSource.slice(localSource.indexOf('function load()'), localSource.indexOf('function save('));
    for (let v = 9; v <= 17; v++) expect(body, `v${v}`).toContain(`if (parsed.version === ${v})`);
    expect(body.match(/return migrateV17ToV18\(/g)).toHaveLength(9);
    expect(body).not.toMatch(/return migrateV16ToV17\(/);
  });

  it('a v17 store comes through load() at v18, and the adapter acts on it by the columns', async () => {
    const { store, ids } = v17Store();
    mem.set(KEY, JSON.stringify(store));
    const db = new LocalAdapter();
    const occurrences = await db.listFirmObligationOccurrences();
    expect(JSON.parse(mem.get(KEY)!).version).toBe(18);
    expect(JSON.parse(mem.get(`${KEY}-backup-v17`)!).version).toBe(17);
    expect(occurrences.find((o) => o.id === ids.y2.id)).toMatchObject({ materializedFrom: ids.y0.id, touched: false });
    const n = (await db.listFirmObligationReviewLog()).length;
    await expect(db.undoOccurrence(ids.x0.id)).rejects.toThrow(/FOD-7/);
    await expect(db.undoOccurrence(ids.v0.id)).rejects.toThrow(/No close record/);
    const undone = await db.undoOccurrence(ids.y0.id);
    expect(undone.removed!.id).toBe(ids.y2.id);
    expect(undone.reopened).toMatchObject({ id: ids.y0.id, state: 'open' });
    expect(await db.listFirmObligationReviewLog()).toHaveLength(n + 1);
  });

  it('a v16 store chains forward through v17 to v18, each backup holding its own version\'s text', async () => {
    mem.set(KEY, JSON.stringify({ ...seedData(), version: 16 }));
    const obligations = await new LocalAdapter().listFirmObligations();
    const stored = JSON.parse(mem.get(KEY)!) as { version: number; firmObligationOccurrences: FirmObligationOccurrence[]; reviewLog: ReviewLogEntry[] };
    expect(stored.version).toBe(18);
    expect(JSON.parse(mem.get(`${KEY}-backup-v16`)!).version).toBe(16);
    expect(JSON.parse(mem.get(`${KEY}-backup-v17`)!).version).toBe(17);
    expect(obligations).toHaveLength(13);
    expect(reminderDaysByKey(obligations)).toEqual(FIXTURE_REMINDER_DAYS);
    expect(stored.firmObligationOccurrences.every((o) => o.touched === false && o.materializedFrom === undefined)).toBe(true);
    expect(stored.reviewLog.filter((l) => l.entityType === 'demo_store').map((l) => l.user))
      .toEqual([expect.stringContaining('v17'), expect.stringContaining('v18')]);
  });

  it('a v15 store chains forward through v16 and v17 to 18', async () => {
    mem.set(KEY, JSON.stringify({ ...seedData(), version: 15 }));
    const obligations = await new LocalAdapter().listFirmObligations();
    expect(JSON.parse(mem.get(KEY)!).version).toBe(18);
    for (const v of [15, 16, 17]) expect(JSON.parse(mem.get(`${KEY}-backup-v${v}`)!).version).toBe(v);
    expect(obligations.every((o) => o.outlookReminderDays === defaultReminderDays(o.leadDays))).toBe(true);
    expect(obligations.every((o) => Array.isArray(o.pendingOutlookDeletes))).toBe(true);
  });
});

describe('a FRESH store lands in the v18 shape (the v16 lesson)', () => {
  it('seeds straight to v18: reminders at min(30, lead), empty queues, every occurrence untouched and unlinked, no migration run', async () => {
    const db = new LocalAdapter();
    const obligations = await db.listFirmObligations();
    expect(JSON.parse(mem.get(KEY)!).version).toBe(18);
    expect(obligations).toHaveLength(13);
    expect(reminderDaysByKey(obligations)).toEqual(FIXTURE_REMINDER_DAYS);
    for (const o of obligations) expect(o.pendingOutlookDeletes).toEqual([]);
    const occurrences = await db.listFirmObligationOccurrences();
    expect(occurrences).toHaveLength(12);
    for (const o of occurrences) {
      expect(o.touched).toBe(false);
      expect(o.materializedFrom).toBeUndefined();
    }
    expect(mem.get(`${KEY}-backup-v17`)).toBeUndefined();
  });
});
