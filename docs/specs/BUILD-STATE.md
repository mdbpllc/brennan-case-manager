# BUILD STATE — brennan-case-manager
Commit: 7d81c8c  |  Branch: master  |  Generated: 2026-07-25 (sixth refresh this date)

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

## 2026-07-25 session deltas (six sessions this date)
- Heartbeat handoff f APPLIED (sixth session, DOCS ONLY — zero app change):
  capture f placed (deposition no-dates ladder, mediation in full, DCO
  ingester + software-wide audit log + mediator roster specified, expert
  cadence); APIL 2025 course-book mining pass 1 placed (every proposition
  UNVERIFIED; course-book PDF stays OUT of the repo — copyrighted,
  single-user license); session-log entry appended; "Follint" → "Foland"
  corrected in capture d + design doc §8.10; design doc's stale resume
  point corrected in place (§8.12 now carries the two-capture fold-queue
  notice; register range H1–H58). NOTHING entered the build queue —
  D3/H8 still gates T1, including the three sub-modules named this session
- Heartbeat handoff e APPLIED (fifth, DOCS ONLY): capture e placed;
  H28 RULED IN, H31 RULED (warm), H32 CLOSED both branches; Rule 239a
  March-2026 change flag added to the TRCP skeleton §8
- Heartbeat handoffs b+c+d ROUTED (third/fourth, DOCS ONLY): design doc
  (DESIGN-PARTIAL, unadopted), TRCP skeleton (UNVERIFIED candidates),
  captures b–d; design doc folded through §8.11 answer-received
- Medical walkthrough defects fixed + audit triage built (first/second
  handoffs): schedule selection + demo-placeholder banners, reseed
  carry-forward + versioned backup, classification editable post-creation
  with review log, declared status ladders, adapter patch guard
- Sync-scope ruling recorded in CLAUDE.md (src/ + db/schema.sql + docs/ +
  CLAUDE.md + README.md synced; lockfile/node_modules/dist/pilot-JSON out)

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
  watch_targets, tracked_bills, bill_statute_refs (no schema changes
  this date — new run fields ride existing jsonb columns)
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
- Time tracker: design draft only — NOTHING exists in the app
- Case heartbeat: design docs only (DESIGN-PARTIAL, §10 unruled) —
  NOTHING exists in the app; walked through mediation/expert cadence
  (captures b–f; e and f NOT folded — design doc §8.12 carries the
  fold-queue notice); register runs H1–H58 (doc's §11 stops at H34);
  resume point: APIL mining PASS 2; H50 (supplementation opt-out: dead
  vs dormant) is OPEN — neither model is decided; TRCP skeleton and ALL
  course-book propositions UNVERIFIED; deficiency submodule parked (H35)
- docs/specs/Go_Live_Gates.md holds gates 6–8 verbatim; GATES 1–5 ARE A
  PLACEHOLDER — their text exists only in project knowledge (spec-feedback)

## For design side
- EXPORT NEEDED: Go_Live_Gates gates 1–5 verbatim (+ gate-3 amendment)
- EXPORT NEEDED: session-1 heartbeat voice capture (design doc's named
  source of record; never reached Code; see spec-feedback)
- FOLD PENDING (two captures deep): captures e + f into
  case-heartbeat-design.md §8 + register extension H35–H58
- FLP/CourtListener account + MCP connector setup — promo ends
  2026-08-06 (twelve days out; carried on five consecutive entries)
- Open question: should chargemaster memory + generated documents also
  carry across reseeds?
- Registry sign-offs (incl. entries 1–10 + course-book candidates),
  Supabase auth decision (gate 6), edge-function deploys, Entra
  registration, Citizens MRF path — all carried
- Statute design-doc snapshot still lags project knowledge (spec-feedback)
