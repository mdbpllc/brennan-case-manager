// FIRM OBLIGATIONS — the seed catalog as code data.
//
// Authority: docs/specs/firm-obligations-build-slice.md §3 item 3, §2.3, §6
// (FOD-9, FOD-30, FOD-33), §7 item 18 and §8; docs/specs/firm-obligations-module-spec.md
// §7 as AMENDED by its §16 (where they disagree §16 governs — it names the eight
// lapse rows and the twelve go-live rows). FOS-1 RULED YES by Michael 2026-09-10
// ("Yes").
//
// NO STRING IS TYPED HERE. Every text field — the name, the four display cells,
// the source note, "Applies if", the §7.3 note — is sliced or joined at load from
// `./firmObligationCatalog.generated`, which a program copied out of SPEC §7 byte
// for byte (scripts/generate-firm-obligation-catalog.mjs). What IS typed here is
// what the spec states as structure and the rulings state as sets: the rule kind
// read off each Kind / anchor cell, the dates and intervals that cell itself
// states, the eight lapse rows (FOM-2), the twelve suggested rows (DECISION 9B)
// and the five rows the spec seeds inactive. The drift test re-reads the spec and
// checks every one of them against its text.
//
// A TEMPLATE IS AN OFFER, NEVER AN OBLIGATION. "The seed catalog creates nothing
// active" (FOD-9):
//  - `templateRule` is a display HINT beside the activation form's date input,
//    never a pre-filled date — activation "requires the date" (FOD-30). It never
//    carries an anchorDate or a dueOn.
//  - `suggestedAtGoLive` renders a "suggested" mark; "the flag activates nothing"
//    (slice §3 item 3).
//  - `weekendRule` is the literal 'unknown' on every row, BY TYPE: the roll
//    defaults come with the later registry act (slice §2.3; DECISION 8), and no
//    roll is inferred from a cite or a source note (slice §8).
//  - No money field, no externalRef or ledgerRef (DECISION 5); no assignee or
//    owner badge (DECISIONS 1 and 4; FOM-15); no holiday; no roll.

import {
  FIRM_OBLIGATION_CATALOG_ROWS, catalogCell,
  type FirmObligationCatalogKey, type FirmObligationCatalogRow, type FirmObligationCatalogSection,
} from './firmObligationCatalog.generated';
import {
  defaultMissedPeriods,
  type FirmObligationCategory, type MissedPeriods, type OwnerScope, type Precision,
  type RecurrenceRule, type RuleKind, type Weight,
} from './firmObligations';

export interface FirmObligationTemplate {
  /** `FOT-n`, or `boi-note`. Becomes the obligation's `templateKey` at activation. */
  key: FirmObligationCatalogKey;
  /** The Template cell's first bold span, sliced — never retyped. */
  name: string;
  /** The SPEC §7 table the row sits in. */
  section: FirmObligationCatalogSection;
  category: FirmObligationCategory;
  /** DECISION 4 (`FO-5` closed): §7.1–§7.2 `attorney`, the rest `firm`. Nothing
   *  on screen at the solo stage (FOM-15). */
  ownerScope: OwnerScope;
  /** The kind the Kind / anchor cell names. */
  kind: RuleKind;
  /** Only where the cell names more than one kind (FOT-18); `kind` is the first. */
  kindOptions?: RuleKind[];
  /** ONLY what the row itself states of the rule — a hint beside the date input,
   *  never a date (FOD-30; FOD-9). Empty where the anchor is his date. */
  templateRule: Partial<RecurrenceRule>;
  precision: Precision;
  /** Spec §3.2's per-kind default (DECISION 2); the per-obligation override is his. */
  missedPeriods: MissedPeriods;
  /** FOM-2's "Can lapse per period" — the ONLY templates offered Not applicable (FOD-18). */
  conditionalPerPeriod: boolean;
  /** Slice §2.3: `unknown` on EVERY template, typed as the literal so no row can ship a roll. */
  weekendRule: 'unknown';
  /** The Lead cell's day count; null where the cell names none — FOD-2's 30
   *  applies at activation (FOD-30 pre-fills from here). */
  leadDays: number | null;
  /** The Weight cell's first `hard` or `routine`; null where it names neither. */
  weight: Weight | null;
  /** DECISION 9B — renders a "suggested" mark. Activates NOTHING. */
  suggestedAtGoLive: boolean;
  /** The row's own cell says seeded or created INACTIVE (FOD-33's seeded-inactive rows). */
  createdInactive: boolean;
  /** §7.1–§7.6: the Source and Status cells joined; §7.7: the Status / note cell. */
  sourceNote: string;
  /** FOM-2's "Applies if": the Conditional on cell, where it says more than "—". */
  appliesIf?: string;
  /** §7.3's Note column. */
  catalogNote?: string;
  /** The four display cells, verbatim. */
  templateText: string;
  kindAnchorText: string;
  leadText: string;
  weightText: string;
}

/** U+2014, the spec's empty cell — built from its code point, never a typed look-alike. */
const EM_DASH = String.fromCodePoint(0x2014);

/**
 * The join between the Source and Status cells of a §7.1–§7.6 `sourceNote`. SPEC §7
 * keeps the two in separate columns and slice §3 item 3 asks for one
 * "cite-and-status string"; the shape follows SPEC §3.1's own example of the field,
 * "Tex. Gov't Code § 81.054(j) — UNVERIFIED" (cite, " — ", status). Both halves are
 * byte-for-byte cells; this separator is the only text written here. Stated, not
 * fixed: several Source cells already contain " — " (FOT-1, FOT-3, FOT-4, FOT-10,
 * FOT-13, FOT-14, FOT-21, the BOI row), so the joined string does not show where
 * the source ends and the status begins — a text act for the hands-on sitting.
 */
const SOURCE_STATUS_JOIN = ` ${EM_DASH} `; // PROVISIONAL — no FOD-n names this join; the build's reading of slice §3 item 3

/** Spec §3.1's categories, by the §7 table. §7.4 (Texas) and §7.5 (federal and
 *  employment) share `tax-entity-and-employment`. */
const SECTION_CATEGORY: Record<FirmObligationCatalogSection, FirmObligationCategory> = {
  '7.1': 'licensing',
  '7.2': 'court-appointments',
  '7.3': 'practice-rules',
  '7.4': 'tax-entity-and-employment',
  '7.5': 'tax-entity-and-employment',
  '7.6': 'insurance',
  '7.7': 'infrastructure',
};

/** DECISION 4: the licensing and court-appointment tables are attorney-scoped. */
const ATTORNEY_SECTIONS: ReadonlySet<FirmObligationCatalogSection> = new Set<FirmObligationCatalogSection>(['7.1', '7.2']);

interface Reading {
  kind: RuleKind;
  kindOptions?: RuleKind[];
  rule?: Partial<RecurrenceRule>;
  precision?: Precision;
}

/**
 * Each row's Kind / anchor cell, read by hand into the domain's rule shape —
 * ONLY what the cell itself states. An anchor that is HIS date (a statement
 * date, a policy's renewal date, "HIS DATE", "undated", "per the plan", "a day he
 * picks") states nothing here: the form takes his date (FOD-30). `everyYears`
 * is set only where the cell writes `everyYears: N`; an annual anniversary
 * leaves it to the kind's default of 1. The drift test checks every kind, date,
 * interval, `everyYears` and month precision below against the cell's text.
 */
const READINGS: Record<FirmObligationCatalogKey, Reading> = {
  'FOT-1': { kind: 'anniversary', precision: 'month' },
  'FOT-2': { kind: 'anniversary' },
  // The cell adds "(4 once the (b) condition holds)" — his fact, at activation.
  'FOT-3': { kind: 'anniversary', rule: { everyYears: 2 } },
  'FOT-4': { kind: 'fixed-annual', rule: { month: 10, day: 15 } },
  'FOT-5': { kind: 'anniversary' },
  'FOT-6': { kind: 'fixed-monthly' },
  'FOT-7': { kind: 'anniversary' },
  'FOT-8': { kind: 'fixed-annual', rule: { month: 5, day: 15 } },
  // The cell states May 15 as the form date in practice and marks it NOT READ;
  // the hint carries what the row states, and the cell beside it says NOT READ.
  'FOT-9': { kind: 'fixed-annual', rule: { month: 5, day: 15 } },
  'FOT-10': { kind: 'fixed-annual', rule: { month: 4, day: 15 } },
  'FOT-11': { kind: 'fixed-annual', rule: { month: 1, day: 31 } },
  'FOT-12': { kind: 'anniversary', rule: { everyYears: 10 } },
  'FOT-13': { kind: 'fixed-annual', rule: { month: 1, day: 31 } },
  // In the cell's own order — periodLabel reads the quarters from the list (FOM-7).
  'FOT-14': {
    kind: 'fixed-quarterly',
    rule: { dates: [{ month: 4, day: 30 }, { month: 7, day: 31 }, { month: 10, day: 31 }, { month: 1, day: 31 }] },
  },
  'FOT-15': { kind: 'fixed-annual', rule: { month: 1, day: 31 } },
  // The cell gives the dates in words, not as dates, and marks them NOT READ: none carried.
  'FOT-16': { kind: 'fixed-quarterly' },
  'FOT-17': { kind: 'fixed-annual', rule: { month: 1, day: 31 } },
  // The cell names BOTH kinds. The quarterly estimates are `kind` with their four
  // dates in the cell's order; the entity return's annual date is one of two the
  // cell names (which one is HIS FACT), so no annual date is carried.
  'FOT-18': {
    kind: 'fixed-quarterly',
    kindOptions: ['fixed-quarterly', 'fixed-annual'],
    rule: { dates: [{ month: 4, day: 15 }, { month: 6, day: 15 }, { month: 9, day: 15 }, { month: 1, day: 15 }] },
  },
  'FOT-19': { kind: 'anniversary' },
  'FOT-20': { kind: 'anniversary' },
  'FOT-21': { kind: 'anniversary', rule: { everyYears: 4 } },
  'FOT-22': { kind: 'interval-from-completion', rule: { days: 91 } },
  'FOT-23': { kind: 'interval-from-completion', rule: { days: 91 } },
  'FOT-24': { kind: 'fixed-monthly' },
  'FOT-25': { kind: 'anniversary', precision: 'month' },
  'FOT-26': { kind: 'anniversary' },
  'FOT-27': { kind: 'anniversary' },
  'FOT-28': { kind: 'anniversary' },
  'FOT-29': { kind: 'one-time' },
  'FOT-30': { kind: 'one-time' },
  'FOT-31': { kind: 'anniversary' },
  'FOT-32': { kind: 'one-time' },
  'FOT-33': { kind: 'one-time' },
  'FOT-34': { kind: 'one-time' },
  'FOT-35': { kind: 'anniversary' },
  // The row names no kind. Carried as an undated one-time so it can sit inactive
  // with its note — the build's reading, reported; it states no rule.
  'boi-note': { kind: 'one-time' },
};

/** FOM-2 as SPEC §16 records it — EXACTLY these eight. §7's own cells flag four of
 *  them; §16 governs. The ONLY templates offered Not applicable (FOD-18). */
const CONDITIONAL_PER_PERIOD: ReadonlySet<FirmObligationCatalogKey> = new Set<FirmObligationCatalogKey>([
  'FOT-8', 'FOT-10', 'FOT-11', 'FOT-13', 'FOT-14', 'FOT-15', 'FOT-16', 'FOT-17',
]);

/** DECISION 9B — Michael's stated go-live activations (SPEC §16; slice §3 item 3).
 *  A mark in the catalog, never an activation: nothing is seeded active in
 *  Supabase mode (FOD-9, FOD-21). */
const SUGGESTED_AT_GO_LIVE: ReadonlySet<FirmObligationCatalogKey> = new Set<FirmObligationCatalogKey>([
  'FOT-1', 'FOT-2', 'FOT-4', 'FOT-6', 'FOT-8', 'FOT-9', 'FOT-19', 'FOT-22', 'FOT-23', 'FOT-24', 'FOT-25', 'FOT-27',
]);

/** The rows whose own cell says so: seeded INACTIVE (FOT-7's and the BOI row's
 *  Kind / anchor cells) or created inactive (FOT-32–FOT-34's Status / note cells). */
const CREATED_INACTIVE: ReadonlySet<FirmObligationCatalogKey> = new Set<FirmObligationCatalogKey>([
  'FOT-7', 'FOT-32', 'FOT-33', 'FOT-34', 'boi-note',
]);

/** The name is the Template cell's FIRST bold span — the cell goes on to describe
 *  the duty, and sometimes carries a second bold span (FOT-1's fee note). */
function firstBoldSpan(cell: string, key: string): string {
  const open = cell.indexOf('**');
  const close = open < 0 ? -1 : cell.indexOf('**', open + 2);
  if (close <= open + 2) throw new Error(`firm-obligation catalog: ${key}'s Template cell carries no bold name`);
  return cell.slice(open + 2, close);
}

/** "45 d" → 45; a cell naming no number ("—") → null, and FOD-2's 30 applies at
 *  activation. A number in any other shape is not guessed at: it throws. */
function leadDaysOf(cell: string, key: string): number | null {
  if (!/\d/.test(cell)) return null;
  const m = /^(\d+) d\b/.exec(cell);
  if (!m) throw new Error(`firm-obligation catalog: ${key}'s Lead cell ${JSON.stringify(cell)} is not "<n> d"`);
  return Number(m[1]);
}

/** The Weight cell's first `hard` or `routine`; the cell may go on to give the
 *  weight's reason (FOT-6, FOT-9, FOT-28). Null where it names neither. */
function weightOf(cell: string): Weight | null {
  const m = /\b(hard|routine)\b/.exec(cell);
  return m ? (m[1] as Weight) : null;
}

function buildTemplate(row: FirmObligationCatalogRow): FirmObligationTemplate {
  const { key, section, cells } = row;
  const reading = READINGS[key];
  const templateText = catalogCell(key, 'Template');
  const kindAnchorText = catalogCell(key, 'Kind / anchor');
  const leadText = catalogCell(key, 'Lead');
  const weightText = catalogCell(key, 'Weight');
  const sourceNote = section === '7.7'
    ? catalogCell(key, 'Status / note')
    : catalogCell(key, 'Source') + SOURCE_STATUS_JOIN + catalogCell(key, 'Status');
  const appliesIf = cells['Conditional on'];
  const catalogNote = cells['Note'];

  return {
    key,
    name: firstBoldSpan(templateText, key),
    section,
    category: SECTION_CATEGORY[section],
    ownerScope: ATTORNEY_SECTIONS.has(section) ? 'attorney' : 'firm',
    kind: reading.kind,
    ...(reading.kindOptions ? { kindOptions: [...reading.kindOptions] } : {}),
    templateRule: { ...reading.rule },
    precision: reading.precision ?? 'day',
    missedPeriods: defaultMissedPeriods(reading.kind),
    conditionalPerPeriod: CONDITIONAL_PER_PERIOD.has(key),
    weekendRule: 'unknown',
    leadDays: leadDaysOf(leadText, key),
    weight: weightOf(weightText),
    suggestedAtGoLive: SUGGESTED_AT_GO_LIVE.has(key),
    createdInactive: CREATED_INACTIVE.has(key),
    sourceNote,
    ...(appliesIf !== undefined && appliesIf !== EM_DASH ? { appliesIf } : {}),
    ...(catalogNote !== undefined ? { catalogNote } : {}),
    templateText,
    kindAnchorText,
    leadText,
    weightText,
  };
}

/** FOT-1–FOT-35 in order, then the BOI note. (SPEC §7 prints the BOI row inside
 *  §7.5; the generator asserts the FOT rows arrive in order.) */
export const FIRM_OBLIGATION_TEMPLATES: readonly FirmObligationTemplate[] = [
  ...FIRM_OBLIGATION_CATALOG_ROWS.filter((r) => r.key !== 'boi-note'),
  ...FIRM_OBLIGATION_CATALOG_ROWS.filter((r) => r.key === 'boi-note'),
].map(buildTemplate);

export function templateByKey(key: string): FirmObligationTemplate | undefined {
  return FIRM_OBLIGATION_TEMPLATES.find((t) => t.key === key);
}
