# IN-2 — CRASH-REPORT (CR-3) FIELD EXTRACTION AND DISCREPANCY FLAGS (spec)

**Status: PROPOSED. Nothing here is authorized to build.** Design session, Opus 5, Cowork,
2026-08-15 Central (DT-1: clock-checked 16:10 CDT before any stamp; the container read
2026-08-15 21:10 UTC and Central agreed). CHAT-DISPATCH Task 10.

**Canonical repo path:** `docs/specs/in-2-crash-report-extraction-spec-2026-08-15.md`

**This spec elaborates on one half of IN-2 and maps the other.** IN-2's *home* question — where
source attribution lives — was **RULED 2026-08-11** at `contact-directory.md` §7. Its *extraction*
half is **unruled and open**. So unlike the Task 8 form-engine specs (all elaboration) and unlike
the Task 9 intake specs (all mapping), this one does both, and **§1.1 states which paragraphs are
which** so a build session cannot read a mapped paragraph as a ruled one. **Every structure this
document names that is not quoted from a ruling is PROPOSED by this document.** Where it appears
to settle something unruled, that is a defect in this document, to be reported rather than
relied on.

**Naming, per the citation convention adopted 2026-08-12 (#62 batch):** "CR-3" throughout this
document means **the Texas Peace Officer's Crash Report**. The criminal-requirement item of the
same string is written "CR-3 (criminal requirement)" and appears nowhere below.

---

## 1. RECONCILE FIRST — what the record says before this spec says anything

Read at HEAD (`74b8532`) through the device bridge, 2026-08-15 Central. **Caveat carried from the
#83 runner line: a bridge-side `HEAD == origin/master` is an UNFETCHED ref** (`git fetch` fails
through the mount with HTTP 403), so "at HEAD" below means at the local checkout's HEAD, which was
`74b8532`, clean of substantive diff — all 199 porcelain lines are the known CRLF artifact
(`git diff --ignore-all-space --numstat` returns zero rows). **Not asserted as a gate pass.**

| Source | What it establishes |
|---|---|
| `attorney-review-queue.md` line 239 | IN-2 carries **⬜ = open**. Full question text retained; entered 2026-08-11 (REQ-CAPTURE). |
| Same row | **"HOME QUESTION RULED 2026-08-11 — `docs/specs/contact-directory.md` §7"** — the case-scoped fact table. |
| Same row | **"STILL OPEN: the EXTRACTION half"** — *"structured CR-3 field extraction remains Phase-1b-class ingestion, GPU-arm gated, and the question text above is retained in full because none of it was ruled."* |
| Same row | The block-finalized sub-question **rides IN-4**, deliberately not ruled in the CD-1 session. Not this spec's. |
| `contact-directory.md` lines 155–175 (§7) | The ruling itself, three numbered items. Quoted in §1.2. |
| `anti-resurrection-ledger.md` | **No IN- row of any kind.** Nothing in the IN series is closed, withdrawn, or deliberately-not-built. |
| `cr3-field-code-map.md` (#64, Fable 5) | PROPOSED design input. Carries the versioned-code-table requirement (§5). **Two of its lines are corrected in §2.** |
| `docs/reference/CR3-code-sheet-2023.pdf` | Form CR-3CS 4/1/2023, two pages, 46 numbered code lists. Read in this session by raw text extraction, not by eye — see §2.5. |
| `REQ-CAPTURE_trucking-multidefendant-first-sets_2026-08-11.md` REQ-07 | Origin. Names the five extraction targets and both live conflicts. |
| `REQ-CAPTURE_attorney-edit-roundtrip_2026-08-11.md` REQ-04 + §5.3 | The extension: source-fact pinning; the live crash report was **image-only, no text layer**. |
| `spec-feedback.md` lines 295–299 | The demographic question the design input calls open **was RULED at #66** (§2.4). |
| `form-engine.md` line 299 · `fe-4-…-spec` lines 132–135, 218–223 | FE-4 renders instrumentality definitions **from IN-2 fact rows**; Q-FE4-3 already asks what happens until IN-2 exists. |
| `cd1-build-slice.md` line 48 · `BUILD-STATE.md` line 47 | **"The IN-2 fact table — no consumer until the engine or intake pipeline exists"** — explicitly OUT of the CD-1 slice. |
| `db/schema.sql` at HEAD | No fact table. No vehicle or instrumentality table. No document storage. `cases.date_of_incident` is a `date` (line 45). `oaa_intakes.fields_json` exists (line 770–779) — §6.2. |
| `BUILD-STATE.md` (seventy-second refresh, describing `1bffb9b`) | Nothing built for any IN item. **T3 work UNAUTHORIZED (KICK-1)**; Phase-1b ingestion GPU-gated; telemetry lockdown not in place. |

**Gate result: IN-2 IS OPEN, and it is the first item in this chain whose gate resolves both ways
at once.**

### 1.1 Which half is which — stated once, so nothing below is ambiguous

- **RULED, and elaborated here:** where attribution lives (the case-scoped fact table); that
  discrepancy flags fall out of the fact-row shape; that only attorney verification sets a
  verified state; the promotion seam for identity-class facts. **§§6.1, 7.1, 8 elaborate these
  and add nothing to them.**
- **UNRULED, and only mapped here:** every extraction question — what is extracted, in what
  classes, under what disciplines, keyed to which code-sheet version, into what columns, surfaced
  where. **§§2–5, 6.2–6.6, 7.2–7.4 map. They propose; they do not settle.**
- **Not this spec's at all:** whether an unverifiable fact blocks the *finalized* instrument state
  (rides IN-4); the confidence *threshold* half of capture §5.3 (answered by §7.3's
  no-threshold-ever-auto-verifies ruling); the FE-4 interim question (Q-FE4-3, already asked).

### 1.2 The ruling, quoted rather than paraphrased

`contact-directory.md` §7, three items, all RULED 2026-08-11:

1. *"Source attribution lives on the case-scoped fact table — {fact_id, value, source_document,
   source_field, extraction_method, verified_by_attorney} … with fact rows referenced by merge
   fields, corrections propagating to every instrument using the fact, and OCR/vision extractions
   carrying a confidence flag. Not on directory entries; no sidecar. … Discrepancy flags fall out
   naturally: two sources asserting different values for one fact row IS the flag (live evidence:
   incident time; pleaded vehicle ownership vs. the CR-3)."*
2. *"for identity-class facts (a carrier's DOT number, a facility's legal name) the fact table is
   the staging layer; **attorney verification is the act that promotes the value into the
   directory entry**, where silent trust then applies. … one direction of flow; no copies."*
3. *"Only attorney verification sets a fact's verified state. Confidence scores order the review
   queue (low-confidence first) and drive display flags on drafts; **no threshold ever
   auto-verifies** — registry discipline transposed to facts: automation flags, only Michael
   verifies."*

**Everything in §7 is about attribution and verification. Nothing in it is about extraction.**
That is the whole shape of this spec's problem.

---

## 2. The source document — checked against raw extraction, not against the design input

### 2.1 What the repo holds, and what it does not

`docs/reference/CR3-code-sheet-2023.pdf` is the **CODE SHEET**, not the report. Its own header
says so: *"Numbered Fields on the CR-3 Refer to the Numbered Lists on this Code Sheet."* It
enumerates the controlled vocabularies. **It does not enumerate the report's fields, their
positions, or their labels.**

**Consequence, stated plainly because the record has not stated it: the repo has IN-2's
*vocabulary* inventory and does not have its *field* inventory.** `cr3-field-code-map.md` is a map
of code lists — accurate to what it maps — and the record has been citing it as though it were an
authoritative field inventory for extraction. It is not, and it does not claim to be. A field
inventory needs the CR-3 report form itself, which is not in the repo. **Not proposed as an
action:** acquiring a blank CR-3 form is Michael's hand under H5, and this document does not
sweep for one or ask for one as a default. **It is Q-IN2-1.**

### 2.2 CORRECTION — the "(79 codes)" figure in `cr3-field-code-map.md` is wrong

**What was asserted.** `cr3-field-code-map.md` line 34 describes list **38 Factors and
Conditions** as **"(79 codes)"**.

**What is true instead.** List 38 enumerates **70 values**, not 79. Extracted from the PDF's own
text layer (`pdftotext -layout`, block-isolated between the list-38 and list-39 headings, values
sorted and deduped): **1–4, 14–71, 73–79, 98.** **79 is the highest non-catch-all code number, not
the count.** Two gaps are real and were confirmed by targeted search of the whole sheet: codes
**5–13 do not appear** in list 38, and **code 72 does not appear anywhere in the document**
(`grep "72 = "` over the extracted text returns nothing).

**Which entry it corrects.** Session log **#64** (2026-08-12) and the file it filed,
`cr3-field-code-map.md`. **Both stand as written** — the log is append-only and this document does
not edit either file. The queue row and BUILD-STATE do **not** repeat the figure; `grep -rn "79
codes"` over the repo at HEAD returns exactly one hit, the map's line 34. **Blast radius: one
line, in one file, not yet consumed by any build.**

**The actor.** **Fable 5** — log #64's own header reads *"design session, Fable 5, Cowork, typed —
same session as #62/#63."* Recorded per the correction-entry rule's model-attribution field, not
inferred from session type.

**The failure class.** Asserting a measurement without running it — the same class as #81's and
#83's self-corrections, and the class the SOURCING convention's *"characterization and
normalization report rather than substitute"* discipline exists to catch. Here the specific shape
is **reading a range's endpoint as its cardinality**, which is invisible precisely when the code
space is sparse.

**What changed as a result.** Nothing in the repo. The map is not edited by this document; the
figure is corrected **here**, and §2.3 states the design consequence that the wrong figure would
have hidden. **Whether to annotate `cr3-field-code-map.md` in place is a Code act on Michael's
ruling, not this session's** — the file is a design input, not a registry file, so the bar is
lower than route (c), but it is still not a design session's to edit.

### 2.3 The code space is SPARSE — and that is a design constraint, not trivia

The gaps are not a transcription artifact; they are how TxDOT versions a vocabulary. Codes are
**retired in place** rather than renumbered, so a live sheet carries holes where earlier meanings
used to sit. Three consequences for IN-2, none of them recorded anywhere on the record today:

1. **Range validation is wrong.** `code BETWEEN 1 AND 79` accepts ten values that do not exist on
   the 2023 sheet (5–13, 72). Validation must be **membership in the loaded version's value set**,
   never a range.
2. **A hole is evidence, not an error.** A CR-3 carrying a code that is absent from the version
   the extractor loaded is a **strong version-mismatch signal** — probably a pre-2023 crash
   decoded against the 2023 sheet, which is exactly the silent misdecode #64 warned about.
   Proposed: an unknown code is not a parse failure and never a discarded value; it is preserved
   verbatim and raised as a version-mismatch flag. **This is the `case_roster_flags`
   `unmapped_value` discipline** — *"preserved verbatim; nothing is lost"* — applied to a
   vocabulary rather than a roster.
3. **Table cardinality is a per-version fact and must be measured, never assumed.** This spec
   states one measured cardinality (list 38 = 70 at 4/1/2023) and **deliberately states no
   others**: the sheet's multi-column layout interleaves unrelated lists on the same text rows,
   so a naive per-list count is unreliable, and list 38 was countable only because it spans the
   full page width. Counting the other 45 lists reliably is a **seed-data task with a verification
   step**, not a claim this document is entitled to make. Recorded as a known gap rather than
   filled with a guess.

### 2.4 A second line in the same design input is STALE — and the ruling that superseded it governs IN-2 by name

`cr3-field-code-map.md`'s last table row says of fields **17 Ethnicity** and **18 Sex** that
*"whether the software captures them at all is already an OPEN question."* **That was true when
written on 2026-08-12 and was ruled the next day.**

Log **#66** (2026-08-13): *"DEMOGRAPHICS RULED (closes the 2026-07-25 spec-feedback question, both
halves): the software CAPTURES BOTH sex and race/ethnicity on both intake paths (OAA and **CR-3
extraction**) — one answer governs both so defaults cannot drift (#64's cross-reference
satisfied)."* Mirrored at `spec-feedback.md` line 299 as an add-only annotation.

**This is not a correction — the map was right on its date.** It is a supersession, and it lands
directly on IN-2: **the ruling names CR-3 extraction as a governed intake path**, so fields 17 and
18 are **IN scope for extraction by ruling**, not by this spec's proposal. They are the only two
fields in this document whose in-scope status is ruled rather than proposed. **Note for whoever
builds it:** the app has no such columns today — `parties.fields` is a JSONB bag driven by the
front-end party registry, and the ruling did not name a home.

### 2.5 Two self-corrections inside this session, recorded rather than silently fixed

**First, on the code sheet.** This session first read the sheet **as rendered page images** and
drafted from that read. Two errors were in that pass: code **69** was transcribed as *"Oncoming
Side - Approach or Intersection"* (the text layer says **"Wrong Side - Approach or Intersection"**),
and the tail of list 38 was numbered one position low throughout, which would have produced a
71-value count instead of 70 and would have **invented a code 72** — the very code §2.2 reports as
absent. **Both were caught by re-extracting the text layer before either figure entered this
document.**

**Second, in this document's own RR-1 pass.** §6.4 asserts that no vehicle identity exists in the
schema. The first search backing it was **unbounded**, and `-i` substring matching on `vin`,
`vehicle` and `instrumentality` returned **seven hits across three files** — every one of them a
false positive inside *resolving, moving, having, living*. **Re-run word-bounded, the count is
zero**, which is what §6.4 now states and how it now states it. **The claim survived; the evidence
for it did not, until it was re-run.**

Actor for both: **Opus 5, this session.** Same failure class as §2.2's — asserting a measurement
before running it cleanly — and the second instance is the *precise* failure #83 recorded when an
unbounded `IN-1` pattern also matched `MIN-1`. **Three occurrences now on the record in three
consecutive sessions; the pattern is the tooling, not the model.** It is why the extraction rather
than the eye, and the word boundary rather than the substring, is what §§2.2, 2.3 and 6.4 rest on.
**The lesson generalizes past this document: a rendered PDF page is a characterization and the
text layer is the raw source — and IN-2's own extractor will face that asymmetry in its harder
form, against scanned reports that have no text layer at all.**

---

## 3. Scope

### 3.1 What IN-2 is

Two capabilities that the record consistently treats as one item and that this spec treats as one
item for the same reason — they share a data shape:

1. **Structured extraction** of CR-3 fields into case-scoped fact rows carrying value, source
   document, source field, extraction method, confidence, and code-sheet version.
2. **Discrepancy flags** raised where a CR-3 field and another source (the petition, attorney
   entry, an earlier extraction) assert different values for the same fact.

Capability (2) is **not a feature built on top of (1)** — §7.1 already ruled that it falls out of
the row shape. Two rows for one fact with different values *is* the flag. Building a separate
"discrepancy detector" would be building a second thing where the ruling put one.

### 3.2 The structural finding — three extraction classes, three disciplines

**IN-2's five named targets do not share an extraction problem, and the #64 requirement governs
only one of them.** Sorted against the code sheet:

| Class | IN-2's named targets in this class | What the code sheet gives | Governing discipline |
|---|---|---|---|
| **A — coded** | driver-license **class** codes (list 11); carrier **ID type** (list 31) | The full controlled vocabulary | **The #64 versioned-code-table requirement** — (code, decoded label, code-sheet version), §5 |
| **B — identifier** | **VINs**; the **DOT number** itself | **Nothing.** Not a code list | **Format validation**, not vocabulary versioning — a VIN is 17 characters with a check digit; a USDOT number is a bare integer. A wrong VIN fails a checksum; a wrong list-11 code fails a membership test. Different failure, different remedy |
| **C — free-text identity** | **carrier identity**; **owner / lessee** | Nothing | **§7.2's promotion gate** — these are exactly the *"identity-class facts"* the ruling stages on the fact table and promotes into the directory only by attorney verification |

**Why this matters, and why it is the headline of this spec:** the record's shorthand — "the #64
requirement governs CR-3 extraction" — is true of class A and **false of B and C**, which are
**three of the five named targets**. A build that implements the versioned-vocabulary requirement
and calls IN-2's extraction discipline satisfied would ship with **no validation at all on VINs
and DOT numbers** and **no promotion gate on carrier and owner identity** — and both gaps would be
silent, because a class-B or class-C field never touches a code table and so never trips a
version check. **PROPOSED, not ruled: the three classes are named in the design and each carries
its own discipline explicitly.**

### 3.3 What IN-2 is not, structurally

- **Not the fact table's authorization.** §7 ruled where attribution lives; `cd1-build-slice.md`
  line 48 put the fact table explicitly OUT of the CD-1 slice, *"no consumer until the engine or
  intake pipeline exists."* Naming its shape is not authorizing it.
- **Not runnable before the GPU arm.** The queue calls the extraction half *"Phase-1b-class
  ingestion … GPU-arm gated"*; BUILD-STATE has T3 **UNAUTHORIZED** (KICK-1) and telemetry lockdown
  not in place. And the ostensibly easiest possible target is not easy: the attorney-edit capture
  records that the live crash report *"has no text layer"* — an image-only scanned PDF. **The
  fixed-form advantage buys layout predictability; it does not buy a text layer.** No amount of
  design changes that ordering.
- **Not a liability opinion.** The commercial block (lists 30–36, 12, 13) is an **FMCSR-applicability
  signal** and the map already ruled its posture: automation flags, the applicability call is
  Michael's. Lists 23–27 (solicitation, specimen type, result, drug category) and **list 38's codes
  45 (Had Been Drinking) and 67–68 (Intoxicated - Alcohol / Intoxicated - Drug)** are
  **evidence-trail flags, never characterizations**. *(Codes within a list, not lists — the
  distinction §5.3 exists to protect.)*
- **Not a criminal-side item.** No CR-3 (criminal requirement) content appears here.

---

## 4. Fields extracted — the inventory, by class

**PROPOSED. Sourced to the code sheet for class A and to REQ-07 / §7 for classes B and C.** The
class-A rows below are the code-sheet lists whose *existence and subject* this document verified
against the raw text layer; **their value sets and cardinalities are NOT restated here** — per
§2.3(3), that is seed data with a verification step, and restating it from a rendered read is the
error §2.5 records.

| # | Class | Fields | Why IN-2 wants it |
|---|---|---|---|
| 11 | A | Driver License Class | IN-2's named target ("driver-license class codes"); CDL class is a trucking-posture signal |
| 31 | A | Carrier ID Type (US DOT / TxDOT / ICC/MC) | Types the identifier in the same row as the DOT number — a class-B value whose *meaning* is class-A |
| 28 | A | Financial Responsibility Type | Insurer / financial-responsibility posture; feeds the roster's insurer question |
| 30, 32–36, 12, 13 | A | The commercial-vehicle block | FMCSR-applicability **signal**, flag-only |
| 5, 14 | A | Unit Description; Person Type | Roster-seeding evidence — which units and persons the report says existed |
| 16, 19–22 | A | Injury Severity (KABCO); Ejected; Restraint Used; Airbag; Helmet Use | Damages posture and comparative flags, surfaced never characterized |
| 23–27 | A | Solicitation; Alcohol Specimen Type; Drug Specimen Type; Drug Test Result; Drug Category | Intoxication and dram-shop **evidence trail**, flag-only |
| 8, 9 | A | Autonomous Unit; Autonomous Level Engaged | 2023+ fields; products-liability signal the intake should surface, not bury |
| 29 | A (structured) | Vehicle Damage Rating | **Not a plain code** — the sheet specifies a composite format, `XX-ABC-Y`: direction of force 1–12, a 2–3 letter damage description, severity 0–7, plus special codes (VB-1, VB-7, TP-0, VX-0, MC-1, NA). A composite that must be stored decomposed or it cannot be queried |
| 37–46 | A | Sequence of events; factors and conditions; defects; weather/light/road/control | Crash mechanics and negligence-factor taxonomy; list 38 is the sparse one (§2.3) |
| 17, 18 | A | Ethnicity; Sex | **IN scope by RULING (#66), not by proposal** — §2.4 |
| — | B | **VIN(s)**; **USDOT number**; plate(s) | Named targets; feed FE-4 instrumentality definitions and the definitions block (REQ-02) |
| — | C | **Carrier identity**; **owner / lessee**; driver identity | Named targets; §7.2 promotion candidates into the directory |
| — | (neither) | **Crash date and TIME**; crash-report case ID; location | The live discrepancy (§6.3); `{{crash_report_case_id}}` is an observed case-level merge field in the trucking capture's §3 |

---

## 5. Versioned code tables — the #64 requirement, elaborated and then complicated

### 5.1 The requirement as carried

`cr3-field-code-map.md`, quoted: *"any CR-3 extraction must store **(code, decoded label,
code-sheet version)** — and the code tables themselves carry effective dates. This is the house
versioning pattern (immutable versions, consumers stamp what they used — FE-4 definitions,
`template_version`, registry stamping) applied to an external vocabulary. An extractor without the
version dimension silently misdecodes pre-2023 crashes. When IN-2 is designed, this is a
requirement, not an option."*

**This spec adopts it without amendment for class A**, and §3.2 states what it does not reach.

### 5.2 The complication nobody has named: version selection is circular

**Which code-sheet version decodes a given report?** The obvious answer — *the version in effect
on the crash date* — is circular, because **the crash date is itself a field under extraction and
one of the two live discrepancies on the record is about exactly that datum** (incident time; and
by extension the incident's date, which `cases.date_of_incident` holds and the CR-3 may contradict).
You cannot key the vocabulary to a fact whose value the vocabulary is being used to establish.

**PROPOSED resolution, three-part, none of it ruled:**

1. **The document declares its own vocabulary.** The CR-3 code sheet prints its form designation
   on every page — verified in this session's raw extraction: **"Form CR-3CS 4/1/2023"**, on both
   page 1 and page 2. If the report or its accompanying sheet carries a form designation, **that
   designation selects the version.** Self-declaration beats inference.
2. **Crash date is a cross-check, not the selector.** Where the crash date and the declared
   version disagree (a 2021 crash on a 4/1/2023 sheet), that is a **flag**, not a correction and
   not a silent re-decode.
3. **An unknown code is a third signal** (§2.3(2)), independent of both.

**Three independent signals, any disagreement flags, nothing auto-resolves.** That is registry
discipline transposed to vocabularies, and it is the same shape §7.1 already ruled for facts.

### 5.3 What the version dimension has to reach

Every stored class-A value carries **(raw code as printed, decoded label, code-sheet version
used, list number)** — the list number because code `3` means *Pedalcyclist* in list 5, *Insurance
Binder* in list 28, and *ICC/MC* in list 31. **A code without its list is not a fact.** The record
has never said this, and it is the cheapest possible way to corrupt an extraction.

---

## 6. Data-model touchpoints

### 6.1 The fact table is ruled in shape and does not exist

`{fact_id, value, source_document, source_field, extraction_method, verified_by_attorney}` is
**ruled** (§7.1) and **explicitly out of the CD-1 slice** (`cd1-build-slice.md` line 48;
`BUILD-STATE.md` line 47). No table, no migration, no column. **FE-4 already depends on it** —
`form-engine.md` line 299 renders instrumentality definitions *"from IN-2 fact rows"* — and
**Q-FE4-3 already asks what happens in the meantime.** This spec adds no answer to Q-FE4-3; it
notes that IN-2's arrival is one of the three options that question offers, and that the option
Michael picks there constrains this one.

### 6.2 An extraction-with-provenance precedent EXISTS in the built schema, and it is not the fact table

`db/schema.sql` line 770, on `oaa_intakes`: *"Audit record of an OAA intake: which template ran,
on what text, what it extracted (**fields_json carries value/confidence/provenance per field**)."*

**This is the first time the record has connected `oaa_intakes` to IN-2, and the connection cuts
both ways:**

- **As precedent, it is strong.** The house has already shipped value + confidence + provenance
  per extracted field, on the criminal OAA intake path, against a fixed government form — the
  closest existing analogue to what IN-2 does with the CR-3. Whatever IN-2 builds should not
  invent a different vocabulary for the same three properties.
- **As substrate, it is wrong, and quietly so.** `fields_json` is **`text`, not `jsonb`** — a
  serialized blob on an audit row keyed to one intake **event**, not queryable fact rows keyed to
  a **case**. It carries **no `verified_by_attorney`**, so §7.3's promotion gate has nowhere to
  land. And it holds one source's view, so **two sources cannot disagree inside it** — which is
  precisely the shape §7.1 ruled the flag falls out of. **A build that reached for `oaa_intakes`
  as IN-2's home would satisfy the word "provenance" and lose the ruling.**

**PROPOSED, not ruled: the fact table is new, and `oaa_intakes` is a candidate future *producer*
into it rather than a home for it.** That would let one shape serve both intake paths — which is
the same argument #66 made when it ruled one demographic answer governs OAA and CR-3 alike *"so
defaults cannot drift."* **Whether the OAA path should be migrated onto the fact table is
Q-IN2-6, and it is a scope expansion this document does not take.**

### 6.3 Incident TIME has no column, and it is the record's own first example of a discrepancy

`cases.date_of_incident` is a **`date`** (line 45). The CR-3 records a time of crash. **The very
first live conflict the queue names — "two real conflicts — incident time" — cannot be expressed
against the case record as built,** because the case record cannot hold a time at all.

The tempting fix is a column, and the schema argues against it **in its own comment, four lines
below**, where `statute_of_limitations` was removed: *"Do not re-add it: a writable column meant to
mirror derived data stops mirroring it silently."* A `cases.incident_time` written by an extractor
and edited by an attorney is that same defect class one field over.

**PROPOSED: the fact table holds both assertions (petition-alleged and CR-3-recorded), the case
record displays the attorney-verified one, and `cases.date_of_incident` is not extended.** The
alternative — a real column plus fact rows — is the mirror defect. **Q-IN2-3 puts it to Michael
rather than adopting it**, because the display side (what a case header shows when the verified
value does not exist yet) is a design call, not a schema call.

### 6.4 Vehicle identity has no home, and §7.2's promotion target does not exist for a thing

The queue says IN-2 touches *"CD-1 (vehicle/instrumentality identity)."* At HEAD:

- **CD-1 ruled that identity lives in `parties`**, and `parties` is a **contact** directory —
  `kind` admits `'individual'` or `'organization'`. **A tractor is neither.**
- **§7.2's promotion gate names only contact-shaped examples** — *"a carrier's DOT number, a
  facility's legal name"* — both **organizations**, both with an existing directory row to be
  promoted into.
- **A VIN is an identity-class fact about a thing with no row anywhere.** So for the single most
  named target in IN-2's own question text, **the promotion half of the ruling has no destination.**
- **Searched word-bounded at HEAD across `db/schema.sql` and all three migrations: `vin`, `vehicle`
  and `instrumentality` return ZERO occurrences.** Not deferred — absent. *(Word-bounded because
  the unbounded search returns seven false positives inside* resolving, moving, having, living —
  *§2.5.)*

**Three shapes are available and this document picks none of them:** (a) vehicles become directory
rows (a third `kind`, or a `party_type` registry entry — cheap, and it puts a trailer in the
contact directory forever); (b) vehicles stay **case-scoped fact clusters** with no identity of
their own (honest to §7.1, but a fleet tractor appearing in three matters is three unlinked
clusters); (c) a **new instrumentality entity**, which is the CL-1 firewall question in a new
costume — a second identity table is *"the wrong-level defect class CL-2 was built to kill,"* per
the schema's own comment above `parties`. **Q-IN2-4.**

### 6.5 What any IN-2 table must carry, if one is ever authorized

Assembled from the ruling plus §§2–5; **PROPOSED**, and deliberately shorter than a schema:

- The six ruled fields, unaltered: `fact_id, value, source_document, source_field,
  extraction_method, verified_by_attorney`.
- **`case_id`** — §7.1 says *case-scoped* in terms.
- **Class** (A/B/C per §3.2), because the discipline differs and a build that cannot tell them
  apart cannot apply them.
- **For class A:** `list_number`, `raw_code`, `decoded_label`, `code_sheet_version` (§5.3).
- **Confidence**, per §7.1's OCR/vision clause — and per §7.3 it orders a queue and never gates.
- **`unmapped_value`-equivalent**: the raw text as printed, always preserved, for every class.
  Borrowed by name from `case_roster_flags` — *"preserved verbatim; nothing is lost."*
- **A supersession pointer**, not an update-in-place (§7.3).

### 6.6 Two existing structures a build will reach for and should not

- **`case_roster_flags`** is the house do-not-guess flag shape, and it carries **`unique
  (case_party_id)`** (line 154) — one flag per roster entry. A CR-3 can contradict the petition on
  owner, lessee, and DOT number for **one** party at once. But §7.1 ruled the discrepancy flag
  falls out of the **fact table**, not the roster flag table, so this is a **"don't reach for it"**
  note rather than a defect in it. Recorded because the same `unique` constraint was flagged at
  #83 for IN-1, where it *is* a defect — **two items, one constraint, different consequences.**
- **`staging_items.suggestions` + `routing_decisions`** is the house suggest → dismiss → remember
  pattern and the standing in-repo precedent for never-auto-file (D1). **It is the transcript
  inbox's**, keyed to `staging_item_id`, and IN-2's discrepancies are per case and per fact. Same
  mis-keying #83 recorded for IN-1, one table over.

---

## 7. Flag-never-auto-correct semantics

### 7.1 Most of this is already ruled, and the ruling is stronger than the dispatch's phrasing

The dispatch asks for *"flag-never-auto-correct semantics."* §7.3 ruled something stricter:
**nothing auto-*verifies*, at any confidence.** Auto-correction is not merely forbidden; the
*absence* of correction is not a defect state to be engineered around. **Registry discipline
transposed: automation flags, only Michael verifies.**

### 7.2 The four judgments IN-2 must never make

**PROPOSED as the concrete reading of that ruling for this item:**

1. **Which of two conflicting values is right.** Not on confidence, not on recency, not because
   the CR-3 is a government document. Two rows, one flag, attorney resolves.
2. **That a code it cannot decode is an error.** §2.3(2): it is a version signal.
3. **That the commercial block means the FMCSRs apply.** Flag; the applicability call is Michael's.
4. **That an extraction it is confident about is verified.** §7.3, in terms.

### 7.3 Re-extraction is a new assertion, not an edit — PROPOSED

The ruling covers **two sources** disagreeing. It does not cover **one source, re-read**: the same
scanned CR-3 run again after an OCR-model upgrade, or against a corrected code-sheet version,
producing a different value.

**PROPOSED: extraction results are append-only.** A re-extraction writes a new row carrying its
own `extraction_method` and `code_sheet_version`, pointing at what it supersedes; it never updates
a value in place. Rationale, from the house pattern rather than invented: **immutable versions,
consumers stamp what they used** — the same rule FE-4 definitions, `template_version`, and
registry stamping already run on. **The consequence that makes it worth the storage: a fact an
attorney verified must not be silently changed under him by a background re-run.** Under
append-only, a superseding extraction that disagrees with a verified value is **a flag on a
verified fact** — visible, and resolvable only by him. **Q-IN2-5** asks whether that is wanted or
whether it is over-engineering for a solo practice.

### 7.4 The asymmetry that should shape the review UI

**Class A fails loudly and class B fails silently.** A bad list-11 code fails a membership test at
extraction time. A bad VIN — one transposed character out of seventeen — **passes every structural
check the system has** unless a check digit is computed, and then flows into a definitions block,
a discovery request, and a records subpoena looking exactly like a good one. **The review queue
should not be ordered by confidence alone** (§7.1 orders it low-confidence-first, which is ruled
and stands): a **high**-confidence class-B identifier that no independent check has corroborated
deserves a look that a low-confidence class-A code, already caught by membership, does not.
**PROPOSED as a display consideration, not a reordering of the ruled queue. Q-IN2-7.**

---

## 8. Linkage to case and party records under the CD-1 schema

**Elaboration of ruled material; nothing new is proposed in this section except where marked.**

- **Facts are case-scoped** (§7.1). `case_id`, not `party_id`, is the anchor — a crash report is
  about an occurrence, and the occurrence belongs to the case. **This runs on the CL-2 division
  already built:** *"the case owns the occurrence and liability; the CLIENT owns the damages."*
  A CR-3 is occurrence evidence end to end, so **nothing IN-2 extracts is client-scoped**, and a
  two-client file does not get two crash-report fact sets. *(Stated because the medical side
  splits per client and a build could reflexively follow it.)*
- **Person and unit rows on the report seed the roster; they do not populate it.** Lists 5 and 14
  are *"CD-1 roster seeding evidence"* per the map. The roster link is `case_parties`, whose
  `story_role` comment already carries the discipline: *"NULL means NON-PARTY — a value, not an
  absence. 'Not yet decided' is carried by `case_roster_flags`, never by writing a guess here."*
  **A CR-3 says who was present; it does not say who is a party.**
- **Identity-class facts stage and promote, one direction** (§7.2). Carrier legal name and DOT
  number sit on the fact table until attorney verification writes them into the `parties` row —
  never copied, never synced back.
- **Directory role tags and `party_type` are not extraction outputs.** The CR-3's Person Type
  (list 14) says *driver*; the directory's role vocabulary is *"DERIVED from the party registry so
  it cannot drift"* (BUILD-STATE). **Mapping list 14 onto role tags is a vocabulary act, not an
  extraction act** — the same spec-level bar §5/§6 of `contact-directory.md` set for its own
  controlled vocabularies. **Q-IN2-8, marked PROPOSED-as-a-question rather than proposed as a
  mapping.**
- **Nothing here touches `case_links`.** The CL-1 firewall holds; a crash report links facts to
  one case, never a case to a case.

---

## 9. Non-goals

- **Building anything.** No table, no migration, no column, no UI. IN-2 stays queued and
  unauthorized; the row stays ⬜ — **a spec is not a closure.**
- **Editing `cr3-field-code-map.md`, `contact-directory.md`, `form-engine.md`, `cd1-build-slice.md`,
  `spec-feedback.md`, `db/schema.sql`, or any migration.** All are cited above; none is amended.
- **Answering Q-FE4-3, IN-4's block-finalized question, or Q-IN3-3's first-instrument-consumer
  question.** Each is named where it bears; none is resolved.
- **Adding a registry entry or asserting a legal proposition.** None was needed: this spec relies
  on no rule or case authority. The FMCSR substrate the commercial block points at is already on
  the registry and this document neither cites nor moves it. **No case-law retrieval was run.**
  Descrybe not used (TOOLING); CourtListener untouched (Q-6).
- **Restating the code sheet's value sets.** §2.3(3) — seed data with a verification step, not a
  claim this document can make from a rendered read.
- **Sweeping Michael's machine for a blank CR-3 form** (H5). Q-IN2-1 asks; it does not look.
- **Deciding whether the OAA intake path migrates onto the fact table** (Q-IN2-6).

---

## 10. Open questions — FULL TEXT (QR-1)

**Packet-local IDs only. `Q-IN2-` and `IN2-LOOK-` were checked repo-wide at HEAD and return
zero occurrences outside `inbox/`; no durable ID is minted here — minting into the live `IN`
series is Michael's act, and Q-IN1-8 (from #83) still asks whether the `IN` series stands at all.
ID-DL-1 now governs FIVE packets.**

**Q-IN2-1.** The repo holds the CR-3 **code sheet** — the controlled vocabularies — and does not
hold the CR-3 **report form**, so there is no authoritative inventory of which fields exist on the
report, where they sit, or what they are labelled. Extraction needs the field inventory more than
it needs the vocabularies. **Should a blank CR-3 report form be added to `docs/reference/`
alongside the code sheet (public TxDOT form documentation, same client-clean class), and if so is
that your hand under H5 — or should IN-2's field inventory instead be derived at build time from a
real report the extractor is pointed at, accepting that the inventory is then discovered rather
than specified?**

**Q-IN2-2.** `cr3-field-code-map.md` line 34 states list 38 has "(79 codes)"; raw extraction shows
**70** enumerated values with real gaps at 5–13 and 72 (§2.2). The file is a PROPOSED design input,
not a registry file and not an append-only record, so correcting it in place is a smaller act than
route (c) — but it is still not a design session's to edit. **Do you want the line corrected in
place by a Code session with a note naming this spec, annotated add-only in the house pattern, or
left exactly as written with the correction living only here?**

**Q-IN2-3.** `cases.date_of_incident` is a `date` and cannot hold the CR-3's time of crash, so the
first live discrepancy the queue names — incident time — has no column to conflict with (§6.3).
Adding `cases.incident_time` recreates the writable-mirror defect the schema's own comment warns
against four lines below (*"a writable column meant to mirror derived data stops mirroring it
silently"*). **Should the incident time live only as fact rows with the case header displaying the
attorney-verified value — and if so, what should the header display before any value is verified:
the CR-3's value marked unverified, the petition's, both, or nothing?**

**Q-IN2-4.** A VIN is an identity-class fact about a thing that has no row anywhere: CD-1 ruled
identity lives in `parties`, `parties.kind` admits only `'individual'` and `'organization'`, and
§7.2's promotion examples are both organizations, so **for IN-2's most-named target the promotion
half of the ruling has no destination** (§6.4). Three shapes: **(a)** vehicles become directory
rows (a third `kind` or a `party_type` registry entry) — cheap, and it puts trailers in the contact
directory permanently; **(b)** vehicles stay case-scoped fact clusters with no identity of their
own — honest to §7.1, but one fleet tractor across three matters is three unlinked clusters;
**(c)** a separate instrumentality entity — which is a second identity table, the defect class the
schema comment above `parties` says CL-2 was built to kill. **Which, and does the answer reopen
`contact-directory.md` as a living-spec revisit?**

**Q-IN2-5.** §7 rules what happens when **two sources** disagree but is silent on **one source,
re-read** — the same scanned CR-3 re-extracted after an OCR-model upgrade or against a corrected
code-sheet version. **Should extraction results be append-only with supersession pointers, so a
background re-run can never silently change a value you already verified (§7.3) — or is
update-in-place with a review-log entry sufficient for a solo practice, accepting that a verified
fact can move under you between the draft and the filing?**

**Q-IN2-6.** `oaa_intakes.fields_json` already carries *"value/confidence/provenance per field"*
for the criminal OAA intake path — the same three properties IN-2 needs, against the same class of
fixed government form — but as a serialized `text` blob on an audit row, with no
`verified_by_attorney` and no way for two sources to disagree inside it (§6.2). **Should the IN-2
fact table be designed as the shared home for both intake paths, with `oaa_intakes` becoming a
producer into it — the same "one answer governs both so defaults cannot drift" reasoning #66 used
for demographics — or does OAA keep its own audit shape, accepting two provenance regimes?**

**Q-IN2-7.** §7.1 orders the review queue low-confidence-first, which is ruled. But class-A coded
values fail loudly (membership test) while class-B identifiers fail silently — a VIN with one
transposed character passes every check the system has and flows into definitions, requests, and
subpoenas looking correct (§7.4). **Should the review surface additionally mark high-confidence
identifiers that no independent check has corroborated, so "confident" and "corroborated" are not
displayed as the same thing — without disturbing the ruled queue order?**

**Q-IN2-8.** The CR-3's Person Type (list 14) enumerates driver, passenger, pedestrian,
pedalcyclist, motorcycle occupant; the directory's role vocabulary is derived from the party
registry *"so it cannot drift,"* and additions to CD-1's controlled vocabularies are spec-level
acts (§8). **Is mapping list 14 onto directory role tags a spec-level act requiring your ruling
on each mapped value — or may an extraction propose a role tag as a flagged suggestion the way it
proposes any other unverified fact?**

**Q-IN2-9.** IN-2's extraction half is GPU-arm gated behind Phase 1b, T3 is UNAUTHORIZED (KICK-1),
and the live crash report in the origin matter was image-only with no text layer — so the
"easiest possible target" still needs the gated arm (§3.3). Meanwhile FE-4 renders instrumentality
definitions from IN-2 fact rows that do not exist, and Q-FE4-3 asks what to do in the interim.
**Is there a deliberate interim IN-2 — the fact table and the discrepancy shape built and filled
by ATTORNEY HAND ENTRY, with no extractor at all — so the definitions block, the promotion gate,
and the flag mechanics can be exercised before the GPU arm opens? Or does splitting IN-2 that way
create a half-item that never gets finished?**

---

## 11. Provenance and status

- **Sources, named per item.** Repo files at the local checkout's HEAD (`74b8532`) via the device
  bridge, full text. `docs/reference/CR3-code-sheet-2023.pdf` read **twice** — once as rendered
  pages, then re-read via `pdftotext -layout` text extraction, which is the read every figure in
  §2 rests on (§2.5). **No web retrieval, no case-law retrieval, no external source of any kind.**
  Descrybe not used (TOOLING). The SOURCING convention's statute/rule/regulation layer was not
  engaged — nothing here is primary law.
- **Extraction discipline applied to this document's own reading**, per SOURCING: every figure
  §2 states was taken from raw extraction and cross-checked by a second targeted search; the one
  figure that could not be taken reliably (per-list cardinality beyond list 38) is **reported as
  not taken** rather than estimated. Two published readings of this sheet were already wrong — the
  design input's, and this session's own first pass — which is why.
- **Nothing verified.** Retrieval is not verification. No proposition is asserted, no registry file
  is touched, no cite is supplied, no status is moved.
- **Two figures corrected, one supersession recorded, no file edited** (§§2.2, 2.4).
- **Line counts** are non-blank per the 08-13 convention (#67); raw counts are labeled "raw".
- **The row stays ⬜.** A spec is not a closure, IN-2's extraction half is unruled, and its build
  is unauthorized.
