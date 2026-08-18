# Session-Log Table of Contents

**Status: FINDING AID — PROPOSED.** This document corrects nothing, rules nothing, and asserts
nothing about build status. It is an index to `docs/specs/session-log.md`, nothing more. Where the
log and this index disagree, **the log is right and this file is stale** — regenerate it.

**REGENERATE, DO NOT APPEND.** The session log is append-only and new entries land at the TOP.
This index is therefore rebuilt in full from the log each time it is refreshed; adding rows to an
existing copy will silently drift. Canonical path is stable and unversioned for exactly that reason.

- **Canonical repo path (PROPOSED):** `docs/specs/session-log-toc.md`
- **Generated:** 2026-08-17 (Central, per DT-1) — **FOURTH EDITION**, regenerated from the third
  (2026-08-17, the fifty-fifth invocation) in the very next batch, so it never went stale at all
- **Produced by:** the QUEUE-RUNNER's **fifty-sixth invocation**, Claude Code session, Opus 5, on
  mdb-pllc — the **second** firing of the `TOC-4` obligation, and the first one where the index was
  already current when the batch began. Regeneration is a Step 4 item 1 act, so the index rides the
  same commit as the entries it indexes instead of going stale the moment they land.
- **DT-1 note, because this edition had to work for its own date.** This session's Bash shell
  reports **GMT and silently ignores `TZ`** (`TZ=America/Chicago date` → `2026-08-18 03:45 GMT`,
  identical to `date -u`). The date above comes from the machine's own wall clock read through
  PowerShell — `2026-08-17 22:45:33 −05:00`, `Central Standard Time`. **A bare `date` would have
  stamped this file 2026-08-18**, which is the exact drift `#101` rules on.

## Basis of this read

| | |
|---|---|
| Checkout | `C:\Users\Brennan\brennan-case-manager`, branch `master` |
| Read FROM commit | `d30f2ab` — **but this index DESCRIBES the log as this batch commits it**, so the batch's own commit is where every row verifies, not `d30f2ab`. The runner line and the `#102`/`#101` entries were all written BEFORE this file was generated, precisely so the index could contain its own rows |
| `origin/master` at read time | `d30f2ab`, confirmed by a live `git fetch` + `git ls-remote origin master` — 0 ahead / 0 behind |
| Working tree | clean at `d30f2ab` before this batch's edits |
| `inbox/` | one packet at Step 1 — `push-to-code_chat-dispatch-v4-chain_2026-08-17.zip`, identity pinned per QR-6(c) |
| Source file | `docs/specs/session-log.md`, 1,035,741 bytes, **10,675 raw / 9,375 non-blank lines** |

**METHOD — read this before trusting a row, because the parts of this file rest on different
evidence.** The first edition (`#91`) built its 190 rows from a **full-text read of every entry**.
Each edition since has added rows for the new entries and **proved the older rows could not have
changed** by a byte-for-byte comparison of the log blob at the prior edition's basis commit against
the log as the current batch writes it. This edition does that again against the third edition's
basis: `git show d30f2ab:docs/specs/session-log.md` was compared with the log as written, and **the
211 prior entries' text is byte-identical — the old body below the preamble (1,003,416 bytes) is an
exact SUFFIX of the new body, with 29,554 bytes carrying exactly three new `## ` headings inserted
above it.** The log has been **purely prepended**, so those 211 rows describe entries that have not
moved a byte and are carried on that evidence rather than on trust.

**AND THIS TIME THE PREAMBLE IS BYTE-IDENTICAL TOO** — `head -18` of the log at `d30f2ab` and at
HEAD compare equal, all 2,771 bytes. The third edition had to report a 292-byte preamble growth
(the `TOC-6` bullet, an ordered edit); this batch touched no preamble line, so the byte-proof covers
the whole file below its own three new entries.

**The three new rows were written from each new entry's heading and its bolded bullet lead-ins —
NOT from a complete reading of every line of all three.** In this log the heading is written as the
entry's own thesis, so the summaries are drawn from what each entry says about itself; a reader who
needs a load-bearing detail must still open the entry. **The ID, date, type and ordering columns for
all 214 rows are mechanical and were re-derived in full this refresh.**

**ONE CARRIED ROW WAS EDITED, AND IT IS NAMED RATHER THAN SLIPPED IN:** `#100`'s
*Corrections received* cell goes from `—` to `received ← #101`, because `#101` is a correction entry
whose whole subject is `#100`'s date stamp. Recording only the issuing half would leave the index
saying `#100` received nothing. **No other carried row's text was changed.**

## How to read the ID column

The log carries **two independent numbering systems**, and neither covers every entry:

- **`#nn`** — design and Code session entries. The series as written runs **#2 – #102**.
  **RULED 2026-08-18 (`TOC-6`): the `#nn` series is DESIGN-ONLY.** Code sessions never mint one —
  runner batches carry runner ordinals and other Code entries stay unnumbered — which is why the
  C-2 row below keeps its `—`, why the third edition took no number, and why this edition, also a
  Code session, did not take `#103`.
- **`runner nn`** — QUEUE-RUNNER batch lines, numbered by *invocation ordinal* ("FIFTY-SIXTH
  invocation"), counted separately from `#nn`. Runs **5 – 56**.
- **`—`** — entries carrying neither. Mostly the pre-numbering era (2026-07-21 → 2026-07-26),
  plus one micro-entry, one test packet, one unnumbered runner line, and the C-2 Code session that
  generated the second edition of this file.

Eight QUEUE-RUNNER batches carry a `#nn` **instead of** an ordinal (#6, #7, #10, #14, #31, #33,
#35, #36) — they are indexed under their number and named as runner batches in the Type column.
**Re-derived this refresh rather than carried: 61 headings name a QUEUE-RUNNER batch, 8 of them
carry an own `#nn`, leaving 53** — which is the 52 ordinals plus the one unnumbered runner line.

**No source line numbers are given, deliberately.** New entries are prepended, so every line number
in the file shifts on every append; a line-anchored index would be wrong the day after it was built.
Search the log by the ID or the date instead.

## Coverage — what was mechanically verified

- **214 entries indexed — one row per `## ` heading in the file. No entry skipped.**
- Numbered entries: **101**, range **#2–#102**, **no gaps except #1**, no duplicates.
- Runner ordinals: **52**, range **5–56**, **no gaps, no duplicates**.
- One QUEUE-RUNNER line carries no ordinal; unnumbered legacy/other entries: **60**, which includes
  the second edition's own C-2 entry.
- **101 + 52 + 1 + 60 = 214.** The buckets are stated so they add up on their face.
- **EVERY BUCKET RECONCILES AGAINST THE THIRD EDITION, which is the strongest available check on a
  mechanical re-derivation.** The third edition recorded 99 numbered, 51 ordinals, 1 unnumbered
  runner, 60 other = 211. The three new log entries are **2 numbered (`#101`, `#102`) and 1 runner
  line (56)**; both legacy buckets are unmoved. Nothing else shifted.
- **THE DERIVATION DEFECT THE THIRD EDITION RECORDED WAS RE-ENCOUNTERED AND RE-AVOIDED, AND A
  SECOND ONE FOUND.** `#30`'s heading writes its ID as `— #30`, not `(#30)`, so the extraction
  pattern must accept both — carried from the third edition and confirmed live. **New this refresh:
  a bare `#[0-9]+` scan over the headings returns 102 "numbered" entries including a phantom `#1`
  and nine duplicates**, because headings routinely mention OTHER entries' numbers in their own
  text. The count must anchor on the ID position — the token immediately after the date — not on
  the presence of a `#nn` anywhere in the line. **The published figures come from the anchored
  pass.**
- **NO NEW OUT-OF-ORDER DATE WAS INTRODUCED.** All three new entries are dated 2026-08-17 and sit
  above the fifty-fifth runner line's 2026-08-17, so the `TOC-1`/`TOC-2` figure is untouched by this
  batch. `#101` separately rules that the one inversion the fifty-fifth *did* record — its
  2026-08-17 line above `#100`'s 2026-08-18 heading — **is an artifact of a container clock rather
  than a genuine out-of-order date**, and expressly leaves every index row and count alone. Whether
  the index should distinguish an artifact from a real instance is **Michael's, and is raised in
  `#101` rather than decided here.**

## The index

Newest first, matching the log's own order.

| # | Date | Type | Summary | Corrections issued / received |
|---|---|---|---|---|
| `runner 56` | 2026-08-17 | QUEUE-RUNNER runner line | Five research documents landed byte-identical and twenty-six questions entered with nothing closed; the runner computes its own date after finding that this shell's `date` reports GMT and would have stamped the DT-1 drift `#101` had just ruled on. | issues → the backlog count's file basis (document) |
| `#102` | 2026-08-17 | design session, Opus 5, Cowork | CHAT-DISPATCH v4 executed T-32 and T-27 through T-31 in one pass: the WS-3 authority gap closed by two located opinions, LaPorte found half-overruled, V-9's cannot-identify floor fired four times, and the ruled fourth `privilege_tier` value found not mutually exclusive with the other three. | issues → BUILD-STATE's "v21 IS IN FORCE" row (document); issues → BUILD-STATE's WS-3 "no Texas authority located" line (document) |
| `#101` | 2026-08-17 | design session, Opus 5, Cowork | Correction entry in the six-field form: `#100` and the fifteen tracked files carrying its stamp are dated 2026-08-18 but the session ran the evening of 2026-08-17 Central — stamps deliberately left alone, the first recurrence of DT-1 drift since DT-1 became binding, and the check has no enforcement point. | issues → #100 |
| `runner 55` | 2026-08-17 | QUEUE-RUNNER runner line | Twenty-four rulings from one adjudication executed as a docs-only batch: one registry Status line moves BACKWARD when a rewording detaches its verification, and the index-regeneration obligation the batch wrote into the runner fires in the same batch. | issues → #100's "earlier five" figure (document); issues → §0.1's verbatim-carried PROPOSED-era language (document) |
| `#100` | 2026-08-18 | design session, Fable 5, Cowork | Fable adjudication with Michael live throughout: 24 items put, 24 ruled, zero deferrals — V-9 amends the binding majority-opinion rule, RL-1 detaches a verification, six new registry entries ruled, all four §C additions adopted. | received ← #101 |
| `runner 54` | 2026-08-17 | QUEUE-RUNNER runner line | Five staged documents landed byte-identical and nothing else touched; the one ordinal the packet expressly ordered checked was the one thing the packet had wrong. | issues → #99 |
| `#99` | 2026-08-17 | design session, Opus 5, Cowork | CHAT-DISPATCH v3 tasks T-20 through T-25 executed in one pass: the Westlaw pulls landed, three of the five blockers the worklist called unclearable moved, and the dispatch's own opening premise proved wrong in the favourable direction. | issues → the CHAT-DISPATCH v3 summary's hazard count (document) |
| `—` | 2026-08-17 | Code session, Opus 5, Claude Code | This regeneration: the index rebuilt at 207 entries on byte-proof that the log has been purely prepended since `a5a95a97`, staleness re-derived to sixteen rather than incremented, and no `#nn` minted for the entry itself (`TOC-6`). | issues → the carried staleness figure (document) |
| `runner 53` | 2026-08-17 | QUEUE-RUNNER runner line | Executes the Task 19 sign-off walk: 24 registry Status lines move to VERIFIED on Michael's recorded word, five ROUTE-C wordings execute and stay unverified, and #73's `V-4` cross-reference limb is found never executed while its row is being closed. | issues → #73 |
| `#98` | 2026-08-17 | design session, Fable 5, Cowork | Task 19 sign-off walk executed item by item with Michael live: 24 of 40 entries verified, five ROUTE-C wordings adopted, five directed edits, six housekeeping rulings; `OPEN-4` and `Q1` closed. | issues → the *Park Cities Bank* pinpoint (document) |
| `runner 52` | 2026-08-17 | QUEUE-RUNNER runner line | A second multi-agent preflight finds two arithmetic errors inside the staged worklist itself and both are left standing because the packet ordered it verbatim; a carried BUILD-STATE count is re-derived and found wrong at its own prior refresh. | issues → #97; issues → BUILD-STATE's carried TOC figure (document) |
| `#97` | 2026-08-17 | design session, Opus 5, Cowork | Task A found already executed and stopped on its own gate; Michael elected prep-only on Task B, so the walk's staging worklist was built against all forty entries and nothing was verified. | — |
| `runner 51` | 2026-08-17 | QUEUE-RUNNER runner line | A multi-agent preflight run before any file was touched finds a rewritten citation flag inside an act ruled to be a verbatim split; executes V-5, V-6 and V-7 under eleven separate rulings. | issues → #96; issues → the queue's `V-EXEC` row (document) |
| `#96` | 2026-08-16 | design session, Opus 5, Cowork | V-EXEC executed in part: the three two-case entries split into six, cross-referenced and never merged, backlog 37 → 40; the split's ID scheme routed as a packet-added choice rather than assumed. | issues → the queue's stale `34 → 37` figure (document) |
| `runner 50` | 2026-08-16 | QUEUE-RUNNER runner line | Executes six registry wordings under the route it is simultaneously making standing law, and finds that three of the packet's four directed closures had no row to close. | issues → #95 |
| `#95` | 2026-08-16 | design session, Opus 5, Cowork | Wording adjudication: execute-then-verify ruled for Task 19, six registry wordings adopted each staying unverified, Reading A's scope expressly deferred, and route (c) ruled standing law → v21. | — |
| `runner 49` | 2026-08-16 | QUEUE-RUNNER runner line | Amends the runner under the ruling it is landing (v8 → v9) and finds one of the six limbs landed only half while a seventh disposition had no target at all. | issues → #94 |
| `#94` | 2026-08-16 | design session (Fable run) | QR-6(a)–(f) all ruled in, taking the runner to v9; Q-COM-11 ruled (A) so both `privilege_tier` columns lose their default; the registry gains its first work-product propositions; cite-stability ruled. | — |
| `runner 48` | 2026-08-16 | QUEUE-RUNNER runner line | The Step 0 ahead-stop fires for the first time since it was written and is right — the forty-seventh's close-out had failed at the push — and an entry citing BUILD-STATE by line number seven times is correct today and stale by batch end. | issues → forty-seventh invocation runner line; issues → #92 |
| `#93` | 2026-08-16 | design session, Opus 5, Cowork | Task 19 attempted and not completed: a redundant retrieval pass withdrawn under correction, and the finding that governs the task — Task 19 as written would verify ten entries against wording already ruled to change. | issues → self; issues → forty-seventh invocation runner line |
| `runner 47` | 2026-08-16 | QUEUE-RUNNER runner line | The packet's headline question is its own third recording and already carries a live ID; the entry reporting a stale version number states a version state the record expressly declines to assert. Close-out interrupted at the push. | issues → #92; received ← #93; received ← forty-eighth invocation runner line |
| `#92` | 2026-08-16 | design session, Opus 5, Cowork | The go-live runbook: three places where reading a gate ALONE gives the wrong answer, and a GL-1 floor item naming an instructions version five revisions stale. No status column, deliberately. | received ← forty-seventh invocation runner line; received ← forty-eighth invocation runner line |
| `runner 46` | 2026-08-16 | QUEUE-RUNNER runner line | The fetch the packet named as its own decisive check answers it YES on both limbs, and every figure the index states about its source file survives independent re-derivation. | — |
| `#91` | 2026-08-16 | design session, Opus 5, Cowork | This index's first edition: the log runs 190 entries under TWO numbering systems no single reader was tracking, no entry anywhere carries `#1`, and five dates sit out of newest-first order. | issues → self |
| `runner 45` | 2026-08-16 | QUEUE-RUNNER runner line | Confirms the `rm -f inbox/*` allowlist suppressed the deletion prompt (QR-5(b)'s first live test), observes the stale `.git/index.lock` cause — the mount denies `unlink` — and flags a false HK-7 annotation claim. | — |
| `#90` | 2026-08-16 | design session, Opus 5, Cowork | T3 pilot-recording protocol: HK-4 may already be satisfied (bundle archived 2026-07-25 with a README), and ground truth exists for only five of the thirteen recordings. | — |
| `runner 44` | 2026-08-16 | QUEUE-RUNNER runner line | Re-verifies the Step 0 gate via `git ls-remote`, audits the Step 1 report (65 findings, 23 non-confirmed), and flags that the packet's §7 omits full question text. | — |
| `#89` | 2026-08-16 | design session, Opus 5, Cowork | Communications-log ingest memo: the dispatch called two constraints "ruled" when the record shows neither was, and `transcripts.privilege_tier`'s NOT-NULL default asserts privilege on every row. | — |
| `runner 43` | 2026-08-16 | QUEUE-RUNNER runner line | QR-3 ahead-stop's first real fire — HEAD one commit ahead of origin; pushes the stranded commit and executes QR-5's four runner edits, taking the runner to v8. | — |
| `#88` | 2026-08-16 | design session, Opus 5, Cowork | RE-1 referral-engine inputs: one trigger term means two different things in the record, and none of SOURCING's three layers reaches the Texas Disciplinary Rules. QR-5 ruled. | issues → forty-second invocation runner line; issues → self |
| `runner 42` | 2026-08-15 | QUEUE-RUNNER runner line | QR-3 v7 gate passed; all six §1 reconcile checks re-verified for the QBO memo; headline reported — no read-only QuickBooks OAuth scope exists. | received ← #88 |
| `#87` | 2026-08-15 | design session, Opus 5, Cowork | QBO integration research: no read-only OAuth scope exists, data-out calls are the metered half, and the client-secret/rotating-refresh-token need lands the question on Q-WF-4. | — |
| `runner 41` | 2026-08-15 | QUEUE-RUNNER runner line | Verifies the PR-3 packet's six reconcile checks and confirms check six's live defect — `sideSetFor()` defaults non-Criminal practice areas to plaintiff-defendant — left unrepaired. | — |
| `#86` | 2026-08-15 | design session, Opus 5, Cowork | PR-3 re-parenting proposal: the case-type "hierarchy" is flat and absent from the database; `sideSetFor()` falls through for non-Criminal areas; ordering conflicts with the unrun CD-1 migration. | — |
| `runner 40` | 2026-08-15 | QUEUE-RUNNER runner line | Processes the WF-2–WF-8 email-workflow spec verbatim, confirms all ten questions merged, and records that the predicted stale `.git/index.lock` did not appear. | — |
| `#85` | 2026-08-15 | design session, Opus 5, Cowork | WF-2–WF-8 email-workflow spec: all seven rows blocked, an unflagged "T3" namespace collision that gates oppositely, and HIPAA constraints never carried into the WF gate table. | — |
| `runner 39` | 2026-08-15 | QUEUE-RUNNER runner line | Processes the IN-2 crash-report spec, merges nine questions, and reports a wrong "79 codes" figure and a superseded demographic line, neither applied to the source file. | — |
| `#84` | 2026-08-15 | design session, Opus 5, Cowork | IN-2 crash-report extraction spec: corrects #64's "CR-3 (79 codes)" to 70 enumerated values, finds IN-2's gate resolves both ways, and code-list version selection circular. | issues → #64; issues → self |
| `runner 38` | 2026-08-15 | QUEUE-RUNNER runner line | Processes the IN-1 and IN-3 specs verbatim, merges eighteen questions, and confirms the stale `.git/index.lock` recurred while the CRLF false-DIRTY signature did not. | — |
| `#83` | 2026-08-15 | design session, Opus 5, Cowork | IN-1 and IN-3 spec drafts: IN-1 has no design-document home anywhere; self-corrects a draft count (an unbounded regex conflated IN-1 with MIN-1). | issues → self |
| `runner 37` | 2026-08-15 | QUEUE-RUNNER runner line | Executes the ruled A-1–A-6 BUILD-STATE dispositions in a full rewrite, renumbers itself from #80 to #82, and reports the re-measured line count risen to 149. | — |
| `#82` | 2026-08-15 | design session, Fable 5; rulings Michael's, item by item | Michael rules dispositions A-1–A-6 for six stale BUILD-STATE figures found by the #79 audit, sets re-measure checkpoint B thresholds, declines to reopen the BS-1 cap. | — |
| `runner 36` | 2026-08-15 | QUEUE-RUNNER runner line | Processes the FE-4/FE-5/FE-6 specs verbatim, carries Q-FE5-9 (a VERIFIED registry entry diverging from the rule text), and flags FE-5's missing title and status header. | — |
| `#81` | 2026-08-15 | design session, Opus 5, Cowork | Form-engine specs FE-4/FE-5/FE-6: a VERIFIED TRCP 190.3(b)(3) registry entry misquotes the rule ("each party" vs "any other party") — a 25-vs-125 interrogatory gap. | issues → self |
| `runner 35` | 2026-08-15 | QUEUE-RUNNER runner line | Processes the Bexar local-rules and eFiling memo verbatim, confirms the LR-/EF-/BX- ID namespaces are free, and gives H43 its first queue row after finding it had none. | — |
| `#80` | 2026-08-15 | design session, Opus 5, Cowork | Bexar local rules + eFileTexas: the filing moment is contested between TRCP transmission and a Bexar clerk-acceptance rule; LR 3.O.1 requires an A.I.-verification certificate. | — |
| `runner 34` | 2026-08-15 | QUEUE-RUNNER runner line | Processes the record-integrity audit packet, re-verifies AUD-3 and AUD-5–AUD-9, corroborates AUD-3's confirmed-false VERIFIED count, and leaves every stale figure unfixed per §6. | — |
| `#79` | 2026-08-15 | design session, Fable 5, Cowork | Record-integrity audit of 65 claims: 46 sound, 6 stale, one confirmed-false count (AUD-3), one contradicted version line (AUD-2), 11 checkable only by a named other. Nothing applied. | — |
| `runner 33` | 2026-08-15 | QUEUE-RUNNER runner line | One-packet batch; QR-3 v7 gate passed natively; re-verifies and corrects #76's over-broad Insurance Code absence claim in place; Q-STAT-2/5 annotated. | issues → #76 |
| `#78` | 2026-08-15 | design session, Opus 5, Cowork | Corrects #76's claim that all four registry files lack Insurance Code references — the medical-billing file cites Ins. Code ch. 1467; chs. 541/542 still absent from all four. | issues → #76 |
| `runner 32` | 2026-08-15 | QUEUE-RUNNER runner line | Re-issued packet processed delta-only, adding the meter reading; #77 stands as the packet's entry; Fable allowance scarce (approx. 22% left), ration-it branch applies. | — |
| `runner 31` | 2026-08-14 | QUEUE-RUNNER runner line | Processes the v18/Q-STAT-1 packet with no staged file; corrects the stale BUILD-STATE line claiming v17 was never pasted; Q-STAT-1 closed. | issues → carried BUILD-STATE line |
| `#77` | 2026-08-14 | design session, Opus 5, Cowork | Q-STAT-1 SOURCING convention ruled binding and v18 drafted; corrects BUILD-STATE's claim that the revised v17 was never pasted — it was pasted and in force. | issues → carried BUILD-STATE line |
| `runner 30` | 2026-08-14 | QUEUE-RUNNER runner line | Processes two packets as #75/#76; QR-4 filename-date tie broken by mtime; two BUILD-STATE count corrections (20→21 NOT RUN rows, three→four registry files) reported. | issues → carried BUILD-STATE line |
| `#76` | 2026-08-14 | design session, Opus 5, Cowork | Statute pass: all 21 `RETRIEVAL: NOT RUN` rows retrieved from the official corpus; 18 of 21 propositions diverge from operative text, four materially; the A-for-space normalizer corrected. | issues → 2026-08-14 authority-corpus capture; received ← runner 33; received ← #78 |
| `#75` | 2026-08-14 | design session, Opus 5, Cowork, CHAT-DISPATCH Task 6 | Deadline-engine memo sourced to clean TRCP authority for the first time; the 50-day discovery cushion proves Family-Code-only, which the TRCP skeleton has backwards. | — |
| `runner 29` | 2026-08-14 | QUEUE-RUNNER runner line | Processes the CD-2 role-mining packet as #74; QR-3 v7 gate passed natively; ten packet-local IDs became CD-4–CD-13; nothing built. | — |
| `#74` | 2026-08-13 | design session, Opus 5, Cowork, CHAT-DISPATCH Task 3 | CD-2 role mining finds CD-2 already ruled and partly built, reframing the task from greenfield taxonomy design into a coverage audit. | — |
| `#73` | 2026-08-13 | Code session, Opus; rulings Michael's | Ruling run V-4 through V-8, decided one at a time; V-9 opened on the majority-opinion rule's gap for Irwin-class cases; nothing executed. | received ← fifty-third invocation runner line |
| `runner 28` | 2026-08-13 | QUEUE-RUNNER runner line | Processes the registry-workbook-and-citator packet, renumbered from #69 to #72 on a stale numbering premise; QR-3 gate passed; HK-7 ID assigned. | — |
| `#72` | 2026-08-13 | design session, Opus 5, Cowork, CHAT-DISPATCH Tasks 1+2 (the ATOMIC PAIR) | Registry verification workbook and citator pass retrieve 34 of 34 backlog entries verbatim; three new FLP retrieval-hazard classes found; nothing verified. | — |
| `#71` | 2026-08-13 | Code session, Opus; Michael's hand on every click | Outlook edit/cancel exercised live: cancel works; edit works except the first edit after a connect push duplicates the event; cause undetermined. | issues → self |
| `#70` | 2026-08-13 | Code session, Opus | Telemetry item: the record authorizes Code to do nothing, so nothing was done; flags that the lockdown recipe targets Windows while the stack runs in WSL2. | — |
| `#69` | 2026-08-13 | Code session, Opus | Docs lint sweep, read-only: Go_Live_Gates.md and BUILD-STATE.md disagree on the GL-1 floor version, and README understates shipped auth. | — |
| `runner 27` | 2026-08-13 | QUEUE-RUNNER runner line | Processes a sixteen-edit packet on verified anchors; QR-3 v7's new ahead-stop clause checked for the first time and passed; finding #9 flags a 17-day CLAUDE.md/BUILD-STATE contradiction. | — |
| `#68` | 2026-08-13 | design session, Fable 5, Cowork, typed; rulings Michael's | Sweeps ruled and run: no duplication across 171 rows; status-drift sweep closes findings #2–#9; four rulings including the CLAUDE.md non-blank line-count cap clause. | — |
| `runner 26` | 2026-08-13 | QUEUE-RUNNER runner line | Amends the runner to v7 (ahead-stop clause); reconciles the Go_Live_Gates line-count split (106 raw vs 84 non-blank) as a counting convention, not an error. | — |
| `#67` | 2026-08-13 | design session, Fable 5, Cowork, typed; rulings Michael's | QR-3 amended to v7 adding the ahead-stop gate; line counts ruled to mean non-blank; ownership note on the twenty-fifth invocation's wrong safety assumption. | — |
| `runner 25` | 2026-08-13 | QUEUE-RUNNER runner line | Executes the packet before push per Michael's ruling; flags the packet's wrong QR-3 safety assumption; corrects a Go_Live_Gates line count and a stale registry header count. | issues → #66 |
| `#66` | 2026-08-13 | design session, Fable 5, Cowork, typed; all rulings Michael's | Ruling run: approx. 20 open queue items ruled one by one; v17 drafted and delivered; registry entry-4 split ruled; HK re-lettering ruled; telemetry checked, not set. | received ← runner 25 |
| `runner 24` | 2026-08-13 | QUEUE-RUNNER runner line | Re-measures the repo test count via `npm test` (278, confirming the packet over BUILD-STATE's 274); registers three open items V-1 through V-3. | issues → carried BUILD-STATE line |
| `runner 23` | 2026-08-12 | QUEUE-RUNNER runner line | Verifies and routes the CR-3 crash-report PDF and field-code map; PDF confirmed blank with zero PII; filed to a new `docs/reference/` per Michael's ruling. | — |
| `#65` | 2026-08-13 | design session, Fable 5, Cowork, typed | Verifies the #62/#63/#64 batches full-text via the device-bridge checkout at HEAD `f72de66`; corrects the test count to 278; files the registry cite-check memo; Descrybe ruled out. | issues → #61 |
| `#64` | 2026-08-12 | design session, Fable 5, Cowork, typed | Files the CR-3 crash-report code sheet as reference and the field-code map as PROPOSED input for IN-2; records the versioned-code-table requirement. | received ← #84 |
| `runner 22` | 2026-08-12 | QUEUE-RUNNER runner line | Processes two packets, #62 and #63, docs only; the CR-series collision is flagged rather than renamed; `party_type` retention confirmed. | — |
| `#63` | 2026-08-12 | design session, Fable 5, Cowork, typed | FE-D1 disclosures slice named, scoped and authorized; FE-13–FE-17 gating ruled; the email-workflow doc adopted with WF-2–WF-8; telemetry ruled to offline lockdown. | — |
| `#62` | 2026-08-12 | design session, Fable 5, Cowork, typed | Uvalde REQ-CAPTURE reconciled; CR series created with CR-1–CR-11; six criminal registry propositions entered UNVERIFIED; `party_type` retention confirmed from #61. | — |
| `#61` | 2026-08-12 | Code session, Opus | CD-1 contact-directory build: six of seven slice items built and exercised (parties, case_parties, roster definitions, edges, UI, RLS); the live migration is Michael's and has not been run. | received ← #65 |
| `runner 21` | 2026-08-12 | QUEUE-RUNNER runner line | Processes one packet as #60 (renumbered from #59, taken by the Uvalde capture); corrects the sibling registry count from twenty-six to twenty-seven. | issues → twentieth invocation runner line |
| `#60` | 2026-08-12 | design session, Fable 5, Cowork, typed | Twentieth-invocation flags resolved: registry placement confirmed, REQ-10 fold-in carried; the #58 batch verified design-side; registry count reconciliation commissioned. | — |
| `#59` | 2026-08-12 | Code session (immediately after the twentieth runner batch) | Files the Uvalde docket-worksheet REQ-CAPTURE verbatim and unreconciled; no durable IDs assigned; six candidate registry propositions left UNVERIFIED for design-side ruling. | — |
| `runner 20` | 2026-08-12 | QUEUE-RUNNER runner line | Processes REQ-CAPTUREs 4 and 5 as #58; creates a new registry file for twenty-seven unverified propositions; dedupes five propositions against existing entries. | received ← runner 21 |
| `#58` | 2026-08-12 | design session, Fable 5, Cowork | REQ-CAPTUREs 4 (UIM-UDJA transform) and 5 (deficiency-handling) reconciled and group-ruled; DE series created; CL-3, CD-3, FE-13–FE-17, IN-6 and IN-7 issued. | — |
| `runner 19` | 2026-08-12 | QUEUE-RUNNER runner line | Processes the probate-practice-project packet as #57; finds no standalone probate-home queue row existed, so none was created to close it. | — |
| `#57` | 2026-08-12 | design session, Fable 5, typed, Cowork | PROBATE ruled into existence as the third practice project; REQ-1 extended to it; the MATTER-CARRY channel created for two grandfathered matter workspaces. | — |
| `runner 18` | 2026-08-12 | QUEUE-RUNNER runner line | Processes the GH-1 history-acceptance packet as #56; verifies GH-1 collision-free; places a gate-2 pointer note without touching git history. | — |
| `#56` | 2026-08-12 | design session, Fable 5, typed, Cowork | GH-1 ruled: identifying strings surviving in git history ACCEPTED, with a tripwire before visibility widens; a gate-2 pointer note added. | — |
| `runner 17` | 2026-08-12 | QUEUE-RUNNER runner line | Processes the FE-3 close packet as #55; finds BUILD-STATE at 151 lines, not 150, contradicting the sixteenth invocation's close-out report. | issues → sixteenth invocation runner line |
| `#55` | 2026-08-12 | design session, Fable 5, typed, Cowork | FE-3 closed after a full read of form-engine.md §8; two identifying strings generalized in the contamination bullet; BUILD-STATE residuals recorded. | — |
| `runner 16` | 2026-08-11 | QUEUE-RUNNER runner line | Processes the must-carry-54 packet as #54; appends the 2026-07-23 OAA-intake retrospective capture pointer; confirms the six FE rows stay open. | received ← runner 17 |
| `#54` | 2026-08-11 | design session, Fable 5, typed, Cowork | Corrects #53's claim that the form-engine spec had no gating questions; rules FE-3 and FE-8–FE-12 do not gate naming; CRIM DEFENSE practice project created. | issues → #53 |
| `—` | 2026-08-11 | micro-entry | Records that the 2026-07-23 OAA-intake/Outlook session received a retrospective capture in project knowledge; notes C2 closed per #54, others stand. | — |
| `runner 15` | 2026-08-11 | QUEUE-RUNNER runner line | Processes the fe4-7-and-gl1 packet as #53; appends form-engine §13 with the FE-4–FE-7 rulings; lands the GL-1 go-live floor and the gate-2 clarification. | — |
| `#53` | 2026-08-11 | design session, Fable 5, typed | FE-4 definitions versioning, FE-5 subpart detection, FE-6 packaging and FE-7 distillation queue ruled; the GL-1 go-live floor ruled and gate-2 clarified. | received ← #54 |
| `runner 14` | 2026-08-11 | QUEUE-RUNNER runner line | Processes the cd1-build-authorization-and-sk-v2 packet as #52; authorizes the CD-1 build slice; replaces drafting-disclosures SKILL.md v1 with v2; re-parks FE-2. | — |
| `#52` | 2026-08-11 | design session, Fable 5, typed | The CD-1 directory build slice named, scoped and authorized as the next build; FE-2 re-parked to intake; SKILL.md v2 authored. | — |
| `runner 13` | 2026-08-11 | QUEUE-RUNNER runner line | Processes the CD-1 schema-session packet: contact-directory.md lands new, cd-1-session-prep.md deleted, one queue item entered per QR-1 with full question text. | — |
| `#51` | 2026-08-11 | design session, Fable 5 | Michael rules all eight CD-1 questions in one session: parties-as-directory fork, scope, identity, roster, edges, form-engine interface, IN-2's home, FE-1 mechanics adopted. | — |
| `runner 12` | 2026-08-11 | QUEUE-RUNNER runner line | Processes the DT-1 correction packet; closes the registry-widening flag with Michael's confirmation; registers the v14 instructions paste in the queue. | — |
| `#50` | 2026-08-11 | correction entry; design session, Fable 5 | Corrects #49's 2026-08-12 date stamps as a UTC artifact for rulings made 2026-08-11 Central; DT-1 adopted as binding; registry widening confirmed by Michael. | issues → #49 |
| `runner 11` | 2026-08-11 | QUEUE-RUNNER runner line | Processes the 2026-08-12-dated REQ-CAPTURE reconciliation packet; enters FE-8–FE-12, IN-4, IN-5 and WF-1 into the queue; widens the carrier-duties registry file's title. | — |
| `#49` | 2026-08-12 | design session, Fable 5 | Two REQ-1 captures reconciled: attorney-edit roundtrip to FE-8/FE-9/FE-10 and roster-mining evidence to CD-1/CD-2/FE-11/FE-12; seven registry entries verified; CD-1 gate met. | received ← #50 |
| `runner 10` | 2026-08-11 | QUEUE-RUNNER runner line | Processes two packets (drafting-disclosures learnings, trucking REQ-CAPTURE); resolves a session-number collision assigning #47 and #48; opens a discovery-and-carrier-duties registry file. | — |
| `#48` | 2026-08-11 | design session, Fable 5 | First REQ-1 capture reconciled: ten durable IDs entered (CD-2, FE-4–FE-7, IN-1–IN-3); templates home set at docs/templates/; thirteen registry entries verified; CD-1 path ruled. | — |
| `#47` | 2026-08-10 | drafting session, Fable 5 | First live run of the drafting-disclosures skill v1 (shell + medchron + answers in; draft, verification list and provider-data block out); six learnings staged as a §12 fold-in. | — |
| `runner 9` | 2026-08-10 | QUEUE-RUNNER runner line | Processes two packets (disclosures skill, QR-4 ordering ruling); QR-4 adopted the same day as proposed; renumbers the stale disclosures packet #34→#45. | issues → self |
| `#46` | 2026-08-10 | design session, Fable 5 | QR-4 proposed to make filename-date packet ordering standing after a batch-scoped mtime/filename disagreement; RULED ADOPTED the same day; runner bumped to v6. | — |
| `#45` | 2026-08-06 | design session, Fable 5 | The drafting-disclosures skill ruled into existence at docs/skills/drafting-disclosures/SKILL.md; v1 scope limited to validated POC behavior; upgrade protocol recorded. | — |
| `runner 8` | 2026-08-09 | QUEUE-RUNNER runner line | Two packets processed; H1/H2/H4/H5/H6 entered; a same-day correction finds the T3 kickoff authorization doc missing from `inbox/`, opening KICK-1. | issues → self |
| `#44` | 2026-08-09 | design-side advisory session, typed; Fable 5 (heading hedges "believed") | P1 environment completed by Michael's hand (WSL2, CUDA verified); T3 kickoff launched with preflight 6/7 green; Michael rules a narrow audio-row exception. | — |
| `#43` | 2026-08-09 | design session, Fable 5 | Slack integration recommended against for now; Claude Tag logged as a paralegal-era watch item pending privilege/PHI and plan-tier review; nothing ruled. | — |
| `#42` | 2026-08-09 | Code session, Opus 5, ThinkPad P1 Gen 8 | Phase 0 environment stood up on the P1 (torch/NeMo stack, CUDA proven end to end); preflight 6/7 green, audio row RED; Stage 1 scoring held, authorization partly spent. | — |
| `runner 7` | 2026-08-08 | QUEUE-RUNNER runner line | Two packets processed (QR3-Checkout-Gate, MM1-Multi-Machine); the runner jumps v3→v5 in one pass; the checkout gate's own failure case caught by hand before it existed. | issues → self |
| `#41` | 2026-08-08 | design session, typed | MM-1 ruled yes in all four parts: one runner at a time, packet destinations name the machine, user-level runner copies deleted, bootstrap addendum; runner to v5. | — |
| `#40` | 2026-08-08 | design session, typed | QR-3 ruled yes: Step 0 now fetches origin and confirms the checkout is at HEAD before reading the runner or any packet; runner bumped to v4. | — |
| `runner 6` | 2026-08-08 | QUEUE-RUNNER runner line | One packet stalled mid-reconciliation on a third CL2-AC-1 location conflict; Code flagged rather than obeyed; design resolved the same session, one line lifted per #13 R-4. | — |
| `#39` | 2026-08-08 | design session, typed | QR-2 ruled yes: machine-local runner copies become pointers to docs/prompts/QUEUE-RUNNER.md; CL2-AC-1's duplicated queue text consolidated into the ID-bearing entry. | — |
| `runner 5` | 2026-08-08 | QUEUE-RUNNER runner line | One packet processed (contact-directory-reframe); Probate Corpus.zip left untouched in `inbox/`; corpus containment verified via `git ls-files` before push; CD-1 issued clean. | — |
| `#38` | 2026-08-08 | design session, mixed voice/typed | The contact directory reframed to supersede FE-1; CD-1 issued as a living spec; Slice A withdrawn; CL2-AC-1 direction-confirmed; CORPUS-HOME closed to the ARCHIVE project. | — |
| `#37` | 2026-08-07 | design session close-out, Fable 5 | #36's doc routing reviewed and cleared at `89651e8`; QR-2 proposed (unruled) after the machine-local runner skill loaded stale twice in two runs. | — |
| `#36` | 2026-08-07 | QUEUE-RUNNER batch, Code session, Opus 5 | Preflight failed on the wrong machine (LENOVO, 4 GB VRAM, no WSL2 — not the P1 Gen 8); the Phase 0/T3 authorization stays unspent; only three doc work orders routed. | — |
| `#35` | 2026-08-07 | QUEUE-RUNNER batch, Code session, Opus 5 | The clone was stale and fast-forwarded four commits, picking up QUEUE-RUNNER v3; six doc work orders filed, adding the missing FE-1/FE-2/FE-3 queue rows. | — |
| `#34` | 2026-08-07 | design session, Fable 5, dictated inputs | Seven rulings closed dictated: FE-1 provider directory, FE-2 entity-discovery sweep, PR-3 held for the ladder pass, QR-1 and RR-1 adopted, D-CL2-3 per-client rates, CL2-AC-1 issued. | — |
| `#33` | 2026-08-06 | QUEUE-RUNNER batch, Code session, Opus 5 | Form-engine POC packet routed as a new §12; a git identity bootstrap gap found; BUILD-STATE Step 4 item 3 amended for BS-1 provenance and displace-don't-append. | issues → #31; issues → self |
| `#32` | 2026-08-06 | design session, Fable 5 | Live POC drafts real 194.2(b)/195.5 disclosures by XML surgery on a shell .docx; the P1 Gen 8 provisioned with Claude Code and cross-machine rules restated. | issues → self |
| `#31` | 2026-07-30 | QUEUE-RUNNER batch, Code session, Opus 5 | QBO future-modules capture filed to docs/specs; Probate Corpus.zip left untouched per Michael's ruling; the runner-prompt 120-vs-150-line cap contradiction flagged, not fixed. | received ← #33 |
| `#30` | 2026-07-28 | design side, Fable 5 | Post-close-out capture: QuickBooks Online integration proposed (link-don't-rebuild, sandbox-only) and an unbuilt-territory roadmap map recorded; neither ruled nor built. | — |
| `#29` | 2026-07-28 | Code session, Opus 5 | BS-1a closed (168→139 lines); CL-2 §5B built and migrated live; six defects found by exercising, including `toRow()` silently dropping cleared fields in Supabase mode. | issues → self; issues → self |
| `#28` | 2026-07-28 | Code session, Opus 5 | AUTH-1 magic-link ruling exercised: schema.sql had zero GRANT statements, causing 401s under RLS; fixed via a grants migration; Michael signed in and created a case. | — |
| `runner (unnumbered)` | 2026-07-28 | QUEUE-RUNNER batch, Code session, Opus 5 | Two packets processed (BS1 ledger split, CL2 dual-track reconciliation); the auth slice gated on unconfirmed AUTH-1; the BUILD-STATE ledger split delivered one line of headroom. | — |
| `#27` | 2026-07-28 | Michael ruling, design session, Fable 5 | The sealed sequence unsealed: Michael rules AUTH FIRST over both Fable's and Opus's CL-2-first views; CL-2 authorized but queued behind auth; D-CL2-8 adopted as Michael's own. | — |
| `#26` | 2026-07-28 | design session, Fable 5, blind per protocol | Blind Track F run: Fable recommends CL-2 first and CL-2 authorization yes, reconsiders ten D-CL2 rulings under unbounded latitude, affirms all with one addition. | — |
| `#25` | 2026-07-27 | design session, Opus 5 | BS-1 ruled: the anti-resurrection ledger splits into its own file with a BUILD-STATE pointer line, the same-day 150-line cap raise having proved insufficient within one pass. | — |
| `#24` | 2026-07-27 | design session, Opus 5 | Six-field correction issued against #23 — the dual-track protocol wrongly told Fable D-CL2-2a was open when Michael had already ruled it; CL2-C and BS-1 ruled. | issues → #23 |
| `#23` | 2026-07-27 | design session, Opus 5 | CL-2 sequence ruling sealed pending Fable's blind pass; SUPA-1 closed (no live tables); Q-5 closed by replacement; the six-field correction format codified with three self-corrections. | issues → self; issues → self; issues → self; received ← #24 |
| `#22` | 2026-07-27 | design session, Opus 5 | model-routing-plan.md filed UNRULED; a QUEUE-RUNNER defect surfaced (merges lose question text, destroying Q-5's wording); Supabase RLS and Outlook-interval corrections recorded. | issues → unnamed target (RLS reading); issues → unnamed target (Outlook interval claim) |
| `#21` | 2026-07-27 | Michael request, Code session | Archived project history rebuilt day by day, 07-21 → 07-26, with session counts and model usage; model attribution found unrecorded for the first four days. | — |
| `#20` | 2026-07-26 | Code session, APP CODE CHANGED | First live Outlook push succeeds after fixing two blocking defects (redirect-URI/router collision, MSAL v5 popup-contract change); Michael hits the one-way sync seam within the hour. | issues → self |
| `#19` | 2026-07-26 | Michael, Code session | INSTR-3 closed: Michael confirms project instructions v4 pasted into project settings; `inbox/` already cleared of the staged v4 draft before this session ran. | — |
| `#18` | 2026-07-26 | design session, Opus 5 | Blockers re-analyzed: auth is the true root blocking both edge functions; magic link stays the proposed default; the CL-2 authorization brief staged for Fable, with bias disclosed. | — |
| `#17` | 2026-07-26 | design session 3, Opus 5 | Client model completed: five rulings closed (D-CL2-5/6/7/8/9); the CL-1 justification struck as Michael rarely files split-UM cases; Insurance Code ch. 1952 read, not verified. | — |
| `#16` | 2026-07-26 | design session 2, Opus 5 | Five rulings on the client model: the entity renamed client with a posture field, profile model adopted, case-level limitations retired, expenses split evenly at entry. | issues → same-day earlier entry (claude/ cite-fix) |
| `#15` | 2026-07-26 | design session, Opus 5 | V17 ruled (a): probate is its own practice area, linked not parented; the claimant dimension ruled in (case owns occurrence, claimant owns damages); conflicts ruled advisory. | — |
| `#14` | 2026-07-26 | QUEUE-RUNNER, Code session | Queue run finds zero zips; project-instructions v4 fact-checked against the repo tree and everything verified present; INSTR-3 stays open pending Michael's paste. | — |
| `#13` | 2026-07-26 | design session, Opus 5 | Four record items reconciled: R-1 practice-area wording applied, R-2 three carried files verified absent, R-3 BUILD-SESSION-NOTES clearing confirmed, R-4 stale D3/H8 line corrected. | issues → prop-code-53-28-deadline-engine-design.md (R-4); issues → BUILD-STATE.md carried line (R-3) |
| `#12` | 2026-07-26 | Michael ruling, Code session | Michael corrects the practice areas to four — PI, civil litigation, criminal defense, probate — after Code's #10 and #11 dropped civil litigation. | issues → #10; issues → #11 |
| `#11` | 2026-07-26 | Code session | PR-3 opened: the probate case type is mis-parented under Personal Injury; FAM-1 closed no-op; a §4.5 contradiction resolved in favour of no rename in raw captures. | issues → design side (probate furniture claim); issues → work order/packet (T1 rename expectation); received ← #12 |
| `#10` | 2026-07-26 | QUEUE-RUNNER batch, Code session, Opus 5 | Third batch: est352-cprc71 then probate-scope-rename-d3h8 rev2 executed; probate-line-s1 superseded; the source check finds probate furniture mis-parented, family furniture absent. | issues → design side (§4.3 furniture assumptions); issues → packet (CLAUDE.md T1 senses); received ← #12 |
| `#9` | 2026-07-26 | design session, Opus 5 | PR-1 and PR-2 ruled — independent uncontested administration is the probate spine; D3/H8 closed as shared spine plus per-consumer facets; family law removed as a practice line. | issues → self |
| `#8` | 2026-07-26 | design session, Opus 5 | Est. Code ch. 352 and CPRC ch. 71 read in full: the probate fee row is misclassified, §352.052 is missing entirely, and the fee-basis enum decomposes into five fields (O6 ruled). | issues → time-tracker-fee-basis-profiles-design.md §6; issues → self |
| `#7` | 2026-07-26 | QUEUE-RUNNER batch, Code session | Second batch executes one packet: CourtListener rate figures corrected, queue conventions flipped to standing, and the Q-7 slash-command location bug resolved. | — |
| `—` | 2026-07-26 | design session, Opus 5 | Michael rules Q-1 (queue mechanism) and Q-2 (docs/prompts) as standing conventions, approves v3 instructions, connects CourtListener live; the majority-opinion rule adopted after a near-miss. | issues → registry-courtlistener-integration-design.md; issues → self; issues → self |
| `#6` | 2026-07-26 | QUEUE-RUNNER batch, Code session | First QUEUE-RUNNER run processes the queue-mechanism bootstrap packet end to end; docs/prompts/QUEUE-RUNNER.md created and inbox/.gitignore hygiene items land cleanly. | — |
| `—` | 2026-07-26 | design session | Designs the inbox/QUEUE-RUNNER queue mechanism so Michael can keep working on Opus 5 between Fable resets; this packet is itself the test run. | — |
| `#5` | 2026-07-26 | Michael ruling, Code session | Michael rules the FLP/CourtListener promo deadline of 2026-08-06 not a problem; the clock item carried across 10+ entries is closed. | — |
| `#4` | 2026-07-26 | design session, Opus 5 | Migration to the new build project completed; repo connected with selective sync excluding src/; kickoff verified against BUILD-STATE commit `7f3dbf5`; trigger #6 fired. | — |
| `#3` | 2026-07-26 | design session, Opus 5 | Michael directs migration to a fresh project; the old project redesignated LEGAL AUTHORITY ARCHIVE, K-3 closed by designation, Go_Live_Gates and the statute design doc merged forward. | — |
| `#2` | 2026-07-26 | design session, Opus 5 | The case authority index replaced with a locator-only manifest once registry docs became readable; five content errors found (A-3 Huntress, McMillan, Ahmed, Sheppard, Primoris). | issues → same-day earlier entry (case-authority-index draft); issues → earlier entry (withdrawn routing criticism) |
| `—` | 2026-07-26 | design session, Opus 5 | Project knowledge at 81% capacity; measured token load finds reference corpora dominate; the case authority index and working-set-policy doc drafted and staged for Code. | issues → self |
| `—` | 2026-07-26 | design session, Opus 5 | Prop. Code ch. 53 and ch. 28 read in full; §53.156's may→shall date misstated as 2021, actually 2011; the full Servpro deadline-engine buildout ruled gated. | issues → time-tracker-fee-basis-profiles-design.md §6/§7 and attorney-review-queue.md |
| `—` | 2026-07-26 | design session, Opus 5 | First sustained verification pass: 8 opinions and 5 statutes read against drafted registry entries; Rohrmoos proof elements corrected to four, not five; Entry 2 redrafted. | issues → fee-basis design (Rohrmoos element count) |
| `—` | 2026-07-25 | text session, Opus 5, design space | APIL course-book mining passes 2 and 3 completed; pass 1's article map found to have missed four chapters (Ch. 11, 12, 20, 23); register extended to H83. | issues → apil-2025-course-book-mining-pass1.md; issues → case-heartbeat-design.md |
| `—` | 2026-07-25 | design session, mixed voice/text, Opus 5 | Deposition no-dates ladder, mediation cadence, DCO ingester and a software-wide audit log walked; APIL course book pass 1 ingested, four chapters bearing on rulings. | issues → case-heartbeat-design.md §8.10 (process-server name); issues → self |
| `—` | 2026-07-25 | voice walkthrough, Fable 5 → Opus 5 | Default-judgment thread walked end to end including post-judgment TRAP 26.1/329b and TRAP 30 clocks; H32 no-answer fork closed both ways; the deficiency engine parked. | — |
| `—` | 2026-07-25 | design-side walkthrough, voice + text, Fable 5 | H14 service-chase stage closed with per-defendant fan-out and difficulty profiles; TRCP 99(b) read; the answer-received stage and opposing-counsel letter touch walked. | — |
| `—` | 2026-07-25 | voice/mixed session, Fable 5 | Heartbeat walkthrough resumed at H14 suit-filed; H23 limitations master clock and H24 hard six-month filing buffer confirmed; the pre-service citation arming chain walked. | — |
| `—` | 2026-07-25 | design session, mixed voice/text, Opus 5 | The case-heartbeat design doc created covering PI stages 1–9; stages 6–9 walked (records, demand, negotiation as a parallel track); TRCP deadline skeleton extracted. | — |
| `—` | 2026-07-25 | Code session | Second handoff applied: Items B/C/D/E built (editable classification, declared case-type ladders, itemLabel fixes, party-patch guard); Items A/F verified already present in the tree. | — |
| `—` | 2026-07-25 | design session | BUILD-SESSION-NOTES.md triaged for the first time since 07-21 (five items closed, six carried); sync scope ruled to include src/db/docs and exclude lockfiles, node_modules and dist. | — |
| `—` | 2026-07-25 | Code session | Medical-walkthrough handoff Items 0–8 applied: benchmark.ts schedule-selection bug fixed (the attorney picks the fee schedule), reseed migration backup, billed-lines disclosure, implicated-rule flagging. | issues → CLAUDE.md push-verification wording; issues → CLAUDE.md stale "no test runner" line |
| `—` | 2026-07-25 | design-side | First attorney walkthrough of the billing module on real TX PFS data: ProCare confirmed 3.98x, a Central Texas facility bill 21.77x with the hard caveat firing; five defects staged. | issues → earlier draft of go-live gate 8; issues → the sync reminder wording |
| `—` | 2026-07-25 | same Code session | Project-knowledge GitHub sync diagnosed as stale and over-broad (surfacing raw source files, missing BUILD-STATE content); Michael advised to trim scope and force a re-sync. | — |
| `—` | 2026-07-25 | Code session | Build-status claims stripped from the master spec and README (four files flagged for re-upload); a PRECEDENCE note added distinguishing designed from built authority. | — |
| `—` | 2026-07-25 | Code session | The existing build-state snapshot converged to the prompt's stricter template and renamed BUILD-STATE.md; CLAUDE.md de-duplicated so status has one source of truth. | — |
| `—` | 2026-07-25 | same Code session | Design side found 32 commits behind because of a blocked push; build-state.md snapshot created plus a binding end-of-session log + refresh + push rule. | — |
| `—` | 2026-07-25 | Code session | A4 section-removed flag built for repealed/renumbered statutes (verified live, 177 tests); the DRAFT time-tracker fee-basis profiles doc written; the Citizens handoff routed. | — |
| `—` | 2026-07-25 | design session, Fable 5 | Michael settles the Citizens Medical Center account at $5,000 full-and-final after the design side reverse-engineers their 48.94% inpatient-methodology figure against an outpatient ER bill. | — |
| `—` | 2026-07-25 | Michael feedback, same Code session | A code-then-chapter cascading dropdown and keyword search over chapter/section titles built for the Statutes page, replacing the free-text cite box per Michael's feedback. | — |
| `—` | 2026-07-25 | Code session | T3 (bill-text statute matcher, bill lifecycle flags, LegiScan poller, tracked-bills UI) and T4 (unified worklist) built, completing the in-app statute-tracking design slices. | — |
| `—` | 2026-07-25 | Code session | T2 built: a chapter-HTML parser with per-section content hashes, a statute viewer with deep-linked cites, and the A4 hash tripwire for re-verification, verified live end to end. | — |
| `—` | 2026-07-25 | Code session | Recovered from a Claude Desktop crash with no work lost; §9 decisions resolved — O1 (LegiScan key as a Supabase secret), O2 (twelve-code working set), O3 (dashboard card). | — |
| `—` | 2026-07-25 | Code session | The statute-tracking design docs filed; the T1 cite parser/resolver built and 28 code abbreviations live-verified; the .gov site found to require fetching via tcss.legis.texas.gov. | — |
| `—` | 2026-07-25 | Code session | The OAA parser tuned against a real Uvalde order with an OCR text layer (single-space labels, wrapped offense rows, checkboxes); every field now extracts correctly. | — |
| `—` | 2026-07-25 | Code session | OAA template detection tuned against Michael's first real scanned Medina County order using structural form-family anchors; the HCRPDO appointee-name question flagged for Michael. | — |
| `—` | 2026-07-25 | Code session | OAA Tier 1 intake built end to end: label-anchored parser, attorney hard-stop and duplicate-cause checks, upload-to-review-to-create-matter UI, verified live with a fictional fixture. | — |
| `—` | 2026-07-25 | Code session | The prior entry's verification caveat closed by re-confirming the Office-notes click-through in demo mode: inbox count dropped, note filed, record page rendered correctly. | — |
| `—` | 2026-07-25 | Code session | Michael rules the §10 decisions (confirm-only filing, Windows + WSL2, non-case recordings to a personal store); 13 real pilot recordings wired as test fixtures, all passing. | — |
| `—` | 2026-07-24 | Code session | Michael provides a probate system prompt plus a 1.8 MB corpus for building probate as a practice area; the corpus kept out of the repo and routed to design. | — |
| `—` | 2026-07-25 | Code session | The transcript-sort-and-route design filed and T1 (inbox data model/UI) and T2 (routing engine with spoken-number and fuzzy-name matching) built; vitest added as the first test runner. | — |
| `—` | 2026-07-24 | Code session | The feature-intake design handoff filed verbatim; item D and item A examples flagged for containing live-matter data and that commit held local pending Michael's call. | — |
| `—` | 2026-07-24 | design session | Dictation session capturing new feature ideas (recorder/transcription/routing next, CourtListener API adoption, subrogation as a document-extraction pattern, email intake); no code written. | — |
| `—` | 2026-07-24 | Code session | The 2026-07-24 design handoff applied; a duplicate-committed doc renamed to its canonical name and stale staged items already built reconciled (UI primitives, Phase 1a, Outlook push). | — |
| `—` | 2026-07-24 | chat session | The 2026-07-23 handoff confirmed pushed; Michael's v0.1 feedback reviewed (all features approved, two UI items promoted); Phase 1a unblocked. | — |
| `—` | 2026-07-24 | Code session, design-space-directed | The CourtListener/FLP citation-graph integration design doc committed and cross-referenced in the master spec and CLAUDE.md; nothing built, two decisions left to Michael. | — |
| `—` | 2026-07-24 | Code session | Outlook calendar push Phase 1 built end to end: CalendarEvent entity, Graph push layer, Calendar tab on case detail; verified live, demo store bumped v3→v5. | — |
| `—` | 2026-07-23 | Code session | A shared phone-masking input added across 12 fields and a filterable combobox replacing three long-list selects; the Phase 1a settlement-gate audit delta closed. | — |
| `—` | 2026-07-23 | Code session | Three routed design-space items executed: the round-trip state-line rule, a registry-verification entry, and the Ch. 146 correction; a duplicate registry doc renamed via git mv. | issues → docs/spec-feedback.md (Ch. 146 characterization) |
| `—` | 2026-07-23 | design space, chat session | Part 7 verification list worked; Michael pulled Ch. 146 text and loaded 17 full opinions; a spec mischaracterization, a McMillan mis-cite and an LOP tension found. | — |
| `—` | 2026-07-23 | Code session | Ten draft registry entries committed with per-proposition source flags and Michael's sign-off checklist; the wrong seeded Ch. 146 proposition deliberately left unedited. | — |
| `—` | 2026-07-23 | Michael walkthrough | Michael walks Phase 1a live and approves the slice; the line-item menu, benchmark intro copy and a label collision fixed; disclaimer wording approved as v1. | — |
| `—` | 2026-07-23 | Code session | Real 2026 Medicare PFS data pulled for the Rest-of-Texas locality from CMS; the 99203 rate validated against the CMS look-up tool exactly. | — |
| `—` | 2026-07-23 | Code session | The overnight Phase 1a build audited against a six-point instruction list, three deltas found; ProviderBillingProfile and a stale-analysis flag built to close two gaps. | — |
| `—` | 2026-07-23 | Code session, design-space-directed | Form engine spec captured: wizard-driven doc generation, token substitution against a real .docx skeleton, a verbatim variant library, the mental-health variant gated pending decision. | — |
| `—` | 2026-07-23 | Code session | The revised OAA-based criminal intake spec committed with a two-tier extraction model and hearing auto-detect; Michael's GitHub-uploaded drafts merged into the tracked spec. | — |
| `—` | 2026-07-23 | Code session, overnight session | Billing module Phase 1a built end to end: Medical tab, per-bill workspace, Legal Rule Registry infrastructure and Benchmarks page; the Supabase schema extended in parallel. | — |
| `—` | 2026-07-23 | phone dictation session | Phone dictation from courtroom use captures fixes; three specs drafted — criminal intake enhancements, mandatory Outlook one-way push, exploratory email intake with a HIPAA constraint. | — |
| `—` | 2026-07-22 | Michael walkthrough | Michael walks v0.1 live and signs off as-is; five backlog items captured — district court directory, deeper intake, structured addresses, insurer type-ahead. | — |
| `—` | 2026-07-21 | Code session | The codebase re-reviewed; not-found/error pages added, role/side pickers unified, db/schema.sql RLS hardened on file_counters; a prior test-harness observation withdrawn as an artifact. | issues → BUILD-SESSION-NOTES.md (Enter-key-submit finding) |
| `—` | 2026-07-21 | Code session | Everything actionable from the review fixed: UTC date-opened bug, tab routing, versioned localStorage store; PI flags and policy fields made editable; BUILD-SESSION-NOTES corrected. | issues → BUILD-SESSION-NOTES.md (file-number year, README characterization) |
| `—` | 2026-07-21 | Code session | Node.js LTS installed, the app run in demo mode and the full codebase read; BUILD-SESSION-NOTES.md findings written — UTC date bug, Supabase auth gap, frozen classification. | — |
| `—` | 2026-07-21 | Code session | The git repo initialized, .env protected, specs committed under docs/specs/, CLAUDE.md created merging conventions with generated structure, and pushed to private GitHub. | — |
| `—` | 2026-07-21 | PARTIAL — type not stated in heading or body | The build ruled to move to Claude Code while design stays in the Project space; CLAUDE.md's project-conventions block drafted covering spec canonicity and registry discipline. | — |
| `—` | 2026-07-22 | PARTIAL — type not stated in heading or body | All eight Part 6 billing decisions resolved with Michael; the Citizens MRF dry run completed on the real 55 MB file, confirming the negotiated-rate evidence tier. | issues → medical-billing-analysis-module-synthesis.md (dry-run findings) |
| `—` | 2026-07-22 | PARTIAL — type not stated in heading or body | Claude's memory capabilities discussed versus project docs; THIS LOG CREATED as the practical equivalent, with a deliberate decision not to backfill old chat history. | — |

## PARTIAL rows

Three entries state no session type in either heading or body. Rather than infer one from the
project's model-routing conventions, they are marked `PARTIAL — type not stated in heading or body`:
the two 2026-07-22 entries and the 2026-07-21 "build moves to Claude Code" entry. Several other
entries name an interface or actor but no model (`#14`, `#19`, `#20`, `#21`, `#38`, `#39`, `#40`,
`#41`); the model is omitted there rather than guessed. `#44`'s own heading hedges its attribution
("Fable 5 **believed**") and that hedge is carried through rather than resolved.

No other row is PARTIAL. **The first edition could say "the full-text read reached every entry";
no edition since can say it of the rows it added — seventeen at the second, four at the third,
three at this one — and each says so in Method above instead.**

## What this document is not

- Not a correction of anything. Every entry in the log **stands as written**.
- Not a status source. `BUILD-STATE.md` is the only authority on what is built.
- Not a substitute for reading the entry. Summaries are 12–40 words against entries averaging
  ~44 non-blank lines; anything load-bearing must be read in the log itself.
- Not verification of any legal proposition, count, or claim summarised here.
- Not a ruling on its own upkeep — **but two of the three are now Michael's answers rather than
  this file's questions.** **`TOC-4` (regeneration cadence) was RULED 2026-08-18: every runner
  batch**, written into QUEUE-RUNNER v11 Step 4 item 1, and this edition is its second firing.
  **`TOC-6` (whether a Code session takes the next `#nn`) was RULED 2026-08-18: `#nn` is
  DESIGN-ONLY**, and the rule now lives in the session log's own preamble. **`TOC-5`** — whether a
  file this size should sync into project knowledge at all — **remains Michael's and unruled**,
  and this edition, larger again, is evidence for it rather than an answer to it.
  *(Both 2026-08-18 stamps above are left exactly as ruled: `#101` records that those rulings were
  in fact made the evening of 2026-08-17 Central, and that the stamps are **deliberately not
  restamped**. The date on the ruling is the date the record carries.)*
