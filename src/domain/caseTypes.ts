// Practice Areas -> Case Types (SETTLED — project instructions §7)
import type { PracticeArea, PiFlag } from './types';

export const CASE_TYPES: Record<PracticeArea, string[]> = {
  'Personal Injury': [
    'Motor vehicle collision',
    'Premises',
    'Assault',
    'Non-subscriber workplace',
    'TTCA — Motor Vehicle',
    'TTCA — Premises',
    'Dangerous animal',
    'Probate companion',
  ],
  'General Civil Litigation': [
    'Debt',
    'DTPA',
    "Mechanic's lien",
    "Servpro mechanic's lien",
    'Bailment',
    'Breach of contract',
  ],
  Criminal: [
    'Misdemeanor',
    'Felony',
    'Expunction',
    'Order for non-disclosure',
    'Motion for judicial clemency',
  ],
};

export const PI_FLAGS: PiFlag[] = [
  'UM/UIM (first-party)',
  'Trucking/commercial vehicle',
  'Product-suspected',
  'Death (wrongful-death/survival)',
  'Government defendant',
  'Minor/incapacitated client',
  'Medicare/Medicaid beneficiary',
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
  if (practiceArea === 'Personal Injury') return STATUSES._piDefault;
  if (practiceArea === 'General Civil Litigation') return STATUSES._civilDefault;
  if (['Expunction', 'Order for non-disclosure', 'Motion for judicial clemency'].includes(caseType))
    return STATUSES._reliefDefault;
  return STATUSES._criminalDefault;
}
