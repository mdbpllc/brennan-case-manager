import { describe, expect, it } from 'vitest';
import type { CaseRecord } from '../../domain/types';
import type { Charge } from '../../domain/oaa';
import { parseTier1 } from '../parseTier1';
import { detectSettings, noFutureSettingFound } from '../hearings';
import { checkAttorney, findDuplicateMatters, normalizeCauseNumber } from '../validate';
import { UVALDE_OAA_TEXT } from './fixtures';

const TODAY = '2026-07-24';

describe('hearing auto-detect (spec §2)', () => {
  const ex = parseTier1(UVALDE_OAA_TEXT, 'uvalde-real-v1');

  it('labels the docket availability date semantically and auto-creates it (Tier 1, unambiguous, future)', () => {
    const candidates = detectSettings(ex, TODAY);
    const docket = candidates.find((c) => c.kind === 'docket_availability');
    expect(docket).toBeDefined();
    expect(docket!.startLocal).toBe('2026-08-14');
    expect(docket!.allDay).toBe(true);
    expect(docket!.inPast).toBe(false);
    expect(docket!.autoCreate).toBe(true);
    expect(docket!.label).toMatch(/not a confirmed setting/i);
  });

  it('keeps administrative dates off the calendar', () => {
    const admin = detectSettings(ex, TODAY).filter((c) => c.kind === 'administrative');
    expect(admin.length).toBeGreaterThan(0);
    expect(admin.every((c) => !c.autoCreate)).toBe(true);
  });

  it('stale-date guard: a past candidate is never auto-created', () => {
    const candidates = detectSettings(ex, '2026-09-01'); // after the docket date
    const docket = candidates.find((c) => c.kind === 'docket_availability');
    expect(docket!.inPast).toBe(true);
    expect(docket!.autoCreate).toBe(false);
    expect(noFutureSettingFound(candidates)).toBe(true); // → "is a hearing already set?" prompt
  });

  it('Tier 2 never auto-creates', () => {
    const tier2 = { ...ex, tier: 2 as const };
    const candidates = detectSettings(tier2, TODAY);
    expect(candidates.every((c) => !c.autoCreate)).toBe(true);
  });
});

describe('attorney check (spec §1c hard stop)', () => {
  it('accepts reasonable variants of Michael', () => {
    expect(checkAttorney('MICHAEL BRENNAN').result).toBe('match');
    expect(checkAttorney('M. Brennan').result).toBe('match');
    expect(checkAttorney('Brennan, Michael D.').result).toBe('match');
  });
  it('hard-stops on a different attorney (the DeWitt substitution scenario)', () => {
    const res = checkAttorney('RAMONA VILLARREAL');
    expect(res.result).toBe('mismatch');
  });
  it('flags a missing name for manual confirmation', () => {
    expect(checkAttorney(undefined).result).toBe('missing');
    expect(checkAttorney('  ').result).toBe('missing');
  });
});

describe('duplicate-matter check (spec §1c)', () => {
  const t = '2026-01-01T00:00:00Z';
  const cases: CaseRecord[] = [
    {
      id: 'c1', fileNumber: '26-0002', practiceArea: 'Criminal', caseType: 'Misdemeanor',
      caption: 'State v. Boyd', status: 'Plea negotiations', piFlags: [],
      dateOpened: '2026-02-02', causeNumber: '26-CR-01452', createdAt: t, updatedAt: t,
    },
    {
      id: 'c2', fileNumber: '26-0009', practiceArea: 'Criminal', caseType: 'Felony',
      caption: 'State v. Okafor', status: 'Pre-indictment', piFlags: [],
      dateOpened: '2026-03-01', createdAt: t, updatedAt: t,
    },
  ];
  const charges: Charge[] = [
    {
      id: 'ch1', caseId: 'c2', offense: 'POSS CS PG 2 < 1G', causeNumber: '2026-05-14822',
      mtrMta: false, appeal: false, createdAt: t, updatedAt: t,
    },
  ];

  it('normalizes cause numbers before comparing', () => {
    expect(normalizeCauseNumber('26-CR-01452')).toBe('26CR01452');
    expect(normalizeCauseNumber('2026 05 14822')).toBe('20260514822');
  });

  it('matches against case-level cause numbers', () => {
    const hits = findDuplicateMatters(['26 CR 01452'], cases, charges);
    expect(hits).toHaveLength(1);
    expect(hits[0].fileNumber).toBe('26-0002');
  });

  it('matches against charge records too', () => {
    const hits = findDuplicateMatters(['2026-05-14822'], cases, charges);
    expect(hits).toHaveLength(1);
    expect(hits[0].caption).toBe('State v. Okafor');
  });

  it('returns nothing on fresh cause numbers', () => {
    expect(findDuplicateMatters(['2027-01-00001'], cases, charges)).toHaveLength(0);
  });
});
