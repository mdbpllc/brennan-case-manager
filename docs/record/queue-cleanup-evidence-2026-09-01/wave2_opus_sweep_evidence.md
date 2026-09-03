# QUEUE SWEEP — WAVE-2 EVIDENCE (Opus 5, read-only)

**LIVE WORKING DOCUMENT — data prep, reference only, never routed to the repo. SPENT when the 2026-09-01 Fable session's cleanup sheet ships.**

| | |
|---|---|
| **What this is** | WAVE-2 EVIDENCE for the 2026-09-01 review-queue cleanup adjudication — the sweep of the 247 open rows that no closure-class audit ever tested. Wave 1 (the Fable session) verified the 2026-08-24 audit's 108 disposition candidates; this is the remainder. |
| **Session** | Cowork, Opus 5, linked to `mdb-pllc`, device bridge granted on the checkout. Execution class per MODEL USAGE §7.2 — mechanical evidence-gathering, re-routed to Opus after the wave-2 Fable fleet died at launch on the weekly limit (HTTP 429, eight agents, zero reports — the `#104` dead-fleet class). |
| **Authority of this file** | **NONE. This session adjudicates NOTHING.** Every disposition below is an INPUT to the Fable session's cleanup sheet, not a candidate ruling in its own right. **Michael rules last, row by row.** |
| **Pin** | HEAD `7f02131f215605b3062a8351c2b7ec96f46c004c` (batch 85). Verified lock-free: `git ls-remote origin refs/heads/master` == `git rev-parse HEAD`, on `master`. |
| **Date** | 2026-09-01 (DT-1: Michael's wall-clock Central date; container was 2026-09-01 21:38 UTC / 16:38 CDT at the sweep's open). |
| **Fence honored** | Read-only on the repo. No packet, no zip, no `inbox/` write, no repo write, no queue edit, no project-knowledge deletion, no ruling. No `src/` read. |

---

## §0 — HEADLINE: NOT ONE ROW IN 247 IS PROPOSED FOR OUTRIGHT CLOSURE

| Proposed disposition | Rows |
|---|---:|
| `CLOSE` | 0 |
| `CLOSE-SPLIT` | 1 |
| `ANNOTATE-KEEP` | 68 |
| `KEEP` | 174 |
| `RECLASSIFY-ACT` | 2 |
| `MICHAEL-IN-WORDS` | 2 |
| **TOTAL** | **247** |

`CLOSE` = **0**. Eight independent sweepers, no cross-talk, and none of them found a row in this set that a later ruling closes outright. That is the sweep's central result, and it is the opposite of what a disposition pass is usually for: **the 2026-08-24 audit's 108 candidates were where the closures were; the 247 rows it left alone are, on this evidence, genuinely open.** What the sweep did find is a different defect class — **31 rows whose stated PREMISE is false at HEAD while the question underneath stays live** (`WORLD-STATE-STALE`), which is why 68 rows carry an `ANNOTATE-KEEP`: the row keeps its place in the register and gains a sentence saying what changed under it.

**Read that as a warning, not a reassurance.** A register full of rows reciting a build state that no longer exists is how an ID-matched closure destroys an unrelated open item — the failure the house already has on the record twice (`H21`/`H12`, 2026-08-22; the ten-ID collision the same session's re-sweep found).

## §1 — METHOD, so the sheet can audit this file the way it audits a row

1. **Pin and stage.** Thirteen evidence files staged from the bridge and byte-verified against sha256 prefixes supplied in the dispatch — all thirteen byte-identical, no exceptions. (`attorney-review-queue.md` 648,029 B; `session-log.md` 1,294,651 B; `session-log-archive-2026-07-21_2026-08-12.md` 578,892 B; `session-log-toc.md` 228,795 B; `BUILD-STATE.md` 141,688 B; `session-log-head.md` 141,486 B; the two audits; `id-collision-report.md`; `superseded-specs-candidates-2026-08-25.md`; `Go_Live_Gates.md`; `anti-resurrection-ledger.md`; `record-integrity-audit-2026-08-15.md`.)
2. **Row inventory rebuilt deterministically** from the register: **487 rows — 356 `⬜`, 126 `✅`, 5 `🟡`**; live log **156 `## ` headings**, archive **142**. Every dispatch check matched exactly.
3. **Slices rebuilt** by removing the 108-candidate wave-1 coverage set (plus its satellite rows) and dividing the remaining **247 open rows / 225,277 B** into eight byte-balanced blocks. Every dispatch check matched exactly: B1 55 · L18–L215 | B2 21 · L231–L269 | B3 39 · L275–L519 | B4 23 · L528–L775 | B5 25 · L778–L856 | B6 30 · L857–L915 | B7 37 · L916–L968 | B8 17 · L972–L1282.
4. **Eight read-only sweepers**, one per slice, each given the wave-2 brief verbatim plus its own steering notes, each with every row of its slice reproduced verbatim with staged line numbers. **All eight returned content — no dead agent, no slice re-run.** Fleet cost: 2,117,254 subagent tokens, 753 tool calls.
5. **Coverage verified programmatically after the fact**, not asserted: each report's SUMMARY table was parsed and diffed against its slice's line list. **247 rows, each appearing exactly once, zero missing, zero extra, zero duplicated.**

**Standing limits this file inherits and does not escape.** `src/`, `db/`, the registry files (`legal-rule-registry-*`), the Task 7/8/9 spec files and the live database are outside the staged set, so every fact that needs them is marked `UNVERIFIABLE-HERE` with the read that would settle it — see §4. A sweeper's disposition is a proposal by a model; **registry discipline reserves verification to Michael**, and nothing here is verification of anything.

## §2 — MASTER SUMMARY: every non-KEEP row (73 of 247)

| slice | line | ID | call (step 3) | PROPOSED | conf | dependency tag | unique text destroyed if closed? |
|---|---|---|---|---|---|---|---|
| B1 | L25 | Residual (V6) | LIVE, UNCHANGED | ANNOTATE-KEEP | MED | registry verification | Y |
| B1 | L35 | Residual (V2) | LIVE, UNCHANGED | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B1 | L53 | Residual (V17) | LIVE, UNCHANGED — **ID COLLISION** | ANNOTATE-KEEP | HIGH | PR-3 / probate ladder | Y |
| B1 | L84 | TRCP 194.2(a) | LIVE, UNCHANGED (new clean-authority evidence) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B1 | L85 | TRCP 190.3(b)(1) | LIVE, UNCHANGED (no registry entry exists) | ANNOTATE-KEEP | MED | registry verification | Y |
| B1 | L87 | TRCP 166a(d-1),(e-1),(g-1) | PART-ANSWERED: "what changed" + edition limb on record | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B1 | L88 | TRCP 99(b) | LIVE, UNCHANGED | ANNOTATE-KEEP | MED | registry verification | Y |
| B1 | L97 | AMA CPT license terms | WORLD-STATE-STALE (operating default already set by Michael) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B1 | L104 | Entry 2 redraft v2 | (j) mechanism ruled at #66/H77; (e),(f) LIVE | ANNOTATE-KEEP | MED | registry verification | Y |
| B1 | L130 | CR-10 | WORLD-STATE-STALE (six→seven; 29 & 32 VERIFIED) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B1 | L191 | FE-9 | WORLD-STATE-STALE ("gated behind CD-1" false at HEAD) | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B1 | L195 | FE-11 | WORLD-STATE-STALE (same CD-1 gate) | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B1 | L204 | FE-14 | WORLD-STATE-STALE (**entry 27 VERIFIED 08-17 — gate lifted**) | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B1 | L206 | FE-15 | WORLD-STATE-STALE (#63 disposition EXECUTED; posture built) | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B1 | L210 | FE-17 | LIVE, UNCHANGED (annotation propagated to FE-6 §3.2) | ANNOTATE-KEEP | MED | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B2 | L231 | CD-3 | CLOSED-BY-LATER-RULING (sub-limb only) / LIVE on the data-model limb | ANNOTATE-KEEP | MED | free-standing | Y |
| B2 | L235 | CD-4 | LIVE, recital WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B2 | L250 | IN-1 | WORLD-STATE-STALE (capability premise); question LIVE | ANNOTATE-KEEP | MED-HIGH | Phase 1b GPU | Y |
| B2 | L251 | IN-2 | LIVE; measurement WORLD-STATE-STALE (3 of ≥7 migrations; 37→41 tables) | ANNOTATE-KEEP | MED | Phase 1b GPU | Y |
| B2 | L252 | IN-3 | WORLD-STATE-STALE — premise pre-FE-D1 and unreconciled at HEAD; question open (BOTH) | ANNOTATE-KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| B2 | L254 | IN-5 | WORLD-STATE-STALE (capability premise); question LIVE | ANNOTATE-KEEP | MED | Phase 1b GPU | Y |
| B2 | L256 | IN-7 | WORLD-STATE-STALE (capability premise); question LIVE | ANNOTATE-KEEP | MED | Phase 1b GPU | Y |
| B2 | L262 | DE-1 | LIVE; landed spec + ruled sibling not cited on the row | ANNOTATE-KEEP | MED-HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B2 | L263 | DE-2 | LIVE; a named blocker cleared (#108) | ANNOTATE-KEEP | MED | Q-IN3-3 first-instrument consumer | Y |
| B2 | L269 | WF-1 | WORLD-STATE-STALE (cross-reference); question LIVE | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B3 | L276 | `WF-3` | WORLD-STATE-STALE (schema clause only; gate + question live) | ANNOTATE-KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| B3 | L399 | `O-1` | LIVE; sequencing WORLD-STATE-STALE; scope grew | ANNOTATE-KEEP | HIGH | Q-COM-10 list | Y |
| B3 | L418 | `O-12` | DEFERRED IN MICHAEL'S WORDS + row physically TRUNCATED | ANNOTATE-KEEP | HIGH | Michael's hand | Y |
| B3 | L450 | `G10-4` | WORLD-STATE-STALE — "none was drafted" false at HEAD | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B3 | L468 | `TC-OPEN-1` | DEFERRED IN MICHAEL'S WORDS; figures + scope stale | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B3 | L469 | `TC-OPEN-2` | WORLD-STATE-STALE — "not attempted" false at HEAD | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B3 | L475 | `H12-v` | DEFERRED IN MICHAEL'S WORDS; architecture refined since | ANNOTATE-KEEP | MED-HIGH | Michael's hand | Y |
| B4 | L528 | *(none)* Registry verification backlog | WORLD-STATE-STALE (counts, FE-14 gate) + limb (a) CLOSED-BY-LATER-RULING (#108) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B4 | L609 | `Q-T19-1` | DEFERRED / HELD IN MICHAEL'S WORDS (`D-6`, #98) | MICHAEL-IN-WORDS | MED | registry verification | Y |
| B4 | L757 | `Q-RL6-1` | WORLD-STATE-STALE (*Pharr* WAS read, #117) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B4 | L764 | `Q-COM-10-B` | LIVE, UNCHANGED (unblocked ≠ closed) + parent-row overlap | ANNOTATE-KEEP | MED | Q-COM-10 list | Y |
| B5 | L801 | `GLR-3` | WORLD-STATE-STALE — “four appends” is now ≥8 and the drift has MATERIALIZED and been measured | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B5 | L805 | `TOC-1` | LIVE — premise verified at HEAD, but the row points at the wrong FILE since `Q-CAP-1`/`TC-4` | ANNOTATE-KEEP | MED | free-standing | Y |
| B5 | L806 | `TOC-2` | WORLD-STATE-STALE — `#123` supplies the “no stated explanation anywhere” the row denies exists, AND the inversion is load-bearing on `Q-CAP-1` | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B5 | L823 | `Q-COM-1` | LIVE on the question; WORLD-STATE-STALE on its evidence — both line cites are dead and point at the wrong FILE | ANNOTATE-KEEP | HIGH | free-standing (shares the `future-modules-capture` gate with `Q-QBO-1`) | Y |
| B5 | L826 | `Q-COM-4` | **CLOSED-BY-LATER-RULING on limb (i)** — Michael, `#94`, *“Amend the row”*, executed into `Q-WF-4`; limb (ii) untouched | CLOSE-SPLIT (surviving limb: priority) | MED | Q-WF-4 server-side identity | Y if the WHOLE row closes — the `#88` provenance sentence and the priority question exist nowhere else |
| B5 | L827 | `Q-COM-5` | LIVE, UNCHANGED — a FOURTH path of the same gate class (`H12-v`) has since arrived and is hard-gated | ANNOTATE-KEEP | MED | free-standing | Y |
| B5 | L829 | `Q-COM-7` | LIVE, UNCHANGED — the ruled `Q-COM-2` source list has no SMS value, but a gap in a list is not a ruling | ANNOTATE-KEEP | MED | free-standing | Y |
| B5 | L839 | `P-COM-1` | **ACT, NOT RULING** — carries no question; `#94` ruled three OTHER TRCP propositions and 192.5(a)(2) is not among them | RECLASSIFY-ACT (Michael's: mint + verify) | HIGH | registry verification | Y — only copy of TRCP 192.5(a)(2) in the repo |
| B5 | L843 | `P-COM-5` | **ACT, NOT RULING** — carries no question; no TRE 503 proposition exists anywhere in the record | RECLASSIFY-ACT (Michael's: mint + verify) | HIGH | registry verification | Y — only copy of TRE 503(a)(5) in the repo |
| B6 | L858 | `Q-QBO-3` | WORLD-STATE-STALE (cite dead; consumer-fold practised, unruled; `AS-Q1` supplies the shape) | ANNOTATE-KEEP | HIGH | Q-WF-4 server-side identity | N |
| B6 | L861 | `Q-QBO-6` | WORLD-STATE-STALE on its stated blocker — **FC-14 reaches it** | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | Y |
| B6 | L863 | `Q-QBO-8` | LIVE, UNCHANGED; one-word answerable, recommendation already drafted | MICHAEL-IN-WORDS | HIGH | money module (no row) | Y |
| B6 | L872 | `Q-RE-2` | LIVE on the question; source-quality limb reached by FC-14/FC-13 | ANNOTATE-KEEP | MED | RE-1 pass | Y |
| B6 | L874 | `Q-RE-4` | **WORLD-STATE-STALE — BUILD-STATE line 52 corrects "it is not built"** | ANNOTATE-KEEP | HIGH | RE-1 pass | Y |
| B6 | L875 | `Q-RE-5` | WORLD-STATE-STALE on limb 1 only; **§5.3 half right** | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B6 | L877 | `Q-RE-7` | LIVE on the question; source-quality limb reached by FC-14 (7.03 still unread) | ANNOTATE-KEEP | MED | RE-1 pass | Y |
| B6 | L886 | `Q-PR3-1` | LIVE, UNCHANGED — **row's own load-bearing count is stale (2 → 6)** | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B6 | L898 | `Q-WF-2` | LIVE; premise understates — `T` has **7** meanings at HEAD | ANNOTATE-KEEP | HIGH | free-standing | N |
| B6 | L899 | `Q-WF-3` | LIVE; proposed reading destabilised by `H12` REVERSED (`#130`) | ANNOTATE-KEEP | HIGH | Phase 1b GPU | Y |
| B6 | L901 | `Q-WF-5` | LIVE both limbs; BAA row now exists for one other consumer | ANNOTATE-KEEP | MED | free-standing | Y |
| B6 | L902 | `Q-WF-6` | LIVE, premise intact; count/drafts/caller all stale in the row | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | Y |
| B6 | L903 | `Q-WF-7` | **CLOSED-BY-EARLIER-RULING the row never noticed** (`Q-STAT-1` + `HK-5`); eCFR limb survives | ANNOTATE-KEEP | HIGH | Michael's hand | Y |
| B6 | L915 | `Q-IN2-4` | LIVE, premise intact; close analogue ruled since (`R17`) | ANNOTATE-KEEP | MED | free-standing | Y |
| B7 | L930 | `Q-IN1-7` | WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | Phase 1b GPU | Y |
| B7 | L949 | `Q-FE4-5` | WORLD-STATE-STALE | ANNOTATE-KEEP | MED-HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B7 | L957 | `Q-FE5-7` | WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | Y |
| B7 | L959 | `Q-FE5-9` | WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B7 | L962 | `Q-FE6-3` | WORLD-STATE-STALE | ANNOTATE-KEEP | MED | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B7 | L965 | `Q-FE6-6` | WORLD-STATE-STALE | ANNOTATE-KEEP | MED | discovery slice (FE-9/11/13, Q-FE*) | Y |
| B7 | L968 | RUNNER-FOUND DEFECT (headless FE-5 spec) | LIVE + new evidence | ANNOTATE-KEEP | HIGH | free-standing | Y |
| B8 | L974 | `[Task 7 memo Q3]` | LIVE; ruled neighbour (FC-8 keyed the layer) | ANNOTATE-KEEP | MED | free-standing | Y (same caveat) |
| B8 | L1000 | `Q-STAT-2` | WORLD-STATE-STALE figure; QUESTION LIVE | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B8 | L1003 | `Q-STAT-5` | DEFERRED IN MICHAEL'S CHOICE (#108) + count stale | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | **Y — hardened audit: a merge destroys C-1…C-20, incl. C-19/C-20's build consequence** |
| B8 | L1009 | `ID-DL-1` | LIVE as to the ruling; count WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | free-standing | Y (partly — per-packet edges are the row's own synthesis) |
| B8 | L1012 | `[DL-memo Q3]` | WORLD-STATE-STALE ×2; QUESTION LIVE | ANNOTATE-KEEP | HIGH | registry verification | Y |
| B8 | L1014 | `[DL-memo Q5]` | LIVE; second consumer + upstream gap | ANNOTATE-KEEP | MED | registry verification | Y (same caveat) |
| B8 | L1282 | `Party-credibility watch.` | LIVE capture; substrate now built | ANNOTATE-KEEP | MED | free-standing | N — survives verbatim in the archive at `#29` |

### KEEP counts per slice (rows proposed for no change at all)

| slice | rows in slice | KEEP | non-KEEP |
|---|---:|---:|---:|
| B1 | 55 | 40 | 15 |
| B2 | 21 | 11 | 10 |
| B3 | 39 | 32 | 7 |
| B4 | 23 | 19 | 4 |
| B5 | 25 | 16 | 9 |
| B6 | 30 | 16 | 14 |
| B7 | 37 | 30 | 7 |
| B8 | 17 | 10 | 7 |
| **TOTAL** | **247** | **174** | **73** |

## §3 — CROSS-SLICE FINDINGS: what eight independent sweepers converged on

Nothing in this section is a ruling or a proposal. It is the set of findings that appeared in **more than one slice, or in one slice with consequences for all of them**, surfaced here because the per-slice reports below are 400 KB and a sitting should not have to reassemble this from them.

### 3.1 — THE ONE TO READ FIRST: every line number in both audits and in `id-collision-report.md` is OFF BY ONE against HEAD

**Sweeper B8 probed eight audit citations and every one drifts by exactly one line.** The consequences are not cosmetic:

- The audit's `L1002 = "Q-STAT-5"` resolves at HEAD to **`Q-STAT-4`** — a different open row, and the row with a **true zero footprint** (0 occurrences in the live log, the archive, BUILD-STATE and the TOC, against working same-series controls). It is the only copy of the TRCP 193 comment 6 question in the repository.
- The audit's `L1260 = "O4"` lands at HEAD on a **closed `O3` row**.

**Operational consequence for the cleanup sheet: no closure may be executed from an audit line number.** Every row must be re-located by its ID *and then read*, which is the `H21`/`H12` lesson in its second costume. This file's own line numbers are staged-file line numbers at HEAD `7f02131` and were re-derived, not copied from either audit.

### 3.2 — The largest premise-drift cluster: the `H12` reversal of 2026-08-21 never propagated into the register

`#130` reversed `H12` — *"The app calls the model directly, on the firm's own BAA-covered API account"* — and `#140`'s `AS-Q1` later gave that call a credential home. **Three sweepers independently found rows still reciting the pre-reversal world**, and the shape of the miss is the same each time: the row calls document understanding "the Phase-1b local-LLM capability class" or "GPU-arm gated," which stopped being the only sanctioned path on 2026-08-21.

- **B2:** four intake rows — `IN-1`, `IN-2` (extraction limb), `IN-5`, `IN-7`. **And the 2026-08-24 audit grouped those same four rows under "Phase 1b / the GPU arm" three days AFTER the reversal** — the audit inherited the stale premise rather than catching it.
- **B6:** `Q-WF-3`'s proposed reading is destabilised by the same ruling — the explicit-decision escape hatch in `CLAUDE.md` being exercised.
- **B7:** `Q-IN1-7`'s binary — B7's reading of the row: if the bar applies, `IN-1` is Phase-1b — is no longer exhaustive; the BAA remains an unsatisfied **hard gate**, which is why not one of these is proposed for closure.

Nineteen rows across the sweep carry the `Phase 1b GPU` dependency tag. **They are one annotation, not nineteen** — and it is a single sentence Michael has already said.

### 3.3 — The hardened audit's §5.3 claim, tested four ways: premise right, implication over-broad

The dispatch asked four sweepers to test §5.3's claim that named rows rest on pre-FE-D1 schema facts. They converge, independently:

- **The sourcing half is correct.** `IN-3`, `WF-3` and `Q-RE-5` do rest on `#83`'s pre-build measurement, and **BUILD-STATE carries the `#83` claim and the FE-D1 extension claim side by side, unreconciled.**
- **The "therefore stale" half is not established, and for a concrete reason: the FE-D1 migration is UNRUN.** BUILD-STATE at HEAD — rewritten by batch 85 on **2026-09-01, eleven days after the build** — still asserts `generated_documents` has no status column and no set/parent column, because the seven added columns are the answer snapshot and posture (FE-8 retention / FE-15 original-amended-supplemental), which is an *instrument* posture, not a document status. `db/schema.sql` reports 41 tables; the live database has 37.
- **What §5.3 is actually pointing at**, in B3's words, is sharper than what it says: **the schema file and the live database now disagree about this table while `MIG-1` is unrun.** That is a real defect and it is not a queue-row defect.

**None of the four rows is closable on §5.3.** Each is `ANNOTATE-KEEP` — annotate to force a re-measure after the migration runs.

### 3.4 — Gates that have already lifted, and counts the rows still carry

Rows whose blocker died without the row noticing. Each is an annotation; none is a closure, because in every case the question outlived the blocker.

- **`FE-14` (B1):** the row reads *"Gated on the TRCP 47(b)–(c) registry entry, which is UNVERIFIED"*. `#98` states the lifting condition; BUILD-STATE records entry 27 **verified 2026-08-17**. Two further defects in the same row: the cite is now **47(b)–(d)**, and `#76` found *five enumerable options, not "fixed brackets"*. `FE-14` is one of the hardened pass's twenty-seven "named nowhere" rows — **no audit ever looked at it.**
- **The registry backlog figure is stale in at least three places** (B1, B4, B7): rows say *"34"*, and *"the backlog is 40 entries today, 16 of them still UNVERIFIED after the 2026-08-17 walk"*; BUILD-STATE at HEAD says **"Backlog 47 entries; 35 verified, 12 not."**
- **`Q-RL6-1` (B4):** its caution *"Pharr WAS NOT READ"* is false — `#117` records both opinions read in full and positively identified under V-9's second limb — **but the same entry keeps the question open**: *"The cite supply for entries 30 and 31 remains Michael's; nothing was selected."* Neither the register nor its Status header records the read.
- **`G10-4` (B3):** the row says *"No registry entry was created and none was drafted"*. BUILD-STATE names the file and says **seven drafted entries exist, drafted and not inserted.** Neither audit caught this.
- **`CR-10` (B1):** the row's *"Those six propositions now live in `docs/specs/legal-rule-registry-criminal-plea-and-costs.md` (all UNVERIFIED)"* is stale on both count and status — **seven** at HEAD (entry 4 split at `#66`), with **two verified by Michael's word 2026-08-18.** The hard gate itself survives.
- **`Q-FE5-9` (B7):** the row's load-bearing parenthetical *"route (c) is a ruled one-off, not standing law"* is **false at HEAD** — route (c) was ruled STANDING the next day at `#95`, which applied the identical mechanism to registry entry 3 and called it *"the `Q-FE5-9` shape"*. **Its ROUTE-C wording is being drafted TODAY by the CHAT-DISPATCH v5 chain** — hence `ANNOTATE-KEEP`, never `CLOSE`, and the annotation says the wording is in flight elsewhere.
- **`Q-PR3-1` (B6):** the row says *"this is the second task to be shaped by an unruled method question"*, the 2026-08-24 audit says three, and at HEAD it is **six**, verified entry by entry, the sixth being 2026-08-31.
- **`TC-OPEN-1` / `TC-OPEN-2` (B3):** stale figures throughout, and **`TC-OPEN-2` asks the wrong one of its two questions** — `#138` ran the survey, whose §0 says *"There is at present NO RULED HOME for a retired spec file."*; the destination question outranks the sweep and has never been put. `#138` also named a **third** uncapped grower the row's title excludes: `pi-case-playbooks.md`, 227,273 B, synced.

### 3.5 — The register is the only home for a number of these questions, and that is QR-1 working

Rows with a **true zero footprint** — verified newline-flattened, with firing controls, across the live log, the archive, BUILD-STATE and the TOC:

- **`Q-STAT-4`** (B8) — the TRCP 193 comment 6 question. *This is exactly the row the audit's off-by-one line cite would have deleted.*
- **`Q-DES-4`** (B4) — `TAMES` returns 0 hits everywhere outside the register, 6 on one line of it.
- **`Q-RL6-4`, `Q-COM-10-C`, `Q-COM-10-D`** (B4) — register-only IDs; they survive only as range endpoints in the runner lines that entered them.
- **`P-COM-1`, `P-COM-5`** (B5) — TRCP 192.5(a)(2) and TRE 503(a)(5): 0 in the log, 0 in the archive, 0 in BUILD-STATE, 1 in the register. **These two carry no question at all**; the hardened audit already stated the right classification for the family — *stale verification status*, not *ruled-but-open* — so they are `RECLASSIFY-ACT` (Michael's: mint + verify), never closed.

**225 of the 247 rows** were marked **Y** in the sweep's "unique text destroyed if closed" column That is what QR-1 was ruled for, and it is the strongest argument in this file against a fast disposition pass.

### 3.6 — Grep hygiene: three traps a sweeper hit live

- **`\bWF-1\b` matches inside `Q-WF-1`** (B2). `WF-1`'s two apparent live-log hits are both `Q-WF-1`; its true count is **zero**. Any ID that is a prefix of another needs an anchor or a backtick.
- **Bold markers split a phrase.** B8's `ID-DL-1` count maxes at "SIXTEENTH" unflattened and **"EIGHTEENTH" flattened**, because `an **EIGHTEENTH** packet` breaks the grep. That is almost certainly how the 2026-08-24 audit got its sixteen. The row itself still says **twelve** — six behind the register. (Both eighteen and B8's independent second enumeration of sixteen *body-nameable* packets are real and count different things; the report says which is which.)
- **`OPEN-3` / `TC-OPEN-3`, `OPEN-1` / `TC-OPEN-1`** (B3, B8): a bare `OPEN-1` exists and was **closed at `#100`**. Every count in this file uses full strings.

### 3.7 — Defects in the audits and the record that the sheet should decide about separately

Recorded because they were found, not because this session proposes anything about them.

- **The 2026-08-24 audit classifies `CD-10` twice** — under "`CE1`, unauthorized" and inside the "`CD-3`…`CD-13`" free-standing block — so **its §7 arithmetic double-counts that row** (B2).
- **`V17` is an unresolved ID collision and a live trap** (B1). One `V17` (§352.051(2) / §71.004(c) fees) was opened at archive `#8`; a **different** `V17` — probate as its own practice area — is CLOSED at archive `#15`, and it is the one BUILD-STATE and the PR-3 row cite. The collision report had this as *"unsure whether same subject"*; **the register carries both meanings at once, which settles it as two subjects.** Needs the `CR-3` treatment.
- **BUILD-STATE contradicts itself on the Pharr/Hurlburt read** (B4): one line still says it is *"gated only on your two PDF pulls"* while two others record both pulls done and the read executed.
- **`#138` contradicts itself** (B3): its body says the hardened audit and the `TC-OPEN-2` survey ran; its process-notes tail says both *"were IN SCOPE for this session and WERE NOT RUN"* Context puts the latter inside a `#136`/`#137` correction paragraph, and both artefacts exist at HEAD — **but the log is append-only and the sentence stands as written.** Flagged, not adjudicated.
- **Thirteen of B3's thirty-nine rows appear in neither audit** (`PL-2`, `PL-3`, `O-10` nowhere at all; `FC13-Q-2/-3/-4/-6` and `Q-WS3P-2`…`-6` only as range endpoints), and **B7's `L968` was never classified by either.** Consistent with the hardened pass's own count of twenty-seven rows named nowhere.

### 3.8 — Two rows the sheet may want to take first, and why neither is proposed for closure

- **`Q-COM-4` (B5) — `CLOSE-SPLIT`, the sweep's only one.** Michael ruled *"Amend the row"* at `#94` and the amendment was executed into `Q-WF-4`'s row, which now names all three consumers. **That answers limb (i) and only limb (i).** Limb (ii) — does a third consumer move it up the queue — was never put and never ruled. Closing the whole row destroys the `#88` provenance sentence.
- **`Q-WF-7` (B6) — the slice's strongest closure candidate, and still `KEEP`.** Two Michael rulings that *predate* the row answer both limbs of its disjunction: `Q-STAT-1` (`#77`) makes the Knowledge Repo corpus primary and the targeted fetch the fallback — **the row has the order backwards** — and `HK-5` (`#66`) makes the grant per-instance and his to direct, *"never a session's default."* **The eCFR limb survives untouched**, so the row does not close.

### 3.9 — What the FE-D1 build (2026-08-20) actually did to the register, verified rather than assumed

Reported because three sweepers were separately asked and separately checked. **Almost nothing.** Still no item table, no `generated_documents` status or set/parent column, no IN-2 fact table, no discovery-level field. What moved: FE-D1 **extended** `generated_documents` with seven nullable columns rather than forking it, built the FE-10 render lint, and created the §10 template substrate — **a Code session's build act, not a ruling** — and **its migration is UNRUN.** That is why exactly three FE rows in B7 are `ANNOTATE-KEEP` and thirty keep their premises whole.

One consequence worth stating plainly: **B6 found the PNC funnel is not the "not built" the row says it is.** BUILD-STATE corrects it directly — `src/domain/partyRegistry.ts` carries a `pncStatus` select whose options are exactly `— / PNC / Client / Declined / Referred out`. "Build the funnel" now means *promote a capture that already exists*, which is the gate-10 wrong-level pattern.

---

## §4 — UNVERIFIABLE-HERE: what this sweep could not settle, and the read that would

Consolidated across the eight slices. Each sweeper's own report carries the per-row detail. **Nothing below was guessed at; every one of these is marked in the row block.**

| What is unverifiable from the staged set | What would settle it |
|---|---|
| `generated_documents`' current columns and its `doc_type` CHECK — **the single fact that would upgrade `IN-3`, `WF-3` and `Q-RE-5` from ANNOTATE-KEEP** | `db/schema.sql` + `db/migrations/2026-08-20-fe-d1-form-engine.sql`, or `fe-d1-build-slice.md` |
| The four `legal-rule-registry-*` files: per-entry status for entries 4a/4b, 27, 30, 31, 34, E; whether any ch. 521 draft was inserted; `Q-STAT-2`'s DRAFT-vs-UNVERIFIED mismatch | The registry files at HEAD (not synced design-side; bridge-reachable) |
| The six Task 8/9/10 spec files — so **every `spec §n` cross-reference in B7 is unchecked**, and the register's claim that those rows are "the only place these questions live" is probably wrong | The spec files at HEAD |
| The Task 7 memo §11 and the DL memo / `deadline-engine-spec.md` — the probable second home for eight of B8's rows' question texts | Those files at HEAD |
| `src/` reads: `partyRegistry.ts`'s `pncStatus`, `billing.ts`, `transcripts.ts`, `roster.ts`, `caseTypes.ts`, the `'claimant'` ternary sites | `src/` is DELIBERATELY out of the design-side sync; BUILD-STATE is the only authority, or Michael pastes the file |
| The live database state (37 tables vs `schema.sql`'s 41; `MIG-1` unrun) | A Code session, or the gate-3 style run |
| `CLAUDE.md`'s current text — whether the majority-opinion / model-call notes were amended after the `H12` reversal | `CLAUDE.md` at HEAD |
| Off-repo: the `Documents\Knowledge Repo` opinion pulls behind `Q-WS3-3/-4` and `Q-RL6-4/-6`; the `Q-T3P-1` provenance README | **Michael's, per H5** — never a session's unprompted sweep of his machine |
| The ARCHIVE project and the project-instructions field | Unreachable from this container |

---

## §5 — HOW TO USE THIS FILE

1. **It proposes; it does not rule.** Take each row's block as an evidence packet: the quote, its location, the disconfirmation attempt, and one proposed disposition with a confidence. The Fable session's cleanup sheet decides what to put to Michael; **Michael decides the row.**
2. **Do not execute anything from a line number in either audit** (§3.1). Re-locate by ID, then **read the row** before proposing anything about it.
3. **`ANNOTATE-KEEP` is 68 of 73 non-KEEP proposals, and most of them are one sentence.** Several share a sentence — the nineteen `Phase 1b GPU` rows are one annotation about `#130`, not nineteen. Grouping them is the cheapest real win in this file.
4. **The dependency tags are the grouping axis**, as the dispatch asked: `free-standing` 84 · `registry verification` 48 · `discovery slice` 20 · `Phase 1b GPU` 19 · `PR-3 / probate ladder` 16 · `T3 / KICK-1 / P1` 11 · `Michael's hand` 11 · `Q-IN3-3 first-instrument consumer` 10 · `money module (no row)` 9 · `Q-COM-10 list` 5 · `Q-STAT-5 stack` 4 · `RE-1 pass` 4 · `CE1` 3 · `Q-WF-4 server-side identity` 2.
5. **Where a sweeper and this header disagree, the sweeper's report governs** — it holds the character-exact quote and this header is a synthesis of it.

---

# THE EIGHT SLICE REPORTS

Reproduced in full and in order, exactly as each sweeper wrote them. Line numbers inside them are staged-file line numbers at HEAD `7f02131`.



---

<a id="slice-b1"></a>

## ===== SLICE B1 =====

# WAVE-2 SWEEP — SLICE B1 (55 rows, register lines L18–L215)

**Sweeper:** B1. **Read-only.** Nothing adjudicated, nothing edited. Register at HEAD `7f02131`
(`docs/specs/attorney-review-queue.md`, 648,029 B). Every quotation below was copied from command
output, never retyped.

**Slice contents:** the V1–V17 registry residuals (§§1–2), the TRCP sign-off rows at L84–L88 less
L86, the §4 status check at L97, the project-document rows at L104–L114, the CR series at
L122–L136, the client-model rows at L172–L176, and the FE rows wave 1 did not take (L191–L215).

**What the two audits said about this slice.** The 2026-08-24 audit put every one of these rows in
its **§7 LIVE** block and tested none of them: *"`V1`…`V13` residuals · the `Q-RL6-*` cite supply ·
`P-COM-1`, `P-COM-5` · `FC13-Q-1`…`-6` · `[DL-memo Q1]`…`[Q5]` · the TRCP sign-offs at lines 84–88"*
(`attorney-review-queue-audit-2026-08-24.md:222–223`). **Note the audit's own range is short: it
writes `V1…V13` and the residual series runs to `V17`** — `V14a`, `V15`, `V16` and `V17` are picked
up only in its probate-ladder group. The hardened pass names **`CR-2`, `CR-6`, `CR-9`, `CL-3`,
`FE-14`, `FE-16`, `FE-17`** among the twenty-seven rows *"named nowhere in the audit"*
(`…-HARDENED-2026-08-25.md:207`). Seven of my 55 had no audit coverage at all.

**Headline:** **40 KEEP, 15 ANNOTATE-KEEP, 0 CLOSE.** Not one row in this slice has been answered by
a later ruling. What the sweep found instead is **six rows whose stated premise is false at HEAD**
while the question underneath is still live — the `WORLD-STATE-STALE` class — plus one ID collision
(`V17`) that is a live trap for any future grep-driven closure pass.

---

## §1 — NON-KEEP PROPOSALS (15)

### Residual (V6) — *Tanner* as the H21 cite (L25)

**1. Question.** Do you adopt *Tanner* as the H21 cite, and does the draft entry live in the registry
file or the TRCP skeleton doc? Row's own words: *"Asked and not answered."*

**2. Greps run.** `\bV6\b` — live **5**, archive **1**, BUILD-STATE **0**, TOC **0**, register **2**.
Control: `\bV5\b` live 16 (all the Task-19 `V5-IDS`/`V5-ATTRIB`/`V5-COUNT` series, a different `V6`
neighbour). **Three of the five live `V6` hits are the ROUTE-C wording IDs `V6-33`, `V6-33-HEAD`,
`V6-34`, `V6-34-HEAD`, `V6-34-CITE`** (live `5245`, `5313`, `5314`) — not this row.

**3. Call: LIVE, UNCHANGED — with a substantive later mention that the row does not carry.**
The two genuine hits are one entry, and it names V6 as still open and deliberately not touched:

> `  UNADOPTED draft (*Tanner*, open item **V6**), and the rules set no deadline for obtaining service — the`
> `  skeleton says twice that this belongs in the registry as its own entry with a case cite. Re-deriving it`

— `docs/record/session-log.md:8347–8348`, entry `## 2026-08-14 (#75) — DEADLINE-ENGINE MEMO filed as PROPOSED design input; RULE`.
The next line: *"would duplicate V6 and pre-empt Michael's routing."* That entry also states
*"NOTHING RULED THIS SESSION. Michael made no rulings; everything is PROPOSED."*
(`session-log.md:8354–8355`).

**4. Disconfirmation attempted.** Looked for any adoption of *Tanner* or any registry-vs-skeleton
routing ruling: `Tanner` returns nothing that adopts; `V6` returns nothing after 2026-08-14. The
`V6-33`/`V6-34` ROUTE-C adoptions at `#95`/`#96` are entries 33 and 34 of the enforcement registry,
not this residual — reading the rows disconfirms the ID match.

**5. Proposal: ANNOTATE-KEEP — MED.** Annotation substance: *"Named still-open 2026-08-14 (#75),
which declined to re-derive service diligence precisely because doing so would duplicate V6 and
pre-empt Michael's routing. The routing half of this row — registry file vs. TRCP skeleton — is what
that session was waiting on."* **ID-collision warning also owed:** `V6-33`/`V6-34` are unrelated.

**6. First line, verbatim, occurring exactly once (`grep -c -F -x` = 1):**
`  - ⬜ **Residual (V6): do you adopt *Tanner* as the H21 cite, and does the draft entry live in the registry file or the TRCP skeleton doc?** Asked and not answered.`

---

### Residual (V2) — the staggered-answer anchor (L35)

**1. Question.** What governs *"the date the defendant files an answer"* in a multi-defendant case
with staggered answers? Row cross-notes: *"Same gap as TRCP 194.2(a)."*

**2. Greps run.** `\bV2\b` — live **1**, archive **0**, BUILD-STATE **0**, TOC **0**, register **2**.
Phrase `staggered answers` — live 0 / archive 0 / BUILD-STATE 0 / register **1**. Control `equitable
and just` archive 4.

**3. Call: LIVE, UNCHANGED — and the single live hit says so in terms.**

> `- **NEW TENSION FOUND IN RULE 99(c), evidence for V2 and not a resolution of it:** the citation notice now`

— `docs/record/session-log.md:8339`, entry `## 2026-08-14 (#75) — DEADLINE-ENGINE MEMO filed as PROPOSED design input; RULE`.
The tension: Rule 99(c)'s citation notice tells a defendant disclosures are due 30 days after
*"you file your answer"* while 194.2(a) anchors on the **first** answer — *"For any defendant other
than the first to answer, the citation the defendant receives and the rule that governs give
different dates."*

**4. Disconfirmation attempted.** The obvious `DUPLICATE-CANDIDATE` is `[DL-memo Q2]` at register
`L1011`, which asks *"Does this change your answer to V2 (the staggered-answer anchor gap), and
should the engine surface the discrepancy to the defendant-side user rather than silently applying
194.2(a)?"* — **it is NOT a duplicate: it names V2 as an open question it depends on**, and its own
closing words are *"Evidence for V2, not a resolution"*. Two different questions; the DL row asks
what the engine should DO, V2 asks what the law IS.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: cross-reference `[DL-memo Q2]`
(register L1011) as the row's evidence, and record the Rule 99(c)/194.2(a) divergence found
2026-08-14 (`#75`). The pointer currently runs one way only — the DL row points at V2, V2 points at
nothing.

**6. First line, verbatim, `grep -c -F -x` = 1:**
`  - ⬜ **Residual (V2): what governs "the date the defendant files an answer" in a multi-defendant case with staggered answers?** Same gap as TRCP 194.2(a).`

---

### Residual (V17) — §71.004(c) fees under §352.051(2) (L53) — **ID COLLISION, HIGH RISK**

**1. Question.** Are a §71.004(c)-compelled representative's fees reimbursable under §352.051(2)
where the WD recovery is not the estate's? Row: *"Decides whether the probate fee profile touches PI
at all."*

**2. Greps run.** `\bV17\b` — live **4**, archive **8**, BUILD-STATE **1**, TOC **0**, register **5**.

**3. Call: LIVE, UNCHANGED — but `V17` MEANS TWO DIFFERENT THINGS AND THE OTHER ONE IS CLOSED.**
This row's `V17` was opened 2026-07-26:

> `**V17 opened, and it is the one that matters for scope:** §352.051(2) reimburses fees "necessarily incurred`
> `in connection with the proceedings and management of the estate," while §71.004(c) compels a representative`
> `to prosecute an action whose recovery is not the estate's. Reimbursable or not? Text points both ways;`
> `neither chapter answers. This decides whether the probate fee profile touches the PI practice at all.`

— `docs/archive/session-log-archive-2026-07-21_2026-08-12.md:4623–4626`, entry
`## 2026-07-26 (#8) — Design space, Opus 5: Est. Code ch. 352 + CPRC ch. 71 read i`.

A **different** `V17` — probate as its own practice area — is CLOSED, same day, different entry:

> `- **V17 CLOSED — ruled (a), clean separation.** Michael ruled probate is its own`

— `docs/archive/…-2026-08-12.md:4114`, entry
`## 2026-07-26 (#15) — V17 ruled (a); CLAIMANT DIMENSION ruled in; conflicts = ad`.

That second `V17` is the one BUILD-STATE and the PR-3 row carry: *"PR-3 direction CONFIRMED (V17: own
practice area, own ladder(s), companion concept gone)"* (`BUILD-STATE.md:96`), and
`session-log.md:6694–6695`: *"**V17** (2026-08-07) settled own-practice-area / own-ladder /
companion-concept-gone"*.

**4. Disconfirmation attempted, and this is the decisive check.** Could they be one question with an
option set? No — *"reimbursable or not?"* does not map to *"probate is its own practice area, linked
not parented."* **And the register itself carries both meanings simultaneously**: this row at L53 and
the PR-3 annotation *"Direction CONFIRMED 2026-08-07 per V17"* in §2. `id-collision-report.md:290`
already flags the pair as *"**unsure whether same subject**"* — this sweep resolves it: **different
subjects.**

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: *"COLLISION FLAGGED, NOT RENAMED — this
is `V17` the Est. Code §352.051(2) residual (opened #8, 2026-07-26). It is NOT the `V17` closed at
#15 the same day (probate as its own practice area), which is the one PR-3 and BUILD-STATE:96 cite."*
This is the `CR-3` treatment, and it is owed for the same reason: **a grep-driven closure pass will
find `"V17 CLOSED — ruled (a)"` and destroy this row.**

**6. First line, verbatim, `grep -c -F -x` = 1:**
`  - ⬜ **Residual (V17): are a §71.004(c)-compelled representative's fees reimbursable under §352.051(2)** where the WD recovery is not the estate's? **Decides whether the probate fee profile touches PI at all.**`

---

### TRCP 194.2(a) — the anchor (L84)

**1. Question.** Is the trigger 30 days after the first answer or appearance, exactly as the skeleton
states? A **sign-off** question: only Michael's verification closes it (registry rule 2).

**2. Greps run.** `194.2` live — the relevant hits are in `#75`; `166a` live **0**; controls fire
(`criminal` live 81, `docket` live 11).

**3. Call: LIVE, UNCHANGED — premise intact, but clean-authority evidence now exists that the row
predates.** The skeleton's formulation was extracted from the **2026-03-01** rules text
(`archive:5361`, `## 2026-07-25 (Session 2, mixed voice/text, Opus 5: case-heartbeat design doc w`),
which stated it as *"**candidates**; verification remains attorney-only (registry rule 2)."* On
2026-08-14 the same proposition was re-read from clean authority:

> `- **RULE TEXT IS NO LONGER RAG OR REDLINE.** Michael connected `Documents\Knowledge Repo` mid-session; every`
> `  rule quotation is from `Civil\texas-rules-of-civil-procedure July 2026.pdf`, read locally. The preceding`

— `session-log.md:8296–8297` (`#75`). And that read produced a **finding the row does not carry**:

> `  case-wide anchor: expert designation. **194.2(a)'s carve-out keys to SERVICE OR JOINDER timing, not answer`
> `  timing** — a defendant served early that answers late gets no fresh 30 days.`

— `session-log.md:8331–8332` (`#75`).

**4. Disconfirmation attempted.** Is this closed by `HD-10`? **No.** `#139`'s `HD-10` ruling —
*"Close it by pointing at them"* — reaches **two** register rows only, and they are L86 and L1013:
> `  **`HD-10` "Close it by pointing at them"** — the two register rows ARE the verification act; no new item; **R11`
> `  stays GATED and nothing was computed, displayed or proposed** · **Q2** answered by consequence (versioned artifact;`

— `session-log.md:331–332`, entry `## 2026-08-31 (#139) — (Typed design session, Cowork, Fable 5 — the model per the environment`.
`grep -n "195.2" docs/specs/attorney-review-queue.md` returns exactly two rows — **L86** (`TRCP
195.2(a) and (b)`) and **L1013** (`[DL-memo Q4]`). **Neither is L84, L85, L87 or L88.** `HD-10` does
not reach any row in my slice.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: the sign-off now has clean-authority
text behind it (July 2026 PDF, `#75`), **and** a carve-out finding the skeleton does not state —
194.2(a)'s carve-out keys to service/joinder, not answer timing. Still UNVERIFIED; still Michael's.

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **TRCP 194.2(a)** — the anchor; everything downstream derives from it. **Is the trigger 30 days after the first answer or appearance, exactly as the skeleton states?**`

---

### TRCP 190.3(b)(1) — the cascade rule (L85)

**1. Question.** Is the discovery-period end the earlier of 30 days before trial or nine months after
the anchor? Sign-off, Michael's.

**2. Greps run.** `190.3` live **7** — `1674`, `7446`, `7497`, `7514`, `7523`, `7560`, `8330`. Read
all seven: five are about **190.3(b)(3)** (the 25-interrogatory cap, `#81`), one is a
no-registry-entry list, one is `#75`.

**3. Call: LIVE, UNCHANGED — and the row's own formulation traces to an unverified extraction.**

> `begin there; **litigation dates are derived, never stored**, because Level 2's period ends at the earlier of 30 days`
> `before trial or nine months after the anchor, with expert designations 90 and 60 days before that end, making a trial`

— `archive:5434–5435`, entry `## 2026-07-25 (Session 2, mixed voice/text, Opus 5: case-heartbeat design doc w`.
That same paragraph labels the whole extraction *"**candidates**; verification remains attorney-only
(registry rule 2)."* `#75` independently confirms the anchor half from clean authority — *"the
discovery period (190.3(b)(1)(A), anchored on when the first disclosures are due)"*
(`session-log.md:8330`) — **and `#127` records that no registry entry exists for it at all**:
*"**No registry entry exists for TRCP 195.5 in any limb, 195.2, 195.1, 193.6, 192.3(c)/*Axelson*,
*Baylor Medical Plaza v. Kidd*, TRE 902(10), or TRCP 190.3(b)(1)(A).**"* (`session-log.md:1674`).

**4. Disconfirmation attempted.** `#81`'s 190.3 finding is a **different subpart** — `190.3(b)(3)`,
the interrogatory cap, inside a VERIFIED entry that diverges from the rule. Reading the paragraph
disconfirms the ID match; it does not touch (b)(1). `HD-10` does not reach this row (see L84).

**5. Proposal: ANNOTATE-KEEP — MED.** Annotation substance: **there is no registry entry for TRCP
190.3(b)(1)(A) at HEAD** (`#127`), so this sign-off is not "verify an entry" but "verify a skeleton
candidate that has no entry"; and the neighbouring 190.3(b)(3) entry is VERIFIED-but-divergent
(`Q-FE5-9`), which is the cautionary case.

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **TRCP 190.3(b)(1)** — the cascade rule. **Is the discovery-period end the earlier of 30 days before trial or nine months after the anchor?**`

---

### TRCP 166a(d-1), (e-1), (g-1) — current-practice risk (L87)

**1. Question.** Two limbs: (a) what changed in the 2026 edition, and does it alter anything you're
doing right now? (b) confirm you are reading the 2026 edition — a 2020 PDF was uploaded once by
mistake.

**2. Greps run.** `166a` — live **0**, BUILD-STATE **0**, archive **1**. `2020 edition` / `2020 PDF`
— one archive hit. Controls fire.

**3. Call: LIVE on limb (a)'s "does it alter anything you're doing right now"; limb (b) and the
"what changed" half are ANSWERED IN THE RECORD and the row does not know it.**

> `profiles. **Rule 166a is restructured in this text** versus the pre-amendment scheme — response 21 days after the motion`
> `is filed, reply 7 days after the response, hearing not set within 35 days of filing and required within 60 or 90 —`
> `flagged as a current-practice risk independent of the build, and as the clearest possible demonstration of why intervals`

— `archive:5438–5440`, entry `## 2026-07-25 (Session 2, mixed voice/text, Opus 5: case-heartbeat design doc w`.
On the edition: *"Michael uploaded the 2020 edition first by mistake. **The registry uses the 2026 text.**"*
(`archive:5205`, entry `## 2026-07-25 (Voice walkthrough, Fable 5 → Opus 5: default-judgment thread`),
and since 2026-08-14 rule text comes from `Civil\texas-rules-of-civil-procedure July 2026.pdf` read
locally (`#75`, `session-log.md:8296–8297`), now a named SOURCING channel.

**4. Disconfirmation attempted.** Does the archive passage close limb (a)? **No** — it states what
changed, and expressly leaves the practice consequence with Michael by flagging it as *"a
current-practice risk independent of the build."* Nobody has told him whether it alters what he is
doing now. That is the surviving limb and it is his.

**5. Proposal: ANNOTATE-KEEP — HIGH** (a genuine `CLOSE-SPLIT` candidate on limb (b), but the two
limbs sit in one sentence and splitting a sentence is an edit, not an annotation — so annotate).
Annotation substance: the "what changed" answer is on the record (21/7/35/60-or-90, `archive:5438`),
and the edition check is discharged — the July 2026 clean-authority PDF is the SOURCING channel.
**Only "does it alter anything you're doing right now" survives.**

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **TRCP 166a(d-1), (e-1), (g-1)** — a **current-practice risk today**, independent of the build. **What changed in the 2026 edition, and does it alter anything you're doing right now?** Confirm you are reading the 2026 edition — a 2020 PDF was uploaded by mistake once.`

---

### TRCP 99(b) — the answer date (L88)

**1. Question.** Is the 10:00 a.m.-Monday-next formulation exact enough to write a tested function
against?

**2. Greps run.** `99(b)` live **1** (`8327`, `#75`); archive `5441`. Controls fire.

**3. Call: LIVE, UNCHANGED — with two record findings the row does not carry.**

> `are registry entries rather than anything recited from memory. Also noted: Rule 99(b)'s answer date is not service plus`
> `twenty days but 10:00 a.m. on the Monday next after twenty days expire, needing its own tested function; Rule 4 carries`
> `three different day-counting modes and requires a legal-holiday table; and **service diligence was deliberately not`

— `archive:5441–5443`, entry `## 2026-07-25 (Session 2, mixed voice/text, Opus 5: case-heartbeat design doc w`.
And `#75` supplies the model the function would sit in: *"PER-DEFENDANT: answer date (99(b), from
that defendant's own service date)"* (`session-log.md:8327`).

**4. Disconfirmation attempted.** Does `DL-INPUT` (ruled `#66`, *"the deadline model is
PER-(CASE, PARTY) — each party's response clock computes from its own service date"*,
`session-log.md:9095–9096`) close this? **No** — DL-INPUT rules the *shape of the model*, not whether
99(b)'s wording is precise enough to encode. The row's question is a text-exactness sign-off.

**5. Proposal: ANNOTATE-KEEP — MED.** Annotation substance: the answer function also needs Rule 4's
three day-counting modes and a legal-holiday table (`archive:5442`); and `DL-INPUT` (#66) already
rules the per-(case, party) shape it plugs into. Neither closes the sign-off.

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **TRCP 99(b)** — the answer date is 10:00 a.m. on the Monday next after twenty days expire. **Is that formulation exact enough to write a tested function against?**`

---

### AMA CPT license terms (L97)

**1. Question.** Can the module store descriptor text at all, or is it numeric codes only? Row:
*"Entry 7's only real blocker."*

**2. Greps run.** `\bAMA\b` — archive **1**, live **0**, BUILD-STATE **0**. `CPT` — archive 6, live 0,
BUILD-STATE 1 (*"fuzzy CPT mapping"*, the built billing module).

**3. Call: WORLD-STATE-STALE on the operating question — Michael already authorized the conservative
answer, and the row never noticed.** From 2026-07-23, **three days before this queue was compiled**:

> `Michael authorized: (1) accepting the AMA CPT click-through license on the CMS PFS look-up tool on the firm's behalf, (2) locality = **Rest of Texas** (Novitas 04412 / locality 99 = MAC locality 0441299, confirmed against CMS's own locality key), (3) **codes + rates only, no CPT descriptions** — conservative reading of the CPT license, which limits use to "Medicare, Medicaid or other programs administered by CMS." That license reading is new input for registry item 7 (PFS licensing) — still unverified pending Michael's sign-off; he should note the decision there when he verifies.`

— `docs/archive/session-log-archive-2026-07-21_2026-08-12.md:5945`, entry
`## 2026-07-23 (real Medicare PFS data pulled — TX Rest of State)`.

**4. Disconfirmation attempted — and it holds the row open.** The same sentence says the reading is
*"still unverified pending Michael's sign-off."* Nobody has read the AMA licence terms themselves;
what exists is a **conservative operating default** applied to avoid the question. The row asks what
the licence **permits**; the record answers what the firm **chose to do**. Those are different, and
the row's premise — "Entry 7's only real blocker" — survives.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: *"Interim operating position already set
by Michael 2026-07-23 — codes + rates only, no CPT descriptions, a conservative reading of the
click-through licence. That reading is itself UNVERIFIED and the log says he 'should note the
decision there when he verifies.' The row is now: does the licence in fact permit descriptor text, or
does the conservative default stand?"*

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **AMA CPT license terms** — **can the module store descriptor text at all, or is it numeric codes only?** Entry 7's only real blocker.`

---

### Entry 2 redraft v2 — (e), (f), (j) (L104)

**1. Question.** Three limbs: does (e) state the claimant-offers-the-counteraffidavit move correctly;
is (f)'s uncontroverted floor worth building as a computed figure; and **how should (j) record the
contested *Allstate* dicta?**

**2. Greps run.** `legal-rule-registry-draft-entries-medical-billing` — live **6**, archive 8,
BUILD-STATE 1, register 5. `2\(j\)` / `Allstate dicta` — live **1** (`9087`), archive 0.

**3. Call: LIVE on (e) and (f); limb (j)'s MECHANISM was ruled 2026-08-13 and the row does not carry it.**

> `  data). H77 — the registry GETS a `precedential_status` field separate from verification`
> `  status (plurality/dicta/memorandum as data; flag-only; two live exhibits: Gregory v.`
> `  Chohan; the Allstate dicta at Entry 2(j)).`

— `docs/record/session-log.md:9085–9087`, entry
`## 2026-08-13 (#66) — RULING RUN: ~20 open queue items ruled one by one (design `.
That is the **only** later hit on Entry 2(j) anywhere in the record.

**4. Disconfirmation attempted — and it stops this short of a CLOSE-SPLIT.** `H77` rules the
*container* (a flag-only `precedential_status` field), not the *content* of Entry 2(j) — it does not
say whether the dicta proposition survives, is struck, or is retained with a flag. And the register's
own `H77` note at L111 says *"**Ruled ≠ authorized: no schema or code change follows until a slice
authorizes it.**"* `grep -c "precedential_status"` — BUILD-STATE **1**, and the field is not built.
Limbs (e) and (f) have zero hits anywhere. The medical-billing file is still headed *"ALL ENTRIES
UNVERIFIED"* (`session-log.md:8237–8238`).

**5. Proposal: ANNOTATE-KEEP — MED.** Annotation substance: *"(j)'s recording MECHANISM is ruled —
`H77` (#66, 2026-08-13): dicta is recorded as data in a flag-only `precedential_status` field, and
Entry 2(j)'s *Allstate* dicta is one of its two named live exhibits. The field is not built and
Entry 2(j)'s own wording is still unruled. (e) and (f) untouched."*

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **Entry 2 redraft v2** (now the Entry 2 section of `legal-rule-registry-draft-entries-medical-billing.md`, replaced in place 2026-07-26) — **does (e) state the claimant-offers-the-counteraffidavit move correctly, is (f)'s uncontroverted floor worth building as a computed figure, and how should (j) record the contested *Allstate* dicta?**`

---

### CR-10 — plea-paperwork signing checklist (L130)

**1. Question.** Can these checks be encoded as rules run against drafted judgments, and which
verified-authority registry do they check against? (§5 Q6, answered in part by the ruling.) The row's
**status assertion** is what matters here: *"Those six propositions now live in
`docs/specs/legal-rule-registry-criminal-plea-and-costs.md` (all UNVERIFIED), and **CR-10 is gated on
their verification.**"*

**2. Greps run.** `\bCR-10\b` — live **6**, archive 1, BUILD-STATE **2**, register 9.

**3. Call: WORLD-STATE-STALE — the gate holds, but the row's stated premise is FALSE at HEAD on both
count and status.** Count first:

> `read in full; file counts re-derived by anchored grep (enforcement 38 lines 22/16; criminal 7,`

— `docs/record/session-log.md:3881`, entry
`## 2026-08-18 (#109) — THE SUCCESSOR ACTS CLOSE THE SAME NIGHT: ENTRIES 12, 32, D AND E VERIFIED;`.
**Seven, not six** — the criminal entry 4 was split into 4a/4b by Michael's ruling at `#66`
(*"Backlog count 33 → 34 (one proposition became two)"*, `session-log.md:9077–9078`).
Status second, from BUILD-STATE at HEAD:

> `- **CR-10 STAYS HARD-GATED, THOUGH ONE OF ITS FOUR IS NOW CLEAR:** **32 is VERIFIED (#109)**; 29 was verified at #108; **30 and 31 are cite-less and their cites are yours.**`

— `docs/specs/BUILD-STATE.md:109`. `#108`: *"ENTRIES 13, 2 AND 29 VERIFIED — his word, dated
2026-08-18"*. Michael's own verification acts. BUILD-STATE's registry header re-derives
`legal-rule-registry-criminal-plea-and-costs.md` at **5 VERIFIED / 2 UNVERIFIED against 7**
(`BUILD-STATE.md:103`).

**4. Disconfirmation attempted — the GATE is intact.** BUILD-STATE says in terms *"CR-10 STAYS
HARD-GATED"*; `#96` says *"**CR-10 stays hard-gated** (29/32 pending execution+verification; 30/31
cite-less)"* (`session-log.md:5124`, `#98`). Entries 30 and 31 remain cite-less and their cites are
Michael's, so the hard gate does not lift. **This is an annotation, never a closure.**

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: *"Premise refreshed at HEAD — the file
holds SEVEN propositions, not six (entry 4 split into 4a/4b, #66), and they are no longer all
UNVERIFIED: 29 verified #108, 32 verified #109, both Michael's word 2026-08-18. The hard gate is
UNCHANGED — 30 and 31 are cite-less and their cites are his."* Exact per-entry status inside the
registry file is **UNVERIFIABLE-HERE** (the file is not staged); a full-text read of
`docs/specs/legal-rule-registry-criminal-plea-and-costs.md` at HEAD would settle it.

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **CR-10 — Plea-paperwork audit rendered as a signing checklist:** degree of offense vs. charged statute, jail-credit presence for in-custody/bench-warrant defendants, completeness of required certifications, and non-concurrent cost totals. **The capture's own highest-value item.** Live evidence, all caught on paper before the judge signed: zero days' jail credit printed for a defendant who had been sitting on a bench warrant; the degree of offense misprinted on two causes; a blank, unsigned certification of right to appeal on every cause; and court costs that do not run concurrent. **HARD GATE, restated from CLAUDE.md rule 1: no computed check runs while the underlying propositions are UNVERIFIED.** Those six propositions now live in `docs/specs/legal-rule-registry-criminal-plea-and-costs.md` (all UNVERIFIED), and **CR-10 is gated on their verification.** **Question riding here (§5 Q6): can these checks be encoded as rules run against drafted judgments, and which verified-authority registry do they check against? — ANSWERED IN PART by the ruling: that registry file, once verified.** Priority: soon, but highest-value.`

---

### FE-9 — document-family consistency (L191)

**1. Question.** Should character-level formatting be enforced or advisory; does the drift report
belong in the finalization UI (blocking) or a review log (non-blocking)?

**2. Greps run.** `FE-9` — live **1** (`7575`), archive 4, BUILD-STATE **1**, register 4.

**3. Call: WORLD-STATE-STALE — "Gated behind CD-1" is false at HEAD.**

> `(1) the CD-1 directory build landed and exercised — COMPLETE 2026-08-19 `

— `docs/specs/BUILD-STATE.md:23` (the GL-1 floor list). Also `BUILD-STATE.md:8`: *"**CD-1 IS
COMPLETE — ITEM 7 RAN AND**"*. The row's sentence *"The engine is nameable once the CD-1 build
lands"* is likewise overtaken — the engine was named, scoped and authorized at `#63` on 2026-08-12,
seven days **before** CD-1 completed, and the row's own `#63 DISPOSITION` line records it.

**4. Disconfirmation attempted.** Does the lifted gate close the question? **No.** `#63` homed FE-9
to *"the DISCOVERY slice"*, and **no discovery slice exists** — `grep -i "discovery slice"` returns
**0** in BUILD-STATE and 2 in the live log, both `#81` prose. So the row's real dependency is a slice
that has not been scoped. The two sub-questions have zero hits anywhere.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: *"'Gated behind CD-1' is spent — CD-1
COMPLETE 2026-08-19 (BUILD-STATE:23), and the engine was named at #63 on 2026-08-12. The live
dependency is the DISCOVERY slice named by #63, which does not exist at HEAD."*

**6. First line, verbatim, `grep -c -F -x` = 1:** (row text is one 1,484-byte line; first line is the
whole `- ⬜ **FE-9 — Document-family consistency…` item, verified unique.)

---

### FE-11 — caption-body integrity (L195)

**1. Question.** Hard requirement (cannot be hand-edited out of sync) or a lint layer over free-form
editing — plus UIM §5 Q2 (deliberate short-form vs. drift in headers/footers) and §5 Q3 (is
"non-party tortfeasor" a formal roster role).

**2. Greps run.** `FE-11` — live **2** (`1672`, `7575`), archive 6, BUILD-STATE **0**, register 5.

**3. Call: WORLD-STATE-STALE — same CD-1 gate as FE-9, plus a proposed fold the row does not carry.**
CD-1 quote as above (`BUILD-STATE.md:23`). The second live hit is `#127`:
*"Four requirements fold into existing IDs rather than minting parallel ones — `R3`→`FE-11`,
`R6`→`IN-2`, `R10`→`FE-20`, `R13`→`IN-4`+`FE-8`"* (`session-log.md:1672`), entry
`## 2026-08-20 (#127) — THE DISCLOSURES REQ-CAPTURE RECONCILED: the facility-as-expert defect trac`.

**4. Disconfirmation attempted — and it caps the annotation.** `#127`'s own heading says *"six
durable IDs proposed and none minted"*, and its body says minting is Michael's act. **`R3`→`FE-11`
is PROPOSED, not ruled** — it must not be written into the row as settled. `FE-11` has zero
BUILD-STATE presence; nothing is built.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: (a) *"Gated behind CD-1" is spent —
CD-1 COMPLETE 2026-08-19*; (b) *the disclosures capture's `R3` is PROPOSED to fold into FE-11 (#127,
2026-08-20) — proposed only, no ID minted, Michael's act*.

**6. First line, verbatim, `grep -c -F -x` = 1** (the 2,857-byte `- ⬜ **FE-11 — Caption-body
integrity…` item).

---

### FE-14 — relief bracket picklist (L204) — **the strongest premise-failure in the slice**

**1. Question.** Relief bracket as a per-matter picklist among the fixed statutory options, rendered
into the pleading template. Row's status line: *"**Gated on the TRCP 47(b)–(c) registry entry, which
is UNVERIFIED — the option list's wording is not encoded until Michael verifies.**"*

**2. Greps run.** `FE-14` — live **3** (`5123`, `5691`, `8209`), archive 2, BUILD-STATE 0, register 4.

**3. Call: WORLD-STATE-STALE — the gate the row names has LIFTED.** The gate's own lifting condition:

> `- **GATES: FE-14's registry gate lifts when entry 27's verification executes** (build position`

— `docs/record/session-log.md:5123`, entry
`## 2026-08-17 (#98) — TASK 19 SIGN-OFF WALK EXECUTED (CHAT-DISPATCH v2 Task B): 24 of 40`.
And the condition is satisfied at HEAD:

> `Adopted at #95 and **verified 08-17: 5, 6, 11, 27**.`

— `docs/specs/BUILD-STATE.md:108`. **Entry 27 was verified by Michael on 2026-08-17.** Two further
premise defects in the same row: the cite is now `TRCP 47(b)–(d)`, not `47(b)–(c)` — ruled at `#98` as one of five directed edits
(*"**E-1** entry 27's heading → `TRCP 47(b)–(d)`"*, `session-log.md:5089`, the FIFTY-THIRD runner
line reporting it; `#98`'s own list at `session-log.md:5116`) — and the options are not "fixed
brackets":

> `- **ENTRY 27 IS NO LONGER TEXT PARTIAL. Its full text is retrieved, which unblocks FE-14's picklist** —`
> `  five enumerable options, not "fixed brackets" — and surfaces a separable requirement the form engine`
> `  did not know about: non-compliance with 47(c) **bars discovery** until amendment. **Nothing built,`

— `session-log.md:8209–8211`, entry
`## 2026-08-14 (#76) — STATUTE PASS: all 21 `RETRIEVAL: NOT RUN` rows retrieved from the official`.

**4. Disconfirmation attempted.** Is the QUESTION therefore closed? **No.** `#63` put FE-14 **OUT of
FE-D1**, restated at `#93` (*"FE-14 (entry 27) — **OUT** of FE-D1"*, `session-log.md:5691`, entry
`## 2026-08-16 (#93) — CHAT-DISPATCH TASK 19 ATTEMPTED AND NOT COMPLETED: a redundant retrieval`),
it is pleading-side, and nothing is built. What died is the gate, not the item. Also checked: `FE-14` is one of the
twenty-seven rows the hardened audit says are *"named nowhere in the audit"* — so no prior pass
caught this.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: *"REGISTRY GATE LIFTED. Entry 27
verified 2026-08-17 (BUILD-STATE:108); its heading is now `TRCP 47(b)–(d)` (#98's E-1); and #76 found
FIVE ENUMERABLE OPTIONS, not 'fixed brackets', plus a separable requirement — non-compliance with
47(c) bars discovery until amendment. The item remains OUT of FE-D1 (#63) and unbuilt; only the
blocker is gone."*

**6. First line, verbatim, `grep -c -F -x` = 1:**
`- ⬜ **FE-14 — Relief bracket as a per-matter picklist among the fixed statutory options, rendered into the pleading template (live evidence: the rule-mandated relief statement had to be swapped between fixed statutory brackets, and the exemplar's bracket did not match the new case).** Entered 2026-08-12 (UIM-UDJA REQ-CAPTURE, priority now). **Gated on the TRCP 47(b)–(c) registry entry, which is UNVERIFIED — the option list's wording is not encoded until Michael verifies.** *(That is a REGISTRY gate under CLAUDE.md's rule 1, not the #54 slice-scoping treatment; see the FE-gating item below.)*`

---

### FE-15 — instrument posture (L206)

**1. Question.** Posture as a render parameter driving title, COS inclusion and footer name together;
sub-question (UIM §5 Q4) whether posture auto-includes/excludes the certificate of service at render
time, or only warns.

**2. Greps run.** `FE-15` — live **1** (`1752`), archive 2, BUILD-STATE **2** (`62`, `99`), register 3.

**3. Call: WORLD-STATE-STALE — the row's `#63` disposition ("IN FE-D1, SCOPED TO DISCLOSURES POSTURE
ONLY") has EXECUTED, and the row still reads as pending.**

> `| Forms | **NEW — FE-D1, fixture only** | disclosures wizard: posture (FE-15) `

— `docs/specs/BUILD-STATE.md:62`. And the schema half:
*"`generated_documents` EXTENDED, not forked** — seven nullable columns incl. the answer snapshot
(FE-8 retention half) and posture (FE-15)"* (`BUILD-STATE.md:99`). Built at the
`## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED per TOC-6 — no `#nn`,`
session, fixture-only, migration UNRUN.

**4. Disconfirmation attempted.** Does the build close the row? **No, and the audit agrees** — its
§7 lists *"`FE-15`'s COS limb"* among the discovery-slice rows, i.e. the surviving limb. FE-D1 is
disclosures-only; the full original/amended/supplemental parameter across instrument families is not
built, and the §5 Q4 auto-vs-warn question has zero hits anywhere.

**5. Proposal: ANNOTATE-KEEP — HIGH.** Annotation substance: *"The #63 disposition EXECUTED —
disclosures posture is built in FE-D1, fixture only, migration UNRUN (BUILD-STATE:62 and :99).
SURVIVING: the full original/amended/supplemental parameter across instrument families, and §5 Q4
(auto-include/exclude the COS at render time, or warn only) — the audit's 'FE-15's COS limb'."*

**6. First line, verbatim, `grep -c -F -x` = 1** (the 1,154-byte `- ⬜ **FE-15 — Instrument posture…`
item).

---

### FE-17 — internal/outbound channel with render-time exclusion (L210)

**1. Question.** Should the internal/outbound flag be enforced at the schema level, and should the
same mechanism serve the privilege firewall's genericization gate (§5 Q4); plus §5 Q5, the stipulated
definition object.

**2. Greps run.** `FE-17` — live **3** (`7572`, `7575`, `7578`), archive 10, BUILD-STATE **0**,
register 7.

**3. Call: LIVE, UNCHANGED on both questions — but the row's binding annotation has been PROPAGATED
and the row does not say so.**

> `- **FE-17 BINDS WHOEVER BUILDS FE-6, UNDER A DIFFERENT ITEM'S NUMBER.** *"Rides whichever slice`
> `  creates the ITEM table (the discovery slice), **in the same commit as that table**."* Restated in`
> `  the FE-6 spec §3.2 so that slice cannot miss it.`

— `docs/record/session-log.md:7578–7580`, entry
`## 2026-08-15 (#81) — CHAT-DISPATCH TASK 8: form-engine specs FE-4, FE-5, FE-6 — and a VERIFIED registry entry that does not match the rule it cites (design session, Opus`.

**4. Disconfirmation attempted.** Is `FE-17` therefore discharged? **No.** The propagation moves the
*from-birth annotation* into the FE-6 spec so a builder cannot miss it; it decides neither §5 Q4 nor
§5 Q5. `FE-17` has zero BUILD-STATE presence — nothing is built, and no item table exists
(`BUILD-STATE.md:83`: *"No case-event/CE table, no time_entries, no claims, no `case_links`."*).
`FE-17` is also one of the hardened audit's *"named nowhere"* twenty-seven.

**5. Proposal: ANNOTATE-KEEP — MED.** Annotation substance: *"The binding from-birth annotation is
now RESTATED IN `form-engine.md`'s FE-6 spec §3.2 (#81, 2026-08-15) — 'rides whichever slice creates
the ITEM table (the discovery slice), in the same commit as that table.' The two questions (§5 Q4
schema-level enforcement + genericization gate; §5 Q5 stipulated definition) are untouched."*

**6. First line, verbatim, `grep -c -F -x` = 1** (the 1,715-byte `- ⬜ **FE-17 — Internal/outbound
channel…` item).

---

## §2 — KEEP ROWS (40)

*One line each; the grep was run for every one, with controls. Zero-count results were confirmed with
a firing control on the same file (`criminal` live 81 / BUILD-STATE 17; `docket` live 11; `worksheet`
live 4; `equitable and just` archive 4).*

- `L18` **Residual (V1)** — KEEP — `registry verification` — greps run: `\bV1\b` (live 0 / arch 2, both list-carries / BS 0 / TOC 0), phrases `p.876` and `load-bearing or dicta` (0 everywhere but the register, ×1 each). Nothing has re-read pp. 876/882.
- `L23` **Residual (V3)** — KEEP — `registry verification` — greps run: `\bV3\b` (live 0 / arch 1, and that hit is the **cite-parser `V1–V3` build flags**, a different series — `id-collision-report.md:34` names five `V` meanings), phrase `trend" framing` ×1 register only.
- `L37` **Residual (V4)** — KEEP — `registry verification` — greps run: `\bV4\b` (live 0 / arch 6, all carry-lines; `archive:5104` *"V4 still gates the disbursement"*), phrase `notice defects fatal` ×1 register only. Needs case law; nobody has run it.
- `L38` **Residual (V5)** — KEEP — `registry verification` — greps run: `\bV5\b` (live 16, **every one the Task-19 `V5-IDS`/`V5-ATTRIB`/`V5-COUNT` series — a hard collision**; arch **0**), phrase `county or ISD` ×1 register only. Never revisited since the queue was compiled.
- `L41` **Residual (V8)** — KEEP — `registry verification` — greps run: `\bV8\b` (live 0 / arch 0 / BS 0 / TOC 0), phrase `commenced-date capture` ×1 register only. Zero record presence of any kind.
- `L44` **Residual (V10)** — KEEP — `registry verification` — greps run: `\bV10\b` (live 3, arch 6). Decisive: *"Wording sign-off, V10 citator pass, V13 stay open."* (`session-log.md:9071`, `## 2026-08-13 (#66) — RULING RUN: ~20 open queue items ruled one by one (design `) — **Michael's own ruling run left it open by name.**
- `L45` **Residual (V13)** — KEEP — `registry verification` — greps run: `\bV13\b` (live 1 — the same `#66` sentence above; arch 3, all carry-lines), phrase `bidirectional exposure` ×1 register only.
- `L47` **Residual (V11)** — KEEP — `registry verification` — greps run: `\bV11\b` (live 0 / arch 3, all carry-lines), phrase `simple or compound` ×1 register only.
- `L48` **Residual (V12)** — KEEP — `free-standing` — greps run: `\bV12\b` (live 0 / arch 2, carry-lines), phrase `public-entity prompt` ×1 register only. **Carries no question — it is the record that public-entity prompt payment was CONSIDERED AND EXCLUDED.** Not in `anti-resurrection-ledger.md` (checked, 4,084 B, five headings, no `V12`), so this row is its only home.
- `L51` **Residual (V14a)** — KEEP — `PR-3 / probate ladder` — greps run: `\bV14a\b` (live 0 / arch 4). `archive:4605` records V14a as the flagged consequence of Michael's V14 ruling; the vehicle question is untouched.
- `L52` **Residual (V16, narrowed)** — KEEP — `PR-3 / probate ladder` — greps run: `\bV16\b` (live 0 / arch 4). `archive:4594` *"**V16 SPLIT**, schema half gone, legal half"* — the row already states its own narrowing correctly.
- `L55` **Residual (V15, survival half)** — KEEP — `PR-3 / probate ladder` — greps run: `\bV15\b` (live 0 / arch 4). `archive:4619` *"The survival half of V15 is live but unresolved and needs case law; same shape as V4."* Row is accurate as written, Claude-correction and all.
- `L61` **Tex. R. Civ. P. 204.1** — KEEP — `free-standing` — greps run: `204.1` (live **1** — `session-log.md:9090`, the `#66` IME-hook deferral the row already quotes; BS 0). *"IME HOOK: DEFERRED WITH SHAPE"* — deferred in the ruling's own words; the row says *"Stays open by design."* Accurate.
- `L105` **`legal-rule-registry-draft-entries-medical-billing.md`** (Entries 1, 3, 6–9) — KEEP — `registry verification` — greps run: filename (live 6, none an answer), `1(c-3)` (live 0 / arch 8, all carries). Decisive: *"because Entry 1(c-3) is Michael's to rule on"* (`archive:5145`). File still headed *"ALL ENTRIES UNVERIFIED"* (`session-log.md:8237–8238`).
- `L106` **`time-tracker-fee-basis-profiles-design.md`** — KEEP — `money module (no row)` — greps run: filename (live **1**, a line-cite only; arch 12, all fold-ins). Decisive: *"**DRAFT, not canonical**: executed in a Code session at Michael's direction, needs design-space review"* (`archive:5598`). No adoption ruling exists. The §3 claims table also does not exist: *"No case-event/CE table, no time_entries, no claims, no `case_links`."* (`BUILD-STATE.md:83`) — premise intact both ways.
- `L108` **`case-heartbeat-walkthrough-capture-2026-07-25e.md`** (H35–H41) — KEEP — `free-standing` — greps run: filename (live 0 / arch 1) and **each of H35–H39, H41 individually: all 0 in the live log**. Only H40 was ruled (`#66`) and the row records it. The remaining six have no other register home (hardened audit §6 defect 3: *"the only H-series row heads in the file are `H43` and `H12-v`"*).
- `L109` **`…-2026-07-25f.md`** (H42–H58) — KEEP — `free-standing` — greps run: **H42, H44–H49, H51–H58 individually: all 0 live**; `H43` live 6 (a register row head, different item). Only H50 ruled; row records it.
- `L110` **`apil-2025-course-book-mining-pass2.md` §8** (H59–H67) — KEEP — `free-standing` — greps run: **H59, H61–H63, H65–H67: all 0 live**; `H64` live **1** (the 204.1 designation-acts framing at `#66`). Only H60 ruled; row records it.
- `L111` **`apil-2025-course-book-mining-pass3.md` §10** (H68–H83) — KEEP — `free-standing` — greps run: **H68–H76, H78–H82: all 0 live**; `H83` live 4 (range endpoints only). Only H77 ruled; row records it, including *"Ruled ≠ authorized."* Noted, not proposed: `precedential_status` is also **FLP/CourtListener's own field name**, and `#103` records it *"is not failing — it is answering a different question, correctly"* (`session-log.md:4392`) — a name collision, not a change to H77.
- `L113` **`registry-courtlistener-integration-design.md`** — KEEP — `registry verification` — greps run: filename (live 8 — all `V-8` hazard-recording or DO-NOT-touch lines; `session-log.md:4983` *"`registry-courtlistener-integration-design.md` was NOT edited"*). Webhook-vs-email and cite-validation-pull-forward untouched. `hosting` returns 0 in BUILD-STATE, so the premise cannot be shown stale.
- `L114` **`criminal-appointment-intake-and-docket-enhancements.md`** — KEEP — `free-standing` — greps run: filename (live 2, both incidental line-cites), `Hill Country` / `appointee`. Decisive: *"Michael to rule which appointee names count as his"* (`archive:5733`) — never ruled.
- `L122` **CR-2** — KEEP — `free-standing` — greps run: `\bCR-2\b` (live **0** / arch **0** / BS 0 / TOC 0), `prosecutor` (live 0, BS 0) against control `criminal` live 81. **Named nowhere in either audit** (hardened §5.5). §5 Q1 (cause-level vs docket-entry-level assignment) untouched. *Worth noting for the sitting, not proposed as an annotation: the row's "roster half is CD-1 directory substrate" now has its substrate — CD-1 COMPLETE 2026-08-19.*
- `L123` **CR-3 (the criminal requirement)** — KEEP — `free-standing` — greps run: `\bCR-3\b` (live **16**, BS 3, arch 7 — **every single one the TxDOT crash-report form**). Decisive: *"these two docs **\"CR-3\" means the CRASH REPORT**, never CR-3 the criminal requirement."* (`session-log.md:9192`, twenty-third runner line) and `BUILD-STATE.md:149` *"**COLLISION FLAGGED, NOT RENAMED:** `CR-3` also means the TxDOT crash-report form at IN-2"*. **The row already carries its own collision note — it is self-protecting, which is why it needs no annotation and why the `V17` row does.**
- `L124` **CR-4** — KEEP — `free-standing` — greps run: `\bCR-4\b` live 0 / arch 0 / BS 0 / TOC 0.
- `L125` **CR-5** — KEEP — `free-standing` — greps run: `\bCR-5\b` 0 everywhere; `custody status` / `bench.warrant` 0 in live + BS.
- `L126` **CR-6** — KEEP — `free-standing` — greps run: `\bCR-6\b` 0 everywhere. **Named nowhere in either audit.** §5 Q7 (what marks a transcribed note ATTORNEY-REVIEWED) untouched.
- `L128` **CR-8** — KEEP — `free-standing` — greps run: `\bCR-8\b` 0 everywhere; `offer version|plea.offer|offer lifecycle` 0 in live + BS.
- `L129` **CR-9** — KEEP — `free-standing` — greps run: `\bCR-9\b` 0 everywhere. **Named nowhere in either audit.**
- `L131` **CR-11** — KEEP — `free-standing` — greps run: `\bCR-11\b` (live 1, arch 4, BS 1 — **all of them the range `CR-1–CR-11`**, never the item).
- `L136` **Texas Ethics Opinions 532 and 533** — KEEP — `free-standing` — greps run: `532`, `533`, `Ethics Opinion` across live/arch/BS/`Go_Live_Gates.md`. One substantive hit only, the origin (`archive:5159`). **And the row's own "should a go-live gate say so?" limb is answerable from the staged gates file: no gate names Op. 532** — `benchmark`/`pooling`/`532`/`third.party` return nothing in `Go_Live_Gates.md`; gate 2 covers multi-user generically. The gap is real and unaddressed.
- `L172` **D-CL1-1 · D-CL1-2 · D-CL1-3** — KEEP — `PR-3 / probate ladder` — greps run: each ID (live 0/0/1; the one live hit is `session-log.md:6674` listing D-CL1-3 among items *"left ⬜"*). Decisive: *"**`case_links` STILL DOES NOT EXIST — the CL-1 firewall held.** D-CL1 items stay unruled"* (`BUILD-STATE.md:34`), corroborated by the gate-3 run's probe `C5 to_regclass('public.case_links') | null` (`session-log.md:3433`). The 2026-08-15 annotation is accurate as written.
- `L173` **CL-3** — KEEP — `free-standing` — greps run: `\bCL-3\b` (live **0** / arch 4, all creation-and-issue lines). **Named nowhere in either audit.** Row's *"NOT authorized for build"* holds; UIM §5 Q1 (inherit as linked references or copies; privilege/work-product difference) untouched.
- `L174` **UM-1 · UM-2 · PR-GATE-1 · MIN-1** — KEEP — `free-standing` — greps run: each ID (live 0/0/0/**2**; the two `MIN-1` live hits are a **filename-pattern collision** — `session-log.md:7234` records an `IN-1` grep pattern that *"also matches `MIN-1`"*, not the ID). Row's own words hold: *"the four unruled proposals; none blocks any authorized slice."*
- `L175` **CIV-1** — KEEP — `free-standing` — greps run: `\bCIV-1\b` (live 0 / arch 2). Civil-litigation damages still unspecified; no design session run.
- `L176` **PROB-1 · PA-1** — KEEP — `PR-3 / probate ladder` — greps run: `PROB-1` (live 0 / arch 3), `PA-1` (live 0 / arch 1). The probate-ladder pass is still DEFERRED pending Domser.
- `L199` **FE-§11.1 — Bates-stamping module** — KEEP — `free-standing` — greps run: `FE-§11.1` (live 1 — `session-log.md:9213`, a `#65` verification list confirming the row landed; BS 0) and **`bates` case-insensitive: 0 in the live log and 0 in BUILD-STATE.** Genuinely banked, genuinely untouched.
- `L200` **FE-§11.2 — remaining template conversions** — KEEP — `free-standing` — greps run: `FE-§11.2` (live 0 except the same `#65` list; BS 0). Explicitly OUT of FE-D1 and still out.
- `L202` **FE-13 — instrument transform** — KEEP — `discovery slice (FE-9/11/13, Q-FE*)` — greps run: `FE-13` (live **0**, BS 0, arch 10 — all creation/gating). `#63`'s OUT-of-FE-D1 disposition stands; nothing since.
- `L208` **FE-16 — citation bank per instrument class** — KEEP — `registry verification` — greps run: `FE-16` (live **0**, BS **0**, arch 4). **Named nowhere in either audit.** Row's *"Q-6 posture UNCHANGED"* still true — `Q-6` bars CourtListener integration and nothing has changed it.
- `L215` **`FE-D1A-1`** — KEEP — `free-standing` — greps run: `FE-D1A-1` (live 11, BS **6**, register 2). Decisive, and it is the newest state in the repo: *"**THE ONE ACT THIS BATCH ASKS OF MICHAEL IS `FE-D1A-1`, FILED ⬜ OPEN WITH ITS FULL QUESTION TEXT.**"* (`BUILD-STATE.md:2`) and *"**`FE-D1A-1` IS NOW THE NEAREST ACT — one ruling, its own FRESH Code session, never the queue runner; hear the slice's §5 consequence first**"* (`BUILD-STATE.md:152`). Minted by runner 85 on 2026-09-01, **postdating both audits**. Untouched, correctly stated, and the single most consequential open row in the slice.

---

## SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L18 | Residual (V1) | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L23 | Residual (V3) | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L25 | Residual (V6) | LIVE, UNCHANGED | ANNOTATE-KEEP | MED | registry verification | Y |
| L35 | Residual (V2) | LIVE, UNCHANGED | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L37 | Residual (V4) | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L38 | Residual (V5) | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L41 | Residual (V8) | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L44 | Residual (V10) | DEFERRED / HELD IN MICHAEL'S WORDS (#66: "stay open") | KEEP | HIGH | registry verification | Y |
| L45 | Residual (V13) | DEFERRED / HELD IN MICHAEL'S WORDS (#66: "stay open") | KEEP | HIGH | registry verification | Y |
| L47 | Residual (V11) | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L48 | Residual (V12) | LIVE, UNCHANGED (record line, no question) | KEEP | HIGH | free-standing | Y |
| L51 | Residual (V14a) | LIVE, UNCHANGED | KEEP | HIGH | PR-3 / probate ladder | Y |
| L52 | Residual (V16, narrowed) | LIVE, UNCHANGED | KEEP | HIGH | PR-3 / probate ladder | Y |
| L53 | Residual (V17) | LIVE, UNCHANGED — **ID COLLISION** | ANNOTATE-KEEP | HIGH | PR-3 / probate ladder | Y |
| L55 | Residual (V15, survival half) | LIVE, UNCHANGED | KEEP | HIGH | PR-3 / probate ladder | Y |
| L61 | Tex. R. Civ. P. 204.1 | DEFERRED / HELD (#66 "DEFERRED WITH SHAPE") | KEEP | HIGH | free-standing | Y |
| L84 | TRCP 194.2(a) | LIVE, UNCHANGED (new clean-authority evidence) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L85 | TRCP 190.3(b)(1) | LIVE, UNCHANGED (no registry entry exists) | ANNOTATE-KEEP | MED | registry verification | Y |
| L87 | TRCP 166a(d-1),(e-1),(g-1) | PART-ANSWERED: "what changed" + edition limb on record | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L88 | TRCP 99(b) | LIVE, UNCHANGED | ANNOTATE-KEEP | MED | registry verification | Y |
| L97 | AMA CPT license terms | WORLD-STATE-STALE (operating default already set by Michael) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L104 | Entry 2 redraft v2 | (j) mechanism ruled at #66/H77; (e),(f) LIVE | ANNOTATE-KEEP | MED | registry verification | Y |
| L105 | medical-billing Entries 1,3,6–9 | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L106 | time-tracker-fee-basis-profiles-design.md | LIVE, UNCHANGED | KEEP | HIGH | money module (no row) | Y |
| L108 | heartbeat capture e (H35–H41) | LIVE, UNCHANGED (H40 ruled, recorded) | KEEP | HIGH | free-standing | Y |
| L109 | heartbeat capture f (H42–H58) | LIVE, UNCHANGED (H50 ruled, recorded) | KEEP | HIGH | free-standing | Y |
| L110 | apil mining pass2 §8 (H59–H67) | LIVE, UNCHANGED (H60 ruled, recorded) | KEEP | HIGH | free-standing | Y |
| L111 | apil mining pass3 §10 (H68–H83) | LIVE, UNCHANGED (H77 ruled, recorded) | KEEP | HIGH | free-standing | Y |
| L113 | registry-courtlistener-integration-design.md | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L114 | criminal-appointment-intake…md | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L122 | CR-2 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L123 | CR-3 (criminal requirement) | LIVE, UNCHANGED — **ID COLLISION, self-flagged** | KEEP | HIGH | free-standing | Y |
| L124 | CR-4 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L125 | CR-5 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L126 | CR-6 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L128 | CR-8 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L129 | CR-9 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L130 | CR-10 | WORLD-STATE-STALE (six→seven; 29 & 32 VERIFIED) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L131 | CR-11 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L136 | Tex. Ethics Ops 532 / 533 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L172 | D-CL1-1 · D-CL1-2 · D-CL1-3 | LIVE, UNCHANGED (premise confirmed at HEAD) | KEEP | HIGH | PR-3 / probate ladder | Y |
| L173 | CL-3 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L174 | UM-1 · UM-2 · PR-GATE-1 · MIN-1 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L175 | CIV-1 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L176 | PROB-1 · PA-1 | LIVE, UNCHANGED | KEEP | HIGH | PR-3 / probate ladder | Y |
| L191 | FE-9 | WORLD-STATE-STALE ("gated behind CD-1" false at HEAD) | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L195 | FE-11 | WORLD-STATE-STALE (same CD-1 gate) | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L199 | FE-§11.1 (Bates) | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L200 | FE-§11.2 (template conversions) | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L202 | FE-13 | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L204 | FE-14 | WORLD-STATE-STALE (**entry 27 VERIFIED 08-17 — gate lifted**) | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L206 | FE-15 | WORLD-STATE-STALE (#63 disposition EXECUTED; posture built) | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L208 | FE-16 | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L210 | FE-17 | LIVE, UNCHANGED (annotation propagated to FE-6 §3.2) | ANNOTATE-KEEP | MED | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L215 | FE-D1A-1 | LIVE, UNCHANGED — newest row in the register | KEEP | HIGH | free-standing | Y |

**Totals: 55 rows — 40 KEEP, 15 ANNOTATE-KEEP, 0 CLOSE, 0 CLOSE-SPLIT, 0 RECLASSIFY-ACT, 0 MICHAEL-IN-WORDS.**

---

## §3 — UNVERIFIABLE-HERE

1. **`docs/specs/legal-rule-registry-criminal-plea-and-costs.md` per-entry status (L130).** The
   record says seven propositions, five verified (`BUILD-STATE.md:103`; `session-log.md:3881`
   *"criminal 7,"*), but the file is not staged. **A full-text read at HEAD settles the exact count
   and which of 28–34 are VERIFIED.**
2. **`docs/specs/time-tracker-fee-basis-profiles-design.md`'s current DRAFT banner and §3 (L106).**
   The record's last word is *"DRAFT, not canonical"* (2026-07-23), and many fold-ins have edited it
   since. **Reading the file's header at HEAD settles whether it still says DRAFT.**
3. **`docs/specs/legal-rule-registry-draft-entries-medical-billing.md` Entry 1(c-3), 2(e)/(f)/(j)
   wording (L104, L105).** Only its heading is quoted in the record (*"ALL ENTRIES UNVERIFIED"*).
4. **Whether the built billing module stores CPT descriptor text (L97).** Requires `src/` or the live
   database, both out of reach and out of design-side scope (`Q-PR3-1` unruled). BUILD-STATE says
   only *"fuzzy CPT mapping"*.
5. **The AMA CPT licence text itself (L97).** Not in the repo; acquisition is Michael's hand under
   SOURCING. Nothing in the staged evidence reads the licence — the record carries a *"conservative
   reading"* only.
6. **`docs/specs/fe-d1-build-slice.md`'s FE disposition table (L191, L195, L202, L204, L206, L210).**
   The `#63 DISPOSITION` lines quoted in the rows are the record's account of it; the table itself is
   unstaged. `#81` reports a gap in it (FE-4–FE-7 have no IN/OUT row) but that is outside my slice.
7. **`docs/specs/form-engine.md` §3.2 (L210).** `#81` says FE-17's from-birth annotation was
   *"Restated in the FE-6 spec §3.2"*; the file is not staged, so the restatement is verified only
   from the log.

## §4 — METHOD NOTES AND WHAT THIS PASS DOES NOT ESTABLISH

- Every count above came from `grep -c -o -E "\bID\b"` against the four staged corpora
  (`session-log.md`, the archive, `BUILD-STATE.md`, `session-log-toc.md`) plus the register. Zero
  results were always paired with a firing control on the same file.
- **Four ID collisions were found or confirmed by reading rows rather than matching strings:**
  `V17` (§352.051(2) residual vs. the closed practice-area ruling — `id-collision-report.md:290` had
  it as *"unsure whether same subject"*; **this pass resolves it as two subjects**), `V5` (residual vs.
  the Task-19 `V5-IDS`/`V5-ATTRIB`/`V5-COUNT` series), `V6` (residual vs. ROUTE-C wording IDs
  `V6-33`/`V6-34`), and `MIN-1` (ID vs. an `IN-1` grep pattern that matched it). `CR-3` was already
  flagged in its own row and in BUILD-STATE.
- **`HD-10` was checked against every TRCP row in the slice and reaches none of them.** Its "two
  register rows" are L86 and L1013; `grep -n "195.2"` on the register returns exactly those two.
- This pass adjudicates nothing. Fifteen annotations are PROPOSED; every one of them is add-only and
  none closes a row. **The default was KEEP and the burden was on the closure — no closure met it.**


---

<a id="slice-b2"></a>

## ===== SLICE B2 =====

# SWEEPER B2 — 21 rows, register L231–L269 (CD-3…CD-13, IN-1…IN-7, DE-1, DE-2, WF-1)

Read-only pass, 2026-09-01, against the staged HEAD `7f02131` set. Nothing adjudicated, nothing edited.
Every row below was read whole, its ID grepped word-bounded across the live log, the closed archive,
BUILD-STATE, the TOC and the register, and its subject re-grepped by distinctive phrase against
**flattened** copies of the log/archive/BUILD-STATE/TOC (wrapped-heading safety), with a firing control
each time.

**Headline: no row in this slice is closable.** Ten take annotations; eleven are LIVE and untouched.
Three cross-cutting findings drive most of the annotations and are stated once here:

- **F1 — the Phase-1b premise under four IN rows was overtaken on 2026-08-21 and nobody noticed.**
  `IN-1`, `IN-2`'s extraction half, `IN-5` and `IN-7` all classify document understanding as
  *"the Phase-1b local-LLM capability class"* / *"GPU-arm gated."* `#130` reversed `H12`: the app calls a
  hosted model on the firm's own BAA-covered account. The 2026-08-24 audit then grouped those same four
  rows as **"Hardware- or authorization-gated … Phase 1b / the GPU arm"** — three days *after* the reversal.
- **F2 — three of this slice's schema premises were measured before the FE-D1 build touched the same table
  and before four later migrations.** `IN-3` (the §5.3 test, below) and `IN-2` both carry pre-2026-08-20
  measurements that BUILD-STATE still restates at HEAD alongside the FE-D1 extension claim, unreconciled.
- **F3 — `WF-1` carries a cross-reference falsified the day after it was written.**

---

## Non-KEEP proposals

### CD-3 — Insurer entity subtype (L231)

1. **Question.** Two limbs: (a) is insurer entity subtype (county mutual / foreign insurer / domestic
   company) directory-level data with a defendant-slot-change flag; (b) sub-question (UIM capture §5 Q5) —
   is entity-type-driven removal-exposure flagging in scope for the deadline/strategy engine, "or is that
   attorney-only analysis the software should merely annotate?"
2. **Greps.** `CD-3` word-bounded: log 2 (both the #74/runner-29 collision check — *"found the CD series at
   **CD-1, CD-2, CD-3 and nothing higher**"*), archive 5, register 5, BUILD-STATE 0, TOC 0. Flattened
   subject greps `county mutual` / `foreign insurer` / `diversity`: **0 / 0 / 0** across log, archive,
   BUILD-STATE, TOC (control `queue runner` = 16 in the same flattened log). `entity subtype`: archive 1.
3. **Call — CLOSED-BY-LATER-RULING on limb (b) only; limb (a) LIVE.** Limb (b) was answered at issuance, in
   Michael's group ruling, and the row already carries the answer on its face.
   `docs/archive/session-log-archive-2026-07-21_2026-08-12.md`, entry
   `## 2026-08-12 (#58) — REQ-CAPTUREs 4 & 5 reconciled and GROUP-RULED: UIM-UDJA transform + defi`,
   staged **L702**: *"reconciled against `3a4db71`/#57 before staging, GROUP-RULED by Michael 2026-08-12**"*;
   staged **L712–713**: *"REQ-06→**CD-3** (insurer entity subtype county-mutual/foreign/domestic;"* /
   *"defendant-slot-change flag; flag-only per registry discipline); REQ-07→no ID (CD-1/CD-2"*.
4. **Disconfirmation.** The ruling reaches the POSTURE, not the DATA MODEL. Nothing anywhere rules that the
   subtype vocabulary enters `contact-directory.md` §5/§6 — and the row itself says additions there are
   "spec-level acts under its living-spec posture," i.e. Michael's. Register L229 confirms the same
   convention is still live: *"Adding directory vocabulary is a spec-level act on the living spec (the CD-3
   precedent), so nothing was added."* So the row survives on limb (a).
5. **PROPOSED: ANNOTATE-KEEP — MED.** Annotation substance: the §5 Q5 sub-question is discharged (#58 group
   ruling, flag-only), so what remains for a sitting is only the vocabulary/data-model act.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **CD-3 — Insurer entity subtype (county mutual / foreign insurer / domestic company) as directory-level data, wi`

### CD-4 — paste `partyRegistry.ts` / `roster.ts`, or route to Code (L235)

1. **Question.** Should the two authoritative role-vocabulary source files be pasted into a design chat so
   the CD-2 mining pass can mark BUILT vs CANDIDATE, "or should a Code session run the comparison instead"?
2. **Greps.** `CD-4`: log 4, BUILD-STATE 2, register 3, collision report 1, TOC 1, archive 0.
   `TAG-CHECK`: log 3, BUILD-STATE 1. `partyRegistry`: log 4, BUILD-STATE 2, archive 3.
3. **Call — LIVE, but WORLD-STATE-STALE in its recital.** The row's recital is that the design session
   "deliberately did not open them." A later DESIGN session did open them:
   `docs/record/session-log.md`, entry
   `## 2026-08-15 (#86) — CHAT-DISPATCH TASK 12: the PR-3 re-parenting migration proposal — the hierarchy is not a`,
   staged **L6765–6766**: *"**This session read `src/domain/{caseTypes,types,roster}.ts` and the pages,"* /
   *"and every Class-A/B/C finding above is undrivable without them**"*, and **L6767–6768**:
   *"while #74 recorded *not*"* / *"reading `roster.ts` as *"the honest gap"* leaving ~60 CD-2 rows
   `TAG-CHECK: NOT RUN`"*. BUILD-STATE at HEAD, `## For design side` region, staged **L147**:
   *"*(#86 read `roster.ts` and found the `sideSetFor()` defect there — evidence the gap was load-bearing.)*"*.
4. **Disconfirmation.** Does #86's read ANSWER CD-4? No — twice over. (i) The ~60 rows still carry the
   marker: BUILD-STATE L147 says in the present tense *"so ~60 rows carry `TAG-CHECK: NOT RUN`"*; the
   comparison was never run. (ii) Whether that read was even permitted is itself an open row —
   `Q-PR3-1` at register L886 — so #86 is not a precedent CD-4 can lean on. Not a DUPLICATE of `Q-PR3-1`
   either: CD-4 asks for an ACT to resolve ~60 rows; `Q-PR3-1` asks whether a past read was sanctioned.
5. **PROPOSED: ANNOTATE-KEEP — HIGH.** Annotation substance: cross-link `Q-PR3-1`; record that one of the
   two named files has since been read by a design session (#86) while the ~60 `TAG-CHECK: NOT RUN` rows are
   unchanged — the restraint the row praises was not repeated, and CD-4's second limb (route it to Code) is
   still unchosen.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **CD-4 — Should the two source files that hold the authoritative role vocabulary — `src/domain/partyRegistry.t`

### IN-1 — Answer-mining for discovery hooks (L250)

1. **Question.** Is answer ingestion a distinct pipeline step, and where in the UI do suggestions surface?
2. **Greps.** `IN-1` word-bounded: log 22, register 14, BUILD-STATE 1, archive 4, TOC 2, collision report 1
   (`IN` row: *"Intake pipeline IN-1..IN-7; bare `IN1/IN2/IN3` = shorthand"* — no true collision).
   Anti-resurrection ledger: **0** `IN-` rows of any kind (control: the ledger's 61 lines carry `CD-1`, `FE-1`).
3. **Call — WORLD-STATE-STALE (capability premise), question LIVE.** The design question is untouched
   (BUILD-STATE L128: *"IN-1 and IN-3 have NO ruling to elaborate"*). What moved is the capability route:
   `docs/record/session-log.md`, entry
   `## 2026-08-21 (#130) — Design, VOICE, Opus 5: H12 REVERSED — app calls the model on a BAA-covered account; H20,`,
   staged **L1460**: *"- **H12 — REVERSED. CONFIRMED.** Yesterday's ruling (app assembles a bundle; Michael
   carries it into a chat by hand; no client medical content reaches a model API) is superseded. The app
   calls the model directly, on the firm's own BAA-covered API account."*
4. **Disconfirmation.** Three tries, all survived: (i) H12 is scoped to the disclosures model call, so it is
   NOT a licence for IN-1 — correct, and the annotation says so rather than claiming the gate is gone.
   (ii) Was the local arm re-affirmed after? Yes, and it CO-EXISTS rather than excludes — runner line
   `## 2026-08-22 — QUEUE-RUNNER batch (runner line; EIGHTY-FIRST invocation) — one docs-only packet, TWO routing r`,
   staged **L1082**: *"**the local-model-on-the-P1 fallback was never rejected and must be preserved**"*.
   (iii) Did anything after 2026-08-21 re-gate document understanding to the GPU arm? Flattened grep over the
   post-#130 log for `GPU` / `phase 1b` / `local model` returns only the two lines above plus a
   GPU-telemetry marker item. BUILD-STATE L94 still reads *"Medical has NO PDF/bill ingestion (Phase 1b
   GPU-gated)"* for the medical module — so the gate is intact where it was ruled, and only IN-1's
   *inference* that document understanding is available only that way is stale.
5. **PROPOSED: ANNOTATE-KEEP — MED-HIGH.** Annotation substance: a hosted, BAA-gated model-call path is now
   ruled architecture (#130); whether IN-1's document understanding may ride it is UNRULED and Michael's, and
   the 2026-08-24 audit's placement of IN-1 under "Phase 1b / the GPU arm" (its L210) should not be relied on.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **IN-1 — Answer-mining for discovery hooks: when a defendant's filed answer is ingested, flag affirmative pleadi`

### IN-2 — Crash-report field extraction + discrepancy flags (L251)

1. **Question.** HOME half RULED (`contact-directory.md` §7); the EXTRACTION half is the open one, plus
   "where does source attribution live" and the §5.3 confidence/blocking sub-question (the blocking limb
   rides IN-4).
2. **Greps.** `IN-2`: log 21, archive 21, register 20, BUILD-STATE 5, TOC 2, collision report 3. The
   collision report's `CR-3` row is live here — *"**2 meanings for `CR-3`**: criminal requirement CR-3
   (queue, OPEN) vs the TxDOT CR-3 crash-report form (IN-2 spec …)"* — IN-2's `CR-3` is the TxDOT form; the
   row was read, not the ID.
3. **Call — LIVE with a stale MEASUREMENT (WORLD-STATE-STALE, narrow).** The row's closing sweep reads
   *"word-bounded `vin`/`vehicle`/`instrumentality` return ZERO across the schema and all three migrations."*
   Three migrations were the whole population when it was measured (#84, 2026-08-15) — the archive names
   exactly `2026-07-28-api-role-grants.sql`, `2026-07-28-cl2-client-dimension.sql`,
   `2026-08-12-cd1-contact-directory.sql`. The live log names four more since:
   `2026-08-16-privilege-tier-no-default.sql`, `2026-08-18-grok-review-fixes.sql`,
   `2026-08-19-gate10-pii-columns.sql`, `2026-08-20-fe-d1-form-engine.sql`. And the table the sweep ran over
   grew: `docs/record/session-log.md`, entry
   `## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED per TOC-6 — no `#nn`, no runner o`,
   staged **L1762**: *"**`db/schema.sql` is 41 tables; the live database is still 37, and the gap is the
   honest state.**"*
4. **Disconfirmation.** Would any of the four later migrations plausibly add vehicle identity? On the
   record, no — gate-10 is `parties`/`party_pii` PII columns (#113, L3104), FE-D1 is `form_*` + seven
   nullable `generated_documents` columns, privilege-tier is four `alter column` statements. So the
   CONCLUSION probably survives; it is the EVIDENCE that no longer covers the corpus it claims. Also note
   the row's Phase-1b sentence takes finding **F1** above, exactly as IN-1 does.
5. **PROPOSED: ANNOTATE-KEEP — MED.** Annotation substance: (a) the "three migrations" sweep now covers 3 of
   at least 7 migration files and `db/schema.sql` has grown 37 → 41 tables since — re-measure before relying
   on it; (b) the extraction half's capability route is affected by F1 (H12 reversed).
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **IN-2 — Crash-report field extraction + discrepancy flags: structured extraction of CR-3 fields (VINs, carrier `

### IN-3 — Held sets with service triggers (L252) — **the §5.3 test**

1. **Question.** "What does the HOLD lifecycle look like in the document model?" (trigger source
   PRE-ANSWERED: manual only, per Q-6).
2. **Greps.** `IN-3`: log 11, register 11, BUILD-STATE 2, archive 4, TOC 2; hardened audit 1 (§5.3);
   audit-08-24 1 (the `Q-IN3-3` group). Anti-resurrection ledger 0.
3. **Call — WORLD-STATE-STALE, in the *weak* form: premise UNVERIFIED-AT-HEAD and internally contradicted;
   question fully open. BOTH, in the brief's terms.** The hardened audit's §5.3 says
   (`attorney-review-queue-audit-HARDENED-2026-08-25.md`, staged **L193**):
   *"**And three rows rest on a schema fact measured before that build:** `IN-3`, `WF-3` and `Q-RE-5` all
   rest on `#83`'s *"`generated_documents` has no status column of any kind."*"* — that half is **correct**.
   Source: `docs/record/session-log.md`, entry
   `## 2026-08-15 (#83) — CHAT-DISPATCH TASK 9: IN-1 and IN-3 spec drafts — two items open because the DESIGN quest`,
   staged **L7264**: *"  `generated_documents` has **no status column of any kind**, its `doc_type` CHECK
   admits one value,"*.
   BUILD-STATE at HEAD carries both claims, five days apart, exactly as the audit says — staged **L83**:
   *"**Nor for IN-3: `generated_documents` has NO status column and NO set/parent column (#83)."* and staged
   **L99**: *"`generated_documents` EXTENDED, not forked** — seven nullable columns incl. the answer snapshot
   (FE-8 retention half) and posture (FE-15)"*.
   **What the audit did NOT establish, and what I could not establish either: that the premise is FALSE.**
   The seven columns are enumerated nowhere in the staged corpus — only two are named, the **answer
   snapshot** (FE-8's retention half) and **posture** (FE-15), and FE-15's posture is
   *original / amended / supplemental* as a render parameter (register L206), which is an instrument
   posture, not a workflow status and not a set/parent grouping key. **UNVERIFIABLE-HERE:** settling it needs
   `db/migrations/2026-08-20-fe-d1-form-engine.sql`, `db/schema.sql`, or `docs/specs/fe-d1-build-slice.md`,
   none of which is staged.
   **And the row's second premise limb is INTACT at HEAD:** *"nothing can fire the trigger"* — BUILD-STATE
   L83 still reads *"No case-event/CE table, no time_entries, no claims, no `case_links`."*
   **The question is untouched either way**: no ruling anywhere describes a HOLD lifecycle, and the FE-D1
   amendment slice (#140) proposes `generated_document_paragraphs` and `generated_documents.client_id`,
   PROPOSED and unauthorized — still not a status column.
4. **Disconfirmation.** Tried three ways. (i) Could a later entry have re-measured the table? The only
   post-FE-D1 `generated_documents` mentions in the live log are L121 (the amendment slice's proposals) and
   L1561/L1752 (the same seven-column statement) — no re-measurement. (ii) Could the LIVE database have the
   columns? No — the migration is unrun and BUILD-STATE L99 says so (*"migration still UNRUN (`MIG-1`)"*),
   so the premise is still literally true of the live DB and only questionable of `db/schema.sql`.
   (iii) Could `posture` be read as the status column? Only by a build session misreading FE-15; it cannot
   express HOLD.
5. **PROPOSED: ANNOTATE-KEEP — HIGH.** Annotation substance: the schema sentence is a 2026-08-15 measurement
   of a table that FE-D1 extended on 2026-08-20 with seven nullable columns whose names are not on the
   record; `db/schema.sql` (41 tables) and the live database (37) disagree because `MIG-1` is unrun;
   **re-measure before ruling, and do not treat the sentence as current evidence.** The QUESTION is unchanged
   and the trigger-source limb is intact.
   **Verdict on §5.3 as asked: the claim is RIGHT that IN-3 rests on a pre-FE-D1 schema fact and that
   BUILD-STATE carries the two claims unreconciled; it is NOT established that the premise is false; and the
   question is still open. Both — a `WORLD-STATE-STALE` row, not a closable one.**
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **IN-3 — Held sets with service triggers: a document/set status of HOLD with a defined trigger event (answer fil`

### IN-5 — Disclosure-mining (L254)

1. **Question.** Where do the four extracted categories surface, and how do they interact with IN-1's
   answer-mining suggestions?
2. **Greps.** `IN-5`: live log **0**, archive 9, register 3, BUILD-STATE 0, TOC 0 (control: `IN-4` returns 4
   in the same live log, so the zero is real). Flattened `disclosure-mining`: log 0, archive 1 — i.e. the
   subject appears exactly once, at its origin.
3. **Call — WORLD-STATE-STALE (capability premise only), question LIVE.** Same F1 finding as IN-1: the row
   ends *"Document-understanding capability class, Phase-1b-adjacent, like IN-1."*
4. **Disconfirmation.** Could the disclosures RC-1 thread have overtaken IN-5? No — that thread generates
   **our** disclosures from a medical chronology (#135, the drop zone, the facility-selection ruling); IN-5
   ingests **the other side's** disclosures. Opposite direction, different document, no overlap. Last stated
   open at archive L964: *"FE-8–FE-12, IN-4, IN-5, WF-1, IN-2's extraction half stay open."*
5. **PROPOSED: ANNOTATE-KEEP — MED.** Annotation substance: F1 — the hosted BAA-covered model-call path is
   ruled architecture; "Phase-1b-adjacent" is no longer the record's only capability route, and whether IN-5
   may ride the hosted path is unruled.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **IN-5 — Disclosure-mining: when the other side's disclosures are ingested, extract the four categories the atto`

### IN-7 — Cross-document contradiction detection (L256)

1. **Question.** Link answer assertions to contrary evidence in the produced record; manual structured links
   first; flags only, never conclusions. (No sub-question — the row is a scoped requirement awaiting design.)
2. **Greps.** `IN-7`: live log **0**, archive 4, register 2, BUILD-STATE 0, TOC 0. Flattened
   `cross-document contradiction`: log 0, archive 1.
3. **Call — WORLD-STATE-STALE (capability premise only), question LIVE.** Same F1: *"Document-understanding
   capability class, Phase-1b-adjacent, like IN-1/IN-5."* Issuance is group-ruled and unchanged —
   archive L739–740: *"REQ-03→**IN-7** (cross-document contradiction flags, manual"* /
   *"structured links first, Phase-1b-adjacent, flags only)"*.
4. **Disconfirmation.** The "manual structured links first" limb needs no model at all, so the F1
   annotation does not unblock the row; it only removes a false hardware dependency from the *automated*
   limb. Nothing in the register duplicates it (`same-day, same-declarant interrogatory answer` = 1).
5. **PROPOSED: ANNOTATE-KEEP — MED.** Annotation substance: F1, with the note that limb 1 (manual links) was
   never hardware-gated in the first place.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **IN-7 — Cross-document contradiction detection: link answer assertions to contrary evidence in the produced rec`

### DE-1 — Deficiency taxonomy as first-class data (L262)

1. **Question.** Three: §5 Q1 (one shared vocabulary with the responding-side objection library, or two);
   §5 Q3 (clusters assigned manually at enforcement time, or derived from tags applied at propounding time);
   §5 Q6 (should the motion renderer split one data set into several motions, and how are the conferral
   certificate and exhibit lists shared).
2. **Greps.** `DE-1`: log 11 — **but six of them are `Q-DE-1`, a different, packet-local series** (deadline
   spec §9.2; the log says so at L8156–8158: *"**DE** exists but is the *deficiency* series (DE-1, DE-2), a
   different subject"*). True `DE-1` hits: L4848, L4970, L5358, L5690, L5695, L8201. Register 9,
   BUILD-STATE 2, archive 2. Flattened `objection library` / `topic tags` / `omnibus motion`: **0 / 0 / 0**
   in both log and archive — none of the three questions is answered anywhere.
3. **Call — LIVE; the row is missing a landed spec and a ruled sibling.** A DE-1 spec exists at HEAD and the
   row does not name it: register L782 lists *"`docs/specs/de-1-deficiency-letter-template-spec-2026-08.md`"*
   among five staged files, *"**all five PROPOSED or CANDIDATE, nothing built, nothing verified**"*, and the
   log records its size (23,470 B, sha256-verified verbatim, L4883). Its own question was then RULED:
   `docs/record/session-log.md`, entry
   `## 2026-08-18 (#100) — FABLE ADJUDICATION SESSION: 24 items put, 24 ruled, zero deferrals —`,
   staged **L4846–4848**: *"- **TIER 5:** `DE1-SPEC-1` — **DATA**: authority slots carry entry number +
   status; the"* / *"renderer refuses to emit an UNVERIFIED authority without a visible flag; the registry"* /
   *"coupling is accepted as a commitment; DE-1 stays unauthorized to build."*
4. **Disconfirmation.** Does `DE1-SPEC-1` close DE-1? No, twice: it has its own ✅ row (register L796) and
   the same ruling says *"DE-1 stays unauthorized to build"* in terms. Does the spec answer §5 Q1/Q3/Q6? No —
   #100's T-24 note (L4970–4977) reports a taxonomy count correction and an unverified-authority problem,
   not a vocabulary, cluster or motion-splitting ruling. Is DE-1 a duplicate of FE-6? Its own text forecloses
   that: *"cross-linked, deliberately NOT merged"*.
5. **PROPOSED: ANNOTATE-KEEP — MED-HIGH.** Annotation substance: SPEC LANDED (T-24)
   `docs/specs/de-1-deficiency-letter-template-spec-2026-08.md`, PROPOSED — a spec is not a closure, on the
   IN-1/IN-2/IN-3 pattern; and cross-link `DE1-SPEC-1` (RULED #100 — authority slots are DATA; renderer
   refuses an UNVERIFIED authority without a visible flag; DE-1 stays unauthorized to build).
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **DE-1 — Deficiency taxonomy as first-class data: a classification vocabulary applied per item — boilerplate o`

### DE-2 — Conferral/escalation timeline engine (L263)

1. **Question.** §5 Q2 — should the software track the opponent's response-service dates and automatically
   propose a conferral fuse and escalation timeline (as proposals), or should enforcement timelines be
   created only manually?
2. **Greps.** `DE-2`: log 2 (L3971 and the L8158 series-collision note), register 5, BUILD-STATE 1,
   archive 1. Flattened `cure fuse` / `escalation_timeline`: only the register row.
3. **Call — LIVE; a named blocker cleared and the row does not say so.**
   `docs/record/session-log.md`, entry
   `## 2026-08-18 (#108) — T-26 RUN LIVE: THREE GROUP A ENTRIES VERIFIED AND TWO CONFORMED VERBATIM AT`,
   staged **L3970–3971**: *"ENTRIES 13, 2 AND 29 VERIFIED — his word, dated 2026-08-18; entry"* /
   *"13 first, so the DE-2 conference fuse's substrate is no longer pending."*
4. **Disconfirmation.** Does the row's own *"Q-6 posture untouched — triggers are MANUAL for v1"* already
   answer §5 Q2? **No, and this is the trap:** the Q-6 posture governs the TRIGGER SOURCE (docket-watch =
   CourtListener integration, unauthorized), while §5 Q2 asks whether the software may auto-propose a fuse
   from service dates it already holds — no external integration required. The issuance ruling
   (archive L743–744: *"REQ-06→**DE-2** … MANUAL triggers per Q-6 posture"*) is the same trigger-source
   point, not the auto-proposal point. Closing DE-2 on the Q-6 sentence would destroy an unanswered
   question — the `H21`/`H12` failure class in its topical form.
5. **PROPOSED: ANNOTATE-KEEP — MED.** Annotation substance: registry entry 13 VERIFIED 2026-08-18 (#108), so
   the conference fuse's legal substrate is no longer pending; and record expressly that the Q-6
   manual-trigger posture does NOT answer §5 Q2.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **DE-2 — Conferral/escalation timeline engine: letter → cure deadline → motion → hearing → compliance de`

### WF-1 — Review-folder as a workflow channel (L269)

1. **Question.** A per-matter inbox/outbox convention the software understands, with state transitions
   inferred from file arrival. (Priority "someday.")
2. **Greps.** `WF-1` word-bounded: live log 2 — **both are `Q-WF-1`, not this row** (L6844
   *"packet-local `Q-WF-1..10`"*, L6859 *"AND IT IS Q-WF-1:"*); the `\bWF-1\b` pattern matches inside `Q-WF-1`,
   which is exactly the ID-is-not-identity trap. **True WF-1 hits in the live log: ZERO.** Archive 10,
   register 4, BUILD-STATE 0, TOC 0. Hardened audit L207 names `WF-1` among the 27 rows *"named nowhere"* in
   the 08-24 audit.
3. **Call — WORLD-STATE-STALE (cross-reference), question LIVE.** The row says *"Kin to the design-side
   email-workflow requirements doc (PROPOSED, un-packetized)."* That carry closed the next day.
   `docs/archive/session-log-archive-2026-07-21_2026-08-12.md`, entry
   `## 2026-08-12 (#63) — FE-D1 DISCLOSURES SLICE NAMED, SCOPED, AUTHORIZED (group ruling);`,
   staged **L305** and **L310–311**: *"- EMAIL-WORKFLOW DOC ADOPTED (RULED): ships verbatim to
   docs/specs/email-workflow-requirements.md"* … *"The long-standing "email-workflow doc un-packetized""* /
   *"carry CLOSES."* The register itself records the same at L271: *"The standing carry "email-workflow doc,
   PROPOSED and un-packetized" **CLOSES** with these."*
4. **Disconfirmation.** Does adoption reach WF-1's own question? No — #63's own words, three times over,
   are that adoption *"builds, schedules, and authorizes nothing,"* and the #85 annotation block (register
   L273) says **SEVEN** rows were annotated and none closed — WF-1 is not among those seven and was never
   specified. Is WF-1 a duplicate of WF-2…WF-8? No: none of the seven is a local review-folder channel
   (`inbox/outbox convention the software understands` = 1 in the register; `drafts for review` = 1).
5. **PROPOSED: ANNOTATE-KEEP — HIGH.** Annotation substance: the parenthetical is stale — the email-workflow
   doc was ADOPTED VERBATIM into the repo at `docs/specs/email-workflow-requirements.md` (#63, 2026-08-12)
   and the "un-packetized" carry closed; WF-1 was NOT among the seven rows the #85 spec pass mapped, so it
   has no spec and no gate table of its own.
6. **First line (verbatim prefix, 120 chars) — occurs exactly once (`grep -c -F` = 1):**
   `- ⬜ **WF-1 — Review-folder as a workflow channel: a per-matter inbox/outbox convention the software understands —`

---

## KEEP rows (LIVE, UNCHANGED — grep run on each)

The decisive shared evidence for the ten CD rows: **BUILD-STATE at HEAD still lists the whole block as
Michael's.** `docs/specs/BUILD-STATE.md`, `## For design side` region, staged **L152**:
`· **OBS-1** · **CD-4 – CD-13** · **Q-STAT-2 – Q-STAT-6** ·`. And their origin session ruled nothing:
`docs/record/session-log.md`, entry
`## 2026-08-13 (#74) — CD-2 ROLE MINING PASS filed as PROPOSED data prep; the reconcile-first finding`,
staged **L8498**: *"- NOTHING RULED THIS SESSION. Michael made no rulings; everything produced is PROPOSED."*

- **L236 CD-5 — KEEP — free-standing** — greps run: `CD-5` (log 1 = the Q→CD mapping line only; register 2;
  BUILD-STATE 0; TOC 0; archive 0), flattened `interested person` (log 1 = #74's own finding; archive 2 —
  probate corpus context, not a ruling), `derivative claimant` (log 1, register 1).
- **L237 CD-6 — KEEP — free-standing** — greps run: `CD-6` (log 2, register 2). The second log hit is the
  runner's own DO-NOT report, which confirms rather than answers: staged **L8419**,
  *"**`case_parties.role` was left free text** (that is CD-6, Michael's), and"*.
- **L238 CD-7 — KEEP — free-standing** — greps run: `CD-7` (log 1 = mapping line), `lessee-of` (log 1,
  register 1), `bailor-of` (log 1, register 1). No edge type was added anywhere.
- **L239 CD-8 — KEEP — free-standing** — greps run: `CD-8` (log 1 = mapping line), `parent-of` (log 1,
  register 1), `two ontologies` (register 1).
- **L240 CD-9 — KEEP — free-standing** — greps run: `CD-9` (log 1 = mapping line), flattened
  `registered agent` (log 0, BUILD-STATE 0, TOC 0, archive 1 = the #58 REQ-07 no-ID annotation),
  `registered-agent-of` (log 0; register 1).
- **L241 CD-10 — KEEP — CE1** — greps run: `CD-10` (log 1 = mapping line; audit-08-24 1), flattened
  `timekeeper` (log 0, archive 1), `person namespace` / `auth/user namespace` (0 / 0 everywhere).
  **Cross-slice defect worth reporting: the 2026-08-24 audit classifies CD-10 TWICE** — under
  *"`CE1`, unauthorized — `Q-FE5-6`, `Q-IN3-5`, `CD-10` (3)"* (its L211) and inside
  *"`CD-3`…`CD-13` (11 data-model calls …)"* in the free-standing block (its L219). Both cannot be right,
  and its §7 arithmetic double-counts the row.
- **L242 CD-11 — KEEP — free-standing** — greps run: `CD-11` (log 1 = mapping line), flattened `DA's office`
  (log 0, archive 0, BUILD-STATE 0), `three resolutions, or three records` (register 1).
- **L243 CD-12 — KEEP — free-standing** — greps run: `CD-12` (log 1 = mapping line), flattened `bondsman`
  (case-insensitive; log 0, archive 0, BUILD-STATE 0, TOC 0 — control `queue runner` = 16 in the same
  flattened log).
- **L244 CD-13 — KEEP — free-standing** — greps run: `CD-13` (log 3, all three the mapping/collision lines;
  BUILD-STATE 2 = the L147 mining-pass paragraph and the L152 open list; TOC 1 = runner-29 abstract),
  flattened `organizational client` (0 everywhere), `promotion path` (register 2 — the other is `Q-RE-4`'s
  PNC row, a different question about a person's status, not an organization's party type).
- **L253 IN-4 — KEEP — Q-IN3-3 first-instrument consumer** — greps run: `IN-4` (log 4, archive 13,
  register 13, BUILD-STATE 0), flattened `instrument lifecycle` (log 0, archive 1), `certificate of service`
  (log 0). **Disconfirmation run and it mattered:** #127 folded a disclosures requirement into IN-4
  (*"`R13`→`IN-4`+`FE-8`"*, log L1672) — but `R13` was **RETIRED** before it landed: log L983,
  *"- **CONFIRMED — widget F / R13 RETIRED, not answered.** FE-8's diff half stays deferred;"*. So IN-4 is
  unchanged, and the row correctly carries no R13 text. Named as an open candidate for the never-named
  "first instrument consumer" (#83, L7261).
- **L255 IN-6 — KEEP — free-standing** — greps run: `IN-6` (log 2 — both inside #83's Q-IN1-3 finding;
  register 5; BUILD-STATE 1; archive 4), flattened `response set` (log 1 = the same finding). Hardened audit
  L207 names `IN-6` among the 27 rows the 08-24 audit never classified. The record's only movement is a
  finding that IN-6 canNOT be merged into IN-1 — #83, L7247–7253: *"**IN-1 cannot silently inherit IN-6's
  parser or entity shape.**"* — which protects the row rather than closing it.

---

## SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L231 | CD-3 | CLOSED-BY-LATER-RULING (sub-limb only) / LIVE on the data-model limb | ANNOTATE-KEEP | MED | free-standing | Y |
| L235 | CD-4 | LIVE, recital WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L236 | CD-5 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L237 | CD-6 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L238 | CD-7 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L239 | CD-8 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L240 | CD-9 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L241 | CD-10 | LIVE, UNCHANGED (audit double-classifies it) | KEEP | HIGH | CE1 | Y |
| L242 | CD-11 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L243 | CD-12 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L244 | CD-13 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L250 | IN-1 | WORLD-STATE-STALE (capability premise); question LIVE | ANNOTATE-KEEP | MED-HIGH | Phase 1b GPU | Y |
| L251 | IN-2 | LIVE; measurement WORLD-STATE-STALE (3 of ≥7 migrations; 37→41 tables) | ANNOTATE-KEEP | MED | Phase 1b GPU | Y |
| L252 | IN-3 | WORLD-STATE-STALE — premise pre-FE-D1 and unreconciled at HEAD; question open (BOTH) | ANNOTATE-KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L253 | IN-4 | LIVE, UNCHANGED (R13 fold-in retired before landing) | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L254 | IN-5 | WORLD-STATE-STALE (capability premise); question LIVE | ANNOTATE-KEEP | MED | Phase 1b GPU | Y |
| L255 | IN-6 | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L256 | IN-7 | WORLD-STATE-STALE (capability premise); question LIVE | ANNOTATE-KEEP | MED | Phase 1b GPU | Y |
| L262 | DE-1 | LIVE; landed spec + ruled sibling not cited on the row | ANNOTATE-KEEP | MED-HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L263 | DE-2 | LIVE; a named blocker cleared (#108) | ANNOTATE-KEEP | MED | Q-IN3-3 first-instrument consumer | Y |
| L269 | WF-1 | WORLD-STATE-STALE (cross-reference); question LIVE | ANNOTATE-KEEP | HIGH | free-standing | Y |

**Totals: 21 rows — 0 CLOSE · 0 CLOSE-SPLIT · 10 ANNOTATE-KEEP · 11 KEEP · 0 RECLASSIFY-ACT ·
0 MICHAEL-IN-WORDS.**

### UNVERIFIABLE-HERE
1. **The seven `generated_documents` columns FE-D1 added.** Only two are named on the record (answer
   snapshot, posture). Settling whether a status or set/parent column now exists needs
   `db/migrations/2026-08-20-fe-d1-form-engine.sql`, `db/schema.sql`, or `docs/specs/fe-d1-build-slice.md`.
   This is the one fact that would convert IN-3's annotation into a premise-falsified finding.
2. **The true migrations-directory contents.** My "3 of at least 7" figure for IN-2 is assembled from
   migration filenames named in the log and archive, not from a directory listing of `db/migrations/`.
3. **The live database's state** (37 tables vs `db/schema.sql`'s 41) — repo-side arithmetic only; the DB is
   not reachable from here, as the record itself says.
4. **The contents of the three landed specs** (`in-1-…`, `in-2-…`, `in-3-held-sets-…`) and
   `de-1-deficiency-letter-template-spec-2026-08.md` — not staged; every statement about them here is taken
   from the log entries and register rows that describe them, never from the files.


---

<a id="slice-b3"></a>

## ===== SLICE B3 =====

# WAVE-2 SWEEP — SLICE B3 (39 rows, register lines L275–L519)

**Sweeper:** B3. **Read-only.** Nothing adjudicated, nothing edited, nothing written outside this file.
**Quotation convention:** every quoted sentence was copied from file output, never retyped, and was
re-verified by program against its source file before this report was written. Where the source file wraps a
sentence across lines, the quote is de-wrapped (newline + indent → one space) and is otherwise
character-exact; nothing else is altered.

**Evidence:** the staged corpus at `/home/claude/work/ev/` (HEAD `7f02131`). `db/schema.sql`,
`docs/spec-feedback.md`, `src/`, the live database, the registry files, `docs/prompts/`, the project
instructions field and every `docs/specs/` file other than the thirteen staged are **NOT AVAILABLE HERE** —
where a call needed one, it is marked `UNVERIFIABLE-HERE` and the settling read is named.

**Headline arithmetic for this slice.** 39 rows read whole. **32 KEEP · 7 ANNOTATE-KEEP · 0 CLOSE ·
0 CLOSE-SPLIT · 0 RECLASSIFY-ACT · 0 MICHAEL-IN-WORDS.** **Not one row in this slice is closable.**
Every one of the 39 carries text that occurs exactly once in the 648,029-byte register (phrase greps below,
each run against a firing control). **Thirteen of the 39 are named in NEITHER audit** — `PL-2`, `PL-3`,
`O-10` appear nowhere at all, and `FC13-Q-2/-3/-4/-6` and `Q-WS3P-2`…`-6` appear only as range endpoints in
the 2026-08-24 audit's §7 dependency list, never classified.

---

## §A — NON-KEEP PROPOSALS (7 rows, fields 1–6)

### `WF-3` (L276) — ANNOTATE-KEEP

**1. Question.** Module design for the e-signature lifecycle — expressly `UNRULED`. The row additionally
carries a *negative schema finding* (that `generated_documents` cannot be WF-3's home).

**2. Greps run** (word-bounded, control `WF-99` = 0 in every file): `WF-3` → live log 6, TOC 0,
BUILD-STATE 0, archive 0, register 3. Literal `WF-3` across the post-audit stretch (live log lines 1–606,
= `#138`/`#139`/`#140` + runners 83–85): **0**. `doc_type` across all four corpora: live log 4, register 4,
BUILD-STATE 0.

**3. Call — WORLD-STATE-STALE IN ONE CLAUSE ONLY; the QUESTION and the GATE are LIVE.**

This is the row per-slice steering asked me to test the HARDENED audit's §5.3 claim on. **My verdict: §5.3
is right about the premise and wrong to imply it changes the row's disposition.**

*The §5.3 claim, quoted:* `docs/specs/attorney-review-queue-audit-HARDENED-2026-08-25.md` §5.3, staged
line 191 — *"**And three rows rest on a schema fact measured before that build:** `IN-3`, `WF-3` and `Q-RE-5`
all rest on `#83`'s *"`generated_documents` has no status column of any kind."*"*

*Limb (a) — the schema clause IS stale in its provenance.* BUILD-STATE at HEAD carries the pre-build claim
and the post-build extension **in the same file, unreconciled**, exactly as §5.3 says:

- `docs/specs/BUILD-STATE.md`, heading `## Data layer`, staged line 83: *"**Nor for IN-3:
  `generated_documents` has NO status column and NO set/parent column (#83).**"*
- `docs/specs/BUILD-STATE.md`, heading `## Known stubs & fakes`, staged line 99: *"**§10 substrate:
  `form_templates` + `form_template_versions` + `form_token_definitions` + `form_format_profiles`, with RLS,
  GRANTs and the probe entry IN THE SAME COMMIT (item 11); `generated_documents` EXTENDED, not forked** —
  seven nullable columns incl. the answer snapshot (FE-8 retention half) and posture (FE-15)."*

The build that extended it: `docs/record/session-log.md`, entry heading (80 chars)
*"## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED "*, staged line 1745 —
five days after the `#85` spec that authored this row's sentence.

*Limb (b) — the extension does not, on the record, supply what WF-3 needs.* The FE-D1 entry names the seven
columns as *"the answer snapshot (FE-8's retention half) and posture (FE-15)"* — **neither a status column
nor a set/parent column**, and no entry anywhere says `doc_type`'s CHECK was widened. Nothing at HEAD
contradicts the row's finding; what is missing is a re-derivation.

*Limb (c) — the row's actual GATE is INTACT and independently confirmed at HEAD.* The row is gated on `T3`
and on a document-storage model:
- `docs/specs/BUILD-STATE.md`, heading `## Phase 0 / T3 — environment only, still blocked, with a written
  protocol above the gate`, staged line 45: *"**until you locate it or re-issue, T3 WORK IS UNAUTHORIZED.**"*
- `docs/specs/BUILD-STATE.md`, heading `## Known stubs & fakes`, staged line 94: *"Medical has NO PDF/bill
  ingestion (Phase 1b GPU-gated); **no document storage.**"*
- Same file, line 99: *"**NOT BUILT AND NOT PRETENDED: one-click PDF** (needs Word/LibreOffice) **and
  OneDrive storage** (the Graph registration holds `Calendars.ReadWrite` and nothing else)."*

**4. Disconfirmation attempted.** (i) I looked for any later ruling on WF-2–WF-8 module design: the TOC's
only WF entries are `#85`, `#87` and runner 40 (TOC staged lines 432, 435, 436) — nothing after 2026-08-15.
(ii) I looked for a `doc_type` widening: 4 live-log hits, all at `#83`/`#85`/`#86` and all stating the
one-value CHECK; zero after. (iii) I checked whether the FE-D1 migration ran, which would settle the live
shape: `#140`-era BUILD-STATE line 2 — *"the LIVE database is still at 37 tables"* — and line 99 —
*"migration still UNRUN (`MIG-1`…)"*. **So `db/schema.sql` and the live database disagree about this very
table**, which is §5.3's own warning and which I cannot resolve here.
**UNVERIFIABLE-HERE:** the current column list and `doc_type` CHECK of `generated_documents`. **What would
settle it:** `db/schema.sql` at HEAD (grep the `create table generated_documents` block), plus
`db/migrations/2026-08-20-fe-d1-form-engine.sql`.

**5. Proposal — ANNOTATE-KEEP. Confidence HIGH.** The annotation's substance: *"SCHEMA SENTENCE PREDATES
THE FE-D1 BUILD. `generated_documents` was EXTENDED 2026-08-20 with seven nullable columns
(`BUILD-STATE.md`, `## Known stubs & fakes`); the `doc_type`/no-status/no-set-parent finding here was
measured 2026-08-15 and has not been re-derived. `db/schema.sql` (41 tables) and the live database (37)
disagree about this table while `MIG-1` is unrun. Re-derive before ruling. The GATES are unchanged: T3
unauthorized under KICK-1, document-storage model still absent."* **Not CLOSE** — the row's question is
untouched and its gate is confirmed unsatisfied at HEAD.

**6. First line, copied exactly:**
`- ⬜ **WF-3 — E-signature lifecycle.** GATE: **T3** for inbox detection; final-PDF capture needs the **document-storage model**, which does not exist — form-engine §10's OneDrive-plus-metadata pattern is the nearest precedent, not a decision. Module design UNRULED. **ANNOTATED 2026-08-15 (#85), STAYS ⬜ — MAPPED at the spec's §5 (WF-3 subsection), not designed.** Both gates re-verified UNSATISFIED. The spec adds a **negative** finding worth having: `generated_documents.privilege_tier` is a real precedent for classifying stored content by privilege, **but that table cannot serve WF-3** — its `doc_type` CHECK admits exactly one value and it has no status and no set/parent column. **A precedent for a column, not a home.**`
`grep -c -F` in the register: **1**.

---

### `O-1` (L399) — ANNOTATE-KEEP

**1. Question.** Rule the F-8a audit-integrity package (`classified_by`/`classified_at`, freeze of
`privilege_tier` and `generated_documents.content` once set, `REVOKE UPDATE, DELETE ON review_log`).
The row states its own sequencing: *"Adopt WS-4's list first; then this."*

**2. Greps run.** `O-1` word-bounded (excluding `O-10`/`-11`/`-12`/`-13`): live log 26, TOC 7,
BUILD-STATE 5, archive 0, register 7. Every live-log hit inspected — all are the Grok `O-` series, none is
the bare `O1` triple-collision (`statute-text-and-bill-tracking-design.md` / `transcript-sort-and-route`
/ `time-tracker-fee-basis-profiles`) named in `id-collision-report.md` §B.2. **ID checked, not assumed.**
`WS-4` → live 5, register 4+. `T-30` → live 5, register 4.

**3. Call — LIVE on its question; WORLD-STATE-STALE in its stated sequencing, and MATERIALLY UNDER-STATED
in its scope.**

*(a) The blocker is one step further back than the row says.* The row sends the reader to adopt *"the WS-4
drafted privilege list."* That list was drafted at CHAT-DISPATCH `T-30` to a **four-value** shape, and
`#105` has since ruled the target to be something else:

`docs/record/session-log.md`, entry heading *"## 2026-08-18 (#105) — FABLE SPEND-DOWN ADJUDICATION: two
items put, four limb"*, staged line 4208 — *"(b) **Option 2 — three values + a `witness_statement`
boolean** (pick verbatim: **"Option 2: 3 values + boolean"**); WS-4's direction — the fourth state in both
vocabularies — is satisfied."* and, at staged line 4211 — *"**CONSEQUENCE FLAG: the authored, UNRUN
migration was drafted to the FOUR-VALUE shape and must be REDRAFTED to Option 2 before anything executes;
it remains NOT AUTHORIZED and the run is Michael's hand.**"*

So the list O-1 tells the reader to adopt **must be redrafted before it can be adopted**. The freeze
still cannot land on a final vocabulary — the row's *reason* survives; its *instruction* is stale.

*(b) The row now carries gate 10's whole audit limb and does not say so.*
`docs/record/session-log.md`, entry heading *"## 2026-08-20 — CODE SESSION (ruling recorded): GATE 10
CLOSED — and the clo"*, staged line 2636 — *"the audit limb (history, freeze, `REVOKE UPDATE, DELETE`, and
reveal logging) is **expressly owed to `O-1`, which is OPEN.** **Closing gate 10 discharges none of it.**"*
and staged line 2641 — *"**Still open and still Michael's:** **`O-1`, which now carries gate 10's entire
audit limb**"*.

**4. Disconfirmation attempted.** (i) Is the T-30 list adopted after all? No — register Status header:
*"`Q-COM-10` (T-30 drafted the list; it closes only at Michael's adoption)"*, and live log staged line 4796
*"(`WS-4` executes only after Michael adopts the T-30 list)"*. (ii) Did anything after 2026-08-25 touch
`O-1`? Literal scan of live-log lines 1–606 returns two `O-1` substrings, **both false positives**
(`WO-1`-class tokens); zero true hits. (iii) Did the schema half execute? BUILD-STATE, `## Data layer`,
line 79: *"**NEITHER CHECK WAS TOUCHED.**"*
**UNVERIFIABLE-HERE:** whether `review_log` still holds `UPDATE`/`DELETE` grants at HEAD — settled by
`db/schema.sql`'s GRANT block or a live `information_schema.role_table_grants` read.

**5. Proposal — ANNOTATE-KEEP. Confidence HIGH** on limb (b), **MED-HIGH** on limb (a). Annotation
substance: *"SEQUENCING SUPERSEDED: `Q-COM-10-A` (#105) ruled the target vocabulary Option 2 — three values
+ `witness_statement` boolean — and the WS-4/T-30 four-value list must be REDRAFTED before it can be
adopted. AND SCOPE GREW: gate 10's closure (2026-08-20) expressly owes its entire audit limb — history,
freeze, `REVOKE UPDATE, DELETE`, reveal logging — to this row."* **Not CLOSE:** nothing in the F-8a package
has been ruled or executed.

**6. First line, copied exactly:**
`- ⬜ **`O-1` — Rule the F-8a audit-integrity package — `classified_by`/`classified_at` columns, freeze of `privilege_tier` (and `generated_documents.content`) once set, and `REVOKE UPDATE, DELETE ON review_log` — AFTER adopting the WS-4 drafted privilege list, so the freeze lands on the final vocabulary. Adopt WS-4's list first; then this.** — **OPEN, sequenced behind WS-4**`
`grep -c -F` in the register: **1**.

---

### `O-12` (L418) — ANNOTATE-KEEP

**1. Question.** Enforce or inherit "unreachable by default"? — expressly **deferred by ruling**
2026-08-19 pending four diagnostics.

**2. Greps run.** `O-12` word-bounded: live log 9, TOC 2, BUILD-STATE 2, archive 0, register 2.
`supabase_admin` across the whole staged tree: 4 hits — the register row itself, both audits, and nothing
in the log or BUILD-STATE. Control `zzzznotpresent` = 0.

**3. Call — DEFERRED IN MICHAEL'S WORDS, and the ROW IS PHYSICALLY TRUNCATED.**

*The deferral, at HEAD:* `docs/specs/BUILD-STATE.md`, heading `## For design side`, staged line 150 —
*"**(c) `O-12` — enforce or inherit "unreachable by default," DEFERRED BY YOUR RULING pending those
diagnostics"*. Confirmed untouched by the gate-10 closure: `docs/record/session-log.md`, entry heading
*"## 2026-08-20 — CODE SESSION (ruling recorded): GATE 10 CLOSED — and the clo"*, staged line 2638 —
*"**`O-1`, `O-11` and `O-12` are untouched.**"*

*The defect.* The row's `Full text:` block ends mid-sentence, mid-italic:
`…Sharper condition on record: a second default rule, `supabase_admin — **public**` — and then the line
ends. This breaks QR-1 (full question text in the register, *because the packet was deleted*). It is not a
new finding — both audits already confirm it — but it is confirmed a third time here, independently:
`docs/specs/attorney-review-queue-audit-HARDENED-2026-08-25.md`, staged line 229 — *"| 1 | `O-12` truncated
mid-sentence | **CONFIRMED** — ends at *"a second default rule, `supabase_admin — public"*. |"*, and
`docs/specs/attorney-review-queue-audit-2026-08-24.md` staged line 239 adds *"The rest of the question
survives only in `docs/spec-feedback.md`"*.

**4. Disconfirmation attempted.** (i) Have the four diagnostics run, which would lift the deferral?
No — `docs/specs/BUILD-STATE.md`, `## Known stubs & fakes`, staged line 91: *"Diagnostic 6 in
`spec-feedback.md` is staged and UNRUN."* (ii) Does the missing tail survive in the log? `supabase_admin`
returns **0** in `session-log.md`, `session-log-toc.md`, the archive and BUILD-STATE — so **the register
row and `docs/spec-feedback.md` are the only two carriers, and one of them is cut.**
**UNVERIFIABLE-HERE:** the missing tail itself. **What would settle it:** `docs/spec-feedback.md`
(2026-08-19 entry) — not staged.

**5. Proposal — ANNOTATE-KEEP. Confidence HIGH.** Annotation substance: *"ROW TEXT IS TRUNCATED — restore
the tail from `docs/spec-feedback.md`'s 2026-08-19 entry per QR-1; `supabase_admin` occurs nowhere else in
the log, the archive or BUILD-STATE, so this row plus that file are the only carriers. The deferral itself
stands: the four diagnostics remain UNRUN, `anon`'s schema USAGE being the cheapest and decisive one."*
**Not CLOSE** — the row is deferred by Michael's own ruling and only he lifts it.

**6. First line, copied exactly:**
`- ⬜ **`O-12` — Enforce or inherit "unreachable by default"? — DEFERRED BY RULING 2026-08-19 pending the four diagnostics.** Full text: *Should "a new table without its own GRANT is unreachable" become a property this project ENFORCES rather than inherits from Supabase's default (which would change silently if the vendor changed it)? Sharper condition on record: a second default rule, `supabase_admin — **public**`
`grep -c -F` in the register: **1**.

---

### `G10-4` (L450) — ANNOTATE-KEEP  ⬅ **the strongest new finding in this slice**

**1. Question.** *"Does the shape of this gate depend on a privacy proposition nobody has entered?"*

**2. Greps run.** `G10-4` word-bounded: live log 19, TOC 0, BUILD-STATE 2, archive 0, register 2.
`privacy proposition`: live 4, register 3, BUILD-STATE 1. Phrase `privacy proposition nobody has entered`
in the register: **1** (control `zzzznotpresent` = 0). `id-collision-report.md` §(c): *"**`G10`** — Clean
(G10-1..6)."* — no collision.

**3. Call — WORLD-STATE-STALE. The row states a fact that is FALSE AT HEAD; the question is LIVE.**

The row's own words: *"**No registry entry was created and none was drafted; the statute is a LOCATOR only
and Claude does not verify.**"* **Seven candidate entries have since been drafted and exist at HEAD:**

`docs/specs/BUILD-STATE.md`, heading `## The registry — FOUR files, backlog 47, THIRTY-FIVE VERIFIED — and
the ruled-wording tail is EMPTY`, staged line 116 — *"**AND CANDIDATE TEXTS NOW EXIST WITHOUT BEING
ENTERED: `docs/specs/g10-4-ch521-entry-drafts-2026-08-19.md` — SEVEN drafted entries on §§
521.002(a)(2)(A)/(B), 521.002(b), 521.052(a), 521.053(b)/(c)/(i), read from the OFFICIAL BULK CORPUS, ALL
`UNVERIFIED`, DRAFTED AND NOT INSERTED, and no registry file touched.**"*

The same BUILD-STATE line also carries a **substantive flag the row does not have**, which bears directly
on the gate's shape: *"Its one finding is a FLAG: the § 521.002(a)(2)(A) definition is CONJUNCTIVE and
encryption-conditioned — *"if the name AND the items are not encrypted"* — so encrypting the PII columns
while `parties.display_name` stays plaintext does NOT exit the definition"*, and *"**Gate 10 expressly
rejected encryption and this does NOT reopen that**"*. And it hands the residue back: *"Whether any is
inserted, and where — the siblings' placement rule points at a NEW file, not a fold-in — is `G10-4` /
`Q-WF-6`, **yours**"*.

**4. Disconfirmation attempted.** (i) Was the row written *after* the drafts, making "none was drafted"
true as of authoring? No — the row was added by `#115` (2026-08-19) and the front-end packet the same day
*"deliberately added none either"* (BUILD-STATE line 116); the drafts file is a later 2026-08-19 artifact
and BUILD-STATE marks the transition with *"AND CANDIDATE TEXTS NOW EXIST."* (ii) Did a ruling close it?
No: gate 10's closure entry, staged line 2638 — *"**`G10-2`** (the `on delete cascade` reversal, ruled
inside `O-7`) and **`G10-4`** (whether the gate's shape rests on an unentered ch. 521 privacy proposition)
are **both still OPEN and are not closed by this**"*. (iii) Is the registry's privacy gap closed? No —
BUILD-STATE line 116: *"(1) **NOT ONE PRIVACY PROPOSITION** (`Q-WF-6`)"* still stands as absence 1 of 5.
**UNVERIFIABLE-HERE:** whether any of the seven has since been inserted into a registry file — settled by
`docs/specs/legal-rule-registry-*.md` at HEAD, none staged.

**5. Proposal — ANNOTATE-KEEP. Confidence HIGH.** Annotation substance: *"'none was drafted' IS FALSE AT
HEAD. Seven candidate entries exist, drafted and NOT inserted, at
`docs/specs/g10-4-ch521-entry-drafts-2026-08-19.md`; the registry still holds not one privacy proposition,
so the question stands. Carry the drafts' own flag: § 521.002(a)(2)(A) is CONJUNCTIVE and
encryption-conditioned, and encrypting the PII columns while `parties.display_name` stays plaintext does
NOT exit the definition — which does not reopen gate 10's rejection of encryption. Placement (new registry
file vs fold-in) rides with `Q-WF-6`."* **Not CLOSE** — inserting, and where, is expressly Michael's.

**6. First line, copied exactly:**
`- ⬜ **`G10-4`** — **Does the shape of this gate depend on a privacy proposition nobody has entered?** Texas Bus. & Com. Code ch. 521 keys breach-notification obligations specifically on SSN and driver's licence numbers. **UNVERIFIED, a locator only, and Claude does not verify.** `Q-WF-6` already records that the registry holds **not one privacy proposition**; this would be the first, and gate 10 is the first design act to run into that gap. **No registry entry was created and none was drafted; the statute is a LOCATOR only and Claude does not verify.** — **OPEN — Michael's**`
`grep -c -F` in the register: **1**.

---

### `TC-OPEN-1` (L468) — ANNOTATE-KEEP

**1. Question.** *"`TC-1` deferred both to their own sitting. What, if anything, changes about either?"*

**2. Greps run.** `TC-OPEN-1` literal: live log 2, TOC 0, BUILD-STATE 0, archive 0, register 2. **The
`OPEN-1` / `TC-OPEN-1` substring collision was hit and handled** — a bare `OPEN-1` exists and was CLOSED at
`#100` (live log staged line 4793: *"`V-8`, `V-9`, `OPEN-1`, `Q-COM-12`, `TOC-4`"* in an eighteen-rows-
closed list). All counts above use the full `TC-OPEN-1` string; none of them is the closed `OPEN-1`.

**3. Call — DEFERRED IN MICHAEL'S WORDS (question live); FIGURES AND SCOPE BOTH STALE.**

*The deferral survives at HEAD:* `docs/record/session-log.md`, entry heading *"## 2026-08-25 (#138) —
(Typed design session, Cowork, Opus 5, DEVICE BRIDGE GR"*, staged line 496 — *"the
line-cap-is-not-a-size-cap finding, third consecutive measurement, still deliberately NOT RULED and still
belonging to the TC-1 / TC-OPEN-1 deferral."*

*Three staleness findings, all measured by me on the staged files at this HEAD:*

| the row says | measured at HEAD `7f02131` |
|---|---|
| `BUILD-STATE.md` **130,746 bytes** | **141,688 B**, still exactly **150 non-blank** |
| register grows **~61 KB/day** | **648,029 B / 1,131 non-blank**; vs `#138`'s 635,537 B / 1,130 on 2026-08-25 → **+12,492 B in 7 days ≈ 1.8 KB/day** |
| `BUILD-STATE` grows **~14 KB/day** | vs `#138`'s 138,640 B → **+3,048 B in 7 days ≈ 0.4 KB/day** |
| **"THE TWO DEFERRED GROWERS"** | **there are three** |

*The third grower, named by `#138` and NOT in the row:* staged line 554 — *"- **A THIRD FILE BELONGS IN THE
TC-1 / TC-OPEN-1 DEFERRAL AND IS NOT NAMED THERE:** `pi-case-playbooks.md`, **227,273 bytes**, ~3.3% of the
budget in one synced file, under no cap."*

**4. Disconfirmation attempted.** (i) Is the row's rate claim defensible as a *design* rate rather than an
observed one? Partly — the row says *"both by ruled design,"* and the 2026-08-21 measurement window was a
burst. I therefore state the two 7-day rates **as measured, not as a trend**; the point that survives either
way is the *headline byte figure*, which is 10,942 bytes wrong. (ii) Did the 2026-08-24 audit already flag
this, making my finding redundant? It flagged the byte figure only (`attorney-review-queue-audit-2026-08-24.md`
staged line 256: *"`TC-OPEN-1` cites BUILD-STATE at 130,746 bytes; it is **138,640** at HEAD"*) — **it did
not have the third file, and its own figure is now stale too.** (iii) Did anything rule the growers?
Literal `TC-OPEN-1` in live-log lines 1–606 → 2 hits, both carries, no ruling.
**UNVERIFIABLE-HERE:** the current size of `pi-case-playbooks.md` (not staged; `#138`'s figure is 2026-08-25).

**5. Proposal — ANNOTATE-KEEP. Confidence HIGH.** Annotation substance: *"REFRESH: `BUILD-STATE.md` is
141,688 B at 150 non-blank and the register 648,029 B / 1,131 non-blank at HEAD `7f02131` (2026-09-01);
over 2026-08-25→09-01 they grew ~1.8 KB/day and ~0.4 KB/day respectively, well under the rates this row
states. AND THERE ARE THREE GROWERS, NOT TWO: `#138` named `pi-case-playbooks.md`, 227,273 B, ~3.3% of the
budget, synced and uncapped."* **Not CLOSE** — deferred by ruling to its own sitting.

**6. First line, copied exactly:**
`- ⬜ **`TC-OPEN-1` — THE TWO DEFERRED GROWERS.** `attorney-review-queue.md` grows ~61 KB/day (~0.87% of budget/day) and `BUILD-STATE.md` ~14 KB/day (~0.20%/day), **both by ruled design** — QR-1 puts full question text in this file, and BUILD-STATE is rewritten every batch. **`TC-1` deferred both to their own sitting. What, if anything, changes about either?** Carry with it the finding that **`BS-1a`'s 150-line cap is a LINE cap that density has defeated — BUILD-STATE is at exactly 150 non-blank lines and 130,746 bytes, 871 bytes per line, having grown 6.35× since 08-12 without ever breaching its cap.** Not a violation (the runner says the cap exists "for READABILITY, not token cost"), but the file is ~1.9% of the budget and rising under a cap that structurally cannot stop it. — **OPEN; deferred by ruling to its own sitting**`
`grep -c -F` in the register: **1**.

---

### `TC-OPEN-2` (L469) — ANNOTATE-KEEP

**1. Question.** *"Which of the ~120 files in `docs/specs/` are genuinely superseded?"*, on a stated
premise: *"Not attempted 2026-08-21."*

**2. Greps run.** `TC-OPEN-2` literal: live log 6, TOC 0, BUILD-STATE 0, archive 0, register 2 — and
`docs/specs/superseded-specs-candidates-2026-08-25.md` is **staged and read in full**. Substring collision
with `OPEN-2` handled as for `TC-OPEN-1`.

**3. Call — WORLD-STATE-STALE (the pass HAS run) and the row is now KNOWN to be TWO questions, the first
of which it does not ask.**

*The pass ran:* `docs/record/session-log.md`, entry heading *"## 2026-08-25 (#138) — (Typed design session,
Cowork, Opus 5, DEVICE BRIDGE GR"*, staged lines 525–529 — *"- **`TC-OPEN-2` SURVEYED FOR THE FIRST TIME —
CANDIDATES ONLY** (`docs/specs/superseded-specs-candidates-2026-08-25.md`). Four readers over all 131 files
in the `docs/specs/` working tree. **⛔ ITS FIRST FINDING OUTRANKS THE SURVEY: there is NO RULED HOME for a
retired spec** — `docs/archive/` is CLOSED, `docs/record/` means live-but-unsynced, deletion loses the
record. **`TC-OPEN-2` is two questions and only the second is a sweep.**"*

*Confirmed from the artefact itself* (not from the log alone) —
`docs/specs/superseded-specs-candidates-2026-08-25.md` §0, staged line 25: *"**So `TC-OPEN-2` is really two
questions, and only the second is a sweep:** *(1) where does a retired spec GO?* and *(2) which specs go
there?* **This file answers only (2), as candidates. (1) is unasked and unruled.**"* — and its header line
9: *"**131 files in the `docs/specs/` working tree; 129 at HEAD**"*, against the row's *"~120."*

**4. Disconfirmation attempted — and it turned up a contradiction I am reporting rather than resolving.**
`#138`'s own process-notes tail, staged line 571, reads *"Phase 2 (hardening the 2026-08-24 audit's 108
disposition candidates) and Phase 3 (the TC-OPEN-2 superseded-specs table) were IN SCOPE for this session
and WERE NOT RUN"* — which contradicts the same entry's body. Read in context (staged lines 559–572) that
sentence sits inside a correction paragraph about `#136`/`#137`, so it most plausibly describes the PRIOR
session; **but the decisive check is not the sentence, it is the artefact**: the survey file exists at
HEAD, dated 2026-08-25, and I read it. Also disconfirmed: (i) is the destination now ruled? No — the
survey's §0 says the three candidate homes are each excluded by a standing rule and *"(1) is unasked and
unruled."* (ii) Did a later batch retire anything? Runner 83's own line records the survey landing as
**evidence-only** (staged line 398).
**UNVERIFIABLE-HERE:** the row's *"5,203,721 bytes, 91% of the synced scope"* figure — only 13 of the ~131
`docs/specs/` files are staged.

**5. Proposal — ANNOTATE-KEEP. Confidence HIGH.** Annotation substance: *"'Not attempted' IS FALSE AT HEAD.
The survey ran 2026-08-25 — four readers over 131 files — and its candidate table is at
`docs/specs/superseded-specs-candidates-2026-08-25.md` (five clean retire-candidates, six
superseded-in-place). ⛔ ITS FIRST FINDING OUTRANKS THE SWEEP: there is NO RULED HOME for a retired spec —
`docs/archive/` is CLOSED (Q-CAP-1/TC-6), `docs/record/` means live-but-unsynced (TC-4), deletion loses the
record. This row is TWO questions and only the second has been worked. File count is 131 in the working
tree / 129 at HEAD, not ~120. A further category question is open: does TC-8 reach the nine repo-resident
raw captures, or only project knowledge?"* **Not CLOSE** — retirement is a ruling and the destination
question has never been put.

**6. First line, copied exactly:**
`- ⬜ **`TC-OPEN-2` — MOVE 3, THE SUPERSEDED-SPECS AUDIT.** The thin constitution's third move is that superseded specs relocate the way captures do: verify-landed, then move to ARCHIVE. **Which of the ~120 files in `docs/specs/` are genuinely superseded?** Not attempted 2026-08-21 — identifying them is a real audit and would have been guesswork at the end of a long session. **Named a Fable candidate: an audit with no prior art.** The arithmetic that makes it matter: `docs/specs/` is **5,203,721 bytes, 91% of the synced scope** — the remaining weight is all here. — **OPEN; owed its own pass**`
`grep -c -F` in the register: **1**.

---

### `H12-v` (L475–L508) — ANNOTATE-KEEP

**1. Question.** The disclosures model-call **vendor** route and the BAA that gates it — expressly two
limbs, both Michael's: will AWS sign a BAA for a solo firm, and where does the malpractice carrier land.

**2. Greps run.** `H12-v` literal: live log 13, TOC 3, BUILD-STATE 0, archive 0, register 2.
`id-collision-report.md` §B.1 records the `H12` four-series collision (heartbeat / disclosures / HK /
Outlook) — **`H12-v` is a distinct minted string and returns no false hits**; every live-log occurrence is
the vendor row. Collision checked, not assumed.

**3. Call — DEFERRED / HELD IN MICHAEL'S WORDS on both limbs; but a later ruling refined the architecture
the row describes and the row does not carry it.**

*Both limbs still his, at the newest entry in the log:* `docs/record/session-log.md`, entry heading
*"## 2026-08-31 (#140) — (Typed design session, Cowork, Fable 5 per the environm"*, staged line 52 —
*"**`H12-v`** and its limbs, the BAA a hard gate before any real record moves through the model call"*.

*The refinement, from the same entry, staged lines 82–85:* *"`AS-Q1` "Yes — server-side function + secret;
fixture writer only now; note CLAUDE.md" — the model call runs in a server-side function holding the
credential as a Supabase secret (the LegiScan pattern; `Q-WF-4`'s first instance); this slice ships the
writer INTERFACE, a FIXTURE writer in both modes and the function's SHAPE (a stub that refuses without its
one vendor-neutral secret); **no vendor SDK, key or endpoint until `H12-v`.**"*

The row, written 2026-08-22, states the architecture as *"the app calls the model directly, on the firm's
own BAA-covered API account."* `AS-Q1` (2026-08-31) does not reverse that — the account is still the
firm's — but it moves the credential off the client into a server-side function, makes the secret
**vendor-neutral**, and ties the row to `Q-WF-4`. A reader taking this 3,265-byte row as current state
would miss all three.

**4. Disconfirmation attempted.** (i) Did `AS-Q1` moot the vendor question? Explicitly not — *"no vendor
SDK, key or endpoint until `H12-v`"* is the same sentence. (ii) Was the BAA gate softened? No — staged
line 192 and line 52 both carry *"the BAA a hard gate."* (iii) Was the fourth option (a local model on the
P1) rejected? Nothing in the log rejects it; the row's *"never rejected, and must be preserved"* stands,
and `AS-Q1`'s vendor-neutral secret is consistent with it. (iv) Was the row edited or moved? No —
staged line 356: *"`H12-v` not pushed and not renumbered."*
**UNVERIFIABLE-HERE:** the vendor facts themselves — the row flags them as *"SEARCH-DERIVED and … NOT
verified against the vendors' own pages,"* and I fetched nothing.

**5. Proposal — ANNOTATE-KEEP. Confidence MED-HIGH.** Annotation substance: *"ARCHITECTURE REFINED SINCE
THIS ROW WAS WRITTEN: `AS-Q1` (#140, 2026-08-31) rules the model call runs in a SERVER-SIDE FUNCTION
holding the credential as a Supabase secret (the LegiScan pattern; `Q-WF-4`'s first instance) — not in the
app — and the FE-D1 amendment slice ships only a fixture writer and the function's shape, 'no vendor SDK,
key or endpoint until `H12-v`.' The secret is deliberately VENDOR-NEUTRAL, which keeps the fourth option (a
local model on the P1) live. Both limbs and the hard BAA gate are unchanged."* **Not CLOSE** — the vendor
is expressly Michael's on two facts only he can obtain.

**6. First line, copied exactly:**
`- ⬜ **`H12-v` — THE DISCLOSURES MODEL-CALL VENDOR ROUTE, AND THE BAA THAT GATES IT. NEW`
`grep -c -F` in the register: **1**.

---

## §B — KEEP ROWS (32)

Every line below had its ID grepped word-bounded across the live log, the closed archive, `BUILD-STATE.md`,
`session-log-toc.md` and the register, plus a literal scan of live-log lines 1–606 (everything after both
audits) and a distinctive-phrase uniqueness check in the register against a firing control.

**Workflow channels (`WF-2`, `WF-4`–`WF-8`) — all six premises RE-VERIFIED INTACT at HEAD.** The
controlling finding is `docs/record/session-log.md`, entry heading *"## 2026-08-15 (#85) — CHAT-DISPATCH
TASK 11: the WF-2–WF-8 email-workflow sp"*, staged line 6867: *"- **SEVEN OF SEVEN GATED; ZERO SATISFIED.**"*
Nothing in the log, the TOC or BUILD-STATE rules WF module design after 2026-08-15; the TOC's only WF rows
are `#85`, `#87` and runner 40.

- `L275` **WF-2** — KEEP — *T3 / KICK-1 / P1* — greps: `WF-2` (live 10 / TOC 2 / BS 4 / arch 4 / reg 9), `KICK-1`, `Q-WF-2`, phrase "envelope-number dedupe key" ×1. Gate confirmed at BUILD-STATE `## Phase 0 / T3`, L45: *"until you locate it or re-issue, T3 WORK IS UNAUTHORIZED."* The `T3` ambiguity the row names is confirmed still unrepaired (BUILD-STATE L44, *"FLAGGED NOT RENAMED"*).
- `L277` **WF-4** — KEEP — *Phase 1b GPU (medical module)* — greps: `WF-4` (live 16 / TOC 1 / BS 1 / arch 0 / reg 8), `approval-queue`, `treatment record`. **Both gates confirmed unsatisfied by a source LATER than the row:** the FE-D1 build entry (staged L1745) — *"Treatment checklists and future care have **nowhere to land** — the medical module holds bills and line items, not treatment records"*; and `approval-queue` occurs in exactly two places repo-wide (this row and `#85`), so the design pass has never been run. Phrase "approval-request queue" ×1.
- `L278` **WF-5** — KEEP — *money module (no row)* — greps: `WF-5` (live 3 / TOC 0 / BS 1 / arch 1 / reg 6). BUILD-STATE `## Known stubs & fakes`, L96: *"**NO MONEY MACHINERY:** no settlement ledger, trust/IOLTA, liens"*; `## Data layer`, L83: *"`qb_`, `quickbooks`, `third_party`, `integration` all ZERO (#87) — none of the 37 tables is a money table."* Phrase "no amount of design work moves" ×1.
- `L279` **WF-6** — KEEP — *T3 / KICK-1 / P1* — greps: `WF-6` (live 11 / TOC 1 / BS 1 / arch 1 / reg 10), `OAA`. Built half confirmed (BUILD-STATE `## Screens live`, L49: *"/cases/new/oaa — OAA order upload → draft review → Create Matter"*); the T3-gated auto-intake residue is unchanged. Phrase "never duplicates CR work" ×1.
- `L280` **WF-7** — KEEP — *money module (no row)* — greps: `WF-7` (live 2 / TOC 0 / BS 0 / arch 0 / reg 3), `Q-WF-8`. The severance question is expressly `Q-WF-8` and expressly Michael's; nothing severed. Phrase "severed from cost tracking" ×1.
- `L281` **WF-8** — KEEP — *Q-IN3-3 first-instrument consumer* — greps: `WF-8` (live 10 / TOC 2 / BS 2 / arch 4 / reg 9), `Q-IN3-3`, `first instrument consumer`. The blocker is confirmed still open: `Q-IN3-3` and `Q-WF-9` both still ⬜ in the register and unruled in the log. Phrase "one column set or two" ×2 (this row + `Q-WF-9`, which cites it — **a citation, not a duplicate**).

**Probate ladder (`PL-1`–`PL-4`) — all four settled by one sentence in BUILD-STATE at HEAD.**
`docs/specs/BUILD-STATE.md`, heading `## Known stubs & fakes`, staged line 96: *"that pass is **DEFERRED
pending the Domser matter** and **PL-1..PL-4 are all UNRULED. Do not touch the case-type tree or ladder.**"*

- `L296` **PL-1** — KEEP — *PR-3 / probate ladder* — greps: `PL-1` (live 4 / TOC 0 / BS 2 / arch 7 / reg 6). Claude's proceeding-as-case-type recommendation is PROPOSED on the row's own face; a proposal is not a ruling. Phrase "conditionally-present phase of intestate" ×1.
- `L297` **PL-2** — KEEP — *PR-3 / probate ladder* — greps: `PL-2` → **live 0 / TOC 0 / BS 0 / arch 0 / register 1** (control `PL-9` = 0). **This row exists nowhere but the register and is named in neither audit.** Phrase "muniment, standalone heirship, and small-estate" ×1.
- `L298` **PL-3** — KEEP — *PR-3 / probate ladder* — greps: `PL-3` → **live 0 / TOC 0 / BS 0 / arch 0 / register 1.** Same posture as `PL-2`; named in neither audit. Its stated trigger (*"first evidence at the letters capture"*) has not arrived — no Domser letters capture appears in the log. Phrase "LADDER STATUSES versus checklist/tracked-object" ×1.
- `L299` **PL-4** — KEEP — *PR-3 / probate ladder* — greps: `PL-4` (live 3 / TOC 0 / BS 2 / arch 4 / reg 4). Phrase "registry-batch scope when the pass runs" ×1.

**Grok external review (`O-2`–`O-7`, `O-10`, `O-11`).** Every `O-` count below is the hyphenated Grok
series, checked line-by-line against the bare `O1`–`O4` triple collision that `id-collision-report.md` §B.2
records (statute / transcript / fee-basis). **No false identity found.** Literal scan of live-log lines
1–606 returns only `WO-n`/`DO-NOT`-class substrings — **zero true post-audit hits on any O row.**

- `L400` **O-2** — KEEP — *PR-3 / probate ladder* — greps: `O-2` (live 1 / TOC 0 / BS 0 / arch 0 / reg 1), `practice_area`, `F-13`. Premise confirmed intact: BUILD-STATE `## Data layer`, L80 — *"`cases.practice_area` and `cases.case_type` are **free text with no CHECK, no enum, no FK, no index and no view**"*; and PR-3 is direction-confirmed but execution-held (L96). The CHECK-now window (*"while no real data exists"*) is also intact: BUILD-STATE `## Known stubs & fakes`, L90 — *"**NO REAL CLIENT DATA HAS EVER ENTERED THE APP.**"* Phrase "F-13's timing clause" ×1.
- `L401` **O-3** — KEEP — *free-standing* — greps: `O-3` (live 6 / TOC 1 / BS 1 / arch 0 / reg 1). Premise confirmed: BUILD-STATE `## Known stubs & fakes`, L91 — *"legiscan-poller + statute-fetch edge functions written, **NOT deployed**"* and *"**F-14 IS LATENT, NOT A GL-1 BLOCKER (#113)** — undeployed code has no endpoint; it rides `O-3`."* Phrase "statute-fetch CORS posture" ×1.
- `L402` **O-4** — KEEP — *Michael's hand* — greps: `O-4` (live 1 / TOC 0 / BS 0 / arch 0 / reg 1); `case_client_flags` → 1 live-log hit (the row's own carry) and 1 BUILD-STATE hit (the CL-2 flag table, unrelated). **No evidence the Grok follow-up ran or the probe was executed. Named in neither audit.** Phrase "already-run CL-2 backfill is UNSCORED" ×1.
- `L403` **O-5** — KEEP — *free-standing* — greps: `O-5` (live 3 / TOC 1 / BS 0 / arch 0 / reg 3 — the extra register hits are the `O5`/`O-5` collision note, not a second row); `grok` across the whole post-08-19 log stretch returns carries only, no ruling on repetition. The row is self-labelled *"PROPOSED, unruled"* — a Claude position is not a ruling. Phrase "repeatable pattern" ×1.
- `L404` **O-6** — KEEP — *free-standing* — greps: `O-6` (live 2 / TOC 0 / BS 0 / arch 0 / reg 1). **Disconfirmation attempted and rejected:** BUILD-STATE `## Data layer`, L72 says *"**F-1 WAS A LIVE EXPOSURE AND IS NOW CLOSED**"* — that is the NARROW half (`revoke execute … from public`) only, which the row already records; the full redesign (BEFORE INSERT trigger, revoke from `authenticated`, retire the callable-RPC surface) has no ruling anywhere. **A reader greping `F-1` alone would wrongly close this row.** Phrase "callable-RPC surface entirely" ×1.
- `L405` **O-7** — KEEP — *free-standing* — greps: `O-7` (live 13 / TOC 1 / BS 1 / arch 0 / reg 6). Premise confirmed: BUILD-STATE `## Data layer`, L75 — *"**A CASCADE/RETENTION MAP EXISTS AND NOTHING IN IT IS EXECUTED** … (**PROPOSED — AWAITING SIGN-OFF, O-7**)."* Phrase "where `deleted_at` lands" ×1.
- `L411` **O-10** — KEEP — *free-standing* — greps: `O-10` (live 10 / TOC 4 / BS 1 / arch 0 / reg 12). **ID COLLISION HIT AND RESOLVED BY READING THE ROW:** the 2026-08-19 gate-10 packet minted a second `O-10`, which Michael renumbered to `O-13` (live log staged L2981). I confirmed L411 is the **CD-1/PG15 hand-run-migration** sense, not the C-2 restatement (which sits at register L419 as ✅ `O-13`). `version guard` returns **0** anywhere — the question is unruled. **Named in neither audit.** Phrase "unique nulls not distinct" ×1.
- `L417` **O-11** — KEEP — *Michael's hand* — greps: `O-11` (live 10 / TOC 2 / BS 3 / arch 0 / reg 2). Confirmed open at HEAD: BUILD-STATE `## For design side`, L150 — *"**(b) `O-11` — the `anon`/`service_role` residual privileges**, the four read-only diagnostics first (`anon`'s schema USAGE is cheapest and decisive)"*; and the diagnostics are unrun (L91, *"Diagnostic 6 in `spec-feedback.md` is staged and UNRUN"*). Note for the sitting: the row's *"all 37 tables"* still matches the LIVE database (BUILD-STATE L2, *"the LIVE database is still at 37 tables"*) even though `db/schema.sql` is now 41 — so the figure is **not** stale for the object the row is about. Phrase "residual-privilege remedy" ×2 (row + Status header).

**FC-13 entry drafts (`FC13-Q-1`, `-2`, `-3`, `-4`, `-6`).** All five confirmed unresolved at HEAD by
`docs/specs/BUILD-STATE.md`, heading `## THE FC BLOCK — ruled 2026-08-18 (#106), ALL DESIGN DIRECTION,
NOTHING AUTHORIZED TO BUILD`, staged line 20: *"six texts now exist at
`docs/specs/fc13-entry-drafts-2026-08-18.md`, **DRAFTED AND NOT INSERTED** … The reconcile is the finding —
not one of the five destinations is free, so `FC13-Q-1..6` ask whether they insert at all and where."*
The `#112` entry's own do-not list (staged L3615) confirms *"the **VERIFIED `## TRCP 47(b)–(d)` entry
untouched**, its 47(c) text left a candidate."* **`FC13-Q-5` is NOT in this slice** (register L432) and was
not processed. *(Tag for all five: `registry verification`, per the 2026-08-24 audit's own §7 grouping.)*

- `L428` **FC13-Q-1** — KEEP — *registry verification* — greps: live 4 / TOC 0 / BS 1 / arch 0 / reg 2; phrase "Are these six drafts, or five?" ×1.
- `L429` **FC13-Q-2** — KEEP — *registry verification* — greps: live 1 / TOC 0 / BS 0 / arch 0 / reg 2; **classified in neither audit** (range endpoint only); phrase "Do these insert at all, given the reconcile?" ×1.
- `L430` **FC13-Q-3** — KEEP — *registry verification* — greps: live 0 / TOC 0 / BS 0 / arch 0 / **reg 1**; `TRCP 47` in the live log → the entry is untouched and the ROUTE-C detachment cost the row names is real and unpaid. **Classified in neither audit.** Phrase "new entry, or conforming rewording of the VERIFIED entry?" ×1.
- `L431` **FC13-Q-4** — KEEP — *registry verification* — greps: live 0 / TOC 0 / BS 0 / arch 0 / **reg 1**; its cross-linked `Q-STAT-2` is still ⬜. **Classified in neither audit.** Phrase "medical-billing ENTRIES 1, 2, 4 and 5" ×1.
- `L433` **FC13-Q-6** — KEEP — *registry verification* — greps: live 2 / TOC 0 / BS 0 / arch 0 / **reg 1**. `#112`'s do-not list confirms the SOURCING §3 note was left unamended (staged L3615: *"`statute-pass-registry-retrieval-2026-08-14.md` §3 unamended**, the reading-order qualification left at `FC13-Q-6`"*) — so the row's disclosed-not-authorized method amendment is still unruled, and the four affected quotations still ride it. **Classified in neither audit.** Phrase "reading-order finding" ×1.

**`Q-WS3-5` second pass (`Q-WS3P-1`–`-6`).** All six confirmed unadopted at HEAD by `#112`'s do-not list,
`docs/record/session-log.md` staged line 3615: *"`C-DICK-1`, `C-DICK-2` and `C-JIM-1` **not adopted** · the
**VERIFIED `WS-3` entry untouched**"*, and staged line 3662: *"**Three candidates, `C-DICK-1`, `C-DICK-2`,
`C-JIM-1`, ALL UNADOPTED.**"* Each carries an independent ROUTE-C detachment cost against a VERIFIED entry,
so none can ride another's answer. *(Tag for all six: `free-standing`, per the 2026-08-24 audit's §7.)*
Zero of the six appear in the HARDENED audit; only `Q-WS3P-1` is named in the 08-24 audit, and that as a
range endpoint.

- `L434` **Q-WS3P-1** — KEEP — *free-standing* — greps: live 3 / TOC 0 / BS 0 / arch 0 / reg 4; phrase `C-DICK-1` ×1 in the register.
- `L435` **Q-WS3P-2** — KEEP — *free-standing* — greps: live 0 / TOC 0 / BS 0 / arch 0 / **reg 1**; phrase `C-DICK-2` ×1.
- `L436` **Q-WS3P-3** — KEEP — *free-standing* — greps: live 0 / TOC 0 / BS 0 / arch 0 / **reg 1**; phrase `C-JIM-1` ×1. Carries a second, distinct act on its face (supplying a citation *Jimenez* currently lacks) — a ROUTE-C cite act needing its own word.
- `L437` **Q-WS3P-4** — KEEP — *free-standing* — greps: live 1 / TOC 0 / BS 0 / arch 0 / reg 2; phrase "does the second pass reopen it" ×1. **Expressly says "A session should not pick this."**
- `L438` **Q-WS3P-5** — KEEP — *free-standing* — greps: live 0 / TOC 0 / BS 0 / arch 0 / **reg 1**; `Baytown Nissan` in the register ×3 (this row plus two `WS-3`-family cross-references — cross-refs, not duplicates). An unrun **authorization**, not an unmade ruling.
- `L439` **Q-WS3P-6** — KEEP — *free-standing* — greps: live 0 / TOC 0 / BS 0 / arch 0 / **reg 1**; phrase "ninth vote resolved" ×1. Self-labelled *"Almost certainly immaterial"* — but that is the row's own hedge, not a ruling, and closing it destroys the only record of the disclosed limit.

**Gate 10 (`G10-2`).**

- `L449` **G10-2** — KEEP — *free-standing* — greps: `G10-2` (live 9 / TOC 0 / BS 2 / arch 0 / reg 2); `cascade-retention-map` (live 3 / BS 1 / reg 1). Confirmed still open by the closure entry itself: staged L2638, *"`G10-2` (the `on delete cascade` reversal, ruled inside `O-7`) and `G10-4` … are **both still OPEN and are not closed by this**."* **Disconfirmation attempted — DUPLICATE-CANDIDATE against `O-7` REJECTED:** the map is dated **2026-08-18** and covers *"Eleven FKs across C-1's six named children"* (BUILD-STATE `## Data layer`, L75), while `party_pii` was created by the gate-10 migration on **2026-08-19** — so `party_pii.party_id` is not in the map, and closing `G10-2` into `O-7` would delete the only record of an FK the map never saw. Phrase "reverses `O-7`'s direction" ×1. **Per-slice question answered: `G10-2` and `O-1` are NOT the same question** — gate 10's edge (1) is owed to `O-1` (the audit-integrity package), while `G10-2` is a cascade-direction call and `G10-4` a registry-proposition call; the closure entry separates all three in one sentence.

**Thin constitution (`TC-OPEN-8`) and housekeeping (`SW-1`).**

- `L509` **TC-OPEN-8** — KEEP — *free-standing* — greps: `TC-OPEN-8` → live 0 / TOC 0 / BS 0 / arch 0 / **reg 2** (row + Status header); `federated` → live 1, register 2, BUILD-STATE 0, archive 0. The single log occurrence is **a runner carry, not a ruling text** — `docs/record/session-log.md`, entry heading *"## 2026-08-21 — QUEUE-RUNNER batch (runner line; EIGHTIETH invocation) — one docs-only"*, staged line 1707: *"and the **federated-projects question**, deferred by ruling to its own bridge sitting."* **`#132` itself (staged L1709–1726) does not mention it at all.** **UNVERIFIABLE-HERE:** the deferral's own ruling text, which the register header places at `docs/specs/thin-constitution-restructure-2026-08-21.md` — not staged. **This does not move the disposition:** default is KEEP, and nothing in any staged file answers the question. **Substring collision with the bare `OPEN-n` family checked and clear.** Phrases "Solution Two" ×1 and "carve lines" ×1 in the register, **0 in the live log** — the register is the sole carrier.
- `L519` **SW-1** — KEEP — *free-standing* — greps: `SW-1` word-bounded (live 2 / TOC 2 / BS 0 / arch 0 / reg 2); `anon-adp-sweep` (live 3 / BS 1). Confirmed unresolved: the record it concerns is still PROPOSED and single-run at HEAD — BUILD-STATE `## Data layer`, L77: *"`docs/specs/anon-adp-sweep-verification-2026-08-19.md` (PROPOSED, one run)."* That file's own header bars in-place updates, which is exactly why the addendum question is a ruling, not a repair. Phrase "C1 sweep normalizer strips" ×1. **`C1` collision noted** (`id-collision-report.md` B.2: CODE-DISPATCH v4 task C1 vs `#113` CD-1 checks vs billing C1) — the row means the **CODE-DISPATCH v4 task C1 sweep**, confirmed by its own named file.

---

## SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L275 | `WF-2` | LIVE, UNCHANGED | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L276 | `WF-3` | WORLD-STATE-STALE (schema clause only; gate + question live) | ANNOTATE-KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L277 | `WF-4` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L278 | `WF-5` | LIVE, UNCHANGED | KEEP | HIGH | money module (no row) | Y |
| L279 | `WF-6` | LIVE, UNCHANGED | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L280 | `WF-7` | LIVE, UNCHANGED | KEEP | HIGH | money module (no row) | Y |
| L281 | `WF-8` | LIVE, UNCHANGED | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L296 | `PL-1` | DEFERRED / HELD IN MICHAEL'S WORDS | KEEP | HIGH | PR-3 / probate ladder | Y |
| L297 | `PL-2` | DEFERRED / HELD IN MICHAEL'S WORDS | KEEP | HIGH | PR-3 / probate ladder | Y |
| L298 | `PL-3` | DEFERRED / HELD IN MICHAEL'S WORDS | KEEP | HIGH | PR-3 / probate ladder | Y |
| L299 | `PL-4` | DEFERRED / HELD IN MICHAEL'S WORDS | KEEP | HIGH | PR-3 / probate ladder | Y |
| L399 | `O-1` | LIVE; sequencing WORLD-STATE-STALE; scope grew | ANNOTATE-KEEP | HIGH | Q-COM-10 list | Y |
| L400 | `O-2` | LIVE, UNCHANGED | KEEP | HIGH | PR-3 / probate ladder | Y |
| L401 | `O-3` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L402 | `O-4` | LIVE, UNCHANGED | KEEP | HIGH | Michael's hand | Y |
| L403 | `O-5` | LIVE, UNCHANGED (PROPOSED ≠ ruled) | KEEP | HIGH | free-standing | Y |
| L404 | `O-6` | LIVE, UNCHANGED (narrow half shipped, row already says so) | KEEP | HIGH | free-standing | Y |
| L405 | `O-7` | LIVE, UNCHANGED (map PROPOSED, unexecuted) | KEEP | HIGH | free-standing | Y |
| L411 | `O-10` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L417 | `O-11` | LIVE, UNCHANGED (four diagnostics unrun) | KEEP | HIGH | Michael's hand | Y |
| L418 | `O-12` | DEFERRED IN MICHAEL'S WORDS + row physically TRUNCATED | ANNOTATE-KEEP | HIGH | Michael's hand | Y |
| L428 | `FC13-Q-1` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L429 | `FC13-Q-2` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L430 | `FC13-Q-3` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L431 | `FC13-Q-4` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L433 | `FC13-Q-6` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L434 | `Q-WS3P-1` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L435 | `Q-WS3P-2` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L436 | `Q-WS3P-3` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L437 | `Q-WS3P-4` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L438 | `Q-WS3P-5` | ACT, NOT RULING — an unrun READ, Michael's authorization | KEEP | HIGH | free-standing | Y |
| L439 | `Q-WS3P-6` | ACT, NOT RULING — an unrun READ, Michael's authorization | KEEP | MED | free-standing | Y |
| L449 | `G10-2` | LIVE, UNCHANGED (duplicate-vs-`O-7` tested and rejected) | KEEP | HIGH | free-standing | Y |
| L450 | `G10-4` | WORLD-STATE-STALE — "none was drafted" false at HEAD | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L468 | `TC-OPEN-1` | DEFERRED IN MICHAEL'S WORDS; figures + scope stale | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L469 | `TC-OPEN-2` | WORLD-STATE-STALE — "not attempted" false at HEAD | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L475 | `H12-v` | DEFERRED IN MICHAEL'S WORDS; architecture refined since | ANNOTATE-KEEP | MED-HIGH | Michael's hand | Y |
| L509 | `TC-OPEN-8` | DEFERRED IN MICHAEL'S WORDS | KEEP | HIGH | free-standing | Y |
| L519 | `SW-1` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |

**39 rows. 32 KEEP · 7 ANNOTATE-KEEP · 0 CLOSE · 0 CLOSE-SPLIT · 0 RECLASSIFY-ACT · 0 MICHAEL-IN-WORDS.**

---

## §C — WHAT THIS PASS DOES NOT ESTABLISH

- **`UNVERIFIABLE-HERE` items, with the read that would settle each.** (1) `generated_documents`' current
  column list and `doc_type` CHECK — `db/schema.sql` + `db/migrations/2026-08-20-fe-d1-form-engine.sql`
  (`WF-3`). (2) `O-12`'s truncated tail — `docs/spec-feedback.md`, 2026-08-19 entry. (3) Whether any of the
  seven ch. 521 drafts has since been inserted — `docs/specs/legal-rule-registry-*.md` (`G10-4`).
  (4) `TC-OPEN-2`'s *"5,203,721 bytes / 91%"* and `TC-OPEN-1`'s `pi-case-playbooks.md` figure — the full
  `docs/specs/` tree (13 of ~131 files staged). (5) `review_log`'s current grants (`O-1`).
  (6) The vendor facts inside `H12-v` — the row itself flags them as search-derived and unverified.
- **A record contradiction found and NOT resolved:** `#138` states in its body that the hardened audit and
  the `TC-OPEN-2` survey ran, and states in its process-notes tail (staged line 571) that both *"were IN
  SCOPE for this session and WERE NOT RUN."* Context puts the latter in a correction paragraph about
  `#136`/`#137`, and the artefacts exist at HEAD dated 2026-08-25 — but the sentence is on the record as
  written and the log is append-only. **Flagged for a design session, not adjudicated here.**
- **Off-slice observation, reported because it bears on any closure pass:** `FC13-Q-5` (register L432) sits
  between two of my rows and is in no B3 slice; I did not process it. It is also the one `FC13-Q` row the
  08-24 audit classified (as a duplicate candidate against `Q-RE-8`), and the HARDENED audit downgraded that
  to OVERLAPPING with *"Neither row names the other."*


---

<a id="slice-b4"></a>

## ===== SLICE B4 =====

# SLICE B4 — REGISTRY-VERIFICATION BLOCK — 23 rows (register L528–L775), read-only sweep

**Method note.** Every ID in the slice was grepped, character-exact (`grep -c -F`), across
`docs/record/session-log.md`, `docs/archive/session-log-archive-2026-07-21_2026-08-12.md`,
`docs/specs/BUILD-STATE.md`, `docs/record/session-log-toc.md`, the register itself and both audits.
Zero-count claims were re-run on a newline-flattened copy (`tr '\n' ' '`) against a firing control.
`id-collision-report.md` §(a) was read first: it records that `V5-ATTRIB` belongs to **`V-5`, not
bare `V5`** (*"hyphen-dropped derivatives `V5-IDS`, `V5-ATTRIB`, `V6-33/34`, `V7-23/24` which belong
to `V-5`/`V-6`/`V-7`, not bare `V5`–`V7`"*), and that `Q-T19`, `Q-RL6`, `Q-DES`, `Q-COM`, `Q-WS2`,
`Q-WS3` are **single-meaning namespaced series** with no collisions found. The `V7` collision the
steering warned about is `V7-23`/`V7-24` (a `V-7` derivative) and does not touch this slice. **No row
in this slice appears in the hardened audit's §5.5 twenty-seven-named-nowhere list.**

**Headline: 23 rows, ZERO closures proposed.** Three rows get ANNOTATE-KEEP, one gets
MICHAEL-IN-WORDS, nineteen are LIVE-UNCHANGED. Every row in this block is a **registry-verification
or registry-wording act, and registry discipline is binding: automation flags, ONLY Michael
verifies.** Nothing a session gathered can close any of them.

---

## Registry verification backlog (L528)

**1. Row / question.** Compound record-and-homework row (no ID). Its live claims: the backlog is
27 → 33 → **34**; *"the twenty-seven entries themselves remain UNVERIFIED and are still your
homework"*; two reads flagged for Michael — **(a)** the VERIFIED TRCP 194 entry's expanded
four-category wording versus the UIM capture's narrower `"194.1–194.4"` span, and **(b)** six WL/slip
cites flagged for reporter-cite check; and *"Blocks **FE-14**, whose picklist wording cannot be
encoded until TRCP 47(b)–(c) is verified."*

**2. Call: WORLD-STATE-STALE on three limbs, with limb (a) CLOSED-BY-LATER-RULING.** The row's
question (verify the entries) survives; three of its stated premises are false at HEAD.

**3. Decisive quotes.**
- Limb (a) was RULED, in Michael's picks, inside the ✅ `Q-WS2-1` row —
  `docs/specs/attorney-review-queue.md` L747:
  `**RULED 2026-08-18 (#108) — ALL FIVE LIMBS. (a) "Whole Rule 194" — the span flag RESOLVES.`
  That *is* the span question this row flagged as *"same entry, two wordings."*
- The count is stale — `docs/specs/BUILD-STATE.md` L103, heading
  `## The registry — FOUR files, backlog 47, THIRTY-FIVE VERIFIED — and the ruled-wording tail is EM`:
  `**Backlog 47 entries; 35 verified, 12 not.**`
- The FE-14 block has lifted. BUILD-STATE L105 enumerates the survivors —
  `The enforcement file holds TEN unverified** — 15, 16, 17, 18, 19a, 20a, 21a, 20b, 24 **plus 19b**` —
  **entry 27 is not among them**, and the register's own `FC13-Q-3` row (L430) reads
  `The existing `## TRCP 47(b)–(d)` entry (VERIFIED 2026-08-17)`. The gate condition is stated at
  `docs/record/session-log.md` L5123, entry `## 2026-08-17 (#98) — TASK 19 SIGN-OFF WALK EXECUTED (CHAT-DISPATCH v2 Task B): 24 of 40`:
  `- **GATES: FE-14's registry gate lifts when entry 27's verification executes** (build position`

**4. Disconfirmation attempted.** (i) Does limb (b) survive? YES — BUILD-STATE L105 still carries
`**Seven records/cite looks** — 15, 16, 17, 18, 19a, 20a, 21a — have **candidates staged per entry, source named per item**, none adopted`,
so the slip-cite/reporter-cite homework is unfinished. (ii) Does the
`4a`/`4b` sub-bullet survive? YES — `4a` is still cite-less (see `Q-RL6-1`, below). (iii) Is the
composition text unique? **Partly not** — `#58` in the CLOSED archive carries the UIM/deficiency
composition and the `De Anda`, `2018 WL 3580579` slip-cite detail (archive hits: `De Anda` 7,
`3580579` 2). But `same-action-or-separate BEFORE totaling` and `the largest single batch since
trucking` are **register-only (1 hit each, 0 in the log)**.

**5. PROPOSED: `ANNOTATE-KEEP` — HIGH.** Annotation substance, three sentences: *(1)* limb (a) was
RULED at `#108` — "Whole Rule 194," the span flag RESOLVES; *(2)* the backlog is **47 / 35 verified /
12 not** at HEAD, not 34, and the surviving unverified set is the ten enforcement entries plus the
criminal two; *(3)* **the FE-14 block has lifted** — entry 27 (TRCP 47(b)–(d)) was VERIFIED
2026-08-17. Closing the row would destroy the composition note, the placement-flag closure, the
`4a`/`4b` split note and the `CR-10` cost-check consequence.

**6. First line, verbatim** (`grep -c -F` → **1**, unique):
`- ⬜ **Registry verification backlog — NEW 2026-08-12 (#58), WIDENED 27 → 33 on 2026-08-12 (#62),`

**Dependency tag:** `registry verification`. **Unique text destroyed if closed:** Y.

---

## `Q-T19-1` (L609)

**1. Question.** What registry-wide number do the three work-product entries carry — 35–37, derived
IDs on the `#66` precedent, or does the registry renumber? *"`V5-IDS`'s other half and one answer
should govern both."*

**2. Call: DEFERRED / HELD IN MICHAEL'S WORDS.**

**3. Decisive quotes.** `docs/record/session-log.md` L5122, entry
`## 2026-08-17 (#98) — TASK 19 SIGN-OFF WALK EXECUTED (CHAT-DISPATCH v2 Task B): 24 of 40`, in the
SIX HOUSEKEEPING RULINGS bullet:
`  note COMMISSIONED (rides CHAT-DISPATCH v3 as T-22); Q-T19-1 numbering DEFERRED.`
And at HEAD, `docs/specs/BUILD-STATE.md` L111:
`- **THE THREE WORK-PRODUCT ENTRIES ARE VERIFIED AND STILL HAVE NO NUMBER (`REGISTRY-V` CLOSED, `Q-T19-1` OPEN).**`
… `**Labelled `WP-1/2/3`, packet-local; numbering DEFERRED (`D-6`)**`

**4. Disconfirmation attempted.** (i) Did anything renumber since? No — `docs/specs/superseded-specs-candidates-2026-08-25.md`
L119 (2026-08-25, the newest staged spec) warns `Retiring it destroys the numbering authority for two live IDs`,
and BUILD-STATE L118 reads `it remains **the numbering authority `V5-IDS` and `Q-T19-1` rest on**`. (ii) Is it a duplicate of `V5-IDS`? The hardened audit L151 calls the pair **OVERLAPPING, not
duplicate**, with residue in `V5-IDS` (the file-shape finding) — and `V5-IDS` is **not** in this
slice, so `Q-T19-1` is the surviving statement of the numbering question either way.

**5. PROPOSED: `MICHAEL-IN-WORDS` — MED.** It is not merely unanswered; it was actively **deferred by
Michael at the walk (`D-6`)** and only he lifts a deferral. MED rather than HIGH because the
deferral's verbatim wording is in `docs/specs/task-19-signoff-record-2026-08-17.md` §4, which is
**UNVERIFIABLE-HERE**; what I can quote is the log's and BUILD-STATE's report of it.

**6. First line, verbatim** (`grep -c -F` → **1**, unique):
`- ⬜ **Q-T19-1 — NEW 2026-08-17 (#97). What number do the three work-product entries carry?** The entries added at #94 — TRCP 192.5(d), TRCP 192.5(c)(1), and TRCP 192.3(h)'s definition of a witness statement — were placed **in subject order** among the 192.x rules, taking the discovery-enforcement file from twenty-seven to thirty entries, and **no document at HEAD gives them registry-wide numbers.**`
*(Note: the row is one physical line in the register; the string above is its opening clause. The
whole-line `grep -c -F` also returns 1.)*

**Dependency tag:** `registry verification`. **Unique text destroyed if closed:** Y (`puts them out
of file order` — 1 register hit).

---

## `Q-RL6-1` (L757)

**1. Question.** Entry 31 (`4a`) cite supply: *"do you want (a) *Hurlburt* cited on entry 4b, (b)
*Pharr* cited on entry 4a/31, (c) both, or (d) neither pending your own read?"*

**2. Call: WORLD-STATE-STALE — the question survives intact, one stated caution is false at HEAD.**
The row's closing caution reads *"Two cautions travel with it: *Pharr* WAS NOT READ (`Q-AUTH-1`)."*
**Pharr was read on 2026-08-19.**

**3. Decisive quotes.** `docs/record/session-log.md` L2843–2844, entry
`## 2026-08-19 (#117) — POST-SYNC VERIFICATION OF EVERYTHING LANDED AND UNREVIEWED AT `beb27f4`: se`:
`- **`Q-AUTH-1` IS EXECUTED: *EX PARTE PHARR* AND *HURLBURT v. STATE*, BOTH READ IN FULL, BOTH`
`  POSITIVELY IDENTIFIED UNDER V-9's SECOND LIMB** — paginated vLex Fastcase copies stating`
And the same entry, L2861–2862, is decisive that **the question is still open**:
`supply for entries 30 and 31 remains Michael's; nothing was selected.**`
BUILD-STATE L109 carries it at HEAD: `**`Q-AUTH-1` IS NOW EXECUTED (2026-08-19, on your in-session “Go”): `docs/specs/pharr-hurlburt-authority-read-2026-08-19.md`, PROPOSED/staging — BOTH opinions read in full`.

**4. Disconfirmation attempted.** (i) Did the read *select* a cite (which would close the row)? No —
`#117` says in terms that nothing was selected, and the *Pharr* read is recorded as
**PROPOSED/staging**. (ii) Is the staleness already recorded in the register? **No.** The register's
Status header still describes `Q-AUTH-1` as *"(*Ex parte Pharr* unread and load-bearing)"*, and
`pharr-hurlburt-authority-read-2026-08-19` has **0 hits in the whole register** (1 in BUILD-STATE) —
so the annotation carries information the register does not have anywhere. (iii) Does BUILD-STATE
contradict itself? Partly: L151 still reads *"whose read is AUTHORIZED to an Opus session and gated
only on your two PDF pulls"* while L152 reads `~~the *Pharr* + *Hurlburt* PDF pulls~~ **BOTH DONE
2026-08-19**` and L109 records the executed read — a stale clause inside BUILD-STATE itself, worth
reporting but not mine to fix. (iv) Does the `#105`-era menu still stand? Yes, minus option (d),
which the row's own ⚠ annotation already kills.

**5. PROPOSED: `ANNOTATE-KEEP` — HIGH.** Annotation substance: *"**Amend the caution: *Pharr* WAS
READ.** `Q-AUTH-1` executed 2026-08-19 (`#117`) — both *Pharr* and *Hurlburt* read in full and
V-9-identified (*Pharr* PER CURIAM, CCA en banc), record at
`docs/specs/pharr-hurlburt-authority-read-2026-08-19.md`, PROPOSED/staging. The menu (a)/(b)/(c)/(d)
is unchanged and the selection is still yours — `#117`: 'the cite supply for entries 30 and 31
remains Michael's; nothing was selected.' Three limits ride: *Hurlburt* is Tenth Court (Waco),
persuasive not binding in the Fourth; no currency check on a 2016 construction of a 2015 statute;
both copies are vendor products."*

**6. First line, verbatim** (`grep -c -F` on the whole row line → **1**, unique):
`- ⬜ **`Q-RL6-1`** — **Entry 31 (`4a`) cite supply — YOURS, and the read does not select.** The nine opinions produced **no** authority for art. 102.073's *negative implication* (that separate criminal actions mean per-cause costs).`

**Dependency tag:** `registry verification`. **Unique text destroyed if closed:** Y (`the remaining
recorded candidate`, `only the menu shrank` — 1 register hit each, 0 log).

---

## `Q-COM-10-B` (L764)

**1. Question.** *"Does `transcripts`' `'privileged'` conform to `'attorney-client'`? … Adopt,
reject, or edit."*

**2. Call: LIVE, UNCHANGED — with a parent-row overlap worth recording.** The `#105` ruling
UNBLOCKED it; it did not answer it.

**3. Decisive quotes.** The unblock, stated by the session itself —
`docs/record/session-log.md` L4213, entry
`## 2026-08-18 (#105) — FABLE SPEND-DOWN ADJUDICATION: two items put, four limbs ruled — Q-AUDIT-1`:
`  hand.** Q-COM-10-B through -F are unblocked (Opus work).`
And the runner that merged that ruling **expressly declined to close the row** —
`docs/record/session-log.md` L4177, entry
`## 2026-08-18 — QUEUE-RUNNER batch (runner line; FIFTY-NINTH invocation) — the batch that makes t`:
`**`Q-COM-10-B`–`F` were annotated add-only as unblocked; none closed.**`
An UNBLOCKED annotation is not a closure. The parent row (register L832, **outside this slice**)
carries the same sub-question and says who closes it:
`**This row still closes only when you adopt a list, and it now has six sub-questions (`Q-COM-10-A`–`F`) rather than one.**`
— and, earlier in that same row, *"It closes only when he adopts the drafted unified value list —
including whether `transcripts`' `'privileged'` conforms to `'attorney-client'`."*

**4. Disconfirmation attempted.** (i) Did `Q-COM-10-A`'s "Option 2 — three values" implicitly fix the
three values? **No.** The ✅ `Q-COM-10-A` row's ruling text names the shape and the boolean but never
names the three tokens, and BUILD-STATE L151 still reads
`**`Q-COM-10`**, which closes the moment you adopt the unified `privilege_tier` list` — the list is not adopted. (ii) Is the schema state changed?
BUILD-STATE L79: `**NEITHER CHECK WAS TOUCHED.**` (iii) Is B a duplicate of the parent? No — the
parent delegates to six sub-questions by its own words; they are a family, not duplicates.

**5. PROPOSED: `ANNOTATE-KEEP` — MED.** Annotation substance: *"`Q-COM-10` (this file, the parent
row) restates this exact sub-question and closes only on adoption of the unified list — close B, C,
D, E and F as a family with the parent when the list is adopted, never independently. `#105`
UNBLOCKED without closing: 'annotated add-only as unblocked; none closed.'"* MED because the
annotation is a cross-reference, not a state correction.

**6. First line, verbatim** (`grep -c -F` → **1**, unique):
`- ⬜ **`Q-COM-10-B`** — **Does `transcripts`' `'privileged'` conform to `'attorney-client'`?** Proposed YES, on the ground that the current list **opposes a genus (`privileged`) to its own species (`work-product`)**, which the project's own registry position (TRCP 192.5(d) — an assertion of work product IS an assertion of privilege) makes incoherent.`

**Dependency tag:** `Q-COM-10 list`. **Unique text destroyed if closed:** Y (`an assertion of work
product IS an assertion of privilege` — 1 register hit, 0 log).

---

## KEEP rows (LIVE, UNCHANGED — greps run, one line each)

- **L607 `V5-ATTRIB` — KEEP — `registry verification`** — greps run: `V5-ATTRIB` (log 11 / BUILD-STATE 2 / archive 0 / register 2), `V-5`, `RL-1`, `19a`/`19b`. Decisive at HEAD, `docs/specs/BUILD-STATE.md` L110: `**`V5-ATTRIB` stays OPEN across all six split entries**`; the row's own `#100` annotation and BUILD-STATE L151 (*"`V5-ATTRIB`, which `RL-1` deliberately did not resolve"*) agree. Michael's own election at `#97` was to park, not settle it: log L5176–5177, entry `## 2026-08-17 (#97) — TASK 19 SIGN-OFF WORKLIST STAGED: the dispatch's Task A was found already` — *"Asked at 00:30 Central whether to walk the forty entries, walk a scoped slice, settle `V5-ATTRIB` first, or prepare and park, he chose **prepare the worklist and park the sign-off**."* Attribution is a wording act at verification, and verification is his.
- **L611 `Q-T19-3` — KEEP — `free-standing`** — greps run: `Q-T19-3` (log 9 / BUILD-STATE 2 / register 4). Decisive, `docs/specs/BUILD-STATE.md` L112: `**Its two arithmetic defects ARE STILL STANDING (`Q-T19-3`)**` … `**Neither was corrected: §4.1 ordered it verbatim and a change to packet content is yours.**` A two-word correction to committed packet content sits in no routing row → `QR-6(e)`, Michael's word.
- **L612 `Q-T19-4` — KEEP — `registry verification`** — greps run: `Q-T19-4` (log 3 / BUILD-STATE 0 / register 4), `27.18` (log 7 / BUILD-STATE 0). Decisive, `docs/record/session-log.md` L5322–5323, entry `## 2026-08-16 (#96) — V-EXEC EXECUTED IN PART: the three two-case entries are SPLIT (V-5, backlog`: `  because the article does not.** Whether they are exclusive is a construction question and Michael's.` No later entry touches it.
- **L749 `Q-WS2-3` — KEEP — `registry verification`** — greps run: `Q-WS2-3` (log 10 / BUILD-STATE 0 / register 4). Decisive, `docs/record/session-log.md` L3890, entry `## 2026-08-18 (#109) — THE SUCCESSOR ACTS CLOSE THE SAME NIGHT: ENTRIES 12, 32, D AND E VERIFIED;`: `  operative quotes, lead-ins and characterizations put as such. Q-WS2-3 stays open — entry E's` [`scope note asserts nothing on it.`]. Disconfirmation: the cross-referenced `Q-WS3-1` IS now ✅, but it closed on the **work-product cross-reference** limb only (`RULED 2026-08-18 (#109) — "Cross-reference."`), which asserts nothing on attorney-client. Row survives.
- **L753 `Q-WS3-3` — KEEP — `Michael's hand`** — greps run: `Q-WS3-3` (log 7 / register 1), `Kona Coast` (reg 3 / log 4), `Scherer` (reg 2 / log 2). ACT, NOT RULING — Michael's hand (pull the opinions or drop the leads); the row says so on its face (*"OPEN, your hand"*) and `#109`'s open-items line L3807 still carries it: *"`Q-WS3-3` / `Q-WS3-4` (the Protégé leads without usable cites; the *In re Young* mismatch)"*. No later entry resolves it.
- **L754 `Q-WS3-4` — KEEP — `Michael's hand`** — greps run: `Q-WS3-4` (log 5 / register 1), `In re Young` (reg 1 / log 3), `Commitment of Michael Elbert Young` (reg 1 / log 0 / archive 0). Log L4604 records the finding, not a resolution: *"*In re Young*'s cite resolves to an **SVP civil-commitment case**"*. Confirming the mismatch or supplying the intended case is Michael's.
- **L758 `Q-RL6-2` — KEEP — `registry verification`** — greps run: `Q-RL6-2` (log 2 / BUILD-STATE 1 / register 2), `entry 30`, `Pharr`. Premise INTACT at HEAD: `docs/specs/BUILD-STATE.md` L151 — `**entry 30 still got nothing**` — and `#117` L2861–2862, *"The cite supply for entries 30 and 31 remains Michael's; nothing was selected."* The later Pharr/Hurlburt read moved 31, not 30.
- **L759 `Q-RL6-3` — KEEP — `registry verification`** — greps run: `Q-RL6-3` (log 4 / BUILD-STATE 1 / register 3), `LaPorte`, `Ex parte Carter`. BUILD-STATE L136 carries the corrected remedy as still-proposed: *"**The corrected remedy is a parenthetical — *"overruled on other grounds by Ex parte Carter"*** (`Q-RL6-3`)."* Log L4303 records *Whaley* independently reaching the same remedy — `exact form `Q-RL6-3` proposed, reached by a Texas court of appeals independently.**` — **corroboration of the proposal, not adoption of it.** This is a change to a registry entry's candidate-authority line: ROUTE-C, adopt/reject/edit is Michael's.
- **L760 `Q-RL6-4` — KEEP — `Michael's hand`** — greps run: `Q-RL6-4` → **0 in the live log, 0 in BUILD-STATE, 0 in the archive, 0 in the TOC**, re-run flattened, against a firing control (`Q-RL6-5` → 2 flattened). It exists only in the register (2 hits: its own row and a range). ACT row, Michael's hand; *Carter* may be unresolvable in principle (no majority to identify).
- **L762 `Q-RL6-6` — KEEP — `Michael's hand`** — greps run: `Q-RL6-6` (log 2, both bare open-items/entered mentions; BUILD-STATE 0; register 2), `Keasler` (reg 1 / log 1). ACT row: obtaining a complete vendor copy is Michael's hand. Nothing on the record obtains it.
- **L765 `Q-COM-10-C` — KEEP — `Q-COM-10 list`** — greps run: `Q-COM-10-C` → **0 in log, 0 in BUILD-STATE, 0 in archive, 0 in TOC; 1 in the register** (its own row), re-run flattened, control `Q-COM-10-B` → 4 in log. `#105` unblocked B–F without closing them; the breadth question (physician-patient, spousal, clergy, mediation confidentiality) is asked nowhere else.
- **L766 `Q-COM-10-D` — KEEP — `Q-COM-10 list`** — greps run: `Q-COM-10-D` → **0 log / 0 BUILD-STATE / 1 register**, same control. Premise as stated at HEAD, `docs/specs/BUILD-STATE.md` L79: `**`src/domain/billing.ts` and `src/domain/transcripts.ts` each `export type PrivilegeTier` with DIFFERENT members**`. **UNVERIFIABLE-HERE** as to the files themselves (`src/` is not staged and is deliberately out of the design-side sync).
- **L768 `Q-COM-10-F` — KEEP — `Q-COM-10 list`** — greps run: `Q-COM-10-F` (log 1 — the `#105` "none closed" line; BUILD-STATE 0; register 2), `Privilege vocabulary is the shared system-wide set` (register 2 — this row and the parent `Q-COM-10` at L832; log 0). Migration still `AUTHORED, UNRUN AND NOT AUTHORIZED` (BUILD-STATE L135), so the false comment has nothing to ride on yet. **UNVERIFIABLE-HERE** as to `db/schema.sql` line 514 (`db/` not staged) — and note the row cites it **by line number** into a wholesale-rewritten file, which CITE-STABILITY warns against.
- **L769 `Q-DES-1` — KEEP — `free-standing`** — greps run: `Q-DES-1` (log 4 / BUILD-STATE 1 / register 2). The premise correction is already **inside** the row and is confirmed at HEAD, BUILD-STATE L135: `` `"full precedential"` appears 0 times in the TRAP PDF `` (`Q-DES-1`). The re-footed question — *"do you want the designation tracked for civil entries anyway, or not?"* — is answered nowhere.
- **L770 `Q-DES-2` — KEEP — `free-standing`** — greps run: `Q-DES-2` → **0 log / 0 BUILD-STATE / 0 archive / 0 TOC; 1 register**, flattened, control `Q-DES-1` → 4 log. `hazard 0.1.6` → reg 1 / log 1. The row says on its face *"This is a data-model act and is yours."*
- **L771 `Q-DES-3` — KEEP — `free-standing`** — greps run: `Q-DES-3` → **0 log / 0 BUILD-STATE / 1 register**, same control. A source-of-record adoption is an adopt/reject/edit put to Michael; no adoption anywhere on the record.
- **L772 `Q-DES-4` — KEEP — `free-standing`** — greps run: `Q-DES-4` (log 3 / BUILD-STATE 0 / register 3) and, decisively, **`TAMES` → 0 in the live log, 0 in the archive, 0 in the TOC, 0 in BUILD-STATE, and 6 occurrences on ONE line of the register — this row.** Control `txcourts` fires (log 1 / register 1). **This row is the only home in the entire record for the TAMES-boundary question and for the "absolute no-workaround rule around TAMES" it recites.** Closing it erases the boundary from the record.
- **L774 `Q-DES-6` — KEEP — `free-standing`** — greps run: `Q-DES-6` (log 4 / BUILD-STATE 1 / register 4). BUILD-STATE L135 carries it live: `**AND TRAP 77, NOT 47, GOVERNS THE CCA — 77.3 BARS citing unpublished opinions as authority** (`Q-DES-6`)`. It is the **surviving** side of the `Q-RL6-5` → `Q-DES-6` pair the hardened audit examined (L152: reciprocal self-identification verified; residue left in `Q-RL6-5`, which is not in this slice). No standing rule has been made.
- **L775 `Q-DES-7` — KEEP — `free-standing`** — greps run: `Q-DES-7` (log 5 / BUILD-STATE 0 / register 3), `caseName` → **reg 1 / log 0 / archive 0 / BUILD-STATE 0**. The FLP caption-scraping artifact exists nowhere else in the staged record. The `#138` session (hardened-audit day) touched `Q-DES-5`, not this row.

---

## Cross-slice notes (reported, not adjudicated)

1. **BUILD-STATE contradicts itself on the *Pharr* read.** L151 says `Q-RL6-1`'s authorities are
   *"gated only on your two PDF pulls"*; L109 and L152 record both pulls **DONE 2026-08-19** and the
   read EXECUTED. L151 is the stale clause. Not my slice to fix; flagged because a session reading
   L151 alone would re-authorize work already done.
2. **The register's Status header still calls *Pharr* "unread and load-bearing."** The
   2026-08-19 authority read (`pharr-hurlburt-authority-read-2026-08-19.md`) has **zero hits in the
   whole 648 KB register.** `Q-AUTH-1`'s row (L777, not in this slice) is still ⬜ and still recites
   the unread premise.
3. **`Q-COM-10` (L832, not in this slice) is the closure carrier for B–F.** Its own words:
   *"it now has six sub-questions (`Q-COM-10-A`–`F`) rather than one"* and *"closes only when you
   adopt a list."* Any sheet that closes a sub-row without the parent, or the parent without the
   sub-rows, breaks that structure.
4. **`Q-RL6-4` and `Q-COM-10-C`/`-D` are register-only IDs** — zero literal hits anywhere in the log,
   the archive, the TOC or BUILD-STATE, verified flattened against firing controls. They exist only
   as range endpoints (`Q-RL6-1`–`Q-RL6-6`, `Q-COM-10-A`–`Q-COM-10-F`) in the entering runner lines.
   The register is their sole home; QR-1's full-text guarantee is doing all the work.

---

## UNVERIFIABLE-HERE (and what would settle each)

| Row | Fact I could not check | File that settles it |
|---|---|---|
| L528 | whether the six WL/slip cites are still slip cites; whether the two cite-less criminal entries still are | `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md`, `…-criminal-plea-and-costs.md`, `docs/specs/registry-cite-check-2026-08-13.md` |
| L607 `V5-ATTRIB` | the current wording of the six split entries (19a/19b/20a/20b/21a/21b) | the two named registry files |
| L609 `Q-T19-1` | Michael's **verbatim** deferral word at `D-6` | `docs/specs/task-19-signoff-record-2026-08-17.md` §4 |
| L611 `Q-T19-3` | whether §5 Part B still reads "eleven" and §6 "five" | `docs/specs/task-19-signoff-worklist-2026-08-17.md` (BUILD-STATE L112 asserts both still stand) |
| L612 `Q-T19-4` | entry 34's current text and whether the construction flag is still inside it | `docs/specs/legal-rule-registry-criminal-plea-and-costs.md` |
| L749 `Q-WS2-3` | entry E's (194.5) scope-note text at HEAD | `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md` |
| L753/L754 | whether Michael has since pulled *Kona Coast* / *Franklin Ctr.* / *Scherer* / *In re Young* | off-repo (`Documents\Knowledge Repo`, Michael's hand) |
| L757/L758/L759 | entries 30, 31 (`4a`) and `4b`'s candidate-authority lines at HEAD | `docs/specs/legal-rule-registry-criminal-plea-and-costs.md`; `docs/specs/pharr-hurlburt-authority-read-2026-08-19.md` |
| L760/L762 | whether better copies of *Bailey*/*Simmons*/*Green*/*Carter* now exist | off-repo, Michael's hand |
| L764/L765 | the drafted unified value list's exact tokens | `docs/specs/privilege-tier-unified-vocabulary-proposal-2026-08-17.md` §4 |
| L766 `Q-COM-10-D` | `src/domain/billing.ts` / `src/domain/transcripts.ts` at HEAD | `src/` — **deliberately excluded from the design-side sync**; BUILD-STATE L79 is the only authority available |
| L768 `Q-COM-10-F` | `db/schema.sql` line 514 | `db/schema.sql` (not staged) |
| L769–L775 `Q-DES-*` | the FLP caveat list at §0.1; the TRAP PDF's amendment comment; the source-comparison table rows A–F | `docs/specs/registry-courtlistener-integration-design.md`; the TRCP/TRAP clean-authority PDFs in `Documents\Knowledge Repo` (off-repo, SOURCING channel 2) |

---

## SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L528 | *(none)* Registry verification backlog | WORLD-STATE-STALE (counts, FE-14 gate) + limb (a) CLOSED-BY-LATER-RULING (#108) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L607 | `V5-ATTRIB` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L609 | `Q-T19-1` | DEFERRED / HELD IN MICHAEL'S WORDS (`D-6`, #98) | MICHAEL-IN-WORDS | MED | registry verification | Y |
| L611 | `Q-T19-3` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L612 | `Q-T19-4` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L749 | `Q-WS2-3` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L753 | `Q-WS3-3` | ACT, NOT RULING (Michael's hand) | KEEP | HIGH | Michael's hand | Y |
| L754 | `Q-WS3-4` | ACT, NOT RULING (Michael's — confirm/supply) | KEEP | HIGH | Michael's hand | Y |
| L757 | `Q-RL6-1` | WORLD-STATE-STALE (*Pharr* WAS read, #117) | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L758 | `Q-RL6-2` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L759 | `Q-RL6-3` | LIVE, UNCHANGED (ROUTE-C wording act) | KEEP | HIGH | registry verification | Y |
| L760 | `Q-RL6-4` | LIVE, UNCHANGED (register-only ID) | KEEP | HIGH | Michael's hand | Y |
| L762 | `Q-RL6-6` | ACT, NOT RULING (Michael's hand) | KEEP | HIGH | Michael's hand | Y |
| L764 | `Q-COM-10-B` | LIVE, UNCHANGED (unblocked ≠ closed) + parent-row overlap | ANNOTATE-KEEP | MED | Q-COM-10 list | Y |
| L765 | `Q-COM-10-C` | LIVE, UNCHANGED (register-only ID) | KEEP | HIGH | Q-COM-10 list | Y |
| L766 | `Q-COM-10-D` | LIVE, UNCHANGED (register-only ID) | KEEP | MED | Q-COM-10 list | Y |
| L768 | `Q-COM-10-F` | LIVE, UNCHANGED | KEEP | MED | Q-COM-10 list | N (comment text also in parent row L832) |
| L769 | `Q-DES-1` | LIVE, UNCHANGED (premise already corrected in-row) | KEEP | HIGH | free-standing | Y |
| L770 | `Q-DES-2` | LIVE, UNCHANGED (register-only ID) | KEEP | HIGH | free-standing | Y |
| L771 | `Q-DES-3` | LIVE, UNCHANGED (register-only ID) | KEEP | HIGH | free-standing | Y |
| L772 | `Q-DES-4` | LIVE, UNCHANGED — sole home of TAMES in the record | KEEP | HIGH | free-standing | Y |
| L774 | `Q-DES-6` | LIVE, UNCHANGED (survivor of the `Q-RL6-5` pair) | KEEP | HIGH | free-standing | Y |
| L775 | `Q-DES-7` | LIVE, UNCHANGED — sole home of the `caseName` artifact | KEEP | HIGH | free-standing | Y |

**23 rows, each once. Proposals: CLOSE 0 · CLOSE-SPLIT 0 · ANNOTATE-KEEP 3 · KEEP 19 · RECLASSIFY-ACT 0 · MICHAEL-IN-WORDS 1.**


---

<a id="slice-b5"></a>

## ===== SLICE B5 =====

# WAVE-2 SWEEP — SLICE B5 REPORT

**Sweeper:** B5 · **Slice:** 25 rows, register lines **L778–L856** · **Date:** 2026-09-01 · **Basis:** the staged
evidence set at HEAD `7f02131` only. **Read-only.** Nothing was adjudicated, edited, minted or closed; this file is
the only thing written. Every quotation below was copied out of the staged file by program, never retyped.

## Method notes and control values

- **ID grep, all 25 IDs**, across the live log, the closed archive, `BUILD-STATE.md`, `session-log-toc.md`, the
  register, both audits and `id-collision-report.md`. Six IDs whose literal form is a prefix of a longer live ID
  (`Q-COM-1`, `P-COM-1`, `TOC-1`, `TOC-2`, `Q-AUTH-2`, `Q-QBO-1`, `GLR-2`) were re-run word-bounded
  (`ID([^0-9]|$)`). **Firing control:** `Q-ZZZ-9([^0-9]|$)` → **0** in the live log; `192.5(d)` → **4** (a
  positive control on the same regex family). `grep -c -F "zzzznotpresent"` → **0** in the register and the TOC.
- **Uniqueness:** every one of the 25 rows is a SINGLE line in the register, and each row's whole line returns
  `grep -c -F` = **1**. Positive control: `Q-WF-4`'s line (L900) → 1.
- **Anti-resurrection ledger:** all 25 IDs and all six series prefixes → **0**; control `FE-1` → **2**. No row in
  this slice has ever been retired-and-resurrected.
- **`docs/record/session-log-toc.md` was grepped by SUBJECT as well as by ID** (`Whaley` 1 · `Anastassov` 1 ·
  `runbook` 4 · `pilot-recording` 1 · `communications-log` 1 · `QBO` 3), and the entries those abstracts named
  were then read with `sed -n`. No abstract carried a ruling the entry itself did not.

### One ID-identity finding that applies across the slice

**The `TOC-n` namespace carries two unlike things and the register only holds one of them.** `TOC-1`, `TOC-2`,
`TOC-3` and `TOC-5` are packet-local questions from the Task 17 finding-aid packet (#91). `TOC-4` and `TOC-6` are
**RULED HOUSE CONVENTIONS** — `BUILD-STATE.md` at HEAD reads:

> QR-1..QR-6 + MM-1 + OPEN-5(a) + TOC-4 + TC-2..TC-5/TC-12 ALL CLOSED; runner v12** (`docs/prompts/QUEUE-RUNNER.md`, th

> **`TOC-6` IS RULED — `#nn` IS DESIGN-ONLY

A future session grepping `TOC-` and finding ruled conventions must not infer that `TOC-1`/`TOC-2` are ruled. The
collision report's `TOC` line (200 occurrences, 7 distinct, range 1–6) does not draw this distinction.

---

## PER-ROW BLOCKS (non-KEEP proposals)

### `GLR-2` (L800)

**1. The question.** Whether pointer/derived docs take a stable, unversioned path while one-time passes keep the
dated `docs/specs/<topic>-<YYYY-MM-DD>.md` convention — put on `docs/specs/go-live-runbook.md`. PROPOSED, unruled.

**2. Greps.** `GLR-2` word-bounded: live log **3**, archive **0**, BUILD-STATE **1**, TOC **0**, register **1**,
2026-08-24 audit **2**, hardened audit **1**, collision report **0**. Control `Q-ZZZ-9` = 0.

**3. Call — `DUPLICATE-CANDIDATE` of `TOC-3` (L807). THE STEERING'S QUESTION, ANSWERED PLAINLY: YES, THEY ARE THE
SAME QUESTION — not merely a shared blocker.** Three independent statements say so.

(a) `GLR-2`'s own text, `docs/specs/attorney-review-queue.md`, L800:

> **This is the same question as `TOC-3`** (the session-log finding aid, entered one invocation earlier) — whether pointer/derived docs take stable paths while one-time passes keep the dated `docs/specs/<topic>-<YYYY-MM-DD

(b) `TOC-3`'s operative sentence, same file, L807 — **character-identical** to `GLR-2`'s:

> **Does Michael confirm the stable path, or does he want the project's dated convention applied here too?**

(c) The 2026-08-24 audit, `attorney-review-queue-audit-2026-08-24.md`, staged L113:

> | 292 | `TOC-3` | `TC-3`/`TC-4` put the abstract index at the stable, unversioned `docs/record/session-log-toc.md`. The general stable-vs-dated question survives only in its twin `GLR-2`. |

**4. Disconfirmation attempt — and it found a real asymmetry the twin-claim hides.** I tried to break the identity
two ways. (i) *Is either file's path now ruled?* No: `stable and unversioned` / `stable path` / `dated convention`
return nothing in the log but `GLR-2`'s own origin bullet at `#92`; no ruling exists on either. (ii) *Do the two
rows still nominate the same fact pattern?* **NO, and this is the finding.** `TOC-3`'s nominated path was retired
by a DIFFERENT ruling — `TC-4`, 2026-08-21 — and `BUILD-STATE.md` says so in terms while correcting itself:
*“this line still named the old `docs/specs/` path, which `TC-4` retired on 2026-08-21”*. The abstract index now
lives at `docs/record/session-log-toc.md` (verified: that is where the staged file is). `GLR-2`'s file is
**still at the path it proposes** — `docs/specs/go-live-runbook.md`, confirmed extant at HEAD by `#138` and by
`superseded-specs-candidates-2026-08-25.md` finding 2. **So “one ruling closes both” is true of the CONVENTION and
no longer true of the two PATHS.** And per the audit's own line 113, `GLR-2` is now the **sole surviving carrier**
of the general question — wave 1 took `TOC-3`, so closing `GLR-2` as a duplicate would destroy the question
entirely. That is the trap this block exists to name.

**5. PROPOSED: `KEEP` — confidence HIGH.** Duplicate in question, not in effect: `TOC-3` is the twin whose own
premise has gone stale, and the audit designates `GLR-2` the survivor. Rule the two together as one act; do not
close either as redundant to the other.

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`GLR-2` — Canonical path for the runbook — PROPOSED, unruled.** Staged at `docs/specs/go-live-runbook.md`, **stable and unversioned**, because the gates doc appends and this file must track it — a dated filename would accumulate stale copies of a pointer doc, each looking authoritative. **This is the same question as `TOC-3`** (the session-log finding aid, entered one invocation earlier) — whether pointer/derived docs take stable paths while one-time passes keep the dated `docs/specs/<topic>-<YYYY-MM-DD>.md` convention — **and one ruling closes both.** **Does Michael confirm the stable path, or does he want the project's dated convention applied here too?** **OPEN — PROPOSED, unruled (2026-08-16).**
```

### `GLR-3` (L801)

**1. The question.** What keeps `go-live-runbook.md` in step when a gate is appended — a standing obligation in
`Go_Live_Gates.md`, an update only at the go-live re-check, or accept the drift.

**2. Greps.** `GLR-3`: live log **3**, archive **0**, BUILD-STATE **1**, TOC **0**, register **1**, audit **1**,
hardened **0**, collision report **0** (its `GL`/`GL1`/`GLR` row calls the three strings *distinct*). `runbook` in
`Go_Live_Gates.md`: **0** — the gates doc carries no obligation to update the runbook. Control: `runbook` in the
TOC = 4 (the regex fires).

**3. Call — `WORLD-STATE-STALE`: the question is untouched, but the row's own arithmetic and its predicted harm
are both out of date, and the harm has now MATERIALIZED and been MEASURED.** The row says *“Gates have been
appended four times”* (2026-07-25, 07-28, 08-11, 08-12). At HEAD `Go_Live_Gates.md` carries at least four further
append events after the row was written on 2026-08-16 — I read them off the staged file: `## Gate 10 (appended
2026-08-18, C-4 of the Grok external review)`; the GL-1 *Clarification appended 2026-08-18 (OPEN-1…)*; the
gate-1 *Correcting append (drafted 2026-08-19 for `GL1-1`…)*; and gate 3's *CLOSED — RULED by Michael,
2026-08-20* note. And the drift the row predicted is now a confirmed defect. `#138` (live log, staged L545–547):

>   recovers it, and its two same-batch siblings both carry the full house head. `go-live-runbook.md`'s line
  pointers **no longer resolve** — it says gate 3 is at L24; L24 is a mid-gate-1 append and gate 3 is at
  L61 — and the file's own status line already calls itself *"a defect"* where it differs.

`superseded-specs-candidates-2026-08-25.md` finding 2 measures it:

> **2. `go-live-runbook.md`'s LINE POINTERS NO LONGER RESOLVE.** It is a pure pointer table into `Go_Live_Gates.md`, cited by line number, and its header records what it was read against: *"`Go_Live_Gates.md` at `6ca9794` — 106 raw / 84 non-blank."* **At HEAD that file is 234 raw / 194 non-blank — more than double.** Checked directly: the runbook says *"Gate 3 (L24)"*; **line 24 today is a mid-gate-1 append, and gate 3 is actually at line 61.** The drift is structural — the gates doc grew by appends placed *beneath their own gates*, so every pointer below gate 1 shifted. **The file convicts itself:** its own status line reads *"Where this runbook and the gates doc differ, the gates doc governs and **this file is a defect**."*

**Independently re-derived here at HEAD, not taken on the report's word:** `wc -l docs/specs/Go_Live_Gates.md` =
**234**; `grep -c .` = **194**; line 24 is `   *inactivity.” **On 2026-08-19, before pasting gate 10's
migration, Michael read his own Supabase*` (a mid-gate-1 append); line 61 is `3. **RLS policies written and
tested**…` (gate 3). Both of the report's spot checks reproduce exactly.

**4. Disconfirmation attempt.** Searched for any ruling that would have answered it: `runbook` returns 0 in
`Go_Live_Gates.md`, so candidate 1 (a line in the gates doc) was never adopted; the go-live re-check session has
not happened (gates 1, 2, 4–9 are not all closed at HEAD); and no log entry rules the drift acceptable. The row
is genuinely open. Nothing here converts a Claude/runner finding into a ruling — `#138` and the superseded-specs
file are both PROPOSED reports.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance, add-only beneath the question, question
text untouched: *(i)* the append count is at least EIGHT, not four — gate 10 (2026-08-18), the OPEN-1
clarification (2026-08-18), the GL1-1 correcting append (2026-08-19) and gate 3's closing note (2026-08-20) all
post-date this row; *(ii)* option 3 (“accept the drift”) is no longer a costless default — the drift has
realized: `Go_Live_Gates.md` went from 106 raw / 84 non-blank to **234 raw / 194 non-blank** and every pointer
below gate 1 has shifted, verified at HEAD; *(iii)* the file convicts itself in its own status line.

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`GLR-3` — What keeps the runbook in step when a gate is appended?** Gates have been appended four times (6–8 on 2026-07-25; 9 on 2026-07-28; GL-1 on 2026-08-11; the GH-1 tripwire on 2026-08-12 — **all four verified present at HEAD by the runner**). Each append silently makes the runbook incomplete, and **unlike the `#91` session-log index this file cannot simply be regenerated** — its "who acts" and "done-when evidence" columns are judgement, not derivation. **Candidates: a line in `Go_Live_Gates.md` instructing an appending session to update the runbook; an update only at the go-live re-check session; or accept the drift and treat the runbook as advisory.** Note that adding an obligation to the gates doc **changes a binding, append-only doc, so it is a ruling, not a formatting choice** — and it would fire instructions-trigger #3. **OPEN — for Michael (2026-08-16).**
```

### `TOC-1` (L805)

**1. The question.** Is `#1` a lost label, never-assigned, or an open oddity — governing only how the index
describes it.

**2. Greps.** `TOC-1` word-bounded: live log **4**, archive **0**, BUILD-STATE **1**, TOC **0**, register **4**,
audit **1**, hardened **0**, ledger **0**. Positive re-derivation: `^## .*\(#N\)` over the archive gives the
lowest numbered entry as **2** (staged L4931, `## 2026-07-26 (#2) — Case authority index replaced with a locator
manifest (design, Opus 5)`); lowest in the live log is **24**.

**3. Call — `LIVE, premise VERIFIED, but the row now points a reader at the wrong FILE.** The substance holds at
HEAD and BUILD-STATE states it more broadly than the row does:

> **NO ENTRY ANYWHERE CARRIES `#1`** (`TOC-1`)

What changed is address, not fact. The row says *“No entry in the session log carries `#1`”* and reasons about
*“the entry immediately older than `#2`”* — but `Q-CAP-1` (2026-08-20) moved the whole `#2`–`#64` series
VERBATIM into the closed archive, and `TC-4` (2026-08-21) then moved the live log to `docs/record/`. I confirmed
the two entries the row reasons about sit in the ARCHIVE, adjacent and in the order the row assumes:
`4931\t## 2026-07-26 (#2) — Case authority index replaced with a locator manifest` immediately followed by
`4982\t## 2026-07-26 — Project knowledge capacity; case authority index (design, Opus 5)`. A session that runs
the row's check against `docs/record/session-log.md` today finds neither `#1` nor `#2` and can reach a wrong
conclusion from a correct grep.

**4. Disconfirmation attempt.** Looked for a later ruling or a `#1` anywhere: `\(#1\)` returns nothing in either
file; the abstract index still publishes *“`#2` – `#64`, no `#1`”*; no log entry rules on lost-label vs
never-assigned. The oddity is intact and unruled.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: name the file. The series the row
reasons about lives in `docs/archive/session-log-archive-2026-07-21_2026-08-12.md` since `Q-CAP-1` (2026-08-20),
`#2` and its unnumbered 2026-07-26 predecessor adjacent there; the index the answer governs is now
`docs/record/session-log-toc.md` and is REGENERATED every batch by the runner (`TOC-4`/`TC-3`), so an answer
takes effect at the next regeneration rather than by an edit. The QUESTION is unchanged.

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`TOC-1` — No entry in the session log carries `#1`.** The numbered series as written begins at `#2`, with no gap anywhere above it and no duplicate. Two readings are consistent with the file and it cannot distinguish them: either `#1` was assigned to the entry immediately older than `#2` (the unnumbered 2026-07-26 "Project knowledge capacity; case authority index" entry) and the label was lost, or numbering simply began at `#2` and `#1` never existed. **Does Michael want `#1` treated as a lost label, as never-assigned, or left as an open oddity in the record?** No entry is renumbered either way — the log is append-only — so this governs only how the index describes it. **OPEN — for Michael (2026-08-16).**
```

### `TOC-2` (L806)

**1. The question.** Does Michael want the `runner 23` / `#65` date inversion diagnosed (a Code session checking
commit dates), or left recorded as an unexplained ordering.

**2. Greps.** `TOC-2` word-bounded: live log **11**, archive **0**, BUILD-STATE **0**, TOC **0**, register **4**,
audit **1**, hardened **0**, ledger **0**.

**3. Call — `WORLD-STATE-STALE`. The row's stated premise is FALSE at HEAD: *“This one has no stated explanation
anywhere in the log”* — `#123` supplies one.** `docs/record/session-log.md`, entry
`## 2026-08-20 (#123) — THE CAPACITY RULINGS LAND: `Q-CAP-2` executed and verified in the sync filters, `Q-CAP-1`
RULED at the 2026-08-13 cutoff — and the pre-flight finds`, staged L2148–2150:

>   2026-08-13 is **NOT contiguous**. The log holds a genuine inversion at the boundary — the
  **TWENTY-THIRD invocation's runner line is dated 2026-08-12** (a just-past-midnight run) and sits
  **between two 2026-08-13 entries** (the twenty-fourth invocation's line above it, `#65` below).

The ordering premise itself I verified positionally at HEAD and it is intact: the twenty-third invocation's runner
line is at staged L9153 (`## 2026-08-12 — QUEUE-RUNNER batch (runner line; TWENTY-THIRD invocation)`) and `#65`
at L9195 (`## 2026-08-13 (#65) …`), i.e. still ABOVE it in a newest-first file, and both are still in the LIVE
log rather than split across the archive boundary.

**4. Disconfirmation attempt — and the stakes turn out to be higher than the row knows.** I tried to find that
`#123`'s parenthetical is not really an explanation. It is a design session's characterization, not a
commit-date diagnosis, so the row's *diagnose-it* limb genuinely survives. **But the inversion is now
LOAD-BEARING**, which nothing in the row says. Same entry, staged L2151–2153:

>   A by-date split would extract it from the middle and REORDER the record. **RULED SHAPE THEREFORE:
  the cut is POSITIONAL, calibrated by the date** — archive everything from the `#64` heading
  (`## 2026-08-12 (#64) — CR-3 CODE SHEET…`) to end of file; keep everything above it. **One

The archive cut was ruled POSITIONAL *because of this very inversion*, and the twenty-third runner line was
deliberately left in the live log for that reason. Any answer that “corrects” the ordering would move the
`Q-CAP-1` boundary — a far larger act than the row contemplates.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance, add-only: *(i)* an explanation now
exists — `#123` (2026-08-20) records the twenty-third invocation's line as *“a just-past-midnight run”* — so the
row's *“no stated explanation anywhere”* premise is spent, though the commit-date diagnosis is still unrun;
*(ii)* the inversion is load-bearing on `Q-CAP-1`'s ruled POSITIONAL cut, so “diagnose and correct” would move
the archive boundary anchor. **Do not close it: the choice between diagnosing and leaving it recorded is still
Michael's, and now costs more than the row states.**

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`TOC-2` — The `runner 23` / `#65` date ordering is unexplained in the file.** The TWENTY-THIRD invocation runner line is headed 2026-08-12 and sits ABOVE `#65`, headed 2026-08-13, in a newest-first log. Four other out-of-order pairs exist and the log accounts for two of them in terms (the DT-1 exhibit corrected at `#50`; the `#45` packet that sat unprocessed, where "entry numbers follow processing order, dates follow authoring"). **This one has no stated explanation anywhere in the log.** It resembles the DT-1 *inverse* case already noted in the project instructions — a runner line carrying a date that is not its run date. **Does Michael want this diagnosed (a Code session can check the commit dates for that batch), or left recorded as an unexplained ordering?** Nothing is corrected either way without his ruling. **OPEN — for Michael (2026-08-16).**
```
### `Q-COM-1` (L823)

**1. The question.** Is “platform-agnostic on chat-source ingest” a ruled design constraint, an unruled
observation, or withdrawn now that its price is on the record.

**2. Greps.** `Q-COM-1` **word-bounded** (the bare string returns 39 in the live log because `Q-COM-10`…`-12`
share the prefix — an ID-is-not-an-identity trap in this very row): live log **4**, archive **0**, BUILD-STATE
**1**, TOC **0**, register **2**, audit **2**, hardened **0**, ledger **0**. (The raw, unbounded counts are 39 /
16 / 7 / 2 — every extra is a `Q-COM-10`…`-12` hit.)

**3. Call — `LIVE, UNCHANGED` on the question; `WORLD-STATE-STALE` on its evidence pointers.** The premise holds
at HEAD, in BUILD-STATE's own words:

> **UNRULED, adopt nothing: `future-modules-capture-2026-07-28.md`.**

**But both of the row's citations are now dead pointers, twice over.** The row cites
*“a paragraph `session-log.md:4934–4948`”* and *“The runner line at `:4812`”*. At HEAD, `docs/record/session-log.md`
line 4934 begins `- **17's DESIGNATION IS THE COURT'S OWN WORD: MEMORANDUM OPINION**` and line 4812 reads
`  anything was put. **A bridge \`git status\` stranded a fresh 0-byte \`.git/index.lock\``.** Both are unrelated
content. The quoted sentences did not move within a file — **they moved to a DIFFERENT FILE**: `Q-CAP-1`
(2026-08-20) relocated them to the closed archive. They are at
`docs/archive/session-log-archive-2026-07-21_2026-08-12.md`, under
`## 2026-08-09 (#43) — Slack considered and DECLINED for now; Claude Tag logged as a paralegal-era watch item`,
staged L2074–2075:

> future-modules-capture-2026-07-28.md. **No ruling was made on Slack, Teams, or Claude Tag
adoption; nothing entered the build queue.** Decision point named: the paralegal hire.

and the `:4812` runner sentence is under `## 2026-08-09 — QUEUE-RUNNER batch (runner line; EIGHTH invocation)`,
staged L1939–1940:

>   Slack-decline and the Teams preference are recorded as **Claude recommendations, unruled**, and
  Claude Tag entered **no** build queue or roadmap. Nothing set to verified.

The 2026-08-24 audit flagged the cite class but not the file move — `attorney-review-queue-audit-2026-08-24.md`
staged L248–250:

> 4. **Line-number cites into prepending/rewritten files** survive in at least four rows (`Q-COM-1`
   cites `session-log.md:4934–4948`; `Q-QBO-3` cites `BUILD-STATE.md:69`) — CITE-STABILITY violations
   that are already dead pointers.

**4. Disconfirmation attempt.** Is the constraint ruled anywhere later? `future-modules-capture-2026-07-28.md` is
named 5 times in the live log and once in BUILD-STATE, and **every** occurrence says unruled / not-annotated;
the `#106` FC block ruled fifteen adjacent items and touched neither `Q-COM-1` nor the capture. Is it a duplicate
of `Q-QBO-1`? **No** — shared source document and shared gate, different constraints (chat-source
platform-agnosticism vs the four QBO constraints), and `Q-COM-1` offers a third option (“withdrawn now that its
price is on the record”) that `Q-QBO-1` does not. Per the brief, a shared blocker is not a duplicate.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: replace the two dead line cites with
CITE-STABILITY-compliant pointers — the passages are in the CLOSED archive under `#43` (2026-08-09) and the
EIGHTH invocation's runner line, quoted by sentence not by line. **The question is unchanged and open.**

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`Q-COM-1` — Is "platform-agnostic on chat-source ingest" a constraint, or is it still a Claude opinion?** It originates in `future-modules-capture-2026-07-28.md` §3, in a paragraph `session-log.md:4934–4948` describes as *"Claude's recommendation (opinion, not a ruling)"* and closes with *"No ruling was made on Slack, Teams, or Claude Tag adoption."* The runner line at `:4812` says the same. BUILD-STATE still lists the whole file as *"UNRULED, adopt nothing."* The dispatch that produced this memo called it a **ruled** constraint. §5.4 prices it for the first time: relative to mail it costs a second public HTTPS endpoint, private-key custody, an outside vendor's discretionary approval, and an unestablished metering position — for a channel the firm does not currently use. **Does platform-agnostic chat-source ingest become a ruled design constraint on any future communications-log work, does it stay an unruled observation, or is it withdrawn now that its price is on the record?** *(This is the same gate as `Q-QBO-1`, firing a second time. The capture was deliberately NOT annotated — annotating it answers this question.)*
```

### `Q-COM-4` (L826)

**1. The question — TWO limbs.** (i) Is `Q-WF-4` upstream of the communications log too? (ii) Does a third
consumer move it up the queue?

**2. Greps.** `Q-COM-4`: live log **2**, archive **0**, BUILD-STATE **1**, TOC **0**, register **3**, audit **0**,
hardened **0**, ledger **0**. Phrase greps in the register: *“third consumer move it up the queue”* **1**;
*“referral acts are attorney-initiated and synchronous”* **1**; *“30-day retention window”* **2**;
*“does this application acquire a server-side identity”* **2**. Control `zzzznotpresent` = 0.

**3. Call — `CLOSED-BY-LATER-RULING` on limb (i); limb (ii) untouched.** Michael ruled the amendment, and it was
executed into `Q-WF-4`'s row. `attorney-review-queue.md` L900:

> **ANNOTATED add-only 2026-08-16 (#94), NOT CLOSED — THE ROW NOW NAMES ALL THREE CONSUMERS, at Michael's ruling "Amend the row."** Full text per QR-1: **"`Q-WF-4` now has THREE consumers on the record and the row must say so: WF-2–WF-8 (every pipeline a background watcher measured in weeks); #87's `Q-QBO-3`; and #89's `Q-COM-4`, the most demanding — a communications log wants everything 

Corroborated in the log by the ruling session itself, `## 2026-08-16 (#94) — FABLE-RUN ADJUDICATION: QR-6(a)–(f)`
`ALL RULED IN taking the runner to v9 with`, staged L5506–5508:

> - **Q-WF-4's row is ANNOTATED with its three consumers** (WF-2–WF-8, Q-QBO-3, Q-COM-4 — the last
  the most demanding), add-only, full text per QR-1. The identity question itself remains open and
  Michael's.

Limb (i) asked whether `Q-WF-4` is upstream of the communications log. Michael's *“Amend the row”* adopted text
that says it is, naming `#89`'s `Q-COM-4` as the third and most demanding consumer — so the row's informational
purpose is spent. **Limb (ii) — priority — was never put and never ruled;** `#94`'s own closing sentence for
that bullet is *“The identity question itself remains open and Michael's,”* which says nothing about queue order.

**4. Disconfirmation attempt.** (a) *Is “Amend the row” a housekeeping instruction rather than an adjudication?*
It is Michael's word, attributed as a ruling in both the row and the entry, and what it adopted is a substantive
assertion of upstream-ness carried per QR-1. I record the weaker reading honestly: someone could read it as
purely clerical, which is why this is MED and not HIGH. (b) *Is the row's parenthetical “Q-WF-4 itself was not
amended” now false?* **No — and I will not report it as false.** It accurately describes what `#89` did on
2026-08-16; `#94` amended the row later the same day. The right annotation is “and `#94` then amended it,” not a
correction. (c) *Does anything reopen it?* `AS-Q1` (`#140`, 2026-08-31) rules *“Yes — server-side function +
secret; fixture writer only now; note CLAUDE.md”* and the log calls that *“`Q-WF-4`'s first instance”* — a shape
decision for ONE consumer, not a priority ruling and not a closure of `Q-WF-4`, whose row is still ⬜.

**5. PROPOSED: `CLOSE-SPLIT` — confidence MED. Surviving limb: “does a third consumer move `Q-WF-4` up the
queue?”** The row STAYS; limb (i) is marked closed by Michael's `#94` ruling with a pointer to `Q-WF-4`'s
amendment; the priority limb and the row's unique `#88` provenance sentence (*“#88 declined to add a third
because referral acts are attorney-initiated and synchronous”*, register count 1) are preserved verbatim.
**Closing the whole row would destroy that sentence and the priority question — both exist nowhere else.**

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`Q-COM-4` — Q-WF-4 now has a third consumer, and it is the most demanding one. Does that change its priority?** #85 recorded *"does this application acquire a server-side identity, and of what shape"* as having two consumers (WF-2–WF-8, and #87's `Q-QBO-3`); #88 declined to add a third because referral acts are attorney-initiated and synchronous. **A communications log is not** — it wants everything, continuously, and §7.2 shows even the metadata-only version needs a scheduled runner to beat a 30-day retention window. **Is Q-WF-4 upstream of the communications log too, and does a third consumer move it up the queue?** *(Recorded as a fact about that question; Q-WF-4 itself was not amended.)*
```

### `Q-COM-5` (L827)

**1. The question.** Is a third party's DISCRETIONARY approval an acceptable dependency for a system holding
privileged client communications — and does the answer bind the QBO and e-filing paths, which have the same shape.

**2. Greps.** `Q-COM-5`: live log **1**, archive **0**, BUILD-STATE **1**, TOC **0**, register **1**, audit **0**,
hardened **0**, ledger **0**. Phrase `discretionary approval`: live log **1**, BUILD-STATE **1**, register **2** — the live and
BUILD-STATE hits are `#89` and its BUILD-STATE summary; the register hits are this row and `H12-v`. No
ruling anywhere. Control `zzzznotpresent` = 0.

**3. Call — `LIVE, UNCHANGED`, but a FOURTH path of the same shape has since arrived and it is now the most
urgent one.** The row names three paths (Teams, QBO, e-filing). Since it was written, `H12-v` was minted
(`#134`, 2026-08-22) and it is a fourth instance of exactly the gate class the row asks about — a vendor's
discretionary willingness to sign. `attorney-review-queue.md` L482–483:

>   Michael's, waiting on two things only he can answer: **(1) will AWS sign a HIPAA business
  associate addendum for a solo firm?** and **(2) where does the malpractice carrier land on

The same row records the OpenAI alternative as *“BAA-eligible without an enterprise agreement (emailed request,
case-by-case review)”* — a second discretionary approval — and `#130` records *“BAA is a hard gate — CONFIRMED.
No real record moves through the API call until it is signed.”*

**4. Disconfirmation attempt.** Does `#130`/`H12-v` ANSWER `Q-COM-5`? **No.** `#130` rules the architecture (the
app calls the model on a BAA-covered account) and expressly leaves the vendor open; it never rules on
discretionary approval AS A DEPENDENCY CLASS, and it says nothing about QBO or e-filing. **AN ID IS NOT AN
IDENTITY:** `H12` and `H12-v` are different questions, and the disclosures `H` series was renamed `HD-1`–`HD-22`
— none of that touches `Q-COM-5`, which appears nowhere in the `#130`/`#134` stretch (grep: 0).

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: the row's *“Is that acceptable in
principle?”* now has a **live, gating instance** rather than a hypothetical one — `H12-v`'s AWS BAA question and
the OpenAI case-by-case route are the same dependency shape, and the BAA is a hard gate before any real record
moves. An answer here would bind four paths, not three. **Do not close: the principle is unruled.**

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`Q-COM-5` — Teams message ingest introduces a gate class this record has never had: an outside vendor's discretionary approval. Is that acceptable in principle?** Every gate found in this chain so far is either Michael's ruling or another module's construction — #85 said so in terms. The Teams protected-API process is neither: *"To request access to these protected APIs, complete the following request form,"* reviewed *"every Wednesday"* with approvals deployed *"every Friday or Monday."* It cannot be ruled open and cannot be built around. **Before any effort goes into a Teams path, is a third party's discretionary approval of the firm's application an acceptable dependency for a system holding privileged client communications — and does that answer also bind the QBO and e-filing paths, which have the same shape?**
```

### `Q-COM-7` (L829)

**1. The question.** Is SMS in scope for a communications log at all — and if it is, does the firm move client
texting onto an ingestible channel (accepting A2P registration and, on the Teams path, no MMS).

**2. Greps.** `Q-COM-7`: live log **0**, archive **0**, BUILD-STATE **0**, TOC **0**, register **1**, audit **0**,
hardened **0**, ledger **0**. **Zero reported with a control:** the same regex family returns 4 for `TOC-1` and 2
for `Q-COM-4` in the live log, and subject greps `SMS` (live log **4**, all inside `#89`) and `COM-LOOK-4` (live log **1**, `#89`'s own
bullet) confirm the topic is discussed only inside `#89`. `SMS` in BUILD-STATE: **1** — the `#89`
summary line, which restates the finding and rules nothing.

**3. Call — `LIVE, UNCHANGED`, with a dependency the row cannot know about.** Nothing rules on SMS scope. But
`Q-COM-2` — the sibling row that asked where a written-channel communication lands — **was ruled and closed**
after this row was written. BUILD-STATE at HEAD:

> (`Q-COM-2`, CLOSED 2026-08-18, "Yes — adopt the list").** `

> The ruled list to add: **`e-service`, `email`, `first-class mail`, `certified-mail-RRR` (tracking number as its own field), `fax`, `portal`.** **NOTHING WAS WIDEN

**The ruled list contains no SMS/text value.** Located in the log at staged L4097, under `## 2026-08-18 — QUEUE-RUNNER batch (runner line; SIXTIETH invocation) — the FC-block batch`:
*“Rows: **THREE CLOSED** — `Q-RE-1` ("Both, separate triggers"), `Q-COM-2` ("Yes — adopt the list," closed as
ruled-DIRECTION with **the CHECK migration expressly NOT authorized**)”*.

**4. Disconfirmation attempt — and this is where I stopped myself.** The tempting call is that Michael's adopted
six-value list silently answers `Q-COM-7` in the negative. **It does not, and I will not report it as one:**
absence from an adopted enumeration is not a ruling excluding the absent item; `Q-COM-2` was scoped to
`transcripts.source` / `staging_items.source` CHECK vocabularies, not to ingest-source policy; the same session
(`#106`) left `Q-COM-7` untouched; and the row is still ⬜ at HEAD. A glyph is not a ruling and neither is a gap
in a list.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: a ruled source vocabulary now exists
(`Q-COM-2`, closed 2026-08-18, *“Yes — adopt the list”*: `e-service`, `email`, `first-class mail`,
`certified-mail-RRR`, `fax`, `portal`) **and it has no SMS value**, so answering `Q-COM-7` “yes” implies a
further amendment to a list Michael has already ruled — and the CHECK migration for even the ruled list is
expressly NOT authorized. That is a cost the row does not currently state. **The question is unchanged.**

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`Q-COM-7` — Should SMS be an ingest source at all, and is client texting already happening?** The dispatch names "SMS/voice sources per the planned capture kit," but the capture kit (`transcript-workflows.md` §9) is entirely a voice kit and **SMS appears in no spec as an inbound source** — its one mention is an outbound escalation channel. Meanwhile the Microsoft path apparently cannot be read by this application at all (§6.3), CPaaS re-raises Q-WF-4 and adds a new custodian of privileged content, and a personal handset has no API of any kind. **Is SMS in scope for a communications log — and if it is, does the firm move client texting onto a channel that can be ingested, accepting A2P Brand/Campaign registration and, on the Teams path, no MMS and therefore no client photographs?**
```
### `P-COM-1` (L839)

**1. It carries NO QUESTION.** It is a proposition — TRCP 192.5(a)(2), work product includes communications —
marked `[A]` and **UNVERIFIED**, with a *“Relied on for”* note. There is nothing here for Michael to *rule*.

**2. Greps.** `P-COM-1` word-bounded: live log **3**, archive **0**, BUILD-STATE **0**, TOC **0**, register **3**,
audit **1**, hardened **1**, ledger **0**. **The decisive grep is on the PROPOSITION, not the ID:** `192.5(a)(2)`
returns **0** in the live log, **0** in the archive, **0** in BUILD-STATE, and **1** in the register — this row.
Firing control on the same pattern family: `192.5(d)` → **4** in the live log.

**3. Call — `ACT, NOT RULING` (Michael's, twice over: minting and verification). And the ID is NOT the identity.**
`#94` (2026-08-16) ruled THREE TRCP work-product propositions into
`legal-rule-registry-discovery-enforcement-and-pleading.md` — its own words: *“the three TRCP propositions
(192.5(d) assertion-is-privilege; 192.5(c)(1) witness-statement exception; 192.3(h) substantially-verbatim
definition, notes are not a statement)”* — **and 192.5(a)(2) is not among them.** The hardened audit reached the
same shape for this row's siblings and stated the correct classification for the family
(`attorney-review-queue-audit-HARDENED-2026-08-25.md`, staged L101):

> These rows carry **no question** — the correct finding is *stale verification status*, not *ruled-but-open*. |

**4. Disconfirmation attempt.** (a) *Did the 2026-08-24 audit close it?* No — it left `P-COM-1` and `P-COM-5` LIVE,
in its “Registry / verification work (≈45 rows)” group; it closed `P-COM-2`/`-3`/`-4`, and the hardened pass
found those closures **NOT-A-RULING**. (b) *Is the proposition carried anywhere else?* No: the source memo's
packet was deleted per QR-1, `192.5(a)(2)` is register-only, and the phrase *“Work product comprises”* returns
**1** in the register and **0** elsewhere. (c) *Could Claude verify it?* No — registry discipline: **only Michael
verifies**, and minting a durable ID is his act.

**5. PROPOSED: `RECLASSIFY-ACT` (Michael's) — confidence HIGH.** This is not a ruling row and should not sit in
the ruling queue as though a decision were owed: it is a staged, unminted, unverified proposition awaiting
(i) minting into the registry and (ii) verification. **Do not close.** Reclassify only; the text must survive.

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`P-COM-1` — Work product includes communications, not just documents.** *"Work product comprises: … (2) a communication made in anticipation of litigation or for trial between a party and the party's representatives or among a party's representatives, including the party's attorneys, consultants, sureties, indemnitors, insurers, employees, or agents."* — TRCP 192.5(a)(2) `[A]`. **UNVERIFIED.** *Relied on for: a communications log is squarely work-product territory by the rule's own terms, not by analogy.*
```

### `P-COM-5` (L843)

**1. It carries NO QUESTION.** A proposition — TRE 503(a)(5), the definition of a *“confidential”* communication
— marked `[A]`, **UNVERIFIED**, with a *“Relied on for”* note naming it *“the limb an ingest pipeline lives or
dies on.”*

**2. Greps.** `P-COM-5`: live log **0**, archive **0**, BUILD-STATE **0**, TOC **0**, register **1**, audit **1**,
hardened **0**, ledger **0**. **Zero reported with a control:** `P-COM-1` returns 3 in the live log on the same
regex, so the pattern fires. Proposition grep: `503(a)(5)` → **0** live log, **0** archive, **0** BUILD-STATE,
**1** register (this row). Phrase *“reasonably necessary to transmit the communication”* → **1** register.

**3. Call — `ACT, NOT RULING` (Michael's: minting + verification), and it is the more exposed of the pair.**
`#94`'s three ruled-in propositions are all TRCP; **no TRE 503 proposition exists anywhere in the record.** This
row is the ONLY copy of the rule text in the repo — the memo it came from is `PROPOSED — RESEARCH ONLY` and its
packet was deleted per QR-1. The hardened audit's family classification applies verbatim (quoted at `P-COM-1`).

**4. Disconfirmation attempt.** Looked for a TRE 503 entry, a later ruling and a second carrier: `503(a)(5)`
returns zero outside the register; BUILD-STATE's registry lines name TRCP work-product entries `WP-1/2/3` and
entries A/B/F/19a/19b/12/32 — none is TRE 503. Nothing has overtaken it and nothing else holds the text.

**5. PROPOSED: `RECLASSIFY-ACT` (Michael's) — confidence HIGH.** Same disposition as `P-COM-1`, with a stronger
preservation warning: **closing this row deletes the only statement of TRE 503(a)(5) in the repository**, and it
is the rule the whole `#89` §6/§7 analysis turns on.

**6. Row first line (verbatim; `grep -c -F` in register = 1):**

```
- ⬜ **`P-COM-5` — Confidentiality turns on who the communication was intended to reach.** A communication is *"confidential"* if *"not intended to be disclosed to third persons other than those: (A) to whom disclosure is made to further the rendition of professional legal services to the client; or (B) reasonably necessary to transmit the communication."* — TRE 503(a)(5) `[A]`. **UNVERIFIED.** *Relied on for: the limb an ingest pipeline lives or dies on — whether a CPaaS vendor, a compliance-recording partner, or a cloud transcription arm sits inside (A) or (B) is the question §6 and §7 keep arriving at.*
```

---

## KEEP ROWS (LIVE, UNCHANGED — premise checked at HEAD, greps run)

L778 `Q-AUTH-2` — KEEP — registry verification — greps run: `Q-AUTH-2` (word-bounded: live 4 / arch 0 / BS 1 /
TOC 0 / reg 3 / hardened 1 / ledger 0), `Whaley` (live 11, BS 3, reg 5), `Hurlburt` (live 19, BS 3). **Premise-stale but
ALREADY ANNOTATED IN-ROW, so no annotation is owed.** Per steering I read `#104` first: it is a design session
(Opus 5) in which *“Nothing was verified, no cite was selected, no registry entry was created or changed”* — no
ruling. BUILD-STATE at HEAD confirms the runner finding — *“**(1) *WHALEY*'S PUBLICATION NOTATION IS IN THE COPY,
AND IT SAYS “DO NOT PUBLISH.”**”* — and adds *“under TRAP 47.7(a) *Whaley* has NO precedential value”*.
The row's own tail already reads
*“**STILL OPEN — your call, on corrected facts**”*. Disconfirm: could `Q-RL6-1`'s *Hurlburt* adoption moot
it? No — BUILD-STATE at HEAD: *“30 and 31 are cite-less and their cites are yours,”* so no adoption has happened.

L779 `Q-AUTH-3` — KEEP — registry verification — greps run: `Q-AUTH-3` (live 2 / arch 0 / BS 0 / TOC 0 / reg 2),
`Anastassov` (live 6, BS 1, TOC 1, reg 2 — this row plus the register's own Status header). No `Anastassov` registry entry exists; `#117` (2026-08-19) re-reads the
pair and says *“The cite supply for entries 30 and 31 remains Michael's; nothing was selected.”* The V-9
identification the row said “would have to come first” is done in-row; the entry question is unruled.

L780 `Q-AUTH-4` — KEEP — free-standing — greps run: `Q-AUTH-4` (live 3 / arch 0 / BS 0 / TOC 0 / reg 2),
`folder read` (live 3, BS 0), `search pass` (live 3, BS 1 — every one of the six unrelated to this question). **Disconfirm attempted and
rejected:** `Q-AUDIT-1`, the row's named neighbour, WAS ruled at `#105` as `PF-1` — but `PF-1` is a pre-ship
adversarial check on legal-content PACKETS, not a rule about how a folder-read RESEARCH TASK is designed;
Michael's picks there are *“(a) Legal-content packets”* and *“Design session, before shipping,”* neither of which
reaches this question. Nothing rules folder-read-plus-search-pass.

L813 `Q-T3P-1` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-1` (live 3 / arch 0 / BS 3 / TOC 0 / reg 4).
BUILD-STATE at HEAD still carries it live: *“a transfer can silently overwrite that README”* (`Q-T3P-1`,
`Q-T3P-2`). Noted, not proposed: the HK-5 native re-check found the declared path absent on the machine
BUILD-STATE was refreshed from, and BUILD-STATE already says that *“does not answer the preflight row.”*

L814 `Q-T3P-2` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-2` (live 1 / BS 1 / reg 3). BUILD-STATE at HEAD:
*“So HK-4 is probably a P15 → P1 TRANSFER — cheaper and more dangerous.”* HK-4 is still ⬜ and *“NOT RE-WORDED.”*

L815 `Q-T3P-3` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-3` (live 1 / BS 1 / reg 3). BUILD-STATE at HEAD:
*“The bundle also held ground-truth scripts, scorecard and findings, while HK-4 names only audio”* (`Q-T3P-3`).

L816 `Q-T3P-4` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-4` (live 1 / BS 1 / reg 1). BUILD-STATE at HEAD
restates the whole question and its consequence: *“One figure reports two different things. D1 auto-file and the
confidence thresholds wait on this scorecard.”*

L817 `Q-T3P-5` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-5` (live 1 / **BS 0** / reg 1). The BS-0 is real and
is reported with the control that `Q-T3P-4` and `-6` return 1 in the same file: **this row's substance is carried
NOWHERE but the register**, which raises the cost of closing it. Its one live-log hit is `#90`, which says the
reading *“is this session's inference, not a ruling.”*

L818 `Q-T3P-6` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-6` (live 1 / BS 1 / reg 1). BUILD-STATE at HEAD:
*“TELEMETRY LOCKDOWN IS NOT IN PLACE — CONFIRMED NOT SET 08-13 (#66) … Whether that gate reaches an
ATTESTED-FICTIONAL batch is `Q-T3P-6`.”* Both sides of the row's two-sided reading survive untouched.

L819 `Q-T3P-7` — KEEP — T3 / KICK-1 / P1 — greps run: `Q-T3P-7` (live 1 / BS 1 / reg 3). **A direction is not a
ruling, and both the row and BUILD-STATE say so.** The row records Michael's in-session words — *“is mine to rule — file it at `docs/` for now and carry the question into the q…”*
— and BUILD-STATE at HEAD confirms: Placement at `docs/` is your **interim** direction, not a ruling (`Q-T3P-7` open). The file is still at `docs/t3-pilot-recording-protocol.md`
(534 / 688, re-derived in BUILD-STATE's OPEN-5(a) sweep at batch 85). **`docs/` placement must not be read as a
closure — that is the exact inference the row exists to block.**

L825 `Q-COM-3` — KEEP — free-standing — greps run: `Q-COM-3` (live 1 / arch 0 / BS 1 / TOC 0 / reg 1),
`identity resolution` (live 1, BS 0 — the BUILD-STATE phrasing is `IDENTITY RESOLUTION HAS NO SUBSTRATE`, matched separately), `phone_number` (BS 1). Premise verified at HEAD in BUILD-STATE:
> **AND IDENTITY RESOLUTION HAS NO SUBSTRATE (`Q-COM-3`):** `email`, `phone_number`, `mobile`, `address`, `handle`, `upn`, `external_id` all **0** word-bounded — `parties` carries only `display_name`, `role_ta
`db/schema.sql` itself is **not staged**, so the underlying column counts are re-verified only through
BUILD-STATE's own re-derivation — see UNVERIFIABLE-HERE below. Nothing rules the question.

L828 `Q-COM-6` — KEEP — free-standing — greps run: `Q-COM-6` (live 1 / arch 0 / BS 0 / TOC 0 / reg 1),
`vendor-cost`/`vendor cost` (0 everywhere), `date conflict` (live 3 — `#87`'s Intuit conflicts and `#89`'s own flag, a different
vendor and no rule), `COM-LOOK-2` (live 1 — `#89`'s own SOURCING bullet, not a ruling). No standing rule on vendor-cost reliability was ever ruled. The
row's own staleness has deepened — the cited page's stated removal date (June 2026) is now more than two months
past — but that is a fact about the SOURCE, not about the question, and SOURCING already bars inferring currency
from a document, so no annotation is owed.

L830 `Q-COM-8` — KEEP — free-standing — greps run: `Q-COM-8` (live 1 / arch 0 / BS 1 / TOC 0 / reg 1),
`ruling 8.3` (live **0**, register 1 — this row), `8.3` (live 2, both unrelated `§8.3` references),
`opt-in per call` (live **0**, register 1), `never leaves hardware he controls` (live 1 — `#89` only,
register 1 — this row). BUILD-STATE at HEAD still lists it open:
*“AND THE ONLY MICROSOFT-NATIVE PATH TO CALL CONTENT INVERTS RULING 8.3 (`Q-COM-8`).”* **See UNVERIFIABLE-HERE:**
rulings 8.1 and 8.3 live in `transcript-workflows.md`, which is not staged, so I can confirm the row is open but
cannot test whether 8.3's text has since been amended.

L831 `Q-COM-9` — KEEP — free-standing — greps run: `Q-COM-9` (live 1 / arch 0 / BS 0 / TOC 0 / reg 1), `[C]`
(live 3 — two are the forty-fourth invocation recording *“`[C]` was NOT promoted to `[B]`”*, the third is
`#89`'s SMS bullet; BS 0). The provenance
convention has not gained a fourth tier and no ruling addresses `[C]`. Genuinely open.

L856 `Q-QBO-1` — KEEP — money module (no row) — greps run: `Q-QBO-1` word-bounded (live 5 / arch 0 / BS 1 / TOC 0
/ reg 3 / audit 1 / hardened 1 / ledger 0), `future-modules-capture` (live 8, BS 2, archive 5 — all eight live hits sit in the
`#87`/`#89` stretch and its runner lines, and every one records it as unruled, not-annotated, or
*“the staged constraints are not rulings”*). Premise verified at HEAD by BUILD-STATE's own closing line:
*“**UNRULED, adopt nothing: `future-modules-capture-2026-07-28.md`.**”* The money-module conversation the row waits on has not happened; BUILD-STATE at HEAD
still records *“none of the 37 tables is a money table.”* Related to `Q-COM-1` (same source document, same gate)
but **not a duplicate** — different constraint sets, and only `Q-COM-1` offers a withdrawal option.

---

## UNVERIFIABLE-HERE

Three things this slice touches cannot be settled from the staged evidence set.

1. **`Q-COM-8` — the text of rulings 8.1 and 8.3.** They live in `transcript-workflows.md` §8, which is not
   staged (`docs/specs/` holds only the eleven files listed in my brief). I can confirm the ROW is open and
   that nothing in the log or BUILD-STATE amends 8.3, but I cannot test whether 8.3 still says what the row
   says it says. **What would settle it:** a read of `transcript-workflows.md` §8 at HEAD.
2. **`Q-COM-3` — the schema counts.** `db/schema.sql` and the three migrations are not staged, so the
   `email` 0 / `phone_number` 0 / `mobile` 0 / `address` 0 / `handle` 0 / `upn` 0 / `external_id` 0 figures
   are re-verified only through BUILD-STATE's own OPEN-5(a) re-derivation at HEAD, not independently.
   **What would settle it:** a word-bounded grep over `db/` at HEAD.
3. **`Q-T3P-1` — the provenance README.** Whether it exists, and what it defines, is a fact about
   `..\data\pilot-recordings\` on Michael's P15. BUILD-STATE's HK-5 native re-check reports the path
   ABSENT on the machine it refreshed from and says that *“does not answer the preflight row.”* Under H5
   this is Michael's to answer, never a sweep. **What would settle it:** Michael, in one sentence.

Also noted, not a finding: whether a `v23` of the project instructions was ever pasted bears on nothing in
this slice, and the project-instructions field is not readable from here in any case.

---

## SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L778 | `Q-AUTH-2` | WORLD-STATE-STALE — premise false, ALREADY ANNOTATED in-row; question survives narrowed | KEEP | HIGH | registry verification | Y |
| L779 | `Q-AUTH-3` | LIVE, UNCHANGED — in-row annotation cures the V-9 gap; the registry-entry question is unruled | KEEP | HIGH | registry verification | Y |
| L780 | `Q-AUTH-4` | LIVE, UNCHANGED — `PF-1` (#105) is adjacent, not an answer | KEEP | HIGH | free-standing | Y |
| L800 | `GLR-2` | **DUPLICATE-CANDIDATE of `TOC-3`** — same question verbatim; but `TOC-3`'s path was retired by `TC-4` and the audit names `GLR-2` the sole survivor | KEEP | HIGH | free-standing | Y — the last carrier of the stable-vs-dated question |
| L801 | `GLR-3` | WORLD-STATE-STALE — “four appends” is now ≥8 and the drift has MATERIALIZED and been measured | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L805 | `TOC-1` | LIVE — premise verified at HEAD, but the row points at the wrong FILE since `Q-CAP-1`/`TC-4` | ANNOTATE-KEEP | MED | free-standing | Y |
| L806 | `TOC-2` | WORLD-STATE-STALE — `#123` supplies the “no stated explanation anywhere” the row denies exists, AND the inversion is load-bearing on `Q-CAP-1` | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L813 | `Q-T3P-1` | LIVE, UNCHANGED — BUILD-STATE carries it open at HEAD | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L814 | `Q-T3P-2` | LIVE, UNCHANGED — HK-4 still ⬜ and “NOT RE-WORDED” | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L815 | `Q-T3P-3` | LIVE, UNCHANGED — BUILD-STATE restates the gap at HEAD | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L816 | `Q-T3P-4` | LIVE, UNCHANGED — D1 auto-file and the thresholds still wait on this scorecard | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L817 | `Q-T3P-5` | LIVE, UNCHANGED — and BUILD-STATE count is **0**: the register is its only carrier | KEEP | HIGH | T3 / KICK-1 / P1 | Y — sole carrier |
| L818 | `Q-T3P-6` | LIVE, UNCHANGED — telemetry lockdown still NOT SET at HEAD; both readings survive | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L819 | `Q-T3P-7` | LIVE — Michael's in-session PLACEMENT DIRECTION is not a ruling, and both the row and BUILD-STATE say so | KEEP | HIGH | T3 / KICK-1 / P1 | Y |
| L823 | `Q-COM-1` | LIVE on the question; WORLD-STATE-STALE on its evidence — both line cites are dead and point at the wrong FILE | ANNOTATE-KEEP | HIGH | free-standing (shares the `future-modules-capture` gate with `Q-QBO-1`) | Y |
| L825 | `Q-COM-3` | LIVE, UNCHANGED — no identifier substrate at HEAD | KEEP | HIGH | free-standing | Y |
| L826 | `Q-COM-4` | **CLOSED-BY-LATER-RULING on limb (i)** — Michael, `#94`, *“Amend the row”*, executed into `Q-WF-4`; limb (ii) untouched | CLOSE-SPLIT (surviving limb: priority) | MED | Q-WF-4 server-side identity | Y if the WHOLE row closes — the `#88` provenance sentence and the priority question exist nowhere else |
| L827 | `Q-COM-5` | LIVE, UNCHANGED — a FOURTH path of the same gate class (`H12-v`) has since arrived and is hard-gated | ANNOTATE-KEEP | MED | free-standing | Y |
| L828 | `Q-COM-6` | LIVE, UNCHANGED — no standing vendor-cost rule was ever ruled | KEEP | HIGH | free-standing | Y |
| L829 | `Q-COM-7` | LIVE, UNCHANGED — the ruled `Q-COM-2` source list has no SMS value, but a gap in a list is not a ruling | ANNOTATE-KEEP | MED | free-standing | Y |
| L830 | `Q-COM-8` | LIVE, UNCHANGED — BUILD-STATE still lists the 8.3 inversion open (8.3's text UNVERIFIABLE-HERE) | KEEP | MED | free-standing | Y |
| L831 | `Q-COM-9` | LIVE, UNCHANGED — no fourth provenance tier ruled | KEEP | HIGH | free-standing | Y |
| L839 | `P-COM-1` | **ACT, NOT RULING** — carries no question; `#94` ruled three OTHER TRCP propositions and 192.5(a)(2) is not among them | RECLASSIFY-ACT (Michael's: mint + verify) | HIGH | registry verification | Y — only copy of TRCP 192.5(a)(2) in the repo |
| L843 | `P-COM-5` | **ACT, NOT RULING** — carries no question; no TRE 503 proposition exists anywhere in the record | RECLASSIFY-ACT (Michael's: mint + verify) | HIGH | registry verification | Y — only copy of TRE 503(a)(5) in the repo |
| L856 | `Q-QBO-1` | LIVE, UNCHANGED — BUILD-STATE at HEAD still reads *“UNRULED, adopt nothing”* | KEEP | HIGH | money module (no row) | Y |

**25 rows processed, each exactly once.** Dispositions: **KEEP 15** · **ANNOTATE-KEEP 6** · **CLOSE-SPLIT 1** ·
**RECLASSIFY-ACT 2** · **CLOSE 0** · **MICHAEL-IN-WORDS 0**. **No row in this slice should be closed outright.**

### Why nothing closes

Every row in this slice sits behind a gate Michael has not opened: the two unruled captures
(`future-modules-capture-2026-07-28.md`, still *“UNRULED, adopt nothing”* at HEAD), the T3/KICK-1
authorization (*“until you locate it or re-issue, T3 WORK IS UNAUTHORIZED”*), the registry's
only-Michael-verifies rule, and four free-standing method questions nobody has put to him. The only genuine
closure I found is **half of `Q-COM-4`**, and even that leaves a limb. The rest of the movement in this slice is
**premise drift, not adjudication** — six rows whose facts have changed under them while their questions stayed
exactly where they were.

---

<a id="slice-b6"></a>

## ===== SLICE B6 =====

# SWEEPER B6 — 30 rows, register lines L857–L915 (staged HEAD `7f02131`, 2026-09-01)

Read-only. Nothing adjudicated, nothing edited. Default is `KEEP`; the burden is on any closure.

**Slice composition:** `Q-QBO-2`–`-6`, `-8` (6) · `Q-RE-2`–`-7` (6) · `Q-PR3-1`, `-2`, `-4`–`-7` (6) ·
`Q-WF-1`, `-2`, `-3`, `-5`–`-10` (9) · `Q-IN2-2`, `-3`, `-4` (3). **30 rows, all glyph ⬜.**

**Uniqueness control run on all 30:** each row's first line (first 110 chars, `grep -c -F -f`) occurs
**exactly once** in `attorney-review-queue.md`. No row in this slice is a duplicated line.

**Grep control:** flattened word-bounded search over the live log and the archive
(`tr '\n' ' '`, `grep -oE "\b<ID>\b"`). Firing control: `Q-RE-1` live=3, `Q-RE-9` live=4, `Q-WF-4`
live=15, `Q-PR3-1` live=16 — the instrument disconfirms. Genuine zeros in the live log:
`Q-RE-2` 0, `Q-RE-5` 0, `Q-RE-7` 0, `Q-PR3-6` 0, `Q-PR3-7` 0, `Q-WF-8` 0, `Q-WF-9` 0, `Q-IN2-5` 0.
**Archive is zero for every ID in the slice** (all post-date the 2026-08-13 cutoff) — expected, and
the archive control (`Q-RE-1` arch=0 against 574,278 flattened bytes) is consistent.

---

## HEADLINE FINDINGS BEFORE THE ROWS

**1. The §5.3 `Q-RE-5` claim is HALF RIGHT, and its wrong half would have mis-ruled the row.**
The hardened audit says the row is world-state-stale on two grounds. The **FE-D1 ground holds**;
the **`generated_documents` ground does not**, because the migration that would have overtaken it
is UNRUN and BUILD-STATE at HEAD still asserts the absence. Full working at the `Q-RE-5` block.

**2. `Q-RE-4`'s stated premise is corrected by BUILD-STATE at HEAD, and nobody has carried the
correction into the row.** The row says the PNC funnel "**is not built**." BUILD-STATE says
*"'it is not built' was too wide"* — a `pncStatus` select whose options are exactly
`— / PNC / Client / Declined / Referred out` exists in the front end, stored in `parties.fields`.

**3. `Q-WF-7` is answered by two Michael rulings that both PREDATE the row**, and the row never
noticed either. Strongest closure candidate in the slice.

**FC-14's reach into the `Q-RE` series, stated precisely** (per-slice steering): FC-14 reaches
**`Q-RE-2` and `Q-RE-7` at the SOURCE-QUALITY limb only** (their TDRPC citations become quotable
and datable), reaches **`Q-QBO-6` at the "no source exists" limb** (its stated blocker is
discharged), and reaches **`Q-RE-3`, `-4`, `-5`, `-6` NOT AT ALL** (none carries a TDRPC
dependency). **It answers NO question in the series.** `#106` says only *"Q-RE-9's
unverifiable-citation wall falls with it"* — `Q-RE-9`, and nothing else, is named.

---

## NON-KEEP PROPOSALS

### `Q-QBO-3` (L858)

**1. First line, verbatim:**
`- ⬜ **`Q-QBO-3` — Does the QBO question wait on `Q-WF-4`, or does it get asked separately?** QuickBooks requires a client secret and a durable, writable home for a rotating refresh token; the application is a public-client browser SPA with no secret and no server-side identity (`BUILD-STATE.md:69`).`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** fold QBO into `Q-WF-4` as a second consumer, or ask it separately because its
shape is narrower and might be answerable sooner?

**3. Call: WORLD-STATE-STALE (cite + "answerable sooner" limb); question LIVE.**

- **The cite is dead.** `BUILD-STATE.md:69` at HEAD is the bare heading `## Data layer`
  (`sed -n '69p'`). CITE-STABILITY: BUILD-STATE is rewritten wholesale. Already noted by the
  2026-08-24 audit (`attorney-review-queue-audit-2026-08-24.md:249`).
- **The "fold or ask separately" limb is answered in PRACTICE, never ruled.** BUILD-STATE at HEAD,
  line 130: *"**ITS ROW NAMES ALL THREE CONSUMERS (#94)** — WF-2–WF-8, **#87's `Q-QBO-3`**, and
  **#89's `Q-COM-4`**."* Source: `docs/record/session-log.md`, `## 2026-08-16 (#94) — FABLE-RUN
  ADJUDICATION: QR-6(a)–(f) ALL RULED IN taking the runner to v9 with` (staged line 5447), at
  **staged line 5506**: *"- **Q-WF-4's row is ANNOTATED with its three consumers** (WF-2–WF-8,
  Q-QBO-3, Q-COM-4 — the last"* … **5507–5508**: *"the most demanding), add-only, full text per
  QR-1. The identity question itself remains open and Michael's."* An annotation is not a ruling.
- **The "answerable sooner" limb now has a demonstration.** `docs/record/session-log.md`,
  `## 2026-08-31 (#140) — (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE
  GRANTED on the checkout and on` (staged line 54), at **staged lines 82–84**: *"`AS-Q1` "Yes —
  server-side function + secret; fixture writer only now; note / CLAUDE.md" — the model call runs
  in a server-side function holding the credential as a Supabase secret (the LegiScan / pattern;
  `Q-WF-4`'s first instance)"*. Michael's words. A sibling consumer got a server-side identity of
  exactly the shape QBO needs, **five days after the audit and two weeks after the row**.

**4. Disconfirmation attempted, and it partly succeeds — which is why this is not a CLOSE.**
The row's build premise ("no secret and no server-side identity") is **still TRUE as a build fact**:
BUILD-STATE line 92 — *"legiscan-poller + statute-fetch edge functions written, **NOT deployed**"*
— and line 130 still frames `Q-WF-4` as *"**THE HARDEST GATE IS ON NO ROW AT ALL (Q-WF-4): does
this application acquire a server-side identity, and of what shape?**"* in a BUILD-STATE written by
**batch 85 (2026-09-01), i.e. AFTER `#140`**. So AS-Q1 is an *instance*, not the general answer,
and the record says so in its own words (*"`Q-WF-4`'s first instance"*). Also note the record
disagrees with itself on the consumer count — `#88` (staged line ~6403) says *"**`Q-WF-4` DOES NOT
ACQUIRE A THIRD CONSUMER** … **It stays at two** (WF-2–WF-8 and QBO)"*, `#94` says three. Not mine
to adjudicate; flagged.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: (i) replace the dead
`BUILD-STATE.md:69` cite with a heading cite; (ii) record that `Q-WF-4`'s row already names
`Q-QBO-3` as one of three consumers (`#94`, carried at HEAD), so the fold has happened in practice
and only the ruling is missing; (iii) record `AS-Q1` (`#140`) as `Q-WF-4`'s first ruled instance —
a server-side function holding one vendor-neutral secret — which is the precise shape QBO needs and
makes the row's own "might be answerable sooner" limb testable.

**6. Dependency tag:** `Q-WF-4 server-side identity`. **Unique text destroyed if closed:** N.

---

### `Q-QBO-6` (L861)

**1. First line, verbatim:**
`- ⬜ **`Q-QBO-6` — Should Texas client-property and trust-accounting authority enter the registry, and where?** A word-bounded dedupe at HEAD across all four registry files returns zero hits for `iolta`, `trust`, `safekeeping`, `commingl`, `client funds`, and `escrow`.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** run a retrieval pass against a named authority for the client-property/trust
layer; and if so, does it land in an existing registry file, in the fifth file `Q-STAT-5` asks
about, or nowhere until a money module exists?

**3. Call: WORLD-STATE-STALE on the row's stated BLOCKER (FC-14 reaches it); question LIVE.**

The row's reason for not drafting: *"Nothing was drafted here because the source was not retrieved
and SOURCING does not name the disciplinary rules among its sources."* Its `#88` annotation goes
further: *"**THE SOURCING HALF OF THIS ROW NOW HAS AN ANSWER, AND IT IS "NO SOURCE.""*

**That is false at HEAD.** `docs/record/session-log.md`, entry
`## 2026-08-18 (#106) — FABLE FC-BLOCK ADJUDICATION: fifteen FC items put one at a time, THIRTEEN`
(staged line 4102), at **staged lines 4131–4137**:

> `- **FC-14 / trigger #3: SOURCING gains a FOURTH NAMED CHANNEL** — State Bar / court-published`
> `  Texas conduct-and-administration rules as clean-authority PDFs in `Documents\Knowledge Repo\`,`
> `  cited by each PDF's own effective date. Michael acquired six documents by hand mid-session`
> `  (TDRPC eff. 3/7/2025; …). Q-RE-9's unverifiable-citation`
> `  wall falls with it.`

Michael's pick is recorded verbatim in the FC record (per the project instructions' SOURCING
bullet: *"Yes — amend SOURCING"*). BUILD-STATE carries it at HEAD, line 144: *"**SOURCING IS A
BINDING CONVENTION (Q-STAT-1 RULED 08-14 — CLOSED), AND IT GAINS A FOURTH NAMED CHANNEL BY RULING
(FC-14, 2026-08-18).**"* **The TDRPC — which carries Rule 1.14, safekeeping property, the
client-property rule this row is about — is now in hand as a clean-authority, dated PDF.**

**4. Disconfirmation — and it sharpens the annotation rather than defeating it.**
(a) The six documents Michael acquired are the TDRPC, the Rules of Disciplinary Procedure amends.,
the Rules of Judicial Administration amends., the Code of Judicial Conduct, the judicial-candidate
disciplinary rules and the rules of judicial education — **no IOLTA / trust-account operating rules
document is among them**, so the *trust-accounting* half still needs an acquisition, which is
Michael's hand permanently. What FC-14 supplies is the CHANNEL CLASS plus the TDRPC.
(b) The registry-absence measurement in the row's own first sentence is **still true at HEAD**: no
`iolta`/`trust`/`safekeeping`/`commingl`/`client funds`/`escrow` proposition exists. BUILD-STATE
line 116 confirms and escalates: *"**THE SAME ABSENCE HAS APPEARED FIVE TIMES.** … (3) **NOT ONE
CLIENT-PROPERTY OR TRUST-ACCOUNTING PROPOSITION** (`Q-QBO-6`)"*.
(c) The row's placement question (existing file / fifth file / nowhere) is untouched. BUILD-STATE
line 116: *"**FOUR research passes still stack behind `Q-STAT-5`'s one ruling.**"*

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: the `#88` "NO SOURCE"
finding is **overtaken by FC-14 (`#106`, 2026-08-18)** — SOURCING now names a fourth channel
covering exactly this class, and the TDRPC (eff. 3/7/2025) is in the Knowledge Repo, so the
retrieval pass this row asks for is **runnable today**; the residue is (i) whether Michael wants it
run, (ii) where it lands, and (iii) a trust-account/IOLTA operating-rules document, which is not
among the six and is his hand.

**6. Dependency tag:** `Q-STAT-5 stack`. **Unique text destroyed if closed:** **Y** — this row is
the only carrier of the six-term word-bounded sweep with the runner's native re-run at HEAD and the
`legal-rule-registry-draft-entries-medical-billing.md:213` false-positive identification.

---

### `Q-QBO-8` (L863)

**1. First line, verbatim:**
`- ⬜ **`Q-QBO-8` — Does the CorePlus metering change how a QBO read stage would be scoped?** Intuit's App Partner Program meters data-out calls — "reading accounts, querying company information, and fetching reports" — while data-in calls are unmetered and free; the free Builder tier carries 500,000 CorePlus credits a month and blocks rather than bills above the cap.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** *"Does this change anything, or is it filed as a fact?"*

**3. Call: LIVE, UNCHANGED — but with a Claude-side recommended answer already on the record and no
Michael word anywhere.** `docs/record/session-log.md`,
`## 2026-08-15 (#87) — CHAT-DISPATCH TASK 13: the QBO integration research memo — no read-only sco`
(staged line 6524), **staged line 6559**: *"anything. Not a ceiling for a solo practice — filed as
a fact, `Q-QBO-8`."* That entry's own §1, **staged lines 6528–6529**: *"**Michael did not / partici
pate and made no rulings. Everything staged is PROPOSED.**"*

**4. Disconfirmation:** live-log count for `Q-QBO-8` is **1** (that sentence) and BUILD-STATE count
is **0** — nothing else on the record touches it. No later entry revisits CorePlus. `QBO-LOOK-3`
(not my row) turns on an Intuit Reports-API migration date of **2026-08-31**, which has now passed;
that is a different row and I do not act on it, but it is adjacent world-state a QBO sitting should
know.

**5. PROPOSED: `MICHAEL-IN-WORDS` — confidence HIGH.** This is the cheapest row in the slice: a
one-word answer ("filed as a fact") closes it, the recommended answer is already drafted, and no
part of it needs research. It should go on the next hands-on list rather than sit as a research row.
**It is NOT closable by a sweeper** — a Claude "filed as a fact" is not a ruling.

**6. Dependency tag:** `money module (no row)`. **Unique text destroyed if closed:** **Y** — the
500,000-credit / block-don't-bill figure and the data-in-vs-data-out inversion live only here and in
the `#87` entry.

---

### `Q-RE-2` (L872)

**1. First line, verbatim:**
`- ⬜ **`Q-RE-2` — Does RE-1 record the referral EVENT only, or the fee-division ARRANGEMENT as well?** These are different systems.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** event log only, or the TDRPC 1.04(f)(2) arrangement record as well?

**3. Call: LIVE, UNCHANGED on the question; SOURCE-QUALITY limb improved by FC-14/FC-13.**
`Q-RE-2` returns **zero** flattened word-bounded hits in the live log and the archive (control
fires: `Q-RE-1`=3, `Q-RE-9`=4). Its origin entry,
`## 2026-08-16 (#88) — CHAT-DISPATCH TASK 14 + QR-5 RULED: the RE-1 inputs memo …` (staged line
6308), says at **staged lines 6310–6311**: *"**Two things, different in kind. Task 14: Michael did
not participate and made no rulings — all / PROPOSED.**"*

**What HAS moved:** `#88` recorded, at staged lines 6390–6393, that *"**NO SOURCE CONSULTED STATES
THE RULES' CURRENCY**"* and *"**the TDRPC currency figure is / UNESTABLISHED** and every `[B]`
proposition inherits that."* `#106` discharges that: FC-14 puts the TDRPC in hand at **eff.
3/7/2025**, and the FC-13 directed pass ran the same session — `docs/record/session-log.md`
staged line 4139: *"- **The FC-13 directed pass ran** (his direction, verbatim in the record): TDRPC
1.08(g) and"* … staged line 4140: *"1.04(f)(2) now match their citations as read"*.
**`Q-RE-2`'s field list and its 1.04(g) fee-strip consequence rest on 1.04(f)(2) — the one rule the
directed pass actually read.**

**4. Disconfirmation:** the pass is RETRIEVAL, not verification — `#106` staged line 4144:
*"**All retrieval, all UNVERIFIED; only Michael / verifies. No registry entry was created; backlog
unmoved.**"* And 1.04(g) itself was **not** in the FC-13 pass. So the row's economic claim is
better-sourced, not verified, and the question (event vs arrangement) is wholly untouched.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: the row's controlling cite
(TDRPC 1.04(f)(2)) has since been read against a clean-authority copy and **matches** (`#106`,
FC-13 directed pass), and the currency wall `#88` flagged is gone (TDRPC eff. 3/7/2025 via FC-14) —
so the row's premises are now sourced rather than `[B]`-tier; 1.04(g) was not in that pass and
remains unread; everything remains UNVERIFIED and only Michael verifies.

**6. Dependency tag:** `RE-1 pass`. **Unique text destroyed if closed:** **Y** — the two-systems
distinction and the 1.04(f)(2) minimum field set (participating firms, division basis, each share,
a consent timestamp that must sort before the referral date) exist in this row and the `#88` entry
only; no spec carries them.

---

### `Q-RE-4` (L874)

**1. First line, verbatim:**
`- ⬜ **`Q-RE-4` — Does RE-1 build the PNC intake funnel, depend on it, or duplicate it?** The master spec already designs it and calls it SETTLED: a person carries a status advancing on the same record — PNC → Client / Declined / **Referred out** — each outcome with a date and a short reason.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** does RE-1 build the PNC funnel, depend on it, or duplicate it?

**3. Call: WORLD-STATE-STALE — the row's "It is not built" is corrected at HEAD by BUILD-STATE
itself, and the correction has never been carried into the row.**

`docs/specs/BUILD-STATE.md`, **line 52**, verbatim:

> `- **INTAKE IS EMPTY IN THE DATABASE AND NOT EMPTY IN THE FRONT END (#88, `Q-RE-4`).** The master spec **designs** the PNC funnel and calls it SETTLED — PNC → Client / Declined / **Referred out** — and the db-side claim holds: word-bounded `PNC` returns **ZERO** across `db/` and `supabase/`, `parties` has **no status column**, and three separate places record the missing PNC → Client promotion path. **But "it is not built" was too wide: `src/domain/partyRegistry.ts` carries a `pncStatus` select on the `person` party type whose options are exactly `— / PNC / Client / Declined / Referred out`, stored in `parties.fields`.** So the funnel's CAPTURE exists as free-form jsonb while nothing in the database models it — **the same wrong-level pattern gate 10 was ruled to fix, one entity over.** Flagged, not built on`

This matters to the row's own conclusion. The row's last sentence argues that *"a referral engine
that does not reach the funnel can only record referrals of matters the firm already signed."*
**At HEAD the funnel's capture DOES exist** — including a literal `Referred out` value — so RE-1
has something to read today, at the wrong level, and the row's three-way question gains a fourth
answer: *promote the existing jsonb capture to columns on the gate-10 pattern.*

**4. Disconfirmation, and both limbs survive it.** The row's db-side facts are **explicitly
re-affirmed** by the same BUILD-STATE sentence (`PNC` ZERO across `db/`/`supabase/`; `parties` has
no status column; three places record the missing promotion path). So the row is not moot — only
its "not built" framing is too wide. `Q-RE-4` returns **1** flattened hit in the live log (its own
`#88` mint at staged line 6349) and **1** in BUILD-STATE (this line); nothing rules it.
The `src/domain/partyRegistry.ts` fact is **UNVERIFIABLE-HERE** directly — `src/` is not staged and
`Q-PR3-1` bars a design-side read — but BUILD-STATE is the ruled sole authority on what is built
(BUILD-STATE line 141: *"**src/ EXCLUDED**, which makes this doc the SOLE authority on what is
built"*), and it is a **Code-session** measurement, not a design-side one.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: carry BUILD-STATE line
52's correction into the row — *"it is not built" was too wide*; a `pncStatus` select with exactly
the four ruled values already exists in the front end, stored in `parties.fields`; the db-side
claims all hold; and the shape is the **gate-10 wrong-level pattern one entity over**, so
"build the funnel" now means *promote a capture that exists*, not *create one*.

**6. Dependency tag:** `RE-1 pass`. **Unique text destroyed if closed:** **Y** — the three-of-four-
triggers-fire-at-intake argument and the three cited absence sites
(`future-modules-capture-2026-07-28.md:61`, `spec-feedback.md:197–201`,
`cd2-role-mining-pass-2026-08-13.md:418`) are carried here and in `#88` only.

---

### `Q-RE-5` (L875) — **the §5.3 test**

**1. First line, verbatim:**
`- ⬜ **`Q-RE-5` — Does RE-1 produce a document, and if so whose tenant is it?** The queue row names a "referral letter" as an open piece.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** are the referral letter / 1.04(f)(2) consent instrument / declination letter
form-engine tenants that wait on FE-D1, does RE-1 carry its own minimal generation, or does it
produce no document at all in its first form?

**3. Call: WORLD-STATE-STALE on ONE of its two stated premises. The hardened audit's §5.3 is
HALF RIGHT.**

§5.3 says (`attorney-review-queue-audit-HARDENED-2026-08-25.md:191–193`):
> `Nine FE rows (`FE-4`…`FE-12`) carry the CD-1 gating language. **The tenth is `Q-RE-5`**, whose *"current reality"* paragraph reads *"FE-D1… is named, scoped and authorized but **NOT built**"* and cites `generated_documents` measurements from `#81`/`#83` — **five days before the build that extended that exact table.** Nobody sweeping the FE series would find it.`
> `**And three rows rest on a schema fact measured before that build:** `IN-3`, `WF-3` and `Q-RE-5` all rest on `#83`'s *"`generated_documents` has no status column of any kind."* **BUILD-STATE carries both that claim and the FE-D1 extension claim, five days apart, unreconciled** — and **the FE-D1 migration is UNRUN**, so `db/schema.sql` and the live database now disagree about this table. **Verify at HEAD before ruling any of the three.**`

**Verdict, limb by limb, verified at HEAD as §5.3 itself instructs:**

- **LIMB 1 — "FE-D1 … NOT built" — STALE. §5.3 IS RIGHT.** `docs/specs/BUILD-STATE.md` line 99:
  *"- **FORM ENGINE — FE-D1 IS BUILT (2026-08-20), CODE-COMPLETE, EXERCISED IN A BROWSER ON
  FIXTURES, AND ITS MIGRATION IS UNRUN.**"*
- **LIMB 2 — the `generated_documents` measurements — NOT STALE. §5.3's framing is over-broad.**
  `docs/specs/BUILD-STATE.md` line 83, at HEAD, **written by batch 85 on 2026-09-01, i.e. eleven
  days AFTER the FE-D1 build**: *"**Nor for IN-3: `generated_documents` has NO status column and NO
  set/parent column (#83).**"* The FE-D1 build's extension is a **code-and-migration** fact whose
  migration is **UNRUN** (line 99: *"migration still UNRUN (`MIG-1`; `HD-18` ruled it runs now,
  unchanged, by Michael's hand)"*), so **the live database has neither the seven new columns nor a
  status column nor a set/parent column**. The seven columns BUILD-STATE does name are *"seven
  nullable columns incl. the answer snapshot (FE-8 retention half) and posture (FE-15)"* — **no
  status column and no set/parent column among them.** The row's second premise therefore **holds at
  HEAD**, and closing or re-writing it on §5.3's headline would have introduced an error.
- **LIMB 3 — the `doc_type` CHECK admitting one value (`#81`) — UNVERIFIABLE-HERE.** BUILD-STATE
  carries **zero** `doc_type` mentions; `db/schema.sql` and `db/migrations/` are not staged.
  What would settle it: `grep -n doc_type db/schema.sql` plus the FE-D1 migration file, or a live
  `information_schema` read.

**4. Disconfirmation of my own call:** could the row be MOOTED because FE-D1 now exists and the
"wait on FE-D1" limb is therefore answered? No — FE-D1 is **fixture-only** and excluded from the
`GL-1` floor (line 99), and there is a **second, unauthorized** slice in front of it (`FE-D1A-1`,
register L215, ⬜). And `Q-RE-5` has **zero** flattened hits in the live log, the archive, BUILD-STATE
and the TOC — nothing anywhere rules it. Its question is untouched.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance, in two parts and in this
order: (i) *"FE-D1 … NOT built" is FALSE at HEAD — FE-D1 IS BUILT (2026-08-20), code-complete,
fixture-only, migration UNRUN, and a second amendment slice (`FE-D1A-1`) is open in front of it*;
(ii) *the `generated_documents` measurements STILL HOLD at HEAD (BUILD-STATE line 83), because the
extension rides an unrun migration — do not treat the FE-D1 build as having overtaken them*; and
(iii) the `doc_type` CHECK limb needs a `db/` read nobody has re-run.

**6. Dependency tag:** `discovery slice (FE-9/11/13, Q-FE*)`. **Unique text destroyed if closed:**
**Y** — the observation that a referral letter, a 1.04(f)(2) consent instrument and a declination
letter are **three documents with three different addressees and the record names only the first**
appears nowhere else in the register or the log.

---

### `Q-RE-7` (L877)

**1. First line, verbatim:**
`- ⬜ **`Q-RE-7` — Does RE-1 model INBOUND referrals, or outbound only?** Every trigger on the record is outbound.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** does RE-1 model inbound referrals, or outbound only?

**3. Call: LIVE, UNCHANGED on the question; SOURCE-QUALITY limb reached by FC-14.**
Zero flattened hits in the live log and the archive; zero in BUILD-STATE and the TOC. Origin `#88`,
Michael made no rulings.

**FC-14's precise reach:** the row rests on three authorities. **TDRPC 7.03(e)** was `[B]`-tier in
`#88` — *"Texas Center for Legal Ethics through a summarizing fetch layer, **not quotable as rule
text**"* (staged line 6382) — and `#88` further recorded a live divergence about 7.03's own
structure (staged lines 6386–6389): *"**Two State-Bar-affiliated sources disagree about Rule 7.03's
structure** … **they cannot both be operative**"*. FC-14 supplies a clean-authority TDRPC PDF with
its own effective date (3/7/2025), which is exactly the instrument that divergence needs.
**But the FC-13 directed pass read 1.08(g) and 1.04(f)(2) — not 7.03**, so 7.03(e) is still
unread in a clean copy and the structural divergence is still unresolved.
The other two authorities — **Penal Code §38.12(b)(3)** and **Gov't Code §82.0651(d)** — were
already `[A]` (bulk-corpus, quotable) and are untouched by FC-14.

**4. Disconfirmation:** does anything make the inbound/outbound question moot? No. BUILD-STATE line
83 at HEAD: *"**NOR FOR RE-1: `referral`, `conflict_check`, `disqualif`, `waiver`, `fee_split`,
`fee_share`, `PNC`, `prospective` all ZERO (#88)**"*. Nothing built either direction.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: FC-14 (`#106`, 2026-08-18)
puts a clean-authority, dated TDRPC in the Knowledge Repo, so this row's **7.03(e) proposition can
be upgraded from `[B]` to quotable and the `#88` "two sources disagree about 7.03's structure"
divergence is now resolvable** — but the FC-13 directed pass read 1.08(g) and 1.04(f)(2) only, so
**7.03 has still not been read**, and the row's question is unaffected.

**6. Dependency tag:** `RE-1 pass`. **Unique text destroyed if closed:** **Y** — the
`email-workflow-requirements.md:19` 60-day-mailbox finding that inbound is *"the direction that
actually feeds the practice"*, and the §82.0651(d) $50,000 solicitation-side penalty, sit only here
and in `#88`.

---

### `Q-PR3-1` (L886)

**1. First line, verbatim:**
`- ⬜ **Q-PR3-1 — the session's own method, raised against itself.** The working-set policy says design sessions do not read source (`BUILD-STATE.md:142`); that sentence predates the device bridge, and CHAT-DISPATCH's session-start line asks for the checkout precisely so HEAD can be read full-text.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** is a design-side `src/` read through the device bridge sanctioned — standing,
per-instance, or not at all?

**3. Call: LIVE, UNCHANGED — and the row's own COUNT is stale, which the row itself says is
load-bearing.** The row states: *"**it is annotated because the count matters to the ruling**: after
the #86 proposal this is the second task to be shaped by an unruled method question."* The
2026-08-24 audit (line 215) says *"**three** tasks have now stopped at it."* **At HEAD it is at
least six**, verified by flattened word-bounded grep (`Q-PR3-1` live=16) and by reading each hit's
enclosing entry:

| # | Entry (staged line of heading) | Staged line | Words |
|---|---|---|---|
| 1 | `#86` (6681) | 6762–6772 | the origin — *"raised against itself"*; the session DID read `src/` |
| 2 | `#89` (6210) | 6231 | *"**No `src/` read** — `Q-PR3-1` stays open and unassumed."* |
| 3 | `#102` (4555) | 4634–4635 | *"reading `src/domain/billing.ts` and `src/domain/transcripts.ts` / would answer `Q-PR3-1` by doing it."* |
| 4 | `#115` (3172) | 3255–3257 | *"whether a design session may read `src/` through the device / bridge at all — is UNRULED, and was not quietly assumed away."* |
| 5 | `#116` (2991) | 3045 | *"NOTHING WAS BUILT. src/ was not read (Q-PR3-1 unruled…)"* |
| 6 | `#140` (54) | 168 | *"no `src/` file read or written (`Q-PR3-1` unruled; the working-set policy governs)"* |

`#140` is **2026-08-31 — the most recent design session in the record.** The row is not merely open;
it has now shaped six sessions, the last of them nine days ago.

**4. Disconfirmation:** is there a ruling anywhere? BUILD-STATE line 141 at HEAD, written by batch
85 on 2026-09-01: *"*(Live tension, a queue item: **`Q-PR3-1`** asks whether a design-side `src/`
read through the device bridge is sanctioned at all…"*. No. Note also `#115` staged line 3256–3257:
*"**`Q-PR3-1` governs DESIGN sessions, / not Code**"* — the two `src/`-was-read hits in the log
(`#86`, the 2026-08-19 gate-10 build session at staged line 3128) are a design session raising it
against itself and a Code session, for which the bar does not apply. **No collision:** `Q-PR3-1`
is a namespaced single-meaning series per `id-collision-report.md:56`.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: update the row's own
count, which it declares load-bearing — **six sessions, not two**, listed with entry numbers, the
most recent being `#140` on 2026-08-31; and record that the cost has now appeared as concrete gaps
in three staged deliverables (`#102`'s undrafted `PrivilegeTier` edits, `#115`'s unanswerable
front-end question handed to a Code session, `#140`'s six-lens audit run without source).
**Also fix the two line-number cites** (`BUILD-STATE.md:142` and `:147`) — CITE-STABILITY bars them
into a wholesale-rewritten file; the hardened audit flagged both (`…HARDENED…:232`), and `:142` at
HEAD is not the working-set sentence (it is at line 141).

**6. Dependency tag:** `free-standing`. **Unique text destroyed if closed:** **Y** — the `#74`
*"the honest gap"* / ~60 `TAG-CHECK: NOT RUN` linkage and the "§2.3, §2.4 and §8 irregularly
obtained" consequence appear only here.

---

### `Q-WF-2` (L898)

**1. First line, verbatim:**
`- ⬜ **Q-WF-2.** `T3` names two different build tiers in two repo design docs: the transcription pipeline service (`transcript-sort-and-route-design.md:148`, gated on P1 hardware and KICK-1, **unauthorized**) and the LegiScan poller/matcher/watch-flags tier (`statute-text-and-bill-tracking-design.md:107`, gated on the O1 key, and **substantially built** per `session-log.md:7718`…`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** does the `T` series get the H → HK treatment, and if so which one moves — or is a
pointer note on the WF rows sufficient?

**3. Call: LIVE, and the row's premise UNDERSTATES the problem at HEAD.**

The row says `T3` names **two** things. `docs/specs/id-collision-report.md` **line 37**, at HEAD:

> `| `T` | 659 | 25 | both | 1–32 | **7 meanings**: transcript slices T1–T4; statute-tracking slices T1–T4 (BUILD-STATE: *"A second, unrelated T1–T4"*); heartbeat T1–T5 (renamed HB1–HB4 / CE1, N-1); time-tracker T1–T3 (renamed TT1/TT2); `pi-case-playbooks.md` trigger rows T1–T9; CHAT-DISPATCH v5 tasks T1–T7 (bare!); CHAT-DISPATCH v3/v4 tasks `T-20`…`T-32`. `T#1` (trigger 1) is a separate token |`

and **line 291** rates the `T3` pair **HIGH** and confirms it is unrepaired.

**And the precedent the row invokes has since fired a SECOND time, with a method.**
`id-collision-report.md` line 22 records the `H` series as *"**4 meanings**: … (2) T3/Phase-0
advisory H1–H6 (**re-lettered HK 2026-08-13**); (3) disclosures H1–H22 (**re-lettered HD 2026-08-22,
forward only** — 11 of the 22 appear in the repo…)"*. The HD re-lettering is **forward-only**, which
is a concrete answer to the row's *"which one moves"* — it moves the newer/narrower use and leaves
history alone.

**4. Disconfirmation:** was the `T` series renamed after all? No. `docs/record/session-log.md`,
fortieth-invocation runner line (heading at staged line 6782), flattened: *"**the `T` series was NOT
re-lettered**, and neither `email-workflow-requirements.md` nor `outlook-email-intake.md` was
edited"* — and the collision report, dated 2026-08-25 and at HEAD, still carries it as unrepaired.
`#85` at staged line 6884: *"**FLAGGED, NOT RENAMED** — the H → HK precedent / (#66) makes
re-lettering Michael's act."* No later ruling. `Q-WF-2` live=2 (both its own mint).

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: at HEAD the `T` namespace
carries **seven meanings, not two** (`id-collision-report.md:37`, severity HIGH at `:291`), so the
row's remedy question is broader than it was drafted; and the `H` precedent has now fired **twice**
— HK (2026-08-13) and **HD (2026-08-22, forward only)** — the second supplying a ruled method for
*"which one moves."*

**6. Dependency tag:** `free-standing`. **Unique text destroyed if closed:** N — the collision is
independently carried by `id-collision-report.md`; only the *"five WF gates say 'gated on T3' without
naming which series"* framing is unique, and it would be lost.

---

### `Q-WF-3` (L899)

**1. First line, verbatim:**
`- ⬜ **Q-WF-3.** BUILD-STATE's `T3` (the transcription tier) is a **speech** pipeline, and nothing in the WF rows explains why an **email** pipeline should be gated on it.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** is *"gated on T3"* really a PHI-processing-locality gate — and if so should the
gate be restated in those terms, since *"the local AI arm exists"* and *"the speech pipeline is
authorized"* are different conditions?

**3. Call: LIVE, and its proposed reading is materially destabilised by a later Michael ruling.**

The row's proposed reading rests on `CLAUDE.md:272–275` — *"Do not introduce cloud AI processing of
case documents without an explicit decision from Michael."* **That escape hatch has since been
exercised, explicitly, once.** `docs/record/session-log.md`, entry
`## 2026-08-21 (#130) — Design, VOICE, Opus 5: H12 REVERSED — app calls the model on a BAA-covered a`
(staged line 1450), **staged line 1459**:

> `- **H12 — REVERSED. CONFIRMED.** Yesterday's ruling (app assembles a bundle; Michael carries it into a chat by hand; no client medical content reaches a model API) is superseded. The app calls the model directly, on the firm's own BAA-covered API account.`

and **staged line 1460**: *"- **Payload — CONFIRMED.** The full medical chronology goes, unmodified.
No scrubbing, no thinning. **The BAA is what makes it lawful; content engineering is not.**"*
and **staged line 1462**: *"- **BAA is a hard gate — CONFIRMED.** No real record moves through the
API call until it is signed."*

So at HEAD the record holds **two** sanctioned conditions for PHI-touching AI processing — the local
GPU arm, and a signed BAA on a cloud account — where the row assumes one. If the row's proposed
reading were adopted as written, the WF series would be gated on a condition Michael has already
demonstrated he can satisfy another way.

**4. Disconfirmation, and it is important:** `#130`'s ruling is scoped to the **disclosures
model-call path**, not to email. It does **not** rule on the WF gates, and `CLAUDE.md` is not
staged, so whether `:272–275` was amended is **UNVERIFIABLE-HERE** (what would settle it: read
`CLAUDE.md` at HEAD). `Q-WF-3` returns **1** flattened live-log hit (its own mint at staged line
6947); `Q-WF-3` is **0** in BUILD-STATE and the TOC. Nothing answers the question. **ID caution:**
`H12` is a known collision — the `#130` ruling is the **disclosures** `H12` (re-lettered `HD-12`
forward-only 2026-08-22), which is the right one here because it is precisely the AI-processing
ruling; the heartbeat `H12` is unrelated. I read the row before relying on the ID.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: the local-processing rule
this row nominates as the real gate now has a **ruled second term** — `H12` REVERSED (`#130`,
2026-08-21, Michael's words) puts client medical content through a cloud model call on a
**BAA-covered** account, with the BAA as a hard gate — so *"gated on the local processing arm"* is
no longer the only sanctioned reading, and the restatement this row asks about should carry three
conditions (local arm · signed BAA · explicit decision), not one.

**6. Dependency tag:** `Phase 1b GPU`. **Unique text destroyed if closed:** **Y** — the observation
that *"the local AI arm exists"* and *"the speech pipeline is authorized"* are different conditions
satisfiable at different times, and the `Q-IN1-7` cross-link, are carried only here.

---

### `Q-WF-5` (L901)

**1. First line, verbatim:**
`- ⬜ **Q-WF-5.** `docs/specs/outlook-email-intake.md` (captured 2026-07-23, EXPLORATORY) states as a *"first-class design constraint"* that *"the entire pipeline — transport, storage, indexing, any AI processing of email content — must be HIPAA compliant by design, not retrofitted"*…`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** is `outlook-email-intake.md` superseded, merged, or a live eighth gate on every
inbox-facing WF item — and does the BAA/compliance review get its own queue row?

**3. Call: LIVE on both limbs; the SECOND limb has a partial world-state answer nobody carried in.**
`Q-WF-5` live=1 (its own mint), BUILD-STATE=1 (line 130: *"**NOT added as an eighth gate, because
adding one is a ruling (Q-WF-5).**"*). The fortieth-invocation runner line confirms neither file was
edited and the gate was not added. Nothing rules it. **It is one of the 27 rows the hardened audit
found named nowhere** (`…HARDENED…:207`).

**What HAS moved:** the register now carries a **BAA row** — `H12-v` at register **L475**, minted
2026-08-22 (`#134`): *"**`H12-v` — THE DISCLOSURES MODEL-CALL VENDOR ROUTE, AND THE BAA THAT GATES
IT.**"* and, at L497, *"**HARD GATE, RULED: no real record moves through the API call until a BAA is
signed.**"*

**4. Disconfirmation — and it is decisive against reading `H12-v` as this row's answer.** `H12-v`
covers the **disclosures model-call vendor** only. It says nothing about email **transport, storage
or indexing**, which is three quarters of what `outlook-email-intake.md` names as first-class, and
nothing about whether that document is superseded, merged or an eighth gate. So the second limb is
*partially* answered by precedent (a BAA review does now have a row, for one consumer) and the
first limb is entirely open.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: a BAA row now exists —
`H12-v` (register L475, minted `#134` 2026-08-22) — and `#130` ruled the BAA a **hard gate** in
Michael's words, so this row's *"does the BAA/compliance review get its own queue row?"* limb has a
precedent for one consumer; **it does not reach email transport/storage/indexing, and the
superseded-vs-merged-vs-eighth-gate limb is untouched.**

**6. Dependency tag:** `free-standing`. **Unique text destroyed if closed:** **Y** — the finding
that the constraint was on the record **eighteen days before the WF series existed** and is cited by
neither `email-workflow-requirements.md` nor the WF rows nor `#63`, plus the
`criminal-appointment-intake-and-docket-enhancements.md:84` pointer, live only here.

---

### `Q-WF-6` (L902)

**1. First line, verbatim:**
`- ⬜ **Q-WF-6.** There is **no privacy, HIPAA, PHI, or medical-records-confidentiality proposition in any of the four registry files** — verified at HEAD; the only Health & Safety Code hit is § 481.115(b), a controlled-substances offense.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** do the privacy propositions belong in the registry, and in which file — or does
this need a fifth registry file, decided together with `Q-STAT-5`?

**3. Call: LIVE, premise INTACT, but three of the row's stated facts are out of date at HEAD.**

- **The count.** The row says *"Four instances now, and at four it is a scope rather than a series
  of gaps."* BUILD-STATE line 116 at HEAD: *"- **THE SAME ABSENCE HAS APPEARED FIVE TIMES.** (1)
  **NOT ONE PRIVACY PROPOSITION** (`Q-WF-6`) · (2) #78's insurance narrowing · (3) **NOT ONE
  CLIENT-PROPERTY OR TRUST-ACCOUNTING PROPOSITION** (`Q-QBO-6`) · (4) **NOT ONE PROFESSIONAL-CONDUCT
  PROPOSITION** — thirteen terms, all zero · (5) work product — **now VERIFIED, and still only three
  entries.**"*
- **Candidate texts now exist.** Same line: *"**AND CANDIDATE TEXTS NOW EXIST WITHOUT BEING ENTERED:
  `docs/specs/g10-4-ch521-entry-drafts-2026-08-19.md` — SEVEN drafted entries on §§
  521.002(a)(2)(A)/(B), 521.002(b), 521.052(a), 521.053(b)/(c)/(i), read from the OFFICIAL BULK
  CORPUS, ALL `UNVERIFIED`, DRAFTED AND NOT INSERTED, and no registry file touched.**"* Breach
  notification was one of the row's own sweep terms.
- **It has a named live caller and BUILD-STATE hands the row back to Michael.** Same line:
  *"**AND (1) STILL HAS EXACTLY ONE CALLER: gate 10 (`G10-4`, #115)**"* and, closing:
  *"Whether any is inserted, and where — the siblings' placement rule points at a NEW file, not a
  fold-in — is `G10-4` / `Q-WF-6`, **yours**"*.

**4. Disconfirmation — the row's core measurement survives.** No privacy proposition has been
**inserted** into any registry file: the drafts are *"DRAFTED AND NOT INSERTED, and no registry file
touched."* So the row's opening sentence is still true at HEAD, and the placement question is still
open. `Q-STAT-5` is still unresolved — BUILD-STATE line 116: *"**FOUR research passes still stack
behind `Q-STAT-5`'s one ruling.**"* And the disclosures architecture now **relies** on unregistered
privacy propositions: register L497–L499 (`H12-v`) — *"the HIPAA propositions stated as background
in that sitting — the eighteen-identifier set … are **UNVERIFIED legal propositions never routed to
the registry**"*.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: the absence count is
**five, not four** (BUILD-STATE line 116); **seven candidate ch. 521 entries are drafted and not
inserted** at `docs/specs/g10-4-ch521-entry-drafts-2026-08-19.md`, so the placement question is now
concrete rather than hypothetical and BUILD-STATE's own siblings-placement rule *"points at a NEW
file, not a fold-in"*; the row has **one named live caller (gate 10 / `G10-4`)** and a second de
facto one (the disclosures model call's unregistered HIPAA propositions, `H12-v`).

**6. Dependency tag:** `Q-STAT-5 stack`. **Unique text destroyed if closed:** **Y** — the
§ 481.115(b) false-positive identification and the *"the registry carries the law of the firm's
CASES and nothing about the law of the firm's PRACTICE — a boundary nobody chose"* formulation
are carried here and in `#88`/BUILD-STATE only; the row is also the register's **only** carrier of
the two nested add-only annotations that build the count.

---

### `Q-WF-7` (L903) — **strongest closure candidate in the slice**

**1. First line, verbatim:**
`- ⬜ **Q-WF-7.** This session could not obtain verbatim primary-law text for the privacy question: the eCFR API path is robots-blocked to it, the eCFR reader URL rate-limited and then returned paraphrase rather than quotation, and the sanctioned targeted fetch for Tex. Health & Safety Code ch. 181 (`statutes.capitol.texas.gov/Docs/HS/htm/HS.181.htm`) returned the site's navigation shell twice with no statutory text.`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** *"When a design session needs Texas statutory text and the targeted official fetch
fails, is a per-instance directed grant of the `Documents\Knowledge Repo` corpus folder the intended
path (the #75 deadline-memo precedent), or should the session stop and hand you the look?"*

**3. Call: CLOSED-BY-EARLIER-RULING THE ROW NEVER NOTICED — two of Michael's rulings, both
predating the row, answer both limbs of its disjunction, and the record then shows the answer being
practised four times.**

- **Ruling 1 — the source, and the row has the ORDER BACKWARDS.**
  `docs/record/session-log.md`, entry
  `## 2026-08-14 (#77) — Q-STAT-1 RULED: the SOURCING convention is binding, v18 drafted and delive`
  (staged line 8044), **staged lines 8046–8050**:
  > `- **Q-STAT-1 RULED — ADOPT AS DRAFTED (Michael, 2026-08-14).** The SOURCING convention for statutes,`
  > `  rules and regulations is now **binding**… Six sub-clauses: **Texas statutes** from the official bulk corpus in`
  > `  `Documents\Knowledge Repo\Statutes <download-date>\`, cited by code and chapter with the corpus`
  > `  download date, `/Docs/<CODE>/htm/<CODE>.<CHAPTER>.htm` as the named fallback and `?link=<CODE>``
  > `  never used;`

  The corpus is **PRIMARY**; the targeted fetch is the **named fallback**. The row asks whether the
  corpus is the path *when the fetch fails* — i.e. it treats the corpus as the second resort, which
  inverts the convention **ruled the day before the row was written**.
- **Ruling 2 — the access mechanism.** `docs/record/session-log.md`, entry
  `## 2026-08-13 (#66) — RULING RUN: ~20 open queue items ruled one by one (design session,`
  (staged line 9021), **staged lines 9061–9065**:
  > `- HK-5 (formerly H5) RULED WITH CAVEAT: preflight rows and questions about Michael-supplied`
  > `  material are answered by Michael FIRST — never by sweeping his machine unprompted`
  > `  (filenames alone can carry client information). When Michael cannot recall, he MAY DIRECT`
  > `  a search, per instance; the search is his call, never a session's default.`

  That answers the disjunction as a **conjunction**: the session hands him the look, and he may
  direct the grant, per instance. **"Standing" is expressly foreclosed** (*"never a session's
  default"*).
- **And it has been practised.** `#88` (staged lines 6318–6319): *"**BOTH bridge folders were
  granted this session** — / the checkout and `Documents\Knowledge Repo`"*. `#106` (staged line
  4139): *"**The FC-13 directed pass ran** (his direction, verbatim in the record)"*. `#140`
  (heading, staged lines 54–55): *"DEVICE BRIDGE GRANTED on the checkout and on / `Documents\
  Knowledge Repo`"*. The row's own text already cites H5 correctly for the *not-swept* half.

**4. Disconfirmation attempted, and here is what survives.** (a) Neither ruling was ever **put to
Michael as an answer to this row**, and the row is one of the 27 the hardened audit found named
nowhere (`…HARDENED…:207`) — so nobody has ever tested the closure. (b) `Q-WF-7`'s *second*
sentence is a record note (*"the third chain task to hit a retrieval ceiling and the first where the
fallback failed too"*), not a question, and would be lost. (c) The eCFR half — robots-blocked API
path, rate-limited reader, paraphrase-not-quotation — is **not** answered by either ruling: SOURCING
names the eCFR API as the federal channel and this row records that channel failing. **That is a
live, unanswered residue.** For that reason I do not propose `CLOSE`.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH on the annotation, and I name the closure as
defensible on one word from Michael.** Annotation substance: the Texas-statutes limb is answered by
two prior Michael rulings the row never noticed — **`Q-STAT-1` (`#77`, 2026-08-14)** makes the
Knowledge Repo corpus the **primary** source and the targeted fetch the **fallback** (the row has
the order backwards), and **`HK-5` (`#66`, 2026-08-13)** makes the grant **per-instance and
Michael's to direct, never a session's default** — a pattern since practised at `#88`, `#106` and
`#140`. **The surviving limb is the eCFR channel**, which this row records failing in three
distinct ways and which no ruling addresses.

**6. Dependency tag:** `Michael's hand`. **Unique text destroyed if closed:** **Y** — the three
distinct eCFR failure modes and the `HS.181.htm` navigation-shell result exist only here and in
`#85`.

---

### `Q-IN2-4` (L915)

**1. First line, verbatim:**
`- ⬜ **Q-IN2-4.** A VIN is an identity-class fact about a thing that has no row anywhere: CD-1 ruled identity lives in `parties`, `parties.kind` admits only `'individual'` and `'organization'`, and §7.2's promotion examples are both organizations, so **for IN-2's most-named target the promotion half of the ruling has no destination** (spec §6.4).`
**`grep -c -F` (first 110 chars): 1 — occurs exactly once.**

**2. Question:** which of three shapes for a vehicle — directory rows, case-scoped fact clusters, or
a separate instrumentality entity — and does the answer reopen `contact-directory.md` as a living-
spec revisit?

**3. Call: LIVE, premise INTACT, with a close analogue ruled since that nobody has carried in.**

Premise verified at HEAD: BUILD-STATE line 83 — *"**Nor for IN-2: no fact table, `cases.
date_of_incident` is a `date` so it cannot hold a crash TIME, and word-bounded `vin`/`vehicle`/
`instrumentality` return ZERO (#84)**"*. `Q-IN2-4` returns **1** flattened live-log hit (its own
`#84` mint) and **0** in BUILD-STATE and the TOC — nothing rules it.

**What has been ruled since, on the same structural question:** `#140` (2026-08-31), `R17`, the
provider record — the app's next *"identity-class fact about a thing that has no row"*.
`docs/record/session-log.md` **staged lines 87–89**: *"`AS-Q3` "(A) Case-scoped record; promote to
the directory by hand; TYPE set per case, pre-filled from last time" — `R17` is CASE-SCOPED; the
model never creates a / contact or a link."* And **staged lines 94–96**: *"`AS-Q11` "All three as
proposed: those literals; freeze `renders-care-at`; ONE file, hard-gated on / MIG-1" —
`facility_party_id` ×3, `facility_billing_profiles`, "Facility"; `effective_from`/`effective_to` on
the edge"*. Michael chose **neither** a second identity table **nor** automatic directory rows: a
case-scoped record, hand promotion, the entity itself carried as a **party**, and the relationship
as a typed, date-bounded **edge**.

**4. Disconfirmation, and it limits the annotation sharply.** A facility is an **organization** and
already fits `parties.kind`; a **vehicle fits neither admitted value**, which is precisely this
row's problem — so `AS-Q3`/`AS-Q11` supply a **pattern**, not a destination, and shape (a)'s
*"a third `kind`"* cost is untouched by them. Also: whether `parties.kind` still admits only two
values at HEAD is **UNVERIFIABLE-HERE** (`db/schema.sql` is not staged; what would settle it is a
`grep -n "kind" db/schema.sql` or the live `information_schema`), and BUILD-STATE carries no
`parties.kind` statement.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: for the nearest analogous
entity ruled since — `R17`, the provider record (`#140`, `AS-Q3`/`AS-Q11`, 2026-08-31) — Michael
chose a **case-scoped record promoted to the directory by hand**, the entity itself carried as a
party (`facility_party_id`) and the relationship as a typed edge with `effective_from`/
`effective_to`; i.e. **neither shape (c)'s second identity table nor an automatic directory row.**
The disanalogy is stated with it: a facility is an organization and already fits `parties.kind`,
while a vehicle fits neither value.

**6. Dependency tag:** `free-standing`. **Unique text destroyed if closed:** **Y** — the
"one fleet tractor across three matters is three unlinked clusters" argument and the "trailers in
the contact directory permanently" cost appear only here.

---

## KEEP ROWS — LIVE, UNCHANGED (grep run on every one)

- **L857 `Q-QBO-2` — KEEP — `money module (no row)` — greps run:** `Q-QBO-2` flattened live=1
  (its own `#87` mint, staged 6552), arch=0, BS=1 (line 131, restating the finding), TOC=0,
  register=2. No read-only scope has appeared; premise intact; `#87` made no rulings.
- **L859 `Q-QBO-4` — KEEP — `free-standing` — greps run:** `Q-QBO-4` live=1 (staged 6519), arch=0,
  BS=1, TOC=0. **Disconfirmation run:** `Go_Live_Gates.md` at HEAD ends at **Gate 10** (no gate 11),
  and `grep -i "third-party\|oauth\|credential\|quickbooks"` over that file returns **zero** against
  a firing control (the `Gate [0-9]` grep returns 10 headings). BUILD-STATE line 26 carries the row
  as *"**Q-QBO-4, #87, UNRULED**"*. Premise and runner note both intact.
- **L860 `Q-QBO-5` — KEEP — `money module (no row)` — greps run:** `Q-QBO-5` live=1 (staged 6580,
  *"No mechanism proposed"*), arch=0, BS=1, TOC=0. BUILD-STATE at HEAD: *"none of the 37 tables is a
  money table"* (line 83) and *"**NO MONEY MACHINERY**"* (line 96). Both horns of the question
  (flag-don't-decide vs out-of-scope-until-the-money-module) still standing.
- **L873 `Q-RE-3` — KEEP — `money module (no row)` — greps run:** `Q-RE-3` live=2, arch=0, BS=0,
  TOC=1. Both live hits and the TOC hit are the **2026-08-19 clause-(b) repair**, which the row
  already carries in its own text (*"conformed 2026-08-19 on Michael's ruling"*). No ruling on
  where a fee-division arrangement lives; `fee_split`/`fee_share` return ZERO at HEAD (BUILD-STATE
  line 83). Nothing to annotate that the row does not already say.
- **L876 `Q-RE-6` — KEEP — `RE-1 pass` — greps run:** `Q-RE-6` live=2 (one its own `#88` mint at
  staged 6399, one an unrelated BUILD-STATE-cap paragraph at staged 3737 — **read, not counted**),
  arch=0, BS=0, TOC=0. Disconfirmation: the `#113`-era batches record *"`privilege_tier`, CHECK
  vocabularies and `review_log` grants untouched"*, so the six-value `review_log.action` CHECK and
  the two-mechanism split are intact. `#15`'s advisory ruling stands as written.
- **L887 `Q-PR3-2` — KEEP — `PR-3 / probate ladder` — greps run:** `Q-PR3-2` live=3, arch=0, BS=1,
  TOC=0, register=5. No ruling. The `roster.ts:195–202` fact is **UNVERIFIABLE-HERE** (`src/` not
  staged; `Q-PR3-1` bars a design-side read) — settled by a Code-session read of
  `src/domain/roster.ts` — but BUILD-STATE line 96 at HEAD says *"**Do not touch the case-type tree
  or ladder.**"* and `PL-1..PL-4` are *"all UNRULED"*, so the defect is unreachable exactly as the
  row says.
- **L889 `Q-PR3-4` — KEEP — `PR-3 / probate ladder` — greps run:** `Q-PR3-4` live=1, arch=0, BS=1,
  TOC=0. `grep -i probate Go_Live_Gates.md` returns **zero** — go-live is scoped by *"real case /
  party / client / SOL data hand-entered into the core app"* (BUILD-STATE line 23), never by
  practice area. GL-1 floor items (1) and (2) are COMPLETE and (3) still open, so the question is
  live and getting closer, not answered.
- **L890 `Q-PR3-5` — KEEP — `PR-3 / probate ladder` — greps run:** `Q-PR3-5` live=2 (its `#86` mint
  and the `Q-IN2-2`-class cross-reference), arch=0, BS=0, TOC=0. **UNVERIFIABLE-HERE** whether the
  three passages still read as the row says — `docs/spec-feedback.md`,
  `docs/specs/pi-case-playbooks.md` and `docs/specs/case-management-project-instructions.md` are not
  staged; a `sed -n '171p'` / `'951p'` / `'94p'` on each at HEAD would settle it. Nothing on the
  record records any of the three being edited; the only `pi-case-playbooks.md` activity since is
  size measurement in the TC-1 deferral.
- **L891 `Q-PR3-6` — KEEP — `PR-3 / probate ladder` — greps run:** `Q-PR3-6` flattened live=**0**,
  arch=0, BS=0, TOC=0, register=1 (control fires elsewhere in the same series: `Q-PR3-1`=16).
  Named nowhere but its own row. Both limbs open.
- **L892 `Q-PR3-7` — KEEP — `PR-3 / probate ladder` — greps run:** `Q-PR3-7` flattened live=**0**,
  arch=0, BS=0, TOC=0, register=1. Named nowhere but its own row. Gated on `PL-1`, which BUILD-STATE
  line 96 confirms UNRULED at HEAD.
- **L897 `Q-WF-1` — KEEP — `free-standing` — greps run:** `Q-WF-1` live=2 (both `#85`'s own text,
  staged 6844 and 6859), arch=0, BS=0, TOC=0. **Anchored** to avoid the `Q-WF-10` substring trap
  (`grep -oE "\bQ-WF-1\b"` — `Q-WF-10` scores separately at live=2). Fortieth-invocation runner
  line at HEAD: *"neither `email-workflow-requirements.md` nor `outlook-email-intake.md` was
  edited"*. The document is still unmarked; the row's own answer (adding a marker to a
  VERBATIM-adopted document is Michael's act) is intact.
- **L904 `Q-WF-8` — KEEP — `money module (no row)` — greps run:** `Q-WF-8` flattened live=**0**,
  arch=0, BS=0, TOC=0, register=2 (control: `Q-WF-6`=8, `Q-WF-4`=15). Named nowhere but its own
  row and the WF-7 row it cites. The money gate is intact (no money table at HEAD) and `Q-IN2-9`'s
  half-item objection is unresolved, so both horns stand.
- **L905 `Q-WF-9` — KEEP — `Q-IN3-3 first-instrument consumer` — greps run:** `Q-WF-9` flattened
  live=**0**, arch=0, BS=0, TOC=0. Its blocker verified live: `Q-IN3-3` live=3, and the most recent
  is *"(Q-IN3-3 unruled, the CD-1 deferral stands)"* (staged 7205). Flattened search for the phrase
  *"first instrument consumer"* returns the `#85` sentence *"whose "first instrument consumer" #83
  found has **never been named**"* and the fortieth runner's *"WF-8 not nominated as CD-1's first
  instrument consumer"*. Still unnamed at HEAD. FE-D1 being built does **not** name it — it is
  fixture-only and generates, it does not serve.
- **L906 `Q-WF-10` — KEEP — `free-standing` — greps run:** `Q-WF-10` live=2, arch=0, BS=0, TOC=0.
  Runner line at staged 6815: *"**Q-WF-10's pointer annotations were NOT added**"*, with the reason
  — *"answering it by doing it would have been the runner ruling on Michael's item."* `LR-LOOK-1`
  still open (register=4, BS=1). Nothing added since; premise and question intact.
- **L913 `Q-IN2-2` — KEEP — `free-standing` — greps run:** `Q-IN2-2` live=3, arch=0, BS=1, TOC=0.
  BUILD-STATE line 129 at HEAD: *"**TWO LINES OF `cr3-field-code-map.md` ARE CORRECTED IN THE SPEC
  AND THE FILE WAS NOT EDITED:** list 38 has **70** enumerated values, not *"(79 codes)"* … (**Q-IN2-2,
  YOURS**)."* Explicitly still Michael's at HEAD. The file itself is **UNVERIFIABLE-HERE**
  (`cr3-field-code-map.md` not staged; `sed -n '34p'` on it would settle it), but BUILD-STATE
  asserts the non-edit at HEAD. Note the sibling `Q-IN2-1` **was** answered 2026-08-18 — that
  answer does not reach this row.
- **L914 `Q-IN2-3` — KEEP — `free-standing` — greps run:** `Q-IN2-3` live=1, arch=0, BS=0, TOC=0.
  Premise re-verified at HEAD by BUILD-STATE line 83: *"`cases.date_of_incident` is a `date` so it
  cannot hold a crash TIME"*. No fact table exists. The writable-mirror warning the row leans on is
  a schema comment — **UNVERIFIABLE-HERE** for its exact current wording (`db/schema.sql` not
  staged) — but the row's design question does not turn on it.

---

## SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L857 | `Q-QBO-2` | LIVE, UNCHANGED | KEEP | HIGH | money module (no row) | n-a |
| L858 | `Q-QBO-3` | WORLD-STATE-STALE (cite dead; consumer-fold practised, unruled; `AS-Q1` supplies the shape) | ANNOTATE-KEEP | HIGH | Q-WF-4 server-side identity | N |
| L859 | `Q-QBO-4` | LIVE, UNCHANGED (no gate 11; zero credential-tier language in the gates) | KEEP | HIGH | free-standing | n-a |
| L860 | `Q-QBO-5` | LIVE, UNCHANGED | KEEP | HIGH | money module (no row) | n-a |
| L861 | `Q-QBO-6` | WORLD-STATE-STALE on its stated blocker — **FC-14 reaches it** | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | Y |
| L863 | `Q-QBO-8` | LIVE, UNCHANGED; one-word answerable, recommendation already drafted | MICHAEL-IN-WORDS | HIGH | money module (no row) | Y |
| L872 | `Q-RE-2` | LIVE on the question; source-quality limb reached by FC-14/FC-13 | ANNOTATE-KEEP | MED | RE-1 pass | Y |
| L873 | `Q-RE-3` | LIVE, UNCHANGED (already carries its 08-19 conformance) | KEEP | HIGH | money module (no row) | n-a |
| L874 | `Q-RE-4` | **WORLD-STATE-STALE — BUILD-STATE line 52 corrects "it is not built"** | ANNOTATE-KEEP | HIGH | RE-1 pass | Y |
| L875 | `Q-RE-5` | WORLD-STATE-STALE on limb 1 only; **§5.3 half right** | ANNOTATE-KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L876 | `Q-RE-6` | LIVE, UNCHANGED | KEEP | HIGH | RE-1 pass | n-a |
| L877 | `Q-RE-7` | LIVE on the question; source-quality limb reached by FC-14 (7.03 still unread) | ANNOTATE-KEEP | MED | RE-1 pass | Y |
| L886 | `Q-PR3-1` | LIVE, UNCHANGED — **row's own load-bearing count is stale (2 → 6)** | ANNOTATE-KEEP | HIGH | free-standing | Y |
| L887 | `Q-PR3-2` | LIVE, UNCHANGED (code fact UNVERIFIABLE-HERE) | KEEP | HIGH | PR-3 / probate ladder | n-a |
| L889 | `Q-PR3-4` | LIVE, UNCHANGED | KEEP | HIGH | PR-3 / probate ladder | n-a |
| L890 | `Q-PR3-5` | LIVE, UNCHANGED (three file texts UNVERIFIABLE-HERE) | KEEP | MED | PR-3 / probate ladder | n-a |
| L891 | `Q-PR3-6` | LIVE, UNCHANGED (named nowhere but its row) | KEEP | HIGH | PR-3 / probate ladder | n-a |
| L892 | `Q-PR3-7` | LIVE, UNCHANGED (named nowhere but its row) | KEEP | HIGH | PR-3 / probate ladder | n-a |
| L897 | `Q-WF-1` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | n-a |
| L898 | `Q-WF-2` | LIVE; premise understates — `T` has **7** meanings at HEAD | ANNOTATE-KEEP | HIGH | free-standing | N |
| L899 | `Q-WF-3` | LIVE; proposed reading destabilised by `H12` REVERSED (`#130`) | ANNOTATE-KEEP | HIGH | Phase 1b GPU | Y |
| L901 | `Q-WF-5` | LIVE both limbs; BAA row now exists for one other consumer | ANNOTATE-KEEP | MED | free-standing | Y |
| L902 | `Q-WF-6` | LIVE, premise intact; count/drafts/caller all stale in the row | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | Y |
| L903 | `Q-WF-7` | **CLOSED-BY-EARLIER-RULING the row never noticed** (`Q-STAT-1` + `HK-5`); eCFR limb survives | ANNOTATE-KEEP | HIGH | Michael's hand | Y |
| L904 | `Q-WF-8` | LIVE, UNCHANGED (named nowhere but its row) | KEEP | HIGH | money module (no row) | n-a |
| L905 | `Q-WF-9` | LIVE, UNCHANGED — first instrument consumer still unnamed at HEAD | KEEP | HIGH | Q-IN3-3 first-instrument consumer | n-a |
| L906 | `Q-WF-10` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | n-a |
| L913 | `Q-IN2-2` | LIVE, UNCHANGED — BUILD-STATE names it "YOURS" at HEAD | KEEP | HIGH | free-standing | n-a |
| L914 | `Q-IN2-3` | LIVE, UNCHANGED — premise re-verified at HEAD | KEEP | HIGH | free-standing | n-a |
| L915 | `Q-IN2-4` | LIVE, premise intact; close analogue ruled since (`R17`) | ANNOTATE-KEEP | MED | free-standing | Y |

**30 rows. 0 CLOSE · 0 CLOSE-SPLIT · 13 ANNOTATE-KEEP · 16 KEEP · 0 RECLASSIFY-ACT · 1
MICHAEL-IN-WORDS.** Nothing in this slice is closable on the record as it stands; every closure
would need Michael's word.

---

## UNVERIFIABLE-HERE (with what would settle each)

| Row | Fact | What would settle it |
|---|---|---|
| `Q-RE-5` | `generated_documents.doc_type` CHECK still admits one value (`#81`) — BUILD-STATE carries **zero** `doc_type` mentions | `grep -n doc_type db/schema.sql` plus the unrun FE-D1 migration file |
| `Q-RE-4` | `src/domain/partyRegistry.ts` `pncStatus` select (asserted by BUILD-STATE line 52) | a Code-session read of `src/domain/partyRegistry.ts` |
| `Q-PR3-2` | `src/domain/roster.ts:195–202` fall-through and `caseTypes.ts:6–9` throw | Code-session read of both files at HEAD |
| `Q-PR3-5` | the three passages at `spec-feedback.md:171`, `pi-case-playbooks.md:951`, `case-management-project-instructions.md:94` | `sed -n` on each of the three (none staged) |
| `Q-PR3-6` | the three `'claimant'` ternary sites in `src/` | Code-session read; the SQL site has run and is history |
| `Q-WF-3` | whether `CLAUDE.md:272–275` was amended after `H12`'s reversal | read `CLAUDE.md` at HEAD |
| `Q-WF-6` | the four `legal-rule-registry-*` files' current contents | word-bounded sweep of the four registry files at HEAD |
| `Q-IN2-2` | `cr3-field-code-map.md` line 34 still reads "(79 codes)" | `sed -n '34p' docs/reference/…/cr3-field-code-map.md` |
| `Q-IN2-3` | the schema comment four lines below `cases.date_of_incident` | `db/schema.sql` |
| `Q-IN2-4` | `parties.kind` still admits only `'individual'`/`'organization'` | `db/schema.sql` or live `information_schema` |

## COLLISION DISCIPLINE APPLIED

- **`T3`** — read before relying on: the row is about the transcript-vs-statute pair, and
  `id-collision-report.md:37` shows the `T` namespace runs to **seven** meanings. My `Q-WF-2`
  annotation names the seven rather than the two.
- **`H12`** — the `#130` reversal is the **disclosures** `H12` (re-lettered `HD-12` forward-only
  2026-08-22), read in full before use; the heartbeat `H12` is a different item and is untouched.
- **`H5`** — resolved to **`HK-5`** (re-lettered 2026-08-13, `#66`) before quoting, not to any of
  the other three `H` meanings.
- **Substring traps anchored** — every grep used `\b…\b` on a flattened stream, so `Q-WF-1` did not
  absorb `Q-WF-10`, `Q-RE-2` did not absorb `Q-RE-2x`, and `Q-IN2-2` did not absorb `Q-IN2-2x`.
  Separate scores prove the anchoring worked (`Q-WF-1`=2 vs `Q-WF-10`=2 independently).


---

<a id="slice-b7"></a>

## ===== SLICE B7 =====

# SWEEPER B7 — TASK 8/9/10 SPEC QUESTION SETS (register L916–L968, 37 rows)

**Read-only cross-check, 2026-09-01. Staged evidence at HEAD `7f02131`. Nothing adjudicated, nothing
edited; this file is the only thing written.**

## How this slice was worked

Every one of the 37 rows was read whole from the staged register and its ID greped **word-bounded**
(`grep -oE "\bID\b"`) across five files: the register, the live log, the closed archive, `BUILD-STATE.md`
and `session-log-toc.md`. Controls run alongside: `Q-FE4-2` (reg 1 / log 2), `Q-IN2-1` (reg 4 / log 10 /
BS 3), `Q-IN1-1` (reg 2 / log 2 / BS 1) — all non-zero, so a zero in the table below is a real zero and
not a broken pattern. The substring hazards the steering names were avoided by the word-boundary anchor;
`id-collision-report.md` was checked and **no `Q-IN1-*`, `Q-IN2-*`, `Q-IN3-*`, `Q-FE4-*`, `Q-FE5-*` or
`Q-FE6-*` string appears in its collision findings** — the only adjacent findings are `CR-3` (MEDIUM: the
at-court-correction row vs. the TxDOT crash report; my rows all mean the crash report) and `P-1`/`P-2`/`P-3`
hyphen (relevant to `Q-FE5-7`, noted in its block).

Entries read in full: `#81`, `#83`, `#84`, `#95`, `#130`, `#138`, `#139`, `#140`, the **FE-D1 DISCLOSURES
ENGINE: THE BUILD** unnumbered Code entry (2026-08-20, staged log L1745–1770), plus both audits,
`id-collision-report.md`, and the staged-but-unlisted `superseded-specs-candidates-2026-08-25.md`.

**Result: 30 KEEP, 7 ANNOTATE-KEEP, 0 CLOSE, 0 CLOSE-SPLIT, 0 RECLASSIFY-ACT, 0 MICHAEL-IN-WORDS.**
Nothing in this slice is closable. That is not deference — it is what the record says, in three places at
once, quoted below.

## The three global facts that decide most of this slice

**(1) BUILD-STATE at HEAD carries all three question sets as still-open items on Michael's own list.**
`docs/specs/BUILD-STATE.md` — heading `## For design side` (L139) — staged **L152**:

> **the Task 8 specs' 22 + 3 looks — Q-FE5-9 first, it sits inside a VERIFIED entry** · **the Task 9 specs' 18 —

> **the Task 9 specs' 18 — Q-IN1-8 is a one-word veto on the whole IN series** · **the Task 10 spec's 

That is the whole of my slice (Task 8 = `Q-FE4-*`/`Q-FE5-*`/`Q-FE6-*` + the three looks; Task 9 =
`Q-IN1-*`/`Q-IN3-*`; Task 10 = `Q-IN2-*`), named as unanswered at the most recent BUILD-STATE rewrite.

**(2) The three source sessions each said in terms that the specs close nothing, and BUILD-STATE repeats it.**
`docs/record/session-log.md` — `## 2026-08-15 (#81) — CHAT-DISPATCH TASK 8: form-engine specs FE-4, FE-5, FE-6`
— staged **L7489**: *"**THE GATE RESOLVED CLEANLY AND ALL THREE ARE OPEN.**"* ·
`## 2026-08-15 (#83) — CHAT-DISPATCH TASK 9: IN-1 and IN-3 spec drafts — two ` — staged **L7224–L7226**:
*"**Both specs therefore MAP the design space and hand the question back; each says so on its face.** A build
session must not read either as a design to implement."* ·
`## 2026-08-15 (#84) — CHAT-DISPATCH TASK 10: the IN-2 spec, and the first gate in this chain` — staged
**L7058**: *"**The row stays ⬜ regardless: a spec is not a closure.**"*

**(3) The 2026-08-31 RC-1 sitting took exactly SIX questions out of these six namespaces and left the rest.**
`## 2026-08-31 (#139)` — staged **L335–L337**: the CC-1 hands-on queue accepted *"the 2026-08-24 audit's twelve
(`CL2-AC-1`, `CL2-CHECK-1`, `FE-§11.4`, the bill-label pre-fill, `CR-7`, `CR-CONSTRAINT`, `Q-FE6-5`, `Q-FE4-1`,
`Q-FE5-3`, `Q-IN2-7`, `Q-IN1-1`, `Q-IN3-6`)"*. **Not one of those six is in my slice** — my 37 are the
remainder. The sitting therefore touched these namespaces and deliberately moved a different subset, which is
evidence *against* reading `#139`/`#140` as having quietly overtaken the rest.

## What the FE-D1 build (2026-08-20) did to this slice

**Almost nothing, and the "almost" is worth naming.** The build entry
`## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED ` states at staged **L1749**:

> `generated_documents` EXTENDED, not forked** — seven nullable columns incl. the answer snapshot (FE-8 retention half) and posture (FE-15).

*(that sentence as re-stated in `BUILD-STATE.md` L99; the build entry's own wording at L1749 is "**`generated_documents` EXTENDED rather than forked** — seven nullable columns including the answer snapshot (FE-8's retention half) and posture (FE-15)".)*

Consequences, each checked rather than assumed:

- **No item table.** `BUILD-STATE.md` L99: *"**NO ITEM TABLE, NO FE-9/11/13/14/16/17.** **ELEVEN FINDINGS"* —
  so every `Q-FE6-*` row (item model, scope tags, ordinals) and `Q-IN3-7` (FE-9/FE-11 drift) keep their premise intact.
- **Still no status column, still no set/parent column.** `BUILD-STATE.md` L83:
  *"**Nor for IN-3: `generated_documents` has NO status column and NO set/parent column (#83)."* The seventh
  column FE-D1 added is `posture` (FE-15 = original/amended/supplemental), **not** a lifecycle status — so
  `Q-IN3-1(a)` and `Q-IN3-2` are untouched.
- **Still no IN-2 fact table.** Same L83: *"Nor for IN-2: no fact table, `cases.date_of_incident` is a `date` so
  it cannot hold a crash TIME, and word-bounded `vin`/`vehicle`/`instrumentality` return ZERO (#84)."* So
  `Q-FE4-3`, `Q-IN1-4`, `Q-IN2-9` all keep their premise.
- **Still no discovery-level field.** Same L83: *"and no discovery-level field on `cases`** (FE-5's hard
  prerequisite)."* `Q-FE5-5` intact.
- **The migration is UNRUN and the live database is behind the schema.** Build entry, staged L1766:
  *"**`db/schema.sql` is 41 tables; the live database is still 37, and the gap is the honest state.**"*
- **What DID move:** the build created FE-D1's `§10` substrate (`form_templates`, `form_template_versions`,
  `form_token_definitions`, `form_format_profiles`), built the **FE-10 render lint**, and established a house
  precedent — *extend `generated_documents`, do not fork it*. That bears on `Q-FE4-5`, `Q-FE6-3` and `Q-FE6-6`,
  which is why those three are ANNOTATE-KEEP rather than KEEP. **It is a Code session's build decision under
  the `#63` FE-D1 authorization, not Michael ruling any of these rows** — the brief's rule that a spec (or a
  build) answering a question is not Michael ruling it applies with full force.

## `Q-IN1-8` — the one-word veto, stated plainly (steering item)

`Q-IN1-8` is **not a design question at all**; it is a naming veto on the whole `IN` series, and it is the only
row in this slice that could be answered in a single word with no product, no slice and no upstream ruling.
`BUILD-STATE.md` L152 says so at HEAD: *"**the Task 9 specs' 18 — Q-IN1-8 is a one-word veto on the whole IN
series** · **the Task 10 spec's "*. The 2026-08-24 audit puts it in *"Free-standing, rulable today, no
dependency"* as *"`Q-IN1-8` (does the IN series stand — a one-word veto going stale as the IDs become
load-bearing)"*.

**What closing it does to the rest of the IN series, both ways:**

- **Answered "the series stands"** — it closes **one row and only one row**. Nothing in `Q-IN1-2`…`-9`,
  `Q-IN2-5`…`-9` or `Q-IN3-1`…`-9` is unblocked; none of them waits on it. Its whole value is *preventing* a
  later cost, not releasing anything.
- **Answered "rename"** — the blast radius is now at least: the durable rows `IN-1`…`IN-7` in the register;
  **every ID in this slice** (36 of my 37 rows are `Q-IN*`/`Q-FE*` and 20 of them are `Q-IN*`); `IN-1`'s 16
  word-bounded occurrences across 6 files and `IN-3`'s 15 across 7 (both counts from `#83`, staged L7227 and
  L7232); the three landed spec filenames; and `ID-DL-1`, because runner 38 recorded at staged L7181 that
  *"**Q-IN1-8 asks whether the `IN` series stands at all**, so a rename would land on the very namespace
  ID-DL-1 is deciding how to join."*
- The row's own escalation is already on its face and is **still accurate at HEAD**: *"the IN-2 spec is the
  THIRD artifact building structure on an `IN` name."* Nothing since 2026-08-15 has added a fourth (no IN
  design doc, no IN table, no IN code — `BUILD-STATE.md` L83), so **the veto has not gone further stale than
  the row already says**. That is the disconfirmation, and it is why the disposition is KEEP and not
  ANNOTATE-KEEP.

## UNVERIFIABLE-HERE (what a fact in this slice would need and did not have)

1. **The six source spec files themselves** — `in-1-answer-mining-spec-2026-08-15.md` §7,
   `in-2-crash-report-extraction-spec-2026-08-15.md`, `in-3-held-sets-service-triggers-spec-2026-08-15.md` §8,
   `fe-4-definitions-sets-spec-2026-08-15.md` §6, `fe-5-interrogatory-budget-spec-2026-08-15.md` §7,
   `fe-6-instrument-packaging-spec-2026-08-15.md` §6 — are **not staged**. Every `spec §n` cross-reference in my
   37 rows (§7.3, §6.2, §8, §5.3, §3.3, §13.1/§13.2/§13.3, §10, §2, §2.1) is therefore unchecked. **This also
   makes one register claim untestable and probably wrong:** the Task 9 header note at register L922 says
   *"the packet is deleted, so these rows are the only place these questions live"*, while the Task 8 header at
   L943 says the text is *"verbatim from each spec's open-questions section"* — and those spec files **landed at
   HEAD**. So a second copy of most of this question text very likely exists in `docs/specs/`. I have marked the
   SUMMARY's last column on the **tracking** test (is this row the only place the question is carried as an
   OPEN RULING?), not the text test, and say so there.
2. **`db/schema.sql`, `db/migrations/` and `src/`** — not staged. So: whether FE-D1's migration widened
   `generated_documents.doc_type` beyond `'reasonable-value-report'`; whether `content` is still stored inline;
   whether `service_date`/`service_start`/`service_end` still sit only on `medical_bills`/`bill_line_items`. All
   three are premises in my rows and all three rest here on BUILD-STATE's own statements at HEAD.
3. **`CLAUDE.md`** — not staged, so the text of the `AS-Q1` conforming note added to the data-hygiene bullet
   (`#140`, `11 0` per `BUILD-STATE.md` L2) cannot be read. `Q-IN1-7` quotes that bullet; the `11 0` numstat says
   **11 insertions, 0 deletions**, so the quoted sentence is intact and a note was appended beneath it — but the
   note's words are unread here.
4. **The registry files** — not staged. `Q-FE5-4`, `Q-FE5-7` and `Q-FE5-9` all turn on entry-level facts; I used
   BUILD-STATE's re-derived counts (L102/L103) rather than asserting anything about entry text.
5. **The project-instructions field** — not readable from a repo staging. Where I lean on ROUTE-C's standing
   status I quote `#95` and the register's own ✅ row 998, not the instructions.

---

# PER-ROW BLOCKS — the 7 non-KEEP proposals

### Q-IN1-7 (L930)

**1. THE QUESTION.** Is a publicly-filed answer inside the "case documents" that CLAUDE.md's data-hygiene bar
covers? The row states the consequence itself: *"If the bar applies, IN-1 is gated on the GPU arm — which
BUILD-STATE reports as **T3 WORK IS UNAUTHORIZED** until KICK-1's missing kickoff doc is located or re-issued.
**This question decides whether IN-1 is a near-term item or a Phase-1b one**, and it is yours."*

**2. GREPS RUN.** `\bQ-IN1-7\b` — register **2** (L930, and L899 `Q-WF-3` cross-referencing it), live log **2**,
archive **0**, BUILD-STATE **0**, TOC **0**. Also greped: `KICK-1` (BUILD-STATE 1), `data-hygiene` (BUILD-STATE 1),
`H12` and `H12-v`, `BAA`, `AS-Q1`. Controls as above.

**3. THE CALL — WORLD-STATE-STALE (question live, the row's binary is now a trichotomy).**
The gate half of the premise is INTACT at HEAD. `docs/specs/BUILD-STATE.md` — heading
`## Phase 0 / T3 — environment only, still blocked, with a written protocol above the gate` (L37) — staged **L45**:

> **THE KICKOFF DOC IS STILL GONE (KICK-1)**, never git-tracked, and it is the authorization's **authoritative text**: **until you locate it or re-issue, T3 WORK IS UNAUTHORIZED.**

What is stale is the row's implied *"the bar applies ⇒ GPU arm"* disjunction. On 2026-08-21 Michael ruled a THIRD
path for a different module, in his own act, and the record calls it a reversal.
`docs/record/session-log.md` — `## 2026-08-21 (#130) — Design, VOICE, Opus 5: H12 REVERSED — app calls the m`
— staged **L1460**:

> - **H12 — REVERSED. CONFIRMED.** Yesterday's ruling (app assembles a bundle; Michael carries it into a chat by hand; no client medical content reaches a model API) is superseded. The app calls the model directly, on the firm's own BAA-covered API account.

and staged **L1463**:

> - **BAA is a hard gate — CONFIRMED.** No real record moves through the API call until it is signed.

That is precisely the *"explicit decision from Michael"* the CLAUDE.md bar reserves — exercised once, for the
disclosures writer. `#140`'s `AS-Q1` then located the credential (*"server-side function + secret"*) and put a
conforming note on the same data-hygiene bullet.

**4. DISCONFIRMATION ATTEMPTED — and it holds the row open.** Does `H12` + `AS-Q1` CLOSE `Q-IN1-7`? **No, three
ways.** (a) `H12` is scoped to the disclosures medical chronology, not to a filed pleading, and it never
construes the phrase *"case documents"* — the row's actual question. (b) The BAA is an unsatisfied hard gate:
`#139` and `#140` both carry *"`H12-v` and its limbs, the BAA a hard gate"* on the still-Michael's list, and the
vendor is unruled. (c) The `AS-Q1` note was `11 0` — additive — so the sentence `Q-IN1-7` quotes is unchanged and
the row's quotation is still character-accurate.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: *the row's stated fork ("bar applies ⇒
IN-1 is Phase-1b") is no longer exhaustive — `#130` established a BAA-covered cloud path as an available third
answer for a different module, and `#140`'s `AS-Q1` gave it a credential home; the T3/KICK-1 gate is
nevertheless intact at HEAD, and the BAA remains an unsatisfied hard gate (`H12-v`).* The question — is a
publicly-filed answer a "case document"? — is untouched and only Michael answers it.

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **Q-IN1-7.** CLAUDE.md's data-hygiene rule reads: *"PHI-touching AI processing (transcription, bill/EOB ingestion) runs **locally** on Michael's GPU machine by design — this is a privilege/PHI posture, not a hosting shortcut. Do not introduce cloud AI processing of case documents without an explicit decision from Michael."* **Is a publicly-filed answer inside the "case documents" that bar covers?** The document itself is a public court filing; the *fact that this firm is reading it for this client's case* is work product. If the bar applies, IN-1 is gated on the GPU arm — which BUILD-STATE reports as **T3 WORK IS UNAUTHORIZED** until KICK-1's missing kickoff doc is located or re-issued. **This question decides whether IN-1 is a near-term item or a Phase-1b one**, and it is yours.
```

### Q-FE4-5 (L949)

**1. THE QUESTION.** Where does the definitions-set version stamp live — does the instrument render extend
`generated_documents`, or does the form engine get its own generated-instrument table, and if the latter, what
happens to the `§10` language treating them as one record?

**2. GREPS RUN.** `\bQ-FE4-5\b` — register **1**, live log **0**, archive **0**, BUILD-STATE **0**, TOC **0**
(control `Q-FE4-2` = register 1 / log 2, so the zeros are real). Also greped: `generated_documents` (BUILD-STATE
3 lines), `doc_type` (BUILD-STATE **0**; register 6; log 5), `reasonable-value-report` (log 2, both 2026-08-15
or earlier), `template_version`, `form_template_versions`.

**3. THE CALL — WORLD-STATE-STALE (premise moved; question open).** The row's premise is
*"`generated_documents` at HEAD constrains `doc_type` to a single value and stores content inline."* The FE-D1
build wrote — and committed — an extension of exactly that table. `docs/record/session-log.md` —
`## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED ` — staged **L1749**
(as re-derived in `BUILD-STATE.md` L99):

> `generated_documents` EXTENDED, not forked** — seven nullable columns incl. the answer snapshot (FE-8 retention half) and posture (FE-15).

So the "natural home" the row describes now materially exists in `db/`, and the house has answered the
extend-or-fork question **once, for a different document kind, by build rather than by ruling**.

**4. DISCONFIRMATION ATTEMPTED — and it holds the row open, decisively.** (a) BUILD-STATE at HEAD still asserts
the row's own conclusion. `docs/specs/BUILD-STATE.md` — heading `## Design-input memos — ALL PROPOSED, nothing
built, no registry file touched by any of them` (L124) — staged **L127**:
> and **`generated_documents` will not accept an instrument**.
(b) The migration is UNRUN: build entry staged L1766, *"**`db/schema.sql` is 41 tables; the live database is
still 37, and the gap is the honest state.**"* (c) FE-D1's `form_template_versions` is a **template** version
table; a definitions-set version is a different object, and FE-D1 creates no definitions sets and no items
(`BUILD-STATE.md` L99, *"**NO ITEM TABLE, NO FE-9/11/13/14/16/17.**"*). (d) `#140`'s amendment slice proposes a
further child table (`generated_document_paragraphs`) — PROPOSED, hard-gated on `MIG-1`, `FE-D1A-1` OPEN.
**UNVERIFIABLE-HERE:** whether the committed migration widened the `doc_type` CHECK — `db/` is not staged.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED-HIGH.** Annotation substance: *FE-D1 (2026-08-20) resolved the
extend-vs-fork shape for the disclosures doc type by EXTENDING `generated_documents` with seven nullable
columns; that is a Code session's build act under the `#63` authorization, not a ruling on FE-4's version
stamp, and the migration is unrun — but a later ruling should be made knowing the precedent exists.*

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **Q-FE4-5.** **Where does the definitions-set version stamp live?** The natural home is the generated-document record alongside `template_version` (§10), but `generated_documents` at HEAD constrains `doc_type` to a single value and stores content inline. **Does the instrument render extend that table, or does the form engine get its own generated-instrument table — and if the latter, what happens to the §10 language that treats them as one record?**
```

### Q-FE5-7 (L957)

**1. THE QUESTION.** Which of the twelve propositions in the FE-5 spec's §2 become registry entries? The row
sorts them three ways and states the argument both ways, and both arms of the argument carry **figures**.

**2. GREPS RUN.** `\bQ-FE5-7\b` — register **5** (L3 status header, L604 `V-EXEC`, **L957 the row**, L1003
`Q-STAT-5`, plus header), live log **4**, archive **0**, BUILD-STATE **0**, TOC **0**. Also greped: `Q-STAT-5`
(register row L1003 ⬜ OPEN at HEAD), `H22` (register 7 occurrences — read, not matched, see 4), `Backlog`,
`UNVERIFIED` counts in BUILD-STATE.

**3. THE CALL — WORLD-STATE-STALE (two live figures in the row are wrong at HEAD; question fully open).**
The row says *"the backlog is 40 entries today, 16 of them still UNVERIFIED after the 2026-08-17 walk (figure
conformed 2026-08-17 per `D-2` — re-derived from the two in-backlog registry files at execution, never carried;
OPEN-5(a))"*. At HEAD, on the **same two-file basis**, `docs/specs/BUILD-STATE.md` — heading
`## The registry — FOUR files, backlog 47, THIRTY-FIVE VERIFIED — and the ruled-wording tail is EMPTY` (L102) —
staged **L103**:

> `legal-rule-registry-discovery-enforcement-and-pleading.md` **30 VERIFIED / 10 UNVERIFIED against 40 `**Status:**` lines**; `legal-rule-registry-criminal-plea-and-costs.md` **5 / 2

> **Backlog 47 entries; 35 verified, 12 not.** **The unit is S

So **40 → 47 entries and 16 → 12 unverified**. Both directions matter to the row's own argument: the backlog is
BIGGER (against entering twelve more) and the unverified tail is SMALLER (for entering them).

**4. DISCONFIRMATION ATTEMPTED.** (a) Is the comparison like-for-like? Yes — the row's parenthetical names *"the
two in-backlog registry files"* and BUILD-STATE L103 names the same two, and warns in the same line that a
`legal-rule-registry*` glob gives **74 / 57 / 12** instead. Anchored correctly. (b) Does the smaller unverified
tail moot the question? No — the question is *which propositions enter*, not how big the backlog is. (c) Is
`Q-STAT-5` still open (the row's second dependency)? Yes: register L1003 carries `- ⬜ **Q-STAT-5 — …`. (d) **AN
ID IS NOT AN IDENTITY — the row's `(H22)` was read, not matched.** It means the **registry-queue-arithmetic**
`H22`, register row L112, whose text is *"H22: do the TRCP entries queue behind entries 1–10, or interleave by
build urgency?"* — **not** the disclosures `H22` (warns-never-blocks, `#130`) that `id-collision-report.md` rates
HIGH. Note as a further staleness: that L112 row already carries *"— **RULED 2026-08-13 (#66): INTERLEAVE BY
BUILD URGENCY**"* while keeping its ⬜, so `Q-FE5-7`'s appeal to "the bottleneck" points at an answered row.
(e) **Caution recorded, not acted on:** `D-2` is a colliding string (`id-collision-report.md`, `D-1`…`D-3`,
MEDIUM); the sense here is the task-19 signoff record's stale-count APPLY, which fits, but I did not verify it —
the file is not staged.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: *the row's two backlog figures are
superseded — re-derived at HEAD on the same two-file basis the row names, the backlog is 47 entries, 35 verified,
12 unverified (`BUILD-STATE.md` L102–103); and the `(H22)` cross-reference is the registry-queue-arithmetic H22
at register L112, which is itself already RULED at `#66`.* The twelve-proposition question is untouched.

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **Q-FE5-7.** **Which of the twelve propositions in §2 become registry entries?** The dedupe at §2.1 sorts them three ways. **P-4 and P-5 duplicate VERIFIED entries** and add content those entries do not carry. **P-12 is the unstated half of an existing UNVERIFIED 197.1 entry** — a different proposition on the same rule number, which this project's own precedent treats as a new entry rather than a second observation. **Everything else is genuinely absent**: all of Rule 190.2 (the three Level 1 caps), cmt. 3's *definition* of a discrete subpart, 190.5, 190.6, cmt. 5, and both cases. Against entering them: the backlog is 40 entries today, 16 of them still UNVERIFIED after the 2026-08-17 walk *(figure conformed 2026-08-17 per `D-2` — re-derived from the two in-backlog registry files at execution, never carried; OPEN-5(a))* and the queue is already the project's bottleneck (H22), and if they enter, the fifth-registry-file question (**Q-STAT-5**, still open) is reached again. Against not entering them: this document becomes their only home, and it is not a registry — FE-5 would be built on propositions that live in a spec.
```

### Q-FE5-9 (L959) — THE HEADLINE ROW

**1. THE QUESTION.** Two limbs, both stated on the row's face: *"does the entry's wording need your verification
act, given that verification attaches to wording; and should FE-5 be built against the entry as verified, or
against the rule text, if the two are not reconciled before the engine is authorized?"*

**2. GREPS RUN.** `\bQ-FE5-9\b` — register **4**, live log **3**, archive **0**, **BUILD-STATE 3**, **TOC 1**.
The only row in my 37 with hits in every live file. Also greped: `ROUTE-C` (live log 20+), `route (c)`,
`190.3(b)(3)`, `#95`.

**3. THE CALL — WORLD-STATE-STALE, on a parenthetical that is load-bearing.** The row asserts, twice, that
*"**No replacement wording is proposed** (route (c) is a ruled one-off, not standing law)"*. **Route (c) became
standing law the day after this row was written.** `docs/record/session-log.md` —
`## 2026-08-16 (#95) — WORDING ADJUDICATION: execute-then-verify RULED for Task` — staged **L5389–L5393**:

> - **ROUTE (c) RULED STANDING LAW — TRIGGER #3 FIRES → v21.** Whenever a retrieval or verification
>   pass finds a divergence that CHANGES WHAT AN ENTRY MEANS, proposed conforming wording is drafted
>   and queued for Michael's adopt/reject/edit — never adopted silently.

And the same entry applied the mechanism to the *identical divergence shape*, naming this row — staged **L5397**:

> **entry 3** (192.3(j) — the rule's own sentence verbatim, closing the singular-opponent divergence, the Q-FE5-9 shape)

Corroborated in the register itself: row L998 (*"Should route (c) become STANDING LAW…"*) carries **✅**, and
`BUILD-STATE.md` L114 carries the entry's live status: *"**TRCP 190.3(b)(3) is a VERIFIED entry under a wording
flag — `Q-FE5-9`.**"*

**4. DISCONFIRMATION ATTEMPTED.** (a) Does ROUTE-C's standing status CLOSE limb 1? **No.** ROUTE-C rules the
PROCEDURE (a session drafts; Michael adopts/rejects/edits; an adopted rewording keeps the entry UNVERIFIED until
he verifies the new text) — it does not perform the act for this entry, and it expressly reserves the adopt
decision to Michael. (b) Does anything close limb 2 (build FE-5 to the entry or to the rule)? **No** — FE-5 is
unbuilt, has no discovery-level field to read (`BUILD-STATE.md` L83) and is not authorized. (c) Is the entry
still under the flag at HEAD? Yes — `BUILD-STATE.md` L114, quoted above, and L152 ranks it *"Q-FE5-9 first"*.
(d) The hardened audit independently keeps it live: `attorney-review-queue-audit-HARDENED-2026-08-25.md` L86
lists FE-5 as **PARTIAL** with *"Three live limbs survive (`Q-FE5-9`, `Q-FE5-1`, and `cap = f(level)` being
structurally wrong for Level 3)."*

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH, and NO CLOSE is proposed (per slice steering).**
Annotation substance: *the row's parenthetical "route (c) is a ruled one-off, not standing law" is false at HEAD
— ROUTE-C was ruled STANDING at `#95` (2026-08-16) and is a binding convention, and `#95` applied it to the same
"singular-opponent divergence" shape at registry entry 3, which the log itself calls "the Q-FE5-9 shape". The
drafting act is therefore available and owed; the adopt/reject/edit and the re-verification stay Michael's.*
**Recorded for the fleet: a separate chain (CHAT-DISPATCH v5) is drafting this row's ROUTE-C conforming wording
TODAY, so the drafting act is in flight elsewhere and nothing here should collide with it.** No disposition
stronger than ANNOTATE-KEEP is proposed and none is warranted: limb 2 is untouched by any of this.

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **Q-FE5-9 — THE HEADLINE. A DIVERGENCE INSIDE A *VERIFIED* ENTRY.** The VERIFIED **TRCP 190.3(b)(3)** entry reads *"Level 2 discovery limits **each party** to 25 interrogatories"*; the operative text reads *"Any party may serve on **any other party** no more than 25."* Those are different budgets and the gap scales with the number of opposing parties — 25 total versus 25 × 5 in the trucking posture. **No replacement wording is proposed** (route (c) is a ruled one-off, not standing law) and nothing was edited. **Two questions ride here: does the entry's wording need your verification act, given that verification attaches to wording; and should FE-5 be built against the entry as verified, or against the rule text, if the two are not reconciled before the engine is authorized?** *(Why this row is different in kind from the 08-14 statute pass's eighteen divergences: **this one sits in an entry you VERIFIED**, on 2026-08-11, annotated "Load-bearing for: FE-5." An engine built to the entry's wording would refuse discovery the rule permits, silently. `legal-rule-registry-discovery-and-carrier-duties.md` was NOT touched — the packet's §6 bars it in terms.)*
```

### Q-FE6-3 (L962)

**1. THE QUESTION.** In separate mode one render produces three served documents — is each its own
generated-document row, and what ties the three together as one render of one set to one target?

**2. GREPS RUN.** `\bQ-FE6-3\b` — register **1**, live log **0**, archive **0**, BUILD-STATE **0**, TOC **0**
(control `Q-FE4-2` non-zero). Also greped: `generated_documents`, `doc_type`, `render`/`wave identity`,
`generated_document_paragraphs`.

**3. THE CALL — WORLD-STATE-STALE on the trailing premise; the question itself LIVE.** The row's closing
sentence — *"the `generated_documents` table at HEAD constrains `doc_type` to a single permitted value and
stores content inline, so instrument rendering does not fit that table as written in either mode"* — was
authored 2026-08-15 and the table has since been extended by FE-D1's committed (unrun) migration:
`BUILD-STATE.md` L99, *"`generated_documents` EXTENDED, not forked** — seven nullable columns incl. the answer
snapshot (FE-8 retention half) and posture (FE-15)."*

**4. DISCONFIRMATION ATTEMPTED — the QUESTION survives untouched.** (a) FE-D1 renders **one** document per
generation; separate mode does not exist anywhere: `BUILD-STATE.md` L99, *"**NO ITEM TABLE, NO
FE-9/11/13/14/16/17.**"* (b) The nearest thing on the record to the "render/wave identity" the row says does not
exist is `#140`'s proposed `generated_document_paragraphs` child table — a **paragraph** grain inside one
document, PROPOSED, hard-gated on `MIG-1`, with `FE-D1A-1` still OPEN; it is not a render identity across three
documents. (c) BUILD-STATE at HEAD still restates the row's own finding (L127, *"and **`generated_documents`
will not accept an instrument**."*). **UNVERIFIABLE-HERE:** whether the `doc_type` CHECK was widened by the
FE-D1 migration — `db/` is not staged, and BUILD-STATE contains **zero** occurrences of the string `doc_type`.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: *`generated_documents` was extended by
FE-D1 on 2026-08-20 (seven nullable columns, migration UNRUN, live database still 37 tables against
`db/schema.sql`'s 41), so the row's "as written" description of that table is a 2026-08-15 snapshot; whether the
`doc_type` CHECK widened is not readable from the docs and should be checked against `db/` before the row is
answered.* The three-rows-or-one question is entirely open.

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **Q-FE6-3.** In separate mode one render produces three served documents. **Is each its own generated-document row — three rows, three certificates of service, one verification page on exactly one of them — and if so, what ties the three together as one render of one set to one target?** A render/wave identity would do it, and nothing like that exists. Related: the `generated_documents` table at HEAD constrains `doc_type` to a single permitted value and stores content inline, so instrument rendering does not fit that table as written in either mode.
```

### Q-FE6-6 (L965)

**1. THE QUESTION.** Where does the order live — ordinals on items (gaps, recompute per target) or on the
set-target pair — and does the FE-10 numbering lint run over separate-mode documents independently or across the
family?

**2. GREPS RUN.** `\bQ-FE6-6\b` — register **1**, live log **0**, archive **0**, BUILD-STATE **0**, TOC **0**.
Also greped: `\bFE-10\b` (BUILD-STATE 1 — the build line; hardened audit 1), `numbering lint`, `render lint`.

**3. THE CALL — WORLD-STATE-STALE on tense.** The row speaks of FE-10 in the future: *"which is exactly the
numbering pass FE-10 builds."* FE-10 **is built**. `docs/specs/BUILD-STATE.md` — heading
`## Known stubs & fakes` (L90) — staged **L99** lists among what FE-D1 shipped:
*"the grammar/pronoun engine, §5 gates, FE-10 render lint, write-backs, and the §9 library."*

**4. DISCONFIRMATION ATTEMPTED — both limbs survive.** (a) Does a built lint answer "where does the order live"?
No — FE-D1 creates no items and no sets (`BUILD-STATE.md` L99, *"**NO ITEM TABLE**"*), so the ordinal has no
substrate to sit on either way. (b) Does it answer the separate-mode limb? No — separate mode does not exist;
FE-6's packaging modes are unbuilt and unauthorized. (c) Is FE-10's own row closed? No — the hardened audit,
`attorney-review-queue-audit-HARDENED-2026-08-25.md` staged L87: *"| `FE-10` | `#63`, built | **PARTIAL** | The quote
rules **scope inclusion**, not the row's design questions. **Two surviving limbs, neither with any other row.**"*
So a built FE-10 has not closed even FE-10.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence MED.** Annotation substance: *FE-10's render lint was BUILT on
2026-08-20 inside FE-D1 (fixture-only, migration unrun), so the row's second limb is now askable against a real
implementation rather than a plan; the ordinal question is unchanged because FE-D1 creates no items and no sets.*
This is the thinnest of my seven annotations and I flag it as such — it is a tense correction plus a pointer, not
a finding.

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **Q-FE6-6.** *"Set = ordered filtered list."* **Where does the order live?** If ordinals sit on items, every filtered set inherits gaps (item 7 is a `role:carrier` item absent from the driver's set) and the visible numbering must be recomputed per target — which is exactly the numbering pass FE-10 builds, and exactly the defect class its live evidence describes (a chained start value producing a silent duplicate). If ordinals sit on the set-target pair, the ordering is stored per target and the item table is order-free. **Which, and does the FE-10 numbering lint run over separate-mode documents independently or across the family?**
```

### RUNNER-FOUND DEFECT — the headless FE-5 spec (L968)

**1. THE QUESTION.** *"do you want the head restored from the design side (title + status + canonical path +
§1), or is the spec fine standing on its §8 provenance section…?"* — with the row's own note that inventing a
status line into a spec is the fabrication class `K-6/K-7` forbids. The row closes *"**Michael's, or the next
design session's.**"*

**2. GREPS RUN.** No `Q-` ID, so two distinctive strings were greped instead:
`fe-5-interrogatory-budget-spec` → **8 hits across 6 files** (register 3, live log 2, `BUILD-STATE.md` via the
FE-specs bullet, `session-log-head.md` 1, `id-collision-report.md` 1, `superseded-specs-candidates-2026-08-25.md`
1); and `MISSING ITS HEAD` → **1**, the row itself. Both audits were greped for `MISSING ITS HEAD`, `no §1 head`,
`head-less` — **zero hits in either**, i.e. **neither the 2026-08-24 audit nor the hardened pass ever classified
this row.**

**3. THE CALL — LIVE, with NEW EVIDENCE that sharpens the question (hence not a bare KEEP).** Not repaired at
HEAD: `docs/specs/BUILD-STATE.md` — heading `## Design-input memos — ALL PROPOSED, nothing built, no registry
file touched by any of them` (L124) — staged **L127**:

> **RUNNER-FOUND AND NOT REPAIRED: the FE-5 spec has NO title, NO `Status:` line and no §1 head** — it landed verbatim and was **reconstructed by nobody** (the K-

And the new fact, which the row does not carry: the head **never existed in git at all**.
`docs/record/session-log.md` — `## 2026-08-25 (#138) — (Typed design session, Cowork, Opus 5, DEVICE BRIDGE GR`
— staged **L543–L546**:

> - **DEFECTS FOUND IN REPO FILES, reported and NOT repaired:** `fe-5-interrogatory-budget-spec-2026-08-15.md`
>   is **headless and was BORN headless** — it landed that way in its first commit `883d915`, so no revert
>   recovers it, and its two same-batch siblings both carry the full house head.

Same finding, with the decisive check named, in the staged `superseded-specs-candidates-2026-08-25.md` §2 item 1:
*"The head was never in the repo — no revert recovers it."*

**4. DISCONFIRMATION ATTEMPTED.** (a) Was it quietly repaired? No — BUILD-STATE at HEAD says NOT REPAIRED and
`#138` (ten days after the row) re-found it. (b) Is it an ACT rather than a ruling (`RECLASSIFY-ACT`)? I
considered it and rejected it: the row puts a genuine either/or (restore vs. leave it on its §8 provenance) and
the "restore" branch is the one the row itself flags as fabrication-adjacent. The act only follows the ruling.
(c) Does the new evidence answer it? No — but it changes what "restore" MEANS, and that is exactly why it should
ride on the row rather than sit only in `#138`.

**5. PROPOSED: `ANNOTATE-KEEP` — confidence HIGH.** Annotation substance: *decisive check run 2026-08-25 (`#138`
and `superseded-specs-candidates-2026-08-25.md` §2): the file landed headless in its FIRST commit `883d915`, so
"restore the head" cannot mean recover — it can only mean AUTHOR one now, which is the `K-6/K-7` hazard the row
already names; still unrepaired at HEAD per `BUILD-STATE.md` L127.*

**6. ROW FIRST LINE (verbatim) and uniqueness.** `grep -c -F` over the register = **1**.

```
- ⬜ **RUNNER-FOUND DEFECT, 2026-08-15 (#81), thirty-sixth invocation — `fe-5-interrogatory-budget-spec-2026-08-15.md` IS MISSING ITS HEAD, AND IT WAS LANDED THAT WAY ON PURPOSE.** The file as staged **begins at line 1 with `## 2. Legal substrate`** — it has **no title line, no `Status: PROPOSED. Nothing here is authorized to build.` line, no canonical-path line, and no §1 RECONCILE FIRST section.** FE-4 and FE-6 carry all four. **This contradicts the packet's own §5**, which states that *"Every one of these three specs states on its first line that it is PROPOSED and authorized to build nothing"* — true of two of the three. **It is not a transmission truncation introduced by this runner:** the packet's stated line counts (311 non-blank / 389 raw) match the truncated file **exactly**, so the packet was authored and counted against the same head-less text, and the three landed files are byte-identical to the staged ones (`cmp` clean). **Nothing was reconstructed.** §4.2 says "verbatim … do not normalize, strip, or reflow," and inventing a status line into a spec is the fabrication class `K-6/K-7` exists to forbid. **The question: do you want the head restored from the design side (title + status + canonical path + §1), or is the spec fine standing on its §8 provenance section, which does say in terms "Nothing is verified. No status moved."?** **Until it is restored, FE-5's spec is the one form-engine spec with no PROPOSED marker on its face** — a real hazard if a future session reads only its first screen. **Michael's, or the next design session's.**
```

---

# KEEP ROWS (30) — one line each; every grep was run

Format: `L<line> ID — KEEP — <dependency tag> — greps run` (register / live log / archive / BUILD-STATE / TOC,
all word-bounded, controls non-zero).

- L916 `Q-IN2-5` — KEEP — Phase 1b GPU — greps: `Q-IN2-5` 1/0/0/0/0; `IN-2` (BUILD-STATE L33 *"OUT, and honored:** form engine · IN-2 fact table"*, L129 extraction half UNRULED). Append-only-with-supersession vs update-in-place is untouched by any ruling; the fact table it would apply to does not exist.
- L917 `Q-IN2-6` — KEEP — Phase 1b GPU — greps: `Q-IN2-6` 1/1/0/0/0 (the log hit is `#84` naming it); `oaa_intakes`, `fields_json`. `#84`'s finding is restated at `BUILD-STATE.md` L129 and nothing rules the shared-home question.
- L919 `Q-IN2-8` — KEEP — Phase 1b GPU — greps: `Q-IN2-8` 1/0/0/0/0; `role_tags` (BUILD-STATE L28 *"Role tags (vocabulary DERIVED from the party registry so it cannot drift)"*, L82); `role vocabulary` (log L8447: *"`role_tags` has **no enum, no CHECK"*). The CD-1 role vocabulary is still enum-free and CD-4–CD-13 stay on BUILD-STATE L152's list; nothing rules whether a list-14 mapping is a spec-level act.
- L920 `Q-IN2-9` — KEEP — Phase 1b GPU — greps: `Q-IN2-9` 4/1/0/0/0 (register hits: L3 header, L280 WF-7, L904 Q-WF-8, **L920 the row**); `KICK-1` (BUILD-STATE L45, T3 UNAUTHORIZED); `IN-2 fact table` (BUILD-STATE L33/L83). Every premise intact. **Cross-reference, not a duplicate:** the row names `Q-FE4-3`, which asks the FE-4 side of the same gap; answering `Q-IN2-9` "yes, build an interim IN-2 by hand" would moot `Q-FE4-3` option (c) only — a shared blocker is not a shared question.
- L925 `Q-IN1-2` — KEEP — Phase 1b GPU — greps: `Q-IN1-2` 1/0/0/0/0 (word-bounded, so no `Q-IN1-2x`-class bleed); `capacity denials` (register IN-1 row L250 reads *"flag affirmative pleadings and capacity denials"*, the narrow scope; the origin capability sentence reads it unqualified). The scope fork is unruled.
- L926 `Q-IN1-3` — KEEP — Phase 1b GPU — greps: `Q-IN1-3` 2/1/0/**1**/0. The BUILD-STATE hit is a RESTATEMENT, not an answer: L128, *"**Q-IN1-3 REPORTS AN IRRECONCILABLE CLAIM: IN-6 parses a served RESPONSE SET, IN-1's input is a filed ANSWER**, so no parser is inherited"*. "Which is meant?" is still Michael's.
- L927 `Q-IN1-4` — KEEP — Phase 1b GPU — greps: `Q-IN1-4` 2/1/0/0/0 (second register hit is inside `Q-IN1-8`'s text, which cross-references it). Turns on the IN-2 fact table, which does not exist (`BUILD-STATE.md` L83).
- L928 `Q-IN1-5` — KEEP — Phase 1b GPU — greps: `Q-IN1-5` 1/0/0/0/0. Identity of a dismissed hook; nothing on the record touches it. The row's own "suppressed hook is invisible" hazard is unaddressed anywhere.
- L929 `Q-IN1-6` — KEEP — Phase 1b GPU — greps: `Q-IN1-6` 1/0/0/0/0; `amended answer`, `supplemental` in the log — no hits bearing on pleading supersession for IN-1.
- L931 `Q-IN1-8` — KEEP — free-standing — greps: `Q-IN1-8` 4/**3**/0/**1**/0 (register: L3 header, **L931 the row**, L1009 `ID-DL-1`; BUILD-STATE L152). See the dedicated section above: every hit CARRIES the question forward, none answers it; `BUILD-STATE.md` L152 names it unanswered at the most recent refresh.
- L932 `Q-IN1-9` — KEEP — Phase 1b GPU — greps: `Q-IN1-9` 1/0/0/0/0; `per-defendant`/`pairwise` (`#81` L7508 rules the FE-5 cap pairwise, which the row cites as an analogy only — it is not a ruling about IN-1's unit of work).
- L933 `Q-IN3-1` — KEEP — Q-IN3-3 first-instrument consumer — greps: `Q-IN3-1` 2/0/0/0/0 (second register hit is the IN-3 row L252). Premise re-verified at HEAD: `BUILD-STATE.md` L83, *"**Nor for IN-3: `generated_documents` has NO status column and NO set/parent column (#83)."* FE-D1's seventh column is `posture` (FE-15), not a lifecycle status.
- L934 `Q-IN3-2` — KEEP — Q-IN3-3 first-instrument consumer — greps: `Q-IN3-2` 1/0/0/0/0. Same L83 evidence: no set/parent column, so the "set" the row asks about still has no structural existence.
- L935 `Q-IN3-3` — KEEP — Q-IN3-3 first-instrument consumer — greps: `Q-IN3-3` 4/**3**/0/**1**/0 (register: L252 IN-3, L281 WF-8, L905 Q-WF-9, **L935 the row**). BUILD-STATE L128 states it is STILL unnamed at HEAD: *"**Q-IN3-3 IS THE SCHEDULING EDGE: CD-1 deferred the service-story columns to "the first instrument consumer" and that consumer has NEVER BEEN NAMED**"*; L33 confirms *"**service-story fields** (slots carry an unconsume…"* remain OUT. The 2026-08-24 audit makes it the blocker for four rows (`IN-3`, `IN-4`, `WF-8`, `Q-WF-9`) — closing it wrongly would move four.
- L936 `Q-IN3-4` — KEEP — Q-IN3-3 first-instrument consumer — greps: `Q-IN3-4` 1/0/0/0/0; `certificate of service` (FE-D1 build entry: FE-D1 renders one document and no COS object was created; `FE-15`'s COS limb is listed by the 2026-08-24 audit as still LIVE in the discovery slice).
- L937 `Q-IN3-5` — KEEP — CE1 — greps: `Q-IN3-5` 2/1/0/0/0 (second register hit is IN-3's row L252). CE1 gate intact: `BUILD-STATE.md` L100, *"**CE1 still NOT AUTHORIZED** (D-CL2-9) — must be **CLIENT-AWARE from t…"*; L83 *"No case-event/CE table"*. All three candidate homes still do not exist.
- L939 `Q-IN3-7` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-IN3-7` 1/0/0/0/0; `\bFE-9\b`/`\bFE-11\b` (BUILD-STATE L99: *"**NO ITEM TABLE, NO FE-9/11/13/14/16/17.**"*). Both drift owners are still unbuilt and still homed in the unauthorized discovery slice.
- L940 `Q-IN3-8` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-IN3-8` 1/0/0/0/0; `definitions[- ]set` in the live log = **2 hits, both filenames**, none a ruling. The row's own pairing instruction (answer with `Q-FE4-4`) is intact and `Q-FE4-4` is equally open.
- L941 `Q-IN3-9` — KEEP — Q-IN3-3 first-instrument consumer — greps: `Q-IN3-9` 2/1/0/0/0; `service_date|served_on|service_of_process` across the log and BUILD-STATE = **4 hits, all four inside `#83` at staged L7274–L7278**, i.e. the finding itself and nothing after. Naming still unruled; `#140`'s renames (`provider_party_id`→`facility_party_id`, `provider_billing_profiles`→`facility_billing_profiles`) do not touch these columns.
- L947 `Q-FE4-3` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE4-3` 2/1/0/0/0 (second register hit is inside `Q-IN2-9`, which cross-references it). Premise verbatim-confirmed at HEAD: `BUILD-STATE.md` L33, *"**OUT, and honored:** form engine · IN-2 fact table · merge tooling"*, and L83's *"Nor for IN-2: no fact table"*.
- L948 `Q-FE4-4` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE4-4` 3/0/0/0/0 (other register hits: the FE-4 row L185 and `Q-IN3-8` L940 cross-referencing it). Snapshot-vs-live-reference is untouched; no definitions-set object exists.
- L950 `Q-FE4-6` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE4-6` 1/0/0/0/0; `CHECK constraint`, `controlled vocabular` — the CD-1 derive-so-it-cannot-drift pattern is recorded (BUILD-STATE L28) but never ruled onto FE-4's three item kinds.
- L951 `Q-FE5-1` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE5-1` 2/**2**/0/0/0 (register: FE-5 row L186 + **L951 the row**; log: `#81` L7512 and the hardened audit's source). Independently kept alive by `attorney-review-queue-audit-HARDENED-2026-08-25.md` L86: *"Three live limbs survive (`Q-FE5-9`, `Q-FE5-1`, and `cap = f(level)` being structurally wrong for Level 3)."*
- L954 `Q-FE5-4` — KEEP — registry verification — greps: `Q-FE5-4` 1/0/0/0/0; `Braden` in the live log = **4 hits, all inside `#81`** (staged L7528–L7556) and none after. *Braden*'s registry status is unruled; only Michael rules an entry in.
- L955 `Q-FE5-5` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE5-5` 1/1/0/0/0. Hard prerequisite re-confirmed at HEAD: `BUILD-STATE.md` L83, *"and no discovery-level field on `cases`** (FE-5's hard prerequisite). **Nothing for a"*. One field or two is unruled.
- L956 `Q-FE5-6` — KEEP — CE1 — greps: `Q-FE5-6` 1/0/0/0/0; `CE1`/`D-CL2-9` (BUILD-STATE L100). The row's own blocker is quoted on its face and is still true: CE1 is not authorized, so an enlargement has nowhere to live.
- L958 `Q-FE5-8` — KEEP — free-standing — greps: `Q-FE5-8` 1/1/0/0/0; `defect (register|ledger|log)`, `source-defect`, `known defects in official` across BUILD-STATE + register + live log = **1 hit, the row itself**. **No durable home for source-document defects has been created since 2026-08-15**, which is the row's whole question, so it is LIVE UNCHANGED. *(Checked and rejected as a staleness annotation: the `#103` twenty-two defects are in Claude research documents, and the `A-4 $150 vs $175` conflict is in Michael's own forms — `BUILD-STATE.md` L153, "Both are your files, not the app's" — so neither adds to the row's official-source count.)*
- L961 `Q-FE6-2` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE6-2` 1/0/0/0/0; `role:<tag>`, `role_tags`. No item table exists to carry the scope tag (`BUILD-STATE.md` L99), and the party-registry vocabulary still has no enum or CHECK (log L8447).
- L963 `Q-FE6-4` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE6-4` 2/0/0/0/0 (second register hit is the FE-6 row L187, which states the three ruled scope values). Variant selection is unruled and the item model is unbuilt.
- L966 `Q-FE6-7` — KEEP — discovery slice (FE-9/11/13, Q-FE*) — greps: `Q-FE6-7` 1/0/0/0/0; `LR-LOOK-1` (still a named look, unresolved — the filing moment stays contested per `#80`/`#81`'s runner line). Three-service-events-or-one is unruled.

*(Row L967, the three `FE5-LOOK-` entries, is a continuation line of the L966 row block in the staged register
and is not a separate row in this slice; it is reproduced in the slice file under L966 and is noted here so the
count reads correctly: **37 rows, 37 SUMMARY lines**.)*

---

# SUMMARY

**Column 7 convention:** answered on the **tracking** test — *is this register row the only place the question is
carried as an OPEN RULING?* On the raw **text** test the answer is probably N for most Task 8/9/10 rows, because
the six source specs landed at HEAD and the register's own L943 note says the text is *"verbatim from each spec's
open-questions section"* — but those spec files are not staged (UNVERIFIABLE-HERE), and a spec is not a register.

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| L916 | `Q-IN2-5` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L917 | `Q-IN2-6` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L919 | `Q-IN2-8` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L920 | `Q-IN2-9` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L925 | `Q-IN1-2` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L926 | `Q-IN1-3` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L927 | `Q-IN1-4` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L928 | `Q-IN1-5` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L929 | `Q-IN1-6` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L930 | `Q-IN1-7` | WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | Phase 1b GPU | Y |
| L931 | `Q-IN1-8` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L932 | `Q-IN1-9` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y |
| L933 | `Q-IN3-1` | LIVE, UNCHANGED | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L934 | `Q-IN3-2` | LIVE, UNCHANGED | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L935 | `Q-IN3-3` | LIVE, UNCHANGED | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L936 | `Q-IN3-4` | LIVE, UNCHANGED | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L937 | `Q-IN3-5` | LIVE, UNCHANGED | KEEP | HIGH | CE1 | Y |
| L939 | `Q-IN3-7` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L940 | `Q-IN3-8` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L941 | `Q-IN3-9` | LIVE, UNCHANGED | KEEP | HIGH | Q-IN3-3 first-instrument consumer | Y |
| L947 | `Q-FE4-3` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L948 | `Q-FE4-4` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L949 | `Q-FE4-5` | WORLD-STATE-STALE | ANNOTATE-KEEP | MED-HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L950 | `Q-FE4-6` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L951 | `Q-FE5-1` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L954 | `Q-FE5-4` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y |
| L955 | `Q-FE5-5` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L956 | `Q-FE5-6` | LIVE, UNCHANGED | KEEP | HIGH | CE1 | Y |
| L957 | `Q-FE5-7` | WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | Y |
| L958 | `Q-FE5-8` | LIVE, UNCHANGED | KEEP | HIGH | free-standing | Y |
| L959 | `Q-FE5-9` | WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | registry verification | Y |
| L961 | `Q-FE6-2` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L962 | `Q-FE6-3` | WORLD-STATE-STALE | ANNOTATE-KEEP | MED | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L963 | `Q-FE6-4` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L965 | `Q-FE6-6` | WORLD-STATE-STALE | ANNOTATE-KEEP | MED | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L966 | `Q-FE6-7` | LIVE, UNCHANGED | KEEP | HIGH | discovery slice (FE-9/11/13, Q-FE*) | Y |
| L968 | RUNNER-FOUND DEFECT (headless FE-5 spec) | LIVE + new evidence | ANNOTATE-KEEP | HIGH | free-standing | Y |

**37 rows. 30 KEEP · 7 ANNOTATE-KEEP · 0 CLOSE · 0 CLOSE-SPLIT · 0 RECLASSIFY-ACT · 0 MICHAEL-IN-WORDS.**

## Three notes for the adjudicating session (not proposals)

1. **`Q-FE6-6` (L965) is my weakest annotation.** It is a tense correction. If the fleet is trimming, drop it to
   a plain KEEP; nothing turns on it.
2. **`Q-IN2-9` and `Q-FE4-3` are a matched pair and neither is a duplicate of the other.** They ask the same gap
   from opposite ends (build an interim IN-2 by hand? / what does FE-4 do until IN-2 exists?). If they are ever
   put to Michael, put them in the same exchange — but merging them destroys one of the two ends.
3. **The 2026-08-24 audit's §7 grouping is right about this slice and the hardened pass never revisited it.**
   The audit put `Q-FE4-*`/`Q-FE5-*`/`Q-FE6-*` under *"the discovery slice"* (≈25), `Q-IN1-*`/`Q-IN2-3…-9` under
   *"Phase 1b / the GPU arm"* (≈20), `Q-FE5-6`/`Q-IN3-5` under *"`CE1`, unauthorized"*, and `Q-IN1-8` under
   *"Free-standing, rulable today"*. **I checked every one of those placements against BUILD-STATE at HEAD and
   found no misplacement.** The audit's error class in this slice is not misclassification — it is that it never
   classified L968 at all, which is one of the 27 rows the hardened pass said were named nowhere.


---

<a id="slice-b8"></a>

## ===== SLICE B8 =====

# SWEEPER B8 — wave-2 report

**Slice:** 17 rows, register lines **L972–L1282** of `/home/claude/work/ev/docs/specs/attorney-review-queue.md`
(HEAD `7f02131`). Read-only. Nothing adjudicated, nothing edited, no file written outside this report.

**Counts are OCCURRENCES** (`grep -o … | wc -l`), not matching lines — the register's rows are single physical
lines of up to 20 KB (and its Status header at L3 is a single 73,140-byte line), so a line count is
meaningless there.

**Method note.** Every register/log/BUILD-STATE grep in this report was run TWICE where a zero mattered:
once raw and once against a markdown-flattened copy (`sed 's/\*//g'`), because bold markers break literal
phrase matches. That flattening is what produced this slice's largest finding (see §A). Controls are
reported with every zero.

---

## §A — THREE SLICE-WIDE FINDINGS (read before any row)

### A1. `ID-DL-1`'s packet count: the audit said sixteen, the row says twelve, the register at HEAD says **EIGHTEEN**

The 2026-08-24 audit §7 says `ID-DL-1` "governs **sixteen** packets' question sets — its own annotation stops
counting at twelve." **Both figures are wrong at HEAD, in opposite directions from the truth.**

Command that produced my count:

```
sed 's/\*//g' docs/specs/attorney-review-queue.md > reg_flat.md
grep -n -o -E "(TENTH|ELEVENTH|TWELFTH|THIRTEENTH|FOURTEENTH|FIFTEENTH|SIXTEENTH|SEVENTEENTH|EIGHTEENTH|NINETEENTH|TWENTIETH) packet" reg_flat.md | sort -t: -k1 -n
```

Result (15 hits): `3:ELEVENTH · 3:FIFTEENTH · 3:FOURTEENTH · 3:TENTH · 3:TWELFTH · 612:FIFTEENTH ·
741:EIGHTEENTH · 782:FIFTEENTH · 782:SIXTEENTH · 798:THIRTEENTH · 803:TWELFTH · 811:ELEVENTH · 821:TENTH ·
1009:ELEVENTH · 1009:TWELFTH`.

**The maximum is EIGHTEENTH, at register L741.** The same grep run WITHOUT flattening returns a maximum of
SIXTEENTH — because L741 reads `an **EIGHTEENTH** packet`, and the bold markers split the phrase. **That is
almost certainly how the 2026-08-24 audit arrived at "sixteen": it ran the unflattened match.**

Decisive text, character-exact, copied from `sed -n '741p'` of the register (one physical line, 1,754 B):

> `**THE ORDINAL WAS DERIVED RATHER THAN COPIED, AND THIS PACKET STATED NONE:** the highest recorded in this file is **SEVENTEENTH** (the fifty-fifth invocation's block) and BUILD-STATE independently reads **"SEVENTEEN packets,"** so `ID-DL-1` now governs an **EIGHTEENTH** packet.`

— `docs/specs/attorney-review-queue.md`, L741, block heading `*(**THE CHAT-DISPATCH v4 QUESTIONS — T-27 THROUGH T-32 — ADDED 2026-08-17, FIFTY-SIXTH q` (first 80 chars), written **2026-08-17 — a week BEFORE the audit**.

Corroboration in the live log, `docs/record/session-log.md` L4544, entry
`## 2026-08-17 — QUEUE-RUNNER batch (runner line; FIFTY-SIXTH invocation) — the docs-only ba` (first 80 chars):

> `- **THE ORDINAL WAS DERIVED RATHER THAN COPIED, AND THIS PACKET STATED NONE.** The highest recorded in `attorney-review-queue.md` is **SEVENTEENTH** and BUILD-STATE independently reads **"SEVENTEEN packets"**, so `ID-DL-1` now governs an **EIGHTEENTH**.`

Nothing later in the log touches `ID-DL-1` (newest hit in a newest-first file is L4544; `grep -c -F "ID-DL-1"`
on the live log = 30 hits (identical raw and flattened), all at L4544 or older).

**Independent cross-check by enumeration** (a different method, deliberately):
```
grep -n -o -E ".{0,130}NO DURABLE IDs" reg_flat.md
```
returns **14** distinct packet blocks in the register (Tasks 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
CHAT-DISPATCH v3 T-20–T-25, CHAT-DISPATCH v4 T-27–T-32), plus the Task-6 DL memo (the set `ID-DL-1`'s own row
is about, L1010–L1014), plus the `Q-T19-4` set at L612 = **16 packets nameable from a body block**. The 14th
and 17th ordinals are recorded **only in the Status header at L3**, in no body block — which is why an
enumeration lands on 16 and the running ordinal lands on 18. **Both numbers are real; they count different
things, and the audit reported the smaller one as if it were the running total.**

### A2. **Every line number in both audits and in `id-collision-report.md` is OFF BY ONE against HEAD** — and in this neighbourhood the off-by-one lands on a *different open row*

Probe (8 of the audits' own line cites, checked against the staged register at HEAD):

| audit/report says | HEAD line actually holds |
|---|---|
| L877 = `Q-RE-8` | `- ⬜ **`Q-RE-7`** — Does RE-1 model INBOUND referrals, or out…` |
| L901 = `Q-WF-6` | `- ⬜ **Q-WF-5.** `docs/specs/outlook-email-intake.md` (captured…` |
| L860 = `Q-QBO-6` | `- ⬜ **`Q-QBO-5`** — When a case view shows a trust figure it…` |
| L431 = `FC13-Q-5` | `- ⬜ **`FC13-Q-4`** — What is the relationship between these…` |
| L449 = `G10-4` | `- ⬜ **`G10-2`** — Does `party_pii.party_id`'s `on delete cas…` |
| **L1002 = `Q-STAT-5`** (audit §1 finding 1) | **`- ⬜ **Q-STAT-4 — TRCP 193 comment 6 as a registry candidat…`** |
| **L1012 = `[DL-memo Q4]`** (hardened §, line 185) | **`- ⬜ **[DL-memo Q3] — No registry entry for TRCP 21a exists…`** |
| L1260 = `O4` (`id-collision-report.md` L391) | `- ✅ **O3 (transcript sort & route) — RULED 2026-08-13 (#66…` — a **CLOSED** row |

**Uniform +1 drift.** Two of the eight land inside MY slice, and both would destroy a row that exists nowhere
else: acting on "close L1002 (`Q-STAT-5`)" deletes **`Q-STAT-4`**, whose text returns **zero** in the live log,
the archive, BUILD-STATE and the TOC (see the L1002 row block). This is CITE-STABILITY's own failure mode
against a file that prepends and rewrites — and it means **no closure may be executed from an audit line number
without reading the row first.**

### A3. `OPEN-2` vs `TC-OPEN-2` — the substring trap fires in the newest entries

`grep -c -F "OPEN-2"` over log lines 1–600 (entries `#138`–`#140` + runners 83–85, i.e. everything after both
audits) returns **6**. **All six are `TC-OPEN-2`**, a different ID about the superseded-specs sweep. A
grep excluding `TC-OPEN-2` over the whole flattened log returns **4 occurrences**, all in 2026-08-15 entries.
`OPEN-2` (the carrier-duties count) has not been touched since 2026-08-15.

---

## §B — PER-ROW BLOCKS (non-KEEP proposals)

### [Task 7 memo Q3] (L974)

1. **QUESTION.** Two limbs: (a) re-specify the court-profile layer's currency check (feature-intake item F) to
   compare against the **OCA publication record** rather than a county PDF's date, storing the publication
   reference as the authority and the PDF as a convenience copy; (b) make `LR-LOOK-2` (one TOPICs pass filtered
   to Bexar) the first exercise of that feature.
2. **GREPS RUN.** `Currency is a different check than feature-intake item F specified` → register **1**, live log
   **0**, BUILD-STATE **0**, archive **0**. `storing the publication reference as the authority and the PDF as a
   convenience copy` → register **1**, elsewhere **0**. `LR-LOOK-2` → live log **1** (its origin at `#80`),
   BUILD-STATE **0**. `feature-intake item F` → live log **1** (same origin). `TOPICs` / `OCA publication` → **0**
   outside `#80`. Control string `zzz-nonexistent-control-string-zzz` → 0 in all four files.
3. **CALL — LIVE, but with a ruled neighbour the row does not know about.** The currency limb is untouched on the
   record; the *keying* limb of the same court-profile layer WAS ruled after this row was written. `docs/specs/BUILD-STATE.md`
   L126, section `## …` (the `BEXAR LOCAL RULES + E-FILING (#80)` bullet), character-exact:

   > `**A COUNTY-KEYED COURT PROFILE IS WRONG FOR BEXAR: the 225th and 285th elected OUT** of the Presiding/Monitoring dockets (**H43**) — **which FC-8's court-keyed profile answers by ruling: the key is the COURT, not the county.**`

   and the ruling itself, `docs/record/session-log.md` L4121, entry `## 2026-08-18 (#106) — FABLE FC-BLOCK ADJUDICATION: fifteen FC items put one at a time, THIRTEEN` (first 80 chars):

   > `FC-8 court-keyed deadline`
   > `  PROFILE + structured geography on `cases` when a schema act is next authorized (no migration`
   > `  authorized)`

4. **DISCONFIRMATION ATTEMPT.** Does FC-8 reach the currency check? **No.** FC-8's own words are about the deadline
   profile's KEY and structured geography; the string `feature-intake item F`, `OCA`, `TOPICs` and `LR-LOOK-2` are
   absent from `#106` entirely. And BUILD-STATE at HEAD still states the underlying Bexar findings as unresolved
   (`**THE FILING MOMENT IS CONTESTED, NOT SETTLED:**`). So the question survives; only its surrounding world moved.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence MED.** Annotation substance: *"the court-profile layer this row asks a
   currency question about now has a RULED key — FC-8 (`#106`) — court, not county; the currency check itself is
   untouched, and `LR-LOOK-2` has never been run."* Why: the row invites a ruling about a layer whose key was
   settled three days after the row was written, and a ruler reading only the row would not know that.
6. **FIRST LINE (exact) — occurs exactly once in the register** (`grep -c -x -F` against a file holding the line → **1**):

```
- ⬜ **[Task 7 memo Q3] — Currency is a different check than feature-intake item F specified.** TRCP 3a(c) makes publication on the OCA's website a condition of a local rule's effectiveness, the 2023 amendment removed Supreme Court approval, and the Bexar county-court rules set no calendar date and instead take effect *"upon their publication on the website of the Office of Court Administration."* The county's own index page currently hosts several vintages, and TOPICs could not be searched through this session's fetch layer. **Do you want the court-profile layer's currency check (feature-intake item F) re-specified to compare against the OCA publication record rather than a county PDF's date — storing the publication reference as the authority and the PDF as a convenience copy? And will you make LR-LOOK-2 (one TOPICs pass filtered to Bexar) the first exercise of that feature?**
```

### Q-STAT-2 (L1000)

1. **QUESTION.** Is `legal-rule-registry-draft-entries-medical-billing.md`'s exclusion from the registry backlog
   **deliberate** (draft entries not yet adopted) **or a counting gap**? If deliberate, re-word the three-files line;
   if not, the backlog figure moves.
2. **GREPS RUN.** `Q-STAT-2` (flattened, so bold cannot hide it) → live log **10 occurrences**, BUILD-STATE **3**, TOC **1**,
   archive **0**. Controls in the same series: `Q-STAT-3` log **3**, `Q-STAT-5` log **10**, `Q-STAT-4` log **0** —
   so the matcher demonstrably discriminates. `The fourth registry file.` → register **1**, elsewhere **0**.
   `its unit is not the backlog's unit` → register **1**, elsewhere **0**.
3. **CALL — WORLD-STATE-STALE on a stated figure; QUESTION LIVE.** Non-closure, `docs/record/session-log.md` L7888,
   entry `## 2026-08-15 — QUEUE-RUNNER batch (runner line; THIRTY-THIRD invocation)` (whole heading):

   > `- **Q-STAT-2 and Q-STAT-5 ANNOTATED, NOT ANSWERED.** Both stay open and are Michael's.`

   *(A runner line, cited as evidence of non-closure — not as a ruling.)* And at HEAD, `docs/specs/BUILD-STATE.md`
   L115:

   > `Whether that exclusion is deliberate is **`Q-STAT-2`, yours**`

   **The stale figure.** The row says the file "sits outside the backlog of **40**". BUILD-STATE's own section
   heading at HEAD, L102, character-exact:

   > `## The registry — FOUR files, backlog 47, THIRTY-FIVE VERIFIED — and the ruled-wording tail is EMPTY`

   **And BUILD-STATE now carries a finding the row does not have**, L115:

   > `- **THE FOURTH FILE SITS OUTSIDE THE BACKLOG: `legal-rule-registry-draft-entries-medical-billing.md`**, headed ALL ENTRIES UNVERIFIED while its own entry Status lines read **DRAFT** — a second header/entry unit mismatch, re-derived this refresh.`

4. **DISCONFIRMATION ATTEMPT.** Could BUILD-STATE's "FOUR files, backlog 47" itself BE the answer — i.e. did someone
   rule the exclusion deliberate and simply not close the row? No: BUILD-STATE's very next clause hands the question
   back (`is **`Q-STAT-2`, yours**`), and L144 reads `Q-STAT-2 through Q-STAT-6 stay OPEN`. No entry in the live log
   or the archive contains Michael's words on the exclusion. **Second disconfirmation:** could the row's "40" be a
   dated annotation that should stand as written (the DT-1 / append-only pattern)? Partly — the row itself sources it
   to `D-2` at 2026-08-17 — but the row states it in the PRESENT tense ("sits outside the backlog of 40"), and the
   sentence is what a ruler would read as current.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence HIGH.** Annotation substance: *"backlog is **47 / 35 verified** at HEAD,
   not 40 (BUILD-STATE L102); and BUILD-STATE has since found a SECOND unit mismatch inside this same file — header
   'ALL ENTRIES UNVERIFIED' against entry Status lines reading 'DRAFT' — which is fresh evidence for the
   'deliberate, not a counting gap' limb the row already argues."* Why: the annotation both corrects a live-reading
   figure and strengthens one of the row's own two branches.
6. **FIRST LINE (exact) — occurs exactly once in the register** (`grep -c -x -F` → **1**):

```
- ⬜ **Q-STAT-2 — The fourth registry file.** `legal-rule-registry-draft-entries-medical-billing.md` is headed "ALL ENTRIES UNVERIFIED" and sits outside the backlog of 40 *(figure conformed 2026-08-17 per `D-2` — re-derived from the two in-backlog registry files at execution, never carried; OPEN-5(a))*, while BUILD-STATE says the registry is three files. **Is that deliberate — draft entries not yet adopted into the registry proper — or a counting gap?** If deliberate, the three-files line would be clearer as "three registry files plus a draft-entry file, not counted in the backlog." If not, the backlog figure moves. *(Runner note: BUILD-STATE now states four-not-three and that the backlog was **not** changed; no other file's count moved.)* **ANNOTATED 2026-08-15 (#78), NOT ANSWERED — the question is sharper than when it was written.** That file holds **ten numbered entries plus one expressly UNADOPTED draft entry**, uses its own `[READ]`/`[STATUTE]`/`[EXT]` source-flag scheme, and — unlike the registry files proper — **its entries are subject-scoped and can carry multiple propositions each** (ENTRY 2 has a "Propositions:" block). **That is an argument that its unit is not the backlog's unit**, which would make the exclusion deliberate rather than a counting gap. It also **holds live Insurance Code material** (ENTRY 8, ch. 1467), which the #78 correction surfaced.
```

### Q-STAT-5 (L1003)

1. **QUESTION.** How far does the Insurance line go before anything is ruled — C-1…C-20 (chs. 541–542) in as
   registry entries **now** (starting a fifth registry file), **held** as design input until UIM/UDJA is scoped, or
   **narrowed** to what CD-3 and CL-3 touch? Plus the placement question the annotations added, and the
   cases-vs-practice boundary the four stacked passes describe.
2. **GREPS RUN.** `Q-STAT-5` (flattened) → live log **10 occurrences**, BUILD-STATE **1**, TOC **1**, archive **0**.
   `How far should the Insurance line go before anything is ruled?` → register **1**, elsewhere **0**.
   `AT FOUR THIS IS A SHAPE, NOT A COINCIDENCE` → register **1**, elsewhere **0**. `the law of the firm's PRACTICE`
   → register **4**, live log **1**, BUILD-STATE **1** (a shared FRAMING, not a shared question — see field 4).
3. **CALL — DEFERRED IN MICHAEL'S OWN CHOICE, and WORLD-STATE-STALE on its own count.** The deferral, `docs/record/session-log.md`
   L4003–L4005, entry `## 2026-08-18 (#108) — T-26 RUN LIVE: THREE GROUP A ENTRIES VERIFIED AND TWO CONFO`
   (first 80 chars), character-exact:

   > `  the verbatim direction; the plain open was chosen over the offered boundary-ruling variant, so`
   > `  the cases-vs-practice boundary stays undecided.`

   The staleness, `docs/specs/BUILD-STATE.md` L116, character-exact:

   > `- **THE SAME ABSENCE HAS APPEARED FIVE TIMES.**`

   (the row's own text stops at four: `**AT FOUR THIS IS A SHAPE, NOT A COINCIDENCE.**`), and the same BUILD-STATE
   line still records `**FOUR research passes still stack behind `Q-STAT-5`'s one ruling.**` — i.e. **BUILD-STATE
   itself carries five absences and four passes in one sentence.** BUILD-STATE also names a consumer the row does
   not: `Whether any is inserted, and where — the siblings' placement rule points at a NEW file, not a fold-in —
   is `G10-4` / `Q-WF-6`, yours`.
4. **DISCONFIRMATION ATTEMPT — two, both run.** (a) *Is the "plain open" a closure of the narrow C-1…C-20 question?*
   No — `#108`'s sentence is about the **boundary-ruling variant**, and its own subject is `FC-13`; C-1…C-20 are
   never named in `#108`. (b) *Is this row a duplicate of `Q-RE-8` (the audit's §1 finding 1 groups six rows as
   "one ruling wearing five hats")?* **Expressly not.** `docs/specs/attorney-review-queue-audit-HARDENED-2026-08-25.md`
   L61, character-exact:

   > `- **`Q-RE-8` vs the `Q-STAT-5` stack** share a **blocker**, not a question. Collapsing them destroys `Q-STAT-5`'s own subject — how far the Insurance line goes, C-1…C-20 — including **C-19's 61-day pre-suit notice and C-20's limitations period, which the row says have "a build consequence independent of the registry."**`

   and the same finding is carried into the newest log entry, `docs/record/session-log.md` L508, entry
   `## 2026-08-25 (#138) — (Typed design session, Cowork, Opus 5, DEVICE BRIDGE GRANTED: RECON-1` (first 80 chars):
   `` `Q-RE-8`/`Q-STAT-5` share a BLOCKER, not a question ``.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence HIGH.** Annotation substance, in three parts, each sourced:
   *(i)* **the same absence is now recorded FIVE times, not four** (BUILD-STATE L116) while the very same line still
   says four passes stack — the row's "AT FOUR" is behind BUILD-STATE's own count; *(ii)* **two questions outside the
   named stack now turn on this ruling**: `FC13-Q-5` — `docs/record/session-log.md` L3644-3646, entry
   `## 2026-08-18 (#112) — THE OPUS-RUN PASTE EXECUTED: five FC-13 entry drafts and the Q-WS` (first 80 chars):
   `TDRPC 1.04(f) has **no home at all** and naming one would decide part of `Q-STAT-5`, which #108 expressly left
   open — so its destination is **deliberately a question**.` — **and the hardened audit is emphatic that this is
   NOT stack membership**: `**And `FC13-Q-5` is not in the `Q-STAT-5` stack** — `Q-RE-8` names the stack as four and
   it is not one of them.` (hardened audit L150); and `G10-4`/`Q-WF-6`, which BUILD-STATE L116 names as carrying the
   same placement question with SEVEN drafted ch. 521 entries already written and none inserted; *(iii)* **Michael's
   own choice at `#108` was the plain open**, so the boundary is deliberately undecided rather than overlooked.
   Why: the row is the stack's ruling point, its own count is behind, and the *touches-but-is-not-in-the-stack*
   distinction is exactly the one a merge would destroy.
6. **FIRST LINE (exact) — occurs exactly once in the register** (`grep -c -x -F` → **1**; 2,937 B, one physical line):

```
- ⬜ **Q-STAT-5 — How far should the Insurance line go before anything is ruled?** The pass's §7 offers twenty candidates (C-1…C-20, chs. 541–542). **Do you want them ruled in as registry entries now (which starts a fifth registry file, since none of the four covers insurance), held as design input until the UIM/UDJA module is actually scoped, or narrowed to the handful that CD-3 and CL-3 actually touch?** The two deadline candidates — **C-19's 61-day pre-suit notice** and **C-20's two-year limitations, extendable 180 days** — are the ones with a build consequence independent of the registry. **ANNOTATED 2026-08-15 (#78), NOT ANSWERED — it is now also a PLACEMENT question.** The premise that "none of the four covers insurance" was **over-broad**: `legal-rule-registry-draft-entries-medical-billing.md` **ENTRY 8 already occupies Insurance Code ground** (SB 1264 / ch. 1467 balance billing, `[EXT]`, low priority). **Different subject** — third-party provider billing, not first-party prompt payment or unfair settlement practices, **so no candidate is withdrawn and chs. 541/542 really are absent from all four files** — but ruling C-1…C-20 in now raises a placement and one-proposition-one-home question that did not exist when this row was written. **REACHED AGAIN 2026-08-15 (#81), still not answered: `Q-FE5-7` puts twelve TRCP 190/197 propositions to the same placement question** — the FE-5 spec says in terms that if they enter, the fifth-registry-file question is reached again. **Two research passes now stack behind this one ruling.** **REACHED A THIRD TIME 2026-08-15 (#87), still not answered: `Q-QBO-6` puts a Texas client-property / trust-accounting layer to the same placement question** — absent from all four files on a re-verified sweep, and the QBO memo names this row's fifth file as one of the three possible homes. **Nothing was drafted; the backlog stays 34.** **REACHED A FOURTH TIME 2026-08-16 (#88), still not answered: `Q-RE-8` puts a Texas PROFESSIONAL-CONDUCT layer to the same placement question** — fourteen fee-sharing, referral and disciplinary terms (`referral`, `lawyer referral`, `fee sharing`, `fee-sharing`, `division of fee`, `joint responsibility`, `TDRPC`, `1.04`, `1.06`, `barratry`, `solicit`, `declin`, `engagement`) return **zero across all four registry files** on a natively re-verified sweep, and each of the five non-zero adjacent hits was read and is unrelated. **AT FOUR THIS IS A SHAPE, NOT A COINCIDENCE.** Privacy (`Q-WF-6`), insurance (#78), client property / trust accounting (`Q-QBO-6`) and now professional conduct together describe a scope: **the registry carries the law of the firm's CASES and nothing about the law of the firm's PRACTICE.** That may be the right boundary — **but nobody chose it, and three of the four were found by accident while looking for something else.** **Four research passes now stack behind this one ruling.**
```

### ID-DL-1 (L1009)

1. **QUESTION.** Do the packet-local question sets get a numbered `DL` series ruled into existence (making
   `DL-INPUT` its worded first member), do they fold into an existing series, or do they stay packet-local until the
   deadline layer is scoped? "Series creation is a ruling, not a formatting choice."
2. **GREPS RUN.** `ID-DL-1` → live log **30 occurrences** (raw and flattened identical), register **30 occurrences across 13
   lines** (flattened), archive **0**, BUILD-STATE **2** (L125 `(ID-DL-1)` and L152 "the deadline memo's five +
   ID-DL-1") — the BUILD-STATE hits are ID-only pointers, carrying none of the question. Ordinal sweep: see **§A1** for the
   command and its 15 hits. `What series do the five questions below belong to?` → register **1**, elsewhere **0**.
   `Series creation is a ruling, not a formatting choice` → register **1**, elsewhere **0**.
3. **CALL — LIVE, UNCHANGED as to the ruling; WORLD-STATE-STALE as to the row's own count.** No entry in the live log
   or the archive contains Michael's words minting, folding or refusing a series. The nearest thing to a ruling is
   scoped to a DIFFERENT set — `docs/record/session-log.md` L2696, entry
   `## 2026-08-19 — QUEUE-RUNNER batch (runner line; SEVENTY-SECOND invocation) — th` (first 80 chars):

   > `- **THE 21 PACKET-LOCAL QUESTIONS TOOK NO DURABLE IDs AND NO ROWS, ON HIS RULING — AND THE REASON IS QR-1's OWN RATIONALE RUNNING THE OTHER WAY.** `Q-G3-1`–`Q-G3-5`, `Q-521-1`–`Q-521-5`, `Q-DE-1`–`Q-DE-6` and `Q-PH-1`–`Q-PH-5` all stay where they were authored.`

   The staleness is §A1: the row's text stops at `**Twelve packets; the cost of the ruling has never changed.**`
   while the register's own most recent statement is **EIGHTEENTH** (L741). And the stream that fed it has stopped —
   `docs/specs/BUILD-STATE.md` L145: `- **CHAT-DISPATCH v4 IS COMPLETE AND EVERY CHEAP MOVE IT LEFT IS SPENT.**`
   and L151: `**the OPUS-RUN paste HAS RUN and is off your list** (`#112`)`.
4. **DISCONFIRMATION ATTEMPT — three, all run.** (a) *Does the seventy-second invocation's ruling generalise and close
   this row?* **No** — its stated reason is that those questions' full text lives in permanent repo files, so QR-1's
   destruction risk "cannot arise for them"; the twelve-to-eighteen sets this row governs are the ones whose text
   lives **only in the register**. The ruling is expressly scoped by its own rationale. (b) *Is the row MOOTED because
   CHAT-DISPATCH v4 is complete?* **No** — completion stops the count growing; it does not name the existing sets.
   (c) *Do the governed questions live anywhere else, so closing costs nothing?* **Partly, and it varies by block** —
   the Task 7 block (L970) says `Text below is verbatim from the memo's §11 per QR-1`, i.e. a second home exists; other
   blocks (L798, L803) say `the packet is deleted, so these rows are the only place these questions live`.
   **UNVERIFIABLE-HERE** which is true at HEAD for each source spec — those spec files are not staged.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence HIGH.** Annotation substance: *"this row's own count (twelve) is six behind
   the register's own record: the CHAT-DISPATCH v4 block at L741 states an **EIGHTEENTH** packet, written 2026-08-17.
   The count is now STABLE — CHAT-DISPATCH v4 is COMPLETE and the OPUS-RUN paste has run — so this is the final size
   of what the two-word ruling governs. Note also that the 2026-08-24 audit's 'sixteen' is an artifact of an
   unflattened grep."* Why: the row's headline argument is "the cost has never changed, the dependents keep growing";
   both halves need the true number, and a ruler is entitled to know the stack has stopped growing.
6. **FIRST LINE (exact).** 7,734 B of text (7,735 with newline), ONE physical line, `grep -c -x -F` against the register → **1**. Reproduced whole
   and verbatim at `/home/claude/work/ev/slices/B8.md` (`ROW L1009`); its opening and closing sentences, copied
   character-exact from `sed -n '1009p'`:

   > `- ⬜ **ID-DL-1 — What series do the five questions below belong to?** The runner declined to choose: minting `DL-1` is forbidden by the packet, `V-1x` collides, and `DE` means deficiency.`

   > `**Twelve packets; the cost of the ruling has never changed.**`

### [DL-memo Q3] (L1012)

1. **QUESTION.** Open a TRCP 21a registry entry, and at what scope — the added-days provision alone (21a(c)), or
   21a(b)'s completion rules as well (fax's 5:00 p.m. recipient-local roll; commercial delivery deposit-complete but
   uncushioned)?
2. **GREPS RUN.** `[DL-memo Q3]` → live log **2** (L2701, L2872), archive **0**, BUILD-STATE **0** as a bracketed
   literal but the range `[DL-memo Q1]`–`[DL-memo Q5]` appears at L125. `21a` → live log **21**, BUILD-STATE **5**,
   archive **0**. `No registry entry for TRCP 21a exists anywhere in the repo` → register **1**, elsewhere **0**.
   `Only mail moves a deadline` → register **1**, elsewhere **0**.
3. **CALL — WORLD-STATE-STALE on TWO of the row's own assertions; QUESTION LIVE.** Non-closure at HEAD,
   `docs/specs/BUILD-STATE.md` L125, character-exact:

   > `Also open: **no TRCP 21a entry exists anywhere**; **Rule 195.2's 30-day floor is GONE**; **190.4(b)(2) now allows a phase-scoped send-by Level 3 period.**`

   and, same line: `**Five questions, NO durable IDs (ID-DL-1) — all five ARE filed as `[DL-memo Q1]`–`[DL-memo Q5]` and all five still ⬜.**`

   **Staleness (a) — the row's closing sentence is IN DOUBT at HEAD.** `docs/record/session-log.md` L2701, entry
   `## 2026-08-19 — QUEUE-RUNNER batch (runner line; SEVENTY-SECOND invocation) — th` (first 80 chars),
   character-exact:

   > `` `[DL-memo Q3]`, **carried and flagged** (the deadline spec found `P-2`'s *"only to mail"* in doubt — TRCP 21a(c) has long read *"by mail **or by commercial delivery service**"* — not re-retrieved this session, and named the highest-value verification target in that spec's §8) ``

   The row's last sentence reads `**A genuine gap, not a duplicate.** Only mail moves a deadline: 21a(c) adds three
   days for mail and names no other method; electronic service gets none.` — i.e. **the row states as settled the
   exact proposition the record flags as in doubt.**

   **Staleness (b) — the row's own opening premise is self-falsifying and the record says so.**
   `docs/record/session-log.md` L2872, entry `## 2026-08-19 (#117) — POST-SYNC VERIFICATION OF EVERYTHING LANDED AND UNREVIEWED ` (first 80 chars), character-exact:

   > `**"no queue item for TRCP 21a" is false at HEAD** —`
   > `  `[DL-memo Q3]` has been open since 2026-08-14, and **the row asserting no row exists IS the row**;`

4. **DISCONFIRMATION ATTEMPT.** *Does the "in doubt" flag close or answer the row?* No — it is expressly `not
   re-retrieved this session` and named a **verification target**, i.e. Michael's act, and the same runner line lists
   `[DL-memo Q1]`–`[DL-memo Q5]` among items `all left open`. *Does a 21a entry now exist, mooting the row?*
   BUILD-STATE at HEAD still says `no TRCP 21a entry exists anywhere`. **UNVERIFIABLE-HERE** at first hand: no
   `legal-rule-registry-*` file is staged, so I can only report BUILD-STATE's re-derived statement.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence HIGH.** Annotation substance: *"the row's closing proposition ('Only mail
   moves a deadline… names no other method') is IN DOUBT at HEAD — `deadline-engine-spec.md` §8 found 21a(c) has long
   read 'by mail or by commercial delivery service' (seventy-second invocation, 2026-08-19), and it is named that
   spec's highest-value verification target. And `#117` records that the row's 'no queue item' limb is false at HEAD
   because THIS row is the queue item. The scope question — 21a(c) alone or 21a(b) as well — is untouched."* Why: a
   ruler reading the row today would rule the SCOPE question on a stated fact the record has already flagged as
   probably wrong, and the wrong fact is precisely about which methods the entry would have to cover.
6. **FIRST LINE (exact) — occurs exactly once in the register** (`grep -c -x -F` → **1**):

```
- ⬜ **[DL-memo Q3] — No registry entry for TRCP 21a exists anywhere in the repo** — no proposition, no ruling, no queue item — yet its added-days provision is per-party **and** per-method and therefore load-bearing for every response clock. **Do you want a 21a entry opened, and at what scope: the added-days provision alone (21a(c)), or 21a(b)'s completion rules as well, given that fax carries a time-of-day rule (after 5:00 p.m. recipient-local rolls to the next day) and commercial delivery is deposit-complete but uncushioned?** Entered 2026-08-14. **A genuine gap, not a duplicate.** Only mail moves a deadline: 21a(c) adds three days for mail and names no other method; electronic service gets none.
```

### [DL-memo Q5] (L1014)

1. **QUESTION.** Should the engine model a Level 3 period as a **typed choice** between complete-by and send-by,
   **with phase scoping** — or should Level 3 remain wholly document-derived with no structured representation?
2. **GREPS RUN.** `190.4` → live log **4**, BUILD-STATE **1**, archive **2**. `Level 3` → live log **3**,
   BUILD-STATE **2**, archive **3**. `send-by` → live log **1**, BUILD-STATE **1**, archive **0**.
   `either all discovery must be conducted or all discovery requests must be sent` → register **1**, elsewhere **0**.
   `typed choice between complete-by and send-by, with phase scoping` → register **1**, elsewhere **0**.
3. **CALL — LIVE, with a second consumer and an upstream gap the row does not name.** Non-closure at HEAD,
   `docs/specs/BUILD-STATE.md` L125: `**190.4(b)(2) now allows a phase-scoped send-by Level 3 period.**` and
   `all five still ⬜`. The second consumer, `docs/record/session-log.md` L7517–L7521, entry
   `## 2026-08-15 (#81) — CHAT-DISPATCH TASK 8: form-engine specs FE-4, FE-5, FE-6 — ` (first 80 chars),
   character-exact:

   > `- **LEVEL 3 HAS NO CAP TO LOOK UP.** Under 190.4(b) the Level 2 (or Level 1) limits apply *"unless`
   > `  specifically changed in the discovery control plan ordered by the court,"* and the plan **must`
   > `  include** *"appropriate limits on the amount of discovery"* — so the Level 3 cap is an **order`
   > `  value, not a level constant**, and 190.4(b)(2) permits phase scoping. **A `cap = f(level)` lookup`
   > `  is correct for Levels 1 and 2 and structurally wrong for Level 3.**`

   and the upstream gap, same entry, L7522–L7524:

   > `- **AND THE DISCOVERY LEVEL IS NOT STORED ANYWHERE.** `cases` has no discovery-level column and a`
   > `  repo-wide grep across `db/` for `discovery_level` / `discovery_control` / `190.3` returns`
   > `  nothing.`

4. **DISCONFIRMATION ATTEMPT.** *Is this a DUPLICATE of `Q-FE5-1`/`Q-FE5-5`?* **No** — those are budget-cap questions
   in the form engine; this is a deadline-period representation question in the deadline engine. They share a RULE
   (190.4(b)(2)) and a missing field, not a question — the `Q-RE-8`/`Q-STAT-5` distinction the hardened audit drew.
   *Is it MOOTED by `deadline-engine-spec.md`?* No: BUILD-STATE calls that spec `(PROPOSED)` and says it `AUTHORIZES
   NOTHING` and `proposes NO column, NO table and NO migration`. **UNVERIFIABLE-HERE:** whether that spec's §9.2
   `Q-DE-1`–`Q-DE-6` restate this question — the spec is not staged; the register's L3 header records those six as
   living only in the spec, `on his ruling`.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence MED.** Annotation substance: *"the same 190.4(b)(2) phase-scoping fact is
   now load-bearing in a second module — `Q-FE5-1`/`Q-FE5-5` (#81) find the Level 3 cap is an order value, not a level
   constant, so `cap = f(level)` is structurally wrong for Level 3 — and `#81` also found the prerequisite: `cases`
   has NO discovery-level column at all. Whatever is ruled here should be ruled once for both."* Why: the row asks how
   to type a Level 3 period while the record shows the case does not yet record its level, which is upstream of the
   answer and is not on the row's face.
6. **FIRST LINE (exact) — occurs exactly once in the register** (`grep -c -x -F` → **1**):

```
- ⬜ **[DL-memo Q5] — Rule 190.4(b)(2) now permits a Level 3 plan to set a period during which *"either all discovery must be conducted or all discovery requests must be sent, for the entire case or an appropriate phase of it."*** Neither the send-by alternative nor phase scoping appears in the 1998 text this project had been working from. That is a different computation **shape**, not merely a different date. **Should the engine model a Level 3 period as a typed choice between complete-by and send-by, with phase scoping, or should Level 3 remain wholly document-derived with no structured representation?** Entered 2026-08-14.
```

### Party-credibility watch (L1282)

1. **QUESTION.** None on its face — `Capture only; no design pass, no ID.` The substance: a fact about a party
   (indictment, credibility damage, evidence mishandling) should raise a flag on **every case where that party
   appears in a testimony-bearing role**.
2. **GREPS RUN.** `Party-credibility` / `party-credibility` → live log **0**, BUILD-STATE **0**, archive **2**
   (L2962 in `#31`, L3176 in `#29`). `attached to people instead of rules` → register **1**, elsewhere **0**.
   Control: `Itemized-bill` → archive **2**, live log **0** (same shape, so the zero is a real zero and not a
   broken matcher). Newest post-audit entries (log L1–600): `credibility` → **0**.
3. **CALL — LIVE, UNCHANGED as a capture; but its substrate was BUILT after the capture was written.**
   `docs/specs/BUILD-STATE.md` L23: `**(1) the CD-1 directory build landed and exercised — COMPLETE 2026-08-19`,
   and L8: `**CD-1 IS COMPLETE — ITEM 7 RAN AND`. The originating capture, `docs/archive/session-log-archive-2026-07-21_2026-08-12.md`
   L3176–L3179, entry `## 2026-07-28 (#29) — CL-2 §5B BUILT, MIGRATED LIVE, AND WALKED: the client dimen`
   (first 80 chars), character-exact:

   > `5. **Party-credibility watch.** A fact about a party (indictment, credibility damage,`
   > `   evidence mishandling) should raise a flag on every case where they appear in a`
   > `   testimony-bearing role — cousin of the registry watch flags, attached to people. Capture`
   > `   only; no design, no ID.`

   **Note on the steering premise.** BUILD-STATE's standing instruction `UNRULED, adopt nothing: `future-modules-capture-2026-07-28.md`.`
   (L164) names a DIFFERENT document. The archive is explicit that this capture is not in it —
   `docs/archive/…` L2961–L2963, entry `## 2026-07-30 (#31) — QUEUE-RUNNER batch: one packet processed (doc routing only, `
   (first 80 chars):

   > `(auto-create client on PI, itemized-bill ingest, party-credibility watch) were **not**`
   > `duplicated from the capture doc's cross-references — they stay canonical in #29.`

   So the "UNRULED, adopt nothing" instruction reaches the QuickBooks/unbuilt-territory capture, not these three
   `#29` rows — which are nonetheless equally unruled on the register's own section header
   (`**PROPOSED and unruled — captured, not built.**`).
4. **DISCONFIRMATION ATTEMPT.** *Did `#29`'s "Parties tab on criminal files — APPROVED" close this?* **No.** That
   approval is of the parties TAB and the cross-case identity MODEL; the archive states the reasoning
   (`if an officer is later charged, lies, or mishandles evidence, his testimony collapses across every case where he
   appears`) but approves a tab, not a flag mechanism. The flag itself appears in no BUILD-STATE feature line.
   *Is it a duplicate of the registry watch flags?* The row itself calls it `a cousin of` them — a stated analogy,
   not an identity.
5. **PROPOSAL — `ANNOTATE-KEEP`, confidence MED.** Annotation substance: *"the substrate this capture presumes now
   exists — CD-1's cross-case party directory is COMPLETE (2026-08-19) — so the capture is now designable rather than
   blocked; and `#29` separately approved the cross-case identity model on Michael's own reasoning about an officer
   whose testimony collapses across cases, which is this capture's rationale in his words."* Why: the row is
   question-less and would otherwise sit forever; naming the now-built substrate is what makes it rulable.
6. **FIRST LINE (exact) — occurs exactly once in the register** (`grep -c -x -F` → **1**):

```
- ⬜ **Party-credibility watch.** A fact about a party (indictment, credibility damage, evidence mishandling) should be able to raise a flag on **every case where that party appears in a testimony-bearing role** — a cousin of the registry watch flags, attached to people instead of rules. Capture only; no design pass, no ID.
```

---

## §C — KEEP ROWS (LIVE, UNCHANGED / DEFERRED-IN-WORDS). One line each; the greps were run.

- **L972 `[Task 7 memo Q1]` — KEEP — Michael's hand — greps run:** `The filing moment is contested, and it is a CANDIDATE` (register **1**, log/BUILD-STATE/archive **0**), `read that section in a clean copy and confirm the sentence` (register **1**, elsewhere **0**), `LR-LOOK-1` (log **4 occurrences**, newest at the FORTIETH queue-runner invocation, 2026-08-15 — none later; BUILD-STATE **1**), control `zzz-nonexistent-control-string-zzz` **0** everywhere. **LIVE, UNCHANGED, premise intact at HEAD:** `docs/specs/BUILD-STATE.md` L126 — `**THE FILING MOMENT IS CONTESTED, NOT SETTLED:**` — and `LR-LOOK-1` has never been run. Disconfirmation attempted: `FC-8` (`#106`) rules the profile's KEY, not the filing moment; no filing module exists.
- **L973 `[Task 7 memo Q2]` — KEEP — Michael's hand — greps run:** `A LIVE PRACTICE ITEM, not a design question, and the fastest-moving` (register **1**, elsewhere **0**), `court-keyed required attachment on the FE-15 render path` (register **1**, elsewhere **0**), `3.O.1` (log **2 occurrences** — one in `#80` itself, one in the thirty-fifth invocation's runner line, both 2026-08-15; BUILD-STATE **1**). **LIVE and still asked in the present tense at HEAD:** `docs/specs/BUILD-STATE.md` L126 — `**LIVE PRACTICE ITEM: Bexar Civil LR 3.O.1 requires an A.I. certificate on ALL pleadings — do your current filings carry it?**` **Flagged for the sheet, not adjudicated: this is a live filing-compliance exposure in Michael's primary civil forum, open since 2026-08-15 and unanswered at HEAD (2026-09-01).**
- **L976 `[Task 7 memo Q5]` — KEEP — registry verification — greps run:** `A CLE qualifier that the rule text does not carry` (register **1**, elsewhere **0**), `recorded as unsupported by the rule text, corrected in the mining doc, or left alone` (register **1**, elsewhere **0**), `mediation` case-insensitive (log **1 occurrence** — an unrelated ch. 1467 hit at L7907; BUILD-STATE **0**; archive **15 occurrences**, all in the PI *mediation-cadence* design pass, a different subject — disconfirmed by a targeted grep rather than by sampling: `9.A` / `9.D` / `45 days` / `30 days before trial` return **one** hit in the whole archive, L5193, an expert-supplementation sentence unrelated to Bexar local rules), `apil-2025` (log **2**, neither about the 45/30 pair), `45 days before trial` **0** everywhere. **LIVE, UNCHANGED.** The mining doc was not edited (the row says so) and no entry answers the 45/30 verification or the CLE qualifier.
- **L987 `OPEN-2 (from AUD-3)` — KEEP — registry verification — greps run:** `OPEN-2` excluding `TC-OPEN-2` (log **4 occurrences**, all 2026-08-15; archive **0**), `AUD-3` (log **5**), `carrier-duties` (log **27**), `22 VERIFIED entry headings deriving from 13 ruled capture bullets` (register **1**, elsewhere **0**), `22 entries (20 ruled units: 13 bullets + 7 entries)` (register **1**, elsewhere **0**). **Expressly reserved to Michael and untouched since:** `docs/record/session-log.md` L7766, entry `## 2026-08-15 — QUEUE-RUNNER batch (runner line; THIRTY-FOURTH invocation) — the` (first 80 chars): `  status.** The count question is **OPEN-2, Michael's.**` Premise re-checked at HEAD: the sixty-second invocation reports `**THE CARRIER-DUTIES COUNT CHECK RAN WITH ITS NAMED COMMAND AND BOTH NUMBERS ARE REPORTED: 22 BEFORE, 22 AFTER.**` (log L3931) — so the header/entry mismatch the row is about **persists**. **UNVERIFIABLE-HERE:** the registry file itself is not staged; I report BUILD-STATE's and the runner's re-derivations, not a first-hand count. **§A3 warning applies to this row: a naive `OPEN-2` grep on the newest entries returns six hits and every one is `TC-OPEN-2`.**
- **L1002 `Q-STAT-4` — KEEP — registry verification — greps run:** `Q-STAT-4` → live log **0**, BUILD-STATE **0**, TOC **0**, archive **0** — **a true zero, with working controls in the same series** (occurrences in the flattened live log: `Q-STAT-1` 13 / `Q-STAT-3` 3 / `Q-STAT-5` 10 / `Q-STAT-6` 16). `TRCP 193 comment 6 as a registry candidate` (register **1**, elsewhere **0**), `the party seeking to avoid discovery has the burden of proving the objection or privilege` (register **1**, elsewhere **0**), `comment 6` **0** in log and BUILD-STATE. **LIVE, UNCHANGED — and this row is the ONLY place in the staged record where this question exists.** The only record acknowledgment is the ID-range pointer at BUILD-STATE L144 (`Q-STAT-2 through Q-STAT-6 stay OPEN`) and L152 (`Q-STAT-2 – Q-STAT-6`), which carry no question text. **See §A2: the 2026-08-24 audit's cite "`Q-STAT-5` (line 1002)" resolves at HEAD to THIS row — closing on that line number destroys the register's only copy of the TRCP 193 comment 6 question.**
- **L1010 `[DL-memo Q1]` — KEEP — registry verification — greps run:** `The 50-day discovery-response extension is FAMILY-CODE-ONLY` (register **1**, elsewhere **0**), `no correction entry is owed` (register **1**, elsewhere **0**), `50-day` (log **7**, BUILD-STATE **2**, archive **0**). **LIVE, and named at HEAD as Michael's own act:** `docs/specs/BUILD-STATE.md` L125 — `The skeleton was NOT edited; resolving it is your verification act.` and `**Five questions, NO durable IDs (ID-DL-1) — all five ARE filed as `[DL-memo Q1]`–`[DL-memo Q5]` and all five still ⬜.**` Disconfirmation attempted: the seventy-second invocation lists `[DL-memo Q1]`–`[DL-memo Q5]` among items `all left open`, and `trcp-deadline-skeleton-2026-03-01.md` is confirmed `not edited` in that batch's DO-NOT check.
- **L1011 `[DL-memo Q2]` — KEEP — registry verification — greps run:** `give different dates to every defendant but the first` (register **1**, elsewhere **0**), `Evidence for V2, not a resolution of it` (register **1**, elsewhere **0**), `99(c)` (log **1** — its own origin at L8339, `NEW TENSION FOUND IN RULE 99(c), evidence for V2 and not a resolution of it`; BUILD-STATE **0**), `194.2(a)` (log **3**, archive **3**). **LIVE.** Cross-link verified rather than assumed: the `V2` residual is still open at register **L35** (`- ⬜ **Residual (V2): what governs "the date the defendant files an answer" in a multi-defendant case with staggered answers?**`). `staggered` returns exactly **2** hits in the register — L35 and L1011 — so the cross-reference resolves and nothing else claims it.
- **L1261 `O4 (transcript sort & route)` — KEEP — T3 / KICK-1 / P1 — greps run:** `O4` word-boundary (log **6 occurrences**, BUILD-STATE **0**, `id-collision-report.md` **13 occurrences**), control `O3` word-boundary (log **3**), `phone→PC sync channel at go-live: OneDrive Shortcut, iCloud folder, or stay-manual?` (register **1**, elsewhere **0**). **DEFERRED, HELD:** `docs/record/session-log.md` L9048, entry `## 2026-08-13 (#66) — RULING RUN: ~20 open queue items ruled one by one (design se` (first 80 chars): `  O4 DEFERRED — the phone→PC channel stays open.` Dependency intact at HEAD — `docs/specs/BUILD-STATE.md` L45: `THE KICKOFF DOC IS STILL GONE (KICK-1)` and `T3 WORK IS UNAUTHORIZED`. **ID hazard recorded:** `id-collision-report.md` §B.2 finds **five** meanings of `O`; the row's own ID-note disambiguates rather than renumbering, and the collision report's cite `line 1260` lands on the **closed** `O3` row at HEAD (§A2).
- **L1280 `Itemized-bill ingest.` — KEEP — Phase 1b GPU — greps run:** `Itemized-bill` case-insensitive (log **1 occurrence** — at L8885, inside `#68`'s own sweep-A finding that generated `OBS-1`, not a ruling; archive **2**; BUILD-STATE **1** as "itemized bills"), `would take insanely too much time` (register **1**, archive **1** at `#29`, log **0**), `check the ARCHIVE project before designing from scratch` (register **1**, elsewhere **0**). **LIVE and named unbuilt at HEAD:** `docs/specs/BUILD-STATE.md` L94 — `Medical has NO PDF/bill ingestion (Phase 1b GPU-gated); no document storage. **Hand-keying itemized bills is a VIABILITY issue** (yours)`. **One limb is an ACT, not a ruling:** the row's own instruction `check the ARCHIVE project before designing from scratch` is Michael's hand — the ARCHIVE project is unreachable from here (**UNVERIFIABLE-HERE**), and the archive log at `#29` records the same instruction (`**Check the ARCHIVE project first** —` / `   Michael recalls prior discussion; a transcript search of this session found none.`, archive L3164–L3165), so it has been outstanding since 2026-07-28.
- **L1281 `OBS-1` — KEEP — Phase 1b GPU — greps run:** `OBS-1` (live log **4 occurrences**, ALL inside entry `#68` — the sweep that created the row — and none a ruling; archive **0**; BUILD-STATE **3**), `Cross-register overlap, not queue duplication` (register **1**, elsewhere **0**). **LIVE and named unruled at HEAD, in BUILD-STATE's own words:** L94 — `**and OBS-1 asks whether that capture row folds into Phase 1b's scope; unruled.**` — and L152 carries `OBS-1` in the still-yours list. The row's own last words are `PROPOSED, unruled. Michael's.` Disconfirmation attempted: a Claude sweep-A observation (`sweep A, 2026-08-13 #68`) is not a ruling, and nothing after `#68` touches it.

---

## §D — SUMMARY

| line | ID | call (step 3) | PROPOSED | confidence | dependency tag | unique-text-destroyed-if-closed? |
|---|---|---|---|---|---|---|
| 972 | `[Task 7 memo Q1]` | LIVE, UNCHANGED | KEEP | HIGH | Michael's hand | Y (register-only in staged evidence; memo §11 = UNVERIFIABLE-HERE) |
| 973 | `[Task 7 memo Q2]` | LIVE, UNCHANGED | KEEP | HIGH | Michael's hand | Y (same caveat) |
| 974 | `[Task 7 memo Q3]` | LIVE; ruled neighbour (FC-8 keyed the layer) | ANNOTATE-KEEP | MED | free-standing | Y (same caveat) |
| 976 | `[Task 7 memo Q5]` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y (same caveat) |
| 987 | `OPEN-2 (from AUD-3)` | DEFERRED / HELD IN MICHAEL'S WORDS | KEEP | HIGH | registry verification | Y — the (a)/(b) wording-and-count question exists nowhere else |
| 1000 | `Q-STAT-2` | WORLD-STATE-STALE figure; QUESTION LIVE | ANNOTATE-KEEP | HIGH | registry verification | Y |
| 1002 | `Q-STAT-4` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | **Y — zero footprint in log, archive, BUILD-STATE and TOC; the row is the only copy** |
| 1003 | `Q-STAT-5` | DEFERRED IN MICHAEL'S CHOICE (#108) + count stale | ANNOTATE-KEEP | HIGH | Q-STAT-5 stack | **Y — hardened audit: a merge destroys C-1…C-20, incl. C-19/C-20's build consequence** |
| 1009 | `ID-DL-1` | LIVE as to the ruling; count WORLD-STATE-STALE | ANNOTATE-KEEP | HIGH | free-standing | Y (partly — per-packet edges are the row's own synthesis) |
| 1010 | `[DL-memo Q1]` | LIVE, UNCHANGED (his verification act) | KEEP | HIGH | registry verification | Y (source spec = UNVERIFIABLE-HERE) |
| 1011 | `[DL-memo Q2]` | LIVE, UNCHANGED | KEEP | HIGH | registry verification | Y (same caveat) |
| 1012 | `[DL-memo Q3]` | WORLD-STATE-STALE ×2; QUESTION LIVE | ANNOTATE-KEEP | HIGH | registry verification | Y |
| 1014 | `[DL-memo Q5]` | LIVE; second consumer + upstream gap | ANNOTATE-KEEP | MED | registry verification | Y (same caveat) |
| 1261 | `O4 (transcript sort & route)` | DEFERRED / HELD IN MICHAEL'S WORDS | KEEP | HIGH | T3 / KICK-1 / P1 | N — the deferral and the question both survive in `transcript-sort-and-route-design.md` §10 and CLAUDE.md per `id-collision-report.md` |
| 1280 | `Itemized-bill ingest.` | LIVE, UNCHANGED (one limb an ACT) | KEEP | HIGH | Phase 1b GPU | N — substance survives verbatim in the archive at `#29` |
| 1281 | `OBS-1` | LIVE, UNCHANGED | KEEP | HIGH | Phase 1b GPU | Y — the overlap framing exists only here (BUILD-STATE carries the ID, not the question) |
| 1282 | `Party-credibility watch.` | LIVE capture; substrate now built | ANNOTATE-KEEP | MED | free-standing | N — survives verbatim in the archive at `#29` |

**17 rows processed. Proposals: CLOSE 0 · CLOSE-SPLIT 0 · ANNOTATE-KEEP 7 · KEEP 10 · RECLASSIFY-ACT 0 ·
MICHAEL-IN-WORDS 0.** No row in this slice carries a ruling that closes it. That is the expected shape for the
wave-2 remainder, and the burden was left on the closure in every case.

---

## §E — UNVERIFIABLE-HERE (what would settle each)

1. **The Task 7 memo's §11** — `docs/specs/bexar-local-rules-and-efiling-2026-08-15.md`. The register block at L970
   says `Text below is verbatim from the memo's §11 per QR-1`, so Q1/Q2/Q3/Q5 probably have a second home. **Settled
   by:** reading that file at HEAD. Until then, "unique text destroyed" is Y **within the staged evidence**.
2. **The DL memo** — `docs/specs/deadline-engine-service-and-response-2026-08-14.md` — and
   **`docs/specs/deadline-engine-spec.md`** (§8's 21a(c) doubt; §9.2's `Q-DE-1`–`Q-DE-6`). **Settled by:** reading both
   at HEAD; §9.2 in particular would show whether `Q-DE-*` restates `[DL-memo Q5]`.
3. **The registry files themselves** — `legal-rule-registry-discovery-and-carrier-duties.md` (OPEN-2's 22-vs-"TWENTY"
   header), `legal-rule-registry-draft-entries-medical-billing.md` (Q-STAT-2's DRAFT-vs-UNVERIFIED mismatch),
   and whether any TRCP 21a or ch. 541/542 entry now exists. **Settled by:** staging the four `legal-rule-registry-*`
   files and counting `**Status:**` lines directly, rather than relying on BUILD-STATE's re-derivations.
4. **`apil-2025-course-book-mining-pass1.md` §1.4** — whether the `[VERIFY]` on the CLE mediation qualifier is still
   there and still unedited (the row asserts the doc was NOT edited). **Settled by:** reading the file at HEAD.
5. **`statute-pass-registry-retrieval-2026-08-14.md` §7** — the C-1…C-20 Insurance candidate list `Q-STAT-5` scopes.
   **Settled by:** reading §7 at HEAD; it is the only place the twenty candidates are enumerated.
6. **The ARCHIVE project** (`Itemized-bill ingest`'s own instruction) and **the project-instructions field**.
   Not reachable from this container at all.
7. **`transcript-sort-and-route-design.md` §10 and `CLAUDE.md`** — the second home for `O4` that makes its
   unique-text answer N. **Settled by:** staging either file.


---

*End of wave-2 evidence file. Opus 5, 2026-09-01, pinned to HEAD `7f02131`. Adjudicates nothing.*
