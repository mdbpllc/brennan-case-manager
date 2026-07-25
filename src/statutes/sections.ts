// Chapter HTML → sections with content hashes (design A2's parsing half).
// Pure string work, no DOM: the same code runs in the browser (demo mode),
// vitest, and the Deno edge function.
//
// File structure (verified against live files 2026-07-25): each section
// starts with an anchor <a name="41.001"></a> (the site also emits internal
// numeric anchors like name="5219.4506" — filtered out by requiring the
// chapter prefix), followed by a bold heading link "Sec. 41.001.  HEADING."
// and body paragraphs, ending with Acts/Amended-by source credits.

export interface ParsedSection {
  sectionNumber: string;
  heading?: string;
  text: string;
  contentHash: string;
}

export interface ParsedChapter {
  title?: string;
  sections: ParsedSection[];
}

/** FNV-1a 64-bit over the normalized text. A tripwire signal, not a
 *  security boundary — collisions are astronomically unlikely at this
 *  scale and a false negative only means one flag doesn't raise. */
export function contentHash(text: string): string {
  let h = 0xcbf29ce484222325n;
  for (let i = 0; i < text.length; i++) {
    h ^= BigInt(text.charCodeAt(i));
    h = (h * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return h.toString(16).padStart(16, '0');
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
  '&apos;': "'", '&nbsp;': ' ', '&sect;': '§', '&mdash;': '—', '&ndash;': '–',
  '&#8217;': '’', '&#8220;': '“', '&#8221;': '”',
};

/** Strip tags, decode common entities, collapse whitespace — but keep
 *  paragraph boundaries as newlines so section text stays readable. */
export function htmlToText(html: string): string {
  let s = html.replace(/<\/p>|<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, ' ');
  s = s.replace(/&[a-z]+;|&#\d+;/gi, (m) => ENTITIES[m] ?? ' ');
  return s
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

/** Sections are anchored by name="<chapter>.<n>"; anything else (internal
 *  numeric anchors, cross-chapter artifacts) is not a section of this file. */
function isSectionAnchor(name: string, chapter: string): boolean {
  return name.startsWith(`${chapter}.`) && /^\d+[A-Z]?\.[0-9][0-9A-Za-z.-]*$/.test(name);
}

const ANCHOR = /<a name="([^"]+)"><\/a>/g;

/** Parse one chapter file into per-section text + hashes.
 *  `chapter` is the chapter as in the file name ('41', '55A'). */
export function parseChapter(html: string, chapter: string): ParsedChapter {
  const titleMatch = /<title>([^<]*)<\/title>/i.exec(html);
  const title = titleMatch ? htmlToText(titleMatch[1]) : undefined;

  // Collect section-anchor positions, deduped (a section heading region can
  // carry several anchors; the first section-shaped one wins).
  const marks: { section: string; index: number }[] = [];
  const seen = new Set<string>();
  for (const m of html.matchAll(ANCHOR)) {
    const name = m[1];
    if (!isSectionAnchor(name, chapter) || seen.has(name)) continue;
    seen.add(name);
    marks.push({ section: name, index: m.index });
  }

  const sections: ParsedSection[] = marks.map((mark, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index : html.length;
    const slice = html.slice(mark.index, end);
    const text = htmlToText(slice);

    // Heading from the bold section link: "Sec. 41.001.  DEFINITIONS." /
    // "Art. 55A.053. ...". Escape the section number for the regex.
    const num = mark.section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const head = new RegExp(`<a[^>]*>\\s*((?:Sec|Art)\\.\\s*${num}\\.[^<]*)</a>`).exec(slice);
    let heading: string | undefined;
    if (head) {
      heading = htmlToText(head[1]).replace(new RegExp(`^(?:Sec|Art)\\.\\s*${num}\\.\\s*`), '').trim() || undefined;
    }

    return { sectionNumber: mark.section, heading, text, contentHash: contentHash(text) };
  });

  return { title, sections };
}

/** One hash for a whole chapter — the snapshot target for chapter-level
 *  cites like "Tex. Prop. Code Ch. 55". Derived from the section hashes so
 *  it changes iff any section text changes. */
export function chapterAggregateHash(sections: { contentHash: string }[]): string {
  return contentHash(sections.map((s) => s.contentHash).join('|'));
}
