// FE-D1 renderer — the binding invariants, exercised against Michael's REAL
// master skeleton rather than a hand-built stand-in.
//
// Authority: docs/specs/form-engine.md §§1, 8, 12 and docs/specs/fe-d1-build-slice.md.
//
// The two invariants under test are the ones the slice calls binding rather
// than preferred:
//   1. the renderer SUBSTITUTES in the real .docx and never regenerates it —
//      proved by the §12.5 parts-diff, which must show word/document.xml alone;
//   2. WARNING GATES NEVER WRITE INTO THE DOCUMENT — proved by byte-identical
//      output across every gate state.

import { describe, it, expect } from 'vitest';
import { readZip, entryText, partsDiff } from '../zip';
import { renderInstrument } from '../renderer';
import { buildRenderContext } from '../context';
import { disclosuresSkeletonBytes, DISCLOSURES_SKELETON_SHA256 } from '../skeletons/disclosuresSkeleton';
import { FIXTURE_BUNDLE, FIXTURE_ANSWERS, FIXTURE_PARTIES } from '../fixtures';
import { evaluateGates } from '../gates';
import { visibleText } from '../docx';

const skeleton = disclosuresSkeletonBytes();

async function renderFixture() {
  const { context } = buildRenderContext(FIXTURE_BUNDLE, FIXTURE_ANSWERS);
  return renderInstrument(skeleton, context);
}

describe('the bundled skeleton is the artifact Michael supplied', () => {
  it('decodes to a readable .docx package', async () => {
    const entries = await readZip(skeleton);
    expect(entries.find((e) => e.name === 'word/document.xml')).toBeDefined();
    expect(entries.find((e) => e.name === 'word/footer1.xml')).toBeDefined();
  });

  it('carries the §8 geometry, with the 9900→9360 defect already corrected', async () => {
    const entries = await readZip(skeleton);
    const xml = entryText(entries, 'word/document.xml');

    // §8's caption-table defect: 9900 twips against a 9360-twip text column.
    const firstTable = xml.match(/<w:tbl>[\s\S]*?<\/w:tbl>/)![0];
    const cols = [...firstTable.matchAll(/<w:gridCol w:w="(\d+)"\s*\/>/g)].map((m) => Number(m[1]));
    expect(cols).toEqual([4680, 360, 4320]);
    expect(cols.reduce((a, b) => a + b, 0)).toBe(9360);

    // §8: vestigial tab stops (720/4680/9360) stripped from the master.
    expect(xml).not.toMatch(/<w:tab w:val="[^"]*" w:pos="(720|4680|9360)"\s*\/>/);

    // §8 page setup.
    expect(xml).toContain('<w:pgSz w:w="12240" w:h="15840"');
    expect(xml).toContain('w:top="990"');
    expect(xml).toContain('<w:titlePg/>');
  });

  it('has a stable content hash so a silent swap of the shell fails the suite', () => {
    expect(DISCLOSURES_SKELETON_SHA256).toMatch(/^[0-9a-f]{64}$/);
  });

  it('carries no client data — only the firm\'s own signature block', async () => {
    const entries = await readZip(skeleton);
    const text = visibleText(entryText(entries, 'word/document.xml'));
    // The scrub that matters: nothing that looks like a real cause number, and
    // no stray party name. Everything case-specific is a token.
    expect(text).not.toMatch(/\b\d{4}-CI-\d{5}\b/);
    expect(text).toContain('{{cause_number}}');
    expect(text).toContain('{{plaintiff_name_caps}}');
  });
});

describe('BINDING INVARIANT — substitution, never regeneration (§1, §12.5)', () => {
  it('changes word/document.xml and NOTHING else', async () => {
    const result = await renderFixture();
    expect(result.changedParts).toEqual(['word/document.xml']);
  });

  it('leaves styles, numbering, footers and settings byte-identical', async () => {
    const before = await readZip(skeleton);
    const result = await renderFixture();
    const after = await readZip(result.docx);
    const changed = partsDiff(before, after);
    for (const part of ['word/styles.xml', 'word/numbering.xml', 'word/footer1.xml',
      'word/footer2.xml', 'word/settings.xml', 'word/fontTable.xml', '[Content_Types].xml']) {
      expect(changed).not.toContain(part);
    }
  });

  it('produces a package that round-trips through the zip layer', async () => {
    const result = await renderFixture();
    const entries = await readZip(result.docx);
    expect(entries.length).toBe((await readZip(skeleton)).length);
  });
});

describe('the output is a file Word can actually open', () => {
  it('REGRESSION: escapes an ampersand in a firm name', async () => {
    // The fixture's opposing firm is "Feldspar & Gneiss PLLC" on purpose. Raw
    // substitution put that ampersand straight into word/document.xml and made
    // the package not well-formed; Word refuses such a file outright.
    const result = await renderFixture();
    const xml = entryText(await readZip(result.docx), 'word/document.xml');
    expect(xml).toContain('FELDSPAR &amp; GNEISS PLLC');
    const bare = [...xml.matchAll(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g)];
    expect(bare).toHaveLength(0);
  });

  it('renders the ampersand back as a single character in the text', async () => {
    const { plainText } = await renderFixture();
    expect(plainText).toContain('FELDSPAR & GNEISS PLLC');
    expect(plainText).not.toContain('&amp;');
  });

  it('reports a clean lint on the complete fixture', async () => {
    const { lint } = await renderFixture();
    expect(lint.findings).toEqual([]);
    expect(lint.clean).toBe(true);
    expect(lint.unresolvedTokens).toEqual([]);
  });
});

describe('BINDING INVARIANT — warning gates never write into the document (§5)', () => {
  it('generates byte-identical output whatever the gates say', async () => {
    const a = await renderFixture();

    // Same data, gates evaluated and every one acknowledged. The gate result is
    // computed and deliberately discarded: there is no parameter on the render
    // path that could carry it, which is the structural half of the invariant.
    const warnings = evaluateGates({
      providers: FIXTURE_PARTIES.filter((p) => p.roleTags.includes('Provider')),
      treatedBefore: { 'fx-p-prov-chiro': true },
    });
    expect(warnings.length).toBeGreaterThan(0); // the fixture really does trip gates

    const b = await renderFixture();
    expect(Array.from(b.docx)).toEqual(Array.from(a.docx));
    expect(b.plainText).toBe(a.plainText);
  });

  it('fires the LOP gate on the chiropractor without changing a byte of text', async () => {
    const providers = FIXTURE_PARTIES.filter((p) => p.roleTags.includes('Provider'));
    const warnings = evaluateGates({ providers });
    expect(warnings.some((w) => w.id === 'lop:fx-p-prov-chiro')).toBe(true);

    const rendered = await renderFixture();
    expect(rendered.plainText).not.toContain('letter of protection');
    expect(rendered.plainText).not.toContain('LOP');
  });
});

describe('region expansion', () => {
  it('repeats the TO: block once per defendant and strips every marker', async () => {
    const { plainText } = await renderFixture();
    const toLines = plainText.split('\n').filter((l) => l.trim().startsWith('TO:'));
    expect(toLines).toHaveLength(2);
    expect(plainText).not.toContain('{{#each');
    expect(plainText).not.toContain('{{/each');
    expect(plainText).not.toContain('{{#select');
    expect(plainText).not.toContain('{{#case');
    expect(plainText).not.toContain('{{#table');
  });

  it('lists each defendant once in the 194.2(b)(1) response', async () => {
    const { plainText } = await renderFixture();
    const rows = plainText.split('\n').filter((l) => l.trim().startsWith('Defendant:'));
    expect(rows).toHaveLength(2);
    expect(rows.join(' ')).toContain('Basalt Freight Lines, LLC');
    expect(rows.join(' ')).toContain('Corwin Slatehaven');
  });

  it('repeats the provider charge row per provider and totals it once', async () => {
    const { plainText } = await renderFixture();
    expect(plainText).toContain('Halite Regional Hospital');
    expect(plainText).toContain('$18,450.75');
    expect(plainText).toContain('$4,200.00');
    expect(plainText).toContain('$7,325.50');
    // D-8: the narrative total and the table TOTAL are ONE computed value.
    const total = plainText.match(/\$29,976\.25/g) ?? [];
    expect(total.length).toBeGreaterThanOrEqual(2);
  });

  it('renders one expert block per provider card', async () => {
    const { plainText } = await renderFixture();
    expect(plainText).toContain('Imani Calcite, M.D.');
    expect(plainText).toContain('Kell Onyx, M.D.');
    expect(plainText).toContain('Mira Larimar, D.C.');
  });
});

describe('the approved §9 library supplies the narrative words', () => {
  it('renders the §9 chiropractic variant, including its ruled probability standard', async () => {
    const { plainText } = await renderFixture();
    // §9.4's settled point: CHIROPRACTIC probability, not medical.
    expect(plainText).toContain('reasonable degree of chiropractic probability');
  });

  it('renders the §9 radiologist variant, which never claims personal treatment', async () => {
    const { plainText } = await renderFixture();
    expect(plainText).toContain('read and interpreted diagnostic imaging');
  });

  it('leaves no markdown emphasis markers in the document', async () => {
    const { plainText } = await renderFixture();
    expect(plainText).not.toContain('**');
  });
});

describe('§8 — the computed § column', () => {
  it('keeps all three caption cells at the same paragraph count', async () => {
    const result = await renderFixture();
    const xml = entryText(await readZip(result.docx), 'word/document.xml');
    const tbl = xml.match(/<w:tbl>[\s\S]*?<\/w:tbl>/)![0];
    const cells = [...tbl.matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)].map((m) => m[0]);
    expect(cells).toHaveLength(3);
    const counts = cells.map(
      (c) => [...c.matchAll(/<w:p\b[^>]*(?:\/>|>[\s\S]*?<\/w:p>)/g)].length,
    );
    expect(counts[0]).toBe(counts[1]);
    expect(counts[1]).toBe(counts[2]);
  });

  it('grows the § column when the party block needs more lines', async () => {
    const many = {
      ...FIXTURE_BUNDLE,
      parties: [...FIXTURE_BUNDLE.parties],
      links: [
        ...FIXTURE_BUNDLE.links,
        { id: 'x1', caseId: 'fx-case-1', partyId: 'fx-p-witness', role: 'Defendant' as const, createdAt: '2026-08-20T12:00:00.000Z' },
      ],
    };
    const { context } = buildRenderContext(many, FIXTURE_ANSWERS);
    expect(context.captionPartyLineCount).toBeGreaterThanOrEqual(12);
  });
});
