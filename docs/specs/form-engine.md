# Forms & Document Automation Engine

Status: FULLY SPECIFIED 2026-07-23 (design-space sessions; spec captured to repo same day). Template language in §9 is **approved by Michael verbatim — do not rewrite the approved paragraphs.**
Build position: NOT the next slice — the next build slice remains billing module Phase 1a (then the Outlook one-way push per the 2026-07-23 sequencing). First build task when this feature's slice begins: extract the clean master .docx skeleton (§8, §11 item 3).
First deliverable when built: **TRCP 194.2(b) & 195.5 combined disclosures** for PI cases. The same engine later drives all firm forms (designation of lead counsel, motions to withdraw, discovery requests/responses, etc.).

---

## 1. Feature summary

A document automation engine ("form engine") that generates court-ready pleadings and discovery documents from templates + case data, via a wizard.

Core principles, all settled with Michael:

- **Templates are data, not code.** Template text with merge tokens lives in the database. An in-app template editor lets Michael make day-to-day text edits himself. Claude builds the engine, new complex templates, and new merge-field wiring; Michael owns routine wording changes.
- **Token substitution against a real .docx skeleton — never regeneration.** The engine works by unzip → swap text nodes / computed blocks in `word/document.xml` → rezip. Formatting is preserved byte-for-byte because nothing is rebuilt. (This is the fix for the caption-drift problem Michael has repeatedly hit when documents get regenerated.)
- **Output flow:** generate Word (.docx) first → Michael reviews formatting → one-click "Create PDF" → both files stored in the pre-designated OneDrive case folder with metadata logged in the software (consistent with the existing OneDrive + metadata document model).
- **Enter-once:** every fillable fact comes from the case/party records where it exists; wizard questions exist only for data the file doesn't hold yet, and answers **write back** to the records so questions self-extinguish.
- **Warning gates inform the drafter; they NEVER write into the document.** Gates/flags/deadline displays are wizard-screen only. Generated text is identical regardless of gate state.

## 2. Wizard flow (disclosures template)

1. Pick template → engine loads the case: caption data, party lineup, linked providers, opposing counsel.
2. Provider selection: checklist of linked medical providers (from the Medical/parties data), each with any applicable flags surfaced beside the checkbox (see gates, §5).
3. Per-provider **interview card** (see §4) — pull-first, ask-only-if-missing.
4. Fact witnesses: select + short testimony description each.
5. Conditional sections: settlement agreements / witness statements (see §6).
6. Production chart: pulled from the document-production log (see §7).
7. Deadline display: computed 195.2 designation deadline shown in-flow (90 days before end of discovery period for parties seeking affirmative relief / 60 all others; DCO overrides when populated — matches deadline-engine rows E1/P11 incl. the known 90/60-vs-60/90 course-book conflict flag).
8. Generate .docx → review → optional PDF → both filed to OneDrive, metadata + all wizard answers saved with the document record.
9. **Supplementation replay:** when re-running for the same case, the wizard replays prior answers and asks only what changed (operationalizes the TRCP 193.5 / Apollo Exploration supplementation duty; late disclosure = 193.6 exclusion risk).

## 3. Merge-field inventory (from the real document + design sessions)

Case style block: `{cause_number}`, plaintiff name(s), defendant name(s), `{judicial_district}` (e.g., 224TH), `{county}`. Body: firm/attorney signature block (firm name, address, phone, fax, email, attorney name, bar number), opposing counsel service blocks (from linked attorneys/firms with e-service emails), certificate-of-service date.

Client/provider tokens used by the variant library:

- `{client}`, `{client_he_she}`, `{client_his_her}`, `{client_him_her}` — inflected from a gender field on the client record.
- `{incident_date}`, `{incident_type}` (short phrase, e.g., "motor vehicle collision", set once per case in the wizard).
- `{provider_name}`, `{credential}`, `{provider_dr_name}` (rendered name form, e.g., "Dr. Grimm"), `{provider_his_her}` / `{provider_their}` etc. — bare pronouns (render "his review", NOT "his's"); name-form tokens take `'s` in template text where possessive-by-name is wanted. Contact block (facility, address, phone) comes from the party record and is uniform across variants.
- Computed tokens: `{treatment_clause}` (compiled from the interview checklist), `{future_care_clause}` (nothing / generic / named procedure), `{baseline_clause}` (PCP variant), `{specialty_descriptor}`, `{referring_provider}` (from the provider record's referral-source field), `{midlevel_*}` tokens for the rider.

Grammar engine: singular/plural inflection computed from party counts (Plaintiff/Plaintiffs, verb agreement, etc.); templates mark flex points. Name-rendering variants selectable per spot: names listed out vs. collective label vs. last names.

## 4. Per-provider interview cards

Pattern (settled): **pull, don't ask; ask once, write back.**

1. **Credentials** — read the credentials dossier on the medical-professional party record first. If board certification is present: display "Board-certified: X ✓ (from party record)", insert phrase, no question. Multiple certifications: show with checkboxes, default to the one matching the specialty field (display-and-confirm, never silent-insert-all). If empty: ask Yes/No/Don't-know; Yes inserts AND writes back to the party record; Don't-know drops the phrase and creates a verify task (never claim an unverified credential in a disclosure).
2. **Treatment provided** — per-variant checklist (pre-populated from Medical-tab treatment records once that module exists), compiles into `{treatment_clause}`. Surgery performed → sub-field for plain-terms procedure name, gets its own sentence.
3. **Recommendations** — future treatment not yet performed? Yes → free-text, future-care sentence names it; No → generic or omitted.
4. PCP-only: "Did {provider} treat {client} before the incident?" → drives `{baseline_clause}` (see variant).

All card answers persist with the generated document's metadata for supplementation replay.

## 5. Warning gates (wizard-screen only — never in the document)

1. **Mental-health treater — HARD PAUSE.** Designating a treating psychologist/psychiatrist opens mental-health records + Rule 204 adverse exam (In re Richardson Motorsports, ~3-yr temporal scope). Requires explicit confirm. **Deliberately NO template variant exists for mental-health providers** — the gate routes to manual, case-by-case drafting with Claude. This absence is intentional (see "Deliberate gap" at the end of §9).
2. **LOP provider flag** — LOP = "direct financial stake"; opens negotiated-rate/Medicare-rate discovery (In re K&L Auto Crushers line). Flag shown beside the provider's checkbox (LOP bool already on the provider record in the data model). Fires most often on chiropractic and pain-management providers. Click-through, not hard pause.
3. **Retained vs. non-retained switch** — treaters go out non-retained under 195.5(a) (opinions + bases). If an expert record is flagged retained, the engine appends the full retained package checklist (documents provided/reviewed/prepared, resume/bibliography, 10-yr publications, 4-yr testimony list, compensation statement) rather than silently using treater language.
4. Soft nudges: ortho + neuro both designated on one case → remind to differentiate scopes (cumulative-expert preemption). PCP baseline "Yes" → soft note that designation opens the full chart.

## 6. Conditional sections

- **194.2(b)(6) documents:** replaces Michael's old catch-all sentence with a real chart pulled from the production log — columns: Bates number/range | description.
- **Settlement agreements** and **witness statements:** logged item types on the case file; if present, sections render and items flow into the same Bates-stamped production chart; if absent, standard "none" language.

## 7. Document production / Bates-stamping module (SEPARATE module — new banked item)

Settled: separate module, one clean handoff — the production log is the single source of truth; the form engine only reads from it. Scope (partially specified, needs its own design session): log of everything produced (Bates range + description + date/recipient); auto-Bates-stamping engine (feed documents in, software applies sequential labels); feeds the disclosures chart and future production cover letters.

## 8. Formatting skeleton — findings from Michael's actual disclosures .docx

Michael's live form (P's 194.2(b) and 195.5 Disclosures) was inspected at the XML level. Findings, to be encoded as the physical template:

- **Caption is already a borderless 3-column table** (not spaces): columns 4698 / 360 / 4842 twips, single row, fixed min height 2592 twips. Left cell = party block (left-aligned, bold; Plaintiff/Defendants labels indented italic); middle cell = twelve stacked `§` paragraphs; right cell = court block, right-justified.
- **Bug to fix in the master:** table total width 9900 twips vs. a 9360-twip text column (Letter, 1" side margins) — overhangs the right margin 0.375"; any auto-fit/regeneration "corrects" it and shifts everything. Master template sets the table to 9360 with proportionally adjusted columns.
- **Vertical alignment is paragraph-count-dependent:** each cell has exactly 12 paragraphs (several empty spacers). The engine must COMPUTE the § count and spacer paragraphs from the number of party lines — never freeze at 12.
- Vestigial tab stops (720/4680/9360) on the § paragraphs — leftovers; strip from the master.
- Page setup: US Letter, margins top 990 twips (0.6875") / others 1440; Times New Roman 12pt default; `titlePg` different-first-page footer: page 1 footer = bare PAGE field; page 2+ footer = "Plaintiff's TRCP 194.2(b) and 195.5 Disclosures — Page {PAGE} of {NUMPAGES}" (live fields, title token per template).
- **Contamination ruling:** the uploaded file mixes several cases (XXX/1111/2222 placeholders, a stray H2-LAUNCH-SA defendant list, a Deanna Smith witness paragraph, he/she drift). It was NEVER SERVED — it's Michael's working form. Use it as the **formatting skeleton only**; all text blocks come from the clean masters in §9.

## 9. APPROVED VARIANT LIBRARY (verbatim — do not rewrite)

Shared skeleton: who they are → what they did for the client → testimony basis → testimony scope → damages elements → causation. Provider contact block above each paragraph comes from the party record. Group versions = same template with plural tokens.

### 9.1 Emergency medicine (base skeleton)

> **{provider_name}, {credential}** is an emergency medicine {physician_or_specialist} who provided emergency medical care to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding the emergency condition in which {client} presented, the medical treatment provided, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. {provider_dr_name} will further testify as to {provider_his_her} examination and diagnosis of {client}'s symptoms and injuries as related to and caused by the incident of {incident_date}. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.

Notes: if a facility has both an EM physician and radiologists (e.g., the old Metropolitan Methodist block), the engine SPLITS them — EM paragraph for the treater, radiology paragraph for the readers, shared contact block.

### 9.2 Radiologist

> **{provider_name}, {credential}** is a radiologist who read and interpreted diagnostic imaging performed on {client} in connection with the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} review and interpretation of {client}'s diagnostic imaging, {provider_his_her} review of {client}'s medical records, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding the imaging studies performed on {client}, the findings and impressions from those studies, the reasonableness and necessity of the imaging, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding {client}'s imaging findings as they relate to {client}'s condition, injuries, damages, and prognosis. Plaintiff anticipates {provider_dr_name} will testify that the findings shown in {client}'s imaging are, within a reasonable degree of medical probability, consistent with and caused by the incident of {incident_date}.

Notes: fixes the old form's bug describing radiologists as providing "personal treatment." Michael approved keeping the causation sentence. Interventional radiologists who performed procedures go out under a treater variant instead. Interview card asks only which studies.

### 9.3 EMT / paramedic (defaults plural)

> **{provider_name}, {credential}** is an Emergency Medical Technician{s} who responded to the scene of the {incident_type} on {incident_date} and provided emergency medical care to {client}. {provider_they} specialize{s} in responding to emergency medical needs, stabilizing patients, and transporting patients to medical facilities for further care. {provider_they} will testify based on {provider_their} personal examination and treatment of {client} at the scene and during transport, and {provider_their} medical knowledge gained from education, training, experience, and research. {provider_they} will testify regarding the condition in which {provider_they} found {client} at the scene, {client}'s complaints and presentation at the scene, the emergency care and treatment provided, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_they} will give testimony in the form of facts and opinions regarding {provider_their} personal examination, treatment, and observations of {client}, including but not limited to medical expenses, medical treatment, pain and suffering, and other elements of damages. Plaintiff anticipates {provider_they} will testify that the condition and injuries for which {provider_they} provided emergency medical attention were consistent with the {incident_type} that occurred on {incident_date}.

Notes: deliberately "consistent with" causation (not medical-probability — qualification-fight avoidance). Records custodian rides in the contact block.

### 9.4 Chiropractor

> **{provider_name}, DC** is a doctor of chiropractic who provided chiropractic evaluation, treatment, and care to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of chiropractic treatment provided — including but not limited to spinal manipulation, therapeutic modalities, and rehabilitative therapy — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, physical impairment, and modes of treatment, including but not limited to medical expenses, pain and suffering, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify that the injuries treated were, within a reasonable degree of chiropractic probability, caused by the incident of {incident_date}.

Notes: **chiropractic** (not medical) probability — settled. No default future-treatment claims (add via per-provider notes when applicable). Most frequent LOP-gate variant.

### 9.5 Pain management

> **{provider_name}, {credential}** is a physician specializing in pain management who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of pain management treatment provided — including but not limited to medication management, injections, and other interventional procedures — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.

Notes: **future medicals live here by default** (Strahan v. Davis — reasonable-probability standard, no retained expert required); strike via wizard when no future-care story. Interview card asks which interventional procedures (ESIs, RFAs, blocks). Frequent LOP-gate variant.

### 9.6 Orthopedic surgeon

> **{provider_name}, {credential}** is a board-certified orthopedic surgeon who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of orthopedic treatment provided or recommended — {treatment_clause} — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care{future_care_clause}, and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.

Notes: "board-certified" only when the credentials dossier supports it (card logic §4). "Provided **or recommended**" is deliberate — covers the recommended-but-unperformed surgery, usually the largest future-damages number. Treatment checklist: evaluation, imaging review, conservative care, injections, surgery performed (+ named procedure).

### 9.7 Neurosurgeon

> **{provider_name}, {credential}** is a board-certified neurosurgeon who treats surgical disorders of the brain, spine, and peripheral nerves, and who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of neurosurgical care provided or recommended — {treatment_clause} — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care{future_care_clause}, and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.

Notes: scope sentence ("brain, spine, and peripheral nerves") kept deliberately — differentiates from ortho against cumulative-expert objections; ortho+neuro-on-same-case soft nudge fires here.

### 9.8 Primary care / family practice

> **{provider_name}, {credential}** is a {specialty_descriptor} physician who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of treatment provided or recommended — {treatment_clause} — the referrals made for specialized care, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish.{baseline_clause} Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care{future_care_clause}, and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.

`{baseline_clause}` when pre-incident treatment = Yes: *"Having treated {client} both before and after the incident, {provider_dr_name} will also testify regarding {client}'s physical condition and health prior to the incident and the changes in {client}'s condition following it."*

Notes: referral sentence is fixed text (rebuts attorney-directed-treatment themes; SB 30 defense-discovery agenda) — strike when no referrals. Baseline = pre-existing-condition rebuttal; soft note that designation opens the full chart.

### 9.9 Physical therapist

> **{provider_name}, PT, DPT** is a licensed physical therapist who provided physical therapy and rehabilitative treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}, pursuant to referral from {referring_provider}. {provider_dr_name} will testify based on {provider_his_her} personal evaluation and treatment of {client}, {provider_his_her} review of {client}'s medical records, and {provider_his_her} knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the initial functional evaluation, the course of therapy provided — {treatment_clause} — {client}'s objectively measured functional limitations, {client}'s progress and response to treatment over the course of therapy, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding {client}'s functional capacity, physical limitations, and physical impairment resulting from the injuries treated, including but not limited to the therapy provided, medical expenses, and pain observed and reported during treatment. Plaintiff anticipates {provider_dr_name} will testify that {client}'s functional limitations and impairments observed during treatment were consistent with the injuries {client_he_she} sustained in the incident of {incident_date}.

Notes: impairment is the headline (objective measurements); "consistent with" causation; NO diagnosis, NO mental anguish, NO future-cost projections. Referral phrase strikable. Checklist: therapeutic exercise, manual therapy, modalities, gait training, home exercise program, FCE. PTs never ride the mid-level rider.

### 9.10 Pharmacy

> **{pharmacy_name}**, by and through its pharmacist(s) and/or Custodian of Records, dispensed medications prescribed to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. The pharmacist(s) and/or Custodian of Records will testify regarding the medications dispensed to {client}, the prescribing providers, the dates of dispensing, the charges for those medications, and the reasonableness of those charges, and that the records of {pharmacy_name} are kept in the regular course of business.

### 9.11 Custodian-of-records-only

> The Custodian of Records for **{facility_name}** has knowledge of the medical records and billing records of {facility_name} pertaining to the care and treatment provided to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. The Custodian will testify that such records were made and kept in the regular course of business of {facility_name}, by persons with knowledge of the acts and events recorded, at or near the time of the acts and events recorded, and regarding the charges reflected in those records and the reasonableness of those charges.

Notes: cross-references the § 18.001 affidavit tracker — wizard shows "18.001 affidavit on file ✓" and defaults this variant to INCLUDED for such facilities (belt-and-suspenders for the pending Ortiz v. Nelapatla partially-controverted-affidavit question).

### 9.12 Mid-level rider (attaches beneath the supervising physician's paragraph)

> **{midlevel_name}, {midlevel_credential}** participated in the care and treatment of {client} under the supervision of {supervising_provider}, and will testify consistent with, and within the scope of, the testimony described above regarding {supervising_provider}, based on {midlevel_his_her} personal participation in {client}'s care.

Notes: eligible credentials PA, PA-C, NP, FNP, MA. "Within the scope of" caps the rider at the physician's described testimony. PTs excluded (full variant 9.9).

### Deliberate gap

**No mental-health variant exists, intentionally.** The Richardson Motorsports hard gate (§5.1) routes any treating psychologist/psychiatrist designation to manual, case-by-case drafting. This absence is stated here so a future session doesn't "helpfully" fill the gap.

## 10. Data-model implications

- `template` + `template_version` records (text with tokens, per-form metadata: footer title, document skeleton reference); in-app editor writes new versions.
- Token registry: static (record-sourced), inflected (gender/count), computed (`{treatment_clause}` etc. with per-variant checklists).
- Generated-document record: OneDrive path(s) (docx + pdf), template version used, full wizard-answer snapshot (for supplementation replay).
- Write-back paths: credentials answers → credentials dossier; treatment checklist answers → (future) Medical-tab treatment records.
- New logged item types on the case: settlement agreements, witness statements.
- New module stub: document production log (Bates range, description, date, recipient) — form engine reads only.
- Provider record fields already planned that this engine consumes: LOP bool, referral source, specialty, board certifications, retained/non-retained switch on expert records.

## 11. Open items for future sessions

1. Document production / Bates-stamping module — dedicated design session (auto-stamping pipeline, numbering scheme, prefix conventions, output formats).
2. Remaining template conversions beyond disclosures (designation of lead counsel, motion to withdraw, discovery requests/responses, criminal forms).
3. Extract the clean master .docx skeleton from Michael's uploaded form (fix table width 9900→9360, computed § column, strip vestigial tabs) — first build task when this feature's slice begins.
4. In-app template editor UX.
5. Confirm the pharmacy/custodian variants against current § 18.001 practice when the deadline-engine's CONFIRM items are verified.

## 12. POC learnings — live disclosure drafting (2026-07-31)

Status: POC-validated findings, generalized/scrubbed; canonical at docs/specs/form-engine.md §12.
Routed to the repo 2026-08-06 (design session, Fable 5). Helper code: `docs/specs/form-engine-helpers.md`.

**Distinct from §8 — do not merge the two.** §8 is *shell findings* (what Michael's physical
document is made of). This section is *method findings* (how the surgery is performed). They
cross-reference; neither subsumes the other.

Provenance: a design session drafted real combined TRCP 194.2(b)/195.5 disclosures for an active multi-defendant PI case by direct XML surgery on the practice's shell .docx — the exact operation the engine's first deliverable automates. The case work product stays out of the repo; everything below is method, generalized. This validates §5 (token substitution against a real .docx skeleton, never regeneration) end-to-end: the output survived XSD validation against the original, rendered correctly page-by-page, and a zip-member diff proved only word/document.xml changed — styles, numbering, footers, and settings byte-identical.

### 12.1 Preconditions

**Run-merge is a hard precondition, not an optimization.** Word fragments visible text across many `<w:r>` runs (revision IDs, spell-check state). On the live shell, the merge pass coalesced 464 fragmented runs. Without it, anchor strings that are plainly visible in the document do not exist as contiguous XML, and every downstream find fails silently or partially. The engine must run-merge before ANY anchor search, every time.

### 12.2 Anchoring rules

**Node-delimited anchors beat raw strings.** A short party name collided with a longer caption line containing it as a substring. The fix: match at the text-node level — `>EXAMPLE CO.<` (the string bounded by its `<w:t>` delimiters) rather than `EXAMPLE CO.` — so a standalone node match cannot collide with a longer line elsewhere.

**Every replacement carries an expected-count assertion.** The POC's replacement helper took `expect=N` (how many occurrences must exist) and `which=[...]` (1-based occurrence indexing for selective replacement) and hard-failed on any count mismatch. This caught the substring collision immediately instead of silently editing the caption. The engine's token pass must fail loudly on count mismatch; a token that matches an unexpected number of times is a wrong-shell or wrong-mapping signal, never something to power through.

### 12.3 The two-mechanic edit model

Every edit the POC needed reduced to exactly two mechanics:

1. **In-place text-node swap** (merge fields): replace the content of a `<w:t>` node; never touch anything outside it. Formatting is untouchable by construction.
2. **Whole-paragraph clone** (structure): capture an existing paragraph from the document itself as a template, blank all its `<w:t>` nodes, set the first to the new text (with `xml:space="preserve"`). The paragraph's `pPr` survives byte-for-byte — this is what preserves spacing, tabs, small caps, and justification without ever parsing them.

**Repeating blocks are span-capture-and-rebuild:** locate the span from the first block's first paragraph to the last block's last paragraph by anchor, capture (a) line templates of each distinct paragraph style present, and (b) the raw inter-block chunk (usually one empty paragraph) as the spacer, then rebuild the whole span from templates and splice it in. The document supplies its own templates; the engine never fabricates paragraph XML from scratch.

**Per-block paragraph deletion** (e.g., a template block with three name lines when a target block needs one): delete whole `<w:p>` elements from the cloned block string, never blank-and-leave (an emptied paragraph renders as a stray blank line — a formatting change).

### 12.4 Clone hygiene

**Bookmark dedup is a mandatory post-pass.** Cloned paragraphs carry `bookmarkStart`/`bookmarkEnd` elements; duplicated IDs fail XSD validation. The fix that worked: strip bookmarks from clones at build time, plus a global post-pass that keeps the first start/end per ID and drops subsequent duplicates. The engine should run the global pass unconditionally after any clone-bearing edit.

### 12.5 Proof chain (ship gate)

Three checks, in order, all mandatory before output leaves the engine:
1. **Validate** — XSD validation of the edited docx against the original.
2. **Render and inspect** — convert to PDF, rasterize, check every page (page-count change vs. the shell is expected when content grows; layout breakage is not).
3. **Parts-diff** — unzip both, diff every member; only word/document.xml may differ. Any other changed member is a defect.

A leftover-sweep assertion (a list of shell-origin strings that must NOT survive — prior-case names, placeholder tokens) belongs at the end of the edit script itself, before packaging. On the live run it confirmed zero survivors across ~40 tracked strings.

### 12.6 Spec-relevant findings

- **FE-1 (open): chronology sources carry provider identities but NOT addresses, phones, or billed charges.** The POC filled addresses/phones from web lookups (flagged unverified for attorney review) and set every charge to TBD. The engine cannot ship a servable draft from a chronology alone; it must obtain this data from somewhere — §4 interview cards, a persistent provider-directory table, or another source. **Which one is a design fork reserved for Michael; the finding is not a decision about the how.**
- **FE-2 (open, proposed):** one billing entity existed ONLY in the chronology's billing-record document names — no chronology row of its own. A human noticed it; the engine's §4 intake would have missed it. Proposed: intake sweeps document-name columns for entities not otherwise listed. Unruled.
- **Custodian-only variant (§9) exercised live** on two entities, one because its billing records named no provider. The variant works as specced; no mental-health-style exclusions were implicated.
- **Role-neutral narrative fallback:** where a provider's role could not be established from the source (named in records, function unclear), the POC wrote role-neutral narrative language rather than guessing a specialty, and flagged for attorney sharpening. Recommend the engine adopt this as the default when the variant library's role-specific language cannot be safely selected.
- **Occurrence-position sensitivity:** party names recur across caption, TO paragraphs, certificate of service, and response bodies with different required replacements in each. The token map must be position-aware (which occurrence gets which value), not name-aware only. The expect/which mechanism above is sufficient to express this.
- **Scale datum:** the full live edit was ~45 occurrence-controlled text-node swaps plus five structural rebuilds (one paragraph clone-insert, one block clone-insert, one three-block rebuild, two multi-block span rebuilds) in a 7-phase scripted pass. Well within a single scripted operation; no human-in-the-loop steps were needed between data map and validated output.
