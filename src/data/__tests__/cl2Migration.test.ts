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

const { migrateV9ToV10 } = await import('../localAdapter');

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

  it('lands on the current store version', () => {
    expect(run().version).toBe(10);
  });
});
