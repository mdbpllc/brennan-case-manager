// The 13 REAL Phase 0 pilot recordings as routing-engine fixtures — verbatim
// Parakeet-TDT-0.6b-v3 int8/CPU output (the floor configuration), scored
// against the ground-truth scripts. Fictional content throughout; audio and
// findings docs live at ..\data\pilot-recordings\ outside the repo.
//
// Each assertion encodes what the design pass (§§3–4) says SHOULD happen on
// that recording, so these tests are the design's acceptance criteria running
// against real transcription noise.
import { describe, expect, it } from 'vitest';
import { inferRouting } from '../../engine';
import { extractIdentifierRuns } from '../../normalizer';
import { PILOT_CTX } from './pilotUniverse';
import batch1Json from './transcripts-batch1.json';
import batch2Json from './transcripts-batch2.json';

interface Batch1Entry { duration_sec: number; text: string }
interface Batch2Entry { dur: number; text: string }

const batch1 = batch1Json as unknown as Record<string, Batch1Entry>;
const batch2 = batch2Json as unknown as Record<string, Batch2Entry>;

// batch2 files are content-addressed take names; map them to their scripts.
const SCRIPT1_TAG_BATTERY = batch2['bb8aa477take1.wav'].text;
const SCRIPT2_IDENTIFIER_BATTERY = batch2['2ee2dce0take2.wav'].text;
const SCRIPT3_TASK_DICTATION = batch2['0f6f3bd2take3.wav'].text;
const SCRIPT4_TWO_PERSON = batch2['3722ec07take4.wav'].text;
const SCRIPT5_FREEFORM = batch2['258cb0f1take5.wav'].text;

describe('pilot batch 1 — unscripted recordings (int8/CPU floor)', () => {
  it('rec_5: clean spoken tag routes the Robert Jones matter at high confidence', () => {
    const [best] = inferRouting({ text: batch1['rec_5.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBe('c-jones');
    expect(best.confidence).toBe('high');
    expect(best.contextType).toBe('dictation');
  });

  it('rec_8: "the Jester for Stot" still routes to Hernandez — template survives, slots fuzzy', () => {
    // Ground truth: "This is a call with the adjuster for State Farm on the
    // Hernandez matter." The carrier garbled beyond recovery; the template
    // anchors anyway and the matter slot resolves. Design §3's core claim.
    const [best] = inferRouting({ text: batch1['rec_8.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBe('c-hernandez');
    expect(best.confidence).toBe('high');
    expect(best.contextType).toBe('adjuster_call');
  });

  it('rec_7: fully garbled claim-number tag degrades to unroutable, type still inferred', () => {
    const [best] = inferRouting({ text: batch1['rec_7.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
    expect(best.contextType).toBe('dictation');
  });

  it('rec_9: "note for later" tag + a client mention = medium content-inferred suggestion', () => {
    // The tag deliberately names no matter, but "Mr. Jones ... authority on
    // settlement" is one strong signal — suggest, never auto-commit.
    const [best] = inferRouting({ text: batch1['rec_9.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBe('c-jones');
    expect(best.confidence).toBe('medium');
    expect(best.contextType).toBe('dictation');
  });

  it('rec_4: personal note routes nowhere', () => {
    const [best] = inferRouting({ text: batch1['rec_4.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
  });

  it('rec_3: casual two-person conversation routes nowhere', () => {
    const [best] = inferRouting({ text: batch1['rec_3.wav'].text, speakerCount: 2 }, PILOT_CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
  });

  it('rec_6: multilingual token-bleed failure is unroutable, not a crash', () => {
    const [best] = inferRouting({ text: batch1['rec_6.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
  });

  it('rec_10: far-field normalizer recovers the digit string but nothing matches the known list', () => {
    // Finding 4: "twenty twenty five CI zero four nine six two" → 2025CI04962.
    // No open matter carries that number, so the item stays unroutable —
    // fuzzy matching is against a KNOWN list, never a guess.
    expect(extractIdentifierRuns(batch1['rec_10.wav'].text)).toContain('2025CI04962');
    const [best] = inferRouting({ text: batch1['rec_10.wav'].text, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
  });
});

describe('pilot batch 2 — scripted takes with ground truth', () => {
  it('script 1 (tag battery): opening tag wins — Ramirez dictation, high, with the perfect cause number', () => {
    const all = inferRouting({ text: SCRIPT1_TAG_BATTERY, speakerCount: 1 }, PILOT_CTX);
    const best = all[0];
    expect(best.caseId).toBe('c-ramirez');
    expect(best.confidence).toBe('high');
    expect(best.contextType).toBe('dictation');
    expect(best.signals.some((s) => s.kind === 'identifier_match')).toBe(true);
    // The other five tags' matters surface as alternatives, not silence.
    expect(all.length).toBeGreaterThan(1);
    expect(all.slice(1).every((s) => s.caseId !== 'c-ramirez')).toBe(true);
  });

  it('script 2 (identifier battery): eaten opening, garbled claim — still Ramirez at high confidence', () => {
    // Scorecard: cause number LOST to the eaten opening; claim number came
    // through as "Harty three eight eight one two K seven nine". The claim
    // fuzzy-match plus names (Webb, Farmers, Vasquez, Mission Trace, Doyle)
    // and the perfect phone number pile onto one case.
    const [best] = inferRouting({ text: SCRIPT2_IDENTIFIER_BATTERY, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBe('c-ramirez');
    expect(best.confidence).toBe('high');
    expect(best.signals.some((s) => s.kind === 'identifier_match' && s.resolvedTo.includes('43-8812-K79'))).toBe(true);
    expect(best.signals.some((s) => s.kind === 'phone_match')).toBe(true);
  });

  it('script 3 (task dictation): eaten opening, but the tag anchors mid-stream — Ramirez, high', () => {
    const [best] = inferRouting({ text: SCRIPT3_TASK_DICTATION, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBe('c-ramirez');
    expect(best.confidence).toBe('high');
    expect(best.contextType).toBe('dictation');
  });

  it('script 4 (two-person meeting): no tag; client + doctor + carrier converge on Ramirez', () => {
    const [best] = inferRouting({ text: SCRIPT4_TWO_PERSON, speakerCount: 2 }, PILOT_CTX);
    expect(best.caseId).toBe('c-ramirez');
    expect(best.confidence).toBe('high');
    // Known cue limitation: the meeting discusses "the deposition," so the
    // type-only lexical cue reads deposition. Type is correctable at confirm;
    // the case routing is what must be right.
    expect(best.contextType).toBe('deposition');
  });

  it('script 5 (freeform software-project note): routes nowhere', () => {
    const [best] = inferRouting({ text: SCRIPT5_FREEFORM, speakerCount: 1 }, PILOT_CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
  });
});
