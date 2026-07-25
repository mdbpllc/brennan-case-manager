// Bill workspace: ledger fields, line-item table with assisted CPT mapping
// (chargemaster-memory trigram suggestions + attorney confirm), EOB record on
// Type 2 bills, deterministic coding audit, and benchmark analysis runs with
// the ratio-led report generator. Suggest→confirm split per guardrail 2:
// nothing is treated as fact until the attorney confirms it, and every
// confirmation lands in the review log.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { CaseRecord } from '../domain/types';
import type {
  AnalysisResultLine, AnalysisRun, BillLineItem, CodeMapping, EOBRecord,
  FeeSchedule, GeneratedDocument, LegalRule, MedicalBill,
} from '../domain/billing';
import {
  ATTORNEY_USER, DISCLAIMER_TEXT, confidenceBand, CONFIDENCE_FLOOR, reconcileType2,
} from '../domain/billing';
import { rankByTrigram } from '../analysis/trigram';
import { runCodingAudit } from '../analysis/codingAudit';
import { detectClaimType } from '../analysis/claimType';
import { computeAnalysis, runScheduleSelection } from '../analysis/benchmark';
import { renderReasonableValueReport } from '../analysis/report';
import { runStalenessReasons } from '../analysis/staleness';
import { recomputeProviderProfile } from '../analysis/providerProfile';
import { db } from '../data';
import MarkdownLite from '../components/MarkdownLite';

function money(n: number | undefined): string {
  if (n === undefined) return '—';
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface Suggestion {
  cpt: string;
  score: number;
  fromDescription: string;
  sameProvider: boolean;
}

/** Best chargemaster-memory suggestion for a description. Same-provider mappings
 *  rank ahead of cross-provider ones; protective-order mappings are excluded
 *  from cross-case memory entirely (guardrail 4). */
function suggestCpt(description: string, providerPartyId: string | undefined, mappings: CodeMapping[]): Suggestion | null {
  const usable = mappings.filter((m) => m.isActive && !m.protectiveOrder);
  const ranked = rankByTrigram(
    description, usable, (m) => m.rawDescription,
    (m) => (m.providerPartyId && m.providerPartyId === providerPartyId ? 1 : 0.8),
  );
  const best = ranked[0];
  if (!best || best.score < CONFIDENCE_FLOOR) return null;
  return {
    cpt: best.item.cpt,
    score: Math.min(1, best.score),
    fromDescription: best.item.rawDescription,
    sameProvider: best.item.providerPartyId === providerPartyId,
  };
}

export default function BillWorkspacePage() {
  const { caseId, billId } = useParams<{ caseId: string; billId: string }>();
  const [caseRec, setCaseRec] = useState<CaseRecord | null>(null);
  const [bill, setBill] = useState<MedicalBill | null>(null);
  const [lines, setLines] = useState<BillLineItem[]>([]);
  const [mappings, setMappings] = useState<CodeMapping[]>([]);
  const [eob, setEob] = useState<EOBRecord | null>(null);
  const [runs, setRuns] = useState<AnalysisRun[]>([]);
  const [schedules, setSchedules] = useState<FeeSchedule[]>([]);
  const [rules, setRules] = useState<LegalRule[]>([]);
  const [providerName, setProviderName] = useState<string | undefined>();
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'notfound' | 'error'>('loading');

  const refresh = useCallback(async () => {
    if (!caseId || !billId) return;
    try {
      const [c, b] = await Promise.all([db.getCase(caseId), db.getBill(billId)]);
      if (!c || !b) { setLoadState('notfound'); return; }
      const [ls, ms, e, rs, scheds, lrs] = await Promise.all([
        db.listLineItems(b.id), db.listCodeMappings(), db.getEobForBill(b.id), db.listRunsForBill(b.id),
        db.listFeeSchedules(), db.listLegalRules(),
      ]);
      setCaseRec(c); setBill(b); setLines(ls); setMappings(ms); setEob(e); setRuns(rs);
      setSchedules(scheds); setRules(lrs);
      if (b.providerPartyId) {
        const p = await db.getParty(b.providerPartyId);
        setProviderName(p?.displayName);
      }
      setLoadState('ready');
    } catch {
      setLoadState('error');
    }
  }, [caseId, billId]);

  useEffect(() => { refresh(); }, [refresh]);

  if (loadState === 'notfound') {
    return <div className="notice">Bill not found — it may have been removed. <Link to={`/cases/${caseId}/medical`}>Back to Medical tab</Link></div>;
  }
  if (loadState === 'error') {
    return <div className="notice">Couldn't load this bill. Check the database connection and refresh.</div>;
  }
  if (!bill || !caseRec) return <div className="muted">Loading…</div>;

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>{bill.label}</h2>
          <div className="sub">
            <Link to={`/cases/${caseRec.id}/medical`}>{caseRec.fileNumber} — {caseRec.caption || caseRec.caseType}</Link>
            {providerName ? ` · ${providerName}` : ''} · Type {bill.billType} ({bill.billType === 1 ? 'raw' : 'insurance-paid'})
          </div>
        </div>
        <div><span className={`badge claim-${bill.claimType}`}>{bill.claimType} claim</span></div>
      </div>

      <LedgerCard bill={bill} onChange={(b) => { setBill(b); }} />
      <ClaimTypeCard bill={bill} lines={lines} onChange={setBill} />
      {bill.billType === 2 && <EobCard bill={bill} eob={eob} onSaved={refresh} onBillChange={setBill} />}
      <LineItemsCard bill={bill} lines={lines} mappings={mappings} onChanged={refresh} />
      <AuditCard lines={lines} />
      <AnalysisCard bill={bill} caseRec={caseRec} lines={lines} runs={runs} schedules={schedules} rules={rules} providerName={providerName} onChanged={refresh} />

      <div className="notice">{DISCLAIMER_TEXT}</div>
    </div>
  );
}

/* ================= LEDGER ================= */

function LedgerCard({ bill, onChange }: { bill: MedicalBill; onChange: (b: MedicalBill) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(bill);
  useEffect(() => setDraft(bill), [bill]);

  const rec = bill.billType === 2 ? reconcileType2(bill) : null;

  const numField = (label: string, key: keyof MedicalBill) => (
    <label className="fld"><span className="lab">{label}</span>
      <input
        type="text" inputMode="decimal"
        value={draft[key] === undefined ? '' : String(draft[key])}
        onChange={(e) => setDraft({ ...draft, [key]: e.target.value === '' ? undefined : Number(e.target.value) })}
      />
    </label>
  );

  const save = async () => {
    const updated = await db.updateBill(bill.id, {
      label: draft.label, serviceStart: draft.serviceStart, serviceEnd: draft.serviceEnd,
      billedAmount: draft.billedAmount, negotiatedReduction: draft.negotiatedReduction,
      insurerPayment: draft.insurerPayment, contractualAdjustment: draft.contractualAdjustment,
      patientBalance: draft.patientBalance, balanceReduction: draft.balanceReduction, notes: draft.notes,
    });
    await db.appendReviewLog({
      entityType: 'medical_bill', entityId: bill.id, action: 'edited', user: ATTORNEY_USER,
      oldValue: JSON.stringify({ billedAmount: bill.billedAmount }), newValue: JSON.stringify({ billedAmount: updated.billedAmount }),
    });
    onChange(updated);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3>Bill ledger</h3>
          <button className="btn small secondary" onClick={() => setEditing(true)}>Edit</button>
        </div>
        <dl className="kv">
          <dt>Service dates</dt><dd>{bill.serviceStart ?? '—'} → {bill.serviceEnd ?? '—'}</dd>
          <dt>Total billed</dt><dd><strong>{money(bill.billedAmount)}</strong></dd>
          {bill.billType === 1 && (<>
            <dt>Negotiated reduction</dt><dd>{money(bill.negotiatedReduction)}</dd>
            <dt>Outstanding</dt><dd><strong>{money(bill.billedAmount - (bill.negotiatedReduction ?? 0))}</strong></dd>
          </>)}
          {bill.billType === 2 && (<>
            <dt>Insurer payment</dt><dd>{money(bill.insurerPayment)}</dd>
            <dt>Contractual adjustment</dt><dd>{money(bill.contractualAdjustment)}</dd>
            <dt>Remaining patient balance</dt><dd><strong>{money(bill.patientBalance)}</strong></dd>
            <dt>Reduction negotiated on balance</dt><dd>{money(bill.balanceReduction)}</dd>
          </>)}
          <dt>Notes</dt><dd style={{ whiteSpace: 'pre-wrap' }}>{bill.notes || <span className="empty">—</span>}</dd>
        </dl>
        {rec && rec.discrepancy !== null && Math.abs(rec.discrepancy) > 0.01 && (
          <div className="notice" style={{ marginTop: 10 }}>
            Reconciliation check: billed − payment − adjustment = {money(rec.expectedBalance)}, but the recorded
            patient balance is {money(bill.patientBalance)} (off by {money(Math.abs(rec.discrepancy))}). Confirm
            against the EOB — Type 2 settlement math uses the true remaining balance, not sticker price.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Edit bill ledger</h3>
      <div className="form-grid">
        <label className="fld full"><span className="lab">Label</span>
          <input type="text" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
        </label>
        <label className="fld"><span className="lab">Service start</span>
          <input type="date" value={draft.serviceStart ?? ''} onChange={(e) => setDraft({ ...draft, serviceStart: e.target.value || undefined })} />
        </label>
        <label className="fld"><span className="lab">Service end</span>
          <input type="date" value={draft.serviceEnd ?? ''} onChange={(e) => setDraft({ ...draft, serviceEnd: e.target.value || undefined })} />
        </label>
        {numField('Total billed ($)', 'billedAmount')}
        {bill.billType === 1 && numField('Negotiated reduction ($)', 'negotiatedReduction')}
        {bill.billType === 2 && (<>
          {numField('Insurer payment ($)', 'insurerPayment')}
          {numField('Contractual adjustment ($)', 'contractualAdjustment')}
          {numField('Remaining patient balance ($)', 'patientBalance')}
          {numField('Reduction on balance ($)', 'balanceReduction')}
        </>)}
        <label className="fld full"><span className="lab">Notes</span>
          <textarea value={draft.notes ?? ''} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </label>
      </div>
      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <button className="btn" onClick={save}>Save</button>
        <button className="btn secondary" onClick={() => { setDraft(bill); setEditing(false); }}>Cancel</button>
      </div>
    </div>
  );
}

/* ================= CLAIM TYPE ================= */

function ClaimTypeCard({ bill, lines, onChange }: { bill: MedicalBill; lines: BillLineItem[]; onChange: (b: MedicalBill) => void }) {
  const detection = useMemo(() => detectClaimType(lines), [lines]);

  const applyDetection = async () => {
    const updated = await db.updateBill(bill.id, { claimType: detection.claimType, claimTypeSource: 'detected' });
    onChange(updated);
  };

  const override = async (value: MedicalBill['claimType']) => {
    const updated = await db.updateBill(bill.id, { claimType: value, claimTypeSource: 'attorney' });
    await db.appendReviewLog({
      entityType: 'medical_bill', entityId: bill.id, action: 'edited', user: ATTORNEY_USER,
      oldValue: `claimType: ${bill.claimType}`, newValue: `claimType: ${value} (attorney override)`,
    });
    onChange(updated);
  };

  return (
    <div className="card">
      <h3>Claim type</h3>
      <p className="small" style={{ margin: '0 0 8px' }}>
        Current: <span className={`badge claim-${bill.claimType}`}>{bill.claimType}</span>{' '}
        <span className="muted">({bill.claimTypeSource === 'attorney' ? 'attorney-set' : 'detected'})</span>
        {' · '}Detection says: <strong>{detection.claimType}</strong> — {detection.reason}
      </p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {bill.claimType !== detection.claimType && (
          <button className="btn small secondary" onClick={applyDetection}>Apply detection</button>
        )}
        <span className="small muted">Attorney override:</span>
        {(['professional', 'facility', 'unknown'] as const).map((v) => (
          <button key={v} className="btn small secondary" disabled={bill.claimType === v && bill.claimTypeSource === 'attorney'} onClick={() => override(v)}>{v}</button>
        ))}
      </div>
      {bill.claimType === 'facility' && (
        <div className="notice" style={{ marginTop: 10 }}>
          <strong>Facility bill — hard caveat.</strong> Phase 1 benchmarks are professional-schedule figures.
          Facility reimbursement runs on different schedules and methodologies (observed facility rates ran
          4–10× professional benchmarks in the reference dry run). Treat every ratio on this bill as
          directional only until facility-specific data (hospital MRF, Phase 2) is loaded.
        </div>
      )}
    </div>
  );
}

/* ================= EOB (Type 2) ================= */

function EobCard({ bill, eob, onSaved, onBillChange }: {
  bill: MedicalBill; eob: EOBRecord | null; onSaved: () => void; onBillChange: (b: MedicalBill) => void;
}) {
  const [draft, setDraft] = useState({
    documentLink: eob?.documentLink ?? '',
    insurerPayment: eob?.insurerPayment !== undefined ? String(eob.insurerPayment) : '',
    contractualAdjustment: eob?.contractualAdjustment !== undefined ? String(eob.contractualAdjustment) : '',
    patientResponsibility: eob?.patientResponsibility !== undefined ? String(eob.patientResponsibility) : '',
    sourcePin: eob?.sourcePin ?? '',
  });
  useEffect(() => {
    setDraft({
      documentLink: eob?.documentLink ?? '',
      insurerPayment: eob?.insurerPayment !== undefined ? String(eob.insurerPayment) : '',
      contractualAdjustment: eob?.contractualAdjustment !== undefined ? String(eob.contractualAdjustment) : '',
      patientResponsibility: eob?.patientResponsibility !== undefined ? String(eob.patientResponsibility) : '',
      sourcePin: eob?.sourcePin ?? '',
    });
  }, [eob]);

  const num = (s: string) => (s.trim() === '' ? undefined : Number(s));

  const save = async () => {
    const saved = await db.saveEob(bill.id, {
      documentLink: draft.documentLink || undefined,
      insurerPayment: num(draft.insurerPayment),
      contractualAdjustment: num(draft.contractualAdjustment),
      patientResponsibility: num(draft.patientResponsibility),
      sourcePin: draft.sourcePin || undefined,
    });
    await db.appendReviewLog({
      entityType: 'eob_record', entityId: saved.id, action: eob ? 'edited' : 'created', user: ATTORNEY_USER,
      oldValue: eob ? `patientResponsibility: ${eob.patientResponsibility ?? '—'}` : undefined,
      newValue: `patientResponsibility: ${saved.patientResponsibility ?? '—'} (${saved.sourcePin ?? 'no source pin'})`,
    });
    onSaved();
  };

  const copyToLedger = async () => {
    const updated = await db.updateBill(bill.id, {
      insurerPayment: num(draft.insurerPayment),
      contractualAdjustment: num(draft.contractualAdjustment),
      patientBalance: num(draft.patientResponsibility),
    });
    await db.appendReviewLog({
      entityType: 'medical_bill', entityId: bill.id, action: 'edited', user: ATTORNEY_USER,
      reason: 'Applied EOB figures to ledger', newValue: 'insurerPayment/contractualAdjustment/patientBalance from EOB',
    });
    onBillChange(updated);
  };

  const missingPin = draft.patientResponsibility.trim() !== '' && draft.sourcePin.trim() === '';

  return (
    <div className="card">
      <h3>EOB record</h3>
      <p className="small muted" style={{ margin: '0 0 10px' }}>
        The patient-responsibility figure is load-bearing — it is the statutory maximum for a hospital lien
        under the Ch. 146 analysis (registry status applies). Pin it to the source document; never type it from memory.
      </p>
      <div className="form-grid">
        <label className="fld full"><span className="lab">EOB document link / reference</span>
          <input type="text" value={draft.documentLink} placeholder="Document storage lands later — describe the EOB (date, insurer)" onChange={(e) => setDraft({ ...draft, documentLink: e.target.value })} />
        </label>
        <label className="fld"><span className="lab">Insurer payment ($)</span>
          <input type="text" inputMode="decimal" value={draft.insurerPayment} onChange={(e) => setDraft({ ...draft, insurerPayment: e.target.value })} />
        </label>
        <label className="fld"><span className="lab">Contractual adjustment ($)</span>
          <input type="text" inputMode="decimal" value={draft.contractualAdjustment} onChange={(e) => setDraft({ ...draft, contractualAdjustment: e.target.value })} />
        </label>
        <label className="fld"><span className="lab">Patient responsibility ($) — typed, source-pinned</span>
          <input type="text" inputMode="decimal" value={draft.patientResponsibility} onChange={(e) => setDraft({ ...draft, patientResponsibility: e.target.value })} />
        </label>
        <label className="fld"><span className="lab">Source pin (where on the EOB)</span>
          <input type="text" value={draft.sourcePin} placeholder={'e.g. EOB dated 5/2, p. 2, "patient responsibility" box'} onChange={(e) => setDraft({ ...draft, sourcePin: e.target.value })} />
        </label>
      </div>
      {missingPin && (
        <div className="notice" style={{ marginTop: 10 }}>
          Patient responsibility entered without a source pin — record where the number appears before relying on it.
        </div>
      )}
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn small" onClick={save}>Save EOB</button>
        <button className="btn small secondary" onClick={copyToLedger}>Apply EOB figures to ledger</button>
      </div>
    </div>
  );
}

/* ================= LINE ITEMS ================= */

interface LineDraft {
  serviceDate: string; rawDescription: string; revenueCode: string; chargemasterCode: string;
  qty: string; unitCharge: string; extendedCharge: string;
}

const EMPTY_DRAFT: LineDraft = {
  serviceDate: '', rawDescription: '', revenueCode: '', chargemasterCode: '', qty: '1', unitCharge: '', extendedCharge: '',
};

function LineItemsCard({ bill, lines, mappings, onChanged }: {
  bill: MedicalBill; lines: BillLineItem[]; mappings: CodeMapping[]; onChanged: () => void;
}) {
  const [draft, setDraft] = useState<LineDraft>(EMPTY_DRAFT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<LineDraft>(EMPTY_DRAFT);
  const [manualCptId, setManualCptId] = useState<string | null>(null);
  const [manualCpt, setManualCpt] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const suggestion = useMemo(
    () => (draft.rawDescription.trim().length >= 4 ? suggestCpt(draft.rawDescription, bill.providerPartyId, mappings) : null),
    [draft.rawDescription, bill.providerPartyId, mappings],
  );

  const addLine = async () => {
    if (!draft.rawDescription.trim()) return;
    const qty = Number(draft.qty) || 1;
    const unit = Number(draft.unitCharge) || 0;
    const ext = draft.extendedCharge.trim() !== '' ? Number(draft.extendedCharge) : qty * unit;
    const line = await db.createLineItem({
      billId: bill.id,
      serviceDate: draft.serviceDate || undefined,
      rawDescription: draft.rawDescription.trim(),
      revenueCode: draft.revenueCode || undefined,
      chargemasterCode: draft.chargemasterCode || undefined,
      qty, unitCharge: unit, extendedCharge: ext,
      cpt: suggestion?.cpt,
      mappingStatus: suggestion ? 'suggested' : 'unmapped',
      suggestionConfidence: suggestion?.score,
      mappingSource: suggestion ? 'chargemaster_memory' : undefined,
    });
    if (suggestion) {
      await db.appendReviewLog({
        entityType: 'bill_line_item', entityId: line.id, action: 'suggested', user: 'system (chargemaster memory)',
        newValue: `CPT ${suggestion.cpt} suggested at ${(suggestion.score * 100).toFixed(0)}% from "${suggestion.fromDescription}"`,
      });
    }
    setDraft(EMPTY_DRAFT);
    onChanged();
  };

  /** Attorney confirmation: stamps the line, saves the mapping into chargemaster
   *  memory, and writes the review log. */
  const confirmLine = async (line: BillLineItem, cpt: string, source: 'chargemaster_memory' | 'attorney') => {
    const nowIso = new Date().toISOString();
    await db.updateLineItem(line.id, {
      cpt, mappingStatus: 'confirmed', mappingSource: source, confirmedBy: ATTORNEY_USER, confirmedDate: nowIso,
    });
    await db.createCodeMapping({
      providerPartyId: bill.providerPartyId,
      rawDescription: line.rawDescription,
      chargemasterCode: line.chargemasterCode,
      cpt, mappingSource: source, confirmedBy: ATTORNEY_USER, confirmedDate: nowIso,
      protectiveOrder: false, isActive: true,
    });
    await db.appendReviewLog({
      entityType: 'bill_line_item', entityId: line.id, action: 'confirmed', user: ATTORNEY_USER,
      oldValue: line.cpt ? `CPT ${line.cpt} (${line.mappingStatus})` : 'unmapped',
      newValue: `CPT ${cpt} confirmed`,
    });
    setManualCptId(null); setManualCpt('');
    onChanged();
  };

  const rejectSuggestion = async (line: BillLineItem) => {
    await db.updateLineItem(line.id, { cpt: undefined, mappingStatus: 'unmapped', suggestionConfidence: undefined, mappingSource: undefined });
    await db.appendReviewLog({
      entityType: 'bill_line_item', entityId: line.id, action: 'rejected', user: ATTORNEY_USER,
      oldValue: `suggested CPT ${line.cpt}`, newValue: 'unmapped',
    });
    onChanged();
  };

  const startEdit = (line: BillLineItem) => {
    setEditingId(line.id);
    setEditDraft({
      serviceDate: line.serviceDate ?? '', rawDescription: line.rawDescription,
      revenueCode: line.revenueCode ?? '', chargemasterCode: line.chargemasterCode ?? '',
      qty: String(line.qty), unitCharge: String(line.unitCharge), extendedCharge: String(line.extendedCharge),
    });
  };

  const saveEdit = async (line: BillLineItem) => {
    const qty = Number(editDraft.qty) || 1;
    const unit = Number(editDraft.unitCharge) || 0;
    const ext = editDraft.extendedCharge.trim() !== '' ? Number(editDraft.extendedCharge) : qty * unit;
    await db.updateLineItem(line.id, {
      serviceDate: editDraft.serviceDate || undefined,
      rawDescription: editDraft.rawDescription.trim(),
      revenueCode: editDraft.revenueCode || undefined,
      chargemasterCode: editDraft.chargemasterCode || undefined,
      qty, unitCharge: unit, extendedCharge: ext,
    });
    await db.appendReviewLog({
      entityType: 'bill_line_item', entityId: line.id, action: 'edited', user: ATTORNEY_USER,
      oldValue: `${line.rawDescription} qty ${line.qty} ext ${line.extendedCharge}`,
      newValue: `${editDraft.rawDescription} qty ${qty} ext ${ext}`,
    });
    setEditingId(null);
    onChanged();
  };

  const deleteLine = async (line: BillLineItem) => {
    await db.deleteLineItem(line.id);
    await db.appendReviewLog({
      entityType: 'bill_line_item', entityId: line.id, action: 'rejected', user: ATTORNEY_USER,
      reason: 'Line deleted', oldValue: line.rawDescription,
    });
    onChanged();
  };

  const lineTotal = lines.reduce((s, l) => s + l.extendedCharge, 0);
  const offFromBill = Math.abs(lineTotal - bill.billedAmount) > 0.01;

  const badge = (line: BillLineItem) => {
    if (line.mappingStatus === 'confirmed') return <span className="badge conf-confirmed">✓ {line.cpt}</span>;
    if (line.mappingStatus === 'suggested' && line.suggestionConfidence !== undefined) {
      const band = confidenceBand(line.suggestionConfidence);
      return <span className={`badge conf-${band}`}>{line.cpt}? {(line.suggestionConfidence * 100).toFixed(0)}%</span>;
    }
    return <span className="badge conf-none">unmapped</span>;
  };

  return (
    <div className="card">
      <h3>Line items</h3>
      <table className="list">
        <thead>
          <tr><th>Date</th><th>Description</th><th>Rev</th><th className="num">Qty</th><th className="num">Unit</th><th className="num" title="The line's total as printed on the bill (billing systems call this the extended charge)">Line total</th><th>CPT mapping</th><th></th></tr>
        </thead>
        <tbody>
          {lines.map((line) => editingId === line.id ? (
            <tr key={line.id}>
              <td><input type="date" value={editDraft.serviceDate} onChange={(e) => setEditDraft({ ...editDraft, serviceDate: e.target.value })} /></td>
              <td><input type="text" value={editDraft.rawDescription} onChange={(e) => setEditDraft({ ...editDraft, rawDescription: e.target.value })} /></td>
              <td style={{ maxWidth: 70 }}><input type="text" value={editDraft.revenueCode} onChange={(e) => setEditDraft({ ...editDraft, revenueCode: e.target.value })} /></td>
              <td style={{ maxWidth: 60 }}><input type="text" inputMode="decimal" value={editDraft.qty} onChange={(e) => setEditDraft({ ...editDraft, qty: e.target.value })} /></td>
              <td style={{ maxWidth: 90 }}><input type="text" inputMode="decimal" value={editDraft.unitCharge} onChange={(e) => setEditDraft({ ...editDraft, unitCharge: e.target.value })} /></td>
              <td style={{ maxWidth: 90 }}><input type="text" inputMode="decimal" value={editDraft.extendedCharge} onChange={(e) => setEditDraft({ ...editDraft, extendedCharge: e.target.value })} /></td>
              <td>{badge(line)}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button className="btn small" onClick={() => saveEdit(line)}>Save</button>{' '}
                <button className="btn small secondary" onClick={() => setEditingId(null)}>Cancel</button>
              </td>
            </tr>
          ) : (
            <tr key={line.id}>
              <td className="muted small">{line.serviceDate ?? '—'}</td>
              <td>
                {line.rawDescription}
                {line.scenarioCpts && line.scenarioCpts.length > 0 && (
                  <div className="small muted">Scenario range: {line.scenarioCpts.join(' / ')}</div>
                )}
              </td>
              <td className="muted small">{line.revenueCode ?? ''}</td>
              <td className="num">{line.qty}</td>
              <td className="num">{money(line.unitCharge)}</td>
              <td className="num">{money(line.extendedCharge)}</td>
              <td>{badge(line)}</td>
              <td style={{ whiteSpace: 'nowrap', position: 'relative' }}>
                {line.mappingStatus === 'suggested' && line.cpt && (
                  <>
                    <button className="btn small" onClick={() => confirmLine(line, line.cpt!, 'chargemaster_memory')}>Confirm</button>{' '}
                    <button className="btn small secondary" onClick={() => rejectSuggestion(line)}>Reject</button>{' '}
                  </>
                )}
                {manualCptId === line.id ? (
                  <span style={{ whiteSpace: 'nowrap' }}>
                    <input
                      type="text" value={manualCpt} placeholder="CPT"
                      style={{ width: 70, display: 'inline-block' }}
                      onChange={(e) => setManualCpt(e.target.value.toUpperCase())}
                    />{' '}
                    <button className="btn small" disabled={!/^[A-Z0-9]{4,5}$/.test(manualCpt)} onClick={() => confirmLine(line, manualCpt, 'attorney')}>OK</button>{' '}
                    <button className="btn small secondary" onClick={() => { setManualCptId(null); setManualCpt(''); }}>×</button>
                  </span>
                ) : (
                  <>
                    {line.mappingStatus !== 'confirmed' && (
                      <button className="btn small secondary" onClick={() => { setManualCptId(line.id); setManualCpt(''); }}>Set CPT</button>
                    )}{' '}
                    <button
                      className="btn small secondary" aria-label="More actions" title="Edit or delete this line"
                      onClick={() => setMenuOpenId(menuOpenId === line.id ? null : line.id)}
                    >⋯</button>
                    {menuOpenId === line.id && (
                      <div className="row-menu">
                        <button onClick={() => { setMenuOpenId(null); startEdit(line); }}>Edit line</button>
                        <button className="danger" onClick={() => { setMenuOpenId(null); deleteLine(line); }}>Delete line</button>
                      </div>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
          {lines.length === 0 && <tr><td colSpan={8} className="muted">No line items yet — add them from the bill statement below.</td></tr>}
        </tbody>
      </table>

      <div className="small" style={{ marginTop: 8 }}>
        Sum of line items: <strong>{money(lineTotal)}</strong>
        {offFromBill && <span className="muted"> — differs from bill total {money(bill.billedAmount)} (fine while entry is in progress)</span>}
      </div>

      <div style={{ marginTop: 14, padding: 10, background: '#f7f8fa', borderRadius: 6 }}>
        <div className="small" style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>Add line item</div>
        <div className="filters" style={{ alignItems: 'flex-end', marginBottom: 0 }}>
          <label className="fld"><span className="lab">Date</span>
            <input type="date" value={draft.serviceDate} onChange={(e) => setDraft({ ...draft, serviceDate: e.target.value })} />
          </label>
          <label className="fld" style={{ minWidth: 260, flex: 1 }}><span className="lab">Description (as printed on the bill)</span>
            <input type="text" value={draft.rawDescription} onChange={(e) => setDraft({ ...draft, rawDescription: e.target.value })} />
          </label>
          <label className="fld"><span className="lab">Rev code</span>
            <input type="text" value={draft.revenueCode} style={{ width: 80 }} onChange={(e) => setDraft({ ...draft, revenueCode: e.target.value })} />
          </label>
          <label className="fld"><span className="lab">Qty</span>
            <input type="text" inputMode="decimal" value={draft.qty} style={{ width: 60 }} onChange={(e) => setDraft({ ...draft, qty: e.target.value })} />
          </label>
          <label className="fld"><span className="lab">Unit ($)</span>
            <input type="text" inputMode="decimal" value={draft.unitCharge} style={{ width: 90 }} onChange={(e) => setDraft({ ...draft, unitCharge: e.target.value })} />
          </label>
          <label className="fld" title="Leave blank to auto-calculate qty × unit. Enter it only when the bill's printed line total differs — always record what the bill says."><span className="lab">Line total ($)</span>
            <input type="text" inputMode="decimal" placeholder="auto: qty × unit" value={draft.extendedCharge} style={{ width: 110 }} onChange={(e) => setDraft({ ...draft, extendedCharge: e.target.value })} />
          </label>
          <button className="btn small" onClick={addLine} disabled={!draft.rawDescription.trim()}>Add</button>
        </div>
        {suggestion && (
          <div className="small" style={{ marginTop: 8 }}>
            Chargemaster memory suggests <span className={`badge conf-${confidenceBand(suggestion.score)}`}>CPT {suggestion.cpt} · {(suggestion.score * 100).toFixed(0)}%</span>{' '}
            <span className="muted">
              from "{suggestion.fromDescription}"{suggestion.sameProvider ? ' (same provider)' : ' (different provider)'} — added as a suggestion; confirm it on the line.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CODING AUDIT ================= */

function AuditCard({ lines }: { lines: BillLineItem[] }) {
  const findings = useMemo(() => runCodingAudit(lines), [lines]);
  const lineById = useMemo(() => new Map(lines.map((l) => [l.id, l])), [lines]);
  if (lines.length === 0) return null;
  return (
    <div className="card">
      <h3>Coding audit (deterministic checks)</h3>
      {findings.length === 0 ? (
        <p className="small muted" style={{ margin: 0 }}>No flags — duplicates, quantity anomalies, extended-charge mismatches, and truncated descriptions all clear.</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {findings.map((f, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              <span className="badge audit-flag">{f.check}</span>{' '}
              <strong>{lineById.get(f.lineItemId)?.rawDescription}</strong>: {f.detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================= ANALYSIS ================= */

function AnalysisCard({ bill, caseRec, lines, runs, schedules, rules, providerName, onChanged }: {
  bill: MedicalBill; caseRec: CaseRecord; lines: BillLineItem[]; runs: AnalysisRun[];
  schedules: FeeSchedule[]; rules: LegalRule[]; providerName?: string; onChanged: () => void;
}) {
  const [openRun, setOpenRun] = useState<string | null>(null);
  const [resultLines, setResultLines] = useState<Record<string, AnalysisResultLine[]>>({});
  const [busy, setBusy] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);
  /** 'auto' = engine prefers imported/public schedules over demo; otherwise a schedule id. */
  const [scheduleChoice, setScheduleChoice] = useState('auto');

  /** run id → why its inputs changed since it ran (empty = current). */
  const staleness = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const run of runs) m.set(run.id, runStalenessReasons(run, schedules, rules));
    return m;
  }, [runs, schedules, rules]);
  const latestRun = runs[0]; // newest first
  const latestStaleReasons = latestRun ? staleness.get(latestRun.id) ?? [] : [];

  const loadResults = async (runId: string) => {
    if (!resultLines[runId]) {
      const rls = await db.listResultLines(runId);
      setResultLines((m) => ({ ...m, [runId]: rls }));
    }
    setOpenRun((r) => (r === runId ? null : runId));
  };

  const runAnalysis = async () => {
    setBusy(true);
    try {
      const [schedules, rules] = await Promise.all([db.listFeeSchedules(), db.listLegalRules()]);
      const rates = await db.listRates(schedules.map((s) => s.id));
      const selectedScheduleId = scheduleChoice === 'auto' ? undefined : scheduleChoice;
      const { run, resultLines: rls } = computeAnalysis({
        bill, lines, schedules, rates, registryRules: rules, makeId: () => crypto.randomUUID(),
        selectedScheduleId,
      });
      const sel = runScheduleSelection(run);
      await db.createRun(run, rls);
      await db.appendReviewLog({
        entityType: 'analysis_run', entityId: run.id, action: 'created', user: ATTORNEY_USER,
        newValue: `provisional run — confirmed ratio ${run.totals.confirmedRatio?.toFixed(2) ?? 'n/a'} against ${sel?.usedScheduleNames.join(' + ') || 'no schedule'} (${sel?.mode === 'attorney' ? 'attorney-selected' : 'auto-selected'})`,
      });
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const confirm = async (run: AnalysisRun) => {
    await db.confirmRun(run.id, ATTORNEY_USER);
    await db.appendReviewLog({
      entityType: 'analysis_run', entityId: run.id, action: 'confirmed', user: ATTORNEY_USER,
      oldValue: 'provisional', newValue: 'confirmed — eligible to feed settlement/lien math',
    });
    // Confirmed runs (and only confirmed runs) feed the provider's billing profile.
    if (bill.providerPartyId) await recomputeProviderProfile(db, bill.providerPartyId);
    onChanged();
  };

  const generateReport = async (run: AnalysisRun) => {
    setBusy(true);
    try {
      const [rules, rls] = await Promise.all([db.listLegalRules(), db.listResultLines(run.id)]);
      const findings = runCodingAudit(lines);
      const { title, content } = renderReasonableValueReport({
        bill, providerName, caseLabel: `${caseRec.fileNumber} — ${caseRec.caption || caseRec.caseType}`,
        lines, run, resultLines: rls, auditFindings: findings, registryRules: rules, schedules,
      });
      const doc = await db.createDocument({
        caseId: caseRec.id, runId: run.id, docType: 'reasonable-value-report',
        audience: 'internal', privilegeTier: 'work-product', title, content,
        disclaimerVersion: run.disclaimerVersion, generatedBy: ATTORNEY_USER,
      });
      await db.appendReviewLog({
        entityType: 'generated_document', entityId: doc.id, action: 'generated', user: ATTORNEY_USER,
        newValue: `${title} (internal, work-product)`,
      });
      setGeneratedDoc(doc);
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
        <h3>Benchmark analysis</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label className="small muted" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            Schedule:
            <select value={scheduleChoice} onChange={(e) => setScheduleChoice(e.target.value)}>
              <option value="auto">Auto — prefer imported over demo</option>
              {schedules.map((s) => (
                <option key={s.id} value={s.id}>{s.name}{s.sourceType === 'demo' ? ' (DEMO — fictional rates)' : ''}</option>
              ))}
            </select>
          </label>
          <button className="btn small" disabled={busy || lines.length === 0} onClick={runAnalysis}>
            {busy ? 'Working…' : 'Run analysis'}
          </button>
        </div>
      </div>
      <p className="small muted" style={{ margin: '0 0 10px' }}>
        Each run compares what the provider billed against what the chosen fee schedule (e.g. Medicare)
        would pay for the same services. A <strong>confirmed ratio</strong> of 3.35× means the provider
        billed 3.35 times the benchmark — it counts only lines whose CPT code the attorney has confirmed,
        and it is the number reports lead with. The <strong>scenario ratio</strong> is a preview that also
        counts unconfirmed suggested codes; it never feeds anything — and because unconfirmed lines can
        price at higher or lower multiples than the confirmed ones, it can land either above or below the
        confirmed ratio. The lines column shows how many lines
        were ✓ counted / ? preview-only / – not analyzed (no code, or no rate in the schedule). Every run
        starts <strong>provisional</strong>; pressing "Confirm run" is the attorney's sign-off, and only
        confirmed runs may feed settlement or lien math.
      </p>
      <table className="list">
        <thead><tr><th>Run</th><th>Status</th><th className="num">Confirmed ratio</th><th className="num">Scenario ratio</th><th>Lines (✓/?/–)</th><th></th></tr></thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id}>
              <td className="muted small">
                {new Date(run.runDate).toLocaleString()}
                {(() => {
                  const sel = runScheduleSelection(run);
                  return sel && sel.usedScheduleNames.length > 0
                    ? <div className="small">vs {sel.usedScheduleNames.join(' + ')}</div>
                    : null;
                })()}
              </td>
              <td>
                <span className={`badge run-${run.status}`}>{run.status}</span>{' '}
                {(staleness.get(run.id) ?? []).length > 0 && (
                  <span className="badge run-stale" title={staleness.get(run.id)!.join(' ')}>stale</span>
                )}
                {runScheduleSelection(run)?.demoUsed && (
                  <span className="badge src-demo" title="Computed against the seeded demo schedule (fictional rates) — placeholder only.">DEMO schedule</span>
                )}
                {run.status === 'confirmed' && run.reviewer && <div className="small muted">{run.reviewer}</div>}
              </td>
              <td className="num">{run.totals.confirmedRatio !== undefined ? `${run.totals.confirmedRatio.toFixed(2)}×` : '—'}</td>
              <td className="num muted">{run.totals.scenarioRatio !== undefined ? `${run.totals.scenarioRatio.toFixed(2)}×` : '—'}</td>
              <td className="small muted">{run.totals.matchedLineCount} / {run.totals.scenarioLineCount} / {run.totals.unanalyzedLineCount}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button className="btn small secondary" onClick={() => loadResults(run.id)}>{openRun === run.id ? 'Close' : 'Detail'}</button>{' '}
                {run.status === 'provisional' && <button className="btn small" onClick={() => confirm(run)}>Confirm run</button>}{' '}
                <button className="btn small secondary" disabled={busy} onClick={() => generateReport(run)}>Generate report</button>
              </td>
            </tr>
          ))}
          {runs.length === 0 && <tr><td colSpan={6} className="muted">No analysis runs yet.</td></tr>}
        </tbody>
      </table>

      {latestRun && runScheduleSelection(latestRun)?.demoUsed && (
        <div className="notice" style={{ marginTop: 10 }}>
          <strong>Placeholder benchmark — demo schedule.</strong> The latest run priced lines against the
          seeded DEMO schedule (fictional rates, not Medicare data). No ratio from it is usable — import a
          real schedule on the Benchmarks page, or pick one in the Schedule selector, and re-run.
        </div>
      )}

      {latestStaleReasons.length > 0 && (
        <div className="notice" style={{ marginTop: 10 }}>
          <strong>Latest analysis is stale.</strong> {latestStaleReasons.join(' ')}{' '}
          Its figures reflect the inputs in force when it ran — re-run with current schedules to refresh.{' '}
          <button className="btn small" disabled={busy || lines.length === 0} onClick={runAnalysis}>Re-run analysis</button>
        </div>
      )}

      {openRun && resultLines[openRun] && (
        <RunDetail run={runs.find((r) => r.id === openRun)!} resultLines={resultLines[openRun]} lines={lines} />
      )}

      {generatedDoc && (
        <div className="report-frame" style={{ marginTop: 12 }}>
          <div className="small muted" style={{ marginBottom: 6 }}>
            Report saved (internal · work-product). It also appears under "Generated reports" on the Medical tab.
          </div>
          <MarkdownLite text={generatedDoc.content} />
        </div>
      )}
    </div>
  );
}

function RunDetail({ run, resultLines, lines }: { run: AnalysisRun; resultLines: AnalysisResultLine[]; lines: BillLineItem[] }) {
  const lineById = new Map(lines.map((l) => [l.id, l]));
  return (
    <div style={{ marginTop: 10, padding: 10, background: '#f7f8fa', borderRadius: 6 }}>
      <table className="list">
        <thead><tr><th>Line</th><th>CPT</th><th>Tier</th><th className="num">Billed</th><th className="num">Benchmark</th><th className="num">Ratio</th><th>Cite</th></tr></thead>
        <tbody>
          {resultLines.map((rl) => {
            const line = lineById.get(rl.lineItemId);
            return (
              <tr key={rl.id}>
                <td className="small">{line?.rawDescription ?? '(line removed since run)'}</td>
                <td>{rl.cptUsed ?? '—'}</td>
                <td><span className={`badge tier-${rl.tier}`}>{rl.tier}</span></td>
                <td className="num">{line ? money(line.extendedCharge) : '—'}</td>
                <td className="num">{money(rl.allowable)}</td>
                <td className="num">{rl.ratio !== undefined ? `${rl.ratio.toFixed(2)}×` : '—'}</td>
                <td className="small muted">{rl.cite ?? rl.notes ?? ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="small muted" style={{ marginTop: 8 }}>
        Registry stamps: {run.registryStamps.map((s) => `${s.ruleKey} v${s.version} [${s.status}]`).join(' · ')}
        {' · '}Disclaimer {run.disclaimerVersion}
      </div>
    </div>
  );
}
