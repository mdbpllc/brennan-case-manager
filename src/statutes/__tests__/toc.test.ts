import { describe, expect, it } from 'vitest';
import { searchChapterTitles, type CodeToc } from '../toc';
import cpToc from '../fixtures/toc/CP.json';
import crToc from '../fixtures/toc/CR.json';
import prToc from '../fixtures/toc/PR.json';

// The fixtures are REAL TOC data from the official headings API (built by
// scripts/build-toc-fixtures.mjs) — these tests double as shape validation.

const TOCS = [cpToc, crToc, prToc] as CodeToc[];

describe('TOC fixtures (real data)', () => {
  it('CP carries chapter 41 DAMAGES under its title/subtitle path', () => {
    const ch41 = (cpToc as CodeToc).chapters.find((c) => c.ch === '41')!;
    expect(ch41.title).toBe('DAMAGES');
    expect(ch41.path).toContain('TITLE 2');
  });

  it('CR carries the lettered chapter 55A (expunction)', () => {
    expect((crToc as CodeToc).chapters.some((c) => c.ch === '55A')).toBe(true);
  });

  it('every chapter number matches the file-naming pattern', () => {
    for (const toc of TOCS) {
      for (const c of toc.chapters) expect(c.ch).toMatch(/^\d+[A-Z]?$/);
    }
  });
});

describe('searchChapterTitles', () => {
  it('finds chapters by title keyword across codes', () => {
    const hits = searchChapterTitles(TOCS, 'damages');
    expect(hits.some((h) => h.code === 'CP' && h.ch === '41')).toBe(true);
  });

  it('finds the hospital-lien chapter', () => {
    const hits = searchChapterTitles(TOCS, 'hospital');
    expect(hits.some((h) => h.code === 'PR' && h.ch === '55')).toBe(true);
  });

  it('multi-word queries match all words, not the exact phrase', () => {
    // Chapter title is "HOSPITAL AND EMERGENCY MEDICAL SERVICES LIENS" —
    // "hospital lien" must still find it (Michael's search would type this).
    const hits = searchChapterTitles(TOCS, 'hospital lien');
    expect(hits.some((h) => h.code === 'PR' && h.ch === '55')).toBe(true);
    expect(searchChapterTitles(TOCS, 'hospital zoning')).toEqual([]);
  });

  it('ranks title hits above path-only hits and caps results', () => {
    const hits = searchChapterTitles(TOCS, 'judgment', 10);
    expect(hits.length).toBeLessThanOrEqual(10);
    const firstPathOnly = hits.findIndex((h) => !h.title.toLowerCase().includes('judgment'));
    const lastTitleHit = hits.map((h) => h.title.toLowerCase().includes('judgment')).lastIndexOf(true);
    if (firstPathOnly !== -1) expect(lastTitleHit).toBeLessThan(firstPathOnly);
  });

  it('ignores queries under two characters', () => {
    expect(searchChapterTitles(TOCS, 'd')).toEqual([]);
  });
});
