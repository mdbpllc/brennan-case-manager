# BUILD STATE — brennan-case-manager
Commit: 0d9cdf4  |  Branch: master  |  Generated: 2026-07-26 (fourth refresh this date)

## Screens live (what Michael can click)
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges
  created as child records
- /cases/:id — case detail; tabs are URL-driven routes
  (/cases/:id/{parties,medical,calendar,transcripts})
- /inbox — transcript staging inbox: manual upload/import, routing engine
  suggestions with confidence, confirm-to-file (auto-file OFF per design D1)
- /notes — office notes; per-transcript detail view with participants/tags
- /parties — directory + new/edit forms, masked phones, combobox pickers
- /benchmarks — Medicare PFS CSV import (source files live in ..\data\pfs\,
  outside the repo)
- /rules — Legal Rule Registry: entries, attorney-only verify, review log,
  watch flags, full statute-worklist card
- /statutes — cite box + browse picker + keyword search; chapter viewer
  with deep links, Mark-verified pins, refresh-and-diff (A4 tripwire)
- /bills — bill tracking: watch targets, tracked bills with B3 lifecycle,
  statute-ref matcher

## Case detail tabs
| Tab | Status | Notes |
|---|---|---|
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type; classification changes review-logged + "re-evaluate playbooks" notice |
| Parties | LIVE | link/unlink with role registry; bulk party fetch |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE (local only) | event CRUD works; Outlook push code present but never exercised — see stubs |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## 2026-07-26 session deltas (four Code sessions, ALL DOCS ONLY — zero app change)
- Session-4 packet APPLIED: docs/authority/case-authority-index.md
  REPLACED IN FULL with a locator-only manifest — NO holdings or
  propositions; the registry doc governs on any conflict; do not add
  propositional content back. Flag A-3 WITHDRAWN (Huntress BELONGS —
  registry Entry 1(d) governs); A-6 added (registry dropped McMillan
  from Entry 1 — not paid-or-incurred authority); A-7 added (Primoris
  settled/withdrawn-opinion posture). Known gap recorded: Ortiz v.
  Nelapatla has no PDF on file; §18.001 lookups route to registry
  Entry 2. No copy of the old propositional version survives
- Session-3 packet APPLIED (project-knowledge capacity): NEW
  docs/project-knowledge-working-set-policy.md — working-set rule,
  pinned list, pruning runbook (steps 3–5 PROPOSED, Michael executes;
  Code cannot touch project knowledge). CLAUDE.md pointer added.
  VERIFIED: both claude_v0_1-feedback.md items are built (phone masking
  src/domain/phone.ts+components; Combobox src/components/Combobox.tsx)
  — runbook steps 1–2 safe. docs/authority/pdf/ staged for the PDFs.
  (Its propositional authority index was superseded by Session-4)
- Session-2 packet APPLIED: NEW prop-code-53-28-deadline-engine-design.md,
  ⛔ BUILD-GATED on the Servpro staff meeting (L1–L7; §10 sketch NOT
  COMMITTED). §53.156 date corrected in three places: may→shall was 2011
  (S.B. 539), NOT 2021. Fee-basis: enum gains mandatory-equitable (name
  unruled → O4); O1 CLOSED (ch. 28 fees discretionary); 18%/yr
  annualization removed (V11). Review queue resume: Est. Code §352.051
- Session-1 (verification pass) APPLIED: registry Entry 2 REPLACED (v2,
  post-Ortiz); Entries 4/5/10 folded; Tanner draft staged UNADOPTED (V6);
  Rohrmoos FOUR proof elements corrected, contemporaneity badge RULED;
  NEW attorney-review-queue.md. NO entry status changed any session

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only
  to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9;
  version-bump reseeds migrate imported schedules + confirmed runs and
  back up the whole old store (no more silent wipes)
- Schema tables live (db/schema.sql, 32): file_counters, cases, parties,
  case_parties, medical_bills, bill_line_items, code_mappings, eob_records,
  provider_billing_profiles, analysis_runs, analysis_result_lines,
  review_log, legal_rules, fee_schedules, fee_schedule_rates,
  generated_documents, calendar_events, transcripts,
  transcript_participants, staging_items, routing_decisions,
  glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters,
  statute_sections, registry_verification_snapshots, watch_flags,
  watch_targets, tracked_bills, bill_statute_refs (no schema changes)
- Health: 186 vitest tests green; npm run build (tsc + vite) and oxlint
  clean as of 88ff3e7 (every commit since is docs-only)

## Known stubs & fakes
- legiscan-poller + statute-fetch edge functions written, NOT deployed —
  no live legislative/statute fetches have ever run
- Calendar "Connect Outlook" dead until Michael's Entra registration
  (VITE_MSAL_* unset); nothing has ever reached Outlook
- Inbox has NO automatic ingestion (T3 GPU-gated); manual only
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document
  storage anywhere — EOB/report "links" are text descriptions
- OAA intake parses digital Uvalde-layout orders only; scans → manual
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built — classification edits show a "re-evaluate
  playbooks" notice; nothing recomputes automatically yet
- Attorney-created code mappings and generated documents do NOT survive a
  store reseed (open question for design)
- Time tracker: design draft only — NOTHING exists in the app; the draft
  still awaits design-side adoption
- Servpro lien/prompt-pay deadline engine: DESIGN ONLY, build-gated on
  the Servpro meeting — NOTHING in the app; no P1–P6 primitives in code
- Case heartbeat: design docs only (DESIGN-PARTIAL, §10 unruled) —
  NOTHING exists in the app; captures e and f NOT folded (§8.12 carries
  the fold-queue notice); register runs H1–H83; H50 OPEN; TRCP skeleton
  and ALL course-book propositions UNVERIFIED; deficiency parked (H35)
- Registry: ALL entries remain UNVERIFIED. Entries 2/4/5/10 + fee-basis
  items 5/6 substantially advanced 2026-07-26 (primary text read) but
  wording sign-off pending; Tanner draft UNADOPTED (V6); V1–V13 open
- docs/specs/Go_Live_Gates.md holds gates 6–8 verbatim; GATES 1–5 ARE A
  PLACEHOLDER — their text exists only in project knowledge (spec-feedback)

## For design side
- PRUNING: K-1 unblocked (delete McMillan _1 dup + v0.1 feedback now);
  K-2/K-3 (corpora to repo; second project) PROPOSED/OPEN; K-4 CLOSED
  (Huntress belongs); K-5 Uvalde scope check; K-6 re-pull N. Cypress
  559 S.W.3d 128; K-7 NEW — add Ortiz PDF to the collection?
- attorney-review-queue.md is the one project-wide review queue; statutes
  resume point Est. Code §352.051, then the Family Code block
- Servpro deadline-engine doc awaits the in-person meeting (L1–L7)
- FLP/CourtListener account + Tier 1 + MCP connector — promo ends
  2026-08-06 (ELEVEN days out; carried on 9+ consecutive entries)
- EXPORT NEEDED: Go_Live_Gates gates 1–5 verbatim (+ gate-3 amendment);
  session-1 heartbeat voice capture (never reached Code)
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8
- D3/H8 still blocks T1 for heartbeat AND time tracker; Entry 1(c-3) +
  V4 still gate billing LOP math and the disbursement checklist
- No canonical law-change ledger file exists (spec-feedback)
- Registry sign-offs, Supabase auth (gate 6), edge-function deploys,
  Entra registration, Citizens MRF path, reseed-survival question,
  statute design-doc snapshot lag — all carried
