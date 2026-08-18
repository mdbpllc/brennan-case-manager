# CANDIDATE TEXT for `registry-courtlistener-integration-design.md` §0.1

**Canonical repo path:** `docs/specs/q5-v8-section-0-1-candidate-text-2026-08-17.md`
**Status: CANDIDATE TEXT — PROPOSED. DATA PREP. THIS DOCUMENT ADJUDICATES NOTHING.**
**`registry-courtlistener-integration-design.md` WAS NOT EDITED and must not be edited by any
session on the strength of this file.** The text below is input to Michael's ruling.
**Authored:** 2026-08-17 Central (DT-1). Design side, Cowork, Opus 5, CHAT-DISPATCH v3 **T-25**,
against repo HEAD `5447538`.

---

## §A — What this is answering, and the framing mismatch it does not resolve

**`V-8` was RULED 2026-08-13 (#73):** *"RECORD ALL THREE HAZARDS in
`registry-courtlistener-integration-design.md` §0.1 — the duplicate-cluster hazard, the *Irwin*
no-cite/no-typing class, and a standing rule that a citing count is never displayed as a precise
figure and never read as a currency signal. They join the existing cluster-vs-sub-opinion hazard.
... §0.1 is UNEDITED — the design-doc edit is design-side and PENDING."*

**THE MISMATCH, CARRIED FORWARD AND NOT RESOLVED HERE.** The queue's `V-8` row reads **RULED at #73,
execution pending**; the #98 packet's §7 carries the same item as **"Q5 — OPEN."** Both cannot be
right about its status. The fifty-third invocation annotated the row with the mismatch and **changed
neither side**. **This document does the same.** Which framing governs is Michael's, and it decides
something concrete: **whether §B below is executing a ruling or proposing one.**

**Accordingly the candidate text is split into two parts and they must be ruled separately:**

- **§B — the ruled three.** Drafted to execute V-8 as ruled. If the row's framing governs, this is
  execution of an existing ruling and needs only Michael's confirmation that the text says what he
  ruled.
- **§C — four additions that are NOT ruled**, found by the T-20/T-21 records pass this session.
  **Each needs its own ruling.** They are set apart precisely so nothing new rides into §0.1 on the
  back of a 2026-08-13 ruling that did not contemplate it.

---

## §B — CANDIDATE TEXT executing the V-8 ruling (three hazards + the standing rule)

> *Drafted to sit beneath the existing majority-opinion paragraph in §0.1, in that section's own
> voice and format — hazard, live exhibit, rule. Nothing in the existing paragraph is altered.*

---

### 0.1.1 Duplicate-record hazard (added per V-8, ruled 2026-08-13)

**FLP can hold more than one record of the same decision, and the records disagree about facts a
reader will take as findings.** This is distinct from the cluster/sub-opinion collision above: there
the ids collide within one cluster; here there are two clusters.

- ***In re Alford Chevrolet-Geo*, 997 S.W.2d 173 (Tex. 1999) — two clusters, one reporter cite.**
  Cluster `2419858` (`date_filed` 1999-08-26; carries the reporter cite with star pagination, the WL
  cite `1999 WL 374136`, and 207 citing references) and cluster `5269700`, styled "In re
  Chevroletgeo" (`date_filed` 1999-06-10; two sub-opinions `5097124`/`5097125`; 3 citing
  references), same docket 97-1171. **A lookup landing on `5269700` reports three citing references
  instead of 207 and reads as a dead authority.**
  **The dates are not two decisions.** The opinion's own caption reads *"Decided June 10, 1999.
  Rehearing Overruled August 26, 1999."* — **rehearing was OVERRULED, so nothing was superseded**;
  the two clusters simply carry different dates out of the same caption. *(Read 2026-08-17,
  T-20/T-21 staging §1.4. Supersedes the earlier unasserted inference that the June 10 record was
  superseded on rehearing — that inference was expressly flagged as inference and is contradicted by
  the text.)*
- ***Allstate Ins. Co. v. Irwin*, 627 S.W.3d 263 (Tex. 2021) — two clusters, NO cite.** The reporter
  citation returns zero hits; neither cluster carries a citation array, an author, or an
  opinion-type marker. **See 0.1.2.**

**The rule: never treat a single cluster as the case.** Before relying on any cluster's metadata,
confirm whether a second record of the same decision exists — by docket number, by reporter cite,
and by case name, since a duplicate may be styled differently (*"In re Chevroletgeo"*). Where two
records exist, **identify which carries the reporter cite and star pagination and treat that as the
operative record for citation** — but see 0.1.4 before discarding the other.

### 0.1.2 The *Irwin* class — records FLP cannot type (added per V-8, ruled 2026-08-13)

**Some records carry no citation array, no author, and no opinion-type marker.** For these the
majority-opinion rule above **cannot run at all**: there is no `sub_opinions` typing to enumerate and
no authoring language exposed in the data. The rule's method presupposes data FLP does not always
have.

Observed on: ***Allstate v. Irwin*** (two clusters, no cite, no typing); ***In re Volt Power***,
cluster `9390268`, and ***In re Redman***, cluster `9432901` — both single `010combined` harvests
from TAMES with **empty `citations`, `citation_count` 0, empty `author_str`, empty `judges`**.

**The rule: when the data cannot support positive identification, say so and stop.** Do not
characterize the opinion, do not infer the majority from position or from the combined text, and do
not treat the absence as evidence about the case. **What the rule should require in that situation is
`V-9`, which is Michael's — amending a binding rule is his act, and a private-copy workaround is not
a rule.** *(Live illustration of the workaround and of its limits: *Irwin*'s majority was identified
2026-08-17 from a paginated Westlaw/Lexis copy, which states on its face that Devine, J. delivered
the opinion of the Court for five justices with Hecht, C.J. dissenting for four. That answered one
entry. It did not answer V-9.)*

### 0.1.3 Citing counts are not figures and not currency (added per V-8, ruled 2026-08-13)

**A `citation_count` is never displayed as a precise figure and is never read as a currency signal.**
It is a property of FLP's citation graph at a moment, not of the authority.

- **The same decision returned 207 and 3** depending on which duplicate record was read (0.1.1).
  Neither number is wrong about the graph; both are useless as facts about the case.
- **A quiet period is a flag, not a finding.** *Peeples v. Fourth Supreme Judicial Dist.*, 701 S.W.2d
  635 (Tex. 1985) shows citing traffic tailing off around 2020 rather than 2025–26. That is at least
  as likely to reflect FLP's graph coverage as anything about the case, and a 1985 foundational
  privilege case being cited less in the 2020s is unremarkable. **Recorded because a quiet period is
  exactly the pattern a currency check exists to notice — and exactly the pattern that misleads.**

**Where a count is shown at all, it is shown as a range or as a direction of travel with its
as-of date**, and it never appears in a computed output that a reader could take as a legal
conclusion. **This is an instance of §0's governing principle, not an exception to it: automation
flags; only Michael verifies.**

---

## §C — FOUR ADDITIONS THAT ARE NOT RULED — each needs its own ruling

**These were found by the 2026-08-17 records pass, after V-8 was ruled. They are drafted so Michael
can adopt, reject or edit each independently. NONE may be folded into §B's execution.**

### C-1 — Same docket, wrong document *(PROPOSED — new hazard class)*

**FLP's record for a docket can be a procedural ORDER rather than the merits opinion, and nothing in
the record's fields says so.**

> ***In re Sting Soccer Group, LP***, cause 05-17-00317-CV (Tex. App.—Dallas). A docket search returns
> **exactly one** FLP record: cluster `4417125`, opinion `4194378`, `dateFiled` **2017-08-08**,
> `status "Published"`. **August 8, 2017 is an order setting a response deadline on the mandamus
> petition.** The merits opinion — November 30, 2017, Lang, J., **MEMORANDUM OPINION**, conditionally
> granting in part — **is not in FLP at all.** A researcher who retrieves this docket and reads what
> comes back is reading a briefing order.

**The milder form of the same class is a docket carrying two records where only one is meant:**
*In re Volt Power* (Apr. 5 substantive / Apr. 20 mootness dismissal) and *In re Redman* (Oct. 11
substantive / Oct. 18) each return two, both `status "Published"`, both with empty citation arrays.
**Three of the six records looks run 2026-08-17 hit this class.**

**Proposed rule:** a docket-number retrieval **confirms the document's own date and disposition
against the citation being checked** before anything is read from it. Where the retrieved date does
not match the cite, the retrieval has not found the authority.

### C-2 — The duplicate record can be the only thing that makes the majority rule runnable *(PROPOSED — an inverse, and it constrains C-1's remedy)*

**At *Alford*, the record that is operative for citation cannot answer the majority question, and the
record that is a duplicate can.**

- Cluster `2419858` — the operative record — is a single `010combined` opinion: lead and separate
  opinion fused into one document, **no type marker, no author distinction.**
- Cluster `5269700` — the duplicate — splits the same decision into `5097124` (`020lead`,
  **Hankinson, J.**) and `5097125` (`035concurrenceinpart`, **Hecht, J.**).
- The proposition relied on sits in `5097124`, the lead. **That is a positive identification, and it
  was only available from the duplicate.**

**Why this matters more than as a curiosity:** a rule of the form *"prefer the record carrying the
reporter cite and discard the other"* — the obvious remedy for 0.1.1 — **would have destroyed the
evidence that satisfied the binding majority-opinion rule.** **A duplicate is a citation hazard and
an attribution asset, and the two pull in opposite directions.**

**Proposed rule:** duplicate records are **reconciled, never discarded**. The record carrying the
reporter cite governs the citation; **any record in the set may govern the typing.**

### C-3 — `precedential_status` does not track the Texas designation *(PROPOSED)*

**Every Texas court-of-appeals record read 2026-08-17 returned `status: "Published"` — including a
procedural order (C-1), and including records whose companion merits opinions the courts themselves
designate MEMORANDUM OPINION.**

**Proposed rule:** FLP's `precedential_status` is **never** evidence of a Texas opinion's
designation. A memorandum-vs-published question is answered only from the court's own document.

**This one has a consequence beyond §0.1 and is flagged rather than followed:** `precedential_status`
is carried as a DESIGN-STATUS-ONLY item from the 08-13 ruling run. **If it is ever wired into the
registry as a field, this is what it would and would not mean.**

### C-4 — FLP's citation links can attach an id to an "Id." that resolves to the wrong authority *(PROPOSED — adjacent, arguably §0.1's neighbour rather than §0.1)*

In FLP's HTML for *Trahan v. Lone Star Title Co. of El Paso*, 247 S.W.3d 269, a footnote's **"*Id.*"**
— which on the page plainly refers back to Tex. R. Civ. P. 192.3(h) — carries markup linking it to
***Equisource Realty Corp. v. Crown Life Insurance Co.***

**A reader taking FLP's citation links at face value would attribute a rule quotation to a case that
has nothing to do with it.**

**Proposed rule:** FLP's inline citation links are navigation, **never provenance**. A cite is read
from the opinion's own text, not from the `data-id` attached to it. *(Michael may prefer this in
§0.1, in §5, or nowhere — it is a reading hazard rather than a retrieval-architecture hazard, and it
is put where it was found rather than filed by assumption.)*

---

## §D — What this document does NOT do

- **It does not edit `registry-courtlistener-integration-design.md`.** The dispatch expressly bars
  that and so does this file.
- **It does not resolve the V-8 / Q5 framing mismatch** — see §A.
- **It does not answer `V-9`.** §B's 0.1.2 records the gap and names V-9 as the place it is decided.
  *Irwin*'s majority being identifiable from a private copy is not an amendment to a binding rule.
- **It does not touch `CLAUDE.md`.** The majority-opinion rule is binding there and amending it is
  Michael's act, not a side effect of a design-doc note — V-8's own words.
- **It changes no `Q-6` posture.** Nothing here authorizes wiring the CourtListener API into the
  app; that remains barred until Michael resolves terms with FLP. **Everything above concerns
  design-session research use, which is within bounds.**
- **It creates no registry entry and verifies nothing.**

---

## §E — Sources

All findings above come from the T-20/T-21 records pass staged at
`docs/specs/registry-records-look-staging-2026-08-17.md`, which names its source per item: FLP /
CourtListener API reads 2026-08-17 (throttled at 5 req/min and paced), the Fifth Court of Appeals'
own PDF for *Sting Soccer*, and the Lexis printouts in `Documents\Knowledge Repo\Opinions\` pulled by
Michael's hand under `WESTLAW-5`. **No finding here rests on a source not named there.**
