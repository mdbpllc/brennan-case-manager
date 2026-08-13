import { describe, it, expect } from 'vitest';
import {
  sideSetFor, isAlignmentValid, resolveRosterSlots, sortSlots, hasSeededRoster,
  validateCapacity, capacityPointsAtContact, isActiveOnRoster,
  DEFAULT_JOINED_BY, DEFAULT_ACTIVE_STATE, SIDE_SETS,
} from '../roster';

describe('side sets — REQ-14: sides are a property of the case type, not a constant', () => {
  it('gives civil captions plaintiff/defendant', () => {
    expect(sideSetFor('Personal Injury', 'Motor vehicle collision').alignments).toEqual(['Plaintiff', 'Defendant']);
    expect(sideSetFor('General Civil Litigation', 'DTPA').alignments).toEqual(['Plaintiff', 'Defendant']);
  });

  it('inverts the criminal caption to State/Accused', () => {
    expect(sideSetFor('Criminal', 'Felony').alignments).toEqual(['State', 'Accused']);
    expect(sideSetFor('Criminal', 'Misdemeanor').alignments).toEqual(['State', 'Accused']);
  });

  it('gives ex parte relief types a petitioner and NO adversary', () => {
    for (const t of ['Expunction', 'Order for non-disclosure', 'Motion for judicial clemency']) {
      expect(sideSetFor('Criminal', t).alignments).toEqual(['Petitioner']);
    }
  });

  it('keeps the stakeholder/claimants set defined but unassigned — vocabulary is not a consumer', () => {
    expect(SIDE_SETS['stakeholder-claimants'].alignments).toEqual(['Stakeholder', 'Claimant']);
  });

  it('rejects an alignment the case type does not define, and always allows non-party null', () => {
    expect(isAlignmentValid('Criminal', 'Felony', 'Defendant')).toBe(false);
    expect(isAlignmentValid('Criminal', 'Felony', 'Accused')).toBe(true);
    expect(isAlignmentValid('Personal Injury', 'Premises', 'Defendant')).toBe(true);
    expect(isAlignmentValid('Criminal', 'Felony', null)).toBe(true);
  });
});

describe('roster slot resolution — inheritance and overlays', () => {
  it('seeds the MVA baseline pair (REQ-01) as expected slots', () => {
    const slots = resolveRosterSlots('Personal Injury', 'Motor vehicle collision');
    const expected = slots.filter((s) => s.expectancy === 'expected').map((s) => s.role);
    expect(expected).toEqual(['Injured person', 'Adverse driver']);
  });

  it('layers the trucking overlay onto MVA without touching the case-type tree (REQ-03)', () => {
    const base = resolveRosterSlots('Personal Injury', 'Motor vehicle collision');
    const withTrucking = resolveRosterSlots('Personal Injury', 'Motor vehicle collision', ['Trucking/commercial vehicle']);
    expect(withTrucking.length).toBeGreaterThan(base.length);
    expect(withTrucking.map((s) => s.role)).toContain('Motor carrier (employer)');
    expect(withTrucking.find((s) => s.role === 'Motor carrier (employer)')?.source).toEqual({
      kind: 'overlay', flag: 'Trucking/commercial vehicle',
    });
  });

  it('carries the UIM inversion: the at-fault driver is EXPECTED and has no alignment (REQ-05)', () => {
    const slots = resolveRosterSlots('Personal Injury', 'Motor vehicle collision', ['UM/UIM (first-party)']);
    const atFault = slots.find((s) => s.role === 'At-fault driver (non-party)');
    expect(atFault).toBeDefined();
    expect(atFault!.expectancy).toBe('expected');
    expect(atFault!.alignmentHint).toBeNull();
    expect(atFault!.statusHint).toBe('non-party-actor');
  });

  it('inherits the criminal practice-area slot and adds the State only on adversarial types (REQ-09)', () => {
    const felony = resolveRosterSlots('Criminal', 'Felony').map((s) => s.role);
    expect(felony).toContain('Accused / petitioner (client)');
    expect(felony).toContain('State of Texas');

    const expunction = resolveRosterSlots('Criminal', 'Expunction').map((s) => s.role);
    expect(expunction).toContain('Accused / petitioner (client)');
    expect(expunction).not.toContain('State of Texas');
  });

  it('marks TTCA employee joinder rare-with-procedure, per the attorney practice note', () => {
    const slots = resolveRosterSlots('Personal Injury', 'TTCA — Motor Vehicle');
    expect(slots.find((s) => s.role === 'Governmental unit')?.expectancy).toBe('expected');
    expect(slots.find((s) => s.role === 'Individual employee (joined)')?.expectancy).toBe('rare-with-procedure');
  });

  it('stacks premises entities rather than offering one "the defendant" slot (REQ-04)', () => {
    const roles = resolveRosterSlots('Personal Injury', 'Premises').map((s) => s.role);
    expect(roles).toEqual(expect.arrayContaining([
      'Operator entity', 'Property-owner entity', 'Management / realty company',
    ]));
  });

  it('is additive: a duplicate role from a later source does not override the earlier one', () => {
    const slots = resolveRosterSlots('Criminal', 'Felony');
    const accused = slots.filter((s) => s.role === 'Accused / petitioner (client)');
    expect(accused).toHaveLength(1);
    expect(accused[0].source.kind).toBe('practice-area');
  });

  it('reports honestly that an unseeded case type has no roster', () => {
    expect(hasSeededRoster('General Civil Litigation', 'Bailment')).toBe(false);
    expect(hasSeededRoster('Personal Injury', 'Premises')).toBe(true);
  });

  it('sorts expected slots before optional before rare', () => {
    const sorted = sortSlots(resolveRosterSlots('Personal Injury', 'Premises'));
    const tiers = sorted.map((s) => s.expectancy);
    expect(tiers).toEqual([...tiers].sort((a, b) => (
      ['expected', 'optional', 'rare-with-procedure'].indexOf(a)
      - ['expected', 'optional', 'rare-with-procedure'].indexOf(b)
    )));
  });
});

describe('capacity — a property of the link, never the directory (§3.1)', () => {
  it('knows which kinds point at another person', () => {
    expect(capacityPointsAtContact('next-friend-of')).toBe(true);
    expect(capacityPointsAtContact('representative-of-estate-of')).toBe(true);
    expect(capacityPointsAtContact('individually')).toBe(false);
    expect(capacityPointsAtContact('dba')).toBe(false);
  });

  it('advises when a pointing capacity has nobody to point at', () => {
    expect(validateCapacity({ kind: 'next-friend-of' })).toMatch(/needs the person/);
    expect(validateCapacity({ kind: 'next-friend-of', pointsAtContactId: 'minor-1' })).toBeNull();
  });

  it('advises when a non-pointing capacity carries a stray reference', () => {
    expect(validateCapacity({ kind: 'individually', pointsAtContactId: 'x' })).toMatch(/does not point/);
    expect(validateCapacity({ kind: 'individually' })).toBeNull();
  });
});

describe('roster history defaults (§4.3)', () => {
  it('is born intake + active so nothing extra is typed', () => {
    expect(DEFAULT_JOINED_BY).toBe('intake-slot');
    expect(DEFAULT_ACTIVE_STATE).toBe('active');
    expect(isActiveOnRoster('active')).toBe(true);
    expect(isActiveOnRoster('substituted-out')).toBe(false);
    expect(isActiveOnRoster('withdrawn')).toBe(false);
  });
});
