// The provider type vocabulary — D-45's three tested constants.
//
// These keys are STORED DATA: a CHECK constraint, a TypeScript union and a
// picker all read them. A silent change here re-keys rows that a served
// designation points at, so the whole vocabulary is pinned literally.

import { describe, it, expect } from 'vitest';
import {
  PROVIDER_TYPES, PROVIDER_TYPE_KEYS, TREATING_TYPES, FIXED_PAIR_TYPES,
  EXTRACTED_TYPES, FACILITY_TYPE_KEYS, ROLE_MARKER_KEYS, ENGINE_EFFECT_MARKERS,
  effectiveMarker, providerTypeLabel, markerIsDisplayOnly, isTreatingType,
} from '../providerTypes';
import { FIXED_SENTENCE_TYPES } from '../fixedSentences';

describe('the fifteen provider types (AS-Q5 added three to §11.8\'s twelve)', () => {
  it('is exactly these keys, in this order', () => {
    expect(PROVIDER_TYPE_KEYS).toEqual([
      'emergency-medicine', 'pain-management', 'orthopedic-surgery', 'neurosurgery',
      'primary-care', 'chiropractic', 'physical-therapy', 'prehospital-ems',
      'radiologist', 'pharmacy', 'custodian-only', 'mid-level',
      'mental-health', 'other-physician', 'other-non-physician',
    ]);
    expect(PROVIDER_TYPES).toHaveLength(15);
  });

  it('labels the three AS-Q5 additions as the ruling words them', () => {
    expect(providerTypeLabel('mental-health')).toBe('mental health');
    expect(providerTypeLabel('other-physician')).toBe('other physician (MD/DO)');
    expect(providerTypeLabel('other-non-physician')).toBe('other licensed non-physician provider');
  });

  it('has no duplicate keys and labels every one', () => {
    expect(new Set(PROVIDER_TYPE_KEYS).size).toBe(PROVIDER_TYPE_KEYS.length);
    for (const key of PROVIDER_TYPE_KEYS) expect(providerTypeLabel(key)).not.toBe('');
  });
});

describe('the three sets D-45 names', () => {
  it('TREATING_TYPES — the ten whose paragraph designates persons', () => {
    expect(TREATING_TYPES).toEqual([
      'emergency-medicine', 'pain-management', 'orthopedic-surgery', 'neurosurgery',
      'primary-care', 'chiropractic', 'physical-therapy', 'prehospital-ems',
      'other-physician', 'other-non-physician',
    ]);
  });

  // AS-Q5: other-non-physician gets no fixed causation line — "degrade, don't
  // invent" — so it is treating but not fixed-pair.
  it('FIXED_PAIR_TYPES — TREATING_TYPES minus other-non-physician', () => {
    expect(FIXED_PAIR_TYPES).toEqual(TREATING_TYPES.filter((t) => t !== 'other-non-physician'));
    expect(FIXED_PAIR_TYPES).toHaveLength(9);
    expect(FIXED_PAIR_TYPES).not.toContain('other-non-physician');
    expect(FIXED_PAIR_TYPES).not.toContain('radiologist');
  });

  it('EXTRACTED_TYPES — TREATING_TYPES plus radiologist and mental-health', () => {
    expect(EXTRACTED_TYPES).toEqual([...TREATING_TYPES, 'radiologist', 'mental-health']);
    // D-46: never a pharmacy, never a custodian-only facility.
    expect(EXTRACTED_TYPES).not.toContain('pharmacy');
    expect(EXTRACTED_TYPES).not.toContain('custodian-only');
  });

  // The two tables are built from different rulings and must stay reconciled:
  // the fixed-sentence table holds a pair for every FIXED_PAIR_TYPE and for
  // `radiologist`, which owns §9.2's pair without being a treating type.
  it('reconciles with the fixed-sentence table: FIXED_PAIR_TYPES plus radiologist', () => {
    expect([...FIXED_SENTENCE_TYPES].sort())
      .toEqual([...FIXED_PAIR_TYPES, 'radiologist'].sort());
  });
});

describe('what a facility may be typed, and what a person may be marked', () => {
  it('a facility takes every value but mid-level', () => {
    expect(FACILITY_TYPE_KEYS).toHaveLength(14);
    expect(FACILITY_TYPE_KEYS).not.toContain('mid-level');
  });

  it('a role marker takes every value but pharmacy and custodian-only', () => {
    expect(ROLE_MARKER_KEYS).toHaveLength(13);
    expect(ROLE_MARKER_KEYS).not.toContain('pharmacy');
    expect(ROLE_MARKER_KEYS).not.toContain('custodian-only');
    expect(ROLE_MARKER_KEYS).toContain('mid-level');
  });

  it('marks only the three with ruled engine effects as more than display', () => {
    expect(ENGINE_EFFECT_MARKERS).toEqual(['radiologist', 'mid-level', 'mental-health']);
    expect(markerIsDisplayOnly('chiropractic')).toBe(true);
    expect(markerIsDisplayOnly('radiologist')).toBe(false);
    expect(markerIsDisplayOnly('mid-level')).toBe(false);
    expect(markerIsDisplayOnly('mental-health')).toBe(false);
  });
});

describe('the effective marker — coalesce(role_marker, facility type)', () => {
  it('reads a NULL marker as the facility\'s own type (§17.1a)', () => {
    expect(effectiveMarker(null, 'emergency-medicine')).toBe('emergency-medicine');
    expect(effectiveMarker(undefined, 'chiropractic')).toBe('chiropractic');
  });

  it('lets a hand-set marker win over the facility type', () => {
    expect(effectiveMarker('radiologist', 'emergency-medicine')).toBe('radiologist');
    expect(effectiveMarker('mid-level', 'chiropractic')).toBe('mid-level');
  });

  it('is null when neither is set — the must-fix condition', () => {
    expect(effectiveMarker(null, null)).toBeNull();
  });

  it('recognises a treating type, and does not mistake a non-treating one', () => {
    expect(isTreatingType('emergency-medicine')).toBe(true);
    expect(isTreatingType('other-non-physician')).toBe(true);
    expect(isTreatingType('radiologist')).toBe(false);
    expect(isTreatingType('pharmacy')).toBe(false);
    expect(isTreatingType(null)).toBe(false);
  });
});
