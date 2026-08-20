/**
 * Gate 10, front-end half — the ONE place that knows which registry fields have
 * left the `parties.fields` blob, and the guard that keeps them out of it.
 *
 * Authority: docs/specs/gate10-pii-frontend-slice.md §§2-4, authorized by
 * Michael's `G10-5` ruling 2026-08-19. Read that document's §6 before adding
 * anything here: every row in the schema slice's §6 is a design already
 * rejected, and it binds this half identically.
 *
 * WHY THIS MODULE EXISTS AT ALL, rather than the four keys being written at each
 * call site: the slice's §2 asks for the blob to be stripped "whatever the UI
 * hands it — belt and braces against a future widget writing the old shape."
 * A guard spread across call sites is a guard with holes in it. Every party
 * write in the app goes through `splitPartyFields`.
 *
 * THE KEY LIST IS DERIVED FROM THE REGISTRY, NEVER HAND-MAINTAINED. That is the
 * CD-1 role-tag pattern: a vocabulary computed from its source cannot drift out
 * of step with it. Add a `destination` to a field definition and this module
 * picks it up; there is no second list to update, and therefore no second list
 * to forget.
 */

import { PARTY_TYPES, type FieldDef, type FieldDestination } from './partyRegistry';

/** The excluded child row. Provenance columns are the schema half's; the app
 *  never writes them (`G10-1` went provenance-only and the audit limb is owed
 *  to `O-1`). */
export interface PartyPii {
  partyId: string;
  ssn?: string | null;
  driversLicense?: string | null;
  driversLicenseState?: string | null;
}

/** What a party write decomposes into once destinations are honoured. */
export interface SplitPartyWrite {
  /** The blob, with every destination-bearing key REMOVED. */
  fields: Record<string, unknown>;
  /** `parties.date_of_birth`, or undefined if this write says nothing about it. */
  dateOfBirth?: string | null;
  /** The child-table patch, or undefined if this write says nothing about it. */
  pii?: Omit<PartyPii, 'partyId'>;
}

function allFieldDefs(): FieldDef[] {
  return PARTY_TYPES.flatMap((t) => t.fields);
}

/**
 * Every registry key carrying a storage destination, across ALL party types.
 *
 * Deliberately not scoped to one party type: the guard must strip `ssn` from a
 * write against ANY type, including one that does not declare it. A blob key
 * arriving on a type that never rendered it is exactly the regression the
 * belt-and-braces rule in §2 is aimed at, and scoping the guard by type would
 * let it through.
 */
export function destinationKeys(): Map<string, FieldDestination> {
  const out = new Map<string, FieldDestination>();
  for (const f of allFieldDefs()) {
    if (!f.destination) continue;
    const prior = out.get(f.key);
    if (prior && (prior.table !== f.destination.table || prior.column !== f.destination.column)) {
      // Two party types declaring the same key with DIFFERENT homes would make
      // "where does this value live" unanswerable. Fail loudly at module use
      // rather than silently picking one.
      throw new Error(
        `partyRegistry: field '${f.key}' declares conflicting storage destinations ` +
        `(${prior.table}.${prior.column} vs ${f.destination.table}.${f.destination.column})`,
      );
    }
    out.set(f.key, f.destination);
  }
  return out;
}

/** The child-table keys, in registry order. */
export function piiFieldKeys(): string[] {
  return [...destinationKeys().entries()]
    .filter(([, d]) => d.table === 'party_pii')
    .map(([k]) => k);
}

/** True when this registry field is masked on every render (§4). */
export function isMasked(def: FieldDef): boolean {
  return def.sensitive === true;
}

/**
 * THE WRITE-GUARD. Strips every destination-bearing key from a `fields` object.
 *
 * Called on every party write by `splitPartyFields`, and exported so a caller
 * that builds a blob by hand can apply it directly. It does not mutate its
 * argument.
 */
export function stripDestinationKeys(fields: Record<string, unknown>): Record<string, unknown> {
  const keys = destinationKeys();
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (keys.has(k)) continue;
    out[k] = v;
  }
  return out;
}

function asStringOrNull(v: unknown): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  return s === '' ? null : s;
}

/**
 * Route one party write by destination.
 *
 * Given whatever the UI hands over, returns the blob to store (guarded), the
 * typed DOB, and the child-table patch. A key absent from `fields` produces no
 * claim about that column — the difference between "set it to empty" and "say
 * nothing about it" matters on an update, and collapsing them would let a form
 * that never rendered SSN wipe a stored one.
 */
export function splitPartyFields(fields: Record<string, unknown>): SplitPartyWrite {
  const keys = destinationKeys();
  const out: SplitPartyWrite = { fields: stripDestinationKeys(fields) };
  const pii: Record<string, string | null> = {};
  let sawPii = false;

  for (const [key, dest] of keys) {
    if (!(key in fields)) continue; // says nothing about this column
    const value = asStringOrNull(fields[key]);
    if (dest.table === 'parties' && dest.column === 'date_of_birth') {
      out.dateOfBirth = value;
      continue;
    }
    if (dest.table === 'party_pii') {
      sawPii = true;
      if (dest.column === 'ssn') pii.ssn = value;
      else if (dest.column === 'drivers_license') pii.driversLicense = value;
      else if (dest.column === 'drivers_license_state') pii.driversLicenseState = value;
      else throw new Error(`partyPii: unmapped party_pii column '${dest.column}' for field '${key}'`);
    }
  }
  if (sawPii) out.pii = pii;
  return out;
}

/**
 * Re-assemble the registry-shaped `fields` object a FORM renders, from the row's
 * blob plus its typed values.
 *
 * The form still renders one flat field set — that is the registry's contract
 * and §2 keeps it — so the split is invisible above this line. Callers that must
 * not see PII (list views) simply do not pass `pii`.
 */
export function mergePartyFields(
  fields: Record<string, unknown>,
  dateOfBirth?: string | null,
  pii?: Omit<PartyPii, 'partyId'> | null,
): Record<string, unknown> {
  const keys = destinationKeys();
  const out: Record<string, unknown> = { ...stripDestinationKeys(fields) };
  for (const [key, dest] of keys) {
    if (dest.table === 'parties' && dest.column === 'date_of_birth') {
      if (dateOfBirth !== undefined && dateOfBirth !== null) out[key] = dateOfBirth;
      continue;
    }
    if (!pii) continue;
    if (dest.column === 'ssn' && pii.ssn) out[key] = pii.ssn;
    if (dest.column === 'drivers_license' && pii.driversLicense) out[key] = pii.driversLicense;
    if (dest.column === 'drivers_license_state' && pii.driversLicenseState) out[key] = pii.driversLicenseState;
  }
  return out;
}

/**
 * Overlay the child-table values onto a field set that is ALREADY assembled.
 *
 * This is not `mergePartyFields` with a missing argument, and the difference is
 * a real defect that reached a running page. `mergePartyFields` rebuilds the
 * flat set FROM A STORED RECORD: it strips every destination key first, so a
 * stale blob copy cannot come back. Calling it a second time over live form
 * state — to add the revealed PII — strips the destination keys again and then
 * declines to restore `dob`, because the typed value was not passed. The
 * observable effect was that revealing an SSN silently cleared the date of
 * birth on the form, and the next save persisted the clearing.
 *
 * So: rebuild from a record with `mergePartyFields`; overlay onto existing
 * state with this. Caught in the browser, not by a unit test, which is why the
 * regression test for it asserts the SEQUENCE rather than either call alone.
 */
export function applyPii(
  fields: Record<string, unknown>,
  pii?: Omit<PartyPii, 'partyId'> | null,
): Record<string, unknown> {
  const out = { ...fields };
  for (const [key, dest] of destinationKeys()) {
    if (dest.table !== 'party_pii') continue;
    if (dest.column === 'ssn') out[key] = pii?.ssn ?? '';
    if (dest.column === 'drivers_license') out[key] = pii?.driversLicense ?? '';
    if (dest.column === 'drivers_license_state') out[key] = pii?.driversLicenseState ?? '';
  }
  return out;
}

/** True when the child-table patch carries nothing at all — used to avoid
 *  writing an empty PII row into existence for a party that has none. */
export function isEmptyPii(p?: Omit<PartyPii, 'partyId'>): boolean {
  if (!p) return true;
  return !p.ssn && !p.driversLicense && !p.driversLicenseState;
}

/**
 * §4 display mask. SSN takes the established `•••–••–` + last four; a licence
 * number takes the analog rather than the SSN shape, because a licence rendered
 * in SSN punctuation reads as an SSN.
 *
 * Masking is a DISPLAY property and never a storage one — the `sensitive` flag
 * meant only this before gate 10, and it still means only this. What changed is
 * that it is no longer the only protection.
 */
export function maskValue(key: string, value: unknown): string {
  const s = value === undefined || value === null ? '' : String(value);
  if (s === '') return '';
  const last4 = s.slice(-4);
  if (key === 'ssn') return `•••–••–${last4}`;
  return `${'•'.repeat(Math.max(0, Math.min(8, s.length - last4.length)))}${last4}`;
}

/**
 * The §5 pre-flip report, as a pure predicate over one party's blob.
 *
 * TWO KEY LISTS, LABELLED, and the distinction is load-bearing rather than
 * pedantry: on the RULED EIGHT alone a stored driver's licence number would have
 * come back CLEAN, because none of the ruled list's four licence guesses matches
 * this app's actual keys (`dlNumber` / `dlState`). That is the schema slice's
 * stated heuristic limit turning out to be real on first contact, and it is why
 * the as-built list exists.
 *
 * BOTH LISTS ARE EXTRACTED FROM `db/migrations/2026-08-19-gate10-pii-columns.sql`,
 * the ruled source, and are NOT retyped. A first draft of this module invented a
 * plausible-looking ruled eight out of memory - `socialSecurityNumber`, `ssnLast4`
 * and the rest - which shares only THREE keys with the real list and would have
 * made the report answer a different question than the one that was ruled.
 */
export const RULED_EIGHT_KEYS = [
  'dob', 'date_of_birth', 'ssn', 'social_security',
  'dl', 'drivers_license', 'driver_license', 'license_number',
] as const;

/** The keys this app actually writes today, on the build session's evidence. */
export const AS_BUILT_KEYS = ['dob', 'ssn', 'dlNumber', 'dlState'] as const;

export interface PreFlipHit {
  partyId: string;
  displayName: string;
  list: 'ruled-eight' | 'as-built';
  keys: string[];
}

export function preFlipScan(
  parties: { id: string; displayName: string; fields: Record<string, unknown> }[],
): PreFlipHit[] {
  const hits: PreFlipHit[] = [];
  for (const p of parties) {
    const present = (list: readonly string[]) =>
      list.filter((k) => {
        const v = (p.fields ?? {})[k];
        return v !== undefined && v !== null && String(v).trim() !== '';
      });
    const ruled = present(RULED_EIGHT_KEYS);
    if (ruled.length) hits.push({ partyId: p.id, displayName: p.displayName, list: 'ruled-eight', keys: ruled });
    const built = present(AS_BUILT_KEYS);
    if (built.length) hits.push({ partyId: p.id, displayName: p.displayName, list: 'as-built', keys: built });
  }
  return hits;
}
