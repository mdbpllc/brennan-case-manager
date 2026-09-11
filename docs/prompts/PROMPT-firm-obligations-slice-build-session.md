# PROMPT — FIRM-OBLIGATIONS SLICE Build Session

**Canonical repo path:** `docs/prompts/PROMPT-firm-obligations-slice-build-session.md` (CAP-2 class: RULING — a prompt in force under Q-2)

**Authored:** 2026-09-10 Central, design session (Cowork, Fable 5.1; device bridge on the checkout via staged read-only copies), against repo state `357ca8e`. Filed by the packet that carries the slice and the `#155` authorization; fires on that entry at HEAD.

> ## THIS PROMPT FIRES ONLY ON MICHAEL'S `FOS-1` AUTHORIZATION, RECORDED IN THE SESSION LOG.
>
> **The prompt existing authorizes nothing.** `FOS-1` — *"Does Michael authorize the FIRM-OBLIGATIONS BUILD SLICE at `docs/specs/firm-obligations-build-slice.md`, scope IN (§3) and OUT (§4) as written, the weekend rule as synthesized in §2.3, defaults (§6, `FOD-20`–`FOD-33`, and `FOD-1`–`FOD-19` as amended) as named, to be built by a fresh Opus Code session fired from `docs/prompts/PROMPT-firm-obligations-slice-build-session.md`, the queue runner BARRED, fixture-only in demo mode, the one migration written and not run — with `FOD-20` (the `cancelled` value in the `review_log` CHECK) IN?"* (one text, identical in the slice's §11, the queue row and here). **RULED by Michael 2026-09-10 — his words are in session-log entry `#155` and in `docs/specs/firm-obligations-rulings-2026-09-10.md` §3, with the limbs as put.**
>
> **If you are reading this and cannot find `FOS-1` ruled AFFIRMATIVELY at HEAD: STOP. Do not build. Tell Michael the `#155` packet has not run.**
>
> **THE TEST IS "RULED YES," NOT "RULED."** Reading the `FOS-1` row at HEAD, an **open glyph (⬜) DISCONFIRMS**; a **closed glyph (✅) does NOT confirm** — the register closes deferred and ruled-negative items too. **Only a session-log entry at HEAD recording Michael's affirmative words, naming the slice document, establishes it** (QR-6(a)). Find that entry in `docs/record/session-log.md`, quote his words into your own entry, name the entry, **and confirm from the same entry whether `FOD-20` is IN or OUT** — it decides whether the `review_log` CHECK takes ten values or nine. **If you cannot produce that quotation and that entry, you do not have the authorization — this session ends here and you say so.**

**What this is:** the kickoff prompt for the slice that turns the eleven decisions and fifteen findings of 2026-09-10 (`#155`) — on the three rulings of 2026-08-22 (`#137`: `FO-1`, `FO-2`, `FO-3`) — into product. It is a **POINTER, not a spec copy** (QR-2 principle): every scope statement lives in the slice read at Step 1. **If anything here conflicts with those documents at HEAD, the documents win and this prompt gets a correction.**

Michael: once `FOS-1` is ruled YES and recorded at HEAD, open a fresh Claude Code session (Opus by default per the standing model routing; check `/usage` first and state the reading), then say "run docs/prompts/PROMPT-firm-obligations-slice-build-session.md".

**Sequencing.** Every prior migration has RUN on the live database (the last: the two `CCS-1` files, 2026-09-07, `#150`). This build WRITES one migration file and RUNS it nowhere; it is exercised in demo mode on fixtures. Nothing here connects to the live database. **This module carries no client data and sits OUTSIDE the GL-1 floor; go-live is untouched by it.**

---

You are running the **FIRM-OBLIGATIONS SLICE build** for brennan-case-manager. On 2026-08-22 Michael ruled that the software carries firm-level recurring obligations that stay lit until done, thin by default; on 2026-09-10 he ruled the module's eleven design decisions and fifteen rendered-mock findings one at a time. **This slice builds the module, fixture-only, and writes one migration it does not run.**

## Step 0 — Checkout gate (QR-3 pattern) + MM-1 bar + the authorization

`git fetch origin`, then confirm: **clean working tree, on `master`, HEAD == `origin/master`.** Behind-but-clean fast-forwards and continues. **Dirty, diverged, off-master, or AHEAD of origin STOPS — tell Michael.** Verify with commands that could disconfirm (QR-6(a)): `git ls-remote origin refs/heads/master`, never the local tracking ref alone. Three untracked paths are known and are Michael's — `Claude outputs/`, `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md` — DO NOTHING to them.

Then check `inbox/`: **if any packet zip is present, STOP — the queue runs first (MM-1), and this build session never doubles as the queue runner.**

**Then confirm, and record, that `FOS-1` is RULED AFFIRMATIVELY — quoting Michael's own words, naming the session-log entry, and confirming `FOD-20` IN or OUT from it** (the header box).

## Step 1 — Read, in this order, all at HEAD

1. **`docs/specs/firm-obligations-build-slice.md` — IN FULL.** §0 (the four provenance classes), §1 (the state it was specified against — re-verify at Step 2), §2.1–§2.2 (the decisions and findings as a pointer table — READ THE RECORD IT POINTS AT), **§2.3 (the weekend rule, Michael's composite, and the three-state synthesis he confirmed)**, §3–§4 (IN / OUT), §5 (the two tables, the migration, the CHECK widening), **§6 (the named defaults `FOD-20`–`FOD-33`, and the amendments to `FOD-1`–`FOD-19` — build each exactly as named and report each you took, by number)**, §7 (the tests you owe), **§8 (DO NOT — read it twice)**, §9 (your ordered work list), §10, §11.
2. **`docs/specs/firm-obligations-rulings-2026-09-10.md` — IN FULL.** The record of DECISION 0–10 and `FOM-1`–`FOM-15` in Michael's words, and the `FOS-1` limbs.
3. **`docs/specs/firm-obligations-module-spec.md`** — §2, §3, §4, §5, §7 (the catalog you seed — copy every Source cell string byte-for-byte), §10, §12, **and §16 (the amendments the sitting made; where §16 and an earlier section disagree, §16 governs)**.
4. **`docs/specs/firm-obligations-rendered-examples-2026-09-08.md`** §2–§4 — what the mock showed for each decision; the mock at `docs/record/firm-obligations-design-2026-09-07/firm-obligations-mock-2026-09-08.html` is a rendered AID and NOT product code — read its `mock-source-2026-09-08/` domain logic only to compare edge cases; never copy it in.
5. **`docs/record/firm-obligations-sitting-2026-09-10/voice2-definitions-carried-2026-09-10.md`** — `FO-1`, `FO-2`, `FO-3` in his words.
6. **`docs/specs/BUILD-STATE.md`** — in full; the sole authority on what is built. It is under a 150-non-blank cap AND a 100,000-byte ceiling (`CAP-4`).
7. **`CLAUDE.md`** — binding build conventions.
8. **`docs/specs/anti-resurrection-ledger.md`** — check before building anything that appears absent.
9. **`db/migrations/2026-09-03-fe-d1-amendment-fix.sql`** (the catalog-lookup CHECK drop you copy for `review_log.action`) and **`db/migrations/2026-09-07-address-model-schema.sql`** (the shape: the gate first, what-this-does-not-do, checks at the foot answered in words); **`db/migrations/2026-08-12-cd1-contact-directory.sql`** (a table-creating migration with RLS, policy, GRANT and probe entry in one commit).
10. **`src/outlook/graph.ts`** and **`src/outlook/config.ts`** whole (`toGraphEvent`, the calendar find-or-create, `MATTER_PROP_ID`, `OUTLOOK_CALENDAR_NAME`); **`src/components/WorklistCard.tsx`** (the compact-card precedent the dashboard card follows); **`src/domain/billing.ts`** (`ReviewLogEntry`); the local adapter's store migration chain (the literal-pinned steps up to 16).

## Step 2 — Re-verify the slice's premises at YOUR HEAD before building on them

The slice's `src/` and `db/` statements were read from staged copies at `357ca8e` by a design session; **you are the session that builds on them, and you re-verify each before you do:** `calendar_events.case_id` NOT NULL; no `/firm` or `/calendar` route in `src/App.tsx`; `review_log.action`'s six-value CHECK and the absence of any widening migration; `toGraphEvent`'s signature and the calendar helper; `STORE_VERSION` (16) and the pinned literals; `SCHEMA_TABLES` (46) and its sequence test; `appendReviewLog` on both adapters; the `WorklistCard` compact rendering rule ("renders nothing when there's nothing to do"); `CalendarTab.tsx`'s `action: 'cancelled'` write. **Record every delta in your entry; a delta that changes what a ruling means is a STOP to report, not a substitution.**

**Also run the baseline health trio BEFORE any change** (`npm test` / `npm run build` / `npm run lint`, exit codes read off `npm` itself, never through a pipe). **EXPECT GREEN** — 746/746 across 48 files per BUILD-STATE at HEAD; build 0, lint 0 and `tsc -b` 0 per the unnumbered `CCS-1` build entry in `docs/record/session-log.md` (2026-09-07) — all carried from `ea5675b`; measure them. **A red is a stop to report before you write a line.** And `npx tsc -b` — vitest does not type-check in this repo, so a green suite is not a green build.

## Step 3 — The work list is the slice's §9, items 1–12, in that order

Three of them are the shape of this build and are restated so they cannot be missed:

- **The weekend rule is three states, and `unknown` is the seed value everywhere** (§2.3). A roll is displayed only where the obligation's own `weekendRule` says so. **Under `unknown`, a weekend-dated occurrence never prints "overdue" or a day count.** No holiday is computed, no holiday list ships. If you find yourself writing a holiday table or inferring a roll from a source note, stop — that is the roll-defaults ruling's ruled-out shape.
- **Nothing unlights an occurrence but Done, Not-applicable (conditional rows only) and Undo.** No snooze, no later, no dismiss, no bulk action, no delete. Retire closes nothing.
- **Every text act is a PROVISIONAL string with its `FOD-n` cite beside it in code**, listed in your entry, never described as approved.

## Step 4 — Defaults are reported, not hidden

Every `FOD-n` you build is a decision the record did not make and the design session named so you would not make it silently. **Your session-log entry lists every default taken, by number** (`FOD-20`–`FOD-33`, and `FOD-1`–`FOD-19` as amended), and any default you found you could not build as named is a STOP to report, not a substitution.

## Step 5 — The `FOM-8` live check

With Michael's connected Outlook (demo mode, his consent already in place for `Calendars.ReadWrite`), push ONE throwaway all-day event to the `MDBP Firm` calendar with `reminderMinutesBeforeStart` of 43,200 (30 days) and one with 259,200 (180 days); confirm Graph accepts them and that the reminder surfaces in Outlook (Michael's eye — ask him in one line each); delete both. **Record the result.** If the long reminder is NOT honoured, build the slice's fallback (a second all-day "Lights today" event on the `lightsOn` day — the lead day) and say which path landed. If Michael is not present for the eye check, record the Graph acceptance only and mark the surfacing UNVERIFIED.

## Step 6 — Health check

**Run it.** This build touches `src/`, `db/` and a migration file, so `QR-6(f)`'s skip limb does not apply — **a build session never takes it.** Report all three figures plus `tsc -b` against the Step 2 baseline.

---

## DO NOT

The slice's §8 is the DO-NOT list and binds in full. Restated so it cannot be missed:

- **Do not build a snooze, a "later", a dismiss, a bulk action, or a delete on any obligation or occurrence.**
- **Do not compute a holiday; do not ship a holiday list; do not set any template's `weekendRule` to anything but `unknown`.**
- **Do not print "overdue" or a day count on a weekend-dated occurrence whose `weekendRule` is `unknown`.**
- **Do not draft or insert a registry entry; do not create `legal-rule-registry-firm-obligations.md`; do not reword a SPEC §7 cite string.**
- **Do not add a money field, `externalRef`, `ledgerRef`, or a QuickBooks reference.**
- **Do not add an assignee, a delegated marker, a fan-out, or an owner badge at the solo stage.**
- **Do not request `Tasks.ReadWrite` or any consent; do not build a To Do task.**
- **Do not put a firm occurrence on any case's Calendar tab; do not build a firm-wide calendar page.**
- **Do not touch `calendar_events`, `cases`, or any matter table; do not change `toGraphEvent`'s case path — the firm variant is a sibling.**
- **Do not fix the Outlook first-edit duplication defect.**
- **Do not run the migration; do not connect to any database; do not amend a migration that has run.**
- **Do not seed anything active in Supabase mode; do not enter, guess or infer a real date or fact about the firm.**
- **Do not wire a vendor or call a model.**
- **Do not edit `docs/specs/firm-obligations-module-spec.md`, the ruling sheet, the rulings record, the companion, `Go_Live_Gates.md`, or any spec in `docs/specs/`** (`BUILD-STATE.md` excepted); spec problems go to `docs/spec-feedback.md` as a new dated section (that file is CRLF — re-measure by a raw bytes read).
- **Do not regenerate `docs/record/session-log-toc.md`** (TOC-4's trigger is a queue-runner batch); **do not write to `docs/specs/session-log-head.md`** (TC-5).
- **Do not mint an `#nn`** (TOC-6), **any queue row, or any ID.**
- **Do not double as the queue runner** (Step 0).
- **Do not read "walked" as "live."** Fixture-only in demo mode; outside the GL-1 floor.

## Before you end the session

1. **Prepend a session-log entry at the TOP of `docs/record/session-log.md`** (the live log — `docs/record/`, since TC-4). **Per TOC-6, Code sessions never mint `#nn` — leave it unnumbered.** Record: the authorization entry you quoted and `FOD-20`'s IN/OUT; the Step 2 deltas; the baseline; every `FOD-n` taken, by number; every text act drafted, marked PROVISIONAL; the migration WRITTEN AND NOT RUN with its gate and its foot checks; the `FOM-8` result; the fixture-only posture; the health figures before and after; the click-through's findings.
2. **Rewrite `docs/specs/BUILD-STATE.md` in full** under BS-1a (150 non-blank) AND `CAP-4` (100,000 bytes by `wc -c` on the working tree — measure AFTER your last edit, because the banner's own figure changes the figure). Displace verbatim into your entry under `DISPLACED FROM BUILD-STATE (CAP-4)` and name the shortfall in the banner. Preserve the anti-resurrection-ledger pointer. **Recompute every count from the files at HEAD — never copy a figure from this prompt or from the slice** (OPEN-5(a)). Say what the slice's §10 item 2 says, in your own measured terms; the header reads **"ONE migration WRITTEN AND NOT RUN"** and names it.
3. **Do NOT regenerate `docs/record/session-log-toc.md`; do not write to `docs/specs/session-log-head.md`.** The next batch's census detects the unindexed entry by design, and your entry says so.
4. **Push, and VERIFY with a bare `git ls-remote origin refs/heads/master`.** Never report "pushed" from an unchecked command. **An allowlist entry is necessary, not sufficient** — the auto-mode classifier has refused an allowlisted bare `git push` before. **Your log entry may assert no post-commit action** (QR-5(a)); report the push result to Michael in session; a stranded push is his hand.
5. Tell Michael in one line: **"Pushed at `<sha>` — click Sync now on the repo in the Claude project."** Or: "Committed at `<sha>`, NOT pushed — push by hand."
6. **Then tell him what is still his:** run the migration, pasted alone after a backup, checks answered in words; the FIRM-OBLIGATIONS HANDS-ON SITTING at the demo app (the text acts, the card's position and wording, the register's affordances, Outlook keep-vs-delete, the leads — and his real activations with his real dates after it); the registry drafting act for DECISION 8 (an Opus design session, PF-1 running on it); the acquisitions from DECISION 9A.
