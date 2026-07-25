// OAA-based criminal matter intake — domain types.
// Spec: docs/specs/criminal-appointment-intake-and-docket-enhancements.md (§1–2).
// Tier 1 (Uvalde/Real digital form) is deterministic text extraction and ships
// now; Tier 2 (scanned packets: segmentation, OCR, handwriting) is gated on
// the local AI hardware (P1) — same posture as billing 1b and transcript T3.

/** One charged offense on a criminal matter. The Tier 1 form's offense table
 *  repeats per row (multi-cause support), so charges are child records of the
 *  case rather than fields on it. */
export interface Charge {
  id: string;
  caseId: string;
  offense: string; // as printed, e.g. "POSS CS PG 2 < 1G"
  degree?: string; // as printed, e.g. "FS", "F2", "MA" — no legal outcome is computed from it
  offenseDate?: string; // ISO date
  court?: string;
  causeNumber?: string;
  complaintNumber?: string;
  /** MTR/MTA checked on the form → the setting/track is revocation-adjudication,
   *  not a new charge (spec §1a semantic mapping). */
  mtrMta: boolean;
  appeal: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

/** Audit record of an OAA intake: which template ran, on what text, and what
 *  it extracted (with provenance). Kept so a reviewed draft can always be
 *  traced back to what the document actually said. */
export interface OaaIntakeRecord {
  id: string;
  caseId: string;
  templateKey: string; // e.g. 'uvalde-real-v1', or 'manual' for the Tier 2 stub path
  tier: 1 | 2;
  county?: string;
  sourceFileName?: string;
  extractedText: string;
  /** JSON of the OaaExtraction the review started from (field → value/confidence/provenance). */
  fieldsJson: string;
  createdAt: string;
}

// ---------- Extraction shapes (engine output — not persisted directly) ----------

export type ExtractionConfidence = 'high' | 'low';

export interface ExtractedField {
  value: string;
  confidence: ExtractionConfidence;
  /** Where it came from, e.g. `line 14: "DOB: 09/22/1994"` — keeps review fast. */
  provenance: string;
}

export interface ExtractedCharge {
  offense: string;
  degree?: string;
  offenseDate?: string; // ISO
  court?: string;
  causeNumber?: string;
  complaintNumber?: string;
  mtrMta: boolean;
  appeal: boolean;
  confidence: ExtractionConfidence;
  provenance: string;
}

export interface OaaExtraction {
  templateKey: string;
  tier: 1 | 2;
  defendantName?: ExtractedField;
  county?: ExtractedField;
  court?: ExtractedField;
  localId?: ExtractedField;
  dob?: ExtractedField;
  phone?: ExtractedField;
  address?: ExtractedField;
  cityStateZip?: ExtractedField;
  custodyLocation?: ExtractedField;
  indigencyStatus?: ExtractedField;
  attorneyName?: ExtractedField;
  attorneyPhone?: ExtractedField;
  attorneyFax?: ExtractedField;
  /** From the remarks line: `ATTORNEY AVAILABLE FOR DOCKET ON <date>` — a
   *  docket availability date, NOT a confirmed hearing setting (spec §2). */
  docketAvailability?: ExtractedField;
  appointmentDate?: ExtractedField;
  appointmentDesignee?: ExtractedField;
  remarks?: ExtractedField;
  /** Scope paragraph (appointment through MNT + notice of appeal) — stored as
   *  a note, no field extraction (spec §1a). */
  scopeNote?: ExtractedField;
  charges: ExtractedCharge[];
}

// ---------- Candidate settings (hearing auto-detect, spec §2) ----------

export type SettingKind = 'confirmed_setting' | 'docket_availability' | 'administrative';

export interface CandidateSetting {
  kind: SettingKind;
  /** Naive local "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm" (calendar layer convention). */
  startLocal: string;
  allDay: boolean;
  label: string;
  provenance: string;
  /** Stale-date guard (spec §2.3): past dates are case history, never calendared. */
  inPast: boolean;
  /** Tier 1 + unambiguous + future → pre-checked in review, still shown visibly.
   *  Tier 2 and administrative dates are never auto-created. */
  autoCreate: boolean;
}
