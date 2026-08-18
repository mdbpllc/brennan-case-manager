# WS-3 — the privilege limit on TRCP 192.3(h): the leads read, and the gap closed

**Canonical repo path:** `docs/specs/ws3-privilege-authority-read-2026-08-17.md`
**Status: PROPOSED / staging. The drafted entry enters UNVERIFIED. Retrieval is not
verification — ONLY MICHAEL VERIFIES. Nothing here is built.**
Successor staging memo to the witness-statement conversion memo's **§3 territory** (that memo's
canonical doc is not edited by this one). Drafted 2026-08-17 Central (design session, Opus 5,
Cowork) under CHAT-DISPATCH v4 **T-28**, executing `WS-3` as ruled 2026-08-17.

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

**PRACTICE CONSEQUENCE, and it cuts against the firm's exposure rather than for it:** on this
line, a statement taken from a **third-party witness or an adjuster** is *not* protected by the
attorney-client privilege at all — the declarant is not the client. **The quietest exposure the
T-22 memo identified (the adjuster call) is not cured by this authority; it is confirmed by it.**

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

**Why this is the load-bearing exhibit.** It is the **second** court of appeals to so hold, it
adopts the first by name, and it supplies the operational rule the firm actually needs: a
privileged document does **not** become partly producible because a passage inside it recounts a
witness conversation.

**Retrieval note, recorded because it would mislead an automated citator:** in FLP's rendering of
ExxonMobil, several `Id.` citations in the comment-9 and *Fontenot* discussion are hyperlinked to
**`/opinion/1572796/in-re-stevens/`** — *In re Stevens*, which is **not** the source of either.
This is FLP's citation-resolution mis-linking, not an error in the opinion. **The text was read;
the links were not followed as authority.** (This is the class of defect `FE-16` would have to
survive.)

---

## 4. THE LIMIT ON ALL OF IT — a 2021 rule change neither case addresses

Both opinions construe the **1999** discovery rules. *Fontenot* cites the disclosure regime as
**"Tex.R. Civ. P. 192.3(h), 194.2(i)"** — the old request-for-disclosure numbering. Under the
**2021 amendments** reflected in the operative July 2026 text:

- witness statements are now a **Rule 194.2(b)(9) INITIAL disclosure**, owed **without awaiting a
  request** (194.1(a)); and
- **Rule 194.5** provides, in its entirety: *"No objection or assertion of work product is
  permitted to a disclosure under this rule."*

**The two limbs therefore resolve differently, and this is the finding that matters most:**

- **ATTORNEY-CLIENT — the *Fontenot*/*ExxonMobil* line SURVIVES.** 194.5 bars an *objection* and
  an *assertion of work product*. **It does not name the attorney-client privilege.** Nothing in
  the amended text purports to abrogate it, and *Fontenot*'s own reasoning — that the Supreme
  Court would have said so expressly — reads naturally onto the amendment.
- **WORK PRODUCT — the *Jimenez*/*Team Transport* line is DISTURBED, and no located case says
  how.** Those cases resolved witness-statement disputes on a work-product assertion. Against a
  Rule 194 disclosure, 194.5 now appears to forbid exactly that assertion. **No authority located
  in this pass decides the effect of 194.5 on the pre-2021 work-product cases.**

**This is a NEW gap, narrower and sharper than WS-3's, and it is not closed by this pass.** It is
put to Michael at §6 rather than papered over, and it is the same gap T-29's entry E (194.5)
runs into from the rule side.

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

---

## 6. THE DRAFTED ENTRY — `WS-3`, put to Michael

Destination: `docs/specs/legal-rule-registry-discovery-enforcement-and-pleading.md`, in **subject
order** immediately after the existing `## TRCP 192.3(h) — witness statements discoverable`
entry, which it qualifies. **Takes the backlog to 47 on execution** (46 after T-29's six).

```markdown
## TRCP 192.3(h) — the privilege limit on witness-statement discovery

**Cite:** Tex. R. Civ. P. 192.3(h) & cmt. 9; *In re Fontenot*, 13 S.W.3d 111, 113–14 (Tex. App.—Fort Worth 2000, orig. proceeding); *In re ExxonMobil Corp.*, 97 S.W.3d 353, 359–60, 362 (Tex. App.—Houston [14th Dist.] 2003, orig. proceeding).
**Rule.** Rule 192.3(h)'s grant of discovery of "the statement of any person with knowledge of relevant facts — a 'witness statement' — regardless of when the statement was made" is **not unlimited by privilege.** Comment 9 to Rule 192 provides that eliminating the former witness-statement exemption "does not render all witness statements automatically discoverable but subjects them to the same rules concerning the scope of discovery **and privileges** applicable to other documents or tangible things." Two courts of appeals have so construed it: a witness statement contained within a confidential attorney-client communication is **privileged and protected from discovery**, and a trial court abuses its discretion by ordering production of the witness-statement portion of an otherwise privileged document. The protection depends on the communication satisfying TRE 503 — in *Fontenot* the declarant was the **client** and the recipient a **representative of the client**; where the person giving the statement is **not** a client, this line does not protect it.
**Status:** UNVERIFIED.
**Relied on for:** the client-recording and intake-recording posture generally; the transcription-pipeline boundary (`Q-COM-12`); and the PRIV limb of the DE-1 deficiency taxonomy, where an opponent's demand for a witness statement embedded in privileged material is resistible rather than automatic.
**Derivation note — read this before relying on the shorthand.** The ruled proposition is phrased as *"192.3(a)'s non-privileged limit governs (h)."* **Both opinions reach the result through comment 9, not through 192.3(a) by name.** Comment 9's own words import "the same rules concerning the scope of discovery and privileges," and 192.3(a) is where the "not privileged" limit sits — so the substance is supported, but **no located case says "192.3(a) governs 192.3(h)" in those terms.** Stated this way deliberately rather than smoothed.
**SCOPE FLAG — the work-product limb is NOT covered by this entry.** Both opinions construe the 1999 rules; *Fontenot* cites the old "194.2(i)" disclosure regime. Under the 2021 amendments a witness statement is a Rule 194.2(b)(9) **initial disclosure** and Rule 194.5 permits **"no objection or assertion of work product"** against it. This entry states the **attorney-client** limit only, which 194.5 does not name. **The effect of 194.5 on the pre-2021 work-product witness-statement cases (*In re Jimenez*, 4 S.W.3d 894; *In re Team Transport*, 996 S.W.2d 256) is UNDECIDED by any authority located, and this entry does not reach it.**
**Source:** primary opinions read in full via FLP/CourtListener 2026-08-17, majority authorship confirmed on the face of each document per the V-9-amended rule (*Fontenot* — Livingston, J.; *ExxonMobil* — Seymore, J.). Rule and comment text: clean-authority PDF, `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` (filename currency designation, caveat as at WP-1/2/3). Leads located via Michael's Lexis Protégé run — **LOCATOR ONLY, not authority, not cited.**
**Pinpoint caveat.** Page pinpoints are taken from star pagination in the FLP rendering. **Verify against the reporter before any quotation enters a filing** (house rule).
```

### Open items (full question text carried, QR-1)

| ID | Question | Status |
|---|---|---|
| `Q-WS3-1` | The drafted entry states the **attorney-client** limit only. **Do you want a second entry — or an expansion of this one — addressing the work-product limb**, i.e. whether TRCP 194.5's bar on "any objection or assertion of work product" against a Rule 194 disclosure displaces the pre-2021 work-product witness-statement cases (*Jimenez*, *Team Transport*)? **No located authority decides it**, so any entry would be a reasoned reading rather than a supported proposition — which is why it is not drafted here. | **OPEN** |
| `Q-WS3-2` | The ruled shorthand is *"192.3(a)'s non-privileged limit governs (h)."* Both cases reach the result **through comment 9**, and no located case uses the 192.3(a) formulation. **Adopt the entry's comment-9 derivation as drafted, or direct the 192.3(a) phrasing to stand?** (ROUTE-C: the wording is put to you; adoption is not verification.) | **OPEN** |
| `Q-WS3-3` | Three Protégé leads did not resolve to a usable cite: ***Scherer*** (not located at all), ***Franklin Ctr.*** and ***Kona Coast*** (real cases, **two clusters each, no reporter cite**, V-9 STOP applied). **Do you want to pull any of these yourself** — the court's own document or a paginated vendor copy stating authorship on its face — **or should they be dropped from the lead list as unusable?** *Kona Coast* (Austin, Jan. 2026) would be the most current authority of the three if it is on point. | **OPEN — your hand** |
| `Q-WS3-4` | *In re Young*, 410 S.W.3d 542, resolves to ***In re Commitment of Michael Elbert Young***, an SVP civil-commitment case that does not appear to be a discovery-privilege decision. **Confirm the locator matched the wrong case, or supply the case you meant.** | **OPEN** |
| `Q-WS3-5` | Five confirmed leads (*City of Dickinson*, *CSX*, *Baytown Nissan*, *Pope*, *Jimenez*) were **not read**, the entry not resting on them. **Do you want a second pass reading them** — chiefly to test whether the Texas Supreme Court has touched the comment-9 limit — **or does the intermediate-court authority suffice for an entry that only ever enters UNVERIFIED?** | **OPEN** |

**Nothing above is verified. `WS-3`'s entry is drafted and put to Michael; it enters UNVERIFIED
on his word, and verification attaches to whatever wording he adopts.**
