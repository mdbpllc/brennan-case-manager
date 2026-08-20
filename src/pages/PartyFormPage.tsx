import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { CaseRole, Side } from '../domain/types';
import { CASE_ROLES, SIDES } from '../domain/types';
import { PARTY_TYPES, PARTY_TYPE_MAP, computeDisplayName } from '../domain/partyRegistry';
import {
  splitPartyFields, mergePartyFields, applyPii, isEmptyPii, piiFieldKeys,
} from '../domain/partyPii';
import { FieldInput } from '../components/fieldWidgets';
import { db } from '../data';

/** Create or edit a party. When ?caseId= is present on create, the new party is
 *  immediately linked to that case with the chosen role.
 *
 *  GATE 10 §§2-4. The form still renders ONE flat field set — that is the
 *  registry's contract and the slice keeps it — but the values now land in three
 *  places: the `fields` blob, the typed `date_of_birth` column, and the
 *  `party_pii` child row. `domain/partyPii.ts` owns the routing; this page just
 *  asks it where things go.
 *
 *  The stored SSN and licence values are NOT loaded on mount. They are fetched
 *  only when Michael asks for them, behind the §4 reveal, so opening an edit
 *  form does not pull PII across the wire on the chance he might look at it. */
export default function PartyFormPage({ mode }: { mode: 'new' | 'edit' }) {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const caseId = search.get('caseId');

  const [typeKey, setTypeKey] = useState('client');
  const [fields, setFields] = useState<Record<string, unknown>>({});
  const [role, setRole] = useState<CaseRole>('Client');
  const [side, setSide] = useState<Side | ''>('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(mode === 'new');
  const [notFound, setNotFound] = useState(false);
  /** §4 — the stored PII is behind an explicit step even on the edit form. */
  const [revealed, setRevealed] = useState(mode === 'new');
  const [revealing, setRevealing] = useState(false);
  /** True once a reveal has run, so a subsequent save knows the PII inputs on
   *  screen reflect what is stored rather than an empty form. */
  const [piiLoaded, setPiiLoaded] = useState(mode === 'new');

  const piiKeys = piiFieldKeys();

  useEffect(() => {
    if (mode === 'edit' && id) {
      db.getParty(id).then((p) => {
        if (p) {
          setTypeKey(p.partyType);
          // The typed DOB is merged back into the flat field set the form
          // renders; the PII values deliberately are NOT (no third argument).
          setFields(mergePartyFields(p.fields, p.dateOfBirth));
        } else {
          setNotFound(true);
        }
        setLoaded(true);
      }).catch(() => setNotFound(true));
    }
  }, [mode, id]);

  const def = PARTY_TYPE_MAP[typeKey];

  const reveal = async () => {
    if (!id) return;
    setRevealing(true);
    try {
      const pii = await db.getPartyPii(id);
      // OVERLAY onto live form state — never mergePartyFields here. That call
      // rebuilds from a stored record and strips the destination keys first, so
      // re-running it over form state cleared the date of birth on screen and the
      // next save persisted the clearing. Found on a running page, not in a test.
      setFields((f) => applyPii(f, pii));
      setRevealed(true);
      setPiiLoaded(true);
    } finally {
      setRevealing(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const displayName = computeDisplayName(typeKey, fields);
    const split = splitPartyFields(fields);
    if (mode === 'edit' && id) {
      await db.updateParty(id, {
        fields: split.fields, displayName, dateOfBirth: split.dateOfBirth ?? null,
      });
      // A save that never revealed says NOTHING about the stored PII — writing
      // the empty inputs would wipe an SSN the editor never saw. This is the
      // difference between "set it to empty" and "say nothing about it", and
      // collapsing the two is how an edit to a phone number deletes an SSN.
      if (piiLoaded) await db.savePartyPii(id, split.pii ?? {});
      nav(`/parties/${id}`);
      return;
    }
    const rec = await db.createParty({
      partyType: typeKey, kind: def.kind, displayName,
      fields: split.fields, dateOfBirth: split.dateOfBirth ?? null,
    });
    if (!isEmptyPii(split.pii)) await db.savePartyPii(rec.id, split.pii ?? {});
    if (caseId) {
      await db.createLink({ caseId, partyId: rec.id, role, side: side || undefined });
      nav(`/cases/${caseId}/parties`);
    } else {
      nav(`/parties/${rec.id}`);
    }
  };

  if (notFound) {
    return <div className="notice">Party not found or unavailable — nothing to edit. <Link to="/parties">Back to parties</Link></div>;
  }
  if (!loaded) return <div className="muted">Loading…</div>;

  const piiFields = def.fields.filter((f) => piiKeys.includes(f.key));
  const plainFields = def.fields.filter((f) => !piiKeys.includes(f.key));

  return (
    <div>
      <div className="page-head">
        <div>
          <h2>{mode === 'new' ? 'New party' : 'Edit party'}</h2>
          <div className="sub">
            Entered once, linked to as many cases as needed.
            {caseId && ' Will be linked to the case you came from.'}
          </div>
        </div>
      </div>

      <form onSubmit={submit}>
        <div className="card">
          <div className="form-grid">
            <label className="fld">
              <span className="lab">Party type</span>
              <select
                value={typeKey}
                disabled={mode === 'edit'}
                onChange={(e) => { setTypeKey(e.target.value); setFields({}); }}
              >
                {PARTY_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
              {mode === 'edit' && <span className="hint">Type can’t change after creation</span>}
            </label>
            {caseId && mode === 'new' && (
              <>
                <label className="fld">
                  <span className="lab">Role on this case</span>
                  <select value={role} onChange={(e) => setRole(e.target.value as CaseRole)}>
                    {CASE_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </label>
                <label className="fld">
                  <span className="lab">Side</span>
                  <select value={side} onChange={(e) => setSide(e.target.value as Side | '')}>
                    <option value="">—</option>
                    {SIDES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
              </>
            )}
          </div>
        </div>

        <div className="card">
          <h3>{def.label} details</h3>
          <div className="form-grid">
            {plainFields.map((f) => (
              <div key={f.key} className={f.type === 'repeating' || f.type === 'textarea' ? 'full' : ''}>
                <FieldInput def={f} value={fields[f.key]} onChange={(v) => setFields({ ...fields, [f.key]: v })} />
              </div>
            ))}
          </div>
        </div>

        {piiFields.length > 0 && (
          <div className="card">
            <h3>Identifying numbers</h3>
            <div className="sub">
              Stored separately from the rest of the contact record and never loaded
              with a list. Kept out of the way unless you ask for them.
            </div>
            {!revealed ? (
              <button className="btn secondary" type="button" onClick={reveal} disabled={revealing}>
                {revealing ? 'Loading…' : 'Show identifying numbers'}
              </button>
            ) : (
              <div className="form-grid">
                {piiFields.map((f) => (
                  <div key={f.key}>
                    <FieldInput def={f} value={fields[f.key]} onChange={(v) => setFields({ ...fields, [f.key]: v })} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving…' : mode === 'new' ? 'Create party' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
