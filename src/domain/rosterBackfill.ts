// CD-1 BACKFILL — mechanical where the mapping is genuinely mechanical,
// FLAGGED everywhere else. Never guessed, never placeholdered.
//
// This is the `case_client_flags` precedent from CL-2 applied to the roster
// (slice item 2). The discipline matters more than the coverage: a wrong
// alignment silently written into a caption is worse than an empty one, because
// nothing downstream can tell it was invented.

import type { CaseRecord, CasePartyLink, CaseRole, PartyRecord } from './types';
import type { CaptionAlignment, PartyStatus } from './roster';
import { sideSetFor } from './roster';

/** Directory backfill (§3.4): the existing single `partyType` becomes tag zero.
 *  Lossless and reversible — the column itself is retained. */
export function backfillRoleTags(party: Pick<PartyRecord, 'partyType' | 'roleTags'>): string[] {
  if (party.roleTags && party.roleTags.length > 0) return party.roleTags;
  return party.partyType ? [party.partyType] : [];
}

/** Roles that name a CAPTION position. These map to an alignment mechanically —
 *  the slice's own words: "existing Plaintiff/Defendant role values map to
 *  alignments mechanically." */
const CAPTION_ROLE_TO_ALIGNMENT: Partial<Record<CaseRole, string>> = {
  Plaintiff: 'Plaintiff',
  Defendant: 'Defendant',
};

/** Roles that name a FUNCTION, never a caption position. Mapping these to
 *  `null` (non-party) is derivable from the side sets themselves rather than
 *  inferred about the case: none of these strings is an alignment value in ANY
 *  defined side set, and none ever could be. A treating provider is not a
 *  caption party on any case type this practice files. */
const NON_CAPTION_ROLES = new Set<CaseRole>([
  'Witness',
  'Opposing counsel',
  'Co-counsel',
  'Adjuster on claim',
  'Treating provider',
  'Expert — ours',
  'Expert — opposing',
  'Judge assigned',
  'Court of record',
]);

export interface RosterBackfillResult {
  /** Fields to write onto the link. Only ever contains what was derivable. */
  patch: Partial<Pick<CasePartyLink,
    'storyRole' | 'captionAlignment' | 'partyStatus' | 'joinedBy' | 'activeState'>>;
  /** Set when alignment could not be derived. The link still gets its patch —
   *  a flag is an addition, not an abort. */
  flag?: { reason: string; unmappedValue: string };
}

/** Derive what CD-1's four attributes should be for one pre-existing link.
 *
 *  Always derivable, for every link:
 *    - storyRole  = the existing role, carried VERBATIM (lossless).
 *    - activeState/joinedBy = the §4.3 defaults (active, intake).
 *    - firm perspective = the existing `side` column, untouched — it already
 *      IS attribute 4 and is deliberately not rewritten here.
 *
 *  Derivable only sometimes:
 *    - captionAlignment. Plaintiff/Defendant map mechanically WHEN the case
 *      type's side set actually contains that alignment (a 'Defendant' link on
 *      a criminal matter does not, and must not be forced). Function roles map
 *      to null. Everything else is flagged. */
export function backfillRosterAttributes(
  link: Pick<CasePartyLink, 'role' | 'storyRole' | 'captionAlignment'>,
  caseRecord: Pick<CaseRecord, 'practiceArea' | 'caseType'>,
): RosterBackfillResult {
  const patch: RosterBackfillResult['patch'] = {
    storyRole: link.storyRole ?? link.role,
    joinedBy: 'intake-slot',
    activeState: 'active',
  };

  // Already carries an alignment (including a deliberate null) — leave it be.
  if (link.captionAlignment !== undefined) return { patch };

  const sideSet = sideSetFor(caseRecord.practiceArea, caseRecord.caseType);

  const mapped = CAPTION_ROLE_TO_ALIGNMENT[link.role];
  if (mapped) {
    if (sideSet.alignments.includes(mapped)) {
      const alignment: CaptionAlignment = mapped;
      const status: PartyStatus = 'caption-party';
      return { patch: { ...patch, captionAlignment: alignment, partyStatus: status } };
    }
    // The role names a caption position this case type does not have — e.g. a
    // 'Defendant' link on a Felony, whose side set is State/Accused. Real data,
    // no mechanical answer. Flag it rather than force the nearest-looking value.
    return {
      patch,
      flag: {
        reason:
          `Role "${link.role}" names a caption position that the ${sideSet.label} side set for ` +
          `"${caseRecord.caseType}" does not define. Pick the alignment that is actually correct.`,
        unmappedValue: link.role,
      },
    };
  }

  if (NON_CAPTION_ROLES.has(link.role)) {
    // null is a VALUE here, not an absence: this contact is not in the caption.
    return { patch: { ...patch, captionAlignment: null } };
  }

  // 'Client' and 'Other' land here, deliberately.
  //
  // 'Client' is the common one and it is genuinely ambiguous: our client is the
  // Plaintiff on a civil caption and the Accused on a criminal one, and on a
  // civil matter nothing in the record says whether the firm sued or defended
  // — `representationType` exists but is criminal-only ('Court-appointed' /
  // 'Private hire'). Two defensible answers means no mechanical answer, so it
  // is flagged. This WILL flag most existing cases, and that is the honest
  // result rather than a defect: the alternative is inventing alignments.
  return {
    patch,
    flag: {
      reason:
        `Role "${link.role}" does not determine a caption alignment on its own ` +
        `(${sideSet.label}). Set it by hand — nothing was guessed.`,
      unmappedValue: link.role,
    },
  };
}

/** Summary for the migration report and for BUILD-STATE's honesty. */
export interface BackfillSummary {
  linksProcessed: number;
  alignmentsDerived: number;
  nonPartiesDerived: number;
  flagged: number;
}

export function summarizeBackfill(results: RosterBackfillResult[]): BackfillSummary {
  return {
    linksProcessed: results.length,
    alignmentsDerived: results.filter((r) => typeof r.patch.captionAlignment === 'string').length,
    nonPartiesDerived: results.filter((r) => r.patch.captionAlignment === null).length,
    flagged: results.filter((r) => !!r.flag).length,
  };
}
