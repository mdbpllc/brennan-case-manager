import { describe, expect, it } from 'vitest';
import { buildHashIndex, chapterRefForSnapshotRef, diffSnapshots, snapshotTargetsForRule } from '../tripwire';
import type { RegistryVerificationSnapshot, StatuteSection, WatchFlag } from '../../domain/statutes';

function section(code: string, chapter: string, num: string, hash: string): StatuteSection {
  return {
    id: `s-${code}-${num}`, chapterId: `ch-${code}-${chapter}`, code, chapter,
    sectionNumber: num, text: 'text', contentHash: hash,
  };
}

function snap(ruleId: string, ref: string, hash: string): RegistryVerificationSnapshot {
  return { id: `snap-${ruleId}-${ref}`, ruleId, sectionRef: ref, contentHash: hash, verifiedAt: '2026-07-25T00:00:00Z' };
}

const SECTIONS = [
  section('CP', '41', '41.001', 'aaa'),
  section('CP', '41', '41.0105', 'bbb'),
  section('PR', '55', '55.002', 'ccc'),
  section('PR', '55', '55.004', 'ddd'),
];

describe('buildHashIndex', () => {
  const index = buildHashIndex(SECTIONS);

  it('indexes sections by ref', () => {
    expect(index.get('CP 41.0105')).toBe('bbb');
    expect(index.get('PR 55.002')).toBe('ccc');
  });

  it('adds chapter aggregates for chapter-level cites', () => {
    expect(index.get('CP ch. 41')).toBeDefined();
    expect(index.get('PR ch. 55')).toBeDefined();
  });

  it('chapter aggregate moves when any section moves', () => {
    const before = buildHashIndex(SECTIONS).get('PR ch. 55');
    const after = buildHashIndex([
      SECTIONS[0], SECTIONS[1], SECTIONS[2],
      section('PR', '55', '55.004', 'CHANGED'),
    ]).get('PR ch. 55');
    expect(after).not.toBe(before);
  });
});

describe('diffSnapshots', () => {
  const index = buildHashIndex(SECTIONS);

  it('raises nothing when hashes match', () => {
    expect(diffSnapshots([snap('r1', 'CP 41.0105', 'bbb')], index, [])).toEqual([]);
  });

  it('raises on a changed section hash', () => {
    const hits = diffSnapshots([snap('r1', 'CP 41.0105', 'OLD')], index, []);
    expect(hits).toHaveLength(1);
    expect(hits[0]).toMatchObject({ ruleId: 'r1', sourceRef: 'CP 41.0105' });
    expect(hits[0].detail).toContain('2026-07-25');
  });

  it('raises on a changed chapter aggregate (chapter-level cite)', () => {
    const hits = diffSnapshots([snap('r2', 'PR ch. 55', 'STALE-AGGREGATE')], index, []);
    expect(hits).toHaveLength(1);
    expect(hits[0].sourceRef).toBe('PR ch. 55');
  });

  it('does NOT raise when the ref has no current hash (cache miss ≠ change)', () => {
    expect(diffSnapshots([snap('r1', 'HS 327.001', 'xxx')], index, [])).toEqual([]);
  });

  it('changed-text hits carry the text-changed kind', () => {
    const hits = diffSnapshots([snap('r1', 'CP 41.0105', 'OLD')], index, []);
    expect(hits[0].kind).toBe('text-changed-since-verified');
  });

  it('raises section-removed when the ref is gone from a REFRESHED chapter', () => {
    // CP 41.9999 was pinned at verification but no longer exists in the
    // chapter file — and chapter 41 just refreshed successfully.
    const hits = diffSnapshots(
      [snap('r1', 'CP 41.9999', 'xxx')], index, [], new Set(['CP ch. 41']));
    expect(hits).toHaveLength(1);
    expect(hits[0]).toMatchObject({ ruleId: 'r1', sourceRef: 'CP 41.9999', kind: 'section-removed' });
    expect(hits[0].detail).toContain('repealed or renumbered');
  });

  it('missing ref in a NON-refreshed chapter still raises nothing', () => {
    const hits = diffSnapshots(
      [snap('r1', 'HS 327.001', 'xxx')], index, [], new Set(['CP ch. 41']));
    expect(hits).toEqual([]);
  });

  it('an active section-removed flag does not suppress a text-changed hit on another ref (and vice versa)', () => {
    const removedFlag: WatchFlag = {
      id: 'f9', ruleId: 'r1', kind: 'section-removed',
      sourceRef: 'CP 41.9999', raisedAt: '2026-07-25T00:00:00Z',
    };
    const hits = diffSnapshots(
      [snap('r1', 'CP 41.9999', 'xxx'), snap('r1', 'CP 41.0105', 'OLD')],
      index, [removedFlag], new Set(['CP ch. 41']));
    expect(hits).toHaveLength(1);
    expect(hits[0]).toMatchObject({ sourceRef: 'CP 41.0105', kind: 'text-changed-since-verified' });
  });

  it('does not duplicate an active flag, but re-raises after clearing', () => {
    const active: WatchFlag = {
      id: 'f1', ruleId: 'r1', kind: 'text-changed-since-verified',
      sourceRef: 'CP 41.0105', raisedAt: '2026-07-25T00:00:00Z',
    };
    const snaps = [snap('r1', 'CP 41.0105', 'OLD')];
    expect(diffSnapshots(snaps, index, [active])).toEqual([]);
    const cleared = { ...active, clearedAt: '2026-07-26T00:00:00Z', clearedBy: 'Michael Brennan' };
    expect(diffSnapshots(snaps, index, [cleared])).toHaveLength(1);
  });
});

describe('chapterRefForSnapshotRef', () => {
  it('maps section refs to their chapter ref, incl. lettered chapters', () => {
    expect(chapterRefForSnapshotRef('CP 41.0105')).toBe('CP ch. 41');
    expect(chapterRefForSnapshotRef('CR 55A.053')).toBe('CR ch. 55A');
  });

  it('passes chapter refs through unchanged', () => {
    expect(chapterRefForSnapshotRef('PR ch. 55')).toBe('PR ch. 55');
  });
});

describe('snapshotTargetsForRule — real seeded-rule cites', () => {
  it('maps §41.0105 to a section ref and ignores the companion case cite', () => {
    const targets = snapshotTargetsForRule({
      cites: ['Tex. Civ. Prac. & Rem. Code §41.0105', 'Haygood v. De Escabedo, 356 S.W.3d 390 (Tex. 2011)'],
    });
    expect(targets).toEqual([{ ref: 'CP 41.0105', code: 'CP', chapter: '41', section: '41.0105' }]);
  });

  it('maps a chapter-level cite to a chapter ref and ignores bill numbers', () => {
    const targets = snapshotTargetsForRule({
      cites: ['Tex. Prop. Code Ch. 55', 'HB 2929 (2019)'],
    });
    expect(targets).toEqual([{ ref: 'PR ch. 55', code: 'PR', chapter: '55' }]);
  });

  it('ignores federal and administrative cites entirely', () => {
    const targets = snapshotTargetsForRule({
      cites: ['45 C.F.R. pt. 180', '26 Tex. Admin. Code §511.77', 'No Surprises Act, Pub. L. 116-260, div. BB'],
    });
    expect(targets).toEqual([]);
  });

  it('dedupes repeated refs across cites', () => {
    const targets = snapshotTargetsForRule({
      cites: ['CPRC §18.001', 'Tex. Civ. Prac. & Rem. Code §18.001'],
    });
    expect(targets).toHaveLength(1);
    expect(targets[0].ref).toBe('CP 18.001');
  });
});
