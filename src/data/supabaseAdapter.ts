import { type SupabaseClient } from '@supabase/supabase-js';
import {
  assertPartyPatchKeys, type DataAdapter, type PartyCreate, type PartyPatch,
} from './adapter';
import type {
  CaseRecord, PartyRecord, CasePartyLink, RosterBackfillFlag,
} from '../domain/types';
import { withDirectoryDefaults } from '../domain/directory';
import { validateEdge, type ContactEdge } from '../domain/contactEdges';
import {
  validateCaseProvider,
  type CaseChronologyVersion, type CaseProvider, type CaseProviderIndividual,
  type CaseProviderVisit, type GeneratedDocumentParagraph,
} from '../domain/caseProviders';
import { stripDestinationKeys, isEmptyPii, type PartyPii } from '../domain/partyPii';
import type {
  MedicalBill, BillLineItem, CodeMapping, EOBRecord, AnalysisRun, AnalysisResultLine,
  ReviewLogEntry, LegalRule, FeeSchedule, FeeScheduleRate, GeneratedDocument,
  FacilityBillingProfile,
} from '../domain/billing';
import type { CalendarEvent } from '../domain/calendar';
import type {
  Transcript, TranscriptParticipant, StagingItem, RoutingDecision,
  GlossaryTerm, TagTemplate,
} from '../domain/transcripts';
import type { Charge, OaaIntakeRecord } from '../domain/oaa';
import type {
  StatuteChapter, StatuteChapterMeta, StatuteSection,
  RegistryVerificationSnapshot, WatchFlag,
} from '../domain/statutes';
import type { WatchTarget, TrackedBill, BillStatuteRef } from '../domain/bills';
import type {
  FormTemplate, FormTemplateVersion, FormTokenDefinition, FormFormatProfile,
} from '../forms/types';
import type { CaseClient, ClientBackfillFlag } from '../domain/client';
import { sortClients } from '../domain/client';
import { ATTORNEY_USER } from '../domain/billing';
import { localISODate } from '../domain/dates';
import {
  planActivation, planDone, planNotApplicable, planUndo, planOverride, planEdit, planRetire, planReactivate,
  plainText, formatDate, FIRM_OBLIGATION_ENTITY, FIRM_OCCURRENCE_ENTITY,
  type ActContext, type FirmObligation, type FirmObligationCreate, type FirmObligationOccurrence,
  type FirmObligationPatch, type LogDraft, type OutcomeReason,
} from '../domain/firmObligations';
import type { FirmCloseResult } from './adapter';

/**
 * Supabase adapter — the real central database (schema in db/schema.sql).
 * Activates automatically when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.
 * File numbers are generated server-side (next_file_number() in the schema), so numbers
 * stay gapless and race-free once multiple users are on the system.
 */

// Row shapes as stored in Postgres (snake_case)
interface CaseRow {
  id: string; file_number: string; legacy_ref: string | null; practice_area: string;
  case_type: string; caption: string | null; status: string; representation_type: string | null;
  commercial_policy_involved: boolean | null; pi_flags: string[] | null;
  // No statute_of_limitations — the column was DROPPED by the CL-2 migration
  // (D-CL2-2). The date lives on case_clients; the case displays the earliest
  // across unresolved clients, derived and non-writable.
  date_of_incident: string | null; date_opened: string;
  date_closed: string | null; court_name: string | null; cause_number: string | null;
  county: string | null; in_custody: boolean | null; custody_location: string | null;
  appointment_date: string | null;
  notes: string | null; created_at: string; updated_at: string;
}


interface PartyRow {
  id: string; party_type: string; kind: string; display_name: string;
  fields: Record<string, unknown>; created_at: string; updated_at: string;
  // CD-1 §3. Optional on the row type so a pre-migration database still reads.
  role_tags?: string[] | null;
  aliases?: unknown[] | null;
  deceased?: boolean | null;
  deceased_date?: string | null;
  // Gate 10 §2. Same reasoning: optional so a pre-migration database still reads.
  date_of_birth?: string | null;
}

/**
 * Gate 10 §3 — the explicit column list that replaces `select('*')` on `parties`.
 *
 * `select('*')` is the mechanism by which blob contents ride every read, and the
 * schema half alone does not close it: a `select *` on `parties` cannot return a
 * `party_pii` column (that IS the schema's protection), but it does return the
 * blob, which carries whatever was written before this slice landed and whatever
 * a future regression writes into it.
 *
 * `party_pii` columns are ABSENT from this list and must stay absent. There is
 * no join here and there is not meant to be one — §3, and the DO-NOT list.
 */
const PARTY_COLUMNS =
  'id, party_type, kind, display_name, fields, role_tags, aliases, deceased, deceased_date, ' +
  'date_of_birth, created_at, updated_at';

interface PartyPiiRow {
  party_id: string;
  ssn?: string | null;
  drivers_license?: string | null;
  drivers_license_state?: string | null;
}

function partyPiiFromRow(r: PartyPiiRow): PartyPii {
  return {
    partyId: r.party_id,
    ssn: r.ssn ?? null,
    driversLicense: r.drivers_license ?? null,
    driversLicenseState: r.drivers_license_state ?? null,
  };
}

interface LinkRow {
  id: string; case_id: string; party_id: string; role: string; side: string | null;
  note: string | null; created_at: string;
  // CD-1 §4. Same reasoning: optional so a pre-migration database still reads.
  story_role?: string | null;
  /** Tri-state — see linkFromRow. */
  caption_alignment?: string | null;
  party_status?: string | null;
  capacity_kind?: string | null;
  capacity_points_at_party_id?: string | null;
  joined_by?: string | null;
  active_state?: string | null;
  slot_role?: string | null;
}

interface ContactEdgeRow {
  id: string; from_contact_id: string; to_contact_id: string; edge_type: string;
  case_id: string | null; note: string | null; created_at: string;
}

interface RosterFlagRow {
  id: string; case_id: string; case_party_id: string; reason: string;
  unmapped_value: string | null; resolved_at: string | null; created_at: string;
}

function caseFromRow(r: CaseRow): CaseRecord {
  return {
    id: r.id, fileNumber: r.file_number, legacyRef: r.legacy_ref ?? undefined,
    practiceArea: r.practice_area as CaseRecord['practiceArea'], caseType: r.case_type,
    caption: r.caption ?? undefined, status: r.status,
    representationType: (r.representation_type ?? undefined) as CaseRecord['representationType'],
    commercialPolicyInvolved: r.commercial_policy_involved ?? undefined,
    piFlags: (r.pi_flags ?? []) as CaseRecord['piFlags'],
    dateOfIncident: r.date_of_incident ?? undefined, dateOpened: r.date_opened,
    dateClosed: r.date_closed ?? undefined,
    courtName: r.court_name ?? undefined, causeNumber: r.cause_number ?? undefined,
    county: r.county ?? undefined, inCustody: r.in_custody ?? undefined,
    custodyLocation: r.custody_location ?? undefined,
    appointmentDate: r.appointment_date ?? undefined,
    notes: r.notes ?? undefined, createdAt: r.created_at, updatedAt: r.updated_at,
  };
}


function caseToRow(c: Partial<CaseRecord>): Partial<CaseRow> {
  const row: Partial<CaseRow> = {};
  if (c.legacyRef !== undefined) row.legacy_ref = c.legacyRef || null;
  if (c.practiceArea !== undefined) row.practice_area = c.practiceArea;
  if (c.caseType !== undefined) row.case_type = c.caseType;
  if (c.caption !== undefined) row.caption = c.caption || null;
  if (c.status !== undefined) row.status = c.status;
  if (c.representationType !== undefined) row.representation_type = c.representationType || null;
  if (c.commercialPolicyInvolved !== undefined) row.commercial_policy_involved = c.commercialPolicyInvolved;
  if (c.piFlags !== undefined) row.pi_flags = c.piFlags;
  if (c.dateOfIncident !== undefined) row.date_of_incident = c.dateOfIncident || null;
  if (c.dateOpened !== undefined) row.date_opened = c.dateOpened;
  if (c.dateClosed !== undefined) row.date_closed = c.dateClosed || null;
  if (c.courtName !== undefined) row.court_name = c.courtName || null;
  if (c.causeNumber !== undefined) row.cause_number = c.causeNumber || null;
  if (c.county !== undefined) row.county = c.county || null;
  if (c.inCustody !== undefined) row.in_custody = c.inCustody ?? null;
  if (c.custodyLocation !== undefined) row.custody_location = c.custodyLocation || null;
  if (c.appointmentDate !== undefined) row.appointment_date = c.appointmentDate || null;
  if (c.notes !== undefined) row.notes = c.notes || null;
  return row;
}

function partyFromRow(r: PartyRow): PartyRecord {
  // withDirectoryDefaults covers a row read BEFORE the CD-1 migration has been
  // applied to that database — the app stays readable either way, and the
  // roleTags[0] = partyType contract is the same one the migration writes.
  return withDirectoryDefaults({
    id: r.id, partyType: r.party_type, kind: r.kind as PartyRecord['kind'],
    displayName: r.display_name, fields: r.fields ?? {},
    // Gate 10 §2 — the typed column, read on every party read by design.
    dateOfBirth: r.date_of_birth ?? null,
    roleTags: r.role_tags ?? undefined,
    aliases: (r.aliases ?? undefined) as PartyRecord['aliases'] | undefined,
    deceased: r.deceased ?? undefined,
    deceasedDate: r.deceased_date ?? undefined,
    createdAt: r.created_at, updatedAt: r.updated_at,
  });
}

function linkFromRow(r: LinkRow): CasePartyLink {
  return {
    id: r.id, caseId: r.case_id, partyId: r.party_id,
    role: r.role as CasePartyLink['role'], side: (r.side ?? undefined) as CasePartyLink['side'],
    note: r.note ?? undefined, createdAt: r.created_at,
    // CD-1 §4.2/§4.3. `caption_alignment` is tri-state on purpose: a JSON null
    // means "non-party" and an absent column means "not yet set" — collapsing
    // them would lose the distinction the whole attribute exists to carry.
    storyRole: r.story_role ?? undefined,
    captionAlignment: r.caption_alignment === undefined ? undefined : r.caption_alignment,
    partyStatus: (r.party_status ?? undefined) as CasePartyLink['partyStatus'],
    capacityKind: (r.capacity_kind ?? undefined) as CasePartyLink['capacityKind'],
    capacityPointsAtPartyId: r.capacity_points_at_party_id ?? undefined,
    joinedBy: (r.joined_by ?? undefined) as CasePartyLink['joinedBy'],
    activeState: (r.active_state ?? undefined) as CasePartyLink['activeState'],
    slotRole: r.slot_role ?? undefined,
  };
}

function contactEdgeFromRow(r: ContactEdgeRow): ContactEdge {
  return {
    id: r.id,
    fromContactId: r.from_contact_id,
    toContactId: r.to_contact_id,
    edgeType: r.edge_type as ContactEdge['edgeType'],
    caseId: r.case_id ?? undefined,
    note: r.note ?? undefined,
    createdAt: r.created_at,
  };
}

function rosterFlagFromRow(r: RosterFlagRow): RosterBackfillFlag {
  return {
    id: r.id,
    caseId: r.case_id,
    casePartyId: r.case_party_id,
    reason: r.reason,
    unmappedValue: r.unmapped_value ?? undefined,
    resolvedAt: r.resolved_at ?? undefined,
    createdAt: r.created_at,
  };
}

// ---- Generic row mapping for the billing tables ----
// Billing entities use camelCase keys that map 1:1 to snake_case columns; JSON
// payloads (totals, assumptions, registry stamps, cites) pass through untouched.

function snakeKey(k: string): string {
  return k.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase());
}

function camelKey(k: string): string {
  return k.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

function toRow(obj: object): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    out[snakeKey(k)] = v;
  }
  return out;
}

/**
 * Row mapping for UPDATES, where "absent" and "present but undefined" mean
 * different things:
 *   - key absent       → don't touch that column
 *   - key === undefined → CLEAR that column (write null)
 *
 * `toRow` collapses both to "don't touch", which made every clear-a-field
 * action a silent no-op against Postgres while working fine in localStorage —
 * the demo/Supabase divergence the adapter seam exists to prevent (2026-07-21
 * audit item 9). Found live 2026-07-28: "Undo disbursed" did nothing, because
 * `{ disbursedAt: undefined }` mapped to an empty update.
 *
 * Deliberately NOT used for inserts: there, an explicit null would override a
 * column default (e.g. `posture`, which is NOT NULL with a default).
 */
export function toUpdateRow(obj: object): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[snakeKey(k)] = v === undefined ? null : v;
  }
  return out;
}

function fromRow<T>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) out[camelKey(k)] = v === null ? undefined : v;
  return out as T;
}

export class SupabaseAdapter implements DataAdapter {
  private sb: SupabaseClient;

  /** Takes the shared client rather than building its own — see supabaseClient.ts
   *  for why there must be exactly one (session/auth-lock sharing). */
  constructor(client: SupabaseClient) {
    this.sb = client;
  }

  private static unwrap<T>(res: { data: T | null; error: { message: string } | null }): T {
    if (res.error) throw new Error(res.error.message);
    if (res.data === null) throw new Error('No data returned');
    return res.data;
  }

  async listCases(): Promise<CaseRecord[]> {
    const res = await this.sb.from('cases').select('*').order('file_number', { ascending: false });
    return SupabaseAdapter.unwrap(res as never as { data: CaseRow[] | null; error: { message: string } | null }).map(caseFromRow);
  }

  async getCase(id: string): Promise<CaseRecord | null> {
    const res = await this.sb.from('cases').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? caseFromRow(res.data as CaseRow) : null;
  }

  async getCases(ids: string[]): Promise<CaseRecord[]> {
    if (ids.length === 0) return [];
    const res = await this.sb.from('cases').select('*').in('id', ids);
    return SupabaseAdapter.unwrap(res as never as { data: CaseRow[] | null; error: { message: string } | null }).map(caseFromRow);
  }

  async createCase(data: Omit<CaseRecord, 'id' | 'fileNumber' | 'createdAt' | 'updatedAt'>): Promise<CaseRecord> {
    // file_number is assigned by the DB default (next_file_number()).
    const res = await this.sb.from('cases').insert(caseToRow(data)).select().single();
    if (res.error) throw new Error(res.error.message);
    return caseFromRow(res.data as CaseRow);
  }

  async updateCase(id: string, patch: Partial<CaseRecord>): Promise<CaseRecord> {
    const res = await this.sb.from('cases').update(caseToRow(patch)).eq('id', id).select().single();
    if (res.error) throw new Error(res.error.message);
    return caseFromRow(res.data as CaseRow);
  }

  async listParties(): Promise<PartyRecord[]> {
    const res = await this.sb.from('parties').select(PARTY_COLUMNS).order('display_name');
    return SupabaseAdapter.unwrap(res as never as { data: PartyRow[] | null; error: { message: string } | null }).map(partyFromRow);
  }

  async getParty(id: string): Promise<PartyRecord | null> {
    const res = await this.sb.from('parties').select(PARTY_COLUMNS).eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? partyFromRow(res.data as unknown as PartyRow) : null;
  }

  async getParties(ids: string[]): Promise<PartyRecord[]> {
    if (ids.length === 0) return [];
    const res = await this.sb.from('parties').select(PARTY_COLUMNS).in('id', ids);
    return SupabaseAdapter.unwrap(res as never as { data: PartyRow[] | null; error: { message: string } | null }).map(partyFromRow);
  }

  async createParty(data: PartyCreate): Promise<PartyRecord> {
    const full = withDirectoryDefaults(data);
    const res = await this.sb.from('parties')
      .insert({
        party_type: full.partyType, kind: full.kind, display_name: full.displayName,
        // Gate 10 §2, THE WRITE-GUARD AT THE SEAM. Belt and braces on purpose:
        // the UI routes by destination, and this strips the keys again whatever
        // the caller hands over. Build it even where you believe no caller can
        // reach it — that is what it is for.
        fields: stripDestinationKeys(full.fields),
        date_of_birth: full.dateOfBirth ?? null,
        role_tags: full.roleTags, aliases: full.aliases,
        deceased: full.deceased, deceased_date: full.deceasedDate ?? null,
      })
      .select(PARTY_COLUMNS).single();
    if (res.error) throw new Error(res.error.message);
    return partyFromRow(res.data as unknown as PartyRow);
  }

  async updateParty(id: string, patch: PartyPatch): Promise<PartyRecord> {
    assertPartyPatchKeys(patch);
    const row: Record<string, unknown> = {};
    if (patch.displayName !== undefined) row.display_name = patch.displayName;
    // Gate 10 §2 — the write-guard, on the update path as well as the insert.
    if (patch.fields !== undefined) row.fields = stripDestinationKeys(patch.fields);
    if ('dateOfBirth' in patch) row.date_of_birth = patch.dateOfBirth ?? null;
    if (patch.roleTags !== undefined) row.role_tags = patch.roleTags;
    if (patch.aliases !== undefined) row.aliases = patch.aliases;
    if (patch.deceased !== undefined) row.deceased = patch.deceased;
    if ('deceasedDate' in patch) row.deceased_date = patch.deceasedDate ?? null;
    const res = await this.sb.from('parties').update(row).eq('id', id).select(PARTY_COLUMNS).single();
    if (res.error) throw new Error(res.error.message);
    return partyFromRow(res.data as unknown as PartyRow);
  }

  // ---- Gate 10 §3: the excluded child row, on demand and never joined ----

  async getPartyPii(partyId: string): Promise<PartyPii | null> {
    const res = await this.sb.from('party_pii')
      .select('party_id, ssn, drivers_license, drivers_license_state')
      .eq('party_id', partyId).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? partyPiiFromRow(res.data as PartyPiiRow) : null;
  }

  async savePartyPii(partyId: string, patch: Omit<PartyPii, 'partyId'>): Promise<PartyPii | null> {
    if (isEmptyPii(patch)) {
      // An all-empty patch DELETES rather than storing a row of nulls. An empty
      // PII record is not a fact about a person, and leaving one behind makes
      // "does this contact have PII" unanswerable.
      const del = await this.sb.from('party_pii').delete().eq('party_id', partyId);
      if (del.error) throw new Error(del.error.message);
      return null;
    }
    const res = await this.sb.from('party_pii')
      .upsert({
        party_id: partyId,
        ssn: patch.ssn ?? null,
        drivers_license: patch.driversLicense ?? null,
        drivers_license_state: patch.driversLicenseState ?? null,
      }, { onConflict: 'party_id' })
      .select('party_id, ssn, drivers_license, drivers_license_state').single();
    if (res.error) throw new Error(res.error.message);
    return partyPiiFromRow(res.data as PartyPiiRow);
  }

  // ---- CD-1 contact directory ----

  async listContactEdges(): Promise<ContactEdge[]> {
    const res = await this.sb.from('contact_edges').select('*');
    return SupabaseAdapter.unwrap(res as never as { data: ContactEdgeRow[] | null; error: { message: string } | null }).map(contactEdgeFromRow);
  }

  async listContactEdgesForContact(contactId: string): Promise<ContactEdge[]> {
    const res = await this.sb.from('contact_edges').select('*')
      .or(`from_contact_id.eq.${contactId},to_contact_id.eq.${contactId}`);
    return SupabaseAdapter.unwrap(res as never as { data: ContactEdgeRow[] | null; error: { message: string } | null }).map(contactEdgeFromRow);
  }

  async createContactEdge(data: Omit<ContactEdge, 'id' | 'createdAt'>): Promise<ContactEdge> {
    const problem = validateEdge(data);
    if (problem) throw new Error(problem);
    const res = await this.sb.from('contact_edges')
      .insert({
        from_contact_id: data.fromContactId, to_contact_id: data.toContactId,
        edge_type: data.edgeType, case_id: data.caseId ?? null, note: data.note ?? null,
        // CD-14's period. Explicit nulls, because this insert is written out
        // column by column rather than going through toRow — a field omitted
        // here simply would not be written, which is how a cleared "from"
        // would silently become an absent one.
        effective_from: data.effectiveFrom ?? null, effective_to: data.effectiveTo ?? null,
      })
      .select().single();
    if (res.error) throw new Error(res.error.message);
    return contactEdgeFromRow(res.data as ContactEdgeRow);
  }

  async deleteContactEdge(id: string): Promise<void> {
    const res = await this.sb.from('contact_edges').delete().eq('id', id);
    if (res.error) throw new Error(res.error.message);
  }

  async listRosterFlags(): Promise<RosterBackfillFlag[]> {
    const res = await this.sb.from('case_roster_flags').select('*').is('resolved_at', null);
    return SupabaseAdapter.unwrap(res as never as { data: RosterFlagRow[] | null; error: { message: string } | null }).map(rosterFlagFromRow);
  }

  async resolveRosterFlag(id: string): Promise<RosterBackfillFlag> {
    const res = await this.sb.from('case_roster_flags')
      .update({ resolved_at: new Date().toISOString() }).eq('id', id).select().single();
    if (res.error) throw new Error(res.error.message);
    return rosterFlagFromRow(res.data as RosterFlagRow);
  }

  async listLinksForCase(caseId: string): Promise<CasePartyLink[]> {
    const res = await this.sb.from('case_parties').select('*').eq('case_id', caseId);
    return SupabaseAdapter.unwrap(res as never as { data: LinkRow[] | null; error: { message: string } | null }).map(linkFromRow);
  }

  async listLinksForParty(partyId: string): Promise<CasePartyLink[]> {
    const res = await this.sb.from('case_parties').select('*').eq('party_id', partyId);
    return SupabaseAdapter.unwrap(res as never as { data: LinkRow[] | null; error: { message: string } | null }).map(linkFromRow);
  }

  async createLink(data: Omit<CasePartyLink, 'id' | 'createdAt'>): Promise<CasePartyLink> {
    const res = await this.sb.from('case_parties')
      .insert({
        case_id: data.caseId, party_id: data.partyId, role: data.role,
        side: data.side ?? null, note: data.note ?? null,
        // CD-1 §4.2/§4.3. `caption_alignment` passes null through as a VALUE
        // (non-party) and only omits when genuinely unset.
        story_role: data.storyRole ?? data.role,
        caption_alignment: data.captionAlignment === undefined ? null : data.captionAlignment,
        party_status: data.partyStatus ?? null,
        capacity_kind: data.capacityKind ?? null,
        capacity_points_at_party_id: data.capacityPointsAtPartyId ?? null,
        joined_by: data.joinedBy ?? 'intake-slot',
        active_state: data.activeState ?? 'active',
        slot_role: data.slotRole ?? null,
      })
      .select().single();
    if (res.error) throw new Error(res.error.message);
    return linkFromRow(res.data as LinkRow);
  }

  async deleteLink(id: string): Promise<void> {
    const res = await this.sb.from('case_parties').delete().eq('id', id);
    if (res.error) throw new Error(res.error.message);
  }

  // ---- Client dimension (CL-2) ----
  // case_clients / case_client_flags map 1:1 snake_case↔camelCase, so the
  // generic row helpers below the billing header serve them unchanged.

  async listClientsForCase(caseId: string): Promise<CaseClient[]> {
    const res = await this.sb.from('case_clients').select('*')
      .eq('case_id', caseId).order('display_order');
    if (res.error) throw new Error(res.error.message);
    return sortClients(((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<CaseClient>(r)));
  }

  async listClients(): Promise<CaseClient[]> {
    const res = await this.sb.from('case_clients').select('*').order('display_order');
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<CaseClient>(r));
  }

  async createClient(data: Omit<CaseClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<CaseClient> {
    const res = await this.sb.from('case_clients').insert(toRow(data)).select().single();
    if (res.error) {
      // Say the same thing the local adapter says. Postgres reports this as
      // `duplicate key value violates unique constraint
      // "case_clients_case_id_party_id_key"`, which reached Michael verbatim
      // during the 2026-07-28 live walkthrough. The constraint is doing its
      // job; the sentence was the problem.
      if (res.error.code === '23505' || /duplicate key|unique constraint/i.test(res.error.message)) {
        throw new Error('That party is already a client on this case');
      }
      throw new Error(res.error.message);
    }
    return fromRow<CaseClient>(res.data as Record<string, unknown>);
  }

  async updateClient(id: string, patch: Partial<CaseClient>): Promise<CaseClient> {
    const res = await this.sb.from('case_clients').update(toUpdateRow(patch)).eq('id', id).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<CaseClient>(res.data as Record<string, unknown>);
  }

  async deleteClient(id: string): Promise<void> {
    // Same guard as the local adapter, checked here rather than left to the FK:
    // medical_bills.client_id is `on delete set null`, so Postgres would let the
    // delete through and silently orphan the ledger. The adapters must not
    // diverge on this (2026-07-21 audit item 9).
    const owned = await this.sb.from('medical_bills').select('id').eq('client_id', id);
    if (owned.error) throw new Error(owned.error.message);
    const n = (owned.data ?? []).length;
    if (n > 0) {
      throw new Error(`Cannot remove this client — ${n} bill(s) are assigned to them. Reassign the bills first.`);
    }
    const res = await this.sb.from('case_clients').delete().eq('id', id);
    if (res.error) throw new Error(res.error.message);
  }

  async listClientFlags(unresolvedOnly = false): Promise<ClientBackfillFlag[]> {
    let q = this.sb.from('case_client_flags').select('*');
    if (unresolvedOnly) q = q.is('resolved_at', null);
    const res = await q;
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<ClientBackfillFlag>(r));
  }

  async createClientFlagIfAbsent(
    data: Omit<ClientBackfillFlag, 'id' | 'createdAt' | 'resolvedAt'>,
  ): Promise<ClientBackfillFlag | null> {
    // case_client_flags is unique on case_id, so a plain insert would silently
    // do nothing when a RESOLVED flag is already there — leaving a case that has
    // lost its client again sitting in an unflagged hole. Branch explicitly.
    const existing = await this.sb.from('case_client_flags')
      .select('*').eq('case_id', data.caseId).maybeSingle();
    if (existing.error) throw new Error(existing.error.message);
    if (existing.data) {
      const row = existing.data as Record<string, unknown>;
      if (!row.resolved_at) return null;             // already flagged and open
      const reopened = await this.sb.from('case_client_flags')
        .update({ ...toRow(data), resolved_at: null, created_at: new Date().toISOString() })
        .eq('id', row.id as string).select().single();
      if (reopened.error) throw new Error(reopened.error.message);
      return fromRow<ClientBackfillFlag>(reopened.data as Record<string, unknown>);
    }
    const res = await this.sb.from('case_client_flags').insert(toRow(data)).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<ClientBackfillFlag>(res.data as Record<string, unknown>);
  }

  async getClientFlagForCase(caseId: string): Promise<ClientBackfillFlag | null> {
    const res = await this.sb.from('case_client_flags').select('*')
      .eq('case_id', caseId).is('resolved_at', null).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<ClientBackfillFlag>(res.data as Record<string, unknown>) : null;
  }

  async resolveClientFlag(id: string): Promise<ClientBackfillFlag> {
    const res = await this.sb.from('case_client_flags')
      .update({ resolved_at: new Date().toISOString() }).eq('id', id).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<ClientBackfillFlag>(res.data as Record<string, unknown>);
  }

  // ---- Billing module (Phase 1a) ----
  // Generic helpers: billing columns are 1:1 snake_case of the camelCase keys.

  private async rows<T>(table: string, build: (q: ReturnType<SupabaseClient['from']>) => PromiseLike<{ data: unknown; error: { message: string } | null }>): Promise<T[]> {
    const res = await build(this.sb.from(table));
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<T>(r));
  }

  private async insertRow<T>(table: string, data: object): Promise<T> {
    const res = await this.sb.from(table).insert(toRow(data)).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<T>(res.data as Record<string, unknown>);
  }

  private async updateRow<T>(table: string, id: string, patch: object): Promise<T> {
    const res = await this.sb.from(table).update(toUpdateRow(patch)).eq('id', id).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<T>(res.data as Record<string, unknown>);
  }

  private async deleteRows(table: string, column: string, value: string): Promise<void> {
    const res = await this.sb.from(table).delete().eq(column, value);
    if (res.error) throw new Error(res.error.message);
  }

  async listBillsForCase(caseId: string): Promise<MedicalBill[]> {
    return this.rows<MedicalBill>('medical_bills', (q) => q.select('*').eq('case_id', caseId).order('service_start'));
  }

  async getBill(id: string): Promise<MedicalBill | null> {
    const res = await this.sb.from('medical_bills').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<MedicalBill>(res.data as Record<string, unknown>) : null;
  }

  async createBill(data: Omit<MedicalBill, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicalBill> {
    return this.insertRow<MedicalBill>('medical_bills', data);
  }

  async updateBill(id: string, patch: Partial<MedicalBill>): Promise<MedicalBill> {
    const updated = await this.updateRow<MedicalBill>('medical_bills', id, patch);
    // Keep the denormalized run.client_id in step with its bill (§3.1). The
    // local adapter does the same — the two must not diverge (audit item 9).
    if ('clientId' in patch) {
      const res = await this.sb.from('analysis_runs')
        .update({ client_id: patch.clientId ?? null }).eq('bill_id', id);
      if (res.error) throw new Error(res.error.message);
    }
    return updated;
  }

  async deleteBill(id: string): Promise<void> {
    // Line items, EOBs, runs, and result lines cascade via FK in the schema.
    await this.deleteRows('medical_bills', 'id', id);
  }

  async listLineItems(billId: string): Promise<BillLineItem[]> {
    return this.rows<BillLineItem>('bill_line_items', (q) => q.select('*').eq('bill_id', billId).order('service_date'));
  }

  async createLineItem(data: Omit<BillLineItem, 'id'>): Promise<BillLineItem> {
    return this.insertRow<BillLineItem>('bill_line_items', data);
  }

  async updateLineItem(id: string, patch: Partial<BillLineItem>): Promise<BillLineItem> {
    return this.updateRow<BillLineItem>('bill_line_items', id, patch);
  }

  async deleteLineItem(id: string): Promise<void> {
    await this.deleteRows('bill_line_items', 'id', id);
  }

  async listCodeMappings(): Promise<CodeMapping[]> {
    return this.rows<CodeMapping>('code_mappings', (q) => q.select('*'));
  }

  async createCodeMapping(data: Omit<CodeMapping, 'id'>): Promise<CodeMapping> {
    return this.insertRow<CodeMapping>('code_mappings', data);
  }

  async listBillsForProvider(facilityPartyId: string): Promise<MedicalBill[]> {
    return this.rows<MedicalBill>('medical_bills', (q) => q.select('*').eq('facility_party_id', facilityPartyId));
  }

  async getProviderProfile(facilityPartyId: string): Promise<FacilityBillingProfile | null> {
    const res = await this.sb.from('facility_billing_profiles').select('*').eq('facility_party_id', facilityPartyId).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<FacilityBillingProfile>(res.data as Record<string, unknown>) : null;
  }

  async upsertProviderProfile(data: Omit<FacilityBillingProfile, 'id' | 'updatedAt'>): Promise<FacilityBillingProfile> {
    // Full replace: explicit nulls (not omitted keys) so a recompute clears
    // fields that no longer have a value — the profile is a computed projection.
    const row = {
      facility_party_id: data.facilityPartyId,
      avg_billed_to_medicare_ratio: data.avgBilledToMedicareRatio ?? null,
      historical_reduction_pct: data.historicalReductionPct ?? null,
      common_flags: data.commonFlags,
      last_analysis_date: data.lastAnalysisDate ?? null,
      updated_at: new Date().toISOString(),
    };
    const res = await this.sb.from('facility_billing_profiles')
      .upsert(row, { onConflict: 'facility_party_id' }).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<FacilityBillingProfile>(res.data as Record<string, unknown>);
  }

  async getEobForBill(billId: string): Promise<EOBRecord | null> {
    const res = await this.sb.from('eob_records').select('*').eq('bill_id', billId).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<EOBRecord>(res.data as Record<string, unknown>) : null;
  }

  async saveEob(billId: string, data: Omit<EOBRecord, 'id' | 'billId' | 'updatedAt'>): Promise<EOBRecord> {
    const existing = await this.getEobForBill(billId);
    if (existing) return this.updateRow<EOBRecord>('eob_records', existing.id, data);
    return this.insertRow<EOBRecord>('eob_records', { ...data, billId });
  }

  async listRunsForCase(caseId: string): Promise<AnalysisRun[]> {
    return this.rows<AnalysisRun>('analysis_runs', (q) => q.select('*').eq('case_id', caseId).order('run_date', { ascending: false }));
  }

  async listRunsForBill(billId: string): Promise<AnalysisRun[]> {
    return this.rows<AnalysisRun>('analysis_runs', (q) => q.select('*').eq('bill_id', billId).order('run_date', { ascending: false }));
  }

  async createRun(run: AnalysisRun, resultLines: AnalysisResultLine[]): Promise<AnalysisRun> {
    const created = await this.insertRow<AnalysisRun>('analysis_runs', run);
    if (resultLines.length > 0) {
      const res = await this.sb.from('analysis_result_lines').insert(resultLines.map((rl) => toRow(rl)));
      if (res.error) throw new Error(res.error.message);
    }
    return created;
  }

  async confirmRun(id: string, reviewer: string): Promise<AnalysisRun> {
    return this.updateRow<AnalysisRun>('analysis_runs', id, {
      status: 'confirmed', reviewer, reviewedDate: new Date().toISOString(),
    });
  }

  async listResultLines(runId: string): Promise<AnalysisResultLine[]> {
    return this.rows<AnalysisResultLine>('analysis_result_lines', (q) => q.select('*').eq('run_id', runId));
  }

  async appendReviewLog(entry: Omit<ReviewLogEntry, 'id' | 'timestamp'>): Promise<ReviewLogEntry> {
    return this.insertRow<ReviewLogEntry>('review_log', entry);
  }

  async listReviewLog(entityType: string, entityId: string): Promise<ReviewLogEntry[]> {
    return this.rows<ReviewLogEntry>('review_log', (q) =>
      q.select('*').eq('entity_type', entityType).eq('entity_id', entityId).order('timestamp', { ascending: false }));
  }

  async listLegalRules(): Promise<LegalRule[]> {
    return this.rows<LegalRule>('legal_rules', (q) => q.select('*').order('rule_key'));
  }

  async updateLegalRule(id: string, patch: Partial<Omit<LegalRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>>): Promise<LegalRule> {
    // Version bump is read-then-write; single-user phase, so no race in practice.
    const res = await this.sb.from('legal_rules').select('version').eq('id', id).single();
    if (res.error) throw new Error(res.error.message);
    const version = (res.data as { version: number }).version + 1;
    return this.updateRow<LegalRule>('legal_rules', id, { ...patch, version });
  }

  async listFeeSchedules(): Promise<FeeSchedule[]> {
    return this.rows<FeeSchedule>('fee_schedules', (q) => q.select('*').order('name'));
  }

  async listRates(scheduleIds: string[]): Promise<FeeScheduleRate[]> {
    if (scheduleIds.length === 0) return [];
    return this.rows<FeeScheduleRate>('fee_schedule_rates', (q) => q.select('*').in('schedule_id', scheduleIds));
  }

  async createFeeSchedule(
    data: Omit<FeeSchedule, 'id' | 'createdAt'>,
    rates: Omit<FeeScheduleRate, 'id' | 'scheduleId'>[],
  ): Promise<FeeSchedule> {
    const schedule = await this.insertRow<FeeSchedule>('fee_schedules', data);
    if (rates.length > 0) {
      const res = await this.sb.from('fee_schedule_rates')
        .insert(rates.map((r) => toRow({ ...r, scheduleId: schedule.id })));
      if (res.error) throw new Error(res.error.message);
    }
    return schedule;
  }

  async deleteFeeSchedule(id: string): Promise<void> {
    await this.deleteRows('fee_schedules', 'id', id); // rates cascade via FK
  }

  async listDocumentsForCase(caseId: string): Promise<GeneratedDocument[]> {
    return this.rows<GeneratedDocument>('generated_documents', (q) =>
      q.select('*').eq('case_id', caseId).order('generated_at', { ascending: false }));
  }

  async createDocument(data: Omit<GeneratedDocument, 'id' | 'generatedAt'>): Promise<GeneratedDocument> {
    return this.insertRow<GeneratedDocument>('generated_documents', data);
  }

  async listEventsForCase(caseId: string): Promise<CalendarEvent[]> {
    return this.rows<CalendarEvent>('calendar_events', (q) =>
      q.select('*').eq('case_id', caseId).order('start_local'));
  }

  async listEventsPendingSync(): Promise<CalendarEvent[]> {
    return this.rows<CalendarEvent>('calendar_events', (q) =>
      q.select('*').neq('sync_status', 'synced'));
  }

  async createEvent(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> {
    return this.insertRow<CalendarEvent>('calendar_events', data);
  }

  async updateEvent(id: string, patch: Partial<CalendarEvent>): Promise<CalendarEvent> {
    return this.updateRow<CalendarEvent>('calendar_events', id, { ...patch, updatedAt: new Date().toISOString() });
  }

  // ---- Transcript sort & route (T1) ----
  // Same 1:1 camelCase↔snake_case mapping as billing; JSON payloads
  // (words, suggestions) and arrays (case_ids, advisories) pass through.

  async listTranscriptsForCase(caseId: string): Promise<Transcript[]> {
    return this.rows<Transcript>('transcripts', (q) =>
      q.select('*').contains('case_ids', [caseId]).order('recorded_at', { ascending: false }));
  }

  async listOfficeNotes(): Promise<Transcript[]> {
    return this.rows<Transcript>('transcripts', (q) =>
      q.select('*').eq('office_note', true).order('recorded_at', { ascending: false }));
  }

  async getTranscript(id: string): Promise<Transcript | null> {
    const res = await this.sb.from('transcripts').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<Transcript>(res.data as Record<string, unknown>) : null;
  }

  async createTranscript(data: Omit<Transcript, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transcript> {
    return this.insertRow<Transcript>('transcripts', data);
  }

  async updateTranscript(id: string, patch: Partial<Transcript>): Promise<Transcript> {
    return this.updateRow<Transcript>('transcripts', id, { ...patch, updatedAt: new Date().toISOString() });
  }

  async listParticipants(transcriptId: string): Promise<TranscriptParticipant[]> {
    return this.rows<TranscriptParticipant>('transcript_participants', (q) =>
      q.select('*').eq('transcript_id', transcriptId).order('speaker_label'));
  }

  async saveParticipants(
    transcriptId: string,
    participants: Omit<TranscriptParticipant, 'id' | 'transcriptId'>[],
  ): Promise<TranscriptParticipant[]> {
    await this.deleteRows('transcript_participants', 'transcript_id', transcriptId);
    if (participants.length === 0) return [];
    const res = await this.sb.from('transcript_participants')
      .insert(participants.map((p) => toRow({ ...p, transcriptId }))).select();
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<TranscriptParticipant>(r));
  }

  async listStagingItems(): Promise<StagingItem[]> {
    return this.rows<StagingItem>('staging_items', (q) =>
      q.select('*').order('recorded_at', { ascending: false }));
  }

  async getStagingItem(id: string): Promise<StagingItem | null> {
    const res = await this.sb.from('staging_items').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<StagingItem>(res.data as Record<string, unknown>) : null;
  }

  async createStagingItem(data: Omit<StagingItem, 'id' | 'createdAt'>): Promise<StagingItem> {
    return this.insertRow<StagingItem>('staging_items', data);
  }

  async updateStagingItem(id: string, patch: Partial<StagingItem>): Promise<StagingItem> {
    return this.updateRow<StagingItem>('staging_items', id, patch);
  }

  async appendRoutingDecision(data: Omit<RoutingDecision, 'id' | 'decidedAt'>): Promise<RoutingDecision> {
    return this.insertRow<RoutingDecision>('routing_decisions', data);
  }

  async listRoutingDecisions(): Promise<RoutingDecision[]> {
    return this.rows<RoutingDecision>('routing_decisions', (q) =>
      q.select('*').order('decided_at', { ascending: false }));
  }

  async listTagTemplates(): Promise<TagTemplate[]> {
    return this.rows<TagTemplate>('tag_templates', (q) => q.select('*'));
  }

  async createTagTemplate(data: Omit<TagTemplate, 'id'>): Promise<TagTemplate> {
    return this.insertRow<TagTemplate>('tag_templates', data);
  }

  async deleteTagTemplate(id: string): Promise<void> {
    await this.deleteRows('tag_templates', 'id', id);
  }

  async listGlossaryTerms(): Promise<GlossaryTerm[]> {
    return this.rows<GlossaryTerm>('glossary_terms', (q) => q.select('*').order('term'));
  }

  async createGlossaryTerm(data: Omit<GlossaryTerm, 'id'>): Promise<GlossaryTerm> {
    return this.insertRow<GlossaryTerm>('glossary_terms', data);
  }

  async deleteGlossaryTerm(id: string): Promise<void> {
    await this.deleteRows('glossary_terms', 'id', id);
  }

  // ---- OAA criminal intake ----

  async listChargesForCase(caseId: string): Promise<Charge[]> {
    return this.rows<Charge>('charges', (q) => q.select('*').eq('case_id', caseId).order('offense_date'));
  }

  async listCharges(): Promise<Charge[]> {
    return this.rows<Charge>('charges', (q) => q.select('*'));
  }

  async createCharge(data: Omit<Charge, 'id' | 'createdAt' | 'updatedAt'>): Promise<Charge> {
    return this.insertRow<Charge>('charges', data);
  }

  async updateCharge(id: string, patch: Partial<Charge>): Promise<Charge> {
    return this.updateRow<Charge>('charges', id, patch);
  }

  async deleteCharge(id: string): Promise<void> {
    await this.deleteRows('charges', 'id', id);
  }

  async createOaaIntake(data: Omit<OaaIntakeRecord, 'id' | 'createdAt'>): Promise<OaaIntakeRecord> {
    return this.insertRow<OaaIntakeRecord>('oaa_intakes', data);
  }

  async getOaaIntakeForCase(caseId: string): Promise<OaaIntakeRecord | null> {
    const res = await this.sb.from('oaa_intakes').select('*').eq('case_id', caseId).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<OaaIntakeRecord>(res.data as Record<string, unknown>) : null;
  }

  // ---- Statute cache (T2) ----

  async listStatuteChapters(): Promise<StatuteChapterMeta[]> {
    return this.rows<StatuteChapterMeta>('statute_chapters', (q) =>
      q.select('id, code, chapter, title, source_url, fetched_at').order('code').order('chapter'));
  }

  async getStatuteChapter(code: string, chapter: string): Promise<StatuteChapter | null> {
    const res = await this.sb.from('statute_chapters').select('*').eq('code', code).eq('chapter', chapter).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<StatuteChapter>(res.data as Record<string, unknown>) : null;
  }

  async saveStatuteChapter(
    data: Omit<StatuteChapter, 'id'>,
    sections: Omit<StatuteSection, 'id' | 'chapterId' | 'code' | 'chapter'>[],
  ): Promise<StatuteChapter> {
    const res = await this.sb.from('statute_chapters')
      .upsert(toRow(data), { onConflict: 'code,chapter' }).select().single();
    if (res.error) throw new Error(res.error.message);
    const chapterRec = fromRow<StatuteChapter>(res.data as Record<string, unknown>);
    await this.deleteRows('statute_sections', 'chapter_id', chapterRec.id);
    if (sections.length) {
      const ins = await this.sb.from('statute_sections').insert(sections.map((s) =>
        toRow({ ...s, chapterId: chapterRec.id, code: data.code, chapter: data.chapter })));
      if (ins.error) throw new Error(ins.error.message);
    }
    return chapterRec;
  }

  async listSectionsForChapter(code: string, chapter: string): Promise<StatuteSection[]> {
    return this.rows<StatuteSection>('statute_sections', (q) =>
      q.select('*').eq('code', code).eq('chapter', chapter).order('section_number'));
  }

  async listSnapshotsForRule(ruleId: string): Promise<RegistryVerificationSnapshot[]> {
    return this.rows<RegistryVerificationSnapshot>('registry_verification_snapshots', (q) =>
      q.select('*').eq('rule_id', ruleId));
  }

  async listAllSnapshots(): Promise<RegistryVerificationSnapshot[]> {
    return this.rows<RegistryVerificationSnapshot>('registry_verification_snapshots', (q) => q.select('*'));
  }

  async saveSnapshotsForRule(
    ruleId: string,
    snaps: Omit<RegistryVerificationSnapshot, 'id' | 'ruleId'>[],
  ): Promise<RegistryVerificationSnapshot[]> {
    await this.deleteRows('registry_verification_snapshots', 'rule_id', ruleId);
    if (!snaps.length) return [];
    const res = await this.sb.from('registry_verification_snapshots')
      .insert(snaps.map((s) => toRow({ ...s, ruleId }))).select();
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<RegistryVerificationSnapshot>(r));
  }

  async listWatchFlags(activeOnly?: boolean): Promise<WatchFlag[]> {
    return this.rows<WatchFlag>('watch_flags', (q) => {
      let query = q.select('*');
      if (activeOnly) query = query.is('cleared_at', null);
      return query.order('raised_at', { ascending: false });
    });
  }

  async createWatchFlag(data: Omit<WatchFlag, 'id' | 'raisedAt'>): Promise<WatchFlag> {
    return this.insertRow<WatchFlag>('watch_flags', data);
  }

  async clearWatchFlag(id: string, clearedBy: string): Promise<WatchFlag> {
    return this.updateRow<WatchFlag>('watch_flags', id, {
      clearedAt: new Date().toISOString(), clearedBy,
    });
  }

  // ---- Bill tracking (T3) ----

  async listWatchTargets(): Promise<WatchTarget[]> {
    return this.rows<WatchTarget>('watch_targets', (q) => q.select('*').order('kind').order('note').order('cite_or_query'));
  }

  async createWatchTarget(data: Omit<WatchTarget, 'id'>): Promise<WatchTarget> {
    return this.insertRow<WatchTarget>('watch_targets', data);
  }

  async updateWatchTarget(id: string, patch: Partial<Pick<WatchTarget, 'active' | 'note'>>): Promise<WatchTarget> {
    return this.updateRow<WatchTarget>('watch_targets', id, patch);
  }

  async deleteWatchTarget(id: string): Promise<void> {
    await this.deleteRows('watch_targets', 'id', id);
  }

  async listTrackedBills(): Promise<TrackedBill[]> {
    return this.rows<TrackedBill>('tracked_bills', (q) => q.select('*').order('bill_number'));
  }

  async upsertTrackedBill(data: Omit<TrackedBill, 'id'>): Promise<TrackedBill> {
    const res = await this.sb.from('tracked_bills')
      .upsert(toRow(data), { onConflict: 'legiscan_bill_id' }).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<TrackedBill>(res.data as Record<string, unknown>);
  }

  // ---- R17: the case-scoped provider record ----------------------------
  // case_providers / case_provider_individuals / case_provider_visits map 1:1
  // snake_case<->camelCase, so the generic row helpers serve them unchanged.
  // The two child lists filter by the case's provider ids rather than joining,
  // because the child tables carry no case_id — the facility row owns the case.

  async listCaseProviders(caseId: string): Promise<CaseProvider[]> {
    return this.rows<CaseProvider>('case_providers', (q) =>
      q.select('*').eq('case_id', caseId));
  }

  async listAllCaseProviders(): Promise<CaseProvider[]> {
    return this.rows<CaseProvider>('case_providers', (q) => q.select('*'));
  }

  async createCaseProvider(
    data: Omit<CaseProvider, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CaseProvider> {
    // D-53, through the SAME function the local adapter calls (the validateEdge
    // precedent) so the two cannot drift on what a facility is allowed to be.
    const party = await this.sb.from('parties').select('kind')
      .eq('id', data.facilityPartyId).single();
    if (party.error) throw new Error(party.error.message);
    validateCaseProvider(data, (party.data as { kind?: 'individual' | 'organization' })?.kind);
    return this.insertRow<CaseProvider>('case_providers', data);
  }

  async updateCaseProvider(id: string, patch: Partial<CaseProvider>): Promise<CaseProvider> {
    return this.updateRow<CaseProvider>('case_providers', id, patch);
  }

  async deleteCaseProvider(id: string): Promise<void> {
    // Individuals and visits go with it by ON DELETE CASCADE; a served
    // paragraph record keeps its rendered name and loses only the pointer.
    await this.deleteRows('case_providers', 'id', id);
  }

  private async caseProviderIds(caseId: string): Promise<string[]> {
    const res = await this.sb.from('case_providers').select('id').eq('case_id', caseId);
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as { id: string }[]).map((r) => r.id);
  }

  async listProviderIndividuals(caseId: string): Promise<CaseProviderIndividual[]> {
    const ids = await this.caseProviderIds(caseId);
    if (ids.length === 0) return [];
    return this.rows<CaseProviderIndividual>('case_provider_individuals', (q) =>
      q.select('*').in('case_provider_id', ids).order('sort_order'));
  }

  async createProviderIndividual(
    data: Omit<CaseProviderIndividual, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CaseProviderIndividual> {
    return this.insertRow<CaseProviderIndividual>('case_provider_individuals', data);
  }

  async updateProviderIndividual(
    id: string,
    patch: Partial<CaseProviderIndividual>,
  ): Promise<CaseProviderIndividual> {
    return this.updateRow<CaseProviderIndividual>('case_provider_individuals', id, patch);
  }

  async softDeleteProviderIndividual(id: string): Promise<CaseProviderIndividual> {
    // D-55: a SOFT delete. A hard one would be undone by the next extraction.
    return this.updateProviderIndividual(id, { removedByHandAt: new Date().toISOString() });
  }

  async restoreProviderIndividual(id: string): Promise<CaseProviderIndividual> {
    // `undefined` through toUpdateRow becomes an explicit NULL, which is what
    // clearing the soft delete means. That asymmetry with toRow is deliberate
    // and is why updates never go through the insert mapper.
    return this.updateProviderIndividual(id, { removedByHandAt: undefined });
  }

  async listProviderVisits(caseId: string): Promise<CaseProviderVisit[]> {
    const providerIds = await this.caseProviderIds(caseId);
    if (providerIds.length === 0) return [];
    const ind = await this.sb.from('case_provider_individuals').select('id')
      .in('case_provider_id', providerIds);
    if (ind.error) throw new Error(ind.error.message);
    const ids = ((ind.data ?? []) as { id: string }[]).map((r) => r.id);
    if (ids.length === 0) return [];
    return this.rows<CaseProviderVisit>('case_provider_visits', (q) =>
      q.select('*').in('individual_id', ids).order('sort_order'));
  }

  async listChronologyVersions(caseId: string): Promise<CaseChronologyVersion[]> {
    return this.rows<CaseChronologyVersion>('case_chronology_versions', (q) =>
      q.select('*').eq('case_id', caseId).order('version_no'));
  }

  async createChronologyVersion(
    data: Omit<CaseChronologyVersion, 'id' | 'createdAt' | 'versionNo'>,
  ): Promise<CaseChronologyVersion> {
    // version_no is per (case, client) and counts REMOVED versions too, so a
    // removal never lets a later drop reuse a number already in the record.
    const existing = await this.sb.from('case_chronology_versions')
      .select('version_no').eq('case_id', data.caseId);
    if (existing.error) throw new Error(existing.error.message);
    const mine = ((existing.data ?? []) as { version_no: number }[]);
    const versionNo = mine.reduce((max, r) => Math.max(max, r.version_no), 0) + 1;
    return this.insertRow<CaseChronologyVersion>('case_chronology_versions', {
      ...data, versionNo,
    });
  }

  async removeChronologyVersion(id: string): Promise<CaseChronologyVersion> {
    const removed = await this.updateRow<CaseChronologyVersion>(
      'case_chronology_versions', id, { removedAt: new Date().toISOString() },
    );
    // D-60: individuals it named KEEP their rows and lose only the pointer.
    const res = await this.sb.from('case_provider_individuals')
      .update({ chronology_version_id: null }).eq('chronology_version_id', id);
    if (res.error) throw new Error(res.error.message);
    return removed;
  }

  async replaceProviderVisits(
    individualId: string,
    visits: Omit<CaseProviderVisit, 'id' | 'createdAt' | 'individualId'>[],
  ): Promise<CaseProviderVisit[]> {
    await this.deleteRows('case_provider_visits', 'individual_id', individualId);
    if (visits.length === 0) return [];
    const res = await this.sb.from('case_provider_visits')
      .insert(visits.map((v) => toRow({ ...v, individualId }))).select();
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[])
      .map((r) => fromRow<CaseProviderVisit>(r));
  }

  async createDocumentParagraph(
    data: Omit<GeneratedDocumentParagraph, 'id' | 'createdAt'>,
  ): Promise<GeneratedDocumentParagraph> {
    return this.insertRow<GeneratedDocumentParagraph>('generated_document_paragraphs', data);
  }

  async listDocumentParagraphs(documentId: string): Promise<GeneratedDocumentParagraph[]> {
    return this.rows<GeneratedDocumentParagraph>('generated_document_paragraphs', (q) =>
      q.select('*').eq('document_id', documentId).order('sort_order'));
  }

  async listParagraphsForCase(caseId: string): Promise<GeneratedDocumentParagraph[]> {
    const docs = await this.sb.from('generated_documents').select('id').eq('case_id', caseId);
    if (docs.error) throw new Error(docs.error.message);
    const ids = ((docs.data ?? []) as { id: string }[]).map((r) => r.id);
    if (ids.length === 0) return [];
    return this.rows<GeneratedDocumentParagraph>('generated_document_paragraphs', (q) =>
      q.select('*').in('document_id', ids).order('sort_order'));
  }

  async listBillRefs(trackedBillId: string): Promise<BillStatuteRef[]> {
    return this.rows<BillStatuteRef>('bill_statute_refs', (q) => q.select('*').eq('tracked_bill_id', trackedBillId));
  }

  async listAllBillRefs(): Promise<BillStatuteRef[]> {
    return this.rows<BillStatuteRef>('bill_statute_refs', (q) => q.select('*'));
  }

  async saveBillRefs(
    trackedBillId: string,
    refs: Omit<BillStatuteRef, 'id' | 'trackedBillId'>[],
  ): Promise<BillStatuteRef[]> {
    await this.deleteRows('bill_statute_refs', 'tracked_bill_id', trackedBillId);
    if (!refs.length) return [];
    const res = await this.sb.from('bill_statute_refs')
      .insert(refs.map((r) => toRow({ ...r, trackedBillId }))).select();
    if (res.error) throw new Error(res.error.message);
    return ((res.data ?? []) as Record<string, unknown>[]).map((r) => fromRow<BillStatuteRef>(r));
  }

  // ---- Form engine (FE-D1) ----

  async listFormTemplates(): Promise<FormTemplate[]> {
    return this.rows<FormTemplate>('form_templates', (q) =>
      q.select('*').order('family').order('key'));
  }

  async getFormTemplateByKey(key: string): Promise<FormTemplate | null> {
    const rows = await this.rows<FormTemplate>('form_templates', (q) =>
      q.select('*').eq('key', key).limit(1));
    return rows[0] ?? null;
  }

  async createFormTemplate(
    data: Omit<FormTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormTemplate> {
    return this.insertRow<FormTemplate>('form_templates', data);
  }

  async updateFormTemplate(
    id: string,
    patch: Partial<Pick<FormTemplate, 'name' | 'provenance' | 'notes' | 'formatProfileId' | 'currentVersionId'>>,
  ): Promise<FormTemplate> {
    return this.updateRow<FormTemplate>('form_templates', id, patch);
  }

  async listTemplateVersions(templateId: string): Promise<FormTemplateVersion[]> {
    return this.rows<FormTemplateVersion>('form_template_versions', (q) =>
      q.select('*').eq('template_id', templateId).order('version_no', { ascending: false }));
  }

  async getTemplateVersion(id: string): Promise<FormTemplateVersion | null> {
    const rows = await this.rows<FormTemplateVersion>('form_template_versions', (q) =>
      q.select('*').eq('id', id).limit(1));
    return rows[0] ?? null;
  }

  /** Publishes a NEW version and repoints the template. Never edits in place —
   *  see the interface comment; the served-document question depends on it. */
  async publishTemplateVersion(
    templateId: string,
    body: string,
    settings: Record<string, string>,
    changeNote?: string,
  ): Promise<FormTemplateVersion> {
    const existing = await this.listTemplateVersions(templateId);
    const versionNo = existing.reduce((n, v) => Math.max(n, v.versionNo), 0) + 1;
    const created = await this.insertRow<FormTemplateVersion>('form_template_versions', {
      templateId, versionNo, body, settings, changeNote,
    });
    await this.updateFormTemplate(templateId, { currentVersionId: created.id });
    return created;
  }

  async listTokenDefinitions(templateId?: string): Promise<FormTokenDefinition[]> {
    return this.rows<FormTokenDefinition>('form_token_definitions', (q) => (
      templateId
        // Global tokens (null template) are available to every instrument, so a
        // per-template read must include them or half the registry vanishes.
        ? q.select('*').or(`template_id.eq.${templateId},template_id.is.null`).order('name')
        : q.select('*').order('name')
    ));
  }

  async upsertTokenDefinition(
    data: Omit<FormTokenDefinition, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormTokenDefinition> {
    const res = await this.sb.from('form_token_definitions')
      .upsert(toRow(data), { onConflict: 'template_id,name' }).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<FormTokenDefinition>(res.data as Record<string, unknown>);
  }

  async listFormatProfiles(): Promise<FormFormatProfile[]> {
    return this.rows<FormFormatProfile>('form_format_profiles', (q) => q.select('*').order('key'));
  }

  async upsertFormatProfile(
    data: Omit<FormFormatProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormFormatProfile> {
    const res = await this.sb.from('form_format_profiles')
      .upsert(toRow(data), { onConflict: 'key' }).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<FormFormatProfile>(res.data as Record<string, unknown>);
  }

  // ---- Firm obligations (docs/specs/firm-obligations-build-slice.md §3 item 4) ----
  // The SAME plans the local adapter applies (src/domain/firmObligations.ts): this
  // adapter reads the rows a plan needs and writes what the plan returns, deciding
  // nothing. PostgREST gives no multi-statement transaction here, so every act
  // writes in the order that keeps the database's own guards satisfied — above all
  // the one-open partial unique index (firm_obligation_occurrences_one_open_idx):
  // a close marks the current occurrence done BEFORE the next is inserted, and an
  // undo removes the untouched next BEFORE the closed one is reopened. The review
  // log line is written LAST, so a failed write never leaves a line claiming an act
  // that did not land. None of these tables exists until Michael runs
  // db/migrations/2026-09-10-firm-obligations.sql by hand.
  //
  // With no transaction, a failure BETWEEN two writes could strand an obligation
  // (review L1-F4: Done closes the occurrence, the next insert fails, and nothing is
  // left open). So each act compensates, best effort, and only in two ways: an UPDATE
  // that puts back the prior values of exactly the fields the act changed, or
  // re-inserting a row this same act deleted. NEVER a delete — the slice bars a
  // delete on any obligation or occurrence — so where taking an act back would need
  // one (a failure after an insert), the state is left as it is and the message says
  // so. Every write failure ends in one of three messages: not saved, saved without
  // its review-log line, or the earlier state could not be restored — and that last
  // one says where the register shows what was left.

  private firmCtx(): ActContext {
    return { today: localISODate(), nowIso: new Date().toISOString(), newId: () => crypto.randomUUID(), user: ATTORNEY_USER };
  }

  private async firmObligationRow(id: string): Promise<FirmObligation> {
    const res = await this.sb.from('firm_obligations').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    if (!res.data) throw new Error('Firm obligation not found'); // PROVISIONAL — slice §3 item 10
    return fromRow<FirmObligation>(res.data as Record<string, unknown>);
  }

  private async firmOccurrenceRow(id: string): Promise<FirmObligationOccurrence> {
    const res = await this.sb.from('firm_obligation_occurrences').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    if (!res.data) throw new Error('Occurrence not found'); // PROVISIONAL — slice §3 item 10
    return fromRow<FirmObligationOccurrence>(res.data as Record<string, unknown>);
  }

  private async firmOccurrencesOf(obligationId: string): Promise<FirmObligationOccurrence[]> {
    return this.rows<FirmObligationOccurrence>('firm_obligation_occurrences', (q) =>
      q.select('*').eq('obligation_id', obligationId).order('created_at'));
  }

  /** The obligation's own lines and its occurrences' lines, in the order written. */
  private async firmLogFor(obligationId: string, occurrences: FirmObligationOccurrence[]): Promise<ReviewLogEntry[]> {
    const ids = [obligationId, ...occurrences.map((o) => o.id)];
    return this.rows<ReviewLogEntry>('review_log', (q) =>
      q.select('*')
        .in('entity_type', [FIRM_OBLIGATION_ENTITY, FIRM_OCCURRENCE_ENTITY])
        .in('entity_id', ids)
        .order('timestamp', { ascending: true }));
  }

  private async writeFirmLog(line: LogDraft): Promise<void> {
    await this.insertRow<ReviewLogEntry>('review_log', line);
  }

  /** The prior values of exactly the fields a write changed, read from the row as it
   *  was before the act. A field that was empty comes back undefined, and toUpdateRow
   *  writes undefined as NULL — so a field the act filled is cleared again.
   *
   *  One exception: where the act queued a push (syncStatus 'pending'), the restore
   *  leaves it queued rather than putting back a prior 'synced'. A push can land between
   *  the act's write and its restore, and would then leave Outlook on the date the
   *  restore took away, with the row never pushed again. A needless re-push only PATCHes
   *  the existing event with the right data. */
  private firmPrior<T extends object>(prior: T, patch: object): Partial<T> {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(patch)) out[k] = (prior as Record<string, unknown>)[k];
    if ((patch as { syncStatus?: unknown }).syncStatus === 'pending') out.syncStatus = 'pending';
    return out as Partial<T>;
  }

  private firmCause(e: unknown): string {
    return e instanceof Error ? e.message : String(e);
  }

  /** Nothing the act wrote still stands. */
  private firmNotSaved(act: string, cause: unknown): Error {
    return new Error(`${act} was not saved: ${this.firmCause(cause)}`); // PROVISIONAL — slice §3 item 10
  }

  /** Every write landed except the review-log line: the rows are whole, the record is not. */
  private firmSavedWithoutLog(act: string, cause: unknown, consequence = ''): Error {
    return new Error(`${act} was saved, but its review-log line did not write (${this.firmCause(cause)})${consequence}`); // PROVISIONAL — slice §3 item 10
  }

  /** The act stopped part-way and what it wrote could not all be put back. `after` is
   *  the sentences that follow: anything left for him to do, then where to look. */
  private firmNotRestored(act: string, cause: unknown, restoreCause: unknown, after: string[]): Error {
    return new Error([
      `${act} stopped part-way (${this.firmCause(cause)}), and the earlier state could not be restored (${this.firmCause(restoreCause)}).`, // PROVISIONAL — slice §3 item 10
      ...after,
    ].filter(Boolean).join(' '));
  }

  /** Where the register shows what a could-not-restore left. "Needs attention" lists only
   *  an ACTIVE obligation with nothing open (registerView's `stranded`); every other state
   *  is on the obligation's own row, with the act's record under its Details. Each caller
   *  says which state it leaves. `name` is already plain text. */
  private firmWhereToLook(name: string, leftStranded: boolean): string {
    return leftStranded
      ? 'Check "Needs attention" on the register.' // PROVISIONAL — slice §3 item 10
      : `Check the ${name} row and its Details › Review log on the register.`; // PROVISIONAL — slice §3 item 10
  }

  /** Undo removed the untouched next occurrence and it is not back. The caller never sees
   *  `removed`, so its Outlook event, if it was pushed, is left behind for him to delete.
   *  Empty when there is no event to name. */
  private firmOrphanedEvent(removed: FirmObligationOccurrence | null): string {
    return removed?.outlookEventId
      ? `The removed next occurrence (${removed.periodLabel}) still has its Outlook event; delete it in Outlook.` // PROVISIONAL — slice §3 item 10
      : '';
  }

  /** An activation's own date that Activate… from Inactive will not carry, once the first
   *  occurrence did not save: re-activation opens the first rule date on or after today,
   *  or "due now". FOM-4's "last period completed" is asked again there (a first
   *  activation), so the message gives him the date to re-enter. FOD-16's last-done date
   *  has no field there (planReactivate takes none), so the message names it and says the
   *  occurrence will open due now. Empty when neither was given, or the rule never reads it. */
  private firmNotCarried(input: FirmObligationCreate, ob: FirmObligation): string {
    // planActivation keeps "last period completed" only on a serial row; a one-time rule never reads it.
    if (ob.lastPeriodCompleted && ob.recurrence.kind !== 'one-time') {
      return `When you activate it again, re-enter the last period completed (${formatDate(ob.lastPeriodCompleted)}).`; // PROVISIONAL — slice §3 item 10
    }
    if (input.lastDone && ob.recurrence.kind === 'interval-from-completion') {
      return `Activate… from Inactive takes no last-done date, so it will open due now, not measured from the last-done date you entered (${formatDate(input.lastDone)}).`; // PROVISIONAL — slice §3 item 10
    }
    return '';
  }

  /** An act's first write. If it fails nothing has changed, so there is nothing to put back. */
  private async firmFirstWrite<T>(act: string, write: () => Promise<T>): Promise<T> {
    try {
      return await write();
    } catch (e) {
      throw this.firmNotSaved(act, e);
    }
  }

  /** Runs the compensating writes in the order given — the caller lists them newest
   *  first — then reports the act as not saved. If a compensating write fails too,
   *  it stops there and says the earlier state could not be restored, then `after`. */
  private async firmRestore(
    act: string, cause: unknown, restores: (() => Promise<unknown>)[], after: string[],
  ): Promise<never> {
    for (const restore of restores) {
      try {
        await restore();
      } catch (restoreErr) {
        throw this.firmNotRestored(act, cause, restoreErr, after);
      }
    }
    throw this.firmNotSaved(act, cause);
  }

  private async firmClose(
    id: string,
    plan: (ob: FirmObligation, occ: FirmObligationOccurrence, all: FirmObligationOccurrence[], ctx: ActContext) => ReturnType<typeof planDone>,
  ): Promise<FirmCloseResult> {
    const occ = await this.firmOccurrenceRow(id);
    const ob = await this.firmObligationRow(occ.obligationId);
    const all = await this.firmOccurrencesOf(ob.id);
    const p = plan(ob, occ, all, this.firmCtx());
    const name = plainText(ob.name);
    const act = `${p.occurrencePatch.outcome === 'not-applicable' ? 'Not applicable' : 'Done'} for ${name} (${occ.periodLabel})`; // PROVISIONAL — slice §3 item 10
    // done_by is provenance, like created_by: the signed-in caller, or NULL (F-25's honesty).
    const { data } = await this.sb.auth.getSession();
    const closePatch: Partial<FirmObligationOccurrence> = { ...p.occurrencePatch, doneBy: data.session?.user.id };
    // Puts the closed occurrence back to open, exactly as it was read, its push still queued.
    const reopen = () => this.updateRow<FirmObligationOccurrence>(
      'firm_obligation_occurrences', p.occurrenceId, this.firmPrior(occ, closePatch),
    );
    // If reopening fails too, the occurrence stays closed with nothing open after it —
    // stranded while the obligation is active.
    const leftClosed = [this.firmWhereToLook(name, ob.active)];
    const closed = await this.firmFirstWrite(act, () => this.updateRow<FirmObligationOccurrence>(
      'firm_obligation_occurrences', p.occurrenceId, closePatch,
    ));
    let next: FirmObligationOccurrence | null = null;
    if (p.next) {
      const draft = p.next;
      try {
        next = await this.insertRow<FirmObligationOccurrence>('firm_obligation_occurrences', draft);
      } catch (e) {
        // The close would stand with nothing open after it: reopen it.
        return this.firmRestore(act, e, [reopen], leftClosed);
      }
    }
    let obligation = ob;
    if (p.obligationPatch) {
      const patch = p.obligationPatch;
      try {
        obligation = await this.updateRow<FirmObligation>('firm_obligations', ob.id, patch);
      } catch (e) {
        // Reopening after a next occurrence was inserted would first need that next
        // deleted (the one-open index), and nothing here deletes one. The plans never
        // pair a next with an obligation change (only a one-time close retires, and it
        // has no next), so this is a guard, not a path.
        if (next) {
          // The next is open, so the obligation is on its own row, not under "Needs attention".
          throw this.firmNotRestored(act, e, 'reopening it would first need its next occurrence deleted, and this app never deletes one', [this.firmWhereToLook(name, false)]); // PROVISIONAL — slice §3 item 10
        }
        return this.firmRestore(act, e, [reopen], leftClosed);
      }
    }
    try {
      await this.writeFirmLog(p.log);
    } catch (e) {
      // The rows are consistent — closed, and the next open — so nothing is taken back.
      throw this.firmSavedWithoutLog(act, e, ', so Undo will not be offered for it.'); // PROVISIONAL — slice §3 item 10
    }
    return { closed, next, obligation };
  }

  async listFirmObligations(): Promise<FirmObligation[]> {
    return this.rows<FirmObligation>('firm_obligations', (q) => q.select('*').order('name'));
  }

  async getFirmObligation(id: string): Promise<FirmObligation | null> {
    const res = await this.sb.from('firm_obligations').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<FirmObligation>(res.data as Record<string, unknown>) : null;
  }

  async createFirmObligation(
    input: FirmObligationCreate,
  ): Promise<{ obligation: FirmObligation; occurrence: FirmObligationOccurrence | null }> {
    const plan = planActivation(input, this.firmCtx());
    const name = plainText(plan.obligation.name);
    const act = `Activating ${name}`; // PROVISIONAL — slice §3 item 10
    // created_by is left to the set_created_by trigger (F-25).
    const obligation = await this.firmFirstWrite(act, () =>
      this.insertRow<FirmObligation>('firm_obligations', plan.obligation));
    let occurrence: FirmObligationOccurrence | null = null;
    if (plan.occurrence) {
      const draft = plan.occurrence;
      try {
        occurrence = await this.insertRow<FirmObligationOccurrence>('firm_obligation_occurrences', draft);
      } catch (e) {
        // Taking the obligation back would be a DELETE, which the slice bars. It stands
        // active with nothing open — exactly what the register's "Needs attention" list
        // shows — and its activation line is NOT written: that line names a first
        // occurrence that does not exist.
        // A date the activation carried is not carried by that re-activation: name it.
        const notCarried = this.firmNotCarried(input, plan.obligation);
        throw new Error(`${name} was saved without its first occurrence (${this.firmCause(e)}). It is listed under "Needs attention" on the register: Retire it, then Activate… it from Inactive.${notCarried ? ` ${notCarried}` : ''}`); // PROVISIONAL — slice §3 item 10
      }
    }
    try {
      await this.writeFirmLog(plan.log);
    } catch (e) {
      // Both inserts stand; taking either back would be a delete.
      throw this.firmSavedWithoutLog(act, e);
    }
    return { obligation, occurrence };
  }

  async updateFirmObligation(
    id: string, patch: FirmObligationPatch,
  ): Promise<{ obligation: FirmObligation; occurrence: FirmObligationOccurrence | null; kept: string | null }> {
    const ob = await this.firmObligationRow(id);
    const all = await this.firmOccurrencesOf(id);
    const plan = planEdit(ob, patch, all, this.firmCtx(), await this.firmLogFor(id, all));
    const name = plainText(ob.name);
    const act = `The edit to ${name}`; // PROVISIONAL — slice §3 item 10
    // An edit changes neither `active` nor what is open, so a could-not-restore leaves the
    // obligation wherever the register already showed it.
    const where = [this.firmWhereToLook(name, ob.active && !all.some((o) => o.state === 'open'))];
    const restoreObligation = () =>
      this.updateRow<FirmObligation>('firm_obligations', id, this.firmPrior(ob, plan.obligationPatch));
    const obligation = await this.firmFirstWrite(act, () =>
      this.updateRow<FirmObligation>('firm_obligations', id, plan.obligationPatch));
    // The open occurrence as it was read — the edit re-dates it or re-queues its push.
    const target = plan.occurrence;
    const priorOcc = target ? all.find((o) => o.id === target.id) : undefined;
    let occurrence: FirmObligationOccurrence | null = null;
    if (target) {
      try {
        occurrence = await this.updateRow<FirmObligationOccurrence>('firm_obligation_occurrences', target.id, target.patch);
      } catch (e) {
        return this.firmRestore(act, e, [restoreObligation], where);
      }
    }
    try {
      await this.writeFirmLog(plan.log);
    } catch (e) {
      // Both writes were updates, so both go back — the occurrence first, then the obligation.
      const restores: (() => Promise<unknown>)[] = [];
      if (target && priorOcc) {
        restores.push(() => this.updateRow<FirmObligationOccurrence>(
          'firm_obligation_occurrences', target.id, this.firmPrior(priorOcc, target.patch),
        ));
      }
      restores.push(restoreObligation);
      return this.firmRestore(act, e, restores, where);
    }
    return { obligation, occurrence, kept: plan.kept };
  }

  async retireFirmObligation(id: string): Promise<FirmObligation> {
    const ob = await this.firmObligationRow(id);
    const plan = planRetire(ob, this.firmCtx());
    const name = plainText(ob.name);
    const act = `Retiring ${name}`; // PROVISIONAL — slice §3 item 10
    const obligation = await this.firmFirstWrite(act, () =>
      this.updateRow<FirmObligation>('firm_obligations', id, plan.obligationPatch));
    try {
      await this.writeFirmLog(plan.log);
    } catch (e) {
      return this.firmRestore(act, e, [
        () => this.updateRow<FirmObligation>('firm_obligations', id, this.firmPrior(ob, plan.obligationPatch)),
      ], [
        // Left retired, and "Needs attention" lists only active obligations.
        this.firmWhereToLook(name, false),
      ]);
    }
    return obligation;
  }

  async reactivateFirmObligation(
    id: string, inputs: { lastPeriodCompleted?: string } = {},
  ): Promise<{ obligation: FirmObligation; occurrence: FirmObligationOccurrence | null }> {
    const ob = await this.firmObligationRow(id);
    const plan = planReactivate(ob, await this.firmOccurrencesOf(id), this.firmCtx(), inputs);
    const name = plainText(ob.name);
    const act = `Activating ${name}`; // PROVISIONAL — slice §3 item 10
    // Puts back active = false, and "last period completed" when the act set it.
    const restoreObligation = () =>
      this.updateRow<FirmObligation>('firm_obligations', id, this.firmPrior(ob, plan.obligationPatch));
    const obligation = await this.firmFirstWrite(act, () =>
      this.updateRow<FirmObligation>('firm_obligations', id, plan.obligationPatch));
    let occurrence: FirmObligationOccurrence | null = null;
    if (plan.occurrence) {
      const draft = plan.occurrence;
      try {
        occurrence = await this.insertRow<FirmObligationOccurrence>('firm_obligation_occurrences', draft);
      } catch (e) {
        // If putting `active` back fails too, it is left active with nothing open: stranded.
        return this.firmRestore(act, e, [restoreObligation], [this.firmWhereToLook(name, true)]);
      }
    }
    try {
      await this.writeFirmLog(plan.log);
    } catch (e) {
      // An inserted occurrence could be taken back only by a delete: leave it standing.
      if (occurrence) throw this.firmSavedWithoutLog(act, e);
      // Nothing was inserted (an occurrence was already open): the one update goes back.
      // If it cannot, the obligation is active with that occurrence open: on its own row.
      return this.firmRestore(act, e, [restoreObligation], [this.firmWhereToLook(name, false)]);
    }
    return { obligation, occurrence };
  }

  async listFirmObligationOccurrences(): Promise<FirmObligationOccurrence[]> {
    return this.rows<FirmObligationOccurrence>('firm_obligation_occurrences', (q) => q.select('*').order('due_on'));
  }

  async markOccurrenceDone(
    id: string, input: { doneOn?: string; doneNote?: string; filedAt?: string },
  ): Promise<FirmCloseResult> {
    return this.firmClose(id, (ob, occ, all, ctx) => planDone(ob, occ, all, input, ctx));
  }

  async markOccurrenceNotApplicable(
    id: string, input: { reason?: OutcomeReason; note?: string; doneOn?: string },
  ): Promise<FirmCloseResult> {
    return this.firmClose(id, (ob, occ, all, ctx) => planNotApplicable(ob, occ, all, input, ctx));
  }

  async undoOccurrence(
    id: string,
  ): Promise<{ reopened: FirmObligationOccurrence; removed: FirmObligationOccurrence | null; obligation: FirmObligation }> {
    const occ = await this.firmOccurrenceRow(id);
    const ob = await this.firmObligationRow(occ.obligationId);
    const all = await this.firmOccurrencesOf(ob.id);
    const plan = planUndo(ob, occ, all, await this.firmLogFor(ob.id, all), this.firmCtx());
    const name = plainText(ob.name);
    const act = `Undo for ${name} (${occ.periodLabel})`; // PROVISIONAL — slice §3 item 10
    const removed = plan.removeOccurrence;
    // The removed next goes back exactly as it was read: its id, its dates, its Outlook link.
    const putBackNext = (row: FirmObligationOccurrence) => () =>
      this.insertRow<FirmObligationOccurrence>('firm_obligation_occurrences', row);
    // Closes the reopened occurrence again, with the close's own values as they were read.
    const reclose = () => this.updateRow<FirmObligationOccurrence>(
      'firm_obligation_occurrences', plan.occurrenceId, this.firmPrior(occ, plan.reopenPatch),
    );
    if (removed) {
      await this.firmFirstWrite(act, () => this.deleteRows('firm_obligation_occurrences', 'id', removed.id));
    }
    let reopened: FirmObligationOccurrence;
    try {
      reopened = await this.updateRow<FirmObligationOccurrence>(
        'firm_obligation_occurrences', plan.occurrenceId, plan.reopenPatch,
      );
    } catch (e) {
      if (!removed) throw this.firmNotSaved(act, e);
      // If the next will not go back, the occurrence stays closed with nothing open —
      // stranded while the obligation is active (Retire touches no occurrence, so Undo is
      // still offered on a retired one) — and the next's Outlook event is left behind.
      return this.firmRestore(act, e, [putBackNext(removed)], [
        this.firmOrphanedEvent(removed), this.firmWhereToLook(name, ob.active),
      ]);
    }
    let obligation = ob;
    if (plan.obligationPatch) {
      const patch = plan.obligationPatch;
      try {
        obligation = await this.updateRow<FirmObligation>('firm_obligations', ob.id, patch);
      } catch (e) {
        // Close it again FIRST: the one-open index refuses the next back while this one is open.
        // The obligation update failed, so it is still retired: never under "Needs attention".
        return this.firmRestore(act, e, removed ? [reclose, putBackNext(removed)] : [reclose], [
          this.firmOrphanedEvent(removed), this.firmWhereToLook(name, false),
        ]);
      }
    }
    try {
      await this.writeFirmLog(plan.log);
    } catch (e) {
      // The rows are consistent — reopened, the next gone — so nothing is taken back. The
      // caller never sees `removed`, so it cannot delete that occurrence's Outlook event.
      const orphaned = this.firmOrphanedEvent(removed);
      throw this.firmSavedWithoutLog(act, e, orphaned ? `. ${orphaned}` : '');
    }
    return { reopened, removed, obligation };
  }

  async setOccurrenceDueOverride(id: string, date: string): Promise<FirmObligationOccurrence> {
    const occ = await this.firmOccurrenceRow(id);
    const ob = await this.firmObligationRow(occ.obligationId);
    const plan = planOverride(ob, occ, date, this.firmCtx());
    const name = plainText(ob.name);
    const act = `The due-date change for ${name} (${occ.periodLabel})`; // PROVISIONAL — slice §3 item 10
    const updated = await this.firmFirstWrite(act, () =>
      this.updateRow<FirmObligationOccurrence>('firm_obligation_occurrences', id, plan.patch));
    try {
      await this.writeFirmLog(plan.log);
    } catch (e) {
      return this.firmRestore(act, e, [
        () => this.updateRow<FirmObligationOccurrence>('firm_obligation_occurrences', id, this.firmPrior(occ, plan.patch)),
      ], [
        // Its occurrence is open either way: on its own row.
        this.firmWhereToLook(name, false),
      ]);
    }
    return updated;
  }

  async listFirmObligationReviewLog(): Promise<ReviewLogEntry[]> {
    return this.rows<ReviewLogEntry>('review_log', (q) =>
      q.select('*')
        .in('entity_type', [FIRM_OBLIGATION_ENTITY, FIRM_OCCURRENCE_ENTITY])
        .order('timestamp', { ascending: true }));
  }

  async listFirmOccurrencesPendingSync(): Promise<FirmObligationOccurrence[]> {
    return this.rows<FirmObligationOccurrence>('firm_obligation_occurrences', (q) =>
      q.select('*').neq('sync_status', 'synced'));
  }

  async updateFirmOccurrenceSync(
    id: string,
    patch: Partial<Pick<FirmObligationOccurrence, 'outlookEventId' | 'syncStatus' | 'syncError' | 'lastSyncAt'>>,
  ): Promise<FirmObligationOccurrence> {
    // Only the four sync fields pass, whatever the caller sent.
    const only: Record<string, unknown> = {};
    for (const k of ['outlookEventId', 'syncStatus', 'syncError', 'lastSyncAt'] as const) {
      if (k in patch) only[k] = patch[k];
    }
    return this.updateRow<FirmObligationOccurrence>('firm_obligation_occurrences', id, only);
  }
}
