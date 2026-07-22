import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { DataAdapter } from './adapter';
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';

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
  date_of_incident: string | null; date_opened: string; statute_of_limitations: string | null;
  date_closed: string | null; court_name: string | null; cause_number: string | null;
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
    statuteOfLimitations: r.statute_of_limitations ?? undefined, dateClosed: r.date_closed ?? undefined,
    courtName: r.court_name ?? undefined, causeNumber: r.cause_number ?? undefined,
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
  if (c.statuteOfLimitations !== undefined) row.statute_of_limitations = c.statuteOfLimitations || null;
  if (c.dateClosed !== undefined) row.date_closed = c.dateClosed || null;
  if (c.courtName !== undefined) row.court_name = c.courtName || null;
  if (c.causeNumber !== undefined) row.cause_number = c.causeNumber || null;
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

export class SupabaseAdapter implements DataAdapter {
  private sb: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.sb = createClient(url, anonKey);
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
}
