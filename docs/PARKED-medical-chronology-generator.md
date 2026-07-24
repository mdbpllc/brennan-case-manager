# PARKED — In-House Medical Chronology Generator (Prototype Plan + Prompt)

> **STATUS: BACK BURNER. NOT A PRIORITY. DO NOT SEQUENCE INTO THE BUILD PLAN.**
>
> This is an idea Michael is considering, stored ready-to-go for a future weekend. It does **not** compete with or precede any live Brennan Case Manager work. Current priorities remain unchanged: v0.1 feedback review, BUILD-SESSION-NOTES.md review, then billing module Phase 1a.
>
> If a future session asks "what's next," the answer is **not this document**.
>
> Filed: 2026-07-23. Origin: Novo vendor contract review session.

---

## 1. What this is

A standalone tool that takes a set of medical records (PDF) and produces a medical chronology in the firm's own format — replacing the per-matter Novo purchase.

Independent of the case manager for now. If it ever gets built and proves out, the natural home is the Medical tab, downstream of the billing module's bill ledger (same records, two different extractions). But that integration is speculative and should not influence billing module design.

**Contract posture (from the 2026-07-23 review):** Michael owns the Novo Outputs outright under ToS §6, which names chronologies specifically. Studying a deliverable he owns to design his own tool is defensible. The line he must not cross is ToS §5(a) — running matters *through Novo for the purpose of* studying or benchmarking it — and §5(e), reverse-engineering the Services themselves. Build from mixed clean sources (own prior chronologies, CLE exemplars, raw records), don't copy Novo's templated section wording, and don't feed Novo matters whose purpose is testing this tool. Internal firm use only; if this ever becomes a product for sale, get outside counsel first.

---

## 2. Economics (why it's worth a weekend)

Per-matter, on the 255-page Uvalde example (~180k tokens in, ~10k out):

| Line item | Cost |
|---|---|
| OCR (basic text detection, ~$1.50/1,000 pages) | ~$0.38 |
| Model — Haiku pass (splitting/tagging), $1/$5 per MTok | ~$0.23 |
| Model — Sonnet pass (clinical extraction), $3/$15 per MTok | ~$0.70 |
| Model — verification pass | ~$0.50 |
| **All-in** | **~$2–3** |

Current Novo cost: **$249/credit** (20 credits = $5,390.85 all-in, ~$270/matter effective).

Annual technology cost to self-serve at current volume: roughly $50–100. Gap on the table: ~$5,000/year.

**But** the honest break-even isn't the model fees — it's build time plus perpetual maintenance. At ~20 matters/year the savings barely cover a contract developer; at ~100/year the math flips hard. Self-building changes that calculus because the labor is Michael's own and adjacent to skills he's already using on the case manager.

The non-financial driver may matter more than the money: building in-house eliminates every privacy and contract problem identified in the Novo review — the retention.com identity-resolution adtech firing on a logged-in legal platform, the undisclosed/white-labeled AI subprocessors with only "best efforts" anonymization, the training-data conflict between MSA §7.2 and ToS §7, the missing BAA, and the minor-plaintiff parental-consent obligation. No amendment can fully fix those.

---

## 3. The weekend prototype — four moves

Deliberately minimal. No database, no UI, no template formatting. The goal is a single question: **is the output trustworthy enough to edit and use?**

**Move 1 (Friday).** Pick one file already owned — a *clean digital PDF*, not a scanned mess. Skip OCR entirely on the first run by starting with records that already carry real text. That removes a whole failure layer from night one.

**Move 2.** Get an Anthropic API key. Write the smallest possible script: hand the record text to Claude with the prompt in §4 below, print what comes back. That's it. The prompt is the product; everything else is plumbing.

**Move 3 (Saturday).** Read the output against the actual file, by hand, carefully. This is the entire point of the weekend. Not "did the code run" but "did it miss a treatment date, and did it invent anything." Score it against the known defects in the Uvalde example: does it catch the she/her misgendering across the five PT notes, the 06/24 vs 06/25 onset conflict, the 10/08/2025 note contradicting causation on the hip, and the multiple MRNs?

**Move 4.** Iterate on the prompt four or five times. Each miss teaches the next revision.

If Sunday night produces something worth editing and using, the core is proven and a real build is justified. If it fights the whole way, that's a $10 lesson instead of a five-figure one.

**Guardrail:** use a de-identified or old closed-matter file. No BAA is in place for this prototype, so no live client PHI goes through it. Strip names and identifiers first. A BAA with Anthropic is a prerequisite before *any* real matter runs through this.

---

## 4. The prompt

Paste-ready. Send the record text in the same message, after the prompt, under a `<records>` tag.

```
You are a medical-records analyst preparing a medical chronology for
plaintiff's counsel in a Texas personal injury matter. Your work product
will be relied on by an attorney drafting a demand letter. Accuracy and
completeness are more important than concision.

MATTER CONTEXT
- Client: [NAME OR IDENTIFIER]
- Date of loss: [DATE]
- Mechanism: [e.g., motor vehicle collision, T-boned driver's side]
- Venue: [COUNTY, TX]

ABSOLUTE RULES

1. Use ONLY what appears in the records provided. Never infer, extrapolate,
   fill gaps from general medical knowledge, or smooth over ambiguity.
2. Every factual assertion must carry a source citation in the form
   [p. NNN] pointing to the page of the provided records. If you cannot cite
   a page, do not make the assertion.
3. If a date, provider, diagnosis, or finding is illegible, missing, or
   ambiguous, write "[UNCLEAR IN RECORD — p. NNN]" rather than guessing.
4. Never omit a treatment encounter. A missing entry is a more serious
   error than a redundant one. When in doubt, include it.
5. Quote verbatim (in quotation marks, with page cite) any statement bearing
   on causation, pre-existing condition, symptom onset, work status, or the
   patient's own description of injury. Paraphrase everything else.
6. Do not characterize, argue, or advocate. Report what the records say.

OUTPUT FORMAT

## Case Overview
One to three paragraphs. Patient age and sex as stated in the records,
mechanism of injury, immediate post-incident course (EMS, ER, initial
complaints), and day-of-incident imaging and findings. State explicitly
whether acute traumatic injury or fracture was identified. Separately and
explicitly identify any PRE-EXISTING or DEGENERATIVE findings documented on
day-of-incident imaging, with page cites — these are anticipated defense
themes and must not be buried.

## Treatment Timeline
Chronological, earliest first. Include any PRE-ACCIDENT records provided,
labeled "(pre-accident baseline)" — these establish the before-picture and
are as important as post-accident care.

Format each entry:

**MM/DD/YYYY** — Facility/practice name (Treating provider name, credential).
Reason for visit; objective findings; diagnoses with ICD codes where stated;
medications prescribed or administered; imaging or testing performed and
results; measured outcomes or scores; plan and follow-up. [p. NNN]

Rules for this section:
- Collapse a repetitive course of like treatment (e.g., a run of PT visits)
  into a single date-range entry summarizing visit count, the diagnoses
  treated, and the trajectory of any measured scores from first to last —
  but list any individual session separately if it contains a distinct
  finding, a change in plan, or a statement bearing on causation.
- Where the same encounter appears in multiple records, report it once and
  cite all pages.
- Use the date of service, not the date of dictation or signature.

## Record Inconsistencies to Resolve
A bulleted list of every internal contradiction, apparent error, or gap that
counsel should resolve before production. Look specifically for:
- Conflicting dates of onset or dates of loss across records
- Wrong patient sex, name, or pronouns (template/dictation errors)
- Multiple or conflicting medical record numbers
- Any note stating or implying a complaint is NOT related to the incident,
  where the rest of the record indicates otherwise
- Diagnoses that appear once and never again
- Referrals or recommended workups with no documented follow-through
- Gaps in treatment of 30 days or more (state the gap and its dates)
For each: state the inconsistency, cite every page involved, and state what
would resolve it.

## Unrelated but Significant Findings
Findings documented in the records that are not attributable to the incident
but bear on damages, life expectancy, future care needs, or the client's
overall condition. Include incidental imaging findings flagged for workup,
and any documented mental-health findings or screening scores. Cite pages.

## Anticipated Future Care
Every future treatment, procedure, referral, testing, or follow-up
recommended by a treating provider, attributed to the recommending provider
with a page cite. Include scheduled appointments with their dates. Do not
add recommendations that no provider made.

## Source Inventory
A table of every distinct provider/facility appearing in the records: name,
type, date range of records present, and approximate page range. Note any
provider referenced in the records whose own records are NOT included in
this production.

Begin. Records follow.
```

**Second-pass verification prompt** (run against the first output plus the original records — this is the pass that earns its keep):

```
Below is a draft medical chronology and the underlying records it was
built from. Audit the draft. Do not rewrite it.

Report, as a list:
1. FABRICATIONS — any assertion in the draft not supported by the cited page.
2. OMISSIONS — any treatment encounter, provider, diagnosis, prescription,
   imaging study, or future-care recommendation in the records that does not
   appear in the draft.
3. CITATION ERRORS — any cite pointing to the wrong page.
4. DATE ERRORS — any date in the draft that does not match the record.
5. MISSED INCONSISTENCIES — contradictions present in the records that the
   draft's inconsistency section failed to flag.

For each item: quote the draft text, quote or describe the record text, and
give the correct page. If a category is clean, say so explicitly.
```

---

## 5. Pipeline sketch (if the prototype proves out)

Five stages. Only stages 3 and 5 exist in the weekend version.

1. **Ingestion / OCR** — Google Document AI, AWS Textract, or Azure Document Intelligence. ~$1.50/1,000 pages basic. Needed for scanned and handwritten records; skippable for clean digital PDFs.
2. **Segmentation** — split the production into discrete records; tag each with provider, date of service, record type. Cheap model (Haiku) work. This is what makes chronological ordering and duplicate-collapsing possible, and what surfaces things like multiple MRNs.
3. **Extraction** — the prompt above. Sonnet or Opus. This is where the clinical reasoning happens and where cutting cost is a false economy.
4. **Assembly** — merge duplicates, order the timeline, split incident-related from unrelated findings.
5. **Output** — render into the firm's template.

**Where the difficulty actually lives:** not in the happy path, which is a weekend. It's in the tenth record that's a faxed handwritten note at an angle; the 600-page production that blows past context limits; and above all the validation layer that guarantees no treatment date is ever silently dropped. In this practice area a missed entry isn't a bug, it's exposure. That reliability work is ~80% of a real build and none of the fun. Budget accordingly, and be honest at the prototype stage about whether that appetite exists.

**Prerequisite before any live matter:** BAA with the model provider (Anthropic offers one), plus a decision on where records sit at rest.

---

## 6. Explicitly out of scope

- Any integration with the case manager
- Any change to billing module Phase 1a design
- Any repo work, branch, or issue
- Any commitment to build

This document is a parking space, not a plan.
