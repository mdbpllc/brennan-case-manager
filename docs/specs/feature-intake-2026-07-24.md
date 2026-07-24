# Feature Intake — 2026-07-24

Status: INTAKE. Captured from design-space dictation. Not spec-final, not built. Each needs a design pass (data model, Legal Rule Registry touchpoints where relevant, privilege/PHI posture) before entering a build queue. Sequenced behind current Phase 1a.

---

## A. Recorder → local transcription → sort & route  *(NEXT BUILD TARGET)*

**Goal.** Michael records many separate audio items across a day on a hardware voice recorder (dictations, adjuster calls, case-law reads, etc.). NVIDIA open-source transcription model runs **locally** on his GPU machine (privilege/PHI posture — no cloud). Two problems to solve:

1. **Ingestion (hands-off).** Connect recorder → a function grabs all new recordings automatically (no click-through), sends each through the local model, produces one transcript per recording.
2. **Sorting/routing (the hard part).** A day can yield dozens of recordings of different kinds. Need a way to sort them and route each to the right case file / destination without manual slog.

**Design direction discussed:**
- **Hybrid tagging.** Michael can sometimes give a spoken tag at the top of a recording (e.g., "this is a dictation for the Curry matter"). Sometimes he can't — e.g., an adjuster call he's recording under Texas one-party consent without announcing it. System must handle both:
  - Spoken tag present → high-confidence auto-suggestion of case + type.
  - No tag → infer from transcript content (names, claim numbers, phone numbers matched against existing cases/contacts), with a confidence level.
- **Single staging inbox.** Every transcript lands in one review inbox first; nothing files silently. Each item shows transcript, date, best-guess destination + type, and confidence. Michael clears the inbox with quick confirmations. High-confidence items may auto-file after a delay unless he objects.
- **Post-routing:** define where each transcript lives and what it becomes once routed (per-case record, linked to matter, etc.) — to be detailed in the design pass.

**Blocking input before build:** the NVIDIA model's docs/API — confirm speaker separation, timestamps, batch processing, structured output. Michael to provide; capability determines how much of the sort/route logic keys off model output vs. our own parsing.

**Downstream tie-in:** dictated case-law interpretations (see item E) route through this same pipeline.

---

## B. Email intake & routing  *(own project — watch for linkage to Outlook calendar-push slice)*

**Goal.** As emails arrive, surface them for quick review and route each to the appropriate case file — a streamlined intake rather than manual filing.

**Notes:**
- Attachments: many emails carry them; need to file attachments to the right case / document system alongside (or as part of) the email.
- Kept deliberately separate from the Outlook calendar-push slice. Watch for advantageous linkage as both develop and flag it; do not merge silently.
- Shares the item-C pattern (surface → route → do something meaningful).

---

## C. Reusable pattern: "upload → extract → do something meaningful"  *(cross-cutting; subrogation is first instance)*

**Principle.** Any place a document is uploaded, it should not go static. Upload → extract structured data → act on it (populate records, create/update contacts, track change over time). Applies across tabs (court, insurance, medical, liens/subrogation). Build subrogation (item D) as the reference implementation, then generalize the engine.

Also applies to the **court profile local-rules feature** (item F): upload controlling documents, and they become live inputs, not static files.

---

## D. Subrogation / lien tab — document-driven  *(reference implementation of pattern C)*

**Core flow.** In a lien / subrogation-interest tab, Michael can manually enter what a recovery company is claiming, **or** upload the itemization letter these companies always send, and the system parses it and auto-populates the lien section.

**Itemization fields to extract (standard layout):** treatment date (begin/end), claim number, medical provider, ICD code, ICD description, CPT code, CPT description, billed amount, paid amount, remaining amount. (Structured and consistent across letters → parseable.)

**Administrative extraction (same letter):** reference/file number; subrogation recovery analyst contact — name, phone, fax, email.

**Change-tracking across letters (the high-value part).**
- When a second letter arrives (e.g., a new recovery company takes over the same health plan), compare against the claims already on record from the first letter instead of Michael hand-diffing two PDFs.
- Detect claims removed / amounts changed. Real example this session: Cigna subrogation — Rawlings Company letter showed **$5,264.71**; successor Machinify (both LaGrange, KY — likely same operation rebranded) showed **$2,837.29**. System should flag that delta automatically.
- Write the comparison readout into a **running notes box** tied to that specific subrogation entry (each lien keeps its own history).
- **Before finalizing notes,** if anything is ambiguous, a pop-up asks Michael the judgment-call questions; he answers quickly; then it writes up. (Tedious diff automated; judgment calls confirmed.)

**Contact auto-creation on analyst change.** If the new letter's analyst (e.g., "Courtney Hester") isn't an existing contact, create the contact and link it to the lien entry as current analyst. Old analyst (e.g., "Bob Johnson") preserved via the contact-history mechanism (item G), not erased. Builds the contact database automatically as letters come in.

**Downstream:** feeds the existing lien-clearance / reduction math and settlement gate (per project instructions §9 pre-disbursement lien-clearance gate). Coordinate with billing-module D-series outputs.

---

## E. Case-law dictation + Free Law API  *(future; ties A + CourtListener)*

**Goal.** Speed the case-interpretation loop. Michael reads a case a few times, forms his judgment, and **dictates his read** instead of typing. Envisioned flow: an issue has a list of cases to work; Michael records case-by-case ("this one holds X, here's my read, here's how it applies"); audio returns as transcribed interpretations tied to each case.

**System role:** organize the dictated reads, cross-check each against the actual opinion text retrieved via the **CourtListener / Free Law Project API** ($10/mo), and flag anything that doesn't line up with the source. Retrieval is automated; interpretation stays Michael's (Registry rule 2 — API text ≠ verification). Origin context: last night's Haygood-line work required manual PDF pulls before Claude gained confidence; the API removes that busywork.

---

## F. Court profile — local rules & controlling documents  *(pattern C; drafting integration)*

**Goal.** Each court profile gets a document upload area for the court's local rules and any other controlling documents. Federal courts additionally: per-judge questionnaires (confirmed practice in W.D. Tex., San Antonio division — each judge has a PDF covering courtroom preferences: podium vs. table, who to contact for specific issues, etc.).

**Behavior:**
- When a court is linked to a matter, its documents auto-become available on that matter — pull them up by looking at the court.
- **Currency check:** a periodic trigger (~every 3 months) warns Michael to verify whether new local rules have issued. (Aligns with Legal Rule Registry citation-currency alerting — coordinate, don't duplicate.)
- **Drafting integration (ambitious):** local-rule content feeds the drafting functions. When drafting in a matter tied to a specific court, prompt with court-specific requirements — e.g., "429th Judicial District requires the court's own form discovery control plan and scheduling order instead of yours." (If drafting uses the Claude API, these prompts are injected context.)

**Rationale (capture — this is the *why*):** Missing a local rule can harm a client's case — blown local deadlines, missed required procedures, wrong form when the court mandates its own. Local rules carry local deadlines and procedural requirements that bear on multiple points across a case. Surfacing them automatically at the moment of work is risk management / client protection. (The day-to-day annoyance of being questioned for not checking is the minor layer on top.) Court types: mostly district courts; some JP courts (which also have local rules).

---

## G. Contact management — duplicate detection + job history  *(cross-cutting; triggered by, but broader than, item D)*

**Problem.** Every case-management system Michael has used lets users create duplicate contacts when they can't find an existing one — you end up with five records for the same person/business, several old or wrong, and no way to know which to attach.

**Duplicate check at creation.** When a new party's name matches an existing contact, stop and prompt ("I already have someone by this name — same person?"). Show existing record(s) side by side; Michael can pick existing, merge new info in, or confirm it's genuinely different and proceed.

**Match logic (weighted, not name-only).**
- Name = trigger, weakest signal alone (many "Bob Johnson"s).
- Strong identifiers: direct dial, personal email, attorney bar number → high weight; shared value ≈ same person.
- Weak signals: shared 1-800 main line, same employer → low weight; never auto-merge on these.
- **Extension nuance:** a shared 1-800 number with different extensions = different people (e.g., State Farm main line, Bob at x123 vs. Mary at a different extension). If someone has a direct dial, that's the identifier; if only the main line, the extension distinguishes.
- Enough weight → prompt to review. Never auto-merge on a weak match.

**Gray-area handling.** For uncertain matches, don't force yes/no. Show both records, highlight matches/differences, offer three paths: confirm same → merge; confirm different → create; **defer** (flag as possible duplicate, set aside, revisit when more info arrives, e.g., the next letter). System remembers decisions — if Michael confirms two are genuinely different, stop re-flagging that pair.

**Merge behavior.** Pull best info from each into one clean record; for conflicts (e.g., two fax numbers) ask which is current rather than guessing; superseded value drops into history, not deleted.

**Job history (career timeline).** When a contact changes employer (adjuster moves State Farm → Progressive; attorney changes firms), don't erase the old record — update current employer, keep a job history on the contact (auto-saved as records come in). Michael can view the timeline anytime. Value: strategic insight, and a friendly icebreaker before getting down to business. Contact = career history, not a static snapshot.

---

## H. Negotiation tab / "negotiation kit"  *(future side project)*

**Goal.** A negotiation tab (PI first; potentially any case type) that assembles what matters when negotiating with an adjuster:
- Notes from conversations with client / client's spouse.
- Key points from medical records; billing and damages picture.
- All in one "negotiation kit" view.

**Ambitious layer — negotiation analysis model.** Historical negotiation data per insurer: across a history of (e.g.) State Farm cases, surface the moves both sides made (how far Michael came down, how far they came up) and the context (billing, damages) behind each. Pattern recognition across an insurer over time.

**Data source tie-in:** feeds partly from the transcription project (item A) — recorded adjuster calls become searchable source material; adjuster offer history auto-builds (amount + date + quote), which also supports the Stowers trail per project instructions §9.

Not a build-now item; contained future project.
