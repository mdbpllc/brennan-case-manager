/**
 * THE PROVIDER TYPE VOCABULARY — `R17`'s controlled list (D-45).
 *
 * A NEW vocabulary on the provider record, and deliberately NOT the CD-1
 * directory role tags: CD-7/CD-8 reserve changes to the role-tag vocabulary to
 * Michael, so this build changes none of them and keeps its own list here
 * (D-5). The keys below are STORED DATA — a CHECK constraint in the database,
 * a union in TypeScript and a picker on the Medical tab all read them — so they
 * are stated exactly once, in this file, and everything else imports them.
 *
 * FIFTEEN values, not twelve: `AS-Q5` (2026-08-31, Michael: "Adopt all three")
 * added `mental health`, `other physician (MD/DO)` and `other licensed
 * non-physician provider` to the §11.8 twelve.
 *
 * TYPE IS ALWAYS SET BY A PERSON. Nothing here derives a type from a specialty
 * string, a role tag or a name — §17.1a, and the DO-NOT list says it twice. The
 * only pre-fill is D-32's query over the last case where Michael set it.
 */

export const PROVIDER_TYPES = [
  { key: 'emergency-medicine', label: 'emergency medicine' },
  { key: 'pain-management', label: 'pain management' },
  { key: 'orthopedic-surgery', label: 'orthopedic surgery' },
  { key: 'neurosurgery', label: 'neurosurgery' },
  { key: 'primary-care', label: 'primary care' },
  { key: 'chiropractic', label: 'chiropractic' },
  { key: 'physical-therapy', label: 'physical therapy' },
  { key: 'prehospital-ems', label: 'prehospital EMS' },
  { key: 'radiologist', label: 'radiologist' },
  { key: 'pharmacy', label: 'pharmacy' },
  { key: 'custodian-only', label: 'custodian-only' },
  { key: 'mid-level', label: 'mid-level' },
  { key: 'mental-health', label: 'mental health' },
  { key: 'other-physician', label: 'other physician (MD/DO)' },
  { key: 'other-non-physician', label: 'other licensed non-physician provider' },
] as const;

export type ProviderTypeKey = (typeof PROVIDER_TYPES)[number]['key'];

export const PROVIDER_TYPE_KEYS: ProviderTypeKey[] = PROVIDER_TYPES.map((t) => t.key);

const LABELS: Record<string, string> = Object.fromEntries(
  PROVIDER_TYPES.map((t) => [t.key, t.label]),
);

/** The display label for a stored key; the key itself if it is not one of ours. */
export function providerTypeLabel(key: string | null | undefined): string {
  if (!key) return '';
  return LABELS[key] ?? key;
}

// ------------------------------------------------------------- the sets

/**
 * A designation names PERSONS, and zero persons falls to custodian-only.
 *
 * These are the facility types whose paragraph designates individuals. A
 * facility typed in this set with no individual left to name goes out under
 * §9.11 with the gap flag — it is never silently dropped (Part 1).
 */
export const TREATING_TYPES: ProviderTypeKey[] = [
  'emergency-medicine',
  'pain-management',
  'orthopedic-surgery',
  'neurosurgery',
  'primary-care',
  'chiropractic',
  'physical-therapy',
  'prehospital-ems',
  'other-physician',
  'other-non-physician',
];

/**
 * The treating types that own a fixed basis/causation pair.
 *
 * `other-non-physician` is the one treating type without one: AS-Q5 ruled it a
 * writer-only paragraph with NO fixed causation line, panel-flagged — degrade,
 * don't invent. `radiologist` owns §9.2's pair but is not a TREATING_TYPE,
 * because an imaging facility is its own shape (§6.2).
 */
export const FIXED_PAIR_TYPES: ProviderTypeKey[] = TREATING_TYPES.filter(
  (t) => t !== 'other-non-physician',
);

/**
 * The facilities an extraction call runs for.
 *
 * A `pharmacy` or `custodian-only` facility is NEVER extracted (D-46) — there is
 * nobody to designate beneath it, so a PHI-bearing call for one would buy
 * nothing. `mid-level` is not a facility type at all.
 */
export const EXTRACTED_TYPES: ProviderTypeKey[] = [
  ...TREATING_TYPES,
  'radiologist',
  'mental-health',
];

/** Facility TYPE takes every value except `mid-level` — a mid-level is a person. */
export const FACILITY_TYPE_KEYS: ProviderTypeKey[] = PROVIDER_TYPE_KEYS.filter(
  (k) => k !== 'mid-level',
);

/**
 * ROLE MARKER takes any value except `pharmacy` and `custodian-only` — neither
 * describes a person's role — or NULL, which reads as the facility's own type.
 */
export const ROLE_MARKER_KEYS: ProviderTypeKey[] = PROVIDER_TYPE_KEYS.filter(
  (k) => k !== 'pharmacy' && k !== 'custodian-only',
);

/**
 * The three markers with RULED engine effects. Every other marker value is
 * labelled "(display only)" in the picker, so the surface never implies that
 * setting one changes what the document says.
 */
export const ENGINE_EFFECT_MARKERS: ProviderTypeKey[] = [
  'radiologist',   // the split — §15.3, "Radiologist is the only split"
  'mid-level',     // the rider — §15.6
  'mental-health', // §5.1's hard pause, per individual — AS-Q17's default
];

export function markerIsDisplayOnly(marker: string): boolean {
  return !ENGINE_EFFECT_MARKERS.includes(marker as ProviderTypeKey);
}

/**
 * The EFFECTIVE marker — `coalesce(role_marker, facility.provider_type)`.
 *
 * Computed ONCE, before shape selection (D-45), because shape selection, block
 * membership and three panel lines all have to agree about what an individual
 * is; computing it twice is how they would come to disagree.
 */
export function effectiveMarker(
  roleMarker: string | null | undefined,
  facilityType: string | null | undefined,
): string | null {
  return roleMarker ?? facilityType ?? null;
}

export function isTreatingType(key: string | null | undefined): boolean {
  return TREATING_TYPES.includes(key as ProviderTypeKey);
}

export function isExtractedType(key: string | null | undefined): boolean {
  return EXTRACTED_TYPES.includes(key as ProviderTypeKey);
}

/**
 * The SQL literal list for a CHECK constraint, so the migration and the schema
 * cannot fall out of step with this file by hand-copying.
 */
export function sqlValueList(keys: readonly string[]): string {
  return keys.map((k) => `'${k}'`).join(', ');
}
