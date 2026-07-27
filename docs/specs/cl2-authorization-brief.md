# CL-2 Authorization Brief — for the Fable Session That Decides

**Status:** DECISION MEMO, staged 2026-07-26 (design session, Opus 5). **Not an authorization.** Michael
reserved the CL-2 build authorization for a Fable session; this brief exists so that session decides from the
record instead of re-deriving a long day's reasoning.

**Canonical repo path:** `docs/specs/cl2-authorization-brief.md`

**Read first:** `docs/specs/claimant-dimension-and-case-links-design.md` (the client model, fully ruled as of
2026-07-26) and the 2026-07-26 session-log entries.

**Bias disclosure, per the author:** this brief was written by the Claude instance that spent the session
arguing for the slice. Read the risk section hardest.

---

## 1. What is being authorized

One vertical slice: **the client record and the medical repoint.** Six pieces.

1. **Create `case_clients`** — case, party, posture, and the client-scoped fields (limitations, sol_basis,
   client flags, fee arrangement, notes). Schema sketch in the design doc §4; a sketch, not a spec.
2. **Backfill** — every existing case gets exactly one client, derived from its client-role party in
   `case_parties`. **A case with no such party is flagged for Michael — never guessed, never given a
   placeholder.** Demo-store version bump follows the established migration pattern: migrate forward, back up
   the old store to a versioned key, write a review-log entry naming what carried.
3. **Repoint the medical stack** — `client_id` on `medical_bills` and `analysis_runs` (denormalized on runs
   so per-client queries don't join through bills). **This is the rework on approved code.**
4. **Retire `cases.statute_of_limitations`** — the date lives on the client record; the case displays the
   earliest, derived and non-writable (D-CL2-2).
5. **Move the Medicare/Medicaid flag** from `cases.pi_flags` to the client record. The other five flags stay
   on the case per D-CL2-5.
6. **Single-client files render exactly as today** (D-CL2-7, ruled). No selector, no new UI, until a second
   client exists.

## 2. What is deliberately OUT of this slice

- **CL-1 / `case_links`.** Different entity, shape unruled (D-CL1-1..3), only real consumer gated on PR-3.
- **Profiles.** The profile model is ruled (derived from practice area) but nothing in CL-2 requires the
  machinery yet, and building it now means designing CIV-1 and PROB-1 first — both unwritten. The lean client
  record ships; profiles come with the damages models.
- **The four unruled proposals** — UM-1 (UM/UIM designation shape), UM-2 (venue-mismatch flag), PR-GATE-1
  (shared-limit warning), MIN-1 (limitations data-entry affordance). None blocks the slice.
- **The PR-gate scope change in code.** Ruled design (D-CL2-6) — but the gate itself isn't built yet, so
  there is nothing to change; the ruling binds whoever builds it.

## 3. The honest risk

**Piece 3 changes the foreign key under the medical module's whole ledger** — a module that is built, walked,
and approved. Downstream of that key: chargemaster memory, PFS benchmark runs, the confirmed-run gate on
settlement math, the report generator.

Mitigations, all real: **no live data has ever entered the app** (the strongest single argument for doing
this now — the migration cost only rises); 186 vitest tests green at last report; the established
backup-and-review-log migration pattern from the reseed-wipe lesson.

The honest framing: **Michael re-walks the medical tab afterward**, not glances at it. The v0.1 and Phase 1a
walkthroughs are the model.

## 4. Two questions Code will otherwise guess at

1. **Does the backfill touch `case_parties`?** Proposed answer: **no** — parallel per D-CL2-8. The
   client-role row stays; `case_clients` is additive. Stated so nobody "tidies."
2. **What does a criminal case's client record hold?** A nearly empty row — one client, no damages spine,
   clocks stay on `charges`. **Created anyway** (every case gets one, ruled), as the future anchor for
   representation type per the profile model.

## 5. The walkthrough checklist (what makes this a real check)

- Open an existing PI case → medical tab unchanged, bills present, prior confirmed runs intact.
- Add a second client to it → the selector appears; bills separate cleanly by client; each client's ledger
  totals independently.
- Open a criminal case → nothing new visible.
- Check a case with no client-role party (if any exist) → flagged, not guessed.
- Confirm the review-log entries from the migration.

## 6. Why this slice is the leverage point

CL-2 authorization gates, in sequence: the medical rework itself → CE1 (ruled to follow CL-2, D-CL2-9,
option (a)) → the case heartbeat and the time tracker (both consume CE1's substrate). **Four of the
project's most-designed modules stand behind this one decision.** That is a reason to decide it carefully,
not a reason to decide it yes.

## 7. What the Fable session should do

1. Read the design doc and this brief.
2. Ask Michael anything unresolved — §4's two questions if he wants them his instead of defaulted.
3. If authorized: write the push-to-code packet with a **non-empty §5** quoting the authorization, scoped to
   §1's six pieces, carrying §2's exclusions as DO-NOTs and §5's checklist as the walkthrough.
4. If not authorized or deferred: record why in the session log, so the next session inherits the reasoning
   instead of the question.
