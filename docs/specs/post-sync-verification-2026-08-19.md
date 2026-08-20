# POST-SYNC VERIFICATION — the landed, unreviewed Code output at `beb27f4`

**Status:** PROPOSED. Canonical repo path: `docs/specs/post-sync-verification-2026-08-19.md`.
**Authored:** 2026-08-19 Central (design session, Cowork, Opus 5), CHAT-DISPATCH v5 task T1.
**DT-1 fired at authoring:** the container and the device VM both read `2026-08-20` UTC while
Michael's wall clock read `2026-08-19 21:44 CDT`. Every date in this file is the Central date.

**§7.2 self-identification:** this is an **Opus execution session**. It **adjudicates nothing**.
Every clearance below is a report of a reading, not a ruling; everything rulable is PROPOSED.

**SOURCE OF EVERY READING IN THIS FILE:** full-text and byte reads of the checkout at
`C:\Users\Brennan\brennan-case-manager`, granted via the device bridge this session, at
**`beb27f4bfbf7b5148bcb30d4b0e15ffde1e1549e`**. All git reads ran under `GIT_OPTIONAL_LOCKS=0`.
**No RAG retrieval was used as evidence** — RAG located candidates at session start and every
finding below was then re-established from the files. **No database was connected to. Nothing was
written to the checkout.** No `.git/index.lock` was stranded (§1.3).

**METHOD, stated because the honest reading of §2 depends on it.** Every row states the command or
computation that produced it, and a command that cannot produce a disconfirmation is not treated as
a verification (QR-6(a), applied to a design-side pass by choice). Text matching normalizes the way
the C1 sweep does — emphasis characters (`*`, `_`, backtick) deleted, whitespace including newlines
collapsed — **because a raw pattern failed on this very material once during this pass (§1.4).**
Line-number citations are used only into append-only files (CITE-STABILITY); the session log and
BUILD-STATE are cited by heading or quoted sentence.

---

## §0 — THE DISPATCH'S ASSUMPTION FAILED, AND THE FAILURE IS THE FIRST FINDING

**CHAT-DISPATCH v5 states "HEAD believed `20d1a0f`." HEAD is `beb27f4`** — **eight commits later**,
all stamped 2026-08-19 Central between **20:22 and 21:31**:

| commit | Central | subject (abbreviated) |
|---|---|---|
| `20d1a0f` | 20:22 | Repair the five unrouted `anon`/ADP carriers on Michael's in-session authorization |
| `82be555` | 20:47 | Re-sweep the `anon`/ADP falsehood families at HEAD: **three carriers, not one** (task C1) |
| `9e72c13` | 20:57 | Correct BUILD-STATE on Michael's ruling (C1 addendum) |
| `eb40513` | 21:02 | Audit the runner's Step 0 preconditions and the machine-local allowlist (task C2) |
| `4fa8d29` | 21:10 | Mine the log for every review-clearance assertion: **the omitted count is eight, not six** (task C3) |
| `68bad6d` | 21:16 | Repair the two family-(b) carriers on Michael's ruling |
| `c5a2b08` | 21:26 | Apply two allowlist acts on Michael's ruling (C2 addendum) |
| `beb27f4` | 21:31 | Ignore `.claude/settings.local.json` in the repo's own `.gitignore` (C2 second addendum) |

**A whole CODE-DISPATCH v4 chain ran after v5 was authored.** T1's target list names three things;
**four more unreviewed Code entries exist that it could not have known about.** Put to Michael at
the checkpoint; **he ruled T1 EXPANDED to everything landed-and-unreviewed at HEAD** (2026-08-19,
in-session), and separately ruled that **this session's session-log entry clears only what it
verifies by reading** — the C3 clearance-count question staying his. Both rulings are recorded in
the `#117` entry and govern this file.

**The other three v5 assumptions HOLD, each checked rather than carried:** `inbox/` is **empty**
(directory listing); the queue stands at **350** row-anchored open rows (`^\s*-\s*⬜` against
`attorney-review-queue.md`, the row-anchored measure the seventy-first invocation's line names —
a bare glyph count is the wrong measure and is not used); runner **v11**; design high-water
**`#116`**.

---

## §1 — ENVIRONMENT FINDINGS (three of them are new, and one is an operational note)

### §1.1 — THE WORKING TREE READS AS 196 MODIFIED FILES AND **IS NOT DIRTY**. NEW OPERATIONAL NOTE.

`GIT_OPTIONAL_LOCKS=0 git status --porcelain` in the bridge VM returns **196 files, all ` M`**.
Taken at face value that is a **QR-3 dirty-stop** — the next queue-runner batch would refuse to run.
**It is a bridge artifact, and this was established decisively rather than consistently.**

For each of the 196: `git show HEAD:<f> | tr -d '\r' | sha256sum` compared against
`tr -d '\r' < <f> | sha256sum`.

- **CR-only difference (not a real change): 196**
- **Genuine content difference: 0**

**Cause.** `core.autocrlf=true` lives in Michael's Windows **global** git config — the repo's own
`.git/config` has it **unset** (`git config --local --get core.autocrlf` returns empty, checked).
Windows git checks the LF blobs out as CRLF; **the Linux bridge VM's git has `autocrlf` unset**, so
it compares CRLF worktree files against LF blobs and reports every one as modified. There is no
`.gitattributes` in the repo to pin the convention.

**Consequences, stated as rules because this will recur on every bridge session:**

1. **A design-side bridge `git status` IS NOT EVIDENCE OF A QR-3 DIRTY STOP.** The tree is clean on
   Michael's machine. A design session that reported "dirty — the runner is blocked" from this
   reading would be **the documented DIAGNOSE-FROM-THE-DECISIVE-CHECK failure, one entry later**.
2. `--ignore-cr-at-eol` and `-w` **do not** suppress it — `git diff --name-only` with either still
   returns all 196, so the cheap-looking check is the misleading one. The hash comparison above is
   the decisive form.
3. The count is **not stable**: it is the number of files Windows has materialized as CRLF, which
   changes with every `git checkout --`. The C2 second addendum already recorded one instance of a
   restore flipping a file LF→CRLF in the worktree.

**PROPOSED for Michael, not decided here:** whether this earns a line in the project instructions'
operational notes, and whether a `.gitattributes` is wanted (it would change committed bytes and is
squarely a ruling, not a tidy-up).

### §1.2 — THE ORIGIN STATE IS UNVERIFIED BY THIS SESSION, AND THAT IS STATED RATHER THAN PAPERED OVER

**`device_bash` has no network access**, so `git fetch` and `git ls-remote` cannot run here.
`.git/refs/remotes/origin/master` equals HEAD at `beb27f4` — **and a tracking ref is not evidence
about origin** (the ruled note). **Whether `beb27f4` is on origin is NOT ESTABLISHED by this file.**
Michael, or the next Code session's Step 0, must settle it with a live `git ls-remote`.

### §1.3 — NO `.git/index.lock` WAS STRANDED, ACROSS SIX LOCK-TAKING INVOCATIONS

The ruled workaround held: every git call ran under `GIT_OPTIONAL_LOCKS=0`, including two
`git status --porcelain` and three `git diff` calls — the exact commands that have stranded a
0-byte lock eight-for-fourteen times. `.git/index.lock` absent before and after (checked both).
**First multi-invocation confirmation of the workaround on the record.** No lock is left for
Michael's hand.

### §1.4 — THIS PASS REPRODUCED THE EMPHASIS TRAP ON ITSELF, ONE COMMIT AFTER C1 NAMED IT

The first check of the addendum's `36 → 37` claim ran `grep '37 tables'` and returned **zero** in
all five files, with `36 tables` still returning hits — which reads exactly like a failed repair.
**It is not.** The files read `probe covers **37** tables`, with the emphasis **inside the phrase**,
so the pattern could not span it — **the identical defect that hid `fe-4`'s `is **not** set` from
the first sweep**, which the addendum itself records. Re-run emphasis-stripped, the claim verifies
completely (§2.C.7). Recorded because the lesson is now on the record three times in two days and
still caught a fresh reader: **no raw pattern over this corpus can be trusted; normalize first.**

---

## §2 — THE VERIFICATION LEDGER

Verdicts: **VERIFIED** = checked by a command that could have disconfirmed it · **NOT CHECKED** =
outside what this pass could establish, named in §3 · **DISCREPANT** = checked and does not hold.

### §2.A — SEVENTIETH RUNNER BATCH (`f5e4ab4`) — VERIFIED

| claim | evidence | verdict |
|---|---|---|
| One routing row: `smtp-setup.md` → `docs/smtp-setup.md`, new file, verbatim | file present, 5 artifacts in the commit | VERIFIED |
| **10,907 bytes** | `wc -c` = **10907** | VERIFIED |
| **sha256 `c3433e46…`** | `git show HEAD:docs/smtp-setup.md \| sha256sum` = **`c3433e46…`** | VERIFIED |
| **Pure LF, 0 CRLF, 0 bare CR** | byte read: **CR = 0**, LF = 166 | VERIFIED |
| Row-anchored open rows moved 344 → 346 | consistent with 350 at HEAD after the 71st added four | VERIFIED (arithmetic) |

### §2.B — THE TWO GATE-10 CODE ENTRIES — VERIFIED, WITH **ONE DISCREPANCY** (§4)

**Build session (`e0677a8`, "Gate 10: promote DOB, SSN and driver's licence out of the parties jsonb blob"):**

| claim | evidence | verdict |
|---|---|---|
| `db/schema.sql` **"A PURE INSERTION OF 109 LINES, ZERO DELETIONS"** | zero deletions **confirmed**; **109 matches no measure** — see §4 | **DISCREPANT (the figure only)** |
| `party_pii` has **seven columns, NONE named `id`** | read: `party_id, ssn, drivers_license, drivers_license_state, created_by, created_at, updated_at` | VERIFIED |
| `party_id uuid primary key references parties (id) on delete cascade` | present verbatim | VERIFIED |
| **37 `create table` · 37 `enable row level security` · 36 `create policy`** | re-derived at HEAD: **37 / 37 / 36** | VERIFIED |
| The 36/37 gap is `file_counters`, the deny control | `rlsProbe.ts` `policy:false` entries = **`['file_counters']`**, sole | VERIFIED |
| Schema and migration halves **"20 lines each, IDENTICAL"** | executable object lines: schema **20**, migration **21**; **the first 20 identical, the migration's only extra line is `commit;`** — the transaction wrapper, migration-only by definition | VERIFIED |
| `rlsProbe.ts` **37 entries, includes `party_pii`, in EXACT `db/schema.sql` table order** | 37 entries; `party_pii` present; **sequence-identical to the schema's `create table` order — `probe == schema`, element for element** | VERIFIED |
| Migration guard: `to_regprocedure`, **`raise exception`, never `raise notice`** | **3 executable `raise exception`** (lines 144, 148, 221; a first pass said 4, counting a comment occurrence — corrected); `to_regprocedure` 2 executable + 1 in the comment that names it; **the single `raise notice` occurrence is inside the comment that states the rule**, zero executable | VERIFIED |

**Run-and-verified-live entry:** its six checks were answered by Michael's hand against the live
database. **This pass can corroborate the repo-side half only** — the migration file exists, the
schema carries the seven columns, `anon` appears nowhere as an executable grant in `db/`. **The live
readings (`pg_default_acl`, the 37-table privilege sweep, the `relacl` and empty-grantee sweeps) are
NOT CHECKED here and cannot be** — no database was connected to. They stand on his reading.

### §2.C — SEVENTY-FIRST BATCH (`157a2cf`) + ITS ADDENDUM (`20d1a0f`) — VERIFIED THROUGHOUT

| # | claim | evidence | verdict |
|---|---|---|---|
| 1 | **"all seventeen routed artifacts"** | `git show --stat 157a2cf` = **17 files** | VERIFIED |
| 2 | Five migration annotation blocks present, **originals untouched** | `--numstat`: **+16/−0, +17/−0, +17/−0, +17/−0, +19/−0 — additions only, zero deletions in all five** | VERIFIED |
| 3 | `db/schema.sql` **comment-only** | added non-comment non-blank lines = **0**; deleted = **0** | VERIFIED |
| 4 | grok **§W append, §§ above unchanged** | +29/−0, and the diff's only hunk is **`@@ -295,0 +296,29 @@`** — **nothing at or above line 295 touched** | VERIFIED |
| 5 | Queue rows `O-11`, `O-12`, `O-13`, `G10-5`, `GL1-1` filed **with full text** (QR-1) | all five present; `O-11` ⬜, `O-12` ⬜ (DEFERRED), **`O-13` ✅ and correctly carrying no open glyph**, `G10-5` ⬜, `GL1-1` ⬜; each carries a `Full text:` clause | VERIFIED |
| 6 | **`O-13` carries the `O-10` cross-reference** | the row's parenthetical names the renumbering, Michael's 2026-08-19 ruling, **and both stranded references** — the grok §W annotation and the `#116` entry — as resolving there; the O-series collision note is filed above it | VERIFIED |
| 7 | QR-6(b)'s **second act**: the Status-header per-batch reconcile sentence | present, naming the **SEVENTY-FIRST invocation** and the O-series rows | VERIFIED |
| 8 | Two staged files filed by copy, hash-verified | `gate10-pii-frontend-slice.md` **10,346 B, sha256 `309a7ba4…`**; `gate10-pii-slice.md` **19,364 B, sha256 `35339086…`**; **both 0 CR bytes** | VERIFIED |
| 9 | Addendum: **six conformance notes quoting what each file used to say** | all five files carry **exactly one** dated *"Conformed 2026-08-19"* note, each quoting the superseded sentence | VERIFIED |
| 10 | `fe-4`/`fe-5`/`fe-6` **"36 tables" corrected to 37** | emphasis-stripped: **`probe covers 37 tables` = 1 in each**; residual `covers 36 tables` appears **only inside the quoting notes** (retraction class, correct by design) | VERIFIED |
| 11 | The 36→37 fix scoped to `fe-4`/`fe-5`/`fe-6` only | **`qbo` and `re-1` carry no table count at all**, before or after — the addendum's scoping is exact, not loose | VERIFIED |

**The twelve §1 sha256 pins are NOT CHECKED and cannot be:** the packet was deleted at Step 4 item 5
(verified deleted — `inbox/` is empty), and **the pin values lived only in the packet**. The 17
routed artifacts and the two staged files' hashes are what remains checkable, and both check out.
*(This is QR-1's rationale showing up from the other side: what the deleted packet was the only
copy of is gone, and only what was carried into the repo survives.)*

### §2.D — TASK C1 (`82be555` + addendum `9e72c13`) — VERIFIED

| claim | evidence | verdict |
|---|---|---|
| Report filed at `docs/specs/anon-adp-sweep-verification-2026-08-19.md` | present, **32,472 B / 347 non-blank** | VERIFIED |
| §11 addendum appended (at `68bad6d`), tables and verdicts **not rewritten** | §11 present; `68bad6d` touched the file **+25/−0** | VERIFIED |
| BUILD-STATE **150-non-blank cap held with no displacement** | **exactly 150** non-blank | VERIFIED |
| Anti-resurrection-ledger pointer preserved | present | VERIFIED |
| The stale `PR-3 · QBO · RE-1` parenthetical corrected | now reads that **all three WERE repaired at `20d1a0f`**, and states in terms that **the line "read 'NOT repaired' from `20d1a0f` onward and was FALSE there"** | VERIFIED |
| The second `RlsProbePanel` sentence named in BUILD-STATE | `RlsProbePanel` appears twice, the RLS section naming `:70-71` | VERIFIED |

### §2.E — TASK C2 (`eb40513` + addenda `c5a2b08`, `beb27f4`) — VERIFIED

| claim | evidence | verdict |
|---|---|---|
| Report filed at `docs/specs/runner-precondition-audit-2026-08-19.md` | present, **blob 15,405 B / 186 non-blank** | VERIFIED |
| Repo `.gitignore` stanza added, **narrow by necessity** | present with its explanatory comment; **`git check-ignore -v` resolves `.claude/settings.local.json` to `.gitignore:21`** — the repo's own rule, no longer the machine-local global | VERIFIED |
| **Both tracked `.claude/` files still tracked** | `git ls-files .claude/` returns `commands/queue-runner.md` and `launch.json` | VERIFIED |
| Allowlist **23 → 24 entries** | parsed JSON: **24** | VERIFIED |
| Bare `ls-remote` verification form **added** | `Bash(git ls-remote origin refs/heads/master)` present | VERIFIED |
| `Bash(git push *)` **narrowed** to `Bash(git push origin master)` | narrowed form present; **wide form returns 0 occurrences** — MM-1's never-force-push bar now has the mechanical footing §5 said it lacked | VERIFIED |
| `Bash(rm -f inbox/*)` still present (Step 0 item 4) | present | VERIFIED |

### §2.F — TASK C3 (`4fa8d29`) — PRESENCE AND FORM ONLY, **BY MICHAEL'S RULING**

`docs/specs/review-clearance-candidates-2026-08-19.md` present, **10,793 B / 119 non-blank**.

**Nothing in it is acted on, adopted, counted or carried by this session.** Michael ruled at the
checkpoint that this Opus pass clears **only what it verifies by reading**. So the eight-vs-six
clearance count, the nine-entry undetermined set (`#65`, `#66`, `#68`–`#74`), the `#67` *"is
LANDED"* row, and the three evidentiary distinctions the entry raises **all stay open and stay
his** — data prep for a Fable adjudication that has not run, exactly as the file says on its face.

### §2.G — THE FAMILY-(b) REPAIR SESSION (`68bad6d`) — VERIFIED

| claim | evidence | verdict |
|---|---|---|
| `docs/spec-feedback.md` is **CRLF, 983 CR / 983 LF by raw byte read** | byte read: **CR = 983, LF = 983** | VERIFIED |
| The `:591` site repaired with a note quoting the old sentence | **exactly one** *"Conformed 2026-08-19"* note in the file | VERIFIED |
| Queue `Q-RE-3` clause (b) repaired to match its source memo | `Q-RE-3` present and conformed | VERIFIED |
| BUILD-STATE's **`NEITHER IS REPAIRED — both are YOURS to route.`** replaced | that string returns **0 occurrences**; the three surviving `NOT repaired` hits are **unrelated contexts** (the D-3 workbook staleness; the FE-5 missing-title defect; and the corrected PR-3/QBO/RE-1 parenthetical quoting itself) — **checked by reading, not by the count** | VERIFIED |

---

## §3 — WHAT THIS PASS DID **NOT** VERIFY (named, not glossed)

1. **Anything about origin.** §1.2. No network in the bridge VM.
2. **The twelve §1 pins of the seventy-first packet.** §2.C. Unrecoverable — the packet is deleted.
3. **The health-check figures** (279 tests / 23 files; build 0; lint 0). Not re-run.
4. **Every live-database reading** in the gate-10 run entry and the C-2 restatement. No connection,
   by design. They stand on Michael's hand.
5. **The 116-hit classification in the C1 report** (3 CARRIER · 11 ANNOTATED · 41 RETRACTION ·
   21 FROZEN · 40 FALSE POSITIVE). The report's existence, size and §11 are verified; **its
   classifications were not independently re-swept** — that is a second whole-tree pass and is its
   own act.
6. **Whether the second `RlsProbePanel` sentence should join the front-end slice's §7 item 6.**
   Still open, still Michael's — and it is now load-bearing on T3 (see the `#117` entry).
   **TWO NAMING CORRECTIONS, both made before shipping.** (a) A first draft called this *"`G10-5`
   item 6."* **`G10-5` is a single yes/no queue row — it has no items.** The numbered item lives in
   `docs/specs/gate10-pii-frontend-slice.md` **§7 item 6**, which sits *behind* `G10-5`; BUILD-STATE
   already states it correctly and this file now matches it. (b) The sentence is cited **by its
   text** — *"The role has no SQL privilege on these tables"* — **not by `:70–71`**, per
   CITE-STABILITY: a source-file line cite frozen into an append-only log is wrong the first time
   anyone edits above it.

---

## §4 — THE ONE DISCREPANCY, WITH THE CORRECTION-ENTRY FIELDS

**WHAT WAS ASSERTED.** The gate-10 build entry's first bullet: *"`db/schema.sql` — THE
FRESH-PROJECT HALF, **A PURE INSERTION OF 109 LINES, ZERO DELETIONS**."*

**WHAT IS TRUE INSTEAD.** *Zero deletions* is **TRUE** — `git show --numstat e0677a8 -- db/schema.sql`
reads `127  0`, and a line-by-line pass over the diff finds **no deleted line at all**. **The figure
109 matches no measure this project recognizes.** Measured every way, at the commit:

| measure | value |
|---|---|
| raw added lines (all three hunks) | **127** |
| **non-blank** added lines — the ruled default (2026-08-13) | **117** |
| executable (non-comment) added lines | **21** |
| the `party_pii` hunk alone, raw | 113 |
| the `party_pii` hunk alone, non-blank | 103 |
| the `parties.date_of_birth` hunk, raw | 11 |
| the `cases` comment hunk, raw | 3 |

The three hunks are `@@ -78,0 +79,3 @@`, `@@ -96,0 +100,11 @@` and `@@ -383,0 +398,113 @@`. **No
subset, and no sum of subsets, produces 109.** The nearest values are 113 and 103, three hunks and
two measures away in opposite directions.

**WHICH ENTRY IT CORRECTS.** The 2026-08-19 `GATE 10 BUILD SESSION` entry (Claude Code, Opus 5;
unnumbered per TOC-6), first bullet. **That entry stands as written** — the log is append-only.

**THE ACTOR.** **Opus 5**, taken from the entry's own self-identification, not inferred from session
type.

**THE FAILURE CLASS.** **A figure stated without being re-derived.**

**AND THE FIRST DRAFT OF THIS VERY BULLET GOT THE ATTRIBUTION WRONG — CORRECTED HERE BEFORE
SHIPPING, AND RECORDED BECAUSE THE ERROR WAS THE SAME CLASS.** It asserted that *"the same entry
names this class about itself twice,"* quoting *"an earlier draft of this line said 'ten'"* and
*"an earlier draft of this bullet said 'at least the eighth.'"* **Both quotations are in the
`GATE 10 RUN AND VERIFIED LIVE` entry, not the `GATE 10 BUILD SESSION` entry that carries the 109.**
A line-scoped `grep 'earlier draft'` over the build entry's own range returns **zero**. **The claim
was rhetorically satisfying and unchecked — verify-before-criticizing, failed inside a correction,
by the same session writing the correction.**

**What is true instead, and it is still worth recording:** the class is named twice **by the sibling
entry from the same day and the same session**, and **the direction runs the other way.** The RUN
entry's BUILD-STATE bullet corrects its own draft's *"ten"* as *"the PREVIOUS entry's figure carried
forward instead of re-derived"* — and **the previous entry is the BUILD entry, which does state
`ten lines changed, none added`.** So the build entry's figure was carried into its sibling and
caught there; **the build entry's OTHER figure, 109, was never re-derived by anyone until now.**

Prior instances on the record: the sixteenth invocation's uncut BUILD-STATE line; `#88`'s drifting
line cite; the seventy-first invocation's queue-count method note; **and this bullet's own first
draft.**

**WHAT CHANGED AS A RESULT.** **Nothing in the record, deliberately.** The entry is append-only and
stands; no downstream document depends on the figure (BUILD-STATE, the queue and the TOC all state
schema *totals*, `37 / 37 / 36`, which are independently re-derived above and correct). **The
correction lives in the `#117` entry and in this file, and that is the whole remedy.** It is
recorded because the figure would otherwise read as measured, and because the class is the one this
project spends the most effort on.

---

## §5 — WHAT THIS SUPPORTS CLEARING

**PROPOSED** — the clearance act itself is the `#117` entry's, and Michael's to accept.

**A FIRST DRAFT OF THIS SECTION OVER-CLEARED AND IS CORRECTED HERE.** It cleared the seventy-first
batch **"entire"** while §2.C and §3 of this same file list two of that entry's own claims as NOT
CHECKED, and it cleared the gate-10 entries' repo-side claims without carving out the one this file
proves **DISCREPANT**. **"Entire" is precisely the copy-forward word the round-trip lines are
warned about.** Corrected list:

**Clear as design-side verified — and only to the extent read:**

- the **seventieth** batch's routing (§2.A), whole;
- the **two gate-10 Code entries' repo-side claims — EXCEPT the `109 LINES` figure, which is
  DISCREPANT (§4) and is cleared as false rather than as verified**, and except the run entry's
  live-database half, which this pass cannot reach (§3.4);
- the **seventy-first** batch and its addendum **on the eleven claims §2.C ledgers — NOT
  "entire"**: its twelve §1 pins (§3.2) and its health-check figures (§3.3) are **not cleared**;
- **task C1's** filed artifact and its BUILD-STATE correction — **not its 116-hit classification
  table** (§3.5);
- **task C2's** filed artifact and its three applied acts (§2.E), whole;
- the **family-(b) repair** session (§2.G), whole.

**Do NOT clear:** task C3's substance (§2.F) · every live-database reading (§3.4) · C1's
classification table (§3.5) · **the health-check figures, 279 tests / 23 files / build 0 / lint 0
(§3.3)** · anything about origin (§1.2) · the twelve §1 pins, permanently uncheckable (§2.C, §3.2).

**Carried forward, unresolved and Michael's:** whether **the front-end slice's §7 item 6** grows to
cover *"The role has no SQL privilege on these tables"* · the eight-vs-six clearance count and the
nine-entry undetermined set · whether §1.1 earns an instructions operational note and whether a
`.gitattributes` is wanted.

*(**Conformed 2026-08-19**, on Michael's ruling — queue-runner batch 72, after the batch that filed
this document flagged the defect and left it. This line read* "whether `G10-5` item 6 grows to cover
`RlsProbePanel.tsx:70–71`" *— reproducing **both** of the naming errors §3.6 of THIS document had
already caught and corrected before shipping. §3.6 governs and is unchanged: (a)* **`G10-5` is a single
yes/no queue row and has no items** *— the numbered item lives in
`docs/specs/gate10-pii-frontend-slice.md` §7; and (b) per **CITE-STABILITY** the sentence is cited by
its **text**, not by a source-file line number that goes wrong the first time anyone edits above it.
The finding is not otherwise altered and the question is still Michael's — it is now queue row*
**`G10-6`**, *and the `.gitattributes` question beside it is* **`LE-1`**, *both entered by that same
batch.* **§2.D's table row is deliberately NOT touched:** *its `:70-71` reports what BUILD-STATE names,
which is a different claim from this document citing the sentence itself. This note is retraction
class — it quotes the wrong forms in order to deny them, and must not be "fixed.")*
