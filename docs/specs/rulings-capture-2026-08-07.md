# Rulings Batch — Design Session Capture (2026-08-07)

**Status:** RAW CAPTURE — design session, dictated inputs, design side, Fable 5. Not canonical, not a
design doc, not in the build queue.
**Canonical repo path:** `docs/specs/rulings-capture-2026-08-07.md` — via the 2026-08-07 packet.
**How to use this in the next chat:** the session-log entry (packet §3) is the summary of record;
this capture holds the reasoning and quotes. A future session ruling on D-CL2-3a, CL2-AC-1, FE-3,
O5, or running the probate-ladder design pass should read the relevant part here first.
**Also still pending from before this thread:** #31–#33 returned-material review; captures e+f fold
into case-heartbeat-design.md §8; session-1 heartbeat voice export; git-identity step missing from
new-machine-bootstrap.md; vision-brainstorming session (Fable) before money/conflicts/deadline-engine
bones; instructions v6 paste (drafted this session).
**Meters:** readings not supplied this session (noted for the record, per the #29 precedent).

## PART 0 — ORIGIN AND PREMISE

Session opened as a design-side status review (pending queue surfaced from BUILD-STATE at `37732ce`
and session log through #33), answered a product question (Fable is not available in voice mode —
voice upgraded 2026-07-23 to Opus/Sonnet/Haiku; falls back from Fable; web-searched, not asserted
from memory), then converted into a rulings-clearing session at Michael's direction: *"start with
the one you think is best to go with right now."* Claude sequenced by leverage; Michael ruled;
seven rulings landed. Nothing was built; nothing was authorized for build.

## PART 1 — FE-1: PROVIDER DATA SOURCE (CONFIRMED, three sub-rulings CONFIRMED)

**The fork:** chronologies give provider NAME but not address, phone, or billed charges. The live
POC filled address/phone from unverified web lookups and set charges to TBD — not shippable.
Paths on record: (1) interview cards at draft time; (2) persistent provider-directory table;
(3) unnamed other.

**RULING (CONFIRMED):** persistent provider-directory table. Michael: *"I like the persistent
directory because I'm gonna be adding to it over time, and you're right. I do use a number of
providers over and over again."* The interview card survives as the fallback for a provider not yet
in the directory and **writes back into the directory** as a side effect (enter-once).

**Sub-ruling FE-1(a) — identity in the directory, dollars on the case (CONFIRMED: "Yes that
matches").** Address/phone/fax/billing-contact are provider-level facts, stable across cases.
A billed charge is a fact about what a provider billed THIS client for THIS treatment on THIS case;
one directory slot per provider would make every case fight over it — the wrong-hierarchy-level
defect class CL-2 was built to kill. The wizard therefore asks for charges (per-case) at every
draft, and for identity fields only when the provider isn't in the directory yet.

**Sub-ruling FE-1(b) — Option A, pointer model (CONFIRMED: "Option A").** Case-level provider
records point at the directory entry; identity fields read live; one source of truth, no copies,
no sync. History concern resolved by the served documents themselves: the rendered .docx of every
served disclosure is the record of what address went out the door. (Option B — copy-at-attach —
rejected for drift: a directory typo fix would leave forty cases stale. Rejection encodes the
rule: no case-local copies of directory identity fields.)

**Sub-ruling FE-1(c) — silent trust (CONFIRMED: "It should be silently trusted").** No confirm
flags on directory fills. Provenance argument: every directory entry was attorney-entered or
attorney-approved once; staleness is caught by the proofread every filing gets anyway. The POC's
web-lookup fills were flagged unverified because the model scraped them — different provenance,
different posture.

**Michael's own load-bearing requirement (his words, in substance):** when he pulls up a provider
inside a case, edits it, and saves, the edit must reflect in every other case linked to that
provider. This works ONLY under the pointer model (one row) and it lands as two build-facing
points: (1) the directory entry is **editable from within case context** — no separate admin-screen
detour; (2) the edit surface **states firm-wide scope with a linked-case count** (e.g. "linked to
N cases — changes apply everywhere") — labeling, not a confirm click. The one whisper inside
silent trust.

**Scope note:** FE-1 changes the SPEC (form-engine.md §12.6). It does not authorize the directory
table, migration, or any build.

## PART 2 — FE-2: DOCUMENT-NAME ENTITY SWEEP (CONFIRMED)

**The miss, proven live:** one billing entity existed ONLY inside billing-record document names —
no chronology row. A human caught it; §4 intake would have walked past it and produced a disclosure
silently omitting a provider — the dangerous kind of miss (no error, looks complete).

**RULING (CONFIRMED: "I rule yes."):** intake sweeps document-name columns for entity names not
otherwise listed; finds surface as flags for Michael ("found X in billing-record filenames, no
chronology row — include as a provider?"). Catch-net, never auto-add — nothing enters a disclosure
without his call. Because document names are messy (abbreviations, records vendors, misspellings),
dismissal is one click and **dismissals are remembered per case** so the engine doesn't re-ask
every draft.

## PART 3 — PR-3: DIRECTION CONFIRMED, EXECUTION HELD (CONFIRMED); PROBATE CORPUS ARRIVAL

**State walking in:** `Probate companion` sits in `src/domain/caseTypes.ts` under Personal Injury
inheriting `_piDefault`; the code's own comment concedes the ladder misfit. S-1 (probate is a
practice line) and V17 (option (a): own practice area, own ladder, companion concept gone; estates
LINK to PI matters via CL-1) already settled direction. PR-3 was the execution authorization.

**Claude's recommendation, initially:** hold execution until the probate-ladder design pass
produces the destination ladder — re-parenting needs somewhere to re-parent TO, and inventing a
placeholder ladder on the fly is how the current wrong one happened.

**Mid-item, Michael uploaded the Texas probate knowledge package** (system prompt, README,
manifest to project knowledge; the 1.8 MB corpus to the chat only) and asked whether the
recommendation changes. **Working-set policy raised unprompted, per the binding instruction:**
manifest + system prompt + README are index/synthesis and stay; the corpus must NOT enter project
knowledge (retrieval dilution) and can NEVER enter the repo — licensed James Publishing/LexisNexis
material, and Part III is privileged Domser client matter (no-client-data rule, no exceptions).
Recommended home: the ARCHIVE project (PROPOSED, unruled). `Probate Corpus.zip` remains untouched
in gitignored `inbox/` per Michael's #31 ruling.

**What the corpus changed (from manifest + system prompt, not a full corpus read):** Ch. 7
(independent administration) is 118 documents laying out the arc nearly as a ready-made ladder —
application, citation by posting, hearing/proof, order, oath, bond, qualification, letters, the
notice battery with tracking, collection of assets, inventory, claims classification, accounting
demands, four closing alternatives. So the gating design pass moved from "requires original
research" to "requires structuring material in hand." AND the corpus surfaced a reason the hold is
righter than argued: **probate is a proceeding-selection practice** — muniment (no letters, short
arc), heirship (ad litem, disinterested witnesses), small-estate procedures, and independent
administration have different arcs. One "Probate" ladder would recreate the `_piDefault` mistake
one level up. The live candidate shape is proceeding-driven case types/ladders — a question FOR
the design pass, not decided tonight.

**RULING (CONFIRMED: "I rule with your recommendation."):** direction confirmed per V17; execution
HELD until the probate-ladder design pass produces the ladder(s); that pass is now schedulable with
the corpus as source material and Domser as a live arc sanity-check (arc only — facts stay out of
the repo). D-CL1-3 stays gated on PR-3, unchanged.

## PART 4 — QR-1 AND RR-1 (both CONFIRMED)

**QR-1 (CONFIRMED: "I rule yes."):** the queue runner, when merging packet open items into
`attorney-review-queue.md`, carries the FULL question text — never ID + label alone. The packet is
deleted after processing; the queue entry must be where the question survives. Evidence class:
Q-5's original wording destroyed by exactly this; K-6/K-7 retired because no text survived
anywhere, under Michael's standing rule that a fabricated open item is worse than a lost one.
Code has been manually working around this since #28 ("QR-1 lesson" full-text carries in log
entries); the ruling converts the workaround into the rule. Cost accepted: longer queue entries.
QUEUE-RUNNER.md → v3.

**RR-1 (CONFIRMED: "Yes"):** before a packet ships, every document authored earlier in the session
is re-read against every ruling made later in the same session. Sending-side mirror of RECONCILE
FIRST. Live exhibit: FE-3 — §8 shell content authored before the packet rules landed, now needing
its own session to clean up; a ten-minute re-read would have caught it. Near-free in
refresh-chat-terminated sessions since the capture pass re-traverses everything anyway. Binds
Claude, not Michael. Both rulings fire instructions trigger #3 → v6 drafted this session.

**Tonight's RR-1 compliance:** trivial — every artifact was authored after the final ruling;
nothing predated anything it must be checked against.

## PART 5 — D-CL2-3: ONE RATE PER CLIENT, PROSPECTIVE (CONFIRMED)

**The question:** does the time tracker's "one rate per case, uniform" rule survive per-client fee
arrangements, or become one rate per client?

**Claude's initial recommendation — WITHDRAWN ON FACTS:** keep the case-level rate (arrangement =
the client's deal, governs which money tools light up; rate = the timekeeper's value, one solo
timekeeper; the affidavit export wants a uniform lodestar rate; build for split rates only when a
real case demands it). **Michael supplied the real case:** *"I will have some cases where I have
two clients and one will have a discounted rate for a certain reason and the other client will
have the standard rate. Additionally, I may decide at some point later in the case to lower one of
the clients' rates or both of their rates."* The demanded case already exists; the recommendation
was withdrawn on his facts, not deference.

**RULING (CONFIRMED):** one rate per CLIENT. The rate moves off the case onto the client record,
beside `fee_arrangement`. Single-client cases render exactly as today — the D-CL2-7 principle (the
client layer hides until a second client exists), preserving enter-once where it applies.

**Mid-case changes (CONFIRMED, Michael's own reasoning):** *"If it is an hourly case and I change
the rate halfway through the case, the hours already billed would likely stay the same because we
already contracted for this and I would discount the hours incurred going forward."* That is the
prospective model: the client record carries an **effective-dated rate history**; every hour is
valued at the rate in force when it was incurred; the discount reaches forward from the effective
date. His wording covers unbilled-but-already-incurred hours too — "incurred going forward" gets
the discount, so pre-change incurred hours keep the contracted rate whether or not yet billed.
Nothing silently revalues (the `toRow` silent-mutation lesson, applied to money); a retroactive
courtesy is a **visible write-down at invoicing**, never a recompute. (Rejected alternatives, each
encoding a rule: current-rate-rules — rejected because unbilled history would silently repric e;
snapshot-plus-bulk-tool — unnecessary once history is effective-dated.)

**NEW OPEN — D-CL2-3a:** the fee-affidavit export (time-tracker doc §5) assumed one uniform case
rate because that is lodestar-shaped. Under per-client rates, which rate does the affidavit carry?
Claude's lean — the rate of the client whose claim carries the fee demand — is PROPOSED, unruled.
Recorded as a noted consequence, not a decision.

**Scope note:** nothing here authorizes the time tracker; it stays parked behind CE1 (unauthorized).

## PART 6 — CL2-AC-1 ISSUED; O5 DEFERRED

**CL2-AC-1 (ID issuance CONFIRMED: "Yes."):** the 2026-07-28 auto-create-client-on-PI capture gets
its durable ID. Substance — linking a party with the Client role on a PI case auto-creates the
client damages record, because a PI client with no damages-scope record is an impossible
real-world state — remains PROPOSED, unruled. The ID exists so the question cannot die the
K-6/K-7 death.

**O5 deferred (process ruling, Claude's, stated to Michael):** confirm-or-reject on
`direction`/`conditionalDowngrade` field semantics will not be presented from memory — it needs
the fee-profile doc on screen. Declined as a voice/dictation item, not skipped silently.

## PART 7 — WHAT WAS NOT COVERED

FE-3 (needs §8 on screen); O5 (above); QR-1's exact placement inside the runner file (behavioral
locate instruction given instead — numbering may have drifted); the affidavit design under
per-client rates (D-CL2-3a, open); vision-brainstorming session (Fable-only, untouched); next
build slice (unnamed); RE-1 detail; QBO ruling; registry entries 1–10; the remaining
attorney-review-queue legal-research items.

## PART 8 — CROSS-CUTTING PATTERNS

1. **Wrong-level data storage is the recurring defect class**: charges-in-directory (FE-1a) and
   one-ladder-for-four-arcs (PR-3) are both the CL-2 lesson relocated.
2. **Silent mutation is the recurring integrity smell**: `toRow` → no silent rate revaluation
   (D-CL2-3) → visible write-downs over recomputes. Visibility over ceremony (FE-1c's label
   instead of a confirm click).
3. **Question text must outlive its container**: QR-1, K-6/K-7, CL2-AC-1's ID issuance, and the
   FE-3 verify order are all the same principle.
4. **A "real case demands it" gate can be satisfied in the same conversation it's proposed** —
   D-CL2-3's withdrawal shows the escape-hatch pattern working as intended.

## PART 9 — OPEN ITEMS

| ID | Item | Status |
|---|---|---|
| FE-3 | §8 shell-content hygiene; ALSO verify it is captured in attorney-review-queue.md at all | OPEN |
| O5 | Confirm-or-reject, doc on screen | OPEN — deferred |
| D-CL2-3a | Affidavit rate under per-client rates | OPEN — new |
| CL2-AC-1 | Auto-create client on PI client-role link | PROPOSED, unruled — ID issued |
| PR-3 | Execution | HELD for ladder design pass |
| — | Probate-ladder design session; proceeding-driven ladders question | OPEN — schedulable |
| — | Probate corpus final home (recommended ARCHIVE) | PROPOSED, unruled |
| — | Next build slice | OPEN — Michael's |
| — | Instructions v6 paste | OPEN — Michael's hand |

## PART 10 — WHAT MUST HAPPEN NEXT

1. Michael drops the packet zip into `inbox/` on a LOCAL machine (master branch, `inbox/` visible)
   and runs a QUEUE-RUNNER session.
2. Michael pastes `claude_Project_Instructions_v6_2026-08-07.md` into the project instructions.
3. After the Code push: click Sync now on the repo in the Claude project.
4. Next design sessions, in whatever order Michael wants: probate-ladder pass (corpus in hand),
   FE-3 with §8 on screen, O5 with the fee-profile doc on screen, #31–#33 review, next-slice
   naming (form engine now has no open design blockers except FE-3), vision session on Fable.

**RESUME POINT:** no question was left mid-stream. The rulings backlog's next unruled items are
O5 (doc-on-screen) and the QBO proposal reaction; the highest-leverage next design act is either
the probate-ladder pass or naming the next build slice.
