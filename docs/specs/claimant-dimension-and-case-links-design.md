# Client Dimension (CL-2) and Case-to-Case Links (CL-1) — Design Pass

**Status:** DESIGN DRAFT. **NOT canonical, NOT in the build queue.** The core ruling (§1) is CONFIRMED by
Michael; everything downstream of it is Claude's design work and needs his sign-off on the §10 decision list
before anything is built.

**Canonical repo path:** `docs/specs/claimant-dimension-and-case-links-design.md` — **the FILENAME deliberately
keeps "claimant" even though the entity was renamed.** Renaming the file would break the cross-references
repaired at `a74c708`; the rename is recorded here instead.

**ENTITY RENAMED 2026-07-26 (D-CL2-1 CLOSED, session 2): `claimant` → `client`; `case_claimants` →
`case_clients`.** Michael sits defense-side in civil matters *"very rarely… but it happens occasionally,"* and
ruled that the criminal defendant gets a client record too — so **every case gets one**, civil and criminal
alike. **Reason (load-bearing):** a name that is wrong a few times a year is wrong in the schema permanently,
and `claimant` is false on any matter where Michael's client is not asserting a claim. A new **`posture`**
field (claimant/plaintiff vs. defendant/respondent, per client per matter) carries what the old name tried to;
it also handles the mixed case, a defendant with a live counterclaim who therefore has a damages spine.
**Item IDs are deliberately unchanged** — CL-2, D-CL2-*, and CL-1 stay as they are; renaming IDs mid-stream
costs more than it buys. (Two uses of "claimant" survive on purpose: this path line, and the legal-sense
reference in §9 to multiple claimants sharing a limited policy.)

**Date:** 2026-07-26. **Origin:** design session, Opus 5, following the V17 ruling. Amended same day
(session 2) with five closed decisions — see §3.0, §3.1, §3.4, §4, §10.

**Provenance markers used throughout:** `[C]` ruled aloud by Michael · `[P]` proposed, not objected to, not
affirmed · `[D]` Claude design work, never put to him · `[OPEN]` asked and unanswered.

**No legal proposition in this document is verified.** Where one appears, it is marked as a registry
candidate and nothing is built on it.

---

## 1. THE RULING `[C]`

**Michael, 2026-07-26:** *"Records should hang off of each client. Each client has their own medical bills and
treatment and subrogation interests/liens. You are right when you say that the liability facts and other
details are shared."*

Recorded precisely, because an earlier restatement in the same session ("clients will be linked to a case")
described something the app already does and would have produced the wrong build:

- **The case owns the occurrence and the liability.** One collision, one investigation, one set of
  defendants, one policy, one liability playbook.
- **The client owns the damages.** Each represented client has their own body, treatment, bills, liens,
  limitations clock, fee contract, and net-to-client.

**Reason (load-bearing — do not "improve" this):** two people in the same car share every liability fact and
share no damages fact. Scoping records to the case pools two people's medical treatment into one ledger and
computes paid-or-incurred across two bodies.

**Prior art in this project — this is not a new concept.** The wrongful-death overlay already specifies an
allocation-record entity of *client × claim × damage element × amount*, per-client shares, and
per-client damages segregation (jury divides the award, CPRC §71.010). Death cases forced a client
dimension into existence for beneficiaries. **CL-2 generalizes what the death overlay already needed.**

## 2. WHY THIS IS TWO ENTITIES, NOT ONE

Three relations exist conceptually; only the first is built.

| # | Relation | Entity | State |
|---|---|---|---|
| 1 | Party ↔ case (role, side) | `case_parties` | **BUILT** |
| 2 | Client within a case | `case_clients` (CL-2) | **MISSING** — this document |
| 3 | Case ↔ case | `case_links` (CL-1) | **MISSING** — this document |

They are specified together because they are constantly confused, and separately implemented because they do
different work: **CL-2 scopes damages inside one matter; CL-1 navigates between matters.**

**Note for the record `[D]`:** the master spec already describes the probate companion as *"its own small
companion matter LINKED to the parent PI case."* The design has assumed CL-1 since well before this session,
with no entity behind it. `cases` carries no self-reference and there is no link table
(verified against `db/schema.sql`, 2026-07-26).

## 3. CL-2 — WHAT MOVES, WHAT STAYS

### 3.0 The profile model — practice-area profiles, DERIVED `[C]` `[D]`

**Michael, 2026-07-26:** *"The defendant should get a client record, but the types of data that live in a
criminal defendant client type will be different than the types of data living in a civil litigation or
personal injury client type… a personal injury client will have different types of damages than a typical
civil litigation client, who does not have injuries or medical records/bills, but rather some other type of
economic loss."*

**Shape `[D]`, mirroring the pattern `parties` already uses** (lean identity row + `fields` JSONB driven by
the party-type registry): a lean `case_clients` row carrying what **every** client has — party, posture, fee
arrangement, expense shares, limitations — plus a **profile** carrying what varies by practice area.

| Profile | Carries | Does NOT carry |
|---|---|---|
| **PI** | Medical bills, treatment, subrogation interests and liens, injury damages spine | — |
| **Civil litigation** | Economic loss — contract measure, out-of-pocket, lost profits, property | No medical ledger, no Ch. 55 liens, no paid-or-incurred math |
| **Criminal** | Representation type (court-appointed / private hire), as a payment fact about the client | No damages spine at all; charge clocks stay on `charges` |
| **Probate** | **UNWRITTEN — see PROB-1 in §10** | — |

**Consequence `[D]`: the medical module belongs to the PI profile, not to cases generally.** `medical_bills`
points at a client record whose profile is PI. **A civil-litigation client having no medical tab is CORRECT,
not a gap to fill later.**

#### 3.0.1 Profile derivation `[C]`

**Michael:** *"Profile derived from practice area. If we find hiccups when we actually deploy the software and
start using, we can point out the issues at that time and go back to fix them."*

**Ruled: derived from the case's practice area. NO per-client override.**

**Reason (load-bearing — do not add an escape hatch later without a new ruling):** an override built for a
hypothetical that may never arrive is a permanent complication paid for an occasional one. Real use surfaces
the real exceptions.

#### 3.0.2 Known consequence — practice-area edits `[D]` `[OPEN]`

Derivation means **changing a case's practice area changes its clients' profiles**, and the app already
permits editing practice area mid-case. PI bills belong to a PI profile; switch the matter to civil litigation
and they have nowhere to live.

**Proposed, unruled (PA-1):** ride the existing rail — classification edits already write a `case_record`
review-log entry and raise a "playbooks may need re-evaluation" notice. Same here: **warn, log, do not
destroy.** No mechanism designed yet; flagged as a consequence so it is not discovered in use.

### 3.1 Moves to client scope `[D]`

| Thing | Today | Why it moves |
|---|---|---|
| `medical_bills` | `case_id` | A bill belongs to a body. Pooling distorts paid-or-incurred and the Ch. 146 cap input |
| `analysis_runs` | `case_id` + `bill_id` | Follows the bill; carry `client_id` denormalized so per-client queries don't join through bills |
| Liens / subrogation | unbuilt | Michael's ruling names these explicitly. A lien attaches to one person's recovery |
| Settlement statement | case-level view | Becomes per-client, with a case-level roll-up |
| Limitations date | `cases.statute_of_limitations` — **one date** | A minor passenger has a tolled clock. One field cannot hold two. **D-CL2-2 CLOSED 2026-07-26: the case-level field RETIRES.** Limitations lives on client records; the case **displays the earliest, derived and non-writable**. What resolved it — Michael: *"in civil cases, there will never exist a case without a claimant. In criminal cases, there will always only be one client (defendant) and a statute of limitations calculated for each offense they are charged with."* That killed the objection to retiring it: **criminal never used `cases.statute_of_limitations`** (per-offense clocks already live on `charges` and are already built), and with every civil case carrying at least one client, no case is stranded without a home for the date. **Retired rather than kept derived-but-present** because a writable field meant to mirror derived data eventually stops mirroring it, silently, and the heartbeat's master clock would have no way to say which number it read. **D-CL2-2a CLOSED 2026-07-27:** the derived earliest is taken across **unresolved clients only** — a settled client's expired clock must not keep a live matter showing false urgency; "resolved" means **disbursement** per D-CL2-4a. **The ruling is a design direction; NO migration is authorized — do not drop the column** *(Guard lifted 2026-07-28, log #27: the CL-2 authorization authorizes exactly this migration; the column DROPS when the slice executes.)* |
| Medicare / Medicaid beneficiary flag | `cases.pi_flags` | **D-CL2-5 CLOSED — CLIENT.** The Safe Harbor authorization and conditional-payment correspondence name a specific beneficiary, and the lien reaches only that person's recovery. One passenger may be a beneficiary and another not |
| Fee arrangement | case-level by settled design | Contracts are per client; the §351.152 >1/3 trap can hit one client and not another |
| Generated documents | `case_id` | Person-specific outputs (demand, reasonable-value report) need a client; case-level outputs keep `case_id` |

**Latent defect worth naming `[D]`:** the Medicare/Medicaid flag is wrong *today*, in single-plaintiff cases.
It is invisible only because case ≈ client when there is one client. Multi-plaintiff exposes an error that
already exists.

### 3.2 Stays case-scoped (FILE-level) `[D]`, with D-CL2-5 rulings `[C]`

Occurrence date; defendants and their carriers; court, cause number, judge; the status ladder; calendar
events; transcripts and routing; liability playbooks; case expenses **as records** (see 3.4).

**Flag placement RULED 2026-07-26 (D-CL2-5).** The occurrence flags stay FILE-level — **trucking/commercial,
product-suspected, government-defendant, and commercial-policy** — Michael: *"true for everyone in the car."*
Death is also FILE-level (see §3.3). Only **Medicare/Medicaid** moves to the client.

#### 3.2.1 Minor / incapacitated — FILE-level, ruled AGAINST Claude's proposal `[C]`

**This row was placed in §3.1 (client scope) in the round-1 fold and is moved here by ruling. Do not "fix" it
back.** Claude proposed CLIENT, arguing the tolled limitations clock and the ad litem / friendly-suit /
§351.152 machinery all attach to a person. **Michael ruled FILE**, and the reason is load-bearing:

> *"A minor's SOL is technically different, but they are generally dealing with medical bills and the parents
> have to pay them anyway. We settle the kids with the parents at the same time so this is a non-issue. The
> tolling on minors is always something in the back of my head and I don't need you to parse that out."*

Minors settle alongside the parents, so the divergent clock **never drives a different workflow in practice**.
Building per-client tolling machinery would be the system computing a date the attorney already carries.

**Standing consequence `[D]`: no tolling is computed or inferred anywhere.** The per-client limitations field
(§3.1, D-CL2-2) **accepts** a date if one is entered and otherwise stays invisible — a data-entry affordance,
not machinery. **Proposed, unruled (MIN-1)** — Michael has not confirmed he wants even that.

#### 3.2.2 The durable rule for future flags `[C]` `[D]`

Future flags do not need a session. **The test: does this describe a person, or the occurrence?**

**With a standing exception:** a person-level fact may still be ruled FILE-level when it never changes what
the attorney actually does. **The minor ruling is the worked example.** The exception is **the attorney's to
invoke, not Claude's to assume.**

#### 3.2.3 The flag inventory may be incomplete `[D]`

This list comes from the master spec §7 and the playbook doc. `cases.pi_flags` is a free-form `text[]`, and
`src/` is not synced to the design side — **flags added in build sessions are invisible there.** A Code
session should enumerate what is actually in use and route anything unlisted through §3.2.2.

### 3.2.4 UM/UIM is NOT a flag `[P]` `[OPEN]` (UM-1)

**Proposed, unruled.** UM/UIM is a **coverage relationship**, which a boolean cannot hold. Within one
collision, Client A may carry UM under her own policy, also be an insured under the host driver's policy, and
Client B may have rejected coverage entirely (**Ins. Code §1952.101(c)** permits written rejection by a named
insured).

**Proposed shape:** a **client-scoped designation** — does this client's matter have a first-party UM
component and enter that lifecycle branch — with the actual **coverage records underneath**, in the Insurance
tab where per-policy detail already lives. **Holds even when only one UM claim exists**, which Michael notes
is the normal case: the coverage still belongs to a particular client, the consent-to-settle gate is hers, and
the UDJA fee claim is hers. A case-level boolean cannot say which client the branch belongs to.

**Ins. Code ch. 1952 — READING, NOT VERIFICATION `[D]`.** Michael supplied the chapter in session. **No
registry entry opened; nothing is built on any of this.** Registry candidates: **§§1952.101, .103, .104(1),
.110, .151, .153, .159.**

- **§1952.104(1)** — per-person limit plus a per-occurrence aggregate across all claimants. **Multiple clients
  compete for one ceiling**, mirroring the limited-policy problem already flagged in §9.
- **§1952.103** — a vehicle becomes underinsured if limits were originally lower **or reduced by payment of
  claims arising from the same accident**. So **settlement order among clients can change the coverage posture
  of clients who have not settled.**
- **§1952.159** — a guest/passenger liability claim against the host owner or operator carries a PIP offset.
  Where both occupants are clients, this is the driver/passenger conflict with a dollar figure attached.
- **§1952.110** — UM/UIM venue is fixed by the policyholder's residence at the time of the accident, or where
  the accident occurred.
- **PIP is cleanly per-client:** §1952.151 names authorized passengers and guest occupants; §1952.153 caps at
  $2,500 per person.
- **The chapter does NOT define who counts as an insured** — that is policy language, and it is what actually
  decides whether a passenger client reaches the host driver's UM coverage.

**Venue split — Claude over-built, corrected `[D]`.** Claude read §1952.110 and designed toward split UM
filings across counties as a second consumer for CL-1. **Michael:** same-household clients share a county, and
*"very rarely do I have two UIM cases going on for one collision."* **One matter, always, in practice.** Split
UM filings are **struck as a CL-1 justification — probate remains CL-1's only real consumer, and D-CL1-3 is
gated on PR-3 alone.** A venue-mismatch advisory flag may stay (cheap, silent when it never fires) —
**proposed, unruled (UM-2).**

### 3.3 The Death flag is FILE-level, and the PR gate NARROWS `[C]` (D-CL2-6 CLOSED)

**Part one — the Death flag is FILE-level.** Michael agreed with the reasoning offered: a death changes the
whole matter's character in a way a minor passenger does not — the case becomes a death case, and the
exemplary-damages analysis and defense posture shift with it.

**Part two — the PR-appointment gate narrows to the deceased client's claims only.** Michael: *"I feel like
the PR-appointment gate blocks only the deceased client."*

**Reason:** the surviving passenger's ordinary injury claim should not be parked behind an estate proceeding
it has nothing to do with. Estates take months; the gate's job is PR capacity, not settlement sequencing.

**This is a HARD GATE changing scope** — recorded as such, since PI's three hard gates are otherwise
untouchable. **It now blocks per-client rather than per-matter.** *(Ruled design only — the gate's behavior in
code is unchanged and unauthorized.)*

**Companion PROPOSED, unruled `[P]` (PR-GATE-1):** a **warn-don't-block** notice when the surviving client is
about to settle while the deceased client's claims remain open **against a shared policy limit**
(§1952.104(1)). Michael has not ruled on it.

### 3.4 Expenses — RULED `[C]` (D-CL2-4 and D-CL2-4a CLOSED 2026-07-26)

**Michael:** *"Expense sharing should be a per-expense decision. Some expenses belong to one person (medical
records request or pre-payment to a doctor) and some are shared evenly (crash report, filing fee and service
of citation, etc)."*

**Ruled, two parts:**

1. **Per-expense tagging at entry** — each expense is marked as one client's or shared **when it is logged**,
   not reconstructed at disbursement.
2. **Shared expenses split EVENLY.** Pro rata by gross recovery is **rejected**.

**Recorded tradeoff (Claude proposed pro rata; overridden):** on a lopsided pair of recoveries an even split
takes a proportionally larger bite out of the smaller check. Michael ruled with that in front of him — a
considered tradeoff, not an oversight.

**Advantage Claude under-weighted `[D]`:** an even split is **computable the moment the expense is logged**.
Pro rata could not compute until recoveries were known, which is precisely what made staggered settlements
hard. That problem largely dissolves — a client who settles in March gets her share of the crash report then,
without waiting on a client who settles in October.

**D-CL2-4a CLOSED `[C]` — shares lock at disbursement.** Whatever the client count was when a statement was
finalized is what that client paid. Later changes to the client set — a third occupant signing on, or one
dropping out — **redistribute only across clients who have not yet disbursed. No retroactive recomputation,
no reissued settlement statements.**

## 4. CL-2 — PROPOSED SCHEMA `[D]`

Sketch, not final. Mirrors the `case_parties` pattern deliberately.

```sql
create table if not exists case_clients (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  party_id uuid not null references parties (id) on delete restrict,
  posture text not null,             -- claimant | defendant
  display_order integer not null default 0,
  statute_of_limitations date,
  sol_basis text,                    -- standard | minor-tolled | survival-tolled | manual
  client_flags text[] not null default '{}',   -- minor, incapacitated, medicare, medicaid, death
  fee_arrangement jsonb not null default '{}',
  profile_fields jsonb not null default '{}',  -- shape driven by the derived practice-area profile
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, party_id)
);
```

*(Revised 2026-07-26 session 2: `posture` and `profile_fields` added per D-CL2-1 and the profile ruling.
**Profile is DERIVED from the case's practice area, never stored as an override** — see §3.0.1. Still a
proposal, not an instruction: nothing here is authorized for build.)*

`on delete restrict` on `party_id` is deliberate: deleting a party who is a client must not silently cascade
away their bills and liens.

Then `client_id` is added to `medical_bills`, `analysis_runs`, and (when built) liens, expenses-allocation,
and settlement records.

**Relationship to `case_parties` — RESOLVED: PARALLEL (D-CL2-8 CLOSED 2026-07-26).** A client is also a party
on the case with a Plaintiff/Client role. `case_clients` sits **parallel** to `case_parties`, not as a
promotion of it: `case_parties` is built, working, and carries roles for every party including opposing ones,
so the client record **adds the damages spine on top rather than disturbing a table that already works**.
`case_parties` stays authoritative for **roles**; `case_clients` is authoritative for **damages scope**.

**Recorded as CLAUDE'S call, not Michael's ruling** — it is pure implementation with no practice consequence,
and Michael deferred it. Noted so a later session does not cite it as an attorney decision.

## 5. CL-2 — MIGRATION `[D]`

**No real client data has ever entered the app** (session log, 2026-07-25 Code entry: no live data; Supabase
mode unusable pending auth). Migration risk is therefore close to zero, which is the single strongest
argument for doing this now.

Path: for every existing case, derive exactly one client from the party carrying the client/plaintiff role
in `case_parties`; point that case's bills and runs at it. **Where a case has no such party, flag it for
Michael — do not guess and do not invent a placeholder client.** Demo-store version bump follows the
existing migration pattern (the reseed-wipe lesson: migrate forward, back up the old store, write a review-log
entry).

## 6. CL-2 — UI CONSTRAINT — **RULED `[C]`** (D-CL2-7 CLOSED 2026-07-26)

**A single-client case must look and click exactly as it does today.** No selector, no extra step, no
"which client?" prompt when the answer is obvious. **The client layer hides until a second client exists**;
add a second and the control appears.

**Reason (Michael's, ruling what was previously a Claude constraint):** nearly all work is single-client —
every criminal matter, every solo PI case, every contract matter. Showing the control always would tax the
overwhelming majority of files for the occasional multi-plaintiff wreck.

**Consequence `[D]`:** on a single-client file, client-scoped fields **stay in their current homes** —
limitations on the case Overview, fee arrangement where it lives now — and become client-scoped underneath
without moving on screen.

## 7. CL-1 — CASE-TO-CASE LINKS `[P]`

**Proposed shape: directed, typed, non-cascading.**

```sql
create table if not exists case_links (
  id uuid primary key default gen_random_uuid(),
  from_case_id uuid not null references cases (id) on delete cascade,
  to_case_id uuid not null references cases (id) on delete cascade,
  link_type text not null,
  note text,
  created_at timestamptz not null default now(),
  unique (from_case_id, to_case_id, link_type),
  check (from_case_id <> to_case_id)
);
```

**Directed, because the relation is asymmetric** — an estate opened to support a PI matter is not the same
relation viewed from the estate. Each `link_type` therefore carries two display labels, one per side
("Estate opened for →" / "← Underlying injury matter").

**Non-cascading:** links are navigational. Nothing propagates across them — no shared deadlines, no shared
status, no shared parties. Anything that should propagate is a separate, explicit ruling.

**Candidate link types `[OPEN]`:** `estate-for` (probate ↔ PI), `companion`, `related-occurrence` (two
matters from one incident that stayed separate), `consolidated`. Vocabulary needs Michael's ruling
(D-CL1-2) — an open text field would rot.

**Gating `[D]`:** CL-1's first real consumer is the probate companion relation, which is entangled with
**PR-3** (re-parenting the mis-filed case type) and **V17** (whether probate fees touch PI at all). CL-1 can
be specified now but should probably not be built until PR-3 is ruled.

## 8. INTERACTION WITH CE1 — TIME-CRITICAL `[D]`

**CE1 (case-event core) is design-ruled, unauthorized, and unbuilt. It must be client-aware from the
start.**

The ruled shape (session log #9) is a shared spine — case, timestamp, actor, channel, note — plus
per-consumer facets. Some events are case-scoped ("defendant's answer received"); some are client-scoped
("called Client A about her MRI"). Proposed: **a nullable `client_id` on the spine**, null meaning the
event belongs to the matter as a whole.

**If CE1 is built case-only and CL-2 lands afterward, the retrofit is not one module — it is the substrate
that both the heartbeat and the time tracker sit on.** CL-2 should land before or alongside CE1, never after.

**D-CL2-9 CLOSED 2026-07-26 — option (a): CL-2 ships as its own vertical slice; CE1 is authorized separately,
afterward.** Reason (load-bearing): **CL-2 reworks the medical module, which is already built and walked**, and
Michael confirms that rework before a second thing builds on top of it.

**Accepted cost, stated plainly:** until CL-2 is built and walked, **CE1 stays unauthorized — which parks the
case heartbeat and the time tracker**, since both consume that substrate. That cost was accepted deliberately.
*(Ruling the slice order is not a build authorization: CL-2 itself is still unauthorized.)*

## 9. CONFLICTS — ADVISORY FLAG, NOT A GATE `[C]`

**Michael, 2026-07-26:** *"This can be a flag that you can bring up to me, but I should be able to mark it as
decided once I figure it out. I already see these situations coming and my contract handles them regardless."*

Deliberately **not** a hard gate. PI already has three hard gates that block workflow (tax allocation, PR
appointment, pre-disbursement lien clearance); this is not one of them. Behavior: the flag raises when a
matter has more than one client, Michael marks it decided, the disposition and reason land in the review
log, and it stays quiet thereafter.

**The system encodes nothing about what his contract does or does not handle.** It notices the fact pattern;
he disposes of it.

**Unverified registry candidates (flagged, no entry opened, nothing built on them):** the aggregate-settlement
rule (TDRPC 1.08(f)) where multiple claimants share a limited policy; and the driver/passenger conflict where
an occupant-client may hold a claim against another occupant-client. **Claude asserts neither. Registry
discipline applies: only Michael verifies.**

## 10. DECISION LIST — MICHAEL'S SIGN-OFF BEFORE ANY BUILD

**Ten closed 2026-07-26 across sessions 2 and 3 — every item on the original decision list is now ruled or
explicitly assigned. Closing them authorizes NOTHING** — every one is a design direction with no build behind
it, including D-CL2-9, which rules the slice *order* without authorizing the slice.

| ID | Decision | Status |
|---|---|---|
| **D-CL2-1** | Entity name | **CLOSED — `client`, with a `posture` field. Every case gets one, civil and criminal. See the header note** |
| **D-CL2-2** | Case-level limitations | **CLOSED — retires; the case displays the derived earliest, non-writable. See §3.1. No migration authorized** *(Guard lifted 2026-07-28, log #27: the CL-2 authorization authorizes exactly this migration; the column DROPS when the slice executes.)* |
| **D-CL2-4** | Shared-expense allocation | **CLOSED — per-expense tagging at entry; shared expenses split EVENLY (pro rata rejected). See §3.4** |
| **D-CL2-4a** | Staggered settlements | **CLOSED — shares lock at disbursement; redistribution touches only clients who have not disbursed. See §3.4** |
| **PROFILE** | Practice-area profiles + derivation | **CLOSED — derived from practice area, no per-client override. See §3.0** |
| **D-CL2-5** | Flag placement | **CLOSED — minor/incapacitated = FILE (against Claude's proposal); Medicare/Medicaid = CLIENT; the four occurrence flags + Death = FILE. See §3.2** |
| **D-CL2-6** | Death flag + PR gate | **CLOSED — Death is FILE-level; the PR-appointment HARD GATE narrows to the deceased client only. See §3.3** |
| **D-CL2-7** | Single-client rendering | **CLOSED — the client layer hides until a second client exists. See §6** |
| **D-CL2-8** | Parallel vs. promotion | **CLOSED — parallel. Adopted as Michael's ruling 2026-07-28 (log #27)**; originally recorded as Claude's call. See §4 |
| **D-CL2-9** | Build order: CL-2 before CE1 | **CLOSED — option (a): CL-2 ships as its own slice, CE1 authorized separately afterward. Accepted cost: the heartbeat and time tracker stay parked. See §8** |
| **D-CL2-2a** | Earliest limitations across **all** clients, or **unresolved** only? | **CLOSED (Michael, 2026-07-27).** Earliest-limitations derives from **unresolved clients only**. A settled client's expired clock must not keep a live matter showing false urgency. "Resolved" means **disbursement** per D-CL2-4a, not an agreed number. Walkthrough must include a two-client case with one client settled — the rule is invisible with a single client |
| **D-CL2-3** | Fee arrangement per client — does the time tracker's "one rate per case, uniform" rule survive, or become one rate per client? | **OPEN — dropped from Claude's running list mid-session 2026-07-26 and restored at session end; recorded rather than silently corrected.** Not closed by CL-2's `fee_arrangement` field (log #27) |
| **CL2-CHECK-1** | Advisory client-role ↔ client-record consistency check (flag/review-log, never auto-fix) | **EXPLICITLY DEFERRED (Michael, 2026-07-28). Not in the CL-2 slice; do not build** |
| **UM-1** | UM/UIM as a client-scoped designation with coverage records beneath (§3.2.4) | **OPEN — new, proposed** |
| **UM-2** | Venue-mismatch advisory flag — keep or drop? (§3.2.4) | **OPEN — new, proposed** |
| **PR-GATE-1** | Warn-don't-block when a surviving client settles against a shared limit (§3.3) | **OPEN — new, proposed** |
| **MIN-1** | Per-client limitations as a plain data-entry field, no tolling computed (§3.2.1) | **OPEN — new, proposed** |
| **D-CL1-1** | CL-1 directed, typed, non-cascading — confirm | OPEN |
| **D-CL1-2** | CL-1 link-type vocabulary | OPEN |
| **D-CL1-3** | Does CL-1 wait on PR-3? | **OPEN — narrowed: gated on PR-3 ALONE.** V17 is closed, and split UM filings were struck as a second consumer (§3.2.4), leaving **probate as CL-1's only real consumer** |
| **CIV-1** | **Civil-litigation damages are UNSPECIFIED** — economic loss, no injury model. Needs its own design session; breach of contract is the workhorse of that line | **OPEN — new** |
| **PROB-1** | Probate client profile is unwritten | **OPEN — new** |
| **PA-1** | Practice-area edit vs. derived profiles — warn / log / don't destroy (§3.0.2) | **OPEN — new, proposed only** |

## 11. WHAT THIS DOCUMENT DOES NOT DO

- Does not authorize any build. Nothing here enters the queue without Michael's explicit ruling.
- Does not open a registry entry or verify any legal proposition.
- Does not re-parent the probate case type (PR-3 is Michael's).
- Does not resolve V17.
- Does not specify the settlement statement, the lien engine, or the expenses module — it states only where
  the client seam falls when those are built.
