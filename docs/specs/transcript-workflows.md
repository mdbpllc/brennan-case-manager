# Transcript Integration Layer — Recorded Audio Across Every Workflow

Michael is beginning to record audio from conversations with clients, adjusters, opposing counsel, depositions, witnesses, and more, and will transcribe all of it. This document designs how those transcripts become a first-class layer of the case-management system — not a folder of text files, but structured records that feed the workflows we've already built.

**STATUS: All six open design questions ANSWERED by Michael (2026-07-21) — see section 8. The build-blocking stack decision is resolved (LOCAL-FIRST — see 8.1); this layer is ready for build phasing. Hardware/pipeline notes from Michael's recorder research are in section 9.**

Everything here is a **design suggestion, not legal advice**. The recording-law and ethics items below especially need confirmation before the practice relies on them.

---

## 1. Legal & ethics guardrails FIRST (these shape the whole design)

The system should encode these as rules, not leave them to memory:

1. **Consent baseline.** Texas is a one-party-consent state for recording conversations you participate in (Tex. Penal Code §16.02) [CONFIRM]. But: **interstate calls are a trap** — some states (California, Florida, Illinois, etc.) require all-party consent, and the safer practice on any call with an out-of-state participant is announced consent. DESIGN: every Transcript record carries a **consent status field** (announced/written/one-party/unknown) and a **participant-location note**; the recording workflow prompts an announcement script when any participant may be out of state. **This out-of-state check is a HARD prompt — non-negotiable regardless of the silent-recording practice decision (8.2), because recording in an all-party-consent state can be a criminal matter there, not just an ethics issue.** Applies to in-person meetings with out-of-state participants too, not just calls.
2. **Client recordings and privilege.** Recording a privileged client conversation does not destroy privilege, but it **creates a discoverable-if-waived artifact** and a bigger surface for inadvertent disclosure. DESIGN: transcripts are tagged with a **privilege tier** (privileged–attorney-client / work-product / non-privileged) that drives storage permissions and export warnings.
3. **Recordings of witnesses and parties are discoverable.** TRCP 192.3(h) makes witness statements discoverable — a recorded witness interview is likely producible on request [CONFIRM scope]. DESIGN: the system flags witness-interview transcripts as **presumptively discoverable** at creation, so nothing lands there that Michael wouldn't produce. Covert capture does not change discoverability. *(Annotation, 2026-08-16, #94 — Q-COM-11 RULED (A): both `privilege_tier` columns lose their `'work-product'` default; NULL = unclassified-must-classify; this item's presumptively-discoverable flag drives the SUGGESTED value for witness-interview transcripts at the creation-time decision point, which is recorded as the follow-on act and not yet built. The prose of this item stands — the schema now agrees with it instead of contradicting it. TRCP 192.5(d)/(c)(1)/192.3(h) entered the registry UNVERIFIED the same day.)*
4. **Jail calls are NOT privileged** (criminal side). Facility-recorded calls are monitored; treating them as confidential is a classic trap. DESIGN: hard warning banner on any criminal-case transcript whose source is a facility call; the client-communication playbook says substantive conversations happen in person or on unmonitored attorney lines.
5. **Ethics of recording opposing counsel and adjusters without announcement** — permitted in one-party states as a general matter, but bar guidance has shifted over the years and quiet recording of counsel can raise professionalism issues [CONFIRM — on the Texas Bar consult list]. DESIGN default until confirmed: **announced recording for opposing counsel** (stands even though the practice decision is silent-where-lawful — see 8.2). **The consult should SPECIFICALLY cover concealed in-person recording (the briefcase/lavalier scenario, section 9) — a more aggressive posture than silent call recording — before it becomes routine practice.** In-person recordings run through the same consent/privilege architecture as calls in every respect.
6. **Mediation confidentiality.** Texas ADR Act makes mediation communications confidential; recording mediation sessions is off the table absent agreement [CONFIRM]. DESIGN: the mediation phase blocks the "record" prompt and offers a post-session dictated-notes transcript instead (Michael dictating his own recap is his work product).
7. **AI-processing guardrail (§15 of the project instructions):** no client-confidential audio or transcripts into non-secured AI tools. **DECIDED (8.1): LOCAL-FIRST processing** — Phase 1 transcription/diarization runs entirely on Michael's own PC (NVIDIA Canary + local diarization), so privileged and PHI-bearing audio never leaves hardware he controls; the guardrail is satisfied by architecture rather than by contract. IF/WHEN the cloud arm is added later for phone-call audio (8.1), that arm requires: Azure Speech (same Microsoft tenant as the Graph integrations), enterprise data terms verified (no training on customer data, deletion after processing), and the **HIPAA-eligible tier + BAA** before any PHI-bearing audio flows through it.
8. **PHI (from the deposition decision, 8.4).** Plaintiff depositions in civil cases normally contain protected health information; defendant depositions sometimes do. DESIGN: transcripts carry a **PHI flag** (deposition transcripts of a plaintiff default to flagged; manually flaggable on any transcript). The PHI flag drives: (a) tighter staff permissions than the general privilege tier; (b) a **redaction-check step** before any export or production; (c) linkage to any protective order governing the case so PO terms follow the transcript; (d) the BAA prerequisite on the future cloud arm (item 7). Under the local-first stack, PHI audio processing itself stays on Michael's hardware.

---

## 2. The Transcript object (data model)

A **Transcript** is its own record, like a party or a bill:

- **Audio file link** (OneDrive, per the documents architecture) + duration + recording date/time. **Retention/format per 8.6: after transcription, raw audio is transcoded to a compressed speech-optimized archival format (mono Opus at speech bitrates, ~5–10 MB/hour); the compressed copy is the permanent file; older-case audio moves to cheaper archive storage; audio follows the case file's retention schedule.**
- **Transcript text** (searchable) + transcription source/engine + a **verified flag** (raw machine output vs. human-checked — matters before anything is quoted in a filing; **verified transcripts also accumulate as future fine-tuning data, section 9**).
- **Case link** (one or more — a call can touch two matters).
- **Participants** — REPEATING links to existing **party records** (client, adjuster, opposing counsel, medical professional, witness…), with speaker labels mapped to parties after diarization. This is the highest-leverage design choice: because participants are linked parties, every transcript automatically enriches the **cross-case party history** — pull up an adjuster and see not just every case they touched but everything they've *said* across those cases.
- **Context type** (enum, drives the downstream workflow): client meeting / client phone call / intake call (PNC) / adjuster call / opposing-counsel call / witness interview / deposition / hearing / mediation-adjacent dictation / voicemail / staff dictation (staff dictation deferred to the multi-user phase — 8.5).
- **Consent status + privilege tier** (section 1) **+ PHI flag** (section 1, item 8).
- **Review status:** unprocessed → auto-summarized → attorney-reviewed.
- **Summary** (auto-generated, editable) and **extracted items** (section 3).
- **Two-tier scoping** like party documents: case-specific by default; entity-level allowed (e.g., a carrier's recorded statement of general policy).

### Capture model (DECIDED — 8.3: opt-in per call/meeting)

Recording is **opt-in**, not default-on. Because capture is not routine, the capture UX must be frictionless and the system must actively suggest recording where the design leans on it hardest:

- **Suggested-recording prompts** at the workflow moments with the highest payoff: intake calls (feeds the intake auto-population), adjuster calls (Statement Bank / TPPCA / Stowers trails), offer-conveyed and client-authority calls at settlement (the malpractice shield), and disbursement-instruction calls. A declined suggestion is fine — the prompt exists so the valuable calls don't go uncaptured by oversight.

### The two capture arms

1. **In-person arm (Phase 1 — the recorder).** A dedicated handheld digital recorder (Michael is evaluating the **Tascam DR-05XP**, with a **Rode SmartLav+ lavalier** for close-miked/discreet capture — hardware detail in section 9) captures meetings, in-person client conversations, witness interviews, depositions Michael attends, and dictation. Files reach the office PC via USB-C/microSD, which is exactly where the local pipeline runs — capture and processing land in the same place.
2. **Phone-call arm (LATER — with the cloud stack).** Phone calls (most adjuster/OC/client-update volume) cannot be captured by a handheld recorder in any clean way; they require a call-capture mechanism (VoIP line or call-recording app), and that audio's natural processing path is the future Azure arm (8.1). Until built, phone-call capture is manual/ad hoc (e.g., speakerphone + recorder where appropriate) or simply not captured.

---

## 3. The processing pipeline (what happens to every recording)

Ingest (recorder files land on the PC) → transcribe **locally (NVIDIA Canary via NeMo — punctuation, capitalization, timestamps)** → diarize speakers **locally (NeMo/pyannote-class diarization model)** → map speakers to party records → **per-case glossary-correction pass (section 9)** → transcode audio to archival format → then FOUR extraction passes, each feeding an existing subsystem:

1. **Action items → Tasks module.** "Send me the LOR," "I'll get you the policy by Friday" become draft tasks (assignable, with due dates) awaiting one-click confirmation. Nothing auto-commits without review.
2. **Dates, offers, and promises → deadline engine + offer history.** A settlement offer stated on a call is logged with amount, date, and timestamped quote; an adjuster's "we'll respond by the 15th" becomes a tracked follow-up. TPPCA clock evidence (when a claim was acknowledged, when payment was promised) accumulates automatically.
3. **Facts → case facts/intake fields.** Intake-call answers flow into the client record's repeating intake-history lists (prior collisions, prior injuries, providers) rather than being retyped.
4. **Statements → the Statement Bank (section 4).** Anything said by an adverse party, adjuster, or witness that could matter later is clipped with speaker, timestamp, and source link. **Canary's timestamps are what make each clip citable to a moment in the audio.**

Plus one cross-cutting synergy: **recording duration auto-suggests a time entry** on hourly/fee-recovery cases (feeds the existing time tracker — entry pre-filled with date, duration, and the transcript summary as the description, editable before saving).

**Hardware prerequisite (Phase 1):** the office PC needs a capable **NVIDIA GPU** for Canary + diarization (a build/upgrade item, roughly $1,500–2,500 if the current machine lacks one). Model setup and updates are part of the software build, not a Michael task. NOTE: the AI *extraction* passes (items 1–4 above and summaries) are a separate AI-processing question from transcription — if extraction uses a cloud LLM, the §15 guardrails apply to transcript TEXT the same way they applied to audio [decide at Phase 2].

---

## 4. The Statement Bank (new subsystem, highest strategic payoff)

A searchable, party-linked library of what people said, built from transcript clips:

- **Per-adjuster:** every representation an adjuster made across every case ("we don't dispute liability," "the policy is $X," valuation rationales). Feeds bad-faith/TPPCA work and negotiation prep — before any adjuster call, the system surfaces that adjuster's greatest hits.
- **Per-expert and per-witness:** deposition and interview testimony accumulates under the party record — the PI playbooks' expert **prior-challenges/exclusions field** gains a sibling: **prior testimony**. Cross-case: "what did this defense orthopedist say about impairment ratings in my last three cases?"
- **Per-opposing-counsel:** commitments and agreements (see the Rule 11 engine below).
- **Contradiction finder:** within a case, new statements are checked against the same speaker's earlier statements (deposition vs. recorded statement vs. discovery responses) and flagged candidates surface for review — impeachment prep that builds itself.

NOTE: because recording is opt-in (section 2) and the phone-call arm comes later, the Statement Bank initially grows from in-person recordings plus deposition transcripts — the suggested-recording prompts and the eventual phone arm are what feed it fully.

## 5. Workflow-by-workflow integration

**Intake / PNC funnel.** Recorded intake conversations (suggested-recording prompt; consent per the practice decision) → transcript auto-populates the intake-history repeating lists, the coverage inventory, and the Medicare/Medicaid screen (which now runs on every PI intake). The PNC record keeps the intake transcript through the funnel — if the case converts, it's already in the file; if declined, it documents what was and wasn't said (declination-letter protection).

**Medical phase.** Client treatment-update conversations feed a treatment log (gaps in treatment surface early — the demand-package killer); provider calls about records/billing feed the provider-business record.

**Insurance/adjuster layer.** Every recorded adjuster conversation lands in the Statement Bank and offer history. Offers get amount + date + quote; the Stowers spotter (PI playbook engine) can then reference the actual recorded demand-and-response trail. Claim-handling delays become provable timelines for TPPCA work without reconstructing anything. (Full value arrives with the phone-call capture arm.)

**Opposing-counsel calls → the Rule 11 engine.** Oral agreements between counsel are unenforceable unless in writing and filed (TRCP 11) [CONFIRM]. So: when an OC-call transcript contains an agreement (extension, deposition date, discovery compromise), the system flags it and **drafts the confirming Rule 11 email/letter from the transcript** for Michael's review. The single most concrete daily payoff in this document. (OC calls remain ANNOUNCED until the ethics consult clears — section 1, item 5.)

**Depositions (DECIDED — 8.4: all deposition audio handled, PHI-protected).** The official record belongs to the court reporter; the system handles deposition audio as a first-class input, processed locally (which keeps PHI on Michael's hardware). Design:
- Deposition transcripts of a **plaintiff default to PHI-flagged**; defendant depositions flaggable — with everything the PHI flag drives (section 1, item 8: permissions, redaction check on export, protective-order linkage).
- The **deposition-prep checklist carries the TRCP 199 mechanics** for any self-made recording (notice of non-stenographic recording; awareness of the TRCP 199.1(c) AI-transcription objection right, which cuts both ways).
- Downstream: same-day auto-summary (issues, admissions, exhibits touched), Statement Bank feeding, contradiction-finder input, and an errata/read-and-sign deadline task on receipt of the official transcript [CONFIRM period — TRCP 203.1]. Deposition transcripts link to the court-reporter party record too (the agency that produced them).

**Mediation.** No recording (section 1) — instead a one-click post-session dictation flow: Michael's recap becomes a work-product transcript feeding the offer history and next-step tasks.

**Settlement phase.** Client-authority conversations (offer conveyed → client authorization) are recorded (suggested-recording prompt) and tagged — timestamped proof of conveyed offers and authority, a quiet malpractice shield. Disbursement-instruction conversations likewise. These transcripts link to the settlement record beside the statement and lien-clearance gate.

**Criminal side.** Client meetings (unmonitored settings only — jail-call warning per section 1), witness interviews (presumptively discoverable flag; reciprocal-discovery awareness), and pretrial check-in conversations feeding the existing **pretrial compliance log**. The eligibility/plea-hearing reminders can pull from the plea-discussion transcript: what the client was told about future relief, documented — which also feeds the future-contact consent engine (§14.9) once the barratry consult clears.

**Tasks & staff.** Every extraction lands as a draft task. Staff dictations are **deferred to the multi-user phase** (8.5) — attorney-only until individual staff credentials and the permission model exist.

## 6. Search, storage, security

Full-text search across transcripts scoped by case, party, context type, and date ("every mention of 'surveillance' in this case," "everything this adjuster said about policy limits, any case"). Storage: **compressed archival audio** in OneDrive under the existing document architecture (mono Opus speech-bitrate transcode after transcription; archive-tier storage for closed/older cases); transcript text in Postgres for search; privilege tier + PHI flag drive staff permissions (a paralegal may see adjuster calls but not privileged strategy dictations; PHI-flagged material is tighter still). Exports/productions pass through a privilege-tier check **and the PHI redaction check**. All of §15's security guardrails apply with extra force — this layer concentrates the most sensitive material in the practice. Note the OneDrive/Postgres copies mean transcript data DOES leave the local PC for storage — storage security (encryption, access control) is doing that work; only the AI *processing* is what local-first keeps on Michael's hardware.

## 7. Build phasing

- **Phase 0 (hardware/setup):** recorder purchase (Tascam DR-05XP or equivalent + Rode SmartLav+ — section 9 for settings and the no-remote-trigger caveat); confirm/acquire NVIDIA-GPU PC; stand up local Canary + diarization pipeline; test in Michael's real environments (office one-on-one, speakerphone, group) including a transcription-quality test of any discreet-placement setup before relying on it.
- **Phase 1 (MVP):** Transcript object + recorder-file ingest + local transcription/diarization + per-case glossary pass + audio transcode/archival + case/party linking + full-text search + manual summary. Attorney-only. Immediately useful, no AI-extraction dependencies.
- **Phase 2:** auto-summaries, action-item and offer extraction as draft tasks/entries, time-entry suggestions, suggested-recording prompts, Rule 11 confirming-letter drafts. (Decide the extraction-LLM guardrail question here — section 3 note.)
- **Phase 3:** Statement Bank views on party records, contradiction finder, deposition summary automation, criminal-side integrations, **phone-call capture arm + Azure cloud transcription (with BAA) when phone volume justifies it**. Staff dictation arrives with the multi-user permission model (may be later than Phase 3). Optional: Canary fine-tuning once enough verified transcripts accumulate (section 9).

## 8. Design decisions — ALL SIX QUESTIONS ANSWERED (Michael, 2026-07-21)

1. **Transcription stack: LOCAL NOW, CLOUD LATER.** (Michael initially chose cloud-with-business-agreement, then — after describing his recorder → local NVIDIA Canary vision — revised to local-first on walkthrough.) Phase 1 runs entirely on Michael's PC: recorder audio → local Canary transcription → local diarization. Strongest privilege/PHI posture; no vendor agreement needed for processing. The Azure cloud arm (enterprise terms + HIPAA-eligible tier/BAA) is added later, primarily for the phone-call capture arm, when volume justifies it. Hardware prerequisite: NVIDIA-GPU PC.
2. **Announcement practice: SILENT wherever lawful.** Two guardrails survive the decision: (a) opposing-counsel calls stay ANNOUNCED until the Texas Bar recording-ethics consult clears (the consult should specifically cover concealed in-person recording — section 1, item 5); (b) the out-of-state-participant check is a HARD prompt (all-party-consent-state exposure is potentially criminal, not just ethical).
3. **Recording scope: OPT-IN per call/meeting** (not default-on). Design compensates with frictionless capture and suggested-recording prompts at the high-payoff moments (intake, adjuster calls, offer-conveyed/client-authority, disbursement instructions).
4. **Depositions: system handles ALL deposition audio, with PHI protection.** Plaintiff depositions (and sometimes defendant) normally contain PHI → PHI flag (default-on for plaintiff depositions), tighter permissions, redaction check on export/production, protective-order linkage. Local processing keeps deposition PHI on Michael's hardware. TRCP 199 notice mechanics live in the deposition-prep checklist.
5. **Staff dictation: ATTORNEY-ONLY first.** Staff dictation ships with the multi-user permission model, not Phase 1.
6. **Retention: KEEP ALL AUDIO, minimized.** Best-evidence posture with storage-cost mitigation: transcode to compressed speech-optimized format (mono Opus, ~5–10 MB/hour) after transcription, that copy is the permanent archival file, archive-tier storage for older/closed cases, and audio follows the case file's retention schedule (purged when the file is).

## 9. Hardware & local-pipeline notes (from Michael's recorder research, 2026-07-21)

**Capture kit (planned, not yet purchased):**
- **Tascam DR-05XP** handheld recorder — 32-bit float WAV (clip-proof capture), dictation mode, low-cut filter, ~2-second pre-record buffer, ~17 hours on AA batteries (USB-C power for longer), microSD to 512 GB (hundreds of hours at recommended settings). **Caveat Michael should weigh before purchase: NO remote/app/Bluetooth activation** — recording starts by physical button (the pre-record buffer forgives a slightly late press) or voice-activation mode (imperfect: can false-trigger or miss quiet speech).
- **Rode SmartLav+ lavalier** into the 3.5mm input (plug-in power supported; built-in mics auto-disable) — close-miked speech for interviews or any setup where the recorder can't sit in the open. Foam windscreen on; Y-splitter allows two lavs into the stereo input.
- **Recommended settings: 48 kHz WAV, 32-bit float.** Higher sample rates (96 kHz) add file size, not transcription accuracy — ASR models consume 16 kHz mono internally. The keep-all-audio retention policy stays cheap because of the post-transcription Opus transcode (8.6).

**Concealed-recording reality check.** Recorder inside a leather briefcase = muffled high frequencies, elevated word-error rates, degraded diarization — poor input for the whole pipeline. If discretion is needed, the lavalier (cable routed to the bag) or the recorder on the table with mics exposed preserves quality. **Ethics note (see section 1, item 5): concealed in-person recording is specifically flagged for the Texas Bar recording-ethics consult before it becomes routine practice** — it is a more aggressive posture than silent call recording, and the consent/discoverability architecture applies to it identically (witness interviews stay presumptively discoverable however captured).

**Canary vs. Granary (clarified).** **Canary is the ASR model** (runs locally via NeMo/Hugging Face; outputs punctuated, capitalized, timestamped text — the timestamps are load-bearing for Statement Bank clip citations). **Granary is a training dataset** (~643k hours), not a model — relevant only if/when we fine-tune. Phase 1 runs stock Canary. Diarization (who said what — required for speaker→party mapping) is a separate local model (NeMo/pyannote-class) layered on top.

**Legal-vocabulary accuracy — phased, lightest tool first:**
1. **Phase 1 — per-case vocabulary seeding + glossary pass (no ML work).** The case file already knows the hard proper nouns: party names, provider names, the caption, statute cites. The pipeline feeds a per-case vocabulary list (auto-generated from linked party records) into transcription/post-processing, plus a firm-wide glossary of recurring legal terms. This catches most domain errors with zero training.
2. **Phase 2+ — tokenizer/vocabulary boosting** for recurring legal terminology (NeMo supports this; lighter than fine-tuning).
3. **Later (optional) — full fine-tune.** The verified-flag workflow (§2) produces training data as a free byproduct: every attorney-/paralegal-corrected transcript is a paired audio+accurate-text example. Once 10–50+ hours accumulate, fine-tune Canary on firm data (optionally mixed with Granary data to prevent forgetting). Requires real ML work (possibly a consultant) and meaningful GPU time — do not schedule until the corrected-transcript corpus exists. All training stays local; firm audio never leaves the machine.
