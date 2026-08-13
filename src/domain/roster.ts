// ROSTER LAYER (CD-1 §4, CD-2 rosters) — what a contact IS ON A CASE.
//
// Design authority: docs/specs/contact-directory.md §4. Scope: cd1-build-slice.md
// item 2 (case_parties evolution) and item 3 (roster definitions as data).
//
// The binding constraint this satisfies BY CONSTRUCTION (roster capture REQ-14,
// ruled 2026-08-12): SIDES ARE A PROPERTY OF THE CASE TYPE, NOT A CONSTANT. Any
// roster model with exactly two hard-coded sides fails on documents this practice
// demonstrably files — ex parte petitions with no adversary, State v. accused,
// interpleader stakeholder/claimants. So alignment is drawn from the case type's
// DEFINED side set, and "Plaintiff" is an alignment, never a role.

import type { PartyKind, PracticeArea, PiFlag } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// §4.2 — the four separable attributes of a roster entry
// ─────────────────────────────────────────────────────────────────────────────

/** WHAT THEY ARE IN THE STORY. Open vocabulary by design — the story-role space
 *  is the practice's, not the software's (driver, carrier, adjuster, treating
 *  physician, operator entity...). Slot definitions supply the common ones. */
export type RosterRole = string;

/** WHETHER AND HOW THEY APPEAR IN THE CAPTION. Drawn from the case type's side
 *  set (see SIDE_SETS). `null` for non-parties — the UIM at-fault driver has no
 *  alignment at all, which is exactly why this is separable from role. */
export type CaptionAlignment = string | null;

/** WHAT KIND OF PARTICIPANT they are procedurally. */
export type PartyStatus =
  | 'caption-party'
  | 'non-party-actor'
  | 'court-appointed'
  | 'intervenor'
  | 'unnamed-reserved';

export const PARTY_STATUSES: PartyStatus[] = [
  'caption-party', 'non-party-actor', 'court-appointed', 'intervenor', 'unnamed-reserved',
];

export const PARTY_STATUS_LABELS: Record<PartyStatus, string> = {
  'caption-party': 'Caption party',
  'non-party-actor': 'Non-party actor',
  'court-appointed': 'Court-appointed',
  intervenor: 'Intervenor',
  'unnamed-reserved': 'Unnamed / reserved',
};

/** WHOSE SIDE THEY ARE ON FROM THE FIRM'S CHAIR. This is the existing `side`
 *  column's true meaning (§4.2, ruled) — it survives as-is and is NOT migrated
 *  away. The UIM at-fault driver shows why all four attributes are needed at
 *  once: no alignment, non-party status, driver role, unmistakably opposing. */
export type FirmPerspective = 'Ours' | 'Opposing' | 'Neutral';

// ─────────────────────────────────────────────────────────────────────────────
// §3.1 — capacity: a property of the LINK, never the directory
// ─────────────────────────────────────────────────────────────────────────────

/** One human = one directory row, always. The same person appearing twice in
 *  one caption (individually AND as next friend) is TWO roster entries over ONE
 *  directory row — never two contacts. Evidence: roster capture REQ-12. */
export type CapacityKind =
  | 'individually'
  | 'next-friend-of'
  | 'representative-of-estate-of'
  | 'dba';

export const CAPACITY_KINDS: CapacityKind[] = [
  'individually', 'next-friend-of', 'representative-of-estate-of', 'dba',
];

export const CAPACITY_KIND_LABELS: Record<CapacityKind, string> = {
  individually: 'Individually',
  'next-friend-of': 'As next friend of',
  'representative-of-estate-of': 'As representative of the estate of',
  dba: 'd/b/a',
};

/** Kinds that point AT someone — the minor, the decedent. For these the roster
 *  entry carries a reference to that person's directory row. */
const POINTING_CAPACITIES = new Set<CapacityKind>(['next-friend-of', 'representative-of-estate-of']);

export function capacityPointsAtContact(kind: CapacityKind): boolean {
  return POINTING_CAPACITIES.has(kind);
}

export interface Capacity {
  kind: CapacityKind;
  /** Directory id of the person pointed at (the minor, the decedent).
   *  Required in practice for pointing capacities; see validateCapacity. */
  pointsAtContactId?: string;
}

/** Advisory validation — returns a problem string, or null when fine. The UI
 *  surfaces this; nothing here throws or blocks, per the flags-not-guesses rule. */
export function validateCapacity(c: Capacity): string | null {
  if (capacityPointsAtContact(c.kind) && !c.pointsAtContactId) {
    return `"${CAPACITY_KIND_LABELS[c.kind]}" needs the person it points at — the minor or decedent's directory entry.`;
  }
  if (!capacityPointsAtContact(c.kind) && c.pointsAtContactId) {
    return `"${CAPACITY_KIND_LABELS[c.kind]}" does not point at another person; clear the reference.`;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// §4.3 — roster entries are HISTORY, not snapshot
// ─────────────────────────────────────────────────────────────────────────────

/** How this entry joined the case. Rosters change mid-case by operation of
 *  procedure (REQ-10: suggestion of death, scire facias, heirs in, decedent
 *  out), and FE-8/IN-4 both need "who was in this case when this instrument
 *  went out." */
export type JoinedBy = 'intake-slot' | 'amendment' | 'court-action' | 'substitution';

export const JOINED_BY: JoinedBy[] = ['intake-slot', 'amendment', 'court-action', 'substitution'];

export const JOINED_BY_LABELS: Record<JoinedBy, string> = {
  'intake-slot': 'Intake slot',
  amendment: 'Amendment',
  'court-action': 'Court action',
  substitution: 'Substitution',
};

export type RosterActiveState = 'active' | 'withdrawn' | 'substituted-out';

export const ROSTER_ACTIVE_STATES: RosterActiveState[] = ['active', 'withdrawn', 'substituted-out'];

export const ROSTER_ACTIVE_STATE_LABELS: Record<RosterActiveState, string> = {
  active: 'Active',
  withdrawn: 'Withdrawn',
  'substituted-out': 'Substituted out',
};

/** §4.3: "Defaults do the work: slot-created entries are born (intake, active)
 *  with nothing extra typed." */
export const DEFAULT_JOINED_BY: JoinedBy = 'intake-slot';
export const DEFAULT_ACTIVE_STATE: RosterActiveState = 'active';

export function isActiveOnRoster(state: RosterActiveState): boolean {
  return state === 'active';
}

// ─────────────────────────────────────────────────────────────────────────────
// Side sets — REQ-14's constraint made data
// ─────────────────────────────────────────────────────────────────────────────

export interface SideSet {
  id: string;
  label: string;
  /** The alignments a caption on this case type can carry. An EMPTY list is
   *  meaningful and legal: ex parte instruments have no adversary at all. */
  alignments: string[];
}

export const SIDE_SETS: Record<string, SideSet> = {
  'plaintiff-defendant': {
    id: 'plaintiff-defendant',
    label: 'Plaintiff / Defendant',
    alignments: ['Plaintiff', 'Defendant'],
  },
  'state-accused': {
    id: 'state-accused',
    label: 'State / Accused',
    alignments: ['State', 'Accused'],
  },
  'petitioner-only': {
    id: 'petitioner-only',
    label: 'Petitioner only (no adversary in the caption)',
    alignments: ['Petitioner'],
  },
  // Defined because the spec names it and the constraint exists; DELIBERATELY
  // UNASSIGNED — no case type in the tree files interpleader today. Seeding a
  // vocabulary is not the same as claiming a consumer.
  'stakeholder-claimants': {
    id: 'stakeholder-claimants',
    label: 'Stakeholder / Claimants',
    alignments: ['Stakeholder', 'Claimant'],
  },
};

/** Case types whose captions have no adversary (roster capture REQ-09: ex parte
 *  habeas, expunction, occupational-license — a petitioner only, with the State
 *  and agencies as IMPLIED respondents, named nowhere in the caption). */
const PETITIONER_ONLY_TYPES = new Set([
  'Expunction',
  'Order for non-disclosure',
  'Motion for judicial clemency',
]);

const ADVERSARIAL_CRIMINAL_TYPES = new Set(['Misdemeanor', 'Felony']);

/** The side set for a case type. Practice area supplies the default; the case
 *  type overrides where its caption genuinely differs. */
export function sideSetFor(practiceArea: PracticeArea, caseType: string): SideSet {
  if (practiceArea === 'Criminal') {
    if (PETITIONER_ONLY_TYPES.has(caseType)) return SIDE_SETS['petitioner-only'];
    if (ADVERSARIAL_CRIMINAL_TYPES.has(caseType)) return SIDE_SETS['state-accused'];
    return SIDE_SETS['petitioner-only'];
  }
  return SIDE_SETS['plaintiff-defendant'];
}

/** Is this alignment legal on this case type? Non-parties (null) always are —
 *  that is the point of separating alignment from role. */
export function isAlignmentValid(
  practiceArea: PracticeArea,
  caseType: string,
  alignment: CaptionAlignment,
): boolean {
  if (alignment === null || alignment === undefined || alignment === '') return true;
  return sideSetFor(practiceArea, caseType).alignments.includes(alignment);
}

// ─────────────────────────────────────────────────────────────────────────────
// §4.1 — roster slot definitions as DATA, with inheritance
// ─────────────────────────────────────────────────────────────────────────────

/** REQ-13's folder-taxonomy evidence, made a tier. `rare-with-procedure` is not
 *  "unlikely" — it means the slot is filled by a PROCEDURE (joinder, scire
 *  facias, substitution), not at intake. */
export type Expectancy = 'expected' | 'optional' | 'rare-with-procedure';

export const EXPECTANCIES: Expectancy[] = ['expected', 'optional', 'rare-with-procedure'];

export const EXPECTANCY_LABELS: Record<Expectancy, string> = {
  expected: 'Expected',
  optional: 'Optional',
  'rare-with-procedure': 'Rare — by procedure',
};

export interface RosterSlot {
  /** Stable within its source; the resolved key is `${source}:${role}`. */
  role: RosterRole;
  expectancy: Expectancy;
  /** Suggested alignment when the slot is filled. null = non-party by nature. */
  alignmentHint?: CaptionAlignment;
  statusHint?: PartyStatus;
  partyKindHint?: PartyKind;
  perspectiveHint?: FirmPerspective;
  /** §4.1 slots carry service-path HINTS; roster entries carry service FACTS.
   *  Service-story FIELDS are explicitly Scope-OUT for this slice — the hint is
   *  a label here, and nothing consumes it yet. */
  servicePathHint?: string;
  note?: string;
}

/** Where a resolved slot came from, so the UI can show inheritance honestly. */
export type SlotSource =
  | { kind: 'practice-area'; practiceArea: PracticeArea }
  | { kind: 'case-type'; caseType: string }
  | { kind: 'overlay'; flag: PiFlag };

export interface ResolvedSlot extends RosterSlot {
  source: SlotSource;
  sourceLabel: string;
}

// ── Seeds. BANK-EVIDENCED ONLY (slice item 3). Every entry below cites the
// roster-mining capture requirement that evidences it. No speculative types.

/** Practice-area level — the inheritance parent. Seeded only where the evidence
 *  is practice-area-wide rather than case-type specific. */
const PRACTICE_AREA_SLOTS: Partial<Record<PracticeArea, RosterSlot[]>> = {
  // REQ-09: the criminal bank captions EVERY instrument State of Texas v.
  // [client] — the client-as-defendant orientation is area-wide, including the
  // ex parte types where the accused is instead the petitioner.
  Criminal: [
    {
      role: 'Accused / petitioner (client)',
      expectancy: 'expected',
      statusHint: 'caption-party',
      partyKindHint: 'individual',
      perspectiveHint: 'Ours',
      note: 'Client-as-defendant orientation (roster capture REQ-09).',
    },
  ],
};

const CASE_TYPE_SLOTS: Record<string, RosterSlot[]> = {
  // REQ-01 + REQ-02.
  'Motor vehicle collision': [
    { role: 'Injured person', expectancy: 'expected', alignmentHint: 'Plaintiff', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Ours', note: 'REQ-01 baseline pair.' },
    { role: 'Adverse driver', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-01 baseline pair.' },
    { role: 'Passenger co-plaintiff', expectancy: 'optional', alignmentHint: 'Plaintiff', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Ours', note: 'REQ-02(a) — frequently shares surname/household with the driver-plaintiff.' },
    { role: 'Vehicle owner-entrustor', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', perspectiveHint: 'Opposing', note: 'REQ-02(b) — negligent-entrustment posture.' },
    { role: 'Minor (by next friend)', expectancy: 'optional', alignmentHint: 'Plaintiff', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Ours', note: 'REQ-02(c) — parent sues individually AND as next friend; capacity lives on the link.' },
  ],
  // REQ-04 — the entity stack behind one storefront.
  Premises: [
    { role: 'Operator entity', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-04 — very often sued under a d/b/a trade name.' },
    { role: 'Property-owner entity', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-04.' },
    { role: 'Management / realty company', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-04.' },
    { role: 'Contractor who created the condition', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-04.' },
    { role: 'Store employee / manager', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-04.' },
    { role: 'John Doe placeholder', expectancy: 'rare-with-procedure', alignmentHint: 'Defendant', statusHint: 'unnamed-reserved', perspectiveHint: 'Opposing', note: 'REQ-04 — reserved, unnamed.' },
  ],
  // REQ-07. The attorney practice note (2026-08-12) is the expectancy split:
  // governmental body ALONE in nearly all cases; employee joinder is deliberate
  // and exceptional, which is what rare-with-procedure means.
  'TTCA — Motor Vehicle': [
    { role: 'Governmental unit', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', servicePathHint: 'Role-specific statutory service path', note: 'REQ-07.' },
    { role: 'Individual employee (joined)', expectancy: 'rare-with-procedure', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-07 — joining unit AND employees is a distinct, legally consequential constellation.' },
  ],
  'TTCA — Premises': [
    { role: 'Governmental unit', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', servicePathHint: 'Role-specific statutory service path', note: 'REQ-07.' },
    { role: 'Individual employee (joined)', expectancy: 'rare-with-procedure', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-07.' },
  ],
  // REQ-06 — insurance/DTPA postures.
  DTPA: [
    { role: 'Adverse entity', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', perspectiveHint: 'Opposing', note: 'REQ-06 — insurer, platform, or business depending on posture.' },
    { role: 'Individual adjuster', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-06 — bad-faith posture; employee of the insurer.' },
    { role: 'Platform / TNC', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-06 — coverage-gap posture.' },
    { role: 'Insurer group parent / affiliate', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-06.' },
  ],
  // REQ-09 — State as the adverse party on adversarial criminal types only.
  Misdemeanor: [
    { role: 'State of Texas', expectancy: 'expected', alignmentHint: 'State', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-09.' },
  ],
  Felony: [
    { role: 'State of Texas', expectancy: 'expected', alignmentHint: 'State', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-09.' },
  ],
};

/** OVERLAY slot sets, keyed to PI occurrence flags rather than case types.
 *
 *  WHY THIS EXISTS, stated rather than buried: the slice names "trucking" and
 *  "UIM/UM" among the case types to seed, but neither is a case type — both are
 *  PI overlay FLAGS (`PI_FLAGS`), and PR-3 holds the case-type tree shut. The
 *  spec's §4.1 inheritance ("a child case type inherits its parent's slots")
 *  also has no child-to-parent case-type tree to run on: CASE_TYPE_DEFS is flat.
 *  Overlays deliver the authorization's own seed list without touching the tree.
 *  Recorded in docs/spec-feedback.md; Michael's to redirect. Slots are DATA. */
const OVERLAY_SLOTS: Partial<Record<PiFlag, RosterSlot[]>> = {
  // REQ-03 — many-entity defendant side, with tolerance for role collapse into
  // one person (the individual sued as d/b/a a trucking operation).
  'Trucking/commercial vehicle': [
    { role: 'Driver', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-03.' },
    { role: 'Motor carrier (employer)', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-03.' },
    { role: 'Lessor / fleet-leasing company', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-03 — distinct from the operating employer.' },
    { role: 'Vehicle owner', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', perspectiveHint: 'Opposing', note: 'REQ-03.' },
    { role: 'Trainer', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', perspectiveHint: 'Opposing', note: 'REQ-03.' },
    { role: 'Parent entity', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-03.' },
    { role: 'Staffing entity', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: 'REQ-03 — joint-enterprise theory.' },
  ],
  // REQ-05 — the inversion. The at-fault driver is the reason non-party actors
  // are in scope from day one (REQ-15, the gate finding).
  'UM/UIM (first-party)': [
    { role: 'First-party UIM/UM insurer', expectancy: 'expected', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'organization', perspectiveHint: 'Opposing', note: "REQ-05 — the caption defendant is the client's own insurer." },
    { role: 'At-fault driver (non-party)', expectancy: 'expected', alignmentHint: null, statusHint: 'non-party-actor', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-05 — appears only in the fact narrative; discovery revolves around them.' },
    { role: 'Phantom / unknown driver', expectancy: 'optional', alignmentHint: null, statusHint: 'unnamed-reserved', perspectiveHint: 'Opposing', note: 'REQ-05 — named nowhere.' },
    { role: 'Individual adjuster', expectancy: 'optional', alignmentHint: 'Defendant', statusHint: 'caption-party', partyKindHint: 'individual', perspectiveHint: 'Opposing', note: 'REQ-05.' },
  ],
};

/** Resolve the intake roster for a case: practice-area slots (the inheritance
 *  parent), then case-type slots, then overlay slots for each active PI flag.
 *
 *  Later sources do NOT override earlier ones — duplicates by role are dropped,
 *  first source winning, so inheritance is additive and predictable. Empty
 *  optional slots are NORMAL, not defects (§4.1). */
export function resolveRosterSlots(
  practiceArea: PracticeArea,
  caseType: string,
  piFlags: PiFlag[] = [],
): ResolvedSlot[] {
  const out: ResolvedSlot[] = [];
  const seen = new Set<string>();

  const push = (slots: RosterSlot[] | undefined, source: SlotSource, sourceLabel: string) => {
    for (const slot of slots ?? []) {
      const key = slot.role.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ ...slot, source, sourceLabel });
    }
  };

  push(PRACTICE_AREA_SLOTS[practiceArea], { kind: 'practice-area', practiceArea }, `${practiceArea} (inherited)`);
  push(CASE_TYPE_SLOTS[caseType], { kind: 'case-type', caseType }, caseType);
  for (const flag of piFlags) {
    push(OVERLAY_SLOTS[flag], { kind: 'overlay', flag }, `${flag} (overlay)`);
  }

  return out;
}

/** Case types and overlays that actually carry seeded slots — so the UI can say
 *  "no roster defined for this case type yet" honestly instead of showing an
 *  empty panel that looks broken. */
export function hasSeededRoster(practiceArea: PracticeArea, caseType: string, piFlags: PiFlag[] = []): boolean {
  return resolveRosterSlots(practiceArea, caseType, piFlags).length > 0;
}

const EXPECTANCY_ORDER: Record<Expectancy, number> = {
  expected: 0,
  optional: 1,
  'rare-with-procedure': 2,
};

export function sortSlots(slots: ResolvedSlot[]): ResolvedSlot[] {
  return [...slots].sort(
    (a, b) => EXPECTANCY_ORDER[a.expectancy] - EXPECTANCY_ORDER[b.expectancy] || a.role.localeCompare(b.role),
  );
}
