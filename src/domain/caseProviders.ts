/**
 * `R17` — the CASE-SCOPED PROVIDER RECORD, its individuals, their visits, the
 * versioned chronology they come from, and the paragraph record a generation
 * leaves behind.
 *
 * Michael's ruling (`AS-Q3`): *"(A) Case-scoped record; promote to the directory
 * by hand; TYPE set per case, pre-filled from last time."* So the FACILITY is an
 * existing directory contact, its TYPE is set for THIS case, and the individuals
 * are rows beneath it that do not exist in the firm-wide directory at all until
 * Michael promotes one.
 *
 * TWO RULES THIS FILE EXISTS TO HOLD SHUT, both of them ruled:
 *
 *  1. **The model never creates a facility, a contact or an edge** (§14.4, the
 *     OBGYN rule) and **never assigns a type or a role marker** (§17.1a, "always
 *     assigned by a person"). It populates individuals beneath facilities
 *     Michael already selected, and nothing else.
 *  2. **A provider TYPE is never derived.** Not from a specialty string, not
 *     from a CD-1 role tag, not from the vocabulary. D-32's last-case query is
 *     the ONLY pre-fill, and a facility never typed before stays NULL — which
 *     is a must-fix stop, deliberately, because no fixed sentence pair can be
 *     chosen without it.
 *
 * Shapes mirror `db/migrations/2026-09-03-fe-d1-amendment.sql` column for
 * column. Where a column carries a ruling, the ruling is cited here too, because
 * this is the file a later reader reaches first.
 */

import type { ProviderTypeKey } from '../forms/providerTypes';

/** Formats the chronology reader accepts (D-43 — a CLOSED list, and a DEFAULT
 *  rather than a ruling: `RC-7`'s "anything the model can read" is open-ended,
 *  so the readable set is the build's and every other extension is refused at
 *  the drop with a message naming these). */
export const CHRONOLOGY_FORMATS = ['pdf', 'docx', 'xlsx', 'csv', 'json', 'txt'] as const;
export type ChronologyFormat = (typeof CHRONOLOGY_FORMATS)[number];

/** One row per PARAGRAPH (D-57). A radiologist split writes two; each rider its
 *  own; a mental-health facility writes NONE, because a block is not a
 *  paragraph. */
export const PARAGRAPH_SHAPES = [
  'treating-single', 'treating-group', 'treating-mixed', 'radiology-split',
  'imaging-facility', 'midlevel-rider', 'pharmacy', 'custodian-only',
  'other-non-physician', 'retained',
] as const;
export type ParagraphShape = (typeof PARAGRAPH_SHAPES)[number];

/** Where a row came from. Recorded on every extracted individual FROM BIRTH
 *  (`AS-Q13a`) so the "affiliation unverified" line can be lit later without a
 *  backfill — that line is NOT built; `CD-14` limb (i) is open. */
export type RowProvenance = 'model' | 'hand';

// ---------------------------------------------------------------- chronology

/**
 * A versioned chronology (`AS-Q4`): *"(i) Extracted text per version in the
 * database; bytes not retained; file store at gate 7."*
 *
 * **THE ORIGINAL FILE IS NOT KEPT.** Not as bytes, not as base64, not as a
 * blob. Only the text it reduced to. A file store is gate-7 work.
 */
export interface CaseChronologyVersion {
  id: string;
  caseId: string;
  /** Per CLIENT (`AS-Q10`). NULL on a one-client case reads as that client
   *  (D-54), exactly as `medical_bills.client_id` does. */
  clientId?: string;
  versionNo: number;
  droppedAt: string;
  droppedBy?: string;
  sourceFilename: string;
  sourceFormat: ChronologyFormat;
  extractedText?: string;
  /** D-62's threshold. FALSE = no usable text layer: flagged at the drop, NEVER
   *  sent to a model, and excluded from "newest". */
  readable: boolean;
  charCount?: number;
  /** D-60. A mis-dropped chronology is PHI in the wrong matter, so there is a
   *  way out. A removed version is never sent again and never counts as newest. */
  removedAt?: string;
  createdAt: string;
}

// ------------------------------------------------------------ the R17 record

/** The FACILITY row — case × client × facility. */
export interface CaseProvider {
  id: string;
  caseId: string;
  clientId?: string;
  /** A `parties` row of `kind = 'organization'`, enforced in the adapter (D-53). */
  facilityPartyId: string;
  /** **NULL IS THE MUST-FIX CONDITION** (§12.3) and is never defaulted. */
  providerType?: ProviderTypeKey;
  /** HAND-SET values are never overwritten by the D-13 derivation chain. */
  treatmentFrom?: string;
  treatmentTo?: string;
  /** D-15: the §5.2 LOP gate lives here now, typed, instead of in an untyped
   *  `party.fields` string. */
  lop: boolean;
  /** D-48: "extraction has RUN for this facility" is exactly this being set.
   *  Without it, a facility with zero individuals cannot be told apart from one
   *  never pulled — which three panel lines and the custodian-only fallback all
   *  key on. */
  lastExtractionVersionId?: string;
  lastExtractedAt?: string;
  /** D-32: the pre-fill WRITES the type, and the row says where it came from so
   *  the surface can read "type carried from <case> — change if wrong". */
  typeCarriedFromCaseId?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

/** A person beneath a facility. */
export interface CaseProviderIndividual {
  id: string;
  caseProviderId: string;
  displayName: string;
  /** Part 3: credential is NULLABLE. D-42 handles the LEAD's comma when it is. */
  credentialSuffix?: string;
  /** NULL reads as the FACILITY's type (§17.1a) — see `effectiveMarker`. */
  roleMarker?: ProviderTypeKey;
  /** D-11: they/their when NULL. Pronouns are DATA and are never guessed. */
  pronoun?: string;
  treatmentFrom?: string;
  treatmentTo?: string;
  /** The "what they did", `HD-21-b`, one per individual. */
  summary?: string;
  provenance: RowProvenance;
  chronologyVersionId?: string;
  /** Set at PROMOTION and NEVER by the model (D-56). Once set, the block and the
   *  LEAD read `parties` through it and the case row's name/credential become
   *  extraction provenance only. */
  partyId?: string;
  /** D-12: kept and FLAGGED, never deleted, when a newer chronology omits them. */
  missingFromLatest: boolean;
  /** D-55: Michael's delete is a SOFT delete, and no later pull resurrects it.
   *  His ruled act — "I can go through and delete anyone that I wanna delete" —
   *  has to survive the next drop. */
  removedByHandAt?: string;
  /** D-51: per-field provenance. A field named here is NEVER overwritten by
   *  re-extraction. */
  handEditedFields: string[];
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

/** A visit row. ONLY ever from a chronology (§17.7) — there is no hand path, by
 *  ruling, which is why `provenance` has one legal value rather than looking
 *  like it takes two. */
export interface CaseProviderVisit {
  id: string;
  individualId: string;
  visitDate?: string;
  description?: string;
  provenance: 'model';
  chronologyVersionId?: string;
  sortOrder?: number;
  createdAt: string;
}

/** What a generation leaves behind, one row per paragraph (`AS-Q13a`). */
export interface GeneratedDocumentParagraph {
  id: string;
  documentId: string;
  /** `on delete set null` (D-53): a SERVED record outlives its facility row,
   *  which is why the rendered name is kept beside it. */
  caseProviderId?: string;
  facilityNameAsRendered?: string;
  clientId?: string;
  /** The ordered individuals this paragraph covered — what `AS-Q14` will need
   *  if Michael rules that a new individual at a designated facility gets its
   *  own block, and what makes that buildable later with no backfill. */
  individualIds: string[];
  shape: ParagraphShape;
  leadText?: string;
  /** The writer's named plain-text parts, **OPAQUE**. Nothing inspects,
   *  byte-matches, lints or parses them — §11.6 "Option 1". */
  parts?: Record<string, string>;
  assembledText?: string;
  fixedSentenceVersionIds: string[];
  writerInstructionsVersionId?: string;
  chronologyVersionId?: string;
  /** The AUTOMATIC limb only (`AS-Q13a`). No charge weighting — Q5 stays HELD. */
  gapFlag: boolean;
  sortOrder?: number;
  createdAt: string;
}

// ------------------------------------------------------------------ helpers

/** Michael's soft delete is invisible everywhere except the "show removed"
 *  toggle: excluded from shape selection, the block, the LEAD and D-64's count
 *  (D-55). Every consumer goes through this rather than remembering to filter. */
export function activeIndividuals<T extends { removedByHandAt?: string }>(rows: T[]): T[] {
  return rows.filter((r) => !r.removedByHandAt);
}

/** D-48. "Zero individuals" means two different things and only this tells them
 *  apart: never pulled, or pulled and none found. */
export function hasExtractionRun(provider: Pick<CaseProvider, 'lastExtractionVersionId'>): boolean {
  return provider.lastExtractionVersionId != null;
}

/** The newest chronology version for a client — REMOVED and UNREADABLE versions
 *  are not candidates (D-60, D-62). This is the version that goes to the model,
 *  and the only one. */
export function newestReadableVersion(
  versions: CaseChronologyVersion[],
): CaseChronologyVersion | undefined {
  return versions
    .filter((v) => !v.removedAt && v.readable)
    .reduce<CaseChronologyVersion | undefined>(
      (best, v) => (!best || v.versionNo > best.versionNo ? v : best),
      undefined,
    );
}

/** The earliest non-empty date in a list, or undefined. ISO strings compare
 *  correctly as strings, which is why no Date is constructed — constructing one
 *  would put a timezone between a date and itself (the FE-D1 build's defect 2). */
function earliest(dates: (string | undefined)[]): string | undefined {
  const clean = dates.filter((d): d is string => typeof d === 'string' && d !== '');
  if (clean.length === 0) return undefined;
  return clean.reduce((min, d) => (d < min ? d : min));
}

export interface SortKeyInputs {
  individuals: Pick<CaseProviderIndividual, 'treatmentFrom' | 'treatmentTo' | 'removedByHandAt'>[];
  visitDates: (string | undefined)[];
  billServiceStarts: (string | undefined)[];
}

/**
 * D-13 — the ONE sort key, computed at render and **never written over a hand
 * value**.
 *
 * "Oldest treatment first" is RULED (`ND-7(b)`, `HD-21(a)`, `HD-21-med`); the
 * date's SOURCE, its nulls and its ties are not, so the chain is a named
 * default. It runs: the facility's hand-set `treatmentFrom` → the earliest
 * `treatmentFrom` among its non-removed individuals → the earliest visit date →
 * the earliest bill `serviceStart` for that facility and client → undefined.
 *
 * The hand-set value comes FIRST for a reason: `R17`'s dates are part of the
 * record Michael keys, so a derivation that overwrote them would be the app
 * arguing with him about his own matter.
 */
export function providerSortKey(
  provider: Pick<CaseProvider, 'treatmentFrom'>,
  inputs: SortKeyInputs,
): string | undefined {
  if (provider.treatmentFrom) return provider.treatmentFrom;
  const fromIndividuals = earliest(activeIndividuals(inputs.individuals).map((i) => i.treatmentFrom));
  if (fromIndividuals) return fromIndividuals;
  const fromVisits = earliest(inputs.visitDates);
  if (fromVisits) return fromVisits;
  return earliest(inputs.billServiceStarts);
}

/** The "dates of treatment" cell renders the SAME chain's from and to (D-13). */
export function providerTreatmentWindow(
  provider: Pick<CaseProvider, 'treatmentFrom' | 'treatmentTo'>,
  inputs: SortKeyInputs,
): { from?: string; to?: string } {
  const from = providerSortKey(provider, inputs);
  if (provider.treatmentTo) return { from, to: provider.treatmentTo };
  const latest = (dates: (string | undefined)[]) => {
    const clean = dates.filter((d): d is string => typeof d === 'string' && d !== '');
    return clean.length ? clean.reduce((max, d) => (d > max ? d : max)) : undefined;
  };
  const to = latest([
    ...activeIndividuals(inputs.individuals).map((i) => i.treatmentTo),
    ...inputs.visitDates,
  ]);
  return { from, to };
}

/**
 * ONE ORDER, EVERYWHERE (§8.4, `ND-7(b)` — *"oldest first is the rule"*).
 *
 * The charges table, the persons-with-knowledge entries, the designation
 * blocks, the wizard's facility list and the Medical tab all use this. The
 * Medical tab may offer other VIEW sorts; they never change document order.
 *
 * **Undated facilities sort LAST** — not first, which is what a naive ascending
 * sort over undefined would do in some engines and is the reverse of what the
 * rule means. Ties break on facility name so the order is total and stable.
 */
export function sortProvidersOldestFirst<T>(
  rows: T[],
  keyOf: (row: T) => string | undefined,
  nameOf: (row: T) => string,
): T[] {
  return [...rows].sort((a, b) => {
    const ka = keyOf(a);
    const kb = keyOf(b);
    if (ka && kb && ka !== kb) return ka < kb ? -1 : 1;
    if (ka && !kb) return -1;          // dated before undated
    if (!ka && kb) return 1;
    return nameOf(a).localeCompare(nameOf(b));
  });
}

/**
 * Within a facility: individuals in order of first appearance in the chronology,
 * hand-added last (§8.4). `sortOrder` carries the extraction's own sequence;
 * a hand-added row has none and falls to the end, then by name so two
 * hand-added rows have a stable order.
 */
export function sortIndividuals(rows: CaseProviderIndividual[]): CaseProviderIndividual[] {
  return [...rows].sort((a, b) => {
    const sa = a.sortOrder;
    const sb = b.sortOrder;
    if (sa != null && sb != null && sa !== sb) return sa - sb;
    if (sa != null && sb == null) return -1;
    if (sa == null && sb != null) return 1;
    return a.displayName.localeCompare(b.displayName);
  });
}

/**
 * The adapter-enforced invariants (D-53, and the two rules in this file's
 * header). Both adapters call this so they cannot diverge — the `validateEdge`
 * precedent from CD-1.
 */
export function validateCaseProvider(
  row: Pick<CaseProvider, 'caseId' | 'facilityPartyId' | 'providerType'>,
  facilityKind: 'individual' | 'organization' | undefined,
): void {
  if (!row.caseId) throw new Error('A provider record must belong to a case.');
  if (!row.facilityPartyId) throw new Error('A provider record must name a facility.');
  if (facilityKind !== undefined && facilityKind !== 'organization') {
    // FE-18: a designation names a PERSON or the person-role; the FACILITY is
    // an organization and the charges table keys it. A facility row pointing at
    // an individual party would put a person where the block expects a building.
    throw new Error(
      'A provider record\'s facility must be an organization contact, not an individual.',
    );
  }
}

/**
 * D-32 — the ONLY pre-fill there is.
 *
 * A facility's TYPE on a NEW case is carried from the most recent case where
 * Michael set it, and the row records which case it came from so the surface can
 * say "type carried from <case> — change if wrong". A facility never typed
 * before stays undefined, which is the must-fix condition.
 *
 * There is no other pre-fill: not from a specialty string, not from a role tag,
 * not from the vocabulary. §17.1a's "always assigned by a person" is satisfied
 * by the person who set it last time — not by the app inferring it now.
 */
export function carriedType(
  facilityPartyId: string,
  priorRows: CaseProvider[],
  excludeCaseId: string,
): { providerType: ProviderTypeKey; fromCaseId: string } | undefined {
  const candidates = priorRows
    .filter((r) => r.facilityPartyId === facilityPartyId
      && r.caseId !== excludeCaseId
      && r.providerType != null)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  const best = candidates[0];
  if (!best || !best.providerType) return undefined;
  return { providerType: best.providerType, fromCaseId: best.caseId };
}
