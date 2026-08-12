# REQ-CAPTURE_roster-mining-pass_2026-08-11

Destination: "Project Management Software" design project, by Michael's hand, per REQ-1.
Client-clean by construction. IDs below are packet-local; durable IDs assigned at design-side reconciliation.
This is the one bounded evidence pass gating the CD-1 contact-directory design session (ruled 2026-08-11, design session #47, ruling 4 as revised). It is a CAPTURE, not a design: it reports what the document bank shows and proposes no schema.

---

## §1 Context

One roster-mining pass over the practice's document bank: 85 documents staged and mined from two sources — the practice's current forms/templates bank (petitions, outbound discovery sets, response shells, disclosures, criminal-side forms) and a prior-firm forms/exemplar/library bank (petition and discovery exemplars across many postures, form libraries, and a small number of filed real-case documents kept as examples). Only captions, party paragraphs, and service paragraphs were read for roster structure; instrument substance was ignored. Standing instruction from the attorney for all future drafting: **formatting authority comes from the current-practice bank only; the prior-firm bank is content-only** (its formats are expressly non-authoritative).

Instrument mix mined: original/amended petitions (state district and county courts, one federal complaint, one FTCA complaint), outbound interrogatory/RFP/RFA sets, discovery responses and disclosures, plus roster-bearing procedural instruments (scire facias, suggestion of death, guardian-ad-litem application, lead-counsel designation, criminal-side motions and appearances, expunction and occupational-license petitions, interpleader).

Case types actually evidenced: MVA (simple through multi-party), trucking/commercial vehicle, premises, UIM/UM first-party, insurance/DTPA (coverage, bad faith, judgment-creditor posture), governmental-unit tort (municipality, county, transit authority, school district, state agency, federal sovereign), bailment/conversion, builder/contract-warranty, assault, sports-injury-to-minor, deceased-defendant postures, interpleader, criminal defense, expunction, occupational driver's license. **No probate-court matters (heirship, estate administration, will contests) were found in either bank** — see §5.

---

## §2 Requirements observed

Numbering is packet-local. Each item: practice moment → capability observed as needed → priority instinct.

### A. Per-case-type role constellations observed

**REQ-01 — MVA (noncommercial) baseline pair.**
Practice moment: the single most repeated caption across both banks is one injured individual plaintiff v. one individual driver defendant; the current-practice bank keeps a dedicated "1P 1D" petition.
Capability: the intake roster for an MVA must start from a two-slot baseline (injured person; adverse driver) that nearly every file of this type uses.
Priority: now.

**REQ-02 — MVA expansion roles.**
Practice moment: repeated variants layered on the baseline: (a) passenger co-plaintiff, frequently sharing surname/household with the driver-plaintiff (spouse implied, rarely pled); (b) vehicle owner-entrustor as second defendant (negligent-entrustment posture), frequently sharing surname and service address with the driver; (c) parent suing individually AND as next friend of one or more minors; (d) fully multi-party forms (e.g., 4 plaintiffs v. 4 defendants, with two defendants sharing a residence). One bank organizes petitions BY these variants (single-v-single, multiple-v-single, multiple-v-defendant-plus-insurer), i.e., the party-constellation IS the template taxonomy.
Capability: MVA intake slots should distinguish expected (injured person, adverse driver) from optional-but-recurring (passenger co-plaintiff, owner-entrustor, next-friend/minor group, UIM insurer joined).
Priority: now.

**REQ-03 — Trucking/commercial constellation.**
Practice moment: trucking exemplars consistently pair the individual driver with an employer motor carrier; observed extensions include a fleet-leasing/mobility company distinct from the operating employer (lessor/lessee), a corporate employer distinct from the named carrier, two carrier entities in one caption, a staffing-type entity behind the driver (joint-enterprise theory), and the fully collapsed form: a single natural person sued as individual d/b/a a trucking operation — driver, carrier, and owner in one party. Foreign-resident drivers (service abroad) and substituted service (Secretary of State; Transportation Commission chair) appear in this type specifically.
Capability: trucking rosters need a many-entity defendant side with role labels (driver / carrier / lessor / owner / employer / trainer / parent entity / staffing), tolerance for role collapse into one person, and service-path attributes that vary by role.
Priority: now.

**REQ-04 — Premises constellation and the entity stack.**
Practice moment: premises captions repeatedly stack: operator entity (very often sued under a d/b/a trade name), property-owner entity, management/realty company, contractor(s) who created the condition, individual store employee/manager, and John Doe placeholder. Observed extremes: five entities in one caption (tenant/operator + building entity + owner + management company + John Doe); two SEPARATE corporations behind ONE shared d/b/a storefront; operator and owner linked through overlapping registered-agent addresses.
Capability: premises intake must model a stack of related entities behind one storefront, not a single "the defendant" slot; d/b/a is a first-class naming attribute, and a trade name may map to more than one legal entity.
Priority: now.

**REQ-05 — UIM/UM inversion: the tortfeasor is not a party.**
Practice moment: in first-party UIM/UM petitions the caption defendant is the plaintiff's own insurer (sometimes plus an individual adjuster employed by it); the at-fault driver appears only in the fact narrative — or is a phantom/unknown driver named nowhere. Hybrid forms also exist joining tortfeasor driver AND UIM insurer in one caption.
Capability: the roster model must carry a central actor who is NOT a party (at-fault driver, phantom driver) with a role, because discovery and the narrative revolve around them; and must allow the same case type to appear in insurer-only, tortfeasor-only, or joined captions.
Priority: now.

**REQ-06 — Insurance/DTPA postures.**
Practice moment: observed rosters: insured v. insurer + rideshare platform (coverage-gap; neither defendant is the tortfeasor); insured v. insurer + individual adjuster (bad faith); judgment creditors v. the TORTFEASOR'S insurers and their affiliated group entity (post-judgment posture — plaintiffs are not the insureds); couple v. individual informal financial advisor (DTPA fraud).
Capability: roles needed: first-party insurer, adjuster (individual employee of insurer), platform/TNC, insurer-of-adverse-party, insurer group parent/affiliate; the "who is whose insurer" relationship matters more than the party list itself.
Priority: soon.

**REQ-07 — Governmental-unit family.**
Practice moment: recurring single-defendant captions against: municipality, county, transit authority, independent school district, state agency, federal sovereign (FTCA — United States as the only defendant). One exemplar joins the governmental unit WITH its individual employees. Every governmental defendant carried a role-specific statutory service path (city manager; superintendent; executive director; district attorney's office answering for the county; U.S. Attorney General + U.S. Attorney).
Capability: a governmental-unit party kind whose service path and notice prerequisites are attributes of the role; awareness that joining the unit and its employees together is a distinct (and legally consequential) constellation.
Priority: soon.

**REQ-08 — Small-business civil constellation (entity + principals).**
Practice moment: bailment/conversion and builder/warranty petitions repeatedly sue an LLC together with its individual principal(s) — including the pattern where one individual co-defendant IS the entity co-defendant's registered agent (one service address covers both), and the pattern where the oral agreement underlying the claim was made with one individual but the entity and a second family-member individual are sued as well.
Capability: entity defendants need person-links (principal-of, registered-agent-of, family-of) because the same natural person occupies multiple boxes in one caption.
Priority: soon.

**REQ-09 — Criminal-side caption inversion.**
Practice moment: the criminal forms bank captions every instrument State of Texas v. [client]; cause numbers carry a -CR suffix; one motion form carries MULTIPLE cause numbers under one caption; ex parte instruments (habeas application, expunction petition, occupational-license petition) have NO adversary in the caption at all — a petitioner only, with the State/agencies as implied respondents.
Capability: intake must support the client-as-defendant orientation, State-as-adverse-party, multi-cause-number matters, and adversary-less ex parte captions.
Priority: soon.

**REQ-10 — Deceased-party mechanics (the estate-adjacent cluster).**
Practice moment: a dedicated cluster of forms handles the death of a defendant: suggestion of death; scire facias to substitute heirs/representatives (issued in the name of THE STATE OF TEXAS, with an officer's-return block — not a plaintiff-v-defendant instrument at all); petitions filed directly against an estate representative; one petition against a representative of the estate of a decedent who had a formerly-known-as name (three layers of naming: representative → estate → decedent-with-alias); a caption that still names the decedent while the body names the representative.
Capability: parties need lifecycle states (living/deceased), substitution links (representative-of, heir-of, next-of-kin-of), and alias chains; the roster changes mid-case by operation of procedure.
Priority: soon.

### B. Typed relationships observed (cross-type)

**REQ-11 — Relationship inventory.**
Practice moment: relationships that recur across the bank, stated or implied: employer/employee (carrier-driver; insurer-adjuster; store-employee; governmental unit-employee); owner-entrustor/driver; lessor/lessee (fleet); parent/subsidiary and affiliate/group (carriers, insurers, premises LLC families with related naming); d/b/a (individual-to-trade-name AND entity-to-trade-name, including one-trade-name-many-entities); insurer/insured (first-party); insurer-of-adverse-party; next-friend-of (parent-minor); spouse/household (usually implied by shared surname + address, rarely pled); heir-of / representative-of-estate / next-of-kin-of; principal-of / registered-agent-of; contractor/premises-owner; manufacturer/retailer chain; platform/driver (TNC); attorney/client (appearing inside rosters — see REQ-14); bailor/bailee; joint enterprise.
Capability: typed, directional party-to-party links are a real observed need, not a nicety — several liability theories in the bank are ONLY expressible as a relationship (entrustment, respondeat superior, alter ego).
Priority: now.

**REQ-12 — Capacity multiplicity.**
Practice moment: one natural person repeatedly occupies several party slots at once: "individually and as next friend of [minor 1]" and "as next friend of [minor 2]" (three capacities, one human); "individually and d/b/a [business]"; estate representative capacity. A minor plaintiff appears pseudonymized by initials while the next-friend parent is fully named.
Capability: person ≠ party: a party is (person × capacity), and display/pseudonymization rules can differ per capacity.
Priority: now.

### C. Frequency signal

**REQ-13 — Expected vs. optional slots, as the bank shows them.**
Nearly-every-case roles per type: injured individual plaintiff (all civil PI); individual adverse driver (MVA/trucking, except UIM-only captions); motor carrier (trucking); operator entity (premises); first-party insurer (UIM/UM); governmental unit (TTCA-type); State of Texas (criminal). Recurring-but-optional: passenger/spouse co-plaintiff; next-friend + minor(s); owner-entrustor; lessor; management company; contractor; individual employee/manager; adjuster; John Doe; platform; estate representative/heirs; second/affiliated entity behind the same trade name or group. Rare-but-formed (dedicated form folders exist, so the practice plans for them): deceased-defendant substitution, interpleader, ad litem appointment, federal sovereign.
Capability: intake slot design can distinguish expected / optional / rare-with-procedure per case type on the direct evidence of the bank's own folder taxonomy.
Priority: now.

### D. What breaks the roster model (counterexamples — the valuable part)

**REQ-14 — Rosters that are not plaintiff-v-defendant.**
Observed: interpleader (a stakeholder plaintiff against claimant-"defendants" who include a federal tax agency, health insurers/subrogees, a military hospital, and the injured claimant's OWN law firm); a federal certificate of interested parties (a roster of ALL interested persons including both sides' counsel — a list about the case, not a side); scire facias (clerk-issued, State-of-Texas-named, no adversarial roster); ex parte petitions (no adversary at all); ad litem appointment (a court-appointed participant joins mid-case because the parent's and minor's interests may conflict — the roster grows by court action, not by pleading); reserved slots for unnamed third-party defendants and intervenors in a disclosure form.
Capability: any roster model with exactly two sides will fail on documents the practice demonstrably files; sides must be a property of the case type, not a constant.
Priority: now — as a design constraint before CD-1 fixes anything.

**REQ-15 — Non-party actors carry the case.**
Observed: the at-fault driver in UIM/coverage cases (never a party); a specific non-party employee (and that employee's supervisor) whose records an entire premises discovery set targets through the entity defendant; treating physicians named throughout disclosures; a deposition outline for a non-party witness affiliated with an owner-side entity. Contact-directory implication observed, not designed: the documents constantly name people who are not parties but must be tracked with roles.
Priority: now (this is the CD-1 gate finding).

**REQ-16 — Caption-body drift is endemic in a file-copy practice.**
Observed across BOTH banks, repeatedly: caption plaintiff ≠ body plaintiff (two different documents); caption insurer ≠ body insurer; petitioner in caption ≠ name in the "comes now" line; filename party ≠ caption party; store number in caption ≠ store number in the request bodies; parties present in the body but missing from the caption (contractors added by amendment); "Defendants" plural for one defendant and singular "Plaintiff" for two, gendered-pronoun drift; venue county in caption ≠ service paragraphs; a premises fall referred to as "the collision"; court-type hybrid captions (county court + judicial district in one caption); an entity named as a party with no discernible legal form ("[Name] Ranch"); reused cause numbers across unrelated form files.
Capability observed as needed: this error CLASS is the single strongest practice argument in the bank for a roster-driven document engine — if the party list is data and captions/bodies/titles render from it, every one of these defects becomes unrepresentable.
Priority: now.

**REQ-17 — The bank encodes variation by file proliferation.**
Observed: gender/number variants exist as separate files (M-v-M, F-v-M, M-v-F, MULTIPLE-v-M, with-UIM and without); one legacy file implements a folk merge system — numeric placeholder tokens for party names, pronouns, possessives, county, and service address, with a field map at the top of the file. Someone in this bank's history already invented merge fields by hand.
Capability observed as needed: party attributes (gender/pronoun set, number) drive text generation today via file multiplication; the observed numeric-token file is direct evidence the practice wants parameterized rendering.
Priority: now.

**REQ-18 — Source trust levels in a two-bank world.**
Practice moment: the attorney's standing instruction for this pass — current-practice bank is format-authoritative AND content source; prior-firm bank is content-only, formatting expressly ignored. Several prior-firm exemplars are additionally flagged in-place as defective ("BAD DO NOT USE" folder) yet retained for reference.
Capability observed as needed: template/exemplar provenance (format-authoritative vs. content-only vs. known-bad-kept-for-reference) is a real attribute the practice already maintains informally through folder names.
Priority: soon.

**REQ-19 — Service path is a party attribute, and it varies wildly.**
Observed service modes tied to specific party roles: registered agent (entities); individual at residence; foreign-country service (driver abroad); Secretary of State substituted service; Transportation Commission chair; city manager; school superintendent; agency executive director; U.S. Attorney General + U.S. Attorney; district attorney answering for a county; service "through" the estate representative; one address serving two parties (individual who is also the co-defendant entity's registered agent).
Capability observed as needed: each roster entry carries its own service story; the same natural person can be a service target in two capacities.
Priority: soon.

---

## §3 Data-model and template implications

Reported as observations of structure in the documents — no schema proposed.

- Party entries in petitions consistently decompose into: name (+ alias forms: d/b/a, f/k/a, entity suffixes), party kind (natural person / entity / governmental unit / sovereign / estate / trade name), side/alignment (which is NOT always plaintiff-or-defendant — see REQ-14), capacity (individually; as next friend of X; as representative of the estate of Y), residence/citizenship recital, and a service block (mode + agent + address).
- Recurring merge-field candidates actually seen as blanks or tokens in the banks: cause number, county, court number/judicial district, party names, pronoun/possessive sets, service addresses, incident date, store/vehicle identifiers. The legacy numeric-token file's field map is a ready-made merge-field inventory.
- Caption grammar observed: plaintiff block § defendant block § court block; "ET AL." truncation in short captions while the body carries the full roster — i.e., documents already distinguish a short-form roster from a full roster.
- Role-labeled placeholders exist in the wild: one form caption literally reads a role ("DRIVER AND VEHICLE OWNER") where names would go — the practice already thinks in roles at the caption level.
- Relationship-bearing boilerplate recurs: course-and-scope/respondeat-superior paragraphs (employer link), entrustment paragraphs (owner link), alter-ego-flavored joint suing of entity + principal, "acting through its agents, servants, and employees" (entity-to-unnamed-agents link).
- Instrument-level roster scoping: discovery sets are addressed to ONE party of a multi-party roster (per-defendant sets to driver vs. carrier; per-defendant disclosure responses); response documents restate the requesting party. An instrument therefore references both the full case roster and a target subset.
- Templates in the current-practice bank already separate: petition shells by case type, outbound request sets by case type, response shells, and per-court procedural forms (county-specific appearance/waiver forms) — the county/court is a template axis of its own.
- Two-bank provenance (format-authoritative vs. content-only) per REQ-18.
- Template-library note per standing convention: no new template files were created this session; this packet's §2 constellations are the seed inventory for future `template_petition_*` variants.

---

## §4 Legal propositions relied on

All UNVERIFIED; registry candidates only; none asserted to any court or counsel. This pass relied on law only lightly (roster structure, not substance):

- TRCP 152 (and related scire facias practice) — substitution upon a defendant's death; basis of the deceased-defendant cluster read in §2 REQ-10. UNVERIFIED.
- TRCP 193.7 — self-authentication notice language observed in petitions; treated only as a recurring petition component. UNVERIFIED.
- TRCP 194 (post-2021 initial disclosures) — disclosure instruments read as roster-bearing documents. UNVERIFIED.
- CPRC § 17.044 (Secretary of State) and § 17.062 (Transportation Commission chair) — substituted-service modes observed in commercial-vehicle exemplars. UNVERIFIED.
- CPRC § 17.024 (service on governmental units through named officers) — observed statutory service paths for city/county/school district. UNVERIFIED.
- CPRC § 101.001 et seq. (TTCA), incl. the § 101.106 election-of-remedies concern where a governmental unit and its employees are joined. Read only as explaining an observed constellation. UNVERIFIED.
- FTCA (28 U.S.C. §§ 1346(b), 2671 et seq.) — United States as sole proper defendant; observed in one complaint. UNVERIFIED.
- Property Code ch. 142 / ad litem practice under TRCP 44 & 173 — minor-settlement ad litem appointment observed. UNVERIFIED.

---

## §5 Open questions for the design side

Full question text per convention:

1. No probate-court documents (heirship applications, estate administrations, will contests, guardianships) were found in either bank, although probate was named in the mining scope. Should the CD-1 contact-directory design (a) defer probate roster modeling entirely until real probate documents enter the drafting workspace, or (b) reserve now for the one probate-adjacent pattern the PI documents already prove (estate representative / heirs / next-of-kin as substituted or original parties per REQ-10), on the theory that the same relationship types will carry over?
2. The documents constantly name non-parties with case-critical roles (at-fault driver in UIM cases, non-party employee targeted by discovery, treating physicians, adjusters, deponent witnesses). Does the contact-directory scope for CD-1 include non-party actors with roles from day one, or is CD-1 parties-only with non-parties deferred? The mined evidence says parties-only would miss the people much of the drafting actually revolves around.
3. Counsel appear inside roster-bearing instruments (certificates of interested parties listing both sides' lawyers; lead-counsel designations; appearance forms; an interpleader suing a claimant's law firm). Should attorneys-of-record be modeled in the same directory as parties (with a role), or in a separate structure? The documents show them entering the same lists.
4. Caption-body drift (REQ-16) is the most frequent defect class in the bank. Should the design side treat "captions/titles/pronouns render from roster data and cannot be hand-edited out of sync" as a hard requirement of the document engine, or as a lint/validation layer over free-form editing? The observed error rate argues for the former; drafting flexibility may argue for the latter.
5. One trade name mapped to two distinct corporations in a single premises caption, and single natural persons appeared under multiple capacities and as both defendant and registered agent. When the design side reconciles this packet, does the contact directory need identity resolution (same human/entity across roles, cases, and aliases) at CD-1, or is per-case identity sufficient for the drafting engine's first consumer?
6. The two-bank provenance rule (format-authoritative vs. content-only per REQ-18) came from the attorney as a standing instruction during this pass. Should source-trust level become an explicit attribute in the template library design, and does the "known-bad, kept for reference" category deserve first-class status given a defective exemplar was found filed alongside good ones?

---

# RECONCILIATION ADDENDUM — design session 2026-08-12 (Fable 5)

Reconciled per REQ-1 against BUILD-STATE (157e792, 2026-08-11) and session log through #48 BEFORE
staging. Third REQ-CAPTURE through the REQ-1 channel; this is the bounded-evidence-pass capture
commissioned by #48 ruling 4, so **with its reconciliation the CD-1 gate is MET.** No collisions
with closed items; no anti-resurrection-ledger collisions; no build claims (a capture by design).
Client-clean verified (case types and postures only). Packet-local REQ-nn IDs are retired here;
dispositions RULED by Michael, 2026-08-12, item by item.

Because this capture was commissioned as CD-1 session input, the reconciliation deliberately mints
FEW durable IDs: most items are the evidence CD-2 was created to receive, and nineteen
near-duplicate entries would recreate the duplication class the CL2-AC-1 dedup ruling killed.

## Dispositions (RULED 2026-08-12)

| Packet-local | Disposition |
|---|---|
| REQ-01–REQ-10, REQ-13 | No new IDs — CD-2 evidence and CD-1 session input. This doc (preserved in full at docs/specs/) is the source of record; CD-2's queue entry annotated with the pointer. |
| REQ-11, REQ-12 | CD-2's relationship layer and the person-×-capacity schema principle — CD-1 session inputs, no new IDs. |
| REQ-14 | Named design-constraint line inside CD-1's queue entry: sides are a property of the case type, not a constant; any two-sided roster model fails on documents the practice files. |
| REQ-15 | The CD-1 gate finding — annotates CD-1; its scope question (§5.2) enters the CD-1 session questions. |
| REQ-16 | **FE-11** — caption-body integrity: captions/titles/pronouns render from roster data; §5.4's fork (hard requirement vs. lint over free-form editing) rides in the question text. Distinct from FE-9 (family drift): FE-9 compares documents to each other; FE-11 compares documents to the roster. Interacts with FE-8's diff model — attorney edits are expected input, not defects. |
| REQ-17 | Evidence for form-engine §3's grammar/inflection design — content route, no ID. |
| REQ-18 | **FE-12** — template/exemplar provenance attribute (format-authoritative / content-only / known-bad-kept-for-reference); §5.6 rides in. The standing two-bank instruction is recorded as an ATTORNEY INSTRUCTION OF RECORD, binding on drafting regardless of how FE-12 resolves: current-practice bank is format authority; prior-firm bank is content-only. Cross-linked to FE-7 (distilled templates arrive born format-authoritative) and the docs/templates/ home. |
| REQ-19 | CD-2 evidence (service block per roster entry), cross-linked to IN-4 (service execution). |
| §5.1, §5.2, §5.3, §5.5 | CD-1 session questions, full text per QR-1 (probate defer-vs-reserve; non-party scope; attorneys-of-record; identity resolution vs. per-case identity). |
| §5.4 / §5.6 | Ride inside FE-11 / FE-12 respectively. |

## §4 status change (RULED 2026-08-12 — supersedes the §4 header above for status only)

The §4 header "All UNVERIFIED" was true when authored. Michael ruled entry by entry on 2026-08-12,
each proposition's wording on screen:

- TRCP 152 / scire facias practice — **VERIFIED — Michael, 2026-08-12.**
- TRCP 193.7 — **no second entry**: the existing registry entry (VERIFIED 2026-08-11, trucking
  packet) gains this capture's petition-boilerplate context as a second observation. One
  proposition, one home.
- TRCP 194 — **EXPANDED at Michael's direction and VERIFIED as expanded — Michael, 2026-08-12.**
  The expanded wording enumerates his four-category working list (identities of alleged responsible
  third parties; witnesses/persons with knowledge of claims and defenses; insuring agreements;
  identification/production of documents intended for use in prosecution/defense) and grounds IN-5.
- CPRC §§ 17.044 / 17.062 — **VERIFIED — Michael, 2026-08-12.**
- CPRC § 17.024 — **VERIFIED — Michael, 2026-08-12.**
- CPRC § 101.001 et seq. (TTCA) incl. § 101.106 — **VERIFIED — Michael, 2026-08-12**, with practice
  note of record: the practice files against the governmental body alone in nearly all TTCA cases;
  employee joinder is deliberate and exceptional (also CD-2 roster-default evidence).
- FTCA — **VERIFIED — Michael, 2026-08-12.**
- Property Code ch. 142 / TRCP 44 & 173 — **VERIFIED — Michael, 2026-08-12.**

Exact entry text: registry-fold-in_2026-08-12.md (this packet).

## Mid-session capture: IN-5

During verification of the TRCP 194 entry, Michael stated what he reads opposing disclosures for.
Entered as **IN-5 (disclosure-mining)** with full text, sourced to his statement, design session
2026-08-12 — sibling of IN-1; cross-links CD-1's non-party scope question; legal substrate is the
expanded TRCP 194 registry entry.

## Gate consequence

The bounded evidence pass of #48 ruling 4 is complete: opportunistic REQ-CAPTUREs continue, the
deliberate roster-mining pass has produced its capture, and the capture is reconciled and ruled.
**The CD-1 schema session is fireable at Michael's choosing.** cd-1-session-prep.md updated by this
packet.
