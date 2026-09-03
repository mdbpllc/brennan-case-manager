/**
 * D-35 — the demo fixtures the disclosures walk needs.
 *
 * EVERY NAME, MATTER, FACILITY, PERSON AND DATE HERE IS FICTIONAL, and stays
 * that way: CLAUDE.md's first data-hygiene rule is that no real client data
 * ever enters this repo. The names are deliberately unlike real Texas
 * providers so that nothing here could be mistaken for a record.
 *
 * The set covers every shape in §6.2 and every test in §11 that needs data:
 *
 *   Garcia (MVC, one client)
 *     · Central Texas Regional Medical Center — ER: an EM physician, TWO
 *       radiologists, a PA and a mental-health-marked psychologist. The split,
 *       the rider, and `AS-Q17`'s default, in one facility.
 *     · Cobalt Ridge Imaging — an ALL-radiologist imaging facility with a PA:
 *       the radiology paragraph alone, NO rider, the PA off the block (D-16).
 *     · Bell County EMS — the `{incident_type}` line, which reads "collision"
 *       here and "incident" on the premises matter.
 *     · Serpentine Chiropractic — a DC and a PT: the MIXED paragraph.
 *     · Whitestone Family Medicine — `other physician (MD/DO)`, §9.1's pair.
 *     · Ash Grove Rehabilitation — `other licensed non-physician`: no fixed
 *       causation line at all.
 *     · Sunken Meadow Pharmacy — the four custodian limbs, nobody on the
 *       block, and NO DATE ANYWHERE (invariant 12 — it sorts last).
 *     · Quarry Road Urgent Care — extraction RAN and found nobody: the
 *       custodian-only fallback and its gap flag.
 *     · Larkspur Behavioral Health — a mental-health FACILITY: no paragraph at
 *       all, block rendered, hard pause.
 *
 *   Quartzmoor (PREMISES, TWO clients) — one facility shared by both, one
 *   chronology per client, so the per-plaintiff instrument and the per-client
 *   chronology are both exercised (invariants 11 and 20).
 *
 * Each chronology NAMES A FACILITY THAT IS NOT ON THE TAB — Cobalt Hollow
 * OBGYN Associates — so §14.4's OBGYN rule is exercised on every walk rather
 * than only in a unit test.
 */

import type { PartyRecord, CaseRecord, CasePartyLink } from '../domain/types';
import type { CaseClient } from '../domain/client';
import type { MedicalBill } from '../domain/billing';
import type { ContactEdge } from '../domain/contactEdges';
import type {
  CaseChronologyVersion, CaseProvider, CaseProviderIndividual, CaseProviderVisit,
} from '../domain/caseProviders';
import type { ProviderTypeKey } from '../forms/providerTypes';

const T = '2026-03-16T12:00:00.000Z';

/** An organization contact for a facility. */
function facilityParty(
  id: string, name: string, address: string, cityStateZip: string, phone?: string,
): PartyRecord {
  return {
    id, partyType: 'providerBusiness', kind: 'organization', displayName: name,
    roleTags: ['providerBusiness'], aliases: [], deceased: false,
    fields: { name, addressLine1: address, cityStateZip, ...(phone ? { phone } : {}) },
    createdAt: T, updatedAt: T,
  } as PartyRecord;
}

function provider(
  id: string, caseId: string, facilityPartyId: string,
  providerType: ProviderTypeKey | undefined,
  over: Partial<CaseProvider> = {},
): CaseProvider {
  return {
    id, caseId, facilityPartyId, providerType, lop: false,
    createdAt: T, updatedAt: T, ...over,
  };
}

function individual(
  id: string, caseProviderId: string, displayName: string,
  over: Partial<CaseProviderIndividual> = {},
): CaseProviderIndividual {
  return {
    id, caseProviderId, displayName, provenance: 'model',
    missingFromLatest: false, handEditedFields: [], createdAt: T, updatedAt: T, ...over,
  };
}

/** A short fictional chronology. Well under the 200 KB the fixtures are capped
 *  at, and it NAMES THE OBGYN so the rule that the model may not add a facility
 *  is exercised by the walk itself. */
function chronologyText(client: string, facilities: string[]): string {
  return [
    `MEDICAL CHRONOLOGY — ${client} (FICTIONAL DEMONSTRATION RECORD)`,
    '',
    'This document is fictional demonstration data. It describes no real person and',
    'no real course of care.',
    '',
    ...facilities.map((f) => `Care rendered at ${f}.`),
    '',
    'Also of record: the patient has an unrelated ongoing relationship with',
    'Cobalt Hollow OBGYN Associates. THAT FACILITY IS NOT PART OF THIS CLAIM and is',
    'named here only so the engine can be seen NOT to add it.',
  ].join('\n');
}

/**
 * Every facility name these fixtures reference, INCLUDING the two that live in
 * the main seed rather than here.
 *
 * The Garcia matter's hospital and clinic were already seeded before this
 * slice; the disclosures fixtures hang provider records off them rather than
 * duplicating the contacts. A consumer that wants to resolve a facility id to a
 * name should not have to know which of the two files it came from — a
 * distinction that is real, invisible, and exactly the kind of thing a test
 * silently gets wrong.
 */
export const FIXTURE_FACILITY_NAMES: Record<string, string> = {
  // from the main seed
  'p-hosp-ctrmc': 'Central Texas Regional Medical Center',
  'p-prov-procare': 'ProCare Injury Specialists',
  // from this file
  'p-fx-cobalt': 'Cobalt Ridge Imaging',
  'p-fx-ems': 'Bell County Emergency Medical Services',
  'p-fx-chiro': 'Serpentine Chiropractic & Wellness',
  'p-fx-family': 'Whitestone Family Medicine',
  'p-fx-rehab': 'Ash Grove Rehabilitation Services',
  'p-fx-pharm': 'Sunken Meadow Pharmacy',
  'p-fx-urgent': 'Quarry Road Urgent Care',
  'p-fx-behav': 'Larkspur Behavioral Health',
  'p-fx-premises-clinic': 'Ironbark Occupational Clinic',
};

export interface DisclosureFixtures {
  parties: PartyRecord[];
  cases: CaseRecord[];
  clients: CaseClient[];
  links: CasePartyLink[];
  bills: MedicalBill[];
  contactEdges: ContactEdge[];
  caseProviders: CaseProvider[];
  caseProviderIndividuals: CaseProviderIndividual[];
  caseProviderVisits: CaseProviderVisit[];
  caseChronologyVersions: CaseChronologyVersion[];
}

export function disclosureFixtures(yy: string): DisclosureFixtures {
  // ------------------------------------------------------- the facilities
  const parties: PartyRecord[] = [
    facilityParty('p-fx-cobalt', 'Cobalt Ridge Imaging', '4400 Quarry Rd', 'Temple, TX 76502', '2545550700'),
    facilityParty('p-fx-ems', 'Bell County Emergency Medical Services', '18 Ridgeway Ave', 'Belton, TX 76513', '2545550800'),
    facilityParty('p-fx-chiro', 'Serpentine Chiropractic & Wellness', '910 Marlandy St', 'Killeen, TX 76541', '2545550900'),
    facilityParty('p-fx-family', 'Whitestone Family Medicine', '77 Ashford Blvd', 'Temple, TX 76504', '2545551000'),
    // No phone: panel line 2 fires and the document still generates (§17.6).
    facilityParty('p-fx-rehab', 'Ash Grove Rehabilitation Services', '215 Ash Grove Ln', 'Belton, TX 76513'),
    facilityParty('p-fx-pharm', 'Sunken Meadow Pharmacy', '5 Meadow Ct', 'Killeen, TX 76542', '2545551100'),
    facilityParty('p-fx-urgent', 'Quarry Road Urgent Care', '4402 Quarry Rd', 'Temple, TX 76502', '2545551200'),
    facilityParty('p-fx-behav', 'Larkspur Behavioral Health', '30 Larkspur Way', 'Temple, TX 76501', '2545551300'),
    facilityParty('p-fx-premises-clinic', 'Ironbark Occupational Clinic', '600 Ironbark Rd', 'Waco, TX 76701', '2545551400'),
    // The premises matter's two plaintiffs.
    {
      id: 'p-fx-alba', partyType: 'client', kind: 'individual', displayName: 'Alba Quartzmoor',
      roleTags: ['client'], aliases: [], deceased: false,
      fields: { firstName: 'Alba', lastName: 'Quartzmoor', pronouns: 'she' },
      createdAt: T, updatedAt: T,
    } as PartyRecord,
    {
      id: 'p-fx-ozias', partyType: 'client', kind: 'individual', displayName: 'Ozias Quartzmoor',
      roleTags: ['client'], aliases: [], deceased: false,
      fields: { firstName: 'Ozias', lastName: 'Quartzmoor', pronouns: 'he' },
      createdAt: T, updatedAt: T,
    } as PartyRecord,
    // A PROMOTED individual — the one directory contact this fixture makes, so
    // invariant 17's two-edge case has something to hang on.
    {
      id: 'p-fx-vantwoud', partyType: 'medicalProfessional', kind: 'individual',
      displayName: 'Ines Vantwoud', roleTags: ['medicalProfessional', 'provider'],
      aliases: [], deceased: false,
      fields: { firstName: 'Ines', lastName: 'Vantwoud', credential: 'M.D.', pronouns: 'she' },
      createdAt: T, updatedAt: T,
    } as PartyRecord,
    // A RETAINED expert, for the retained track.
    {
      id: 'p-fx-retained', partyType: 'medicalProfessional', kind: 'individual',
      displayName: 'Rutger Bellweather', roleTags: ['medicalProfessional'],
      aliases: [], deceased: false,
      fields: { firstName: 'Rutger', lastName: 'Bellweather', credential: 'Ph.D.', retained: 'yes' },
      createdAt: T, updatedAt: T,
    } as PartyRecord,
  ];

  // --------------------------------------------- the two-client premises case
  const cases: CaseRecord[] = [{
    id: 'c-fx-premises', fileNumber: `${yy}-0004`, practiceArea: 'Personal Injury',
    caseType: 'Premises', caption: 'Quartzmoor v. Ironbark Property Holdings, LLC',
    status: 'Treatment in progress', piFlags: [],
    dateOfIncident: '2026-02-02', dateOpened: '2026-02-10',
    notes: 'Fictional demonstration matter — TWO plaintiffs, one shared facility, '
      + 'one chronology each. Exercises the per-plaintiff instrument.',
    createdAt: T, updatedAt: T,
  } as CaseRecord];

  const clients: CaseClient[] = [
    {
      id: 'cc-fx-alba', caseId: 'c-fx-premises', partyId: 'p-fx-alba',
      posture: 'claimant', displayOrder: 0, clientFlags: [],
      feeArrangement: { type: 'contingency', contingencyPercent: 33.33 },
      profileFields: {}, createdAt: T, updatedAt: T,
    },
    {
      id: 'cc-fx-ozias', caseId: 'c-fx-premises', partyId: 'p-fx-ozias',
      posture: 'claimant', displayOrder: 1, clientFlags: [],
      feeArrangement: { type: 'contingency', contingencyPercent: 33.33 },
      profileFields: {}, createdAt: T, updatedAt: T,
    },
  ];

  const links: CasePartyLink[] = [
    { id: 'l-fx-alba', caseId: 'c-fx-premises', partyId: 'p-fx-alba', role: 'Plaintiff', createdAt: T },
    { id: 'l-fx-ozias', caseId: 'c-fx-premises', partyId: 'p-fx-ozias', role: 'Plaintiff', createdAt: T },
  ] as CasePartyLink[];

  // ----------------------------------------------------- the provider records
  const G = 'c-garcia-mvc';
  const caseProviders: CaseProvider[] = [
    // The ER: the split, the rider and AS-Q17, in one facility.
    provider('cp-fx-er', G, 'p-hosp-ctrmc', 'emergency-medicine', {
      clientId: 'cc-garcia', treatmentFrom: '2026-03-14', treatmentTo: '2026-03-14',
      lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    provider('cp-fx-cobalt', G, 'p-fx-cobalt', 'radiologist', {
      clientId: 'cc-garcia', lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    provider('cp-fx-ems', G, 'p-fx-ems', 'prehospital-ems', {
      clientId: 'cc-garcia', treatmentFrom: '2026-03-14',
      lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    provider('cp-fx-chiro', G, 'p-fx-chiro', 'chiropractic', {
      clientId: 'cc-garcia', lop: true,
      lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    provider('cp-fx-family', G, 'p-fx-family', 'other-physician', {
      clientId: 'cc-garcia', lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    provider('cp-fx-rehab', G, 'p-fx-rehab', 'other-non-physician', {
      clientId: 'cc-garcia', lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    // NO DATES ANYWHERE — invariant 12's undated facility, which sorts LAST.
    provider('cp-fx-pharm', G, 'p-fx-pharm', 'pharmacy', { clientId: 'cc-garcia' }),
    // Extraction RAN and found nobody: the custodian-only fallback, its gap
    // flag, and panel line 3 rather than line 13.
    provider('cp-fx-urgent', G, 'p-fx-urgent', 'emergency-medicine', {
      clientId: 'cc-garcia', treatmentFrom: '2026-03-20',
      lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    provider('cp-fx-behav', G, 'p-fx-behav', 'mental-health', {
      clientId: 'cc-garcia', treatmentFrom: '2026-05-02',
      lastExtractionVersionId: 'chv-fx-garcia-1', lastExtractedAt: T,
    }),
    // The SHARED facility on the two-client matter — one row per client, which
    // is what makes the per-client provider list real rather than notional.
    provider('cp-fx-alba-clinic', 'c-fx-premises', 'p-fx-premises-clinic', 'primary-care', {
      clientId: 'cc-fx-alba', treatmentFrom: '2026-02-03',
      lastExtractionVersionId: 'chv-fx-alba-1', lastExtractedAt: T,
    }),
    provider('cp-fx-ozias-clinic', 'c-fx-premises', 'p-fx-premises-clinic', 'primary-care', {
      clientId: 'cc-fx-ozias', treatmentFrom: '2026-02-04',
      lastExtractionVersionId: 'chv-fx-ozias-1', lastExtractedAt: T,
    }),
  ];

  const caseProviderIndividuals: CaseProviderIndividual[] = [
    // --- the ER
    individual('i-fx-em', 'cp-fx-er', 'Ines Vantwoud', {
      credentialSuffix: 'M.D.', pronoun: 'she', sortOrder: 1,
      treatmentFrom: '2026-03-14', treatmentTo: '2026-03-14',
      summary: 'Received the patient in the emergency department, took the history, '
        + 'performed the examination and directed the initial workup.',
      chronologyVersionId: 'chv-fx-garcia-1',
      // PROMOTED — the block and the LEAD read the directory row through this.
      partyId: 'p-fx-vantwoud',
    }),
    individual('i-fx-rad1', 'cp-fx-er', 'Tobias Skarsgaard', {
      credentialSuffix: 'M.D.', roleMarker: 'radiologist', pronoun: 'he', sortOrder: 2,
      treatmentFrom: '2026-03-14', summary: 'Read and interpreted the cervical spine CT.',
      handEditedFields: ['roleMarker'], chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-rad2', 'cp-fx-er', 'Devin Petrossian', {
      credentialSuffix: 'D.O.', roleMarker: 'radiologist', pronoun: 'he', sortOrder: 3,
      treatmentFrom: '2026-03-14', summary: 'Read and interpreted the lumbar MRI.',
      handEditedFields: ['roleMarker'], chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-pa', 'cp-fx-er', 'Priya Natarajan', {
      credentialSuffix: 'PA-C', roleMarker: 'mid-level', pronoun: 'she', sortOrder: 4,
      treatmentFrom: '2026-03-14',
      summary: 'Took the history, performed the examination and carried out the plan under supervision.',
      handEditedFields: ['roleMarker'], chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-psy', 'cp-fx-er', 'Neriah Halvorsen', {
      credentialSuffix: 'Psy.D.', roleMarker: 'mental-health', pronoun: 'she', sortOrder: 5,
      treatmentFrom: '2026-03-15', summary: 'Behavioral-health consultation in the emergency department.',
      handEditedFields: ['roleMarker'], chronologyVersionId: 'chv-fx-garcia-1',
    }),
    // --- the all-radiologist imaging facility, with a PA who gets NO rider
    individual('i-fx-cob1', 'cp-fx-cobalt', 'Marguerite Okonjo-Rell', {
      credentialSuffix: 'M.D.', pronoun: 'she', sortOrder: 1,
      treatmentFrom: '2026-03-21', summary: 'Interpreted the follow-up imaging series.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-cob2', 'cp-fx-cobalt', 'Callum Ferreira-Baptiste', {
      credentialSuffix: 'M.D.', pronoun: 'he', sortOrder: 2,
      treatmentFrom: '2026-04-02', summary: 'Interpreted the repeat cervical imaging.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-cobpa', 'cp-fx-cobalt', 'Osvaldo Quillane', {
      credentialSuffix: 'PA-C', roleMarker: 'mid-level', sortOrder: 3,
      treatmentFrom: '2026-04-02', summary: 'Assisted at the guided injection.',
      handEditedFields: ['roleMarker'], chronologyVersionId: 'chv-fx-garcia-1',
    }),
    // --- EMS
    individual('i-fx-emt1', 'cp-fx-ems', 'Sorrel Adeyemi-Rusk', {
      credentialSuffix: 'EMT-P', pronoun: 'they', sortOrder: 1,
      treatmentFrom: '2026-03-14', summary: 'Responded to the scene and provided care during transport.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-emt2', 'cp-fx-ems', 'Brannon Ilesanmi', {
      credentialSuffix: 'EMT-P', pronoun: 'he', sortOrder: 2,
      treatmentFrom: '2026-03-14', summary: 'Assisted with extrication and transport.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    // --- the MIXED paragraph: a DC and a PT at one clinic
    individual('i-fx-dc', 'cp-fx-chiro', 'Wilhelmina Fairbrass', {
      credentialSuffix: 'D.C.', pronoun: 'she', sortOrder: 1,
      treatmentFrom: '2026-03-19', treatmentTo: '2026-07-30',
      summary: 'Examined the patient and provided the course of chiropractic care.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    individual('i-fx-pt', 'cp-fx-chiro', 'Teodoro Vasquez-Lund', {
      credentialSuffix: 'P.T.', roleMarker: 'physical-therapy', pronoun: 'he', sortOrder: 2,
      treatmentFrom: '2026-04-01', treatmentTo: '2026-07-30',
      summary: 'Delivered the therapeutic exercise and manual-therapy programme.',
      handEditedFields: ['roleMarker'], chronologyVersionId: 'chv-fx-garcia-1',
    }),
    // --- other physician (MD/DO)
    individual('i-fx-fam', 'cp-fx-family', 'Rosalind Achterberg', {
      credentialSuffix: 'M.D.', pronoun: 'she', sortOrder: 1,
      treatmentFrom: '2026-03-27', treatmentTo: '2026-06-11',
      summary: 'Followed the patient for ongoing symptoms and coordinated referrals.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    // --- other licensed non-physician
    individual('i-fx-rehab', 'cp-fx-rehab', 'Ingrid Solheim-Batt', {
      credentialSuffix: 'OTR/L', pronoun: 'she', sortOrder: 1,
      treatmentFrom: '2026-05-05', treatmentTo: '2026-08-14',
      summary: 'Provided occupational therapy directed at activities of daily living.',
      chronologyVersionId: 'chv-fx-garcia-1',
    }),
    // --- the premises matter, one person per client at the SHARED facility
    individual('i-fx-alba-doc', 'cp-fx-alba-clinic', 'Halvard Renn-Osei', {
      credentialSuffix: 'M.D.', pronoun: 'he', sortOrder: 1,
      treatmentFrom: '2026-02-03', summary: 'Evaluated and treated Alba Quartzmoor.',
      chronologyVersionId: 'chv-fx-alba-1',
    }),
    individual('i-fx-ozias-doc', 'cp-fx-ozias-clinic', 'Halvard Renn-Osei', {
      credentialSuffix: 'M.D.', pronoun: 'he', sortOrder: 1,
      treatmentFrom: '2026-02-04', summary: 'Evaluated and treated Ozias Quartzmoor.',
      chronologyVersionId: 'chv-fx-ozias-1',
    }),
  ];

  const caseProviderVisits: CaseProviderVisit[] = [
    {
      id: 'v-fx-1', individualId: 'i-fx-em', visitDate: '2026-03-14', provenance: 'model',
      description: 'Emergency department presentation; history and examination.',
      chronologyVersionId: 'chv-fx-garcia-1', sortOrder: 0, createdAt: T,
    },
    {
      id: 'v-fx-2', individualId: 'i-fx-dc', visitDate: '2026-03-19', provenance: 'model',
      description: 'Initial chiropractic evaluation.',
      chronologyVersionId: 'chv-fx-garcia-1', sortOrder: 0, createdAt: T,
    },
    {
      id: 'v-fx-3', individualId: 'i-fx-dc', visitDate: '2026-07-30', provenance: 'model',
      description: 'Final visit; released from care.',
      chronologyVersionId: 'chv-fx-garcia-1', sortOrder: 1, createdAt: T,
    },
  ];

  const caseChronologyVersions: CaseChronologyVersion[] = [
    {
      id: 'chv-fx-garcia-1', caseId: G, clientId: 'cc-garcia', versionNo: 1,
      droppedAt: T, sourceFilename: 'garcia-chronology-v1.txt', sourceFormat: 'txt',
      extractedText: chronologyText('Maria Garcia', [
        'Central Texas Regional Medical Center', 'Cobalt Ridge Imaging',
        'Bell County Emergency Medical Services', 'Serpentine Chiropractic & Wellness',
        'Whitestone Family Medicine', 'Ash Grove Rehabilitation Services',
      ]),
      readable: true, charCount: 620, createdAt: T,
    },
    // Two chronology STREAMS on the two-client matter (invariant 20).
    {
      id: 'chv-fx-alba-1', caseId: 'c-fx-premises', clientId: 'cc-fx-alba', versionNo: 1,
      droppedAt: T, sourceFilename: 'quartzmoor-alba-v1.txt', sourceFormat: 'txt',
      extractedText: chronologyText('Alba Quartzmoor', ['Ironbark Occupational Clinic']),
      readable: true, charCount: 420, createdAt: T,
    },
    {
      id: 'chv-fx-ozias-1', caseId: 'c-fx-premises', clientId: 'cc-fx-ozias', versionNo: 1,
      droppedAt: T, sourceFilename: 'quartzmoor-ozias-v1.txt', sourceFormat: 'txt',
      extractedText: chronologyText('Ozias Quartzmoor', ['Ironbark Occupational Clinic']),
      readable: true, charCount: 421, createdAt: T,
    },
  ];

  /**
   * TWO `renders-care-at` edges on one promoted individual (invariant 17).
   *
   * The first covers the treatment dates and names the SELECTED facility, so
   * the two agree. The second is LATER and CURRENT (blank `effective_to`) at a
   * different facility, which is what puts D-8's "Currently practicing at …"
   * line under the block — a TEXT ACT carried to the hands-on sitting.
   */
  const contactEdges: ContactEdge[] = [
    {
      id: 'ce-fx-1', fromContactId: 'p-fx-vantwoud', toContactId: 'p-hosp-ctrmc',
      edgeType: 'renders-care-at', effectiveFrom: '2022-01-01', effectiveTo: '2026-06-30',
      note: 'Fictional demonstration affiliation.', createdAt: T,
    },
    {
      id: 'ce-fx-2', fromContactId: 'p-fx-vantwoud', toContactId: 'p-fx-cobalt',
      edgeType: 'renders-care-at', effectiveFrom: '2026-07-01',
      note: 'Fictional demonstration affiliation — current.', createdAt: T,
    },
  ];

  // Bills for the premises matter, so ND-7(a)'s set check has something to
  // compare and the per-client ledger is not empty.
  const bills: MedicalBill[] = [
    {
      id: 'b-fx-alba', caseId: 'c-fx-premises', clientId: 'cc-fx-alba',
      facilityPartyId: 'p-fx-premises-clinic', label: 'Ironbark Occupational Clinic',
      billType: 1, serviceStart: '2026-02-03', billedAmount: 2410,
      createdAt: T, updatedAt: T,
    } as MedicalBill,
    {
      id: 'b-fx-ozias', caseId: 'c-fx-premises', clientId: 'cc-fx-ozias',
      facilityPartyId: 'p-fx-premises-clinic', label: 'Ironbark Occupational Clinic',
      billType: 1, serviceStart: '2026-02-04', billedAmount: 1880,
      createdAt: T, updatedAt: T,
    } as MedicalBill,
  ];

  return {
    parties, cases, clients, links, bills, contactEdges,
    caseProviders, caseProviderIndividuals, caseProviderVisits, caseChronologyVersions,
  };
}
