// RELATIONSHIP LAYER (CD-1 §5, CD-2 edges) — typed links BETWEEN contacts.
//
// Design authority: docs/specs/contact-directory.md §5. Scope: cd1-build-slice.md
// item 4.
//
// ─── THE CL-1 FIREWALL (§5.3, RULED) ────────────────────────────────────────
// Contact-to-contact edges (this file) and case-to-case links (CL-1,
// `case_links`) NEVER merge, NEVER share a structure, and NEITHER EVER HOLDS
// THE OTHER'S KIND OF LINK. `case_links` does not exist in this repo and this
// slice does not create it; the D-CL1 queue items stay untouched and unruled.
// If a future need looks like "link these two cases," it does not belong here.
//
// ─── THE ONE-HOME RULE (§5.1, RULED) ────────────────────────────────────────
// Capacity references (roster.ts `Capacity.pointsAtContactId`) stay on the
// roster entry and NEVER auto-create an edge. "Appearing as next friend of the
// minor" is roster data; "is the minor's parent" is a directory edge. Related
// facts, different homes, entered separately. Nothing in this module writes
// itself from roster data.

/** Seeded from the roster capture's REQ-11 inventory (§5.2). The vocabulary is
 *  CONTROLLED AND EXTENSIBLE — adding a type is a SPEC-LEVEL ACT, not a code
 *  change made in passing. Reason on the record: downstream variant selectors
 *  (§6.1) and relationship-bearing boilerplate can only key off values the
 *  system knows; free text yields "employer", "Employer", and "works for" as
 *  three different relationships. */
export type ContactEdgeType =
  | 'employer-of'
  | 'owner-entrustor-of'
  | 'lessor-of'
  | 'parent-of'
  | 'affiliate-of'
  | 'insurer-of'
  | 'insurer-of-adverse-party'
  | 'principal-of'
  | 'registered-agent-of'
  | 'heir-of'
  | 'representative-of-estate-of'
  | 'next-of-kin-of'
  | 'spouse-of'
  | 'contractor-for'
  | 'manufacturer-of-goods-sold-by'
  | 'platform-for'
  | 'attorney-for'
  | 'bailee-of'
  | 'joint-enterprise-with'
  /** CD-14 (AS-Q11). Keep in step with db/schema.sql's own CHECK. */
  | 'renders-care-at';

export interface ContactEdgeTypeDef {
  key: ContactEdgeType;
  /** Reads FROM -> TO. Directionality is the whole point: an insurer of an
   *  adverse party is not the same fact read backwards. */
  label: string;
  /** How the same edge reads from the TO side, for display on that contact. */
  inverseLabel: string;
  /** True when the relation is genuinely mutual, so direction is presentational
   *  only (spouse, joint enterprise, affiliate). */
  symmetric?: boolean;
  note?: string;
}

export const CONTACT_EDGE_TYPES: ContactEdgeTypeDef[] = [
  { key: 'employer-of', label: 'is the employer of', inverseLabel: 'is employed by', note: 'Carrier-driver; insurer-adjuster; store-employee; governmental unit-employee (REQ-11).' },
  { key: 'owner-entrustor-of', label: 'entrusted a vehicle to', inverseLabel: 'was entrusted a vehicle by', note: 'Negligent-entrustment posture (REQ-02b).' },
  { key: 'lessor-of', label: 'leases equipment to', inverseLabel: 'leases equipment from', note: 'Fleet leasing, distinct from the operating employer (REQ-03).' },
  { key: 'parent-of', label: 'is the parent entity of', inverseLabel: 'is a subsidiary of' },
  { key: 'affiliate-of', label: 'is affiliated with', inverseLabel: 'is affiliated with', symmetric: true, note: 'Insurer/carrier groups; premises LLC families with related naming (REQ-11).' },
  { key: 'insurer-of', label: 'insures', inverseLabel: 'is insured by', note: 'First-party.' },
  { key: 'insurer-of-adverse-party', label: 'is the insurer of the adverse party', inverseLabel: 'is the adverse party insured by', note: 'Case-scoped by nature — see edgeScopeAdvice.' },
  { key: 'principal-of', label: 'is a principal of', inverseLabel: 'has as a principal', note: 'Entity + principals constellation (REQ-08).' },
  { key: 'registered-agent-of', label: 'is the registered agent of', inverseLabel: 'has as registered agent', note: 'One service address can cover two defendants (REQ-08); overlapping agent addresses linked operator and owner (REQ-04).' },
  { key: 'heir-of', label: 'is an heir of', inverseLabel: 'has as an heir', note: 'Estate-adjacent cluster (REQ-10).' },
  { key: 'representative-of-estate-of', label: 'represents the estate of', inverseLabel: 'has as estate representative', note: 'Substitution by scire facias (REQ-10). NOT auto-created from roster capacity — one-home rule.' },
  { key: 'next-of-kin-of', label: 'is next of kin of', inverseLabel: 'has as next of kin' },
  { key: 'spouse-of', label: 'is the spouse of', inverseLabel: 'is the spouse of', symmetric: true, note: 'Usually implied by shared surname + address, rarely pled (REQ-11).' },
  { key: 'contractor-for', label: 'performed work for', inverseLabel: 'engaged as contractor' },
  { key: 'manufacturer-of-goods-sold-by', label: 'manufactured goods sold by', inverseLabel: 'sells goods manufactured by' },
  { key: 'platform-for', label: 'is the platform for', inverseLabel: 'drives on the platform of', note: 'TNC/rideshare (REQ-06).' },
  { key: 'attorney-for', label: 'is attorney for', inverseLabel: 'is represented by', note: 'Attorney is a ROLE on the same directory (§2.2); who-represents-whom is this edge, not a separate structure.' },
  { key: 'bailee-of', label: 'holds property as bailee of', inverseLabel: 'placed property with' },
  { key: 'joint-enterprise-with', label: 'is in joint enterprise with', inverseLabel: 'is in joint enterprise with', symmetric: true, note: 'Staffing entity behind the driver (REQ-03).' },
  // CD-14 (AS-Q11), 2026-09-03. A clinician renders care at a facility. Created
  // ONLY at Michael's promote click or by hand — THE MODEL NEVER CREATES AN
  // EDGE (§14.4, the OBGYN rule). Its PERIOD is what makes it usable: a doctor
  // who left a practice and returned needs two of them, which is why
  // effective_from joins the unique key (D-7).
  { key: 'renders-care-at', label: 'renders care at', inverseLabel: 'is a facility where care is rendered by', note: 'Individual -> organization. Created at promotion from a case provider record, with dates Michael confirms. A blank "to" means current.' },
];

export const CONTACT_EDGE_TYPE_MAP: Record<string, ContactEdgeTypeDef> = Object.fromEntries(
  CONTACT_EDGE_TYPES.map((t) => [t.key, t]),
);

export function isKnownEdgeType(key: string): key is ContactEdgeType {
  return key in CONTACT_EDGE_TYPE_MAP;
}

/** §5.1 (RULED): one directional typed edge structure, with OPTIONAL case scope.
 *  No case reference = a WORLD FACT (employer-of, parent/subsidiary, spouse).
 *  A case reference = true FOR THAT CASE (attorney-of-record-for, insurer of the
 *  adverse party here). Both kinds are in REQ-11's inventory, which is why the
 *  scope is optional rather than required or absent. */
export interface ContactEdge {
  id: string;
  fromContactId: string;
  toContactId: string;
  edgeType: ContactEdgeType;
  /** undefined = world fact. */
  caseId?: string;
  /** CD-14's PERIOD. Both nullable; a blank `effectiveTo` means CURRENT.
   *
   *  A cleared `effectiveFrom` is NULL and means "current at every date" —
   *  deliberately, and D-56 says why: filling it silently from the first visit
   *  would assert that the affiliation BEGAN then, which is a fact about a real
   *  person's employment that nobody has. The promote dialog pre-fills it,
   *  shows it, and lets him clear it. */
  effectiveFrom?: string;
  effectiveTo?: string;
  note?: string;
  createdAt: string;
}

/** Advisory only — never blocks a save. Two edge types are case-scoped by their
 *  nature ("of the adverse party", "attorney for" in a matter); recording them
 *  as world facts is usually a mistake worth surfacing, but the attorney may
 *  know better (house counsel really is attorney-for in general). */
export function edgeScopeAdvice(edge: Pick<ContactEdge, 'edgeType' | 'caseId'>): string | null {
  const caseScopedByNature: ContactEdgeType[] = ['insurer-of-adverse-party', 'attorney-for'];
  if (!edge.caseId && caseScopedByNature.includes(edge.edgeType)) {
    return `"${CONTACT_EDGE_TYPE_MAP[edge.edgeType].label}" is usually true of a particular case — consider scoping it to one.`;
  }
  return null;
}

/** Reject only what is structurally impossible. Returns a message or null. */
export function validateEdge(edge: Pick<ContactEdge, 'fromContactId' | 'toContactId' | 'edgeType'>): string | null {
  if (!edge.fromContactId || !edge.toContactId) return 'An edge needs both contacts.';
  if (edge.fromContactId === edge.toContactId) return 'A contact cannot be linked to itself.';
  if (!isKnownEdgeType(edge.edgeType)) {
    return `Unknown relationship type "${edge.edgeType}". Adding one is a spec-level act (contact-directory.md §5.2).`;
  }
  return null;
}

/** How an edge reads on a given contact's page — from that contact's side. */
export function describeEdgeFor(contactId: string, edge: ContactEdge): string {
  const def = CONTACT_EDGE_TYPE_MAP[edge.edgeType];
  if (!def) return edge.edgeType;
  return contactId === edge.fromContactId ? def.label : def.inverseLabel;
}

/** Edges touching a contact, in either direction. */
export function edgesForContact(contactId: string, edges: ContactEdge[]): ContactEdge[] {
  return edges.filter((e) => e.fromContactId === contactId || e.toContactId === contactId);
}

/** World facts plus the edges scoped to this case — what a case roster shows. */
export function edgesInCaseScope(caseId: string, edges: ContactEdge[]): ContactEdge[] {
  return edges.filter((e) => !e.caseId || e.caseId === caseId);
}
