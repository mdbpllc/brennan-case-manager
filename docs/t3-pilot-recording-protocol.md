# T3 Pilot-Recording Protocol — staging, naming, format, and metadata for the 13 Phase 0 recordings

**Status: PROPOSED — PREPARATION ONLY. This document authorizes nothing, stages nothing, and
verifies nothing.** It is CHAT-DISPATCH Task 16, written design-side by an Opus 5 Cowork session on
2026-08-16 Central (DT-1). Michael did not participate and made no rulings. Every rule below is a
proposal until he rules it; every question in §8 is his.

**Provenance marks, used per item and never stripped:**

- `R` — read full-text in the repo at HEAD `c75e1639` through the device bridge this session.
- `K` — `claude_NVIDIA_Transcription_Stack_Capabilities_2026-07-24.md`, project knowledge (carried
  file; **not in the repo and has no repo path** — the 2026-07-26 cite correction).
- `I` — an inference drawn in this session from `R`/`K` material. **Marked wherever it appears.**
  An `I` is not a finding; it is a reading offered for Michael to accept or reject.

---

## 0. What this is, what it is not, and the two gates above it

### 0.1 The naming collision, resolved at the top so nothing below is ambiguous

`T3` names **two unrelated build tiers** in this repo, and they gate oppositely (`Q-WF-2`, `R`).
**This document means the TRANSCRIPTION pipeline service** — `transcript-sort-and-route-design.md`
§11-T3 — **and never the LegiScan poller tier** at `statute-text-and-bill-tracking-design.md:107`,
which is substantially built. The collision is FLAGGED, not renamed; re-lettering is Michael's act.

### 0.2 T3 work is UNAUTHORIZED, and this document does not change that

`KICK-1` is open (`R`): `KICKOFF-phase0-t3-p1-session_2026-08-08.md` is **absent from the P1 inbox
and was never tracked by git**, so the loss cannot be dated or recovered from history — and that
document is *"the authoritative text of that authorization and its stage definitions."* **Until
Michael locates it or re-issues the remaining authorization in his own words, further T3 work is
unauthorized.**

A protocol is not the work. This document describes **how the recordings should be staged, named,
formatted, and described** so that whenever HK-4 is executed and KICK-1 is resolved, Stage 1 finds
the material in a state it can use. Writing it does not start it.

### 0.3 The other gate, which is about the machine rather than the authorization

**Telemetry lockdown is NOT in place and was CONFIRMED NOT SET on 2026-08-13** (`R`, #66): Michael
ran the self-check and *both* machine-scope variables came back empty. The standing rule attached to
it is **"No privileged audio before then."** Recipe: `docs/gpu-telemetry-offline.md`.

Whether that rule reaches this particular batch is a real question, not a formality — see `Q-T3P-6`
(§8). The recordings are **fictional-content, verified as such at the source** (§1.1), which is why
their transcripts were allowed into the repo at all. Michael decides whether "privileged audio"
covers fictional audio recorded in his own voice on his own device.

### 0.4 What this document is NOT

- **Not an authorization** to run Stage 1, transcribe anything, or touch the GPU stack.
- **Not a preflight pass.** The audio row stays RED (`R`, `phase0-environment-standup-2026-08-09.md`
  §1) until Michael answers it. This session did not attempt to answer it (§6).
- **Not a replacement for the provenance README that already exists** (§1.1). If that README states
  a convention different from anything below, **the README wins and this document is the one that
  gets corrected** — see `Q-T3P-1`.
- **Not a design of the ingest pipeline.** Ingest identity, head-padding, and the working-copy
  transcode are already specified at `transcript-sort-and-route-design.md` §1 (`R`) and are
  *incorporated by reference*, not restated or amended.

---

## 1. The 13 recordings — what they are and what they collectively exercise

### 1.1 The finding that reframes HK-4: this bundle already exists, already staged, with a README

**HK-4 reads as a fresh act and the record says it is a move.** The queue row (`R`) says: *"stage
the 13 pilot recordings into `..\data` (create the directory at staging time, outside the repo
tree)."* BUILD-STATE line 29 repeats it. Both are written as though the material were to be
assembled from nothing.

**The 2026-07-25 Code-session entry says otherwise, in terms** (`R`, `session-log.md`, the entry
headed *"2026-07-25 (§10 decisions made; pilot fixtures wired; Office notes built — Code session)"*):

> **A note on how that entry is cited here, and why no line number appears.** At HEAD `c75e1639` the
> quoted sentence sits at `session-log.md:8760`. **It will not stay there.** The log is append-at-top,
> so every new entry pushes it down — the defect reported at #89 item 3 and proven there: #88's cite
> of `session-log.md:7170` was accurate when written and now points to 7404, off by exactly the 234
> lines #88's own commit added. **A line cite into that file is true when written and false when
> committed.** Every reference to the session log in this document therefore locates by **entry
> heading and date**, which do not move.

> *"Michael provided `phase0-test-recordings.zip` — 13 recordings, both transcript JSONs (Parakeet
> int8/CPU floor), ground-truth scripts, scorecard, findings. All fictional (verified). Audio + docs
> archived at `..\data\pilot-recordings\` (provenance README; outside repo per convention);
> transcripts committed as fixtures under `src/routing/__tests__/pilot/` with the fictional universe
> rebuilt from the scripts."*

Five things follow, and they change what HK-4 costs:

1. **The bundle has a name:** `phase0-test-recordings.zip`.
2. **It was already archived at `..\data\pilot-recordings\`** — the exact directory HK-4 asks to be
   created — **with a provenance README already written.**
3. **It contains more than audio:** both int8 transcript JSONs, the ground-truth scripts, the
   scorecard, and the findings. **Staging only the audio would leave Stage 1's comparison baseline
   behind**, and Stage 1's whole job is a comparison.
4. **It is attested fictional at the source** — *"All fictional (verified)"* — by the session that
   handled it, which is why the transcripts were repo-safe.
5. **`I` — it is on the P15, not the P1.** That session ran 2026-07-25; the P1 Gen 8 was still a
   *planned purchase* on 2026-07-25 (`K` §8) and was not stood up until 2026-08-09 (`R`). The only
   machine that existed then was the P15. This is consistent with the independent fact that
   `..\data\pfs\` is *"NOT present on the machine that ran this refresh … it lives on the other
   machine"* (`R`, BUILD-STATE line 74) — **the same `..\data` root, the same absence, on the same
   machine.**

**Consequence, PROPOSED:** HK-4 is most likely a **P15 → P1 transfer of an existing, documented
archive**, not a staging act performed from scratch. That is cheaper and it is also more dangerous:
a fresh staging act invents conventions freely, while a transfer can silently **overwrite or
contradict a provenance README that no design session has ever read.** §5 is written accordingly.

### 1.2 Batch 1 — eight unscripted recordings, `rec_3` … `rec_10`

Recorded by Michael on an **iPhone 14 Pro, Voice Memos, compressed AAC ~70 kbps mono** (`K` §12) and
first transcribed with Parakeet-TDT-0.6b-v3 **int8 ONNX on CPU — the model's worst shipping
configuration** (`K` §10). Those results are the **quality FLOOR**, deliberately.

What the eight cover, from `K` §10 (one line each; the mapping of finding → file is in the
provenance README and the fixtures, not here — see §2.3):

| # | What it exercises | The observed floor behaviour |
|---|---|---|
| 1 | **Clean task dictation** | Near-perfect; "MSJ" survived; **three cleanly extractable action items** |
| 2 | **Spoken-tag routing** | Tag TEMPLATES survived even where slot entities garbled; matter names (Jones, Hernandez) perfect |
| 3 | **Adjuster call** | *"the Jester for Stot"* = *"the adjuster for State Farm"* — the canonical word-boosting target |
| 4 | **Cause number spoken as words** (`rec_10`) | *"twenty twenty five CI zero four nine six two"* survived as words; normalization + fuzzy match is the fix, not better audio |
| 5 | **Claim numbers** | Garbled twice — fuzzy match against the short list of known identifiers |
| 6 | **Noise** | Decoded as **multilingual token bleed** (Cyrillic/Greek fragments) on int8; expect less at full precision |
| 7 | **Far-field, ~71 s, walking around** | Degrades hard — this is the recording that makes §9's lavalier guidance load-bearing |
| 8 | **Two voices** | **HELD BACK. Never transcribed in the int8 run** — reserved for the diarization test that needs the NeMo/GPU environment |

**Numbering note, and it is a constraint rather than trivia:** the identifiers begin at **`rec_3`**,
not `rec_1`. Whatever the reason, **the numbering is already fixed** and shipped tests assert against
it (§2.1). Nothing in this protocol renumbers anything.

### 1.3 Batch 2 — five scripted takes, scored against ground truth

Michael recorded all five test scripts; scored at the same int8-CPU floor (`K` §11). Raw WER
25–48%, **inflated by formatting mismatches, one ad-lib, and eaten openings** — the memo says in
terms that item-level results are the real measure.

| # | What it exercises | The observed floor behaviour |
|---|---|---|
| 1 | **Tag battery** | **6/6 routable**, including *"Adjuster call, State Farm"* — batch 1's worst miss — and a perfect cause number |
| 2 | **Identifier battery** | Phone + extension, CPT, ICD, §18.001, Rule 199.1, dates **all perfect**; claim number fuzzy-recoverable; **"Stowers" → "Stours"** and **"counter-affidavit" destroyed** — the two named firm-glossary boosting targets |
| 3 | **Task dictation (scripted)** | **Action items 3/3 extractable** |
| 4 | **Two-person take** | Offer / recommendation / authorization chain **fully reconstructable**; dollar trail error-free |
| 5 | **A take carrying an ad-lib** | Inflates raw WER against its script — the reason item-level scoring is the real measure |

**Two findings inside batch 2 that a Stage 1 session must not re-litigate:**

- **The "thirty-five vs thirty thousand" discrepancy is RESOLVED** (`K` §11, 2026-07-25): **Michael
  misread the script aloud.** The model transcribed what was said, correctly. The lesson recorded
  there runs in reverse — *the audio plus the transcript is the record; humans mis-speak and
  mis-remember.* A full-precision rerun will reproduce this "error" and it is not one.
- **Openings were eaten on 3 of 5 takes** — the first 1–3 s decode as foreign-token bleed while
  language auto-detect stabilizes, **and the spoken tag lives exactly there.** The four named
  mitigations (pre-record buffer, pause habit, English-pinned first pass on the GPU build,
  silence-padding at ingest) are already specified at `transcript-sort-and-route-design.md` §1
  (`R`) — *"head-pad 0.5–1.0 s of silence before transcription."*

### 1.4 Two multi-speaker candidates, not one — stated because the record names only one

`K` §10 holds back a **two-voice recording in batch 1** for diarization. `K` §11 separately scores a
**two-person take in batch 2**. **These are described as two different recordings in two different
batches**, and only the first is characterized as *held back*. `I` — Stage 1's diarization exercise
therefore has at least two candidate inputs, and the batch-2 take has the additional property of a
**known script**, which the held-back one does not. Whether both are run is a Stage 1 design choice;
this document only records that the record names two.

### 1.5 The measure is NOT the same for both batches, and the authorization's phrasing hides it

The Phase 0 + T3 authorization (`R`, `rulings-capture-2026-08-07b.md` Part 8) says Stage 1
*"rerun[s] the pilot and scripted batches at FULL PRECISION with word boosting **against the existing
ground truth**."*

**Ground truth exists for five of the thirteen.** Batch 2 is scripted, so it has ground truth. Batch
1 is **unscripted** — its "existing" artifact is the **int8/CPU-floor transcript JSON**, which is a
prior *output*, not a truth. So:

- **Batch 2 (5 files) → an ACCURACY measure.** WER and item-level scoring against the scripts.
- **Batch 1 (8 files) → a CHANGE measure.** int8 → full precision + boosting, judged as a delta
  against the recorded floor behaviours in §1.2. **Calling that a WER would be wrong.**

`I` — a scorecard that reports one number over thirteen files would be reporting two different
things under one heading. The distinction is proposed here so the scorecard can be built to it.

### 1.6 What the thirteen do NOT exercise — the coverage gap, stated plainly

This is the most useful thing in §1, because everything above is what the batch *does* prove.

- **No long-form audio.** All thirteen are short phone memos. **The only duration the record states
  for any of them is ~71 s** (the far-field walking recording); the rest are characterized by content
  rather than by length, and none is described as long.
  **The Statement Bank's actual use case — deposition-length audio — is untested**, and it is the
  one that touches Parakeet's long-audio path, `canary-1b-v2`'s single-file long-form mode, and
  long-run activation growth. Phase 0's own standup says the 79 MiB / 20 MiB activation figures are
  3-second datapoints that **must not be extrapolated to minutes-long recordings** (`R`).
- **The 4-speaker cap is untested.** Maximum speakers across the batch is two; Sortformer's hard cap
  is four with degradation at five-plus (`K` §1b). Group meetings and multi-party depositions —
  the named edge case — have no pilot input at all.
- **No Spanish.** The authorization contemplates a *"Spanish trial if Michael records one"* (`R`);
  none exists. `K` §2 flags that the 25-language set is **European Spanish** and that Texas/Mexican
  Spanish is untested, and `K` §1b flags that diarization specifically may degrade on non-English
  speech. **Two untested things, not one.**
- **Nothing from the planned capture kit.** All thirteen are phone captures. **The Tascam DR-05XP
  and the SmartLav+ are not purchased** — the queue row says *"standing recommendation, not gating
  anything. Carried"* (`R`). So no pilot recording exercises the 32-bit-float path, the pre-record
  buffer, the lavalier, or the concealed-capture degradation `transcript-workflows.md` §9 warns
  about.
- **No word boosting has ever run**, on any recording, anywhere. `K` §10's untested list names it,
  and Phase 0's standup confirms nothing needing real speech has executed (`R`).

`I` — the honest summary: **the thirteen exercise the routing layer thoroughly and the transcription
layer narrowly.** They were assembled to prove sort-and-route, and they did — 43 tests green,
all 13 behaving as the design predicts (`R`, `session-log.md:8760`). They were never assembled to
characterize the ASR stack across its operating range, and Stage 1 should not be read as doing so.

---

## 2. File naming

### 2.1 The identifiers already exist and shipped code asserts against them

`src/routing/__tests__/pilot/` holds `transcripts-batch1.json` (8 unscripted, `rec_3`–`rec_10`),
`transcripts-batch2.json` (5 scripted takes), `pilot.test.ts`, and `pilotUniverse.ts` (`R`,
directory listing only — see §2.3). `pilot.test.ts` **already asserts routing behaviour against them
as verbatim int8/CPU-floor output** (`R`, `phase0-environment-standup-2026-08-09.md` §4).

**Therefore: the transcript identifiers are load-bearing in shipped code, and no naming rule may
change them.** Any scheme that renumbers or re-slugs the thirteen breaks the fixture linkage
silently — the tests would still pass against transcripts while the audio no longer maps to them.

### 2.2 The original audio filenames collide, by the recorder's design

`K` §12 is explicit: **Voice Memos reuses "New Recording N"**, and *"the two pilot batches literally
collided on names."* That collision is the origin of the ingest rule at
`transcript-sort-and-route-design.md` §1 (`R`): **identity is SHA-256 content hash + recorded-at
timestamp + duration — never filenames.**

So the thirteen arrive with names that are (a) not unique, (b) not descriptive, and (c) not the
identifiers the tests use.

### 2.3 The mapping between the two is in a file no design session can read

Which audio file is `rec_7` is recorded in **the provenance README inside `..\data\pilot-recordings\`**
(`R`, the 2026-07-25 pilot-fixtures entry) and, derivatively, in the fixtures.

**The fixtures are under `src/`, and this session did not read them.** `Q-PR3-1` asks whether a
design-side `src/` read through the device bridge is sanctioned at all — *the working-set policy says
design sessions do not read source, that sentence predates the bridge*, and the question is
**UNRULED** (`R`, BUILD-STATE line 108). The directory listing in §2.1 is metadata; the transcript
contents were deliberately left unread. §1's per-recording characterizations are therefore built
**entirely from `K` §§10–12**, which is exactly the source Task 16 names.

`I` — the mapping is consequently recoverable from three places, in descending order of directness:
the provenance README (Michael's hand, or a ruled `src/` read); the fixture JSONs (gated on
`Q-PR3-1`); or, if both were lost, **by content** — matching each audio file's transcript to a
fixture entry, which is precisely the SHA-256-plus-timestamp identity the ingest design already
specifies. The third path works but is expensive, and it is the reason §5's manifest matters.

### 2.4 The naming rule — PROPOSED

**Do not rename the audio files if the provenance README already names a scheme.** Adopt what is
there (`Q-T3P-1`). If and only if no scheme exists, the following is proposed:

```
<batch>-<id>-<slug>.<ext>
```

- `<batch>` — `b1` (unscripted) or `b2` (scripted).
- `<id>` — **the existing transcript identifier, verbatim**: `rec_3` … `rec_10` for batch 1, and
  for batch 2 whatever key `transcripts-batch2.json` already uses. **This field is copied, never
  minted.**
- `<slug>` — two-to-four lowercase words describing **what it exercises**, from §1.2/§1.3:
  `far-field-walk`, `cause-number`, `tag-battery`, `two-voice-held`, `identifier-battery`.
- `<ext>` — **the extension of the file as delivered.** `.m4a` for the AAC originals. Not `.wav`.
  A working copy is a different file (§4.4).

Worked examples: `b1-rec_10-cause-number.m4a` · `b2-<key>-tag-battery.m4a`.

**Renaming is a copy-then-verify, never a move**: hash before, hash after, confirm identical. A
rename that silently re-encodes is the failure this whole section exists to prevent.

### 2.5 No client-identifying filenames or metadata — the rule, and why it binds here anyway

Standing convention: **no real client data in the repo, fixtures, or any handoff artifact — ever**
(project instructions). And **filenames alone can carry client information** — that is the reasoning
of HK-5 itself (`R`).

These thirteen are attested fictional (§1.1), so the rule is not *protecting* anything in this batch.
**It binds anyway, for two reasons.** First, the same protocol will govern the first real recording,
and a convention learned on safe material is the only kind that is safe when the material is not.
Second, the slug vocabulary in §2.4 is deliberately **functional rather than descriptive** —
`two-voice-held`, not the names of the two voices — so that the scheme cannot become unsafe by being
used as intended.

**Concretely barred in filenames and in every metadata field of §5:** party or client names, matter
names, cause numbers, claim numbers, provider names, dates of incident, and phone numbers. Note that
the *fictional* universe deliberately contains several of these (Jones, Hernandez, Ramirez,
2025-CI-…) — **the bar is on the field, not on the sensitivity of this batch's particular values.**

---

## 3. Staging OUTSIDE the repo tree — the `..\data` convention and why it is out-of-tree

### 3.1 The convention, as it stands on the record

- *"Transcript **TEXT** only; **audio never enters the repo** (`..\data\` convention)"* — the
  authorization itself (`R`, `rulings-capture-2026-08-07b.md` Part 8, line 162).
- HK-4: *"stage the 13 pilot recordings into `..\data` (create the directory at staging time,
  **outside the repo tree**)"* (`R`).
- Resolved against the repo root `C:\Users\Brennan\brennan-case-manager`, `..\data` is
  **`C:\Users\Brennan\data`** — the resolution BUILD-STATE itself uses when it re-checks (`R`,
  line 29).

### 3.2 Why out-of-tree rather than merely gitignored — four reasons, and only one is obvious

1. **`.gitignore` protects only what it lists, and `data/` is not on it** (`R`, read in full this
   session). `inbox/` is listed — *"Queued push-to-code packets (transient freight; never
   committed)"* — and `data/` is not, **because it is not inside the tree and therefore has nothing
   to be listed against.** Out-of-tree is not a stronger form of ignoring; it is a different
   mechanism.
2. **Git history is forever, and this project has already ruled that it cannot be cleaned.** GH-1
   (`R`) considered rewriting history to purge two identifying strings and **ruled ACCEPT — history
   stands** — because a rewrite invalidates every commit sha the session log cites as record, forces
   re-clones on both machines, and needs MM-1 coordination throughout. **A single stray `git add -A`
   that catches an audio file is therefore permanent by ruling.** Physical distance from the tree is
   the only mechanism that cannot fail this way.
3. **Size.** Thirteen files is trivial, but the convention has to survive the retention policy behind
   it — *keep all audio, compressed* (`transcript-workflows.md` §1 decision 6, `R`) — which is a
   corpus that grows without bound.
4. **It matches the posture already used for every other out-of-tree artifact**: `..\data\pfs\` for
   the Medicare PFS CSV, `..\probate_knowledge_corpus.md` for the probate corpus, `~/phase0/` for
   the model environment — *"None of `~/phase0/` is in the repo, and no audio, fixture or otherwise,
   has entered it"* (`R`, §6).

### 3.3 `..\data` is SHARED, and the convention is not uniform — flagged, not tidied

`..\data` already has at least two occupants on the record: **`..\data\pfs\`** (Benchmarks import,
`R`) and **`..\data\pilot-recordings\`** (§1.1). So `..\data` is a **general out-of-tree data root
with per-purpose subfolders**, not a T3 directory. Anything written into it must assume neighbours.

The convention is also **not applied at a consistent level**: the probate corpus is parked at
`..\probate_knowledge_corpus.md` — the *v0.1 folder root*, a sibling of `data\` rather than a child
(`R`, `session-log.md`, 2026-07-24). **Flagged, not normalized.** Normalizing it would move a file
holding licensed material and privileged client matter, which is not a design session's act.

### 3.4 Where the working copies go — the WSL2 I/O rule

The authorization is explicit (`R`, Part 8): *"copy files **INTO** the WSL filesystem for
processing; only the watch-and-grab step touches the Windows mount (`/mnt/c` I/O is WSL2's weak
spot)."*

So the staging layout has **two locations and they are not the same one**:

| | Location | Holds | In the repo? |
|---|---|---|---|
| **Archive** | `C:\Users\Brennan\data\pilot-recordings\` (Windows) | originals as delivered, the provenance README, the §5 manifest, the ground-truth scripts, the scorecard | No — outside the tree |
| **Working** | inside the WSL filesystem, alongside `~/phase0/` (**not** `/mnt/c`) | derived 16 kHz mono WAV working copies, run outputs | No — `~/phase0/` is outside the repo by construction |

**Neither is `inbox/`.** `inbox/` is packet freight and is collected by the queue runner; an audio
file parked there is adversarially parked, which is the hazard `OPEN-3` already flags about a
non-packet zip (`R`).

### 3.5 The machine: P1 Gen 8 only, never the P15 — and the direction of the move

**P1-only is a measured fact, not a preference.** `rulings-capture-2026-08-08d.md` (`R`):
*"transcription/T3 is P1-only by measured fact (**4 GB VRAM on the P15 against T3's 8 GB floor —
preflight failure, not preference**); all other work runs on either machine."*

The P1 Gen 8 measures **RTX PRO 2000 Blackwell, 8151 MiB**, driver 595.71, Ubuntu 24.04.4 on WSL 2
with CUDA passthrough verified, 955 G free in the WSL filesystem (`R`, standup §1). The stack —
torch cu128, NeMo 3.0.0, both D4-pinned checkpoints — is installed at `~/phase0/` on that machine
and nowhere else.

**So the staging act is a transfer with a direction:** `I` — from the P15, where §1.1 places the
existing archive, **to the P1**, which is the only machine that can run it. And the transfer is
**Michael's hand end to end**, because MM-1's reasoning applies with full force: **inboxes never
sync, and neither does `..\data`** — `..\data\pfs\` being present on one machine and absent on the
other is the same fact demonstrated twice (`R`).

**Consequence worth stating: staging is not idempotent across machines.** After HK-4 is executed,
`..\data\pilot-recordings\` exists on both machines with different lifecycles. Nothing keeps them in
step, and no session should assume a file it saw on one is present on the other.

---

## 4. Format expectations

### 4.1 The kit standard, and what it actually governs

`transcript-workflows.md` §9 (`R`) specifies the capture kit: **Tascam DR-05XP** handheld recorder
(32-bit float WAV, clip-proof capture, dictation mode, low-cut filter, **~2-second pre-record
buffer**, ~17 h on AA), **Rode SmartLav+** lavalier into the 3.5 mm input, and:

> **"Recommended settings: 48 kHz WAV, 32-bit float.** Higher sample rates (96 kHz) add file size,
> not transcription accuracy — ASR models consume 16 kHz mono internally."

**That standard governs FUTURE captures. It cannot govern these thirteen, and the kit is not
purchased** (`R`, queue row 864 — *"standing recommendation, not gating anything"*).

### 4.2 The thirteen are a fixed historical artifact — preserve, do not upgrade

All thirteen are **iPhone 14 Pro, Voice Memos, compressed AAC ~70 kbps mono** (`K` §12). That is
lossy, single-channel, and roughly two orders of magnitude below the kit standard in dynamic range.

**PROPOSED, and it is the operative rule of this section: preserve them bit-exact as delivered. Do
not re-encode, do not up-sample, do not convert to WAV "to match the standard," do not normalize
level, do not trim silence.** Three reasons:

1. **They are the comparison baseline.** Their int8 results are the recorded floor (§1.5); a
   re-encoded file is not the same input and the delta stops meaning what it is supposed to mean.
2. **Up-converting lossy audio adds no information.** A 48 kHz 32-bit float file derived from a
   70 kbps AAC source is larger, not better, and it *looks* like kit-standard material to anyone who
   reads only its header. That mislabelling is the real hazard.
3. **The 2026-08-09 exception forbids substitution in terms:** *"no synthetic, substitute, or
   fixture audio may stand in for the recordings"* (`R`). §4.4 addresses where the line falls.

`K` §12 does record the fix **for next time**: *Settings → Voice Memos → Audio Quality → Lossless.*
That is a forward-looking instruction and changes nothing about the existing thirteen.

### 4.3 Handling lesser sources — the general rule

For anything that is not 48 kHz / 32-bit float — which today is **everything**:

- **Record the true delivered characteristics in the metadata line** (§5): container, codec,
  nominal bitrate, sample rate, bit depth, channel count. **Never the aspirational ones.**
- **Never up-convert to reach the standard.** Down-conversion to the pipeline's 16 kHz mono is a
  derived working copy and is fine (§4.4); up-conversion is cosmetic and misleading.
- **Expect the known degradations and do not read them as stack failures.** `K` names them:
  far-field degrades hard (§1.2 #7); a recorder concealed in a briefcase gives muffled highs,
  elevated WER, and degraded diarization (`transcript-workflows.md` §9); noise decodes as
  multilingual token bleed at int8 (`K` §10).
- **Flag, do not silently accept, any file whose delivered characteristics differ from its manifest
  line.** A mismatch is evidence the file was touched.

### 4.4 The derived working copy, and the line the substitution bar actually draws

`transcript-sort-and-route-design.md` §1 (`R`) already specifies: *"Transcode a **16 kHz mono WAV
working copy** for the pipeline; the original is retained until the post-transcription Opus archival
transcode, which remains the permanent copy."* And §1 also specifies *"head-pad 0.5–1.0 s of silence
before transcription"* — a **transformation applied to the working copy**, addressing the eaten
openings (§1.3).

`I` — so a Stage 1 session will hold, per recording, an original and at least one derived file that
differs from it deliberately. **A derived working copy is not "substitute audio."** The 08-09
exception bars *standing in for* the recordings — using synthetic tones, fixture audio, or a
different recording in place of one that is missing. It does not bar the documented transcode the
design already requires. **Proposed so that a Stage 1 session does not trip its own gate:**

- The working copy is **named as derived**, hashed, and traceable to its original's hash.
- **The original is never overwritten**, and the archive copy is never the file the pipeline reads.
- **Every transformation applied to a working copy is recorded** — head-pad length, resample rate,
  channel mixdown — because each one is a variable in a measurement.

This reading is `I`, not a ruling. `Q-T3P-5` puts it to Michael.

---

## 5. The per-recording metadata line

### 5.1 What it is and where it lives

**One line per recording, thirteen lines, in a single manifest file kept beside the audio** at
`C:\Users\Brennan\data\pilot-recordings\` — **outside the repo, like everything else in that
folder.** It is machine-readable enough to check against and short enough to read.

**PROPOSED name:** `pilot-manifest.tsv` (tab-separated; commas appear in free text, tabs do not).

**It does not replace the provenance README that already exists** (§1.1). If that README already
carries per-recording detail, the manifest is generated **from** it, and any disagreement is
reported rather than resolved — `Q-T3P-1`.

### 5.2 The fields

| # | Field | Source | Notes |
|---|---|---|---|
| 1 | `id` | the existing transcript identifier | `rec_3` … `rec_10`; batch-2 keys as they are. **Copied, never minted** (§2.1) |
| 2 | `batch` | `1` or `2` | unscripted / scripted |
| 3 | `filename` | as staged | per §2.4 |
| 4 | `sha256` | computed on the file **as delivered** | the identity anchor; recomputed after any copy |
| 5 | `bytes` | file size | the cheap corroborator of #4 |
| 6 | `duration_s` | audio metadata | part of the ingest identity triple |
| 7 | `recorded_at` | audio metadata; **fallback: file mtime, marked as a fallback** | **DT-1: Central wall-clock, never a container's UTC.** Record the offset explicitly |
| 8 | `capture` | device + app | `iPhone 14 Pro / Voice Memos` for all thirteen |
| 9 | `format` | container, codec, bitrate, sample rate, bit depth, channels — **as delivered** | e.g. `m4a/AAC/~70kbps/mono`. **Never aspirational** (§4.3) |
| 10 | `exercises` | one short phrase | from §1.2 / §1.3; the same vocabulary as the §2.4 slug |
| 11 | `ground_truth` | script identifier, or `none` | batch 2 only; **this is the field that makes §1.5's distinction visible** |
| 12 | `held_back` | `yes` / `no` | `yes` for the batch-1 two-voice recording (§1.2 #8) |
| 13 | `content` | `fictional-verified` + pointer | pointer to the 2026-07-25 attestation — **by entry heading, never by line number** (§1.1) |
| 14 | `notes` | free text, **functional only** | no client-identifying content, per §2.5 — including for fictional values |

**Fields 4, 6, and 7 together are the ingest identity triple** the design already specifies
(`transcript-sort-and-route-design.md` §1, `R`). They are in the manifest so the archive and the
pipeline agree on what a recording *is* — and so the §2.3 mapping is recoverable by content if
every human-written index were lost.

### 5.3 A worked line (illustrative — values are placeholders, not measurements)

```
id       batch filename                        sha256    bytes  duration_s recorded_at              capture                     format                 exercises        ground_truth held_back content            notes
rec_10   1     b1-rec_10-cause-number.m4a      <sha256>  <n>    <n>        2026-07-2? HH:MM -05:00  iPhone 14 Pro / Voice Memos m4a/AAC/~70kbps/mono   cause-number     none         no        fictional-verified spoken-as-words; normalizer + fuzzy-match target
```

**Every value above marked `<…>` or `?` is unmeasured.** This session did not open, hash, or stat any
audio file — it has never had access to one (§6). The line is a **shape**, not data.

---

## 6. H5 restated, and what this session actually did

### 6.1 The rule, as ruled

**HK-5, RULED 2026-08-13, ADOPTED WITH A CAVEAT** (`R`, the queue's HK-5 row, and mirrored verbatim
in `CLAUDE.md`'s conventions list — *"Preflight rows and questions about Michael-supplied material
are answered by Michael first — never by sweeping his machine unprompted…"*):

> **Preflight rows and questions about Michael-supplied material are answered by Michael FIRST —
> never by sweeping his machine unprompted, because filenames alone can carry client information.**
> The caveat, which is part of the ruling: **when Michael cannot recall, he MAY DIRECT a search, per
> instance — the search is his call, never a session's default.**

Its origin is exactly this task's subject matter: the 2026-08-09 T3 kickoff session proposed a
recursive `$env:USERPROFILE` sweep for `*.m4a`/`*.wav`/`*.mp3` and **it was refused design-side — the
listing is itself an exposure** (`R`).

### 6.2 What that means for this protocol, operationally

- **Claude never sweeps the machine for the recordings.** Not to confirm they exist, not to find
  where they went, not to check whether HK-4 has been done. Not even with the device bridge granted.
- **Michael stages the recordings and answers the preflight rows.** A session re-runs the audio row
  *after* he reports it, and Stage 1 then proceeds under the original 2026-08-07 authorization —
  **no new ruling needed** for that step (HK-4's own text, `R`). KICK-1 remains separately open.
- **A session may verify a path Michael has named**, because he named it. It may not go looking for
  one he has not.
- **The bridge does not change this.** A granted folder is a grant to *that folder*, and it is not
  standing permission to enumerate anything else.

### 6.3 What this session did, disclosed rather than assumed

- **Granted: one folder**, `C:\Users\Brennan\brennan-case-manager`, requested for repo reads and the
  packet save. **The `Documents\Knowledge Repo` folder was NOT requested** — BUILD-STATE line 111
  advises granting both, and this task raised no statute, rule, or regulation look that would use it.
  Recorded so the omission is a choice on the record rather than an oversight. **HK-7 stays open.**
- **No audio file was located, listed, opened, hashed, or stat-ed.** No directory outside the granted
  repo folder was listed.
- **One incidental, name-level observation, disclosed in full:** `get_device_info` — the call
  required to identify a folder before requesting it — returns the names of top-level home
  directories. **On `mdb-pllc` there is no `data` directory at the home root**, and no `.claude`
  directory either. **This names no file and enumerates no contents.** It corroborates BUILD-STATE's
  own re-check (*"`C:\Users\Brennan\data` DOES NOT EXIST here"*, `R`) and adds nothing to it. **It
  does not answer the preflight row, and this session does not treat it as answering it.** `I` — the
  absent `.claude` at the home root is *consistent with* mdb-pllc being the P1, which log #42
  recorded as having no user-level runner copy while the P15's deletion remains outstanding. **That
  is a candidate datum for `OPEN-3`, not a closure** — `OPEN-3` is answered by Michael in one word.

---

## 7. The preflight rows Michael answers — the worklist this protocol serves

Restated from `phase0-environment-standup-2026-08-09.md` §1 (`R`), with only the audio row live:

| Row | Status on the record | Who |
|---|---|---|
| Machine · GPU/VRAM · driver · WSL2 · disk · fixture rider | **6/7 GREEN**, measured 2026-08-09 | done |
| **Audio — pilot + scripted recordings reachable** | **RED. `..\data` did not exist on the P1; recordings NOT STAGED.** Narrow exception ruled 2026-08-09: environment setup proceeded, **Stage 1 scoring HOLDS**, no substitute audio, **the row stays RED and the preflight is NOT marked passed** | **Michael (HK-4)** |
| **Telemetry posture** | **NOT SET, confirmed 2026-08-13.** `wandb`, `sentry-sdk`, NVIDIA OneLogger arrived as transitive NeMo dependencies; *"no privileged audio before then"* | **Michael**, on the P1 |
| **KICK-1 — the authorization's own text** | **MISSING.** T3 work unauthorized until located or re-issued | **Michael** |

**In order:** KICK-1 and telemetry are gates on *running*; HK-4 is the gate on *having something to
run*. They are independent and can be cleared in any order, but **none of them is cleared by this
document.**

---

## 8. Open questions — full text, per QR-1

Packet-local IDs, deliberately **not minted** as durable IDs. `Q-T3P-` was collision-checked across
all tracked files at HEAD `c75e1639` (`git grep`) and returned **ZERO**; `t3-pilot`,
`pilot-recording-protocol` and `pilot-manifest` likewise returned **ZERO**, and
`docs/t3-pilot-recording-protocol.md` does not exist. Per the `Q-PR3-` / `Q-QBO-` / `Q-RE-` /
`Q-COM-` precedent, minting is Michael's act; `ID-DL-1` governs.

- **`Q-T3P-1` — The provenance README that already exists.** The 2026-07-25 entry records that the
  thirteen recordings were archived at `..\data\pilot-recordings\` **with a provenance README**, and
  no design session has ever read it. Every naming and metadata rule in §2 and §5 was written without
  sight of it. **Does that README already define a naming scheme and a per-recording record — and if
  it does, is it adopted wholesale in place of §2.4 and §5.2, with this document corrected to match?**
  The alternative — layering a second convention over an existing one nobody read — is how a mapping
  gets lost. **Michael's, and it is the cheapest question here: one file, one look.**

- **`Q-T3P-2` — HK-4 may be a move, not a staging act.** HK-4 and BUILD-STATE both read as though the
  thirteen must be assembled and staged from nothing, while `session-log.md:8760` records them as
  already archived, with documentation, at the exact target path — on what this session infers is the
  P15. **Is HK-4 in fact a P15 → P1 transfer of an existing archive? And if so, does the row get
  re-worded, so that the next session to read it does not re-derive a bundle that already exists?**
  Re-wording a queue row is Michael's act; this session flagged and changed nothing.

- **`Q-T3P-3` — The bundle contains more than audio, and HK-4 names only audio.**
  `phase0-test-recordings.zip` held the 13 recordings, both int8 transcript JSONs, **the ground-truth
  scripts, the scorecard, and the findings.** HK-4 says *"stage the 13 pilot recordings."* Stage 1's
  job is scoring against ground truth, and **the ground truth is in that zip.** **Does HK-4 mean the
  whole bundle — and should it say so?** Staging the audio alone leaves the P1 with thirteen files
  and nothing to score five of them against.

- **`Q-T3P-4` — The scorecard would report two different measures under one heading.** The
  authorization says Stage 1 reruns *"the pilot and scripted batches at full precision with word
  boosting against the existing ground truth."* Ground truth exists for the five scripted takes only;
  the eight unscripted ones have an int8 transcript, which is a prior output rather than a truth.
  **Should the scorecard state the two measures separately — accuracy (WER, item-level) for batch 2,
  and change-from-floor for batch 1 — rather than reporting one figure across thirteen files?** The
  D1 auto-file decision and the confidence thresholds are explicitly waiting on this scorecard, so
  what it measures is not a presentational question.

- **`Q-T3P-5` — Where the substitution bar falls.** The 2026-08-09 exception says **no synthetic,
  substitute, or fixture audio may stand in for the recordings.** The ingest design independently
  requires a **derived 16 kHz mono WAV working copy** plus **0.5–1.0 s of head-padding** before
  transcription. **Is a documented, hash-traceable working copy derived from a preserved original
  outside the substitution bar — and does head-padding, which deliberately changes the audio the
  model sees, stay inside that permission?** §4.4 reads it as yes on both, and that reading is this
  session's inference, not a ruling. Stating it now costs one sentence; discovering the disagreement
  mid-Stage-1 costs the run.

- **`Q-T3P-6` — Whether the telemetry gate reaches this batch.** The rule attached to the unset
  telemetry lockdown is **"no privileged audio before then."** These thirteen recordings are
  **attested fictional at the source** — *"All fictional (verified)"* — which is why their
  transcripts were repo-safe. **Does the gate bar running them, or does it bar only real
  privileged audio, leaving Stage 1 free to proceed on the fictional batch while the lockdown is
  settled separately?** A reading either way is defensible and this session does not choose one:
  the narrow reading unblocks Stage 1 today, the broad reading treats the machine rather than the
  file as the thing being secured. **Only you decide which.**

- **`Q-T3P-7` — The document's home.** This file is proposed at **`docs/t3-pilot-recording-protocol.md`**
  — `docs/` top level, undated, alongside the four operational neighbours it most resembles
  (`gpu-telemetry-offline.md`, `new-machine-bootstrap.md`, `statute-cache-setup.md`,
  `outlook-setup.md`), and per Task 16's own instruction (*"path proposed under `docs/`"*), which is
  the only task in the chain not to say `docs/specs/`. **Is that the right home, or does it belong at
  `docs/specs/` with a date like the rest of the chain's deliverables?** A dated `docs/specs/` file
  reads as a design artifact of a moment; an undated `docs/` file reads as a live operating
  procedure, which is what it is meant to be. **Yours; the runner files it where you say.**

---

## 9. Non-goals

- **Does not authorize T3, Stage 1, Stage 2, or T4.** KICK-1 governs; T4 was never authorized.
- **Does not stage anything.** HK-4 is Michael's hand and stays open.
- **Does not answer the audio preflight row**, and does not attempt to (§6).
- **Does not design the ingest pipeline, the routing engine, or the scorecard.** Ingest identity,
  head-padding, and the working-copy transcode belong to `transcript-sort-and-route-design.md` and
  are referenced, not amended.
- **Does not edit or re-word HK-4, KICK-1, or any queue row.** `Q-T3P-2` asks; it does not act.
- **Does not read `src/`.** `Q-PR3-1` is unruled (§2.3).
- **Does not resolve the `T3` naming collision** (`Q-WF-2`); it disambiguates within its own text
  only.
- **Does not touch the registry.** No legal proposition is asserted here, so no registry entry is
  opened and the backlog is unchanged.
- **Does not normalize the `..\data` convention's inconsistent nesting** (§3.3).

---

## 10. Sources, named per item

**Repo at HEAD `c75e1639`, read full-text through the device bridge, 2026-08-16 Central (`R`):**
`docs/specs/BUILD-STATE.md` (full, 113 non-blank) · `docs/specs/session-log.md` (the two most recent
entries, and the 2026-07-25 pilot-fixtures entry — **located by heading, per §1.1**) ·
`docs/specs/attorney-review-queue.md` (HK-1…HK-7, KICK-1, QR-1…QR-5, MM-1,
GH-1, OPEN-3, Q-WF-2, Tascam row) · `docs/specs/phase0-environment-standup-2026-08-09.md` ·
`docs/specs/transcript-workflows.md` §9 · `docs/specs/transcript-sort-and-route-design.md` §§1, 11 ·
`docs/specs/rulings-capture-2026-08-07b.md` Part 8 · `docs/specs/rulings-capture-2026-08-08d.md` ·
`docs/specs/record-integrity-audit-2026-08-15.md` · `CLAUDE.md` · `.gitignore` ·
`docs/gpu-telemetry-offline.md` (presence confirmed; not read).

**Project knowledge (`K`):** `claude_NVIDIA_Transcription_Stack_Capabilities_2026-07-24.md`,
§§1–2, 4, 8–12 — including the 2026-07-25 addenda that are the only design-side account of the two
pilot batches. **This file is not in the repo and has no repo path.**

**Not read, deliberately:** `src/routing/__tests__/pilot/*` (contents — `Q-PR3-1` unruled; directory
listing only) · the provenance README at `..\data\pilot-recordings\` (H5; not reachable and not
sought) · any audio file (H5) · `Documents\Knowledge Repo` (not granted; no look arose).

**No external source was consulted.** Task 16 is entirely an internal-record task; nothing here
required web research, and no legal proposition is asserted, so SOURCING and TOOLING are not engaged.

---

*END — PROPOSED, PREPARATION ONLY. Nothing above is ruled, verified, staged, or built.*
