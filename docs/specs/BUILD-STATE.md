# BUILD STATE — brennan-case-manager
Commit: 9dc280f  |  Branch: master  |  Generated: 2026-07-25

## Screens live (what Michael can click)
- /cases — case list; compact statute-worklist card (the de facto dashboard)
- /cases/new — new-case form (case types, file numbers auto-assigned)
- /cases/new/oaa — OAA order upload → draft review → Create Matter; charges
  created as child records
- /cases/:id — case detail, five tabs (table below)
- /inbox — transcript staging inbox: manual upload/import, routing engine
  suggestions with confidence, confirm-to-file (auto-file OFF per design D1)
- /notes — office notes (verified end-to-end 2026-07-25); per-transcript
  detail view with participants and tags
- /parties — directory + new/edit forms, masked phones, combobox pickers
- /benchmarks — Medicare PFS CSV import (source files live in ..\data\pfs\,
  outside the repo)
- /rules — Legal Rule Registry: entries, attorney-only verify, review log,
  watch flags, full statute-worklist card (due-now vs upcoming;
  section-removed rules listed first)
- /statutes — exact-cite box + code→chapter browse picker + all-words
  keyword search; /statutes/:code/:chapter viewer with deep links,
  Mark-verified pins, refresh-and-diff (A4 tripwire: text-changed +
  section-removed flags; re-verify clears both)
- /bills — bill tracking: watch targets (registry auto-sync + manual
  sweeps), tracked bills with B3 lifecycle, statute-ref matcher

## Case detail tabs
| Tab | Status | Notes |
|---|---|---|
| Overview | LIVE | editable core fields; file number auto-assigned |
| Parties | LIVE | link/unlink with role registry |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping with confidence badges, coding audit, claim-type detection, PFS benchmark ratios, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE (local only) | event CRUD works; Outlook push code present but never exercised — see stubs |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## Data layer
- Adapters working: local (localStorage demo) AND supabase; UI talks only
  to the DataAdapter interface — every feature works in both modes
- Default mode: demo localStorage, fictional seeds; store reseeds on
  version bump (currently v9) — PFS CSV needs re-import after a reseed
- Schema tables live (db/schema.sql, 32): file_counters, cases, parties,
  case_parties, medical_bills, bill_line_items, code_mappings, eob_records,
  provider_billing_profiles, analysis_runs, analysis_result_lines,
  review_log, legal_rules, fee_schedules, fee_schedule_rates,
  generated_documents, calendar_events, transcripts,
  transcript_participants, staging_items, routing_decisions,
  glossary_terms, tag_templates, charges, oaa_intakes, statute_chapters,
  statute_sections, registry_verification_snapshots, watch_flags,
  watch_targets, tracked_bills, bill_statute_refs
- Health: 177 vitest tests green; npm run build (tsc + vite) and oxlint
  clean at the stated commit

## Known stubs & fakes
- Bill tracking "Demo poll" buttons replay FICTIONAL fixtures. The
  legiscan-poller edge function is written but NOT deployed — no live
  legislative data has ever entered the app
- statute-fetch edge function likewise written but NOT deployed — the
  Statutes live-refresh path is unexercised against the real .gov site;
  demo chapters come from committed fixtures
- Calendar "Connect Outlook" is dead until Michael's Entra app
  registration exists (VITE_MSAL_* unset); events save locally and the
  push queue shows pending — nothing has ever reached Outlook
- Inbox has NO automatic ingestion: the T3 local transcription pipeline
  is not built (GPU-gated); items arrive only by manual upload/import
- Medical has NO PDF/bill ingestion (Phase 1b GPU-gated) — every line
  item is typed in by hand
- OAA intake parses digital Uvalde-layout orders only; scanned or
  handwritten packets fall back to manual entry (Tier 2 GPU-gated)
- Demo-mode PFS benchmark seed is a placeholder rate table — real ratios
  require the CSV import on Benchmarks
- Time tracker: design draft only — NOTHING exists in the app
- No document storage anywhere — EOB/report "links" are text descriptions

## Changed since last snapshot
- First snapshot in this template (predecessor: prose build-state.md as of
  c92278f); deltas since then:
- 6d8bfd8 Design-side visibility: build-state.md snapshot + end-of-session
  push convention
- 5087899 Build-state bridge: adopt BUILD-STATE template convention,
  single-source status in CLAUDE.md
- 9dc280f Strip build-status claims from master spec + README (docs only,
  no app change)

## For design side
- Time-tracker draft awaits Michael's §8 rulings + §7 registry sign-offs;
  not in the build queue until he rules
- Both edge-function deploys are one CLI step each
  (docs/statute-cache-setup.md); invoke the poller once manually on first
  deploy and read its JSON log
- Entra app registration still pending for Outlook push
  (docs/outlook-setup.md)
- Citizens MRF local path still undecided — goes into CLAUDE.md when chosen
- Repo snapshot of the statute design doc lags project knowledge
  (spec-feedback 2026-07-25) — export a fresh copy next design pass
