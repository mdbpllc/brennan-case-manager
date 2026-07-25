# Medical Billing Analysis Module — Design Synthesis (v2.1)

**Project:** Case Management Software — Michael Brennan (Texas PI / civil / criminal practice)
**Date:** July 21, 2026; **decision queue and Part 8 items resolved July 22, 2026** (all eight defaults accepted with refinements — see Part 6; MRF dry run COMPLETED incl. per-code comparison — see `claude/citizens-mrf-dry-run.md`).
**Provenance:** (1) Original design exploration written as a prompt (`claude/medical-billing-analysis-module-prompt.md`), sparked by the Citizens Medical Center / BCBS-TX 2026 fee-schedule exercise. (2) An external model's response to that prompt ("v1.1 Post-Review"). (3) This document — a critical merge of both, plus new material neither had. This is the working spec for the module going forward; the prompt doc remains as provenance.

---

## PART 1 — REVIEW OF THE EXTERNAL RESPONSE

The response was useful but uneven: strong on engineering hygiene (auditability, versioning, entity design), weak on legal verification discipline, and it contradicted one settled architecture decision. Verdict by item:

### 1.1 ACCEPTED (incorporated into this spec)

1. **Revised phasing that front-loads lien leverage.** Its five-phase plan is better than the original four-phase strawman: bill intelligence + Medicare benchmarking + the basic report in Phase 1, the full lien-reduction package in Phase 2, war-gaming and client counseling in Phase 3, data assets/analytics in Phase 4. Adopted (Part 3), with its week-count estimates **stripped** — build-effort timeboxes are noise in an AI-assisted solo build and create false expectations.
2. **AnalysisRun / AnalysisResultLine split.** Cleaner than the original single `BillAnalysis` blob: a run captures schedules used, assumptions (e.g., ED-level scenarios), reviewer, status (provisional/confirmed), and disclaimer version; result lines carry per-line allowables and page cites. Adopted.
3. **ReviewLog audit trail.** Every mapping confirmation, analysis review, and document generation logged (who/when/what changed/why). Genuinely important for privilege and ethics posture and for later disputes about what was "confirmed." The original exploration under-weighted this. Adopted — implemented as ordinary Postgres audit tables, nothing exotic.
4. **GeneratedDocument as a first-class entity** with audience (internal / lienholder / client / opposing) and privilege posture, linked to the AnalysisRun that produced it. Adopted — with one alignment change: the privilege vocabulary must **reuse the system-wide privilege tiers already defined for the transcript layer** (attorney-client / work-product / non-privileged), not invent a parallel one.
5. **Effective-date discipline + staleness flags.** Analyses pin to the schedule in force on the date of service; a "re-run with current schedules" action and stale-analysis flag exist. Adopted.
6. **Legal Rule Registry.** An in-app register of every legal proposition the module relies on, each with cite, last-verified date, and attorney sign-off; rules cannot be hard-coded until verified. Adopted — and **elevated** (see 1.4): this should not be module-local.
7. **ProviderBillingProfile** (aggregated billing-pattern analytics per provider). Adopted, attached to the existing **provider-business party record** so it appears in that party's cross-case view rather than living in a separate silo. Bonus wiring the response missed: the settlement statement already records billed-vs-final on every resolved bill and lien — the historical-reduction-percentage field can populate **automatically** from settlements (enter-once instinct), no separate data entry.
8. **Low-effort quality features:** batch "analyze all bills in case," structured JSON/CSV export for retained experts, prominent estimate-only disclaimer on every screen and PDF, settlement-scenario sliders wired to lien impact. Adopted (sliders land in Phase 3 with E1).
9. **Implementation notes:** local GPU arm for PDF/table extraction (layout-aware parsing + LLM post-processing), editable line-item table UI with confidence badges, background processing for 50–200+ line hospital bills, Supabase RLS. Adopted.

### 1.2 MODIFIED before adoption

1. **Paralegal ingestion default — REVERSED.** The response defaulted to "paralegals can ingest and suggest mappings now." That contradicts the settled system-wide posture: **attorney-only until multi-user exists at all** (the same decision made for the transcript layer). Correct resolution: *design* the two-step suggest→confirm workflow now (it costs little and the ReviewLog already implies it), but it stays dormant until multi-user rollout. Michael can flip the default then.
2. **"Anonymize cross-case analytics by default" — reframed.** Anonymization is the wrong frame for a single-attorney internal tool; the client identities in cross-case provider analytics are the attorney's own work product. The real constraints are: (a) **protective-order material never enters cross-case pools** (hard wall, same as the policy-language bank), (b) **PHI minimization in anything exported or staff-visible** — aggregate views show ratios and percentages, not client names, unless the viewer has need-to-know, and (c) nothing cross-case ever appears in an outbound document without attorney review. That is what gets built.
3. **Chargemaster memory as "local vector store" — simplified.** A Postgres table with normalized descriptions + trigram/fuzzy matching covers the real matching problem (hospital abbreviations like "TRPNIN QUANT") for a long time. Embedding-based matching is a later optimization if fuzzy matching proves insufficient, not a Phase 1 dependency.

### 1.3 REJECTED / DISCOUNTED

1. **The self-graded "Status" annotations on the verification list.** The response marked legal propositions "Stable," "Current," "Confirmed usable," citing "current (mid-2026) status notes from public sources" — but cited no sources. This is exactly the failure mode the Legal Rule Registry exists to prevent: **a model asserting legal currency is not verification.** Every proposition enters the registry as *unverified* regardless of what any model says about it. One note deserves specific flagging: its In re Allstate gloss ("failure to file a proper counter-affidavit does not automatically bar challenge at trial") is doctrinally plausible — In re Allstate Indem. Co., 622 S.W.3d 870 (Tex. 2021) treated §18.001 as procedural rather than an evidentiary bar — but the exact current state of exclusionary consequences is precisely the kind of thing that must be confirmed by a human before the C-group features encode any assumption about it. [CONFIRM]
2. **Grade inflation and marketing framing** ("one of the strongest I have seen," "~85% excellent," "production-ready"). No analytical content; ignored. The spec is production-ready when the vertical slice runs against real bills and the registry entries are verified, not before.
3. **Metrics dashboard** (time saved, $ attributed to module). Parked to the wanted-later list; cute, not load-bearing, and "$ reductions attributed to the module" is unknowable attribution anyway — the settlement statement already captures reductions achieved.

### 1.4 The response's best idea, made bigger: the Legal Rule Registry is a SYSTEM-WIDE service

The project already has this instinct twice: banked feature #13 (**citation-currency alerts** — playbook entries resting on one recent case carry a verify-before-relying note) and the 2025 law-change ledger in `pi-case-playbooks.md`. The registry generalizes both: one table of legal propositions (statute/case/rule, cite, plain-statement, last-verified date, verified-by, watch-flags), consumed by *every* module — PI playbooks, criminal playbooks, lien calculators, deadline engine, plea-hearing eligibility engine, and this billing module. Every computed output references the registry versions it relied on. **DECIDED 2026-07-22: promoted to core infrastructure now** — project instructions updated, feature #13 folded in. The billing module is simply its first fully structured consumer.

---

## PART 2 — NEW MATERIAL (in neither the original exploration nor the response)

### 2.1 Hospital price-transparency files — the missing facility-side data source

Both documents treated commercial rates as scarce (discovery-only) and facility reimbursement as unmodelable without DRG/APC machinery. Both overlooked that **hospitals are required to publish machine-readable files (MRFs) of their standard charges — including payer-specific negotiated rates — under the federal Hospital Price Transparency rule (45 CFR pt. 180, eff. 2021), and Texas codified its own version (SB 1137 → Health & Safety Code Ch. 327, with TAC enforcement rules).**

**Verified current as of July 21, 2026 (web check during this synthesis; attorney sign-off still required per registry discipline):**

- 45 CFR pt. 180 is in force, and CMS enforcement of **upgraded** requirements begins **April 1, 2026** — meaning as of now. The upgrade is a gift to this module: instead of "estimated allowed amounts," hospitals must now report **historical payment data per payer — median allowed amount (12–15-month lookback), 10th and 90th percentile allowed amounts, and the count of claims behind the calculation** — plus the hospital's NPI for cross-dataset linkage, and a senior-official attestation that the data is true, accurate, and complete with all dollar-expressible negotiated charges included. The hospital's own attested *median actually-allowed amount* per code is materially stronger lien-reduction evidence than a negotiated "sticker rate," and the attestation requirement blunts the "our file is unreliable" defense.
- Texas Health & Safety Code Ch. 327 and its enforcement regs (26 TAC §511.77 et al.) exist as a parallel state hook; Texas HHSC publishes SB 1137 guidance.
- **Concrete validation on the triggering case: DRY RUN COMPLETED 2026-07-22 on Citizens Medical Center's actual file** (`claude/citizens-mrf-dry-run.md`). Headline: the current file is **CMS v3.0.0, dated 2026-05-11, attested, with BCBS-specific negotiated dollar rates for the exact exercise codes** — but the median/percentile columns are essentially unpopulated (5 of ~33,000 rows), so today's usable evidence tier there is **negotiated dollar rates, not attested medians**. Schema adoption is running ahead of data population; quality grading must measure column *population*, not template version.

Why this changes the design:

- **It partially dissolves the facility-claims problem (old Q3).** Instead of modeling DRG/APC to guess what BCBS pays Citizens Medical Center for a CT head, the module can look up **Citizens Medical Center's own published BCBS-negotiated rate for 70450** in the hospital's MRF — confirmed on real data: $487.55 (Commercial PPO, outpatient) against a $3,166 gross charge. The hospital's own published number is far better lien-reduction ammunition than a professional-schedule benchmark — it is the provider's admission of what it actually accepts.
- **It feeds the fee-schedule library from public data, per facility.** A new source type: `hospital_mrf` (per-facility, per-payer negotiated rates + gross charges + cash prices), loaded on demand for the hospitals that actually appear in the practice's cases. No confidentiality wall needed — these are public by law.
- **Caveats to build in (all confirmed on the first real file):** compliance/data quality is uneven — computed quality grade per file (template version, freshness, per-column population, rate-type mix, TXT-indicator compliance, above-gross anomaly rate); rates split by **setting** (inpatient vs outpatient, different rates AND methodologies for the same code); **above-gross negotiated rates exist** (Citizens' outpatient ED E/M rates exceed gross charges — flag, don't hide); internal code reuse (same CPT on two chargemaster lines) means chargemaster memory keys on description+code. The insurer-side Transparency in Coverage MRFs also exist but are enormous (multi-TB) — **out of scope** except via targeted third-party mirrors if ever needed; parked. Aggregators (Turquoise, PayerPrice) are login-gated or empty for this hospital — discovery aids, not data sources.
- **Discovery leverage note for the attorney:** where a hospital's MRF is missing or noncompliant, that fact is itself useful in a reasonableness fight (and North Cypress/K&L discovery fills the gap). Citizens-specific: its CMS TXT indicator file is defective (points at the page, not the file), and its attested v3.0.0 file publishes empty median columns — both are pressure points if it ever fights its own numbers.

### 2.2 Lifecycle hooks — where the module fires in the existing PI workflow

The response listed UI homes but not *when* analysis runs. Wire it to the settled PI lifecycle:

- **Phase 7 (records collection):** when bills arrive in §18.001 affidavit form, ingestion + mapping + benchmark run happens here — before the demand is drafted, so the attorney knows the exposure profile while writing it.
- **Phase 8–9 (demand):** case-level roll-up (B3) informs valuation; nothing from the module goes *into* the demand package by default (posture discipline).
- **Phase 16 (§18.001 notice of service):** deadline-engine hooks (C3) activate; counter-affidavit watch window opens; the exposure memo (C1) is generated or refreshed **on counter-affidavit receipt** — parse the defense expert's numbers against ours.
- **Settlement branch (lien-clearance gate):** D1/D2/D3 outputs feed the gate; final negotiated outcomes flow back to ProviderBillingProfile automatically.
- **Medicare-beneficiary flag (set at intake):** the BCRC conditional-payment data already tracked in the liens module is itself a **paid-amounts data source** — conditional-payment summaries show what Medicare actually paid these providers, feeding both the paid-or-incurred math and one more benchmark column. No new capture; just a join the original design missed.

### 2.3 EOB handling on Type 2 bills — light entity, not an afterthought

D2 (reconciliation audit) and the Ch. 146 lien cap both key off the EOB, but neither document modeled it. Add a light structure: an EOB document link on each Type 2 bill plus extracted fields (insurer payment, contractual adjustment, patient-responsibility amount, per-line detail where available). The patient-responsibility figure is load-bearing — it is the statutory maximum for a hospital lien under the Ch. 146 analysis already in the liens spec — so it should be a typed field with a source-document pin, not a number typed from memory. Full per-line EOB reconciliation is a Phase 2 stretch goal; the typed patient-responsibility field is Phase 1.

---

## PART 3 — CONSOLIDATED PHASE PLAN

*(No calendar estimates. Phases are dependency-ordered scopes; each ends in something Michael uses on real cases.)*

**Phase 1 — Foundation + first leverage (productize the exercise). SPLIT 2026-07-22 into 1a/1b** so real bills flow through the module before the local GPU arm exists (the arm is still a pending transcript-layer hardware item), and so the minimal Medical tab gets built as part of this slice:

- **Phase 1a (no local-AI dependency):** minimal Medical tab + medical bill ledger as specced in project instructions §10; line-item ledger extension (A1) with **manual/assisted entry** via the attorney-review editable table; CPT/HCPCS mapping via **chargemaster-memory fuzzy matching** (Postgres trigram — deterministic, no AI) with confidence badges (A2-deterministic); light coding audit: duplicates, truncated descriptions, quantity anomalies (A3-light); claim-type detection with hard disclaimers on facility bills (A4); Medicare PFS loader (public, computable) + per-line benchmark lookup with pinpoint cites (B1-start), **reports led by billed-to-Medicare ratios rather than dollar gaps** (decision-queue item 2 refinement); EOB patient-responsibility typed field on Type 2 bills (§2.3); reasonable-value analysis report generator (G1) with scenario handling for indeterminate codes (B2), audience-tagged internal by default; ReviewLog + AnalysisRun/ResultLine entities + Legal Rule Registry (system-wide schema from day one); batch "analyze all bills."
- **Phase 1b (activates when the local GPU arm is stood up):** AI PDF/table ingestion of bills (layout-aware parsing + LLM post-processing, local-first per PHI posture); AI-suggested CPT mappings feeding the same confirm workflow; background processing for 50–200+ line bills.

*Depends on:* document storage; 1b additionally on the local AI arm. (1a *creates* the medical bill ledger rather than depending on it.)

**Phase 2 — The lien war chest.**
Full coding audit (A3). Hospital-MRF loader + per-facility negotiated-rate lookups (§2.1; requirements now grounded in the completed dry run — CMS v3.0.0 wide-format (and v2.0.0 legacy) parsing, content-based version verification (never trust filename/cache), computed population-based quality grade, (code, setting, payer|plan) lookup keys, above-gross anomaly flags, evidence-tier labels; **the Citizens file is the reference fixture**; Medicare OPPS Addendum B as the outpatient-facility fallback where a hospital's MRF proves unusable). Medicaid + DWC schedule loaders; multi-schedule comparison (B1 full) + case-level roll-up (B3). Hospital-lien reduction package: benchmarks + Ch. 55 perfection defects + HB 2929 cap math + Ch. 146 EOB check → demand letter + exhibit table (D1/G2). Type 2 reconciliation audit incl. balance-billing legality check (D2). LOP exposure assessment (D3). Verified-number feeds into the existing Ch. 140 / §411.37 lien calculators (D4).
*Depends on:* liens module (16-type taxonomy), Phase 1.

**Phase 2 additions (routed 2026-07-25 from the Citizens-negotiation design session; motivating events in `citizens-mrf-dry-run.md` postscript):**

- **Insurance-card capture (Medical section UI).** The client Medical section gets a dedicated spot to attach an image of the **front of the client's health insurance card**. Interaction: click-to-search-and-upload, drag-and-drop, or inline upload in place — exact interaction pattern left to build discretion (Michael deliberately left it open). The card front carries plan name, group number, and network — the fields that select the correct **payer|plan column** in an MRF (motivating example from the Citizens dry run: the same CT head ranged **$103.34–$487.55** across BCBS-family plan columns in one hospital's file). On analysis, the system uses the captured plan identity to drive MRF payer|plan row selection instead of guessing plan type (PPO vs. HMO vs. employer plan). Store the card image on the client record (Medical section), associated with the plan-identity fields extracted or entered from it. Design note: extraction can be manual-entry-first (Michael reads card, keys fields) with OCR as a later enhancement; the spec requirement is the capture spot and the plan-identity → MRF-column linkage, not OCR.
- **Missing-dataset flag / no-silent-guess guardrail.** When a billing analysis runs and the system does **not** have the applicable rate set for the client's health plan (no MRF loaded for that facility, no matching payer|plan column, no contract/fee schedule on file), the system must **not** silently fall back to a different schedule or methodology. Behavior: (1) halt or clearly degrade the affected analysis outputs and **flag the gap to the user**, stating specifically what's missing (e.g., "No outpatient facility rates on file for [Plan X] at [Facility Y]"); (2) offer resolution in place — short fetch-and-place instructions (where to find the facility's MRF / the plan's schedule and where to put it) **or** an inline upload control to add the dataset immediately; (3) any output produced despite the gap must be visibly labeled as incomplete/unpriced on the affected lines — never substitute a professional schedule for a facility bill, or an inpatient methodology for an outpatient visit, without saying so. Rationale: direct lesson from the Citizens exchange — the pre-module analysis silently priced a facility bill on a professional schedule and produced an indefensible number that was sent to opposing side. Aligns with the loader spec's existing "honest gaps over fake precision" value; this addition makes it an enforced pipeline behavior, not just a value statement. These are spec-only; no Phase 1a code changes implied.

**Phase 3 — War-gaming + counseling.**
Counter-affidavit exposure memo, generated pre-emptively at Phase-7 lifecycle hook and refreshed on counter-affidavit receipt (C1). Defense billing-expert bank as an extension of the existing expert party type / Statement Bank (C2). §18.001 deadline hooks (C3). Net-to-client scenario modeling with live lien-impact sliders (E1/G4). Client explainer drafts (E2). Billing-error dispute letters (E3/G5). Full audience/privilege tagging across the G-suite, reusing transcript privilege tiers.
*Depends on:* deadline engine, settlement statement, parties/Statement Bank, Phase 2.

**Phase 4 — Data assets at maturity.**
Full fee-schedule library management UI (public + discovered + MRF, confidentiality walls per source). Chargemaster memory maturity (cross-facility dictionary quality tools). ProviderBillingProfile analytics with automatic reduction-history population from settlement outcomes.

**Phase 5+ (only if usage justifies):** licensed benchmark data (FAIR Health / Context4) buy-vs-build re-evaluation; deeper facility modeling; insurer TiC MRF mirrors. Parked: metrics dashboard.

---

## PART 4 — CONSOLIDATED DATA MODEL

Adopting the response's refinement with corrections and the new entities:

- **FeeSchedule:** payer (linked insurance-company party, or null for public), product_line, effective_year/date-range, locality, **source_type (public / discovery / licensed / hospital_mrf)**, confidentiality_flag + protective_order_details, **quality_grade (for MRFs — computed: template version, freshness, per-column population, rate-type mix, TXT-indicator compliance, above-gross anomaly rate)**, ingestion_status, last_verified_date, source_document_link, version.
- **FeeScheduleRate:** schedule_id, code, modifier, rate, **rate_type (fee-for-service / per-diem / percent-of-charges / case-rate — needed for MRF data)**, **setting (inpatient / outpatient — MRF rates differ per setting for the same code)**, unit_rules, source_page/locator, effective_date_range, **evidence_tier (attested_median / negotiated_dollar / derived / cash_gross)**, **above_gross_flag**.
- **BillLineItem:** bill_id, service_date, raw_description, revenue_code, chargemaster_code, qty, unit_charge, extended_charge, claim_type_detected, analysis_status.
- **CodeMapping:** provider/facility_id, raw_description_or_code, suggested_cpt, confidence_score, mapping_source (AI / attorney / chargemaster_memory), confirmed_by, confirmed_date, is_active, notes. *(Protective-order-derived mappings excluded from cross-case memory — tag at ingestion. Key on description+code — hospitals reuse the same CPT across distinct chargemaster lines, per the dry run.)*
- **EOBRecord (new, light):** bill_id (Type 2), document_link, insurer_payment, contractual_adjustment, **patient_responsibility (typed, source-pinned — feeds Ch. 146 lien cap)**, per-line detail (optional Phase 2).
- **AnalysisRun:** bill_id/case_id, run_date, schedules_used[], assumptions (JSON — e.g., ED-level scenarios), totals (billed / paid-or-incurred / benchmark range / ratios), reviewer, reviewed_date, status (provisional / confirmed), disclaimer_version, **registry_rule_versions[]**. **Only CONFIRMED runs feed the settlement statement and lien calculators (decision-queue item 7 refinement); provisional runs render visibly provisional and flow nowhere.**
- **AnalysisResultLine:** run_id, line_item_id, cpt_used, allowable, schedule + page cite, ratio, notes.
- **ReviewLog:** entity_type/id, action (suggested / confirmed / edited / rejected), user, timestamp, old/new value, reason.
- **ProviderBillingProfile:** provider_business_id (existing party record), avg billed-to-Medicare ratio, historical_reduction_pct (**auto-fed from settlement billed-vs-final outcomes**), common_flags, last_analysis_date.
- **GeneratedDocument:** run_id, type, audience, privilege_tier (**shared system vocabulary**), file_link, generated_by, confirmed_by, sent_date. **MRF-sourced numbers carry their evidence-tier label.**
- **LegalRuleRegistry:** rule_id, proposition, cite(s), scope (module / system), status (unverified / verified / watch), last_verified_date, verified_by, notes. *(PROMOTED to system-wide infrastructure 2026-07-22 — see project instructions.)*

---

## PART 5 — GUARDRAILS (consolidated, binding)

1. **Estimates, not adjudication** — absolute; disclaimer on every screen and document; facility-bill outputs labeled as benchmark estimates unless sourced from that hospital's own MRF (which gets its own accuracy caveat and evidence-tier label).
2. **Attorney in the loop** — no mapping treated as fact, no document leaves the system, without attorney confirmation; ReviewLog records everything. Suggest→confirm split designed now, **attorney-only until multi-user** (settled posture; overrides the response's default). At multi-user rollout the flip is **manual, per-workflow** (decision-queue item 4).
3. **PHI local-first** — bill/EOB/records AI processing on the local GPU arm or a verified BAA path, same framework as the transcript layer. (This is why Phase 1a is deterministic-only — see Part 3.)
4. **Confidentiality walls** — protective-order schedules and mappings never enter cross-case pools (library, chargemaster memory, analytics); tagged at ingestion; hospital-MRF data is public and exempt.
5. **Registry discipline** — no legal rule hard-coded while unverified; every AnalysisRun and GeneratedDocument stamps the registry versions used; **model-asserted legal status is never verification.**
6. **Posture discipline** — internal work product (exposure memos, raw benchmark reports) never auto-flows to outbound audiences; lien-reduction packages and dispute letters are the default outbound set (still attorney-confirmed before sending), per-case attorney release for anything else. **Exhibit honesty:** where MRF lines run above gross (real phenomenon — see dry run), reduction exhibits disclose rather than cherry-pick silently.
7. **PHI minimization in aggregates** — cross-case analytics views show ratios/percentages, not client identities, except on need-to-know.

---

## PART 6 — DECISION QUEUE — **RESOLVED 2026-07-22** (all defaults accepted, with refinements)

1. **Primary value driver:** lien & balance-bill negotiation first (drives Phases 1–2). **DECIDED: yes.**
2. **Phase-1 schedules:** Medicare PFS only, with Medicaid/DWC and hospital MRFs in Phase 2. **DECIDED: yes** — refinement: Phase 1 reports lead with **billed-to-Medicare ratios**, not dollar gaps, since Medicare-only benchmarks run lower than commercial allowables and the ratio is the standard reasonableness metric.
3. **Facility bills:** strict professional-benchmark disclaimer in Phase 1; hospital-MRF negotiated rates become the facility answer in Phase 2 — **no DRG/APC modeling.** **DECIDED: yes.** (Medicare OPPS Addendum B noted as the Phase 2 outpatient-facility fallback if a hospital's MRF proves unusable — a contingency line, not a scope change.) *Empirically vindicated by the dry run: facility MRF rates ran 4–10× the professional-schedule estimate on the exercise codes — the disclaimer was load-bearing.*
4. **Paralegal use:** designed but OFF until multi-user. **DECIDED: yes** — and the flip at multi-user rollout is **manual, per-workflow** (matching the transcript-layer posture), not automatic.
5. **Outbound-by-default documents:** lien-reduction packages + billing-dispute letters only; everything else internal unless released per case. **DECIDED: yes.** (Outbound-by-default = eligible to send after attorney confirmation, not auto-send.)
6. **Licensed benchmark data (FAIR Health etc.):** not in year 1; revisit with usage data. **DECIDED: yes.**
7. **UI home:** per-bill Analysis tab inside Medical view + case-level roll-up view feeding settlement statement and liens. **DECIDED: yes** — refinement: **only confirmed AnalysisRuns feed downstream**; provisional runs never touch settlement or lien math.
8. **Legal Rule Registry scope:** **DECIDED: promoted to system-wide core infrastructure NOW** (not deferred to a future revision) — system-wide schema from day one, banked feature #13 folded in, project instructions updated 2026-07-22.

---

## PART 7 — VERIFICATION LIST (all UNVERIFIED until a human signs off)

The external response's "status" notes are noted but do **not** count as verification. Registry entries to open:

1. CPRC §41.0105 / Haygood v. De Escabedo — paid-or-incurred scope and current application.
2. CPRC §18.001 / In re Allstate (622 S.W.3d 870) — current counter-affidavit consequences and any post-2021 clarification or 2025 legislative change (failed SB 30's §18.001 overhaul is already on the legislative-watch list — check for re-filed successors).
3. In re North Cypress (2018) / In re K & L Auto Crushers (2021) — negotiated-rate discovery scope, incl. against LOP providers.
4. Prop. Code Ch. 55 + HB 2929 caps — any 2025–2026 amendments; perfection checklist currency (already specced in liens module — keep single source of truth there).
5. Ch. 146 balance-billing / EOB patient-responsibility cap — current application (Kostura-derived analysis already in liens spec).
6. **Hospital Price Transparency: 45 CFR pt. 180 + Texas Health & Safety Code Ch. 327.** (New — added by this synthesis.) *Pre-verified via public sources on 2026-07-21 (CMS enforcement of the upgraded historical-allowed-amount MRF requirements began April 1, 2026; TX Ch. 327 / 26 TAC §511.77 in force) — the only item on this list with a source-backed status, but registry entry still opens as unverified pending attorney sign-off.* **Dry-run sub-question (2026-07-22):** whether an attested v3.0.0 file with essentially unpopulated median/percentile columns (Citizens' current posture) satisfies the upgraded requirements — determines how hard the compliance-leverage point can be pressed. [CONFIRM]
7. Medicare PFS / OPPS / Texas Medicaid / DWC fee guidelines — current-year data availability and licensing terms for internal analytical use.
8. No Surprises Act interaction with balance-billing analysis on emergency care. [Low priority; affects edge cases in D2.]
9. General 2025–2026 Texas legislative sweep on medical damages, liens, affidavit practice (shares the post-session confirmation action item already open in project instructions).

---

## PART 8 — DISCUSSION ITEMS — **RESOLVED 2026-07-22**

1. The eight decision-queue defaults — **all accepted with refinements; see Part 6.**
2. Legal Rule Registry promotion — **promoted system-wide now; project instructions updated; feature #13 folded in.**
3. Vertical slice — **overtaken by events** (Case overview + Parties v0.1 was built and delivered 2026-07-21). **DECIDED:** billing-module **Phase 1a is the second build target** after Michael's v0.1 feedback, structured as the 1a/1b split in Part 3 so it forces the minimal Medical tab into existence without waiting on GPU hardware.
4. Citizens Medical Center MRF dry run — **COMPLETED 2026-07-22 including the per-code comparison** (file staged from Michael's machine after chat-upload timeouts; findings in `claude/citizens-mrf-dry-run.md`). Verdict: MRF source confirmed on real data — current attested v3.0.0 file with BCBS negotiated dollar rates for the exercise codes (e.g., 70450 at $487.55 PPO-outpatient vs $3,166 gross); medians unpopulated; loader requirements and anomaly handling (setting split, above-gross ED rates, code reuse, stale CDN caching) now specced from evidence. The Citizens file is the Phase 2 reference fixture.

---

## Sources (for the §2.1 verification)

- [CMS — Hospital Price Transparency](https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency)
- [eCFR — 45 CFR Part 180, Hospital Price Transparency](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-E/part-180)
- [Dentons — CMS Enforcement of Updated Hospital Price Transparency Requirements to Begin on April 1, 2026](https://www.dentonshealthlaw.com/cms-enforcement-of-updated-hospital-price-transparency-requirements-to-begin-on-april-1-2026/)
- [CMS — HPT CY2026 OPPS/ASC Final Rule webinar slides](https://www.cms.gov/files/document/webinar-hospital-price-transparency-cy2026-opps-asc-final-rule-slides.pdf)
- [Texas Health & Safety Code Ch. 327 — Disclosure of Prices](https://statutes.capitol.texas.gov/Docs/HS/htm/HS.327.htm)
- [26 Tex. Admin. Code §511.77 — Hospital Price Transparency Reporting and Enforcement](https://www.law.cornell.edu/regulations/texas/26-Tex-Admin-Code-SS-511-77)
- [Texas HHSC — Hospital Price Transparency Required Information (SB 1137)](https://www.hhs.texas.gov/sites/default/files/documents/hospital-price-transparency-sb1137.pdf)
- [Citizens Medical Center — Price Transparency page](https://www.cmcvictoria.com/price-transparency)
- [Turquoise Health — Citizens Medical Center provider page](https://turquoise.health/providers/citizens-medical-center-3)
