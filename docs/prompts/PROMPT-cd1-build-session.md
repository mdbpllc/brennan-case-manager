# PROMPT — CD-1 Directory Build Session

**Canonical repo path:** `docs/prompts/PROMPT-cd1-build-session.md`
**Routed:** 2026-08-12 Central (packet `push-to-code_must-carry-58-postrun-and-cd1-kickoff_2026-08-12`).
**What this is:** the kickoff prompt for the CD-1 build session — the authorized directory-build slice.
It is a POINTER, not a spec copy (QR-2 principle): every scope statement lives in the two authorities
read in Step 1. If anything here conflicts with those docs at HEAD, the docs win and this prompt gets a
correction.

Michael: open a fresh Claude Code session (Opus default per the standing model routing; check `/usage`
first and state the reading), paste everything below the line, or just say "run
docs/prompts/PROMPT-cd1-build-session.md".

---

You are running the **CD-1 directory build** for brennan-case-manager. This slice was named, scoped, and
authorized by Michael 2026-08-11 (session-log #52). Work deliberately; this is the first schema-touching
build since CL-2.

## Step 0 — Checkout gate (QR-3 pattern)

`git fetch origin`, then confirm: clean working tree, on `master`, HEAD == `origin/master`.
Behind-but-clean fast-forwards and continues; dirty, diverged, or off-master STOPS — tell Michael.
Then check `inbox/`: if any packet zips are present, STOP — the queue runs first (one runner, anywhere,
at a time, per MM-1), and this build session is barred from doubling as the queue runner.

## Step 1 — Read, in this order, all at HEAD

1. `docs/specs/BUILD-STATE.md` — in full. It is the sole authority on what is built.
2. `docs/specs/session-log.md` — top 3 entries. If a log entry above #59 records CD-1 work already done,
   reconcile before writing anything: act only on genuine deltas and say so.
3. `docs/specs/cd1-build-slice.md` — the authorization record: seven IN items, explicit OUTs, and what
   the authorization does NOT cover.
4. `docs/specs/contact-directory.md` — the design authority. On any conflict with the slice doc, the
   spec wins and the slice doc gets a correction.
5. `CLAUDE.md` — binding build conventions.
6. `docs/specs/anti-resurrection-ledger.md` — check BEFORE building anything that appears absent.

## Step 2 — Build discipline (the CL-2 pattern is the model)

- TypeScript migration + SQL, regression tests, **RLS + probe extension for every new table from birth**
  (the #28/CL-2 lesson, applied proactively — it is in the slice's own IN list).
- Backfill: existing values map mechanically where the slice says they do; anything unmappable is
  **FLAGGED, never guessed** (the `case_client_flags` precedent).
- Seed **only bank-evidenced case types** — no speculative types.
- **Fixture data only.** The live migration step is Michael's hand and is not this session's to run.
- Exercise the result by clicking; record defects honestly.
- Spec problems found during the build go to `docs/spec-feedback.md` — never fixed silently in the spec.
- DT-1: every date stamped uses Michael's Central wall-clock date.

## Step 3 — Hard boundaries (from the authorization's own not-covered list)

Nothing in Scope-OUT (form engine · IN-2 fact table · merge tooling · service-story fields · probate
beyond the reserved pattern · `/rules` seed). No registry change of any kind. Never edit
`docs/skills/drafting-disclosures/SKILL.md`. CE1 stays unauthorized (D-CL2-9). No CourtListener
integration (Q-6). Nothing T3/T4 (KICK-1 governs). Open items marked for Michael stay his.

## Step 4 — Before you end the session

1. Append the session-log entry (next free number — check the top; never rewrite history).
2. Rewrite `docs/specs/BUILD-STATE.md` in full: cap honored (displace before adding — name what paid),
   BS-1 provenance and the anti-resurrection-ledger pointer line preserved. CD-1's "NOT STARTED"
   language updates to what is actually true after this session — built and exercised, or exactly how
   far it got.
3. Push to origin and VERIFY the push landed (remote ref moved). Non-fast-forward rejection STOPS the
   session to reconcile — never force-push (MM-1).
4. Tell Michael in one line: "Pushed at `<sha>` — click Sync now on the repo in the Claude project."
   Remind him the form-engine slice becomes nameable design-side once this build lands (#54 ruling).
