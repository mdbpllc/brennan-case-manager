/**
 * THE FOUR §4 INTERVIEW CARDS — **RETIRED FOR THE TREATING TRACK**, and KEPT.
 *
 * `AS-Q9`, Michael's selection: *"Retire all four for treating facilities; the
 * writer is told never to assert board certification unless the chronology or
 * the record states it."* Their clauses no longer exist and the writer draws
 * from the chronology instead, so **nothing renders this component today.**
 *
 * It is moved here rather than DELETED because the option he selected said, in
 * its own words, that the machinery stays for the retained track if that track
 * is ever built that way — and the slice's §13 item 11 says so in terms: "their
 * components are NOT deleted". Deleting it would have quietly turned a
 * retirement into a demolition.
 *
 * The credential guard the card used to enforce survives as a WRITER
 * INSTRUCTION: never assert board certification unless the chronology or the
 * record states it (§7.4(c)). Nothing checks that the writer obeyed it — §11.5.
 *
 * ⚠ Do not wire this into the treating track again without a ruling.
 */

import type { PartyRecord } from '../domain/types';
import type { ProviderCardAnswer } from '../forms/types';
import { DISCLOSURE_VARIANTS } from '../forms/variants';

const TREATMENT_OPTIONS = [
  'evaluation', 'imaging review', 'conservative care', 'injections',
  'spinal manipulation', 'therapeutic modalities', 'rehabilitative therapy',
  'medication management', 'therapeutic exercise', 'manual therapy',
];

/* ================= provider interview card (§4) ================= */

export function ProviderCard({
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
