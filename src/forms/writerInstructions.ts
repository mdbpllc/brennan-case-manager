/**
 * The WRITER'S INSTRUCTIONS — versioned template data (`AS-Q12(d)`, D-36).
 *
 * Michael ruled the HOME: one `form_templates` row, family
 * `writer-instructions`, versioned like every other template, its version id
 * stamped on every paragraph record so a served paragraph can always be traced
 * to the exact instruction that produced it. He did NOT rule the prose.
 *
 * **THE PROSE BELOW IS CLAUDE'S, WRITTEN UNDER MICHAEL'S RULINGS, AND SAYS SO
 * ON ITS OWN FACE.** D-36 requires exactly that: the wording is nobody's until
 * he edits it in `/templates`, and editing it there publishes a new version the
 * way editing any template does. Every RULED element it must carry is listed at
 * the slice's §7.4 (a)-(j) and each is cited in place below, so a later reader
 * can tell the ruling from the sentence built around it.
 *
 * ⚠ NOTHING IN THE APP EVER CHECKS THAT THE WRITER FOLLOWED ANY OF THIS.
 * That is not an omission — it is §11.5's ruling. A phrase-match over returned
 * prose "just teaches him to ignore warnings", so a miss shows on the page and
 * is corrected in Word. What IS testable is that the instruction reached the
 * payload, and that is what the tests assert.
 */

/**
 * The four custodian limbs, from Michael's own §9.11 — RULED "All four limbs
 * required every time" (`REQ-CAPTURE` §11.6). Stated once here because three
 * places need them and a fourth copy would be a fourth thing to drift.
 */
export const CUSTODIAN_LIMBS = [
  'the records were made and kept in the regular course of business',
  'by persons with knowledge of the acts and events recorded',
  'at or near the time of the acts and events recorded',
  'the charges reflected in those records, and their reasonableness',
] as const;

export const WRITER_INSTRUCTIONS_KEY = 'disclosures-writer-instructions';

/**
 * The seeded body. Plain prose, because it is handed to a model as prose.
 */
export const WRITER_INSTRUCTIONS_BODY = `HOW TO WRITE THE PARTS OF AN EXPERT-DESIGNATION PARAGRAPH

This wording is Claude's, written under Michael Brennan's rulings. It is editable
here; editing it publishes a new version, and the version that was current is
stamped on every paragraph it produced.

1. WRITE ONLY YOUR PARTS. You are given the fixed sentences this paragraph will
   contain, already filled in and inflected exactly as the app will place them.
   They are shown to you so your prose reads into them. Do not restate them, do
   not paraphrase them, and do not write them yourself. The app places them.

2. RETURN NAMED PARTS, NEVER A PARAGRAPH. Return only the parts you are asked
   for, as plain text. No markdown, no bold, no bullet characters, no headings,
   no quotation marks around the whole. The app assembles the paragraph.

3. YOUR "opening" CONTINUES A SENTENCE THAT HAS ALREADY BEGUN. The app writes a
   bold lead naming the person and their credential, ending in a comma — for
   example "Jane Doe, M.D.," — and your opening is what follows it. Begin with
   the verb: "is an emergency medicine physician who treated ...". Do not repeat
   the name, and do not begin a new sentence. For a group, the lead names all of
   them and your opening is plural: "are physicians who ...". For a pharmacy the
   lead is the facility's own bold name, and your opening continues from it.

4. THE CUSTODIAN SENTENCE — ALL FOUR LIMBS, EVERY TIME. Somewhere in your parts,
   before the causation sentence, say that the facility's records and billing
   are subject to custodian testimony, and include all four of these:
     - the records were made and kept in the regular course of business;
     - by persons with knowledge of the acts and events recorded;
     - at or near the time of the acts and events recorded;
     - the charges reflected in those records, and their reasonableness.
   Where you place it is yours. Its wording is yours. All four limbs are not.

5. DESCRIBE ONLY WHAT THE RECORDS RECORD. Do not write an examination sentence
   where no examination is recorded. Do not write a diagnosis clause where the
   records name no diagnosis. NEVER assert that anyone is board certified unless
   the chronology or the record says so. If the material is thin, write less —
   degrade rather than invent.

6. DATES: never describe an imaging study's date as the date of the incident, or
   the incident's date as the date of a study. Imaging performed the same day in
   an emergency department is ordinary and you are free to describe it as such;
   what is barred is calling one date the other.

7. THE EVENT NOUN. You are told the event noun for this matter. Use "collision"
   only when you are given it; otherwise use "incident". Do not substitute a
   livelier word, and do not infer the mechanism of injury from the records.

8. FUTURE CARE belongs in your middle part — the need for future medical care
   and its reasonable cost, where the records support it. It is deliberately NOT
   in the fixed causation sentence.

9. A MIXED FACILITY — say what EACH individual did, then pair them together. A
   chiropractor and a physical therapist at one clinic get one paragraph that
   distinguishes their care before treating it as one course of treatment.

10. A MID-LEVEL RIDER is two parts only: what the physician assistant or nurse
    practitioner actually did, and then the app's fixed scope sentence. It
    carries no lead and no custodian sentence. Keep it short.

11. A PHARMACY paragraph is records-and-billing testimony, not treatment: that
    the records are true and correct, testimony as to the bills, and that the
    charges are reasonable and necessary — with all four custodian limbs. No
    fixed sentence is placed for you, so the whole body is yours.

12. AN "other licensed non-physician provider" gets NO fixed causation sentence
    from the app. Describe the testimony the records actually support. Do not
    reach for a causation opinion the records do not carry, and do not import
    the medical-probability language from another provider type.

13. A CUSTODIAN-ONLY paragraph is not yours. The app places it whole. If you are
    asked for a care-episode clause, return ONE complete sentence naming the
    episode of care and its date — for example, "The records reflect an
    emergency-department visit on March 14, 2025." — and nothing else.

The writing is yours. The floor is not.`;

/** What the model is told about the case, per shape, is assembled at call time. */
export const WRITER_INSTRUCTIONS_NAME = 'Disclosures — writer instructions';
