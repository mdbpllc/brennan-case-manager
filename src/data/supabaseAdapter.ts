import { type SupabaseClient } from '@supabase/supabase-js';
import { assertPartyPatchKeys, type DataAdapter } from './adapter';
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type {
  MedicalBill, BillLineItem, CodeMapping, EOBRecord, AnalysisRun, AnalysisResultLine,
  ReviewLogEntry, LegalRule, FeeSchedule, FeeScheduleRate, GeneratedDocument,
  ProviderBillingProfile,
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
import type { CaseClient, ClientBackfillFlag } from '../domain/client';
import { sortClients } from '../domain/client';

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
}

interface LinkRow {
  id: string; case_id: string; party_id: string; role: string; side: string | null;
  note: string | null; created_at: string;
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
  return {
    id: r.id, partyType: r.party_type, kind: r.kind as PartyRecord['kind'],
    displayName: r.display_name, fields: r.fields ?? {},
    createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

function linkFromRow(r: LinkRow): CasePartyLink {
  return {
    id: r.id, caseId: r.case_id, partyId: r.party_id,
    role: r.role as CasePartyLink['role'], side: (r.side ?? undefined) as CasePartyLink['side'],
    note: r.note ?? undefined, createdAt: r.created_at,
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
    const res = await this.sb.from('parties').select('*').order('display_name');
    return SupabaseAdapter.unwrap(res as never as { data: PartyRow[] | null; error: { message: string } | null }).map(partyFromRow);
  }

  async getParty(id: string): Promise<PartyRecord | null> {
    const res = await this.sb.from('parties').select('*').eq('id', id).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? partyFromRow(res.data as PartyRow) : null;
  }

  async getParties(ids: string[]): Promise<PartyRecord[]> {
    if (ids.length === 0) return [];
    const res = await this.sb.from('parties').select('*').in('id', ids);
    return SupabaseAdapter.unwrap(res as never as { data: PartyRow[] | null; error: { message: string } | null }).map(partyFromRow);
  }

  async createParty(data: Omit<PartyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartyRecord> {
    const res = await this.sb.from('parties')
      .insert({ party_type: data.partyType, kind: data.kind, display_name: data.displayName, fields: data.fields })
      .select().single();
    if (res.error) throw new Error(res.error.message);
    return partyFromRow(res.data as PartyRow);
  }

  async updateParty(id: string, patch: Partial<Pick<PartyRecord, 'displayName' | 'fields'>>): Promise<PartyRecord> {
    assertPartyPatchKeys(patch);
    const row: Record<string, unknown> = {};
    if (patch.displayName !== undefined) row.display_name = patch.displayName;
    if (patch.fields !== undefined) row.fields = patch.fields;
    const res = await this.sb.from('parties').update(row).eq('id', id).select().single();
    if (res.error) throw new Error(res.error.message);
    return partyFromRow(res.data as PartyRow);
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
      .insert({ case_id: data.caseId, party_id: data.partyId, role: data.role, side: data.side ?? null, note: data.note ?? null })
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
    if (res.error) throw new Error(res.error.message);
    return fromRow<CaseClient>(res.data as Record<string, unknown>);
  }

  async updateClient(id: string, patch: Partial<CaseClient>): Promise<CaseClient> {
    const res = await this.sb.from('case_clients').update(toRow(patch)).eq('id', id).select().single();
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
    const res = await this.sb.from(table).update(toRow(patch)).eq('id', id).select().single();
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

  async listBillsForProvider(providerPartyId: string): Promise<MedicalBill[]> {
    return this.rows<MedicalBill>('medical_bills', (q) => q.select('*').eq('provider_party_id', providerPartyId));
  }

  async getProviderProfile(providerPartyId: string): Promise<ProviderBillingProfile | null> {
    const res = await this.sb.from('provider_billing_profiles').select('*').eq('provider_party_id', providerPartyId).maybeSingle();
    if (res.error) throw new Error(res.error.message);
    return res.data ? fromRow<ProviderBillingProfile>(res.data as Record<string, unknown>) : null;
  }

  async upsertProviderProfile(data: Omit<ProviderBillingProfile, 'id' | 'updatedAt'>): Promise<ProviderBillingProfile> {
    // Full replace: explicit nulls (not omitted keys) so a recompute clears
    // fields that no longer have a value — the profile is a computed projection.
    const row = {
      provider_party_id: data.providerPartyId,
      avg_billed_to_medicare_ratio: data.avgBilledToMedicareRatio ?? null,
      historical_reduction_pct: data.historicalReductionPct ?? null,
      common_flags: data.commonFlags,
      last_analysis_date: data.lastAnalysisDate ?? null,
      updated_at: new Date().toISOString(),
    };
    const res = await this.sb.from('provider_billing_profiles')
      .upsert(row, { onConflict: 'provider_party_id' }).select().single();
    if (res.error) throw new Error(res.error.message);
    return fromRow<ProviderBillingProfile>(res.data as Record<string, unknown>);
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
}
