# REQ-CAPTURE — disclosures expert designation: the facility-as-expert defect, the generator spec, and sixteen requirements

**Canonical repo path:** `docs/specs/REQ-CAPTURE_disclosures-expert-designation_2026-08-20.md` — **AT HEAD since `7a7f797` (batch 83, 2026-08-31). This edition is the THIRD FOLD-IN, a wholesale REWRITE carried by the 2026-09-01 packet; the file is replaced, not annotated.**
**Channel:** REQ-1 — CIVIL LIT practice project → Michael's hand → this design project → reconciliation → ruling. Seventh REQ-CAPTURE through the channel; the second from CIVIL LIT on the disclosures instrument in two days (see addendum §0.2 on its unfiled sibling).
**Source (client-clean by construction):** a real, approved, served plaintiff's-side combined TRCP 194.2(b) / 195.5 disclosures instrument designating seven provider groups in a motor-vehicle personal-injury matter. No party, provider, cause number, amount, or date of occurrence appears below.
**Status of Parts 1–8:** UNRULED INPUT from the drafting side as delivered by Michael 2026-08-20 (Central) — no design rulings, no build claims. Everything is PROPOSED until ruled, except the three never-do rules Michael states he has already ruled (Part 5, ND-1–ND-3), which the addendum RECORDS on this project's record for the first time.
**DT-1:** Parts 1–8 and the addendum's original text are stamped 2026-08-20 Central (clock-checked 21:56 CDT; container UTC read 2026-08-21 and was NOT used). Every stamp added by the 2026-08-25 fold-in is 2026-08-25 Central (clock-checked 13:02 CDT). **Every stamp added by the 2026-08-31 fold-in is 2026-08-31 Central — the sitting opened at 18:53 CDT and ran past the 19:00 rollover, so the container clock read 2026-09-01 for most of it and was NOT used; the bridge read on Michael's machine (20:46 CDT, 2026-08-31) is the clock of record. Every stamp added by the THIRD fold-in is 2026-09-01 Central (clock-checked 12:01 CDT over the bridge; the container's UTC 17:01 was not used).**

---

## HOW THIS FILE IS LAYERED — read this before reading anything else

This file reached its canonical path for the first time at `7a7f797` (batch 83, 2026-08-31), after being verified ABSENT at `origin/master` on 2026-08-22 (`#136`) and re-verified ABSENT at HEAD `edea20b` on 2026-08-25. **This edition is its THIRD fold-in.** On 2026-08-31 — a typed Fable 5 sitting, Cowork, bridge granted, opened on the file at HEAD rather than on captures — Michael ruled `RC-1` and, one question at a time, everything downstream of it: twenty-one ruling exchanges (some forty-nine discrete rulings) in all, recorded in §§11–18 in his words. **The first fold-in's text was REWRITTEN where those rulings moved it; nothing was set beside its replacement.**

**LATER THE SAME NIGHT a SECOND typed sitting (Fable 5, Cowork, bridge granted, ~22:05 CDT past midnight) took EIGHTEEN FURTHER RULINGS — `AS-Q1`–`AS-Q13b`, every one a SELECTION by Michael among option texts Claude wrote — off an adversarial six-lens audit of the ruled design.** Those rulings reached HEAD on 2026-09-01 in `docs/specs/fe-d1-amendment-slice.md` §2 and in the session log at `#140`; **§§11–§18 of this file did not carry them, and a POINTER blockquote beneath §18.G said so on the file's own face.** **THIS EDITION CARRIES THEM, and the pointer is SPENT and gone.** The slice's §2 remains the governing record of the selections themselves — his words are quoted there and re-quoted here; **where this file and the slice's §2 differ, §2 governs and the difference is named.**

It is layered in three:

| Layer | What it is | Status |
|---|---|---|
| **PARTS 1–8** | Michael's capture, **VERBATIM**, 2026-08-20 | **UNCHANGED, and never to be changed.** These are his words. |
| **RECONCILIATION ADDENDUM §0–§10** | Opened 2026-08-20 (Fable 5, typed, Cowork; filed at `#127`). **REWRITTEN IN PART 2026-08-25 and again 2026-08-31.** | Sections that the design has since moved past carry a **`REWRITTEN`** banner naming the date, the ruling, and — in one line — what the section used to say. **The superseded text is NOT reproduced here.** It lives in the session log (`#127`, `#138`, and the 2026-08-31 entry) and in the captures. |
| **§11–§19** | Sections carrying rulings taken **after** the addendum was authored — 2026-08-21, 2026-08-22, 2026-08-24, **2026-08-31 (`RC-1` sitting)** and **2026-08-31 late (`AS` sitting, folded 2026-09-01)** | The operative spec of what a designation paragraph must contain — **and, since 2026-08-31, of how the engine builds one (§11.6–§11.8, §15.6), what the model may and may not populate (§17.1a), and where the call runs (§16.1).** |

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
| **§2** (B5) | the `provider_billing_profiles` table name renames in the same slice | **2026-08-31** |
| **§3** | FE-18's wording RATIFIED; CD-14 limb (ii) ruled; the provider record minted **`R17`**; FE-20's `RC-1` lean resolved; finding 7 ruled; `HD-10` closed | **2026-08-31** |
| **§4** | ND-4, ND-5, ND-6, ND-7(a)(b), ND-9 ADOPTED; ND-7(c) held for hands-on; ND-8's `RC-3` closed | **2026-08-31** |
| **§5** | widgets A, E, G, H resolved | **2026-08-31** |
| **§6** | the panel is one of THREE TIERS (§12.3); §6.4's template-output question dissolved (B9) | **2026-08-31** |
| **§8** | Q2 by consequence; Q3, Q6, Q8 ruled; Q4's order limb closed; Q5, Q10 held | **2026-08-31** |
| **§10** | the to-Code list, second edition | **2026-08-31** |
| **§11.5–§11.8** | **`RC-1` RULED: the app places the fixed sentences; the model writes around them; app assembly; four slots; two fixed lists; the custodian sentence is the writer's, four limbs required** | **2026-08-31** |
| **§12.3** | the three postures become three TIERS; hard stops STOP AND TELL; the operative conditions are three absences | **2026-08-31** |
| **§13** | the four shapes SUBSUMED by PROVIDER TYPE; the radiologist's line is 9.2 as written (B2 closed, `RC-6` closed); the chiropractor moves to medical probability; EMS keeps its own line; `RC-5` by consequence | **2026-08-31** |
| **§14.1** | `RC-7` ruled — formats and versioning | **2026-08-31** |
| **§15** | `RC-3` closed (plural tokens); the radiologist-only split; explain-each-then-pair; the rider is the composite | **2026-08-31** |
| **§16** | the model returns PARTS, plain text; `HD-20-b` confirmed; `HD-20-c` ruled | **2026-08-31** |
| **§17** | `R17` minted with two new fields; the type mechanism; `HD-21-med`, `HD-21-b`, `CD-14`(ii) ruled; "provider block" the one term | **2026-08-31** |
| **§18** | rewritten whole: what closed, what is held on the hands-on queue, what remains | **2026-08-31** |
| **§1.6** (conformance note only — **FE-18's RATIFIED TEXT IS NOT EDITED**) | `AS-Q3` puts the provider block on the SELECTED facility where FE-18's ratified sentence speaks in the EDGE's terms; reconciled by the slice's D-8, and the re-ratification PUT to Michael at §18.G | **2026-08-31 late** |
| **§11.4** | `AS-Q7c` DISCHARGES the block line's text act — Part 3's written form, the count rule, the pharmacy literal; the "noted, not resolved" note is spent | **2026-08-31 late** |
| **§11.6** | the LEAD is added in front of slot 1 (`AS-Q8b`); §9.11 is placed WHOLE by the app for custodian-only (`AS-Q7a`); the four limbs bind the pharmacy too (`AS-Q7b`); future care in the writer's middle is now RULED, not merely unobjected (`AS-Q8a`) | **2026-08-31 late** |
| **§11.8** | the type vocabulary grows to **FIFTEEN** (`AS-Q5`): mental health (no fixed sentences, no generated paragraph — the §5.1 pause), other physician (MD/DO), other licensed non-physician provider; `AS-Q8a` confirms §9.1's short form for all six | **2026-08-31 late** |
| **§12.3** | a FOURTH absence is named — mental-health TYPE is a §5.1 PAUSE and not a must-fix stop, and the two are distinguished so a build does not merge them (`AS-Q5`); the slice's provisional must-fix surface is recorded INSIDE the held options (D-1) | **2026-08-31 late** |
| **§13.4 / §13.6** | the pharmacy paragraph takes the FOUR custodian limbs (`AS-Q7b`); a new §13.6 records the custodian-only shape whose §9.11 the APP places whole (`AS-Q7a`) | **2026-08-31 late** |
| **§14.1 / §14.6** | `AS-Q4` — extracted TEXT per version in the database, bytes not retained, a file store at gate 7; `AS-Q10` — one chronology set per CLIENT | **2026-08-31 late** |
| **§15.3 / §15.6 / §15.7** | `AS-Q10` — one instrument per plaintiff; `AS-Q8c` — the rider's fixed scope sentence APPROVED AS SHOWN, with its subject | **2026-08-31 late** |
| **§16.1a** (new) **/ §16.5** | `AS-Q1` — the call runs in a SERVER-SIDE FUNCTION holding the credential as a Supabase secret, fixture writer only until `H12-v`; `AS-Q6` — supplementation's base is the app's most recent GENERATION RECORD, said plainly on screen. *(§16.3's BAA gate is UNMOVED and unamended.)* | **2026-08-31 late** |
| **§17.1 / §17.1a / §17.3 / §17.4 / §17.9** (new) | `AS-Q3` — `R17` is CASE-SCOPED, promoted to the directory by hand, TYPE per case pre-filled from last time, and the model never creates a contact or a link; **`AS-Q2` — the EXTRACTION CONTRACT stated in full at §17.1a, and §17.1a's "and nothing else" named a WORDING DEFECT**; `AS-Q11` — the rename literals and the frozen `renders-care-at` period; `AS-Q12(e)` — the §12.7 imaging question as a panel line | **2026-08-31 late** |
| **§6.2 signal 5** | `AS-Q13a` — the *"affiliation unverified"* line is **RULED OUT** until `CD-14` limb (i); provenance recorded from birth so it stays buildable | **2026-08-31 late** |
| **§12.1 / §12.3** | invariant 1's SCOPE stated — it binds only the types §11.8 gives a causation sentence to, because `AS-Q5` added one that has none | **2026-08-31 late** |
| **§18** | rewritten again: a new §18.A1 disposition table for the eighteen `AS` rulings; `AS-Q9`'s retirement of the four interview cards; §18.F gains FOURTEEN **PROPOSED** items (the accepted count stays at TWENTY-ONE); §18.G's POINTER blockquote is SPENT and replaced, and `FE-D1A-1` joins the still-Michael's list | **2026-08-31 late** |

**WHAT REMAINS OPEN AFTER THE THIRD FOLD-IN.** `R11` (the TRCP 195.2 designation deadline) is **still GATED on Michael's verification** — its two unblock rows sit on the register (§18.E), `HD-10` closed by pointing at them, and **no TRCP 195.2 deadline is computed, displayed, or proposed anywhere in this file.** `RC-4` narrows to the `CPRC § 18.001` registry candidate, UNVERIFIED. `H12-v` and its `HD-12-w`…`z` limbs are Michael's. The five 2026-08-31 hands-on items and the sixteen older ones now sit on the **CC-1 HANDS-ON QUEUE, which Michael accepted whole on 2026-08-31** (§18.F). `RF-2`, `MIG-1`, `HD-3`'s prior-art claim, `RF-5`, and the §3 sixteen-ID minting act (widget G's 2026-08-20 sense) are unchanged and named at §18. **`RC-1`, `RC-2`, `RC-3`, `RC-5`–`RC-10`, and seams B1–B5, B9–B11 are CLOSED and say so in place.**

**ID SERIES NOTE.** The disclosures `H` series was renamed **`HD-1`–`HD-22`** on 2026-08-22, **FORWARD-GOING ONLY**, on the 2026-08-13 `H`→`HK` precedent. This file uses `HD-` for every disclosures item. **Backfilled log entries, `case-heartbeat-design.md`, and existing queue rows keep their original `H` strings and are NOT retroactively renumbered.** Where a bare `H` appears in a quoted line it is quoted, not adopted. **`H5` in this file always means the binding convention (Michael answers first; no unprompted machine sweeps), never a disclosures item** — that string collides and the collision has already cost this project two nearly-destroyed queue rows (`#133`).

**`§9` IS AMBIGUOUS IN THIS FILE'S SOURCE MATERIAL AND IS DISAMBIGUATED HERE.** The addendum's own **§9** is the registry census. **`form-engine.md` §9** is the twelve approved paragraph variants. Where the 2026-08-22 capture speaks of *"§9's twelve-variant framing"* (its supersession header) and *"§9's framing"* (its RR-1-forward line at PART 8.5), it means **`form-engine.md` §9** in both places. Every reference below names which. **Nothing in this file edits `form-engine.md` §9's twelve paragraphs on Claude's initiative** — they are Michael-approved verbatim. **ONE EDIT TO THEM IS RULED, BY MICHAEL, 2026-08-31, and travels as a packet work order, not as text in this file:** §9.4's causation sentence loses *"chiropractic probability"* for *"medical probability"* and its note's *"chiropractic (not medical) probability — settled"* goes with it — his words: *"Get rid of chiropractic probability and replace with medical probability."* Every other sentence in §9 is untouched by every ruling folded in here. **And since 2026-08-31 §9 has a second job:** its basis and causation sentences are the SOURCE TEXT of the app's fixed-sentence table (§11.8), so an edit to one of them is an edit to what the engine emits.

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

**RE-RECONCILED 2026-08-25 (Opus 5, Cowork, typed, device bridge granted on the checkout and on `Documents\Knowledge Repo`) against BUILD-STATE at HEAD `edea20b` — the one hundred twenty-third refresh, written by queue-runner batch 82 — `CLAUDE.md`, `docs/specs/session-log-head.md`, and the live log and full abstract index at `docs/record/`, read at HEAD over the bridge.** Verified at that HEAD and stated rather than carried: **FE-D1 is BUILT (2026-08-20), code-complete, exercised in a browser ON FIXTURES ONLY, EXCLUDED from the GL-1 floor, and its migration `db/migrations/2026-08-20-fe-d1-form-engine.sql` (13,171 B) is STILL UNRUN** — `MIG-1` carried unverified and **not re-asserted as fact**; the live database holds 37 tables against 41 in `db/schema.sql`, which is the honest state. `docs/skills/drafting-disclosures/SKILL.md` **v2 remains the live drafting path.** Nothing in either fold-in is a build authorization.

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

**§1.6 The fix as a design ruling — REWRITTEN 2026-08-25; WORDING RATIFIED 2026-08-31.** *FE-18 was **ADOPTED IN SUBSTANCE 2026-08-21** (widget A). Michael: "I guess we adopted." Its wording was NOT ratified then, and he said why in the same breath:*

> *"but whenever you read those little widgets out, I just… I don't really understand exactly what you're getting at there. I just wanna make sure that what I'm saying is missing. I wanna make sure that you are feeding it in in your language however you need to put it to where it gets added."*

**FE-18's operative text below was Claude's translation of a ruled intent, and on 2026-08-31 it was RE-PUT TO MICHAEL IN PLAIN LANGUAGE, as this section required, and RATIFIED — *"Ratify that as the rule's wording."*** The plain-language form he ratified: *a designation always names a person — an individual, or "the Custodian of Records for [facility]" — never a business; the person's address and phone in the designation come from the facility where they render care, through a link on the contact record whose name is still provisional; the charges table keys on the facility; the form-engine spec's connective wording is amended to say so, without rewording the twelve paragraphs; the code changes ride a separate authorization; and the hand-drafting skill gets a line saying the same rule.* **The block below is the operative text and now carries his ratification.** Ruling 4 of 2026-08-21 had materially changed FE-18's terms — FE-18 as first drafted said nothing gets renamed, and the rename is ruled in (§2) — and the two are reconciled below rather than stacked. `RC-8` CLOSED.

> **FE-18 — The designee slot is typed.** A 195.5 designation's designee is a contact of `kind = 'individual'` or a person-role ("Custodian of Records for {facility}"); never an organization. The designee's 195.5(a)(1) address and telephone are read from **the facility** at the far end of a `renders-care-at` affiliation edge (name provisional; adding it is a spec-level act on `contact-directory.md` §5), case-scoped or world-fact per CD-1 §5. **The charges table stays FACILITY-keyed** — the billing side is unchanged in substance and renamed in fact (§2, ruled 2026-08-21): it keys a `facility`, and calling that key a `provider` is precisely the ambiguity the rename removes. One provider SET, two key types, three renderings (R3). `form-engine.md` §2 step 2, §3's contact-block sentence, §9's header sentence, and §10 are amended to say so; **`form-engine.md` §9's twelve paragraphs are not reworded.** FE-D1's picker, token registry, and lint are amended under a new authorization (§19). `docs/skills/drafting-disclosures/SKILL.md` takes a v3 line making the same rule explicit for hand drafting.
>
> **`parties.kind ∈ {individual, organization}` IS UNTOUCHED** — those are CD-1 schema kinds, not the word being renamed, and FE-18 keeps them.

> **CONFORMANCE NOTE ADDED 2026-09-01 (third fold-in) — THE RATIFIED TEXT ABOVE IS NOT EDITED, AND NOTHING HERE EDITS IT.** FE-18's ratified sentence reads the designee's 195.5(a)(1) address and telephone from *"**the facility** at the far end of a `renders-care-at` affiliation edge."* **`AS-Q3` (2026-08-31 late; Michael's selection: *"(A) Case-scoped record; promote to the directory by hand; TYPE set per case, pre-filled from last time"*) puts the provider block on the SELECTED facility — the one the extracted name came out of** — because under a case-scoped `R17` an UNPROMOTED individual has no edge at all, so an edge-only reading would render nothing. **The two are RECONCILED, not stacked**, by the slice's D-8, quoted in full because it is the operative reconciliation: *"The provider block ALWAYS reads the SELECTED facility (AS-Q3 — the one the name came out of; the `R17` nesting). When a promoted individual carries a `renders-care-at` edge whose period covers the treatment dates and names a DIFFERENT facility, a panel line flags the mismatch (§8.2 line 17) [the SLICE's §8.2, not this file's §8] — never a silent substitution; when a LATER current edge exists (blank `effective_to`, `effective_from` after the treatment dates), the block adds beneath the phone: 'Currently practicing at {facility}, {address}, {phone}.' **That sentence is a TEXT ACT in a served block and is listed in §15 for Michael's eye before any real record.**"* **For a PROMOTED individual the edge is the world-fact form of the same fact and the two agree; where they disagree the app FLAGS and never substitutes.** *(D-8's own closing sentence is quoted above and its subject — the "Currently practicing at …" line — is carried as a PROPOSED hands-on item at §18.F.)*
>
> **WHETHER FE-18's OWN SENTENCE IS RE-RATIFIED TO THE SELECTION READING IS MICHAEL'S, AND IS PUT — NOT ASSUMED — AT §18.G.** Ratified wording is his; a fold-in does not amend it, and this note is a reading, not an edit. **Until he rules, FE-18's text stands exactly as ratified and D-8 governs what the app does.**

**R16's containment spec is §6 below — and §6 was rewritten; read it before building anything from Part 1's CONTAINMENT paragraph.**

## §2 — The schema rename (Part 8 item 2) — **REWRITTEN 2026-08-25. THIS SECTION'S 2026-08-20 RECOMMENDATION WAS REJECTED.**

*Its 2026-08-20 text recommended NOT retiring `provider` — adopt the principle at the slot only, leave the three live columns alone, and if Michael wanted them renamed, wait for a later schema act. **Michael ruled against it.***

**RULED 2026-08-21 (walk capture ruling 4, widget C).** Claude's alternative, which Michael endorsed: *call the facility the facility and the person the provider, explicitly, everywhere.* Michael: **"I like it that way, the way you just said it."**

**`facility` means the facility. `provider` means the person. Named that way EVERYWHERE, not only in the disclosures block.**

**Why the recommendation fell, preserved because the reasoning is the load-bearing part.** The 2026-08-20 recommendation reasoned from blast radius on the assumption that `provider` is *correctly named* on the billing columns. Michael's Medical tab (§17) requires a person and a facility to coexist **on one record** — at which point a column named `provider` that means *facility* is not correctly named; it is actively ambiguous in the one place a human will read it. **The blast radius did not change. The thing it was weighed against did.**

**The cost, enumerated and ACCEPTED by Michael at ruling time.** Three live columns — `medical_bills.provider_party_id`, `code_mappings.provider_party_id`, `provider_billing_profiles.provider_party_id` — on tables migrated live 2026-07-28; the CD-1 role-tag vocabulary, derived from the `party_type` registry and retained by ruling `#62`; the approved `{provider_name}` / `{provider_dr_name}` / `{provider_his_her}` / `{provider_they}` / `{referring_provider}` tokens; FC-1's canonical token form; the 23 seeded `form_token_definitions` rows; and `docs/skills/drafting-disclosures/SKILL.md`. **This is build work, not a rename in passing.**

**A FOURTH SURFACE THE COST LIST DID NOT NAME — found by re-sweep 2026-08-21, RULED 2026-08-31.** `provider_billing_profiles` is a **TABLE NAME** containing the word; ruling 4's accepted cost enumerated three *columns*. Put to Michael as B5: rename it in the same slice, or leave the table name? **His ruling: *"Rename it in the same slice."*** The table renames with the three columns, in the one migration §2's sequencing paragraph describes, and it is the fourth surface in `HD-16`'s migration plan. *(B5 CLOSED.)*

**SCOPE LIMIT, stated so a Code session cannot read the rename wider than it was ruled.** `provider` in `form-engine.md` §9's approved PROSE **already means the person** and is therefore already correct. **No approved paragraph is reworded.** The rename reaches tokens, columns, vocabulary and the SKILL — **not the sentences.** `form-engine.md` §9's own header bars the alternative, and this limit exists because without it the rename reads as a licence to touch text Michael approved.

**SEQUENCING — one slice, not two. CONFIRMED BY DELEGATION, and marked as such.** Asked whether the rename should be its own migration slice or fold into the provider-record work, Michael: *"Whichever you think is cleaner."* Claude ruled **one slice**: the provider record lands with `facility` and `provider` meaning the right things from birth, and the three legacy columns rename in that same migration. Reasoning: doing it separately means a rename migration whose only purpose is churn, followed by a second migration adding the real thing — two chances to get the data wrong for no benefit. **This is DELEGATED, not Michael's own reasoning. If a later pass finds the split safer, re-put it rather than treating it as settled by him.**

**AND THE MIGRATION-TIMING PREMISE THIS SECTION USED TO REST ON WAS CHECKED AND DID NOT HOLD.** Its 2026-08-20 close deferred the rename to "the next schema act (the FE-D1 migration is itself still unrun)." The walk capture then asserted that the rename *"changes names that migration establishes."* **Both were wrong.** `db/migrations/2026-08-20-fe-d1-form-engine.sql` creates four `form_*` tables, extends `generated_documents` with seven nullable columns, and sets RLS and per-table grants; **no object it creates or alters carries the word `provider`** (decisive command: `grep -in provider db/migrations/2026-08-20-fe-d1-form-engine.sql`). The three `provider_party_id` columns live on tables migrated live 2026-07-28 and are not in that file.

**Consequence — `HD-18` RULED 2026-08-21: the FE-D1 migration is neither amended nor held. Michael's pick, verbatim from the option list: "Run it now, unchanged (recommended)."** It runs **by Michael's hand**; no Code session is authorized to execute it, and its eight verification checks are still answered in words. *Status at HEAD `edea20b`, 2026-08-25: **STILL UNRUN.** `MIG-1` remains carried and unverified; this file does not assert it either way.*

## §3 — Durable IDs (Part 8 item 3) — PROPOSED disposition table, **REWRITTEN 2026-08-25 and 2026-08-31**

**ONE ID IN THIS TABLE IS MINTED — `R17`, the provider record, on 2026-08-31 (Michael: *"use that"*). Every other proposed ID is still PROPOSED. Minting the rest — the 2026-08-20 sense of widget G, §3's IDs item by item or as a group — remains Michael's act and is put with the 2026-08-31 packet, not taken by this file.**

Series precedent: FE-1…FE-17 exist (FE-17 is the last minted), CD-1…CD-13, IN-1…IN-7, DL-INPUT plus un-ID'd `[DL-memo Q1–Q5]` and `Q-DE-1..6`. One home per question (CL2-AC-1). Duplicates are folded, not re-minted.

| Packet-local | Proposed durable | Disposition |
|---|---|---|
| R15 + R4 | **FE-18** (new) | The typed designee slot and the affiliation edge — §1.6's text. R4 is R15's data-model statement; one home. The edge TYPE itself is a spec-level act on `contact-directory.md` §5 and is filed as **CD-14** (below). **ADOPTED IN SUBSTANCE 2026-08-21; WORDING RATIFIED 2026-08-31** — put to Michael in plain language (§1.6) and ruled *"Ratify that as the rule's wording."* **The `form-engine.md` connective amendment (§2 step 2, §3, the §9 header, §10) is therefore UNBLOCKED and rides the 2026-08-31 packet as a work order.** Priority NOW. |
| — | **CD-14** (new) | Add an individual-renders-care-at-organization edge type (name provisional: `renders-care-at`) to the controlled `contact_edges` vocabulary, case-scoped or world-fact. Adding an edge type is a spec-level act (CD-1 §5; cf. CD-7/CD-8, which forbid Code "fixing" the vocabulary). **CD-14 carries TWO limbs.** (i) does the SAME edge carry the verification state R6 needs, or does verification live on the IN-2 fact row that asserts the affiliation? — **still open.** (ii) **RULED 2026-08-31: `renders-care-at` DOES carry an EFFECTIVE PERIOD** — from and to, blank meaning current. Michael: *"yes,"* on the recommendation that affiliation history is periods and a physician who moved facilities needs the facility current at the dates of treatment. **The spec act on `contact-directory.md` §5 — the edge type and its period — rides the 2026-08-31 packet as a work order.** |
| R16 | **FE-19** (new) | **REDEFINED 2026-08-21/22 — this row's 2026-08-20 disposition described a render-blocking lint over the designee VALUE at the ship gate. It is now a check on provider RECORDS that never blocks.** Spec at §6. Priority NOW. |
| R1 + R5 | **FE-20** (new) | **NARROWED 2026-08-22.** Its 2026-08-20 disposition made role-keyed sentence slots the composition engine, with `form-engine.md` §9's twelve as the seed of the slot library. **Widget B was ruled the other way: the twelve are VOICE EXAMPLES and the model composes over a floor (§11, §12).** What survives of FE-20 is real and smaller: **grammatical inflection driven by designee count** (R10, ND-8 — now load-bearing, §15.4), the role→shape selection (§13), and the app's structured fallback. **FE-20 is no longer the thing that writes the paragraphs.** *This row's `RC-1` lean is RESOLVED 2026-08-31: the floor IS fixed text the app places, so **FE-20 regains a text-producing role for exactly the fixed sentences** — the basis and causation sentences of §11.8's table, in singular and plural, selected by provider type — and for nothing else. The writer composes the rest (§11.6).* |
| R2 + R12 | **FE-21** (new) | **NARROWED 2026-08-21.** The instrument as an assembly of bound response objects — one per 194.2(b) subsection and per 195.5 designation — each carrying data source and fill state. **The SUPPLEMENTATION-AS-DIFF half is superseded:** supplementation is purely ADDITIVE (§16.3), and the most recent saved disclosures document is the source of truth, so there is no diff of objects against a served snapshot and no served/not-served ledger. Cross-links: FE-6, FE-15 (posture, disclosures half BUILT in FE-D1), IN-4 (lifecycle), FE-8 (retention half BUILT; **diff half stays DEFERRED — see the R13 row**). Priority NOW (R2). |
| R3 | **extend FE-11, no new ID** | FE-11 is "compare a document to the ROSTER" (OUT of FE-D1, discovery slice; the `#63` disposition says in terms that FE-D1's lint does not absorb it). R3's ordering lint across the three provider renderings is the same class applied to the provider set. The canonical ORDER is Q4 — **partly ruled 2026-08-21, see §8.** |
| R6 | **extend IN-2, no new ID** | IN-2's ruled home (`contact-directory.md` §7) is the case-scoped fact row `{fact_id, value, source_document, source_field, extraction_method, verified_by_attorney}`; the provider→facility attribution is such a fact, and **`contact-directory.md` §12.7** already rules every machine-generated attribution UNVERIFIED until the attorney confirms it. *(That is CD-1's §12.7 — this file has no §12.7.)* **R6 MATTERS MORE UNDER THE 2026-08-22 RULINGS, NOT LESS:** the model now extracts individuals and their facility attributions from the chronology (§14, §15), and Michael's own standing caution is that his chronology vendor has already attributed a treating physician to a facility where he does not practice. Nothing built; IN-2's fact table does not exist. |
| R7 | **FE-22** (new) | Charge-weighted designation-gap detection: a custodian-only designation whose facility's charges rank high or exceed a share of past medicals raises a persistent GAP flag. **Its SURFACE moved 2026-08-21:** the disclosures panel is deliberately THIN — providers and a selection control, not a data display (§17.2) — so a charge-weighted display in the form builder is against that ruling unless it rides the ambient missing-information line (§6). Trigger is Q5, still open. Priority SOON. |
| R8 | **satisfied by construction — CONFIRM, no ID** | FE-D1 seeds the instrument and each `form-engine.md` §9 variant as SEPARATE `form_templates` rows, each with its own `form_template_versions` chain (23 templates). Preamble and per-provider paragraph are therefore separately versioned today. Carried to the verification list for the next Code session to confirm **by reading the seed**, not asserted from the spec alone. |
| R9 | **existing — §5 gate 3 + spec-feedback finding 7; no ID** | The retained/non-retained switch is specced and BUILT as data on the expert record. **Finding 7's reading — "retained/non-retained is DATA, not gate STATE" — RULED 2026-08-31 with ND-6: Michael, *"adopt both."*** The retained FIELD list is TRCP 195.5(a)(3)–(4) as restated in the playbook E2 row, UNVERIFIED; **Q6 RULED 2026-08-31 (§8): the fields are specced now from the rule text as a checklist, the retained paragraph waits for his capture.** The retained-expert track was ruled NEEDS BUILD (small) 2026-08-21 — see §7. |
| R10 | **extend FE-20; no ID** | The grammar/pronoun engine is BUILT in FE-D1 (inflection from party counts). R10 adds DESIGNEE COUNT as a flex source. **ELEVATED 2026-08-22 and SETTLED 2026-08-31:** one paragraph per FACILITY covering its individuals collectively (§15.3) makes number agreement load-bearing — and `RC-3` CLOSED on Michael's *"That is the collective form"*: **the fixed sentences take their PLURAL-TOKEN form for a same-type group** (§15.3). |
| R11 | **extend DL-INPUT / the deadline-engine spec; no ID — and GATED** | `form-engine.md` §2 item 7 specs the in-flow 195.2 deadline; the FE-D1 build computed NOTHING (spec-feedback finding 8) because CLAUDE.md registry rule 1 bars an UNVERIFIED proposition from driving a computed legal outcome, and **TRCP 195.2 has no registry entry** (only the playbook E1 row, which carries the 90/60-vs-60/90 conflict flag). A "proposal for confirmation" is still a computed date. **R11 IS GATED ON MICHAEL VERIFYING TRCP 195.2 — his act, and still the cheapest unblock in this capture. NOTHING IN THIS FILE COMPUTES, DISPLAYS OR PROPOSES A DESIGNATION DEADLINE.** Keyed to end-of-discovery-period: FE-5's prerequisite "no discovery-level field on `cases`" is the same missing substrate. **`HD-10` CLOSED 2026-08-31 by pointing at the two register rows that already carry the verification act (§18.E) — Michael: *"Close it by pointing at them."* No new registry item.** |
| R13 | **RETIRED 2026-08-22 — no ID, no consumer** | *This row's 2026-08-20 disposition recommended UN-DEFERRING FE-8's diff half, on the ground that R13 was its first real consumer.* **Ruled the opposite way (`#135`, 5.3): R13 goes away.** Michael on the review gate: *"I don't know how the software is gonna know that I only read six of them because isn't the software just gonna produce the Word document and generate it, and then I'm gonna download it?"* — and on per-paragraph checkboxes: **"No. I don't want the busy work."** There is no reading detector, and the gate presumed a per-paragraph review-state control nobody had ruled he wanted. **FE-8's diff half STAYS DEFERRED. RECON-1 is not its consumer after all.** Widget F was **dissolved, not answered.** Part 3 decision rule 10 — *"Every generated paragraph is a draft until I read it"* — **is Michael's and stands as a drafting posture; what is retired is the machinery that tried to enforce it.** |
| R14 | **SATISFIED BY CONSTRUCTION by CD-1 — no ID** | A facility is a `parties` row (`kind = 'organization'`), firm-wide, editable in case context with a linked-case count, read live by the pointer model. "Populated outside the chronology and reused across matters" is the directory's definition. **BUT SEE §17.1: a requirement no R-number covered was ruled 2026-08-21 — the PROVIDER RECORD. R14 does not contain it. IT IS NOW `R17` (below).** |
| — | **`R17`** — **MINTED 2026-08-31** | **THE PROVIDER RECORD.** Facility **with its TYPE** (set by Michael's hand on the Medical tab); the individuals under it, each with a **ROLE MARKER defaulting to the facility's type**; dates of treatment; **one expandable summary per individual**; sortable, **oldest treatment first**. Michael's 2026-08-21 specification (§17.1) plus the two fields the 2026-08-31 rulings added (§17.1a). Put with the proposed string and ruled *"use that"* — **`RC-2` CLOSED; B4's second sense discharged.** The 2026-08-20 sense of widget G (this table's other IDs) is still untaken. |

## §4 — The never-do rules (Part 8 item 4) — **REWRITTEN 2026-08-25 at ND-3 and ND-8; REWRITTEN 2026-08-31 at ND-4–ND-9 (`RC-9` walked and CLOSED)**

**Recorded as Michael's rulings of record (origin CIVIL LIT; relayed 2026-08-20; first appearance on this project's record):** ND-1 individuals are designated, never facilities or businesses; ND-2 the facility appears only as the individual's affiliation, never as the subject of the designation; ND-3 no two providers share one stock paragraph. **ND-1 and ND-2 were expressly RECONCILED against the 2026-08-22 facility-selection ruling and they HOLD — see §15.2. They are not re-ruled and should not be.**

**ND-3 — REWRITTEN. Its lint is REMOVED and its unit is re-based.**
*Its 2026-08-20 treatment restated ND-3 under Q7 as a derivation rule enforced by a lint that fires when a paragraph is rendered without consuming available evidence.* **Ruled 2026-08-22 (`#135`, 5.2): the near-identical-paragraph lint is REMOVED.** Michael: **"Sure."** The reason is structural — if wording varies freely over a floor (§11) and the model draws register from a shared example corpus (§11.7), **two similar paragraphs are not a defect.** And, from 6.6: **ND-3 must be RE-READ, because "no two providers share one stock paragraph" was written when the unit was the PERSON, and the unit is now the FACILITY.** ND-3 survives as **Michael's rule against stock paragraphs**; what is gone is the machine test that was proposed to enforce it, and the unit it was written about. **The re-based operative form is not drafted here — that is a text act on one of his own never-do rules and is his.**

| Rule | Enforceable how | Status — **all five walked 2026-08-31, one at a time, each with its recommendation and its check-vs-judgment classification put in plain language** |
|---|---|---|
| **ND-4** person-role fallback, never the entity | **CHECK on the record** — FE-19 signal 1 (directory `kind`), plus the person-role form (`form-engine.md` §9.11) as the only lawful fallback output | **ADOPTED 2026-08-31 — Michael: *"adopt it."*** A selected facility with no individual the model can name designates *"The Custodian of Records for [facility]"* — a person role — never the facility itself. **Under §11.6 that paragraph is the WRITER's, with the four-limb custodian sentence (§11.4) as its required content and §9.11 as the voice example.** The person-role wording is Michael's own approved, served work — the strongest available basis, and NOT rule-derived. |
| **ND-5** no opinion the provider's records do not support | **JUDGMENT — a WRITER instruction** — no examination sentence where none is recorded; no diagnosis clause where the records name none. A check can prove a paragraph had no evidence; it cannot prove an opinion is unsupported. | **ADOPTED 2026-08-31 in the form put — Michael: *"adopt it."*** It governs the WRITER's parts only. **The FIXED SENTENCES ARE EXEMPT BY DESIGN:** they are placed by provider type regardless of the records — the pain/ortho/neuro/primary-care basis sentence says *"review of the medical records and diagnostic imaging"* in every such paragraph whether or not that provider reviewed imaging. That is what his own §9.5–§9.8 already do; fixed text makes it unconditional. **The consequence was stated to him before he answered.** Every paragraph stays a draft (Part 3 rule 10). |
| **ND-6** retained fields never on a non-retained paragraph | **BY CONSTRUCTION** — retained fields render only under the retained flag | **ADOPTED 2026-08-31, AND spec-feedback finding 7 WITH IT — Michael: *"adopt both."*** Retained/non-retained is DATA on the expert record, not wizard gate STATE. |
| **ND-7** every charges-table provider appears in every rendering, same order | **CHECK** — FE-11 extension (R3); set-equality is mechanical; order is now ruled | **(a) the set check ADOPTED — *"adopt."* (b) ORDER RULED — *"oldest first is the rule"*: ONE order, oldest treatment first, for all three renderings (charges table, interview cards / designation blocks, provider list), and NO per-matter override — Q4's order limb CLOSES (§8). (c) the POSTURE on a mismatch — a charges-table provider with no designation paragraph: warn or stop? — HELD FOR HANDS-ON at Michael's own doubt about the premise: *"Im not sure when this will become an issue. There is always a provider with a facility."* Build default while held: a PANEL LINE, never a stop, marked PROVISIONAL (§18.F).** |
| **ND-8** number agreement across the block | **ENGINE INVARIANT — LOAD-BEARING (2026-08-22, 6.6)** | **One paragraph per facility covering its individuals collectively means the floor's own sentences must work PLURAL — and they do: `RC-3` CLOSED 2026-08-31 on the plural-token form (§15.3).** |
| **ND-9** study date never rendered as incident date, and vice versa | **BY CONSTRUCTION for the incident date; WRITER instruction for the study date** — the fixed causation sentence's date binds only to the matter record; the writer is told never to describe an imaging study's date as the incident date or vice versa; **no value-equality flag** | **ADOPTED 2026-08-31 on Michael's stated condition, which the form satisfies by design — his words: *"Imaging could be conducted, and many times is when there is ER treatment. If your proposal works with that, adopt."*** The value-equality info flag was dropped precisely because same-day ER imaging is routine; nothing fires on a same-day scan; the writer may describe imaging performed that day freely. Nothing reads the writer's prose (§6). *(Hard stop 2's old "compare the causation line's date against the matter record" has no work left to do — under §11.6 the app FILLS that date from the matter record; see §12.3.)* |

## §5 — Ruling widgets — **REWRITTEN 2026-08-25: STATUS OF EACH**

*This section's 2026-08-20 text put eight widgets, A–H, as the acts belonging to Michael. Six have since been taken and two of those were **dissolved rather than answered**. The widget text itself is now historical and is replaced by its disposition, so that a later sitting does not re-put a ruled question.*

| Widget | 2026-08-20 subject | Disposition |
|---|---|---|
| **A** | FE-18's wording (§1.6) — adopt / reject / edit | **ADOPTED IN SUBSTANCE 2026-08-21; WORDING RATIFIED 2026-08-31** — *"Ratify that as the rule's wording."* `RC-8` CLOSED (§1.6). |
| **B** | FE-20 vs `form-engine.md` §9's verbatim unit | **RULED 2026-08-22: the twelve become VOICE EXAMPLES** (§11.7). Neither offered option — the answer was outside the set. |
| **C** | The schema rename | **RULED IN 2026-08-21** (§2). The recommendation offered here was REJECTED. |
| **D** | `form-engine.md` §9.10 Pharmacy under ND-1 | **DISSOLVED 2026-08-22, not answered** (§1.5, §13 shape 4). The premise did not hold. |
| **E** | ND-4–ND-9 | **DISCHARGED 2026-08-31** — ND-4, ND-5, ND-6, ND-7(a)(b) and ND-9 ADOPTED one at a time; ND-7(c) HELD for hands-on; ND-8 settled with `RC-3` (§4). `RC-9` CLOSED. *(The 2026-08-22 sitting had already produced the three engine HARD STOPS, §12.)* |
| **F** | R13's hard gate | **DISSOLVED 2026-08-22, not answered** — R13 RETIRED (§3, R13 row). The premise did not hold. |
| **G** | *This file's 2026-08-20 text: "The IDs in §3 — item by item or as a group."* | **TWO ACTS UNDER ONE LETTER, and one of them is now taken.** The 2026-08-22 sense — minting the provider record's ID — **DONE 2026-08-31: `R17`** (§3, §17.1); `RC-2` CLOSED. **The 2026-08-20 sense — minting §3's other IDs, item by item or as a group — is STILL UNTAKEN** and is put with the 2026-08-31 packet. |
| **H** | Q1–Q10 | **DISCHARGED 2026-08-31** — Q2 by consequence; Q3, Q6, Q8 ruled; Q4's order limb closed under ND-7; Q5 and Q10 HELD for hands-on by name (§8, §18.F). `RC-10` CLOSED. |

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

> **THE TENSION INSIDE `HD-1` — his *"we need to fix this before we generate the disclosures document"* against a panel that never blocks — was surfaced by the first fold-in and RESOLVED on 2026-08-31 (B1, §12.3).** The panel's three lines — address, phone, treating physician — **flag and never block, exactly as ruled here.** The sentence *"we need to fix this before we generate"* turned out to describe a DIFFERENT class: the conditions the app cannot build a paragraph without, which **STOP the generate and tell him what to fix first.** The panel is the lowest of three tiers; §12.3 carries the ruling and his words.

### §6.2 — What the check does, restated for the new object

| Signal | On a PROVIDER RECORD | Verdict |
|---|---|---|
| 1. Resolution | the designee resolves to a `parties` row of `kind = 'organization'` | **FLAG in the panel** — the missing-treating-physician line. **Michael's own phrasing for it, verbatim from the `HD-1` ruling reproduced at §6.1, is *"Or this provider we're missing the actual treating physician."*** Never a block. |
| 1b. Person-role designee | the `form-engine.md` §9.11 person-role form, resolving to its facility for the AFFILIATION and carrying no designee row | pass, and raise the GAP flag (FE-22 decides its weight) |
| 2. Corporate form in the name | PLLC, LLC, Inc., P.C., P.A., L.L.P., Ltd. | **WARN, NEVER BLOCK — `HD-22`, RULED 2026-08-21** (§6.3) |
| 3. Facility nouns | Hospital, Clinic, Center, Institute, Imaging, Associates, Group, Practice, Specialists, Health | WARN — a backstop, never a rule |
| 4. Personal-name shape / credential suffix | — | **weak corroboration only.** Never sufficient to raise a flag; never sufficient to clear one. The approved document contains a named individual carrying no credential. |
| 5. Affiliation verification (R6) | the `renders-care-at` edge / IN-2 fact behind the contact block is `verified_by_attorney = false` | **RULED OUT 2026-08-31 late (`AS-Q13a`) — NOT BUILT until `CD-14` limb (i) is ruled.** The 2026-08-21 design was WARN, **named** ("affiliation unverified"), never silent; that design stands as written and is not the build's scope. **PROVENANCE (model / hand) is recorded on every extracted individual FROM BIRTH (§17.1a), so the line can be lit later with no backfill.** |

**Missing address, missing phone and missing treating physician are lines in the same panel** — Michael named all three himself.

### §6.3 — `HD-22`: the practice-name check WARNS and never blocks (RULED 2026-08-21)

The defect this closes was found by reasoning, not by law: as originally specced, corporate form **BLOCKED even if signal 1 passed**, and a solo treating physician practising as "John Johnson, M.D., P.A." is an individual whose own name carries the suffix. Michael:

> *"It should warn me, but let me go ahead, because every now and then there's a provider who — their company name, the entity he operates under, is just him. And whenever you write a check out to him, the check just goes to John Johnson MD. So there's that. I wouldn't want this system to get hung up and completely reject or block my efforts to use John Johnson entity as the facility name."*

**The check flags, Michael reads, Michael proceeds. The reasoning is the durable part.**

### §6.4 — What this section's rewrite DELETED, named so nobody rebuilds it

The **BLOCK branch and its dismissal-memory rule are gone** — there is no block to dismiss. **The four string heuristics no longer run over drafted text at all.** The two lawful resolutions — supply the individual, or degrade to the person-role — **survive as panel CONTENT and as ND-4, not as gate offers.** The invariants the old spec promised not to break are preserved trivially: **a check that never writes into the document cannot violate "gates never write into the document."**

> **ONE THING THE 2026-08-21 RULING DID NOT REACH — whether "nothing lints the drafted text" covers template-rendered, non-model output — DISSOLVED on 2026-08-31 (B9).** Under §11.6 the only template-rendered text in a paragraph is the app's own fixed sentences, and those are DATA the app places, not drafted text: there is nothing for a lint to read and none is proposed. The no-lint rule's object is the writer's prose, and only that. *(Stated to Michael as a consequence with a stop-me line; not objected.)*

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

## §8 — Q1–Q10 — **REWRITTEN 2026-08-25 at Q1, Q4, Q5, Q7, Q9 and Q10; REWRITTEN 2026-08-31 at Q1, Q2, Q3, Q4, Q5, Q6, Q8 and Q10 (`RC-10` CLOSED)**

**Q1 — REWRITTEN TWICE. SUPERSEDED 2026-08-22, then ANSWERED 2026-08-31.** *Its 2026-08-20 answer put model-drafted prose into a reviewable draft object inside the module and confined that prose to named nullable slots, diffable and testable.* The 2026-08-22 rulings dissolved that: the model composes over a verbatim floor, variation is free, and the app makes the call itself (§16). **`RC-1` then decided what a paragraph IS, on 2026-08-31 (§11.6): the app places the FIXED SENTENCES — versioned template data, selected by provider type (§11.8) — and ASSEMBLES the paragraph from the WRITER's returned PARTS, in a ruled four-slot order.** So the versioned-and-diffable property survives for exactly the fixed sentences, and the writer's parts are prose the app never inspects. The schema shape of a paragraph is an ORDERED SEQUENCE OF SLOTS, each FIXED or WRITER. A build slice reads §11.6–§11.8 and §15.6 for it.

**Q2 → ANSWERED BY CONSEQUENCE 2026-08-31 (stated to Michael with a stop-me line; not objected).** The chronology is a **VERSIONED IMPORTED ARTIFACT** — provenance is the drop (§14.1, `RC-7`) — sent WHOLE to the model (§16.2). **The only data derived from it is the individual NAMES the model extracts, attached to the facilities Michael selected (§15.1, §17.1a).** No field-mapping layer; **a prose-PARSING layer stays barred** (2026-08-22). Identities still go to the directory; the IN-2 fact table remains the ruled home for attribution facts with provenance (R6) and is unbuilt. No build authorized by this answer.

**Q3 → RULED 2026-08-31 — Michael: *"Adopt."*** Custodian-only designations are a **separate records-predicate track keyed to the FACILITY, rendered INSIDE the 195.5 block by default** — his approved, served practice; **the § 18.001 affidavit tracker is a separate banked item, not this module.** Whether a matter renders them separately remains a rendering choice on FE-21's object, not a data-model fork. **§ 18.001 IS FLAGGED HERE, AT THE POINT OF USE, AND NOT ONLY IN §9:** no verified registry entry exists; its text was pulled 2026-07-26; it sits in the medical-billing DRAFT file and the FC-13 drafts, and it carries `RC-4`'s independent flag (§13 shape 4). Nothing here relies on the drafting project's treatise reading.

**Q4 — CLOSED 2026-08-31.** The order: **RULED 2026-08-21 (`HD-21(a)`) for the disclosures-screen list — OLDEST TREATMENT FIRST, "That sounds good"** — and **generalized 2026-08-31 under ND-7(b) to ALL THREE RENDERINGS, with NO per-matter override — Michael: *"oldest first is the rule."*** The Medical tab's own list follows it too — `HD-21-med`, *"Yes, same order there"* (§17.2). The mismatch posture — a charges-table provider with no designation paragraph — is ND-7(c), **HELD FOR HANDS-ON** at his own doubt about the premise (§4). Charge-descending remains a useful SORT for the gap flag, not a canonical order.

**Q5 — HELD FOR HANDS-ON 2026-08-31, by name.** Trigger — absolute dollar, percentage, rank, or attorney-set — is a *"what feels right in use"* question of the same family as ND-7(c); Michael: *"Confirm the hold."* Its surface is settled: **the disclosures panel is deliberately THIN (`HD-21(c)`, §17.2)**, so a charge-weighted display in the form builder is against that ruling and **the available home is the ambient missing-information line (§6.1).** Persistent state on the FE-21 object, not a transient notice, survives. On the CC-1 hands-on queue (§18.F).

**Q6 → RULED 2026-08-31 — Michael: *"Adopt."*** The retained-expert **FIELDS are specced now from the rule text** — 195.5(a)(3)–(4) as restated in the playbook E2 row, UNVERIFIED, driving a checklist and no computed outcome. **The retained PARAGRAPH waits for a real, client-clean retained-expert capture from a matter where he designated a life-care planner or an economist — his hand, through CIVIL LIT under REQ-1.** The retained TRACK's build shape was ruled 2026-08-21 and is small (§7).

**Q7 — REWRITTEN. The lint is gone.** *Its 2026-08-20 answer restated ND-3 as a derivation rule enforced by a lint firing when a paragraph was rendered without consuming available evidence, with proposed operative wording.* **Ruled 2026-08-22 (5.2): removed.** Michael: **"Sure."** See §4, ND-3. The proposed wording is withdrawn with it — **re-basing ND-3 is a text act on Michael's own never-do rule and is his.**

**Q8 → CONFIRMED 2026-08-31 — Michael, who authored the master: *"Combined form is the house standard."*** One served instrument — 194.2(b) and 195.5 with the expert block between subsections (5) and (6) — with FE-21's objects keeping the halves renderable separately, so a per-matter split is a later ruling and not a rebuild.

**Q9 — REWRITTEN. See §1.2.** Correct about what exists at HEAD; superseded as scope. The chronology IS the input and the model extracts the individuals from it.

**Q10 — HELD FOR HANDS-ON 2026-08-31, by name.** *Its 2026-08-20 answer was BLOCK above the FE-22 threshold, AUTOMATIC below it.* The BLOCK limb cannot stand beside §6 and is withdrawn; the AUTOMATIC limb and the persisted GAP flag survive. **For the PHARMACY (§13) custodian-only is the DESIGNED shape — "this is its whole content" — not a degradation and not a gap;** Part 3 rule 9's "custodian-only is a fallback, not a choice" governs genuinely unresolvable individuals and does not reach the pharmacy. **The threshold itself is held with Q5 and ND-7(c) — the same family — on Michael's *"Confirm the hold."*** On the CC-1 hands-on queue (§18.F).

## §9 — Part 7 against the registry (what exists, what does not)

Read at HEAD across the four registry files and the playbooks. **Entries EXIST for:** TRCP 193.5 (carrier-duties file, VERIFIED), TRCP 194.5 (enforcement file, VERIFIED 2026-08-18), TRCP 194.2(b)(9) (VERIFIED), TRCP 194 initial disclosures (VERIFIED, span flag resolved). **NO registry entry exists for:** TRCP 195.5 (any limb), 195.2 (playbook E1 row only, **with the 90/60-vs-60/90 conflict flag — and that flag must ride the number at every point of use, not live only in this census**), 195.1, 193.6 (playbook E3 only), 192.3(c) / *Axelson*, *Baylor Medical Plaza v. Kidd* (playbook only), TRE 902(10), TRCP 190.3(b)(1)(A). § 18.001 / § 41.0105 / *Haygood* sit in the medical-billing DRAFT file (all DRAFT) and the FC-13 drafts (UNVERIFIED, not inserted).

> **ADDED 2026-08-25 — ONE NEW REGISTRY CANDIDATE, RECORDED AND NOT DRAFTED.** On 2026-08-22 Michael named **"CPRC eighteen dot zero zero one"** as the predicate for the pharmacy shape's reasonable-and-necessary testimony (§13, shape 4). **RECORDED, UNVERIFIED. Claude asserted no cite and confirmed none.** It is a registry CANDIDATE and **does not become a proposition here.** Carried as `RC-4`. **Note it is the same statute Part 7 already flags, reached by a different route — one home, not two.**
>
> **AND THE DEADLINE AUTHORITY LIST IS INCOMPLETE FOR WHAT R11 WOULD COMPUTE.** Part 7 cites TRCP 190.3(b)(1)(A) only — the Level 2 period — while the design contemplates a DCO override, and Level 1 and Level 3 periods end by a different instrument. **An incompleteness flag, not a legal opinion.** R11 is gated regardless.
>
> **AND ONE NEVER-DO CLASS RESTS ON AUTHORITY THAT APPEARS NOWHERE.** Part 3 decision rule 3 — *"No diagnosis language, and no 'medical knowledge', outside licensure scope"* — depends on Texas scope-of-practice law absent from Part 7's list. **Either it joins the list or the rule drops to drafting judgment. Flagged, not decided.**

**Nothing is drafted here** — drafting entries is its own act (the FC-13 precedent), and PF-1 would run on that packet. Every proposition in Part 7 stays UNVERIFIED; **no validation logic anywhere in this file computes from any of them.** FE-19 is a data-kind check, not a legal one; hard stop 2 (§12) compares a date against the matter record, not against a rule.

**ROUTE-C:** no divergence between a registry proposition and operative text was found by either fold-in, because **no primary source was retrieved and none was asked for.** No conforming wording is drafted and no cite change is proposed. **Retrieval is not verification and neither is this file. Only Michael verifies.**

## §10 — What goes to Code and what stays design-side — **REWRITTEN 2026-08-25, 2026-08-31 and 2026-09-01**

**TO CODE (the 2026-09-01 packet — DOCS-ONLY, NO BUILD AUTHORIZATION — the THIRD FOLD-IN):** **this file, REPLACED WHOLE at its canonical path (third edition)**, with the `PARTS 1–8` region asserted byte-identical on both sides of the run (21,838 B / sha256 `eaeec76b…`) as a runner STOP; the session-log entry; **four `AS`-driven conforming work orders, exact-string** — `form-engine.md` §3's provider-block sentence (the `AS-Q7c` custodian literals and the `AS-Q3` block-reads-the-SELECTION reading, **FE-18's ratified sentence NOT edited**), `form-engine.md` §10's `R17` bullet (the `AS-Q2` extraction contract replacing *"populates NAMES and nothing else"*, and the FIFTEEN-value vocabulary of `AS-Q5`), `form-engine.md` §10's designee-slot bullet (the `AS-Q11` frozen `renders-care-at` CHECK with `effective_from`/`effective_to`), and `contact-directory.md` §5 items 2 and 4 (the same freeze and its column literals); and **`docs/prompts/CHAT-DISPATCH-v5.md`, NEW**, so the dispatch that produced this fold is in the record. **`form-engine.md` §9 is asserted BYTE-IDENTICAL by the same packet — the approved variant library is not touched.** **No queue row is closed, annotated or reworded by this packet; the only queue changes are the NEW rows the runner mints from its open-item list (QR-1) and the Status-header reconcile sentence (QR-6(b)).**

*The 2026-08-31 packet's own routing, kept because it is what put this file at HEAD in its second edition:* this file, **REPLACED WHOLE at its canonical path** (second fold-in); the session-log entry; **three work orders now UNBLOCKED by ratification or ruling** — the `form-engine.md` amendments (§9.4's causation sentence and note, by Michael's ruling; the FE-18 connective amendments at §2 step 2, §3, the §9 header and §10, wording ratified; *"provider contact block"* → *"provider block"*, `HD-17`/B10), the `contact-directory.md` §5 act (CD-14: the `renders-care-at` edge type and its effective period), and a SPENT banner on `docs/prompts/PROMPT-rc1-voice-the-form-of-the-floor.md`; the `RECON-1` queue-row closure on the record's own evidence (`#138`, batch 83); and the Status-header reconcile sentence. **No queue row is minted for anything ruled tonight — a filed log entry is a ruling's home (2026-08-22).**

**NOT IN THAT PACKET, and each for its own reason:** **any `src/` change whatever** — the rename slice, the provider record (`R17`), the fixed-sentence table as data, the parts-return contract and the model call are a FE-D1 amendment slice on the CD-1/FE-D1 pattern, its own authorization, and the queue runner is BARRED from it; any registry entry (drafting entries is its own act — the FC-13 precedent — and PF-1 runs on that packet); any `SKILL.md` v3 line; **the FE-D1 migration, which is Michael's hand and unrun (`HD-18`, `MIG-1`)**; and the §3 sixteen-ID minting act, which is his and is put with the packet rather than executed by it.

**STAYS DESIGN-SIDE:** every open item at §18; the master-skeleton hand-in (§0.2, `RF-2`); **the TRCP 195.2 verification, which is R11's gate and Michael's act**; the retained-expert capture (Q6); `SKILL.md` v3; the five hands-on items and the CC-1 hands-on sitting they wait for (§18.F).

**NOTHING IN THIS FILE AUTHORIZES A BUILD.** It records requirements and rulings. One ID in §3 is minted (`R17`); the rest are PROPOSED.

---

# §11–§19 — THE RULINGS TAKEN AFTER THIS ADDENDUM WAS AUTHORED

*Written 2026-08-25 (Opus 5, Cowork, typed, bridge granted) and REWRITTEN 2026-08-31 (Fable 5, Cowork, typed, bridge granted — the session's model is recorded from the environment, which reported `claude-fable-5` after Michael's switch; a session-configuration line in the same context still read `claude-opus-5`, and the discrepancy is recorded rather than resolved by inference). These sections carry rulings of **2026-08-21** (FOUR sittings: a voice walkthrough, a typed fold-in, and two further voice sittings), **2026-08-22** (RECON-1's first substantive ruling sitting, fourteen rulings put one at a time), **2026-08-31** (the `RC-1` sitting: twenty-one ruling exchanges (some forty-nine discrete rulings) put one at a time, typed, on the file at HEAD) and **2026-08-31 LATE** (the amendment-slice sitting: thirteen ruling exchanges, EIGHTEEN discrete rulings `AS-Q1`–`AS-Q13b`, every one a SELECTION — folded in on 2026-09-01 by an Opus 5 typed session, bridge granted; §18.A1 says where each landed). **They are not a second account of §§1–10 — they are the content §§1–10 has no section for.** Where they bear on a rewritten section above, that section names them.*

**Michael's words are quoted verbatim throughout, because the wording is the ruling.** Where a sentence is Claude's restatement or inference rather than his, **it is marked as such in place.** Six such guards were flagged at capture time and survive at §11.3, §13.3, §14.2, §14.5, §15.5 and §17.4; the first fold-in added two at §13.5 and §17.2; **the 2026-08-31 rewrite adds guards wherever a ruling was his SELECTION of a description Claude wrote** — §11.6 (the two-way description he chose "Option 1" from), §15.6 (the rider examples), §17.1a (the type mechanism, a Claude proposal adopted in terms) — **because a ruling made by choosing among Claude's words is his ruling, but the words around it are not his and must not be quoted as such.**

**THE THIRD FOLD-IN (2026-09-01) ADDS GUARDS AT THE SECTIONS LISTED HERE, AND THIS LIST ENUMERATES RATHER THAN CERTIFIES** — §11.4 (`AS-Q7c`, a Claude drawing), §11.6 (`AS-Q7a`/`AS-Q7b`, Claude renderings; and the `AS-Q8b` LEAD's mechanics), §11.9 (`AS-Q5`, three Claude type descriptions), §11.10 (`AS-Q9`, whose option DESCRIPTION carried a gloss that is Claude's), §13.6 (`AS-Q7a`'s split), §14.1 (`AS-Q4`, four Claude storage options), §15.6 (`AS-Q8c`, a Claude rendering of his own §9.12), §15.7 (`AS-Q10`'s mechanics — the same guard covers §14.6's half), §16.1a (`AS-Q1`), §16.5 (`AS-Q6`), §17.1 (`AS-Q3`), §17.1a (`AS-Q2`), §17.3 (`AS-Q11`) and §17.9 (`AS-Q12(e)`). **In every one the SELECTION is Michael's and the surrounding sentences are Claude's.**

**AND THE SECTIONS THAT CARRY `AS`-DERIVED TEXT WITHOUT A GUARD OF THEIR OWN ARE NAMED HERE RATHER THAN LEFT TO BE FOUND** — §6.2 signal 5, §11.8's added rows and its four-fixed-texts table, §12.3's two new paragraphs, §13.4, §13's shape-4 row, §11.6's future-care note, and §18.F's fourteen-item table. **Every one of them is Claude's drafting over a ruling whose selection is quoted in place**, and each says so locally by naming the `AS-Qnn` it carries; they take no separate guard because the ruled words and the Claude words are not adjacent in them. *Recorded because an earlier draft of this passage claimed "one guard for every ruling, WITHOUT EXCEPTION" and the file did not meet the claim — a self-certification a later reader would have used to stop checking. Corrected before shipping; the correction is the point.*

**A QUOTING CONVENTION, DISCLOSED RATHER THAN LEFT TO BE DISCOVERED (2026-09-01).** `docs/specs/fe-d1-amendment-slice.md` §2 quotes each selection **as Michael picked it from an option list, INCLUDING the trailing label "(Recommended)" that Claude attached to the option.** **This file quotes the selection WITHOUT that label and with sentence-final punctuation normalised** — the label is Claude's word, not his, and reproducing it here would read as though he had typed it. **§2 carries the full string and is the governing record; where an exact byte-for-byte selection is wanted, read §2.** *Named because an undisclosed trim of a "verbatim" is exactly the drift this file's own rule exists to prevent.*

## §11 — THE FLOOR: what every designation paragraph must contain

### §11.1 — The governing rule: wording VARIES over a VERBATIM floor (RULED 2026-08-22)

> *"it's fine if they vary paragraph to paragraph so long as each one is accurate and reads well. **However, there are some lines in there that need to be in there.**"*

**This is a MANDATORY-CONTENT requirement, not a template — as ruled on 2026-08-22. On 2026-08-31 `RC-1` decided HOW the floor is delivered: the basis and causation sentences are FIXED TEXT the app places, and the prose varies around them (§11.6).** Free variation on the prose; a verbatim floor beneath it, two of whose three sentences the app itself supplies. **It is a class of engine invariant that none of the existing ND rules describes**, which is why it needed its own section rather than a row in §4.

*Recorded because it is the sixth exhibit for CC-1(a): this was a **COMPOSITE**, not a selection. The two branches offered were "predictable every time" and "free variation." He took neither and produced the thing underneath both.*

### §11.2 — MANDATORY ELEMENT 1 — BASIS OF TESTIMONY

> *"I definitely need it to say that that physician is going to testify … based on the **personal treatment of the client**, their **review of medical records**, their **personal knowledge gained from … education, training and experience and research**."*

**Three limbs, four things inside the third:**

| Limb | Required content |
|---|---|
| 1 | personal treatment of the client |
| 2 | review of the medical records |
| 3 | personal knowledge gained from **education, training, experience, and research** |

**Where it appears:** in the **paragraph** — **since 2026-08-31, as SLOT 2 of four, FIXED TEXT the app places after the writer's opening** (§11.6); its wording is the provider type's entry in §11.8.

### §11.3 — MANDATORY ELEMENT 2 — CAUSATION. This is the load-bearing one.

> *"there needs to be a statement that says that that physician is gonna testify that **the injuries that they treated the client for were within a reasonable degree of medical probability caused by the incident which occurred on [insert date]**."*

**Michael's reasoning, preserved verbatim because it is the whole point of the module:**

> *"That's the line. That gives us medical causation. … the big thing is that we need a medical expert to be able to give us causation. When we say causation, we need the expert to be able to give expert medical testimony that the injuries that my client is claiming to have sustained in the wreck were caused within a reasonable degree of medical probability … by that wreck or that fall or whatever the personal injury incident was."*

**Where it appears:** in the **paragraph** — **since 2026-08-31, as SLOT 4 of four, FIXED TEXT the app places as the LAST sentence** (§11.6); its wording is the provider type's entry in §11.8, and the date in it is filled from the matter record.

> **MARKED AS CLAUDE'S RESTATEMENT, NOT MICHAEL'S WORDS:** *"Without this sentence you have a treating physician who can describe treatment and nothing that connects it to the defendant."* That framing drew no objection at capture time. **It is not his and must not be quoted as his.**

**THE RULED WORDING IS SINGULAR — "that physician … the injuries that THEY treated" — AND §15.3 MAKES THE PARAGRAPH COLLECTIVE.** One paragraph per facility, covering its individuals together, means this sentence must work for a twelve-name hospital. **How it inflects for a group was `RC-3`, raised by the ruling that created the problem, and RULED 2026-08-31: the plural-token form of the fixed sentence — "That is the collective form" (§15.3, §11.8).** Since 2026-08-31 this sentence is also FIXED TEXT the app places (§11.6), selected by provider type (§11.8).

### §11.4 — MANDATORY ELEMENT 3 — CUSTODIAN. Two pieces, both DEFAULT ON.

> *"**Let's just make it default.**"*

| Piece | Where | Content |
|---|---|---|
| **Block line** | in the provider **BLOCK**, positioned **between the treating-provider names and the facility name** | **RULED 2026-08-31 late (`AS-Q7c`): Part 3's WRITTEN form, the "(s)" tracking the count of named individuals** — see the discharged text act below. Michael's spoken form on 2026-08-22 was *"and/or custodian of records"*; his 2026-08-31 selection resolved the two records onto Part 3's. |
| **Paragraph sentence** | in the **paragraph** — **WRITTEN AND PLACED BY THE WRITER (2026-08-31), anywhere in its parts before the causation line** | what the custodian can testify to as to those records — **all four limbs, every time (§11.6):** made and kept in the regular course of business; by persons with knowledge of the acts and events recorded; at or near the time; the charges and their reasonableness |

**Defaulting both ON is what makes them a THIRD MANDATORY ELEMENT rather than a conditional one.** That consequence was stated plainly in session and Michael did not dissent — **recorded as an undissented consequence, not as a separate ruling.**

**Provenance, in his words, recorded because the practice is inherited rather than reasoned from a rule he can currently state:**

> *"I've seen some people add custodian of records in that provider block. Actually, the first firm that I worked at, we would always put it in there. I don't know why. Maybe it's for a reason."*

**The paragraph sentence's REQUIRED CONTENT is the four limbs above, ruled 2026-08-31 (§11.6); its exact wording is the writer's each time.** What remains of `RC-4` is the UNVERIFIED cite behind the predicate — `CPRC § 18.001` (§9, §13 shape 4) — and only Michael verifies it.

*Note against the 2026-08-20 text: Part 3's CONTACT BLOCK already carried a custodian line — "And/or Custodian(s) of Records", number tracking the count of named individuals — as a **token**. The 2026-08-22 ruling makes it **unconditional** and fixes its **position**.*

**THE TEXT ACT IS DISCHARGED — RULED 2026-08-31 (late sitting), `AS-Q7c`.** The second edition recorded that Part 3's capitalised form and Michael's spoken *"and/or custodian of records"* differ and left it *"noted, not resolved — it is a text act and it is his."* **It was put to him as a drawing and ruled: *"Yes — as drawn."*** The block's custodian line is **Part 3's written form, "And/or Custodian(s) of Records", with the "(s)" following the count of named individuals — Part 3's own rule, "number tracking the count of named individuals."** Two limbs came with it:

| Case | The block's line |
|---|---|
| **nobody is named** on the block (`ND-4`'s custodian-only fallback) | the TOP line is **"Custodian of Records"** — facility, address and phone beneath it |
| a **pharmacy** | **"Pharmacist(s) and/or Custodian of Records"** — §9.10's own "(s)", his approved served wording |

> **NAMED DIVERGENCE, stated rather than silently conformed:** **`form-engine.md` §3's provider-block sentence at HEAD carried the spec's older literal `"and/or Custodian of Records"`** — the singular, lower-cased-conjunction form this ruling replaces. **Read through this section; conformed by exact-string work order in the 2026-09-01 packet (§10).** *The block TOKEN in Part 3 is Michael's verbatim and is NOT edited by anything here; what is conformed is a SPEC's DESCRIPTION of the rendering rule.*

> **MARKED — THE DRAWING WAS CLAUDE'S; THE RULING IS THE SELECTION.** The rendered block that Michael approved with *"Yes — as drawn"* was a Claude rendering of Part 3's rule, fictional in its names. **What is his is the count rule (Part 3's words), the no-name top line, and the pharmacy literal.** The literal string at **N ≥ 2** — whether "And/or Custodians of Records" is the right rendering of his "(s)" placeholder — is **NOT settled by that selection** and is carried to the hands-on sitting as a PROPOSED item (§18.F; the slice's D-64). *Do not read the drawing's own strings as his.*

*The two mechanisms stay apart, and a build must not merge them: the **BLOCK line** is the app's token, default on, positioned per this section; the **PARAGRAPH sentence** is the WRITER's, four limbs required, unguaranteed (§11.6) — **EXCEPT in the custodian-only shape, where `AS-Q7a` has the app place §9.11 WHOLE and all four limbs ARE app-guaranteed (§13.6).** That is the one shape where the APP guarantees them. **Three shapes carry NO custodian sentence at all and the four-limb instruction does not reach them: the two-slot RIDER (§15.6), MENTAL HEALTH (no paragraph is generated, §11.9), and the retained-expert paragraph (hand-typed, §8 Q6).***

### §11.5 — What is CHECKED, and what deliberately is not (RULED 2026-08-22; the check's WORK REMOVED BY CONSTRUCTION 2026-08-31)

**The DATE inside the causation line was the only checked piece. Nothing on the basis line is checked at all.**

Michael approved Claude's recommendation — *"Okay."* — on a stated reason worth preserving: the basis line is boilerplate, and if the model drops it he will see it; a phrase-match on it **"just teaches him to ignore warnings."**

**The check was a COMPARISON, not a phrase-match:** the incident date already exists on the matter record, so the app compared the rendered date against it. It was escalated from a warning to a HARD STOP the same day (§12). **Under §11.6 the comparison has nothing left to compare:** the app FILLS the causation sentence's date from the matter record itself, so the rendered date cannot disagree with it. What survives of the ruling is its posture — **the date is the one piece of the floor the app guarantees from the record** — and the one failure that remains is ABSENCE, which §12.3 makes a stop. The 2026-08-22 ruling stands as written; the 2026-08-31 structure discharged its work.

### §11.6 — `RC-1` — THE FORM OF THE FLOOR: RULED 2026-08-31. THE APP PLACES THE SENTENCES; THE WRITER WRITES AROUND THEM; THE APP ASSEMBLES.

**The question as put:** *is the floor **FIXED TEXT the engine emits**, regardless of provider — or a **REQUIRED-CONTENT CHECK** over model-composed prose?* — carried into the room with the §18.B11 caveat (the 2026-08-21 no-lint rulings, at their widest, would have foreclosed the check branch) and with the composite shape named as a way of asking, not a menu.

**Michael first asked what was being decided — *"Are we talking about the disclosure paragraphs?"* — and, told yes, the expert-designation paragraphs, one per facility, the three required sentences inside each, RULED:**

> ***"The app puts the sentences in there with the model writing the rest around them."***

**FIXED TEXT.** The check branch is gone. Three consequences follow at once and were stated to him: **B11 dissolves** — nothing ever has to look inside the writer's prose to satisfy the floor, so the 2026-08-21 rulings need no narrowing; **hard stop 1 becomes STRUCTURAL** — the causation line cannot be missing because the app is the one placing it; and **the fixed wording of each sentence became a text act of his**, discharged the same night by §11.8.

**Then the question was re-asked narrower, because "the model writing the rest around them" can be built two ways, and the two ways are different schemas.** Both were described to him — **the descriptions below are CLAUDE's words; his ruling is the selection:**

> **MARKED — CLAUDE'S TWO DESCRIPTIONS, NOT MICHAEL'S WORDS.** *(1) The model never touches the fixed sentences: it is told what they say so its prose flows into them, writes only its own pieces, and the APP assembles the paragraph by slotting the fixed sentences in — what comes back from the model is PARTS. (2) The model is handed the sentences as untouchable text, returns the whole paragraph with them embedded, and the app confirms its own sentences came back word-for-word — a match on the app's text, not a reading of the model's wording — and refuses the paragraph if they did not.*

**Michael: *"Option 1."***

**APP ASSEMBLY.** A paragraph in the schema is an **ORDERED SEQUENCE OF SLOTS, each FIXED (the app's text) or WRITER (a returned part)** — invariant-as-data, completely. **The model returns PARTS, never a paragraph** (§16.4). Nothing anywhere byte-matches or inspects model output against the floor. The writer is told what the fixed sentences say so its parts read into them.

**THE SLOT ORDER — RULED.** Derived from his own `form-engine.md` §9 skeleton — *"who they are → what they did for the client → testimony basis → testimony scope → damages elements → causation"* — in which every treating variant puts the basis sentence SECOND and the causation sentence LAST; put to him as four slots and confirmed: ***"The four slot order matches."***

| Slot | Who writes it | Content |
|---|---|---|
| **LEAD** | **APP — FIXED** | **ADDED 2026-08-31 late (`AS-Q8b`)** — bold **"{provider_name}, {credential},"** read from the provider record (`R17`), **plural for a group** (including a MIXED facility, §15.6); **never read out of the writer's text.** Michael's selection: *"App writes the bold name lead; writer continues after it."* The writer's opening continues after it, so slot 1 no longer has to name the person. **WHAT THE LEAD IS ON THE NON-TREATING SHAPES — and a build must not render an empty person token on any of them: the PHARMACY takes the bold FACILITY name (the slice's D-17, PROVISIONAL); the CUSTODIAN-ONLY paragraph's lead is §9.11's OWN bold `{facility_name}`, already inside the text the app places whole (§13.6); and the RIDER has NO lead at all — two slots, and its own fixed sentence names the mid-level (§15.6; the slice's D-41).** *The multi-name rendering — honorifics, mixed credentials — is the slice's D-21 and is a PROPOSED hands-on item (§18.F), not settled here.* |
| 1 | **WRITER** | opening — who they are, what they did for the client (for a mixed facility, what EACH one did — §15.6) — **continuing after the LEAD, which has already named them** |
| 2 | **APP — FIXED** | the BASIS sentence for the paragraph's provider type (§11.8) |
| 3 | **WRITER** | middle — what they will testify about; the damages elements; **future care and its reasonable cost live here** (see the note below) |
| 4 | **APP — FIXED** | the CAUSATION sentence for the paragraph's provider type (§11.8) — **always the LAST sentence** |

> **MARKED — the LEAD's MECHANICS are CLAUDE's; the ruling is the selection.** *"App writes the bold name lead; writer continues after it"* is Michael's, and so is *"The four slot order matches"* for slots 1–4 above. **Reading the LEAD from `R17` rather than the writer's text, the bold, the comma form, the plural, and every one of the three non-treating shapes are Claude's** — those shapes are named build defaults in the slice (D-17, D-41) and are reported as defaults taken.

**THE CUSTODIAN SENTENCE IS THE WRITER'S — WRITTEN AND PLACED BY THE MODEL, NOT THE APP.** Asked where it goes, Michael: ***"the custodian sentence can go wherever the ai writer wants to put it."*** That answer was outside the offered set and changed who writes it, so it was re-put with rendered examples (all fictional; four were shown — the four slots exploded; the app's custodian sentence at the end; the app's sentence at a writer-chosen spot; a writer-written sentence). **Michael: *"I like example 1 but we also need the custodian sentence in there like example 4."*** Example 4 was the writer-written one, shown to him with the warning that free composition drops predicate limbs. **So the app's FIXED SET is TWO sentences — basis and causation. The custodian sentence is a REQUIRED INSTRUCTION to the writer, placed anywhere within its parts before the causation line, and nothing guarantees it** (§6): a miss shows on the page, as he accepted for the basis wording on 2026-08-22. **The block line is untouched AS A MECHANISM — still the app's token, default on, positioned per §11.4 — but its LITERAL was ruled on 2026-08-31 late by `AS-Q7c`, and §11.4 governs the strings.** *(This sentence read *"the block line 'and/or Custodian of Records' is untouched"* until the third fold-in; that literal is superseded — see §11.4's table.)*

**WHAT THE WRITER IS TOLD THE CUSTODIAN SENTENCE MUST CONTAIN — RULED: *"All four limbs required every time."*** The four, from his own §9.11: (1) the records were made and kept in the regular course of business; (2) by persons with knowledge of the acts and events recorded; (3) at or near the time of the acts and events recorded; (4) the charges reflected in those records and their reasonableness. *Required of the writer by instruction; not checked by the app. The legal sufficiency of the predicate and the `CPRC § 18.001` candidate behind it are `RC-4` — his verification, unchanged.*

**TWO SHAPES WERE THEN CARVED OUT OF "THE WRITER'S," AND BOTH ARE RULED 2026-08-31 (late sitting).**

**(a) `AS-Q7a` — THE CUSTODIAN-ONLY PARAGRAPH IS THE APP'S, PLACED WHOLE.** **Michael's selection: *"Example A — app places §9.11; writer adds the care-episode clause only."*** So for that one shape the APP owns the custodian sentence and all four limbs are app-guaranteed. **The mechanism, its table and its guard are at §13.6**, which is that shape's section.

**(b) `AS-Q7b` — THE PHARMACY TAKES ALL FOUR LIMBS TOO.** **Michael's selection: *"Example C — four limbs for the pharmacy too."*** So the four-limb instruction binds a paragraph that is otherwise entirely the writer's. **The mechanism and its guard are at §13.4**, which is that shape's section.

> **MARKED — THE EXAMPLES WERE CLAUDE'S RENDERINGS, FICTIONAL; THE RULINGS ARE THE SELECTIONS.** For `AS-Q7a` four shapes were drawn and for `AS-Q7b` three. **What is Michael's is "Example A" and "Example C" and what those labels picked out.** The rendered prose around them is not his and must not be quoted as his. *Each ruling has ONE full account, in its shape's own section (§13.6, §13.4); the two paragraphs above are the short form pointing at it, which is the layering this file's own header permits.*

> **FUTURE CARE — RULED 2026-08-31 (late sitting), `AS-Q8a`; the second edition carried it as unobjected and it is now a ruling.** `form-engine.md` §9.5–§9.8 fold *"need for future medical care and its reasonable cost"* INTO the causation sentence. Put as a confirm — which sentence is the medical-probability causation line for EM, pain, ortho, neuro, PCP and chiropractic? — **Michael's selection: *"Confirm — §9.1's short form for all six; future care in the writer's middle."*** So the fixed causation sentence for all six is **§9.1's last sentence, with no future-care clause**, and future care and its reasonable cost live in the WRITER's middle. **The §11.6 future-care note is thereby a ruling**, the fixed line stays clean, and the drift test has ONE named source per type (§11.8).

**Why this settles what the first fold-in said it would.** §8's Q1 and §3's FE-20 row leaned on `RC-1` and now resolve (FE-20 regains a text-producing role for exactly the fixed sentences). `HD-20-b` is downstream and confirmed (§16.4). What the chronology extraction hands back is NAMES (§17.1a). And `RC-3`, which the 2026-08-22 one-paragraph-per-facility ruling created, becomes a question about the plural form of fixed text — closed at §15.3.

### §11.7 — WHAT COMPOSES THE PROSE OVER THE FLOOR: the twelve variants become VOICE EXAMPLES (widget B, RULED 2026-08-22)

> *"the twelve are worth keeping around as **examples of my voice** … **let the model use those and come up with one**."*

**`form-engine.md` §9's twelve approved variants are NO LONGER THE UNIT OF SEEDING and NO LONGER PRODUCE OUTPUT.** They become a **voice corpus**: samples shown to the model so it writes in Michael's register. **The model composes, and what it composes must hit the floor (§11.1–§11.4).**

**His evidence, and the capture calls it the strongest on the record because it is an experiment he already ran by hand:**

> *"I gave Claude a copy of my disclosures and said, hey, use this language and then develop paragraphs. And it took it upon itself to add in some other language, and it ended up turning out pretty good. **So my confidence in Claude in drafting these paragraphs is pretty high.**"*

**NEITHER OFFERED OPTION WAS TAKEN.** Widget B put (i) decompose the twelve into a slot library without rewording, or (ii) keep them whole and add a slot grammar alongside. **The answer was outside both** — the twelve stop producing output altogether and become reference material. CC-1(a), again.

**WHAT THIS DOES NOT DO — and the boundary matters, because it is the single largest change to the module's shape:** **`form-engine.md` §9's twelve paragraphs are NOT reworded, NOT retired, and NOT edited.** Their TEXT is Michael-approved verbatim and stays exactly as it is; **only their JOB changed.** They are kept deliberately — *"worth keeping around"* — and FE-D1 generates `variants.ts` from the spec with a drift test, which is untouched by this ruling.

**Two consequences already recorded elsewhere and named here so the chain is visible:** ND-3's near-identical-paragraph lint is **REMOVED** (§4, §8 Q7) — if register comes from a shared corpus, similarity is not evidence of a stock paragraph. And **FE-20 is no longer the thing that writes the paragraphs** (§3).

*This section is downstream of `RC-1`, and `RC-1` is now ruled: the app places the basis and causation sentences (§11.6), so **what widget B leaves to the model is the opening, the middle, and the custodian sentence** — everything in the paragraph except the two fixed lines. Widget B is undisturbed. **But §9 acquired a second job on 2026-08-31 that widget B did not give it:** its basis and causation sentences are the SOURCE TEXT of the fixed-sentence table below. As voice examples the twelve are untouched; as the source of the app's fixed sentences, §9.4 carries one edit by Michael's ruling (§11.8).*

### §11.8 — THE FIXED SENTENCES, AS DATA: two lists keyed by PROVIDER TYPE (RULED 2026-08-31)

**Fixed text forces a closed list — the app must hold every basis and causation sentence it can place and know which to place for whom.** Both lists were read out of his approved library in `form-engine.md` §9 and put to him against the four-shape ruling of 2026-08-22 (§13), which did not line up with the library. **He ruled the LIBRARY'S lists, keyed by provider type, with two edits.**

**THE CAUSATION LIST.** Put as the library's five: (1) the medical-probability line, *"the injuries treated were, within a reasonable degree of medical probability, caused by the incident"* — emergency medicine, pain management, ortho, neuro, primary care; (2) the chiropractor's *"reasonable degree of chiropractic probability"*, whose note says *"settled"*; (3) the EMTs' *"consistent with"* line, which the library note calls deliberate, *"qualification-fight avoidance"*; (4) the physical therapist's *"functional limitations and impairments observed during treatment were consistent with the injuries"*; (5) the radiologist's 9.2, *"the findings shown in the imaging are, within a reasonable degree of medical probability, consistent with and caused by the incident."*

> ***"#2 needs to be "reasonable degree of medical probability"; #4 "collision" is only for motor vehicle collisions, and premises injuries should read "incident"; the rest is apporved."*** *(sic)*

| Provider type | Causation sentence the app places | Source |
|---|---|---|
| emergency medicine · pain management · orthopedic surgery · neurosurgery · primary care · **chiropractic** · **other physician (MD/DO)** | the medical-probability line — *"the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}"* | §9.1 / §9.5–§9.8; **§9.4 by the 2026-08-31 edit** — the chiropractor's sentence becomes IDENTICAL to this one; **`other physician (MD/DO)` added 2026-08-31 late (`AS-Q5`), reusing §9.1's sentence VERBATIM — no new text was written for it** |
| prehospital EMS (EMT / paramedic) | the EMT line — *"consistent with the {incident_type} that occurred on {incident_date}"* | §9.3, approved as written |
| physical therapy | the PT line — *"functional limitations and impairments … consistent with the injuries … sustained in the incident of {incident_date}"* | §9.9, approved as written |
| radiologist / imaging interpreter | **§9.2 as written** — the FINDINGS object AND the medical-probability phrase | §9.2, approved as written — **B2 CLOSED, `RC-6` CLOSED** (§13.2) |
| pharmacy · custodian-only · mid-level rider | **none** | §9.10 / §9.11 / §9.12 carry no causation sentence |
| **other licensed non-physician provider** *(added 2026-08-31 late, `AS-Q5`)* | **none — and none is invented** | writer-only paragraph, **panel-flagged**; degrade, don't invent. **No fixed causation line is written for this type. WHETHER SUCH A PARAGRAPH MAY CARRY A CAUSATION OPINION AT ALL IS *NOT RULED* — that is B6, and it is Michael's (§18.B) — and the writer instruction says nothing either way** (the slice's §7.4(g), in those terms). *A draft instruction that BARRED it was withdrawn before the slice shipped, for exactly that reason; the withdrawal is recorded in the session log at `#140`, not in the slice's §2, and it is a Claude drafting fact, not a ruling.* |
| **mental health** *(added 2026-08-31 late, `AS-Q5`)* | **none — and NO PARAGRAPH IS GENERATED AT ALL** | the type fires `form-engine.md` §5.1's existing HARD PAUSE; the block renders and **Michael drafts the paragraph in Word.** *This is the deliberate gap preserved AS A TYPE rather than as a variant — see §11.9* |

**Four distinct sentences, not five: with the chiropractor moved to medical probability his sentence is the treating line.** Two things named to Michael as consequences, not ruled by him separately: the 2026-08-22 *"EMS is a treating shape"* ruling is **SUPERSEDED as to the causation sentence** by tonight's approval of the EMT line — the earlier ruling stands as written, today's governs; and `form-engine.md` §9.4's note *"chiropractic (not medical) probability — settled"* is overtaken. **He then ruled the §9.4 text itself edited: *"Get rid of chiropractic probability and replace with medical probability."*** — a packet work order, not this file's act.

**THE EVENT NOUN.** The `{incident_type}` token, wherever a fixed sentence or the writer's opening names the event: **"collision" only for motor vehicle collisions.** Put narrower — everything non-MVC, or premises only? — **Michael: *"Let's make "incident" the word for everything not a collision. I can always change those on my own if I want to later."*** *(The word "collision" had appeared in Claude's rendering of the EMT sentence, where the library's token is `{incident_type}`; his "#4" label is read as a token rule, not as an edit to any one sentence. The causation lines' literal *"the incident of {incident_date}"* is his approved text and is left alone.)*

**THE BASIS LIST.** Put as the library's six — (i) emergency medicine: personal examination and treatment, review of the medical records, *medical* knowledge from education, training, experience and research (§9.1); (ii) pain/ortho/neuro/primary care: the same, but *"medical records and diagnostic imaging"* (§9.5–§9.8); (iii) chiropractor: records and imaging, *"knowledge"* rather than *"medical knowledge"* (§9.4); (iv) physical therapist: *"personal evaluation and treatment,"* records, *"knowledge"* (§9.9); (v) EMT: *"at the scene and during transport,"* no review of records (§9.3); (vi) radiologist: *"review and interpretation of the diagnostic imaging"* in place of treatment (§9.2) — against the 2026-08-22 ruling's three (treating as written, the radiologist swap, EMS as written). **Michael: *"This is correct."* — the library's six, keyed by provider type.**

| Provider type | Basis sentence the app places | Source |
|---|---|---|
| emergency medicine | examination and treatment · review of medical records · *medical* knowledge | §9.1 |
| pain · ortho · neuro · primary care | examination and treatment · records **and diagnostic imaging** · *medical* knowledge | §9.5–§9.8 |
| chiropractic | examination and treatment · records and diagnostic imaging · *"knowledge"* | §9.4 (basis unchanged by the edit) |
| physical therapy | *"personal evaluation and treatment"* · records · *"knowledge"* | §9.9 |
| prehospital EMS | *"personal examination and treatment … at the scene and during transport"* · **no review of records** · *medical* knowledge | §9.3 |
| radiologist | *"review and interpretation of … diagnostic imaging"* · review of records · *medical* knowledge | §9.2 |
| pharmacy · custodian-only · mid-level rider | **none** | — |
| **other physician (MD/DO)** *(added 2026-08-31 late, `AS-Q5`)* | **§9.1's pair, VERBATIM** — examination and treatment · review of medical records · *medical* knowledge | §9.1, reused; no new text |
| **other licensed non-physician provider** *(added 2026-08-31 late, `AS-Q5`)* | **none** — writer-only, panel-flagged | — |
| **mental health** *(added 2026-08-31 late, `AS-Q5`)* | **none** — no paragraph is generated | — |

**TWO FURTHER FIXED TEXTS EXIST, AND A BUILD GENERATING "the two lists" WOULD MISS THEM (named 2026-09-01, third fold-in).** The two tables above are the BASIS and CAUSATION lists. **`AS-Q7a` and `AS-Q8c` put app-placed fixed text on two more shapes**, so the app's fixed-text set is FOUR lists, not two:

| Fixed text | Type it belongs to | Source | Ruled |
|---|---|---|---|
| the **BASIS** sentence | the types in the basis table above | §9.1–§9.9 | 2026-08-31 (`RC-1`) |
| the **CAUSATION** sentence | the types in the causation table above | §9.1–§9.9 | 2026-08-31 (`RC-1`) |
| **the WHOLE custodian-only paragraph** | `custodian-only` | **§9.11, placed WHOLE** | **2026-08-31 late (`AS-Q7a`)** — §13.6 |
| **the RIDER's scope sentence** | `mid-level` | **§9.12's back half, with the subject `AS-Q8c` approved** | **2026-08-31 late (`AS-Q8c`)** — §15.6 |

*The two tables above read **none** for `pharmacy · custodian-only · mid-level rider` and that stays TRUE OF THE BASIS AND CAUSATION SENTENCES — those three take neither. It is NOT true that those types carry no app-placed text at all: two of the three do, by the two rows just added. **`pharmacy` alone has no app-placed sentence of any kind** (§13.4). A drift test built from §9 must target all four sources.*

**PLURAL FORMS.** Each sentence exists in singular and plural — the plural-token form of §9's own header rule, *"Group versions = same template with plural tokens"* — and the plural is what a same-type group gets (`RC-3`, §15.3).

**WHAT THIS MEANS FOR §13.** The four SHAPES of 2026-08-22 are SUBSUMED: **PROVIDER TYPE is the key for BOTH fixed sentences**, and the type vocabulary is the library's. The §13 table stands as written and is read through this section. *(The CD-1 role vocabulary named in `HD-16`'s migration plan is reconciled to this list by the build; not ruled tonight.)*

### §11.9 — THE TYPE VOCABULARY IS **FIFTEEN**, not twelve (RULED 2026-08-31, late sitting, `AS-Q5`)

**The question that forced it:** the twelve library types have no home for a facility outside them — **a psychologist's clinic above all**, where `form-engine.md` §5.1 already carries a HARD PAUSE for mental-health records and the module had no way to express it. Three values were proposed and **Michael's selection was *"Adopt all three."***

| # | Type | Fixed sentences | Behaviour |
|---|---|---|---|
| 1–12 | emergency medicine · pain management · orthopedic surgery · neurosurgery · primary care · chiropractic · physical therapy · prehospital EMS · radiologist · pharmacy · custodian-only · mid-level | as §11.8's tables — **basis and causation for the first nine; `pharmacy` takes NO app-placed SENTENCE (§13.4 — its LEAD is the bold facility name, D-17); `custodian-only` takes §9.11 WHOLE (§13.6, `AS-Q7a`) and `mid-level` takes the rider's scope sentence (§15.6, `AS-Q8c`)** | unchanged by `AS-Q5`; the two app-placed texts were added the same night |
| **13** | **mental health** | **NONE** | fires `form-engine.md` §5.1's HARD PAUSE; **the block renders; NO paragraph is generated; Michael drafts it in Word.** **The deliberate gap is PRESERVED AS A TYPE, not as a variant** — the app can now say *what* it is declining to draft, which it could not before |
| **14** | **other physician (MD/DO)** | **§9.1's basis and causation, VERBATIM** | a catch-all for **MD/DO specialties outside the named physician types of §11.8's tables**; **no new approved text was written, which is why it took no text act** |
| **15** | **other licensed non-physician provider** | **basis: none · causation: none** | **writer-only, panel-flagged.** Degrade, don't invent: where the app has no approved sentence it places none rather than borrowing one |

> **NAMED DIVERGENCE, stated so the earlier text stands as written and the later ruling is read through it (the `#140` pattern):** **`form-engine.md` §10's `R17` bullet at HEAD listed the TWELVE-value vocabulary.** It is **FIFTEEN** by this ruling. **Conformed by exact-string work order in the 2026-09-01 packet (§10).**

**THE MENTAL-HEALTH TYPE IS NOT A HARD STOP** — it is a type that IS set, for which the app declines to generate on purpose, where a stop is an absence it cannot build past. **The full statement, with invariant 1's scope, is at §12.3**; it lives there because that is where the stops table is.

> **MARKED — THE THREE TYPE DESCRIPTIONS ARE CLAUDE'S; THE ADOPTION IS MICHAEL'S.** He said *"Adopt all three."* **THREE behaviours were in the description he adopted in terms and are recorded on that footing** — the §5.1 pause as the mental-health behaviour, the §9.1 reuse for other-physician, and the writer-only-and-panel-flagged posture for other-licensed-non-physician. **Everything ELSE in the three rows — the catch-all's boundary, the "degrade, don't invent" phrasing, the no-text-act observation — is Claude's gloss and is NOT vouched for by this guard.** **`AS-Q17` — what happens when the MENTAL-HEALTH marker lands on an INDIVIDUAL at a facility typed something else — was PUT and NOT ANSWERED; it is a PROPOSED hands-on item (§18.F).**

**A TEXT ACT DISCHARGED.** The fixed wording of each sentence was, at the moment `RC-1` was ruled, a text act of Michael's — the 2026-08-22 verbatims are spoken, and template text must be approved text. **Both tables above are built from sentences he approved verbatim in §9, plus his one ruled edit — which is why the discharge took one exchange.** A build slice generates the table from §9's text with a drift test, exactly as FE-D1 already generates `variants.ts` from the spec.

### §11.10 — THE WRITER'S INSTRUCTIONS ARE **VERSIONED TEMPLATE DATA**, AND FOUR INTERVIEW CARDS RETIRE (RULED 2026-08-31, late sitting, `AS-Q12(d)` and `AS-Q9`)

**Everything the writer is TOLD is now a first-class object.** §11.6 requires the writer to know what the fixed sentences say, to place a four-limb custodian sentence, and to explain-each-then-pair a mixed facility (§15.6) — instructions that were, until this ruling, prose scattered across a spec. **Michael's selection (`AS-Q12`, five docs acts): *"Adopt all five"*** — and limb (d) is: **the writer's instructions are VERSIONED TEMPLATE DATA in the template bank, EDITABLE BY MICHAEL, and STAMPED ON EACH GENERATED DOCUMENT** so that any generation can be read back against the instruction set that produced it. *Same posture as the fixed sentences themselves (§11.8): invariant-as-data, versioned, his to edit.*

**AND FOUR INTERVIEW CARDS RETIRE FOR THE TREATING TRACK — `AS-Q9`.** `form-engine.md` §4's per-provider interview cards asked four things — **board certification, a treatment checklist, future care, and a PCP baseline.** Under §11.6 the writer draws all four from the chronology and none of them is a question for a human any more. **Michael's selection: *"Retire all four for treating facilities; the writer is told never to assert board certification unless the chronology or record states it."***

| | Ruled |
|---|---|
| **the four cards' CLAUSES** | **RETIRE for the treating track** — they no longer exist as questions put to a user |
| **the credential guard** | **SURVIVES, as a WRITER INSTRUCTION:** *never assert board certification unless the chronology or the record states it.* A card that guarded against an unsupported credential claim becomes an instruction that does the same job one layer down |
| **future care · treatment checklist · PCP baseline** | drawn from the chronology by the writer (§11.6 slot 3; `AS-Q8a` puts future care in the writer's middle) |
| **`form-engine.md` §4** | its TEXT stands as the record of the retired mechanism; **§2 step 3's citation of the cards took an overtaken note by work order (landed 2026-09-01, batch 85)** |
| **the CARD CODE** | **NOT deleted by the build.** The selected option's DESCRIPTION (Claude's words, shown with the pick) added *"the cards' machinery stays for the retained track if that track is built"* — **read as the card COMPONENT surviving, NEVER as a card rendering on the retained step** |
| **outside the treating track** | **NOTHING is ruled.** The retained-expert step as ruled (§8 Q6; §3 item 16) has no question for a card to ask |

> **MARKED — the option text and its description are CLAUDE's; the ruling is the selection.** What is Michael's is retiring all four for treating facilities and the never-assert-board-certification instruction. **The card-code-survives gloss is Claude's description of his pick and is recorded as such, not as his words.**

## §12 — THE THREE ENGINE HARD STOPS — and the three enforcement postures, now THREE TIERS (RULED 2026-08-31)

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

### §12.3 — THE THREE POSTURES ARE THREE TIERS. Hard stops STOP THE GENERATE AND TELL HIM WHAT TO FIX (B1, RULED 2026-08-31)

**The seam the first fold-in surfaced** — the panel never blocks, `HD-22` warns and never blocks, the hard stops say *"you can't violate those ones,"* and his `HD-1` sentence *"we need to fix this before we generate the disclosures document"* read a fourth way — **was put as one question once `RC-1` had made it concrete.** Under §11.6 the app needs two things from the record before it can build a paragraph: the incident date from the matter record, for the causation sentence, and the facility's name, for the block. If either is missing a hard stop fires and the engine will not produce that paragraph. **What he sees, and whether he can generate the rest?**

> ***"Stop and tell me what to do first."***

| Tier | Object | Behaviour | Ruled |
|---|---|---|---|
| **Ambient panel** (§6.1) | provider RECORDS — missing address, phone, treating physician | flags, lists per provider, live in both directions, **never blocks** | 2026-08-21 — **unchanged** |
| **`HD-22`** (§6.3) | the designee NAME's corporate suffix | **warns, never blocks** — "let me go ahead" | 2026-08-21 — **unchanged** |
| **HARD STOPS** (§12.1) | what the app cannot BUILD a paragraph without | **the generate STOPS and names what to fix first** | **2026-08-31** |

**His `HD-1` sentence turned out to describe the top tier, not the panel.** The panel's three lines flag and let him generate, exactly as ruled 2026-08-21; the conditions the app cannot build without are the ones that stop him.

**WHAT CAN FIRE A HARD STOP UNDER FIXED TEXT — three ABSENCES, and only absences.** Hard stop 1 (*never emit a paragraph missing the causation line*) is STRUCTURAL and has no user-facing case: the app places the line. Hard stop 2 (*never emit a date that disagrees with the matter record*) cannot occur as written: the app FILLS the date from the matter record — only its ABSENCE can. Hard stop 3 (*never emit a provider paragraph with no facility*) is the facility NAME's absence. **And a THIRD absence was created the same night and ruled into the same tier:** a selected facility with **NO TYPE SET** (§17.1a) — without it the app cannot choose which fixed sentences to place. Put as *"same as the other two?"* — **Michael: *"stop and tell me."***

| Must-fix condition | Why the app cannot build | Ruled |
|---|---|---|
| the matter has **no incident date** | the fixed causation sentence cannot be rendered | 2026-08-31 |
| a selected facility has **no name** | the provider block cannot be rendered | 2026-08-31 |
| a selected facility has **no type** | no fixed pair can be chosen (§11.8) | 2026-08-31 |

**§12.1's table stands as written — those are the invariants; this table is what a user can actually run into.**

**A FOURTH CONDITION EXISTS AND IS DELIBERATELY NOT IN THAT TABLE (2026-08-31 late, `AS-Q5`).** A facility typed **mental health** produces no paragraph either — but by DESIGN, not by inability: the type is set, `form-engine.md` §5.1's HARD PAUSE fires, the block renders, the document generates, and Michael drafts the paragraph in Word (§11.9). **A stop is an ABSENCE the app cannot build past; the mental-health pause is a PRESENT type the app declines to draft for.** *Named here because both end in "no generated paragraph," and a build that merged them would turn a designed gap into a blocked generate.*

**AND INVARIANT 1's SCOPE MUST BE STATED, BECAUSE `AS-Q5` PUT A TYPE INSIDE IT THAT HAS NO CAUSATION SENTENCE.** §12.1 invariant 1 — *never emit a paragraph missing the CAUSATION LINE* — was written when every designated paragraph had one. **FIVE types now have NO fixed causation sentence by ruling: `pharmacy`, `custodian-only` and `mid-level rider` (§11.8's causation table, longstanding), and `other licensed non-physician provider` and `mental health` (`AS-Q5`).** **INVARIANT 1 BINDS ONLY THE TYPES §11.8's causation table gives a sentence to.** For the other five the app emits — or, for mental health, does not generate at all — **by design, and NO STOP FIRES**. *(`mid-level` is named explicitly because the rider renders BENEATH a treating paragraph and is the shape a reader is likeliest to assume invariant 1 already covers.)* *This is a scoping statement, not a new ruling: it says which paragraphs invariant 1 is about. **Whether an `other licensed non-physician provider` paragraph may carry a causation opinion at all is B6 and is Michael's (§11.8, §18.B)** — invariant 1 does not decide it and must not be read as deciding it.*

> **HELD FOR HANDS-ON, named (§18.F): the SHAPE of the stop** — a must-fix tier inside the `HD-1` panel, or a dialog on the generate button. Not decided here; not defaulted silently.
>
> **WHAT THE SLICE DOES WHILE IT IS HELD, recorded so the hold is not quietly spent (2026-09-01).** `docs/specs/fe-d1-amendment-slice.md` §10 D-1 carries a **must-fix tier at the top of the `HD-1` panel, marked PROVISIONAL — INSIDE the held options, not a third shape beside them.** An earlier draft of that slice had rendered the must-fix list as a THIRD surface outside both of Michael's options and **was reversed before shipping for exactly that reason.** **Nothing in the slice decides this hold; the default is named so a build can proceed without deciding it silently, and it is reported as a default taken.**

## §13 — THE FOUR PROVIDER SHAPES (RULED 2026-08-22) — SUBSUMED BY PROVIDER TYPE (2026-08-31)

**Where the 2026-08-20 addendum had one shape plus exceptions, the 2026-08-22 sitting ruled FOUR. On 2026-08-31, once the floor became fixed text, the key for both fixed sentences became PROVIDER TYPE with his library's variants (§11.8), and the four shapes are read through that table.** The table below stands as written; where it and §11.8 differ, §11.8 governs and the difference is named in the row.

| Shape | Basis limb | Causation line | Custodian | Note |
|---|---|---|---|---|
| **1. Treating provider** | as written (§11.2) — **six library variants by type, §11.8** | yes — **the medical-probability line for EM, pain, ortho, neuro, primary care and chiropractic; the PT's own "consistent with" line** | yes — **the writer's sentence, four limbs (§11.6)** | the default |
| **2. Radiologist / imaging interpreter** | swaps *personal treatment* → **interpretation of the imaging**; review of records; education/training/experience/research retained | **§9.2 AS WRITTEN — no longer provisional (§13.2)** | yes | §13.2 |
| **3. Prehospital (EMS / ambulance)** | §9.3 — at the scene and during transport, no review of records | **the EMT "consistent with" line — SUPERSEDING the 2026-08-22 "treating shape" as to causation (§13.3)** | yes | §13.3 |
| **4. Pharmacy** | **NONE** | **NONE** | yes — **this is its whole content**, and since 2026-08-31 late **all FOUR limbs** (`AS-Q7b`, §13.4) | §13.4 — **no app-placed SENTENCE at all**; its `AS-Q8b` LEAD is the **bold FACILITY name** rather than a person (§11.6; the slice's D-17, PROVISIONAL) |

### §13.1 — Shape 1, treating provider
All three floor limbs present; the basis and causation sentences are the type's entries in §11.8; the custodian sentence is the writer's (§11.6).

### §13.2 — Shape 2, radiologist — CONFIRMED 2026-08-22 AS PROVISIONAL; SETTLED 2026-08-31 ON HIS OWN §9.2

**The 2026-08-22 ruling, and its express provisional terms:**

> *"for right now, **until further notice**, let's go ahead and just keep putting the … 'within a reasonable degree of medical probability caused by the incident' line in there. **Until I figure out a better way to do it.**"*

**His reason:**

> *"truth be told, I have never had a case ever where we were planning on calling the radiologist because … if it's that serious and we're dealing with radiology, we're gonna be talking to the surgeon themselves, and the surgeon is really the one that's gonna go and look at the imaging himself or herself."*

**The radiologist is designated for completeness; the surgeon carries causation.** A narrower alternative — *"findings consistent with the mechanism of injury"* — was offered on 2026-08-22 and declined.

> **THE CONFLICT THE FIRST FOLD-IN SURFACED — B2 — AND HOW IT CLOSED.** **Part 3 rule 5 (his words, 2026-08-20):** *"The causation object tracks the provider's actual work product — injuries treated vs. findings identified. **This is the most legally consequential generation error available**, because getting it wrong claims an opinion the provider cannot give."* The 2026-08-22 ruling kept *"the 'within a reasonable degree of medical probability caused by the incident' line"* — which the first fold-in read as the injuries-treated object, opposite to rule 5. **Put back to him on 2026-08-31 with the observation that his own approved §9.2 sentence contains BOTH — the medical-probability phrase he asked to keep AND the "findings shown in the imaging" object rule 5 requires** — as the fifth entry of the causation list: **"the rest is approved."** Then, asked directly whether approving 9.2 lifts *"until I figure out a better way"*: ***"9.2 approval lifts it. I may make a change later after actually using it, but let's keep it that way for now."***
>
> **B2 CLOSED and `RC-6` CLOSED: his two sets of words reconcile on §9.2's sentence.** The radiologist's causation sentence is §9.2 as written, no longer provisional. His stated intent to possibly revisit after real use is recorded as intent, not as an open item.

### §13.3 — Shape 3, prehospital EMS — a treating shape for BASIS; its OWN causation line since 2026-08-31

> the EMTs/paramedics *"personally examine the client on the scene and gave emergency medical treatment, did diagnostics, and sometimes transported them."*

> **MARKED AS CLAUDE'S ADDITION, UNOBJECTED, NOT MICHAEL'S WORDS:** that their distinctive value is *observation of the mechanism and the immediate presentation, which nobody downstream saw.*

**SUPERSESSION, named rather than smoothed (2026-08-31).** The 2026-08-22 ruling made EMS *"a treating shape,"* which under the floor as then ruled meant the medical-probability causation line. His library's §9.3 deliberately says *"consistent with"* — *"qualification-fight avoidance"* — and when the two were put side by side in the causation list he approved §9.3's line as written (§11.8). **As to the CAUSATION sentence the 2026-08-31 ruling governs and the 2026-08-22 ruling stands as written; as to the BASIS sentence EMS takes its own §9.3 variant (at the scene and during transport, no review of records).** Nothing about the EMS shape's custodian or its treating character changed.

### §13.4 — Shape 4, pharmacy — records-and-billing, not a provider — and, since 2026-08-31, NO FIXED SLOTS

> *"all that we need to know from the pharmacy. We need someone to testify that the records that they produced are **true and correct**, and … testify **as to the bills**, and they have to testify that they're … **reasonable and necessary**."*

**No basis line. No causation line. The pharmacy is the only shape with no human who examined anything — client or image.**

**Michael named the predicate for the reasonable-and-necessary limb as "CPRC eighteen dot zero zero one." RECORDED, UNVERIFIED, a registry CANDIDATE and not a proposition. Claude asserted no cite and confirmed none. Only Michael verifies. `RC-4`.** *(Same statute Part 7 already flags — one home, not two. §9.)*

**This is what DISSOLVED widget D (§1.5, §5).** It also **narrows Part 3 rule 9** — *"custodian-only is a fallback, not a choice"* — which governs genuinely unresolvable individuals and **does not reach the pharmacy, where custodian-only is the designed shape and not a gap.**

**`RC-5` — does this shape take a basis line at all? — ANSWERED BY CONSEQUENCE 2026-08-31.** The library has no pharmacy basis sentence and no pharmacy causation sentence (§11.8), so under fixed text **the pharmacy paragraph has no fixed slots: it is entirely the writer's, with the four-limb custodian sentence (§11.6) as its required content and §9.10 as the voice example.** Stated to Michael with a stop-me line; not objected.

**THE FOUR LIMBS BIND THE PHARMACY — RULED 2026-08-31 (late sitting), `AS-Q7b`.** §9.10's approved paragraph carries a **ONE-limb** records predicate (*"the records of {pharmacy_name} are kept in the regular course of business"*), so his §11.6 ruling — *"All four limbs required every time."* — and his own served text pointed different ways. Put with rendered alternatives; **Michael's selection: *"Example C — four limbs for the pharmacy too."*** **The writer composes the pharmacy paragraph under the FULL four-limb instruction** (§11.6); **§9.10's text is UNEDITED and stays the voice example**, exactly as widget B left the other eleven. *(The pharmacy's block line takes its own literal — "Pharmacist(s) and/or Custodian of Records" — §11.4; its `AS-Q8b` LEAD is the bold FACILITY name, the slice's D-17, PROVISIONAL.)*

> **MARKED — THE THREE RENDERED ALTERNATIVES WERE CLAUDE'S, FICTIONAL; THE RULING IS *"Example C — four limbs for the pharmacy too."*** What is Michael's is that the pharmacy takes the full four limbs. **Leaving §9.10 unedited as the voice example, and the observation that this shape therefore has no app-placed sentence at all, are Claude's** and are recorded on that footing.

### §13.5 — NOT a fifth shape: the imaging facility

> *"the radiologist interpreted the imaging and developed his report. And so he's gonna testify about everything related to that."*

**The imaging facility is the RADIOLOGIST'S AFFILIATION, and the designation runs to the radiologist. It is not a records-and-billing entry and does not take shape 4.**

> **MARKED: the words above are the capture's framing of what Michael's sentence implies, not his words.** What he said is the quotation — that the radiologist interpreted the imaging, produced the report, and will testify about everything related to it. **The inference that the FACILITY therefore takes no shape of its own drew no objection and is not separately ruled.**

### §13.6 — CUSTODIAN-ONLY: THE ONE SHAPE WHOSE PARAGRAPH THE **APP** PLACES (RULED 2026-08-31, late sitting, `AS-Q7a`)

**`ND-4`'s fallback** — a selected facility where the model could name no individual — designates *"The Custodian of Records for [facility]"*, a person role. **Its whole paragraph is predicate boilerplate**, which makes it the one place where fixed text costs nothing and guarantees everything. Put as rendered examples; **Michael's selection: *"Example A — app places §9.11; writer adds the care-episode clause only."***

| Part | Who | Content |
|---|---|---|
| the paragraph | **APP — FIXED** | **`form-engine.md` §9.11 placed WHOLE**, `{facility_name}` filled — **all four custodian limbs app-guaranteed for this shape alone** |
| the care-episode clause | **WRITER — OPTIONAL** | the episode and its date, where the chronology carries them; absent when it does not |

> **MARKED — the two-part split above is CLAUDE's; the ruling is *"Example A — app places §9.11; writer adds the care-episode clause only."*** What is Michael's is that the app places §9.11 and the writer adds only the care-episode clause. **The table's allocation of "OPTIONAL", the "episode and its date" content, and the observation that all four limbs are thereby app-guaranteed are Claude's** and are recorded on that footing.

**This is the FIRST §9 text placed WHOLE by the app since `RC-1` made §9 a voice corpus** (§11.7) — and it is a narrow exception, not a reopening: §9's other eleven paragraphs still produce no output. **The block's top line for this shape is "Custodian of Records"** (§11.4). *`RC-4`'s `CPRC § 18.001` candidate sits behind this shape's predicate and is UNVERIFIED — only Michael verifies (§18.A).*

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

**`RC-7` — RULED 2026-08-31 — Michael: *"Adopt both."*** **Formats:** anything the model can read — the list he named on 2026-08-21 (PDF, Excel, JSON, CSV, Word) plus plain text, under the principle put to him; **a scanned or image-only PDF is FLAGGED at the drop as unreadable, never silently sent.** **A new chronology dropped over an old one is VERSIONED:** the earlier drops are kept and the newest is the one that goes to the model — mirroring §16.5's *"supplementation is additive; the most recent saved document is the source of truth."*

**WHERE THE BYTES LIVE — RULED 2026-08-31 (late sitting), `AS-Q4`.** `RC-7` ruled versioning without saying what a version IS, and the app has no document storage until gate 7. **Michael's selection: *"(i) Extracted text per version in the database; bytes not retained; file store at gate 7."***

| | Ruled |
|---|---|
| **what a version holds** | the **EXTRACTED TEXT** of the drop — PDF, Word, Excel, CSV, JSON or plain text reduced to text AT THE DROP — stored per version in the database |
| **the original file** | **NOT RETAINED by the app.** A file store is **gate-7 work** and nothing here anticipates it |
| **what the model receives** | **the FULL text, content unmodified** — a FORMAT change, never the scrubbing §16.2 abandoned, and the distinction is load-bearing |
| **the unreadable-scan flag** | a **property of the VERSION** (no text layer → flagged at the drop, never sent) — `RC-7`'s flag given a home |

> **MARKED — THE FOUR STORAGE OPTIONS WERE CLAUDE'S; THE RULING IS THE SELECTION "(i)".** What is Michael's is the choice of extracted-text-per-version with the bytes not retained and the file store deferred to gate 7. The mechanics described in the row above were in the option text he chose and are recorded on that footing. **Nothing here reopens §16.2: no scrubbing, no thinning, no de-identification — reduction to text is a format change and is named as one.**

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

### §14.6 — TWO INJURED CLIENTS: THE CHRONOLOGY IS **PER CLIENT** (RULED 2026-08-31, late sitting, `AS-Q10`)

Nothing in §§14.0–14.5 said whose chronology it is, and a two-plaintiff matter has two. Put with the instrument question it travels with; **Michael's selection: *"One instrument per plaintiff; provider list and chronology per client."***

**Each chronology version carries `client_id`, exactly as `medical_bills.client_id` already does — nullable, and blank on a one-client case, so nothing about the single-plaintiff path changes.** The provider list (`R17`) is per client on the same footing (§17.1); the instrument itself is per plaintiff (§15.7). **A facility both plaintiffs saw appears under each of them, with its own paragraph on each instrument** — the paragraphs are not shared and neither is the extraction.

## §15 — THE SELECTION UNIT AND PARAGRAPH GRANULARITY (RULED 2026-08-22; the collective form, the one split, the mixed paragraph and the rider RULED 2026-08-31)

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

### §15.3 — ONE PARAGRAPH PER FACILITY, covering its individuals collectively — with ONE ruled exception

Asked whether a hospital with twelve names gets twelve paragraphs or one — **Michael: *"Hospital … with twelve names, one paragraph covering the [whole]."*** For a facility with one person, same shape, singular — **"Yep."**

**THE COLLECTIVE FORM — `RC-3` CLOSED 2026-08-31.** The fixed sentences are singular as ruled (*"that physician … the injuries that they treated"*) and the paragraph is collective. Put to him with his own §9 header rule — *"Group versions = same template with plural tokens"* — so that three ER physicians at one facility get *"Drs. A, B and C will testify based on their personal examination …"* and the causation line in the plural: ***"That is the collective form."*** Every fixed sentence in §11.8 therefore exists in singular and plural, and a same-type group takes the plural.

**THE ONE SPLIT — the RADIOLOGIST (RULED 2026-08-31).** Fixed sentences keyed by type meet a mixed facility — the ER physician, two radiologists and a PA on one hospital block — with no single basis-and-causation pair to place. His 9.1 note, written before the twenty-second, had the engine splitting such a facility into an emergency-medicine paragraph and a radiology paragraph under one shared contact block. Put: does that split survive one-paragraph-per-facility? ***"For a mixed facility, let's give the radiologist their own paragraph."*** Then, narrower — the only split, or the general rule, decided by a chiropractic clinic with a DC and a PT on one block, whose fixed sentences differ? ***"Radiologist is the only split."*** **He had the PT case in front of him: a non-radiologist individual of a different type rides the facility paragraph and its fixed sentences. Recorded as accepted, not as an oversight.** *(Reading, stated to him with a stop-me line: one facility block, two paragraphs beneath it — the treating paragraph and the radiology paragraph — per the 9.1 note's shared block. Not objected.)*

### §15.4 — Three consequences, all of them live

1. **ND-8 (number agreement) is LOAD-BEARING, not cosmetic** — and satisfied: the floor's own sentences work plural by the ruling above. (§4, §3's R10 row.)
2. **The CAUSATION LINE for a group is its plural-token form.** `RC-3` CLOSED (§11.3, §11.8).
3. **ND-3 must be RE-READ.** *"No two providers share one stock paragraph"* was written when the unit was the PERSON. **The unit is now the FACILITY.** (§4.)

### §15.5 — NO review step on the extracted list. Over-inclusion is DELIBERATE.

> *"**No. Just put everyone on the block.**"*

And, from the hand-run:

> *"a hospital is designated … there were a bunch of individuals listed in there. And so the provider block was very long because it listed a whole lot of people. **That's fine. Not a big deal. I can go through and delete anyone that I wanna delete from there. And frankly I don't care how long the provider block is. If we list everyone in there, doesn't hurt me at all. Could only potentially help me.**"*

> **⚠ PRECISION FLAG: his length statement is about the PROVIDER BLOCK, not the paragraph. No statement about paragraph length exists on the record.**
>
> **MARKED AS CLAUDE'S INFERENCE — DO NOT ATTRIBUTE IT TO HIM:** *"anyone you didn't list is someone you can't call."* **Michael's stated reason is only that it costs nothing and might help.**

*Consistent with §11.4: default it on, don't make him decide per case.*

> **RECONCILED 2026-08-31 AGAINST THE ROLE MARKER (§17.1a).** The list is not reviewed for INCLUSION — everyone the model names stays on the block, exactly as ruled here. What §17.1a adds is an ATTRIBUTE he may set on an individual already on the block (flipping an imaging reader to "Radiologist"), by his hand, because he asked for *"a way for me to designate them."* An act available to him is not a review step required of him. **Nothing here is re-ruled.**

### §15.6 — THE MIXED PARAGRAPH AND THE RIDER (RULED 2026-08-31)

**A mixed non-radiologist facility — the DC and the PT on one block — is ONE paragraph, and Michael ruled its SHAPE, outside both things offered** (a facility type that everyone inherits; a per-individual type with a rule for which wins):

> ***"DC and PT should be combined. Explain what each one did then pair them together for the rest of the paragraph."***

**The four-slot structure is unchanged; the WRITER's OPENING gains a rule for the mixed case:** it explains what EACH individual did, separately, and from the basis sentence onward the individuals are PAIRED — the fixed sentences in the plural covering both, the writer's middle about them together, the fixed causation in the plural. **Which type's fixed sentences the pair gets is the FACILITY's type (§17.1a)** — in the rendered example he was shown, a clinic set as chiropractic gives the PT the chiropractor's basis and causation lines. *(The rule is stated for the mixed case; same-type groups are plural throughout per §15.3, and the explain-each rule is not generalized here beyond what he said.)*

**THE MID-LEVEL RIDER.** Asked whether, under one paragraph per facility, a PA still gets `form-engine.md` §9.12's short rider paragraph beneath the treating paragraph or is just a name on the block: ***"PA gets the rider paragraph."*** Then, asked for the rider's form with examples — **the three examples were CLAUDE's renderings, fictional; his ruling is the selection:**

> **MARKED — CLAUDE'S THREE RENDERINGS, NOT MICHAEL'S WORDS.** *(A) the app places §9.12's text whole, with tokens — and beneath a COLLECTIVE paragraph its `{supervising_provider}` token has no single value, so it was shown filled with the group; (B) the writer composes the rider from the chronology — richer, but the "within the scope of" cap becomes prompt-required and unguaranteed; (C) the composite — the writer says what the PA actually did, then the app places the fixed scope sentence.*

**Michael: *"Example C is good."***

**THE RIDER IS TWO SLOTS: WRITER → FIXED.** The writer's opening says what the PA or NP actually did, from the chronology; the app then places the fixed scope sentence drawn from the back half of §9.12 — so the scope cap is app-guaranteed the way the causation line is. §9.12's first half (*"participated in the care and treatment of {client} under the supervision of …"*) is overtaken as OUTPUT by the writer's opening; its TEXT stands as a voice example, unedited.

**THE FIXED SENTENCE'S FINAL WORDING — RULED 2026-08-31 (late sitting), `AS-Q8c`. A TEXT ACT ON APPROVED TEXT, and it needed one.** Lifting §9.12's back half out of its sentence leaves it **without a subject**: the library's clause runs on from the first half, and once that half is gone nothing names who will testify. *(The second edition of this file supplied a `{midlevel_he_she}` token of its own for the lifted clause — a Claude artefact, never in `form-engine.md` §9.12, whose own pronoun token is `{midlevel_his_her}`. `AS-Q8c` replaced that improvised subject with the ruled one.)* Rendered and put; **Michael's selection: *"Approve as shown."*** **The app's fixed scope sentence is:**

> ***"{midlevel_short_name} will testify consistent with, and within the scope of, the testimony described above regarding {supervising_provider}, based on {midlevel_his_her} personal participation in {client}'s care."***

**The SUBJECT is the mid-level's rendered short name** (pronoun from the provider record; **"their" where the record does not carry one**); **every word from *"will testify"* on is §9.12 VERBATIM** and is not reworded by this ruling. *The title table behind `{midlevel_short_name}` beyond Mr./Ms. is a PROPOSED hands-on item (§18.F; the slice's D-50).*

> **MARKED — THE RENDERING WAS CLAUDE'S; THE APPROVAL IS MICHAEL'S.** *"Approve as shown"* is a selection on a Claude-rendered sentence built from his own §9.12. **What is his is the approval of that sentence and its subject.** The three earlier rider renderings (A, B, C) that produced *"Example C is good"* were likewise Claude's and are already marked above.

> **HELD FOR HANDS-ON, named (§18.F): what the scope sentence's `{supervising_provider}` names beneath a COLLECTIVE paragraph** — the group, or a supervisor Michael designates by the same hand mechanism as the radiologist mark. Build default while held: **GROUP FILL, marked PROVISIONAL.** *`AS-Q8c` approved the sentence; it did not decide this token's value beneath a collective paragraph, and the hold is untouched by it.*
>
> **AND A SECOND, PUT AND NOT ANSWERED (`AS-Q15`, PROPOSED to the hands-on queue, §18.F): a mid-level with NO treating paragraph to ride** — an ER whose extraction found two radiologists and a PA but no EM physician; a facility whose only named individual is a PA. A rider under the radiology paragraph, a rider under §9.11, or no rider? **Default while it waits: NO rider, and the mid-level is NOT on the block either** (a named person with no testimony is the `ND-1` shape), with the missing-treating-physician panel line firing at a non-radiologist facility. **Both limbs — rider and block — are his.**

### §15.7 — TWO INJURED CLIENTS: ONE INSTRUMENT PER PLAINTIFF (RULED 2026-08-31, late sitting, `AS-Q10`)

A two-plaintiff matter has two sets of injuries, two treatment histories and two causation lines, and nothing on the record said whether that is one instrument or two. **Michael's selection: *"One instrument per plaintiff; provider list and chronology per client."***

| Object | Grain |
|---|---|
| the disclosures instrument | **per PLAINTIFF** |
| the provider list (`R17`) | **per CLIENT** — the facility row carries `client_id` |
| the chronology versions | **per CLIENT** (§14.6) |
| a facility BOTH plaintiffs saw | **appears on each plaintiff's instrument, with its own paragraph** — nothing is shared, and neither extraction is reused for the other |

**`client_id` is nullable and blank on a one-client case, exactly as `medical_bills.client_id` already is**, so the single-plaintiff path is unchanged in every respect.

> **MARKED — the MECHANICS are CLAUDE's; the ruling is *"One instrument per plaintiff; provider list and chronology per client."*** What is Michael's is that cardinality. **The `client_id` column, its nullability, the `medical_bills` analogy, and the shared-facility behaviour (a paragraph on each instrument rather than one shared) are Claude's** and are recorded on that footing — the same guard covers §14.6, which carries the chronology half of the same ruling. *The multi-client title and caption form is a PROPOSED hands-on item (§18.F; the slice's D-61) — this ruling settles the CARDINALITY, not the caption's words.*

## §16 — THE MODEL CALL AND THE RETURN PATH

### §16.1 — `HD-12` REVERSED: THE APP CALLS THE MODEL DIRECTLY (RULED 2026-08-21, voice2)

> *"I would like to be able to **upload all of that stuff and do it inside of the software**."*

**And the load-bearing part, which is a STAFFING CONSTRAINT and not a convenience preference:**

> *"I would like you to **develop those paragraphs inside the software**. So for instance, it's gonna be running off of my Claude account with my tokens, but I'm not gonna be giving my — **I'm gonna have a paralegal logging in and using that function. She's gonna be using my tokens, but she's not gonna be logging into my Claude system.**"*

**The app calls the model on the firm's own BAA-covered API account. The paralegal works inside the software and never touches Michael's Claude login. The writer's PARTS return into the app as data and the app assembles the paragraph (§11.6, §16.4).**

> **THIS REVERSED A RULING TAKEN EARLIER THE SAME DAY, and the supersession is recorded rather than smoothed.** In the typed sitting of 2026-08-21, `HD-12` was ruled **option B — "B — app assembles, you paste (recommended)"** — the app assembling a bundle and Michael drafting in a chat by hand, with no model call from the app at all. **The voice sitting later that day reversed it on the staffing ground above. The later ruling governs; the earlier entry stands as written.**
>
> **A FRAMING CORRECTION MADE BEFORE THE QUESTION WAS PUT, worth preserving:** an earlier capture said this design *collides with the no-real-client-data conventions.* **It does not, quite** — that rule bars client data from **the repo, fixtures, and handoff artifacts**, not from the running application, which exists to hold client data. **The real category change is directional: this would be the first outbound transmission of client medical content to a third-party model API.** That is why §16.3 is a gate and not a note.

### §16.1a — WHERE THE CALL RUNS: A SERVER-SIDE FUNCTION HOLDING THE CREDENTIAL AS A SECRET (RULED 2026-08-31, late sitting, `AS-Q1`)

**The seam:** §16.1 says the app calls the model on the firm's own account, and **a browser application cannot hold a vendor key** — anyone with the page has it. The record had no home for the credential. **Michael's selection: *"Yes — server-side function + secret; fixture writer only now; note CLAUDE.md."***

| | Ruled |
|---|---|
| **where the call runs** | a **SERVER-SIDE FUNCTION**, not the browser — **the app's first server-side identity** |
| **where the credential lives** | a **Supabase secret**, on the `LEGISCAN_API_KEY` pattern already proven in this build (`Q-WF-4`'s first instance) |
| **what is built NOW** | the writer **INTERFACE**; a **FIXTURE writer in BOTH STORAGE MODES (demo and Supabase — this app's two, per BUILD-STATE)**; and the function's **SHAPE** — a stub that **REFUSES** without its secret configured (**one, vendor-neutrally named — the slice's D-38, a PROVISIONAL build default, not part of his selection**) |
| **what is NOT built** | **no vendor SDK, no key, no endpoint, no model name — anywhere — until `H12-v` is ruled.** The secret's NAME is vendor-neutral precisely so that ruling changes a value and not a schema |
| **the docs act** | CLAUDE.md's data-hygiene bullet takes a conforming note (landed 2026-09-01, batch 85) |

**WHEN `H12-v` IS RULED, THE CREDENTIAL'S HOME LINE LANDS IN THE PROJECT INSTRUCTIONS — trigger 5** ("the LegiScan key rotates, or any credential arrangement changes"), with the standing rule that it never appears in the repo, a packet, or a chat artifact. **`H12-v` IS MICHAEL'S AND IS NOT PUSHED HERE** (§16.3, §18.C).

> **MARKED — THE OPTION TEXTS WERE CLAUDE'S; THE RULING IS THE SELECTION, AND ONE ROW ABOVE IS NEITHER.** What is Michael's is the server-side-function-plus-secret shape, the fixture-only posture for now, and the CLAUDE.md note. **The `LEGISCAN_API_KEY` analogy and the refuse-without-secret stub were in the option text he chose** and are recorded on that footing, not as his words. **THE SECRET BEING A *SINGLE, VENDOR-NEUTRALLY NAMED* ONE IS NOT IN HIS SELECTION AT ALL — it is the slice's D-38, a NAMED BUILD DEFAULT, PROVISIONAL, which the build REPORTS AS A DEFAULT TAKEN.** *Recorded separately because a guard that vouches for a default as though it were part of a ruling discharges the build's duty to report it, which is the opposite of what these guards are for.*

**THIS DOES NOT MOVE §16.3's GATE ONE INCH.** A server-side function is where the call *would* run; **a BAA is still a HARD GATE before any real record moves through it**, and a fixture writer touches no vendor at all.

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

> **WHAT "RETURNED" MEANS SINCE 2026-08-31 (§11.6, "Option 1").** The model returns **PARTS** — the writer's opening, its middle, and wherever it placed the custodian sentence — **as PLAIN TEXT** (`HD-20-c`, §16.6); the app ASSEMBLES the paragraph by slotting its own fixed sentences between them. **`HD-20-a`'s object is therefore the ASSEMBLED paragraph:** nothing takes the writer's parts apart, nothing looks inside them, and the assembled paragraph enters the Word document as built. This is a consequence of `RC-1`, not a reversal of anything here; the mechanics delegation below covers it.
>
> **SCOPE LIMIT, EXPRESS: this is a delegation on MECHANICS ONLY, bounded by (1) whatever is easiest and most practical and (2) HIPAA compliance. If the practical answer later requires structured storage for some unrelated reason, that is A FRESH QUESTION, NOT A REVERSAL.**
>
> **THE COST WAS NAMED AT RULING TIME:** opaque storage forgoes any lint inside the returned text, any supplementation diff inside text, and the ordering check on it. **That cost is why the designee-type check moved upstream onto records (§6) rather than being abandoned.**

**`HD-20-b` — NO IN-APP EDITING of returned paragraph text. RULED 2026-08-21; CONFIRMED 2026-08-31.**

> *"**If any editing is gonna be done to that word document before I serve it, it's gonna be editing that I'm gonna do once I open the word document itself.**"*

Open the document, edit in Word, serve. **This is a real scope reduction: there is no in-app editing surface for model-returned paragraph text, and there is therefore nothing for the app to diff against a generation.**

> **THE DISCREPANCY THE FIRST FOLD-IN SURFACED — B3 — CLOSED.** The 2026-08-22 RECON-1 capture had carried `HD-20-b` as *"NOT REACHED"* while the 2026-08-21 voice3 capture recorded the ruling above in his words. Put to him on 2026-08-31 as a confirm, not a re-litigation — *edits to the returned document happen only in Word, never inside the app* — **Michael: *"confirm."*** The voice3 record stands; the RECON-1 capture's residue line is overtaken. *(His *"I can always change those on my own if I want to later,"* said the same night about the event noun, reads the same way.)*

### §16.5 — Supplementation is purely ADDITIVE (RULED 2026-08-21, voice2)

> *"In these cases, a provider is not gonna simply change. There's just gonna be a new provider because **you're not changing what happened in the past**. So medical treatment that already happened, it's already at those disclosures. The only changes that would be made to the document would be that the client went and was seen by an additional provider who provided different types of medical treatment, who is now going to be able to testify of different things. And these different things need to be noted in the new expert designation paragraph."*

**Disclosed treatment is fixed history. Nothing is revised; things are only added. A new provider brings a new block with its own description of what it can testify to.**

**How the app knows what is already served — CONFIRMED at "Yes.":**

> *"Sure. And probably the easiest way for the app to know what's already in there is to just **call on the most current version of the disclosures that are saved in the files**."*

**The most recent saved disclosures document for the matter is the source of truth. No separate served/not-served flag. No ledger. No diffing inside paragraph text.**

**WHAT "SAVED IN THE FILES" MEANS WHEN THE APP SAVES NO DOCUMENT — RULED 2026-08-31 (late sitting), `AS-Q6`.** `HD-20-b` puts every edit in Word and §14/`AS-Q4` keep no file store until gate 7, so the served .docx is **outside the app** and can have been edited after generation. The base had no definition. **Michael's selection: *"New providers only; base = the app's last generation, said plainly on screen; keep assembled paragraphs."***

| | Ruled |
|---|---|
| **what a supplement carries** | the **NEWLY SELECTED facilities only** — §16.5's additive rule, unchanged |
| **the base** | the app's **MOST RECENT GENERATION RECORD** — not the served Word file, which the app cannot see |
| **what the screen says** | ***"as last generated on `<date>`"*** — **the divergence from the served file is STATED, not hidden.** This is the whole point of the ruling: the app tells him what it is reasoning from |
| **which facilities show as already designated** | **every facility in the client's `supersedes_document_id` chain**, shown *"designated in `<date>` `<posture>`"* and **pre-deselected** — because on a SECOND supplement the most recent record holds only the FIRST supplement's facilities, so the chain is the honest set and the last record alone is not |
| **what is kept** | **each facility's ASSEMBLED PARAGRAPH and the writer's PARTS, on the generation record** — so nothing already generated is rewritten, and a supplement never re-runs a paragraph he has already served |

**§16.5's *"saved in the files"* is therefore read as THE GENERATION RECORD until gate 7 delivers document storage** — a reading, and it is named as one. *`AS-Q14` — a NEW treating individual at an ALREADY-DESIGNATED facility after service — is the case this ruling does NOT reach, and it is PROPOSED to the hands-on queue (§18.F).*

> **MARKED — THE OPTION TEXTS WERE CLAUDE'S; THE RULING IS THE SELECTION.** What is Michael's is new-providers-only, the last-generation base, saying so plainly on screen, and keeping the assembled paragraphs. **The `supersedes_document_id` chain, the pre-deselection and the "designated in `<date>` `<posture>`" label were in the option text he chose** and are recorded on that footing.

### §16.6 — What §16 deleted, named so nobody rebuilds it

**R12's "supplemental instruments generated as a diff" is superseded.** **FE-21's diff limb goes with it (§3).** **FE-8's diff half STAYS DEFERRED — RECON-1 is not its consumer, and R13, which was named as that consumer, is retired (§3, §5).** **`HD-20-c` — RULED 2026-08-31 — Michael: *"adopt."* The writer's parts come back as PLAIN TEXT and the app applies the formatting when it assembles the paragraph, per `form-engine.md` §8's formatting skeleton.** Under app assembly that is the natural answer, since the app is the one building the paragraph.

## §17 — THE MEDICAL TAB, THE PROVIDER RECORD, AND THE PROVIDER BLOCK (RULED 2026-08-21; minting approved 2026-08-22; **minted `R17`, the type mechanism, `HD-21-med`, `HD-21-b`, `CD-14`(ii) and the one name — 2026-08-31**)

### §17.1 — THE PROVIDER RECORD: a requirement no R-number covered, approved in principle 2026-08-22, **MINTED `R17` 2026-08-31**

**Michael's own specification of what the Medical tab must hold**, given unprompted at the wall where the walkthrough failed (*"we don't have any medical providers and… or any bills listed in here"*):

- **a provider record in its own right, not merely a bill** — all providers listed
- **each record carries the FACILITY and the INDIVIDUAL CLINICIAN together, on the same record** — his example: *"the radiologist, he's Doctor John Johnson."*
- **dates of treatment** — *"what are the dates of treatment that… while you were there?"*
- **a brief summary of the treatment in a cell that expands in length** — *"it shouldn't be burdensome for me to try to see it."*
- **sortable, chronological among the sorts** — *"or I need to be able to sort them by different ways."*

**This is what makes §1.2's defect fixable at all: today there is no individual clinician anywhere in the system to place in a designee slot.**

> **`RC-2` — CLOSED 2026-08-31.** On 2026-08-22 Michael was asked whether to mint a durable ID for this requirement and said **"No objection"** — and no ID was assigned. On 2026-08-31 it was put with the contents as grown that night and the next requirement ordinal, `R17`: ***"use that."*** **`R17` is minted** (§3). The widget-G letter collision (§5) is resolved for this sense; the 2026-08-20 sense — §3's other IDs — is still his and still untaken.

**WHERE `R17` LIVES — RULED 2026-08-31 (late sitting), `AS-Q3`. IT IS CASE-SCOPED.** The unanswered question was whether every individual the model extracts becomes a firm-wide directory contact. **Michael's selection: *"(A) Case-scoped record; promote to the directory by hand; TYPE set per case, pre-filled from last time."***

| Layer | Ruled |
|---|---|
| **the FACILITY** | the **existing directory contact** — unchanged, world-fact, already in CD-1 |
| **the facility's TYPE** | set for **THIS case**, **pre-filled from the last case where Michael set it** — so the second matter at the same hospital costs him nothing, and a hospital that is EM in one case and orthopedic in another is expressible |
| **the INDIVIDUALS** | **rows beneath the facility, case-scoped** — they are not directory contacts and create no directory clutter |
| **PROMOTION** | **Michael's hand, one click.** Promoting creates the firm-wide contact **and** its `renders-care-at` link with dates (§17.3) |
| **the MODEL** | **never creates a contact and never creates a link** — the `ND-1`/§14.4 line held at the schema layer, not merely at the block |
| **the PROVIDER BLOCK** | reads the **SELECTED** facility — the one the name came out of (§1.6's conformance note; the slice's D-8) |

**WHY CASE-SCOPING IS LOAD-BEARING AND NOT A STORAGE DETAIL.** A firm-wide write on extraction would put the model in charge of the directory — the same act §14.4 permanently bars for the CASE ("a feature that populated providers from the chronology would have designated the client's OBGYN"), one layer down. **Case-scoping makes the bar structural: there is no directory row for the model to create.**

> **MARKED — THE FOUR OPTIONS WERE CLAUDE'S; THE RULING IS THE SELECTION "(A)".** What is Michael's is the case-scoped record, promotion by hand, and the type set per case pre-filled from last time. **The one-click promotion, the link-with-dates on promotion and the pre-fill's source were in the option text he chose** and are recorded on that footing.

### §17.1a — THE TWO FIELDS THE 2026-08-31 RULINGS ADDED, AND THE TYPE MECHANISM (a Claude proposal, ADOPTED IN TERMS)

**Fixed sentences keyed by provider type (§11.8) need the type to come from somewhere, and the radiologist split (§15.3) needs the app to know which names on a block are radiologists.** Two rulings and one adopted mechanism:

**WHO IDENTIFIES THE RADIOLOGISTS — his hand, never the model's tag.** The model is already the one extracting the individuals from the chronology, so it could have tagged the imaging readers as it went; the alternative was a mark on the Medical tab. His OBGYN ruling (§14.4) says the model never decides WHO is on the block; this would have been the model deciding a structural attribute of someone already on it. **Michael: *"Let's figure out a way for me to designate them."***

**THE MECHANISM — proposed by Claude, put once more alone after four attempts got no answer, and ADOPTED:** every facility on the Medical tab carries a **TYPE** Michael sets once (emergency, pain management, chiropractic, physical therapy, orthopedic surgery, and so on — the §11.8 vocabulary); the individuals the model extracts appear as a list under their facility, **each with a ROLE MARKER that defaults to the facility's type**; a mixed non-radiologist paragraph takes the **facility type's** fixed sentences; a hospital's imaging readers are **flipped to "Radiologist" by his hand** and the app splits them into their own paragraph; **the model populates NAMES and nothing else.**

> ***"Yes, that is how it should work."***

> **MARKED — the mechanism's description is CLAUDE's; the adoption is Michael's.** Every specific in it (type on the facility; marker per individual defaulting to the facility type; names-only from the model) was in the description he adopted in terms, and is recorded as ruled on that footing.

**Consequences.** Provider type is **always assigned by a person, never by the writer.** `R17`'s contents grow by exactly these two fields — the facility's TYPE and the per-individual ROLE marker. A selected facility with **no type set** is a must-fix stop (§12.3). The §15.5 no-review-step ruling is untouched — the marker is an act available to him, not a gate.

**⚠ "AND NOTHING ELSE" IS A WORDING DEFECT, NAMED AND REPLACED — RULED 2026-08-31 (late sitting), `AS-Q2`. THE SENTENCE ABOVE STANDS AS THE RECORD OF WHAT HE ADOPTED; THIS IS WHAT IT MEANS.** Read literally, *"the model populates NAMES and nothing else"* contradicts §17.7, where the chronology **auto-populates visit rows**, and §17.1's own expanding per-individual summary. Both are ruled and neither is the model deciding anything. Put to him; **Michael's selection: *"Yes — names, credentials, dates, visit rows, per-individual summary; never type, role, or facility membership."***

**THE EXTRACTION CONTRACT, in full — run for facilities ALREADY on the Medical tab (§14.4, §15.1):**

| The model RETURNS, per individual | The model NEVER returns |
|---|---|
| the **NAME** | the facility's **TYPE** (§17.1a — Michael's hand) |
| the **CREDENTIAL SUFFIX**, as the chronology shows it | the individual's **ROLE MARKER** (defaults from the type; flipped by his hand) |
| the **DATES OF TREATMENT** | **WHICH FACILITIES are in the case** (§14.4 — the OBGYN bar) |
| the **VISIT ROWS** (§17.7's per-visit grain, where the chronology supports it) | a **CONTACT** or a **LINK** of any kind (`AS-Q3`) |
| a short **"what they did"** summary (§17.7's `HD-21-b` cell, one per individual) | anything that decides **WHO** is designated |

**EVERY EXTRACTED FIELD IS FLAGGED MODEL-EXTRACTED AND UNVERIFIED, from birth** — which is also what keeps `CD-14` limb (i)'s "affiliation unverified" line buildable later without a backfill (§18.C). **"Nothing else" meant TYPE, ROLE and FACILITY MEMBERSHIP — the three structural decisions — and it still bars all three.** *The adopted MECHANISM is unchanged in substance; only the sentence describing it was wrong.*

> **MARKED — the sentence being corrected is CLAUDE's (it sits inside a mechanism description Michael adopted in terms); the correction is his SELECTION.** `form-engine.md` §10's `R17` bullet at HEAD ends with the same phrase and is conformed by work order in the 2026-09-01 packet.

### §17.2 — The disclosures panel: it MIRRORS the Medical tab and computes nothing

**`HD-21(b)` — RULED. The clearest composite of the whole thread; the answer was outside every option offered.** Claude had framed a two-way choice (one summary per provider vs visit-by-visit), then honestly widened it to three when the middle option forked, and recommended a mechanical rollup. **Michael answered with none of the three:**

> *"How about we make this for both? Let's make it just simply **mimic what… whatever is in the medical tab**. Because we already talked about in the medical tab that it'll be a **visit by visit breakdown if that's information that's available from a medical chronology**, and that if it's not visible or it's not available from the medical chronology, that it'll simply be **just a one line entry for that provider**."*

**The panel has no independent shape. It inherits the Medical tab's granularity.** Mixed within one case is expected and fine — three providers with chronologies show visit rows, two without show a single line each. **No collapsing, no summarising, nothing computed.** *This kills the panel-summary question outright.*

**`HD-21(c)` — RULED. The panel is deliberately THIN.**

> *"In the form builder itself, I don't think we actually need all that information built out. Honestly, we don't need all that in there. **I just need the providers. And I need to be able to select which providers I want in there** because… the user will be in the form builder, and the user can easily go and look at the medical tab for this information."*

**Providers and a selection control. NOT a data display.** *(This is what moved FE-22's charge-weighted gap surface — §8 Q5, §3.)*

**`HD-21(a)` — RULED. Ordered OLDEST TREATMENT FIRST**, on the disclosures screen, section two, providers-to-designate. Michael: **"That sounds good."** He scoped it himself mid-exchange — *"we're talking about just the medical tab, right?"* — and the Medical tab's own ordering was raised, overtaken by the mirror ruling, and left open as `HD-21-med`. **`HD-21-med` — RULED 2026-08-31: the Medical tab's own provider list is oldest treatment first too — *"Yes, same order there."*** With ND-7(b)'s *"oldest first is the rule"* (§4) the one order now governs every rendering and both tabs.

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
> **This did NOT by itself answer CD-14's second limb — what he ruled here is *where affiliation history lives*, not what the `renders-care-at` edge type does. The limb was put separately on 2026-08-31 and RULED: the edge carries an EFFECTIVE PERIOD, from and to, blank meaning current — Michael: *"yes."*** (§3, CD-14 row; the `contact-directory.md` §5 act rides the 2026-08-31 packet.)

**THE EDGE'S LITERALS AND ITS FREEZE — RULED 2026-08-31 (late sitting), `AS-Q11`.** `CD-14`(ii) ruled that a period EXISTS; it did not name the columns, and `contact-directory.md` §5 still called the edge type's name *"provisional."* Put with the rename's two other limbs as one question; **Michael's selection: *"All three as proposed: those literals; freeze `renders-care-at`; ONE file, hard-gated on MIG-1."***

| Limb | Ruled |
|---|---|
| **the rename's literals** | `medical_bills.provider_party_id`, `code_mappings.provider_party_id` and `provider_billing_profiles.provider_party_id` → **`facility_party_id`**; the table `provider_billing_profiles` → **`facility_billing_profiles`**, with its index, policy and constraint names renamed alongside (B5, §2). **`form-engine.md` §9's TOKEN NAMES are UNCHANGED** — they already mean the person; only their bindings move. The directory's *"Provider business"* type reads **"Facility."** |
| **the edge** | **`renders-care-at` is FROZEN into the `contact_edges` CHECK** — the name is no longer provisional — **with `effective_from` and `effective_to`** (date, nullable; a blank *to* means current) |
| **the migration** | **ONE amendment migration file** that **HARD-FAILS (`raise exception`) if `to_regclass('public.form_templates')` is null.** `MIG-1` runs FIRST, unchanged, **Michael's hand** |

**AND A SEQUENCING CONSEQUENCE HE WAS TOLD BEFORE HE RULED, not after.** The renamed Supabase adapter selects `facility_party_id` while the live database keeps `provider_party_id` until BOTH migrations run — so **between pulling the build and running `MIG-1` then the amendment file, the live Medical tab (bills, chargemaster memory) FAILS on the renamed column.** The designed path is **both migrations in the same sitting as the pull**; a dual-read instead is an edit to the slice and is his. **The one-slice sequencing that REQ-CAPTURE §2 had delegated is, by this ruling, HIS.**

> **MARKED — the three limbs' descriptions are CLAUDE's; the ruling is *"All three as proposed."*** What is Michael's is the adoption of those literals, the freeze, and the single hard-gated file.

### §17.4 — `HD-2`: the provider block top line is NAME + CREDENTIAL SUFFIX

> *"It'll be **name plus MD or DO or whatever their suffix is**."*

**Nothing about the provider's role in the case on that top line.**

> **MARKED AS A CLAUDE-INFERRED CONSEQUENCE, NOT MICHAEL'S WORDS:** that the suffix therefore has to live on the contact record as its own field, so the app is not parsing it out of a name string.
>
> **READ THROUGH `AS-Q3` (2026-08-31 late), WHICH MOVED WHERE THAT FIELD LIVES.** Under a CASE-SCOPED `R17` an UNPROMOTED extracted individual **has no contact record at all** (§17.1), so the suffix lives on the **case-scoped individual row** — where the extraction puts it, flagged model-extracted and unverified (§17.1a) — and, **after promotion, on the directory contact.** The inference above survives for a PROMOTED individual and is incomplete for the common case. **The `AS-Q8b` LEAD's `{credential}` token reads whichever of the two applies (§11.6).** *Named rather than smoothed: an app that read the suffix only from the contact record would render an empty LEAD for every unpromoted individual.*
>
> **⚠ DO NOT MERGE THIS WITH PART 3's `S1`.** `S1` — *"identity + role descriptor"* — is the NARRATIVE PARAGRAPH's first sentence. `HD-2` governs the BLOCK's top line. They are different objects and the role descriptor is barred from only one of them.

### §17.5 — `HD-17`: the name is **PROVIDER BLOCK**, everywhere

Michael first raised it himself — *"What should we call that paragraph that has the provider names and the facility name and the address? What do we call that?"*, having been calling them *"those little designations"* — and ruled **"provider block."** Asked later whether it replaces the spec's own term: **"No. Let's call it provider block."**

**"Provider identification paragraph" RETIRES. It should be noted as the OLD NAME in `form-engine.md` so no future reader takes it for a different thing.**

> **THREE NAMES, ONE OBJECT — RESOLVED 2026-08-31 (B10).** Part 3 of this file calls it the **CONTACT BLOCK**; `form-engine.md` §3 calls it the **provider contact block**; §9's header calls it the **provider identification paragraph**. `HD-17` retired the third by name; the other two were put — retire both in favour of "provider block" at the next edit? **Michael: *"Provider block at next edit."*** Part 3 is his verbatim and is not edited; **`form-engine.md` §3's term changes by work order in the 2026-08-31 packet**, and the §9 header's old name is noted as the old name per `HD-17`.

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

**`HD-21-b` residue — RULED 2026-08-31: the expanding summary cell is ONE PER INDIVIDUAL — Michael: *"per individual."*** It is the "what each one did" the writer's opening is drawn from (§15.6); visits are detail inside it.

### §17.8 — THE PROVIDER BLOCK OWNS NO DATA

> *"So we have that provider block. The provider block is basically just **calling that same information that is there for every single contact that we have saved**."*

**Two consequences:** fixing the Medical tab makes the §6.1 warning disappear by itself, because it is the same underlying record; and **an address is never edited inside the form.**

### §17.9 — THE IMAGING-ENTITY QUESTION IS AN AMBIENT-PANEL LINE (RULED 2026-08-31, late sitting, `AS-Q12(e)`)

`form-engine.md` §12.7 records an unresolved live-drafting finding — for an imaging entity, **are the names in the records the entity's radiologists, or the REFERRING physicians?** — and getting it wrong designates the wrong person under the wrong causation sentence. **It had no surface.** Put as one of five docs acts; **Michael's selection: *"Adopt all five."***

**It becomes a LINE IN THE §6.1 AMBIENT PANEL for any facility typed `radiologist`** — the ONLY imaging value in the fifteen-type vocabulary (§11.9). *§13.5 RECORDS — as an unobjected inference, expressly NOT separately ruled — that the imaging facility takes no shape of its own; the slice adopts an imaging-facility shape keyed on `radiologist` on that footing, as a DEFAULT. Cited that way rather than as a ruling.* — **flagged, never blocking**, on the §6.1 posture and the §17.6 billing-entity reasoning.

> **MARKED — the panel-line MECHANICS are CLAUDE's; the ruling is *"Adopt all five."*** What is Michael's is that the §12.7 question becomes a panel line rather than staying an unsurfaced spec finding. **Its key (`radiologist`), its never-blocking posture and its wording are Claude's** and are recorded on that footing. **It computes nothing and decides nothing**: it asks him the question §12.7 asks, at the moment the answer matters, and he answers it with the role marker (§17.1a). *Recorded here rather than in §12 because its object is a PROVIDER RECORD, which is what the ambient panel reads.*

## §18 — WHAT IS OPEN, WHAT CLOSED ON 2026-08-31, AND WHAT IS HELD — **REWRITTEN WHOLE 2026-08-31**

**FULL QUESTION TEXT IS CARRIED HERE PER QR-1 for everything still open. Closures below cite the section that carries Michael's words; nothing is closed by this section alone. NOTHING BELOW IS MINTED BY THIS FILE except as §3 records (`R17`).**

### §18.A — The `RC` series (minted 2026-08-22) — disposition after the 2026-08-31 sitting

| ID | Question | Status |
|---|---|---|
| **`RC-1`** | Is the floor FIXED TEXT the engine emits, or a REQUIRED-CONTENT CHECK over model-composed prose? | **CLOSED 2026-08-31** — fixed text; app assembly; four slots; two fixed lists; the custodian sentence the writer's with four limbs required. §11.6–§11.8. |
| **`RC-2`** | Widget G's ID — the provider record — was never actually minted. | **CLOSED 2026-08-31** — **`R17`**, "use that." §3, §17.1. |
| **`RC-3`** | The causation line's ruled wording is SINGULAR; one paragraph per facility makes it COLLECTIVE. How does it inflect for a group? | **CLOSED 2026-08-31** — the plural-token form, "That is the collective form." §15.3. |
| **`RC-4`** | The custodian sentence — the actual predicate language, and Michael's "CPRC eighteen dot zero zero one." | **NARROWED 2026-08-31.** The predicate language is now the four limbs REQUIRED of the writer (§11.6). **What remains is the `CPRC § 18.001` registry candidate — UNVERIFIED; only Michael verifies.** OPEN on that limb alone. |
| **`RC-5`** | Does the pharmacy shape take a basis line at all? | **ANSWERED BY CONSEQUENCE 2026-08-31** — no fixed slots; the writer's paragraph with the custodian sentence. §13.4. |
| **`RC-6`** | The radiologist's causation line is provisional — "until I figure out a better way." | **CLOSED 2026-08-31** — "9.2 approval lifts it." §13.2. |
| **`RC-7`** | Chronology drop zone: accepted formats, and what happens when a new chronology is dropped over an old one? | **CLOSED 2026-08-31** — "Adopt both": any format the model reads, unreadable scans flagged at the drop; versioned, newest goes to the model. §14.1. |
| **`RC-8`** | Widget A — FE-18's wording: adopt / reject / edit. | **CLOSED 2026-08-31** — "Ratify that as the rule's wording." §1.6, §3. |
| **`RC-9`** | Widget E remainder — ND-4, ND-5, ND-6, ND-7, ND-9, one at a time. | **CLOSED 2026-08-31** — all five walked; ND-7(c) held for hands-on by name. §4. |
| **`RC-10`** | Widget H — Q1–Q10; Q2, Q3, Q5, Q6, Q8, Q10 were not walked. | **CLOSED 2026-08-31** — Q2 by consequence; Q3, Q6, Q8 ruled; Q5, Q10 held for hands-on by name. §8. |

### §18.A1 — The `AS` series (2026-08-31, LATE SITTING) — where each ruling LANDED in this file (ADDED BY THE THIRD FOLD-IN, 2026-09-01)

**The eighteen rulings of the amendment-slice sitting, each a SELECTION by Michael among option texts Claude wrote.** **`docs/specs/fe-d1-amendment-slice.md` §2 quotes his selections and is THE GOVERNING RECORD of them; this table says where each one now lives in this file, and nothing more.** Where §2 and any section below differ, **§2 governs and the difference is named.** *(The `AS-Qnn` IDs are PACKET-LOCAL to that slice. They are not durable IDs, nothing mints them here, and they are used below only as pointers into §2.)*

| ID | Ruling, in one line | Folded into |
|---|---|---|
| **`AS-Q1`** | the model call runs in a server-side function holding the credential as a Supabase secret; fixture writer only until `H12-v` | **§16.1a** (new) |
| **`AS-Q2`** | the extraction contract — names, credentials, dates, visit rows, per-individual summary; **never** type, role or facility membership; §17.1a's *"and nothing else"* named a wording defect | **§17.1a** |
| **`AS-Q3`** | `R17` is CASE-SCOPED; promote to the directory by hand; TYPE per case, pre-filled from last time; the model never creates a contact or a link | **§17.1**, and the conformance note at **§1.6** |
| **`AS-Q4`** | extracted TEXT per chronology version in the database; bytes not retained; file store at gate 7 | **§14.1** |
| **`AS-Q5`** | the type vocabulary grows to **FIFTEEN** — mental health, other physician (MD/DO), other licensed non-physician provider | **§11.9** (new), **§11.8**, **§12.3** (invariant 1's scope; the pause distinguished from a stop) — the `form-engine.md` §10 twelve-list divergence NAMED and conformed by work order (§10) |
| **`AS-Q6`** | supplementation: new providers only; base = the app's last GENERATION RECORD, said plainly on screen; assembled paragraphs kept | **§16.5** |
| **`AS-Q7a`** | the custodian-only paragraph is the APP's — §9.11 placed WHOLE; the writer adds only the care-episode clause | **§11.6**, **§13.6** (new) |
| **`AS-Q7b`** | four custodian limbs for the PHARMACY too; §9.10 stays the unedited voice example | **§11.6**, **§13.4** |
| **`AS-Q7c`** | the block's custodian line — Part 3's written form with the count rule; *"Custodian of Records"* when nobody is named; *"Pharmacist(s) and/or Custodian of Records"* for a pharmacy | **§11.4** — **the text act left open by the second edition is DISCHARGED**; the `form-engine.md` §3 divergence NAMED and conformed by work order (§10) |
| **`AS-Q8a`** | §9.1's short causation form for all six medical-probability types; future care in the writer's middle | **§11.6**, **§11.8** |
| **`AS-Q8b`** | the app writes the **bold name LEAD** in front of slot 1; the writer continues after it | **§11.6** — with the LEAD's form on the three non-treating shapes named (pharmacy: the bold facility name; custodian-only: §9.11's own; rider: none) |
| **`AS-Q8c`** | the rider's fixed scope sentence APPROVED AS SHOWN, subject = the mid-level's rendered short name | **§15.6** |
| **`AS-Q9`** | the four interview cards RETIRE for the treating track; the credential guard survives as a writer instruction | **§11.10** (new) |
| **`AS-Q10`** | ONE INSTRUMENT PER PLAINTIFF; provider list and chronology per client | **§15.7** (new), **§14.6** (new) |
| **`AS-Q11`** | the rename's literals; `renders-care-at` FROZEN with `effective_from`/`effective_to`; ONE migration file hard-gated on `MIG-1` | **§17.3** |
| **`AS-Q12`** | five docs acts — (a) `form-engine.md` §2 step 7 states the TRCP 195.2 rule UNVERIFIED with no date computed; (b) the FE-1 ledger pointer; (c) the FE-D1 prompt marked SPENT; (d) writer instructions as versioned template data; (e) the §12.7 imaging question as a panel line | **§18.E** (a) · **§11.10** (d) · **§17.9** (e) · **(b) and (c) LANDED at HEAD 2026-09-01, batch 85 — repo acts, not this file's** |
| **`AS-Q13a`** *(his selection: **"Adopt as proposed"**)* | scope IN / OUT for the build slice — the retained track IN; a minimal per-designation paragraph record IN; `ND-7(a)`'s set check IN; the gap flag's automatic limb IN; the *"affiliation unverified"* line OUT until `CD-14`(i), **with provenance recorded from birth** | **§6.2 signal 5** (the line RULED OUT) · **§18.C** (`CD-14`(i) row) · **§17.1a** (provenance) — *the rest is the SLICE's scope and lives there* |
| **`AS-Q13b`** *(his selection: **"Queue row + log entry; mint the six with the authorization"**)* | the authorization's form: a queue row plus a log entry; **FE-18, FE-19, FE-20, FE-21, FE-22 and `CD-14` MINT with the authorization** | **§18.C** (`FE-D1A-1`, full text) · **§18.G** — **`FE-D1A-1` is OPEN and NOTHING here mints any of the six** |

**WHAT THIS TABLE DOES NOT DO.** It does not authorize the build slice, mint an ID, close a queue row, or add anything to the accepted hands-on queue. **`FE-D1A-1` is OPEN and is Michael's** (§18.G).

### §18.B — The eleven seams the first fold-in surfaced — disposition

| # | Seam | Status |
|---|---|---|
| **B1** | When the engine cannot satisfy a hard stop because the record is incomplete, what does the user see, and can he generate anyway? | **CLOSED 2026-08-31** — "Stop and tell me what to do first." Three tiers; three must-fix absences. §12.3. |
| **B2** | The radiologist's causation object: "the injuries treated" or "the findings identified"? | **CLOSED 2026-08-31** — §9.2 as written carries both his rule 5 object and his 2026-08-22 phrase. §13.2. |
| **B3** | Is `HD-20-b` ruled or open? | **CLOSED 2026-08-31** — "confirm." §16.4. |
| **B4** | "Widget G" names two different acts. | **HALF CLOSED** — the provider-record sense minted (`R17`); **the 2026-08-20 sense, §3's other IDs, is STILL UNTAKEN and is Michael's** (§18.G). |
| **B5** | `provider_billing_profiles` is a TABLE NAME containing the renamed word. | **CLOSED 2026-08-31** — "Rename it in the same slice." §2, `HD-16`. |
| **B6** | Part 3 decision rule 3 depends on Texas scope-of-practice law absent from Part 7's list. Either it joins the list or the rule drops to drafting judgment. | **OPEN — not put 2026-08-31.** Registry question; his. |
| **B7** | Part 7's *Baylor Medical Plaza v. Kidd* parenthetical is a CHARACTERIZATION and under V-9 cannot stand without the court's own document, a paginated vendor copy stating authorship, or Michael's identification. | **OPEN — not put 2026-08-31.** His identification or the document. |
| **B8** | Part 7's deadline authority list is incomplete for what R11 would compute (TRCP 190.3(b)(1)(A) is the Level 2 period only). | **OPEN — an incompleteness flag riding R11's gate, not a legal opinion.** |
| **B9** | Does "nothing lints the drafted text" reach TEMPLATE-RENDERED output? | **DISSOLVED 2026-08-31** — the only template-rendered text is the app's own fixed sentences, which are data. §6.4. |
| **B10** | Three names, one object. | **CLOSED 2026-08-31** — "Provider block at next edit." §17.5. |
| **B11** | Do the 2026-08-21 rulings already answer `RC-1` by implication? | **DISSOLVED 2026-08-31** — fixed text needs no inspection of prose; the 2026-08-21 rulings need no narrowing. §11.6. |

### §18.C — `HD` residue and neighbours — disposition

| ID | Question | Status |
|---|---|---|
| **`HD-10`** | Whether R11's TRCP 195.2 verification is staged as its own registry item. | **CLOSED 2026-08-31** — "Close it by pointing at them": the two register rows at §18.E ARE the verification act. No new item. |
| **`H12-v`** *(the row's actual ID string is `H12-v`, NOT `HD-12-v` — the rename is forward-going only; do NOT renumber it)* | Vendor route for the model call — Bedrock vs OpenAI vs a local model on the P1. Waits on AWS's willingness to sign a BAA for a solo firm and on the malpractice carrier's position. Bedrock leading; **all vendor facts UNVERIFIED.** | **OPEN — MICHAEL'S. DO NOT PUSH.** Not raised 2026-08-31. Has its own queue row since 2026-08-22. |
| **`HD-12-w`** | Will AWS sign a BAA for a solo law firm? | OPEN — Michael's to confirm |
| **`HD-12-x`** | The malpractice carrier's position on AI-assisted drafting over client medical records. | OPEN — Michael's, long-standing |
| **`HD-12-y` / `HD-12-z`** | Token cost per matter (offered, never taken up, unestimated); ZDR endpoint configuration (live only if the OpenAI route wins). | OPEN |
| **`HD-16`** | The rename slice needs a written migration plan: three columns, **the `provider_billing_profiles` table (RULED IN, B5)**, the CD-1 role vocabulary (**to be reconciled to §11.8's type list, now FIFTEEN values — §11.9**), `form-engine.md` §9's tokens, FC-1's canonical form, the 23 seeded token rows, the SKILL, and `variants.ts` regeneration — **and now the fixed-sentence table (§11.8), `R17`'s two new fields (§17.1a), the parts-return contract (§16.4), and — since 2026-08-31 late (`AS-Q11`) — the RULED LITERALS, the frozen `renders-care-at` CHECK with `effective_from`/`effective_to`, and ONE amendment migration file hard-gated on `MIG-1` (§17.3).** | OPEN — a Code-side plan, its own authorization; nothing here authorizes it. **`docs/specs/fe-d1-amendment-slice.md` §5 is the written form of that plan and is PROPOSED, NOT AUTHORIZED — see `FE-D1A-1` below.** |
| **`FE-D1A-1`** *(minted as a queue row 2026-09-01, batch 85; OPEN)* | **Reproduced from the slice's §15, which is what the queue row carries under QR-1: "Does Michael authorize the FE-D1 AMENDMENT SLICE at `docs/specs/fe-d1-amendment-slice.md`, scope IN (§3) and OUT (§4) as written, defaults (§10) as named, to be built by a fresh Opus Code session fired from `docs/prompts/PROMPT-fe-d1-amendment-slice-build-session.md`, the queue runner BARRED, fixture-only, migrations written and not run?"** A YES **mints FE-18, FE-19, FE-20, FE-21, FE-22 and `CD-14` in the same act** (`AS-Q13b`); the other ten §3 IDs stay PROPOSED. **Before he answers, the `AS-Q11` sequencing consequence (§17.3): once the build lands, the live Medical tab FAILS on the renamed column until BOTH migrations have run — `MIG-1` first, then the amendment file, in the same sitting as the pull.** A NO or an edit is recorded in the log and the queue row exactly as given. | **OPEN — MICHAEL'S, and its own fresh Code session when he says YES.** Never the queue runner; **nothing in this file, and no fold-in, authorizes it.** |
| **`HD-20-c`** | Does returned text need bold/italic/paragraph shape preserved, or is it plain text the app formats? | **CLOSED 2026-08-31** — plain text; the app formats. §16.6. |
| **`HD-21-med`** | Is the Medical tab's own provider ordering also oldest-treatment-first? | **CLOSED 2026-08-31** — "Yes, same order there." §17.2. |
| **`HD-21-b` residue** | Is the expanding summary cell one per provider, or one per visit? | **CLOSED 2026-08-31** — "per individual." §17.7. |
| **`CD-14` limb (ii)** | Does `renders-care-at` carry an EFFECTIVE PERIOD? | **CLOSED 2026-08-31** — "yes." §3, §17.3. **Limb (i) — where R6's verification state lives — is still OPEN.** |
| **`HD-3` prior-art** | Michael's claim that contact affiliation history was discussed before. | **UNVERIFIED** — CD-1 input; not put 2026-08-31. |
| **`RF-2`** | Hand in `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` so both unfiled disclosures captures reconcile together; its Q3 and Q5 bear on R2 and R16. **H5: no machine search without his direction.** | OPEN — Michael's hand. |
| **`MIG-1`** | The FE-D1 migration `db/migrations/2026-08-20-fe-d1-form-engine.sql` is reported UNRUN. **Ruled `HD-18`: run it now, unchanged, Michael's hand. Carried unverified and NOT re-asserted here.** | PENDING — Michael's hand. |
| **`RF-5`** | The header label ("Canonical repo path WHEN FILED") and the convention question underneath it (§19). | OPEN — put at `#136`, not reached since. This file's own header now reads "Canonical repo path" because the file is at HEAD; the convention question stands. |

### §18.D — The 2026-08-20 questions — disposition

**Q2** answered by consequence (§8) · **Q3** RULED (§8) · **Q5** HELD for hands-on (§8, §18.F) · **Q6** RULED (§8) · **Q8** CONFIRMED (§8) · **Q10** HELD for hands-on (§8, §18.F) · **the §0.2 master-skeleton capture's own Q3 and Q5**, which are DIFFERENT QUESTIONS sharing the same numbering, wait on `RF-2`.

### §18.E — GATED, and it stays gated

**`R11` — the TRCP 195.2 designation deadline.** **GATED on Michael's verification of TRCP 195.2.** No registry entry exists; the playbook E1 row carries an unresolved 90/60-vs-60/90 conflict flag, and that flag must ride the number at every point of use. **NOTHING IN THIS FILE — AND NOTHING IN ANY SITTING SINCE 2026-08-20, INCLUDING BOTH 2026-08-31 SITTINGS AND THE 2026-09-01 FOLD-IN — HAS COMPUTED, DISPLAYED, OR PROPOSED A DESIGNATION DEADLINE.** A "proposal for confirmation" is still a computed date. **His act, and still the cheapest unblock in this capture.**

**THE GATE GAINED A SURFACE WITHOUT GAINING A DATE — RULED 2026-08-31 (late sitting), `AS-Q12(a)`.** `form-engine.md` §2 step 7 had carried a *"computed 195.2 designation deadline shown in-flow"* — a computed date inside a gated rule. **Michael's selection: *"Adopt all five."*** **Step 7 now STATES THE RULE, marked UNVERIFIED, and computes and displays NO DATE until TRCP 195.2 is verified.** *Landed at HEAD 2026-09-01, batch 85. **The gate is unchanged; what changed is that the spec no longer describes a computation the gate forbids.***

> **THE UNBLOCK IS ALREADY ON THE REGISTER (found 2026-08-25; `HD-10` closed onto it 2026-08-31).** `R11` itself has no row. Its UNBLOCK has two, both in the register, classified LIVE:
> - *"`TRCP 195.2(a) and (b)` — **the most expensive thing on this list to miss.** Are the 90-day and 60-day offsets from the discovery-period end correct?"*
> - `[DL-memo Q4]` — *"Rule 195.2's 'later of … 30 days after the request is served' floor is **GONE** from the July 2026 text… Do you verify that the floor is gone?"*
>
> **Verifying those two rows discharges the gate** — and the second one is news the disclosures thread never had: the floor this module would have computed against may not exist any more. Michael, 2026-08-31, on staging a separate item: *"Close it by pointing at them."*

### §18.F — HELD FOR HANDS-ON — on the CC-1 HANDS-ON QUEUE, which is NO LONGER EMPTY

**On 2026-08-31 Michael accepted the whole proposed set onto the CC-1 hands-on queue — *"Accept all of them onto the queue"* — TWENTY-ONE items.** Sixteen pre-existing: `#137`'s four (`DA-1`, `DA-3`, `DA-4`, `FO-6`) and the 2026-08-24 audit's twelve (`CL2-AC-1`, `CL2-CHECK-1`, `FE-§11.4`, the bill-label pre-fill, `CR-7`, `CR-CONSTRAINT`, `Q-FE6-5`, `Q-FE4-1`, `Q-FE5-3`, `Q-IN2-7`, `Q-IN1-1`, `Q-IN3-6`). **And five from this file's own thread, each held with its full question:**

| Held item | The question | Build default while held |
|---|---|---|
| **the stop's SHAPE** (§12.3) | When a must-fix condition fires — no incident date, no facility name, no facility type — is the stop a must-fix tier inside the `HD-1` panel, or a dialog on the generate button? | none needed to build the rule; the surface is his |
| **ND-7(c)** (§4) | A provider on the charges table has no designation paragraph: warn (panel tier) or stop (must-fix tier)? Michael: *"Im not sure when this will become an issue. There is always a provider with a facility."* | a PANEL LINE, never a stop — PROVISIONAL |
| **Q5** (§8) | The gap flag's trigger — absolute dollar, percentage of the damages total, rank, or attorney-set? | none; the flag's surface (the ambient line) is settled |
| **Q10** (§8) | The custodian-degradation threshold (FE-22). | none; the automatic limb and the persisted gap flag survive |
| **the rider's supervisor** (§15.6) | Beneath a COLLECTIVE paragraph, what does the fixed scope sentence's `{supervising_provider}` name — the group, or a supervisor Michael designates by hand? | GROUP FILL — PROVISIONAL |

**CC-1(c) was discharged in session: Claude said unprompted that the queue is worth an hour, that it needs the product in front of him, and that it is a SEPARATE sitting.** Nothing on this list is decided by a build slice; the defaults above are named so a slice can proceed without deciding them silently.

#### FOURTEEN MORE, **PROPOSED AND NOT ACCEPTED** — from the 2026-08-31 late sitting (recorded by the third fold-in, 2026-09-01)

**⚠ THE ACCEPTED COUNT IS AND STAYS TWENTY-ONE.** The items below were PUT by `docs/specs/fe-d1-amendment-slice.md` §15 and **Michael has not ruled on any of them.** **A spec cannot add to a queue he accepted**, `FE-D1A-1` does not put them, **and a YES to `FE-D1A-1` neither accepts nor declines them.** They are carried to the hands-on sitting as PROPOSALS, each his item by item there. **The build takes the default beside each meanwhile and REPORTS IT AS A DEFAULT TAKEN.**

**FOUR QUESTIONS, each with its full text:**

| Proposed item | The question | Default while it waits |
|---|---|---|
| **`AS-Q14`** — a NEW treating individual at an ALREADY-DESIGNATED facility after service | The client went back and saw a new surgeon at a hospital already designated. His §16.5 words: *"the client went and was seen by an additional provider … these different things need to be noted in the new expert designation paragraph."* Under `ND-1` the provider is the PERSON, so the ruled requirement is a new paragraph for the new individual — but the facility is already designated, and re-selecting it regenerates the WHOLE facility paragraph. **(a) A second block for that facility naming only the new individual; (b) re-designate the facility whole; (c) hand-edit in Word?** | the supplement screen names the new individuals and the re-selection path is open; **the paragraph record stores `individual_ids` so (a) is buildable later with no backfill** |
| **`AS-Q15`** — a mid-level with NO treating paragraph to ride | An ER whose extraction found two radiologists and a PA but no EM physician; a facility whose only named individual is a PA. **A rider under the radiology paragraph, a rider under §9.11, or no rider?** | **NO rider, and the mid-level is NOT on the block either** — a named person with no testimony is the `ND-1` shape; the missing-treating-physician panel line fires at a non-radiologist facility. **Both limbs are his** |
| **`AS-Q16`** — hand-added individuals on a PHARMACY or CUSTODIAN-ONLY facility | Michael types a name onto a facility whose paragraph designates only the custodian. **Render them on the block above that paragraph, or not?** | **not rendered**; a panel line says to retype the facility or remove them |
| **`AS-Q17`** — the MENTAL-HEALTH marker on an individual at a facility of another type | A psychologist extracted at a hospital typed emergency medicine. **Does §5.1's hard pause fire on the MARKER, and is the individual designated in the treating paragraph under its medical-causation sentence, or left to a hand-drafted paragraph as a mental-health FACILITY is (§11.9)?** | **the pause fires**; the individual stays on the block and is **EXCLUDED from the generated paragraph and its LEAD**; the paragraph is hand-drafted in Word — `AS-Q5`'s ruled pattern for the type, applied per individual, **because designating a psychologist under an EM causation sentence is the served assertion §5.1 exists to pause.** If the facility then has no treating individual left, it renders the block with **NO generated paragraph and no custodian-only fallback** — the type's behaviour |

**AND TEN DEFAULT-SHAPED ITEMS, each a surface a build would otherwise settle silently** — the twelve-name rendering · the pronoun default · the custodian clause's form · **the *"Currently practicing at …"* sentence (a TEXT ACT in a SERVED block, for his eye before any real record — §1.6's conformance note)** · the Medical-tab layout · **the block literal at N ≥ 2 (§11.4)** · the PT/DPT honorific · the mid-level short name's title table beyond Mr./Ms. (§15.6) · the multi-client title and caption (§15.7) · per-paragraph regenerate. *Each is carried with its default in the slice's §10; none is ruled and none is accepted.*

### §18.G — Still Michael's, unchanged by the 2026-08-31 sitting

**`FE-D1A-1`** — **NEW, and the one act the record now asks of him**: authorize the FE-D1 amendment slice, or not (§18.C carries the full question; a YES mints the six IDs of `AS-Q13b` and nothing else does) · **§3's sixteen durable IDs** (widget G's 2026-08-20 sense — item by item or as a group; put with the 2026-08-31 packet) · **`RF-2`** · **`MIG-1`** · **`H12-v` and its limbs** · **`HD-3`'s prior-art claim** · **B6, B7, B8** · **`RC-4`'s registry candidate** · **`CD-14` limb (i)** · **`RF-5`** · **the TRCP 195.2 verification** (§18.E) · **the retained-expert capture** (Q6).

**AND ONE PUT BY THIS FOLD-IN, 2026-09-01 — `FE-18`'s WORDING, on the selection reading.** **Does Michael re-ratify FE-18's operative sentence to read the SELECTED facility, or does he leave the ratified edge wording as it stands with D-8 governing what the app does?** FE-18's ratified text reads the designee's 195.5(a)(1) address and telephone from *"**the facility** at the far end of a `renders-care-at` affiliation edge"*; **`AS-Q3` puts the provider block on the SELECTED facility**, because a case-scoped `R17` gives an unpromoted individual no edge at all. **The two are reconciled by D-8 — the block always reads the selection; a period-covering edge naming a different facility is a PANEL LINE, never a substitution — and the app's behaviour is settled either way.** What is not settled is whether the RULE'S OWN WORDS should still speak in the edge's terms. **Ratified wording is his; this fold-in added a conformance note beneath it (§1.6) and edited nothing.** *Three answers are available and none is recommended over the others here: re-ratify to the selection reading; leave the wording and let D-8 govern; or reword to carry both limbs expressly.*

> **THE POINTER THAT SAT HERE IS SPENT AND IS GONE — 2026-09-01, third fold-in.** From 2026-09-01 (batch 85) until this edition, a blockquote in this position said that eighteen further rulings of 2026-08-31 lived in `docs/specs/fe-d1-amendment-slice.md` §2 and in the session log, that **§§11–§18 did not yet carry them**, and that *"the THIRD FOLD-IN is owed and is an Opus design session's act."* **It is discharged: §§11–§18 carry them, §18.A1 says where each one landed, and the pointer is replaced rather than left standing beside the fold it asked for** — the file's own rule, *"nowhere in this file does an old account of a ruling sit next to the new one."* **The slice's §2 remains the governing record of Michael's selections themselves; where this file and §2 differ, §2 governs and the difference is named.** *In particular the reading the pointer previewed is now a section: §17.1a names "and nothing else" a WORDING DEFECT and states the extraction contract in full.*

## §19 — `RF-5`: the header label, and the convention question underneath it

**The problem, and it is real: on an UNFILED draft, a line reading "Canonical repo path:" reads as an ADDRESS when it is an INTENTION. At least four sessions read it that way** — which is part of how a file everyone believed was filed sat unfiled for five days.

**Two questions were travelling as one, and they separate cleanly:**

**(1) This file.** The packet carrying the first fold-in ran at `7a7f797` (batch 83, 2026-08-31), **the path became an address, and the problem dissolved for this document.** The header of this second edition therefore reads "**Canonical repo path**" without the qualifier — true, because the file is at HEAD. **No ruling was needed and none was taken.**

**(2) The convention for FUTURE REQ-CAPTURE drafts — this is the actual open question, and it is Michael's.** Should every REQ-CAPTURE draft carry "**Canonical repo path WHEN FILED**" (or "**DESTINATION**") until it is filed, as a format convention? **PROPOSED at `#136`, UNRULED, not reached on 2026-08-31, and PUT rather than assumed here.**

*Recorded because it is a small instance of the general pattern: an offered option turned out to be two, and saying so before recommending is CC-1(a).*

---

**END OF FILE.** Nothing below the line was ruled by any of the three fold-ins; this document records rulings, it does not make them. **Third edition, 2026-09-01.**
