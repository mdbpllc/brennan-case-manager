// Party-type registry — every settled party type from project instructions §11.
// Forms and detail views render from these definitions, so adding a type or field
// is a config change, not a UI rewrite.

import type { PartyKind } from './types';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'repeating'
  | 'partyLink'; // reference to another party record

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select
  subFields?: FieldDef[]; // for repeating groups
  linkTypes?: string[]; // for partyLink: which party types are valid targets
  hint?: string;
  sensitive?: boolean; // SSN-class fields: masked in lists
}

export interface PartyTypeDef {
  key: string;
  label: string;
  kind: PartyKind;
  /** field keys used to compute displayName */
  nameFields: string[];
  fields: FieldDef[];
}

const CONTACT: FieldDef[] = [
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'fax', label: 'Fax', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'address', label: 'Mailing address', type: 'textarea' },
];

const PERSON_NAME: FieldDef[] = [
  { key: 'firstName', label: 'First name', type: 'text' },
  { key: 'lastName', label: 'Last name', type: 'text' },
];

/** Credentials dossier — shared by medical professional and expert (settled §11). */
const CREDENTIALS_DOSSIER: FieldDef[] = [
  { key: 'licenseIssued', label: 'License issuance date', type: 'date' },
  {
    key: 'boardCerts', label: 'Board certifications', type: 'repeating',
    subFields: [
      { key: 'specialty', label: 'Specialty', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
    ],
  },
  {
    key: 'education', label: 'Education history', type: 'repeating',
    subFields: [
      { key: 'program', label: 'Program name', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'start', label: 'Start', type: 'date' },
      { key: 'end', label: 'End', type: 'date' },
      { key: 'specialty', label: 'Specialty type', type: 'text' },
    ],
  },
  { key: 'privileges', label: 'Hospital privileges', type: 'textarea' },
  {
    key: 'honors', label: 'Awards / honors / publications', type: 'repeating',
    subFields: [{ key: 'item', label: 'Item', type: 'text' }],
  },
  { key: 'malpractice', label: 'Malpractice information', type: 'textarea' },
  { key: 'criminalHistory', label: 'Criminal history', type: 'textarea' },
  {
    key: 'discipline', label: 'Disciplinary actions (TX + out-of-state)', type: 'repeating',
    subFields: [
      { key: 'jurisdiction', label: 'Board / jurisdiction', type: 'text' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'detail', label: 'Detail', type: 'text' },
    ],
  },
];

export const PARTY_TYPES: PartyTypeDef[] = [
  {
    key: 'client', label: 'Client', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      { key: 'aliases', label: 'Aliases / maiden names', type: 'text', hint: 'For records requests' },
      ...CONTACT,
      { key: 'dob', label: 'Date of birth', type: 'date' },
      { key: 'ssn', label: 'Social Security number', type: 'text', sensitive: true },
      { key: 'dlNumber', label: "Driver's license number", type: 'text' },
      { key: 'dlState', label: 'DL state of issuance', type: 'text' },
      { key: 'preferredContact', label: 'Preferred contact method', type: 'select', options: ['Phone', 'Text', 'Email', 'Mail'] },
      { key: 'language', label: 'Preferred language', type: 'text' },
      { key: 'emergencyContact', label: 'Emergency contact', type: 'textarea' },
      { key: 'healthInsurer', label: 'Health insurer on file', type: 'text', hint: 'Ties into Type 2 medical bills' },
      { key: 'medicareMedicaid', label: 'Medicare/Medicaid beneficiary', type: 'select', options: ['Unknown', 'No', 'Medicare', 'Medicaid', 'Both'], hint: 'Captured at EVERY PI intake — drives lien module & Safe Harbor authorization' },
      {
        key: 'priorMVCs', label: 'Prior motor vehicle collisions', type: 'repeating',
        subFields: [
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'detail', label: 'What the client recalls', type: 'text' },
        ],
      },
      {
        key: 'priorFalls', label: 'Prior falls', type: 'repeating',
        subFields: [
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'detail', label: 'Details', type: 'text' },
        ],
      },
      {
        key: 'priorInjuries', label: 'Prior injuries', type: 'repeating',
        subFields: [
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'detail', label: 'Details', type: 'text' },
        ],
      },
      {
        key: 'priorProviders', label: 'Prior medical providers seen', type: 'repeating',
        subFields: [{ key: 'provider', label: 'Provider', type: 'text' }],
      },
      {
        key: 'drivingHistory', label: 'Driving history / prior tickets', type: 'repeating',
        subFields: [
          { key: 'date', label: 'Approx. date', type: 'text' },
          { key: 'location', label: 'Location', type: 'text' },
        ],
      },
      {
        key: 'priorCriminal', label: 'Prior criminal history (structured — eligibility engine)', type: 'repeating',
        subFields: [
          { key: 'disposition', label: 'Disposition', type: 'select', options: ['Conviction', 'Deferred adjudication', 'Dismissal', 'Acquittal', 'Unknown'] },
          { key: 'offense', label: 'Offense + cite (if known)', type: 'text' },
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'familyViolence', label: 'Family violence involved?', type: 'select', options: ['Unknown', 'No', 'Yes'] },
        ],
      },
      { key: 'priorRecordVerified', label: 'Prior record verified by DPS/background check', type: 'checkbox', hint: 'Eligibility readouts flag as unverified until checked' },
    ],
  },
  {
    key: 'adjuster', label: 'Adjuster', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      ...CONTACT,
      { key: 'employer', label: 'Employer insurance company', type: 'partyLink', linkTypes: ['insuranceCompany'] },
    ],
  },
  {
    key: 'attorney', label: 'Attorney', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      ...CONTACT,
      { key: 'barNumber', label: 'Bar number', type: 'text' },
      { key: 'roleType', label: 'Role type', type: 'select', options: ['Lead counsel', 'Co-counsel', 'Of counsel', 'Associate'] },
      { key: 'firm', label: 'Law firm', type: 'partyLink', linkTypes: ['lawFirm'] },
    ],
  },
  {
    key: 'business', label: 'Business', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Business name', type: 'text' },
      { key: 'natureOfBusiness', label: 'Type / nature of business', type: 'text' },
      ...CONTACT,
      {
        key: 'contacts', label: 'Points of contact', type: 'repeating',
        subFields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'info', label: 'Contact info', type: 'text' },
          { key: 'purpose', label: 'What this contact is for', type: 'text' },
        ],
      },
      { key: 'citizenship', label: 'Citizenship (jurisdiction)', type: 'text', hint: 'For a corporation: state of incorporation AND principal place of business' },
      { key: 'registeredAgent', label: 'Registered agent (name & address)', type: 'textarea', hint: 'For service of process' },
    ],
  },
  {
    key: 'insuranceCompany', label: 'Insurance company', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Company name', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'fax', label: 'Fax', type: 'text' },
      { key: 'claimsEmail', label: 'Claims email', type: 'text' },
      { key: 'lines', label: 'Lines written', type: 'select', options: ['Personal', 'Commercial', 'Both'] },
      { key: 'registeredAgent', label: 'Registered agent (name & address)', type: 'textarea' },
    ],
  },
  {
    key: 'lawFirm', label: 'Law firm', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Firm name', type: 'text' },
      ...CONTACT,
    ],
  },
  {
    key: 'medicalProfessional', label: 'Medical professional', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      { key: 'specialty', label: 'Specialty / provider type', type: 'text', hint: 'Open value — includes non-MD providers (chiropractor, PT, etc.)' },
      { key: 'licenseNpi', label: 'License or NPI number', type: 'text', hint: 'For affidavits/subpoenas' },
      ...CONTACT,
      { key: 'facilities', label: 'Treats at (provider business)', type: 'partyLink', linkTypes: ['providerBusiness'] },
      ...CREDENTIALS_DOSSIER,
    ],
  },
  {
    key: 'providerBusiness', label: 'Provider business', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Business name', type: 'text' },
      { key: 'phone', label: 'Main phone', type: 'text' },
      { key: 'fax', label: 'Fax', type: 'text' },
      { key: 'recordsEmail', label: 'Billing / records-request email', type: 'text' },
      { key: 'taxId', label: 'Billing / tax ID number', type: 'text', hint: 'Appears on affidavits/payments' },
      { key: 'registeredAgent', label: 'Registered agent', type: 'textarea' },
      {
        key: 'locations', label: 'Locations', type: 'repeating',
        subFields: [
          { key: 'label', label: 'Short label', type: 'text', hint: 'e.g. "south side"' },
          { key: 'address', label: 'Physical address', type: 'text' },
          { key: 'phone', label: 'Location phone', type: 'text' },
          { key: 'recordsContact', label: 'Records-request contact (if per-location)', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'expert', label: 'Expert', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      { key: 'expertise', label: 'Field of expertise', type: 'text', hint: 'Open value — field-agnostic' },
      ...CONTACT,
      { key: 'employer', label: 'Firm / employer', type: 'partyLink', linkTypes: ['business', 'lawFirm', 'providerBusiness'] },
      {
        key: 'priorChallenges', label: 'Prior challenges / exclusions', type: 'repeating',
        subFields: [
          { key: 'court', label: 'Court', type: 'text' },
          { key: 'caseName', label: 'Case', type: 'text' },
          { key: 'outcome', label: 'Outcome', type: 'text' },
        ],
      },
      ...CREDENTIALS_DOSSIER,
    ],
  },
  {
    key: 'person', label: 'Person (witness, family, PNC)', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      ...CONTACT,
      { key: 'dob', label: 'Date of birth', type: 'date' },
      { key: 'whoTheyAre', label: 'Who they are / why they matter', type: 'textarea' },
      { key: 'pncStatus', label: 'Intake funnel status', type: 'select', options: ['—', 'PNC', 'Client', 'Declined', 'Referred out'] },
      { key: 'pncOutcomeDate', label: 'Funnel outcome date', type: 'date' },
      { key: 'pncOutcomeNote', label: 'Funnel outcome reason/note', type: 'text' },
    ],
  },
  {
    key: 'lawEnforcementOfficer', label: 'Law enforcement officer', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      { key: 'rank', label: 'Rank / title', type: 'text' },
      { key: 'badge', label: 'Badge or unit number', type: 'text' },
      { key: 'agency', label: 'Agency', type: 'partyLink', linkTypes: ['lawEnforcementAgency'] },
      { key: 'phone', label: 'Phone (if available)', type: 'text' },
      { key: 'email', label: 'Email (if available)', type: 'text' },
    ],
  },
  {
    key: 'lawEnforcementAgency', label: 'Law enforcement agency', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Agency name', type: 'text', hint: 'Police dept, sheriff’s office, DPS' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'parentEntity', label: 'Parent government entity (optional)', type: 'partyLink', linkTypes: ['governmentEntity'] },
    ],
  },
  {
    key: 'governmentEntity', label: 'Government entity', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Entity name', type: 'text' },
      { key: 'level', label: 'Type / level', type: 'select', options: ['City', 'County', 'State agency', 'Other'] },
      ...CONTACT,
      { key: 'ttcaNoticeAddress', label: 'TTCA notice address', type: 'textarea', hint: 'Strict short statutory clock — deadline engine hook; city-charter periods can be shorter' },
      { key: 'serviceAgent', label: 'Designated agent for service', type: 'textarea' },
    ],
  },
  {
    key: 'court', label: 'Court', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Court name', type: 'text' },
      { key: 'level', label: 'Jurisdiction / level', type: 'select', options: ['District', 'County court at law', 'Justice of the peace', 'Municipal', 'Appellate'] },
      { key: 'county', label: 'County', type: 'text' },
      { key: 'address', label: 'Physical address', type: 'textarea' },
      { key: 'clerkInfo', label: 'Clerk’s office contact & filing details', type: 'textarea' },
      { key: 'localRules', label: 'Standing orders / local rules (link or note)', type: 'textarea' },
      {
        key: 'filingProfiles', label: 'Filing profiles', type: 'repeating',
        subFields: [
          { key: 'clerk', label: 'Clerk', type: 'select', options: ['District clerk', 'County clerk'] },
          { key: 'docket', label: 'Docket type', type: 'select', options: ['District civil', 'District criminal', 'County civil', 'County criminal'] },
          { key: 'requirements', label: 'Forms / requirements', type: 'text' },
        ],
      },
    ],
  },
  {
    key: 'judge', label: 'Judge', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      { key: 'title', label: 'Title', type: 'select', options: ['District judge', 'Associate judge', 'County court judge', 'Justice of the peace', 'Visiting judge'] },
      { key: 'court', label: 'Court', type: 'partyLink', linkTypes: ['court'] },
      { key: 'chambers', label: 'Chambers / court-coordinator contact', type: 'textarea' },
      { key: 'preferences', label: 'Preferences / tendencies', type: 'textarea' },
    ],
  },
  {
    key: 'courtReporter', label: 'Court reporter', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      { key: 'agency', label: 'Reporting agency', type: 'partyLink', linkTypes: ['business'] },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'certNumber', label: 'Certification number', type: 'text' },
      { key: 'preferred', label: 'Default / preferred reporter', type: 'checkbox', hint: 'Your go-to surfaces first' },
    ],
  },
  {
    key: 'subrogationAnalyst', label: 'Subrogation analyst', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      ...CONTACT,
      { key: 'employer', label: 'Employer (insurer or subrogation vendor)', type: 'partyLink', linkTypes: ['insuranceCompany', 'business'] },
    ],
  },
  {
    key: 'pretrialOffice', label: 'Pretrial services office', kind: 'organization', nameFields: ['name'],
    fields: [
      { key: 'name', label: 'Office name', type: 'text' },
      { key: 'judicialDistrict', label: 'Judicial district', type: 'text' },
      ...CONTACT,
    ],
  },
  {
    key: 'pretrialCoordinator', label: 'Pretrial services coordinator', kind: 'individual', nameFields: ['firstName', 'lastName'],
    fields: [
      ...PERSON_NAME,
      ...CONTACT,
      { key: 'office', label: 'Pretrial services office', type: 'partyLink', linkTypes: ['pretrialOffice'] },
    ],
  },
];

export const PARTY_TYPE_MAP: Record<string, PartyTypeDef> = Object.fromEntries(
  PARTY_TYPES.map((t) => [t.key, t]),
);

export function computeDisplayName(typeKey: string, fields: Record<string, unknown>): string {
  const def = PARTY_TYPE_MAP[typeKey];
  if (!def) return 'Unknown';
  const parts = def.nameFields.map((k) => (fields[k] as string) || '').filter(Boolean);
  return parts.join(' ') || '(unnamed)';
}
