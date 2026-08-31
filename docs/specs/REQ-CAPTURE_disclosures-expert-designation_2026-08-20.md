# REQ-CAPTURE — disclosures expert designation: the facility-as-expert defect, the generator spec, and sixteen requirements

**Canonical repo path WHEN FILED:** `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` — NEW file, **filed for the first time by the packet that carries this text.**
**Channel:** REQ-1 — CIVIL LIT practice project → Michael's hand → this design project → reconciliation → ruling. Seventh REQ-CAPTURE through the channel; the second from CIVIL LIT on the disclosures instrument in two days (see addendum §0.2 on its unfiled sibling).
**Source (client-clean by construction):** a real, approved, served plaintiff's-side combined TRCP 194.2(b) / 195.5 disclosures instrument designating seven provider groups in a motor-vehicle personal-injury matter. No party, provider, cause number, amount, or date of occurrence appears below.
**Status of Parts 1–8:** UNRULED INPUT from the drafting side as delivered by Michael 2026-08-20 (Central) — no design rulings, no build claims. Everything is PROPOSED until ruled, except the three never-do rules Michael states he has already ruled (Part 5, ND-1–ND-3), which the addendum RECORDS on this project's record for the first time.
**DT-1:** Parts 1–8 and the addendum's original text are stamped 2026-08-20 Central (clock-checked 21:56 CDT; container UTC read 2026-08-21 and was NOT used). **Every stamp added by the 2026-08-25 fold-in is 2026-08-25 Central, clock-checked 13:02 CDT against a container UTC of 2026-08-25 18:02 — the same calendar day, so the divergent window did not apply.**

---

## HOW THIS FILE IS LAYERED — read this before reading anything else

This file has **never existed at its canonical path until now.** It was verified ABSENT at `origin/master` on 2026-08-22 (`#136`) and **re-verified ABSENT at HEAD `edea20b` on 2026-08-25** by `git ls-tree -r --name-only HEAD docs/ | grep -i req-capture` — six REQ-CAPTUREs returned, all 2026-08-11/12, this one not among them, against a positive control that fired. Everything it contains lived only in project knowledge until this packet.

It is layered in three:

| Layer | What it is | Status |
|---|---|---|
| **PARTS 1–8** | Michael's capture, **VERBATIM**, 2026-08-20 | **UNCHANGED, and never to be changed.** These are his words. |
| **RECONCILIATION ADDENDUM §0–§10** | Opened 2026-08-20 (Fable 5, typed, Cowork; filed at `#127`). **REWRITTEN IN PART 2026-08-25.** | Sections that the design has since moved past carry a **`REWRITTEN`** banner naming the date, the ruling, and — in one line — what the section used to say. **The superseded text is NOT reproduced here.** It lives in the session log at `#127` and in the captures. |
| **§11–§19** | New sections carrying rulings taken **after** the addendum was authored — 2026-08-21, 2026-08-22 and 2026-08-24 | The operative spec of what a designation paragraph must contain. |

**THIS IS A REWRITE, NOT AN ANNOTATION.** The instruction comes from the 2026-08-22 capture's own RR-1-forward pass (`#135`) — **these are the CAPTURE'S words, i.e. Claude's, not Michael's**, and they are quoted because they state the warrant plainly: *"The addendum's shape was: twelve templates produce paragraphs; the person is the unit; a review gate protects the render. **All three are now false.**"* **What is Michael's is each of the rulings that made them false**, and every one of those is quoted in its own place below. Where a section moved, **its superseded text was replaced, not set beside its replacement** — nowhere in this file does an old account of a ruling sit next to the new one. *(Two things that are NOT that failure and appear deliberately. **First**, a ruling may be STATED in a rewritten §§0–10 section and DEVELOPED at length in §§11–19 — §1.5/§13.4 and §8 Q4/§17.2 are two such pairs; one account at two depths, the short form pointing to the long one. **Second, a SUPERSEDED ruling is recorded beside its correction wherever the SEQUENCE is itself the record** — §12.2 (warning → hard stop), §13.2 (Part 3 rule 5 against the 2026-08-22 radiologist ruling, both Michael's), §14.0/§16.1 (`HD-12` ruled and then reversed), §17.3 (an answer reversed inside one exchange) and §17.6 (silent phone omission → flag it). **Those pairs are not two live accounts; they are one ruling and the record of how it got there, and flattening them would destroy the more useful half.**)* **No parallel disclosures spec exists or should be created** — `form-engine.md` remains the engine spec, this file remains the requirements capture, and where they disagree the later ruling governs and the disagreement is named.

**SUPERSESSION LEDGER — every section this fold-in rewrote, and by what:**

| Section | Rewritten by | Ruled |
|---|---|---|
| §1.2 / §1.4 | the chronology is the engine's real input; the defect sits one layer upstream | 2026-08-21 (walk, rulings 1, 8) |
| §1.6 (FE-18) | `facility`-keyed not `organization`-keyed; **wording NOT ratified** | 2026-08-21 (walk, rulings 3, 4) |
| §2 | the schema rename is **RULED IN**; this section's recommendation is **REJECTED** | 2026-08-21 (walk, ruling 4 / widget C) |
| §3 | FE-19 redefined; FE-20 narrowed; R13's row retired; CD-14 gains a second limb; widget G's ID **never minted** | 2026-08-21 / 2026-08-22 |
| §4 | ND-3's similarity lint **REMOVED** and its unit re-based to the facility; ND-8 **elevated to load-bearing** | 2026-08-22 (5.2, 6.6) |
| §5 | widget-by-widget disposition; **D and F were DISSOLVED, not answered** | 2026-08-21 / 2026-08-22 |
| §6 (FE-19) | the check moved **upstream onto provider records**; it **never blocks** | 2026-08-21 (voice3) / 2026-08-22 (HD-22) |
| §7 | re-scoped **by track**, not only by requirement | 2026-08-21 (walk, ruling 10) |
| §8 | Q1, Q4, Q5, Q7, Q9, Q10 all moved | 2026-08-21 / 2026-08-22 |
| §10 | the to-Code list | 2026-08-25 |

**WHAT THIS FOLD-IN DELIBERATELY DID NOT DO.** `RC-1` (the FORM of the floor), `RC-2` (widget G's unminted ID), `RC-3` (the causation line's singular-vs-collective inflection) and `R11` (the TRCP 195.2 designation deadline) are **left visibly open.** No text below presupposes an answer to any of them; where a sentence had to lean one way to be coherent, **the dependency is flagged in place rather than resolved.** No TRCP 195.2 deadline is computed, displayed, or proposed anywhere in this file.

**ID SERIES NOTE.** The disclosures `H` series was renamed **`HD-1`–`HD-22`** on 2026-08-22, **FORWARD-GOING ONLY**, on the 2026-08-13 `H`→`HK` precedent. This file uses `HD-` for every disclosures item. **Backfilled log entries, `case-heartbeat-design.md`, and existing queue rows keep their original `H` strings and are NOT retroactively renumbered.** Where a bare `H` appears in a quoted line it is quoted, not adopted. **`H5` in this file always means the binding convention (Michael answers first; no unprompted machine sweeps), never a disclosures item** — that string collides and the collision has already cost this project two nearly-destroyed queue rows (`#133`).

**`§9` IS AMBIGUOUS IN THIS FILE'S SOURCE MATERIAL AND IS DISAMBIGUATED HERE.** The addendum's own **§9** is the registry census. **`form-engine.md` §9** is the twelve approved paragraph variants. Where the 2026-08-22 capture speaks of *"§9's twelve-variant framing"* (its supersession header) and *"§9's framing"* (its RR-1-forward line at PART 8.5), it means **`form-engine.md` §9** in both places. Every reference below names which. **Nothing in this file edits `form-engine.md` §9's twelve paragraphs** — they are Michael-approved verbatim and their text is untouched by every ruling folded in here.

---

## PARTS 1–8 — MICHAEL'S CAPTURE, VERBATIM

```
=====================================================================
PART 1 — LEAD WITH THIS. IT IS A DEFECT, NOT AN IMPROVEMENT.
=====================================================================
THE DEFECT: the disclosures our software generates today designates the FACILITY as
the testifying expert instead of the individual medical provider.
ROOT CAUSE (the drafting project's diagnosis, from the approved document):
There are two rosters in a disclosures instrument, keyed to different kinds of thing,
and they look like one roster.
  - The 194.2(b)(4) charges table is legitimately ENTITY-keyed. Every line is a
    facility or professional entity, because bills issue from entities. Correct as an
    entity list.
  - The 195.5(a)(1) designation block is legitimately PERSON-keyed. Its designees are
    named individuals whose names come from the ENCOUNTER/TREATMENT side of the
    records. Those names appear nowhere in the charges table.
Same providers, two rosters, two key types, two sources inside the chronology. A
pipeline that builds both renderings from one entity-keyed source puts a facility in
the designee slot every time. This is a DATA-MODEL problem, not a prompt problem —
better paragraph generation cannot fix it, because the generator is being handed the
wrong kind of object to designate.
THE CORRECT FALLBACK IS ALREADY PROVEN IN MY APPROVED WORK: two of the seven
facilities in that instrument had charges but no resolvable individual provider.
Neither was designated as an entity. Both degraded to the person-ROLE — "The
Custodian of Records for [facility]" — keeping a person in the designee slot and the
facility in the affiliation slot. Where no individual resolves, degrade to the
person-role, never to the entity.
THE NAMING TRAP THAT LIKELY SEEDED IT: the served document's charges table carries
the column header "PROVIDERS" over a list of entities, while the 195.5 block
designates "healthcare providers" who are individuals. One word, two incompatible
referents, both correct in context. Any schema field named `provider` inherits the
ambiguity silently, and a `providers` list populated from billing then consumed by a
designation renderer produces exactly this defect — while every name in it looks
right to a reviewer, because those ARE the providers, in the other sense.
PROPOSAL: retire the bare term `provider` from the schema. Use distinct types —
billing_entity / facility, and treating_individual / designee. Reserve "provider" for
prose output only. Renaming makes the defect a type error instead of a substitution.
CONTAINMENT: a render-blocking lint on every designee slot. Layered detection, because
the approved document defeats both obvious string heuristics — it contains an entity
whose name reads as people (corporate suffix plus a plural human occupational noun)
AND an individual carrying no credential suffix. Signals, authoritative first:
  1. Does the value resolve to a PERSON record or a FACILITY record in the roster?
     Facility in a designee slot fails, full stop. Only check trustworthy alone.
  2. Backstop: corporate form — PLLC, LLC, L.L.C., Inc., P.C., P.A., L.L.P., Ltd.
  3. Backstop: facility nouns — Hospital, Clinic, Center, Institute, Imaging,
     Associates, Group, Practice, Specialists, Health.
  4. Weak corroboration only: personal-name shape, credential suffix present.
On failure, BLOCK the render and offer the two lawful resolutions: supply the
individual's name, or degrade to the person-role designation. Never auto-resolve by
silently dropping the paragraph — a missing designation is its own exposure.
=====================================================================
PART 2 — MY RULINGS THAT FRAME THE REST
=====================================================================
1. Claude should DRAFT the expert-designation paragraphs from information in the
   medical chronology, as a built-in part of the disclosures workflow. These are not
   going to be completely form paragraphs.
2. Possibly the WHOLE disclosures instrument should be generated from different data
   points across the case file — the information does not have to be filled out on
   one form page.
The evidence supports this. In the approved instrument, no two narrative paragraphs
are alike, and they differ STRUCTURALLY — by which sentences exist at all — not by
substituted values. A template engine cannot produce that document.
=====================================================================
PART 3 — THE GENERATOR SPEC (this is the real deliverable)
=====================================================================
Each designation = a CONTACT BLOCK + a NARRATIVE PARAGRAPH built from SENTENCE SLOTS.
CONTACT BLOCK, in order: individual name + credential (credential is NULLABLE — the
approved document has a named provider with none), one line per individual; a
custodian line ("And/or Custodian(s) of Records", number tracking the count of named
individuals); facility name; street; city/state/ZIP; phone. The facility's contact
data serves as the individual's 195.5(a)(1) address and telephone.
SENTENCE SLOTS:
  S1   identity + role descriptor
  S1b  co-participant identity (multi-individual blocks with a lead)
  S2-treat  care rendered — evaluated and treated [party] for injuries sustained in
            the [incident] on [incident_date], including [diagnosis_list] (nullable)
  S2-read   study interpreted — interpreted the [modality] of [party]'s [body_region]
            performed at [facility] on [STUDY_DATE — never the incident date]
  S2-cust   custodial knowledge — replaces S2 through S8 entirely
  S3   basis of testimony (personal treatment / imaging review / examination) plus a
       knowledge clause, tailing "gained from education, training, experience and
       research"
  S4   treatment + reasonableness and necessity of that treatment and its costs
  S5   personal examination AND DIAGNOSIS, as related to and caused by the incident
  S6   anticipated scope of testimony
  S7   damages elements (near-invariant list)
  S8   causation within a reasonable degree of medical probability
WHAT VARIES, BY ROLE — this is the whole point:
  Treating physician:    S1, S2-treat, S3(personal treatment + "personal MEDICAL
                         knowledge"), S4("medical"), S5 FIRES, S6 wide (care,
                         condition, injuries, damages, prognosis, modes of
                         treatment), S7, S8 object = "the injuries [they] treated"
  Co-participants:       adds S1b; identical otherwise; PLURAL throughout
  Imaging interpreter:   S2-READ replaces S2-treat; S3 basis = imaging review, NOT
                         personal treatment; S4 OMITTED; S5 OMITTED; S6 = imaging
                         read + other imaging + findings + relation to incident;
                         S8 object = "THE FINDINGS [they] IDENTIFIED"
  Diagnosing non-MD
   (e.g. chiropractic):  full physician-shaped set; S5 FIRES. Licensure scope, not
                         degree letters, decides.
  Therapy providers:     S5 OMITTED; S3 downgrades "personal medical knowledge" to
                         "personal knowledge"; S4 becomes "the physical therapy
                         treatment" and the cost clause drops "medical"; S6 narrows
                         to treatment and examination only; S7 appends a catch-all
  Custodian only:        S2-cust only — knowledge of the medical and billing records,
                         how they are prepared and kept in the regular course of
                         business, and the reasonableness of the charges
Two custodian-only paragraphs in the approved document differ from each other by a
SINGLE CLAUSE — one names the care episode and its date, the other does not — purely
because the chronology knew it for one facility and not the other. That is the
cleanest proof available that these are composed from what is known, not stamped.
TOKENS (39): provider_full_name, provider_credential_suffix (nullable),
provider_role_descriptor, additional_provider_names, provider_pronoun(_poss),
provider_short_reference, facility_name, facility_street_address, facility_city,
facility_state, facility_zip, facility_phone, custodian_line, designee_count,
party_short_name, party_pronoun(_poss/_obj), incident_type, incident_date,
care_episode_descriptor, care_episode_date, care_episode_component, diagnosis_list,
imaging_modality, body_region, study_date, care_scope_phrase, charges_scope_phrase,
basis_clause, knowledge_clause, treatment_qualifier, cost_qualifier, scope_object,
causation_object, damages_element_list, provider_charges_total, charges_grand_total.
CHRONOLOGY -> TOKEN FEED: provider name -> provider_full_name (NULL means degrade to
custodian-only + raise the gap flag); credential -> credential_suffix; specialty or
department -> role classification, which selects the slot set; facility -> facility_name
(VERIFICATION GATE, see below); dates of service -> care_episode_date / study_date,
never conflated with incident_date; encounter type -> care_episode_descriptor;
diagnoses -> diagnosis_list; modality -> selects the imaging variant; charges ->
provider_charges_total; Bates cite -> provenance anchor, not printed.
NOT IN THE CHRONOLOGY but needed: facility street address, city, state, ZIP, phone.
Those must come from a separately enrichable facility record.
DECISION RULES FOR EXPECTED TESTIMONY:
 1. Scope follows what the provider actually did; role is read from the encounter
    type, not from a default list.
 2. No examination sentence for a provider who did not examine.
 3. No diagnosis language, and no "medical knowledge", outside licensure scope.
 4. Charges opinions stay inside the provider's own facility.
 5. The causation object tracks the provider's actual work product — injuries treated
    vs. findings identified. This is the most legally consequential generation error
    available, because getting it wrong claims an opinion the provider cannot give.
 6. Named conditions appear only where the records name them; leave null otherwise.
 7. DEGRADE, DON'T INVENT — drop to the less specific sentence rather than filling a
    gap with a plausible value.
 8. The global non-retained preamble carries the collective opinions so an individual
    paragraph never has to over-claim.
 9. Custodian-only is a fallback, not a choice — and it raises the gap flag.
10. Every generated paragraph is a draft until I read it.
=====================================================================
PART 4 — REQUIREMENTS (packet-local IDs; assign durable ones)
=====================================================================
R1  Generative paragraph composition, not template fill. [NOW]
R2  The instrument as an assembly over the case file, not a form page — each
    disclosure subsection a bound response object with its own data source, fill
    state, and supplementation history. [NOW]
R3  One provider roster, three renderings (charges table / persons-with-knowledge
    cards / designation blocks), ONE canonical order. In the approved document the
    orderings do not agree — one facility sits fifth in two renderings and last in
    the third. Ordering mismatch should be a lint. [NOW]
R4  Provider-as-person and facility-as-entity as distinct records joined by a typed
    affiliation edge. Designee slot accepts a person or person-role, never an entity.
    [NOW — this is the defect's root cause]
R5  Provider-role classification drives the slot grammar; system proposes, attorney
    confirms, because role determines how far the opinion reaches. [NOW]
R6  Chronology-field provenance, with a VERIFICATION GATE on provider-to-facility
    attribution specifically — medical-chronology tools have already been caught
    attributing a treating physician to a facility where he does not practice, and
    that field is what my never-do rules turn on. [NOW]
R7  Charge-weighted designation-gap detection. In the approved document the LARGEST
    single provider charge — roughly a third of the past medicals — is designated
    custodian-only with no named individual. Visible only by reading the charges
    table against the designation block. Flag it. [SOON]
R8  Global preamble and per-provider paragraph as separately versioned composable
    layers. [SOON]
R9  Retained / non-retained switch controlling which 195.5(a) fields exist. The
    retained branch is UNEXERCISED in the source document — do not infer its shape
    from this capture. [SOON]
R10 Grammatical number agreement across the whole block, driven by designee count —
    the most likely failure mode of naive generation. [SOON]
R11 Designation-deadline computation keyed to the end of the discovery period, not to
    a service date; presented as a PROPOSAL for my confirmation. [SOON]
R12 Supplementation as first-class state; supplemental instruments generated as a
    diff. The source document reserves supplementation in five places. [SOON]
R13 Attorney-review state on generated prose (generated -> reviewed -> approved),
    distinct from data fill state; no render to outbound while any paragraph is
    unreviewed; retain attorney edits diffable against the generation so the
    generator can be retuned from real edits. [NOW]
R14 Facility contact data as its own enrichable entity record, populated outside the
    chronology and reused across matters. Feeds the contact-directory work. [SOON]
R15 DEFECT ROOT CAUSE — two rosters, two key types (Part 1). [NOW]
R16 DEFECT CONTAINMENT — render-blocking entity-in-designee lint (Part 1). [NOW]
=====================================================================
PART 5 — NEVER-DO RULES
=====================================================================
RULED BY ME, ALREADY BINDING:
 ND-1 Individuals are designated. Facilities and businesses are never designated.
      *** ACTIVELY VIOLATED by current output ***
 ND-2 The facility appears only as the individual's affiliation, never as the subject
      of the designation. *** ACTIVELY VIOLATED — the reciprocal of ND-1: when the
      facility occupies the designee slot it has vacated the affiliation slot, and
      the individual has no place in the document at all. ***
 ND-3 No two providers share one stock paragraph.
CANDIDATES OBSERVED IN MY APPROVED DOCUMENT — put each to me for a ruling, with your
recommendation, and tell me which are enforceable as automated lints vs. which are
drafting judgment:
 ND-4 Where no individual name is available, the designee is still a PERSON,
      designated by role. The entity never slides into the designee slot.
 ND-5 No paragraph asserts an opinion the provider's own records do not support.
 ND-6 Retained-expert fields never render on a non-retained paragraph.
 ND-7 A provider in the charges table appears in every other rendering of the roster,
      in the same canonical order.
 ND-8 Number agreement holds across the whole block.
 ND-9 Study dates are never rendered as the incident date, and vice versa.
=====================================================================
PART 6 — OPEN QUESTIONS. Answer or re-scope all ten.
=====================================================================
Q1  Is the generation step modeled as (a) a step producing prose into a reviewable
    draft object inside the disclosures module, (b) a general document-generation
    service the module calls, or (c) something else? This decides whether the
    sentence-slot grammar is versioned, diffable, and testable, or lives in a prompt.
Q2  Where does the medical chronology live in the data model — imported artifact,
    first-class entity set, or both? If imported from an outside tool it needs a field
    mapping layer and a provenance record, and see R6 on facility attribution.
Q3  Should custodian-only designations sit on the expert track at all, or on a
    separate records-predicate/affiant track that also feeds § 18.001 affidavits and
    Rule 902(10) business-records affidavits? My approved document places them inside
    the 195.5 block, but they assert no medical opinion.
Q4  Canonical roster order — treatment-chronological, charge-descending, or
    attorney-set per matter? And is an ordering mismatch across renderings a blocking
    lint or a warning?
Q5  R7's gap flag — what trigger: absolute dollar threshold, percentage of the damages
    total, rank position, or attorney-set per matter? Surface at generation, at
    pre-service review, or both?
Q6  Before building the retained branch of 195.5(a), do you want a second capture from
    a matter where I have actually designated retained experts — life-care planner,
    economist, reconstructionist — or is the rule text enough to specify the fields?
Q7  ND-3 says no two providers share one stock paragraph. What happens when generation
    legitimately produces two near-identical paragraphs because two providers did the
    same thing in the same role at different facilities? A naive similarity lint would
    fire on my approved document, where two custodian-only paragraphs differ by one
    clause.
Q8  My source document combines 194.2(b) and 195.5 into one served instrument with the
    expert block between subsections (5) and (6). Is the combined form the house
    standard or a per-matter choice? Decides one instrument with an embedded block vs.
    two instruments with a shared roster.
Q9  *** DEFECT-CRITICAL. *** Does our chronology import carry ENCOUNTER-LEVEL records
    at all, or only billing rows? If only billing rows, the individual providers'
    names are not in the system, the facility-as-expert defect cannot be fixed inside
    the designation renderer, and R15 is upstream pipeline work plus a
    records-to-named-individual resolution step. This is the one question the drafting
    project could not answer, and it is a large difference in scope.
Q10 Should custodian-only degradation be AUTOMATIC, or should it BLOCK and require an
    attorney decision above a charge threshold? Automatic degradation produces valid
    output but quietly converts a proof gap into a clean-looking paragraph — which is
    exactly how the largest charge line in my approved document ended up with no named
    person behind it. Rule it, don't default it.
=====================================================================
PART 7 — LEGAL PROPOSITIONS RELIED ON: ALL UNVERIFIED
=====================================================================
TRCP 194.2(b)(1)-(12) required-disclosure content; TRCP 195.5(a)(1)-(4) expert
disclosure content; the NON-RETAINED branch of 195.5(a)(3), which lets the instrument
satisfy the opinions-and-basis requirement by pointing at produced records rather than
reciting opinions — the whole method depends on this reading; 195.5(a)(4) applying
only to retained/employed/controlled experts; TRCP 195.2 timing (90 days for a party
seeking affirmative relief, 60 for all others, before the end of the discovery
period); TRCP 195.1; TRCP 193.5 supplementation; TRCP 193.6 exclusion for failure to
designate; TRCP 194.5 (no objection or work product to a required disclosure); TRCP
192.3(c) and Axelson, Inc. v. McIlhany, 798 S.W.2d 550 (Tex. 1990); Baylor Medical
Plaza Services v. Kidd, 834 S.W.2d 69, 73 (Tex. App.—Texarkana 1992, writ denied)
(designate whether or not compensated — the proposition the entire non-retained
treating-provider practice rests on); Tex. Civ. Prac. & Rem. Code § 18.001; Tex. R.
Evid. 902(10); Tex. Civ. Prac. & Rem. Code § 41.0105 and Haygood v. Garza de Escabedo,
356 S.W.3d 390 (Tex. 2011); TRCP 190.3(b)(1)(A).
Do NOT treat any of these as settled law, and do not build validation logic that
depends on one without flagging it. I verify. Flag § 18.001 specifically — its notice
and counteraffidavit mechanics have been amended and the drafting project's reading
came from a treatise, not the rule text.
=====================================================================
PART 8 — WHAT I WANT OUT OF THIS SESSION, IN ORDER
=====================================================================
1. The defect path: where facility-as-expert actually lives in what we have built,
   whether the fix is a renderer change or a pipeline change (turns on Q9), and the
   fix as a design ruling I can queue to Code with R16's lint spec included.
2. A ruling on the schema rename, plus the blast radius of renaming now.
3. Durable IDs for all sixteen requirements, reconciled against the registry — several
   touch prior captures on contact directory, format profiles, as-generated retention,
   and the deadline engine. Flag duplicates rather than creating parallel IDs.
4. Rulings on ND-4 through ND-9.
5. R1 through R14 worked against BUILD-STATE: built, queued, new, or conflicting.
6. Answers or re-scoping for all ten questions.
7. A session-log entry in house format, a routing table, and an explicit statement of
   what goes to Code and what stays design-side.
Do not overstate rules. Where you are unsure, ask me.
```

**A NOTE ON PART 7, ADDED 2026-08-25 AND NOT A CHANGE TO IT.** Part 7's blanket UNVERIFIED label covers cites. It does **not** cover the one **characterization** inside it — the *Baylor Medical Plaza v. Kidd* parenthetical ("designate whether or not compensated"), which states a holding. Under the V-9 amendment to CLAUDE.md's majority-opinion rule, characterizing an opinion requires the court's own document, a paginated vendor copy stating authorship on its face, or Michael's own identification. **None was obtained. That parenthetical is a characterization entering a design document unread, and it is flagged here rather than relied on.** Nothing in this file computes from it. Michael verifies.

---

# RECONCILIATION ADDENDUM — opened design session 2026-08-20 Central (`#127`; Fable 5, Cowork, typed) — **REWRITTEN IN PART 2026-08-25**

Reconciled per REQ-1 against BUILD-STATE (`57699a7`, "one hundred twentieth refresh", read in full through the device bridge), the live session log's top entries (latest design entry `#126`; latest Code entries the FE-D1 build and the `dev:demo` fix, both 2026-08-20), `db/schema.sql` at HEAD, `form-engine.md`, `contact-directory.md`, `fe-d1-build-slice.md`, `spec-feedback.md`, the attorney-review queue's FE / CD / IN / DL sections, and the four registry files — BEFORE anything was staged. Bridge reads were lock-free (`GIT_OPTIONAL_LOCKS=0`); no `.git/index.lock` was stranded; `inbox/` on `mdb-pllc` was empty at session start. No `src/` file was read (the working-set rule; `Q-PR3-1` unruled) — every statement about what the built engine DOES is therefore a statement about what the SPEC it was built from requires, and is labelled so.

**RE-RECONCILED 2026-08-25 (Opus 5, Cowork, typed, device bridge granted on the checkout and on `Documents\Knowledge Repo`) against BUILD-STATE at HEAD `edea20b` — the one hundred twenty-third refresh, written by queue-runner batch 82 — `CLAUDE.md`, `docs/specs/session-log-head.md`, and the live log and full abstract index at `docs/record/`, read at HEAD over the bridge.** Verified at that HEAD and stated rather than carried: **FE-D1 is BUILT (2026-08-20), code-complete, exercised in a browser ON FIXTURES ONLY, EXCLUDED from the GL-1 floor, and its migration `db/migrations/2026-08-20-fe-d1-form-engine.sql` (13,171 B) is STILL UNRUN** — `MIG-1` carried unverified and **not re-asserted as fact**; the live database holds 37 tables against 41 in `db/schema.sql`, which is the honest state. `docs/skills/drafting-disclosures/SKILL.md` **v2 remains the live drafting path.** Nothing in this fold-in is a build authorization.

**Ruling posture of this addendum:** every ID, answer, and recommendation below is PROPOSED until Michael rules. Where the table says "RULED" it cites the entry that ruled it. ND-1–ND-3 are Michael's own rulings, relayed by the capture, and are RECORDED here (§4) rather than proposed.

## §0 — Two things found at the gate, reported before anything else

**§0.1 The three never-do rules were not on this project's record.** A repo-wide search for ND-1/ND-2/ND-3's substance ("never designated", "stock paragraph") returns nothing in `docs/`. They were ruled in CIVIL LIT, which cannot see this project. They are recorded in §4 below as Michael's rulings of record as of 2026-08-20, with their origin stated. Nothing about them is inferred.

**§0.2 A sibling capture from the same drafting project is NOT in the repo.** `spec-feedback.md` (FE-D1 build, finding 3) records that Michael supplied `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` to the build session together with the master `.docx` and a structure map; the build read it, acted under stated assumptions on four of its six questions, and committed the `.docx` and its skeleton map under `src/forms/skeletons/` — **but the REQ-CAPTURE file itself is nowhere in the tree** (`find` on the checkout, case-insensitive, 2026-08-20). Its four narrative archetypes (`treating_provider`, `imaging_interpreter`, `provider_group`, `custodian_of_records`) are the ancestors of this capture's role grammar (Part 3), and its Q3 ("format-profile / instrument-definition boundary — must be ruled before the renderer is built") and Q5 (refuse-or-warn) bear directly on R2 and R16. **It is unreconciled through REQ-1 and unfiled.** Per H5 this session did not search Michael's machine for it. **Ask:** hand it in so the two captures are reconciled together; until then its six questions are carried as spec-feedback finding 3 only.

> **§0.2 CONFIRMED FROM ORIGIN, 2026-08-22 (`#136`), by a command that was not looking for it. CAVEAT CARRIED FROM THAT SESSION RATHER THAN SMOOTHED: the result reached it as Code's FORMATTED RELAY, not raw stdout** — no doubt about Code is implied; the trust step is named because naming it is the house discipline. *(The 2026-08-25 re-verification in this file's preamble is first-hand and does not inherit the caveat.)* `git ls-tree -r --name-only origin/master | grep -i disclosur` returned exactly three paths — `docs/skills/drafting-disclosures/SKILL.md` (the positive control, which fired), `src/forms/skeletons/disclosures-plaintiff-v1.docx`, and `src/forms/skeletons/disclosuresSkeleton.ts`. **Exactly the shape §0.2 recorded from a checkout `find` two days earlier.** So **TWO disclosures REQ-CAPTUREs are unfiled, not one** — this one (filed by the packet carrying this text) and the master-skeleton capture, whose location Michael last recorded as his Downloads folder, machine unconfirmed. **H5 holds: no machine search was made or proposed, and none should be without Michael directing it.** Carried as `RF-2`, his.
>
> **NOTE ON Q3/Q5 — TWO QUESTION SETS SHARE ONE NUMBERING, AND THE COLLISION IS LIVE IN THIS FILE.** §0.2's "Q3" and "Q5" are the **master-skeleton** capture's. Part 6's own Q3 (custodian track) and Q5 (gap-flag trigger) are **different questions.** Do not fold one into the other. Both sets are open.

## §1 — The defect path (Part 8 item 1), and the answer to Q9

**§1.1 What "the software generates today" is.** Per BUILD-STATE: FE-D1, the disclosures engine, is BUILT 2026-08-20, code-complete, exercised in a browser **on fixtures only**, its migration UNRUN, EXCLUDED from the GL-1 floor; `docs/skills/drafting-disclosures/SKILL.md` v2 remains the live drafting path. So the defect is live in a fixture-mode engine and in a spec, not in any served document produced by the app. (The approved instrument that exhibits the correct behavior was produced in CIVIL LIT by hand, not by the app.) *Re-verified at HEAD `edea20b`, 2026-08-25: unchanged in every limb.*

**§1.2 — REWRITTEN 2026-08-25.** *Ruled 2026-08-21 (walk capture, rulings 1 and 8) and 2026-08-22 (`#135`, 6.2–6.4). Its 2026-08-20 text answered Q9 by finding that no chronology import exists and concluding that individuals therefore enter by hand; that finding is TRUE AT HEAD and WRONG AS SCOPE, and the ruled design now runs the other way.*

**What is true at HEAD, and it has not changed.** `db/schema.sql` has no encounter, visit, treatment, or chronology table; no import or field-mapping layer; no fact table (IN-2's ruled home, `contact-directory.md` §7, is unbuilt). The only provider linkage in the database is **`medical_bills.provider_party_id → parties`** (also `code_mappings`, `provider_billing_profiles`). The Medical tab is a **bill ledger keyed to the billing entity.** A treating individual exists in the system today only if hand-entered into the contact directory as a `parties` row with `kind = 'individual'` and a provider role tag.

**What that means, and it is NOT what this section used to say.** *Ruled 2026-08-21:* **the Medical tab being bills-only IS the defect's source, and it sits one layer upstream of the disclosures generator.** Michael's own account of the wall: *"we don't have any medical providers and… or any bills listed in here"* and *"on the medical tab, I can't even see where I'd add medical providers for medical treatment."* On Claude's read-back that there is no individual clinician anywhere in the system to place in a designee slot — the defect at its source, upstream of the generator entirely — Michael: *"Yeah. I would say that that's a fair statement."*

**Consequence, and it is the load-bearing line of this section: FE-18's slot typing is NECESSARY AND INSUFFICIENT.** Typing the slot cannot fix a defect whose cause is that the correct value does not exist anywhere to be typed into.

**And the individuals do not arrive by hand.** *Ruled 2026-08-22 (`#135`, 6.4):* **the model extracts them from the medical chronology.** Michael: *"why this thing is so useful … what's gonna be automated is picking all the individuals out of the records."* The hand-entry path this section used to name as the answer is **not the design** — it is what the absence of a chronology pipeline leaves you with. See **§14** (the chronology) and **§15** (the selection unit) for the ruled shape.

**Q9's disposition:** the 2026-08-20 answer is **correct about what exists and superseded as scope.** Both halves are recorded because the build slice needs both: it is building the pipeline that does not exist, not describing the one that does.

**§1.3 Where the facility lands in the designee slot — three places, all in the spec, none requiring a source read.**
1. `form-engine.md` §2 step 2: *"Provider selection: checklist of linked medical providers (from the Medical/parties data)."* The Medical data's provider is the billing entity (§1.2).
2. `form-engine.md` §3: *"Contact block (facility, address, phone) comes from the party record and is uniform across variants"* and `form-engine.md` §9's header: *"Provider contact block above each paragraph comes from the party record."* **One party record supplies both the designee name (`{provider_name}`) and the facility contact block.** That is the capture's diagnosis stated as a design rule: one entity-keyed source, two renderings.
3. `form-engine.md` §9.1–9.9 carry no facility token at all; only 9.10 (`{pharmacy_name}`) and 9.11 (`{facility_name}`) do. There is no token a facility could correctly bind to in a treater paragraph, so a facility record selected at step 2 can only bind to `{provider_name}`.

Whether the built picker filters on `parties.kind` is **not knowable design-side** and is not asserted either way; what is asserted is that **nothing in the spec it was built from requires it**, and FE-D1 was built to the spec "under stated assumptions" with `form-engine.md` §9 seeded verbatim. The substrate for the fix already exists: `parties.kind ∈ {individual, organization}` (CD-1, live), the `Provider business` and medical-professional party types in the registry, and `contact_edges` with a controlled 19-type vocabulary (CD-1 §5, live). What is missing is (a) a rule binding the designee slot to `kind = 'individual'` or a person-role, (b) an edge type expressing *individual renders care at facility* (the built 19 have `employer-of`, `affiliate-of`, `contractor-for`; none carries that meaning, and adding one is a spec-level act per CD-1), and (c) the contact block reading from the edge target rather than from the designee's own record.

> **RULED 2026-08-21 (voice2), AND IT RELOCATES POINT (c) ENTIRELY: the provider block owns no data.** Point (c) is therefore not a disclosures feature — it is how every contact renders, everywhere in the system. **The ruling, Michael's words for it, and its two consequences are at §17.8 and are not restated here.**

**§1.4 Renderer change or pipeline change? — REWRITTEN 2026-08-25 (qualifier added).** **Both, sequenced.** Today the near half is a SPEC act plus an engine amendment: `form-engine.md` §2 step 2 becomes a designee step (pick the individual or choose the person-role fallback), §3/§9-header's contact-block sentence is amended so the block reads from the affiliation edge, §10 gains the edge and the slot typing, and the FE-D1 wizard, token registry, and lint are amended accordingly (Code, needs its own authorization — see §19). The chronology-to-token feed (Part 3) and the records-to-named-individual resolution step are PIPELINE work.

*This section used to close: "the defect — a facility in the designee slot — IS dischargeable now."* **It takes the §1.2 qualifier: dischargeable AS A SLOT TYPE, and not dischargeable AS A DEFECT, because until the individuals exist there is nothing to put in the typed slot.** The lint can stop a wrong value; it cannot supply a right one. Both statements are true and only the pair is.

**§1.5 One approved variant needed Michael's eye under ND-1 — QUESTION DISSOLVED 2026-08-22.** `form-engine.md` §9.10 (Pharmacy) reads *"**{pharmacy_name}**, by and through its pharmacist(s) and/or Custodian of Records, dispensed…"* — the grammatical subject is the entity. This section asked whether that is ND-1-compliant as written or needs a subject-first rewording, and put it as widget D.

> **RESOLVED BY DISSOLUTION, not by answer (`#135`, 4.3).** **The pharmacy is a distinct provider SHAPE, not a badly-worded provider entry.** Michael: *"all that we need to know from the pharmacy. We need someone to testify that the records that they produced are true and correct, and … testify as to the bills, and they have to testify that they're … reasonable and necessary."* It takes **no basis line and no causation line** — nobody there examined the client or an image. **Widget D was asking the wrong question.** See **§13**, shape 4.
>
> **`form-engine.md` §9.10's TEXT IS UNCHANGED and remains Michael-approved verbatim.** What changed is what governs the pharmacy paragraph's *content*, which is now the floor (§11) as it applies to shape 4. Whether §9.10's own wording still serves that shape is a text act on an approved paragraph and remains **Michael's alone.** Not changed here.

**§1.6 The fix as a design ruling — REWRITTEN 2026-08-25.** *FE-18 was **ADOPTED IN SUBSTANCE 2026-08-21** (widget A). Michael: "I guess we adopted." **Its WORDING IS NOT RATIFIED**, and he said why in the same breath:*

> *"but whenever you read those little widgets out, I just… I don't really understand exactly what you're getting at there. I just wanna make sure that what I'm saying is missing. I wanna make sure that you are feeding it in in your language however you need to put it to where it gets added."*

**FE-18's operative text below is therefore Claude's translation of a ruled intent, not text Michael warranted. ANY LATER ACT THAT TURNS ON FE-18'S EXACT WORDS RE-PUTS THEM IN PLAIN LANGUAGE FIRST.** That is not a formality: **ruling 4, later the same sitting, materially changed FE-18's terms** — FE-18 as first drafted said nothing gets renamed, and the rename is now ruled in (§2). The two are reconciled below rather than stacked.

> **FE-18 — The designee slot is typed.** A 195.5 designation's designee is a contact of `kind = 'individual'` or a person-role ("Custodian of Records for {facility}"); never an organization. The designee's 195.5(a)(1) address and telephone are read from **the facility** at the far end of a `renders-care-at` affiliation edge (name provisional; adding it is a spec-level act on `contact-directory.md` §5), case-scoped or world-fact per CD-1 §5. **The charges table stays FACILITY-keyed** — the billing side is unchanged in substance and renamed in fact (§2, ruled 2026-08-21): it keys a `facility`, and calling that key a `provider` is precisely the ambiguity the rename removes. One provider SET, two key types, three renderings (R3). `form-engine.md` §2 step 2, §3's contact-block sentence, §9's header sentence, and §10 are amended to say so; **`form-engine.md` §9's twelve paragraphs are not reworded.** FE-D1's picker, token registry, and lint are amended under a new authorization (§19). `docs/skills/drafting-disclosures/SKILL.md` takes a v3 line making the same rule explicit for hand drafting.
>
> **`parties.kind ∈ {individual, organization}` IS UNTOUCHED** — those are CD-1 schema kinds, not the word being renamed, and FE-18 keeps them.

**R16's containment spec is §6 below — and §6 was rewritten; read it before building anything from Part 1's CONTAINMENT paragraph.**

## §2 — The schema rename (Part 8 item 2) — **REWRITTEN 2026-08-25. THIS SECTION'S 2026-08-20 RECOMMENDATION WAS REJECTED.**

*Its 2026-08-20 text recommended NOT retiring `provider` — adopt the principle at the slot only, leave the three live columns alone, and if Michael wanted them renamed, wait for a later schema act. **Michael ruled against it.***

**RULED 2026-08-21 (walk capture ruling 4, widget C).** Claude's alternative, which Michael endorsed: *call the facility the facility and the person the provider, explicitly, everywhere.* Michael: **"I like it that way, the way you just said it."**

**`facility` means the facility. `provider` means the person. Named that way EVERYWHERE, not only in the disclosures block.**

**Why the recommendation fell, preserved because the reasoning is the load-bearing part.** The 2026-08-20 recommendation reasoned from blast radius on the assumption that `provider` is *correctly named* on the billing columns. Michael's Medical tab (§17) requires a person and a facility to coexist **on one record** — at which point a column named `provider` that means *facility* is not correctly named; it is actively ambiguous in the one place a human will read it. **The blast radius did not change. The thing it was weighed against did.**

**The cost, enumerated and ACCEPTED by Michael at ruling time.** Three live columns — `medical_bills.provider_party_id`, `code_mappings.provider_party_id`, `provider_billing_profiles.provider_party_id` — on tables migrated live 2026-07-28; the CD-1 role-tag vocabulary, derived from the `party_type` registry and retained by ruling `#62`; the approved `{provider_name}` / `{provider_dr_name}` / `{provider_his_her}` / `{provider_they}` / `{referring_provider}` tokens; FC-1's canonical token form; the 23 seeded `form_token_definitions` rows; and `docs/skills/drafting-disclosures/SKILL.md`. **This is build work, not a rename in passing.**

**A FOURTH SURFACE THE COST LIST DOES NOT NAME, found by re-sweep 2026-08-21 and still open.** `provider_billing_profiles` is a **TABLE NAME** containing the word; ruling 4's accepted cost enumerated three *columns*. Left unstated, a Code session reads the table name in or out at its own discretion. **Reported, not decided — Michael's, and it belongs in the rename slice's migration plan (`HD-16`).**

**SCOPE LIMIT, stated so a Code session cannot read the rename wider than it was ruled.** `provider` in `form-engine.md` §9's approved PROSE **already means the person** and is therefore already correct. **No approved paragraph is reworded.** The rename reaches tokens, columns, vocabulary and the SKILL — **not the sentences.** `form-engine.md` §9's own header bars the alternative, and this limit exists because without it the rename reads as a licence to touch text Michael approved.

**SEQUENCING — one slice, not two. CONFIRMED BY DELEGATION, and marked as such.** Asked whether the rename should be its own migration slice or fold into the provider-record work, Michael: *"Whichever you think is cleaner."* Claude ruled **one slice**: the provider record lands with `facility` and `provider` meaning the right things from birth, and the three legacy columns rename in that same migration. Reasoning: doing it separately means a rename migration whose only purpose is churn, followed by a second migration adding the real thing — two chances to get the data wrong for no benefit. **This is DELEGATED, not Michael's own reasoning. If a later pass finds the split safer, re-put it rather than treating it as settled by him.**

**AND THE MIGRATION-TIMING PREMISE THIS SECTION USED TO REST ON WAS CHECKED AND DID NOT HOLD.** Its 2026-08-20 close deferred the rename to "the next schema act (the FE-D1 migration is itself still unrun)." The walk capture then asserted that the rename *"changes names that migration establishes."* **Both were wrong.** `db/migrations/2026-08-20-fe-d1-form-engine.sql` creates four `form_*` tables, extends `generated_documents` with seven nullable columns, and sets RLS and per-table grants; **no object it creates or alters carries the word `provider`** (decisive command: `grep -in provider db/migrations/2026-08-20-fe-d1-form-engine.sql`). The three `provider_party_id` columns live on tables migrated live 2026-07-28 and are not in that file.

**Consequence — `HD-18` RULED 2026-08-21: the FE-D1 migration is neither amended nor held. Michael's pick, verbatim from the option list: "Run it now, unchanged (recommended)."** It runs **by Michael's hand**; no Code session is authorized to execute it, and its eight verification checks are still answered in words. *Status at HEAD `edea20b`, 2026-08-25: **STILL UNRUN.** `MIG-1` remains carried and unverified; this file does not assert it either way.*

## §3 — Durable IDs (Part 8 item 3) — PROPOSED disposition table, **REWRITTEN 2026-08-25**

**NOTHING IN THIS TABLE IS MINTED. Minting is Michael's act, and `RC-2` records that the one ID he approved in principle was never actually assigned — see the widget G row and §18.**

Series precedent: FE-1…FE-17 exist (FE-17 is the last minted), CD-1…CD-13, IN-1…IN-7, DL-INPUT plus un-ID'd `[DL-memo Q1–Q5]` and `Q-DE-1..6`. One home per question (CL2-AC-1). Duplicates are folded, not re-minted.

| Packet-local | Proposed durable | Disposition |
|---|---|---|
| R15 + R4 | **FE-18** (new) | The typed designee slot and the affiliation edge — §1.6's text. R4 is R15's data-model statement; one home. The edge TYPE itself is a spec-level act on `contact-directory.md` §5 and is filed as **CD-14** (below). **ADOPTED IN SUBSTANCE 2026-08-21; WORDING NOT RATIFIED.** Priority NOW. |
| — | **CD-14** (new) | Add an individual-renders-care-at-organization edge type (name provisional: `renders-care-at`) to the controlled `contact_edges` vocabulary, case-scoped or world-fact. Adding an edge type is a spec-level act (CD-1 §5; cf. CD-7/CD-8, which forbid Code "fixing" the vocabulary). **CD-14 NOW CARRIES TWO QUESTIONS, NOT ONE.** (i) does the SAME edge carry the verification state R6 needs, or does verification live on the IN-2 fact row that asserts the affiliation? (ii) **ADDED — does `renders-care-at` carry an EFFECTIVE PERIOD?** *Michael raised the underlying problem himself and then widened it past the disclosures module entirely — see §17.3. **The (ii) limb is arguably answered by that ruling and is NOT treated as answered here**, because what he ruled was where affiliation history lives, not what this edge type does. Flagged, not resolved.* |
| R16 | **FE-19** (new) | **REDEFINED 2026-08-21/22 — this row's 2026-08-20 disposition described a render-blocking lint over the designee VALUE at the ship gate. It is now a check on provider RECORDS that never blocks.** Spec at §6. Priority NOW. |
| R1 + R5 | **FE-20** (new) | **NARROWED 2026-08-22.** Its 2026-08-20 disposition made role-keyed sentence slots the composition engine, with `form-engine.md` §9's twelve as the seed of the slot library. **Widget B was ruled the other way: the twelve are VOICE EXAMPLES and the model composes over a floor (§11, §12).** What survives of FE-20 is real and smaller: **grammatical inflection driven by designee count** (R10, ND-8 — now load-bearing, §15.4), the role→shape selection (§13), and the app's structured fallback. **FE-20 is no longer the thing that writes the paragraphs.** *This row leans on `RC-1` and the lean is flagged: if the floor turns out to be FIXED TEXT the engine emits, FE-20 regains a text-producing role for exactly those three sentences. **Do not build either way until `RC-1` is ruled.*** |
| R2 + R12 | **FE-21** (new) | **NARROWED 2026-08-21.** The instrument as an assembly of bound response objects — one per 194.2(b) subsection and per 195.5 designation — each carrying data source and fill state. **The SUPPLEMENTATION-AS-DIFF half is superseded:** supplementation is purely ADDITIVE (§16.3), and the most recent saved disclosures document is the source of truth, so there is no diff of objects against a served snapshot and no served/not-served ledger. Cross-links: FE-6, FE-15 (posture, disclosures half BUILT in FE-D1), IN-4 (lifecycle), FE-8 (retention half BUILT; **diff half stays DEFERRED — see the R13 row**). Priority NOW (R2). |
| R3 | **extend FE-11, no new ID** | FE-11 is "compare a document to the ROSTER" (OUT of FE-D1, discovery slice; the `#63` disposition says in terms that FE-D1's lint does not absorb it). R3's ordering lint across the three provider renderings is the same class applied to the provider set. The canonical ORDER is Q4 — **partly ruled 2026-08-21, see §8.** |
| R6 | **extend IN-2, no new ID** | IN-2's ruled home (`contact-directory.md` §7) is the case-scoped fact row `{fact_id, value, source_document, source_field, extraction_method, verified_by_attorney}`; the provider→facility attribution is such a fact, and **`contact-directory.md` §12.7** already rules every machine-generated attribution UNVERIFIED until the attorney confirms it. *(That is CD-1's §12.7 — this file has no §12.7.)* **R6 MATTERS MORE UNDER THE 2026-08-22 RULINGS, NOT LESS:** the model now extracts individuals and their facility attributions from the chronology (§14, §15), and Michael's own standing caution is that his chronology vendor has already attributed a treating physician to a facility where he does not practice. Nothing built; IN-2's fact table does not exist. |
| R7 | **FE-22** (new) | Charge-weighted designation-gap detection: a custodian-only designation whose facility's charges rank high or exceed a share of past medicals raises a persistent GAP flag. **Its SURFACE moved 2026-08-21:** the disclosures panel is deliberately THIN — providers and a selection control, not a data display (§17.2) — so a charge-weighted display in the form builder is against that ruling unless it rides the ambient missing-information line (§6). Trigger is Q5, still open. Priority SOON. |
| R8 | **satisfied by construction — CONFIRM, no ID** | FE-D1 seeds the instrument and each `form-engine.md` §9 variant as SEPARATE `form_templates` rows, each with its own `form_template_versions` chain (23 templates). Preamble and per-provider paragraph are therefore separately versioned today. Carried to the verification list for the next Code session to confirm **by reading the seed**, not asserted from the spec alone. |
| R9 | **existing — §5 gate 3 + spec-feedback finding 7; no ID** | The retained/non-retained switch is specced and BUILT as data on the expert record (finding 7: "retained/non-retained is DATA, not gate STATE" — **that reading is unruled and Michael's**). The retained FIELD list is TRCP 195.5(a)(3)–(4) as restated in the playbook E2 row, UNVERIFIED, and the branch is unexercised by any capture. Q6 governs. **NOTE: the retained-expert track was ruled NEEDS BUILD (small) 2026-08-21 — see §7.** |
| R10 | **extend FE-20; no ID** | The grammar/pronoun engine is BUILT in FE-D1 (inflection from party counts). R10 adds DESIGNEE COUNT as a flex source. **ELEVATED 2026-08-22:** one paragraph per FACILITY covering its individuals collectively (§15.3) makes number agreement load-bearing rather than cosmetic — **the floor's own sentences must work plural**, which is exactly what `RC-3` is about. |
| R11 | **extend DL-INPUT / the deadline-engine spec; no ID — and GATED** | `form-engine.md` §2 item 7 specs the in-flow 195.2 deadline; the FE-D1 build computed NOTHING (spec-feedback finding 8) because CLAUDE.md registry rule 1 bars an UNVERIFIED proposition from driving a computed legal outcome, and **TRCP 195.2 has no registry entry** (only the playbook E1 row, which carries the 90/60-vs-60/90 conflict flag). A "proposal for confirmation" is still a computed date. **R11 IS GATED ON MICHAEL VERIFYING TRCP 195.2 — his act, and still the cheapest unblock in this capture. NOTHING IN THIS FILE COMPUTES, DISPLAYS OR PROPOSES A DESIGNATION DEADLINE.** Keyed to end-of-discovery-period: FE-5's prerequisite "no discovery-level field on `cases`" is the same missing substrate. **Whether the 195.2 verification is staged as its own registry item is `HD-10`, never raised with him.** |
| R13 | **RETIRED 2026-08-22 — no ID, no consumer** | *This row's 2026-08-20 disposition recommended UN-DEFERRING FE-8's diff half, on the ground that R13 was its first real consumer.* **Ruled the opposite way (`#135`, 5.3): R13 goes away.** Michael on the review gate: *"I don't know how the software is gonna know that I only read six of them because isn't the software just gonna produce the Word document and generate it, and then I'm gonna download it?"* — and on per-paragraph checkboxes: **"No. I don't want the busy work."** There is no reading detector, and the gate presumed a per-paragraph review-state control nobody had ruled he wanted. **FE-8's diff half STAYS DEFERRED. RECON-1 is not its consumer after all.** Widget F was **dissolved, not answered.** Part 3 decision rule 10 — *"Every generated paragraph is a draft until I read it"* — **is Michael's and stands as a drafting posture; what is retired is the machinery that tried to enforce it.** |
| R14 | **SATISFIED BY CONSTRUCTION by CD-1 — no ID** | A facility is a `parties` row (`kind = 'organization'`), firm-wide, editable in case context with a linked-case count, read live by the pointer model. "Populated outside the chronology and reused across matters" is the directory's definition. **BUT SEE §17.1: a requirement no R-number covers was ruled 2026-08-21 — the PROVIDER RECORD, carrying facility AND individual AND dates of treatment AND an expandable summary, sortable. R14 does not contain it, and IT HAS NO ID.** Michael approved minting one in principle on 2026-08-22 and none was assigned. **`RC-2` is the open QUESTION of what ID to mint, not the ID itself.** |

## §4 — The never-do rules (Part 8 item 4) — **REWRITTEN 2026-08-25 at ND-3 and ND-8**

**Recorded as Michael's rulings of record (origin CIVIL LIT; relayed 2026-08-20; first appearance on this project's record):** ND-1 individuals are designated, never facilities or businesses; ND-2 the facility appears only as the individual's affiliation, never as the subject of the designation; ND-3 no two providers share one stock paragraph. **ND-1 and ND-2 were expressly RECONCILED against the 2026-08-22 facility-selection ruling and they HOLD — see §15.2. They are not re-ruled and should not be.**

**ND-3 — REWRITTEN. Its lint is REMOVED and its unit is re-based.**
*Its 2026-08-20 treatment restated ND-3 under Q7 as a derivation rule enforced by a lint that fires when a paragraph is rendered without consuming available evidence.* **Ruled 2026-08-22 (`#135`, 5.2): the near-identical-paragraph lint is REMOVED.** Michael: **"Sure."** The reason is structural — if wording varies freely over a floor (§11) and the model draws register from a shared example corpus (§11.7), **two similar paragraphs are not a defect.** And, from 6.6: **ND-3 must be RE-READ, because "no two providers share one stock paragraph" was written when the unit was the PERSON, and the unit is now the FACILITY.** ND-3 survives as **Michael's rule against stock paragraphs**; what is gone is the machine test that was proposed to enforce it, and the unit it was written about. **The re-based operative form is not drafted here — that is a text act on one of his own never-do rules and is his.**

| Rule | Enforceable how | Recommendation (PROPOSED) |
|---|---|---|
| **ND-4** person-role fallback, never the entity | **CHECK on the record** — FE-19 signal 1 (directory `kind`), plus the person-role template (`form-engine.md` §9.11) as the only lawful fallback output | **Adopt.** §9.11 already complies. The person-role wording — *"The Custodian of Records for [facility]"* — is **Michael's own approved, served work, which is the strongest available basis and is NOT rule-derived. Labelled as what it is rather than treated as settled method.** |
| **ND-5** no opinion the provider's records do not support | **JUDGMENT, with content guards** — no examination sentence where none is recorded; no diagnosis clause where the records name none; the causation OBJECT selected by shape (§13). A check can prove a paragraph had no evidence; it cannot prove an opinion is unsupported. | **Adopt as a drafting rule with the named guards; every paragraph stays a draft (Part 3 rule 10).** **NOT REACHED in any ruling sitting — `RC-9`.** |
| **ND-6** retained fields never on a non-retained paragraph | **BY CONSTRUCTION** — retained fields render only under the retained flag | **Adopt**, and rule spec-feedback finding 7 with it. **NOT REACHED — `RC-9`.** |
| **ND-7** every charges-table provider appears in every rendering, same order | **CHECK** — FE-11 extension (R3); set-equality is mechanical, order needs Q4's canonical rule | **Adopt.** Blocking vs warning is Q4 — **and see §6: nothing in this module blocks.** **NOT REACHED — `RC-9`.** |
| **ND-8** number agreement across the block | **ENGINE INVARIANT — AND NOW LOAD-BEARING, NOT COSMETIC (2026-08-22, 6.6)** | **One paragraph per facility covering its individuals collectively means the floor's own sentences must work PLURAL.** This is no longer a tidiness rule; it is the mechanism by which the mandatory causation line survives contact with a twelve-name hospital. **`RC-3` is exactly this problem and it is OPEN.** |
| **ND-9** study date never rendered as incident date, and vice versa | **CHECK BY TYPE, not by value** — `{study_date}` binds only to an encounter/study source, `{incident_date}` only to `cases.date_of_incident`; a VALUE-equality check would false-positive on same-day emergency imaging, which is common | **Adopt the type binding as the rule; value equality is an INFO flag only.** **Note the neighbour: hard stop 2 (§12) compares the causation line's date against the matter record. That is a different check on a different value and the two must not be merged.** **NOT REACHED — `RC-9`.** |

## §5 — Ruling widgets — **REWRITTEN 2026-08-25: STATUS OF EACH**

*This section's 2026-08-20 text put eight widgets, A–H, as the acts belonging to Michael. Six have since been taken and two of those were **dissolved rather than answered**. The widget text itself is now historical and is replaced by its disposition, so that a later sitting does not re-put a ruled question.*

| Widget | 2026-08-20 subject | Disposition |
|---|---|---|
| **A** | FE-18's wording (§1.6) — adopt / reject / edit | **ADOPTED IN SUBSTANCE 2026-08-21. WORDING NOT RATIFIED** (§1.6). Carried as `RC-8` for the wording. |
| **B** | FE-20 vs `form-engine.md` §9's verbatim unit | **RULED 2026-08-22: the twelve become VOICE EXAMPLES** (§11.7). Neither offered option — the answer was outside the set. |
| **C** | The schema rename | **RULED IN 2026-08-21** (§2). The recommendation offered here was REJECTED. |
| **D** | `form-engine.md` §9.10 Pharmacy under ND-1 | **DISSOLVED 2026-08-22, not answered** (§1.5, §13 shape 4). The premise did not hold. |
| **E** | ND-4–ND-9 | **PARTLY DISCHARGED 2026-08-22** — it produced **three engine HARD STOPS** (§12) that none of ND-4–ND-9 describes. **ND-4, ND-5, ND-6, ND-7 and ND-9 were never walked** — `RC-9`. ND-8 was elevated by consequence (§4). |
| **F** | R13's hard gate | **DISSOLVED 2026-08-22, not answered** — R13 RETIRED (§3, R13 row). The premise did not hold. |
| **G** | *This file's 2026-08-20 text: "The IDs in §3 — item by item or as a group."* | **⚠ LABEL COLLISION, SURFACED AND NOT RESOLVED.** The 2026-08-22 sitting used "widget G" to mean **a different act entirely** — minting an ID for the provider record carrying facility + individual + dates of treatment + expandable summary, sortable (§17.1). Michael's **"No objection"** attaches to **that** sense. **Two different acts under one letter.** `RC-2` ASKS for an ID against the 2026-08-22 sense and has never been acted on; **check the letter before minting anything, and note that the 2026-08-20 sense — minting §3's IDs — is ALSO still untaken.** |
| **H** | Q1–Q10 | **PARTLY REACHED** — Q1, Q4 (in part), Q7 and Q9 moved by consequence; Q2, Q3, Q5, Q6, Q8 and Q10 not walked. `RC-10`. |

**Two of eight widgets were DISSOLVED rather than answered, and that is a finding worth carrying forward: when a widget resists, check whether its PREMISE holds before pressing for an answer.** Widget D presumed the pharmacy is a provider entry. Widget F presumed a per-paragraph review-state control Michael wants. Neither premise held.

## §6 — FE-19: the designee-type check — **REWRITTEN 2026-08-25. THIS SECTION IS THE ONE THAT MOVED FURTHEST.**

*Its 2026-08-20 text specced a **render-blocking lint over the designee VALUE**, running at the SHIP GATE, with four string-heuristic signals, a BLOCK branch offering two resolutions, and a dismissal-memory rule. **Where it runs was never ruled** — it was presented as reconciled and was in fact `HD-1`, asked twice across two sittings and unanswered. It has since been answered, and the answer moves the check to a different object, a different surface, and a different posture.*

**RULED 2026-08-21 (voice3). Michael, on Claude's recommendation: "Yeah. Let's go with that."**

**THE CHECK RUNS ON PROVIDER RECORDS, NOT ON DRAFTED TEXT. NOTHING LINTS THE PARAGRAPH.**

The three grounds, recorded because the reasoning is the durable part:
1. **A facility in a designee slot is a bad RECORD, not a bad paragraph.** Fix it at the record and it stays fixed across every paragraph and every document after it.
2. **A layer picking apart returned prose can misread Michael's own wording and generate nuisance warnings on perfectly fine text — worse than no warnings.**
3. **It is essentially already built.** The ambient panel of §6.1 is the same surface; the designee-type check becomes another line in it. No new machinery.

### §6.1 — The ambient missing-information panel (`HD-1`, RULED 2026-08-21)

**Michael set the scope himself, twice, before ruling** — *"To be clear, right now, we're just talking about problems that come up when we're drafting disclosures. Right?"* and *"Are you talking about everything that comes up on that forms tab?"* — and the answer is the **providers-to-designate section, not the whole forms tab and not the fact-witness or conditional sections.**

His ruling, verbatim:

> *"On the section for providers to designate — when the user is gonna open up this and go through making their selections in order to go to the end and click that generate Word document — at the bottom of that, or somewhere in that section for providers to designate, there should just be a little warning flag that comes up off on the side or the bottom, wherever is convenient, wherever it makes sense. That would say: missing information, we need to fix this before we generate the disclosures document. And it'll have, for each provider — you know, for Pro Care Medical Centers, we need an address. We need a phone number. This provider, we need a phone number. Or that provider, we need address. Or this provider we're missing the actual treating physician. And just give us that list, so the user sees that. They're like, oh shoot, before we go do this, I need to go back into the medical tab and make sure this information's input before we generate disclosures."*

**It is neither a mid-draft interrupt nor a production gate. It is ambient. Its purpose is REDIRECTION to the Medical tab, not correction in place** — which follows from §1.3's added ruling that the provider block owns no data.

**LIVE IN BOTH DIRECTIONS (`HD-1` addendum, Michael volunteered it):**

> *"Once he goes back into that medical tab and fixes that information, that problem that is listed in that providers-to-designate section, once it's fixed, it needs a live drop off of that list… So once I fix it and I go back to the forms tab, that's not a problem that's listed anymore. It's already gone."*

No refresh button, no re-run. **Implementation consequence stated by Claude and unobjected: the panel reads provider records at every render rather than caching what it found when the form opened.**

> **⚠ A TENSION INSIDE `HD-1`, SURFACED RATHER THAN SMOOTHED.** Michael's own words include ***"we need to fix this before we generate the disclosures document."*** The ruling as recorded is that the panel **never blocks.** Those two do not obviously agree, and the capture did not reconcile them. **Two readings are available and neither is adopted here:** the sentence is the panel's *text* (what it tells the user) rather than a description of enforcement; or he intends a genuine bar on generation. **This is put to Michael as its own question — carried at §18 with full question text and NO ID, because minting is his act and this fold-in mints nothing. Nothing is built either way.** *This matters more than it looks: `HD-22` and the three hard stops (§12) each answer a "does it stop me" question differently, so the module now has three distinct enforcement postures and it must be clear which governs here.*

### §6.2 — What the check does, restated for the new object

| Signal | On a PROVIDER RECORD | Verdict |
|---|---|---|
| 1. Resolution | the designee resolves to a `parties` row of `kind = 'organization'` | **FLAG in the panel** — the missing-treating-physician line. **Michael's own phrasing for it, verbatim from the `HD-1` ruling reproduced at §6.1, is *"Or this provider we're missing the actual treating physician."*** Never a block. |
| 1b. Person-role designee | the `form-engine.md` §9.11 person-role form, resolving to its facility for the AFFILIATION and carrying no designee row | pass, and raise the GAP flag (FE-22 decides its weight) |
| 2. Corporate form in the name | PLLC, LLC, Inc., P.C., P.A., L.L.P., Ltd. | **WARN, NEVER BLOCK — `HD-22`, RULED 2026-08-21** (§6.3) |
| 3. Facility nouns | Hospital, Clinic, Center, Institute, Imaging, Associates, Group, Practice, Specialists, Health | WARN — a backstop, never a rule |
| 4. Personal-name shape / credential suffix | — | **weak corroboration only.** Never sufficient to raise a flag; never sufficient to clear one. The approved document contains a named individual carrying no credential. |
| 5. Affiliation verification (R6) | the `renders-care-at` edge / IN-2 fact behind the contact block is `verified_by_attorney = false` | WARN, **named** ("affiliation unverified"), never silent |

**Missing address, missing phone and missing treating physician are lines in the same panel** — Michael named all three himself.

### §6.3 — `HD-22`: the practice-name check WARNS and never blocks (RULED 2026-08-21)

The defect this closes was found by reasoning, not by law: as originally specced, corporate form **BLOCKED even if signal 1 passed**, and a solo treating physician practising as "John Johnson, M.D., P.A." is an individual whose own name carries the suffix. Michael:

> *"It should warn me, but let me go ahead, because every now and then there's a provider who — their company name, the entity he operates under, is just him. And whenever you write a check out to him, the check just goes to John Johnson MD. So there's that. I wouldn't want this system to get hung up and completely reject or block my efforts to use John Johnson entity as the facility name."*

**The check flags, Michael reads, Michael proceeds. The reasoning is the durable part.**

### §6.4 — What this section's rewrite DELETED, named so nobody rebuilds it

The **BLOCK branch and its dismissal-memory rule are gone** — there is no block to dismiss. **The four string heuristics no longer run over drafted text at all.** The two lawful resolutions — supply the individual, or degrade to the person-role — **survive as panel CONTENT and as ND-4, not as gate offers.** The invariants the old spec promised not to break are preserved trivially: **a check that never writes into the document cannot violate "gates never write into the document."**

> **⚠ ONE THING THE 2026-08-21 RULING DID NOT REACH, and it is flagged rather than assumed.** The ruling and its reasoning are about **model-returned paragraph text**. Whether the same "nothing lints the drafted text" absolute covers **template-rendered, non-model output** — the `form-engine.md` §9 path FE-D1 uses today — was never put. **Not resolved here.**

## §7 — R1–R14 against BUILD-STATE (Part 8 item 5) — **REWRITTEN 2026-08-25: RE-SCOPED BY TRACK**

**The 2026-08-20 table scoped by REQUIREMENT only. Ruling 10 of 2026-08-21 re-scoped by TRACK, and it materially shrinks the slice — two of the four tracks need no work at all.**

| Track | Status | Michael's words |
|---|---|---|
| **Treating providers** | **NEEDS BUILD** — the chronology drop-in generates provider blocks and designation paragraphs. This is the whole of §11–§17. | — |
| **Retained experts** | **NEEDS BUILD (small)** — Michael creates the expert as a **party** by hand in the Parties tab; the form builder pulls contact info from that party record, then prompts him for the designation paragraph text | *"if this is a new retained expert, never retained this one before, never been involved in the case, I myself am gonna have to go to the parties tab, go create a new party, put all their information in there."* Asked whether anything more was needed: *"No. I believe that's it."* |
| **Fact witnesses** | **GOOD AS BUILT** | *"I think the way the fact witnesses works out — I think that's good."* |
| **Conditional sections** (settlement agreements to disclose; witness statements to disclose) | **GOOD AS BUILT** | *"I think that's good. Yeah."* |

| Req | Status at HEAD `edea20b` | Note |
|---|---|---|
| R1 | **RE-SCOPED, NOT CONFLICTING** | The built engine is template substitution over `form-engine.md` §9 verbatim. Generative composition is ruled (§11, §11.7) — **but the paragraphs are composed by a model call the app makes (§16), not by FE-20's slot grammar.** R1 survives, materially reduced. |
| R2 | **PARTLY RULED DIRECTION, NOT BUILT** | FE-21. |
| R3 | **NEW** (class queued as FE-11, OUT of FE-D1) | Extend FE-11. Order partly ruled — §8 Q4. |
| R4 | **SUBSTRATE BUILT, RULE ABSENT, AND THE SUBSTRATE IS NOT ENOUGH** | `parties.kind`, `contact_edges` live; no designee typing, no edge type — **and no individual clinician anywhere to type into the slot (§1.2).** FE-18 / CD-14 / `RC-2`. |
| R5 | **RULED POSTURE; grammar not built** | Role→shape selection is §13. |
| R6 | **RULED HOME (IN-2); NOT BUILT — and now MORE important** | No fact table. See the R6 row in §3. |
| R7 | **NEW** | FE-22; its surface moved (§3). |
| R8 | **BUILT BY CONSTRUCTION (to confirm by reading the seed)** | Separate template rows, versioned. |
| R9 | **BUILT (data switch); branch unexercised; finding 7 unruled** | Retained track NEEDS BUILD (small). Q6. |
| R10 | **BUILT (party-count inflection); designee-count source NEW and LOAD-BEARING** | ND-8; `RC-3`. |
| R11 | **SPECCED, DELIBERATELY NOT COMPUTED; GATED on 195.2 verification** | **Michael's act. Untouched throughout every sitting since 2026-08-20.** |
| R12 | **SUPERSEDED — supplementation is ADDITIVE** | §16.3. FE-8's diff half stays deferred. |
| R13 | **RETIRED 2026-08-22** | §3, R13 row. |
| R14 | **BUILT (CD-1, complete 2026-08-19) — but does not contain the provider record** | §17.1; `RC-2`. |

## §8 — Q1–Q10 — **REWRITTEN 2026-08-25 at Q1, Q4, Q5, Q7, Q9 and Q10**

**Q1 — REWRITTEN. SUPERSEDED, not reconciled.** *Its 2026-08-20 answer put model-drafted prose into a reviewable draft object inside the module and **confined that prose to named nullable slots** (`care_episode_descriptor`, `diagnosis_list` phrasing), diffable and testable as `form-engine.md` §9's seed is drift-tested.* **All three limbs are gone.** The model composes the **whole paragraph** over a verbatim content floor (§11), variation is free paragraph to paragraph, and the app makes the call itself on the firm's own BAA-covered account (§16). Confinement to named nullable slots is not the design. **What replaces the versioned-and-diffable property is `RC-1` and it is OPEN:** if the floor is FIXED TEXT the engine emits, the three sentences stay versioned template data and only the surrounding prose is model-composed; if it is a REQUIRED-CONTENT CHECK, nothing about the paragraph is template data and the invariant is an assertion over output. **The whole schema shape of a paragraph turns on that fork. It is not answered here and must not be assumed by a build slice.**

**Q2 → both, at the intake slice; the import layer does not exist.** Imported artifact (the chronology file, provenance recorded) AND a derived encounter set. Identities go to the directory; facts with provenance go to the IN-2 fact table (ruled home, unbuilt); the R6 gate rides the fact row. **RELOCATED 2026-08-22: the drop-in point is ONE drag-and-drop zone, and Michael put it "probably in the medical tab somewhere"** (§14.1) — his hedge, not a hard ruling on location. **A prose-PARSING layer is barred** by the same reasoning that barred an in-app text box. No build authorized by this answer.

**Q3 → separate track, rendered into the 195.5 block at Michael's option.** Custodian-only designations assert no medical opinion; model them as a records-predicate/affiant track keyed to the ORGANIZATION, which also feeds the § 18.001 affidavit tracker and TRE 902(10). Whether a matter renders them inside the 195.5 block (his approved practice) or separately is a rendering choice on FE-21's object, not a data-model fork. **§ 18.001 IS FLAGGED HERE, AT THE POINT OF USE, AND NOT ONLY IN §9:** no verified registry entry exists; its text was pulled 2026-07-26; it sits in the medical-billing DRAFT file and the FC-13 drafts. **And it acquired a second, independent flag on 2026-08-22 — see §13 shape 4 and `RC-4`.** Nothing here relies on the drafting project's treatise reading. **NOT WALKED in any ruling sitting.**

**Q4 — REWRITTEN IN PART. One rendering ruled; the rest still open.** **RULED 2026-08-21 (`HD-21(a)`): the providers list on the DISCLOSURES SCREEN, section two, is ordered OLDEST TREATMENT FIRST.** Michael: **"That sounds good."** He scoped it himself mid-exchange — *"we're talking about just the medical tab, right?"* — and **the Medical tab's own ordering was raised, overtaken by the mirror ruling (§17.2), and never separately answered: `HD-21-med`, OPEN.** Still open from the 2026-08-20 answer: the attorney-set per-matter override, and whether one order applies to all three renderings. **The 2026-08-20 answer made an ordering mismatch a ship-gate BLOCK; that verdict cannot stand beside §6's ruled posture and is withdrawn to open.** Charge-descending remains a useful SORT for the gap flag, not a canonical order.

**Q5 — REWRITTEN. The surface moved; the trigger is still open.** Trigger — absolute dollar, percentage, rank, or attorney-set — **NOT WALKED.** What changed is where it can appear: **the disclosures panel is deliberately THIN (`HD-21(c)`, §17.2) — "I just need the providers"** — so a charge-weighted display in the form builder is against that ruling. **The available home is the ambient missing-information line (§6.1), which is where the designee-type check went for the same reason.** Persistent state on the FE-21 object, not a transient notice, survives.

**Q6 → rule text for the FIELDS, a capture for the NARRATIVE.** 195.5(a)(3)–(4)'s retained list is restated in the playbook E2 row and can be specced now — UNVERIFIED, so it drives a checklist and no computed outcome. The retained paragraph's slot grammar should wait for a real retained-expert capture. **The retained TRACK's build shape was ruled 2026-08-21 and is small (§7); that ruling does not supply the paragraph's content, which is what Q6 asks about.** NOT WALKED.

**Q7 — REWRITTEN. The lint is gone.** *Its 2026-08-20 answer restated ND-3 as a derivation rule enforced by a lint firing when a paragraph was rendered without consuming available evidence, with proposed operative wording.* **Ruled 2026-08-22 (5.2): removed.** Michael: **"Sure."** See §4, ND-3. The proposed wording is withdrawn with it — **re-basing ND-3 is a text act on Michael's own never-do rule and is his.**

**Q8 → combined is the house standard by construction; separability preserved.** FE-D1's skeleton is Michael's own master — one instrument, expert block embedded. Recommend combined as the standard, with FE-21's objects keeping the halves renderable separately so a per-matter split is a later ruling, not a rebuild. **Please confirm, since you authored the master.** NOT WALKED.

**Q9 — REWRITTEN. See §1.2.** Correct about what exists at HEAD; superseded as scope. The chronology IS the input and the model extracts the individuals from it.

**Q10 — REWRITTEN.** *Its 2026-08-20 answer was BLOCK above the FE-22 threshold, AUTOMATIC below it.* **The BLOCK limb cannot stand beside §6 and is withdrawn.** The AUTOMATIC limb and the persisted GAP flag survive. **And the framing narrows: for the PHARMACY shape (§13, shape 4) custodian-only is the DESIGNED shape — "this is its whole content" — not a degradation and not a gap.** Part 3 rule 9's "custodian-only is a fallback, not a choice" governs genuinely unresolvable individuals and does not reach the pharmacy. **The threshold question itself is NOT WALKED.**

## §9 — Part 7 against the registry (what exists, what does not)

Read at HEAD across the four registry files and the playbooks. **Entries EXIST for:** TRCP 193.5 (carrier-duties file, VERIFIED), TRCP 194.5 (enforcement file, VERIFIED 2026-08-18), TRCP 194.2(b)(9) (VERIFIED), TRCP 194 initial disclosures (VERIFIED, span flag resolved). **NO registry entry exists for:** TRCP 195.5 (any limb), 195.2 (playbook E1 row only, **with the 90/60-vs-60/90 conflict flag — and that flag must ride the number at every point of use, not live only in this census**), 195.1, 193.6 (playbook E3 only), 192.3(c) / *Axelson*, *Baylor Medical Plaza v. Kidd* (playbook only), TRE 902(10), TRCP 190.3(b)(1)(A). § 18.001 / § 41.0105 / *Haygood* sit in the medical-billing DRAFT file (all DRAFT) and the FC-13 drafts (UNVERIFIED, not inserted).

> **ADDED 2026-08-25 — ONE NEW REGISTRY CANDIDATE, RECORDED AND NOT DRAFTED.** On 2026-08-22 Michael named **"CPRC eighteen dot zero zero one"** as the predicate for the pharmacy shape's reasonable-and-necessary testimony (§13, shape 4). **RECORDED, UNVERIFIED. Claude asserted no cite and confirmed none.** It is a registry CANDIDATE and **does not become a proposition here.** Carried as `RC-4`. **Note it is the same statute Part 7 already flags, reached by a different route — one home, not two.**
>
> **AND THE DEADLINE AUTHORITY LIST IS INCOMPLETE FOR WHAT R11 WOULD COMPUTE.** Part 7 cites TRCP 190.3(b)(1)(A) only — the Level 2 period — while the design contemplates a DCO override, and Level 1 and Level 3 periods end by a different instrument. **An incompleteness flag, not a legal opinion.** R11 is gated regardless.
>
> **AND ONE NEVER-DO CLASS RESTS ON AUTHORITY THAT APPEARS NOWHERE.** Part 3 decision rule 3 — *"No diagnosis language, and no 'medical knowledge', outside licensure scope"* — depends on Texas scope-of-practice law absent from Part 7's list. **Either it joins the list or the rule drops to drafting judgment. Flagged, not decided.**

**Nothing is drafted here** — drafting entries is its own act (the FC-13 precedent), and PF-1 would run on that packet. Every proposition in Part 7 stays UNVERIFIED; **no validation logic anywhere in this file computes from any of them.** FE-19 is a data-kind check, not a legal one; hard stop 2 (§12) compares a date against the matter record, not against a rule.

**ROUTE-C:** no divergence between a registry proposition and operative text was found by this fold-in, because **no primary source was retrieved and none was asked for.** No conforming wording is drafted and no cite change is proposed. **Retrieval is not verification and neither is this file. Only Michael verifies.**

## §10 — What goes to Code and what stays design-side — **REWRITTEN 2026-08-25**

**TO CODE (this packet — DOCS-ONLY, NO BUILD AUTHORIZATION):** this file at its canonical path, **created for the first time**; the session-log entry; the SK-v2 closure in `docs/specs/attorney-review-queue.md`; and the queue merge for the open items at §18, **carrying FULL QUESTION TEXT per QR-1** — **only the rows Michael rules in.**

**NOT IN THIS PACKET, and each for its own reason:** any edit to `form-engine.md` — amending §2 step 2, §3, the §9 header and §10 is the FE-18 spec act and ships as its own packet once FE-18's wording is ratified (§1.6); any edit to `contact-directory.md` (CD-14, now two-limbed); **any `src/` change whatever** — a FE-D1 amendment slice is its own authorization on the CD-1/FE-D1 pattern and the queue runner is BARRED from it; any registry entry (drafting entries is its own act — the FC-13 precedent — and PF-1 runs on that packet); any `SKILL.md` v3 line; **and the FE-D1 migration, which is Michael's hand and unrun (`HD-18`, `MIG-1`).**

**STAYS DESIGN-SIDE:** every open item at §18; the master-skeleton hand-in (§0.2, `RF-2`); **the TRCP 195.2 verification, which is R11's gate and Michael's act**; the retained-expert capture (Q6); `SKILL.md` v3.

**NOTHING IN THIS FILE AUTHORIZES A BUILD.** It records requirements and rulings. Every ID in §3 is PROPOSED and unminted.

---

# §11–§19 — THE RULINGS TAKEN AFTER THIS ADDENDUM WAS AUTHORED

*Written 2026-08-25 (Opus 5, Cowork, typed, bridge granted). These sections carry rulings of **2026-08-21** (FOUR sittings: a voice walkthrough, a typed fold-in, and two further voice sittings) and **2026-08-22** (RECON-1's first substantive ruling sitting, fourteen rulings put one at a time). **They are not a second account of §§1–10 — they are the content §§1–10 has no section for.** Where they bear on a rewritten section above, that section names them.*

**Michael's words are quoted verbatim throughout, because the wording is the ruling.** Where a sentence is Claude's restatement or inference rather than his, **it is marked as such in place.** Six such guards were flagged at capture time — five in the 2026-08-22 capture and one in the 2026-08-21 voice3 sitting — **and all six survive here**, at §11.3, §13.3, §14.2, §14.5, §15.5 and §17.4. **This fold-in added two more of its own, at §13.5 and §17.2, where a design conclusion was being stated flatly with no capture behind it — eight `MARKED` blocks in all.**

## §11 — THE FLOOR: what every designation paragraph must contain

### §11.1 — The governing rule: wording VARIES over a VERBATIM floor (RULED 2026-08-22)

> *"it's fine if they vary paragraph to paragraph so long as each one is accurate and reads well. **However, there are some lines in there that need to be in there.**"*

**This is a MANDATORY-CONTENT requirement, not a template.** Free variation on the prose; a verbatim floor beneath it. **It is a class of engine invariant that none of the existing ND rules describes**, which is why it needed its own section rather than a row in §4.

*Recorded because it is the sixth exhibit for CC-1(a): this was a **COMPOSITE**, not a selection. The two branches offered were "predictable every time" and "free variation." He took neither and produced the thing underneath both.*

### §11.2 — MANDATORY ELEMENT 1 — BASIS OF TESTIMONY

> *"I definitely need it to say that that physician is going to testify … based on the **personal treatment of the client**, their **review of medical records**, their **personal knowledge gained from … education, training and experience and research**."*

**Three limbs, four things inside the third:**

| Limb | Required content |
|---|---|
| 1 | personal treatment of the client |
| 2 | review of the medical records |
| 3 | personal knowledge gained from **education, training, experience, and research** |

**Where it appears:** in the **paragraph** (prose). **No position within the paragraph was ruled, and none is invented here.**

### §11.3 — MANDATORY ELEMENT 2 — CAUSATION. This is the load-bearing one.

> *"there needs to be a statement that says that that physician is gonna testify that **the injuries that they treated the client for were within a reasonable degree of medical probability caused by the incident which occurred on [insert date]**."*

**Michael's reasoning, preserved verbatim because it is the whole point of the module:**

> *"That's the line. That gives us medical causation. … the big thing is that we need a medical expert to be able to give us causation. When we say causation, we need the expert to be able to give expert medical testimony that the injuries that my client is claiming to have sustained in the wreck were caused within a reasonable degree of medical probability … by that wreck or that fall or whatever the personal injury incident was."*

**Where it appears:** in the **paragraph**. No position ruled.

> **MARKED AS CLAUDE'S RESTATEMENT, NOT MICHAEL'S WORDS:** *"Without this sentence you have a treating physician who can describe treatment and nothing that connects it to the defendant."* That framing drew no objection at capture time. **It is not his and must not be quoted as his.**

**⚠ THE RULED WORDING IS SINGULAR — "that physician … the injuries that THEY treated" — AND §15.3 MAKES THE PARAGRAPH COLLECTIVE.** One paragraph per facility, covering its individuals together, means this sentence must work for a twelve-name hospital. **How it inflects for a group was raised by the ruling that created the problem and was NEVER PUT TO MICHAEL. That is `RC-3` and it is OPEN. Nothing in this file inflects it.**

### §11.4 — MANDATORY ELEMENT 3 — CUSTODIAN. Two pieces, both DEFAULT ON.

> *"**Let's just make it default.**"*

| Piece | Where | Content |
|---|---|---|
| **Block line** | in the provider **BLOCK**, positioned **between the treating-provider names and the facility name** | *"and/or custodian of records"* |
| **Paragraph sentence** | in the **paragraph** | what the custodian can testify to as to those records — kept, true and correct, in the regular course of business |

**Defaulting both ON is what makes them a THIRD MANDATORY ELEMENT rather than a conditional one.** That consequence was stated plainly in session and Michael did not dissent — **recorded as an undissented consequence, not as a separate ruling.**

**Provenance, in his words, recorded because the practice is inherited rather than reasoned from a rule he can currently state:**

> *"I've seen some people add custodian of records in that provider block. Actually, the first firm that I worked at, we would always put it in there. I don't know why. Maybe it's for a reason."*

**The actual predicate LANGUAGE of the paragraph sentence is not drafted here** — it is `RC-4`, and it is tied to an UNVERIFIED cite (§9, §13 shape 4).

*Note against the 2026-08-20 text: Part 3's CONTACT BLOCK already carried a custodian line — "And/or Custodian(s) of Records", number tracking the count of named individuals — as a **token**. The 2026-08-22 ruling makes it **unconditional** and fixes its **position**. The wording differs between the two records (Part 3's capitalised form vs Michael's spoken "and/or custodian of records"); **the difference is noted, not resolved — it is a text act and it is his.***

### §11.5 — What is CHECKED, and what deliberately is not (RULED 2026-08-22)

**The DATE inside the causation line is the only checked piece. Nothing on the basis line is checked at all.**

Michael approved Claude's recommendation — *"Okay."* — on a stated reason worth preserving: the basis line is boilerplate, and if the model drops it he will see it; a phrase-match on it **"just teaches him to ignore warnings."**

**The check is a COMPARISON, not a phrase-match:** the incident date already exists on the matter record, so the app compares the rendered date against it. That is the only piece in either line the model can get factually wrong in a way Michael might skim past. **It was subsequently escalated from a warning to a HARD STOP — see §12.**

### §11.6 — ⛔ `RC-1` — THE FORM OF THE FLOOR IS UNRULED, AND IT IS THE RESUME POINT

**The question:** *is the floor **FIXED TEXT the engine emits**, regardless of provider — or a **REQUIRED-CONTENT CHECK** over model-composed prose?*

**It was asked, cut off mid-sentence by a turn boundary, and never answered.** The hard stops of §12 **constrain it but do not settle it: an invariant can be satisfied either by emitting the line or by detecting it.**

**Why it is not a detail.** It decides **what a paragraph IS in the schema** — invariant-as-DATA versus invariant-as-ASSERTION. It sits upstream of the three hard stops, upstream of `HD-20-b`, and upstream of what the chronology extraction has to hand back. §8's Q1 and §3's FE-20 row both lean on it and **both say so in place rather than resolving it.**

**NO SECTION OF THIS FILE ADOPTS EITHER BRANCH. A build slice that reads this file must stop here and ask.**

> **⚠ BUT ONE LEAN EXISTS AND IT IS NAMED HERE RATHER THAN LEFT SILENT — FOUND BY THIS FOLD-IN'S OWN RE-SWEEP, NOT BY A RULING.** §6 says **"nothing lints the drafted text"** and §16.4 says **"nothing takes returned paragraphs apart; nothing looks inside them."** Both are **RULED** on 2026-08-21 — **but those two sentences are THIS FILE'S GLOSSES, not Michael's words, and saying so is not pedantry here.** What he actually said is quoted in place: at §6, *"Yeah. Let's go with that,"* approving a recommendation whose three grounds are Claude's; at §16.4, *"I just wanna see that paragraph end up in the word document."* **The glosses are faithful to what was ruled. They are not quotations — and the whole lean turns on how WIDE those rulings reach, which is exactly the question a gloss cannot settle.** **But the CHECK branch of `RC-1` is inspection of drafted text** — detecting whether the causation line is present means reading the paragraph. **Taken at their widest, those two rulings would foreclose the check branch and leave only fixed text.**
>
> **This file does NOT draw that conclusion, for a reason that is on the record: the 2026-08-21 rulings and their stated reasoning are about MODEL-RETURNED PROSE and the nuisance-warning risk of parsing Michael's own wording** (§6, ground 2), **not about whether the engine may satisfy its own invariant.** Hard stop 1 — *never emit a paragraph missing the causation line* — was ruled the day AFTER, and an engine that cannot look at what it is about to emit cannot honour it by any means except emitting the line itself. **So either the rulings are narrower than their widest reading, or `RC-1` is already answered by implication.**
>
> **THAT IS EXACTLY THE QUESTION AND IT IS MICHAEL'S. It is put at §18.B, unminted, alongside B1 and B9, which are the same seam seen from two other angles.**

### §11.7 — WHAT COMPOSES THE PROSE OVER THE FLOOR: the twelve variants become VOICE EXAMPLES (widget B, RULED 2026-08-22)

> *"the twelve are worth keeping around as **examples of my voice** … **let the model use those and come up with one**."*

**`form-engine.md` §9's twelve approved variants are NO LONGER THE UNIT OF SEEDING and NO LONGER PRODUCE OUTPUT.** They become a **voice corpus**: samples shown to the model so it writes in Michael's register. **The model composes, and what it composes must hit the floor (§11.1–§11.4).**

**His evidence, and the capture calls it the strongest on the record because it is an experiment he already ran by hand:**

> *"I gave Claude a copy of my disclosures and said, hey, use this language and then develop paragraphs. And it took it upon itself to add in some other language, and it ended up turning out pretty good. **So my confidence in Claude in drafting these paragraphs is pretty high.**"*

**NEITHER OFFERED OPTION WAS TAKEN.** Widget B put (i) decompose the twelve into a slot library without rewording, or (ii) keep them whole and add a slot grammar alongside. **The answer was outside both** — the twelve stop producing output altogether and become reference material. CC-1(a), again.

**WHAT THIS DOES NOT DO — and the boundary matters, because it is the single largest change to the module's shape:** **`form-engine.md` §9's twelve paragraphs are NOT reworded, NOT retired, and NOT edited.** Their TEXT is Michael-approved verbatim and stays exactly as it is; **only their JOB changed.** They are kept deliberately — *"worth keeping around"* — and FE-D1 generates `variants.ts` from the spec with a drift test, which is untouched by this ruling.

**Two consequences already recorded elsewhere and named here so the chain is visible:** ND-3's near-identical-paragraph lint is **REMOVED** (§4, §8 Q7) — if register comes from a shared corpus, similarity is not evidence of a stock paragraph. And **FE-20 is no longer the thing that writes the paragraphs** (§3).

*This section is downstream of `RC-1`: whether the floor's three sentences are emitted by the engine or checked over what the model composed decides how much of a paragraph the model actually authors. Ruling `RC-1` does not disturb widget B; it decides what widget B leaves to the model.*

## §12 — THE THREE ENGINE HARD STOPS — and the three enforcement postures that now coexist

### §12.1 — The three invariants (RULED 2026-08-22)

> *"those are hard stops. **You can't violate those ones. Gotta be in it every single time.**"*

| # | Invariant |
|---|---|
| **1** | **Never emit a paragraph missing the CAUSATION LINE** |
| **2** | **Never emit a DATE that disagrees with the matter record** |
| **3** | **Never emit a PROVIDER PARAGRAPH WITH NO FACILITY** |

**These are ENGINE INVARIANTS — properties of what the engine may produce — and they are stronger than the warning treatment given `HD-22`'s suffix checker (§6.3).**

### §12.2 — Invariant 2 SUPERSEDED AN EARLIER RULING IN THE SAME SITTING, and the supersession is recorded rather than smoothed

The date check was **first ruled a WARNING naming the provider**, on the `HD-22` precedent. It was **later superseded, the same session, by the hard-stop ruling above.** **The final state is a hard stop.** *(No Michael verbatim exists for the warning form; the capture states it in its own words. The hard-stop form carries his verbatim above.)*

> **AND ONE THING CLAUDE ASSERTED IN THAT EXCHANGE WAS NEVER RULED AND WAS RETRACTED IN SESSION.** Claude offered *"warning on the wording and hard stop on the date"* as though a wording/date split had already been decided. **Michael: *"What was the exact wording that I've said to give a warning on?"*** No such distinction was ever made; the only check on the table was ever the date. **Retracted in session. Actor: Opus 5. Failure class: manufacturing a prior ruling to make a new question tidier — a member of the verify-before-asserting family. Recorded because the record matters more than looking right.**

### §12.3 — ⚠ THREE DIFFERENT ENFORCEMENT POSTURES NOW COEXIST, AND WHICH GOVERNS A GIVEN FAILURE WAS NEVER PUT AS ONE QUESTION

| Posture | Object | Behaviour | Ruled |
|---|---|---|---|
| **Ambient panel** (§6.1) | provider RECORDS — missing address, phone, treating physician | flags, lists per provider, live in both directions, **never blocks** | 2026-08-21 |
| **`HD-22`** (§6.3) | the designee NAME's corporate suffix | **warns, never blocks** — "let me go ahead" | 2026-08-21 |
| **Hard stops** (§12.1) | what the ENGINE EMITS | **"you can't violate those ones"** | 2026-08-22 |

**They are reconcilable on one reading and not on another, and this fold-in adopts neither.** The reading that works: the hard stops bind the ENGINE's output, while the panel and `HD-22` bind what the USER is stopped from doing — the engine simply never produces a paragraph in those three states, and no user-facing gate is involved. **The reading that does not work is hard stop 3 against the panel.** Hard stop 3 is *"never emit a provider paragraph with no facility"* — the capture's own wording, carrying Michael's *"you can't violate those ones."* **And here the file must be careful about what it does and does not know.** The panel's ruled contents are the three things Michael named himself — **a missing address, a missing phone, a missing treating physician** (§6.1) — and on all three it flags and lets him generate. **Whether a MISSING FACILITY would be a fourth line in that panel was never put to him.** So the collision is not two rulings answering one question two ways; it is this: **hard stop 3 says the engine may not emit that paragraph, and nothing ruled says what the user sees when it fires, or whether he can proceed.** *(Stated in this file's words, not quoted — there is no sentence of Michael's covering it, and one is not manufactured to make the seam look tidier.)*

**Add Michael's own sentence inside the `HD-1` ruling — *"we need to fix this before we generate the disclosures document"* — and there is a third possibility, that he does intend a bar on generation in some cases.**

**THE QUESTION, PUT AND UNANSWERED, CARRIED AT §18 WITH NO ID:** *when the engine cannot satisfy a hard stop because the underlying record is incomplete — no facility, or a date the matter record contradicts — what does the user see, and can he generate anyway? The three rulings above answer it three different ways and none of them was put alongside the others.*

**Nothing is built either way. This is not a defect in any ruling; it is a seam between three rulings taken in two sittings, and it surfaced only when they were folded into one document — which is what a fold-in is for.**

## §13 — THE FOUR PROVIDER SHAPES (RULED 2026-08-22)

**Where the 2026-08-20 addendum had one shape plus exceptions, there are FOUR.**

| Shape | Basis limb | Causation line | Custodian | Note |
|---|---|---|---|---|
| **1. Treating provider** | as written (§11.2) | yes | yes | the default |
| **2. Radiologist / imaging interpreter** | swaps *personal treatment* → **personal interpretation of the imaging studies**; review of records **where held**; education/training/experience/research retained | **yes, AS WRITTEN — ⚠ EXPRESSLY PROVISIONAL** | yes | §13.2 |
| **3. Prehospital (EMS / ambulance)** | as written | yes | yes | a treating shape |
| **4. Pharmacy** | **NONE** | **NONE** | yes — **this is its whole content** | §13.4 |

### §13.1 — Shape 1, treating provider
All three floor limbs unmodified. Nothing swapped, nothing omitted.

### §13.2 — Shape 2, radiologist — CONFIRMED BUT PROVISIONAL BY MICHAEL'S EXPRESS TERMS

> *"for right now, **until further notice**, let's go ahead and just keep putting the … 'within a reasonable degree of medical probability caused by the incident' line in there. **Until I figure out a better way to do it.**"*

**His reason:**

> *"truth be told, I have never had a case ever where we were planning on calling the radiologist because … if it's that serious and we're dealing with radiology, we're gonna be talking to the surgeon themselves, and the surgeon is really the one that's gonna go and look at the imaging himself or herself."*

**The radiologist is designated for completeness; the surgeon carries causation.** A narrower alternative — *"findings consistent with the mechanism of injury"* — was offered and **DECLINED FOR NOW. Preserved as a rejected proposal that may return.** **Do not harden this shape. `RC-6`.**

> **⚠⚠ THIS RULING RUNS HEAD-ON INTO MICHAEL'S OWN PART 3 DECISION RULE 5, AND THE CONFLICT IS SURFACED, NOT RESOLVED.**
>
> **Part 3 rule 5 (his words, 2026-08-20):** *"The causation object tracks the provider's actual work product — injuries treated vs. findings identified. **This is the most legally consequential generation error available**, because getting it wrong claims an opinion the provider cannot give."* Part 3's role table implements it: for an imaging interpreter, **S8 object = "THE FINDINGS [they] IDENTIFIED."**
>
> **The 2026-08-22 ruling (his words):** the radiologist keeps the causation line **as written** — *the injuries treated … caused by the incident* — and the findings/mechanism alternative was expressly declined.
>
> **Both are Michael's. They point opposite ways on the exact object Part 3 calls the most legally consequential thing in the module.** He may not have had rule 5 in front of him on 2026-08-22. **This fold-in does not choose between them, and it does not let the later ruling silently overwrite the earlier one just because it is later.** It is carried at §18 as a question in his own two sets of words. **His `RC-6` "until I figure out a better way" may already be him noticing the same thing.**

### §13.3 — Shape 3, prehospital EMS — a treating shape

> the EMTs/paramedics *"personally examine the client on the scene and gave emergency medical treatment, did diagnostics, and sometimes transported them."*

> **MARKED AS CLAUDE'S ADDITION, UNOBJECTED, NOT MICHAEL'S WORDS:** that their distinctive value is *observation of the mechanism and the immediate presentation, which nobody downstream saw.*

### §13.4 — Shape 4, pharmacy — records-and-billing, not a provider

> *"all that we need to know from the pharmacy. We need someone to testify that the records that they produced are **true and correct**, and … testify **as to the bills**, and they have to testify that they're … **reasonable and necessary**."*

**No basis line. No causation line. The pharmacy is the only shape with no human who examined anything — client or image.**

**Michael named the predicate for the reasonable-and-necessary limb as "CPRC eighteen dot zero zero one." RECORDED, UNVERIFIED, a registry CANDIDATE and not a proposition. Claude asserted no cite and confirmed none. Only Michael verifies. `RC-4`.** *(Same statute Part 7 already flags — one home, not two. §9.)*

**This is what DISSOLVED widget D (§1.5, §5).** It also **narrows Part 3 rule 9** — *"custodian-only is a fallback, not a choice"* — which governs genuinely unresolvable individuals and **does not reach the pharmacy, where custodian-only is the designed shape and not a gap.**

**OPEN: does this shape take a basis line at all? §13.4 implies no, but it was never squarely put. `RC-5`.**

### §13.5 — NOT a fifth shape: the imaging facility

> *"the radiologist interpreted the imaging and developed his report. And so he's gonna testify about everything related to that."*

**The imaging facility is the RADIOLOGIST'S AFFILIATION, and the designation runs to the radiologist. It is not a records-and-billing entry and does not take shape 4.**

> **MARKED: the words above are the capture's framing of what Michael's sentence implies, not his words.** What he said is the quotation — that the radiologist interpreted the imaging, produced the report, and will testify about everything related to it. **The inference that the FACILITY therefore takes no shape of its own drew no objection and is not separately ruled.**

## §14 — THE CHRONOLOGY (RULED 2026-08-21 and 2026-08-22)

### §14.0 — WHERE THIS CAME FROM: Michael's own workflow, described unprompted on 2026-08-21

**The whole chronology design originates in something he already does by hand, and his account of it is the origin exhibit for §§14–15:**

> *"If I have a case that's big enough, if there's enough medical treatment going on, I am currently using a separate software that makes a medical chronology. I take all my medical records, and I put them into that medical chronology generator, and it pulls everything from all those records, and it makes a medical chronology. **What I've been doing to build these disclosures recently in Claude is to take that medical chronology, drop it into a chat, and then I also drop in my disclosures form**, and I let it know what the style of case is and everything. And then Claude just goes ahead and has been putting these disclosures together — **is able to build the little provider blocks and is able to build designation paragraphs.**"*

**His assessment of the two outputs side by side — this is why the module is being rebuilt rather than tuned:**

> *"**The designation paragraphs have actually been really good.** When we went through last night, the designation paragraphs that this engine that's currently built was putting together — **they were not good. They were too stale**, and they were nothing compared to what was being created actually in that project in Claude."*

**On the read-back that the engine's real input is not the bills table but the chronology — Michael: *"Yes. That's the honest picture."***

**The drop-in, as he designed it in the same sitting:**

> *"When we are building this certain set of disclosures, we're gonna have the option of **dropping in the full medical chronology** into it. **It'll be like a little drop-in window.** Drop that in there, and it can generate all of the designation paragraphs off of that… basically have a little Claude back engine in there to develop those paragraphs."*

*The phrase "a little Claude back engine" is his, and it is the seed of what became `HD-12` — first ruled one way and then reversed (§16.1). Recorded here because the design's origin and its eventual shape are not the same thing, and the difference is a ruling, not a drift.*

### §14.1 — ONE drop zone. An in-app text box was proposed and REJECTED.

> *"I'm just gonna take that file, whatever that file is, and I'm gonna drop it into the software … **probably in the medical tab somewhere** where I could drag and drop in that file."*

**The ruling:** *"**Let's go with that one one drop-in spot.**"*

**Formats he named:** PDF, Excel, JSON, CSV — and Word for a hand-built chronology. **Source-agnostic by design.**

> **THE HEDGE IS HIS AND IS PRESERVED: "probably in the medical tab somewhere." The LOCATION is not hard-ruled.** The SINGULARITY is.

**The four reasons the text box lost, recorded because they encode rules rather than a preference:**
1. Two places a chronology can live is two things to maintain.
2. **A text box invites the software to start parsing his prose — which he had already ruled against at `HD-20-a` (§16.4).**
3. The assistant already knows Word and Excel; nothing new to learn.
4. Every chronology becomes the same kind of object regardless of source — one attachment on the matter, replaceable when records come in. **The vendor's token model already works this way.**

**OPEN — `RC-7`, NEVER ASKED:** which formats are accepted, and what happens when a new chronology is dropped over an old one — replace, version, or keep both?

### §14.2 — Two production tracks, split by CASE ECONOMICS

| Track | When | Mechanics |
|---|---|---|
| **Third-party vendor service** | big cases, heavy treatment, preexisting conditions to untangle | **token-based: ONE TOKEN PER MATTER, not per generation.** Regeneration as new records arrive is free within that matter. |
| **Hand-built** (Michael or an assistant) | routine cases where *"the economics of the case"* do not support paying | the standard pattern — *"chiro, then physical therapy, then they go get imaging … and they go to pain management maybe two times … maybe they get some future recommendation"* — and *"we're not dealing with preexisting conditions that we have to track"* |

> **MARKED AS CLAUDE'S INFERENCE, UNOBJECTED, NOT MICHAEL'S WORDS:** that the chronology is *a living artifact for the life of the case, not a one-shot deliverable*, and that *the hand track is the majority, so the design must serve it first.*

### §14.3 — THE CHRONOLOGY IS A MODEL INPUT. Claude asserted the opposite twice and Michael corrected it with evidence.

> *"**part of the designation needs to read from the chronology.**"*

**His evidence — a workflow he has already run by hand:** given a sample set of disclosures plus the med chron, the model

> *"went through the medcron, and it was able to tailor that designation paragraph to include some short statements about what that provider did for that client. **And without the medcron, it's not gonna be able to do that.**"*

> **CLAUDE ERROR, RECORDED.** Claude asserted twice in that sitting that the chronology is inert — that it *"sits there as a file"* and that *"nothing reads from the chronology."* **ACTOR: Opus 5. FAILURE CLASS: asserting a design consequence from a partial ruling rather than asking** — and the correct move was available, because Michael had put *"the designation paragraphs are gonna read from that chronology, right?"* as a CHECK, and Claude answered it confidently in the wrong direction instead of treating the question as evidence. **WHAT CHANGED: the ruling above; nothing wrong reached the record.**

### §14.4 — NO AUTO-POPULATION OF PROVIDERS FROM THE CHRONOLOGY. EVER.

**Michael's own example is the reason, and it is why this is a permanent bar rather than a deferral:** the chronology contains providers who are in the RECORDS but not in the CASE —

> *"prior providers or … medical providers who are giving treatment at the same time, maybe for a different condition. **Like a client would have an OBGYN while the OBGYN doesn't have anything to do with this case.**"*

**A feature that populated providers from the chronology would have designated the client's OBGYN.**

### §14.5 — The division of labour, and it is the cleanest statement of the module's shape

| Source | Decides |
|---|---|
| **Medical tab** — Michael's selection | **WHO gets designated.** Legal judgment. |
| **Chronology** — the model's source material | **WHAT IS SAID about them** — treatment, orders, referrals, findings. |

> **MARKED AS CLAUDE'S ADDITION, UNOBJECTED:** that *the chronology is scoped by Michael's selection, not searched wholesale.*

## §15 — THE SELECTION UNIT AND PARAGRAPH GRANULARITY (RULED 2026-08-22)

### §15.1 — Michael selects FACILITIES. The model extracts the INDIVIDUALS.

> *"I should just **select the facilities** that I want designated, and then it goes from the med chron and **pulls all the information** from there."*

**And the point of the whole module, in his words:**

> *"why this thing is so useful … **what's gonna be automated is picking all the individuals out of the records.**"*

**From the hand-run that proves it:** the model *"went through the records and found what individuals, what people from different facilities were the doctor, a nurse, radiologist, whatever, what they did and when. … it developed the provider block from the information from that medcron."* Then: **"so that's what this system needs to do as well."**

### §15.2 — RECONCILED AGAINST ND-1 / ND-2 EXPRESSLY, BECAUSE IT LOOKS LIKE A COLLISION AND IS NOT

Put to him directly — *is the facility just HOW you pick, with individuals still being WHO gets designated?* — **Michael: *"Yeah. No. That's that's the case."***

| Layer | Unit |
|---|---|
| **Selection** (Michael's act) | **FACILITY** |
| **Extraction** (the model's act, from the chronology) | every named individual at that facility |
| **Designation** (ND-1) | **the INDIVIDUALS** |
| **Paragraph** | **one per FACILITY** (§15.3) |

**ND-1 and ND-2 HOLD UNCHANGED.** The facility is a selection layer, not a designee. **Nothing here re-rules them and nothing should.**

### §15.3 — ONE PARAGRAPH PER FACILITY, covering its individuals collectively

Asked whether a hospital with twelve names gets twelve paragraphs or one — **Michael: *"Hospital … with twelve names, one paragraph covering the [whole]."*** For a facility with one person, same shape, singular — **"Yep."**

### §15.4 — Three consequences, all of them live

1. **ND-8 (number agreement) becomes LOAD-BEARING, not cosmetic.** Inflection is driven by designee count and **the floor's own sentences must work plural.** (§4, §3's R10 row.)
2. **⛔ The CAUSATION LINE must be expressible for a GROUP, and its ruled wording is SINGULAR. UNRESOLVED — `RC-3`, raised by this ruling and never put to Michael.** (§11.3.)
3. **ND-3 must be RE-READ.** *"No two providers share one stock paragraph"* was written when the unit was the PERSON. **The unit is now the FACILITY.** (§4.)

### §15.5 — NO review step on the extracted list. Over-inclusion is DELIBERATE.

> *"**No. Just put everyone on the block.**"*

And, from the hand-run:

> *"a hospital is designated … there were a bunch of individuals listed in there. And so the provider block was very long because it listed a whole lot of people. **That's fine. Not a big deal. I can go through and delete anyone that I wanna delete from there. And frankly I don't care how long the provider block is. If we list everyone in there, doesn't hurt me at all. Could only potentially help me.**"*

> **⚠ PRECISION FLAG: his length statement is about the PROVIDER BLOCK, not the paragraph. No statement about paragraph length exists on the record.**
>
> **MARKED AS CLAUDE'S INFERENCE — DO NOT ATTRIBUTE IT TO HIM:** *"anyone you didn't list is someone you can't call."* **Michael's stated reason is only that it costs nothing and might help.**

*Consistent with §11.4: default it on, don't make him decide per case.*

## §16 — THE MODEL CALL AND THE RETURN PATH

### §16.1 — `HD-12` REVERSED: THE APP CALLS THE MODEL DIRECTLY (RULED 2026-08-21, voice2)

> *"I would like to be able to **upload all of that stuff and do it inside of the software**."*

**And the load-bearing part, which is a STAFFING CONSTRAINT and not a convenience preference:**

> *"I would like you to **develop those paragraphs inside the software**. So for instance, it's gonna be running off of my Claude account with my tokens, but I'm not gonna be giving my — **I'm gonna have a paralegal logging in and using that function. She's gonna be using my tokens, but she's not gonna be logging into my Claude system.**"*

**The app calls the model on the firm's own BAA-covered API account. The paralegal works inside the software and never touches Michael's Claude login. Paragraphs return into the app as data.**

> **THIS REVERSED A RULING TAKEN EARLIER THE SAME DAY, and the supersession is recorded rather than smoothed.** In the typed sitting of 2026-08-21, `HD-12` was ruled **option B — "B — app assembles, you paste (recommended)"** — the app assembling a bundle and Michael drafting in a chat by hand, with no model call from the app at all. **The voice sitting later that day reversed it on the staffing ground above. The later ruling governs; the earlier entry stands as written.**
>
> **A FRAMING CORRECTION MADE BEFORE THE QUESTION WAS PUT, worth preserving:** an earlier capture said this design *collides with the no-real-client-data conventions.* **It does not, quite** — that rule bars client data from **the repo, fixtures, and handoff artifacts**, not from the running application, which exists to hold client data. **The real category change is directional: this would be the first outbound transmission of client medical content to a third-party model API.** That is why §16.3 is a gate and not a note.

### §16.2 — The payload is the FULL chronology, unmodified. The scrub approach was ABANDONED BY MICHAEL and is recorded so it is not re-proposed.

**No scrubbing, no thinning. The BAA is the mechanism that makes it lawful; content engineering is not.**

**His first theory, and his own move off it:**

> *"When we put that chronology together, the chronology itself is just going to have provider information and treatment information. It's not gonna have any personal health identifiers... for all that Claude knows, all that Claude knows is that, hey, we gotta put a designation paragraph together for this provider. Knows nothing about the client. Wouldn't that still be HIPAA compliant?"*

> *"**So it actually would be more helpful if I went and got an API account that was HIPAA compliant.**"*

### §16.3 — ⛔ A BAA IS A HARD GATE, AND THE VENDOR ROUTE IS MICHAEL'S — DO NOT PUSH IT

**No real record moves through the model-call path until a BAA is signed.** Michael said *"let's get an AWS account"* and Claude slowed him on the ground that a compliance document should not be signed before the design decision is made and before two confirmations that are his, not Claude's.

**The vendor route has a queue row of its own with full question text as of 2026-08-22, AND THE ROW'S ACTUAL ID STRING IS `H12-v`, NOT `HD-12-v`** — the `H`→`HD` renumber is forward-going only and does not reach a row already minted. *(Searching the queue for `HD-12-v` will not find it. Named here because that is precisely the class of error that nearly destroyed two unrelated rows at `#133`.)* **Michael on it:** *"they obviously need to wait on that so I can figure that out."* **DELIBERATELY NOT PUSHED, and it is not pushed here either.** `HD-12-w` (will AWS sign a BAA for a solo firm) and `HD-12-x` (the malpractice carrier's position on AI-assisted drafting over client medical records) are his and long-standing. **`HD-12-y` (token cost per matter, unestimated) and `HD-12-z` (ZDR endpoint configuration, live only on the OpenAI route) are open too — see §18.C for the full set.**

> **⚠ UNVERIFIED, FLAGGED AT THE POINT OF USE.** Every vendor fact in this thread — Bedrock, OpenAI, Azure, Vertex, Anthropic BAA routes and tiers — is **SEARCH-DERIVED; no vendor page was fetched.** Leads to verify, not settled procurement. **And the HIPAA propositions stated by Claude in that sitting** — the eighteen-identifier set, dates of service among them, safe harbour and expert determination as the two de-identification routes — **are UNVERIFIED LEGAL PROPOSITIONS, not routed to the registry. If any becomes load-bearing in the build it needs a registry entry with a cite and Michael's verification.**
>
> **A LOCAL MODEL ON THE P1 WAS OFFERED AS A FALLBACK AND WAS NEVER REJECTED — it was overtaken by the vendor finding. It remains available if the BAA path fails.**

### §16.4 — The return path: `HD-20-a` and `HD-20-b` (RULED 2026-08-21, voice3)

**`HD-20-a` — returned paragraphs are held as PROSE, WHOLE.**

> *"I don't really have preference on the mechanics… how it comes back in, just practically what I want to see is that paragraph that's put together just needs to make its way somehow, whatever's easiest and whatever's more practical, with the HIPAA compliance issues we're dealing with. **I just wanna see that paragraph end up in the word document.**"*

**Nothing takes returned paragraphs apart; nothing looks inside them. They enter the Word document as written.**

> **SCOPE LIMIT, EXPRESS: this is a delegation on MECHANICS ONLY, bounded by (1) whatever is easiest and most practical and (2) HIPAA compliance. If the practical answer later requires structured storage for some unrelated reason, that is A FRESH QUESTION, NOT A REVERSAL.**
>
> **THE COST WAS NAMED AT RULING TIME:** opaque storage forgoes any lint inside the returned text, any supplementation diff inside text, and the ordering check on it. **That cost is why the designee-type check moved upstream onto records (§6) rather than being abandoned.**

**`HD-20-b` — NO IN-APP EDITING of returned paragraph text.**

> *"**If any editing is gonna be done to that word document before I serve it, it's gonna be editing that I'm gonna do once I open the word document itself.**"*

Open the document, edit in Word, serve. **This is a real scope reduction: there is no in-app editing surface for model-returned paragraph text, and there is therefore nothing for the app to diff against a generation.**

> **⚠ A DISCREPANCY IN THE RECORD, SURFACED AND NOT ADJUDICATED — FOUND BY THIS FOLD-IN.** The **2026-08-22** RECON-1 capture carries `HD-20-b` as **"NOT REACHED (08-21 residue)"** — *"Does Michael edit returned paragraphs inside the app, or does the app hold the final only?"* — while the **2026-08-21 voice3** capture records the ruling above, in Michael's own words, on the same question. **The later capture appears to have carried the item forward from the earlier residue list without noticing that the intervening sitting had closed it.**
>
> **This file treats `HD-20-b` as RULED, on the strength of his verbatim, AND FLAGS THE DISCREPANCY rather than burying it.** The consequence of getting this wrong runs one way only: **Michael should not be re-asked a question he has already answered.** If he says the RECON-1 capture is right and voice3 misread him, this section is wrong and the correction goes in the log.

### §16.5 — Supplementation is purely ADDITIVE (RULED 2026-08-21, voice2)

> *"In these cases, a provider is not gonna simply change. There's just gonna be a new provider because **you're not changing what happened in the past**. So medical treatment that already happened, it's already at those disclosures. The only changes that would be made to the document would be that the client went and was seen by an additional provider who provided different types of medical treatment, who is now going to be able to testify of different things. And these different things need to be noted in the new expert designation paragraph."*

**Disclosed treatment is fixed history. Nothing is revised; things are only added. A new provider brings a new block with its own description of what it can testify to.**

**How the app knows what is already served — CONFIRMED at "Yes.":**

> *"Sure. And probably the easiest way for the app to know what's already in there is to just **call on the most current version of the disclosures that are saved in the files**."*

**The most recent saved disclosures document for the matter is the source of truth. No separate served/not-served flag. No ledger. No diffing inside paragraph text.**

### §16.6 — What §16 deleted, named so nobody rebuilds it

**R12's "supplemental instruments generated as a diff" is superseded.** **FE-21's diff limb goes with it (§3).** **FE-8's diff half STAYS DEFERRED — RECON-1 is not its consumer, and R13, which was named as that consumer, is retired (§3, §5).** **`HD-20-c` — whether returned text needs bold/italic/paragraph shape preserved, or is plain text the app formats — is OPEN and was never asked; it is partly moot on the return path and live as an output-rendering question.**

## §17 — THE MEDICAL TAB, THE PROVIDER RECORD, AND THE PROVIDER BLOCK (RULED 2026-08-21, except §17.1's minting approval — 2026-08-22)

### §17.1 — THE PROVIDER RECORD: a requirement no R-number covers, approved in principle, **ID NEVER MINTED**

**Michael's own specification of what the Medical tab must hold**, given unprompted at the wall where the walkthrough failed (*"we don't have any medical providers and… or any bills listed in here"*):

- **a provider record in its own right, not merely a bill** — all providers listed
- **each record carries the FACILITY and the INDIVIDUAL CLINICIAN together, on the same record** — his example: *"the radiologist, he's Doctor John Johnson."*
- **dates of treatment** — *"what are the dates of treatment that… while you were there?"*
- **a brief summary of the treatment in a cell that expands in length** — *"it shouldn't be burdensome for me to try to see it."*
- **sortable, chronological among the sorts** — *"or I need to be able to sort them by different ways."*

**This is what makes §1.2's defect fixable at all: today there is no individual clinician anywhere in the system to place in a designee slot.**

> **⛔ `RC-2` — APPROVED IN PRINCIPLE, DEFECTIVE IN EXECUTION.** Michael was asked whether to mint a durable ID for this requirement and said **"No objection."** **No ID was actually assigned** — the session said *"Numbered, then"* and assigned nothing. **The requirement therefore has Michael's approval and no identity, which is exactly the state QR-1 exists to prevent. Minting it is his act and this fold-in does not do it.**
>
> **⚠ AND THE WIDGET LETTER IS AMBIGUOUS — see §5.** "Widget G" means one thing in the 2026-08-20 text (mint §3's IDs) and a different thing in the 2026-08-22 sitting (mint THIS requirement's ID). **Michael's "No objection" attaches to THIS sense. Read the row before minting anything against the letter.**

### §17.2 — The disclosures panel: it MIRRORS the Medical tab and computes nothing

**`HD-21(b)` — RULED. The clearest composite of the whole thread; the answer was outside every option offered.** Claude had framed a two-way choice (one summary per provider vs visit-by-visit), then honestly widened it to three when the middle option forked, and recommended a mechanical rollup. **Michael answered with none of the three:**

> *"How about we make this for both? Let's make it just simply **mimic what… whatever is in the medical tab**. Because we already talked about in the medical tab that it'll be a **visit by visit breakdown if that's information that's available from a medical chronology**, and that if it's not visible or it's not available from the medical chronology, that it'll simply be **just a one line entry for that provider**."*

**The panel has no independent shape. It inherits the Medical tab's granularity.** Mixed within one case is expected and fine — three providers with chronologies show visit rows, two without show a single line each. **No collapsing, no summarising, nothing computed.** *This kills the panel-summary question outright.*

**`HD-21(c)` — RULED. The panel is deliberately THIN.**

> *"In the form builder itself, I don't think we actually need all that information built out. Honestly, we don't need all that in there. **I just need the providers. And I need to be able to select which providers I want in there** because… the user will be in the form builder, and the user can easily go and look at the medical tab for this information."*

**Providers and a selection control. NOT a data display.** *(This is what moved FE-22's charge-weighted gap surface — §8 Q5, §3.)*

**`HD-21(a)` — RULED. Ordered OLDEST TREATMENT FIRST**, on the disclosures screen, section two, providers-to-designate. Michael: **"That sounds good."** He scoped it himself mid-exchange — *"we're talking about just the medical tab, right?"* — and **whether the Medical tab's own ordering must match was raised, overtaken by the mirror ruling, and never separately answered: `HD-21-med`, OPEN, small.**

**`HD-21(d)` — RULED. Same doctor at two facilities = TWO ENTRIES.** On a client who saw one doctor first at one clinic and later at a second location — Michael: **"Put two separate facilities in there."** **Two rows, each designated with its own place of business: the designation ties a PERSON to a PLACE, so two places means two designations.**

> **MARKED AS CLAUDE'S INFERENCE, NOT MICHAEL'S WORDS:** that this supplies a cardinality FE-18 and CD-14 never stated — *a designation is per person-place pair, not per person.* **Michael said five words: "Put two separate facilities in there." The schema consequence is drawn from them and is not separately ruled.**

### §17.3 — `HD-3`: affiliation is TIME-BOUNDED, and Michael widened it past this module entirely

**Recorded WITH ITS IN-ANSWER REVERSAL INTACT rather than smoothed, because the first answer would have produced a wrong spec.** Asked whether a provider block should reflect that a doctor has since moved, Michael first said **"No. It doesn't need to say that."** Claude re-asked rather than accepting it, and he reversed:

> *"Oh, I see. I see what you're talking about. Well, then **the block should actually make that clear — make it clear that this was a facility that he was at when he treated the client, and that he's currently here**."*

**Then he widened it past disclosures:**

> *"You're talking about a situation that's very rare, but I believe that we talked before about this — that generally, **when we have contacts that are listed in the system, the whole case management system, those contacts carry a history of where these people were at. And it's the same whether it's a doctor or a radiologist or an insurance adjuster. Once their contact changes, they started working over this other place, the contact keeps a history of where they've been.**"*

**Affiliation history with dates lives on the CONTACT RECORD, for EVERY contact type. It is not a disclosures feature.** The provider block reads from it: where he was on the treatment dates, and where he is now.

> **⚠ HIS PRIOR-ART CLAIM — *"I believe that we talked before about this"* — IS UNVERIFIED.** No design-side check confirms it. **CD-1 input; put to him.**
>
> **This does NOT by itself answer CD-14's second limb (§3).** What he ruled is *where affiliation history lives*; whether the `renders-care-at` EDGE TYPE carries an effective period is a different question about a different object. **Flagged, not folded.**

### §17.4 — `HD-2`: the provider block top line is NAME + CREDENTIAL SUFFIX

> *"It'll be **name plus MD or DO or whatever their suffix is**."*

**Nothing about the provider's role in the case on that top line.**

> **MARKED AS A CLAUDE-INFERRED CONSEQUENCE, NOT MICHAEL'S WORDS:** that the suffix therefore has to live on the contact record as its own field, so the app is not parsing it out of a name string.
>
> **⚠ DO NOT MERGE THIS WITH PART 3's `S1`.** `S1` — *"identity + role descriptor"* — is the NARRATIVE PARAGRAPH's first sentence. `HD-2` governs the BLOCK's top line. They are different objects and the role descriptor is barred from only one of them.

### §17.5 — `HD-17`: the name is **PROVIDER BLOCK**, everywhere

Michael first raised it himself — *"What should we call that paragraph that has the provider names and the facility name and the address? What do we call that?"*, having been calling them *"those little designations"* — and ruled **"provider block."** Asked later whether it replaces the spec's own term: **"No. Let's call it provider block."**

**"Provider identification paragraph" RETIRES. It should be noted as the OLD NAME in `form-engine.md` so no future reader takes it for a different thing.**

> **⚠ THREE NAMES, ONE OBJECT, ONLY ONE EXPRESSLY RETIRED.** Part 3 of this file calls it the **CONTACT BLOCK**; `form-engine.md` §3 calls it the **provider contact block**; §9's header calls it the **provider identification paragraph**. **`HD-17` retires only the third by name.** The other two are live terms for the same object and their disposition was not put. **Flagged.**

### §17.6 — Provider block anatomy, and the missing-phone posture CORRECTED

**Order (RULED 2026-08-21, walk ruling 7):** the **person's name on top** — *"Now above the facility name, that's the pattern"* — then the **facility name**, then the **address**: *"it's always gonna have the facility name and then the address right after it."* Facility name, address and phone are pulled from the saved contact already in the system.

**Plus the custodian line, positioned BETWEEN the treating-provider names and the facility name (§11.4).**

**MISSING PHONE — first ruled 2026-08-21 (walk ruling 7) as a SILENT omission, in his words:**

> *"if it doesn't have a phone number listed in the contact, then **the little paragraph just omits a phone number**."*

**CORRECTED BY HIM THE NEXT SITTING, and the correction changes POSTURE, not OUTPUT:**

> *"We can flag it. I was thinking yesterday about — there are certain providers every now and then that I just simply don't have a good phone number for, and it's because it's a separate entity that was just created for billing purposes, and it's not really someone to reach out to. It's just like a separate billing entity that's connected to one other provider. **But you could flag it and allow the user to still create the document — without the phone number in there.**"*

**Rendered output UNCHANGED: the line is still absent and the document still generates. Posture CHANGED: Michael is told rather than not told.** The flag is a line in the §6.1 ambient panel. **The billing-entity reasoning survives and is the argument for never blocking.**

### §17.7 — `HD-21` core: ONE table, TWO grains, selected by whether a chronology exists

**The objection that produced the ruling — his, and it is a build constraint:**

> *"It could be helpful to have a separate row for each visit, but the question would be, **how does all that information get in there? We have to hand key all of that information. It's gonna be pretty burdensome**, and I can see a situation where things are just not gonna get keyed in. It's gonna take a lot of time."*

**The ruling:**

> *"How about we have the option to have **per visit if we have a medical chronology available to plug into the system**? That medical chronology would get plugged into the system, and then it would **auto populate those per visit lines**. Now if we don't have a medical chronology, then it would **default to the one row per provider, dates in a single field**."*

**NOBODY HAND-KEYS VISIT ROWS, EVER.** One row per provider is the default; per-visit rows exist only where a chronology auto-populates them. **The chronology is doing double duty: it feeds the drafting call (§14.3) AND it determines table grain.**

*Note the distinction against §14.4: the chronology auto-populates **visit rows for facilities Michael has already selected**. It never populates **which providers are in the case**. Those are different acts and only the first is permitted.*

**OPEN — `HD-21-b` residue: is the expanding summary cell one per provider, or one per visit? Never asked.**

### §17.8 — THE PROVIDER BLOCK OWNS NO DATA

> *"So we have that provider block. The provider block is basically just **calling that same information that is there for every single contact that we have saved**."*

**Two consequences:** fixing the Medical tab makes the §6.1 warning disappear by itself, because it is the same underlying record; and **an address is never edited inside the form.**

## §18 — WHAT IS OPEN

**FULL QUESTION TEXT IS CARRIED HERE PER QR-1, because the captures that hold it are `claude_`-prefixed project-knowledge files and this file is the only durable home the questions will have once they are relocated. NOTHING BELOW IS MINTED, RULED, OR CLOSED BY THIS FILE.**

### §18.A — The `RC` series (minted 2026-08-22)

| ID | FULL QUESTION TEXT | Status |
|---|---|---|
| **`RC-1`** | **Is the floor FIXED TEXT the engine emits, or a REQUIRED-CONTENT CHECK over model-composed prose?** Asked, cut off mid-sentence, never answered. The hard stops constrain but do not settle it: an invariant can be satisfied either by emitting the line or by detecting it. | **⛔ OPEN — THE RESUME POINT. Put it first.** |
| **`RC-2`** | Widget G's ID was never actually minted — the provider record carrying facility + individual + dates of treatment + an expandable summary, sortable (§17.1). Michael said "No objection"; nothing was assigned. | OPEN — defect. **Check the widget letter first (§5).** |
| **`RC-3`** | **The causation line's ruled wording is SINGULAR** ("that physician … the injuries that they treated"). One-paragraph-per-facility makes it COLLECTIVE. **How does the mandatory line inflect for a group?** | OPEN — raised by the ruling that created it; **never put to Michael** |
| **`RC-4`** | The custodian sentence — the actual predicate language, and Michael's "CPRC eighteen dot zero zero one." | OPEN — **UNVERIFIED. Registry candidate; only Michael verifies.** |
| **`RC-5`** | Does the custodian-only / pharmacy shape take a basis line at all? §13.4 implies no, but it was never squarely put. | OPEN |
| **`RC-6`** | The radiologist's causation line is **provisional by Michael's express terms** — "until I figure out a better way." The narrower "consistent with the mechanism of injury" alternative is preserved, rejected for now. | OPEN — provisional. **See §13.2: it now also carries a conflict with Part 3 rule 5.** |
| **`RC-7`** | Chronology drop zone: accepted formats, and what happens when a new chronology is dropped over an old one — replace / version / keep both? | OPEN — never asked |
| **`RC-8`** | Widget A — FE-18's wording (§1.6): adopt / reject / edit. **Adopted in substance; the wording is unratified and any act turning on its exact words re-puts them first.** | NOT REACHED |
| **`RC-9`** | Widget E remainder — **ND-4, ND-5, ND-6, ND-7 and ND-9, one at a time**, with the check-vs-judgment classification for each (§4 carries a recommendation for all five). | NOT REACHED |
| **`RC-10`** | Widget H — Q1–Q10. Q1, Q4 (in part), Q7 and Q9 answered by consequence; **Q2, Q3, Q5, Q6, Q8 and Q10 not walked** (§8). | PARTLY REACHED |

### §18.B — NEW, SURFACED BY THIS FOLD-IN. **UNMINTED — minting is Michael's act.**

**These are not new rulings and not new questions Claude invented. Each is a seam between two things already ruled, visible only once they sit in one document.**

| # | FULL QUESTION TEXT | Where |
|---|---|---|
| **B1** | **When the engine cannot satisfy a hard stop because the underlying record is incomplete — no facility, or a date the matter record contradicts — what does the user see, and can he generate anyway?** Three postures now coexist and none was put alongside the others: the ambient panel never blocks; `HD-22` warns and never blocks; the hard stops say "you can't violate those ones." And Michael's own sentence inside the `HD-1` ruling — *"we need to fix this before we generate the disclosures document"* — reads a fourth way. | §6.1, §12.3 |
| **B2** | **The radiologist's causation object: "the injuries treated" or "the findings identified"?** Part 3 decision rule 5 (Michael, 2026-08-20) says the causation object tracks the provider's actual work product and calls getting it wrong *"the most legally consequential generation error available."* The 2026-08-22 ruling (Michael) keeps the causation line **as written** for the radiologist and expressly declined the narrower findings/mechanism form. **Both are his and they point opposite ways.** | §13.2 |
| **B3** | **Is `HD-20-b` ruled or open?** The 2026-08-21 voice3 capture records it RULED in his words; the 2026-08-22 RECON-1 capture carries it as NOT REACHED. **This file treats it as ruled and flags the conflict.** | §16.4 |
| **B4** | **"Widget G" names two different acts.** 2026-08-20: mint §3's IDs. 2026-08-22: mint the provider-record requirement's ID. **Michael's "No objection" attaches to the second. The first is also still untaken.** | §5, §17.1 |
| **B5** | **`provider_billing_profiles` is a TABLE NAME containing the renamed word**, and ruling 4's accepted cost enumerated three COLUMNS. Left unstated, a Code session reads it in or out at its own discretion. **Belongs in `HD-16`'s migration plan.** | §2 |
| **B6** | **Part 3 decision rule 3** — *"No diagnosis language, and no 'medical knowledge', outside licensure scope"* — depends on Texas scope-of-practice law **absent from Part 7's list**. Either it joins the list or the rule drops to drafting judgment. | §9 |
| **B7** | **Part 7's *Baylor Medical Plaza v. Kidd* parenthetical is a CHARACTERIZATION, not merely a cite**, and Part 7's blanket UNVERIFIED label does not cover the difference. Under V-9 it cannot be characterized without the court's own document, a paginated vendor copy stating authorship, or Michael's identification. **None was obtained.** | header note, §9 |
| **B8** | **Part 7's deadline authority list is incomplete for what R11 would compute** — TRCP 190.3(b)(1)(A) is the Level 2 period only, while the design contemplates a DCO override and Levels 1 and 3 end by a different instrument. **Incompleteness flag, not a legal opinion.** | §9 |
| **B9** | **Does "nothing lints the drafted text" reach TEMPLATE-RENDERED output?** The 2026-08-21 ruling and its reasoning are about model-returned prose. The `form-engine.md` §9 path FE-D1 uses today is not model output. **Never put.** | §6.4 |
| **B10** | **Three names, one object.** `HD-17` retires "provider identification paragraph." Part 3's "CONTACT BLOCK" and `form-engine.md` §3's "provider contact block" are live terms for the same thing and their disposition was not put. | §17.5 |
| **B11** | **Do the 2026-08-21 rulings already answer `RC-1` by implication?** *"Nothing lints the drafted text"* (§6) and *"nothing takes returned paragraphs apart; nothing looks inside them"* (§16.4) are both ruled — and **the CHECK branch of `RC-1` IS inspection of drafted text.** Taken at their widest they leave only fixed text. **But hard stop 1 was ruled the day AFTER, and an engine that may not look at what it is about to emit cannot honour it except by emitting the line itself.** So either those rulings are narrower than their widest reading, or `RC-1` is answered already. **This file draws neither conclusion.** The same seam as B1 and B9, from a third angle. | §11.6, §6, §16.4 |

### §18.C — `HD` residue and neighbours

| ID | FULL QUESTION TEXT | Status |
|---|---|---|
| **`HD-10`** | Whether R11's TRCP 195.2 verification is staged as its own registry item. | OPEN — **never raised with Michael** |
| **`H12-v`** *(**the row's actual ID string is `H12-v`, NOT `HD-12-v`** — the rename is forward-going only and this row predates it; do NOT renumber it)* | Vendor route for the model call — Bedrock vs OpenAI vs a local model on the P1. Waits on AWS's willingness to sign a BAA for a solo firm and on the malpractice carrier's position. Bedrock leading; **all vendor facts UNVERIFIED.** | **OPEN — MICHAEL'S. DO NOT PUSH.** Has its own queue row since 2026-08-22. |
| **`HD-12-w`** | Will AWS sign a BAA for a solo law firm? | OPEN — Michael's to confirm |
| **`HD-12-x`** | The malpractice carrier's position on AI-assisted drafting over client medical records. | OPEN — Michael's, long-standing |
| **`HD-12-y` / `HD-12-z`** | Token cost per matter (offered, never taken up, unestimated); ZDR endpoint configuration (live only if the OpenAI route wins). | OPEN |
| **`HD-16`** | The rename slice needs a written migration plan: three columns, **the `provider_billing_profiles` table name (B5)**, the CD-1 role vocabulary, `form-engine.md` §9's tokens, FC-1's canonical form, the 23 seeded token rows, the SKILL, and `variants.ts` regeneration. | OPEN — consequence of §2 |
| **`HD-20-c`** | Does returned text need bold/italic/paragraph shape preserved, or is it plain text the app formats? | OPEN — live as an output-rendering question |
| **`HD-21-med`** | Is the Medical tab's own provider ordering also oldest-treatment-first? | OPEN — raised, overtaken, never separately answered |
| **`HD-21-b` residue** | Is the expanding summary cell one per provider, or one per visit? | OPEN — never asked |
| **`CD-14` limb (ii)** | Does `renders-care-at` carry an EFFECTIVE PERIOD? **Not answered by `HD-3`, which ruled where affiliation history lives, not what this edge type does.** | OPEN |
| **`HD-3` prior-art** | Michael's claim that contact affiliation history was discussed before. | **UNVERIFIED** — CD-1 input |
| **`RF-2`** | Hand in `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` so both unfiled disclosures captures reconcile together; its Q3 and Q5 bear on R2 and R16. **H5: no machine search without his direction.** | OPEN — Michael's |
| **`MIG-1`** | The FE-D1 migration `db/migrations/2026-08-20-fe-d1-form-engine.sql` is reported UNRUN. **Ruled `HD-18`: run it now, unchanged, Michael's hand. Carried unverified and NOT re-asserted here.** | PENDING — Michael's hand |

### §18.D — 2026-08-20 questions still untaken

**Q2** (where the chronology lives in the data model — partly relocated by §14.1, the parsing layer barred, the field-mapping layer unruled) · **Q3** (custodian-only on the expert track or a separate records-predicate/affiant track; § 18.001 flagged at the point of use) · **Q5** (the gap flag's trigger; its surface moved, the trigger never walked) · **Q6** (a retained-expert capture, or is rule text enough for the fields) · **Q8** (is the combined 194.2(b)/195.5 instrument the house standard — *please confirm, since you authored the master*) · **Q10** (the custodian-degradation threshold; the BLOCK limb is withdrawn, the threshold itself never walked) · **the §0.2 master-skeleton capture's own Q3 and Q5**, which are DIFFERENT QUESTIONS sharing the same numbering (§0.2).

### §18.E — GATED, and it stays gated

**`R11` — the TRCP 195.2 designation deadline.** **GATED on Michael's verification of TRCP 195.2.** No registry entry exists; the playbook E1 row carries an unresolved 90/60-vs-60/90 conflict flag, and that flag must ride the number at every point of use. **NOTHING IN THIS FILE — AND NOTHING IN ANY SITTING SINCE 2026-08-20 — HAS COMPUTED, DISPLAYED, OR PROPOSED A DESIGNATION DEADLINE.** A "proposal for confirmation" is still a computed date. **His act, and still the cheapest unblock in this capture.**

> **⚠ ADDED 2026-08-25, AND IT MAKES THE UNBLOCK CHEAPER STILL — found by this session's cross-slice sweep of the review queue, not by the disclosures thread.** Every entry since `#127` has carried `R11` as *"no row anywhere."* **`R11` itself has no row. Its UNBLOCK has two, and both are already in the register, classified LIVE:**
> - *"`TRCP 195.2(a) and (b)` — **the most expensive thing on this list to miss.** Are the 90-day and 60-day offsets from the discovery-period end correct?"*
> - `[DL-memo Q4]` — *"Rule 195.2's 'later of … 30 days after the request is served' floor is **GONE** from the July 2026 text… Do you verify that the floor is gone?"*
>
> **Nobody had connected them to `R11`.** Verifying those two rows discharges the gate — **and the second one is news the disclosures thread never had: the floor this module would have computed against may not exist any more.** Recorded here so the next sitting does not go looking for a verification act that is already sitting on the register with its full question text.

## §19 — `RF-5`: the header label, and the convention question underneath it

**The problem, and it is real: on an UNFILED draft, a line reading "Canonical repo path:" reads as an ADDRESS when it is an INTENTION. At least four sessions read it that way** — which is part of how a file everyone believed was filed sat unfiled for five days.

**Two questions were travelling as one, and they separate cleanly:**

**(1) This file.** The moment the packet carrying this text runs, **the path becomes an address and the problem dissolves for this document.** The header above reads "**Canonical repo path WHEN FILED**" because it was written before that happened; it stays true afterward and costs nothing. **No ruling needed.**

**(2) The convention for FUTURE REQ-CAPTURE drafts — this is the actual open question, and it is Michael's.** Should every REQ-CAPTURE draft carry "**Canonical repo path WHEN FILED**" (or "**DESTINATION**") until it is filed, as a format convention? **PROPOSED at `#136`, UNRULED, and PUT rather than assumed here.**

*Recorded because it is a small instance of the general pattern: an offered option turned out to be two, and saying so before recommending is CC-1(a).*

---

**END OF FILE.** Nothing below the line was ruled by this fold-in; this document records rulings, it does not make them.
