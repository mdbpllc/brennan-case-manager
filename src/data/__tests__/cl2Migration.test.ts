// The CL-2 demo-store migration (v9 → v10), tested because it is the one part
// of this slice that touches data a person entered. It mirrors
// db/migrations/2026-07-28-cl2-client-dimension.sql step for step, so a defect
// here is a defect in both modes.

import { describe, it, expect, beforeEach } from 'vitest';

// Minimal localStorage stub — the migration backs the old store up before
// touching anything, and that backup is a ruled part of the pattern.
const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { migrateV9ToV10, migrateV10ToV11, STORE_VERSION } = await import('../localAdapter');

const t = '2026-07-01T00:00:00.000Z';

/** A v9 store: cases carry their own statuteOfLimitations and the
 *  Medicare/Medicaid flag sits in piFlags. */
function v9Store() {
  return {
    version: 9,
    cases: [
      {
        id: 'c-pi', fileNumber: '26-0001', practiceArea: 'Personal Injury',
        caseType: 'Motor vehicle collision', status: 'Treatment in progress',
        piFlags: ['Trucking/commercial vehicle', 'Medicare/Medicaid beneficiary'],
        dateOpened: '2026-03-16', statuteOfLimitations: '2028-03-14',
        createdAt: t, updatedAt: t,
      },
      {
        id: 'c-crim', fileNumber: '26-0002', practiceArea: 'Criminal', caseType: 'Misdemeanor',
        status: 'Plea negotiations', piFlags: [], dateOpened: '2026-02-02',
        createdAt: t, updatedAt: t,
      },
      {
        // The flag case: a real limitations date and NO client-role party.
        id: 'c-orphan', fileNumber: '26-0003', practiceArea: 'General Civil Litigation',
        caseType: "Servpro mechanic's lien", status: 'Demand sent', piFlags: [],
        dateOpened: '2026-05-04', statuteOfLimitations: '2027-04-20',
        createdAt: t, updatedAt: t,
      },
    ],
    links: [
      { id: 'l1', caseId: 'c-pi', partyId: 'p-garcia', role: 'Client', side: 'Ours', createdAt: t },
      { id: 'l2', caseId: 'c-pi', partyId: 'p-doc', role: 'Treating provider', createdAt: t },
      { id: 'l3', caseId: 'c-crim', partyId: 'p-boyd', role: 'Client', side: 'Ours', createdAt: t },
      { id: 'l4', caseId: 'c-orphan', partyId: 'p-carrier', role: 'Other', side: 'Opposing', createdAt: t },
    ],
    bills: [{ id: 'b1', caseId: 'c-pi', label: 'ProCare', billType: 1, billedAmount: 1000, createdAt: t, updatedAt: t }],
    runs: [{ id: 'r1', caseId: 'c-pi', billId: 'b1', status: 'confirmed', runDate: t }],
    reviewLog: [],
    parties: [], resultLines: [], lineItems: [], codeMappings: [], eobs: [],
    // eslint-disable-next-line
  } as never as Parameters<typeof migrateV9ToV10>[0];
}

describe('CL-2 demo-store migration (v9 → v10)', () => {
  beforeEach(() => mem.clear());

  function run() {
    const old = v9Store();
    return migrateV9ToV10(old, JSON.stringify(old));
  }

  it('derives exactly one client per client-role party', () => {
    const s = run();
    expect(s.clients).toHaveLength(2);
    expect(s.clients.map((c) => c.caseId).sort()).toEqual(['c-crim', 'c-pi']);
  });

  it('carries the case limitations date onto the derived client', () => {
    const pi = run().clients.find((c) => c.caseId === 'c-pi')!;
    expect(pi.statuteOfLimitations).toBe('2028-03-14');
  });

  it('records the basis as "manual", not "standard" — the old date\'s basis is unknown', () => {
    // Asserting a basis would be a guess about a legal deadline.
    const pi = run().clients.find((c) => c.caseId === 'c-pi')!;
    expect(pi.solBasis).toBe('manual');
  });

  it('derives posture from the practice area — our criminal client is the DEFENDANT', () => {
    // Regression: the first cut hardcoded 'claimant', which was wrong on every
    // criminal file. Caught in the browser against a real pre-existing store.
    const s = run();
    expect(s.clients.find((c) => c.caseId === 'c-crim')!.posture).toBe('defendant');
    expect(s.clients.find((c) => c.caseId === 'c-pi')!.posture).toBe('claimant');
  });

  it('creates the criminal client as a nearly-empty row with no limitations date', () => {
    // Ruled default (#27): every case gets one; criminal clocks stay on charges.
    const crim = run().clients.find((c) => c.caseId === 'c-crim')!;
    expect(crim.statuteOfLimitations).toBeUndefined();
    expect(crim.solBasis).toBeUndefined();
    expect(crim.clientFlags).toEqual([]);
  });

  it('moves Medicare/Medicaid to the client and strips it from the case', () => {
    const s = run();
    const pi = s.clients.find((c) => c.caseId === 'c-pi')!;
    expect(pi.clientFlags).toEqual(['Medicare/Medicaid beneficiary']);
    const piCase = s.cases.find((c) => c.id === 'c-pi')!;
    expect(piCase.piFlags).toEqual(['Trucking/commercial vehicle']);
  });

  it('leaves the other occurrence flags exactly where they were (D-CL2-5)', () => {
    const piCase = run().cases.find((c) => c.id === 'c-pi')!;
    expect(piCase.piFlags).toContain('Trucking/commercial vehicle');
  });

  it('retires the case-level limitations field', () => {
    for (const c of run().cases) {
      expect(c).not.toHaveProperty('statuteOfLimitations');
    }
  });

  it('FLAGS the case with no client-role party instead of guessing one', () => {
    const s = run();
    expect(s.clients.some((c) => c.caseId === 'c-orphan')).toBe(false);
    expect(s.clientFlags).toHaveLength(1);
    expect(s.clientFlags[0].caseId).toBe('c-orphan');
  });

  it('PRESERVES the flagged case\'s limitations date on the flag', () => {
    // Michael's ruling 2026-07-28: the date has nowhere else to go once the
    // case column drops, and losing it silently is the failure this prevents.
    expect(run().clientFlags[0].preservedStatuteOfLimitations).toBe('2027-04-20');
  });

  it('stamps client_id on bills and runs for single-client cases', () => {
    const s = run();
    const pi = s.clients.find((c) => c.caseId === 'c-pi')!;
    expect(s.bills[0].clientId).toBe(pi.id);
    expect(s.runs[0].clientId).toBe(pi.id);
  });

  it('does NOT touch case_parties — parallel, not promotion (D-CL2-8)', () => {
    expect(run().links).toHaveLength(4);
  });

  it('backs the whole pre-migration store up before changing anything', () => {
    run();
    const backup = mem.get('brennan-case-manager-v1-backup-v9');
    expect(backup).toBeTruthy();
    expect(JSON.parse(backup!).version).toBe(9);
  });

  it('writes a review-log entry for every derived client and every flag', () => {
    const s = run();
    const entries = s.reviewLog.filter((e) => e.user.startsWith('system (CL-2'));
    expect(entries.filter((e) => e.entityType === 'case_client')).toHaveLength(2);
    expect(entries.filter((e) => e.entityType === 'case')).toHaveLength(1);
    // …plus the store-level summary.
    expect(entries.filter((e) => e.entityType === 'demo_store')).toHaveLength(1);
  });

  it('records the flagged case\'s old date in the review log too', () => {
    const s = run();
    const flagEntry = s.reviewLog.find((e) => e.entityType === 'case' && e.entityId === 'c-orphan')!;
    expect(flagEntry.oldValue).toBe('2027-04-20');
    expect(flagEntry.reason).toContain('FLAGGED FOR MICHAEL');
  });

  it('lands on v10 — the version this step actually produces', () => {
    // Deliberately a literal, and deliberately 10 rather than STORE_VERSION:
    // this function's whole job is v9→v10. It briefly stamped STORE_VERSION,
    // which meant it claimed v11 while doing no CD-1 work — caught when CD-1
    // bumped the store. A migration step names the version it produces; the
    // chain to current is a separate concern, tested below.
    expect(run().version).toBe(10);
  });

  it('chains v9 → v10 → v11 so a CL-2 store is not reseeded by CD-1', () => {
    const v10 = run();
    const v11 = migrateV10ToV11(v10, JSON.stringify(v10));

    expect(v11.version).toBe(STORE_VERSION);
    // CL-2's derived work survived the second step...
    expect(v11.clients.length).toBe(v10.clients.length);
    expect(v11.clients.length).toBeGreaterThan(0);
    expect(v11.clientFlags.length).toBe(v10.clientFlags.length);
    // ...and CD-1's ran on top of it.
    expect(v11.parties.every((p) => p.roleTags.length > 0)).toBe(true);
    expect(Array.isArray(v11.contactEdges)).toBe(true);
    // The backup written by step two holds v10 data, not the v9 text.
    expect(JSON.parse(mem.get('brennan-case-manager-v1-backup-v10')!).version).toBe(10);
  });
});

describe('client flag re-opening (sole-client removal guard)', () => {
  beforeEach(() => mem.clear());

  it('re-opens a RESOLVED flag instead of no-opping on the unique constraint', async () => {
    // Michael, walkthrough 2026-07-28: removing a case's only client is one
    // click. Without this, a case that was flagged, resolved, then lost its
    // client again would end up with no client AND no flag — a silent hole,
    // worse than the visible flagged state the design mandates.
    const { LocalAdapter } = await import('../localAdapter');
    const db = new LocalAdapter();

    const first = await db.createClientFlagIfAbsent({ caseId: 'c-x', reason: 'first' });
    expect(first).not.toBeNull();

    // Same case, still open — nothing to say twice.
    expect(await db.createClientFlagIfAbsent({ caseId: 'c-x', reason: 'again' })).toBeNull();

    await db.resolveClientFlag(first!.id);
    expect(await db.getClientFlagForCase('c-x')).toBeNull();

    const reopened = await db.createClientFlagIfAbsent({
      caseId: 'c-x', reason: 'sole client removed', preservedStatuteOfLimitations: '2029-02-02',
    });
    expect(reopened).not.toBeNull();
    expect(reopened!.resolvedAt).toBeUndefined();
    expect(reopened!.preservedStatuteOfLimitations).toBe('2029-02-02');

    const live = await db.getClientFlagForCase('c-x');
    expect(live?.reason).toBe('sole client removed');
  });
});
