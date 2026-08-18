# When a recorded conversation becomes a discoverable witness statement

**Research memo — `Q-COM-12` / `D-5`**
**Canonical repo path:** `docs/specs/witness-statement-conversion-research-2026-08.md`
**Status: PROPOSED DESIGN INPUT. RESEARCH ONLY. NOTHING BUILT, NOTHING RULED, NO REGISTRY ENTRY
CREATED BY THIS DOCUMENT.** Every proposition below is **UNVERIFIED** with its source named per item.
Retrieval is not verification (SOURCING, Q-STAT-1). **Only Michael verifies.**
**Commissioned:** by Michael at WP-3's verification, 2026-08-17, in his words — *"make a research
note for later to look into the implications of transcribing certain conversations and when the line
of work product to witness statement is crossed."* Recorded at `task-19-signoff-record-2026-08-17.md`
§4 as `D-5`; routed to CHAT-DISPATCH v3 **T-22**.
**Authored:** 2026-08-17 Central (DT-1). Design side, Cowork, Opus 5.
**Adjacent open items this memo speaks to and does not decide:** `Q-COM-12`, `Q-COM-10`,
`P-COM-2/3/4`, `transcript-workflows.md` §1 items 2, 3, 4, 6 and 8.

---

## §0 — The headline, stated first because it changes the design question

**The commissioned question assumes the line is crossed at transcription. On the rule's own words it
is crossed one step earlier — at RECORDING.** A recording of a witness's oral statement is *itself* a
witness statement under TRCP 192.3(h); the substantially verbatim transcript is a **second** artifact
of the same character, not the thing that creates the character.

That relocation matters, because it moves the design decision point from the **transcribe** step to
the **record** step, and because three consequences attach to the recording that nothing downstream
can undo:

1. **A witness statement is an INITIAL DISCLOSURE under the current rule — owed without anyone asking
   for it** (TRCP 194.1(a), 194.2(9)). This is a change from the rule in force when the leading
   sanctions case was decided, and it runs the wrong way for a firm that records by default.
2. **No objection or assertion of work product is permitted to a Rule 194 disclosure at all**
   (TRCP 194.5) — so the classification argument is not merely lost, it is unavailable.
3. **The person recorded can demand a copy of their own statement**, in writing, enforceable by
   motion with expenses (TRCP 192.3(h) final sentence; TRCP 215.1(e)).

**Deciding *not* to transcribe therefore buys very little.** Almost the whole legal consequence is
purchased at the moment the recorder is switched on. `Q-COM-12` asks whether the pipeline should have
a decision point at transcription; the candidate answer this memo supports is **yes, but the
load-bearing one belongs at capture** — and §6 states it as a design question rather than an answer.

---

## §1 — The operative text, spot-checked against raw extraction

**Source for every rule quotation in this section:** clean-authority PDF,
`Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` — "July 2026" is the
**filename's** designation; the PDF's opening page carries no separate effective-date line, the
caveat Michael accepted rather than smoothed at WP-1/2/3's verification. Retrieval RUN **2026-08-17**,
raw `pdftotext -layout` in the device VM (nothing written to a connected folder). The statute-pass §3
`A`-for-space normalizer was **NOT** applied — different publisher; raw TRCP `AA` count is 0.
**Currency is not inferred from this document** (SOURCING).

### 1.1 — TRCP 192.3(h), in full

> "**(h) Statements of persons with knowledge of relevant facts.** A party may obtain discovery of
> the statement of any person with knowledge of relevant facts--a "witness statement"--regardless of
> when the statement was made. A witness statement is (1) a written statement signed or otherwise
> adopted or approved in writing by the person making it, or (2) a stenographic, mechanical,
> electrical, or other type of recording of a witness's oral statement, or any substantially verbatim
> transcription of such a recording. **Notes taken during a conversation or interview with a witness
> are not a witness statement.** Any person may obtain, upon written request, his or her own
> statement concerning the lawsuit, which is in the possession, custody or control of any party."

**Three propositions live in this subsection. The registry currently carries two.** Entry 2 carries
the discoverability sentence; entry 3 carries the definition including the notes sentence (both ruled
to **stay separate**, #95). **The final sentence — the person's right to obtain his or her own
statement — is in no registry entry.** See §7.1.

### 1.2 — TRCP 192.5, in full where it bears

> "**(a) Work product defined.** Work product comprises: (1) material prepared or mental impressions
> developed in anticipation of litigation or for trial by or for a party or a party's
> representatives, including the party's attorneys, consultants, sureties, indemnitors, insurers,
> employees, or agents; or (2) **a communication made in anticipation of litigation or for trial
> between a party and the party's representatives or among a party's representatives**, including the
> party's attorneys, consultants, sureties, indemnitors, insurers, employees, or agents."

> "**(b)(1) Protection of core work product--attorney mental processes.** Core work product - the
> work product of an attorney or an attorney's representative that contains the attorney's or the
> attorney's representative's mental impressions, opinions, conclusions, or legal theories - is **not
> discoverable**."
> "**(b)(2) Protection of other work product.** Any other work product is discoverable **only upon a
> showing that the party seeking discovery has substantial need** of the materials in the preparation
> of the party's case **and that the party is unable without undue hardship to obtain the substantial
> equivalent** of the material by other means."

> "**(c) Exceptions.** Even if made or prepared in anticipation of litigation or for trial, the
> following is not work product protected from discovery: (1) information discoverable under Rule
> 192.3 concerning experts, trial witnesses, **witness statements**, and contentions; ... (4) any
> photograph or electronic image of underlying facts (e.g., a photograph of the accident scene) ...;
> and (5) any work product created under circumstances within an exception to the attorney-client
> privilege in Rule 503(d) of the Rules of Evidence."

> "**(d) Privilege.** For purposes of these rules, an assertion that material or information is work
> product is an assertion of privilege."

### 1.3 — The disclosure machinery, which is where the exposure actually bites

> "**194.1 Duty to Disclose; Production. (a) Duty to Disclose.** Except in a suit governed by the
> Family Code, as exempted by Rule 194.2(c), or as otherwise agreed by the parties or ordered by the
> court, a party must, **without awaiting a discovery request**, provide to the other parties the
> information or material described in Rule 194.2, 194.3, and 194.4."

> "**194.2 Initial Disclosures.** ... **(9) any witness statements described in Rule 192.3(h)**;"

> "**194.5 No Objection or Assertion of Work Product.** No objection or assertion of work product is
> permitted to a disclosure under this rule."

> "**215.1(e) Providing person's own statement.** If a party fails to comply with any person's
> written request for the person's own statement as provided in Rule 192.3(h), the person who made
> the request may move for an order compelling compliance. If the motion is granted, the movant may
> recover the expenses incurred in obtaining the order, including attorney fees..."

**A distinction worth keeping straight, because the corpus contains both lists.** In **Family Code**
suits the parallel provision is **Rule 194a.2(h)** — *"any discoverable witness statement described by
Rule 192.3(h)"* — and Rule 194a.1 makes it available **on request** ("a party **may obtain**
disclosure ... by serving the other party the following request"), not automatically. **Ordinary civil
suits: automatic. Family Code suits: on request.** Both texts were read; the identification was made
from the printed rule headings (194.2 at the corpus's own heading line, 194a.2 under "RULE 194a.
REQUESTS FOR DISCLOSURE IN SUITS GOVERNED BY THE FAMILY CODE"), not inferred.

---

## §2 — The line, drawn precisely

**P-WS-1 — A recording of a witness's oral statement is a witness statement the moment it exists.**
192.3(h)(2) reaches "a stenographic, **mechanical, electrical, or other type of recording** of a
witness's oral statement." No transcription, adoption, signature or approval is required for limb
(2) — those requirements belong to limb (1), which governs *written* statements.
**Source:** TRCP 192.3(h), clean-authority PDF, read 2026-08-17. **UNVERIFIED.**

**P-WS-2 — A substantially verbatim transcription of such a recording is a second witness statement,
not the first.** The rule's words are "**or any substantially verbatim transcription of such a
recording**" — "such a recording" presupposes the recording, which limb (2) has already made a
statement. Transcription creates an additional artifact of the same character.
**Source:** TRCP 192.3(h). **UNVERIFIED.**

**P-WS-3 — Notes of the same conversation are not a witness statement, and are analysed as work
product instead.** 192.3(h)'s notes sentence removes them from the definition; they then fall to
192.5(a)(1) (material prepared in anticipation of litigation), and to 192.5(b)(1) **core** work
product to the extent they contain the attorney's mental impressions, opinions, conclusions or legal
theories — **not discoverable at all**, as against 192.5(b)(2)'s substantial-need/undue-hardship test
for everything else.
**Source:** TRCP 192.3(h), 192.5(a), 192.5(b). **UNVERIFIED.**

**P-WS-4 — So the conversion runs notes → recording, not recording → transcript.** An interview that
produces only notes yields, at worst, other work product and, at best, core work product. The same
interview recorded yields a witness statement. **The delta is created by the capture decision.**
**Source:** synthesis of P-WS-1 through P-WS-3. **UNVERIFIED — and this is the memo's central
candidate proposition, offered for Michael to accept, reject or sharpen.**

**P-WS-5 — Work product is not a defence to a witness statement, and under Rule 194 it is not even an
available objection.** 192.5(c)(1) excepts witness statements from work-product protection
outright; 194.5 forbids asserting work product against a Rule 194 disclosure at all. **Two
independent routes to the same place, which is why a mis-classification here is not a close call.**
**Source:** TRCP 192.5(c)(1); TRCP 194.5. **UNVERIFIED.** *(192.5(c)(1) is the already-VERIFIED
registry entry WP-2 / P-COM-3; 194.5 is in no entry — see §7.2.)*

**P-WS-6 — Attorney-client privilege is a SEPARATE protection that 192.5(c)(1) does not touch, and
192.3(a)'s non-privileged limit plausibly governs the whole of 192.3.** 192.5(c)(1) removes
**work-product** protection only. 192.3(a) opens the scope rule with "any matter that is **not
privileged** and is relevant," and (h) is a subsection of 192.3. **Candidate reading: 192.3(h)
operates inside 192.3(a)'s non-privileged frame, so a recording of a genuinely privileged
attorney-client communication is not made discoverable by being a "recording of a person with
knowledge of relevant facts."** Note also 192.5(c)(5), which carves work product created within a
**TRE 503(d)** exception out of protection — the drafters plainly had the two privileges in view
separately.
**Source:** TRCP 192.3(a), 192.3(h), 192.5(c)(1), 192.5(c)(5). **UNVERIFIED — and this is the
proposition in this memo most in need of Michael's own reading**, because the whole client-recording
posture rests on it and no case was located this session that decides it.

---

## §3 — The case law located

Retrieval per TOOLING: FLP/CourtListener plus named public sources. Descrybe not used.

### 3.1 — *Trahan v. Lone Star Title Co. of El Paso*, 247 S.W.3d 269 (Tex. App.—El Paso 2007)

**This is the exposure, litigated.** The plaintiffs possessed **audio recordings of telephone
conversations** with two individuals and did not produce them in response to a request for
disclosure. From the opinion, read this session:

> "Mrs. Trahan admitted that she prepared the response to the request for disclosure without
> referencing any of the recorded statements she possessed. **Mrs. Trahan testified that she thought
> 'witness statements' meant only signed witness statements, not audio recordings, and therefore she
> only disclosed signed witness statements.** Mrs. Trahan stated that her attorney, Mr. Milligan, had
> reviewed the response and at the time was aware that she had some audio recordings, **but he had
> never listened to them and did not know their content.**"

The court's own footnote states the rule:

> "Under Rule 194.2, a party may request disclosure of any witness statements described in Rule
> 192.3(h). *See* Tex.R.Civ.P. 194.2(i). ... **A witness statement as defined by the Rule includes 'a
> stenographic, mechanical, electrical, or other type of recording of a witness's oral statement, or
> any substantially verbatim transcription of such a recording.'**"

Sanctions were **affirmed**, the court finding "a direct relationship between the Trahans' withholding
of witness statements ... and the sanction imposed," which included exclusion of the withheld
statements, leave for the opponent to amend all prior responses, and fees.

**P-WS-7 — A party's belief that "witness statement" means only signed statements is not a defence,
and audio recordings of conversations with persons having knowledge of relevant facts fall inside the
definition.** **Source:** *Trahan v. Lone Star Title Co. of El Paso*, 247 S.W.3d 269 (Tex. App.—El
Paso 2007); FLP opinion **1876696**, read 2026-08-17. **UNVERIFIED.**

**THE POINT THAT MAKES IT WORSE TODAY, AND IT IS A RULE CHANGE, NOT A CASE HOLDING.** *Trahan* was
decided under a rule where witness statements were disclosed **on request** (its footnote cites
"Tex.R.Civ.P. 194.2(i)"). Under the corpus read this session, **witness statements are Rule 194.2
initial disclosures owed without awaiting a request** (§1.3). **A firm that recorded and said nothing
in 2007 was late answering a request; the same firm today has failed an automatic duty.** *(Stated as
a comparison of two texts. Whether it is the correct account of the amendment history is Michael's —
currency is never inferred from a document.)*

**Majority-opinion rule, run and reported honestly.** FLP opinion 1876696 is `type: 010combined`,
`author_str: Chew`, `per_curiam: false`. A combined record cannot distinguish separate opinions, and
**FLP holds a second cluster for the same case** — cluster **2902597**, same docket 08-05-00293-CV,
same date 2007-07-26, `citations: []` — **which was not read.** So: the passages quoted are from the
document FLP presents as this case's opinion, authored by Chew, J.; **the absence of a concurrence or
dissent is not asserted.** *(This is the same duplicate-cluster hazard the T-20 pass found at *Alford*
— a fourth exhibit, carried to T-25.)*

**Cite-form caveat:** no disposition parenthetical is asserted. FLP records `247 S.W.3d 269`,
`2007 Tex. App. LEXIS 5936`, `2007 WL 2141902`. Whether the correct form carries "pet. denied" or
"no pet." **was not determined and is not guessed.**

### 3.2 — *Bailey Cowan Heckaman, PLLC v. Clark, Love & Hutson, GP* (Tex. App.—Eastland 2025)

A recent opinion restating the definition, read this session for the restatement only:

> "our rules of civil procedure permit the discovery of 'Statements of Persons with Knowledge of
> Relevant Facts' or 'witness statement[s].' TEX. R. CIV. P. 192.3(h). Under the rules of procedure, a
> 'witness statement' is defined as 'a written statement signed or otherwise adopted or approved in
> writing by the person making it' or a 'recording of a witness's oral statement, or any substantially
> verbatim transcription of such a recording.'"

**Used for one thing only: evidence that the definition is stated the same way by a Texas court in
2025.** Its actual subject is whether agency documents are "statements" under the APA — **a different
question, and the opinion is not offered for anything else.** FLP opinion 10834669, cluster 10368081,
docket 11-23-00136-CV, filed 2025-03-27, `citations: []` — **no reporter cite in FLP.**

### 3.3 — What was NOT found, stated so the gap is visible

**No Texas authority was located this session deciding whether a recording of a privileged
attorney–client conversation is reached by 192.3(h)** (the P-WS-6 question). The searches run were
issue searches across Texas courts on the 192.3(h) definition and the "substantially verbatim"
phrase. **Absence in FLP is not absence in the law** — this is precisely the RAG-absence caution, and
the honest report is that the question is open in this record, not that no case exists.

---

## §4 — The conversation taxonomy, run against the line

The Transcript object's `context_type` enum (`transcript-workflows.md` §2) is the natural axis,
because **the artifact's character is fixed by WHO IS SPEAKING, not by which folder the file lands
in.** Each row is a CANDIDATE reading; none is a ruling.

| `context_type` | Is the speaker a person with knowledge of relevant facts? | Candidate character of a recording | The thing that could go wrong |
|---|---|---|---|
| **witness interview** | Yes, definitionally | **Witness statement** (192.3(h)(2)); work product excepted (192.5(c)(1)); **Rule 194.2(9) initial disclosure** | The straightforward case. `transcript-workflows.md` §1.3 already has it right in prose |
| **adjuster call** | Yes — an adjuster has knowledge of relevant facts | **Witness statement**, on the same analysis | **The quietest exposure in the whole pipeline.** Nobody thinks of an adjuster call as a "witness interview," and the enum name invites the wrong classification |
| **opposing-counsel call** | Ordinarily yes as to facts discussed | Likely **witness statement** as to factual content | Recording opposing counsel is separately an ethics question (§1.5 of the workflows doc, on the Bar consult list). **Two independent problems, and they are not the same problem** |
| **intake call (PNC)** | Yes — and often the single most fact-dense call in the file | Turns entirely on **P-WS-6**. If privilege attaches to the prospective client, arguably outside 192.3(a)'s frame; if the PNC declines and later becomes a fact witness, the analysis changes | **The one where the two answers diverge most.** Recording every intake by default commits the firm before the question is answered |
| **client meeting / client phone call** | Yes, literally — the client has knowledge of relevant facts | Protected by **TRE 503**, not by work product (P-WS-6). 192.5(c)(1) is irrelevant to privilege | The workflows doc §1.2 already says recording does not destroy privilege but creates a discoverable-if-waived artifact and a larger inadvertent-disclosure surface. **Correct, and P-WS-6 is the proposition it rests on — currently unsourced** |
| **deposition** | Yes | Already a stenographic record under a separate regime; the reporter's transcript is the operative artifact | A firm-side recording of a deposition is a **second** recording of the same oral statement. Nothing suggests it is privileged |
| **hearing** | Public proceeding | Not a private witness statement in any ordinary sense | Low |
| **mediation-adjacent dictation** | The speaker is Michael | **Work product**, likely core if it carries impressions | The ADR Act bars recording the session itself (§1.6); the design already blocks the prompt and offers dictated recap instead — **which is exactly the right shape and is the model for everything else in this table** |
| **voicemail** | Whoever left it | If from a person with knowledge of relevant facts, **an electrical recording of that person's oral statement** — created by the caller, retained by the firm | **A witness statement the firm never decided to create.** Retention policy, not capture policy, is the lever |
| **staff dictation / attorney dictation** | The speaker is a party's representative | **Work product** under 192.5(a)(1)–(2); core to the extent it carries mental impressions | Safe — **unless a substantially verbatim transcript of a dictation quoting a witness is treated as the witness's statement.** Flagged, not answered |

**THE DESIGN RULE THE TABLE SUGGESTS — CANDIDATE.** A single field decides most of this and the data
model already has it: **Participants**, linked to party records. If any participant is a person with
knowledge of relevant facts other than the firm's own representatives, the recording is a candidate
witness statement **regardless of `context_type`**. `context_type` is a workflow label chosen by a
human at capture time; the participant links are structural. **Deriving the discoverability suggestion
from participants rather than from `context_type` would make the "adjuster call" row impossible to
get wrong.** *Not proposed for build — this is the observation, and the ruling is Michael's.*

---

## §5 — What this means for the pipeline as designed

Read against the built and designed system, without proposing a change to either.

1. **`transcript-workflows.md` §1.3's presumptively-discoverable flag is well-founded and, if
   anything, understated.** It says recordings of witnesses and parties are discoverable and flags
   witness-interview transcripts presumptively discoverable at creation. **On §1.3's own terms the
   flag should reach the recording, not the transcript** — and by §4's table it should reach adjuster
   and opposing-counsel calls too, which the item does not name.
2. **`Q-COM-11` was ruled correctly and for a reason this memo strengthens.** Writing
   `'work-product'` by default is an assertion of privilege under 192.5(d) — and for witness
   interviews and depositions it asserted the stance 192.5(c)(1) excludes. **194.5 adds a second
   reason the ruled answer was right: against a Rule 194 disclosure the assertion is not merely
   wrong, it is not permitted.** The schema half executed at #94; **the creation-time classification
   UI is the recorded follow-on act and is not built.**
3. **`Q-COM-10` — the two `privilege_tier` vocabularies — acquires a substantive edge from this
   analysis, which it did not have as a pure consistency problem.** `generated_documents` admits
   `('attorney-client','work-product','non-privileged')`; `transcripts` admits
   `('privileged','work-product','non-privileged')`. **Neither vocabulary can express "witness
   statement."** By P-WS-5 that is a fourth state with different consequences from all three: not
   privileged, not protected as work product, and **owed as an initial disclosure without a request**.
   Classifying it `'non-privileged'` records the conclusion but loses the *duty* — and the duty is the
   part that gets a firm sanctioned. **Flagged. No schema act is proposed; the question has four
   homes (two CHECKs and two TypeScript unions) and any ruling touches `src/` as well as `db/`.**
4. **Nothing in the medical/PHI or consent architecture is disturbed by any of this.** The PHI flag,
   the consent-status field and the out-of-state hard prompt answer different questions and are
   untouched.
5. **The local-first processing decision (§1.7) is unaffected in either direction.** Where
   transcription happens has no bearing on what the artifact *is*.

---

## §6 — The question Michael actually asked, put back to him

`Q-COM-12` as entered reads: *"Transcribing a recorded conversation may convert attorney's notes into
a discoverable witness statement. Should the pipeline have a decision point there?"*

**Candidate refinement, offered for adopt / reject / edit — the question is put whole and is one
question, not several:**

> **`Q-COM-12` (candidate restatement).** Recording — not transcribing — is what makes a conversation
> with a person having knowledge of relevant facts a witness statement under TRCP 192.3(h)(2), and a
> witness statement is a Rule 194.2 initial disclosure owed without a request, against which Rule
> 194.5 permits no work-product assertion. **Should the capture step carry the decision point, the
> transcription step carry a second one, or both?** And should the discoverability suggestion derive
> from the linked **participants** rather than from the human-chosen `context_type`?

**Why the restatement is offered rather than the original answered.** The original locates the
conversion at transcription. If a build session implemented a decision point only there, **the firm
would still be creating witness statements at capture and would have shipped a control that sits
downstream of the event it exists to control.** That is the kind of near-miss the record already has
a name for. **The restatement is PROPOSED. The original stands unless Michael replaces it.**

---

## §7 — Registry gaps this memo found — flagged, nothing created

**Nothing below is a registry entry. Creating one is Michael's act.** Each is put independently.

### 7.1 — `WS-1` · The third proposition in 192.3(h) is in no entry

192.3(h)'s final sentence — *"Any person may obtain, upon written request, his or her own statement
concerning the lawsuit, which is in the possession, custody or control of any party"* — is carried by
neither entry 2 nor entry 3, and **TRCP 215.1(e) gives it teeth**: failure to comply supports a
motion to compel and an award of expenses including attorney fees. **Question: should this become a
third 192.3(h) entry?** Note the ruling that already governs the shape — #95 ruled the two existing
192.3(h) entries **STAY SEPARATE**, on the reasoning that a different proposition on the same rule
number is a new entry. **That reasoning points toward a third entry, but it was ruled about two, and
extending a ruling is not the same act as applying it.**

### 7.2 — `WS-2` · TRCP 194.1(a), 194.2(9) and 194.5 are in no entry

The registry carries 192.3(h) and 192.5(c)(1) — **the character of the artifact — and nothing about
the duty that attaches to it.** By §0 the duty is where the practical exposure sits.
**Question: does the registry want the Rule 194 disclosure machinery, and if so as one entry or
three?** Raised because the DE-1 template (T-24) and any transcript-pipeline design would both
otherwise cite rules that are not in the registry.

### 7.3 — `WS-3` · The privilege question at P-WS-6 has no entry and no located authority

Whether 192.3(a)'s non-privileged limit governs 192.3(h) is the proposition the **entire
client-recording and intake-recording posture rests on**, and this session located no Texas case
deciding it. **Question: is this a Michael-reads-it item, a Westlaw pull, or a research pass?** It is
named here rather than answered because a model asserting the answer would be the exact failure the
registry exists to prevent.

### 7.4 — `WS-4` · `Q-COM-10` gains a fourth state — see §5.3

**Question: should either `privilege_tier` vocabulary be able to express "witness statement — owed as
an initial disclosure"?** Flagged only; no schema act proposed.

---

## §8 — Limits of this memo

- **It verifies nothing.** Every proposition is UNVERIFIED with its source named.
- **It rules nothing and builds nothing.** No module, table, column or migration is proposed. A build
  session must not read §4's table or §6's restatement as a design.
- **Currency was inferred from no document.** The TRCP PDF's currency rests on its filename
  designation, the caveat Michael accepted at WP-1/2/3 rather than smoothed.
- **The case-law floor is two opinions**, one squarely on point and one a restatement in a different
  context. That is thin, and the thinness is the finding at §3.3 rather than a defect concealed.
- **No opinion was characterized from front matter.** Every quotation above is from text read this
  session.
- **One retrieval hazard, recorded because it nearly produced a false cite.** In FLP's HTML for
  *Trahan*, the footnote's "*Id.*" — which on the page plainly refers back to TRCP 192.3(h) — carries
  markup linking it to *Equisource Realty Corp. v. Crown Life Insurance Co.* **A reader taking FLP's
  citation links at face value would attribute the rule quotation to a case that has nothing to do
  with it.** Carried to T-25 as an adjacent hazard: FLP's citation-linking can attach an id to an
  "Id." that resolves to the wrong authority.
