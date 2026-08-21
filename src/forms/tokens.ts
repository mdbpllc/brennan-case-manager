/**
 * Token registry and parser.
 *
 * The syntax is RULED — `form-engine.md` §3, FC-1 to FC-4 (2026-08-18):
 *
 *  FC-1  Canonical form is `{token}` — single brace, bare name. That is the
 *        stored form, the form the editor displays, and the form new templates
 *        are written in. The importer ACCEPTS legacy conventions and EMITS
 *        canonical; legacy forms are never written back.
 *  FC-2  Per-spot formatting lives in TEMPLATE SETTINGS, not in token text. A
 *        legacy `|filter` translates into a settings entry on import.
 *  FC-3  Bracket handling on import is an ALLOWLIST, never a pattern match.
 *  FC-4  The `[s]` plural marker converts to a grammar flex point.
 *
 * Michael's master skeleton (supplied 2026-08-20) is written entirely in the
 * legacy double-brace convention — 92 distinct tokens, 155 occurrences, zero
 * single-brace. It is left exactly as delivered: it is the geometry authority
 * and byte-preservation is the whole point of the engine. FC-1's "accept both,
 * emit one" is honoured at the boundary instead — this parser reads both, and
 * everything the system STORES or DISPLAYS is canonical.
 */

/** Where a token's value comes from (§10's token registry). */
export type TokenKind =
  /** Read straight off a case/party/client record. */
  | 'static'
  /** Derived from gender or party count by the grammar engine. */
  | 'inflected'
  /** Compiled from wizard answers — `{treatment_clause}` and its siblings. */
  | 'computed';

export interface TokenRef {
  /** Bare canonical name, e.g. `provider_name`. */
  name: string;
  /** Legacy `|filter` text if the source carried one, else undefined (FC-2). */
  filter?: string;
  /** Which convention the source used — for reporting, never for storage. */
  convention: 'canonical' | 'legacy-double-brace';
  /** Offset of the whole token in the source string. */
  index: number;
  /** The matched source text, e.g. `{{x|default: y}}`. */
  raw: string;
}

export interface TokenDefinition {
  name: string;
  kind: TokenKind;
  /** Human description shown in the editor's token palette. */
  description: string;
  /** Dotted path into the render context for `static` tokens. */
  sourcePath?: string;
  /** Per-variant checklist driving a `computed` token (§4 interview cards). */
  variantChecklist?: string[];
  /** Stock answer carried by the master, harvested from a legacy `|default:`. */
  defaultValue?: string;
  /** True when an absent value drops the whole line (legacy `|optional:`). */
  optional?: boolean;
}

// ------------------------------------------------------------- parsing

const LEGACY_RE = /\{\{([^{}]+)\}\}/g;
// A single-brace token that is NOT part of a double-brace pair.
const CANONICAL_RE = /(?<!\{)\{([^{}]+)\}(?!\})/g;

const REGION_PREFIX = /^[#/]/;

function splitFilter(body: string): { name: string; filter?: string } {
  const pipe = body.indexOf('|');
  if (pipe < 0) return { name: body.trim() };
  return { name: body.slice(0, pipe).trim(), filter: body.slice(pipe + 1).trim() };
}

/**
 * Every token reference in a string, both conventions, in source order.
 * Region markers (`#each`, `/each`, `#table`, `#select`, `#case`) are excluded —
 * they are structure, not substitution; `parseRegions` handles those.
 */
export function parseTokens(text: string): TokenRef[] {
  const out: TokenRef[] = [];
  for (const m of text.matchAll(LEGACY_RE)) {
    if (REGION_PREFIX.test(m[1].trim())) continue;
    const { name, filter } = splitFilter(m[1]);
    out.push({ name, filter, convention: 'legacy-double-brace', index: m.index, raw: m[0] });
  }
  for (const m of text.matchAll(CANONICAL_RE)) {
    if (REGION_PREFIX.test(m[1].trim())) continue;
    const { name, filter } = splitFilter(m[1]);
    out.push({ name, filter, convention: 'canonical', index: m.index, raw: m[0] });
  }
  return out.sort((a, b) => a.index - b.index);
}

/**
 * FC-1 limb 1, applied: rewrite any legacy token to canonical `{name}` and hand
 * back the filters that were stripped, so the caller can record them as
 * template settings (FC-2) rather than losing them.
 */
export function toCanonical(text: string): { text: string; settings: Record<string, string> } {
  const settings: Record<string, string> = {};
  const rewritten = text.replace(LEGACY_RE, (raw, body: string) => {
    if (REGION_PREFIX.test(body.trim())) return raw; // regions are handled structurally
    const { name, filter } = splitFilter(body);
    if (filter) settings[name] = filter;
    return `{${name}}`;
  });
  return { text: rewritten, settings };
}

/** Distinct canonical token names in a string, in first-appearance order. */
export function tokenNames(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of parseTokens(text)) {
    if (!seen.has(t.name)) { seen.add(t.name); out.push(t.name); }
  }
  return out;
}

// ------------------------------------------------------------- regions

export type RegionKind = 'each' | 'table' | 'select';

export interface RegionMarker {
  kind: RegionKind | 'case';
  /** Region name, or the case value for a `case` marker. */
  name: string;
  open: boolean;
}

/**
 * Read a region marker out of a paragraph's text, if it is one.
 *
 * The master delimits its repeat regions with `{{#each name}}` … `{{/each name}}`,
 * `{{#table name}}` for repeating table rows, and
 * `{{#select f}}{{#case v}}…{{/case}}{{/select f}}` for the expert-narrative
 * archetypes, each on its own 10pt grey italic marker paragraph so a human can
 * see them and a parser can strip them.
 *
 * NOTE — UNRULED, and deliberately not resolved here. The region syntax has no
 * FC ruling: FC-1 governs scalar tokens only. `REQ-CAPTURE_disclosures-master-
 * skeleton_2026-08-20.md` §5 Q1 puts the question to the design side and says
 * the regions, not the syntax, are the requirement. So these markers are read
 * as delimiters of structure the renderer already knows how to handle (the
 * §12.3 span-capture-and-rebuild mechanic) and no canonical region syntax is
 * minted. Recorded in `docs/spec-feedback.md`.
 */
export function parseRegionMarker(paragraphText: string): RegionMarker | null {
  // Anchored at the start but NOT at the end: the master annotates one marker
  // in the margin — `{{#table provider_charge_row}}  (one row per provider;
  // TOTAL row = sum)` — and an end-anchored match would silently fail to see
  // it, leaving the marker to render into the served document.
  const m = paragraphText.trim().match(/^\{\{([#/])(each|table|select|case)\s*([^}]*)\}\}/);
  if (!m) return null;
  const open = m[1] === '#';
  const kind = m[2] as RegionKind | 'case';
  return { kind, name: m[3].trim(), open };
}

/** True when a paragraph is nothing but a region marker — such paragraphs are
 *  stripped from the output, never rendered. */
export function isMarkerParagraph(paragraphText: string): boolean {
  return parseRegionMarker(paragraphText) !== null;
}

// ------------------------------------- FC-3 bracket allowlist / FC-4 [s]

/**
 * The ONLY bracket strings that are tokens. FC-3 is explicit that this is an
 * allowlist and never a pattern match: the mined corpus carries 147
 * `[signature block on next page]` drafting notes, 80 `[s]` markers, and Texas
 * citation parentheticals like `[1st Dist.]`, every one of which a pattern
 * match would silently turn into a data field.
 */
export const BRACKET_ALLOWLIST: Record<string, string> = {
  '[s]': '{plural_s}',
};

/** FC-4: convert registered bracket markers, leave every other bracket alone. */
export function convertBrackets(text: string): string {
  let out = text;
  for (const [bracket, canonical] of Object.entries(BRACKET_ALLOWLIST)) {
    out = out.split(bracket).join(canonical);
  }
  return out;
}

// ------------------------------------------------------------ resolution

export interface TokenContext {
  /** Scalar values by canonical token name. */
  values: Record<string, string>;
  /** Stock answers harvested from the master's `|default:` filters. */
  defaults?: Record<string, string>;
  /** Tokens whose absence drops the line rather than leaving a blank. */
  optional?: Set<string>;
}

export interface ResolutionResult {
  text: string;
  /** Tokens that had no value and no default — the FE-10 lint's raw material. */
  unresolved: string[];
  /** True when an `optional` token was absent, meaning drop the line entirely. */
  dropLine: boolean;
}

/**
 * Substitute every token in a string.
 *
 * Substitution NEVER guesses. A token with no value and no default is left in
 * place and reported: the render lint turns that into a hard gate, because a
 * served document carrying a visible placeholder is precisely defect D-5 in the
 * exemplar this master was built to correct.
 */
export function resolveTokens(text: string, ctx: TokenContext): ResolutionResult {
  const unresolved: string[] = [];
  let dropLine = false;

  const substitute = (raw: string, body: string): string => {
    if (REGION_PREFIX.test(body.trim())) return raw;
    const { name } = splitFilter(body);
    const value = ctx.values[name];
    // A key that is PRESENT resolves, even to the empty string. Absent and
    // empty are different facts: a defendant with no fax line has an empty fax,
    // and reporting that as "unresolved" would bury the tokens that genuinely
    // have no source under a pile of legitimately blank ones. Callers that mean
    // "no value" omit the key.
    if (value !== undefined) {
      if (value === '' && ctx.optional?.has(name)) { dropLine = true; return ''; }
      return value;
    }
    if (ctx.optional?.has(name)) { dropLine = true; return ''; }
    const fallback = ctx.defaults?.[name];
    if (fallback !== undefined) return fallback;
    unresolved.push(name);
    return raw;
  };

  const out = text
    .replace(LEGACY_RE, (raw, body: string) => substitute(raw, body))
    .replace(CANONICAL_RE, (raw, body: string) => substitute(raw, body));

  return { text: out, unresolved: [...new Set(unresolved)], dropLine };
}

/**
 * Harvest the stock answers and optional-line markers the master carries in its
 * legacy filters, so they become template settings (FC-2) instead of being
 * discarded on import.
 */
export function harvestFilters(text: string): {
  defaults: Record<string, string>;
  optional: Set<string>;
} {
  const defaults: Record<string, string> = {};
  const optional = new Set<string>();
  for (const t of parseTokens(text)) {
    if (!t.filter) continue;
    const colon = t.filter.indexOf(':');
    const verb = (colon < 0 ? t.filter : t.filter.slice(0, colon)).trim();
    const body = colon < 0 ? '' : t.filter.slice(colon + 1).trim();
    if (verb === 'default') defaults[t.name] = body;
    else if (verb === 'optional') { optional.add(t.name); defaults[t.name] = body; }
  }
  return { defaults, optional };
}
