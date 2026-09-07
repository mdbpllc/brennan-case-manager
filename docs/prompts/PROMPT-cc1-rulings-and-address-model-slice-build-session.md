# PROMPT — CC-1 RULINGS AND ADDRESS-MODEL SLICE Build Session

**Canonical repo path:** `docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md` (CAP-2 class: RULING — a prompt in force under Q-2)

**Authored:** 2026-09-07 Central, design session (Cowork, Fable 5.1; device bridge granted on the checkout), against repo state `f5bbdf9`. Filed by the packet that carries the slice and the `#149` authorization; fires on that entry at HEAD.

> ## THIS PROMPT FIRES ONLY ON MICHAEL'S `CCS-1` AUTHORIZATION, RECORDED IN THE SESSION LOG.
>
> **The prompt existing authorizes nothing.** `CCS-1` — *"Does Michael authorize the CC-1 RULINGS AND ADDRESS-MODEL SLICE at `docs/specs/cc1-rulings-and-address-model-slice.md`, scope IN (§3) and OUT (§4) as written, defaults (§6) as named, to be built by a fresh Opus Code session fired from `docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md`, the queue runner BARRED, fixture-only, the two migrations written and not run — with `HS-3` (the generational suffix, §3 item 15) IN?"* (one text, identical in the slice's §11, the queue row and here). **RULED YES by Michael 2026-09-07 17:11 CDT, verbatim *"yes"* — session-log entry `#149`; the slice's §11 records the seven limbs.**
>
> **If you are reading this and cannot find `CCS-1` ruled AFFIRMATIVELY at HEAD: STOP. Do not build. Tell Michael the `#149` packet has not run.**
>
> **THE TEST IS "RULED YES," NOT "RULED."** Reading the `CCS-1` row at HEAD, an **open glyph (⬜) DISCONFIRMS**; a **closed glyph (✅) does NOT confirm** — the register closes deferred and ruled-negative items too. **Only a session-log entry at HEAD recording Michael's affirmative words, naming the slice document, establishes it** (QR-6(a)). Find that entry in `docs/record/session-log.md`, quote his words into your own entry, name the entry, **and confirm from the same entry that `HS-3` is IN** (it is — limb 5, *"IN"*); build §3 item 15. **If you cannot produce that quotation and that entry, you do not have the authorization — this session ends here and you say so.**

**What this is:** the kickoff prompt for the slice that turns the sixteen hands-on rulings of 2026-09-05 (`#148`) and the five address-model rulings of 2026-09-07 (`#149`) into product. It is a **POINTER, not a spec copy** (QR-2 principle): every scope statement lives in the slice read at Step 1. **If anything here conflicts with those documents at HEAD, the documents win and this prompt gets a correction.**

Michael: once `CCS-1` is ruled YES and recorded, open a fresh Claude Code session (Opus by default per the standing model routing; check `/usage` first and state the reading), then say "run docs/prompts/PROMPT-cc1-rulings-and-address-model-slice-build-session.md".

**Sequencing.** Every prior migration has RUN on the live database (`MIG-1` and the amendment 2026-09-03, `#147`; the fix 2026-09-07, `#149`). This build WRITES two migration files and RUNS neither; it is exercised in demo mode on fixtures. Nothing here connects to the live database.

---

You are running the **CC-1 RULINGS AND ADDRESS-MODEL SLICE build** for brennan-case-manager. On 2026-09-05 Michael walked the running product and made sixteen rulings; on 2026-09-07 he ruled the facility and party ADDRESS MODEL — the case row picks the location, the registry stores street and city/state/ZIP as two fields, a legacy one-line address is split ONCE by a stated rule at the record and marked, and the render path never parses. **This slice builds all of it, fixture-only, and writes two migrations it does not run.**

## Step 0 — Checkout gate (QR-3 pattern) + MM-1 bar + the authorization

`git fetch origin`, then confirm: **clean working tree, on `master`, HEAD == `origin/master`.** Behind-but-clean fast-forwards and continues. **Dirty, diverged, off-master, or AHEAD of origin STOPS — tell Michael.** Verify with commands that could disconfirm (QR-6(a)): `git ls-remote origin refs/heads/master`, never the local tracking ref alone. Three untracked paths are known and are Michael's — `Claude outputs/`, `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md` — DO NOTHING to them.

Then check `inbox/`: **if any packet zip is present, STOP — the queue runs first (MM-1), and this build session never doubles as the queue runner.** (The leftover unzipped folder `push-to-code_fe-d1-amendment-slice_2026-08-31/` is not a packet; leave it.)

**Then confirm, and record, that `CCS-1` is RULED AFFIRMATIVELY — quoting Michael's own words, naming the session-log entry, and confirming `HS-3` IN from it** (the header box).

## Step 1 — Read, in this order, all at HEAD

1. **`docs/specs/cc1-rulings-and-address-model-slice.md` — IN FULL.** §0 (the four provenance classes), §2.1 (the sixteen, as a pointer table — READ THE RECORD IT POINTS AT), **§2.2 (the five address-model rulings — his words, quoted)**, §3–§4 (IN / OUT), §5 (the two migrations and the split rule), **§6 (nineteen NAMED DEFAULTS `SD-1`–`SD-19` — build each exactly as named and report each you took, by number)**, §7 (the tests you owe), **§8 (DO NOT — read it twice)**, §9 (your ordered work list), §10 (what BUILD-STATE says on landing), §11.
2. **`docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` — IN FULL.** The record of R1–R16 in Michael's words; §6 lists the text acts for his eye; §9 records three corrections so you do not repeat them.
3. **`docs/specs/fe-d1-amendment-slice.md`** §5–§10 and §12 — the built engine's design authority and its DO-NOT list, which binds here too; its §10 defaults as ANNOTATED at batch 90 (seven rows carry the 2026-09-05 supersessions).
4. **`docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md`** §11–§18, with §18.F's annotations.
5. **`docs/specs/form-engine.md`** §3, §9 (VERBATIM — never reworded), §10.
6. **`docs/specs/contact-directory.md`** §5.
7. **`docs/spec-feedback.md`** — the second-tranche section's item 2 and its 2a addendum (find them by HEADING: "THE PROVIDER BLOCK READS `addressLine1` / `cityStateZip`"), and the 2026-09-07 gate-9 / floor notes if the packet landed them.
8. **`docs/specs/BUILD-STATE.md`** — in full; the sole authority on what is built. It is under a 150-non-blank cap AND a 100,000-byte ceiling (`CAP-4`).
9. **`CLAUDE.md`** — binding build conventions.
10. **`docs/specs/anti-resurrection-ledger.md`** — check before building anything that appears absent.
11. **`db/migrations/2026-09-03-fe-d1-amendment.sql`** and **`2026-09-03-fe-d1-amendment-fix.sql`** — the check-pattern your two files follow (gate first; catalog lookup, never a guessed name; checks at the foot answered in words; STEP 0 counts in the header of a data migration).

## Step 2 — Re-verify the slice's `src/` premises at YOUR HEAD before building on them

The slice's `src/` statements were read over the device bridge at `f5bbdf9` by a design session; **you are the session that builds on them, and you re-verify each before you do:** `partyRegistry.ts`'s `CONTACT` block and `providerBusiness.locations[]` sub-fields; the three regions that read address keys (`facilityContactLines()` in `generate.ts`; `person_*` and `firm_*` in `context.ts`); `TierInput`'s fields; `CaseProvider`'s fields; `lastToken()` and `DOCTORAL_CREDENTIALS` in `assembly.ts`; the phone formatter's home (`src/components/phone.tsx` / `src/domain/phone.ts`); `STORE_VERSION` (15) and the pinned literals; the store's migration chain shape; the template editor's save path and its `{{…}}` legacy check (R8); the roster link path and `case_clients` adapter methods (R5); the bill form (R7); where the no-client notice and the caption-alignment flags render (R16). **Record every delta in your entry; a delta that changes what a ruling means is a STOP to report, not a substitution.**

**Also run the baseline health trio BEFORE any change** (`npm test` / `npm run build` / `npm run lint`, exit codes read off `npm` itself, never through a pipe). **EXPECT GREEN** — 643/643, build 0, lint 0 at `f5bbdf9`. **A red is a stop to report before you write a line.** And `npx tsc -b` — vitest does not type-check in this repo, so a green suite is not a green build.

## Step 3 — The work list is the slice's §9, items 1–16, in that order

Two of them are the shape of this build and are restated so they cannot be missed:

- **The split runs ONCE, in the store step and the data migration, by §5.3's rule, and MARKS what it touched.** The render path reads two fields. **A test proves nothing splits at render** (§7 item 17). If you find yourself writing a comma-split inside `context.ts`, `generate.ts` or `FormsTab.tsx`, stop — that is D1(iii)'s ruled-out shape.
- **Every text act is a PROVISIONAL string with its `SD-n` cite beside it in code**, listed in your entry, never described as approved.

## Step 4 — Defaults are reported, not hidden

Every `SD-n` you build is a decision the record did not make and the design session named so you would not make it silently. **Your session-log entry lists every default taken, by number**, and any default you found you could not build as named is a STOP to report, not a substitution.

## Step 5 — Health check

**Run it.** This build touches `src/`, `db/` and two migration files, so `QR-6(f)`'s skip limb does not apply — **a build session never takes it.** Report all three figures plus `tsc -b` against the Step 2 baseline.

---

## DO NOT

The slice's §8 is the DO-NOT list and binds in full. Restated so it cannot be missed:

- **Do not parse, split or normalise an address at render time.**
- **Do not add a fifth stop; do not make any panel line block.**
- **Do not write a model-written note, wire a vendor, or pass a real record through the model path.**
- **Do not auto-fix a CL2-CHECK-1 state; do not backfill damages records for existing links.**
- **Do not inflect the custodian literal; do not add DPT to the doctoral set; do not render "Mr."/"Ms." for a mid-level; do not name the plaintiff in a one-client title.**
- **Do not designate a facility; do not inspect the writer's parts or the assembled paragraph.**
- **Do not reword, retire or edit any `form-engine.md` §9 paragraph, or rename any token that appears in §9.**
- **Do not compute, display or propose a TRCP 195.2 date; do not draft or insert a registry entry; do not write new rule text.**
- **Do not run either migration; do not connect to any database; do not amend a migration that has run.**
- **Do not touch `case_parties`, `case_roster_flags`, `party_pii`.** `case_clients` only through R5's create and R6's read.
- **Do not delete the legacy `address` value from any record.**
- **Do not add a geocoder, an address validator or a lookup.**
- **Do not edit `docs/skills/drafting-disclosures/SKILL.md`, `Go_Live_Gates.md`, the REQ-CAPTURE, the rulings doc, or any spec in `docs/specs/`** (`BUILD-STATE.md` excepted); `spec-feedback.md` item 2 takes ONE dated annotation line.
- **Do not regenerate `docs/record/session-log-toc.md`** (TOC-4's trigger is a queue-runner batch); **do not write to `docs/specs/session-log-head.md`** (TC-5).
- **Do not mint an `#nn`** (TOC-6), **any queue row, or any ID.**
- **Do not double as the queue runner** (Step 0).
- **Do not read "walked" as "live."** Fixture-only; EXCLUDED from the GL-1 floor.

## Before you end the session

1. **Prepend a session-log entry at the TOP of `docs/record/session-log.md`** (the live log — `docs/record/`, since TC-4). **Per TOC-6, Code sessions never mint `#nn` — leave it unnumbered.** Record: the authorization entry you quoted and `HS-3`'s IN/OUT; the Step 2 deltas; the baseline; every `SD-n` taken, by number; every text act drafted, marked PROVISIONAL; the two migrations WRITTEN AND NOT RUN with their gates; the fixture-only posture; the health figures before and after; the click-through's findings.
2. **Rewrite `docs/specs/BUILD-STATE.md` in full** under BS-1a (150 non-blank) AND `CAP-4` (100,000 bytes by `wc -c` on the working tree — measure AFTER your last edit, because the banner's own figure changes the figure). Displace verbatim into your entry under `DISPLACED FROM BUILD-STATE (CAP-4)` and name the shortfall in the banner. Preserve the anti-resurrection-ledger pointer. **Recompute every count from the files at HEAD — never copy a figure from this prompt or from the slice** (OPEN-5(a)). Say what the slice's §10 item 3 says, in your own measured terms; the header reads **"TWO migrations WRITTEN AND NOT RUN, in order"** and names them.
3. **Do NOT regenerate `docs/record/session-log-toc.md`; do not write to `docs/specs/session-log-head.md`.** The next batch's census detects the unindexed entry by design, and your entry says so.
4. **Push, and VERIFY with a bare `git ls-remote origin refs/heads/master`.** Never report "pushed" from an unchecked command. **An allowlist entry is necessary, not sufficient** — the auto-mode classifier has refused an allowlisted bare `git push` before. **Your log entry may assert no post-commit action** (QR-5(a)); report the push result to Michael in session; a stranded push is his hand.
5. Tell Michael in one line: **"Pushed at `<sha>` — click Sync now on the repo in the Claude project."** Or: "Committed at `<sha>`, NOT pushed — push by hand."
6. **Then tell him what is still his:** run the two migrations, in order, each pasted alone after a backup, checks answered in words — the schema file first, the data file second; the text acts at §6 for his eye before any real record; the confirm-or-edit marks on any rule-split address on the Parties page; `H12-v` and the BAA before any real record through the model path.
