// Regression tests for the 2026-07-25 walkthrough defects.
//
// Item 3 (HIGH): with a demo schedule seeded first and a public schedule also
// containing the code, lookup took the demo rate on every line — fabricating a
// LOWER ratio (3.23× vs the true 3.61×), the flattering-the-bill direction.
// Item 6: registry stamps carry an `implicated` flag driven off claim type /
// bill type / emergency signals — ProCare (Type 1 professional chiro) and
// Central Texas Regional (Type 2 facility ER) are the design-side test pair.

import { describe, expect, it } from 'vitest';
import type { BillLineItem, FeeSchedule, FeeScheduleRate, LegalRule, MedicalBill } from '../../domain/billing';
import { computeAnalysis, runScheduleSelection } from '../benchmark';

let n = 0;
const makeId = () => `id-${++n}`;

const demoSchedule: FeeSchedule = {
  id: 'fs-demo', name: 'DEMO benchmark schedule', sourceType: 'demo', year: '2026', createdAt: 't',
};
const publicSchedule: FeeSchedule = {
  id: 'fs-pfs', name: 'Medicare PFS 2026 — TX Rest of State', sourceType: 'public', year: '2026', createdAt: 't',
};

// Demo seeded FIRST (the shadowing order observed live) and both contain 99203.
const rates: FeeScheduleRate[] = [
  { id: 'r-demo', scheduleId: 'fs-demo', code: '99203', rate: 115, sourceLocator: 'demo seed' },
  { id: 'r-pfs', scheduleId: 'fs-pfs', code: '99203', rate: 114.05, sourceLocator: 'import row 7113' },
];

const procare: MedicalBill = {
  id: 'mb-procare', caseId: 'c1', label: 'ProCare', billType: 1,
  claimType: 'professional', claimTypeSource: 'detected', billedAmount: 350,
  createdAt: 't', updatedAt: 't',
};
const ctrmc: MedicalBill = {
  id: 'mb-ctrmc', caseId: 'c1', label: 'Central Texas Regional', billType: 2,
  claimType: 'facility', claimTypeSource: 'detected', billedAmount: 4120,
  insurerPayment: 1150, contractualAdjustment: 2120, patientBalance: 850,
  createdAt: 't', updatedAt: 't',
};

const officeVisit: BillLineItem = {
  id: 'li-1', billId: 'mb-procare', rawDescription: 'OFFICE VISIT NEW PT LEVEL 3',
  qty: 1, unitCharge: 350, extendedCharge: 350, cpt: '99203', mappingStatus: 'confirmed',
};
const erVisit: BillLineItem = {
  id: 'li-2', billId: 'mb-ctrmc', rawDescription: 'EMERGENCY DEPT VISIT LEVEL 4', revenueCode: '0450',
  qty: 1, unitCharge: 1890, extendedCharge: 1890, cpt: '99284', mappingStatus: 'suggested',
};
const unmappedTraction: BillLineItem = {
  id: 'li-3', billId: 'mb-procare', rawDescription: 'MECH CERV TRACTION THXPY',
  qty: 1, unitCharge: 145, extendedCharge: 145, mappingStatus: 'unmapped',
};

const rule = (ruleKey: string, scope: LegalRule['scope']): LegalRule => ({
  id: `lr-${ruleKey}`, ruleKey, proposition: ruleKey, cites: [], scope,
  status: 'unverified', version: 1, createdAt: 't', updatedAt: 't',
});
const registryRules = [
  rule('cprc-41-0105', 'billing'),
  rule('nsa-emergency', 'billing'),
  rule('price-transparency', 'billing'),
  rule('ch146-eob-cap', 'billing'),
  rule('tx-2025-sweep', 'system'),
];

const both = { schedules: [demoSchedule, publicSchedule], rates, registryRules, makeId };

describe('fee-schedule selection (walkthrough defect, Item 3)', () => {
  it('auto mode: a non-demo schedule shadows the demo schedule, never the reverse', () => {
    const { run, resultLines } = computeAnalysis({ bill: procare, lines: [officeVisit], ...both });
    expect(resultLines[0].scheduleId).toBe('fs-pfs');
    expect(run.totals.confirmedBenchmark).toBe(114.05);
    const sel = runScheduleSelection(run)!;
    expect(sel.mode).toBe('auto');
    expect(sel.usedScheduleIds).toEqual(['fs-pfs']);
    expect(sel.demoUsed).toBe(false);
  });

  it('demo rates still price lines when no real schedule is loaded — flagged demoUsed', () => {
    const { run, resultLines } = computeAnalysis({
      bill: procare, lines: [officeVisit], schedules: [demoSchedule],
      rates: rates.filter((r) => r.scheduleId === 'fs-demo'), registryRules, makeId,
    });
    expect(resultLines[0].scheduleId).toBe('fs-demo');
    expect(runScheduleSelection(run)!.demoUsed).toBe(true);
  });

  it('attorney selection wins outright and is stamped on the run', () => {
    const { run, resultLines } = computeAnalysis({
      bill: procare, lines: [officeVisit], ...both, selectedScheduleId: 'fs-demo',
    });
    expect(resultLines[0].scheduleId).toBe('fs-demo');
    const sel = runScheduleSelection(run)!;
    expect(sel.mode).toBe('attorney');
    expect(sel.demoUsed).toBe(true);
  });
});

describe('unanalyzed-dollar disclosure (Item 5)', () => {
  it('totals carry the billed dollars sitting outside the ratio', () => {
    const { run } = computeAnalysis({ bill: procare, lines: [officeVisit, unmappedTraction], ...both });
    expect(run.totals.unanalyzedLineCount).toBe(1);
    expect(run.totals.unanalyzedBilled).toBe(145);
  });
});

describe('registry-stamp relevance (Item 6 — the ProCare/CTRMC before/after pair)', () => {
  const implicatedKeys = (bill: MedicalBill, lines: BillLineItem[]) => {
    const { run } = computeAnalysis({ bill, lines, ...both });
    return new Map(run.registryStamps.map((s) => [s.ruleKey, s.implicated]));
  };

  it('ProCare (Type 1 professional, no ER): NSA, MRF, and Ch. 146 stamp as background', () => {
    const m = implicatedKeys(procare, [officeVisit, unmappedTraction]);
    expect(m.get('nsa-emergency')).toBe(false);
    expect(m.get('price-transparency')).toBe(false);
    expect(m.get('ch146-eob-cap')).toBe(false);
    expect(m.get('cprc-41-0105')).toBe(true);
    expect(m.get('tx-2025-sweep')).toBe(true);
  });

  it('Central Texas Regional (Type 2 facility, ER): all three squarely implicated', () => {
    const m = implicatedKeys(ctrmc, [erVisit]);
    expect(m.get('nsa-emergency')).toBe(true);
    expect(m.get('price-transparency')).toBe(true);
    expect(m.get('ch146-eob-cap')).toBe(true);
  });
});
