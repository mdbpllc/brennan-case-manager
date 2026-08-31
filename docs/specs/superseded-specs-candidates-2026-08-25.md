# `TC-OPEN-2` — SUPERSEDED-SPECS SURVEY: CANDIDATE TABLE (2026-08-25)

> **STATUS: CANDIDATES — EVIDENCE ONLY. THIS SESSION RETIRES NOTHING AND RULES NOTHING.**
> `RETIRE-CANDIDATE` below means only *"survives every check for whether it is still doing work."*
> **Retirement is a RULING and it is Michael's.**

**Canonical repo path WHEN FILED:** `docs/specs/superseded-specs-candidates-2026-08-25.md`
**Produced by:** Cowork design session, **2026-08-25 Central** (DT-1 clock-checked: container UTC 18:02 / Central 13:02 CDT). Opus 5, four parallel slice readers over the device bridge, read-only, `GIT_OPTIONAL_LOCKS=0` throughout.
**Source:** HEAD **`edea20b`**. **131 files in the `docs/specs/` working tree; 129 at HEAD** — the two-file gap is itself the first finding.

**WHY THIS EXISTS.** `TC-OPEN-2` has never been started. Its own register row measures `docs/specs/` at *"5,203,721 bytes, 91%"* — **the largest capacity item on the review queue** — and the row is one of the twenty-seven the 2026-08-24 audit classified nowhere at all.

---

## §0 — ⛔ THE DESTINATION MUST BE RULED BEFORE ANY ROW BELOW CAN BE ACTED ON

**There is at present NO RULED HOME for a retired spec file.**

- **`docs/archive/` is CLOSED.** Q-CAP-1/TC-6: *"no entry is ever added."* It cannot receive one.
- **`docs/record/` is the wrong shape.** TC-4 defines it as *"repo-only record, bridge-reachable"* — **live but unsynced**, not retired-and-frozen.
- **Deletion loses the record**, which this project does not do.
- The **LEGAL AUTHORITY ARCHIVE project** is a third thing again, and the instructions' own naming caution keeps all three apart on purpose.

**So `TC-OPEN-2` is really two questions, and only the second is a sweep:** *(1) where does a retired spec GO?* and *(2) which specs go there?* **This file answers only (2), as candidates. (1) is unasked and unruled.**

---

## §1 — THE FINDING THAT OUTRANKS THE SURVEY

**TWO FILES IN `docs/specs/` ARE UNTRACKED — INCLUDING THE 2026-08-24 AUDIT ITSELF.**

| File | Bytes | State |
|---|---|---|
| `attorney-review-queue-audit-2026-08-24.md` | 27,133 | **UNTRACKED.** `git ls-files` returns nothing; no commit contains it; zero inbound references. |
| `id-collision-report.md` | 54,218 | **UNTRACKED.** Same. Zero inbound references. |

They are **the only two untracked files in the directory.** Both were produced by the 2026-08-24 pass; both carry *"Canonical repo path **WHEN FILED**"* on their faces; **neither was ever filed.**

**`id-collision-report.md` carries findings that exist nowhere else** — the heartbeat register's true range (`H1`–`H83`, where the record had assumed `H1`–`H23`), a **fourth** bare-`H` meaning, `R` with four meanings and `O` with **five**, `FO-4`/`FO-5` absent entirely, `BR-1`…`BR-5` with *"no item text under any `BR-n`."*

**Both are one `git clean` from destruction.** This is *"a capture is not a filing"* in repo form — the same failure class that left five design sessions unfiled for two days — **and it was found by a survey that was not looking for it.**

---

## §2 — DEFECTS FOUND (reported, not repaired)

**1. `fe-5-interrogatory-budget-spec-2026-08-15.md` IS HEADLESS — AND IT WAS BORN THAT WAY.**
The file's first line is literally `## 2. Legal substrate — registry-style propositions`. No title, no `**Status:**`, no canonical-path line, **and no §1 at all.** The decisive check was the history, not the file: it landed headless in its **first** commit, `883d915`, 2026-08-15. `git show 883d915:…| head -3` opens at the same line. **The head was never in the repo — no revert recovers it.** Its two siblings `fe-4` and `fe-6` shipped in the same batch and both carry the full house head, which is what makes this a defect rather than an unsettled convention. *(A runner found and reported this; it was never repaired.)*

**2. `go-live-runbook.md`'s LINE POINTERS NO LONGER RESOLVE.** It is a pure pointer table into `Go_Live_Gates.md`, cited by line number, and its header records what it was read against: *"`Go_Live_Gates.md` at `6ca9794` — 106 raw / 84 non-blank."* **At HEAD that file is 234 raw / 194 non-blank — more than double.** Checked directly: the runbook says *"Gate 3 (L24)"*; **line 24 today is a mid-gate-1 append, and gate 3 is actually at line 61.** The drift is structural — the gates doc grew by appends placed *beneath their own gates*, so every pointer below gate 1 shifted. **The file convicts itself:** its own status line reads *"Where this runbook and the gates doc differ, the gates doc governs and **this file is a defect**."*

**3. `criminal-offense-playbooks.md` HAS NO STATUS LINE AND NO MARKDOWN HEADINGS AT ALL.** `^# ` = 0, `^## ` = 0, `^Status` = 0. It opens with a bare text line. **CLAUDE.md names it as a playbook engine and `pi-case-playbooks.md` opens by calling itself its companion**, so it is live content in a defective wrapper — the oldest-format file surveyed.

**4. `registry-v5-v6-v7-wording-execution-2026-08-16.md`'s STATUS LINE IS FALSE AT HEAD.** It asserts *"V-6 AND V-7 ARE PROPOSED AND ADOPTED BY NOBODY."* The register records the opposite: *"all three landed this batch — the V-5 split executed, entries 33 and 34 carry adopted V-6 wording, and entry 23 carries adopted V-7 wording."* **A reader trusting the status line believes two ruled wordings are still open.**

**5. THE `apil-2025-course-book-mining` SERIES IS 3 OF 4 AND THE SHORTFALL IS ON NO FILE'S FACE.** All three extant passes label themselves *"PASS n **of 4**"*; pass 3's §11 is headed `PASS 4 PLAN (final pass)` and defers substantive material forward twice (*"remainder deferred to pass 4"*). **No pass-4 file exists anywhere under `docs/`.**

**6. TWELVE FILES CARRY NO STATUS LINE AT ALL**, in a repo whose convention is one on every doc. The two that matter: **`time-tracker-fee-basis-profiles-design.md`** (47 KB, 28 inbound refs) — its actual status (*"DRAFT, not canonical… do not build from it until Michael rules"*) exists **only in `CLAUDE.md`**, so a reader of the file alone cannot learn it; and **`pi-case-playbooks.md`** (227 KB, the second-largest file surveyed). The six `rulings-capture-*` files are a family inconsistency — a seventh sibling **does** carry one.

**7. FIVE MORE CITE-STABILITY VIOLATIONS, BEYOND THE FOUR THE AUDIT FOUND.** `re-1-referral-engine-inputs-2026-08-16.md` carries **four** `session-log.md:NNNN` cites and `queue-runner-step1-audit-2026-08-16.md` carries **one**. All are wrong twice over — the log prepends *and* TC-4 moved the path. **The step1-audit's own §2 diagnoses precisely this failure class and then commits it.**

**8. `BUILD-STATE`'s ONLY POINTER TO A SPENT FILE IS ITSELF STALE.** `gl1-1-gate1-append-draft-2026-08-19.md` says *"DRAFTED, NOT APPENDED"*; the append **landed** (*"RULED 2026-08-20 — 'Adopt as drafted'"*, and `Go_Live_Gates.md` carries the text). **BUILD-STATE still describes the candidate as not appended.** So the file's only live inbound pointer is a second stale artifact. **A BUILD-STATE mention is not by itself proof a file is live — the sentence has to be read.** That is the `H21`/`H12` failure class in its file-path form.

**9. THE OUTLOOK EDIT/CANCEL DEFECT HAS NO QUEUE ROW.** BUILD-STATE carries it; `outlook-edit-cancel-exercise-2026-08-13.md` is its only elaboration and says *"The fix is proposed for Michael's ruling."* The register has zero matching rows. **That file also holds the FOURTH bare-`H` meaning** — `H1` and `H2` used as *defect hypotheses*, a categorically different kind of ID, which is why no topic check caught it.

---

## §3 — WORLD-STATE-STALE CONTENT: files asserting things false at HEAD

**FE-D1 built 2026-08-20 — confirmed by `git log -1 -- src/forms`, not assumed. Three files still describe the pre-build world:**

| File | The false sentence | Truth at HEAD |
|---|---|---|
| **`form-engine.md`** (23 inbound refs — CLAUDE.md, two migrations; **emphatically LIVING**) | line 4: *"Build position: **NOT the next slice**"*; line 264: *"the engine remains **specified-not-built**, and no build is authorized"*; line 314 repeats it | FE-D1 built, code-complete, exercised on fixtures |
| `fe-d1-build-slice.md` | *"BUILD-STATE's form-engine language updates to: FE-D1… **not yet built**"* | The authorization it records has been executed |
| `fe-4-definitions-sets-spec-2026-08-15.md` | reconcile row: *"FE-D1 authorized 2026-08-12, **not built**"* | Quoted reconcile basis, so lower-stakes — but reads as current |

**Gate-closure staleness — four files, and the distinction matters in both directions:**

| File | Stale assertion | Truth |
|---|---|---|
| `gate10-preflip-report-query.sql` | *"the live half of the report is **UNRUN**"* | **Run 2026-08-20** — *"Success. No rows returned"* |
| `gate10-pii-slice.md` | *"the exclusion limb is… **NOT YET IN EFFECT IN THE APP**"* | **In effect, built 2026-08-19.** ⚠ Any conforming edit must move **only** the exclusion limb — BUILD-STATE warns *"the audit limb is still explicitly owed to `O-1`."* |
| `gate10-pii-frontend-slice.md` | *"**NOT BUILD AUTHORIZED**… authorizing is Michael's own act (`G10-5`)"* | **`G10-5` ruled IN; both halves built; gate 10 CLOSED** |
| `gate3-write-path-test-protocol.md` | status still *"PROPOSED"* | Run; gate 3 **CLOSED 2026-08-20**. **NOT a retirement candidate — it has become a RULING RECORD:** the register says a question's *"full text lives permanently in `gate3-write-path-test-protocol.md`."* Only the status line is stale. |

**Others:**
- **`knowledge-capacity-measurement-2026-08-20.md` — the most stale file surveyed.** All five §5 questions ruled since; §4 levers executed; its §3 weight table's top row cites `docs/specs/session-log.md`, **a path TC-4 removed from the sync entirely**; §4.1's *"seventeen captures currently filed, size not measured"* was superseded by the fifteen relocated and measured at 109,868 B. **But its §1.2 byte/token ratio is the origin exhibit for a figure v27 still cites** — it is not free to drop.
- **`outlook-calendar-sync.md`** — status unchanged since 2026-07-23 (*"Phase 2 explicitly backlogged"*) while BUILD-STATE has read *"Outlook push WORKING"* with create/edit/cancel exercised against live Graph since 2026-08-13. **Thirteen days behind its own subject, never annotated.**
- **`outlook-email-intake.md`** — still *"brainstorm-stage, no phase assigned"*, while `wf-2-wf-8-email-workflow-spec` records the structural finding that *"the WF series is absent from that list, and `outlook-email-intake.md` is absent from the WF material"* — **two email designs that do not know about each other.** `Q-WF-5` is open on exactly this and **neither file points at the other.**
- **`feature-intake-2026-07-24.md`** labels section A *"(NEXT BUILD TARGET)"* — a sequencing statement four weeks of build (CD-1 → FE-D1 → gate 10 → gate 3) have overtaken.
- **`watch-targets-seed.md`** — *"ready for T3 import"* has been true and unacted for a month. The table exists; **no `insert into watch_targets`, no seeder, no migration references the seed.** Pending input to an undeployed tier, not a spent artifact.
- **`statute-text-and-bill-tracking-design.md`** — CLAUDE.md says *"the repo snapshot lags the project-knowledge version — refresh, don't reconstruct"*, yet **`db/schema.sql` cites its §6 twice as provenance.** Schema comments pointing at a document the record calls out of date.

---

## §4 — THE CANDIDATE TABLE

### §4.1 — RETIRE-CANDIDATE (5) — each with the string that holds it

| File | Why it survives every liveness check | The string attached |
|---|---|---|
| **`gl1-1-gate1-append-draft-2026-08-19.md`** | **The cleanest candidate found.** Purpose was to make Michael's ruling *"a single act — adopt / reject / edit."* That act happened; the text landed beneath gate 1. | Its only inbound pointer is BUILD-STATE **still asserting the opposite** (§2 defect 8). Conform BUILD-STATE first, or the retirement makes a stale pointer dangle. |
| **`registry-verification-pass-2026-07-26.md`** | Oldest file surveyed. **Four inbound refs, all four in `docs/archive/`. ZERO live inbound.** | None found. |
| **`rulings-capture-2026-08-10.md`** | Two refs — archive plus one ✅-closed row (`QR-4`). **Not in the `KICK-1` glob** that holds its four siblings open. | None found. |
| **`docs-lint-sweep-2026-08-13.md`** | Its candidate list was already adjudicated dead (*"DROP — no clearance sentence anywhere"*). | **§1 item 1 is one of only three recordings of a still-open reading question.** Retiring it destroys one third of that record. **Needs a home first.** |
| **`q5-v8-section-0-1-candidate-text-2026-08-17.md`** | Its candidate text never landed; the target was ruled fresh and executed a different way. Target file contains zero references to it. | Its only surviving value is as the record of a mismatch **resolved by being bypassed.** |

**Two more nominate themselves and are held by a pointer:** `anon-adp-sweep-verification-2026-08-19.md` declares *"ONE RUN, not a living document"* on its own face but BUILD-STATE points at it; `task-19-signoff-worklist-2026-08-17.md` is spent staging whose ✅ record exists — **but the record's status line cites the worklist's §8 as the order it executed against**, so retiring it orphans the record's provenance.

### §4.2 — SUPERSEDED-IN-PLACE (6) — covered by a successor, but breaking a live pointer

`archive-project-history-by-day.md` *(calls itself `**Status:** ARCHIVE`, covers 07-21→07-26 only, and its stated purpose is now served by `docs/record/session-log-toc.md` — **the sharpest case for §0's destination question, since it looks like it belongs in `docs/archive/` and cannot go there**)* · `deadline-engine-service-and-response-2026-08-14.md` *(the operative spec cites it by name at its own line 67)* · `model-routing-plan.md` *(see §5)* · `post-sync-verification-2026-08-19.md` *(clearances pinned to `beb27f4`, ~10 batches old)* · `queue-runner-step1-audit-2026-08-16.md` *(see §5)* · `registry-new-entry-drafts-2026-08-17.md` *(five of six entries executed at `#108`; **the status line was never conformed**, only in-body annotations)*.

### §4.3 — NOT CANDIDATES, AND THE CHECK THAT SAVED THEM

**Where a banner said one thing and the row said another, the row governed.**

- **`registry-verification-workbook-2026-08-13.md`** — its own banner says `SUPERSEDED IN PART`, which reads like a retirement. **`WB2-1`, ruled `#100`, says *"v2 BECOMES THE WORKING LAYER; **v1 IS FROZEN as the numbering record only**"* — because v1's rows *"are the numbering authority `V5-IDS` and `Q-T19-1` rest on."*** Retiring it destroys the numbering authority for two live IDs. **Decisive check: read the queue row, not the banner.**
- **`g10-4-ch521-entry-drafts-2026-08-19.md`** — **lowest inbound-ref count in its slice (2)**, which looks like a retirement signal and is not one. `G10-4` is ⬜ OPEN; decisive check `grep -c '521' legal-rule-registry-*.md` returns **0 across every registry file.** Nothing was inserted.
- **`fable-adjudication-record-2026-08-18.md`** (**21 occurrences inside the review queue**) and **`fc-adjudication-record-2026-08-18.md`** — both are **RULINGS RECORDS**, Michael's word recorded per item before anything was staged. **Michael's verification acts exist nowhere else.** Keep both.
- **`outlook-edit-cancel-exercise-2026-08-13.md`** — the only home for two defect hypotheses **and** for the fourth bare-`H` meaning.
- **`session-log-head.md`** and **`thin-constitution-restructure-2026-08-21.md`** — derived-and-regenerated, and the governing spec the runner reads each batch. **Never candidates.**
- **`form-engine-helpers.md` — UNSETTLED, and honestly so.** Its status is *"reference implementation, unbuilt"* and the engine it was reference code *for* is now built. **Whether `src/forms/` adopted or replaced these helpers is the deciding fact, and it could not be checked** — reading `src/` is barred design-side and `Q-PR3-1` is unruled. What is checkable cuts toward keeping it: `form-engine.md` points at it and the live drafting SKILL says it *"OPERATIONALIZES those"* helpers. **Resolving this needs one look by a session permitted to read `src/` — which is itself the `Q-PR3-1` question, now stopped a FOURTH task.**

---

## §5 — `model-routing-plan.md`: what actually survives

**The *"do not adopt any part of it"* sentence is NOT in `model-routing-plan.md`. It is in `CLAUDE.md`,** in the spec-index entry describing the memo — so the sentence *and* its supersession both live in a **binding** file, not the candidate file.

`#68`'s annotation, verbatim: *"**Q-5 RESOLVED 2026-08-13 (#66) — the §7.2 clause is ADOPTED into project-instructions v17 MODEL USAGE and binds from there; the 'do not adopt any part of it' sentence is superseded to that extent.** The memo still authorizes nothing on its own; effort levels remain unset."*

| Superseded | Survives intact |
|---|---|
| The prohibition **as applied to §7.2 alone** — its clause text now binds through the instructions | *"The memo still authorizes nothing on its own"* · ***"set an effort level… from it" is NOT superseded*** · *"change model configuration from it"* not superseded · §6.5's four record-keeping proposals **unadopted** · §5 vs §5.2 **unsettled** · §4.1's Fable-on-the-Code-side finding **unverified**, and its §6.3 experiment (*"free, and it settles §4.1"*) apparently never run |

**⚠ ONE SUBSTANTIVE DRIFT, worth Michael's eye.** §7.2 reads *"adversarial audits (run in Claude Code, **read-only**, where the repo can actually be checked)"*. **v27 reads *"run where the repo can actually be checked"* — the read-only qualifier is gone.** Nobody appears to have ruled that.

**Verdict: `SUPERSEDED-IN-PLACE`, not retirable.** §7.2 is the only part that landed; the rest exists nowhere else.

**`queue-runner-step1-audit-2026-08-16.md`, same shape.** Its §3 became `QR-6(a)`–`(f)` and its memo-cite exhibit landed verbatim in CITE-STABILITY. **Three things remain only there**, including §4's closing lesson — *"an adversarial pass produces false positives too, and the ones that survive are the ones with quoted evidence attached"* — which is a **different proposition** from `QR-6(a)`: that binds a *runner step* to name its command; this binds an *auditor's finding* to carry quoted evidence. **Not ruled anywhere.** *(And it is the rule this session and the hardening pass both tried to follow.)*

---

## §6 — TWO CAPACITY MEASUREMENTS, RE-DERIVED TODAY

| File | v27 (2026-08-22) | Measured 2026-08-25 | Δ |
|---|---|---|---|
| `attorney-review-queue.md` | 627,495 B / 1,070 non-blank | **635,537 B / 1,130** | +8,042 B, **+60 lines** |
| `BUILD-STATE.md` | 132,925 B / 150 non-blank | **138,640 B / 150** | +5,715 B, **+0 lines** |

**BUILD-STATE gained 5,715 bytes in three days at exactly its 150-line cap** — the *"A LINE CAP IS NOT A SIZE CAP"* finding, third consecutive measurement, still deliberately not ruled.

**And a third file belongs in that deferral and is not currently named there: `pi-case-playbooks.md`, 227,273 bytes — ~3.3% of the budget in one synced file, under no cap of any kind.**

*(The +60 non-blank lines on the register cannot be explained by batch 82, which added no rows. Flagged in the companion hardened audit, not resolved.)*

---

## §7 — ONE CATEGORY QUESTION THIS SURVEY RAISES

**Nine files in `docs/specs/` call themselves RAW CAPTURE or are capture-shaped and live in the repo** — `registry-verification-pass-2026-07-26.md`, `statutes-pass-est352-cprc71-2026-07-26.md`, and all seven `rulings-capture-*` files.

**TRANSIT (TC-8) names the repo as a destination a capture may NEVER take.**

These were filed by Code sessions **well before TC-8 was ruled on 2026-08-21**, so nothing was violated. But the retirement table is where the question surfaces: **does TC-8 speak to captures already resident in the repo, or only to captures in project knowledge?** That is a ruling, it is Michael's, and **it would reclassify nine files at once.**

---

## §8 — METHOD, AND TWO CAVEATS THAT BOUND EVERY ROW

**Method.** Four parallel slice readers, ~33 files each, over the device bridge, read-only. Per file: its own status line verbatim; the last commit that touched it; inbound references across `docs/` excluding self; and whether a newer spec, a landed build, or a ruling has overtaken it. No `git status` was run, `GIT_OPTIONAL_LOCKS=0` throughout, nothing written to the mount, nothing under `src/` read.

**⚠ CAVEAT 1 — INBOUND-REFERENCE COUNTS UNDERCOUNT, AND THE UNDERCOUNT LANDS ON THE FILES THAT LOOK MOST RETIRABLE.** `case-heartbeat-design.md` cites two of its own source captures with **elided basenames** (`` `…-2026-07-25c.md` ``). A basename grep scores those captures at **zero live referrers** — which reads as a retirement signal and is wrong. **Any count in this survey may undercount by that mechanism.** Every `RETIRE-CANDIDATE` above was therefore also checked against BUILD-STATE, the register and CLAUDE.md by subject, not only by filename.

**⚠ CAVEAT 2 — A TOOLING COLLISION WAS CAUGHT MID-RUN AND MAY NOT HAVE BEEN CAUGHT EVERYWHERE.** The four readers shared the device VM's `/tmp`, and one reader's scratch files were **clobbered by a sibling using the same generic filenames**, silently producing a wrong reference table before it was noticed and re-run under unique names. **The other three may have had the same collision without knowing.** The failure mode is *a plausible-looking table of the wrong files* — which is why §4.3 exists and why every candidate carries the specific string that holds it rather than a bare count. **Stated rather than smoothed.**

**Also unestablished:** `src/` was not read, so `form-engine-helpers.md` is unresolved by design; the six REQ-CAPTUREs are pointed at by BUILD-STATE as **a glob plus a count** (*"SIX REQ-1 CAPTURES ARE FILED"*), which is invisible to a filename grep — **retiring any one silently falsifies that sentence**, and they are marked UNCLEAR for that reason rather than RETIRE-CANDIDATE.

**Nothing here is a retirement, a ruling, or a build authorization. No file was moved, edited or deleted.**
