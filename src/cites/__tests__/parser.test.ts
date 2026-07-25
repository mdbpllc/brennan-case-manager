// The design-space test table (docs/specs/cite-parser-test-cases.md) verbatim.
// Numbering follows the table. URL pattern per design §2, live-verified
// 2026-07-25 (V1–V3 resolved — see codes.ts header).

import { describe, expect, it } from 'vitest';
import { parseCite } from '../parser';

const GOV = 'https://statutes.capitol.texas.gov/docs';

describe('standard statutory forms (#1–15)', () => {
  it('#1 Tex. Fam. Code § 153.002', () => {
    const r = parseCite('Tex. Fam. Code § 153.002');
    expect(r).toMatchObject({ kind: 'statute', code: 'FA', chapter: '153', section: '153.002' });
    expect(r.url).toBe(`${GOV}/FA/htm/FA.153.htm#153.002`);
  });

  it('#2 Texas Family Code Section 153.002', () => {
    expect(parseCite('Texas Family Code Section 153.002')).toMatchObject({
      kind: 'statute', code: 'FA', chapter: '153', section: '153.002',
    });
  });

  it('#3 Family Code 153.002', () => {
    expect(parseCite('Family Code 153.002')).toMatchObject({
      kind: 'statute', code: 'FA', section: '153.002',
    });
  });

  it('#4 Tex. Penal Code § 22.01(b)(2) — subsection separate, anchor stays 22.01', () => {
    const r = parseCite('Tex. Penal Code § 22.01(b)(2)');
    expect(r).toMatchObject({ kind: 'statute', code: 'PE', chapter: '22', section: '22.01', subsection: '(b)(2)' });
    expect(r.anchor).toBe('22.01');
    expect(r.url).toBe(`${GOV}/PE/htm/PE.22.htm#22.01`);
  });

  it('#5 Tex. Civ. Prac. & Rem. Code § 41.0105', () => {
    expect(parseCite('Tex. Civ. Prac. & Rem. Code § 41.0105')).toMatchObject({
      kind: 'statute', code: 'CP', chapter: '41', section: '41.0105',
    });
  });

  it('#6 CPRC 18.001(e)', () => {
    expect(parseCite('CPRC 18.001(e)')).toMatchObject({
      kind: 'statute', code: 'CP', chapter: '18', section: '18.001', subsection: '(e)',
    });
  });

  it("#7 Tex. Gov't Code § 411.0735", () => {
    expect(parseCite("Tex. Gov't Code § 411.0735")).toMatchObject({
      kind: 'statute', code: 'GV', chapter: '411', section: '411.0735',
    });
  });

  it('#8 Tex. Prop. Code § 55.002', () => {
    expect(parseCite('Tex. Prop. Code § 55.002')).toMatchObject({
      kind: 'statute', code: 'PR', chapter: '55', section: '55.002',
    });
  });

  it('#9 Tex. Ins. Code § 542.058', () => {
    expect(parseCite('Tex. Ins. Code § 542.058')).toMatchObject({
      kind: 'statute', code: 'IN', chapter: '542', section: '542.058',
    });
  });

  it('#10 Tex. Health & Safety Code § 481.115', () => {
    expect(parseCite('Tex. Health & Safety Code § 481.115')).toMatchObject({
      kind: 'statute', code: 'HS', chapter: '481', section: '481.115',
    });
  });

  it('#11 Tex. Est. Code § 256.003 (V3: ES confirmed live)', () => {
    expect(parseCite('Tex. Est. Code § 256.003')).toMatchObject({
      kind: 'statute', code: 'ES', chapter: '256', section: '256.003',
    });
  });

  it('#12 Tex. Bus. & Com. Code § 17.46 (DTPA; V3: BC confirmed live)', () => {
    expect(parseCite('Tex. Bus. & Com. Code § 17.46')).toMatchObject({
      kind: 'statute', code: 'BC', chapter: '17', section: '17.46',
    });
  });

  it('#13 Tex. Lab. Code § 408.001', () => {
    expect(parseCite('Tex. Lab. Code § 408.001')).toMatchObject({
      kind: 'statute', code: 'LA', chapter: '408', section: '408.001',
    });
  });

  it('#14 § 153.002, Family Code (drafting order)', () => {
    expect(parseCite('§ 153.002, Family Code')).toMatchObject({
      kind: 'statute', code: 'FA', chapter: '153', section: '153.002',
    });
  });

  it('#15 Section 18.001, Civil Practice and Remedies Code (THE bill-text convention)', () => {
    expect(parseCite('Section 18.001, Civil Practice and Remedies Code')).toMatchObject({
      kind: 'statute', code: 'CP', chapter: '18', section: '18.001',
    });
  });
});

describe('CCP articles (#16–20)', () => {
  it('#16 Tex. Code Crim. Proc. art. 55A.053 (V2: CR.55A.htm confirmed live)', () => {
    const r = parseCite('Tex. Code Crim. Proc. art. 55A.053');
    expect(r).toMatchObject({ kind: 'ccp-article', code: 'CR', chapter: '55A', section: '55A.053' });
    expect(r.url).toBe(`${GOV}/CR/htm/CR.55A.htm#55A.053`);
  });

  it('#17 CCP art. 17.15', () => {
    expect(parseCite('CCP art. 17.15')).toMatchObject({
      kind: 'ccp-article', code: 'CR', chapter: '17', section: '17.15',
    });
  });

  it('#18 Article 42A.701(f), Code of Criminal Procedure', () => {
    expect(parseCite('Article 42A.701(f), Code of Criminal Procedure')).toMatchObject({
      kind: 'ccp-article', code: 'CR', chapter: '42A', section: '42A.701', subsection: '(f)',
    });
  });

  it('#19 bare Art. 38.23 — context resolves, no context → candidates, never a silent guess', () => {
    expect(parseCite('Art. 38.23', { codeHint: 'CR' })).toMatchObject({
      kind: 'ccp-article', code: 'CR', section: '38.23',
    });
    const bare = parseCite('Art. 38.23');
    expect(bare.kind).toBe('ambiguous');
    expect(bare.candidates?.[0]).toMatchObject({ kind: 'ccp-article', code: 'CR', section: '38.23' });
  });

  it('#20 Chapter 55A, Code of Criminal Procedure — chapter-level, URL without anchor', () => {
    const r = parseCite('Chapter 55A, Code of Criminal Procedure');
    expect(r).toMatchObject({ kind: 'ccp-article', code: 'CR', chapter: '55A' });
    expect(r.section).toBeUndefined();
    expect(r.url).toBe(`${GOV}/CR/htm/CR.55A.htm`);
  });
});

describe('other special forms (#21–25)', () => {
  it('#21 Tex. Const. art. I, § 9 (CN layout live-verified: CN.1.htm#1.9)', () => {
    const r = parseCite('Tex. Const. art. I, § 9');
    expect(r).toMatchObject({ kind: 'constitution', code: 'CN', article: 'I', section: '9' });
    expect(r.url).toBe(`${GOV}/CN/htm/CN.1.htm#1.9`);
  });

  it('#22 §§ 411.071–411.0775 — range needs code context; endpoints kept, inclusive', () => {
    const r = parseCite('§§ 411.071–411.0775', { codeHint: 'GV' });
    expect(r).toMatchObject({
      kind: 'statute', code: 'GV', chapter: '411',
      range: { start: '411.071', end: '411.0775', inclusive: true },
    });
    expect(parseCite('§§ 411.071–411.0775').kind).toBe('ambiguous');
  });

  it('#23 Chapter 146, Civil Practice and Remedies Code — chapter-level', () => {
    const r = parseCite('Chapter 146, Civil Practice and Remedies Code');
    expect(r).toMatchObject({ kind: 'statute', code: 'CP', chapter: '146' });
    expect(r.section).toBeUndefined();
  });

  it('#24 Tex. R. Civ. P. 192.3(h) — rule, classified but never linked to statutes', () => {
    const r = parseCite('Tex. R. Civ. P. 192.3(h)');
    expect(r).toMatchObject({ kind: 'rule', ruleSet: 'TRCP', rule: '192.3', subsection: '(h)' });
    expect(r.url).toBeUndefined();
  });

  it('#25 Tex. R. Evid. 503 — rule', () => {
    expect(parseCite('Tex. R. Evid. 503')).toMatchObject({ kind: 'rule', ruleSet: 'TRE', rule: '503' });
  });
});

describe('registry cite forms (beyond the table — the seeded rules use these)', () => {
  it('name-first chapter: Tex. Prop. Code Ch. 55', () => {
    const r = parseCite('Tex. Prop. Code Ch. 55');
    expect(r).toMatchObject({ kind: 'statute', code: 'PR', chapter: '55' });
    expect(r.url).toBe(`${GOV}/PR/htm/PR.55.htm`);
  });

  it('no-space section marker: Tex. Civ. Prac. & Rem. Code §41.0105', () => {
    expect(parseCite('Tex. Civ. Prac. & Rem. Code §41.0105')).toMatchObject({
      kind: 'statute', code: 'CP', section: '41.0105',
    });
  });

  it('bill number with year: HB 2929 (2019)', () => {
    expect(parseCite('HB 2929 (2019)')).toMatchObject({ kind: 'bill-number', bill: 'HB 2929' });
  });

  it('case cites stay unlinked: Haygood v. De Escabedo, 356 S.W.3d 390', () => {
    expect(parseCite('Haygood v. De Escabedo, 356 S.W.3d 390 (Tex. 2011)').kind).toBe('not-a-cite');
  });
});

describe('false-positive guards (#26–31)', () => {
  it('#26 42 U.S.C. § 1983 — federal, never a TX code', () => {
    const r = parseCite('42 U.S.C. § 1983');
    expect(r.kind).toBe('federal');
    expect(r.code).toBeUndefined();
  });

  it('#27 45 C.F.R. pt. 180 — federal', () => {
    expect(parseCite('45 C.F.R. pt. 180').kind).toBe('federal');
  });

  it('#28 HB 2929 / S.B. 30 — bill numbers feed the bill tracker', () => {
    expect(parseCite('HB 2929')).toMatchObject({ kind: 'bill-number', bill: 'HB 2929' });
    expect(parseCite('S.B. 30')).toMatchObject({ kind: 'bill-number', bill: 'SB 30' });
  });

  it('#29 2025-CI-08841 — cause number, not a cite', () => {
    expect(parseCite('2025-CI-08841').kind).toBe('not-a-cite');
  });

  it('#30 Section 8 of the contract — not a cite', () => {
    expect(parseCite('Section 8 of the contract').kind).toBe('not-a-cite');
  });

  it('#31 § 3.01 of the partnership agreement — not a cite', () => {
    expect(parseCite('§ 3.01 of the partnership agreement').kind).toBe('not-a-cite');
  });
});
