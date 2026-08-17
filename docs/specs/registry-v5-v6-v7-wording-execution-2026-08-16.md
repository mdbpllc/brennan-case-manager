# Registry Wording Execution — V-5, V-6, V-7 (the three #73 rulings never executed)

**Status: DRAFTING RECORD. V-5 IS EXECUTED BY THE PACKET THAT CARRIES THIS FILE; V-6 AND V-7 ARE
PROPOSED AND ADOPTED BY NOBODY.** Nothing here is verified and nothing here may be read as
verification. **Only Michael verifies.** The V-6 and V-7 wording below is drafted under ROUTE-C —
standing law since 2026-08-16 (#95) — which means it is **queued for his adopt / reject / edit,
never adopted silently**, and each entry is put **independently, never as a package.**

**Canonical repo path:** `docs/specs/registry-v5-v6-v7-wording-execution-2026-08-16.md`.
Duplicate-routing check run at drafting: no file in `docs/specs/` carries V-5/V-6/V-7 wording. The
adjacent drafting record for the route-(c) §9 adoptions is
`statute-pass-registry-retrieval-2026-08-14.md` §9, which this file deliberately does **not** touch
or duplicate — that section is closed and carries an ADOPTED header.

**Authored 2026-08-16 (Central, DT-1 — the container read 08-17 UTC from session start; clock-checked
23:02 CDT).** Design session, Opus 5, Cowork, device bridge granted (two folders, one dialog: the
checkout and `Documents\Knowledge Repo`). Session type per §7.2: **execution, not adjudication** —
this session adjudicates nothing.

---

## §1 — What this document is, and what fires it

`V-EXEC`, entered on the attorney review queue 2026-08-16 (#95): *"fire the next dispatch's Task A —
draft the V-5 splits (entries 19/20/21 → six entries), the V-6 rewords (entries 33/34), and the V-7
narrowing (entry 23) per #73's terms."*

The three rulings were made 2026-08-13 (#73) and never executed, because **specs are read-only in
Code sessions and every one of these is a wording act** — #73's own line: *"the executions are
design's."* At #95 Michael ruled Task 19's sequencing **EXECUTE-THEN-VERIFY**, which makes these
three the gate on registry sign-off: verification attaches to wording, so verifying an entry whose
wording is ruled-but-unexecuted attaches verification to text that will not survive.

**#73's terms, restated in this session's own words before any drafting** (the gate the dispatch
required):

- **V-5 — SPLIT ALL THREE two-case entries, one entry per case.** The workbook's argument was the
  attribution defect; **the argument that decided it came out of the citator pass — a joint entry
  verifies at the speed of its slowest case.** *Alford*, a 1999 Texas Supreme Court authority, was
  hostage to *Collins*, a 2017 memorandum opinion not in FLP, not on the public web, and possibly
  never retrievable. Splitting frees **Able Supply, Alford and Peeples** to verify now. Cost
  knowingly accepted: three more rows on the queue that H22 already calls the project's bottleneck.
- **V-6 — BOTH criminal entries STAY, REWORDED to state their operative tests.** Criminal file stays
  at 7. Two things #73 recorded so the ruling is not misread: **removing them would NOT have
  unblocked CR-10** — entries 30 and 31 still carry no cite and 32 is partial, so the gate narrows to
  five and does not open — and **rewording means both entries verify against the NEW text, not the
  old.**
- **V-7 — NARROW ENTRY 23** to what CPRC § 37.001 et seq. actually provides; **the availability
  holding lives on the *Irwin* entry, cross-referenced.** Consistent with V-4 and V-5 within the same
  hour — separate entries, cross-referenced, never a joint-authority entry. **Cost stated and
  accepted at #73:** the availability proposition now waits on the least verifiable entry in the
  backlog.

---

## §2 — Session-start verification (evidence, with the commands named — QR-6(a))

| Check | Command | Result | Evidence class |
|---|---|---|---|
| Local HEAD | `git rev-parse HEAD` through the mount | `260dc77` — the FIFTIETH invocation | **Local only** |
| Branch | `git rev-parse --abbrev-ref HEAD` | `master` | Local only |
| Ahead/behind | `git rev-list --left-right --count origin/master...HEAD` | `0 0` | **Local tracking ref — NOT evidence about origin** |
| Origin, decisive | `git ls-remote origin master` | **FAILED — `HTTP code 403 from proxy`** | **Unavailable from the design VM.** Reproduces #93/#94/#95 |
| `inbox/` | `ls -la inbox/` | **EMPTY** | Local only |
| Instructions in force | This session read its own live instructions field | **v21, 2026-08-16** | **Observation, not recall — the #82/A-1 mechanism, FOURTH consecutive use** |
| Runner version | `head` on `docs/prompts/QUEUE-RUNNER.md` at HEAD | **v10, 2026-08-16** | Local read at HEAD |
| BUILD-STATE | Read IN FULL at HEAD (149 non-blank) | eighty-fourth refresh, written from `607c561` | Local read at HEAD |

**What the empty `inbox/` is and is not evidence of.** The runner deletes at Step 4 item 5, *after*
the push at item 4, so a close-out interrupted at the push never reaches the delete. An **absent**
zip is therefore real evidence that the fiftieth invocation's close-out ran past item 4 — the inverse
of the surviving-zip case the operational note describes. **It is still not `git ls-remote`, and this
document asserts nothing about whether `260dc77` is on origin.**

**Three assumptions in the dispatch, checked:** HEAD was believed `607c561` and is `260dc77` (higher,
as the dispatch predicted — not a failed assumption); the wording packet was believed PENDING in
`inbox/` and has **already been run** (it is the fiftieth invocation, and `inbox/` is empty), so the
sequencing precondition is satisfied rather than pending; instructions were believed v21-if-pasted
and **are v21**.

---

## §3 — The ten-entry reconciliation (the gate's third limb)

#93 found that **TEN of the then-34 entries had wording already ruled or drafted to change and not
yet executed.** The ten, and where they now stand:

| Source of the change | Entries | Status at HEAD |
|---|---|---|
| V-5 (#73) — split | **19, 20, 21** | **UNEXECUTED** — this document |
| V-6 (#73) — reword | **33, 34** | **UNEXECUTED** — this document |
| V-7 (#73) — narrow | **23** | **UNEXECUTED** — this document |
| Route (c) §9 proposed wording | **5, 6, 11, 27** | **EXECUTED 2026-08-16 (#95 / fiftieth invocation)** |

3 + 2 + 1 + 4 = **10**. Entries **1 and 3** were adopted at #95 alongside the four but were **not**
among the ten — they were #93's separate drafts. So #95's six were **four of the ten plus two
others**, and the remainder is exactly **V-5 (19, 20, 21), V-6 (33, 34), V-7 (23)**. **The gate
passes and nothing else has executed them.**

**Verified by direct read at HEAD, not inferred:** six `**Wording:** adopted 2026-08-16 per #95`
lines exist in `legal-rule-registry-discovery-enforcement-and-pleading.md`, on TRCP 192.3(a),
192.3(j), 193.2, 196.2(b), 215.1(d) and 47 — i.e. workbook entries 1, 3, 5, 6, 11, 27. Entries 19,
20 and 21 are still joint two-case entries; entry 23 still reads "The UDJA is available as the
vehicle…"; entries 33 and 34 still end "(instrument family observed in plea paperwork)".

**Entry numbering is the WORKBOOK's and is not positional in the file.** The registry files carry no
entry numbers. #94's three work-product entries were placed in **subject order** rather than
appended, so the file's physical order already diverges from the numbering — and #95 still executed
correctly against "entries 1, 3, 5, 6, 11, 27" because the numbering is stable and external. **This
is the reason V-5 must not renumber; see §4.0.**

---

## §4 — V-5: split entries 19, 20, 21 into six

### §4.0 — The ID scheme, and why renumbering would be a defect

**#73 ruled the split and did not name an ID scheme.** Two are available:

- **(A) Derived IDs — 19a/19b, 20a/20b, 21a/21b.** Every other entry number in the record keeps its
  meaning.
- **(B) Renumber 19–24 and shift everything after by three.** Then "entry 23" becomes entry 26 and
  "entry 27" becomes entry 30 — **silently invalidating the live rows that name them**: `Q-STAT-6`
  (which lists entries "1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 13, 23, 26, 27, 29, 32, 33, 34"), the TRCP 47
  heading item, `READ-A`'s "entries 1–3 only", `REGISTRY-V`, and every entry-number citation in the
  workbook, the citator pass, the statute pass, the session log and BUILD-STATE.

**(A) is executed, on the file family's own precedent:** at #66 Michael split the criminal file's
former entry 4 into **4a and 4b** rather than renumbering, and that is exactly this situation — one
proposition becoming two entries mid-backlog. **Routed explicitly rather than assumed** (QR-6(e)),
and carried as ruling item `V5-IDS` at §8: one word reverses it, cheaply, because renaming entries is
a doc edit.

**Backlog: 37 → 40** (three entries become six). **Not 34 → 37** — the `V-EXEC` queue row still
carries the #73-era figure, which the forty-ninth invocation's three work-product additions
superseded; see `V5-COUNT` at §8. **The civil file's count header goes 30 → 33.** The criminal file
is untouched by V-5 and stays at 7.

### §4.1 — What is carried and what is not

Per #73 and the dispatch: **this is a split, not a re-research.** Each new entry carries the joint
entry's **proposition verbatim**, its **cite for its own case verbatim**, its **Status: UNVERIFIED**,
and its **Relied on for** line verbatim. Nothing is re-retrieved and no proposition is rewritten.

**The one thing the split does NOT do, stated rather than smoothed:** the joint entries never
recorded **which case supplied which half of the proposition**, and the split cannot supply it — so
each pair's two entries carry the whole proposition as filed, and the attribution question is
**carried onto both entries and resolved at verification.** That is #73's own instruction in
operation: *an attribution you cannot ground is a queued question, not a guess.* Ruling item
`V5-ATTRIB` at §8.

**Reporter-cite flags follow their own case.** Former entry 20's flag was "on *Collins*" and former
entry 21's was "on *Redman*"; after the split they sit on **20b** and **21a** only. **20a and 21b
carry no reporter-cite flag** — which is the split working as designed. The file's header paragraph
still names six flagged case authorities (*Volt Power*, *Sting Soccer*, *Ochoa*, *Redman*, *Collins*,
*De Anda*) and **stays correct as written; no header edit is needed for the flags.**

### §4.2 — The six entries, replacement text

**EXECUTED 2026-08-16 (#96): the six blocks below were inserted as drafted, with ONE ruled deviation — entry 20b's Status line was conformed to 21a's form (`**REPORTER-CITE CHECK FLAGGED** (Westlaw cite) — **carried unchanged.**`) on Michael's ruling at the Step 1 STOP, after a Code-side preflight found the staged 20b line reworded the flag and imported a sentence from the file header. The blocks below are the drafting record and are left as drafted.**

Replace the three existing joint entries **in place, in file order** (they currently sit after
*In re Ochoa* and before *Dillard Dep't Stores v. Hall*), preserving within-pair order.

---

#### Entry 19a — replaces the first half of former entry 19

```markdown
## Ford Motor Co. v. Castillo, 279 S.W.3d 656 (Tex. 2009)

**Cite:** Ford Motor Co. v. Castillo, 279 S.W.3d 656 (Tex. 2009).
**Proposition.** It is an abuse of discretion to deny discovery going to the heart of a party's claim.
**Status:** UNVERIFIED.
**Relied on for:** the motion to compel's framing of the central deficiencies.
**Split note:** **entry 19a**, from former joint entry 19, split one entry per case on Michael's ruling 2026-08-13 (#73, V-5) and executed 2026-08-16. The co-authority *Able Supply Co. v. Moye*, 898 S.W.2d 766 (Tex. 1995), is now **entry 19b** — **cross-referenced, never merged.** The proposition, cite and reliance line are carried verbatim from the joint entry; nothing was re-researched.
**ATTRIBUTION QUESTION — CARRIED, NOT ANSWERED BY THE SPLIT.** The joint entry never recorded which case supplied which half of the proposition, so both entries carry it whole. Resolving the attribution is part of verification. **On this entry the question is sharper, because there is a separate opinion:** the majority is FLP **opinion 9513075, type `020lead`, Johnson, J.** (cluster 895102, Tex. Sup. Ct. No. 06-0875, filed 2009-04-03, Published), and **a CONCURRENCE exists — opinion 9513076, Wainwright, J.** One read of 9513075 confirms the proposition is the majority's. Source: `registry-citator-pass-2026-08-13.md` §2.1; `registry-verification-workbook-2026-08-13.md` §4 case table.
**Retrieval hazard — majority-opinion rule applies.** The cluster also holds a `010combined` record whose id (895102) **collides with the cluster id**, so a retrieval on the cluster id lands on the combined text rather than the lead. Never characterize from a cluster id; enumerate `sub_opinions` and identify the majority positively.
```

#### Entry 19b — replaces the second half of former entry 19

```markdown
## Able Supply Co. v. Moye, 898 S.W.2d 766 (Tex. 1995)

**Cite:** Able Supply Co. v. Moye, 898 S.W.2d 766 (Tex. 1995).
**Proposition.** It is an abuse of discretion to deny discovery going to the heart of a party's claim.
**Status:** UNVERIFIED.
**Relied on for:** the motion to compel's framing of the central deficiencies.
**Split note:** **entry 19b**, from former joint entry 19, per #73 (V-5), executed 2026-08-16. The co-authority *Ford Motor Co. v. Castillo*, 279 S.W.3d 656 (Tex. 2009), is now **entry 19a** — cross-referenced, never merged. Proposition, cite and reliance line carried verbatim.
**ATTRIBUTION QUESTION — CARRIED.** Same as 19a: the joint entry did not record which case supplied which half.
**NO LOOK NEEDED to resolve cite or majority — and this is one of the three entries the split frees.** Clean single-opinion reported Supreme Court authority: FLP cluster 2432526, opinion 2432526, type `010combined`, Owen, J., Tex. Sup. Ct. No. 95-0048, filed 1995-06-08, Published, **no separate opinions** (`registry-citator-pass-2026-08-13.md` §2.2). It no longer waits on a co-authority to verify.
```

#### Entry 20a — replaces the first half of former entry 20

```markdown
## In re Alford Chevrolet-Geo, 997 S.W.2d 173 (Tex. 1999)

**Cite:** In re Alford Chevrolet-Geo, 997 S.W.2d 173 (Tex. 1999).
**Proposition.** A party resisting discovery must produce evidence supporting its objections, not conclusory allegations.
**Status:** UNVERIFIED.
**Relied on for:** the evidence-burden argument against the objection set.
**Split note:** **entry 20a**, from former joint entry 20, per #73 (V-5), executed 2026-08-16. The co-authority *Collins v. Kappa Sigma Fraternity*, 2017 WL 218286 (Tex. App.—Fort Worth 2017), is now **entry 20b** — cross-referenced, never merged. Proposition, cite and reliance line carried verbatim.
**THIS IS THE CASE THAT DECIDED V-5.** A 1999 Texas Supreme Court authority was hostage to a 2017 memorandum opinion that is not in FLP, not on the public web, and may never be retrieved — a joint entry verifies at the speed of its slowest case. Split, this entry verifies on its own.
**DUPLICATE-RECORD FLAG — a retrieval hazard, not a currency finding.** FLP holds **two clusters carrying the same reporter cite**: **2419858** (filed 1999-08-26, single `010combined`, citation_count 207 — treated as operative) and **5269700**, "In re Chevroletgeo" (filed 1999-06-10, two sub-opinions 5097124/5097125, citation_count 3), same docket 97-1171. **A lookup landing on 5269700 reports three citing references instead of 207 and reads as a dead authority.** The June 10 record is most likely the original opinion superseded on rehearing, **but that characterization is inference and is not asserted — no opinion text was read.** One look, and it is a **records** look, not a law look (`registry-citator-pass-2026-08-13.md` §2.3).
**ATTRIBUTION QUESTION — CARRIED.** The joint entry did not record which case supplied which half.
```

#### Entry 20b — replaces the second half of former entry 20

```markdown
## Collins v. Kappa Sigma Fraternity, 2017 WL 218286 (Tex. App.—Fort Worth 2017)

**Cite:** Collins v. Kappa Sigma Fraternity, 2017 WL 218286 (Tex. App.—Fort Worth 2017).
**Proposition.** A party resisting discovery must produce evidence supporting its objections, not conclusory allegations.
**Status:** UNVERIFIED. **REPORTER-CITE CHECK FLAGGED** — carried at a Westlaw cite. Upgrading a slip cite to a reporter cite is a verification act and is Michael's alone; no cite in this file was altered.
**Relied on for:** the evidence-burden argument against the objection set.
**Split note:** **entry 20b**, from former joint entry 20, per #73 (V-5), executed 2026-08-16. The co-authority *In re Alford Chevrolet-Geo* is now **entry 20a** — cross-referenced, never merged. Proposition, cite and reliance line carried verbatim.
**NOT LOCATED — retrieval is the whole task on this entry.** Absent from FLP and from the public web at #65 and again at the 2026-08-13 citator pass; no citing graph and no treatment posture exist for it (`registry-citator-pass-2026-08-13.md` §3). **Beware the 2010 sibling appeal in the same litigation, No. 02-09-00305-CV** — it is not this opinion. **This is the authority that was holding entry 20a hostage; after the split it holds only itself.**
**ATTRIBUTION QUESTION — CARRIED.**
```

#### Entry 21a — replaces the first half of former entry 21

```markdown
## In re Redman, 2023 WL 6760074 (Tex. App.—Tyler 2023, orig. proceeding)

**Cite:** In re Redman, 2023 WL 6760074 (Tex. App.—Tyler 2023, orig. proceeding).
**Proposition.** Merely listing a privilege proves nothing; the burden rests on the party asserting it.
**Status:** UNVERIFIED. **REPORTER-CITE CHECK FLAGGED** (Westlaw cite) — **carried unchanged.** Note beside it, not in place of it: the citator pass records this as a **memorandum opinion**, on which its reading is that the **WL cite is permanent**. Whether that resolves the flag or merely explains it is Michael's call at verification; the flag was not removed.
**Relied on for:** the PRIV category of the DE-1 taxonomy.
**Split note:** **entry 21a**, from former joint entry 21, per #73 (V-5), executed 2026-08-16. The co-authority *Peeples v. Fourth Supreme Judicial Dist.*, 701 S.W.2d 635 (Tex. 1985), is now **entry 21b** — cross-referenced, never merged. Proposition, cite and reliance line carried verbatim.
**CONFIRMATION LOOK, ONE CLICK:** the substantive opinion is **FLP opinion 9890720, October 11, 2023** — **not** the October 18 mootness dismissal. A reported companion for the same proposition already sits in this file: *In re Park Cities Bank*, 409 S.W.3d 859, **at 868** (`registry-citator-pass-2026-08-13.md` §3 and §2.6).
**ATTRIBUTION QUESTION — CARRIED.**
```

#### Entry 21b — replaces the second half of former entry 21

```markdown
## Peeples v. Fourth Supreme Judicial Dist., 701 S.W.2d 635 (Tex. 1985)

**Cite:** Peeples v. Fourth Supreme Judicial Dist., 701 S.W.2d 635 (Tex. 1985).
**Proposition.** Merely listing a privilege proves nothing; the burden rests on the party asserting it.
**Status:** UNVERIFIED.
**Relied on for:** the PRIV category of the DE-1 taxonomy.
**Split note:** **entry 21b**, from former joint entry 21, per #73 (V-5), executed 2026-08-16. The co-authority *In re Redman* is now **entry 21a** — cross-referenced, never merged. Proposition, cite and reliance line carried verbatim.
**NO LOOK NEEDED to resolve cite or majority — the third entry the split frees.** FLP cluster 2436879, opinion 2436879, type `010combined`, Wallace, J., Tex. Sup. Ct. No. C-4010, filed 1985-10-16, Published, **no separate opinions** (`registry-citator-pass-2026-08-13.md` §2.4).
**ONE FLAG CARRIED FROM THE CITATOR PASS, RECORDED RATHER THAN SUPPRESSED.** Unlike the other reported authorities in this file, *Peeples*' citing traffic in FLP tops out around **2020** rather than 2025–2026. **That is a flag, not a finding:** it is at least as likely to reflect FLP's citation-graph coverage as any decline in the case's authority, and a 1985 foundational privilege case being cited less often in the 2020s is unremarkable. Recorded because a quiet period is exactly the pattern a currency check exists to notice.
**ATTRIBUTION QUESTION — CARRIED.**
```

---

## §5 — V-6: PROPOSED replacement wording, criminal entries 33 and 34

**Adopted by nobody.** Route-C shape: each entry is put to Michael **independently**, and an adopted
rewording keeps the entry **UNVERIFIED** until he verifies the new text. #73 fixes the **direction**
("both stay, reworded to state their operative tests") and fixes **nothing about the wording** —
which is why these are proposals and V-5 is not.

**Why the rewording is not cosmetic.** Both entries as filed end *"(instrument family observed in
plea paperwork)"* and state that an instrument family **exists**. The workbook's Q3 asked whether
they state legal rules at all. **The statute text answers that both do** — each carries a trigger, a
consequence and, in art. 42.0197's case, an incorporated definition. So the reworded entries say
something the filed ones did not, and **verification attaches to the new text.**

### §5.1 — Entry 33, art. 42.0197 — PROPOSED

**ADOPTED 2026-08-16 (#96): §5.1 adopted as proposed. `V6-33-HEAD` ALSO ADOPTED — the entry's heading moved to the article's own title, "finding regarding gang-related conduct."**

```markdown
## Tex. Code Crim. Proc. art. 42.0197 — finding regarding gang-related conduct

**Cite:** Tex. Code Crim. Proc. art. 42.0197.
**Rule.** In the trial of an offense, **on the motion of the attorney representing the state**, the judge **shall** make an affirmative finding of fact and enter the affirmative finding in the judgment in the case **if the judge determines** that the applicable conduct was engaged in as part of the activities of a criminal street gang **as defined by Tex. Penal Code § 71.01**.
**Operative text, spot-checked against raw extraction:** "In the trial of an offense, on the motion of the attorney representing the state the judge shall make an affirmative finding of fact and enter the affirmative finding in the judgment in the case if the judge determines that the applicable conduct was engaged in as part of the activities of a criminal street gang as defined by Section 71.01, Penal Code."
**Status:** UNVERIFIED.
**Relied on for:** CR-10 completeness checks over plea-paperwork instrument families — **and the operative test changes how that check must behave: the finding is not automatic.** It requires a motion by the attorney representing the state and a judicial determination, so a completeness check must not flag a missing gang finding on a judgment where the State never moved. **Penal Code § 71.01 is incorporated by reference and is not itself a registry entry** — a check that reasons about what a criminal street gang *is* reaches a proposition the registry does not carry.
**Source:** official Texas statute corpus, `Documents\Knowledge Repo\Statutes 26-08-14\CR.pdf.zip` → `cr.42.pdf` (corpus download date **2026-08-14**; corpus currency per the source's own statement, **89th 2nd Called Session, 2025** — never inferred from the chapter). Retrieval RUN 2026-08-14 (`statute-pass-registry-retrieval-2026-08-14.md` §6) and re-extracted 2026-08-16 for this wording: raw `pdftotext -layout` in the device VM's own home directory, the §3 **characterized** normalizer applied, **residual glued `AA` = 0**. Article history in the corpus text: added by Acts 2009, 81st Leg., R.S., Ch. 1130 (H.B. 2086), § 16, eff. September 1, 2009; **no later amendment appears** — corroboration only, never a currency finding.
**Wording:** PROPOSED 2026-08-16 per V-6 (#73). Replaces the entry as filed, which read: *"An affirmative criminal-street-gang finding is entered under art. 42.0197 (instrument family observed in plea paperwork)."* **Verification attaches to this wording.**
```

**Heading change implied and FLAGGED AS ITS OWN ACT** (ROUTE-C; and the entry-27 exhibit from #95,
where a routed cite move left an unrouted heading disagreeing with its own cite by design). The
entry's current heading calls this an *"affirmative criminal-street-gang finding."* **The article's
own title is "FINDING REGARDING GANG-RELATED CONDUCT"** — the statute pass named this and nothing was
changed. Ruling item `V6-33-HEAD` at §8.

### §5.2 — Entry 34, art. 27.18 — PROPOSED

**ADOPTED 2026-08-16 (#96): §5.2 adopted as proposed. `V6-34-HEAD` and `V6-34-CITE` ALSO ADOPTED — the heading moved to "plea or waiver of rights by videoconference" and the cite narrowed to art. 27.18(a).**

```markdown
## Tex. Code Crim. Proc. art. 27.18 — plea or waiver of rights by videoconference

**Cite:** Tex. Code Crim. Proc. art. 27.18(a).
**Rule.** Notwithstanding any provision of the Code of Criminal Procedure requiring that a plea or a waiver of a defendant's right be made in open court, a court **may accept the plea or waiver by videoconference to the court if all three** of the following are satisfied: **(1)** the defendant **and** the attorney representing the state **file with the court** written consent to the use of videoconference; **(2)** the videoconference provides for a simultaneous, compressed full motion video, and interactive communication of image and sound between the judge, the attorney representing the state, the defendant, and the defendant's attorney; **and (3) on request of the defendant**, the defendant and the defendant's attorney are able to communicate privately without being recorded or heard by the judge or the attorney representing the state.
**Operative text, spot-checked against raw extraction:** "(a) Notwithstanding any provision of this code requiring that a plea or a waiver of a defendant's right be made in open court, a court may accept the plea or waiver by videoconference to the court if: (1) the defendant and the attorney representing the state file with the court written consent to the use of videoconference; (2) the videoconference provides for a simultaneous, compressed full motion video, and interactive communication of image and sound between the judge, the attorney representing the state, the defendant, and the defendant's attorney; and (3) on request of the defendant, the defendant and the defendant's attorney are able to communicate privately without being recorded or heard by the judge or the attorney representing the state."
**Status:** UNVERIFIED.
**Relied on for:** CR-10 completeness checks over plea-paperwork instrument families. **The entry as filed named one of three conjunctive conditions**, so a completeness check built on it would pass paperwork that satisfies the consent condition alone.
**Deliberate narrowing, stated so the entry is not read as exhausting the article:** this entry carries **subsection (a)'s test only**. Art. 27.18 also carries the court's power to terminate a videoconference appearance (b), the **record requirement** (c) with its transcription rule, the defendant's copy right (c-1), the rule that **loss or destruction of the record is not alone grounds to withdraw a plea** (c-2), and the out-of-county provisions (d)–(g) with their venue-consent waiver. **None of those is a registry entry; each would be its own.**
**CONSTRUCTION POINT FOR VERIFICATION, flagged rather than resolved:** the statute reads "may accept … **if**," with "and" joining (2) to (3). The proposition above states the conditions as conjunctive, which the "and" supports, but **it does not write "only if," because the article does not.** Whether the conditions are exclusive is a construction question and Michael's.
**Source:** official Texas statute corpus, `Documents\Knowledge Repo\Statutes 26-08-14\CR.pdf.zip` → `cr.27.pdf` (corpus download date **2026-08-14**; corpus currency per the source's own statement, **89th 2nd Called Session, 2025**). Retrieval RUN 2026-08-14 (`statute-pass-registry-retrieval-2026-08-14.md` §6) and re-extracted 2026-08-16: raw `pdftotext -layout` in the device VM's own home directory, §3 characterized normalizer applied, **residual glued `AA` = 0**. Article history in the corpus text: added by Acts 1997, 75th Leg., ch. 1014, § 1; amended by Acts 2005, 79th Leg., Ch. 1094; Acts 2011, 82nd Leg., Ch. 1031 and Ch. 1341; and **Acts 2017, 85th Leg., R.S., Ch. 1064 (H.B. 3165), §§ 5–10** — **the history ends there, which answers the workbook's "any post-2021 amendments" look in the negative.** Corroboration, not a currency finding.
**Wording:** PROPOSED 2026-08-16 per V-6 (#73). Replaces the entry as filed, which read: *"A plea may be taken by videoconference with the written consent of the parties (instrument family observed in plea paperwork)."* **Verification attaches to this wording.**
```

**Two implied acts, each FLAGGED AS ITS OWN:**

- **Heading** — currently *"plea by videoconference with written consent"*, which names one of three
  conditions. Ruling item `V6-34-HEAD` at §8.
- **Cite** — currently `Tex. Code Crim. Proc. art. 27.18` (whole article); the narrowed proposition
  states subsection (a) only. Ruling item `V6-34-CITE` at §8. **This is the entry-27 pattern
  exactly** — a narrowed proposition implying a narrowed cite — and #95 ruled that cite move
  expressly **with** the wording rather than silently.

---

## §6 — V-7: PROPOSED replacement wording, entry 23, and the cross-reference to entry 24

**Adopted by nobody.** #73 fixes the direction; the wording is drafted here.

**What the text established** (`statute-pass-registry-retrieval-2026-08-14.md` §5, re-extracted this
session): **§ 37.001 is a definition of "person" and nothing else.** The sections that actually supply
the vehicle are **§ 37.003(a)** (the court's power) and **§ 37.004(a)** (subject matter and who may
bring it), with **§ 37.002(b)** supplying the remedial / liberal-construction instruction. **Nothing
in ch. 37 addresses UIM coverage prerequisites** — that availability holding is *Irwin*'s. So the
entry as filed is loose in two ways at once: the cite points at a definition, and the proposition is
doctrinal rather than textual.

### §6.1 — Entry 23 — PROPOSED

**ADOPTED 2026-08-16 (#96): §6.1 adopted as proposed, and `V7-23-HEAD` ADOPTED — the heading moved to "ch. 37 — the Uniform Declaratory Judgments Act: what the statute provides." **`V7-23-CITE` was REJECTED**: the entry's cite STAYS `§ 37.001 et seq.`, and the block's cite line was reverted accordingly on insertion, per §4.4's own instruction. `V7-24-XREF` ADOPTED — the §6.2 cross-reference line was appended to the *Irwin* entry unchanged; its parenthetical names the sections the entry's rule states, not the entry's cite.**

```markdown
## Tex. Civ. Prac. & Rem. Code ch. 37 — the Uniform Declaratory Judgments Act: what the statute provides

**Cite:** Tex. Civ. Prac. & Rem. Code §§ 37.002(b), 37.003(a), 37.004(a) (Uniform Declaratory Judgments Act, ch. 37).
**Rule.** A court of record within its jurisdiction has power to declare rights, status, and other legal relations **whether or not further relief is or could be claimed**, and an action is not open to objection on the ground that a declaratory judgment is prayed for (§ 37.003(a)). A person **whose rights, status, or other legal relations are affected by a statute … or contract** may have determined any question of construction or validity arising under it and obtain a declaration of rights, status, or other legal relations thereunder (§ 37.004(a)). The chapter is **remedial**, its purpose being to settle and to afford relief from uncertainty and insecurity with respect to rights, status, and other legal relations, and **it is to be liberally construed and administered** (§ 37.002(b)).
**Operative text, spot-checked against raw extraction:** § 37.003(a) — "A court of record within its jurisdiction has power to declare rights, status, and other legal relations whether or not further relief is or could be claimed. An action or proceeding is not open to objection on the ground that a declaratory judgment or decree is prayed for." § 37.004(a) — "A person interested under a deed, will, written contract, or other writings constituting a contract or whose rights, status, or other legal relations are affected by a statute, municipal ordinance, contract, or franchise may have determined any question of construction or validity arising under the instrument, statute, ordinance, contract, or franchise and obtain a declaration of rights, status, or other legal relations thereunder." § 37.002(b) — "This chapter is remedial; its purpose is to settle and to afford relief from uncertainty and insecurity with respect to rights, status, and other legal relations; and it is to be liberally construed and administered."
**Status:** UNVERIFIED.
**Relied on for:** the **statutory basis** of the cause of action in the drafted UIM/UDJA original petition, and the statutory power behind the declarations block's typed declarations (liability, damages-compensability, coverage-fit, limits, damages-by-category, offset-excess, amount-with-fees). **It does NOT carry the availability holding** — that the UDJA is a proper vehicle for a UIM-benefit determination against the insured's own carrier is *Irwin*'s, and lives on the **Allstate Ins. Co. v. Irwin** entry (entry 24) immediately below, **cross-referenced, not merged.**
**Narrowing note:** narrowed 2026-08-16 per V-7 (#73) from the entry as filed, which read: *"The UDJA is available as the vehicle for establishing an insured's UIM-coverage prerequisites against the insured's own carrier,"* cited to "§ 37.001 et seq." **Nothing in ch. 37 addresses UIM coverage prerequisites, and § 37.001 is a definition of "person" and nothing else.** Consistent with V-4 and V-5, ruled the same hour: separate entries, cross-referenced, never a joint statute-plus-case proposition.
**COST OF THE NARROWING, STATED AND ACCEPTED AT #73:** the availability proposition now waits on **the least verifiable entry in the backlog.** *Irwin* has **no reporter cite in FLP and two clusters**, and it is the case that opened **V-9** — the class in which CLAUDE.md's binding majority-opinion rule **cannot run**, since the record offers neither an opinion-type marker nor authoring language. Splitting the proposition off this statute entry does not make *Irwin* easier; it makes the statutory half verifiable now.
**Source:** official Texas statute corpus, `Documents\Knowledge Repo\Statutes 26-08-14\CP.pdf.zip` → `cp.37.pdf` (corpus download date **2026-08-14**; corpus currency per the source's own statement, **89th 2nd Called Session, 2025**). Retrieval RUN 2026-08-14 (`statute-pass-registry-retrieval-2026-08-14.md` §5) and re-extracted 2026-08-16: raw `pdftotext -layout` in the device VM's own home directory, §3 characterized normalizer applied, **residual glued `AA` = 0**. All three sections carry Acts 1985, 69th Leg., ch. 959, § 1, eff. Sept. 1, 1985 in the corpus text.
**Wording:** PROPOSED 2026-08-16 per V-7 (#73). **Verification attaches to this wording.**
```

### §6.2 — The three implied acts, each FLAGGED AS ITS OWN

- **`V7-23-CITE`** — the cite moves from **`§ 37.001 et seq.`** to **`§§ 37.002(b), 37.003(a),
  37.004(a)`**. This is the entry-27 pattern: #95 ruled that cite move expressly **with** the wording
  rather than silently, and ROUTE-C now makes that standing.
- **`V7-23-HEAD`** — the heading moves off *"§ 37.001 et seq. — the declaratory-judgment vehicle."*
  **Routed deliberately, because the live exhibit of not routing it is in this same file:** entry
  27's heading still reads `TRCP 47(b)–(c)` while its cite reads `47(b), (c), (d)`, and that
  divergence exists precisely because the #95 packet moved the cite and said nothing about the
  heading. **Headings are the cite-stability anchors entries are located by.**
- **`V7-24-XREF`** — entry 24 (*Irwin*) needs **one added cross-reference line** and **no change to
  its proposition**, which already states the availability holding: *"The UDJA is a proper vehicle
  for a UIM-benefit determination and supports a fees award."* Routed explicitly because it is a
  touch on a **different entry** than the one V-7 names. Proposed line:

  > **Cross-reference:** the statutory power this holding operates on is the ch. 37 entry immediately
  > above (§§ 37.002(b), 37.003(a), 37.004(a)), narrowed 2026-08-16 per V-7 (#73). **This entry is
  > the availability holding; that entry is the statute. Cross-referenced, never merged.**

---

## §7 — Sources, extraction, and what was verified about the extraction (not about the law)

**SOURCING, per item.** All statute text: the official Texas bulk corpus at
`Documents\Knowledge Repo\Statutes 26-08-14\`, downloaded from `statutes.capitol.texas.gov/download`
by Michael's hand, **download date 2026-08-14**. Chapters read: `CP.pdf.zip → cp.37.pdf`,
`CR.pdf.zip → cr.27.pdf`, `CR.pdf.zip → cr.42.pdf`. **Currency figure is the source's own statement —
89th 2nd Called Session (2025) — never inferred from a chapter's amendment history**; the histories
recorded above are corroboration only. No `?link=` fetch was made; no targeted `/Docs/` fetch was
needed, because every chapter was present in the corpus.

**Extraction method (the preferred one, per the 2026-08-16 operational note).** The three chapter
PDFs were unzipped into the **device VM's own home directory** — `~/tmpwork_v567`, **not a mounted
path** — and read with `pdftotext -layout` there. **Nothing was staged and no scratch was written
into a connected folder**, so this session leaves nothing for Michael's hand to remove. (The separate
`Knowledge Repo\Statutes 26-08-14\_claude_extract\` directory from 2026-08-14 was **verified still
present** and left untouched; its deletion remains queue item `EXTRACT`, Michael's hand.)

**Normalizer.** The **§3 characterized** normalizer from
`statute-pass-registry-retrieval-2026-08-14.md` was applied — the corrected one, not the superseded
regex from `claude_Authority_Corpus_and_eCFR_Method_2026-08-14.md` §2. Raw doubled-`AA` counts before
normalization: `cp.37` 34, `cr.27` 38, `cr.42` 534. **Residual glued `AA` after normalization: 0, 0,
0.** Design rule honored: transform only what is characterized, report anything else.

**Spot-checks against raw extraction, run individually this session** (the SOURCING requirement, and
the reason two published normalizers were already wrong):

| Quotation | Raw form confirmed |
|---|---|
| art. 42.0197, whole article | `Art.A42.0197.AAFINDING REGARDING GANG-RELATED CONDUCT.` + body, raw lines 1307–1319 of `cr.42.txt` |
| art. 27.18(a) opening and (a)(1) | `Art.A27.18.AAPLEA OR WAIVER OF RIGHTS BY VIDEOCONFERENCE.` / `(a)AANotwithstanding…` / `state file with the court written consent to the use of` |
| CPRC § 37.003(a) | `EFFECT.  (a)  A court of record within its jurisdiction has power to` + body |
| CPRC § 37.004(a) | `Sec.A37.004.AASUBJECT MATTER OF RELIEF.  (a)  A person interested under a deed…` |
| CPRC § 37.002(b) | `(b)AAThis chapter is remedial;  its purpose is to settle and…` |

**One extraction detail recorded rather than smoothed:** `pdftotext` emits `defendant ’s` with a space
before U+2019 in `cr.27.txt`; the §3 harness's `APOS` rule removes it. The apostrophes in the quoted
text above are that rule's output, not raw bytes.

**Retrieval is not verification.** Every proposition here stays **UNVERIFIED** with its source named.
**Only Michael verifies.**

---

## §8 — Open questions for Michael (full text, per QR-1)

| ID | Question | Status |
|---|---|---|
| `V5-IDS` | **Do the split entries take derived IDs (19a/19b, 20a/20b, 21a/21b), or does the backlog renumber 19–24 with everything after shifting by three?** Executed as derived IDs on the file family's own precedent — at #66 you split the criminal file's former entry 4 into **4a and 4b** rather than renumbering. The reason to prefer it here is sharper than tidiness: **entry numbering is the workbook's and is not positional in the registry files**, and renumbering would silently change what "entry 23", "entry 27", "entries 1–3" and `Q-STAT-6`'s eighteen-entry list refer to across the log, BUILD-STATE, the queue, the workbook, the citator pass and the statute pass. **#73 ruled the split and named no ID scheme, so this is a packet-added choice and yours (QR-6(e)).** One word reverses it; renaming entries is a doc edit. | **OPEN — executed on precedent, reversible** |
| `V5-ATTRIB` | **The three joint entries never recorded which case supplied which half of their proposition, and the split does not supply it — each pair's two entries now carry the whole proposition as filed. Is that the right disposition, or do you want the propositions attributed per case at verification?** Raised because #73's instruction was that an attribution that cannot be grounded is a queued question rather than a guess, and none of the three could be grounded from the workbook or the citator pass. **On entry 19a there is a second, independent look:** *Castillo* has a Wainwright concurrence beside the Johnson lead, so confirming the proposition is the majority's takes one read of FLP opinion 9513075. | **OPEN — carried onto all six entries** |
| `V5-COUNT` | **The `V-EXEC` queue row says "When V-5 executes the backlog goes 34 → 37." That figure is stale — it is #73's, and the forty-ninth invocation's three work-product entries already moved the backlog 34 → 37.** The correct figure is **37 → 40**, which is what BUILD-STATE and the #95 entry both say. **Annotate the row rather than leave two figures in the record?** | **OPEN — flagged, not corrected** |
| `V6-33` | **Adopt, reject or edit the proposed wording for entry 33 (art. 42.0197)** — full text at §5.1. It replaces an observation that an instrument family exists with the article's operative test: **on the State's motion**, the judge **shall** make and enter the finding **if** the judge determines the conduct was gang-related as defined by Penal Code § 71.01. **Verification attaches to the new wording; the entry stays UNVERIFIED either way.** Put independently of `V6-34`, never as a package. | **OPEN — PROPOSED, adopted by nobody** |
| `V6-33-HEAD` | **Does the entry-33 heading change with the wording?** The article's own title is **"FINDING REGARDING GANG-RELATED CONDUCT"**; the heading calls it an *"affirmative criminal-street-gang finding."* **Flagged as its own act rather than done silently — the live exhibit of not doing this is entry 27, whose heading still reads `TRCP 47(b)–(c)` against a cite reading `47(b), (c), (d)`.** | **OPEN — its own act** |
| `V6-34` | **Adopt, reject or edit the proposed wording for entry 34 (art. 27.18)** — full text at §5.2. The entry as filed names **one of three conjunctive conditions**; the proposal states all three and records the deliberate narrowing to subsection (a). It also flags a construction point rather than resolving it: **the article says "may accept … if," and the proposal does not write "only if," because the text does not.** Put independently of `V6-33`. | **OPEN — PROPOSED, adopted by nobody** |
| `V6-34-HEAD` | **Does the entry-34 heading change with the wording?** It currently reads *"plea by videoconference with written consent"*, naming one of the three conditions. | **OPEN — its own act** |
| `V6-34-CITE` | **Does entry 34's cite narrow from `art. 27.18` to `art. 27.18(a)`?** The proposed proposition states subsection (a) only and expressly does not reach (b), (c), (c-1), (c-2) or (d)–(g). **This is the entry-27 pattern — a narrowed proposition implying a narrowed cite — and #95 ruled that move expressly with the wording rather than silently.** | **OPEN — its own act** |
| `V7-23` | **Adopt, reject or edit the proposed wording for entry 23 (CPRC ch. 37)** — full text at §6.1. It states what the statute provides (§ 37.003(a) power, § 37.004(a) subject matter, § 37.002(b) remedial construction) and moves the UIM-availability holding onto the *Irwin* entry, cross-referenced. **The cost #73 accepted is restated in the entry: the availability proposition now waits on the least verifiable entry in the backlog** — *Irwin*, which has no reporter cite, two clusters, and is the case that opened V-9. | **OPEN — PROPOSED, adopted by nobody** |
| `V7-23-CITE` | **Does entry 23's cite move from `§ 37.001 et seq.` to `§§ 37.002(b), 37.003(a), 37.004(a)`?** § 37.001 is a definition of "person" and nothing else, so the cite as filed points at the one section the proposition does not use. **Flagged as its own act, per ROUTE-C.** | **OPEN — its own act** |
| `V7-23-HEAD` | **Does entry 23's heading move off "§ 37.001 et seq. — the declaratory-judgment vehicle"?** | **OPEN — its own act** |
| `V7-24-XREF` | **May one cross-reference line be added to entry 24 (*Irwin*), with no change to its proposition?** Proposed text at §6.2. Routed explicitly because it touches a **different entry** than the one V-7 names. | **OPEN — its own act** |
| `V-Q-STAT-6` | **Three of `Q-STAT-6`'s remaining fourteen non-material divergences are entries 23, 33 and 34 — the very entries V-6 and V-7 reword.** If the proposals are adopted, those three entries' divergence flags resolve **at your verification of the new text** rather than needing a separate pass, leaving **eleven**. **Annotate `Q-STAT-6` to that effect, or leave it at fourteen until you say so?** Flagged and not closed: whether a divergence is resolved is a verification judgement and yours. | **OPEN — flagged, row stays open** |

---

## §9 — What this document does NOT do

- **It verifies nothing.** Every entry touched or proposed stays **UNVERIFIED**. Retrieval is not
  verification and re-retrieval is not verification.
- **It does not adopt any wording.** V-6 and V-7 are proposals under ROUTE-C, put independently.
- **It does not re-run the statute pass.** `statute-pass-registry-retrieval-2026-08-14.md` did that
  work, and #93 is the recorded lesson about re-running it; this session re-extracted **only** the
  three chapters it quotes, to satisfy the per-quotation spot-check.
- **It does not touch entries 1, 3, 5, 6, 11 or 27**, `statute-pass-registry-retrieval-2026-08-14.md`
  §9, the fourteen non-material divergences, `READ-A`'s deferred scope, or any entry in
  `legal-rule-registry-discovery-and-carrier-duties.md` (the verified file) or
  `legal-rule-registry-draft-entries-medical-billing.md`.
- **It does not resolve the entry-27 heading item** — that is Michael's one word and is already on
  his list.
- **It does not read `src/`**, build anything, or move any Status line.
