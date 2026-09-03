/**
 * The `ParagraphWriter` — the ONE interface through which a model is ever
 * reached, and the shape of a call that has no vendor yet (`AS-Q1`, §7.5).
 *
 * ⚠ **NO VENDOR EXISTS HERE, AND THAT IS THE POINT.** `H12-v` is Michael's:
 * *"they obviously need to wait on that so I can figure that out."* There is no
 * SDK, no key, no endpoint and no model name anywhere in this directory or in
 * `package.json`. The single credential slot is a vendor-NEUTRAL secret name
 * (D-38) that is never set in any environment this slice ships. A test asserts
 * every limb of that.
 *
 * **NO REAL RECORD MOVES THROUGH THIS PATH UNTIL A BAA IS SIGNED** (§16.3).
 * The only implementation shipped is the FIXTURE writer, which makes zero
 * network calls — also a test.
 *
 * TWO CALLS, and they are different in kind:
 *
 *  - `extract` returns **RECORDS** — names, credentials, dates, visit rows, a
 *    short summary. Records are validated for SHAPE (an ISO date or null, a
 *    non-empty name) and then live under the panel's record checks like any
 *    other record.
 *  - `write` returns **OPAQUE PLAIN TEXT PARTS**. Nothing inspects, lints,
 *    byte-matches or parses them. Not for the custodian limbs, not for the
 *    basis wording, not for a date, not for similarity between paragraphs
 *    (§11.6 "Option 1"; `HD-20-a`; the slice's §12, twice). The app places its
 *    own sentences around them and never reads inside one.
 */

import type { ParagraphShape } from '../../domain/caseProviders';

/** A facility as the model is told about it: name PLUS the directory's aliases,
 *  because a d/b/a form is what a chronology actually names (§7.1). */
export interface ExtractionFacility {
  caseProviderId: string;
  name: string;
  aliases: string[];
}

export interface ExtractionInput {
  /** The newest READABLE version's text, WHOLE and unmodified (§16.2 — the
   *  scrub approach was abandoned by Michael; the BAA is the mechanism). */
  chronologyText: string;
  chronologyVersionId: string;
  /** ⚠ The chronology is NEVER searched for facilities (§14.4, the OBGYN rule).
   *  The model populates individuals under the facilities on THIS list and
   *  returns nothing about any other. */
  facilities: ExtractionFacility[];
}

/** What the model may return about a person — and the list is exhaustive by
 *  ruling (`AS-Q2`): names, credentials, dates, visit rows, a per-individual
 *  summary. **Never a type, never a role marker, never which facilities are in
 *  the case.** The absence of those fields from this type is the enforcement. */
export interface ExtractedIndividual {
  displayName: string;
  credentialSuffix?: string;
  treatmentFrom?: string;
  treatmentTo?: string;
  summary?: string;
  visits?: { visitDate?: string; description?: string }[];
}

export interface ExtractionResult {
  perFacility: { caseProviderId: string; individuals: ExtractedIndividual[] }[];
}

/** A fixed sentence as the writer is SHOWN it — already filled and inflected
 *  exactly as the app will place it (D-23), so the writer's prose reads into
 *  it. The writer never writes one and is told not to restate it. */
export interface ShownFixedSentence {
  slot: string;
  text: string;
}

export interface WriteInput {
  shape: ParagraphShape;
  /** Empty when no readable chronology exists — the hand-typed summaries are
   *  then the writer's only material and a panel line says so (D-27). */
  chronologyText: string;
  client: { name: string; pronounSubject: string; pronounPossessive: string };
  incidentDateLong: string;
  /** "collision" for a motor-vehicle case, "incident" otherwise (§6.5, D-10). */
  incidentNoun: string;
  facility: { name: string; type?: string };
  individuals: {
    displayName: string;
    credentialSuffix?: string;
    roleMarker?: string;
    treatmentFrom?: string;
    treatmentTo?: string;
    summary?: string;
    visits: { visitDate?: string; description?: string }[];
    /** D-12: the writer is TOLD when a person is absent from the latest
     *  chronology, and gets the summary carried from the version that named
     *  them, rather than being handed a silent gap. */
    missingFromLatest: boolean;
  }[];
  fixedSentences: ShownFixedSentence[];
  /** All twelve §9 paragraphs, unedited, as VOICE EXAMPLES (§11.7). */
  voiceExamples: { section: string; body: string }[];
  writerInstructions: string;
  /** Shape-specific direction (§7.3 item 7). */
  shapeNote?: string;
}

/**
 * The writer's named parts. Plain text, opaque, never inspected.
 *
 * Which keys a shape asks for is §6.2's contract: `opening` + `middle` for the
 * treating shapes and the imaging facility; `opening` alone for the rider;
 * `body` for the pharmacy and the other-non-physician shape;
 * `care_episode_clause` (optional) for custodian-only; NONE for mental health
 * and for the retained paragraph, which is hand-typed.
 */
export interface WriterParts {
  opening?: string;
  middle?: string;
  body?: string;
  care_episode_clause?: string;
}

export interface ParagraphWriter {
  /** Names for the facilities given, and nothing else. */
  extract(input: ExtractionInput): Promise<ExtractionResult>;
  /** ONE call per PARAGRAPH (D-22) — isolation, per-paragraph failure, and a
   *  per-paragraph regenerate later without reshaping the interface. */
  write(input: WriteInput): Promise<WriterParts>;
  /** Identifies the implementation. The registry is `['fixture']` in BOTH
   *  modes and a test pins it — that is the BAA gate as a build fact. */
  readonly kind: 'fixture';
}

/** Thrown when a writer call fails or returns a malformed envelope. This is an
 *  ERROR STATE, deliberately NOT a fourth must-fix stop (D-3): §12.3 closed the
 *  stop list by ruling, and a writer failure is an engineering outcome the
 *  record never addressed. Nothing is assembled or filed for the whole
 *  instrument, the failing facility is named, and the generate can be retried —
 *  never "render what you have", because a missing designation is its own
 *  exposure (Part 1). */
export class WriterCallError extends Error {
  facilityName?: string;

  constructor(message: string, facilityName?: string) {
    super(message);
    this.name = 'WriterCallError';
    this.facilityName = facilityName;
  }
}
