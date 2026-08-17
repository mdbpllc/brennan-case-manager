# Statute Pass — rule and statute text retrieval against the official corpus

**Canonical repo path (proposed):** `docs/specs/statute-pass-registry-retrieval-2026-08-14.md` — NEW file,
rides the next packet on Michael's word.

**Status: PROPOSED design input — RETRIEVAL ONLY. NOTHING BELOW IS VERIFIED.** Retrieval is not
verification. Every entry discussed here stays UNVERIFIED until Michael verifies it, and verification
attaches to the proposition WORDING, not to the rule generally. A model asserting legal currency is
never verification. **No registry file was altered by this session.** Where a proposition diverges from
the operative text, this document QUOTES the text and FLAGS the divergence. **For the four divergences
that change what an entry MEANS, §9 additionally drafts PROPOSED replacement wording — per Michael's
ruling of 2026-08-14, route (c) — and adopts none of it.** Correcting a proposition's wording is a
wording act and is Michael's alone; drafting a candidate for him to accept or reject is not.

**Authored:** 2026-08-14 Central (design session, Opus 5, Cowork). **DT-1 applied:** clock-checked
22:59 CDT before stamping; the container clock read 2026-08-15 UTC, past the 19:00 CDT rollover. This
file correctly stamps **2026-08-14 Central**.

**Provenance:** sourced to HEAD and to the official corpus by full-text read through the device bridge —
not RAG. Both folder grants were live this session (`brennan-case-manager` and `Knowledge Repo`).
**HK-7 is satisfied for this session and stays OPEN** — the grant is session-scoped.

**Closes:** the `RETRIEVAL: NOT RUN` gap named at `registry-verification-workbook-2026-08-13.md` §0 and
carried in BUILD-STATE. **All 21 such rows are retrieved below** (see §2 on why the figure is 21, not 20),
plus entry 32's official-source read, which the workbook carried as PARTIAL.

---

## §1 — Sources, named per item

The 2026-08-13 TOOLING ruling requires each source named per item for case law. **No equivalent standing
rule exists for statutes** — the statute-sourcing convention proposed on 2026-08-14 is still PROPOSED,
not ruled (§8 Q1). This pass applies it anyway, so that if it is ruled, nothing here needs retrofitting.

| Layer | Source used | Provenance |
|---|---|---|
| Texas statutes | `Documents\Knowledge Repo\Statutes 26-08-14\{CP,CR,PE,HS,IN}.pdf.zip` | Official bulk download, `statutes.capitol.texas.gov/download`, Michael's hand 2026-08-14 |
| TRCP | `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` | Clean-authority PDF, Michael's hand |
| Registry entries | `docs/specs/legal-rule-registry-*.md` at HEAD, through the bridge | Full text, not RAG, not the workbook's abridgements |

**Currency.** Per Michael, the corpus is current through the **89th 2nd Called Session (2025)**. That
statement is his, taken from the site; it is not inferred from a chapter. **Independent corroboration
run this session, and it is corroboration only:** 89th-Legislature material is physically present in
six of the eleven chapters read — CP.15 (2), CR.102 (7), CR.27 (1), CR.42 (12), HS.481 (2), PE.31 (18).
Insurance chs. 541/542 carry no 89th-Leg. material, which means those chapters were not amended in 2025,
**not** that the download is stale — the same download carries 2025 text elsewhere.

**A new PDF appeared in the Knowledge Repo root this session** and was staged but not used:
`texas-rules-of-evidence-updated-with-amendments-effective-07022026.pdf`. **No registry entry cites the
TRE**, so it had nothing to answer here. Flagged so it is not mistaken for an unread source.

---

## §2 — Two count corrections, and a fourth registry file

**(a) The NOT-RUN figure is 21, not 20.** BUILD-STATE and workbook §0 both say 20. Counted at HEAD this
session: **21 rows carry `RETRIEVAL: NOT RUN`** — entries **1–13, 23, 25, 26, 27, 28, 29, 33, 34**.
Entry 32 additionally read PARTIAL, with its one look being "verify against the **official** text," which
was also run here. So the honest figure for text retrieval owed was **22 looks, 21 of them literally
NOT RUN**. Not a correction entry: the "20" appears only in design-side research support and in the
BUILD-STATE line describing it, and nothing was decided on the strength of it. Recorded so it is not
re-derived.

**(b) There is a FOURTH registry file, and the backlog of 34 excludes it.** BUILD-STATE §122 says
"REGISTRY — THREE files." `docs/specs/legal-rule-registry-draft-entries-medical-billing.md` exists at
HEAD (53 KB, drafted 2026-07-23) and is headed **"ALL ENTRIES UNVERIFIED."** Its entries are not in the
34. That may be deliberate — it is styled *Draft Entries* and carries its own `[READ]/[STATUTE]/[EXT]`
source-flag scheme rather than the registry's status scheme — but the three-files line reads as an
inventory, and an unverified fourth file sitting outside the backlog count is exactly the kind of thing
that propagates. **Flagged, not resolved (§8 Q2).**

**(c) The Insurance Code position, CORRECTED 2026-08-15 at #78 — this paragraph originally
over-claimed.** It read that a full-text search of **all four** registry files found zero Insurance
Code references. **The fourth file was not in fact searched** (see #78 for the mechanism), and it
carries **ENTRY 8, "No Surprises Act ↔ Texas balance-billing (SB 1264 / Ins. Code Ch. 1467)"**,
flagged `[EXT throughout; low priority]`. **What is true, verified at HEAD across all four files:
chapters 541 and 542 do not appear anywhere, nor does "prompt pay"** — so every candidate in §7
remains a first for the UIM/bad-faith line, and **no candidate is withdrawn.** The three registry
files proper carry no Insurance Code reference of any kind. **"Carrier duties" in that filename still
means motor carrier.** The flag from the 2026-08-14 capture is closed **as to chs. 541/542 only.**

---

## §3 — TOOLING CORRECTION: the published A-for-space normalizer is wrong

**What was asserted.** `claude_Authority_Corpus_and_eCFR_Method_2026-08-14.md` §2 publishes a normalizer
for the Legislature's `A`-for-space artifact and states it "produced clean output on `cp.71.pdf`":

```python
n = re.sub(r'(?<=[A-Za-z.,;:0-9\)])A{1,3}(?=[A-Z0-9"(])', ' ', text)
```

**What is true instead.** That regex is wrong in both directions, and silently.

1. **It destroys real text.** The lookbehind accepts any letter and the lookahead any capital, so every
   genuine `A` inside an all-caps heading is eaten. Run on `cp.37.pdf` it yields
   `CIVIL PR CTICE AND REMEDIES CODE`, `CH PTER 37. DECL R TORY JUDGMENTS`, `SUBJECT M TTER`,
   `INTERPRET TION`. The capture's own warning — "an over-eager substitution inside a word would be
   worse than the artifact" — describes precisely what its regex does.
2. **It misses the commonest artifact form.** `(1)AAto ascertain` survives untouched, because the
   lookahead demands an uppercase letter, digit, or quote and finds a lowercase `t`. That form is the
   single most frequent occurrence in the corpus.

**Evidence.** Raw `pdftotext -layout` output of `cp.37.pdf` contains `CIVIL PRACTICE AND REMEDIES CODE`
correctly; the damage is introduced by the normalizer, not by extraction. The only non-ASCII codepoint
in the file is U+2019.

**A second wrong normalizer, written and discarded this session, recorded so it is not re-invented.**
`re.sub(r'(?<=\S)A{2,3}(?=\S)', ' ', t)` fixes the headings but breaks three-A runs:
`(b)AAAn offense` → `(b) n offense`. **A three-A run is never a three-A artifact** — it is the two-A
artifact followed by a real word-initial `A`.

**The artifact, characterized empirically** rather than guessed, across CP.15/37/71, CR.27/102, PE.31,
HS.481, IN.541/542 — every run of `A`s glued between two non-space characters, grouped by neighbours:

- The space substitute is **always exactly two `A`s**, after `)`, `.`, `:`, `"`, `,`, or between
  lowercase letters: `(1)AAto` · `(b)AAAn` · `.AADEFINITION` · `FINES:AAJUVENILE` ·
  `contendere."AAIf` · `ephedrine,AApseudoephedrine` · `courtAAbuilding`.
- Plus **one single-`A` form**: an `A` between a period and a digit — `Sec.A37.001`, `Art.A102.073`.
- **Everything else that looks like the artifact is a real letter**: `(A)` subdivision letters,
  `55A.151` / `42A.402` article numbers, `Florida-Alabama`, and every `A` in an all-caps heading.

**The corrected normalizer**, and the design rule that matters more than the regex:

```python
ARTIFACTS = [
    ("paren",  re.compile(r'(?<=\))AA')),
    ("period", re.compile(r'(?<=\.)AA')),
    ("colon",  re.compile(r'(?<=:)AA')),
    ("quote",  re.compile(r'(?<=")AA')),
    ("comma",  re.compile(r'(?<=,)AA')),
    ("lower",  re.compile(r'(?<=[a-z])AA(?=[A-Za-z0-9("])')),
    ("secnum", re.compile(r'(?<=\.)A(?=\d)')),
]
APOS = re.compile(r'[ \t]+(?=’)')     # pdftotext emits "attorney ’s"
```

**DESIGN RULE — transform only what is characterized; REPORT anything else, never guess at it.** The
harness writes four files per chapter (`.raw`, `.norm`, `.flow`, `.subs` — the last an audit trail of
every substitution site with context) and prints any residual glued `AA` instead of transforming it.
That reporting step is what caught the three contexts the first characterization missed. Result across
all eleven chapters read: **residual `AA` = none**, with the audit trail retained.

**Failure class.** Same family as the corrections already on the record for over-broad absence claims:
a heuristic was reported as tested when the test had not been read closely. It differs in one respect
worth naming — **this one degrades verbatim quotation of primary law**, which is the one output where a
silent corruption is worst. A registry entry quoting `CH PTER 37. DECL R TORY JUDGMENTS` would read as a
transcription error; one quoting `(b) n offense under this section is a state jail felony` might not.

**Actor:** Opus 5, design session, 2026-08-14. **What changed:** nothing published earlier was rewritten;
the capture is knowledge-bound and RAW, and this document supersedes its §2 rather than editing it.
**§8 Q3 asks Michael whether he wants the capture itself annotated**, since a future session that RAG-hits
the capture and not this file gets the broken regex.

---

## §4 — The thirteen deficiency-batch rule entries (workbook 1–13)

Text below is from the July 2026 TRCP PDF. **Divergence flags describe the entry as filed in
`legal-rule-registry-discovery-enforcement-and-pleading.md`, read at HEAD — not the workbook's
abridgement**, which differs from the filed wording in at least one place (entry 4, where the workbook
dropped "or its attorney" that the entry does carry).

### The four whose operative clause matches as filed

**Three of these carry no flag at all — 3, 10, and (in §5) 25. Entries 8 and 9 match on the operative
clause but omit surrounding text; their flags are below.**

| # | Cite | Finding |
|---|---|---|
| 3 | 192.3(j) | **Subsection (j) is current and is titled "Contentions."** Text: "A party may obtain discovery of any other party's legal contentions and the factual bases for those contentions." Near-verbatim match. **No flag.** |
| 8 | 197.2(c) | Operative clause matches: records "must be specified in sufficient detail to permit the requesting party to locate and identify them as readily as can the responding party." *(Omission flag below.)* |
| 9 | 198.1 | Matches, including "statements of opinion or of fact or of the application of law to fact." *(Omission flag below.)* |
| 10 | 215.1(c) | Matches: "For purposes of this subdivision an evasive or incomplete answer is to be treated as a failure to answer." **No flag.** |

### The two the workbook singled out — both answered

**Entry 1 — TRCP 192.3(a). The "reasonably calculated" formulation IS still in the current rule.** That
was the workbook's highest-value rule look and the answer is yes. **But two divergences, one material:**

> **192.3(a) Generally.** In general, a party may obtain discovery regarding any matter that is **not
> privileged** and is relevant to the subject matter of the pending action… **It is not a ground for
> objection** that the information sought will be inadmissible at trial if the information sought appears
> reasonably calculated to lead to the discovery of admissible evidence.

- The entry **omits "not privileged."** For a proposition relied on as "the doctrinal preamble of the
  deficiency letter and motion to compel (DE-1)," dropping the privilege qualifier from the scope
  statement is the omission most likely to be quoted back.
- The rule frames "reasonably calculated" as a **non-ground for objection**, not as an affirmative scope
  test. The entry states it affirmatively. Argumentatively equivalent in most uses; not textually so.

**Entry 13 — TRCP 191.2. The workbook said "if the certificate requirement is stated wrongly, DE-2's fuse
is wrong." It is stated wrongly, in two respects.**

> **191.2 Conference.** Parties and their attorneys are **expected to cooperate** in discovery and to make
> any agreements reasonably necessary for the efficient disposition of the case. **All discovery motions
> or requests for hearings relating to discovery** must contain a certificate by the party filing the
> motion or request that a reasonable effort has been made to resolve the dispute without the necessity
> of court intervention **and the effort failed**.

- **The entry says "a motion or response addressing a discovery dispute" must carry the certificate. The
  rule does not require a certificate on a RESPONSE.** It reaches motions and requests for hearings, and
  the certificate is by "the party filing the motion or request." This is an overstatement of the rule
  against the drafter's own side.
- **The entry omits "and the effort failed."** The certificate has two elements, not one — a conferral
  certificate that does not recite failure does not track the rule.
- Third, smaller: the rule imposes no freestanding duty to "make a reasonable effort to resolve"; parties
  are "expected to cooperate," and the reasonable-effort content lives in the certificate requirement.
  Whether that distinction matters to DE-2's fuse is Michael's call — flagged, not resolved.

### The rest — text and flags

**Entry 2 — 192.3(h).** Subsection letter **(h) is current**; the entry's operative clause matches. The
rule adds material the entry does not carry and that a deficiency letter would misuse without: witness
statements are discoverable **"regardless of when the statement was made"**; a witness statement is
defined (signed/adopted writing, or a recording or substantially verbatim transcription); and
**"Notes taken during a conversation or interview with a witness are not a witness statement."**

**Entry 4 — 193.1.** Matches, including "or its attorney." The rule adds three requirements the entry
omits, all of them deficiency-letter fodder: the response must be **in writing**, **within the time
provided**, and answers/objections **"must be preceded by the request or required disclosure to which
they apply."**

**Entry 5 — 193.2(a),(b),(c),(e),(f) + cmt. 3. The linchpin of DE-1, and its waiver limb states the rule
backwards.**

> **193.2(e) Waiver of objection.** An objection **that is not made within the time required, or that is
> obscured by numerous unfounded objections,** is waived **unless the court excuses the waiver for good
> cause shown.**

The entry reads: "an objection **that obscures a responsive answer** waives the objection." **The rule's
subject and object are reversed.** The rule waives an objection that is *obscured by* a thicket of
unfounded objections; the entry describes an objection that *obscures an answer*. The entry also drops
the untimeliness limb and the good-cause escape. Three further divergences in the same composite:

- **(b)** — the entry's "a party must comply to the extent no objection is made" omits the rule's
  qualifier **"unless it is unreasonable under the circumstances to do so before obtaining a ruling on
  the objection."**
- **(f)** — the rule says a party **"should not"** object on privilege grounds and adds that one who does
  **does not waive the privilege** but must comply with 193.3 when the error is pointed out. The entry's
  "prophylactic privilege objections are **not permitted**" is stronger than the text.
- **cmt. 3** — confirmed present and reads "The statement should not be made prophylactically, but only
  when specific information and materials have been withheld." **"Prophylactically" attaches to the
  193.3 withholding statement, not to the objection.** The entry borrows the word across that line.

**Entry 6 — 196.2(b). The third permitted response, as filed, is not in the rule.** The rule's four are:

> (1) production… will be permitted as requested; (2) the requested items are being served with the
> response; **(3) production… will take place at a specified time and place, if the responding party is
> objecting to the time and place of production;** or (4) no items have been identified — after a
> diligent search — that are responsive to the request.

The entry's third is **"that production will be permitted except as specifically objected to."** That is
not option (3); it is closer to the very "dribbling" response the entry is relied on to attack. Also,
196.2(b) is not a pure pick-one: it opens by requiring the responder to "state objections and assert
privileges as required by these rules" **and** state one of the four.

**Entry 7 — 197.1.** Matches, and **the Rule 195 carve-out is stated correctly.** The entry omits the
rule's express limit, which is the standard objection to contention interrogatories:
**"but interrogatories may not be used to require the responding party to marshal all of its available
proof or the proof the party intends to offer at trial."** Also omits the "no later than 30 days before
the end of the discovery period" service limit.

**Entry 8, continued.** The entry omits the **precondition** for using the records option at all — that
"the burden of deriving or ascertaining the answer is **substantially the same** for the requesting party
as for the responding party" — and the follow-on duties to state a reasonable time and place, produce,
and give a reasonable opportunity to inspect. A deficiency letter has a second ground the entry does not
carry.

**Entry 9, continued.** Omits the genuineness-of-documents limb and "Each matter for which an admission
is requested must be stated separately."

**Entry 11 — 215.1(d). The rule is not permissive. This is the largest single correction in the file, and
it runs in Michael's favour.**

> If the motion is granted, the court **shall**, after opportunity for hearing, require [the party or
> attorney] to pay… the reasonable expenses incurred in obtaining the order, **including attorney fees,
> unless** the court finds that the opposition was **substantially justified** or that other circumstances
> make an award unjust.

The entry says "Expenses and attorney's fees **may** be awarded on a motion to compel." The workbook's
one look asked to "confirm the permissive 'may'." **There is no permissive "may" on a granted motion —
it is "shall… unless."** Fee-shifting is the default outcome of a granted motion to compel, which
strengthens the DE-2 escalation posture materially. **And the entry omits the reciprocal:** if the motion
is **denied**, the court may require the **movant** to pay the opposing party's expenses on the same
substantially-justified standard. That is a risk the escalation timeline should price and currently does
not carry.

**Entry 12 — 215.4(b).** Same mandatory-with-exceptions shape: "The court **shall** make the order
unless it finds that (1) the request was held objectionable pursuant to Rule 193, or (2) the admission
sought was of no substantial importance, or (3) the party failing to admit had a **reasonable ground to
believe that he might prevail** on the matter, or (4) there was other good reason for the failure to
admit." The workbook's one look asked whether the exceptions are load-bearing for IN-7's use.
**They are** — exception (3) is the standard answer to a 215.4(b) motion.

### One thing the rule comments give the registry for free

**TRCP 193 cmt. 6:** *"Any party can request a hearing in which the court will resolve issues brought up
in objections or withholding statements. **The party seeking to avoid discovery has the burden of proving
the objection or privilege.**"* Registry entries 14, 20 and 21 currently rest that burden proposition on
case law alone (*Park Cities Bank*, *Alford*, *Peeples*, *Redman*). An official rule comment states it
directly. **Candidate, not an entry — §8 Q4.**

**TRCP 193 cmt. 2** cuts the other way and is worth carrying as anticipated counter-authority in the same
posture as entry 22: a party **may** object to a request for "all documents relevant to the lawsuit" as
overly broad and refuse it entirely (*Loftin v. Martin*, 776 S.W.2d 145 (Tex. 1989)), and may object to a
request for a litigation file as overly broad (*National Union Fire Ins. Co. v. Valdez*, 863 S.W.2d 458
(Tex. 1993)). **Both cites are as printed in the rule comment and have had no citator pass.**

---

## §5 — The UIM / pleading batch (workbook 23, 25, 26, 27)

**Entry 25 — CPRC § 37.009. Clean; the entry tracks the statute almost verbatim.**

> **Sec. 37.009. COSTS.** In any proceeding under this chapter, the court may award costs and reasonable
> and necessary attorney's fees as are equitable and just.

**Entry 26 — CPRC § 15.002(a)(1). Matches.** One omission worth carrying into any venue module: the
subsection opens **"Except as otherwise provided by this subchapter or Subchapter B or C"** — mandatory
and permissive venue provisions displace the general rule, and the entry as filed reads as unconditional.

**Entry 23 — CPRC § 37.001 et seq. The workbook's Q4 is confirmed by the text, and sharpened.**
**§ 37.001 is a definition of "person" and nothing else.** The sections that actually supply the vehicle
are **§ 37.003(a)** ("A court of record within its jurisdiction has power to declare rights, status, and
other legal relations whether or not further relief is or could be claimed") and **§ 37.004(a)** (subject
matter), with **§ 37.002(b)** supplying the liberal-construction instruction. Nothing in ch. 37 addresses
UIM coverage prerequisites; that availability holding is *Irwin*'s (entry 24). **So the entry's cite is
loose in two ways at once** — "§ 37.001 et seq." points at a definition, and the proposition is
doctrinal rather than textual. Q4 remains Michael's wording act; the text now tells him which sections
the narrowed version would cite.

**Entry 27 — TRCP 47(b)–(c). TEXT PARTIAL is now COMPLETE. This is the entry that BLOCKS FE-14, and its
wording as filed is off in four ways.**

> **RULE 47. CLAIMS FOR RELIEF.** An original pleading which sets forth a claim for relief… shall contain
> **(a)** a short statement of the cause of action sufficient to give fair notice of the claim involved;
> **(b)** a statement that the damages sought are within the jurisdictional limits of the court;
> **(c)** **except in suits governed by the Family Code**, a statement that the party seeks:
> **(1)** only monetary relief of $250,000 or less, excluding interest, statutory or punitive damages and
> penalties, and attorney fees and costs; **(2)** monetary relief of $250,000 or less and non-monetary
> relief; **(3)** monetary relief over $250,000 but not more than $1,000,000; **(4)** monetary relief over
> $1,000,000; or **(5)** only non-monetary relief; and
> **(d)** a demand for judgment for all the other relief to which the party deems himself entitled.
>
> …**A party that fails to comply with (c) may not conduct discovery until the party's pleading is
> amended to comply.**

The entry as filed reads: "An original pleading stating a claim for relief must contain a statement that
the party seeks monetary relief within one of the rule's fixed brackets, together with a statement that
the party seeks all other relief to which the party is entitled."

1. **The "all other relief" demand is 47(d), not 47(b)–(c).** The entry's cite does not reach the half of
   the proposition it states second.
2. **47(b) is cited but not stated.** The jurisdictional-limits statement is missing from the proposition
   entirely.
3. **"(c)(5) only non-monetary relief" is not a monetary bracket**, so "monetary relief within one of the
   rule's fixed brackets" does not describe the picklist FE-14 has to encode. **The picklist is five
   options, one of which is monetary-relief-none.**
4. **The Family Code carve-out is omitted**, and so is the enforcement clause — **failure to comply with
   (c) bars discovery until the pleading is amended.** That clause is directly build-relevant beyond
   FE-14: it is a discovery gate keyed to a pleading defect.

**Both comments retrieved.** The 2013 comment ties (c)(1) to the Rule 169 expedited-actions process and
excepts suits governed by the Family Code, Property Code, Tax Code, or CPRC ch. 74; it also states that
(c)(2)–(5) "does not affect a party's substantive rights." The 2021 comment implements Gov't Code
§ 22.004(h-1) and confirms that a suit whose original petition contains the (c)(1) statement is governed
by the expedited-actions process in Rule 169. **The $250,000 figure in (c)(1) is the current text.**

---

## §6 — The criminal batch (workbook 28, 29, 32, 33, 34)

**Entry 28 — Penal Code § 31.07. Matches.** "(b) An offense under this section is a state jail felony."
Minor: § 31.07(a) reaches "another's **boat, airplane, or motor-propelled vehicle**"; the entry's
one-word "vehicle" follows the rule's own title but under-describes the covered property.

**Entry 29 — Health & Safety Code § 481.115(b). The threshold is unchanged; the entry is stale in two
other respects.** The workbook's one look said to check the threshold language because PG1 tiers were
amended in recent sessions. Text:

> **Sec. 481.115. OFFENSE: POSSESSION OF SUBSTANCE IN PENALTY GROUP 1 OR 1-B.**
> (b) An offense under Subsection (a) is a state jail felony if the amount of the controlled substance
> possessed is, **by aggregate weight, including adulterants or dilutants,** less than one gram.

- **The section now covers Penalty Group 1 OR 1-B.** The entry says Penalty Group 1 only. Amended by
  Acts 2021, 87th Leg., Ch. 584 (S.B. 768), §§ 6–7; further amended Acts 2023, 88th Leg., Ch. 910 (H.B. 6).
- **The entry omits "by aggregate weight, including adulterants or dilutants,"** which is the qualifier
  that decides most contested cases at the tier boundary. For a CR-10 degree-vs-punishment check, the
  omission is not cosmetic.
- The threshold itself — under/less than one gram — is unchanged.

**Entry 32 — CCP art. 102.073. Official text confirmed; one narrowing the entry does not carry.**

> (a) In a single criminal action in which a defendant is convicted of two or more offenses or of multiple
> counts of the same offense, the court may assess each court cost or fee only once against the defendant.
> (b) …each court cost or fee **the amount of which is determined according to the category of offense**
> must be assessed using the highest category of offense that is possible based on the defendant's
> convictions.
> (c) This article does not apply to a single criminal action alleging only the commission of two or more
> offenses punishable by fine only.

**The highest-category rule in (b) applies only to costs whose amount is category-dependent** — not to
every cost. The entry as filed applies it generally. **CR-10's cost check needs both gates, in order:
same-action-or-separate first (the 4a/4b split), then category-dependent-or-not.** Also note (a)'s
permissive "may assess… only once" reads as a cap rather than a command; the practical effect is the
same, but the entry's "may be assessed only once" mirrors it correctly.

**Entries 33 and 34 — the workbook's Q3 asks whether these state legal rules at all. The text says both
do.**

**Art. 42.0197** is titled **"FINDING REGARDING GANG-RELATED CONDUCT"** — not "affirmative
criminal-street-gang finding" — and carries a three-part operative test: *on the motion of the attorney
representing the state*, the judge **shall** make the finding and enter it in the judgment *if the judge
determines* the conduct was engaged in as part of the activities of a criminal street gang **as defined
by Penal Code § 71.01**. That is a rule with a trigger, a mandatory consequence, and an incorporated
definition — not an observation that an instrument exists.

**Art. 27.18** likewise: a plea or waiver may be taken by videoconference **only if all three** of
(a)(1) written consent of **the defendant and the attorney representing the state, filed with the court**,
(a)(2) simultaneous compressed full-motion video and interactive communication among judge, State,
defendant and defense counsel, and (a)(3) **on the defendant's request**, the ability for defendant and
counsel to communicate privately without being recorded or heard. **The entry's "with the written consent
of the parties" is one of three conjunctive conditions.** The article also carries the record requirement
(c), the (c-2) rule that loss of the record is not alone grounds to withdraw a plea, and the (d)–(g)
out-of-county provisions with their venue-consent waiver.

**On the post-2021 amendment the workbook asked about: there is none.** Art. 27.18's history ends at
Acts 2017, 85th Leg., Ch. 1064 (H.B. 3165), §§ 5–10. The CR corpus is not stale on this point — the same
chapter carries **Art. 27.20, added by Acts 2025, 89th Leg., Ch. 339 (S.B. 9)**.

**Entries 30 and 31 were NOT run** and are out of scope for a text pass — both are cite-less by
construction and their looks are case reads (*Mizell*, *LaPorte*, *Hurlburt*), not statute reads. Entry
30's candidate statutes **Penal Code §§ 12.34 / 12.35** were not retrieved this session. **Named as a
gap, not silently omitted.**

---

## §7 — Insurance Code sweep, chs. 541–542 — CANDIDATES ONLY

Michael ruled the sweep as its own scope item: survey and produce **candidates to rule on**, not
verifications. Nothing below is a registry entry. **No registry file carries a chapter 541 or 542 entry
(§2(c), as corrected at #78), so every row here would be a first for the UIM/bad-faith line.** One
Insurance Code entry does exist elsewhere in the registry family — **ENTRY 8 of
`legal-rule-registry-draft-entries-medical-billing.md`, on Ins. Code ch. 1467 balance billing, flagged
`[EXT]` and low priority.** Different subject — third-party provider billing, not first-party prompt
payment or unfair settlement practices — **but it bears on placement if these candidates are ruled in
(Q-STAT-5).**

**Three corrections to the working assumption recorded in the 2026-08-14 capture §3**, which described
the ch. 542 clocks as "15 days to acknowledge; 15 business days to accept or reject; 60 days' delay
triggering § 542.060 damages":

1. **The 60-day figure is a residual default, not the rule.** § 542.058(a) applies "for a period exceeding
   the period specified by **other applicable statutes** or, **if other statutes do not specify a period**,
   for more than 60 days." Any deadline engine that hard-codes 60 days is wrong wherever another statute
   specifies.
2. **A fourth clock was omitted: § 542.057 — payment within 5 business days** of the acceptance notice
   (20 business days for an eligible surplus lines insurer).
3. **§ 542.060 has two different damages measures.** 18% per year plus reasonable and necessary attorney's
   fees under (a) — **but in an action to which Chapter 542A applies**, (c) substitutes simple interest at
   the Finance Code § 304.003 rate **plus five percent**, accruing from the date the claim was required to
   be paid. Amended by Acts 2017, 85th Leg., Ch. 151 (H.B. 1774). **"18%" is not universally right.**

**Candidate rows — ch. 542, Subchapter B (prompt payment).** Each is a proposition Michael could rule
into the registry; none is drafted as final wording.

| Candidate | Section | Operative content (from the text) |
|---|---|---|
| C-1 | 542.051(2) | **"Claim" means a FIRST-PARTY claim** made by an insured, policyholder, or named beneficiary that must be paid by the insurer directly to the insured or beneficiary. **This is the definition that makes the subchapter reach UIM at all** — and the gate the UDJA line turns on. |
| C-2 | 542.055(a) | Within **15 days** (30 business days, eligible surplus lines) of receiving notice of a claim the insurer shall acknowledge receipt, commence any investigation, and request all items it reasonably believes will be required. |
| C-3 | 542.056(a),(d) | Accept or reject **in writing within 15 business days** of receiving all items required for final proof of loss; if unable, notify within that period of the reasons more time is needed and **decide within 45 days** of that notice. (30 days where arson is reasonably suspected, (b).) |
| C-4 | 542.056(c) | **A rejection must state the reasons for the rejection.** |
| C-5 | 542.057 | Pay within **5 business days** of the acceptance notice (20 business days, surplus lines); if payment is conditioned on the claimant's performance of an act, 5 business days after the act. |
| C-6 | 542.058(a) | Delay beyond the period specified by other applicable statutes, or **60 days** where none is specified, triggers § 542.060 damages. |
| C-7 | 542.060(a),(c) | **18% per year plus reasonable and necessary attorney's fees**; in a ch. 542A action, Finance Code § 304.003 rate **+ 5%**, accruing from the date the claim was due. Fees taxed as costs, (b). |
| C-8 | 542.061 | **Remedies are cumulative** — "in addition to any other remedy or procedure provided by law or at common law." |
| C-9 | 542.053 | Subchapter B does **not** apply to workers' comp, mortgage guaranty, title, fidelity/surety/guaranty bonds, marine insurance, or ch. 2602 guaranty associations; nor to HMOs except per § 1271.005(c); nor to claims governed by Subchapter C, ch. 1301. |
| C-10 | 542.059(b) | Claim-handling deadlines **extend 15 days** on a commissioner-defined weather-related catastrophe or major natural disaster. |

**Candidate rows — ch. 541 (unfair settlement practices and the private action).**

| Candidate | Section | Operative content |
|---|---|---|
| C-11 | 541.060(a)(2)(A) | Failing to attempt in good faith to effectuate a **prompt, fair, and equitable settlement** of a claim **"with respect to which the insurer's liability has become reasonably clear."** |
| C-12 | 541.060(a)(3) | Failing to promptly provide a policyholder a **reasonable explanation of the basis in the policy**, in relation to the facts or applicable law, for a denial or a compromise offer. |
| C-13 | 541.060(a)(7) | **Refusing to pay a claim without conducting a reasonable investigation.** |
| C-14 | 541.060(a)(5) | Refusing, failing, or unreasonably delaying a settlement offer under applicable **first-party coverage** on the basis that other coverage may be available or that third parties are responsible — except as specifically provided in the policy. **Squarely a UIM provision.** |
| C-15 | 541.060(a)(8) | For a **Texas personal automobile policy**, delaying or refusing settlement solely because other insurance of a different kind is available. |
| C-16 | 541.060(b) | **No third-party cause of action** under (a) against a liability insurer. A boundary, and it is the boundary that keeps this line first-party. |
| C-17 | 541.151 | Private action for actual damages caused by a Subchapter B practice, **or** by an act enumerated in DTPA § 17.46(b) where the plaintiff shows detrimental reliance. |
| C-18 | 541.152(a),(b) | Actual damages, court costs, reasonable and necessary attorney's fees; injunctive and other relief; **up to three times actual damages on a finding of a knowing violation** (not against TWIA, (c)). |
| C-19 | 541.154 | **Written pre-suit notice not later than the 61st day before filing**, stating the specific complaint and the amount of actual damages and expenses including fees; excused where limitations would expire or the claim is a counterclaim. **A hard deadline the calendar module would own.** |
| C-20 | 541.162 | **Two-year limitations** from the occurrence or from discovery by reasonable diligence, **extendable 180 days** where the defendant's conduct was solely calculated to induce delay. |

**Two of these are deadline-engine material, not just registry text: C-19's 61-day pre-suit notice and
C-20's two-year limitations with a 180-day extension.** Both are computable, both are jurisdiction-clean,
and both are the kind of date the case-heartbeat design exists to carry. **Nothing is built and nothing
is authorized — noted so the connection is not lost.**

**What this sweep deliberately did NOT do.** It did not reach ch. 542A (the forces-of-nature claims
statute that changes § 542.060's measure), ch. 1952 (the UM/UIM coverage requirement itself), or the
case-law layer — most obviously the rule that UIM benefits are not "due" until the insured's legal
entitlement and damages are determined, which is the reason the UDJA route exists at all and which is a
**case** proposition governed by the TOOLING ruling, not a statute read. **Named as scope, not as absence.**

---

## §8 — Open questions for Michael (full text, per QR-1)

**Q1 — Rule the statute-sourcing convention, or decline it.** Proposed on 2026-08-14 and still PROPOSED.
The rule would name: **Texas statutes** from the official bulk corpus in the Knowledge Repo, cited by code
and chapter with the corpus download date; **TRCP/TRE/TRAP** from the clean-authority PDFs in the same
repo; **CFR** from the eCFR API with the request date and `up_to_date_as_of` recorded per item; **each
source named per item**, exactly as the 2026-08-13 TOOLING ruling requires for case law. **If you rule it,
project-instructions trigger #3 fires and v18 is owed the same day.** This pass was run as if the rule
were already in force, so nothing here needs retrofitting either way.

**Q2 — The fourth registry file.** `legal-rule-registry-draft-entries-medical-billing.md` is headed "ALL
ENTRIES UNVERIFIED" and sits outside the backlog of 34, while BUILD-STATE says the registry is three
files. **Is that deliberate — draft entries not yet adopted into the registry proper — or a counting
gap?** If deliberate, the three-files line would be clearer as "three registry files plus a draft-entry
file, not counted in the backlog." If not, the backlog figure moves.

**Q3 — Annotate the 2026-08-14 capture, or leave it.** `claude_Authority_Corpus_and_eCFR_Method_2026-08-14.md`
§2 publishes a normalizer this session proved wrong (§3 above). It is a RAW CAPTURE in project knowledge,
and captures are reference-only records — **the append-only instinct says leave it as written; the
practical risk says a future session RAG-hits the capture, not this file, and silently corrupts a
quotation of primary law.** **Do you want the capture's §2 annotated as superseded, or left untouched
with this file carrying the correction?** Design sessions can write project knowledge, so either is
executable; the choice is yours because it trades a record convention against a live failure mode.

**Q4 — TRCP 193 comment 6 as a registry candidate.** The comment states that "the party seeking to avoid
discovery has the burden of proving the objection or privilege." Registry entries 14, 20 and 21 currently
rest that burden proposition on case law alone. **Do you want the comment entered as its own proposition,
or added as a second observation to the existing entries under the one-proposition-one-home rule?**
Raised because a rule comment is a different kind of authority from a case and the registry has no
precedent for one.

**Q5 — How far should the Insurance line go before anything is ruled?** §7 offers twenty candidates.
**Do you want them ruled in as registry entries now (which starts a fifth registry file, since none of
the four covers insurance), held as design input until the UIM/UDJA module is actually scoped, or
narrowed to the handful that CD-3 and CL-3 actually touch?** The two deadline candidates — C-19's 61-day
notice and C-20's limitations — are the ones with a build consequence independent of the registry.

**Q6 — The divergence findings and what happens to them.** §§4–6 flag divergences in **entries 1, 2, 4,
5, 6, 7, 8, 9, 11, 12, 13, 23, 26, 27, 29, 32, 33, 34** — eighteen of the twenty-one. Some are omissions
that narrow a proposition safely; **at least four change what the entry means** (5's reversed waiver limb,
6's non-existent third response, 11's "may" for "shall unless", 27's mis-attributed 47(d) half).
**Correcting the wording is your act, not mine.** Options put to Michael were (a) flags as they stand;
(b) replacement wording drafted for all eighteen; (c) the four material ones drafted, the rest left as
flags. Recommendation on the record was **(c)** — those four are the ones where a verifier reading only
the entry would verify something the rule does not say.

> **RULED 2026-08-14, Michael: (c).** Replacement wording drafted for the four material entries only;
> the other fourteen stay as flags, resolved in his hand at verification. **Drafted at §9 below.**
> **This is the only ruling made in this session.**

---

## §9 — PROPOSED replacement wording, four entries (ruled route (c), 2026-08-14)

**ADOPTED 2026-08-16 (#95): §9.1–9.4 were all adopted as proposed (entry 27 including the cite
move) and executed in the registry file by the same batch. This section is now the drafting record
of those adoptions, not a pending proposal.**

**Read this section as a draft handed to the verifier, not as a change.** Nothing here is in any registry
file. Each block gives the entry **as filed at HEAD**, then **PROPOSED** wording that tracks the operative
text. **Verification attaches to WORDING** — so if a proposed wording is adopted, what gets verified is
the NEW wording, and the entry's UNVERIFIED status does not carry over from the old one. Accept, reject,
or edit each independently; they are not a package.

**Two of the four also imply a CITE act, flagged separately** because supplying or moving a cite is its
own verification act: entry 27's cite must reach **47(d)**, and entry 11's proposed wording reaches the
denied-motion limb of 215.1(d) that the current entry does not.

---

### 9.1 — Entry 5 · Tex. R. Civ. P. 193.2(a), (b), (c), (e), (f), with cmt. 3

**AS FILED.** *Objections must state specifically the legal or factual basis and the extent to which the
party refuses to comply; a party must comply to the extent no objection is made; an objection must have a
good-faith factual and legal basis; an objection that obscures a responsive answer waives the objection;
and prophylactic privilege objections are not permitted.*

**PROPOSED.** *An objection to written discovery must be made in writing — in the response or in a
separate document — within the time for response, and must state specifically the legal or factual basis
for the objection and the extent to which the party is refusing to comply with the request (193.2(a)). A
party must comply with as much of the request as it has not objected to, unless it is unreasonable under
the circumstances to do so before obtaining a ruling on the objection (193.2(b)). A party may object only
if a good-faith factual and legal basis for the objection exists at the time the objection is made
(193.2(c)). An objection that is not made within the time required, or that is obscured by numerous
unfounded objections, is waived unless the court excuses the waiver for good cause shown (193.2(e)). A
party should not object on the ground that the request calls for privileged material, but should instead
comply with Rule 193.3; a party who does so object does not waive the privilege, but must comply with
Rule 193.3 when the error is pointed out (193.2(f)). The Rule 193.3 withholding statement should not be
made prophylactically, but only when specific information or materials have been withheld (cmt. 3).*

**What changed and why.** The waiver limb is **reversed** in the filed wording — the rule waives an
objection *obscured by* numerous unfounded objections, not an objection that *obscures a responsive
answer*. The untimeliness limb and the good-cause escape were absent. 193.2(b)'s "unless it is
unreasonable… before obtaining a ruling" qualifier was absent. "Not permitted" was hardened from the
rule's "should not," and the rule's non-waiver consequence was absent. "Prophylactically" was moved back
to the 193.3 withholding statement, which is where cmt. 3 puts it.

**Consequence if adopted.** The entry is relied on for the **BP** and **STO** categories and is named the
linchpin of DE-1. The reversal matters most there: a deficiency letter built on the filed wording asserts
a waiver theory the rule does not state. **The corrected limb is still useful against a boilerplate
response** — it is the thicket itself that waives the objections buried in it — but it is a different
argument and the letter template should say so.

---

### 9.2 — Entry 6 · Tex. R. Civ. P. 196.2(b)

**AS FILED.** *A response to a request for production must state, for each item or category, one of the
rule's permitted responses — that production will be permitted as requested; that the requested items are
being served with the response; **that production will be permitted except as specifically objected to**;
or that no items have been identified after a diligent search.*

**PROPOSED.** *With respect to each item or category of items, the responding party must state objections
and assert privileges as required by the rules, and state, as appropriate, that: production, inspection,
or other requested action will be permitted as requested; the requested items are being served on the
requesting party with the response; production, inspection, or other requested action will take place at
a specified time and place, if the responding party is objecting to the time and place of production; or
no items have been identified — after a diligent search — that are responsive to the request.*

**What changed and why.** The filed third option does not exist in the rule. The rule's third option is
narrow and specific: it governs **time and place** when the responder objects to time and place. Also
restored: 196.2(b) is not a pure pick-one — it requires objections and privilege assertions **in addition
to** one of the four statements.

**Consequence if adopted.** This is the "anti-dribbling" entry, and the correction sharpens it rather than
weakening it: **"production will be permitted except as specifically objected to" is not a permitted
response form**, which is the point the deficiency letter wants to make. The filed wording accidentally
legitimised the response it was written to attack.

---

### 9.3 — Entry 11 · Tex. R. Civ. P. 215.1(d)

**AS FILED.** *Expenses and attorney's fees may be awarded on a motion to compel.*

**PROPOSED.** *If a motion to compel is granted, the court shall, after opportunity for hearing, require
the party or deponent whose conduct necessitated the motion, or the party or attorney advising that
conduct, or both, to pay the moving party the reasonable expenses incurred in obtaining the order,
including attorney fees — unless the court finds that the opposition to the motion was substantially
justified or that other circumstances make an award of expenses unjust. If the motion is denied, the court
may, after opportunity for hearing, require the moving party or the attorney advising the motion to pay
the party or deponent who opposed it the reasonable expenses incurred in opposing it, including attorney
fees, on the same substantially-justified standard. An award under this subdivision is subject to review
on appeal from the final judgment.*

**What changed and why.** "May" became **"shall… unless."** On a granted motion, fee-shifting is the
default and the exceptions are the escape, not the other way round. The **reciprocal against a denied
movant** was absent entirely.

**Cite note.** The proposed wording stays inside 215.1(d) — no cite change. But it now reaches conduct by
**the party or the attorney advising it**, which the filed wording did not, and which is a different
person to name in a prayer.

**Consequence if adopted.** Runs in Michael's favour on the prayer, and **against** him on the risk side —
DE-2's escalation timeline currently prices no downside to a motion that fails. That asymmetry is the
practical reason this entry was worth correcting rather than flagging.

---

### 9.4 — Entry 27 · Tex. R. Civ. P. 47(b)–(c) → **proposed cite: 47(b), (c), (d)**

**AS FILED.** *An original pleading stating a claim for relief must contain a statement that the party
seeks monetary relief within one of the rule's fixed brackets, together with a statement that the party
seeks all other relief to which the party is entitled.*

**PROPOSED.** *An original pleading that sets forth a claim for relief must contain: a statement that the
damages sought are within the jurisdictional limits of the court (47(b)); except in suits governed by the
Family Code, a statement that the party seeks exactly one of five specified forms of relief — (1) only
monetary relief of $250,000 or less, excluding interest, statutory or punitive damages and penalties, and
attorney fees and costs; (2) monetary relief of $250,000 or less and non-monetary relief; (3) monetary
relief over $250,000 but not more than $1,000,000; (4) monetary relief over $1,000,000; or (5) only
non-monetary relief (47(c)); and a demand for judgment for all the other relief to which the party deems
itself entitled (47(d)). A party that fails to comply with 47(c) may not conduct discovery until its
pleading is amended to comply.*

**What changed and why.** Four things. The "all other relief" half is **47(d)**, not (b)–(c). **47(b) was
cited but never stated.** "Monetary relief within one of the rule's fixed brackets" does not describe a
five-option list whose fifth option is **only non-monetary relief**. The Family Code carve-out and the
**discovery bar** were both absent.

**Cite act flagged.** Adopting this wording moves the cite from **47(b)–(c)** to **47(b), (c), (d)**.
Supplying or moving a cite is a verification act; it is named here so it is not done silently.

**Consequence if adopted — this is the one with a build consequence.** Entry 27 **blocks FE-14**, whose
picklist cannot be encoded until the wording is verified. The proposed wording gives FE-14 its picklist
as five enumerable options rather than "fixed brackets," and it surfaces a second, separable requirement
the engine did not know about: **non-compliance with 47(c) bars discovery until amendment.** That is a
discovery gate keyed to a pleading defect, and it belongs to the deadline/heartbeat layer as much as to
the form engine. **Nothing is built and nothing is authorized — the connection is recorded, not acted on.**

---

## §10 — Verification of this document's own quotations

Every substantive quotation above was checked back against the **raw** `pdftotext -layout` output of its
source PDF — not against the normalized text this document was written from — by canonical-form substring
match (case, punctuation and whitespace stripped, with the characterized `A` artifact removed from the raw
side so the test does not depend on the normalizer being right). **78 quotations checked, 78 confirmed
present in the raw source** — 65 across §§4–7, and 13 more covering the source phrases the §9 proposed
wordings rest on. The test can produce a false miss and cannot produce a false pass, which is the
direction that matters. This is a transcription check, not a legal one — it establishes that the text
quoted is the text in the official file, and nothing further.

**One caveat on §9, stated because it is the section most likely to be relied on quickly.** The proposed
wordings are *restatements*, not quotations — they compress subsection text into registry house style, so
they are not word-for-word identical to the rule and are not marked as quotations. What was verified is
that every rule phrase they rest on exists in the source. **Whether the restatement is faithful is a
judgment, and that judgment is Michael's.**

---

## §11 — What this document does NOT do

It does not verify anything. **It does not alter any registry entry, status, wording, or cite** — §9
*proposes* wording for four entries and adopts none of it; the registry files are untouched at HEAD. It
does not authorize anything. It does not rank entries by legal importance. It does not touch `src/`, the
case-law layer, or the CourtListener integration design. **Every "matches" above means the retrieved
official text says what the proposition says — never that the proposition is legally current or correct.
Only Michael verifies.**

**One standing caution, sharper after §3 than before it.** The corpus is authoritative, complete, and
easy to quote — which makes it *more* tempting, not less, to treat a clean-looking retrieval as a
verification. Every quotation in this document was taken from normalized text whose substitution sites
are individually logged and whose residual-artifact count is zero, and the raw extraction is retained
alongside it for exactly that reason. **Spot-check any quotation against the raw PDF text before it goes
into a filing.**
