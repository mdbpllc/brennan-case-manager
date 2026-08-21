/**
 * Record → token mapping: the "enter-once" half of §1.
 *
 * Every fillable fact comes from the case, party and client records where it
 * exists. The wizard asks ONLY for what the file does not hold, and what it
 * learns writes back so the question self-extinguishes. This module is what
 * decides which is which, and it reports the gap rather than filling it: a
 * value that is not on a record and not in an answer comes back as MISSING, not
 * as a plausible default.
 *
 * PII BOUNDARY — HARD. This engine never reads `party_pii`. No token maps to a
 * date of birth, a social security number, or a driver's licence, and there is
 * no call to `getPartyPii` anywhere in `src/forms/`. Persons-with-knowledge
 * data for a disclosure is names, addresses and phones — the non-PII columns of
 * `parties`. If a disclosure token ever appears to need a PII field, that is a
 * question for Michael, not a mapping to add.
 */

import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type { CaseClient } from '../domain/client';
import type { RenderContext, RegionItem } from './renderer';
import type { WizardAnswers } from './types';
import {
  pronouns, pronounSetFromFields, pluralS, joinNames, currency,
  treatmentClause, futureCareClause, longDateCentral,
} from './grammar';
import { variantByKey } from './variants';
import { resolveTokens } from './tokens';

export interface CaseBundle {
  caseRecord: CaseRecord;
  links: CasePartyLink[];
  parties: PartyRecord[];
  clients: CaseClient[];
  /** Per-provider billed totals for the 194.2(b)(4) chart, by party id. */
  providerCharges?: Record<string, number>;
}

export interface MissingField {
  token: string;
  label: string;
  /** Where it would have come from, so the wizard can say why it is asking. */
  wouldComeFrom: string;
}

export interface BuiltContext {
  context: RenderContext;
  missing: MissingField[];
}

function partyById(bundle: CaseBundle, id: string): PartyRecord | undefined {
  return bundle.parties.find((p) => p.id === id);
}

function partiesWithRole(bundle: CaseBundle, role: string): PartyRecord[] {
  const ids = bundle.links.filter((l) => l.role === role).map((l) => l.partyId);
  return ids.map((id) => partyById(bundle, id)).filter((p): p is PartyRecord => Boolean(p));
}

function field(p: PartyRecord | undefined, key: string): string {
  if (!p) return '';
  const v = (p.fields ?? {})[key];
  return v === undefined || v === null ? '' : String(v);
}

/**
 * §9's variant library and Michael's master were written in different token
 * vocabularies — §9 says `{client}` and `{provider_dr_name}`, the master says
 * `{{plaintiff_name}}` and `{{expert_short_name}}`. Neither is wrong and
 * neither is being rewritten: §9 is approved verbatim and the master is the
 * geometry authority. The registry reconciles them instead, which is what a
 * token registry is for.
 */
export const VARIANT_TOKEN_ALIASES: Record<string, string> = {
  client: 'plaintiff_name',
  client_he_she: 'plaintiff_pronoun_subject',
  client_his_her: 'plaintiff_pronoun_possessive',
  client_him_her: 'plaintiff_pronoun_object',
  provider_name: 'expert_name',
  credential: 'expert_credential',
  provider_dr_name: 'expert_short_name',
  provider_his_her: 'expert_pronoun_possessive',
  provider_they: 'expert_pronoun_subject',
  provider_their: 'expert_pronoun_possessive',
  incident_date: 'incident_date_long',
  pharmacy_name: 'facility_name',
};

/** Resolve a §9 variant body against an expert's values, honouring the aliases. */
export function renderVariantBody(
  variantKey: string,
  values: Record<string, string>,
): { text: string; unresolved: string[] } | null {
  const variant = variantByKey(variantKey);
  if (!variant) return null;

  const aliased: Record<string, string> = { ...values };
  for (const [specName, masterName] of Object.entries(VARIANT_TOKEN_ALIASES)) {
    if (aliased[specName] === undefined && values[masterName] !== undefined) {
      aliased[specName] = values[masterName];
    }
  }
  const result = resolveTokens(variant.body, { values: aliased });
  // §9 marks the opening name span with markdown emphasis. The markers are the
  // spec's way of writing "this span is bold"; they are stripped for the
  // document rather than reinterpreted, and the run's own style carries the
  // bold. Stored text keeps them — §9 is verbatim.
  return { text: result.text.replace(/\*\*/g, ''), unresolved: result.unresolved };
}

/**
 * Build the render context for one wizard run.
 *
 * Nothing here consults a warning gate. The context is a function of RECORDS
 * and ANSWERS only, which is the structural half of the §5 invariant: there is
 * no parameter by which a gate could influence the document.
 */
export function buildRenderContext(bundle: CaseBundle, answers: WizardAnswers): BuiltContext {
  const missing: MissingField[] = [];
  const need = (token: string, label: string, wouldComeFrom: string, value: string): string => {
    if (value !== '') return value;
    const supplied = answers.scalars[token];
    if (supplied !== undefined && supplied !== '') return supplied;
    missing.push({ token, label, wouldComeFrom });
    return '';
  };

  const c = bundle.caseRecord;
  const plaintiffs = partiesWithRole(bundle, 'Plaintiff');
  const clientParties = partiesWithRole(bundle, 'Client');
  const primary = plaintiffs[0] ?? clientParties[0];
  const defendants = partiesWithRole(bundle, 'Defendant');
  const opposing = partiesWithRole(bundle, 'Opposing counsel');
  const witnesses = partiesWithRole(bundle, 'Witness');

  const pl = pronouns(pronounSetFromFields(primary?.fields as Record<string, unknown>));

  // ---------------------------------------------------------- scalars
  const scalars: Record<string, string> = {
    cause_number: need('cause_number', 'Cause number', 'the case record', c.causeNumber ?? ''),
    court_type_caps: need('court_type_caps', 'Court type', 'the case record', ''),
    judicial_district_caps: need('judicial_district_caps', 'Judicial district', 'the case record', ''),
    county_name_caps: need('county_name_caps', 'County', 'the case record', (c.county ?? '').toUpperCase()),

    plaintiff_name: primary?.displayName ?? '',
    plaintiff_name_caps: (primary?.displayName ?? '').toUpperCase(),
    plaintiff_pronoun_subject: pl.subject,
    plaintiff_pronoun_possessive: pl.possessive,
    plaintiff_pronoun_object: pl.object,

    defendant_names_caps_block: defendants.map((d) => d.displayName.toUpperCase()).join('\n'),
    defendant_plural_s: pluralS(defendants.length),

    incident_type: need(
      'incident_type', 'Incident type (short phrase)', 'the wizard — set once per case',
      answers.incidentType ?? '',
    ),
    incident_date_long: need(
      'incident_date_long', 'Date of incident', 'the case record',
      c.dateOfIncident ? longDateCentral(c.dateOfIncident) : '',
    ),
    service_date_long: need(
      'service_date_long', 'Date of service', 'the service event — confirmed in your local time',
      answers.serviceDateLong ?? '',
    ),

    damages_elements_joined: answers.scalars.damages_elements_joined ?? '',
    total_medical_charges: '',
  };

  // 194.2(b)(4): the narrative total and the table TOTAL are ONE computed value.
  // Defect D-8 in the exemplar was prose reading "an undetermined amount" beside
  // a table carrying figures, with no TOTAL row. Computing it once is the fix.
  const charges = bundle.providerCharges ?? {};
  const chargeRows: RegionItem[] = Object.entries(charges).map(([partyId, amount]) => ({
    provider_name: partyById(bundle, partyId)?.displayName ?? '',
    provider_total_charges: currency(amount),
  }));
  const total = Object.values(charges).reduce((a, b) => a + b, 0);
  scalars.total_medical_charges = chargeRows.length > 0 ? currency(total) : '';

  // Stock answers the wizard overrode.
  for (const [k, v] of Object.entries(answers.answerOverrides)) {
    if (v !== undefined && v !== '') scalars[k] = v;
  }
  for (const [k, v] of Object.entries(answers.scalars)) {
    if (scalars[k] === undefined || scalars[k] === '') scalars[k] = v;
  }

  // ---------------------------------------------------------- regions
  const counselItems: RegionItem[] = defendants.map((d) => {
    const counsel = opposing.filter((o) => field(o, 'representsPartyId') === d.id);
    const firm = counsel[0];
    return {
      defendant_name_caps: d.displayName.toUpperCase(),
      counsel_plural_s: pluralS(counsel.length || 1),
      counsel_names: joinNames(counsel.map((o) => o.displayName)),
      firm_name_caps: field(firm, 'firmName').toUpperCase(),
      firm_address_inline: field(firm, 'addressInline'),
    };
  });

  const serviceItems: RegionItem[] = opposing.map((o) => ({
    service_emails_joined: field(o, 'serviceEmails') || field(o, 'email'),
    counsel_name: o.displayName,
    firm_name_caps: field(o, 'firmName').toUpperCase(),
    firm_address_line_1: field(o, 'addressLine1'),
    firm_address_line_2: field(o, 'addressLine2'),
    firm_phone: field(o, 'phone'),
    firm_fax: field(o, 'fax'),
    served_party_name_caps: (
      partyById(bundle, field(o, 'representsPartyId'))?.displayName ?? ''
    ).toUpperCase(),
  }));

  const partyDefendantItems: RegionItem[] = defendants.map((d) => ({
    defendant_name: d.displayName,
  }));

  // §2 item 4 — fact witnesses, each with a short testimony description.
  const pwkItems: RegionItem[] = [
    ...(primary ? [{
      person_name: primary.displayName,
      person_care_of_line: 'c/o Michael D. Brennan',
      person_firm_name_caps: '',
      person_address_line_1: '',
      person_address_line_2: '',
      person_phone: '',
      person_connection_statement: 'Plaintiff',
    }] : []),
    ...answers.factWitnesses.map((fw) => {
      const p = partyById(bundle, fw.partyPartyId);
      return {
        person_name: p?.displayName ?? '',
        person_care_of_line: field(p, 'careOf'),
        person_firm_name_caps: field(p, 'firmName').toUpperCase(),
        person_address_line_1: field(p, 'addressLine1'),
        person_address_line_2: field(p, 'addressLine2'),
        person_phone: field(p, 'phone'),
        person_connection_statement: fw.testimonyDescription,
      };
    }),
    ...witnesses
      .filter((w) => !answers.factWitnesses.some((fw) => fw.partyPartyId === w.id))
      .map((w) => ({
        person_name: w.displayName,
        person_care_of_line: field(w, 'careOf'),
        person_firm_name_caps: field(w, 'firmName').toUpperCase(),
        person_address_line_1: field(w, 'addressLine1'),
        person_address_line_2: field(w, 'addressLine2'),
        person_phone: field(w, 'phone'),
        person_connection_statement: '',
      })),
  ];

  const providerItems: RegionItem[] = answers.providerCards.map((card) => {
    const p = partyById(bundle, card.providerPartyId);
    return {
      provider_individual_names_block: field(p, 'individualNames') || (p?.displayName ?? ''),
      facility_name_caps: (field(p, 'facilityName') || p?.displayName || '').toUpperCase(),
      facility_address_line_1: field(p, 'addressLine1'),
      facility_city_state_zip: field(p, 'cityStateZip'),
      facility_phone: field(p, 'phone'),
    };
  });

  const itemSelects: Record<string, string> = {};
  const expertItems: RegionItem[] = answers.providerCards.map((card, index) => {
    const p = partyById(bundle, card.providerPartyId);
    const pr = pronouns(pronounSetFromFields(p?.fields as Record<string, unknown>));
    const archetype = archetypeForVariant(card.variantKey);
    itemSelects[`testifying_expert:${index}`] = archetype;

    const values: Record<string, string> = {
      expert_names_block: field(p, 'individualNames') || (p?.displayName ?? ''),
      custodian_line: field(p, 'custodianLine'),
      facility_name_caps: (field(p, 'facilityName') || p?.displayName || '').toUpperCase(),
      facility_name: field(p, 'facilityName') || (p?.displayName ?? ''),
      facility_address_line_1: field(p, 'addressLine1'),
      facility_city_state_zip: field(p, 'cityStateZip'),
      facility_phone: field(p, 'phone'),
      // The CLINICIAN, not the facility. A provider party is routinely a
      // business — "Halite Regional Hospital" — while §9's narrative opens
      // "{provider_name}, {credential} is an emergency medicine physician",
      // which is a person. Falling back to the party's display name produced
      // "Halite Regional Hospital, M.D. is an emergency medicine physician".
      expert_name: field(p, 'providerName') || field(p, 'individualNames') || (p?.displayName ?? ''),
      expert_credential: card.boardCertificationKnown ? (card.boardCertification ?? '') : field(p, 'credential'),
      expert_short_name: field(p, 'shortName') || (p?.displayName ?? ''),
      expert_specialty_phrase: field(p, 'specialtyPhrase'),
      expert_role_verb_phrase: field(p, 'roleVerbPhrase'),
      expert_pronoun_subject: pr.subject,
      expert_pronoun_subject_cap: pr.subjectCap,
      expert_pronoun_possessive: pr.possessive,
      expert_names_joined: field(p, 'individualNames'),
      expert_group_specialty_phrase: field(p, 'groupSpecialtyPhrase'),
      expert_group_treatment_noun: field(p, 'groupTreatmentNoun'),
      imaging_study_description: field(p, 'imagingStudy'),
      imaging_date_long: field(p, 'imagingDate'),
      custodian_records_scope_phrase: field(p, 'recordsScopePhrase') || 'care and treatment',
      custodian_date_clause: '',
      // Computed tokens the §9 library uses.
      treatment_clause: treatmentClause(card.treatmentChecked, card.surgeryPerformed),
      future_care_clause: futureCareClause(card.futureCare),
      baseline_clause: card.treatedBeforeIncident === true ? BASELINE_SENTENCE : '',
      specialty_descriptor: field(p, 'specialtyDescriptor'),
      physician_or_specialist: field(p, 'physicianOrSpecialist') || 'physician',
      referring_provider: field(p, 'referringProvider'),
      plural_s: '',
      s: '',
    };

    // The approved §9 paragraph, if one is selected, rendered through the alias
    // map and handed to the renderer as this expert's narrative. The master
    // supplies the paragraph's style; §9 supplies its words.
    const rendered = renderVariantBody(card.variantKey, { ...scalars, ...values });
    if (rendered) values.__narrative = rendered.text;

    return values;
  });

  // ---- STRUCTURAL gaps, not just empty scalars ----
  // A missing VALUE shows up as an unresolved token. A missing PARTY does not:
  // a case with no defendant linked renders a caption with an empty defendant
  // block, an empty TO: list and an empty (b)(1) response, and every one of
  // those is silently well-formed. That is defect class D-2/D-4 arriving by
  // omission rather than by contamination, so it is surfaced here.
  if (defendants.length === 0) {
    missing.push({
      token: '__defendants',
      label: 'No defendant is linked to this matter',
      wouldComeFrom: 'the Parties tab — the caption, the TO: block and the (b)(1) response all read it',
    });
  }
  if (opposing.length === 0) {
    missing.push({
      token: '__opposing_counsel',
      label: 'No opposing counsel is linked',
      wouldComeFrom: 'the Parties tab — the TO: block and the certificate of service read it',
    });
  }
  // REQ-04 and defect D-7: pronouns are DATA. An unknown set renders the plural
  // forms, which are never wrong about a person but are also not what the
  // record says — so the absence is asked about rather than quietly defaulted.
  if (primary && pronounSetFromFields(primary.fields as Record<string, unknown>) === 'unknown') {
    missing.push({
      token: '__plaintiff_pronouns',
      label: `Pronouns for ${primary.displayName} (rendering as they/their meanwhile)`,
      wouldComeFrom: 'the party record — pronoun drift inside one sentence is defect D-7',
    });
  }

  // A value the file does not hold is ABSENT from the context, not blank.
  // Blank would render as a silent gap that nothing reports; absent surfaces in
  // the render lint AND in `missing`, so the same fact reaches the drafter by
  // both routes. This is the §14 placeholder discipline: zero unaccounted
  // placeholders, and none of them quietly empty.
  // `__`-prefixed entries are structural findings, not tokens — they have no
  // scalar to delete and deleting by name would be a silent no-op either way.
  for (const m of missing) if (!m.token.startsWith('__')) delete scalars[m.token];
  if (chargeRows.length === 0) delete scalars.total_medical_charges;
  if (scalars.damages_elements_joined === '') delete scalars.damages_elements_joined;

  const context: RenderContext = {
    scalars,
    regions: {
      defendant_counsel: counselItems,
      service_recipient: serviceItems,
      party_defendant: partyDefendantItems,
      provider_charge_row: chargeRows,
      person_with_knowledge: pwkItems,
      treating_provider: providerItems,
      testifying_expert: expertItems,
    },
    itemSelects,
    // The caption's left cell needs one line per party plus the label and
    // spacer lines the shell already carries. §8: never freeze at twelve.
    captionPartyLineCount: captionLineCount(plaintiffs.length || 1, defendants.length),
  };

  return { context, missing };
}

/** §9.8's baseline clause, in the master's vocabulary. */
const BASELINE_SENTENCE =
  ' Having treated the Plaintiff both before and after the incident, this provider will also '
  + "testify regarding the Plaintiff's physical condition and health prior to the incident and "
  + 'the changes in that condition following it.';

/**
 * Which of the master's four narrative archetypes a §9 variant renders into.
 *
 * §9 carries TWELVE approved variants; the master carries FOUR archetype
 * blocks. They are different groupings of the same job and neither supersedes
 * the other on its face — §9 is the RULED library ("approved verbatim"), the
 * master is the 2026-08-20 fixture and is UNRULED. The build follows §9 for the
 * words and uses the archetype only to pick the paragraph shell. The 4-vs-12
 * divergence is recorded in `docs/spec-feedback.md` as a question for Michael.
 */
export function archetypeForVariant(variantKey: string): string {
  if (variantKey.includes('radiologist')) return 'imaging_interpreter';
  if (variantKey.includes('custodian')) return 'custodian_of_records';
  if (variantKey.includes('emt') || variantKey.includes('physical-therapist')) return 'provider_group';
  if (variantKey.includes('pharmacy')) return 'custodian_of_records';
  return 'treating_provider';
}

/** Party lines the caption's left cell needs — plaintiffs, the `v.`, the
 *  defendants, and the two party labels, each with its spacer. */
export function captionLineCount(plaintiffCount: number, defendantCount: number): number {
  const lines = plaintiffCount + 1 + Math.max(defendantCount, 1);
  const labels = 2;
  const spacers = 3;
  return Math.max(12, lines + labels + spacers);
}
