/**
 * `R5` and `R6` — the client-dimension rulings of 2026-09-05, walked by
 * Michael's own hand in demo before he ruled them.
 *
 * The slice's §7 items 5 and 6.
 */

import { describe, it, expect } from 'vitest';
import {
  clientConsistencyFlags, defaultPosture, shouldAutoCreateClient,
} from '../clientChecks';
import type { CaseClient } from '../client';
import type { CasePartyLink, CaseRecord, PartyRecord } from '../types';

const T = '2026-09-05T00:00:00.000Z';

const pi = { practiceArea: 'Personal Injury' } as Pick<CaseRecord, 'practiceArea'>;
const criminal = { practiceArea: 'Criminal' } as Pick<CaseRecord, 'practiceArea'>;
const civil = { practiceArea: 'General Civil Litigation' } as Pick<CaseRecord, 'practiceArea'>;

function link(partyId: string, role: string): CasePartyLink {
  return { id: `l-${partyId}-${role}`, caseId: 'c1', partyId, role, createdAt: T } as CasePartyLink;
}

function client(partyId: string): CaseClient {
  return {
    id: `cc-${partyId}`, caseId: 'c1', partyId, posture: 'claimant', displayOrder: 0,
    clientFlags: [], feeArrangement: {}, profileFields: {}, createdAt: T, updatedAt: T,
  };
}

const parties: Record<string, PartyRecord | undefined> = {
  p1: { id: 'p1', displayName: 'Alba Quartzmoor' } as PartyRecord,
  p2: { id: 'p2', displayName: 'Ozias Quartzmoor' } as PartyRecord,
};

// ------------------------------------------------------------------- R5

describe('R5 — CL2-AC-1: auto-create on a NEW PI Client-role link, and nothing else', () => {
  it('(ii) the posture defaults from the PRACTICE AREA', () => {
    // *"Default from practice area, editable"*. `mixed` stays unoffered.
    expect(defaultPosture(criminal)).toBe('defendant');
    expect(defaultPosture(pi)).toBe('claimant');
    expect(defaultPosture(civil)).toBe('claimant');
  });

  it('fires for a PI Client-role link with no record yet', () => {
    expect(shouldAutoCreateClient(pi, 'Client', 'p1', [])).toBe(true);
  });

  it('does NOT fire outside PI — the scope is unchanged', () => {
    expect(shouldAutoCreateClient(criminal, 'Client', 'p1', [])).toBe(false);
    expect(shouldAutoCreateClient(civil, 'Client', 'p1', [])).toBe(false);
  });

  it('does NOT fire on a Plaintiff link — the ruling is about the Client role', () => {
    // Widening it would create a damages record for every plaintiff on a case
    // where our client is one of several, which is the guessing R5(iii) refused.
    expect(shouldAutoCreateClient(pi, 'Plaintiff', 'p1', [])).toBe(false);
    expect(shouldAutoCreateClient(pi, 'Defendant', 'p1', [])).toBe(false);
  });

  it('does NOT fire when a record already exists — re-linking creates no second one', () => {
    // The state Michael walked: he unlinked and re-linked the Garcia client.
    // Under R5(i) the record persisted through the unlink, so the re-link must
    // not add a duplicate beside it.
    expect(shouldAutoCreateClient(pi, 'Client', 'p1', [client('p1')])).toBe(false);
  });

  it('(iii) NO retroactive create — an existing gap is a FLAG and nothing more', () => {
    // *"new links only, flag the gaps"* → *"Not guessed and not placeholdered."*
    // The function that would create is not even asked; what the gap gets is
    // the flag below.
    const flags = clientConsistencyFlags([], [link('p1', 'Client')], parties);
    expect(flags).toHaveLength(1);
    expect(flags[0].kind).toBe('client-role-no-record');
  });
});

// ------------------------------------------------------------------- R6

describe('R6 — CL2-CHECK-1: FLAG-ONLY, on the two states his rulings created', () => {
  it('the ordinary case is SILENT', () => {
    // A line that fires on every matter "just teaches him to ignore warnings".
    expect(clientConsistencyFlags([client('p1')], [link('p1', 'Client')], parties)).toEqual([]);
  });

  it('state 1 — a damages record whose party has no Client/Plaintiff role', () => {
    // The ORPHAN R5(i) made lawful: *"Nothing happens to the damages scope"*.
    const flags = clientConsistencyFlags([client('p1')], [link('p1', 'Witness')], parties);
    expect(flags).toHaveLength(1);
    expect(flags[0].kind).toBe('orphan-damages-record');
    expect(flags[0].text).toBe('Alba Quartzmoor has a damages record but no Client role on this case.');
  });

  it('state 1 also fires when the party is not linked to the case at all', () => {
    expect(clientConsistencyFlags([client('p1')], [], parties)[0].kind)
      .toBe('orphan-damages-record');
  });

  it('state 2 — a Client-role party with no damages record', () => {
    const flags = clientConsistencyFlags([], [link('p2', 'Client')], parties);
    expect(flags).toHaveLength(1);
    expect(flags[0].text)
      .toBe('Ozias Quartzmoor is linked as Client but has no damages record — open the damages scope card to add one.');
  });

  it('a Plaintiff role counts as a client role for state 2', () => {
    expect(clientConsistencyFlags([], [link('p1', 'Plaintiff')], parties)).toHaveLength(1);
  });

  it('one person carrying TWO client-ish roles is ONE gap, not two', () => {
    const flags = clientConsistencyFlags(
      [], [link('p1', 'Client'), link('p1', 'Plaintiff')], parties,
    );
    expect(flags).toHaveLength(1);
  });

  it('reports BOTH states at once when both hold', () => {
    const flags = clientConsistencyFlags(
      [client('p1')], [link('p1', 'Witness'), link('p2', 'Client')], parties,
    );
    expect(flags.map((f) => f.kind).sort())
      .toEqual(['client-role-no-record', 'orphan-damages-record']);
  });

  it('names an unknown party without inventing one', () => {
    expect(clientConsistencyFlags([client('p9')], [], parties)[0].text)
      .toContain('A contact has a damages record');
  });
});
