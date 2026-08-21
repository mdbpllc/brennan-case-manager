/**
 * Form-engine domain types — the §10 data model.
 *
 * Scope is the FE-D1 slice (`docs/specs/fe-d1-build-slice.md`): the disclosures
 * instrument end to end, on the §10 substrate, with FE-10 (format profiles +
 * render lint), FE-12 (provenance), FE-8's retention half, and FE-15 (posture)
 * from birth.
 *
 * NOT here, by ruling: the §13 item model (slice 2 owns it — nothing in FE-D1
 * creates items), FE-9, FE-11, FE-13, FE-14, FE-16, and FE-17's internal/
 * outbound flag, which is annotated to ride whichever slice creates the ITEM
 * table. Adding any of them here would be scope this slice does not carry.
 */

/**
 * FE-12 — where a template's FORMAT came from.
 *
 * `format-authoritative` means the geometry was taken from an artifact the firm
 * actually served; `proposed` means someone drafted it. FE-7 adoption is what
 * flips a template from proposed to format-authoritative. The distinction is
 * on the bank so nobody has to remember which is which.
 */
export type TemplateProvenance = 'format-authoritative' | 'proposed';

/**
 * FE-15, scoped to disclosures: the posture drives the instrument title, whether
 * a certificate of service is included, and the footer instrument name — the
 * three together, never one without the others.
 */
export type InstrumentPosture = 'original' | 'amended' | 'supplemental';

/** Template families in this slice. The item model that would generalise these
 *  is slice 2's core and is deliberately absent. */
export type TemplateFamily =
  /** A whole instrument rendered against a .docx skeleton. */
  | 'instrument'
  /** One §9 approved narrative paragraph. */
  | 'expert-narrative-variant'
  /** A per-item firm stock answer. */
  | 'stock-answer';

export interface FormTemplate {
  id: string;
  /** Stable key the seed and both adapters agree on. */
  key: string;
  name: string;
  family: TemplateFamily;
  provenance: TemplateProvenance;
  /** Which bundled .docx skeleton this instrument renders against. */
  skeletonKey?: string;
  formatProfileId?: string;
  /** The version the wizard renders. Editing publishes a new one and repoints. */
  currentVersionId?: string;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormTemplateVersion {
  id: string;
  templateId: string;
  /** 1-based, monotonic per template. Never reused, never reordered. */
  versionNo: number;
  /** Template text in the CANONICAL `{token}` convention (FC-1). */
  body: string;
  /** FE-2 per-spot formatting, plus the stock answers harvested from legacy
   *  `|default:` filters on import. Settings, never token text. */
  settings: Record<string, string>;
  changeNote?: string;
  createdBy?: string;
  createdAt: string;
}

export type TokenKindName = 'static' | 'inflected' | 'computed';

export interface FormTokenDefinition {
  id: string;
  /** Null template = a global token available to every instrument. */
  templateId?: string;
  name: string;
  kind: TokenKindName;
  description: string;
  /** Dotted path into the render context, for `static` tokens. */
  sourcePath?: string;
  /** §4 interview-card checklist compiling a `computed` token. */
  variantChecklist?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * FE-10 — a format profile.
 *
 * Held as its own record rather than as fields on the template because a
 * profile describes an instrument CLASS and several instruments share one.
 *
 * FLAGGED, NOT SETTLED: where the boundary sits between the format profile
 * (fonts, label styles, indents, pagination) and the instrument definition
 * (section order, which items exist, which repeat) is an OPEN question —
 * `REQ-CAPTURE_disclosures-master-skeleton_2026-08-20.md` §5 Q3, which asks for
 * it to be ruled "before the renderer is built". It was not ruled before this
 * build. The split taken here follows the slice's own item 6 wording ("format
 * profiles + render lint") and is the reversible choice; it is recorded in
 * `docs/spec-feedback.md` for Michael rather than treated as decided.
 */
export interface FormFormatProfile {
  id: string;
  key: string;
  name: string;
  /** Measured geometry and styling rules. Shape is deliberately open while the
   *  §5 Q3 boundary is unruled — pinning a schema to an unruled split would be
   *  the more expensive mistake. */
  spec: FormatProfileSpec;
  createdAt: string;
  updatedAt: string;
}

export interface FormatProfileSpec {
  pageWidthTwips?: number;
  pageHeightTwips?: number;
  marginTopTwips?: number;
  marginOtherTwips?: number;
  bodyFont?: string;
  bodyPointSize?: number;
  /** Total text-column width. The master's caption table must not exceed it —
   *  the §8 defect (9900 against a 9360 column) that overhung the right margin
   *  by 0.375" and that any auto-fit "correction" would then shift. */
  textColumnTwips?: number;
  captionColumnsTwips?: number[];
  /** How many `§` paragraphs the caption's middle column carries. COMPUTED at
   *  render from the party-line count — never frozen (§8). */
  captionSectionMarkCount?: number;
  /** Style-by-role table (§12.9): role name → expected formatting assertion. */
  roleStyles?: Record<string, string>;
}

// ------------------------------------------------------- wizard answers

/** §4 per-provider interview card, as answered. Persisted with the generated
 *  document for §2 item 9's supplementation replay. */
export interface ProviderCardAnswer {
  providerPartyId: string;
  /** Which §9 variant renders this provider. */
  variantKey: string;
  /** §4.1 — board certification, or the fact that it is unknown. Never asserted
   *  from absence: "don't know" drops the phrase and raises a verify task. */
  boardCertification?: string;
  boardCertificationKnown: boolean;
  /** §4.2 — treatment checklist compiling `{treatment_clause}`. */
  treatmentChecked: string[];
  surgeryPerformed?: string;
  /** §4.3 — future care not yet performed. */
  futureCare?: string;
  /** §4.4 — PCP only; drives `{baseline_clause}`. */
  treatedBeforeIncident?: boolean;
  /** Free-text the attorney added on this card. */
  note?: string;
}

export interface FactWitnessAnswer {
  partyPartyId: string;
  /** Short description of what they know (§2 item 4). */
  testimonyDescription: string;
}

/**
 * The full wizard answer snapshot.
 *
 * Stored whole on the generated-document record. That IS FE-8's retention half
 * per the slice: the document as generated plus the answers that produced it.
 * The attorney-edit DIFF is expressly OUT — deferred to the transform work.
 */
export interface WizardAnswers {
  templateKey: string;
  posture: InstrumentPosture;
  caseId: string;
  clientId?: string;
  incidentType?: string;
  incidentDateLong?: string;
  serviceDateLong?: string;
  providerCards: ProviderCardAnswer[];
  factWitnesses: FactWitnessAnswer[];
  /** §6 conditional sections. */
  settlementAgreements: boolean;
  witnessStatements: boolean;
  /** Per-item stock-answer overrides, keyed by token name. */
  answerOverrides: Record<string, string>;
  /** Scalars the wizard collected that the file did not hold. */
  scalars: Record<string, string>;
}

// ---------------------------------------------------------- write-backs

/**
 * A wizard answer that belongs on a record, routed to it.
 *
 * `applied` write-backs went to a record that exists today. `flagged` ones had
 * nowhere to land — the slice is explicit that anything unmappable is FLAGGED,
 * NEVER GUESSED, which is the CL-2/CD-1 backfill discipline applied to
 * write-backs. A flag is a fact about the file, not a failure of the engine.
 */
export interface WriteBackResult {
  status: 'applied' | 'flagged';
  target: string;
  field: string;
  value: string;
  /** Why it could not be applied — present only on `flagged`. */
  reason?: string;
}
