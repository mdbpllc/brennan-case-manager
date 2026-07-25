// Shared text primitives for the routing engine — tokenizing, edit distance,
// fuzzy token comparison. Pure functions, no app dependencies.

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/[\s-]+/)
    .filter(Boolean);
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = new Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr.slice();
  }
  return prev[b.length];
}

/** 0..1 similarity — 1 means identical. */
export function similarity(a: string, b: string): number {
  const max = Math.max(a.length, b.length);
  if (max === 0) return 1;
  return 1 - levenshtein(a, b) / max;
}

/** Fuzzy single-token equality, tolerance scaled to token length —
 *  transcription noise garbles long proper nouns more than short words. */
export function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 5 || b.length < 5) return false; // short tokens must be exact
  const allowed = a.length >= 8 ? 2 : 1;
  return levenshtein(a, b) <= allowed;
}

/** Minimum edit distance between `needle` and any same-length-ish window of
 *  `haystack` — for matching a known identifier inside a longer digit run. */
export function bestWindowDistance(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  if (haystack.length <= needle.length) return levenshtein(haystack, needle);
  let best = Infinity;
  for (let w = needle.length - 1; w <= needle.length + 1; w++) {
    for (let i = 0; i + w <= haystack.length; i++) {
      const d = levenshtein(haystack.slice(i, i + w), needle);
      if (d < best) best = d;
      if (best === 0) return 0;
    }
  }
  return best;
}

/** Generic filler words that never identify a case or party. */
export const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'for', 'on', 'in', 'to', 'with', 'at',
  'this', 'that', 'is', 'was', 'are', 'be', 'it', 'we', 'i', 'you', 'they',
  'insurance', 'company', 'companies', 'inc', 'llc', 'llp', 'pc', 'law',
  'firm', 'group', 'mutual', 'county', 'court', 'center', 'medical',
  'regional', 'v', 'vs', 'versus', 'matter', 'case', 'state',
]);
