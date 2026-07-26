# Go-Live Gates — brennan-case-manager

**Purpose:** the locked-in list of things that MUST happen before live mode runs with real client data. Any session moving the app toward live use must check this doc and surface unmet gates to Michael.

**Created:** 2026-07-25 (Supabase provisioning session). Append gates; don't silently remove.

**Status:** repo-canonical at `docs/specs/Go_Live_Gates.md`. Gates 1–5 imported verbatim (redacted) 2026-07-26 from the pre-migration packet, base commit `85c13af`; gates 6–8 routed 2026-07-25. CLAUDE.md carries the binding pointer.

> **Provenance.** This document originated as a design-space-only project-knowledge upload.
> Gates 6–8 were routed into the repo 2026-07-25 (design handoff, Item 0); gates 1–5 and the
> account/API facts arrived 2026-07-26 via the pre-migration packet, closing the
> `docs/spec-feedback.md` export flag. The LegiScan key value is deliberately REDACTED here;
> the full-value copy remains in the archive project's version of this doc.

## Gates

1. **Upgrade Supabase to Pro ($25/mo) — LOCKED IN per Michael, 2026-07-25.** The free tier has no automatic backups and pauses after inactivity; neither is acceptable once real case data exists. Trigger: *before* the first real client record enters the database — not after. Pro brings daily backups, no pausing, 8 GB database. Claude: raise this explicitly and unprompted in any session where live mode / real-data migration is being wired.
2. **Professional security review** before multi-user / live use (existing binding rule, CLAUDE.md — Claude is not a substitute for it).
3. **RLS policies written and tested** for every exposed table (project was provisioned 2026-07-25 with automatic RLS on + auto-expose off; default-deny until policies exist). *See gate 6 — policies cannot be meaningfully tested until a sign-in flow exists.*
4. **LegiScan API key** in Supabase edge-function secrets (`LEGISCAN_API_KEY`), never in the repo; rotate after any chat-transcript exposure.
5. **No real client data in the repo or demo fixtures** (existing binding rule — fixtures stay fictional; statute text is the public-domain exception).

## Gates 6–8 (appended 2026-07-25)

**6. Authentication / sign-in flow — HARD PREREQUISITE TO GATE 3.**
The schema's RLS policies admit only signed-in (`authenticated`) users, and the app has no
sign-in screen. Supabase mode will connect and then refuse every query. Gate 3 ("RLS
policies written and tested") reads as satisfiable without noticing there is currently no
way to authenticate anyone — this gate exists to close that trap. Currently tracked only in
`docs/spec-feedback.md`; promoted here. Trigger: before any Supabase-mode use beyond
connectivity testing.

**7. Document storage + EOB source-document pin.**
There is no document storage anywhere in the app; EOB and report "links" are text
descriptions (BUILD-STATE, Known stubs & fakes). The billing spec requires the EOB
patient-responsibility figure to be a typed field **with a source-document pin, not a
number typed from memory**, because it is the statutory ceiling for a hospital lien under
the Ch. 146 analysis. Until pinning exists, the load-bearing input to the lien cap is
unverifiable. Trigger: before the first real EOB is entered, and before any AnalysisRun
computed on real data feeds lien math.

**8. Fee-schedule *selection* is correct and visible on every computed ratio.**
*(Narrowed from the earlier draft — see the correction note below.)* Per-line schedule
provenance **already exists and works**: the report's Cite column names the schedule, year,
code, and import row. What is missing is (a) correct schedule **selection** when more than
one schedule contains a code, (b) any warning at the moment the attorney reads a ratio
computed against a placeholder/demo table, and (c) survival of imported schedules and
confirmed runs across a store reseed. Required before real use: a ratio computed against a
`demo`-source schedule carries a visible placeholder banner; the chosen schedule is named
in the report headline, not only in the per-line cites; a reseed that would discard
imported rates or confirmed runs warns first. This is the estimates-not-adjudication
guardrail applied to its most load-bearing number. Trigger: before any AnalysisRun is
confirmed on a real bill.

**Correction note for the record:** the mid-session draft of gate 8 asked for
AnalysisRun-level schedule provenance to be built. That was a design-side misread —
provenance is already implemented per line. Do not rebuild it.

## Supabase account facts (for future sessions)

- Account created 2026-07-25 via GitHub login (mdbpllc identity), free tier.
- Project security posture at creation: Data API on, auto-expose new tables OFF, automatic RLS ON.
- While the app is in localStorage demo mode the free project generates no traffic and will pause after ~1 week idle — one-click restore in the dashboard, nothing lost.

## LegiScan API facts (for future sessions, esp. the T3 build)

- Key issued 2026-07-24, Public API tier (free, 30,000 queries/month, resets on the 1st), never expires. Single-key rule: creating a second Public key gets ALL keys revoked — this one key is used everywhere (Supabase secret + build-session validation).
- Key value: `[REDACTED — lives in Supabase secret LEGISCAN_API_KEY; full-value copy remains in the archive project's version of this doc]` — recorded here for build-session convenience with Michael's knowledge (low-sensitivity: read-only public data, no billing attached). **Plan of record: Michael rotates the key on legiscan.com/legiscan after the T3 build completes; whoever rotates it must update the Supabase secret AND this doc.** Permanent home is the Supabase secret `LEGISCAN_API_KEY`. Secret value verified against Supabase digest (SHA-256 match) 2026-07-25.
- **Key LIVE-VALIDATED 2026-07-25** via getSessionList&state=TX run from Michael's browser: `"status":"OK"`, 23 Texas sessions returned, archive back to the 81st Legislature (2009).
- **Confirmed Texas session IDs (from live response):**
  - `2160` — 89th Legislature Regular Session (2025–2026), sine_die=1, prior=0 → **the current session; the poller's anchor** until the 90th appears. dataset_hash `013fb4b2f07161ac13187f78af58d5ae`.
  - `2221` — 89th 1st Special (2025), sine_die. `2223` — 89th 2nd Special (2025), sine_die. Both prior=1; two 2025 specials exist and their enacted bills are part of the 2025 law-change picture.
  - Prior regulars for historical pulls: 2003 (88th), 1776 (87th), 1611 (86th), 1429 (85th), 1115 (84th), 985 (83rd), 108 (82nd), 75 (81st).
- Poller note: no active/unadjourned TX session as of 2026-07-25 (interim period, consistent with design §5 cadence). New sessions (90th regular ~Jan 2027, any specials) will appear in getSessionList — the poller should diff the session list itself on its periodic runs.
- Survey/registration on file describes: commercial, internal-use-only, Texas-only, narrow bill volume (watch-list driven), hash-driven cache-first query strategy ~1–3k queries/month, custom TypeScript client via Supabase Edge Functions, AI-assisted development disclosed, CC BY 4.0 attribution in-app. The implementation must match these representations (design doc §4 B4 hard requirements).
- Crash-course suspension triggers to honor in code: no legiscan.com scraping; no duplicate keys; always check `dataset_hash` before dataset downloads; use `change_hash` everywhere; download each document blob once.
- Note: api.legiscan.com is not reachable from Claude cloud-sandbox WebFetch (robots.txt fetch fails); validation calls run via Michael's browser or the deployed edge functions. Claude-in-Chrome extension not installed on Michael's machine as of 2026-07-25.
