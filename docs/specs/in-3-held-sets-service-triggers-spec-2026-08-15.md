# IN-3 — HELD SETS WITH SERVICE TRIGGERS (spec)

**Status: PROPOSED. Nothing here is authorized to build.** Design session, Opus 5, Cowork,
2026-08-15 Central (DT-1: clock-checked 14:58 CDT before any stamp; container read 2026-08-15 UTC
and Central agreed). CHAT-DISPATCH Task 9, two of two.

**Canonical repo path:** `docs/specs/in-3-held-sets-service-triggers-spec-2026-08-15.md`

**This spec adjudicates nothing.** IN-3 is **half pre-answered and half open**, and the two halves
are kept apart throughout. The trigger-source question was **pre-answered at intake** — MANUAL
attorney input only for v1, per the standing Q-6 posture — and this document treats that as settled
and does not reopen it. **What is open is the queue's own question: "What does the HOLD lifecycle
look like in the document model?"** Everything §2 onward proposes toward that question is PROPOSED
by this document, not ruled. Where this spec appears to settle something, that is a defect in this
document, to be reported rather than relied on.

**The deadline half of IN-3 is deliberately a POINTER, not a restatement** — see §4.

---

## 1. RECONCILE FIRST — what the record says before this spec says anything

Read at HEAD (`220f361`) through the device bridge, 2026-08-15 Central.

| Source | What it establishes |
|---|---|
| `attorney-review-queue.md` line 240 | IN-3 carries **⬜ = open**. Full question text retained; entered 2026-08-11 (REQ-CAPTURE §5.4). |
| Same row | Trigger source **PRE-ANSWERED for v1: MANUAL attorney input only**, *"docket-watch is CourtListener integration, which is UNAUTHORIZED; the upgrade path routes through Q-6 whenever that is revisited, so this never becomes a second unguarded door into the same integration."* |
| Same row | Cross-link 2026-08-12: *"IN-4 now holds the full instrument lifecycle; IN-3's HOLD/trigger stands separate as **the pre-service fragment**."* |
| `anti-resurrection-ledger.md` | **No IN- row of any kind.** Nothing in the IN series is closed, withdrawn, or deliberately-not-built. |
| `REQ-CAPTURE_trucking-multidefendant-first-sets_2026-08-11.md` line 16 | Origin, REQ-08 → IN-3, with the live evidence (§2.2). |
| `REQ-CAPTURE_deficiency-handling_2026-08-11.md` line 222 | DE-2 cross-links IN-3; *"Q-6 posture untouched — triggers are MANUAL for v1; no docket-watch."* Independent restatement. |
| `email-workflow-requirements.md` line 111 (WF-8) | The **only** design-doc mention of IN-3 anywhere (§1.1). |
| `cd1-build-slice.md` lines 50–52 | The service-story fields were **deliberately withheld for the first instrument consumer** (§1.2). |
| `deadline-engine-service-and-response-2026-08-14.md` | Task 6's memo — IN-3's release event is where its per-(instrument, party) service date is born (§4). |
| `BUILD-STATE.md` (seventy-first refresh, describing `6a00f58`) | Nothing built for any IN item; no deadline engine; **CourtListener integration UNAUTHORIZED (Q-6)**; T3 **UNAUTHORIZED** (KICK-1). |

**Gate result: IN-3 IS OPEN, and what is owed is exactly a spec of the HOLD lifecycle.** The trigger
half is settled and stays settled; the document-model half has never been designed anywhere.

### 1.1 IN-3 has one design-doc mention, and it is a cross-reference

Repo-wide, word-bounded, at HEAD: `IN-3` appears **15 times across 7 files** — `BUILD-STATE.md` (1),
`attorney-review-queue.md` (5), `session-log.md` (4), three REQ-CAPTUREs (4 between them), and
**`email-workflow-requirements.md` (1)**. That last one, WF-8, verbatim:

> **WF-8** | Service of process | Cross-links the CD-1-deferred SERVICE-STORY FIELDS ("land with the
> first instrument consumer") and **IN-3/IN-4's service events** — WF-8's board is evidence FOR that
> revisit, not a separate structure. T3 for inbox detection of returns.

Three things ride in that one line: IN-3 co-owns **service events** with IN-4; WF-8's
service-status board is **not** a separate structure and must not be designed as one; and inbox
detection of returns is gated on **T3**, which is unauthorized.

*Recorded because a first pass of this same count was wrong and was corrected inside the session:
an unbounded pattern for the sibling ID `IN-1` also matches `MIN-1`. Both counts here are the
word-bounded ones.*

### 1.2 IN-3 may be the event CD-1 deliberately waited for — and the record does not say

`cd1-build-slice.md` Scope-OUT, verbatim:

> - **Service-story fields** (spec §6.2): the shape stands in the spec, but unconsumed columns
>   invite drift — they land with the first instrument consumer, as the living spec's first
>   planned revisit.

The CD-1 migration says the same in its own header comment (lines 24–26): *"It adds NO service-story
columns. They are explicitly Scope-OUT: the shape stands in the spec, but unconsumed columns invite
drift, so they land with the first instrument consumer."*

The shape itself is **RULED** at `contact-directory.md` §6.2 — the service story lives on the roster
entry, decomposed as mode (controlled list), service target as a directory contact, and statutory
basis as a registry reference; *"Slot definitions carry service-path hints (§4.1); roster entries
carry service facts."* **Ruled and standing; only the columns were deferred.**

**Who "the first instrument consumer" is has never been named.** IN-3 releases a held instrument to
a target; IN-4 executes and stamps the service event. Both are candidates and neither has a claim
on the record. This is not a gap this spec can close — carried as **Q-IN3-3**.

---

## 2. Scope

### 2.1 What a HOLD is

**A HOLD is a state on an assembled, unserved instrument whose release is gated on an external
event that has not happened yet.** It is not a draft state (the document is finished), not a queue
(nothing is waiting on the firm), and not a deadline (nothing is running). It is a **readiness
parked against a condition**.

The condition, for v1, is entered by the attorney. The record names two: **answer filed** and
**appearance**.

### 2.2 The live evidence, and the shape it implies

From the origin capture, REQ-08, verbatim:

> Practice moment: one full set was drafted for a defendant who has not yet appeared, with a
> placeholder certificate of service; it must not be served until appearance. Capability: a set
> status of HOLD with a defined trigger event (answer filed / appearance) that surfaces a prompt to
> finalize and serve.

The same capture's §1 gives the posture: *"Six discovery sets were produced in one session: five to
answering entity defendants and one held for the unserved-appearance driver."*

**That is one wave, six documents, five served, one held — so HOLD attaches per (instrument,
target), not per wave and not per case.** This is the third time this chain has found the same
per-target structure: FE-5 found the interrogatory budget keys on the (propounding, responding)
pair; FE-6 recorded that separate-mode packaging multiplies generated rows per target; HOLD keys
the same way. **Recorded as a structural observation, not a ruling.**

### 2.3 What the release produces

A trigger firing produces **a prompt to finalize and serve — never a service, never a filing, and
never a conclusion that the trigger occurred.** §5 states that boundary in full, because it is the
one place a well-meaning implementation would quietly cross a line the record has drawn three
separate times.

---

## 3. Inputs and outputs

**PROPOSED. Not a schema, not authorized, nothing to build from.**

### 3.1 Inputs the step cannot compute and must be given

| Input | Scope | Why it cannot be derived |
|---|---|---|
| The held instrument (or set) and its target | per (instrument, party) | Nothing today generates, assembles, or stores an instrument (§6.1) |
| The trigger condition, chosen at hold time | per hold | Attorney's choice; "answer filed" and "appearance" are the two on the record |
| **The trigger occurrence** | per (case, party) | **An external event with no source in the schema** — no case-event table, no docket table, no appearance or answer-filed column anywhere (§6.3). For v1 it is attorney-entered, by ruling |
| The service story for the target | per roster entry | Ruled at `contact-directory.md` §6.2; **columns deliberately not built** (§1.2) |
| The actual service date and method | per (instrument, party) | IN-4's service event. **This is the deadline anchor** (§4) |

### 3.2 Outputs

- **A finalize-and-serve prompt**, surfaced when the attorney records that the trigger occurred.
- **A released instrument**, whose certificate-of-service date IN-4 stamps at the service event —
  *"stamped at service time, never typed into the text."*
- **A service event** that becomes the anchor for that recipient's response clock. **IN-3's
  responsibility ends at the event; the clock is §4's pointer, not this spec's arithmetic.**
- **A held instrument that is never released** is also an output, and it is the one the record has
  no answer for (**Q-IN3-6**).

### 3.3 Two properties the sketch asserts

1. **The hold is on the pair, not the wave.** Releasing one target's instrument changes nothing
   about the other five.
2. **Release is an event, not a status flip.** §4 is why: things downstream have to be able to hear
   it.

---

## 4. The deadline consequence — a POINTER, deliberately not a restatement

CHAT-DISPATCH Task 9 requires that IN-3 point at Task 6's deadline-engine work rather than
duplicate it. **This section is that pointer and adds no proposition of its own.**

The work lives at **`docs/specs/deadline-engine-service-and-response-2026-08-14.md`** (filed #75).
It carries **seven propositions, P-1 through P-7, all UNVERIFIED**, plus five open questions with no
durable IDs. **This spec restates none of them as new, asserts none, supplies no cite, and moves no
status.** Three of its findings bear on IN-3's design and are referenced by ID only:

- **The release event is where a per-(instrument, party) service date comes into existence.** The
  memo's §7 input table names exactly that row — *"Request service date, per instrument, per
  recipient | per (instrument, party) | The response-clock anchor; ties to IN-4's service-event
  binding."* A held set has no such date until it is released and served. **IN-3 is the moment that
  input is created.**
- **A release is therefore a cascade trigger, not a note.** The memo's §7 lists *"a party served or
  joined"* and *"a service date corrected"* among its recompute events, and says of all of them:
  *"Each is a **cascade**, not a note."* Design consequence for IN-3, and the reason §3.3 says
  release is an event: **whatever fires on release has to be audible to a deadline engine that does
  not exist yet.** Building release as a private status change forecloses that cheaply and
  invisibly.
- **The practice weight of releasing a held set is higher than it looks, and the memo says why.**
  Its §2 finding — **P-1**, which it calls *"the highest-priority verification in this memo"* — is
  that on the July 2026 text the 50-day discovery-response extension is Family-Code-only, so a PI
  or civil-litigation defendant served before its answer is due has a flat 30 days, with Rule
  198.2(c) making the consequence automatic. **A held set is precisely a set aimed at a defendant
  whose answer is not yet due.** That is the population P-1 governs. **P-1 is UNVERIFIED and its
  verification is Michael's act; nothing here treats it as settled** — it is named because IN-3's
  release is the moment it would bite, and the memo's own Q1 asks it of Michael directly.

**Nothing else from the memo is carried here.** Service-method effects, the case-wide/per-party
split, the Level 1/2/3 interactions and the inputs/outputs sketch stay in that document, where they
are already reconciled.

---

## 5. Flag-don't-decide semantics

### 5.1 The prompt prompts; the attorney serves

**The app does not serve. It does not file. It does not conclude that an appearance happened.** All
three restraints have independent sources on the record:

- **The trigger.** MANUAL for v1, pre-answered at intake and restated at DE-2. Automating it means
  docket-watch, which means **CourtListener integration, which is UNAUTHORIZED under Q-6.** The
  queue row states the reason in terms: *"so this never becomes a second unguarded door into the
  same integration."* Any future automation routes through Q-6, not around it.
- **Filing and service through the app.** Task 7's Bexar memo (#80) records that **filing through
  the app means becoming or contracting with an OCA-certified EFSP — "same class as Q-6; nothing
  proposes it."** The same memo records that **the filing moment itself is contested and not
  settled** (TRCP 21(f)(5) transmission-to-EFSP against a Bexar county-court sentence fixing it at
  clerk acceptance, with TRCP 3a(b) in the middle — **LR-LOOK-1**, Michael's). A "serve" button is
  therefore out of scope twice over: unauthorized, and aimed at a moment the record has not fixed.
- **The event.** No source in the schema can tell the app that a defendant appeared (§6.3). An
  inference from any other signal would be a guess wearing a timestamp.

### 5.2 Where relief needs an act, output a prompt

The deadline memo's §7 states the principle for its own domain: *"The engine computes; it does not
extend. Where relief requires a motion (190.5), the output is a prompt, not a date."* **IN-3 is the
same principle one layer up:** where release requires a professional judgment — is the appearance
real, is the set still right, is service appropriate today — the output is a prompt, not an act.

### 5.3 The judgments IN-3 must never make

1. **That the trigger occurred.** Attorney-entered, v1, by ruling.
2. **That the held instrument is still correct.** Months can pass. The petition may have been
   amended, the roster may have changed, a definitions set may have been re-versioned
   (**Q-IN3-8**). Nothing in a HOLD re-validates its own contents.
3. **That service is appropriate now.** Appearance makes service permissible, not obligatory.
4. **What the response deadline is.** That is derived, downstream, and unbuilt — §4.

---

## 6. Data-model touchpoints

**Nothing in this section exists today.** Verified at HEAD against `db/schema.sql` (36
`create table` statements) and `db/migrations/`.

### 6.1 HOLD cannot be expressed on a document today

`generated_documents` (line 515) is the only table whose rows are documents, and it has **no status
column of any kind** — not a lifecycle state, not a hold flag, nothing. Its `doc_type` CHECK admits
**exactly one value** (`'reasonable-value-report'`), its `content` is inline *"until document
storage lands,"* and it carries **no parent or set grouping column**, so the "set" in "held set" has
no structural existence either.

### 6.2 The vocabulary exists; the object does not

The token `held` appears in the schema exactly twice, both on the transcript inbox:

```
status text not null default 'pending'
  check (status in ('pending','confirmed','dismissed','held')),     -- staging_items
```
```
action text not null
  check (action in ('confirmed','reassigned','split','not-case-related','held')),  -- routing_decisions
```

**That is prior art for the word, not for the thing.** Neither is on a document; neither carries a
trigger condition, a trigger occurrence, or a release. The nearest existing lifecycle vocabulary
elsewhere is `case_parties.active_state … ('active','withdrawn','substituted-out')` and
`bill_line_items.mapping_status … ('unmapped','suggested','confirmed')` — both closed CHECK
vocabularies, which is the house pattern a HOLD state would follow.

### 6.3 The trigger has no source, and that is the sharper gap

Proven absent repo-wide at HEAD: **no case-event table, no docket table, no `appearance` column, no
`served_at`, no `certificate`, no `due_date`.** `case_parties.joined_by` is
`check (joined_by is null or joined_by in ('intake-slot','amendment','court-action','substitution'))`
— no `'answer'` and no `'appearance'` value. `calendar_events.event_type` is
`('hearing','deadline','appointment','reminder','other')` — likewise none.

**But the two trigger facts were already observed, at party level.** The origin capture's
entity-level merge-field inventory includes **`{{answer_filed_date}}`** and **`{{appeared}}`
(bool)** — the drafting session needed both, per defendant, and wrote them down. **That is evidence
the trigger state belongs on the roster entry rather than on the document**, which would also put
it next to the service story §6.2 already ruled onto the same row. Offered as evidence, not as a
decision — **Q-IN3-5**.

### 6.4 A naming collision that will bite silently if it is not caught now

`service_date`, `service_start` and `service_end` **already exist** on `medical_bills` and
`bill_line_items`, where they mean **medical dates of service**. A service-of-process column named
`service_date` would read correctly to a lawyer and wrongly to anyone reading the schema.
**PROPOSED: `served_on` / `service_of_process_*` for anything IN-3 or IN-4 adds.** Cheap now,
expensive after a migration.

### 6.5 The roster is history, and a held set depends on that

`case_parties` carries the comment, verbatim: *"CD-1 §4.3: entries are HISTORY, not snapshot (FE-8
and IN-4 both need 'who was in this case when this instrument went out')."* A set held in March and
released in September is exactly the case that comment was written for. **The dependency already
exists and is already built** — the one CD-1 item that is unrun is item 7, the live migration, and
it is Michael's hand.

### 6.6 What any new table must carry

**This project issues no `ALTER DEFAULT PRIVILEGES`** — *"Any migration adding a table must add
its own grant"* — **and the database nonetheless carries one: Supabase's bootstrap default, whose
withholding of the four DML privileges is what makes an ungranted table unreachable (C-2 as
RESTATED 2026-08-19).** Every table this design space implies ships, **in the same commit as the
table**: `enable row level security`, its `for all to authenticated using (true) with check (true)`
policy, its own `grant select, insert, update, delete … to authenticated`, and an RLS-probe
extension. `anon` is granted none of the four DML privileges.

---

## 7. Non-goals

- **Not a build authorization.** The intake pipeline is not a named build slice; FE-D1 is the only
  authorized form-engine slice and contains no ingestion and no instrument lifecycle.
- **Not IN-4's lifecycle.** `generated → delivered → attorney-edited → finalized → served`, the
  certificate-of-service date bound to the service event, and mixed service across a document
  family are IN-4's. The queue says IN-3 *"stands separate as the pre-service fragment"* and this
  spec stays there. **It does not claim the certificate-of-service object** — see Q-IN3-4.
- **No docket-watch, no CourtListener, no EFSP, no e-service, no filing.** Q-6 unchanged; Task 7's
  EFSP finding unchanged; nothing here proposes either.
- **Does not design WF-8's service-status board.** WF-8's own row says the board is *"evidence FOR
  that revisit, not a separate structure."*
- **Does not restate the deadline propositions.** §4 points; it does not derive. No proposition is
  asserted, supplied, upgraded, or moved.
- **No registry change of any kind**, and no case-law retrieval was run.
- **No client data.** The live evidence is from the client-clean capture.

---

## 8. Open questions — FULL TEXT (QR-1)

Packet-local IDs only. **No durable IDs are minted.** `Q-IN3-` was collision-checked repo-wide at
HEAD and is free; `IN-` is an existing durable namespace and minting into it is Michael's act.
**`ID-DL-1` now governs four packets' question series** — Task 6, Task 7, Task 8, and this one.

**Q-IN3-1.** The queue's own question, unanswered: *"What does the HOLD lifecycle look like in the
document model?"* Concretely, it decomposes into four: **(a)** what are the states — is HOLD a value
in one lifecycle vocabulary alongside IN-4's `generated → delivered → attorney-edited → finalized →
served`, or a separate flag that can coexist with any of them? **(b)** What transitions are legal —
can a held instrument be edited, re-rendered, or withdrawn without being served? **(c)** Who or what
can release — only the attorney, or can a recorded trigger occurrence release automatically once
the condition is met? **(d)** Is a hold ever satisfied by something other than its stated trigger
(a defendant who answers by filing a special appearance; a defendant who is dismissed)?

**Q-IN3-2.** **What object carries the HOLD — the document, the "set," or the (instrument, target)
pair?** The queue row says *"a document/set status,"* which is two answers. No set concept exists in
the schema, and the live evidence is one wave of six documents with one held — which reads as a
per-pair state, not a per-wave one. If sets become real objects (FE-6 packaging modes make that
likely), does a set-level HOLD mean every member is held, or is set-level HOLD a summary of its
members' states?

**Q-IN3-3.** `cd1-build-slice.md` deferred the service-story columns to *"the first instrument
consumer, as the living spec's first planned revisit,"* and the CD-1 migration repeats it. **Is
IN-3 that first consumer, or is IN-4?** IN-3 needs the target's service story to know what a
release even means; IN-4 executes the service and stamps the certificate. **Whichever is named, the
CD-1 living spec's first planned revisit opens on that ruling** — so this is a scheduling decision
about CD-1 as much as a scoping one about IN-3.

**Q-IN3-4.** **Who owns the certificate-of-service object — IN-3 or IN-4?** IN-3's origin practice
moment is *"a full set drafted for a defendant who has not yet appeared, **with a placeholder
certificate of service**"* — the placeholder is inside IN-3's evidence. IN-4's origin makes the
certificate date *"bound to the service event, not typed into the text — stamped at service time."*
That is one artifact seen from two directions: IN-3 owns the placeholder that must not be served,
IN-4 owns the real date that replaces it. **Does the certificate live in one item's design with the
other pointing at it, and which?**

**Q-IN3-5.** **Where does a trigger occurrence live?** Three candidates, none of which exists.
**(a)** A **roster-entry attribute** — the origin capture's own inventory carries
`{{answer_filed_date}}` and `{{appeared}}` (bool) at entity level, and `contact-directory.md` §6.2
already puts the service story on the same row. **(b)** A **case-event row** in a table the schema
does not have and that several other items (DE-2's escalation timeline, IN-4's lifecycle
timestamps, the deadline engine's recompute events) would also want — which argues for building it
once, deliberately, rather than four times narrowly. **(c)** A **`calendar_events` row**, whose
`event_type` CHECK has no value for it and whose `start_local`/`end_local` are naive local
datetimes stored as `text`. Which, and is the choice IN-3's to make or does it belong to whatever
names the case-event table?

**Q-IN3-6.** **What happens to a set held for a defendant who never appears?** Nothing on the record
answers this and the failure is silent by construction: a finished instrument sits in a state
nobody is prompted about, aimed at a party who may have been non-suited, defaulted, or served by
publication months ago. **Should a hold carry a review date, a staleness prompt, or an expiry?** The
record already has the adjacent failure class on file — a hand-filled certificate date going
*"silently stale"* across five documents (IN-4's origin) — and this is the same class one level up.

**Q-IN3-7.** **Does a HOLD freeze the instrument or leave it editable?** A held set can be made
wrong by events outside it: an amended petition, a new defendant, a corrected VIN, a re-versioned
definitions set. FE-9 (family drift detection) and FE-11 (roster-driven consistency sweep) own
drift on the drafting side and are both **OUT of FE-D1** with the discovery slice named as their
home. **Does release run a consistency check before the prompt fires, and if it finds drift, is
that blocking or advisory?** The record has a live precedent for the shape of that question — the
attorney-edit capture asks whether a family-consistency drift report belongs *"in the finalization
UI (blocking, pre-service) or in a review log (non-blocking)."*

**Q-IN3-8.** **Does release require a fresh render?** The FE-4 spec filed yesterday (#81) records
that definitions-set propagation is **prospective only** — *"New renders use the latest version;
served documents are history via their `.docx`."* A set held across a version bump is neither: it
is rendered but not served. **Is a held instrument "rendered" (frozen at its version, released
as-is) or "unserved" (re-rendered at release against the current version)?** Q-FE4-4 — whether a
definitions set snapshots roster-derived text or holds a live reference — decides part of this from
the other end, and the two should be answered together or the answers will not agree.

**Q-IN3-9.** **Naming.** `service_date`, `service_start` and `service_end` already mean *medical
dates of service* on `medical_bills` and `bill_line_items`. Do you want service-of-process fields
named distinctly from birth — `served_on`, `service_of_process_method` — so that a reader of the
schema cannot confuse the two? This is a one-line decision now and a migration later.

---

## 9. Provenance and status

- Every repo fact in §§1–6 was read **at HEAD through the device bridge**, not from RAG. Checkout
  state: on `master` at **`220f361`**, `git status -sb` showing `## master...origin/master` with no
  divergence and `rev-list --left-right --count` returning `0 0` — **but UNFETCHED**, because the
  bridge returns `HTTP 403 from proxy` on `git fetch`, so that comparison is a local-ref comparison
  and **not** a QR-3 gate pass. The known **CRLF false-DIRTY** was re-observed with its exact
  signature: 200 porcelain lines, `git diff --stat` = **199 files / 37,271 insertions / 37,271
  deletions**. Not a genuinely dirty tree (documented #74, re-observed #81).
- **No registry file was opened for writing. No legal proposition is asserted, supplied, upgraded,
  or moved by this document.** §4 references the Task 6 memo's propositions by ID only, with their
  UNVERIFIED status attached.
- **No case-law retrieval was run.** Descrybe not used (TOOLING, 08-13); Q-6 posture untouched;
  nothing here proposes an EFSP relationship (Task 7, #80).
- **Nothing in `attorney-review-queue.md`, `contact-directory.md`, `cd1-build-slice.md`,
  `email-workflow-requirements.md`, the CD-1 migration or any capture was edited.** This is a
  separate document that points at them.
- Nothing here is verified. **Only Michael verifies.**
