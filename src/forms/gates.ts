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
