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
import { seedData } from './seed';

const KEY = 'brennan-case-manager-v1';

/** Bump when a record shape changes incompatibly — stale demo stores reseed
 *  instead of rendering oddly. Demo data only, so a wipe is acceptable. */
const STORE_VERSION = 9; // v9: bill tracking (watch targets incl. seeded
// manual sweeps, tracked bills, bill statute refs)

interface Store {
  version: number;
  cases: CaseRecord[];
  parties: PartyRecord[];
  links: CasePartyLink[];
  fileCounters: Record<string, number>; // per two-digit year — resets each January by keying on year
  bills: MedicalBill[];
  lineItems: BillLineItem[];
  codeMappings: CodeMapping[];
  eobs: EOBRecord[];
  runs: AnalysisRun[];
  resultLines: AnalysisResultLine[];
  reviewLog: ReviewLogEntry[];
  legalRules: LegalRule[];
  feeSchedules: FeeSchedule[];
  feeRates: FeeScheduleRate[];
  documents: GeneratedDocument[];
  providerProfiles: ProviderBillingProfile[];
  events: CalendarEvent[];
  transcripts: Transcript[];
  transcriptParticipants: TranscriptParticipant[];
  stagingItems: StagingItem[];
  routingDecisions: RoutingDecision[];
  glossaryTerms: GlossaryTerm[];
  tagTemplates: TagTemplate[];
  charges: Charge[];
  oaaIntakes: OaaIntakeRecord[];
  statuteChapters: StatuteChapter[];
  statuteSections: StatuteSection[];
  verificationSnapshots: RegistryVerificationSnapshot[];
  watchFlags: WatchFlag[];
  watchTargets: WatchTarget[];
  trackedBills: TrackedBill[];
  billRefs: BillStatuteRef[];
}

/** Attorney work that must survive a version-bump reseed (go-live gate 8,
 *  third clause — the v7→v9 bump silently wiped a real PFS import and the
 *  confirmed runs on two bills). Imported (non-demo) fee schedules, their
 *  rates, and confirmed analysis runs with their result lines carry forward. */
function carryForward(old: Partial<Store>) {
  const feeSchedules = (old.feeSchedules ?? []).filter((s) => s.sourceType !== 'demo');
  const scheduleIds = new Set(feeSchedules.map((s) => s.id));
  const feeRates = (old.feeRates ?? []).filter((r) => scheduleIds.has(r.scheduleId));
  const runs = (old.runs ?? []).filter((r) => r.status === 'confirmed');
  const runIds = new Set(runs.map((r) => r.id));
  const resultLines = (old.resultLines ?? []).filter((rl) => runIds.has(rl.runId));
  return { feeSchedules, feeRates, runs, resultLines };
}

function load(): Store {
  const raw = localStorage.getItem(KEY);
  let old: Partial<Store> | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Store;
      if (parsed.version === STORE_VERSION) return parsed;
      // version mismatch (or pre-versioning store) — reseed, but never
      // silently: back up the whole old store and carry attorney work forward.
      old = parsed;
    } catch {
      // unparseable — fall through to seed; nothing recoverable to carry
    }
  }
  const seeded: Store = {
    version: STORE_VERSION,
    runs: [], resultLines: [], reviewLog: [], documents: [], providerProfiles: [],
    oaaIntakes: [],
    statuteChapters: [], statuteSections: [], verificationSnapshots: [], watchFlags: [],
    trackedBills: [], billRefs: [],
    ...seedData(),
  };
  if (old && raw) {
    const backupKey = `${KEY}-backup-v${old.version ?? 0}`;
    localStorage.setItem(backupKey, raw);
    const carried = carryForward(old);
    if (carried.feeSchedules.length > 0) {
      // A real schedule exists — do not re-seed the demo schedule under it
      // (2026-07-25 walkthrough: demo's common PI codes shadowed real data).
      const demoIds = new Set(seeded.feeSchedules.filter((s) => s.sourceType === 'demo').map((s) => s.id));
      seeded.feeSchedules = seeded.feeSchedules.filter((s) => !demoIds.has(s.id));
      seeded.feeRates = seeded.feeRates.filter((r) => !demoIds.has(r.scheduleId));
    }
    seeded.feeSchedules.push(...carried.feeSchedules);
    seeded.feeRates.push(...carried.feeRates);
    seeded.runs.push(...carried.runs);
    seeded.resultLines.push(...carried.resultLines);
    const summary =
      `Store reseeded v${old.version ?? '<pre-versioning>'}→v${STORE_VERSION}. Carried forward: ` +
      `${carried.feeSchedules.length} imported fee schedule(s) (${carried.feeRates.length} rates), ` +
      `${carried.runs.length} confirmed analysis run(s). Full pre-reseed backup at localStorage key "${backupKey}".`;
    seeded.reviewLog.push({
      id: uid(), entityType: 'demo_store', entityId: KEY, action: 'created',
      user: 'system (store reseed)', timestamp: now(), reason: summary,
    });
    console.warn(summary);
  }
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

  async getCases(ids: string[]): Promise<CaseRecord[]> {
    const wanted = new Set(ids);
    return load().cases.filter((c) => wanted.has(c.id));
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

  async getParties(ids: string[]): Promise<PartyRecord[]> {
    const wanted = new Set(ids);
    return load().parties.filter((p) => wanted.has(p.id));
  }

  async createParty(data: Omit<PartyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartyRecord> {
    const store = load();
    const rec: PartyRecord = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.parties.push(rec);
    save(store);
    return rec;
  }

  async updateParty(id: string, patch: Partial<Pick<PartyRecord, 'displayName' | 'fields'>>): Promise<PartyRecord> {
    assertPartyPatchKeys(patch);
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

  // ---- Billing module (Phase 1a) ----

  async listBillsForCase(caseId: string): Promise<MedicalBill[]> {
    return load().bills.filter((b) => b.caseId === caseId)
      .sort((a, b) => (a.serviceStart ?? '').localeCompare(b.serviceStart ?? ''));
  }

  async getBill(id: string): Promise<MedicalBill | null> {
    return load().bills.find((b) => b.id === id) ?? null;
  }

  async createBill(data: Omit<MedicalBill, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicalBill> {
    const store = load();
    const rec: MedicalBill = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.bills.push(rec);
    save(store);
    return rec;
  }

  async updateBill(id: string, patch: Partial<MedicalBill>): Promise<MedicalBill> {
    const store = load();
    const idx = store.bills.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Bill not found');
    store.bills[idx] = { ...store.bills[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.bills[idx];
  }

  async deleteBill(id: string): Promise<void> {
    const store = load();
    const runIds = new Set(store.runs.filter((r) => r.billId === id).map((r) => r.id));
    store.bills = store.bills.filter((b) => b.id !== id);
    store.lineItems = store.lineItems.filter((l) => l.billId !== id);
    store.eobs = store.eobs.filter((e) => e.billId !== id);
    store.runs = store.runs.filter((r) => r.billId !== id);
    store.resultLines = store.resultLines.filter((rl) => !runIds.has(rl.runId));
    save(store);
  }

  async listLineItems(billId: string): Promise<BillLineItem[]> {
    return load().lineItems.filter((l) => l.billId === billId)
      .sort((a, b) => (a.serviceDate ?? '').localeCompare(b.serviceDate ?? ''));
  }

  async createLineItem(data: Omit<BillLineItem, 'id'>): Promise<BillLineItem> {
    const store = load();
    const rec: BillLineItem = { ...data, id: uid() };
    store.lineItems.push(rec);
    save(store);
    return rec;
  }

  async updateLineItem(id: string, patch: Partial<BillLineItem>): Promise<BillLineItem> {
    const store = load();
    const idx = store.lineItems.findIndex((l) => l.id === id);
    if (idx === -1) throw new Error('Line item not found');
    store.lineItems[idx] = { ...store.lineItems[idx], ...patch, id };
    save(store);
    return store.lineItems[idx];
  }

  async deleteLineItem(id: string): Promise<void> {
    const store = load();
    store.lineItems = store.lineItems.filter((l) => l.id !== id);
    save(store);
  }

  async listCodeMappings(): Promise<CodeMapping[]> {
    return load().codeMappings;
  }

  async createCodeMapping(data: Omit<CodeMapping, 'id'>): Promise<CodeMapping> {
    const store = load();
    const rec: CodeMapping = { ...data, id: uid() };
    store.codeMappings.push(rec);
    save(store);
    return rec;
  }

  async listBillsForProvider(providerPartyId: string): Promise<MedicalBill[]> {
    return load().bills.filter((b) => b.providerPartyId === providerPartyId);
  }

  async getProviderProfile(providerPartyId: string): Promise<ProviderBillingProfile | null> {
    return load().providerProfiles.find((p) => p.providerPartyId === providerPartyId) ?? null;
  }

  async upsertProviderProfile(data: Omit<ProviderBillingProfile, 'id' | 'updatedAt'>): Promise<ProviderBillingProfile> {
    const store = load();
    const idx = store.providerProfiles.findIndex((p) => p.providerPartyId === data.providerPartyId);
    const rec: ProviderBillingProfile = {
      ...data,
      id: idx === -1 ? uid() : store.providerProfiles[idx].id,
      updatedAt: now(),
    };
    if (idx === -1) store.providerProfiles.push(rec);
    else store.providerProfiles[idx] = rec;
    save(store);
    return rec;
  }

  async getEobForBill(billId: string): Promise<EOBRecord | null> {
    return load().eobs.find((e) => e.billId === billId) ?? null;
  }

  async saveEob(billId: string, data: Omit<EOBRecord, 'id' | 'billId' | 'updatedAt'>): Promise<EOBRecord> {
    const store = load();
    const idx = store.eobs.findIndex((e) => e.billId === billId);
    if (idx === -1) {
      const rec: EOBRecord = { ...data, id: uid(), billId, updatedAt: now() };
      store.eobs.push(rec);
      save(store);
      return rec;
    }
    store.eobs[idx] = { ...store.eobs[idx], ...data, billId, updatedAt: now() };
    save(store);
    return store.eobs[idx];
  }

  async listRunsForCase(caseId: string): Promise<AnalysisRun[]> {
    return load().runs.filter((r) => r.caseId === caseId)
      .sort((a, b) => b.runDate.localeCompare(a.runDate));
  }

  async listRunsForBill(billId: string): Promise<AnalysisRun[]> {
    return load().runs.filter((r) => r.billId === billId)
      .sort((a, b) => b.runDate.localeCompare(a.runDate));
  }

  async createRun(run: AnalysisRun, resultLines: AnalysisResultLine[]): Promise<AnalysisRun> {
    const store = load();
    store.runs.push(run);
    store.resultLines.push(...resultLines);
    save(store);
    return run;
  }

  async confirmRun(id: string, reviewer: string): Promise<AnalysisRun> {
    const store = load();
    const idx = store.runs.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Analysis run not found');
    store.runs[idx] = { ...store.runs[idx], status: 'confirmed', reviewer, reviewedDate: now() };
    save(store);
    return store.runs[idx];
  }

  async listResultLines(runId: string): Promise<AnalysisResultLine[]> {
    return load().resultLines.filter((rl) => rl.runId === runId);
  }

  async appendReviewLog(entry: Omit<ReviewLogEntry, 'id' | 'timestamp'>): Promise<ReviewLogEntry> {
    const store = load();
    const rec: ReviewLogEntry = { ...entry, id: uid(), timestamp: now() };
    store.reviewLog.push(rec);
    save(store);
    return rec;
  }

  async listReviewLog(entityType: string, entityId: string): Promise<ReviewLogEntry[]> {
    return load().reviewLog.filter((e) => e.entityType === entityType && e.entityId === entityId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }

  async listLegalRules(): Promise<LegalRule[]> {
    return load().legalRules.sort((a, b) => a.ruleKey.localeCompare(b.ruleKey));
  }

  async updateLegalRule(id: string, patch: Partial<Omit<LegalRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>>): Promise<LegalRule> {
    const store = load();
    const idx = store.legalRules.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Legal rule not found');
    const prev = store.legalRules[idx];
    store.legalRules[idx] = { ...prev, ...patch, id, version: prev.version + 1, updatedAt: now() };
    save(store);
    return store.legalRules[idx];
  }

  async listFeeSchedules(): Promise<FeeSchedule[]> {
    return load().feeSchedules.sort((a, b) => a.name.localeCompare(b.name));
  }

  async listRates(scheduleIds: string[]): Promise<FeeScheduleRate[]> {
    const wanted = new Set(scheduleIds);
    return load().feeRates.filter((r) => wanted.has(r.scheduleId));
  }

  async createFeeSchedule(
    data: Omit<FeeSchedule, 'id' | 'createdAt'>,
    rates: Omit<FeeScheduleRate, 'id' | 'scheduleId'>[],
  ): Promise<FeeSchedule> {
    const store = load();
    const schedule: FeeSchedule = { ...data, id: uid(), createdAt: now() };
    store.feeSchedules.push(schedule);
    for (const r of rates) store.feeRates.push({ ...r, id: uid(), scheduleId: schedule.id });
    save(store);
    return schedule;
  }

  async deleteFeeSchedule(id: string): Promise<void> {
    const store = load();
    store.feeSchedules = store.feeSchedules.filter((s) => s.id !== id);
    store.feeRates = store.feeRates.filter((r) => r.scheduleId !== id);
    save(store);
  }

  async listDocumentsForCase(caseId: string): Promise<GeneratedDocument[]> {
    return load().documents.filter((d) => d.caseId === caseId)
      .sort((a, b) => b.generatedAt.localeCompare(a.generatedAt));
  }

  async createDocument(data: Omit<GeneratedDocument, 'id' | 'generatedAt'>): Promise<GeneratedDocument> {
    const store = load();
    const rec: GeneratedDocument = { ...data, id: uid(), generatedAt: now() };
    store.documents.push(rec);
    save(store);
    return rec;
  }

  async listEventsForCase(caseId: string): Promise<CalendarEvent[]> {
    return load().events.filter((e) => e.caseId === caseId)
      .sort((a, b) => a.startLocal.localeCompare(b.startLocal));
  }

  async listEventsPendingSync(): Promise<CalendarEvent[]> {
    return load().events.filter((e) => e.syncStatus !== 'synced');
  }

  async createEvent(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> {
    const store = load();
    const rec: CalendarEvent = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.events.push(rec);
    save(store);
    return rec;
  }

  async updateEvent(id: string, patch: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const store = load();
    const idx = store.events.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Event not found');
    store.events[idx] = { ...store.events[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.events[idx];
  }

  // ---- Transcript sort & route (T1) ----

  async listTranscriptsForCase(caseId: string): Promise<Transcript[]> {
    return load().transcripts.filter((tr) => tr.caseIds.includes(caseId))
      .sort((a, b) => (b.recordedAt ?? '').localeCompare(a.recordedAt ?? ''));
  }

  async listOfficeNotes(): Promise<Transcript[]> {
    return load().transcripts.filter((tr) => tr.officeNote)
      .sort((a, b) => (b.recordedAt ?? '').localeCompare(a.recordedAt ?? ''));
  }

  async getTranscript(id: string): Promise<Transcript | null> {
    return load().transcripts.find((tr) => tr.id === id) ?? null;
  }

  async createTranscript(data: Omit<Transcript, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transcript> {
    const store = load();
    const rec: Transcript = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.transcripts.push(rec);
    save(store);
    return rec;
  }

  async updateTranscript(id: string, patch: Partial<Transcript>): Promise<Transcript> {
    const store = load();
    const idx = store.transcripts.findIndex((tr) => tr.id === id);
    if (idx === -1) throw new Error('Transcript not found');
    store.transcripts[idx] = { ...store.transcripts[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.transcripts[idx];
  }

  async listParticipants(transcriptId: string): Promise<TranscriptParticipant[]> {
    return load().transcriptParticipants.filter((p) => p.transcriptId === transcriptId)
      .sort((a, b) => a.speakerLabel.localeCompare(b.speakerLabel));
  }

  async saveParticipants(
    transcriptId: string,
    participants: Omit<TranscriptParticipant, 'id' | 'transcriptId'>[],
  ): Promise<TranscriptParticipant[]> {
    const store = load();
    store.transcriptParticipants = store.transcriptParticipants.filter((p) => p.transcriptId !== transcriptId);
    const recs = participants.map((p) => ({ ...p, id: uid(), transcriptId }));
    store.transcriptParticipants.push(...recs);
    save(store);
    return recs;
  }

  async listStagingItems(): Promise<StagingItem[]> {
    return load().stagingItems.sort((a, b) => (b.recordedAt ?? '').localeCompare(a.recordedAt ?? ''));
  }

  async getStagingItem(id: string): Promise<StagingItem | null> {
    return load().stagingItems.find((s) => s.id === id) ?? null;
  }

  async createStagingItem(data: Omit<StagingItem, 'id' | 'createdAt'>): Promise<StagingItem> {
    const store = load();
    const rec: StagingItem = { ...data, id: uid(), createdAt: now() };
    store.stagingItems.push(rec);
    save(store);
    return rec;
  }

  async updateStagingItem(id: string, patch: Partial<StagingItem>): Promise<StagingItem> {
    const store = load();
    const idx = store.stagingItems.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error('Staging item not found');
    store.stagingItems[idx] = { ...store.stagingItems[idx], ...patch, id };
    save(store);
    return store.stagingItems[idx];
  }

  async appendRoutingDecision(data: Omit<RoutingDecision, 'id' | 'decidedAt'>): Promise<RoutingDecision> {
    const store = load();
    const rec: RoutingDecision = { ...data, id: uid(), decidedAt: now() };
    store.routingDecisions.push(rec);
    save(store);
    return rec;
  }

  async listRoutingDecisions(): Promise<RoutingDecision[]> {
    return load().routingDecisions.sort((a, b) => b.decidedAt.localeCompare(a.decidedAt));
  }

  async listTagTemplates(): Promise<TagTemplate[]> {
    return load().tagTemplates;
  }

  async createTagTemplate(data: Omit<TagTemplate, 'id'>): Promise<TagTemplate> {
    const store = load();
    const rec: TagTemplate = { ...data, id: uid() };
    store.tagTemplates.push(rec);
    save(store);
    return rec;
  }

  async deleteTagTemplate(id: string): Promise<void> {
    const store = load();
    store.tagTemplates = store.tagTemplates.filter((tpl) => tpl.id !== id);
    save(store);
  }

  async listGlossaryTerms(): Promise<GlossaryTerm[]> {
    return load().glossaryTerms.sort((a, b) => a.term.localeCompare(b.term));
  }

  async createGlossaryTerm(data: Omit<GlossaryTerm, 'id'>): Promise<GlossaryTerm> {
    const store = load();
    const rec: GlossaryTerm = { ...data, id: uid() };
    store.glossaryTerms.push(rec);
    save(store);
    return rec;
  }

  async deleteGlossaryTerm(id: string): Promise<void> {
    const store = load();
    store.glossaryTerms = store.glossaryTerms.filter((g) => g.id !== id);
    save(store);
  }

  // ---- OAA criminal intake ----

  async listChargesForCase(caseId: string): Promise<Charge[]> {
    return load().charges.filter((c) => c.caseId === caseId)
      .sort((a, b) => (a.offenseDate ?? '').localeCompare(b.offenseDate ?? ''));
  }

  async listCharges(): Promise<Charge[]> {
    return load().charges;
  }

  async createCharge(data: Omit<Charge, 'id' | 'createdAt' | 'updatedAt'>): Promise<Charge> {
    const store = load();
    const rec: Charge = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.charges.push(rec);
    save(store);
    return rec;
  }

  async updateCharge(id: string, patch: Partial<Charge>): Promise<Charge> {
    const store = load();
    const idx = store.charges.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Charge not found');
    store.charges[idx] = { ...store.charges[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.charges[idx];
  }

  async deleteCharge(id: string): Promise<void> {
    const store = load();
    store.charges = store.charges.filter((c) => c.id !== id);
    save(store);
  }

  async createOaaIntake(data: Omit<OaaIntakeRecord, 'id' | 'createdAt'>): Promise<OaaIntakeRecord> {
    const store = load();
    const rec: OaaIntakeRecord = { ...data, id: uid(), createdAt: now() };
    store.oaaIntakes.push(rec);
    save(store);
    return rec;
  }

  async getOaaIntakeForCase(caseId: string): Promise<OaaIntakeRecord | null> {
    return load().oaaIntakes.find((r) => r.caseId === caseId) ?? null;
  }

  // ---- Statute cache (T2) ----

  async listStatuteChapters(): Promise<StatuteChapterMeta[]> {
    return load().statuteChapters
      .map(({ html: _html, ...meta }) => meta)
      .sort((a, b) => a.code.localeCompare(b.code) || a.chapter.localeCompare(b.chapter, undefined, { numeric: true }));
  }

  async getStatuteChapter(code: string, chapter: string): Promise<StatuteChapter | null> {
    return load().statuteChapters.find((c) => c.code === code && c.chapter === chapter) ?? null;
  }

  async saveStatuteChapter(
    data: Omit<StatuteChapter, 'id'>,
    sections: Omit<StatuteSection, 'id' | 'chapterId' | 'code' | 'chapter'>[],
  ): Promise<StatuteChapter> {
    const store = load();
    const existing = store.statuteChapters.find((c) => c.code === data.code && c.chapter === data.chapter);
    const id = existing?.id ?? uid();
    const rec: StatuteChapter = { ...data, id };
    store.statuteChapters = store.statuteChapters.filter((c) => c.id !== id);
    store.statuteChapters.push(rec);
    store.statuteSections = store.statuteSections.filter((s) => s.chapterId !== id);
    for (const s of sections) {
      store.statuteSections.push({ ...s, id: uid(), chapterId: id, code: data.code, chapter: data.chapter });
    }
    save(store);
    return rec;
  }

  async listSectionsForChapter(code: string, chapter: string): Promise<StatuteSection[]> {
    return load().statuteSections
      .filter((s) => s.code === code && s.chapter === chapter)
      .sort((a, b) => a.sectionNumber.localeCompare(b.sectionNumber, undefined, { numeric: true }));
  }

  async listSnapshotsForRule(ruleId: string): Promise<RegistryVerificationSnapshot[]> {
    return load().verificationSnapshots.filter((s) => s.ruleId === ruleId);
  }

  async listAllSnapshots(): Promise<RegistryVerificationSnapshot[]> {
    return load().verificationSnapshots;
  }

  async saveSnapshotsForRule(
    ruleId: string,
    snaps: Omit<RegistryVerificationSnapshot, 'id' | 'ruleId'>[],
  ): Promise<RegistryVerificationSnapshot[]> {
    const store = load();
    store.verificationSnapshots = store.verificationSnapshots.filter((s) => s.ruleId !== ruleId);
    const recs = snaps.map((s) => ({ ...s, id: uid(), ruleId }));
    store.verificationSnapshots.push(...recs);
    save(store);
    return recs;
  }

  async listWatchFlags(activeOnly?: boolean): Promise<WatchFlag[]> {
    const flags = load().watchFlags;
    return (activeOnly ? flags.filter((f) => !f.clearedAt) : flags)
      .sort((a, b) => b.raisedAt.localeCompare(a.raisedAt));
  }

  async createWatchFlag(data: Omit<WatchFlag, 'id' | 'raisedAt'>): Promise<WatchFlag> {
    const store = load();
    const rec: WatchFlag = { ...data, id: uid(), raisedAt: now() };
    store.watchFlags.push(rec);
    save(store);
    return rec;
  }

  async clearWatchFlag(id: string, clearedBy: string): Promise<WatchFlag> {
    const store = load();
    const idx = store.watchFlags.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error('Watch flag not found');
    store.watchFlags[idx] = { ...store.watchFlags[idx], clearedAt: now(), clearedBy };
    save(store);
    return store.watchFlags[idx];
  }

  // ---- Bill tracking (T3) ----

  async listWatchTargets(): Promise<WatchTarget[]> {
    return load().watchTargets.sort((a, b) =>
      a.kind.localeCompare(b.kind) || (a.note ?? '').localeCompare(b.note ?? '') || a.citeOrQuery.localeCompare(b.citeOrQuery));
  }

  async createWatchTarget(data: Omit<WatchTarget, 'id'>): Promise<WatchTarget> {
    const store = load();
    const rec: WatchTarget = { ...data, id: uid() };
    store.watchTargets.push(rec);
    save(store);
    return rec;
  }

  async updateWatchTarget(id: string, patch: Partial<Pick<WatchTarget, 'active' | 'note'>>): Promise<WatchTarget> {
    const store = load();
    const idx = store.watchTargets.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Watch target not found');
    store.watchTargets[idx] = { ...store.watchTargets[idx], ...patch, id };
    save(store);
    return store.watchTargets[idx];
  }

  async deleteWatchTarget(id: string): Promise<void> {
    const store = load();
    store.watchTargets = store.watchTargets.filter((t) => t.id !== id);
    save(store);
  }

  async listTrackedBills(): Promise<TrackedBill[]> {
    return load().trackedBills.sort((a, b) => a.billNumber.localeCompare(b.billNumber, undefined, { numeric: true }));
  }

  async upsertTrackedBill(data: Omit<TrackedBill, 'id'>): Promise<TrackedBill> {
    const store = load();
    const existing = store.trackedBills.find((b) => b.legiscanBillId === data.legiscanBillId);
    const rec: TrackedBill = { ...data, id: existing?.id ?? uid() };
    store.trackedBills = store.trackedBills.filter((b) => b.id !== rec.id);
    store.trackedBills.push(rec);
    save(store);
    return rec;
  }

  async listBillRefs(trackedBillId: string): Promise<BillStatuteRef[]> {
    return load().billRefs.filter((r) => r.trackedBillId === trackedBillId);
  }

  async listAllBillRefs(): Promise<BillStatuteRef[]> {
    return load().billRefs;
  }

  async saveBillRefs(
    trackedBillId: string,
    refs: Omit<BillStatuteRef, 'id' | 'trackedBillId'>[],
  ): Promise<BillStatuteRef[]> {
    const store = load();
    store.billRefs = store.billRefs.filter((r) => r.trackedBillId !== trackedBillId);
    const recs = refs.map((r) => ({ ...r, id: uid(), trackedBillId }));
    store.billRefs.push(...recs);
    save(store);
    return recs;
  }
}
