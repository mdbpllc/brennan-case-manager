# REQ-CAPTURE_deficiency-handling_2026-08-11

Status on arrival in the design project: PROPOSED. IDs below are packet-local
only; the design side assigns durable IDs at reconciliation.

## §1 Context

First session in a new instrument class for the discovery workspace:
**enforcement of propounded discovery** — handling deficient responses from an
opposing party. Worked in a premises-liability personal-injury case involving
livestock handling at a commercial facility (responding party: a single entity
defendant represented by a defense firm). Inputs were the opponent's responses
to two sets of written discovery (interrogatories, requests for production,
requests for admission), the opponent's amended initial disclosures, an agreed
docket control order, and a small produced-document excerpt. Content model for
the new instruments came from a third-party CLE treatise (a state-bar paper on
written-discovery objections, with a form meet-and-confer letter, form motion
to compel, and hearing chart) plus a prior-firm deficiency-letter exemplar
whose formatting was expressly excluded. Three instruments were drafted:
(1) a request-by-request **deficiency analysis grid**, (2) a **good-faith
conferral (deficiency) letter**, and (3) a **motion to compel** shell with a
hearing chart exhibit and a proposed order carrying a sustain/overrule chart.

## §2 Requirements observed

- **REQ-01 (now) — Response-set ingestion.** Practice moment: the opponent's
  response documents restate each request followed by objections and an
  answer; building the grid required manually decomposing ~60 items.
  Capability: parse a served response set into structured items (instrument
  type, number, request text, objection list, answer text), the mirror image
  of the already-observed incoming-request ingestion requirement on the
  responding side.
- **REQ-02 (now) — Deficiency taxonomy as first-class data.** Practice
  moment: every deficiency in the set fell into a small recurring taxonomy:
  boilerplate objection (BP), answer given "subject to" objections (STO),
  objection-only with no substantive response (OO), evasive/incomplete (EV),
  contradicted by the responder's own documents (CONTRA), privilege asserted
  without the required withholding procedure (PRIV), and RFP responses stating
  none of the rule's permitted response forms. Capability: a classification
  vocabulary applied per item, driving downstream rendering — the enforcement-
  side sibling of the objection library already observed on the responding
  side.
- **REQ-03 (soon) — Cross-document contradiction detection.** Practice
  moment: the highest-value deficiencies were contradictions between the
  opponent's answers and its OWN production and disclosures (an answer
  denying any investigation while produced statement forms recite an
  investigation on their face; an admission denial contradicted by a
  same-day, same-declarant interrogatory answer; a persons-with-knowledge
  disclosure omitting people named in the opponent's own documents).
  Capability: link answer assertions to contrary evidence in the produced
  record; even manual flagging with structured links would capture most value.
- **REQ-04 (now) — One data structure, three renderings.** Practice moment:
  the grid, the letter, and the motion chart/proposed order are the same
  item-level data rendered three ways (internal working grid → per-item cure
  demands in a letter → subject-matter clusters in a chart with a
  sustain/overrule column). Capability: single item store; renderers per
  instrument; clusters for the motion chart grouped by subject matter rather
  than seriatim (per the treatise's judge-facing advice).
- **REQ-05 (soon) — Authority-source tiering per instrument.** Practice
  moment: the letter's formatting authority was the firm's letterhead asset;
  its content model was a third-party treatise form; language was mined from a
  prior-firm exemplar whose header was expressly forbidden. Capability: per-
  source authority levels (formatting-authoritative vs. content-only) enforced
  at render time, generalizing the dual-source document-bank rule already
  ruled in this workspace.
- **REQ-06 (now) — Conferral/escalation timeline engine.** Practice moment:
  the letter carries a cure fuse (N days from letter date); the motion's
  conference certificate must recite the effort; the docket control order
  imposes a discovery cutoff, a serve-by date (cutoff minus 30 days), expert
  deadlines, and mediation — the enforcement track must land compelled
  production before expert workup needs it. Capability: an escalation
  timeline (letter → cure deadline → motion → hearing → compliance deadline)
  computed as PROPOSALS for attorney verification, integrated with the
  scheduling-order deadlines.
- **REQ-07 (soon) — Citation bank per instrument class.** Practice moment:
  every rule and case citation in the letter and motion came from the treatise
  and is unverified; drafts carry a delete-before-service banner saying so.
  Capability: reusable citation blocks tagged UNVERIFIED until the attorney
  verifies, with verified status persisting across drafts (registry
  discipline).
- **REQ-08 (soon) — Evidence pinning by production number.** Practice moment:
  deficiency assertions gained force by citing the opponent's own production
  by Bates range. Capability: item-level evidence references resolving to
  produced-document identifiers, rendered inline in letters and motions.
- **REQ-09 (now) — Internal-notes channel with render-time exclusion.**
  Practice moment: the grid contains attorney-only rows (impeachment
  material, a defense-favorable fact, a verifying-officer credibility
  overlap) that must NEVER render into an outbound letter or motion.
  Capability: a hard outbound/internal flag on every item, enforced by the
  renderer, not by convention.
- **REQ-10 (now) — Placeholder discipline for attorney-supplied facts.**
  Practice moment: service dates of the propounded sets, conferral details,
  and the bar number were unknown to the drafting session; drafts carry
  {{snake_case}} placeholders so the attorney can fill and file. Capability:
  placeholder inventory per document with a fill checklist at delivery.
- **REQ-11 (someday) — Verification-officer tracking.** Practice moment: the
  same officer verified interrogatory answers and personally conducted the
  investigation those answers denied — a deposition/credibility lever.
  Capability: track who verified which response set and cross-reference
  against fact-witness roles.

## §3 Data-model and template implications

- Entities: `response_set` {set_number, instrument_mix, served_date,
  verifier}; `response_item` {instrument_type: rog|rfp|rfa, number,
  request_text, objections[], answer_text, categories[] (REQ-02 taxonomy),
  evidence_refs[] (REQ-08), cure_demand, outbound: bool (REQ-09), cluster
  (REQ-04)}; `escalation_timeline` {letter_date, cure_days, cure_deadline,
  motion_filed, hearing, compliance_deadline} all as proposals.
- Renderers: `grid` (all items incl. internal), `deficiency_letter`
  (outbound items, per-item cure paragraphs, doctrinal preamble, conferral
  designation + fuse), `motion_chart` and `proposed_order` (outbound items
  grouped by cluster, sustain/overrule column left blank for the court).
- Template candidates seeded this session (to be distilled client-clean):
  `template_deficiency-letter_written-discovery.md`,
  `template_motion-to-compel_written-discovery.md`,
  `template_deficiency-grid_columns.md`.
- Merge fields observed: {{opposing_counsel_block}}, {{cause_number}},
  {{court}}, {{response_set_dates}}, {{cure_days}}, {{date_first_set_served}},
  {{date_of_deficiency_letter}}, {{further_efforts}}, {{bar_no}},
  {{stipulated_definition}} (for defined-term disputes).
- Letter-format note: house letterhead block (firm name, PO box, phone/fax,
  email) + date + VIA EMAIL line + addressee block + Re line + "Counsel:"
  salutation + per-item bold lead-in paragraphs + fuse + conferral-rule
  designation + /s/ signature.

## §4 Legal propositions relied on — ALL UNVERIFIED

- TRCP 192.3(a) — scope: relevant, reasonably calculated. UNVERIFIED.
- TRCP 192.3(f) — insurance agreements discoverable; entitled to copy. UNVERIFIED.
- TRCP 192.3(h) — witness statements discoverable. UNVERIFIED.
- TRCP 192.3(j) — legal contentions and factual bases discoverable. UNVERIFIED.
- TRCP 193.1 — complete response on reasonably available information. UNVERIFIED.
- TRCP 193.2(a),(b),(c),(e),(f) + cmt. 3 — specificity; partial compliance
  despite objection; good-faith basis; waiver by obscuring; no prophylactic
  privilege objections. UNVERIFIED.
- TRCP 193.3 — exclusive privilege-assertion procedure; withholding statement
  and identification on request. UNVERIFIED.
- TRCP 193.5 — supplementation duty. UNVERIFIED.
- TRCP 196.2(b) — four permitted RFP responses ("anti-dribbling"). UNVERIFIED.
- TRCP 197.1, 197.2(c) — contention interrogatories authorized; records-
  reference answers must specify records. UNVERIFIED.
- TRCP 198.1 — RFAs may address fact, opinion, application of law to fact. UNVERIFIED.
- TRCP 215.1(c) — evasive/incomplete answer treated as failure to answer. UNVERIFIED.
- TRCP 215.1(d) — expenses on motion to compel. UNVERIFIED.
- TRCP 215.4(b) — expenses of proving matters not admitted. UNVERIFIED.
- TRCP 191.2 — conference requirement / certificate. UNVERIFIED.
- In re Park Cities Bank, 409 S.W.3d 859 (Tex. App.—Tyler 2013, orig.
  proceeding) — boilerplate/prophylactic objections prohibited; privilege
  burden. UNVERIFIED.
- In re Volt Power, LLC, 2023 WL 2804430 (Tex. App.—Tyler 2023, orig.
  proceeding) — must explain each asserted deficiency. UNVERIFIED.
- De Anda v. Jason C. Webster, P.C., 2018 WL 3580579 (Tex. App.—Houston
  [14th Dist.] 2018, pet. denied) — repeated global objection string waived. UNVERIFIED.
- In re Sting Soccer Group, LP, 2017 WL 5897454 (Tex. App.—Dallas 2017,
  orig. proceeding) — contention discovery; no evidence supporting
  objections → abuse of discretion to sustain. UNVERIFIED.
- In re Ochoa, 2004 WL 1192444 (Tex. App.—Tyler 2004, orig. proceeding) —
  contention discovery not work product. UNVERIFIED.
- Ford Motor Co. v. Castillo, 279 S.W.3d 656 (Tex. 2009); Able Supply Co. v.
  Moye, 898 S.W.2d 766 (Tex. 1995) — abuse of discretion to deny heart-of-
  claim discovery. UNVERIFIED.
- In re Alford Chevrolet-Geo, 997 S.W.2d 173 (Tex. 1999); Collins v. Kappa
  Sigma Fraternity, 2017 WL 218286 (Tex. App.—Fort Worth 2017) — resisting
  party must produce evidence, not conclusory allegations. UNVERIFIED.
- In re Redman, 2023 WL 6760074 (Tex. App.—Tyler 2023, orig. proceeding);
  Peeples v. Fourth Supreme Judicial Dist., 701 S.W.2d 635 (Tex. 1985) —
  listing a privilege proves nothing; burden on asserting party. UNVERIFIED.
- Dillard Dep't Stores v. Hall, 909 S.W.2d 491 (Tex. 1995) — the opponent's
  fishing-expedition cite; distinguishable where requests are specific.
  UNVERIFIED.

## §5 Open questions for the design side

1. Should the deficiency taxonomy (enforcement side) and the objection
   library (responding side) be modeled as one shared vocabulary viewed from
   two postures — since an objection pattern we assert when responding is the
   same object we attack when enforcing — or as two separate libraries that
   merely cross-reference each other?
2. Should the software track the opponent's response-service dates and
   automatically propose a conferral fuse and escalation timeline (as
   proposals for attorney confirmation), or should enforcement timelines be
   created only manually?
3. How should motion-chart subject-matter clusters be assigned — manually at
   enforcement time, or derived from topic tags attached to each request when
   the set was originally propounded (which would argue for tagging requests
   at drafting time in the propounding module)?
4. Should the internal/outbound flag on grid items be enforced at the schema
   level (a renderer physically cannot emit internal items into an outbound
   instrument), and should the same mechanism serve the privilege firewall's
   genericization gate elsewhere?
5. When a defined term in a propounded set draws a definitional dodge (the
   responder denies the term describes anything at its facility), should the
   software support a "stipulated definition" object that, once offered in a
   conferral letter, propagates into amended requests, the motion, and the
   proposed order automatically?
6. The treatise recommends multiple small motions to compel (one subject area
   each) over one omnibus motion. Should the motion renderer support
   splitting one deficiency data set into several instrument instances, and
   how should the conferral certificate and exhibit lists be shared across
   them?

---

# RECONCILIATION ADDENDUM — design session 2026-08-12 (Fable 5, Cowork)

Reconciled per REQ-1 against BUILD-STATE and the session log at design-side sync `3a4db71` (log through #57, nineteenth runner line) BEFORE staging. Fifth REQ-CAPTURE through the REQ-1 channel — authored in CIVIL LIT 2026-08-11, carried by Michael's hand 2026-08-12 after this project's reconciliation of the UIM-UDJA capture surfaced its dangling cross-cite (whose REQ-09 cites this packet's REQ-07; that lineage is now resolved — see the UIM capture's addendum). Filename date 2026-08-11 governs runner ordering per QR-4. Client-clean verified (single generic entity defendant, case postures only). No build claims; no collisions with closed items; no anti-resurrection-ledger collisions.

**Prior design-side relative, reconciled as confirmation, not collision:** the parked discovery-deficiency engine (case-heartbeat walkthrough capture, Part 6 — the Bright treatise closed list, the TRCP 193.2(e) waiver linchpin, the thread-shaped workflow). The CLE treatise this packet's instruments used is that same paper. REQ-02's taxonomy is the closed list made data; the practice packet independently re-derives what the parked buildout sketched. That parked buildout now has a durable home: DE-1/DE-2 below.

Packet-local REQ-nn IDs are retired here; durable IDs assigned below (RULED, Michael, 2026-08-12, as a GROUP RULING on the presented disposition table). **The DE series was RULED into existence by Michael the same ruling** (the WF-1 precedent — the anchor item fits neither FE nor IN; WF-2 was offered and declined). The #48 elicitation caveat on series naming applies to DE as it does to IN: renaming is a one-word veto until the IDs get load-bearing.

## Durable ID assignments (RULED 2026-08-12)

| Packet-local | Durable | Disposition |
|---|---|---|
| REQ-01 | **IN-6** | Response-set ingestion: parse a served response set into structured items (instrument type, number, request text, objections[], answer text). Mirror of the propounding-side ingestion; the substrate IN-1's answer-mining runs on. Cross-links IN-1, IN-5. |
| REQ-02 | **DE-1** | NEW deficiency-enforcement series anchor (Michael's ruling). Deficiency taxonomy as first-class data (BP / STO / OO / EV / CONTRA / PRIV / RFP-form), applied per item, driving downstream rendering. The parked Part-6 engine is its design substrate. Absorbs REQ-04 (single item store, renderers per instrument, subject-matter clusters — the module's shape) and REQ-08 (item-level `evidence_refs[]` resolving to produced-document identifiers, IN-2 cross-link — same source-attribution family). §5 Q1 (one shared vocabulary viewed from two postures vs. two cross-referencing libraries), Q3 (cluster assignment — manual at enforcement vs. topic tags at propounding time), and Q6 (splitting one data set into multiple small motions; shared conferral certificate and exhibits) ride in the question text. |
| REQ-03 | **IN-7** | Cross-document contradiction detection: link answer assertions to contrary evidence in the produced record. Manual flagging with structured links first, per the capture's own instinct. Document-understanding class, Phase-1b-adjacent, like IN-1/IN-5; flags only, never conclusions. |
| REQ-04 | *(no new ID)* | Folds into DE-1 — see above. FE-6 cross-link (same one-item-model, many-renderings principle on the propounding side); not merged — different instrument classes. |
| REQ-05 | **extend FE-12, no new ID** | Render-time enforcement of the already-ruled provenance attribute: per-source authority levels (format-authoritative vs. content-only vs. known-bad-kept-for-reference) enforced when an instrument renders, generalizing the two-bank ATTORNEY INSTRUCTION OF RECORD per instrument (live evidence: house letterhead = format authority; treatise = content model; prior-firm exemplar = language mined, header forbidden). |
| REQ-06 | **DE-2** | Conferral/escalation timeline engine: letter → cure deadline → motion → hearing → compliance deadline, computed as PROPOSALS for attorney verification, integrated with docket-control-order deadlines (discovery cutoff, serve-by = cutoff − 30, expert deadlines, mediation). Cross-links: the queued deadline-engine input (per-defendant service dates), IN-3 (HOLD/service trigger). Q-6 posture untouched — triggers are MANUAL for v1; no docket-watch. §5 Q2 (auto-propose from tracked response-service dates vs. manual-only) rides in. |
| REQ-07 | **FE-16** | Citation bank per instrument class: reusable citation blocks tagged UNVERIFIED until the attorney verifies, verified status persisting across drafts, backed by the legal-rule registry (registry discipline: automation flags, only Michael verifies; the delete-before-service banner is the interim practice). The UIM capture's REQ-09 (slip-cite→reporter-cite currency flag) annotates as extending FE-16 plus the registry–CourtListener integration design. This packet's own §4 carries five WL/slip cites — live exhibits for that flag. |
| REQ-08 | *(no new ID)* | DE-1 item model — see above. |
| REQ-09 | **FE-17** | Internal/outbound channel with render-time exclusion: a hard flag on every item, enforced by the renderer at the schema level, never by convention — attorney-only rows physically cannot emit into an outbound instrument. §5 Q4 rides in, and makes this bigger than deficiency work: whether the same mechanism serves the privilege firewall's genericization gate elsewhere. §5 Q5 (the "stipulated definition" object propagating from conferral letter into amended requests, motion, and proposed order) also rides here as the nearest render-layer home, flagged for re-homing if DE grows a definitions object. |
| REQ-10 | *(no new ID — content route)* | Placeholder discipline (placeholder inventory per document + fill checklist at delivery) routes into the form-engine spec as documented method. Already house practice in both practice-project sessions; now written down. |
| REQ-11 | *(no new ID)* | CD-1/CD-2 evidence annotation, full text carried per QR-1: track who verified which response set (contact × role) and cross-reference against fact-witness roles (live evidence: the same officer verified interrogatory answers and personally conducted the investigation those answers denied). Someday priority; the full-text annotation is the K-6/K-7 cheap insurance. |

## §4 status

All ~26 propositions remain UNVERIFIED as captured — the largest registry batch since the trucking packet. Dedupe instruction for the queue runner (verify against the registry docs at HEAD, per standing practice): the TRCP 193.2 family, 193.3, 196.2(b), and 215.1(c) are the Bright closed-list authorities already recorded in the heartbeat capture Part 6.2 — if registry entries exist for any of them, dedupe onto the existing entry as a second observation (the TRCP 193.7 precedent); otherwise enter UNVERIFIED. TRCP 193.7 itself is NOT in this batch (already VERIFIED, trucking). Everything else enters UNVERIFIED. The five WL/slip case cites are additionally flagged for reporter-cite check at verification time (FE-16's own mechanism, applied by hand until built). Only Michael verifies.

## §5 routing

Q1, Q3, Q6 → DE-1 question text · Q2 → DE-2 · Q4, Q5 → FE-17. Full question text travels into the queue per QR-1.
