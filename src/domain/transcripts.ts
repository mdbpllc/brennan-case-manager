// Transcript sort & route domain types — feature-intake item A.
// Mirrors docs/specs/transcript-sort-and-route-design.md §7 and the
// Transcript object in docs/specs/transcript-workflows.md §2.

/** Context type drives the downstream workflow and the confirm-time
 *  privilege/PHI pre-fills. transcript-workflows.md §2 enum plus
 *  'dictation' for note-to-file/dictation recordings (design §3 templates).
 *  Staff dictation is deliberately absent — multi-user phase (spec 8.5). */
export type TranscriptContextType =
  | 'client_meeting'
  | 'client_call'
  | 'intake_call'
  | 'adjuster_call'
  | 'opposing_counsel_call'
  | 'witness_interview'
  | 'deposition'
  | 'hearing'
  | 'mediation_dictation'
  | 'voicemail'
  | 'dictation';

export const CONTEXT_TYPE_LABELS: Record<TranscriptContextType, string> = {
  client_meeting: 'Client meeting',
  client_call: 'Client phone call',
  intake_call: 'Intake call (PNC)',
  adjuster_call: 'Adjuster call',
  opposing_counsel_call: 'Opposing-counsel call',
  witness_interview: 'Witness interview',
  deposition: 'Deposition',
  hearing: 'Hearing',
  mediation_dictation: 'Mediation-adjacent dictation',
  voicemail: 'Voicemail',
  dictation: 'Dictation / note to file',
};

export type ConsentStatus = 'announced' | 'written' | 'one-party' | 'unknown';
export type PrivilegeTier = 'privileged' | 'work-product' | 'non-privileged';
export type TranscriptReviewStatus = 'unprocessed' | 'auto-summarized' | 'attorney-reviewed';
export type RecordingSource = 'recorder' | 'phone' | 'manual';
export type OutOfStateAnswer = 'yes' | 'no' | 'unknown';

/** One transcribed word with timestamps (seconds into the audio).
 *  Low-confidence spans render as [unclear] in the UI (design §2 quality gates). */
export interface TranscriptWord {
  w: string;
  start: number;
  end: number;
  speaker?: string; // diarization label, e.g. SPEAKER_00
  conf?: number; // 0..1; low values drive the [unclear] rendering
  unclear?: boolean; // foreign-charset runs / low-confidence spans
}

export interface Transcript {
  id: string;
  /** One or more — a recording can touch multiple matters (Split action). */
  caseIds: string[];
  /** OneDrive path/link once filed; unset while in staging. */
  audioRef?: string;
  /** SHA-256 of the original audio — identity is hash+timestamp+duration, never filename. */
  audioHash?: string;
  durationSeconds?: number;
  /** From audio metadata; fallback file mtime. Always preserved. */
  recordedAt?: string;
  source: RecordingSource;
  /** Transcription engine, e.g. 'parakeet-tdt-0.6b-v3' (design D4). */
  engine: string;
  text: string;
  /** Word+timestamp array from the pipeline — enables click-to-play and clip citations. */
  words?: TranscriptWord[];
  status: TranscriptReviewStatus;
  /** Raw machine output vs. human-checked. ONLY Michael sets this in the UI —
   *  nothing programmatic ever flips it (registry rule 2 discipline). */
  verified: boolean;
  contextType: TranscriptContextType;
  consentStatus: ConsentStatus;
  /** The HARD check (transcript-workflows §1.1), asked at confirm time for uploads. */
  outOfStateParticipant: OutOfStateAnswer;
  privilegeTier: PrivilegeTier;
  phiFlag: boolean;
  /** Presumptively discoverable (TRCP 192.3(h) [CONFIRM] — unverified registry entry,
   *  drives warnings only). Auto-on for witness interviews. */
  discoverableFlag: boolean;
  /** Not-case-related recordings keep their content in the Office notes
   *  store instead of being discarded (Michael's O3 decision, 2026-07-25). */
  officeNote?: boolean;
  /** Manual in Phase 1 — no auto-summary. */
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

/** Speaker label → party mapping. displayName covers non-party speakers ("Michael"). */
export interface TranscriptParticipant {
  id: string;
  transcriptId: string;
  speakerLabel: string; // SPEAKER_00, SPEAKER_01, …
  partyId?: string;
  displayName?: string;
  mappingConfidence?: number; // 0..1 when suggested by the routing engine
}

/** What kind of evidence drove a routing suggestion (design §4 signal table). */
export type RoutingSignalKind =
  | 'tag_template'
  | 'name_match'
  | 'identifier_match'
  | 'carrier_adjuster_cooccurrence'
  | 'phone_match'
  | 'lexical_cue'
  | 'speaker_count';

export type SignalWeight = 'strong' | 'medium' | 'weak';

export interface RoutingSignal {
  kind: RoutingSignalKind;
  weight: SignalWeight;
  /** The literal transcript text that matched — highlighted on the inbox card. */
  matchedText: string;
  /** What it resolved to (case caption, party name, canonical identifier…). */
  resolvedTo: string;
  caseId?: string;
  /** Type-only signals (lexical cues, speaker count) suggest a context type, not a case. */
  contextType?: TranscriptContextType;
}

export type ConfidenceBucket = 'high' | 'medium' | 'low';

export interface RoutingSuggestion {
  caseId?: string; // unset = unroutable, ask for manual assignment
  contextType?: TranscriptContextType;
  confidence: ConfidenceBucket;
  score: number; // tunable numeric backing for the bucket
  signals: RoutingSignal[];
}

export type StagingStatus = 'pending' | 'confirmed' | 'dismissed' | 'held';

export interface StagingItem {
  id: string;
  audioHash: string;
  audioRef?: string;
  source: RecordingSource;
  durationSeconds?: number;
  recordedAt?: string;
  /** Draft transcript created at ingest; finalized on Confirm. */
  transcriptId: string;
  /** Ranked suggestions — best first; the rest render as alternatives. */
  suggestions: RoutingSuggestion[];
  /** Advisory notices, not errors: "tag unreadable", diarization caps, etc. */
  advisories: string[];
  status: StagingStatus;
  createdAt: string;
}

export type RoutingAction = 'confirmed' | 'reassigned' | 'split' | 'not-case-related' | 'held';

/** The tuning log (design §5): suggested vs. chosen on every decision —
 *  measures real routing precision and is the evidence for enabling
 *  auto-file later (D1). */
export interface RoutingDecision {
  id: string;
  stagingItemId: string;
  suggestedCaseId?: string;
  suggestedContextType?: TranscriptContextType;
  suggestedConfidence?: ConfidenceBucket;
  chosenCaseIds: string[];
  chosenContextType?: TranscriptContextType;
  action: RoutingAction;
  wasSuggestionAccepted: boolean;
  decidedAt: string;
}

/** Firm-wide glossary terms feed pass-1 vocabulary boosting; per-case terms
 *  join the pass-2 re-decode list (design §2, D3). Per-case name vocabulary
 *  otherwise auto-generates from party records — no rows needed for names. */
export interface GlossaryTerm {
  id: string;
  term: string;
  scope: 'firm' | 'case';
  caseId?: string;
  weight: number;
}

/** Spoken-tag templates are DATA Michael can extend — new phrasings become
 *  rows, not rebuilds (design §3). Slots written as {slot} in the pattern. */
export interface TagTemplate {
  id: string;
  /** e.g. "this is a dictation for the {matter} matter" */
  pattern: string;
  contextType: TranscriptContextType;
  /** Witness-interview templates auto-apply the presumptively-discoverable flag. */
  appliesDiscoverable: boolean;
}

/** Confirm-time pre-fills by context type (design §5, transcript-workflows §1).
 *  Defaults only — Michael can override every field before confirming.
 *  Grounded in UNVERIFIED registry entries; they drive defaults/warnings, never outcomes. */
export function confirmDefaults(contextType: TranscriptContextType): {
  privilegeTier: PrivilegeTier; phiFlag: boolean; discoverableFlag: boolean;
} {
  switch (contextType) {
    case 'client_meeting':
    case 'client_call':
    case 'intake_call':
      return { privilegeTier: 'privileged', phiFlag: false, discoverableFlag: false };
    case 'witness_interview':
      // TRCP 192.3(h) [CONFIRM]: witness statements presumptively discoverable.
      return { privilegeTier: 'non-privileged', phiFlag: false, discoverableFlag: true };
    case 'deposition':
      // Plaintiff depositions default PHI-on (spec 8.4); flag correctable for defendant depos.
      return { privilegeTier: 'non-privileged', phiFlag: true, discoverableFlag: false };
    case 'dictation':
    case 'mediation_dictation':
      return { privilegeTier: 'work-product', phiFlag: false, discoverableFlag: false };
    case 'adjuster_call':
    case 'opposing_counsel_call':
    case 'hearing':
    case 'voicemail':
      return { privilegeTier: 'non-privileged', phiFlag: false, discoverableFlag: false };
  }
}
