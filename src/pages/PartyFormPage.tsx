import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { CaseRole, Side } from '../domain/types';
import { CASE_ROLES, SIDES } from '../domain/types';
import { PARTY_TYPES, PARTY_TYPE_MAP, computeDisplayName } from '../domain/partyRegistry';
import { FieldInput } from '../components/fieldWidgets';
import { db } from '../data';

/** Create or edit a party. When ?caseId= is present on create, the new party is
 *  immediately linked to that case with the chosen role. */
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

  useEffect(() => {
    if (mode === 'edit' && id) {
      db.getParty(id).then((p) => {
        if (p) {
          setTypeKey(p.partyType);
          setFields(p.fields);
        } else {
          setNotFound(true);
        }
        setLoaded(true);
      }).catch(() => setNotFound(true));
    }
  }, [mode, id]);

  const def = PARTY_TYPE_MAP[typeKey];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const displayName = computeDisplayName(typeKey, fields);
    if (mode === 'edit' && id) {
      await db.updateParty(id, { fields, displayName });
      nav(`/parties/${id}`);
      return;
    }
    const rec = await db.createParty({ partyType: typeKey, kind: def.kind, displayName, fields });
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
            {def.fields.map((f) => (
              <div key={f.key} className={f.type === 'repeating' || f.type === 'textarea' ? 'full' : ''}>
                <FieldInput def={f} value={fields[f.key]} onChange={(v) => setFields({ ...fields, [f.key]: v })} />
              </div>
            ))}
          </div>
        </div>

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving…' : mode === 'new' ? 'Create party' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
