// Billing-module demo seed — entirely fictional, like the rest of the seed data.
// The fee schedule is DEMO DATA with made-up rates: it exists so the analysis
// flow is clickable out of the box, and is labeled so nothing mistakes it for
// real Medicare data. Real CMS PFS data comes in through the CSV importer.
//
// Legal Rule Registry seeds: every proposition from synthesis Part 7 enters as
// UNVERIFIED. Verified status requires attorney sign-off in the UI — nothing
// here or elsewhere in code ever seeds or sets 'verified'.

import type {
  MedicalBill, BillLineItem, CodeMapping, EOBRecord, LegalRule, FeeSchedule, FeeScheduleRate,
} from '../domain/billing';
import { ATTORNEY_USER } from '../domain/billing';

const t = new Date().toISOString();

export function billingSeedData(): {
  bills: MedicalBill[];
  lineItems: BillLineItem[];
  codeMappings: CodeMapping[];
  eobs: EOBRecord[];
  legalRules: LegalRule[];
  feeSchedules: FeeSchedule[];
  feeRates: FeeScheduleRate[];
} {
  const feeSchedules: FeeSchedule[] = [
    {
      id: 'fs-demo', name: 'DEMO benchmark schedule (fictional rates — NOT Medicare data)',
      sourceType: 'demo', year: '2026', locality: 'demo',
      notes: 'Placeholder so the analysis flow works in demo mode. Replace by importing a real CMS PFS Look-Up export for the Texas locality (CSV import on the Benchmarks page).',
      createdAt: t,
    },
  ];

  const rate = (code: string, description: string, r: number): FeeScheduleRate => ({
    id: `fr-${code}`, scheduleId: 'fs-demo', code, description, rate: r, sourceLocator: 'demo seed',
  });

  const feeRates: FeeScheduleRate[] = [
    rate('99203', 'Office visit, new patient, level 3', 115),
    rate('99213', 'Office visit, established patient, level 3', 92),
    rate('98940', 'Chiropractic manipulation, 1-2 regions', 36),
    rate('98941', 'Chiropractic manipulation, 3-4 regions', 52),
    rate('97110', 'Therapeutic exercise, each 15 min', 33),
    rate('97140', 'Manual therapy, each 15 min', 30),
    rate('97012', 'Mechanical traction', 16),
    rate('72040', 'X-ray, cervical spine, 2-3 views', 31),
    rate('72100', 'X-ray, lumbar spine, 2-3 views', 33),
    rate('70450', 'CT head/brain without contrast', 82),
    rate('99283', 'Emergency dept visit, level 3', 68),
    rate('99284', 'Emergency dept visit, level 4', 125),
    rate('99285', 'Emergency dept visit, level 5', 184),
  ];

  const bills: MedicalBill[] = [
    {
      id: 'mb-procare', caseId: 'c-garcia-mvc', clientId: 'cc-garcia', providerPartyId: 'p-prov-procare',
      label: 'ProCare — chiropractic course of treatment', billType: 1,
      claimType: 'professional', claimTypeSource: 'detected',
      serviceStart: '2026-03-18', serviceEnd: '2026-05-29',
      billedAmount: 1280,
      notes: 'Treatment ongoing — bill through 5/29 statement.',
      createdAt: t, updatedAt: t,
    },
    {
      id: 'mb-ctrmc', caseId: 'c-garcia-mvc', clientId: 'cc-garcia', providerPartyId: 'p-hosp-ctrmc',
      label: 'Central Texas Regional — ER visit day of collision', billType: 2,
      claimType: 'facility', claimTypeSource: 'detected',
      serviceStart: '2026-03-14', serviceEnd: '2026-03-14',
      billedAmount: 4120, insurerPayment: 1150, contractualAdjustment: 2120, patientBalance: 850,
      notes: 'BCBS processed 2026-05-02. Balance is the deductible remainder per EOB.',
      createdAt: t, updatedAt: t,
    },
  ];

  const lineItems: BillLineItem[] = [
    // ---- ProCare (professional, Type 1) ----
    {
      id: 'li-p1', billId: 'mb-procare', serviceDate: '2026-03-18',
      rawDescription: 'OFFICE/OUTPATIENT VISIT NEW PT LEVEL 3', qty: 1, unitCharge: 350, extendedCharge: 350,
      cpt: '99203', mappingStatus: 'confirmed', mappingSource: 'attorney',
      confirmedBy: ATTORNEY_USER, confirmedDate: t,
    },
    {
      id: 'li-p2', billId: 'mb-procare', serviceDate: '2026-03-20',
      rawDescription: 'CHIROPRACTIC MANIPULATIVE TX 1-2 REGIONS', qty: 1, unitCharge: 185, extendedCharge: 185,
      cpt: '98940', mappingStatus: 'confirmed', mappingSource: 'attorney',
      confirmedBy: ATTORNEY_USER, confirmedDate: t,
    },
    {
      id: 'li-p3', billId: 'mb-procare', serviceDate: '2026-04-06',
      rawDescription: 'THERAPEUTIC EXERCISE 15 MIN', qty: 4, unitCharge: 95, extendedCharge: 380,
      cpt: '97110', mappingStatus: 'confirmed', mappingSource: 'attorney',
      confirmedBy: ATTORNEY_USER, confirmedDate: t,
    },
    {
      id: 'li-p4', billId: 'mb-procare', serviceDate: '2026-04-06',
      rawDescription: 'MANUAL THERAPY TQ 1/> REGIONS 15 MIN', qty: 2, unitCharge: 110, extendedCharge: 220,
      cpt: '97140', mappingStatus: 'suggested', suggestionConfidence: 0.86, mappingSource: 'chargemaster_memory',
    },
    {
      id: 'li-p5', billId: 'mb-procare', serviceDate: '2026-04-13',
      rawDescription: 'MECH CERV TRACTION THXPY', qty: 1, unitCharge: 145, extendedCharge: 145,
      mappingStatus: 'unmapped',
    },
    // ---- Central Texas Regional (facility, Type 2) ----
    {
      id: 'li-h1', billId: 'mb-ctrmc', serviceDate: '2026-03-14',
      rawDescription: 'EMERGENCY DEPT VISIT LEVEL 4', revenueCode: '0450', qty: 1, unitCharge: 1890, extendedCharge: 1890,
      cpt: '99284', mappingStatus: 'suggested', suggestionConfidence: 0.91, mappingSource: 'chargemaster_memory',
      scenarioCpts: ['99283', '99284', '99285'],
      notes: 'ED level is indeterminate from the statement alone — level 3/4/5 scenario range.',
    },
    {
      id: 'li-h2', billId: 'mb-ctrmc', serviceDate: '2026-03-14',
      rawDescription: 'CT HEAD/BRAIN W/O CONTRAST', revenueCode: '0352', chargemasterCode: 'CTRMC-8802',
      qty: 1, unitCharge: 2230, extendedCharge: 2230,
      cpt: '70450', mappingStatus: 'confirmed', mappingSource: 'attorney',
      confirmedBy: ATTORNEY_USER, confirmedDate: t,
    },
  ];

  const codeMappings: CodeMapping[] = [
    {
      id: 'cm-1', providerPartyId: 'p-prov-procare', rawDescription: 'MANUAL THERAPY TQ 1/> REGIONS 15 MIN',
      cpt: '97140', mappingSource: 'attorney', confirmedBy: ATTORNEY_USER, confirmedDate: t,
      protectiveOrder: false, isActive: true, notes: 'Confirmed on a prior ProCare statement (demo).',
    },
    {
      id: 'cm-2', providerPartyId: 'p-prov-procare', rawDescription: 'THERAPEUTIC EXERCISE 15 MIN',
      cpt: '97110', mappingSource: 'attorney', confirmedBy: ATTORNEY_USER, confirmedDate: t,
      protectiveOrder: false, isActive: true,
    },
    {
      id: 'cm-3', providerPartyId: 'p-hosp-ctrmc', rawDescription: 'EMERGENCY DEPT VISIT LEVEL 4',
      cpt: '99284', mappingSource: 'attorney', confirmedBy: ATTORNEY_USER, confirmedDate: t,
      protectiveOrder: false, isActive: true,
    },
    {
      id: 'cm-4', providerPartyId: 'p-hosp-ctrmc', rawDescription: 'CT HEAD/BRAIN W/O CONTRAST',
      chargemasterCode: 'CTRMC-8802', cpt: '70450', mappingSource: 'attorney',
      confirmedBy: ATTORNEY_USER, confirmedDate: t, protectiveOrder: false, isActive: true,
    },
    {
      id: 'cm-5', providerPartyId: 'p-prov-procare', rawDescription: 'MECHANICAL TRACTION THERAPY',
      cpt: '97012', mappingSource: 'attorney', confirmedBy: ATTORNEY_USER, confirmedDate: t,
      protectiveOrder: false, isActive: true,
    },
  ];

  const eobs: EOBRecord[] = [
    {
      id: 'eob-ctrmc', billId: 'mb-ctrmc', documentLink: 'BCBS EOB dated 2026-05-02 (demo — no document storage yet)',
      insurerPayment: 1150, contractualAdjustment: 2120, patientResponsibility: 850,
      sourcePin: 'EOB dated 2026-05-02, p. 2, "patient responsibility" box',
      updatedAt: t,
    },
  ];

  // Synthesis Part 7 verification list — ALL UNVERIFIED pending attorney sign-off.
  const lr = (
    ruleKey: string, proposition: string, cites: string[], scope: LegalRule['scope'],
    watchFlags?: string, notes?: string,
  ): LegalRule => ({
    id: `lr-${ruleKey}`, ruleKey, proposition, cites, scope, status: 'unverified',
    watchFlags, notes, version: 1, createdAt: t, updatedAt: t,
  });

  const legalRules: LegalRule[] = [
    lr('cprc-41-0105',
      'Recovery of medical expenses is limited to amounts actually paid or incurred (paid-or-incurred rule).',
      ['Tex. Civ. Prac. & Rem. Code §41.0105', 'Haygood v. De Escabedo, 356 S.W.3d 390 (Tex. 2011)'],
      'billing'),
    lr('cprc-18-001',
      'Section 18.001 affidavits and counter-affidavit practice govern proof of reasonableness/necessity of medical expenses; current consequences of counter-affidavit failure need confirmation.',
      ['Tex. Civ. Prac. & Rem. Code §18.001', 'In re Allstate Indem. Co., 622 S.W.3d 870 (Tex. 2021)'],
      'billing',
      'Failed SB 30 §18.001 overhaul — check for re-filed successors (2025–2026 sessions).'),
    lr('negotiated-rate-discovery',
      'Negotiated-rate and reimbursement-rate discovery is available against providers, including LOP providers, on reasonableness of charges.',
      ['In re North Cypress Med. Ctr. Operating Co., 559 S.W.3d 128 (Tex. 2018)', 'In re K & L Auto Crushers, LLC, 627 S.W.3d 239 (Tex. 2021)'],
      'billing'),
    lr('hospital-lien-ch55',
      'Hospital-lien perfection requirements and caps (incl. HB 2929 lesser-of cap) govern hospital lien validity and amount.',
      ['Tex. Prop. Code Ch. 55', 'HB 2929 (2019)'],
      'liens',
      'Check 2025–2026 amendments.',
      'Perfection checklist lives in the liens module spec — single source of truth there.'),
    lr('ch146-eob-cap',
      'The patient-responsibility amount on the EOB is the maximum a provider may pursue where Ch. 146 applies — the cap input for hospital-lien analysis.',
      ['Tex. Civ. Prac. & Rem. Code Ch. 146'],
      'billing'),
    lr('price-transparency',
      'Hospitals must publish machine-readable standard-charge files including payer-specific negotiated rates; upgraded federal requirements (historical allowed amounts, attestation) enforced from April 1, 2026.',
      ['45 C.F.R. pt. 180', 'Tex. Health & Safety Code Ch. 327', '26 Tex. Admin. Code §511.77'],
      'billing',
      'Sub-question: whether an attested v3.0.0 file with unpopulated median columns is compliant (Citizens posture).',
      'Pre-verified via public sources 2026-07-21 — the only source-backed entry, but still unverified pending attorney sign-off.'),
    lr('pfs-data-use',
      'Medicare PFS / OPPS / Texas Medicaid / DWC fee-schedule data is publicly available and usable for internal analytical benchmarking.',
      ['CMS Physician Fee Schedule (public data)', 'Texas Medicaid fee schedules', 'TDI-DWC fee guidelines'],
      'billing',
      undefined,
      'Confirm current-year availability and any licensing terms before outbound use.'),
    lr('nsa-emergency',
      'The federal No Surprises Act constrains balance billing for emergency care and interacts with state balance-billing analysis.',
      ['No Surprises Act, Pub. L. 116-260, div. BB'],
      'billing',
      undefined,
      'Low priority — affects edge cases in reconciliation audits (D2, Phase 2).'),
    lr('tx-2025-sweep',
      'General 2025–2026 Texas legislative changes on medical damages, liens, and affidavit practice may alter multiple propositions above.',
      ['2025 Tex. Leg. (89th Session) — post-session confirmation pending'],
      'system',
      'All 2025 legislation references are pre-/immediately-post-session snapshots — unverified until post-session confirmation (CLAUDE.md registry rule 4).'),
  ];

  return { bills, lineItems, codeMappings, eobs, legalRules, feeSchedules, feeRates };
}
