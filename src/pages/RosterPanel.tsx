// CD-1 §4/§8 — the intake roster panel and the backfill-flag surface.
//
// Two rules from the spec drive how this looks:
//   * "Slots never auto-create records." Every slot here is an invitation to
//     link a contact, never a row that appeared on its own.
//   * "Empty optional slots are NORMAL, not defects." So unfilled optional and
//     rare slots are rendered quietly — no warning colour, no count of
//     "missing" anything. Only the roster FLAGS are surfaced loudly, because
//     those are real questions the backfill refused to answer by guessing.

import { useMemo } from 'react';
import type { CaseRecord, CasePartyLink, PartyRecord, RosterBackfillFlag } from '../domain/types';
import {
  resolveRosterSlots, sortSlots, sideSetFor, EXPECTANCY_LABELS,
  PARTY_STATUS_LABELS, CAPACITY_KIND_LABELS, ROSTER_ACTIVE_STATE_LABELS,
  type Expectancy,
} from '../domain/roster';

/** A slot counts as filled when a link names it, or when a link's story role
 *  matches it. The second half matters for links that predate the roster. */
function fillersFor(slotRole: string, links: CasePartyLink[]): CasePartyLink[] {
  const key = slotRole.toLowerCase();
  return links.filter(
    (l) => l.slotRole?.toLowerCase() === key || (l.storyRole ?? l.role).toLowerCase() === key,
  );
}

export function RosterSlotsCard({
  caseRec, links, parties, onFillSlot,
}: {
  caseRec: CaseRecord;
  links: CasePartyLink[];
  parties: Record<string, PartyRecord>;
  onFillSlot?: (slotRole: string) => void;
}) {
  const slots = useMemo(
    () => sortSlots(resolveRosterSlots(caseRec.practiceArea, caseRec.caseType, caseRec.piFlags)),
    [caseRec.practiceArea, caseRec.caseType, caseRec.piFlags],
  );
  const sideSet = sideSetFor(caseRec.practiceArea, caseRec.caseType);

  if (slots.length === 0) {
    return (
      <div className="card">
        <h3>Intake roster</h3>
        <p className="muted">
          No roster is defined for <strong>{caseRec.caseType}</strong> yet. Slots are seeded only for
          case types the document bank actually evidences, so an empty panel here means
          "not yet seeded", not "no parties expected".
        </p>
      </div>
    );
  }

  const byTier = (tier: Expectancy) => slots.filter((s) => s.expectancy === tier);

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>Intake roster</h3>
        <span className="muted" title="Sides are a property of the case type, not a constant">
          Caption sides: {sideSet.alignments.length > 0 ? sideSet.alignments.join(' / ') : 'none (ex parte)'}
        </span>
      </div>

      {(['expected', 'optional', 'rare-with-procedure'] as Expectancy[]).map((tier) => {
        const tierSlots = byTier(tier);
        if (tierSlots.length === 0) return null;
        return (
          <div key={tier} style={{ marginTop: '0.6rem' }}>
            <div className="sub">
              {EXPECTANCY_LABELS[tier]}
              {tier === 'optional' && <span className="muted"> — empty is normal</span>}
              {tier === 'rare-with-procedure' && <span className="muted"> — filled by procedure, not at intake</span>}
            </div>
            <table className="list">
              <tbody>
                {tierSlots.map((slot) => {
                  const filled = fillersFor(slot.role, links);
                  return (
                    <tr key={`${slot.sourceLabel}:${slot.role}`}>
                      <td style={{ width: '38%' }}>
                        <strong>{slot.role}</strong>
                        <div className="muted" style={{ fontSize: '0.85em' }}>
                          from {slot.sourceLabel}
                          {slot.alignmentHint === null && ' · non-party by nature'}
                          {typeof slot.alignmentHint === 'string' && ` · ${slot.alignmentHint}`}
                        </div>
                      </td>
                      <td>
                        {filled.length > 0 ? (
                          filled.map((l) => (
                            <div key={l.id}>{parties[l.partyId]?.displayName ?? '…'}</div>
                          ))
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                      <td style={{ width: '12rem', textAlign: 'right' }}>
                        {filled.length === 0 && onFillSlot && (
                          <button className="btn small secondary" onClick={() => onFillSlot(slot.role)}>
                            Link a contact
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}

      <div className="muted" style={{ marginTop: '0.6rem', fontSize: '0.9em' }}>
        Slots never create records on their own — filling one links a contact you choose.
      </div>
    </div>
  );
}

/** The backfill's refusals, surfaced. These are the only loud thing in the
 *  panel: each one is a question the migration declined to answer by guessing. */
export function RosterFlagsCard({
  flags, links, parties, onResolve,
}: {
  flags: RosterBackfillFlag[];
  links: CasePartyLink[];
  parties: Record<string, PartyRecord>;
  onResolve: (id: string) => void;
}) {
  if (flags.length === 0) return null;
  const linkById = Object.fromEntries(links.map((l) => [l.id, l]));

  return (
    <div className="notice">
      <strong>
        {flags.length} roster {flags.length === 1 ? 'entry needs' : 'entries need'} a caption alignment.
      </strong>{' '}
      The migration set what it could derive mechanically and stopped there —
      nothing below was guessed.
      <table className="list" style={{ marginTop: '0.5rem' }}>
        <tbody>
          {flags.map((f) => {
            const link = linkById[f.casePartyId];
            const p = link ? parties[link.partyId] : undefined;
            return (
              <tr key={f.id}>
                <td><strong>{p?.displayName ?? 'Contact'}</strong></td>
                <td>{f.reason}</td>
                <td style={{ width: '9rem', textAlign: 'right' }}>
                  <button className="btn small secondary" onClick={() => onResolve(f.id)}>
                    Mark handled
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** The four attributes, rendered for one link. Kept beside the roster so the
 *  separation the spec insists on is visible rather than implied. */
export function RosterAttributes({ link }: { link: CasePartyLink }) {
  const bits: string[] = [];
  if (link.captionAlignment === null) bits.push('non-party');
  else if (link.captionAlignment) bits.push(link.captionAlignment);
  if (link.partyStatus) bits.push(PARTY_STATUS_LABELS[link.partyStatus]);
  if (link.capacityKind && link.capacityKind !== 'individually') {
    bits.push(CAPACITY_KIND_LABELS[link.capacityKind]);
  }
  if (link.activeState && link.activeState !== 'active') {
    bits.push(ROSTER_ACTIVE_STATE_LABELS[link.activeState]);
  }
  if (bits.length === 0) return <span className="muted">—</span>;
  return <span className="muted">{bits.join(' · ')}</span>;
}
