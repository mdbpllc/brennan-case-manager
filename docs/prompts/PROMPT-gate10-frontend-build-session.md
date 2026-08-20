# PROMPT — Gate 10 FRONT-END Build Session

**Canonical repo path (PROPOSED):** `docs/prompts/PROMPT-gate10-frontend-build-session.md`
**Authored:** 2026-08-19 Central, design session (Cowork, Opus 5), CHAT-DISPATCH v5 task T3,
against repo state `beb27f4`.

> ## THIS PROMPT FIRES ONLY ON MICHAEL'S `G10-5` AUTHORIZATION, RECORDED IN THE SESSION LOG.
>
> **The prompt existing authorizes nothing.** `G10-5` — *"Does Michael authorize gate 10's FRONT-END
> half?"* — is an **OPEN** row in `docs/specs/attorney-review-queue.md`. The slice it points at is
> **PROPOSED, NOT BUILD AUTHORIZED**, and says so on its own face.
>
> **If you are reading this and `G10-5` has not been ruled AFFIRMATIVELY: STOP. Do not build. Tell
> Michael the prompt is staged and waiting on his ruling.** This is the `#115` pattern — a kickoff
> prompt is written ahead of the authorization so that authorizing becomes ONE act, not two.
>
> **THE TEST IS "RULED YES," NOT "RULED."** `G10-5` asks *"Does Michael authorize gate 10's
> FRONT-END half?"* — **a yes/no question, and a ruling of NO satisfies "is ruled" while forbidding
> everything below.** A first draft of this prompt tested only that the row had been ruled; that was
> the wrong predicate and is corrected here.
>
> **Check it yourself rather than trusting this line, and know what each check can and cannot
> establish** (QR-6(a)): reading the `G10-5` row at HEAD, an **open glyph (⬜) DISCONFIRMS** — it has
> not fired. **A closed glyph (✅) does NOT confirm**, because the queue marks deferred and
> ruled-negative items closed too — `O-12` sits in that file ⬜ and DEFERRED, and a ruled-no would
> close. **Only the session-log entry recording his affirmative words establishes it.** Find that
> entry, quote his words into your own entry, and name the entry you found them in. **If you cannot
> find them, you do not have the authorization — ask him.**

**What this is:** the kickoff prompt for gate 10's front-end half. It is a **POINTER, not a spec
copy** (QR-2 principle): every scope statement lives in the authorities read at Step 1. **If
anything here conflicts with those docs at HEAD, the docs win and this prompt gets a correction.**

Michael: once `G10-5` is ruled and recorded, open a fresh Claude Code session (Opus by default per
the standing model routing; check `/usage` first and state the reading), then say
"run docs/prompts/PROMPT-gate10-frontend-build-session.md".

**Sequencing.** The schema half is BUILT, RUN AND VERIFIED LIVE (2026-08-19). **This slice should
land BEFORE gate 3's write-path test** where the ordering is free — it changes the party read and
write paths, and testing them twice is waste. It does **not** block gate 3, and gate 3 does not
block it. Neither is a prerequisite of the other; if they collide, Michael picks.

---

You are running **gate 10's FRONT-END half** for brennan-case-manager. The schema half is done and
live; **the exclusion limb is delivered IN THE SCHEMA and IS NOT YET IN EFFECT IN THE APP.** Today
the party form still writes SSN and licence numbers into `parties.fields`, and every party read
returns them. **This slice is the named next act on the gate; the gate does not close without it.**

**This is a go-live gate and it sits AHEAD of `GL-1`'s floor.** Its trigger is *before the first real
client record enters the database*. It is cheap right now **only because `parties.fields` holds
nothing real** — the migration's pre-flight returned zero rows on 2026-08-19. After go-live the
identical change is a migration over privileged records.

## Step 0 — Checkout gate (QR-3 pattern) + MM-1 bar

`git fetch origin`, then confirm: **clean working tree, on `master`, HEAD == `origin/master`.**
Behind-but-clean fast-forwards and continues. **Dirty, diverged, off-master, or AHEAD of origin
STOPS — tell Michael.** Verify with commands that could disconfirm (QR-6(a)): a local tracking-ref
read is **not** evidence about origin — use `git ls-remote origin refs/heads/master`.

Then check `inbox/`: **if any packet zip is present, STOP — the queue runs first (MM-1), and this
build session never doubles as the queue runner.**

**Also confirm, and record, that `G10-5` is RULED AFFIRMATIVELY — quoting Michael's own words and
naming the session-log entry they appear in** (see the header box: a glyph cannot establish this,
only disconfirm it). **If you cannot produce that quotation and that entry, this session ends here
and you say so.**

## Step 1 — Read, in this order, all at HEAD

1. **`docs/specs/gate10-pii-frontend-slice.md` — IN FULL. This is the authority.** All of it,
   including §6 (what this slice does NOT deliver) and §7 (the build checklist, which is your work
   list). Its §1 records the `G10-3` `src/` read as of `f5e4ab4` and says in terms that **the design
   session did not re-verify it** — **you are the session that can, and you should, because `src/`
   has moved since** (see Step 2).
2. **`docs/specs/gate10-pii-slice.md` §6** — the schema half's considered-and-not-adopted list.
   **§6 is a list of rules in disguise: every row is something already rejected, and "improving" the
   design into one of them is the failure mode this step exists to prevent. It binds this half
   identically**, by the front-end slice's own §6.
3. **`docs/specs/BUILD-STATE.md`** — current state. **Note it is at the 150-non-blank cap.**
4. **`CLAUDE.md`** — binding build conventions.

*(Read `Go_Live_Gates.md` gate 10 if you want the gate's own words; it is not edited by this
session and is append-only, design-space canonical.)*

## Step 2 — Re-verify §1 against `src/` at YOUR HEAD before building on it

The slice's §1 line numbers are **the build session's read at `f5e4ab4`**, quoted into a design
document that could not check them. **`src/` is not synced to the design side, so nobody has
re-read them since.** Confirm each before you rely on it, and **report any that moved** — the field
declarations in `src/domain/partyRegistry.ts`, the unfiltered render in
`src/pages/PartyFormPage.tsx`, the OAA importer's `dob` write, the two demo-seed `dob` values, and
the three `select('*')` party reads in the Supabase adapter.

**A line number that has drifted is a correction to make, not a reason to stop.** A *fact* that has
changed — a field no longer declared, a read no longer `select('*')` — **is** a stop: report it and
put it to Michael, because the slice was specified against it.

## Step 3 — The work list is the slice's §7, items 1–8

Build them in that order. §7 is the authority on each; the notes below are the only places this
prompt adds anything.

- **§7.1–§7.3 (registry destinations, save-path routing, adapter).** The write-guard in §2 is
  **belt and braces on purpose** — strip the four keys from every `fields` write *whatever the UI
  hands over*. **Build the guard even where you believe no caller can reach it**; that is what it
  is for.
- **§7.4 (visibility).** §4 is **RULED, 2026-08-19**: masked everywhere by default, explicit
  per-view reveal, **NO reveal logging in this slice.** Do not add a log, a counter, or a
  timestamp of a reveal — see the DO-NOT list.
- **§7.5 (the pre-flip report).** See Step 4 below — it has its own step because it has a STOP.
- **§7.6 (the probe panel).** See Step 5 — it has an open question attached.
- **§7.7 (tests).** All five named: registry destination routing, the write-guard (**a `fields`
  object carrying `ssn` never persists it**), adapter parity in both modes, masked-by-default
  rendering, probe-panel text.
- **§7.8 (close-out).** See "Before you end the session."

## Step 4 — Re-run the §5 report IMMEDIATELY BEFORE the write path flips — STOP AND FLAG

**Not at the start of the session. Immediately before the flip.** The migration's pre-flight found
zero rows on 2026-08-19, **and the app has been free to write those keys every day since.** A report
run at Step 1 and trusted at Step 8 is a claim about the past.

Run **both key lists, labelled**, exactly as the schema slice's §5 defines them:
- **the ruled eight** — carried **verbatim**, extracted from the spec by program, never retyped; and
- **the four as-built keys** — `dob`, `ssn`, `dlNumber`, `dlState` — marked as the build session's
  addition on evidence.

*(The distinction is load-bearing: on the ruled list alone, **a stored driver's licence number would
have come back CLEAN** — none of its four licence guesses matches `dlNumber` or `dlState`. That is
the schema slice's stated heuristic limit turning out to be real on first contact.)*

**Expect zero. IF ANY ROW RETURNS: STOP.** Report the keys found and the row count, **do not move
the values, do not delete them, do not build past it.** Moving a value between homes is a decision
and it is Michael's — the CD-1 roster-flag precedent and the gate-10 pre-flight's own rule.

## Step 5 — The probe panel, and the open question you must not resolve yourself

**§7 item 6 directs one repair:** `src/components/RlsProbePanel.tsx:73` — the signed-out message
becomes the **adopted wording, 2026-08-19**: *"anon holds none of the four DML privileges"*. It must
not say *"granted nothing."*

**THERE IS A SECOND FALSE SENTENCE IN THE SAME RENDERED PARAGRAPH, AND §7 ITEM 6 DOES NOT NAME IT.**
Two lines above, the same `<p className="notice bad">` block renders **"The role has no SQL privilege
on these tables."** That is false in the same way and for the same reason — **`anon` holds
`TRUNCATE`, `REFERENCES`, `TRIGGER` and `MAINTAIN` on all 37 tables**, just none of the four DML
privileges. It is **out of pattern for every `anon`-anchored sweep**, which is why it was found by
reading rather than by grep (task C1, 2026-08-19).

**WHETHER THE SLICE'S §7 ITEM 6 GROWS TO COVER IT IS OPEN AND IS MICHAEL'S.** *(Naming: it is the
**slice's** item 6. `G10-5` is a single yes/no queue row and has no items — a first draft of this
prompt wrote "`G10-5` item 6" in one breath and "§7 item 6" in the next. BUILD-STATE has it right.)*

**HOW TO KNOW WHICH BRANCH YOU ARE ON — and if you cannot tell, you are on the second:**

- **RULED IN** means Michael's words to that effect appear in a session-log entry, or the slice's
  §7 item 6 at HEAD has itself been amended to name the second sentence. **Quote what you found and
  name where.** Then repair **both** sentences.
- **OTHERWISE** — including if you simply cannot find a ruling — repair **only** the sentence §7
  item 6 names, and **report, in the session entry and to him in session, that the paragraph still
  renders a false sentence two lines above the one you just fixed.** As the slice stands, **this
  build repairs one false sentence and leaves the other on the screen.**
- **Do not resolve it on your own read.** Do not "improve" the paragraph. Reporting it is the act.

*(Locate both sentences BY THEIR TEXT. Line numbers drift, and `src/` is not append-only — citing
`:73` or `:70–71` into your session entry would freeze a wrong number into an append-only file.)*

## Step 6 — Health check

**Run it.** This batch touches `src/`, so `QR-6(f)`'s skip limb does not apply — **a build session
never takes it.** Report all three figures (`npm test` / `npm run build` / `npm run lint`), and
**read the exit codes off `npm` itself, never through a pipe** — a piped read reports the pipe's
status, which has already been measured wrong once here.

---

## DO NOT

- **Do not build any reveal log**, counter, or reveal timestamp. §4 is RULED: **no log in this
  slice.** Reveal logging is audit machinery and rides **`O-1`**, for the same reason `G10-1` went
  provenance-only — building it here decides part of `O-1` by implementation.
- **Do not add column-level `REVOKE`s.** They break the app while `authenticated` is the only role;
  that work belongs with **gate 2**.
- **Do not backfill anything out of `fields`.** No data migration is specified or authorized by the
  slice. Report only (Step 4).
- **Do not widen `anon`.** It holds none of the four DML privileges, and nothing here changes that.
- **Do not run any migration, and do not connect to the database.** This slice needs neither. If you
  think it does, stop and say so.
- **Do not re-flatten the DOB / SSN split.** `dob` is an ordinary typed column on `parties`, read
  constantly and riding every party read **by design**; `ssn`/`dlNumber`/`dlState` live in the child
  table and are fetched on demand. **The slice's §2 keeps that split deliberately, in both
  directions.**
- **Do not join `party_pii` into any list read**, ever (§3).
- **The schema slice's §6 rejected designs all remain rejected here**, restated so none is
  reintroduced by "improvement": **no `CHECK` on SSN format** (ITINs); **no separate `party_pii.id`**
  (the PK-is-FK shape makes two PII rows per contact unrepresentable); **no last-4 instead of full
  SSN** (full SSN ruled 2026-08-19); **no encryption**; **no DOB in the child table**.
- **Do not touch `case_clients`, `case_parties`, `case_roster_flags` or `contact_edges`**, or
  anything else CL-2/CD-1 walked.
- **Do not edit `docs/specs/Go_Live_Gates.md`** — append-only and design-space canonical. **Do not
  mark gate 10 closed**: whether it closes is a ruling, not a build result.
- **Do not resolve `G10-2`, `G10-4`, `O-1`, `O-11` or `O-12`.** All open, all Michael's.
- **Do not double as the queue runner** (Step 0).
- **Do not mint an `#nn`.** Per TOC-6 the `#nn` series is DESIGN-ONLY.

## Before you end the session

1. **Append a session-log entry.** **Per TOC-6, Code sessions never mint `#nn` — leave it
   unnumbered.** Record the Step 4 report result, the Step 2 re-verification deltas, and the Step 5
   second-sentence disposition **in terms**.
2. **Rewrite `docs/specs/BUILD-STATE.md` in full.** **It is at the 150-non-blank cap: displace, do
   not append.** Preserve the anti-resurrection-ledger pointer. **Recompute every count from the
   files at HEAD — never copy a figure from this prompt or from a packet** (OPEN-5(a)). Record that
   gate 10's exclusion limb is **now in effect in the app**, and that **the audit limb is still
   explicitly owed to `O-1`** — do not let gate 10 read as having delivered auditability.
3. **Regenerate `docs/specs/session-log-toc.md`** in full over the log (`TOC-4`) — regenerate, never
   append.
4. **Push, and VERIFY with a bare `git ls-remote origin refs/heads/master`.** Never report "pushed"
   from an unchecked command. **An allowlist entry is necessary, not sufficient** — the auto-mode
   classifier has refused an allowlisted bare `git push` before, on both shells, and a close-out can
   strand between the commit and the push. **Your log entry may assert no post-commit action**
   (QR-5(a)): the entry is committed before the push happens, so report the push result to Michael
   in session and carry it forward if it fails.
5. Tell Michael in one line: **"Pushed at `<sha>` — click Sync now on the repo in the Claude
   project."**
6. **Then tell him what is still open on this gate**: whether gate 10 closes; the `RlsProbePanel`
   second sentence if it was not ruled in; and that `O-1`, `G10-2` and `G10-4` are untouched.
