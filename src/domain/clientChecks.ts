/**
 * `CL2-CHECK-1` — the client-role ↔ client-record consistency check.
 *
 * **ADOPTED 2026-09-05, Michael: *"Adopt"*** (`R6`; session log `#148`;
 * `docs/specs/cc1-hands-on-sitting-rulings-2026-09-05.md` §2). It supersedes
 * DEFERRED-do-not-build (2026-07-28) and KEEP PARKED (`#66`), and his reason is
 * the one worth carrying: **it is what makes R5's three answers safe.**
 *
 * ⛔ **FLAG-ONLY, NEVER AUTO-FIX.** Both states below are legal states that his
 * own rulings created, and neither is repaired here:
 *
 *  1. A damages-scope record whose party carries no Client or Plaintiff role on
 *     the case — the ORPHAN that `R5(i)` made lawful. Asked what happens to the
 *     damages scope when a link is removed, he answered *"Nothing happens to
 *     the damages scope"*: unlink is a roster act only and the record PERSISTS.
 *     So this state is expected, not an error, and the flag says so.
 *  2. A Client-role party with no damages record — the GAP `R5(iii)` chose to
 *     flag rather than backfill: *"new links only, flag the gaps"*, and, on the
 *     precedent he read on screen, *"Not guessed and not placeholdered."*
 *
 * `SD-19`: state 2 is also `R5(iii)`'s own gap flag, and it renders in the
 * EXISTING CL-2 backfill-flag shape rather than in a new card of its own.
 *
 * `SD-18` names both strings, PROVISIONAL, for Michael's eye before any real
 * record.
 */

import type { CasePartyLink, CaseRecord, PartyRecord } from './types';
import type { CaseClient, ClientPosture } from './client';

/** The two roles that make somebody a client on a case. `case_parties` stays
 *  authoritative for ROLES (D-CL2-8); this reads it and never writes it. */
const CLIENT_ROLES = ['Client', 'Plaintiff'];

export type ClientCheckKind = 'orphan-damages-record' | 'client-role-no-record';

export interface ClientCheckFlag {
  kind: ClientCheckKind;
  /** The party the line is about, so the surface can link to it. */
  partyId: string;
  text: string;
}

/**
 * Both states, computed from records and nothing else.
 *
 * Returns an empty list on the ordinary case, which is the point: a line that
 * fires on every matter "just teaches him to ignore warnings" (§11.5).
 */
export function clientConsistencyFlags(
  clients: CaseClient[],
  links: CasePartyLink[],
  parties: Record<string, PartyRecord | undefined>,
): ClientCheckFlag[] {
  const name = (partyId: string) => parties[partyId]?.displayName ?? 'A contact';

  const clientRoleParties = new Set(
    links.filter((l) => CLIENT_ROLES.includes(l.role)).map((l) => l.partyId),
  );
  const withRecord = new Set(clients.map((c) => c.partyId));

  const out: ClientCheckFlag[] = [];

  // State 1 — the orphan. `SD-18`, first line.
  for (const c of clients) {
    if (clientRoleParties.has(c.partyId)) continue;
    out.push({
      kind: 'orphan-damages-record',
      partyId: c.partyId,
      text: `${name(c.partyId)} has a damages record but no Client role on this case.`,
    });
  }

  // State 2 — the gap, which is also `R5(iii)`'s flag. `SD-18`, second line.
  // Deduplicated by party: two links carrying Client and Plaintiff for the same
  // person is one gap, not two.
  const seen = new Set<string>();
  for (const l of links) {
    if (!CLIENT_ROLES.includes(l.role)) continue;
    if (withRecord.has(l.partyId) || seen.has(l.partyId)) continue;
    seen.add(l.partyId);
    out.push({
      kind: 'client-role-no-record',
      partyId: l.partyId,
      text: `${name(l.partyId)} is linked as Client but has no damages record — open the damages scope card to add one.`,
    });
  }

  return out;
}

/**
 * `R5` (`CL2-AC-1`) — the auto-create, and its two refusals.
 *
 * Michael walked this by his own hand on 2026-09-05 — unlinking and re-linking
 * the Garcia client in demo and reading the CL-2 backfill flag on 26-0003 — and
 * ruled the three held edges:
 *
 *  - **(i) Link removal: *"Nothing happens to the damages scope"*.** The record
 *    PERSISTS; unlink is a roster act only. (Claude's recommendation was
 *    DECLINED, which is why nothing in the unlink path touches `case_clients`.)
 *  - **(ii) Posture: *"Default from practice area, editable"*.** Criminal →
 *    defendant, everything else → claimant, and correctable on the row's Edit.
 *    `mixed` stays unoffered.
 *  - **(iii) Existing gaps: *"new links only, flag the gaps"*.** **NO
 *    retroactive create.** A Client-role link that already exists with no
 *    damages record gets a FLAG (`clientConsistencyFlags`, state 2) and waits
 *    for his hand — *"Not guessed and not placeholdered."*
 *
 * Scope unchanged: PI only, on a Client role, UI workflow only; the data model
 * stays parallel (D-CL2-8).
 */
export function shouldAutoCreateClient(
  caseRec: Pick<CaseRecord, 'practiceArea'>,
  role: string,
  partyId: string,
  existing: CaseClient[],
): boolean {
  if (caseRec.practiceArea !== 'Personal Injury') return false;
  // The ROLE the link is created with. `Plaintiff` is deliberately NOT here:
  // the ruling is about the Client role, and widening it would auto-create a
  // damages record for every plaintiff on a case where our client is one of
  // several — which is the guessing R5(iii) refused.
  if (role !== 'Client') return false;
  return !existing.some((c) => c.partyId === partyId);
}

/** `R5(ii)` — the posture default, from the PRACTICE AREA and nothing else.
 *  The same expression the hand path already used, lifted here so the auto path
 *  and the hand path cannot drift. Editable on the row afterwards. */
export function defaultPosture(caseRec: Pick<CaseRecord, 'practiceArea'>): ClientPosture {
  return caseRec.practiceArea === 'Criminal' ? 'defendant' : 'claimant';
}
