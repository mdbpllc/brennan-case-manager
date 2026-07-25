import { describe, expect, it } from 'vitest';
import { matchTagTemplate } from '../templates';
import { TEMPLATES } from './fixtures';

describe('matchTagTemplate', () => {
  it('matches a clean dictation tag and captures the matter slot', () => {
    const m = matchTagTemplate(
      'This is a dictation for the Garcia matter. Following up on the preservation letters.',
      TEMPLATES,
    );
    expect(m).not.toBeNull();
    expect(m?.template.contextType).toBe('dictation');
    expect(m?.slots.matter).toContain('garcia');
  });

  it('survives garbled slot entities inside an intact template (pilot pattern)', () => {
    // "Garcia" transcribed as "Garseea" — template literals still anchor.
    const m = matchTagTemplate(
      'This is a dictation for the Garseea matter, note the follow up items below.',
      TEMPLATES,
    );
    expect(m).not.toBeNull();
    expect(m?.slots.matter).toContain('garseea');
  });

  it('tolerates transcription noise in the literal itself', () => {
    // "dictation" → "dictations" (1 edit on an 8+ char token).
    const m = matchTagTemplate(
      'This is a dictations for the Boyd matter.',
      TEMPLATES,
    );
    expect(m).not.toBeNull();
    expect(m?.template.contextType).toBe('dictation');
  });

  it('matches the witness-interview template and flags discoverability', () => {
    const m = matchTagTemplate(
      'Witness interview, Garcia versus Allied Freight Lines. Speaking with Ray Caldwell.',
      TEMPLATES,
    );
    expect(m).not.toBeNull();
    expect(m?.template.appliesDiscoverable).toBe(true);
    expect(m?.slots.matter).toContain('garcia');
  });

  it('matches the adjuster-call phrasing with two slots', () => {
    const m = matchTagTemplate(
      'This is a call with the adjuster for Statewide Mutual on the Garcia matter.',
      TEMPLATES,
    );
    expect(m).not.toBeNull();
    expect(m?.template.contextType).toBe('adjuster_call');
    expect(m?.slots.carrier).toContain('statewide');
    expect(m?.slots.matter).toContain('garcia');
  });

  it('matches the bare "note for later" tag (no slots)', () => {
    const m = matchTagTemplate('Note for later. Pick up the CLE materials.', TEMPLATES);
    expect(m).not.toBeNull();
    expect(m?.template.pattern).toBe('note for later');
  });

  it('returns null when the opening carries no tag', () => {
    const m = matchTagTemplate(
      'Yeah hi, returning your call about the water mitigation claim, we got the invoice.',
      TEMPLATES,
    );
    expect(m).toBeNull();
  });

  it('ignores tag-like phrasing that appears only late in the recording', () => {
    const filler = 'so as I was saying earlier about the scheduling question and the other items we discussed on Tuesday, ';
    const m = matchTagTemplate(
      filler.repeat(4) + 'this is a dictation for the Garcia matter.',
      TEMPLATES,
    );
    expect(m).toBeNull();
  });
});
