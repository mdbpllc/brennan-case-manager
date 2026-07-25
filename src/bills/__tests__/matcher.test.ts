import { describe, expect, it } from 'vitest';
import { extractStatuteRefs, refTouchesTarget, rulesTouchedByRefs } from '../matcher';
import type { LegalRule } from '../../domain/billing';

// Amendatory text in the real drafting conventions the design §4 relies on.
const BILL_TEXT = `
SECTION 1. Section 18.001(b), Civil Practice and Remedies Code, is amended
to read as follows: (b) ...
SECTION 2. Sections 41.001 and 41.0105, Civil Practice and Remedies Code,
are amended to read as follows ...
SECTION 3. Article 55A.053, Code of Criminal Procedure, is amended ...
SECTION 4. Chapter 55, Property Code, is amended by adding Section 55.0021 ...
SECTION 5. Subchapter E-1, Chapter 411, Government Code, is amended ...
SECTION 6. Section 1001.056, Education Code, is amended ...
SECTION 7. This Act takes effect September 1, 2027.
`;

describe('extractStatuteRefs', () => {
  const refs = extractStatuteRefs(BILL_TEXT);
  const key = (r: { code: string; chapter: string; section?: string }) =>
    `${r.code} ${r.section ?? `ch.${r.chapter}`}`;
  const keys = refs.map(key);

  it('finds single-section drafting-order references with subsections', () => {
    expect(keys).toContain('CP 18.001');
  });

  it('expands section enumerations ("Sections X and Y, Code")', () => {
    expect(keys).toContain('CP 41.001');
    expect(keys).toContain('CP 41.0105');
  });

  it('handles CCP articles', () => {
    expect(keys).toContain('CR 55A.053');
  });

  it('handles chapter-level and subchapter references as chapter refs', () => {
    expect(keys).toContain('PR ch.55');
    expect(keys).toContain('GV ch.411');
  });

  it('also catches the section ADDED inside the chapter amendment', () => {
    // "…is amended by adding Section 55.0021 …" has no trailing ", Code" —
    // the chapter-level PR ref covers it; the raw add is not extracted.
    expect(keys).not.toContain('PR 55.0021');
  });

  it('resolves codes strictly — real codes only, with excerpts kept', () => {
    expect(keys).toContain('ED 1001.056');
    const cp = refs.find((r) => r.section === '18.001')!;
    expect(cp.matchConfidence).toBe('exact');
    expect(cp.matchedTextExcerpt).toContain('Section 18.001(b), Civil Practice and Remedies Code');
  });

  it('extracts nothing from prose without drafting-order cites', () => {
    expect(extractStatuteRefs('This Act may be cited as the Fictional Reform Act. It takes effect immediately.')).toEqual([]);
  });
});

describe('refTouchesTarget', () => {
  it('exact section match', () => {
    expect(refTouchesTarget(
      { code: 'CP', chapter: '18', section: '18.001' },
      { code: 'CP', chapter: '18', section: '18.001' },
    )).toBe(true);
    expect(refTouchesTarget(
      { code: 'CP', chapter: '18', section: '18.002' },
      { code: 'CP', chapter: '18', section: '18.001' },
    )).toBe(false);
  });

  it('chapter overlap in either direction', () => {
    // Bill amends whole chapter; rule cites one section of it.
    expect(refTouchesTarget(
      { code: 'PR', chapter: '55' },
      { code: 'PR', chapter: '55', section: '55.002' },
    )).toBe(true);
    // Bill amends one section; rule cites the whole chapter.
    expect(refTouchesTarget(
      { code: 'PR', chapter: '55', section: '55.004' },
      { code: 'PR', chapter: '55' },
    )).toBe(true);
    expect(refTouchesTarget(
      { code: 'PR', chapter: '56' },
      { code: 'PR', chapter: '55' },
    )).toBe(false);
  });
});

describe('rulesTouchedByRefs — against real seeded-rule cites', () => {
  const rule = (id: string, cites: string[]): LegalRule => ({
    id, ruleKey: id, proposition: 'p', cites, scope: 'billing', status: 'unverified',
    version: 1, createdAt: 't', updatedAt: 't',
  });
  const rules = [
    rule('r-18001', ['Tex. Civ. Prac. & Rem. Code §18.001']),
    rule('r-ch55', ['Tex. Prop. Code Ch. 55', 'HB 2929 (2019)']),
    rule('r-unrelated', ['Tex. Fam. Code §153.002']),
  ];

  it('joins bill refs to the rules they touch, and only those', () => {
    const touched = rulesTouchedByRefs(extractStatuteRefs(BILL_TEXT), rules);
    const ids = touched.map((t) => t.rule.id);
    expect(ids).toContain('r-18001');
    expect(ids).toContain('r-ch55');
    expect(ids).not.toContain('r-unrelated');
    expect(touched.find((t) => t.rule.id === 'r-18001')!.matchedRefs).toEqual(['CP 18.001']);
  });
});
