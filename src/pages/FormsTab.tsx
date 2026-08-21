/**
 * The disclosures wizard — §2's flow, on a case.
 *
 * Two things on this screen are structural rather than cosmetic:
 *
 *  - WARNING GATES LIVE HERE AND NOWHERE ELSE. Everything in the gates panel is
 *    wizard-screen only; the generated document is byte-identical whatever it
 *    says. The render call below takes a context built from ANSWERS and RECORDS
 *    and never sees a gate, which is what makes that structural.
 *  - THE WIZARD ASKS ONLY WHAT THE FILE DOES NOT HOLD. The "still needed" list
 *    is computed by `buildRenderContext`, so a value that arrives on a record
 *    stops being a question without anyone maintaining a list.
 */

import { useEffect, useMemo, useState } from 'react';
import { db } from '../data';
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type { CaseClient } from '../domain/client';
import type { MedicalBill } from '../domain/billing';
import { buildRenderContext, type CaseBundle } from '../forms/context';
import { renderInstrument } from '../forms/renderer';
import { disclosuresSkeletonBytes, DISCLOSURES_SKELETON_KEY } from '../forms/skeletons/disclosuresSkeleton';
import { DISCLOSURE_VARIANTS } from '../forms/variants';
import { evaluateGates, blockingGates, type GateWarning } from '../forms/gates';
import { planWriteBacks, applyWriteBacks } from '../forms/writeback';
import { todayCentral } from '../forms/grammar';
import type {
  WizardAnswers, ProviderCardAnswer, InstrumentPosture, WriteBackResult,
} from '../forms/types';
import type { LintReport } from '../forms/lint';
import { DISCLOSURES_TEMPLATE_KEY } from '../forms/seed';

const TREATMENT_OPTIONS = [
  'evaluation', 'imaging review', 'conservative care', 'injections',
  'spinal manipulation', 'therapeutic modalities', 'rehabilitative therapy',
  'medication management', 'therapeutic exercise', 'manual therapy',
];

export default function FormsTab({ caseRec }: { caseRec: CaseRecord }) {
  const [parties, setParties] = useState<PartyRecord[]>([]);
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [clients, setClients] = useState<CaseClient[]>([]);
  const [bills, setBills] = useState<MedicalBill[]>([]);
  const [loading, setLoading] = useState(true);

  const [posture, setPosture] = useState<InstrumentPosture>('original');
  const [incidentType, setIncidentType] = useState('');
  const [serviceDate, setServiceDate] = useState(todayCentral());
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [cards, setCards] = useState<Record<string, ProviderCardAnswer>>({});
  const [witnesses, setWitnesses] = useState<Record<string, string>>({});
  const [settlementAgreements, setSettlementAgreements] = useState(false);
  const [witnessStatements, setWitnessStatements] = useState(false);
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  const [result, setResult] = useState<{ lint: LintReport; text: string; writeBacks: WriteBackResult[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    Promise.all([
      db.listLinksForCase(caseRec.id),
      db.listClientsForCase(caseRec.id),
      db.listBillsForCase(caseRec.id),
    ]).then(async ([ls, cs, bs]) => {
      const ps = await db.getParties(ls.map((l) => l.partyId));
      if (!live) return;
      setLinks(ls); setClients(cs); setBills(bs); setParties(ps); setLoading(false);
    }).catch(() => { if (live) { setError('Could not load this case.'); setLoading(false); } });
    return () => { live = false; };
  }, [caseRec.id]);

  const providers = useMemo(
    () => parties.filter((p) => p.roleTags.some((t) => /provider/i.test(t))),
    [parties],
  );
  const factWitnessCandidates = useMemo(
    () => parties.filter((p) => links.some((l) => l.partyId === p.id && l.role === 'Witness')),
    [parties, links],
  );

  const chosenProviders = providers.filter((p) => selected[p.id]);

  const gates: GateWarning[] = useMemo(() => evaluateGates({
    providers: chosenProviders,
    treatedBefore: Object.fromEntries(
      Object.entries(cards).map(([k, v]) => [k, v.treatedBeforeIncident]),
    ),
  }), [chosenProviders, cards]);

  const unmetBlocking = blockingGates(gates).filter((g) => !acknowledged[g.id]);

  const answers: WizardAnswers = useMemo(() => ({
    templateKey: DISCLOSURES_TEMPLATE_KEY,
    posture,
    caseId: caseRec.id,
    incidentType,
    serviceDateLong: serviceDate,
    providerCards: chosenProviders.map((p) => cards[p.id] ?? defaultCard(p.id)),
    factWitnesses: Object.entries(witnesses)
      .filter(([, v]) => v.trim() !== '')
      .map(([partyPartyId, testimonyDescription]) => ({ partyPartyId, testimonyDescription })),
    settlementAgreements,
    witnessStatements,
    answerOverrides: {},
    scalars: {},
  }), [posture, caseRec.id, incidentType, serviceDate, chosenProviders, cards,
    witnesses, settlementAgreements, witnessStatements]);

  const bundle: CaseBundle = useMemo(() => ({
    caseRecord: caseRec,
    links,
    parties,
    clients,
    providerCharges: Object.fromEntries(
      chosenProviders.map((p) => [
        p.id,
        bills.filter((b) => b.providerPartyId === p.id)
          .reduce((sum, b) => sum + (b.billedAmount ?? 0), 0),
      ]).filter(([, amount]) => (amount as number) > 0),
    ),
  }), [caseRec, links, parties, clients, bills, chosenProviders]);

  const { missing } = useMemo(() => buildRenderContext(bundle, answers), [bundle, answers]);

  function setCard(id: string, patch: Partial<ProviderCardAnswer>) {
    setCards((prev) => ({
      ...prev,
      [id]: { ...defaultCard(id), ...prev[id], ...patch },
    }));
  }

  async function generate() {
    setBusy(true); setError(''); setResult(null);
    try {
      const { context } = buildRenderContext(bundle, answers);
      const rendered = await renderInstrument(disclosuresSkeletonBytes(), context);

      // The parts-diff ship gate (§12.5), enforced rather than described.
      if (rendered.changedParts.join() !== 'word/document.xml') {
        throw new Error(
          `Ship gate failed: the render changed ${rendered.changedParts.join(', ')}. `
          + 'Only word/document.xml may differ from the shell.',
        );
      }

      const plans = answers.providerCards.map((card) => {
        const party = parties.find((p) => p.id === card.providerPartyId);
        return { card, party, results: planWriteBacks(card, party) };
      });
      const writeBacks = await applyWriteBacks(db, plans);

      const filename =
        `${caseRec.fileNumber} disclosures${posture === 'original' ? '' : ` (${posture})`}.docx`;
      downloadDocx(rendered.docx, filename);

      await db.createDocument({
        caseId: caseRec.id,
        docType: 'trcp-194-2b-195-5-disclosures',
        audience: 'opposing',
        // NULL — Q-COM-11 ruled (A): unclassified-must-classify. Writing
        // 'work-product' here would assert a privilege nobody chose.
        privilegeTier: undefined as unknown as never,
        title: instrumentTitle(posture),
        content: rendered.plainText,
        disclaimerVersion: 'fe-d1-v1',
        generatedBy: 'FE-D1 disclosures engine',
        skeletonKey: DISCLOSURES_SKELETON_KEY,
        docxPath: filename,
        answers,
        instrumentPosture: posture,
      });

      setResult({ lint: rendered.lint, text: rendered.plainText, writeBacks });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed.');
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="muted">Loading…</div>;

  return (
    <div>
      <div className="notice">
        <strong>Fixture exercise only.</strong> The disclosures engine is not on the go-live floor
        and the drafting skill remains the live path. Nothing generated here should be served until
        this slice has been walked and you say otherwise. Every rule citation in the skeleton is
        reproduced as the firm’s forms quote it and is <strong>UNVERIFIED</strong>.
      </div>

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
          <label className="fld">
            <span className="lab">Incident type</span>
            <input
              type="text" value={incidentType} placeholder="motor vehicle collision"
              onChange={(e) => setIncidentType(e.target.value)}
            />
            <span className="hint">Short phrase, set once per case.</span>
          </label>
          <label className="fld">
            <span className="lab">Date of service</span>
            <input type="text" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} />
            <span className="hint">
              Your local (Central) date, not the server’s — §12.8. Defaulted to today, Central.
            </span>
          </label>
        </div>
      </div>

      {/* ---------- 2. providers ---------- */}
      <div className="card">
        <h3>2 · Providers to designate</h3>
        {providers.length === 0 && (
          <p className="muted">
            No provider contacts are linked to this matter. Link them on the Parties tab first.
          </p>
        )}
        {providers.map((p) => {
          const pGates = gates.filter((g) => g.partyId === p.id);
          return (
            <div key={p.id} className="rep" style={{ marginBottom: 10 }}>
              <label className="check">
                <input
                  type="checkbox" checked={!!selected[p.id]}
                  onChange={(e) => setSelected((s) => ({ ...s, [p.id]: e.target.checked }))}
                />
                <strong>{p.displayName}</strong>
                {pGates.map((g) => (
                  <span
                    key={g.id}
                    className={`badge ${g.severity === 'hard-pause' ? 'criminal' : 'flag'}`}
                    title={g.body}
                  >
                    {g.severity === 'hard-pause' ? 'HARD PAUSE' : g.title.split(' — ')[0]}
                  </span>
                ))}
              </label>
              {selected[p.id] && <ProviderCard
                party={p}
                card={cards[p.id]}
                onChange={(patch) => setCard(p.id, patch)}
              />}
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
      </div>

      {/* ---------- 4. conditional sections ---------- */}
      <div className="card">
        <h3>4 · Conditional sections</h3>
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

      {/* ---------- gates ---------- */}
      {gates.length > 0 && (
        <div className="card">
          <h3>Warning gates — screen only</h3>
          <p className="small muted">
            These inform the drafting decision. <strong>None of them changes a character of the
            generated document</strong> — the text is identical whatever they say, which is a
            binding invariant of this engine and is covered by a regression test.
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
        </div>
      )}

      {/* ---------- 195.2 deadline ---------- */}
      <DeadlinePanel />

      {/* ---------- still needed ---------- */}
      {missing.length > 0 && (
        <div className="card">
          <h3>Still needed — {missing.length}</h3>
          <p className="small muted">
            Only what the file does not already hold. Anything on a record is not asked for, and an
            answer here does not become a guess anywhere else.
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
          disabled={busy || chosenProviders.length === 0 || unmetBlocking.length > 0}
          onClick={generate}
        >
          {busy ? 'Generating…' : 'Generate Word document'}
        </button>
        <p className="small muted" style={{ marginTop: 8 }}>
          Token substitution against the real .docx skeleton — never regeneration. The download is
          the file; a record of it is filed against this matter with the full answer snapshot for
          supplementation replay. <strong>One-click PDF is not built</strong> — converting .docx to
          PDF needs Word or LibreOffice and cannot be done in the browser. Save as PDF from Word.
        </p>
        {error && <p className="notice"><strong>Failed:</strong> {error}</p>}
      </div>

      {result && <ResultPanel result={result} />}
    </div>
  );
}

/* ================= provider interview card (§4) ================= */

function ProviderCard({
  party, card, onChange,
}: {
  party: PartyRecord;
  card: ProviderCardAnswer | undefined;
  onChange: (patch: Partial<ProviderCardAnswer>) => void;
}) {
  const dossier = String((party.fields ?? {}).boardCertification ?? '');
  const checked = card?.treatmentChecked ?? [];

  return (
    <div style={{ marginTop: 10, paddingLeft: 24 }}>
      <div className="form-grid">
        <label className="fld">
          <span className="lab">Approved narrative variant</span>
          <select
            value={card?.variantKey ?? DISCLOSURE_VARIANTS[0].key}
            onChange={(e) => onChange({ variantKey: e.target.value })}
          >
            {DISCLOSURE_VARIANTS.map((v) => (
              <option key={v.key} value={v.key}>§{v.section} — {v.title}</option>
            ))}
          </select>
          <span className="hint">
            §9’s approved library, verbatim. There is deliberately no mental-health variant.
          </span>
        </label>

        <label className="fld">
          <span className="lab">Board certification</span>
          {dossier ? (
            <div className="small">
              <span className="badge status">{dossier} ✓</span>{' '}
              <span className="muted">from the party record — not asked</span>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={card?.boardCertification ?? ''}
                placeholder="Leave blank if you don’t know"
                onChange={(e) => onChange({
                  boardCertification: e.target.value,
                  boardCertificationKnown: e.target.value.trim() !== '',
                })}
              />
              <span className="hint">
                Blank means unknown — the phrase is dropped rather than claimed. An unverified
                credential never goes into a disclosure.
              </span>
            </>
          )}
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <span className="lab" style={{ fontWeight: 600, fontSize: 13 }}>Treatment provided</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 6 }}>
          {TREATMENT_OPTIONS.map((t) => (
            <label className="check" key={t}>
              <input
                type="checkbox"
                checked={checked.includes(t)}
                onChange={(e) => onChange({
                  treatmentChecked: e.target.checked
                    ? [...checked, t]
                    : checked.filter((x) => x !== t),
                })}
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="form-grid" style={{ marginTop: 10 }}>
        <label className="fld">
          <span className="lab">Surgery performed (plain terms)</span>
          <input
            type="text" value={card?.surgeryPerformed ?? ''}
            onChange={(e) => onChange({ surgeryPerformed: e.target.value })}
          />
        </label>
        <label className="fld">
          <span className="lab">Future care recommended, not yet performed</span>
          <input
            type="text" value={card?.futureCare ?? ''}
            onChange={(e) => onChange({ futureCare: e.target.value })}
          />
        </label>
        <label className="fld">
          <span className="lab">Treated this client before the incident?</span>
          <select
            value={card?.treatedBeforeIncident === undefined ? '' : String(card.treatedBeforeIncident)}
            onChange={(e) => onChange({
              treatedBeforeIncident: e.target.value === '' ? undefined : e.target.value === 'true',
            })}
          >
            <option value="">—</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <span className="hint">PCP variant only. “Yes” opens the full chart.</span>
        </label>
      </div>
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
 * asserting a date. Recorded in docs/spec-feedback.md for Michael.
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
  result: { lint: LintReport; text: string; writeBacks: WriteBackResult[] };
}) {
  const flagged = result.writeBacks.filter((w) => w.status === 'flagged');
  const applied = result.writeBacks.filter((w) => w.status === 'applied');

  return (
    <>
      <div className="card">
        <h3>Render lint {result.lint.clean ? '— clean' : `— ${result.lint.findings.length} finding(s)`}</h3>
        {result.lint.clean && (
          <p className="small">
            No unfilled placeholders, no legacy numeric tokens, no stray region markers, numbering
            gapless and duplicate-free.
          </p>
        )}
        {result.lint.findings.map((f, i) => (
          <div key={i} className="notice" style={{ marginTop: 8 }}>
            <span className={`badge ${f.severity === 'error' ? 'criminal' : 'flag'}`}>{f.severity}</span>{' '}
            <strong>{f.message}</strong>
            {f.detail && <div className="small muted" style={{ marginTop: 4 }}>{f.detail}</div>}
          </div>
        ))}
        <p className="small muted" style={{ marginTop: 10 }}>
          Findings are advisory. Whether a consistency mismatch should refuse to render or warn is
          an open question for you — a hard refusal mid-draft would be worse than useless.
        </p>
      </div>

      <div className="card">
        <h3>Write-backs</h3>
        {applied.length === 0 && flagged.length === 0 && <p className="muted">Nothing to write back.</p>}
        {applied.length > 0 && (
          <>
            <p className="small"><strong>Stored on the records:</strong></p>
            <ul className="small">
              {applied.map((w, i) => <li key={i}>{w.field} → {w.target}: {w.value}</li>)}
            </ul>
          </>
        )}
        {flagged.length > 0 && (
          <>
            <p className="small">
              <strong>Flagged, not guessed —</strong> these had nowhere to land:
            </p>
            <table className="list">
              <thead><tr><th>Answer</th><th>Value</th><th>Why not stored</th></tr></thead>
              <tbody>
                {flagged.map((w, i) => (
                  <tr key={i}>
                    <td>{w.field}</td>
                    <td>{w.value}</td>
                    <td className="muted">{w.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

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

/** A provider card before anyone has answered anything on it. */
function defaultCard(providerPartyId: string): ProviderCardAnswer {
  return {
    providerPartyId,
    variantKey: DISCLOSURE_VARIANTS[0].key,
    boardCertificationKnown: false,
    treatmentChecked: [],
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
