// Clients (damages scope) — CL-2. Lives on the PARTIES tab because a client is
// also a party on the case; `case_clients` sits parallel to `case_parties`
// (D-CL2-8), so managing them side by side is where it belongs.
//
// Deliberately NOT on the Overview or Medical tab: D-CL2-7 rules that a
// single-client case must look and click exactly as it does today, and nearly
// every file is single-client. Putting client machinery on those tabs would tax
// the overwhelming majority of cases for the occasional multi-plaintiff wreck.

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CaseRecord, CasePartyLink, PartyRecord } from '../domain/types';
import type { CaseClient, ClientBackfillFlag, ClientPosture, SolBasis } from '../domain/client';
import {
  CLIENT_FLAGS, CLIENT_POSTURES, SOL_BASES, isResolved, sortClients,
} from '../domain/client';
import { ATTORNEY_USER } from '../domain/billing';
import { db } from '../data';

export default function ClientsCard({ caseRec, onChanged }: { caseRec: CaseRecord; onChanged?: () => void }) {
  const [clients, setClients] = useState<CaseClient[]>([]);
  const [flag, setFlag] = useState<ClientBackfillFlag | null>(null);
  const [links, setLinks] = useState<CasePartyLink[]>([]);
  const [parties, setParties] = useState<Record<string, PartyRecord>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addPartyId, setAddPartyId] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [cs, f, ls] = await Promise.all([
      db.listClientsForCase(caseRec.id),
      db.getClientFlagForCase(caseRec.id),
      db.listLinksForCase(caseRec.id),
    ]);
    setClients(sortClients(cs));
    setFlag(f);
    setLinks(ls);
    const ps = await db.getParties(ls.map((l) => l.partyId));
    setParties(Object.fromEntries(ps.map((p) => [p.id, p])));
  }, [caseRec.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const name = (partyId: string) => parties[partyId]?.displayName ?? '(party not found)';

  /** Only parties already carrying a client role on this case can become
   *  clients — the roles table stays authoritative for who is a client. */
  const eligible = useMemo(() => {
    const taken = new Set(clients.map((c) => c.partyId));
    return links
      .filter((l) => (l.role === 'Client' || l.role === 'Plaintiff') && !taken.has(l.partyId))
      .filter((l, i, arr) => arr.findIndex((x) => x.partyId === l.partyId) === i);
  }, [links, clients]);

  const addClient = async (opts: { carryFlagDate?: ClientBackfillFlag } = {}) => {
    if (!addPartyId) return;
    setErr(null);
    try {
      const carried = opts.carryFlagDate?.preservedStatuteOfLimitations;
      const created = await db.createClient({
        caseId: caseRec.id,
        partyId: addPartyId,
        posture: caseRec.practiceArea === 'Criminal' ? 'defendant' : 'claimant',
        displayOrder: clients.length,
        // The date preserved on the backfill flag carries onto the client
        // record it was always meant for (Michael's ruling, 2026-07-28).
        statuteOfLimitations: carried,
        solBasis: carried ? 'manual' : undefined,
        clientFlags: [],
        feeArrangement: {},
        profileFields: {},
      });
      if (opts.carryFlagDate) {
        await db.resolveClientFlag(opts.carryFlagDate.id);
        await db.appendReviewLog({
          entityType: 'case_client', entityId: created.id, action: 'created', user: ATTORNEY_USER,
          newValue: carried ?? '(no date)',
          reason:
            'Backfill flag resolved by the attorney. Client record created from the '
            + `case's client-role party${carried ? `; preserved limitations date ${carried} carried onto it` : ''}.`,
        });
      }
      setAdding(false);
      setAddPartyId('');
      await refresh();
      onChanged?.();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  };

  const remove = async (c: CaseClient) => {
    setErr(null);
    // D-CL2-1: every case has a client. Removing the LAST one is a real action
    // (the wrong party may have been linked), but it must be deliberate and it
    // must not leave a silent hole — without the flag the case would simply
    // have no client and nothing would say so. Michael raised this at the
    // walkthrough: one unguarded click could do it by accident.
    const sole = clients.length === 1 && clients[0].id === c.id;
    if (sole) {
      const ok = window.confirm(
        `Remove ${name(c.partyId)} as the client on this case?\n\n`
        + 'This is the only client on the file. The case will be FLAGGED as having no '
        + 'client record until you add one.'
        + (c.statuteOfLimitations
          ? `\n\nTheir limitations date (${c.statuteOfLimitations}) will be held on that flag `
            + 'and carried onto the next client record you create.'
          : ''),
      );
      if (!ok) return;
    }
    try {
      await db.deleteClient(c.id);
      if (sole) {
        await db.createClientFlagIfAbsent({
          caseId: caseRec.id,
          reason:
            'The only client record on this case was removed by the attorney, so the case has '
            + 'no damages scope. Link a client-role party and add them as a client; any '
            + 'preserved limitations date carries onto that record.',
          preservedStatuteOfLimitations: c.statuteOfLimitations,
        });
        await db.appendReviewLog({
          entityType: 'case', entityId: caseRec.id, action: 'edited', user: ATTORNEY_USER,
          oldValue: c.statuteOfLimitations ?? '(no date)',
          reason:
            `Sole client (${name(c.partyId)}) removed by the attorney; case flagged as having no `
            + 'client record. Limitations date preserved on the flag.',
        });
      }
      await refresh();
      onChanged?.();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  };

  const saveEdit = async (id: string, patch: Partial<CaseClient>) => {
    await db.updateClient(id, patch);
    setEditingId(null);
    await refresh();
    onChanged?.();
  };

  const toggleDisbursed = async (c: CaseClient) => {
    // D-CL2-4a: shares lock at disbursement. D-CL2-2a: a disbursed client stops
    // counting toward the case's derived earliest limitations date.
    const next = isResolved(c) ? undefined : new Date().toISOString().slice(0, 10);
    await db.updateClient(c.id, { disbursedAt: next });
    await db.appendReviewLog({
      entityType: 'case_client', entityId: c.id, action: 'edited', user: ATTORNEY_USER,
      oldValue: c.disbursedAt ?? '(not disbursed)', newValue: next ?? '(not disbursed)',
      reason: next
        ? 'Marked DISBURSED. Shares lock as of this date; this client no longer counts toward the case\'s earliest limitations date.'
        : 'Disbursement mark removed.',
    });
    await refresh();
    onChanged?.();
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3>Clients — damages scope</h3>
          <div className="muted" style={{ fontSize: '0.85em' }}>
            The case owns the occurrence and liability; the client owns the damages. Roles stay on
            the linked-parties list above — this is who the bills, limitations, and fees belong to.
          </div>
        </div>
        {eligible.length > 0 && !flag && (
          <button className="btn small secondary" onClick={() => setAdding((a) => !a)}>
            {adding ? 'Cancel' : '+ Add client'}
          </button>
        )}
      </div>

      {err && <div className="notice" style={{ marginTop: 10 }}><strong>Couldn't do that.</strong> {err}</div>}

      {flag && (
        <div className="notice" style={{ marginTop: 10 }}>
          <strong>FLAGGED — this case has no client record.</strong>
          <div style={{ marginTop: 4 }}>{flag.reason}</div>
          {flag.preservedStatuteOfLimitations && (
            <div style={{ marginTop: 6 }}>
              <strong>Preserved statute of limitations: {flag.preservedStatuteOfLimitations}</strong> — held
              here since the case-level field was retired. It carries onto the client record when you
              create one below.
            </div>
          )}
          {eligible.length === 0 ? (
            <div style={{ marginTop: 6 }}>
              No party on this case carries a <strong>Client</strong> or <strong>Plaintiff</strong> role
              yet. Link one in the list above first — nothing here will guess who the client is.
            </div>
          ) : (
            <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <select value={addPartyId} onChange={(e) => setAddPartyId(e.target.value)}>
                <option value="">Pick the client…</option>
                {eligible.map((l) => (
                  <option key={l.partyId} value={l.partyId}>{name(l.partyId)} ({l.role})</option>
                ))}
              </select>
              <button className="btn small" disabled={!addPartyId} onClick={() => addClient({ carryFlagDate: flag })}>
                Create client record
              </button>
            </div>
          )}
        </div>
      )}

      {adding && !flag && (
        <div className="filters" style={{ marginTop: 8, padding: 10, background: '#f7f8fa', borderRadius: 6, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={addPartyId} onChange={(e) => setAddPartyId(e.target.value)}>
            <option value="">Pick a client-role party…</option>
            {eligible.map((l) => (
              <option key={l.partyId} value={l.partyId}>{name(l.partyId)} ({l.role})</option>
            ))}
          </select>
          <button className="btn small" disabled={!addPartyId} onClick={() => addClient()}>Add client</button>
        </div>
      )}

      {clients.length === 0 && !flag && (
        <div className="muted" style={{ marginTop: 10 }}>
          No client record on this case yet. Link a party with the Client or Plaintiff role above, then add them here.
        </div>
      )}

      {clients.length > 0 && (
        <table className="list" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>Client</th><th>Posture</th><th>Statute of limitations</th>
              <th>Flags</th><th>Fee arrangement</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              editingId === c.id
                ? <ClientEditRow key={c.id} client={c} name={name(c.partyId)} onSave={saveEdit} onCancel={() => setEditingId(null)} />
                : (
                  <tr key={c.id}>
                    <td><strong>{name(c.partyId)}</strong></td>
                    <td>{c.posture}</td>
                    <td>
                      {c.statuteOfLimitations || <span className="muted">—</span>}
                      {c.solBasis && <div className="muted" style={{ fontSize: '0.85em' }}>{c.solBasis}</div>}
                    </td>
                    <td>
                      {c.clientFlags.length === 0
                        ? <span className="muted">—</span>
                        : c.clientFlags.map((f) => <span className="badge flag" key={f}>{f}</span>)}
                    </td>
                    <td>
                      {c.feeArrangement.type
                        ? <>{c.feeArrangement.type}{c.feeArrangement.contingencyPercent ? ` — ${c.feeArrangement.contingencyPercent}%` : ''}</>
                        : <span className="muted">—</span>}
                    </td>
                    <td>
                      {isResolved(c)
                        ? <span className="badge status">Disbursed {c.disbursedAt}</span>
                        : <span className="muted">Open</span>}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button className="btn small secondary" onClick={() => setEditingId(c.id)}>Edit</button>{' '}
                      {/* KNOWN CONSEQUENCE, ruled 2026-07-28: disbursement is PI
                          furniture and it shows on criminal files too. NOT fixed
                          on purpose — hiding it by practice area would be profile
                          machinery, which the CL-2 carve-out excludes until CIV-1
                          and PROB-1 are written. Do not "fix" this. */}
                      <button className="btn small secondary" onClick={() => toggleDisbursed(c)}>
                        {isResolved(c) ? 'Undo disbursed' : 'Mark disbursed'}
                      </button>{' '}
                      <button className="btn small secondary" onClick={() => remove(c)}>Remove</button>
                    </td>
                  </tr>
                )
            ))}
          </tbody>
        </table>
      )}

      {clients.length > 1 && (
        <div className="muted" style={{ marginTop: 8, fontSize: '0.85em' }}>
          This case has more than one client, so the Medical tab now shows a client selector and each
          client's bill ledger totals separately. The Overview's statute of limitations shows the
          earliest across clients who have not yet disbursed.
        </div>
      )}
    </div>
  );
}

function ClientEditRow({
  client, name, onSave, onCancel,
}: {
  client: CaseClient;
  name: string;
  onSave: (id: string, patch: Partial<CaseClient>) => void;
  onCancel: () => void;
}) {
  const [d, setD] = useState<CaseClient>(client);
  return (
    <tr>
      <td><strong>{name}</strong></td>
      <td>
        <select value={d.posture} onChange={(e) => setD({ ...d, posture: e.target.value as ClientPosture })}>
          {CLIENT_POSTURES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </td>
      <td>
        <input
          type="date"
          value={d.statuteOfLimitations ?? ''}
          onChange={(e) => setD({ ...d, statuteOfLimitations: e.target.value || undefined })}
        />
        {/* Descriptive only — NO tolling is computed or inferred anywhere (§3.2.1). */}
        <select
          value={d.solBasis ?? ''}
          onChange={(e) => setD({ ...d, solBasis: (e.target.value || undefined) as SolBasis | undefined })}
        >
          <option value="">basis…</option>
          {SOL_BASES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </td>
      <td>
        {CLIENT_FLAGS.map((f) => (
          <label key={f} className="chk" style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={d.clientFlags.includes(f)}
              onChange={() => setD({
                ...d,
                clientFlags: d.clientFlags.includes(f)
                  ? d.clientFlags.filter((x) => x !== f)
                  : [...d.clientFlags, f],
              })}
            />
            {f}
          </label>
        ))}
      </td>
      <td>
        <select
          value={d.feeArrangement.type ?? ''}
          onChange={(e) => setD({
            ...d,
            feeArrangement: { ...d.feeArrangement, type: (e.target.value || undefined) as never },
          })}
        >
          <option value="">—</option>
          <option value="contingency">contingency</option>
          <option value="hourly">hourly</option>
          <option value="flat">flat</option>
          <option value="other">other</option>
        </select>
        {d.feeArrangement.type === 'contingency' && (
          <input
            type="number" step="0.01" placeholder="%" style={{ width: 70 }}
            value={d.feeArrangement.contingencyPercent ?? ''}
            onChange={(e) => setD({
              ...d,
              feeArrangement: {
                ...d.feeArrangement,
                contingencyPercent: e.target.value === '' ? undefined : Number(e.target.value),
              },
            })}
          />
        )}
      </td>
      <td className="muted">{isResolved(d) ? `Disbursed ${d.disbursedAt}` : 'Open'}</td>
      <td style={{ whiteSpace: 'nowrap' }}>
        <button
          className="btn small"
          onClick={() => onSave(client.id, {
            posture: d.posture,
            statuteOfLimitations: d.statuteOfLimitations,
            solBasis: d.solBasis,
            clientFlags: d.clientFlags,
            feeArrangement: d.feeArrangement,
          })}
        >Save</button>{' '}
        <button className="btn small secondary" onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
}
