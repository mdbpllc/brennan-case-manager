# Criminal Appointment Intake & Docket Worksheet Enhancements

Status: REVISED 2026-07-23 — field map completed from sample OAAs (Uvalde digital form; DeWitt scanned packet). Supersedes the same-day draft in full; this is a straight file replacement.
Origin: Michael used the 2026-07-22 docket worksheet in court; the worksheet itself was correct, but some of his cases appeared on the printed docket with only the prosecutor listed — the docket had printed before his appointment was entered. This spec closes that gap at the source.

---

## 1. OAA-based matter creation ("upload the order, get the matter")

### Problem
On appointed criminal work, every representation begins with an **Order of Attorney Appointment (OAA)** signed by the judge. Today, creating the matter means re-keying everything on that order by hand — and until the matter exists in the system, nothing downstream (docket cross-referencing, calendaring) can see the case.

### Feature
When creating a new **criminal** matter, offer an alternate intake path: **upload the OAA (or appointment packet) instead of filling in fields.**

Flow:
1. Michael selects "New criminal matter → from Order of Attorney Appointment" and uploads the document(s).
2. System segments (if a packet), extracts every available field, and pre-fills a **draft matter**.
3. Draft is presented for review — Michael corrects anything that's off.
4. Michael clicks **Create Matter** to commit. Nothing is committed without this explicit confirmation (same human-in-the-loop pattern as the billing module's CONFIRMED AnalysisRuns).

### County document quality — two extraction tiers (CONFIRMED against samples 2026-07-23)
- **Tier 1 (clean digital): Uvalde and Real counties.** Single-page consistent digital form; straight text extraction; near-perfect pulls expected. Sample confirmed the form is richer than assumed (see field map §1a).
- **Tier 2 (scanned/OCR): DeWitt County** (and any unrecognized format). Sample revealed Tier 2 is harder than assumed, in kind and not just degree:
  - **Arrives as a multi-document packet**, not a single order — the sample contained a Notice of Hearing, the judge's response / order-appointing-attorney form, the defendant's indigency application, and the indictment, in one scan. Extraction must be preceded by **document segmentation** (classify each page-run into document types), because different documents feed different fields.
  - **The operative appointment can live in handwriting that overrides the typed text.** In the sample, the typed/inked order appoints a *different attorney* (later withdrawn); Michael's appointment exists only in a handwritten margin annotation. Clean OCR of the typed text would confidently extract the wrong attorney. Design consequence (hard rule): **Tier 2 documents NEVER auto-accept anything. Full field-by-field human review, always.** Confidence scoring still runs, but it only orders/flags the review — it never skips it.
  - Handwritten margin notes, stamps ("FILED" blocks, "EMAILED COPY"), and multiple filing dates on one page are normal; extraction should surface candidate values with provenance (which page/region) so review is fast.
- Architecture note: **per-county template registry** (county → known layout(s) → field map), with Tier 2/OCR-packet processing as the fallback for anything unmatched. New counties get added by registering a template, not by new code.

### 1a. Field map — Tier 1 (Uvalde/Real digital OAA) [FROM SAMPLE]
| Form region | Fields → matter |
|---|---|
| Case header | Defendant name; court (e.g., 38th District Court); county |
| Offense(s) table (repeats per row — multi-cause support) | Offense date; offense + degree (e.g., `POSS CS PG 2 < 1G (FS)`); court; **cause number**; complaint number; **MTR/MTA checkbox**; **Appeal checkbox** |
| Defendant block | Local ID; DOB; phone / cell (often blank); address; city/state/zip; **custody location** (e.g., TDCJ unit); **indigency status** |
| Appointed-attorney block | Attorney name (validate = Michael; mismatch → hard stop, see §1c); phone; fax |
| Scope paragraph | Boilerplate (appointment through MNT + notice of appeal) — store as scope note, no field extraction needed |
| Free-text remarks line | **Docket availability date** (`ATTORNEY AVAILABLE FOR DOCKET ON <date>`); custody remarks; bench-warrant status → feeds calendaring (§2) with correct semantic label |
| Designee footer | Appointing designee name; **appointment date** + time |

Semantic mappings that matter:
- **MTR/MTA checked → setting/track is revocation-adjudication**, not a new charge. Drives the matter's setting type and the docket worksheet's setting column.
- **Custody location present → defendant in custody**; store on the matter (bench-warrant / writ logistics; also the worksheet's special-notes line).
- The "available for docket on" date is a **docket availability date, not a confirmed hearing setting** — calendar it, but labeled as such (§2).

### 1b. Field map — Tier 2 (DeWitt scanned packet) [FROM SAMPLE]
Per segmented document type:
| Document | Fields → matter |
|---|---|
| Order appointing attorney (judge's response form) | Cause number(s) — note sample carried TWO (a county/JP-style number and the district cause); indigency finding; appointed attorney **including any handwritten substitution/withdrawal annotations** (authoritative over typed text); judge; order date; filing stamps/dates |
| Notice of hearing | Cause number; **setting type** (e.g., arraignment) with CCP cite; court + judicial district; courthouse address/room; **hearing date + time**; clerk; cc list (when Michael was added to service — useful provenance) |
| Indictment (**gold mine**) | Charge; **penal code cite** (e.g., 31.03(e)(4)(A) & 12.42); **punishment range as enhanced** (e.g., SJF theft enhanced to second-degree range); offense date; property/complainant description; **enhancement paragraphs** (prior cause numbers, courts, conviction dates); grand jury term; D.A. bond recommendation |
| Indigency application | Defendant DOB; inmate ID; financial snapshot (income, dependents, debts); custody county (may differ from charging county — sample: Victoria custody, DeWitt charge) |
- **Name normalization:** the same defendant appears in multiple formats across the packet (full name, surname-first, handwritten short form). Extraction must normalize to one canonical party record; candidate variants shown at review.

### 1c. Validation rules (both tiers)
- **Attorney-name check:** if the extracted appointed attorney ≠ Michael (any reasonable variant), hard-stop the intake with the discrepancy shown — this is exactly the DeWitt substitution scenario, and silently proceeding is the worst failure mode.
- **Duplicate-matter check:** cause number(s) checked against existing matters before create; match → offer "update existing matter" instead of creating a duplicate.

## 2. Hearing auto-detect with confidence + semantics

During OAA intake, resolve: **is a hearing already set?**

1. **Scan the uploaded paperwork for settings first.** Extract every candidate date with its **semantic type**:
   - *Confirmed hearing setting* (a notice of hearing: type, date, time, courtroom) — calendar as a hearing.
   - *Docket availability date* (Uvalde-style remarks line) — calendar, but labeled as docket availability, not a confirmed setting.
   - *Administrative dates* (filing stamps, order dates, designee dates) — provenance only; never calendared.
2. **Confidence gate:**
   - **Tier 1, unambiguous date:** auto-create the calendar entry, **flagged visibly** in the draft-matter review.
   - **Tier 2 (always), or any ambiguity/conflict:** present candidate date(s), pause for confirmation. Per §1's hard rule, Tier 2 never auto-creates.
   - Threshold values conservative — a wrong court date is worse than an extra click. [Tune during build.]
3. **Stale-date guard [NEW, from DeWitt sample]:** a candidate date **in the past is never calendared** — the sample packet's hearing notice predated the scan by months and had already occurred. Past dates are recorded as case history and flagged ("packet includes a hearing that has already passed — is a new setting known?").
4. **If no future setting found:** prompt Michael — "Is a hearing already set on this matter?" — with quick date/time entry.
5. Every calendar entry created here flows through the standard calendaring layer, and therefore the **Outlook push** once shipped (`outlook-calendar-sync.md`).

## 3. Docket worksheet cross-referencing ("find my clients before asking me")

### Problem
Docket call listings can omit Michael as counsel (docket printed before appointment was entered). The current worksheet process only captures cases where his name appears — in court on 2026-07-22 he had cases on the docket the PDF alone couldn't have caught.

### Feature
When building a docket worksheet, before finalizing the case list:
1. **Cross-reference every defendant name on the docket against existing matters** where Michael is counsel. Any match (exact or fuzzy — docket name formats vary; see the name-normalization note in §1b) gets pulled onto the worksheet even if the docket shows only the prosecutor, with the existing "newly appointed — docket printed before appointment" style note.
2. **If an email connection exists** (`outlook-email-intake.md` — future), scan email for docket names as a secondary, fuzzier signal (e.g., an OAA arrived by email but no matter was created yet).
3. **Then prompt Michael:** "Are any other defendants on this docket your clients?" — listing (a) confirmed matches auto-included and (b) uncertain fuzzy matches for his yes/no.
- Signal precedence: matters database (authoritative) > email scan (suggestive) > manual prompt (catch-all; never removed — the goal is for it to be empty most days).
- Compounding loop: every OAA processed via §1 becomes a matter, sharpening this cross-reference. The three features are one pipeline.

## 4. Priority / sequencing (agreed 2026-07-23)

Additions to the existing build queue, not replacements:
1. (unchanged) Review BUILD-SESSION-NOTES.md + Michael's v0.1 feedback.
2. (unchanged) Billing module Phase 1a — second vertical slice.
3. **Outlook calendar one-way push** (`outlook-calendar-sync.md`) — after billing Phase 1a.
4. **OAA intake (§1–2)** — after the Outlook push; the DeWitt segmentation/handwriting findings raise its design cost; Tier 1-only could ship first if needed. [Michael to decide at build time whether Tier 1 ships ahead of Tier 2.]
5. **Docket cross-referencing (§3)** — rides with the docket-worksheet feature.

## 5. Open items
- [x] Sample OAAs uploaded and analyzed (2026-07-23): Uvalde digital form; DeWitt scanned packet. Field maps in §1a–1b.
- [ ] Real County sample still outstanding — assumed to match the Uvalde form family. [CONFIRM with a sample before registering the template]
- [ ] Segmentation approach for Tier 2 packets (document-type classifier) — design at build time.
- [ ] Handwriting handling on Tier 2 (margin annotations are sometimes the operative content) — extraction surfaces candidates with page/region provenance; never auto-accepted.
- [ ] Confidence-threshold tuning values (build-time; Tier 1 only, per the Tier 2 hard rule).
- [ ] Fuzzy name-matching approach shared by §1b normalization and §3 cross-reference.
- Data-hygiene note: the sample documents themselves stay OUT of the repo (real case data). Only these derived field maps are committed.
