# Claimant Dimension (CL-2) and Case-to-Case Links (CL-1) — Design Pass

**Status:** DESIGN DRAFT. **NOT canonical, NOT in the build queue.** The core ruling (§1) is CONFIRMED by
Michael; everything downstream of it is Claude's design work and needs his sign-off on the §10 decision list
before anything is built.

**Canonical repo path:** `docs/specs/claimant-dimension-and-case-links-design.md`

**Date:** 2026-07-26. **Origin:** design session, Opus 5, following the V17 ruling.

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
- **The claimant owns the damages.** Each represented client has their own body, treatment, bills, liens,
  limitations clock, fee contract, and net-to-client.

**Reason (load-bearing — do not "improve" this):** two people in the same car share every liability fact and
share no damages fact. Scoping records to the case pools two people's medical treatment into one ledger and
computes paid-or-incurred across two bodies.

**Prior art in this project — this is not a new concept.** The wrongful-death overlay already specifies an
allocation-record entity of *claimant × claim × damage element × amount*, per-claimant shares, and
per-claimant damages segregation (jury divides the award, CPRC §71.010). Death cases forced a claimant
dimension into existence for beneficiaries. **CL-2 generalizes what the death overlay already needed.**

## 2. WHY THIS IS TWO ENTITIES, NOT ONE

Three relations exist conceptually; only the first is built.

| # | Relation | Entity | State |
|---|---|---|---|
| 1 | Party ↔ case (role, side) | `case_parties` | **BUILT** |
| 2 | Claimant within a case | `case_claimants` (CL-2) | **MISSING** — this document |
| 3 | Case ↔ case | `case_links` (CL-1) | **MISSING** — this document |

They are specified together because they are constantly confused, and separately implemented because they do
different work: **CL-2 scopes damages inside one matter; CL-1 navigates between matters.**

**Note for the record `[D]`:** the master spec already describes the probate companion as *"its own small
companion matter LINKED to the parent PI case."* The design has assumed CL-1 since well before this session,
with no entity behind it. `cases` carries no self-reference and there is no link table
(verified against `db/schema.sql`, 2026-07-26).

## 3. CL-2 — WHAT MOVES, WHAT STAYS

### 3.1 Moves to claimant scope `[D]`

| Thing | Today | Why it moves |
|---|---|---|
| `medical_bills` | `case_id` | A bill belongs to a body. Pooling distorts paid-or-incurred and the Ch. 146 cap input |
| `analysis_runs` | `case_id` + `bill_id` | Follows the bill; carry `claimant_id` denormalized so per-claimant queries don't join through bills |
| Liens / subrogation | unbuilt | Michael's ruling names these explicitly. A lien attaches to one person's recovery |
| Settlement statement | case-level view | Becomes per-claimant, with a case-level roll-up |
| Limitations date | `cases.statute_of_limitations` — **one date** | A minor passenger has a tolled clock. One field cannot hold two |
| Minor / incapacitated flag | `cases.pi_flags` | A per-person attribute sitting on the case |
| Medicare / Medicaid beneficiary flag | `cases.pi_flags` | Same. One passenger may be a beneficiary and another not |
| Fee arrangement | case-level by settled design | Contracts are per client; the §351.152 >1/3 trap can hit one claimant and not another |
| Generated documents | `case_id` | Person-specific outputs (demand, reasonable-value report) need a claimant; case-level outputs keep `case_id` |

**Latent defect worth naming `[D]`:** the two flags above are wrong *today*, in single-plaintiff cases. It is
invisible only because case ≈ client when there is one client. Multi-plaintiff exposes an error that already
exists.

### 3.2 Stays case-scoped `[D]`

Occurrence date; defendants and their carriers; court, cause number, judge; the status ladder; calendar
events; transcripts and routing; commercial-policy flag; the liability-driving overlay flags
(trucking/commercial, product-suspected, government-defendant); liability playbooks; case expenses **as
records** (see 3.4).

### 3.3 The Death flag is a claimant flag `[D]` `[OPEN]`

Death is currently a case-level PI overlay flag. But in a two-plaintiff collision where one occupant dies, the
wrongful-death/survival overlay applies **to that claimant**, not to the matter. Proposed: Death moves to
claimant scope and the overlay opens per claimant. **This has consequences for the PR-appointment gate and the
WD/survival allocation model and needs Michael's ruling** (D-CL2-6).

### 3.4 Expenses — the unresolved one `[D]` `[OPEN]`

Some case expenses are shared (crash report, accident reconstructionist, filing fee); some are per-claimant
(one client's records retrieval, one client's IME). Shared expenses must be **allocated across claimants at
disbursement** so each settlement statement shows only that client's share.

Three candidate rules, none ruled: equal split; pro rata by gross recovery; per-expense manual allocation with
a default. **This is a real practice question with a real net-to-client consequence — D-CL2-4 is the decision
that most needs Michael personally.**

## 4. CL-2 — PROPOSED SCHEMA `[D]`

Sketch, not final. Mirrors the `case_parties` pattern deliberately.

```sql
create table if not exists case_claimants (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  party_id uuid not null references parties (id) on delete restrict,
  display_order integer not null default 0,
  statute_of_limitations date,
  sol_basis text,                    -- standard | minor-tolled | survival-tolled | manual
  claimant_flags text[] not null default '{}',   -- minor, incapacitated, medicare, medicaid, death
  fee_arrangement jsonb not null default '{}',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (case_id, party_id)
);
```

`on delete restrict` on `party_id` is deliberate: deleting a party who is a claimant must not silently cascade
away their bills and liens.

Then `claimant_id` is added to `medical_bills`, `analysis_runs`, and (when built) liens, expenses-allocation,
and settlement records.

**Relationship to `case_parties` `[OPEN]`:** a claimant is also a party on the case with a Plaintiff/Client
role. Two options — `case_claimants` as a **parallel** record keyed to the same party, or as a **promotion**
of a `case_parties` row. Parallel is simpler and avoids disturbing a built, working table; promotion avoids
two places recording "this person is our client." Proposed: **parallel**, with the claimant record treated as
authoritative for damages scope and `case_parties` unchanged for roles. Needs a ruling (D-CL2-8).

## 5. CL-2 — MIGRATION `[D]`

**No real client data has ever entered the app** (session log, 2026-07-25 Code entry: no live data; Supabase
mode unusable pending auth). Migration risk is therefore close to zero, which is the single strongest
argument for doing this now.

Path: for every existing case, derive exactly one claimant from the party carrying the client/plaintiff role
in `case_parties`; point that case's bills and runs at it. **Where a case has no such party, flag it for
Michael — do not guess and do not invent a placeholder claimant.** Demo-store version bump follows the
existing migration pattern (the reseed-wipe lesson: migrate forward, back up the old store, write a review-log
entry).

## 6. CL-2 — UI CONSTRAINT (non-negotiable in the design) `[D]`

**A single-claimant case must look and click exactly as it does today.** No selector, no extra step, no
"which client?" prompt when the answer is obvious. The claimant dimension appears only when a second claimant
exists. Multi-plaintiff files are the minority; making every ordinary file pay for them would be a bad trade
and would show up as friction on the screen Michael uses most.

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

**CE1 (case-event core) is design-ruled, unauthorized, and unbuilt. It must be claimant-aware from the
start.**

The ruled shape (session log #9) is a shared spine — case, timestamp, actor, channel, note — plus
per-consumer facets. Some events are case-scoped ("defendant's answer received"); some are claimant-scoped
("called Client A about her MRI"). Proposed: **a nullable `claimant_id` on the spine**, null meaning the
event belongs to the matter as a whole.

**If CE1 is built case-only and CL-2 lands afterward, the retrofit is not one module — it is the substrate
that both the heartbeat and the time tracker sit on.** CL-2 should land before or alongside CE1, never after.

## 9. CONFLICTS — ADVISORY FLAG, NOT A GATE `[C]`

**Michael, 2026-07-26:** *"This can be a flag that you can bring up to me, but I should be able to mark it as
decided once I figure it out. I already see these situations coming and my contract handles them regardless."*

Deliberately **not** a hard gate. PI already has three hard gates that block workflow (tax allocation, PR
appointment, pre-disbursement lien clearance); this is not one of them. Behavior: the flag raises when a
matter has more than one claimant, Michael marks it decided, the disposition and reason land in the review
log, and it stays quiet thereafter.

**The system encodes nothing about what his contract does or does not handle.** It notices the fact pattern;
he disposes of it.

**Unverified registry candidates (flagged, no entry opened, nothing built on them):** the aggregate-settlement
rule (TDRPC 1.08(f)) where multiple claimants share a limited policy; and the driver/passenger conflict where
an occupant-client may hold a claim against another occupant-client. **Claude asserts neither. Registry
discipline applies: only Michael verifies.**

## 10. DECISION LIST — MICHAEL'S SIGN-OFF BEFORE ANY BUILD

| ID | Decision | Status |
|---|---|---|
| **D-CL2-1** | Entity name: `claimant` (proposed) vs `client` vs other | OPEN |
| **D-CL2-2** | Limitations moves to the claimant — does `cases.statute_of_limitations` retire, or survive as a derived earliest-of? | OPEN |
| **D-CL2-3** | Fee arrangement per claimant — does the time tracker's "one rate per case, uniform" rule survive, or become one rate per claimant? | OPEN |
| **D-CL2-4** | **Shared-expense allocation rule** — equal / pro rata by recovery / per-expense manual. Highest-consequence item here | OPEN |
| **D-CL2-5** | Confirm the flag split in §3.1/§3.2 (which flags are per-person, which per-matter) | OPEN |
| **D-CL2-6** | Does the Death flag and its WD/survival overlay move to claimant scope? | OPEN |
| **D-CL2-7** | Confirm the §6 constraint: single-claimant cases render unchanged | OPEN |
| **D-CL2-8** | `case_claimants` parallel to `case_parties`, or a promotion of it? | OPEN |
| **D-CL2-9** | Build order: CL-2 before CE1 — confirm (Claude's strong recommendation, §8) | OPEN |
| **D-CL1-1** | CL-1 directed, typed, non-cascading — confirm | OPEN |
| **D-CL1-2** | CL-1 link-type vocabulary | OPEN |
| **D-CL1-3** | Does CL-1 wait on PR-3 and V17? | OPEN |

## 11. WHAT THIS DOCUMENT DOES NOT DO

- Does not authorize any build. Nothing here enters the queue without Michael's explicit ruling.
- Does not open a registry entry or verify any legal proposition.
- Does not re-parent the probate case type (PR-3 is Michael's).
- Does not resolve V17.
- Does not specify the settlement statement, the lien engine, or the expenses module — it states only where
  the claimant seam falls when those are built.
