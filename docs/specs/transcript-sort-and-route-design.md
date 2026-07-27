# Transcript Sort & Route — Design Pass (Feature-Intake Item A)

**Date:** 2026-07-25. **Status:** DESIGN-COMPLETE pending Michael's review of the decision list (§10). **Extends** `transcript-workflows.md` (per the 2026-07-24 session-log reconciliation: same local-first pipeline, no re-derivation). Capability grounding: the NVIDIA transcription-stack capabilities memo (2026-07-24, §§1–12), including two rounds of real recording tests scored against ground truth. That memo lives in **claude.ai project knowledge** (filename `claude_NVIDIA_Transcription_Stack_Capabilities_2026-07-24.md`) and is **NOT in the repo** — it has no repo path (cite corrected 2026-07-26).

**What this adds to transcript-workflows Phase 1:** the hands-off ingestion function and the sort/route staging inbox — feature-intake item A's two problems. Everything else (Transcript object, privilege/PHI/consent architecture, storage, phasing) is already specified there and is incorporated by reference, not restated.

**Out of scope, unchanged:** AI extraction passes (Phase 2), phone-call capture arm (Phase 3), staff dictation (multi-user phase), Statement Bank views (Phase 3).

---

## 1. Capture sources and ingest

Ingest is **multi-source by requirement** (memo §12). Sources at launch:

- **Watched folder — recorder (primary at go-live):** Tascam microSD/USB-C mount → auto-import every new audio file. No click-through.
- **Watched folder — phone:** a synced folder (OneDrive-based, consistent with the documents architecture) receiving phone recordings. Channel choice deferred until go-live (§10-O2); until then:
- **Manual upload (interim, TODAY):** Michael attaches recordings via browser/app; also the manual fallback forever.

**Ingest rules (pilot-derived):**
- **Identity = SHA-256 content hash + recorded-at timestamp + duration. Never filenames** — Voice Memos reuses "New Recording N"; the two pilot batches collided on names. Duplicate hash → skip silently; same name, different hash → two recordings, both kept.
- Recorded-at from audio metadata; fallback to file mtime; always preserved on the Transcript record (spec §2's recording date/time).
- **Head-pad 0.5–1.0s of silence before transcription** — 3 of 5 scripted takes lost their first 1–3 seconds to language-detect stabilization ("eaten openings," memo §11). Cheap insurance at ingest; the Tascam's ~2s pre-record buffer and a pause-before-speaking habit layer on top.
- Transcode a 16 kHz mono WAV working copy for the pipeline; the original is retained until the post-transcription Opus archival transcode (spec 8.6), which remains the permanent copy.
- Sequential per-file processing (memo §1c: at 100×+ real-time on GPU, batch is ergonomics, not throughput).

## 2. Pipeline (per recording)

ingest → head-pad → **transcribe** (Parakeet-TDT-0.6b-v3, full precision, word+segment timestamps — memo §2 engine default; engine recorded on the Transcript record) → **diarize** (Sortformer offline, ≤4 speakers) → word→speaker alignment → **route inference** (§3–4) → **staging inbox** (§5).

**Vocabulary boosting is two-pass by design** (new decision, D3):
- **Pass 1 (always):** firm-wide glossary (legal terms-of-art: Stowers, counter-affidavit, MSJ, LOR, TPPCA… — the scripted test's exact miss list is the seed) **plus a global vocabulary auto-generated from ALL open cases' party/provider/counsel names**. Per-case boosting can't run before routing — the case isn't known yet. Global names are what routing itself keys on, so they get boosted for everyone.
- **Pass 2 (optional, post-confirmation):** a "Re-transcribe with case vocabulary" action on any confirmed transcript — re-decodes with that case's full boost list (party names, caption, cause/claim numbers, statute cites from the playbook). For accuracy-critical transcripts (anything headed for the verified flag / quotation), this is the button you press first.

**Quality gates (pilot-derived):** foreign-charset token runs and low-confidence spans render as `[unclear]` with click-to-play-the-audio-at-that-timestamp (word timestamps make this precise); a transcript whose *opening* is unclear routes by content inference with the UI note "tag unreadable." The 4-speaker diarization cap and the Spanish-diarization caveat (memo §1b) surface as advisory notices on affected items, not errors.

## 3. Spoken-tag detection (template-first)

Pilot evidence: tag TEMPLATES survive transcription even when slot entities garble; matter names transcribe near-perfectly. So detection is **template-first, slots-fuzzy**:

1. Match the first ~20 seconds of transcript against the tag-template library (fuzzy phrase match, tolerant of transcription noise).
2. Extract slot values (matter name, carrier, party names, cause/claim number, context words).
3. Fuzzy-resolve each slot against the case/party database (§4's matchers).
4. A resolved template = **high-confidence** suggestion (case + context type in one utterance).

**Seed template library** (from Michael's own scripted phrasings — extend as usage reveals more):
- "This is a dictation for the ___ matter" → dictation
- "Adjuster call, ___[carrier], the ___ case" → adjuster call
- "This is a call with the adjuster for ___[carrier] on the ___ matter" → adjuster call
- "Witness interview, ___ versus ___" → witness interview (auto-applies the presumptively-discoverable flag, spec §1.3)
- "Note to file on cause number ___" → note/dictation
- "Intake call, new PNC, ___" → intake (PNC funnel)
- "Note for the ___ matter" / "Note for later" → dictation (unrouted if no matter given)

Templates are DATA (a config table Michael can see and extend), not code — new phrasings become rows, not rebuilds.

## 4. Content inference (no tag, or tag unreadable)

Weighted signals, mirroring the contact-dedup philosophy from feature-intake item G (weighted, never auto-commit on weak evidence):

| Signal | Weight | Pilot evidence |
|---|---|---|
| Party/matter/counsel/provider name match against case DB | **Strong** | Names near-universally correct across 13 recordings |
| Cause/claim number via **normalizer + edit distance** | **Strong** | "twenty twenty five CI zero four nine six two" → 2025-CI-08841; claim numbers land within fuzzy range |
| Carrier name + adjuster name co-occurrence | Medium | "Marcus Webb with Farmers" transcribed perfectly |
| Phone number spoken → contact match | Medium | Phone + extension perfect in scripted test |
| Context-type lexical cues ("adjuster," "deposition," "your Honor," intake-question patterns) | Medium (type only) | — |
| Speaker count from diarization (1 = dictation; 2+ = call/meeting) | Weak (type only) | — |

**Number normalizer** (its own small module, unit-testable): spoken-digit words → canonical identifier formats (cause `YYYY-CI-NNNNN` and variants, carrier claim formats, phone). Match normalized output against the **known identifier list** (all open cases' numbers) at edit distance ≤2. We never need to hear a number perfectly — only well enough to match a short known list.

**Confidence buckets:**
- **High** — resolved tag template, OR ≥2 independent strong signals agreeing on one case.
- **Medium** — one strong signal, or several weak ones agreeing; case suggested with visible alternatives.
- **Low/unroutable** — no case candidate; item asks for manual assignment (and is content-searchable to help).

Every threshold is tunable, and §5's decision log is the tuning data.

## 5. The staging inbox

One inbox; **nothing files silently** (intake doc, reaffirmed). Item card shows: date, duration, source (recorder/phone/manual); transcript preview with **matched signals highlighted** (the names/numbers that drove the suggestion); best-guess case + context type + confidence bucket; next-best alternatives.

**Actions:** Confirm (one click) · Reassign (filterable case combobox — the v0.1 shared component) · **Split** (multi-matter recording → link to multiple cases; spec §2 allows one-or-more case links) · Not-case-related (→ §10-O3) · Hold.

**On Confirm, three quick fields** (dropdowns, pre-filled by context type per spec §1, correctable):
1. **Consent status** (announced / written / one-party / unknown) — required because after-the-fact uploads never saw a recording-time prompt.
2. **Out-of-state participant?** (the HARD check, spec §1.1 — asked here for uploaded audio since the recording-time prompt can't exist yet).
3. **Privilege tier + PHI flag** — pre-filled by context type (witness interview → presumptively discoverable; client meeting → privileged; plaintiff deposition → PHI on), Michael can override.

**Auto-file: OFF in v1 (D1 — Michael's veto pending).** Every confirm/reassign is logged (suggested vs. chosen) — the decision log both measures real routing precision and becomes the evidence for enabling auto-file later, with a threshold set from data instead of hope.

**Attorney-only** (spec 8.5): the inbox and everything in it is Michael's alone until the multi-user phase.

## 6. Post-routing

Confirming an item creates/finalizes the **Transcript record exactly per spec §2** — case link(s), participants as party links (per-speaker dropdown mapping SPEAKER_00/01 → case parties or "Michael"), context type, consent/privilege/PHI, review status `unprocessed`, verified flag OFF, engine + timestamps stored. Then:
- Audio → OneDrive per the documents architecture; Opus archival transcode job queued (spec 8.6).
- Transcript text → full-text search index (Postgres/adapter), scoped by case/party/type/date (spec §6).
- Manual summary field available (Phase 1 has no auto-summary).
- Pass-2 re-transcription offer (§2) surfaces on high-stakes context types (deposition, client-authority calls).

## 7. Data model additions (schema + both adapters)

- **`transcripts`** — spec §2 fields, concretely: id, case_ids[], audio_ref, duration, recorded_at, engine, text, words_json (word+ts array), status (unprocessed/…), verified bool, context_type, consent_status, privilege_tier, phi_flag, summary, created/updated.
- **`transcript_participants`** — transcript_id, party_id, speaker_label, mapping_confidence.
- **`staging_items`** — id, audio hash/ref, draft transcript_id, suggestions_json (ranked case+type+confidence+signals), status (pending/confirmed/dismissed/held), created_at.
- **`routing_decisions`** — staging_item_id, suggested, chosen, was_suggestion_accepted, decided_at (the tuning log).
- **`glossary_terms`** — term, scope (firm/case), case_id?, weight (drives boost lists; per-case vocabulary otherwise auto-generates from party records).

Per the architecture rule: all of it behind `DataAdapter`, working in localStorage demo mode (with fictional seed transcripts) and Supabase alike.

## 8. Service architecture

A small **local pipeline service** on the GPU machine (the P1 — memo §8), NOT embedded in the browser app: FastAPI, **OpenAI-compatible `/v1/audio/transcriptions`** plus a `/process` endpoint returning the full JSON bundle (text, words+timestamps, speaker segments, boost list used, signal features). Shape borrowed from the mil-ad reference repo (MIT — memo §9); runtime is **NeMo on GPU** (keeps boosting + full precision), not ONNX. Runs under native Ubuntu or WSL2/Docker (O2). Watched-folder mode built in.

**Service → app handoff:** with Supabase configured, the service writes staging rows directly (service credentials); in demo mode, a manual "import pipeline output" action loads the JSON bundle. The app never needs the GPU box to be awake to browse existing transcripts.

**Interim workflow until the P1 arrives (D2, per Michael):** recordings attached in the project space; Claude sessions run the proven CPU/int8 pipeline in-session and return transcripts + suggested routing in chat. Keeps momentum, exercises the tag grammar, and accumulates routing-decision data before a line of app code exists.

## 9. Legal Rule Registry touchpoints (binding rules respected)

Consent (Tex. Penal Code §16.02 [CONFIRM]), witness-statement discoverability (TRCP 192.3(h) [CONFIRM]), and the ADR/mediation and jail-call rules remain **unverified registry entries driving warnings and defaults only** — the inbox pre-fills and advisory banners. Nothing in this layer computes a legal outcome from them; nothing here may set verified status. (Registry rules 1–2.)

## 10. Decisions and open items

**Defaults set this pass (Michael can veto any):**
- **D1 — Confirm-only in v1; auto-file deferred** until the decision log shows real precision. *(Michael's explicit answer pending — this was the unanswered question.)*
- **D2 — Interim capture = manual attach from phone** (Michael's call, 2026-07-25); watched folders arrive with the Tascam/P1.
- **D3 — Two-pass boosting** (global-vocabulary pass pre-routing; optional per-case re-decode post-confirmation).
- **D4 — Engine default Parakeet-TDT-0.6b-v3** full precision; Canary-1B-v2 drop-in alternate (memo §2).
- **D5 — Consent + out-of-state questions move to confirm time** for after-the-fact uploads (recording-time prompts arrive with the capture UX later).

**Open for Michael:**
- **O1 —** Confirm or veto D1 (auto-file posture).
- **O2 —** P1 OS at purchase: native Ubuntu vs. Windows+WSL2 (either works; affects setup docs only).
- **O3 —** Where do not-case-related recordings go (personal store vs. discard-with-log)?
- **O4 —** Phone→PC sync channel at go-live (OneDrive Shortcut vs. iCloud folder vs. stay-manual) — deferred by D2.

## 11. Build plan (vertical slices for the Code session)

- **T1 — Data model + inbox UI:** schema/adapters/types for §7; Transcripts tab on case detail; staging inbox page with fictional seed data. Works fully in demo mode. *(No pipeline dependency.)*
- **T2 — Routing engine (TypeScript, in-app):** tag templates, number normalizer, fuzzy matchers, confidence scoring — pure functions over transcript JSON. **Unit-tested against the 13 real pilot transcripts as fixtures** (they're fictional-content recordings scored against known scripts — ideal test data, and the repo finally gets its first test runner).
- **T3 — Pipeline service (Python/NeMo/FastAPI):** gated on P1 hardware; the CPU/int8 fallback mode can ship earlier for end-to-end testing at floor quality.
- **T4 — Wiring:** service→Supabase staging writes; OneDrive audio placement + Opus transcode job; pass-2 re-decode action.

T1+T2 are buildable **now** with zero hardware. Sequencing against the OAA criminal-intake slice stays Michael's call per the standing queue.
