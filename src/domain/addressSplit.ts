/**
 * THE ADDRESS SPLIT RULE — stated ONCE, run ONCE, at the record.
 *
 * Michael ruled the shape on 2026-09-07 (`D1(iii)`, session-log `#149`;
 * `docs/specs/cc1-rulings-and-address-model-slice.md` §2.2 and §5.3), choosing
 * option (1) of three: ***"1"*** — split once, at the record, by the store step
 * and the data migration, each touched row MARKED, confirm-or-edit on the party
 * page, and **the render path never parses**.
 *
 * ⛔ **NOTHING IN THE RENDER PATH MAY CALL THIS.** `context.ts`, `generate.ts`
 * and `FormsTab.tsx` read two stored fields and split nothing. A location that
 * carries only the legacy one-line `address` renders NO street line and raises a
 * panel line instead (`SD-1`) — which is the observable proof that no render-time
 * parser exists, and is pinned by a test.
 *
 * The rule, from §5.3, and the SQL data migration
 * `db/migrations/2026-09-07-address-model-split.sql` implements the SAME rule
 * over `parties.fields`. Both are tested against the three cases below.
 */

/** `SD-6`. `'rule'` and `'rule-unsplit'` are what a machine did; `'hand'` is
 *  what Michael did — set by the confirm control, and by ANY save that touches
 *  either field. A record with no mark was never split and needs no confirming. */
export type AddressSplitMark = 'rule' | 'rule-unsplit' | 'hand';

/** The key the mark is stored under — on the party's `fields` for a `CONTACT`-
 *  shaped party, and on the `locations[]` ITEM for a facility. */
export const SPLIT_MARK_KEY = 'addressSplitBy';

export interface SplitAddress {
  addressLine1: string;
  cityStateZip: string;
  /** `'rule-unsplit'` when the rule could not find a city/state/ZIP line: the
   *  WHOLE value goes to the street line and nothing is invented. */
  mark: 'rule' | 'rule-unsplit';
}

/**
 * §5.3, verbatim in effect: trim; split on commas; fewer than three parts is
 * `'rule-unsplit'` (the whole value to `addressLine1`); otherwise the LAST TWO
 * parts joined by ", " are the city/state/ZIP line and everything before them,
 * joined by ", ", is the street line — so a suite stays with the street.
 *
 *   "400 Tourmaline Way, Suite 210, Rockvale, TX 78200"
 *      → "400 Tourmaline Way, Suite 210" / "Rockvale, TX 78200"
 *   "3100 S 31st St, Temple, TX"    → "3100 S 31st St" / "Temple, TX"
 *   "3100 S 31st St, Temple TX 76502" → 'rule-unsplit', whole value on line 1
 */
export function splitAddress(raw: string): SplitAddress {
  const value = (raw ?? '').trim();
  if (value === '') return { addressLine1: '', cityStateZip: '', mark: 'rule-unsplit' };

  const parts = value.split(',').map((p) => p.trim()).filter((p) => p !== '');
  if (parts.length < 3) {
    return { addressLine1: value, cityStateZip: '', mark: 'rule-unsplit' };
  }
  return {
    addressLine1: parts.slice(0, parts.length - 2).join(', '),
    cityStateZip: parts.slice(parts.length - 2).join(', '),
    mark: 'rule',
  };
}

/** True when this record still needs splitting: it carries a legacy one-line
 *  value and has not been given a street line. Idempotency lives here — a
 *  second pass over a split record finds nothing to do. */
export function needsSplit(rec: Record<string, unknown> | undefined): boolean {
  if (!rec) return false;
  const legacy = typeof rec.address === 'string' ? rec.address.trim() : '';
  const line1 = typeof rec.addressLine1 === 'string' ? rec.addressLine1.trim() : '';
  return legacy !== '' && line1 === '';
}

/**
 * Apply the rule to one record's fields, IN A COPY. The legacy `address` value
 * is NEVER removed (`SD-5`, and the slice's DO-NOT): the split is reversible by
 * hand because the source is still there.
 */
export function applySplit<T extends Record<string, unknown>>(rec: T): T {
  if (!needsSplit(rec)) return rec;
  const { addressLine1, cityStateZip, mark } = splitAddress(rec.address as string);
  return { ...rec, addressLine1, cityStateZip, [SPLIT_MARK_KEY]: mark };
}

/** The mark on a record, or undefined where none was ever set. */
export function splitMark(rec: Record<string, unknown> | undefined): AddressSplitMark | undefined {
  const v = rec?.[SPLIT_MARK_KEY];
  return v === 'rule' || v === 'rule-unsplit' || v === 'hand' ? v : undefined;
}

/** An UNCONFIRMED machine split — what the party page asks him to confirm and
 *  what raises one panel line per matter (`SD-1`, third line). */
export function isUnconfirmedSplit(rec: Record<string, unknown> | undefined): boolean {
  const m = splitMark(rec);
  return m === 'rule' || m === 'rule-unsplit';
}

/** `SD-6` — his touch is `'hand'`. Called by the confirm control (values
 *  unchanged) and by any save that edits either field. */
export function markHand<T extends Record<string, unknown>>(rec: T): T {
  return { ...rec, [SPLIT_MARK_KEY]: 'hand' as AddressSplitMark };
}

/**
 * `SD-4` — a `locations[]` item needs a STABLE id, because the R17 row selects a
 * location by it and an array index does not survive a reorder. Assigned on
 * save and by the migration; never regenerated for an item that has one.
 */
export function ensureLocationId(item: Record<string, unknown>): Record<string, unknown> {
  const id = typeof item.id === 'string' ? item.id.trim() : '';
  if (id !== '') return item;
  return { ...item, id: newLocationId() };
}

export function newLocationId(): string {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return `loc-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/** A facility's `locations[]`, normalised: every item has an id, and every item
 *  carrying only a legacy one-line address is split and marked. Used by the v16
 *  store step and by the party form's save path. */
export function normaliseLocations(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return (value as Record<string, unknown>[]).map((item) => applySplit(ensureLocationId(item)));
}

/**
 * One location, resolved for a case row.
 *
 * `facilityLocationId` names WHICH location treated the client (`D1(c)`).
 * `SD-8`: a facility with exactly ONE location auto-selects it, so a NULL id on
 * a single-location facility still resolves. Two or more with none selected
 * resolves to undefined — a PANEL line (`SD-10`), never a stop.
 */
export function resolveLocation(
  locations: unknown,
  facilityLocationId: string | undefined,
): Record<string, unknown> | undefined {
  const rows = Array.isArray(locations) ? (locations as Record<string, unknown>[]) : [];
  if (rows.length === 0) return undefined;
  if (facilityLocationId) return rows.find((r) => r.id === facilityLocationId);
  if (rows.length === 1) return rows[0];
  return undefined;
}
