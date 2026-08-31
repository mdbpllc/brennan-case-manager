# ATTORNEY REVIEW QUEUE — DISPOSITION AUDIT, **HARDENED** (2026-08-25)

> **STATUS: CANDIDATES — EVIDENCE ONLY. THIS SESSION ADJUDICATES NOTHING.**
> No row is closed, no glyph flipped, no ID minted, renamed or retired, nothing enters or leaves the
> build queue. **Michael rules, one row at a time.** Where this file contradicts the 2026-08-24 audit,
> **both readings are given side by side and neither is chosen** — this session is not the tiebreaker.

**Canonical repo path WHEN FILED:** `docs/specs/attorney-review-queue-audit-HARDENED-2026-08-25.md`
**Produced by:** Cowork design session, **2026-08-25 Central** (DT-1 clock-checked: container UTC 18:02 / **Central 13:02 CDT**, same calendar day). **Opus 5, execution class.**
**Source:** the repo at HEAD **`edea20b8e7ee082903293562d2a24c13c0eea881`**, read full-text — the live log, **the CLOSED ARCHIVE** (`docs/archive/session-log-archive-2026-07-21_2026-08-12.md`, where most of the cited rulings actually live), the register, BUILD-STATE, `form-engine.md`, `fe-d1-build-slice.md`, and `id-collision-report.md`. `origin/master` == `HEAD`, `0 0`, `inbox/` empty.

**WHAT THIS IS.** On 2026-08-24 nine auditors classified 362 open rows and found **108 that are not open rulings.** Their own §9 states the limits honestly: *"No auditor cross-checked another's slice… The adversarial verify pass that would catch this **did not run** — the Fable allowance was exhausted at the fleet's return."*

**This file is the half of that verify pass which is EVIDENTIARY rather than adjudicative.** Five independent checkers re-located every quoted ruling at HEAD, read the surrounding paragraph rather than the row, and swept across slice boundaries. **The adjudication is still Fable's and Michael's.** The line held throughout:

| Checked here (mechanical) | NOT checked here (judgment) |
|---|---|
| Does the quoted sentence exist at HEAD, verbatim? | Is the disposition right? |
| Does it say what the audit says, **in context**? | Should this row close, and by what instrument? |
| Is it Michael's ruling or a Claude proposal? | Does closure-by-supersession fit an item he deferred in words? |
| Does it cover the whole row or one limb? | |
| Did a later entry reopen it? | |
| Was the evidence in a neighbouring slice? | |

---

## §0 — ⛔ READ THIS BEFORE USING EITHER AUDIT

**THE 2026-08-24 AUDIT IS NOT AT HEAD. IT IS UNTRACKED.**

`docs/specs/attorney-review-queue-audit-2026-08-24.md` (27,133 B) exists in the working tree on `mdb-pllc` and **`git ls-files` returns nothing for it. No commit contains it. Nothing in `docs/` points at it.** Its companion `docs/specs/id-collision-report.md` (54,218 B) is untracked too. **They are the only two untracked files in `docs/specs/`.**

Its own header reads *"Canonical repo path **WHEN FILED**"* — and the "when filed" is doing real work. **It was never filed.**

**Three consequences, stated plainly:**
1. **Anything citing that audit as HEAD evidence is not citing HEAD.**
2. **Both files are one `git clean` from destruction**, and `id-collision-report.md` carries findings that exist nowhere else — the heartbeat register's true range (`H1`–`H83`, not `H1`–`H23`), a **fourth** bare-`H` meaning, `O` with **five** meanings, and the absence of `FO-4`/`FO-5`.
3. **This is "a capture is not a filing" in repo form** — the same failure class that left five design sessions unfiled for two days. It was found by the spec survey, not by looking for it.

**RECOMMENDED, UNRULED: file both, and this file, in the same packet.** That is Michael's call, not this session's.

---

## §1 — THE HEADLINE, REVISED

The 2026-08-24 audit's substance is sound and its method was honest about its own limits. **Hardening did not overturn it. It narrowed it, in one consistent direction: the audit read cross-references, shared blockers and scope-inclusion cites as identity.**

| Class | Audit's count | Survives hardening cleanly | Needs Michael's eye before closing |
|---|---|---|---|
| **RULED-BUT-OPEN** | 27 | **8 VERIFIED** | **19** — 2 misquoted, 3 out-of-context, 6 partial, 3 not-a-ruling, 5 with a stated caveat |
| **SUPERSEDED** | 21 | **11 PREMISE-DISSOLVED** | **10** — 2 premise-intact, 2 deferred-in-words, 4 partly-dissolved, 1 Claude-assertion, 1 unlocatable quote |
| **DUPLICATE** | 10 | **0** | **10 — not one is a true duplicate** |
| **TOTAL closure-class** | **58** | **19** | **39** |

**Nineteen of fifty-eight are clean.** The other thirty-nine are not wrong so much as **not yet ready to act on**, and eleven of them would destroy an open question if acted on as written.

**THE THREE FINDINGS THAT MATTER MOST**

**(1) NOT ONE OF THE TEN "DUPLICATES" IS ONE QUESTION IN TWO ROWS.** Eight overlap on one limb of two-to-four. **Two are different questions entirely**, and merging either deletes text that exists nowhere else in the register:
- **`WESTLAW-5`** is the only place two V-9 provenance facts live — entry **17**'s designation *"MEMORANDUM OPINION, Nov. 30, 2017, Lang, J."* (`Lang, J` occurs **once in the whole 635 KB file**) and entry **16**'s *"pet. denied,"* which the row notes *"no public source could reach."*
- **`Q-RE-8` vs the `Q-STAT-5` stack** share a **blocker**, not a question. Collapsing them destroys `Q-STAT-5`'s own subject — how far the Insurance line goes, C-1…C-20 — including **C-19's 61-day pre-suit notice and C-20's limitations period, which the row says have "a build consequence independent of the registry."**

**(2) THREE ROWS THE AUDIT WOULD CLOSE ARE THE ONLY HOME FOR AN OPEN QUESTION.** Verified by whole-register string search, each with a control that fired:
- **`RE-1`** — *"overflow"* appears **exactly once in the register**, in RE-1's own row. Its own annotation says why: *"**overflow, by contrast, is defined nowhere** — no capacity model, no metric, no threshold anywhere on the record."*
- **`FE-10`** and **`FE-12`** — three design questions with no other row. *"known-bad"* occurs **once** in the register. `Q-FE10-*`, `Q-FE12-*`, `Q-FE7-*` return **zero rows**, against a control of 34 `Q-FE4-/Q-FE5-/Q-FE6-` rows that do exist.
- **`V-7`** — the only open row carrying *"entry 24's proposition has never been located inside the Devine opinion."*

**(3) THE `H43` WARNING WAS RIGHT, AND THE COMPANION COLLISION REPORT IS WRONG.** There are **two** `H43` propositions: the open register row (*"Can a hearing be set unilaterally in Bexar if the opponent will not confer?"*) and a **RULED** one (`FC-8`, `#106`, court-keyed vs county-keyed profile — BUILD-STATE states it in bold). The live log recorded the collision on 2026-08-19: *"`H43`, **flagged not renamed** … **one ID, two propositions, already in the record**."* **`id-collision-report.md` cleared `H43` as "same subject, not a collision" and left `H43` out of its `H`-series list entirely.** The project's own operational note, recurring on the report written to prevent it: *"the first pass will undercount, and the IDs it misses are not random."*

---

## §2 — RULED-BUT-OPEN (27): the hardened table

**VERDICTS:** `VERIFIED` · `MISQUOTED` · `OUT-OF-CONTEXT` · `NOT-A-RULING` · `PARTIAL` · `SUPERSEDED-SINCE` · `NOT-FOUND`

| ID | Audit's cite | Verdict | What hardening found |
|---|---|---|---|
| `FE-7` | `#53`, `#63` | **VERIFIED** | Clean. *(One qualifier the audit's quote drops: `#63` adds "**Entering ≠ adopting; FE-7 guardrails hold.**")* |
| `DL-INPUT` | `#66` | **VERIFIED** | Clean. **But `#75` later refines the flat model as PROPOSED and unruled** — *"the chain is per-defendant at both ends and case-wide in the middle."* A builder reading `#66` alone builds the wrong thing. |
| `H22` | `#66` | **VERIFIED** | Right row, read not matched. **But the string now means two ruled things** — heartbeat `H22` (`#66`) and disclosures `H22` (`#130`, warn-never-block). `id-collision-report.md` rates it HIGH. |
| — OAA demographics | `#66` | **VERIFIED** | Clean. Row's own text says *"the question CLOSES."* |
| `PF-2` | `#126` | **VERIFIED** | Clean. Runner 79: *"one word closes it in the next batch."* |
| `T-26` | `#108`/`#109` | **VERIFIED** | **The cleanest close in the set.** Successor act has its own row, CLOSED at `#110`. Nothing is destroyed. |
| `Q-AUTH-1` | `#106`/`#117` | **VERIFIED** | Clean; residue rowed at `Q-RL6-1/-2`. **Unstated: its execution produced `Q-PH-1`–`Q-PH-5`, which took no rows on Michael's own ruling.** |
| `Q-IN2-1` | `#106` | **VERIFIED** | Clean — **and the audit understates it.** The *"Yes — both"* is in the register row, not the log. Its residue is **already on BUILD-STATE's hand list.** |
| `FE-5` | `#53` | **PARTIAL** | **Quote truncated at the load-bearing point.** Audit: *"escalates to a warning ONLY when worst-case crosses the cap."* `#53`: *"…crosses the cap **while the numbered count does not**."* The dropped clause is the whole middle path — the audit's stopping point states the pole `#53` rejected. Three live limbs survive (`Q-FE5-9`, `Q-FE5-1`, and `cap = f(level)` being structurally wrong for Level 3). |
| `FE-10` | `#63`, built | **PARTIAL** | The quote rules **scope inclusion**, not the row's design questions. **Two surviving limbs, neither with any other row.** |
| `FE-12` | `#63`, built | **PARTIAL**, and the "built" half is **NOT-FOUND** | `FE-12` occurs **ZERO times in the live log**, line-anchored and flattened (control: `FE-10\|CD-1` = 66). The build entry never names it; `fe-d1-build-slice.md` scopes a **two-value** flag against the row's **three**. Surviving limb *"known-bad, kept for reference"* has no other home. |
| `CD-2` | `#51`, `#61` | **PARTIAL** | Limb **(e)** was added at `#64` — **later than the cited ruling** — and is PROPOSED at HEAD: carrier-ID and financial-responsibility codes as directory-vocabulary candidates. Row still reads *"NOT authorized for build."* |
| `PR-3` | `#34` | **PARTIAL** | **Quote cut before the held clause.** Full text: *"execution HELD… the re-parent does not execute until the probate-ladder design pass produces the ladder it lands on — **a placeholder ladder is how the current wrong one happened**."* All 11 children exist — **but 2 are misfiled** (`Q-PR3-3` is in the audit's own SUPERSEDED list; `Q-PR3-1` is the `src/`-read question) and **`D-CL1-3` is orphaned**: it is *"gated on PR-3 alone"* and no child row is the execution's home. |
| `OPEN-5` | `#82`, `#94` | **PARTIAL** | Both quotes verbatim; the 37th-invocation finding **confirmed decisively** (*"Removed: AUD-1, AUD-5…AUD-9"*). **But limb (b) is live and never ruled** — `#94` says so in the audit's own quote: *"**OPEN-5(b)… REMAIN OPEN.**" A row with an unruled limb does not belong under "closable."* |
| `V-7` | `#73`, executed | **PARTIAL** | Execution verified. **The reason the row is still open is unmentioned:** *"the operative blocker is now PROPOSITION-LOCATION: entry 24's proposition has never been located inside the Devine opinion."* **`V-7` is the only OPEN row carrying it.** |
| `FE-4` | `#53`, `#54` | **OUT-OF-CONTEXT** | The `#54` quote *"FE-4–FE-7 are closed"* is **the contrast clause of a correction entry about different rows** (FE-3, FE-8–FE-12). It closes nothing; it recites status to set up what it corrects. **And `#81` says the opposite, later: *"THE FE ROWS STAY OPEN… a spec is not a closure, and the build is still unauthorized."*** |
| `FE-6` | `#53` | **OUT-OF-CONTEXT** | Quote verbatim and Michael's. But runner 35: *"**They are open because the BUILD is gated, not because the design question is unanswered.**" The premise "only the glyph lags" is contradicted by the record's considered position.* |
| `CD-1` | `#51`, `#113` | **OUT-OF-CONTEXT** | CD-1 **is** complete. But the row's open status **is part of the same `#51` ruling**: *"**This entry stays open as the living-spec pointer.**" Closing it on the `#51` quote contradicts the `#51` quote.* |
| `RE-1` | `#9` | **OUT-OF-CONTEXT** | **The quote is from the wrong ruling.** Byte-offset verified: *"referral out is first-class behavior"* is **limb (3) of the family-law deletion ruling**, listing what survives. The actual RE-1 ruling sits 490 bytes later and reads *"**Ruled yes-eventually; everything else OPEN.**"* `#88` quotes the master spec's full sentence — *"referral out is first-class behavior **(RE-1, a future design pass)**"* — and the audit's quote stops immediately before the parenthetical that says the opposite. `#88` also states *"**the row stays ⬜ and nothing is closed**"* and *"**RE-1 has NO design-doc home.**"* **Plus: "overflow" exists nowhere else in the register.** |
| `V-5` | `#73` | **MISQUOTED** | The quoted sentence is a **queue-runner batch HEADING** from the 51st invocation, not a ruling and not from `#73`. The real `#73` ruling: *"**V-5 — SPLIT ALL THREE two-case entries**, one entry per case."* Execution is at `#96`. The eleven rulings that invocation names **contain no V-5 item at all.** **Substance stands** — but BUILD-STATE adds *"`V5-ATTRIB` stays OPEN across all six split entries"* and *"**19b's 2026-08-17 verification DETACHED**."* |
| `V-6` | `#73` | **MISQUOTED** | Same shape — the quote is the 51st invocation's ROUTE-C adoption line, not `#73`'s ruling (*"V-6 — BOTH STAY, REWORDED to state their operative tests"*). **Everything substantive checks out**, including that the adoptions are Michael's, one at a time, per ROUTE-C. |
| `Q-DES-5` | `#100` | **MISQUOTED — and the ruling belongs to a different, already-closed row** | The quoted string **does not exist**: `0.1.1` → 0 hits, `0.1.3` → 0 hits, both logs (control: `0.1.2` → 2). The real `#100` sentence rules **`V-8`**, a separate row that is **already ✅**. `Q-DES-5`'s only log mentions say *"**NOT ONE ROW WAS CLOSED**"* and *"packet-local, **deliberately not minted**."* And the audit leaves `Q-DES-7` LIVE, whose own text calls itself *"distinct from the multi-cluster duplication at `Q-DES-5`."* |
| `TOC-5` | `#132` | **MISQUOTED** | Neither quoted string exists (`compact existence index` → 0). **`TOC-5` is never named in `#132` or later**; its six log mentions all predate it and all say *"is NOT RULED."* **The substance is nonetheless sound and independently verified** — this is supersession-by-events, not a ruling on `TOC-5`. |
| `P-COM-2` | `#94`, `#98` | **NOT-A-RULING** | **`P-COM-2` returns ZERO in the live log and ZERO in the archive.** Only `P-COM-1` appears, always as the collapsed `P-COM-1..5`, always saying *"**stay UNVERIFIED**… **deliberately NOT minted**."* Source memo is *"PROPOSED — RESEARCH ONLY. Michael did not participate and made no rulings."* What `#94` created were entries labelled **`WP-1/WP-2/WP-3`** on the same three propositions. **Substance corroborated; the row-level cite is not.** These rows carry **no question** — the correct finding is *stale verification status*, not *ruled-but-open*. |
| `P-COM-3` | `#94`, `#98` | **NOT-A-RULING** | Same shape. |
| `P-COM-4` | `#94`, `#98` | **NOT-A-RULING** | Same shape. **⚠ Identity hazard: at least THREE distinct 192.3(h)-adjacent entries exist** — entry 2, `WP-3`, and entry **A** inserted at `#109`. *"The TRCP 192.3(h) entry"* is not a unique referent. |
| — email cross-cutting | `#63` | **VERIFIED** | Offset-verified inside `#63`. Row's own parenthetical is dispositive: *"RULED 2026-08-12 as **recorded constraints, not buildable items**."* **One caveat the audit does not state:** these bind *unbuilt* work (T3 is unauthorized), and a ✅ reads as spent. If it closes, the four constraints need a home a future T3 session will read. |

---

## §3 — SUPERSEDED (21): the hardened table

**VERDICTS:** `PREMISE-DISSOLVED` · `PREMISE-PARTLY-DISSOLVED` · `PREMISE-INTACT` · `DEFERRED-NOT-SUPERSEDED` · `EVIDENCE-IS-A-CLAUDE-ASSERTION`

**Clean — 11:** Family Code · placeholder-discipline carry · `WS-P1` · `O-8` · `O-9` · `TC-OPEN-5` · `TC-OPEN-6` · `TC-OPEN-7` · `RE-LOOK-3` · `SK-v2` · the 2026-08-16 migration.

**The other ten:**

| Row | Verdict | What hardening found |
|---|---|---|
| **468 — v23 paste** | **⛔ PREMISE-INTACT.** The most consequential reversal in this file. | The audit reads it as a version question (*"Overtaken four times; v27 is in force"*). **It is a CONTENT question and the content is missing.** BUILD-STATE says in terms: *"**SOURCING itself is NOT amended in any repo file: the convention lives in the project instructions and the amendment rides the v23 paste.**"* The payload was **`PF-1`** (the standing adversarial preflight, ruled `#105`) and **`FC-14`'s SOURCING fourth channel** (State Bar conduct PDFs, ruled `#106`). **Read against the live v27 instructions: SOURCING carries three named sources and NO State Bar channel; `PF-1` appears NOWHERE in the binding conventions.** Corroborated by the instructions' own internal disagreement — trigger-3 history runs v22 → v24, **omitting v23**, while trigger-4 history says a 2026-08-20 firing was *"resolved in v23."* **Closing this row retires the only surviving pointer to two ruled items that never landed** — and `PF-1` is meanwhile being *run* as though standing while not being *written down*. |
| **292 `TOC-3`** | **PREMISE-INTACT** | `TC-3` ruled the **split**; `TC-4` ruled the **directory**. **Neither ruled the naming convention.** The stable name was a consequence, not a ruling. And the record says twice — in its twin `GLR-2` and in the 47th runner line — *"**This is the same question as `TOC-3`… one ruling closes both.**"* Closing one half of a pair the record says one ruling closes together. |
| **222 `READ-A`** | **DEFERRED-NOT-SUPERSEDED** — *and the superseding evidence is itself false at HEAD* | The audit's ground is that *"the `#108` verbatim-drafting direction now governs every entry."* The record says the opposite three times, including BUILD-STATE: *"**It is a ruled DIRECTION, not a binding convention**… **Applying it to any EXISTING entry is a per-entry ROUTE-C act and also yours.**"* And the deferral is **current binding law** — live in v27's ROUTE-C bullet: *"**silence is not a ruling on the rest.**"* The audit also narrows the row's stake to `Q-STAT-6`'s eighteen; it is the whole 47-entry backlog. |
| **168 `WS-P4`** | **DEFERRED-NOT-SUPERSEDED** | **Michael's word, in the row itself: "Defer."** The audit's own parenthesis — *"v27's trigger-4 history omits 2026-08-18 — that gap is real and separable"* — **IS the row.** The premise is not spent; it is unexecuted, on top of a deferral in his own word. |
| **443 `Q-STAT-6`** | **PREMISE-PARTLY-DISSOLVED** — *the quote is half a sentence* | BUILD-STATE, one sentence: ***"`Q-STAT-6`'s EIGHTEEN ARE NOW NONE LIVE, AND THE ROW STILL STAYS OPEN."*** The audit quotes the first clause and drops the second. The row's own `#98` annotation agrees: *"Nothing above changes the question this row asks."* |
| **82 — classification** | **EVIDENCE-IS-A-CLAUDE-ASSERTION** | The audit's caveat is right and **sharper than stated.** A 2026-07-21 Code session left it frozen *"pending a spec decision"*; a 2026-07-25 design triage elevated it with a **Claude-authored rationale**; a Code session built it. **No Michael ruling appears anywhere in the log or archive** — and all of it predates the 2026-07-26 rule that nothing enters the build queue without his explicit ruling. *(The row's FIRST limb — unreviewed across ~10 entries — IS discharged, cleared at `#13`.)* |
| **69 `CR-1`** | **PREMISE-PARTLY-DISSOLVED** | Substance confirmed; the *"§2"* cite is unverifiable from the staged set. Two things cut against closure: the session that **minted** `CR-1` had reconciled through `#61` and routed three sibling requirements to built structure with no new ID, giving `CR-1` a durable ID **instead**; and the row prescribes, on a positive finding, **not closure but a fold** — *"records as a second observation on the covering section."* That fold is an unexecuted design act. |
| **261 `Q-COM-10-E`** | **PREMISE-PARTLY-DISSOLVED** | The runner at `#105` **had that exact ruling in hand and expressly declined to close the row**: *"`Q-COM-10-B`–`F` were annotated add-only as UNBLOCKED; **none closed**."* The row, written with the ruling in hand, says the Option-2 shape *"now **governs** the answer. Still OPEN."* **Governs ≠ answers.** |
| **355 `Q-PR3-3`** | **PREMISE-PARTLY-DISSOLVED** + **deferred-in-words** | Order settled by events — **but the remainder is expressly reserved to Michael, twice in identical words:** *"Whether anything remains in it is Michael's; the row is annotated, not closed."* |
| **440 `Q-STAT-3`** | **PREMISE-PARTLY-DISSOLVED** | Confirmed dissolved — but by a **project-knowledge fact, not a HEAD fact**, and the capture was **relocated, never deleted**, so under v27's corrected rule 4 it is **bridge-reachable on his machine.** The stated risk (a future session RAG-hits it) is dissolved; the underlying hazard is narrowed, not eliminated. |

### §3.1 — THE DEFERRED-IN-WORDS SWEEP: the audit flagged one; there are FOUR

**Closing any of these by supersession overrides something Michael said in his own words.**

| Row | The words | Where |
|---|---|---|
| **168 `WS-P4`** | **"Defer."** | Register annotation `#108`; log `#108`: *"WS-P4 deferred"* |
| **222 `READ-A`** | *"Ruled 2026-08-16: deferred — the conservative default continues to govern"* — **still live in v27** | Row text; `#95`; v27 ROUTE-C |
| **355 `Q-PR3-3`** | *"Whether anything remains in it is **Michael's**; the row is annotated, not closed"* | `#113`, twice |
| **443 `Q-STAT-6`** | BUILD-STATE instructs *"**THE ROW STILL STAYS OPEN**"* | BUILD-STATE at HEAD |

**And two rows share row 82's never-ruled-at-all shape and were not flagged: 69 (`CR-1`) and 292 (`TOC-3`).** Both were overtaken in practice by acts nobody ruled.

---

## §4 — DUPLICATE (10): **not one is a true duplicate**

| Pair | Verdict | The residue a merge destroys |
|---|---|---|
| `WESTLAW-5` → `Q-RL6-1/-2` | **⛔ DIFFERENT-QUESTIONS** | Entry **17**'s designation (*"MEMORANDUM OPINION, Nov. 30, 2017, Lang, J."* — `Lang, J` occurs **once in the file**) and entry **16**'s *"pet. denied,"* which *"no public source could reach."* Also a category error: `WESTLAW-5` is an **ACT** row, satisfied; the others are **cite-selection menus**. The audit's own reason (*"the five pulls are done"*) is a SUPERSEDED argument, not a duplication one. |
| `Q-RE-8` → `Q-STAT-5` stack | **⛔ DIFFERENT-QUESTIONS** | `Q-STAT-5`'s insurance scoping (C-1…C-20) **including C-19/C-20's build consequence independent of the registry**; `Q-QBO-6`'s un-run retrieval **act**; `Q-FE5-7`'s twelve propositions. **A shared blocker is not a shared question.** |
| `FC13-Q-5` → `Q-RE-8` | OVERLAPPING | **Neither row names the other** (grep: 0 both ways). Two of `Q-RE-8`'s three possible answers leave `FC13-Q-5` unanswered. **And `FC13-Q-5` is not in the `Q-STAT-5` stack** — `Q-RE-8` names the stack as four and it is not one of them. |
| `V5-IDS` → `Q-T19-1` | OVERLAPPING | Self-identification **verified verbatim both ways** — but *"other half"* is the rows' own word, not *"same question."* They govern **different entries in different states**. Residue: **`V5-IDS`'s FILE-SHAPE finding** — *"the two registry files are now shaped two different ways"* — which survives **any** answer to the ID question. Also: **both are DEFERRED by Michael's word at `#98`.** |
| `Q-RL6-5` → `Q-DES-6` | OVERLAPPING (closest of the ten) | Reciprocal self-identification verified. Residue: the *"or is that judged **per entry**?"* alternative, and the **non-CCA / TRAP 47** scope — `Q-DES-6` is CCA-only, and the TRAP 47 branch is live via *Whaley*. **Note: the audit's own evidence is the word "supersedes," which under its taxonomy is §3, not §4.** |
| `Q-COM-10` → `-A`…`-F` | OVERLAPPING (parent/child) | **The audit's *"the umbrella adds nothing they do not carry" is false.*** No sub-row contains the umbrella's second interrogative — *"does the answer come before a **third consumer** picks one by implementation?"*, the consumer being a communications log. **The audit's own §7 lists this row as LIVE.** |
| `Q-FE4-2` → `Q-FE5-2`,`Q-FE6-1` | OVERLAPPING (1 shared limb of 3) | Self-identification is **one-directional and runner-authored**. `Q-FE5-2` is **not a verbatim restatement** — different subject, different rationale. `Q-FE6-1` asks about **the state of the record**, not a destination, plus the *"is 'slice 2' the same as 'the discovery slice'"* limb. **Verified against `fe-d1-build-slice.md`: both premises hold at HEAD, and FE-4/5/6/7 are in neither its IN nor its OUT list.** **`FE-7` has no disposition question at all and no `Q-FE7-*` row exists.** |
| `Q-FE5-2`, `Q-FE6-1` | OVERLAPPING | As above. **The audit's §7 simultaneously lists these as LIVE.** |
| `[Task 7 memo Q4]` → `H43` | OVERLAPPING | **Both rows expressly deny they are one answered question:** Q4 — *"the question is **not answered**"*; `H43` — *"Task 7 supplies the rule text and **expressly does not answer it**."* Residue: *"does the heartbeat's Bexar conferral gate become a **soft gate with a two-branch certificate** rather than the hard block it is currently modeled as — **differently per court**?"* — the only limb with a build consequence. |

### §4.1 — THE `H43` ENUMERATION

| Sense | Meaning | Status |
|---|---|---|
| **H43-α** | *"Can a hearing be set unilaterally in Bexar if the opponent will not confer?"* — register row; heartbeat series | **⬜ OPEN** |
| **H43-β** | *"A COUNTY-KEYED COURT PROFILE IS WRONG FOR BEXAR… **which FC-8's court-keyed profile answers by ruling**"* — BUILD-STATE, `fc-adjudication-record` | **RULED at `#106` via FC-8** |

**`[Task 7 memo Q4]` duplicates H43-α, unambiguously.** And **`FC-8` does not touch H43-α** — the string `H43` appears nowhere in `#106`, whose ruling text is about a deadline profile and structured geography. **Closing the register's `H43` row on "FC-8 ruled it at `#106`" would destroy an open item.**

---

## §5 — THE CROSS-SLICE SWEEP: what nine parallel readers could not see

### §5.1 — `FE-8` IS CLASSIFIED NOWHERE IN THE AUDIT

`FE-8` returns **zero hits** in the audit, flattened, against a firing control of `FE-7` = 5. It sits at register line 189, **between `FE-7` (§2) and `FE-9` (§7) — a slice boundary.**

Its row still reads *"Gated behind CD-1… The engine is nameable once the CD-1 build lands."* **Both landed.** And its `#63` disposition — *"**IN FE-D1, retention half only**… the DIFF half is DEFERRED"* — is **built**: BUILD-STATE names *"seven nullable columns incl. the answer snapshot (**FE-8 retention half**)."*

**`FE-8` is in the identical posture to `FE-10` and `FE-12`, which the audit put in §2 as "built and exercised." Candidate: re-mint the surviving diff half narrowly, exactly as §2 recommends for its neighbours.**

### §5.2 — `R11`'s UNBLOCK ALREADY HAS TWO ROWS, AND NOBODY CONNECTED THEM

Every entry since `#127` carries `R11` as *"gated on his TRCP 195.2 verification, **the cheapest unblock in the disclosures thread**"* — and both the audit and the collision report call it *"no row anywhere."*

**`R11` itself has no row. Its unblock has two, both classified LIVE:**
- **Line 86** — *"`TRCP 195.2(a) and (b)` — **the most expensive thing on this list to miss.** Are the 90-day and 60-day offsets from the discovery-period end correct?"*
- **Line 1012, `[DL-memo Q4]`** — *"Rule 195.2's 'later of… 30 days after the request is served' floor is **GONE** from the July 2026 text… Do you verify that the floor is gone?"*

**Closing those two rows discharges the item that `#135` and `#137` both name as the cheapest move available in the whole disclosures thread.**

### §5.3 — WORLD-STATE-STALE ROWS: **ten, not eleven, and the tenth is not an FE row**

Nine FE rows (`FE-4`…`FE-12`) carry the CD-1 gating language. **The tenth is `Q-RE-5`**, whose *"current reality"* paragraph reads *"FE-D1… is named, scoped and authorized but **NOT built**"* and cites `generated_documents` measurements from `#81`/`#83` — **five days before the build that extended that exact table.** Nobody sweeping the FE series would find it.

**And three rows rest on a schema fact measured before that build:** `IN-3`, `WF-3` and `Q-RE-5` all rest on `#83`'s *"`generated_documents` has no status column of any kind."* **BUILD-STATE carries both that claim and the FE-D1 extension claim, five days apart, unreconciled** — and **the FE-D1 migration is UNRUN**, so `db/schema.sql` and the live database now disagree about this table. **Verify at HEAD before ruling any of the three.**

### §5.4 — `FO-7` IS ANSWERABLE FROM HEAD RIGHT NOW

`#137` made `FO-3`'s QuickBooks limb conditional and said *"**THE CONDITION IS VERIFIED AT HEAD BEFORE ANYONE BUILDS ON IT**"* — a check that session could not perform. **It can be performed now, and it splits:**
- **NOT in the build:** BUILD-STATE — *"`qb_`, `quickbooks`, `third_party`, `integration` all ZERO — none of the 37 tables is a money table."*
- **But SPEC'D:** `qbo-integration-research-memo-2026-08-15.md` exists at HEAD, plus rows `Q-QBO-1`…`-8`.

**Dependency nobody drew:** `Q-QBO-3` asks whether the QBO question waits on **`Q-WF-4`** — and **`Q-WF-4` is classified nowhere in the audit.**

### §5.5 — TWENTY-SEVEN OPEN ROWS ARE NAMED NOWHERE IN THE AUDIT

Verified by flattened word-bounded search against a firing control. The audit's §7 group counts sum to ~218 of 254, so ~36 LIVE rows sit in no group by its own arithmetic. These are named:

`WF-1` · `WF-3` · **`WF-4`** · `Q-WF-1` · **`Q-WF-4`** · `Q-WF-5` · `Q-WF-7` · `Q-WF-10` · **`FE-8`** · `FE-14` · `FE-16` · `FE-17` · `IN-6` · `DE-1` · `DE-2` · `CR-2` · `CR-6` · `CR-9` · `O-3` · `O-6` · `O-7` · `O-11` · `G10-2` · **`TC-OPEN-2`** · `TC-OPEN-8` · `Q-AUTH-2` · `CL-3`

**Three matter disproportionately:** **`Q-WF-4`** (the server-side-identity question `Q-QBO-3` and now `FO-3` both hang on — an unnamed upstream node) · **`TC-OPEN-2`** (the superseded-specs audit — its own row says `docs/specs/` is *"5,203,721 bytes, 91%"*, the largest capacity item on the register; **see the companion file this session produced**) · **`G10-2`** (named still-open in the log five times).

### §5.6 — THE "FIFTEEN NO-ROW ITEMS" ARE TWENTY-FOUR, AND SIXTEEN ARE IN THE REGISTER'S OWN HEADER

The audit's §8 defect 2 says fifteen and then lists 24 IDs (`FO-`5 + `BR-`5 + `DA-`4 + `RC-`3 + `RF-`4 + `INS-1` + `MIG-1` + `R11`). **The substance stands — not one of the 24 has a row.** But they do **not** *"live only in runner 82's §7 sentence"*: **sixteen are named verbatim in the register's Status header**, in a passage that flags the gap itself and says *"**Minting any of them is Michael's act, not a runner's.**"* The companion `id-collision-report.md` gets this right — it calls them **"header-only"** — so the audit contradicts its own companion.

**Two gaps inside the gap:** **`DA-2` is named in runner 82's log line but DROPPED from the register header.** And **`BR-2`, `BR-3`, `BR-4` have zero literal hits anywhere** — they exist only as range endpoints, with **no item text under any of them.**

### §5.7 — RULINGS AT `#135`–`#137` WITH NO REGISTER ROW

Batch 82's row merge was **a deliberate no-op** (*"NOT ONE ROW WAS ADDED, CLOSED OR EDITED"*), so the gap is total. Phrase sweep of the register: `hard stop` 0 · `causation line` 0 · `provider block` 0 · `radiologist` 0 · `widget B` 0 · `widget G` 0 · `R13` 0 · `firm-level` 0 · `recurring obligation` 0 · `bar dues` 0 · `CloudLex` 0 · `third-copy` 0 · `restore test` 0.

**`#135`'s fourteen rulings, `#136`'s verified findings and PROPOSED relabel, and `#137`'s three `FO` rulings are entirely unrepresented in the register.** *(The disclosures half of that gap is what the fold-in packet's §18 now gives a durable home at HEAD for the first time.)*

---

## §6 — DEFECTS IN THE REGISTER: the audit's §8, corrected and extended

| # | Audit's finding | Hardened |
|---|---|---|
| 1 | `O-12` truncated mid-sentence | **CONFIRMED** — ends at *"a second default rule, `supabase_admin — public"*. |
| 2 | "Fifteen open items have no row" | **Substance stands; count is 24 and the framing is wrong** — see §5.6. |
| 3 | Heartbeat `H1`–`H34` have no rows | **CONFIRMED** — the only H-series row heads in the file are `H43` and `H12-v`, and **`H12-v` is the disclosures vendor route, not heartbeat `H12`.** |
| 4 | Line-number cites survive in "at least four rows" | **Four rows, FIVE cites — `Q-PR3-1` carries two** (`BUILD-STATE.md:142` and `:147`). **And the `session-log.md:` cites are dead TWICE over:** the path moved (TC-4) *and* the content moved (the `Q-CAP-1` archive split). |
| 5 | Nine rows over 2,000 bytes, ~62 KB | **CONFIRMED.** Direct input to `TC-OPEN-1`. |
| 6 | Stale counts throughout | **CONFIRMED and extended.** Re-measured today: register **635,537 B / 1,130 non-blank** against v27's recorded **627,495 / 1,070**. Batch 82 added **no rows** — one header sentence plausibly explains +8,042 bytes but **cannot explain +60 non-blank lines.** Looks like the non-blank/raw ambiguity biting a third measure. **Flagged, not resolved.** |
| **7 — NEW** | — | **`🟡` IS UNDEFINED.** The register's convention line documents only `✅ = closed · ⬜ = open`. **Five rows carry `🟡`** (`HK-6`, GPU telemetry, `V-5`, `V-6`, `V-7`) and **three of them are in the audit's RULED-BUT-OPEN table**, whose definition is *"the row still shows ⬜."* A glyph with no legend cannot lag or not-lag. |
| **8 — NEW** | — | **THE OUTLOOK EDIT/CANCEL DEFECT HAS NO QUEUE ROW.** BUILD-STATE carries it (*"Outlook push WORKING, ONE DEFECT"*); `outlook-edit-cancel-exercise-2026-08-13.md` is its only elaboration and says *"The fix is proposed for Michael's ruling."* The register has **zero** rows matching `outlook-edit-cancel`, `edit/cancel` or `first edit duplicat`. **A live, severity-flagged defect is unrepresented in the register of record.** |

---

## §7 — METHOD, AND WHAT THIS PASS DOES NOT ESTABLISH

**Method.** Five independent checkers, each given the same evidentiary brief and each barred from adjudicating: two over the 27 RULED-BUT-OPEN, one over the 21 SUPERSEDED, one over the 10 DUPLICATE, one running the cross-slice sweep. **The closed archive was staged specifically because most cited rulings predate the live log's `#65` floor** — a gap that would have made a third of this pass unverifiable.

Every zero result was re-run against a `tr '\n' ' '` **flattened** copy (headings hard-wrap) and is reported **with the positive control that fired.** The register's row inventory was reproduced independently three times, landing on the audit's own figures each time: **486 marked rows = 357 `⬜` + 124 `✅` + 5 `🟡`; open = 362.**

**Limits, stated rather than smoothed.**
- **This pass adjudicates nothing.** Every verdict is evidentiary. Where it contradicts the audit, both readings are given and **Michael is the tiebreaker, not this session.**
- **`src/` was not read** — the design-side rule, and `Q-PR3-1` is unruled. Rows turning on code shape rest on BUILD-STATE.
- **The registry files (`legal-rule-registry-*.md`) were not staged**, so three `P-COM-*` verdicts and one `Q-DES-5` limb rest on log evidence only. **Those halves are reported as unverifiable, not as confirmed.**
- **No adversarial verify pass ran on THIS file either.** It is the evidentiary half; the adjudicative half is still owed and is Fable-class.
- **`MIG-1` is carried unverified and not re-asserted.** The FE-D1 migration's run state is a database fact the repo only asserts.

**Nothing here is a build authorization. No row was closed, no glyph flipped, no ID minted or renamed, and no row was merged.**
