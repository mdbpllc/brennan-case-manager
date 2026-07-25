// Chapter fetch orchestration (design A2) — cache-on-demand through the
// DataAdapter. Demo mode serves the committed fixture chapters; live mode
// goes through the statute-fetch edge function (the browser can't hit the
// .gov file host directly — CORS), which reads tcss.legis.texas.gov/resources/.

import { db, usingSupabase } from '../data';
import { chapterFetchUrl, chapterUrl, codeByCd } from '../cites/codes';
import type { StatuteChapter } from '../domain/statutes';
import { parseChapter } from './sections';
import { loadFixture } from './fixtures';

export class StatuteFetchError extends Error {
  /** True when the failure is "demo mode doesn't carry this chapter" —
   *  the UI offers the official-site link instead. */
  readonly notInDemoSet: boolean;
  constructor(message: string, notInDemoSet = false) {
    super(message);
    this.notInDemoSet = notInDemoSet;
  }
}

async function fetchChapterHtml(code: string, chapter: string): Promise<string> {
  if (!usingSupabase) {
    const html = await loadFixture(code, chapter);
    if (html === null) {
      throw new StatuteFetchError(
        `Demo mode carries only the fixture chapters (${code} ch. ${chapter} isn't one). ` +
        'Connect the central database to cache any chapter on demand.',
        true,
      );
    }
    return html;
  }
  const base = import.meta.env.VITE_SUPABASE_URL as string;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
  const res = await fetch(
    `${base}/functions/v1/statute-fetch?code=${encodeURIComponent(code)}&chapter=${encodeURIComponent(chapter)}`,
    { headers: { Authorization: `Bearer ${anonKey}`, apikey: anonKey } },
  );
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new StatuteFetchError(`Statute fetch failed (${res.status}): ${body.slice(0, 300)}`);
  }
  const payload = (await res.json()) as { html?: string };
  if (!payload.html) throw new StatuteFetchError('Statute fetch returned no content.');
  return payload.html;
}

/** Serve from cache, else fetch + parse + cache (force=true refreshes). */
export async function getOrFetchChapter(code: string, chapter: string, force = false): Promise<StatuteChapter> {
  const def = codeByCd(code);
  if (!def || !def.verified) throw new StatuteFetchError(`Unknown code '${code}'.`);
  if (!force) {
    const cached = await db.getStatuteChapter(code, chapter);
    if (cached) return cached;
  }
  const html = await fetchChapterHtml(code, chapter);
  const parsed = parseChapter(html, chapter);
  if (parsed.sections.length === 0) {
    throw new StatuteFetchError(`No sections found in ${code} ch. ${chapter} — layout change or bad chapter number.`);
  }
  return db.saveStatuteChapter(
    {
      code, chapter, title: parsed.title,
      sourceUrl: usingSupabase ? chapterFetchUrl(code, chapter) : chapterUrl(code, chapter),
      html, fetchedAt: new Date().toISOString(),
    },
    parsed.sections.map(({ sectionNumber, heading, text, contentHash }) => ({ sectionNumber, heading, text, contentHash })),
  );
}
