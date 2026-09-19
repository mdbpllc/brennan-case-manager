# Firm-obligations registry — ENTRY DRAFTS, tranche 1 (DECISION 8's first act)

**Status: DRAFT ENTRY TEXTS. NOT INSERTED. NOTHING HERE IS A REGISTRY ENTRY.** EVIDENCE (`CAP-2`), canonical path `docs/record/fo-registry-entry-drafts-2026-09-18/fo-registry-entry-drafts-tranche-1-2026-09-18.md`. Drafted 2026-09-18 (Central, DT-1) by an Opus 5 design session in Cowork (CHAT-DISPATCH v6, Task 4). The device bridge was on the checkout at `4940ed3` and on `Documents\Knowledge Repo`. **This file creates no registry file.** It does not create `docs/specs/legal-rule-registry-firm-obligations.md` and moves no `**Status:**` line anywhere. **Every draft is UNVERIFIED; only Michael verifies.** Retrieval is not verification.

## §0 — The authorization, and what this tranche is

- **DECISION 8** (`#155`; `docs/specs/firm-obligations-rulings-2026-09-10.md`, its row verbatim): *"A FIFTH registry file `docs/specs/legal-rule-registry-firm-obligations.md`, drafts by a LATER Opus act on the `FC-13` precedent, PF-1 running on that packet; every entry UNVERIFIED until he verifies; the module's `sourceNote` points at the entry; `Q-STAT-5`'s practice-side pass folds in; the `FOM-12` roll defaults are entries in the same file."* BUILD-STATE YOUR HAND (13) names *"the DECISION 8 drafting act, an Opus design session."* **This is that act's FIRST TRANCHE.** Two limbs of DECISION 8 are **deferred by this tranche, and it says so rather than drop them:** the `FOM-12` roll-default entries (§5 — their governing text is unresolved) and `Q-STAT-5`'s practice-side fold-in (not attempted tonight). The `sourceNote` pointers follow insertion, which is `FRD-Q1`.
- **Scope tonight.** The **twelve intended go-live activations** (DECISION 9B): `FOT-1`, `FOT-2`, `FOT-4`, `FOT-6`, `FOT-8`, `FOT-9`, `FOT-19`, `FOT-22`, `FOT-23`, `FOT-24`, `FOT-25`, `FOT-27`. Each row is taken **only where its named source was reachable tonight** under SOURCING. Everything else goes to the gap table (§4) or the no-entry list (§6).
- **The standing drafting direction** (`#108`, as BUILD-STATE carries it): *"registry Rule lines quote operative text VERBATIM where practicable,"* condensing only where the rule is too long or the entry states one limb. **Every quotation in a `Rule` line below is verbatim**; a Rule line's label, and any sentence outside quotation marks, is Claude's and is marked as such.

## §1 — RECONCILE FIRST

**Checked at `4940ed3`, by the commands named:**
- **The fifth file does NOT exist** (`ls docs/specs/legal-rule-registry-firm-obligations.md` → no such file). **No firm-obligations entry-drafts file exists** (`ls docs/specs | grep entry-drafts` lists only `fc13-…`, `g10-4-ch521-…`, `hipaa-deidentification-…` and `registry-new-…`).
- **No proposition below exists anywhere in the registry or its draft files.** `grep -l` found no hits for `81.054`, `81.113`, `26.04(j)`, `79.036`, `171.20`, `171.2515`, `311.014`, `TDRPC 1.15` or `Rule 1.15` across `docs/specs/legal-rule-registry-*.md` and `docs/specs/*entry-drafts*.md`.
- **The one practice-of-law draft on the record** is FC-13's `TDRPC 1.04(f)` text (DRAFT 6) in `fc13-entry-drafts-2026-08-18.md`, its destination put at `FC13-Q-5`. It is untouched here. **`FC13-Q-5`'s premise** ("naming a home decides part of the cases-vs-practice boundary you expressly left undecided") **is overtaken by DECISION 8** — noted for the register's next overtaken-row pass, not acted on. The `g10-4-ch521-…` and `hipaa-deidentification-…` drafts carry open "into which file" questions that DECISION 8's "practice-administration" scope may reach; also noted, not acted on.
- **Two open register rows bear on FRD-4 and are named, not answered:** `Q-QBO-6` (*"Should Texas client-property and trust-accounting authority enter the registry, and where?"*), whose 2026-09-09 annotation lists *"TDRPC 1.14 and TRDP 17.10 (trust records)"* as candidates, and `Q-RE-8`. **A NUMBERING CONFLICT, surfaced for Michael and not resolved:** in the TDRPC PDF effective March 7, 2025, the table of contents lists **1.14 as "Conflicts: Public Interest Activities"** and **1.15 as "Safekeeping Property"**; the register's candidate *"TDRPC 1.14"* (annotated *"TDRPC 1.14 and TRDP 17.10 (trust records)"*) may, on this PDF's numbering, mean 1.15 — surfaced, not resolved. DECISION 8 names the file those rows ask about; whether it closes them is his.

## §2 — The sources, named per item (SOURCING)

**Texas statutes.** Source: the official bulk corpus, `Documents\Knowledge Repo\Statutes 26-08-14\`, downloaded 2026-08-14 by Michael's hand. The chapters were unzipped into the device VM's own `/tmp` and never into a mounted path:
- `GV.pdf.zip` → `gv.81.pdf` (sha256 `f2466e25…`), `gv.79.pdf` (`d230a90b…`), `gv.311.pdf` (`9a2a3286…`);
- `CR.pdf.zip` → `cr.26.pdf` (`90955704…`);
- `TX.pdf.zip` → `tx.171.pdf` (`b6f1f4c4…`).

**How the text was extracted and normalized.**
- Extraction: `pdftotext -enc UTF-8 -layout`.
- Normalization: the §3 normalizer of `statute-pass-registry-retrieval-2026-08-14.md`, its seven patterns and its apostrophe-spacing rule exactly as published there, **transforming only characterized contexts and REPORTING the rest** (substitution counts below exclude the apostrophe rule):

  | Chapter | Substitutions | Residual glued `AA` |
  |---|---|---|
  | gv.81 | 760 | 0 |
  | gv.79 | 269 | 0 |
  | gv.311 | 138 | 0 |
  | cr.26 | 295 | 0 |
  | tx.171 | 1,367 | **6** |

- The six tx.171 residuals (in §§ 171.071, 171.1011 ×2, 171.1012, 171.1013 and 171.109) are the TWO contexts `#152` characterized and `Q-STAT-7` has not yet adopted: five semicolon sites, and § 171.071's five-`A` run (`SOCIETY.AAAAAcooperative`, which the period rule leaves as `SOCIETY. AAAcooperative`). **Not one sits inside a section quoted below** (per-section residual count 0 for §§ 171.002, 171.006, 171.202, 171.2022, 171.203, 171.204 and 171.2515). **Every quotation below was spot-checked against the raw extraction.**

**Currency.** The record states the Texas corpus as current through **the 89th Legislature, 2nd Called Session (2025)** — the site banner's statement as recorded (`docs/spec-feedback.md`, section "2026-07-25 — Statute-tracking design §2 source facts: the .gov site is now a client-side app"; `statute-pass-registry-retrieval-2026-08-14.md` §1, *"Per Michael … taken from the site"*), and as the project instructions carry it. It was not re-read tonight. Presence of recent material is corroboration only. For example, § 81.113's history includes *"Acts 2025, 89th Leg., 2nd C.S., Ch. 7 (H.B. 16), Sec. 15.05(a), eff. December 4, 2025."*

**Texas conduct rules (the fourth channel).** `Documents\Knowledge Repo\texas-disciplinary-rules-of-professional-conduct-pdf.pdf` (sha256 `4fb5ce0c…`, 118 pp.). Its cover reads *"(Effective March 7, 2025)"*, cited as that document's own effective date. Doubled-`A` count 0, so no normalizer was used. **`#157`'s precondition on this act, carried as BUILD-STATE states it, UNVERIFIED:** an October 2024 package of seven disciplinary rules makes *"older conflicts/screening drafts presumptively stale."* This tranche drafts no conflicts or screening entry; its one conduct-rule draft (FRD-4) rests on the March 7, 2025 PDF only.

**The three-date discipline** (`#157`'s recommendation): enactment, effective and applicability. Each draft gives what the source's own history lines state. **Applicability (transition) provisions live in session law, not the code text. They were not read and are marked "not stated in the code text".**

**`FOM-12`, the weekend roll.** Each draft states whether its OWN source speaks to a due date that falls on a weekend or holiday. **Every one is silent.** A candidate locator is carried separately in §5 and is not drafted as an entry.

---

## §3 — THE DRAFTS (six; each UNVERIFIED)

### DRAFT FRD-1 — Tex. Gov't Code § 81.054: State Bar membership fees (for `FOT-1`)
> **Cite:** Tex. Gov't Code § 81.054(a), (e), (f), (g), (h), (i), (j), (k).
> **Rule — who sets the fees.** "The supreme court shall set membership fees and other fees for members of the state bar during the court’s annual budget process under Section 81.022."
> **Rule — a permissive due-date system.** "The state bar by rule may adopt a system under which membership fees are due on various dates during the year."
> **Rule — renewal on time.** "A person who is otherwise eligible to renew the person’s membership may renew the membership by paying the required membership fees to the state bar on or before the due date."
> **Rule — late renewal.** "(g) A person whose membership has been expired for 90 days or less may renew the membership by paying to the state bar membership fees equal to 1-1/2 times the normally required membership fees. (h) A person whose membership has been expired for more than 90 days but less than one year may renew the membership by paying to the state bar membership fees equal to two times the normally required membership fees."
> **Rule — the bar's notice.** "Not later than the 30th day before the date a person’s membership is scheduled to expire, the state bar shall send written notice of the impending expiration to the person at the person’s last known address according to the records of the state bar."
> **Rule — the legal services fee.** "The supreme court shall set an additional legal services fee in an amount of $65 to be paid annually by each active member of the state bar except as provided by Subsection (k)." *(Claude's summary, outside the quotation:)* subsection (k) lists eight exemptions from the legal services fee — among them age 70 or older, inactive status, a sitting judge, and employment by the state or federal government; they are listed at the cite, not restated here. Subsection (b), not quoted, exempts an emeritus member from the membership fee from the year the member reaches 70 — whether it applies is HIS FACT.
> **Status:** UNVERIFIED.
> **Source:** the official statutes corpus, `Statutes 26-08-14`, `gv.81.pdf`; the currency is as stated in §2.
> **Dates:**
> - Enactment: *"Added by Acts 1987, 70th Leg., ch. 148, Sec. 3.01, eff. Sept. 1, 1987."*
> - Last amendment in the history: *"Acts 2017, 85th Leg., R.S., Ch. 531 (S.B. 302), Sec. 5, eff. September 1, 2017."*
> - Applicability: not stated in the code text.
> **`FOM-12`:** source silent. **Where the due date comes from is not stated in ch. 81 as read:** (e) *permits* the bar, by rule, to adopt a system of various due dates, and (f) refers to "the due date"; the date's source is expected in the unheld State Bar Rules (§4, G-1), to be confirmed there.
> **Load-bearing for:** `FOT-1`: the fees are owed (subject to (k), and to (b), outside this cite); renewal is by payment on or before "the due date"; the late-renewal cost; the bar's 30-day notice. **The date is not in this entry.**

### DRAFT FRD-2 — Tex. Gov't Code § 81.113(c): continuing legal education (for `FOT-2`)
> **Cite:** Tex. Gov't Code § 81.113(c).
> **Rule.** "The state bar shall recognize, prepare, or administer continuing education programs for members of the state bar. A member of the state bar must participate in the programs to the extent required by the supreme court to maintain the person’s state bar membership."
> **Status:** UNVERIFIED.
> **Source:** `gv.81.pdf`, as FRD-1.
> **Dates:**
> - Enactment: *"Added by Acts 1991, 72nd Leg., ch. 795, Sec. 29, eff. Sept. 1, 1991."*
> - Latest amendment: *"Acts 2025, 89th Leg., 2nd C.S., Ch. 7 (H.B. 16), Sec. 15.05(a), eff. December 4, 2025."* Which subsection that act touched is not stated in the history line.
> - Applicability: not stated in the code text.
> **`FOM-12`:** source silent.
> **Note — why (b) is not in the Rule line.** The module spec's `FOT-2` row cites § 81.113(b)–(c) with the words *"an ethics/professional-responsibility component is presupposed by (b)"*. The text of (b) reads *"An attorney credited for continuing legal education under Subsection (a) must meet the continuing legal education requirements of the state bar in legal ethics or professional responsibility."* Subsection (a) credits, for a reporting year, attorneys *"employed full-time as an attorney by"* a closed list of eight named employers (the senate, the house, their committees and offices, the Texas Legislative Council, the Legislative Budget Board, the Legislative Reference Library, the office of the state auditor, the Sunset Advisory Commission), and a state official *"appointed by the governor and confirmed by the senate."* **Two textual facts, stated neutrally:** (b)'s DUTY runs to attorneys credited under (a); and (b)'s wording PRESUPPOSES that bar requirements in legal ethics or professional responsibility exist. For every other member, (c) says only *"to the extent required by the supreme court"*; the hours, the ethics component and the compliance year are expected in the unheld State Bar Rules and MCLE Regulations (§4, G-2). Flagged for his read, not resolved.
> **Load-bearing for:** `FOT-2`: participation is a condition of membership. **The hours and the month are not in this entry.**

### DRAFT FRD-3 — Tex. Code Crim. Proc. art. 26.04(j)(4), with Tex. Gov't Code § 79.036(a-1): the TIDC practice-time report (for `FOT-4`)
> **Cite:** Tex. Code Crim. Proc. art. 26.04(j)(4); Tex. Gov't Code § 79.036(a-1) (corroborating).
> **Rule — the attorney's duty.** "An attorney appointed under this article shall: … (4) not later than October 15 of each year and on a form prescribed by the Texas Indigent Defense Commission, submit to the county information, for the preceding fiscal year, that describes the percentage of the attorney’s practice time that was dedicated to work based on appointments accepted in the county under this article and Title 3, Family Code."
> **Rule — the county's report that uses it (corroborating).** "Not later than November 1 of each year and in the form and manner prescribed by the commission, each county shall prepare and provide to the commission information that describes for the preceding fiscal year the number of appointments under Article 26.04, Code of Criminal Procedure, and Title 3, Family Code, made to each attorney accepting appointments in the county, and information provided to the county by those attorneys under Article 26.04(j)(4), Code of Criminal Procedure."
> **Status:** UNVERIFIED.
> **Source:** `cr.26.pdf` and `gv.79.pdf`, the official statutes corpus, as §2.
> **Dates:**
> - Art. 26.04: enactment *"Acts 1965, 59th Leg., p. 317, ch. 722, Sec. 1, eff. Jan. 1, 1966."*; latest amendment in the history *"Acts 2019, 86th Leg., R.S., Ch. 591 (S.B. 583), Sec. 1, eff. September 1, 2019."* **Which act added (j)(4) is not identified here.** A LOCATOR, not a conclusion: the history carries *"Acts 2013, 83rd Leg., R.S., Ch. 912 (H.B. 1318), Sec. 1(a), eff. September 1, 2014"*, and the same act appears in § 79.036's history — § 79.036(a-1) being the subsection that cross-references (j)(4). Session law not read.
> - § 79.036: *"Added by Acts 2011, 82nd Leg., R.S., Ch. 984 (H.B. 1754), Sec. 1, eff. September 1, 2011."*, amended 2013 (effective dates 2013 and 2014).
> - Applicability: not stated in the code text.
> **`FOM-12`:** source silent as to (j)(4)'s October 15, a fixed date. (Art. 26.04(j)(1) uses *"the first working day"* for a different duty; nothing speaks to (j)(4)'s date.)
> **Load-bearing for:** `FOT-4`: the date, the form's owner, the recipient ("the county"), and the period ("the preceding fiscal year"). **Which counties is HIS FACT** (H5).

### DRAFT FRD-4 — TDRPC 1.15(a): safekeeping property and its records (for `FOT-6`)
> **Cite:** Tex. Disciplinary Rules Prof'l Conduct R. 1.15(a) (eff. Mar. 7, 2025, per the PDF's cover).
> **Rule.** "A lawyer shall hold funds and other property belonging in whole or in part to clients or third persons that are in a lawyer’s possession in connection with a representation separate from the lawyer’s own property. Such funds shall be kept in a separate account, designated as a trust or escrow account, maintained in the state where the lawyers office is situated, or elsewhere with the consent of the client or third person. Other client property shall be identified as such and appropriately safeguarded. Complete records of such account funds and other property shall be kept by the lawyer and shall be preserved for a period of five years after termination of the representation." *(Note that "lawyers office" appears without an apostrophe in the source, as quoted.)*
> **Status:** UNVERIFIED.
> **Source:** the fourth SOURCING channel; `texas-disciplinary-rules-of-professional-conduct-pdf.pdf`, *"(Effective March 7, 2025)"*.
> **Dates:** for Rule 1.15 the document states only its cover effective date — no per-rule date is printed at 1.15 (the PDF prints a per-rule date at exactly one rule, *"1.04 Fees (Effective March 1, 2005)"*, and none at 1.15). Enactment and applicability are not stated.
> **`FOM-12`:** source silent. **1.15 states NO reconciliation cadence** (nor its comments). The string "reconcil…" occurs twice in this PDF, in neither case in an accounting sense: the Preamble (*"a lawyer seeks to reconcile their divergent interests"*) and Rule 1.04's comment on family-law fees (*"a lawyer’s obligation to encourage reconciliation"*). The monthly reconciliation `FOT-6` schedules is **PRACTICE** (his `#137` words, *"do or die"*), and the module must never present the cadence as this rule's requirement. The IOLTA / TAJF rules and the State Bar Rules may say more; they are NOT HELD (§4, G-4). TRDP 17.10, named at `Q-QBO-6` as a trust-records candidate, is a second place to look (§4, G-4).
> **Load-bearing for:** `FOT-6`: the record-keeping and five-year retention duty that a reconciliation practice serves. **Not the cadence.**

### DRAFT FRD-5 — Tex. Tax Code §§ 171.202, 171.2022, 171.002(d), 171.204(b): the franchise tax annual report (for `FOT-8`)
> **Cite:** Tex. Tax Code §§ 171.202(a)–(b), 171.2022, 171.002(d), 171.204(b).
> **Rule — the report and its date.** "(a) Except as provided by Section 171.2022, a taxable entity on which the franchise tax is imposed shall file an annual report with the comptroller … (b) The taxable entity shall file the report before May 16 of each year after the beginning of the regular annual period. The report shall be filed on forms supplied by the comptroller."
> **Rule — no § 171.201/171.202 report for a period when no tax is due.** "A taxable entity that does not owe any tax under this chapter for any period is not required to file a report under Section 171.201 or 171.202. The exemption applies only to a period for which no tax is due."
> **Rule — when no tax is owed.** "A taxable entity is not required to pay any tax and is not considered to owe any tax for a period if: (1) the amount of tax computed for the taxable entity is less than $1,000; or (2) the amount of the taxable entity’s total revenue from its entire business is less than or equal to $2.47 million or the amount determined under Section 171.006 per 12-month period on which margin is based."
> **Rule — no information report under (d)(2).** "The comptroller may not require a taxable entity that does not owe any tax because of the application of Section 171.002(d)(2) to file an information report with the comptroller."
> **Status:** UNVERIFIED.
> **Source:** `tx.171.pdf`, the official statutes corpus, as §2.
> **Dates:**
> - § 171.202: history from *"Acts 1981, 67th Leg., … eff. Jan. 1, 1982"* through *"Acts 2006, 79th Leg., 3rd C.S., Ch. 1 (H.B. 3), Sec. 7, eff. January 1, 2008."*
> - § 171.2022: *"Added by Acts 1991, 72nd Leg., 1st C.S., ch. 5, Sec. 8.17, eff. Jan. 1, 1992."*, amended 2006 (eff. 2008).
> - § 171.204: enactment *"Acts 1981, 67th Leg., p. 1702, ch. 389, Sec. 1, eff. Jan. 1, 1982."*; latest amendment *"Acts 2025, 89th Leg., R.S., Ch. 335 (H.B. 346), Sec. 2(3), eff. September 1, 2025."* **Two history entries are flagged, their effect being session law NOT READ and NOT inferred:** that 2025 act, and *"Acts 2021, 87th Leg., R.S., Ch. 859 (S.B. 938), Sec. 9(4), eff. January 1, 2026."* Separately, subsection (d) carries *"Repealed by Acts 2023, 88th Leg., 2nd C.S., Ch. 2 (S.B. 3), Sec. 3, eff. January 1, 2024."*
> - § 171.002: enactment *"Acts 1981, 67th Leg., p. 1691, ch. 389, Sec. 1, eff. Jan. 1, 1982."*; latest amendment *"Acts 2023, 88th Leg., 2nd C.S., Ch. 2 (S.B. 3), Sec. 1, eff. January 1, 2024."*
> - Applicability: not stated in the code text.
> **`FOM-12`:** source silent. "before May 16" is a fixed date. The Tax Code's general chapters were NOT READ (§5).
> **Note — (d)(1) added.** The module spec's `FOT-8` row names only (d)(2). The draft carries (d)(1) as well, because the text states both limbs. **Whether the PLLC owes tax in a period is HIS FACT, per period.**
> **Note — the $2.47 million figure is adjusted.** § 171.006(b): *"on January 1 of each even-numbered year, the amounts prescribed by Sections 171.002(d)(2) and 171.1013(c) are increased or decreased by an amount equal to the amount prescribed by those sections on December 31 of the preceding year multiplied by the percentage increase or decrease during the preceding state fiscal biennium in the consumer price index and rounded to the nearest $10,000."* (d)–(e) make it the comptroller's final determination. **The operative figure in a given year is therefore a comptroller determination that no SOURCING channel carries (§4, G-6).**
> **Not carried, and said so:** § 171.202(c) and (e)'s extension regime; § 171.204(c) (*"The comptroller may require any entity to file information as necessary to verify that the entity is not subject to the tax imposed under this chapter."*), whose relation to the (b) limb is not decided here — his read.
> **Load-bearing for:** `FOT-8`: the date, the condition (`conditionalPerPeriod`), and the two no-tax limbs (the (d)(2) figure as adjusted under § 171.006).

### DRAFT FRD-6 — Tex. Tax Code §§ 171.203(a)–(c), 171.2515(a): the Public Information Report (for `FOT-9`)
> **Cite:** Tex. Tax Code §§ 171.203(a), (b), (c); 171.2515(a).
> **Rule — the report is owed whether or not tax is.** "A corporation, limited liability company, limited partnership, or professional association on which the franchise tax is imposed, regardless of whether the entity is required to pay any tax, shall file a report with the comptroller containing: …" The five content items follow at (a)(1)–(5).
> **Rule — how often, and where it goes.** "(b) The corporation, limited liability company, limited partnership, or professional association shall file the report once a year on a form prescribed by the comptroller. (c) The comptroller shall forward the report to the secretary of state."
> **Rule — the comptroller's forfeiture power.** "The comptroller may, for the same reasons and using the same procedures the comptroller uses in relation to the forfeiture of the corporate privileges of a corporation, forfeit the right of a taxable entity to transact business in this state."
> **Status:** UNVERIFIED.
> **Source:** `tx.171.pdf`, as FRD-5.
> **Dates:**
> - § 171.203: history from *"Acts 1981, 67th Leg., … eff. Jan. 1, 1982"* through *"Acts 2015, 84th Leg., R.S., Ch. 1097 (H.B. 2891), Sec. 3, eff. January 1, 2016."*
> - § 171.2515: *"Added by Acts 2006, 79th Leg., 3rd C.S., Ch. 1 (H.B. 3), Sec. 9, eff. January 1, 2008."*
> - Applicability: not stated in the code text.
> **`FOM-12`:** source silent. **And THE STATUTE STATES NO DATE: "once a year on a form prescribed by the comptroller."** The module's May 15 is reported as the form's date in practice — not verified from any channel; it is NOT in any SOURCING channel (§4, G-5).
> **Note — what this entry does not reach.** The grounds for forfeiture (the module spec's row places them in § 171.251) were NOT READ; this entry carries the power, not the grounds. Also not carried: § 171.2515(b) (which applies the subchapter's forfeiture provisions *"including Section 171.255"*); § 171.203(d)'s copy-and-certification requirement; and whether the PLLC is within *"limited liability company"* — an application, his read.
> **Load-bearing for:** `FOT-9`: the obligation exists whether or not tax is owed, and it recurs annually. **The date is not in this entry.**

---

## §4 — GAP TABLE: the named source is one of Michael's unmade acquisitions, or outside every channel

| # | Row | What is missing | Why no substitute was used |
|---|---|---|---|
| **G-1** | `FOT-1` | **The State Bar Rules**: the membership-fee due date that § 81.054(e) leaves to bar rule | DECISION 9A acquisition, his hand, open at the 2026-09-17 refresh (BUILD-STATE YOUR HAND (12)). **A website is never substituted.** |
| **G-2** | `FOT-2` | **The State Bar Rules and the MCLE Regulations**: the hours, the ethics component, the compliance year | Same acquisition (12) |
| **G-3** | `FOT-4` | **Which counties** he takes appointments in | HIS FACT (H5); the county plans are DECISION 9A's fifth channel and not held |
| **G-4** | `FOT-6` | **The TAJF IOLTA rules** (and the State Bar Rules), which may state a trust-account duty or cadence that TDRPC 1.15 does not; and **TRDP 17.10** (named at `Q-QBO-6` as a trust-records candidate) — whether the held Rules of Disciplinary Procedure amendments document contains it is unknown | Acquisition (12); TRDP to be checked in the held fourth-channel PDF |
| **G-5** | `FOT-9` | **The Public Information Report's due date** (the comptroller's form and instructions, or the Texas Administrative Code) | **Outside every SOURCING channel.** The six channels hold no Texas Administrative Code and no comptroller forms. Whether to add a channel, or to carry the date as his fact from the form, is FRD-Q2 |
| **G-6** | `FOT-8` | **The current no-tax-due revenue figure** — § 171.006 adjusts § 171.002(d)(2)'s $2.47 million every even-numbered year by the comptroller's final determination | **Outside every SOURCING channel**, like G-5; FRD-Q2 |

## §5 — `FOM-12`: every named source is silent; one candidate locator, NOT drafted

**DECISION 8 assigns the roll defaults to this act** (*"the `FOM-12` roll defaults are entries in the same file"*). **This tranche DEFERS them**, because the text that would govern them is unresolved. One candidate among others not read — the Code Construction Act, **Tex. Gov't Code § 311.014** (`gv.311.pdf`, the corpus as §2) — reads:
- (a) *"In computing a period of days, the first day is excluded and the last day is included."*
- (b) *"If the last day of any period is a Saturday, Sunday, or legal holiday, the period is extended to include the next day that is not a Saturday, Sunday, or legal holiday."*

Its history line is *"Acts 1985, 69th Leg., ch. 479, Sec. 1, eff. Sept. 1, 1985."*

**Whether (b) reaches a FIXED CALENDAR DATE** — "before May 16", "not later than October 15" — **is not stated in its text, which speaks of "the last day of any period".** § 311.014 itself does not say which codes it governs; the Act's application section, § 311.002, reads in part *"This chapter applies to: (1) each code enacted by the 60th or a subsequent legislature as part of the state’s continuing statutory revision program; (2) each amendment, repeal, revision, and reenactment of a code or code provision by the 60th or a subsequent legislature; (3) each repeal of a statute by a code; and (4) each rule adopted under a code."* — quoted, not applied (art. 26.04's history begins *"Acts 1965, 59th Leg."*; what that means for (j)(4) is not decided here). **Surfaced, not answered, not drafted.** It is surfaced for the statutory-date rows (`FOT-4`, `FOT-8`, `FOT-9`) and for rows whose date is expected in rules adopted under a code (`FOT-1`, `FOT-2`, via § 81.024); whether (4) reaches those rules, or TDRPC 1.15, is not decided here. It is FRD-Q3. **A second place to read before any roll default is drafted:** the Tax Code's general chapters outside ch. 171, which were NOT READ; whether any of them addresses a due date that falls on a weekend or holiday is unknown.

## §6 — ROWS WITH NO LEGAL PROPOSITION BEHIND THEM (put as QUESTIONS, not conclusions)

Each of these rows names no rule of law in its source column. Claude's reading is that each is **a business practice or his fact, not a rule of law, so no registry entry**. **That is a question for him (FRD-Q4), not a conclusion.**

| Row | What the module spec's row says (§7.6's Source column for `FOT-19`; §7.7's "Status / note" column for the rest) | Why no entry is proposed |
|---|---|---|
| `FOT-19` professional-liability renewal | *"none (the policy)"* | a contract date, his fact |
| `FOT-22` documents restore test | *"PRACTICE — `BR-3`'s origin case, the reason `FO-1` exists"* | his `#137` requirement, not a rule |
| `FOT-23` database restore test | *"PRACTICE — `BR-3`'s sibling; the documents' third copy is not the database's"* | the same |
| `FOT-24` backup heartbeat | *"PRACTICE — carries `#137`'s hard requirement…"* | the same |
| `FOT-25` firm payment card expiry | *"HIS FACT"* | a card date |
| `FOT-27` domain renewal | *"HIS FACT (the date) — the sign-in sender and the firm's mail ride on it"* | a registrar date |

## §7 — OPEN ITEMS FOR MICHAEL (full text, packet-local labels `FRD-Q`; `FRD-` returned 0 hits repo-wide at `4940ed3`)

- **FRD-Q1 — Insert tranche 1 now, or wait for the whole set?** Six drafts exist (FRD-1 to FRD-6) for the six go-live rows that rest on law; the other six are proposed no-entry rows (§6). The drafted rows themselves still have gaps (§4 — the bar-rule due date, the MCLE terms, the counties (his fact), the IOLTA rules, the report date, the adjusted revenue figure), and DECISION 8's roll-default entries are deferred (§5). **Should a later packet create `docs/specs/legal-rule-registry-firm-obligations.md` with these six, each UNVERIFIED, now — so the module's `sourceNote`s have something to point at before go-live — or should the file wait until the §4 acquisitions and the §5 question let it be born with its gaps closed?**
- **FRD-Q2 — Two comptroller facts outside every channel (G-5, G-6).** The Public Information Report's statute says only *"once a year on a form prescribed by the comptroller,"* and the no-tax-due revenue figure is adjusted every even-numbered year by the comptroller's final determination (§ 171.006). **Do you (a) add a SOURCING channel for the comptroller's forms, instructions and published determinations, or the Texas Administrative Code, which would fire trigger 3; (b) carry both as your facts from the form each year; or (c) something else?**
- **FRD-Q3 — The roll defaults DECISION 8 assigns to this act (§5).** **Before any `weekendRule` default is drafted for a statutory row: does Gov't Code § 311.014(b) reach a fixed calendar due date, does § 311.002 bring the code in question within the Act, do the Tax Code's general chapters (not read) say anything for `FOT-8`/`FOT-9`, and, for `FOT-1`/`FOT-2` (dates expected in the State Bar Rules), does § 311.002(4)'s "each rule adopted under a code" reach those rules?** Those are verification questions for you; Claude characterizes nothing here. Meanwhile `FOM-12`'s composite already ships every template `unknown` and has you confirm at activation, so nothing waits on this but the defaults themselves.
- **FRD-Q4 — The six no-entry rows (§6).** **Do you confirm that `FOT-19`, `FOT-22`, `FOT-23`, `FOT-24`, `FOT-25` and `FOT-27` take no registry entry**, as business practices or your facts, or do any of them rest on a rule you want entered?
- **FRD-Q5 — § 81.113(b)'s reach (FRD-2's note).** The module spec's `FOT-2` row says *"an ethics/professional-responsibility component is presupposed by (b)"*. **(b)'s duty runs to attorneys credited under (a), while its wording presupposes that bar ethics requirements exist. Does the spec's source note stand as written, or should it be conformed when the MCLE Regulations arrive?** Flagged, not resolved.

*End of drafts. The PF-1 preflight report on this file travels in the same packet, at `docs/record/fo-registry-entry-drafts-2026-09-18/pf1-preflight-report-2026-09-18.md`.*
