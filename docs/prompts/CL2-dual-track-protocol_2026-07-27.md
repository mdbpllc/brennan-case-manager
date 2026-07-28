# CL-2 DUAL-TRACK DECISION PROTOCOL (ONE-OFF)

## SCOPE AND EXPIRY — READ FIRST
**This document binds ONE decision: the CL-2 build authorization and its sequencing.**
It is NOT a standing convention. It does NOT bind future sessions. It does NOT establish
how pivotal decisions are made in this project generally. **It expires at reconciliation**
(step 4). A later session finding this file must treat it as spent history, not precedent.

Ruled by Michael, 2026-07-27, as a tailored approach to the CL-2 decision — deliberately
NOT adopted as a convention (so instructions trigger #3 does NOT fire from this document).

**Home:** `docs/prompts/` (canonical for cross-interface prompts, per Q-2). One-off status
is stated in this header so it is not mistaken for a standing runner like QUEUE-RUNNER.md.

---

## WHY THIS EXISTS
Two Claude instances are not independent by default — shared training, shared repo. The
value of a two-model pass appears ONLY if the passes are blind to each other. If Fable
reads Opus's position before forming its own, Michael gets one view plus an echo, not two
views. This protocol enforces the blindness that makes the collaboration real.

Michael's framing (2026-07-27): collaboration in this sense surfaces ideas that neither
model reaches alone with blinders on.

---

## THE TRACKS
- **Track O (Opus, already written):** `SEALED-opus-position-CL2_2026-07-27.md` — Opus 5's
  position on the sequence and the ten rulings. SEALED, do-not-open.
- **Track F (Fable, Tuesday):** Fable forms its OWN view, blind to Track O.

**Note on the slice-question asymmetry:** independence on the *authorization* question is
already partly spent — `cl2-authorization-brief.md` is on disk, carries Opus's advocacy,
and Fable is instructed to read it (it is a decision brief that saves re-derivation). The
seal protects the parts still preservable: the **sequence** question and the **ten
rulings**. Track O is sealed on those; the CL-2 brief is not.

---

## STEPS

### Step 1 — Tuesday Fable session opens (earliest 2026-07-28 21:00 UTC / 4 PM Central)
Fable reads: the client-model design doc (`claimant-dimension-and-case-links-design.md`),
`cl2-authorization-brief.md`, and the 2026-07-26/27 session-log entries. **Fable must NOT
open EITHER sealed file.** Two DO-NOT-OPEN items travel with this packet:
- `SEALED-opus-position-CL2_2026-07-27.md` — Opus 5's position.
- `SEALED-michael-ruling-sequence_2026-07-27.md` — **Michael has already ruled the
  sequence. His ruling is sealed.** Its existence is disclosed; its content is not.

Fable is told a ruling exists so it does not mistake the session log's silence for an
undecided question — but it rules the sequence independently, and its ruling is recorded
before either seal opens. If Fable's independent view matches Michael's, that agreement is
informative. If it is told the answer first, the agreement means nothing.

### Step 1a — REQUIRED INPUT: the launch runway (stated by Michael, 2026-07-27)

**Michael intends three to six months of continued work before full launch. There is no
near-term date for real client data entering the database.**

This is a fact about intent that no session could infer from the repo, and it bears
directly on the sequence ruling. Fable must weigh it, and should note explicitly how it
weighed it.

**The fact is disclosed; its interpretation is NOT.** An earlier draft of this section
analyzed which way the runway cuts. That analysis has been removed deliberately: it
pointed toward one of the two answers Fable is being asked to reach independently, and
leaving it here would have anchored the blind pass. Opus's reading of this input is in the
sealed memo; Michael's is in his own sealed ruling. **Fable derives its own.**

Fable should state, in its own words, what the runway implies for the sequence — including
if it concludes the runway is not decisive.

### Step 2 — Fable rules BLIND
Fable independently:
1. Rules the **sequence**: CL-2 first vs. auth first. SUPA-1 is answered — the live
   Supabase project is EMPTY (`db/schema.sql` never executed). The launch runway (Step 1a)
   is a required input. Fable weighs both
   directions on the record.
2. Reconsiders the **ten D-CL2 rulings** under UNBOUNDED latitude (Michael, 2026-07-27):
   may recommend changes to any; Michael rules. Limit: where a ruling rests on facts about
   Michael's practice, Fable may reframe the question but not supply new practice facts.
   D-CL2-8 is flagged as the record's "Claude's call, not Michael's" — the strongest
   candidate for a fresh look. D-CL2-2a is OPEN and sits INSIDE the slice (derivation rule
   for the retired limitations field) — Fable rules it or defaults it explicitly.
3. Rules the **authorization** yes/no/defer, per the brief's §7.
4. Records all of the above in the session log with reasoning.

### Step 3 — Seal opens
Only AFTER Track F is recorded, `SEALED-opus-position-CL2_2026-07-27.md` is opened.

### Step 4 — Reconciliation (Michael)
Both views before Michael. He reconciles and rules. Points of agreement strengthen
confidence; points of divergence are exactly the ideas the dual track was built to surface
— examine those hardest. **Protocol expires here.**

### Step 5 — If authorized
Whoever assembles the packet writes a non-empty §5 quoting the authorization, scoped to the
brief's six pieces, carrying the three carve-outs as DO-NOTs and the §5 checklist as the
walkthrough. Michael re-walks the medical tab afterward (not a glance — the v0.1 / Phase 1a
model).

---

## HARD LIMITS
- Track F must be recorded before the seal opens. No peeking.
- Fable recommends on the ten rulings; it does not rule them. Michael rules.
- This protocol authorizes no build. Only Michael's reconciled ruling does.
- One-off. Expires at step 4. Not precedent.

---

## USAGE NOTE (context, not instruction)
Both weekly meters reset 2026-07-28 21:00 UTC = 4 PM Central; Fable returns to a FULL
allowance, not a remainder (earlier "one third left" framing was wrong — that remainder
expires at the same reset). Budget does not constrain Tuesday; the only gate is that no
Fable session can start before the reset. Keep heavy tool-running work on Opus regardless;
point Fable at the judgment call.
