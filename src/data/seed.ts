// Demo seed data so the slice is clickable out of the box.
// Entirely fictional. Wiped whenever you clear the browser's site data.
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type { CaseClient, ClientBackfillFlag } from '../domain/client';
import type { CalendarEvent } from '../domain/calendar';
import type { Charge } from '../domain/oaa';
import { billingSeedData } from './billingSeed';
import { transcriptSeedData } from './transcriptSeed';
import { billsSeedData } from './billsSeed';

const t = new Date().toISOString();
const yy = String(new Date().getFullYear()).slice(-2);

export function seedData(): {
  cases: CaseRecord[];
  parties: PartyRecord[];
  links: CasePartyLink[];
  clients: CaseClient[];
  clientFlags: ClientBackfillFlag[];
  fileCounters: Record<string, number>;
  events: CalendarEvent[];
  charges: Charge[];
} & ReturnType<typeof billingSeedData> & ReturnType<typeof transcriptSeedData> & ReturnType<typeof billsSeedData> {
  const parties: PartyRecord[] = [
    {
      id: 'p-client-garcia', partyType: 'client', kind: 'individual', displayName: 'Maria Garcia',
      fields: {
        firstName: 'Maria', lastName: 'Garcia', phone: '2545550143', email: 'mgarcia@example.com',
        address: '1207 Oakhill Dr, Killeen, TX 76541', dob: '1988-04-12',
        preferredContact: 'Text', language: 'Spanish', healthInsurer: 'BlueCross BlueShield of Texas',
        medicareMedicaid: 'No',
        priorMVCs: [{ date: '2019-06-01', detail: 'Minor rear-end, no treatment' }],
        priorProviders: [{ provider: 'Metroplex Health — family doctor' }],
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-client-boyd', partyType: 'client', kind: 'individual', displayName: 'Terrence Boyd',
      fields: {
        firstName: 'Terrence', lastName: 'Boyd', phone: '2545550188',
        address: '44 Cedar Loop, Belton, TX 76513', dob: '1996-11-02', medicareMedicaid: 'Unknown',
        priorCriminal: [{ disposition: 'Dismissal', offense: 'Theft (Class B)', date: '2017-03-10', familyViolence: 'No' }],
        priorRecordVerified: false,
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-ins-statewide', partyType: 'insuranceCompany', kind: 'organization', displayName: 'Statewide Mutual Insurance',
      fields: {
        name: 'Statewide Mutual Insurance', phone: '8005550100', claimsEmail: 'claims@statewidemutual.example',
        lines: 'Both', registeredAgent: 'CT Corporation System, 1999 Bryan St, Dallas, TX 75201',
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-adj-pruitt', partyType: 'adjuster', kind: 'individual', displayName: 'Dana Pruitt',
      fields: {
        firstName: 'Dana', lastName: 'Pruitt', phone: '8005550177x214',
        email: 'dpruitt@statewidemutual.example', employer: 'p-ins-statewide',
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-firm-hdm', partyType: 'lawFirm', kind: 'organization', displayName: 'Hargrove, Dietz & Malone LLP',
      fields: { name: 'Hargrove, Dietz & Malone LLP', phone: '5125550122', email: 'service@hdmlaw.example' },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-atty-dietz', partyType: 'attorney', kind: 'individual', displayName: 'Carol Dietz',
      fields: {
        firstName: 'Carol', lastName: 'Dietz', barNumber: '24098765', roleType: 'Lead counsel',
        firm: 'p-firm-hdm', email: 'cdietz@hdmlaw.example', phone: '5125550122',
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-prov-procare', partyType: 'providerBusiness', kind: 'organization', displayName: 'ProCare Injury Specialists',
      fields: {
        name: 'ProCare Injury Specialists', phone: '2545550160', recordsEmail: 'records@procare.example',
        taxId: '74-2223334',
        locations: [
          { label: 'Killeen', address: '2200 S WS Young Dr, Killeen, TX', phone: '2545550160' },
          { label: 'Temple', address: '810 W Adams Ave, Temple, TX', phone: '2545550161' },
        ],
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-hosp-ctrmc', partyType: 'providerBusiness', kind: 'organization', displayName: 'Central Texas Regional Medical Center',
      fields: {
        name: 'Central Texas Regional Medical Center', phone: '2545550500',
        recordsEmail: 'him@ctrmc.example', taxId: '74-5556667',
        locations: [{ label: 'Main campus', address: '3100 S 31st St, Temple, TX', phone: '2545550500' }],
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-doc-nguyen', partyType: 'medicalProfessional', kind: 'individual', displayName: 'Alan Nguyen',
      fields: {
        firstName: 'Alan', lastName: 'Nguyen', specialty: 'Chiropractor', licenseNpi: '1780012345',
        facilities: 'p-prov-procare', phone: '2545550160',
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-court-146', partyType: 'court', kind: 'organization', displayName: '146th District Court',
      fields: {
        name: '146th District Court', level: 'District', county: 'Bell',
        address: 'Bell County Justice Center, 1201 Huey Rd, Belton, TX 76513',
        filingProfiles: [
          { clerk: 'District clerk', docket: 'District civil', requirements: 'Citation-issuance request form required' },
          { clerk: 'District clerk', docket: 'District criminal', requirements: '' },
        ],
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-judge-marsh', partyType: 'judge', kind: 'individual', displayName: 'Evelyn Marsh',
      fields: {
        firstName: 'Evelyn', lastName: 'Marsh', title: 'District judge', court: 'p-court-146',
        preferences: 'Wants proposed orders in Word format; strict on discovery-dispute certificates of conference.',
      },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-rep-lozano', partyType: 'courtReporter', kind: 'individual', displayName: 'Angie Lozano',
      fields: { firstName: 'Angie', lastName: 'Lozano', phone: '2545550130', preferred: true },
      createdAt: t, updatedAt: t,
    },
    {
      id: 'p-wit-caldwell', partyType: 'person', kind: 'individual', displayName: 'Ray Caldwell',
      fields: {
        firstName: 'Ray', lastName: 'Caldwell', phone: '2545550199',
        whoTheyAre: 'Eyewitness — was two cars behind the collision on SH 195.',
      },
      createdAt: t, updatedAt: t,
    },
  ];

  const cases: CaseRecord[] = [
    {
      id: 'c-garcia-mvc', fileNumber: `${yy}-0001`, practiceArea: 'Personal Injury',
      caseType: 'Motor vehicle collision', caption: 'Garcia v. Allied Freight Lines, Inc.',
      status: 'Treatment in progress', commercialPolicyInvolved: true,
      piFlags: ['Trucking/commercial vehicle'],
      // No statuteOfLimitations — retired by CL-2. It lives on the client
      // record below and the Overview derives the earliest from there.
      dateOfIncident: '2026-03-14', dateOpened: '2026-03-16',
      notes: 'Preservation letters out to Allied re: ELD/telematics and dash-cam within 24 hrs of signing.',
      createdAt: t, updatedAt: t,
    },
    {
      id: 'c-boyd-dwi', fileNumber: `${yy}-0002`, practiceArea: 'Criminal', caseType: 'Misdemeanor',
      caption: 'State v. Boyd', status: 'Plea negotiations', representationType: 'Private hire', piFlags: [],
      dateOfIncident: '2026-01-25', dateOpened: '2026-02-02',
      courtName: 'Bell County Court at Law No. 2', causeNumber: '26-CR-01452',
      notes: 'DWI 49.04 (first). No collision, no passenger. Interlock condition worth negotiating — 2-yr vs 5-yr nondisclosure clock.',
      createdAt: t, updatedAt: t,
    },
    {
      id: 'c-servpro-lien', fileNumber: `${yy}-0003`, practiceArea: 'General Civil Litigation',
      caseType: "Servpro mechanic's lien", caption: 'In re 7 Winding Creek Ct (water mitigation)',
      status: 'Demand sent', piFlags: [], dateOpened: '2026-05-04',
      notes: 'Last service date 2026-04-20 — filing deadline calculated off that date. Packet complete.',
      createdAt: t, updatedAt: t,
    },
  ];

  const links: CasePartyLink[] = [
    { id: 'l1', caseId: 'c-garcia-mvc', partyId: 'p-client-garcia', role: 'Client', side: 'Ours', createdAt: t },
    { id: 'l2', caseId: 'c-garcia-mvc', partyId: 'p-ins-statewide', role: 'Other', side: 'Opposing', note: 'Liability carrier for Allied', createdAt: t },
    { id: 'l3', caseId: 'c-garcia-mvc', partyId: 'p-adj-pruitt', role: 'Adjuster on claim', side: 'Opposing', createdAt: t },
    { id: 'l4', caseId: 'c-garcia-mvc', partyId: 'p-atty-dietz', role: 'Opposing counsel', side: 'Opposing', createdAt: t },
    { id: 'l5', caseId: 'c-garcia-mvc', partyId: 'p-prov-procare', role: 'Treating provider', side: 'Neutral', createdAt: t },
    { id: 'l5b', caseId: 'c-garcia-mvc', partyId: 'p-hosp-ctrmc', role: 'Treating provider', side: 'Neutral', note: 'ER — day of collision', createdAt: t },
    { id: 'l6', caseId: 'c-garcia-mvc', partyId: 'p-doc-nguyen', role: 'Treating provider', side: 'Neutral', createdAt: t },
    { id: 'l7', caseId: 'c-garcia-mvc', partyId: 'p-wit-caldwell', role: 'Witness', side: 'Neutral', createdAt: t },
    { id: 'l8', caseId: 'c-garcia-mvc', partyId: 'p-court-146', role: 'Court of record', createdAt: t },
    { id: 'l9', caseId: 'c-garcia-mvc', partyId: 'p-judge-marsh', role: 'Judge assigned', createdAt: t },
    { id: 'l10', caseId: 'c-garcia-mvc', partyId: 'p-rep-lozano', role: 'Other', note: 'Preferred reporter for depositions', createdAt: t },
    { id: 'l11', caseId: 'c-boyd-dwi', partyId: 'p-client-boyd', role: 'Client', side: 'Ours', createdAt: t },
    // Cross-case payoff demo: same adjuster on a second file
    { id: 'l12', caseId: 'c-servpro-lien', partyId: 'p-ins-statewide', role: 'Other', side: 'Opposing', note: 'Homeowner’s carrier', createdAt: t },
    { id: 'l13', caseId: 'c-servpro-lien', partyId: 'p-adj-pruitt', role: 'Adjuster on claim', side: 'Opposing', createdAt: t },
  ];

  // Client records (CL-2). One per client-role party — parallel to `links`,
  // which keeps its Client rows untouched (D-CL2-8).
  //
  // c-servpro-lien deliberately gets NO client: it has no client-role party, so
  // it is the demo-mode instance of the backfill flag. It is flagged, never
  // guessed and never placeholdered.
  const clients: CaseClient[] = [
    {
      id: 'cc-garcia', caseId: 'c-garcia-mvc', partyId: 'p-client-garcia',
      posture: 'claimant', displayOrder: 0,
      statuteOfLimitations: '2028-03-14', solBasis: 'standard',
      clientFlags: [], feeArrangement: { type: 'contingency', contingencyPercent: 33.33 },
      profileFields: {}, createdAt: t, updatedAt: t,
    },
    {
      // Criminal: the nearly-empty row. No damages spine, no limitations date —
      // per-offense clocks live on `charges`. Created anyway, as the future
      // anchor for representation type (brief §4 q2, stated default, #27).
      id: 'cc-boyd', caseId: 'c-boyd-dwi', partyId: 'p-client-boyd',
      posture: 'defendant', displayOrder: 0,
      clientFlags: [], feeArrangement: { type: 'flat' },
      profileFields: {}, createdAt: t, updatedAt: t,
    },
  ];

  const clientFlags: ClientBackfillFlag[] = [
    {
      id: 'ccf-servpro', caseId: 'c-servpro-lien',
      reason:
        'CL-2 backfill: no party on this case carries a Client or Plaintiff role, so no '
        + 'client record could be derived. Not guessed and not placeholdered. Link a '
        + 'client-role party and create the client record; any preserved limitations '
        + 'date carries over to it.',
      createdAt: t,
    },
  ];

  // Demo calendar events (Garcia case) — 'pending' until Outlook is connected.
  const events: CalendarEvent[] = [
    {
      id: 'ce-garcia-hearing', caseId: 'c-garcia-mvc',
      title: 'Status conference — Garcia v. Allied Freight',
      eventType: 'hearing', startLocal: '2026-08-18T09:00', endLocal: '2026-08-18T09:30',
      allDay: false, location: '146th District Court, Bell County',
      notes: 'Scheduling order expected. (Demo data.)',
      status: 'scheduled', syncStatus: 'pending', createdAt: t, updatedAt: t,
    },
    {
      id: 'ce-garcia-deadline', caseId: 'c-garcia-mvc',
      title: 'Discovery responses due — Allied Freight RFP set 1',
      eventType: 'deadline', startLocal: '2026-08-04', allDay: true,
      status: 'scheduled', syncStatus: 'pending', createdAt: t, updatedAt: t,
    },
  ];

  // Charges on the criminal seed case (fictional — matches the case notes).
  const charges: Charge[] = [
    {
      id: 'chg-boyd-dwi', caseId: 'c-boyd-dwi',
      offense: 'DWI', degree: 'MB', offenseDate: '2026-01-25',
      court: 'Bell County Court at Law No. 2', causeNumber: '26-CR-01452',
      mtrMta: false, appeal: false,
      note: 'Penal Code 49.04 — first. (Demo data.)',
      createdAt: t, updatedAt: t,
    },
  ];

  return {
    cases, parties, links, clients, clientFlags, fileCounters: { [yy]: 3 }, events, charges,
    ...billingSeedData(),
    ...transcriptSeedData({ cases, parties, links }),
    ...billsSeedData(),
  };
}
