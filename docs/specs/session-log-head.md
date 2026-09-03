# SESSION LOG — HEAD

> **DERIVED FILE. REGENERATED IN FULL EVERY QUEUE-RUNNER BATCH, NEVER APPENDED TO.**
> Spec: `docs/specs/thin-constitution-restructure-2026-08-21.md` §3 (`TC-2`–`TC-5`, `TC-12`, ruled
> 2026-08-21). The authoritative record is **`docs/record/session-log.md`** at HEAD; where that log
> and this file disagree, **the log is right and this file is stale.** An entry written HERE and
> nowhere else is destroyed at the next batch — entries go in the live log.
>
> **CITE BY HEADING OR QUOTED SENTENCE, NEVER BY LINE NUMBER** (CITE-STABILITY, ruled 2026-08-16):
> this file is rewritten wholesale, so every line number in it moves every batch.
>
> **The rule that produced §1 (`TC-2`), stated so it can be checked:** find the **fourth most recent
> design `#nn` entry** in the live log, and copy that entry and **every entry above it**, in log
> order, **byte-for-byte** — whole entries only, with the runner lines and unnumbered Code entries
> interleaved among them, because those are what say *what landed*. §2 then indexes **every** entry
> in the live log, so a session with no bridge can still tell that an entry EXISTS.
>
> **Generated:** 2026-09-03 Central, by the QUEUE-RUNNER's EIGHTY-NINTH invocation (batch 89), over
> the log as that batch wrote it, riding the same commit. Parent commit `aa132f2`.
> **§1 carries 5 entries; §2 indexes all 167.**

**⛔ THE 200 KB CEILING BOUND AND THE SHORTFALL IS NAMED (§3.5): 3 whole entries dropped from §1, oldest first — the head now reaches back only to `#146`, which is TWO design entries, not the four `TC-2` asks for.** Nothing was truncated and §2 was not cut: every dropped entry still has its row there, and its text is a bridge read away in `docs/record/session-log.md`. **The cause is ONE entry, and naming it is the point of this sentence: the `runner 87` line is 113,194 bytes — 55% of this file's entire ceiling — because `CAP-4` sent 42,828 bytes of displaced BUILD-STATE text into it verbatim. Dropping that one entry is what costs the head its reach; nothing else in the window comes close.** That trade is exactly what `CAP-OPEN-4` puts to Michael.

---

## §1 — HEAD ENTRIES, VERBATIM (whole entries, newest first)

## 2026-09-03 — QUEUE-RUNNER batch (runner line; EIGHTY-NINTH invocation) — one docs-only packet, and the batch that RECORDED TWO MIGRATIONS RUN BY MICHAEL'S HAND WITHOUT TOUCHING A DATABASE: `MIG-1` eight of eight and the amendment nine of ten, check 8 failed on a CHECK the amendment could not see; six exact-string edits land on every predicted uniqueness; three rows are minted and none closes; the 2026-09-03 build entry is INDEXED for the first time; and the runner's own findings are four — a regex the register's own stated method invites and that miscounts, a `CAP-2` CLASS column that carries `—` on rows this runner had to judge, a stale `QR-6(e)` firing count corrected in BUILD-STATE, and a `CAP-4` displacement that this batch pays for the second consecutive time

**Packet:** `push-to-code_fe-d1a-continuation_2026-09-03.zip` — 46,817 B, sha256 `b5c6333d…f8d5`, mtime 2026-09-03 11:50:31 −0500, identity pinned at Step 1 per `QR-6(c)`. **ONE packet, so no ordering question arose: filename order and pure-mtime order agree trivially (`QR-4`).** Runner v13 read at HEAD from `docs/prompts/QUEUE-RUNNER.md`, unamended; the `/queue-runner` command is a pointer (`QR-2`) and was not relied on.

**Step 0 gate (`QR-3`), and the evidence rule applied (`QR-6(a)`).** `git fetch origin`, then `git rev-parse HEAD` = `aa132f2dd0fbb519a8934e6ce115cd509cce5079` and **`git ls-remote origin master`** returning the same sha — the live remote read, not the local tracking ref, which is not evidence about origin. `git rev-list --left-right --count HEAD...origin/master` = `0 0`. On `master`. **`git status --porcelain` was NOT empty and saying so matters:** three `??` lines — `Claude outputs/`, `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md` — all three already on the record as Michael's, DO NOTHING; no tracked modification. Step 0 items 1–5 all satisfied: `inbox/` exists, `.gitignore` line 16, `Bash(rm -f inbox/*)` present in `.claude/settings.local.json`, `docs/record/session-log.md` present and `docs/specs/session-log.md` absent (`TC-4`, no half-executed move).

**Step 1, and the already-executed test came back NO on the decisive form (`QR-5`).** `docs/record/fe-d1a-continuation-2026-09-03/` did not exist in the working tree or at HEAD, so this is neither a pushed re-run nor the committed-but-unpushed case the forty-second invocation turned out to be. The packet's own reconcile expectation was independently confirmed: the newest design entry in the live log was `#146`, so `#147` is the correct ordinal and no renumber fired.

**Health check SKIPPED ON THE RULE, and the skip is recorded rather than passed off (`QR-6(f)`).** §5 is **NONE** in the only packet and no `src/`, `db/`, `supabase/` or build-tooling path is routed — every write lands under `docs/record/`, `docs/specs/` or `docs/prompts/` — so `npm test` / `npm run build` / `npm run lint` would have proved nothing about this batch. Nothing about the tree's health is asserted here either way; the last measured trio is the build tranche's 452/452, build 0, lint 0 at `aa132f2`.

**What landed, in the packet's own routing order.** Row 3: three exact-string edits to `docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md` — the CONTINUATION box inserted after the canonical-path line (WO-1), the "the generator does not exist" stop retired (WO-2), the Sequencing paragraph rewritten for two migrations that have now run (WO-3). Row 4: three to `docs/specs/fe-d1-amendment-slice.md` — the third-edition citation (WO-4), §5.2's CHECK name (WO-5, correction B), §6.2's split premise (WO-6). **Every OLD string was counted before it was replaced and every one returned exactly 1**; the WO-1 insert block returned 0, proving the box was not already there. Row 6: a dated section appended to `docs/spec-feedback.md`, **written CRLF** because that file is CRLF and the other four are LF — both conventions re-measured this batch by a raw bytes read, never by `grep`, which strips CR. Rows 7–9: three `EVIDENCE`-class files copied to `docs/record/fe-d1a-continuation-2026-09-03/` and **verified byte-identical to the zip's copies by sha256**, never in `docs/specs/` (`CAP-2`). Row 5: the three-act queue merge, below. Row 10: BUILD-STATE, below. Rows 1 and 11 file nothing.

**FINDING 1 — THE REGISTER'S OWN STATED COUNTING METHOD, TAKEN LITERALLY, MISCOUNTS, AND IT IS THE MOST USEFUL THING THIS BATCH FOUND.** The runner and BUILD-STATE both name the method `^\s*- (⬜|✅|🟡)`. Run as written with `re.M`, `\s*` matches **across newlines**, so a blank line preceding a marker line lets the match start at the blank line and consume the row — which then cannot be matched again at its own line start. Applied to the synced register it returned **11 ✅ and, separately, 3 "indented ✅" that do not exist**; a per-line matcher anchored as `^[ \t]*- (…)` returns the true figures. **The published counts were nevertheless RIGHT** — 11 top-level ✅ in the synced file, 119 in the closed one, total 130, conserved — because the artifact happens to cancel on this data. **It will not always cancel, and the method sentence is the thing at fault, not the numbers.** Recorded here, not edited into the ruled text: the method is named in `CAP-3` and in the runner, and changing it is Michael's.

**FINDING 2 — THE `CAP-2` CLASS COLUMN LEFT FOUR ROWS TO THIS RUNNER'S JUDGMENT, AND THE JUDGMENT IS NAMED RATHER THAN BURIED.** `CAP-2` says a row with no CLASS is a `QR-6(e)` act. The packet's rows 3, 4, 6 and 10 carry `—` and each of them WRITES to a repo file — but each **edits an existing canonical file** rather than placing a new one, and the rule's own exemption is for "rows that place no file in the repo." The runner read them as exempt and executed them; only rows 7–9, which create files, carry `EVIDENCE`. **The alternative reading would have skipped four routine edits as unrouted acts.** Whether `CAP-2`'s exemption should say "creates no NEW file" is a wording question for the next packet that touches it.

**FINDING 3 — A STALE `QR-6(e)` FIRING COUNT WAS CARRIED INTO BUILD-STATE BY THE BUILD SESSION AND IS CORRECTED HERE.** BUILD-STATE at `aa132f2` read *"`QR-6(e)` DID NOT FIRE THIS BATCH EITHER — SIX FIRINGS IN TWENTY-THREE BATCHES."* **Batch 88 fired it** — Michael's in-session authorization to move the register's falsified split-count block — and its own runner line says so. The build session rewrote BUILD-STATE in full and re-emitted the sentence unchanged, which is precisely the failure batch 88's own lesson names: *"rewrite in full" is satisfied by re-emitting a stale line.* Corrected in this refresh to **seven firings in twenty-four batches**, with batch 89 itself firing none. **No log entry is edited** — the correction lives in BUILD-STATE, which is rewritten wholesale, and here.

**FINDING 4 — `CAP-4` BOUND FOR THE SECOND CONSECUTIVE BATCH AND WILL BIND EVERY BATCH FROM HERE.** BUILD-STATE stood at 99,943 B with 57 bytes of headroom. The content refresh took it to **101,658 B**; **four paragraphs were paid** to bring it to **99,093 B / 141 non-blank / 155 raw**. This is exactly the mechanism `CAP-OPEN-4` — minted this batch from Michael's *"Carry it to the next design packet (Recommended)"* — proposes to change, and until he rules, `CAP-4` as written governs: the originals ride this line verbatim, below.

**The three-act queue merge (`CAP-3`, `QR-1`, `QR-6(b)`), all three acts done.** (i) **THREE NEW ⬜ ROWS, FULL QUESTION TEXT, none closing**: `FE-SEED-1` and `HD-23` into *Form engine (FE series)* — `HD-23` there because **no `HD-` row remains in the synced register**, every one having moved ✅ to the closed one — and `CAP-OPEN-4` into *Capacity pass (CAP series)*. (ii) The Status paragraph's current sentence replaced with **"Reconciled again to session-log #147 on 2026-09-03 (queue-runner batch 89, one packet — the FE-D1A CONTINUATION)."** (iii) Its predecessor, the `#146` sentence, **appended verbatim to the END of the RECONCILE HISTORY block** in `docs/record/attorney-review-queue-closed.md`. **No row flipped ✅, so the third act's MOVE half had nothing to carry.** Register after the merge, both files measured by the per-line matcher: `docs/specs/attorney-review-queue.md` **429,208 B — 368 ⬜, 5 🟡, 11 ✅ parents held back with indented open children (`CAP-OPEN-2`)**; `docs/record/attorney-review-queue-closed.md` **248,081 B — 119 ✅**. **Total ✅ 130, conserved. 368 open, 373 open-in-substance.**

**Regenerations (`TOC-4`, `TC-2`/`TC-5`).** `docs/record/session-log-toc.md` regenerated over the log as written — **three new rows, not two, and the third is the point**: the 2026-09-03 build entry had never been indexed by any edition, because `TOC-4`'s trigger is a queue-runner batch and that was a Code session fired directly by Michael. Census after this batch: **167 entries to 167 rows** — 83 numbered (`#65`–`#147`, gapless, no duplicates), 67 runner ordinals (23–89, gapless), 17 unnumbered. `docs/specs/session-log-head.md` regenerated IN FULL, never appended — **and its 200 KB ceiling bound again, with the cause named rather than absorbed. §1 carries FIVE whole entries and reaches back only to `#146`: TWO design entries where `TC-2` asks for four. ONE entry is responsible — the `runner 87` line is **113,194 bytes, 55% of the head file's entire ceiling**, because `CAP-4` sent 42,828 bytes of displaced BUILD-STATE text into it verbatim. Batch 88 lost two entries to the same mechanism and reached `#144`; this batch loses three and reaches `#146`. Nothing was truncated and §2 was not cut. **That is `CAP-OPEN-4`'s whole case, measured rather than argued.**

**Nothing was built, and each omission has a rule behind it.** No migration written or run and no database connected — the fix file is the CONTINUATION build session's first commit under `FE-D1A-1`, and this runner is barred from the slice by that ruling's own text. `src/` was not read at all (the packet's §6), so every `src/`-derived figure in BUILD-STATE is **carried and marked as carried** rather than passed off as measured. `form-engine.md` §9.3 untouched — that ruling is applied by the continuation. No row flipped, no ID minted beyond the three rows, no registry file touched, no legal characterization made, and **`PF-1` did not fire — recorded so the skip is not silent.**

**§7 open items, merged so the top of the log stays truthful — all Michael's, none Code's.** Open the continuation build session (`/usage` first, a FRESH Opus Code session on the corrected kickoff prompt) · run the fix migration when that session hands it over and answer check 8 in **both** halves · `FE-SEED-1` (the live-mode template-bank seed, three paths carried) · `CAP-OPEN-4` (displaced BUILD-STATE text → an EVIDENCE file; a `CAP-4` amendment, trigger 3 if ruled) · `HD-23` (the bold LEAD, held for the hands-on sitting, build default named) · `H12-v` and its limbs, BAA a hard gate · `CAP-OPEN-1` / `-2` / `-3` · CC-1, the hands-on sitting — **twenty-one accepted, fifteen proposed** · `TFI-1` / `TFI-2` / `TFI-3` and `CD-14` limb (i) · `RF-2`, `RC-4` · the CRLF-after-checkout operational note, for the next instructions revision and not a trigger · the loose staging folder, the two untracked 2026-08-24 files (DO NOTHING), and the `#137` Voice2 pair's FO/BR/DA home.

**Carried into the NEXT batch's runner line, because a close-out cannot truthfully report its own tail (`QR-5`):** whether the push landed and whether the packet zip was deleted are reported to Michael in-session, not asserted here. **Also carried from batch 88 and still true: `inbox/` holds a leftover UNZIPPED directory, `push-to-code_fe-d1-amendment-slice_2026-08-31/`, whose zip batch 88 deleted.** It is not a queued packet, a directory-scoped delete is outside the narrow `rm -f inbox/*` allowlist, and it was left alone as `QR-6(e)` requires.

### DISPLACED FROM BUILD-STATE (CAP-4)

Four paragraphs, verbatim as they stood in the one hundred thirtieth refresh. Every one is narrative or method; **not one is an existence claim.**

(line 133 of the prior edition)
- **THE ADJUDICATION AND CORRECTION SERIES: QR-6 (#94) · WORDING (#95) · V-EXEC (#96) · TASK 19 WORKLIST (#97) · SIGN-OFF WALK (#98) · TOC REGENERATION (C-2, unnumbered) · CHAT-DISPATCH v3 (#99) · FABLE (#100) · DT-1 CORRECTION (#101) · CHAT-DISPATCH v4 CHAIN (#102) · AUDIT CORRECTIONS (#103) · AUTHORITY READ (#104) · SPEND-DOWN (#105) · FC BLOCK (#106).** **Six structural firsts in that run — `#98`, `C-2`, `#100`, `#101`, `#103`, `#106` — are DISPLACED to batch 88's runner line (`CAP-4`) and live in those entries themselves.** **`docs/prompts/CHAT-DISPATCH-v3.md` and `-v4.md` were NOT edited at #100–#106; amending a repo-tracked prompt is yours**

(line 132 of the prior edition)
- **CRIMINAL OPINIONS READ (#102, T-27, CORRECTED #103) — AND THE CORRECTION RAN AGAINST THE CLIENT.** The read stands: **eight of the nine never mention art. 102.073**, only *Middleton* touches it and only as the State's argument expressly not decided. **BUT *LaPorte* DOES NOT SPLIT BY PAGE.** Both halves are on **415**, in adjacent paragraphs — so **the instruction "Never cite 415" is WITHDRAWN**, having barred counsel from the very sentence stating the rule. **The corrected remedy is a parenthetical — *"overruled on other grounds by Ex parte Carter"*** (`Q-RL6-3`). Two more: ***Carter*'s reaffirmation is a FOUR-vote plurality and dictum** against **five** votes for the overruling; and **"may be raised at any time" was NARROWED, not overruled**. **And FOUR, not five, are "DO NOT PUBLISH"** (`Q-RL6-5`). **Four of the nine remain author-unidentifiable under V-9 and are flagged, never staged**

(line 155 of the prior edition)
- **THE CLASSIFIER CAN REFUSE AN ALLOWLISTED BARE COMMAND.** The v20 note (#94) recorded the forty-seventh invocation's **bare** allowlisted `git push origin master` refused on **both** shells. **The SIXTIETH invocation then stranded exactly as predicted: it committed and never pushed, and 613 insertions across six files sat invisible to the design side until the SIXTY-FIRST batch's Step 0 ahead-stop caught it.** **The QR-3 ahead-stop is the proven catch and it is the ONLY one — a runner that skipped it would have built a second invisible layer on the first. Never conclude a batch landed without `git ls-remote`**

(line 27 of the prior edition)
- **THREE PLACES WHERE READING A GATE ALONE GIVES THE WRONG ANSWER (#92 — recorded, NOT corrected).** Gate 2 read alone OVER-BLOCKS; gate 3 read alone looks satisfiable and is not (gate 6 is a hard prerequisite, and the dependency is recorded at gate 6); gate 9's trigger fires on *reliance*, not on real data. **The three explanations are DISPLACED to batch 88's runner line.**

## 2026-09-03 (#147) — (Typed design session, Cowork, Fable 5 per the environment — the SAME chat as `#146`, resumed
in the morning; DEVICE BRIDGE on the checkout and `Downloads`: THE MORNING AFTER THE AUTHORIZATION — batch 88's
commit-hold report reviewed and its one flagged question RULED in-session (the register's Status paragraph keeps intro
plus current sentence only); the first build tranche's report VERIFIED AT HEAD `aa132f2` and its nine findings
triaged; **BOTH MIGRATIONS RUN BY MICHAEL'S HAND — `MIG-1` eight of eight checks, the amendment NINE OF TEN, check 8
FAILED on a CHECK the CD-1 migration had NAMED and the amendment dropped by a guessed auto-name; the §5 window is
CLOSED**; four rulings; TWO CORRECTIONS filed; nothing built, no spec edited here, no ID beyond three new register
rows)

The sitting is the continuation of `#146`'s chat, resumed after batch 88 and the first build tranche had both run
overnight. Verified over the bridge before anything was said: HEAD `aa132f2` = the local origin ref; batch 88 at
`7d57421` executed the Status-block ruling (the block reads 0 in the synced register, 1 in the closed one) and
moved `FE-D1A-1` ✅ to the closed register; the four build commits `71539f6` → `f01efd1` → `93be13f` → `aa132f2`
touch no prompt and no head file; `inbox/` holds no zip; no `.git/index.lock`. The synced project still showed
batch 87's view until Michael clicked Sync. Every date is Central (DT-1); the ledger ran inside each exchange and
is filed as this packet's EVIDENCE.

- **BATCH 88's COMMIT-HOLD REPORT, REVIEWED — and the one question in it RULED.** Its five findings were read against
  the record: the 163-versus-162 is the known `## ARCHIVED:` pointer (v29's own note); the stale "runner v12,
  unamended" line and the TOC's three stale figures are regeneration-time repairs of files rewritten wholesale (no
  correction entry owed; the runner line names them); the CRLF re-materialization is a NEW OPERATIONAL NOTE for the
  next instructions revision, not a trigger — `git checkout` on Michael's machine writes LF record files back as
  CRLF (`core.autocrlf=true`, no `.gitattributes`), and because `CAP-4` deliberately measures the working tree, a
  post-checkout measurement is inflated by exactly the line count: convert back, or never checkout mid-batch. **The
  fifth was his: the Status paragraph's batch-87 split-count block, falsified by the three flips.** Put with the
  alternatives (keep-and-refresh each batch; leave and queue a row); **his pick, verbatim: *"Move it to the closed
  register now (Recommended)"*** — the synced Status paragraph keeps its intro plus the CURRENT reconcile sentence
  only, the block moves VERBATIM to the closed register's RECONCILE HISTORY beside batch 87's superseded sentence.
  An APPLICATION of `CAP-3` §3.3 as ruled, not a change — no trigger 3. Executed in batch 88 as a packet-added act on
  his in-session authorization (QR-6(e)); the relay instruction is filed as EVIDENCE. The same report's shape —
  eleven displaced BUILD-STATE originals riding the runner line verbatim, pushing the head file past its 200 KB
  ceiling and costing two whole entries (the head reaches back to `#144`, three design entries, not TC-2's four) —
  produced a PROPOSAL, carried by his pick *"Carry it to the next design packet (Recommended)"*: route displaced
  text to an EVIDENCE file under `docs/record/<batch-slug>/` with the runner line carrying a pointer — a `CAP-4`
  amendment, trigger 3 if ruled. It is `CAP-OPEN-4` below. BUILD-STATE will displace every batch from here; the
  first build tranche then did the same into its own entry, the second consecutive entry carrying displaced prose.
- **THE FIRST BUILD TRANCHE, VERIFIED AT HEAD AND ACCEPTED.** §13 items 1–4 and the generator half of 5 landed:
  `scripts/generate-form-text.mjs` (the §9 generator — which had NEVER existed; correction A below), the
  fixed-sentence table with its drift test, the D-45 vocabulary with an SQL↔TS guard, the migration written and not
  run, the rename through both adapters, the probe (46) and store v13→v14 with a regression test; trio 452/452,
  build 0, lint 0; the Medical tab click-verified in demo. Items 5–14 did not land; three of thirty invariants
  ship; BUILD-STATE says so in those terms. The build's two judgment calls were right — writing the generator on
  the slice's authority over the prompt's stop (the documents win), and stopping at a green boundary rather than
  half-building the assembly engine. Its nine findings, triaged: **build defaults the continuation takes** — the
  split and the rider by cloning the archetype's own `<w:p>` per paragraph (§12.3 applied per paragraph; the slice's
  §6.2 premise corrected by WO-6); both `midlevel` tokens resolved (`{midlevel_short_name}` for the rider's opening,
  `{midlevel_name}` in §9.12 — different things, both needed); the second stale `rlsProbe` comment fixed in passing;
  and, PROPOSED as a default with his veto open, the four `*Provider*` DataAdapter methods renamed to Facility.
  **Michael's, ruled below** — §9.3's one `{s}`; the bold LEAD. **Queued below** — the live-mode template-bank seed
  (`FE-SEED-1`). **Packet mechanics** — the prompt correction (WO-2), the slice's authority line (WO-4). The
  slice's third-edition citation is noted, not a defect: the third fold-in landed at batch 86 before the tranche
  ran, and the build read the third.
- **BOTH MIGRATIONS RUN — Michael's hand, the live Supabase project, in one sitting, before any live matter.**
  His first paste was the file's PATH, not its contents (Postgres: syntax error at "db" — nothing ran); the file
  was then pasted whole. STEP 0 counts were taken AFTER `MIG-1` and BEFORE the amendment — equivalent, because
  `MIG-1` never mentions the three tables (verified from the file) — and read **0 / 0 / 0**, so the amendment's
  check 7 is satisfied trivially and the rename is proven by catalog, not by rows. **`MIG-1`
  (`2026-08-20-fe-d1-form-engine.sql`): EIGHT OF EIGHT** — four names; `true` ×4; `false` ×4; four rows rls=true,
  policies=1; 7; the probe insert with `cases` = 1 (a real pass, not vacuous); NULL, NULL; 41. **The amendment
  (`2026-09-03-fe-d1-amendment.sql`): NINE OF TEN** — the gate passed (1); five names and `client_id` (2); `true`
  ×5 (3); `false` ×5 (4); five rows rls=true pol=1 (5); old table NULL / new table present, `facility_party_id` on
  exactly four tables, `provider_party_id` on none (6a–6c); 0/0/0 (7); both new families accepted in a rollback (9);
  46 (10). **Check 6's third limb read 47 / 11 / 3 against an expected 0 / 0 / 0 — a defect in the CHECK'S TEXT, not
  the schema, proven by the decisive form:** every hit is either on the file's OWN new tables (`case_providers`,
  `case_provider_individuals`, `case_provider_visits`, `generated_document_paragraphs.case_provider_id` — born with
  "provider" in their names) or in Supabase's `auth` schema (the constraint limb never filtered by schema; the index
  and policy limbs did); filtered to `public` and excluding the four, the answer is ZERO rows. Two verification-text
  corrections ride the fix file. **CHECK 8 FAILED — a real defect:** inserting `renders-care-at` raised
  `contact_edges_type_check` (23514). The live catalog, listed by `pg_get_constraintdef`, shows THREE CHECKs on
  `contact_edges`: the amendment's new `contact_edges_edge_type_check` (twenty values), `not_self`, and the OLD
  `contact_edges_type_check` (nineteen values, no `renders-care-at`) — which the CD-1 migration of 2026-08-12 had
  NAMED (its lines 188–190), and which the amendment's `drop constraint if exists contact_edges_edge_type_check`
  therefore never touched. The two date columns landed (the failing row shows them). Live effect today: none — no
  code path inserts a `renders-care-at` edge until item 6 is built. The file's own rule stopped the run there;
  check 8's second half is moot until the old CHECK is gone. **The §5 window is CLOSED**: the live app and database
  agree on `facility_party_id`; the one thing still open on the live schema is that old CHECK.
- **CORRECTION A — "sliced out by program."** *Asserted:* the FE-D1 build entry (Code session, 2026-08-20) and the
  header of `src/forms/variants.ts` say the variants were generated by program. *True instead:* no generator was
  ever committed — `git log --all -- scripts/` shows only `build-toc-fixtures.mjs`; the generator first exists at
  `71539f6` (2026-09-03), and the kickoff prompt was written on the false premise (its Step 2 listed "the generator
  does not exist" as a stop). *Corrects:* the 2026-08-20 FE-D1 build entry, which stands as written. *Actor:* the
  FE-D1 build Code session of 2026-08-20 — its model as that entry's own header records it, not inferred here.
  *Failure class:* a mechanism asserted in the record but never committed — the "a capture is not a filing" class
  (work that existed only in a session, `#127`–`#131`), in its build form. *What changed:* the generator is
  committed; `variants.ts` is now genuinely generated; the prompt's stop line is retired by WO-2.
- **CORRECTION B — the CHECK's name.** *Asserted:* the amendment slice §5.2: the `edge_type` CHECK "is dropped by
  its auto-generated name `contact_edges_edge_type_check` and re-added"; the migration implemented that sentence
  faithfully. *True instead:* on the live database the CHECK is NAMED `contact_edges_type_check` by the CD-1
  migration (2026-08-12, lines 188–190); `db/schema.sql` carries it inline and unnamed, so the auto-name is right
  for a FRESH project and wrong for the live one — schema.sql is not the live database's constraint-name authority,
  the migration history is. Evidence: the CD-1 file at HEAD and the live `pg_constraint` listing above. *Corrects:*
  `docs/specs/fe-d1-amendment-slice.md` §5.2 (in place, WO-5; the document is a spec, not a log entry) and the
  reasoning the migration inherited. *Actor:* Fable 5 — the 2026-08-31 late design session that authored the slice
  (`#140`). *Failure class:* drop-by-guessed-name — the D-7 rule the SAME sentence applied to the unique key ("by
  catalog lookup, never by a guessed name") and not to the CHECK; compounded by an `if exists` drop treated as done,
  the QR-6(a) class (a command that cannot disconfirm). *What changed:* the fix migration is the continuation's
  first act (below); WO-5 corrects the slice; the amendment file's check text is corrected in the fix file.
- **FOUR RULINGS — his picks verbatim from option sets put one at a time, alternatives named (CC-1(a)).** (1) The
  old CHECK: *"Follow-up migration file (Recommended)"* — the continuation writes
  `db/migrations/2026-09-03-fe-d1-amendment-fix.sql`, dropping the old CHECK by CATALOG LOOKUP and folding the same
  into `db/schema.sql`; Michael runs it by hand; check 8, both halves, re-runs after. Not taken: the one-line drop
  now. (2) §9.3's `{s}` serving a noun and a verb: *"Second token, build names it (Recommended)"* — `{s}` keeps the
  noun's plural s; a new verb token, named by the build, carries the verb's singular s; §9.3's approved wording is
  otherwise untouched; the continuation applies the edit to `form-engine.md` §9.3 under this ruling — the ONLY
  spec edit the continuation is authorized to make — then regenerates and drift-tests. Not taken: hold. (3) The
  bold LEAD against a master whose narrative runs are already bold: *"Hold for the hands-on sitting
  (Recommended)"* — CC-1(b); build default meanwhile: the LEAD as its own bold run, the body exactly as the master
  supplies it, reported as a default taken; `HD-23` below carries it. Not taken: body roman now; keep body bold with
  no LEAD emphasis. (4) The live-mode template-bank seed — nothing seeds the `form_*` tables in live mode and the
  gap predates the slice: *"Queue a register row (Recommended)"* — `FE-SEED-1` below, three options carried; the
  continuation stays fixture-only as authorized. Not taken: rule app-side now; rule a seed migration now.
- **WHAT SHIPPED (this packet, docs-only):** this entry; six exact-string work orders — the kickoff prompt's
  CONTINUATION box (WO-1), its stop-line correction (WO-2) and its Sequencing paragraph (WO-3); the slice's
  authority line (WO-4), §5.2 (WO-5) and §6.2 (WO-6); three register rows with full question text — `FE-SEED-1`,
  `CAP-OPEN-4`, `HD-23`; a dated `spec-feedback.md` section; three EVIDENCE files under
  `docs/record/fe-d1a-continuation-2026-09-03/` — this sitting's ruling ledger, the migration-run record, and the
  batch-88 relay instruction. **PF-1 did not fire — no legal characterization and no registry entry; the ruling
  on §9.3 is a grammar token in approved wording, not a legal proposition — recorded so the skip is not silent.**
  **RR-1:** every work order's OLD string was read at HEAD `aa132f2` and checked unique before the zip closed.
- **WHAT DID NOT HAPPEN, each because a rule bars it:** nothing built; no migration written here (the fix file is
  Code's act under `FE-D1A-1`); no spec edited by this session (every change travels as a work order); no live
  database touched by any session but Michael's hand; no ID minted beyond the three rows; no held item decided —
  the hands-on queue stays at twenty-one accepted, and its proposals rise to fifteen with `HD-23`; `MIG-1` and the
  amendment were RUN by Michael, not by Code; the registry untouched.

**Next:** the queue runs this packet on `mdb-pllc` (batch 89); then a FRESH Opus Code session fires the corrected
kickoff prompt — `/usage` first — and its first commit is the fix migration, which Michael runs by hand and
answers before the session goes on to §13 items 5–14; then the hands-on sitting (voice) once the generator renders.

**Staged for Code:** none beyond this packet. **Awaiting/Returned from Code, unreviewed:** the six work orders, the
three rows, the spec-feedback section and the evidence directory once landed; the fix migration once written.
**Still open and still Michael's:** run the fix migration when the continuation writes it, and answer check 8 both
halves · open the continuation build session after batch 89 lands · `H12-v` and its limbs · `CAP-OPEN-1`,
`CAP-OPEN-2`, `CAP-OPEN-3`, `CAP-OPEN-4` · `FE-SEED-1` · the hands-on sitting (twenty-one plus fifteen) ·
`TFI-1`, `TFI-2`, `TFI-3` / `CD-14` limb (i) · `RF-2` · `RC-4` · the loose staging folder (his hand) · the two
untracked 2026-08-24 files (DO NOTHING) · the `#137` Voice2 pair's FO/BR/DA home · the CRLF operational note at
the next instructions revision.

## 2026-09-03 — CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md` on Michael's `FE-D1A-1` authorization) — THE FE-D1 AMENDMENT SLICE, FIRST TRANCHE: the §9 generator finally exists and closes the standing red, the fixed-sentence table is generated and drift-tested, the provider type vocabulary lands, and the migration is WRITTEN AND NOT RUN with the rename carried through code and the store — four of §13's fifteen items done, eleven NOT, and the session says which

**THE AUTHORIZATION, QUOTED AND NAMED (Step 0).** `FE-D1A-1` is ruled AFFIRMATIVELY. The entry is **`## 2026-09-02 (#146)`** in this file, and Michael's words in it, verbatim at 23:44 CDT, are ***"YES — as written (Recommended)"*** on the option text *"Scope §3/§4, defaults §10, fresh Opus Code session, runner barred, fixture-only, migrations written not run. Mints FE-18–FE-22 and CD-14 in the same act."* That entry names `docs/specs/fe-d1-amendment-slice.md` and says the prompt's Step-0 test "is satisfied by THIS entry and by nothing else." The queue row is ✅ in `docs/record/attorney-review-queue-closed.md`, which per `QR-6(a)` confirms nothing on its own — the entry is what establishes it, and the entry was read at HEAD. **Step 0's other two limbs:** `git ls-remote origin refs/heads/master` returned `7d574217f3601fd59ea5e97e11034665745b6e90`, equal to HEAD, on `master`, no tracked modifications (the tracking ref was not used as evidence); and **MM-1 did not fire — `inbox/` holds NO packet zip**, only the loose `push-to-code_fe-d1-amendment-slice_2026-08-31/` staging directory that `#146` and batch 88 both record as deliberately left in place and Michael's hand.

**THE BASELINE WAS EXACTLY THE RECORD'S PREDICTION, AND IS NOW CLOSED.** Before a line was written: `npm test` **exit 1 — 1 failed / 412 passed of 413**, the single failure being the §9 drift test at `src/forms/__tests__/engine.test.ts:330`; `npm run build` exit 0; `npm run lint` exit 0. Exit codes read off `npm` itself, never through a pipe. **That one red is the red §1 predicted** (batch 84 edited §9.4 and the generator's comparison moved with it), so it was recorded as the baseline rather than treated as a stop. **After the tranche: test exit 0, 452/452; build exit 0; lint exit 0.** The trio ran again at every increment, not only at the end.

**STEP 2 — THE `src/` PREMISES RE-VERIFIED, AND FOUR CAME BACK DIFFERENT.** The slice was written by a session that read no source; this session read it. Twelve read-only lanes were dispatched with their tools scoped to a read-only agent type rather than merely instructed — the `#88` lesson that "a DO-NOT binds every agent a session spawns, and saying so in the prompt is evidently not the same as enforcing it." **CONFIRMED:** the four master archetypes exist by exactly D-19's names (`treating_provider`, `provider_group`, `imaging_interpreter`, `custodian_of_records`, `src/forms/context.ts:401-405`); `resolveUsingSupabase` is one seam for adapter choice; the store was at 13 with its pinned literals in two tests; the drift test does re-read the spec (through Vite's `?raw`, i.e. the working tree, not literally git HEAD); `db/schema.sql` held 41 `create table` statements against a 41-entry probe list. **The date-only formatter invariant 4 names is `longDateCentral` (`src/forms/grammar.ts:112`)** — not a separately-named function, and already tested against "March 14, 2025". **DIFFERENT, each recorded rather than worked around:** (1) **the `variants.ts` generator has never existed** — `git log --all -- scripts/` shows only `build-toc-fixtures.mjs` — which the PROMPT calls a stop and the SLICE (§6.4, §13 item 2) tells the build to write; the documents win by the prompt's own rule, so it was written, and the prompt gets the correction; (2) **there is no `**`-to-bold mechanic** — `context.ts:108` deletes the markers — **and the master's narrative runs are already bold**, so AS-Q8b's LEAD is not visually distinguishable in the shell as it stands; (3) **one `testifying_expert` item renders a block PLUS one narrative**, so the split and the rider cannot be extra items without printing the facility's block twice; (4) **there is no SQL or Supabase seed path for the template bank at all**, so the amendment migration carries no seed rows and the live-mode bank is empty on arrival — a gap that predates this slice. All four, and five more, are filed at `docs/spec-feedback.md` under **2026-09-03**. **None of the three premises the prompt names as stops actually fired.**

**WHAT LANDED — §13 items 1, 2, 3, 4 and the generator half of 5, in four commits.**

- **`71539f6` — item 2, the generator.** `scripts/generate-form-text.mjs` (npm script `generate:forms`, and a `--check` mode) reads `form-engine.md` §9 and writes `src/forms/variants.ts` **and** `src/forms/fixedSentences.ts`. "Verbatim" is only enforceable mechanically, so nothing is retyped. Regenerating carried §9.4's ruled edit into the seed and closed the baseline red, and refreshed three `notes` that had drifted on the `HD-17` provider-block rename. **22 fixed-sentence rows** — ten typed basis/causation pairs, the rider's scope sentence, §9.11 whole — sliced by the anchors §6.4 names, never by a sentence quoted into a file. The generator ASSERTS §6.4's stated equalities rather than trusting them: §9.5–§9.8 share one basis sentence, and §9.4's causation is now byte-identical to §9.1's, which is what Michael's ruling did. **Invariant 1 ships** as a drift test that re-reads the spec and checks every row is still a byte-exact slice opening and closing on its anchors — the rider excepted, because AS-Q8c approved a COMPOSED sentence whose subject is the mid-level's short name and only whose tail is §9.12 verbatim; that distinction was caught by the test failing on its first run. **Two tests that pinned the superseded chiropractic standard now assert the ruled one.**
- **`f01efd1` — the D-45 vocabulary.** `src/forms/providerTypes.ts`: the fifteen keys and labels stated once, plus `TREATING_TYPES` (10), `FIXED_PAIR_TYPES` (9) and `EXTRACTED_TYPES` (12), the facility/marker subsets, `effectiveMarker()` = `coalesce(role_marker, facility type)`, and the "(display only)" rule. `radiologist` owns §9.2's pair without being a treating type, so the fixed-sentence table's set and `FIXED_PAIR_TYPES` differ by exactly one member — the kind of difference that rots silently, so a test asserts the relation and the generated export was renamed `FIXED_SENTENCE_TYPES` so the two names cannot be confused.
- **`93be13f` — items 3 and 4.** `db/migrations/2026-09-03-fe-d1-amendment.sql`, **WRITTEN AND NOT RUN. This session connected to no database.** Its FIRST statement is the `D-37` gate: it raises if `form_templates` is absent and names `2026-08-20-fe-d1-form-engine.sql` as the file that must run first, unchanged (`HD-18`). STEP 0 pre-run counts are in the header, ten verification checks are at the foot to be answered in words, and every other statement is guarded. Five tables in FK order, each with RLS + one policy + GRANT + a probe entry **in the same commit** (slice item 11). The renames go by **catalog lookup, never a guessed constraint name** — a guess that misses fails silently and leaves the old word in the schema while everything visible looks renamed — and check 6 asks `pg_constraint`, `pg_indexes` and `pg_policies` separately, because the first two cannot see a policy. Folded into `db/schema.sql` at the §5 position, between the FE-D1 block and `API ROLE PRIVILEGES`; the file now carries **46 `create table` statements** and the probe list **46 entries**, and the existing sequence-identity test passes unchanged. In code: the type, the field, both adapters, the probe, the "Facility" label (stored key untouched, `D-4`), and **store v13 → v14** forward-in-place with a full backup and a literal `14`.
- **The store step is not cosmetic and has its own regression test.** A stored v13 bill carries `providerPartyId` while the renamed code reads `facilityPartyId`, so a store that migrated without it would show every bill with **no facility, silently**. `migrateV13ToV14` moves the key on bills, code mappings and profiles, deletes the old one, renames the collection, and **appends §9.4's ruled text as a NEW template version quoting Michael's words in the change note — never an overwrite of v1 (`D-63`)** — and appends nothing on a second run.

**DEFAULTS TAKEN, BY NUMBER — and the honest distinction between a column and a behaviour.** Built as named: **D-4** (label "Facility", stored key unchanged) · **D-6** (the two `form_templates` families; fixed rows keyed `fixed:<slot>:<type>`, slot order a code constant, no region syntax minted) · **D-7** (the named `contact_edges_edge_period_key` over `effective_from`, nulls not distinct) · **D-37** (the gate's message) · **D-39** (`generated_documents.client_id`) · **D-43** (the closed six-format CHECK) · **D-45** (every key, label and set) · **D-53** (the FK on-delete behaviours) · **D-57** (the ten paragraph shape keys) · **D-63** (fresh seed carries HEAD text as v1; the v13→v14 step appends v2; the drift test compares the GENERATED CONSTANT and never the store's current row). **Taken as a COLUMN whose behaviour is not yet built — the column exists, nothing reads it yet:** **D-12** (`missing_from_latest`) · **D-15** (`lop` on `case_providers`; the §5.2 gate still keys on `party.fields`) · **D-32** (`type_carried_from_case_id`; the last-case query is unbuilt) · **D-48** (`last_extraction_version_id` / `last_extracted_at`) · **D-51** (`hand_edited_fields`) · **D-54** (the NULL semantics are stated in the schema's comments; the join is unbuilt) · **D-55** (`removed_by_hand_at`) · **D-56** (`party_id`; the promote flow is unbuilt) · **D-60** (`removed_at`) · **D-62** (`readable`; the threshold function is unbuilt). **Every other §10 default is NOT taken, because the item that would take it is not built.**

**WHAT DID NOT LAND, NAMED ITEM BY ITEM RATHER THAN LEFT TO INFERENCE.** §13 items **5 (the seeded fixed-sentence rows and the `writer-instructions` row), 6 (`R17` on the Medical tab), 7 (the chronology, its readers and the extraction call), 8 (the `ParagraphWriter` interface, the fixture writer, the Edge Function stub), 9 (assembly — the LEAD, the shapes, block membership, the order), 10 (the three tiers and the eighteen panel lines), 11 (the Forms tab, the retained track, supplementation), 12 (the remaining invariants of §11), 14 (the click-through walk on the D-35 fixtures)** are **NOT BUILT**. Of §11's thirty invariants, **1, 14 (partly — the column/relation limbs; its `source_path` limb is vacuous, see spec-feedback) and 21 (partly)** ship; the rest do not. **No `ParagraphWriter` interface, no fixture writer, no Edge Function, no vendor anything, and no `DISCLOSURES_WRITER_CREDENTIAL` string exists in the tree yet** — so `H12-v` and the BAA gate are untouched, as they must be. **The untestable list at §11's foot is acknowledged and not tested**, and remains untestable by construction: the custodian sentence's four limbs, whether the opening explains what each individual did, paragraph length, extraction quality, `ND-5`, `ND-9`'s study-date limb, the event noun and the credential guard inside the writer's prose, the rider's "actually did", the voice, and the BAA itself.

**WHAT WAS DELIBERATELY NOT DONE, each because a rule bars it.** No migration run and no database connected. No `MIG-1` amendment or fold-in. No spec edited — the nine findings went to `docs/spec-feedback.md`. No `#nn` minted (`TOC-6`), no queue row, no ID. `docs/record/session-log-toc.md` NOT regenerated — `TOC-4`'s trigger is a queue-runner batch, which this is not, so **this entry is unindexed by design and the next batch's census will detect it**; `docs/specs/session-log-head.md` not written to (`TC-5`). No vendor SDK, key, endpoint or model name. No `privilege_tier` write. No TRCP 195.2 date computed, displayed or proposed. No registry entry drafted. `case_clients`, `case_parties`, `case_roster_flags` and `party_pii` untouched; `contact_edges` touched only for the change the slice expressly authorizes. The queue was not run. **Fixture-only, and "walked" is not "live": the engine stays EXCLUDED from the GL-1 floor.** The wizard's `providerCards[].providerPartyId` was deliberately NOT renamed — it is a wizard ANSWER inside stored `generated_documents.answers` snapshots, not one of the three columns.

**ONE THING VERIFIED BY CLICKING, because the rename touched a walked surface.** The dev server was started in demo mode and the **Garcia matter's Medical tab rendered correctly**: both bills resolved their facility names through the renamed field and the roll-up computed, with no console errors. Had the rename broken the read path the PROVIDER column would have shown "—" rather than failing loudly, which is exactly the silent failure the store migration exists to prevent.

**TWO ERRORS CAUGHT BY READING RATHER THAN ASSUMING, recorded because both would have shipped.** (1) The first draft of the migration widened `form_templates.family` from a GUESSED list `('instrument','section','clause')`; the real CHECK is `('instrument','expert-narrative-variant','stock-answer')`, so dropping and re-adding would have orphaned every row already in the bank. (2) `db/schema.sql` is **CRLF** while much of `src/` is **LF**, and a first edit pass with `\n` anchors matched nothing and reported a false "anchor not found" — batch 88's Finding 4 in a quieter form. Both were found before a commit. A third guard was added rather than trusted: a test asserts the CHECK lists in BOTH the migration and the schema match the TypeScript vocabulary, because "the vocabulary is stated once" is only true if something checks it, and the SQL copies are the ones no compiler reads.


**DISPLACED FROM BUILD-STATE (`CAP-4`)** — the ceiling does not delete text, it moves it here. Bound at **99,834 B before → 103,124 B after the content refresh alone → 99,943 B AS COMMITTED** once five paragraphs were paid, at **145 non-blank lines**, both figures verified against the working tree rather than `git show`. **FIVE paragraphs paid, every one narrative or method and NOT ONE an existence claim about what is built**; each was chosen by measurement and each has its substance living elsewhere. The convention names a runner line as the home for displaced text; this session is a BUILD session, so its entry stands in that place. **A MEASUREMENT TRAP WORTH NAMING, caught before the commit: `CAP-4`'s banner states the file's own byte count, so writing the figure CHANGES the figure. The first correction overshot the ceiling by 72 bytes — the file passed at 99,903, then failed at 100,072 because the honest sentence explaining the count was itself 123 bytes of the count. It converges only when the replacement has the same digit width as what it replaces, which is why the final edit swapped `99,903` for `99,943` and nothing else.** Each original follows VERBATIM, named by what it was cut from:

> **[A] — the HK-4 transfer hypothesis (its neighbours keep the existence claims: Stage 1 held, no scorecard, T4 unauthorized, the audio absent).** **ITS HEADLINE IS THAT HK-4 MAY DESCRIBE AN ACT THAT ALREADY HAPPENED.** HK-4 and this file both read as *"create the directory at staging time"*; the **2026-07-25** pilot-fixtures entry records the thirteen as **already archived at `..\data\pilot-recordings\` WITH A PROVENANCE README no design session has ever read.** **So HK-4 is probably a P15 → P1 TRANSFER — cheaper and more dangerous, since a transfer can silently overwrite that README** (`Q-T3P-1`, `Q-T3P-2`). **The bundle also held ground-truth scripts, scorecard and findings, while HK-4 names only audio** (`Q-T3P-3`)

> **[B] — the split-measure finding behind `Q-T3P-4`.** **THE MEASURE ITSELF IS SPLIT, WHICH NOTHING ELSE STATED (`Q-T3P-4`).** The authorization reruns both batches *"against the existing ground truth"* — but ground truth exists for **five of thirteen**. Batch 2 is scripted → an **ACCURACY** measure; batch 1's "existing" artifact is the int8/CPU-floor transcript, a prior **OUTPUT** → a **CHANGE** measure. One figure reports two different things. **D1 auto-file and the confidence thresholds wait on this scorecard**

> **[C] — the pilot recordings' coverage narrative.** **COVERAGE, PLAINLY: the thirteen exercise ROUTING thoroughly and the ASR stack NARROWLY.** No long-form audio (max ~71 s; deposition length is the Statement Bank's real use case, untested — Phase 0's 79 MiB / 20 MiB activation figures are **3-second datapoints, not extrapolable**). The **4-speaker cap is untested**. **No Spanish.** **Nothing from the capture kit, which is not purchased. Word boosting has never run on any recording.** All thirteen are iPhone / Voice Memos / **AAC ~70 kbps mono** and can never meet the kit standard — **preserve bit-exact, no re-encode/up-sample/normalize/trim**, because an up-converted file *looks* like kit-standard material in its header

> **[D] — the task-19 worklist's two standing arithmetic defects (the queue row `Q-T19-3` is their home).** **THE WALK'S STAGING LAYER STANDS AND VERIFIES NOTHING: `task-19-signoff-worklist-2026-08-17.md` (#97).** One row per entry across all forty. **Its two arithmetic defects ARE STILL STANDING (`Q-T19-3`)** — §5 Part B says "eleven" over a twelve-row table; §6 says "five of the fourteen" and lists four. **Neither was corrected: §4.1 ordered it verbatim and a change to packet content is yours.** **One line WAS changed, and only because he directed it (E-3): the *Park Cities Bank* pinpoint → 876–77** in rows 14 and 15. **E-3 WAS SCOPED, and the four unconformed carriers of the old `876` are named:** the workbook's rows 14/15 (**expressly barred**), two dated pass records (**conforming a finding falsifies it**), and the log's #65-era line (append-only)

> **[E] — the chat-dispatch v4 completion narrative (PF-1's firing record survives in full one line below it).** **CHAT-DISPATCH v4 IS COMPLETE AND EVERY CHEAP MOVE IT LEFT IS SPENT.** `docs/prompts/CHAT-DISPATCH-v4.md` (79 non-blank / 94 raw). **`RR-1` ran at #102 and caught two cross-task interactions — and caught NONE of the twenty-two defects the audit found, because RR-1 checks documents against later RULINGS, not against PRIMARY SOURCES. THAT GAP IS CLOSED BY RULE AND HAS BEEN EXERCISED FOUR TIMES:** `PF-1` on the #106 packet (twelve defects, 0 HIGH), the #108 packet (twenty-one, two HIGH — two INCOMPLETE divergence enumerations whose re-put CHANGED THE OUTCOME on entries 12 and 32), the #109 packet (twenty-two, one HIGH each), and the #110 packet (**fourteen, none HIGH — and its one authorization finding ran the OTHER way: the shipped Opus prompt was granting a permission beyond the #108 terms and it was struck**). **CODE-DISPATCH v3 IS COMPLETE**

**STILL MICHAEL'S, unchanged by this session:** run `MIG-1` unchanged, then `db/migrations/2026-09-03-fe-d1-amendment.sql`, **each pasted alone, checks answered in words, both in the SAME SITTING as pulling this build and before a live matter is opened** — because the renamed adapter selects `facility_party_id` and **the live database keeps `provider_party_id` until BOTH have run, so the live Medical tab fails on the renamed column in between** (slice §5). Then: the rest of §13 in a further session; the CC-1 hands-on sitting (twenty-one accepted plus the fourteen the slice proposes, `AS-Q14`–`AS-Q17` among them — carried as PROPOSALS, none of them put by `FE-D1A-1`); `H12-v` and the BAA before any real record; `SKILL.md` v3.

## 2026-09-03 — QUEUE-RUNNER batch (runner line; EIGHTY-EIGHTH invocation) — one docs-only packet, and the batch that FILED A BUILD AUTHORIZATION WITHOUT BUILDING ANYTHING: `FE-D1A-1` is ruled, so the FE-D1 amendment slice is BUILD-AUTHORIZED and still entirely unbuilt, this runner being BARRED from it by the ruling's own text; three `EVIDENCE` files land under a ruling's slug for the first time; and the runner's own findings are five — a measurement trap that looked exactly like a defect, a stale claim BUILD-STATE had carried since the batch that falsified it, three separate staleness defects in the TOC, a `git checkout` that silently flipped three files to CRLF, and a falsified count left standing on purpose because correcting it is Michael's ruling and not a runner's

**THE PACKET, AND THE ORDER.** ONE zip, so no ordering question arose and `QR-4`'s dual-order rule had nothing to disagree about: `push-to-code_fe-d1a-1-authorization_2026-09-03.zip` — 42,131 B, mtime 2026-09-03 00:14:46 −0500, sha256 `84b5332f59e1265f96309280e533c405bb2344b8082af976197cd92f9b2e6d61`, pinned at Step 1 (`QR-6(c)`). **Nothing was superseded** — a single packet cannot conflict with itself — and **nothing was skipped as already built.** Step 1 item 3 found `docs/record/fe-d1a-1-authorization-2026-09-02/` ABSENT and the `FE-D1A-1` row still ⬜ by leading-marker read, so the packet was neither pushed nor committed-unpushed. **The Step 1 STOP ran long — Michael first answered HOLD and then corrected it — so the packet identity was RE-PINNED before execution and the Step 0 gate re-read; both were unchanged. That re-pin is the whole point of `QR-6(c)`: a packet has in fact been swapped mid-STOP, and this STOP was longer than most.**

**STEP 0 GATE.** `git fetch origin` then `git ls-remote origin refs/heads/master` returned `cae00ba259c529e14c56c87bca13d769346edf58`, equal to HEAD — not behind, not ahead, not diverged; on `master`; no tracked modifications. The tracking ref was not used as evidence (`QR-6(a)`). The two untracked 2026-08-24 files in `docs/specs/` and the loose `inbox/push-to-code_fe-d1-amendment-slice_2026-08-31/` staging directory were left untouched, as the packet's §6 directs.

**HEALTH CHECK SKIPPED, AND THE SKIP IS RECORDED RATHER THAN SILENT (`QR-6(f)`).** §5 is NONE in the only packet, and no `src/`, `db/`, `supabase/` or build-tooling path is routed — every write this batch made lands under `docs/record/` or `docs/specs/`. `npm test` / `npm run build` / `npm run lint` would have proved nothing about this batch and were NOT run. **The test suite's standing RED prediction on the §9 drift test is therefore neither confirmed nor cleared here; it is the build session's first act to measure.**

**EVERY FIGURE THE PACKET ASSERTED ABOUT THE REPO WAS CHECKED BEFORE A BYTE WAS WRITTEN, AND ALL OF THEM HELD.** The newest design entry was `#145`, so `#146` needed no renumber; the `FE-D1A-1` row was a single line of 3,024 B with no indented children, so it moved cleanly; `docs/specs/session-log-head.md` was 196,398 B and `docs/specs/BUILD-STATE.md` 99,971 B — **29 bytes under the `CAP-4` ceiling**, exactly as §1 predicted. All six §4 exact-strings were confirmed present EXACTLY ONCE and were EXTRACTED from the manifest's fenced blocks rather than retyped, with a non-ASCII audit on each showing straight ASCII apostrophes throughout (the curly-quote class). Both relocation manifests matched their stated sha256 — `094460eb…a1c373` and `c489b3e5…2336853b` — and the ruling ledger matched its stated 9,453 B. The §3 entry block in the manifest proved byte-identical to the zip's `session-log-entry-146.md` but for that file's trailing newline. **The slice's §14 item 2 was read AT SOURCE rather than taken from the manifest's quotation of it, and the manifest's rendering was correct.**

**WHAT LANDED.** The `#146` entry, prepended whole and verbatim. Three `EVIDENCE`-class files to `docs/record/fe-d1a-1-authorization-2026-09-02/` — **the first `EVIDENCE` rows ever born under a RULING's slug rather than a pass's** (`CAP-2`). The three-act queue merge: `FE-D1A-1`, `CAP-CARRY-1` and `CAP-CARRY-2` each annotated, flipped ⬜ → ✅ and MOVED to `docs/record/attorney-review-queue-closed.md`, the Capacity-pass heading pair created there after the TC-series section as `CAP-3` provides; the Status paragraph's current reconcile sentence replaced and **its predecessor appended verbatim to the RECONCILE HISTORY block**; NO new row minted. The merge ran under conservation checks that refused to write on any mismatch — ⬜ 368 → 365, synced ✅ 11 unchanged, closed ✅ 116 → 119, total ✅ conserved at 130 — and every check passed on the first run.

**FINDING 1 — A MEASUREMENT TRAP THAT LOOKED EXACTLY LIKE A DEFECT, AND WAS NOT.** `docs/record/session-log.md` carries **163 `## ` headings but only 162 ENTRIES** at HEAD, and the head file's §2 index carried 162 rows. Read carelessly that is a missing index row in a file whose whole purpose is to tell a bridge-less session that an entry EXISTS. It is not: the 163rd heading is **`## ARCHIVED: entries older than the 2026-08-13 cutoff`**, a pointer marker rather than an entry, so 162 was correct and batch 87's head file was right. **Recorded because the disconfirming read was one command away and the plausible read was wrong: any future count of this log that keys on `^## ` and does not exclude that marker will over-report by exactly one, and will do so while looking like arithmetic.** The generator written this batch excludes it by name.

**FINDING 2 — A STALE CLAIM BUILD-STATE HAD BEEN CARRYING SINCE THE BATCH THAT FALSIFIED IT.** Its runner-discipline line read **"in force; runner v12 … unmoved, unamended"** — written by batch 87, the very batch that amended the runner v12 → v13 and then ran under its own amendment. Its own header banner said `v13` two screens above. **Corrected this refresh to v13 with the amendment named**, and `CAP-1`–`CAP-4` and the three-act merge added to the same line. **The class is worth naming: a file rewritten IN FULL every batch can still carry a false sentence, because "rewrite in full" is satisfied by re-emitting a stale line.**

**FINDING 3 — THE TOC WAS STALE IN THREE SEPARATE WAYS, ALL FROM BATCH 87, AND ONE OF THEM IS THE FILE'S OWN MOST-REPEATED FINDING TURNING ON IT A FIFTH TIME.** Batch 87 added three rows and took the set 159 → 162, but left the census sentence reading **"159 entries indexed"**, left the arithmetic chain ending at **"THE THIRTY-SEVENTH ADDS FOUR: 155 + 4 = 159"**, and **wrote no edition bullet at all** — so the thirty-eighth edition exists in the row set and in the *Basis of this read* prose and nowhere else. All three are repaired at this edition. **The missing bullet is noted FORWARD and NOT back-written (`HK-7`'s shape), and the edition/firing counts are advanced on a STATED assumption** — that batch 87's regeneration was the thirty-eighth edition and its firing the thirty-third — resting on the row set and the Basis prose, not on any sentence batch 87 wrote about itself. If Michael reads the count differently, the correction belongs at the next edition and not in a rewritten history.

**FINDING 4 — `git checkout` SILENTLY FLIPPED THREE FILES TO CRLF, AND THE BYTE COUNTS MOVED WITH THEM.** Mid-batch this runner reverted `session-log.md`, `session-log-toc.md` and `session-log-head.md` to HEAD in order to rewrite them once, in the right order, after BUILD-STATE's displacement set was settled. **They came back CRLF.** `core.autocrlf` is `true` on this machine and there is **no `.gitattributes`** — the condition batch 87 recorded as a hazard for a script it shipped, here striking the record files themselves. The tell was arithmetic and exact: each file grew by **precisely its own line count** — 1,475,660 → 1,485,415 against 9,755 LF; 248,248 → 248,752 against 504; 196,398 → 197,088 against 690. All three were converted back to LF and re-verified byte-identical to their pre-revert sizes, and `git diff --numstat` then reported them blob-identical to HEAD. **The lesson generalises past `git show`, which `CAP-4` already warns about: on this machine a file freshly restored by `git checkout` is not a safe thing to measure, and a runner that reverted-then-measured would have written inflated figures into BUILD-STATE while every command it ran returned success.**

**FINDING 5 — RAISED TO MICHAEL MID-BATCH, RULED BY HIM, AND EXECUTED ON HIS IN-SESSION AUTHORIZATION (`QR-6(e)`).** The review register's Status paragraph carried batch 87's trailing description of the one-time split, ending with **present-tense counts this batch had falsified** — *"this file ⬜ 368, ✅ 11, 🟡 5; the closed register ✅ 116; total ✅ 127"* — against the true post-merge figures of **⬜ 365 / ✅ 11 / 🟡 5 synced and ✅ 119 closed, 130 total**. The packet's §4.4 set the DEFAULT as *leave it as it stands* and invited the runner to say which it did; the runner left it, flagged it, and put the tension to Michael — that a strict reading of `CAP-3` §3.3 item 4 (the paragraph carries its intro sentences and the current reconcile sentence **only**) says the block should go. **His ruling, verbatim from the option set put to him: *"Move it to the closed register now (Recommended)."*** **THE ACT RAN ON THAT AUTHORIZATION AND ON NOTHING ELSE.** It appears in NO routing row and NO Step 4 item, which is exactly what `QR-6(e)` governs, and it **APPLIES `CAP-3` §3.3 as already ruled — it changes no convention and mints no ID.** What ran: the 1,460-byte block was CUT from the synced Status paragraph, which now carries its intro sentence and exactly ONE `Reconciled` sentence, and APPENDED VERBATIM to the RECONCILE HISTORY at the head of the closed register, immediately after batch 87's superseded sentence, so the history reads that sentence followed by its own block. **Conserved and verified before the write: `docs/specs/attorney-review-queue.md` 426,544 → 425,083 B (1,461 out, the extra byte being the separating space); `docs/record/attorney-review-queue-closed.md` 246,483 → 247,945 B (1,462 in, the extra two being the blank-line separator) — so the block text itself is conserved at 1,460 bytes exactly; `first batch under` now counts ZERO in the synced file and ONE in the closed register; no other row, in either file, was touched.** **A SECOND QUESTION WAS PUT AND RULED THE OTHER WAY:** whether to queue the proposal that `CAP-4`'s displaced text should go to an `EVIDENCE` file rather than into a runner line — *"Carry it to the next design packet (Recommended)"*. **NO ROW IS MINTED THIS BATCH AND NO RUNNER BEHAVIOUR CHANGES**; the eleven blocks above stay where `CAP-4` puts them today.

**DISPLACED FROM BUILD-STATE (`CAP-4`)** — the ceiling does not delete text, it moves it here. `CAP-4` bound at **99,971 B before → 99,834 B after**, still exactly 150 non-blank lines. **FIFTEEN paragraphs paid, every one narrative, method or a superseded conditional, and NOT ONE an existence claim.** *(Eleven paid at the first rewrite; four more — [L]–[O] — when the verification pass below sent repairs back into the file and pushed it over the ceiling again.)* Each original follows VERBATIM, named by what it was cut from:

> **[A] — the adjudication and correction series' six structural firsts.** **#98 is the first session to move a registry Status line to VERIFIED**, and it moved twenty-four; **C-2 is the first Code session to decline a `#nn`**, which `TOC-6` has now made the rule; **#100 is the first to move a Status line the OTHER WAY**; **#101 is the first correction entry whose whole subject is a DATE**; **#103 is the first produced by an adversarial audit of a prior session's own output**; **#106 is the first whose ruling had to be folded into a spec a build slice will read before that slice runs.**

> **[B] — the `Q-CAP` click-by-click history and the `/docs/reference/` lever row.** **`Q-CAP-2`'s click DID NOT PAY (`#124`: 91.9% → 92.3% → 92.8%, UP); `Q-CAP-3`'s `/docs/archive/` exclusion DID — `#125`: 1,701,643, 92.8% → 85.1%, ~155K freed. ALL THREE `Q-CAP` ACTS RULED, EXECUTED, VERIFIED.** Its `/docs/reference/` lever row **stays KNOWN-OVERSTATED, untouched**.

> **[C] — the health-trio method lesson.** **THE BASELINE IS THE POINT — a trio run only at the end cannot tell a pre-existing failure from one you just wrote.** **AND THE LESSON HELD AGAIN THIS SESSION: `npm test` was GREEN while `tsc -b` had eight errors** — vitest does not type-check, so a green suite is not a green build, which is why all three run together.

> **[D] — the `RlsProbePanel` replacement wordings.** **`RlsProbePanel.tsx`'s two false privilege sentences are REPAIRED 2026-08-19 (`G10-6` ruled IN, `G10-5` built it)** — signed-out now reads *"anon holds none of the four DML privileges"* (adopted wording); the privilege-wall sentence reads *"The role holds none of the four DML privileges on these tables"* — **that wording is PROPOSED, NOT separately adopted, and Michael's to override.**

> **[E] — the FE-4/FE-5/FE-6 in-session repair.** *(**All THREE of FE-4/FE-5/FE-6 carried the falsified `ALTER DEFAULT PRIVILEGES` claim AND a stale "probe covers 36 tables" — found by this batch's re-derivation, in NO routing row, and REPAIRED on your in-session authorization, FE-4 only after an emphasis-tolerant second sweep caught what the first missed.**)*

> **[F] — gate 1's eleven-backups evidence.** **GATE 1's RATIONALE IS HALF WRONG (dashboard, 2026-08-19): ELEVEN PHYSICAL backups span 12–19 August, BEFORE the Pro purchase, EACH WITH A RESTORE BUTTON. ONE LIMB IS UNCLOSEABLE: whether they were restorable FROM A FREE ACCOUNT on 18 August.** Gate 1 stays closed; the REASON was wrong.

> **[G] — T-30's defeated argument.** **T-30's headline SURVIVED THE AUDIT BUT ITS ARGUMENT DID NOT:** the overlap it relied on is a **GENERAL cardinality property**, **so the argument defeats the three-value column already in the schema, and the PRIOR question — should `privilege_tier` be exhaustive at all? — had never been ruled** (`Q-COM-10-A`, since RULED at #105). **The 192.5(d) over-read is corrected** — the rule's *"For purposes of these rules"* qualifier was dropped (`Q-COM-10-B`).

> **[H] — the TOC's two-numbering-systems detail (its superseded 159/159 figures are repaired, not preserved).** **regenerated every runner batch — 159 rows to 159 entries, `#65`–`#143` GAPLESS.** Its finding: **the log runs TWO independent numbering systems and neither covers every entry** — `#nn` and **runner ordinal** — **eight runner batches carry a `#nn` instead of an ordinal, one carries neither**. **NO ENTRY ANYWHERE CARRIES `#1`** (`TOC-1`).

> **[I] — the `Q-STAT-6` standing drafting direction, in Michael's own words.** and their divergence lists produced a STANDING DRAFTING DIRECTION (#108, your words: *"Why are we making these language changes in the first place instead of simply staying with the actual language of the rules?"*): **registry Rule lines quote operative text VERBATIM where practicable**, condensing only where the rule is too long or the entry states one limb, **flagged as such**.

> **[J] — the three gate-reading traps.** **Gate 2 read alone OVER-BLOCKS** (the 08-11 clarification is load-bearing). **Gate 3 read alone looks satisfiable and is not** — gate 6 is a hard prerequisite and **the dependency is recorded at gate 6, not at gate 3.** **Gate 9's trigger is a different SHAPE** — the others fire on real *data*, gate 9 on *reliance*, **so a checklist ordered by "when does real data arrive" schedules it too late**

> **[K] — the gate-3 in-session authorization quotes.** authorized in session by `Q-G3-1` *"Live Supabase project"* and `Q-G3-2` *"run as written"*; closure appended with FIVE named edges)

> **[L] — the retired-spec candidate breakdown (its "no ruled home" half is answered by `CAP-1`).** `superseded-specs-candidates-2026-08-25.md` (`TC-OPEN-2`, 131 spec files): **NO RULED HOME for a retired spec** — since ruled by **CAP-1**, leaving only the sweep; five clean retire-candidates, six superseded-in-place, **nine repo-resident RAW CAPTURES `TC-8` does not categorize**.

> **[M] — the workbook's staleness sentence, in full.** **THE WORKBOOK IS STALE IN SEVEN IDENTIFIED WAYS AND CARRIES A BANNER SAYING SO (`D-3`).** Its **rows are untouched and deliberately so** — it remains **the numbering authority `V5-IDS` and `Q-T19-1` rest on**. **The staleness is disclosed, not repaired**

> **[N] — the #93 exhibit behind *do not re-run this pass*.** *(Re-confirmed the hard way at #93: a session asserted the pass had never run, wrote a document on that premise, and withdrew it — **do not re-run this pass.**)*

> **[O] — the glob-basis counting trap's worked example.** **SECOND TRAP, CARRIED AND STILL LIVE — THE BASIS IS TWO NAMED FILES, NOT A GLOB.** A `legal-rule-registry*` sum returns **74 / 57 / 12** by folding in `legal-rule-registry-discovery-and-carrier-duties.md` (22, all VERIFIED) and the medical-billing drafts; `registry-new-entry-drafts-2026-08-17.md` carries **six `**Status:** UNVERIFIED` lines of its own** — drafted entry TEXTS, not registry entries — and also matches

**THE HEAD FILE'S CEILING BOUND TOO, AND ITS SHORTFALL IS NAMED IN ITS OWN BANNER.** The `TC-2` rule selected SEVEN entries reaching back to `#143`; the assembled file exceeded the 200 KB ceiling, so whole entries were dropped oldest-first until it fit — **TWO of them, `#143` and the batch-86 runner line** — leaving §1 with FIVE entries reaching back to `#144`. §2 and §3 were never cut: §2 still indexes all **164** entries, so nothing has disappeared from the design side's view of what EXISTS — only those two entries' full text has moved out of its reach, and both are whole and unchanged in the live log. **THE PRESSURE ON §1 IS OVERWHELMINGLY BATCH 87's, NOT THIS BATCH'S — a claim corrected before commit after an adversarial check measured it.** §1's five entries are **batch 88's runner line 18,245 B, `#146` 14,942 B, BATCH 87's RUNNER LINE 113,194 B, `#145` 13,819 B and `#144` 2,700 B**: batch 87's line alone is **6.2×** this one and **over 60%** of §1. **The two ceilings are coupled, and that coupling is the point: every byte `CAP-4` displaces out of BUILD-STATE lands in a runner line, every runner line lands in §1, and a batch that displaces 42,828 bytes (as 87 did) can push two older entries out of the design side's reach two batches later.** **Michael ruled the proposal to send `CAP-4` displacement to an `EVIDENCE` file instead — *"Carry it to the next design packet"* — and these figures are the strongest evidence for it yet measured.**

**THE CLOSE-OUT WAS ADVERSARIALLY VERIFIED BEFORE IT WAS COMMITTED, AND THE VERIFICATION CHANGED THE RECORD (`RR-1`/`PF-1` shape, though `PF-1` itself does not fire on a runner).** Five independent lanes — runner-rule compliance, the §6 DO-NOT list, the two ceilings, the `CAP-3` merge, and the truth of every number asserted — read the uncommitted tree; each finding then went to a separate adjudicator instructed to REFUTE it. **Nine raised, four refuted, FIVE SURVIVED AND ALL FIVE ARE REPAIRED ABOVE.** The five: **(1) HIGH — BUILD-STATE asserted BOTH "37 entries" and "41" about the same probe array**, the 37 being pre-FE-D1 and stale; corrected to 41 on `db/schema.sql`'s 41 `create table` statements plus this file's own recorded test assertion that the probe list stays sequence-identical to it. **(2) MEDIUM — the TOC's *Coverage* section still published 160 headings / 159 entries / 79 numbered `#65`–`#143` / 64 runner ordinals** while the first bullet of the same section, rewritten by this batch, correctly read 164: two irreconcilable answers in adjacent bullets, with the wrong one wearing the *"re-derived here, not carried"* badge. Re-derived and repaired: **165 headings, 164 entries, 82 numbered `#65`–`#146` gapless, 66 runner ordinals 23–88 gapless, 0 unnumbered-runner, 16 other — 82 + 66 + 0 + 16 = 164, buckets disjoint.** **(3) MEDIUM — this runner line claimed its own 18 KB was "the largest single thing in §1"**; batch 87's runner line in the same §1 is **113,194 B, 6.2× larger and over 60% of §1**. Corrected, and the corrected figures are the strongest evidence yet for the very proposal Michael carried forward. **(4) LOW — BUILD-STATE re-emitted "this batch wrote `src/`, `db/` and a migration"**, true of the FE-D1 build batch and false of the batch rewriting the file; reworded. **(5) LOW — the packet's §7 open-items table had not been merged into this entry** as Step 4 item 2 requires; all eleven rows are now carried above. **THE FOUR REFUTED ARE RECORDED TOO, because a refuted finding is evidence the check is not a rubber stamp:** the `CAP-4` banner's "before" figure (arithmetic right, rule reading wrong — the spec's comparison is to the head file's form); the claim that the banner must name each displaced paragraph (the rule is comparative, not an enumeration); the CAP-series preamble said to be stale (it is prose, not a marker-bearing row); and an "unrouted artifact" in the repo root (`CAP-2` scopes CLASS to packet routing rows, not to every file on disk). **AND THE PASS COMMITTED A DO-NOT BREACH OF ITS OWN, REPORTED HERE RATHER THAN BURIED: one verifier READ `src/auth/rlsProbe.ts`**, which the packet's §6 bars in terms (*"Do not read `src/`"*). The instruction reached the fleet — the lane prompts quoted the DO-NOT list — and one agent read it anyway while chasing the 37-vs-41 contradiction. **The finding stands because it is independently provable without that read**, and the correction above is written on the `db/schema.sql` basis alone; but the breach is the runner's to own, since the runner dispatched the fleet. **A DO-NOT binds every agent a session spawns, and saying so in the prompt is evidently not the same as enforcing it.**

**WHAT THIS RUNNER DID NOT DO, EACH BECAUSE A DO-NOT SAYS SO.** It did not build the slice, fire the kickoff prompt, edit that prompt, run `MIG-1` or any migration, read `src/`, mint any ID beyond the ruling's six, create rows for `FE-18`–`FE-22` or `CD-14`, touch `TFI-1`/`TFI-3`, move the twenty-one/fourteen hands-on counts, edit the eleven flagged ✅ parents or the empty section headings, retire any spec, or file the packet's capture and handoff copies anywhere in the repo. `PF-1` did not fire and the skip is stated: this batch carries no legal characterization and no proposed registry entry.

**Staged for Code:** nothing — the next act is Michael's, and it is not this runner's. **Staged for Michael:** open a FRESH Opus Code session and say *"run docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md"*; that session's Step 0 reads his affirmative words in `#146` at HEAD. Then `MIG-1` by hand, unchanged, followed by the amendment migration the build writes — in that order, each pasted alone, **both in the same sitting as the pull and before a live matter is opened**, per the §5 consequence he heard before ruling. **THE PACKET'S §7 OPEN-ITEMS TABLE, MERGED HERE IN FULL so the top of the log stays truthful (Step 4 item 2) — eleven rows, every one Michael's and none closed by this batch:** open the build session (next); **`MIG-1`** by hand, then the amendment migration; **`H12-v`** the vendor route and its limbs, BAA a hard gate; **`CAP-OPEN-1`** the retirement sweep, per file, a typed Fable sitting of its own; **`CAP-OPEN-2`** the eleven ✅ parents with open children — stay or split; **`CAP-OPEN-3`** the emptied section headings, cosmetic; **`CC-1`** the hands-on sitting, 21 accepted plus 14 proposed, worth an hour and better after the slice lands; **`TFI-1` / `TFI-2` / `TFI-3`** — FE-18's operative wording, the §9 header's old name, `CD-14` limb (i), none answered by the mint; **`RF-2`** the master-skeleton hand-in and **`RC-4`** the `CPRC § 18.001` registry candidate, UNVERIFIED; the loose staging folder, the two untracked 2026-08-24 files and the `#137` Voice2 pair's FO/BR/DA home, all carried; and optionally filing the three relocation zips in `Downloads\` where the 2026-08-21 fifteen live. Also his, and still open: whether the two untracked 2026-08-24 audit files in `docs/specs/` belong under `docs/record/` as `CAP-2` would have them — raised, not taken. **Finding 5 is CLOSED by his ruling this session; the `CAP-4`-displacement proposal is CARRIED to the next design packet by his second.**

## 2026-09-02 (#146) — (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the
checkout and on `Downloads`; CLAUDE IN CHROME used for one act; A LATE SITTING — opened 23:42 CDT on the question,
verbatim, "Let's keep moving. Do we need a Fable session or an Opus?", and CROSSED MIDNIGHT CENTRAL, so the ruling
is stamped 2026-09-02 and the packet 2026-09-03: **`FE-D1A-1` RULED YES AS WRITTEN — THE FE-D1 AMENDMENT SLICE IS
BUILD-AUTHORIZED, and `FE-18`, `FE-19`, `FE-20`, `FE-21`, `FE-22` and `CD-14` are MINTED by the same act**; THREE
files left project knowledge by the three-step TRANSIT act — the spent wave-2 sweep doc and the 09-02
capture/handoff pair, 158,626 units = 7.9 points, the meter 83.8% → 75.9%; a capability finding on the Projects
tool's large-file read; nothing built, no migration run, no `src/` read, no registry file touched, no held item
decided, no new ID beyond the six)

The sitting opened on the synced head file and BUILD-STATE (batch 87 landed and synced: runner v13 at HEAD, the
register split, BUILD-STATE under its first byte ceiling, v29 the LIVE instructions — read from the field this
session), **the knowledge meter at 1,675,921 / 2,000,000 = 83.8%** (under the 90% trigger; `Q-CAP-5(a)` did not
fire), and the CC-1 hands-on queue at TWENTY-ONE accepted plus FOURTEEN proposed, unchanged. Then on the bridge:
HEAD `cae00ba` (batch 87), equal to the local origin ref — a bridge read, not a QR-3 pass, though the synced
project already carried batch 87's BUILD-STATE, which is evidence origin has it; `inbox/` holding NO zips (only the
loose 2026-08-31 staging folder, untouched); no `.git/index.lock`; the latest design entry `#145`, so this entry is
`#146` — measured at HEAD, never assumed; the `FE-D1A-1` row ⬜ OPEN by leading-marker read. Every date is Central
(DT-1): the sitting opened 2026-09-02 23:42 CDT, the ruling was made at 23:44 CDT, TRANSIT steps 1–2 ran 23:47–23:5x,
step 3 ran at ~00:02 CDT on 2026-09-03, and packaging followed — so the entry keeps the date its session RAN and
the packet's filename carries the date it was authored. Every ruling was written into a running ledger in the
container within its exchange (the v28 operational note; the ledger is filed as this packet's EVIDENCE), so this
entry is a copy, not a reconstruction.

- **THE ROUTING QUESTION, ANSWERED FROM THE RECORD BEFORE ANY ACT.** Michael, verbatim: *"Let's keep moving. Do we
  need a Fable session or an Opus?"* Answered by act, not by side (MODEL USAGE §7.2): the nearest act that moves
  the program is `FE-D1A-1` — a BUILD AUTHORIZATION, Fable's act — and everything downstream of it is Opus's: the
  batch that files the ruling, the slice build in its own fresh Code session (runner barred), `MIG-1` when he runs
  it, and the hands-on sitting (voice, where Fable does not run). One Opus-grade housekeeping act was ripe on any
  model: the wave-2 sweep doc (147,253 units) was SPENT the moment batch 87 landed the supplement and its
  evidence. **His picks, verbatim from the option sets put (the option texts are Claude's; CC-1(a), the composite
  invited):** next act — *"FE-D1A-1 here, plus TRANSIT (Recommended)"*; the weekly Fable bar, which the running
  model cannot read — *"Mostly unspent"*. The sitting therefore stayed on Fable, and the packet was assembled on
  Fable rather than handed to Opus (the push-to-code skill's offer was made once and declined by the pick).
- **`FE-D1A-1` — PUT AS ONE TEXT, THE §5 CONSEQUENCE HEARD FIRST, AND RULED YES AS WRITTEN.** The question was put
  in the one text that is identical in the slice's §15, the queue row and the kickoff prompt's header: *"Does
  Michael authorize the FE-D1 AMENDMENT SLICE at `docs/specs/fe-d1-amendment-slice.md`, scope IN (§3) and OUT (§4)
  as written, defaults (§10) as named, to be built by a fresh Opus Code session fired from
  `docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md`, the queue runner BARRED, fixture-only, migrations
  written and not run?"* — with §3 (twenty IN items), §4 (the OUT list), §5 and §15 read IN FULL at HEAD `cae00ba`
  over the bridge, and §10 counted (sixty-five defaults). **The consequence the slice's §5 says must be heard
  BEFORE authorizing was quoted to him verbatim:** *"the renamed Supabase adapter selects `facility_party_id`; the
  live database keeps `provider_party_id` until BOTH migrations have run. Between pulling this build and running
  `MIG-1` and then the amendment file, the live app's Medical tab — the bill ledger and the chargemaster memory,
  walked under CL-2 — FAILS on the renamed column. … the designed path is to run `MIG-1` and the amendment file, in
  that order, in the SAME sitting as the pull, before a live matter is opened. A time-boxed dual-read instead is an
  EDIT to this slice, his to make at `FE-D1A-1`."* Claude's read, put with the question: on the record go-live has
  not happened (gate 9 is the one open floor item), so no live matter sits behind that tab yet and the window
  closes when both migrations run in the sitting of the pull; YES as written was recommended, the dual-read edit
  named as buying safety not yet needed at the cost of loosening invariant 14. Three answers were offered — YES as
  written; YES with the time-boxed dual-read EDIT; NO / hold — and the composite invited. **Michael's ruling,
  verbatim, 2026-09-02 23:44 CDT: *"YES — as written (Recommended)"*** — the option text he selected reading
  *"Scope §3/§4, defaults §10, fresh Opus Code session, runner barred, fixture-only, migrations written not run.
  Mints FE-18–FE-22 and CD-14 in the same act."* **EFFECT, on the slice's own terms (§15; `AS-Q13b`): the slice at
  `docs/specs/fe-d1-amendment-slice.md` is BUILD-AUTHORIZED as written, no edit; `FE-18`, `FE-19`, `FE-20`, `FE-21`,
  `FE-22` and `CD-14` are MINTED by this act; the other ten §3 IDs stay proposed; the kickoff prompt's Step 0 test —
  his affirmative words in a session-log entry at HEAD naming the slice document — is satisfied by THIS entry and
  by nothing else.** What the YES does NOT do, each because the slice says so: it neither accepts nor declines the
  fourteen hands-on proposals (`AS-Q14`–`AS-Q17` and the ten default-shaped items — a spec cannot add to the queue
  he accepted at `#139`); it does not answer `TFI-1` (FE-18's operative WORDING — minting the ID does not settle
  which reading its sentence speaks in) or `TFI-3` / `CD-14` limb (i) (where R6's verification state lives — the
  ID is minted, the limb stays open); it runs no migration and touches no live database; it authorizes NO vendor,
  key, endpoint or model name (`H12-v`, the BAA gate); it does not put the slice inside the GL-1 floor.
- **HOW THE BUILD NOW FIRES — sequencing that this entry states so no session infers it.** (1) This packet runs
  through the queue first, because the build session's own Step 0 STOPS on any zip in `inbox/` (MM-1) and because
  its authorization test reads THIS entry at HEAD — so the entry must be at origin, synced or not, before the build
  session opens. (2) Michael opens a FRESH Claude Code session — Opus by default per §7.2; `/usage` first, reading
  stated — and says *"run docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md"*. (3) That session quotes
  his words from this entry, names this entry, and builds fixture-only: migration written, not run. (4) The
  migration RUNS are his hand, `MIG-1` first and unchanged, the amendment file second, each pasted alone with its
  checks answered in words — and, per the §5 consequence he heard, both in the same sitting as the pull, before a
  live matter is opened.
- **THREE FILES LEFT PROJECT KNOWLEDGE BY TRANSIT — steps 1–3 in one sitting, the second time since `#133`
  corrected the actor.** The two-condition check was run at HEAD `cae00ba` for each: the sweep doc's adjudication
  entry is `#144` and batch 87's runner line records the landing, and its content is at
  `docs/record/queue-cleanup-evidence-2026-09-01/wave2_opus_sweep_evidence.md` VERBATIM — 435,976 B, sha256
  `e8c94cbc…d16a82`, identical to the project-knowledge copy (it carried no TRANSIT line, having been born a working
  document; TC-8 makes the condition a property of the content, not of the sentence); the 09-02 pair's entry is
  `#145` and every file its routing table names exists at HEAD (thirteen paths, sizes recorded in the ledger).
  Destination: his machine, by his standing direction of 09-02. Method: the lossless step-1 path — the project
  docs API read in his own Chrome, a STORE zip built in-page with `MANIFEST.json`/`.md` (bytes, sha256, uuid,
  tokens per file), downloaded on a fresh tab's first attempt (which worked, consistent with the 09-02 note),
  permission asked and given first naming file, source and size — *"Yes, download it (Recommended)"*. **Zip:**
  `brennan-case-manager_transit-sweep-doc-and-0902-pair_2026-09-02.zip`, 476,386 B, sha256
  `0a8fba850d21b4a62e5caf98b205a45cd1db30f48ed74bd1ec8756d762916ade`, in `Downloads\`; verified over the bridge —
  size and hash equal to the in-browser figures, `testzip` clean, all three entries byte- and sha256-identical to
  the manifest, and the sweep-doc entry's hash equal to the repo copy's, so three independent sources agree (repo
  file, Projects-tool read, docs API). **Step 3 on his word — *"Go — delete the 3 (Recommended)"* — three
  `project_delete` calls, each `deleted: true`; the meter then read 1,517,295 = 75.9%, a drop of EXACTLY 158,626 =
  the three files' `estimated_token_count` sum (147,253 + 5,633 + 5,740): the unit calibration holds to the unit a
  third time.** Nine project docs remain: the `#137` Voice2 pair (flagged — FO/BR/DA have no design-doc home), the
  acquisition list (live), the form-corpus capture (`TC-9`), README and `probate_system_prompt.md`, the three carried
  files. The relocation manifests are filed as this packet's EVIDENCE, byte-identical to the copies inside the zip
  (sha256 `094460eb…` and `c489b3e5…`). `CAP-CARRY-1` is discharged by this act; `CAP-CARRY-2` by the v29 read.
- **A CAPABILITY FINDING, recorded because it changes the cost of the next relocation:** the Projects tool's
  `project_read` of a LARGE document (above its inline-return threshold, ~30 KB) writes a LOCAL FILE that is
  BYTE-EXACT — proven on the 435,976-byte sweep doc, whose local copy hashed identically to the repo file and to
  the docs API's bytes. That is a second lossless step-1 path, needing no browser, for large captures; small
  documents still return inline (a JSON string, not a file) and keep the Chrome/API path as the lossless method.
  A finding, not a rule; the TRANSIT convention's text is unchanged.
- **WHAT SHIPPED (this packet, docs-only):** this entry; the queue's three-act merge — `FE-D1A-1` annotated
  AUTHORIZED and flipped ⬜ → ✅, its whole block MOVED to the closed register under its Form-engine heading;
  `CAP-CARRY-1` and `CAP-CARRY-2` flipped and moved under a Capacity-pass heading created there; the Status
  paragraph's current sentence replaced and its predecessor appended to the RECONCILE HISTORY; NO new row minted —
  and three EVIDENCE-class files under `docs/record/fe-d1a-1-authorization-2026-09-02/`: the ruling ledger and
  the two relocation manifests. BUILD-STATE's Forms-tab line and header take the slice's §14 item 2 text. **PF-1
  did not fire — this packet carries no legal characterization and no registry entry; the ruling is a build
  authorization and the relocation is housekeeping — recorded so the skip is not silent (the QR-6(f) pattern).**
  **RR-1:** the manifest and both project-knowledge files were re-read against the ruling and the relocation
  figures before the zip closed; nothing authored earlier in the sitting predates a later ruling, because the
  ledger was written inside each exchange.
- **WHAT DID NOT HAPPEN, each because a rule bars it:** nothing built and no build slice run by this packet — the
  queue runner is BARRED from the slice by the ruling's own text; no migration run; no `src/` read; no ID minted
  beyond the six the ruling mints; no registry file opened; no held item decided (the hands-on queue stays at
  twenty-one plus fourteen); the eleven flagged ✅ parents untouched (`CAP-OPEN-2`); the empty section headings
  untouched (`CAP-OPEN-3`); no spec retired (`CAP-OPEN-1` is a sitting of its own — adjudication, per the 09-02
  capture's own routing); the loose staging folder and the two untracked 2026-08-24 files untouched; no scratch
  written to any connected folder; no `git status` run, so no lock stranded. The Chrome tab was closed and its page
  state cleared.
- **PROCESS NOTES.** The Fable-or-Opus question was answered in one exchange from the head file, BUILD-STATE and
  the 09-02 handoff, then the sitting did both acts it named — the queue-and-routing answer and the work are the
  same hour when the bridge and Chrome are already up. The remote-devices bridge dropped and reconnected once,
  between the download trigger and its verification, with no effect on the result. The head file stands at
  196,398 B at HEAD, so the 200 KB ceiling will very likely BIND when this entry and the runner line are prepended
  — the runner drops the oldest whole entries from §1 and NAMES THE SHORTFALL in the banner (TC spec §3); and
  BUILD-STATE is 29 bytes under its 100,000-byte ceiling, so `CAP-4` displacement will bind at this refresh too.

**Next:** the queue runs this packet on `mdb-pllc`; then Michael's hand — `/usage`, a FRESH Opus Code session, *"run
docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md"*; then `MIG-1` and the amendment migration by his hand
in one sitting, before any live matter; the hands-on sitting (twenty-one plus fourteen) is better taken AFTER the
slice lands, because RC-1's five and all fourteen proposals are questions about the generator it builds;
`CAP-OPEN-1` is its own typed Fable sitting.

**Staged for Code:** none beyond this packet. **Awaiting/Returned from Code, unreviewed:** the `FE-D1A-1` closure
and the two `CAP-CARRY` closures in both register files, the evidence directory, and BUILD-STATE's §14-item-2
lines, once landed. **Still open and still Michael's:** opening the build session (his act, after this batch) ·
`MIG-1` and then the amendment migration, in order, his hand · `H12-v` and its limbs · `CAP-OPEN-1`, `CAP-OPEN-2`,
`CAP-OPEN-3` · the hands-on sitting (twenty-one plus fourteen) · `TFI-1`, `TFI-2`, `TFI-3` / `CD-14` limb (i) ·
`RF-2` · `RC-4` · the loose staging folder `inbox/push-to-code_fe-d1-amendment-slice_2026-08-31/` (his hand) · the
two untracked 2026-08-24 files (DO NOTHING) · the `#137` Voice2 pair's FO/BR/DA home · filing the three Downloads
zips wherever he keeps the 2026-08-21 fifteen (optional).

---

## §2 — COMPACT INDEX: every entry in the live log

| date | # | kind | heading (first 90 chars) |
|---|---|---|---|
| 2026-09-03 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-NINTH invocation) — one docs-only packet, and the  |
| 2026-09-03 | #147 | design | (Typed design session, Cowork, Fable 5 per the environment — the SAME chat as `#146`, resu |
| 2026-09-03 | — | code | CODE SESSION (Opus 5, fresh, fired from `docs/prompts/PROMPT-fe-d1-amendment-slice-build-s |
| 2026-09-03 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-EIGHTH invocation) — one docs-only packet, and the |
| 2026-09-02 | #146 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the |
| 2026-09-02 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-SEVENTH invocation) — two docs-only packets, and t |
| 2026-09-02 | #145 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the |
| 2026-09-01 | #144 | design | (Typed design session, Cowork, Fable 5, continuing the same sitting as the |
| 2026-09-01 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-SIXTH invocation) — three docs-only packets in one |
| 2026-09-01 | #143 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED |
| 2026-09-01 | #142 | design | (Typed design session, Cowork, OPUS 5; DEVICE BRIDGE GRANTED: TASK 2 OF THE CHAT-DISPATCH  |
| 2026-09-01 | #141 | design | (Typed design session, Cowork, OPUS 5 per the environment; DEVICE BRIDGE GRANTED on the ch |
| 2026-09-01 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-FIFTH invocation) — one docs-only packet: the FE-D |
| 2026-08-31 | #140 | design | (Typed design session, Cowork, Fable 5 per the environment; DEVICE BRIDGE GRANTED on the c |
| 2026-08-31 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-FOURTH invocation) — one docs-only packet, eleven  |
| 2026-08-31 | #139 | design | (Typed design session, Cowork, Fable 5 — the model per the environment line after Michael' |
| 2026-08-31 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-THIRD invocation) — one docs-only packet, and four |
| 2026-08-25 | #138 | design | (Typed design session, Cowork, Opus 5, DEVICE BRIDGE GRANTED: RECON-1 DISCHARGED — |
| 2026-08-23 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-SECOND invocation) — one docs-only packet, ONE rou |
| 2026-08-22 | #137 | design | (Voice design session finished in typed mode, Opus 5: the disclosures |
| 2026-08-22 | #136 | design | (Typed design session, Fable 5: disclosures REQ-CAPTURE verified ABSENT |
| 2026-08-22 | #135 | design | (Voice design session, Opus 5: RECON-1 floor ruled — three mandatory |
| 2026-08-22 | — | runner | QUEUE-RUNNER batch (runner line; EIGHTY-FIRST invocation) — one docs-only packet, TWO rout |
| 2026-08-22 | #134 | design | THE BACKFILL: five unfiled design sessions put on the record, an H-series collision found  |
| 2026-08-22 | #133 | design | CORRECTION ENTRY, SIX PARTS: the log's entry count, the picker-order rule's first origin e |
| 2026-08-21 | #131 | design | Design, VOICE, Opus 5: disclosures ruling session — H20-a/H20-b ruled, FE-19 moved upstrea |
| 2026-08-21 | #130 | design | Design, VOICE, Opus 5: H12 REVERSED — app calls the model on a BAA-covered account; H20, H |
| 2026-08-21 | #129 | design | TWO RULINGS THAT SHRINK THE SLICE: the unrun FE-D1 migration runs UNCHANGED after its stat |
| 2026-08-21 | #128 | design | Design, voice walkthrough, Opus 5: disclosures expert-designation walk; Medical-tab defect |
| 2026-08-20 | #127 | design | THE DISCLOSURES REQ-CAPTURE RECONCILED: the facility-as-expert defect traced to three plac |
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

## §3 — POINTERS: what exists that this file cannot carry

Three files hold the rest of the session-log record. **All three are BRIDGE-ONLY** — they live under
`docs/record/` or `docs/archive/`, which are tracked in the repo but EXCLUDED from the design-side
sync picker (`TC-4`, ruled 2026-08-21). A design-side session cannot retrieve them; they are reached
over the device bridge or by a Code session.

- **`docs/record/session-log.md`** — THE LIVE LOG. Append-only, canonical, unbounded. **Where this
  file and the log disagree, the log at HEAD is right and this file is stale.**
- **`docs/record/session-log-toc.md`** — THE FULL ABSTRACT INDEX. One dense summary row per entry,
  with a corrections-issued/received column. This is where to learn what an entry *said* without
  reading it.
- **`docs/archive/session-log-archive-2026-07-21_2026-08-12.md`** — THE CLOSED ARCHIVE: every entry
  older than the 2026-08-13 cutoff (`#2`–`#64`, runner ordinals 5–22, and one ordinal-less runner
  line), with its own frozen index. Never regenerated, never added to.

**Their absence from design-side retrieval is BY DESIGN and is never evidence of absence.**
