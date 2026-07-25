// Reasonable-value analysis report generator (G1). Ratio-led per decision-queue
// item 2. Internal work product by default; the disclaimer and registry-status
// block are part of the document, not optional chrome.

import type {
  AnalysisResultLine, AnalysisRun, BillLineItem, FeeSchedule, LegalRule, MedicalBill,
} from '../domain/billing';
import type { AuditFinding } from './codingAudit';
import { DISCLAIMER_TEXT } from '../domain/billing';
import { runScheduleSelection } from './benchmark';

function money(n: number | undefined): string {
  if (n === undefined) return '—';
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ratioStr(r: number | undefined): string {
  return r === undefined ? '—' : `${r.toFixed(2)}×`;
}

export interface ReportContext {
  bill: MedicalBill;
  providerName?: string;
  caseLabel: string;
  lines: BillLineItem[];
  run: AnalysisRun;
  resultLines: AnalysisResultLine[];
  auditFindings: AuditFinding[];
  registryRules: LegalRule[];
  /** Currently loaded schedules — names the benchmark in the headline and
   *  detects demo-source ratios for the placeholder banner. */
  schedules: FeeSchedule[];
}

export function renderReasonableValueReport(ctx: ReportContext): { title: string; content: string } {
  const { bill, providerName, caseLabel, lines, run, resultLines, auditFindings, registryRules, schedules } = ctx;
  const t = run.totals;
  const lineById = new Map(lines.map((l) => [l.id, l]));
  const scheduleById = new Map(schedules.map((s) => [s.id, s]));
  const title = `Reasonable-value analysis — ${providerName ?? bill.label} (${caseLabel})`;

  // Which schedule(s) actually priced lines: the run's selection stamp when
  // present (2026-07-25+), else reconstructed from the per-line cites.
  const sel = runScheduleSelection(run);
  const usedIds = sel?.usedScheduleIds ?? [...new Set(resultLines.filter((rl) => rl.scheduleId).map((rl) => rl.scheduleId!))];
  const usedNames = sel?.usedScheduleNames ?? usedIds.map((id) => scheduleById.get(id)?.name ?? '(schedule no longer loaded)');
  const demoUsed = sel?.demoUsed ?? usedIds.some((id) => scheduleById.get(id)?.sourceType === 'demo');

  const parts: string[] = [];
  parts.push(`# ${title}`);
  parts.push(`**INTERNAL — ATTORNEY WORK PRODUCT. Not for production or disclosure.**`);
  parts.push(`Run ${run.id} · ${new Date(run.runDate).toLocaleString()} · status: **${run.status.toUpperCase()}**${run.status === 'provisional' ? ' (provisional — does not feed settlement or lien math)' : ''}`);

  // Ratio leads — with the schedule it was computed against named right here,
  // so a wrong schedule is visible without reading the cite column (gate 8).
  parts.push(`## Headline`);
  if (t.confirmedRatio !== undefined) {
    parts.push(
      `Confirmed-mapped charges run **${ratioStr(t.confirmedRatio)} the benchmark schedule amount** ` +
      `(${money(t.confirmedBilled)} billed vs ${money(t.confirmedBenchmark)} benchmark across ${t.matchedLineCount} confirmed line${t.matchedLineCount === 1 ? '' : 's'}).`,
    );
  } else {
    parts.push(`No confirmed-mapped lines have benchmark rates yet — confirm CPT mappings to produce a headline ratio.`);
  }
  if (usedNames.length > 0) {
    parts.push(`Benchmark schedule: **${usedNames.join('** + **')}**.`);
  }
  if (demoUsed) {
    parts.push(
      `> **PLACEHOLDER BENCHMARK — DEMO SCHEDULE.** One or more ratios above were computed against the ` +
      `seeded demo fee schedule (fictional rates, NOT Medicare data). No number in this report is usable ` +
      `until a real schedule is imported on the Benchmarks page and the analysis is re-run.`,
    );
  }
  if (t.unanalyzedLineCount > 0) {
    const excluded = t.unanalyzedBilled ??
      resultLines.filter((rl) => rl.tier === 'unanalyzed')
        .reduce((s, rl) => s + (lineById.get(rl.lineItemId)?.extendedCharge ?? 0), 0);
    parts.push(
      `**${t.unanalyzedLineCount} line${t.unanalyzedLineCount === 1 ? '' : 's'} / ${money(excluded)} in billed charges excluded** ` +
      `from every ratio above — no CPT mapped, or no rate in the loaded schedules. The denominator does not see these dollars.`,
    );
  }
  if (t.scenarioLineCount > 0 && t.scenarioRatio !== undefined) {
    parts.push(
      `*Scenario view (includes ${t.scenarioLineCount} unconfirmed suggested mapping${t.scenarioLineCount === 1 ? '' : 's'} — labeled, non-binding):* ` +
      `${ratioStr(t.scenarioRatio)} (${money(t.scenarioBilled)} vs ${money(t.scenarioBenchmark)}). ` +
      `The scenario ratio can land above or below the confirmed ratio — unconfirmed lines may price at higher or lower multiples than the confirmed ones.`,
    );
  }

  if (bill.claimType === 'facility') {
    parts.push(
      `> **FACILITY BILL — HARD CAVEAT.** This bill was detected/marked as a facility (UB-04) claim. ` +
      `The benchmarks above are professional-schedule figures; facility reimbursement runs on different ` +
      `schedules and methodologies and observed facility rates have run several times professional ` +
      `benchmarks. Directional use only until facility-specific data (hospital MRF, Phase 2) is loaded.`,
    );
  }

  parts.push(`## Bill summary`);
  parts.push(`- Bill: ${bill.label} (Type ${bill.billType} — ${bill.billType === 1 ? 'raw, provider unpaid' : 'health-insurance-paid'})`);
  parts.push(`- Total billed: ${money(bill.billedAmount)}`);
  if (bill.billType === 2) {
    parts.push(`- Insurer payment: ${money(bill.insurerPayment)} · contractual adjustment: ${money(bill.contractualAdjustment)} · remaining patient balance: ${money(bill.patientBalance)}`);
  }

  parts.push(`## Per-line results`);
  parts.push(`| Line | CPT | Tier | Billed | Benchmark | Ratio | Cite |`);
  parts.push(`|---|---|---|---|---|---|---|`);
  for (const rl of resultLines) {
    const line = lineById.get(rl.lineItemId);
    if (!line) continue;
    parts.push(
      `| ${line.rawDescription.replace(/\|/g, '/')} | ${rl.cptUsed ?? '—'} | ${rl.tier} | ${money(line.extendedCharge)} | ${money(rl.allowable)} | ${ratioStr(rl.ratio)} | ${rl.cite ?? '—'} |`,
    );
  }

  if (auditFindings.length > 0) {
    parts.push(`## Coding-audit flags (deterministic checks — for attorney attention, not conclusions)`);
    for (const f of auditFindings) {
      const line = lineById.get(f.lineItemId);
      parts.push(`- **${f.check}** on "${line?.rawDescription ?? f.lineItemId}": ${f.detail}`);
    }
  }

  parts.push(`## Legal Rule Registry status`);
  parts.push(`This analysis stamps the following registry entries (version at run time). No unverified rule drives any computed legal outcome in this report.`);
  const stampByRule = new Map(run.registryStamps.map((s) => [s.ruleId, s]));
  const stamped = registryRules
    .map((rule) => ({ rule, stamp: stampByRule.get(rule.id) }))
    .filter((x): x is { rule: LegalRule; stamp: NonNullable<typeof x.stamp> } => Boolean(x.stamp));
  const entryLine = ({ rule, stamp }: typeof stamped[number]) =>
    `- [${stamp.status.toUpperCase()}] ${rule.proposition} (${rule.cites.join('; ')}) — v${stamp.version}`;
  // Split implicated from background when the run recorded relevance
  // (2026-07-25 — a report that cites everything cites nothing). Older runs
  // predate the flag and render the flat list.
  if (stamped.some((x) => x.stamp.implicated !== undefined)) {
    const implicated = stamped.filter((x) => x.stamp.implicated !== false);
    const background = stamped.filter((x) => x.stamp.implicated === false);
    parts.push(`**Implicated by this analysis:**`);
    for (const x of implicated) parts.push(entryLine(x));
    if (background.length > 0) {
      parts.push(`**General background (stamped for version tracking; not specifically implicated by this bill):**`);
      for (const x of background) parts.push(entryLine(x));
    }
  } else {
    for (const x of stamped) parts.push(entryLine(x));
  }

  parts.push(`## Disclaimer (${run.disclaimerVersion})`);
  parts.push(DISCLAIMER_TEXT);

  return { title, content: parts.join('\n\n') };
}
