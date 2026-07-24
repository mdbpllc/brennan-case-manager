# Session Log

Purpose: a dated, running record of what happened session to session in this project — decisions made, progress, and open threads — separate from `case-management-project-instructions.md` (which stays the single canonical, always-current spec for the case management build).

**How to use this doc (for any Claude session working in this project):**
- At the **start** of a session touching this project's work, skim the most recent 2-3 entries below to pick up where things left off, especially "Next" items.
- At the **end** of a substantive session (design decisions made, work completed, open questions raised), add a new dated entry at the top of the log below, in the format shown.
- Keep entries short — a few lines each. This is a pointer/recap layer, not a duplicate of the full spec. Detailed specs live in their own docs (`case-management-project-instructions.md`, `pi-case-playbooks.md`, `criminal-offense-playbooks.md`, etc.) — link to those rather than repeating their content here.
- Do not let this file grow unbounded — if it gets long, consider archiving older entries to a dated sub-file and keeping only the most recent months here.
- Each entry ends with two round-trip state lines so the Code handoff status is always visible at the top of the log: **"Staged for Code:"** (what this session prepared for a coding session) and **"Awaiting/Returned from Code, unreviewed:"** (what a coding session produced that the design space hasn't reviewed yet). Write "none" rather than omitting them. When a design session reviews returned material, the next entry clears it.

---

## 2026-07-24 (feature-intake handoff filed — Code session)

**What happened (Claude Code session):** Filed the second 2026-07-24 design handoff (feature intake — distinct from the CourtListener handoff applied earlier today, `bf89eca`). The design entry below is appended verbatim; the staged deliverable is committed as `feature-intake-2026-07-24.md`; cross-references added to master spec §14 and CLAUDE.md (spec list + build queue). No code written. Reconciliations (the design entry predates repo sync): (1) the intake says items are "sequenced behind current Phase 1a work" — Phase 1a was already built and walkthrough-approved 2026-07-23, so item A (recorder → local transcription → sort & route) is the effective next build target per Michael's "do this tonight" call; CLAUDE.md's queue updated (OAA criminal appointment intake moves to second, not dropped). (2) Item A overlaps the transcript integration layer already fully specified in `transcript-workflows.md` (same local NVIDIA pipeline, phases 0–3 defined, hardware roadmap in its §9) — item A's design pass should extend that spec, not re-derive it. (3) Item B overlaps `outlook-email-intake.md` (EXPLORATORY, HIPAA first-class) — same coordinate-don't-duplicate note. (4) Data-hygiene flag raised in `docs/spec-feedback.md` (new item 9): item D's "real example" carries live-matter lien amounts and item A's spoken-tag example names "the Curry matter"; the doc was filed verbatim as directed, but the commit is being held LOCAL (not pushed to GitHub) pending Michael's call on genericizing.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (needs Michael's Entra setup + first-connect verification); spec-feedback item 9 (data-hygiene call + push decision); the Code-side entries below; this entry.

## 2026-07-24 (design session — feature intake, no build)

**What happened:** Design-space dictation session with Michael capturing new feature ideas and one immediate next-build target. No code written. All items below are intake, not spec-final — they need a design-space pass to reach registry/spec discipline before build.

**Immediate next target (Michael's call — "do this tonight"):** the **recorder → local-transcription → sort/route workflow** (item A below). Start here next session.

**Decisions / framing:**
- CourtListener / Free Law Project API ($10/mo) worth adopting for in-session case-law retrieval — speeds the *retrieval* loop (Haygood-line verification last night required Michael to pull PDFs by hand), not the interpretation. Attorney interpretation stays with Michael; API text is a source, not a verification (consistent with Legal Rule Registry rule 2). Ties to the dictation workflow: Michael reads cases, dictates his read, system cross-checks against retrieved opinion text.
- **Reusable pattern identified and named** (item C): "upload a document → extract structured data → do something meaningful with it (populate records, create contacts, track change over time)." Subrogation is the first concrete instance; the pattern is cross-cutting (court docs, insurance, medical). Build subrogation as the reference implementation of the pattern.
- **Standing design lens:** proactively surface good dictation-capture opportunities as features get built (origin: old-school tape-dictation workflow). Flag to Michael when a build step would benefit from dictation rather than typing.
- Email intake/routing (item B) kept as its own project, separate from the Outlook calendar-push slice — but watch for advantageous linkage points as both develop; flag rather than silently merge.
- Scope/sequencing note: Michael working ~20 hrs/week. Feature set is deep but each item is a contained slice. Discipline = finish one before starting the next; these are intake, sequenced behind current Phase 1a work.

**Staged for Code:** `feature-intake-2026-07-24.md` (this handoff, Part 2) → canonical path `docs/specs/feature-intake-2026-07-24.md`.

**Awaiting/Returned from Code, unreviewed:** none from this session.

**Next:** Start item A (recorder ingestion + transcription sorting). Before building, Michael to provide the NVIDIA transcription model's docs/API so capability (speaker separation, timestamps, batch, structured output) can be confirmed against the sort/route design.

## 2026-07-24 (Code handoff applied + reconciled — Code session)

**What happened (Claude Code session):** Applied the 2026-07-24 design-space handoff. Reconciliations, since that design session couldn't yet see the repo sync: (1) its §2 doc had already been committed this same day (`f9825b3`) from an earlier routing of identical content (byte-diff confirmed) — renamed via git mv to the handoff's canonical `registry-courtlistener-integration-design.md`, references in CLAUDE.md and the master spec's registry section updated; no duplicate commit. (2) The 2026-07-23 handoff was re-verified as fully applied (`fb62d9e`). (3) The design entry below predates repo events it stages as future work: the two v0.1 UI primitives (phone masking, comboboxes) were BUILT 2026-07-23 (`d2f493e`) as shared components, and Phase 1a was built AND walkthrough-approved 2026-07-23 — "Phase 1a build session" in its Next list is already satisfied. (4) Since that entry was drafted, Outlook calendar push Phase 1 was also built (`8a1752b`, entry below).

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (needs Michael's Entra setup + first-connect verification); the Code-side entries below; this entry.

## 2026-07-24 (CourtListener integration designed; v0.1 feedback landed)

**What happened (chat session):** Confirmed Michael pushed the 2026-07-23 handoff (registry draft entries + log append + header amendment + spec-feedback note) — sync back to project knowledge not yet visible; verify at next session start. Michael's v0.1 feedback doc (claude/v0.1-feedback.md, complete) surfaced in project knowledge: all v0.1 features approved, two UI change items (phone masking, searchable comboboxes) as shared components at top of Phase 1a; **Phase 1a UNBLOCKED.** Decided the 17 case-law files stay in the project through registry sign-off (they are the [READ] verification sources); after sign-off, optionally archive to `docs/authorities/` (public opinions — no client-data concern; note they are Lexis Word exports misnamed .Pdf; one duplicate McMillan).

**Research/decisions:** Case-law database question resolved. Human layer: vLex Fastcase (free State Bar of Texas member benefit — includes citator + Texas case-law alerts) + Lexis for high-stakes Shepardizing. Machine layer: **CourtListener (Free Law Project)** — REST API v4 (search incl. semantic, citation graph, cite-validation endpoint), free daily search alerts, webhooks, and an **MCP connector** usable from chat and Claude Code sessions. FLP membership Tier 1 ($10/mo, https://free.law/membership/) fits; small-firm eligibility explicit; API promo doubles rates through 2026-08-06 but all budgets specced against standard limits.

**Deliverable:** `registry-courtlistener-integration-design.md` — three-layer design (alerts / budgeted API / MCP), registry schema additions (opinion_id, cite_validated, alert_id, forward_citation_baseline, review_flag + flag_history), config hygiene (token in .env; no client data in queries), flag-don't-verify principle restated as governing. Two [DECIDE] items for Michael: webhook-vs-email pending hosting posture; whether cite-validation pulls forward into the registry table build.

**Next:** (1) Michael: FLP account + Tier 1 (before 8/6 for promo) + MCP connector setup; (2) registry sign-off checklist (priorities unchanged: Entry 1(c-3) qualified-LOP ruling; Entry 4 fatal-defect conflict); (3) Phase 1a build session (two UI primitives first, per v0.1-feedback disposition); (4) review BUILD-SESSION-NOTES.md.

**Staged for Code:** `registry-courtlistener-integration-design.md` (commit under docs/specs/; reference from registry section of master spec); this log entry.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21 overnight audit) — still unreviewed; 2026-07-23 handoff push — confirm synced back.

## 2026-07-24 (spec snapshot: CourtListener registry integration — Code session)

**What happened (Claude Code session, design-space-directed):** Committed the design addition `legal-rule-registry-courtlistener-integration.md` (CourtListener/FLP citation-graph integration: Layer A saved-search alerts for citation-currency flags, Layer B budgeted API for cite validation + flag investigation, Layer C MCP connector for verification sessions; governing principle — automation flags, only Michael verifies). Per the doc's own staging instruction, added the cross-reference to the master spec's registry section (§2) and to CLAUDE.md's spec list. Nothing built; the doc's §6 sequencing question ([Michael: approve or pull cite-validation forward]) and §4 webhook-vs-email decision ([DECIDE]) are Michael's.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; Outlook push Phase 1 (entry below — needs Michael's Entra setup + first-connect verification); the earlier Code-side entries; this entry.

## 2026-07-24 (Outlook calendar push Phase 1 BUILT — Code session)

**What happened (Claude Code session, same sitting as the v0.1-feedback entry below):** Michael cleared the gate ("go") and asked for a full autonomous run. Built Outlook push Phase 1 per `outlook-calendar-sync.md`, end to end:

- **CalendarEvent entity** (`src/domain/calendar.ts`): type (hearing/deadline/appointment/reminder/other), naive-LOCAL start/end storage (deliberately timezone-free — UTC-bug lesson; the Graph layer attaches the browser IANA timezone at push time), all-day support, scheduled/cancelled status (cancelled = tombstone + Outlook deletion), and sync state (pending/synced/error + outlookEventId + last error). Both adapters (local store v5, Supabase + `calendar_events` table with matching RLS), seeds (two Garcia events).
- **Graph push layer** (`src/outlook/`): config-activated like Supabase (`VITE_MSAL_CLIENT_ID` / `VITE_MSAL_TENANT_ID` / `VITE_OUTLOOK_CALENDAR_NAME`); delegated MSAL popup auth (lazy-loaded chunk — demo sessions never fetch it); find-or-create dedicated **"MDBP Cases"** calendar (spec's recommended default; stale-calendar-id self-heal); push on create/edit/cancel with PATCH→recreate fallback if the Outlook copy was deleted (software is the authority); every event carries the matter reference (fileNumber|caseId|eventId) in a GUID-namespaced extended property + a "Matter:" body line — the Phase 2 matching hook. Retry queue: everything non-synced pushes on connect and via "Sync now".
- **Calendar tab** on case detail: event list with type/sync badges, create/edit/cancel forms, connection card, cancelled-tombstone section. ReviewLog wired (created/edited/cancelled).
- **Spec's two [CONFIRM at build time] items** resolved as config-driven defaults rather than blockers: dedicated calendar per spec recommendation (name overridable), delegated auth via an Entra app registration **Michael creates himself** — 5-minute steps in `docs/outlook-setup.md`. Until then events queue as "pending" and drain on first connect.

**Verified live:** create (timed + stored naive-local), edit (times updated, re-queued), cancel (tombstone + audit trail), seeded events render, all regression pages clean (Medical incl. batch analyze + bill workspace, parties incl. phone formats with extension, Benchmarks, Legal rules ×9, New case date-opened local-today). Build + oxlint clean.

**Demo-store consequence:** the localStorage store version bumped (v3→v5; 5 because a mid-edit HMR reload could have left a half-seeded v4). Michael's browser demo store WILL reseed on next load — his walkthrough-era imported PFS schedule, confirmed runs, and in-app rule notes are demo-mode data and will be wiped. Re-import `..\data\pfs\PFS-2026-TX-RestOfState-nonQPP.csv` via Benchmarks. This wipe class ends once the Supabase auth decision lands.

**Open for Michael:** run `docs/outlook-setup.md` (Entra registration + two `.env` lines), then Connect Outlook on any case's Calendar tab. Live Graph push could not be exercised in-session (needs his registration + his sign-in — credentials are never Claude's to handle); first real connect is the remaining verification step.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; the Code-side entries below; this entry.

## 2026-07-23 (v0.1 feedback: phone masking + filterable combobox — Code session)

**What happened (Claude Code session):** The prompt asked for the full Phase 1a build plus two v0.1 feedback fixes — but Phase 1a was already built, gap-closed, and **walkthrough-APPROVED by Michael** (entries below), so per the standing resolution from the 2026-07-23 collision session (verify + close gaps, never rebuild), only the genuinely new work was done:

- **Phone masking (feedback item a), as shared infrastructure:** new `phone` field type in the party registry — every phone/fax field (12 across all party types, incl. repeating location sub-fields) now uses a masked input that formats live to (XXX) XXX-XXXX with extension support ("x214"), strips a leading 1, and stores bare digits (`domain/phone.ts` holds the storage/format rules; `components/phone.tsx` the input). Legacy formatted values already in localStorage display correctly without migration (normalize-on-format) and re-normalize whenever edited. Seed data updated to the stored-digit form.
- **Filterable combobox (feedback item b), as the standard long-list picker:** new `components/Combobox.tsx` (type-to-filter on name + party type, keyboard navigation, clear button). Replaced all three long-list `<select>`s: Linked-parties picker on case detail, provider picker on the Medical tab's new-bill form, and the registry's `partyLink` field widget (used by every party form). Short fixed vocabularies (roles, sides, statuses) stay native selects. Status lists untouched per instruction (user-tunable config).
- **Phase 1a audit delta closed:** the prompt's "only CONFIRMED AnalysisRuns may feed settlement/lien math — enforce at the data layer" was previously enforced by inline status checks at each consumer. Added `settlementEligibleRuns()` in `domain/billing.ts` as the single documented gate and rewired both existing consumers (Medical-tab roll-up, provider billing profile) through it, so future settlement/lien modules inherit one enforcement point.

Verified live in demo mode against the running dev server (mask typing incl. extension + leading-1, stored-form normalization on save, combobox filter/select/clear on all three sites); build + oxlint clean. Everything else in the prompt's Phase 1a scope list was confirmed already present from the approved build.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21) — still unreviewed; the two Code-side entries below (registry snapshot + round trip); this entry. Note for the design space: the Phase 1a build prompt lagged repo state (second occurrence) — worth checking session-log.md before drafting build prompts.

## 2026-07-23 (design-space round trip executed — Code session)

**What happened (Claude Code session):** Executed the three items routed from the design space: the round-trip state-line rule added to this file's header; the design-space registry-verification entry appended below; the Ch. 146 correction appended to `docs/spec-feedback.md`. Reconciliation: the registry draft-entries doc had already been committed by the Code side earlier tonight (`f3c1f21`, as `legal-rule-registry-draft-entries.md`) before the routing instructions were drafted — content identical, so it was renamed (git mv, history preserved) to the design space's canonical `legal-rule-registry-draft-entries-medical-billing.md` and CLAUDE.md's spec list updated. Nothing else was needed on that staged item.

**Staged for Code:** none.

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (2026-07-21 app walkthrough + structure audit) — still unreviewed; plus tonight's two Code-side entries below this one (the registry snapshot commit, including the deliberately deferred `ch146-eob-cap` seed correction, and this round-trip entry).

## 2026-07-23 (registry verification session — design space)

**What happened (chat session):** Worked the Part 7 verification list. Michael pulled official CPRC Ch. 146 text (confirms H.B. 4145, eff. 9/1/2025: new §146.002(c-1) attorney-billing route + (d)(1) conforming change). An external model response to all nine verification prompts was received — treated as proposal text only, per registry discipline. Michael then loaded 16 full opinions into project knowledge (Haygood through Christus Santa Rosa, 2011–2026) plus uploaded In re Club Car (Fort Worth, Nov. 2025); all 17 read in full, chronologically, with a confirmation pass.

**Key findings:** (1) Spec mischaracterizes Ch. 146 — it's a timely-billing bar, not an EOB lien ceiling (see spec-feedback). (2) External response mis-cited McMillan v. Hearne (nonsubscriber offset case) for paid-or-incurred/LOP propositions. (3) K&L qualified-LOP tension identified: reasonableness-conditioned LOPs (our Kostura template) arguably cap the "incurred" amount — attorney ruling needed before billing module encodes either reading. (4) In re United Healthcare (San Antonio 2022) is a Fourth Court limit on K&L discovery the external draft missed. (5) Sheppard (2025) ↔ §146.003 ↔ H.B. 4145 triangle yields a dated per-bill exposure-window flag candidate (services billed only to counsel pre-9/1/2025). (6) In re Allstate itself is NOT in the collection — Entry 2 remains wholly unverified.

**Deliverable:** `legal-rule-registry-draft-entries-medical-billing.md` — ten draft registry entries (nine original + new Rule 204.1/IME entry) with per-proposition source flags ([READ]/[STATUTE]/[EXT]/[NEG]/[JUDGMENT]) and a sequenced sign-off checklist. All entries remain UNVERIFIED pending Michael's per-proposition sign-off.

**Next:** Michael works the sign-off checklist (priorities: Entry 1(c-3) qualified-LOP ruling; Entry 4 fatal-defect conflict — gates disbursement checklist). Pull In re Allstate, Sherwin-Williams, Auburn Creek, HEB Grocery, current Ch. 55 + §18.001 texts, H.B. 4145 enrolled bill.

**Staged for Code:** this file (log append + spec-feedback note + header amendment); `legal-rule-registry-draft-entries-medical-billing.md` (commit under docs/specs/ as the registry working draft — all entries unverified).

**Awaiting/Returned from Code, unreviewed:** BUILD-SESSION-NOTES.md (overnight app walkthrough + structure audit, from 2026-07-21 task) — still unreviewed in the design space.

## 2026-07-23 (registry draft entries — spec snapshot committed)

**What happened (Claude Code session):** Committed the design-space deliverable `legal-rule-registry-draft-entries.md` — ten detailed draft registry entries (medical damages/paid-or-incurred, §18.001, negotiated-rate discovery, Ch. 55 liens, Ch. 146 timely billing incl. H.B. 4145, price transparency, fee schedules, NSA/SB 1264, legislative sweep, and a NEW compelled-exam entry) with per-proposition source flags ([READ]/[STATUTE]/[EXT]/[NEG]/[JUDGMENT]) and Michael's per-entry sign-off checklist. This answers spec-feedback item 7's enrichment request for the North Cypress / K&L entry (now Entry 3 with limits (e)–(f)). Added to CLAUDE.md's spec list.

**Deliberately NOT done:** no edits to the nine seeded registry propositions in `src/data/billingSeed.ts`, even though Entry 5 corrects the seeded `ch146-eob-cap` proposition as wrong (Ch. 146 is a timely-billing statute, not an EOB lien ceiling) — the proposition-amendment workflow is exactly the open design question in spec-feedback item 7(b), and silent text changes would orphan past runs' version stamps. The seed correction waits for Michael's ruling on that workflow. Interim: the wrong framing is unverified, drives no computed outcomes, and Michael can note the correction in the rule's in-app Notes field.

**Next:** Michael works the sign-off checklist at his pace (three items marked ATTORNEY RULING NEEDED: Entry 1(c-3) qualified-LOP incurred amount, Entry 4(c) lien fatal-defect conflict — priority, gates the disbursement checklist — and Entry 5(c) §146.003-as-Haygood-bar posture). Build queue unchanged: Outlook one-way calendar push is the next slice.

## 2026-07-23 (Phase 1a walkthrough — APPROVED)

**What happened:** Michael walked through Phase 1a live (same session as the gap-closing and PFS-pull entries below) and **approved the slice**. He imported the real TX Rest-of-State PFS schedule himself via the Benchmarks page, worked the full loop (line-item confirm flows, EOB card, analysis run → attorney confirmation → provider billing profile, registry, report generation, batch analyze), and the facility-bill hard caveat did its job when the batch run showed 27.20× on the facility bill (professional benchmark distortion — understood, Phase 2 MRF is the fix).

**Fixed during the walkthrough (committed):** line-item Edit/Delete tucked behind a per-row "⋯" menu; benchmark-analysis intro rewritten in plain English for non-builders; "Extended" relabeled "Line total" (footer sum renamed to avoid collision). **Approved:** disclaimer wording → `v1-2026-07-23` (was v1-draft). **Settled:** EOB source-pin stays a warning, not a hard stop; facility ratio in the bill-list stays uncaveated (caveat lives on the bill page and reports); "pin" label stays.

**Captured for the design space (spec-feedback items 6–8):** streamlined EOB acquisition workflow (client EOBs are slow to get in practice); multi-EOB-per-bill modeling requirement for Phase 2 reconciliation; enrichment of the North Cypress / K&L negotiated-rate-discovery registry entry (true but oversimplified — limits on discovery scope need feeding in) plus the general proposition-amendment workflow; disclaimer authority research.

**Next:** registry verifications at Michael's pace (his homework, no code); Supabase auth decision before any real client data; **Outlook one-way calendar push is the next build slice** (gate cleared).

## 2026-07-23 (real Medicare PFS data pulled — TX Rest of State)

**What happened (Claude Code session, same session as the gap-closing entry below):** Pulled real 2026 Medicare PFS data from CMS with Michael in the loop. Michael authorized: (1) accepting the AMA CPT click-through license on the CMS PFS look-up tool on the firm's behalf, (2) locality = **Rest of Texas** (Novitas 04412 / locality 99 = MAC locality 0441299, confirmed against CMS's own locality key), (3) **codes + rates only, no CPT descriptions** — conservative reading of the CPT license, which limits use to "Medicare, Medicaid or other programs administered by CMS." That license reading is new input for registry item 7 (PFS licensing) — still unverified pending Michael's sign-off; he should note the decision there when he verifies.

**Result:** `..\data\pfs\PFS-2026-TX-RestOfState-nonQPP.csv` (outside the repo, same convention as the MRF fixture) — 7,740 codes, non-facility amounts, built from PFALL26AR + REV26B + REV26C (July-current), global-modifier rows only. Full provenance README beside it. **Validated end-to-end:** 99203 → $114.05 matches the CMS look-up tool result for locality 0441299 exactly. CLAUDE.md records the data directory.

**Next:** Michael's Phase 1a walkthrough, importing this CSV via the Benchmarks page as part of it (suggested metadata in the data README). Facility-side and 26/TC component pricing deliberately deferred (Phase 2 / when a bill needs it).

## 2026-07-23 (Phase 1a audit + gap-closing session)

**What happened (Claude Code session):** Michael's prompt asked to "begin the Phase 1a build" — but the repo showed it was already built in the overnight session (entry below). Flagged the collision to Michael before writing code; he chose **verify + close the gaps**. Audit result: the overnight build matches his six-point instruction list except three deltas — (1) ProviderBillingProfile not built (had been deferred to Phase 4), (2) no stale-analysis flag (manual re-run only), (3) real Medicare PFS data still needs Michael (importer ready). Closed 1 and 2 in two commits, verified live in demo mode, build + oxlint clean:

- **ProviderBillingProfile** (synthesis Part 4) attached to the provider-business party record: domain type, both adapters (local store v3, Supabase upsert), schema table with RLS, and a Billing profile card on provider-business party pages. Recomputed deterministically on run confirmation from CONFIRMED runs only (aggregate confirmed billed ÷ benchmark across the latest confirmed run per bill, cross-case), plus distinct coding-audit flags and last-analysis date; ratios/flags only, no client identities (guardrail 7). `historical_reduction_pct` column reserved for the settlement-outcome auto-feed.
- **Stale-analysis flag + re-run action:** deterministic — a run is stale when the loaded fee-schedule set changed or a stamped registry-rule version bumped since it ran. Badges with reasons in the bill workspace and Medical tab; latest-run stale notice with one-click re-run; roll-up warns when stale confirmed runs feed the headline ratio. Full date-of-service pinning still lands with effective-dated schedules in Phase 2.

**Also noted:** BUILD-SESSION-NOTES.md is the 2026-07-21 v0.1 audit (not an overnight Phase 1a walkthrough); its one still-open item affecting this slice is the Supabase auth gap — billing, like v0.1, is demo-mode-only until the auth decision.

**Next:** Michael walks through Phase 1a (now gap-closed); import real TX-locality Medicare PFS data together; Supabase auth decision before any real central-database use; then Outlook one-way push per the settled sequence.

## 2026-07-23 (spec capture: Forms & Document Automation Engine)

**What happened (Claude Code session, design-space-directed):** Captured the fully-designed form engine into `docs/specs/form-engine.md` — wizard-driven document generation (first deliverable: TRCP 194.2(b)/195.5 PI disclosures), token substitution against a real .docx skeleton (never regeneration), Michael-approved verbatim variant library (12 variants; mental-health variant deliberately absent — hard-pause gate), enter-once interview cards with write-back, wizard-only warning gates, supplementation replay, and the formatting-skeleton findings from Michael's actual disclosures form (incl. the 9900→9360 twip table-width bug and the contamination ruling: skeleton only, never its text). Per the design space's instructions, §14 of `case-management-project-instructions.md` was updated — note: no prior "wanted later" forms item actually existed there, so the form engine was added as a new FULLY SPECIFIED entry rather than upgrading one, plus the document production / Bates-stamping module as a new banked item (separate module, form engine reads only, dedicated design session needed). CLAUDE.md spec list updated. Next build slice UNCHANGED: billing Phase 1a walkthrough → Outlook push. (Phase 1a was built overnight this same date — see entry below.)

**Next:** unchanged; form-engine build waits its turn in the queue. First build task when its slice begins: extract the clean master .docx skeleton (form-engine.md §11.3).

## 2026-07-23 (spec snapshot added: criminal appointment intake + docket enhancements)

**What happened (Claude Code session):** Committed the revised design-space spec `criminal-appointment-intake-and-docket-enhancements.md` (OAA-based matter creation with the two-tier Uvalde/DeWitt extraction model, hearing auto-detect with semantic date labels and the stale-date guard, docket-worksheet cross-referencing). Repo filename drops the `-v2` suffix — git history tracks revisions; the doc's own status line carries the revision date. Added to CLAUDE.md's spec list. Per the doc's data-hygiene note, the sample OAA documents stay out of the repo. Merged with Michael's same-day GitHub web upload of the earlier draft plus `outlook-calendar-sync.md` and `outlook-email-intake.md` (both now listed in CLAUDE.md; the v2 spec kept over the draft per its own supersedes line); his uploaded session-log entry file folded into this log below (dictation-session entry) and the standalone file removed per its own paste-me instruction. Going forward Michael hands documents to the Code session rather than uploading via GitHub, so uploads and local commits don't collide.

**Next:** unchanged — Michael's Phase 1a walkthrough, then Outlook calendar push, then OAA intake per the doc's §4 sequencing.

## 2026-07-23 (billing module Phase 1a BUILT — overnight session)

**What happened (Claude Code session):** Phase 1a built end-to-end per the synthesis doc (Part 3 1a scope, Part 4 data model, Part 5 guardrails) in two commits, verified live in demo mode, build + oxlint clean. Delivered: Medical tab on case detail (bill list, §10 Type 1/2 ledger math in the case roll-up, batch analyze, report list); per-bill workspace (editable ledger with Type 2 reconciliation check, claim-type detection + attorney override + hard facility caveat, EOB card with source-pinned patient-responsibility field, line-item table with chargemaster-memory trigram suggestions and confidence badges, attorney confirm/reject/manual-CPT flows, deterministic coding audit, provisional→confirmed analysis runs, ratio-led internal report generator with registry stamps and disclaimer v1); **Legal Rule Registry as system-wide infrastructure** (all nine Part 7 propositions seeded UNVERIFIED; verify action = attorney sign-off in the UI, nothing programmatic sets verified); Benchmarks page (fee-schedule library + CSV import for real CMS PFS data — demo schedule with fictional rates ships so the flow is clickable). Supabase schema + adapter extended in parallel (pg_trgm, RLS matching existing posture); trigram matching implemented in TS so demo and Supabase modes behave identically.

**Implementation decisions (in-code, no spec impact):** disclaimer text shipped as v1-draft pending Michael's review; scenario tier = unconfirmed suggested mappings computed separately and clearly labeled (B2-light); confirmed-only totals feed the headline ratio and roll-up.

**Deferred/open:** real Medicare PFS data import (CSV importer ready — needs Michael in the loop to pull the TX-locality export); backlog items 3–4 (structured addresses, health-insurer party type) NOT folded in — left for Michael's call; ProviderBillingProfile is Phase 4; no run archival/deletion yet.

**Next:** Michael walks through Phase 1a and gives feedback; import real PFS data together; then Phase 2 (lien war chest / MRF loader) or backlog per Michael's priorities.

## 2026-07-23 (phone dictation → three new specs: OAA intake, Outlook sync, email intake)

**What happened:** Michael used the 2026-07-22 docket worksheet in court — content correct, but some of his cases showed only the prosecutor because the docket printed before his appointment was entered. Phone dictation session captured fixes + a suite-wide requirement; specs drafted same day at the desktop.

**New specs (committed under docs/specs/):**
- `criminal-appointment-intake-and-docket-enhancements.md` — OAA-upload matter creation (Uvalde/Real = clean digital; DeWitt = scan/OCR tier; per-county template registry), hearing auto-detect with confidence-gated calendar creation, and docket-worksheet cross-referencing against existing matters (+ email, later) before prompting Michael.
- `outlook-calendar-sync.md` — Outlook connectivity is **non-negotiable**. Phase 1 committed: one-way push, software → Outlook (incl. edits/cancels), via Graph. Phase 2 (two-way) explicitly BACKLOGGED — doable, negligible runtime cost, real engineering complexity; must not delay Phase 1.
- `outlook-email-intake.md` — EXPLORATORY only. Email flows into the system, type-driven actions; HIPAA compliance is a first-class constraint (PHI in PI-case mail). No build commitment; future brainstorming loop in the billing-module-prompt style.

**Sequencing decided:** (1) BUILD-SESSION-NOTES.md review + v0.1 feedback → (2) billing Phase 1a (unchanged) → (3) Outlook one-way push → (4) OAA intake → (5) docket cross-ref rides with docket-worksheet feature → backlog: two-way sync, email intake.

**Open:** Michael to upload sample OAAs (Uvalde/Real form + DeWitt scan; no live client data) so the field map can be finalized. *(Resolved same day — samples analyzed, field maps in the v2 spec.)*

**Next:** unchanged near-term — review BUILD-SESSION-NOTES.md and Michael's v0.1 feedback, then billing Phase 1a.

## 2026-07-22 (v0.1 walkthrough — SIGNED OFF + feedback captured)

**What happened:** Michael ran the v0.1 slice (Case overview + Parties) and walked through it live. Verdict: v0.1 approved as-is — layout and structure match how he works; the only surprise was scope (he expected more built out), which is expected for a first vertical slice. The v0.1-feedback gate on billing Phase 1a is now CLEARED.

**Confirmed working as intended:** the `priorRecordVerified` DPS/background-check checkbox on party intake — the unverified-until-checked flag on eligibility readouts (advisory flag, not a hard stop) is the behavior Michael wants. No change.

**New backlog items (deferred — do NOT build now, capture only):**

1. Texas district court directory — map and store all Texas district courts in the system so courts are selected from a canonical list rather than typed freehand. Feeds deadline engine and filing logic downstream.
2. Client detail / intake section — deeper buildout. Current fields work but are too shallow. Expand beyond the existing list (prior motor vehicle collisions, falls, injuries, medical providers seen, driving history, prior tickets, prior criminal history). Add gating logic — e.g. a yes/no "has the client ever been arrested?" that collapses follow-up fields when No — with the caveat Michael flagged: a conviction can exist without an arrest, so the gate logic must not be naive. Before building, find a real intake form/source to model the field set on rather than inventing it. Note: interacts with the existing structured prior-history requirements in `plea-hearing-eligibility-reminder.md` §3 — don't design in isolation from that.
3. Structured address fields — replace single free-text mailing address with discrete fields: address line 1, address line 2 (suite/apt), city, state, ZIP (three separate boxes for city/state/ZIP). Rationale: addresses must be reassembled into multiple output formats (signature blocks, recipient headers on demand letters), which is impossible from one mushed field. Painful to retrofit — do this before address data accumulates.
4. New party type: Health Insurance Company — currently missing from the party-type dropdown in `partyRegistry.ts`. Prerequisite for item 5.
5. Type-ahead lookup on health insurer field — typing "unit" surfaces a dropdown of insurers already saved in the system (e.g. UnitedHealthcare) for selection rather than re-entry. Keeps names consistent across cases. Same fuzzy-match-from-memory pattern already specced for chargemaster lookups in the billing module. Depends on item 4.

**Open (unchanged):** Citizens MRF median-column compliance sub-question still requires attorney sign-off (synthesis Part 7). Michael's direction: don't over-invest in that single dataset — broaden the MRF corpus instead, starting with all San Antonio hospitals, then scaling to Texas statewide. Target-list assembly (systems + transparency-page URLs) not yet done.

**Next:** billing module Phase 1a build (gate cleared) — re-attach current codebase in a fresh build chat. Backlog items 1–5 are post-1a unless Michael reprioritizes; items 3 and 4 are cheap and schema-adjacent, so consider folding them into the 1a branch if they don't expand scope.

## 2026-07-21 (second review pass: robustness + schema hardening)

**What happened (Claude Code session):** Re-reviewed the whole codebase after the cleanup pass and fixed the stragglers: bad-URL/missing-record pages now show "not found" notices instead of loading forever; list and detail pages surface a visible error when the database can't be reached (this is what a user will see in Supabase mode until auth lands); role/side pickers now share one `CASE_ROLES`/`SIDES` source in `types.ts`; `db/schema.sql` hardened — RLS enabled on `file_counters` (it was the one table exposed to any key-holder) with `next_file_number()` made SECURITY DEFINER (no live DB yet, so no migration needed). Retested the "Enter doesn't submit the party form" observation — withdrawn as a test-harness artifact; notes corrected. Verified index.css is complete (no missing badge classes). Build + oxlint clean; not-found pages verified live.

**Next:** Michael takes docs/spec-feedback.md to the design space; then billing module Phase 1a.

## 2026-07-21 (cleanup + improvements pass)

**What happened (Claude Code session):** Fixed everything actionable from the review: the UTC "date opened" bug (new `src/domain/dates.ts` local-date helper); repeating-group button labels (new `itemLabel` on field defs); tabs are now URL-driven (`/cases/:id/parties`) so creating a party returns you to the Parties tab; list rows expose real links; the "not yet filled in" footer collapses; `isClosedStatus()` centralizes the closed check; localStorage store is versioned (stale stores reseed); `updateParty` narrowed to displayName+fields in the adapter interface; bulk `getCases`/`getParties` added to kill N+1 fetches; **PI flags, commercial policy, and representation type are now editable on the case Overview tab** (practice area / case type stay frozen pending a spec decision). README: Supabase auth gap noted, docs/specs pointer added. Created `docs/spec-feedback.md` with the five open design-space items (probate ladder, Supabase auth, archive/void, party-type promotion, MRF path). Two corrections to BUILD-SESSION-NOTES (file-number year is local, not UTC; README was already app-specific). Build + oxlint clean; all changes verified live in the browser.

**Next:** Michael takes the spec-feedback items to the design space (hand-back prompt provided in session); then billing module Phase 1a.

## 2026-07-21 (v0.1 test drive + codebase review)

**What happened (Claude Code session):** Installed Node.js LTS 24.18.0 (machine had none — v0.1 had never run here), ran the app, and did a hands-on click-through in demo mode plus a full codebase read. Findings written up in `BUILD-SESSION-NOTES.md` (repo root): structure summary, what works, and a gaps list. Headliners: a UTC bug makes "date opened" default to tomorrow every evening; Supabase mode can't work yet (RLS policies require `authenticated` but there's no login); case classification/flags can't be edited after creation. No console errors; no broken imports or TODOs.

**Next:** Michael reviews BUILD-SESSION-NOTES.md alongside his v0.1 feedback; fix the UTC date bug; then billing module Phase 1a.

## 2026-07-21 (build environment stood up)

**What happened (Claude Code session):** Build environment stood up. Repo initialized under git with `.env` protection in `.gitignore` and moved to its permanent home. Spec docs committed under `docs/specs/`. CLAUDE.md created by merging the conventions block into the repo-generated structural half — block wins on rules; spec list corrected (it was missing `medical-billing-analysis-module-prompt.md` and this session log, now documented as the one append-allowed exception to the read-only-specs rule); transport file deleted after the merge (original preserved in git history). Pushed to private GitHub at `mdbpllc/brennan-case-manager`.

**Open item:** record the Citizens MRF local path in CLAUDE.md once chosen.

**Next:** Michael's v0.1 feedback, then billing module Phase 1a.

## 2026-07-21 (build moves to Claude Code; conventions block drafted)

**What happened:** Assessed whether the build should move to Claude Code — yes: design/spec work stays in this Project space (canonical), coding happens in Claude Code against the repo on Michael's machine. Rather than drafting a full CLAUDE.md blind, drafted only the **project-conventions block** (spec canonicity, Legal Rule Registry discipline incl. the unverified-2025-legislation rule, data hygiene for privileged data, build sequence with Phase 1a as current target and 1b gated, working style). Structural half comes from Claude Code's `/init` reading the real tree; conventions block wins on conflicts of discipline, generated half wins on paths/commands.

**Decisions:**
- Repo goes under git before any Claude Code session edits it (first task).
- Spec snapshots committed under `docs/specs/`; coding sessions read but never rewrite them — build-revealed spec issues go to `docs/spec-feedback.md` and come back here.
- No real client data ever committed; Citizens MRF fixture referenced by local path, not committed.
- Project-knowledge housekeeping: the six docs formerly grouped in the "claude" folder are re-uploaded as individual files (folder grouping blocked single-file replacement); session log consolidated to this single file.

**Open (for Michael, parked in the block's footer comment):** (1) local-only vs. private GitHub — private GitHub recommended; (2) confirm the committed spec list; (3) record the MRF local path in the generated CLAUDE.md half.

**Next:** Michael: git init + commit code, specs, and conventions block → run `/init` in Claude Code → merge. Then (unchanged) v0.1 feedback, then Phase 1a build in Claude Code.

---

## 2026-07-22 (billing module decisions + MRF dry run COMPLETED)

**What happened:** Worked through the billing-module synthesis doc's Part 6 decision queue and Part 8 discussion items with Michael — all resolved. Ran the Citizens Medical Center MRF dry run **to completion**: remote fetches first hit a stale cached v2.0.0 copy; Michael then downloaded the live 55 MB file (chat upload timed out — worked around by zipping it and staging via the desktop folder bridge from his Downloads folder), and the full per-code analysis ran on the real file.

**Decisions:**
- All eight decision-queue defaults ACCEPTED, with refinements: Phase 1 reports lead with billed-to-Medicare ratios; only CONFIRMED AnalysisRuns feed settlement/lien math; paralegal flip at multi-user is manual per-workflow; OPPS Addendum B noted as Phase 2 outpatient-facility fallback. Details: synthesis doc Part 6.
- **Legal Rule Registry PROMOTED to system-wide core infrastructure now** — project instructions §2 updated; banked feature #13 (citation-currency alerts) folded in.
- **Billing-module Phase 1a is the SECOND vertical slice** (after Michael's v0.1 feedback). Phase 1 split into 1a (deterministic — minimal Medical tab, manual/assisted line-item entry, chargemaster fuzzy match, Medicare PFS benchmarks, report generator) and 1b (local-AI PDF ingestion, gated on the GPU arm).

**Dry-run outcome (`claude/citizens-mrf-dry-run.md`, v2):** Citizens' current file is **CMS v3.0.0, dated 2026-05-11, attested, with BCBS negotiated dollar rates for the exact exercise codes** (70450 CT head: $487.55 BCBS PPO outpatient vs $3,166 gross); median/percentile columns essentially unpopulated (5 of ~33k rows) → usable evidence tier = negotiated dollar, not attested median. Facility rates ran 4–10× the professional-schedule estimate from the original exercise (claim-type disclaimer empirically vindicated) while still ~20–50% of billed. Anomalies found and specced into the Phase 2 loader: setting-split rates, above-gross outpatient ED E/M rates, CPT reuse across chargemaster lines, stale CDN caching, defective CMS TXT indicator. The Citizens file is the Phase 2 reference fixture (copy staged this session; Michael has the original in Downloads).

**Docs updated:** `claude/medical-billing-analysis-module-synthesis.md` (v2.1 — decisions + dry-run corrections), `case-management-project-instructions.md` (registry promotion, second slice, billing hooks), `claude/citizens-mrf-dry-run.md` (v2, completed).

**Next:** (1) Michael runs slice v0.1 + feedback; (2) billing Phase 1a build chat (re-attach current codebase first); (3) registry verification items remain open per synthesis Part 7 — attorney sign-off required, incl. the new sub-question whether an attested v3.0.0 file with empty median columns is compliant.

---

## 2026-07-22

**What happened:** Michael asked whether Claude uses "Memory" in this project, prompting a discussion of Anthropic's memory tool (a client-side API feature for developers) versus what's actually available here — the Project's persistent docs. Set up this session log as the practical equivalent. Discussed reliability (a new session isn't guaranteed to check/update it — it's instruction-driven, not automatic) and token cost of making that more reliable. Decided against backfilling history from old chats (not worth it — `case-management-project-instructions.md` already captures the substance, and old chat transcripts aren't accessible to a session anyway). Added a short pointer line to the top of `case-management-project-instructions.md` referencing this log, to raise the odds a session checks it (that doc already gets read reliably every session) without merging the log's growing content into it (which would add token cost to every read).

**Decisions:**
- This log lives at `claude/session-log.md`, is checked at the start of relevant sessions, and updated at the end of substantive ones.
- It complements, not replaces, `case-management-project-instructions.md` as the master spec.
- `case-management-project-instructions.md` now carries a one-line pointer to this log (added under its opening paragraph) rather than having log entries merged into it — keeps the reliability benefit without the token cost of the log's history being re-read every time the instructions doc is read.
- No backfill of past chat history into this log — start clean from today; pull forward specific gaps only if they surface later.

**Note:** mid-edit, a `project_write` to `case-management-project-instructions.md` accidentally replaced the full document with just the new opening lines (project_write overwrites the whole doc, not a patch) — caught immediately and restored from the content still held in context. No data lost, but a reminder that edits to that doc need the complete file resent each time, not a snippet.

**Next:** No open build item from this conversation. Resume from `case-management-project-instructions.md` §14 "Open action items" for the actual case-management-software build status (vertical slice v0.1 awaiting Michael's feedback; three Bar consult items pending; etc.).

---
