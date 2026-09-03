// FE-D1 — the data layer: the v12 → v13 demo-store migration, adapter parity,
// and the versioning contract the in-app editor depends on.
//
// Authority: docs/specs/fe-d1-build-slice.md items 2, 10 and 11.
//
// PARITY IS THE POINT OF THE SEAM, as it was for gate 10: the binding
// architecture rule is that every feature works in both modes, and the failure
// this guards is one adapter publishing a new template version while the other
// quietly overwrites one — which would make demo mode a liar about what live
// mode does, on the exact question ("what text went out the door") a served
// disclosure eventually raises.

import { describe, it, expect, beforeEach } from 'vitest';
import adapterSource from '../supabaseAdapter.ts?raw';
import { formEngineSeedData } from '../../forms/seed';
import { DISCLOSURE_VARIANTS } from '../../forms/variants';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { LocalAdapter, migrateV12ToV13, STORE_VERSION } = await import('../localAdapter');

const KEY = 'brennan-case-manager-v1';

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
  } as unknown as Parameters<typeof migrateV12ToV13>[0];
}

describe('v12 → v13: the form-engine bump', () => {
  beforeEach(() => { mem.clear(); });

  it('lands on v13 — the version this step actually produces', () => {
    // Literal, deliberately not STORE_VERSION. The v10→v11 step read the
    // constant and was correct only while it happened to be 11; at 12 it
    // stamped a v11 store as v12 and would have skipped v11→v12 entirely,
    // leaving SSNs in the blob. Every step is pinned to a literal now.
    const old = v12Store();
    expect(migrateV12ToV13(old, JSON.stringify(old)).version).toBe(13);
    expect(STORE_VERSION).toBe(14);
  });

  it('is purely additive — nothing existing is read, moved or reshaped', () => {
    const old = v12Store();
    const out = migrateV12ToV13(old, JSON.stringify(old));
    expect(out.cases).toEqual(old.cases);
    expect(out.parties).toEqual(old.parties);
    // Gate 10's promotion must survive this bump untouched.
    expect(out.partyPii).toEqual(old.partyPii);
  });

  it('arrives with the template bank, so demo mode is never empty', () => {
    const old = v12Store();
    const out = migrateV12ToV13(old, JSON.stringify(old));
    expect(out.formTemplates.length).toBeGreaterThan(0);
    expect(out.formTemplateVersions.length).toBeGreaterThan(0);
    expect(out.formFormatProfiles.length).toBe(1);
    // A migrated store must end up with what a reseed would give it, or a demo
    // store older than this version would show an empty template picker.
    expect(out.formTemplates.length).toBe(formEngineSeedData().formTemplates.length);
  });

  it('writes a full pre-migration backup before changing anything', () => {
    const old = v12Store();
    migrateV12ToV13(old, JSON.stringify(old));
    const backup = mem.get(`${KEY}-backup-v12`);
    expect(backup).toBeTruthy();
    expect(JSON.parse(backup!).version).toBe(12);
  });

  it('records the migration in the review log rather than moving silently', () => {
    const old = v12Store();
    const out = migrateV12ToV13(old, JSON.stringify(old));
    const entry = out.reviewLog[out.reviewLog.length - 1];
    expect(entry.entityType).toBe('demo_store');
    expect(entry.reason).toContain('FE-D1 form engine');
  });
});

describe('the seeded template bank', () => {
  it('carries the twelve §9 variants as template DATA, verbatim', () => {
    const { formTemplates, formTemplateVersions } = formEngineSeedData();
    const variants = formTemplates.filter((t) => t.family === 'expert-narrative-variant');
    expect(variants).toHaveLength(12);
    for (const v of DISCLOSURE_VARIANTS) {
      const tpl = variants.find((t) => t.key === v.key);
      expect(tpl, `missing template for ${v.key}`).toBeDefined();
      const version = formTemplateVersions.find((x) => x.id === tpl!.currentVersionId);
      // Verbatim: the seeded body IS the approved paragraph, character for
      // character. §9 carries a do-not-rewrite bar and the slice restates it.
      expect(version!.body).toBe(v.body);
    }
  });

  it('marks the instrument format-authoritative and the variants proposed (FE-12)', () => {
    const { formTemplates } = formEngineSeedData();
    const instrument = formTemplates.find((t) => t.family === 'instrument');
    expect(instrument!.provenance).toBe('format-authoritative');
    // FE-12's flag is about FORMAT provenance, and no §9 variant has been
    // through FE-7 adoption — marking them authoritative would overclaim.
    for (const t of formTemplates.filter((x) => x.family === 'expert-narrative-variant')) {
      expect(t.provenance).toBe('proposed');
    }
  });

  it('gives every template a current version to render', () => {
    const { formTemplates, formTemplateVersions } = formEngineSeedData();
    for (const t of formTemplates) {
      expect(t.currentVersionId, `${t.key} has no current version`).toBeTruthy();
      expect(formTemplateVersions.some((v) => v.id === t.currentVersionId)).toBe(true);
    }
  });

  it('classifies the token registry into the §10 three kinds', () => {
    const { formTokenDefinitions } = formEngineSeedData();
    const kinds = new Set(formTokenDefinitions.map((d) => d.kind));
    expect(kinds).toEqual(new Set(['static', 'inflected', 'computed']));
  });
});

describe('the editor contract — publish, never overwrite (slice item 10)', () => {
  beforeEach(() => { mem.clear(); });

  it('publishing adds a version and repoints the template', async () => {
    const a = new LocalAdapter();
    const tpl = await a.getFormTemplateByKey('disclosures-stock-rtp-response');
    expect(tpl).toBeTruthy();

    const before = await a.listTemplateVersions(tpl!.id);
    const published = await a.publishTemplateVersion(
      tpl!.id, 'None whatsoever.', {}, 'wording tweak',
    );
    const after = await a.listTemplateVersions(tpl!.id);

    expect(after).toHaveLength(before.length + 1);
    expect(published.versionNo).toBe(before[0].versionNo + 1);

    // The OLD version is still there, unchanged. That is the whole point: a
    // served document's text must stay recoverable after the template moves on.
    const original = after.find((v) => v.id === before[0].id);
    expect(original!.body).toBe(before[0].body);

    const repointed = await a.getFormTemplateByKey('disclosures-stock-rtp-response');
    expect(repointed!.currentVersionId).toBe(published.id);
  });

  it('numbers versions monotonically and never reuses one', async () => {
    const a = new LocalAdapter();
    const tpl = await a.getFormTemplateByKey('disclosures-stock-settlement-agreements-response');
    await a.publishTemplateVersion(tpl!.id, 'v2', {});
    await a.publishTemplateVersion(tpl!.id, 'v3', {});
    const versions = await a.listTemplateVersions(tpl!.id);
    const numbers = versions.map((v) => v.versionNo).sort((x, y) => x - y);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it('global tokens come back on a per-template read', async () => {
    const a = new LocalAdapter();
    const tpl = await a.getFormTemplateByKey('disclosures-plaintiff-194-2b-195-5');
    const scoped = await a.listTokenDefinitions(tpl!.id);
    // Every seeded definition is global (no templateId), so a per-template read
    // that filtered them out would return an empty registry.
    expect(scoped.length).toBeGreaterThan(0);
  });
});

describe('adapter parity — both modes implement the same form-engine seam', () => {
  it('the Supabase adapter implements every method the local one does', () => {
    const methods = [
      'listFormTemplates', 'getFormTemplateByKey', 'createFormTemplate',
      'updateFormTemplate', 'listTemplateVersions', 'getTemplateVersion',
      'publishTemplateVersion', 'listTokenDefinitions', 'upsertTokenDefinition',
      'listFormatProfiles', 'upsertFormatProfile',
    ];
    const local = new LocalAdapter() as unknown as Record<string, unknown>;
    for (const m of methods) {
      expect(typeof local[m], `LocalAdapter.${m}`).toBe('function');
      // Source-level check for the Supabase side: constructing it needs a live
      // client, so the seam is verified the way gate 10 verified its own.
      expect(adapterSource, `SupabaseAdapter.${m}`).toContain(`async ${m}(`);
    }
  });

  it('the Supabase adapter reads global tokens alongside template-scoped ones', () => {
    // The local adapter ORs in `templateId === undefined`; the Supabase side
    // must do the same or the two modes disagree about what the registry holds.
    expect(adapterSource).toContain('template_id.is.null');
  });

  it('publishes through an insert, never an update, on the Supabase side', () => {
    const publish = adapterSource.slice(
      adapterSource.indexOf('async publishTemplateVersion('),
      adapterSource.indexOf('async listTokenDefinitions('),
    );
    expect(publish).toContain("insertRow<FormTemplateVersion>('form_template_versions'");
    expect(publish).not.toContain("updateRow<FormTemplateVersion>");
  });
});
