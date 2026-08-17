# Go-Live Runbook — brennan-case-manager

**Status: POINTER CHECKLIST — PROPOSED.** This document **rules nothing, restates nothing, and
decides nothing.** `docs/specs/Go_Live_Gates.md` is the canonical and binding gates doc. Every row
below is a pointer into it. **Where this runbook and the gates doc differ, the gates doc governs and
this file is a defect.**

- **Canonical repo path (PROPOSED):** `docs/specs/go-live-runbook.md`
- **Generated:** 2026-08-16 (Central, per DT-1)
- **Read against:** `Go_Live_Gates.md` at `6ca9794` — 106 raw / 84 non-blank lines, read in full
- **Produced by:** CHAT-DISPATCH Task 18, design session, Opus 5, Cowork

## Read this before using the table

**There is no status column, deliberately.** Nothing here says whether a gate is met. Status lives in
`docs/specs/BUILD-STATE.md`, which is the only authority on what is built, and a status snapshot in a
second file is precisely the copy-forward failure this project has already had — a cleared item once
propagated across roughly a dozen entries on both sides before anyone checked (session log `#13`,
`R-3`). **Check BUILD-STATE for status. Use this file to know what to check and what counts as done.**

Several gates have had real work land against them since they were written. That is exactly why the
status question is routed elsewhere rather than answered here.

**Line numbers ARE given here, unlike in the session-log index.** The reasoning is not habit: the
gates doc **appends** (gates 6–8 appended 2026-07-25, gate 9 2026-07-28, GL-1 2026-08-11, the GH-1
tripwire 2026-08-12), so line numbers for existing gates are stable. The session log **prepends**, so
its line numbers shift on every entry and were omitted there.

---

## The gates

| Gate | Label | Who acts | Done-when evidence | Pointer |
|---|---|---|---|---|
| **1** | Supabase Pro upgrade | **Michael** (purchase). Claude must raise it unprompted in any live-mode/real-data session | Supabase dashboard shows the Pro plan active on the mdbpllc project, **before** the first real client record — not after | `Go_Live_Gates.md` §Gates, gate 1 (L17) |
| **2** | Professional security review | **Michael** (engages a professional). **Claude is not a substitute and cannot satisfy this** | A completed review by a named third party. **Read the 2026-08-11 clarification with the gate — it changes when this fires** | Gate 2 (L18) **+ clarification (L20) + GH-1 tripwire (L22)** |
| **3** | RLS policies written and tested, every exposed table | **Code** (writes and tests) | Every exposed table has a tested policy, **including the CD-1 slice's new tables** per GL-1 item (4). **Blocked by gate 6 — see the dependency note below** | Gate 3 (L24); dependency stated at gate 6 (L30) |
| **4** | LegiScan key in Supabase secret, never in repo; rotate after exposure | **Michael** (rotation on legiscan.com). Whoever rotates updates **both** the Supabase secret **and** the gates doc | Key absent from repo, present as `LEGISCAN_API_KEY`. Rotation after the T3 build is a firm plan of record (open item `M-4`) — **single-key rule applies, see the LegiScan facts section** | Gate 4 (L25); rotation + single-key rule at L96–97 |
| **5** | No real client data in repo or demo fixtures | **Every session, standing** | Fixtures fictional; statute text is the stated public-domain exception | Gate 5 (L26) |
| **6** | Authentication / sign-in flow — **HARD PREREQUISITE TO GATE 3** | **Code** (builds) | A sign-in path exists such that RLS policies can actually be exercised by an authenticated user. Trigger: before any Supabase-mode use beyond connectivity testing | Gate 6 (L30–36) |
| **7** | Document storage + EOB source-document pin | **Code** (builds) | The EOB patient-responsibility figure is a typed field **with a source-document pin**. Triggers: before the first real EOB, and before any AnalysisRun on real data feeds lien math | Gate 7 (L38–45) |
| **8** | Fee-schedule **selection** correct and visible on every computed ratio | **Code** (builds) | The three behaviours the gate names at (a), (b) and (c) each demonstrated. Trigger: before any AnalysisRun is confirmed on a real bill. **Read the correction note — per-line provenance already exists; do not rebuild it** | Gate 8 (L47–58) **+ correction note (L60–62)** |
| **9** | Production SMTP / email sender | **Michael** (configures custom SMTP on the firm's domain) | A custom sender on the firm's domain, not Supabase's built-in development sender. Trigger: **before the app is relied on for real work — not merely before real data** | Gate 9 (L66–73) |
| **T#1** | **Project-instructions revision, trigger #1** | **Michael** (pastes; Claude drafts — Claude cannot edit project instructions) | Revised instructions pasted **BEFORE the first real client record enters the database**, together with a re-check of every gate in this doc including gate 1 | Project instructions, "When to prompt Michael to UPDATE these instructions," trigger 1; required by GL-1 item (5) |

---

## GL-1 — the go-live floor (RULED 2026-08-11)

**Go-live means real case, party, client and SOL data entered by hand into the core app — nothing
more.** GL-1 is the definition; the five floor items are its own list. Pointer: `Go_Live_Gates.md`
L75–86, and session log `#53`.

| Floor item | What it points at |
|---|---|
| (1) | CD-1 directory build landed **and exercised** — `docs/specs/cd1-build-slice.md` |
| (2) | Gate 1 (Supabase Pro) |
| (3) | Gate 9 (production SMTP) |
| (4) | Gate 3 (RLS tested, **including the CD-1 slice's new tables**) |
| (5) | The gates re-check session **and the trigger-1 instructions revision** |

**Two exclusions GL-1 states explicitly, worth knowing so they are not treated as blockers:**

- **Gates 7 and 8 do not block this floor.** By their own trigger language they gate the first real
  EOB and the first real AnalysisRun. Billing-analysis use on real data is deferred until they pass.
- **The form engine is excluded from the floor.** Drafting continues via the drafting-disclosures
  skill; the engine arrives as an upgrade to a live system.

---

## Three traps in reading order

These are properties of the gates doc, not new rules. Each one is a place where reading a gate alone
gives the wrong answer.

1. **Gate 2 read alone is wrong.** Its text says *"multi-user / live use."* The 2026-08-11 ruling
   clarified that it gates the **multi-user phase** — solo live use by Michael proceeds without it.
   The gate's text **stands as written** per append-don't-rewrite, so the clarification two lines
   below it is load-bearing and a reader who stops at the gate will over-block themselves.
2. **Gate 3 read alone is wrong.** Gate 6 exists specifically because *"gate 3 reads as satisfiable
   without noticing there is currently no way to authenticate anyone."* Gate 6 is a hard prerequisite;
   the dependency is recorded at gate 6, not at gate 3, so it is invisible from gate 3's own text.
3. **Gate 9's trigger is a different shape from every other gate's.** The others fire on real *data*.
   Gate 9 fires on *reliance* — *"not merely before real data, since being locked out is an
   availability problem rather than a confidentiality one."* A go-live checklist ordered purely by
   "when does real data arrive" will schedule gate 9 too late.

---

## Open items

| ID | Item (full question text per QR-1) | Status |
|---|---|---|
| `GLR-1` | **GL-1 floor item (5) names "instructions v15," and the instructions are now v19.** GL-1 was ruled 2026-08-11, when v15 was the current version, and its floor item reads *"the gates re-check session and instructions v15 per trigger 1."* Trigger 1 is the go-live instructions revision, so the floor item almost certainly means *"do the trigger-1 revision against whatever version is current,"* not *"v15 specifically."* **But read literally, a future session could treat item (5) as already satisfied, because v15 exists** — and v15 was in fact produced by trigger 3 (CRIM DEFENSE + K-5), not trigger 1 at all. **Does Michael confirm that floor item (5) means the trigger-1 revision against the then-current version, whatever its number?** GL-1 stands as written either way — this asks how it is read, not that it be rewritten. | OPEN — for Michael |
| `GLR-2` | **Canonical path for this runbook — PROPOSED, unruled.** Staged at `docs/specs/go-live-runbook.md`, stable and unversioned, because the gates doc appends and this file must track it. **This is the same question as `TOC-3` and could be ruled once for both** — whether pointer/derived docs take stable paths while one-time passes keep the dated `<topic>-<YYYY-MM-DD>.md` convention. | PROPOSED — awaiting ruling |
| `GLR-3` | **What keeps this runbook in step when a gate is appended?** Gates have been appended four times (6–8, 9, GL-1, the GH-1 tripwire). Each append silently makes this file incomplete, and unlike the session-log index it cannot simply be regenerated — the "who acts" and "done-when evidence" columns are judgement, not derivation. **Candidates: a line in the gates doc telling an appending session to update this file; a check at the go-live re-check session only; or accept the drift and treat this file as advisory.** Note that adding an obligation to the gates doc changes a binding doc, so it is a ruling, not a formatting choice. | OPEN — for Michael |

---

## What this document is not

- **Not the gates.** It restates no gate's substance. If a row here is enough to act on without
  opening `Go_Live_Gates.md`, that row is too long and should be cut back to a pointer.
- **Not a status report.** No row asserts a gate is met or unmet. BUILD-STATE is the authority.
- **Not a schedule.** The gates carry their own triggers; this file records them and orders nothing.
- **Not a substitute for the professional security review** (gate 2), which Claude cannot satisfy.
