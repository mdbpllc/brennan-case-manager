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
  createCase(data: Omit<CaseRecord, 'id' | 'fileNumber' | 'createdAt' | 'updatedAt'>): Promise<CaseRecord>;
  updateCase(id: string, patch: Partial<CaseRecord>): Promise<CaseRecord>;

  listParties(): Promise<PartyRecord[]>;
  getParty(id: string): Promise<PartyRecord | null>;
  createParty(data: Omit<PartyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartyRecord>;
  updateParty(id: string, patch: Partial<PartyRecord>): Promise<PartyRecord>;

  listLinksForCase(caseId: string): Promise<CasePartyLink[]>;
  listLinksForParty(partyId: string): Promise<CasePartyLink[]>;
  createLink(data: Omit<CasePartyLink, 'id' | 'createdAt'>): Promise<CasePartyLink>;
  deleteLink(id: string): Promise<void>;
}
