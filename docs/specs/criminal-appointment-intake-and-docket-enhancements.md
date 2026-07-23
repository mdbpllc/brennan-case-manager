# Criminal Appointment Intake & Docket Worksheet Enhancements

Status: SPEC DRAFTED 2026-07-23 (phone dictation session, Michael) — awaiting sample OAA uploads before field mapping is finalized.
Origin: Michael used the 2026-07-22 docket worksheet in court; the worksheet itself was correct, but some of his cases appeared on the printed docket with only the prosecutor listed — the docket had printed before his appointment was entered. This spec closes that gap at the source.

---

## 1. OAA-based matter creation ("upload the order, get the matter")

### Problem
On appointed criminal work, every representation begins with an **Order of Attorney Appointment (OAA)** signed by the judge. Today, creating the matter means re-keying everything on that order by hand — and until the matter exists in the system, nothing downstream (docket cross-referencing, calendaring) can see the case.

### Feature
When creating a new **criminal** matter, offer an alternate intake path: **upload the OAA instead of filling in fields.**

Flow:
1. Michael selects "New criminal matter → from Order of Attorney Appointment" and uploads the OAA (PDF, or scan image).
2. System extracts every field available on the order and pre-fills a **draft matter**.
3. Draft is presented for review — Michael corrects anything that's off.
4. Michael clicks **Create Matter** to commit. Nothing is committed without this explicit confirmation (same human-in-the-loop pattern as the billing module's CONFIRMED AnalysisRuns).

### County document quality — two extraction tiers
- **Tier 1 (clean digital): Uvalde and Real counties.** The OAA is a consistent digital form, unambiguous fields, complete information. Straight text extraction; expect near-perfect pulls.
- **Tier 2 (scanned/OCR): DeWitt County** (and treat any unrecognized-format OAA this way). The order is printed, ink-signed by the judge, scanned by the clerk, and delivered by email or postal mail. Requires OCR; expect noise, especially in any handwritten portions. Extraction confidence must be tracked per field (feeds §2 thresholds).
- Architecture note: build as a **per-county template registry** (county → known OAA layout → field map), with Tier 2/OCR as the fallback for anything unmatched. New counties get added by registering a template, not by new code.

### Field mapping — PENDING SAMPLES
Michael will upload sample OAAs (Uvalde/Real digital form; DeWitt scan). Until then, expected extractable fields [CONFIRM against samples]:
- Defendant name; cause number(s); court (county / district); offense(s) as charged; appointment date; judge; and any hearing setting stated on the order (§2).
- Populate the matter with linked party records per the settled parties model (court as organization, etc.).

## 2. Hearing auto-detect with confidence thresholds

During OAA intake (and, by extension, any criminal-paperwork upload at matter creation), the system must resolve the question: **is a hearing already set?**

Logic:
1. **Scan the uploaded paperwork for a hearing setting first.** If a date/time/setting is present, extract it.
2. **Confidence gate on the extracted date:**
   - **High confidence** (clean digital source, unambiguous date field — typical Tier 1): auto-create the calendar entry, and **flag it visibly** in the draft-matter review so Michael's eye passes over it before the review step ends.
   - **Low confidence** (OCR source, ambiguous/handwritten date, conflicting dates in the document — typical Tier 2): do **not** auto-create; present the candidate date and pause for Michael's confirmation.
   - Threshold values: implementation detail, but the split must be conservative — a wrong court date on the calendar is worse than one extra confirmation click. [Tune during build.]
3. **If no hearing found in the paperwork:** prompt Michael directly — "Is a hearing already set on this matter?" — with a quick date/time entry if yes.
4. Every calendar entry created here flows through the standard calendaring layer, and therefore through the **Outlook calendar push** once that ships (see `outlook-calendar-sync.md`).

## 3. Docket worksheet cross-referencing ("find my clients before asking me")

### Problem
Docket call listings can omit Michael as counsel (docket printed before appointment was entered). The current worksheet process only captures cases where his name appears — in court on 2026-07-22 he had cases on the docket that the worksheet couldn't have caught from the PDF alone.

### Feature
When building a docket worksheet, before finalizing the case list:
1. **Cross-reference every defendant name on the docket against existing matters in the system.** Any match (exact or fuzzy — names on dockets vary in format) where Michael is counsel gets pulled onto the worksheet even if the docket shows only the prosecutor, with the existing "newly appointed — docket printed before appointment" style note.
2. **If an email connection exists** (see `outlook-email-intake.md` — future), also scan email for docket names as a secondary, fuzzier signal (e.g., an OAA arrived by email but no matter was created yet).
3. **Then prompt Michael:** "Are any other defendants on this docket your clients?" — listing (a) confirmed matches auto-included, and (b) any uncertain fuzzy matches for his yes/no.
- Precedence of signals: matters database (authoritative) > email scan (suggestive) > manual prompt (catch-all). The manual prompt never goes away; the goal is for it to be empty most days.
- Note the compounding loop: every OAA processed through §1 becomes a matter, which makes this cross-reference sharper. The three features in this spec are one pipeline.

## 4. Priority / sequencing (agreed 2026-07-23)

These features slot into the existing build queue as follows — they are additions, not replacements:
1. (unchanged) Review BUILD-SESSION-NOTES.md + Michael's v0.1 feedback.
2. (unchanged) Billing module Phase 1a — second vertical slice; revenue infrastructure holds its slot.
3. **Outlook calendar one-way push** (separate spec) — enters the build queue after billing Phase 1a; non-negotiable requirement, contained build.
4. **OAA intake (§1–2 here)** — after the Outlook push; depends on matter-creation being solid; DeWitt OCR path needs design time.
5. **Docket cross-referencing (§3)** — rides along whenever docket-worksheet logic is built into the software; enhancement, not standalone.

## 5. Open items
- [ ] Michael to upload sample OAAs: Uvalde/Real digital form + a DeWitt scanned example (redact or use a closed case — no live client data into the repo per data-hygiene rules).
- [ ] Finalize field map from samples; register county templates.
- [ ] Confidence-threshold tuning values (build-time).
- [ ] Fuzzy name-matching approach for docket cross-reference (docket name formats vs. matter records) — design at build time.
