// Routing-engine test fixtures — the fictional seed universe plus transcript
// texts written to mimic the pilot recordings' noise patterns (garbled slot
// entities inside intact templates, digit-word identifiers, dropped openings).
//
// NOTE for a future session: the design pass calls for the 13 REAL pilot
// transcripts as fixtures. Those recordings live in the Claude.ai project
// space, not this repo — when Michael routes them over (fictional content,
// scored against known scripts), add them beside these synthetic ones.
import type { CaseRecord, PartyRecord, CasePartyLink } from '../../domain/types';
import type { TagTemplate } from '../../domain/transcripts';
import { SEED_TAG_TEMPLATES } from '../templates';

const t = '2026-07-25T00:00:00.000Z';

export const CASES: CaseRecord[] = [
  {
    id: 'c-garcia', fileNumber: '26-0001', practiceArea: 'Personal Injury',
    caseType: 'Motor vehicle collision', caption: 'Garcia v. Allied Freight Lines, Inc.',
    status: 'Treatment in progress', piFlags: [], dateOpened: '2026-03-16',
    createdAt: t, updatedAt: t,
  },
  {
    id: 'c-boyd', fileNumber: '26-0002', practiceArea: 'Criminal', caseType: 'Misdemeanor',
    caption: 'State v. Boyd', status: 'Plea negotiations', piFlags: [],
    dateOpened: '2026-02-02', causeNumber: '26-CR-01452',
    createdAt: t, updatedAt: t,
  },
  {
    id: 'c-servpro', fileNumber: '26-0003', practiceArea: 'General Civil Litigation',
    caseType: "Servpro mechanic's lien", caption: 'In re 7 Winding Creek Ct (water mitigation)',
    status: 'Demand sent', piFlags: [], dateOpened: '2026-05-04',
    createdAt: t, updatedAt: t,
  },
];

export const PARTIES: PartyRecord[] = [
  {
    id: 'p-garcia', partyType: 'client', kind: 'individual', displayName: 'Maria Garcia',
    fields: { phone: '2545550143' }, createdAt: t, updatedAt: t,
  },
  {
    id: 'p-boyd', partyType: 'client', kind: 'individual', displayName: 'Terrence Boyd',
    fields: {}, createdAt: t, updatedAt: t,
  },
  {
    id: 'p-statewide', partyType: 'insuranceCompany', kind: 'organization',
    displayName: 'Statewide Mutual Insurance', fields: { phone: '8005550100' },
    createdAt: t, updatedAt: t,
  },
  {
    id: 'p-pruitt', partyType: 'adjuster', kind: 'individual', displayName: 'Dana Pruitt',
    fields: { phone: '8005550177x214' }, createdAt: t, updatedAt: t,
  },
  {
    id: 'p-caldwell', partyType: 'person', kind: 'individual', displayName: 'Ray Caldwell',
    fields: { phone: '2545550199' }, createdAt: t, updatedAt: t,
  },
];

export const LINKS: CasePartyLink[] = [
  { id: 'l1', caseId: 'c-garcia', partyId: 'p-garcia', role: 'Client', createdAt: t },
  { id: 'l2', caseId: 'c-garcia', partyId: 'p-statewide', role: 'Other', createdAt: t },
  { id: 'l3', caseId: 'c-garcia', partyId: 'p-pruitt', role: 'Adjuster on claim', createdAt: t },
  { id: 'l4', caseId: 'c-garcia', partyId: 'p-caldwell', role: 'Witness', createdAt: t },
  { id: 'l5', caseId: 'c-boyd', partyId: 'p-boyd', role: 'Client', createdAt: t },
  { id: 'l6', caseId: 'c-servpro', partyId: 'p-statewide', role: 'Other', createdAt: t },
  { id: 'l7', caseId: 'c-servpro', partyId: 'p-pruitt', role: 'Adjuster on claim', createdAt: t },
];

export const TEMPLATES: TagTemplate[] = SEED_TAG_TEMPLATES.map((tpl, i) => ({ ...tpl, id: `tt-${i + 1}` }));

export const CTX = { cases: CASES, parties: PARTIES, links: LINKS, templates: TEMPLATES };
