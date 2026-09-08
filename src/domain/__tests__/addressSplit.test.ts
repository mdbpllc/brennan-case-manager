/**
 * THE ADDRESS MODEL — the split rule, the marks, and the ids.
 *
 * The slice's §7 items 16 and part of 22. Michael ruled the rule's SHAPE on
 * 2026-09-07 (`D1(iii)`, ***"1"***), and §5.3 states it once so the TypeScript
 * step and the SQL data migration can be tested against the same three cases.
 * These are those three cases.
 */

import { describe, it, expect } from 'vitest';
import {
  applySplit, ensureLocationId, isUnconfirmedSplit, markHand, needsSplit,
  normaliseLocations, resolveLocation, splitAddress, splitMark,
} from '../addressSplit';

describe('§5.3 — the split rule, pinned on its three stated cases', () => {
  it('a suite stays with the street; the last two comma parts are the city line', () => {
    expect(splitAddress('400 Tourmaline Way, Suite 210, Rockvale, TX 78200')).toEqual({
      addressLine1: '400 Tourmaline Way, Suite 210',
      cityStateZip: 'Rockvale, TX 78200',
      mark: 'rule',
    });
  });

  it('three parts split two-and-one, ZIP or no ZIP', () => {
    expect(splitAddress('3100 S 31st St, Temple, TX')).toEqual({
      addressLine1: '3100 S 31st St',
      cityStateZip: 'Temple, TX',
      mark: 'rule',
    });
  });

  it('FEWER than three parts is `rule-unsplit`: the whole value, nothing invented', () => {
    const out = splitAddress('3100 S 31st St, Temple TX 76502');
    expect(out.mark).toBe('rule-unsplit');
    expect(out.addressLine1).toBe('3100 S 31st St, Temple TX 76502');
    expect(out.cityStateZip).toBe('');
  });

  it('trims, and empty comma pieces do not manufacture a third part', () => {
    // "A,, B" is TWO parts. Counting the empty piece would split an address the
    // rule was written to decline, which is the difference between a marked
    // guess and a silent wrong answer.
    expect(splitAddress('  12 Pyrite Lane ,, Rockvale TX  ').mark).toBe('rule-unsplit');
  });

  it('an empty value is rule-unsplit and yields two empty lines', () => {
    expect(splitAddress('   ')).toEqual({ addressLine1: '', cityStateZip: '', mark: 'rule-unsplit' });
  });
});

describe('applySplit — what it touches and what it refuses to touch', () => {
  it('splits a record carrying only the one-line value, and marks it', () => {
    const out = applySplit<Record<string, unknown>>({ address: '900 Halite Blvd, Rockvale, TX 70003' });
    expect(out.addressLine1).toBe('900 Halite Blvd');
    expect(out.cityStateZip).toBe('Rockvale, TX 70003');
    expect(splitMark(out)).toBe('rule');
  });

  it('NEVER deletes the one-line value — SD-5, and the slice\'s DO-NOT in terms', () => {
    const before = { address: '900 Halite Blvd, Rockvale, TX 70003' };
    expect(applySplit(before).address).toBe(before.address);
  });

  it('is IDEMPOTENT: a second pass finds nothing and changes nothing', () => {
    const once = applySplit({ address: '900 Halite Blvd, Rockvale, TX 70003' });
    const twice = applySplit(once);
    expect(twice).toBe(once); // the same object, not merely an equal one
    expect(needsSplit(once)).toBe(false);
  });

  it('leaves a record that already has a street line alone', () => {
    const rec = { address: 'legacy, value, here', addressLine1: 'typed by hand' };
    expect(applySplit(rec)).toBe(rec);
  });

  it('a hand mark survives — his touch is never overwritten by a re-run', () => {
    const handed = markHand(applySplit({ address: 'a, b, c' }));
    expect(splitMark(handed)).toBe('hand');
    expect(splitMark(applySplit(handed))).toBe('hand');
    expect(isUnconfirmedSplit(handed)).toBe(false);
  });

  it('only a machine split is UNCONFIRMED — that is what the notice keys on', () => {
    expect(isUnconfirmedSplit(applySplit({ address: 'a, b, c' }))).toBe(true);
    expect(isUnconfirmedSplit(applySplit({ address: 'a, b' }))).toBe(true);
    expect(isUnconfirmedSplit({ addressLine1: 'typed by hand' })).toBe(false);
    expect(isUnconfirmedSplit(undefined)).toBe(false);
  });
});

describe('SD-4 — location ids are stable', () => {
  it('assigns one where there is none and keeps one that exists', () => {
    const fresh = ensureLocationId({});
    expect(typeof fresh.id).toBe('string');
    expect((fresh.id as string).length).toBeGreaterThan(0);
    const kept = { id: 'l-keep', label: 'South' };
    expect(ensureLocationId(kept)).toBe(kept);
  });

  it('normaliseLocations gives every item an id AND splits what needs it', () => {
    const out = normaliseLocations([
      { label: 'Killeen', address: '2200 S WS Young Dr, Killeen, TX' },
      { id: 'l2', label: 'Temple', addressLine1: '810 W Adams Ave', cityStateZip: 'Temple, TX' },
    ]);
    expect(out).toHaveLength(2);
    expect(out.every((l) => typeof l.id === 'string' && l.id !== '')).toBe(true);
    expect(out[0].addressLine1).toBe('2200 S WS Young Dr');
    expect(out[0].cityStateZip).toBe('Killeen, TX');
    expect(splitMark(out[0])).toBe('rule');
    // The already-split one is untouched, mark and all.
    expect(out[1].id).toBe('l2');
    expect(splitMark(out[1])).toBeUndefined();
  });

  it('two ids assigned in the same pass are distinct', () => {
    const out = normaliseLocations([{ label: 'A' }, { label: 'B' }]);
    expect(out[0].id).not.toBe(out[1].id);
  });
});

describe('resolveLocation — SD-8 and SD-10, the two NULL cases', () => {
  const one = [{ id: 'l1', label: 'Main' }];
  const two = [{ id: 'l1', label: 'Main' }, { id: 'l2', label: 'South' }];

  it('SD-8 — a facility with exactly ONE location resolves without a pick', () => {
    expect(resolveLocation(one, undefined)).toBe(one[0]);
  });

  it('SD-10 — two or more with none picked resolves to NOTHING (a panel line)', () => {
    expect(resolveLocation(two, undefined)).toBeUndefined();
  });

  it('a pick names the picked one, whatever its position', () => {
    expect(resolveLocation(two, 'l2')).toBe(two[1]);
  });

  it('a pick naming a location that is gone resolves to nothing, never to a neighbour', () => {
    // A campus can be removed from the contact record between cases. Falling
    // back to "the first one" would put the wrong street in a served block.
    expect(resolveLocation(two, 'l-removed')).toBeUndefined();
  });

  it('no locations at all resolves to nothing — §17.6, the block ends at the name', () => {
    expect(resolveLocation([], undefined)).toBeUndefined();
    expect(resolveLocation(undefined, 'l1')).toBeUndefined();
  });
});
