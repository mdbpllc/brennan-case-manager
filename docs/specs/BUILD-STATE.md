# BUILD STATE — brennan-case-manager
Commit: 3cb6769  |  Branch: master  |  Generated: 2026-07-25

## Screens live (what Michael can click)
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges
  created as child records
- /cases/:id — case detail, five tabs (table below)
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
| Overview | LIVE | editable core fields; "Style" label (was Caption, 07-25) |
| Parties | LIVE | link/unlink with role registry |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE (local only) | event CRUD works; Outlook push code present but never exercised — see stubs |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Medical analysis — 2026-07-25 walkthrough defects FIXED
- Schedule selection: auto mode excludes demo rates whenever a non-demo
  schedule has rates (demo can no longer shadow a real import); attorney
  can pick the schedule per run; every run stamps scheduleSelection
  (mode, used schedules, demoUsed) in its assumptions
- Demo visibility: PLACEHOLDER banner on demo-priced ratios in report,
  workspace notice, and run-row badges; report headline names the schedule
- Reseed guard: version-bump reseed backs up the whole old store to a
  versioned localStorage key and carries forward imported schedules +
  confirmed runs + result lines; demo schedule not re-seeded over real
  data (store version still v9 — no bump this session)
- Report: excluded dollars disclosed next to headline ("N lines / $X");
  registry block split Implicated / General background (implicated flag
  driven off claimType, billType, emergency signals); scenario-inversion
  explainer added
- Stale-marking, provisional/confirmed split, no-guessing all unchanged
  (regression targets from the walkthrough)

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only
  to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store version v9;
  reseeds now migrate (see above) instead of wiping attorney work
- Schema tables live (db/schema.sql, 32): file_counters, cases, parties,
  case_parties, medical_bills, bill_line_items, code_mappings, eob_records,
  provider_billing_profiles, analysis_runs, analysis_result_lines,
  review_log, legal_rules, fee_schedules, fee_schedule_rates,
  generated_documents, calendar_events, transcripts,
  transcript_participants, staging_items, routing_decisions,
  glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters,
  statute_sections, registry_verification_snapshots, watch_flags,
  watch_targets, tracked_bills, bill_statute_refs
  (new run fields ride existing jsonb columns — no schema change)
- Health: 183 vitest tests green (6 new: schedule selection + registry
  relevance); npm run build (tsc + vite) and oxlint clean at the stated
  commit; live-verified in the browser (demo-shadowing repro 3.23× → 3.61×
  after fix, matching the walkthrough numbers)

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
- Demo PFS schedule is fictional; real ratios need the CSV import — but
  it can no longer silently shadow imported data
- Time tracker: design draft only — NOTHING exists in the app
- docs/specs/Go_Live_Gates.md holds gates 6–8 verbatim; GATES 1–5 ARE A
  PLACEHOLDER — their text exists only in project knowledge (spec-feedback)

## Changed since last snapshot (9dc280f → stated commit)
- 82d88b1/83493b2 BUILD-STATE refresh + sync-diagnosis log entry
- Fee-schedule selection fix + walkthrough defect slate (handoff Items 3–8)
- Go_Live_Gates.md routed into repo (Items 0–1, gates 1–5 pending export)
- CLAUDE.md: verified-push + "click Sync now" reminder convention (Item 2);
  stale "no test runner" line corrected

## For design side
- EXPORT NEEDED: Go_Live_Gates gates 1–5 verbatim (+ gate-3 amendment) —
  see spec-feedback 2026-07-25
- Review the implicated-rule mapping (benchmark.ts) and gates placeholder
- Registry sign-offs, Supabase auth decision (gate 6), edge-function
  deploys, Entra registration, Citizens MRF path — all carried
- Statute design-doc snapshot still lags project knowledge (spec-feedback)
