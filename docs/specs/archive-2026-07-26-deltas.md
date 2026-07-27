# Archive — 2026-07-26 session deltas (moved out of BUILD-STATE)

**Status:** ARCHIVE. Not canonical, not a design doc, not in the build queue. This file exists so
`docs/specs/BUILD-STATE.md` can describe **live state only** while the day's settled history stays on the
record. Moved here 2026-07-26 per the design side's instruction: *"do not cut deeper; archive resolved items
rather than compressing live state."*

**Nothing in this file is a live claim about what is built.** Every item below is settled history. For what
exists in the app right now, read BUILD-STATE. For the reasoning behind any item, read the session-log entry
named beside it.

---

## 2026-07-26 — thirteen Code sessions, ZERO app change

Every commit on this date is documentation. No application code, schema, or migration was written or
authorized on 2026-07-26.

- **Est. Code ch. 352 + CPRC ch. 71 read in full** (#8) → NEW
  `statutes-pass-est352-cprc71-2026-07-26.md`. **Fee-basis enum DECOMPOSED** into a record (O6). The probate
  fee-basis row **reclassified** — it had been `discretionary-equitable`, wrong on both halves. §352.052 added
  (missing entirely). Probate export separates **three** lanes, not two (V14). NEW deadline primitive **P7**
  (calendar-months from a DATE — must not share code with P1's month-ordinal). §71.005 wrongful-death trial
  guardrail added to the playbooks; L10 confirmed against official text.
- **S-1 / PR-1 / PR-2 / V17 CLOSED** (#8, #15) — **probate is its own practice area** with its own ladder;
  the "companion" concept goes away. Spine = independent, uncontested administration; full build-out wanted.
- **D3/H8 CLOSED — the case-event core (CE), shape (c)** (#9): a shared spine (case, timestamp, actor,
  channel, note) plus per-consumer facets, ruled against **four** consumers, with an operational/evidentiary
  boundary where only evidentiary facets feed a sworn fee affidavit.
- **N-1 slice rename** (#9): the transcript **T1–T4 series is UNCHANGED**; the shared substrate is **CE1**;
  heartbeat slices are **HB1–HB4**; time-tracker slices are **TT1–TT2**.
- **CL-2 ruled IN** (#15): **the case owns the occurrence and liability; the CLIENT owns the damages.** The
  conflicts check is ADVISORY, not a gate. NEW `claimant-dimension-and-case-links-design.md` (DRAFT).
- **CLIENT MODEL COMPLETE — ten decisions closed** (#16, #17), all design-only, **nothing authorized**:
  entity renamed **`claimant` → `client`** plus a `posture` field (every case gets a client, civil and
  criminal); **practice-area profiles DERIVED** from the case with no per-client override — **the medical
  module belongs to the PI profile, not to cases generally**; case-level limitations **retire** in favor of a
  derived earliest; **per-expense tagging at entry, shared expenses split EVENLY** (pro rata rejected); shares
  **lock at disbursement**; **flag split** — Medicare/Medicaid = CLIENT, minor/incapacitated + the four
  occurrence flags + Death = FILE; single-client files render **unchanged**; `case_clients` sits **parallel**
  to `case_parties` (recorded as Claude's call, not Michael's).
- **PI HARD GATE NARROWED** (#17) — the PR-appointment gate blocks **only the deceased client**, not the whole
  matter. **No tolling is computed or inferred anywhere**, ruled out explicitly. Ruled design; the gate is not
  built, so no code changed.
- **D-CL2-9** (#17): CL-2 ships as its own slice, CE1 authorized separately afterward. Accepted cost — the
  case heartbeat and the time tracker stay parked until CL-2 is built and walked.
- **Record reconciliation** (#13): the three carried-file duplication checks re-verified (all three absent
  from the repo, so all three carries were warranted); **BUILD-SESSION-NOTES.md closed** — its 2026-07-25
  triage clearing stands and ~12 later carries were copy-forward artifacts; the stale "D3/H8 gates T1" line in
  the ch. 53/28 doc corrected.
- **`claude/` cite class fixed** (#15) across 8 docs. Two classes, not one: most hits pointed at files that
  **do** live in `docs/specs/` and were repointed; only the LegiScan fixture and the NVIDIA memo are genuinely
  project-knowledge-only and now say so without inventing a repo path. There is still no `claude/` directory
  in the repo.
- **Go_Live_Gates.md completed** (#5) — gates 1–5 folded in from the pre-migration packet with the LegiScan
  key value REDACTED; gates 1–8 now complete and binding.
- **Statute design doc forward-merged** (#5) from the project-knowledge copy, preserving the repo-side deltas;
  the repo version became current and the PK copy historical.
- **Migration to the new build project + selective sync** (#4, #6): `docs/`, `db/`, `supabase/`, `CLAUDE.md`,
  `README.md`, `BUILD-SESSION-NOTES.md`; **`src/` deliberately excluded**, which is what makes BUILD-STATE the
  design side's sole authority on build state.
- **QUEUE-RUNNER convention ADOPTED** (#7, Q-1/Q-2) — gitignored `inbox/` plus
  `docs/prompts/QUEUE-RUNNER.md`; `docs/prompts/` is the canonical home for cross-interface prompts.
- **Majority-opinion rule filed** (#7) — CLAUDE.md registry rule 5 and the CourtListener design doc §0.1:
  cluster IDs do not reliably resolve to the majority (the live *Haygood* near-miss returned the dissent).
- **CourtListener doc corrected** (#7) — free-tier rates 5/min, 50/hr, 125/day rolling (the hourly cap binds),
  measured Layer-B budget, parallel-cite caveat flagged for re-check, FLP-terms gate added.
- **FLP promo clock CLOSED** (#5) — not actionable per Michael; never carry it again.
- **Practice areas corrected to FOUR** (#12): PI / civil litigation / criminal defense / probate. Family law
  removed as a practice line the same day — doc-only, since Code verified no family furniture ever existed in
  `src/` or `db/`.
- **Q-3 / Q-4 struck** (#13) — `docs/prompts/` is indexed and inside the sync selection.
