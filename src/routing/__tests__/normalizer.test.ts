import { describe, expect, it } from 'vitest';
import { canonicalId, extractIdentifierRuns, matchIdentifiers, matchPhones } from '../normalizer';

describe('extractIdentifierRuns', () => {
  it('converts spoken digit words into a run', () => {
    expect(extractIdentifierRuns('cause number twenty six c r zero one four five two'))
      .toContain('26CR01452');
  });

  it('handles the pilot-style year form ("twenty twenty five")', () => {
    expect(extractIdentifierRuns('twenty twenty five c i zero four nine six two'))
      .toContain('2025CI04962');
  });

  it('merges tens+units ("forty five") and keeps literal digits', () => {
    expect(extractIdentifierRuns('claim forty five 12 dash 88')).toContain('451288');
  });

  it('handles "double" digits and oh-for-zero', () => {
    expect(extractIdentifierRuns('extension two double five oh')).toContain('2550');
  });

  it('does not swallow ordinary prose into runs', () => {
    const runs = extractIdentifierRuns('we will talk to the adjuster on thursday about it');
    expect(runs).toEqual([]);
  });
});

describe('matchIdentifiers', () => {
  const known = ['26-CR-01452', '2025-CI-08841'];

  it('matches a perfectly spoken cause number', () => {
    const m = matchIdentifiers('note to file on cause number twenty six c r zero one four five two', known);
    expect(m).toHaveLength(1);
    expect(m[0].known).toBe('26-CR-01452');
    expect(m[0].distance).toBe(0);
  });

  it('matches with one garbled digit (edit distance 1)', () => {
    const m = matchIdentifiers('cause number twenty six c r zero one four five one', known);
    expect(m.map((x) => x.known)).toContain('26-CR-01452');
  });

  it('rejects wholly different numbers', () => {
    const m = matchIdentifiers('cause number ninety nine x y eight eight eight eight eight', known);
    expect(m).toEqual([]);
  });

  it('never needs the number perfectly — only within the fuzzy budget of a short known list', () => {
    // 2025CI08841 spoken with two digit errors on a long identifier still lands.
    const m = matchIdentifiers('twenty twenty five c i zero eight eight five two', ['2025-CI-08841']);
    expect(m.map((x) => x.known)).toContain('2025-CI-08841');
  });
});

describe('matchPhones', () => {
  it('matches a spoken ten-digit number with extension noise around it', () => {
    const m = matchPhones(
      'reach me direct at eight zero zero five five five zero one seven seven extension two one four',
      ['8005550177x214', '2545550143'],
    );
    expect(m.map((x) => x.known)).toContain('8005550177x214');
  });

  it('ignores short digit runs', () => {
    expect(matchPhones('call me at five five five', ['2545550143'])).toEqual([]);
  });
});

describe('canonicalId', () => {
  it('strips separators and uppercases', () => {
    expect(canonicalId('26-cr-01452')).toBe('26CR01452');
  });
});
