// Texas code registry — the cite parser's ground truth (design A1, T1).
// Every `cd` marked verified was confirmed against the LIVE site on
// 2026-07-25 by fetching a real chapter file and checking its content
// (design §2's table was from memory; T1's job was to verify it).
//
// SITE FACT (2026-07-25): statutes.capitol.texas.gov is now a client-side
// app. Deep links like /docs/FA/htm/FA.153.htm#153.002 still work in a
// browser (the app routes them, honors the anchor, even preselects the
// section). Machine fetching must use the backing file host instead:
//   https://tcss.legis.texas.gov/resources/{CD}/htm/{CD}.{ch}.htm
// which serves the original static chapter files (same naming, same
// section anchors, e.g. name="153.002"; Constitution uses CN.{art}.htm
// with name="{art}.{sec}"). Recorded in spec-feedback for the A2 design.

export interface CodeDef {
  /** Two-letter abbreviation in the site's file naming. */
  cd: string;
  name: string;
  /** Normalized match keys (see normalizeCodeName) — longest match wins. */
  aliases: string[];
  kind: 'code' | 'ccp' | 'constitution';
  /** Confirmed against a live chapter file on 2026-07-25. */
  verified: boolean;
}

export const CODES: CodeDef[] = [
  { cd: 'FA', name: 'Family Code', kind: 'code', verified: true,
    aliases: ['family code', 'fam code'] },
  { cd: 'PE', name: 'Penal Code', kind: 'code', verified: true,
    aliases: ['penal code', 'pen code'] },
  { cd: 'CP', name: 'Civil Practice and Remedies Code', kind: 'code', verified: true,
    aliases: ['civil practice and remedies code', 'civ prac and rem code', 'civ prac rem code', 'cprc'] },
  { cd: 'CR', name: 'Code of Criminal Procedure', kind: 'ccp', verified: true,
    aliases: ['code of criminal procedure', 'code crim proc', 'crim proc', 'ccp'] },
  { cd: 'GV', name: 'Government Code', kind: 'code', verified: true,
    aliases: ['government code', 'govt code', 'gov code'] },
  { cd: 'PR', name: 'Property Code', kind: 'code', verified: true,
    aliases: ['property code', 'prop code'] },
  { cd: 'IN', name: 'Insurance Code', kind: 'code', verified: true,
    aliases: ['insurance code', 'ins code'] },
  { cd: 'HS', name: 'Health and Safety Code', kind: 'code', verified: true,
    aliases: ['health and safety code', 'health safety code'] },
  { cd: 'ES', name: 'Estates Code', kind: 'code', verified: true,
    aliases: ['estates code', 'est code'] },
  { cd: 'BC', name: 'Business and Commerce Code', kind: 'code', verified: true,
    aliases: ['business and commerce code', 'bus and com code', 'bus com code'] },
  { cd: 'BO', name: 'Business Organizations Code', kind: 'code', verified: true,
    aliases: ['business organizations code', 'bus orgs code', 'bus org code'] },
  { cd: 'LA', name: 'Labor Code', kind: 'code', verified: true,
    aliases: ['labor code', 'lab code'] },
  { cd: 'CN', name: 'Texas Constitution', kind: 'constitution', verified: true,
    aliases: ['constitution', 'const'] },
  { cd: 'AG', name: 'Agriculture Code', kind: 'code', verified: true,
    aliases: ['agriculture code', 'agric code', 'ag code'] },
  { cd: 'AL', name: 'Alcoholic Beverage Code', kind: 'code', verified: true,
    aliases: ['alcoholic beverage code', 'alco bev code'] },
  { cd: 'ED', name: 'Education Code', kind: 'code', verified: true,
    aliases: ['education code', 'educ code'] },
  { cd: 'EL', name: 'Election Code', kind: 'code', verified: true,
    aliases: ['election code', 'elec code'] },
  { cd: 'FI', name: 'Finance Code', kind: 'code', verified: true,
    aliases: ['finance code', 'fin code'] },
  { cd: 'HR', name: 'Human Resources Code', kind: 'code', verified: true,
    aliases: ['human resources code', 'hum res code'] },
  { cd: 'LG', name: 'Local Government Code', kind: 'code', verified: true,
    aliases: ['local government code', 'local govt code', 'loc govt code'] },
  { cd: 'NR', name: 'Natural Resources Code', kind: 'code', verified: true,
    aliases: ['natural resources code', 'nat res code'] },
  { cd: 'OC', name: 'Occupations Code', kind: 'code', verified: true,
    aliases: ['occupations code', 'occ code'] },
  { cd: 'PW', name: 'Parks and Wildlife Code', kind: 'code', verified: true,
    aliases: ['parks and wildlife code', 'parks and wild code'] },
  { cd: 'SD', name: 'Special District Local Laws Code', kind: 'code', verified: true,
    aliases: ['special district local laws code'] },
  { cd: 'TX', name: 'Tax Code', kind: 'code', verified: true,
    aliases: ['tax code'] },
  { cd: 'TN', name: 'Transportation Code', kind: 'code', verified: true,
    aliases: ['transportation code', 'transp code'] },
  { cd: 'UT', name: 'Utilities Code', kind: 'code', verified: true,
    aliases: ['utilities code', 'util code'] },
  { cd: 'WA', name: 'Water Code', kind: 'code', verified: true,
    aliases: ['water code'] },
  // Vernon's Civil Statutes: listed on the site, but the CV.{n}.htm guess
  // 404s — article-file naming unconfirmed. Classified, never linked, until
  // a real URL pattern is confirmed. (Design A1 calls it a special case.)
  { cd: 'CV', name: "Vernon's Civil Statutes", kind: 'code', verified: false,
    aliases: ['vernons civil statutes', 'rev civ stat', 'revised civil statutes'] },
];

/** Lowercase; periods/commas/apostrophes stripped; & → "and"; "tex."/"texas"
 *  prefix dropped; whitespace collapsed. Mirrors how aliases are written. */
export function normalizeCodeName(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’.,]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(?:the\s+)?(?:tex|texas)\s+/, '');
}

/** Resolve a code name/abbreviation to its definition, or null. */
/** Lookup by the two-letter site code, e.g. 'CP'. */
export function codeByCd(cd: string): CodeDef | null {
  const up = cd.toUpperCase();
  return CODES.find((def) => def.cd === up) ?? null;
}

export function resolveCode(raw: string): CodeDef | null {
  const norm = normalizeCodeName(raw);
  if (!norm) return null;
  for (const def of CODES) {
    if (def.aliases.includes(norm)) return def;
  }
  return null;
}

/** User-facing chapter URL — works in a browser (the site's app routes it). */
export function chapterUrl(cd: string, chapter: string, anchor?: string): string {
  return `https://statutes.capitol.texas.gov/docs/${cd}/htm/${cd}.${chapter}.htm${anchor ? `#${anchor}` : ''}`;
}

/** Machine-fetch URL — the backing static file host (see header note). */
export function chapterFetchUrl(cd: string, chapter: string): string {
  return `https://tcss.legis.texas.gov/resources/${cd}/htm/${cd}.${chapter}.htm`;
}
