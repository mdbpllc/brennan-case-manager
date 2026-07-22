import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';

/**
 * Data-access interface. Two implementations:
 *  - LocalAdapter: browser localStorage, seeded demo data — zero setup, default.
 *  - SupabaseAdapter: the real central database (set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
 * The UI only ever talks to this interface, so switching backends is a config change.
 */
export interface DataAdapter {
  listCases(): Promise<CaseRecord[]>;
  getCase(id: string): Promise<CaseRecord | null>;
  /** Bulk fetch — avoids per-row round-trips when resolving link tables. */
  getCases(ids: string[]): Promise<CaseRecord[]>;
  createCase(data: Omit<CaseRecord, 'id' | 'fileNumber' | 'createdAt' | 'updatedAt'>): Promise<CaseRecord>;
  updateCase(id: string, patch: Partial<CaseRecord>): Promise<CaseRecord>;

  listParties(): Promise<PartyRecord[]>;
  getParty(id: string): Promise<PartyRecord | null>;
  /** Bulk fetch — avoids per-row round-trips when resolving link tables. */
  getParties(ids: string[]): Promise<PartyRecord[]>;
  createParty(data: Omit<PartyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartyRecord>;
  /** Only displayName and fields are mutable — party type/kind are frozen at creation. */
  updateParty(id: string, patch: Partial<Pick<PartyRecord, 'displayName' | 'fields'>>): Promise<PartyRecord>;

  listLinksForCase(caseId: string): Promise<CasePartyLink[]>;
  listLinksForParty(partyId: string): Promise<CasePartyLink[]>;
  createLink(data: Omit<CasePartyLink, 'id' | 'createdAt'>): Promise<CasePartyLink>;
  deleteLink(id: string): Promise<void>;
}
