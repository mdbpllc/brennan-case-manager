import type {
  CaseRecord, PartyRecord, CasePartyLink, RosterBackfillFlag,
} from '../domain/types';
import type { ContactEdge } from '../domain/contactEdges';
import type { DirectoryFields } from '../domain/directory';
import type { PartyPii } from '../domain/partyPii';

/** A new contact. The CD-1 directory fields are OPTIONAL at the boundary and
 *  defaulted by the adapters (`withDirectoryDefaults`), so callers that predate
 *  the directory keep working and the `roleTags[0] === partyType` contract is
 *  enforced in one place rather than at every call site. */
export type PartyCreate =
  Omit<PartyRecord, 'id' | 'createdAt' | 'updatedAt' | keyof DirectoryFields>
  & Partial<DirectoryFields>;

/** What may be edited on an existing contact. Party type and kind stay frozen. */
export type PartyPatch = Partial<
  Pick<PartyRecord,
    'displayName' | 'fields' | 'roleTags' | 'aliases' | 'deceased' | 'deceasedDate'
    // Gate 10 §2. `party_pii` values are deliberately absent — they move through
    // savePartyPii, never through a party patch.
    | 'dateOfBirth'>
>;
import type { CaseClient, ClientBackfillFlag } from '../domain/client';
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
import type {
  MedicalBill, BillLineItem, CodeMapping, EOBRecord, AnalysisRun, AnalysisResultLine,
  ReviewLogEntry, LegalRule, FeeSchedule, FeeScheduleRate, GeneratedDocument,
  FacilityBillingProfile,
} from '../domain/billing';

/** Shared runtime guard for updateParty: both adapters throw on a patch key
 *  outside the mutable set instead of one applying it and the other silently
 *  dropping it (2026-07-21 audit item 9 — divergent adapter behaviour defeats
 *  the point of the seam). */
const MUTABLE_PARTY_KEYS = new Set([
  'displayName', 'fields',
  // CD-1 directory fields. `partyType` and `kind` stay OUT deliberately: the
  // type drives which fields the registry renders, and roleTags[0] mirrors it.
  'roleTags', 'aliases', 'deceased', 'deceasedDate',
  // Gate 10 §2 — the typed DOB column. It is mutable for the same reason the
  // blob is: the party form edits it. The `party_pii` values are NOT here and
  // never will be: they are written through savePartyPii, so that the one write
  // path which touches the child table is the one that knows it exists.
  'dateOfBirth',
]);

export function assertPartyPatchKeys(patch: Record<string, unknown>): void {
  const extra = Object.keys(patch).filter((k) => !MUTABLE_PARTY_KEYS.has(k));
  if (extra.length > 0) {
    throw new Error(`updateParty: unsupported patch key(s) ${extra.join(', ')} — only ${[...MUTABLE_PARTY_KEYS].join(', ')} are mutable (party type/kind are frozen at creation)`);
  }
}

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
  createParty(data: PartyCreate): Promise<PartyRecord>;
  /** displayName, fields, and the CD-1 directory fields are mutable — party
   *  type/kind stay frozen at creation. */
  updateParty(id: string, patch: PartyPatch): Promise<PartyRecord>;

  // ---- Gate 10 §3: the excluded PII child row, fetched ON DEMAND ----
  /** The `party_pii` row for one contact, or null if it has none.
   *
   *  **NEVER joined into a list read**, and there is deliberately no
   *  `listPartyPii`: the whole point of the child table is that a party read
   *  cannot carry these values, and a bulk fetch would recreate the exposure
   *  the table exists to remove. One party, on demand, behind the §4 reveal. */
  getPartyPii(partyId: string): Promise<PartyPii | null>;
  /** Upsert the child row. A patch whose values are all empty DELETES the row
   *  rather than storing a row of nulls — an empty PII record is not a fact
   *  about a person, and leaving one behind would make "has PII" unanswerable. */
  savePartyPii(partyId: string, patch: Omit<PartyPii, 'partyId'>): Promise<PartyPii | null>;

  // ---- CD-1 contact directory (docs/specs/contact-directory.md) ----
  /** §5 contact-to-contact edges. NEVER case-to-case — the CL-1 firewall (§5.3):
   *  these two never merge and neither ever holds the other's kind of link. */
  listContactEdges(): Promise<ContactEdge[]>;
  listContactEdgesForContact(contactId: string): Promise<ContactEdge[]>;
  createContactEdge(data: Omit<ContactEdge, 'id' | 'createdAt'>): Promise<ContactEdge>;
  deleteContactEdge(id: string): Promise<void>;
  /** Roster facts the CD-1 backfill could not derive. Advisory; never blocks. */
  listRosterFlags(): Promise<RosterBackfillFlag[]>;
  resolveRosterFlag(id: string): Promise<RosterBackfillFlag>;

  // ---- Client dimension (CL-2, claimant-dimension-and-case-links-design.md) ----
  /** Parallel to case_parties, NOT a promotion of it (D-CL2-8): links stay
   *  authoritative for roles, clients for damages scope. */
  listClientsForCase(caseId: string): Promise<CaseClient[]>;
  /** All clients across cases — the medical roll-up and flag banner read this. */
  listClients(): Promise<CaseClient[]>;
  createClient(data: Omit<CaseClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<CaseClient>;
  updateClient(id: string, patch: Partial<CaseClient>): Promise<CaseClient>;
  /** Refuses while the client still owns bills or runs — a client is a damages
   *  spine, and orphaning that ledger silently is the failure this prevents. */
  deleteClient(id: string): Promise<void>;

  /** Cases the backfill could not derive a client for. Never guessed. */
  listClientFlags(unresolvedOnly?: boolean): Promise<ClientBackfillFlag[]>;
  /** No-op when the case already has a flag (the table is unique on case_id).
   *  Used at case creation, where no party is linked yet so no client record
   *  can exist — the intake limitations date rides on the flag until one does. */
  createClientFlagIfAbsent(data: Omit<ClientBackfillFlag, 'id' | 'createdAt' | 'resolvedAt'>): Promise<ClientBackfillFlag | null>;
  getClientFlagForCase(caseId: string): Promise<ClientBackfillFlag | null>;
  /** Marks the flag resolved. The caller creates the client record first and
   *  carries `preservedStatuteOfLimitations` onto it (Michael, 2026-07-28). */
  resolveClientFlag(id: string): Promise<ClientBackfillFlag>;

  listLinksForCase(caseId: string): Promise<CasePartyLink[]>;
  listLinksForParty(partyId: string): Promise<CasePartyLink[]>;
  createLink(data: Omit<CasePartyLink, 'id' | 'createdAt'>): Promise<CasePartyLink>;
  deleteLink(id: string): Promise<void>;

  // ---- Billing module (Phase 1a) ----
  listBillsForCase(caseId: string): Promise<MedicalBill[]>;
  getBill(id: string): Promise<MedicalBill | null>;
  createBill(data: Omit<MedicalBill, 'id' | 'createdAt' | 'updatedAt'>): Promise<MedicalBill>;
  updateBill(id: string, patch: Partial<MedicalBill>): Promise<MedicalBill>;
  /** Cascades to line items, EOB, and analysis runs/result lines for the bill. */
  deleteBill(id: string): Promise<void>;

  listLineItems(billId: string): Promise<BillLineItem[]>;
  createLineItem(data: Omit<BillLineItem, 'id'>): Promise<BillLineItem>;
  updateLineItem(id: string, patch: Partial<BillLineItem>): Promise<BillLineItem>;
  deleteLineItem(id: string): Promise<void>;

  /** Chargemaster memory — protective-order mappings are excluded from cross-case use by callers. */
  listCodeMappings(): Promise<CodeMapping[]>;
  createCodeMapping(data: Omit<CodeMapping, 'id'>): Promise<CodeMapping>;

  /** All bills attached to a provider-business party, across cases — feeds the billing profile. */
  listBillsForProvider(facilityPartyId: string): Promise<MedicalBill[]>;
  getProviderProfile(facilityPartyId: string): Promise<FacilityBillingProfile | null>;
  /** Full replace keyed on facilityPartyId — the profile is a computed projection, never hand-edited. */
  upsertProviderProfile(data: Omit<FacilityBillingProfile, 'id' | 'updatedAt'>): Promise<FacilityBillingProfile>;

  getEobForBill(billId: string): Promise<EOBRecord | null>;
  saveEob(billId: string, data: Omit<EOBRecord, 'id' | 'billId' | 'updatedAt'>): Promise<EOBRecord>;

  listRunsForCase(caseId: string): Promise<AnalysisRun[]>;
  listRunsForBill(billId: string): Promise<AnalysisRun[]>;
  /** Persists a computed run + its result lines (ids pre-generated by the analysis engine). */
  createRun(run: AnalysisRun, resultLines: AnalysisResultLine[]): Promise<AnalysisRun>;
  /** Attorney sign-off: provisional → confirmed. Only confirmed runs may feed downstream math. */
  confirmRun(id: string, reviewer: string): Promise<AnalysisRun>;
  listResultLines(runId: string): Promise<AnalysisResultLine[]>;

  appendReviewLog(entry: Omit<ReviewLogEntry, 'id' | 'timestamp'>): Promise<ReviewLogEntry>;
  listReviewLog(entityType: string, entityId: string): Promise<ReviewLogEntry[]>;

  listLegalRules(): Promise<LegalRule[]>;
  /** Bumps version on every edit. Verified status is an attorney action in the UI —
   *  nothing programmatic ever sets it. */
  updateLegalRule(id: string, patch: Partial<Omit<LegalRule, 'id' | 'version' | 'createdAt' | 'updatedAt'>>): Promise<LegalRule>;

  listFeeSchedules(): Promise<FeeSchedule[]>;
  listRates(scheduleIds: string[]): Promise<FeeScheduleRate[]>;
  createFeeSchedule(
    data: Omit<FeeSchedule, 'id' | 'createdAt'>,
    rates: Omit<FeeScheduleRate, 'id' | 'scheduleId'>[],
  ): Promise<FeeSchedule>;
  deleteFeeSchedule(id: string): Promise<void>;

  listDocumentsForCase(caseId: string): Promise<GeneratedDocument[]>;
  createDocument(data: Omit<GeneratedDocument, 'id' | 'generatedAt'>): Promise<GeneratedDocument>;

  // ---- Calendar (Outlook push Phase 1) ----
  listEventsForCase(caseId: string): Promise<CalendarEvent[]>;
  /** The retry queue: everything not yet reflected in Outlook (pending or error), across cases. */
  listEventsPendingSync(): Promise<CalendarEvent[]>;
  createEvent(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent>;
  updateEvent(id: string, patch: Partial<CalendarEvent>): Promise<CalendarEvent>;

  // ---- Transcript sort & route (T1, transcript-sort-and-route-design.md) ----
  listTranscriptsForCase(caseId: string): Promise<Transcript[]>;
  /** The Office notes store — not-case-related recordings, kept and searchable (O3). */
  listOfficeNotes(): Promise<Transcript[]>;
  getTranscript(id: string): Promise<Transcript | null>;
  createTranscript(data: Omit<Transcript, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transcript>;
  /** The verified flag is attorney-only in the UI — nothing programmatic sets it. */
  updateTranscript(id: string, patch: Partial<Transcript>): Promise<Transcript>;

  listParticipants(transcriptId: string): Promise<TranscriptParticipant[]>;
  /** Full replace of a transcript's speaker→party mapping. */
  saveParticipants(
    transcriptId: string,
    participants: Omit<TranscriptParticipant, 'id' | 'transcriptId'>[],
  ): Promise<TranscriptParticipant[]>;

  /** The staging inbox — attorney-only until the multi-user phase. */
  listStagingItems(): Promise<StagingItem[]>;
  getStagingItem(id: string): Promise<StagingItem | null>;
  createStagingItem(data: Omit<StagingItem, 'id' | 'createdAt'>): Promise<StagingItem>;
  updateStagingItem(id: string, patch: Partial<StagingItem>): Promise<StagingItem>;

  /** The tuning log: suggested vs. chosen on every routing decision (design §5). */
  appendRoutingDecision(data: Omit<RoutingDecision, 'id' | 'decidedAt'>): Promise<RoutingDecision>;
  listRoutingDecisions(): Promise<RoutingDecision[]>;

  /** Spoken-tag templates are rows, not code — Michael extends them in the UI. */
  listTagTemplates(): Promise<TagTemplate[]>;
  createTagTemplate(data: Omit<TagTemplate, 'id'>): Promise<TagTemplate>;
  deleteTagTemplate(id: string): Promise<void>;

  /** Firm/case glossary terms feeding the vocabulary boost lists (design D3). */
  listGlossaryTerms(): Promise<GlossaryTerm[]>;
  createGlossaryTerm(data: Omit<GlossaryTerm, 'id'>): Promise<GlossaryTerm>;
  deleteGlossaryTerm(id: string): Promise<void>;

  // ---- OAA criminal intake (criminal-appointment-intake spec §1) ----
  listChargesForCase(caseId: string): Promise<Charge[]>;
  /** All charges across cases — feeds the duplicate-cause check at intake. */
  listCharges(): Promise<Charge[]>;
  createCharge(data: Omit<Charge, 'id' | 'createdAt' | 'updatedAt'>): Promise<Charge>;
  updateCharge(id: string, patch: Partial<Charge>): Promise<Charge>;
  deleteCharge(id: string): Promise<void>;

  /** Audit record of what an OAA intake extracted (template, text, provenance). */
  createOaaIntake(data: Omit<OaaIntakeRecord, 'id' | 'createdAt'>): Promise<OaaIntakeRecord>;
  getOaaIntakeForCase(caseId: string): Promise<OaaIntakeRecord | null>;

  // ---- Statute cache (T2, statute-text-and-bill-tracking-design.md §6) ----
  /** Without the html payload — list views. */
  listStatuteChapters(): Promise<StatuteChapterMeta[]>;
  getStatuteChapter(code: string, chapter: string): Promise<StatuteChapter | null>;
  /** Upsert keyed on code+chapter; replaces the chapter's sections wholesale. */
  saveStatuteChapter(
    data: Omit<StatuteChapter, 'id'>,
    sections: Omit<StatuteSection, 'id' | 'chapterId' | 'code' | 'chapter'>[],
  ): Promise<StatuteChapter>;
  listSectionsForChapter(code: string, chapter: string): Promise<StatuteSection[]>;

  /** A4: snapshots pin the section text a verification actually saw. */
  listSnapshotsForRule(ruleId: string): Promise<RegistryVerificationSnapshot[]>;
  listAllSnapshots(): Promise<RegistryVerificationSnapshot[]>;
  /** Full replace per rule — re-verification re-pins. */
  saveSnapshotsForRule(
    ruleId: string,
    snaps: Omit<RegistryVerificationSnapshot, 'id' | 'ruleId'>[],
  ): Promise<RegistryVerificationSnapshot[]>;

  /** Advisory watch flags — never touch a rule's verified status. */
  listWatchFlags(activeOnly?: boolean): Promise<WatchFlag[]>;
  createWatchFlag(data: Omit<WatchFlag, 'id' | 'raisedAt'>): Promise<WatchFlag>;
  clearWatchFlag(id: string, clearedBy: string): Promise<WatchFlag>;

  // ---- Bill tracking (T3, statute-text-and-bill-tracking-design.md §6) ----
  listWatchTargets(): Promise<WatchTarget[]>;
  createWatchTarget(data: Omit<WatchTarget, 'id'>): Promise<WatchTarget>;
  updateWatchTarget(id: string, patch: Partial<Pick<WatchTarget, 'active' | 'note'>>): Promise<WatchTarget>;
  deleteWatchTarget(id: string): Promise<void>;

  listTrackedBills(): Promise<TrackedBill[]>;
  /** Upsert keyed on legiscanBillId — polls re-deliver the same bill. */
  upsertTrackedBill(data: Omit<TrackedBill, 'id'>): Promise<TrackedBill>;

  // ---- Form engine (FE-D1, docs/specs/fe-d1-build-slice.md) ----
  /** The template bank. Templates are DATA, not code (§1). */
  listFormTemplates(): Promise<FormTemplate[]>;
  getFormTemplateByKey(key: string): Promise<FormTemplate | null>;
  createFormTemplate(
    data: Omit<FormTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormTemplate>;
  updateFormTemplate(
    id: string,
    patch: Partial<Pick<FormTemplate, 'name' | 'provenance' | 'notes' | 'formatProfileId' | 'currentVersionId'>>,
  ): Promise<FormTemplate>;

  listTemplateVersions(templateId: string): Promise<FormTemplateVersion[]>;
  getTemplateVersion(id: string): Promise<FormTemplateVersion | null>;
  /** The minimal in-app editor's write path (slice item 10). Publishes a NEW
   *  version and repoints the template at it — it NEVER edits a version in
   *  place, because "which text went out the door" has to stay answerable. */
  publishTemplateVersion(
    templateId: string,
    body: string,
    settings: Record<string, string>,
    changeNote?: string,
  ): Promise<FormTemplateVersion>;

  /** §10's token registry. `templateId` omitted lists the global tokens too. */
  listTokenDefinitions(templateId?: string): Promise<FormTokenDefinition[]>;
  upsertTokenDefinition(
    data: Omit<FormTokenDefinition, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormTokenDefinition>;

  /** FE-10 format profiles. */
  listFormatProfiles(): Promise<FormFormatProfile[]>;
  upsertFormatProfile(
    data: Omit<FormFormatProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormFormatProfile>;

  listBillRefs(trackedBillId: string): Promise<BillStatuteRef[]>;
  listAllBillRefs(): Promise<BillStatuteRef[]>;
  /** Full replace per bill — the matcher's output is recomputed wholesale. */
  saveBillRefs(
    trackedBillId: string,
    refs: Omit<BillStatuteRef, 'id' | 'trackedBillId'>[],
  ): Promise<BillStatuteRef[]>;
}
