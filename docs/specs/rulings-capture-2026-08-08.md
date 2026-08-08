# RULINGS CAPTURE — 2026-08-08 (contact-directory reframe; Slice A withdrawn; sweep corrections)

**Canonical repo path:** `docs/specs/rulings-capture-2026-08-08.md` — NEW file.
**Session:** design session, mixed voice (morning) / typed (afternoon). Model attribution: the typed
portion is believed Fable 5; the voice portion ran on a supported non-Fable model (Fable unavailable
in voice, verified 2026-08-07). Recorded as mixed, per the attribution caution in
`model-routing-plan.md`. Meter readings not supplied this session (noted for the record).
**Nothing was built. Nothing is authorized for build. Slice A was withdrawn.**

---

## PART 1 — THE REFRAME (CONFIRMED: "that's the decider")

The session opened as a next-build-slice naming exercise. Claude proposed the form engine split as
two sub-slices, directory first (Slice A = provider-directory table per the closed FE-1 rulings).
Michael approved starting Slice A — then, on hearing the scope pinned aloud, stopped it:

> "the form builder is gonna pull not just from providers, but from all contacts because the
> forms... the form builder is to build forms to produce deliverables that are gonna be sent out to
> potentially anyone depending on what the deliverable is."

And the scope, in his words:

> "this form builder should be something that we should be able to use for any type of case and in
> any state of the case, whether it be intake all the way to closing the case out, whatever that
> looks like for whatever case type it is."

**RULING (CONFIRMED):** one global CONTACT DIRECTORY is the identity source for the form engine.
"Provider" is a role a contact plays, not a table. The form engine spans every case type and every
case phase, intake through closing, and produces deliverables addressed to anyone — opposing
counsel, adjusters, clients, courts, providers.

**Reason (load-bearing):** deliverables go to potentially anyone; a provider-shaped directory is the
medical-chronology problem's local answer promoted to the wrong level — the same wrong-level defect
class CL-2 was built to kill, from the other direction.

## PART 2 — FE-1 SUPERSEDED (CONFIRMED)

FE-1 closed 2026-08-07 on the question it was asked: where does PROVIDER data come from. The
reframe replaces that question with a bigger one rather than re-answering it.

**RULING (CONFIRMED):** FE-1 is **SUPERSEDED** by CD-1 — not reopened. FE-1 stands as ruled for its
narrower question; the historical ruling is untouched (append-only discipline). **Reason:** Michael
did not change his mind about provider data; he asked a bigger question that swallowed the smaller
one. "Superseded" is the truthful description; "reopened" would imply re-litigating a ruling that
was correct as framed.

**Surviving mechanics — carried into the CD-1 design session as PROPOSED inputs, not rulings:**
- Pointer model: case-level records point at the directory entry and read live (FE-1b's shape).
- Enter-once: interview-card-style fallback writes back into the directory.
- Firm-wide edit propagation from case context, with the scope label + linked-case count
  (labeling, not a confirm click — FE-1c's visibility-over-ceremony principle).
- Identity in the directory, dollars on the case (FE-1a) — per-case facts never live per-contact.

These survive because they are about how ANY directory behaves, not about providers. They are
PROPOSED for CD-1 because they were ruled against the provider framing, not the global one.

## PART 3 — CD-1 ISSUED (CONFIRMED)

**CD-1 — full question text (QR-1 discipline; the text must outlive its container):**

> One global contact directory as the identity source for the form engine and all case-linked
> people/entities; provider is a role on it. How does it relate to `case_parties` and
> `case_clients` — views over one directory, or separate tables with links? Living spec — revisited
> as modules surface new field needs. Needs its own design session with schema on screen.
> NOT authorized for build.

**RULINGS (CONFIRMED):**
- CD-1 gets **its own design session** — not folded into the client-model work. Schema on screen
  (`case_parties`, `case_clients`, form-engine spec); not a voice item.
- The directory spec is **living**: "something that we should be able to keep tweaking... as we
  build out different parts of the program. Maybe I'll realize that, hey, we also need to add this,
  this, and that as features on the directory." No one treats the first pass as frozen.
- The ID is **CD-1**, a NEW id — not FE-1R. Reason: an R-suffix implies FE-1 came back to life,
  which "superseded" denies; and per the K-6/K-7 standing rule, a new question gets a new ID with
  its text intact rather than wearing a dead item's number.

## PART 4 — SLICE A WITHDRAWN (CONFIRMED: "Yeah. Withdrawal, please.")

**RULING (CONFIRMED):** Slice A (provider-directory build) is **WITHDRAWN — not paused**. Nothing
goes to the build queue. The next form-engine action is the CD-1 design session, not a work order.
**Reason:** building on the narrow FE-1 reading after the reframe would bake the wrong level in.

Consequence, stated plainly: **the "next build slice" question is OPEN again.** The form engine
cannot be named as the next slice until CD-1 resolves. The standing Code action remains the staged,
unspent Phase 0 + T3 build order (needs a session on the P1 Gen 8 — right machine, not a new
packet).

## PART 5 — CL2-AC-1: DIRECTION-CONFIRMED, EDGES UNRULED (option (b), CONFIRMED)

Morning: Michael ruled "yes" on CL2-AC-1's substance in a cheap-rulings sweep. Afternoon
re-examination (Claude's flag, Michael's cure): the yes was elicited from a one-line affirmative
case, from memory, with no counter-case and no edge conditions — the same from-memory posture
Michael rejected for O5 on 2026-08-07.

**RULING (CONFIRMED — option (b)):** CL2-AC-1 is **DIRECTION-CONFIRMED**: auto-create the client
damages record when a party gets the Client role on a PI case is the policy. **Reason:** a PI
client with no damages-scope record is an impossible real-world state. The following are
**explicitly UNRULED** and require a doc-on-screen session before the item can be marked closed:
- Behavior when the client-role link is REMOVED (persist vs. orphan vs. prompt).
- Behavior on mixed-posture cases.
- Whether auto-create fires on backfilled/historical cases or only on new links.

Not (a) fully-closed, because the edges were never in front of the attorney; not (c) full
pull-back, because the direction was genuinely his and is not in doubt.

## PART 6 — CORPUS-HOME CLOSED (CONFIRMED: "Yes.")

**RULING (CONFIRMED):** the probate knowledge corpus's final home is the **ARCHIVE project**
(the original project, now the legal-authority archive). The corpus can NEVER enter the repo
regardless (licensed James Publishing / LexisNexis material; Part III is privileged client matter);
this ruling makes the recommended home the decided one. **Execution is Michael's hand** — moving
the corpus between project spaces is not a repo action; Code's only task is the queue annotation.
`Probate Corpus.zip` in the P15's local `inbox/` remains untouched per the #31 ruling.

## PART 7 — FE-2 BUILD HOME PARKED (CONFIRMED: "I confirm your proposal.")

FE-2 (intake sweeps document-name columns for billing entities with no chronology row) is a
**closed ruling** (2026-08-07) and nothing in the reframe disturbs it — the sweep is intake logic
and does not care what shape the directory behind it takes.

**RULING (CONFIRMED):** FE-2's **build home is parked, unattached**: annotated in the queue as
"ruled, awaiting a build home; likely lands with the CD-1 build or the intake pipeline, whichever
comes first." No new ID, no re-ruling.

## PART 8 — PROCESS RECORD: THE SWEEP AND WHAT IT CAUGHT

Michael directed an afternoon re-read of the morning session before the packet shipped
(RR-1-in-spirit; the packet had not yet been assembled). The sweep caught, and the afternoon
session cured:

1. **A proposal nearly shipped as a ruling.** Claude's closing summary of the morning said "the
   FE-1 reopen" — but superseded-vs-reopened was asked and never answered. The morning packet
   would have carried a fabricated ruling. Cured: ruled SUPERSEDED (Part 2).
2. **Three orphaned half-answers from one crowded exchange** (the "three quick ones" / "two left"
   messages, where Claude rotated questions faster than they were answered): FE-1's status, the
   new item's name, and FE-2's disposition. All three existed nowhere else. Cured: Parts 2, 3, 7.
3. **A badly-elicited ruling.** CL2-AC-1's morning "yes" was obtained from a one-line case with no
   edges shown. Cured: downgraded to direction-confirmed by Michael's choice of option (b), Part 5.

**Failure classes, named for the record:** (1) and (2) are the question-loss family (Q-5's
destroyed wording; K-6/K-7's ID-without-text) plus proposal-masquerading-as-ruling — this time
caught BEFORE the record was written rather than after. (3) is a new-to-the-record elicitation
class: presenting a proposal's own affirmative case as a settled one-liner in a "cheap rulings"
sweep. The cure for all three was the same act: re-read the session against what came after,
before anything ships. No formal correction entry is required — nothing false ever reached the
repo — but this capture is the record that it nearly did.

**Also for the record:** the instructions v6 paste item is DONE (the live project instructions are
v6, 2026-08-07). Meter readings were not supplied this session.

## PART 9 — WHAT WAS NOT COVERED

FE-3 (still needs §8 on screen); O5 (still needs the fee-profile doc); D-CL2-3a; the #31–#33
returned-material review; the PL series (still deferred pending Domser arc evidence); QR-2; SAT-1;
the vision-brainstorming session (Fable, typed); registry legal-research items; QBO ruling.

## PART 10 — RESUME POINT

No question was left mid-stream this time — the sweep closed every orphan it found. The next
design acts, Michael's order: the CD-1 design session (schema on screen), FE-3 with §8 on screen,
O5 with the fee-profile doc, #31–#33 review. The next Code acts: this packet through the queue
runner, then the staged Phase 0 + T3 order from a session on the P1.
