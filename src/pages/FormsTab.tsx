/**
 * The disclosures wizard, as ruled by the FE-D1 AMENDMENT SLICE.
 *
 * WHAT CHANGED, and why each is structural rather than cosmetic:
 *
 *  - **THE WIZARD NO LONGER SELECTS VARIANTS.** `RC-1`: *"The app puts the
 *    sentences in there with the model writing the rest around them."* The
 *    selection unit is the FACILITY, its TYPE chooses the two fixed sentences,
 *    and the writer composes around them. The variant dropdown is gone.
 *  - **THE SELECTION IS OVER `R17`, NOT OVER PARTIES.** Facilities come from
 *    the Medical tab's case-scoped provider record, in the same oldest-first
 *    order, so the two screens cannot disagree about the set (`HD-21(b)`).
 *  - **THE FOUR §4 INTERVIEW CARDS DO NOT RENDER FOR TREATING FACILITIES**
 *    (`AS-Q9`). Their clauses no longer exist; the writer draws from the
 *    chronology. The card COMPONENT is deliberately not deleted — the option
 *    Michael selected said the machinery stays for the retained track if that
 *    track is ever built that way.
 *  - **THE PANEL REPLACES THE ASK.** The wizard never asks for a facility's
 *    address, phone, name, type or individuals: those are records, and §17.8
 *    is explicit that an address is never edited inside the form. The panel
 *    flags them and points at the Medical tab.
 *
 * WARNING GATES AND THE PANEL ARE STILL WIZARD-SCREEN ONLY. The generated
 * document is byte-identical whatever they say, and the writer payload has no
 * gate field to carry one — which is what makes that structural.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { db, usingSupabase } from '../data';
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type { CaseClient } from '../domain/client';
import { showsClientLayer, sortClients } from '../domain/client';
import type { MedicalBill, GeneratedDocument } from '../domain/billing';
import {
  providerSortKey, sortProvidersOldestFirst, activeIndividuals,
  newestReadableVersion,
  type CaseChronologyVersion, type CaseProvider, type CaseProviderIndividual,
  type CaseProviderVisit, type GeneratedDocumentParagraph,
} from '../domain/caseProviders';
import { buildRenderContext, type CaseBundle } from '../forms/context';
import { renderInstrument, type RegionItem, type NarrativeParagraph } from '../forms/renderer';
import { disclosuresSkeletonBytes, DISCLOSURES_SKELETON_KEY } from '../forms/skeletons/disclosuresSkeleton';
import { evaluateTypedGates, blockingGates, type GateWarning } from '../forms/gates';
import { evaluateTiers, type Finding } from '../forms/tiers';
import { buildDesignations, persistParagraphs, type DesignationBlock } from '../forms/generate';
import { resolveParagraphWriter } from '../forms/writer';
import { providerTypeLabel } from '../forms/providerTypes';
import { planFacility } from '../forms/assembly';
import { planWriteBacks, applyWriteBacks } from '../forms/writeback';
import { todayCentral, currency } from '../forms/grammar';
import { WRITER_INSTRUCTIONS_KEY } from '../forms/writerInstructions';
import type {
  WizardAnswers, ProviderCardAnswer, InstrumentPosture, WriteBackResult,
  FormTemplate, FormTemplateVersion,
} from '../forms/types';
import type { LintReport } from '../forms/lint';
import { DISCLOSURES_TEMPLATE_KEY } from '../forms/seed';

/** D-19 — the paragraph shell map. The master's four archetypes, and which
 *  shape takes which. `RF-2` is where this is finally ruled. */
const ARCHETYPE: Record<string, string> = {
  'treating-single': 'treating_provider',
  'treating-group': 'provider_group',
  'treating-mixed': 'provider_group',
  'radiology-split': 'imaging_interpreter',
  'imaging-facility': 'imaging_interpreter',
  'custodian-only': 'custodian_of_records',
  pharmacy: 'custodian_of_records',
  'midlevel-rider': 'treating_provider',
  'other-non-physician': 'treating_provider',
  retained: 'treating_provider',
};

/** D-52 — the five labels `form-engine.md` §5.3 already specifies. NO NEW RULE
 *  TEXT is typed anywhere: these are the spec's own words, headed UNVERIFIED
 *  with the playbook row named as their source. */
const RETAINED_CHECKLIST = [
  'documents provided, reviewed or prepared',
  'resume / bibliography',
  '10-year publications list',
  '4-year testimony list',
  'compensation statement',
];

export default function FormsTab({ caseRec }: { caseRec: CaseRecord }) {
  const [parties, setParties] = useState<PartyRecord[]>([]);
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [clients, setClients] = useState<CaseClient[]>([]);
  const [bills, setBills] = useState<MedicalBill[]>([]);
  const [providers, setProviders] = useState<CaseProvider[]>([]);
  const [individuals, setIndividuals] = useState<CaseProviderIndividual[]>([]);
  const [visits, setVisits] = useState<CaseProviderVisit[]>([]);
  const [versions, setVersions] = useState<CaseChronologyVersion[]>([]);
  const [priorParagraphs, setPriorParagraphs] = useState<GeneratedDocumentParagraph[]>([]);
  const [priorDocs, setPriorDocs] = useState<GeneratedDocument[]>([]);
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [templateVersions, setTemplateVersions] = useState<FormTemplateVersion[]>([]);
  const [loading, setLoading] = useState(true);

  const [posture, setPosture] = useState<InstrumentPosture>('original');
  const [serviceDate, setServiceDate] = useState(todayCentral());
  const [clientId, setClientId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [witnesses, setWitnesses] = useState<Record<string, string>>({});
  const [settlementAgreements, setSettlementAgreements] = useState(false);
  const [witnessStatements, setWitnessStatements] = useState(false);
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const [retainedPartyId, setRetainedPartyId] = useState('');
  const [retainedText, setRetainedText] = useState('');

  const [result, setResult] = useState<{
    lint: LintReport; text: string; writeBacks: WriteBackResult[]; paragraphs: number;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const [ls, cs, bs, ps, inds, vs, chron, paras, docs, tpls, tvs] = await Promise.all([
      db.listLinksForCase(caseRec.id),
      db.listClientsForCase(caseRec.id),
      db.listBillsForCase(caseRec.id),
      db.listCaseProviders(caseRec.id),
      db.listProviderIndividuals(caseRec.id),
      db.listProviderVisits(caseRec.id),
      db.listChronologyVersions(caseRec.id),
      db.listParagraphsForCase(caseRec.id),
      db.listDocumentsForCase(caseRec.id),
      db.listFormTemplates(),
      // Only the writer-instructions BODY needs fetching: every fixed sentence
      // stamps its version from `currentVersionId`, which is on the template
      // row itself, so there is no reason to pull 22 more version rows.
      Promise.resolve([] as FormTemplateVersion[]),
    ]);
    const writerTpl = tpls.find((t) => t.key === WRITER_INSTRUCTIONS_KEY);
    const writerVersions = writerTpl ? await db.listTemplateVersions(writerTpl.id) : [];
    const all = await db.listParties();
    setLinks(ls); setClients(sortClients(cs)); setBills(bs);
    setProviders(ps); setIndividuals(inds); setVisits(vs); setVersions(chron);
    setPriorParagraphs(paras); setPriorDocs(docs);
    setTemplates(tpls); setTemplateVersions([...tvs, ...writerVersions]);
    setParties(all);
    setLoading(false);
  }, [caseRec.id]);

  useEffect(() => {
    load().catch(() => { setError('Could not load this case.'); setLoading(false); });
  }, [load]);

  const multiClient = showsClientLayer(clients);
  // D-61: one Generate = one instrument for the SELECTED client. Hidden on a
  // one-client case, where a NULL client_id means that client anyway (D-54).
  const activeClientId = multiClient ? clientId : (clients[0]?.id ?? null);

  const partyById = useCallback(
    (id: string) => parties.find((p) => p.id === id),
    [parties],
  );
  const facilityParties = useMemo(
    () => Object.fromEntries(parties.map((p) => [p.id, p])),
    [parties],
  );
  // EVERY party, not just the ones with a provider row: ND-7(a)'s line names a
  // facility that has BILLS AND NO DESIGNATION, so by definition it has no
  // provider row to take a name from. Keyed on providers only, that line read
  // "A facility has bills on this matter" — true, unhelpful, and exactly the
  // kind of thing that survives because it is not wrong.
  const facilityNames = useMemo(
    () => Object.fromEntries(parties.map((p) => [p.id, p.displayName])),
    [parties],
  );

  /** The Medical tab's list for this client — SAME SET, SAME ORDER (§9.2). */
  const forClient = useMemo(() => {
    const scoped = activeClientId
      ? providers.filter((p) => p.clientId === activeClientId || p.clientId == null)
      : providers;
    return sortProvidersOldestFirst(
      scoped,
      (p) => {
        const mine = individuals.filter((i) => i.caseProviderId === p.id);
        const ids = new Set(mine.map((i) => i.id));
        return providerSortKey(p, {
          individuals: mine,
          visitDates: visits.filter((v) => ids.has(v.individualId)).map((v) => v.visitDate),
          billServiceStarts: bills.filter((b) => b.facilityPartyId === p.facilityPartyId)
            .map((b) => b.serviceStart),
        });
      },
      (p) => facilityNames[p.facilityPartyId] ?? '',
    );
  }, [providers, individuals, visits, bills, activeClientId, facilityNames]);

  const clientVersions = useMemo(
    () => versions.filter((v) => (v.clientId ?? null) === (activeClientId ?? null)),
    [versions, activeClientId],
  );
  const currentVersion = newestReadableVersion(clientVersions);

  /**
   * D-47 — supplemental posture. Every facility present in ANY generation
   * record of this client's chain, PRE-DESELECTED and labelled from the record
   * that carried it. Re-selecting one is permitted, against a visible line.
   */
  const alreadyDesignated = useMemo(() => {
    const byDoc = new Map(priorDocs.map((d) => [d.id, d]));
    const out: { facilityPartyId: string; date: string; posture: string }[] = [];
    for (const p of priorParagraphs) {
      const provider = providers.find((r) => r.id === p.caseProviderId);
      if (!provider) continue;
      const doc = byDoc.get(p.documentId);
      out.push({
        facilityPartyId: provider.facilityPartyId,
        date: (doc?.generatedAt ?? '').slice(0, 10),
        posture: doc?.instrumentPosture ?? 'original',
      });
    }
    return out;
  }, [priorParagraphs, priorDocs, providers]);

  useEffect(() => {
    // Pre-deselect the already-designated in supplemental posture (D-47). His
    // click can put one back, and line 16 says what that means.
    if (posture !== 'supplemental') return;
    const designated = new Set(alreadyDesignated.map((d) => d.facilityPartyId));
    setSelected((prev) => {
      const next = { ...prev };
      for (const p of providers) if (designated.has(p.facilityPartyId)) next[p.id] = false;
      return next;
    });
  }, [posture, alreadyDesignated, providers]);

  const chosen = forClient.filter((p) => selected[p.id]);

  const tiers = useMemo(() => evaluateTiers({
    incidentDateIso: caseRec.dateOfIncident,
    selected: chosen,
    individuals,
    facilityNames,
    facilityAddresses: Object.fromEntries(providers.map((p) => {
      const party = partyById(p.facilityPartyId);
      const f = (party?.fields ?? {}) as Record<string, unknown>;
      return [p.facilityPartyId, {
        hasAddress: Boolean(f.addressLine1 || f.cityStateZip),
        hasPhone: Boolean(f.phone),
      }];
    })),
    chronologyVersions: clientVersions,
    billedFacilityPartyIds: [...new Set(
      bills.filter((b) => !activeClientId || b.clientId === activeClientId || b.clientId == null)
        .map((b) => b.facilityPartyId).filter((id): id is string => Boolean(id)),
    )],
    billedIndividualPartyNames: bills
      .map((b) => (b.facilityPartyId ? partyById(b.facilityPartyId) : undefined))
      .filter((p): p is PartyRecord => p?.kind === 'individual')
      .map((p) => p.displayName),
    alreadyDesignated: posture === 'supplemental' ? alreadyDesignated : undefined,
  }), [caseRec.dateOfIncident, chosen, individuals, facilityNames, providers, partyById,
    clientVersions, bills, activeClientId, posture, alreadyDesignated]);

  const gates: GateWarning[] = useMemo(() => evaluateTypedGates({
    selected: chosen, individuals, facilityNames,
  }), [chosen, individuals, facilityNames]);
  const unmetBlocking = blockingGates(gates).filter((g) => !acknowledged[g.id]);

  const answers: WizardAnswers = useMemo(() => ({
    templateKey: DISCLOSURES_TEMPLATE_KEY,
    posture,
    caseId: caseRec.id,
    clientId: activeClientId ?? undefined,
    serviceDateLong: serviceDate,
    // EMPTY by design: the wizard no longer carries per-provider interview
    // answers, so the "still needed" list naturally drops every provider item
    // and keeps the non-provider ones (§8.2's last paragraph).
    providerCards: [] as ProviderCardAnswer[],
    factWitnesses: Object.entries(witnesses)
      .filter(([, v]) => v.trim() !== '')
      .map(([partyPartyId, testimonyDescription]) => ({ partyPartyId, testimonyDescription })),
    settlementAgreements,
    witnessStatements,
    answerOverrides: {},
    scalars: {},
  }), [posture, caseRec.id, activeClientId, serviceDate, witnesses,
    settlementAgreements, witnessStatements]);

  const bundle: CaseBundle = useMemo(() => ({
    caseRecord: caseRec,
    links,
    parties,
    clients,
    providerCharges: Object.fromEntries(
      chosen.map((p) => [
        p.facilityPartyId,
        bills.filter((b) => b.facilityPartyId === p.facilityPartyId)
          .reduce((sum, b) => sum + (b.billedAmount ?? 0), 0),
      ]).filter(([, amount]) => (amount as number) > 0),
    ),
  }), [caseRec, links, parties, clients, bills, chosen]);

  const { missing } = useMemo(() => buildRenderContext(bundle, answers), [bundle, answers]);

  const writerInstructions = useMemo(() => {
    const tpl = templates.find((t) => t.key === WRITER_INSTRUCTIONS_KEY);
    const version = templateVersions.find((v) => v.id === tpl?.currentVersionId);
    return { versionId: version?.id, body: version?.body ?? '' };
  }, [templates, templateVersions]);

  /** Key → current version id, so each placed sentence stamps its version. */
  const fixedVersionIds = useMemo(() => Object.fromEntries(
    templates.filter((t) => t.family === 'fixed-sentence' && t.currentVersionId)
      .map((t) => [t.key, t.currentVersionId as string]),
  ), [templates]);

  async function generate() {
    setBusy(true); setError(''); setResult(null);
    try {
      // D-31: evaluated again HERE, from the same live read, never from a
      // click-time cache — and BEFORE any writer call, so a refused generate
      // transmits nothing.
      if (!tiers.canGenerate) throw new Error('Fix the must-fix items first.');

      const clientParty = partyById(
        clients.find((c) => c.id === activeClientId)?.partyId ?? '',
      );

      const designations = await buildDesignations({
        writer: resolveParagraphWriter(usingSupabase),
        selected: chosen,
        individuals,
        visits,
        chronologyVersions: clientVersions,
        facilityParties,
        clientName: clientParty?.displayName
          ?? bundle.parties.find((p) => links.some(
            (l) => l.partyId === p.id && /plaintiff/i.test(l.role),
          ))?.displayName ?? '',
        // From the RECORD, never guessed. A client with nothing on file reads
        // "they", which is the only choice that is never wrong about a person.
        clientPronoun: field(clientParty, 'pronouns') || field(clientParty, 'gender') || undefined,
        incidentDateIso: caseRec.dateOfIncident,
        caseType: caseRec.caseType,
        writerInstructions: writerInstructions.body,
      });

      const { context } = buildRenderContext(bundle, answers);

      // The provider block and the narrative both come from R17 now, so the
      // two expert regions are replaced wholesale rather than derived from
      // wizard answers that no longer exist.
      const expertItems: RegionItem[] = designations.blocks.map((b) => blockItem(b));
      context.regions.testifying_expert = expertItems;
      context.regions.treating_provider = designations.blocks.map((b) => ({
        provider_individual_names_block: b.topLine,
        facility_name_caps: b.facilityName.toUpperCase(),
        facility_address_line_1: field(facilityParties[b.facilityPartyId], 'addressLine1'),
        facility_city_state_zip: field(facilityParties[b.facilityPartyId], 'cityStateZip'),
        facility_phone: field(facilityParties[b.facilityPartyId], 'phone'),
      }));
      // D-28: the persons-with-knowledge provider entries are DERIVED from the
      // selection, in the same order, and are not hand-edited in the fact
      // witness step — which keeps its own hand-added witnesses as built.
      context.regions.person_with_knowledge = [
        ...(context.regions.person_with_knowledge ?? []),
        ...designations.blocks.map((b) => ({
          person_name: b.topLine,
          person_care_of_line: '',
          person_firm_name_caps: b.facilityName.toUpperCase(),
          person_address_line_1: field(facilityParties[b.facilityPartyId], 'addressLine1'),
          person_address_line_2: field(facilityParties[b.facilityPartyId], 'cityStateZip'),
          person_phone: field(facilityParties[b.facilityPartyId], 'phone'),
          person_connection_statement: 'Health-care provider',
        })),
      ];
      // §8.4: the charges table takes the SAME order as everything else.
      context.regions.provider_charge_row = chosen
        .map((p) => ({
          provider_name: facilityNames[p.facilityPartyId] ?? '',
          provider_total_charges: currency(
            bills.filter((b) => b.facilityPartyId === p.facilityPartyId)
              .reduce((s, b) => s + (b.billedAmount ?? 0), 0),
          ),
        }))
        .filter((r) => r.provider_total_charges !== currency(0));

      context.itemSelects = { ...context.itemSelects };
      designations.blocks.forEach((b, i) => {
        const first = designations.paragraphs.find((p) => p.caseProviderId === b.caseProviderId);
        context.itemSelects![`testifying_expert:${i}`] =
          ARCHETYPE[first?.shape ?? 'treating-single'] ?? 'treating_provider';
      });
      context.itemNarratives = designations.itemNarratives as Record<string, NarrativeParagraph[]>;

      const rendered = await renderInstrument(disclosuresSkeletonBytes(), context);

      // The parts-diff ship gate (§12.5), enforced rather than described.
      if (rendered.changedParts.join() !== 'word/document.xml') {
        throw new Error(
          `Ship gate failed: the render changed ${rendered.changedParts.join(', ')}. `
          + 'Only word/document.xml may differ from the shell.',
        );
      }

      const writeBacks = await applyWriteBacks(db, []);
      const filename =
        `${caseRec.fileNumber} disclosures${posture === 'original' ? '' : ` (${posture})`}.docx`;
      downloadDocx(rendered.docx, filename);

      const doc = await db.createDocument({
        caseId: caseRec.id,
        docType: 'trcp-194-2b-195-5-disclosures',
        audience: 'opposing',
        // NULL — Q-COM-11 ruled (A): unclassified-must-classify.
        privilegeTier: undefined as unknown as never,
        title: instrumentTitle(posture),
        content: rendered.plainText,
        disclaimerVersion: 'fe-d1a-v1',
        generatedBy: 'FE-D1 disclosures engine (amendment slice)',
        skeletonKey: DISCLOSURES_SKELETON_KEY,
        docxPath: filename,
        answers,
        instrumentPosture: posture,
      });

      await persistParagraphs(db, doc.id, activeClientId ?? undefined, designations, {
        writerInstructionsVersionId: writerInstructions.versionId,
        fixedSentenceVersionIds: fixedVersionIds,
      });

      await load();
      setResult({
        lint: rendered.lint,
        text: rendered.plainText,
        writeBacks,
        paragraphs: designations.paragraphs.length,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed.');
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="muted">Loading…</div>;

  const factWitnessCandidates = parties.filter(
    (p) => links.some((l) => l.partyId === p.id && l.role === 'Witness'),
  );
  const retainedCandidates = parties.filter((p) => p.kind === 'individual');

  return (
    <div>
      <div className="notice">
        <strong>Fixture exercise only.</strong> The disclosures engine is not on the go-live floor
        and the drafting skill remains the live path. Nothing generated here should be served until
        this slice has been walked and you say otherwise. Every rule citation in the skeleton is
        reproduced as the firm’s forms quote it and is <strong>UNVERIFIED</strong>.
      </div>

      {/* ---------- must-fix tier (D-1, PROVISIONAL) ---------- */}
      {tiers.stops.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid #b23' }}>
          <h3>Fix these first — {tiers.stops.length}</h3>
          <p className="small muted">
            The document is not generated and <strong>nothing is sent anywhere</strong> while one of
            these stands. There are exactly three conditions that do this.
          </p>
          {tiers.stops.map((s, i) => (
            <p key={i} className="notice" style={{ marginTop: 8 }}>
              <strong>{s.text}</strong>
              {s.route && <><br /><span className="small">{s.route}</span></>}
            </p>
          ))}
          <p className="small muted">
            Where this list appears is still an open question for you — it sits here provisionally.
          </p>
        </div>
      )}

      {/* ---------- 1. the instrument ---------- */}
      <div className="card">
        <h3>1 · Instrument</h3>
        <div className="form-grid">
          <label className="fld">
            <span className="lab">Posture</span>
            <select value={posture} onChange={(e) => setPosture(e.target.value as InstrumentPosture)}>
              <option value="original">Original</option>
              <option value="amended">Amended</option>
              <option value="supplemental">Supplemental</option>
            </select>
            <span className="hint">
              Drives the title, the certificate of service, and the footer name together (FE-15).
            </span>
          </label>
          {multiClient && (
            <label className="fld">
              <span className="lab">Client</span>
              <select value={clientId ?? ''} onChange={(e) => setClientId(e.target.value || null)}>
                <option value="">— choose a plaintiff —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {partyById(c.partyId)?.displayName ?? c.id}
                  </option>
                ))}
              </select>
              <span className="hint">
                One instrument per plaintiff. Generate once for each.
              </span>
            </label>
          )}
          <label className="fld">
            <span className="lab">Date of service</span>
            <input type="text" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} />
            <span className="hint">
              Your local (Central) date, not the server’s — §12.8. Defaulted to today, Central.
            </span>
          </label>
        </div>
        <p className="small muted">
          The event noun in the fixed sentences comes from the case type
          (<strong>{caseRec.caseType}</strong>), not from anything typed here.
        </p>
      </div>

      {/* ---------- 2. facilities to designate ---------- */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3>2 · Facilities to designate</h3>
          <span className="small muted">
            {currentVersion
              ? `chronology v${currentVersion.versionNo}, dropped ${currentVersion.droppedAt.slice(0, 10)}`
              : 'no readable chronology — see the Medical tab'}
          </span>
        </div>
        <p className="small muted">
          The same list as the Medical tab, oldest treatment first. Type, people, dates and
          addresses are records — edit them there, not here.
        </p>

        {multiClient && !clientId && (
          <p className="notice">Choose a plaintiff above to see their facilities.</p>
        )}

        {forClient.length === 0 && (!multiClient || clientId) && (
          <p className="muted">
            No facilities on this matter yet. Add them in the Providers section of the Medical tab.
          </p>
        )}

        {forClient.map((p) => {
          const plan = planFacility(p, individuals);
          const people = activeIndividuals(
            individuals.filter((i) => i.caseProviderId === p.id),
          );
          const pGates = gates.filter((g) => g.partyId === p.facilityPartyId);
          const prior = alreadyDesignated.find((d) => d.facilityPartyId === p.facilityPartyId);
          return (
            <div key={p.id} className="rep" style={{ marginBottom: 8 }}>
              <label className="check">
                <input
                  type="checkbox" checked={!!selected[p.id]}
                  onChange={(e) => setSelected((s) => ({ ...s, [p.id]: e.target.checked }))}
                />
                <strong>{facilityNames[p.facilityPartyId] || '(unnamed facility)'}</strong>{' '}
                <span className="muted small">
                  {p.providerType ? providerTypeLabel(p.providerType) : 'no type set'}
                </span>
                {pGates.map((g) => (
                  <span
                    key={g.id}
                    className={`badge ${g.severity === 'hard-pause' ? 'criminal' : 'flag'}`}
                    title={g.body}
                  >
                    {g.severity === 'hard-pause' ? 'HARD PAUSE' : 'LOP'}
                  </span>
                ))}
                {p.lop && !pGates.some((g) => g.id.startsWith('lop:')) && (
                  <span className="badge flag">LOP</span>
                )}
              </label>
              {people.length > 0 && (
                <div className="small muted" style={{ paddingLeft: 24 }}>
                  {plan.blockIndividuals.map((i) => i.displayName).join(' · ') || 'custodian only'}
                </div>
              )}
              {prior && posture === 'supplemental' && (
                <div className="small" style={{ paddingLeft: 24 }}>
                  Designated {prior.date} ({prior.posture})
                  {selected[p.id] && ' — re-selecting generates a NEW paragraph for this facility.'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------- 3. fact witnesses ---------- */}
      <div className="card">
        <h3>3 · Fact witnesses</h3>
        {factWitnessCandidates.length === 0 && (
          <p className="muted">No witness contacts are linked to this matter.</p>
        )}
        {factWitnessCandidates.map((w) => (
          <label className="fld" key={w.id} style={{ marginBottom: 8 }}>
            <span className="lab">{w.displayName}</span>
            <input
              type="text" value={witnesses[w.id] ?? ''}
              placeholder="What they know — one short sentence"
              onChange={(e) => setWitnesses((s) => ({ ...s, [w.id]: e.target.value }))}
            />
          </label>
        ))}
        <p className="small muted">
          The designated facilities are added to the persons-with-knowledge section automatically,
          in the same order. They are not edited here.
        </p>
      </div>

      {/* ---------- 4. retained experts ---------- */}
      <div className="card">
        <h3>4 · Retained expert (optional)</h3>
        <p className="small muted">
          Treaters go out non-retained. A RETAINED expert is a different package: you pick the
          person and type the paragraph yourself — there is no model call on this step.
        </p>
        <div className="form-grid">
          <label className="fld">
            <span className="lab">Expert</span>
            <select value={retainedPartyId} onChange={(e) => setRetainedPartyId(e.target.value)}>
              <option value="">— none —</option>
              {retainedCandidates.map((p) => (
                <option key={p.id} value={p.id}>{p.displayName}</option>
              ))}
            </select>
            <span className="hint">Create the party on the Parties tab first.</span>
          </label>
        </div>
        {retainedPartyId && (
          <>
            <label className="fld">
              <span className="lab">Paragraph</span>
              <textarea
                rows={6}
                value={retainedText}
                onChange={(e) => setRetainedText(e.target.value)}
                placeholder="Type the designation paragraph."
              />
            </label>
            <p className="small">
              <strong>TRCP 195.5(a)(3)–(4) — UNVERIFIED; source: playbook E2 row.</strong>
            </p>
            <ul className="small muted">
              {RETAINED_CHECKLIST.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </>
        )}
      </div>

      {/* ---------- 5. conditional sections ---------- */}
      <div className="card">
        <h3>5 · Conditional sections</h3>
        <label className="check">
          <input
            type="checkbox" checked={settlementAgreements}
            onChange={(e) => setSettlementAgreements(e.target.checked)}
          />
          This file has settlement agreements to disclose
        </label>
        <label className="check" style={{ marginTop: 6 }}>
          <input
            type="checkbox" checked={witnessStatements}
            onChange={(e) => setWitnessStatements(e.target.checked)}
          />
          This file has witness statements to disclose
        </label>
        <p className="small muted" style={{ marginTop: 10 }}>
          <strong>Production chart:</strong> the 194.2(b)(6) chart reads the document-production
          log, which is a separate banked module (§11.1) and is not built. Until it exists the
          firm’s stock answer renders. Nothing here invents a Bates range.
        </p>
      </div>

      {/* ---------- the ambient panel ---------- */}
      <PanelCard panel={tiers.panel} warnings={tiers.warnings} gates={gates}
        acknowledged={acknowledged} setAcknowledged={setAcknowledged} />

      {/* ---------- 195.2 deadline ---------- */}
      <DeadlinePanel />

      {/* ---------- still needed ---------- */}
      {missing.length > 0 && (
        <div className="card">
          <h3>Still needed — {missing.length}</h3>
          <p className="small muted">
            Only what the file does not already hold, and only for things that are not provider
            records — a facility’s address, phone, type and people are flagged in the panel above
            and fixed on the Medical tab, never asked for here.
          </p>
          <table className="list">
            <thead><tr><th>Value</th><th>Would come from</th></tr></thead>
            <tbody>
              {missing.map((m) => (
                <tr key={m.token}><td>{m.label}</td><td className="muted">{m.wouldComeFrom}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ---------- generate ---------- */}
      <div className="card">
        <h3>Generate</h3>
        {unmetBlocking.length > 0 && (
          <p className="notice">
            <strong>{unmetBlocking.length} hard pause</strong> not yet acknowledged. Confirm above
            to continue.
          </p>
        )}
        <button
          className="btn"
          disabled={busy || chosen.length === 0 || unmetBlocking.length > 0 || !tiers.canGenerate}
          onClick={generate}
        >
          {busy ? 'Generating…' : 'Generate Word document'}
        </button>
        <p className="small muted" style={{ marginTop: 8 }}>
          One call per paragraph. Nothing is sent while a must-fix item stands, and if any call
          fails nothing is filed at all — a half-served designation is worse than none.
          <strong> One-click PDF is not built</strong> — converting .docx to PDF needs Word or
          LibreOffice and cannot be done in the browser. Save as PDF from Word.
        </p>
        {error && <p className="notice"><strong>Failed:</strong> {error}</p>}
      </div>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

/* ================= the ambient panel (§8.2) ================= */

function PanelCard({ panel, warnings, gates, acknowledged, setAcknowledged }: {
  panel: Finding[];
  warnings: Finding[];
  gates: GateWarning[];
  acknowledged: Record<string, boolean>;
  setAcknowledged: (fn: (a: Record<string, boolean>) => Record<string, boolean>) => void;
}) {
  if (panel.length === 0 && warnings.length === 0 && gates.length === 0) return null;
  return (
    <div className="card">
      <h3>What to look at — screen only</h3>
      <p className="small muted">
        These inform the drafting decision. <strong>None of them changes a character of the
        generated document</strong> and none of them blocks it — the text is identical whatever
        they say, which is a binding invariant of this engine and is covered by a regression test.
      </p>

      {gates.map((g) => (
        <div key={g.id} className="notice" style={{ marginTop: 10 }}>
          <div>
            <span className={`badge ${g.severity === 'hard-pause' ? 'criminal' : g.severity === 'click-through' ? 'flag' : 'status'}`}>
              {g.severity}
            </span>{' '}
            <strong>{g.title}</strong>
          </div>
          <p style={{ margin: '6px 0' }}>{g.body}</p>
          {g.authority && <p className="small muted">Authority: {g.authority}</p>}
          {g.severity === 'hard-pause' && (
            <label className="check">
              <input
                type="checkbox" checked={!!acknowledged[g.id]}
                onChange={(e) => setAcknowledged((a) => ({ ...a, [g.id]: e.target.checked }))}
              />
              I have considered this and want to proceed
            </label>
          )}
        </div>
      ))}

      {warnings.map((w, i) => (
        <p key={`w${i}`} className="small" style={{ marginTop: 6 }}>
          <span className="badge flag">check</span> {w.text}
        </p>
      ))}
      {panel.map((f, i) => (
        <p key={`p${i}`} className="small muted" style={{ marginTop: 4 }}>• {f.text}</p>
      ))}
    </div>
  );
}

/* ================= the 195.2 deadline panel ================= */

/**
 * §2 item 7 asks for a COMPUTED 195.2 designation deadline in-flow.
 *
 * It is not computed here, and that is deliberate. The Legal Rule Registry
 * discipline is binding and system-wide: an UNVERIFIED rule "may drive warnings
 * and placeholders, NEVER computed legal outcomes". A designation deadline is a
 * computed legal outcome, and the 195.2 propositions are unverified — so the
 * panel states the rule, names its status, and shows the inputs without
 * asserting a date. UNCHANGED by the amendment slice.
 */
function DeadlinePanel() {
  return (
    <div className="card">
      <h3>195.2 designation deadline</h3>
      <p className="notice" style={{ margin: 0 }}>
        <strong>Not computed.</strong> The rule is <strong>UNVERIFIED</strong> in the registry, and
        an unverified rule may raise a warning but must never drive a computed legal outcome. The
        rule as the firm’s forms state it: 90 days before the end of the discovery period for a
        party seeking affirmative relief, 60 for all others, with a docket control order
        overriding when one is entered — and the deadline-engine rows carry a known 90/60-vs-60/90
        course-book conflict flag. Work the date yourself against the DCO.
      </p>
    </div>
  );
}

/* ================= result ================= */

function ResultPanel({ result }: {
  result: { lint: LintReport; text: string; writeBacks: WriteBackResult[]; paragraphs: number };
}) {
  const flagged = result.writeBacks.filter((w) => w.status === 'flagged');

  return (
    <>
      <div className="card">
        <h3>Render lint {result.lint.clean ? '— clean' : `— ${result.lint.findings.length} finding(s)`}</h3>
        <p className="small">
          {result.paragraphs} designation paragraph(s) written, each with its own record of the
          parts, the fixed sentences placed and the chronology version behind it.
        </p>
        {result.lint.findings.map((f, i) => (
          <div key={i} className="notice" style={{ marginTop: 8 }}>
            <span className={`badge ${f.severity === 'error' ? 'criminal' : 'flag'}`}>{f.severity}</span>{' '}
            <strong>{f.message}</strong>
            {f.detail && <div className="small muted" style={{ marginTop: 4 }}>{f.detail}</div>}
          </div>
        ))}
        <p className="small muted" style={{ marginTop: 10 }}>
          Findings are advisory and are format checks over the document, never content checks over
          what the writer produced.
        </p>
      </div>

      {flagged.length > 0 && (
        <div className="card">
          <h3>Write-backs</h3>
          <table className="list">
            <thead><tr><th>Answer</th><th>Value</th><th>Why not stored</th></tr></thead>
            <tbody>
              {flagged.map((w, i) => (
                <tr key={i}>
                  <td>{w.field}</td><td>{w.value}</td><td className="muted">{w.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card">
        <h3>Generated text</h3>
        <pre className="small" style={{ whiteSpace: 'pre-wrap', maxHeight: 400, overflow: 'auto' }}>
          {result.text}
        </pre>
      </div>
    </>
  );
}

/* ================= helpers ================= */

function field(p: PartyRecord | undefined, key: string): string {
  const v = (p?.fields ?? {})[key];
  return typeof v === 'string' ? v : '';
}

/** One `testifying_expert` item: the provider block's lines. Its narrative
 *  comes through `itemNarratives`, not through a token. */
function blockItem(b: DesignationBlock): RegionItem {
  return {
    expert_names_block: b.topLine,
    custodian_line: b.custodianLine,
    facility_name_caps: b.facilityName.toUpperCase(),
    facility_name: b.facilityName,
    facility_address_line_1: '',
    facility_city_state_zip: '',
    facility_phone: '',
  };
}

function instrumentTitle(posture: InstrumentPosture): string {
  if (posture === 'amended') return "Plaintiff's First Amended TRCP 194.2(b) and 195.5 Disclosures";
  if (posture === 'supplemental') return "Plaintiff's Supplemental TRCP 194.2(b) and 195.5 Disclosures";
  return "Plaintiff's TRCP 194.2(b) and 195.5 Disclosures";
}

function downloadDocx(bytes: Uint8Array, filename: string) {
  const buf = new Uint8Array(bytes.length);
  buf.set(bytes);
  const blob = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// `planWriteBacks` is retained for the retained track's future use; the treating
// track has no interview answers to write back now that the cards are retired.
void planWriteBacks;
