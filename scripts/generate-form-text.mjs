/**
 * GENERATOR — `form-engine.md` §9 into TypeScript, by program.
 *
 * WHY THIS EXISTS. `src/forms/variants.ts` says on its own face that it was
 * "GENERATED, NOT TYPED … sliced out of `docs/specs/form-engine.md` §9 by
 * program", but the program was never committed: at HEAD `7d57421` the only
 * script in the tree was `build-toc-fixtures.mjs`, and `git log --all` shows no
 * generator has ever existed under `scripts/`. The FE-D1 amendment slice
 * anticipates exactly that and directs the build to "write and commit the
 * generator if it is not in the tree" (fe-d1-amendment-slice.md §13 item 2,
 * §6.4). This is that program.
 *
 * "Verbatim" is only enforceable MECHANICALLY. §9's heading carries a
 * do-not-rewrite bar and Michael approved those twelve paragraphs word for
 * word, so no session retypes them: this reads the spec and writes the strings
 * through unchanged, and the drift tests re-read the spec and fail on any
 * divergence.
 *
 * TWO OUTPUTS, ONE SOURCE:
 *   src/forms/variants.ts       — the twelve approved paragraphs (voice
 *                                 examples since 2026-08-22, widget B).
 *   src/forms/fixedSentences.ts — the BASIS and CAUSATION sentences the app
 *                                 PLACES, keyed by provider type (RC-1,
 *                                 2026-08-31), sliced out of the same twelve by
 *                                 the anchors §6.4 states.
 *
 * Run:  node scripts/generate-form-text.mjs          (writes both files)
 *       node scripts/generate-form-text.mjs --check  (writes nothing; exits 1
 *                                                     if either file is stale)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const SPEC = join(REPO, 'docs', 'specs', 'form-engine.md');
const VARIANTS_OUT = join(REPO, 'src', 'forms', 'variants.ts');
const FIXED_OUT = join(REPO, 'src', 'forms', 'fixedSentences.ts');

const CHECK_ONLY = process.argv.includes('--check');

// --------------------------------------------------------------- failure

class GeneratorError extends Error {}

function assert(condition, message) {
  if (!condition) throw new GeneratorError(message);
}

// ---------------------------------------------------------------- parse

/**
 * Read §9's variant blocks.
 *
 * The shape §9 actually uses, verified against the file: a `### 9.N Title`
 * heading, a blank line, ONE `> ` blockquote line carrying the whole approved
 * paragraph, and an optional `Notes: ` line. §9.8 carries an extra
 * `{baseline_clause}` line between the two, and §9.10 carries no notes at all —
 * both are handled rather than assumed away.
 */
function parseSection9(spec) {
  const lines = spec.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith('## 9. APPROVED VARIANT LIBRARY'));
  assert(start >= 0, 'form-engine.md: could not find the "## 9. APPROVED VARIANT LIBRARY" heading');

  const variants = [];
  let baselineClauseSpec = '';
  let deliberateGap = '';
  let current = null;

  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];

    // §9 ends at the next top-level heading.
    if (/^## /.test(line)) break;

    const heading = line.match(/^### (9\.\d+) (.+)$/);
    if (heading) {
      if (current) variants.push(current);
      current = { section: heading[1], title: heading[2].trim(), body: '', notes: '' };
      continue;
    }

    if (/^### Deliberate gap/.test(line)) {
      if (current) variants.push(current);
      current = null;
      // The gap's own paragraph is the next non-blank line.
      for (let j = i + 1; j < lines.length && !/^## /.test(lines[j]); j++) {
        if (lines[j].trim() !== '') { deliberateGap = lines[j].trim(); break; }
      }
      continue;
    }

    if (!current) continue;

    if (line.startsWith('> ')) {
      assert(current.body === '', `§${current.section}: more than one blockquote line`);
      current.body = line.slice(2);
      continue;
    }
    if (line.startsWith('Notes: ')) {
      current.notes = line.slice('Notes: '.length);
      continue;
    }
    // §9.8's conditional baseline clause, carried verbatim.
    if (line.startsWith('`{baseline_clause}`')) baselineClauseSpec = line.trim();
  }
  if (current) variants.push(current);

  assert(variants.length === 12, `§9 should carry twelve variants; parsed ${variants.length}`);
  for (const v of variants) assert(v.body !== '', `§${v.section}: no blockquote body found`);
  assert(baselineClauseSpec !== '', '§9.8: the {baseline_clause} line was not found');
  assert(deliberateGap !== '', '§9: the Deliberate gap paragraph was not found');

  return { variants, baselineClauseSpec, deliberateGap };
}

// ----------------------------------------------------------------- keys

/**
 * The stored template key for a variant.
 *
 * These keys are STORED DATA — the seed and the database agree on them — so the
 * slug rule is followed by an equality check against the twelve keys that are
 * already in the bank. A retitled section then fails the generator loudly
 * instead of silently re-keying rows that a served document points at.
 */
function slugKey(title) {
  const withoutParenthetical = title.replace(/\s*\([^)]*\)\s*$/, '');
  const slug = withoutParenthetical
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `disclosures-variant-${slug}`;
}

const EXPECTED_KEYS = [
  'disclosures-variant-emergency-medicine',
  'disclosures-variant-radiologist',
  'disclosures-variant-emt-paramedic',
  'disclosures-variant-chiropractor',
  'disclosures-variant-pain-management',
  'disclosures-variant-orthopedic-surgeon',
  'disclosures-variant-neurosurgeon',
  'disclosures-variant-primary-care-family-practice',
  'disclosures-variant-physical-therapist',
  'disclosures-variant-pharmacy',
  'disclosures-variant-custodian-of-records-only',
  'disclosures-variant-mid-level-rider',
];

// ------------------------------------------------------- sentence slicing

/**
 * Slice one sentence out of an approved paragraph by its ANCHORS.
 *
 * §6.4 states the anchors rather than the sentences, deliberately: a sentence
 * quoted into this file would be a second copy of approved text and the copy
 * would be the thing that drifts. The slice is inclusive of both anchors and is
 * byte-exact by construction.
 */
function sliceBetween(body, openAnchor, closeAnchor, label) {
  const start = body.indexOf(openAnchor);
  assert(start >= 0, `${label}: opening anchor not found — ${JSON.stringify(openAnchor)}`);
  const closeAt = body.indexOf(closeAnchor, start + openAnchor.length);
  assert(closeAt >= 0, `${label}: closing anchor not found after the opening — ${JSON.stringify(closeAnchor)}`);
  const end = closeAt + closeAnchor.length;
  // A second occurrence of the opening anchor would make the slice ambiguous.
  assert(
    body.indexOf(openAnchor, start + openAnchor.length) < 0,
    `${label}: opening anchor occurs more than once; the slice would be ambiguous`,
  );
  return body.slice(start, end);
}

const BASIS_OPEN = '{provider_dr_name} will testify based on';
const BASIS_OPEN_PLURAL = '{provider_they} will testify based on';
const BASIS_CLOSE = 'research.';
const CAUSE_OPEN = 'Plaintiff anticipates {provider_dr_name} will testify that';
const CAUSE_OPEN_PLURAL = 'Plaintiff anticipates {provider_they} will testify that';
const CAUSE_CLOSE = '{incident_date}.';

function basisOf(bySection, section) {
  const body = bySection[section];
  assert(body !== undefined, `§${section} is not in §9`);
  const open = body.includes(BASIS_OPEN) ? BASIS_OPEN : BASIS_OPEN_PLURAL;
  return sliceBetween(body, open, BASIS_CLOSE, `§${section} basis`);
}

function causationOf(bySection, section) {
  const body = bySection[section];
  assert(body !== undefined, `§${section} is not in §9`);
  const open = body.includes(CAUSE_OPEN) ? CAUSE_OPEN : CAUSE_OPEN_PLURAL;
  return sliceBetween(body, open, CAUSE_CLOSE, `§${section} causation`);
}

/**
 * §6.4's source map, RULED — `AS-Q8a` for the four that borrow §9.1's causation.
 *
 * The four pain/ortho/neuro/PCP types take §9.1's causation sentence and NOT
 * their own, because their own carries a future-care clause and Michael put
 * future care in the writer's middle instead. Their own last sentence also
 * opens "will testify REGARDING", so the causation anchor would not match it —
 * the map and the anchors agree, which is the point.
 */
const SOURCE_MAP = [
  { type: 'emergency-medicine', basis: '9.1', causation: '9.1' },
  { type: 'pain-management', basis: '9.5', causation: '9.1' },
  { type: 'orthopedic-surgery', basis: '9.5', causation: '9.1' },
  { type: 'neurosurgery', basis: '9.5', causation: '9.1' },
  { type: 'primary-care', basis: '9.5', causation: '9.1' },
  { type: 'chiropractic', basis: '9.4', causation: '9.4' },
  { type: 'physical-therapy', basis: '9.9', causation: '9.9' },
  { type: 'prehospital-ems', basis: '9.3', causation: '9.3' },
  { type: 'radiologist', basis: '9.2', causation: '9.2' },
  { type: 'other-physician', basis: '9.1', causation: '9.1' },
];

const RIDER_TAIL_ANCHOR = 'will testify consistent with';
const RIDER_SUBJECT = '{midlevel_short_name} ';

function buildFixedSentences(variants) {
  const bySection = {};
  for (const v of variants) bySection[v.section] = v.body;

  const rows = [];
  for (const entry of SOURCE_MAP) {
    rows.push({
      key: `fixed:basis:${entry.type}`,
      slot: 'basis',
      providerType: entry.type,
      sourceSection: entry.basis,
      text: basisOf(bySection, entry.basis),
    });
    rows.push({
      key: `fixed:causation:${entry.type}`,
      slot: 'causation',
      providerType: entry.type,
      sourceSection: entry.causation,
      text: causationOf(bySection, entry.causation),
    });
  }

  // §6.4's stated equalities, asserted rather than trusted.
  const b95 = basisOf(bySection, '9.5');
  for (const s of ['9.6', '9.7', '9.8']) {
    assert(
      basisOf(bySection, s) === b95,
      `§6.4 asserts §9.5–§9.8 share one basis sentence, but §${s} differs from §9.5`,
    );
  }
  assert(
    causationOf(bySection, '9.4') === causationOf(bySection, '9.1'),
    '§6.4 asserts §9.4\'s causation equals §9.1\'s (the 2026-08-31 "medical probability" ruling); they differ',
  );

  // The rider's scope sentence — AS-Q8c. Its subject is the mid-level's
  // rendered short name; everything from "will testify consistent with" on is
  // §9.12 verbatim, and that equality is asserted here so the row can never
  // drift away from the approved tail.
  const midlevel = bySection['9.12'];
  const tailAt = midlevel.indexOf(RIDER_TAIL_ANCHOR);
  assert(tailAt >= 0, '§9.12: the rider tail anchor "will testify consistent with" was not found');
  const riderTail = midlevel.slice(tailAt);
  rows.push({
    key: 'fixed:rider-scope:mid-level',
    slot: 'rider-scope',
    providerType: 'mid-level',
    sourceSection: '9.12',
    text: RIDER_SUBJECT + riderTail,
  });

  // The custodian-only shape places §9.11 WHOLE — AS-Q7a. Both approved
  // sentences, the `**` emphasis included, untouched.
  rows.push({
    key: 'fixed:custodian-only-whole:custodian-only',
    slot: 'custodian-only-whole',
    providerType: 'custodian-only',
    sourceSection: '9.11',
    text: bySection['9.11'],
  });

  return rows;
}

// ---------------------------------------------------------------- emit

const GENERATED_BANNER = (what) => `/**
 * ${what}
 *
 * GENERATED BY \`scripts/generate-form-text.mjs\` — DO NOT EDIT BY HAND.
 * Every string below was sliced out of \`docs/specs/form-engine.md\` §9 by
 * program and written through unchanged. §9 carries a do-not-rewrite bar —
 * "approved by Michael verbatim" — so the build copies, it never rewords.
 * Correct the spec in the design space and re-run the generator; a drift test
 * re-reads the spec and fails the suite rather than letting a divergence reach
 * a served document.
 */`;

function emitVariants({ variants, baselineClauseSpec, deliberateGap }) {
  const entries = variants.map((v) => {
    const key = slugKey(v.title);
    return `  {
    key: ${JSON.stringify(key)},
    section: ${JSON.stringify(v.section)},
    title: ${JSON.stringify(v.title)},
    body: ${JSON.stringify(v.body)},
    notes: ${JSON.stringify(v.notes)},
  },`;
  }).join('\n');

  return `${GENERATED_BANNER('§9 APPROVED VARIANT LIBRARY — seeded as template DATA, verbatim.')}

/**
 * Since 2026-08-22 (widget B) these twelve are VOICE EXAMPLES for the writer,
 * not output; since 2026-08-31 (\`RC-1\`) their BASIS and CAUSATION sentences are
 * the source text of the fixed-sentence table in \`./fixedSentences\`, which is
 * what the app actually places. They are not reworded, not retired and not
 * edited by that change — only their job changed.
 *
 * The deliberate gap at the end of §9 is carried here too: there is NO
 * mental-health variant, intentionally. §5.1's Richardson Motorsports hard gate
 * routes any treating psychologist/psychiatrist to manual drafting. A future
 * session must not "helpfully" fill it.
 */

/** One approved narrative paragraph, keyed for the template bank. */
export interface DisclosureVariant {
  /** Stable template key — the seed and the database agree on this. */
  key: string;
  /** Spec section this came from, e.g. "9.4". */
  section: string;
  /** Human label, as §9 titles it. */
  title: string;
  /** The approved paragraph, VERBATIM. Tokens are in the master's convention. */
  body: string;
  /** §9's own notes on the variant — drafting guidance, not document text. */
  notes: string;
}

export const DISCLOSURE_VARIANTS: DisclosureVariant[] = [
${entries}
];

/**
 * §9.8's conditional baseline clause, carried verbatim from the spec line that
 * defines it. Rendered only when the PCP interview card answers "treated before
 * the incident" = Yes (§4 item 4).
 */
export const BASELINE_CLAUSE_SPEC = ${JSON.stringify(baselineClauseSpec)};

/**
 * §9's closing paragraph, verbatim. Stated here so the absence is legible as a
 * decision rather than as an oversight.
 */
export const DELIBERATE_GAP = ${JSON.stringify(deliberateGap)};

/** Variant keys, for the wizard's picker. */
export const VARIANT_KEYS = DISCLOSURE_VARIANTS.map((v) => v.key);

export function variantByKey(key: string): DisclosureVariant | undefined {
  return DISCLOSURE_VARIANTS.find((v) => v.key === key);
}
`;
}

function emitFixedSentences(rows) {
  const entries = rows.map((r) => `  {
    key: ${JSON.stringify(r.key)},
    slot: ${JSON.stringify(r.slot)},
    providerType: ${JSON.stringify(r.providerType)},
    sourceSection: ${JSON.stringify(r.sourceSection)},
    text: ${JSON.stringify(r.text)},
  },`).join('\n');

  return `${GENERATED_BANNER('THE FIXED SENTENCES — what the app PLACES, keyed by provider type.')}

/**
 * \`RC-1\` (2026-08-31), in Michael's words: "The app puts the sentences in there
 * with the model writing the rest around them." These are those sentences.
 *
 * Two per treating type — the BASIS sentence (slot 2 of the paragraph) and the
 * CAUSATION sentence (slot 4, always last) — plus the mid-level rider's scope
 * sentence and §9.11 whole for the custodian-only shape. Each is a byte-exact
 * slice of \`form-engine.md\` §9, taken by the anchors the amendment slice §6.4
 * states, never by a sentence quoted into this file: a quoted copy is the thing
 * that would drift.
 *
 * AS-Q8a is why four types borrow §9.1's causation sentence rather than their
 * own: §9.5–§9.8's last sentence carries a future-care clause, and future care
 * belongs in the writer's middle instead.
 *
 * NOT here, by ruling: \`pharmacy\`, \`mental-health\`, \`other-non-physician\` and
 * \`retained\` place no fixed sentence at all.
 */

/** Which piece of a paragraph a fixed sentence is. */
export type FixedSentenceSlot = 'basis' | 'causation' | 'rider-scope' | 'custodian-only-whole';

export interface FixedSentence {
  /** Stored template key, \`fixed:<slot>:<type>\`. */
  key: string;
  slot: FixedSentenceSlot;
  /** The provider type whose paragraph places it. */
  providerType: string;
  /** The §9 section the text was sliced out of, e.g. "9.1". */
  sourceSection: string;
  /** The approved sentence, VERBATIM. */
  text: string;
}

export const FIXED_SENTENCES: FixedSentence[] = [
${entries}
];

export function fixedSentence(slot: FixedSentenceSlot, providerType: string): FixedSentence | undefined {
  return FIXED_SENTENCES.find((f) => f.slot === slot && f.providerType === providerType);
}

/** The types that own a fixed basis/causation pair, in source-map order. */
export const FIXED_PAIR_SOURCE_TYPES = FIXED_SENTENCES
  .filter((f) => f.slot === 'basis')
  .map((f) => f.providerType);
`;
}

// ----------------------------------------------------------------- main

function main() {
  const spec = readFileSync(SPEC, 'utf8');
  const parsed = parseSection9(spec);

  const keys = parsed.variants.map((v) => slugKey(v.title));
  assert(
    JSON.stringify(keys) === JSON.stringify(EXPECTED_KEYS),
    'the generated template keys no longer match the twelve keys already in the bank.\n'
    + `  generated: ${JSON.stringify(keys, null, 2)}\n`
    + '  These keys are STORED DATA. If a §9 heading was retitled deliberately, update\n'
    + '  EXPECTED_KEYS here AND migrate the stored rows — never let them re-key silently.',
  );

  const fixed = buildFixedSentences(parsed.variants);

  const outputs = [
    { path: VARIANTS_OUT, text: emitVariants(parsed), label: 'src/forms/variants.ts' },
    { path: FIXED_OUT, text: emitFixedSentences(fixed), label: 'src/forms/fixedSentences.ts' },
  ];

  let stale = 0;
  for (const out of outputs) {
    let existing = null;
    try { existing = readFileSync(out.path, 'utf8'); } catch { existing = null; }
    if (existing === out.text) {
      console.log(`  up to date  ${out.label}`);
      continue;
    }
    stale++;
    if (CHECK_ONLY) {
      console.error(`  STALE       ${out.label}`);
      continue;
    }
    writeFileSync(out.path, out.text);
    console.log(`  written     ${out.label}`);
  }

  console.log(`\n§9 → ${parsed.variants.length} variants, ${fixed.length} fixed-sentence rows.`);
  if (CHECK_ONLY && stale > 0) {
    console.error('\nRe-run `node scripts/generate-form-text.mjs` and commit the result.');
    process.exit(1);
  }
}

try {
  main();
} catch (err) {
  if (err instanceof GeneratorError) {
    console.error(`\ngenerate-form-text: ${err.message}\n`);
    process.exit(1);
  }
  throw err;
}
