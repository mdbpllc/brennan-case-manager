# THE `#157` DORSANEO CORRECTIONS — the ruling sheet, PREPARED, NOT RULED

**Status:** RULING-class (`CAP-2`), the sheet Michael rules from. **Canonical repo path:** `docs/specs/dorsaneo-corrections-ruling-sheet-2026-09-18.md`. Prepared 2026-09-18 (Central, DT-1) by an Opus 5 design session in Cowork running CHAT-DISPATCH v6, Task 2. The device bridge was on the checkout at HEAD `4940ed3` (a live `git ls-remote` read that value at ~17:45 CDT) and on `Documents\Knowledge Repo`. **Nothing on this sheet is ruled. Nothing on it is verified.** No skeleton, registry file, memo, spec or register row was edited to make it. The five rows it serves are the five ⬜ rows under the register's heading *"DORSANEO ASSESSMENT PASS — the 2026-09-13 sitting (`#157`), filed 2026-09-16 …"*. Each block quotes its row's QUESTION PART; the full row text, runner notes included, is in the register.

> **READ THIS FIRST — THE SOURCE'S CURRENCY IS NOT ESTABLISHED.** Every operative-text quotation below comes from `Documents\Knowledge Repo\Civil\texas-rules-of-civil-procedure July 2026.pdf` (1,764,663 bytes; sha256 `5428d16df065d6c5bd8b746576ee74b27ec67b36dd09ed03738a3c7ed370d3d3`; 369 pages). It was extracted tonight with `pdftotext -enc UTF-8 -layout` inside the device VM's own `/tmp`, and every quotation was spot-checked against that raw extraction. Only line-wrapping whitespace was collapsed; the extraction contains no doubled-`A` artifacts (count 0), so the statute-pass normalizer was not used. **The PDF states no effective or currency date on its face.** Its file metadata carries a creation date of 2026-07-01. That is metadata, not a statement on the document, and under SOURCING *currency is never inferred from a document*. It carries two "2026" comment markers. **Establishing its currency is Michael's act** (BUILD-STATE YOUR HAND item 23). Until then, every sentence below that says what "the rule" says means *what this PDF's text says*.

**How to read each block.** Each block is **independent** (ROUTE-C: each row is put on its own, never as a package) and carries, in order:
- the row's question part, quoted (the full row is in the register);
- the operative text, quoted;
- the wording as it stands today, quoted;
- the proposed wording;
- a rendered BEFORE / AFTER;
- what adoption does to verification;
- every cite change, flagged as its own act;
- the options, which are a way of asking and not a menu (CC-1(a));
- one recommendation.

Your answer may be none of the options. **The recommendations are Claude's, PROPOSED.**

**What executing a ruling means here.** A ruling on this sheet is executed by a LATER packet, never by the sheet. **Execute first, then verify** (`#95`): an adopted rewording enters UNVERIFIED, and your verification attaches to the text as executed.

---

## BLOCK 1 — the deadline skeleton's 50-day rows

**The row, verbatim (question part):** *"`docs/specs/trcp-deadline-skeleton-2026-03-01.md` §5 states the 30/50 response structure for Rules 196.2, 197.2 and 198.2 without the Family-Code limitation, and its footnote — "(Same structure also appears at 194a for Family Code suits — out of scope here.)" — asserts the inverse of the rule text. … **Adopt, reject or edit: rewrite the three rows to carry the limitation in the rule's own words, add a fourth row for 196.7(c)(1), and strike and invert the footnote?**"* Its twin, `[DL-memo Q1]` (open since 2026-08-14), asks two things: whether you verify the Family-Code-only reading, and whether the three rows are edited. This row adds the fourth row (196.7(c)(1)) and the footnote's inversion. Two facts already on the record point the same way: the skeleton's own Scope line reads *"suits *not* governed by the Family Code"*, and the deadline memo's `P-1` (*"the 50-day exception is Family-Code-limited"*, UNVERIFIED) carries the note *"supersedes the `trcp-deadline-skeleton` §5 rows if adopted."*

**Operative text (this PDF):**
- **196.2(a):** "The responding party must serve a written response on the requesting party within 30 days after service of the request, except that a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due need not respond until 50 days after service of the request."
- **196.7(c)(1)** (entry on property): "The responding party must serve a written response on the requesting party within 30 days after service of the request, except that a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due need not respond until 50 days after service of the request."
- **197.2(a):** "…within 30 days after service of the interrogatories, except that a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due need not respond until 50 days after service of the request."
- **198.2(a):** the same clause as 196.2(a); and **198.2(c):** "If a response is not timely served, the request is considered admitted without the necessity of a court order."
- **194a.3(a)** (Rule 194a is titled *"REQUESTS FOR DISCLOSURE IN SUITS GOVERNED BY THE FAMILY CODE"*): "a defendant served with a request before the defendant’s answer is due is not required to respond until 50 days after service of the request". 194a.3(a) does not itself say "Family Code"; the rule's title and its 2023 comment do, and 194.1(a) excludes Family Code suits from Rule 194.
- **Rule 194's title:** "REQUIRED DISCLOSURES IN SUITS NOT GOVERNED BY THE FAMILY CODE". No 50-day branch appears anywhere in Rule 194. Across the whole PDF, "50 days" appears exactly five times: 194a.3(a), 196.2(a), 196.7(c)(1), 197.2(a) and 198.2(a).

**Today (skeleton §5, verbatim):**
```
| TRCP-196.2 | 196.2 | Requests for production: respond **within 30 days** after service; a defendant served before its answer is due need not respond until **50 days** after service |
| TRCP-197.2 | 197.2 | Interrogatories: same 30 / 50-day structure |
| TRCP-198.2 | 198.2 | Requests for admission: same 30 / 50-day structure |

*(Same structure also appears at 194a for Family Code suits — out of scope here.)*
```

**Proposed (`#157`'s disposition, rendered into rows):**
```
| TRCP-196.2 | 196.2(a) | Requests for production: respond **within 30 days** after service. Only "a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due" may respond at **50 days** after service |
| TRCP-196.7 | 196.7(c)(1) | Requests for entry on property: respond **within 30 days** after service. Only "a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due" may respond at **50 days** after service |
| TRCP-197.2 | 197.2(a) | Interrogatories: respond **within 30 days** after service. Only "a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due" may respond at **50 days** after service |
| TRCP-198.2 | 198.2(a) | Requests for admission: respond **within 30 days** after service. Only "a defendant in a suit governed by the Family Code served with a request before the defendant’s answer is due" may respond at **50 days** after service |

*(The 50-day branch is FAMILY-CODE-ONLY. Each of 196.2(a), 196.7(c)(1), 197.2(a) and 198.2(a) limits it to "a defendant in a suit governed by the Family Code"; Rule 194a.3(a) carries it for Family Code requests for disclosure. In a suit not governed by the Family Code the rule text gives 30 days, with no 50-day branch; 21a(c), Rule 4 and 191.1 still apply. Source: the July 2026 TRCP PDF, currency not established.)*
```

**BEFORE / AFTER, worked in a fictional PI case.** A defendant driver ("Driver D.", invented) is served with the citation on June 1 and with requests for admission on June 3, before his answer is due — assume the parties agreed, or the court ordered, early discovery; absent that, 192.2(a)(1) bars serving discovery on him until after his initial disclosures are due (see the note after this example).
- BEFORE, an engine built to the skeleton shows his RFA responses due **July 23** (50 days).
- AFTER, it shows them due **July 3** (30 days), and 198.2(c) deems the requests admitted if nothing is served by then.

The skeleton's error is twenty days wide, and this instrument is the one of the four whose rule deems the matter admitted if no response is timely served (198.2(c)). *(These are calendar days counted from service only. Rule 4's weekend roll and 21a(c)'s mail days are ignored to keep the example clean.)*

**A NOTE THE PREFLIGHT FOUND — for your eye, not a proposal; UNVERIFIED.** **192.2(a)(1)** (this PDF): "In a suit not governed by the Family Code, unless otherwise agreed to by the parties or ordered by the court, a party cannot serve discovery on another party until after the other party’s initial disclosures are due." **192.2(a)(2):** "In a suit governed by the Family Code, a party may serve discovery with the initial pleading." Read with 194.2(a)'s 30-days-after-the-first-answer timing, a PI or civil-lit defendant will often not be servable with written discovery before his answer is due, so the skeleton's 50-day error bites in a non-Family-Code case chiefly where early discovery was agreed or ordered, or where a defendant's own answer date runs past a disclosure date that a co-defendant's earlier answer set (194.2(a)'s first-answer anchor). How often that occurs is a practice fact, not a rule-text one. The row's *"Consequence if left"*, `[DL-memo Q1]`'s *"FLAT 30 DAYS"* and BUILD-STATE's headline share that unstated premise. **It does not change Block 1's proposal** — the rows should still say what the text says — but it narrows the practice consequence, and it is yours to verify.

**What adoption does to verification.** Nothing to any VERIFIED entry. The skeleton rows are unverified skeleton candidates (`[DL-memo Q1]`: *"No verified registry entry is contradicted … what conflicts is an UNVERIFIED skeleton candidate"*). **Adopting the edit is not verifying the reading.** `[DL-memo Q1]`'s first question, *"Do you verify that reading,"* is a separate act, and it stays open until you take it.

**Cite changes, each its own act:**
- (i) the three rows' cites narrow from `196.2` / `197.2` / `198.2` to `196.2(a)` / `197.2(a)` / `198.2(a)`;
- (ii) a NEW cite, `196.7(c)(1)`, enters the skeleton;
- (iii) the footnote's reference to 194a becomes a reference to `194a.3(a)`.

Each can be taken or left separately. Leaving (i) changes nothing of substance.

**Options:**
- **(A) Adopt as rendered.** All four rows and the inverted footnote; cite changes (i)–(iii) taken.
- **(B) Adopt the three rewrites and the inverted footnote, without the 196.7 row.** The skeleton stays silent on entry requests.
- **(C) Adopt with your edit.** Say what changes.
- **(D) Leave the skeleton alone.** `[DL-memo Q1]` carries the finding meanwhile.

*Recommendation: (A), and take `[DL-memo Q1]`'s verification question at the same sitting.* The rows then say what the text says, and the verification has text to attach to.

---

## BLOCK 2 — `P-2`'s disposition

**The row, verbatim (question part):** *"On the operative text, **21a(c) adds three days for MAIL ONLY**; 21a(b)(1) pairs mail with commercial delivery for *completion* but not for added days, and Rule 4 agrees. **Adopt, reject or edit: `P-2` stands as written, with a note naming the (b)/(c) distinction as the source of the doubt?**"* Its twin, `[DL-memo Q3]`, asks a different question: whether a TRCP 21a registry entry is opened at all, and at what scope.

**Operative text (this PDF):**
- **21a(c):** "Time for Action After Service. Whenever a party has the right or is required to do some act within a prescribed period after the service of a notice or other paper upon him and the notice or paper is served upon him by mail, three days shall be added to the prescribed period."
- **21a(b)(1):** "Service by mail or commercial delivery service shall be complete upon deposit of the document, postpaid and properly addressed, in the mail or with a commercial delivery service."
- **21a(b)(3):** "Electronic service is complete on transmission of the document to the serving party's electronic filing service provider."
- **Rule 4 (last sentence):** "…Saturdays, Sundays, and legal holidays shall be counted for purpose of the three-day periods in Rules 21 and 21a, extending other periods by three days when service is made by mail."
- **21a(a)(2)** (permitted methods for a document not filed electronically) also names "by mail, by commercial delivery service" together.
- **21a(e) (not in the row; carried so it is not missed):** "…Nothing herein shall preclude any party from offering proof that the document was not received, or, if service was by mail, that the document was not received within three days from the date that it was deposited in the mail, and upon so finding, the court may extend the time for taking the action required of such party or grant such other relief as it deems just."

**Today — `P-2` as it stands** (`docs/specs/deadline-engine-service-and-response-2026-08-14.md`, the heading *"P-2 — added days attach to the method used on the individual party, and only to mail."*; its Source and Note lines are omitted here):
> *Proposition:* Where a party must act within a prescribed period after service and the paper was served on that party **by mail**, three days are added to that party's period. No other service method carries added days; electronic service carries none.
> *Cite:* Tex. R. Civ. P. 21a(c); Tex. R. Civ. P. 4. *Status:* **UNVERIFIED.**

The doubt lives in `docs/specs/deadline-engine-spec.md` §8.2: *"TRCP 21a(c) has long read that the three days are added where the paper is served "by mail or by commercial delivery service." If the July 2026 text still carries the commercial-delivery limb, `P-2`'s "only to mail" is wrong …"*

**Proposed — `P-2`'s wording UNCHANGED, and a dated note added beneath it:**
> *Note (2026-09-18, on the July 2026 PDF's text, currency not established):* in this PDF, the only Rule 21a text that pairs mail with commercial delivery is **21a(a)(2)** (permitted methods) and **21a(b)(1)** (service is **complete** "upon deposit"). **21a(c)**, the added-days rule, names **mail only**, and Rule 4's last sentence likewise names only mail. Subsections (b) and (c) do different work. `#157` reads the (b)/(c) pairing as the likely source of the doubt the spec records at §8.2; whether §8.2's *"has long read"* reflects an earlier version of 21a(c) is not established by this PDF. 21a(e) separately lets a party prove that a document was not received at all (any method), or that a mailed document was not received within three days of deposit; on that finding the court may extend time or grant other relief. That is relief on a showing, not added days.

**BEFORE / AFTER.**
- BEFORE: the spec's §8.2 carries `P-2` as *"UNVERIFIED — AND FLAGGED AS THE HIGHEST-VALUE VERIFICATION TARGET IN THIS SECTION."* BUILD-STATE's DEADLINE ENGINE bullet carries it as *"`P-2`'s "only to mail" stands IN DOUBT in the spec — and `#157` read 21a(c) as MAIL ONLY, the doubt arising from 21a(b)(1)'s completion rule; UNVERIFIED …"*
- AFTER: `P-2` reads exactly as it does today, now with the note, and the spec's §8.2 gains one add-only line: *"Read on the July 2026 PDF's text (currency not established; BUILD-STATE YOUR HAND item 23): 21a(c) names mail only. `P-2` stands UNVERIFIED."* BUILD-STATE's *"stands IN DOUBT in the spec"* clause would then be stale, for the runner's refresh to catch.

On 21a(c)'s text, for a fictional co-defendant served by commercial delivery on a Monday, the deadline counts from the Monday with **no** three days added. Served by mail the same Monday, three days are added.

**What adoption does to verification.** Nothing. `P-2` is UNVERIFIED and in no registry file; it stays UNVERIFIED. The note is a record, not a verification.

**Cite changes, as their own act:** none proposed. *(Optional, for your eye: adding `21a(b)(1)` and `21a(e)` to the note's cites is available. Taking it is a separate act.)*

**Edits to other files, each its own act:** (i) the add-only line beneath the spec's §8.2 paragraph; (ii) no edit to BUILD-STATE: the sentence the row quotes was superseded at batch 98, and the current clause's staleness is for the runner's refresh; (iii) nothing to `[DL-memo Q3]`, whose question about opening a 21a entry stays open.

**Options:**
- **(A) `P-2` stands, with the note, and the add-only line under the spec's §8.2** (`#157`'s proposal, completed).
- **(B) `P-2` stands. No note.**
- **(C) Reword `P-2` to quote 21a(c) verbatim.** This follows the drafting direction you gave at `#108` for registry Rule lines (`P-2` is not yet a registry entry; its Source line already quotes 21a(c)'s operative clause verbatim — "and the notice or paper is served upon him by mail, three days shall be added to the prescribed period" — not the whole subsection).
- **(D) Your composite.**

*Recommendation: (A).* It records why the doubt arose so the next reader does not re-raise it, and it changes no proposition.

---

## BLOCK 3 — ROUTE-C wording for the VERIFIED TRCP 190.3(b)(3) entry

**The row, verbatim (question part):** *"The entry in `legal-rule-registry-discovery-and-carrier-duties.md` reads "Level 2 discovery limits **each party to 25 interrogatories**", **VERIFIED — Michael Brennan, 2026-08-11**. The rule reads "Any party may serve on **any other party** no more than 25 written interrogatories." Proposed conforming wording: … **Adopting DETACHES the entry's verification** … This closes `Q-FE5-9`."*

**Operative text (this PDF), 190.3(b)(3):** "Interrogatories. Any party may serve on any other party no more than 25 written interrogatories, excluding interrogatories asking a party only to identify or authenticate specific documents. Each discrete subpart of an interrogatory is considered a separate interrogatory."

**Today (the entry's Rule line and Status, verbatim):**
> **Rule.** Level 2 discovery limits each party to 25 interrogatories; discrete subparts count as separate interrogatories; interrogatories asking a party only to identify or authenticate specific documents do not count against the limit.
> **Status:** VERIFIED — Michael Brennan, 2026-08-11.

**Two candidate wordings. The first is `#157`'s; the second is offered because of your own standing direction.** At `#108` you directed that registry Rule lines *"quote operative text VERBATIM where practicable."* This rule is two sentences long.

- **(i) `#157`'s wording:** *"At Level 2, any party may serve on any other party no more than 25 written interrogatories — a pairwise limit, not a case-wide budget; discrete subparts count as separate interrogatories; interrogatories asking a party only to identify or authenticate specific documents do not count against the limit."*
- **(ii) Verbatim:** *"At Level 2 (Rule 190.3(b)(3)): "Any party may serve on any other party no more than 25 written interrogatories, excluding interrogatories asking a party only to identify or authenticate specific documents. Each discrete subpart of an interrogatory is considered a separate interrogatory.""* The reading *"a pairwise limit, not a case-wide budget"* would then move to a separate **Note** line. It would not sit in the Rule line.

**BEFORE / AFTER, worked in a fictional trucking case.** A plaintiff sues a driver, the carrier, the broker, the shipper and the trailer lessor (five defendants, all invented).
- BEFORE, an engine built to *"each party … 25"* lets the plaintiff serve **25 interrogatories in total** and refuses the 26th.
- AFTER, under either wording, it lets the plaintiff serve up to **25 on each defendant**, 125 across the five.

The cap is still enforced pair by pair, so a 26th to the carrier is refused absent an agreement or order changing the limit (191.1; 190.4).

**What adoption does to verification. Adoption DETACHES your 2026-08-11 verification**, because verification attaches to wording (`#95`). The entry returns to UNVERIFIED until you verify the new text as executed. `FE-5`, whose row says *"counts may display as facts,"* would then rest on an unverified entry until you verify it.

**Cite changes:** none. The cite stays *Tex. R. Civ. P. 190.3(b)(3)*. The *"Load-bearing for: FE-5"* line is unchanged.

**Effect on other rows:** `#157`'s row says adoption *"closes `Q-FE5-9`."* `Q-FE5-9` also asks a second question: *"should FE-5 be built against the entry as verified, or against the rule text, if the two are not reconciled before the engine is authorized?"* Adoption, executed before the engine is authorized, answers that question by reconciling them. Closing `Q-FE5-9` is still a runner act on your word, not automatic.

**Out of scope, and said so it is not missed:** the Level 1 caps (190.2(b)(3)–(5): 15 interrogatories, 15 requests for production and 15 requests for admission, each "on any other party") are absent from the registry. `docs/specs/fe-5-interrogatory-budget-spec-2026-08-15.md` already carries them as P-1–P-3. This sheet proposes nothing about them.

**Options:**
- **(A) Adopt `#157`'s wording (i).**
- **(B) Adopt the verbatim wording (ii), with the pairwise reading as a Note.**
- **(C) Adopt with your edit.**
- **(D) Leave the entry as verified.** `Q-FE5-9` stays open, and `FE-5` stays unbuildable against it without a ruling on which to follow.

*Recommendation: (B).* It follows your `#108` direction, keeps interpretation out of the Rule line, and changes the budget the engine computes in the way the text reads (any party, on any other party, no more than 25). *(The `#108` direction, as BUILD-STATE carries it, is "a ruled DIRECTION, not a binding convention", and applying it to an existing entry is "a per-entry ROUTE-C act" — this block is that act, put to you.)*

---

## BLOCK 4 — the VERIFIED Rule 194 entry's missing timing, put as THREE separate acts

**The row, verbatim (question part):** *"**(a) Does the entry gain 194.2(a)'s timing (detaching verification)? (b) Is the content list reconciled to twelve, or does the timing become its own entry under one-proposition-one-home — his shape call? (c) Is the four-rule chain drafted as a deadline-engine specification rather than a registry entry?** Two ambiguities travel with it and are surfaced, not encoded: whether Rule 4's roll-forward reaches a BACKWARD-counted deadline, and whether "furnish"/"disclose" require actual receipt rather than service."*

The row's runner note names six other open rows it bears on, and no ruling here closes any of them:
- §3's `TRCP 194.2(a)` anchor row (*"Is the trigger 30 days after the first answer or appearance, exactly as the skeleton states?"*);
- §3's `TRCP 190.3(b)(1)` and `TRCP 195.2(a) and (b)` rows (the chain's 190.3 and 195.2 links);
- residual V2 (staggered answers);
- `[DL-memo Q2]`;
- `[DL-memo Q4]`.

**Operative text (this PDF):**
- **194.2(a):** "Time for Initial Disclosures. A party must make the initial disclosures within 30 days after the filing of the first answer or general appearance unless a different time is set by the parties’ agreement or court order. A party that is first served or otherwise joined after the filing of the first answer or general appearance must make the initial disclosures within 30 days after being served or joined, unless a different time is set by the parties’ agreement or court order."
- **194.2(b)** enumerates **twelve** items *(summarized here, not quoted — any drafting works from the rule text)*:
  - (1) the correct names of the parties;
  - (2) potential parties;
  - (3) legal theories and factual bases;
  - (4) the amount and any method of calculating economic damages;
  - (5) persons having knowledge of relevant facts, with a brief statement of each person's connection;
  - (6) documents, ESI and tangible things the party may use;
  - (7) indemnity and insuring agreements;
  - (8) settlement agreements;
  - (9) witness statements;
  - (10) in a physical or mental injury suit, medical records and bills, or an authorization;
  - (11) in such a suit, medical records and bills obtained by authorization;
  - (12) any person who may be designated as a responsible third party.
- **194.1(a)** states its exceptions separately: *"Except in a suit governed by the Family Code, as exempted by Rule 194.2(c), or as otherwise agreed by the parties or ordered by the court…"* 194.2(c)'s text does not mention the Family Code: it exempts five kinds of proceeding from initial disclosure (administrative-record review, state forfeiture, habeas corpus, an action involving domestic violence, justice-court appeals), and a court may still order particular disclosures. The entry's second observation reads *"except in Family Code suits, as exempted by Rule 194.2(c), or as otherwise agreed or ordered"* — it tracks the rule's order and no divergence is claimed, but it is noted so no one reads it as *"Family Code suits, as exempted by 194.2(c)."*

**Today (the entry, verbatim, Rule line and status):**
> **Rule.** Initial disclosures are required without awaiting a discovery request. Required content includes: correct names of the parties; name, address, and phone of persons with knowledge of relevant facts, and of potential parties; the identity of persons who may be designated as responsible third parties; insuring agreements under which an insurer may be liable for part or all of a judgment; and identification/production of the documents the disclosing party may use to support its claims or defenses.
> **Status:** VERIFIED — Michael, 2026-08-12.

Its wording note calls that text *"the four-category working list."* The Rule line names six of 194.2(b)'s twelve items in five clauses, at least three of them only partly ((5) omits the brief statement of each person's connection with the case; (6) omits ESI, tangible things and the impeachment carve-out; (7) omits indemnity agreements), and it states (12) as "identity" rather than name, address and telephone number. It says *"includes,"* so it does not claim to be the whole list. (The register row counts *"five content categories"*; its runner note records that the exact phrase *"the four-category working list"* appears once, not twice — *"four-category wording"* once more.) Two more facts on the entry bear on 4(a) and 4(b): its **Scope** line (ruled `#108`) makes it *"the WHOLE of Rule 194"*, and the file's header rule is that *"an expanded restatement is an observation, never an extension of verified status."*

### 4(a) — does the entry gain 194.2(a)'s timing?

**Proposed addition to the Rule line (rendered AFTER):**
> …to support its claims or defenses. **Timing (194.2(a)):** "A party must make the initial disclosures within 30 days after the filing of the first answer or general appearance unless a different time is set by the parties’ agreement or court order. A party that is first served or otherwise joined after the filing of the first answer or general appearance must make the initial disclosures within 30 days after being served or joined, unless a different time is set by the parties’ agreement or court order."

**Verification:** this DETACHES your 2026-08-12 verification of the whole entry.

**Options:**
- **(A) Add it to this entry.**
- **(B) Do not add it to the Rule line. Carry it by 4(b)'s shape 2 or shape 3 instead.**
- **(C) Neither, for now.**

*Recommendation: (B) — not in the Rule line;* carry the timing by shape 3 under 4(b), which detaches nothing.

### 4(b) — the shape: reconcile to twelve, or split the timing out

- **Shape 1: one entry, reconciled.** The Rule line lists all twelve 194.2(b) items and carries 194.2(a)'s timing. One home; your verification detaches from the whole.
- **Shape 2: two entries.** The existing entry keeps its wording and its verification. A NEW entry, *"TRCP 194.2(a) — time for initial disclosures,"* carries the timing verbatim and enters UNVERIFIED. The content list's reconciliation to twelve is then its own later act, which would detach verification only when taken. **That is one-proposition-one-home read as "timing is a different proposition from content."** The catch: the existing entry's scope is ruled to be *"the WHOLE of Rule 194"* (`#108`), so a separate 194.2(a) entry sits inside that verified scope. `#108` already did this twice: 194.2(b)(9) and 194.5 were inserted as their own entries in that same sitting (`WS-2`; VERIFIED `#110`), so shape 2 has direct precedent. Choosing it still means ruling that 194.2(a) takes that treatment.
- **Shape 3: a second observation on the existing entry.** The `#108` precedent (Q-WS2-1(b) carried 194.1(a) this way) adds 194.2(a)'s text as a labelled second observation. By the file's own header rule an observation is *"never an extension of verified status"*, so the entry's verification stays attached to its Rule line and the timing observation is itself unverified until you verify it.

**Rendered, shape 2's new entry:**
```
## TRCP 194.2(a) — time for initial disclosures
**Cite:** Tex. R. Civ. P. 194.2(a).
**Rule.** "A party must make the initial disclosures within 30 days after the filing of the first answer or general appearance unless a different time is set by the parties’ agreement or court order. A party that is first served or otherwise joined after the filing of the first answer or general appearance must make the initial disclosures within 30 days after being served or joined, unless a different time is set by the parties’ agreement or court order."
**Status:** UNVERIFIED.
**Load-bearing for:** the discovery-period anchor in 190.2(b)(1)(A) and 190.3(b)(1)(A); through them, 195.2 where the period ends on the disclosure-anchored limb.
```

**Which file shape 2's entry lives in is itself a placement act, with two candidates.** Beside the Rule 194 entry in `legal-rule-registry-discovery-and-carrier-duties.md`, whose header reads *"ALL TWENTY PROPOSITIONS VERIFIED"* — it would be that file's first unverified entry and would change the header claim; or in `legal-rule-registry-discovery-enforcement-and-pleading.md`, where the record has routed unverified discovery propositions to protect that header (Rule 194.5 lives there as its own entry, cross-referenced). Flagged, not chosen.

*Recommendation: shape 3 now, shape 2 later if you want a standalone timing entry.* Shape 3 adds the load-bearing timing on the precedent `#108` already used for 194.1(a), detaches nothing, and needs no scope or placement ruling. Reconciling the content list to twelve stays a separate, lower-stakes act.

### 4(c) — is the chain a deadline-engine specification, not a registry entry?

**The chain (this PDF's text), rendered — absent agreement or order, in a suit not governed by the Family Code, at Levels 1–2 (a Level 3 plan under 190.4(b) sets its own period and designation deadlines):** first answer or general appearance → **+30 days** = first initial disclosures due (194.2(a)).
- **Level 2:** the discovery period *"begins when the first initial disclosures are due and continues until the earlier of: (i) 30 days before the date set for trial; or (ii) nine months after the first initial disclosures are due"* (190.3(b)(1)(A)).
- **Level 1:** *"begins when the first initial disclosures are due and continues for 180 days"* (190.2(b)(1)(A)).
- **Expert designation:** experts for a party seeking affirmative relief are due *"90 days before the end of the discovery period"*; all others *"60 days before"* (195.2).

**A fictional Level 2 case with no trial date set (assuming the defendant seeks no affirmative relief):** first answer filed 2027-02-01 → disclosures due 2027-03-03 → period ends 2027-12-03 (nine months) → the plaintiff's experts are due 2027-09-04 and the defendant's 2027-10-04. That is plain calendar arithmetic, before any Rule 4 question — and 2027-09-04 is a Saturday, with Labor Day the following Monday, which is exactly where the backward-count ambiguity below bites.

**Proposed:** the chain is drafted as a deadline-engine specification that composes four propositions, not as a proposition of its own. None of the four is a registry entry today; they exist, in part, as skeleton candidates and in the deadline memo (`P-4`–`P-6`), all UNVERIFIED. `docs/specs/deadline-engine-spec.md` already exists and authorizes nothing. **Drafting is a later act, and nothing is authorized by this sheet.**

**Options:**
- **(A) Yes: the chain is a spec composition.**
- **(B) It becomes a registry entry of its own.**
- **(C) Hold until the deadline engine is next taken up.**

*Recommendation: (A),* with (C)'s timing. Rule it now so the chain's home is settled, and draft it when the engine is next in the queue.

**The two ambiguities: surfaced, not encoded, not answered.**
- **Rule 4 and backward counts.** Rule 4 applies to *"any period of time prescribed or allowed by these rules"*; its first sentence excludes *"the day of the act, event, or default after which the designated period of time begins to run"*, and its roll sentence (*"the period runs until the end of the next day which is not a Saturday, Sunday, or legal holiday"*) does not distinguish forward from backward counts. Whether the roll reaches a deadline counted **backward** from a later date (every 195.2 date is) is not stated in the text. `#157` records that the Guide cites authority on this question. This sheet did not open the Guide; the authority is not named here, and its holding and direction are not stated. It is a **locator** only.
- **Receipt versus service.** 195.2 defines designating as *"furnish information described in Rule 195.5(a)"*; 194.3 says *"disclose"*; 194.1(a) and 195.5(a) say *"provide."* Bearing text, not dispositive: 191.5 requires every disclosure *"required to be served on a party or person"* to be *"served on all parties of record"*; the 2021 comment to Rule 194 says required disclosures must be *"served under rule 191.5"*; and 21a(b) sets when service is complete. Whether meeting a 195.2 date requires receipt or only service is not stated in terms. It is surfaced for you, not decided.

---

## BLOCK 5 — does the Guide become a named SOURCING channel?

**The row, verbatim:** *"**Dorsaneo — does the Guide become a named SOURCING channel?** Claude's own read, stated in the deliverable: **it should NOT.** SOURCING's channels are for primary law; a treatise is a LOCATOR (the `WS-3` status), and the cleaner treatment is a standing note that treatise reads are cited per item and never entered as propositions. **This is a convention question and would fire trigger 3.**"*

**Both readings, put fairly.**
- **Not a channel (`#157`'s read).** SOURCING's six channels are all law-bearing official sources: statutes, court rules, regulations, conduct rules, county plans and the U.S. Code. The registry discipline already classes a vendor AI assistant's answers as *"LOCATORS for primary sources, never authority and never verification"* (applied at `WS-3`). A treatise is the same kind of thing. `#157` records that the Guide surfaced the question in each of the four items above; three were already on the record before that pass (`[DL-memo Q1]`, 2026-08-14; `Q-FE5-9`, 2026-08-15; the spec's §8.2 `P-2` doubt), and on Block 1 the Guide's own checklist carries the error. Each block rests on the rule text quoted, not on the Guide. And `#157` records that the Guide's `CL-1.05.3(1)` checklist states the 30/50 structure generally, which the Guide's own narrative corrects (not re-read tonight). That is the argument for keeping treatises out of the authority chain.
- **A channel.** The Guide is licensed, it sits on your machine in a known folder, and it will be read repeatedly. Naming it would let each read be cited uniformly. Against that: the `#157` pass's own constraint is that the Guide never enters the repo or project knowledge (the same licensed class as the probate corpus's licensed part, which CORPUS-HOME homed in the ARCHIVE project and which can never enter the repo), so a channel could only ever carry per-item cites, never text. And a channel named "for secondary sources" invites exactly the treatise-as-authority slide the registry rule exists to stop.

**What each answer does to the instructions.**
- *Not a channel, with nothing written* → no convention changes; trigger 3 does not fire.
- *Not a channel, with a standing locator note written into SOURCING* → trigger 3 fires, and the next instructions revision carries the note.
- *A channel* → trigger 3 fires, and SOURCING gains a seventh entry.

**Options:**
- **(A) Not a channel; write nothing.**
- **(B) Not a channel; add a standing note to SOURCING:** *"Treatises and practice guides (the Texas Litigation Guide among them) are LOCATORS: a treatise read is cited per item and points to primary law; it never enters the registry as a proposition and is never verification."* This fires trigger 3.
- **(C) A seventh named channel for licensed treatises**, per-item cites only, no text ever carried. This fires trigger 3.
- **(D) Your composite.**

*Recommendation: (B).* It writes down the status the record already gives treatises, so the question does not come back.

---

## What this sheet did NOT do

It edited no file: not the skeleton, no registry file, not the memo or the spec, and no register row. It verified nothing. It characterized no case. It did not open or quote the Guide: no treatise text appears here; the Guide's `CL-` checklist is named by its identifier with a one-line locator note carried from `#157`, and the authority the Guide cites on Rule 4 is neither named nor characterized. It minted no ID. It holds no client data; every name and date in the examples is invented.

*Prepared 2026-09-18 (Central). The PF-1 preflight report on this sheet travels in the same packet, as EVIDENCE at `docs/record/dorsaneo-corrections-ruling-sheet-2026-09-18/`.*
