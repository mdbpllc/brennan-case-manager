# CD-2 Role Mining Pass — the candidate party/contact role taxonomy, all four practice areas

**Canonical repo path (proposed):** `docs/specs/cd2-role-mining-pass-2026-08-13.md` — NEW file, rides the
next packet on Michael's word.

**Status: PROPOSED design input — DATA PREP ONLY. Nothing here is ruled, nothing is authorized to build,
and no spec file was touched.** Adding directory vocabulary is a spec-level act on the living spec (the
CD-3 precedent, queue annotation (e)) — so this document proposes *to* `contact-directory.md` §4/§5 and
writes *nothing into* them.

**Authored:** 2026-08-13 Central (design session, Opus 5, Cowork, CHAT-DISPATCH Task 3).
**DT-1 applied:** clock-checked **23:15 CDT** before stamping — past the 19:00 CDT container rollover; the
container read 2026-08-14 UTC. This file correctly stamps **2026-08-13 Central**.

**SOURCED TO HEAD, NOT RAG.** The repo checkout was connected via the device bridge at
`aa033dc` (master, #73). 96 files read full-text: all 87 `docs/**.md`, `db/` (4), `supabase/` (2),
`CLAUDE.md`, `README.md`, `BUILD-SESSION-NOTES.md`. First design-side pass in the chain not qualified by
"RAG absence is not evidence of absence."

**HK-7 IS SATISFIED FOR THIS SESSION, NOT CLOSED.** The folder grant is session-scoped — the dispatch's own
resume rule says *"re-grant the bridge folder at each resume session."* Recorded precisely so the status
line does not propagate as closed; a later session inherits the item, not the access.

**Two bridge findings that bear on the queue runner, recorded because they are new:** through the bridge
mount `git status` reports 199 modified files (37,271 insertions against 37,271 deletions) while
`git diff --ignore-cr-at-eol` is **empty** — pure CRLF, zero content difference. A QR-3 Step 0 gate run
through `device_bash` would read DIRTY and stop the session on a false alarm; session-log #68 recorded the
caveat as not materializing, but that runner ran natively on Windows. Separately, `git fetch` fails through
the bridge (`HTTP 403 from proxy`) — the device VM has no network, so **QR-3's fetch-and-compare cannot run
through the bridge at all** and must stay native.

---

## §0 — RECONCILE FIRST: the finding that reframes this task

**CD-2 IS NOT AN OPEN DESIGN QUESTION. Both of its layers were RULED on 2026-08-11 and the structure
beneath them is BUILT.** The dispatch commissioned Task 3 as data prep for a "candidate taxonomy," which
reads as greenfield. It is not. Stated plainly before anything else, because every row below depends on it:

- **Framing RULED, session-log #48** — *"CD-2 (case-type party rosters + typed contact relationships —
  framing RULED: general across practice areas, trucking corporate edges and probate family edges are one
  structure, rosters are intake slots never auto-created records)."* Michael's reason, verbatim: *"there
  are a number of different kinds of cases where each type will have generally the same list of different
  kinds of parties."*
- **Design RULED, session-log #51 — BOTH layers**, into `contact-directory.md` §4 (roster) and §5 (edges).
  The queue's CD-2 row *"becomes a pointer."*
- **BUILT, session-log #61 (CD-1, items 1–6, fixture data only).** 19 contact-edge types, 5 party statuses,
  4 capacity kinds, 3 join-reasons, 3 active-states — all database-enforced by CHECK constraints today.

**What that does to this document.** It is no longer a proposal for a taxonomy; it is a **coverage audit of
a ruled taxonomy against every role the record actually evidences**. That is more useful, not less. Every
row below is marked **BUILT / RULED-NOT-BUILT / CANDIDATE / DECLINE**, and the only rows that are genuinely
new work are the CANDIDATEs and the DECLINEs.

**Six ruled axes any role row must respect** (from #51, restated because the mining kept colliding with them):

| Axis | What it is | Where it lives | Trap |
|---|---|---|---|
| `role` | story role on the roster link | `case_parties.role`, free text | the only axis that is "a role" |
| `caption_alignment` | per case-type side set | `case_parties`, deliberately unconstrained | **"Plaintiff" is an ALIGNMENT, not a role** |
| `party_status` | caption-party / non-party-actor / court-appointed / intervenor / unnamed-reserved | CHECK-constrained | "non-party" is a status, never a role |
| `side` (firm perspective) | Ours / Opposing / Neutral | comment-only, unenforced | not the same as alignment |
| `capacity_kind` | individually / next-friend-of / representative-of-estate-of / dba | CHECK-constrained | **capacity is NOT a role** — party = person × capacity |
| `role_tags[]` | directory-level tags, derived from the party-type registry | `parties.role_tags text[]` | derivation is a TypeScript guarantee, not a DB one |

**REQ-14 governs everything here:** *"sides are a property of the case type, not a constant — any roster
model with exactly two sides fails on documents the practice demonstrably files."* Interpleader, ex parte
petitions, scire facias, certificates of interested parties, and ad litem joinder each break a
plaintiff/defendant model. Nothing below assumes two sides.

---

## §1 — Method, coverage, and the one honest gap

**Eight clusters, read full-text at HEAD, no sampling:**

| Cluster | Files | Distinct role mentions |
|---|---|---|
| PI / civil case lifecycle (playbooks, heartbeat design + captures b–f, claimant dimension) | 8 | 70 |
| Criminal (offense playbooks, OAA intake, plea eligibility, Uvalde worksheet, criminal registry) | 5 | 44 |
| Probate / property / master spec (Est. 352, CPRC 71, Prop. 53/28, project instructions, TRCP skeleton) | 5 | 63 |
| Built vocabulary (schema.sql, CD-1 + CL-2 migrations, contact-directory spec, roster-mining + trucking captures, ledger) | 8 | 50 |
| Medical / carrier / lien (billing synthesis + prompt, billing registry, carrier duties, MRF dry run, chronology) | 6 | 55 |
| Discovery / forms / templates (form engine + helpers, FE-D1, discovery template, disclosures SKILL, APIL passes 1–3) | 8 | 72 |
| Ops / email / transcripts / REQ-CAPTUREs | 10 | 66 |
| Rulings + queue history (queue, session log, ledger, spec-feedback) | 4 | constraints, not roles |

**~420 raw role mentions across the eight clusters.** §3 below consolidates them: cross-cluster duplicates
are merged into one row, and anything already in the built vocabulary is listed once in §2 rather than
repeated per practice area. The raw per-cluster extractions are the evidence behind each row and are
reproducible from the file list above.

### The one honest gap, stated up front

**THE AUTHORITATIVE ROLE-TAG VOCABULARY WAS NOT READ, AND I DID NOT READ IT ON PURPOSE.**

The role-tag list and the roster slot labels live in `src/domain/partyRegistry.ts` and
`src/domain/roster.ts`. `db/schema.sql` names only three registry keys — `client, adjuster, attorney, ...`
— in a comment, with an ellipsis. There is **no enum, no CHECK, no lookup table** on `role_tags`; the
vocabulary is enforced entirely in TypeScript.

The checkout is connected, so those two files were physically reachable this session. **The project
instructions bar it:** *"src/ and build tooling are DELIBERATELY excluded — design sessions do not read
source; BUILD-STATE.md is the only authority on what is built... if one specific source file is genuinely
needed, ask Michael to paste it into the chat."* I honored that rather than treating bridge access as a
silent repeal of a binding convention.

**Consequence, marked not buried:** every `CANDIDATE` row below carries `TAG-CHECK: NOT RUN`. A material
number of them — carrier, lessor, trainer, operator, manager, staffing entity, and most of the provider
subtypes — **may already exist as slot labels or role tags** in those two files. BUILD-STATE confirms slots
were seeded 08-12 for MVA, trucking, premises, UIM/UM, TTCA-type, criminal, and insurance/DTPA. **No row
below asserts a role is new.** It asserts the role is evidenced and is not in SQL.

**The ask that closes it is two files pasted into a chat** — `src/domain/partyRegistry.ts` and
`src/domain/roster.ts`. That is a five-minute act and it converts ~60 uncertain rows into certain ones.

---

## §2 — The dedupe baseline: what is already built

Reproduced compactly so no row below re-proposes it. **All of this is DB-enforced today except where noted.**

**19 contact edge types** (`contact_edges_type_check`): `employer-of` · `owner-entrustor-of` · `lessor-of` ·
`parent-of` · `affiliate-of` · `insurer-of` · `insurer-of-adverse-party` · `principal-of` ·
`registered-agent-of` · `heir-of` · `representative-of-estate-of` · `next-of-kin-of` · `spouse-of` ·
`contractor-for` · `manufacturer-of-goods-sold-by` · `platform-for` · `attorney-for` · `bailee-of` ·
`joint-enterprise-with`

**5 party statuses:** `caption-party` · `non-party-actor` · `court-appointed` · `intervenor` ·
`unnamed-reserved`
**4 capacity kinds:** `individually` · `next-friend-of` · `representative-of-estate-of` · `dba`
**3 join reasons / 3 active states:** `intake-slot` · `amendment` · `court-action` · `substitution` //
`active` · `withdrawn` · `substituted-out`
**12 `case_parties.role` literals in SQL** (free text, backfill-matched only): `Plaintiff` · `Defendant` ·
`Client` (flagged, never mapped) · `Witness` · `Opposing counsel` · `Co-counsel` · `Adjuster on claim` ·
`Treating provider` · `Expert — ours` · `Expert — opposing` · `Judge assigned` · `Court of record`
**Client posture (CL-2):** `claimant` · `defendant` · `mixed` (nothing writes `mixed` yet)

**Three structural facts about this baseline that the mining kept running into:**

1. **Only ONE direction of each asymmetric edge is built.** `lessor-of` exists, `lessee-of` does not.
   `bailee-of` exists, `bailor-of` does not. Not an oversight to "fix" — adding an edge type is a
   spec-level act. Flagged as **Q4**.
2. **`parent-of` is overloaded** — it serves corporate parent/subsidiary AND human parent/child. The
   trucking holding-company case and the next-friend case both land on the same edge type. Flagged as **Q5**.
3. **`family-of` was named in the roster-mining capture (REQ-11) and did NOT make it into the built 19.**
   Built kinship is only `spouse-of`, `parent-of`, `heir-of`, `next-of-kin-of`. See §4.

---

## §3 — The taxonomy

Column key: **PA** = practice areas evidenced · **CAP** = PARTY-CAPABLE / CONTACT-ONLY / AMBIGUOUS ·
**REL** = candidate typed relationship · **STATUS** = BUILT / RULED-NOT-BUILT / CANDIDATE / DECLINE.
Every CANDIDATE carries `TAG-CHECK: NOT RUN` per §1.

### 3.1 Cross-cutting core — evidenced in all four practice areas

| Role | PA | CAP | REL | STATUS |
|---|---|---|---|---|
| Client | all 4 | PARTY | `client-of(firm)`; posture on `case_clients` | **BUILT** — `Client` literal + posture; alignment deliberately FLAGGED, never guessed (#61) |
| Attorney of record | all 4 | PARTY | `attorney-for` (case-scoped) | **BUILT** at three levels — role, edge, registry key |
| Opposing counsel | all 4 | PARTY | `attorney-for` | **BUILT** |
| Co-counsel | all 4 | PARTY | `attorney-for` | **BUILT** |
| Judge | all 4 | PARTY | `presides-over(case)`; `sits-on(court)` | **BUILT** — `Judge assigned` |
| Court | all 4 | PARTY | `forum-of(case/cause)` | **BUILT** — `Court of record` |
| Court clerk | all 4 | CONTACT | `clerk-of(court)`; recording office | **CANDIDATE** — filing-profile sub-layer today; cannot express "county clerk of the county where the improvements are located" as a venue constraint (§53.052(e)) |
| Court coordinator | CRIM, CIVIL | CONTACT | `coordinator-for(court)` | **CANDIDATE** — tasks point at a COURT-level contact; no other role needs that |
| Fact witness / person with knowledge | all 4 | PARTY | `witness-on(case)` | **BUILT** — `Witness` + `non-party-actor` |
| Expert (ours / opposing) | all 4 | PARTY | `designated-by(side)` | **BUILT** — and note both literals carry an em dash with spaces, byte-verified |
| Court reporter | all 4 | PARTY | `books-through(agency)` | **CANDIDATE** — reporting agency is a separate record per the master spec |
| Interpreter | CRIM, PI | AMBIGUOUS | `interpreter-for(proceeding)` | **CANDIDATE** — the only criminal-side mention is the STATE's roadside interpreter, retrospective; a defense language-access role would be reading past the text |
| Process server | PI, CIVIL | CONTACT | `server-for(instrument)` | **CANDIDATE** |
| Registered agent for service | all 4 | AMBIGUOUS | `registered-agent-of` | **BUILT** as an edge — but four party types each carry their own duplicate name/address field. Flagged **Q6** |
| Mediator | PI, CIVIL | CONTACT | `mediator-in(case)` | **CANDIDATE** — no party type for court-appointed or agreed neutrals exists |
| Firm-internal (responsible attorney, paralegal, timekeeper) | all 4 | AMBIGUOUS | `assignee-of(task)`; `timekeeper-on(entry)` | **CANDIDATE** — decide whether internal users share the party namespace or an auth namespace. Flagged **Q7** |

### 3.2 PI — the deepest-evidenced area

**BUILT or ruled:** defendant driver, entity/corporate defendant, motor carrier (via `employer-of`),
vehicle owner-entrustor (`owner-entrustor-of`), fleet lessor (`lessor-of`), staffing entity
(`joint-enterprise-with`), rideshare platform (`platform-for`), product manufacturer
(`manufacturer-of-goods-sold-by`), premises contractor (`contractor-for`), adjuster (built at three
levels), treating provider, John Doe (`unnamed-reserved`), ad litem joinder (`court-appointed` +
`court-action`).

**CANDIDATE rows, all `TAG-CHECK: NOT RUN`:**

| Role | CAP | REL | Why it earns a row |
|---|---|---|---|
| Driver-training school / trainer | PARTY | *no edge fits* | Negligent-training is a pleaded theory with **no edge type**. `trainer-of` is absent from the built 19. The most concrete gap in the trucking family |
| Premises operator / management company | PARTY | `affiliate-of` only | *"A stack of related entities behind one storefront"*; no `manager-of` or `agent-of` edge |
| Freight broker | PARTY | `broker-for(carrier)` | Evidenced in two clusters independently |
| Franchisor | PARTY | `franchisor-of` | Vicarious-liability theory with no edge |
| Third-party administrator / designated notice agent | PARTY | `administers(plan)` | The (issuer, administrator) pair is org-behind-org; §146.002(d)(2) makes the TPA a billing DESTINATION |
| Health benefit plan issuer | PARTY | `issuer-of(plan covering client)` | Self-funded vs. insured is **outcome-determinative** — a required typed field, not a note |
| Government payer (Medicare/BCRC, Medicaid/TMHP, VA, TRICARE, FECA) | PARTY | `payer-for(client)`; `lienholder-against(recovery)` | **Not in the party type list.** Reachable only as "government entity," which §12 expressly reserves for ADVERSE government — a BCRC record forced into that type is misfiled by the type's own definition |
| Hospital lienholder (Prop. Code ch. 55) | PARTY | `lienholder-against(recovery)` | Validity is *"a boolean with a reason code"*, amount separately computed — **two workflows, not one** |
| LOP provider | PARTY | `lopprovider-holding(LOP)` | A provider ROLE conferred by an instrument, junior to child-support liens. Argues role-as-edge-with-attributes |
| Medical-receivables factor / assignee | PARTY | `assignee-of(provider)` | The party owed changes mid-case while the treatment relationship does not — needs an assignment edge with an effective date |
| Records custodian | AMBIGUOUS | `custodian-at(provider)` | §18.001 needs a signing human; §55.008 addresses the org. Person-at-org |
| IME / Rule 204 examining physician | PARTY | `examiner-for(defendant)` | Created by a CASE event (service of a damages expert report), carries negotiated terms (scope, duration, recording, attendance) |
| Counter-affiant (§18.001(f)) | PARTY | `controverting(bill line)` | Usually the same human as the defense billing expert but a **distinct procedural role** with per-line state — the cleanest argument that role is an edge (person × case × function), not a person type |
| Litigation funder / QSF trustee / settlement planner | PARTY | `funder-of`; `trustee-of(QSF)` | Money machinery; WF-5 gate applies |
| Telematics / ELD provider | CONTACT | `telematics-for(carrier)` | Records source with a spoliation clock |
| Salvage yard / tow lot / storage facility | CONTACT | `possessor-of(vehicle)` | Evidence-custody role with a destruction clock |

### 3.3 Criminal

**BUILT:** client-as-accused (`Client` + posture `defendant`), co-defendant (via roster), law-enforcement
officer (party record with **cross-case history** — the strongest capability evidence in the record),
witness.

**CANDIDATE:**

| Role | CAP | REL | Note |
|---|---|---|---|
| Prosecutor | AMBIGUOUS | `prosecutor-for(cause)` | **CAUSE-LEVEL, and the sharpest live question.** One defendant's causes split between two prosecutors on one docket; printed assignment wrong on ~3 of 8 defendants. Needs a provenance/confidence dimension (imported vs. court-confirmed) no other contact role needs. Already on the queue as **CR-2 §5 Q1** |
| District Attorney's office | AMBIGUOUS | `charging-office-for(cause)`; `parent-org-of(prosecutor)` | Holds its own identity namespace (DA file/incident number) per CR-7's three-way mapping |
| The State | PARTY | `opposing-party-in(cause)` | **"The State," "the DA's office," and the individual prosecutor are used interchangeably and never reconciled.** One entity at three resolutions, or three records? Flagged **Q8** |
| Confidential informant | PARTY | `informant-in(cause)`; `pc-source-for(warrant)` | Payment/benefit records are Brady/Giglio; may need cross-case linkage while identity stays sealed. **Anonymized-identity party type** is the design question |
| Named citizen informant / crime victim / anonymous tip | varies | `pc-source-for(warrant)` | The four PC-source types are distinguished **by reliability analysis** — argues for one informant entity with a typed source-role, not four roles |
| Complainant | PARTY | `complainant-against(client, cause)` | Carries criminal history, medical records, recantation status. See §4 — the family-violence collision |
| Jail / correctional facility | AMBIGUOUS | `custodian-of(client)` | **CLIENT-level, not cause-level** — the mirror image of prosecutor. Carries a source-and-date provenance pair because custody goes stale. Out-of-state variant breaks the bench-warrant workflow |
| Bondsman | AMBIGUOUS | `surety-for(client, cause)` | Listed in the "per cause/matter" field list **without resolving which** — bonds write per cause, a defendant may use one bondsman across causes. Same ambiguity as prosecutor, **unflagged in the capture**. Flagged **Q9** |
| Forensic analyst / chemist / document examiner | PARTY | `expert-for(State)` | The record says outright to *"build the expert challenge history here"* — a second explicit cross-case-history role alongside the officer Statement Bank |
| Qualified blood-draw person | PARTY | `blood-drawer-in(cause)` | Transp. Code 724.017 enumerates four qualifying capacities — the record needs a qualification TYPE, not just a name |
| Loss-prevention officer | PARTY | `investigator-for(retail complainant)` | A private investigating witness; falls **outside** an officer-only Statement Bank despite the identical evidentiary role |
| Prior / substituted appointed counsel | PARTY | `predecessor-counsel-for(cause)` | Implies attorney-of-record needs a **temporal history**, not a current-value field. The withdrawn attorney is the one OCR extracts confidently |
| Pretrial services office + coordinator | PARTY | `supervises(client)`; `employs(coordinator)` | **BUILT precedent for dual linkage** (org AND individual, both required) — reusable for provider/professional and court/judge |
| Family member of client | CONTACT | `mother-of(client)` | See §4 — the cleanest wild instance |

**A precise absence worth the record:** the criminal cluster tracks the supervision RELATIONSHIP in detail
(interlock conditions, discharge date, forward-condition clock, compliance log) **with no counterparty
record.** Neither "probation officer" nor a community-supervision department appears anywhere in the five
criminal files. Do not source that role from this cluster.

### 3.4 Probate — thin by design, reported as absence

**RULED CONSTRAINT (#51, SCOPE §2):** *"probate reserves only the PI-proven estate-adjacent pattern, rest
deferred until real probate documents (design from evidence, not plausibility)."* **The rows below are
therefore recorded, not proposed for build.** PR-3 holds the case-type tree shut; PL-1..PL-4 are unruled.

**BUILT (the reserved pattern):** `representative-of-estate-of` (both as edge and capacity — one of only
two values built at both levels), `heir-of`, `next-of-kin-of`, `spouse-of`, decedent (via `parties.deceased`
+ `deceased_date` + `fka` alias chains + `capacity_points_at_party_id`), substitution mechanics.

**CANDIDATE / RECORDED:** executor · administrator · temporary administrator · **independent executor** ·
person designated executor in a will (a *pre-appointment* status that carries its own fee entitlement — a
taxonomy with only "executor" cannot express a will contest where the designee loses) · administrator with
will annexed · devisee · will beneficiary · legatee · **interested person** · creditor of the estate ·
claimant against the estate · foreign personal representative · the estate itself.

**Four findings that matter more than the list:**

1. **"Interested person" is defined by EXCLUSION** — §352.052(c) carves out creditors and claimants. A
   generic "interested party" contact label silently admits the excluded classes. **The exclusion is the
   entry.** Property law produces the same shape independently: "derivative claimant" is *"a claimant other
   than an original contractor."* **Two independent instances of roles defined by the absence of another
   role.** Nothing in the built vocabulary can express that.
2. **Capacity is a property of the PAYMENT, not the party.** §352.002(b)(2)(C) keys the commission
   exclusion to *"paying out cash to an heir or legatee in that person's capacity"* — the same human paid
   as creditor and as legatee produces different commission math.
3. **The estate is the single largest unresolved modeling question.** It is simultaneously a named taker of
   a survival claim, the payor of fees, and the object every other probate role attaches to. Whether it is
   a party record or the case itself is unruled, and PR-3 gates it.
4. **`legal representative` is NOT an alias of `personal representative`.** §71.021(b) names *"heirs, legal
   representatives, and estate"* as **three unranked takers**, and the record carries a CLAUDE CORRECTION on
   exactly this text. V15's survival half is OPEN. Do not collapse them.

**Named nowhere in the entire repo, despite being standard probate furniture:** ward · guardian (as opposed
to guardian ad litem) · trustee (though ch. 142 trusts are referenced) · next friend as a directory role
(it is a capacity, correctly) · surety · title company · **probate court as a court level** (the master
spec's jurisdiction list is district / county court at law / JP, while §352.003(b) gives the COUNTY court
jurisdiction over independent-executor compensation).

### 3.5 Civil litigation — property/lien line

| Role | CAP | REL | STATUS |
|---|---|---|---|
| Original contractor | PARTY | `original-contractor-for(owner)` | **CANDIDATE** — *"this single fact selects between two very different deadline sets."* Must be a **captured, dated, evidence-backed determination on the matter**, not a party attribute; §53.026's sham-contract rule can legally override it |
| Derivative claimant | PARTY | `subcontractor-to(GC)` | **CANDIDATE** — defined negatively (see §3.4 finding 1) |
| Property owner | PARTY | `owner-of(property)` | **CANDIDATE** — §53.156's fee carve-out is keyed to the owner being the PAYOR, so the role needs a posture |
| **Then-current record owner** | PARTY | `record-owner-of(property, as-of date)` | **CANDIDATE — and the sharpest structural row in this section.** A single "owner" link cannot express *"the owner as of the date of the recorded agreement."* **Ownership-over-time is a missing dimension**, and no title-company role exists anywhere despite the whole practice line being about clouding title |
| Lender / construction lender | PARTY | `lender-to(owner)` | **CANDIDATE** — the only role in the record owning a **business-day** deadline, and the only non-party whose INACTION is a modeled cascade event |
| Restoration TPA / carrier managed-repair program | PARTY | `intermediary-between(client, owner)` | **CANDIDATE** — its interposition changes the client's statutory role and can trigger the sham-contract rule. Volume unknown (open item L2) — do not build as though established |
| Intervening purchaser / subsequent creditor | AMBIGUOUS | — | **DECLINE** — matters as a time-ordered CLASS, never as identified persons |

**Organizational-client gap:** the master spec's Client party type is built entirely around an individual
(DOB, SSN, driver's license, aliases, emergency contact, health insurer). The Servpro restoration operator
is a **business client** and has no path through that type. Flagged **Q10**.

### 3.6 DECLINE — roles a naive mining pass would create, and shouldn't

Recorded so the decision is deliberate rather than an omission.

| Candidate | Why it is not a role |
|---|---|
| Anonymous tipster | An actor whose reliability the case turns on but who **by definition has no identity to store**. Attribute of a tip record |
| "Minor" as an enhancement trigger | An age attribute on a passenger or complainant, not a standalone actor |
| Dispatcher / CAD | A records system, never a named actor — it sits in discovery lists alongside genuine actors, which is what makes it tempting |
| Grand jury | "Grand jury term" is provenance metadata on an indictment |
| **Trafficking victim (§411.0728)** | **This is the DEFENDANT'S OWN status** unlocking a nondisclosure route. A role-miner reads it as a third party. It is not |
| Accrediting body (ANAB) | Reference data, named once as the source of a lab's accreditation status |
| Trade name / d/b/a | **DEAD by ruling** — a trade name is an alias with a multi-match flag, never a node |
| Statutory service targets (Secretary of State, city manager, superintendent, Transportation Commission chair, U.S. AG) | **BLOCKED by ruling** — service-story fields are Scope-OUT of CD-1; `servicePathHint` is currently consumed by nothing. Identified by TITLE, not name — evidence that some roles resolve to a *position on an org*, not a person |
| Intervening purchaser | See §3.5 |

---

## §4 — Where "family" generalizes, and where it must not

The dispatch asked specifically where a generic "family" relationship type would have to absorb a specific
tie. **The answer is that the record contains two populations that look alike and behave completely
differently, and one built vocabulary gap sitting between them.**

**The gap:** `family-of` was named in the roster-mining capture (REQ-11) as a needed entity↔person link and
**did not make it into the built 19 edge types.** Built kinship is `spouse-of`, `parent-of`, `heir-of`,
`next-of-kin-of` — four specific ties, no generic. So today there is no way to record "related, unspecified."

**Population A — soft ties, where a generic family edge is CORRECT and sufficient:**

- **Emergency contact** (a flat field on the client record today; the legitimate soft-family case)
- **"Client's mother"** — the cleanest wild instance in the record: written by hand on a criminal docket
  worksheet, became a "call" task, and was **lost between worksheets**. Michael wrote the *tie*, not just
  the name. A generic type absorbing it must preserve "mother" as a sub-tie or the note stops being useful.
- **Passenger co-plaintiff sharing surname and household** — usually implied by shared surname plus address,
  **rarely pled**. The edge holds a fact the pleadings do not.
- **Family-member co-defendant** in small-business civil matters.
- **"Other responsible person" / "family members otherwise responsible"** (§146.002, §146.003) — the statute
  itself abstracts a family tie into a functional category, which is exactly what a generic type should do.

**Population B — statutory classes, where a generic family type LOSES load-bearing content:**

**CPRC ch. 71 wrongful-death beneficiaries (surviving spouse, children, parents)** are the sharpest case.
A soft "family" link loses four things at once:

1. **EXCLUSIVITY** — the class is closed. Siblings, grandparents, and step-relations are OUT. A family type
   invites entering them with no way to mark them non-beneficiaries.
2. **CONTESTABILITY** — common-law marriage *"already drives the wrongful-death beneficiary set."* Membership
   can be litigated and adjudicated; a contact link cannot express "alleged" vs. "determined."
3. **TIME-INDEXING** — §71.010(b) divides only among those *"alive at that time."* Membership is evaluated at
   verdict, not at intake.
4. **A COLLECTIVE VETO** — §71.004(c) lets ALL class members together bar the PR from suing. That requires
   the system to **enumerate the class exhaustively**, not list known relatives.

And a fifth that attaches to the surviving spouse alone: **§71.005 is a per-role evidentiary rule** —
ceremonial remarriage is admissible, common-law marriage and marital prospects are barred to the defense.
A contact attribute cannot carry a trial rule.

**Two more in Population B:** **heirship** is adjudicated, not asserted (*"heirship turns on family
relationships"* — but the legal object is a determination); and **the owner's spouse as homestead
co-signer** (Prop. Code §53.254(c)) is an **element of a lien's validity** — retrospective, uncurable, and
its absence reroutes the entire matter to different theories. The evidenced fact pattern is a form *"signed
at the door, often by one spouse."*

**A collision worth naming:** in family-violence criminal matters the **complainant is, by the charge's own
elements, in a family/household/dating relationship with the client** — simultaneously a family tie and the
adverse party. A generic family edge would have to hold both at once. Related: the same human may hold a
criminal complainant role and a civil protective-order applicant role concurrently.

**The standing constraint on all of it (#9, FAM-1):** family-law *considerations* are RETAINED as
cross-cutting flags — *"load-bearing for probate specifically"* — but there is **no family case type, ever.**
A family edge vocabulary is permitted; a family role or practice area is not.

---

## §5 — Open questions, full text (QR-1)

**Packet-local IDs Q1–Q10. No durable IDs assigned — the queue runner assigns them at reconciliation, and
no new series is minted here** (series creation is a ruling, not a formatting choice).

**Q1.** Should the two source files that hold the authoritative role vocabulary — `src/domain/partyRegistry.ts`
and `src/domain/roster.ts` — be pasted into a design chat so this mining pass can mark BUILT vs. CANDIDATE
with certainty instead of `TAG-CHECK: NOT RUN`? The project instructions bar design sessions from reading
`src/` and name pasting as the escape hatch; roughly 60 rows in §3 turn on it. Alternatively: should a Code
session run the comparison instead, since Code reads `src/` freely?

**Q2.** Is a role that is **defined by the absence of another role** — probate's "interested person"
(excludes creditors and claimants) and property law's "derivative claimant" ("a claimant other than an
original contractor") — expressible in the ruled roster model at all, or does it need a new construct? Two
independent practice areas produced the same shape, which argues it is structural rather than incidental.

**Q3.** Should `case_parties.role` remain **free text**? It is the axis this whole document is about, and it
is the only one of the six ruled axes with no CHECK constraint, no enum, and no lookup table. `party_status`,
`capacity_kind`, `joined_by`, `active_state`, and the 19 edge types are all DB-enforced; `role` is not.

**Q4.** Should the asymmetric edge types get their inverse directions — `lessee-of` to match `lessor-of`,
`bailor-of` to match `bailee-of`? Adding an edge type is a spec-level act, so this is a ruling, not a fix.

**Q5.** Should `parent-of` be split? It currently serves both corporate parent/subsidiary (the trucking
holding-company family) and human parent/child (the next-friend case). One edge type, two ontologies.

**Q6.** Four separate party types (Business, Insurance company, Government entity, Provider business) each
carry their own `registered agent (name & address)` field, while `registered-agent-of` also exists as an
edge. That is duplicated identity across types — the condition the enter-once principle exists to prevent.
Consolidate onto the edge, or keep the fields?

**Q7.** Do internal firm actors (responsible attorney, assigned paralegal, timekeeper, the ReviewLog "who")
live in the **same person namespace as parties**, or in a separate auth/user namespace? The case-event
core's `actor` field and the time facet's `timekeeper` both point at this unresolved namespace, and the
system is single-user today with staff later.

**Q8.** On the criminal side, are **"the State," "the DA's office," and the individual prosecutor** one
entity at three resolutions, or three records? The record uses all three interchangeably and never
reconciles them, while CR-7's three-way number mapping implies the DA's office holds its own identity
namespace per cause.

**Q9.** Does **bondsman** attach at cause level or matter level? The Uvalde capture lists it among fields
"needed per cause/matter" without resolving which — bonds are written per cause, but a defendant may use one
bondsman across causes. This is the same ambiguity §5 Q1 flags for prosecutor, and it was **not** flagged
there. (Same question, third instance: does **"client's mother"** attach per matter or per client? A client
with three causes has one mother.)

**Q10.** Is there a path for an **organizational client**? The Client party type is built entirely around an
individual (DOB, SSN, driver's license, emergency contact, health insurer), while the Servpro restoration
operator is a business and business plaintiffs exist on the civil line. Related and already on the record as
an open spec-feedback item: the **party-type promotion path** (PNC → Client) does not exist, so re-entering
a person as a new Client party would split their cross-case history.

---

## §6 — What this pass did NOT do

- **No spec file was touched.** `contact-directory.md` §5/§6 vocabularies are unchanged; adding to them is a
  spec-level act (CD-3 precedent).
- **No ID was minted.** Q1–Q10 are packet-local. No new series was created.
- **`src/` was not read** — deliberately, per the design-side convention, with the consequence marked on
  every affected row rather than papered over.
- **Nothing was verified.** Every statutory proposition cited here travels at the status its registry entry
  already carries; this document supplies no cite and upgrades none.
- **Probate was not built out past the reserved pattern**, per the #51 SCOPE ruling. The probate rows are
  recorded evidence, not proposals.
- **No role was invented to make an area look covered.** Where a role is absent, §3 says so by name —
  probation officer, ward, guardian, trustee, surety, title company, probate court as a court level.

---

*8 clusters, 96 files read full-text at `aa033dc`, ~420 raw role mentions consolidated. Authored 2026-08-13
Central under DT-1. PROPOSED design input; nothing ruled, nothing built, nothing verified.*
