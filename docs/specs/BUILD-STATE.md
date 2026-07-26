# BUILD STATE — brennan-case-manager
Commit: 84b34be  |  Branch: master  |  Generated: 2026-07-25 (fourth refresh this date)

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
| Overview | LIVE | all core fields editable INCLUDING practice area, case type, PI overlay flags, commercial-policy, representation type (07-25 audit item 2); classification changes review-logged + "re-evaluate playbooks" notice; "Style" label |
| Parties | LIVE | link/unlink with role registry; bulk party fetch |
| Medical | LIVE | bill ledger → per-bill workspace: manual line items, fuzzy CPT mapping, coding audit, claim-type detection, PFS benchmark ratios with per-run schedule choice + demo-placeholder banners, EOB typed field, analysis runs (only CONFIRMED feed settlement math), report generator |
| Calendar | LIVE (local only) | event CRUD works; Outlook push code present but never exercised — see stubs |
| Transcripts | LIVE | filed transcripts for the case; detail view |

## 2026-07-25 session deltas (four sessions this date)
- Heartbeat handoff d APPLIED (fourth session, DOCS ONLY — zero app
  change): capture d placed; design doc folded Code-side per the
  PUSH-TO-CODE work order — §8.10 suit filed / service chase (from
  captures c+d; handoff c's deferred fold never happened, reconciled),
  §8.11 answer received, primitives 17–26, register H23–H34, H14 CLOSED
- Heartbeat handoffs b+c ROUTED (third session, DOCS ONLY — zero app
  change): case-heartbeat-design.md (DESIGN-PARTIAL, unadopted),
  trcp-deadline-skeleton-2026-03-01.md (UNVERIFIED registry candidates),
  walkthrough captures b + c (raw); session-log entries for design
  sessions 2 + 3 appended. Nothing entered the build queue.
- Medical walkthrough defects fixed (first handoff): schedule selection
  (demo can't shadow imports; per-run choice; selection stamped on run),
  demo-placeholder banners, reseed carry-forward + versioned backup,
  excluded-dollars disclosure, registry stamps split implicated/background,
  scenario-inversion explainer, Caption→Style
- Audit triage built (second handoff): classification editable post-creation
  with review log + re-evaluation notice; status ladders DECLARED per case
  type (statusesFor throws on undeclared — no silent fall-through; UI shows
  "Unknown case type" warning); explicit itemLabels on all repeating fields;
  updateParty throws on unsupported patch keys in BOTH adapters
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
  clean as of 88ff3e7 (commits since are docs-only)

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
- Demo PFS schedule is fictional; real ratios need the CSV import — it
  can no longer silently shadow imported data, and demo-priced ratios
  carry placeholder banners everywhere they render
- Playbook engine NOT built — classification edits show a "re-evaluate
  playbooks" notice; nothing recomputes automatically yet
- Attorney-created code mappings and generated documents do NOT survive a
  store reseed (open question for design — migration scope was schedules
  + confirmed runs)
- Time tracker: design draft only — NOTHING exists in the app
- Case heartbeat: design docs only (DESIGN-PARTIAL, §10 unruled; stage
  catalog now walked through answer received, H14 closed) — NOTHING
  exists in the app; TRCP skeleton entries all UNVERIFIED
- docs/specs/Go_Live_Gates.md holds gates 6–8 verbatim; GATES 1–5 ARE A
  PLACEHOLDER — their text exists only in project knowledge (spec-feedback)

## For design side
- EXPORT NEEDED: Go_Live_Gates gates 1–5 verbatim (+ gate-3 amendment)
- EXPORT NEEDED: session-1 heartbeat voice capture
  (case-heartbeat-voice-capture-2026-07-25.md — the design doc's named
  source of record; never reached Code; see spec-feedback). Handoffs b+c
  are otherwise fully applied — captures b/c, design doc, TRCP skeleton
  all in docs/specs/; the superseded suit-filed addendum was NOT routed
- Open question: should chargemaster memory + generated documents also
  carry across reseeds?
- Registry sign-offs, Supabase auth decision (gate 6), edge-function
  deploys, Entra registration, Citizens MRF path — all carried
- Statute design-doc snapshot still lags project knowledge (spec-feedback)
