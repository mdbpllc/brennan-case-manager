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
//
// §7 item 8's "the v9→v18 chain runs forward" is RUN through load() for every version,
// not only read off load()'s text (the fix build's review, L3-2): the v9 … v14 stores are
// built minimally the way each step's own test builds its version (cl2Migration,
// gate10Pii, formEngineStore, amendmentStore, amendmentStoreV15).

import { describe, it, expect, beforeEach } from 'vitest';
import localSource from '../localAdapter.ts?raw';
import { formEngineSeedData } from '../../forms/seed';
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

// ---- the older stores, each minimal and shaped the way its own step's test builds it ----

const T0 = '2026-07-01T00:00:00.000Z';

/** v9 (cl2Migration.test.ts): a case still carrying its own limitations date and the
 *  Medicare flag in piFlags, a Client-role link, a bill and a confirmed run on it. */
function v9Store() {
  return {
    version: 9,
    cases: [{
      id: 'c-pi', fileNumber: '26-0001', practiceArea: 'Personal Injury', caseType: 'Motor vehicle collision',
      status: 'Treatment in progress', piFlags: ['Medicare/Medicaid beneficiary'], dateOpened: '2026-03-16',
      statuteOfLimitations: '2028-03-14', createdAt: T0, updatedAt: T0,
    }],
    links: [{ id: 'l1', caseId: 'c-pi', partyId: 'p-garcia', role: 'Client', side: 'Ours', createdAt: T0 }],
    bills: [{ id: 'b1', caseId: 'c-pi', label: 'ProCare', billType: 1, billedAmount: 1000, createdAt: T0, updatedAt: T0 }],
    runs: [{ id: 'r1', caseId: 'c-pi', billId: 'b1', status: 'confirmed', runDate: T0 }],
    reviewLog: [],
    parties: [], resultLines: [], lineItems: [], codeMappings: [], eobs: [],
  };
}

/** v10: what the CL-2 step leaves — the limitations date moved off the case, the client
 *  record and its flags collections present — before CD-1's directory fields. */
function v10Store() {
  const { cases, ...rest } = v9Store();
  return {
    ...rest,
    version: 10,
    cases: cases.map(({ statuteOfLimitations: _sol, ...c }) => ({ ...c, piFlags: [] })),
    clients: [], clientFlags: [],
  };
}

/** v11 (gate10Pii.test.ts): a contact whose PII still sits in the fields blob. */
function v11Store() {
  return {
    version: 11,
    parties: [{
      id: 'p1', partyType: 'client', kind: 'individual', displayName: 'Ada Byron',
      fields: { firstName: 'Ada', dob: '1815-12-10', ssn: '000-00-0000', dlNumber: 'X0000000', dlState: 'TX' },
      roleTags: ['client'], aliases: [], deceased: false, createdAt: 't', updatedAt: 't',
    }],
    reviewLog: [],
  };
}

/** v12 (formEngineStore.test.ts): every collection of its day, and no template bank. */
function v12Store() {
  return {
    version: 12,
    cases: [{ id: 'c1', fileNumber: '26-0001' }],
    parties: [{ id: 'p1', displayName: 'Someone' }],
    partyPii: [{ partyId: 'p1', ssn: '000-00-0000' }],
    reviewLog: [],
    links: [], clients: [], clientFlags: [], rosterFlags: [], contactEdges: [],
    fileCounters: {}, bills: [], lineItems: [], codeMappings: [], eobs: [],
    runs: [], resultLines: [], legalRules: [], feeSchedules: [], feeRates: [],
    documents: [], facilityProfiles: [], events: [], transcripts: [],
    transcriptParticipants: [], stagingItems: [], routingDecisions: [],
    glossaryTerms: [], tagTemplates: [], charges: [], oaaIntakes: [],
    statuteChapters: [], statuteSections: [], verificationSnapshots: [],
    watchFlags: [], watchTargets: [], trackedBills: [], billRefs: [],
  };
}

/** v13 (amendmentStore.test.ts): the old `providerPartyId` key and collection name, and the
 *  chiropractor template still on its pre-ruling body. */
function v13Store() {
  return {
    version: 13,
    cases: [{ id: 'c1', fileNumber: '26-0001' }],
    parties: [{ id: 'p-fac', displayName: 'Halite Regional Hospital' }],
    reviewLog: [],
    bills: [{ id: 'b1', caseId: 'c1', providerPartyId: 'p-fac', label: 'ER', billedAmount: 100 }],
    codeMappings: [{ id: 'cm1', providerPartyId: 'p-fac', rawDescription: 'CT HEAD', cpt: '70450' }],
    providerProfiles: [{ id: 'pp1', providerPartyId: 'p-fac', commonFlags: [] }],
    formTemplates: [{
      id: 't-chiro', key: 'disclosures-variant-chiropractor', name: 'Chiropractor',
      family: 'expert-narrative-variant', currentVersionId: 'v-chiro-1',
    }],
    formTemplateVersions: [{
      id: 'v-chiro-1', templateId: 't-chiro', versionNo: 1,
      body: 'OLD BODY — reasonable degree of chiropractic probability', settings: {}, createdAt: '2026-08-20T00:00:00.000Z',
    }],
    links: [], clients: [], clientFlags: [], rosterFlags: [], contactEdges: [],
    partyPii: [], fileCounters: {}, lineItems: [], eobs: [],
    runs: [], resultLines: [], legalRules: [], feeSchedules: [], feeRates: [],
    documents: [], events: [], transcripts: [],
    transcriptParticipants: [], stagingItems: [], routingDecisions: [],
    glossaryTerms: [], tagTemplates: [], charges: [], oaaIntakes: [],
    statuteChapters: [], statuteSections: [], verificationSnapshots: [],
    watchFlags: [], watchTargets: [], trackedBills: [], billRefs: [],
    formTokenDefinitions: [], formFormatProfiles: [],
  };
}

/** v14 (amendmentStoreV15.test.ts): the FE-D1 bank and none of the amendment's rows. */
function v14Store() {
  const seeded = formEngineSeedData();
  const keep = new Set(['instrument', 'expert-narrative-variant', 'stock-answer']);
  const formTemplates = seeded.formTemplates.filter((t) => keep.has(t.family));
  const ids = new Set(formTemplates.map((t) => t.id));
  return {
    version: 14,
    cases: [{ id: 'c1', fileNumber: '26-0001' }],
    reviewLog: [],
    formTemplates,
    formTemplateVersions: seeded.formTemplateVersions.filter((v) => ids.has(v.templateId)),
  };
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
    expect(body).toMatch(/\r?\n {4}version: 18,\r?\n/);
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

  // Review L3-2: the branches for v9 … v14 were pinned only by load()'s text, so a branch
  // that skipped a step or passed the wrong intermediate would have stayed green. Each
  // store runs through load() here, and every step must have run, once, in order: its
  // backup holds its own version, and its `demo_store` line is there.
  const OLDER_STORES: [version: number, build: () => object][] = [
    [9, v9Store], [10, v10Store], [11, v11Store], [12, v12Store], [13, v13Store], [14, v14Store],
  ];
  for (const [version, build] of OLDER_STORES) {
    it(`a v${version} store chains forward through every step to v18: the FOD-21 fixture at min(30, lead), every occurrence touched a boolean, each intermediate backup holding its own version`, async () => {
      mem.set(KEY, JSON.stringify(build()));
      const obligations = await new LocalAdapter().listFirmObligations();
      const stored = JSON.parse(mem.get(KEY)!) as {
        version: number; firmObligationOccurrences: FirmObligationOccurrence[]; reviewLog: ReviewLogEntry[];
      };
      expect(stored.version).toBe(18);

      expect(obligations).toHaveLength(13);
      expect(reminderDaysByKey(obligations)).toEqual(FIXTURE_REMINDER_DAYS);
      for (const o of obligations) expect(o.outlookReminderDays, o.templateKey).toBe(defaultReminderDays(o.leadDays));

      expect(stored.firmObligationOccurrences).toHaveLength(12);
      for (const o of stored.firmObligationOccurrences) expect(typeof o.touched, o.id).toBe('boolean');

      const steps = Array.from({ length: 18 - version }, (_, i) => version + i);
      for (const n of steps) {
        const backup = mem.get(`${KEY}-backup-v${n}`);
        expect(backup, `-backup-v${n}`).toBeDefined();
        expect(JSON.parse(backup!).version, `-backup-v${n}`).toBe(n);
      }
      // No other backup: not a reseed's, not a step run twice or out of its place.
      expect([...mem.keys()].filter((k) => k.startsWith(`${KEY}-backup-`)).sort())
        .toEqual(steps.map((n) => `${KEY}-backup-v${n}`).sort());
      expect(stored.reviewLog
        .filter((l) => l.entityType === 'demo_store')
        .map((l) => Number(/^Store migrated v(\d+)/.exec(l.reason ?? '')?.[1])))
        .toEqual(steps);
    });
  }
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
