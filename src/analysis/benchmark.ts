// Benchmark analysis (B1-start + B2 scenario handling). Pure computation —
// persistence happens in the caller through the data adapter.
//
// Two tiers, kept strictly separate (guardrail 2 + decision-queue item 7):
//  - CONFIRMED: lines whose CPT the attorney confirmed and that have a schedule
//    rate. Only these feed the headline ratio, and only a CONFIRMED run may
//    ever feed settlement/lien math downstream.
//  - SCENARIO: lines with an unconfirmed suggested CPT, computed under the
//    labeled assumption "suggested mappings treated as correct". Never flows
//    downstream; exists so the attorney can see what confirming would show.

import type {
  AnalysisRun, AnalysisResultLine, AnalysisRunTotals, BillLineItem, FeeSchedule,
  FeeScheduleRate, LegalRule, MedicalBill, RegistryStamp,
} from '../domain/billing';
import { DISCLAIMER_VERSION } from '../domain/billing';

export interface BenchmarkInput {
  bill: MedicalBill;
  lines: BillLineItem[];
  schedules: FeeSchedule[];
  rates: FeeScheduleRate[];
  registryRules: LegalRule[];
  /** id generator — injected so this module stays pure. */
  makeId: () => string;
}

export interface BenchmarkOutput {
  run: AnalysisRun;
  resultLines: AnalysisResultLine[];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function computeAnalysis(input: BenchmarkInput): BenchmarkOutput {
  const { bill, lines, schedules, rates, registryRules, makeId } = input;

  // code (+ optional setting) → best rate. Phase 1a schedules are professional,
  // so setting is usually absent; kept for forward-compatibility with MRF data.
  const rateByCode = new Map<string, FeeScheduleRate>();
  for (const r of rates) {
    const existing = rateByCode.get(r.code);
    if (!existing) rateByCode.set(r.code, r);
  }
  const scheduleById = new Map(schedules.map((s) => [s.id, s]));

  const runId = makeId();
  const resultLines: AnalysisResultLine[] = [];
  const totals: AnalysisRunTotals = {
    billed: 0, confirmedBilled: 0, confirmedBenchmark: 0, scenarioBilled: 0,
    scenarioBenchmark: 0, matchedLineCount: 0, scenarioLineCount: 0, unanalyzedLineCount: 0,
  };

  for (const line of lines) {
    totals.billed += line.extendedCharge;
    const cpt = line.cpt;
    const rate = cpt ? rateByCode.get(cpt) : undefined;
    const schedule = rate ? scheduleById.get(rate.scheduleId) : undefined;

    if (rate && line.mappingStatus === 'confirmed') {
      const allowable = round2(rate.rate * line.qty);
      totals.confirmedBilled += line.extendedCharge;
      totals.confirmedBenchmark += allowable;
      totals.scenarioBilled += line.extendedCharge;
      totals.scenarioBenchmark += allowable;
      totals.matchedLineCount++;
      resultLines.push({
        id: makeId(), runId, lineItemId: line.id, cptUsed: cpt, tier: 'confirmed',
        allowable, scheduleId: rate.scheduleId,
        cite: `${schedule?.name ?? 'schedule'}${schedule?.year ? ` (${schedule.year})` : ''}, code ${rate.code}${rate.sourceLocator ? `, ${rate.sourceLocator}` : ''}`,
        ratio: allowable > 0 ? round2(line.extendedCharge / allowable) : undefined,
      });
    } else if (rate && line.mappingStatus === 'suggested') {
      const allowable = round2(rate.rate * line.qty);
      totals.scenarioBilled += line.extendedCharge;
      totals.scenarioBenchmark += allowable;
      totals.scenarioLineCount++;
      resultLines.push({
        id: makeId(), runId, lineItemId: line.id, cptUsed: cpt, tier: 'scenario',
        allowable, scheduleId: rate.scheduleId,
        cite: `${schedule?.name ?? 'schedule'}${schedule?.year ? ` (${schedule.year})` : ''}, code ${rate.code}${rate.sourceLocator ? `, ${rate.sourceLocator}` : ''}`,
        ratio: allowable > 0 ? round2(line.extendedCharge / allowable) : undefined,
        notes: 'Suggested mapping — not confirmed. Scenario tier only.',
      });
    } else {
      totals.unanalyzedLineCount++;
      resultLines.push({
        id: makeId(), runId, lineItemId: line.id, cptUsed: cpt, tier: 'unanalyzed',
        notes: !cpt
          ? 'No CPT/HCPCS mapped.'
          : line.mappingStatus !== 'confirmed'
            ? 'Suggested CPT has no rate in the loaded schedules.'
            : 'Confirmed CPT has no rate in the loaded schedules.',
      });
    }
  }

  totals.billed = round2(totals.billed);
  totals.confirmedBilled = round2(totals.confirmedBilled);
  totals.confirmedBenchmark = round2(totals.confirmedBenchmark);
  totals.scenarioBilled = round2(totals.scenarioBilled);
  totals.scenarioBenchmark = round2(totals.scenarioBenchmark);
  if (totals.confirmedBenchmark > 0) totals.confirmedRatio = round2(totals.confirmedBilled / totals.confirmedBenchmark);
  if (totals.scenarioBenchmark > 0) totals.scenarioRatio = round2(totals.scenarioBilled / totals.scenarioBenchmark);

  // Stamp every billing-scoped + system-scoped registry rule version relied on (guardrail 5).
  const registryStamps: RegistryStamp[] = registryRules
    .filter((r) => r.scope === 'billing' || r.scope === 'system')
    .map((r) => ({ ruleId: r.id, ruleKey: r.ruleKey, version: r.version, status: r.status }));

  const run: AnalysisRun = {
    id: runId,
    caseId: bill.caseId,
    billId: bill.id,
    runDate: new Date().toISOString(),
    scheduleIds: schedules.map((s) => s.id),
    assumptions: {
      scenarioTier: 'Suggested (unconfirmed) CPT mappings treated as correct in the scenario tier only.',
      claimType: bill.claimType,
    },
    totals,
    status: 'provisional',
    disclaimerVersion: DISCLAIMER_VERSION,
    registryStamps,
  };

  return { run, resultLines };
}
