# WS-3 — the privilege limit on TRCP 192.3(h): the leads read, and the gap closed

**Canonical repo path:** `docs/specs/ws3-privilege-authority-read-2026-08-17.md`
**Status: PROPOSED / staging. The drafted entry enters UNVERIFIED. Retrieval is not
verification — ONLY MICHAEL VERIFIES. Nothing here is built.**
Successor staging memo to the witness-statement conversion memo's **§3 territory** (that memo's
canonical doc is not edited by this one). Drafted 2026-08-17 Central (design session, Opus 5,
Cowork) under CHAT-DISPATCH v4 **T-28**, executing `WS-3` as ruled 2026-08-17.

> ## ⚠ CORRECTED IN PLACE 2026-08-18 — READ THIS FIRST
> Audited adversarially 2026-08-18. **The core proposition survived everything thrown at it** —
> comment 9 limits 192.3(h) by privilege, quoted accurately, correct pinpoints, correct V-9
> identification. **The surrounding architecture did not.** §4 attributed to the 2021 amendments a
> work-product bar that has sat in Rule 194.5 since **1999**, then declared "UNDECIDED" a question
> **TRCP 192.5(c)(1) answers on its face** — and which this project **already carries as a VERIFIED
> registry entry.** §3.1's adjuster sentence is **WITHDRAWN**. Each correction is recorded at
> session-log **`#103`**; the original text stands at commit `a25c484`.

---

## 0. HEADLINE — WS-3's premise no longer holds

BUILD-STATE records `WS-3` as *"the load-bearing gap: **NO TEXAS AUTHORITY was located**
deciding whether 192.3(a)'s non-privileged limit governs (h)"* — and notes that *"the whole
client-recording and intake-recording posture rests on it."*

**Authority was located, read in full, and it decides the question.** Two published intermediate
appellate opinions, each with majority authorship confirmed **on the face of the document**
(V-9), hold that Rule 192.3(h)'s breadth is limited by privilege — and both reach it through the
rule's **own comment 9** rather than through 192.3(a) directly. That derivation matters and is
stated precisely in §3 below, because the ruled proposition names 192.3(a) and the cases name
comment 9.

**The gap is closed on the attorney-client limb and is NOT closed on the work-product limb** —
and the reason is a 2021 rule change neither case could have addressed. §4.

---

## 1. Provenance of the leads, stated once

The lead list came from **Michael's own Lexis Protégé run**, supplied in-session at the 2026-08-17
adjudication. Per registry discipline as clarified at that session: **a vendor AI research
assistant is a MODEL for verification purposes — its answers are LOCATORS for primary sources,
never authority and never verification.** No Protégé text is quoted, cited, or relied on below.
Every proposition in §3 rests on a primary opinion read in full through **FLP/CourtListener**
(TOOLING; Descrybe is out by ruling).

---

## 2. THE LEAD SWEEP — what resolved, what did not

Checking whether each locator resolves is itself a finding, because the locator is a model.
**Method named per QR-6(a):** FLP `search` by `citation`, and by caption where the citation
returned nothing. **FLP throttles at 5 req/min and did so twice during this pass** — recorded
because it paced the work.

| Lead as supplied | FLP result | Read? |
|---|---|---|
| ***In re ExxonMobil Corp.*, 97 S.W.3d 353** (Houston [14th] 2003) | **✓ CONFIRMED**, cite exact. Published. 2003-01-31. | **FULL** |
| ***In re Fontenot*, 13 S.W.3d 111** (Fort Worth 2000) | **✓ CONFIRMED**, cite exact. Published. 2000-01-26. | **FULL** |
| *In re Jimenez*, 4 S.W.3d 894 (Houston [1st] 1999) | **✓ CONFIRMED** (reached through *Fontenot*'s own citation link). | via *Fontenot* |
| *In re City of Dickinson*, 568 S.W.3d 642 (Tex. 2019) | **✓ CONFIRMED**, cite exact. Tex. Sup. Ct., 2019-02-15. | not read — §5 |
| *In re CSX Corp.*, 124 S.W.3d 149 (Tex. 2003) | **✓ CONFIRMED**, cite exact. Tex. Sup. Ct., 2003-10-03. | not read — §5 |
| *In re Baytown Nissan*, 451 S.W.3d 140 (Houston [1st] 2014) | **✓ CONFIRMED**, cite exact. 2014-11-07. | not read — §5 |
| *Pope v. State*, 207 S.W.3d 352 (Tex. Crim. App. 2006) | **✓ CONFIRMED**, cite exact. 2006-11-15. | not read — §5 |
| *In re Young*, 410 S.W.3d 542 (Beaumont 2013) | **⚠ CITE RESOLVES, SUBJECT DOUBTFUL.** 410 S.W.3d 542 is ***In re Commitment of Michael Elbert Young*** — a sexually-violent-predator **civil-commitment** case, not on its face a discovery-privilege case. **The locator may have matched a cite to the wrong proposition.** | **not read — flagged** |
| *Univ. of Tex. Sys. v. Franklin Ctr.*, 675 S.W.3d 273 (Tex. 2023) | **⚠ CASE REAL, CITE NOT CONFIRMED.** *Univ. of Tex. Sys. v. Franklin Ctr. for Gov't & Pub. Integrity*, Tex. Sup. Ct., decided **2023-06-30** — but FLP carries **TWO clusters of the same caption and date, and NO reporter citation on either.** `675 S.W.3d 273` returns **0 results**. | **not read — V-9 STOP** |
| *In re Kona Coast Venture, Ltd.*, 730 S.W.3d 683 (Austin 2026) | **⚠ CASE REAL, CITE NOT CONFIRMED.** An Austin (3rd Dist.) mandamus of that caption exists — but as **TWO clusters, 2026-01-08 and 2026-01-22, neither carrying a reporter citation.** `730 S.W.3d 683` returns **0 results**. | **not read — V-9 STOP** |
| *In re Scherer*, 684 S.W.3d 875 (Eastland 2024) | **✗ NOT LOCATED.** Neither `684 S.W.3d 875` nor the caption `"In re Scherer"` returns it. | **not read** |
| TRE 503 | Rule, not a case. **Its text was NOT read from a clean-authority PDF this session** — the granted `Knowledge Repo\Civil\` path holds the TRCP and TRAP PDFs only. Quoted below **only as the opinions quote it.** **No TRE entry is created.** | see §5 |

**Two disciplined caveats, neither smoothed:**

1. **Absence from FLP is not proof of non-existence.** FLP's coverage of recent Texas
   intermediate opinions and its reporter-citation ingestion both lag. *Scherer* may exist;
   *Franklin Ctr.* and *Kona Coast* plainly do exist and simply have no S.W.3d cite in FLP yet.
   The honest statement is **NOT LOCATED / NOT CONFIRMED**, not "wrong."
2b. **RR-1 ADDITION, from the later T-31 pass: the multi-cluster problem below is SYSTEMIC, not a
    property of these two cases.** The designation-source research subsequently found FLP returning
    **three** clusters for a single *Collins v. Kappa Sigma* opinion (02-09-00305-CV, 22 Apr 2010)
    — identical caption, date and docket. So the two-cluster results at *Franklin Ctr.* and *Kona
    Coast* are the ordinary FLP shape rather than a signal about those cases in particular, and no
    inference should be drawn from cluster multiplicity itself. See
    `docs/specs/designation-source-method-research-2026-08-17.md` §1.1 and its `Q-DES-5`.

2. **`Franklin Ctr.` and `Kona Coast` are live V-9 exhibits, and they are why the rule exists.**
   Each returns **two clusters of the same caption**, so a cluster ID resolves to *an* opinion
   and not reliably to *the majority*. Neither is characterized here, neither is cited in the
   drafted entry, and **both are flagged and NOT staged for verification** — V-9's floor
   ("cannot identify — stop") applied as written. Resolving them needs the court's own document
   or a paginated vendor copy stating authorship on its face; **Michael's pull, his hand.**

---

## 3. THE TWO OPINIONS READ IN FULL — findings against the actual texts

### 3.1 *In re Fontenot*, 13 S.W.3d 111 (Tex. App.—Fort Worth 2000, orig. proceeding)

**V-9 majority identification: SATISFIED from the document's own face** — the FLP rendering
carries `<opinion type="majority">` and the author line **"TERRIE LIVINGSTON, Justice."**
*(Note the V-9 hazard in the metadata: FLP's `judge` field returns* **"Day, Livingston,
Richards" — the PANEL, not the author.** *A session trusting that field would have mis-attributed
the opinion. The face of the document is what identified it.)*

**Facts.** A physician received pre-suit notices of claim, wrote a letter to his liability
carrier copying the attorney the carrier had retained for him in another suit, and later sent the
carrier a claims questionnaire incorporating that letter. The plaintiffs served a request for
disclosure seeking witness statements and argued the new witness-statement rule reached both
documents.

**The load-bearing passage, quoted from the opinion:**

> "The new discovery rules provide that '[a] party may obtain discovery of the statement of any
> person with knowledge of relevant facts — a "witness statement" — regardless of when the
> statement was made.' Tex.R. Civ. P. 192.3(h). **Comment nine to the rule, however, instructs
> that this broad rule applies only to non-privileged statements:** '[e]limination of the
> "witness statement" exemption does not render all witness statements automatically discoverable
> but subjects them to the same rules concerning the scope of discovery and *privileges*
> applicable to other documents or tangible things.' Tex.R. Civ. P. 192.3(h), cmt. 9 (emphasis
> added)."

*(Quotation hygiene, added 2026-08-18: **bold emphasis is mine; the italics on "privileges" are the
court's**, and the court's own "(emphasis added)" refers to those italics alone. Separately, the
FLP rendering carries three OCR artifacts in this passage — **"rales" for "rules"** — normalized
here and **reported rather than silently corrected**, per SOURCING. The reading is corroborated by
*ExxonMobil*'s independent rendering of the same comment.)*

**And the reasoning that makes it a holding rather than an aside:**

> "To adopt Jones' broad interpretation of the witness-statement rule would make all witness
> statements discoverable and would effectively abrogate the attorney-client privilege. … we
> believe that if the Texas Supreme Court had intended to eliminate the attorney-client privilege
> as it applies to witness statements it would have expressly done so."

**Disposition:** mandamus; the documents were privileged and not subject to discovery.

**The boundary the case actually draws — and it is narrower than "witness statements are
privileged."** *Fontenot* protected the physician's **own** statement, made to his **own**
attorney and to his carrier as a **"representative of the client"** under TRE 503(a)(2). The
opinion expressly distinguishes *In re W & G Trucking*, where the same privilege failed because
**"there was no evidence that showed the person giving the statement was a client."** It also
distinguishes *Jimenez* and *Team Transport* as **work-product** cases under then-Rule
192.5(b)(2), not attorney-client cases.

> ### ⚠ THE PARAGRAPH THAT STOOD HERE IS WITHDRAWN — 2026-08-18, `#103`
> ~~"PRACTICE CONSEQUENCE, and it cuts against the firm's exposure rather than for it: on this
> line, a statement taken from a **third-party witness or an adjuster** is *not* protected by the
> attorney-client privilege at all — the declarant is not the client. The quietest exposure the
> T-22 memo identified (the adjuster call) is not cured by this authority; it is confirmed by it."~~
>
> **This was the most dangerous sentence in the packet** — an operational certainty stated to a
> working practice, wrong on three independent grounds. **(1)** *W&G Trucking*'s declarant was the
> **defendant driver, a party**, and the claim failed on a **failure of proof**: *"We reject that
> contention because it is not supported by the facts… the record does not establish that Jamison
> was a 'client.'"* **(2)** A Texas court of appeals held the **opposite** on an adjuster's recorded
> statement, applying *Fontenot*: *In re Arden*, 2004 WL 576064 (Tex. App.—El Paso 2004, orig.
> proceeding) — *"the insurance adjuster's role in recording the witness statements … would
> reasonably be interpreted as a representative of the client … rendering their communication
> protected by the attorney-client privilege."* **FLAGGED, NOT ADOPTED — located through FLP
> snippets; no V-9 majority check was run; it must be pulled and identified before it enters
> anything.** **(3)** This memo's own load-bearing case protected documents whose witness-statement
> content was **precisely a recounting of a third party's words** (ExxonMobil documents 9760, 8729).

**PRACTICE CONSEQUENCE — A BURDEN LESSON, NOT A CATEGORICAL ONE.** The privilege turns on **TRE
503's elements being proved on the record**, not on the label "witness statement." *Fontenot* holds
a liability carrier **can** be a "representative of the client" under 503(a)(2); *W&G Trucking*
shows the proof must actually be made. **Whether an adjuster call is protected depends on whose
adjuster, and on whether the record establishes that representative relationship.** The T-22
adjuster-call exposure is **neither confirmed nor cured** by this authority — it is made
**contingent on record-building at the time of the call.** That is sharper and more actionable than
the sentence withdrawn above, and it points at something the firm can actually do.

### 3.2 *In re ExxonMobil Corp.*, 97 S.W.3d 353 (Tex. App.—Houston [14th Dist.] 2003, orig. proceeding)

**V-9 majority identification: SATISFIED from the document's own face** — `<opinion
type="majority">`, author line **"CHARLES SEYMORE, Justice."**

**What it adds.** ExxonMobil quotes the same comment 9, adopts *Fontenot* expressly, and applies
it **twice** to a recurring trial-court error: ordering production of the "witness statement"
portion of a document the court had impliedly found privileged.

> "As held in *Fontenot*, a witness statement contained within a confidential communication
> between attorney and client is privileged and protected from discovery. 13 S.W.3d at 114. The
> State can obtain information concerning conversations with the witnesses by means other than
> invading the privilege."

> "Having implicitly found document 9760 to be privileged, except for the alleged witness
> statement, the trial court **failed to follow case law holding that witness statements
> contained within a confidential communication between attorney and client are privileged.**
> Accordingly, we find the trial court abused its discretion…"

Applied again to document 10819: *"We find the trial court abused its discretion in ordering the
factual portion of an otherwise privileged document produced."*

**Why this is the load-bearing exhibit.** It is **a second** court of appeals to so hold, it adopts
the first by name, and it supplies the operational rule the firm actually needs: a privileged
document does **not** become partly producible because a passage inside it recounts a witness
conversation. *(Corrected 2026-08-18: the original said "**the** second," an unsupported negative —
this pass read two opinions and ran no citator, and a **third** court so held in* In re Arden
*(El Paso 2004). No claim is made that no other court has done so.)*

**⚠ A PRECONDITION THE ORIGINAL UNDERSTATED, added 2026-08-18.** ExxonMobil never independently
adjudicated privilege as to documents 9760 or 10819 — it took the trial court's **implied finding**
as given because the State, not being the relator, could not attack it (*"Because the State is not
the relator and does not challenge the trial court's ruling, we are unable to address the State's
grounds"*). And the threshold burden runs the other way: *"The party resisting discovery bears the
burden of proving any applicable privilege."* The same opinion **denied** relief as to other
documents on **waiver** grounds. **So establishing that the document is a privileged communication,
and defeating waiver, is doing at least as much work as comment 9** — this entry must not be read
as "witness statements inside anything sent to a lawyer are safe."

**Retrieval note, recorded because it would mislead an automated citator:** in FLP's rendering of
ExxonMobil, several `Id.` citations in the comment-9 and *Fontenot* discussion are hyperlinked to
**`/opinion/1572796/in-re-stevens/`** — *In re Stevens*, which is **not** the source of either.
This is FLP's citation-resolution mis-linking, not an error in the opinion. **The text was read;
the links were not followed as authority.** (This is the class of defect `FE-16` would have to
survive.)

---

## 4. THE 2021 AMENDMENTS — what actually changed, and what did not

> ⚠ **THIS SECTION WAS REWRITTEN 2026-08-18. The original was headed *"THE LIMIT ON ALL OF IT — a
> 2021 rule change neither case addresses"* and was wrong at its premise.** It is corrected here
> rather than deleted, because the mistake shaped an open item that would have cost Michael a
> ruling on a question the rules already answer.

**What the 2021 amendments changed is TIMING, not the work-product bar.** The comment to Rule 194
records the 1999 design in its own words — disclosure is afforded *"without preparation of a
lengthy inquiry, and **without objection or assertion of work product**"* — so **Rule 194.5's bar
is a 1999 provision, not a 2021 one.** The pre-2021 text read *"to a request under this rule"*; the
current text reads *"to a disclosure under this rule."* **The 2021 comment describes a different
change entirely:** Rule 194 was amended *"to require disclosure of basic discovery automatically,
without awaiting a discovery request."*

**Decisively: *Fontenot* itself was decided against a live 194.5 work-product bar.** Its vehicle was
a **Request for Disclosure under 194.2(i)**, and *In re Jimenez* argued 194.5 **in 1999**: *"(3)
under Tex.R. Civ. P. 194.5, no objection or assertion of work product is permitted to a request for
disclosure under Tex.R. Civ. P. 194.2."*

**So the two limbs resolve as follows — and the work-product limb is NOT undecided:**

- **ATTORNEY-CLIENT — the *Fontenot*/*ExxonMobil* line SURVIVES, and on better support than the
  original gave it.** The original rested on 194.5's *silence*. The rules say it affirmatively:
  **TRCP 193.2(f)** — *"A party **should not object** to a request for written discovery on the
  grounds that it calls for production of material or information that is privileged **but should
  instead comply with Rule 193.3**"*; **TRCP 193.3(a)**, which expressly contemplates withholding
  privileged material from a *"**required disclosure**"* — the 2021 initial-disclosure vocabulary;
  and the Rule 194 comment — *"a party may assert any applicable privileges **other than work
  product** using the procedures of Rule 193.3."* **An objection (which 194.5 bars) is a formally
  distinct act from a privilege assertion under 193.3, and the rulemakers wrote the machinery for
  asserting privilege against exactly this.**
- **WORK PRODUCT — SETTLED THE OTHER WAY, and not by these cases.** ~~"the *Jimenez*/*Team
  Transport* line is DISTURBED, and no located case says how"~~ — **withdrawn.** Those cases did
  not *resolve* witness-statement disputes on a work-product assertion; they **rejected** it and
  **ordered production**, on a rule still in force verbatim. **TRCP 192.5(c)(1):** *"Even if made or
  prepared in anticipation of litigation or for trial, the following is **not** work product
  protected from discovery: (1) information discoverable under Rule 192.3 concerning experts, trial
  witnesses, **witness statements**, and contentions."* So 192.5(c)(1) and 194.5 point the **same**
  direction, and the same direction *Jimenez* and *Team Transport* already went. **There was
  nothing to disturb.**

**AND THIS PROJECT ALREADY CARRIES IT AS A VERIFIED ENTRY.** `legal-rule-registry-discovery-
enforcement-and-pleading.md` holds `## TRCP 192.5(c)(1) — witness statements excepted from
work-product protection`, **Status: VERIFIED — Michael, 2026-08-17** — and its own *"Relied on for"*
names the `privilege_tier` questions this memo was writing toward. **The gap the original section
announced did not exist, and the answer was already signed off.**

**A witness statement is therefore not shielded by work product, whether demanded by request or
owed as an initial disclosure. The live question is the attorney-client limb only** — and §6's
`Q-WS3-1` is rewritten accordingly.

---

## 5. What was NOT read, and why — stated rather than left silent

Five confirmed cases were **not** read in full: *City of Dickinson*, *CSX*, *Baytown Nissan*,
*Pope*, and *Jimenez* (beyond *Fontenot*'s treatment of it). The drafted entry does not cite any
of them, so none is characterized here. **Reason, plainly: the ruled question was decided by the
first two opinions read, and characterizing an opinion requires reading the relevant passages in
full — which this pass did not spend on cases the entry does not rest on.** They remain available
and are listed at §6 so the choice is Michael's, not silently made for him. *In re Young* was not
read because its cite resolves to an apparently unrelated commitment case; *Franklin Ctr.*,
*Kona Coast* and *Scherer* were not read for the reasons at §2. **TRE 503's own text was not read
from clean authority** — only as *Fontenot* quotes it.

**⚠ AND A CONTROLLING SUPREME COURT CASE ON THE LOAD-BEARING ELEMENT WAS NEVER LOCATED — added
2026-08-18.** ***In re XL Specialty Insurance Co.*, 373 S.W.3d 46 (Tex. 2012)** is the Texas Supreme
Court's construction of **TRE 503(a)(2) "representative of the client" in the insurer/insured
setting** — the exact element *Fontenot* turns on, decided nine years after *ExxonMobil*: *"Cintas
could not have been a 'representative of the client,' as it did not have the authority to obtain
legal services for its insurer, XL."* It does **not** address comment 9 and does **not** overrule
*Fontenot* — different posture — but it **governs the element on which this entry's protection
depends**, and it bears directly on the firm's own carrier-communication posture. **LOCATED, NOT
READ, NOT V-9-IDENTIFIED.** `Q-WS3-5` asked whether the Supreme Court has touched this area and
answered it from a five-case list that **did not contain the Supreme Court case on point**; that
question cannot be answered honestly until *XL Specialty* is read.

---

## 6. THE DRAFTED ENTRY — `WS-3`, put to Michael

Destination: `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md`, in **subject
order** immediately after the existing `## TRCP 192.3(h) — witness statements discoverable`
entry, which it qualifies. **Takes the backlog to 47 on execution** (46 after T-29's six).

```markdown
## TRCP 192.3(h) — the privilege limit on witness-statement discovery

**Cite:** Tex. R. Civ. P. 192 cmt. 9 (the comment is to **Rule 192**, not to 192.3(h) — corrected 2026-08-18; *Fontenot* uses the loose form); Tex. R. Civ. P. 192.3(h); *In re Fontenot*, 13 S.W.3d 111, 113–14 (Tex. App.—Fort Worth 2000, orig. proceeding); *In re ExxonMobil Corp.*, 97 S.W.3d 353, 359–60, 362 (Tex. App.—Houston [14th Dist.] 2003, orig. proceeding).
**Rule.** Rule 192.3(h)'s grant of discovery of "the statement of any person with knowledge of relevant facts — a 'witness statement' — regardless of when the statement was made" is **not unlimited by privilege.** Comment 9 to Rule 192 provides that eliminating the former witness-statement exemption "does not render all witness statements automatically discoverable but subjects them to the same rules concerning the scope of discovery **and privileges** applicable to other documents or tangible things." Two courts of appeals have construed comment 9 as a privilege limit on 192.3(h): ***Fontenot*** so held as to documents that were themselves privileged communications; ***ExxonMobil*** extended it to the **witness-statement portion of a document the trial court had impliedly found privileged**, resting that extension on *Huie*, *Valero* and *Pittsburgh Corning* as well as *Fontenot*. **The protection is conditional and the conditions do real work:** the communication must satisfy TRE 503, and the party resisting discovery **bears the burden of proving the privilege and defeating waiver** — in *ExxonMobil* the trial court had already impliedly so found and the opposing party, not being the relator, could not challenge it, while the same opinion **denied** relief as to other documents on waiver. In *Fontenot* the declarant was the **client** and the recipient a **representative of the client** under TRE 503(a)(2); **whether a given recipient is such a representative is itself contested and is governed by *In re XL Specialty Ins. Co.*, 373 S.W.3d 46 (Tex. 2012), which this pass located but did not read.**
**Status:** UNVERIFIED.
**Relied on for:** the client-recording and intake-recording posture generally; the transcription-pipeline boundary (`Q-COM-12`); and the PRIV limb of the DE-1 deficiency taxonomy, where an opponent's demand for a witness statement embedded in privileged material is resistible rather than automatic.
**Derivation note — read this before relying on the shorthand.** The ruled proposition is phrased as *"192.3(a)'s non-privileged limit governs (h)."* **Both opinions reach the result through comment 9, not through 192.3(a) by name.** Comment 9's own words import "the same rules concerning the scope of discovery and privileges," and 192.3(a) is where the "not privileged" limit sits — so the substance is supported, but **no located case says "192.3(a) governs 192.3(h)" in those terms.** Stated this way deliberately rather than smoothed.
**SCOPE — this entry states the ATTORNEY-CLIENT limit only, and the work-product limb is settled elsewhere (corrected 2026-08-18).** A witness statement is **not** work product: TRCP 192.5(c)(1) excepts "information discoverable under Rule 192.3 concerning … witness statements" from work-product protection "even if made or prepared in anticipation of litigation," and *In re Jimenez* and *In re Team Transport* applied that provision and **ordered production**. Rule 194.5 independently bars a work-product assertion against a Rule 194 disclosure — **a 1999 provision, not a 2021 one.** That proposition already exists in this file as `## TRCP 192.5(c)(1) — witness statements excepted from work-product protection`, **VERIFIED — Michael, 2026-08-17**, and this entry does not disturb it. **What this entry adds is the attorney-client limit, which 194.5 does not name and 192.5(c)(1) does not reach.**
**Adopted boundary (C-XL-1, ruled 2026-08-18, #108, Q-WS3-5):** TRE 503(a)(2) "representative of the client" requires authority to obtain legal services on behalf of that client; an insurer and insured are not automatically representatives of each other, and in a posture where their interests are adverse the privilege does not reach between them. In re XL Specialty Ins. Co., 373 S.W.3d 46 (Tex. 2012) (Jefferson, C.J., for the Court).
**Adopted condition (C-ARD-1, ruled 2026-08-18, #108, Q-WS3-6):** an insured's own recorded statement, taken by his carrier's adjuster who is acting to obtain and facilitate the legal defense the carrier owes him, may be protected by the attorney-client privilege where the record establishes that role. In re Arden, 2004 WL 576064 (Tex. App.—El Paso 2004, orig. proceeding) (mem. op., Barajas, C.J.; civil; no reporter cite — designation stated per V-9).
**Source:** primary opinions read in full via FLP/CourtListener 2026-08-17, majority authorship confirmed on the face of each document per the V-9-amended rule (*Fontenot* — Livingston, J.; *ExxonMobil* — Seymore, J.). Rule and comment text: clean-authority PDF, `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` (filename currency designation, caveat as at WP-1/2/3). Leads located via Michael's Lexis Protégé run — **LOCATOR ONLY, not authority, not cited.**
**Pinpoint caveat.** Page pinpoints are taken from star pagination in the FLP rendering. **Verify against the reporter before any quotation enters a filing** (house rule).
```

### Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-WS3-1` | **REWRITTEN 2026-08-18 — the original question was built on a false premise and is withdrawn.** It asked whether to mint an entry on the work-product limb because "no located authority decides it." **The rules decide it:** TRCP 192.5(c)(1) excepts witness statements from work-product protection on its face, *Jimenez* and *Team Transport* applied it and ordered production, and **this file already carries 192.5(c)(1) as a VERIFIED entry.** **The remaining question is narrow: do you want the WS-3 entry to carry an express cross-reference to the verified 192.5(c)(1) entry**, so a reader cannot mistake the attorney-client limit for a work-product one — **or does the SCOPE paragraph as rewritten suffice?** *(No new entry is proposed. The original open item would have spent a ruling on a settled question.)* | **OPEN — narrowed** |
| `Q-WS3-2` | The ruled shorthand is *"192.3(a)'s non-privileged limit governs (h)."* Both cases reach the result **through comment 9**, and no located case uses the 192.3(a) formulation. **Adopt the entry's comment-9 derivation as drafted, or direct the 192.3(a) phrasing to stand?** (ROUTE-C: the wording is put to you; adoption is not verification.) | **OPEN** |
| `Q-WS3-3` | Three Protégé leads did not resolve to a usable cite: ***Scherer*** (not located at all), ***Franklin Ctr.*** and ***Kona Coast*** (real cases, **two clusters each, no reporter cite**, V-9 STOP applied). **Do you want to pull any of these yourself** — the court's own document or a paginated vendor copy stating authorship on its face — **or should they be dropped from the lead list as unusable?** *Kona Coast* (Austin, Jan. 2026) would be the most current authority of the three if it is on point. | **OPEN — your hand** |
| `Q-WS3-4` | *In re Young*, 410 S.W.3d 542, resolves to ***In re Commitment of Michael Elbert Young***, an SVP civil-commitment case that does not appear to be a discovery-privilege decision. **Confirm the locator matched the wrong case, or supply the case you meant.** | **OPEN** |
| `Q-WS3-5` | **AMENDED 2026-08-18.** Five confirmed leads (*City of Dickinson*, *CSX*, *Baytown Nissan*, *Pope*, *Jimenez*) were not read. **The original framed this as "has the Supreme Court touched the comment-9 limit" and answered it from a list that did not contain the Supreme Court case on point.** ***In re XL Specialty Ins. Co.*, 373 S.W.3d 46 (Tex. 2012)** construes TRE 503(a)(2) "representative of the client" in the insurer/insured setting — the element *Fontenot*'s holding rests on. **Do you want *XL Specialty* read before this entry is verified?** It is the highest-value unread item in the pass and it bears on the firm's own carrier communications. | **OPEN — amended, and now the strongest item here** |
| `Q-WS3-6` | **NEW 2026-08-18.** ***In re Arden*, 2004 WL 576064 (Tex. App.—El Paso 2004, orig. proceeding)** — located during the audit, **not read, not V-9-identified** — appears to hold an insured's recorded statement to his carrier's **adjuster** protected, applying *Fontenot*. If so it is a **third** court of appeals on this line and it bears directly on the adjuster-call posture. **Do you want it pulled and identified?** | **OPEN — your hand** |

**Nothing above is verified. `WS-3`'s entry is drafted and put to Michael; it enters UNVERIFIED
on his word, and verification attaches to whatever wording he adopts.**
