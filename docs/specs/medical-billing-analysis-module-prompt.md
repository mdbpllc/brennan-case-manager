================================================================================
PROMPT: DESIGN EXPLORATION — MEDICAL BILLING ANALYSIS MODULE
FOR A TEXAS PERSONAL INJURY CASE MANAGEMENT SYSTEM
================================================================================

You are a senior product architect and Texas personal-injury litigation
consultant. Your job in this session is to take the design exploration below —
produced by a prior model working with the attorney — and push it to the next
stage: evaluate the candidate capabilities, prioritize them, resolve or sharpen
the open questions, and produce a phased, buildable specification for a
"Medical Billing Analysis" module inside an existing case management system.

Everything you need is in this prompt. Read all of it before responding.

--------------------------------------------------------------------------------
SECTION 1 — WHO THE USER IS AND WHAT ALREADY EXISTS
--------------------------------------------------------------------------------

The user (Michael) is a Texas personal-injury / civil litigation / criminal
defense attorney building a custom case management application with AI
assistance. Relevant, already-settled parts of that system's design:

1. MEDICAL BILL LEDGER (settled). Each medical bill is a small ledger, not one
   number, with a TYPE:
   - Type 1 "raw bill": no one has paid the provider; full billed amount
     outstanding; this is the number presented to the liability insurer.
     Fields: billed amount, negotiated reduction.
   - Type 2 "health-insurance-paid bill": tracks original billed amount,
     insurer payment, contractual adjustment (write-off), remaining patient
     balance, and any negotiated reduction of that balance.
     Reconciliation rule: billed − insurance payment − contractual adjustment
     = remaining balance.
   - Letters of Protection (LOPs) are first-class records linked to provider
     and case (date, terms, document), tracked because LOP providers are
     exposed to negotiated-rate discovery in both directions and LOPs are
     junior to child-support liens.

2. LIENS MODULE (settled, detailed). A 16-type lien taxonomy (hospital lien,
   EMS, self-funded ERISA vs. insured plans, CPRC Ch. 140 lesser-of
   calculator, Medicare BCRC deadline bundle, Medicaid/TMHP, workers' comp,
   child-support, LOP-check, etc.), each type with perfection checklist,
   reduction formula, and document demands. Includes a Ch. 146 EOB
   balance-billing check (the patient-responsibility amount on the EOB is the
   maximum permissible hospital lien) and a pre-disbursement lien-clearance
   gate.

3. SETTLEMENT WORKFLOW (settled). Settlement statement is an auto-populating
   VIEW of data entered elsewhere: medical providers/bills from the Medical
   tab, expenses, fees, liens — showing billed-vs-final everywhere so the
   client sees value created by negotiating bills and liens down, feeding a
   net-to-client total.

4. PARTIES MODEL (settled). Provider businesses, locations, and medical
   professionals are separate linked records with cross-case history. There
   is a "subrogation analyst" party type. Every party has a persistent
   cross-case view.

5. ARCHITECTURE. React front end, Postgres (Supabase) central database,
   documents in OneDrive. A separate LOCAL AI-processing arm (attorney's own
   NVIDIA-GPU PC) exists for privilege/PHI-sensitive audio transcription —
   a deliberate posture that PHI-bearing AI processing stays local unless a
   BAA-covered cloud path is verified. Medical bills are PHI; assume the same
   posture applies to AI processing of billing documents.

6. EXISTING "BANK" INSTINCT. The design already includes a policy-language
   bank (insurance policies collected in litigation, with confidentiality
   flags walling off protective-order material) and a Statement Bank (what
   every adjuster/expert/witness has said across cases). The billing module
   should extend this instinct, not duplicate it.

--------------------------------------------------------------------------------
SECTION 2 — THE TRIGGERING EXERCISE (WHAT SPARKED THIS MODULE)
--------------------------------------------------------------------------------

In a one-off chat, the attorney provided (a) a client's redacted hospital bill
from Citizens Medical Center and (b) a BCBS-TX 2026 fee schedule PDF
(~245 pages), and asked what BCBS would reimburse for the bill. The workflow
that emerged, done manually by the model:

1. The hospital bill used internal chargemaster descriptions, not CPT codes.
   Each line item's description was mapped to its standard CPT code
   (e.g., "B-Type Natriuretic Peptide" → 83880; "CT head/brain w/o contrast"
   → 70450; troponin ×2 → 84484).
2. Each CPT code was looked up in the BCBS fee schedule to get the maximum
   allowable (with pinpoint page citations, e.g., 70450 = $87.02 at p. 76).
3. One line item ("Emergency department visit wit…") was truncated, so the
   E/M level (99283/99284/99285) could not be determined from the bill alone;
   the analysis presented all three as scenarios.
4. Result: ~$8,975 billed vs. ~$368–$449 in estimated BCBS allowables —
   roughly 4.5–5% of billed charges.
5. A PDF report was generated: line-item table (billed / CPT / allowable /
   schedule page cite), scenario table for the ED level, methodology,
   limitations drawn from the schedule's own disclaimer language.

LESSONS AND HONEST LIMITATIONS OF THAT EXERCISE (carry these forward):
- Chargemaster-description → CPT mapping is inferential. It worked here, but
  it is probabilistic and needs confidence handling and attorney confirmation.
- The bill was a FACILITY bill (hospital), while the fee schedule consulted
  appears to be a professional/other-codes schedule. Real facility
  reimbursement runs on different machinery (DRGs for inpatient, OPPS/APC or
  contracted per-diems / percent-of-charges for outpatient facility claims).
  A production module must model claim type (professional CMS-1500 vs.
  facility UB-04 with revenue codes) honestly, or clearly label outputs as
  benchmark estimates rather than adjudication predictions.
- Bundling (NCCI edits), modifiers, multiple-procedure reductions, and units
  were not modeled.
- The value of the exercise was not the exact dollar figure — it was the
  ORDER OF MAGNITUDE (billed charges ~20× the commercial allowable), which is
  precisely the fact pattern that drives Texas medical-damages litigation.

--------------------------------------------------------------------------------
SECTION 3 — THE TEXAS LEGAL FRAMEWORK THIS MODULE LIVES INSIDE
--------------------------------------------------------------------------------

Why would a PLAINTIFF'S lawyer want a tool that computes how little insurers
pay? Because that number is now everywhere in Texas PI practice. The module
must be designed around these doctrines (verify current status before
hard-coding anything):

1. PAID OR INCURRED — CPRC §41.0105 and Haygood v. De Escabedo: recovery of
   past medicals is limited to amounts actually PAID or actually still OWED;
   billed-but-written-off amounts are not recoverable or admissible. This is
   why the Type 1 / Type 2 bill distinction exists. The module's math should
   compute the paid-or-incurred number per bill and per case.

2. §18.001 AFFIDAVIT PRACTICE — CPRC §18.001 billing affidavits prove up
   reasonableness/necessity; defense counter-affidavits (post-In re Allstate,
   Tex. 2021) routinely use billing experts who benchmark against Medicare
   and commercial reimbursement rates to opine that reasonable value is a
   fraction of billed charges. Knowing the benchmark BEFORE the defense does
   is defensive intelligence.

3. NEGOTIATED-RATE DISCOVERY — In re North Cypress Med. Ctr. (Tex. 2018) and
   In re K & L Auto Crushers (Tex. 2021): what a provider accepts from
   insurers and its costs are discoverable on the reasonableness of charges,
   including against LOP providers. Cuts both ways: the defense will do this
   analysis on the client's LOP bills; the plaintiff can do it on hospital
   liens.

4. HOSPITAL LIENS — Prop. Code Ch. 55: lien limited to REASONABLE charges;
   HB 2929 caps (lesser of reasonable 100-day charges or 50% of recovery);
   Ch. 146 balance-billing limits keyed to the EOB patient-responsibility
   amount. Reimbursement-rate benchmarking is the ammunition for lien
   reduction.

5. LIEN REDUCTION FORMULAS already specced in the liens module (Ch. 140
   lesser-of; Medicare procurement-cost reduction under 42 CFR §411.37;
   Ahlborn pro-rata for Medicaid) all need accurate inputs from the medical
   bill ledger — this module is upstream of them.

6. PUBLIC, COMPUTABLE BENCHMARKS: the Medicare Physician Fee Schedule is
   public (RVU × conversion factor × locality GPCI), as are OPPS/APC rates,
   ASC rates, Texas Medicaid fee schedules, and Texas DWC workers'-comp fee
   guidelines (which are Medicare-based). Commercial schedules (like the
   BCBS PDF) arrive case-by-case, often via discovery, sometimes under
   protective orders. FAIR Health and similar benchmark databases exist but
   are licensed products.

STRATEGIC TENSION TO KEEP HONEST: on the affirmative side of a demand, the
plaintiff generally presents the paid-or-incurred number and does not
volunteer that reasonable value might be lower. This module's core value is
therefore NOT "generate a low number to send the adjuster." It is:
(a) negotiation intelligence against liens and balance bills,
(b) war-gaming the defense's counter-affidavit before it arrives,
(c) realistic case valuation and client counseling, and
(d) auditing bills for errors that inflate what the client owes.
The design should never confuse these postures, and generated documents
should be clearly tagged by intended audience (internal / lienholder /
opposing party / client).

--------------------------------------------------------------------------------
SECTION 4 — THE DESIGN SPACE: CANDIDATE CAPABILITIES
--------------------------------------------------------------------------------

Explored possibilities, grouped. Treat these as a menu to evaluate, not a
committed scope.

GROUP A — BILL INTELLIGENCE (the foundation everything else needs)
A1. Line-item bill ledger: extend the existing bill record (currently
    bill-level amounts) with child line items: date of service, description,
    revenue code / chargemaster code if shown, quantity, unit charge,
    extended charge. Ingested from uploaded bill PDFs (AI-assisted parsing
    with attorney review).
A2. AI-assisted CPT/HCPCS mapping per line item, with confidence score,
    "confirmed by attorney" status, and a per-facility CHARGEMASTER MEMORY:
    once "TRPNIN QUANT" at Citizens Medical Center is confirmed as 84484,
    the mapping is remembered and auto-applied to every future bill from
    that facility. This dictionary grows into a practice asset.
A3. Coding audit: flag duplicates, unbundling, upcoding indicators,
    quantity anomalies, charges billed after the 100-day hospital-lien
    coverage window, and truncated/ambiguous descriptions (like the ED E/M
    line) that need records to resolve.
A4. Claim-type awareness: professional vs. facility bill detection, so the
    right benchmark machinery (fee schedule vs. DRG/APC/per-diem) — or an
    honest "benchmark estimate only" label — is applied.

GROUP B — REASONABLE-VALUE BENCHMARKING
B1. Multi-schedule comparison per bill: billed charge vs. Medicare vs.
    Medicaid vs. workers'-comp vs. any commercial schedule on file (like the
    BCBS PDF) — per line and totaled, with ratios (billed = N× Medicare).
B2. Scenario handling for indeterminate codes (the ED-level pattern from the
    exercise): present ranges rather than guessing.
B3. Case-level roll-up: total billed vs. paid-or-incurred vs. benchmark
    range across all providers — the "what are the medicals really worth"
    view feeding case valuation.

GROUP C — §18.001 / COUNTER-AFFIDAVIT WAR-GAMING
C1. Pre-compute the analysis the defense's billing expert will run; output an
    internal exposure memo: which bills are most vulnerable (highest
    billed-to-benchmark ratios, LOP providers), what the counter-affidavit
    will likely say, and rebuttal angles.
C2. Bank of defense billing experts and their methodologies across cases
    (extends the existing Statement Bank / expert prior-testimony instinct):
    which experts appear, what multiples of Medicare they endorse, outcomes.
C3. Timing hooks into the existing deadline engine for 18.001 service and
    counter-affidavit response windows.

GROUP D — LIEN & BALANCE-BILL NEGOTIATION SUPPORT (likely biggest payoff)
D1. Hospital-lien reduction package: reasonableness analysis (billed vs.
    benchmarks) + Ch. 55 perfection/coverage defects + HB 2929 cap math +
    Ch. 146 EOB check, assembled into a reduction demand letter with an
    exhibit table (the PDF from the exercise is a prototype of this exhibit).
D2. Type 2 reconciliation audit: verify billed − payment − adjustment =
    balance from the EOB; flag improper balance billing (the module can
    automate the Kostura acceptable/not-acceptable balance-billing check
    already summarized in the liens spec).
D3. LOP exposure assessment: for each LOP provider, what would insurance
    have paid — both as defense-discovery risk assessment and as settlement-
    time reduction leverage.
D4. Feed the existing lien calculators (Ch. 140 lesser-of, §411.37) with
    verified inputs instead of hand-typed numbers.

GROUP E — CLIENT COUNSELING & CASE ECONOMICS
E1. Net-to-client scenario modeling: run bills through health insurance vs.
    LOP vs. raw, at candidate settlement values, showing how each path
    changes liens, balances, and the client's net.
E2. Plain-English client explainer (attorney-reviewed draft): why the
    hospital billed $8,975 and why that is not what anyone pays.
E3. Billing-error dispute support: letters disputing duplicates/errors found
    in A3 on the client's behalf.

GROUP F — DATA ASSETS (the library layer)
F1. Fee-schedule library: payer × product line × year × locality, ingested
    from PDFs/CSVs into structured rate tables (code, modifier, rate, source
    page for pinpoint citation). Public schedules (Medicare/Medicaid/DWC)
    can be loaded programmatically; commercial schedules accumulate from
    cases. Mirror the policy-language bank's confidentiality flag: anything
    produced under a protective order is walled off from cross-case use.
F2. Chargemaster memory (A2's dictionary) as a first-class, queryable asset.
F3. Provider billing-pattern analytics: which hospitals/providers bill at
    the highest multiples, historical reduction percentages achieved per
    provider/lienholder — negotiation intelligence ("Citizens Medical
    routinely takes 40% on liens like this").

GROUP G — GENERATED DELIVERABLES (documents the module emits)
G1. Reasonable-value analysis report (the exercise's PDF, productized:
    line-item table, scenario handling, methodology, pinpoint schedule
    citations, limitations).
G2. Lien-reduction demand letter + exhibits (D1).
G3. Counter-affidavit exposure memo (C1) — internal work product.
G4. Settlement scenario worksheet (E1) — feeds/annotates the settlement
    statement.
G5. Balance-billing / billing-error dispute letters (D2/E3).
Each deliverable tagged by audience and privilege posture (work product vs.
outbound), consistent with the system-wide document scoping rules.

--------------------------------------------------------------------------------
SECTION 5 — DATA MODEL SKETCH (to refine, not final)
--------------------------------------------------------------------------------

- FeeSchedule: payer (linked insurance-company party where applicable),
  product line, effective year, locality/region, source document link,
  source type (public / discovery / licensed), confidentiality flag,
  ingestion status.
- FeeScheduleRate: schedule → code (CPT/HCPCS), modifier, rate, unit rules,
  source page (for pinpoint citations).
- BillLineItem: bill → line items (service date, raw description, rev code,
  chargemaster code, qty, unit charge, extended charge).
- CodeMapping: (facility/provider, raw description or chargemaster code) →
  CPT/HCPCS, confidence, mapping source (AI-suggested / attorney-confirmed /
  chargemaster-memory), confirmed-by + date.
- BillAnalysis: bill (or case) → schedules used, per-line results, ratios,
  scenario assumptions, generated documents, run date, reviewed-by.
- Extensions to existing records: claim-type field on the bill (professional
  / facility-inpatient / facility-outpatient); EOB document link on Type 2
  bills; LOP records gain a link to their exposure assessment.

--------------------------------------------------------------------------------
SECTION 6 — CONSTRAINTS, GUARDRAILS, AND RISKS
--------------------------------------------------------------------------------

1. ESTIMATES, NOT ADJUDICATION. Outputs are attorney-facing analytical
   estimates with stated methodology and limitations — never presented as
   what a claim "would pay." Mirror the system's existing eligibility-engine
   guardrail: issue-spotter, not opinion; every legal rule carries its cite.
2. PHI. Bills, EOBs, and records are PHI. AI parsing/mapping should follow
   the system's local-first posture (or a BAA-covered path) — same decision
   framework already made for the transcript layer.
3. LICENSING/CONFIDENTIALITY. Commercial fee schedules obtained in discovery
   may be confidential or protective-order material; the library needs the
   same walls as the policy-language bank. Licensed databases (FAIR Health)
   are a buy-vs-build question, not something to scrape.
4. ACCURACY DEBT. Fee schedules version annually; CPT codes update; the
   module needs effective-date discipline (analysis uses the schedule in
   force on the date of service) and a staleness warning.
5. ATTORNEY IN THE LOOP. Every AI-suggested mapping and every outbound
   document requires attorney confirmation before it is treated as fact or
   sent. Unconfirmed mappings render visibly as provisional.
6. SCOPE HONESTY. Full claims-adjudication simulation (DRG groupers, NCCI
   edit engines) is an industry unto itself. The module should either
   integrate an existing open data source honestly or stay at the benchmark-
   estimate tier — the exercise proved the benchmark tier alone is already
   valuable. Do not let scope creep toward "rebuild a claims processor."

--------------------------------------------------------------------------------
SECTION 7 — OPEN QUESTIONS (for you to sharpen, and for the attorney)
--------------------------------------------------------------------------------

Q1. PRIMARY PURPOSE RANKING. Which posture leads: lien/balance-bill
    negotiation (Group D), counter-affidavit war-gaming (Group C), case
    valuation (B3/E1), or bill auditing (A3)? The answer drives phasing.
Q2. BENCHMARK PRIORITY. Start with public schedules (Medicare PFS is free,
    computable, and the reference point every billing expert uses) and treat
    commercial schedules as opportunistic additions? Or is the commercial-
    schedule library itself the point?
Q3. FACILITY CLAIMS. How far to go modeling facility reimbursement
    (DRG/APC) vs. labeling facility-bill analyses as professional-schedule
    benchmarks with a disclaimer?
Q4. WHERE IT LIVES IN THE UI. Inside the Medical tab per bill, a case-level
    analysis view, or both? (The settlement statement and liens module both
    consume its outputs.)
Q5. WHO USES IT. Attorney-only initially (consistent with other modules),
    but do paralegals eventually run the ingestion/mapping steps? Affects
    the confirmation workflow design.
Q6. DOCUMENT POSTURE. Which generated deliverables are safe to send
    externally as a standard practice, and which stay internal work product?
    (E.g., sending a reasonable-value analysis to a lienholder is leverage;
    letting it reach the defense could undercut the damages presentation.)
Q7. DATA ACQUISITION. Is there appetite for licensing a benchmark database
    (FAIR Health / Context4) vs. building only on public + discovered
    schedules?
Q8. PHASING INSTINCT (starting point to critique):
    Phase 1 — line-item ledger + AI mapping with confirmation + single-
              schedule benchmark report (productize the exercise).
    Phase 2 — fee-schedule library (Medicare/Medicaid/DWC public loads) +
              multi-schedule comparison + chargemaster memory.
    Phase 3 — document generation suite (lien-reduction package, exposure
              memo, client explainer) + lien-calculator integration.
    Phase 4 — cross-case analytics (provider patterns, expert bank).

--------------------------------------------------------------------------------
SECTION 8 — YOUR TASK
--------------------------------------------------------------------------------

Produce, in this order:

1. A critical evaluation of the design space above: which capabilities carry
   the most practice value per unit of build effort for a Texas PI practice
   of this profile; which are traps or premature; anything material this
   exploration missed.
2. A recommended scope and phase plan (critique and revise Q8's strawman),
   with explicit dependencies on the existing modules (medical ledger,
   liens, settlement statement, deadline engine, parties/Statement Bank).
3. A refined data model for the chosen scope.
4. The definitive list of clarifying questions for the attorney — only
   questions whose answers actually change the build, each with your
   recommended default so work can proceed if he simply accepts defaults.
5. A verification list: every legal proposition in Section 3 that must be
   confirmed current (statutes, case status, 2025–2026 legislative changes)
   before any rule is hard-coded.

Constraints on your output: ground every recommendation in the Texas
doctrines in Section 3 or the practice realities in Sections 1–2; keep the
estimates-not-adjudication guardrail absolute; do not propose features that
require redistributing copyrighted or protective-order material; and write
the specification at the same level of detail as the system's existing
settled modules so it can be dropped into the project's design documents.

================================================================================
END OF PROMPT
================================================================================
