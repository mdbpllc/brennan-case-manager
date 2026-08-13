// Practice Areas -> Case Types (SETTLED — project instructions §7)
import type { PracticeArea, PiFlag } from './types';

export type LadderKey = '_piDefault' | '_civilDefault' | '_criminalDefault' | '_reliefDefault';

/** Each case type declares its status ladder here — assignment by declaration,
 *  not by name-matching, so a missing mapping fails loudly in statusesFor()
 *  instead of silently falling through to a wrong-but-plausible ladder
 *  (2026-07-21 audit item 4). */
export const CASE_TYPE_DEFS: Record<PracticeArea, { name: string; ladder: LadderKey }[]> = {
  'Personal Injury': [
    { name: 'Motor vehicle collision', ladder: '_piDefault' },
    { name: 'Premises', ladder: '_piDefault' },
    { name: 'Assault', ladder: '_piDefault' },
    { name: 'Non-subscriber workplace', ladder: '_piDefault' },
    { name: 'TTCA — Motor Vehicle', ladder: '_piDefault' },
    { name: 'TTCA — Premises', ladder: '_piDefault' },
    { name: 'Dangerous animal', ladder: '_piDefault' },
    // Inherits the PI litigation ladder, which doesn't fit its arc — a settled
    // probate ladder is a pending design pass (docs/spec-feedback.md item 1).
    { name: 'Probate companion', ladder: '_piDefault' },
  ],
  'General Civil Litigation': [
    { name: 'Debt', ladder: '_civilDefault' },
    { name: 'DTPA', ladder: '_civilDefault' },
    { name: "Mechanic's lien", ladder: '_civilDefault' },
    { name: "Servpro mechanic's lien", ladder: '_civilDefault' },
    { name: 'Bailment', ladder: '_civilDefault' },
    { name: 'Breach of contract', ladder: '_civilDefault' },
  ],
  Criminal: [
    { name: 'Misdemeanor', ladder: '_criminalDefault' },
    { name: 'Felony', ladder: '_criminalDefault' },
    { name: 'Expunction', ladder: '_reliefDefault' },
    { name: 'Order for non-disclosure', ladder: '_reliefDefault' },
    { name: 'Motion for judicial clemency', ladder: '_reliefDefault' },
  ],
};

/** Names only — the shape most pickers want. */
export const CASE_TYPES: Record<PracticeArea, string[]> = Object.fromEntries(
  (Object.keys(CASE_TYPE_DEFS) as PracticeArea[]).map((pa) => [pa, CASE_TYPE_DEFS[pa].map((d) => d.name)]),
) as Record<PracticeArea, string[]>;

export const PI_FLAGS: PiFlag[] = [
  'UM/UIM (first-party)',
  'Trucking/commercial vehicle',
  'Product-suspected',
  'Death (wrongful-death/survival)',
  'Government defendant',
  'Minor/incapacitated client',
  // 'Medicare/Medicaid beneficiary' moved to the CLIENT record by CL-2
  // (D-CL2-5) — see CLIENT_FLAGS in domain/client.ts. Do not re-add it here:
  // the lien reaches one person's recovery, and one passenger may be a
  // beneficiary while another is not.
];

/** Per-case-type status lists (tailored per type — settled §8). Starter set for the slice. */
export const STATUSES: Record<string, string[]> = {
  _piDefault: [
    'Signed up / intake',
    'Notice letters out',
    'Pre-suit investigation',
    'Treatment setup',
    'Treatment in progress',
    'Treatment complete',
    'Records collection',
    'Demand drafted',
    'Demand sent',
    'Suit filed',
    'Defendants served',
    'Answer received',
    'Disclosures sent',
    'Experts designated',
    'Discovery',
    'Mediation',
    'Trial prep',
    'Trial',
    'Settled — pre-disbursement',
    'Closed',
  ],
  _civilDefault: [
    'Intake',
    'Demand sent',
    'Suit filed',
    'Served',
    'Answer received',
    'Discovery',
    'Mediation',
    'Trial',
    'Judgment',
    'Post-judgment collection',
    'Closed',
  ],
  _criminalDefault: [
    'Intake / signed up',
    'Arrest & charges',
    'First appearance & bond',
    'Pre-indictment',
    'Indicted / information filed',
    'Arraignment & plea',
    'Discovery',
    'Pretrial motions',
    'Plea negotiations',
    'Plea hearing set',
    'Trial',
    'Sentencing',
    'Closed',
  ],
  _reliefDefault: [
    'Eligibility check',
    'Waiting period running',
    'Petition prepared',
    'Petition filed',
    'Hearing set',
    'Order signed',
    'Agency notifications',
    'Closed',
  ],
};

export function statusesFor(practiceArea: PracticeArea, caseType: string): string[] {
  const def = CASE_TYPE_DEFS[practiceArea]?.find((d) => d.name === caseType);
  if (!def) {
    throw new Error(
      `No status ladder declared for case type "${caseType}" under ${practiceArea} — ` +
      `add it to CASE_TYPE_DEFS in src/domain/caseTypes.ts (a renamed or removed type must not silently get another ladder).`,
    );
  }
  return STATUSES[def.ladder];
}

/** Which matters surface the Medical tab.
 *
 *  RULED by Michael 2026-08-12: "the only cases that should have a medical tab
 *  should be the personal injury or 1983 civil rights cases." A Servpro
 *  mechanic's lien matter has no medical damages to work up, and the tab
 *  invited a workflow that does not exist on that line.
 *
 *  ONE enforcement point, deliberately — the same pattern as
 *  `showsClientLayer()` in domain/client.ts — so the rule cannot drift between
 *  the tab strip, the router, and any later consumer.
 *
 *  **§1983 IS NOT YET IMPLEMENTABLE.** There is no civil-rights case type in
 *  `CASE_TYPE_DEFS`, and adding one touches the case-type tree, which **PR-3
 *  holds shut** (direction confirmed, EXECUTION HELD until the ladder pass
 *  names the destination). So this returns true for Personal Injury only, and
 *  the §1983 half of the ruling is recorded in docs/spec-feedback.md rather
 *  than half-built. When the type exists, add it here and nowhere else. */
export function showsMedicalTab(practiceArea: PracticeArea): boolean {
  return practiceArea === 'Personal Injury';
}

/** Terminal status. Single source of truth so list filters don't string-match ad hoc. */
export const CLOSED_STATUS = 'Closed';
export function isClosedStatus(status: string): boolean {
  return status === CLOSED_STATUS;
}
