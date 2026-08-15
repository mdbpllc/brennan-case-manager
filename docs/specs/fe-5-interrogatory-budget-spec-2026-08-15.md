## 2. Legal substrate — registry-style propositions

**ALL UNVERIFIED unless the row says otherwise. Source named per item. No registry file was
touched by this document and no entry was created.**

> **CORRECTION, made inside this session before the document shipped (RR-1).** An earlier draft of
> this section asserted that no `legal-rule-registry-*` file carried any Rule 190 or Rule 197
> entry. **That was wrong, and it was asserted before the check was run.** The dedupe grep was
> then run at HEAD and returned **five existing entries** across two files. The accurate result is
> §2.1 below. The false claim never left this session, but it is recorded here rather than
> silently replaced, because the failure class — asserting a verification result instead of
> running it — is the one the project's conventions exist to catch, and it was this session's.

| # | Proposition | Cite | Source | Status |
|---|---|---|---|---|
| **P-1** | Level 1: *"Any party may serve on any other party no more than 15 written interrogatories, excluding interrogatories asking a party only to identify or authenticate specific documents. Each discrete subpart of an interrogatory is considered a separate interrogatory."* | TRCP 190.2(b)(3) | TIER A | UNVERIFIED |
| **P-2** | Level 1 **also caps requests for production at 15**: *"Any party may serve on any other party no more than 15 written requests for production. Each discrete subpart of a request for production is considered a separate request for production."* | TRCP 190.2(b)(4) | TIER A | UNVERIFIED |
| **P-3** | Level 1 **also caps requests for admissions at 15**, with the same discrete-subpart sentence. | TRCP 190.2(b)(5) | TIER A | UNVERIFIED |
| **P-4** | Level 2: *"Any party may serve on any other party no more than 25 written interrogatories, excluding interrogatories asking a party only to identify or authenticate specific documents. Each discrete subpart of an interrogatory is considered a separate interrogatory."* **190.3(b) contains no RFP or RFA cap** — its three limitations are the discovery period, deposition hours, and interrogatories. | TRCP 190.3(b)(3) | TIER A | **VERIFIED by Michael 2026-08-11** as to the rule; the "no RFP/RFA cap in Level 2" observation is this session's reading of the same text and is UNVERIFIED |
| **P-5** | Level 3: *"The discovery limitations of Rule 190.2, if applicable, or otherwise of Rule 190.3 apply unless specifically changed in the discovery control plan ordered by the court."* The plan **must include** *"appropriate limits on the amount of discovery"* and a discovery period *"for the entire case or an appropriate phase of it."* | TRCP 190.4(b), (b)(2), (b)(3) | TIER A | **VERIFIED by Michael 2026-08-11** as to the rule |
| **P-6** | *"'Discrete subparts' of interrogatories are counted as single interrogatories, but not every separate factual inquiry is a discrete subpart. See Fed. R. Civ. P. 33(a). While not susceptible of precise definition, … a 'discrete subpart' is, in general, one that calls for information that is not logically or factually related to the primary interrogatory."* | TRCP 190 cmt. 3 (comment to 1999 change) | TIER A | UNVERIFIED |
| **P-7** | Under former Rule 168's thirty-answer limit: *"we cannot say that every inquiry into the particulars underlying notice pleadings is too vague or burdensome to answer, or that every response which calls for more than one fact counts as more than one answer toward the maximum of thirty allowed by Rule 168. The thirty-answer limit in Rule 168, like vagueness, burdensomeness and many other standards, while not susceptible of precise definition, establishes some boundary to the range of discovery."* | *Braden v. Downey*, 811 S.W.2d 922, 927–28 (Tex. 1991) | FLP | UNVERIFIED |
| **P-8** | Nineteen numbered interrogatories; respondent objected that *"counting subparts, there are ninety-eight questions."* Held: *"A review of the interrogatories reveals none that have multiple 'discrete sub-parts.' … Accordingly, we hold the interrogatories do not exceed the number allowed by Rule 190.3(b)(3)."* | *In re Swepi L.P.*, 103 S.W.3d 578, 589 (Tex. App.—San Antonio 2003, orig. proceeding) | FLP | UNVERIFIED |
| **P-9** | *"This rule's limitations on discovery do not apply to or include discovery conducted under Rule 202 … or Rule 621a … . But Rule 202 cannot be used to circumvent the limitations of this rule."* | TRCP 190.6 | TIER A | UNVERIFIED |
| **P-10** | *"Unless a suit is governed by the expedited actions process in Rule 169, the court must allow additional discovery"* in the two stated circumstances (new/amended pleadings creating prejudice; materially changed matters where trial moves more than three months past the discovery period). | TRCP 190.5 | TIER A | UNVERIFIED |
| **P-11** | *"depositions on written questions cannot be used to circumvent the limits on interrogatories."* | TRCP 190 cmt. 5 | TIER A | UNVERIFIED |
| **P-12** | *"interrogatories may not be used to require the responding party to marshal all of its available proof or the proof the party intends to offer at trial."* | TRCP 197.1 | TIER A | UNVERIFIED |

### 2.1 Dedupe — run at HEAD across all four registry files

| Existing entry | File | Status | Relationship to this spec |
|---|---|---|---|
| **TRCP 190.3(b)(3)** — Level 2 interrogatory limit | discovery-and-carrier-duties | **VERIFIED — Michael, 2026-08-11**; *"Load-bearing for: FE-5"* | **P-4 duplicates it — and diverges from it. See §2.2.** |
| **TRCP 190.4** — Level 3 by order only | discovery-and-carrier-duties | **VERIFIED — Michael, 2026-08-11**; *"Load-bearing for: FE-5"* | P-5 overlaps but carries content the entry does not: 190.4(b)'s *"must include … appropriate limits on the amount of discovery"* and the phase-scoping in (b)(2). Different proposition, same rule number. |
| **TRCP 197.1** — contention interrogatories authorized | discovery-enforcement-and-pleading | UNVERIFIED | Covers 197.1's **scope** half. **P-12 is its other half** — the marshal-proof limitation — which no entry states. Different proposition, same rule number. |
| **TRCP 197.2(a)** — 30-day response period | discovery-and-carrier-duties | VERIFIED 2026-08-11 | Deadline-engine material, not FE-5's. No overlap. |
| **TRCP 197.2(c)** — records-reference answers | discovery-enforcement-and-pleading | UNVERIFIED | Response-side. No overlap. |

**Genuinely absent from all four files:** Rule **190.2** in its entirety (all three Level 1 caps),
**Rule 190 cmt. 3** (the discrete-subpart *definition* — the 190.3(b)(3) entry states the counting
rule but never what a discrete subpart *is*), **190.5**, **190.6**, and **cmt. 5**. A repo-wide
grep confirms **neither *Braden* nor *Swepi* appears anywhere in `docs/`** — both cases are new to
the record.

The house precedent for the "same rule number, different proposition" cases is stated in
`legal-rule-registry-discovery-enforcement-and-pleading.md` itself: a different proposition on the
same rule number is a **new entry**, not a second observation. Applying that precedent is
Michael's act, not this session's (Q-FE5-7).

### 2.2 The VERIFIED Level 2 entry and the rule text diverge — FLAGGED, NOT REWORDED

The verified entry reads:

> *"Level 2 discovery limits **each party** to 25 interrogatories; discrete subparts count as
> separate interrogatories; interrogatories asking a party only to identify or authenticate
> specific documents do not count against the limit."*

The operative text (P-4, TIER A) reads:

> *"Any party may serve on **any other party** no more than 25 written interrogatories …"*

**"Each party to 25" and "25 to each other party" are different budgets, and the difference scales
with the number of opposing parties.** On the entry's wording a plaintiff in the trucking case
would have 25 interrogatories to spend across five entity defendants; on the rule's wording the
plaintiff has 25 for each of them. An engine built to the entry's wording would refuse discovery
the rule permits, and would do it silently.

This is the divergence class the 2026-08-14 statute pass found in eighteen of twenty-one
propositions, four of them materially — **and this one sits in a VERIFIED entry**, which the other
eighteen did not. It matters because **verification attaches to wording**: BUILD-STATE records
that principle for the three flagged wording expansions in this same file, none of which were
adopted.

**No replacement wording is proposed and nothing was edited.** Route (c) — a session drafting
proposed registry wording — was ruled a **ONE-OFF** on 2026-08-14 and is expressly not standing
law; it is the first item queued for the Fable review pass. This is reported as a flag for
Michael's verification act and nothing more. Carried as **Q-FE5-9**.
### 2.3 Majority-opinion rule — run, per CLAUDE.md, before either case was characterized

| Case | Cluster | `sub_opinions` | Judges | Status | Result |
|---|---|---|---|---|---|
| *Braden v. Downey* | 1682126 | **one** (opinion 1682126) | Hecht | Published | Single opinion of record on this source; text reads *"we hold" / "we conclude"* throughout. Characterized only after reading pp. *927–*928 in full. |
| *In re Swepi L.P.* | 1464879 | **one** (opinion 1464879) | Green, Duncan, Angelini | Published | Single opinion of record on this source. Characterized only after reading the Rule 190.3 passage in full. |

**FLP is not a citator.** Neither case has had a commercial-citator check and neither is
represented as good law here. That look is owed for both and is named in §7.

### 2.4 A stale official comment inside the operative text — REPORTED, NOT REPAIRED

**Comment 5 to the 1999 change says:** *"Use of forms of discovery other than depositions and
interrogatories, such as requests for disclosure, admissions, or production of documents, are not
restricted in Levels 1 and 2."*

**The operative July 2026 text of 190.2(b)(4)–(5) caps requests for production and requests for
admissions at 15 each in Level 1** (P-2, P-3). The comment and the rule it annotates disagree on
their face.

The record resolves it without guesswork: the **comment to the 2013 change**, in the same
document, states that *"Amended Rule 190.2(b) … imposes a fifteen limit maximum on interrogatories,
requests for production, and requests for admission."* So Comment 5 is **superseded as to Level 1**
by a later amendment and appears to remain accurate **as to Level 2**, where 190.3(b) still
carries no RFP or RFA cap.

This is characterized rather than corrected. **Nothing was edited.** It is recorded because a
reader who consults the comments for the Level 1 answer gets the wrong one, and because it is a
currency trap of a kind Q-STAT-1 anticipates: *currency is never inferred from a document.*

### 2.5 A defective pin cite in the official PDF — REPORTED, NOT REPAIRED

TRCP 190 cmt. 3 prints the *Braden* pin cite as:

> `see Braden v. Downey, 811 S.W.2d 922, 972-928 (Tex. 1991)`

**"972-928" is impossible** — a descending range beginning past the opinion's first page.

**It is in the PDF, not in the extraction.** Both a `-layout` and a raw `pdftotext` pass of the
same file return the identical string; the two extractions were compared byte-for-byte at that
line. So this is not the artifact class characterized at
`statute-pass-registry-retrieval-2026-08-14.md` §3.

Two independent sources place the quoted language at **927–28**: the retrieved opinion's own star
pagination (`*927` and `*928` bracket the passage), and *In re Swepi L.P.*, which pin-cites
*"811 S.W.2d 922, 927-28 (Tex.1991)"* for the same proposition.

**No corrected wording is proposed and the PDF is not to be edited.** Whether to treat the
official PDF as carrying a typographical error is Michael's call. Recorded because a citation
copied from that comment into a filing would be wrong.

### 2.6 Extraction-artifact checks run on the source PDF

- **A-for-space artifact** (characterized at `statute-pass-registry-retrieval-2026-08-14.md` §3):
  `grep -c "[a-z]A[a-z]"` returns **0** across 17,396 extracted lines. Absent from this PDF.
  Nothing was normalized because nothing needed it. This corroborates the same finding at #80.
- **Reporter hyphenation in the FLP opinion text** (*"Bra-den"*, *"Ca-sas"*): soft hyphens at
  two-column line breaks in the reporter layout. Characterized, and rejoined **only** in those
  two names where the break is unambiguous. No other substitution was made anywhere.
- **Every quotation in §2 was re-matched against the raw extraction after drafting.** Result in §7.

---

## 3. Scope

Per §13.2:

- **Live count per set against a configurable cap by discovery level**;
  document-identification-only interrogatories excluded (TRCP 190.3(b)(3), 190.4 — VERIFIED
  2026-08-11; **counts display as facts**).
- **Subpart detection is always-on, purely facial** (multiple sentences, enumerated clauses — **no
  semantic judgment**), and its result displays **passively**: a worst-case count beside the
  numbered count (*"21 numbered / up to 24 if subparts count"*).
- **It escalates to a warning ONLY when the worst-case count crosses the cap while the numbered
  count does not** — the boundary where recharacterization risk is real. The ruled middle path
  between the two queue poles, honoring the recorded warning-fatigue risk.
- **The severability judgment is always the attorney's; the engine computes arithmetic, never
  characterizes.**
- **Document-ID exclusion applies to both figures.**

### 3.1 Why the ruled design is the right shape against the authority — and where the research strains it

**It is the right shape.** P-6 defines a discrete subpart by *logical or factual relatedness to
the primary interrogatory* — a **semantic** test. §13.2 computes a **facial** one. Because a
facial pass splits things the legal test would keep together and never the reverse, **the facial
count is an upper bound on the legal count.** That is precisely what makes "worst-case" the honest
label and why the engine must never assert it as *the* count. P-7 is the authority for the
direction of the error: the Supreme Court *"cannot say … that every response which calls for more
than one fact counts as more than one answer."*

**Where it strains.** P-8 supplies the only empirical datum on record about the size of the gap,
and it is large. In *Swepi*, **19 numbered interrogatories** drew an objection asserting **98 on a
subpart count** — a 5.2× facial inflation — and the Fourth Court of Appeals found that **none** of
the nineteen had multiple discrete subparts. The facial count was worth zero.

Run §13.2's escalation rule against those facts: worst-case 98 > cap 25, numbered 19 ≤ cap 25 →
**the engine warns.** On the actual holding, that warning would have been a false positive, in
Bexar County's own court of appeals. This is not an argument that the ruling is wrong — the
passive display would still have read correctly, and the warning is cheap next to a
recharacterization fight. **It is the strongest available evidence about how often the escalation
will fire, and it belongs in front of Michael before the engine is built.** Carried as Q-FE5-3.

### 3.2 The cap is PAIRWISE and CUMULATIVE — a scope consequence not stated in §13.2

Every cap in P-1 through P-4 is worded *"Any party may serve on **any other party** no more than
N."* The budget is therefore per **(propounding party, responding party)** pair — not per
document, not per wave, and not per case.

Two consequences the trucking capture makes concrete. Six sets went out from a shared common core
to five entity defendants plus one held driver. Under the pairwise reading **each defendant has
its own 25**, so a shared core of 20 items spends 20 against five separate budgets rather than 100
against one. And because the cap is not per-wave, **a second wave to the same defendant must know
what the first wave spent** — the running total is per-pair and cumulative across the life of the
case.

Nothing in §13.2 contradicts this; "per set" in the ruling and "per pair" in the rule align when
a set is per-target, which is how the capture used the word. It is stated here because a
per-document counter would be wrong in both directions and the error would be silent.

---

## 4. Data-model touchpoints

**Nothing required by this spec exists today.** Verified at HEAD.

### 4.1 The discovery level is not stored anywhere

`cases` (`db/schema.sql` line 34) carries `practice_area`, `case_type`, `pi_flags`, `court_name`,
`cause_number`, and the rest — and **no discovery-level column**. A repo-wide grep across `db/`
for `discovery_level`, `discovery_control`, and `190.3` returns **nothing**.

**FE-5 cannot look up a cap until the level is data.** That is the item's hard prerequisite, and
it is not a form-engine table — it is a field on the case. Per TRCP 190.1, *"A plaintiff must
allege in the first numbered paragraph of the original petition whether discovery is intended to
be conducted under Level 1, 2, or 3"* (TIER A), so the value has a natural intake moment. But
Comment 1 to the 1999 change qualifies it: the initial pleading *"is merely to notify the court
and other parties of the plaintiff's intention; it does not bind the court or other parties,"* and
*"[u]ntil a Level 3 plan is ordered, a case that is not in Level 1 is in Level 2."* So the pleaded
level and the operative level can differ, and the engine must budget against the operative one.

### 4.2 Level 3 has no cap to look up

P-5: under Level 3 the Level 2 (or Level 1) limits apply *"unless specifically changed in the
discovery control plan ordered by the court,"* and the plan **must include** *"appropriate limits
on the amount of discovery."* **The Level 3 cap is therefore an order value, not a level
constant** — and 190.4(b)(2) permits the plan's period to be scoped *"for the entire case or an
appropriate phase of it,"* which admits phase-scoped limits too. A `cap = f(level)` lookup is
correct for Levels 1 and 2 and structurally wrong for Level 3.

(The phase-scoping observation intersects the Task 6 memo, which records that *"190.4(b)(2) now
allows a Level 3 send-by period, phase-scoped — a different computation SHAPE."* Same rule, two
consequences; nothing here changes that memo and nothing there is re-decided.)

### 4.3 Other touchpoints

| Touchpoint | State at HEAD | Note |
|---|---|---|
| Item table (id, text, scope, instrument type) | **Does not exist** | FE-6 / slice 2. The count operates on items; without them there is nothing to count. |
| Per-pair running total | Does not exist | §3.2. Needs the propounding and responding party identities, i.e. the roster. |
| Roster / role tags | **CD-1 BUILT 2026-08-12**, live migration UNRUN | Supplies the responding party per set. |
| `generated_documents` | Exists; `doc_type` CHECK admits one value | Same constraint noted in the FE-4 spec §3.2. |
| Court-order record (Level 3 plan, 190.5 grants) | Does not exist | No case-event/CE table exists at all; CE1 is NOT AUTHORIZED (D-CL2-9). |
| GRANTs / RLS / probe | `ALTER DEFAULT PRIVILEGES` **not set**; probe covers 36 tables | Every new table carries its own GRANT, RLS policy and probe extension **in the same commit**. |

---

## 5. Behavior

1. **Resolve the operative level** for the case (§4.1) — not the pleaded level where they differ.
2. **Resolve the cap.** Levels 1 and 2: the rule constant, configurable. Level 3: the value from
   the court's plan, phase-scoped if the plan is (§4.2).
3. **Resolve the budget key** — the (propounding party, responding party) pair — and load the
   cumulative spend for that pair across prior waves (§3.2).
4. **Count numbered items** in the set, excluding document-identification-only interrogatories.
5. **Compute the facial worst case** — always-on, purely facial, no semantic judgment — excluding
   the same document-ID-only items.
6. **Display both, passively:** *"21 numbered / up to 24 if subparts count."* Both figures are
   facts about the document, presented as facts.
7. **Escalate to a warning only** when worst-case + prior spend crosses the cap while numbered +
   prior spend does not.
8. **Never characterize severability.** No auto-split, no auto-merge, no suggestion that a
   particular interrogatory *is* multiple. The attorney decides; the engine does arithmetic.

Two behaviors the authority adds and §13.2 does not reach: the budget should recognize that
**Rule 202 and Rule 621a discovery is outside these limits** (P-9), and that **the court may
enlarge the budget** under 190.5 (P-10) and by agreement or order under 191.1. A cap displayed as
though it were fixed misstates the rule. Carried as Q-FE5-6.

---

## 6. Non-goals

- **Not a build authorization.** The form engine is not a named slice; FE-D1 is the only
  authorized form-engine slice and FE-5 is not in its scope on the record.
- **Does not create the item model** (FE-6 / slice 2) or count anything but items.
- **Does not decide severability, ever.** Not a lint, not a suggestion, not a nudge.
- **Does not draft, rewrite, or split an interrogatory.**
- **No registry entry is created, moved, or verified** by this document.
- **Not a deadline engine.** Response deadlines are the Task 6 memo's subject; this spec computes
  counts only and points there rather than duplicating it.
- **Does not extend to disclosures.** Rule 194 required disclosures are not interrogatories and
  are not budgeted here.
- **No client data.** Every example is from published authority or is structural.

---

## 7. Open questions — FULL TEXT (QR-1)

Packet-local IDs only. **No durable IDs are minted** — `FE-` is Michael's namespace to mint into,
and `ID-DL-1` already asks which series packet-local questions join.

**Q-FE5-1.** FE-5 as ruled budgets **interrogatories only**. On the July 2026 text, Level 1 also
caps **requests for production at 15** (190.2(b)(4)) and **requests for admissions at 15**
(190.2(b)(5)), each with the identical discrete-subpart sentence — while Level 2 caps neither.
Does FE-5's budget extend to RFPs and RFAs when the case is in Level 1, or is that a separate
item? The practice consequence is direct: the trucking sets combined interrogatories, RFPs and
RFAs in one served document, so in a Level 1 case a single document would be running three budgets
at once, two of which the engine as ruled does not track.

**Q-FE5-2.** FE-5 has no FE-D1 disposition on the record. `fe-d1-build-slice.md` dispositions FE-8
through FE-17 in or out with named homes, but FE-4, FE-5, FE-6 and FE-7 appear in neither list.
Is FE-5's home the discovery slice — which is where the item table it counts is going — and should
the four already-ruled items get explicit dispositions so the FE series reads uniformly?

**Q-FE5-3.** *In re Swepi L.P.* is the only empirical datum on record about facial-vs-legal subpart
counts, and it comes from the Fourth Court of Appeals: **19 numbered interrogatories, a facial
subpart count of 98 asserted by the objecting party, and a holding that none of the nineteen had
multiple discrete subparts.** Under §13.2's escalation rule (worst-case 98 > cap 25 while numbered
19 ≤ 25) **the engine would have warned**, and on the holding the warning would have been wrong.
Does that change the escalation threshold, argue for a ratio-based or absolute-margin condition
instead of bare crossing, or does it confirm the ruled design — on the reasoning that a warning
which prompts one attorney look is cheap next to a recharacterization fight, and that the passive
display was correct the whole time? The recorded warning-fatigue risk is the thing being traded.

**Q-FE5-4.** *Braden v. Downey* construes the **thirty-answer limit of former Rule 168**, not Rule
190's discrete-subpart rule; the current rule's Comment 3 cites it for the narrower proposition
that the boundary is *"not susceptible of precise definition."* Does *Braden* enter the registry
as an antecedent proposition with that limitation stated on its face, does it ride only inside a
Rule 190 comment entry, or does it stay out of the registry as pre-rule authority?

**Q-FE5-5.** The pleaded discovery level and the operative one can differ: TRCP 190.1 requires the
plaintiff to plead the intended level, but Comment 1 says the pleading *"does not bind the court
or other parties"* and that a case not in Level 1 is in Level 2 until a Level 3 plan is ordered.
Does the case record store **one** level field that the attorney maintains, or **two** — pleaded
and operative — with the budget reading the operative one? A single field silently answers a
question the rule leaves open; two fields make the divergence visible and cost an intake keystroke.

**Q-FE5-6.** Should the budget model the ways the cap moves? TRCP 190.6 puts Rule 202 and Rule
621a discovery outside these limits; 190.5 requires the court to allow additional discovery in
stated circumstances; 191.1 allows modification by agreement or by order for good cause. A cap
rendered as a fixed number is a simpler UI and a less accurate one. If the answer is yes, an
enlargement is an event with a source (order / Rule 11 agreement) and there is no case-event table
to hold it — CE1 is not authorized (D-CL2-9).

**Q-FE5-7.** Which of the twelve propositions in §2 become registry entries? The dedupe at §2.1
sorts them three ways. **P-4 and P-5 duplicate VERIFIED entries** and add content those entries do
not carry. **P-12 is the unstated half of an existing UNVERIFIED 197.1 entry** — a different
proposition on the same rule number, which this project's own precedent treats as a new entry
rather than a second observation. **Everything else is genuinely absent**: all of Rule 190.2 (the
three Level 1 caps), cmt. 3's *definition* of a discrete subpart, 190.5, 190.6, cmt. 5, and both
cases. Against entering them: the backlog is 34 today (37 when V-5 executes) and the queue is
already the project's bottleneck (H22), and if they enter, the fifth-registry-file question
(Q-STAT-5, still open) is reached again. Against not entering them: this document becomes their
only home, and it is not a registry — FE-5 would be built on propositions that live in a spec.

**Q-FE5-9.** The VERIFIED **TRCP 190.3(b)(3)** entry reads *"Level 2 discovery limits **each
party** to 25 interrogatories"*; the operative text reads *"Any party may serve on **any other
party** no more than 25."* Those are different budgets and the gap scales with the number of
opposing parties — 25 total versus 25 × 5 in the trucking posture. **No replacement wording is
proposed** (route (c) is a ruled one-off, not standing law) and nothing was edited. Two questions
ride here: does the entry's wording need your verification act, given that verification attaches
to wording; and should FE-5 be built against the entry as verified, or against the rule text, if
the two are not reconciled before the engine is authorized?

**Q-FE5-8.** TRCP 190 cmt. 3 prints the *Braden* pin cite as **"972-928"**, which is impossible,
and the passage sits at 927–28 by both the opinion's star pagination and *Swepi*'s pin cite of the
same language. **Nothing was repaired.** Does the project record known defects in official source
documents anywhere durable — this is now the second such finding, after the garbled Bexar
county-court sentence reported at #80 — or does each one live only in the memo that found it?

---

## 8. Provenance, verification state, and the looks that are owed

- Rule text: **TIER A**, `Civil\texas-rules-of-civil-procedure July 2026.pdf`, staged from
  `Documents\Knowledge Repo` (HK-7 grant, session-scoped, satisfied for this session and **not
  closed**) and read locally. Currency is **not** inferred from the document: the PDF's own title
  states amendments effective July 2026, and no claim beyond that is made here.
- Case text: **FLP/CourtListener**, per TOOLING. Descrybe was not used. The CourtListener API is
  **not** wired into the app and nothing here proposes it (Q-6).
- **Quotation re-match, run after drafting, mechanically rather than by eye.** Every quotation was
  normalized (Unicode NFKD, smart quotes and dashes folded, whitespace collapsed, case-folded) and
  tested for containment in the source text. **Rule and comment quotations: 20 of 20 matched**
  against the raw `pdftotext` extraction. **Case quotations: 7 of 7 matched** against the retrieved
  opinion text, with the reporter hyphenation characterized at §2.6. The script is reproducible
  from this document's quotations and the two named sources; it was not committed.
- **Nothing is verified. No status moved. No registry file was touched. `form-engine.md` was not
  edited** — §13.2 stands as written. The divergence at §2.2 was flagged, never rewritten.

**Looks owed, named concretely:**

1. **FE5-LOOK-1** — a commercial citator on *Braden v. Downey*, 811 S.W.2d 922. FLP is not a
   citator; nothing here represents it as good law.
2. **FE5-LOOK-2** — a commercial citator on *In re Swepi L.P.*, 103 S.W.3d 578, which carries the
   load in §3.1 and is a 2003 intermediate-appellate mandamus.
3. **FE5-LOOK-3** — four further Texas opinions containing "discrete subpart" were located and
   **deliberately not retrieved or characterized** in this pass: *In re Novartis Pharms. Corp. v.
   Texas* (Tex. App.—15th Dist. 2025), *Affirmation Holdings, LLC v. Windsor at Barton Creek, LP*
   (Tex. App.—Austin 2025), *In re Estate of Flarity* (Tex. App.—Beaumont 2020), and *In re
   Manhattan Vaughn, JVP* (Tex. App.—Houston [1st Dist.] 2015). **Five Texas opinions in total use
   the phrase** — the case law on this rule is thin, which is itself a design fact. Reading the
   four is the next increment if Q-FE5-3 turns on how courts actually apply the test.
