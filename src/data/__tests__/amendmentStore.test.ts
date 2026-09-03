// FE-D1 AMENDMENT — the v13 → v14 demo-store migration.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §13 item 4, which asks for
// exactly this regression: "a v13 store carrying bills keyed on the old name
// comes through under the new key with the same rows."
//
// WHY IT MATTERS MORE THAN A RENAME USUALLY WOULD. The renamed code reads
// `facilityPartyId`; a stored v13 bill carries `providerPartyId`. A store that
// migrated without this step would not throw — it would show every bill with NO
// facility, silently, which is the failure mode the CL-2 and gate-10 bumps were
// both written to avoid.

import { describe, it, expect, beforeEach } from 'vitest';
import { DISCLOSURE_VARIANTS } from '../../forms/variants';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { migrateV13ToV14, STORE_VERSION } = await import('../localAdapter');

const KEY = 'brennan-case-manager-v1';
const CHIRO_KEY = 'disclosures-variant-chiropractor';

/** A v13 store as it really sits on disk: old key on the rows, old collection
 *  name, and the chiropractor template still holding its pre-ruling body. */
function v13Store() {
  return {
    version: 13,
    cases: [{ id: 'c1', fileNumber: '26-0001' }],
    parties: [{ id: 'p-fac', displayName: 'Halite Regional Hospital' }],
    reviewLog: [],
    bills: [
      { id: 'b1', caseId: 'c1', providerPartyId: 'p-fac', label: 'ER', billedAmount: 100 },
      { id: 'b2', caseId: 'c1', providerPartyId: 'p-fac', label: 'Imaging', billedAmount: 250 },
    ],
    codeMappings: [{ id: 'cm1', providerPartyId: 'p-fac', rawDescription: 'CT HEAD', cpt: '70450' }],
    providerProfiles: [{ id: 'pp1', providerPartyId: 'p-fac', commonFlags: [] }],
    formTemplates: [{
      id: 't-chiro', key: CHIRO_KEY, name: 'Chiropractor',
      family: 'expert-narrative-variant', currentVersionId: 'v-chiro-1',
    }],
    formTemplateVersions: [{
      id: 'v-chiro-1', templateId: 't-chiro', versionNo: 1,
      // The PRE-RULING text, which is the whole point: this is what a real v13
      // store holds, and it must survive as v1.
      body: 'OLD BODY — reasonable degree of chiropractic probability',
      settings: {}, createdAt: '2026-08-20T00:00:00.000Z',
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
  } as unknown as Parameters<typeof migrateV13ToV14>[0];
}

describe('v13 → v14: the FE-D1 amendment bump', () => {
  beforeEach(() => { mem.clear(); });

  it('lands on v14 — the version this step actually produces', () => {
    // Literal, deliberately not STORE_VERSION: every step in this file is
    // pinned to a literal because reading the constant is what let the v10→v11
    // step stamp a v11 store as v12 and skip a migration entirely.
    const old = v13Store();
    expect(migrateV13ToV14(old, JSON.stringify(old)).version).toBe(14);
    expect(STORE_VERSION).toBe(14);
  });

  it('carries every bill through under the new key, with the same rows', () => {
    const old = v13Store();
    const out = migrateV13ToV14(old, JSON.stringify(old));
    const bills = out.bills as unknown as Record<string, unknown>[];

    expect(bills).toHaveLength(2);
    for (const b of bills) {
      expect(b.facilityPartyId).toBe('p-fac');
      // The old key is DELETED, not merely shadowed: a row carrying both would
      // let something read the stale one.
      expect('providerPartyId' in b).toBe(false);
    }
    // Nothing else about the rows moved.
    expect(bills.map((b) => b.id)).toEqual(['b1', 'b2']);
    expect(bills.map((b) => b.billedAmount)).toEqual([100, 250]);
    expect(bills.map((b) => b.label)).toEqual(['ER', 'Imaging']);
  });

  it('renames the key on code mappings and on the profile collection', () => {
    const old = v13Store();
    const out = migrateV13ToV14(old, JSON.stringify(old));

    const mappings = out.codeMappings as unknown as Record<string, unknown>[];
    expect(mappings[0].facilityPartyId).toBe('p-fac');
    expect('providerPartyId' in mappings[0]).toBe(false);

    const profiles = out.facilityProfiles as unknown as Record<string, unknown>[];
    expect(profiles).toHaveLength(1);
    expect(profiles[0].facilityPartyId).toBe('p-fac');
    // The collection itself was renamed; the old name must be gone from the
    // store, not sitting beside the new one holding stale rows.
    expect('providerProfiles' in (out as unknown as Record<string, unknown>)).toBe(false);
  });

  it('APPENDS §9.4\'s ruled text as v2 and never overwrites v1 (D-63)', () => {
    const old = v13Store();
    const out = migrateV13ToV14(old, JSON.stringify(old));

    const versions = out.formTemplateVersions.filter((v) => v.templateId === 't-chiro');
    expect(versions).toHaveLength(2);

    const v1 = versions.find((v) => v.versionNo === 1)!;
    const v2 = versions.find((v) => v.versionNo === 2)!;

    // v1 is untouched. "Which text went out the door" stays answerable.
    expect(v1.id).toBe('v-chiro-1');
    expect(v1.body).toBe('OLD BODY — reasonable degree of chiropractic probability');

    // v2 carries the generated text, and the template now points at it.
    const approved = DISCLOSURE_VARIANTS.find((v) => v.key === CHIRO_KEY)!.body;
    expect(v2.body).toBe(approved);
    expect(v2.body).toContain('reasonable degree of medical probability');
    expect(out.formTemplates.find((t) => t.key === CHIRO_KEY)!.currentVersionId).toBe(v2.id);

    // The change note quotes the ruling rather than describing it.
    expect(v2.changeNote).toContain(
      'Get rid of chiropractic probability and replace with medical probability',
    );
  });

  it('appends nothing when no body has drifted — re-running is not a version churn', () => {
    const old = v13Store();
    const once = migrateV13ToV14(old, JSON.stringify(old));
    // Feed the migrated store back in: bodies now match the constant, so the
    // step must add no further version. A migration that appended on every run
    // would grow the bank without a text act behind it.
    const twice = migrateV13ToV14(once, JSON.stringify(once));
    expect(twice.formTemplateVersions.filter((v) => v.templateId === 't-chiro')).toHaveLength(2);
  });

  it('writes a full pre-migration backup before reshaping anything', () => {
    const old = v13Store();
    const raw = JSON.stringify(old);
    migrateV13ToV14(old, raw);
    // "Additive" is a claim about the code; the backup is a fact about the data.
    expect(mem.get(`${KEY}-backup-v13`)).toBe(raw);
  });

  it('records the migration in the review log, saying what it moved', () => {
    const old = v13Store();
    const out = migrateV13ToV14(old, JSON.stringify(old));
    const entry = out.reviewLog[out.reviewLog.length - 1];
    expect(entry.reason).toContain('facilityPartyId');
    expect(entry.reason).toContain('backup-v13');
  });
});
