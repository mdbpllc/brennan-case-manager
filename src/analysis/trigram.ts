// Deterministic trigram similarity for chargemaster-memory fuzzy matching.
// Same algorithm in both adapter modes so demo and Supabase behave identically
// (Postgres pg_trgm exists server-side, but matching runs client-side for parity).

/** Uppercase, strip punctuation, collapse whitespace — hospital abbreviations
 *  like "TRPNIN QUANT" must match regardless of stray punctuation/case. */
export function normalizeDescription(s: string): string {
  return s.toUpperCase().replace(/[^A-Z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function trigrams(s: string): Set<string> {
  const grams = new Set<string>();
  // Pad like pg_trgm ("  x" ... "x  ") so short strings still produce grams.
  for (const word of s.split(' ')) {
    if (!word) continue;
    const padded = `  ${word} `;
    for (let i = 0; i <= padded.length - 3; i++) grams.add(padded.slice(i, i + 3));
  }
  return grams;
}

/** Jaccard similarity over padded word trigrams, 0..1 — pg_trgm's similarity() analogue. */
export function trigramSimilarity(a: string, b: string): number {
  const ga = trigrams(normalizeDescription(a));
  const gb = trigrams(normalizeDescription(b));
  if (ga.size === 0 || gb.size === 0) return 0;
  let inter = 0;
  for (const g of ga) if (gb.has(g)) inter++;
  return inter / (ga.size + gb.size - inter);
}

export interface MatchCandidate<T> {
  item: T;
  score: number;
}

/** Rank candidates by trigram similarity of their description against the query.
 *  `boost` lets callers prefer e.g. same-provider mappings without hiding others. */
export function rankByTrigram<T>(
  query: string,
  candidates: T[],
  describe: (item: T) => string,
  boost?: (item: T) => number,
): MatchCandidate<T>[] {
  return candidates
    .map((item) => ({ item, score: trigramSimilarity(query, describe(item)) * (boost ? boost(item) : 1) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);
}
