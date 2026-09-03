// INVARIANT 1 — fixed-sentence drift (fe-d1-amendment-slice.md §11 item 1).
//
// `RC-1` made §9's basis and causation sentences the text the APP places. That
// makes them approved text living in two places at once — the spec and the
// generated constant — which is precisely the condition that produces drift and
// then a served document carrying words Michael never approved. This is what
// holds them together: the spec is re-read here and every row must still be a
// byte-exact SLICE of it, taken at the anchors §6.4 names.
//
// The rows are the GENERATED CONSTANT, never the store's current row — D-63.
// A fixed sentence Michael edits in `/templates` is placed as edited and this
// test stays green, because what it guards is the SEED's fidelity to the spec.

import { describe, it, expect } from 'vitest';
import specText from '../../../docs/specs/form-engine.md?raw';
import { FIXED_SENTENCES, fixedSentence, FIXED_PAIR_SOURCE_TYPES } from '../fixedSentences';
import { variantByKey } from '../variants';

const BASIS_OPENERS = [
  '{provider_dr_name} will testify based on',
  '{provider_they} will testify based on',
];
const CAUSE_OPENERS = [
  'Plaintiff anticipates {provider_dr_name} will testify that',
  'Plaintiff anticipates {provider_they} will testify that',
];

describe('the fixed-sentence table', () => {
  it('carries the ten typed pairs plus the rider and the custodian-only whole', () => {
    expect(FIXED_SENTENCES).toHaveLength(22);
    expect(FIXED_SENTENCES.filter((f) => f.slot === 'basis')).toHaveLength(10);
    expect(FIXED_SENTENCES.filter((f) => f.slot === 'causation')).toHaveLength(10);
    expect(FIXED_SENTENCES.filter((f) => f.slot === 'rider-scope')).toHaveLength(1);
    expect(FIXED_SENTENCES.filter((f) => f.slot === 'custodian-only-whole')).toHaveLength(1);
  });

  it('keys every row uniquely as fixed:<slot>:<type>', () => {
    const keys = FIXED_SENTENCES.map((f) => f.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const f of FIXED_SENTENCES) {
      expect(f.key).toBe(`fixed:${f.slot}:${f.providerType}`);
    }
  });

  // The four types that place NO fixed sentence, by ruling: a pharmacy paragraph
  // is the writer's whole (AS-Q7b), mental health generates no paragraph at all
  // (AS-Q5), other-licensed-non-physician degrades rather than inventing a
  // causation line (AS-Q5), and a retained expert's paragraph is hand-typed.
  it('places no fixed sentence for pharmacy, mental health, other-non-physician or retained', () => {
    for (const type of ['pharmacy', 'mental-health', 'other-non-physician', 'retained']) {
      expect(FIXED_SENTENCES.filter((f) => f.providerType === type)).toEqual([]);
    }
  });

  it('covers exactly the types that own a fixed pair', () => {
    expect(FIXED_PAIR_SOURCE_TYPES).toEqual([
      'emergency-medicine', 'pain-management', 'orthopedic-surgery', 'neurosurgery',
      'primary-care', 'chiropractic', 'physical-therapy', 'prehospital-ems',
      'radiologist', 'other-physician',
    ]);
    for (const type of FIXED_PAIR_SOURCE_TYPES) {
      expect(fixedSentence('basis', type)).toBeDefined();
      expect(fixedSentence('causation', type)).toBeDefined();
    }
  });
});

describe('every fixed sentence is still a byte-exact slice of the spec at HEAD', () => {
  it('appears verbatim in form-engine.md §9', () => {
    // Every row but one is a pure SLICE of an approved paragraph. The rider is
    // the exception BY RULING: AS-Q8c approved a sentence whose subject is the
    // mid-level's rendered short name, so only its TAIL is §9.12 text. That
    // tail is checked just below, and the equality is asserted again against
    // the approved body further down.
    for (const f of FIXED_SENTENCES.filter((x) => x.slot !== 'rider-scope')) {
      expect(
        specText.includes(f.text),
        `${f.key} (from §${f.sourceSection}) is no longer a byte-exact slice of the spec`,
      ).toBe(true);
    }
  });

  it('carries the rider\'s approved TAIL verbatim, its subject aside', () => {
    const rider = fixedSentence('rider-scope', 'mid-level')!;
    const tail = rider.text.slice(rider.text.indexOf('will testify consistent with'));
    expect(specText.includes(tail), 'the rider tail drifted from §9.12').toBe(true);
    expect(rider.text.startsWith('{midlevel_short_name} ')).toBe(true);
  });

  // `includes` alone would accept a slice that merely STARTS somewhere valid, so
  // the anchors are asserted too: a short slice is a wrong slice.
  it('opens and closes on §6.4\'s anchors', () => {
    for (const f of FIXED_SENTENCES.filter((x) => x.slot === 'basis')) {
      expect(BASIS_OPENERS.some((o) => f.text.startsWith(o)), `${f.key} opener`).toBe(true);
      expect(f.text.endsWith('research.'), `${f.key} closer`).toBe(true);
    }
    for (const f of FIXED_SENTENCES.filter((x) => x.slot === 'causation')) {
      expect(CAUSE_OPENERS.some((o) => f.text.startsWith(o)), `${f.key} opener`).toBe(true);
      expect(f.text.endsWith('{incident_date}.'), `${f.key} closer`).toBe(true);
    }
  });
});

describe('the equalities §6.4 states, asserted rather than trusted', () => {
  // The 2026-08-31 ruling: "Get rid of chiropractic probability and replace with
  // medical probability." Its consequence is that the chiropractor's causation
  // sentence became identical to the treating line — so if the two ever diverge
  // again, the ruling has been undone somewhere.
  it('§9.4\'s causation sentence equals §9.1\'s', () => {
    expect(fixedSentence('causation', 'chiropractic')!.text)
      .toBe(fixedSentence('causation', 'emergency-medicine')!.text);
  });

  it('pain, ortho, neuro and PCP share one basis sentence', () => {
    const pain = fixedSentence('basis', 'pain-management')!.text;
    for (const type of ['orthopedic-surgery', 'neurosurgery', 'primary-care']) {
      expect(fixedSentence('basis', type)!.text).toBe(pain);
    }
  });

  // AS-Q8a: those four borrow §9.1's causation because their OWN last sentence
  // carries a future-care clause, and future care belongs in the writer's
  // middle. This asserts the borrowing actually happened.
  it('pain, ortho, neuro and PCP borrow §9.1\'s causation, not their own', () => {
    const em = fixedSentence('causation', 'emergency-medicine')!.text;
    for (const type of ['pain-management', 'orthopedic-surgery', 'neurosurgery', 'primary-care']) {
      const row = fixedSentence('causation', type)!;
      expect(row.sourceSection).toBe('9.1');
      expect(row.text).toBe(em);
      expect(row.text).not.toContain('future medical care');
    }
  });

  it('the rider\'s tail is §9.12 verbatim from "will testify consistent with"', () => {
    const rider = fixedSentence('rider-scope', 'mid-level')!.text;
    const approved = variantByKey('disclosures-variant-mid-level-rider')!.body;
    const tail = approved.slice(approved.indexOf('will testify consistent with'));
    expect(rider).toBe(`{midlevel_short_name} ${tail}`);
  });

  it('the custodian-only row is §9.11 whole, emphasis included', () => {
    const custodian = fixedSentence('custodian-only-whole', 'custodian-only')!.text;
    expect(custodian).toBe(variantByKey('disclosures-variant-custodian-of-records-only')!.body);
    // §9.11's own `**` emphasis is placed as written — it is that shape's LEAD.
    expect(custodian).toContain('**{facility_name}**');
  });

  // §9.3's EMT causation is the one line that renders the event noun, and it is
  // deliberately "consistent with" rather than a probability standard.
  it('§9.3\'s causation keeps {incident_type} and its "consistent with" standard', () => {
    const ems = fixedSentence('causation', 'prehospital-ems')!.text;
    expect(ems).toContain('{incident_type}');
    expect(ems).toContain('consistent with');
    expect(ems).not.toContain('reasonable degree of medical probability');
  });
});
