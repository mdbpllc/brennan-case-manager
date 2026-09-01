# HIPAA DE-IDENTIFICATION — REGISTRY ENTRY **CANDIDATES**, DRAFTED AND **NOT INSERTED**

**Canonical repo path:** `docs/specs/hipaa-deidentification-entry-drafts-2026-09-01.md`
**Status: DRAFTED, NOT INSERTED. NO REGISTRY FILE IS TOUCHED BY THE PACKET THAT CARRIES THIS.** These are CANDIDATES. **Every one is UNVERIFIED, and only Michael verifies.** Nothing here is a legal conclusion, nothing here is advice, and nothing here may be relied on in a filing or a build until Michael has verified it against the source himself.
**Why they exist:** the `H12-v` queue row flags, against its own sitting, that the HIPAA propositions stated as background at `#130` — *"the eighteen-identifier set, dates of service being among them, safe-harbor and expert determination as the two de-identification routes"* — are **"UNVERIFIED legal propositions never routed to the registry."** They have now been **retrieved from primary source**, which is a different act from verifying them.
**WHERE THESE WOULD BE INSERTED, IF ANYWHERE, IS AN OPEN QUESTION AND IS MICHAEL'S** — see §4.

---

## §1 — SOURCE AND CURRENCY, recorded before any proposition

| | |
|---|---|
| **Source** | **eCFR via official API** and the eCFR's own section page — the SOURCING convention's federal-regulations channel |
| **Instrument** | **45 CFR § 164.514(a)–(c)** — *"Other requirements relating to uses and disclosures of protected health information"*; Title 45 → Subtitle A (HHS) → Subchapter C → Part 164 (Security and Privacy) → Subpart E. *(a)–(b) were retrieved for the candidates; **(c) was retrieved at the PF-1 preflight**, on the same section page and the same day, because item (R) excepts it — it is set out at Candidate 3.* |
| **Request date** | **2026-09-01** (Central) |
| **URLs actually retrieved** | `https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514` (three passes) · `https://www.ecfr.gov/api/versioner/v1/titles.json` (two passes) · `https://www.ecfr.gov/api/versioner/v1/versions/title-45.json?part=164&section=164.514` · cross-checked against GPO XML for the 2024 and 2021 CFR editions |
| **⛔ CURRENCY — AND THE SOURCE DISAGREES WITH ITSELF. BOTH READINGS ARE RECORDED; NEITHER IS CHOSEN.** | **From the API (`titles.json`), title 45:** `up_to_date_as_of` **2026-08-28**, `latest_amended_on` **2026-08-28**, `latest_issue_date` **2026-08-28**. **From the HTML section page's own banner:** *"Displaying title 45, up to date as of 8/27/2026. Title 45 was last amended 8/26/2026."* **A one-to-two-day spread, in the source's own words, on the same site, on the same day.** It was NOT reconciled and NOT inferred. **Which governs is Michael's call.** *(The values were tested against a neighbouring title for a normalization artifact: title 44 returns `latest_amended_on` 2026-06-22 against `up_to_date_as_of` 2026-08-28, so the fields do vary independently and title 45's three matching values are a real reading.)* |
| **Section-level version history (versions API)** | two content versions, both dated 2016-12-30; `latest_amendment_date` **2016-12-30**, `latest_issue_date` **2023-03-30**. **Note without interpretation:** this differs from the section's own bracketed source credit, which stops at 78 FR 34266, June 7, 2013. **Both are recorded as retrieved; neither is reconciled.** |
| **The section's own source credit** | *"[65 FR 82802, Dec. 28, 2000, as amended at 67 FR 53270, Aug. 14, 2002; 78 FR 5700, Jan. 25, 2013; 78 FR 34266, June 7, 2013]"* |
| **eCFR's own disclaimer, carried on the page** | *"This content is from the eCFR and is authoritative but unofficial."* |
| **⛔ A SOURCING FINDING** | **`https://www.ecfr.gov/api/versioner/v1/full/` is ROBOTS-DISALLOWED** and cannot be used by a robots-respecting fetcher. `robots.txt` carries, under `User-agent: *`: `# Don't index developer tool links` / `Disallow: /api/renderer/v1/content/` / `Disallow: /api/versioner/v1/full/`. **Structural, not transient.** The `/versions/` and `/titles.json` endpoints and the `current/` section page are reachable. The SOURCING convention's *"prefer targeted part/section requests"* is right in principle. **The convention itself names NO endpoint** — what is unavailable is the `/full/` one a session would naturally reach for. **Amending the convention is Michael's.** |
| **⛔ RETRIEVAL METHOD, stated because it bounds every quotation in this document — INCLUDING paragraph (c) at Candidate 3, which was retrieved the same way on the same page at the preflight, on two passes rather than four** | Retrieved with `WebFetch`, which converts a page to markdown and extracts against a prompt — **so each quotation is a reproduction of the source, not a byte-level capture.** Four independent passes across two official sources (eCFR and GPO) and two publication years agreed on the full (A)–(R) list, on (C)'s wording, and on the source credit. **That is corroboration, NOT verification.** The robots block means the byte-exact eCFR XML is not reachable by this method at all. **Spot-checking against the raw source before any quotation enters a filing is Michael's act.** |
| **Extraction artifacts, reported rather than cleaned** | (i) On one pass, item (B)'s internally numbered sub-items *(1)* and *(2)* were collapsed inline; three other renderings showed them discrete, and the discrete form is used below. **A collapsed rendering makes (B) read as one continuous sentence and invites miscounting the zip-code proviso.** (ii) The paragraph headings in full are **"Standard: De-identification of protected health information."** and **"Implementation specifications: Requirements for de-identification of protected health information."** — **capital D in (a)'s, capital R in (b)'s; and note that (b)'s own heading then carries a LOWERCASE "de-identification" after "Requirements for."** A quotation that normalises the case either way is wrong in one of the two places. (iii) Italics in the source are STRUCTURAL — the numerals *(1)* / *(2)* inside item (B) are italicized precisely to distinguish a third-level numeral from a paragraph number. (iv) The versions API returns the section name with a multi-space gap after the number — a fixed-width field artifact. (v) `structure/2026-08-28/title-45.json` **loaded but was silently TRUNCATED before part 164 while reporting success** — a truncated-but-successful response would read as an absence of part 164 and **is not evidence of absence.** (vi) **No literal-`A`-for-space artifact** — that defect is characterized for the Texas Legislature's PDFs and this is XML, not PDF extraction. **The statute normalizer at `statute-pass-registry-retrieval-2026-08-14.md` §3 was NOT run on this text and must never be.** |

---

> **⛔ TWO WORDS USED THROUGHOUT THAT ARE NOT IN THE REGULATION, disclosed before the text rather than after it.** **"SAFE HARBOR" and "EXPERT DETERMINATION" appear NOWHERE in § 164.514** — they are HHS/OCR guidance labels for (b)(2) and (b)(1) respectively. **They are used below as shorthand and they are CLAUDE'S GLOSS, not the text's.** A reader who takes a candidate to the cite `45 CFR § 164.514(b)(2)(i)(C)` will not find the words *"safe harbor"* there. *Named because this document labels extraction artifacts down to an italic numeral, and a borrowed vocabulary worn as regulatory text is a larger defect than any of them.*

## §2 — THE OPERATIVE TEXT, VERBATIM (the `#108` drafting direction: registry Rule lines quote operative text verbatim where practicable)

### § 164.514(a)

> **(a)** *Standard: De-identification of protected health information.* Health information that does not identify an individual and with respect to which there is no reasonable basis to believe that the information can be used to identify an individual is not individually identifiable health information.

### § 164.514(b)

> **(b)** *Implementation specifications: Requirements for de-identification of protected health information.* A covered entity may determine that health information is not individually identifiable health information only if:
>
> **(1)** A person with appropriate knowledge of and experience with generally accepted statistical and scientific principles and methods for rendering information not individually identifiable:
>
> (i) Applying such principles and methods, determines that the risk is very small that the information could be used, alone or in combination with other reasonably available information, by an anticipated recipient to identify an individual who is a subject of the information; and
>
> (ii) Documents the methods and results of the analysis that justify such determination; or
>
> **(2)(i)** The following identifiers of the individual or of relatives, employers, or household members of the individual, are removed:
>
> (A) Names;
>
> (B) All geographic subdivisions smaller than a State, including street address, city, county, precinct, zip code, and their equivalent geocodes, except for the initial three digits of a zip code if, according to the current publicly available data from the Bureau of the Census:
>
> &nbsp;&nbsp;&nbsp;&nbsp;(*1*) The geographic unit formed by combining all zip codes with the same three initial digits contains more than 20,000 people; and
>
> &nbsp;&nbsp;&nbsp;&nbsp;(*2*) The initial three digits of a zip code for all such geographic units containing 20,000 or fewer people is changed to 000.
>
> **(C) All elements of dates (except year) for dates directly related to an individual, including birth date, admission date, discharge date, date of death; and all ages over 89 and all elements of dates (including year) indicative of such age, except that such ages and elements may be aggregated into a single category of age 90 or older;**
>
> (D) Telephone numbers;
>
> (E) Fax numbers;
>
> (F) Electronic mail addresses;
>
> (G) Social security numbers;
>
> (H) Medical record numbers;
>
> (I) Health plan beneficiary numbers;
>
> (J) Account numbers;
>
> (K) Certificate/license numbers;
>
> (L) Vehicle identifiers and serial numbers, including license plate numbers;
>
> (M) Device identifiers and serial numbers;
>
> (N) Web Universal Resource Locators (URLs);
>
> (O) Internet Protocol (IP) address numbers;
>
> (P) Biometric identifiers, including finger and voice prints;
>
> (Q) Full face photographic images and any comparable images; and
>
> (R) Any other unique identifying number, characteristic, or code, except as permitted by paragraph (c) of this section; and
>
> **(ii)** The covered entity does not have actual knowledge that the information could be used alone or in combination with other information to identify an individual who is a subject of the information.

---

## §3 — THE FOUR CANDIDATE ENTRIES

**Registry form: PROPOSITION · CITE · STATUS · SOURCE NAMED.** **All four are UNVERIFIED. None is inserted anywhere.** Each carries what it does NOT establish, because that is the half a build gets wrong.

---

### CANDIDATE 1 — the de-identification standard

| Field | |
|---|---|
| **PROPOSITION** | Health information that does not identify an individual, and as to which there is no reasonable basis to believe it can be used to identify an individual, **is not individually identifiable health information.** In the regulation's own words: *"Health information that does not identify an individual and with respect to which there is no reasonable basis to believe that the information can be used to identify an individual is not individually identifiable health information."* |
| **CITE** | 45 CFR § 164.514(a) |
| **STATUS** | **UNVERIFIED** |
| **SOURCE** | **eCFR via official API** — retrieved 2026-09-01; title 45 `up_to_date_as_of` **2026-08-28** per `titles.json`, **8/27/2026** per the section page's own banner (§1) |
| **DOES NOT ESTABLISH** | **the METHOD.** (a) STATES the standard; **(b) governs when a covered entity may DETERMINE that the standard is met** — and those are different objects, since (b) constrains the entity's determination rather than the information's underlying status. A record is not de-identified because it *looks* de-identified. |

---

### CANDIDATE 2 — there are exactly TWO routes, and they are exhaustive

| Field | |
|---|---|
| **PROPOSITION** | A covered entity may determine that health information is not individually identifiable **ONLY IF** one of two routes is satisfied: **(1) the (b)(1) route** *(the "expert determination" route, per OCR guidance — that label is not in the regulation)* — *"A person with appropriate knowledge of and experience with generally accepted statistical and scientific principles and methods for rendering information not individually identifiable"* both *"determines that the risk is very small that the information could be used, alone or in combination with other reasonably available information, by an anticipated recipient to identify an individual"* and *"Documents the methods and results of the analysis that justify such determination"*; **OR (2) the (b)(2) route** *(the "safe harbor" route, per OCR guidance — that label is not in the regulation)* — the eighteen identifiers of § 164.514(b)(2)(i) are removed **AND** *"The covered entity does not have actual knowledge that the information could be used alone or in combination with other information to identify an individual who is a subject of the information."* |
| **CITE** | 45 CFR § 164.514(b), (b)(1), (b)(2)(i)–(ii) |
| **STATUS** | **UNVERIFIED** |
| **SOURCE** | **eCFR via official API** — retrieved 2026-09-01 (currency as §1) |
| **DOES NOT ESTABLISH** | **(i)** that either route is available, appropriate, or sufficient for any particular record — that is a legal judgment on facts, and it is Michael's. **(ii)** The word **"only"** is the regulation's own and is load-bearing: **an ad-hoc scrub that is neither route is neither route.** **(iii)** Both limbs of the expert route are conjunctive — the determination AND the documentation. **(iv)** Safe harbor's second limb, (b)(2)(ii), is a **residual actual-knowledge condition that survives removal of all eighteen**; removal alone does not complete the route. |

---

### CANDIDATE 3 — the identifier list is (A)–(R), **eighteen**, and DATES are one of them

| Field | |
|---|---|
| **PROPOSITION** | The **(b)(2) route** *(the "safe harbor" route, per OCR guidance)* requires removal of **eighteen enumerated identifiers, lettered (A) through (R)**, *"of the individual or of relatives, employers, or household members of the individual"*. **Item (C) is the date identifier**, and reads in full: *"All elements of dates (except year) for dates directly related to an individual, including birth date, admission date, discharge date, date of death; and all ages over 89 and all elements of dates (including year) indicative of such age, except that such ages and elements may be aggregated into a single category of age 90 or older"*. Item **(R)** is a residual: *"Any other unique identifying number, characteristic, or code, except as permitted by paragraph (c) of this section"*. |
| **CITE** | 45 CFR § 164.514(b)(2)(i)(A)–(R); the date element at (b)(2)(i)(C) |
| **STATUS** | **UNVERIFIED** |
| **SOURCE** | **eCFR via official API** — retrieved 2026-09-01 (currency as §1); the (A)–(R) sequence corroborated across four passes and two official sources, **which is corroboration and not verification** |
| **THE COUNT, stated because the record has been careless about counts before** | **Eighteen lettered items, (A)–(R), unbroken — no gaps, no reserved or removed letters.** *"Seventeen identifiers plus a catch-all"* and *"eighteen identifiers"* count the same text; (R) is the catch-all. **Two ways to inflate the figure and both are wrong:** item (B)'s internally numbered *(1)* and *(2)* are components of ONE identifier, not two more (counting them yields 20); and item (C) bundles several distinct date elements into ONE identifier. **The `#130` sitting's "eighteen-identifier set" is CORRECT as to the count.** *(This is the ENTRY-COUNT ambiguity the project already met on session-log headings — when a count is stated, say what was excluded. Excluded here: (b)(2)(ii), which is a condition and not an identifier.)* |
| **DOES NOT ESTABLISH** | **(i)** whether any particular date in a medical chronology is *"directly related to an individual"* — that is a reading applied to a record, not a fact this entry supplies. **(ii)** That removing the eighteen de-identifies anything — (b)(2)(ii) still applies (Candidate 2). **(iii)** **how paragraph (c) applies to any particular record.** (c)'s TEXT is set out immediately below — it was retrieved at the preflight — but it bears on CODES, not on dates, it does not qualify Candidate 4, and whether a given arrangement satisfies (c)(1) and (c)(2) is a judgment on facts and is Michael's. |

**PARAGRAPH (c), RETRIEVED 2026-09-01 at the preflight and set out because (R) points at it and a later reader will reach for it:**

> **(c)** *Implementation specifications: Re-identification.* A covered entity may assign a code or other means of record identification to allow information de-identified under this section to be re-identified by the covered entity, provided that:
>
> **(1)** *Derivation.* The code or other means of record identification is not derived from or related to information about the individual and is not otherwise capable of being translated so as to identify the individual; and
>
> **(2)** *Security.* The covered entity does not use or disclose the code or other means of record identification for any other purpose, and does not disclose the mechanism for re-identification.

**CHARACTERIZATION:** (c) permits a **re-identification CODE** — the mechanism by which a firm could keep a matter-number link on an otherwise de-identified record — subject to (c)(1) derivation and (c)(2) security. **It cannot rescue a date-retaining chronology and does not qualify Candidate 4.** It is set out here precisely because it is what a session re-proposing a strip would reach for, and the closure note below reaches it too.

---

### CANDIDATE 4 — the entry that bears on the design, and it is the one to read slowly

| Field | |
|---|---|
| **PROPOSITION** | Under the (b)(2) route, **"All elements of dates (except year) for dates directly related to an individual, including birth date, admission date, discharge date, date of death; and all ages over 89 …"** must be removed for the record to be de-identified by that route. **A treatment chronology retaining DAY-LEVEL dates directly related to the individual is therefore not de-identified by that route**, whatever else has been stripped from it. |
| **CITE** | 45 CFR § 164.514(b)(2)(i)(C), read with § 164.514(b)(2)(i) and (b)(2)(ii) |
| **STATUS** | **UNVERIFIED** |
| **SOURCE** | **eCFR via official API** — retrieved 2026-09-01 (currency as §1) |
| **WHY IT IS DRAFTED AT ALL** | It is the primary-source form of the reason the **stripped-chronology approach was REJECTED at `#130`** — *"dates of service are themselves identifiers, and a chronology tied to a matter with one plaintiff is re-identifiable."* **The rejection stands and is not re-litigated; this entry records the authority the record had been resting on without a cite.** |
| **⛔ DOES NOT ESTABLISH — read this before the proposition is used for anything** | **(i)** It says nothing about the **(b)(1) EXPERT-DETERMINATION route**, which is a separate and independent path untouched by the (b)(2) identifier list. **⛔ THAT SILENCE IS NOT AN OPENING** — see the closure note beneath this table. **(ii)** It establishes nothing about **re-identifiability** as a general matter — the *"tied to a matter with one plaintiff"* half of the `#130` reasoning is NOT in this text and would sit, if anywhere, under (b)(2)(ii)'s actual-knowledge condition or under the expert route's risk analysis. **That half remains unsourced.** **(iii)** IT DOES NOT MATTER TO THE BUILD AS DESIGNED, and saying so is the point: **the ruled payload is the FULL chronology, unmodified, and the BAA is what makes that lawful — not de-identification** (REQ-CAPTURE §16.2, §16.3). **(iv) ⛔ IT DOES NOT ESTABLISH THAT *ANY* DATE DEFEATS THE ROUTE.** The regulation **EXCEPTS THE YEAR**, and permits ages over 89 to be *"aggregated into a single category of age 90 or older."* **A year-only or age-banded rendering is not foreclosed by this text**, and an entry read as "any date at all" would forbid more than the regulation does. **(v)** Nor does it establish that any PARTICULAR chronology date is *"directly related to an individual"* — that is a reading applied to a record (Candidate 3, caveat (i)), and it is Michael's. |

> **⛔ THE CLOSURE IS OF THE APPROACH, NOT OF ONE ROUTE TO IT — and this note exists because caveats (i) and (iv) would otherwise read as a map back in.** Candidate 2 sets out BOTH statutory routes in full quoted detail, and this entry marks the expert route untouched and the year excepted. **A later reader could assemble from those a primary-sourced path to exactly the thing that is closed** — obtain an expert determination, or reduce dates to years, and send a de-identified chronology. **DO NOT.** The stripped-chronology approach is **REJECTED, and it is rejected AS AN APPROACH**, on Michael's ruling and on the ruled payload (REQ-CAPTURE §16.2: the full chronology, unmodified, the BAA as the mechanism and not content engineering). **Reviving de-identification on ANY theory — safe harbor, expert determination, year-only dates, age banding, a re-identification code under (c) — is a NEW RULING FOR MICHAEL, never a reading of these entries.** *These four candidates exist to record the authority the record was resting on without a cite. They are not a licence to try a better strip.*

---

## §4 — WHERE THESE WOULD GO, IF ANYWHERE — **OPEN, AND MICHAEL'S**

**No registry file is touched by the packet carrying this document, and none may be until Michael rules where these belong.**

The existing registry set is Texas-practice and discovery-facing — at HEAD: `legal-rule-registry-discovery-and-carrier-duties.md`, `-discovery-enforcement-and-pleading.md`, `-criminal-plea-and-costs.md`, `-draft-entries-medical-billing.md`. **These four candidates are FEDERAL REGULATORY entries about health-information privacy** — a different body of law, a different currency mechanism (an API's `up_to_date_as_of` rather than a corpus download date), and a different verification burden.

**⛔ AND THIS QUESTION IS NOT NEW — IT IS THE SAME QUESTION AS `G10-4` / `Q-WF-6`, OPEN SINCE 2026-08-19, AND ANSWERING ONE ANSWERS THE OTHER.** `docs/specs/g10-4-ch521-entry-drafts-2026-08-19.md` (present at HEAD `7f02131`, measured over the device bridge at 29,694 B) holds **SEVEN** drafted-not-inserted candidates in exactly this posture, and BUILD-STATE records their disposition in these terms: *"Whether any is inserted, and where — the siblings' placement rule points at a NEW file, not a fold-in — is `G10-4` / `Q-WF-6`, yours."* **The consequence Michael should see before he rules: a ruling here that creates a new registry file either becomes the home for those seven as well, or creates a SECOND new file and splits out-of-family propositions across two homes.** *Neither is wrong; what would be wrong is doing it without seeing it.* **CHARACTERIZATION: that the siblings' rule points at a new file is Claude's reading, and it was Claude's reading in August too; the decision has been Michael's for thirteen days.**

**THIS IS REALLY TWO QUESTIONS, and saying so before recommending is CC-1(a)'s last limb:**
**(i) WHICH candidates are inserted at all — four, one, or none?**
**(ii) INTO WHICH FILE — a new federal-regulatory registry file, or an existing one?**
An option that answers only (i) leaves a build with an entry and no home. **Four shapes, put as a way of asking and not as a menu — and the fourth is the one a session would miss:**

1. **A NEW registry file** for federal regulatory propositions the build relies on, these four as its first entries.
2. **Fold into an existing registry file** — cheaper, but mixes bodies of law and currency mechanisms in one place.
3. **Insert NONE of them.** Defensible on the merits: **the build as designed does not rely on any of these propositions** — the payload is ruled unmodified and the BAA is the mechanism (Candidate 4's third caveat). **Registry discipline attaches to propositions a MODULE RELIES ON; if none is load-bearing, none needs an entry**, and this document then stands as the retrieval that showed so.
4. **Insert only Candidate 4** — the standing record of why the stripped-chronology approach is closed — **and the destination must be named, which is limb (ii): the honest home for a single federal-regulatory entry is a NEW file, since none of the four existing registry files is about federal health-information privacy.** *(A one-entry file is a small thing; a federal entry filed inside a Texas discovery registry is a misfiled thing.)*

**Claude's recommendation, stated because CC-1(a) requires a recommendation and not a menu: OPTION 4, into a NEW file that would also be the home `G10-4` has been waiting for.** The ground: Candidate 4 is the only one of the four that has ever done work in this record — it holds a REJECTED approach closed and gives the rejection a cite it has never had — while options 1 and 2 file three propositions **no module relies on**, and option 3 leaves the rejection's authority uncited. **Naming the new file as `G10-4`'s home too is what stops a second one being created next month.**

**The alternatives are named above and the answer may well be outside all four.** Two composites worth naming rather than leaving to be discovered: **(a) 4-now-into-a-new-file, with `G10-4`'s seven following into it as its own act**; and **(b) NONE-now — option 3 — with Candidate 4's closure carried instead by the REQ-CAPTURE and by this document, on the reasoning that a registry entry no module relies on is a maintenance burden with a verification cost attached.** *Option 3 is genuinely defensible and is not offered as a straw man: registry discipline attaches to propositions a MODULE RELIES ON, the build as designed relies on none of these, and Michael has said no to more machinery before.*

**Whatever he rules: ADOPTION DOES NOT VERIFY.** An inserted entry stays **UNVERIFIED** until Michael verifies the text himself, and verification attaches to the WORDING (`#95`) — so if he edits a proposition's words, verification attaches to the edited words and not to these.

---

*End. DRAFTED, NOT INSERTED. Every proposition UNVERIFIED. Retrieval is not verification; only Michael verifies. Produced 2026-09-01 Central under CHAT-DISPATCH v5 Task 2 by a typed Opus 5 design session. PF-1 fired on this document.*
