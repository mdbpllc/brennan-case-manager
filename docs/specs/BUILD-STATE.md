# BUILD STATE — brennan-case-manager
Commit: 33b051d  |  Branch: master  |  Generated: 2026-07-26 (second refresh this date)

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

## 2026-07-26 session deltas (two Code sessions, BOTH DOCS ONLY — zero app change)
- Session-2 packet APPLIED: NEW prop-code-53-28-deadline-engine-design.md —
  full Servpro mechanic's-lien / prompt-pay deadline-engine design pass,
  ⛔ BUILD-GATED on an in-person Servpro staff meeting (L1–L7 are questions
  for that meeting; its §10 build sketch is NOT COMMITTED). §53.156 date
  error corrected in three places: may→shall was 2011 (S.B. 539), NOT
  2021. Fee-basis design: basis enum gains mandatory-equitable (Michael
  ruled "new value"; name is Claude's → O4); direction/conditionalDowngrade
  PROPOSED (O5); O1 CLOSED (ch. 28 fees discretionary, §28.005(b));
  18%/yr annualization removed (V11); §28.010 scope widened; §28.0091
  added. Review queue: §53.156 + ch. 28 moved to read; resume point now
  Est. Code §352.051. New open items V10–V13, L1–L7, D-A/B/C, O4/O5.
  Four law-change bills recorded in the design doc §9 (no canonical
  ledger file exists — see spec-feedback)
- Session-1 (verification pass) APPLIED earlier today: registry Entry 2
  REPLACED in place (redraft v2, post-Ortiz); Entries 4/5/10 folded
  (Ch. 55 findings, H.B. 4145 date-of-service applicability, IME line
  [READ]); draft Tanner service-diligence entry staged UNADOPTED (V6);
  fee-basis Rohrmoos FOUR proof elements corrected, contemporaneity badge
  RULED; NEW attorney-review-queue.md + registry-verification-pass doc.
  NO entry status changed either session — reading is not sign-off

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
- Time tracker: design draft only (amended twice 2026-07-26) — NOTHING
  exists in the app; the draft still awaits design-side adoption
- Servpro lien/prompt-pay deadline engine: DESIGN ONLY, build-gated on
  the Servpro meeting — NOTHING exists in the app; none of the P1–P6
  deadline primitives exist in code
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
- attorney-review-queue.md is the one project-wide review queue; statutes
  resume point now Est. Code §352.051, then the Family Code block
- Servpro deadline-engine doc awaits the in-person meeting (L1–L7);
  V10 citator pass and L0/L1 can proceed independently before it
- FLP/CourtListener account + Tier 1 + MCP connector — promo ends
  2026-08-06 (ELEVEN days out; carried on 8+ consecutive entries)
- EXPORT NEEDED: Go_Live_Gates gates 1–5 verbatim (+ gate-3 amendment);
  session-1 heartbeat voice capture (never reached Code)
- FOLD PENDING: captures e + f into case-heartbeat-design.md §8
- D3/H8 still blocks T1 for heartbeat AND time tracker; Entry 1(c-3) +
  V4 still gate billing LOP math and the disbursement checklist
- No canonical law-change ledger file exists (third "ledger family"
  reference now); design decision flagged in spec-feedback
- Registry sign-offs, Supabase auth (gate 6), edge-function deploys,
  Entra registration, Citizens MRF path, reseed-survival question — all
  carried
- Statute design-doc snapshot still lags project knowledge (spec-feedback)
