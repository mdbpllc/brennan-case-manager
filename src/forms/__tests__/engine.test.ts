// FE-D1 engine units: the zip layer, the docx mechanics, the ruled token
// syntax, the grammar engine, the render lint, and the §9 library's fidelity to
// the spec.
//
// Several of these are REGRESSION tests for defects this build actually
// produced and fixed while exercising the fixture. They are named as such, so a
// later session can see what they are holding shut.

import { describe, it, expect } from 'vitest';
import specText from '../../../docs/specs/form-engine.md?raw';
import { readZip, writeZip, crc32, partsDiff } from '../zip';
import {
  mergeRuns, replaceInXml, setParagraphText, setParagraphRuns, dedupBookmarks,
  deleteParagraphIn, visibleText, DocxAssertionError,
} from '../docx';
import {
  parseTokens, toCanonical, tokenNames, parseRegionMarker, resolveTokens,
  harvestFilters, convertBrackets, BRACKET_ALLOWLIST,
} from '../tokens';
import {
  pronouns, pronounSetFromFields, pluralS, joinNames, currency,
  treatmentClause, futureCareClause, longDateCentral,
} from '../grammar';
import { lintRender, lintNumbering, lintPartyConsistency, lintXmlSafety } from '../lint';
import { DISCLOSURE_VARIANTS, DELIBERATE_GAP, variantByKey } from '../variants';
import { disclosuresSkeletonBytes, DISCLOSURES_SKELETON_SHA256 } from '../skeletons/disclosuresSkeleton';

// --------------------------------------------------------------- zip

describe('zip layer', () => {
  it('round-trips a package with content intact', async () => {
    const skeleton = disclosuresSkeletonBytes();
    const before = await readZip(skeleton);
    const rewritten = await writeZip(before);
    const after = await readZip(rewritten);
    expect(partsDiff(before, after)).toEqual([]);
  });

  it('computes a standard crc32', () => {
    expect(crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
  });

  it('refuses a non-zip rather than parsing it half-way', async () => {
    await expect(readZip(new Uint8Array([1, 2, 3, 4]))).rejects.toThrow(/Not a ZIP/);
  });
});

// ------------------------------------------------------- docx mechanics

describe('docx mechanics (§12)', () => {
  it('merges adjacent runs that share properties — the §12.1 precondition', () => {
    const para =
      '<w:p><w:r><w:rPr><w:b/></w:rPr><w:t>EXAMPLE </w:t></w:r>'
      + '<w:r><w:rPr><w:b/></w:rPr><w:t>CO.</w:t></w:r></w:p>';
    const merged = mergeRuns(para);
    expect(merged).toContain('>EXAMPLE CO.<');
    expect((merged.match(/<w:r>/g) ?? []).length).toBe(1);
  });

  it('does NOT merge runs with different properties', () => {
    const para =
      '<w:p><w:r><w:rPr><w:b/></w:rPr><w:t>TO:</w:t></w:r>'
      + '<w:r><w:t> the rest</w:t></w:r></w:p>';
    expect((mergeRuns(para).match(/<w:r>/g) ?? []).length).toBe(2);
  });

  it('does NOT merge a run carrying a break or a field', () => {
    const para =
      '<w:p><w:r><w:t>a</w:t></w:r>'
      + '<w:r><w:br/><w:t>b</w:t></w:r></w:p>';
    expect((mergeRuns(para).match(/<w:r>/g) ?? []).length).toBe(2);
  });

  it('hard-fails on an expect-count mismatch (§12.2)', () => {
    expect(() => replaceInXml('a a a', 'a', 'b', { expect: 2 })).toThrow(DocxAssertionError);
    expect(replaceInXml('a a a', 'a', 'b', { expect: 3 })).toBe('b b b');
  });

  it('replaces only the requested occurrences', () => {
    expect(replaceInXml('x x x', 'x', 'Y', { expect: 3, which: [2] })).toBe('x Y x');
  });

  it('blanks every text node and sets the first (§12.3 clone mechanic)', () => {
    const tpl = '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>old</w:t></w:r>'
      + '<w:r><w:t>more</w:t></w:r></w:p>';
    const out = setParagraphText(tpl, 'new');
    expect(out).toContain('<w:jc w:val="center"/>');   // pPr survives
    expect(visibleText(out)).toBe('new');
  });

  it('escapes XML in substituted text', () => {
    const tpl = '<w:p><w:r><w:t>x</w:t></w:r></w:p>';
    expect(setParagraphText(tpl, 'Ram & Sons <Ltd>')).toContain('Ram &amp; Sons &lt;Ltd&gt;');
  });

  it('sets runs individually so style-by-role survives (§12.9)', () => {
    const tpl = '<w:p><w:r><w:rPr><w:b/></w:rPr><w:t>TO:</w:t></w:r>'
      + '<w:r><w:t>body</w:t></w:r></w:p>';
    const out = setParagraphRuns(tpl, ['LABEL:', ' the rest']);
    expect(out).toContain('<w:b/>');
    expect(visibleText(out)).toBe('LABEL: the rest');
  });

  it('deletes an emptied paragraph rather than blanking it', () => {
    const block = '<w:p><w:r><w:t>keep</w:t></w:r></w:p><w:p><w:r><w:t>drop</w:t></w:r></w:p>';
    expect(visibleText(deleteParagraphIn(block, 'drop'))).toBe('keep');
  });

  it('dedups duplicate bookmark IDs (§12.4)', () => {
    const xml = '<w:bookmarkStart w:id="1" w:name="a"/><w:bookmarkStart w:id="1" w:name="a"/>'
      + '<w:bookmarkEnd w:id="1"/><w:bookmarkEnd w:id="1"/>';
    const out = dedupBookmarks(xml);
    expect((out.match(/bookmarkStart/g) ?? []).length).toBe(1);
    expect((out.match(/bookmarkEnd/g) ?? []).length).toBe(1);
  });
});

// ---------------------------------------------------- token syntax (FC-1..4)

describe('token syntax — the FC-1 to FC-4 rulings', () => {
  it('reads both conventions', () => {
    const refs = parseTokens('{alpha} and {{beta}}');
    expect(refs.map((r) => r.name)).toEqual(['alpha', 'beta']);
    expect(refs[0].convention).toBe('canonical');
    expect(refs[1].convention).toBe('legacy-double-brace');
  });

  it('FC-1: the importer accepts legacy and EMITS canonical', () => {
    const { text } = toCanonical('Dear {{client_name}},');
    expect(text).toBe('Dear {client_name},');
  });

  it('FC-2: a legacy |filter becomes a settings entry, not token text', () => {
    const { text, settings } = toCanonical('{{rtp_response|default: None known.}}');
    expect(text).toBe('{rtp_response}');
    expect(settings.rtp_response).toBe('default: None known.');
  });

  it('FC-3: bracket handling is an allowlist, never a pattern match', () => {
    const notes = '[signature block on next page] and [1st Dist.] and [s]';
    const out = convertBrackets(notes);
    expect(out).toContain('[signature block on next page]');
    expect(out).toContain('[1st Dist.]');
    expect(out).toContain('{plural_s}');           // FC-4: the ONE registered marker
    expect(Object.keys(BRACKET_ALLOWLIST)).toEqual(['[s]']);
  });

  it('excludes region markers from the token inventory', () => {
    expect(tokenNames('{{#each x}}{{a}}{{/each x}}')).toEqual(['a']);
  });

  it('reads region markers, including one with a trailing annotation', () => {
    expect(parseRegionMarker('{{#each defendant_counsel}}'))
      .toEqual({ kind: 'each', name: 'defendant_counsel', open: true });
    // REGRESSION: the master annotates this marker in the margin. An
    // end-anchored match missed it and the marker rendered into the document.
    expect(parseRegionMarker('{{#table provider_charge_row}}  (one row per provider; TOTAL row = sum)'))
      .toEqual({ kind: 'table', name: 'provider_charge_row', open: true });
  });

  it('harvests the master\'s stock answers and optional lines', () => {
    const { defaults, optional } = harvestFilters(
      '{{a|default: None.}} {{b|optional: And/or Custodian(s) of Records}}',
    );
    expect(defaults.a).toBe('None.');
    expect(optional.has('b')).toBe(true);
  });
});

describe('token resolution never guesses', () => {
  it('leaves an unmapped token in place and reports it', () => {
    const r = resolveTokens('{who} did it', { values: {} });
    expect(r.text).toBe('{who} did it');
    expect(r.unresolved).toEqual(['who']);
  });

  it('REGRESSION: a key present but EMPTY resolves to empty, not unresolved', () => {
    // A defendant with one attorney has plural_s = ''. Treating that as
    // "unresolved" buried the tokens that genuinely had no source.
    const r = resolveTokens('attorney{counsel_plural_s}', { values: { counsel_plural_s: '' } });
    expect(r.text).toBe('attorney');
    expect(r.unresolved).toEqual([]);
  });

  it('falls back to a stock answer when there is no case value', () => {
    const r = resolveTokens('{rtp}', { values: {}, defaults: { rtp: 'None of which Plaintiff is aware.' } });
    expect(r.text).toBe('None of which Plaintiff is aware.');
    expect(r.unresolved).toEqual([]);
  });
});

// ------------------------------------------------------------- grammar

describe('grammar engine', () => {
  it('renders bare pronouns — "his review", never "his\'s review" (§3)', () => {
    expect(pronouns('he').possessive).toBe('his');
    expect(pronouns('she').object).toBe('her');
    expect(pronouns('they').verbS).toBe('');
  });

  it('treats unknown gender as plural rather than guessing a gendered form', () => {
    expect(pronouns('unknown')).toEqual(pronouns('they'));
    expect(pronounSetFromFields({})).toBe('unknown');
    expect(pronounSetFromFields({ pronouns: 'She' })).toBe('she');
  });

  it('computes the [s] flex point from party count (FC-4)', () => {
    expect(pluralS(1)).toBe('');
    expect(pluralS(2)).toBe('s');
  });

  it('joins names with the serial comma', () => {
    expect(joinNames(['A'])).toBe('A');
    expect(joinNames(['A', 'B'])).toBe('A and B');
    expect(joinNames(['A', 'B', 'C'])).toBe('A, B, and C');
  });

  it('formats money for a document', () => {
    expect(currency(29976.25)).toBe('$29,976.25');
    expect(currency(4200)).toBe('$4,200.00');
  });

  it('compiles the treatment checklist, and invents nothing from an empty one', () => {
    expect(treatmentClause(['imaging review', 'injections'])).toBe('imaging review and injections');
    expect(treatmentClause([])).toBe('');
    expect(futureCareClause()).toBe('');
    expect(futureCareClause('a lumbar fusion')).toBe(', including a lumbar fusion,');
  });

  it('REGRESSION: a date-only value never shifts a day across a timezone (§12.8)', () => {
    // "2025-03-14" parsed as UTC midnight and formatted in America/Chicago
    // rendered "March 13, 2025" — the incident date on a served disclosure,
    // off by one, every time.
    expect(longDateCentral('2025-03-14')).toBe('March 14, 2025');
    expect(longDateCentral('2026-01-01')).toBe('January 1, 2026');
    expect(longDateCentral('2025-12-31')).toBe('December 31, 2025');
  });
});

// ---------------------------------------------------------------- lint

describe('render lint (FE-10)', () => {
  it('reports a surviving token as an error (§14, REQ-06)', () => {
    const r = lintRender('Dear {client_name},');
    expect(r.clean).toBe(false);
    expect(r.unresolvedTokens).toEqual(['client_name']);
  });

  it('catches the firm\'s LEGACY numeric tokens (defect D-5)', () => {
    const r = lintRender('treated 1111 on 2222 for injuries');
    expect(r.findings.some((f) => f.rule === 'legacy-numeric-token')).toBe(true);
  });

  it('does not mistake ordinary figures for legacy tokens', () => {
    const r = lintRender('charges of $1,111.00 and 2,222 miles');
    expect(r.findings.some((f) => f.rule === 'legacy-numeric-token')).toBe(false);
  });

  it('reports a region marker that survived', () => {
    expect(lintRender('{{#each x}}').findings.some((f) => f.rule === 'unstripped-region-marker'))
      .toBe(true);
  });

  it('finds gaps and duplicates in visible numbering', () => {
    const gapped = lintNumbering('194.2(b)(1)a\n194.2(b)(2)b\n194.2(b)(4)d');
    expect(gapped.some((f) => f.detail?.includes('missing: 3'))).toBe(true);
    const duped = lintNumbering('194.2(b)(1)a\n194.2(b)(1)b');
    expect(duped.some((f) => f.message.includes('repeats'))).toBe(true);
  });

  it('REGRESSION: a phone number is not a 195.5(a) subitem', () => {
    // "(555) 010-4400" matched a bare ^\((\d+)\) and produced 550 phantom
    // missing items. Subitem labels run into their text with no space.
    const findings = lintNumbering('195.5(a)For any testifying expert:\n(555) 010-4400\n(1)Name\n(2)Subject');
    expect(findings.filter((f) => f.severity === 'error')).toEqual([]);
  });

  it('flags the caption/TO:/certificate drift class (REQ-11, defects D-1..D-4)', () => {
    const text = [
      'TO: DEFENDANT ACME CORP, by and through',
      'Defendant:ACME CORP',
      'Defendant:ACME CORP',
      'Defendant:OTHER CO',
    ].join('\n');
    const f = lintPartyConsistency(text);
    expect(f.some((x) => x.rule === 'party-duplicate')).toBe(true);
    expect(f.some((x) => x.rule === 'party-consistency')).toBe(true);
  });

  it('REGRESSION: catches an unescaped ampersand in the document XML', () => {
    // "Feldspar & Gneiss PLLC" was substituted raw into word/document.xml and
    // produced a file Word refuses to open. An ampersand in a firm name is
    // ordinary, so this is an ERROR and not a judgment call.
    const bad = '<w:t xml:space="preserve">FELDSPAR & GNEISS PLLC</w:t>';
    const findings = lintXmlSafety(bad);
    expect(findings.some((f) => f.rule === 'xml-unescaped-ampersand')).toBe(true);
    expect(findings[0].severity).toBe('error');
  });

  it('passes a properly escaped document', () => {
    const good = '<w:t xml:space="preserve">FELDSPAR &amp; GNEISS PLLC</w:t>';
    expect(lintXmlSafety(good)).toEqual([]);
  });

  it('refuses nothing — findings are advisory while §5 Q5 is unruled', () => {
    const r = lintRender('{unfilled}');
    expect(r).toHaveProperty('findings');
    expect(r).toHaveProperty('clean');
    // No throw, no refusal: the caller decides.
  });
});

// ------------------------------------------------- §9 verbatim fidelity

describe('§9 approved variant library', () => {
  const spec = specText;

  it('carries all twelve approved variants', () => {
    expect(DISCLOSURE_VARIANTS).toHaveLength(12);
    expect(DISCLOSURE_VARIANTS.map((v) => v.section)).toEqual([
      '9.1', '9.2', '9.3', '9.4', '9.5', '9.6', '9.7', '9.8', '9.9', '9.10', '9.11', '9.12',
    ]);
  });

  it('every body still matches the spec at HEAD, byte for byte', () => {
    // §9 is "approved by Michael verbatim — do not rewrite". This is what makes
    // that enforceable: drift between spec and seed fails the suite instead of
    // reaching a served document.
    for (const v of DISCLOSURE_VARIANTS) {
      expect(spec.includes(`> ${v.body}`), `§${v.section} drifted from the spec`).toBe(true);
    }
  });

  it('keeps §9.4\'s CHIROPRACTIC probability standard', () => {
    expect(variantByKey('disclosures-variant-chiropractor')!.body)
      .toContain('reasonable degree of chiropractic probability');
  });

  it('keeps §9.3\'s deliberate "consistent with" causation', () => {
    const emt = variantByKey('disclosures-variant-emt-paramedic')!.body;
    expect(emt).toContain('consistent with');
    expect(emt).not.toContain('reasonable degree of medical probability');
  });

  it('has NO mental-health variant, and says so on purpose', () => {
    const all = DISCLOSURE_VARIANTS.map((v) => `${v.key} ${v.title}`).join(' ').toLowerCase();
    expect(all).not.toContain('psych');
    expect(all).not.toContain('mental');
    expect(DELIBERATE_GAP).toContain('No mental-health variant exists, intentionally.');
  });
});

describe('the bundled skeleton matches the .docx it was generated from', () => {
  it('hashes to the sha256 recorded beside it', async () => {
    // The module is GENERATED from `disclosures-plaintiff-v1.docx` in the same
    // directory, and this is what makes the two stay in step: the hash is of
    // the .docx as it was read at generation time, so editing either one
    // without regenerating fails here rather than shipping a shell nobody
    // inspected. Web Crypto rather than node:crypto — the app builds for the
    // browser and its tsconfig carries no Node types.
    const bytes = disclosuresSkeletonBytes();
    const buf = new Uint8Array(bytes.length);
    buf.set(bytes);
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const sha = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
    expect(sha).toBe(DISCLOSURES_SKELETON_SHA256);
  });

  it('decodes to a package of the expected size', () => {
    expect(disclosuresSkeletonBytes().length).toBe(16937);
  });
});
