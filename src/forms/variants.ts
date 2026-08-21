/**
 * §9 APPROVED VARIANT LIBRARY — seeded as template DATA, verbatim.
 *
 * GENERATED, NOT TYPED. Every `body` string below was sliced out of
 * `docs/specs/form-engine.md` §9 by program and written through unchanged.
 * The §9 heading carries a do-not-rewrite bar — "approved by Michael verbatim"
 * — and the FE-D1 slice restates it: "the build copies, it never rewords."
 * A regression test re-reads the spec at HEAD and asserts every body still
 * matches byte-for-byte, so drift between spec and seed fails the suite rather
 * than reaching a served document.
 *
 * DO NOT EDIT THE BODIES BY HAND. Correct the spec in the design space; this
 * file is refreshed from it.
 *
 * The deliberate gap at the end of §9 is carried here too: there is NO
 * mental-health variant, intentionally. §5.1's Richardson Motorsports hard gate
 * routes any treating psychologist/psychiatrist to manual drafting. A future
 * session must not "helpfully" fill it.
 */

/** One approved narrative paragraph, keyed for the template bank. */
export interface DisclosureVariant {
  /** Stable template key — the seed and the database agree on this. */
  key: string;
  /** Spec section this came from, e.g. "9.4". */
  section: string;
  /** Human label, as §9 titles it. */
  title: string;
  /** The approved paragraph, VERBATIM. Tokens are in the master's convention. */
  body: string;
  /** §9's own notes on the variant — drafting guidance, not document text. */
  notes: string;
}

export const DISCLOSURE_VARIANTS: DisclosureVariant[] = [
  {
    key: "disclosures-variant-emergency-medicine",
    section: "9.1",
    title: "Emergency medicine (base skeleton)",
    body: "**{provider_name}, {credential}** is an emergency medicine {physician_or_specialist} who provided emergency medical care to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding the emergency condition in which {client} presented, the medical treatment provided, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. {provider_dr_name} will further testify as to {provider_his_her} examination and diagnosis of {client}'s symptoms and injuries as related to and caused by the incident of {incident_date}. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.",
    notes: "if a facility has both an EM physician and radiologists (e.g., the old Metropolitan Methodist block), the engine SPLITS them — EM paragraph for the treater, radiology paragraph for the readers, shared contact block.",
  },
  {
    key: "disclosures-variant-radiologist",
    section: "9.2",
    title: "Radiologist",
    body: "**{provider_name}, {credential}** is a radiologist who read and interpreted diagnostic imaging performed on {client} in connection with the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} review and interpretation of {client}'s diagnostic imaging, {provider_his_her} review of {client}'s medical records, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding the imaging studies performed on {client}, the findings and impressions from those studies, the reasonableness and necessity of the imaging, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding {client}'s imaging findings as they relate to {client}'s condition, injuries, damages, and prognosis. Plaintiff anticipates {provider_dr_name} will testify that the findings shown in {client}'s imaging are, within a reasonable degree of medical probability, consistent with and caused by the incident of {incident_date}.",
    notes: "fixes the old form's bug describing radiologists as providing \"personal treatment.\" Michael approved keeping the causation sentence. Interventional radiologists who performed procedures go out under a treater variant instead. Interview card asks only which studies.",
  },
  {
    key: "disclosures-variant-emt-paramedic",
    section: "9.3",
    title: "EMT / paramedic (defaults plural)",
    body: "**{provider_name}, {credential}** is an Emergency Medical Technician{s} who responded to the scene of the {incident_type} on {incident_date} and provided emergency medical care to {client}. {provider_they} specialize{s} in responding to emergency medical needs, stabilizing patients, and transporting patients to medical facilities for further care. {provider_they} will testify based on {provider_their} personal examination and treatment of {client} at the scene and during transport, and {provider_their} medical knowledge gained from education, training, experience, and research. {provider_they} will testify regarding the condition in which {provider_they} found {client} at the scene, {client}'s complaints and presentation at the scene, the emergency care and treatment provided, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_they} will give testimony in the form of facts and opinions regarding {provider_their} personal examination, treatment, and observations of {client}, including but not limited to medical expenses, medical treatment, pain and suffering, and other elements of damages. Plaintiff anticipates {provider_they} will testify that the condition and injuries for which {provider_they} provided emergency medical attention were consistent with the {incident_type} that occurred on {incident_date}.",
    notes: "deliberately \"consistent with\" causation (not medical-probability — qualification-fight avoidance). Records custodian rides in the contact block.",
  },
  {
    key: "disclosures-variant-chiropractor",
    section: "9.4",
    title: "Chiropractor",
    body: "**{provider_name}, DC** is a doctor of chiropractic who provided chiropractic evaluation, treatment, and care to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of chiropractic treatment provided — including but not limited to spinal manipulation, therapeutic modalities, and rehabilitative therapy — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, physical impairment, and modes of treatment, including but not limited to medical expenses, pain and suffering, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify that the injuries treated were, within a reasonable degree of chiropractic probability, caused by the incident of {incident_date}.",
    notes: "**chiropractic** (not medical) probability — settled. No default future-treatment claims (add via per-provider notes when applicable). Most frequent LOP-gate variant.",
  },
  {
    key: "disclosures-variant-pain-management",
    section: "9.5",
    title: "Pain management",
    body: "**{provider_name}, {credential}** is a physician specializing in pain management who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of pain management treatment provided — including but not limited to medication management, injections, and other interventional procedures — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.",
    notes: "**future medicals live here by default** (Strahan v. Davis — reasonable-probability standard, no retained expert required); strike via wizard when no future-care story. Interview card asks which interventional procedures (ESIs, RFAs, blocks). Frequent LOP-gate variant.",
  },
  {
    key: "disclosures-variant-orthopedic-surgeon",
    section: "9.6",
    title: "Orthopedic surgeon",
    body: "**{provider_name}, {credential}** is a board-certified orthopedic surgeon who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of orthopedic treatment provided or recommended — {treatment_clause} — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care{future_care_clause}, and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.",
    notes: "\"board-certified\" only when the credentials dossier supports it (card logic §4). \"Provided **or recommended**\" is deliberate — covers the recommended-but-unperformed surgery, usually the largest future-damages number. Treatment checklist: evaluation, imaging review, conservative care, injections, surgery performed (+ named procedure).",
  },
  {
    key: "disclosures-variant-neurosurgeon",
    section: "9.7",
    title: "Neurosurgeon",
    body: "**{provider_name}, {credential}** is a board-certified neurosurgeon who treats surgical disorders of the brain, spine, and peripheral nerves, and who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of neurosurgical care provided or recommended — {treatment_clause} — the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish. Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care{future_care_clause}, and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.",
    notes: "scope sentence (\"brain, spine, and peripheral nerves\") kept deliberately — differentiates from ortho against cumulative-expert objections; ortho+neuro-on-same-case soft nudge fires here.",
  },
  {
    key: "disclosures-variant-primary-care-family-practice",
    section: "9.8",
    title: "Primary care / family practice",
    body: "**{provider_name}, {credential}** is a {specialty_descriptor} physician who provided evaluation and treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. {provider_dr_name} will testify based on {provider_his_her} personal examination and treatment of {client}, {provider_his_her} review of {client}'s medical records and diagnostic imaging, and {provider_his_her} medical knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the examination findings, the diagnosis, the course of treatment provided or recommended — {treatment_clause} — the referrals made for specialized care, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding the care and treatment provided, {client}'s condition, injuries, damages, prognosis, and modes of treatment, including but not limited to medical expenses, medical treatment, pain and suffering, physical impairment, and mental anguish.{baseline_clause} Plaintiff anticipates {provider_dr_name} will testify regarding {client}'s need for future medical care{future_care_clause}, and its reasonable cost, and that the injuries treated were, within a reasonable degree of medical probability, caused by the incident of {incident_date}.",
    notes: "referral sentence is fixed text (rebuts attorney-directed-treatment themes; SB 30 defense-discovery agenda) — strike when no referrals. Baseline = pre-existing-condition rebuttal; soft note that designation opens the full chart.",
  },
  {
    key: "disclosures-variant-physical-therapist",
    section: "9.9",
    title: "Physical therapist",
    body: "**{provider_name}, PT, DPT** is a licensed physical therapist who provided physical therapy and rehabilitative treatment to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}, pursuant to referral from {referring_provider}. {provider_dr_name} will testify based on {provider_his_her} personal evaluation and treatment of {client}, {provider_his_her} review of {client}'s medical records, and {provider_his_her} knowledge gained from education, training, experience, and research. {provider_dr_name} will testify regarding {client}'s presentation and complaints, the initial functional evaluation, the course of therapy provided — {treatment_clause} — {client}'s objectively measured functional limitations, {client}'s progress and response to treatment over the course of therapy, the reasonableness and necessity of that treatment, and the reasonableness and necessity of its cost. Plaintiff anticipates {provider_dr_name} will give testimony in the form of facts and opinions regarding {client}'s functional capacity, physical limitations, and physical impairment resulting from the injuries treated, including but not limited to the therapy provided, medical expenses, and pain observed and reported during treatment. Plaintiff anticipates {provider_dr_name} will testify that {client}'s functional limitations and impairments observed during treatment were consistent with the injuries {client_he_she} sustained in the incident of {incident_date}.",
    notes: "impairment is the headline (objective measurements); \"consistent with\" causation; NO diagnosis, NO mental anguish, NO future-cost projections. Referral phrase strikable. Checklist: therapeutic exercise, manual therapy, modalities, gait training, home exercise program, FCE. PTs never ride the mid-level rider.",
  },
  {
    key: "disclosures-variant-pharmacy",
    section: "9.10",
    title: "Pharmacy",
    body: "**{pharmacy_name}**, by and through its pharmacist(s) and/or Custodian of Records, dispensed medications prescribed to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. The pharmacist(s) and/or Custodian of Records will testify regarding the medications dispensed to {client}, the prescribing providers, the dates of dispensing, the charges for those medications, and the reasonableness of those charges, and that the records of {pharmacy_name} are kept in the regular course of business.",
    notes: "",
  },
  {
    key: "disclosures-variant-custodian-of-records-only",
    section: "9.11",
    title: "Custodian-of-records-only",
    body: "The Custodian of Records for **{facility_name}** has knowledge of the medical records and billing records of {facility_name} pertaining to the care and treatment provided to {client} for the injuries {client_he_she} sustained in the {incident_type} on {incident_date}. The Custodian will testify that such records were made and kept in the regular course of business of {facility_name}, by persons with knowledge of the acts and events recorded, at or near the time of the acts and events recorded, and regarding the charges reflected in those records and the reasonableness of those charges.",
    notes: "cross-references the § 18.001 affidavit tracker — wizard shows \"18.001 affidavit on file ✓\" and defaults this variant to INCLUDED for such facilities (belt-and-suspenders for the pending Ortiz v. Nelapatla partially-controverted-affidavit question).",
  },
  {
    key: "disclosures-variant-mid-level-rider",
    section: "9.12",
    title: "Mid-level rider (attaches beneath the supervising physician's paragraph)",
    body: "**{midlevel_name}, {midlevel_credential}** participated in the care and treatment of {client} under the supervision of {supervising_provider}, and will testify consistent with, and within the scope of, the testimony described above regarding {supervising_provider}, based on {midlevel_his_her} personal participation in {client}'s care.",
    notes: "eligible credentials PA, PA-C, NP, FNP, MA. \"Within the scope of\" caps the rider at the physician's described testimony. PTs excluded (full variant 9.9).",
  },
];

/**
 * §9.8's conditional baseline clause, carried verbatim from the spec line that
 * defines it. Rendered only when the PCP interview card answers "treated before
 * the incident" = Yes (§4 item 4).
 */
export const BASELINE_CLAUSE_SPEC = "`{baseline_clause}` when pre-incident treatment = Yes: *\"Having treated {client} both before and after the incident, {provider_dr_name} will also testify regarding {client}'s physical condition and health prior to the incident and the changes in {client}'s condition following it.\"*";

/**
 * §9's closing paragraph, verbatim. Stated here so the absence is legible as a
 * decision rather than as an oversight.
 */
export const DELIBERATE_GAP = "**No mental-health variant exists, intentionally.** The Richardson Motorsports hard gate (§5.1) routes any treating psychologist/psychiatrist designation to manual, case-by-case drafting. This absence is stated here so a future session doesn't \"helpfully\" fill the gap.";

/** Variant keys, for the wizard's picker. */
export const VARIANT_KEYS = DISCLOSURE_VARIANTS.map((v) => v.key);

export function variantByKey(key: string): DisclosureVariant | undefined {
  return DISCLOSURE_VARIANTS.find((v) => v.key === key);
}
