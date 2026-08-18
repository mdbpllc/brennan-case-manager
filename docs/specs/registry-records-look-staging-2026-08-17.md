# Registry records-look staging pass — CHAT-DISPATCH v3, T-20 and T-21

**Canonical repo path:** `docs/specs/registry-records-look-staging-2026-08-17.md`
**Status: PROPOSED — STAGING ONLY. THIS DOCUMENT VERIFIES NOTHING.** Every finding below is a
CANDIDATE. Retrieval is not verification (SOURCING, Q-STAT-1). Only Michael verifies, and no
Status line in any registry file is changed by this document.
**Authored:** 2026-08-17 Central (DT-1 — the container clock read 2026-08-18 at authoring; the
Central wall-clock date at session start was 2026-08-17, 19:03 CDT).
**Session:** design side, Cowork, Opus 5, CHAT-DISPATCH v3 tasks **T-20** and **T-21**, run against
repo HEAD `5447538`. Instructions **v21**, runner **v10**.
**Model routing (§7.2):** execution/research/data-prep — Opus's lane. This pass adjudicates
nothing and rules nothing.

---

## §0 — Method, and the limits that bind every finding below

1. **Sources are named per item** (TOOLING for case law; SOURCING/Q-STAT-1 for rules and statutes).
   Three source classes appear below and are labelled on every finding:
   - **[FLP]** — Free Law Project / CourtListener API, read this session. Throttled at 5 req/min.
   - **[KR]** — a PDF in `Documents\Knowledge Repo\Opinions\` on `mdb-pllc`, pulled by Michael's
     hand (WESTLAW-5), read through the device bridge. Extraction was `pdftotext -layout` into the
     device VM's own `/tmp`, **not** into any connected folder — nothing was left for Michael's hand.
   - **[PUB]** — a named public source, identified per item.
2. **Majority-opinion rule applied on every opinion retrieval** (CLAUDE.md, binding). Each finding
   states which sub-opinion was read and how the majority was identified **positively**.
3. **Every quotation below is from text this session actually read**, not from front matter,
   headnotes, or a search snippet alone. Where only a snippet was read, the finding says so.
4. **What this pass cannot do.** It cannot establish currency, cannot resolve a reporter-cite flag
   as a matter of law, and cannot decide any parenthetical. It reports what each source states.
5. **A note on FLP's `precedential_status` field, established below and applying throughout:**
   FLP marks Texas court-of-appeals records `"Published"` **including records the court itself
   designates MEMORANDUM OPINION, and including records that are procedural ORDERS rather than
   opinions.** FLP's field does not track the Texas designation and must never be read as if it did.
   Derivation is at §3.2.

---

## §1 — T-20: records looks from FLP and named public sources

### 1.1 — Entry 19a · *Ford Motor Co. v. Castillo*, 279 S.W.3d 656 (Tex. 2009) · **V5-ATTRIB**

**Entry proposition as it stands:** "It is an abuse of discretion to deny discovery going to the
heart of a party's claim." Status UNVERIFIED. Carries the same proposition text as 19b
(*Able Supply*), which Michael verified 2026-08-17.

**Retrieval hazard, CONFIRMED as the entry describes it. [FLP]** Cluster **895102** lists **three**
sub-opinions: `.../opinions/9513075/`, `.../opinions/9513076/`, and `.../opinions/895102/` — the
third being an `010combined` record **whose id is identical to the cluster id**. A retrieval on the
cluster id lands on the combined text. The entry's warning is accurate and should stand.

**Majority identified positively. [FLP]** Opinion **9513075** — `type: 020lead`, `author_str:
Johnson`, `per_curiam: false`. Opinion **9513076** — `type: 030concurrence`, `author_str:
Wainwright`. Cluster `judges` string: "Johnson, Wainwright, Medina"; filed 2009-04-03; Published;
citation_count 219 at read. **The sub-opinion read for the finding below is 9513075, the lead.**

**CANDIDATE FINDING — the proposition IS the majority's, and its attribution runs one way.**
Read in full at 9513075 chunk 2 of 6, in the passage bearing the `*663` star-pagination marker:

> "Parties are 'entitled to full, fair discovery' and to have their cases decided on the merits.
> *Able Supply Co. v. Moye*, 898 S.W.2d 766, 773 (Tex.1995) (orig.proceeding); *see State v.
> Lowry*, 802 S.W.2d 669, 671 (Tex.1991) ... **A trial court abuses its discretion when it denies
> discovery going to the heart of a party's case or when that denial severely compromises a party's
> ability to present a viable defense.** *Able*, 898 S.W.2d at 772."

Two things follow, both CANDIDATE:
- **The proposition is in the lead opinion, not the concurrence.** A literal search of 9513076
  (Wainwright, 11,288 chars) for "heart of" returns **0 matches**. The concurrence does not carry it.
- **V5-ATTRIB — candidate answer, and it is not a split.** *Castillo* states the proposition and
  **attributes it to *Able Supply*, 898 S.W.2d at 772.** Reading *Able Supply* itself [FLP, opinion
  2432526] shows the same lineage running back one step further: "This Court also noted in *Walker
  v. Packer* that a denial of discovery going to the heart of a party's case may render an
  appellate remedy inadequate. *Id.* The discovery denied by the trial court goes to the very heart
  of the defendants' case." **So the chain is *Walker v. Packer* → *Able Supply* → *Castillo*.**
  The joint entry's proposition did not come half from one case and half from the other; both
  entries state a proposition **whose source is *Able Supply*, restated and applied by *Castillo*.**
  That is a candidate answer to the attribution question **for this pair only** — the other five
  split entries are untouched by it.

**A REGISTER DIFFERENCE WORTH MICHAEL'S EYE, NOT SMOOTHED.** In *Able Supply* the "heart of a
party's case" language appears in the **mandamus register** — whether an appellate remedy is
*inadequate*. In *Castillo* it appears in the **abuse-of-discretion register** — the words are "a
trial court abuses its discretion when...". The registry entry is written in *Castillo*'s register.
Whether that makes *Castillo* the better primary cite for the entry as worded, with *Able Supply*
as the source authority, is a legal judgment and is Michael's.

**ROUTE-C CANDIDATE — DRAFTED, AND COUPLED. See §5.1.** The entry says "heart of a party's
**claim**"; the opinion says "heart of a party's **case**", and the opinion's sentence carries a
**second, disjunctive limb the entry omits**. Proposed conforming wording is at §5.1, together with
the reason it cannot be adopted for 19a alone.

**Source:** FLP/CourtListener API, read 2026-08-17 — cluster 895102; opinions 9513075 (`020lead`,
Johnson, J.) and 9513076 (`030concurrence`, Wainwright, J.); opinion 2432526 (*Able Supply*).

---

### 1.2 — Entry 15 · *In re Volt Power, LLC*, 2023 WL 2804430 (Tex. App.—Tyler 2023, orig. proceeding)

**Entry proposition:** "A party challenging discovery responses must explain each asserted
deficiency." Status UNVERIFIED, **REPORTER-CITE CHECK FLAGGED**.

**CANDIDATE FINDING 1 — the substantive-opinion identification is CONFIRMED, and the companion
record exists exactly as the dispatch describes. [FLP]** Docket **12-23-00047-CV** (Twelfth Court
of Appeals, Tyler) carries **two** FLP records:

| FLP cluster | FLP opinion | date_filed | status | citations |
|---|---|---|---|---|
| 9390268 | 9385744 (`010combined`) | **2023-04-05** | "Published" | **[] — empty** |
| 9393442 | 9388918 | 2023-04-20 | "Published" | **[] — empty** |

The **April 5** record is the one the entry means. The April 20 record is the second document on the
same docket. **Neither was characterized — no opinion text was read for this entry**, because the
task was a records look; the April 20 record's content is stated in the citator pass, not here.

**CANDIDATE FINDING 2 — the reporter-cite flag is NOT resolved, and FLP is affirmative evidence of
that. [FLP]** Cluster 9390268's `citations` array is **empty** and `citation_count` is **0**. FLP
holds **no** parallel reporter citation for this opinion. The flag survives this look. `author_str`
is empty and `judges` is empty, so **no authoring justice is recoverable from FLP** and the
majority-opinion rule cannot be run from this source at all — the record is a single `010combined`
harvest with no panel information.

**CANDIDATE FINDING 3 — FLP's `"Published"` is not evidence about the Texas designation.** See
§3.2. This record's `status` field says nothing about whether the court designated the opinion a
memorandum opinion.

**SUBSEQUENT-HISTORY PARENTHETICAL — CANDIDATES ONLY, for Michael's pick.** Nothing below is
recommended; they are laid out so the choice is one word.
- **(a) Leave as written:** `2023 WL 2804430 (Tex. App.—Tyler 2023, orig. proceeding)`.
- **(b) Add the date:** `2023 WL 2804430 (Tex. App.—Tyler Apr. 5, 2023, orig. proceeding)` — the
  date is confirmed above and **distinguishes this record from the April 20 companion on the same
  docket**, which is the practical reason to add it.
- **(c) Add date and cause number:** `No. 12-23-00047-CV, 2023 WL 2804430, at *__ (Tex. App.—Tyler
  Apr. 5, 2023, orig. proceeding)` — the cause number is confirmed above; **the pinpoint is not**,
  and would have to come from a Westlaw or Lexis copy.
- **(d) Add a designation notation (`mem. op.`)** — **NOT AVAILABLE.** No source read this session
  states the court's designation for this opinion.
**This entry was not among the WESTLAW-5 pulls**, so no [KR] copy exists to resolve (c) or (d).

**Source:** FLP/CourtListener API, read 2026-08-17 — clusters 9390268 and 9393442; opinion 9385744;
docket search on 12-23-00047-CV.

---

### 1.3 — Entry 21a · *In re Redman*, 2023 WL 6760074 (Tex. App.—Tyler 2023, orig. proceeding)

**Entry proposition:** "Merely listing a privilege proves nothing; the burden rests on the party
asserting it." Status UNVERIFIED, **REPORTER-CITE CHECK FLAGGED**, with the citator pass's note
that it is a memorandum opinion on which the WL cite is permanent.

**CANDIDATE FINDING 1 — the October 11 / October 18 pair is CONFIRMED, same shape as Volt Power.
[FLP]** Docket **12-23-00212-CV** (Tyler) carries **two** FLP records:

| FLP cluster | FLP opinion | date_filed | status | citations |
|---|---|---|---|---|
| 9432901 | 9890720 (`010combined`) | **2023-10-11** | "Published" | **[] — empty** |
| 9434411 | 9892230 | 2023-10-18 | "Published" | **[] — empty** |

The **October 11** record is the one the entry means, as the entry already states. Confirmed, not
re-researched.

**CANDIDATE FINDING 2 — the reporter-cite flag is NOT resolved. [FLP]** Cluster 9432901's
`citations` array is **empty**, `citation_count` **0**, `author_str` empty, `judges` empty.
Identical posture to Volt Power. FLP holds no parallel cite and no panel.

**CANDIDATE FINDING 3 — the memorandum-opinion premise behind the entry's note is NOT confirmed by
this look.** The citator pass records this as a memorandum opinion and reasons from that to a
permanent WL cite. **Nothing read this session establishes the designation** — FLP's `"Published"`
is not evidence of it (§3.2), and no [KR] copy exists. The entry's note should be read as carrying
an unconfirmed premise until Michael resolves it. **The note was not altered.**

**SUBSEQUENT-HISTORY PARENTHETICAL — CANDIDATES ONLY.**
- **(a) Leave as written.**
- **(b) Add the date:** `2023 WL 6760074 (Tex. App.—Tyler Oct. 11, 2023, orig. proceeding)` —
  confirmed, and it distinguishes the October 18 companion on the same docket.
- **(c) Add date and cause number:** `No. 12-23-00212-CV, 2023 WL 6760074, at *__ (Tex. App.—Tyler
  Oct. 11, 2023, orig. proceeding)` — cause number confirmed; **pinpoint not available**.
- **(d) `(mem. op.)`** — **NOT AVAILABLE** from any source read this session.

**A ONE-CLICK ALTERNATIVE THE ENTRY ALREADY NAMES, restated because it is cheap.** The entry points
to a **reported companion for the same proposition already in the same file**: *In re Park Cities
Bank*, 409 S.W.3d 859, **at 868** — a pinpoint BUILD-STATE records as "868 confirmed and standing"
after E-3. If Michael prefers a reported cite to a WL cite for this proposition, the substitution
needs no retrieval at all. **Not proposed — noted.**

**Source:** FLP/CourtListener API, read 2026-08-17 — clusters 9432901 and 9434411; opinion 9890720;
case-name search restricted to Texas courts of appeals, filed after 2023-01-01.

---

### 1.4 — Entry 20a · *In re Alford Chevrolet-Geo*, 997 S.W.2d 173 (Tex. 1999) · duplicate-record look

**Entry proposition:** "A party resisting discovery must produce evidence supporting its objections,
not conclusory allegations." Status UNVERIFIED. Entry carries a **DUPLICATE-RECORD FLAG** and the
citator pass's expressly-unasserted inference that the June 10 record "is most likely the original
opinion superseded on rehearing."

**THE DECISIVE EVIDENCE — the opinion's own caption block, read this session. [FLP]** Opinion
**2419858** (90,447 chars) opens with:

> "997 S.W.2d 173 (1999) — In re ALFORD CHEVROLET-GEO, et al., Relators — No. 97-1171. — Supreme
> Court of Texas. — **Argued September 8, 1998.** — **Decided June 10, 1999.** — **Rehearing
> Overruled August 26, 1999.** — *175 ..."

**CANDIDATE CHARACTERIZATION — the two records are ONE decision, and nothing was superseded.**
- The reported opinion at 997 S.W.2d 173 was **decided June 10, 1999**, and **rehearing was
  OVERRULED — not granted — on August 26, 1999.** There is no withdrawal-and-substitution: the
  single reported opinion carries both dates in its own caption.
- The two FLP clusters differ **because their `date_filed` fields carry different dates from the
  same caption**: cluster **5269700** ("In re Chevroletgeo") carries the **decision** date
  (1999-06-10) and independently states `other_dates: "Argued Sept. 8, 1998., Rehearing Overruled
  Aug. 26, 1999."`; cluster **2419858** carries the **rehearing-overruled** date (1999-08-26).
- **The citator pass's supersession inference is NOT supported by the operative text.** It was
  expressly flagged there as inference and not asserted — this look is the one that was owed, and
  it comes out the other way. **Retiring that sentence is Michael's act, not this document's.**

**WHICH RECORD IS OPERATIVE — CANDIDATE.** **2419858.** It alone carries the reporter citation with
star pagination (`*175` and onward), it alone carries the WL cite (**1999 WL 374136**), its
`citation_count` is **207** against 5269700's **3**, and its `010combined` text contains both
opinions in the case. 5269700 is a second harvest of the same decision, split into two sub-opinions.

**MAJORITY IDENTIFIED POSITIVELY — and this is where the finding turns interesting.**
- Cluster 5269700's sub-opinions are **5097124** — `type: 020lead`, `author_str: Hankinson` — and
  **5097125** — `type: 035concurrenceinpart`, `author_str: Hecht`.
- The entry's proposition was located **inside 5097124, the lead**, at position 26847 of 53,655:
  > "A party resisting discovery, however, **cannot simply make conclusory allegations** that the
  > requested discovery is unduly burdensome or unnecessarily harassing. **The party must produce
  > some evidence supporting its request for a protective order.** *See Garcia v. Peeples*, 734
  > S.W.2d 343, 345 (Tex.1987)"
  The same sentence appears in 2419858's combined text at position 27206, and Hecht's separate
  discussion of the same line of authority appears far later in that combined text (position 66792),
  confirming the combined record contains both.
- **THE POINT WORTH CARRYING FORWARD: the *operative* record could not have answered the majority
  question by itself.** 2419858 is `010combined` — lead and concurrence-in-part fused into one
  document with no type or author distinction. **The DUPLICATE cluster is what made the
  majority-opinion rule runnable here.** The duplicate is a hazard for citation and an asset for
  attribution. That inverts the framing the §0.1 hazard note is being drafted around, and is
  carried into the **T-25** candidate text.

**PINPOINT CANDIDATE — 997 S.W.2d at 181.** Not derived from FLP's star pagination, which was not
walked; derived from a second court's citation of it. See §2.3 (*Collins*), which cites "*In re
Alford Chevrolet—Geo*, 997 S.W.2d 173, **181** (Tex. 1999) (orig. proceeding)" and then quotes the
sentence above. **Candidate, from a citing source rather than from the page itself.**

**Source:** FLP/CourtListener API, read 2026-08-17 — clusters 2419858 and 5269700; opinions 2419858
(`010combined`), 5097124 (`020lead`, Hankinson, J.), 5097125 (`035concurrenceinpart`, Hecht, J.);
pinpoint from the *Collins* [KR] copy at §2.3.

---

### 1.5 — Entry 16 · *De Anda v. Jason C. Webster, P.C.* · "pet. denied" confirmation

**Entry cite:** 2018 WL 3580579 (Tex. App.—Houston [14th Dist.] 2018, **pet. denied**).
**Entry proposition:** "A repeated global objection string is waived." Status UNVERIFIED,
**REPORTER-CITE CHECK FLAGGED** — the sixth carrier of that defect, added by Code 2026-08-12.

**T-20 half — the public-source attempt, reported as it came out.**
- **[PUB — Justia]** `law.justia.com/cases/texas/fourteenth-court-of-appeals/2018/14-17-00020-cv.html`
  confirms: cause **14-17-00020-CV**; **July 26, 2018**; designated **"Memorandum Opinion"**; panel
  Busby, Donovan, Jewell; authored by Justice J. Brett Busby; disposition "Reversed and Remanded and
  Memorandum Opinion filed July 26, 2018". **Justia states NO subsequent history** — no petition for
  review appears on the page at all.
- **[PUB — TAMES]** `search.txcourts.gov/Case.aspx?cn=14-17-00020-CV&coa=coa14` **could not be
  retrieved: the fetch was refused by the site's robots.txt.** No alternative retrieval route was
  attempted, and none will be — the web-content restriction is absolute.
- **Conclusion on the T-20 half: "pet. denied" is NOT confirmable from the public sources reached
  this session.** That is a report about the sources, not about the case.

**The fallback landed. See §2.5 — the [KR] copy resolves it outright.**

---

### 1.6 — Entry 17 · *In re Sting Soccer Group, LP* · designation attempt

**Entry cite:** 2017 WL 5897454 (Tex. App.—Dallas 2017, orig. proceeding).
**Entry proposition:** "Contention discovery is permissible; where no evidence supports the
objections, it is an abuse of discretion to sustain them." Status UNVERIFIED, **REPORTER-CITE
CHECK FLAGGED**. The dispatch specified: no predicted outcome — report what the source says.

**CANDIDATE FINDING 1 — FLP holds the WRONG DOCUMENT for this docket, and this is a new hazard
class. [FLP]** A docket search on **05-17-00317-CV** returns **exactly one** FLP record:
cluster **4417125**, opinion **4194378**, `dateFiled` **2017-08-08**, `status "Published"`,
`citation: []`. **August 8, 2017 is not the merits opinion** — it is a procedural order. FLP holds
**no** record of the November 30, 2017 memorandum opinion the entry cites. A researcher retrieving
this docket from FLP and reading what comes back would be reading an order about briefing deadlines.

**CANDIDATE FINDING 2 — corroboration of the two-document shape from a second public source.
[PUB — Leagle]** Leagle carries two documents under No. 05-17-00317-CV: one dated **August 8, 2017**
(Stoddart, J.; requests responses to the mandamus petition by August 25) and one dated **November
30, 2017** (Lang, J.; conditionally granting in part). **Leagle renders both as "ORDER" and shows no
designation line for either** — a rendering artifact of that source, not the court's word, which is
why the designation question was taken to the court's own document at §2.4.

**The designation is ANSWERED from the court's own PDF — see §2.4.**

**Source:** FLP/CourtListener API docket search on 05-17-00317-CV, read 2026-08-17; Leagle decisions
`intxco20170809561` and `intxco20171201588`.

---

## §2 — T-21 [BRIDGE]: the Westlaw-gated looks

**GATE: FIRED.** `Documents\Knowledge Repo\Opinions\` exists on `mdb-pllc` and holds the WESTLAW-5
pulls. Sixteen PDFs are present; the five named pulls plus *De Anda* are among them. Nine further
opinions are present that the dispatch did not name — **out of scope, locator only at §6.**

**Extraction method:** each PDF copied into the device VM's `/tmp/tlook/` and converted with
`pdftotext -layout`. **No file was written into any connected folder** — nothing was left behind for
Michael's hand, and the older unzip-into-the-folder workaround was not used. All six copies read
below are **Lexis-format printouts** carrying `Reporter`, `Subsequent History`, `Prior History`,
`Judges`, `Opinion by`, and star pagination.

---

### 2.1 — Entry 18 · *In re Ochoa*, 2004 WL 1192444 — the possible cite UPGRADE

**Header, verbatim from the [KR] copy:**
> "In re Ochoa — Court of Appeals of Texas, Twelfth District, Tyler — **May 28, 2004, Opinion
> Delivered** — NO. **12-04-00163-CV**
> Reporter: **2004 Tex. App. LEXIS 4866 \*; 2004 WL 1192444**
> **Notice: [\*1] PUBLISH.**
> **Subsequent History: Relator Petition for Rehearing Denied June 22, 2004. Released for
> Publication July 30, 2004.**
> Disposition: Motion for emergency relief overruled, and petition for writ of mandamus denied.
> Judges: Panel consisted of Worthen, C.J., Griffith, J. and DeVasto, J.
> Opinion by: DIANE DEVASTO"

**CANDIDATE FINDING 1 — the WL cite in the registry entry is CONFIRMED.** `2004 WL 1192444` appears
in the copy's own Reporter line.

**CANDIDATE FINDING 2 — THE UPGRADE DOES NOT LAND, and the reason is worth recording.** The copy
carries **Lexis and Westlaw cites only. No S.W.3d parallel citation appears anywhere in it.** So the
one look the dispatch hoped might produce a reporter cite **did not produce one.** But the copy
simultaneously states **"Notice: PUBLISH"** and **"Released for Publication July 30, 2004"** — which
is affirmative evidence that a reporter cite plausibly exists somewhere this session did not reach.
**Both halves are reported; neither is resolved.** If Michael wants the upgrade, the remaining route
is a KeyCite/Shepard's parallel-cite pull, which is his act.

**CANDIDATE FINDING 3 — an internal tension in the copy, flagged and not reconciled.** The header
says PUBLISH and released-for-publication; **the body of the opinion carries the heading
"MEMORANDUM OPINION"** (line 28 of the extraction). Whether a memorandum opinion released for
publication takes a reporter cite is a Texas appellate-practice question and is **squarely
Michael's**. It bears directly on the same question standing open at entries 21a and 17.

**MAJORITY-OPINION RULE:** the copy states a three-justice panel (Worthen, C.J.; Griffith, J.;
DeVasto, J.) and **one opinion, by DeVasto, J.** No concurrence or dissent appears in the copy.
**The document read was that single opinion**, in full — it runs "Page 3 of 3."

**CANDIDATE FINDING 4 — the entry's proposition is the opinion's own reasoning, and the posture is
worth knowing.** Read in full:
> "a party's legal contentions and the factual bases for those contentions are discoverable. TEX. R.
> CIV. P. 192.3(j). Even if made or prepared in anticipation of litigation or for trial, information
> discoverable under Rule 192.3 concerning a party's contentions is not [work product]..."
> "...21 and 22 are contention interrogatories permitted by the rules. See TEX. R. CIV. P. 192.3(j);
> TEX. R. CIV. P. 192.5(c)(1); TEX. R. CIV. P. 194.2(c)"
> **CONCLUSION:** "The Texas Rules of Civil Procedure permit the use of contention interrogatories.
> Therefore, Ochoa and Hoya have not shown that the trial court abused its discretion [\*6] in
> granting the motion to compel responses to interrogatories 21 and 22. Accordingly, the motion for
> emergency relief is overruled, and the petition for writ of mandamus is denied."

**The relators — the party resisting — lost, and mandamus was denied.** The registry entry relies on
*Ochoa* "for rebutting work-product objections to contention discovery," which is the posture the
opinion is in. **Pinpoint candidate: \*2**, from the citation at §2.4 rather than from this copy's
own star pagination, which was not walked.

**Source:** `Documents\Knowledge Repo\Opinions\In re Ochoa_2004 Tex. App. LEXIS 4866.Pdf`, Lexis
printout, read via device bridge 2026-08-17.

---

### 2.2 — Entry 24 · *Allstate Ins. Co. v. Irwin*, 627 S.W.3d 263 (Tex. 2021) — **V-9**

**This is the V-9 class.** BUILD-STATE records entry 24 as "the one entry in the class where
CLAUDE.md's BINDING majority-opinion rule cannot run" — because FLP holds two clusters and no cite.
**The paginated copy states the answer on its face.** What follows is what the copy shows. **Any
KeyCite reading is Michael's and is not attempted here.**

**Header, verbatim:**
> "Allstate Ins. Co. v. Irwin — Supreme Court of Texas — **January 7, 2021, Argued; May 21, 2021,
> Opinion Delivered** — No. **19-0885**
> Reporter: **627 S.W.3d 263 \*; 2021 Tex. LEXIS 415 \*\*; 2021 WL 2021446**
> **Subsequent History: Rehearing denied by Allstate Ins. Co. v. Irwin, 2021 Tex. LEXIS 809 (Tex.,
> Sept. 3, 2021)**
> Prior History: ON PETITION FOR REVIEW FROM THE COURT OF APPEALS FOR THE FOURTH DISTRICT OF TEXAS.
> Allstate Ins. Co. v. Irwin, 606 S.W.3d 774, 2019 Tex. App. LEXIS 7368, 2019 WL 3937281 (Tex. App.
> San Antonio, Aug. 21, 2019)"

**CANDIDATE FINDING — THE MAJORITY IS IDENTIFIED POSITIVELY, FROM THE COPY'S OWN WORDS. It is 5–4.**
> "**Judges: JUSTICE DEVINE delivered the opinion of the Court, in which JUSTICE LEHRMANN, JUSTICE
> BOYD, JUSTICE BLACKLOCK, and JUSTICE BUSBY joined. CHIEF JUSTICE HECHT filed a dissenting opinion,
> in which JUSTICE GUZMAN, JUSTICE BLAND, and JUSTICE HUDDLE joined.**"

- **Majority: Devine, J.**, joined by Lehrmann, Boyd, Blacklock and Busby, JJ. — five.
- **Dissent: Hecht, C.J.**, joined by Guzman, Bland and Huddle, JJ. — four.
- **What this means for V-9, stated carefully:** the majority-opinion rule could not be run *from
  FLP* for this entry. It **can** be run from the copy Michael pulled, and the copy answers it. Any
  proposition the entry rests on must be located in the Devine opinion, not the Hecht dissent —
  **and that location has not been done here**, because entry 24's proposition text was not in this
  task's scope. **The next act on entry 24 is locating its proposition inside the Devine opinion.**
- **A live caution the copy itself supplies:** the extraction shows the dissent discussing *Brainard*
  and stating "I joined the Court's unanimous opinion in *Brainard*, but I now think that the
  attorney-fee issue was incorrectly decided." **First-person reasoning of that kind sitting in the
  same PDF as the majority is exactly how a dissent gets quoted as a holding.** Anyone working this
  entry should confirm which opinion a quotation sits in before relying on it.
- **A rehearing was denied Sept. 3, 2021** — noted for currency, and it is not a currency finding.

**Source:** `Documents\Knowledge Repo\Opinions\Allstate Ins. Co. v. Irwin_627 S.W.3d 263.Pdf`,
Lexis printout, read via device bridge 2026-08-17.

---

### 2.3 — Entry 20b · *Collins v. Kappa Sigma Fraternity* — **LOCATED**

BUILD-STATE records this entry as **"NOT LOCATED — retrieval is the whole task on this entry"**:
absent from FLP and from the public web at #65 and again at the 2026-08-13 citator pass, with no
citing graph and no treatment posture. **The pull located it.**

**Header, verbatim:**
> "Collins v. Kappa Sigma Fraternity — Court of Appeals of Texas, Second District, Fort Worth —
> **January 19, 2017, Delivered; January 19, 2017, Opinion Filed** — NO. **02-14-00294-CV**
> Reporter: **2017 Tex. App. LEXIS 474 \*; 2017 WL 218286**
> **Subsequent History: Petition for review denied by Kappa Sigma Fraternity v. Collins, 2018 Tex.
> LEXIS 76 (Tex., Jan. 26, 2018)**
> Prior History: FROM THE 96TH DISTRICT COURT OF TARRANT COUNTY. TRIAL COURT NO. 096-203806-04.
> **Collins v. Kappa Sigma Fraternity, 2010 Tex. App. LEXIS 3030 (Tex. App. Fort Worth, Apr. 22,
> 2010)**
> Judges: PANEL: MEIER and SUDDERTH, JJ.; and CHARLES BLEIL (Senior Justice, Retired, Sitting by
> Assignment)."
The body carries the heading **"MEMORANDUM OPINION"** with a footnote marker.

**CANDIDATE FINDINGS.**
1. **The WL cite in the registry entry is CONFIRMED** — `2017 WL 218286` appears in the copy's own
   Reporter line, beside `2017 Tex. App. LEXIS 474`.
2. **The 2010 sibling warning is CONFIRMED AND RESOLVED.** The dispatch warned against No.
   02-09-00305-CV. The copy's **Prior History** names the sibling appeal expressly — *Collins v.
   Kappa Sigma Fraternity*, 2010 Tex. App. LEXIS 3030 (Fort Worth, Apr. 22, 2010) — and the body
   cites it as "No. **02-09-00305-CV**, 2010 Tex. App. LEXIS 3030, 2010 WL 1633416, at \*1 (Tex.
   App.—Fort Worth Apr. 22, 2010, pet. ...)". **The two are the same litigation and different
   appeals**, and the correct one is cause **02-14-00294-CV**, decided January 19, 2017. The warning
   should stay in the entry: this session confirmed it is a live confusion, not a hypothetical.
3. **A subsequent-history parenthetical is now available.** Candidate:
   `Collins v. Kappa Sigma Fraternity, No. 02-14-00294-CV, 2017 WL 218286 (Tex. App.—Fort Worth
   Jan. 19, 2017, pet. denied) (mem. op.)`. The entry as it stands carries no date, no cause number
   and no disposition parenthetical. **Every element above is from the copy. Whether to adopt any of
   it is Michael's, and each element is separable.**
4. **No reporter cite appears in the copy** — Lexis and Westlaw only. The reporter-cite flag
   **survives**, exactly as at *Ochoa*.
5. **The proposition is in the opinion, and it is there BY QUOTATION OF *ALFORD*.** Read in full:
   > "as a general rule, a party objecting to discovery must present some evidence necessary to
   > support its objections. See Tex. R. Civ. P. **193.4(a), 199.6**. See, e.g., **In re Alford
   > Chevrolet—Geo, 997 S.W.2d 173, 181 (Tex. 1999) (orig. proceeding)** ('A party resisting
   > discovery . . . cannot simply make conclusory allegations that the requested discovery is
   > unduly burdensome or ...')"
   **This is the V5-ATTRIB candidate answer for the 20a/20b pair, and it runs the same direction as
   the 19a/19b pair at §1.1: the proposition is *Alford*'s, and *Collins* applies it by quoting it.**
   It also supplies 20a's pinpoint (**181**) and two rule cites — **TRCP 193.4(a) and 199.6** —
   which are the rule-side authority for the evidence-burden argument and **are not in the registry
   as entries.** Whether they should be is Michael's; see §5.4.

**MAJORITY-OPINION RULE:** the copy states a three-member panel (Meier and Sudderth, JJ., and Bleil,
Senior Justice, sitting by assignment) and shows **one opinion**; no concurrence or dissent appears.
The document read was that opinion. **The copy does not name the authoring justice in the header
block that was read** — recorded as a gap rather than guessed.

**Source:** `Documents\Knowledge Repo\Opinions\Collins v. Kappa Sigma Fraternity_2017 Tex. App.
LEXIS 474.Pdf`, Lexis printout, read via device bridge 2026-08-17.

---

### 2.4 — Entry 17 · *In re Sting Soccer* — designation ANSWERED from the court's own document

The [KR] file `2017-05-17-00317-cv.pdf` is the **court's own PDF**, not a vendor print. Its first
lines:
> "Conditionally granted in part, Denied in part, and **Opinion Filed November 30, 2017**
> In The Court of Appeals — Fifth District of Texas at Dallas — No. 05-17-00317-CV
> IN RE STING SOCCER GROUP, LP, AND BRENT LEE CORALLI, Relators
> Original Proceeding from the **429th Judicial District Court, Collin County, Texas** — Trial Court
> Cause No. 429-01689-2016
> **MEMORANDUM OPINION**
> Before Justices Lang, Evans, and Stoddart
> **Opinion by Justice Lang**"

**CANDIDATE FINDING — THE DESIGNATION IS THE COURT'S OWN WORD: MEMORANDUM OPINION.** Not inferred,
not taken from a vendor. The flag asked what the designation is; this is it. **What follows from a
memorandum designation — in particular whether the WL cite is therefore permanent, the reading the
citator pass applies at 21a — is a Texas appellate-practice question and is Michael's.** This
document supplies the fact, not the consequence.

**MAJORITY-OPINION RULE:** panel Lang, Evans and Stoddart, JJ.; **opinion by Lang, J.**; no
concurrence or dissent in the document. The document read was that opinion, in full (34,321
characters extracted).

**CANDIDATE FINDING — the entry's proposition is corroborated by the opinion's own text, both
limbs.** Read in full:
> "Because **work product is not a proper objection to contention interrogatories**, the trial court
> had no discretion and could only overrule Vola's work product objections."
> "Finally, Vola's objections that the requests for production are overbroad, burdensome, and an
> improper fishing expedition should not have been sustained by the trial court because **Vola
> presented no evidence to support those objections.** ... Because the trial court below was neither
> presented with arguments nor actual evidence to support these objections before ruling to limit
> discovery, **the trial court abused its discretion in sustaining these objections.**"

**AND IT CITES *OCHOA* — a cross-link between entries 17 and 18 that neither entry records.**
> "See TEX. R. CIV. P. 192.5(c)(1) ('Even if made or prepared in anticipat[ion] of litigation or for
> trial the following is not work product protected from discovery: (1) information discoverable
> under Rule 192.3 concerning experts, trial witnesses, witness statements, and contentions. . . .')
> (emphasis added); see also **In re Ochoa, No. 12-04-00163-CV, 2004 WL 1192444, at \*2 (Tex.
> App.—Tyler May 28, 2004, orig. proceeding)** (citing TEX. R. CIV. P. 192.5(c)(1))."
This supplies entry 18's **cause number, exact date and \*2 pinpoint in a citable form**, and it is
a **2017 Dallas court relying on the 2004 Tyler opinion for exactly the proposition entry 18
carries** — the closest thing to a treatment signal either entry has. **Cross-referencing 17 and 18
is a registry edit and is not proposed here** — it is put at §5.5.

**A SOURCE ANOMALY, RECORDED AND NOT CORRECTED.** The extracted text renders one of the opinion's
own citations as "*Masinga v. Whittington*, 792 S.W.2d 940, 941 (**Tex. 1999**) (orig.
proceeding)". 792 S.W.2d is a 1990 volume. **Whether the year is the court's error or an extraction
artifact was not determined, and nothing was substituted** — SOURCING requires characterizing rather
than guessing. Flagged because the sentence it supports is one of the two the entry rests on.

**Source:** `Documents\Knowledge Repo\Opinions\2017-05-17-00317-cv.pdf` — the Fifth Court of
Appeals' own PDF — read via device bridge 2026-08-17. Corroborated at §1.6 by FLP and Leagle.

---

### 2.5 — Entry 16 · *De Anda v. Webster* — "pet. denied" **CONFIRMED**, and the thicket-waiver case

**Header, verbatim:**
> "De Anda v. Webster — Court of Appeals of Texas, Fourteenth District, Houston — **July 26, 2018,
> Memorandum Opinion Filed** — NO. **14-17-00020-CV**
> Reporter: **2018 Tex. App. LEXIS 5727 \*; 2018 WL 3580579**
> **Subsequent History: Petition for review denied by Webster v. De Anda, 2018 Tex. LEXIS 1062
> (Tex., Oct. 19, 2018)**
> Prior History: On Appeal from the 127th District Court, Harris County, Texas. Trial Court Cause No.
> 2016-69776. ... **In re De Anda, 2017 Tex. App. LEXIS 320, 2017 WL 219112 (Tex. App. Corpus
> Christi, Jan. 13, 2017)**
> Judges: Panel consists of Justices Busby, Donovan, and Jewell.
> Opinion by: **J. Brett Busby**"

**CANDIDATE FINDINGS.**
1. **"pet. denied" is CONFIRMED, with a date and the Supreme Court's own cite** — petition for
   review denied **October 19, 2018**, *Webster v. De Anda*, 2018 Tex. LEXIS 1062. The parenthetical
   the registry entry already carries is supported. **This is what the T-20 public sources could not
   reach; the fallback the dispatch named is what supplied it.**
2. **The WL cite is CONFIRMED** — `2018 WL 3580579` in the copy's Reporter line. **No reporter cite
   appears** — the flag survives, the third time in this pass.
3. **Designation: "Memorandum Opinion Filed"** in the court's own date line, corroborating Justia.
4. **A NEAR-MISS WORTH THE ENTRY'S SPACE, of the same class as the *Collins* 2010 sibling.** Prior
   History names **In re De Anda, 2017 WL 219112 (Tex. App.—Corpus Christi, Jan. 13, 2017)** — a
   different court, a different proceeding, ten days apart in citation space from cases in this
   file. Anyone searching "De Anda" plus discovery can land on it.
5. **THE PROPOSITION IS THE OPINION'S HOLDING, AND IT RUNS ON TRCP 193.2(e) — WHICH IS ENTRY 5.**
   Read in full:
   > "Webster lodged the **same global, prophylactic string of objections** quoted above to every
   > interrogatory and request for production."
   > "In sum, many of Webster's objections were unfounded. We therefore conclude that **Webster
   > waived his objections** to De Anda's discovery requests. See Tex. R. Civ. P. **193.2(e)** ('An
   > objection . . . that is **obscured by numerous unfounded objections, is waived** unless the
   > court excuses the waiver for good cause shown.'). The trial court therefore abused its
   > discretion..."
   **This is the thicket-waiver argument the DE-1 template owes** under entry 5's ruled note — the
   thicket itself waives the objections buried in it. *De Anda* is the case that runs it, on
   193.2(e), against a global prophylactic objection string. **Carried into T-24 as the template's
   authority for that argument.** The opinion also notes that **TRCP 194.5 permits no objection or
   work-product assertion to a disclosure request** — a separate point, recorded, not proposed.

**MAJORITY-OPINION RULE:** panel Busby, Donovan and Jewell, JJ.; **opinion by Busby, J.**; no
concurrence or dissent in the copy. That opinion was the document read.

**Source:** `Documents\Knowledge Repo\Opinions\De Anda v. Webster_2018 Tex. App. LEXIS 5727.Pdf`,
Lexis printout, read via device bridge 2026-08-17.

---

### 2.6 — Entry 31 · *LaPorte v. State*, 840 S.W.2d 412 — the "single criminal action" definition

Entry 31 (criminal file, `4a`) carries **NO CITE** — "separate criminal actions: costs per cause,
non-concurrent." Supplying a cite is expressly **Michael's act**. This section stages a **candidate
set**, nothing more.

**Header, verbatim:**
> "LaPorte v. State — **Court of Criminal Appeals of Texas** — **June 10, 1992, Delivered** — NO.
> 1206-90
> Reporter: **840 S.W.2d 412 \*; 1992 Tex. Crim. App. LEXIS 139 \*\***
> Prior History: Petition for Discretionary Review from the Fourteenth Court of Appeals. Harris
> County
> **Judges: En Banc. McCormick — Opinion by: MCCORMICK**"

**THE DEFINITION, verbatim:**
> "In implementing these changes the Legislature used the phrase '**a single criminal action**,' but
> did not otherwise define this phrase. See Sections 3.02 and 3.03. ... **From all of this, it is
> clear the Legislature intended 'a single criminal action' to refer to a single trial or plea
> proceeding.** This notice provision of Section 3.02(b) does not change the nature of the
> proceeding as a single criminal action..."

The opinion also **overrules *Caughorn***: "we now believe this conclusion was clearly erroneous,
and overrule *Caughorn*." Recorded because a case that overrules is a case whose own treatment
should be checked before it is relied on.

**THE GAP THAT MUST NOT BE PAPERED OVER — and it is the whole reason this is a candidate and not a
finding.** *LaPorte* construes "a single criminal action" **in Penal Code chapter 3** (§§ 3.02 and
3.03 — joinder and concurrent sentencing). Entry 32's authority, **art. 102.073**, uses the same
phrase **in the court-costs context**, and entry 31 is its converse. **Whether *LaPorte*'s chapter-3
definition carries into art. 102.073 is a question of law that this document does not answer and
must not appear to answer.** What would answer it is a Texas case applying the definition to art.
102.073 — and **three candidates for exactly that sit unread in the same folder** (§6). The
definition is staged; the bridge is not built.

**MAJORITY-OPINION RULE:** the copy states **"En Banc. McCormick"** and **"Opinion by: MCCORMICK"**.
The extraction shows no separate opinion in the portion read. **The copy runs "Page 2 of 3" at the
point read and was not walked end to end** — so the absence of a concurrence or dissent is **not
asserted**; only that none appears in the passages read. That is a real limit on this item and it
is stated rather than smoothed.

**Source:** `Documents\Knowledge Repo\Opinions\LaPorte v. State_840 S.W.2d 412.Pdf`, Lexis printout,
read via device bridge 2026-08-17.

---

## §3 — Cross-cutting findings

### 3.1 — FLP hazard classes: the record already rules THREE, and this pass found a FOURTH

**RR-1 CORRECTION, made after T-25 read `V-8`'s actual text later in this same session — recorded
rather than silently fixed.** This section was first drafted saying the §0.1 note was "scoped around
two," following CHAT-DISPATCH v3's own T-25 line, which names the duplicate-cluster hazard *"alongside
the existing cluster-vs-sub-opinion hazard."* **The dispatch understates the ruling.** `V-8` was RULED
2026-08-13 (#73) to record **three** hazards — the duplicate-cluster hazard, the *Irwin*
no-cite/no-typing class, **and a standing rule that a citing count is never displayed as a precise
figure and never read as a currency signal** — joining the existing cluster-vs-sub-opinion hazard.

**This is the SECOND place in one session where the dispatch's summary is short of the ruled
record** — the other is T-24's taxonomy line, six categories against the ruled seven. **Both are
summaries, not rulings, and both were corrected against the record rather than followed.** Noted
together because one is an isolated slip and two is a pattern worth Michael knowing about before the
next dispatch is written.

**What follows is the pass's own finding: a class the ruled three do not cover, and the
duplicate-cluster class found in a form that inverts.**

| # | Class | Exhibit found this pass | What a naive retrieval returns |
|---|---|---|---|
| 1 | **Cluster id collides with a sub-opinion id** | *Castillo* — cluster 895102 lists an `010combined` sub-opinion **also numbered 895102** | Combined text; author and type indistinguishable; majority rule cannot run |
| 2 | **Two clusters, one decision** | *Alford* — 2419858 (`date_filed` 1999-08-26, the **rehearing-overruled** date, cite + WL + 207 citing refs) and 5269700 (`date_filed` 1999-06-10, the **decision** date, 3 citing refs) | A dead-looking authority with 3 citing references instead of 207 |
| 3 | **Same docket, wrong document — NEW, not within V-8's ruled three** | *Sting Soccer* — FLP's only record for 05-17-00317-CV is the **Aug. 8, 2017 procedural ORDER**, `status "Published"`; the Nov. 30, 2017 merits opinion **is not in FLP at all**. Same shape at *Volt Power* (Apr. 5 / Apr. 20) and *Redman* (Oct. 11 / Oct. 18), where both records exist and only one is meant | A briefing order read as the opinion, or the wrong one of two opinions |
| — | *(V-8's third ruled item, for completeness: **citing counts are never precise figures and never currency signals**)* | *Alford* returned **207** and **3** for the same decision depending on which record was read; *Peeples*' citing traffic tails off around 2020 | A live authority read as dead, or a graph artifact read as a currency finding |

**Class 3 turned up in three of the six T-20 looks.** It is not an edge case, and **it is not covered
by anything V-8 ruled** — adopting it is a separate act, put at T-25 §C-1.

**AND CLASS 2 HAS AN INVERSE THAT MATTERS AS MUCH AS THE HAZARD.** At *Alford*, the record that is
**operative for citation** (2419858) is `010combined` and **cannot** answer the majority question.
The record that is a **duplicate** (5269700) splits the decision into `020lead` (Hankinson, J.) and
`035concurrenceinpart` (Hecht, J.) and **is the only thing that made the majority-opinion rule
runnable.** A rule that says "prefer the operative record, discard the duplicate" would have
destroyed the evidence. **The duplicate is a citation hazard and an attribution asset.** Carried
into T-25.

### 3.2 — FLP's `precedential_status` does not track the Texas designation

Every Texas court-of-appeals record read this pass returned `status: "Published"` — including:
- *Sting Soccer* cluster 4417125, which is **a procedural order**, not an opinion at all; and whose
  companion merits opinion **the court itself designates MEMORANDUM OPINION** (§2.4);
- *Volt Power* and *Redman*, whose designations are unknown and whose `citations` arrays are empty.

**Consequence, stated plainly: FLP's `precedential_status` is not evidence of the Texas designation,
and a memorandum-vs-published question can never be answered from it.** The three entries whose
flags turn on that question (15, 17, 21a) each need the court's own document — which is how §2.4
answered 17 and why 15 and 21a remain open. **This bears on the `precedential_status` item carried
as DESIGN STATUS ONLY from the 08-13 ruling run; it is reported here, not acted on.**

### 3.3 — The reporter-cite flag survived every look that could have resolved it

Four entries carry the flag and were looked at this pass: **15, 16, 17, 21a** (plus **20b**, flagged,
and **18**). **Not one reporter cite was found by any source.** The Lexis copies for *Ochoa*,
*Collins* and *De Anda* each carry Lexis + Westlaw and no S.W.3d; FLP holds no parallel cite for
*Volt Power*, *Redman* or *Sting Soccer*. **The flags are not stale — they are accurate.** What the
pass adds is that the absence has now been tested from two independent source classes.

---

## §4 — What this pass did NOT establish

Stated so no reader mistakes coverage for completeness.

- **No entry's Status line changed.** Nothing here is a verification.
- **Entry 18's cite upgrade did not land** (§2.1) — the pull produced no reporter cite.
- **Entries 15 and 21a remain wholly unresolved on designation and reporter cite** — no [KR] copy
  exists for either and FLP holds neither.
- **Entry 24's proposition was not located inside the Devine majority.** V-9's majority question is
  answered; the proposition-location work is the next act and was not in scope.
- **Entry 31 has no cite.** A definition is staged; the art. 102.073 bridge is not built (§2.6).
- **The nine unnamed opinions in the folder were not read** (§6) — locator only.
- **`In re Ochoa`'s star pagination was not walked**; its \*2 pinpoint comes from *Sting Soccer*'s
  citation of it. Same for *Alford*'s 181, which comes from *Collins*.
- **Currency was inferred from nothing.** No document's contents were treated as a currency
  statement (SOURCING).

---

## §5 — Open items for Michael — full question text carried per QR-1

### 5.1 — **RL-1 · ROUTE-C candidate on entry 19a, and the coupling that makes it not a simple adopt**

**The divergence.** Entry 19a reads: *"It is an abuse of discretion to deny discovery going to the
heart of a party's claim."* The lead opinion reads: *"A trial court abuses its discretion when it
denies discovery going to the heart of a party's **case** or when that denial severely compromises a
party's ability to present a viable **defense**."* Two differences: **claim/case**, and **an entire
second disjunctive limb the entry omits.** The first looks immaterial. The second narrows the entry
against the authority it rests on — a motion to compel could rely on the omitted limb and find no
registry support for it.

**Proposed conforming wording, PROPOSED — adopt / reject / edit:**
> "It is an abuse of discretion to deny discovery going to the heart of a party's case, or where the
> denial severely compromises a party's ability to present a viable defense."

**THE COUPLING, WHICH IS THE REAL QUESTION.** Entries **19a and 19b carry this proposition
verbatim** — that is what the V-5 split preserved deliberately. **19b is VERIFIED as of
2026-08-17.** So:
- Adopting for **19a alone** makes the pair say two different things and quietly ends the split's
  "carried verbatim" premise;
- Adopting for **both** rewords a VERIFIED entry, and **verification attaches to wording** —
  it would **detach 19b's verification**, which is the limit BUILD-STATE already records as the
  thing route (c) does not reach;
- **Rejecting** leaves a narrower entry than its authority, knowingly.

**All three are live and none is recommended. The question is put whole, and it is one question, not
two entries' worth.**

### 5.2 — **RL-2 · Does the *Alford* supersession inference come out of the record?**

The 20a entry and `registry-citator-pass-2026-08-13.md` §2.3 carry: *"The June 10 record is most
likely the original opinion superseded on rehearing, but that characterization is inference and is
not asserted — no opinion text was read."* **Text has now been read, and it says rehearing was
OVERRULED on August 26, 1999 — the June 10 opinion stands; nothing was superseded** (§1.4).
**Question: should that sentence be retired from the entry and replaced with the caption facts, or
should the entry keep the flag as a records hazard and simply drop the inference?** Note the
E-3 precedent cuts both ways here: the citator pass is a **dated record of what a pass found on a
date**, and conforming a finding falsifies it — so the entry may be the right place to correct and
the pass record the wrong one.

### 5.3 — **RL-3 · Which parenthetical, on each of 15, 21a and 20b — three separate one-word calls**

Candidates are laid out at §1.2, §1.3 and §2.3, each element separable. **Each entry is put
independently, never as a package** (ROUTE-C). No candidate is recommended.

### 5.4 — **RL-4 · Should TRCP 193.4(a) and 199.6 become registry entries?**

*Collins* states the evidence-burden rule and cites **TRCP 193.4(a) and 199.6** for it (§2.3). The
registry currently carries the evidence-burden argument on **case** authority only (20a/20b).
**Question: does the DE-1 taxonomy's evidence-burden category want the rule-side authority as its
own entry, or is the case authority sufficient?** Raised because the DE-1 spec at T-24 has to decide
what it cites, and it should not create a registry entry by implication.

### 5.5 — **RL-5 · Should entries 17 and 18 be cross-referenced?**

*Sting Soccer* (17) cites *Ochoa* (18) at \*2 for precisely the proposition entry 18 carries
(§2.4). **Neither entry records the relationship.** Adding a reciprocal note is a registry edit and
is not proposed here. **This is the same shape as the unexecuted second half of #73's V-4 ruling —
"keep as two, CROSS-REFERENCED" — where at HEAD the cross-references run one direction only.** One
ruling could sensibly govern both.

### 5.6 — **RL-6 · The nine unnamed opinions — read them, or not?** See §6.

---

## §6 — OUT OF T-21 SCOPE — locator only, nothing read, nothing characterized

`Documents\Knowledge Repo\Opinions\` holds **nine opinions beyond the WESTLAW-5 and *De Anda***.
They were **not opened**. Listed here by filename only, because filenames of published opinions
carry no client information and because several appear addressed to entries whose cites are
Michael's act:

- `Bonilla v. State_452 S.W.3d 811.Pdf`
- `Middleton v. State_634 S.W.3d 46.Pdf`
- `Williams v. State_253 S.W.3d 673.Pdf`
- `State v. Schmitt_2012 Tex. Crim. App. Unpub. LEXIS 887.Pdf`
- `Ex parte Bailey_2011 Tex. Crim. App. Unpub. LEXIS 388.Pdf`
- `Ex parte Carter_521 S.W.3d 344.Pdf`
- `Ex parte Green_457 S.W.3d 90.Pdf`
- `Ex parte Simmons_2014 Tex. Crim. App. Unpub. LEXIS 501.Pdf`
- `Ex parte Simmons_2015 Tex. Crim. App. Unpub. LEXIS 776.Pdf`

**Why this is a question and not an action.** Entries **30** and **31** are cite-less and their cites
are expressly Michael's act; §2.6 shows entry 31 needs a case bridging *LaPorte*'s chapter-3
definition to **art. 102.073**, and the reported criminal opinions above are the obvious place such
a bridge would be. **Reading them would be this session deciding which authority supports a
cite-less entry — which is the act reserved to Michael.** So: **RL-6 — do you want a locator pass
over these nine (what each cites, no characterization), a full read, or nothing?** Nothing was read
and nothing is assumed.

---

## §7 — Provenance and re-run notes

- **Repo state at authoring:** HEAD `5447538` (CODE-DISPATCH v3 task C-2), `inbox/` empty, working
  tree substantively clean. **The 200 files `git status` reports as modified through the bridge mount
  are a CRLF artifact and nothing else** — `git diff --ignore-cr-at-eol --stat` across the whole tree
  is empty, and `git diff --ignore-all-space` on a sampled file is empty. Recorded because a bridge
  read of a Windows checkout will show this to every future session, and the decisive check is named.
- **A bridge read is not evidence about origin.** `git fetch` and `git ls-remote` fail through the
  mount; whether `5447538` is on origin was **not** established here.
- **FLP throttling** at 5 req/min was hit twice and paced around; no result below rests on a
  throttled or partial response.
- **Nothing was written into any connected folder.** All extraction was VM-local under `/tmp/tlook/`.
