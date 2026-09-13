# PROMPT — FIRM-OBLIGATIONS FIX SLICE Build Session (`FOS-2`)

**Canonical repo path:** `docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md` (CAP-2 class: RULING — a prompt in force under Q-2)

**Authored:** 2026-09-12 Central (DT-1), design session (Cowork, Fable 5.1; device bridge on the checkout via staged read-only copies — the VM shell could not mount the folder), against repo state `5781420`. Filed by the packet that carries the fix slice and the `#156` authorization; fires on that entry at HEAD.

> ## THIS PROMPT FIRES ONLY ON MICHAEL'S `FOS-2` AUTHORIZATION, RECORDED IN THE SESSION LOG.
>
> **The prompt existing authorizes nothing.** `FOS-2` — *"Does Michael authorize THE FIRM-OBLIGATIONS FIX SLICE at `docs/specs/firm-obligations-fix-slice.md`, both groups, scope IN (§3) and OUT (§4) as written, the UNRUN migration amended in place (§5), defaults (§6, `FXD-1`–`FXD-11`) as named — `FXD-9`'s reading of the reminder composite included — to be built by a fresh Opus Code session fired from `docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md`, the queue runner BARRED, fixture-only, the migration still not run by that session, the master `.docx` edited at exactly two spots?"* (the slice's §11, with its `FXD-9` clause) — is the question the sitting put to Michael on 2026-09-12 after the slice was delivered to him as a file; his answer, in his words, is what the `#156` session-log entry records.
>
> **If you are reading this and cannot find `FOS-2` ruled AFFIRMATIVELY at HEAD: STOP. Do not build. Tell Michael the `#156` packet has not run.**
>
> **THE TEST IS "RULED YES," NOT "RULED."** Reading a `FOS-2` register row at HEAD, an **open glyph (⬜) DISCONFIRMS**; a **closed glyph (✅) does NOT confirm** — the register closes deferred and ruled-negative items too. **Only a session-log entry at HEAD recording Michael's affirmative words, naming the slice document, establishes it** (QR-6(a)). Find that entry in `docs/record/session-log.md`, quote his words into your own entry, name the entry. **If you cannot find it, or his words are anything but an affirmative on both groups, STOP.** If he authorized ONE group only, build that group only and say so.
>
> **A SECOND GATE, PECULIAR TO THIS SLICE: the migration `db/migrations/2026-09-10-firm-obligations.sql` must still be UNRUN.** This slice AMENDS THAT FILE IN PLACE (§5). Read every session-log entry above `#156` at HEAD: if any records that file run on the live database, STOP and tell Michael — the amendment must then become a second migration, which is a design act this prompt does not authorize.

**What this is:** the kickoff prompt for the slice that turns the hands-on sitting's rulings of 2026-09-12 (`#156`) into product — seven firm-obligations fixes (group A) and six disclosures/form-engine fixes (group B). It is a **POINTER, not a spec copy** (QR-2 principle): every scope statement lives in the slice read at Step 1. **If anything here conflicts with those documents at HEAD, the documents win and this prompt gets a correction.**

Michael: once `FOS-2` is ruled YES and recorded at HEAD, open a fresh Claude Code session (Opus by default per the standing model routing; check `/usage` first and state the reading), then say "run docs/prompts/PROMPT-firm-obligations-fix-slice-build-session.md".

**Sequencing.** Every migration before the firm-obligations one has RUN on the live database (the last: the two `CCS-1` files, 2026-09-07, `#150`). The firm-obligations migration is WRITTEN AND NOT RUN (his word, 2026-09-12). This build AMENDS it and RUNS it nowhere; the amended file is exercised in demo mode on fixtures. Nothing here connects to the live database. **Group A carries no client data and sits OUTSIDE the GL-1 floor. Group B touches the disclosures instrument's fixture path and Michael's master `.docx` at two heading spots; the drafting skill remains the live path.**

---

You are running the **FIRM-OBLIGATIONS FIX SLICE build** for brennan-case-manager. On 2026-09-12 Michael walked the built firm-obligations module and the built `CCS-1` address model in demo mode and ruled, one question at a time, on what the build had handed back. **This slice builds those rulings, fixture-only, amending the one unrun migration it does not run.**

## Step 0 — Checkout gate (QR-3 pattern) + MM-1 bar + the two authorization gates

`git fetch origin`, then confirm: **clean working tree, on `master`, HEAD == `origin/master`.** Behind-but-clean fast-forwards and continues. **Dirty, diverged, off-master, or AHEAD of origin STOPS — tell Michael.** Verify with commands that could disconfirm (QR-6(a)): `git ls-remote origin refs/heads/master`, never the local tracking ref alone. Three untracked paths are known and are Michael's — `Claude outputs/`, `docs/specs/attorney-review-queue-audit-2026-08-24.md`, `docs/specs/id-collision-report.md` — DO NOTHING to them.

Then check `inbox/`: **if any packet zip is present, STOP — the queue runs first (MM-1), and this build session never doubles as the queue runner.**

**Then confirm, and record, both gates in the header box:** `FOS-2` RULED AFFIRMATIVELY, quoting Michael's own words and naming the `#156` entry; and the migration UNRUN at HEAD, naming the entries you read to establish it.

## Step 1 — Read, in this order, all at HEAD

1. **`docs/specs/firm-obligations-fix-slice.md` — IN FULL.** §0, §1 (re-verify at Step 2), §2 (the pointer table — READ THE RECORD IT POINTS AT), §3 (IN, eighteen items in two groups), §4 (OUT), **§5 (the UNRUN migration amended in place — four columns, one CHECK, nine functions, ten checks)**, **§6 (`FXD-1`–`FXD-11` — build each exactly as named and report each by number)**, §7 (tests), §8 (DO NOT — read every line before you write one), §9 (this checklist, elaborated), §10, §11.
2. **`docs/specs/firm-obligations-hands-on-rulings-2026-09-12.md` — IN FULL.** The record of every ruling in Michael's words, with the option text he picked from.
3. **`docs/specs/firm-obligations-build-slice.md`** — as amended by the `#156` packet (§8's first DO-NOT and §7 item 21 now name `FOD-4`'s edits; the text-act inventory carries CONFIRMED marks) — §2.3, §3, §5, §6, §7, §8.
4. **`docs/specs/firm-obligations-module-spec.md`** §12 and §16; **`docs/specs/firm-obligations-rulings-2026-09-10.md`** §1 DECISION 7.
5. **`docs/specs/fe-d1-amendment-slice.md`** §10 (D-8, D-16, D-18, D-46, D-65), §8.3 (the marked-individual exclusion this slice removes), §15 (`AS-Q17`), the §8.2 panel-line table (lines 11, 15, 17); **`docs/specs/cc1-rulings-and-address-model-slice.md`** §2.2 and §6 (`SD-1`, `SD-2`, `SD-13`); **`docs/spec-feedback.md`** — the `## 2026-09-12` section (parts B item 1–2, C items 1, 6, 7, 8, 14, 15) and the `## THIRD TRANCHE — recorded by the `CCS-1` build session, 2026-09-07` section, items 8, 10, 11 (cite that file by section heading, never by bare item number).
6. **`docs/specs/BUILD-STATE.md`** — in full; the sole authority on what is built; `CAP-4` binds it (100,000 bytes; 150 non-blank).
7. **`CLAUDE.md`**; **`docs/specs/anti-resurrection-ledger.md`**.
8. **`db/migrations/2026-09-10-firm-obligations.sql`** whole (the file you amend); **`db/migrations/2026-08-19-…`** — whichever migration carries the `revoke execute on function next_file_number() from public` pattern (the `F-1` precedent for §5.3's GRANT/REVOKE); **`db/schema.sql`** (`firm_obligations`, `firm_obligation_occurrences`, `review_log`).
9. **`src/domain/firmObligations.ts`**, **`src/data/firmObligationsSeed.ts`**, the Supabase adapter's firm methods and its failure-injecting fake, the sync drain's firm half, **`src/outlook/graph.ts`** (`toGraphFirmEvent`, `pushFirmOccurrenceToOutlook`), the register page and the card; the local store's migration chain (literal-pinned steps up to 17).
10. **`src/forms/`** — `blockItem()` (`topLine`, `custodianLine`, `custodian_line`, `expert_names_block`), the custodian-only shape's part contract, the D-8 "Currently practicing at" path, the §5.1 gate keyed on the `mental health` marker and D-65's membership rule, the new-bill form's provider picker; the repo's DOCX XML tooling (`document.xml`, `merge_runs` — `docs/…/technical-workflows` if present, else the form engine's ZIP/docx layer); the master skeleton's path from `docs/skills/drafting-disclosures/SKILL.md` or the template record — **never guessed.**

## Step 2 — Re-verify the slice's premises at YOUR HEAD before building on them

The slice's `src/` and `db/` statements were read from staged copies at `5781420` by a design session; **you re-verify each before you build on it:** `STORE_VERSION = 17` and the pinned literals; `SCHEMA_TABLES` 48; the migration's gate and its seven checks; `toGraphFirmEvent`'s `isReminderOn: true` and its minutes rule; the close line's JSON link in `review_log.new_value` (its key name as built — read it, do not assume it); the two-call Inactive "Activate…"; the Supabase adapter's compensation branches and the firm adapter test file (67 tests at `e046906`, of which the compensation-branch tests are the ones §7 item 5 replaces); `blockItem()`'s two tokens at N = 0; the `care_episode_clause` part; the D-8 sentence; the marked-individual EXCLUSION at the amendment slice's §8.3 / `AS-Q17` default (D-65 is the BLOCK-membership rule and is unchanged); the bill picker's source; the master's heading count (expect exactly two) and the current one-client value of the two `R15` scalars. **Report every delta in your entry; a delta that changes what a ruling means is a STOP.**

**Also run the baseline health trio BEFORE any change** (`npm test` / `npm run build` / `npm run lint`, exit codes read off `npm` itself, never through a pipe), and `npx tsc -b`. **EXPECT GREEN** — 1,081 tests / 56 files, build 0, lint 0 (4 warnings in the filed mock), `tsc -b` 0 per the 2026-09-12 CODE entry — measure them. **A red is a stop to report before you write a line.**

## Step 3 — The work list is the slice's §9, in that order

Four things are the shape of this build and are restated so they cannot be missed:

- **The migration is amended IN PLACE, never duplicated, and never run.** Its gate stays first. Ten checks at the foot. STOP if it has run.
- **The reminder limb changes; nothing else about the event does.** Same calendar, same all-day shape, same target date. Hard items ring at `T − outlookReminderDays` exactly (the field pre-fills `min(30, leadDays)` — `FXD-9`); routine items never ring; Done and Not-applicable silence; Undo restores. **The register and card lighting are UNCHANGED — a byte-equal snapshot test proves it.**
- **`FOD-4`'s edits are permitted on a not-past-due occurrence (`#156` item 1) — NO code change (A8).** Do not add a guard; the test the `FOS-1` build named for the conflict may keep its name.
- **The master `.docx` is edited at EXACTLY two spots, by the repo's XML tooling, with a byte-diff filed as EVIDENCE. Any other count is a STOP.** A one-client generation must render byte-identically to today.

## Step 4 — Defaults are reported, not hidden

Every `FXD-` you take is reported by number in your entry, PROVISIONAL, none "improved". **Any default you find you cannot build as named, and any reading the slice text does not make that changes what a ruling means, is a STOP put to Michael with options — never a silent departure** (the `FOS-1` build's part C items 2 and 9 are the exhibit of the failure this line closes: two departures filed for his eye that should have been stops).

## Step 5 — Verification, click-through, close-out

The whole-build adversarial review in the `FOS-1` shape (finder lanes, one refuter per lane, RE-SWEEP AFTER FIX), then the demo-mode click-through on BOTH a fresh store and a migrated v17 store, both groups, reported per row. The health trio and `tsc -b` after. The session-log CODE entry (unnumbered, `TOC-6`), prepended, in the house form: STEP 0 evidence; the two gates quoted; premises re-verified with deltas; what was built by commit; every `FXD-` by number; every text act PROVISIONAL with its cite; every STOP with his pick; the click-through; HEALTH, AFTER; WHAT WAS NOT DONE, each because a rule bars it; BUILD-STATE rewritten in full as a CODE refresh under `CAP-4` with displaced passages verbatim in the entry; `spec-feedback.md` a new dated section if anything needs the design side. `git push`, then `git ls-remote` — report the sha. Do NOT regenerate the TOC or the head file; do NOT mint an `#nn`, a queue row or an ID; do NOT run the queue runner.

## DO NOT (the slice's §8 binds in full; these are the ones a build session is most likely to drift on)

- No snooze, later, dismiss, bulk or delete control — **except `FOD-4`'s edits on a not-past-due occurrence, now expressly permitted, and Undo's required delete of the untouched next.**
- No holiday; no template weekend rule but `unknown`; no per-template reminder value (`FXD-1` pre-fills 30 everywhere); no registry entry.
- No change to the case calendar path, `calendar_events`, any matter table; no new consent.
- No firm-wide calendar page; no per-paragraph regenerate — both are 🟡 for LATER slices.
- No migration run; no database connection; no second migration file for these columns.
- No vendor, no model; the fixture writer stays the only writer in both modes.
- No edit to any run of the master `.docx` but the two heading occurrences; no §9 sentence reworded; no spec edited (`BUILD-STATE.md` and `spec-feedback.md` excepted).
- No `#nn`, no queue row, no ID beyond `FXD-`; no TOC or head-file regeneration; not the queue runner.
