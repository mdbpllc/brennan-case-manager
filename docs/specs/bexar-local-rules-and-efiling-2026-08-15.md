# Bexar Local Rules + eFileTexas Research Memo — filing, setting, and submission mechanics

**Canonical repo path (proposed):** `docs/specs/bexar-local-rules-and-efiling-2026-08-15.md` — NEW file,
rides the next packet on Michael's word.

**Status: PROPOSED design input — research support only. NOTHING here is verified.** Under registry
discipline, confirming a rule's currency, supplying or upgrading a cite, or setting any status is Michael's
verification act alone. A model asserting legal currency is never verification. **No registry file was read-
modified and none was altered by this session. No local rule, standing order, or court page is treated as
current on this memo's say-so.**

**Authored:** 2026-08-15 Central (design session, Opus 5, Cowork, CHAT-DISPATCH Task 7).
**DT-1 applied:** clock-checked **13:34 CDT** before any stamp — well ahead of the 19:00 CDT container
rollover; the container read 2026-08-15 UTC and Central agreed. No stamp in this file was taken from the
container clock.

---

## §0 — SOURCES, NAMED PER ITEM — AND THE PROVENANCE TIER EACH ONE SITS IN

Q-STAT-1 requires sources named per item. This memo needs a second axis as well, because its material
came through **two channels of very different reliability**, and mixing them silently would be the exact
failure the SOURCING convention was written against.

**TIER A — clean authority, read locally, quotable.** Files in Michael's `Documents\Knowledge Repo`,
staged to this session and extracted with `pdftotext -layout`, then read directly:

- `Civil\texas-rules-of-civil-procedure July 2026.pdf` — TRCP 3a, 4, 5, 21, 21a, 21b, 21c, 21d, and the
  Part V justice-court rules 500.4, 501.4, 510.24. Same file the Task 6 memo used.
- `Criminal\statewide-rules-governing-electronic-filing-in-criminal-cases.pdf` — the Court of Criminal
  Appeals' statewide criminal e-filing rules, Parts 1–4, with their comments.
- **Artifact check run, per Q-STAT-1:** the doubled-literal-`A`-for-space artifact characterized at
  `statute-pass-registry-retrieval-2026-08-14.md` §3 **is absent from both files** (pattern
  `[a-z]A[a-z]` returns zero matches across 17,396 lines of the TRCP extraction). Nothing was
  normalized, because nothing needed it. Quotations below from Tier A are verbatim from that extraction.

**TIER B — fetched web sources, summarized by a retrieval layer, NOT verbatim-safe.** Every Bexar local
rule, standing order, court page, and e-filing vendor page reached this memo through `WebFetch`, which
runs a summarizing model over the page rather than returning raw text. **Its "quotations" are
second-hand and one of them demonstrably drifted between two fetches of the same document** (§6.3). Tier B
material is marked **[TIER B]** at every point of use, and no Tier B string is treated as quotable rule
text. Sources, each named:

- `bexar.org` — Bexar County Civil District Court Local Rules, *"Updated Effective date: July 1, 2026"*
  (DocumentCenter/View/40194); Bexar County Criminal District Court Local Rules **2025**
  (DocumentCenter/View/20707); Part 2 — General Rules of the Statutory County Courts at Law
  (DocumentCenter/View/20704); the Local Rules index page (bexar.org/3717); the Civil Presiding Court page
  (bexar.org/3872); the County Clerk eFiling FAQ (bexar.org/faq.aspx?TID=78).
- `topics.txcourts.gov` — TOPICs, the Office of Court Administration's local-rules publication site.
- `efiletexas.gov` — the official eFileTexas service-provider page.
- `efileandservetx.zendesk.com` — the eFileTexas filing-status reference operated by the system's vendor.
- `odysseyfileandservecloud.zendesk.com` — the vendor's third-party-EFSP contact page.
- `projects.suffolklitlab.org/EfileProxyServer` — Suffolk LIT Lab's open-source EFSP proxy documentation,
  used **only** for the API's technical shape, and named as a third-party open-source source, not authority.

**One source could not be reached and is recorded as such, not worked around.** The OCA's own
`eFileTexas.gov_Returned_for_Correction_Reviewer_Process.pdf` returns an HTTPS→HTTP redirect loop through
the fetch layer; it was attempted three times and abandoned rather than retrieved by another mechanism.
The clerk-side returned-for-correction process is therefore described in §7 from the vendor status
reference **[TIER B]** and from rule text **[TIER A]**, and the official reviewer document remains unread.

**Tooling:** per the 2026-08-13 TOOLING ruling, Descrybe was not used. **No case-law retrieval was run** —
see §11 for why that is a deliberate scope limit.

---

## §1 — RECONCILE FIRST

**Six things in the record already touch this ground. This memo lands against them, not beside them.**

1. **The court-profile layer already exists as a named feature.** `feature-intake-2026-07-24.md` item F —
   per-court upload of local rules and controlling documents, with a *"periodic trigger (~every 3 months)"*
   currency warning. **§8 below changes what that currency check should look at**, and the change is
   structural rather than a refinement.
2. **The Bexar conferral gate is on the record as a hard gate.** `case-heartbeat-walkthrough-capture-
   2026-07-25f.md` records Michael's own statement that Bexar local rules require conferring on the
   hearing date, and flags it as the first point where a local rule changes *what the software will let
   you do*. **Open item H43 asks whether the rule genuinely traps a party whose opponent will not confer.**
   §5.2 supplies the rule text that bears on H43. **It does not answer H43** — that is Michael's.
3. **The Bexar mediation-before-trial gate is on the record as a CLE assertion carrying an explicit
   `[VERIFY]`.** `apil-2025-course-book-mining-pass1.md` §1.4. §5.3 supplies the local-rule text against
   which that flag was written.
4. **The noon-Monday trial announcement is already an example in the skeleton.**
   `trcp-deadline-skeleton-2026-03-01.md` §5 names it, and the Bexar Monitoring Court's agreed-order
   hearing requirement, as the local-rules tier. §5.4 supplies the operative text and the precise deadline.
5. **The e-filing envelope is already a design object.** `email-workflow-requirements.md` §1 defines
   **WF-2**, the envelope lifecycle, with 3–8 emails per envelope keyed by envelope number; the envelope
   number is a **ruled T3 design constraint** (queue, 2026-08-12). **WF-2's inbox-facing detection is
   gated on T3, which is itself unauthorized under KICK-1.** Nothing in §7 lifts that gate.
6. **The e-filing rejection trap is already a playbook item with a case cite.** `pi-case-playbooks.md`
   T9 records *Whitelock v. Stewart* (El Paso 2023) and the engine requirement that the **original
   submission timestamp is the protected date**. §2 supplies that requirement's rule-text foundation —
   **and finds a Bexar local rule that appears to say the opposite.** *(The Whitelock holding is cited as
   it already sits in the repo. This session did not retrieve or read that opinion, and does not
   characterize it — the majority-opinion rule forbids characterizing from anything less than the
   relevant passages read in full.)*

**Not restated, and deliberately used rather than re-derived:** the Task 6 memo's P-2 (added days attach
per party and only to mail), P-3 (the per-defendant answer date), and its §7 inputs/outputs vocabulary.
§10 extends that sketch; it does not mint a parallel one.

**Standing posture, unchanged:** *Ruled ≠ authorized.* No filing module and no deadline engine is in the
build queue. Nothing below is authorized to build.

---

## §2 — THE FINDING: two rules say a document is filed at two different moments, and only one of them can be right

**Stated first because the consequence is a practice consequence, and it is the malpractice-adjacent kind.**

**The statewide rule fixes filing at TRANSMISSION.** TRCP 21(f)(5), verbatim **[TIER A]**:

> "Unless a document must be filed by a certain time of day, a document is considered timely filed if it
> is electronically filed at any time before midnight (in the court's time zone) on the filing deadline.
> An electronically filed document is deemed filed when transmitted to the filing party's electronic
> filing service provider, except: (A) if a document is transmitted on a Saturday, Sunday, or legal
> holiday, it is deemed filed on the next day that is not a Saturday, Sunday, or legal holiday; and
> (B) if a document requires a motion and an order allowing its filing, the document is deemed filed on
> the date that the motion is granted."

The criminal side is the same rule in the same words. Statewide Rules Governing Electronic Filing in
Criminal Cases, Rule 2.3(a) **[TIER A]**, plus its comment, which puts the point beyond paraphrase:

> "A clerk's acceptance of a document on a weekend or legal holiday does not impact whether a document is
> timely filed under this rule."

**The Bexar county-court local rule appears to fix filing at CLERK ACCEPTANCE.** From Part 2 — General
Rules of the Statutory County Courts at Law of Bexar County, reported at section VI.E **[TIER B, and
this is the single most important Tier B string in the memo]**:

> "Documents filed with the court are considered filed when marked accepted and file marked by the Bexar
> County Clerk."

**Why this is not a quibble.** Under TRCP 3a(b) **[TIER A]**:

> "Local rules, forms, and standing orders must not be inconsistent with state or federal law or rules
> adopted by the Supreme Court of Texas. **This requirement extends to any time period provided by these
> rules.**"

That last sentence is doing the work. A local rule may add procedure; on the face of 3a(b) it **may not
move a time period the statewide rules fix**. If the county-court sentence means what it says, it is a
local rule relocating the filing moment from transmission to acceptance — and acceptance is routinely
one to three business days later, and is a clerk's act the filer does not control.

**The concrete exposure.** A document transmitted at 11:40 p.m. on the last day of limitations is filed
that day under 21(f)(5). Under the county-court sentence as written, it is filed when the clerk marks it
— which may be two days later and outside limitations. **The same document, the same transmission, two
answers.** The design consequence is already the repo's rule (`pi-case-playbooks.md` T9: store the
original submission timestamp as the protected date); what is new is that a Bexar local rule can be read
to contradict it, and a filing module that displays "filed on" needs to know which date it is showing.

**Confidence, stated honestly, and it is LOWER than §2 of the Task 6 memo.** The statewide half is Tier A
and solid. The Bexar half is **Tier B and was reproduced twice** — once in a general extraction and once
on a targeted request that expressly offered "say plainly that it does not appear" as an alternative — but
it has never been read from a clean local copy, and the same document's section numbering was reported
**inconsistently across the two fetches** (§6.3). **This is a candidate finding awaiting one concrete
look, not a conclusion.** It is stated at this length because if it is real it is the most consequential
item in the memo, and because burying it until it was confirmed would be the wrong error to make.

**The one concrete look (LR-LOOK-1):** open the Bexar county-courts-at-law local rules PDF and read the
section containing "considered filed." Confirm the sentence, its section number, and whether it is scoped
to criminal matters, to the County Clerk's marking practice, or generally.

---

## §3 — THE SECOND FINDING: Bexar civil district courts now require an A.I. certificate on every pleading

**This one is not a design item at all. It is a professional-responsibility item that lands on Michael
personally, and it lands on this project's whole reason for existing.**

Bexar County Civil District Court Local Rules, Local Rule 3.O.1, *"Updated Effective date: July 1,
2026"* **[TIER B]**:

> "A.I. Certification. All pleadings shall include a certificate on the form approved by the Civil
> District Court Judges and available on the Presiding Court website, signed by counsel or
> self-represented litigant, attesting that: a. all drafted language, quotations, sources, citations,
> arguments, and legal analyses produced by generative A.I. will—before submission—be verified by counsel
> licensed in Texas (or admitted to appear in the cause) or a self-represented litigant as accurate
> through traditional (non-A.I.) legal sources, and b. that counsel of record and/or self-represented
> litigant understands and acknowledges that they are responsible for any failure to comply with this
> order."

**Three consequences, in order of how quickly they bite.**

1. **Practice, today.** *"All pleadings"* — not "pleadings that used A.I." On the face of the rule the
   certificate rides every pleading filed in a participating Bexar civil district court, and the form is
   the one on the Presiding Court website, not one drafted here. **Whether Michael's current filings carry
   it is his to check, and it is the fastest-moving item in this memo.**
2. **Build.** A drafting system that produces pleadings for these courts must attach a court-approved
   certificate as part of the instrument, not as an afterthought. That is **FE-15 territory** (instrument
   posture as a render parameter driving title, certificate-of-service inclusion, and footer together) —
   the A.I. certificate is a second court-conditional attachment with exactly FE-15's shape, and it is
   **court-conditional, not case-type-conditional**, which no existing render parameter models.
3. **Vindication of the discipline already in force here, and it should be said plainly.** The rule
   requires that A.I.-produced analysis be verified **by a Texas-licensed lawyer against non-A.I.
   sources** before submission. That is registry discipline — *automation flags, only Michael verifies* —
   written into a court's local rules. **The project's central convention is now also a filing
   requirement in the county where most of its work happens.**

*(The certificate's own text is Tier B and comes from a fetched PDF. The operative form is the one on the
Presiding Court website; that form, not this quotation, is what gets filed.)*

---

## §4 — Registry-style propositions

Format per the common rules: proposition · cite as written · status · source named. **All UNVERIFIED.**
Deduped against all four registry files, the skeleton, and the Task 6 memo — **nothing already VERIFIED is
re-proposed**, and nothing here restates a Task 6 proposition.

**IDs are PACKET-LOCAL.** A repo-wide collision check found **zero occurrences of `LR-<n>`, `EF-<n>`, or
`BX-<n>` anywhere** in `docs/`, `db/`, `supabase/`, `CLAUDE.md`, `README.md`, or `BUILD-SESSION-NOTES.md`,
so the series are free — **but minting a durable series is not this session's act**, and `ID-DL-1` (the
Task 6 memo's identical situation) is already on the queue awaiting exactly that decision. The runner
assigns; **`ID-DL-1` should decide both memos at once.**

**LR-1 — a local rule cannot move a statewide time period.**
*Proposition:* An administrative judicial region or court may promulgate local rules, forms, and standing
orders governing local practice, but they must not be inconsistent with state or federal law or with rules
adopted by the Supreme Court of Texas, and that requirement extends to any time period provided by the
Texas Rules of Civil Procedure.
*Cite:* Tex. R. Civ. P. 3a(a), (b).
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 consolidated text, Knowledge Repo copy **[TIER A]**.
*Note:* **This is the precedence rule the court-profile layer has been missing.** It bounds the local-rules
tier: it may add procedure and gates, and it may not lengthen or shorten a rule-derived clock. §2's
conflict is the first live test.

**LR-2 — publication on the OCA website is a condition of effectiveness.**
*Proposition:* To be effective, local rules, forms, and standing orders must be published on the Office of
Court Administration's website. Supreme Court approval is no longer required.
*Cite:* Tex. R. Civ. P. 3a(c); Comment to 2023 change.
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 text **[TIER A]**; corroborated by TOPICs' own statement
that it exists in response to TRCP 3a, TRAP 1.2, and Tex. R. Jud. Admin. 10 **[TIER B]**.
*Note:* Corroborated a second time by the Bexar county-court rules' own adoption clause, which sets no
calendar date and instead says the rules *"shall become effective upon their publication on the website of
the Office of Court Administration"* (Misc. Docket Nos. 22-9081, 22-006) **[TIER B]**. See §8.

**LR-3 — justice courts compute time differently, and the difference is not a detail.**
*Proposition:* In justice court, every day is counted including Saturdays, Sundays, and legal holidays;
the period extends past a final Saturday, Sunday, or legal holiday, and also extends when the last day for
filing falls on a day during which the court is closed before 5:00 p.m.
*Cite:* Tex. R. Civ. P. 500.4(a).
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 text **[TIER A]**.
*Note:* Two departures from Rule 4. There is **no five-day weekend-exclusion rule**, and the closure
extension makes the deadline depend on **that court's calendar**, which no rule-derived tier can compute
without per-court closure data.

**LR-4 — in justice court, email service carries a 5:00 p.m. rule that district-court practice does not.**
*Proposition:* In justice court, service by fax and service by email are each deemed made the following
day if made after 5:00 p.m. local time of the recipient; mail service adds three days; notice of a court
proceeding requested by a party must be served not less than three days before the proceeding.
*Cite:* Tex. R. Civ. P. 501.4(a)(3), (a)(4), (b).
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 text **[TIER A]**.
*Note:* **Directly qualifies the Task 6 memo's §5**, which found fax to be the only hour-dependent clock.
That holds for district and county courts; **in justice court, email is hour-dependent too**, and email
service there also requires the recipient's written consent. Same statewide rulebook, different Part,
different answer.

**LR-5 — the local-rules tier is itself capped in eviction suits.**
*Proposition:* A court may adopt local rules, forms, or standing orders under TRCP 3a and Tex. R. Jud.
Admin. 10, but in eviction suits must not adopt any that require content in or with the petition beyond
Rule 510.6, authorize dismissal for an improper petition that meets or can be amended to meet 510.6, or
require mediation, a pretrial conference, or other proceeding before trial.
*Cite:* Tex. R. Civ. P. 510.24(b), (c).
*Status:* **UNVERIFIED.** *Source:* TRCP July 2026 text **[TIER A]**.
*Note:* A **negative** court-profile fact — the tier has a ceiling, and it is case-type-conditional. The
contrast is sharp: mediation before trial is a gate in the Bexar civil district courts (§5.3) and is
**forbidden as a local rule** in an eviction suit.

**EF-1 — the electronic filing moment is transmission, and the timeliness boundary is midnight.**
*Proposition:* Unless a document must be filed by a certain time of day, an electronically filed document
is timely if filed at any time before midnight in the court's time zone on the deadline, and is deemed
filed when transmitted to the filing party's electronic filing service provider — except that a document
transmitted on a Saturday, Sunday, or legal holiday is deemed filed on the next day that is not one, and a
document requiring leave is deemed filed when the motion is granted.
*Cite:* Tex. R. Civ. P. 21(f)(5); Statewide Rules Governing Electronic Filing in Criminal Cases, R. 2.3(a).
*Status:* **UNVERIFIED.** *Source:* both texts, Knowledge Repo copies **[TIER A]**.
*Note:* **The often-remembered "e-filed after 5:00 p.m. is deemed filed the next day" formulation is NOT in
either current text.** Absence claim, scope stated: a whole-file search of the July 2026 consolidated TRCP
extraction returns `5:00` on exactly nine lines, and **none is in Rule 21 or Rule 21a except 21a(b)(2),
which is fax**; `midnight` appears **once**, at 21(f)(5). The criminal e-filing rules return `5:00`
**zero** times. All 26 Tier A quotations in this memo were re-matched against the raw extraction after
drafting; all 26 matched.
**A second trap sits inside the same subsection and cuts the other way: e-filing EARLY, on a Saturday,
does not file early — it files Monday.**

**EF-2 — electronic service is complete on transmission, and carries no added days and no hour rule.**
*Proposition:* A document filed electronically must be served electronically through the electronic filing
manager if the recipient's email address is on file with the manager; electronic service is complete on
transmission to the serving party's electronic filing service provider, and the manager sends the serving
party confirmation.
*Cite:* Tex. R. Civ. P. 21a(a)(1), (b)(3); Statewide Criminal E-Filing R. 3.1, 3.2.
*Status:* **UNVERIFIED.** *Source:* both texts **[TIER A]**.
*Note:* Complements Task 6's P-2 rather than repeating it: P-2 established that only mail adds days; this
establishes **where the electronic service event lives and who timestamps it** — the manager's confirmation
is the artifact, and it is the natural binding point for **IN-4's rule that the certificate-of-service date
is stamped at the service event, never typed.**

**EF-3 — the clerk may not refuse a non-conforming filing, and the correction deadline is not an extension.**
*Proposition:* The clerk may not refuse to file a document that fails to conform to the electronic-filing
rules, or that contains sensitive data in violation of them; the clerk may identify the error and state a
deadline to resubmit in conforming format. Notifying a filer of an error does not constitute an extension
of time to file, and the correction deadline should generally not exceed 72 hours.
*Cite:* Tex. R. Civ. P. 21(f)(11), 21c(e); Statewide Criminal E-Filing R. 2.6, 4.5, and their comments.
*Status:* **UNVERIFIED.** *Source:* both texts **[TIER A]**; the "not an extension" and 72-hour sentences
are from the criminal rules' comments, which have no civil counterpart in the July 2026 TRCP text.
*Note:* **This is the rule-text foundation under `pi-case-playbooks.md` T9.** A "rejected" envelope is a
clerk-side workflow state; on the face of these rules it is **not a determination that the document was
never filed**, and it does not move the underlying deadline. A filing module must model envelope status and
filing status as **two different fields**.

**EF-4 — technical-failure relief is MANDATORY on the civil side and DISCRETIONARY on the criminal side.**
*Proposition:* If a document is untimely due to a technical failure or system outage, the filing party may
seek appropriate relief; in a civil case, if the missed deadline is one imposed by the Texas Rules of Civil
Procedure, the filing party **must** be given a reasonable extension of time. The criminal rule provides
only that relief may be sought.
*Cite:* Tex. R. Civ. P. 21(f)(6); Statewide Criminal E-Filing R. 2.3(b).
*Status:* **UNVERIFIED.** *Source:* both texts **[TIER A]**.
*Note:* Two asymmetries in one proposition, both load-bearing. **Civil vs. criminal** — the mandatory
clause exists only civil-side. And **within the civil rule**, the mandate reaches only deadlines *"imposed
by these rules"* — so a technical failure on a **limitations** date, which no rule imposes, gets discretion,
not a guarantee. That is the highest-stakes case and the one with the weakest guarantee.

**EF-5 — the sensitive-data rules differ between civil and criminal, and a filing module cannot use one list.**
*Proposition:* Civil sensitive data comprises government-issued identification numbers, financial account
numbers, and a birth date, home address, and the name of any person who was a minor when suit was filed,
with an unredacted copy retained through the pendency and any appeal filed within **six months** of
judgment. The criminal definition adds **personal phone number**, carves out a minor transferred to
district court after a Family Code § 54.02 waiver, exempts data exempt from redaction under TRAP 9.10, and
sets retention at **three years**.
*Cite:* Tex. R. Civ. P. 21c(a), (c), (d); Statewide Criminal E-Filing R. 4.1, 4.2, 4.3, 4.4.
*Status:* **UNVERIFIED.** *Source:* both texts **[TIER A]**.
*Note:* Also different **notice mechanics**: civil lets an e-filer designate the document as containing
sensitive data at filing, while the criminal rule requires the on-page phrase *"NOTICE: THIS DOCUMENT
CONTAINS SENSITIVE DATA"* regardless of medium. **A redaction check keyed to practice area, not a single
global list.** Directly relevant to `Go_Live_Gates.md` and to any generated-document pipeline.

**EF-6 — some documents must not be e-filed at all, and the exception lists differ.**
*Proposition:* Civil: wills are not required to be filed electronically; documents under seal or presented
in camera and documents to which access is otherwise restricted must not be filed electronically; a court
may for good cause permit paper filing in a particular case; an application to probate an original will
must be followed by filing the original will with the clerk within **three business days**. Criminal:
sealed and in-camera documents and access-restricted documents may not be filed electronically, and the
rules do not apply to charging instruments, hearing or trial exhibits, court reporters, or documents such
as **plea paperwork filed directly with a judge**.
*Cite:* Tex. R. Civ. P. 21(f)(4), (f)(12); Statewide Criminal E-Filing R. 1.3 and the Comment to Part 1.
*Status:* **UNVERIFIED.** *Source:* both texts **[TIER A]**.
*Note:* Three practice areas, three different carve-outs, and **all three are Michael's**. Probate carries a
three-business-day physical-delivery obligation with no electronic substitute; criminal plea paperwork
leaves the e-filing channel entirely; civil sealed material must not enter it. **A filing module that
assumes "every instrument is an e-filing" is wrong in all three.**

---

## §5 — Bexar civil district courts: structure, and the variance is the point **[TIER B throughout]**

### 5.1 The docket is three-layered, and which layer owns a matter decides who hears it

Per the local rules *"Updated Effective date: July 1, 2026"*: the **Presiding Civil District Court** hears
all nonjury matters expected to last two days or less, including pretrial matters in cases set for jury
trial; the **Monitoring Court** schedules and assigns trials on the merits in jury cases and in nonjury
cases referred to it; and after assignment for trial, motions are heard by the **assigned judge** — and
after a contested trial on the merits, all motions go to the judge who presided.

Presiding Court dockets: **8:30** (no witnesses — discovery, pleading disputes), **9:00** (witnesses or
significant court time), **1:30** walk-up (uncontested and emergency), **2:00** (tax; expunction). The
Presiding Court's own web page additionally shows an **8:45 State's protective order docket, Tuesday
through Thursday**, which did not appear in the local-rules text retrieved — **a divergence between the
published rules and the court's own page, flagged rather than reconciled.**

**The presiding judge is a rotating role, not a person.** The court page named the Presiding Judge *"for
August 2026."* A monthly rotation is the natural reading and it is **an inference, not a retrieved fact.**
If it holds, the court-profile layer cannot key judge-specific behavior to a Bexar civil nonjury setting at
all — **the judge is a function of the calendar.**

### 5.2 Conferral — the rule text that bears on H43

Local Rule 4.E requires, before setting a hearing, *"reasonable efforts to actually speak to one another"*
about date, time, format, and the substance of the motion. Every motion must certify conferral (or
reasonable efforts to confer) **about the setting**; every non-dispositive motion must **also** certify
either conferral on the merits *"in a good faith effort to resolve or narrow the issues raised"* **or**
that the movant *"has made reasonable efforts to confer … but has been unable to do so."* The rule closes:
*"The court retains discretion to strike any setting in which the motion (or an amended version of the
motion) does not include such certificates."*

**What this bears on H43, without answering it.** H43 asks whether a party whose opponent will not confer
is trapped. On this text there is an **express alternative certificate** for the unable-to-confer case, so
the rule does not appear to require an actual conversation as a precondition to a setting — but the court
**retains discretion to strike**, which is not the same as a right to set. **H43 stays open**; what changes
is that it is now a question about the exercise of discretion rather than about whether an escape hatch
exists in the text. **The build consequence either way: the certificate is a required render element with
a two-branch selection**, which is the same shape as FE-15's posture parameter.

Two of the fourteen courts run their own version. The **225th** requires *"a minimum of three legitimate
attempts to confer … on non-emergency issues"* for hearings under three hours. The **285th** provides that
a motion omitting a certificate of conference *"shall not be set for hearing until such certification has
been filed"* — **a hard bar rather than discretionary striking.** Same county, same rule set, three
standards.

### 5.3 Mediation — the CLE assertion, tested against the rule

Local Rule 9.A: *"All cases set on the jury docket must be mediated no later than 45 days before the trial
date."* Local Rule 9.D: the Mediator's Report *"must be filed no later than thirty (30) days before the
trial date,"* with the parties responsible for ensuring it is filed. Local Rule 9.E: failure *"may result
in the trial setting being dropped."* Local Rule 6.B carries the 45-day deadline a second time.

**Against `apil-2025-course-book-mining-pass1.md` §1.4's `[VERIFY]` flag:** the gate is real and it is
sharper than the CLE description — two dates, not one, and the report is a filing obligation on the
parties. **But the CLE's qualifier — "unless the parties agree not to mediate" — does not appear in the
rule text retrieved.** The 285th states its own version (no jury trial until contested issues have been
referred to mediation, *"at the discretion of the court"*). **The divergence is flagged, not resolved.**

### 5.4 The dates the local rules themselves impose

| Obligation | Deadline | Source **[TIER B]** |
|---|---|---|
| Agreed docket control order presented | within **30 days** of the first responsive pleading | LR 4.G |
| — the 225th's own version | DCO on file within **45 days** of filing the petition, eff. July 1, 2026 | 225th rules |
| Summary-judgment cutoff inside the DCO | at least **60 days** before trial, to allow TRCP 166a compliance | LR 4.G |
| Trial announcement | **12:00 p.m. on the Monday two weeks before** trial, by email to monitoringcourt@bexar.org | LR 5.C.1 |
| Motions in limine, proposed charge, realign/strike motions | to all parties by **noon the last business day** before trial | LR 5.C.2.a |
| Mediation | no later than **45 days** before trial | LR 9.A |
| Mediator's report filed | no later than **30 days** before trial | LR 9.D |
| Notice for a Monitoring Court motion hearing | minimum **3 days** | LR 5.C.1.c |
| Written order after a ruling | presented **within two weeks** of the hearing | LR 4.F.1 |
| Walk-up docket order | e-filed before, and **no more than 24 hours before**, appearing | LR 4.F.1.e |
| Extended-assignment notice of submission | set **no less than 5 days** after filing; motion and response **5 pages** each; assignment **≤120 days** | LR 3.O.2 |
| 225th: SJ submission | set on submission **45 days** from filing; hearing request within **10 days** of filing | 225th rules |
| 225th: hearing confirmation (≥3 hours) | confirm **the Thursday of the week prior**, or the setting may be dropped | 225th rules |
| 285th: orders after ruling | temporary **10 days**; final judgment **30 days** | 285th rules |

**Trial must be set within the Supreme Court's disposition standards as the local rules restate them:**
civil jury 18 months and civil nonjury 12 months from appearance date.

### 5.5 The structural change, and it is the reason this task could not be answered from memory

> "The 225th and 285th Judicial District Courts of Bexar County, Texas have elected not to participate in
> the Presiding Court and Monitoring Court dockets of the Bexar County Civil District Courts. As a result,
> the Local Rules addressing scheduling and proceedings in the Presiding and Monitoring Courts do not apply
> to the 225th and 285th District Courts."

Standing orders, the family-law policies at LR 3.P, Local Rules 1, 10, 11, and 12, and the administrative
office information still apply to both. **So the same county now runs two scheduling regimes side by side,
and which one governs is a function of the court the case landed in.** Any court-profile model keyed to
*county* rather than to *court* is wrong for Bexar civil on its face. **Whether this opt-out is itself the
July 1, 2026 change, or predates it, was not established** — the retrieved text carries no separate
effective date for the paragraph.

### 5.6 Bexar routes orders through the e-filing envelope's COMMENT field

Orders must be e-filed, not emailed — the Presiding Court page states that email orders will not be
accepted and grounds the requirement in **TRCP 21(f)(10)**. Routing rides a structured comment string that
varies by destination: *"Presiding Court [Time/Type of Docket] Docket [Date of Docket]"*; *"[Assigned
Court] [Date of Hearing]"*; *"Forward to Visiting Judge [Name] [Date of Hearing]"*; *"[Type of Order] –
Staff Attorney Review Required."* For matters heard by a sitting or visiting judge, **the envelope number
must additionally be emailed to the court.**

**This is the single most build-relevant Bexar fact in the memo.** The envelope number is not merely the
dedupe key WF-2 already records — **it is a deliverable the filer owes the court by a second channel**, and
the comment field is a **court-specific structured template**, not free text. Two more local requirements
sit alongside: proposed orders must be filed **separately** from the motion (LR 4.F.3, except motions and
orders setting hearings), and every proposed order must carry **signature blocks for all counsel of
record** (LR 4.F.2).

---

## §6 — Bexar criminal, and the county courts at law **[TIER B throughout]**

### 6.1 Criminal district courts — the 2025 rules

Bexar's criminal district court local rules are the **2025** edition per the county's own index page; **the
document as retrieved states no effective date and no amendment history.** Under LR-2 that is not fatal —
the effective date is the OCA publication date, not a line in the document — but it does mean the document
cannot date itself.

What it imposes: applications must be in writing, state grounds and relief, **have a proposed order
attached**, and be filed with the court; three days' notice to the adverse party for a hearing not
presented during a hearing or trial, with parties notifying each other of proposed orders by the next
business day; **not less than ten days' notice to defendants of a pretrial hearing**; and **all preliminary
matters filed seven days before the hearing** absent good cause. Plea-bargain terms are in writing, signed
by counsel and defendant, and filed. Resets and continuances are governed by **Code of Criminal Procedure
ch. 29** with no local variance stated. Trial-setting precedence runs jail cases over bond cases, longest
custody first, then oldest indictment. Vacation notices are filed through the District Clerk's website
**and** the courts where the attorney is set.

**No conferral requirement and no announcement deadline appear** — the civil side's two signature gates are
absent on the criminal side. **A court-profile model that assumes gates generalize across practice areas
within one county is wrong here.**

### 6.2 County courts at law — where Bexar's misdemeanor work lives

Civil: **County Courts at Law 3 and 10.** Criminal: **1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15**, with
drug, DWI, veterans, mental health, and family violence specialty dockets. **Any Bexar county court at law
may hear civil or criminal cases** to expedite dockets — so the civil/criminal split is an assignment, not
a jurisdictional wall.

Notice periods are defined in a way the rule-derived tier cannot reproduce: **three days' notice means
three full working days** must elapse between service of the setting papers and the hearing; a **trial
setting requires twenty-one full calendar days including weekends and holidays**. **Two different day-types
inside one local rule set.** Fiats and orders setting hearings are set by the Presiding Judge and **no
setting is accepted by phone.** Mediation appears again in a different form: a motion to set for trial must
represent that the parties have mediated or will mediate before trial, absent a filed motion showing
mediation inapplicable (II.J). Criminal docket call: notify the coordinator before **8:50 a.m.**, which
buys until **5:00 p.m. the next working day** to appear for a resetting.

### 6.3 The extraction problem, characterized rather than smoothed

The county-court rules were fetched twice. The two passes **disagreed about the document's own section
scheme** — one reported a Part VI containing the e-filing provisions, the other reported Parts A–D and
said no Part VI exists while still citing "Section VI.E." One pass also produced this sentence:

> "All attorneys must electronically file documents through any alternative electronic document filing
> transmission system, except in the event of an emergency."

**That sentence is almost certainly corrupt.** The statewide criminal rule it tracks reads: *"Attorneys
must **not** file documents through any alternative electronic document filing transmission system, except
in the event of an emergency or where these rules provide for the use of the alternative filing
transmission system"* **[TIER A, Statewide Criminal E-Filing R. 1.2, quoted in full]**. As rendered, the
local sentence says the opposite of the statewide rule and contradicts its own next sentence.

**Per Q-STAT-1 this is REPORTED, not repaired.** No corrected wording is proposed and the sentence is not
quoted anywhere else in this memo. It is recorded here because two published normalizers in this project
were already silently wrong, and because **the same fetch layer produced §2's headline string** — which is
precisely why §2 carries a concrete look rather than a conclusion.

---

## §7 — eFileTexas and the EFSP layer

### 7.1 The mechanism is statutory, and it is a two-party chain

TRCP 21(f)(3) **[TIER A]**: *"Electronic filing must be done through the electronic filing manager
established by the Office of Court Administration and an electronic filing service provider certified by
the Office of Court Administration."* The criminal rule adds an alternative: through the EFM and a
certified EFSP *"or through another electronic filing portal approved by the Office of Court
Administration"* **[TIER A, R. 2.1]**.

**Two hops, and 21(f)(5) fixes filing at the FIRST one** — transmission to the EFSP, not arrival at the
EFM and not acceptance by the clerk.

### 7.2 Envelope lifecycle **[TIER B — vendor status reference]**

Draft → Submitting → Submitted → Pending → Under Review → Reviewed → **Accepted** *(clerk has accepted and
stamped)* | **Rejected** *(returned for correction; the envelope may be copied for resubmission)* |
**Returned for Correction** *(same meaning, but the envelope **cannot** be copied)*. Off the main line:
**Cancelled** (filer, before the court queue), **Error**, **Submission Failure** (PDF unprocessable),
**Court Processing**, **Receipted** *(auto-accepted by court configuration)*, **Served**, **Service
Incomplete** *(a contact's email failed)*, **Undefined**.

**Three things the record should take from this list.**

1. **`Rejected` and `Returned for Correction` are different states with different affordances**, and the
   difference is operational, not cosmetic: one can be copied forward, one must be rebuilt. WF-2's
   envelope-state tracking needs both, not a single "rejected."
2. **`Receipted` means a court auto-accepted with no clerk review**, per court configuration — so
   "accepted" does not imply a human looked at it, and absence of rejection is not clearance.
3. **`Service Incomplete` is a per-recipient failure state**, which is exactly the surface **IN-4's
   mixed-service sub-question** needs (*"some recipients served one day, others later"*) and exactly what
   **EF-2's manager confirmation** is the positive half of.

**The status vocabulary is the vendor's. The legal effect is the rules'**, and they do not line up: no
status in that list is the moment 21(f)(5) makes dispositive. **The filing module must derive the filed
date from the transmission timestamp and treat every status above as workflow metadata.**

### 7.3 Rejection is a workflow event, not an unfiling — subject to §2

EF-3 is the governing pair: the clerk **may not refuse** a non-conforming filing but may state a
resubmission deadline; notifying the filer **does not extend** the time to file; the correction window
should generally not exceed 72 hours. The Bexar County Clerk's own FAQ lists the practical rejection
reasons — insufficient fees, wrong clerk, formatting, illegible PDF, combined documents, sensitive data
**[TIER B]** — and confirms file-stamped copies return through the EFSP interface and by email.

**And this is exactly where §2 bites.** If the Bexar county-court sentence means what it appears to say,
then in that court the acceptance event is the filing event, and a rejection is not merely workflow. **The
two readings differ on the only date that matters.**

### 7.4 API availability — there is one, and it is not open

**There is a real programmatic interface and it is not self-serve.** The EFM exposes an **OASIS LegalXML
Electronic Court Filing (ECF) SOAP** interface, ECF v4 and v5, organized as Major Design Elements:
FilingReviewMDE (submission, cancellation, status), FilingAssemblyMDE (inbound acceptance/rejection
callbacks), ServiceMDE (party notification), CourtRecordMDE (case search), and — ECF 5 only —
CourtSchedulingMDE and CourtPolicyMDE (court-specific requirements and code lists). Per-court accepted
values arrive as **genericodes** requiring dynamic per-jurisdiction validation, and some objects (attorneys,
for instance) must be pre-created through the vendor's proprietary API before they can be used in a filing.
*(Source: Suffolk LIT Lab EFSP proxy documentation — third-party open source, named as such, used only for
technical shape.)*

**Access requires becoming a certified EFSP.** TRCP 21(f)(3) makes OCA certification the gate; the official
eFileTexas service-provider page lists certified providers but **publishes no certification process and no
API documentation**; the vendor's own third-party-EFSP page says only to email its EFM contact address
**[TIER B]**.

**The honest bottom line, and it is a scoping answer more than a technical one:** integrating filing
submission into this app means **becoming an EFSP or contracting with one** — a commercial and regulatory
undertaking, not an API key. **That is Q-6's shape exactly** (CourtListener's API is barred from the app
until Michael resolves terms with FLP), and it should be recognized as the same class of decision before
any filing-module design assumes submission is in scope. **Nothing here proposes doing it.**

---

## §8 — Currency: the check the court-profile layer was going to get wrong

**Feature-intake item F specifies a periodic warning to verify whether new local rules have issued. On
LR-2 that check has a canonical target it did not have when item F was written.**

1. **Effectiveness is conditioned on OCA publication, not on a court's own website.** A rule on
   bexar.org that is not published on TOPICs is, on the face of 3a(c), **not effective** — and a rule
   published on TOPICs is effective whether or not the county site is current.
2. **The document's own date is not the effective date, and sometimes there is no date at all.** The Bexar
   county-court rules say they *"shall become effective upon their publication"* and leave the calendar
   date blank. The criminal district court rules carry no date. **A currency check that reads the PDF's
   date field fails on two of the three Bexar rule sets that matter to this practice.**
3. **The county's own index page hosts multiple vintages simultaneously** — a civil set at one document ID,
   a **2024** civil set at another, a criminal **2025** set, and a further civil entry at a third ID whose
   relationship to the "Updated as of July 1, 2026" document was not established. **Retrieving "the Bexar
   civil local rules" from the county site is ambiguous today.**
4. **TOPICs could not be searched through this session's fetch layer** — the search is client-rendered and
   returned an empty result table. **What is actually published there for Bexar was NOT established**, and
   claiming otherwise would be exactly the inference LR-2 forbids.

**The design consequence: the court-profile layer should treat the OCA publication record as the
authority and the county PDF as a convenience copy** — store the publication reference, not just the file
— and its currency trigger should compare against that record. **The three-month cadence in item F is
unaffected; what changes is what it compares against.**

**The one concrete look (LR-LOOK-2):** on TOPICs, filter County = Bexar and record, for each court group,
what is published and its publication date. That single pass settles items 1–4 for every Bexar court at
once, and it is the natural first exercise of the court-profile feature.

---

## §9 — Court-by-court variance, collected

**Not a summary — a list of the places where generalizing would produce a wrong answer.**

| Dimension | District (civil) | County court at law | Justice court | Criminal district |
|---|---|---|---|---|
| Time computation | TRCP 4 — Sat/Sun/holiday excluded in periods ≤5 days | TRCP 4 | **500.4 — every day counted; court-closure extension** | TRCP 4 / CCP |
| Fax service after 5 p.m. | next day (21a(b)(2)) | next day | next day (501.4(a)(3)) | next day |
| **Email** service after 5 p.m. | **no hour rule** | no hour rule | **next day (501.4(a)(4))** | no hour rule |
| Added days for mail | 3 (21a(c)) | 3 | 3 (501.4(b)) | 3 |
| Conferral before setting | **required, two-branch certificate (LR 4.E)** | not stated | n/a | **not stated** |
| Mediation before trial | **45 days before trial, jury docket (LR 9.A)** | representation in the motion to set (II.J) | **forbidden as a local rule in evictions (510.24(b))** | n/a |
| Technical-failure relief | **mandatory for rules-imposed deadlines (21(f)(6))** | same | same | **discretionary only (R. 2.3(b))** |
| Sensitive data | 21c; 6-month retention | 21c | 21c | **R. 4.1; adds phone; 3-year retention** |
| Scheduling regime | **Presiding/Monitoring — except the 225th and 285th** | Presiding Judge sets; no phone settings | per court | per court, indictment-distribution order |

**And inside the Bexar civil district courts alone**, the conferral consequence is discretionary striking
under LR 4.E, three documented attempts under the 225th, and an absolute bar on setting under the 285th.
**County is the wrong key. Court is the key, and for two Bexar courts the case type is a second key.**

---

## §10 — What a deadline engine and a filing module would consume

**PROPOSED design input. Not a schema, not authorized, nothing to build from.** Vocabulary continues the
Task 6 memo's §7 and `prop-code-53-28-deadline-engine-design.md` §3 rather than minting parallel terms.

**Deadline engine — new inputs this memo adds:**

| Input | Scope | Why it cannot be derived |
|---|---|---|
| Court identity, at the level of the individual court | **case** | LR 4.E vs. 225th vs. 285th differ inside one county; the Presiding/Monitoring regime is court-scoped |
| Court group (district / county at law / justice / criminal) | **case** | selects the computation ruleset — 500.4 is not Rule 4 |
| Local-rule set + its **OCA publication reference** | **court** | LR-2: effectiveness is publication, not the file |
| Court closure calendar | **court** | 500.4(a)(3)(B) makes a justice-court deadline depend on it |
| Trial setting | **case** | already an anchor; **now also the anchor for mediation −45, mediator's report −30, announcement −(Monday, 2 weeks), limine −(noon, last business day)** |
| First responsive pleading date | **case** | LR 4.G's DCO clock (and the 225th's petition-date variant) |
| Transmission timestamp, per filing | **per filing** | the filed date under EF-1; **never the acceptance timestamp** |
| Envelope number + envelope status | **per filing** | WF-2's key; in Bexar also a deliverable owed the court by email (§5.6) |
| Service event: method, recipient, timestamp, manager confirmation | **per (instrument, recipient)** | EF-2; IN-4 binds the certificate date to this event |

**Filing module — what it would consume, stated as constraints rather than features:**

1. **Filed date is derived from transmission and is a different field from envelope status.** Displaying
   the acceptance date as "filed" is the §2 error in software.
2. **A local-rule tier that gates but never re-times.** LR-1 is the invariant: local rules add
   certificates, conferral, mediation, announcements, order-submission windows; they do not move a TRCP
   period. **Any court profile that would shorten a rule-derived deadline is a bug, not a configuration.**
3. **Court-conditional render parameters, not just case-type-conditional.** The A.I. certificate (§3), the
   conferral certificate's two branches (§5.2), the comment-string template and separate-order rule
   (§5.6), and the all-counsel signature blocks are all **court-keyed attachments to an instrument** —
   FE-15's shape with a different selector.
4. **Practice-area-keyed redaction and channel rules.** EF-5 and EF-6: one sensitive-data list is wrong,
   and three practice areas have three different sets of documents that leave the e-filing channel.
5. **Weekend transmission moves a filing FORWARD.** EF-1's Saturday clause is not a deadline extension; it
   is a filing-date shift, and it applies to early filings too.
6. **Submission is not in scope by default.** §7.4: filing *through* the app means EFSP certification.
   **Reading and tracking envelopes is a different, smaller problem** — and even that is gated on T3
   through WF-2, which KICK-1 leaves unauthorized.

---

## §11 — Open questions, full text (QR-1)

**Packet-local Q1–Q6. No durable IDs minted** — see §4; `ID-DL-1` is already queued and should decide the
series for the Task 6 memo and this one together.

**Q1.** Part 2 of the Bexar statutory county courts at law local rules appears to state that *"Documents
filed with the court are considered filed when marked accepted and file marked by the Bexar County
Clerk,"* while TRCP 21(f)(5) and Statewide Criminal E-Filing Rule 2.3(a) both fix filing at transmission to
the filer's EFSP, and TRCP 3a(b) provides that a local rule must not be inconsistent with a Supreme Court
rule and that the requirement *"extends to any time period provided by these rules."* **The local sentence
reached this memo only through a summarizing fetch layer, and that same layer garbled a different sentence
in the same document (§6.3). Will you make the concrete look (LR-LOOK-1) — read that section in a clean
copy and confirm the sentence, its number, and its scope? If it reads as reported, do you want it opened as
a registry entry, and does the filing module display the transmission date, the acceptance date, or both?**

**Q2.** Bexar Civil District Court Local Rule 3.O.1 requires that **all pleadings** include a
court-approved A.I. certificate attesting that generative-A.I.-produced language, quotations, sources,
citations, arguments, and legal analyses will be verified before submission by a Texas-licensed lawyer
through traditional non-A.I. sources. **This is a live filing requirement in your primary civil forum, not
a design question. Do your current Bexar civil filings carry that certificate on the Presiding Court's
approved form? And should the drafting side treat it as a court-keyed required attachment on the FE-15
render path, alongside the conferral certificate?**

**Q3.** TRCP 3a(c) makes publication on the OCA's website a condition of a local rule's effectiveness, the
2023 amendment removed Supreme Court approval, and the Bexar county-court rules set no calendar date and
instead take effect *"upon their publication on the website of the Office of Court Administration."* The
county's own index page currently hosts several vintages, and TOPICs could not be searched through this
session's fetch layer. **Do you want the court-profile layer's currency check (feature-intake item F)
re-specified to compare against the OCA publication record rather than a county PDF's date — storing the
publication reference as the authority and the PDF as a convenience copy? And will you make LR-LOOK-2 (one
TOPICs pass filtered to Bexar) the first exercise of that feature?**

**Q4.** H43 asked whether a Bexar party whose opponent will not confer is genuinely trapped. Local Rule 4.E
supplies an express alternative certificate — *"has made reasonable efforts to confer … but has been unable
to do so"* — while reserving the court's discretion to strike the setting; the 225th requires three
documented attempts; the 285th bars any setting until a certificate of conference is filed. **Does that
change your answer to H43, and does the heartbeat's Bexar conferral gate become a soft gate with a
two-branch certificate rather than the hard block it is currently modeled as — differently per court?**

**Q5.** `apil-2025-course-book-mining-pass1.md` §1.4 carries a `[VERIFY]` on the CLE assertion that a Bexar
case cannot reach trial without mediation unless the parties agree not to mediate. Local Rule 9.A requires
mediation no later than 45 days before trial for all cases on the jury docket and 9.D requires the
mediator's report 30 days before trial, but **no "unless the parties agree" qualifier appears in the rule
text retrieved**, and the 285th states its own discretionary version. **Do you verify the 45/30 pair, and
do you want the CLE's agreement qualifier recorded as unsupported by the rule text, corrected in the mining
doc, or left alone pending your own read?**

**Q6.** Filing *through* the application requires the OCA-certified EFSP relationship described in §7.4 —
an ECF SOAP interface reached only by becoming or contracting with a certified provider, with no published
certification process and no public API documentation. That is the same class of decision as Q-6, which
bars wiring the CourtListener API into the app until you resolve terms with FLP. **Do you want a standing
constraint recorded that no filing-submission integration is designed until you rule on the EFSP question
— so that a future filing module is scoped from the start to envelope tracking and document preparation,
not submission?**

---

## §12 — What this memo did NOT do

- **It did not verify anything, supply or upgrade a cite, or touch a registry file.** Nothing here has a
  status other than UNVERIFIED.
- **It did not mint an ID series.** LR-*/EF-*/Q1–Q6 are packet-local; the repo-wide collision check that
  found the namespaces free is recorded in §4 so the runner does not have to re-run it.
- **It did not run case-law retrieval, deliberately.** *Whitelock* and *Verhalen* already sit in
  `pi-case-playbooks.md` T9 with the engine requirement they generated. Re-retrieving them would duplicate
  filed work, and characterizing either from anything short of a full read of the relevant passages is
  barred by the majority-opinion rule. **§2 needed rule text, and rule text is Tier A.**
- **It did not read the OCA's own returned-for-correction reviewer document** — the fetch layer loops on it
  (§0). That gap is why §7.3 leans on rule text plus a vendor page rather than the clerk-side process
  document, and it is the one source worth a second attempt in a later pass.
- **It did not establish what is published on TOPICs for Bexar.** LR-LOOK-2 is the look; asserting the
  publication state without it would be the inference LR-2 itself forbids.
- **It did not repair the garbled county-court sentence** (§6.3). Per Q-STAT-1 it is reported and
  characterized, and no replacement wording is proposed anywhere.
- **It did not treat any Tier B string as quotable rule text**, including the two strings the memo's own
  headlines rest on. Both carry concrete looks instead.
- **It did not touch federal practice.** The W.D. Tex. San Antonio division's per-judge questionnaires are
  named in feature-intake item F and are a separate pass; nothing here surveys them.
- **It did not survey standing orders beyond the one the county publishes** (the Civil District Judges'
  standing order attached to divorce and SAPCR petitions, noted for completeness and out of Michael's
  practice areas). A standing-order sweep is its own task.

---

*11 propositions · 6 open questions · 2 concrete looks (LR-LOOK-1, LR-LOOK-2) · rule text sourced Tier A to
the July 2026 consolidated TRCP and the statewide criminal e-filing rules in Michael's Knowledge Repo;
every Bexar local rule and every e-filing platform fact sourced Tier B and marked. Authored 2026-08-15
Central under DT-1. PROPOSED design input; nothing ruled, nothing built, nothing verified.*
