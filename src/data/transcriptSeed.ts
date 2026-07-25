// Demo seed data for the transcript sort & route slice. Entirely fictional,
// consistent with the v0.1 seed universe (Garcia MVC, Boyd DWI, Servpro lien).
// Staging-item suggestions are computed by the REAL routing engine at seed
// time, so demo mode exercises the same code path the pipeline will feed.
import type { CaseRecord, PartyRecord, CasePartyLink } from '../domain/types';
import type {
  Transcript, TranscriptParticipant, StagingItem, RoutingDecision,
  GlossaryTerm, TagTemplate,
} from '../domain/transcripts';
import { SEED_TAG_TEMPLATES } from '../routing/templates';
import { inferRouting } from '../routing/engine';

const t = new Date().toISOString();

export function transcriptSeedData(base: {
  cases: CaseRecord[]; parties: PartyRecord[]; links: CasePartyLink[];
}): {
  transcripts: Transcript[];
  transcriptParticipants: TranscriptParticipant[];
  stagingItems: StagingItem[];
  routingDecisions: RoutingDecision[];
  glossaryTerms: GlossaryTerm[];
  tagTemplates: TagTemplate[];
} {
  const tagTemplates: TagTemplate[] = SEED_TAG_TEMPLATES.map((tpl, i) => ({ ...tpl, id: `tt-${i + 1}` }));
  const ctx = { ...base, templates: tagTemplates };

  // Firm-wide glossary seed — the scripted test's exact miss list (design §2).
  const glossaryTerms: GlossaryTerm[] = [
    { id: 'gt-1', term: 'Stowers', scope: 'firm', weight: 1 },
    { id: 'gt-2', term: 'counter-affidavit', scope: 'firm', weight: 1 },
    { id: 'gt-3', term: 'MSJ', scope: 'firm', weight: 1 },
    { id: 'gt-4', term: 'LOR', scope: 'firm', weight: 1 },
    { id: 'gt-5', term: 'TPPCA', scope: 'firm', weight: 1 },
  ];

  // --- One already-confirmed transcript on the Garcia case (Transcripts tab demo) ---
  const filed: Transcript = {
    id: 'tr-garcia-adjuster-0710',
    caseIds: ['c-garcia-mvc'],
    audioRef: 'OneDrive/Cases/26-0001/audio/2026-07-10-adjuster-call.opus',
    audioHash: 'demo-3f2a9c81', durationSeconds: 412,
    recordedAt: '2026-07-10T14:22:00', source: 'recorder',
    engine: 'parakeet-tdt-0.6b-v3',
    text: 'This is a call with the adjuster for Statewide Mutual on the Garcia matter. '
      + 'Dana Pruitt speaking. We have reviewed the demand package on the Garcia claim. '
      + 'We are not disputing liability on this one, but we have questions about the '
      + 'chiropractic charges from ProCare. Our evaluation should be complete by August first. '
      + '(Fictional demo transcript.)',
    status: 'unprocessed', verified: false,
    contextType: 'adjuster_call', consentStatus: 'one-party', outOfStateParticipant: 'no',
    privilegeTier: 'non-privileged', phiFlag: false, discoverableFlag: false,
    summary: 'Adjuster acknowledges demand received; liability not disputed; questions on ProCare charges; evaluation promised by 8/1.',
    createdAt: t, updatedAt: t,
  };
  const transcriptParticipants: TranscriptParticipant[] = [
    { id: 'tp-1', transcriptId: filed.id, speakerLabel: 'SPEAKER_00', displayName: 'Michael' },
    { id: 'tp-2', transcriptId: filed.id, speakerLabel: 'SPEAKER_01', partyId: 'p-adj-pruitt', mappingConfidence: 0.94 },
  ];

  // --- Pending staging items, each with a draft transcript ---
  // Draft transcripts stay caseless until Michael confirms (nothing files silently).
  const draft = (id: string, text: string, extra: Partial<Transcript>): Transcript => ({
    id, caseIds: [], source: 'manual', engine: 'parakeet-tdt-0.6b-v3',
    text, status: 'unprocessed', verified: false,
    contextType: 'dictation', consentStatus: 'unknown', outOfStateParticipant: 'unknown',
    privilegeTier: 'work-product', phiFlag: false, discoverableFlag: false,
    createdAt: t, updatedAt: t, ...extra,
  });

  const pending: { transcript: Transcript; speakerCount: number; item: Omit<StagingItem, 'suggestions'> }[] = [
    {
      // High confidence: tag template resolves case + type in one utterance.
      transcript: draft('tr-stage-dict-garcia',
        'This is a dictation for the Garcia matter. Following up on the preservation '
        + 'letters to Allied Freight — the ELD and telematics data request needs a '
        + 'response deadline on the calendar, and I want a task to draft the LOR to '
        + 'Central Texas Regional. (Fictional demo transcript.)',
        { recordedAt: '2026-07-24T18:05:00', durationSeconds: 96 }),
      speakerCount: 1,
      item: {
        id: 'st-dict-garcia', audioHash: 'demo-a11b22c3', source: 'recorder',
        durationSeconds: 96, recordedAt: '2026-07-24T18:05:00',
        transcriptId: 'tr-stage-dict-garcia', advisories: [], status: 'pending', createdAt: t,
      },
    },
    {
      // Content inference: no tag; adjuster + carrier + caption words point at
      // the Servpro file, with Garcia as a visible alternative (same adjuster).
      transcript: draft('tr-stage-adj-servpro',
        'Yeah, this is Dana Pruitt with Statewide Mutual returning your call on the '
        + 'water mitigation claim out at Winding Creek. We got the supplement invoice '
        + 'and the mechanics lien notice. I can talk numbers Thursday. You can reach me '
        + 'direct at eight zero zero five five five zero one seven seven extension two one four. '
        + '(Fictional demo transcript.)',
        { recordedAt: '2026-07-23T10:41:00', durationSeconds: 233, source: 'phone' }),
      speakerCount: 2,
      item: {
        id: 'st-adj-servpro', audioHash: 'demo-b44c55d6', source: 'phone',
        durationSeconds: 233, recordedAt: '2026-07-23T10:41:00',
        transcriptId: 'tr-stage-adj-servpro', advisories: ['No spoken tag detected — routed by content inference.'],
        status: 'pending', createdAt: t,
      },
    },
    {
      // Witness-interview template: auto-applies the presumptively-discoverable pre-fill.
      transcript: draft('tr-stage-wit-caldwell',
        'Witness interview, Garcia versus Allied Freight Lines. Speaking with Ray '
        + 'Caldwell. Mr. Caldwell, you were two cars behind the collision on State '
        + 'Highway one ninety five — tell me what you saw that morning. '
        + '(Fictional demo transcript.)',
        { recordedAt: '2026-07-22T15:30:00', durationSeconds: 1108 }),
      speakerCount: 2,
      item: {
        id: 'st-wit-caldwell', audioHash: 'demo-c77d88e9', source: 'recorder',
        durationSeconds: 1108, recordedAt: '2026-07-22T15:30:00',
        transcriptId: 'tr-stage-wit-caldwell', advisories: [], status: 'pending', createdAt: t,
      },
    },
    {
      // Identifier match: cause number spoken as digit words, normalized and
      // matched against the known list at edit distance ≤2 (one digit garbled).
      transcript: draft('tr-stage-note-boyd',
        'Note to file on cause number twenty six C R zero one four five one. Spoke '
        + 'with the prosecutor about the interlock condition — she will take the two '
        + 'year nondisclosure clock question to her chief. Follow up before the next '
        + 'setting. (Fictional demo transcript.)',
        { recordedAt: '2026-07-21T09:12:00', durationSeconds: 58 }),
      speakerCount: 1,
      item: {
        id: 'st-note-boyd', audioHash: 'demo-d00e11f2', source: 'recorder',
        durationSeconds: 58, recordedAt: '2026-07-21T09:12:00',
        transcriptId: 'tr-stage-note-boyd', advisories: [], status: 'pending', createdAt: t,
      },
    },
    {
      // Unroutable: no case candidate — asks for manual assignment.
      transcript: draft('tr-stage-note-later',
        'Note for later. Look into the CLE deadline for this compliance year and '
        + 'whether the ethics hours carry over. Also the office printer contract '
        + 'renews next month. (Fictional demo transcript.)',
        { recordedAt: '2026-07-24T07:58:00', durationSeconds: 31 }),
      speakerCount: 1,
      item: {
        id: 'st-note-later', audioHash: 'demo-e33f44a5', source: 'manual',
        durationSeconds: 31, recordedAt: '2026-07-24T07:58:00',
        transcriptId: 'tr-stage-note-later', advisories: [], status: 'pending', createdAt: t,
      },
    },
  ];

  const stagingItems: StagingItem[] = pending.map(({ transcript, speakerCount, item }) => ({
    ...item,
    suggestions: inferRouting({ text: transcript.text, speakerCount }, ctx),
  }));

  return {
    transcripts: [filed, ...pending.map((p) => p.transcript)],
    transcriptParticipants,
    stagingItems,
    routingDecisions: [],
    glossaryTerms,
    tagTemplates,
  };
}
