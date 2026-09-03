/**
 * APP ASSEMBLY — the shapes, the LEAD, the fixed sentences, the block, and the
 * order.
 *
 * `RC-1`, Michael: ***"The app puts the sentences in there with the model
 * writing the rest around them."*** Then, asked which of two ways: ***"Option
 * 1"*** — the model never touches the fixed sentences, returns PARTS, and the
 * APP assembles.
 *
 * So a paragraph is an ORDERED SEQUENCE OF PIECES, each APP (placed from the
 * record or from the fixed-sentence table) or WRITER (a returned part). The
 * order is his: ***"The four slot order matches"*** — LEAD, opening, BASIS,
 * middle, CAUSATION, causation always last.
 *
 * ⚠ **NOTHING IN THIS FILE READS INSIDE A WRITER PART.** Not to check the
 * custodian limbs, not to check a date, not to compare two paragraphs. Parts
 * are trimmed and joined and that is the whole of it. Every check this build
 * runs is over RECORDS or over the app's own placed text. That is §11.6, and
 * the slice's §12 says it twice.
 */

import {
  activeIndividuals, sortIndividuals,
  type CaseProvider, type CaseProviderIndividual, type CaseProviderVisit,
  type ParagraphShape,
} from '../domain/caseProviders';
import {
  effectiveMarker, isTreatingType, type ProviderTypeKey,
} from './providerTypes';
import { fixedSentence } from './fixedSentences';
import {
  longDateCentral, pluralS, pronouns, pronounSetFromFields, subjectPronounSet, verbS,
  type PronounSet,
} from './grammar';

/**
 * D-10 — the event noun's deciding field.
 *
 * The RULE is Michael's (§11.8: *"Let's make 'incident' the word for everything
 * not a collision"*). The MEMBERSHIP is the build's, because `cases` has no
 * incident-type column and `CASE_TYPE_DEFS` is FLAT — there is no case-type
 * tree and no key, only the display name as the primary key.
 *
 * Both TTCA — Motor Vehicle and the ordinary motor-vehicle collision are in:
 * a suit against a governmental unit arising from a collision is still a
 * collision, and calling it "the incident" in a served designation would be
 * describing the wrong event. Overlay flags (trucking, UM/UIM) do NOT decide
 * this — the ruling says the case type does, whatever rides on top of it.
 *
 * REPORTED AS A DEFAULT TAKEN. Never read from the wizard's free-text phrase.
 */
export const MOTOR_VEHICLE_CASE_TYPES: readonly string[] = [
  'Motor vehicle collision',
  'TTCA — Motor Vehicle',
];

export function eventNoun(caseType: string | undefined): string {
  return MOTOR_VEHICLE_CASE_TYPES.includes(caseType ?? '') ? 'collision' : 'incident';
}

/** D-49. DPT is deliberately absent — the PT honorific is a hands-on item. */
export const DOCTORAL_CREDENTIALS = ['MD', 'DO', 'DC', 'DPM', 'DDS', 'DMD', 'PHD', 'PSYD'];

function normalizeCredential(c: string | undefined): string {
  return (c ?? '').replace(/[.\s]/g, '').toUpperCase();
}

export function isDoctoral(credential: string | undefined): boolean {
  return DOCTORAL_CREDENTIALS.includes(normalizeCredential(credential));
}

function lastToken(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] ?? name;
}

/** D-21's list form — "Drs. A, B and C", NO Oxford comma. Deliberately not
 *  `joinNames`, which uses the serial comma the firm uses elsewhere: the form
 *  here is the one in §15.3's own example. */
function joinNoOxford(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

// ------------------------------------------------------------------ shapes

export interface ParagraphPlan {
  shape: ParagraphShape;
  caseProviderId: string;
  /** Ordered, and exactly the individuals THIS paragraph designates. */
  individuals: CaseProviderIndividual[];
  /** The type whose fixed pair is placed. Not always the facility's: a
   *  radiology split paragraph takes §9.2's pair at a facility of another
   *  type. */
  fixedType?: ProviderTypeKey;
  /** Riders hang off the paragraph they ride, never stand alone (D-16). */
  riders: CaseProviderIndividual[];
  /** The custodian-only fallback's automatic gap flag (§8.2 line 7). */
  gapFlag: boolean;
}

export interface FacilityPlan {
  provider: CaseProvider;
  paragraphs: ParagraphPlan[];
  /** D-65 — exactly who the provider block names, in order. */
  blockIndividuals: CaseProviderIndividual[];
  /** A `mental-health` facility renders its block and NO paragraph at all. */
  handDrafted: boolean;
}

/**
 * Choose the shapes for ONE selected facility.
 *
 * The effective marker is computed ONCE, before anything branches on it (D-45),
 * because shape selection, block membership and three panel lines all have to
 * agree about what an individual is — and computing it twice is exactly how
 * they would come to disagree.
 */
export function planFacility(
  provider: CaseProvider,
  allIndividuals: CaseProviderIndividual[],
): FacilityPlan {
  const type = provider.providerType;
  const people = sortIndividuals(
    activeIndividuals(allIndividuals.filter((i) => i.caseProviderId === provider.id)),
  );
  const markerOf = (i: CaseProviderIndividual) => effectiveMarker(i.roleMarker, type);

  // AS-Q5: a mental-health FACILITY generates NO paragraph. The block renders,
  // §5.1's hard pause fires, and Michael drafts the paragraph in Word. The
  // deliberate gap is preserved as a TYPE, not smoothed into a variant.
  if (type === 'mental-health') {
    return { provider, paragraphs: [], blockIndividuals: people, handDrafted: true };
  }

  // D-46: individuals on these two are permitted but are NOT designated and do
  // NOT render on the block — a block naming people above a paragraph that
  // designates only the custodian is the ND-1 defect.
  if (type === 'pharmacy' || type === 'custodian-only') {
    return {
      provider,
      paragraphs: [{
        shape: type === 'pharmacy' ? 'pharmacy' : 'custodian-only',
        caseProviderId: provider.id,
        individuals: [],
        riders: [],
        gapFlag: false,          // typed custodian-only is not a FALLBACK
      }],
      blockIndividuals: [],
      handDrafted: false,
    };
  }

  // AS-Q17's default: a `mental-health`-MARKED individual at a facility of
  // another type is EXCLUDED from the generated paragraph and its LEAD, and
  // stays on the block, hand-drafted — because designating a psychologist under
  // an EM causation sentence is the served assertion §5.1 exists to pause.
  const mentalHealth = people.filter((i) => markerOf(i) === 'mental-health');
  const radiologists = people.filter((i) => markerOf(i) === 'radiologist');
  const midLevels = people.filter((i) => markerOf(i) === 'mid-level');
  const counted = people.filter((i) => {
    const m = markerOf(i);
    return m !== 'mental-health' && m !== 'mid-level'
      && !(m === 'radiologist' && type !== 'radiologist');
  });

  const paragraphs: ParagraphPlan[] = [];

  if (type === 'radiologist') {
    // The imaging facility (§13.5). Its named individuals go out under §9.2's
    // pair whatever their own markers say.
    if (counted.length > 0) {
      paragraphs.push({
        shape: 'imaging-facility',
        caseProviderId: provider.id,
        individuals: counted,
        fixedType: 'radiologist',
        riders: [],
        gapFlag: false,
      });
    }
  } else if (counted.length > 0) {
    const markers = new Set(counted.map((i) => markerOf(i)));
    paragraphs.push({
      shape: type === 'other-non-physician'
        ? 'other-non-physician'
        : counted.length === 1
          ? 'treating-single'
          : markers.size > 1 ? 'treating-mixed' : 'treating-group',
      caseProviderId: provider.id,
      individuals: counted,
      fixedType: type === 'other-non-physician' ? undefined : type,
      riders: [],
      gapFlag: false,
    });
  }

  // §15.3, Michael: "Radiologist is the only split." A SECOND paragraph, under
  // the same provider block, taking §9.2's pair.
  if (type !== 'radiologist' && radiologists.length > 0) {
    paragraphs.push({
      shape: 'radiology-split',
      caseProviderId: provider.id,
      individuals: radiologists,
      fixedType: 'radiologist',
      riders: [],
      gapFlag: false,
    });
  }

  // D-16 — NO RIDER WITHOUT A TREATING PARAGRAPH TO RIDE, and the reason is not
  // mechanical: a rider under the radiology paragraph would tie the PA's
  // testimony scope to the radiologists' reads, which is a served assertion
  // about a person. When there is nothing to ride, the mid-level is not
  // designated and, by D-65, does not render on the block either.
  const treating = paragraphs.find(
    (p) => p.shape !== 'radiology-split'
      && p.shape !== 'custodian-only'
      // An IMAGING facility's paragraph is a radiology paragraph in substance,
      // so D-16's reason reaches it too: a rider under it would tie the PA's
      // testimony scope to the radiologists' reads. And it reaches it by D-16's
      // own words as well — at a facility typed `radiologist` the individuals'
      // EFFECTIVE marker is `radiologist`, so "a facility whose only
      // non-mid-level individuals are marked radiologist" is literally true.
      && p.shape !== 'imaging-facility',
  );
  const ridersEmitted = treating ? midLevels : [];
  if (treating) treating.riders = midLevels;

  // ND-4 / D-27: a treating-type or imaging facility with nobody to name goes
  // out custodian-only under §9.11, with the automatic gap flag. Not when a
  // mental-health-marked individual is present — AS-Q17's default governs and
  // there is simply no generated paragraph.
  if (paragraphs.length === 0) {
    if (mentalHealth.length > 0) {
      return { provider, paragraphs: [], blockIndividuals: mentalHealth, handDrafted: true };
    }
    paragraphs.push({
      shape: 'custodian-only',
      caseProviderId: provider.id,
      individuals: [],
      riders: [],
      gapFlag: true,           // the FALLBACK — this is the flagged case
    });
  }

  // D-65 — BLOCK MEMBERSHIP, one rule: everyone some paragraph on this
  // instrument designates, PLUS every mental-health-typed or -marked
  // individual, whose paragraph Michael drafts by hand.
  const designated = new Set<string>();
  for (const p of paragraphs) {
    for (const i of p.individuals) designated.add(i.id);
    for (const r of p.riders) designated.add(r.id);
  }
  for (const i of mentalHealth) designated.add(i.id);
  void ridersEmitted;

  return {
    provider,
    paragraphs,
    blockIndividuals: people.filter((i) => designated.has(i.id)),
    handDrafted: false,
  };
}

// -------------------------------------------------------------- the block

/**
 * D-64 — the block's custodian line, by N.
 *
 * The RULE is Michael's, from Part 3: the "(s)" tracks the count of named
 * individuals. The literal at N >= 2 is a rendering of his placeholder form and
 * is a PROPOSED hands-on item, not settled by the drawing he approved.
 */
export function custodianLine(n: number, isPharmacy: boolean): string {
  if (isPharmacy) return 'Pharmacist(s) and/or Custodian of Records';
  if (n === 0) return 'Custodian of Records';
  if (n === 1) return 'And/or Custodian of Records';
  return 'And/or Custodians of Records';
}

// ------------------------------------------------------------- the tokens

export interface AssemblyContext {
  clientName: string;
  clientPronoun?: string;
  incidentDateIso?: string;
  caseType?: string;
  facilityName: string;
}

/** How a set of individuals is NAMED in the LEAD and inside a fixed sentence. */
export function renderNames(individuals: CaseProviderIndividual[]): {
  provider_name: string;
  credential: string;
  provider_dr_name: string;
} {
  if (individuals.length === 0) {
    return { provider_name: '', credential: '', provider_dr_name: '' };
  }
  if (individuals.length === 1) {
    const one = individuals[0];
    return {
      provider_name: one.displayName,
      credential: one.credentialSuffix ?? '',
      provider_dr_name: isDoctoral(one.credentialSuffix)
        ? `Dr. ${lastToken(one.displayName)}`
        : one.displayName,
    };
  }

  // D-21: honorifics only when EVERY member holds MD, DO or DC; otherwise full
  // names with credentials and no honorific. Mixed credentials are exactly the
  // case where a shared "Drs." would be wrong about somebody.
  const allDoctoral = individuals.every(
    (i) => ['MD', 'DO', 'DC'].includes(normalizeCredential(i.credentialSuffix)),
  );
  if (allDoctoral) {
    const surnames = joinNoOxford(individuals.map((i) => lastToken(i.displayName)));
    return {
      provider_name: `Drs. ${surnames}`,
      credential: '',
      provider_dr_name: `Drs. ${surnames}`,
    };
  }
  const withCreds = joinNoOxford(individuals.map(
    (i) => (i.credentialSuffix ? `${i.displayName}, ${i.credentialSuffix}` : i.displayName),
  ));
  return { provider_name: withCreds, credential: '', provider_dr_name: withCreds };
}

/**
 * The R17 individual's pronoun, read through the SHARED parser.
 *
 * `pronounSetFromFields` reads `fields.pronouns` / `fields.gender` off a PARTY
 * record; an R17 individual carries a single `pronoun` column instead. Mapping
 * it here means one parser understands every spelling ("he", "him", "male",
 * "f") in both places, rather than a second and slightly different one growing
 * up beside it. Getting this wrong is silent: every pronoun in every served
 * paragraph reads "they", which is never obviously broken and always wrong.
 */
function setOf(ind: { pronoun?: string } | undefined): PronounSet {
  return pronounSetFromFields({ pronouns: ind?.pronoun });
}

/** D-50 — the rider's subject, the rendering `AS-Q8c` approved. */
export function midlevelShortName(ind: CaseProviderIndividual): string {
  const set = setOf(ind);
  if (set === 'he') return `Mr. ${lastToken(ind.displayName)}`;
  if (set === 'she') return `Ms. ${lastToken(ind.displayName)}`;
  // No gender on record: the full name without the credential, and "their".
  return ind.displayName;
}

/** Every token a fixed sentence can carry, bound from the RECORD (§6.5). */
export function tokenValues(
  ctx: AssemblyContext,
  individuals: CaseProviderIndividual[],
  riderFor?: CaseProviderIndividual,
): Record<string, string> {
  const n = individuals.length;
  const single = n === 1 ? individuals[0] : undefined;
  const set = subjectPronounSet(n, setOf(single));
  const pr = pronouns(set);
  const names = renderNames(individuals);
  const clientPr = pronouns(pronounSetFromFields({ pronouns: ctx.clientPronoun }));

  const values: Record<string, string> = {
    ...names,
    provider_they: pr.subject,
    provider_his_her: pr.possessive,
    provider_their: pr.possessive,
    client: ctx.clientName,
    client_he_she: clientPr.subject,
    facility_name: ctx.facilityName,
    // The ONE piece of the floor the app guarantees from the record. No wizard
    // answer may fill or override it, and it is rendered from the date's own
    // parts rather than through a timezone.
    incident_date: ctx.incidentDateIso ? longDateCentral(ctx.incidentDateIso) : '',
    incident_type: eventNoun(ctx.caseType),
    s: pluralS(n),
    verb_s: verbS(n, setOf(single)),
  };

  if (riderFor) {
    const rset = setOf(riderFor);
    values.midlevel_short_name = midlevelShortName(riderFor);
    values.midlevel_name = riderFor.displayName;
    values.midlevel_credential = riderFor.credentialSuffix ?? '';
    values.midlevel_his_her = pronouns(rset).possessive;
    // GROUP FILL — the HELD default (§18.F, the rider's supervisor). Michael
    // may make it a supervisor he designates by hand at the hands-on sitting.
    values.supervising_provider = names.provider_dr_name || ctx.facilityName;
  }

  return values;
}

/** Substitute into ONE of the app's own sentences. Never over a writer part. */
export function fillSentence(text: string, values: Record<string, string>): string {
  const filled = text.replace(/\{([a-z0-9_]+)\}/gi, (whole, name: string) => (
    Object.prototype.hasOwnProperty.call(values, name) ? values[name] : whole
  ));
  // A sentence that begins with a token begins with a PRONOUN — §9.3's basis
  // opens "{provider_they} will testify" — so the app capitalises its own
  // sentence rather than shipping "he will testify" mid-paragraph as an
  // opening word. This touches only text the app placed.
  return filled.replace(/^(\s*)([a-z])/, (_, ws: string, c: string) => ws + c.toUpperCase());
}

// ----------------------------------------------------------- the paragraph

export interface AssembledParagraph {
  shape: ParagraphShape;
  caseProviderId: string;
  individualIds: string[];
  leadText?: string;
  parts: Record<string, string>;
  assembledText: string;
  fixedSentenceKeys: string[];
  gapFlag: boolean;
}

/** D-2: pieces joined with a single space; parts trimmed of leading/trailing
 *  whitespace and NOTHING else; a newline inside a part becomes a space so the
 *  part stays one paragraph. */
function clean(part: string | undefined): string {
  return (part ?? '').replace(/\s*\n\s*/g, ' ').trim();
}

function joinPieces(pieces: (string | undefined)[]): string {
  return pieces.map((p) => (p ?? '').trim()).filter((p) => p !== '').join(' ');
}

/**
 * Assemble ONE paragraph from its plan and the writer's parts.
 *
 * The LEAD is written from the RECORD and never read out of the writer's text
 * (`AS-Q8b`). D-42: a NULL credential yields the bold name and ONE comma, never
 * an empty credential slot.
 */
export function assembleParagraph(
  plan: ParagraphPlan,
  ctx: AssemblyContext,
  parts: Record<string, string>,
  rider?: CaseProviderIndividual,
): AssembledParagraph {
  const values = tokenValues(ctx, plan.individuals, rider);
  const fixedKeys: string[] = [];

  const place = (slot: 'basis' | 'causation'): string | undefined => {
    if (!plan.fixedType) return undefined;
    const row = fixedSentence(slot, plan.fixedType);
    if (!row) return undefined;
    fixedKeys.push(row.key);
    return fillSentence(row.text, values);
  };

  const names = renderNames(plan.individuals);
  const lead = names.provider_name
    ? `${names.provider_name}${names.credential ? `, ${names.credential}` : ''},`
    : undefined;

  let assembled: string;
  let leadText: string | undefined = lead;

  switch (plan.shape) {
    case 'midlevel-rider': {
      // Two slots, and NO LEAD (D-41): §9.12's approved voice opens with the
      // name, and AS-Q8c's fixed sentence carries the mid-level's name itself.
      const row = fixedSentence('rider-scope', 'mid-level');
      if (row) fixedKeys.push(row.key);
      leadText = undefined;
      assembled = joinPieces([clean(parts.opening), row ? fillSentence(row.text, values) : '']);
      break;
    }

    case 'custodian-only': {
      // AS-Q7a: the APP places §9.11 WHOLE — the one shape whose whole content
      // is predicate boilerplate, so all four limbs are app-guaranteed. The
      // writer's optional clause goes BETWEEN its two sentences (D-18) so
      // §9.11's approved sentences stay byte-intact and nothing is templated
      // inside or beside them.
      const row = fixedSentence('custodian-only-whole', 'custodian-only');
      if (!row) { assembled = ''; leadText = undefined; break; }
      fixedKeys.push(row.key);
      const whole = fillSentence(row.text, values);
      const split = whole.indexOf('. ');
      const clause = clean(parts.care_episode_clause);
      assembled = split === -1 || !clause
        ? joinPieces([whole, clause])
        : joinPieces([whole.slice(0, split + 1), clause, whole.slice(split + 2)]);
      // §9.11's own bold facility name IS this shape's lead; it is already
      // inside the text the app places whole.
      leadText = undefined;
      break;
    }

    case 'pharmacy':
      // D-17: the pharmacy has no person, so the LEAD is the bold FACILITY name.
      leadText = `${ctx.facilityName},`;
      assembled = joinPieces([leadText, clean(parts.body)]);
      break;

    case 'other-non-physician':
      // AS-Q5: no fixed causation line at all — degrade, don't invent.
      assembled = joinPieces([leadText, clean(parts.body)]);
      break;

    case 'retained':
      leadText = undefined;
      assembled = clean(parts.body);
      break;

    default:
      // LEAD -> opening -> BASIS -> middle -> CAUSATION. Causation LAST.
      assembled = joinPieces([
        leadText,
        clean(parts.opening),
        place('basis'),
        clean(parts.middle),
        place('causation'),
      ]);
  }

  return {
    shape: plan.shape,
    caseProviderId: plan.caseProviderId,
    individualIds: (rider ? [rider] : plan.individuals).map((i) => i.id),
    leadText,
    parts,
    assembledText: assembled,
    fixedSentenceKeys: fixedKeys,
    gapFlag: plan.gapFlag,
  };
}

/**
 * §8.4 — the ORDER within a facility: the radiology paragraph follows the
 * treating paragraph, and a rider follows the paragraph it rides.
 */
export function orderParagraphs(plans: ParagraphPlan[]): ParagraphPlan[] {
  const rank = (p: ParagraphPlan) => (p.shape === 'radiology-split' ? 1 : 0);
  return [...plans].sort((a, b) => rank(a) - rank(b));
}

/** The visit dates a plan's individuals carry — the D-13 chain's third limb. */
export function visitDatesFor(
  individuals: CaseProviderIndividual[],
  visits: CaseProviderVisit[],
): (string | undefined)[] {
  const ids = new Set(individuals.map((i) => i.id));
  return visits.filter((v) => ids.has(v.individualId)).map((v) => v.visitDate);
}

/** Whether this facility's type owns a fixed basis/causation pair at all. */
export function facilityHasFixedPair(type: ProviderTypeKey | undefined): boolean {
  return isTreatingType(type) && type !== 'other-non-physician';
}
