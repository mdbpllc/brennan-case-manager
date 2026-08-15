# IN-1 — ANSWER-MINING FOR DISCOVERY HOOKS (spec)

**Status: PROPOSED. Nothing here is authorized to build.** Design session, Opus 5, Cowork,
2026-08-15 Central (DT-1: clock-checked 14:58 CDT before any stamp; container read 2026-08-15 UTC
and Central agreed). CHAT-DISPATCH Task 9, one of two.

**Canonical repo path:** `docs/specs/in-1-answer-mining-spec-2026-08-15.md`

**This spec adjudicates nothing, and — unlike the FE-4/FE-5/FE-6 specs that preceded it in this
chain — it has no ruling to elaborate.** IN-1's design question is on the queue **unanswered**.
What follows is the design space, the substrate that does and does not exist, and the questions
that have to be answered before anything is buildable. **Every structure named below is PROPOSED
by this document, not ruled by Michael.** Where this spec appears to settle something, that is a
defect in this document, to be reported rather than relied on.

---

## 1. RECONCILE FIRST — what the record says before this spec says anything

Read at HEAD (`220f361`) through the device bridge, 2026-08-15 Central.

| Source | What it establishes |
|---|---|
| `attorney-review-queue.md` line 238 | IN-1 carries **⬜ = open**. Full question text retained; entered 2026-08-11 (REQ-CAPTURE §5.3). |
| Same row | *"FE-2's rulings carry as **PROPOSED defaults**: flags for Michael, never auto-add; one-click dismissal; dismissals remembered per case."* |
| Same row | *"recognizing 'this paragraph pleads an affirmative defense' is document understanding, not string matching — the Phase-1b local-LLM capability class, and the spec should say so."* |
| `anti-resurrection-ledger.md` | **No IN- row of any kind.** Nothing in the IN series is closed, withdrawn, or deliberately-not-built. |
| `form-engine.md` line 236 | The FE-2 ruling the defaults come from, and it is **about FE-2**, not IN-1 (§1.2). |
| `cd1-build-slice.md` lines 58–62 | FE-2 re-parked to the intake pipeline **explicitly**, because *"nothing in this slice (or the app today) ingests documents."* |
| `REQ-CAPTURE_trucking-multidefendant-first-sets_2026-08-11.md` line 13 | Origin. REQ-05 → IN-1. |
| `REQ-CAPTURE_deficiency-handling_2026-08-11.md` line 217 | IN-6 is *"the substrate IN-1's answer-mining runs on"* — a claim this spec cannot reconcile (§1.3). |
| `BUILD-STATE.md` (seventy-first refresh, describing `6a00f58`) | Nothing built for any IN item. T3 work **UNAUTHORIZED** (KICK-1). The intake pipeline is not a named slice. |

**Gate result: IN-1 IS OPEN — and the reason is the inverse of Task 8's.** FE-4, FE-5 and FE-6 were
open because the **build** was gated while the design was ruled. IN-1 is open because **the design
question itself is unanswered.** The queue row asks it in terms: *"Is answer ingestion a distinct
pipeline step, and where in the UI do suggestions surface?"* Nothing on the record answers either
half. This spec therefore **maps and asks**; it does not elaborate.

### 1.1 IN-1 has no design-doc home at all

Repo-wide, word-bounded, at HEAD: `IN-1` appears **16 times across 6 files** — `BUILD-STATE.md` (1),
`attorney-review-queue.md` (6), `session-log.md` (4), and three REQ-CAPTUREs (5 between them).
**It appears in no design document.** Not `form-engine.md`, not `fe-d1-build-slice.md`, not
`cd1-build-slice.md`, not `contact-directory.md`, not `email-workflow-requirements.md`, not
`db/schema.sql` or any migration.

*Recorded because a first pass of this same count was wrong and was corrected inside the session:
an unbounded `IN-1` pattern also matches **`MIN-1`**, which added four files that have nothing to do
with this item. The corrected figure is the word-bounded one above.*

Contrast FE-4, which had `form-engine.md` §13.1 to elaborate. IN-1 has the queue row and the
capture that produced it. **That is the whole record**, and it is why §2 onward is structure this
document proposes rather than structure it reports.

### 1.2 The four defaults are RULED for FE-2 and PROPOSED for IN-1 — the distinction is load-bearing

`form-engine.md` line 236, verbatim, is the **only** canonical statement of them:

> **RULING (Michael, 2026-08-07): yes.** Intake sweeps document-name columns for entity names not
> otherwise listed. Finds surface as **flags for Michael** — a catch-net, never an auto-add; nothing
> enters a disclosure without his call. The miss this prevents is the dangerous kind: no error,
> output looks complete, a provider silently omitted. Because document names are messy
> (abbreviations, records vendors, misspellings), **dismissal is one click and dismissals are
> remembered per case** so the engine doesn't re-ask every draft.

That ruling is about **sweeping document-name columns for omitted billing entities in a
disclosures draft.** IN-1 reads a **filed pleading** and proposes **discovery requests**. The queue
carries the four behaviours to IN-1 as **PROPOSED defaults** and says so in that word. This spec
uses them as its working posture and **does not treat them as ruled here.** Two restatements
elsewhere are lossy and should not be quoted in their place — `cd1-build-slice.md` line 62 drops
"one click," and the queue row re-labels the whole set PROPOSED.

### 1.3 A claim in the record this spec cannot reconcile, reported not resolved

`REQ-CAPTURE_deficiency-handling_2026-08-11.md` line 217, verbatim:

> Mirror of the propounding-side ingestion; **the substrate IN-1's answer-mining runs on.**

But IN-6's own definition on the same line is *"parse a served **response set** into structured
items (instrument type, number, request text, objections[], answer text)"* — a **discovery response
document**. IN-1's input, per its origin at trucking-capture line 13 and §5.3, is *"a defendant's
filed **answer**"* — a **pleading**.

**Those are different documents of different kinds, arriving at different times, from different
procedural moments.** The most economical reading is that the word *answer* is doing two jobs: the
`answer_text` field of a `response_item`, and the responsive pleading. **Stated as a reading, not
as an error** — the queue and the capture are both append-only and both stand as written. The
consequence is concrete and is why it cannot be left implicit: **IN-1 cannot silently inherit
IN-6's parser or its entity shape.** Carried as **Q-IN1-3**.

### 1.4 The elicitation caveat fires here

The queue's IN-series heading note, verbatim:

> **Elicitation caveat, kept on the record: the IN-series naming rode inside ruling 1's "Yes on 1";
> if Michael meant FE numbers instead, renaming is a one-word veto before these IDs get
> load-bearing.**

**A spec is the thing that makes an ID load-bearing.** This document and its sibling are the first
artifacts to build structure on top of `IN-1` and `IN-3` as names. The veto is still one word today
and will be more expensive after. Raised, not decided — **Q-IN1-8**.

---

## 2. Scope

### 2.1 What IN-1 is

A **pipeline step that reads a received pleading and produces advisory hooks.** Given a defendant's
filed answer, it locates passages that plead something affirmatively or deny capacity, classifies
each as a **hook**, and offers **request stubs** — draft contention-interrogatory, RFP and RFA text
aimed at that pleading — for the attorney to accept, edit, or dismiss.

Live evidence of record (trucking capture, REQ-05): two affirmative statements in the defendants'
answers — *an alternative-benefits-policy assertion* and *a wrong-capacity/not-proper-party denial* —
**each generated a contention interrogatory, an RFP, and RFAs.** One human read produced six
instruments' worth of targeted discovery from two paragraphs. That is the value; the risk is in §5.

### 2.2 What IN-1 is not, structurally

It is **not** an extraction of facts into the case record (that is IN-2, whose home is ruled at
`contact-directory.md` §7). It is **not** a parse of a discovery response set (IN-6). It is **not**
contradiction detection across the produced record (IN-7). It is **not** disclosure-mining (IN-5).
The four are siblings on one pipeline and their boundaries are already drawn on the queue; this
spec stays inside its own.

### 2.3 Legal substrate — already on the registry, deduped, nothing added

IN-1 relies on the proposition that contention discovery is available at all. **Every entry it
needs already exists**, all in `legal-rule-registry-discovery-enforcement-and-pleading.md`, all
**UNVERIFIED**:

| Entry | Proposition as written | Status |
|---|---|---|
| TRCP 192.3(j) | *"A party may obtain discovery of the other party's legal contentions and the factual bases for them."* | UNVERIFIED |
| TRCP 197.1 | *"Interrogatories may inquire into any matter within the scope of discovery … and may ask the responding party to state the legal theories and describe in general the factual bases for its claims or defenses."* | UNVERIFIED |
| TRCP 197.2(c) | records-reference answers must specify the records in sufficient detail | UNVERIFIED |
| *In re Sting Soccer Group, LP*, 2017 WL 5897454 | contention discovery permissible; sustaining unsupported objections is an abuse of discretion | UNVERIFIED, **reporter-cite check flagged** |
| *In re Ochoa*, 2004 WL 1192444 | contention discovery is not work product | UNVERIFIED, **reporter-cite check flagged**; on Michael's list as *"V-2, Ochoa first"* |

**This spec proposes no new proposition, supplies no cite, upgrades none, moves no status, and
touched no registry file.** No case-law retrieval was run — the four entries were located by a
dedupe grep at HEAD and the citator pass has already dispositioned *Ochoa*. Re-retrieving would
duplicate **V-2**. Only Michael verifies.

---

## 3. Inputs and outputs

**PROPOSED. Not a schema, not authorized, nothing to build from.**

### 3.1 Inputs the step cannot compute and must be given

| Input | Scope | Why it cannot be derived |
|---|---|---|
| The filed answer, as a document with a readable text layer | per (case, filing) | An external event. **No ingestion surface exists** (§4.1) |
| Which roster party filed it | per (case, party) | The caption names a filer; matching that string to a `case_parties` row is a guess, and a guess here mis-aims every downstream stub |
| Date filed, and whether the pleading is original / amended / supplemental | per filing | Selects whether earlier hooks survive (**Q-IN1-6**) |
| Practice area and case type | case | Bounds which stub families are plausible at all |
| The case's prior dismissals | per case | The remembered-dismissal set — the PROPOSED default that stops re-asking |

### 3.2 Outputs, all advisory

- **Hooks.** Zero or more, each: the located passage (quoted, with its position in the source), a
  hook class, the target party, a confidence, and the reason the passage was selected.
- **Suggested request stubs.** Draft contention-interrogatory / RFP / RFA text per hook. **PROPOSED
  text only** — nothing is added to any instrument, set, or item table by this step.
- **A dismissal record** per rejected hook, scoped to the case.
- **Nothing else.** No roster write, no fact-table write, no registry write, no instrument write.

### 3.3 Three properties the sketch asserts

1. **The step reads; it never writes into an instrument.** The boundary is the same one
   `form-engine.md` draws at §5 for warning gates — *"wizard-screen only … Generated text is
   identical regardless of gate state."*
2. **Recognition is document understanding, not string matching**, so it carries a confidence and
   can be wrong in **both** directions. The queue row says this in terms and this spec says it
   again because it governs the UI (§5.3).
3. **No suggestion becomes an item without an attorney act.** The registry discipline transposed:
   *automation flags, only Michael verifies.*

---

## 4. Data-model touchpoints

**Nothing in this section exists today.** Verified at HEAD against `db/schema.sql` (36
`create table` statements) and `db/migrations/`.

### 4.1 There is no surface for a received document

`generated_documents` (`db/schema.sql` line 515) is the only table whose rows are documents:

```
doc_type text not null check (doc_type in ('reasonable-value-report')),
audience text not null default 'internal' check (audience in ('internal','lienholder','client','opposing')),
privilege_tier text not null default 'work-product' check (...),
content text not null,
```

Three things follow, and the third is the one that matters most. **The `doc_type` CHECK admits
exactly one value.** **`content` is inline** with no storage path and no source-file pointer. And
**this table holds documents the app GENERATES, not documents it RECEIVES** — IN-1's input travels
the opposite direction and **no table holds it.** `cd1-build-slice.md` states the same from the
other side: *"nothing in this slice (or the app today) ingests documents."*

The nearest ingest-and-extract precedent is `oaa_intakes` (line 771), whose own comment reads
*"Audit record of an OAA intake: which template ran, on what text, what it extracted (fields_json
carries value/confidence/provenance per field)."* Its provenance lives **inside untyped
JSON-in-`text`**. If IN-1 wants typed provenance, that is new construction, not an extension.

### 4.2 The suggest → dismiss → remember pattern already exists, keyed wrongly

The house pattern is the transcript inbox. `staging_items` (line 664) carries
`suggestions jsonb not null default '[]'` and
`status … check (status in ('pending','confirmed','dismissed','held'))`; `routing_decisions`
(line 683) is described in the schema's own comment as *"The tuning log: suggested vs. chosen on
every routing decision … the evidence base for ever enabling auto-file (D1),"* and carries
`was_suggestion_accepted boolean not null`.

**D1 — auto-file deliberately OFF — is the standing in-repo precedent for never-auto-add**, and it
is the same posture the FE-2 ruling states in words. IN-1 should be built on it rather than beside
it.

**The one structural mismatch: `routing_decisions` is keyed to `staging_item_id`, not `case_id`.**
IN-1's remembered dismissals are **per case** by their PROPOSED default, so the key is different
and the shape cannot be reused unchanged.

A second reusable quartet is on `bill_line_items` (line 335):
`mapping_status … ('unmapped','suggested','confirmed')`, `suggestion_confidence numeric(4,3)`,
`mapping_source … ('chargemaster_memory','attorney')`, `confirmed_by` / `confirmed_date` — machine
suggested it, an attorney confirmed it, and the record says which.

### 4.3 Capacity denials have a target but no state

`case_parties.capacity_kind` (line 120) is
`check (capacity_kind is null or capacity_kind in ('individually','next-friend-of','representative-of-estate-of','dba'))`.
**Four values, none of them a denied or contested state.** A defendant pleading "not a proper
party" is asserting that the roster's capacity is wrong; the schema has no way to hold that
assertion alongside the capacity it disputes.

`case_roster_flags` (line 146) is the established *"could not be resolved mechanically, do not
guess"* shape — `reason`, `unmapped_value` (*"preserved verbatim; nothing is lost"*), `resolved_at`
— and is the natural home for a capacity-denial flag. **One obstacle, stated so no slice discovers
it mid-build: it carries `unique (case_party_id)`.** One flag per roster entry. An answer raising
two hooks against the same party exceeds that constraint as written.

### 4.4 Where hooks live is genuinely undecided

`contact-directory.md` §7 **RULED** the home of source attribution: the case-scoped fact table
`{fact_id, value, source_document, source_field, extraction_method, verified_by_attorney}`, *"not
on directory entries and not in a sidecar,"* with *"no threshold ever auto-verifies."* That table
does not exist — all six field names return zero repo-wide — and BUILD-STATE lists the IN-2 fact
table as explicitly **OUT** of the CD-1 slice.

Whether an IN-1 hook **is** a fact of that kind is not decided anywhere. A capacity denial asserts
something about the case, sourced to a document, at a confidence — which is §7's shape exactly. A
suggested request stub is not a fact about anything; it is a proposal. **Carried as Q-IN1-4.**

### 4.5 What any new table must carry

`ALTER DEFAULT PRIVILEGES` is **deliberately not set** — the schema's own note reads *"Any
migration adding a table must add its own grant."* Every table this spec's design space implies
ships, **in the same commit as the table**: `enable row level security`, its
`for all to authenticated using (true) with check (true)` policy, its own
`grant select, insert, update, delete … to authenticated`, and an RLS-probe extension. `anon` gets
nothing. This is the #28 / CL-2 / CD-1 lesson and it is standing practice.

---

## 5. Flag-don't-decide semantics

### 5.1 The four judgments IN-1 must never make

1. **Whether a paragraph pleads an affirmative defense.** That is a legal characterization. The
   step locates and proposes; the attorney characterizes.
2. **Whether a hook is worth pursuing.** Strategy.
3. **Whether a stub's text is right.** `form-engine.md` §1 makes Michael's ownership of routine
   wording a settled principle; a stub is wording.
4. **Whether a denial is well-founded.** A not-proper-party denial may be correct. Nothing here
   evaluates it.

The in-repo formulation to build to is `form-engine.md` line 323: *"the engine computes arithmetic,
never characterizes."* IN-1 does not even compute arithmetic — it reads prose and proposes prose,
which is further from certainty, not closer.

### 5.2 The registry discipline transposes cleanly

CLAUDE.md, binding: *"A model asserting legal currency never counts as verification"* and
*"Unverified rules may exist in the registry and drive warnings/placeholders, never computed legal
outcomes."* `contact-directory.md` §7.3 applies the same rule to facts: confidence scores *"order
the review queue … and drive display flags; no threshold ever auto-verifies."* IN-7 states the
sibling posture for the same capability class: *"flags only, never conclusions."*

**PROPOSED for IN-1: no confidence value, at any threshold, ever promotes a hook into a request.**

### 5.3 The asymmetry that should shape the UI

A false positive costs one dismissal click. **A false negative is silent** — a hook the attorney
never sees, in a list that looks complete. That is precisely the failure the FE-2 ruling was
written against: *"no error, output looks complete, a provider silently omitted."*

**PROPOSED, and offered as the concrete design consequence: the surface states coverage, not
completeness.** It reports what it read and what it proposes, and never implies that what it did
not flag is clean. This is a UI posture, not a feature, and it is cheap only if it is decided
before the screen is built.

---

## 6. Non-goals

- **Not a build authorization.** The intake pipeline is not a named build slice. FE-D1 is the only
  authorized form-engine slice and it contains no ingestion — the word does not appear in
  `fe-d1-build-slice.md` at all.
- **Does not build the ingestion surface.** No documents table exists; T3 is **UNAUTHORIZED** under
  KICK-1 per BUILD-STATE, so the capability arm has no authorization today either.
- **Does not do IN-5's, IN-6's or IN-7's work**, and does not answer IN-5's queue question about
  how the two sets of suggestions interact — that question is IN-5's and stays there.
- **Does not draft requests.** The drafting skill (`docs/skills/drafting-disclosures/SKILL.md`,
  design-side, Code must never edit it) and the form engine own instrument text.
- **Does not create the item model.** Items are FE-6 / slice 2; *"nothing in FE-D1 creates items."*
- **No registry change of any kind.** The five entries in §2.3 are pointed at, not restated as new,
  not verified, not moved.
- **No client data.** Every example here is structural or comes from the client-clean capture.

---

## 7. Open questions — FULL TEXT (QR-1)

Packet-local IDs only. **No durable IDs are minted.** `Q-IN1-` was collision-checked repo-wide at
HEAD and is free; `IN-` is an existing durable namespace and minting into it is Michael's act.
`ID-DL-1` — already governing the Task 6, Task 7 and Task 8 packets' question series — is the open
question about which series packet-local questions join. **This packet makes it four.**

**Q-IN1-1.** The queue's own question, unanswered: *"Is answer ingestion a distinct pipeline step,
and where in the UI do suggestions surface?"* Three surfaces exist to build on and they are not
equivalent. (a) The **/inbox pattern** — staging items with ranked suggestions and confirm-to-file,
which already has the suggest/dismiss/tuning-log machinery but is transcript-shaped and
case-agnostic at entry. (b) A **case-detail tab or card**, alongside the roster-flag card's
Mark-handled affordance, which is case-scoped by construction but adds a surface. (c) **Inside the
drafting flow**, where hooks appear only when a set is being built, which guarantees they are seen
in context but means an answer filed today surfaces nothing until someone drafts. Which, and is
answer ingestion its own step or a mode of a general document-intake step that does not exist yet?

**Q-IN1-2.** The scope of "denials" differs between the two statements of this requirement. The
origin capability sentence (trucking capture, REQ-05) reads *"flag affirmative pleadings and
denials that support contention discovery"* — denials unqualified. The §5.3 question and the queue
row both read *"affirmative defenses and **capacity** denials."* The practice moment cited is a
*"wrong-capacity/not-proper-party denial."* **Is IN-1 scoped to the capacity/not-proper-party
class, or to any denial that supports contention discovery?** The second is a much larger surface
— a general denial of a pleaded allegation is a hook by that reading, and most answers deny most
allegations.

**Q-IN1-3.** `REQ-CAPTURE_deficiency-handling_2026-08-11.md` calls IN-6 *"the substrate IN-1's
answer-mining runs on,"* but IN-6 parses *"a served response set into structured items (instrument
type, number, request text, objections[], answer text)"* — a discovery response — while IN-1's
input is *"a defendant's filed answer"* — a pleading. **Which is meant?** If IN-6 really is the
substrate, then IN-1's subject is the `answer_text` of response items and its name is misleading.
If the pleading is the subject, IN-1 needs an ingestion path IN-6 does not provide, and the
dependency stated on the queue is not a dependency at all. Both readings change what gets built
first.

**Q-IN1-4.** Do IN-1's hooks land on the **IN-2 case-scoped fact table** whose home
`contact-directory.md` §7 already ruled — `{fact_id, value, source_document, source_field,
extraction_method, verified_by_attorney}` — or in a separate annotation store? A capacity denial
has §7's exact shape: an assertion about the case, sourced to a document and field, extracted by a
method, awaiting attorney verification. A **suggested request stub** does not: it is a proposal,
not a fact. **Does IN-1 split — denials to the fact table, stubs somewhere else — or does the fact
table stay IN-2's alone?**

**Q-IN1-5.** What is the **identity of a dismissed hook**, given that dismissals are remembered per
case? If identity is the source passage's text, an amended answer that restates the same defense in
different words re-offers a hook the attorney already rejected. If identity is (party, hook class),
a second genuinely different affirmative defense of the same class is silently suppressed —
**which is the dangerous direction, because a suppressed hook is invisible.** Is there a third
identity, and does a dismissal ever expire?

**Q-IN1-6.** **Amended and supplemental answers.** An amended answer supersedes the original as the
live pleading. Do hooks from the superseded pleading survive, and do dismissals carry forward to
the restated version? A defense dropped on amendment is a fact worth surfacing in its own right;
so is a defense added.

**Q-IN1-7.** CLAUDE.md's data-hygiene rule reads: *"PHI-touching AI processing (transcription,
bill/EOB ingestion) runs **locally** on Michael's GPU machine by design — this is a privilege/PHI
posture, not a hosting shortcut. Do not introduce cloud AI processing of case documents without an
explicit decision from Michael."* **Is a publicly-filed answer inside the "case documents" that bar
covers?** The document itself is a public court filing; the *fact that this firm is reading it for
this client's case* is work product. If the bar applies, IN-1 is gated on the GPU arm — which
BUILD-STATE reports as **T3 WORK IS UNAUTHORIZED** until KICK-1's missing kickoff doc is located or
re-issued. **This question decides whether IN-1 is a near-term item or a Phase-1b one**, and it is
yours.

**Q-IN1-8.** The IN-series elicitation caveat says renaming is *"a one-word veto before these IDs
get load-bearing."* This spec and its IN-3 sibling are the first artifacts to build structure on
`IN-1` and `IN-3` as names. **Does the IN series stand?** Answering now costs one word; answering
after a build costs a rename across a schema.

**Q-IN1-9.** Multi-defendant cases produce **one answer per defendant** — the trucking posture ran
five answering entity defendants plus an unserved driver. Is the unit of work **per answer** (five
independent hook sets, five dismissal ledgers) or **per case** (one merged list)? The FE-5 spec
found the interrogatory budget to be pairwise per (propounding, responding) party; hooks look
pairwise too, and a merged list would collapse five defendants' distinct pleadings into one
undifferentiated queue.

---

## 8. Provenance and status

- Every repo fact in §§1–4 was read **at HEAD through the device bridge**, not from RAG. Checkout
  state: on `master` at **`220f361`**, `git status -sb` showing `## master...origin/master` with no
  divergence and `rev-list --left-right --count` returning `0 0` — **but UNFETCHED**, because the
  bridge returns `HTTP 403 from proxy` on `git fetch`, so that comparison is a local-ref comparison
  and **not** a QR-3 gate pass. The known **CRLF false-DIRTY** was re-observed with its exact
  signature: 200 porcelain lines, `git diff --stat` = **199 files / 37,271 insertions / 37,271
  deletions**. Not a genuinely dirty tree (documented #74, re-observed #81).
- **No registry file was opened for writing. No legal proposition is asserted, supplied, upgraded,
  or moved by this document.** The five entries in §2.3 already existed and were located by dedupe.
- **No case-law retrieval was run**, deliberately — see §2.3. Descrybe not used (TOOLING, 08-13);
  Q-6 posture untouched.
- **Nothing in `attorney-review-queue.md`, `form-engine.md`, `cd1-build-slice.md`,
  `contact-directory.md` or any capture was edited.** This is a separate document that points at
  them.
- Nothing here is verified. **Only Michael verifies.**
