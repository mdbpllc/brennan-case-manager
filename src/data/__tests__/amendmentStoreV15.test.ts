// FE-D1 AMENDMENT, second half — the v14 → v15 demo-store migration, and the
// two template families the slice adds.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §13 item 5 (the fixed-sentence
// table and the writer-instructions row as versioned data), D-6 (the two
// families) and D-36 (the instructions' home and provenance).
//
// WHY THIS STEP EXISTS AT ALL, which is the part worth reading. Every migration
// before it carried the template bank forward as `old.formTemplates ?? seeded`
// — so a store that already HAD a bank never gained a newly-seeded template.
// That was invisible for as long as the only additions were new VERSIONS of
// templates already present. It stops being invisible the moment a slice seeds
// a new FAMILY: the app would go looking for a fixed sentence to place and find
// nothing there, on exactly the stores that have been in use longest.

import { describe, it, expect, beforeEach } from 'vitest';
import { FIXED_SENTENCES } from '../../forms/fixedSentences';
import { formEngineSeedData } from '../../forms/seed';
import { WRITER_INSTRUCTIONS_KEY } from '../../forms/writerInstructions';

const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { migrateV14ToV15, STORE_VERSION } = await import('../localAdapter');

const KEY = 'brennan-case-manager-v1';

/** A v14 store: it has the FE-D1 bank and none of the amendment's rows. */
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
  } as never;
}

beforeEach(() => mem.clear());

describe('the seed carries both new families (D-6, D-36)', () => {
  const seeded = formEngineSeedData();

  it('seeds one fixed-sentence template per generated row, keyed the same way', () => {
    const fixed = seeded.formTemplates.filter((t) => t.family === 'fixed-sentence');
    expect(fixed).toHaveLength(FIXED_SENTENCES.length);
    expect(fixed).toHaveLength(22);
    expect(fixed.map((t) => t.key).sort()).toEqual(FIXED_SENTENCES.map((f) => f.key).sort());
  });

  it('seeds each fixed sentence BODY byte-equal to the generated constant', () => {
    // The generated constant is itself drift-tested against form-engine.md §9,
    // so this is what carries "approved verbatim" all the way into the bank
    // without anything being retyped on the way.
    for (const f of FIXED_SENTENCES) {
      const tpl = seeded.formTemplates.find((t) => t.key === f.key)!;
      const version = seeded.formTemplateVersions.find((v) => v.id === tpl.currentVersionId)!;
      expect(version.body).toBe(f.text);
      expect(version.settings.slot).toBe(f.slot);
      expect(version.settings.providerType).toBe(f.providerType);
    }
  });

  it('seeds exactly ONE writer-instructions row, and says whose words they are', () => {
    const rows = seeded.formTemplates.filter((t) => t.family === 'writer-instructions');
    expect(rows).toHaveLength(1);
    expect(rows[0].key).toBe(WRITER_INSTRUCTIONS_KEY);
    // D-36: the home is Michael's ruling, the prose is not his, and the row
    // carries that on its face rather than in a design document.
    expect(rows[0].notes).toContain("Claude's wording");
  });

  it('gives the writer all four custodian limbs, which is the one RULED content', () => {
    const tpl = seeded.formTemplates.find((t) => t.key === WRITER_INSTRUCTIONS_KEY)!;
    const body = seeded.formTemplateVersions.find((v) => v.id === tpl.currentVersionId)!.body;
    expect(body).toContain('regular course of business');
    expect(body).toContain('persons with knowledge');
    expect(body).toContain('at or near the time');
    expect(body).toContain('reasonableness');
    // And the instruction that the app never checks any of it (§11.5).
    expect(body).toContain('Do not restate them');
  });

  it('every seeded template still resolves to a real current version', () => {
    for (const t of seeded.formTemplates) {
      expect(seeded.formTemplateVersions.some((v) => v.id === t.currentVersionId)).toBe(true);
    }
  });
});

describe('v14 → v15: the amendment bump', () => {
  it('lands on v15 — the version this step actually produces', () => {
    // Literal, deliberately not STORE_VERSION: reading the constant is what let
    // the v10→v11 step stamp a v11 store as v12 and skip a migration entirely.
    const old = v14Store();
    expect(migrateV14ToV15(old, JSON.stringify(old)).version).toBe(15);
    expect(STORE_VERSION).toBe(15);
  });

  it('adds the fixed sentences and the writer instructions a v14 store lacks', () => {
    const old = v14Store();
    const before = (old as unknown as { formTemplates: unknown[] }).formTemplates.length;
    const out = migrateV14ToV15(old, JSON.stringify(old));

    expect(out.formTemplates.filter((t) => t.family === 'fixed-sentence')).toHaveLength(22);
    expect(out.formTemplates.filter((t) => t.family === 'writer-instructions')).toHaveLength(1);
    expect(out.formTemplates.length).toBe(before + 23);
    // Every added template must arrive WITH a body, or the app places nothing.
    for (const t of out.formTemplates) {
      expect(out.formTemplateVersions.some((v) => v.id === t.currentVersionId)).toBe(true);
    }
  });

  it('NEVER touches a template Michael has already edited', () => {
    const old = v14Store() as unknown as {
      formTemplates: { key: string; currentVersionId?: string }[];
      formTemplateVersions: { id: string; body: string }[];
    };
    const edited = old.formTemplates[1];
    const version = old.formTemplateVersions.find((v) => v.id === edited.currentVersionId)!;
    version.body = 'HIS EDIT — must survive';

    const out = migrateV14ToV15(old as never, JSON.stringify(old));
    const after = out.formTemplates.find((t) => t.key === edited.key)!;
    expect(after.currentVersionId).toBe(edited.currentVersionId);
    expect(out.formTemplateVersions.find((v) => v.id === after.currentVersionId)!.body)
      .toBe('HIS EDIT — must survive');
  });

  it('is idempotent — running it twice adds nothing the second time', () => {
    const old = v14Store();
    const once = migrateV14ToV15(old, JSON.stringify(old));
    const twice = migrateV14ToV15(once, JSON.stringify(once));
    expect(twice.formTemplates.length).toBe(once.formTemplates.length);
    expect(twice.formTemplateVersions.length).toBe(once.formTemplateVersions.length);
  });

  it('writes a full pre-migration backup before reshaping anything', () => {
    const old = v14Store();
    const raw = JSON.stringify(old);
    migrateV14ToV15(old, raw);
    expect(mem.get(`${KEY}-backup-v14`)).toBe(raw);
  });

  it('records what it did in the review log', () => {
    const old = v14Store();
    const out = migrateV14ToV15(old, JSON.stringify(old));
    const entry = out.reviewLog[out.reviewLog.length - 1];
    expect(entry.reason).toContain('backup-v14');
    expect(entry.reason).toContain('No existing template was modified');
  });
});
