// Billing-module domain types — Phase 1a (deterministic, no local-AI dependency).
// Mirrors the data model in docs/specs/medical-billing-analysis-module-synthesis.md
// Part 4 and the bill-ledger structure in project instructions §10.

/** Type 1 = raw (provider unpaid); Type 2 = health-insurance-paid. §10. */
export type BillType = 1 | 2;

export type ClaimType = 'professional' | 'facility' | 'unknown';

/** Where the claim-type value came from — detection is a hint, attorney wins. */
export type ClaimTypeSource = 'detected' | 'attorney';

export interface MedicalBill {
  id: string;
  caseId: string;
  /** CL-2: the client whose body this bill belongs to. Pooling across clients
   *  distorts paid-or-incurred and the Ch. 146 cap input. Optional because a
   *  case the backfill flagged has no client yet — its bills are not blocked
   *  and never get an invented owner. */
  clientId?: string;
  /** Provider-business party this bill attaches to (bills live at the provider-business level, §10). */
  providerPartyId?: string;
  /** Short human label, e.g. "ProCare — chiropractic course of treatment". */
  label: string;
  billType: BillType;
  claimType: ClaimType;
  claimTypeSource: ClaimTypeSource;
  serviceStart?: string;
  serviceEnd?: string;
  // --- Type 1 & 2 ---
  billedAmount: number;
  /** Type 1: reduction negotiated on the full billed amount. */
  negotiatedReduction?: number;
  // --- Type 2 ledger (reconciliation: billed - payment - adjustment = remaining balance) ---
  insurerPayment?: number;
  contractualAdjustment?: number;
  patientBalance?: number;
  /** Type 2: reduction negotiated on the remaining patient balance. */
  balanceReduction?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Mapping state of a line's CPT/HCPCS code. Only 'confirmed' feeds confirmed analysis totals. */
export type LineMappingStatus = 'unmapped' | 'suggested' | 'confirmed';

export interface BillLineItem {
  id: string;
  billId: string;
  serviceDate?: string;
  rawDescription: string;
  revenueCode?: string;
  /** The provider's own internal chargemaster code, if printed on the bill. */
  chargemasterCode?: string;
  qty: number;
  unitCharge: number;
  extendedCharge: number;
  /** CPT/HCPCS in effect for analysis (suggested until confirmed). */
  cpt?: string;
  cptModifier?: string;
  mappingStatus: LineMappingStatus;
  /** 0..1 trigram similarity behind a suggestion — drives the confidence badge. */
  suggestionConfidence?: number;
  mappingSource?: 'chargemaster_memory' | 'attorney';
  confirmedBy?: string;
  confirmedDate?: string;
  /** Scenario candidates for indeterminate codes (e.g. ED level could be 99283/99284/99285). */
  scenarioCpts?: string[];
  notes?: string;
}

/** Chargemaster memory: confirmed description→CPT pairs, keyed on description+code
 *  (hospitals reuse the same CPT across distinct chargemaster lines — dry-run finding). */
export interface CodeMapping {
  id: string;
  /** Provider-business party the mapping was learned from (cross-provider matches rank lower). */
  providerPartyId?: string;
  rawDescription: string;
  chargemasterCode?: string;
  cpt: string;
  mappingSource: 'chargemaster_memory' | 'attorney';
  confirmedBy: string;
  confirmedDate: string;
  /** Protective-order-derived mappings never enter cross-case memory (guardrail 4). */
  protectiveOrder: boolean;
  isActive: boolean;
  notes?: string;
}

/** Light EOB record on Type 2 bills. patient_responsibility is the Ch. 146
 *  hospital-lien cap input — typed and source-pinned, never a number from memory. */
export interface EOBRecord {
  id: string;
  billId: string;
  documentLink?: string;
  insurerPayment?: number;
  contractualAdjustment?: number;
  patientResponsibility?: number;
  /** Where on the source document the figure appears, e.g. "EOB dated 5/2, p. 2, 'patient responsibility' box". */
  sourcePin?: string;
  updatedAt: string;
}

export type AnalysisRunStatus = 'provisional' | 'confirmed';

/** Registry snapshot stamped on every run — which rule versions the output relied on. */
export interface RegistryStamp {
  ruleId: string;
  ruleKey: string;
  version: number;
  status: LegalRuleStatus;
  /** Whether this bill's analysis actually touches the proposition (off claim
   *  type, bill type, emergency-care signals). Absent on pre-2026-07-25 runs;
   *  reports split implicated from general-background entries on it. */
  implicated?: boolean;
}

export interface AnalysisRunTotals {
  billed: number;
  /** Billed total across lines that have a confirmed CPT with a benchmark rate. */
  confirmedBilled: number;
  confirmedBenchmark: number;
  /** Ratio leads the report (decision-queue item 2): confirmedBilled / confirmedBenchmark. */
  confirmedRatio?: number;
  /** Scenario view: same math including unconfirmed suggested mappings — clearly labeled, never feeds downstream. */
  scenarioBilled: number;
  scenarioBenchmark: number;
  scenarioRatio?: number;
  matchedLineCount: number;
  scenarioLineCount: number;
  unanalyzedLineCount: number;
  /** Billed dollars sitting outside every ratio (no CPT or no rate) — disclosed
   *  next to the headline so the denominator's exclusions are visible. Absent
   *  on pre-2026-07-25 runs. */
  unanalyzedBilled?: number;
}

export interface AnalysisRun {
  id: string;
  caseId: string;
  billId: string;
  /** CL-2: follows the bill, carried DENORMALIZED so per-client queries don't
   *  join through bills. Keep it in step with the bill's own clientId. */
  clientId?: string;
  runDate: string;
  scheduleIds: string[];
  /** Free-form assumptions (e.g. ED-level scenario selections), JSON-serializable. */
  assumptions: Record<string, unknown>;
  totals: AnalysisRunTotals;
  status: AnalysisRunStatus;
  reviewer?: string;
  reviewedDate?: string;
  disclaimerVersion: string;
  registryStamps: RegistryStamp[];
}

/** DATA-LAYER GATE (synthesis Part 5 guardrail): only CONFIRMED runs may feed
 *  settlement/lien math, cross-case aggregates, or any downstream dollar
 *  figure — including the future settlement and lien tabs. Consumers filter
 *  through this function instead of reading run.status inline, so the rule
 *  has one enforcement point. Preserves input order (newest-first stays
 *  newest-first). */
export function settlementEligibleRuns(runs: AnalysisRun[]): AnalysisRun[] {
  return runs.filter((r) => r.status === 'confirmed');
}

export interface AnalysisResultLine {
  id: string;
  runId: string;
  lineItemId: string;
  cptUsed?: string;
  /** Whether this line entered confirmed totals, scenario totals only, or neither. */
  tier: 'confirmed' | 'scenario' | 'unanalyzed';
  allowable?: number;
  scheduleId?: string;
  /** Pinpoint cite into the schedule, e.g. "Demo schedule 2026, code 98940". */
  cite?: string;
  ratio?: number;
  notes?: string;
}

/** Aggregated billing-pattern analytics per provider-business party (synthesis
 *  Part 4), attached to the existing party record. A computed projection over
 *  CONFIRMED runs only — recomputed on run confirmation, never hand-edited.
 *  Stores ratios and flags, never client identities (guardrail 7). */
export interface ProviderBillingProfile {
  id: string;
  providerPartyId: string;
  /** Aggregate confirmed billed ÷ confirmed benchmark across the latest confirmed run per bill, cross-case. */
  avgBilledToMedicareRatio?: number;
  /** Auto-feeds from settlement billed-vs-final outcomes once the settlement module lands. */
  historicalReductionPct?: number;
  /** Distinct coding-audit checks that have flagged on this provider's bills. */
  commonFlags: string[];
  lastAnalysisDate?: string;
  updatedAt: string;
}

export interface ReviewLogEntry {
  id: string;
  entityType: string;
  entityId: string;
  action: 'suggested' | 'confirmed' | 'edited' | 'rejected' | 'created' | 'generated' | 'cancelled';
  user: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
}

// ---------- Legal Rule Registry (system-wide core infrastructure) ----------

export type LegalRuleStatus = 'unverified' | 'verified' | 'watch';

export interface LegalRule {
  id: string;
  /** Stable short key modules reference, e.g. "cprc-41-0105". */
  ruleKey: string;
  proposition: string;
  cites: string[];
  scope: 'system' | 'billing' | 'liens' | 'playbooks' | 'deadlines';
  /** Verified status requires attorney sign-off — the app never sets it programmatically. */
  status: LegalRuleStatus;
  lastVerifiedDate?: string;
  verifiedBy?: string;
  watchFlags?: string;
  notes?: string;
  /** Bumped on every edit; analysis runs stamp the version they relied on. */
  version: number;
  createdAt: string;
  updatedAt: string;
}

// ---------- Fee schedules ----------

export type FeeScheduleSourceType = 'public' | 'demo' | 'discovery' | 'licensed' | 'hospital_mrf';

export interface FeeSchedule {
  id: string;
  name: string;
  sourceType: FeeScheduleSourceType;
  year?: string;
  locality?: string;
  /** Payer party link for non-public schedules; null for public/demo. */
  payerPartyId?: string;
  notes?: string;
  createdAt: string;
}

export interface FeeScheduleRate {
  id: string;
  scheduleId: string;
  code: string;
  modifier?: string;
  description?: string;
  rate: number;
  setting?: 'inpatient' | 'outpatient';
  /** Pinpoint locator into the source, e.g. "CMS PFS Look-Up export row 118". */
  sourceLocator?: string;
}

// ---------- Generated documents ----------

export type DocumentAudience = 'internal' | 'lienholder' | 'client' | 'opposing';
/** Reuses the system-wide privilege vocabulary (transcript layer) — no parallel scheme. */
export type PrivilegeTier = 'attorney-client' | 'work-product' | 'non-privileged';

export interface GeneratedDocument {
  id: string;
  caseId: string;
  runId?: string;
  /** FE-D1 (2026-08-20) widened this from a single value. The disclosures
   *  engine writes the second; the billing module still writes the first. */
  docType: 'reasonable-value-report' | 'trcp-194-2b-195-5-disclosures';
  audience: DocumentAudience;
  privilegeTier: PrivilegeTier;
  title: string;
  /** Full report content (markdown) stored on the record for now — document storage arrives later.
   *  For a rendered .docx this holds the document's plain text, which is what
   *  makes a generated instrument searchable without storing its bytes. */
  content: string;
  disclaimerVersion: string;
  generatedBy: string;
  generatedAt: string;

  // ---- FE-D1 §10: the generated-document record + FE-8's retention half ----
  // All optional: the billing module's rows have none of them and are never
  // invented one.

  /** Which template version produced this — stamped so a served document can
   *  always be traced to the exact text that produced it. */
  templateVersionId?: string;
  /** Which bundled .docx skeleton it was rendered against. */
  skeletonKey?: string;
  /** WHERE THE FILE WAS FILED — metadata, not storage. Document storage is
   *  gate-7 territory and this slice builds none of it. */
  docxPath?: string;
  pdfPath?: string;
  /** The full wizard-answer snapshot, for §2 item 9's supplementation replay.
   *  This IS FE-8's retention half; the attorney-edit DIFF is expressly OUT. */
  answers?: unknown;
  /** FE-15: drives title, certificate inclusion and the footer name together. */
  instrumentPosture?: 'original' | 'amended' | 'supplemental';
  /** The supplementation chain — which document this one supersedes. */
  supersedesDocumentId?: string;
}

// ---------- Constants ----------

/** Single-user phase: every review-log/confirmation attribution is the attorney. */
export const ATTORNEY_USER = 'Michael Brennan (attorney)';

/** v1 wording approved by Michael 2026-07-23 (Phase 1a walkthrough). Open task
 *  (spec-feedback item 8): research on-point legal authority to inform the
 *  language; a future authority-grounded revision bumps this version. */
export const DISCLAIMER_VERSION = 'v1-2026-07-23';

/** Shown on every analysis screen and stamped on every generated report (guardrail 1). */
export const DISCLAIMER_TEXT =
  'ESTIMATES, NOT ADJUDICATION. Benchmark figures are analytical estimates prepared as attorney ' +
  'work product. They are not determinations of the reasonableness of any charge or of any amount ' +
  'owed. Ratios compare billed charges to benchmark schedule amounts; benchmark schedules are not ' +
  'commercial allowables. Facility bills are compared against professional-schedule benchmarks in ' +
  'this phase and the comparison may substantially misstate facility-specific allowables — treat ' +
  'facility figures as directional only. No output asserts the current state of any legal rule; ' +
  'legal propositions carry the verification status shown in the Legal Rule Registry.';

/** Trigram-confidence bands for suggestion badges. */
export const CONFIDENCE_HIGH = 0.7;
export const CONFIDENCE_MEDIUM = 0.45;
/** Below this, no suggestion is offered at all. */
export const CONFIDENCE_FLOOR = 0.25;

export function confidenceBand(score: number): 'high' | 'medium' | 'low' {
  if (score >= CONFIDENCE_HIGH) return 'high';
  if (score >= CONFIDENCE_MEDIUM) return 'medium';
  return 'low';
}

/** Type 2 reconciliation (§10): billed - insurer payment - contractual adjustment = remaining balance. */
export function reconcileType2(bill: MedicalBill): { expectedBalance: number; discrepancy: number | null } {
  const expectedBalance = bill.billedAmount - (bill.insurerPayment ?? 0) - (bill.contractualAdjustment ?? 0);
  if (bill.patientBalance === undefined) return { expectedBalance, discrepancy: null };
  return { expectedBalance, discrepancy: bill.patientBalance - expectedBalance };
}

/** The number settlement math uses per §10 — full sticker on Type 1, true remaining balance on Type 2. */
export function outstandingAmount(bill: MedicalBill): number {
  if (bill.billType === 1) return bill.billedAmount - (bill.negotiatedReduction ?? 0);
  return (bill.patientBalance ?? 0) - (bill.balanceReduction ?? 0);
}
