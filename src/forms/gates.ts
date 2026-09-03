/**
 * §5 warning gates — WIZARD-SCREEN ONLY.
 *
 * BINDING INVARIANT, restated by the FE-D1 slice as "not a preference":
 * generated text is IDENTICAL regardless of gate state. Gates inform the
 * drafter; they never write into the document.
 *
 * Structurally enforced here, not merely intended: every function in this file
 * is pure and returns advisory objects. Nothing exported returns document text,
 * and the render context is built by `context.ts` from ANSWERS and RECORDS —
 * it never receives a gate. `formEngine.gates.test.ts` asserts byte-identical
 * output across every gate state and acknowledgement combination.
 *
 * ── A TENSION IN THE SPEC, RESOLVED AND RECORDED, NOT PAPERED OVER ──
 * §5 item 3 (retained vs non-retained) says the engine "appends the full
 * retained package checklist … rather than silently using treater language" —
 * which IS a difference in generated text, and reads against the invariant two
 * paragraphs above it.
 *
 * The reading taken: retained/non-retained is DATA on the expert record, not
 * gate state. The DATA selects which template content applies (as the variant
 * choice does); the WARNING is what fires to tell Michael the switch is set.
 * So the invariant holds in the form that can actually be tested — for a FIXED
 * data context, output does not vary with which gates fired or whether they
 * were acknowledged — and §5.3's behaviour is preserved. Recorded in
 * `docs/spec-feedback.md`; Michael's to overrule.
 */

import type { PartyRecord } from '../domain/types';

export type GateSeverity =
  /** Requires an explicit confirm before the wizard will proceed. */
  | 'hard-pause'
  /** Shown and click-through; the wizard proceeds. */
  | 'click-through'
  /** Informational nudge. */
  | 'soft';

export interface GateWarning {
  id: string;
  severity: GateSeverity;
  /** Party this attaches to, where it is provider-specific. */
  partyId?: string;
  title: string;
  body: string;
  /** Registry-backed propositions this warning rests on. Displayed with the
   *  warning so an UNVERIFIED basis is visible at the point of reliance. */
  authority?: string;
}

const MENTAL_HEALTH_MARKERS = [
  'psychiatr', 'psycholog', 'mental health', 'behavioral health', 'counselor', 'therapist-lpc',
];

const LOP_FIELD_KEYS = ['lop', 'letterOfProtection', 'letter_of_protection'];

function fieldText(party: PartyRecord, keys: string[]): string {
  const fields = (party.fields ?? {}) as Record<string, unknown>;
  for (const k of keys) {
    const v = fields[k];
    if (v !== undefined && v !== null && v !== '') return String(v);
  }
  return '';
}

function truthy(value: string): boolean {
  const v = value.trim().toLowerCase();
  return v === 'true' || v === 'yes' || v === 'y' || v === '1';
}

/**
 * §5.1 — the mental-health hard pause.
 *
 * Designating a treating psychologist or psychiatrist opens mental-health
 * records and a Rule 204 adverse examination. There is DELIBERATELY no template
 * variant for these providers (§9's "Deliberate gap"): the gate routes to
 * manual, case-by-case drafting. That absence is intentional and a future
 * session must not fill it.
 */
export function mentalHealthGate(party: PartyRecord): GateWarning | null {
  const haystack = [
    party.displayName,
    fieldText(party, ['specialty']),
    fieldText(party, ['credential']),
    (party.roleTags ?? []).join(' '),
  ].join(' ').toLowerCase();

  if (!MENTAL_HEALTH_MARKERS.some((m) => haystack.includes(m))) return null;

  return {
    id: `mental-health:${party.id}`,
    severity: 'hard-pause',
    partyId: party.id,
    title: 'Mental-health treater — designation opens records and a Rule 204 exam',
    body:
      'Designating a treating psychologist or psychiatrist opens mental-health records and a '
      + 'Rule 204 adverse examination. There is no template variant for mental-health providers '
      + 'by design — this one is drafted manually, case by case. Confirm explicitly to proceed.',
    authority: 'In re Richardson Motorsports (temporal scope ~3 years) — registry status UNVERIFIED',
  };
}

/**
 * §5.2 — the LOP flag.
 *
 * A letter of protection is a direct financial stake, which opens
 * negotiated-rate and Medicare-rate discovery. Click-through, not a hard pause.
 * Fires most often on chiropractic and pain-management providers.
 */
export function lopGate(party: PartyRecord): GateWarning | null {
  if (!truthy(fieldText(party, LOP_FIELD_KEYS))) return null;
  return {
    id: `lop:${party.id}`,
    severity: 'click-through',
    partyId: party.id,
    title: 'LOP provider — financial-stake discovery exposure',
    body:
      'This provider is flagged as treating under a letter of protection. An LOP is a direct '
      + 'financial stake and opens negotiated-rate and Medicare-rate discovery.',
    authority: 'In re K&L Auto Crushers line — registry status UNVERIFIED',
  };
}

/**
 * §5.3 — retained vs non-retained.
 *
 * Treaters go out non-retained. Where the record flags an expert RETAINED, the
 * full retained package applies rather than treater language — and this warning
 * says so, so the switch is never silently load-bearing.
 */
export function retainedGate(party: PartyRecord): GateWarning | null {
  if (!truthy(fieldText(party, ['retained', 'retainedExpert']))) return null;
  return {
    id: `retained:${party.id}`,
    severity: 'click-through',
    partyId: party.id,
    title: 'Retained expert — the full retained package applies',
    body:
      'This expert is flagged RETAINED, so treater language does not apply. The retained package '
      + 'is: documents provided, reviewed and prepared; resume and bibliography; ten-year '
      + 'publications; four-year testimony list; and a compensation statement.',
    authority: 'TRCP 195.5(a)(4) — registry status UNVERIFIED',
  };
}

/** §5.4 — the ortho + neuro cumulative-expert nudge. */
export function cumulativeExpertNudge(parties: PartyRecord[]): GateWarning | null {
  const text = (p: PartyRecord) =>
    `${p.displayName} ${fieldText(p, ['specialty'])}`.toLowerCase();
  const hasOrtho = parties.some((p) => text(p).includes('orthop'));
  const hasNeuro = parties.some((p) => text(p).includes('neurosurg'));
  if (!hasOrtho || !hasNeuro) return null;
  return {
    id: 'cumulative-expert',
    severity: 'soft',
    title: 'Orthopedic surgeon and neurosurgeon both designated',
    body:
      'Differentiate the two scopes so the designations do not read as cumulative. §9.7 keeps the '
      + 'neurosurgical scope sentence ("brain, spine, and peripheral nerves") for exactly this.',
  };
}

/** §5.4 — the PCP baseline nudge: a "Yes" opens the full chart. */
export function baselineNudge(partyId: string, treatedBefore: boolean | undefined): GateWarning | null {
  if (treatedBefore !== true) return null;
  return {
    id: `baseline:${partyId}`,
    severity: 'soft',
    partyId,
    title: 'Pre-incident treatment — designation opens the full chart',
    body:
      'The baseline clause rebuts a pre-existing-condition theme, and designating this provider '
      + 'opens their complete chart rather than the post-incident portion.',
  };
}

export interface GateInput {
  providers: PartyRecord[];
  /** Party id → the PCP card's pre-incident answer. */
  treatedBefore?: Record<string, boolean | undefined>;
}

/** Every gate for a wizard run, in display order: hard pauses first. */
export function evaluateGates(input: GateInput): GateWarning[] {
  const out: GateWarning[] = [];
  for (const p of input.providers) {
    const mh = mentalHealthGate(p);
    if (mh) out.push(mh);
    const lop = lopGate(p);
    if (lop) out.push(lop);
    const ret = retainedGate(p);
    if (ret) out.push(ret);
    const base = baselineNudge(p.id, input.treatedBefore?.[p.id]);
    if (base) out.push(base);
  }
  const cum = cumulativeExpertNudge(input.providers);
  if (cum) out.push(cum);

  const rank: Record<GateSeverity, number> = { 'hard-pause': 0, 'click-through': 1, soft: 2 };
  return out.sort((a, b) => rank[a.severity] - rank[b.severity]);
}

/** Gates that block generation until explicitly confirmed. */
export function blockingGates(warnings: GateWarning[]): GateWarning[] {
  return warnings.filter((w) => w.severity === 'hard-pause');
}

// ---------------------------------------------------------------------------
// FE-D1 AMENDMENT (§8.3) — the same gates, RE-KEYED onto the typed record.
//
// The gates keep their objects and their wizard-screen-only posture ("Generated
// text is identical regardless of gate state"). What changes is what they READ.
// Until now they sniffed substrings out of an untyped `party.fields` bag — a
// specialty string, a `lop` key spelled three ways. `R17` gives them a typed
// column each, so the mental-health pause fires on a TYPE Michael set rather
// than on the word "psycholog" appearing somewhere in a party record.
//
// NOT re-keyed, and named rather than inferred:
//   * §5.4's PCP-baseline nudge has NO INPUT once its interview card retires
//     (AS-Q9), so it is NOT RENDERED — D-40, a default taken. §5.4's text in
//     the spec is untouched; the gate simply has nothing to ask.
//   * The retained switch stays data on the retained step (ND-6).
// ---------------------------------------------------------------------------

import type { CaseProvider, CaseProviderIndividual } from '../domain/caseProviders';
import { effectiveMarker } from './providerTypes';

export interface TypedGateInput {
  selected: CaseProvider[];
  individuals: CaseProviderIndividual[];
  facilityNames: Record<string, string>;
}

/**
 * §5.1 — the hard pause, now on the TYPE (AS-Q5) and on the MARKER (AS-Q17's
 * default).
 *
 * A designation of a mental-health treater opens mental-health records and a
 * Rule 204 adverse examination. There is no §9 variant for it BY DESIGN, and
 * the paragraph is drafted by hand — so the pause is not a formality, it is the
 * moment the deliberate gap is honoured.
 */
export function typedMentalHealthGates(input: TypedGateInput): GateWarning[] {
  const out: GateWarning[] = [];
  for (const p of input.selected) {
    const name = input.facilityNames[p.facilityPartyId] ?? 'This facility';
    if (p.providerType === 'mental-health') {
      out.push({
        id: `mental-health:${p.id}`,
        severity: 'hard-pause',
        partyId: p.facilityPartyId,
        title: 'Mental-health facility — designation opens records and a Rule 204 exam',
        body:
          `${name} is typed as a mental-health facility. Designating a treating psychologist or `
          + 'psychiatrist opens mental-health records and a Rule 204 adverse examination. There is '
          + 'no template paragraph for this by design — the block renders and you draft the '
          + 'paragraph in Word. Confirm explicitly to proceed.',
        authority: 'In re Richardson Motorsports (temporal scope ~3 years) — registry status UNVERIFIED',
      });
      continue;
    }
    for (const ind of input.individuals) {
      if (ind.caseProviderId !== p.id || ind.removedByHandAt) continue;
      if (effectiveMarker(ind.roleMarker, p.providerType) !== 'mental-health') continue;
      out.push({
        id: `mental-health:${ind.id}`,
        severity: 'hard-pause',
        partyId: p.facilityPartyId,
        title: `${ind.displayName} is marked mental health`,
        body:
          `${ind.displayName} is marked as a mental-health provider at ${name}. They stay on the `
          + 'provider block and are left OUT of the generated paragraph, because designating them '
          + 'under this facility\u2019s medical-causation sentence would be the assertion this pause '
          + 'exists to stop. Their paragraph is drafted by hand.',
        authority: 'In re Richardson Motorsports — registry status UNVERIFIED',
      });
    }
  }
  return out;
}

/** §5.2 — the LOP flag, now a typed boolean on the facility row (D-15). */
export function typedLopGates(input: TypedGateInput): GateWarning[] {
  return input.selected.filter((p) => p.lop).map((p) => ({
    id: `lop:${p.id}`,
    severity: 'click-through' as const,
    partyId: p.facilityPartyId,
    title: `${input.facilityNames[p.facilityPartyId] ?? 'This facility'} — LOP, financial-stake discovery exposure`,
    body:
      'This facility is flagged as treating under a letter of protection. An LOP is a direct '
      + 'financial stake and opens negotiated-rate and Medicare-rate discovery.',
    authority: 'In re K&L Auto Crushers line — registry status UNVERIFIED',
  }));
}

/** §5.3's cumulative nudge, now on two selected facilities' TYPES. */
export function typedCumulativeNudge(input: TypedGateInput): GateWarning | null {
  const types = new Set(input.selected.map((p) => p.providerType));
  if (!types.has('orthopedic-surgery') || !types.has('neurosurgery')) return null;
  return {
    id: 'cumulative-expert',
    severity: 'soft',
    title: 'Orthopedic surgeon and neurosurgeon both designated',
    body:
      'Differentiate the two scopes so the designations do not read as cumulative. §9.7 keeps the '
      + 'neurosurgical scope sentence ("brain, spine, and peripheral nerves") for exactly this.',
  };
}

/** Every typed gate, hard pauses first — the same ordering as `evaluateGates`. */
export function evaluateTypedGates(input: TypedGateInput): GateWarning[] {
  const out = [...typedMentalHealthGates(input), ...typedLopGates(input)];
  const cum = typedCumulativeNudge(input);
  if (cum) out.push(cum);
  const rank: Record<GateSeverity, number> = { 'hard-pause': 0, 'click-through': 1, soft: 2 };
  return out.sort((a, b) => rank[a.severity] - rank[b.severity]);
}
