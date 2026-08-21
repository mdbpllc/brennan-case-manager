/**
 * Write-backs — the second half of "enter once".
 *
 * §1: answers write back to the records so the question self-extinguishes. The
 * slice bounds that to WHERE TARGET RECORDS EXIST TODAY: credentials go to the
 * credentials dossier on the party record now; treatment-checklist answers go to
 * Medical-tab treatment records ONLY WHEN THOSE RECORDS EXIST, and they do not.
 *
 * ANYTHING UNMAPPABLE IS FLAGGED, NEVER GUESSED. That is the CL-2/CD-1 backfill
 * discipline applied to write-backs, and it is the whole design of this module:
 * a value with nowhere to land produces a `flagged` result naming what it was
 * and why it could not be stored. It does not get written to an approximate
 * home, and it does not get dropped.
 */

import type { PartyRecord } from '../domain/types';
import type { DataAdapter } from '../data/adapter';
import type { ProviderCardAnswer, WriteBackResult } from './types';

/**
 * Which answers have a home today.
 *
 * Kept as data rather than scattered through the code so that "what can this
 * engine actually persist" is one readable list, and so adding a destination
 * later is a change here rather than an archaeology exercise.
 */
export const WRITE_BACK_TARGETS = {
  /** §4.1 — the credentials dossier. Lives on the party record's fields today. */
  boardCertification: { target: 'party.fields.boardCertification', exists: true },
  /** §4.2 — treatment records on the Medical tab. NOT BUILT: the medical module
   *  has bills and line items, not treatment records. Flagged, never guessed. */
  treatmentChecklist: { target: 'medical.treatmentRecords', exists: false },
  /** §4.3 — recommended future care. No field exists for it. */
  futureCare: { target: 'medical.treatmentRecords', exists: false },
  /** §4.4 — pre-incident treatment, the PCP baseline fact. No field exists. */
  treatedBeforeIncident: { target: 'party.fields.treatedBeforeIncident', exists: true },
} as const;

/**
 * Plan the write-backs for one provider card, without performing them.
 *
 * Separated from `applyWriteBacks` so the wizard can SHOW Michael what it is
 * about to store and what it cannot store, before anything is written. A
 * write-back that surprises the attorney is a write-back that should have been
 * a flag.
 */
export function planWriteBacks(
  card: ProviderCardAnswer,
  party: PartyRecord | undefined,
): WriteBackResult[] {
  const out: WriteBackResult[] = [];
  const fields = (party?.fields ?? {}) as Record<string, unknown>;

  // §4.1 — credentials. "Don't know" is NOT an absence of certification, and
  // writing anything for it would turn an unknown into an assertion.
  if (card.boardCertificationKnown && card.boardCertification) {
    const existing = String(fields.boardCertification ?? '');
    if (!party) {
      out.push({
        status: 'flagged',
        target: WRITE_BACK_TARGETS.boardCertification.target,
        field: 'boardCertification',
        value: card.boardCertification,
        reason: 'No party record for this provider — nothing to write back to.',
      });
    } else if (existing && existing !== card.boardCertification) {
      // A conflicting value already on the record is a fact to surface, not one
      // to overwrite. The dossier may be right and the card may be wrong.
      out.push({
        status: 'flagged',
        target: WRITE_BACK_TARGETS.boardCertification.target,
        field: 'boardCertification',
        value: card.boardCertification,
        reason: `The record already reads "${existing}". Not overwritten — confirm which is correct.`,
      });
    } else if (!existing) {
      out.push({
        status: 'applied',
        target: WRITE_BACK_TARGETS.boardCertification.target,
        field: 'boardCertification',
        value: card.boardCertification,
      });
    }
  }

  // §4.4 — the PCP baseline fact does have a home on the party record.
  if (card.treatedBeforeIncident !== undefined && party) {
    if (fields.treatedBeforeIncident === undefined) {
      out.push({
        status: 'applied',
        target: WRITE_BACK_TARGETS.treatedBeforeIncident.target,
        field: 'treatedBeforeIncident',
        value: String(card.treatedBeforeIncident),
      });
    }
  }

  // §4.2 / §4.3 — treatment and future care have NO destination. The slice
  // anticipates exactly this and rules that the wizard answer self-extinguishes
  // the question via the document's own answer snapshot instead.
  if (card.treatmentChecked.length > 0) {
    out.push({
      status: 'flagged',
      target: WRITE_BACK_TARGETS.treatmentChecklist.target,
      field: 'treatmentChecklist',
      value: card.treatmentChecked.join(', '),
      reason:
        'Medical-tab treatment records do not exist yet — the medical module holds bills and '
        + 'line items, not treatment. Kept on the document’s answer snapshot for supplementation '
        + 'replay; not written to a record.',
    });
  }
  if (card.futureCare) {
    out.push({
      status: 'flagged',
      target: WRITE_BACK_TARGETS.futureCare.target,
      field: 'futureCare',
      value: card.futureCare,
      reason: 'No future-care field exists on any record. Kept on the answer snapshot only.',
    });
  }

  return out;
}

/**
 * Perform the write-backs a plan marked `applied`.
 *
 * Only `applied` rows are written. `flagged` rows are returned untouched so the
 * caller reports them — writing them "somewhere close" is the guess this
 * discipline exists to prevent.
 */
export async function applyWriteBacks(
  db: DataAdapter,
  plans: { card: ProviderCardAnswer; party: PartyRecord | undefined; results: WriteBackResult[] }[],
): Promise<WriteBackResult[]> {
  const all: WriteBackResult[] = [];
  for (const plan of plans) {
    const applied = plan.results.filter((r) => r.status === 'applied');
    if (plan.party && applied.length > 0) {
      const patch: Record<string, unknown> = { ...(plan.party.fields ?? {}) };
      for (const r of applied) patch[r.field] = r.value;
      // `fields` only. This engine never patches a PII destination, and
      // `updateParty`'s own key guard would refuse one anyway.
      await db.updateParty(plan.party.id, { fields: patch });
    }
    all.push(...plan.results);
  }
  return all;
}
