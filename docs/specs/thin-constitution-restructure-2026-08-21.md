# THE THIN CONSTITUTION — restructure record, measurements, and the head-file specification

**Status: RULED.** Twelve rulings, all Michael's, all **2026-08-21 Central**, put one at a time in a
typed Cowork design session (Opus 5) under CC-1. Nothing here is a proposal except where a line
says so on its face.
**Canonical repo path:** `docs/specs/thin-constitution-restructure-2026-08-21.md`
**Authored:** 2026-08-21 Central (DT-1: clock-checked at 18:26 and again at 19:06 CDT; the container
had already rolled to 2026-08-22 UTC at the second check and was **not** used).
**Bridge reads at:** `57699a795dc856aa1567381aa6ef0dde96c546e8`, confirmed equal to
`origin/master` by a live `git ls-remote origin master` — not from the local tracking ref
(QR-6(a)). `inbox/` was empty at read time. No `git status` was run; no `.git/index.lock` was
stranded; no LE-1 false-dirty wall was provoked.

**What this document is for.** §3 is operative — the queue runner reads it every batch. §1, §2 and
§4 are the record of why, measured rather than asserted, so that a later session re-opening any of
this can see the numbers the rulings were made against.

---

## §0 — WHAT WAS ALREADY RULED, AND WHAT THIS SITTING ADDED

**Ruled in voice on 2026-08-21, before this sitting: adopt SOLUTION ONE — the thin constitution.**
One project, as now. Project knowledge holds **current state only**; the repo at HEAD holds all
history. Three moves define it:

1. The live session log leaves the design-side sync entirely (bridge-only, as the archive already
   is), replaced by a small capped head file the queue runner regenerates each batch.
2. **Captures become TRANSIT, not residents** — a `claude_` capture stays in project knowledge only
   until its content has landed, then moves to the LEGAL AUTHORITY ARCHIVE project by Michael's
   hand. Lossless: relocated, never deleted.
3. Superseded specs follow the same path — verify-landed, then relocate.

**The stated goal is a FLAT GROWTH SLOPE, not a one-time saving.** Everything that remains synced
must be capped or slow-growing. That sentence is the standard every ruling below was tested against.

That voice sitting created no packet and no instruction text. This sitting settled the twelve
questions it left open, and produced both.

---

## §1 — MEASUREMENTS (every figure from a command against the checkout at HEAD)

### §1.1 — The unit

The meter counts **tokens**. The ratio is not assumed: entry `#107` established it by a **deletion
delta** — 509,246 bytes removed dropped the meter 145,829 units — **3.49 bytes per unit**. One
percentage point of the 2,000,000-token budget ≈ 20,000 tokens ≈ **~69,800 bytes of prose**.
That ratio is used throughout and is the same one `knowledge-capacity-measurement-2026-08-20.md`
§1.2 derived independently (3.46) from a different basis.

### §1.2 — The level, decomposed

**Reading at session start: 1,796,919 / 2,000,000 = 89.8%** — *below* the Q-CAP-5(a) 90% flag line
by two-tenths of a point, and that is **after** the 2026-08-20 split freed 7.8%.

| | bytes | ≈ tokens | ≈ % of budget |
|---|---|---|---|
| Synced repo (167 files, picker exclusions applied) | 5,714,103 | ~1,637K | **81.9%** |
| Project docs (all 33, by subtraction) | ~557,000 | ~160K | **8.0%** |
| **total** | | | **89.9%** — closes on the reported 89.8% |

**`docs/specs/session-log.md` at read time: 1,047,175 bytes; 6,889 NON-BLANK lines (7,570 raw);
136 entries, 62 of them numbered. ≈300K tokens ≈ 15.0% of the entire budget.**

### §1.3 — THE SLOPE IS THE FINDING, AND THE THREE RULED MOVES DO NOT FLATTEN IT

Per-file growth, measured from the blobs at successive HEADs. **Each rate is over that file's own
observed window** — named in the row, because the windows are not identical and averaging across
different ones silently would be the kind of figure this project keeps having to correct.

| synced file | earliest observed | latest observed | window | growth/day | ≈ % of budget/day |
|---|---|---|---|---|---|
| `session-log.md` | 549,427 *(08-12)* | 1,415,592 *(08-19 peak, pre-split)* | 7 d | **~124 KB** | **1.77%** |
| `attorney-review-queue.md` | 134,834 *(08-12)* | 620,186 *(08-20)* | 8 d | **~61 KB** | **0.87%** |
| `session-log-toc.md` | 52,994 *(08-16, first appearance)* | 154,345 *(08-20)* | 4 d | **~25 KB** | **0.36%** |
| `BUILD-STATE.md` | 20,590 *(08-12)* | 130,746 *(08-20)* | 8 d | **~14 KB** | **0.20%** |
| `spec-feedback.md` | 48,108 *(08-12)* | 84,073 *(08-20)* | 8 d | ~4.5 KB | 0.06% |
| `BUILD-SESSION-NOTES.md` | 13,176 *(08-12)* | 13,176 *(08-20)* | 8 d | **0 — flat** | 0 |

**Combined: ~228 KB/day ≈ 3.3 percentage points of the budget every day.**

**Move 1 removes ~124 KB/day — about 54% of the slope. It does not flatten it.** Three synced files
still grow with *every runner batch*, by ruled design: the review queue (QR-1 requires full question
text in it), the abstract index (TOC-4 regenerates it larger each time), and BUILD-STATE (rewritten
each batch). Where the ruled work lands:

| | arithmetic | ≈ % of budget |
|---|---|---|
| at session start | measured | **89.8%** |
| − live log out (−15.0) − abstract index out (−2.2) + head file in (+1.7) | −15.5 | **~74%** |
| − the fifteen landed captures relocated (estimated, ~5) | −5 | **~70%** |
| runway at the **remaining** ~1.5 pts/day | 30 ÷ 1.5 | **~20 days** |
| runway with no change at all | 10.2 ÷ 3.3 | **~3 days** |

**So the ruled moves buy about three weeks. They do not buy a flat slope.** Two of the three
residual growers were deliberately deferred (TC-1); the third is settled here (TC-3).
*The capture line is the only estimate in the table — project-document sizes are not readable from
the design side, so ~8.0% total is derived by subtraction and the landed fifteen are apportioned
within it. **Everything else is measured.***

### §1.4 — TWO FINDINGS RECORDED BECAUSE THEY OUTLIVE THIS SITTING

**(a) `Q-CAP-5(b)` had already fired again, thirty hours after the last split.** Standing law says
that when the live log passes ~700 KB the sitting proposes the next positional split. It stood at
**1,047,175 bytes** — the 2026-08-20 split moved 543,336 bytes out and the log ate back roughly a
third of that within a day and a half. **Ruled at TC-10 below.**

**(b) `BS-1a`'s cap is a LINE cap and the line cap has been defeated by density.** BUILD-STATE sits
at **exactly 150 non-blank lines — at the cap — and 130,746 bytes: 871 bytes per line.** It grew
**6.35×** between 08-12 and 08-20 **without ever breaching its cap**. This is not a violation: the
runner states the cap "exists for READABILITY, not token cost." It is recorded because the file is
now 1.9% of the budget and rising under a cap that structurally cannot stop it. **Not ruled here —
it belongs to the deferred sitting at TC-1.**

---

## §2 — THE TWELVE RULINGS

Each carries its one-line reason. Reasons are load-bearing: without them a later session
"improves" a decision back into something already rejected.

| ID | RULING | REASON |
|---|---|---|
| **TC-1** | **SCOPE.** The abstract index is settled tonight. `attorney-review-queue.md` (~0.87%/day) and `BUILD-STATE.md` (~0.20%/day) get their own sitting. | Move 1 makes the index incoherent *on its own terms*, so it cannot be deferred; the other two stand on their own and the review queue is the highest-risk file in the repo to cut. |
| **TC-2** | **THE HEAD-FILE RULE.** The head carries **the four most recent design `#nn` entries and every entry above the oldest of them**, whole and verbatim. | A flat count starves the head: entry kinds interleave, and at ruling time the three most recent entries were two Code sessions and a runner line — a "last 3" head would have contained **zero design rulings** and missed `#126`. Anchoring on design entries guarantees the reach; the interleaved runner lines come along and are what say *what landed*. |
| **TC-3** | **THE INDEX SPLITS.** A **compact existence index** stays synced; the **full abstract index** goes bridge-only with the log. | The index does two jobs at two prices: existence costs ~116 B/entry (15,781 B for all 136), abstracts cost ~739 B/row (the other ~138 KB and *all* the 25 KB/day). Splitting keeps the cheap job synced and sends the expensive one where the log went. |
| **TC-4** | **`docs/record/` — a new EXCLUDED directory.** The live log and the full abstract index move into it. Canonical paths change, once, deliberately. | A named folder meaning *"repo-only record, bridge-reachable"* is a **rule**; a list of individually-unticked files is housekeeping that has to be redone every time something outgrows the sync — the same conversation had already been had three times in two days. Ruled **without** first checking whether per-file picker exclusion works, expressly so the answer stops mattering. |
| **TC-5** | **ONE synced file, not two:** `docs/specs/session-log-head.md` carries the verbatim head entries, the compact index and the pointers. | A session opens one file at start-of-session and gets both what just happened and what exists behind it; one regeneration, one banner, one chance to leave something stale instead of two. |
| **TC-6** | **`docs/archive/` does NOT move.** It stays where it is. | It already works and is already excluded, and it is CLOSED by `Q-CAP-1` — nothing is ever added. The two names mean different things and separating them is correct, not accidental: **archive = closed and frozen; record = live but repo-only.** |
| **TC-7** | **All FIFTEEN verified-landed captures relocate to the ARCHIVE project as a block**, Michael's hand. | Each has a filed session-log entry verified by full-text read at HEAD, not RAG. Nothing is deleted — relocated, lossless. §4 carries the list and the evidence. |
| **TC-8** | **A required TRANSIT status line on every capture a future session writes**, naming the condition on which it leaves project knowledge. | Makes move 2 self-executing instead of dependent on someone remembering at a capacity sitting — the "deferral rule that quietly becomes a drawer" failure CC-1(c) exists to close. Text at §5. |
| **TC-9** | **`claude/claude_Form_Corpus_Mining_and_Defects_2026-08-18.md` STAYS** until the gap is closed. | The transit condition is not met: its rulings landed (FC-1–FC-14 at `#106`/`#108`, three queue rows closed in batch 60) but **no session-log entry names the mining session**, and its two deliverables exist in neither the repo nor project knowledge. It is currently the only surviving account of a mining pass over four form libraries, and it costs ~7.4 KB. |
| **TC-10** | **`Q-CAP-5(b)` — the ~700 KB re-split trigger — IS RETIRED.** The live log grows unbounded in `docs/record/`. The head file's 200 KB ceiling replaces it. | Splitting existed to keep the *synced* log small. Once the log is not synced its size costs nothing but a bridge read, and splitting actively hurts — it fragments the record across more files for no gain. **`Q-CAP-5(a)` and `Q-CAP-5(c)` are UNTOUCHED and still stand.** |
| **TC-11** | **Move 3 (superseded specs) gets its OWN pass, named as owed.** Not attempted tonight. | Identifying which of ~120 files in `docs/specs/` are genuinely superseded is a real audit and would have been guesswork at the end of a long session. Named as a **Fable** candidate — an audit with no prior art. Note the arithmetic: `docs/specs/` is **5,203,721 bytes, 91% of the synced scope** — this is where the remaining weight is. |
| **TC-12** | **200 KB HARD CEILING on the head file**, with the shortfall named in its banner whenever it binds. | ~70% headroom over the ~117 KB the rule yields today: high enough never to bind in normal operation, low enough to catch a pathological run of Code-only sessions. A truncated head that does not say it is truncated is the failure the naming requirement prevents. |

### §2.1 — Named and rejected, because the rejections encode rules

- **NOT** a flat count of N entries for the head — *because entry kinds interleave and a count can
  contain zero design rulings.* (TC-2)
- **NOT** a byte ceiling as the primary rule — *because reach would swing silently with entry
  length.* It survives only as the TC-12 backstop.
- **NOT** regenerating the index over the head entries only — *it would index only what is already
  present verbatim in the same file.* Named to be rejected, not offered.
- **NOT** keeping the abstract index synced whole — *154 KB and +25 KB/day fails the "capped or
  slow-growing" standard the whole restructure is measured against.*
- **NOT** folding `docs/archive/` into `docs/record/` — see TC-6.

---

## §3 — SPECIFICATION: `docs/specs/session-log-head.md` (OPERATIVE — the runner reads this)

**This is the ONLY part of the session-log record that reaches the design side.** It is **DERIVED**.
The log at `docs/record/session-log.md` is authoritative in every disagreement.

### §3.1 — Regeneration

**REGENERATE IN FULL, NEVER APPEND**, in the queue runner's Step 4 item 1b, over the log **as that
batch just wrote it**, riding the **same commit** as the entries it derives from. Same discipline
as TOC-4, for the same reason: an index that lands in a later commit than its subject is stale the
moment it is written.

**Never append a session-log entry to this file.** An entry written here and nowhere else is
destroyed at the next batch.

### §3.2 — Section 1: HEAD ENTRIES, VERBATIM

1. Parse the live log into entries on its `## ` headings.
2. Identify design `#nn` entries by the `(#nn)` token in the heading (TOC-6: the series is
   design-only; runner batches carry runner ordinals and other Code entries are unnumbered).
3. Take the **fourth most recent** design `#nn` entry and **every entry above it in the log**, in
   log order, newest first.
4. Copy them **byte-for-byte**. **Whole entries only** — never truncate one, never paraphrase, never
   summarize. Interleaved runner lines and unnumbered Code entries come with them.

*At authoring time this rule yielded **11 entries, 100,907 bytes including the log preamble**,
reaching back to `#123`.*

### §3.3 — Section 2: COMPACT INDEX, EVERY ENTRY IN THE LIVE LOG

One row per entry, newest first:

```
| date | #nn or — | design / runner / code | first 90 characters of the heading text |
```

- `date` — the `YYYY-MM-DD` at the head of the heading.
- `#nn` — the number if present, `—` if not.
- kind — `design` if numbered; `runner` if the heading contains `QUEUE-RUNNER batch`; `code`
  otherwise.
- text — the heading with the leading date, any `(#nn)`, and the following dash stripped, then the
  first 90 characters.

*At authoring time: **136 rows, 15,781 bytes, ~116 bytes per row.*** This section is what tells a
session with no bridge that an entry **exists**. It is never cut to make room (§3.5).

### §3.4 — Section 3: POINTERS

Name, as **bridge-only**, each of:

- `docs/record/session-log.md` — the live log, append-only, canonical.
- `docs/record/session-log-toc.md` — the full abstract index, one dense summary row per entry.
- `docs/archive/session-log-archive-2026-07-21_2026-08-12.md` — the CLOSED archive, entries older
  than the 2026-08-13 cutoff, with its own frozen index.

Carry the sentence, in the file's own words: **their absence from design-side retrieval is BY
DESIGN and is never evidence of absence.**

### §3.5 — The ceiling

**200 KB hard ceiling on the whole file.** If §1 + §2 + §3 would exceed it:

- drop the **oldest whole entries from §1** until it fits — one at a time, never a partial entry;
- **never cut §2 or §3**;
- and **NAME THE SHORTFALL IN THE BANNER**: how many entries were dropped, and which design `#nn`
  the head now reaches back to.

### §3.6 — Banner (regenerated with the file)

The file opens with a banner stating, at minimum: that it is **DERIVED** and the log at HEAD is
authoritative; that it is **REGENERATED IN FULL, never appended**; that it is **rewritten wholesale
and therefore cited by heading or quoted sentence, NEVER by line number** (CITE-STABILITY, ruled
2026-08-16); the rule that produced §1 (TC-2), stated in full so a reader can check it; the commit
it was generated at; and the shortfall sentence if §3.5 bound.

### §3.7 — What this replaces

The project instructions' start-of-session rule 1 — *"read the top 2–3 entries of
`docs/specs/session-log.md`"* — is satisfied by reading `docs/specs/session-log-head.md`. It is
**not** a licence to assert anything the head file does not contain: everything behind it is a
bridge read away, and rule 2 is unchanged.

---

## §4 — CAPTURE DISPOSITION (TC-7, TC-9)

Verified by **full-text reads of the log at HEAD**, not RAG — RAG absence is not evidence of absence.
Two facts frame it: **zero occurrences of the string `2026-08-21` anywhere in the live log**, and
`inbox/` empty at read time.

### §4.1 — LANDED — relocate to the ARCHIVE project (TC-7). Fifteen files.

| capture (project knowledge, `claude/` prefix) | filed session-log entry |
|---|---|
| `claude_Task19_Signoff_Worklist_Session_Capture_2026-08-17.md` | `#97` |
| `claude_Task19_Signoff_Walk_Session_Capture_2026-08-17.md` | `#98` |
| `claude_ChatDispatchV3_T20-T25_Session_Capture_2026-08-17.md` | `#99` |
| `claude_Fable_Adjudication_Session_Capture_2026-08-18.md` | `#100` |
| `claude_ChatDispatchV4_Chain_Session_Capture_2026-08-17.md` | `#102` |
| `claude_Audit_Corrections_Session_Capture_2026-08-18.md` | `#103` |
| `claude_Authority_Read_Session_Capture_2026-08-18.md` | `#104` |
| `claude_Fable_SpendDown_Adjudication_Session_Capture_2026-08-18.md` | `#105` |
| `claude_FC_Adjudication_Session_Capture_2026-08-18.md` | `#106` |
| `claude_Knowledge_Pruning_Session_Capture_2026-08-18.md` | `#107` |
| `claude_T26_GroupA_WS_FC_Adjudication_Session_Capture_2026-08-18.md` | `#108` |
| `claude_Grok_External_Review_Rulings_Session_Capture_2026-08-18.md` | `#111` |
| `claude_OPUS_RUN_FC13_and_WS3_Session_Capture_2026-08-18.md` | `#112` |
| `claude_Gate10_Frontend_and_Anon_Corrections_Session_Capture_2026-08-19.md` | `#116` |
| `claude_ChatDispatchV5_T1-T7_Session_Capture_2026-08-19.md` | `#117` (T1 named in the entry body) |

**Precedent and method:** `#107` (2026-08-18) retired 44 docs the same way — zipped losslessly with
a manifest, byte-verified against the pre-deletion inventory, delivered to Michael **before**
removal. **Relocation to ARCHIVE is not deletion**, and nothing here is deleted from anywhere until
it exists in ARCHIVE.

### §4.2 — NOT YET — unfiled, flagged, not relocatable. Nine files.

All eight root-level `2026-08-21` files (four handoffs and four captures) plus
`claude/claude_PROMPT_voice-walkthrough-disclosures_2026-08-21.md`, the prompt that fired them.
**Reason: no 2026-08-21 entry exists in the log and no packet exists on this machine.** They are the
sole record of four design sessions.

### §4.3 — STAYS — not captures. Four, plus the permanent set.

- `claude/claude_REQ-CAPTURE_disclosures-expert-designation_DRAFT_2026-08-20.md` — a **live working
  document** and **RECON-1's subject**; carries `Q1`–`Q10`, `ND-4`–`ND-9`, widgets `A`–`H`, and six
  unminted IDs (`FE-18`–`FE-22`, `CD-14`). Its canonical repo path is stated on its face as
  `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` and **it is not there yet.**
- `claude/claude_Knowledge_Repo_Acquisition_List_2026-08-18.md` — a live acquisition list for
  Michael's hand, ~19 open rows keyed to other registers, nothing done.
- `claude/claude_Form_Corpus_Mining_and_Defects_2026-08-18.md` — **TC-9**.
- The permanently-carried three (Bexar monitoring-court forms, NVIDIA transcription memo, LegiScan
  fixture) and the probate index set — unchanged by anything here.

### §4.4 — TWO OPEN THREADS FOUND WHILE VERIFYING, neither closed here

- **A MISSING SIBLING.** `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` is named by two
  separate files as **unfiled and unreconciled**. It is in neither the repo nor project knowledge.
  Still owed from Michael's hand.
- **TWO DELIVERABLES THAT MAY EXIST NOWHERE.** `form-corpus-mining-2026-08-18.md` and
  `form-defects-found-2026-08-18.md` were handed over in chat and are in neither the repo nor
  project knowledge. If they were not saved, the mining pass survives only in the TC-9 capture.

---

## §5 — THE TRANSIT LINE (TC-8)

Every capture a future design session writes carries this on its face, immediately beneath its
existing status line:

```
**TRANSIT — this file is not a resident of project knowledge.** It leaves for the LEGAL AUTHORITY
ARCHIVE project, by Michael's hand, once BOTH conditions hold: (1) its session-log entry is filed
at HEAD, and (2) every document its routing table names exists at its canonical repo path. VERIFY
both by full-text read at HEAD before relocating — RAG absence is not evidence of absence.
RELOCATED, NEVER DELETED.
```

**Where it is written into practice:** the `refresh-chat` skill's capture format, and the project
instructions' knowledge-working-set section (v26). **A capture that does not carry the line is not
thereby exempt** — the condition is a property of the content, not of the sentence.

---

## §6 — WHAT IS STILL OWED

| ID | owed | to whom |
|---|---|---|
| **TC-OPEN-1** | The `attorney-review-queue.md` (~0.87%/day) and `BUILD-STATE.md` (~0.20%/day) growth sitting — TC-1's deferral, plus §1.4(b)'s line-cap-vs-byte-growth finding. | Its own design sitting |
| **TC-OPEN-2** | **Move 3** — the superseded-specs audit over `docs/specs/` (5,203,721 bytes, 91% of the synced scope). Named a **Fable** candidate: an audit with no prior art. | Its own sitting |
| **TC-OPEN-3** | Close the TC-9 gap: either a correction-class log entry records the 2026-08-18 form-corpus mining session, or Michael confirms the two deliverables are saved. Then the capture relocates. | Michael / next design session |
| **TC-OPEN-4** | Hand in `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` — §4.4. | Michael's hand |
| **RECON-1** | **NOT this session's work and expressly still owed.** The disclosures REQ-CAPTURE first application — **first application, not edit**. | The next disclosures design session |
| — | The federated-projects question (Solution Two's carve lines) — **expressly deferred to its own bridge sitting; not started here.** | Its own sitting |
