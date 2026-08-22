# Session Log — HEAD

> **DERIVED FILE. The log at `docs/record/session-log.md` is authoritative in every disagreement.**
> **REGENERATED IN FULL every queue-runner batch — never appended to.** An entry written here and
> nowhere else is destroyed at the next batch: entries go in the live log and reach this file only by
> regeneration (`TC-5`, ruled 2026-08-21).
> **CITE BY HEADING OR QUOTED SENTENCE, NEVER BY LINE NUMBER** (CITE-STABILITY, ruled 2026-08-16) —
> this file is rewritten wholesale, so every line number in it is unstable by construction.

**Why this file exists.** The live session log and the full abstract index left the design-side sync
for `docs/record/` on 2026-08-21 (`TC-4`). **This is the only part of the session-log record that
reaches a design-side session.** It carries the recent entries *verbatim*, a compact index proving
what else *exists*, and pointers to the three files that hold the rest.

**THE RULE THAT PRODUCED §1 (`TC-2`, ruled 2026-08-21), stated in full so a reader can check it:**
§1 carries **the four most recent design `#nn` entries and every entry above the oldest of them**,
whole and verbatim — interleaved runner lines and unnumbered Code entries come along, because they
are what say *what landed*. *A flat count of N entries was named and rejected: entry kinds
interleave, and at ruling time the three most recent entries were two Code sessions and a runner
line, so a "last 3" head would have contained **zero** design rulings.*

- **Generated FROM commit `57699a795dc856aa1567381aa6ef0dde96c546e8` plus this batch's own edits — and it DESCRIBES the log as this
  batch commits it**, so **this batch's commit, not `57699a795dc856aa1567381aa6ef0dde96c546e8`, is where every line below verifies.**
  Stated rather than smoothed: a generator cannot name a SHA that does not exist yet, and §3.1's
  rule is satisfied by RIDING the same commit, not by predicting its name.
- **§1 carries 10 entries, 93,329 bytes**, reaching back to design entry **`#124`**.
- **§2 carries 137 rows — one per entry in the whole live log**, which holds **138 `## ` headings**,
  of which **1 is not an entry** (the pointer stanza ``ARCHIVED: entries older than the 2026-08-13 cutoff``). 137 rows against 137 entries.
- **Whole file: 113,525 bytes against the 200 KB ceiling (55.4% of it).**

---

## §1 — HEAD ENTRIES, VERBATIM

*Byte-for-byte from `docs/record/session-log.md`, newest first, in log order. **Whole entries only** —
never truncated, never paraphrased, never summarized. The log's own "How to use this doc" preamble is
carried first because its rules govern any session reading these entries.*

# Session Log

Purpose: a dated, running record of what happened session to session in this project — decisions made, progress, and open threads — separate from `case-management-project-instructions.md` (which stays the single canonical, always-current spec for the case management build).

**How to use this doc (for any Claude session working in this project):**
- At the **start** of a session touching this project's work, skim the most recent 2-3 entries to pick up where things left off, especially "Next" items. **A design-side session reads `docs/specs/session-log-head.md`** — the DERIVED head file that carries the recent entries verbatim plus a compact index of every entry in this log (TC-2/TC-3/TC-5, ruled 2026-08-21). A Code session or a bridge read can use this file directly.
- **Where this file lives, and who can see it (TC-4, ruled 2026-08-21):** this log sits at `docs/record/session-log.md`. `docs/record/` is **tracked in the repo but EXCLUDED from the design-side sync picker**, so a design-side session cannot retrieve it — it is reached over the device bridge or by a Code session, exactly as `docs/archive/` already is. **Its absence from design-side retrieval is BY DESIGN and is never evidence of absence.** The full abstract index moved with it, to `docs/record/session-log-toc.md`.
- At the **end** of a substantive session (design decisions made, work completed, open questions raised), add a new dated entry at the top of the log below, in the format shown.
- Keep entries short — a few lines each. This is a pointer/recap layer, not a duplicate of the full spec. Detailed specs live in their own docs (`case-management-project-instructions.md`, `pi-case-playbooks.md`, `criminal-offense-playbooks.md`, etc.) — link to those rather than repeating their content here.
- ~~Do not let this file grow unbounded — if it gets long, consider archiving older entries to a dated sub-file and keeping only the most recent months here.~~ **RETIRED by `TC-10` (ruled 2026-08-21), and named rather than deleted so the change is legible.** Splitting existed to keep the *synced* log small; now that this file is not synced, its size costs nothing but a bridge read, and fragmenting the record across more files actively hurts. **This log grows unbounded at `docs/record/`.** The cap that replaces it is the 200 KB ceiling on `docs/specs/session-log-head.md`. (`Q-CAP-5(a)` and `Q-CAP-5(c)` are untouched and still stand; the closed archive is unaffected — see the archive pointer at the foot.)
- Each entry ends with two round-trip state lines so the Code handoff status is always visible at the top of the log: **"Staged for Code:"** (what this session prepared for a coding session) and **"Awaiting/Returned from Code, unreviewed:"** (what a coding session produced that the design space hasn't reviewed yet). Write "none" rather than omitting them. When a design session reviews returned material, the next entry clears it.
- **Design-side visibility rule (added 2026-07-25, BINDING for Code sessions):** design-side sessions (Fable/Opus in the Project space) only see what reaches them — they cannot read the local repo. At the end of every substantive Code session: (1) append the log entry here, (2) rewrite `BUILD-STATE.md` in full (the one-doc "what is built now" snapshot design sessions read first; template + hard rules in CLAUDE.md), (3) **push to origin and VERIFY the push landed** (confirm the remote ref moved — never report "pushed" from an unchecked command); if the push is blocked, say so explicitly in the session report so Michael can run it — and (4) remind Michael in one line: **"Pushed at `<sha>` — click Sync now on the repo in the Claude project"** (wording corrected 2026-07-25; the old "re-upload BUILD-STATE.md" instruction was never the mechanism).
- **Numbering rule (ruled 2026-08-18, TOC-6):** the `#nn` series is **DESIGN-ONLY**. Code
  sessions never mint `#nn` — runner batches carry runner ordinals and other Code entries stay
  unnumbered. (The C-2 index entry stays "—"; the collision class this closes is recorded at
  TOC-6.)

---

---

## 2026-08-21 — QUEUE-RUNNER batch (runner line; EIGHTIETH invocation) — one docs-only packet, THIRTEEN routing rows: THE THIN CONSTITUTION EXECUTED — the live log and the full abstract index leave `docs/specs/` for `docs/record/`, a derived head file is born as the design side's only view of the record, and the runner itself goes v11 → v12

**THE PACKET.** `push-to-code_thin-constitution-move-1_2026-08-21.zip`, identity pinned at Step 1 per QR-6(c) — **29,912 B, mtime 2026-08-21 19:32:10 Central, sha256 `fbae89df2d33e42d2eff89d6e1c3f4531b8aa14fe9b0d65b677245086ae601e8`**. One packet, so **no conflict rule fired and nothing was superseded**; nothing was skipped as already built. Executed in the manifest's dependency order §4.1 → §4.2 → §4.3 → §4.4/§4.5 → §4.6.

**STEP 0 GATE PASSED ON LIVE EVIDENCE, NOT ON A TRACKING REF (QR-6(a)).** `git fetch origin` then `git ls-remote origin master` put origin at `57699a795dc856aa1567381aa6ef0dde96c546e8`, equal to HEAD, `git rev-list --left-right --count` reading `0 0`, tree clean and on master. **That is the same commit the packet's §1 names as its bridge read**, so the design-side view was not stale and no reconcile delta existed against it.

**HEALTH CHECK SKIPPED, AND RECORDED RATHER THAN SILENT (QR-6(f)).** Docs-only batch: §5 is **NONE** and no `src/`, `db/`, `supabase/` or build-tooling path was written. `npm test` / `npm run build` / `npm run lint` would prove nothing about a batch that changed no code, so the trio was not run and no health figure is claimed here.

- **ROW 1 — THE RUNNER REPLACED, v11 → v12, AND VERIFIED BY DIFF RATHER THAN TRUSTED.** `docs/prompts/QUEUE-RUNNER.md` replaced in full (14,038 → 18,658 B). The diff against v11 matches §4.1's stated change list **item for item and adds nothing else**: the v12 header line, the new WHERE-THE-SESSION-LOG-RECORD-LIVES table, Step 0 item 5, Step 4 item 1 repointed to `docs/record/`, item 1a (the TOC-4 regeneration, now bridge-only and explicitly not to be thinned), the **new** item 1b, item 3's recompute sentence, and one new hard limit. **QR-1, QR-3, QR-4, QR-5, QR-6(a)–(f), MM-1 and OPEN-5(a) are untouched.** *This batch was itself run under the v11 text read from HEAD at session start, per QR-2 — v12 governs from the next invocation, though the packet's §8 already directs this close-out down the v12 path.*
- **QR-2 CHECK — THE COMMAND COPY IS STILL A POINTER.** `.claude/commands/queue-runner.md` is **739 B** and holds the pointer text, not a copy; it did not acquire one. Nothing was rewritten there.
- **ROW 2 — THE RESTRUCTURE RECORD LANDED FIRST, BECAUSE THE RUNNER READS IT.** `docs/specs/thin-constitution-restructure-2026-08-21.md`, 22,504 B, byte-identical to the staged artifact by `cmp`. Its §3 is operative: v12's Step 4 item 1b points at it every batch, so it had to exist before the first v12 close-out had anything to read.
- **ROWS 3 AND 4 — THE MOVE, BY `git mv`, WITH HISTORY AND BYTES BOTH PROVED.** `docs/specs/session-log.md` → `docs/record/session-log.md` and `docs/specs/session-log-toc.md` → `docs/record/session-log-toc.md`. Git staged **both as `R100`** — pure renames — and `git show HEAD:<old path> | cmp - <new path>` reported **identical** for each **before** anything was appended. The old paths are gone; `docs/record/` is **tracked and NOT gitignored** (the exclusion is a sync-picker act, Michael's hand). **`docs/archive/` did not move** — TC-6.
- **RECONCILE FOUND NO HALF-EXECUTED STATE.** `docs/record/` did not exist, `docs/specs/session-log-head.md` did not exist, and the two old paths existed exactly once each — so the packet had not run, in whole or in part, and the §1 STOP condition (both paths present) did not arise.
- **THE FIGURES WERE RE-DERIVED, NOT CARRIED (OPEN-5(a)), AND THEY MATCH THE PACKET EXACTLY.** The log at HEAD: **1,047,175 bytes, 136 `## ` entries, 62 of them numbered, high-water `#126`**, and the string `2026-08-21` appearing **zero** times. The abstract index: **154,345 bytes**. Because the mark had **not** moved, `#132` stands as authored — `#127`–`#131` remain deliberately reserved for the five design sessions the design side believes unfiled.
- **ROW 5 — THE HEAD FILE GENERATED, FIRST EDITION.** `docs/specs/session-log-head.md`, built per the restructure record's §3 **after** this batch's entries were appended, so its §1 is current with the batch that created it. Its own banner carries its counts, its generating commit and the TC-2 rule in full; they are not restated here, because a count written into the log would have to be computed **before** the file that derives from the log exists. **The figures were reported to Michael in-session.**
- **ROWS 6–11 — THE POINTER REWRITES, AND THE ONE JUDGMENT CALL REPORTED RATHER THAN MADE QUIETLY.** The live-pointer rule was applied to a **re-derived** tail: `git ls-files` + grep finds **29** tracked files naming the old paths (excluding the log, the abstract index, the review queue and `docs/archive/`) — **the packet's own count, independently reproduced**. Five were rewritten (`CLAUDE.md`; `README.md`; `docs/prompts/CODE-DISPATCH-v3.md`, two hits; the moved log's own "How to use this doc" stanza; the moved index's own banner). **The file the packet expressly could not call from the design side — `docs/specs/case-management-project-instructions.md` — was read and called a LIVE POINTER: its single hit is line 5's *"Also check `docs/specs/session-log.md` for a short dated recap … useful for picking up quickly,"* which tells a reader where to go now, and it was rewritten to the head file.** *Recorded as a tension, not obeyed silently (Hard limits): CLAUDE.md's spec-canonicity rule makes `docs/specs/` read-only in a Code session, and this packet's routing row 11 is the express instruction that overrides it for that one sentence.* The other ~23 hits — dated specs, spent build prompts, captures — **stand as written**, per the append-only and CITE-STABILITY logic.
- **THE `TC-10` AMENDMENT WAS MADE BY AMENDING, NOT DELETING.** The log's own bullet advising that older entries be archived when the file gets long now **names `TC-10` and says the advice is retired** — the live log grows unbounded at `docs/record/` because its size no longer costs the design side anything. The stanza also gained the line saying where the file now lives, that it is excluded from the design-side sync, and that it is reached over the device bridge or by a Code session. The foot's archive-pointer stanza is unchanged.
- **ROW 12 — THE QUEUE MERGE, BOTH ACTS (QR-6(b)).** The §7 rows went into `docs/specs/attorney-review-queue.md` **with full question text in bold** per QR-1, **and** the Status header's per-batch "Reconciled again to session-log" sentence was updated. The packet is deleted after processing, so the queue entry is the only place those questions survive.
- **THE CARRIED LINE WAS VERIFIED AT HEAD BEFORE BEING CARRIED A THIRD TIME**, as `#132` itself instructs. `db/migrations/2026-08-20-fe-d1-form-engine.sql` **exists at HEAD at 13,171 bytes**, the log records exactly one migration pending and names it Michael's hand, and **no later entry clears it** — so the line is true as written, not inherited. *Whether it has been run against the live database is not knowable from the repo and is not asserted here.*
- **DO-NOTs HONORED.** Nothing was built. `docs/archive/` was not moved. No entry was written to the head file — it is derived and regenerated, and an entry living only there is destroyed at the next batch. No entry in §1 was truncated, paraphrased or summarized. The abstract index's summary rows were **not** thinned at their new path. No `git rm`-and-re-add. `docs/record/` was not added to `.gitignore`. The ~23 dated files were not touched. **No project-knowledge capture was relocated, altered or deleted — `TC-7` is Michael's hand in the Claude UI and no packet act depended on it.** Nothing in §7 was resolved. No figure was carried into BUILD-STATE. **No `#nn` was minted for this runner line** (TOC-6).

**Staged for Code:** none. **Awaiting/Returned from Code, unreviewed:** this batch's handback — the runner at v12, the restructure record, the two `git mv`s, the first edition of the head file, the six pointer rewrites, `#132` as filed, and the queue merge.

**Still open and still Michael's (the packet's §7, merged so the top of the log stays truthful):** **`TC-OPEN-5` is the one with an ORDER** — exclude `docs/record/` in the Claude project's sync picker **after** this push and **before** syncing, or the log is simply pulled back in at its new path for no saving; then re-read the meter, expected ~89.8% → ~74%, and **a large miss is itself a finding** · **`TC-OPEN-1`** the two deferred growers, the review queue (~0.87%/day) and BUILD-STATE (~0.20%/day), carrying the finding that `BS-1a`'s cap is a **line** cap density has defeated · **`TC-OPEN-2`** move 3, the superseded-specs audit over `docs/specs/` (91% of the synced scope), named a Fable candidate · **`TC-OPEN-3`** close the `TC-9` gap so the form-corpus capture can relocate · **`TC-OPEN-4`** hand in `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` · **`TC-OPEN-6`** the fifteen-capture relocation on `#107`'s zip-and-byte-verify method, relocated never deleted · **`TC-OPEN-7`** paste project-instructions **v26**, then start a fresh chat · **`RECON-1`** the disclosures REQ-CAPTURE **first application, not edit**, still owed by the next disclosures design session · and the **federated-projects question**, deferred by ruling to its own bridge sitting.

## 2026-08-21 (#132) — THE THIN CONSTITUTION EXECUTED: the live log LEAVES the sync for `docs/record/`, the index SPLITS into a synced existence half and a bridge-only abstract half, and a derived head file becomes the design side's whole view of the record — twelve rulings, and the finding that the ruled moves halve the slope rather than flatten it (design session, Cowork, Opus 5; bridge reads at `57699a7`, confirmed against origin by `git ls-remote`)

The sitting that executed the thin constitution Michael adopted in voice earlier the same day. **Nothing was built; §5 of the packet is NONE.** CC-1 hands-on queue stated at open and EMPTY. Limits held: no `src/` read, no legal proposition verified, no `git status` run over the bridge — so no `.git/index.lock` was stranded and no LE-1 wall was provoked.

- **THE MEASUREMENTS FIRST, BECAUSE THE RULINGS WERE MADE AGAINST THEM.** Meter at open **1,796,919 / 2,000,000 = 89.8%** — two-tenths of a point under the `Q-CAP-5(a)` flag line, *after* the 08-20 split freed 7.8%. Synced repo **167 files, 5,714,103 bytes ≈ 81.9%**; project docs ≈ 8.0% by subtraction; the two close on the reported figure. **`session-log.md`: 1,047,175 bytes, 6,889 NON-BLANK lines (7,570 raw), 136 entries, 62 numbered — ≈15.0% of the entire budget on its own.** The token ratio is not assumed: `#107`'s deletion delta gives **3.49 bytes per unit**, and the independent derivation at `knowledge-capacity-measurement-2026-08-20.md` §1.2 gives 3.46.
- **THE FINDING THAT REFRAMED THE SITTING: THE THREE RULED MOVES HALVE THE SLOPE, THEY DO NOT FLATTEN IT.** Per-file growth measured from blobs at successive HEADs, each over its own observed window: `session-log.md` **~124 KB/day**, `attorney-review-queue.md` **~61 KB/day**, `session-log-toc.md` **~25 KB/day**, `BUILD-STATE.md` **~14 KB/day**, `spec-feedback.md` ~4.5 KB/day, `BUILD-SESSION-NOTES.md` **flat**. **Combined ~228 KB/day ≈ 3.3 percentage points of budget per day.** Move 1 removes about 54% of that. Three synced files still grow with every batch by ruled design. **Ruled work lands the meter at roughly 70% with ~20 days of runway, against ~3 days if nothing changed** — three weeks, not a flat slope, and Michael was told so before he ruled. The capture share of that is the table's ONE estimate; everything else is measured.
- **TWELVE RULINGS, PUT ONE AT A TIME.** `TC-1` scope — the index tonight, the review queue and BUILD-STATE deferred to their own sitting. `TC-2` the head-file rule — **the four most recent design `#nn` entries and every entry above the oldest of them**, whole and verbatim; *a flat count was rejected because the three most recent entries at that moment were two Code sessions and a runner line, so a "last 3" head would have carried zero design rulings and missed `#126`.* `TC-3` the index **splits** — existence rows cost ~116 B/entry, abstracts ~739 B/row and all the 25 KB/day, so the cheap half stays synced and the expensive half goes where the log went. `TC-4` **`docs/record/`**, a new excluded directory; canonical paths change once, deliberately, *and it was ruled expressly WITHOUT first checking whether per-file picker exclusion works, so that the answer stops mattering.* `TC-5` **one** synced file, not two. `TC-6` `docs/archive/` does **not** move — archive means closed and frozen, record means live but repo-only. `TC-7` all **fifteen** verified-landed captures relocate to ARCHIVE as a block. `TC-8` a required **TRANSIT line** on every future capture. `TC-9` the form-corpus capture **stays**. `TC-10` **`Q-CAP-5(b)` RETIRED**. `TC-11` move 3 gets its own pass. `TC-12` a **200 KB ceiling** on the head file with the shortfall named whenever it binds.
- **`Q-CAP-5(b)` HAD ALREADY FIRED AGAIN — thirty hours after the split it was written for.** Standing law proposes a positional split when the live log passes ~700 KB; it stood at **1,047,175 bytes**, the 08-20 split having moved 543,336 bytes out only for a third of that to be eaten back inside a day and a half. **Retired at `TC-10` rather than obeyed**, on the reason that splitting existed to keep the *synced* log small and the log is no longer synced. **`Q-CAP-5(a)` and `Q-CAP-5(c)` are untouched and still stand.**
- **A SECOND STRUCTURAL FINDING, RECORDED AND DELIBERATELY NOT RULED: `BS-1a`'s CAP IS A LINE CAP AND DENSITY HAS DEFEATED IT.** BUILD-STATE sits at **exactly 150 non-blank lines — at the cap — and 130,746 bytes: 871 bytes per line**, having grown **6.35×** since 08-12 **without ever breaching the cap**. Not a violation — the runner says the cap exists "for READABILITY, not token cost" — but the file is 1.9% of the budget and rising under a cap that structurally cannot stop it. **Belongs to the `TC-1` deferral; flagged, not decided.**
- **THE CAPTURE DISPOSITION WAS VERIFIED AT HEAD BY FULL TEXT, NOT RAG.** Fifteen captures each carry a filed entry (`#97`–`#117`) and relocate as a block. **Nine are NOT YET** — all eight root-level `2026-08-21` files plus the prompt that fired them, because **the string `2026-08-21` appears nowhere in the log** and `inbox/` was empty. Four stay because they are not captures: the disclosures REQ-CAPTURE draft (**RECON-1's subject**, and its stated canonical repo path does not yet exist), the Knowledge Repo acquisition list, the form-corpus capture per `TC-9`, and the permanently-carried set. **Nothing is deleted anywhere; relocation is to the ARCHIVE project, by Michael's hand, on the `#107` method — zip, byte-verify, deliver, then move.**
- **TWO THREADS FOUND WHILE VERIFYING, NEITHER CLOSED.** `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` is named by two files as unfiled and unreconciled and is in neither the repo nor project knowledge. And `form-corpus-mining-2026-08-18.md` / `form-defects-found-2026-08-18.md` were handed over in chat only — **if they were not saved they exist nowhere**, which is the whole reason `TC-9` keeps its capture.
- **`RE-SWEEP AFTER FIX` EARNED ITS KEEP ON ITS SECOND OUTING, AND THE EXHIBIT IS RECORDED BECAUSE IT IS SMALL AND EXACT.** The RR-1 pass over the session's own drafts found an arithmetic slip — the combined slope had been stated as **~224 KB/day** where the six measured per-file rates sum to **~228**, with `3.2` percentage points where they give `3.3`, `55%` where the share is `54%`, and a runway of `~21 days` where the corrected rate gives `~20`. Five figures were corrected across three documents. **The normalized re-sweep that the rule then requires found a SIXTH occurrence the fix pass had missed — `"~14 points"` surviving inside the packet's own open-items table, in a row nobody had reason to re-read.** That is precisely the failure class the 2026-08-20 ruling names: *fixes create defects the pre-fix pass has already blessed.* Corrected before the zip closed.
- **INSTRUCTIONS TRIGGERS 3 AND 4 BOTH FIRED; v26 drafted the same day.** Trigger 3 — `TC-8` is a new binding convention and `Q-CAP-5(b)` is a retired one. Trigger 4 — the working set changes materially (sync selection, capture class, start-of-session read).

**Staged for Code:** `docs/prompts/QUEUE-RUNNER.md` (v11 → v12, full replacement); `docs/specs/thin-constitution-restructure-2026-08-21.md` (new); the `git mv` of the live log and abstract index into `docs/record/`; the first generation of `docs/specs/session-log-head.md`; five live-pointer rewrites; this entry; the queue merge.

**Awaiting/Returned from Code, unreviewed:** FE-D1's migration `db/migrations/2026-08-20-fe-d1-form-engine.sql` remains UNRUN, Michael's hand — **carried from the 2026-08-21 `_Voice3` handoff, which itself read it from BUILD-STATE by retrieval and flagged it as an assumption. Verify at HEAD and check the entry that would have cleared it before carrying this line a third time** (start-of-session rule 5).

## 2026-08-20 — `dev:demo` MODE-CHECK FIX (Code session, UNNUMBERED per TOC-6 — no `#nn`, no runner ordinal) — one seam changed, the zero-setup demo path restored as a RULE rather than a local courtesy, proved with the helper file renamed aside; and Step 0 found the predecessor's push had never landed

**Not the queue runner and never doubling as it (MM-1): `inbox/` was empty at Step 0.** Authorized by Michael 2026-08-20 (Fable sitting, "Authorize the mode-check fix") to repair the finding this session's predecessor raised against itself — `docs/spec-feedback.md` finding 1. **Scope was held to the one seam: no auth, no adapter internals, no sign-in gate, no UI, no schema, no spec or gates-doc edits.**

- **STEP 0 DID NOT CLEAR AS WRITTEN, AND THE GAP IS THE PREDECESSOR'S BLOCKED PUSH, NOT A DIVERGED TREE.** Clean `git status`, on `master`, `inbox/` empty — but `HEAD` was **`b27d1b9`** and `origin/master` was **`8334be0`**. `git merge-base --is-ancestor` confirms local was **strictly ahead by exactly the FE-D1 commit**, i.e. the classifier-refused push the kickoff itself anticipated. **The bare `git push` was attempted at session start and refused again by the auto-mode classifier** — so this session's commit carries BOTH, and the gate was treated as satisfied-in-substance rather than silently ignored.
- **BASELINE HEALTH RAN BEFORE ANY CHANGE — 407 tests / 29 files, build exit 0, lint exit 0** — matching the kickoff's stated expectation, so nothing pre-existing could be mistaken for this session's work. **`.env` was measured, never read: `VITE_SUPABASE_URL` len 40, `VITE_SUPABASE_ANON_KEY` len 219 — the filled condition is REAL on this machine**, which is what made the exercise meaningful. No value was quoted or recorded.
- **THE FIX IS ONE SEAM, AND IT IS THE RIGHT ONE BECAUSE EVERY CONSUMER DERIVES FROM IT.** `usingSupabase` in `src/data/supabaseClient.ts` was `Boolean(url && key)`; it is now `resolveUsingSupabase(url, key, import.meta.env.MODE)`, an exported PURE function returning `Boolean(envUrl && envKey) && mode !== 'demo'`. Read at HEAD, **all seven consumer modules** — `src/data/index.ts` (which picks the adapter), `App.tsx` (the sign-in gate and the footer banner), `auth/AuthContext.tsx`, `pages/BillTrackingPage.tsx`, `pages/DiagnosticsPage.tsx`, `pages/StatutesPage.tsx`, `statutes/fetcher.ts` — take that one boolean, so **one line moved the whole app.** **A second apparent seam was checked and is NOT one:** `fetcher.ts` reads `import.meta.env.VITE_SUPABASE_URL` directly, but only past an `if (!usingSupabase) return` guard, so it inherits the fix.
- **WHY A PURE FUNCTION RATHER THAN AN INLINE `&&`:** the rule becomes testable without a live environment. That mattered — vitest runs in the default **node** environment and no existing test imported this module, so the import path was verified empirically rather than assumed (it constructs the client cleanly under node, no hang, no network).
- **PROVED TWICE, AND THE SECOND PROOF IS THE ONE THAT COUNTS.** **(1)** Six regression cases in `src/data/__tests__/demoMode.test.ts`, named for the spec-feedback finding: demo+filled → local; development+filled → supabase; production+filled → supabase; empty env → local in all four modes; **half-filled `.env` → local** (the pre-`#122` state of this machine, where the keys were present and the values never entered); and near-miss mode names (`Demo`, `demo-mode`) → supabase, so only the exact flag counts. **(2)** The **exercise on a filled `.env` with the helper file GONE**: the local gitignored `.env.demo` was renamed aside, `--mode demo` started on 5175, and the app served the **case list and the "Demo mode: data stays in this browser" banner — no sign-in gate, `Connected: central database` absent, zero console errors**. `npm run dev` served the **sign-in gate** in the same sitting, so Supabase mode is intact. **`.env.demo` was restored afterward (560b, unchanged, still gitignored by `.gitignore:25`).** **A fresh clone with a filled `.env` now has demo mode with no helper file at all** — which is the binding architecture rule the finding said was broken.
- **SCREENSHOTS WERE NOT TAKEN — the Browser pane is not displayed in this session and the page composited no frames.** The evidence is DOM and text reads, which for a banner-and-gate claim is the stronger instrument anyway; the limit is stated rather than papered over.
- **HEALTH AFTER: `npm test` 413 pass / 30 files, build exit 0, lint exit 0** — **+6 tests and +1 file against the 407/29 baseline, which is EXACTLY this session's new file and nothing else.** The build's chunk-size warning was diffed against the baseline run and is **byte-identical** — pre-existing, not new.
- **BUILD-STATE rewritten under the 150-non-blank cap and it SITS AT 150, unchanged — nothing was displaced because nothing was added:** every edit landed INSIDE existing lines. The anti-resurrection pointer is preserved. The `dev:demo` sentence now states the new truth and names the seam; the historical `Boolean(url && key)` sentence is marked as the rule that then stood.
- **ONE CORRECTION BEYOND THIS SESSION'S SEAM, MADE BECAUSE THE DESIGN SIDE CANNOT READ `src/` AND THIS FILE IS ITS SOLE AUTHORITY.** BUILD-STATE's opening paragraph asserted **"NO MIGRATION IS PENDING"** while its own header and §5 said FE-D1's migration was written and unrun. Both could not be true. `db/migrations/2026-08-20-fe-d1-form-engine.sql` exists at HEAD (13,171 bytes), so the flat claim was the false one and now reads **"EXACTLY ONE MIGRATION IS PENDING"**, naming the file. **No code, spec or gates-doc was touched to do it.**

**Staged for Code:** none. **The FE-D1 migration remains staged and remains expressly not a Code session's to execute.**
**Awaiting/Returned from Code, unreviewed:** this entry; the one-seam fix and its six regression cases; the BUILD-STATE refresh including the migration-contradiction correction. **`docs/spec-feedback.md` finding 1 is ANSWERED IN CODE and its text was deliberately NOT edited** — amending the findings list is a routing act that rides the design side, not this session.
**Still Michael's, unchanged by this session:** the FE-D1 migration · the ten remaining spec-feedback findings · **the push — attempted after this entry is committed, per the standing order that the entry never asserts a post-commit action; its actual outcome is reported to Michael in the session report and, if it failed, carried into the next runner line.**

## 2026-08-20 — FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED per TOC-6 — no `#nn`, no runner ordinal) — the engine is built, exercised in a browser on fixtures, and its migration is UNRUN; §11.3 turned out two-thirds already done by Michael's own artifact, and four defects were found and fixed by exercising, one of which shipped a file Word refuses to open

**Not the queue runner and never doubling as it (MM-1): `inbox/` was empty at Step 0.** Driven from `docs/prompts/PROMPT-fe-d1-build-session.md` against `docs/specs/fe-d1-build-slice.md` and `docs/specs/form-engine.md` at HEAD, which govern wherever the prompt and they differ. **Authorization is Michael's, 2026-08-12 (`#63`)**; BUILD-STATE at the one-hundred-eighteenth refresh said NOT BUILT and it was genuinely pending. **Step 0 cleared on every limb:** `git fetch`, `HEAD` == `origin/master` == **`8334be0`**, `git status --porcelain` empty, on `master`, `inbox/` empty. **HEALTH RAN AS A BASELINE BEFORE ANY CHANGE — 322 tests / 26 files, build exit 0, lint exit 0** — so a pre-existing failure could never have been mistaken for one this session wrote.

- **THE SOURCE `.docx` WAS ASKED FOR, NOT SEARCHED FOR (HK-5), AND WHAT CAME BACK CHANGED THE SHAPE OF THE FIRST TASK.** The prompt does not say where the §11.3 shell lives, so Michael was asked and supplied **three** files: the master `.docx`, a structure map, and **`REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md`** — the last two dated **that day**, eight days after the prompt was authored. **The REQ-CAPTURE is a relay packet routed *drafting project → Michael's hand → design project → reconciliation → ruling*: it is INPUT TO A RULING THAT HAS NOT HAPPENED, and it is NOT a build authority.** It carries six open questions, one of which says its subject "has to be ruled **before the renderer is built**." **The build proceeded on the ruled authorities under stated assumptions rather than stopping — a newer unruled proposal does not revoke a ruled authorization — and all six are recorded in `docs/spec-feedback.md` rather than answered here.**
- **§11.3 WAS TWO-THIRDS ALREADY DONE, AND THAT IS A MEASUREMENT, NOT AN IMPRESSION.** `word/document.xml` was read directly: the caption table is **4680 + 360 + 4320 = 9360 twips**, so §8's 9900-vs-9360 overhang defect is **already corrected in the artifact**, and there are **ZERO** vestigial tab stops at 720/4680/9360. **The one item genuinely outstanding was the COMPUTED § COLUMN** — all three caption cells are frozen at twelve paragraphs — **and that is renderer work, which is where §8 says it belongs.** Also measured on the same read: US Letter, margins top 990 / others 1440, Times New Roman only, `titlePg` with footer2 (first page) **BLANK** and footer1 carrying the short title plus live `PAGE`/`NUMPAGES` fields — **which contradicts §8's "page 1 footer = bare PAGE field"**, filed as a spec-feedback item.
- **THE ARTIFACT'S CLEANLINESS WAS VERIFIED HERE, NOT INHERITED FROM ITS OWN BANNER.** It calls itself "client-clean by construction"; that was checked. Document metadata reads `Un-named` with no application properties, **`word/comments.xml` is empty**, and a scan of all non-token prose found **exactly one** identifying cluster — **Michael's OWN signature block** (firm address, bar number, e-mail), which the structure map lists as fixed firm boilerplate. No client, party, cause number, provider, amount or date of occurrence. **It is committed at `src/forms/skeletons/`, which the design-side sync EXCLUDES, so it adds nothing to knowledge capacity.**
- **WHAT WAS BUILT.** `src/forms/` — a **zero-dependency** ZIP layer on the platform's own `deflate-raw` (`CompressionStream`/`DecompressionStream`, verified working in Node 24 and identical in browsers, **so no package was added**); the §12 docx mechanics ported from the ruled POC helpers (run-merge as a hard precondition, expect-count assertions, whole-paragraph clone, bookmark dedup); the renderer; the FC-1 token layer; the grammar/pronoun engine; §5 gates; FE-10 render lint; write-backs; the §9 library. **§10 substrate: four new tables with RLS, GRANTs and the probe entry IN THE SAME COMMIT (item 11), and `generated_documents` EXTENDED rather than forked** — seven nullable columns including the answer snapshot (FE-8's retention half) and posture (FE-15). UI: a **Forms** tab (PI matters only, same rule as Medical) and a **/templates** editor whose Save publishes a NEW version and never overwrites one.
- **§9 IS SEEDED VERBATIM AND MECHANICALLY, WHICH IS THE ONLY WAY "VERBATIM" IS ENFORCEABLE.** `src/forms/variants.ts` is **GENERATED** — every one of the twelve bodies was sliced out of `form-engine.md` §9 by program and asserted to appear in the source byte-exact before it was written; **not one character was retyped.** A regression test re-reads the spec **at HEAD** and fails on any drift, so spec-and-seed divergence breaks the suite instead of reaching a served document. **The deliberate gap is carried too: there is no mental-health variant and the test asserts its absence.**
- **THE TWO LIBRARIES DIVERGE, AND §9 WON BECAUSE §9 IS THE RULED ONE.** §9 carries **twelve** approved variants; the 2026-08-20 master carries **four** narrative archetypes with different text AND a different token vocabulary (§9 says `{client}`/`{provider_dr_name}`, the master says `{{plaintiff_name}}`/`{{expert_short_name}}`). **The archetype selects the paragraph SHELL — which supplies its `pPr` and therefore its formatting — and §9's approved text supplies the WORDS.** That is §12.3's clone mechanic exactly. The vocabularies are reconciled by an alias map in the token registry; **neither library was reworded.** Which library governs is Michael's and is filed.
- **FOUR DEFECTS FOUND BY EXERCISING, ALL FIXED, ALL WITH REGRESSION TESTS NAMED AS SUCH — AND THE FIRST ONE SHIPPED AN UNOPENABLE FILE.** **(1) UNESCAPED AMPERSAND.** Token values were substituted straight into `word/document.xml`; the fixture's opposing firm is **"Feldspar & Gneiss PLLC"** and that ampersand made the package **not well-formed XML**, which Word refuses outright. Caught by unzipping the generated file and parsing every part — **the tests were green while the artifact was broken.** Escaping now happens at the XML boundary, and a `lintXmlSafety` ship-gate rule makes it an **error**. An ampersand in a firm name is entirely ordinary. **(2) A DATE OFF BY ONE.** `new Date('2025-03-14')` parses as UTC midnight and formatting it in `America/Chicago` rendered **March 13** — the incident date on a served disclosure, wrong every time. Date-only values are now formatted from their own parts and never routed through a timezone. **This is §12.8's failure class in the other direction, in code written by the session that had just read §12.8.** **(3) THE TABLE ROW NEVER EXPANDED.** The specimen row was re-found by using its first forty characters as an anchor — generic run markup — which matched the HEADER row, leaving the provider-charge tokens to survive into the document. Now spliced on the row's own offset. **(4) THE NARRATIVE NAMED THE FACILITY, NOT THE CLINICIAN** — "Halite Regional Hospital, M.D. is an emergency medicine physician," because a provider party is routinely a business while §9's sentence is about a person.
- **BOTH BINDING INVARIANTS ARE TESTED RATHER THAN ASSERTED.** **Substitution, never regeneration:** the §12.5 parts-diff shows **`word/document.xml` ALONE** — styles, numbering, both footers, settings and fontTable byte-identical — and the UI **refuses to file a document** whose parts-diff says anything else. **Gates never write into the document:** output is **byte-identical** across every gate state and acknowledgement combination, and it is structural, not merely tested — the render context is built from ANSWERS and RECORDS and there is no parameter by which a gate could reach it. **A tension was found in the spec and resolved rather than glossed:** §5 item 3 (the retained package) reads against §5's own invariant; the reading taken is that retained/non-retained is DATA, not gate STATE. Filed for Michael to overrule.
- **TWO PLACES WHERE THE SPEC ASKED FOR SOMETHING THE DISCIPLINE FORBIDS, AND THE DISCIPLINE WON.** **§2 item 7 wants a COMPUTED 195.2 designation deadline.** Registry rule 1 is binding: an unverified rule may drive warnings and placeholders, **never computed legal outcomes** — and the 195.2 propositions are UNVERIFIED, with a known 90/60-vs-60/90 conflict flag on top. **Nothing is computed**; the panel states the rule, names its status, and asserts no date. **And §2 item 8's "one-click PDF" is not buildable in a browser** — it needs Word or LibreOffice, and `pdfjs-dist` is a reader. **The UI says so plainly rather than shipping a button that lies.** Same for OneDrive: no integration exists, so paths are metadata and storage stays gate 7's.
- **EXERCISED BY CLICKING, IN DEMO MODE — AND GETTING THERE SURFACED A BROKEN CAPABILITY BUILD-STATE PUBLISHES AS WORKING.** **`npm run dev:demo` NO LONGER REACHES DEMO MODE.** Vite loads `.env` in every mode, so once `.env` carried real values (`#122`) the flag stopped mattering and the demo server served the **sign-in gate** — proved by starting it. A gitignored `.env.demo` blanking the two variables restores it; **that file is LOCAL and is NOT in this commit**, so a fresh clone with a filled `.env` still has no demo mode. **The walk then ran end to end** against the seeded Garcia matter: both provider cards, all twelve variants in the picker, a document generated, the lint reported, write-backs shown, and the editor publishing v2 while v1 stayed readable. **Zero console errors.** **Screenshots were NOT taken — the Browser pane was not displayed and the page composited no frames — so the evidence here is DOM and text reads, which is stronger anyway; that limit is stated rather than papered over.**
- **THE WALK ALSO CAUGHT A GAP IN "ENTER ONCE" THAT NO TEST WOULD HAVE.** The seeded Garcia matter has **no Defendant-role link at all**, and the wizard rendered an empty defendant block, an empty TO: list and an empty (b)(1) response — **every one of them silently well-formed.** That is defect class D-2/D-4 arriving by OMISSION rather than by contamination. Structural gaps are now surfaced in "still needed" alongside missing scalars: no defendant, no opposing counsel, **and unknown pronouns** — which render as they/their, never wrong about a person but also not what the record says, and REQ-04 makes pronouns data.
- **WRITE-BACKS ARE FLAGGED, NEVER GUESSED, AND MOST OF THEM ARE FLAGS.** Credentials land on the party record; **a conflicting value already there is surfaced, not overwritten.** Treatment checklists and future care have **nowhere to land** — the medical module holds bills and line items, not treatment records — so they are reported as flagged with the reason, and ride the document's answer snapshot instead. **The wizard shows the plan before anything is written.**
- **`privilege_tier` WAS TOUCHED AND DELIBERATELY NOT RESOLVED.** This slice writes to `generated_documents`, so it **copied that table's vocabulary, renamed nothing, and reconciled nothing** (`Q-COM-10` stays open, its convergence shape ruled but unexecuted). Neither CHECK was altered. **The engine leaves the column NULL** — `Q-COM-11` ruled (A): NULL means unclassified-must-classify, and writing `'work-product'` asserts a privilege nobody chose. **No creation-time classification UI was built, so every document this engine files is unclassified.**
- **THE MIGRATION IS WRITTEN AND UNRUN, AND NOTHING TOUCHED THE LIVE DATABASE.** `db/migrations/2026-08-20-fe-d1-form-engine.sql`, **Michael's hand**, with **eight verification checks to answer in words** — including that `anon` reaches **none** of the four new tables and that **no item table was created**, since FE-D1 creates no items. **The four tables arrive AFTER the 2026-08-20 gate-3 run, so they are OUTSIDE that run's 37×2 grid and carry their own from-birth evidence** rather than borrowing its. **`db/schema.sql` is 41 tables; the live database is still 37, and the gap is the honest state.**
- **HEALTH AFTER: `npm test` 407 pass / 29 files, build exit 0, lint exit 0** — against the 322/26 baseline, **+85 tests and +3 files**. **AND THE STANDING LESSON HELD AGAIN THIS SESSION, on this session's own code: `npm test` was GREEN while `tsc -b` carried eight errors.** vitest does not type-check. The probe-count test **correctly failed** at 37 and was updated to 41, and the CL-2 store-version pin **correctly failed** at 12 and was updated to 13 — **both of those failing is the instrument working**, and a new test now asserts the probe list is sequence-identical to `db/schema.sql`'s own create-table order so a forgotten table fails the suite.
- **BUILD-STATE rewritten in full under the 150-non-blank cap, DISPLACED not appended — it sits AT 150 — with the anti-resurrection pointer preserved.** **What paid for the one added line (the `Forms` tab row) is named in the header: the standalone written-from-commit line, folded into the header sentence.** **The TOC was NOT touched.** Its census balances at HEAD (**133 entries, 133 rows**, re-derived), and TOC-4's trigger is a queue-runner batch, which this is not; the file's own rule is *regenerate, do not append*. **This entry therefore makes it 134 entries against 133 rows** — 135 `## ` headings less the one `## ARCHIVED:` pointer stanza, which is the census's own correction term — **and the next runner batch's census detects that by design** — recorded here so that reads as expected rather than as a defect.
- **AND THE PROMPT CONFLICTS WITH THE CONVENTION, RECORDED RATHER THAN EDITED.** Its Step 4 item 1 says the entry takes "next free number"; **TOC-6 (2026-08-18) says Code sessions never mint `#nn`.** The convention wins and this entry is unnumbered, per the prompt's own conflict clause. **The prompt was NOT edited this session** — correcting it is a routing act, not a build act — and it is filed. **A second, sharper one: both the prompt and the slice doc say the anti-resurrection ledger retires FE-1. READ AT HEAD, IT DOES NOT — `FE-1` appears nowhere in that file.** FE-1's retirement is real and recorded in `form-engine.md` §12.6, so nothing is lost; but a reader sent to the ledger to confirm it finds nothing, which is the exact failure the ledger exists to prevent.

**Staged for Code:** the FE-D1 migration — **written, guarded, safe to re-run, and expressly NOT this session's to execute.**
**Awaiting/Returned from Code, unreviewed:** this entry; the FE-D1 build itself; the BUILD-STATE refresh; and **eleven findings in `docs/spec-feedback.md`** — the broken `dev:demo` path, FE-1's absence from the ledger, the 2026-08-20 REQ-CAPTURE's four code-bearing open questions, the 12-vs-4 variant divergence, §8's first-page footer, §11.3's already-done two-thirds, §5.3 against §5's invariant, §2 item 7 against registry rule 1, the OneDrive/PDF gap, the `privilege_tier` touch, and the TOC-6-vs-prompt conflict.
**Still Michael's, unchanged by this session:** run the migration (or don't — nothing depends on it while the engine stays off the floor) · rule the REQ-CAPTURE's six · **gate 9 remains the GL-1 floor's one open item, and this build is EXCLUDED from that floor: `docs/skills/drafting-disclosures/SKILL.md` was not touched and remains the live drafting path.**

## 2026-08-20 — QUEUE-RUNNER batch (runner line; SEVENTY-NINTH invocation) — one docs-only packet, FOUR routing rows: gate 3 CLOSES with its edges, GL1-1's correcting append lands beneath gate 1, three queue rows close — and the session STOOD DOWN from a superseded dispatch before writing anything

**THE PACKET.** `push-to-code_ruling-night-126_2026-08-20.zip`, identity pinned at Step 1 per QR-6(c) — **10,178 B, mtime 2026-08-20 17:57:53 Central, sha256 `a2d4d3fa637acfa52fb83dea3c083533a9edac23b1eab6416967e8c189af3167`** — checked against the hash Michael stated in-session and matching on every fact. One packet, four routing rows, **executed in the manifest's order 2 → 3 → 4 → 1** so the entry lands last describing acts already done. Step 0 gate: live `git fetch` + `git ls-remote origin refs/heads/master` → `89ccd87…`, equal to local HEAD, 0 ahead / 0 behind, `git status --porcelain` empty, no stranded lock. Nothing superseded (single packet); nothing skipped as already built — the three pre-checks each returned the zero their order required (`Q-G3-4` and `GL1-1` absent from the gates doc, `#126` absent from the log), and with HEAD equal to origin this was genuinely PENDING rather than committed-but-unpushed.

**HEALTH CHECK SKIPPED, AND RECORDED RATHER THAN SILENT (QR-6(f)).** Docs-only batch: §5 is NONE and no `src/`, `db/`, `supabase/` or build-tooling path was written. `npm test` / `npm run build` / `npm run lint` would prove nothing about a batch that changed no code, so the trio was not run and no health figure is claimed here.

**THE STAND-DOWN, RECORDED BECAUSE IT IS THE SECOND OF THE DAY.** A CHAT-DISPATCH for the gate-closure sitting was pasted into THIS Code session before the design side's rulings landed; it directed a §A0 collection and the assembly of the very packet that, by then, already existed in `inbox/`. On Michael's response the session **stood down from §A0/§B without writing, staging or authoring anything**, and ran the queue on the already-cut packet instead — **no duplicate artifact was created, no second `#126`, no competing edit-order.** (The day's first stand-down is at `#124`. No `#nn` is minted here — TOC-6; this runner ordinal carries it.)

- **ROW 2 — GATE 3 CLOSES.** The closure note was appended beneath gate 3 in `docs/specs/Go_Live_Gates.md`, block extracted from the edit-order by program. Gate 3's own text is untouched; `Q-G3-4` appears exactly once; byte growth equalled the block exactly and the byte-prefix above the append point was proved unchanged. **A FIX PASS WAS NEEDED AND GOT ITS OWN RE-SWEEP, WHICH IS THE `#118` RULE ADOPTED THE SAME SITTING BINDING ON ITS FIRST BATCH:** the first write left gate 4 with no blank line above it, where gate 2's clarifications — the shape the order names — carry one, and without it CommonMark lazy-continuation folds gate 4 into the preceding paragraph. The blank line was inserted and **every touched claim re-swept normalized**: no CR, `Q-G3-4` once, gate-3 text intact, gates 1–5 all present and line-anchored, all five edges present.
- **ROW 3 — `GL1-1` ADOPTED AS DRAFTED, both acts.** The candidate text was extracted **from `docs/specs/gl1-1-gate1-append-draft-2026-08-19.md` at HEAD by `git show`, never retyped**, its `> ` markers stripped to the three-space indented-italic shape, and the transform **proved mechanically by strip-and-compare rather than eyeballed**. Placed beneath gate 1, present exactly once, prefix above unchanged, gate 1's text and the draft file both untouched. The retraction-class note inside the block survives byte-exact.
- **ROW 4 + ROW 3's ACT 2 — THREE ROWS CLOSED, ONE HEADER SENTENCE (QR-6(b)'s two acts).** `GL1-1`, `LE-1` and `WS-P2` closed ⬜ → ✅ with **every question text preserved byte-exact and the answers APPENDED** per QR-1. **Row-anchored open rows 350 → 347**, derived on the file's own matcher — which is `^\s*- ⬜`, counting 334 top-level plus 16 nested rows; a bare `^- ⬜` reads 334 and an any-position glyph reads 362, and neither is the published figure.
- **A DISCREPANCY IN THE ORDER ITSELF, REPORTED NOT PAPERED OVER.** `EDIT-ORDER_gl1-1-append-and-row.md` predicted **350 → 348 if `WS-P2` is a row**. Three rows close when it is one, so the arithmetic is off by one; the **manifest's §1 was right** ("expect 350 − 2 or − 3"). The count above is derived, not carried.
- **`WS-P2` — WHAT WAS ACTUALLY MOOTED.** The order treats it as an unruled question. **The row itself records it RULED 2026-08-18 (#108) "Exclude," left open on the `Q-AUTH-1` ruled-pending-execution shape awaiting Michael's click.** So what `Q-CAP-4` moots is **the pending click**, not a ruling — and it is genuinely moot: `git ls-files docs/authority/pdf/` returns **one file, `README.md`, 388 B**, re-verified at HEAD this batch rather than carried from `#120`, and the README names itself a *destination* for PDFs that live in project knowledge, not in the repo. A note to that effect rides the closed row. **`WS-P1` is untouched and stays OPEN — its click has a real target.**
- **`PF-2` WAS NOT CLOSED, AND THAT IS REPORTED RATHER THAN QUIETLY DONE.** The `#118` proposal ruled **"Adopt as standing"** this sitting is carried verbatim by an existing OPEN queue row, `PF-2` — *"Does the preflight-re-run rule become a convention?"* **No routing row in this packet reaches it**, and closing a row no order names is precisely the packet-added act QR-6(e) bars without Michael's in-session authorization. It stays ⬜ OPEN. **For Michael: the register currently carries an open row whose question was answered tonight; one word closes it in the next batch.**
- **DO-NOTs HONORED.** Gate 9 and its section were not touched — tomorrow's sitting owns it, on evidence that does not exist yet. The gate-3 run record, protocol and prompts were not touched; the `GL1-1` draft was read, never modified; no `Q-G3`/`Q-CAP` row was minted; **v24 and the project instructions were neither routed nor committed** — pasting is Michael's hand. No token, link or email-body content appears anywhere in this batch.

**Staged for Code:** none. **Awaiting/Returned from Code, unreviewed:** this batch's handback — the two gates-doc appends, the three row closures with their header sentence, and `#126` as filed.
**Still open and still Michael's (the packet's §7, merged so the top of the log stays truthful):** paste **v24** into the project instructions, then Sync — delivered this sitting, his hand · the **signup toggle → OFF** and its ruling record · the **outside mailbox's provider + folder** · the **16:47 link's** click-or-lapse · the **§4.5 fresh-profile repeat** and a later-day second · the **gate-9 closure sitting**, the last floor act · the **`/usage` reading**, asked and not yet stated · and now **`PF-2`'s closure**, added by this batch's finding.

## 2026-08-20 (#126) — THE RE-CHECK'S RULING NIGHT: EIGHT RULINGS IN ONE SITTING — gate 3 CLOSES with edges, GL1-1 adopts, the #118 re-sweep rule and the Q-CAP-5 capacity policy become standing law, LE-1 and Q-CAP-4 close, Q-G3-5 and DMARC defer — and v24 ships the same day trigger 3 fired, three ways (design session, Cowork, Fable 5; bridge reads at `89ccd87`)

**THE SITTING.** The gates re-check (GL-1 floor item 5) was pre-staged in this session: full gate
walk at `89ccd87` from the record (`#124`/`#125`, BUILD-STATE, the gates doc read full-text via
bridge), then every ruling that does not depend on tomorrow's §4.5 evidence was put to Michael
via question buttons, each with the recommendation stated and the full context in the question
text. **His selections, quoted exactly as chosen:**

1. **`Q-G3-4` — "Close gate 3, edges recorded."** Gate 3 CLOSES on the 2026-08-20 run via a
   gate-10-style appended note (EDIT-ORDER in this packet) naming the edges: one policy body in
   force on 36 tables; UPDATE/DELETE not designed-tested; the solo framing conditioned on the
   signup toggle (`#125`); `Q-G3-5` deferred; `Q-G3-3` open for future runs. **GL-1 floor item
   (4) CLEARS.**
2. **`Q-G3-5` — "Defer to a named trigger."** The standing probe stays at 5 write paths;
   re-raised at the gate-2 multi-user phase or Michael's earlier call; the run record's §7
   derivation cautions ride its eventual builder. No build act now.
3. **`GL1-1` — "Adopt as drafted."** The candidate correcting append (filed 2026-08-19 at
   `docs/specs/gl1-1-gate1-append-draft-2026-08-19.md`) goes beneath gate 1 by program-extracted
   byte copy; the queue row closes per QR-1 (EDIT-ORDER in this packet). Gate 1's decision stands
   undisturbed; its record becomes accurate about its own reasoning, uncloseable limb included.
4. **The `#118` proposal — "Adopt as standing."** New binding convention, RR-1 family: **when a
   preflight or audit returns findings that are then fixed, the fix pass gets its own check
   before the zip closes — at minimum a normalized re-sweep of every claim the fixes touched.**
   Origin exhibits: batch 72's two post-fix defects. **Instructions trigger 3 FIRED.**
5. **`LE-1` — "Note yes, .gitattributes no."** The bridge-CRLF false-dirty earns a v24
   operational note (the decisive checks included — among them `git -c core.autocrlf=true
   status` → clean, preserved on the row at `#124`); **no `.gitattributes`** — normalization
   churn outweighs a design-side-only nuisance already mitigated; revisit only if it ever bites
   a Code session. Row closes (EDIT-ORDER in this packet). **Trigger 3 FIRED (second).**
6. **`Q-CAP-4` — "Close as moot."** `WS-P2`'s premise was measured false at `#120`; its real
   subject was `Q-CAP-2`'s, already excluded. The EDIT-ORDER closes the row IF it is one, and
   otherwise reports `WS-P2`'s actual home and touches nothing — this entry is the ruling record
   either way.
7. **`Q-CAP-5` — "Adopt all three."** Standing capacity policy, design-side, no runner change:
   **(a)** any design session starting at knowledge ≥ 90% flags it and stages a capacity pass;
   **(b)** when the LIVE log passes ~700 KB, the sitting proposes the next positional split for
   Michael's ruling — cutoff rolled forward, `Q-CAP-1` mechanics, the split always his ruling,
   never automatic; **(c)** capacity is re-measured at every trigger-7 monthly review.
   **Trigger 3 FIRED (third).**
8. **DMARC — "Defer past go-live."** Gate 9 closes without it; revisit after launch or at the
   multi-user hardening. Recorded so it leaves the open lists.

- **v24 DELIVERED THE SAME DAY, AS TRIGGER 3 REQUIRES.** The full instructions text — v23 plus
  exactly: the `#118` convention, the `LE-1` operational note, the `Q-CAP-5` policy folded into
  the capacity note, the gates-doc description updated for tonight's appends, and the trigger-3
  log line — was drafted this sitting and handed to Michael as its own file. **Pasting it is his
  hand; v24 is the floor-item-5 revision under OPEN-1's reading ("the instructions current at
  the re-check").** No other instruction text changed.
- **THE GATE WALK, AS PRE-STAGED AND PUT (full detail in this sitting's chat; statuses re-derived
  at `89ccd87`, not carried):** gate 1 ✓ Pro (plus tonight's GL1-1 append) · gate 2 gates the
  multi-user phase only, GH-1 tripwire intact · gate 3 **CLOSED tonight** · gate 4 ✓ key in
  Supabase secrets, M-4 rides T3 · gate 5 ✓ standing, no violations on record · gate 6 ✓ in
  substance — the gate-3 run authenticated through the flow it demanded · gates 7–8 not
  floor-blocking by their own triggers · gate 9 OPEN pending §4.5 + the owed §4.4 details ·
  gate 10 ✓ CLOSED with edges (2026-08-20, edge-2 discharged).
- **FLOOR AFTER THIS BATCH:** (1) ✓ · (2) ✓ · (3) gate 9 — closes on tomorrow's evidence ·
  (4) ✓ **cleared tonight** · (5) ✓ **this sitting + v24** (completing at gate 9's close).
  **Go-live = gate 9's closure away.**
- **STILL OPEN, MICHAEL'S, carried to the closure sitting:** the signup toggle's OFF click (+ its
  ruling record) · the outside mailbox's provider + folder · the 16:47 link's click-or-lapse ·
  the §4.5 fresh-profile repeat (tomorrow) and a later-day second · the §4.4
  invite-substitution + §4.5 fresh-profile-form acceptances, ruled at gate-9 closure · the
  `/usage` reading (asked; not yet stated — allocation for the final sitting reasons from it
  when given). A CHAT-DISPATCH for that sitting was delivered this session (Opus; carries these
  items and the gate-9 closure order's evidence requirements).

**Staged for Code:** this entry; `EDIT-ORDER_gate3-closure-append.md`;
`EDIT-ORDER_gl1-1-append-and-row.md`; `EDIT-ORDER_le1-wsp2-rows.md` — one packet.
**Awaiting/Returned from Code, unreviewed:** this batch's handback.
**Still open and still Michael's:** the items in the bullet above · `Q-CAP-5`(b)'s first firing
whenever the live log crosses ~700 KB · gate 9's closure and with it the floor.

## 2026-08-20 — QUEUE-RUNNER batch (runner line; SEVENTY-EIGHTH invocation) — one docs-only packet, ONE routing row: gate 9's evidence day filed, the signup toggle found ON, and the queue deliberately NOT touched on a standing scope ruling

**One zip in `inbox/`, executed:** `push-to-code_gate9-evidence-125_2026-08-20.zip` (**6,430 B, mtime `2026-08-20 17:04:05 −05:00`, sha256 `35fff0ea6ef212fd…`**). Identity pinned at Step 1 per QR-6(c), **re-pinned byte-for-byte after the STOP and unchanged**, and deleted by explicit name at Step 4 item 5 against that pin. **Both orders were still computed (QR-4) and are trivially identical** — one packet admits no ordering — and the filename date parses cleanly, so no unparseable-date flag was owed. Michael confirmed at the Step 1 STOP; nothing was executed on silence.

- **THE STEP 0 GATE CLEARED ON ALL FOUR LIMBS, EACH BY A COMMAND THAT COULD HAVE DISCONFIRMED IT (QR-6(a)).** A live `git fetch origin` plus a bare `git ls-remote origin refs/heads/master` returned **`3020dfd`**, equal to local `HEAD`, with `git rev-list --left-right --count HEAD...origin/master` reading **0 / 0** and `git status --short --branch` showing a clean tree on `master`. Neither the behind-limb nor the ahead-stop arose. **The packet's §1 expressly declined to claim anything about origin and left it to this gate** — the right posture, and the gate settled it.
- **BOTH QR-5 CARRY-FORWARD LIMBS WERE CLEAR, AND EACH WAS LEARNED THE ONLY WAY THIS BATCH COULD LEARN IT.** `git merge-base --is-ancestor 3020dfd origin/master` returns true and **`3020dfd` IS batch 77's own commit**, so **batch 77's push DID land** — that entry is barred from asserting it. And **`inbox/` held EXACTLY ONE zip and it was NOT batch 77's**: `ls inbox/push-to-code_gate3-reconcile-124_2026-08-20.zip` returned *No such file or directory*, checked by explicit name rather than inferred from a count — **which is the only way this batch could learn that batch 77's DELETION ran**, barred by the same rule. **Nothing was carried into this line.** Step 0 items 1–4 were already satisfied: `inbox/` exists, `.gitignore:16` carries `inbox/`, CLAUDE.md:349 carries the note, and `Bash(rm -f inbox/*)` is present in `.claude/settings.local.json`.
- **THE ALREADY-EXECUTED PROBE WAS NEGATIVE, AND IT HAD TO BE A CONTENT PROBE — WITH A SECOND LIMB THE SPLIT MADE NECESSARY.** The packet's sole act is an APPEND INTO AN EXISTING FILE, so no path's absence could mean anything. Probed by content instead: **`#125` occurred 0 times in the live log** and design high-water stood at **`#124`**, so `#125` was free and no renumber was owed — **and it was also probed against `docs/archive/session-log-archive-2026-07-21_2026-08-12.md`, which returned 0**, a limb that did not exist before the `Q-CAP-1` split and which any future numbering probe now owes. The committed-but-unpushed limb was excluded by the Step 0 result rather than by assumption — `HEAD` and `origin/master` are the same commit, so there was nothing at `HEAD` for `origin` to be missing.
- **THE HEALTH CHECK WAS SKIPPED ON THE RULE, NOT BY OMISSION, AND THE REASON IS NAMED (QR-6(f)).** The skip needs `§5` NONE **and** no `src/`, `db/`, `supabase/` or build-tooling path routed. **Both limbs hold**: §5 reads `— **NONE.**` in terms, and the routing table reaches exactly one path, `docs/specs/session-log.md`. `npm test` / `npm run build` / `npm run lint` could prove nothing about a batch that changed no code. **No health figure is asserted anywhere in this entry; a skipped check is not a pass.**
- **THE CONFLICT RULE DID NOT FIRE AND HAD NOTHING TO REACH — ONE PACKET, ONE ROUTING ROW, the thinnest packet the runner has taken. Nothing was superseded and nothing was skipped as already built.** `#125` was filed **BY BYTE COPY** — 7,370 B, 0 CR, confirmed present exactly once and byte-exact — and **per TOC-6 this runner line mints no `#nn`**, carrying only the invocation ordinal. The packet minted `#125` design-side, as its §3 says.
- **THE QUEUE WAS NOT TOUCHED AT ALL, AND THAT IS `QR-6(b)`'s CONDITIONAL HALF CORRECTLY DECLINED RATHER THAN AN OMISSION — WHICH IS EXACTLY THE THING THAT LOOKS LIKE A MISS AND IS NOT.** Two independent authorities agree: the packet's §6 bars creating rows and says in terms that **no Status-header sentence is owed unless the queue is touched**, and the queue's OWN Status header already records the **2026-08-19 scope ruling** keeping **gate 9's §4 remainder gates-side and out of that file**. **The precedent was verified rather than assumed: the header's reconcile chain runs `…#120, #121, #124` — `#122` and `#123` carry NO sentence**, batches 75 and 76 having stood in this same posture. **Row-anchored open rows re-derived at HEAD on the file's own matcher (`lstrip()` then `- ⬜`) and UNMOVED at 350**; `git status` shows the file byte-untouched by this batch.
- **THE ROW-LESS `§7` SERIES WAS VERIFIED TO HAVE HOMES RATHER THAN TRUSTED TO HAVE THEM, WHICH IS THE ONLY THING THAT MAKES "NO NEW ROWS" COMPLIANCE INSTEAD OF LOSS.** QR-1's rationale is that the packet is deleted, so a question with no filed home dies with it. Every one of the six was checked at HEAD by opening the file: **`docs/smtp-setup.md` (10,907 B) carries the outside-mailbox requirement and the later-day repeats at its §4 items 4 and 5, and the optional DMARC `p=none` at its §2**; **`Go_Live_Gates.md` (16,012 B) carries the gates re-check as floor item (5)**; and **the two items with no prior home anywhere — the signup-toggle ruling and the 16:47 link's click-or-lapse — take `#125` itself as their permanent home**, filed by this batch, which is precisely why filing it mattered more than a row would have.
- **THE DAY'S SECURITY FINDING IS CARRIED FORWARD RATHER THAN LEFT INSIDE ONE BULLET: "Allow new users to sign up" WAS MEASURED ON.** With magic-link auth and 36 byte-identical `using (true)` policies, ON means the set of authenticatable users is not closed — **which is the condition the gate-3 run record's §10 framing silently assumed**, and is context for `Q-G3-4` at the re-check rather than a correction of that record. **The recommendation (OFF for the solo phase) is put; the ruling and the execution are Michael's hand in the dashboard and were PENDING at the entry's stamp. This batch changed no live configuration and could not have.**
- **THE `§6` NO-CREDENTIAL RULE WAS CHECKED AGAINST THE STAGED TEXT, NOT ASSUMED FROM THE PACKET'S SAY-SO.** The entry reproduces **no URL, no token value and no email body** — it carries `Authentication-Results` header facts only (`spf=pass`, the two `dkim=pass` results, `dmarc=bestguesspass`, `compauth=pass`, the `SCL`/`CAT`/`DIR` stamps and the Received chain), which the runbook's own §4.2 treats as the evidence to read. **Nothing this batch wrote carries a credential of any kind.**
- **THE TOC RIDES THIS COMMIT AT ITS TWENTY-NINTH EDITION AND IS A GENUINE `TOC-4` FIRING — THE TWENTY-FOURTH.** The pointer-stanza census term was applied **before** the edit as well as after: going in, **130 `## ` headings − 1 pointer stanza = 129 entries against 129 rows**, so nothing had landed unindexed since batch 77's same-day edition; as written, **132 − 1 = 131 against 131.** Buckets re-derived on the position-anchored matcher and summing exactly: **numbered 60 → 61** (`#125`; range `#65`–`#125`, gapless), **runner ordinals 55 → 56** (`runner 78`; range 23–78, no gaps), **`other` 14 and the unnumbered-runner bucket 0, both UNMOVED** — **61 + 56 + 0 + 14 = 131.**
- **`DT-1` WAS READ AND THE DIVERGENT WINDOW DID NOT APPLY, FOR A FOURTH CONSECUTIVE BATCH.** PowerShell, the authority, read **`2026-08-20 17:11 −05:00`** (`Central Standard Time`) against a UTC **`2026-08-20 22:11`** — **the same calendar day.** Every date written this batch is the Central **2026-08-20**, which is also what the packet's §0 stamped.
- **NO PACKET-ADDED ACT AROSE THIS BATCH (QR-6(e)), AND SAYING SO IS THE POINT.** The packet's §8 restates the runner's own Step 4 obligations — byte copy, the 150-cap rewrite with counts recomputed, the TOC census term, a push verified by bare `git ls-remote`, delete-by-explicit-filename — and **asks for nothing outside a routing row or a Step 4 item**. Its close line is the runner's own, unmodified.
- **WHAT DID NOT HAPPEN, STATED SO THE RECORD CANNOT INFLATE IT.** **Gate 9 was NOT closed** — it closes at the gates re-check on the §4 evidence, not here — and **`Go_Live_Gates.md` and `docs/smtp-setup.md` were READ but NOT EDITED**, which is how the homes above were verified. **No queue row was added or closed and no Status-header sentence was written.** The gate-3 protocol, its run record and `docs/prompts/` were not touched; `QUEUE-RUNNER.md` was not amended. **§5 is NONE, so no `src/`, `db/` or `supabase/` path was written** — several were read, which is how the counts in BUILD-STATE are re-derived rather than carried. **Nothing was written to, read from, or connected to the live database.** **No registry entry was set to verified.** **No sync or picker claim of this batch's own is made anywhere** — a Code session can neither read nor change that setting — and `#125`'s pending items were **left exactly as stamped**, per §6, because an entry states its stamp time's truth.

**Staged for Code:** none. **Awaiting/Returned from Code, unreviewed:** this batch's routing — the `#125` byte copy, the twenty-ninth TOC edition, and the BUILD-STATE refresh. **Still open and still Michael's, merged from the packet's §7:** **(1)** rule and execute **signups → OFF** (his hand, dashboard; the day's security finding) · **(2)** state the **outside mailbox's provider and folder**, which completes §4.4's outside half · **(3)** the **16:47 link** — click it to consume, or let it lapse · **(4)** **§4.5 later-day repeats**, tomorrow and once more, from a fresh browser profile · **(5)** optional **DMARC `p=none`**, still deliberately outside the go-live window · **(6)** the **gates re-check sweep**, the last floor sitting, now carrying `#125`'s three additions — the §4.4 invite-template substitution, the §4.5 fresh-profile form, and the signup-toggle finding as `Q-G3-4` context — on top of everything carried at `#121`–`#124`.

## 2026-08-20 (#125) — `Q-CAP-3` CLOSED BY MEASUREMENT (85.1%), batch 77 verified, and gate 9's evidence day: §4.2 PASSES ON THE RECEIVER'S OWN VERDICT, the outside-mailbox invite arrived, THE SIGNUP TOGGLE IS FOUND ON — and three pasted-link incidents are recorded with their disposals (design session, Cowork, Fable 5; bridge reads at `3020dfd`)

**`Q-CAP-3` IS CLOSED, AND BY MEASUREMENT, NOT REPORT.** After Michael's hand added the exclusion
and re-synced: the project's sync filters now carry `/docs/archive/": "exclude"`, and
`knowledge_size` fell **1,856,462 → 1,701,643 — 92.8% → 85.1%**, ~155K tokens freed. The day's full
series: **91.9 → 92.3 → 92.8 → 85.1**. All three `Q-CAP` acts are now ruled, executed, and
verified. Calibration datum for the `#124` correction: the archive lever's byte-derived estimate
(~167K) ran ~7% high against the measured ~155K — same instrument, tolerable error, no further
correction; the instrument's bias is now on the record twice with signs both ways named.

- **BATCH 77 SPOT-VERIFIED DESIGN-SIDE at `3020dfd`** — placement and counts, not a full-text
  re-read: `#124` present exactly once at the top under the runner-77 line; the `LE-1` evidence
  append present exactly once with open rows unmoved at 350; TOC census 129/129; BUILD-STATE at
  exactly 150 non-blank (one-hundred-sixteenth refresh); `inbox/` empty; no stranded lock.
- **GATE 9, §4.2 — HEADERS: PASS, ON THE RECEIVER'S OWN VERDICT.** From the 16:47 Central
  signin@ message's internet headers, read via Outlook's message-details dialog:
  `spf=pass` (`smtp.mailfrom=pm-bounces.brennanstx.com` — the envelope rides the Postmark bounce
  subdomain; the root SPF record was never in play) · `dkim=pass` TWICE — `header.d=pm.mtasv.net`
  and **`header.d=brennanstx.com`**, selector `20260820071052pm`, signed as
  `signin@brennanstx.com` — the firm-domain pass §4.2 requires, explicit ·
  `dmarc=bestguesspass action=none` — Microsoft's no-record-published-but-would-pass verdict,
  inside §4.2's "pass, or none" band · `compauth=pass` · and the filter's own delivery stamp
  `SCL:1 … CAT:NONE … DIR:INB`. The Received chain shows Postmark end-to-end
  (`production-pmta…postmarkapp.com` → `mta215a-ord.mtasv.net` → `mail.protection.outlook.com`),
  TLS on every hop — §4.3's headers-show-the-provider evidence now from the receiving side too.
  **Corroboration via the M365 connector (scope named below): all three signin@ messages today
  carry `mtasv.net` message-ids.** Sender display name is live as "Michael D. Brennan, PLLC."
- **§4.4, JUNK HALF: PASS** — inbox, stated by Michael and confirmed by the receiver's `DIR:INB`
  stamp. **§4.4, OUTSIDE-MAILBOX HALF: ARRIVAL PROVEN, DETAILS OWED.** Shape: with the runbook's
  literal round trip unavailable-by-design (next bullet), an **admin invite** was sent from the
  dashboard to a non-tenant mailbox Michael controls — admin invites ride the same
  Supabase → Postmark → recipient pipeline and ignore the signup toggle. **The invite ARRIVED**
  (proven, in fact, by the incident below). The invited `auth.users` row was then **DELETED by
  Michael's hand** — the mark on live auth is cleaned and the invite link invalidated. Still owed
  before the re-check rules this half: **which provider the outside mailbox is and which folder
  the invite landed in** (its own header line optional). The invite-template-for-magic-link
  substitution is FLAGGED for the re-check, per the runbook's own "Recommended" framing. NOTE for
  the working set: the runbook's Gmail reference is an *example* ("e.g."); Michael uses Outlook /
  Microsoft 365 and no Google mailbox exists in this practice — the requirement is and was
  "a non-M365 mailbox you control."
- **THE SIGNUP TOGGLE IS ON — THE DAY'S SECURITY FINDING.** Michael read the dashboard:
  **"Allow new users to sign up" is ON.** With magic-link auth, permissive `using (true)`
  policies, and broad grants, ON means anyone who can reach the auth endpoint can mint an
  authenticated user with full read/write. **RECOMMENDATION PUT: turn it OFF for the solo phase**
  — Michael's existing account is unaffected, and later staff onboarding is by admin invite,
  which ignores the toggle. **RULING AND EXECUTION PENDING at this entry's stamp** (his hand,
  dashboard-only, no repo act). This finding also CONDITIONS the gate-3 run record's §10 framing:
  "`using (true)` grants every authenticated user every row, by design, in a solo practice" is
  sound only while the set of authenticatable users is closed — with signups ON it is not. That
  is context for `Q-G3-4` at the re-check, not a correction of the run record, which stated its
  scope accurately.
- **THREE PASTED-LINK INCIDENTS, EACH WITH ITS DISPOSAL — recorded because credential-adjacent
  material entered chat three times in one sitting, and the rule needs a record, not a memory.**
  (1) A magic-link URL pasted from an email body; **triaged via connector metadata as
  already-consumed** — its token matched neither the only unclicked message; a used link is dead;
  no action. (2) An **invite link pasted while LIVE** — an unaccepted invitation is a
  mint-an-account key; **killed by deleting the invited user row** (confirmed "Deleted").
  (3) The 16:47 message's **magic-link token pasted while live**; disposal = Michael clicks it
  himself (consuming it) or it lapses at the project's configured OTP window — one hour by
  default, unverified here; **completion his hand, pending at stamp.** THE RULE, RESTATED FOR THE
  RECORD: **email bodies and their links never enter chat, any chat; the header dialog
  (`Authentication-Results` and kin) is safe wholesale.** No prior instance of this class is on
  the record; the countermeasure that worked all three times was connector-verified triage plus
  kill-at-the-source disposal.
- **CONNECTOR SCOPE, NAMED:** the M365 connector was used design-side to search signin@ message
  metadata and read ONE message body for token triage; it cannot return internet headers, which
  came from Michael's hand via the message-details dialog after the direct OWA link route. No
  mailbox content beyond that scope was read.
- **COSMETIC, OPEN, UNMINTED:** both auth emails use Supabase's default templates ("Your sign-in
  link" / "You've been invited"); customization is optional and unruled. **§4.5 (later-day
  repeats) is tomorrow's by definition** — plan: fresh browser profile against the dev server,
  since the app is localhost-only and a phone cannot reach it; that form is put as the honest
  reading of "fresh browser/device" until deployment, for the re-check to accept. **Optional
  DMARC (`p=none`) not addressed today; open, optional.**

**Staged for Code:** this entry — one packet, one act.
**Awaiting/Returned from Code, unreviewed:** this batch's handback.
**Still open and still Michael's:** signups-OFF execution (+ the ruling it records) · the outside
mailbox's provider + folder statement · the 16:47 link's click-or-lapse · §4.5 tomorrow and a
later-day repeat · optional DMARC · the gates re-check sweep per `#124` (now also carrying: the
§4.4 substitution ruling, the §4.5 fresh-profile form, and the signup-toggle finding as `Q-G3-4`
context) · `Q-CAP-5` (capacity cadence — the split bought weeks, not a solution).

## 2026-08-20 — QUEUE-RUNNER batch (runner line; SEVENTY-SEVENTH invocation) — one docs-only packet: the gate-3 run's four handed-back items CLEARED design-side, and the queue's `LE-1` row gains its decisive CRLF evidence WITHOUT gaining a status

**One zip in `inbox/`, executed:** `push-to-code_gate3-reconcile-124_2026-08-20.zip` (**9,114 B, mtime `2026-08-20 15:50:46 −05:00`, sha256 `edcd19022a945905…`**). Identity pinned at Step 1 per QR-6(c), **re-pinned byte-for-byte after the STOP and unchanged**, and checked by explicit name at Step 4 item 5. **Both orders were still computed (QR-4) and are trivially identical** — one packet admits no ordering — and the filename date parses cleanly, so no unparseable-date flag was owed. Michael confirmed at the Step 1 STOP; nothing was executed on silence.

- **THE STEP 0 GATE CLEARED ON ALL FOUR LIMBS, EACH BY A COMMAND THAT COULD HAVE DISCONFIRMED IT (QR-6(a)).** A live `git fetch origin` plus a bare `git ls-remote origin refs/heads/master` returned **`dcc9db2`**, equal to local `HEAD`, with `git rev-list --left-right --count HEAD...origin/master` reading **0 / 0** and `git status --short --branch` showing a clean tree on `master`. Neither the behind-limb nor the ahead-stop arose. **The packet's §1 expressly declined to claim anything about origin and left it to this gate** — the right posture, and the gate settled it.
- **BOTH QR-5 CARRY-FORWARD LIMBS WERE CLEAR, AND EACH WAS LEARNED THE ONLY WAY THIS BATCH COULD LEARN IT.** `git merge-base --is-ancestor 6d90037 origin/master` returns true, so **batch 76's push DID land** — that entry is barred from asserting it. And **`inbox/` held EXACTLY ONE zip, this batch's own, which is the only way this batch could learn that batch 76's DELETION ran**, barred by the same rule. **Nothing was carried into this line.** Step 0 items 1–4 were already satisfied: `inbox/` exists, `.gitignore:16` carries `inbox/`, CLAUDE.md:349 carries the note, and `Bash(rm -f inbox/*)` is present in `.claude/settings.local.json`.
- **THE ALREADY-EXECUTED PROBE WAS NEGATIVE ON BOTH QR-5 LIMBS, AND HERE IT HAD TO BE A CONTENT PROBE RATHER THAN A PATH PROBE.** Both of this packet's acts are APPENDS INTO EXISTING FILES, so no path's absence could mean anything — the opposite of batch 76, whose deliverable was a new file. Probed by content instead: **`(#124)` occurred 0 times** in the log and design high-water stood at **`#123`**, so `#124` was free and no renumber was owed; **`Evidence appended 2026-08-20` occurred 0 times** in the queue. The committed-but-unpushed limb was excluded by the Step 0 result rather than by assumption — `HEAD` and `origin/master` are the same commit, so there was nothing at `HEAD` for `origin` to be missing.
- **THE HEALTH CHECK WAS SKIPPED ON THE RULE, NOT BY OMISSION, AND THE REASON IS NAMED (QR-6(f)).** The skip needs `§5` NONE **and** no `src/`, `db/`, `supabase/` or build-tooling path routed. **Both limbs hold**: §5 reads `— **NONE.**` in terms, and the routing table reaches only `docs/specs/session-log.md` and `docs/specs/attorney-review-queue.md`. `npm test` / `npm run build` / `npm run lint` could prove nothing about a batch that changed no code. **No health figure is asserted anywhere in this entry; a skipped check is not a pass.**
- **THE CONFLICT RULE DID NOT FIRE AND HAD NOTHING TO REACH — ONE PACKET, TWO ROUTING ROWS. Nothing was superseded and nothing was skipped as already built.** `#124` was filed **BY BYTE COPY** from the packet's staged file — 9,391 B, 0 CR, confirmed present exactly once and byte-exact — and **per TOC-6 this runner line mints no `#nn`**, carrying only the invocation ordinal. The packet minted `#124` design-side, as its §4 says.
- **THE QUEUE TOOK BOTH HALVES OF `QR-6(b)` THIS TIME — the rows act AND the Status-header act — where batch 76 correctly took only the conditional half.** The `LE-1` row gained **one appended evidence sentence at its tail and nothing else**, and the Status header gained its per-batch reconcile sentence in the same touch. **NO ROW WAS ADDED AND NO ROW WAS CLOSED. `LE-1` REMAINS ⬜ OPEN: the append is EVIDENCE, not a ruling**, and the row's original question text stands untouched ahead of it. **Row-anchored open rows re-derived at HEAD on the file's own matcher (`lstrip()` then `- ⬜`) and UNMOVED at 350**, the figure the edit-order predicted. `git diff -U0` confirms the whole edit is **two lines — 3 and 441 — and no other row in the file was touched.**
- **THE ROW-LESS SERIES WERE VERIFIED TO HAVE HOMES RATHER THAN TRUSTED TO HAVE THEM, WHICH IS THE ONLY THING THAT MAKES "NO NEW ROWS" COMPLIANCE INSTEAD OF LOSS.** QR-1's rationale is that the packet is deleted, so a question with no filed home dies with it. Checked at HEAD: **`Q-CAP-3`, `Q-CAP-4` and `Q-CAP-5`** carry their full text in `docs/specs/knowledge-capacity-measurement-2026-08-20.md` §5 (present, 11,682 B), row-less by Michael's seventy-third-batch ruling; **`Q-G3-3`, `Q-G3-4` and `Q-G3-5`** carry theirs in `docs/specs/gate3-write-path-test-protocol.md` (22,609 B) and the run record's §7/§11 (16,698 B), row-less by his batch-72 ruling; **`GL1-1` and `LE-1` already hold open rows**; and **gate 9's §4 remainder is gates-side**, kept out of the queue by the 2026-08-19 scope ruling written into that file's own header. **Every one of those files was opened and counted this batch — none was inferred from a packet's say-so.**
- **THE DIRECTED TEXTS WERE EXTRACTED FROM THE PACKET BY PROGRAM AND PLACED VERBATIM — NEITHER WAS RETYPED.** The edit-order's two fenced blocks were parsed out and asserted before use: the **14-character row matcher** and the **500-character evidence sentence**, the latter appended after a single space with the length delta checked against it (**1,455 → 1,956, delta 501 = 500 + 1**) and the row proved still ONE physical line. This is the standing rule after a hand-typed line twice slipped a curly apostrophe into this repo.
- **THE TOC RIDES THIS COMMIT AT ITS TWENTY-EIGHTH EDITION AND IS A GENUINE `TOC-4` FIRING — THE TWENTY-THIRD.** The census the twenty-seventh edition warned about was applied as written and came out clean **before** the edit: **128 `## ` headings − 1 pointer stanza = 127 entries against 127 rows**, so nothing had landed unindexed since the gate-3 run's same-day row. As written it is **130 − 1 = 129 entries against 129 rows.** **The pointer-stanza subtraction is not optional arithmetic — without it this batch would have reported a phantom missing row**, which is exactly what batch 76 predicted the next census would do.
- **`DT-1` WAS READ AND THE DIVERGENT WINDOW DID NOT APPLY.** PowerShell, the authority, read **`2026-08-20 16:00 −05:00`** (`Central Standard Time`) against a UTC **`2026-08-20 21:00`** — **the same calendar day**, unlike the twenty-second and twenty-seventh editions. Every date written this batch is the Central **2026-08-20**, which is also what the packet's §0 stamped.
- **ONE PACKET-ADDED ACT WAS OFFERED AND IS RECORDED RATHER THAN QUIETLY ABSORBED (QR-6(e)).** §8 replaces the standard Step 4 item 6 close-line with one that also warns Michael to add `/docs/archive/` to the picker exclusions **before** he clicks Sync. It is a change to a MESSAGE, not an act with side effects, so it is honored — **and both lines are delivered, the runner's `<sha>` line and the packet's warning**, so nothing the runner mandates is displaced by a packet.
- **WHAT DID NOT HAPPEN, STATED SO THE RECORD CANNOT INFLATE IT.** **Gate 3 was not closed and `Q-G3-4` was not touched** — Michael's, at the gates re-check. **`Q-G3-5` was not executed**: growing `src/auth/rlsProbe.ts` to 37 write paths is a BUILD act needing its own authorization, and §5 is NONE, so `src/` was not opened. `docs/specs/gate3-write-path-test-run-2026-08-20.md` was **not edited** — dated, single-run, it stands. `Go_Live_Gates.md`, `docs/specs/gate3-write-path-test-protocol.md`, `docs/prompts/PROMPT-gate3-write-path-test.md` and `docs/prompts/QUEUE-RUNNER.md` were **not amended**. **No sync or picker claim of this batch's own is made anywhere** — a Code session can neither read nor change that setting — and `#124`'s knowledge/picker figures were **left exactly as stamped**, per §6, because an entry states its stamp time's truth. **No registry entry was set to verified, and no credential of any kind appears in anything this batch wrote.**

**Staged for Code:** none. **Awaiting/Returned from Code, unreviewed:** this batch's routing — the `#124` byte-copy, the `LE-1` evidence append and its Status-header sentence, the twenty-eighth TOC edition, and the BUILD-STATE refresh. **Still open and still Michael's — the first two IN ORDER, per the packet's §7:** **(1)** add `/docs/archive/` to the sync-picker exclusions (`Q-CAP-3`'s hand half — absent from the filters at 15:45, and the archive re-ingests until it lands) · **(2)** click **Sync**. Then: **gate 9's §4 remainder** (headers · junk statement · outside mailbox · later-day repeats · optional DMARC) · the **gates re-check sweep**, which is the last floor sitting: `Q-G3-4` · `Q-G3-5` · `Q-G3-3` · `GL1-1` · `LE-1` · `Q-CAP-4` · `Q-CAP-5` · the `#118` re-sweep proposal · and the **protocol caution-annotation for the §7 parser blind spots**, PROPOSED and unruled, offered at that re-check · everything carried at `#121`, `#122`, `#123` and `#124`.

## 2026-08-20 (#124) — THE GATE-3 RUN CLEARED DESIGN-SIDE AT `dcc9db2`, FULL-TEXT: the run record holds on every limb it can be checked on from here — and the day's DOUBLE DISPATCH is recorded with TWO FABLE CORRECTIONS, one of them the reason the second dispatch existed at all (design session, Cowork, Fable 5; bridge reads at `dcc9db2`)

**THE CLEARANCE, ITEMIZED — read full-text through the bridge at `dcc9db2`, not from RAG.** The
four items the gate-3 session handed back unreviewed are **REVIEWED AND CLEARED**, each on a stated
basis: **(1) the run's unnumbered log entry** — read whole; every verification names its command,
the token-discipline sentence is present, TOC-6 honored (no `#nn`, no ordinal). **(2)
`docs/specs/gate3-write-path-test-run-2026-08-20.md`** — read whole, all eleven sections. The §2
grid recounts from its own rows: 37 rows; 37 signed-out DENY-privilege; rows 1–36 signed-in ALLOW;
row 37, the deny control, DENY with the **privilege message** as §3 requires. §3's quoted texts
carry no RLS wording anywhere; §10 keeps the negative scope whole (one policy tested on 36 tables;
UPDATE/DELETE not exercised — named, not resolved; `party_pii.ssn` written under `using (true)`
flagged to `G10-2`/`O-1`; gate 2 expressly untouched). **Credential check by read: the token appears
nowhere in the record** — what appears (session UUID, signed-in email, run tag, project ref) is
identity, not secret. **(3) the BUILD-STATE refresh** — header self-describes the
written-FROM-`6d90037` / verifies-at-own-sha convention correctly; measured at exactly 150 non-blank
(at cap, zero headroom — the next rewrite must displace); the MEASURED-37 vs STANDING-INSTRUMENT-5
separation is the right claim split. **(4) the TOC regeneration** — the unnumbered gate-3 row is
present at HEAD. **What this clearance is NOT: a re-measurement.** No probe was re-run and none may
be (single-run authorization, spent); the database facts are the run's own measurements, reviewed
here for internal consistency and convention compliance — all holding. The independent close-out
audit by the stood-down second session (below), including its own bare `git ls-remote` →
`dcc9db2`, corroborates.

- **THE DOUBLE DISPATCH, ON THE TIMELINE THE ARTIFACTS THEMSELVES STAMP.** The run's record reads
  its Central clock **14:10** before stamping; its close-out committed at **14:21** as `dcc9db2`,
  driven from the repo-canonical `docs/prompts/PROMPT-gate3-write-path-test.md` under the
  in-session authorization (`#121`'s rulings). **At 15:17** this design session — not knowing the
  run had landed — authored a redundant kickoff naming `6d90037` as expected HEAD; Michael pasted
  it into a second fresh Opus Code session at **15:19**. That session ran the checkout gate, saw
  `dcc9db2` was itself the sitting's close-out, and **STOPPED before Step 0.5 — no database
  connection, no token request, no writes, no commit, no entry** (it changed nothing and correctly
  claimed no entry for saying so). **The designed catches worked live:** the single-run
  authorization's own text, the dated run-record filename, and the possibly-already-executed
  discipline are exactly what stood between a stale dispatch and a second live-database run.
- **ONE INFERENCE FROM THE STOOD-DOWN SESSION, CORRECTED BEFORE IT CAN ENTER THE RECORD:** it
  concluded the kickoff it was handed "is the same one that drove that run." **False by the
  timeline above** — the run predates the kickoff's authoring by ~56 minutes; both named `6d90037`
  independently because that WAS pre-run HEAD. Chat-only inference, Opus 5, harmless, never filed;
  corrected here so it cannot propagate.
- **CORRECTION (the dispatch itself).** **What was asserted:** this session's kickoff artifact
  (15:17, chat-delivered) presented the gate-3 sitting as still to run, with "expected HEAD
  `6d90037`" — stale at authoring; origin had been at `dcc9db2` for ~56 minutes. **True instead:**
  the sitting had already run and pushed — evidence: `dcc9db2`'s own commit time and content, and
  Michael's *"Done and synced,"* which meant the RUN, not (as this session read it) the sync-picker
  step. **Corrects:** no filed entry — the error lived in a chat artifact and a chat reading;
  recorded so the class is on the record. **Actor:** Fable 5 (this design session). **Failure
  class:** asserting/acting on build status from a stale read instead of re-reading at decision
  time — the session-start rule's own warning; kin to R-3 copy-forward (`#13`). A thirty-second
  HEAD re-read before authoring would have prevented the dispatch. **What changed:** nothing in
  the repo carried it; the second session's stand-down was the catch, proven live.
- **CORRECTION (`#123`'s capacity projection).** **What was asserted** (`#123`, stands as
  written): *"~78K tokens return at the next sync"* from the `/docs/reference/` exclusion, and
  "roughly 80%" once both levers land. **True instead:** three consecutive post-exclusion syncs
  measured `knowledge_size` **1,837,143 → 1,846,727 → 1,856,462** (91.9% → 92.3% → 92.8%) —
  monotonically UP, each rise ≈ the day's own additions; no ~78K subtraction ever appeared.
  **Diagnosis:** the projection was BYTE-derived (PDF bytes ÷ ~3.46); a scanned PDF's knowledge
  cost is its EXTRACTED TEXT, which for the CR3 sheet is evidently ≈ nothing. The exclusion was
  still right as working-set hygiene; its token payoff was misestimated. **The real lever is
  `/docs/archive/` (~543 KB of pure text, ~167K tokens), still unapplied at this entry's stamp** —
  revised projection once it lands: **~84%**, not ~80%. **Corrects:** `#123` (stands as written).
  **Actor:** Fable 5. **Failure class:** instrument/estimate — byte-derived token figures for
  non-text content; kin to the `WS-P2` false premise corrected at `#120`. **What changed:** the
  capacity doc's `/docs/reference/` lever row is now known-overstated — **deliberately left
  alone** (the doc is PROPOSED and gets swept at `Q-CAP-4`); nothing else republished the figure.
- **ROUTING OF THE RUN'S OPEN ITEMS, UNDER THE STANDING RULINGS — NO NEW ROWS, AND THAT IS
  COMPLIANCE, NOT OMISSION.** Michael's batch-72 ruling: the `Q-G3` series takes **no durable IDs
  and no queue rows** — full text lives permanently in the protocol and now also in the run
  record's §11. Accordingly: **`Q-G3-4`** (does a clean run close gate 3, or close `GL-1` item (4)
  with the gate open on its wider text) is **gates-side, Michael's, at the re-check** — the queue
  is for rulings, the gates deliberately live outside it (`#114`). **`Q-G3-5`** (grow
  `src/auth/rlsProbe.ts` to all 37 write paths) and **`Q-G3-3`** (unruled for future runs) stay
  row-less and ride to the re-check; when ruled, the ruling lands as dated annotations on their
  protocol bullets, exactly as `Q-G3-1`/`Q-G3-2`'s did. **The two §7 derivation-instrument
  findings** (a *named* `constraint … check` is invisible to a pattern anchored on `check (…)`;
  `primary key` columns carrying no literal `not null` are still required) have their permanent
  home in run record §7, and their named consumer is **whoever executes `Q-G3-5`** — the standing
  probe's derivation inherits both blind spots. PROPOSED, unruled, for the re-check: a dated
  caution annotation on the protocol's derivation section naming the two classes. Not done here.
- **ONE QUEUE ACT THIS BATCH, AND IT IS EVIDENCE, NOT A RULING: `LE-1` gains an appended evidence
  sentence** (EDIT-ORDER in this packet). A second bridge-side design session (Opus 5, today)
  independently rediscovered the CRLF false-dirty and supplied the cheapest decisive check yet:
  through the bridge, `git -c core.autocrlf=true status` reports the tree **CLEAN** — direct
  evidence on both halves of the open question (operational note; `.gitattributes`). That command
  existed only in chat; unfiled evidence evaporates, which is QR-1's whole rationale. **The row
  stays open; no status changes.**
- **OWNERSHIP NOTE:** the run entry records two minor corrections to the kickoff prompt's
  token-sourcing route (`/diagnostics` does not surface the token; the storage key read from
  source, `sb-<ref>-auth-token`). Both are corrections of THIS session's authored prompt — actor
  Fable 5 — already recorded by the run entry; named here so attribution is explicit.
- **KNOWLEDGE/PICKER AT STAMP (Q-CAP-3's hand half, still open):** the sync filters re-read after
  the third sync carry `/docs/reference/` but **no `/docs/archive/`**; the archive file itself
  returns from design-side retrieval, which is presence proven, not inferred. True at 15:45
  Central. If the exclusion lands before this batch runs, the runner corrects nothing here —
  entries state their stamp time's truth.

**Staged for Code:** this entry; `EDIT-ORDER_LE1-evidence-append.md` — one packet.
**Awaiting/Returned from Code, unreviewed:** this batch's handback.
**Still open and still Michael's:** the `/docs/archive/` picker exclusion, then Sync (`Q-CAP-3`) ·
gate 9's §4 remainder (headers · junk statement · outside mailbox · later-day repeats · optional
DMARC) · the gates re-check sweep: `Q-G3-4` · `Q-G3-5` · `Q-G3-3` · `GL1-1` · `LE-1` · `Q-CAP-4` ·
`Q-CAP-5` · the `#118` re-sweep proposal · all carried per `#121`/`#122`/`#123`.

## §2 — COMPACT INDEX: EVERY ENTRY IN THE LIVE LOG

*One row per entry, newest first. **This is what tells a session with no bridge that an entry
EXISTS.** It is never cut to make room (§3.5). What an entry SAID, beyond the 10 carried verbatim
above, is a bridge read away — the dense per-entry summaries live in
`docs/record/session-log-toc.md`.*

| date | # | kind | heading (first 90 characters) |
|---|---|---|---|
| 2026-08-21 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTIETH invocation) — one docs-only packet, THIRTEEN ro |
| 2026-08-21 | #132 | design | THE THIN CONSTITUTION EXECUTED: the live log LEAVES the sync for `docs/record/`, the index |
| 2026-08-20 | — | code | `dev:demo` MODE-CHECK FIX (Code session, UNNUMBERED per TOC-6 — no `#nn`, no runner ordina |
| 2026-08-20 | — | code | FE-D1 DISCLOSURES ENGINE: THE BUILD (Code session, UNNUMBERED per TOC-6 — no `#nn`, no run |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-NINTH invocation) — one docs-only packet, FOUR ro |
| 2026-08-20 | #126 | design | THE RE-CHECK'S RULING NIGHT: EIGHT RULINGS IN ONE SITTING — gate 3 CLOSES with edges, GL1- |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-EIGHTH invocation) — one docs-only packet, ONE ro |
| 2026-08-20 | #125 | design | `Q-CAP-3` CLOSED BY MEASUREMENT (85.1%), batch 77 verified, and gate 9's evidence day: §4. |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-SEVENTH invocation) — one docs-only packet: the g |
| 2026-08-20 | #124 | design | THE GATE-3 RUN CLEARED DESIGN-SIDE AT `dcc9db2`, FULL-TEXT: the run record holds on every  |
| 2026-08-20 | — | code | GATE 3 RLS WRITE-PATH TEST: THE RUN (Code session, UNNUMBERED per TOC-6 — no `#nn`, no run |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-SIXTH invocation) — one docs-only packet: the ses |
| 2026-08-20 | #123 | design | THE CAPACITY RULINGS LAND: `Q-CAP-2` executed and verified in the sync filters, `Q-CAP-1`  |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-FIFTH invocation) — one docs-only packet: gate 9' |
| 2026-08-20 | #122 | design | GATE 9 ROUND TRIP ONE PASSES END TO END: DNS published and verified authoritative, Postmar |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-FOURTH invocation) — one docs-only packet: four r |
| 2026-08-20 | #121 | design | FOUR RULINGS START THE LAUNCH-PATH CLOCK: Postmark, signin@ on a send subdomain, the gate- |
| 2026-08-20 | — | code | CODE SESSION (direct ruling, recorded immediately after the seventy-third queue-runner bat |
| 2026-08-20 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-THIRD invocation) — three docs-only packets from  |
| 2026-08-20 | #120 | design | PROJECT KNOWLEDGE AT 89.8% AND THE RUNWAY IS ABOUT A DAY: the weight measured, `WS-P2` cor |
| 2026-08-20 | #119 | design | THE §5 PRE-FLIP REPORT RUN LIVE: "Success. No rows returned." — gate 10's edge (2) dischar |
| 2026-08-20 | #118 | design | THE CORRECTION SWEEP AFTER BATCH 72: one live carrier out of ten hits, the rest retraction |
| 2026-08-20 | — | code | CODE SESSION (ruling recorded): GATE 10 CLOSED — and the closure's edges are recorded as c |
| 2026-08-19 | — | code | GATE 10 FRONT-END BUILD SESSION (Claude Code, Opus 5), on Michael's `G10-5` authorization: |
| 2026-08-19 | — | code | CODE SESSION (authorization record, same session as the `G10-6` ruling and the queue-runne |
| 2026-08-19 | — | code | CODE SESSION (direct ruling, same session as the queue-runner batch below): `G10-6` ruled  |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-SECOND invocation) — the seven-document design ch |
| 2026-08-19 | #117 | design | POST-SYNC VERIFICATION OF EVERYTHING LANDED AND UNREVIEWED AT `beb27f4`: seven of the eigh |
| 2026-08-19 | — | code | CODE SESSION (repair, on Michael's ruling; same session as the C1/C2/C3 entries below): th |
| 2026-08-19 | — | code | CODE SESSION (CODE-DISPATCH v4, task C3; same session as the C1 and C2 entries below): the |
| 2026-08-19 | — | code | CODE SESSION (CODE-DISPATCH v4, task C2; same session as the task C1 entry below): the run |
| 2026-08-19 | — | code | CODE SESSION (CODE-DISPATCH v4, task C1): the two falsehood families re-swept whole-tree a |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTY-FIRST invocation) — one docs-and-comments packet, |
| 2026-08-19 | #116 | design | GATE 10's FRONT-END HALF SPECIFIED, AND THE `anon`/C-2 RECORD REPAIRED ON |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SEVENTIETH invocation) — one docs-only packet, routed ver |
| 2026-08-19 | — | code | Gate 9 SMTP runbook staged (design session, Cowork, Fable 5; routed by queue runner; UNNUM |
| 2026-08-19 | — | code | GATE 10 RUN AND VERIFIED LIVE (Claude Code, Opus 5; UNNUMBERED per TOC-6) — the same sessi |
| 2026-08-19 | — | code | GATE 10 BUILD SESSION (Claude Code, Opus 5; UNNUMBERED per TOC-6) — the PII promotion land |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-NINTH invocation) — a docs-only batch that files an |
| 2026-08-19 | #115 | design | GATE 10 RULED IN THREE PARTS AND THE BUILD AUTHORIZED: the shape splits by |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-EIGHTH invocation) — a two-act docs-only batch: gat |
| 2026-08-19 | #114 | design | GATE 1 BOUGHT — GL-1 floor item (2) COMPLETE; and the queue-scope question |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-SEVENTH invocation) — the record catches up with th |
| 2026-08-19 | #113 | design | EXECUTION SESSION: all three pending live migrations RUN AND VERIFIED by |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-SIXTH invocation) — the routed OPUS-RUN paste comes |
| 2026-08-18 | #112 | design | THE OPUS-RUN PASTE EXECUTED: five FC-13 entry drafts and the Q-WS3-5 |
| 2026-08-19 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-FIFTH invocation) — the first batch in fifteen to t |
| 2026-08-18 | #111 | design | GROK EXTERNAL REVIEW TRIAL: first outside-model adversarial review |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-FOURTH invocation) — the batch that empties the rul |
| 2026-08-18 | #110 | design | THE RULED-WORDING TAIL EMPTIES: A, 215.1(e), B, F AND THE WS-3 ENTRY ALL |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-THIRD invocation) — the batch that executes the suc |
| 2026-08-18 | #109 | design | THE SUCCESSOR ACTS CLOSE THE SAME NIGHT: ENTRIES 12, 32, D AND E VERIFIED; |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-SECOND invocation) — the batch that ends the seven- |
| 2026-08-18 | #108 | design | T-26 RUN LIVE: THREE GROUP A ENTRIES VERIFIED AND TWO CONFORMED VERBATIM AT |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTY-FIRST invocation) — the batch whose Step 0 gate cau |
| 2026-08-18 | #107 | design | PROJECT-KNOWLEDGE PRUNE (44 docs); METER UNITS PROVEN TOKENS; SYNC-PICKER |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; SIXTIETH invocation) — the FC-block batch, in which the o |
| 2026-08-18 | #106 | design | FABLE FC-BLOCK ADJUDICATION: fifteen FC items put one at a time, THIRTEEN |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-NINTH invocation) — the batch that makes the advers |
| 2026-08-18 | #105 | design | FABLE SPEND-DOWN ADJUDICATION: two items put, four limbs ruled — Q-AUDIT-1 |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-EIGHTH invocation) — the docs-only batch that lande |
| 2026-08-18 | #104 | design | THE FOUR LOCATED AUTHORITIES READ, AND THE ENTRY-31 BRIDGE FOUND: it is |
| 2026-08-18 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-SEVENTH invocation) — the docs-only batch that land |
| 2026-08-18 | #103 | design | CORRECTION: an adversarial audit of the five CHAT-DISPATCH v4 research |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-SIXTH invocation) — the docs-only batch that landed |
| 2026-08-17 | #102 | design | CHAT-DISPATCH v4 EXECUTED, T-32 + T-27 THROUGH T-31 IN ONE PASS: the WS-3 |
| 2026-08-17 | #101 | design | CORRECTION: the #100 adjudication session and every artifact it |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-FIFTH invocation) — the batch that executed twenty- |
| 2026-08-18 | #100 | design | FABLE ADJUDICATION SESSION: 24 items put, 24 ruled, zero deferrals — |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-FOURTH invocation) — the docs-only batch that lande |
| 2026-08-17 | #99 | design | CHAT-DISPATCH v3 TASKS T-20 THROUGH T-25 EXECUTED IN ONE PASS: the |
| 2026-08-17 | — | code | CODE SESSION (CODE-DISPATCH v3, task C-2): the session-log index regenerated at 207 entrie |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-THIRD invocation) — the batch that wrote twenty-fou |
| 2026-08-17 | #98 | design | TASK 19 SIGN-OFF WALK EXECUTED (CHAT-DISPATCH v2 Task B): 24 of 40 |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-SECOND invocation) — the batch whose second multi-a |
| 2026-08-17 | #97 | design | TASK 19 SIGN-OFF WORKLIST STAGED: the dispatch's Task A was found already |
| 2026-08-17 | — | runner | QUEUE-RUNNER batch (runner line; FIFTY-FIRST invocation) — the batch that ran a multi-agen |
| 2026-08-16 | #96 | design | V-EXEC EXECUTED IN PART: the three two-case entries are SPLIT (V-5, backlog |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FIFTIETH invocation) — the batch that executed six regist |
| 2026-08-16 | #95 | design | WORDING ADJUDICATION: execute-then-verify RULED for Task 19, six registry |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-NINTH invocation) — the batch that amended the runn |
| 2026-08-16 | #94 | design | FABLE-RUN ADJUDICATION: QR-6(a)–(f) ALL RULED IN taking the runner to v9 with |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-EIGHTH invocation) — the ahead-stop fired for the f |
| 2026-08-16 | #93 | design | CHAT-DISPATCH TASK 19 ATTEMPTED AND NOT COMPLETED: a redundant retrieval pass withdrawn un |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-SEVENTH invocation) — the packet's headline questio |
| 2026-08-16 | #92 | design | CHAT-DISPATCH TASK 18: the go-live runbook — three places where reading a gate ALONE gives |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-SIXTH invocation) — the fetch the packet named as i |
| 2026-08-16 | #91 | design | CHAT-DISPATCH TASK 17: the session-log table of contents — the log runs 190 entries under  |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-FIFTH invocation) — the allowlist entry is proven,  |
| 2026-08-16 | #90 | design | CHAT-DISPATCH TASK 16: the T3 pilot-recording protocol — HK-4 reads as a staging act and t |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-FOURTH invocation) — the Step 1 report was right an |
| 2026-08-16 | #89 | design | CHAT-DISPATCH TASK 15: the communications-log ingest memo — the dispatch called two constr |
| 2026-08-16 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-THIRD invocation) — the ahead-stop fires on a real  |
| 2026-08-16 | #88 | design | CHAT-DISPATCH TASK 14 + QR-5 RULED: the RE-1 inputs memo — one trigger means two different |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-SECOND invocation) — six checks, six passes, and a  |
| 2026-08-15 | #87 | design | CHAT-DISPATCH TASK 13: the QBO integration research memo — no read-only scope exists, read |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; FORTY-FIRST invocation) — a packet that asked to be check |
| 2026-08-15 | #86 | design | CHAT-DISPATCH TASK 12: the PR-3 re-parenting migration proposal — the hierarchy is not a h |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; FORTIETH invocation) — the packet predicted a lock that w |
| 2026-08-15 | #85 | design | CHAT-DISPATCH TASK 11: the WF-2–WF-8 email-workflow spec — an ADOPTED document is not an a |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-NINTH invocation) — the first spec in this chain w |
| 2026-08-15 | #84 | design | CHAT-DISPATCH TASK 10: the IN-2 spec, and the first gate in this chain that resolves BOTH  |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-EIGHTH invocation) — two specs whose whole job is  |
| 2026-08-15 | #83 | design | CHAT-DISPATCH TASK 9: IN-1 and IN-3 spec drafts — two items open because the DESIGN questi |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-SEVENTH invocation) — the audit's findings stop be |
| 2026-08-15 | #82 | design | BUILD-STATE DISPOSITIONS RULED: A-1–A-6 and the re-measure checkpoint; the cap number deli |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-SIXTH invocation) — a divergence inside a VERIFIED |
| 2026-08-15 | #81 | design | CHAT-DISPATCH TASK 8: form-engine specs FE-4, FE-5, FE-6 — and a VERIFIED registry entry t |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-FIFTH invocation) |
| 2026-08-15 | #80 | design | CHAT-DISPATCH TASK 7: Bexar local rules + eFileTexas — the filing moment is contested, and |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-FOURTH invocation) — the audit lands, and it lands |
| 2026-08-15 | #79 | design | RECORD-INTEGRITY AUDIT (chartered): 65 claims across BUILD-STATE and the queue's status la |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-THIRD invocation) |
| 2026-08-15 | #78 | design | CORRECTION: the Insurance-Code absence claim at #76 was OVER-BROAD. The fourth registry fi |
| 2026-08-15 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-SECOND invocation) — DELTA ONLY, a re-issued packe |
| 2026-08-14 | — | runner | QUEUE-RUNNER batch (runner line; THIRTY-FIRST invocation) |
| 2026-08-14 | #77 | design | Q-STAT-1 RULED: the SOURCING convention is binding, v18 drafted and delivered; and a corre |
| 2026-08-14 | — | runner | QUEUE-RUNNER batch (runner line; THIRTIETH invocation) |
| 2026-08-14 | #76 | design | STATUTE PASS: all 21 `RETRIEVAL: NOT RUN` rows retrieved from the official corpus; eightee |
| 2026-08-14 | #75 | design | DEADLINE-ENGINE MEMO filed as PROPOSED design input; RULE TEXT SOURCED TO CLEAN AUTHORITY  |
| 2026-08-14 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-NINTH invocation) |
| 2026-08-13 | #74 | design | CD-2 ROLE MINING PASS filed as PROPOSED data prep; the reconcile-first finding |
| 2026-08-13 | #73 | design | RULING RUN, V-4 THROUGH V-8, ONE AT A TIME: all five ruled the same session |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-EIGHTH invocation) |
| 2026-08-13 | #72 | design | REGISTRY VERIFICATION WORKBOOK + CITATOR PASS filed as PROPOSED design input; |
| 2026-08-13 | #71 | design | OUTLOOK EDIT/CANCEL EXERCISED LIVE: cancel works, edit works EXCEPT the |
| 2026-08-13 | #70 | design | TELEMETRY: the record authorizes Code to do NOTHING, so nothing was done; |
| 2026-08-13 | #69 | design | DOCS LINT SWEEP: read-only, one candidate report, zero edits to existing |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-SEVENTH invocation) |
| 2026-08-13 | #68 | design | SWEEPS RULED AND RUN: duplication (no duplicate; three pointer glyphs) |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-SIXTH invocation) |
| 2026-08-13 | #67 | design | QR-3 AMENDED TO v7 (ahead-stop) after the twenty-fifth invocation |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-FIFTH invocation) |
| 2026-08-13 | #66 | design | RULING RUN: ~20 open queue items ruled one by one (design session, |
| 2026-08-13 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-FOURTH invocation) |
| 2026-08-12 | — | runner | QUEUE-RUNNER batch (runner line; TWENTY-THIRD invocation) |
| 2026-08-13 | #65 | design | #62/#63 AND #64 BATCHES VERIFIED DESIGN-SIDE, FULL-TEXT (device-bridge |

---

## §3 — POINTERS: WHERE THE REST OF THE RECORD LIVES

All three are **BRIDGE-ONLY**: tracked in the repo, excluded from the design-side sync picker, and
reached over the device bridge or by a Code session.

| file | what it holds |
|---|---|
| `docs/record/session-log.md` | **THE LIVE LOG — append-only, canonical, unbounded.** Authoritative over this file in every disagreement. |
| `docs/record/session-log-toc.md` | **THE FULL ABSTRACT INDEX** — one dense summary row per entry. What §2 lists by existence, this describes. Its summaries are never thinned (`TC-3`). |
| `docs/archive/session-log-archive-2026-07-21_2026-08-12.md` | **THE CLOSED ARCHIVE** — entries older than the 2026-08-13 cutoff, with its own frozen index. Never regenerated; no row is ever added (`Q-CAP-1`). |

**Their absence from design-side retrieval is BY DESIGN and is never evidence of absence.** A
retrieval that fails to find an entry has found nothing about whether the entry exists — §2 above is
the instrument for that question, and the bridge is the instrument for its contents.
