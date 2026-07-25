import { describe, expect, it } from 'vitest';
import { inferRouting } from '../engine';
import { CTX } from './fixtures';

describe('inferRouting — tag-first (design §3)', () => {
  it('resolves a tagged dictation to its case at high confidence', () => {
    const [best] = inferRouting(
      { text: 'This is a dictation for the Garcia matter. Follow up on the preservation letters to Allied Freight.', speakerCount: 1 },
      CTX,
    );
    expect(best.caseId).toBe('c-garcia');
    expect(best.confidence).toBe('high');
    expect(best.contextType).toBe('dictation');
    expect(best.signals.some((s) => s.kind === 'tag_template')).toBe(true);
  });

  it('applies the witness-interview template with case + type in one utterance', () => {
    const [best] = inferRouting(
      { text: 'Witness interview, Garcia versus Allied Freight Lines. Speaking with Ray Caldwell about the collision.', speakerCount: 2 },
      CTX,
    );
    expect(best.caseId).toBe('c-garcia');
    expect(best.confidence).toBe('high');
    expect(best.contextType).toBe('witness_interview');
  });

  it('routes a "note to file on cause number …" tag through the identifier matcher', () => {
    const [best] = inferRouting(
      { text: 'Note to file on cause number twenty six C R zero one four five one. Spoke with the prosecutor about the interlock condition.', speakerCount: 1 },
      CTX,
    );
    expect(best.caseId).toBe('c-boyd');
    expect(best.contextType).toBe('dictation');
    expect(best.signals.some((s) => s.kind === 'identifier_match')).toBe(true);
  });
});

describe('inferRouting — content inference (design §4)', () => {
  it('reaches high confidence on two independent strong signals for one case', () => {
    const [best] = inferRouting(
      { text: 'Yeah, this is Dana Pruitt with Statewide Mutual about the water mitigation claim out at Winding Creek. We got the supplement invoice.', speakerCount: 2 },
      CTX,
    );
    // Pruitt + Statewide sit on two files, but the caption words break the tie.
    expect(best.caseId).toBe('c-servpro');
    expect(best.confidence).toBe('high');
  });

  it('surfaces the shared-adjuster file as a visible alternative', () => {
    const all = inferRouting(
      { text: 'This is Dana Pruitt with Statewide Mutual about the Winding Creek claim.', speakerCount: 2 },
      CTX,
    );
    expect(all[0].caseId).toBe('c-servpro');
    expect(all.slice(1).map((s) => s.caseId)).toContain('c-garcia');
  });

  it('gives medium confidence on a single strong signal', () => {
    const [best] = inferRouting(
      { text: 'Spoke with Terrence Boyd today about the plea offer and the interlock condition.', speakerCount: 1 },
      CTX,
    );
    expect(best.caseId).toBe('c-boyd');
    expect(best.confidence).toBe('medium');
  });

  it('adds the carrier+adjuster co-occurrence signal (medium)', () => {
    const [best] = inferRouting(
      { text: 'Adjuster call. Dana Pruitt with Statewide Mutual on the Garcia claim, she will have numbers Thursday.', speakerCount: 2 },
      CTX,
    );
    expect(best.caseId).toBe('c-garcia');
    expect(best.signals.some((s) => s.kind === 'carrier_adjuster_cooccurrence')).toBe(true);
    expect(best.contextType).toBe('adjuster_call');
  });

  it('matches a spoken phone number to a contact (medium)', () => {
    const [best] = inferRouting(
      { text: 'Left a message at two five four five five five zero one nine nine for the eyewitness follow-up.', speakerCount: 1 },
      CTX,
    );
    expect(best.caseId).toBe('c-garcia'); // Caldwell's number; he sits on Garcia
    expect(best.signals.some((s) => s.kind === 'phone_match')).toBe(true);
  });

  it('returns unroutable-low when nothing matches, with type-only hints', () => {
    const [best] = inferRouting(
      { text: 'Note for later. Look into the CLE deadline and the office printer contract.', speakerCount: 1 },
      CTX,
    );
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
    expect(best.contextType).toBe('dictation');
  });

  it('never auto-commits on weak evidence — speaker count alone routes nothing', () => {
    const [best] = inferRouting({ text: 'Okay so let me think through the schedule for next week.', speakerCount: 1 }, CTX);
    expect(best.caseId).toBeUndefined();
    expect(best.confidence).toBe('low');
  });
});
