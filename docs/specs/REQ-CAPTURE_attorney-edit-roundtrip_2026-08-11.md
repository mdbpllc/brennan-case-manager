# REQ-CAPTURE_attorney-edit-roundtrip_2026-08-11

Relay packet from the CIVIL LIT drafting project. PROPOSED until reconciled design-side. Client-clean by construction.

## §1 Context

Finalization pass over a family of five parallel outbound written-discovery request sets (interrogatories + requests for production + requests for admission, combined per recipient) in a multi-defendant commercial-vehicle personal-injury case, propounding posture. The attorney had taken previously generated drafts, edited them in Word in a designated review folder on his machine, and returned them for finalization. The session staged the edited files, checked consistency across the five-document family, verified embedded case facts against the source crash report (an image-only scanned PDF), applied mechanical formatting fixes, and wrote service-ready finals back to the review folder.

## §2 Requirements observed

- **REQ-01 — Attorney-edit round-trip diffing.** Practice moment: the generated drafts came back attorney-edited, and the session had no stored copy of the as-delivered versions to diff against; edits had to be inferred from cross-document comparison and convention knowledge. Capability: the software should retain the as-generated version of every rendered instrument so an attorney-edited return can be diffed precisely — what the attorney changed is both the finalization worklist and a signal about house conventions. Priority: now. (Extends the artifact-provenance requirement captured in a prior packet as its REQ-12.)
- **REQ-02 — Document-family consistency checking.** Practice moment: five parallel sets share a common core (caption, preamble, definitions, shared requests) plus a small number of per-recipient tailored items; attorney edits introduced two unintended divergences (a section header reading "ADMISSION" in one set vs. "ADMISSIONS" in four; character formatting — small caps on a firm name — lost in one set's retyped paragraph). Capability: model a request-set family as shared-core-plus-tailoring so a checker can distinguish intentional per-recipient tailoring from drift, and report only the drift. Priority: now.
- **REQ-03 — Render-time format lint.** Practice moment: in every set, the final item's response-prompt label carried different paragraph indentation than the other 20/31/19 identical labels — a generation-side glitch invisible until rendered. Capability: format profiles enforced at render time, plus a lint pass that flags formatting outliers among elements that should be identical (a 20-of-21 paragraph-property histogram makes the 1 obvious). Priority: soon.
- **REQ-04 — Source-fact pinning.** Practice moment: instruments embed transcribed case facts ({{vehicle_vin}}, {{license_plate}}, {{carrier_id_number}}, {{facility_name}}); verifying them meant reopening the source crash report — which has no text layer — and comparing field by field. Capability: case facts used in any instrument should be first-class data pinned to a source-document location (document + field), so every instrument can be re-verified mechanically and a corrected fact propagates to every instrument that uses it; image-only sources need OCR or vision extraction with a confidence flag. Priority: now.
- **REQ-05 — Service-execution state and the certificate date.** Practice moment: the attorney filled the certificate-of-service date and e-service address by hand; if service slips to another day, that date silently goes stale in five documents at once. Capability: instrument lifecycle states (drafted → attorney-edited → finalized → served) with the certificate date bound to the service event, not typed into the text — stamped at service time and driving downstream deadline computation. Priority: now.
- **REQ-06 — Review-folder as a workflow channel.** Practice moment: the attorney's working convention was a dedicated folder ("drafts for review") for edited returns, separate from the generated-output location. Capability: a per-matter inbox/outbox convention the software understands — where generated drafts land, where attorney-edited files return, and state transitions inferred from file arrival. Priority: someday.

## §3 Data-model and template implications

- A **request-set family**: shared core (caption block, preamble, definitions list, request items) + per-recipient overlays (recipient name, tailored items keyed by role, conditional clauses present only where a pleading fact warrants — e.g. a capacity-denial clause appearing only in the sets aimed at the recipients that pleaded the denial). The overlay model is what makes REQ-02's drift detection computable.
- **Format profile** needs paragraph-level properties (indent, hanging indent, spacing) per element class — not just fonts and label text. Element classes observed: item paragraph, prompt label (ANSWER: / RESPONSE: / ADMIT OR DENY:), section header, certificate block, verification block.
- **Fact table**: {{fact_id, value, source_document, source_field, extraction_method, verified_by_attorney}}, referenced by merge fields in instruments.
- Instrument states: generated → delivered → attorney-edited → finalized → served, each with timestamp and file provenance.

## §4 Legal propositions relied on

None this session — the pass was formatting, consistency, and fact verification; no rule or case authority was newly relied on. (The section-header normalization to "Admissions" followed house-exemplar consistency, not rule authority.)

## §5 Open questions for the design side

1. When an attorney's edit conflicts with the stored house-format profile, should the system treat the edit as (a) a one-off deviation to preserve in that document only, or (b) a profile update that should propagate to future renders — and who confirms which it is?
2. Should character-level formatting (small caps, underline) inside body text be enforced by the consistency checker, or only surfaced as advisory, given that attorneys legitimately retype text in Word and may not care?
3. For fact verification against image-only source documents (scanned government forms with no text layer), what confidence threshold or human-confirmation step should gate a "fact verified" state — and should an unverifiable fact block the finalized state?
4. When the certificate-of-service date is bound to the service event rather than typed, how should the system handle mixed service (some recipients served one day, others later) across a document family — one certificate per recipient with per-recipient dates?
5. Does the drift report from a family-consistency check belong in the finalization UI (blocking, pre-service) or in a review log (non-blocking) — i.e., is drift ever acceptable to serve?
6. Should the as-generated retained copy (REQ-01) be immutable and content-addressed so that "what did we deliver" is provable later, and how long are superseded generations retained?

---

# RECONCILIATION ADDENDUM — design session 2026-08-12 (Fable 5)

Reconciled per REQ-1 against BUILD-STATE (157e792, 2026-08-11) and session log through #48 BEFORE
staging. Second REQ-CAPTURE through the REQ-1 channel. No collisions with closed items; no
anti-resurrection-ledger collisions; no build claims. Client-clean verified (merge-field tokens
only). Packet-local REQ-nn IDs are retired here; durable IDs assigned below (RULED, Michael,
2026-08-12, item by item).

## Durable ID assignments (RULED 2026-08-12)

| Packet-local | Durable | Disposition |
|---|---|---|
| REQ-01 | **FE-8** | As-generated retention + attorney-edit diffing. Extends form-engine §10's generated-document record and FE-1(b)'s served-docx history. §5.6 (immutable/content-addressed; retention period) rides in the question text. See lineage note below. |
| REQ-02 | **FE-9** | Family consistency / drift-only reporting. Cross-linked to FE-6 — its item model (scope common\|role\|entity-specific) is the substrate; FE-6 is packaging, FE-9 is drift detection; not merged. §5.2 (character-level enforced vs advisory) and §5.5 (blocking vs review-log) ride in the question text. |
| REQ-03 | **FE-10** | Format profiles + render-time lint (paragraph-level properties per element class; outlier histogram). Extends form-engine §§12.7–12.13 from documented method to enforcement. §5.1 (edit vs profile update, who confirms) rides in. Priority soon per capture. |
| REQ-04 | **extend IN-2, no new ID** | Source-fact pinning is the generalization of IN-2's per-field source attribution; one home per question (CL2-AC-1 dedup principle). IN-2 amended: fact table {fact_id, value, source_document, source_field, extraction_method, verified_by_attorney}; correction propagation; OCR/vision with confidence for image-only sources. §5.3 (confidence gate on "verified"; does unverifiable block finalization) rides in. Still CD-1-adjacent. |
| REQ-05 | **IN-4** | Full instrument lifecycle (generated → delivered → attorney-edited → finalized → served, timestamped, file provenance) with the certificate-of-service date bound to the service event and driving deadline computation. IN-3 cross-linked, stands separate. §5.4 (mixed service; per-recipient certificates) rides in; kin to the queued deadline-engine input (per-defendant service dates). |
| REQ-06 | **WF-1** | NEW workflow-channels series (Michael's ruling). Review-folder as a per-matter inbox/outbox the software understands; state transitions inferred from file arrival. Priority someday. Kin to the design-side email-workflow requirements doc (PROPOSED, un-packetized). Reason for the ID despite "someday": full-text ID is cheap insurance against the K-6/K-7 death. |

## Lineage note on REQ-01's cross-cite (recorded, not repaired)

REQ-01's parenthetical cites "the artifact-provenance requirement captured in a prior packet as its
REQ-12." **The cite resolves to nothing on record.** Design-side search 2026-08-12: the trucking
packet ran REQ-01–REQ-10; the roster packet's REQ-12 is capacity multiplicity; the email-workflow
doc has no numbered REQs. Michael searched CIVIL LIT the same day and could not find it ("It may
not exist."). Disposition: probable citation defect in the capture; capture text stands as written;
nothing reconstructed, per the K-6/K-7 standing rule — FE-8's text is complete on its own, which is
that rule's own mechanism (the requirement came back and got a new ID with its text intact). If the
cited packet ever surfaces, FE-8 gets a lineage annotation. Actor: the CIVIL LIT authoring session
(model not inferred).

## §4 status

No propositions relied on; nothing enters the registry from this capture. The "Admissions"
normalization is house-exemplar convention, correctly not asserted as rule authority.
