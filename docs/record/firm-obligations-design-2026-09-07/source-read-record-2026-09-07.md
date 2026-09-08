# Source-read record — the firm-obligations design pass (2026-09-07 evening, Central)

**Status:** EVIDENCE (`CAP-2`) — the primary-source reads behind `docs/specs/firm-obligations-module-spec.md` §7 and its seed catalog. Born under `docs/record/` by the packet that carries `#151`. Not a design document; rules nothing. **Retrieval is not verification: every proposition these reads support enters the spec UNVERIFIED with its source named, and ONLY Michael verifies.** Two rounds of reads: the first before the PF-1 preflight (§3.1–§3.11, §4, §5), the second after it (§3.12–§3.20), on the preflight's findings.
**Canonical repo path:** `docs/record/firm-obligations-design-2026-09-07/source-read-record-2026-09-07.md`
**DT-1:** every stamp here is 2026-09-07 Central (the session opened at 20:53 CDT; the container clock read 2026-09-08 UTC throughout — the shell was not trusted for any date).
**Session:** typed design session, Cowork, Fable 5.1 per the environment (`claude-fable-5-1`); device bridge granted on `C:\Users\Brennan\brennan-case-manager` and `C:\Users\Brennan\Documents\Knowledge Repo` at 20:53 CDT.

---

## §1 — SOURCING channels used, and the one that was refused

| Channel (project instructions, SOURCING) | Used here | Named per item as |
|---|---|---|
| Texas statutes — the official bulk corpus `Documents\Knowledge Repo\Statutes 26-08-14\` (downloaded from `statutes.capitol.texas.gov/download` by Michael's hand; folder date 2026-08-14) | YES — first round: `gv.81`, `gv.82`, `gv.79` (from `GV.pdf.zip`), `cr.26` (`CR.pdf.zip`), `tx.171`, `tx.191` (`TX.pdf.zip`), `bc.71` (`BC.pdf.zip`); second round: `gv.406`, `es.1054` (`ES.pdf.zip`), `hs.181` (`HS.pdf.zip`), `tx.22`, `tx.31`, `tx.151`, `la.406`, `la.204`, `la.213` (`LA.pdf.zip`) | "Tex. [Code] § …, official bulk corpus downloaded 2026-08-14" |
| Texas conduct-and-administration rules — clean-authority PDFs in `Documents\Knowledge Repo\` (FC-14, the fourth channel) | YES — `texas-disciplinary-rules-of-professional-conduct-pdf.pdf` (face date: *Effective March 7, 2025*). The TRDP PDF is held and was NOT read this pass. | "TDRPC 1.15, eff. 3/7/2025 (State Bar PDF)" |
| Federal regulations — the eCFR API | PARTLY — see §5: `titles.json` answered; the full-text API was refused by robots for this session's fetch layer; the human-readable section pages were read THROUGH THE SUMMARIZING FETCH LAYER (TIER B per `#80`'s provenance marking — not quotable as rule text) | "eCFR via official API (titles.json) + eCFR page through the fetch layer, TIER B" |
| TRCP / TRE / TRAP PDFs | not needed for this pass | — |

**Currency, stated the way the convention requires:** the corpus's currency figure is the download page's own statement (89th Legislature, 2nd Called Session, 2025) as recorded in the project instructions; nothing here infers it from a chapter. Per-chapter amendment lines seen in these reads (e.g., § 81.113's *"Acts 2025, 89th Leg., 2nd C.S., Ch. 7 (H.B. 16), Sec. 15.05(a), eff. December 4, 2025"*) are CORROBORATION only. "As downloaded 2026-08-14" is the phrase used below wherever a chapter's contents are characterized.

**What was refused, and what was NOT read (each named so the absence is not silent):**
- `https://www.ecfr.gov/api/versioner/v1/full/2026-09-03/title-26.xml?section=…` and the `renderer` endpoint — **ROBOTS_DISALLOWED** for this session's fetch tool. Not worked around (no curl, no script; the web-content restriction is honored). The `/current/title-NN/section-…` pages answered.
- `45 CFR 164.308` (HIPAA security management process) — the page returned **503**; NOT READ. The spec's security-risk-analysis template therefore carries no source text and is marked so.
- **The Family Code zip (`FA.pdf.zip`) is ABSENT from the corpus folder** (listed: BC BO CN CP CR CV ES FI GV HR HS IN LA LG OC PE PR TN TX UT WA — twenty-one zips, no FA), exactly as `claude_Knowledge_Repo_Acquisition_List_2026-08-18.md` §3 records. Family Code §§ 107.0042, 107.004, 51.102 are therefore NOT HELD.
- **State Bar Rules** (Supreme Court-promulgated; Art. III membership/dues due date; Art. XII MCLE) and the **MCLE Regulations** — NOT in `Documents\Knowledge Repo\`; not fetched (acquisition is Michael's hand under SOURCING). The MCLE hour/ethics-size/compliance-month specifics therefore enter the spec as *"per the State Bar Rules — NOT HELD"*.
- **Rules Governing the Operation of the Texas Access to Justice Foundation** (IOLTA) — not held; not fetched.
- **The Texas Rules of Disciplinary Procedure PDF** (held) — NOT read this pass (Part XIII, cessation of practice, is named in the spec as "to be read").
- **TDRPC 7.0x** (advertising) — the PDF is held; those rules were NOT read this pass.
- **TIDC's administrative rule** on practice-time reporting, **40 TAC § 815.106** (the TWC quarterly report), **28 TAC** (the workers'-comp non-subscriber notice window), **34 TAC** (the comptroller's PIR form date) — the Texas Administrative Code is not a named channel; not fetched. The statutes read state what they state; the administrative dates are marked NOT READ.
- **The county indigent-defense plan(s)** — public documents (TIDC publishes them), outside the four channels; not read. Which counties' lists Michael is on is HIS TO STATE (`H5`).
- **26 U.S.C. §§ 6654(c), 6072, 6050I** — the U.S. Code is not a named channel; not read. **26 CFR 1.6072-1 / 1.6072-2, 1.6050I-1** — not fetched this pass. **Business Organizations Code** — not read. **Labor Code chs. 204 and 213** — extracted and searched (§3.19), not read whole.

---

## §2 — Method: extraction, normalization, and what the normalizer reported

1. The single chapters were unzipped into the bridge VM's own `/tmp/stat` — **not a mounted path** — with `unzip -o -q <CODE>.pdf.zip <file> -d /tmp/stat`; `pdftotext -layout` produced `.txt`; nothing was staged from that step and no scratch landed in a connected folder from it (the zips this session did place in `Documents\Knowledge Repo\Claude outputs\` are named in the session-log entry for Michael's hand).
2. **The corrected A-for-space normalizer from `docs/specs/statute-pass-registry-retrieval-2026-08-14.md` §3 was applied VERBATIM** — the seven characterized contexts (`)AA`, `.AA`, `:AA`, `"AA`, `,AA`, lowercase-`AA`-followed-by-a-letter/digit/paren/quote, `.A<digit>`) plus the `’` spacing fix — and nothing else. Substitution counts per file, then the residual glued-`AA` sites the harness REPORTED rather than transformed. **The PF-1 preflight re-ran the normalizer on copies and reproduced every count and every residual below; the regenerated `.norm` files were byte-identical.**

| File | paren | period | colon | quote | comma | lower | secnum | apos | Residual glued `AA` |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| `gv.81` | 517 | 138 | 1 | 0 | 0 | 0 | 104 | 86 | none |
| `gv.82` | 186 | 55 | 0 | 0 | 0 | 0 | 43 | 60 | none |
| `gv.79` | 201 | 42 | 0 | 0 | 0 | 1 | 25 | 30 | none |
| `cr.26` | 231 | 40 | 0 | 0 | 0 | 1 | 23 | 102 | none |
| `tx.171` | 910 | 282 | 0 | 0 | 3 | 4 | 168 | 190 | **6 — `agencies;AAand`, `government;AAand` ×3, `state;AAand`, `AAAcooperative`** |
| `tx.191` | 9 | 13 | 0 | 0 | 0 | 0 | 13 | 2 | none |
| `bc.71` | 114 | 27 | 0 | 0 | 0 | 0 | 22 | 38 | none |
| `gv.406` | 225 | 65 | 0 | 0 | 0 | 0 | 48 | 51 | none |
| `es.1054` | 77 | 43 | 0 | 0 | 0 | 0 | 0 | 34 | none (the Estates Code PDF spaces its section numbers, so `secnum` never fires) |
| `hs.181` | 151 | 46 | 0 | 0 | 0 | 0 | 31 | 39 | none |
| `tx.22` | 134 | 37 | 0 | 0 | 0 | 0 | 17 | 25 | none |
| `tx.31` | 312 | 90 | 0 | 0 | 0 | 0 | 26 | 48 | **1 — `REFUNDS;AAINTEREST.`** |
| `tx.151` | 1757 | 383 | 0 | 0 | 1 | 3 | 266 | 187 | **6 — `services;AAand`, `state;AAor`, `States;AAor`, `broker;AAand`, `patients;AAand`, `helicopter;AAand`** |
| `la.406` | 230 | 67 | 0 | 0 | 0 | 0 | 51 | 119 | none |
| `la.204` | 195 | 67 | 1 | 0 | 0 | 0 | 56 | 91 | none |
| `la.213` | 104 | 39 | 0 | 0 | 0 | 0 | 38 | 14 | none |

3. **A NEW, UNCHARACTERIZED CONTEXT, REPORTED AND NOT TRANSFORMED (the §3 design rule), and it is systematic:** the two-`A` artifact after a **semicolon** (`;AA`) — five sites in `tx.171`, one in `tx.31`, six in `tx.151`. Adding `(?<=;)AA` to the characterized set is a §3 amendment for a later pass, not this one. **None of these sites falls inside any passage quoted below** (each quoted passage was re-read in the `.norm` output and contains no glued `AA`; the preflight confirmed the `tx.171` sites sit in §§ 171.071, 171.1011, 171.1012, 171.1013 and 171.109).
4. **`AAAcooperative` (`tx.171`, § 171.071), described correctly:** the raw text is `SOCIETY.AAAAAcooperative` — a period, a two-`A` artifact (transformed by the period rule), then the real article *"A"*, then a second two-`A` artifact whose left context is that uppercase `A` (uncharacterized, left alone), then *cooperative*. The residual is a real word "A" FOLLOWED by an artifact — the reverse of what the first draft of this record said. Outside every quotation.
5. **Single-`A` residual forms seen and left alone** (the residual detector matches only `AA`; single-`A` sites are found by eye): `Art. 26.041. PROCEDURES RELATED TO GUARDIANSHIPS.A(a)` (`cr.26`, the heading of art. 26.041 — outside the quoted span of art. 26.04(j)); `computed byAdetermining the` and `Section 171.1011 andAsubtracting the greater of` (`tx.171`, § 171.101(a) — a lowercase-`A`-lowercase shape, outside every quoted passage). This inventory is what one pass found; it is not claimed complete.
6. **The TDRPC PDF needed no normalizer**: its raw `pdftotext -layout` output contains **zero** `AA` sequences (a different publisher; the §3 caution that the statute normalizer must not be carried to the rules PDFs was honored — it was never applied to it).
7. **Every quotation below was spot-checked against the RAW extraction** (`.txt`) as the SOURCING convention requires: each quoted sentence was located in the raw file and differs from the raw only at characterized artifact sites and at collapsed runs of layout spaces. Page-number lines that `-layout` interleaves were removed from the quotations and are the only omissions. Bracketed text inside a quotation is a SUMMARY of omitted subdivisions, never a quotation.

---

## §3 — Texas statutes, verbatim (normalized), with what each read establishes

### 3.1 Tex. Gov't Code § 81.051 — bar membership required
> **Sec. 81.051. BAR MEMBERSHIP REQUIRED.** (a) The state bar is composed of those persons licensed to practice law in this state. Bar members are subject to this chapter and to the rules adopted by the supreme court.

*Establishes:* membership is the licence's condition; the rules adopted by the supreme court (the State Bar Rules — NOT HELD) govern its terms.

### 3.2 Tex. Gov't Code § 81.052 — membership classes
> **Sec. 81.052. MEMBERSHIP CLASSES.** (a) A bar membership is one of four classes: active, inactive, emeritus, or associate. (b) Each licensed member of the state bar is an active member until the person requests to be enrolled as an inactive member.

### 3.3 Tex. Gov't Code § 81.054 — membership fees and additional fees (the dues statute) — subsections (a), (e)–(k) quoted
> (a) The supreme court shall set membership fees and other fees for members of the state bar during the court’s annual budget process under Section 81.022. The fees, except as provided by Subsection (j) and those set for associate members, must be set in accordance with this section and Section 81.022.
> (e) The state bar by rule may adopt a system under which membership fees are due on various dates during the year. For the year in which a due date is changed, the annual fee shall be prorated on a monthly basis so that the member pays only that portion of the fee that is allocable to the number of months remaining before the new expiration date. An increase in fees applies only to fees that are payable on or after the effective date of the increase.
> (f) A person who is otherwise eligible to renew the person’s membership may renew the membership by paying the required membership fees to the state bar on or before the due date.
> (g) A person whose membership has been expired for 90 days or less may renew the membership by paying to the state bar membership fees equal to 1-1/2 times the normally required membership fees.
> (h) A person whose membership has been expired for more than 90 days but less than one year may renew the membership by paying to the state bar membership fees equal to two times the normally required membership fees.
> (i) Not later than the 30th day before the date a person’s membership is scheduled to expire, the state bar shall send written notice of the impending expiration to the person at the person’s last known address according to the records of the state bar.
> (j) The supreme court shall set an additional legal services fee in an amount of $65 to be paid annually by each active member of the state bar except as provided by Subsection (k). Section 81.024 does not apply to a fee set under this subsection.
> (k) The legal services fee shall not be assessed on any Texas attorney who: (1) is 70 years of age or older; (2) has assumed inactive status under the rules governing the State Bar of Texas; (3) is a sitting judge; (4) is an employee of the state or federal government; (5) is employed by a city, county, or district attorney’s office and who does not have a private practice that accounts for more than 50 percent of the attorney’s time; (6) is employed by a 501(c)(3) nonprofit corporation and is prohibited from the outside practice of law; (7) is exempt from MCLE requirements because of nonpracticing status; or (8) resides out of state and does not practice law in Texas.

*Amendment line, corroboration only:* last amended by Acts 2017, 85th Leg., R.S., Ch. 531 (S.B. 302), Sec. 5, eff. September 1, 2017.
*Establishes:* an ANNUAL membership fee whose amount the supreme court sets and whose DUE DATE the state bar sets by rule (the date is therefore NOT in the statute — it comes from the State Bar Rules, not held, or from Michael's own dues statement); the $65 annual legal services fee on each active member; the late-renewal multipliers at 90 days and one year; the bar's own 30-day notice of impending EXPIRATION (a notice about the membership's expiry date, which is not the same thing as the fee's due date).
*Does NOT establish:* the dues amount for any year; the due date; whether the legal services fee is billed on the dues statement (Michael's fact).

### 3.4 Tex. Gov't Code § 81.113 — continuing legal education
> **Sec. 81.113. CONTINUING LEGAL EDUCATION.** (a) Except as provided by Subsection (b), the state bar shall credit an attorney licensed in this state with meeting the minimum continuing legal education requirements of the state bar for a reporting year if during the reporting year the attorney is: (1) employed full-time as an attorney by: [(A)–(H), legislative and state-audit employers]; or (2) serving as a state official appointed by the governor and confirmed by the senate.
> (b) An attorney credited for continuing legal education under Subsection (a) must meet the continuing legal education requirements of the state bar in legal ethics or professional responsibility.
> (c) The state bar shall recognize, prepare, or administer continuing education programs for members of the state bar. A member of the state bar must participate in the programs to the extent required by the supreme court to maintain the person’s state bar membership.

*Amendment line, corroboration only:* Acts 2025, 89th Leg., 2nd C.S., Ch. 7 (H.B. 16), Sec. 15.05(a), eff. December 4, 2025.
*Establishes:* participation in MCLE "to the extent required by the supreme court" is a condition of maintaining membership; the concept of a "reporting year"; that an ethics/professional-responsibility component EXISTS (presupposed by (b)).
*Does NOT establish:* the hours, the SIZE of the ethics component, or the compliance month — those are in the State Bar Rules / MCLE Regulations (NOT HELD → acquisition).

### 3.5 Tex. Code Crim. Proc. art. 26.04(j)(4) — the annual practice-time report
> (j) An attorney appointed under this article shall: … (4) not later than October 15 of each year and on a form prescribed by the Texas Indigent Defense Commission, submit to the county information, for the preceding fiscal year, that describes the percentage of the attorney’s practice time that was dedicated to work based on appointments accepted in the county under this article and Title 3, Family Code.

*Amendment line, corroboration only:* the article's most recent amendment line is Acts 2019, 86th Leg., R.S., Ch. 591 (S.B. 583), Sec. 1, eff. September 1, 2019.
*Establishes:* a FIXED ANNUAL date (October 15), the recipient (the county), the form's author (TIDC), and the period (the preceding fiscal year). The duty runs to *"the county"* — per county in which appointments were accepted. It applies to *"an attorney appointed under this article"*: if Michael accepts appointments under art. 26.04 in a county, the report is owed to that county — his to confirm, county by county.
*Does NOT establish:* which fiscal year (TIDC's form's to say; § 79.036(a-1), §3.13, pairs it with the county's own report "for the preceding fiscal year"), how many submissions cover several counties in practice, or any CLE requirement for appointment lists (that is the county plan's).

### 3.6 Tex. Tax Code § 171.202(a)–(b) — the franchise tax annual report
> **Sec. 171.202. ANNUAL REPORT.** (a) Except as provided by Section 171.2022, a taxable entity on which the franchise tax is imposed shall file an annual report with the comptroller containing: (1) financial information of the taxable entity necessary to compute the tax under this chapter; (2) the name and address of each officer and director of the taxable entity; (3) the name and address of the agent of the taxable entity designated under Section 171.354; and (4) other information required by the comptroller.
> (b) The taxable entity shall file the report before May 16 of each year after the beginning of the regular annual period. The report shall be filed on forms supplied by the comptroller.

### 3.7 Tex. Tax Code § 171.2022 — exemption from reporting when no tax is due
> **Sec. 171.2022. EXEMPTION FROM REPORTING REQUIREMENTS.** A taxable entity that does not owe any tax under this chapter for any period is not required to file a report under Section 171.201 or 171.202. The exemption applies only to a period for which no tax is due.

### 3.8 Tex. Tax Code § 171.002(d) — when no tax is owed; and § 171.204(b)
> (d) A taxable entity is not required to pay any tax and is not considered to owe any tax for a period if: (1) the amount of tax computed for the taxable entity is less than $1,000; or (2) the amount of the taxable entity’s total revenue from its entire business is less than or equal to $2.47 million or the amount determined under Section 171.006 per 12-month period on which margin is based.

> **§ 171.204(b):** The comptroller may not require a taxable entity that does not owe any tax because of the application of Section 171.002(d)(2) to file an information report with the comptroller.

### 3.9 Tex. Tax Code § 171.203(a)–(c) — the public information report
> **Sec. 171.203. PUBLIC INFORMATION REPORT.** (a) A corporation, limited liability company, limited partnership, or professional association on which the franchise tax is imposed, regardless of whether the entity is required to pay any tax, shall file a report with the comptroller containing: [(1)–(5): ownership interests of 10 percent or more; officers/directors with mailing addresses and term expirations; the agent designated under Section 171.354 (the agent for service of process); the principal office and principal place of business].
> (b) The corporation, limited liability company, limited partnership, or professional association shall file the report once a year on a form prescribed by the comptroller.
> (c) The comptroller shall forward the report to the secretary of state.

*Amendment line, corroboration only:* last amended by Acts 2015, 84th Leg., R.S., Ch. 1097 (H.B. 2891), Sec. 3, eff. January 1, 2016.
*Establishes (3.6–3.9 together):* the ANNUAL REPORT is owed "before May 16" unless no tax is due for the period (§ 171.2022; the ≤ $2.47 million total-revenue floor at § 171.002(d)(2); § 171.204(b) bars the comptroller from requiring an information report of such an entity); the PUBLIC INFORMATION REPORT is owed ONCE A YEAR by a limited liability company "regardless of whether the entity is required to pay any tax", on the comptroller's form, and the comptroller forwards it to the secretary of state.
*Does NOT establish:* the PIR's due date — **the statute is silent on it** (it says "once a year" and no more; the date is the comptroller's form's — May 15 in practice, which is practitioner knowledge, NOT READ); whether the PLLC owes tax in any year; the indexed amount under § 171.006; and — because (c) says only that the comptroller forwards the PIR — whether any separate secretary-of-state filing exists (the Business Organizations Code was NOT READ; none is seeded because none was found in the sources read).

### 3.10 Tex. Tax Code ch. 191 — the ABSENCE of an attorney occupation tax
The chapter as downloaded 2026-08-14 contains **only Subchapter E (Oil Well Service, §§ 191.081–191.089), Subchapter F (Tax Receipt, §§ 191.101–191.102) and Subchapter G (Nature and Allocation of Tax, §§ 191.121–191.122)**. No attorney occupation tax subchapter exists in the chapter as downloaded; "attorney" occurs in it only as *"the comptroller or the attorney general"* (§ 191.085(b)).
*Establishes:* NO attorney occupation tax is to be seeded as an obligation.
*Does NOT establish:* the repealing act or its date — the corpus chapter carries no repeal note for the absent subchapter, and this record asserts none.

### 3.11 Tex. Bus. & Com. Code § 71.151 — duration and renewal of an assumed-name certificate
> **Sec. 71.151. DURATION AND RENEWAL OF CERTIFICATE.** (a) A certificate is effective for a term not to exceed 10 years from the date the certificate is filed. (b) A certificate is void at the end of the certificate’s stated term, unless within six months preceding the certificate’s expiration date the registrant files in the office of a county clerk and the secretary of state, if applicable, a renewal certificate complying with the requirements of this chapter for an original certificate. (c) A registrant may renew a certificate under this section for any number of successive terms, but each term may not exceed 10 years.

*Establishes:* a RECURRING dated obligation on a ≤ 10-year cycle (renewal within the six months before expiry, *"for any number of successive terms"*) — CONDITIONAL on the firm actually holding an assumed-name certificate (Michael's fact; not asked, not swept). Where an LLC files is § 71.103 (§3.18).

### 3.12 Tex. Gov't Code § 406.002 and § 406.010(a) — the notary public's term and bond (second round)
> **Sec. 406.002. TERM.** The term of a notary public expires four years after the date the notary public qualifies.
> **Sec. 406.010. BOND; OATH.** (a) Each person to be appointed a notary public shall, before entering the official duties of office, execute a bond in the amount of $10,000 with a solvent surety company authorized to do business in this state as a surety.

*Establishes:* a four-year term from qualification (a multi-year `anniversary`) and a $10,000 bond at appointment — CONDITIONAL on Michael holding a commission (HIS FACT).

### 3.13 Tex. Gov't Code § 79.036(a-1) — the county's report to TIDC (second round; corroborates 3.5)
> (a-1) Not later than November 1 of each year and in the form and manner prescribed by the commission, each county shall prepare and provide to the commission information that describes for the preceding fiscal year the number of appointments under Article 26.04, Code of Criminal Procedure, and Title 3, Family Code, made to each attorney accepting appointments in the county, and information provided to the county by those attorneys under Article 26.04(j)(4), Code of Criminal Procedure.

*Establishes:* the county forwards the attorneys' art. 26.04(j)(4) information to TIDC by November 1 "for the preceding fiscal year" — corroborating the October 15 → county → TIDC flow; and that the county's appointment counts cover *"Title 3, Family Code"* (juvenile) appointments too. (Chapter 82 — licensing and the Board of Law Examiners — was extracted in the first round and its section headings scanned for fee / tax / occupation: the heading hits are § 82.033 (*FEES* — the Board of Law Examiners' application and examination fees) and § 82.0361 (*NONRESIDENT ATTORNEY FEE*); § 82.034 (*USE OF FUNDS*) opens *"Fees received by the Board…"* in its body; no recurring obligation of a licensed resident attorney was found in the headings, and the chapter was NOT read whole. Recorded so that read is not silent.)

### 3.14 Tex. Gov't Code § 81.114(a) and Tex. Estates Code §§ 1054.201–1054.203 — the guardianship course and certificate (second round)
> **Sec. 81.114. ATTORNEY INSTRUCTION RELATED TO GUARDIANSHIP ISSUES.** (a) The state bar shall provide a course of instruction for attorneys who represent any person’s interests in guardianship cases or who serve as court-appointed guardians.

> **Sec. 1054.201. CERTIFICATION REQUIRED.** (a) Except as provided by Subsection (c), an attorney representing any person’s interests in a guardianship proceeding, including an attorney ad litem, must be certified by the State Bar of Texas, or a person or other entity designated by the state bar, as having successfully completed a course of study in guardianship law and procedure sponsored by the state bar or the state bar’s designee. (b) The State Bar of Texas shall require four hours of credit for certification under this subchapter, including one hour on alternatives to guardianship and supports and services available to proposed wards. (c) An attorney may commence representation of a person’s interests and file an appearance in a guardianship proceeding before completing the course required for certification under Subsection (a), but must complete the course not later than the 14th day after the date of filing the appearance and before filing any substantive motion in the guardianship proceeding.
> **Sec. 1054.202. CERTIFICATE EXPIRATION.** (a) Except as provided by Subsection (b), a certificate issued under this subchapter expires on the second anniversary of the date the certificate is issued. (b) A new certificate obtained by a person to whom a certificate under this subchapter was previously issued expires on the fourth anniversary of the date the new certificate is issued if the person has been certified each of the four years immediately preceding the date the new certificate is issued.
> **Sec. 1054.203. ELIGIBILITY FOR APPOINTMENT ON EXPIRATION OF CERTIFICATE.** An attorney whose certificate issued under this subchapter has expired must obtain a new certificate to be eligible for appointment by a court to represent a person at a guardianship proceeding, including as an attorney ad litem.

*Amendment lines, corroboration only:* § 1054.201 last amended by Acts 2021, 87th Leg., R.S., Ch. 576 (S.B. 615), Sec. 18, eff. September 1, 2021; § 1054.202 added by Acts 2011, 82nd Leg., R.S., Ch. 823 (H.B. 2759), eff. January 1, 2014.
*Establishes:* a certificate on a two-year cycle (four after four consecutive certified years); expiry ends eligibility for appointment — CONDITIONAL on guardianship work (HIS FACT).

### 3.15 Tex. Health & Safety Code § 181.101 — PHI training under H.B. 300 (second round)
> **Sec. 181.101. TRAINING REQUIRED.** (a) Each covered entity shall provide training to employees of the covered entity regarding the state and federal law concerning protected health information as necessary and appropriate for the employees to carry out the employees’ duties for the covered entity. (b) An employee of a covered entity must complete training described by Subsection (a) not later than the 90th day after the date the employee is hired by the covered entity. (c) If the duties of an employee of a covered entity are affected by a material change in state or federal law concerning protected health information, the employee shall receive training described by Subsection (a) within a reasonable period, but not later than the first anniversary of the date the material change in law takes effect. (d) A covered entity shall require an employee of the entity who receives training described by Subsection (a) to sign, electronically or in writing, a statement verifying the employee’s completion of training. The covered entity shall maintain the signed statement until the sixth anniversary of the date the statement is signed.

*Establishes:* the training duty is EVENT-DRIVEN (within 90 days of hire; within a year of a material change in law) with a six-year retention of the signed statement. **The biennial ("at least once every two years") cadence that practitioners remember is NOT in the section as downloaded 2026-08-14** — the preflight's proposal of a biennial template was checked against the text and NOT adopted. Applicability (whether the firm is a "covered entity" under ch. 181's broad definition) is Michael's.

### 3.16 Tex. Tax Code §§ 22.01(a), 22.23(a)–(b), 22.28(a) — the business personal property rendition (second round)
> **Sec. 22.01. RENDITION GENERALLY.** (a) Except as provided by Chapter 24, a person shall render for taxation all tangible personal property used for the production of income that the person owns or that the person manages and controls as a fiduciary on January 1. …
> **Sec. 22.23. FILING DATE.** (a) Rendition statements and property reports must be delivered to the chief appraiser after January 1 and not later than April 15, except as provided by Section 22.02. (b) On written request by the property owner, the chief appraiser shall extend a deadline for filing a rendition statement or property report to May 15. The chief appraiser may further extend the deadline an additional 15 days upon good cause shown in writing by the property owner.
> **Sec. 22.28. PENALTY FOR DELINQUENT REPORT; PENALTY COLLECTION PROCEDURES.** (a) Except as otherwise provided by Section 22.30, the chief appraiser shall impose a penalty on a person who fails to timely file a rendition statement or property report required by this chapter in an amount equal to 10 percent of the total amount of taxes imposed on the property for that year by taxing units participating in the appraisal district. …

*Establishes:* an annual rendition due April 15 (extendable to May 15 on written request) of income-producing tangible personal property owned on January 1, with a 10 percent penalty for a late filing — CONDITIONAL on the firm owning such property (an office's furniture and computers; HIS FACT). Any exemption threshold (ch. 11) was NOT read.

### 3.17 Tex. Tax Code § 31.02(a) — property-tax delinquency (second round)
> **Sec. 31.02. DELINQUENCY DATE.** (a) Except as provided by Subsection (b) of this section and by Sections 31.03 and 31.04 of this code, taxes are due on receipt of the tax bill and are delinquent if not paid before February 1 of the year following the year in which imposed.

*Establishes:* payment before February 1 — CONDITIONAL on a tax bill being issued.

### 3.18 Tex. Bus. & Com. Code § 71.103 — where an LLC files its assumed-name certificate (second round)
> **Sec. 71.103. PLACE OF FILING.** (a) A corporation, limited partnership, limited liability partnership, limited liability company, registered series of a limited liability company, or foreign filing entity required to file a certificate under Section 71.101 shall file the certificate in the office of the secretary of state. (b) Repealed by Acts 2019, 86th Leg., R.S., Ch. 900 (H.B. 3609), Sec. 2, eff. September 1, 2019. (c) Repealed by Acts 2019, 86th Leg., R.S., Ch. 900 (H.B. 3609), Sec. 2, eff. September 1, 2019.

*Establishes:* a limited liability company files with the secretary of state only; the county-clerk limbs are repealed — so § 71.151(b)'s *"county clerk … if applicable"* does not send an LLC to the county clerk.

### 3.19 Tex. Tax Code § 151.0101(a) — "taxable services" (second round; a NEGATIVE read)
The whole list was read: (1) amusement services; (2) cable television services; (3) personal services; (4) motor vehicle parking and storage services; (5) the repair, remodeling, maintenance, and restoration of tangible personal property [with the stated exceptions]; (6) telecommunications services; (7) credit reporting services; (8) debt collection services; (9) insurance services; (10) information services; (11) real property services; (12) data processing services; (13) real property repair and remodeling; (14) security services; (15) telephone answering services; and (16) — paraphrased — a transmission and distribution utility's sale of transmission or delivery of service to an electricity end-use customer whose consumption is taxed under the chapter.
*Establishes:* legal services are not among the enumerated taxable services — NO sales-tax obligation is seeded. *(Also the second round: Tex. Tax Code § 171.2515(a) — "The comptroller may, for the same reasons and using the same procedures the comptroller uses in relation to the forfeiture of the corporate privileges of a corporation, forfeit the right of a taxable entity to transact business in this state." — read as the consequence behind the PIR's weight; the procedures themselves were not read.)*

### 3.20 Tex. Labor Code §§ 406.004(a), 406.005(a)–(b); chs. 204 and 213 (second round)
> **Sec. 406.004. EMPLOYER NOTICE TO DIVISION.** (a) An employer who does not obtain workers’ compensation insurance coverage shall notify the division in writing, in the time and as prescribed by commissioner rule, that the employer elects not to obtain coverage.
> **Sec. 406.005. EMPLOYER NOTICE TO EMPLOYEES; ADMINISTRATIVE VIOLATION.** (a) An employer shall notify each employee as provided by this section whether or not the employer has workers’ compensation insurance coverage. (b) The employer shall notify a new employee of the existence or absence of workers’ compensation insurance coverage at the time the employee is hired.

*Establishes:* a non-subscriber's notice to the Division on a schedule set by commissioner rule (28 TAC — NOT READ) and a notice to each employee (event-driven, at hire) — CONDITIONAL on employees and no coverage. **Chs. 204 (contributions) and 213 (enforcement) were extracted and searched for a quarterly-report deadline**: every `quarter` hit is the contribution scheme's reference to calendar quarters; no report deadline was found in the statute text — the TWC quarterly report's date lives in 40 TAC (NOT READ). The chapters were not read whole.

---

## §4 — Texas conduct rules (FC-14 channel), verbatim

### 4.1 TDRPC Rule 1.15(a) — Safekeeping Property (PDF face date: *Effective March 7, 2025*)
> **Rule 1.15 Safekeeping Property** (a) A lawyer shall hold funds and other property belonging in whole or in part to clients or third persons that are in a lawyer’s possession in connection with a representation separate from the lawyer’s own property. Such funds shall be kept in a separate account, designated as a trust or escrow account, maintained in the state where the lawyers office is situated, or elsewhere with the consent of the client or third person. Other client property shall be identified as such and appropriately safeguarded. Complete records of such account funds and other property shall be kept by the lawyer and shall be preserved for a period of five years after termination of the representation.

*(The PDF's own text reads "the lawyers office" without an apostrophe; it is reproduced as it stands.)*
*Comment 2's closing sentence, verbatim:* "Paragraph (c) does not prohibit participation in an IOLTA or similar program."
*Establishes:* the trust-account RECORD-RETENTION duty is EVENT-DRIVEN and per representation (five years after termination) — not a recurring calendar obligation; the rule text read states **no reconciliation cadence**, and the word `reconcil` occurs elsewhere in the TDRPC text only twice, both in unrelated senses (the Preamble's second paragraph — *"As intermediary between clients, a lawyer seeks to reconcile their divergent interests"* — and Rule 1.04's comment on fees in family law matters, on the *"obligation to encourage reconciliation"*). A monthly reconciliation is therefore a PRACTICE cadence Michael sets, never presented by the module as a rule requirement — **within the rules READ; the IOLTA and State Bar Rules are NOT HELD and may say otherwise.**
*Note on numbering:* in this PDF the safekeeping rule is **1.15** (the table of contents lists 1.14 as *Conflicts: Public Interest Activities*). Any older material citing "1.14" for safekeeping is cited to the rule's current number here.

---

## §5 — Federal regulations — eCFR, and the TIER of what came back

**Request date:** 2026-09-07 Central (2026-09-08 UTC on the container clock). **`titles.json` (the official API, read directly):** Title 26 *Internal Revenue* — `latest_amended_on` 2026-08-28, **`up_to_date_as_of` 2026-09-03**; Title 31 *Money and Finance: Treasury* — `latest_amended_on` 2026-08-26, **`up_to_date_as_of` 2026-09-03**; Title 45 *Public Welfare* — `up_to_date_as_of` 2026-09-03; `meta.date` 2026-09-03, `import_in_progress` false.

**The full-text endpoints were ROBOTS-DISALLOWED for this session's fetch tool** (`/api/versioner/v1/full/...` and `/api/renderer/v1/...`). The human-readable `www.ecfr.gov/current/...` section pages answered, but **through the summarizing fetch layer — TIER B in `#80`'s provenance vocabulary: the sentences below are what that layer returned as quotations, not a byte read of the section, and they are NOT quotable as rule text in a filing or a registry entry until read at source.** They are sufficient to name the source and the date shape for a seed template; Michael's verification reads the section itself. The spec marks every row that rests on them TIER B and never presents them as verified.

| Section | What the fetch layer returned (as quotation) | Seed use |
|---|---|---|
| **26 CFR 31.6071(a)-1(a)(1)** | "each return required to be made under § 31.6011(a)-1, in respect of the taxes imposed by the Federal Insurance Contributions Act…shall be filed on or before the last day of the first calendar month following the period for which it is made." (alternative: "on or before the 10th day of the second calendar month following such period if timely deposits … have been made in full payment") | Form 941 quarterly — CONDITIONAL on wages |
| **26 CFR 31.6071(a)-1(a)(3)(i)** | wage information returns are filed "on or before January 31 of the year following the calendar year for which it is made" | Forms W-2/W-3 filed by January 31 — CONDITIONAL |
| **26 CFR 31.6071(a)-1, the FUTA paragraph** | summarized only — "Federal Unemployment Tax Act returns due the last day of the first month (or tenth day of second month if deposits made timely)" | Form 940 — CONDITIONAL; TIER B (summary) |
| **26 CFR 31.6051-1(d)(1)(i)** | "Each statement required by this section for a calendar year and each corrected statement required for the year shall be furnished to the employee on or before January 31 of the year succeeding such calendar year." | W-2 to employees by January 31 — CONDITIONAL |
| **26 CFR 1.6041-6** | "returns made under section 6041 on Forms 1096 and 1099 for any calendar year shall be filed on or before February 28 (March 31 if filed electronically)"; "Returns made on Form 1099 reporting nonemployee compensation shall be filed on or before January 31 of the year following the calendar year" | 1099-NEC by January 31; other 1099s Feb 28 / Mar 31 — CONDITIONAL |
| **31 CFR 1010.380(c)** | (c)(1)(ii): a reporting company is "Any entity that is: (A) A corporation, limited liability company, or other entity; (B) Formed under the law of a foreign country; and (C) Registered to do business in any State or tribal jurisdiction…"; (c)(2)(xxiv) exempts "Any entity that is: (A) A corporation, limited liability company, or other entity; and (B) Created by the filing of a document with a secretary of state or any similar office under the law of a State or Indian tribe." | **BOI reporting seeded INACTIVE with the note** — on this read a Texas PLLC is a domestic entity and exempt; his read of the section decides, and an interim rule can move |
| 45 CFR 164.308 | **503 — NOT READ** | the security-risk-analysis template carries no source text |

**The dates a template computes from these sentences are the module's own arithmetic, stated as such** (e.g., "last day of the first calendar month following the period" → April 30, July 31, October 31, January 31 for calendar quarters); the arithmetic is checkable against the quoted sentence and is not itself a quotation.

---

## §6 — What this record is not

It verifies nothing (only Michael verifies). It characterizes no case law, drafts no registry entry, and inserts nothing into any registry file — the spec's §8 puts the practice-side registry question to Michael as a ruling. It did not sweep Michael's machine: the Knowledge Repo top level and the `Statutes 26-08-14\` zip listings were read to locate the chapter files and the TDRPC PDF; nothing else in the Knowledge Repo was opened. The leftover `Statutes 26-08-14\_claude_extract\hs.481.pdf` from an earlier session was seen in the listing and left alone (Michael's hand, per the acquisition list's housekeeping note).
