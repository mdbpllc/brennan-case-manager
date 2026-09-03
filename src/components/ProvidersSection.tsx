/**
 * `R17` — the PROVIDERS section of the Medical tab (slice §9.1, D-29).
 *
 * Michael's ruling (`AS-Q3`): the record is CASE-SCOPED. The facility is an
 * existing directory contact; its TYPE is set for THIS case and pre-filled from
 * the last case where he set it; the individuals are rows beneath it that do
 * not exist in the firm-wide directory at all until he PROMOTES one.
 *
 * WHAT THIS SURFACE MAY NOT DO, each because a ruling says so:
 *  - It never lets the app derive a TYPE. Not from a specialty string, not from
 *    a role tag, not from the vocabulary. D-32's last-case query is the only
 *    pre-fill, and it WRITES the value with a note saying where it came from.
 *  - It never hard-deletes an individual (D-55). His delete has to survive the
 *    next chronology drop.
 *  - It never creates a directory contact or an affiliation edge except at his
 *    explicit promote click (D-56) — and the dates on that edge are whatever he
 *    confirms, never what the app inferred.
 *
 * The section sits ABOVE the unchanged bill ledger, which is a DEFAULT (D-29):
 * §17.1 rules the record, and the tab's layout is nowhere ruled, so it is
 * carried to the hands-on sitting.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { db } from '../data';
import type { CaseRecord, PartyRecord } from '../domain/types';
import type { CaseClient } from '../domain/client';
import type { MedicalBill } from '../domain/billing';
import {
  activeIndividuals, carriedType, providerSortKey, providerTreatmentWindow,
  sortIndividuals, sortProvidersOldestFirst,
  type CaseProvider, type CaseProviderIndividual, type CaseProviderVisit,
} from '../domain/caseProviders';
import {
  FACILITY_TYPE_KEYS, ROLE_MARKER_KEYS, markerIsDisplayOnly, providerTypeLabel,
  type ProviderTypeKey,
} from '../forms/providerTypes';

interface Props {
  caseRec: CaseRecord;
  clients: CaseClient[];
  selectedClientId: string | null;
  multiClient: boolean;
  bills: MedicalBill[];
  onChanged?: () => void;
}

export default function ProvidersSection({
  caseRec, clients, selectedClientId, multiClient, bills, onChanged,
}: Props) {
  const [rows, setRows] = useState<CaseProvider[]>([]);
  const [individuals, setIndividuals] = useState<CaseProviderIndividual[]>([]);
  const [visits, setVisits] = useState<CaseProviderVisit[]>([]);
  const [facilities, setFacilities] = useState<PartyRecord[]>([]);
  const [allProviders, setAllProviders] = useState<CaseProvider[]>([]);
  const [showRemoved, setShowRemoved] = useState(false);
  const [adding, setAdding] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const [rs, inds, vs, parties, all] = await Promise.all([
      db.listCaseProviders(caseRec.id),
      db.listProviderIndividuals(caseRec.id),
      db.listProviderVisits(caseRec.id),
      db.listParties(),
      db.listAllCaseProviders(),
    ]);
    setRows(rs);
    setIndividuals(inds);
    setVisits(vs);
    setFacilities(parties.filter((p) => p.kind === 'organization'));
    setAllProviders(all);
  }, [caseRec.id]);

  useEffect(() => { refresh(); }, [refresh]);

  const facilityName = useCallback(
    (id: string) => facilities.find((f) => f.id === id)?.displayName ?? '(contact not found)',
    [facilities],
  );

  /** D-54: on a one-client case a NULL client_id MEANS that client, so a row
   *  with no client is shown rather than hidden behind a selector that is not
   *  even rendered. On a multi-client case an unassigned row shows under every
   *  client with its own line. */
  const visible = useMemo(() => {
    const scoped = selectedClientId
      ? rows.filter((r) => r.clientId === selectedClientId || r.clientId == null)
      : rows;
    return sortProvidersOldestFirst(
      scoped,
      (r) => providerSortKey(r, sortInputs(r, individuals, visits, bills)),
      (r) => facilityName(r.facilityPartyId),
    );
  }, [rows, selectedClientId, individuals, visits, bills, facilityName]);

  const addFacility = async (facilityPartyId: string) => {
    setBusy(true);
    try {
      // D-32 — the ONLY pre-fill. It WRITES the type and records the case it
      // came from, so the row can say "carried from … — change if wrong".
      const carried = carriedType(facilityPartyId, allProviders, caseRec.id);
      await db.createCaseProvider({
        caseId: caseRec.id,
        clientId: selectedClientId ?? (clients.length === 1 ? clients[0].id : undefined),
        facilityPartyId,
        providerType: carried?.providerType,
        typeCarriedFromCaseId: carried?.fromCaseId,
        lop: false,
        // NOTE: no extraction is fired by adding a facility (D-44). The drop and
        // his "Pull individuals" click are the only two triggers there are.
      });
      setAdding(false);
      await refresh();
      onChanged?.();
    } finally { setBusy(false); }
  };

  const patchProvider = async (id: string, patch: Partial<CaseProvider>) => {
    setBusy(true);
    try {
      await db.updateCaseProvider(id, patch);
      await refresh();
      onChanged?.();
    } finally { setBusy(false); }
  };

  const untyped = visible.filter((r) => !r.providerType).length;
  const candidates = facilities.filter(
    (f) => !rows.some((r) => r.facilityPartyId === f.id
      && (r.clientId ?? null) === (selectedClientId ?? r.clientId ?? null)),
  );

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>Providers</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <label className="small muted" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={showRemoved}
              onChange={(e) => setShowRemoved(e.target.checked)}
            />
            Show removed
          </label>
          <button className="btn small" onClick={() => setAdding((v) => !v)} disabled={busy}>
            {adding ? 'Cancel' : 'Add facility'}
          </button>
        </div>
      </div>

      <p className="small muted">
        The facility is the contact; the people are rows beneath it. A designation names a{' '}
        <strong>person</strong> — or the custodian of records — never a building. Type is set{' '}
        <strong>per case</strong> and is never guessed from a specialty or a role tag.
      </p>

      {untyped > 0 && (
        <p className="notice">
          <strong>{untyped} facility(ies) have no type.</strong> A type is what chooses the two
          fixed sentences the app places, so a designation cannot be generated without one. This
          is one of the three things that stop a generate outright.
        </p>
      )}

      {adding && (
        <div className="fld" style={{ marginTop: 8 }}>
          <span className="lab">Facility (an organization contact)</span>
          <select
            defaultValue=""
            disabled={busy}
            onChange={(e) => { if (e.target.value) addFacility(e.target.value); }}
          >
            <option value="" disabled>Choose a facility…</option>
            {candidates.map((f) => (
              <option key={f.id} value={f.id}>{f.displayName}</option>
            ))}
          </select>
          <span className="small muted">
            Only organization contacts appear here. If the facility is not in the directory yet,
            create the contact first — this record points at it rather than duplicating it.
          </span>
        </div>
      )}

      {visible.length === 0 && (
        <p className="muted" style={{ marginTop: 10 }}>
          No facilities on this matter yet. Add the ones you intend to designate; the people who
          treated at them come from the chronology.
        </p>
      )}

      {visible.map((row) => {
        const mine = individuals.filter((i) => i.caseProviderId === row.id);
        const shown = showRemoved ? mine : activeIndividuals(mine);
        const window = providerTreatmentWindow(row, sortInputs(row, individuals, visits, bills));
        return (
          <div key={row.id} className="card" style={{ marginTop: 10, background: '#fafbfc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <div>
                <strong>{facilityName(row.facilityPartyId)}</strong>
                {multiClient && (
                  <span className="muted small">
                    {' '}— {row.clientId
                      ? (clients.find((c) => c.id === row.clientId)?.id ?? row.clientId)
                      : 'not assigned to a client'}
                  </span>
                )}
                <div className="small muted">
                  {window.from
                    ? `${window.from}${window.to ? ` – ${window.to}` : ''}`
                    : 'no date'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <input
                    type="checkbox"
                    checked={row.lop}
                    disabled={busy}
                    onChange={(e) => patchProvider(row.id, { lop: e.target.checked })}
                  />
                  LOP
                </label>
                <select
                  value={row.providerType ?? ''}
                  disabled={busy}
                  onChange={(e) => patchProvider(row.id, {
                    providerType: (e.target.value || undefined) as ProviderTypeKey | undefined,
                    // Once he sets it himself it is no longer carried.
                    typeCarriedFromCaseId: undefined,
                  })}
                >
                  <option value="">— set a type —</option>
                  {FACILITY_TYPE_KEYS.map((k) => (
                    <option key={k} value={k}>{providerTypeLabel(k)}</option>
                  ))}
                </select>
                <button
                  className="btn small secondary"
                  disabled={busy}
                  onClick={() => db.deleteCaseProvider(row.id).then(refresh).then(onChanged)}
                >Remove</button>
              </div>
            </div>

            {row.typeCarriedFromCaseId && row.providerType && (
              <p className="small muted" style={{ marginTop: 4 }}>
                Type carried from the last case where you set it — change it if it is wrong here.
              </p>
            )}

            {shown.length === 0 ? (
              <p className="small muted" style={{ marginTop: 8 }}>
                No individuals yet. They arrive from the chronology; you can also add one by hand.
              </p>
            ) : (
              <table className="tbl" style={{ marginTop: 8 }}>
                <thead>
                  <tr>
                    <th>Name</th><th>Credential</th><th>Role</th><th>Dates</th><th>Source</th><th />
                  </tr>
                </thead>
                <tbody>
                  {sortIndividuals(shown).map((ind) => (
                    <IndividualRow
                      key={ind.id}
                      ind={ind}
                      facilityType={row.providerType}
                      facilityPartyId={row.facilityPartyId}
                      visits={visits.filter((v) => v.individualId === ind.id)}
                      busy={busy}
                      onChanged={async () => { await refresh(); onChanged?.(); }}
                    />
                  ))}
                </tbody>
              </table>
            )}

            <AddIndividual
              caseProviderId={row.id}
              onAdded={async () => { await refresh(); onChanged?.(); }}
            />
          </div>
        );
      })}
    </div>
  );
}

function sortInputs(
  row: CaseProvider,
  individuals: CaseProviderIndividual[],
  visits: CaseProviderVisit[],
  bills: MedicalBill[],
) {
  const mine = individuals.filter((i) => i.caseProviderId === row.id);
  const ids = new Set(mine.map((i) => i.id));
  return {
    individuals: mine,
    visitDates: visits.filter((v) => ids.has(v.individualId)).map((v) => v.visitDate),
    billServiceStarts: bills
      .filter((b) => b.facilityPartyId === row.facilityPartyId)
      .map((b) => b.serviceStart),
  };
}

/** One person. Editing any field NAMES it (D-51) so a later extraction leaves
 *  it alone — which is what makes "hand-set fields never change" true rather
 *  than merely intended. */
function IndividualRow({
  ind, facilityType, facilityPartyId, visits, busy, onChanged,
}: {
  ind: CaseProviderIndividual;
  facilityType?: ProviderTypeKey;
  facilityPartyId: string;
  visits: CaseProviderVisit[];
  busy: boolean;
  onChanged: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const removed = Boolean(ind.removedByHandAt);

  const patch = async (p: Partial<CaseProviderIndividual>, field: string) => {
    const named = new Set(ind.handEditedFields);
    named.add(field);
    await db.updateProviderIndividual(ind.id, { ...p, handEditedFields: [...named] });
    await onChanged();
  };

  const effective = ind.roleMarker ?? facilityType;

  return (
    <>
      <tr style={removed ? { opacity: 0.5 } : undefined}>
        <td>
          <input
            className="inline"
            defaultValue={ind.displayName}
            disabled={busy || removed}
            onBlur={(e) => {
              if (e.target.value !== ind.displayName) patch({ displayName: e.target.value }, 'displayName');
            }}
          />
          {ind.missingFromLatest && (
            <div className="small muted">not in the latest chronology</div>
          )}
        </td>
        <td>
          <input
            className="inline"
            style={{ width: 90 }}
            defaultValue={ind.credentialSuffix ?? ''}
            disabled={busy || removed}
            onBlur={(e) => {
              if (e.target.value !== (ind.credentialSuffix ?? '')) {
                patch({ credentialSuffix: e.target.value || undefined }, 'credentialSuffix');
              }
            }}
          />
        </td>
        <td>
          <select
            value={ind.roleMarker ?? ''}
            disabled={busy || removed}
            onChange={(e) => patch(
              { roleMarker: (e.target.value || undefined) as ProviderTypeKey | undefined },
              'roleMarker',
            )}
          >
            <option value="">
              {facilityType ? `— same as facility (${providerTypeLabel(facilityType)}) —` : '— same as facility —'}
            </option>
            {ROLE_MARKER_KEYS.map((k) => (
              <option key={k} value={k}>
                {providerTypeLabel(k)}{markerIsDisplayOnly(k) ? ' (display only)' : ''}
              </option>
            ))}
          </select>
        </td>
        <td className="small">
          {ind.treatmentFrom ?? '—'}{ind.treatmentTo ? ` – ${ind.treatmentTo}` : ''}
        </td>
        <td className="small muted">
          {ind.provenance === 'model' ? 'extracted' : 'hand'}
          {ind.partyId ? ' · in directory' : ''}
        </td>
        <td style={{ whiteSpace: 'nowrap' }}>
          <button className="btn small secondary" onClick={() => setOpen((v) => !v)}>
            {open ? 'Hide' : 'Details'}
          </button>{' '}
          {!removed && !ind.partyId && (
            <>
              <button
                className="btn small secondary"
                disabled={busy}
                onClick={() => setPromoting((v) => !v)}
              >Promote</button>{' '}
            </>
          )}
          {removed ? (
            <button
              className="btn small secondary"
              disabled={busy}
              onClick={() => db.restoreProviderIndividual(ind.id).then(onChanged)}
            >Restore</button>
          ) : (
            <button
              className="btn small secondary"
              disabled={busy}
              onClick={() => db.softDeleteProviderIndividual(ind.id).then(onChanged)}
            >Remove</button>
          )}
        </td>
      </tr>
      {promoting && (
        <PromoteDialog
          ind={ind}
          facilityPartyId={facilityPartyId}
          onCancel={() => setPromoting(false)}
          onDone={async () => { setPromoting(false); await onChanged(); }}
        />
      )}
      {open && (
        <tr>
          <td colSpan={6} style={{ background: '#fff' }}>
            <div className="small muted" style={{ marginBottom: 4 }}>
              {effective
                ? `Designated as: ${providerTypeLabel(effective)}${ind.roleMarker ? '' : ' (inherited from the facility)'}`
                : 'The facility has no type, so this person has no designation yet.'}
              {ind.provenance === 'model'
                && ' · Extracted by the model and UNVERIFIED — nothing here has been checked against a record.'}
            </div>
            <label className="fld">
              <span className="lab">What they did</span>
              <textarea
                rows={3}
                defaultValue={ind.summary ?? ''}
                disabled={busy || removed}
                onBlur={(e) => {
                  if (e.target.value !== (ind.summary ?? '')) {
                    patch({ summary: e.target.value || undefined }, 'summary');
                  }
                }}
              />
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <label className="fld">
                <span className="lab">Treatment from</span>
                <input
                  type="date"
                  defaultValue={ind.treatmentFrom ?? ''}
                  disabled={busy || removed}
                  onBlur={(e) => patch({ treatmentFrom: e.target.value || undefined }, 'treatmentFrom')}
                />
              </label>
              <label className="fld">
                <span className="lab">to</span>
                <input
                  type="date"
                  defaultValue={ind.treatmentTo ?? ''}
                  disabled={busy || removed}
                  onBlur={(e) => patch({ treatmentTo: e.target.value || undefined }, 'treatmentTo')}
                />
              </label>
              <label className="fld">
                <span className="lab">Pronoun</span>
                <select
                  value={ind.pronoun ?? ''}
                  disabled={busy || removed}
                  onChange={(e) => patch({ pronoun: e.target.value || undefined }, 'pronoun')}
                >
                  <option value="">they/their (not on record)</option>
                  <option value="he">he/his</option>
                  <option value="she">she/her</option>
                </select>
              </label>
            </div>
            {visits.length > 0 && (
              <table className="tbl" style={{ marginTop: 6 }}>
                <thead><tr><th>Visit</th><th>What happened</th></tr></thead>
                <tbody>
                  {visits.map((v) => (
                    <tr key={v.id}>
                      <td className="small">{v.visitDate ?? '—'}</td>
                      <td className="small">{v.description ?? ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {ind.handEditedFields.length > 0 && (
              <p className="small muted" style={{ marginTop: 6 }}>
                Edited by hand: {ind.handEditedFields.join(', ')}. A later chronology will not
                overwrite these.
              </p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

/**
 * PROMOTION (D-56) — Michael's one click, and the only thing in this module
 * that writes to the firm-wide directory.
 *
 * `contact-directory.md` §3.3 is DIRECTORY-FIRST: the picker opens pre-searched
 * on the name and "create new" is the FALLBACK, never the default, because a
 * duplicate directory row is the failure that whole section exists to prevent.
 *
 * THE DATES ARE HIS. The dialog pre-fills `effective_from` from the earliest
 * treatment date and leaves `effective_to` blank (current), and BOTH are
 * editable and clearable before he clicks. A cleared "from" is NULL and means
 * current at every date — filling it silently would assert that the affiliation
 * BEGAN at the first visit, which is a claim about a real person's employment
 * that nobody here has.
 */
function PromoteDialog({
  ind, facilityPartyId, onDone, onCancel,
}: {
  ind: CaseProviderIndividual;
  facilityPartyId: string;
  onDone: () => void | Promise<void>;
  onCancel: () => void;
}) {
  const [matches, setMatches] = useState<PartyRecord[]>([]);
  const [chosen, setChosen] = useState<string>('');
  const [from, setFrom] = useState(ind.treatmentFrom ?? '');
  const [to, setTo] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let live = true;
    db.listParties().then((all) => {
      if (!live) return;
      const needle = ind.displayName.trim().toLowerCase();
      setMatches(all.filter((p) => p.kind === 'individual'
        && p.displayName.toLowerCase().includes(needle.split(/\s+/).pop() ?? needle)));
    });
    return () => { live = false; };
  }, [ind.displayName]);

  const promote = async () => {
    setBusy(true);
    try {
      let partyId = chosen;
      if (!partyId) {
        const created = await db.createParty({
          kind: 'individual',
          partyType: 'medicalProfessional',
          displayName: ind.displayName,
          roleTags: ['medicalProfessional', 'provider'],
          fields: ind.credentialSuffix ? { credential: ind.credentialSuffix } : {},
        });
        partyId = created.id;
      }
      // A WORLD FACT: no caseId. The affiliation is true about the world, not
      // about this matter — which is why it can disagree with the selected
      // facility later, and why that disagreement FLAGS rather than substitutes.
      await db.createContactEdge({
        fromContactId: partyId,
        toContactId: facilityPartyId,
        edgeType: 'renders-care-at',
        effectiveFrom: from || undefined,
        effectiveTo: to || undefined,
      });
      await db.updateProviderIndividual(ind.id, { partyId });
      await onDone();
    } finally { setBusy(false); }
  };

  return (
    <tr>
      <td colSpan={6} style={{ background: '#fffdf5' }}>
        <strong>Promote {ind.displayName} to the directory</strong>
        <p className="small muted" style={{ marginTop: 4 }}>
          This creates a firm-wide contact and records that they render care at this facility.
          The dates are yours: clear the start date if you do not know when the affiliation began
          — a blank start means &ldquo;current at every date&rdquo; rather than a guess.
        </p>
        <label className="fld">
          <span className="lab">Existing contact</span>
          <select value={chosen} onChange={(e) => setChosen(e.target.value)} disabled={busy}>
            <option value="">— create a new contact —</option>
            {matches.map((m) => (
              <option key={m.id} value={m.id}>{m.displayName}</option>
            ))}
          </select>
          <span className="small muted">
            {matches.length > 0
              ? `${matches.length} existing contact(s) with a similar name. Link to one rather than creating a duplicate.`
              : 'No similar contact found, so a new one will be created.'}
          </span>
        </label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <label className="fld" style={{ marginBottom: 0 }}>
            <span className="lab">Affiliated from</span>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} disabled={busy} />
          </label>
          <label className="fld" style={{ marginBottom: 0 }}>
            <span className="lab">to (blank = current)</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} disabled={busy} />
          </label>
          <button className="btn small" onClick={promote} disabled={busy}>Promote</button>
          <button className="btn small secondary" onClick={onCancel} disabled={busy}>Cancel</button>
        </div>
      </td>
    </tr>
  );
}

function AddIndividual({
  caseProviderId, onAdded,
}: { caseProviderId: string; onAdded: () => void | Promise<void> }) {
  const [name, setName] = useState('');
  const [credential, setCredential] = useState('');
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!name.trim()) return;
    setBusy(true);
    try {
      await db.createProviderIndividual({
        caseProviderId,
        displayName: name.trim(),
        credentialSuffix: credential.trim() || undefined,
        provenance: 'hand',
        missingFromLatest: false,
        // A hand-added row is hand-owned in every field from birth (D-12): a
        // later extraction never touches it at all.
        handEditedFields: ['displayName', 'credentialSuffix'],
      });
      setName('');
      setCredential('');
      await onAdded();
    } finally { setBusy(false); }
  };

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', marginTop: 8 }}>
      <label className="fld" style={{ marginBottom: 0 }}>
        <span className="lab">Add a person by hand</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      </label>
      <label className="fld" style={{ marginBottom: 0, width: 110 }}>
        <span className="lab">Credential</span>
        <input value={credential} onChange={(e) => setCredential(e.target.value)} placeholder="M.D." />
      </label>
      <button className="btn small" onClick={add} disabled={busy || !name.trim()}>Add</button>
    </div>
  );
}
