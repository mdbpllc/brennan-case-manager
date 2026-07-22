// Registry-driven field rendering: one input widget + one display widget per FieldDef.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { FieldDef } from '../domain/partyRegistry';
import type { PartyRecord } from '../domain/types';
import { db } from '../data';

/* ================= INPUT ================= */

export function FieldInput({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (def.type === 'repeating') return <RepeatingInput def={def} value={value} onChange={onChange} />;
  if (def.type === 'partyLink') return <PartyLinkInput def={def} value={value} onChange={onChange} />;

  if (def.type === 'checkbox') {
    return (
      <label className="check">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <span>
          {def.label}
          {def.hint && <span className="hint"> — {def.hint}</span>}
        </span>
      </label>
    );
  }

  return (
    <label className="fld">
      <span className="lab">{def.label}</span>
      {def.type === 'textarea' ? (
        <textarea value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} />
      ) : def.type === 'select' ? (
        <select value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {def.options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={def.type === 'date' ? 'date' : 'text'}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {def.hint && <span className="hint">{def.hint}</span>}
    </label>
  );
}

function RepeatingInput({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const rows: Record<string, unknown>[] = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
  const setRow = (i: number, key: string, v: unknown) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [key]: v } : r));
    onChange(next);
  };
  return (
    <div className="fld full">
      <span className="lab">{def.label}</span>
      {def.hint && <span className="hint" style={{ marginBottom: 6 }}>{def.hint}</span>}
      <div className="rep">
        {rows.length === 0 && <div className="muted small" style={{ marginBottom: 8 }}>No entries yet.</div>}
        {rows.map((row, i) => (
          <div className="rep-row" key={i}>
            {def.subFields?.map((sf) => (
              <FieldInput key={sf.key} def={sf} value={row[sf.key]} onChange={(v) => setRow(i, sf.key, v)} />
            ))}
            <button type="button" className="btn small danger" onClick={() => onChange(rows.filter((_, idx) => idx !== i))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn small secondary" onClick={() => onChange([...rows, {}])}>
          + Add {def.itemLabel ?? def.label.toLowerCase().replace(/s$/, '')}
        </button>
      </div>
    </div>
  );
}

function PartyLinkInput({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const [options, setOptions] = useState<PartyRecord[]>([]);
  useEffect(() => {
    db.listParties().then((all) => setOptions(all.filter((p) => def.linkTypes?.includes(p.partyType))));
  }, [def.linkTypes]);
  return (
    <label className="fld">
      <span className="lab">{def.label}</span>
      <select value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {options.map((p) => (
          <option key={p.id} value={p.id}>{p.displayName}</option>
        ))}
      </select>
      {def.hint && <span className="hint">{def.hint}</span>}
      {options.length === 0 && <span className="hint">No {def.linkTypes?.join('/')} records yet — create one first.</span>}
    </label>
  );
}

/* ================= DISPLAY ================= */

export function FieldDisplay({ def, value }: { def: FieldDef; value: unknown }) {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
    return <span className="empty">—</span>;
  }
  if (def.type === 'checkbox') return <span>{value ? 'Yes' : 'No'}</span>;
  if (def.type === 'partyLink') return <PartyLinkDisplay id={value as string} />;
  if (def.type === 'repeating') {
    const rows = value as Record<string, unknown>[];
    return (
      <div>
        {rows.map((row, i) => (
          <div key={i} className="small" style={{ marginBottom: 3 }}>
            {def.subFields
              ?.map((sf) => {
                const v = row[sf.key];
                return v !== undefined && v !== '' ? `${sf.label}: ${String(v)}` : null;
              })
              .filter(Boolean)
              .join(' · ') || '(empty entry)'}
          </div>
        ))}
      </div>
    );
  }
  if (def.sensitive) return <span>•••–••–{String(value).slice(-4)}</span>;
  return <span style={{ whiteSpace: 'pre-wrap' }}>{String(value)}</span>;
}

function PartyLinkDisplay({ id }: { id: string }) {
  const [party, setParty] = useState<PartyRecord | null>(null);
  useEffect(() => {
    db.getParty(id).then(setParty);
  }, [id]);
  if (!party) return <span className="empty">—</span>;
  return <Link to={`/parties/${party.id}`}>{party.displayName}</Link>;
}
