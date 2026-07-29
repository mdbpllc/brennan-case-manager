// Client dimension (CL-2) — the case owns the occurrence and liability; the
// CLIENT owns the damages. Design: docs/specs/claimant-dimension-and-case-links-design.md.
//
// `case_clients` sits PARALLEL to `case_parties`, not as a promotion of it
// (D-CL2-8, adopted by Michael 2026-07-28): `case_parties` stays authoritative
// for ROLES, `case_clients` is authoritative for DAMAGES SCOPE.

/** D-CL2-1. 'mixed' is deliberately admissible so a future mixed-posture value
 *  does not need a constraint migration; nothing writes it yet. */
export type ClientPosture = 'claimant' | 'defendant' | 'mixed';

export const CLIENT_POSTURES: ClientPosture[] = ['claimant', 'defendant'];

/** How the limitations date on this client was arrived at. Descriptive only —
 *  NO tolling is computed or inferred anywhere (§3.2.1, ruled). */
export type SolBasis = 'standard' | 'minor-tolled' | 'survival-tolled' | 'manual';

export const SOL_BASES: SolBasis[] = ['standard', 'minor-tolled', 'survival-tolled', 'manual'];

/** Client-scoped flags. Only Medicare/Medicaid moved here (D-CL2-5) — the
 *  occurrence flags (trucking, product, government defendant, death,
 *  minor/incapacitated) stay FILE-level and must not be "fixed" back. */
export type ClientFlag = 'Medicare/Medicaid beneficiary';

export const CLIENT_FLAGS: ClientFlag[] = ['Medicare/Medicaid beneficiary'];

/** Per-client fee arrangement (§3.1). Creates the per-client HOME for the fee
 *  terms; it does NOT decide the time tracker's one-rate-per-case question —
 *  D-CL2-3 stays OPEN (log #27, reaffirmed at the CL-2 build). */
export interface FeeArrangement {
  type?: 'contingency' | 'hourly' | 'flat' | 'other';
  /** Whole percent, e.g. 33.33. Advisory display only — no fee math is computed. */
  contingencyPercent?: number;
  note?: string;
}

export interface CaseClient {
  id: string;
  caseId: string;
  /** The party carrying the client role. `on delete restrict` in Postgres:
   *  deleting a client party must not silently cascade away their bills. */
  partyId: string;
  posture: ClientPosture;
  displayOrder: number;
  statuteOfLimitations?: string;
  solBasis?: SolBasis;
  clientFlags: ClientFlag[];
  feeArrangement: FeeArrangement;
  /** Shape driven by the DERIVED practice-area profile — never an override (§3.0.1). */
  profileFields: Record<string, unknown>;
  /** Set when this client's funds are DISBURSED. D-CL2-4a: shares lock here.
   *  D-CL2-2a: a disbursed client is "resolved" and drops out of the derived
   *  earliest-limitations calculation. Full settlement records are NOT built. */
  disbursedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** A case the backfill could not derive a client for — no client-role party.
 *  NEVER guessed and NEVER given a placeholder (design §5, brief §1 piece 2).
 *
 *  `preservedStatuteOfLimitations` holds the date that was on
 *  `cases.statute_of_limitations` when the column was dropped, so a flagged
 *  case does not lose an attorney-entered date it had nowhere to put
 *  (Michael's ruling, 2026-07-28). It carries to the client record on resolve. */
export interface ClientBackfillFlag {
  id: string;
  caseId: string;
  reason: string;
  preservedStatuteOfLimitations?: string;
  resolvedAt?: string;
  createdAt: string;
}

/** D-CL2-2a (CLOSED): the case displays the EARLIEST limitations date across
 *  UNRESOLVED clients only — a settled client's expired clock must not keep a
 *  live matter showing false urgency. Derived and NON-WRITABLE: there is no
 *  case-level column behind this any more.
 *
 *  Returns undefined when no unresolved client carries a date. */
export function earliestLimitations(clients: CaseClient[]): string | undefined {
  const dates = clients
    .filter((c) => !isResolved(c))
    .map((c) => c.statuteOfLimitations)
    .filter((d): d is string => !!d);
  if (dates.length === 0) return undefined;
  return dates.reduce((a, b) => (a < b ? a : b));
}

/** "Resolved" means DISBURSED (D-CL2-4a), not "settled in principle". */
export function isResolved(client: CaseClient): boolean {
  return !!client.disbursedAt;
}

/** D-CL2-7 (RULED): a single-client case must look and click exactly as it does
 *  today — the client layer stays hidden until a second client exists. One
 *  enforcement point so the rule cannot drift between screens. */
export function showsClientLayer(clients: CaseClient[]): boolean {
  return clients.length > 1;
}

/** Sort order for selectors and ledgers: explicit displayOrder, then creation. */
export function sortClients(clients: CaseClient[]): CaseClient[] {
  return [...clients].sort(
    (a, b) => a.displayOrder - b.displayOrder || a.createdAt.localeCompare(b.createdAt),
  );
}
