# REQ-CAPTURE_trucking-multidefendant-first-sets_2026-08-11

## §1 Context

First-wave written discovery drafted in a personal-injury trucking case, propounding posture. The defendant side is a corporate family: a holding-company parent and several wholly-owned operating subsidiaries (a motor carrier, an equipment-leasing entity, a driver-training school, a primary trucking operator), plus an individual driver who has not yet appeared. Six discovery sets were produced in one session: five to answering entity defendants and one held for the unserved-appearance driver. Each entity set combined three instruments in a single served document (interrogatories, requests for production, requests for admission) built from a shared common core plus per-entity tailored blocks. The case also presents a workers'-compensation nonsubscriber posture: the plaintiff was an owner-operator contractor injured as a passenger, and the entity defendants' answers affirmatively pleaded an alternative occupational-benefits policy.

## §2 Requirements observed

- **REQ-01 — Corporate-family entity map as a first-class object.** Practice moment: five sibling entities each had to answer identical relationship questions (who employed the driver, who contracted with the plaintiff, who owned the tractor, whose operating authority) precisely because the family structure blurs those lines. Capability: the software should model a defendant "family" (parent, subsidiaries, roles: carrier / lessor / employer / trainer / parent) and generate per-defendant sets from a shared core with role-based tailoring. Priority: now.
- **REQ-02 — Shared definitions block, composed per case.** Practice moment: one definitions list (incident, vehicles by VIN, party set, ESI terms) was written once and reused across all six documents with only the "You/Your" definition varying per target. Capability: definitions as case-level objects referenced by every instrument; per-target substitution of the addressee definition. Priority: now.
- **REQ-03 — Interrogatory count budget with subpart-risk warning.** Practice moment: drafting to a 20–21 count against a 25-interrogatory cap required manual counting, and compound interrogatories carry a discrete-subpart recharacterization risk. Capability: live count per set, a configurable cap by discovery level, exclusion of document-identification-only interrogatories from the count, and a soft warning where an interrogatory has facially severable subparts. Priority: now.
- **REQ-04 — Instrument packaging modes.** Practice moment: the three instruments were bundled into one served document per defendant; other practitioners serve them separately. Capability: render the same request content as either one combined document or three separate documents without re-entry. Priority: soon.
- **REQ-05 — Answer-mining for discovery hooks.** Practice moment: two affirmative statements in the defendants' answers (an alternative-benefits-policy assertion; a wrong-capacity/not-proper-party denial) each generated a contention interrogatory, an RFP, and RFAs. Capability: when an answer is ingested, flag affirmative pleadings and denials that support contention discovery, and suggest request stubs. Priority: soon.
- **REQ-06 — Nonsubscriber discovery pattern.** Practice moment: the nonsubscriber theory required a matched battery across instruments (RFAs on no-coverage / eligibility / employee status / course-and-scope; an interrogatory on coverage status and regulator filings; RFPs for the alternative policy, plan documents, and premium-deduction records). Capability: a reusable pattern keyed to the nonsubscriber elements, applied per entity defendant. Priority: soon.
- **REQ-07 — Crash-report field extraction and cross-document discrepancy flags.** Practice moment: the state crash report supplied VINs, carrier identity and DOT number, owner/lessee fields, and driver-license class codes that fed directly into definitions and requests — and it conflicted with the petition on the time of the incident and with the pleaded vehicle ownership. Capability: structured extraction of crash-report fields into the case record, plus automatic discrepancy flags when petition allegations and crash-report fields diverge. Priority: now.
- **REQ-08 — Held sets with service triggers.** Practice moment: one full set was drafted for a defendant who has not yet appeared, with a placeholder certificate of service; it must not be served until appearance. Capability: a set status of HOLD with a defined trigger event (answer filed / appearance) that surfaces a prompt to finalize and serve. Priority: soon.
- **REQ-09 — Deadline text as proposal, never asserted.** Practice moment: response-deadline language (30 days after service) was drafted as rule boilerplate with blank service dates; actual dates await the attorney. Capability: deadline computations generated as proposals tied to a service-date field, always flagged for attorney verification. Priority: now (already a known deadline-engine theme; re-observed here).
- **REQ-10 — Template distillation queue.** Practice moment: this session's sets are obvious template candidates (entity trucking set, driver set, nonsubscriber battery), but distillation was deferred to keep the drafting session moving. Capability: mark a produced document "distill to template" so a later session generates the client-clean template with merge fields. Priority: soon.

## §3 Data-model and template implications

- Case-level merge fields observed: {{cause_number}}, {{court_number}}, {{county}}, {{plaintiff_name}}, {{incident_date}}, {{incident_location}}, {{tractor_vin}}, {{tractor_plate}}, {{trailer_vin}}, {{trailer_plate}}, {{carrier_usdot_number}}, {{crash_report_case_id}}, {{defense_counsel_block}}, {{signature_block}}, {{service_date}}.
- Entity-level fields: {{defendant_legal_name}}, {{defendant_form}} (corp/LLC/individual), {{defendant_role_tags}} (carrier, lessor, employer, trainer, parent, driver), {{answer_filed_date}}, {{appeared}} (bool).
- An interrogatory/RFP/RFA item wants: id, text, scope (common | role:<tag> | entity-specific), and instrument type; a set is an ordered list of items generated by filtering on the target's role tags.
- RFA variants are the clearest role-keyed content: the same admission ("the tractor was owned by X") flips phrasing depending on whether the target IS X or a sibling of X — variant selection by role tag.
- Combined-document rendering order observed: caption → title → TO paragraph → preamble (rule citations + deemed-admission warning) → definitions → instructions → interrogatories → RFPs → RFAs → signature → certificate of service.

## §4 Legal propositions relied on (ALL UNVERIFIED)

- TRCP 190.3(b)(3) — Level 2 limit of 25 interrogatories per party; discrete subparts count; interrogatories asking only to identify or authenticate specific documents excluded. UNVERIFIED.
- TRCP 190.4 — Level 3 applies only on court order; absent an order, drafting proceeded to Level 2 constraints. UNVERIFIED.
- TRCP 197.2(a), 196.2, 198.2 — 30-day response period for interrogatories, RFPs, RFAs; RFAs deemed admitted absent timely response. UNVERIFIED.
- TRCP 193.3 — privilege assertion / withholding-statement mechanics. UNVERIFIED.
- TRCP 193.5 — duty to supplement. UNVERIFIED.
- TRCP 193.7 — production authenticates documents against the producing party. UNVERIFIED.
- TRCP 196.4 — ESI must be requested and produced in reasonably usable form. UNVERIFIED.
- TRCP 192.3(f) — insurance agreements discoverable. UNVERIFIED.
- Tex. Lab. Code § 406.033 — nonsubscribing employer loses contributory-negligence, assumption-of-risk, and fellow-servant defenses in employee injury actions. UNVERIFIED.
- 49 C.F.R. § 391.51 — driver qualification file contents. UNVERIFIED.
- 49 C.F.R. § 382.303 — post-accident drug and alcohol testing. UNVERIFIED.
- 49 C.F.R. § 395.11 — hours-of-service supporting documents. UNVERIFIED.
- 49 C.F.R. Part 380 (ELDT) — entry-level driver training and FMCSA Training Provider Registry. UNVERIFIED.

## §5 Open questions for the design side

1. Should the discovery module model a "corporate family" of defendants as a first-class entity — a parent with role-tagged members — so that per-defendant sets are generated from a shared common core with role-based tailored blocks, or is per-document duplication acceptable for a first version?
2. When the software counts interrogatories against a level cap, how aggressive should the discrete-subpart warning be — should it attempt to detect facially severable subparts (e.g., multiple sentences, enumerated clauses) and show a worst-case count alongside the numbered count?
3. Should answer ingestion (parsing a defendant's filed answer) be a distinct pipeline step that emits "discovery hook" suggestions (affirmative defenses and capacity denials mapped to contention interrogatory / RFP / RFA stubs), and where in the UI would those suggestions surface?
4. For a set in HOLD status awaiting a party's appearance, what event source updates the trigger — manual attorney input only, or should the design contemplate a docket-watch integration later, with manual as v1?
5. Does the deadline engine contemplate per-defendant service dates for the same wave of discovery (each certificate of service may carry a different date), with each defendant's response deadline computed independently from its own service date?

---

# RECONCILIATION ADDENDUM — design session #47, 2026-08-11 (Fable 5)

Reconciled per REQ-1 against BUILD-STATE (dbb5362, 2026-08-10) and session log through #46 BEFORE
staging. First REQ-CAPTURE through the REQ-1 channel. No collisions with closed items; no build
claims. Packet-local REQ-nn IDs are retired here; durable IDs assigned below (RULED, session #47).

## Durable ID assignments (RULED 2026-08-11)

| Packet-local | Durable | Disposition |
|---|---|---|
| REQ-01 | **CD-2** | CD-1 design-session input. Framing RULED: family = case-type party rosters + typed contact relationships, general across practice areas (trucking corporate edges and probate family edges are the same structure). Rosters are intake slots, never auto-created records. Distinct from CL-1 (case links ≠ contact links). |
| REQ-02 | **FE-4** | Definitions as case-level objects with identity; per-target You/Your substitution. Exemplar: `docs/templates/discovery/template_definitions-instructions_requests.md`. |
| REQ-03 | **FE-5** | Interrogatory count budget + subpart soft warning. TRCP 190.3(b)(3)/190.4 registry entries VERIFIED 2026-08-11 — the prior "gated on verification" note is retired. Aggressiveness of subpart detection (§5.2) open. |
| REQ-04 | **FE-6** | Combined vs. separate rendering from one item model. Added sub-question: do standalone instruments repeat the definitions block or incorporate by reference? |
| REQ-05 | **IN-1** | Answer-mining for discovery hooks. FE-2's rulings carry as PROPOSED defaults (flags only, never auto-add; one-click dismissal, remembered per case). Document-understanding capability class — Phase-1b-adjacent, not regex. |
| REQ-06 | *(no ID)* | Playbook content → `pi-case-playbooks.md` new section. Lab. Code § 406.033 registry entry VERIFIED 2026-08-11. |
| REQ-07 | **IN-2** | Crash-report field extraction + petition-vs-report discrepancy flags. Implies per-field source attribution on the case record — flagged as a CD-1-adjacent data-model question. |
| REQ-08 | **IN-3** | HOLD status + service trigger. Trigger source pre-answered: MANUAL for v1 per Q-6 posture (CourtListener/docket-watch UNAUTHORIZED); upgrade path routes through Q-6 whenever revisited. |
| REQ-09 | *(no new ID)* | Standing deadline-engine posture re-observed. NEW input queued: per-defendant service dates within one wave, each response deadline computed independently (§5.5). |
| REQ-10 | **FE-7** | Distillation queue. Guardrails in the question text from birth: output client-clean by construction; distilled templates PROPOSED until Michael adopts. First candidates: entity trucking set, driver set, nonsubscriber battery. |

## §4 status change (RULED 2026-08-11 — supersedes the §4 header above for status only)

The §4 header "ALL UNVERIFIED" was true when authored. Michael VERIFIED all thirteen propositions,
as worded in §4, on 2026-08-11 (ruling 3, session #47), FMCSR entries interleaved not sectioned.
The §4 text above stands as written (append-only); this addendum is the status of record.

## §5 open questions — routing

Folded into their parent items' queue text (ruled via ruling 1): §5.1→CD-2 · §5.2→FE-5 ·
§5.3→IN-1 · §5.4→IN-3 (pre-answered manual per Q-6) · §5.5→deadline-engine input. Not separately
tracked.
