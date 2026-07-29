// Core domain types — mirrors the settled data model in the project instructions (§7, §11).

export type PracticeArea = 'Personal Injury' | 'General Civil Litigation' | 'Criminal';

export type RepresentationType = 'Court-appointed' | 'Private hire';

/** Stackable PI overlay FILE-level overlay flags — flags, NOT case types (settled).
 *
 *  D-CL2-5 (CLOSED): these are OCCURRENCE flags — "true for everyone in the car"
 *  — and stay case-scoped. 'Medicare/Medicaid beneficiary' was removed from this
 *  list by CL-2 and lives on the client record (`ClientFlag`): the Safe Harbor
 *  authorization names a specific beneficiary and the lien reaches only that
 *  person's recovery. One passenger may be a beneficiary and another not.
 *  Minor/incapacitated stays HERE by ruling — do not "fix" it to the client. */
export type PiFlag =
  | 'UM/UIM (first-party)'
  | 'Trucking/commercial vehicle'
  | 'Product-suspected'
  | 'Death (wrongful-death/survival)'
  | 'Government defendant'
  | 'Minor/incapacitated client';

export interface CaseRecord {
  id: string; // internal ID (behind the scenes)
  fileNumber: string; // YY-NNNN, auto-generated, counter resets each January
  legacyRef?: string; // optional Cloudlex identifier for migrated cases
  practiceArea: PracticeArea;
  caseType: string;
  caption?: string;
  status: string;
  representationType?: RepresentationType; // criminal only
  commercialPolicyInvolved?: boolean; // MVC rollup flag
  piFlags: PiFlag[];
  dateOfIncident?: string;
  dateOpened: string;
  /** NO `statuteOfLimitations` HERE — RETIRED by CL-2 (D-CL2-2, executed
   *  2026-07-28). The date lives on the client record; the case DISPLAYS the
   *  earliest across unresolved clients, derived and non-writable, via
   *  `earliestLimitations()` in domain/client.ts. Do not re-add this field: a
   *  writable column meant to mirror derived data stops mirroring it silently,
   *  and the heartbeat's master clock could not say which number it read.
   *  Criminal matters never used it — per-offense clocks live on `charges`. */
  dateClosed?: string;
  courtName?: string;
  causeNumber?: string;
  // Criminal / OAA-intake fields (spec §1a semantic mappings — all optional)
  county?: string;
  /** Custody location present on the OAA → defendant in custody (bench-warrant /
   *  writ logistics; the docket worksheet's special-notes line). */
  inCustody?: boolean;
  custodyLocation?: string;
  /** Date the appointment order was made (court-appointed criminal matters). */
  appointmentDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** What a party IS (identity) — separate from what it DOES on a case (role). */
export type PartyKind = 'individual' | 'organization';

export interface PartyRecord {
  id: string;
  partyType: string; // key into the party-type registry
  kind: PartyKind;
  displayName: string; // computed convenience field for lists/search
  /** Field values keyed by field key from the registry. Repeating fields hold arrays of objects. */
  fields: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/** Roles assigned on top of party identity, per case (settled §11). */
export type CaseRole =
  | 'Plaintiff'
  | 'Defendant'
  | 'Client'
  | 'Witness'
  | 'Opposing counsel'
  | 'Co-counsel'
  | 'Adjuster on claim'
  | 'Treating provider'
  | 'Expert — ours'
  | 'Expert — opposing'
  | 'Judge assigned'
  | 'Court of record'
  | 'Other';

export type Side = 'Ours' | 'Opposing' | 'Neutral';

/** Single source for role/side pickers — 'Client' first as the most common choice. */
export const CASE_ROLES: CaseRole[] = [
  'Client', 'Plaintiff', 'Defendant', 'Witness', 'Opposing counsel', 'Co-counsel',
  'Adjuster on claim', 'Treating provider', 'Expert — ours', 'Expert — opposing',
  'Judge assigned', 'Court of record', 'Other',
];
export const SIDES: Side[] = ['Ours', 'Opposing', 'Neutral'];

export interface CasePartyLink {
  id: string;
  caseId: string;
  partyId: string;
  role: CaseRole;
  side?: Side;
  note?: string;
  createdAt: string;
}
