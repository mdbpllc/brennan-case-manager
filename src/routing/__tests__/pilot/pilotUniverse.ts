// The fictional case/party universe behind the Phase 0 pilot recordings —
// reconstructed from recording-test-scripts.md (the ground-truth scripts) and
// the batch1 MANIFEST. All names, matters, and numbers are fictional; the
// audio + findings docs live outside the repo at ..\data\pilot-recordings\.
import type { CaseRecord, PartyRecord, CasePartyLink } from '../../../domain/types';
import { withDirectoryDefaults } from '../../../domain/directory';
import type { TagTemplate } from '../../../domain/transcripts';
import type { RoutingContext } from '../../engine';
import { SEED_TAG_TEMPLATES } from '../../templates';

const t = '2026-07-25T00:00:00.000Z';

const caseDefaults = {
  practiceArea: 'Personal Injury' as const, caseType: 'Motor vehicle collision',
  status: 'Open', piFlags: [], dateOpened: '2026-01-01', createdAt: t, updatedAt: t,
};

export const PILOT_CASES: CaseRecord[] = [
  { ...caseDefaults, id: 'c-ramirez', fileNumber: '26-0101', caption: 'Ramirez v. Pemberton', causeNumber: '2025-CI-08841' },
  { ...caseDefaults, id: 'c-delgado', fileNumber: '26-0102', caption: 'Delgado v. Ochoa' },
  { ...caseDefaults, id: 'c-whitfield', fileNumber: '26-0103', caption: 'Whitfield v. Barrera' },
  { ...caseDefaults, id: 'c-castillo', fileNumber: '26-0104', caption: 'Castillo v. Brennan Trucking' },
  { ...caseDefaults, id: 'c-jones', fileNumber: '26-0105', caption: 'In re Robert Jones' },
  { ...caseDefaults, id: 'c-hernandez', fileNumber: '26-0106', caption: 'Hernandez v. Kessler' },
];

function party(id: string, partyType: string, kind: 'individual' | 'organization', displayName: string, fields: Record<string, unknown> = {}): PartyRecord {
  // CD-1 directory fields come from the shared default helper, so these
  // fixtures keep matching what a migrated contact actually looks like.
  return withDirectoryDefaults({ id, partyType, kind, displayName, fields, createdAt: t, updatedAt: t });
}

export const PILOT_PARTIES: PartyRecord[] = [
  party('p-ramirez', 'client', 'individual', 'Isabel Ramirez'),
  party('p-delgado', 'client', 'individual', 'Luis Delgado'),
  party('p-whitfield', 'client', 'individual', 'Anna Whitfield'),
  party('p-castillo', 'client', 'individual', 'Jorge Castillo'),
  party('p-jones', 'client', 'individual', 'Robert Jones'),
  party('p-hernandez', 'client', 'individual', 'Miguel Hernandez'),
  party('p-webb', 'adjuster', 'individual', 'Marcus Webb', { phone: '2105550187x4402' }),
  party('p-farmers', 'insuranceCompany', 'organization', 'Farmers Insurance'),
  party('p-statefarm', 'insuranceCompany', 'organization', 'State Farm'),
  party('p-allstate', 'insuranceCompany', 'organization', 'Allstate'),
  party('p-vasquez', 'medicalProfessional', 'individual', 'Elena Vasquez'),
  party('p-mission', 'providerBusiness', 'organization', 'Mission Trace Orthopedics'),
  party('p-sti', 'providerBusiness', 'organization', 'South Texas Imaging'),
  party('p-doyle', 'attorney', 'individual', 'Katherine Doyle'),
];

function link(id: string, caseId: string, partyId: string): CasePartyLink {
  return { id, caseId, partyId, role: 'Other', createdAt: t };
}

export const PILOT_LINKS: CasePartyLink[] = [
  link('pl-1', 'c-ramirez', 'p-ramirez'),
  link('pl-2', 'c-delgado', 'p-delgado'),
  link('pl-3', 'c-whitfield', 'p-whitfield'),
  link('pl-4', 'c-castillo', 'p-castillo'),
  link('pl-5', 'c-jones', 'p-jones'),
  link('pl-6', 'c-hernandez', 'p-hernandez'),
  link('pl-7', 'c-ramirez', 'p-webb'),
  link('pl-8', 'c-ramirez', 'p-farmers'),
  // State Farm sits on two files (script 1's Delgado tag; recording 8's Hernandez call).
  link('pl-9', 'c-delgado', 'p-statefarm'),
  link('pl-10', 'c-hernandez', 'p-statefarm'),
  link('pl-11', 'c-whitfield', 'p-allstate'),
  link('pl-12', 'c-ramirez', 'p-vasquez'),
  link('pl-13', 'c-ramirez', 'p-mission'),
  link('pl-14', 'c-ramirez', 'p-sti'),
  link('pl-15', 'c-ramirez', 'p-doyle'),
];

export const PILOT_TEMPLATES: TagTemplate[] = SEED_TAG_TEMPLATES.map((tpl, i) => ({ ...tpl, id: `ptt-${i + 1}` }));

export const PILOT_CTX: RoutingContext = {
  cases: PILOT_CASES,
  parties: PILOT_PARTIES,
  links: PILOT_LINKS,
  templates: PILOT_TEMPLATES,
  // The Ramirez carrier claim (script 2) — claim numbers live outside the
  // case record, so they enter the router as extra known identifiers.
  identifiers: [{ value: '43-8812-K79', caseId: 'c-ramirez', label: 'claim no. 43-8812-K79' }],
};
