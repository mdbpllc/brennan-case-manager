# BUILD STATE — brennan-case-manager
Commit: 72e63e3  |  Branch: master  |  Generated: 2026-07-26

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

## 2026-07-26 session delta (DOCS ONLY — zero app change)
- Verification-pass packet APPLIED: Michael read 8 opinions + 5 statutes
  design-side 2026-07-26; Code routed the yield. Registry file: Entry 2
  REPLACED in place (redraft v2, post-Ortiz — v1 was never routed;
  duplicate check run); Entries 4/5/10 folded (Ch. 55 full-chapter
  findings incl. EMS 800k ceiling + §55.007 release teeth; H.B. 4145
  date-of-service applicability, per-bill flag survives; IME line
  Sherwin-Williams/Auburn Creek/H.E.B. now [READ], 10(c) FLAGGED not
  rewritten); draft Tanner service-diligence entry staged at file end —
  UNADOPTED (V6), both candidate homes noted. Fee-basis design amended:
  Rohrmoos FOUR proof elements (was five — corrected), contemporaneity
  badge RULED (the session's only design ruling), §38.001/DTPA statutory
  findings folded — doc stays DRAFT, NOT adopted. NEW FILES:
  attorney-review-queue.md (project-wide review queue, WORKING CHECKLIST)
  and registry-verification-pass-2026-07-26.md (RAW CAPTURE). TRCP
  skeleton §9 points at both the queue doc and the Tanner draft.
  NO entry status changed — [READ]/[STATUTE] flags record reading only;
  wording sign-off has not occurred for any entry. New open items V1–V10
  (see the capture Part 5). NOTHING built.
- Prior date (2026-07-25, seven sessions): APIL mining passes 1–3 filed
  (register H1–H83; 27-chapter corrected map in pass 3 §0); heartbeat
  captures b–f placed; medical walkthrough defects fixed + audit triage
  built; sync-scope ruling recorded — see session-log for detail

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
- Inbox has NO automatic ingestion (T3 transcription GPU-gated); manual
  upload/import only
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document
  storage anywhere — EOB/report "links" are text descriptions
- OAA intake parses digital Uvalde-layout orders only; scans → manual
- Demo PFS schedule is fictional; real ratios need the CSV import
- Playbook engine NOT built — classification edits show a "re-evaluate
  playbooks" notice; nothing recomputes automatically yet
- Attorney-created code mappings and generated documents do NOT survive a
  store reseed (open question for design)
- Time tracker: design draft only (amended 2026-07-26) — NOTHING exists
  in the app; the draft itself is still awaiting design-side adoption
- Case heartbeat: design docs only (DESIGN-PARTIAL, §10 unruled) —
  NOTHING exists in the app; captures e and f NOT folded (§8.12 carries
  the fold-queue notice); register runs H1–H83; resume point: APIL
  mining PASS 4 for mining, Prop. Code §53.156 for the verification
  queue; H50 (supplementation opt-out) OPEN; TRCP skeleton and ALL
  course-book propositions UNVERIFIED; deficiency submodule parked (H35)
- Registry: ALL entries remain UNVERIFIED. Entries 2/4/5/10 substantially
  advanced 2026-07-26 (primary text read) but wording sign-off pending;
  Tanner draft entry UNADOPTED (V6); V1–V10 open
- docs/specs/Go_Live_Gates.md holds gates 6–8 verbatim; GATES 1–5 ARE A
  PLACEHOLDER — their text exists only in project knowledge (spec-feedback)

## For design side
- attorney-review-queue.md is now the one project-wide review queue
  (its §2 marks the verification resume point: Prop. Code §53.156)
- FLP/CourtListener account + MCP connector setup — promo ends
  2026-08-06 (ELEVEN days out; carried on 7+ consecutive entries)
- EXPORT NEEDED: Go_Live_Gates gates 1–5 verbatim (+ gate-3 amendment)
- EXPORT NEEDED: session-1 heartbeat voice capture (never reached Code)
- FOLD PENDING (two captures deep): captures e + f into
  case-heartbeat-design.md §8 + register extension H35–H58
- D3 (shared touch substrate) still blocks T1 for heartbeat AND time
  tracker; Entry 1(c-3) + V4 still gate billing LOP math and the
  disbursement checklist
- Open question: should chargemaster memory + generated documents also
  carry across reseeds?
- Registry sign-offs, Supabase auth decision (gate 6), edge-function
  deploys, Entra registration, Citizens MRF path — all carried
- Statute design-doc snapshot still lags project knowledge (spec-feedback)
