/**
 * THE GENERATE — what happens between Michael's click and a .docx.
 *
 * ORDER MATTERS AND IS RULED (§7.2, D-3):
 *   1. the three must-fix stops are evaluated from a LIVE read;
 *   2. if any holds, **NOTHING IS TRANSMITTED** — not one writer call is made,
 *      not one paragraph is assembled;
 *   3. otherwise ONE writer call PER PARAGRAPH (D-22), sequentially;
 *   4. a failed or malformed call is an ERROR for the WHOLE instrument — the
 *      failing facility is named and the generate can be retried. Never
 *      "render what you have": a missing designation is its own exposure.
 *
 * ⚠ Nothing here reads inside a returned part. It hands the parts to the
 * assembler and the assembler concatenates them.
 */

import type { DataAdapter } from '../data/adapter';
import type { PartyRecord } from '../domain/types';
import {
  activeIndividuals, newestReadableVersion,
  type CaseChronologyVersion, type CaseProvider, type CaseProviderIndividual,
  type CaseProviderVisit,
} from '../domain/caseProviders';
import {
  assembleParagraph, custodianLine, orderParagraphs, planFacility, renderNames,
  tokenValues, fillSentence,
  type AssembledParagraph, type AssemblyContext, type FacilityPlan,
} from './assembly';
import { fixedSentence } from './fixedSentences';
import { DISCLOSURE_VARIANTS } from './variants';
import { WriterCallError, type ParagraphWriter, type WriteInput } from './writer';
import type { NarrativeParagraph } from './renderer';

export interface DesignationBlock {
  caseProviderId: string;
  facilityPartyId: string;
  facilityName: string;
  /** D-65 — exactly who this block names, in order. */
  individuals: CaseProviderIndividual[];
  /** D-64's literal, by the count of individuals RENDERED here. */
  custodianLine: string;
  /** `AS-Q7c`: when nobody is named the TOP line is the custodian line itself. */
  topLine: string;
  /** D-8 — the "Currently practicing at …" sentence, when a LATER current edge
   *  exists. A TEXT ACT in a served block, listed for Michael's eye. */
  currentlyPracticingAt?: string;
}

export interface GenerateResult {
  blocks: DesignationBlock[];
  paragraphs: AssembledParagraph[];
  /** Keyed `testifying_expert:${index}` for the renderer. */
  itemNarratives: Record<string, NarrativeParagraph[]>;
  chronologyVersionId?: string;
}

export interface GenerateInput {
  writer: ParagraphWriter;
  /** The facilities SELECTED for this instrument, already in D-13's order. */
  selected: CaseProvider[];
  individuals: CaseProviderIndividual[];
  visits: CaseProviderVisit[];
  chronologyVersions: CaseChronologyVersion[];
  facilityParties: Record<string, PartyRecord>;
  clientName: string;
  clientPronoun?: string;
  incidentDateIso?: string;
  caseType?: string;
  writerInstructions: string;
  /** Set on a promoted individual whose LATER current edge names a facility. */
  currentlyPracticing?: Record<string, { facility: string; address: string; phone: string }>;
}

/** §7.3 — what the writer is GIVEN. Assembled once, here, so the payload's
 *  shape is one thing rather than a habit spread over call sites. */
function writerInput(
  plan: { shape: AssembledParagraph['shape']; individuals: CaseProviderIndividual[]; fixedType?: string },
  input: GenerateInput,
  ctx: AssemblyContext,
  provider: CaseProvider,
  chronologyText: string,
  rider?: CaseProviderIndividual,
): WriteInput {
  const values = tokenValues(ctx, plan.individuals, rider);
  const shown: { slot: string; text: string }[] = [];
  if (plan.fixedType) {
    for (const slot of ['basis', 'causation'] as const) {
      const row = fixedSentence(slot, plan.fixedType as never);
      // D-23: shown ALREADY FILLED and inflected exactly as the app will place
      // it, so the writer's parts read into it rather than around a template.
      if (row) shown.push({ slot, text: fillSentence(row.text, values) });
    }
  }

  return {
    shape: plan.shape,
    chronologyText,
    client: {
      name: input.clientName,
      pronounSubject: values.client_he_she,
      pronounPossessive: values.client_he_she === 'he' ? 'his' : values.client_he_she === 'she' ? 'her' : 'their',
    },
    incidentDateLong: values.incident_date,
    incidentNoun: values.incident_type,
    facility: { name: ctx.facilityName, type: provider.providerType },
    individuals: (rider ? [rider] : plan.individuals).map((i) => ({
      displayName: i.displayName,
      credentialSuffix: i.credentialSuffix,
      roleMarker: i.roleMarker,
      treatmentFrom: i.treatmentFrom,
      treatmentTo: i.treatmentTo,
      summary: i.summary,
      visits: input.visits.filter((v) => v.individualId === i.id)
        .map((v) => ({ visitDate: v.visitDate, description: v.description })),
      missingFromLatest: i.missingFromLatest,
    })),
    fixedSentences: shown,
    // All twelve, unedited (§11.7 — "let the model use those and come up with one").
    voiceExamples: DISCLOSURE_VARIANTS.map((v) => ({ section: v.section, body: v.body })),
    writerInstructions: input.writerInstructions,
    shapeNote: shapeNote(plan.shape),
    // ⚠ NOT GIVEN: any panel state, any gate state, any acknowledgement. The
    // payload is gate-free, which is what makes invariant 6 structural rather
    // than a promise (its signature has no gate argument to pass one through).
  };
}

function shapeNote(shape: AssembledParagraph['shape']): string | undefined {
  switch (shape) {
    case 'treating-mixed':
      return 'Explain what each one did, then pair them together.';
    case 'midlevel-rider':
      return 'Describe what the physician assistant or nurse practitioner actually did. Two sentences at most.';
    case 'custodian-only':
      return 'Return ONE complete sentence naming the care episode and its date, and nothing else.';
    default:
      return undefined;
  }
}

/**
 * Build every designation for ONE instrument.
 *
 * The caller has already checked the stops. This function makes writer calls,
 * so calling it with a stop outstanding would transmit — which is why the
 * caller's check and this call sit next to each other in the generate path.
 */
export async function buildDesignations(input: GenerateInput): Promise<GenerateResult> {
  const version = newestReadableVersion(input.chronologyVersions);
  const chronologyText = version?.extractedText ?? '';

  const blocks: DesignationBlock[] = [];
  const paragraphs: AssembledParagraph[] = [];
  const itemNarratives: Record<string, NarrativeParagraph[]> = {};

  for (const [index, provider] of input.selected.entries()) {
    const party = input.facilityParties[provider.facilityPartyId];
    const facilityName = party?.displayName ?? '';
    const plan: FacilityPlan = planFacility(provider, input.individuals);
    const ctx: AssemblyContext = {
      clientName: input.clientName,
      clientPronoun: input.clientPronoun,
      incidentDateIso: input.incidentDateIso,
      caseType: input.caseType,
      facilityName,
    };

    // D-65 decided membership; D-64 renders the line from the COUNT.
    const n = plan.blockIndividuals.length;
    const line = custodianLine(n, provider.providerType === 'pharmacy');
    const practising = plan.blockIndividuals
      .map((i) => input.currentlyPracticing?.[i.id])
      .find((x) => x != null);
    blocks.push({
      caseProviderId: provider.id,
      facilityPartyId: provider.facilityPartyId,
      facilityName,
      individuals: plan.blockIndividuals,
      custodianLine: line,
      topLine: n === 0 ? line : renderNames(plan.blockIndividuals).provider_name,
      currentlyPracticingAt: practising
        ? `Currently practicing at ${practising.facility}, ${practising.address}, ${practising.phone}.`
        : undefined,
    });

    const narratives: NarrativeParagraph[] = [];

    for (const p of orderParagraphs(plan.paragraphs)) {
      let parts: Record<string, string> = {};
      // A mental-health facility never reaches here (planFacility returns no
      // paragraphs for it), so no writer call is made for one.
      try {
        parts = await input.writer.write(
          writerInput(p, input, ctx, provider, chronologyText),
        ) as Record<string, string>;
      } catch (e) {
        throw new WriterCallError(
          `The writer failed for ${facilityName || 'a facility'}: ${(e as Error).message}`,
          facilityName,
        );
      }
      if (parts == null || typeof parts !== 'object') {
        throw new WriterCallError(
          `The writer returned nothing usable for ${facilityName || 'a facility'}.`,
          facilityName,
        );
      }

      const assembled = assembleParagraph(p, ctx, parts);
      paragraphs.push(assembled);
      // bodyText, NOT assembledText: the renderer places the lead as its own
      // bold run, so handing it the whole paragraph prints the lead twice.
      narratives.push({ lead: assembled.leadText, text: assembled.bodyText });

      // The rider follows the paragraph it rides (§8.4), and only exists
      // because that paragraph does (D-16).
      for (const rider of p.riders) {
        const riderPlan = { ...p, shape: 'midlevel-rider' as const, individuals: [rider], riders: [] };
        let riderParts: Record<string, string> = {};
        try {
          riderParts = await input.writer.write(
            writerInput(riderPlan, input, ctx, provider, chronologyText, rider),
          ) as Record<string, string>;
        } catch (e) {
          throw new WriterCallError(
            `The writer failed for the rider at ${facilityName}: ${(e as Error).message}`,
            facilityName,
          );
        }
        // The rider's scope sentence names the paragraph it RIDES (the GROUP
        // FILL default), never the mid-level themselves.
        const riderOut = assembleParagraph(riderPlan, ctx, riderParts, rider, p.individuals);
        paragraphs.push(riderOut);
        narratives.push({ text: riderOut.bodyText });
      }
    }

    itemNarratives[`testifying_expert:${index}`] = narratives;
  }

  return { blocks, paragraphs, itemNarratives, chronologyVersionId: version?.id };
}

/**
 * Persist the paragraph record (`AS-Q13a`, §5.1).
 *
 * One row per PARAGRAPH — a split writes two, each rider its own, a
 * mental-health facility writes NONE, because a block is not a paragraph.
 * `individualIds` is stored in block order so `AS-Q14` is buildable later
 * without a backfill, whichever way Michael rules it.
 */
export async function persistParagraphs(
  db: DataAdapter,
  documentId: string,
  clientId: string | undefined,
  result: GenerateResult,
  stamps: { writerInstructionsVersionId?: string; fixedSentenceVersionIds: Record<string, string> },
): Promise<void> {
  const nameOf = new Map(result.blocks.map((b) => [b.caseProviderId, b.facilityName]));
  for (const [i, p] of result.paragraphs.entries()) {
    await db.createDocumentParagraph({
      documentId,
      caseProviderId: p.caseProviderId,
      facilityNameAsRendered: nameOf.get(p.caseProviderId),
      clientId,
      individualIds: p.individualIds,
      shape: p.shape,
      leadText: p.leadText,
      parts: p.parts,
      assembledText: p.assembledText,
      fixedSentenceVersionIds: p.fixedSentenceKeys
        .map((k) => stamps.fixedSentenceVersionIds[k])
        .filter((v): v is string => Boolean(v)),
      writerInstructionsVersionId: stamps.writerInstructionsVersionId,
      chronologyVersionId: result.chronologyVersionId,
      gapFlag: p.gapFlag,
      sortOrder: i,
    });
  }
}

/** Individuals a facility's block will name, without running a generate — the
 *  Medical tab and the wizard both want this, and they must agree. */
export function blockPreview(
  provider: CaseProvider,
  individuals: CaseProviderIndividual[],
): CaseProviderIndividual[] {
  return planFacility(provider, activeIndividuals(individuals)).blockIndividuals;
}
