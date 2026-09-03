# THE CAPACITY PASS — measurements, six rulings, and the operative specification (2026-09-02)

**Canonical repo path:** `docs/specs/capacity-pass-2026-09-02.md`
**Status:** RULED — six rulings by Michael, 2026-09-02 Central, typed design session (Cowork, Fable 5 per the environment), device bridge granted on the checkout and on `Downloads`. §3 is OPERATIVE: the queue runner reads it (v13). §4 records two relocations EXECUTED the same day. Nothing here is a build claim; nothing was built; `FE-D1A-1` is untouched.
**Trigger:** `Q-CAP-5(a)` — the sitting opened at **1,805,992 / 2,000,000 = 90.3%** (Michael's UI: 91%), read directly by the session per the v27 self-executing limb.
**Where the rulings sit:** the six are `CAP-1`–`CAP-5` below (`CAP-3` has a sub-ruling `CAP-3a`). They are recorded here, in the session-log entry that ships with this packet, and — because `CAP-1` through `CAP-4` are binding conventions — in the instructions (v29, drafted the same day; triggers 3 and 4 both fired).
**PF-1:** did NOT fire on this packet — it carries no legal characterization and no proposed registry entry (the QR-6(f)-shaped skip, recorded rather than silent).
**CITE-STABILITY:** cite this file by heading or quoted sentence.

---

## §0 — WHAT THIS IS, IN ONE PARAGRAPH

Michael asked, at 91%: *"Are we close to being done here, or do we really need to think about another solution to the capacity issue?"* The measured answer is that the meter tracks the DESIGN RECORD, not the build; the record has grown about a point a day since 2026-08-22, the day after the restructure; solo go-live is one gate away (gate 9) but the design program runs months past it; and every one-time cleanup so far (2026-07-26, `#107`, the 08-20 exclusions, the 08-21 thin constitution) bought 7–17 points that were consumed within about ten days. `#132`'s own words, 2026-08-21: *"THE THREE RULED MOVES HALVE THE SLOPE, THEY DO NOT FLATTEN IT"* and *"roughly 70% with ~20 days of runway."* The runway ran out early — twelve days in. This pass does three things: it relocates what was already eligible (§4, −8.5 points, executed); it rules a HOME for retired specs and a BIRTH rule for evidence so the inflow itself changes (`CAP-1`, `CAP-2`); and it caps the two synced files that had no cap (`CAP-3`, `CAP-4`).

---

## §1 — MEASUREMENTS (every figure from a command or a platform read, this sitting)

### §1.1 — The unit is now exact, not inferred

The claude.ai project docs API reports an `estimated_token_count` per project document. **When nineteen documents summing to 114,570 of those units were deleted, `knowledge_size` fell by exactly 114,570** (1,805,992 → 1,691,422). The meter is the sum of the platform's own per-document token counts. Consequences: the meter is decomposable file by file without estimation; `#107`'s 3.49 bytes-per-unit was a measurement of *captures* and does not transfer — this sitting's figures are:

| Content | Bytes | Units | B/unit |
|---|---:|---:|---:|
| Synced repo (178 tracked files after the sync excludes), implied by subtraction | 5,375,502 | 1,451,716 | **3.70** |
| All 30 project docs before the pass | 1,130,308 | 354,276 | 3.19 |
| `claude_Queue_Sweep_Evidence_Opus_2026-09-01.md` alone (tables) | 435,976 | 147,253 | 2.96 |
| `probate_knowledge_corpus_manifest.json` alone (JSON) | 141,803 | 54,722 | 2.59 |
| The nineteen relocated captures/handoffs (prose) | 417,740 | 114,570 | 3.65 |

One percentage point is 20,000 units ≈ **74 KB of repo markdown** at 3.70 (the v27 figure of ~69.8 KB was for capture prose and stands for that class).

### §1.2 — The level, decomposed (HEAD `2a85c99`, batch 86; the sync had picked it up)

- **Synced repo: 72.6 points.** `docs/specs/` is **4,762,881 B of the synced set's 5,375,502 B — 88.6%.** The largest files: `attorney-review-queue.md` 661,346 · `REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` 249,633 · `pi-case-playbooks.md` 227,273 · `BUILD-STATE.md` 142,777 · `fe-d1-amendment-slice.md` 141,468 · `session-log-head.md` 109,485.
- **Sixty-five date-stamped `docs/specs/` files from 2026-08-18 or earlier: 1,674,125 B ≈ 31% of the synced bytes ≈ 22.6 points.** By filename class alone, roughly sixty files / ~1.55 MB are audits, research memos, mining passes, adjudication records, walkthrough captures and entry drafts — the evidence class `CAP-2` addresses at birth and `CAP-1` addresses in arrears.
- **The review queue by row class (leading-marker method, the register's own):** ✅ rows **147,607 B (22.3%)**; ⬜ rows 317,852 B (48.1%); 🟡 rows 1,462 B; non-row prose 194,425 B (29.4%), of which the **Status header paragraph alone is 74,288 B carrying sixty-seven reconcile sentences — the first "Reconciled to…" and sixty-six "Reconciled again…"** — one per batch since July, none ever removed.
- **Project docs: 17.7 points before the pass** (thirty files), **12.0 after the nineteen left**, **9.2 after the manifest left** (the meter read 1,636,700 = 81.8% directly) — of which the wave-2 sweep doc is 7.4 and clears itself at batch 87 (§4.3).

### §1.3 — The trajectory, and what it says

72.6% (2026-08-22, after the TC-4 exclusion) → 77.6% (08-31, RC-1 close) → 79.3% (08-31 late open) → 82.9% (09-01 noon) → **90.3% (09-02 open)**. 17.7 points in eleven days. Netting out the one 436 KB working document, the structural rate is about **a point a day**, exactly the halved slope `#132` predicted. Two-thirds of the last two days' jump was one spent-when-shipped working note; the rest was batches 85–86's new specs and edits (the amendment slice 141 KB, the REQ-CAPTURE's third edition +63 KB, five new research/adjudication files ~180 KB, net of the head file shrinking 32 KB and the register's own growth). **The build is not the driver. The record is.**

### §1.4 — The horizon (BUILD-STATE at HEAD, read in full)

`GL-1`'s floor is one item — gate 9 — and go-live means hand-entered core data, nothing more. Still ahead of the DESIGN side: the disclosures build (`FE-D1A-1` OPEN, `MIG-1` unrun), the CC-1 hands-on sitting (twenty-one accepted plus fourteen proposed), `H12-v` and the BAA, 364 open register rows that the wave-2 sweep found genuinely open (zero of 247 closable), T3 transcription (unauthorized), gates 7–8 (deferred past go-live), the multi-user phase. Months. **"Close to done" does not rescue the meter because the meter does not measure the build.**

---

## §2 — THE SIX RULINGS (Michael's picks verbatim from the option sets put; the option texts are Claude's and are never quoted as his)

Put one at a time, CC-1(a) form, each with its recommendation stated and the alternatives named.

| ID | Question put | Michael's pick, verbatim | What it settles |
|---|---|---|---|
| **CAP-1** | Where does a retired spec go? (`TC-OPEN-2` limb (1), unruled since 2026-08-25) | **"(A) docs/record/specs/ + pointer stub (Recommended)"** | The HOME. A retired spec moves to `docs/record/specs/<same filename>` by `git mv`; a three-line pointer stub stays at the old path. WHICH files retire remains a ruling per file — the survey's own words. §3.1. |
| **CAP-2** | What is born unsynced? | **"(A) Class rule: evidence is born in docs/record/ (Recommended)"** | Evidence-class documents are born in `docs/record/<slug>-<date>/`†; the synced side gets the ruling sheet, the spec edit, the queue rows and a path cite. The packet's routing table names the class per row. §3.2. |
| **CAP-3** | The review queue's shape (the `TC-1` deferral) | **"(A) Closed rows out + header keeps only its current sentence (Recommended)"** | ✅ rows move, text intact, to a repo-only closed register; the synced file carries ⬜ and 🟡 only (plus flagged ✅ parents with open children — `CAP-OPEN-2`); the Status header keeps the CURRENT reconcile sentence and its predecessors move to the closed register's head. Runner v13. §3.3. |
| **CAP-3a** | The queue's Convention line — repaired in this packet, or left as an unrouted act? | **"Repair it in this packet (Recommended)"** | The line gains a routing row; the three-marker convention is documented in the file that uses it. §3.5. |
| **CAP-4** | BUILD-STATE's cap (the other half of `TC-1`) | **"(A) 100 KB byte ceiling + shortfall named in the banner (Recommended)"** | A 100,000-byte ceiling alongside the 150 non-blank line cap; what does not fit is displaced into that batch's runner line and the banner names it. Runner v13. §3.4. |
| **CAP-5** | The probate corpus manifest JSON (2.7 points) | **"(A) Relocate it beside the corpus (Recommended, lightly)"** | Executed the same day (§4.2). `probate_system_prompt.md` and the README stay; the probate INDEX SET is now two files. |

Two directions that are not rulings but shaped the acts: the TRANSIT destination for the nineteen — *"My machine, but I would like you to automatically save it to my machine if possible so I don't have to move it"* — and the `RF-2` caveat — *"No — relocate them; RF-2 stays open on its own (Recommended)"* — the master-skeleton routing row does not block the three pairs that carried it.

**Reasons as put in the option text (Claude's), adopted by the pick — recorded because a build session will otherwise "improve" a ruling into something already rejected:** `CAP-1` (A) over a new `docs/retired/` because the instructions already define `docs/record/` as a RULE — *"anything that later outgrows the sync belongs in it rather than in a new one-off exclusion"* — and a second excluded directory is a second thing to remember plus a picker act in the TC-4 order. `CAP-2` (A) over a size rule because size is blunt in both directions (a 60 KB living spec belongs in the sync; a 20 KB audit does not) and over no rule because a per-file retirement ruling is CC-1(c)'s drawer in a fourth costume. `CAP-3` (A) over closed-rows-only because the header is 74 KB and grows a sentence a batch by design. `CAP-4` (A) because the head file already proved the shape: a byte ceiling with the shortfall named.

---

## §3 — SPECIFICATION (OPERATIVE — the runner reads this; where a runner summary and this section disagree, THIS SECTION GOVERNS)

> **Items marked † are Claude's operative defaults implementing the rulings — the mechanics a ruling needs to run — not Michael's words. Each is his to strike or reword; none changes what he ruled.**

### §3.1 — `CAP-1`: the retired-spec home

1. **Path.** A retired `docs/specs/<name>.md` moves to **`docs/record/specs/<name>.md`** — same filename, by `git mv`, so history follows. `docs/record/` is already excluded from the design-side sync (TC-4); no picker act is needed.
2. **Stub.†** A file remains at the old path, **exactly three lines** (LF; no other content):
   ```
   > RETIRED <YYYY-MM-DD> (<ruling cite>) → docs/record/specs/<name>.md — bridge-reachable, not synced.
   > This stub exists so existing cites resolve. Read the file at its new path; do not restore it here.
   > Status at retirement: <the file's own status line, verbatim>.
   ```
   The stub costs ~250 bytes; a hundred stubs cost less than one research memo.
3. **What "retired" requires.** A RULING by Michael naming the file — a survey row is a candidate, never a ruling (the 08-25 survey's own banner). The 08-25 candidate table (`superseded-specs-candidates-2026-08-25.md` §4) is the starting list for the sweep, which is `TC-OPEN-2` limb (2) and is NOT executed by this packet.
4. **The runner's act†** (v13, Step 3): a packet's routing row with Action **`RETIRE`** and a ruling cite → `git mv` + stub, then verify: the file exists at the new path with its pre-move sha256; the stub is exactly three lines; `git diff --cached -M --name-status` shows the rename (`R100`). A `RETIRE` row without a ruling cite is a `QR-6(e)` act — skipped and reported.
5. **Naming caution unchanged.** `docs/record/` is live-but-unsynced; `docs/archive/` is CLOSED; the LEGAL AUTHORITY ARCHIVE project is a third thing. A retired spec is retired by its own status line, not by its directory; the directory only says "not synced."

### §3.2 — `CAP-2`: the born-unsynced class rule

1. **Two classes, named per routing row.** Every packet routing table gains a column **CLASS** with two values:
   - **`RULING`** — carries PROPOSED or RULED design: specs, build slices, REQ-CAPTUREs, registries and registry entries, prompts in force, the adjudication SHEET Michael rules from, the queue, BUILD-STATE, the head file. Born in `docs/specs/` (or its existing canonical home). Synced.
   - **`EVIDENCE`** — exists to support a ruling: audit and verifier reports, sweep evidence, research memos and fetch records, mining passes, walkthrough captures, entry-draft staging, and an adjudication RECORD once its rulings are folded into a `RULING`-class file. Born in **`docs/record/<slug>-<YYYY-MM-DD>/`**† (a directory per pass) or `docs/record/<name>.md` (a single file). Bridge-reachable, unsynced.
2. **The packet author names the class; the runner never decides it.** Rows that place no file in the repo — the manifest itself, the session-log entry, the queue-merge acts, project-knowledge files, the instructions field — carry `—` and are outside this rule. A row that places a file and carries no CLASS is a `QR-6(e)` act — skipped and reported — for the first two batches after v13; thereafter the runner STOPS on it.†
3. **The synced side always gets enough to rule from.** A `RULING`-class file that rests on `EVIDENCE` cites it by path. Queue rows carry full question text (QR-1, unchanged). Nothing a ruling needs is ever only in `docs/record/`.
4. **Precedent, so the rule is read as continuity:** batch 86 routed the thirteen cleanup annexes (703,568 B) to `docs/record/queue-cleanup-evidence-2026-09-01/` and the 44 KB sheet to `docs/specs/` — flagged for Michael's veto, not vetoed. That is this rule, executed once before it was written.
5. **Exception, stated so it is not argued later†:** a document Michael will RULE FROM is `RULING`-class even when most of its bytes are evidence — the cleanup sheet, a REQ-CAPTURE with rulings folded in. The test is "does he read this to decide," not "how much of it is quotation."

### §3.3 — `CAP-3`: the closed register and the header

1. **Two files.** `docs/specs/attorney-review-queue.md` (synced) carries **⬜ and 🟡 rows only**, plus any top-level ✅ parent held with an indented open child (eleven at the split — `CAP-OPEN-2`). **`docs/record/attorney-review-queue-closed.md`** (repo-only, bridge-reachable, append-only) carries every ✅ row, text intact, under the same section headings the row sat under in the register.
2. **The move act (runner v13, Step 4 item 2, third act).** When the runner flips a row to ✅ — the closure sentence appended, quoting the ruling cite, per the `SK-v2` / `RECON-1` shape — the whole ROW BLOCK (the marker line plus any indented continuation lines beneath it) moves to the closed register under its section heading, creating the heading there if absent. Row text is never edited in the move.
3. **Edge cases, decided here† so the script never decides them.** An indented ✅ sub-row beneath an open (⬜/🟡) parent STAYS with its parent — it is part of the parent's block. A top-level ✅ row that has an indented open child beneath it is **FLAGGED and NOT moved** — reported to Michael by ID. A ✅ row referenced by an open row's text moves anyway; the cite is by ID and the ID is in the closed register.
4. **The header.** The synced file's Status paragraph carries its intro sentences and **the CURRENT "Reconciled again to session-log #NN on <date>" sentence only** (QR-6(b) is unchanged: that sentence is still written every batch). When the runner writes the new current sentence, the one it supersedes is appended to the **RECONCILE HISTORY** block at the head of the closed register. The history is never deleted, only moved.
5. **Counts.†** BUILD-STATE reports ⬜ and 🟡 from the synced file, and ✅ from the closed register plus the flagged ✅ parents that remain in the synced file (item 3), with the method named (leading-marker, `^\s*- (⬜|✅|🟡)`), and states both file sizes. The honest open figure stays "⬜ or open-in-substance including 🟡," as before.
6. **The one-time split** is this packet's Step 3 act — `split-review-queue.py`, shipped in the packet, run against the working tree at HEAD, verifying before it writes: bytes conserved (live-after + moved = live-before, exactly — it adds nothing to the synced file), row counts conserved (⬜/✅/🟡 before = ⬜/🟡 live-after + ✅ closed-after), and every flagged edge case listed. It prints the verification and refuses to write on any mismatch.
7. **Cites.** Both files are cited by heading or quoted sentence (the register is rewritten by every merge; CITE-STABILITY applies).

### §3.4 — `CAP-4`: BUILD-STATE's byte ceiling

1. **100,000 bytes, working-tree read**† (`wc -c`, never `git show`, per the batch-86 CR finding), measured after the rewrite and before the commit — alongside the 150 non-blank line cap, which stands.
2. **Over the ceiling → DISPLACE.** Cut detail, never sections; what is cut is written into that batch's runner line under a heading **`DISPLACED FROM BUILD-STATE (CAP-4)`**, verbatim, so nothing is lost from the record.
3. **The banner names the shortfall** the way the head file's does: bytes before displacement, bytes after, and which paragraphs were displaced. A BUILD-STATE under the ceiling says so in one clause.
4. **Rationale carried:** the runner says the line cap exists "for READABILITY, not token cost"; the byte ceiling is the token-cost half, and the file's own history (6.35× at a constant 150 lines) is the exhibit.

### §3.5 — `CAP-3a`: the Convention line

Replace the register's line **`**Convention:** ✅ = closed (2026-07-26 unless a later date is stated) · ⬜ = open. Each open item carries **the actual question in bold**.`** with:

> **Convention:** ⬜ = open · 🟡 = ruled-but-execution-pending, or awaiting Michael's confirmation · ✅ = closed (dated in the closure sentence; 2026-07-26 where none is stated). Each open item carries **the actual question in bold**. **Since 2026-09-02 (`CAP-3`): this file carries ⬜ and 🟡 rows only — plus any top-level ✅ parent held here because an indented open child sits beneath it (eleven at the split; `CAP-OPEN-2`) — and every other ✅ row lives, text intact, in `docs/record/attorney-review-queue-closed.md` — repo-only, bridge-reachable, append-only — under the same section heading, and the Status paragraph above carries only the CURRENT reconcile sentence, its predecessors living at the closed register's head.** A row is counted by its LEADING marker (`^\s*- (⬜|✅|🟡)`); an indented sub-row belongs to the row above it.

---

## §4 — THE RELOCATIONS EXECUTED THIS SITTING (the record; nothing here is owed)

### §4.1 — TRANSIT step 1–3, nineteen files

Method: a zip built in Michael's own Chrome from the project docs API (the content the platform serves, byte-exact, no model transcription), STORE-method with a `MANIFEST.json` and `MANIFEST.md` carrying each file's bytes, sha256, uuid and token count; downloaded to `Downloads\`; verified over the bridge (zip sha256 and every entry against the manifest); deleted from project knowledge on Michael's word.

- **Zip:** `brennan-case-manager_transit-captures_2026-09-02.zip` — 431,475 B — sha256 `e57a75d03896f7eb8b12e3565d60a63ae6dfc9c957f8d8a0802a279eb66db0d8` — 21 entries (19 docs + 2 manifests). **Destination: Michael's machine, `C:\Users\Brennan\Downloads\`** (his choice, per relocation).
- **The nineteen:** the six 2026-08-21/22 capture+handoff pairs (`#128`, `#129`, `#130`, `#131`, `#135`, `#136`); the RC-1 pair (`#139`); the amendment-slice pair (`#140`); the DRAFT REQ-CAPTURE (spent — its content reached the repo file through three fold-ins); the voice-walkthrough PROMPT (spent); and the 09-01 TRANSIT worknote (spent, deleted in the same pass per its own face). Two-condition check re-run at HEAD `2a85c99` before moving: every entry present in the live log; every routed document at its path; the master-skeleton row (`RF-2`) ruled non-blocking.
- **Meter:** 1,805,992 → **1,691,422 (84.6%)**; the delta is the manifest's token sum to the unit (§1.1).
- **Stayed, and why:** the `#137` Voice2 pair — its FO/BR/DA requirement sets have no design-doc home (flagged, not relocatable); the acquisition list (a live working document); **the form-corpus capture — by ruling `TC-9` (`#132`), because its two deliverables were handed over in chat only**; the three carried files and the probate index set.

### §4.2 — `CAP-5`, the manifest

`brennan-case-manager_probate-manifest-relocation_2026-09-02.zip` — 142,716 B — sha256 `3e22e135986375568eb7863fcf809c1a27d3f7fe8972d0dfb0f871c41f37f467` — `probate_knowledge_corpus_manifest.json` 141,803 B, sha256 `9ef2bc6b4f1ac0c90cd835957dbf16e0236036e0bacfa1b2bfe0e10c4e464ae3`, plus `MANIFEST.json`. Same destination. Deleted from project knowledge on Michael's word; the meter then read **1,636,700 (81.8%)**, the manifest's units to the unit. (A script-triggered download worked on a fresh tab's first attempt, twice; a second in the same tab was swallowed silently — "Allow" did not rescue it and neither did reloading — until a visible button injected on the page was clicked by Michael's hand. Hand him a button, or use a fresh tab per zip.)

### §4.3 — What clears itself next

`claude_Queue_Sweep_Evidence_Opus_2026-09-01.md` — **147,253 units, 7.4 points** — is SPENT the moment batch 87 lands `push-to-code_queue-cleanup-wave2-supplement_2026-09-01.zip` (in `inbox/` at 155,327 B, mtime 2026-09-01 17:22 Central, pinned by batch 86 and left unrun). The next design session with the bridge verifies the supplement's content at HEAD and deletes the doc. Projected meter after that: **~74%**, with the inflow rules changed.

### §4.4 — Two corrections to the 09-01 worknote (it is deleted; the corrections live here and in the log)

- *What was asserted:* the form-corpus capture was "PROBABLY ELIGIBLE — verify its routing table before moving." *What is true instead:* it stays by ruling `TC-9` (`#132`: *"the form-corpus capture per TC-9"*, kept because *"if they were not saved they exist nowhere"*); the decisive check was the ruling, not the routing table. *Actor:* Fable 5 (the 09-01 late sitting). *Failure class:* the consistent-signal class (`#133`'s note) — a routing-table check where a ruling already answered. *What changed:* the file stays; nothing moved wrongly.
- *What was asserted:* "SIXTEEN files eligible now." *What is true instead:* the worknote's own table lists eighteen — the amendment-slice pair was added at re-verification without bumping the count. *Actor:* Fable 5. *Failure class:* a count stated without saying what it excluded (the v28 operational note's third instance — lines, entries, now files). *What changed:* eighteen relocated plus the worknote itself.

---

## §5 — WHAT THIS PACKET DOES NOT DO, AND WHAT IS OWED

- **No spec is retired here.** `CAP-1` settles where; `TC-OPEN-2` limb (2) — which — remains Michael's per file, from the 08-25 candidate table.
- **No `EVIDENCE`-class file already in `docs/specs/` moves by this packet.** `CAP-2` is a birth rule; existing files move only under `CAP-1`'s per-file rulings.
- **The one-time queue split runs in THIS batch** (§3.3 item 6). If the script refuses on a mismatch, the runner STOPS and reports; nothing is written by hand.
- **The instructions:** triggers 3 (four conventions added) and 4 (the working set changed: nineteen captures and the manifest left; the probate index set is two files) fired — **v29 was drafted the same day and delivered to Michael for pasting**; whether it is pasted is not observable from the repo and is stated here as a delivery, not a fact.
- **The runner:** v12 → v13 by this packet's exact-string work orders; the four v13 acts are §3.1 item 4, §3.2 items 1–2, §3.3 items 2–5, and §3.4.
- **`Q-CAP-5(c)`** — capacity re-measured at every trigger-7 monthly review — stands; this file's §1 is the September measurement.
