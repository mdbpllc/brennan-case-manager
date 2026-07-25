// Spoken-number normalizer (design §4): spoken-digit words → canonical
// identifier strings, matched against the KNOWN identifier list (all open
// cases' cause/claim numbers, party phones) at edit distance ≤2. We never
// need to hear a number perfectly — only well enough to match a short list.
import { bestWindowDistance, tokenize } from './text';

const UNITS: Record<string, string> = {
  zero: '0', oh: '0', o: '0', one: '1', two: '2', three: '3', four: '4',
  five: '5', six: '6', seven: '7', eight: '8', nine: '9',
};

const TEENS: Record<string, string> = {
  ten: '10', eleven: '11', twelve: '12', thirteen: '13', fourteen: '14',
  fifteen: '15', sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19',
};

const TENS: Record<string, number> = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
  eighty: 80, ninety: 90,
};

/** Common short English words that must never join an identifier run —
 *  "reach me AT eight zero zero…" is prose, not a claim prefix. */
const COMMON_SHORT_WORDS = new Set([
  'a', 'at', 'in', 'on', 'to', 'is', 'it', 'of', 'or', 'we', 'he', 'be', 'so',
  'do', 'an', 'as', 'by', 'my', 'no', 'up', 'am', 'me', 'us', 'if', 'go',
]);

/** Letters spoken as identifier components ("CI", "CR", claim prefixes). */
function isLetterToken(t: string): boolean {
  return /^[a-z]{1,2}$/.test(t) && !(t in UNITS) && !COMMON_SHORT_WORDS.has(t);
}

/**
 * Convert a token stream into "identifier runs": maximal sequences of
 * digits/letters that were spoken as numbers, letter codes, or literal
 * digit strings. "twenty twenty five c i zero four nine six two"
 * → "2025CI04962".
 */
export function extractIdentifierRuns(text: string): string[] {
  const tokens = tokenize(text);
  const runs: string[] = [];
  let current = '';
  let i = 0;
  const push = (s: string) => { current += s; };
  const flush = () => {
    if (current.length >= 4) runs.push(current.toUpperCase());
    current = '';
  };
  while (i < tokens.length) {
    const t = tokens[i];
    if (/^\d+$/.test(t)) { push(t); i++; continue; }
    if (t in TEENS) { push(TEENS[t]); i++; continue; }
    if (t in TENS) {
      const next = tokens[i + 1];
      if (next && next in UNITS && next !== 'oh' && next !== 'o') {
        push(String(TENS[t] + Number(UNITS[next])));
        i += 2;
      } else {
        push(String(TENS[t]));
        i++;
      }
      continue;
    }
    if (t in UNITS) { push(UNITS[t]); i++; continue; }
    if (t === 'double' && tokens[i + 1] && tokens[i + 1] in UNITS) {
      push(UNITS[tokens[i + 1]].repeat(2));
      i += 2;
      continue;
    }
    // Letter tokens only join a run that already has content or is followed
    // by number content — avoids swallowing ordinary words.
    if (isLetterToken(t) && (current.length > 0 || nextIsNumeric(tokens, i + 1))) {
      push(t);
      i++;
      continue;
    }
    // "dash"/"number" connectors inside a run don't break it.
    if ((t === 'dash' || t === 'number') && current.length > 0) { i++; continue; }
    flush();
    i++;
  }
  flush();
  return runs;
}

function nextIsNumeric(tokens: string[], i: number): boolean {
  const t = tokens[i];
  return t !== undefined && (/^\d+$/.test(t) || t in UNITS || t in TEENS || t in TENS);
}

/** Canonical form for comparing identifiers: alphanumerics only, uppercase. */
export function canonicalId(id: string): string {
  return id.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

export interface IdentifierMatch {
  /** The known identifier as stored (e.g. "26-CR-01452"). */
  known: string;
  /** The spoken run that matched it. */
  spoken: string;
  distance: number;
}

/**
 * Match extracted runs against a known identifier list at edit distance ≤2
 * (windowed, so extra leading/trailing spoken digits don't break the match).
 * Short identifiers get a tighter budget — distance 2 on 6 characters is noise.
 */
export function matchIdentifiers(text: string, known: string[]): IdentifierMatch[] {
  const runs = extractIdentifierRuns(text);
  const out: IdentifierMatch[] = [];
  for (const k of known) {
    const canon = canonicalId(k);
    if (canon.length < 5) continue;
    const budget = canon.length >= 9 ? 2 : 1;
    let best: IdentifierMatch | null = null;
    for (const run of runs) {
      const d = bestWindowDistance(run, canon);
      if (d <= budget && (!best || d < best.distance)) {
        best = { known: k, spoken: run, distance: d };
      }
    }
    if (best) out.push(best);
  }
  return out;
}

/** Ten-digit phone matching (distance ≤1) against known party phones. */
export function matchPhones(text: string, knownPhones: string[]): IdentifierMatch[] {
  // Letter components carry no phone information — compare digits only.
  const runs = extractIdentifierRuns(text).map((r) => r.replace(/\D/g, ''))
    .filter((r) => r.length >= 7);
  const out: IdentifierMatch[] = [];
  for (const k of knownPhones) {
    const digits = k.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '').slice(0, 10);
    if (digits.length < 10) continue;
    let best: IdentifierMatch | null = null;
    for (const run of runs) {
      const d = bestWindowDistance(run, digits);
      if (d <= 1 && (!best || d < best.distance)) {
        best = { known: k, spoken: run, distance: d };
      }
    }
    if (best) out.push(best);
  }
  return out;
}
