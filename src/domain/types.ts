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

import type { DirectoryAlias } from './directory';
import type {
  CaptionAlignment, PartyStatus, CapacityKind, JoinedBy, RosterActiveState,
} from './roster';

/** What a party IS (identity) — separate from what it DOES on a case (role). */
export type PartyKind = 'individual' | 'organization';

export interface PartyRecord {
  id: string;
  /** RETAINED, NOT DROPPED (CD-1 §3.4). `roleTags` supersedes it as the thing
   *  the app reads and filters on, but the column stays: it drives the
   *  registry's field definitions (which fields a form renders), and dropping
   *  it would mean rebuilding form rendering inside this slice. `roleTags[0]`
   *  is kept equal to it by the backfill contract. */
  partyType: string; // key into the party-type registry
  kind: PartyKind;
  displayName: string; // computed convenience field for lists/search
  /** Field values keyed by field key from the registry. Repeating fields hold arrays of objects.
   *
   *  GATE 10: this blob no longer carries `dob`, `ssn`, `dlNumber` or `dlState`.
   *  Those have declared storage destinations in the registry and are stripped
   *  from every write by `domain/partyPii.ts`. Do not reintroduce them here. */
  fields: Record<string, unknown>;
  /** Gate 10 §2 — `parties.date_of_birth`. An ordinary typed column that rides
   *  every party read BY DESIGN: DOB is read constantly and rendered inline.
   *  This is deliberately NOT in the child table (schema slice §6 rejected
   *  "all three in the child table" for costing a join on the common case). */
  dateOfBirth?: string | null;
  /** CD-1 §3.4 — multi-valued directory role tags. Position 0 mirrors
   *  `partyType`. See domain/directory.ts. */
  roleTags: string[];
  /** CD-1 §3.2 — typed alias set (d/b/a, f/k/a, entity-suffix variants). */
  aliases: DirectoryAlias[];
  /** CD-1 §3.1 — living/deceased is a directory-level fact of the person. */
  deceased: boolean;
  deceasedDate?: string;
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
  /** The legacy role list. RETAINED — existing links, pickers, and the medical
   *  module all read it. CD-1 adds `storyRole` beside it for the open
   *  vocabulary the roster capture evidences; neither replaces the other in
   *  this slice, and nothing was silently re-pointed. */
  role: CaseRole;
  /** CD-1 §4.2 attribute 4 — firm perspective. This column's TRUE meaning,
   *  ruled: it survives as-is and is NOT migrated away. */
  side?: Side;
  note?: string;

  // ── CD-1 §4.2: the four separable attributes ──────────────────────────────
  /** Attribute 1 — what they are in the story. Open vocabulary; falls back to
   *  `role` when a link predates the roster layer. */
  storyRole?: string;
  /** Attribute 2 — drawn from the case type's DEFINED side set. `null` means
   *  non-party, which is different from "not yet set" (undefined). */
  captionAlignment?: CaptionAlignment;
  /** Attribute 3 — procedural kind of participant. */
  partyStatus?: PartyStatus;

  // ── CD-1 §3.1: capacity lives on the LINK, never the directory ────────────
  capacityKind?: CapacityKind;
  /** The minor, the decedent — a directory id, never a copied name. */
  capacityPointsAtPartyId?: string;

  // ── CD-1 §4.3: roster entries are history, not snapshot ───────────────────
  joinedBy?: JoinedBy;
  activeState?: RosterActiveState;
  /** Which seeded slot created this entry, when one did. */
  slotRole?: string;

  createdAt: string;
}

/** A roster fact the CD-1 backfill could not derive mechanically. Never guessed
 *  and never placeholdered — the `case_client_flags` precedent from CL-2,
 *  applied to the roster. Holds what it could not map so nothing is lost. */
export interface RosterBackfillFlag {
  id: string;
  caseId: string;
  casePartyId: string;
  reason: string;
  /** The value that could not be mapped, preserved verbatim. */
  unmappedValue?: string;
  resolvedAt?: string;
  createdAt: string;
}
