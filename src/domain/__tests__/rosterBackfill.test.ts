import { describe, it, expect } from 'vitest';
import { backfillRoleTags, backfillRosterAttributes, summarizeBackfill } from '../rosterBackfill';
import type { CaseRole } from '../types';

const mva = { practiceArea: 'Personal Injury', caseType: 'Motor vehicle collision' } as const;
const felony = { practiceArea: 'Criminal', caseType: 'Felony' } as const;

describe('directory backfill — partyType becomes tag zero', () => {
  it('seeds the tag list from the existing single type', () => {
    expect(backfillRoleTags({ partyType: 'attorney', roleTags: [] })).toEqual(['attorney']);
  });

  it('never disturbs tags that already exist', () => {
    expect(backfillRoleTags({ partyType: 'attorney', roleTags: ['expert', 'attorney'] }))
      .toEqual(['expert', 'attorney']);
  });
});

describe('roster backfill — mechanical where mechanical, flagged everywhere else', () => {
  it('carries the existing role verbatim as storyRole, losslessly', () => {
    const { patch } = backfillRosterAttributes({ role: 'Treating provider' }, mva);
    expect(patch.storyRole).toBe('Treating provider');
  });

  it('applies the §4.3 defaults so nothing extra is typed', () => {
    const { patch } = backfillRosterAttributes({ role: 'Plaintiff' }, mva);
    expect(patch.joinedBy).toBe('intake-slot');
    expect(patch.activeState).toBe('active');
  });

  it('maps Plaintiff and Defendant mechanically on a civil caption', () => {
    const p = backfillRosterAttributes({ role: 'Plaintiff' }, mva);
    expect(p.patch.captionAlignment).toBe('Plaintiff');
    expect(p.patch.partyStatus).toBe('caption-party');
    expect(p.flag).toBeUndefined();

    const d = backfillRosterAttributes({ role: 'Defendant' }, mva);
    expect(d.patch.captionAlignment).toBe('Defendant');
    expect(d.flag).toBeUndefined();
  });

  it('FLAGS rather than forces when the role names a position the side set lacks', () => {
    // A 'Defendant' link on a felony: the side set is State/Accused. The
    // nearest-looking value would be 'Accused', and inventing it is the defect.
    const { patch, flag } = backfillRosterAttributes({ role: 'Defendant' }, felony);
    expect(patch.captionAlignment).toBeUndefined();
    expect(flag).toBeDefined();
    expect(flag!.unmappedValue).toBe('Defendant');
    expect(flag!.reason).toMatch(/State \/ Accused/);
  });

  it('maps function roles to null — not in the caption, derivable from the side sets', () => {
    for (const role of ['Witness', 'Treating provider', 'Judge assigned', 'Opposing counsel'] as CaseRole[]) {
      const { patch, flag } = backfillRosterAttributes({ role }, mva);
      expect(patch.captionAlignment).toBeNull();
      expect(flag).toBeUndefined();
    }
  });

  it('leaves partyStatus unset for function roles rather than guessing among five options', () => {
    const { patch } = backfillRosterAttributes({ role: 'Judge assigned' }, mva);
    expect(patch.partyStatus).toBeUndefined();
  });

  it('FLAGS Client, because our client is Plaintiff on a civil caption and Accused on a criminal one', () => {
    const civil = backfillRosterAttributes({ role: 'Client' }, mva);
    expect(civil.patch.captionAlignment).toBeUndefined();
    expect(civil.flag).toBeDefined();

    const crim = backfillRosterAttributes({ role: 'Client' }, felony);
    expect(crim.flag).toBeDefined();
  });

  it('FLAGS Other', () => {
    expect(backfillRosterAttributes({ role: 'Other' }, mva).flag).toBeDefined();
  });

  it('still patches a flagged link — a flag is an addition, not an abort', () => {
    const { patch, flag } = backfillRosterAttributes({ role: 'Client' }, mva);
    expect(flag).toBeDefined();
    expect(patch.storyRole).toBe('Client');
    expect(patch.activeState).toBe('active');
  });

  it('never overwrites an alignment already set, including a deliberate null', () => {
    expect(backfillRosterAttributes({ role: 'Client', captionAlignment: null }, mva).flag).toBeUndefined();
    expect(backfillRosterAttributes({ role: 'Plaintiff', captionAlignment: 'Defendant' }, mva).patch.captionAlignment)
      .toBeUndefined();
  });

  it('summarizes derived versus flagged for the migration report', () => {
    const results = [
      backfillRosterAttributes({ role: 'Plaintiff' }, mva),
      backfillRosterAttributes({ role: 'Defendant' }, mva),
      backfillRosterAttributes({ role: 'Witness' }, mva),
      backfillRosterAttributes({ role: 'Client' }, mva),
    ];
    expect(summarizeBackfill(results)).toEqual({
      linksProcessed: 4, alignmentsDerived: 2, nonPartiesDerived: 1, flagged: 1,
    });
  });
});
