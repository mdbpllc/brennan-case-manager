/**
 * The template bank, seeded.
 *
 * Slice item 5: "§9 variant library seeded as template DATA, verbatim." The
 * bodies come from `variants.ts`, which is itself generated from the spec and
 * guarded by a test that re-reads the spec at HEAD — so the seed cannot drift
 * from the approved text without the suite failing.
 *
 * IDs are stable strings rather than generated UUIDs, matching the rest of the
 * demo seed. That makes a reseed idempotent from the app's point of view and
 * keeps a template's identity readable in a localStorage dump.
 */

import type {
  FormTemplate, FormTemplateVersion, FormTokenDefinition, FormFormatProfile,
} from './types';
import { DISCLOSURE_VARIANTS } from './variants';
import { DISCLOSURES_SKELETON_KEY } from './skeletons/disclosuresSkeleton';

const T = '2026-08-20T00:00:00.000Z';

export const DISCLOSURES_TEMPLATE_KEY = 'disclosures-plaintiff-194-2b-195-5';
export const DISCLOSURES_PROFILE_KEY = 'tx-civil-instrument-letter';

/**
 * The format profile, measured from Michael's master rather than asserted.
 *
 * Every number here was read out of `word/document.xml` on 2026-08-20 and
 * cross-checked against `form-engine.md` §8. The caption columns are the
 * corrected set — §8 records the defect (a 9900-twip table against a 9360-twip
 * text column, overhanging the right margin by 0.375") and this artifact
 * already carries the fix.
 */
const PROFILE: FormFormatProfile = {
  id: 'fp-tx-civil-letter',
  key: DISCLOSURES_PROFILE_KEY,
  name: 'Texas civil instrument — US Letter, Times New Roman 12',
  spec: {
    pageWidthTwips: 12240,
    pageHeightTwips: 15840,
    marginTopTwips: 990,
    marginOtherTwips: 1440,
    bodyFont: 'Times New Roman',
    bodyPointSize: 12,
    textColumnTwips: 9360,
    captionColumnsTwips: [4680, 360, 4320],
    // Recorded as what the ARTIFACT carries. The renderer computes the real
    // count from the party-line count at render time — §8 is explicit that the
    // engine must never freeze this at twelve.
    captionSectionMarkCount: 12,
    roleStyles: {
      entity: 'Times New Roman bold, small caps',
      address: 'Times New Roman bold',
      person: 'Times New Roman bold',
      label: 'bold, underlined',
      response: 'bold, justified',
      connection: 'bold italic',
    },
  },
  createdAt: T,
  updatedAt: T,
};

/**
 * The firm's stock answers, carried by the master in legacy `|default:` filters.
 *
 * Seeded as their own templates so Michael can edit them in the minimal editor
 * without touching the skeleton — which is the point of §1's "Michael owns
 * routine wording changes". The TEXT is the master's own; it is not reworded.
 */
const STOCK_ANSWERS: { token: string; label: string; body: string }[] = [
  {
    token: 'potential_parties_response',
    label: '194.2(b)(2) — potential parties',
    body: 'None known to Plaintiff.',
  },
  {
    token: 'legal_theories_response',
    label: '194.2(b)(3) — legal theories and factual bases',
    body: 'Please see Plaintiff’s live pleading.',
  },
  {
    token: 'documents_response',
    label: '194.2(b)(6) — documents, ESI and tangible things',
    body: 'Please see the produced documents. Plaintiff will supplement when additional '
      + 'materials are obtained within a reasonable amount of time.',
  },
  {
    token: 'indemnity_insuring_response',
    label: '194.2(b)(7) — indemnity and insuring agreements',
    body: 'None at this time.',
  },
  {
    token: 'settlement_agreements_response',
    label: '194.2(b)(8) — settlement agreements',
    body: 'None.',
  },
  {
    token: 'witness_statements_response',
    label: '194.2(b)(9) — witness statements',
    body: 'None of which Plaintiff is aware, Plaintiff reserves the right to supplement '
      + 'this response.',
  },
  {
    token: 'medical_records_response',
    label: '194.2(b)(10) — medical records and bills',
    body: 'See medical records and bills from all health care providers.',
  },
  {
    token: 'authorization_records_response',
    label: '194.2(b)(11) — records obtained by authorization',
    body: 'None known to Plaintiff at this time.',
  },
  {
    token: 'rtp_response',
    label: '194.2(b)(12) — responsible third parties',
    body: 'None of which Plaintiff is aware.',
  },
  {
    token: 'retained_expert_response',
    label: '195.5(a)(4) — retained experts',
    body: 'Plaintiff has not retained the services of any experts at this time.',
  },
];

/**
 * §10's token registry.
 *
 * `static` reads off a record, `inflected` comes from the grammar engine, and
 * `computed` is compiled from a §4 interview card. Only the tokens whose
 * classification is load-bearing are enumerated — the registry is a working
 * description of where values come from, not a second copy of the master's
 * 71-token inventory.
 */
const TOKENS: { name: string; kind: FormTokenDefinition['kind']; description: string; sourcePath?: string; variantChecklist?: string[] }[] = [
  { name: 'cause_number', kind: 'static', description: 'Cause number', sourcePath: 'case.causeNumber' },
  { name: 'county_name_caps', kind: 'static', description: 'County, upper case', sourcePath: 'case.county' },
  { name: 'incident_date_long', kind: 'static', description: 'Date of incident, long form, Central', sourcePath: 'case.dateOfIncident' },
  { name: 'plaintiff_name', kind: 'static', description: 'Plaintiff display name', sourcePath: 'party[Plaintiff].displayName' },
  { name: 'plaintiff_pronoun_subject', kind: 'inflected', description: 'he / she / they — from the party record, never guessed' },
  { name: 'plaintiff_pronoun_possessive', kind: 'inflected', description: 'his / her / their' },
  { name: 'plaintiff_pronoun_object', kind: 'inflected', description: 'him / her / them' },
  { name: 'defendant_plural_s', kind: 'inflected', description: 'The [s] flex point, from the defendant count (FC-4)' },
  { name: 'counsel_plural_s', kind: 'inflected', description: 'The [s] flex point, from the counsel count (FC-4)' },
  { name: 'total_medical_charges', kind: 'computed', description: 'Summed once and referenced by both the narrative and the table TOTAL row — defect D-8 was these two disagreeing' },
  {
    name: 'treatment_clause',
    kind: 'computed',
    description: 'Compiled from the §4.2 per-variant treatment checklist',
    variantChecklist: [
      'evaluation', 'imaging review', 'conservative care', 'injections',
      'surgery performed', 'therapeutic exercise', 'manual therapy', 'modalities',
      'gait training', 'home exercise program', 'FCE',
      'spinal manipulation', 'rehabilitative therapy', 'medication management',
    ],
  },
  { name: 'future_care_clause', kind: 'computed', description: 'From §4.3 — nothing, generic, or a named procedure' },
  { name: 'baseline_clause', kind: 'computed', description: '§9.8 PCP baseline — rendered only when the §4.4 card answers Yes' },
  { name: 'expert_narrative_archetype', kind: 'computed', description: 'Selects the paragraph shell; the approved §9 variant supplies the words' },
];

export function formEngineSeedData(): {
  formTemplates: FormTemplate[];
  formTemplateVersions: FormTemplateVersion[];
  formTokenDefinitions: FormTokenDefinition[];
  formFormatProfiles: FormFormatProfile[];
} {
  const formTemplates: FormTemplate[] = [];
  const formTemplateVersions: FormTemplateVersion[] = [];

  // ---- the instrument -------------------------------------------------
  const instrumentVersionId = 'ftv-disclosures-1';
  formTemplates.push({
    id: 'ft-disclosures',
    key: DISCLOSURES_TEMPLATE_KEY,
    name: "Plaintiff's TRCP 194.2(b) and 195.5 Disclosures",
    family: 'instrument',
    // FE-12: the FORMAT came from an artifact the firm actually served, by way
    // of the 2026-08-20 master. That is what 'format-authoritative' means here;
    // it says nothing about whether the TEXT has been adopted.
    provenance: 'format-authoritative',
    skeletonKey: DISCLOSURES_SKELETON_KEY,
    formatProfileId: PROFILE.id,
    currentVersionId: instrumentVersionId,
    notes:
      'Geometry from Michael’s master, supplied 2026-08-20. Rule citations in the '
      + 'skeleton are reproduced as the firm’s forms quote them and are UNVERIFIED '
      + '— confirm against the current rule before any served use.',
    createdAt: T,
    updatedAt: T,
  });
  formTemplateVersions.push({
    id: instrumentVersionId,
    templateId: 'ft-disclosures',
    versionNo: 1,
    // The instrument's body IS the skeleton; this record carries the pointer and
    // the per-form metadata, not a second copy of the document.
    body: `[skeleton: ${DISCLOSURES_SKELETON_KEY}]`,
    settings: {
      footerTitle: "PLAINTIFF'S TRCP 194.2(B) AND 195.5 DISCLOSURES",
      firstPageFooter: 'blank',
    },
    changeNote: 'Seeded from the 2026-08-20 master skeleton.',
    createdAt: T,
  });

  // ---- the §9 approved variants, verbatim -----------------------------
  for (const [i, v] of DISCLOSURE_VARIANTS.entries()) {
    const versionId = `ftv-variant-${i + 1}`;
    formTemplates.push({
      id: `ft-variant-${i + 1}`,
      key: v.key,
      name: `§${v.section} ${v.title}`,
      family: 'expert-narrative-variant',
      // 'proposed', not 'format-authoritative': §9's TEXT is approved verbatim,
      // but no §9 variant has been through FE-7 adoption, and FE-12's flag is
      // about FORMAT provenance. Marking these authoritative would overclaim.
      provenance: 'proposed',
      notes: v.notes,
      createdAt: T,
      updatedAt: T,
      currentVersionId: versionId,
    });
    formTemplateVersions.push({
      id: versionId,
      templateId: `ft-variant-${i + 1}`,
      versionNo: 1,
      body: v.body,
      settings: {},
      changeNote: `Seeded verbatim from form-engine.md §${v.section}.`,
      createdAt: T,
    });
  }

  // ---- the stock answers ----------------------------------------------
  for (const [i, sa] of STOCK_ANSWERS.entries()) {
    const versionId = `ftv-stock-${i + 1}`;
    formTemplates.push({
      id: `ft-stock-${i + 1}`,
      key: `disclosures-stock-${sa.token.replace(/_/g, '-')}`,
      name: sa.label,
      family: 'stock-answer',
      provenance: 'format-authoritative',
      notes: `Fills {${sa.token}}. Carried by the master as a |default: filter.`,
      createdAt: T,
      updatedAt: T,
      currentVersionId: versionId,
    });
    formTemplateVersions.push({
      id: versionId,
      templateId: `ft-stock-${i + 1}`,
      versionNo: 1,
      body: sa.body,
      settings: { token: sa.token },
      changeNote: 'Seeded from the master skeleton’s own default.',
      createdAt: T,
    });
  }

  const formTokenDefinitions: FormTokenDefinition[] = TOKENS.map((t, i) => ({
    id: `ftd-${i + 1}`,
    name: t.name,
    kind: t.kind,
    description: t.description,
    sourcePath: t.sourcePath,
    variantChecklist: t.variantChecklist,
    createdAt: T,
    updatedAt: T,
  }));

  return {
    formTemplates,
    formTemplateVersions,
    formTokenDefinitions,
    formFormatProfiles: [PROFILE],
  };
}

/** Alias used by the demo-store migration. */
export const seedFormEngine = formEngineSeedData;
