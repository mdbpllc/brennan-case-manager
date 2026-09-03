/**
 * THE EXTRACTION CALL — when it fires, what it may return, and what happens to
 * rows Michael has already touched.
 *
 * WHEN (D-44, and there are exactly two triggers):
 *   1. automatically at every READABLE chronology drop, for the facilities then
 *      on the Medical tab for that client (§17.7, "plugged into the system, and
 *      then it would auto populate"); and
 *   2. at Michael's "Pull individuals" click, for a facility added later.
 * **Never on adding a facility** — a PHI-bearing model call fired by adding a
 * row is a second act nobody ruled, so it is his click. Never at Generate.
 *
 * WHAT IT MAY TOUCH (§14.4, the OBGYN rule): individuals beneath facilities
 * ALREADY on the tab. It never creates a facility, a contact or an edge, and it
 * never assigns a type or a role marker (§17.1a — "always assigned by a
 * person"). The chronology is never searched for facilities.
 *
 * WHAT SURVIVES A RE-PULL — the part that makes the record his rather than the
 * model's, and the reason this file is not a simple overwrite:
 *   - a field in `handEditedFields` is NEVER overwritten (D-51);
 *   - a hand-added individual is NEVER touched (D-12);
 *   - a row he REMOVED is never re-inserted and never un-removed (D-55) — his
 *     ruled act, "I can go through and delete anyone that I wanna delete", has
 *     to survive the next drop or it means nothing;
 *   - an individual ABSENT from the newer result is KEPT and flagged, never
 *     deleted, and keeps the summary and visits from the version that named
 *     them (D-12).
 */

import type { DataAdapter } from '../../data/adapter';
import type {
  CaseChronologyVersion, CaseProvider, CaseProviderIndividual,
} from '../../domain/caseProviders';
import { isExtractedType } from '../providerTypes';
import type { ExtractedIndividual, ParagraphWriter } from '../writer';

/** Fields the model owns. Anything not here is never written by an extraction,
 *  and anything here is still skipped when Michael has edited it (D-51). */
const MODEL_OWNED = [
  'displayName', 'credentialSuffix', 'treatmentFrom', 'treatmentTo', 'summary',
] as const;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * D-58 — validation of SHAPE, never of content.
 *
 * A returned date that is not ISO-8601 lands NULL and the raw string is carried
 * into the summary in brackets, so nothing the model said is thrown away and
 * nothing unparseable is stored in a date column. An empty name drops the row —
 * there is nothing to designate. Everything else is stored as returned: this
 * function does not read the prose and never will.
 */
export function validateExtracted(raw: ExtractedIndividual): ExtractedIndividual | null {
  const displayName = (raw.displayName ?? '').trim();
  if (displayName === '') return null;

  const carried: string[] = [];
  const date = (value: string | undefined, label: string): string | undefined => {
    if (!value) return undefined;
    if (ISO_DATE.test(value)) return value;
    carried.push(`${label}: ${value}`);
    return undefined;
  };

  const treatmentFrom = date(raw.treatmentFrom, 'treatment from');
  const treatmentTo = date(raw.treatmentTo, 'treatment to');
  const summaryBits = [raw.summary?.trim(), carried.length ? `[${carried.join('; ')}]` : '']
    .filter((s) => s && s !== '');

  return {
    displayName,
    credentialSuffix: raw.credentialSuffix?.trim() || undefined,
    treatmentFrom,
    treatmentTo,
    summary: summaryBits.length ? summaryBits.join(' ') : undefined,
    visits: (raw.visits ?? []).map((v) => ({
      visitDate: v.visitDate && ISO_DATE.test(v.visitDate) ? v.visitDate : undefined,
      description: v.description,
    })),
  };
}

export interface ExtractionOutcome {
  /** Facilities the call actually ran for — never a `pharmacy` or
   *  `custodian-only` facility (D-46). */
  facilitiesPulled: number;
  added: number;
  updated: number;
  markedMissing: number;
  /** Rows a re-pull named again but did NOT resurrect (D-55). */
  skippedRemoved: number;
}

/**
 * Run an extraction against ONE chronology version.
 *
 * `providers` is the caller's already-scoped list — the facilities on the
 * Medical tab for this client. This function narrows it further by TYPE and
 * does the merge; it does not decide when to fire.
 */
export async function runExtraction(
  db: DataAdapter,
  writer: ParagraphWriter,
  version: CaseChronologyVersion,
  providers: CaseProvider[],
  existing: CaseProviderIndividual[],
  facilityNames: Record<string, { name: string; aliases: string[] }>,
): Promise<ExtractionOutcome> {
  // D-62: an unreadable version is flagged at the drop and NEVER sent. Guarding
  // here as well as at the call site means no future caller can route around it.
  if (!version.readable || version.removedAt) {
    return {
      facilitiesPulled: 0, added: 0, updated: 0, markedMissing: 0, skippedRemoved: 0,
    };
  }

  // D-46 — extraction runs for TREATING_TYPES, `radiologist` and
  // `mental-health` only. A pharmacy or custodian-only facility is never
  // extracted: its paragraph designates the custodian, so names would be rows
  // nothing designates.
  const scoped = providers.filter((p) => isExtractedType(p.providerType));
  if (scoped.length === 0) {
    return {
      facilitiesPulled: 0, added: 0, updated: 0, markedMissing: 0, skippedRemoved: 0,
    };
  }

  const result = await writer.extract({
    chronologyText: version.extractedText ?? '',
    chronologyVersionId: version.id,
    facilities: scoped.map((p) => ({
      caseProviderId: p.id,
      name: facilityNames[p.facilityPartyId]?.name ?? '',
      // A d/b/a form is what a chronology actually names (§7.1).
      aliases: facilityNames[p.facilityPartyId]?.aliases ?? [],
    })),
  });

  const outcome: ExtractionOutcome = {
    facilitiesPulled: scoped.length, added: 0, updated: 0, markedMissing: 0, skippedRemoved: 0,
  };

  for (const perFacility of result.perFacility) {
    const provider = scoped.find((p) => p.id === perFacility.caseProviderId);
    if (!provider) continue;                        // never invent a facility

    const mine = existing.filter((i) => i.caseProviderId === provider.id);
    const returned = perFacility.individuals
      .map(validateExtracted)
      .filter((i): i is ExtractedIndividual => i !== null);

    // Within-facility duplicates are suppressed by exact name match (D-12).
    const seen = new Set<string>();
    const unique = returned.filter((r) => {
      const k = r.displayName.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    const matchedIds = new Set<string>();
    let order = 0;

    for (const row of unique) {
      order += 1;
      const match = mine.find(
        (i) => i.displayName.trim().toLowerCase() === row.displayName.toLowerCase(),
      );

      if (match?.removedByHandAt) {
        // D-55. He removed this person; naming them again does not bring them
        // back. Counted so the surface can say the pull found them and left
        // them out rather than silently doing nothing.
        outcome.skippedRemoved += 1;
        matchedIds.add(match.id);
        continue;
      }

      if (match) {
        // A hand-ADDED row is never touched at all (D-12) — not even in fields
        // he has not edited, because the row is his from birth.
        if (match.provenance === 'hand') { matchedIds.add(match.id); continue; }

        const patch: Partial<CaseProviderIndividual> = {
          chronologyVersionId: version.id,
          missingFromLatest: false,
          sortOrder: order,
        };
        for (const field of MODEL_OWNED) {
          if (match.handEditedFields.includes(field)) continue;   // D-51
          (patch as Record<string, unknown>)[field] = row[field as keyof ExtractedIndividual];
        }
        await db.updateProviderIndividual(match.id, patch);
        if (!match.handEditedFields.includes('summary')) {
          await db.replaceProviderVisits(match.id, (row.visits ?? []).map((v, i) => ({
            visitDate: v.visitDate,
            description: v.description,
            provenance: 'model' as const,
            chronologyVersionId: version.id,
            sortOrder: i,
          })));
        }
        matchedIds.add(match.id);
        outcome.updated += 1;
      } else {
        const created = await db.createProviderIndividual({
          caseProviderId: provider.id,
          displayName: row.displayName,
          credentialSuffix: row.credentialSuffix,
          // ⚠ NO roleMarker. The model never assigns one (§17.1a). A NULL
          // marker reads as the facility's type until Michael sets one.
          treatmentFrom: row.treatmentFrom,
          treatmentTo: row.treatmentTo,
          summary: row.summary,
          provenance: 'model',
          chronologyVersionId: version.id,
          missingFromLatest: false,
          handEditedFields: [],
          sortOrder: order,
        });
        await db.replaceProviderVisits(created.id, (row.visits ?? []).map((v, i) => ({
          visitDate: v.visitDate,
          description: v.description,
          provenance: 'model' as const,
          chronologyVersionId: version.id,
          sortOrder: i,
        })));
        outcome.added += 1;
      }
    }

    // D-12: absent from the newer result → KEPT and flagged. Their summary and
    // visit rows stay as the version that named them left them, and the writer
    // is told so. Deleting them would quietly drop a designation.
    for (const row of mine) {
      if (matchedIds.has(row.id) || row.removedByHandAt) continue;
      if (row.provenance === 'hand') continue;      // hand rows are not "missing"
      if (row.missingFromLatest) continue;          // already flagged
      await db.updateProviderIndividual(row.id, { missingFromLatest: true });
      outcome.markedMissing += 1;
    }

    // D-48 — "extraction has RUN for this facility". This is the fact three
    // panel lines and the custodian-only fallback all key on, and it is the
    // only thing that tells "never pulled" from "pulled, found nobody".
    await db.updateCaseProvider(provider.id, {
      lastExtractionVersionId: version.id,
      lastExtractedAt: new Date().toISOString(),
    });
  }

  return outcome;
}
