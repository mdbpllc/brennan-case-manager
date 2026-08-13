# REQ-CAPTURE — Uvalde docket worksheet, second-iteration learnings
**File:** REQ-CAPTURE_uvalde-docket-worksheet_2026-08-12.md
**Date:** 2026-08-12 (Central wall-clock, confirmed 7:44 PM CDT)
**Origin:** CRIM DEFENSE practice project · carried to the design project by Michael's hand only
**Status:** Everything below is PROPOSED until Michael rules on it in the design project.

---

## §1 Context

Review of two consecutive docket worksheets prepared for the Uvalde 38th District Court
felony docket (07/22/2026 and 08/05/2026 docket calls), together with Michael's handwritten
annotations from actual use at the courthouse. The second worksheet incorporated
improvements learned from the first, so the pair shows both a working iteration loop and
the residue of needs the format still does not meet — everything Michael had to do by hand.
All practice moments below are generalized; no client names, cause numbers, or
case-identifying facts appear. Where an illustration was needed, it is stated at the level
of case type, posture, or instrument family only.

## §2 Requirements observed

Packet-local IDs; durable IDs are assigned at design-side reconciliation, never here.

**REQ-01 — Auto-create and populate a matter from the appointment order (OAA).**
*Moment:* Michael's own handwritten feature list on the earlier worksheet packet: on
appointment, the system should create and populate the matter from the OAA. Uvalde is the
easiest source (clean single-page digital form); DeWitt is the hardest (scanned
multi-document packet, requires OCR).
*Capability:* OAA intake pipeline that creates the matter and fills court, county, offense,
and setting fields from the document.
*Priority:* now.

**REQ-02 — Prompt for an already-set hearing when creating a matter from appointment paperwork.**
*Moment:* Same handwritten list: "prompt as to whether there is already a hearing set — may
be in the paperwork — if so, pull it from the document."
*Capability:* Hearing-date extraction with attorney confirmation at matter creation.
*Priority:* now.

**REQ-03 — Cross-check every docket against my appointments ("are there any others that are mine?").**
*Moment:* Handwritten request on the earlier packet ("when preparing the docket worksheet,
prompt me to see if there are any others that are mine — maybe a mechanism to check against
cases/emails") was implemented manually on the later worksheet as a "Recent Appointments —
Cross-Checked Against This Docket" table: every appointment notice received since the prior
docket call, checked name-by-name against all entries on the coming docket. It worked and
caught two matters that were on the docket.
*Capability:* Automated cross-check of the published docket against the appointment-notice
log and email, producing exactly that table.
*Priority:* now.

**REQ-04 — Prosecutor on the front page, grouped/queryable by prosecutor.**
*Moment:* Michael handwrote the first initial of each case's prosecutor next to every
defendant on the front-page docket table, because prosecutors ask off-hand "what cases do
we have together today?" and the answer must be readable from page 1. The initials also
revealed that the printed prosecutor field was wrong on roughly three of eight defendants —
including a prosecutor who appears nowhere on the printed sheet — and one defendant's
multiple causes were split between two prosecutors on the same docket.
*Capability:* Per-cause prosecutor field shown on the front-page table; a by-prosecutor
grouping of the day's docket; a county prosecutor roster with collision-safe short codes.
*Priority:* now.

**REQ-05 — At-court correction capture; treat printed docket data as unreliable.**
*Moment:* Beyond the prosecutor mismatches (REQ-04), the pair of worksheets recorded a
blank attorney field on one docket resolving on the next, and a clerk attorney-code error
flagged in the docket's own error log.
*Capability:* Fast at-court edits (prosecutor, attorney-of-record, setting type) that
persist to the matter and reconcile against the next published docket, with a
"court-confirmed" flag distinguishing observed fact from imported data.
*Priority:* soon.

**REQ-06 — Appearance tracking and an expected-disposition marker.**
*Moment:* Michael marked plea-expected cases with a handwritten "P" in the front-page
margin, and recorded no-shows ("never showed," "phone does not work") in the notes areas.
One no-show client was on bond; another matter needed a reset after a bench-out did not
happen.
*Capability:* Front-page expected-disposition marker (plea / contest / status); per-setting
appearance outcome (appeared, no-show, in custody elsewhere) that feeds the follow-up list
and the next worksheet's banners.
*Priority:* soon.

**REQ-07 — Contact capture that persists and prints forward.**
*Moment:* A client's phone number was handwritten on the back of a page in the earlier
worksheet and then handwritten again on that client's page header in the later worksheet —
the capture never entered any system. A family member's name and role ("client's mother")
noted on one worksheet became a handwritten "call" task on the next.
*Capability:* Contacts (with roles) attach to the matter at capture and print automatically
on every subsequent worksheet page for that client.
*Priority:* now.

**REQ-08 — Custody status, including out-of-state facilities, and bench-warrant/writ state.**
*Moment:* A revocation client turned out to be confined in another state's correctional
facility; the handwritten notes track "did not get benched out here — need to get this
reset/pled" plus the facility name.
*Capability:* Custody status per client (facility, county/state, source and date of
information) and a bench-warrant/writ status field, both surfaced in the client-page banner.
*Priority:* soon.

**REQ-09 — Scratch/intake zones and post-court note routing.**
*Moment:* Under courtroom time pressure, notes land wherever white space exists: one
client's negotiation numbers written on a different client's page; a new case for an
existing client written upside-down on a blank back; a full new-client intake (name,
charge, posture, out-of-county priors) handwritten on the front page.
*Capability:* Designated scratch and quick-intake blocks on the worksheet, and a post-court
reconciliation step that routes captured notes to the correct matters and creates new
matters from intake blocks.
*Priority:* soon.

**REQ-10 — Three-way number mapping: defense cause number ↔ docket entry number ↔ DA file/incident number.**
*Moment:* Michael hand-annotated the DA's own charge-table printout — circling indicted
rows, numbering them, and mapping each to its docket entry — and handwrote DA incident
numbers onto the per-cause pages, because the worksheet carries only cause numbers and
docket numbers while the DA's office talks in its own file numbers.
*Capability:* Store DA file/incident numbers per cause; print them on the worksheet;
optionally import them from the DA charge-table document.
*Priority:* now.

**REQ-11 — Offer lifecycle tracking.**
*Moment:* The later worksheet manually tracked one offer through three versions with dates
and sources (email vs. offer sheet vs. revised sheet), flagged another as "UNCHANGED from
the sheet you had before the last setting," and laid out a two-option offer as a client
choice. Offers moved materially between and within docket cycles (a probation option
disappearing and returning, a term dropping).
*Capability:* Offer versions as first-class records (date, source, full terms); worksheet
renders history, a changed/unchanged flag, and option sets.
*Priority:* now.

**REQ-12 — Carry-over of prior worksheet notes per matter.**
*Moment:* The later worksheet reproduced the earlier worksheet's typed discovery and
history notes in "CARRY-OVER" blocks so nothing was lost between dockets; handwritten
content did not carry and had to be re-copied by hand.
*Capability:* Notes attach to the matter, not the worksheet, and print forward
automatically — including transcribed handwritten notes from REQ-09's reconciliation step.
*Priority:* now.

**REQ-13 — Plea-paperwork audit: drafted-judgment summaries plus a check-before-signing defect list.**
*Moment:* For a multi-cause consolidated plea, the later worksheet summarized each drafted
judgment and listed defects to fix before the judge signed: zero days' jail credit printed
for a defendant who had been sitting on a bench warrant; the degree of offense misprinted
on two causes (third-degree felony printed on judgments assessing state-jail terms for
state-jail offenses); a blank, unsigned certification of right to appeal on every cause;
and a note that court costs do not run concurrent, with the true total computed. All three
defect classes were caught on paper before signing.
*Capability:* Automated consistency checks of drafted plea paperwork against the charged
statute and known case state (degree vs. punishment range, jail-credit presence for
in-custody/bench-warrant defendants, completeness of required certifications, cost totals),
rendered as a signing checklist.
*Priority:* soon — but highest-value item in this capture.

**REQ-14 — Warning banners, a follow-ups page, and task capture.**
*Moment:* The later worksheet added shaded banner boxes per client (prior FTA with a
transportation concern, bench-warrant history, clerk data error, new appointment, changed
offer) and closed with a "FOLLOW-UPS — not on tomorrow's docket" page for courthouse
errands. Handwritten task fragments still accumulated in note areas: a records subpoena to
issue, mitigation materials to gather, items to run down with the court coordinator.
*Capability:* Rule-generated banners from matter state; a follow-ups section fed by open
tasks; quick task capture from court notes.
*Priority:* soon.

**REQ-15 — Black-and-white print constraint (design constraint, not a feature).**
*Moment:* Michael prints in black and white only. Highlighting observed on one worksheet
was ad hoc (a one-time conversation aid, expressly not a feature request).
*Capability:* All worksheet semantics — banners, flags, emphasis — must survive B&W
printing: borders, shading, weight, and icons, never color-coded meaning.
*Priority:* now (governs all worksheet rendering).

## §3 Data-model and template implications

Observations of structure only; no schema proposals.

- Fields the documents prove are needed per cause/matter: prosecutor assignment (mutable,
  with a confirmed-at-court state); DA file/incident number(s); state ID and TRN; bondsman;
  prior-settings history with setting types; offer versions (date, source, full terms,
  option sets); custody status with facility including out-of-state; bench-warrant/writ
  state; contacts with roles; appointment-notice log with received dates; expected
  disposition per setting; appearance outcome per setting.
- The worksheet is a generated document keyed to (court, docket date) that joins docket
  entries to matters; its front page functions as the at-court command surface (docket
  table + alert box + appointments cross-check), followed by one section per client
  (header with DOB and location, banners, case-detail row, offer block, carry-over block,
  discovery notes, negotiation notes), closing with a follow-ups page.
- Generous whitespace is load-bearing: every page's blank space was written on. Dense
  layouts would destroy the worksheet's courtroom function.
- Multi-cause defendants need consolidated treatment (one offer covering several causes;
  concurrent sentences but non-concurrent costs) while keeping per-cause detail.

## §4 Legal propositions relied on

All UNVERIFIED; registry candidates only; none asserted to any court or counsel. These
appear because REQ-13 presumes the software can encode rules of this kind.

1. UNVERIFIED — Unauthorized use of a vehicle (Tex. Penal Code § 31.07) is a state jail felony.
2. UNVERIFIED — Possession of a Penalty Group 1 controlled substance under one gram
   (Tex. Health & Safety Code § 481.115(b)) is a state jail felony.
3. UNVERIFIED — A third-degree felony cannot be punished by confinement in state jail;
   degree of offense and punishment assessed must correspond.
4. UNVERIFIED — Court costs are assessed per cause and do not run concurrently even when
   sentences run concurrently.
5. UNVERIFIED — An affirmative criminal-street-gang finding is entered under Tex. Code
   Crim. Proc. art. 42.0197 (instrument family observed in plea paperwork).
6. UNVERIFIED — A plea may be taken by videoconference with written consent under Tex.
   Code Crim. Proc. art. 27.18 (instrument family observed in plea paperwork).

## §5 Open questions for the design side

1. Should the prosecutor assignment live at the cause level or at the docket-entry level,
   given that one defendant's multiple causes were split between two prosecutors on the
   same docket, and that the assignment observed at court differed from the printed docket
   on roughly three of eight defendants?
2. For the appointments cross-check (REQ-03), what is the authoritative source list — the
   OAA/appointment-notice log, the email inbox, or both — and how far back should each
   docket's cross-check window reach? (The manual implementation used "every notice since
   the prior docket call.")
3. For scanned multi-document appointment packets that require OCR (DeWitt-style), how is
   the "read the handwriting first" practice rule represented — does the system flag
   handwritten margin content for attorney review before any typed content is trusted?
4. What black-and-white-safe typographic conventions (borders, shading density, weight,
   icons) should carry banner and flag semantics, given that the printed worksheet must
   work with no color at all (REQ-15)?
5. Should the DA file/incident-number mapping (REQ-10) be manual entry at court, an
   OCR-assisted import of the DA's charge-table printout, or both — and can the mapping
   print as a column on the front-page docket table without crowding the handwriting space?
6. Can the plea-paperwork audit checks (REQ-13) — degree of offense vs. charged statute,
   jail-credit presence for defendants held on bench warrants, completeness of the
   certification of right to appeal, and non-concurrent cost totals — be encoded as rules
   run against drafted judgments, and which verified-authority registry do those rules
   check against?
7. When handwritten court notes are transcribed and routed to matters after court
   (REQ-09), what marks the resulting record as attorney-reviewed rather than raw OCR, so
   downstream worksheets don't print unverified transcription as fact?

---

## RECONCILIATION ADDENDUM — 2026-08-12 (design session, Fable 5, Cowork; GROUP RULING by Michael, 2026-08-12 Central, by widget, on the presented disposition table — the roster-capture precedent)

Sixth REQ-1 capture reconciled; the only one that reached the repo before reconciliation (filed
unreconciled by #59, the difference preserved there). Reconciled against BUILD-STATE (fifty-fourth
refresh) and the session log through #61 — i.e., AFTER the CD-1 build, so the CD-substrate
dispositions below cite built structure, not planned structure. Client-clean status was verified by
the filing session (#59) and is not re-litigated here. Packet-local REQ-nn IDs are retired here;
durable IDs assigned below. **The CR series is CREATED by this ruling** (criminal-side
requirements; the WF-1/DE precedent) — the runner verifies the letters are unclaimed at HEAD, and
the one-word veto stays open until CR IDs get load-bearing (the IN-series precedent). DT-1 clock
check before stamping: 2026-08-12 21:49 CDT.

## Durable ID assignments (RULED 2026-08-12, as a group)

| Packet-local | Durable | Disposition |
|---|---|---|
| REQ-01 | *(no new ID)* | Evidence/confirmation of OAA intake Tier 1, BUILT 2026-07-25 (engine `6b9d242`, UI `bb3cc0c`, verified in demo) + the intake spec's existing DeWitt OCR tier (C2's v2 §1a/§1b field maps). Annotation onto `criminal-appointment-intake-and-docket-enhancements.md`; the handwritten feature list is the validating evidence. Priority as captured: now. |
| REQ-02 | **CR-1** | Hearing-date extraction with attorney confirmation at matter creation. Dedupe at HEAD against the intake spec; if covered, records as a second observation on the covering section instead. Priority: now. |
| REQ-03 | *(no new ID)* | Evidence onto `criminal-appointment-intake-and-docket-enhancements.md` §3 (docket cross-referencing), its named nearest home. The manual "Recent Appointments — Cross-Checked Against This Docket" table that caught two matters is the validating evidence. §5 Q2 (authoritative source list + look-back window; manual practice was "every notice since the prior docket call") rides in the annotation. Priority: now. |
| REQ-04 | **CR-2** | Per-cause prosecutor assignment + by-prosecutor grouping of the day's docket + county prosecutor roster with collision-safe short codes. The roster is CD-1 directory substrate (contacts with roles) — evidence annotation to the CD queue entries as well. §5 Q1 (cause level vs. docket-entry level; live evidence: one defendant's causes split between two prosecutors on one docket, and printed assignments wrong on roughly three of eight defendants) rides in the question text. Priority: now. |
| REQ-05 | **CR-3** | At-court correction capture (prosecutor, attorney-of-record, setting type) persisting to the matter, reconciling against the next published docket, with a court-confirmed flag distinguishing observed fact from imported data. Cross-links CR-2. Priority: soon. |
| REQ-06 | **CR-4** | Front-page expected-disposition marker (plea / contest / status) + per-setting appearance outcome (appeared, no-show, in custody elsewhere) feeding the follow-up list and next-worksheet banners. Priority: soon. |
| REQ-07 | *(no new ID)* | CD-1 evidence BY CONSTRUCTION — contacts with roles attaching to the matter at capture is the built directory + roster link (log #61, items 1–2). The print-forward half rides CR-9. Priority as captured: now. |
| REQ-08 | **CR-5** | Custody status per client (facility, county/state, source and date of information) including out-of-state facilities, + bench-warrant/writ status, both surfaced in the client-page banner. Priority: soon. |
| REQ-09 | **CR-6** | Designated scratch and quick-intake blocks on the worksheet + a post-court reconciliation step routing captured notes to the correct matters and creating new matters from intake blocks. §5 Q7 (what marks a transcribed record as attorney-reviewed rather than raw OCR, so downstream worksheets don't print unverified transcription as fact) rides in the question text. Priority: soon. |
| REQ-10 | **CR-7** | Three-way number mapping: defense cause number ↔ docket entry number ↔ DA file/incident number; stored per cause, printed on the worksheet, optional import from the DA charge-table document. §5 Q5 (manual entry vs. OCR-assisted import vs. both; front-page column without crowding handwriting space) rides in the question text. Priority: now. |
| REQ-11 | **CR-8** | Offer lifecycle: offer versions as first-class records (date, source, full terms, option sets); worksheet renders history, changed/unchanged flag, and option sets. Live evidence: one offer tracked through three versions; a probation option disappearing and returning. The email-workflow doc's criminal plea-offer observation is its unruled relative — cross-referenced, never merged (that doc stays PROPOSED). Priority: now. |
| REQ-12 | **CR-9** | Notes attach to the MATTER, not the worksheet, and print forward automatically — including transcribed handwritten notes from CR-6's reconciliation step; absorbs REQ-07's print-forward half. Priority: now. |
| REQ-13 | **CR-10** | Plea-paperwork audit rendered as a signing checklist: degree of offense vs. charged statute, jail-credit presence for in-custody/bench-warrant defendants, completeness of required certifications, non-concurrent cost totals. The capture's own highest-value item. **HARD GATE, restated from CLAUDE.md rule 1: no computed check runs while the underlying propositions are UNVERIFIED.** The six §4 propositions enter `legal-rule-registry-criminal-plea-and-costs.md` (NEW file, all UNVERIFIED, confirmed by Michael 2026-08-12) and CR-10 is gated on their verification. §5 Q6 (can the checks be encoded as rules against drafted judgments, and which verified-authority registry do they check against — ANSWERED IN PART by this ruling: that registry file, once verified) rides in the question text. Priority as captured: soon — but highest-value. |
| REQ-14 | **CR-11** | Rule-generated shaded banners from matter state (prior FTA, bench-warrant history, clerk data error, new appointment, changed offer) + a "FOLLOW-UPS — not on tomorrow's docket" closing page fed by open tasks + quick task capture from court notes. Priority: soon. |
| REQ-15 | *(no new ID — binding design constraint)* | All worksheet semantics must survive black-and-white printing: borders, shading density, weight, icons — never color-coded meaning. Governs ALL worksheet rendering, including every CR item above. Recorded as a constraint, not a feature; the ad hoc highlighting observed was expressly not a feature request. §5 Q4 (which B&W-safe typographic conventions carry banner semantics) rides with it. FE-10's format profiles are noted as the civil-side sibling — cross-referenced, never merged. Priority: now (governing). |

## §3 disposition

The data-model and template implications route as evidence annotations: the per-cause/matter field
list and the worksheet-as-generated-document shape (keyed to court × docket date, front page as the
at-court command surface, generous whitespace load-bearing, consolidated multi-cause treatment)
annotate `criminal-appointment-intake-and-docket-enhancements.md` as CR-series evidence. No schema
proposal is adopted by this reconciliation; CD-3's insurer-subtype precedent governs if any
directory vocabulary addition surfaces later (spec-level act on the living spec).

## §5 question routing (full texts ride in the CR question texts named above)

Q1 → CR-2 · Q2 → the REQ-03 annotation · Q3 → the intake spec's OCR tier annotation (the
read-the-handwriting-first practice rule: flag handwritten margin content for attorney review
before any typed content is trusted) · Q4 → the REQ-15 constraint · Q5 → CR-7 · Q6 → CR-10 ·
Q7 → CR-6. All seven remain OPEN questions for Michael except Q6's registry half, answered by the
registry ruling above.

## Registry disposition

Six §4 candidates ENTERED as UNVERIFIED in `legal-rule-registry-criminal-plea-and-costs.md` (NEW
file, ruled 2026-08-12) — entries 3 and 4 carry NO cite (the capture stated them bare; cite supply
is a verification act, Michael's). The attorney verification backlog widens 27 → 33.

## Count note (ownership: Fable 5, design-side, disclosed same session)

The ruling widget's summary line said "ten new durable IDs"; the presented and adopted table
carries ELEVEN (CR-1 through CR-11). The table governs — it is what was presented and adopted with
each row's full text on screen. Failure class: design-side enumeration miscount (roster-count
class, De Anda's sibling); caught in-session before staging; the wrong figure never reached any
artifact.
