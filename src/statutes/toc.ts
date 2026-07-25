// Code tables of contents — chapter lists with titles for the browse
// picker and title-keyword search (Michael's request, 2026-07-25).
// Fixtures are built from the official site's headings API by
// scripts/build-toc-fixtures.mjs (public domain; regenerate biennially
// with the cache refresh). Lazy-loaded per code, ~10-60 KB each.

import { db } from '../data';

export interface TocChapter {
  ch: string;     // '41', '55A' — matches chapter file naming
  title: string;  // 'DAMAGES'
  path: string;   // 'TITLE 2. TRIAL, JUDGMENT, AND APPEAL — SUBTITLE C. JUDGMENTS'
}

export interface CodeToc {
  code: string;
  name: string;
  fetchedAt: string;
  chapters: TocChapter[];
}

const TOCS: Record<string, () => Promise<{ default: CodeToc }>> = {
  FA: () => import('./fixtures/toc/FA.json'),
  PE: () => import('./fixtures/toc/PE.json'),
  CR: () => import('./fixtures/toc/CR.json'),
  CP: () => import('./fixtures/toc/CP.json'),
  GV: () => import('./fixtures/toc/GV.json'),
  HS: () => import('./fixtures/toc/HS.json'),
  IN: () => import('./fixtures/toc/IN.json'),
  PR: () => import('./fixtures/toc/PR.json'),
  ES: () => import('./fixtures/toc/ES.json'),
  TX: () => import('./fixtures/toc/TX.json'),
  LG: () => import('./fixtures/toc/LG.json'),
  TN: () => import('./fixtures/toc/TN.json'),
};

/** Working-set order (O2) — the browse picker's code list. */
export const TOC_CODES = ['FA', 'PE', 'CR', 'CP', 'GV', 'HS', 'IN', 'PR', 'ES', 'TX', 'LG', 'TN'];

export async function loadToc(code: string): Promise<CodeToc | null> {
  const loader = TOCS[code];
  return loader ? (await loader()).default : null;
}

let allTocs: Promise<CodeToc[]> | null = null;

/** All twelve TOCs, loaded once (for cross-code search). */
export function loadAllTocs(): Promise<CodeToc[]> {
  if (!allTocs) {
    allTocs = Promise.all(TOC_CODES.map((c) => loadToc(c))).then((list) => list.filter((t): t is CodeToc => t !== null));
  }
  return allTocs;
}

export interface ChapterHit {
  code: string;
  codeName: string;
  ch: string;
  title: string;
  path: string;
}

/** Query words, lowercased — matching is every-word-appears (AND), so
 *  "hospital lien" finds "HOSPITAL AND EMERGENCY MEDICAL SERVICES LIENS". */
function queryWords(query: string): string[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length >= 2);
  return words.length ? words : [];
}

const matchesAll = (haystack: string, words: string[]) => words.every((w) => haystack.includes(w));

/** Case-insensitive keyword search over chapter titles (and their
 *  title/subtitle paths) across the given TOCs. Every query word must
 *  appear; all-in-title hits rank above hits that need the path; results
 *  capped so 'general' stays usable. */
export function searchChapterTitles(tocs: CodeToc[], query: string, cap = 40): ChapterHit[] {
  const words = queryWords(query);
  if (!words.length) return [];
  const titleHits: ChapterHit[] = [];
  const pathHits: ChapterHit[] = [];
  for (const toc of tocs) {
    for (const chapter of toc.chapters) {
      const hit = { code: toc.code, codeName: toc.name, ch: chapter.ch, title: chapter.title, path: chapter.path };
      if (matchesAll(chapter.title.toLowerCase(), words)) titleHits.push(hit);
      else if (matchesAll(`${chapter.title} ${chapter.path}`.toLowerCase(), words)) pathHits.push(hit);
    }
  }
  return [...titleHits, ...pathHits].slice(0, cap);
}

export interface SectionHit {
  code: string;
  chapter: string;
  section: string;
  heading: string;
}

/** Keyword search over section HEADINGS — covers cached chapters only
 *  (section titles live in the chapter files; the cache is what we have).
 *  The UI says so rather than pretending it searched everything. */
export async function searchCachedSectionHeadings(query: string, cap = 40): Promise<SectionHit[]> {
  const words = queryWords(query);
  if (!words.length) return [];
  const hits: SectionHit[] = [];
  for (const meta of await db.listStatuteChapters()) {
    const sections = await db.listSectionsForChapter(meta.code, meta.chapter);
    for (const s of sections) {
      if (s.heading && matchesAll(s.heading.toLowerCase(), words)) {
        hits.push({ code: s.code, chapter: s.chapter, section: s.sectionNumber, heading: s.heading });
        if (hits.length >= cap) return hits;
      }
    }
  }
  return hits;
}
