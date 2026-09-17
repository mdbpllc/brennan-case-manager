/**
 * THE GENERATE — what happens between Michael's click and a .docx.
 *
 * ORDER MATTERS AND IS RULED (§7.2, D-3):
 *   1. the three must-fix stops are evaluated from a LIVE read;
 *   2. if any holds, **NOTHING IS TRANSMITTED** — not one writer call is made,
 *      not one paragraph is assembled;
 *   3. otherwise ONE writer call PER PARAGRAPH (D-22), sequentially — except
 *      the custodian-only shape, whose paragraph is §9.11 whole and asks the
 *      writer for nothing (`#156` §2, B2);
 *   4. a failed or malformed call is an ERROR for the WHOLE instrument — the
 *      failing facility is named and the generate can be retried. Never
 *      "render what you have": a missing designation is its own exposure.
 *
 * ⚠ Nothing here reads inside a returned part. It hands the parts to the
 * assembler and the assembler concatenates them.
 */

import type { DataAdapter } from '../data/adapter';
import type { PartyRecord } from '../domain/types';
import { resolveLocation } from '../domain/addressSplit';
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
import type { NarrativeParagraph, RegionItem } from './renderer';

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
  // D-8's "Currently practicing at …" sentence is GONE, and deliberately has no
  // field here. `#156` §2 (B1), Michael: *"Don't add the sentence"*. The block
  // ALWAYS reads the selected facility and adds nothing beneath the phone; a
  // disagreeing affiliation edge is panel line 17's business (`tiers.ts`), never
  // the served block's. A test pins the absence in the block and in a render.
  /** `D1` — WHICH of the facility's locations treated this client, carried on
   *  the block so `blockItem` keeps its two-argument shape and the location
   *  cannot be paired with the wrong facility downstream. Copied off the R17
   *  row; undefined where none is selected, which is a panel line, not a stop. */
  facilityLocationId?: string;
}

function partyField(p: PartyRecord | undefined, key: string): string {
  const v = (p?.fields ?? {})[key];
  return typeof v === 'string' ? v : '';
}

/**
 * The 195.5(a)(1) CONTACT LINES, read from the facility's OWN party record.
 *
 * The reader the TWO DESIGNATION REGIONS share, so the block and the
 * treating-provider region beside it can never again disagree about where a
 * facility's address and telephone come from. `HS-2` (`F7`): the block shipped
 * three hard-coded empty strings while the `treating_provider` region — built
 * from the SAME blocks at the SAME call site — read the record correctly, so
 * every served block carried a name and no street, whatever the record held.
 *
 * It is NOT the only reader of these three keys in the tree, and the comment
 * should not be read as claiming so: `person_with_knowledge` builds its own
 * `person_*` tokens from the same record, and `context.ts` builds the
 * wizard-answer path's items from its own local reader. Consolidating those is
 * a separate act.
 *
 * §17.6 is UNCHANGED by this: a facility with nothing on file still renders,
 * still generates, and the panel's lines 1 and 2 are what say so. An empty
 * value drops its paragraph (§12.3) rather than leaving a blank line.
 *
 * ⛔ **IT READS TWO STORED FIELDS AND SPLITS NOTHING** (`D1(iii)`, Michael:
 * ***"1"***). A location that still carries only the pre-split one-line
 * `address` renders NO street line here — deliberately, and pinned by a test —
 * and raises `SD-1`'s panel line instead. The split runs at the record, in
 * `migrateV15ToV16` and in `db/migrations/2026-09-07-address-model-split.sql`,
 * and in no third place.
 */
export function facilityContactLines(
  facility: PartyRecord | undefined,
  /** `D1` — the `SD-4` id of the location that treated the client. A facility
   *  with exactly ONE location resolves without it (`SD-8`). */
  facilityLocationId?: string,
): RegionItem {
  const loc = resolveLocation((facility?.fields ?? {}).locations, facilityLocationId);
  // §3 item 17(d): with no location resolved the block "renders to the name and
  // ends" — the §17.6 posture, unchanged. Three empties, and the document still
  // generates.
  if (!loc) {
    return {
      facility_address_line_1: '',
      facility_city_state_zip: '',
      facility_phone: '',
    };
  }
  const str = (k: string) => (typeof loc[k] === 'string' ? (loc[k] as string) : '');
  return {
    facility_address_line_1: str('addressLine1'),
    facility_city_state_zip: str('cityStateZip'),
    // `SD-2`, stated at `D1(i)` and not objected to: the location's own phone,
    // falling back to the facility's main phone.
    facility_phone: str('phone') || partyField(facility, 'phone'),
  };
}

/**
 * One `testifying_expert` item: the provider block's lines, in the master's
 * own order. Its narrative comes through `itemNarratives`, not through a token.
 *
 * It takes the party MAP and does its own lookup rather than a resolved
 * record, and that is deliberate. `b.facilityName` was resolved from
 * `facilityParties[b.facilityPartyId]` inside `buildDesignations`; if the
 * caller also had to hand the record back, a block could be built naming one
 * facility and carrying another's street and telephone — a served 195.5(a)(1)
 * block directing records requests to the wrong address. Keying off `b` here
 * makes that unrepresentable rather than merely unlikely.
 *
 * **THE CUSTODIAN LINE PRINTS ONCE** — `#156` §2 (B4), Michael: *"Fix — print it
 * once"*: the custodian line is suppressed when the top line already is it. At
 * N = 0 `AS-Q7c` makes the TOP line the custodian line itself, so emitting both
 * tokens printed it twice (spec-feedback THIRD TRANCHE item 8). The mechanism is
 * `FXD-6` (PROVISIONAL, a build default): `custodian_line` is emitted EMPTY, and
 * the master's `optional` filter plus §12.3's emptied-paragraph drop close the
 * line up. The master's two token spots are untouched. It reaches EVERY block
 * whose top line is its custodian line — a pharmacy block too, whose N is always
 * 0 and whose §9.10 literal printed twice the same way. At N >= 1 nothing
 * changes: the top line is the names and the custodian line follows it.
 */
export function blockItem(
  b: DesignationBlock,
  facilityParties: Record<string, PartyRecord | undefined>,
): RegionItem {
  return {
    expert_names_block: b.topLine,
    // FXD-6 — empty when the top line already IS the custodian line (B4).
    custodian_line: b.topLine === b.custodianLine ? '' : b.custodianLine,
    facility_name_caps: b.facilityName.toUpperCase(),
    facility_name: b.facilityName,
    ...facilityContactLines(facilityParties[b.facilityPartyId], b.facilityLocationId),
  };
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
  // No `currentlyPracticing` input — D-8's sentence path is removed (`#156` §2,
  // B1). Nothing the block renders reads an affiliation edge.
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
    // No `custodian-only` note: D-18's care-episode clause is RETIRED (`#156`
    // §2, B2) and the writer is never called for that shape, so there is no
    // request for a note to ride on.
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
    blocks.push({
      caseProviderId: provider.id,
      facilityPartyId: provider.facilityPartyId,
      facilityName,
      facilityLocationId: provider.facilityLocationId,
      individuals: plan.blockIndividuals,
      custodianLine: line,
      topLine: n === 0 ? line : renderNames(plan.blockIndividuals).provider_name,
    });

    const narratives: NarrativeParagraph[] = [];

    for (const p of orderParagraphs(plan.paragraphs)) {
      let parts: Record<string, string> = {};
      // A mental-health facility never reaches here (planFacility returns no
      // paragraphs for it), so no writer call is made for one.
      //
      // Nor is one made for the CUSTODIAN-ONLY shape. `#156` §2 (B2), Michael:
      // *"No episode sentence at all"* — D-18's care-episode clause is retired,
      // §9.11 is placed whole by the app, and the writer has NO part for this
      // shape, so asking it would transmit a chronology for nothing.
      if (p.shape !== 'custodian-only') {
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
