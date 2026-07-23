// Reasonable-value analysis report generator (G1). Ratio-led per decision-queue
// item 2. Internal work product by default; the disclaimer and registry-status
// block are part of the document, not optional chrome.

import type {
  AnalysisResultLine, AnalysisRun, BillLineItem, LegalRule, MedicalBill,
} from '../domain/billing';
import type { AuditFinding } from './codingAudit';
import { DISCLAIMER_TEXT } from '../domain/billing';

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
}

export function renderReasonableValueReport(ctx: ReportContext): { title: string; content: string } {
  const { bill, providerName, caseLabel, lines, run, resultLines, auditFindings, registryRules } = ctx;
  const t = run.totals;
  const lineById = new Map(lines.map((l) => [l.id, l]));
  const title = `Reasonable-value analysis — ${providerName ?? bill.label} (${caseLabel})`;

  const parts: string[] = [];
  parts.push(`# ${title}`);
  parts.push(`**INTERNAL — ATTORNEY WORK PRODUCT. Not for production or disclosure.**`);
  parts.push(`Run ${run.id} · ${new Date(run.runDate).toLocaleString()} · status: **${run.status.toUpperCase()}**${run.status === 'provisional' ? ' (provisional — does not feed settlement or lien math)' : ''}`);

  // Ratio leads.
  parts.push(`## Headline`);
  if (t.confirmedRatio !== undefined) {
    parts.push(
      `Confirmed-mapped charges run **${ratioStr(t.confirmedRatio)} the benchmark schedule amount** ` +
      `(${money(t.confirmedBilled)} billed vs ${money(t.confirmedBenchmark)} benchmark across ${t.matchedLineCount} confirmed line${t.matchedLineCount === 1 ? '' : 's'}).`,
    );
  } else {
    parts.push(`No confirmed-mapped lines have benchmark rates yet — confirm CPT mappings to produce a headline ratio.`);
  }
  if (t.scenarioLineCount > 0 && t.scenarioRatio !== undefined) {
    parts.push(
      `*Scenario view (includes ${t.scenarioLineCount} unconfirmed suggested mapping${t.scenarioLineCount === 1 ? '' : 's'} — labeled, non-binding):* ` +
      `${ratioStr(t.scenarioRatio)} (${money(t.scenarioBilled)} vs ${money(t.scenarioBenchmark)}).`,
    );
  }
  if (t.unanalyzedLineCount > 0) {
    parts.push(`${t.unanalyzedLineCount} line${t.unanalyzedLineCount === 1 ? '' : 's'} unanalyzed (no mapping or no rate) — excluded from all totals above.`);
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
  for (const rule of registryRules) {
    const stamp = stampByRule.get(rule.id);
    if (!stamp) continue;
    parts.push(`- [${stamp.status.toUpperCase()}] ${rule.proposition} (${rule.cites.join('; ')}) — v${stamp.version}`);
  }

  parts.push(`## Disclaimer (${run.disclaimerVersion})`);
  parts.push(DISCLAIMER_TEXT);

  return { title, content: parts.join('\n\n') };
}
