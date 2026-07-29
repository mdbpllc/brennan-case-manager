import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { PracticeArea, PiFlag, RepresentationType } from '../domain/types';
import { CASE_TYPES, PI_FLAGS, statusesFor } from '../domain/caseTypes';
import { localISODate } from '../domain/dates';
import { db } from '../data';

export default function NewCasePage() {
  const nav = useNavigate();
  const [area, setArea] = useState<PracticeArea>('Personal Injury');
  const [caseType, setCaseType] = useState<string>(CASE_TYPES['Personal Injury'][0]);
  const [caption, setCaption] = useState('');
  const [legacyRef, setLegacyRef] = useState('');
  const [repType, setRepType] = useState<RepresentationType | ''>('');
  const [commercialPolicy, setCommercialPolicy] = useState(false);
  const [flags, setFlags] = useState<PiFlag[]>([]);
  const [dateOfIncident, setDateOfIncident] = useState('');
  const [dateOpened, setDateOpened] = useState(() => localISODate());
  const [sol, setSol] = useState('');
  const [courtName, setCourtName] = useState('');
  const [causeNumber, setCauseNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const isPI = area === 'Personal Injury';
  const isCriminal = area === 'Criminal';
  const isMVC = isPI && caseType === 'Motor vehicle collision';

  const changeArea = (a: PracticeArea) => {
    setArea(a);
    setCaseType(CASE_TYPES[a][0]);
    setFlags([]);
    setRepType('');
  };

  const toggleFlag = (f: PiFlag) =>
    setFlags((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const rec = await db.createCase({
      practiceArea: area,
      caseType,
      caption: caption || undefined,
      legacyRef: legacyRef || undefined,
      status: statusesFor(area, caseType)[0],
      representationType: isCriminal && repType ? repType : undefined,
      commercialPolicyInvolved: isMVC ? commercialPolicy : undefined,
      piFlags: isPI ? flags : [],
      dateOfIncident: dateOfIncident || undefined,
      dateOpened,
      courtName: courtName || undefined,
      causeNumber: causeNumber || undefined,
      notes: notes || undefined,
    });
    // CL-2: the limitations date belongs to a CLIENT, and a brand-new case has
    // no parties linked yet — so there is no client record to put it on. Rather
    // than guess or drop it, hold it on the same flag the backfill uses; it
    // carries onto the client record when one is added on the Parties tab
    // (Michael's ruling, 2026-07-28).
    await db.createClientFlagIfAbsent({
      caseId: rec.id,
      reason:
        'New case: no client record yet. Link a party with the Client or Plaintiff role on the '
        + 'Parties tab and add them as a client — any limitations date entered at intake carries '
        + 'onto that record.',
      preservedStatuteOfLimitations: sol || undefined,
    });
    nav(`/cases/${rec.id}`);
  };

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>New case</h2>
          <div className="sub">File number is assigned automatically (YY-NNNN, counter resets each January).</div>
        </div>
      </div>

      <form onSubmit={submit}>
        <div className="card">
          <h3>Classification</h3>
          <div className="form-grid">
            <label className="fld">
              <span className="lab">Practice area</span>
              <select value={area} onChange={(e) => changeArea(e.target.value as PracticeArea)}>
                {Object.keys(CASE_TYPES).map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <label className="fld">
              <span className="lab">Case type</span>
              <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
                {CASE_TYPES[area].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            {isCriminal && (
              <label className="fld">
                <span className="lab">Representation type</span>
                <select value={repType} onChange={(e) => setRepType(e.target.value as RepresentationType | '')}>
                  <option value="">—</option>
                  <option>Court-appointed</option>
                  <option>Private hire</option>
                </select>
              </label>
            )}
            <label className="fld">
              <span className="lab">Legacy reference (Cloudlex)</span>
              <input type="text" value={legacyRef} onChange={(e) => setLegacyRef(e.target.value)} />
              <span className="hint">Optional — migrated cases get a fresh file number</span>
            </label>
          </div>

          {isPI && (
            <div style={{ marginTop: 14 }}>
              <span className="lab" style={{ fontWeight: 600, fontSize: 13, color: 'var(--navy)' }}>
                Overlay flags (stackable — each opens its playbook)
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px', marginTop: 8 }}>
                {PI_FLAGS.map((f) => (
                  <label className="check" key={f}>
                    <input type="checkbox" checked={flags.includes(f)} onChange={() => toggleFlag(f)} />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          )}

          {isMVC && (
            <div style={{ marginTop: 14 }}>
              <label className="check">
                <input type="checkbox" checked={commercialPolicy} onChange={(e) => setCommercialPolicy(e.target.checked)} />
                Commercial policy involved (top-line rollup — per-policy detail lives in the Insurance tab later)
              </label>
            </div>
          )}

          {isCriminal && (
            <div className="notice" style={{ marginTop: 14 }}>
              Appointed matter? <Link to="/cases/new/oaa">Create it from the Order of Attorney
              Appointment instead</Link> — upload the OAA and review the pre-filled draft.
            </div>
          )}
        </div>

        <div className="card">
          <h3>Identity & key dates</h3>
          <div className="form-grid">
            <label className="fld full">
              <span className="lab">Caption</span>
              <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Garcia v. Allied Freight Lines, Inc." />
            </label>
            <label className="fld">
              <span className="lab">Date of incident</span>
              <input type="date" value={dateOfIncident} onChange={(e) => setDateOfIncident(e.target.value)} />
            </label>
            <label className="fld">
              <span className="lab">Date opened</span>
              <input type="date" value={dateOpened} onChange={(e) => setDateOpened(e.target.value)} />
            </label>
            <label className="fld">
              <span className="lab">Statute of limitations</span>
              <input type="date" value={sol} onChange={(e) => setSol(e.target.value)} />
              <span className="hint">Auto-calculation comes with the deadline engine</span>
            </label>
            <label className="fld">
              <span className="lab">Court</span>
              <input type="text" value={courtName} onChange={(e) => setCourtName(e.target.value)} />
            </label>
            <label className="fld">
              <span className="lab">Cause number</span>
              <input type="text" value={causeNumber} onChange={(e) => setCauseNumber(e.target.value)} />
            </label>
            <label className="fld full">
              <span className="lab">Notes</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
            </label>
          </div>
        </div>

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Creating…' : 'Create case'}
        </button>
      </form>
    </div>
  );
}
