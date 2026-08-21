/**
 * Fictional fixture data for the disclosures wizard.
 *
 * FIXTURE EXERCISE ONLY — the FE-D1 authorization is explicit: no real client
 * data anywhere, and live use of the wizard follows go-live by its own path.
 * Every name, address, phone number and dollar figure below is invented. The
 * providers are named after minerals so nobody can mistake one for a real
 * practice, and the "county" is a county that does not exist.
 */

import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type { CaseClient } from '../domain/client';
import type { CaseBundle } from './context';
import type { WizardAnswers } from './types';

const NOW = '2026-08-20T12:00:00.000Z';

function party(
  id: string,
  displayName: string,
  partyType: string,
  roleTags: string[],
  fields: Record<string, unknown> = {},
): PartyRecord {
  return {
    id,
    partyType,
    kind: partyType === 'person' ? 'individual' : 'organization',
    displayName,
    fields,
    roleTags,
    aliases: [],
    deceased: false,
    createdAt: NOW,
    updatedAt: NOW,
  };
}

export const FIXTURE_CASE: CaseRecord = {
  id: 'fx-case-1',
  fileNumber: '26-0001',
  practiceArea: 'Personal Injury',
  caseType: 'Motor Vehicle Collision',
  status: 'Open',
  piFlags: [],
  dateOfIncident: '2025-03-14',
  dateOpened: '2025-04-02',
  causeNumber: '2025-CI-00000',
  courtName: '224th Judicial District Court',
  county: 'Ferrous',
  createdAt: NOW,
  updatedAt: NOW,
};

export const FIXTURE_PARTIES: PartyRecord[] = [
  party('fx-p-plaintiff', 'Alba Quartzmoor', 'person', ['Plaintiff'], { pronouns: 'she' }),
  party('fx-p-def-1', 'Basalt Freight Lines, LLC', 'business', ['Defendant']),
  party('fx-p-def-2', 'Corwin Slatehaven', 'person', ['Defendant'], { pronouns: 'he' }),
  party('fx-p-opp-1', 'Dara Feldspar', 'attorney', ['Opposing counsel'], {
    representsPartyId: 'fx-p-def-1',
    firmName: 'Feldspar & Gneiss PLLC',
    addressInline: '400 Tourmaline Way, Suite 210, Rockvale, TX 70001',
    addressLine1: '400 Tourmaline Way, Suite 210',
    addressLine2: 'Rockvale, TX 70001',
    phone: '(555) 010-4400',
    fax: '(555) 010-4401',
    serviceEmails: 'dfeldspar@example-invalid.test',
  }),
  party('fx-p-opp-2', 'Emory Gneiss', 'attorney', ['Opposing counsel'], {
    representsPartyId: 'fx-p-def-2',
    firmName: 'Gneiss Law Group',
    addressInline: '18 Obsidian Row, Rockvale, TX 70002',
    addressLine1: '18 Obsidian Row',
    addressLine2: 'Rockvale, TX 70002',
    phone: '(555) 010-5500',
    fax: '(555) 010-5501',
    serviceEmails: 'egneiss@example-invalid.test',
  }),
  party('fx-p-prov-er', 'Halite Regional Hospital', 'provider-business', ['Provider'], {
    facilityName: 'Halite Regional Hospital',
    individualNames: 'Imani Calcite, M.D.',
    providerName: 'Imani Calcite',
    shortName: 'Dr. Calcite',
    credential: 'M.D.',
    specialtyPhrase: 'an emergency medicine physician',
    roleVerbPhrase: 'provided emergency medical care to',
    physicianOrSpecialist: 'physician',
    addressLine1: '900 Halite Boulevard',
    cityStateZip: 'Rockvale, TX 70003',
    phone: '(555) 010-9000',
    pronouns: 'she',
  }),
  party('fx-p-prov-rad', 'Jasper Imaging Partners', 'provider-business', ['Provider'], {
    facilityName: 'Jasper Imaging Partners',
    individualNames: 'Kell Onyx, M.D.',
    providerName: 'Kell Onyx',
    shortName: 'Dr. Onyx',
    credential: 'M.D.',
    imagingStudy: 'cervical and lumbar MRI',
    imagingDate: 'April 2, 2025',
    addressLine1: '55 Jasper Center Drive',
    cityStateZip: 'Rockvale, TX 70004',
    phone: '(555) 010-7700',
    pronouns: 'he',
  }),
  party('fx-p-prov-chiro', 'Larimar Chiropractic', 'provider-business', ['Provider'], {
    facilityName: 'Larimar Chiropractic',
    individualNames: 'Mira Larimar, D.C.',
    providerName: 'Mira Larimar',
    shortName: 'Dr. Larimar',
    credential: 'D.C.',
    specialtyPhrase: 'a doctor of chiropractic',
    roleVerbPhrase: 'provided chiropractic evaluation, treatment, and care to',
    addressLine1: '77 Larimar Street',
    cityStateZip: 'Rockvale, TX 70005',
    phone: '(555) 010-6600',
    pronouns: 'she',
    lop: 'true',
  }),
  party('fx-p-witness', 'Nolan Pyrite', 'person', ['Witness'], {
    addressLine1: '12 Pyrite Lane',
    addressLine2: 'Rockvale, TX 70006',
    phone: '(555) 010-1200',
  }),
];

export const FIXTURE_LINKS: CasePartyLink[] = [
  { id: 'fx-l-1', caseId: 'fx-case-1', partyId: 'fx-p-plaintiff', role: 'Plaintiff', createdAt: NOW },
  { id: 'fx-l-2', caseId: 'fx-case-1', partyId: 'fx-p-def-1', role: 'Defendant', createdAt: NOW },
  { id: 'fx-l-3', caseId: 'fx-case-1', partyId: 'fx-p-def-2', role: 'Defendant', createdAt: NOW },
  { id: 'fx-l-4', caseId: 'fx-case-1', partyId: 'fx-p-opp-1', role: 'Opposing counsel', createdAt: NOW },
  { id: 'fx-l-5', caseId: 'fx-case-1', partyId: 'fx-p-opp-2', role: 'Opposing counsel', createdAt: NOW },
  { id: 'fx-l-6', caseId: 'fx-case-1', partyId: 'fx-p-witness', role: 'Witness', createdAt: NOW },
];

export const FIXTURE_CLIENTS: CaseClient[] = [];

export const FIXTURE_BUNDLE: CaseBundle = {
  caseRecord: FIXTURE_CASE,
  links: FIXTURE_LINKS,
  parties: FIXTURE_PARTIES,
  clients: FIXTURE_CLIENTS,
  providerCharges: {
    'fx-p-prov-er': 18450.75,
    'fx-p-prov-rad': 4200,
    'fx-p-prov-chiro': 7325.5,
  },
};

export const FIXTURE_ANSWERS: WizardAnswers = {
  templateKey: 'disclosures-plaintiff-194-2b-195-5',
  posture: 'original',
  caseId: 'fx-case-1',
  incidentType: 'motor vehicle collision',
  serviceDateLong: 'August 20, 2026',
  providerCards: [
    {
      providerPartyId: 'fx-p-prov-er',
      variantKey: 'disclosures-variant-emergency-medicine',
      boardCertificationKnown: false,
      treatmentChecked: ['emergency evaluation', 'diagnostic imaging'],
    },
    {
      providerPartyId: 'fx-p-prov-rad',
      variantKey: 'disclosures-variant-radiologist',
      boardCertificationKnown: false,
      treatmentChecked: [],
    },
    {
      providerPartyId: 'fx-p-prov-chiro',
      variantKey: 'disclosures-variant-chiropractor',
      boardCertificationKnown: false,
      treatmentChecked: ['spinal manipulation', 'therapeutic modalities'],
    },
  ],
  factWitnesses: [
    { partyPartyId: 'fx-p-witness', testimonyDescription: 'Witnessed the collision.' },
  ],
  settlementAgreements: false,
  witnessStatements: false,
  answerOverrides: {},
  scalars: {
    court_type_caps: 'DISTRICT COURT',
    judicial_district_caps: '224TH',
    damages_elements_joined:
      'past medical expenses, future medical expenses, physical pain and suffering, '
      + 'physical impairment, and mental anguish',
  },
};
