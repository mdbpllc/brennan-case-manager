import type { DataAdapter } from './adapter';
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import { seedData } from './seed';

const KEY = 'brennan-case-manager-v1';

interface Store {
  cases: CaseRecord[];
  parties: PartyRecord[];
  links: CasePartyLink[];
  fileCounters: Record<string, number>; // per two-digit year — resets each January by keying on year
}

function load(): Store {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Store;
    } catch {
      // fall through to seed
    }
  }
  const seeded = seedData();
  localStorage.setItem(KEY, JSON.stringify(seeded));
  return seeded;
}

function save(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store));
}

function uid(): string {
  return crypto.randomUUID();
}

function now(): string {
  return new Date().toISOString();
}

/** YY-NNNN: two-digit year, counter resets each January (keyed per year). */
export function nextFileNumber(store: Store): string {
  const yy = String(new Date().getFullYear()).slice(-2);
  const n = (store.fileCounters[yy] ?? 0) + 1;
  store.fileCounters[yy] = n;
  return `${yy}-${String(n).padStart(4, '0')}`;
}

export class LocalAdapter implements DataAdapter {
  async listCases(): Promise<CaseRecord[]> {
    return load().cases.sort((a, b) => b.fileNumber.localeCompare(a.fileNumber));
  }

  async getCase(id: string): Promise<CaseRecord | null> {
    return load().cases.find((c) => c.id === id) ?? null;
  }

  async createCase(data: Omit<CaseRecord, 'id' | 'fileNumber' | 'createdAt' | 'updatedAt'>): Promise<CaseRecord> {
    const store = load();
    const rec: CaseRecord = {
      ...data,
      id: uid(),
      fileNumber: nextFileNumber(store),
      createdAt: now(),
      updatedAt: now(),
    };
    store.cases.push(rec);
    save(store);
    return rec;
  }

  async updateCase(id: string, patch: Partial<CaseRecord>): Promise<CaseRecord> {
    const store = load();
    const idx = store.cases.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Case not found');
    store.cases[idx] = { ...store.cases[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.cases[idx];
  }

  async listParties(): Promise<PartyRecord[]> {
    return load().parties.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }

  async getParty(id: string): Promise<PartyRecord | null> {
    return load().parties.find((p) => p.id === id) ?? null;
  }

  async createParty(data: Omit<PartyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartyRecord> {
    const store = load();
    const rec: PartyRecord = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.parties.push(rec);
    save(store);
    return rec;
  }

  async updateParty(id: string, patch: Partial<PartyRecord>): Promise<PartyRecord> {
    const store = load();
    const idx = store.parties.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Party not found');
    store.parties[idx] = { ...store.parties[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.parties[idx];
  }

  async listLinksForCase(caseId: string): Promise<CasePartyLink[]> {
    return load().links.filter((l) => l.caseId === caseId);
  }

  async listLinksForParty(partyId: string): Promise<CasePartyLink[]> {
    return load().links.filter((l) => l.partyId === partyId);
  }

  async createLink(data: Omit<CasePartyLink, 'id' | 'createdAt'>): Promise<CasePartyLink> {
    const store = load();
    const rec: CasePartyLink = { ...data, id: uid(), createdAt: now() };
    store.links.push(rec);
    save(store);
    return rec;
  }

  async deleteLink(id: string): Promise<void> {
    const store = load();
    store.links = store.links.filter((l) => l.id !== id);
    save(store);
  }
}
