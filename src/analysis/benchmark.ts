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
  /** Attorney-chosen schedule for this run. Omitted = auto: any non-demo
   *  schedule with rates shadows the demo schedule entirely, never the
   *  reverse (2026-07-25 walkthrough defect — demo's 13 common PI codes
   *  were shadowing the real 7,740-rate import on every coded line). */
  selectedScheduleId?: string;
}

/** How the run picked its schedule — stamped on the AnalysisRun itself
 *  (go-live gate 8) so a wrong schedule is visible without reading cites. */
export interface ScheduleSelection {
  mode: 'attorney' | 'auto';
  selectedScheduleId?: string;
  /** Schedules that actually priced at least one line. */
  usedScheduleIds: string[];
  usedScheduleNames: string[];
  /** True when any priced line drew on a demo-source schedule — every surface
   *  showing this run's ratio must carry a placeholder banner. */
  demoUsed: boolean;
}

/** Typed accessor for the selection stamp (runs predating 2026-07-25 lack it). */
export function runScheduleSelection(run: AnalysisRun): ScheduleSelection | undefined {
  const sel = run.assumptions.scheduleSelection as ScheduleSelection | undefined;
  return sel && Array.isArray(sel.usedScheduleIds) ? sel : undefined;
}

/** Emergency-care signals: ER revenue codes (045x), ED E/M codes, or the
 *  description saying so. Drives NSA-registry relevance, nothing computed. */
function isEmergencyLine(l: BillLineItem): boolean {
  return Boolean(
    l.revenueCode?.startsWith('045') ||
    (l.cpt && /^9928[1-5]$/.test(l.cpt)) ||
    /EMERG/i.test(l.rawDescription),
  );
}

/** Whether a registry rule is actually touched by this bill's analysis, off
 *  claimType / billType / emergency-care signals (2026-07-25 walkthrough:
 *  a report that cites everything cites nothing). Keyed to seeded ruleKeys;
 *  unknown keys stay implicated — over-inclusion is the safe direction. */
function ruleImplicated(ruleKey: string, bill: MedicalBill, emergency: boolean): boolean {
  switch (ruleKey) {
    case 'nsa-emergency': return emergency;
    case 'price-transparency': return bill.claimType === 'facility';
    case 'ch146-eob-cap': return bill.billType === 2;
    default: return true;
  }
}

export interface BenchmarkOutput {
  run: AnalysisRun;
  resultLines: AnalysisResultLine[];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function computeAnalysis(input: BenchmarkInput): BenchmarkOutput {
  const { bill, lines, schedules, rates, registryRules, makeId, selectedScheduleId } = input;

  const scheduleById = new Map(schedules.map((s) => [s.id, s]));

  // Which rates may price lines. Attorney choice wins outright; in auto mode a
  // demo schedule never shadows real data — its rates leave the pool the moment
  // any non-demo schedule has rates.
  let usableRates = rates;
  if (selectedScheduleId) {
    usableRates = rates.filter((r) => r.scheduleId === selectedScheduleId);
  } else {
    const hasNonDemo = rates.some((r) => scheduleById.get(r.scheduleId)?.sourceType !== 'demo');
    if (hasNonDemo) usableRates = rates.filter((r) => scheduleById.get(r.scheduleId)?.sourceType !== 'demo');
  }

  // code (+ optional setting) → best rate. Phase 1a schedules are professional,
  // so setting is usually absent; kept for forward-compatibility with MRF data.
  const rateByCode = new Map<string, FeeScheduleRate>();
  for (const r of usableRates) {
    const existing = rateByCode.get(r.code);
    if (!existing) rateByCode.set(r.code, r);
  }

  const runId = makeId();
  const resultLines: AnalysisResultLine[] = [];
  const totals: AnalysisRunTotals = {
    billed: 0, confirmedBilled: 0, confirmedBenchmark: 0, scenarioBilled: 0,
    scenarioBenchmark: 0, matchedLineCount: 0, scenarioLineCount: 0, unanalyzedLineCount: 0,
    unanalyzedBilled: 0,
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
      totals.unanalyzedBilled = (totals.unanalyzedBilled ?? 0) + line.extendedCharge;
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
  totals.unanalyzedBilled = round2(totals.unanalyzedBilled ?? 0);
  if (totals.confirmedBenchmark > 0) totals.confirmedRatio = round2(totals.confirmedBilled / totals.confirmedBenchmark);
  if (totals.scenarioBenchmark > 0) totals.scenarioRatio = round2(totals.scenarioBilled / totals.scenarioBenchmark);

  // Stamp every billing-scoped + system-scoped registry rule version relied on
  // (guardrail 5), marking which ones this bill actually implicates so the
  // report can split "implicated" from "general background".
  const emergency = lines.some(isEmergencyLine);
  const registryStamps: RegistryStamp[] = registryRules
    .filter((r) => r.scope === 'billing' || r.scope === 'system')
    .map((r) => ({
      ruleId: r.id, ruleKey: r.ruleKey, version: r.version, status: r.status,
      implicated: ruleImplicated(r.ruleKey, bill, emergency),
    }));

  // Selection stamp: which schedules actually priced lines this run.
  const usedScheduleIds = [...new Set(resultLines.filter((rl) => rl.scheduleId).map((rl) => rl.scheduleId!))];
  const scheduleSelection: ScheduleSelection = {
    mode: selectedScheduleId ? 'attorney' : 'auto',
    selectedScheduleId,
    usedScheduleIds,
    usedScheduleNames: usedScheduleIds.map((id) => scheduleById.get(id)?.name ?? id),
    demoUsed: usedScheduleIds.some((id) => scheduleById.get(id)?.sourceType === 'demo'),
  };

  const run: AnalysisRun = {
    id: runId,
    caseId: bill.caseId,
    billId: bill.id,
    runDate: new Date().toISOString(),
    scheduleIds: schedules.map((s) => s.id),
    assumptions: {
      scenarioTier: 'Suggested (unconfirmed) CPT mappings treated as correct in the scenario tier only.',
      claimType: bill.claimType,
      scheduleSelection,
    },
    totals,
    status: 'provisional',
    disclaimerVersion: DISCLAIMER_VERSION,
    registryStamps,
  };

  return { run, resultLines };
}
