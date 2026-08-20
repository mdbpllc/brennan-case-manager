// "Upload the order, get the matter" — OAA-based criminal intake (spec §1–2).
// Nothing is committed without Michael's explicit Create Matter click; the
// draft review is the human-in-the-loop gate (same pattern as CONFIRMED
// AnalysisRuns). Tier 2 packets are gated on the P1 hardware — the fallback
// here is manual entry with the same review screen.

import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CaseRecord } from '../domain/types';
import type { CandidateSetting, ExtractedCharge, OaaExtraction } from '../domain/oaa';
import { statusesFor } from '../domain/caseTypes';
import { localISODate } from '../domain/dates';
import { db } from '../data';
import { extractPdfText } from '../oaa/pdfText';
import { matchOaaTemplate, hasUsableTextLayer } from '../oaa/templates';
import { detectSettings, noFutureSettingFound } from '../oaa/hearings';
import { checkAttorney, findDuplicateMatters, type AttorneyCheck, type DuplicateMatch } from '../oaa/validate';

interface DraftCharge {
  offense: string;
  degree: string;
  offenseDate: string;
  court: string;
  causeNumber: string;
  complaintNumber: string;
  mtrMta: boolean;
  appeal: boolean;
  confidence: 'high' | 'low';
}

const EMPTY_CHARGE: DraftCharge = {
  offense: '', degree: '', offenseDate: '', court: '', causeNumber: '',
  complaintNumber: '', mtrMta: false, appeal: false, confidence: 'high',
};

function toDraftCharge(c: ExtractedCharge): DraftCharge {
  return {
    // Offense text stays AS PRINTED on the order (spec §1a) — no case-folding.
    offense: c.offense, degree: c.degree ?? '', offenseDate: c.offenseDate ?? '',
    court: titleWords(c.court ?? ''), causeNumber: c.causeNumber ?? '',
    complaintNumber: c.complaintNumber ?? '', mtrMta: c.mtrMta, appeal: c.appeal,
    confidence: c.confidence,
  };
}

/** ALL-CAPS form text → Title Case for names/captions (leaves short tokens
 *  like "R." and mixed-case input alone). */
function titleWords(s: string): string {
  if (s !== s.toUpperCase()) return s; // already mixed case
  return s.toLowerCase().replace(/\b[a-z]/g, (ch) => ch.toUpperCase());
}

/** "DANIEL R. OKAFOR" or "OKAFOR, DANIEL R." → { first: "Daniel R.", last: "Okafor" } */
function splitName(raw: string): { first: string; last: string } {
  const name = titleWords(raw.trim());
  const comma = name.match(/^([^,]+),\s*(.+)$/);
  if (comma) return { first: comma[2].trim(), last: comma[1].trim() };
  const parts = name.split(/\s+/);
  if (parts.length === 1) return { first: '', last: parts[0] };
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] };
}

export default function OaaIntakePage() {
  const nav = useNavigate();
  const [step, setStep] = useState<'upload' | 'review'>('upload');
  const [reading, setReading] = useState(false);
  const [readError, setReadError] = useState('');

  // What the document said (frozen after extraction — the review edits the draft, not this)
  const [fileName, setFileName] = useState('');
  const [rawText, setRawText] = useState('');
  const [extraction, setExtraction] = useState<OaaExtraction | null>(null);
  const [tier, setTier] = useState<1 | 2>(2);
  const [templateKey, setTemplateKey] = useState('manual');
  const [attorney, setAttorney] = useState<AttorneyCheck>({ result: 'missing' });
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([]);
  const [candidates, setCandidates] = useState<CandidateSetting[]>([]);

  // The editable draft matter
  const [caption, setCaption] = useState('');
  const [caseType, setCaseType] = useState('Felony');
  const [court, setCourt] = useState('');
  const [county, setCounty] = useState('');
  const [dateOpened, setDateOpened] = useState(() => localISODate());
  const [appointmentDate, setAppointmentDate] = useState('');
  const [inCustody, setInCustody] = useState(false);
  const [custodyLocation, setCustodyLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [charges, setCharges] = useState<DraftCharge[]>([{ ...EMPTY_CHARGE }]);

  // Defendant party
  const [defFirst, setDefFirst] = useState('');
  const [defLast, setDefLast] = useState('');
  const [defDob, setDefDob] = useState('');
  const [defPhone, setDefPhone] = useState('');
  const [defAddress, setDefAddress] = useState('');
  const [existingParty, setExistingParty] = useState<{ id: string; displayName: string } | null>(null);
  const [linkExisting, setLinkExisting] = useState(false);

  // Gates
  const [attorneyConfirmed, setAttorneyConfirmed] = useState(false); // for 'missing'
  const [dupOverride, setDupOverride] = useState(false);

  // Hearings
  const [includeSetting, setIncludeSetting] = useState<Record<number, boolean>>({});
  const [manualHearing, setManualHearing] = useState({ include: false, date: '', time: '', location: '' });

  const [creating, setCreating] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const processText = async (text: string, name: string) => {
    const template = hasUsableTextLayer(text) ? matchOaaTemplate(text) : null;
    setFileName(name);
    setRawText(text);

    if (template) {
      const ex = template.parse(text);
      setExtraction(ex);
      setTier(template.tier);
      setTemplateKey(template.key);
      setAttorney(checkAttorney(ex.attorneyName?.value));

      // Pre-fill the draft
      const defName = ex.defendantName?.value ?? '';
      const { first, last } = splitName(defName);
      setDefFirst(first);
      setDefLast(last);
      // Style of the case per Michael (2026-07-25): full formal caption.
      setCaption(last ? `State of Texas v. ${[first, last].filter(Boolean).join(' ')}` : '');
      setDefDob(ex.dob?.value ?? '');
      setDefPhone(ex.phone?.value ?? '');
      // Address stays as printed — naive title-casing turns "TX" into "Tx".
      setDefAddress(
        [ex.address?.value, ex.cityStateZip?.value]
          .filter((v): v is string => Boolean(v))
          .join(', '),
      );
      setCourt(titleWords(ex.court?.value ?? ''));
      setCounty(titleWords(ex.county?.value ?? ''));
      const extractedCharges = ex.charges.map(toDraftCharge);
      setCharges(extractedCharges.length ? extractedCharges : [{ ...EMPTY_CHARGE }]);
      setCaseType(extractedCharges.some((c) => /^F|^SJF/i.test(c.degree)) ? 'Felony' : 'Misdemeanor');
      setInCustody(Boolean(ex.custodyLocation?.value));
      setCustodyLocation(titleWords(ex.custodyLocation?.value ?? ''));
      const apptIso = ex.appointmentDate?.value?.slice(0, 10) ?? '';
      setAppointmentDate(apptIso);
      if (apptIso) setDateOpened(apptIso);
      const noteLines = [
        ex.remarks ? `OAA remarks: ${ex.remarks.value}` : '',
        ex.indigencyStatus ? `Indigency: ${ex.indigencyStatus.value}` : '',
        ex.scopeNote ? `Appointment scope: ${ex.scopeNote.value}` : '',
        extractedCharges.some((c) => c.mtrMta) ? 'MTR/MTA checked on the OAA → revocation-adjudication track.' : '',
      ].filter(Boolean);
      setNotes(noteLines.join('\n'));

      // Hearing candidates (spec §2) — Tier 1 auto-creates pre-check the box, visibly.
      const cands = detectSettings(ex, localISODate());
      setCandidates(cands);
      setIncludeSetting(Object.fromEntries(cands.map((c, i) => [i, c.autoCreate])));

      // Duplicate-matter check (spec §1c)
      const causes = ex.charges.map((c) => c.causeNumber).filter((c): c is string => Boolean(c));
      const [allCases, allCharges] = await Promise.all([db.listCases(), db.listCharges()]);
      setDuplicates(findDuplicateMatters(causes, allCases, allCharges));

      // Known defendant? Offer linking instead of a duplicate party record.
      if (defName) {
        const display = `${first} ${last}`.trim().toLowerCase();
        const match = (await db.listParties()).find(
          (p) => p.kind === 'individual' && p.displayName.trim().toLowerCase() === display,
        );
        setExistingParty(match ? { id: match.id, displayName: match.displayName } : null);
        setLinkExisting(Boolean(match));
      }
    } else {
      // Tier 2 fallback: manual entry, full review, nothing auto-accepted.
      setExtraction(null);
      setTier(2);
      setTemplateKey('manual');
      setAttorney({ result: 'missing' });
      setCandidates([]);
      setDuplicates([]);
    }
    setStep('review');
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setReading(true);
    setReadError('');
    try {
      const text = file.name.toLowerCase().endsWith('.pdf')
        ? await extractPdfText(await file.arrayBuffer())
        : await file.text();
      await processText(text, file.name);
    } catch (err) {
      setReadError(`Couldn't read that file: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setReading(false);
    }
  };

  // ---- create gates ----
  const hardStop = attorney.result === 'mismatch';
  const needsAttorneyConfirm = attorney.result === 'missing' && !attorneyConfirmed;
  const blockedByDuplicate = duplicates.length > 0 && !dupOverride;
  const missingBasics = !defLast.trim() || !caption.trim();
  const canCreate = !hardStop && !needsAttorneyConfirm && !blockedByDuplicate && !missingBasics && !creating;

  const futureCandidates = useMemo(
    () => candidates.filter((c) => c.kind !== 'administrative'),
    [candidates],
  );
  const promptForHearing = noFutureSettingFound(candidates);

  const create = async () => {
    if (!canCreate) return;
    setCreating(true);
    try {
      const primaryCause = charges.find((c) => c.causeNumber.trim())?.causeNumber.trim();
      const rec: CaseRecord = await db.createCase({
        practiceArea: 'Criminal',
        caseType,
        caption: caption.trim(),
        status: statusesFor('Criminal', caseType)[0],
        representationType: 'Court-appointed',
        piFlags: [],
        dateOpened,
        courtName: court.trim() || undefined,
        causeNumber: primaryCause,
        county: county.trim() || undefined,
        inCustody: inCustody || undefined,
        custodyLocation: inCustody && custodyLocation.trim() ? custodyLocation.trim() : undefined,
        appointmentDate: appointmentDate || undefined,
        dateOfIncident: charges.find((c) => c.offenseDate)?.offenseDate || undefined,
        notes: notes.trim() || undefined,
      });

      // Defendant party: link the known record or create the client record.
      let partyId: string;
      if (existingParty && linkExisting) {
        partyId = existingParty.id;
      } else {
        const party = await db.createParty({
          partyType: 'client',
          kind: 'individual',
          displayName: `${defFirst} ${defLast}`.trim(),
          // Gate 10 §2 — the machine-extracted date of birth writes the TYPED
          // column, not a `dob` key in the blob. The adapter's write-guard would
          // strip the blob key anyway; routing it here means the value LANDS
          // rather than being silently dropped on its way through.
          dateOfBirth: defDob || null,
          fields: {
            firstName: defFirst, lastName: defLast,
            ...(defPhone ? { phone: defPhone.replace(/\D/g, '') } : {}),
            ...(defAddress ? { address: defAddress } : {}),
          },
        });
        partyId = party.id;
      }
      await db.createLink({ caseId: rec.id, partyId, role: 'Client', side: 'Ours' });

      // CL-2: intake already knows exactly who the client is, so create the
      // client record outright rather than leaving a flag for Michael. A
      // criminal client is the nearly-empty row (ruled default, #27): no
      // damages spine and no limitations date — the per-offense clocks live on
      // `charges` below. It is the future anchor for representation type.
      await db.createClient({
        caseId: rec.id, partyId, posture: 'defendant', displayOrder: 0,
        clientFlags: [], feeArrangement: {}, profileFields: {},
      });

      // Charges
      for (const c of charges) {
        if (!c.offense.trim() && !c.causeNumber.trim()) continue;
        await db.createCharge({
          caseId: rec.id,
          offense: c.offense.trim(),
          degree: c.degree.trim() || undefined,
          offenseDate: c.offenseDate || undefined,
          court: c.court.trim() || undefined,
          causeNumber: c.causeNumber.trim() || undefined,
          complaintNumber: c.complaintNumber.trim() || undefined,
          mtrMta: c.mtrMta,
          appeal: c.appeal,
        });
      }

      // Calendar entries — through the standard layer, so they ride the
      // Outlook push once connected (spec §2.5).
      for (let i = 0; i < candidates.length; i++) {
        const c = candidates[i];
        if (c.kind === 'administrative' || !includeSetting[i] || c.inPast) continue;
        await db.createEvent({
          caseId: rec.id,
          title: c.kind === 'docket_availability'
            ? `Docket availability — ${caption.trim()} (not a confirmed setting)`
            : `Hearing — ${caption.trim()}`,
          eventType: c.kind === 'docket_availability' ? 'reminder' : 'hearing',
          startLocal: c.startLocal,
          allDay: c.allDay,
          notes: `From OAA intake. ${c.provenance}`,
          status: 'scheduled',
          syncStatus: 'pending',
        });
      }
      if (manualHearing.include && manualHearing.date) {
        await db.createEvent({
          caseId: rec.id,
          title: `Hearing — ${caption.trim()}`,
          eventType: 'hearing',
          startLocal: manualHearing.time ? `${manualHearing.date}T${manualHearing.time}` : manualHearing.date,
          allDay: !manualHearing.time,
          location: manualHearing.location || undefined,
          notes: 'Entered at OAA intake (hearing already set per Michael).',
          status: 'scheduled',
          syncStatus: 'pending',
        });
      }

      // Audit trail: what the document said, and that intake created the matter.
      await db.createOaaIntake({
        caseId: rec.id,
        templateKey,
        tier,
        county: county.trim() || undefined,
        sourceFileName: fileName || undefined,
        extractedText: rawText,
        fieldsJson: JSON.stringify(extraction ?? {}),
      });
      await db.appendReviewLog({
        entityType: 'case', entityId: rec.id, action: 'created', user: 'Michael',
        reason: `OAA intake (${tier === 1 ? `Tier 1 — ${templateKey}` : 'Tier 2 — manual entry'})`,
        newValue: fileName || undefined,
      });

      nav(`/cases/${rec.id}`);
    } finally {
      setCreating(false);
    }
  };

  // ---------- render ----------

  if (step === 'upload') {
    return (
      <div>
        <div className="page-head">
          <div>
            <h2>New criminal matter — from Order of Attorney Appointment</h2>
            <div className="sub">Upload the OAA; every extracted field comes back for your review before anything is created.</div>
          </div>
        </div>

        <div className="card">
          <h3>Upload the order</h3>
          <p className="muted" style={{ marginTop: 4 }}>
            Clean digital forms (Uvalde / Real County) extract automatically. Scanned packets
            (DeWitt-style) need the local AI hardware — until the P1 arrives they open a manual
            entry form instead, with the packet kept alongside for reference.
          </p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (!reading) onFile(e.dataTransfer.files?.[0]);
            }}
            style={{
              marginTop: 10,
              padding: '28px 16px',
              border: `2px dashed ${dragOver ? 'var(--navy)' : '#c8ccd4'}`,
              borderRadius: 8,
              background: dragOver ? '#eef2f8' : '#fafbfc',
              textAlign: 'center',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            <div style={{ marginBottom: 10 }}>
              {dragOver ? <strong>Drop the order here</strong> : 'Drag & drop the order here (PDF or text file)'}
            </div>
            <div className="muted" style={{ marginBottom: 10 }}>or</div>
            <input
              type="file"
              accept=".pdf,.txt"
              disabled={reading}
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </div>
          {reading && <div className="muted" style={{ marginTop: 8 }}>Reading document…</div>}
          {readError && <div className="notice" style={{ marginTop: 8 }}>{readError}</div>}
        </div>

        <div className="notice">
          Prefer typing it in? <Link to="/cases/new">Use the standard new-case form</Link>.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>Review draft matter</h2>
          <div className="sub">
            {fileName || 'manual entry'} · {tier === 1
              ? <>Tier 1 extraction — <strong>{templateKey}</strong></>
              : 'Tier 2 (scanned/unrecognized) — manual entry; automated packet extraction is gated on the P1 hardware'}
          </div>
        </div>
        <button className="btn small secondary" onClick={() => setStep('upload')}>Start over</button>
      </div>

      {/* Attorney validation (spec §1c) */}
      {hardStop && (
        <div className="notice" style={{ borderColor: 'var(--red, #b23)', background: '#fdeaea' }}>
          <strong>Stop — this order appoints a different attorney: “{(attorney as { extracted: string }).extracted}”.</strong><br />
          This is the substitution/withdrawal scenario: the typed text of an order can name other
          counsel even when the appointment is yours (or vice versa). Verify against the source
          document. This intake will not create a matter{extraction?.attorneyName ? ` (${extraction.attorneyName.provenance})` : ''}.
        </div>
      )}
      {attorney.result === 'missing' && (
        <div className="notice">
          No appointed-attorney name could be read from this document.
          <label className="check" style={{ marginTop: 6 }}>
            <input type="checkbox" checked={attorneyConfirmed} onChange={(e) => setAttorneyConfirmed(e.target.checked)} />
            I confirm this appointment is mine (checked against the source document)
          </label>
        </div>
      )}
      {attorney.result === 'match' && (
        <div className="notice">
          Appointed attorney confirmed: <strong>{attorney.extracted}</strong>
          {extraction?.attorneyName ? <span className="muted"> ({extraction.attorneyName.provenance})</span> : null}
        </div>
      )}

      {/* Duplicate-matter check (spec §1c) */}
      {duplicates.length > 0 && (
        <div className="notice">
          <strong>Possible duplicate matter:</strong> cause number{duplicates.length > 1 ? 's' : ''} already on file —{' '}
          {duplicates.map((d, i) => (
            <span key={d.caseId}>
              {i > 0 && '; '}
              {d.causeNumber} → <Link to={`/cases/${d.caseId}`}>{d.fileNumber}{d.caption ? ` — ${d.caption}` : ''}</Link>
            </span>
          ))}
          . Open the existing matter to update it instead of creating a duplicate.
          <label className="check" style={{ marginTop: 6 }}>
            <input type="checkbox" checked={dupOverride} onChange={(e) => setDupOverride(e.target.checked)} />
            These are different matters — create a new one anyway
          </label>
        </div>
      )}

      {/* Matter fields */}
      <div className="card">
        <h3>Matter</h3>
        <div className="form-grid">
          <label className="fld full">
            <span className="lab">Caption</span>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </label>
          <label className="fld">
            <span className="lab">Case type</span>
            <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
              <option>Felony</option>
              <option>Misdemeanor</option>
            </select>
          </label>
          <label className="fld">
            <span className="lab">Court</span>
            <input type="text" value={court} onChange={(e) => setCourt(e.target.value)} />
          </label>
          <label className="fld">
            <span className="lab">County</span>
            <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} />
          </label>
          <label className="fld">
            <span className="lab">Date opened</span>
            <input type="date" value={dateOpened} onChange={(e) => setDateOpened(e.target.value)} />
          </label>
          <label className="fld">
            <span className="lab">Appointment date</span>
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            {extraction?.appointmentDate && <span className="hint">{extraction.appointmentDate.provenance}</span>}
          </label>
          <label className="fld full">
            <span className="lab">Notes</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
          </label>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <label className="check">
            <input type="checkbox" checked={inCustody} onChange={(e) => setInCustody(e.target.checked)} />
            Defendant in custody
          </label>
          {inCustody && (
            <label className="fld" style={{ minWidth: 260 }}>
              <span className="lab">Custody location</span>
              <input type="text" value={custodyLocation} onChange={(e) => setCustodyLocation(e.target.value)} />
              {extraction?.custodyLocation && <span className="hint">{extraction.custodyLocation.provenance}</span>}
            </label>
          )}
        </div>
        <div className="muted" style={{ marginTop: 8 }}>
          Representation type is set to <strong>Court-appointed</strong> (this intake path exists for appointed work).
        </div>
      </div>

      {/* Charges (multi-cause) */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3>Offense(s)</h3>
          <button className="btn small secondary" onClick={() => setCharges((cs) => [...cs, { ...EMPTY_CHARGE }])}>
            + Add offense
          </button>
        </div>
        <table className="list" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>Offense</th><th>Degree</th><th>Offense date</th><th>Court</th>
              <th>Cause no.</th><th>Complaint no.</th><th>MTR/MTA</th><th>Appeal</th><th></th>
            </tr>
          </thead>
          <tbody>
            {charges.map((c, i) => {
              const set = (patch: Partial<DraftCharge>) =>
                setCharges((cs) => cs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
              return (
                <tr key={i} style={c.confidence === 'low' ? { background: '#fff8e6' } : undefined}>
                  <td><input type="text" value={c.offense} onChange={(e) => set({ offense: e.target.value })} /></td>
                  <td style={{ width: 70 }}><input type="text" value={c.degree} onChange={(e) => set({ degree: e.target.value })} /></td>
                  <td style={{ width: 140 }}><input type="date" value={c.offenseDate} onChange={(e) => set({ offenseDate: e.target.value })} /></td>
                  <td><input type="text" value={c.court} onChange={(e) => set({ court: e.target.value })} /></td>
                  <td><input type="text" value={c.causeNumber} onChange={(e) => set({ causeNumber: e.target.value })} /></td>
                  <td><input type="text" value={c.complaintNumber} onChange={(e) => set({ complaintNumber: e.target.value })} /></td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={c.mtrMta} onChange={(e) => set({ mtrMta: e.target.checked })} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={c.appeal} onChange={(e) => set({ appeal: e.target.checked })} />
                  </td>
                  <td>
                    <button className="btn small danger" onClick={() => setCharges((cs) => cs.filter((_, j) => j !== i))}>×</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {charges.some((c) => c.confidence === 'low') && (
          <div className="muted" style={{ marginTop: 6 }}>
            Highlighted rows didn't line up cleanly with the form's table — check them against the document.
          </div>
        )}
        {charges.some((c) => c.mtrMta) && (
          <div className="muted" style={{ marginTop: 6 }}>
            MTR/MTA checked → this is a revocation-adjudication setting, not a new charge.
          </div>
        )}
      </div>

      {/* Defendant */}
      <div className="card">
        <h3>Defendant (client record)</h3>
        {existingParty && (
          <div className="notice" style={{ marginTop: 6 }}>
            A party named <strong>{existingParty.displayName}</strong> already exists.
            <label className="check" style={{ marginTop: 6 }}>
              <input type="checkbox" checked={linkExisting} onChange={(e) => setLinkExisting(e.target.checked)} />
              Link the existing record instead of creating a new one
            </label>
          </div>
        )}
        {(!existingParty || !linkExisting) && (
          <div className="form-grid" style={{ marginTop: 8 }}>
            <label className="fld">
              <span className="lab">First name</span>
              <input type="text" value={defFirst} onChange={(e) => setDefFirst(e.target.value)} />
            </label>
            <label className="fld">
              <span className="lab">Last name</span>
              <input type="text" value={defLast} onChange={(e) => setDefLast(e.target.value)} />
            </label>
            <label className="fld">
              <span className="lab">Date of birth</span>
              <input type="date" value={defDob} onChange={(e) => setDefDob(e.target.value)} />
              {extraction?.dob && <span className="hint">{extraction.dob.provenance}</span>}
            </label>
            <label className="fld">
              <span className="lab">Phone</span>
              <input type="text" value={defPhone} onChange={(e) => setDefPhone(e.target.value)} />
            </label>
            <label className="fld full">
              <span className="lab">Address</span>
              <input type="text" value={defAddress} onChange={(e) => setDefAddress(e.target.value)} />
            </label>
          </div>
        )}
        {extraction?.localId && (
          <div className="muted" style={{ marginTop: 6 }}>Local ID on the order: {extraction.localId.value} ({extraction.localId.provenance})</div>
        )}
      </div>

      {/* Hearings (spec §2) */}
      <div className="card">
        <h3>Settings & calendar</h3>
        {futureCandidates.length > 0 && (
          <table className="list" style={{ marginTop: 8 }}>
            <thead>
              <tr><th>Calendar</th><th>What</th><th>Date</th><th>Found at</th></tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => {
                if (c.kind === 'administrative') return null;
                return (
                  <tr key={i}>
                    <td style={{ textAlign: 'center' }}>
                      {c.inPast
                        ? <span className="badge">past — not calendared</span>
                        : (
                          <input
                            type="checkbox"
                            checked={Boolean(includeSetting[i])}
                            onChange={(e) => setIncludeSetting((s) => ({ ...s, [i]: e.target.checked }))}
                          />
                        )}
                    </td>
                    <td>
                      {c.label}
                      {c.autoCreate && !c.inPast && <span className="badge flag" style={{ marginLeft: 6 }}>auto-detected</span>}
                    </td>
                    <td>{c.startLocal}</td>
                    <td className="muted">{c.provenance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {candidates.some((c) => c.kind !== 'administrative' && c.inPast) && (
          <div className="notice" style={{ marginTop: 8 }}>
            This paperwork includes a date that has already passed — recorded as case history, not
            calendared. Is a new setting known?
          </div>
        )}
        {candidates.filter((c) => c.kind === 'administrative').map((c, i) => (
          <div className="muted" key={`adm-${i}`} style={{ marginTop: 6 }}>
            {c.label}: {c.startLocal} <span style={{ opacity: 0.7 }}>({c.provenance})</span>
          </div>
        ))}

        <div style={{ marginTop: 12 }}>
          <label className="check">
            <input
              type="checkbox"
              checked={manualHearing.include}
              onChange={(e) => setManualHearing((m) => ({ ...m, include: e.target.checked }))}
            />
            {promptForHearing ? 'Is a hearing already set on this matter? Add it:' : 'Add another known setting:'}
          </label>
          {manualHearing.include && (
            <div className="filters" style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input type="date" value={manualHearing.date} onChange={(e) => setManualHearing((m) => ({ ...m, date: e.target.value }))} />
              <input type="time" value={manualHearing.time} onChange={(e) => setManualHearing((m) => ({ ...m, time: e.target.value }))} />
              <input
                type="text" placeholder="Courtroom / location"
                value={manualHearing.location}
                onChange={(e) => setManualHearing((m) => ({ ...m, location: e.target.value }))}
              />
            </div>
          )}
        </div>
        <div className="muted" style={{ marginTop: 8 }}>
          Everything checked here is created through the standard calendar and rides the Outlook push once connected.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
        <button className="btn" onClick={create} disabled={!canCreate}>
          {creating ? 'Creating…' : 'Create matter'}
        </button>
        <Link className="btn secondary" to="/cases">Cancel</Link>
        {missingBasics && <span className="muted">Caption and defendant last name are required.</span>}
      </div>
    </div>
  );
}
