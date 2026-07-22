# Project Conventions (merge into CLAUDE.md)

<!-- This block carries the design-space discipline that lives in the Claude
Project docs, not in the code. Merge it into the CLAUDE.md that /init
generates from the repo tree. If anything here conflicts with what /init
inferred from the code, THIS BLOCK WINS on conventions; the generated
half wins on file paths, scripts, and structure. -->

## What this is

A case management suite for a Texas personal injury / civil litigation /
criminal law practice. Database-centric: React + TypeScript front-end,
data-adapter layer with a localStorage demo mode and a Supabase/Postgres
adapter (`db/schema.sql`), activated via `.env`. Built incrementally in
vertical slices. Slice v0.1 (Case overview + Parties) is delivered; the
second slice is the medical billing analysis module, Phase 1a.

The user (Michael) is an attorney, not a developer. Claude does the heavy
lifting; Michael directs, reviews, and decides. Readability for Michael is
secondary to build speed and quality — but decisions still route through him.

## Spec canonicity — do not edit specs here

Design and specification are done in the Claude.ai Project space, not in
coding sessions. The spec documents committed under `docs/specs/` are
**snapshots** of that canonical source:

- `case-management-project-instructions.md` — master spec (data model,
  decisions, build sequence)
- `medical-billing-analysis-module-synthesis.md` — billing module spec
  (Phase 1a is the current build target)
- `pi-case-playbooks.md`, `criminal-offense-playbooks.md` — playbook engines
- `transcript-workflows.md`, `plea-hearing-eligibility-reminder.md`,
  `citizens-mrf-dry-run.md` — subsystem specs and reference findings

**Read them; never rewrite them in a coding session.** If the build reveals
a spec problem, note it in a `docs/spec-feedback.md` file for Michael to
take back to the design space. Refreshed snapshots come from there.

## Legal Rule Registry discipline (BINDING, system-wide)

Every legal proposition any module relies on (statute, case, rule) must be
an entry in the Legal Rule Registry: cite, plain-language statement, scope,
status (unverified / verified / watch), last-verified date, verified-by,
watch flags. Entity definition: synthesis doc, Part 4. Rules:

1. **No legal rule is hard-coded while its registry status is unverified.**
   Unverified rules may exist in the registry and drive warnings/placeholders,
   never computed legal outcomes.
2. **A model asserting legal currency never counts as verification.**
   Verified status requires attorney sign-off (Michael). Claude must never
   set a rule to verified.
3. **Every computed output stamps the registry versions it relied on.**
4. All 2025 Texas legislation referenced in the playbook docs is from
   pre-/immediately-post-session snapshots and is **unverified** until
   post-session confirmation — deadline rules from it must not be hard-coded.
   (Exception: the record-clearing statutes file already reflects the
   Sept. 1, 2025 amendments per the master spec.)

## Data hygiene (privileged legal data)

- **No real client data in this repo, ever.** Seed/demo data is fictional
  (v0.1's seeds are; keep it that way). No client documents, medical bills,
  EOBs, or case files get committed.
- The Citizens Medical Center MRF (public hospital pricing file, ~55 MB) is
  the Phase 2 reference fixture. Reference it by local path outside the repo;
  do not commit it.
- PHI-touching AI processing (transcription, bill/EOB ingestion) runs
  **locally** on Michael's GPU machine by design — this is a privilege/PHI
  posture, not a hosting shortcut. Do not introduce cloud AI processing of
  case documents without an explicit decision from Michael.
- A professional security review is required before multi-user / live use.
  Claude is not a substitute for it. Do not represent any build as
  production-ready for privileged data.

## Build sequence and current state

1. Data model — complete (master spec §§7–11).
2. Slice v0.1 (Case overview + Parties) — built, awaiting Michael's feedback.
   Incorporate his feedback before or alongside the next slice.
3. **Current target: billing module Phase 1a** — minimal Medical tab + bill
   ledger, manual/assisted line-item entry, deterministic chargemaster fuzzy
   matching, Medicare PFS benchmarks with ratio-led reporting (billed-to-
   Medicare ratios lead), EOB patient-responsibility field, internal report
   generator, ReviewLog/AnalysisRun entities, and the Legal Rule Registry as
   shared infrastructure. Only CONFIRMED AnalysisRuns may feed settlement/
   lien math. Phase 1b (local-AI PDF ingestion) is gated on the GPU arm —
   do not start it.
4. Then remaining tabs, with feedback each step. Integrations (OneDrive/
   Outlook via Microsoft Graph) come last.

## Working style

- Small, reviewable increments; commit early and often with plain-language
  messages Michael can follow.
- Decisions with legal, cost, data-model, or scope implications go to
  Michael — don't resolve them silently in code.
- Preserve the data-adapter architecture: everything must keep working in
  zero-setup localStorage demo mode as well as against Supabase.

<!-- DECISIONS FOR MICHAEL (resolve, then delete this comment):
1. Repo hosting: local-only vs. private GitHub. (Private GitHub recommended
   for code + specs; enables backup and GitHub integration.)
2. Confirm docs/specs/ snapshot list above matches what you actually commit.
3. Confirm the Citizens MRF's local path once chosen, and record it in the
   generated half of CLAUDE.md. -->
