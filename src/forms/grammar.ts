/**
 * The grammar engine — §3's inflection layer.
 *
 * Two jobs, both of which the exemplar got wrong by hand:
 *
 *  - PRONOUNS ARE DATA. Defect D-7: the served exemplar mixed he/his and
 *    she/her inside single sentences, because paragraphs were copied from a
 *    prior matter and edited by eye. No pronoun literal may survive in a
 *    template; every one resolves from a field on the party record.
 *  - SINGULAR/PLURAL is computed from party counts, with templates marking the
 *    flex points (`{defendant_plural_s}`, `{counsel_plural_s}`), which is also
 *    what FC-4's `[s]` marker converts into on import.
 *
 * Bare-pronoun discipline, from §3: `{provider_his_her}` renders "his", so a
 * template writes "his review" and NOT "his's review". Name-form tokens take
 * the apostrophe-s in the template text where possessive-by-name is wanted.
 */

/** Grammatical gender for pronoun selection. `unknown` is a real answer and is
 *  never silently defaulted to a gendered form. */
export type PronounSet = 'he' | 'she' | 'they' | 'unknown';

export interface Pronouns {
  subject: string;
  subjectCap: string;
  possessive: string;
  object: string;
  /** Plural-aware verb suffix: "specialize" vs "specializes". */
  verbS: string;
}

const TABLE: Record<Exclude<PronounSet, 'unknown'>, Pronouns> = {
  he: { subject: 'he', subjectCap: 'He', possessive: 'his', object: 'him', verbS: 's' },
  she: { subject: 'she', subjectCap: 'She', possessive: 'her', object: 'her', verbS: 's' },
  they: { subject: 'they', subjectCap: 'They', possessive: 'their', object: 'them', verbS: '' },
};

/**
 * Resolve a pronoun set.
 *
 * `unknown` returns the plural forms — the only choice that is never WRONG
 * about a person, where guessing "he" is wrong about half of them. The wizard
 * surfaces the unknown so it can be answered; it does not hide it behind a
 * plausible default.
 */
export function pronouns(set: PronounSet): Pronouns {
  if (set === 'unknown') return TABLE.they;
  return TABLE[set];
}

/** Read a pronoun set off a party record's free-form fields, honestly. */
export function pronounSetFromFields(fields: Record<string, unknown> | undefined): PronounSet {
  const raw = String(fields?.pronouns ?? fields?.gender ?? '').trim().toLowerCase();
  if (raw === 'he' || raw === 'him' || raw === 'his' || raw === 'male' || raw === 'm') return 'he';
  if (raw === 'she' || raw === 'her' || raw === 'hers' || raw === 'female' || raw === 'f') return 'she';
  if (raw === 'they' || raw === 'them' || raw === 'their') return 'they';
  return 'unknown';
}

/** The `[s]` flex point (FC-4): "" for one, "s" for many. */
export function pluralS(count: number): string {
  return count === 1 ? '' : 's';
}

/**
 * The SUBJECT a paragraph's fixed sentences speak in — the pronoun set that
 * `{provider_they}`, `{provider_their}` and the verb flex point all agree with.
 *
 * Two or more designated individuals speak as "they" whatever their own
 * pronouns are; one speaks in their own, which is `they` when nothing is on
 * record (D-11, and `pronouns`' own reason above).
 */
export function subjectPronounSet(count: number, individual: PronounSet): PronounSet {
  return count >= 2 ? 'they' : individual;
}

/**
 * The VERB flex point `{verb_s}`, and the reason it has to exist at all.
 *
 * `form-engine.md` §9.3 carries two opposite jobs in one sentence: the NOUN
 * "Emergency Medical Technician{s}" wants its s when there are MANY, and the
 * verb "specialize{verb_s}" wants its s when the SUBJECT is singular. A single
 * token cannot serve both — whatever value it took, one of the two read wrong,
 * and it read wrong in the shipped engine, where both flex points were pinned
 * to "" and the singular rendered "specialize". Michael ruled the split on
 * 2026-09-03 (`#147`, "second token, build names it"): `{s}` keeps the noun's
 * plural s and the build names the verb's. The approved sentence's WORDS did
 * not change.
 *
 * The verb agrees with the SUBJECT, not with a raw count, which is why this
 * reads the pronoun table's own `verbS` rather than counting: ONE technician
 * with no pronoun on record is "they specialize", not "they specializes". The
 * field has been on `Pronouns` since FE-D1 and had never been read.
 */
export function verbS(count: number, individual: PronounSet = 'unknown'): string {
  return pronouns(subjectPronounSet(count, individual)).verbS;
}

/** "A", "A and B", "A, B, and C" — the serial comma is the firm's own usage. */
export function joinNames(names: string[]): string {
  const clean = names.filter((n) => n.trim() !== '');
  if (clean.length === 0) return '';
  if (clean.length === 1) return clean[0];
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')}, and ${clean[clean.length - 1]}`;
}

/**
 * Compile the §4.2 treatment checklist into `{treatment_clause}`.
 *
 * Returns '' for an empty checklist rather than inventing a clause: a provider
 * whose treatment was never described gets no treatment sentence, and the lint
 * reports the empty token. Fabricating "evaluation and treatment" here would be
 * asserting a fact about care nobody recorded.
 */
export function treatmentClause(checked: string[], surgery?: string): string {
  const parts = [...checked];
  if (surgery && surgery.trim() !== '') parts.push(surgery.trim());
  return joinNames(parts);
}

/**
 * §4.3's future-care clause. Three shapes, per §3: nothing, generic, or a named
 * procedure. The named form reads as a continuation of "future medical care",
 * so it begins with a comma and not a capital.
 */
export function futureCareClause(named?: string): string {
  if (!named || named.trim() === '') return '';
  return `, including ${named.trim()},`;
}

/** Money for a document: grouped, two decimals, leading `$`. */
export function currency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * A long-form date, in CENTRAL time.
 *
 * §12.8 is emphatic and it cost a live run: the container clock is UTC, so an
 * evening session stamps TOMORROW's date. In that run the certificate of
 * service briefly carried the next day's date, which also inverted the deadline
 * analysis — a timely service read as one day late. Every date the engine
 * derives is computed against Michael's local timezone, and DT-1 says the same.
 */
export function longDateCentral(value: Date | string): string {
  // A DATE-ONLY string is a wall-clock date and carries no instant. Handing
  // "2025-03-14" to `new Date` parses it as UTC midnight, and formatting that
  // in America/Chicago rolls it back to the 13th — the incident date on a
  // served disclosure, off by one, every time. This is §12.8's defect in the
  // other direction, so date-only values are formatted from their own parts and
  // never routed through a timezone at all.
  if (typeof value === 'string') {
    const plain = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (plain) {
      const [, y, m, d] = plain;
      return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
    }
  }
  const dt = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(dt.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(dt);
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Today, Central. The timezone is named so the flow can state which it used. */
export function todayCentral(): string {
  return longDateCentral(new Date());
}
