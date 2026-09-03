import {
  assertPartyPatchKeys, type DataAdapter, type PartyCreate, type PartyPatch,
} from './adapter';
import { validateEdge } from '../domain/contactEdges';
import type {
  CaseRecord, PartyRecord, CasePartyLink, RosterBackfillFlag,
} from '../domain/types';
import type { ContactEdge } from '../domain/contactEdges';
import type {
  CaseChronologyVersion, CaseProvider, CaseProviderIndividual, CaseProviderVisit,
  GeneratedDocumentParagraph,
} from '../domain/caseProviders';
import { validateCaseProvider } from '../domain/caseProviders';
import { withDirectoryDefaults } from '../domain/directory';
import {
  splitPartyFields, stripDestinationKeys, isEmptyPii, type PartyPii,
} from '../domain/partyPii';
import { backfillRosterAttributes, summarizeBackfill } from '../domain/rosterBackfill';
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
import { seedData } from './seed';
import { seedFormEngine } from '../forms/seed';
import { DISCLOSURE_VARIANTS } from '../forms/variants';

const KEY = 'brennan-case-manager-v1';

/** Bump when a record shape changes incompatibly — stale demo stores reseed
 *  instead of rendering oddly. Demo data only, so a wipe is acceptable. */
export const STORE_VERSION = 15; // v15: FE-D1 amendment second half - the
// fixed-sentence and writer-instruction template rows, and the general fix for a
// bank that never gained newly-seeded templates. v14: FE-D1 amendment - the provider/facility
// rename inside stored rows, and section 9.4's ruled edit appended as a new
// template version. v13: FE-D1 form engine (template bank,
// versioned template bodies, token registry, format profiles). v12: gate 10 PII
// promotion (dob typed, party_pii child records out of the fields blob). v11:
// CD-1 contact directory (role tags, typed aliases, deceased fact; roster
// four-attribute links with capacity and history; roster backfill flags;
// contact edges). v10 was CL-2.

interface Store {
  version: number;
  cases: CaseRecord[];
  parties: PartyRecord[];
  links: CasePartyLink[];
  /** CD-1 §5 — contact-to-contact edges. NEVER case-to-case (the CL-1 firewall). */
  contactEdges: ContactEdge[];
  /** CD-1 — roster facts the backfill could not derive. Never guessed. */
  rosterFlags: RosterBackfillFlag[];
  /** Gate 10 §3 — the local-mode equivalent of the `party_pii` child table.
   *  Kept as its own collection rather than a property of the party record so
   *  that a party read cannot carry it by accident: `listParties` returns
   *  `store.parties`, and these values are not in there. */
  partyPii: PartyPii[];
  clients: CaseClient[];
  clientFlags: ClientBackfillFlag[];
  /** R17 (fe-d1-amendment-slice.md §3.1) — the CASE-SCOPED provider record and
   *  what hangs beneath it. Case-scoped by ruling: a facility typed here is
   *  typed for THIS case. The model never creates any of these rows except the
   *  individuals and visits beneath a facility Michael already selected. */
  caseProviders: CaseProvider[];
  caseProviderIndividuals: CaseProviderIndividual[];
  caseProviderVisits: CaseProviderVisit[];
  caseChronologyVersions: CaseChronologyVersion[];
  generatedDocumentParagraphs: GeneratedDocumentParagraph[];
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
  facilityProfiles: FacilityBillingProfile[];
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
  /** FE-D1 §10 — templates are DATA, not code. The demo-mode equivalent of the
   *  four form_* tables; the wizard must behave identically in both modes. */
  formTemplates: FormTemplate[];
  formTemplateVersions: FormTemplateVersion[];
  formTokenDefinitions: FormTokenDefinition[];
  formFormatProfiles: FormFormatProfile[];
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

/** The v9 case shape, before CL-2 retired the case-level limitations date.
 *  Declared locally because CaseRecord no longer carries these. */
type LegacyCase = Omit<CaseRecord, 'piFlags'> & { statuteOfLimitations?: string; piFlags: string[] };

const MEDICARE_FLAG = 'Medicare/Medicaid beneficiary';

/**
 * v9 → v10: the CL-2 client dimension, migrated FORWARD in place.
 *
 * Deliberately NOT the reseed path. The reseed carries only imported fee
 * schedules and confirmed runs; everything else — cases, parties, bills,
 * line items — is thrown away and re-seeded. That is acceptable when a record
 * SHAPE changes incompatibly, but CL-2 adds a dimension that can be DERIVED
 * from what is already there, so wiping would destroy demo work for no reason
 * and would not exercise the backfill Michael has to walk.
 *
 * Mirrors db/migrations/2026-07-28-cl2-client-dimension.sql step for step, so
 * both modes behave identically (the adapter-seam rule).
 */
export function migrateV9ToV10(old: Store, raw: string): Store {
  localStorage.setItem(`${KEY}-backup-v9`, raw);
  const stamp = now();
  const clients: CaseClient[] = [];
  const clientFlags: ClientBackfillFlag[] = [];
  const reviewLog: ReviewLogEntry[] = [...(old.reviewLog ?? [])];
  const cases = (old.cases ?? []) as LegacyCase[];

  for (const c of cases) {
    // case_parties is NOT touched — D-CL2-8, parallel not promotion. The
    // client-role row stays exactly where it is. Stated so nobody "tidies".
    const clientLinks = (old.links ?? []).filter(
      (l) => l.caseId === c.id && (l.role === 'Client' || l.role === 'Plaintiff'),
    );

    if (clientLinks.length === 0) {
      // NEVER guessed, NEVER placeholdered (design §5). The limitations date is
      // preserved on the flag and carries to the client record on resolve
      // (Michael's ruling 2026-07-28) — the case column is about to disappear.
      const flag: ClientBackfillFlag = {
        id: uid(),
        caseId: c.id,
        reason:
          'CL-2 backfill: no party on this case carries a Client or Plaintiff role, so no '
          + 'client record could be derived. Not guessed and not placeholdered. Link a '
          + 'client-role party and create the client record; any preserved limitations '
          + 'date carries over to it.',
        preservedStatuteOfLimitations: c.statuteOfLimitations,
        createdAt: stamp,
      };
      clientFlags.push(flag);
      reviewLog.push({
        id: uid(), entityType: 'case', entityId: c.id, action: 'edited',
        user: 'system (CL-2 backfill)', timestamp: stamp,
        oldValue: c.statuteOfLimitations ?? '(no date)',
        reason:
          'FLAGGED FOR MICHAEL: no client-role party, so no client record was derived. '
          + 'Limitations date preserved on the flag and carries to the client record '
          + 'when one is created.',
      });
      continue;
    }

    clientLinks.forEach((link, i) => {
      // sol_basis is 'manual', not 'standard': the case-level date was typed by
      // hand and its true basis is unknown. Asserting a basis would be a guess
      // about a legal deadline.
      const client: CaseClient = {
        id: uid(),
        caseId: c.id,
        partyId: link.partyId,
        // Posture follows the practice area: our client on a criminal matter is
        // the DEFENDANT. Deriving it beats defaulting everyone to 'claimant',
        // which would be wrong on every criminal file in the system.
        posture: c.practiceArea === 'Criminal' ? 'defendant' : 'claimant',
        displayOrder: i,
        statuteOfLimitations: c.statuteOfLimitations,
        solBasis: c.statuteOfLimitations ? 'manual' : undefined,
        clientFlags: (c.piFlags ?? []).includes(MEDICARE_FLAG) ? [MEDICARE_FLAG] : [],
        feeArrangement: {},
        profileFields: {},
        notes: 'Derived by the CL-2 backfill, 2026-07-28.',
        createdAt: stamp,
        updatedAt: stamp,
      };
      clients.push(client);
      reviewLog.push({
        id: uid(), entityType: 'case_client', entityId: client.id, action: 'created',
        user: 'system (CL-2 backfill)', timestamp: stamp,
        reason:
          `Client derived from the case's ${link.role}-role party during the CL-2 `
          + 'migration. Limitations date carried from the case before that field '
          + 'was retired.',
      });
    });
  }

  // Unambiguous only where the case has exactly ONE client — which is every
  // case in existence today. Multi-client cases get assigned by hand: a wrong
  // body on a bill is worse than an unassigned one.
  const soleClientByCase = new Map<string, string>();
  for (const c of clients) {
    if (soleClientByCase.has(c.caseId)) soleClientByCase.set(c.caseId, '');
    else soleClientByCase.set(c.caseId, c.id);
  }
  const soleId = (caseId: string) => soleClientByCase.get(caseId) || undefined;

  const migrated: Store = {
    ...(old as Store),
    // Literal 10, NOT STORE_VERSION: this function produces a v10 store and
    // nothing more. When STORE_VERSION moved to 11 it briefly stamped 11 here
    // while doing no CD-1 work — the chain in load() hid it. A migration step
    // must name the version it actually produces.
    version: 10,
    clients,
    clientFlags,
    reviewLog,
    bills: (old.bills ?? []).map((b) => ({ ...b, clientId: b.clientId ?? soleId(b.caseId) })),
    runs: (old.runs ?? []).map((r) => ({ ...r, clientId: r.clientId ?? soleId(r.caseId) })),
    // Medicare/Medicaid moved to the client records above — a move, not a loss.
    // The other occurrence flags stay put (D-CL2-5).
    cases: cases.map((c) => {
      const { statuteOfLimitations: _retired, ...rest } = c;
      return { ...rest, piFlags: (c.piFlags ?? []).filter((f) => f !== MEDICARE_FLAG) } as CaseRecord;
    }),
  };

  const summary =
    `Store migrated v9→v10 (CL-2 client dimension). Derived `
    + `${clients.length} client record(s); flagged ${clientFlags.length} case(s) with no `
    + `client-role party; stamped client_id on bills and runs for single-client cases. `
    + `Case-level statute of limitations retired. Full pre-migration backup at `
    + `localStorage key "${KEY}-backup-v9".`;
  migrated.reviewLog.push({
    id: uid(), entityType: 'demo_store', entityId: KEY, action: 'edited',
    user: 'system (CL-2 migration)', timestamp: stamp, reason: summary,
  });
  console.warn(summary);
  localStorage.setItem(KEY, JSON.stringify(migrated));
  return migrated;
}

/** v10 → v11: the CD-1 directory and roster evolution, FORWARD IN PLACE.
 *
 *  Nothing is dropped and nothing is guessed. Contacts gain their directory
 *  fields from `withDirectoryDefaults` (roleTags[0] = partyType). Links gain the
 *  four attributes from `backfillRosterAttributes`, which derives an alignment
 *  only where the derivation is mechanical and FLAGS the rest — the CL-2
 *  `case_client_flags` precedent, applied to the roster. The existing `side`
 *  column is left exactly as it is: it already IS firm perspective.
 *
 *  A full pre-migration backup is written before anything changes, same as the
 *  CL-2 migration, because the flag list is only useful if the original is
 *  still readable. */
export function migrateV10ToV11(old: Partial<Store>, raw: string): Store {
  const stamp = now();
  localStorage.setItem(`${KEY}-backup-v10`, raw);

  const cases = (old.cases ?? []) as CaseRecord[];
  const caseById = new Map(cases.map((c) => [c.id, c]));

  const parties = (old.parties ?? []).map((p) => withDirectoryDefaults(p as PartyRecord));

  const rosterFlags: RosterBackfillFlag[] = [];
  const results: ReturnType<typeof backfillRosterAttributes>[] = [];
  const links = (old.links ?? []).map((l) => {
    const c = caseById.get(l.caseId);
    // A link whose case is gone cannot have its side set resolved; leave it
    // untouched rather than invent one.
    if (!c) return l;
    const result = backfillRosterAttributes(l, c);
    results.push(result);
    if (result.flag) {
      rosterFlags.push({
        id: uid(),
        caseId: l.caseId,
        casePartyId: l.id,
        reason: result.flag.reason,
        unmappedValue: result.flag.unmappedValue,
        createdAt: stamp,
      });
    }
    return { ...l, ...result.patch };
  });

  const migrated: Store = {
    ...(old as Store),
    // Literal 11, NOT STORE_VERSION - the same defect this file already
    // documents on the v9->v10 step, which is why that one says "Literal 10".
    // This step produces a v11 store and nothing more. It read STORE_VERSION
    // and was correct only while that constant happened to be 11; gate 10's
    // bump to 12 made it stamp a v11 store as v12, which would have made the
    // v10 chain SKIP the v11->v12 migration entirely and leave SSNs in the
    // blob. Caught by the bump that caused it; fixed here.
    version: 11,
    parties,
    links,
    rosterFlags,
    contactEdges: old.contactEdges ?? [],
  };

  const s = summarizeBackfill(results);
  const summary =
    `Store migrated v10→v11 (CD-1 contact directory). `
    + `Tagged ${parties.length} contact(s) from their existing party type; processed `
    + `${s.linksProcessed} roster link(s): ${s.alignmentsDerived} caption alignment(s) derived `
    + `mechanically, ${s.nonPartiesDerived} marked non-party, ${s.flagged} FLAGGED for attorney `
    + `review (nothing guessed). Firm perspective (side) untouched. Full pre-migration backup at `
    + `localStorage key "${KEY}-backup-v10".`;
  migrated.reviewLog = [...(old.reviewLog ?? []), {
    id: uid(), entityType: 'demo_store', entityId: KEY, action: 'edited',
    user: 'system (CD-1 migration)', timestamp: stamp, reason: summary,
  }];
  console.warn(summary);
  localStorage.setItem(KEY, JSON.stringify(migrated));
  return migrated;
}

/** v11 → v12: gate 10's PII promotion, FORWARD IN PLACE.
 *
 *  The front-end half of gate 10 (slice §§2-3, authorized by `G10-5`
 *  2026-08-19). Demo mode runs the same promotion the live schema ran, so what
 *  Michael clicks in demo mode is what a migrated database does.
 *
 *  For every contact: `dob` leaves the `fields` blob for the typed
 *  `dateOfBirth`; `ssn`, `dlNumber` and `dlState` leave it for a `partyPii`
 *  record. **The blob keys are REMOVED, not copied** — a value left behind in
 *  the blob is exactly the exposure the slice exists to close, and "migrated"
 *  would then mean "duplicated."
 *
 *  NOTHING IS GUESSED AND NOTHING IS DROPPED: every value that leaves the blob
 *  lands somewhere, the counts are reported, and a full pre-migration backup is
 *  written first — the CL-2 and CD-1 pattern, for the same reason. If the split
 *  is ever questioned, the original store is still readable.
 *
 *  A contact with no PII gets NO `partyPii` record. An empty record is not a
 *  fact about a person. */
export function migrateV11ToV12(old: Partial<Store>, raw: string): Store {
  const stamp = now();
  localStorage.setItem(`${KEY}-backup-v11`, raw);

  const partyPii: PartyPii[] = [];
  let dobMoved = 0;
  let piiContacts = 0;

  const parties = (old.parties ?? []).map((p) => {
    const rec = p as PartyRecord;
    const split = splitPartyFields(rec.fields ?? {});
    if (split.dateOfBirth) dobMoved += 1;
    if (!isEmptyPii(split.pii)) {
      piiContacts += 1;
      partyPii.push({ partyId: rec.id, ...split.pii });
    }
    return {
      ...rec,
      fields: split.fields,
      // `??` not `||`: an existing typed value wins over an absent blob one, and
      // a blob value of '' must not overwrite a real stored date.
      dateOfBirth: split.dateOfBirth ?? rec.dateOfBirth ?? null,
    };
  });

  const migrated: Store = {
    ...(old as Store),
    // Literal 12, for the reason the v9->v10 and v10->v11 steps both give:
    // this function produces a v12 store, not "whatever the constant is now".
    version: 12,
    parties,
    partyPii,
  };

  const summary =
    `Store migrated v11→v12 (gate 10 PII promotion). `
    + `Promoted ${dobMoved} date(s) of birth to the typed column and moved SSN / licence `
    + `values for ${piiContacts} contact(s) into ${partyPii.length} party_pii record(s). `
    + `The four keys were REMOVED from every fields blob, not copied. Full pre-migration `
    + `backup at localStorage key "${KEY}-backup-v11".`;
  migrated.reviewLog = [...(old.reviewLog ?? []), {
    id: uid(), entityType: 'demo_store', entityId: KEY, action: 'edited',
    user: 'system (gate 10 PII migration)', timestamp: stamp, reason: summary,
  }];
  console.warn(summary);
  localStorage.setItem(KEY, JSON.stringify(migrated));
  return migrated;
}

/** v12 -> v13: the FE-D1 form engine.
 *
 *  PURELY ADDITIVE. Four new collections arrive seeded with the template bank;
 *  nothing existing is read, moved, or reshaped. That is why there is no
 *  promotion pass here and no data loss to guard against — but the backup is
 *  still written, because "additive" is a claim about the code and the backup is
 *  a fact about the data.
 *
 *  The seed is applied to a MIGRATED store as well as a fresh one: a demo store
 *  that migrates forward must end up with the same template bank a reseed would
 *  give it, or demo mode would show an empty template picker to anyone whose
 *  store predates this version. */
export function migrateV12ToV13(old: Partial<Store>, raw: string): Store {
  const stamp = now();
  localStorage.setItem(`${KEY}-backup-v12`, raw);

  const seeded = seedFormEngine();

  const migrated: Store = {
    ...(old as Store),
    // Literal 13, NOT STORE_VERSION - the defect this file has now warned about
    // at three separate steps. `migrateV10ToV11` stamped the constant instead of
    // a literal and was correct only while the constant happened to be 11; at 12
    // it would have stamped a v11 store as v12 and skipped v11->v12 entirely,
    // leaving SSNs in the blob. This function produces a v13 store and nothing
    // more.
    version: 13,
    formTemplates: old.formTemplates ?? seeded.formTemplates,
    formTemplateVersions: old.formTemplateVersions ?? seeded.formTemplateVersions,
    formTokenDefinitions: old.formTokenDefinitions ?? seeded.formTokenDefinitions,
    formFormatProfiles: old.formFormatProfiles ?? seeded.formFormatProfiles,
  };

  const summary =
    `Store migrated v12\u219213 (FE-D1 form engine). Added the template bank: `
    + `${migrated.formTemplates.length} template(s), `
    + `${migrated.formTemplateVersions.length} version(s), `
    + `${migrated.formTokenDefinitions.length} token definition(s), `
    + `${migrated.formFormatProfiles.length} format profile(s). `
    + `Purely additive - no existing collection was read or reshaped. Full `
    + `pre-migration backup at localStorage key "${KEY}-backup-v12".`;
  migrated.reviewLog = [...(old.reviewLog ?? []), {
    id: uid(), entityType: 'demo_store', entityId: KEY, action: 'edited',
    user: 'system (FE-D1 form engine migration)', timestamp: stamp, reason: summary,
  }];
  console.warn(summary);
  localStorage.setItem(KEY, JSON.stringify(migrated));
  return migrated;
}

/** v13 -> v14 - the FE-D1 amendment's rename, and section 9.4's ruled edit.
 *
 *  TWO JOBS, both on data the app already holds.
 *
 *  THE RENAME. AS-Q11 made PROVIDER mean the PERSON and FACILITY mean the
 *  business, so `providerPartyId` became `facilityPartyId` on bills, code
 *  mappings and the billing profile, and the profile collection was renamed with
 *  it. A stored v13 bill still carries the old key while the renamed code reads
 *  the new one, so a store that migrated without this step would show every bill
 *  with NO facility rather than failing loudly. The keys are moved in place and
 *  the old ones deleted, so nothing reads them by accident afterwards.
 *
 *  SECTION 9.4's EDIT. D-63: a FRESH seed carries the ruled text as v1, because a
 *  fresh seed has no old text to preserve. A store that already holds v1 gets a
 *  NEW VERSION APPENDED instead - never an overwrite, because the editor's whole
 *  contract is that "which text went out the door" stays answerable. The change
 *  note quotes Michael's ruling. Any template whose current body has drifted from
 *  the generated constant is carried the same way, so this is not special-cased
 *  to the chiropractor and a future spec edit migrates by the same route.
 *
 *  Forward-in-place with a full backup - the migrateV10ToV11 lesson. The backup
 *  is written before anything is reshaped, and it holds v13 text because each
 *  step re-serializes for the next one. */
export function migrateV13ToV14(old: Partial<Store>, raw: string): Store {
  const stamp = now();
  localStorage.setItem(`${KEY}-backup-v13`, raw);

  const renameKey = <T,>(row: T): T => {
    const bag = row as Record<string, unknown>;
    if (!('providerPartyId' in bag)) return row;
    const { providerPartyId, ...rest } = bag;
    return { ...rest, facilityPartyId: providerPartyId } as unknown as T;
  };

  const bills = (old.bills ?? []).map(renameKey);
  const codeMappings = (old.codeMappings ?? []).map(renameKey);
  // The collection itself was renamed, so a v13 store still calls it
  // `providerProfiles` - a key the Store type no longer has.
  const legacy = old as unknown as { providerProfiles?: FacilityBillingProfile[] };
  const facilityProfiles = (old.facilityProfiles ?? legacy.providerProfiles ?? []).map(renameKey);

  const templates = [...(old.formTemplates ?? [])];
  const versions = [...(old.formTemplateVersions ?? [])];
  const republished: string[] = [];

  for (const variant of DISCLOSURE_VARIANTS) {
    const tpl = templates.find((t) => t.key === variant.key);
    if (!tpl) continue;
    const current = versions.find((v) => v.id === tpl.currentVersionId);
    if (!current || current.body === variant.body) continue;

    const highest = versions
      .filter((v) => v.templateId === tpl.id)
      .reduce((max, v) => Math.max(max, v.versionNo), 0);
    const nextId = uid();
    versions.push({
      id: nextId,
      templateId: tpl.id,
      versionNo: highest + 1,
      body: variant.body,
      settings: { ...current.settings },
      changeNote:
        `form-engine.md section ${variant.section} was amended in the design space and this `
        + `version carries the amendment. Section 9.4's edit is Michael's ruling of `
        + `2026-08-31: "Get rid of chiropractic probability and replace with medical `
        + `probability." The previous version is kept - the editor appends, it never `
        + `overwrites.`,
      createdAt: stamp,
    });
    templates[templates.indexOf(tpl)] = { ...tpl, currentVersionId: nextId, updatedAt: stamp };
    republished.push(variant.section);
  }

  const migrated: Store = {
    ...(old as Store),
    // Literal 14, NOT STORE_VERSION - the defect this file now warns about at
    // four separate steps. This function produces a v14 store and nothing more.
    version: 14,
    bills,
    codeMappings,
    facilityProfiles,
    formTemplates: templates,
    formTemplateVersions: versions,
  };
  delete (migrated as unknown as { providerProfiles?: unknown }).providerProfiles;

  const summary =
    `Store migrated v13→14 (FE-D1 amendment). Renamed providerPartyId→facilityPartyId `
    + `on ${bills.length} bill(s), ${codeMappings.length} code mapping(s) and `
    + `${facilityProfiles.length} billing profile(s), and renamed the profile collection. `
    + (republished.length > 0
      ? `Appended a new template version for section(s) ${republished.join(', ')} - prior versions kept. `
      : `No template body had drifted, so no version was appended. `)
    + `Full pre-migration backup at localStorage key "${KEY}-backup-v13".`;
  migrated.reviewLog = [...(old.reviewLog ?? []), {
    id: uid(), entityType: 'demo_store', entityId: KEY, action: 'edited',
    user: 'system (FE-D1 amendment migration)', timestamp: stamp, reason: summary,
  }];
  console.warn(summary);
  localStorage.setItem(KEY, JSON.stringify(migrated));
  return migrated;
}

/**
 * v14 → v15 — the FE-D1 amendment slice's second half.
 *
 * TEMPLATE BANK: appends every SEEDED template the store does not already
 * carry, by key, with its current version. That brings the 22 `fixed-sentence`
 * rows and the one `writer-instructions` row (D-6, D-36) to a store that
 * already exists.
 *
 * It also closes a general defect this migration is the first to hit: every
 * earlier step carried the bank forward with `old.formTemplates ?? seeded`, so
 * a store that already had a bank NEVER gained a newly-seeded template. That
 * was invisible while the only additions were new VERSIONS of templates the
 * store already held. It stops being invisible the moment a slice seeds a new
 * FAMILY, because the app would look for a fixed sentence that is simply not
 * there. Matching by KEY rather than by id is what makes it safe to re-run and
 * safe against a store whose ids were generated rather than seeded.
 *
 * A template Michael has EDITED is never touched: the append is keyed on
 * absence, so an existing row keeps its body, its versions and its
 * currentVersionId.
 */
export function migrateV14ToV15(old: Partial<Store>, raw: string): Store {
  const stamp = now();
  localStorage.setItem(`${KEY}-backup-v14`, raw);

  const seeded = seedFormEngine();
  const templates = [...(old.formTemplates ?? [])];
  const versions = [...(old.formTemplateVersions ?? [])];
  const have = new Set(templates.map((t) => t.key));
  const added: string[] = [];

  for (const tpl of seeded.formTemplates) {
    if (have.has(tpl.key)) continue;
    const version = seeded.formTemplateVersions.find((v) => v.id === tpl.currentVersionId);
    if (!version) continue;              // a seed with no body is not worth adding
    templates.push({ ...tpl, createdAt: stamp, updatedAt: stamp });
    versions.push({ ...version, createdAt: stamp });
    have.add(tpl.key);
    added.push(tpl.key);
  }

  const migrated: Store = {
    ...(old as Store),
    // Literal 15, NOT STORE_VERSION — the `migrateV10ToV11` lesson. This
    // function produces a v15 store and nothing more.
    version: 15,
    formTemplates: templates,
    formTemplateVersions: versions,
    // R17's collections. An ABSENT collection reads as `undefined` at every
    // call site, which is a different bug from an empty one and a worse one.
    caseProviders: old.caseProviders ?? [],
    caseProviderIndividuals: old.caseProviderIndividuals ?? [],
    caseProviderVisits: old.caseProviderVisits ?? [],
    caseChronologyVersions: old.caseChronologyVersions ?? [],
    generatedDocumentParagraphs: old.generatedDocumentParagraphs ?? [],
  };

  const summary =
    `Store migrated v14→15 (FE-D1 amendment, second half). `
    + (added.length > 0
      ? `Added ${added.length} seeded template(s) the store did not carry, including the `
        + `fixed sentences the app places and the writer instructions. `
      : `Every seeded template was already present, so none was added. `)
    + `No existing template was modified. Full pre-migration backup at localStorage key `
    + `"${KEY}-backup-v14".`;
  migrated.reviewLog = [...(old.reviewLog ?? []), {
    id: uid(), entityType: 'demo_store', entityId: KEY, action: 'edited',
    user: 'system (FE-D1 amendment migration, v15)', timestamp: stamp, reason: summary,
  }];
  console.warn(summary);
  localStorage.setItem(KEY, JSON.stringify(migrated));
  return migrated;
}

function load(): Store {
  const raw = localStorage.getItem(KEY);
  let old: Partial<Store> | null = null;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Store;
      if (parsed.version === STORE_VERSION) return parsed;
      // v9 can be migrated forward without losing anything — do that instead
      // of reseeding. Older stores fall through to the reseed path below.
      //
      // EACH STEP RE-SERIALIZES FOR THE NEXT STEP'S BACKUP, so `-backup-v10`
      // really holds v10 text and `-backup-v11` really holds v11 text. Passing
      // the ORIGINAL raw down the chain would label every backup with the
      // oldest store's contents — the bug this comment exists to prevent, and
      // the reason the v9 path already re-serialized before gate 10 added a
      // third step.
      if (parsed.version === 14) return migrateV14ToV15(parsed, raw);
      if (parsed.version === 13) {
        const v14 = migrateV13ToV14(parsed, raw);
        return migrateV14ToV15(v14, JSON.stringify(v14));
      }
      if (parsed.version === 12) {
        const v13 = migrateV12ToV13(parsed, raw);
        const v14 = migrateV13ToV14(v13, JSON.stringify(v13));
        return migrateV14ToV15(v14, JSON.stringify(v14));
      }
      if (parsed.version === 11) {
        const v12 = migrateV11ToV12(parsed, raw);
        const v13 = migrateV12ToV13(v12, JSON.stringify(v12));
        const v14 = migrateV13ToV14(v13, JSON.stringify(v13));
        return migrateV14ToV15(v14, JSON.stringify(v14));
      }
      if (parsed.version === 10) {
        const v11 = migrateV10ToV11(parsed, raw);
        const v12 = migrateV11ToV12(v11, JSON.stringify(v11));
        const v13 = migrateV12ToV13(v12, JSON.stringify(v12));
        const v14 = migrateV13ToV14(v13, JSON.stringify(v13));
        return migrateV14ToV15(v14, JSON.stringify(v14));
      }
      // v9 chains forward through v10 rather than reseeding — a v9 store that
      // reached CL-2's migration must not lose it to CD-1's bump.
      if (parsed.version === 9) {
        const v10 = migrateV9ToV10(parsed, raw);
        const v11 = migrateV10ToV11(v10, JSON.stringify(v10));
        const v12 = migrateV11ToV12(v11, JSON.stringify(v11));
        const v13 = migrateV12ToV13(v12, JSON.stringify(v12));
        const v14 = migrateV13ToV14(v13, JSON.stringify(v13));
        return migrateV14ToV15(v14, JSON.stringify(v14));
      }
      // version mismatch (or pre-versioning store) — reseed, but never
      // silently: back up the whole old store and carry attorney work forward.
      old = parsed;
    } catch {
      // unparseable — fall through to seed; nothing recoverable to carry
    }
  }
  const seeded: Store = {
    version: STORE_VERSION,
    // Gate 10 §3 - empty by design. No demo fixture carries SSN or licence
    // data, and none should: the seed is fictional and stays that way.
    partyPii: [],
    runs: [], resultLines: [], reviewLog: [], documents: [], facilityProfiles: [],
    // R17, the chronology and the paragraph record all come from seedData()
    // below — D-35's walk fixtures live there, so initialising them here would
    // only shadow the seed for the length of one object literal.
    // contactEdges and rosterFlags come from seedData() — the seed runs the
    // real backfill so demo mode shows what a migrated database shows.
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

  async createParty(data: PartyCreate): Promise<PartyRecord> {
    const store = load();
    const base = withDirectoryDefaults(data);
    const rec: PartyRecord = {
      ...base,
      // Gate 10 §2, THE WRITE-GUARD AT THE SEAM - the same guard the Supabase
      // adapter applies, so the two modes cannot diverge on the one behaviour
      // the slice exists to deliver. Belt and braces: the UI routes by
      // destination and this strips the keys again regardless.
      fields: stripDestinationKeys(base.fields),
      dateOfBirth: base.dateOfBirth ?? null,
      id: uid(), createdAt: now(), updatedAt: now(),
    };
    store.parties.push(rec);
    save(store);
    return rec;
  }

  async updateParty(id: string, patch: PartyPatch): Promise<PartyRecord> {
    assertPartyPatchKeys(patch);
    const store = load();
    const idx = store.parties.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Party not found');
    // Gate 10 §2 - guard the blob on update as well as create.
    const guarded: PartyPatch = patch.fields !== undefined
      ? { ...patch, fields: stripDestinationKeys(patch.fields) }
      : patch;
    store.parties[idx] = { ...store.parties[idx], ...guarded, id, updatedAt: now() };
    save(store);
    return store.parties[idx];
  }

  // ---- Gate 10 §3: the excluded PII record, on demand and never in a list read ----

  async getPartyPii(partyId: string): Promise<PartyPii | null> {
    return load().partyPii.find((r) => r.partyId === partyId) ?? null;
  }

  async savePartyPii(partyId: string, patch: Omit<PartyPii, 'partyId'>): Promise<PartyPii | null> {
    const store = load();
    const idx = store.partyPii.findIndex((r) => r.partyId === partyId);
    if (isEmptyPii(patch)) {
      // Delete rather than store a row of nulls - the Supabase adapter does the
      // same, so "does this contact have PII" answers identically in both modes.
      if (idx >= 0) store.partyPii.splice(idx, 1);
      save(store);
      return null;
    }
    const rec: PartyPii = {
      partyId,
      ssn: patch.ssn ?? null,
      driversLicense: patch.driversLicense ?? null,
      driversLicenseState: patch.driversLicenseState ?? null,
    };
    if (idx >= 0) store.partyPii[idx] = rec; else store.partyPii.push(rec);
    save(store);
    return rec;
  }

  // ---- CD-1 contact directory ----

  async listContactEdges(): Promise<ContactEdge[]> {
    return load().contactEdges;
  }

  async listContactEdgesForContact(contactId: string): Promise<ContactEdge[]> {
    return load().contactEdges.filter(
      (e) => e.fromContactId === contactId || e.toContactId === contactId,
    );
  }

  async createContactEdge(data: Omit<ContactEdge, 'id' | 'createdAt'>): Promise<ContactEdge> {
    const problem = validateEdge(data);
    if (problem) throw new Error(problem);
    const store = load();
    const rec: ContactEdge = { ...data, id: uid(), createdAt: now() };
    store.contactEdges.push(rec);
    save(store);
    return rec;
  }

  async deleteContactEdge(id: string): Promise<void> {
    const store = load();
    store.contactEdges = store.contactEdges.filter((e) => e.id !== id);
    save(store);
  }

  // ---- R17: the case-scoped provider record ----------------------------

  async listCaseProviders(caseId: string): Promise<CaseProvider[]> {
    return load().caseProviders.filter((p) => p.caseId === caseId);
  }

  async listAllCaseProviders(): Promise<CaseProvider[]> {
    return load().caseProviders;
  }

  async createCaseProvider(
    data: Omit<CaseProvider, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CaseProvider> {
    const store = load();
    // D-53, through the SAME function the Supabase adapter calls, so the two
    // cannot drift on what a facility is allowed to be.
    const facility = store.parties.find((p) => p.id === data.facilityPartyId);
    validateCaseProvider(data, facility?.kind);
    const stamp = now();
    const rec: CaseProvider = { ...data, id: uid(), createdAt: stamp, updatedAt: stamp };
    store.caseProviders.push(rec);
    save(store);
    return rec;
  }

  async updateCaseProvider(id: string, patch: Partial<CaseProvider>): Promise<CaseProvider> {
    const store = load();
    const idx = store.caseProviders.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Provider record not found');
    const next = { ...store.caseProviders[idx], ...patch, updatedAt: now() };
    const facility = store.parties.find((p) => p.id === next.facilityPartyId);
    validateCaseProvider(next, facility?.kind);
    store.caseProviders[idx] = next;
    save(store);
    return next;
  }

  async deleteCaseProvider(id: string): Promise<void> {
    const store = load();
    // The cascade Postgres does for us. A served paragraph record keeps its
    // rendered facility name and simply loses the pointer (D-53).
    const individualIds = store.caseProviderIndividuals
      .filter((i) => i.caseProviderId === id).map((i) => i.id);
    store.caseProviderVisits = store.caseProviderVisits
      .filter((v) => !individualIds.includes(v.individualId));
    store.caseProviderIndividuals = store.caseProviderIndividuals
      .filter((i) => i.caseProviderId !== id);
    store.caseProviders = store.caseProviders.filter((p) => p.id !== id);
    save(store);
  }

  async listProviderIndividuals(caseId: string): Promise<CaseProviderIndividual[]> {
    const store = load();
    const ids = new Set(store.caseProviders.filter((p) => p.caseId === caseId).map((p) => p.id));
    return store.caseProviderIndividuals.filter((i) => ids.has(i.caseProviderId));
  }

  async createProviderIndividual(
    data: Omit<CaseProviderIndividual, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CaseProviderIndividual> {
    const store = load();
    const stamp = now();
    const rec: CaseProviderIndividual = {
      ...data, id: uid(), createdAt: stamp, updatedAt: stamp,
    };
    store.caseProviderIndividuals.push(rec);
    save(store);
    return rec;
  }

  async updateProviderIndividual(
    id: string,
    patch: Partial<CaseProviderIndividual>,
  ): Promise<CaseProviderIndividual> {
    const store = load();
    const idx = store.caseProviderIndividuals.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Individual not found');
    const next = { ...store.caseProviderIndividuals[idx], ...patch, updatedAt: now() };
    store.caseProviderIndividuals[idx] = next;
    save(store);
    return next;
  }

  async softDeleteProviderIndividual(id: string): Promise<CaseProviderIndividual> {
    // D-55. NOT a hard delete: his ruled act — "I can go through and delete
    // anyone that I wanna delete" — has to survive the next chronology drop,
    // and a hard delete would be undone by the very next extraction.
    return this.updateProviderIndividual(id, { removedByHandAt: now() });
  }

  async restoreProviderIndividual(id: string): Promise<CaseProviderIndividual> {
    return this.updateProviderIndividual(id, { removedByHandAt: undefined });
  }

  async listProviderVisits(caseId: string): Promise<CaseProviderVisit[]> {
    const store = load();
    const providerIds = new Set(
      store.caseProviders.filter((p) => p.caseId === caseId).map((p) => p.id),
    );
    const individualIds = new Set(
      store.caseProviderIndividuals
        .filter((i) => providerIds.has(i.caseProviderId)).map((i) => i.id),
    );
    return store.caseProviderVisits.filter((v) => individualIds.has(v.individualId));
  }

  async listChronologyVersions(caseId: string): Promise<CaseChronologyVersion[]> {
    return load().caseChronologyVersions.filter((v) => v.caseId === caseId);
  }

  async createChronologyVersion(
    data: Omit<CaseChronologyVersion, 'id' | 'createdAt' | 'versionNo'>,
  ): Promise<CaseChronologyVersion> {
    const store = load();
    // version_no is per (case, client) and counts REMOVED versions too, so a
    // removal never makes a later drop reuse a number that already appeared in
    // the record.
    const siblings = store.caseChronologyVersions.filter(
      (v) => v.caseId === data.caseId && (v.clientId ?? null) === (data.clientId ?? null),
    );
    const rec: CaseChronologyVersion = {
      ...data,
      id: uid(),
      versionNo: siblings.reduce((max, v) => Math.max(max, v.versionNo), 0) + 1,
      createdAt: now(),
    };
    store.caseChronologyVersions.push(rec);
    save(store);
    return rec;
  }

  async removeChronologyVersion(id: string): Promise<CaseChronologyVersion> {
    const store = load();
    const idx = store.caseChronologyVersions.findIndex((v) => v.id === id);
    if (idx === -1) throw new Error('Chronology version not found');
    store.caseChronologyVersions[idx] = {
      ...store.caseChronologyVersions[idx], removedAt: now(),
    };
    // D-60: the individuals it named KEEP their rows and lose only the source
    // pointer. Deleting them would destroy work Michael may have edited by hand.
    store.caseProviderIndividuals = store.caseProviderIndividuals.map(
      (i) => (i.chronologyVersionId === id ? { ...i, chronologyVersionId: undefined } : i),
    );
    save(store);
    return store.caseChronologyVersions[idx];
  }

  async replaceProviderVisits(
    individualId: string,
    visits: Omit<CaseProviderVisit, 'id' | 'createdAt' | 'individualId'>[],
  ): Promise<CaseProviderVisit[]> {
    const store = load();
    store.caseProviderVisits = store.caseProviderVisits.filter(
      (v) => v.individualId !== individualId,
    );
    const stamp = now();
    const rows = visits.map((v) => ({
      ...v, id: uid(), individualId, createdAt: stamp,
    }));
    store.caseProviderVisits.push(...rows);
    save(store);
    return rows;
  }

  async createDocumentParagraph(
    data: Omit<GeneratedDocumentParagraph, 'id' | 'createdAt'>,
  ): Promise<GeneratedDocumentParagraph> {
    const store = load();
    const rec: GeneratedDocumentParagraph = { ...data, id: uid(), createdAt: now() };
    store.generatedDocumentParagraphs.push(rec);
    save(store);
    return rec;
  }

  async listDocumentParagraphs(documentId: string): Promise<GeneratedDocumentParagraph[]> {
    return load().generatedDocumentParagraphs
      .filter((p) => p.documentId === documentId)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  async listParagraphsForCase(caseId: string): Promise<GeneratedDocumentParagraph[]> {
    const store = load();
    const ids = new Set(store.documents.filter((d) => d.caseId === caseId).map((d) => d.id));
    return store.generatedDocumentParagraphs.filter((p) => ids.has(p.documentId));
  }

  async listRosterFlags(): Promise<RosterBackfillFlag[]> {
    return load().rosterFlags.filter((f) => !f.resolvedAt);
  }

  async resolveRosterFlag(id: string): Promise<RosterBackfillFlag> {
    const store = load();
    const idx = store.rosterFlags.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error('Roster flag not found');
    store.rosterFlags[idx] = { ...store.rosterFlags[idx], resolvedAt: now() };
    save(store);
    return store.rosterFlags[idx];
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

  // ---- Client dimension (CL-2) ----

  async listClientsForCase(caseId: string): Promise<CaseClient[]> {
    return sortClients(load().clients.filter((c) => c.caseId === caseId));
  }

  async listClients(): Promise<CaseClient[]> {
    return load().clients;
  }

  async createClient(data: Omit<CaseClient, 'id' | 'createdAt' | 'updatedAt'>): Promise<CaseClient> {
    const store = load();
    if (store.clients.some((c) => c.caseId === data.caseId && c.partyId === data.partyId)) {
      throw new Error('That party is already a client on this case');
    }
    const rec: CaseClient = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.clients.push(rec);
    save(store);
    return rec;
  }

  async updateClient(id: string, patch: Partial<CaseClient>): Promise<CaseClient> {
    const store = load();
    const idx = store.clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Client not found');
    store.clients[idx] = { ...store.clients[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.clients[idx];
  }

  async deleteClient(id: string): Promise<void> {
    const store = load();
    // Mirrors Postgres `on delete restrict`: a client is a damages spine, and
    // silently orphaning their bills is exactly what that constraint prevents.
    const owned = store.bills.filter((b) => b.clientId === id).length;
    if (owned > 0) {
      throw new Error(`Cannot remove this client — ${owned} bill(s) are assigned to them. Reassign the bills first.`);
    }
    store.clients = store.clients.filter((c) => c.id !== id);
    store.runs = store.runs.map((r) => (r.clientId === id ? { ...r, clientId: undefined } : r));
    save(store);
  }

  async listClientFlags(unresolvedOnly = false): Promise<ClientBackfillFlag[]> {
    const flags = load().clientFlags;
    return unresolvedOnly ? flags.filter((f) => !f.resolvedAt) : flags;
  }

  async getClientFlagForCase(caseId: string): Promise<ClientBackfillFlag | null> {
    return load().clientFlags.find((f) => f.caseId === caseId && !f.resolvedAt) ?? null;
  }

  async createClientFlagIfAbsent(
    data: Omit<ClientBackfillFlag, 'id' | 'createdAt' | 'resolvedAt'>,
  ): Promise<ClientBackfillFlag | null> {
    const store = load();
    const idx = store.clientFlags.findIndex((f) => f.caseId === data.caseId);
    if (idx !== -1) {
      // Already flagged and still open — nothing to say twice.
      if (!store.clientFlags[idx].resolvedAt) return null;
      // Previously resolved, and the case has lost its client again. RE-OPEN
      // rather than no-op: the table is unique on case_id, so a plain insert
      // would silently do nothing and leave the case in an unflagged hole.
      store.clientFlags[idx] = {
        ...store.clientFlags[idx], ...data, resolvedAt: undefined, createdAt: now(),
      };
      save(store);
      return store.clientFlags[idx];
    }
    const rec: ClientBackfillFlag = { ...data, id: uid(), createdAt: now() };
    store.clientFlags.push(rec);
    save(store);
    return rec;
  }

  async resolveClientFlag(id: string): Promise<ClientBackfillFlag> {
    const store = load();
    const idx = store.clientFlags.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error('Flag not found');
    store.clientFlags[idx] = { ...store.clientFlags[idx], resolvedAt: now() };
    save(store);
    return store.clientFlags[idx];
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
    // analysis_runs.clientId is DENORMALIZED off the bill (§3.1). Reassigning a
    // bill to another client has to carry its runs, or per-client totals would
    // report against the wrong body — enforced here so no caller can forget.
    if ('clientId' in patch) {
      store.runs = store.runs.map((r) => (r.billId === id ? { ...r, clientId: patch.clientId } : r));
    }
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

  async listBillsForProvider(facilityPartyId: string): Promise<MedicalBill[]> {
    return load().bills.filter((b) => b.facilityPartyId === facilityPartyId);
  }

  async getProviderProfile(facilityPartyId: string): Promise<FacilityBillingProfile | null> {
    return load().facilityProfiles.find((p) => p.facilityPartyId === facilityPartyId) ?? null;
  }

  async upsertProviderProfile(data: Omit<FacilityBillingProfile, 'id' | 'updatedAt'>): Promise<FacilityBillingProfile> {
    const store = load();
    const idx = store.facilityProfiles.findIndex((p) => p.facilityPartyId === data.facilityPartyId);
    const rec: FacilityBillingProfile = {
      ...data,
      id: idx === -1 ? uid() : store.facilityProfiles[idx].id,
      updatedAt: now(),
    };
    if (idx === -1) store.facilityProfiles.push(rec);
    else store.facilityProfiles[idx] = rec;
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

  // ---- Form engine (FE-D1) ----
  // Parity with the Supabase adapter is the point of the seam: the wizard must
  // behave identically in zero-setup demo mode and against the live database.

  async listFormTemplates(): Promise<FormTemplate[]> {
    return load().formTemplates.slice().sort((a, b) =>
      a.family.localeCompare(b.family) || a.key.localeCompare(b.key));
  }

  async getFormTemplateByKey(key: string): Promise<FormTemplate | null> {
    return load().formTemplates.find((t) => t.key === key) ?? null;
  }

  async createFormTemplate(
    data: Omit<FormTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormTemplate> {
    const store = load();
    const rec: FormTemplate = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.formTemplates.push(rec);
    save(store);
    return rec;
  }

  async updateFormTemplate(
    id: string,
    patch: Partial<Pick<FormTemplate, 'name' | 'provenance' | 'notes' | 'formatProfileId' | 'currentVersionId'>>,
  ): Promise<FormTemplate> {
    const store = load();
    const idx = store.formTemplates.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Template not found');
    store.formTemplates[idx] = { ...store.formTemplates[idx], ...patch, id, updatedAt: now() };
    save(store);
    return store.formTemplates[idx];
  }

  async listTemplateVersions(templateId: string): Promise<FormTemplateVersion[]> {
    return load().formTemplateVersions
      .filter((v) => v.templateId === templateId)
      .sort((a, b) => b.versionNo - a.versionNo);
  }

  async getTemplateVersion(id: string): Promise<FormTemplateVersion | null> {
    return load().formTemplateVersions.find((v) => v.id === id) ?? null;
  }

  async publishTemplateVersion(
    templateId: string,
    body: string,
    settings: Record<string, string>,
    changeNote?: string,
  ): Promise<FormTemplateVersion> {
    const store = load();
    const existing = store.formTemplateVersions.filter((v) => v.templateId === templateId);
    const versionNo = existing.reduce((n, v) => Math.max(n, v.versionNo), 0) + 1;
    const rec: FormTemplateVersion = {
      id: uid(), templateId, versionNo, body, settings, changeNote, createdAt: now(),
    };
    store.formTemplateVersions.push(rec);
    const idx = store.formTemplates.findIndex((t) => t.id === templateId);
    if (idx === -1) throw new Error('Template not found');
    store.formTemplates[idx] = {
      ...store.formTemplates[idx], currentVersionId: rec.id, updatedAt: now(),
    };
    save(store);
    return rec;
  }

  async listTokenDefinitions(templateId?: string): Promise<FormTokenDefinition[]> {
    const all = load().formTokenDefinitions;
    // A global token (no templateId) belongs to every instrument — matching the
    // Supabase adapter's `or(template_id.eq…,template_id.is.null)`.
    const rows = templateId
      ? all.filter((d) => d.templateId === templateId || d.templateId === undefined)
      : all;
    return rows.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  async upsertTokenDefinition(
    data: Omit<FormTokenDefinition, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormTokenDefinition> {
    const store = load();
    const idx = store.formTokenDefinitions.findIndex(
      (d) => d.name === data.name && d.templateId === data.templateId,
    );
    if (idx >= 0) {
      store.formTokenDefinitions[idx] = {
        ...store.formTokenDefinitions[idx], ...data, updatedAt: now(),
      };
      save(store);
      return store.formTokenDefinitions[idx];
    }
    const rec: FormTokenDefinition = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.formTokenDefinitions.push(rec);
    save(store);
    return rec;
  }

  async listFormatProfiles(): Promise<FormFormatProfile[]> {
    return load().formFormatProfiles.slice().sort((a, b) => a.key.localeCompare(b.key));
  }

  async upsertFormatProfile(
    data: Omit<FormFormatProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FormFormatProfile> {
    const store = load();
    const idx = store.formFormatProfiles.findIndex((p) => p.key === data.key);
    if (idx >= 0) {
      store.formFormatProfiles[idx] = {
        ...store.formFormatProfiles[idx], ...data, updatedAt: now(),
      };
      save(store);
      return store.formFormatProfiles[idx];
    }
    const rec: FormFormatProfile = { ...data, id: uid(), createdAt: now(), updatedAt: now() };
    store.formFormatProfiles.push(rec);
    save(store);
    return rec;
  }
}
