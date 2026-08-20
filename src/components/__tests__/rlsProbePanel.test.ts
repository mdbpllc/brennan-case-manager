// Gate 10 §7 item 6 — the two false sentences in the RLS probe panel.
//
// Authority: docs/specs/gate10-pii-frontend-slice.md §7 item 6 as AMENDED by
// Michael's `G10-6` ruling 2026-08-19 (both sentences, not one), executed under
// his `G10-5` build authorization the same day.
//
// WHY THIS SUITE MATCHES ON NORMALIZED TEXT RATHER THAN RAW SOURCE. Sentence (b)
// wraps across a source line break, so a raw substring search for the whole
// sentence returns ZERO on a file that plainly contains it — the wrap trap,
// which has now fired five times on this project's record. A test written the
// naive way would pass whether or not the repair had happened, which is the
// worst kind of green.
//
// It asserts the ABSENCE of the false sentences as well as the presence of the
// true ones. Presence alone would pass on a panel that rendered both.

import { describe, it, expect } from 'vitest';
import panelSource from '../RlsProbePanel.tsx?raw';

/** Collapse every run of whitespace, including newlines, and strip the JSX
 *  string-literal punctuation that can sit mid-sentence. */
function norm(s: string): string {
  return s.replace(/\s+/g, ' ');
}

const SRC = norm(panelSource);

describe('probe-panel text (§7 item 7, test 5)', () => {
  it('no longer tells the reader the role has no SQL privilege', () => {
    // FALSE: `anon` holds TRUNCATE, REFERENCES, TRIGGER and MAINTAIN on all 37
    // tables. It lacks only the four DML privileges.
    expect(SRC).not.toContain('The role has no SQL privilege on these tables');
  });

  it('no longer says anon is granted nothing by design', () => {
    expect(SRC).not.toContain('anon is granted nothing by design');
    expect(SRC).not.toContain('granted nothing');
  });

  it('carries the adopted wording for the signed-out clause', () => {
    // Adopted 2026-08-19. The row must not say "granted nothing".
    expect(SRC).toContain('anon holds none of the four DML privileges');
  });

  it('carries the corrected privilege-wall sentence', () => {
    // Wording PROPOSED, parallel to the adopted clause, and Michael's to
    // override — recorded in the slice as not separately adopted.
    expect(SRC).toContain('The role holds none of the four DML privileges on these tables');
  });

  it('keeps both sentences in the SAME rendered paragraph', () => {
    // They render two lines apart in one <p className="notice bad"> block.
    // Repairing one and leaving the other is the failure item 6 was amended to
    // prevent, so the suite pins that they still travel together.
    const block = /<p className="notice bad">(.*?)<\/p>/.exec(SRC);
    expect(block).toBeTruthy();
    const wall = SRC.slice(SRC.indexOf('Every table was refused'));
    const paragraph = wall.slice(0, wall.indexOf('</p>'));
    expect(paragraph).toContain('The role holds none of the four DML privileges on these tables');
    expect(paragraph).toContain('anon holds none of the four DML privileges');
  });

  it('is matched on normalized text, and the raw form would have lied', () => {
    // The guard on the guard. Sentence (b) wraps in the source, so the raw file
    // does NOT contain it as a contiguous string while the normalized one does.
    // If this ever fails, the source was re-wrapped and a raw-matching test
    // elsewhere may now be passing vacuously.
    const raw = panelSource;
    const sentence = 'The role holds none of the four DML privileges on these tables';
    expect(norm(raw)).toContain(sentence);
    expect(raw.includes(sentence)).toBe(false);
  });
});
