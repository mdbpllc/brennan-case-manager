import { describe, expect, it } from 'vitest';
import { parseChapter, contentHash, chapterAggregateHash, htmlToText } from '../sections';
import cp41 from '../fixtures/CP.41.htm?raw';
import pr55 from '../fixtures/PR.55.htm?raw';
import hs327 from '../fixtures/HS.327.htm?raw';

// The fixtures are REAL chapter files (see fixtures/README.md) — these tests
// double as the layout verification the design asked for (A2).

describe('parseChapter against the real CP.41 file', () => {
  const parsed = parseChapter(cp41, '41');

  it('extracts the chapter title', () => {
    expect(parsed.title).toContain('CIVIL PRACTICE AND REMEDIES CODE');
    expect(parsed.title).toContain('CHAPTER 41');
  });

  it('finds the sections, including the registry-cited §41.0105', () => {
    const numbers = parsed.sections.map((s) => s.sectionNumber);
    expect(numbers).toContain('41.001');
    expect(numbers).toContain('41.0105');
    // Every extracted number belongs to chapter 41
    for (const n of numbers) expect(n.startsWith('41.')).toBe(true);
  });

  it('ignores the site-internal numeric anchors (e.g. 5219.4506)', () => {
    expect(cp41).toContain('name="5219.4506"'); // the artifact is really there
    expect(parsed.sections.some((s) => s.sectionNumber === '5219.4506')).toBe(false);
  });

  it('extracts headings and body text', () => {
    const s41001 = parsed.sections.find((s) => s.sectionNumber === '41.001')!;
    expect(s41001.heading).toContain('DEFINITIONS');
    expect(s41001.text).toContain('Claimant');
    const s0105 = parsed.sections.find((s) => s.sectionNumber === '41.0105')!;
    expect(s0105.text.toLowerCase()).toContain('actually paid');
  });

  it('hashes are stable and text-sensitive', () => {
    const s = parsed.sections[0];
    expect(s.contentHash).toBe(contentHash(s.text));
    expect(contentHash(s.text + ' amended')).not.toBe(s.contentHash);
    expect(s.contentHash).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe('other registry-cited chapters', () => {
  it('parses PR.55 (hospital liens — chapter-level cite target)', () => {
    const parsed = parseChapter(pr55, '55');
    expect(parsed.sections.length).toBeGreaterThan(3);
    expect(parsed.sections.map((s) => s.sectionNumber)).toContain('55.002');
  });

  it('parses HS.327 (price transparency)', () => {
    const parsed = parseChapter(hs327, '327');
    expect(parsed.sections.length).toBeGreaterThan(3);
  });
});

describe('chapterAggregateHash', () => {
  it('changes iff any section hash changes', () => {
    const a = [{ contentHash: '1' }, { contentHash: '2' }];
    const same = chapterAggregateHash([{ contentHash: '1' }, { contentHash: '2' }]);
    expect(chapterAggregateHash(a)).toBe(same);
    expect(chapterAggregateHash([{ contentHash: '1' }, { contentHash: 'x' }])).not.toBe(same);
  });
});

describe('htmlToText', () => {
  it('strips tags, decodes entities, collapses whitespace', () => {
    expect(htmlToText('<p>Smith &amp; Jones&nbsp;&nbsp;LLP</p>')).toBe('Smith & Jones LLP');
  });
});
