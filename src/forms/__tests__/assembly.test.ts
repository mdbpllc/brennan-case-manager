// APP ASSEMBLY — the shapes, the slot order, the plural, the event noun, the
// block, and the promise that nothing reads inside a writer part.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §6, §8.4, and §11 invariants
// 2, 3, 9, 10, 11, 22 and 23.
//
// The adversarial test in "invariant 3" is the important one in this file. It
// feeds the writer's parts everything that would tempt an app to look inside —
// the app's own fixed sentence, a wrong date, markdown, a live token, raw XML
// characters — and asserts the result is EXACT CONCATENATION with the app's
// sentences unchanged. Michael ruled Option 1 for a reason, and this is what
// keeps a later session from adding a "helpful" check.

import { describe, it, expect } from 'vitest';
import assemblySource from '../assembly.ts?raw';
import {
  assembleParagraph, custodianLine, eventNoun, fillSentence, isDoctoral,
  midlevelShortName, MOTOR_VEHICLE_CASE_TYPES, orderParagraphs, planFacility,
  renderNames, tokenValues,
} from '../assembly';
import { fixedSentence } from '../fixedSentences';
import type { CaseProvider, CaseProviderIndividual } from '../../domain/caseProviders';
import type { ProviderTypeKey } from '../providerTypes';

const T = '2026-09-03T00:00:00.000Z';

function facility(providerType?: ProviderTypeKey, over: Partial<CaseProvider> = {}): CaseProvider {
  return {
    id: 'cp1', caseId: 'c1', facilityPartyId: 'f1', providerType,
    lop: false, createdAt: T, updatedAt: T, ...over,
  };
}

let seq = 0;
function person(over: Partial<CaseProviderIndividual> = {}): CaseProviderIndividual {
  seq += 1;
  return {
    id: `i${seq}`, caseProviderId: 'cp1', displayName: `Person ${seq}`,
    provenance: 'model', missingFromLatest: false, handEditedFields: [],
    sortOrder: seq, createdAt: T, updatedAt: T, ...over,
  };
}

const CTX = {
  clientName: 'Alba Quartzmoor',
  clientPronoun: 'she',
  incidentDateIso: '2025-03-14',
  caseType: 'Motor vehicle collision',
  facilityName: 'Halite Regional Hospital',
};

// ------------------------------------------------------------- invariant 2

describe('invariant 2 — the slot order, and causation LAST', () => {
  it('assembles LEAD, opening, BASIS, middle, CAUSATION, in that order', () => {
    const ind = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.', pronoun: 'she' });
    const plan = planFacility(facility('emergency-medicine'), [ind]).paragraphs[0];
    const out = assembleParagraph(plan, CTX, { opening: 'OPENING.', middle: 'MIDDLE.' });

    const basis = fillSentence(fixedSentence('basis', 'emergency-medicine')!.text,
      tokenValues(CTX, [ind]));
    const causation = fillSentence(fixedSentence('causation', 'emergency-medicine')!.text,
      tokenValues(CTX, [ind]));

    expect(out.assembledText).toBe(
      `${out.leadText} OPENING. ${basis} MIDDLE. ${causation}`,
    );
    // "Always last" is the load-bearing half of the ruling.
    expect(out.assembledText.endsWith(causation)).toBe(true);
  });

  it('gives the rider TWO slots and NO lead (D-41)', () => {
    const pa = person({ displayName: 'Priya Natarajan', credentialSuffix: 'PA-C', pronoun: 'she' });
    const doc = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' });
    const plan = planFacility(facility('emergency-medicine'), [doc, pa]).paragraphs[0];
    const rider = { ...plan, shape: 'midlevel-rider' as const, individuals: [pa] };
    const out = assembleParagraph(rider, CTX, { opening: 'WHAT THE PA DID.' }, pa);

    expect(out.leadText).toBeUndefined();
    const scope = fillSentence(fixedSentence('rider-scope', 'mid-level')!.text,
      tokenValues(CTX, [pa], pa));
    expect(out.assembledText).toBe(`WHAT THE PA DID. ${scope}`);
    expect(out.assembledText).toContain('Ms. Natarajan');
  });

  it('places NO fixed sentence in a pharmacy or other-non-physician paragraph', () => {
    const pharmacy = planFacility(facility('pharmacy'), []).paragraphs[0];
    const outP = assembleParagraph(pharmacy, CTX, { body: 'PHARMACY BODY.' });
    expect(outP.fixedSentenceKeys).toEqual([]);
    expect(outP.assembledText).toBe('Halite Regional Hospital, PHARMACY BODY.');

    const onp = planFacility(facility('other-non-physician'), [person()]).paragraphs[0];
    const outO = assembleParagraph(onp, CTX, { body: 'BODY.' });
    expect(outO.fixedSentenceKeys).toEqual([]);
  });

  it('places §9.11 WHOLE for custodian-only, with the clause BETWEEN its sentences', () => {
    // AS-Q7a. The app owns this one, all four limbs are app-guaranteed, and
    // nothing is templated inside or beside §9.11's approved sentences.
    const plan = planFacility(facility('custodian-only'), []).paragraphs[0];
    const whole = fillSentence(fixedSentence('custodian-only-whole', 'custodian-only')!.text,
      tokenValues(CTX, []));
    const cut = whole.indexOf('. ');
    const first = whole.slice(0, cut + 1);
    const second = whole.slice(cut + 2);

    const withClause = assembleParagraph(plan, CTX, { care_episode_clause: 'CLAUSE.' });
    expect(withClause.assembledText).toBe(`${first} CLAUSE. ${second}`);

    const without = assembleParagraph(plan, CTX, {});
    expect(without.assembledText).toBe(whole);
  });
});

// ------------------------------------------------------------- invariant 3

describe('invariant 3 — NOTHING reads inside a writer part', () => {
  it('imports no lint or analysis over the parts (structural)', () => {
    // The assembler's inputs are opaque strings and its module has no way to
    // inspect them, which is a property of the FILE and not of one code path.
    expect(assemblySource).not.toMatch(/from '\.\/lint'/);
    expect(assemblySource).not.toMatch(/lintRender|lintXmlSafety|lintNumbering/);
  });

  it('assembles hostile parts by EXACT concatenation, unchanged', () => {
    const ind = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.', pronoun: 'she' });
    const plan = planFacility(facility('emergency-medicine'), [ind]).paragraphs[0];

    // Everything that would tempt an app to look inside: the app's OWN fixed
    // sentence restated, a date that contradicts the record, the event noun for
    // the wrong case type, markdown, a live token, and raw XML characters.
    const basisText = fixedSentence('basis', 'emergency-medicine')!.text;
    const hostile = {
      opening: `${basisText} On January 1, 1999 the collision **happened**.`,
      middle: 'Contains {client} and a literal { brace and & < > characters.',
    };
    const out = assembleParagraph(plan, CTX, hostile);

    // The parts come through byte-for-byte. Not escaped here — escaping happens
    // at the XML boundary — not stripped, not normalised, not flagged.
    expect(out.assembledText).toContain(hostile.opening);
    expect(out.assembledText).toContain(hostile.middle);
    expect(out.assembledText).toContain('**happened**');
    expect(out.assembledText).toContain('{client}');
    expect(out.assembledText).toContain('& < >');
    expect(out.assembledText).toContain('January 1, 1999');

    // And the app's own sentences are placed unchanged beside them — the app's
    // {client} resolved, the writer's {client} did not.
    const values = tokenValues(CTX, [ind]);
    expect(out.assembledText).toContain(fillSentence(basisText, values));
    expect(out.assembledText).toContain('March 14, 2025');
  });

  it('trims a part and turns its newlines into spaces, and does nothing else (D-2)', () => {
    const plan = planFacility(facility('emergency-medicine'), [person()]).paragraphs[0];
    const out = assembleParagraph(plan, CTX, {
      opening: '  line one\n   line two  ', middle: 'M.',
    });
    expect(out.assembledText).toContain('line one line two');
  });
});

// ---------------------------------------------------------- invariants 9/22

describe('invariants 9 and 22 — the shapes, and who lands on the block', () => {
  it('ER with an EM physician, two radiologists, a PA and a mental-health marker', () => {
    const em = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' });
    const r1 = person({ displayName: 'Tobias Skarsgaard', roleMarker: 'radiologist' });
    const r2 = person({ displayName: 'Devin Petrossian', roleMarker: 'radiologist' });
    const pa = person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level' });
    const psy = person({ displayName: 'Neriah Halvorsen', roleMarker: 'mental-health' });

    const plan = planFacility(facility('emergency-medicine'), [em, r1, r2, pa, psy]);
    const shapes = plan.paragraphs.map((p) => p.shape);

    expect(shapes).toEqual(['treating-single', 'radiology-split']);
    // The treating paragraph carries the EM physician ALONE — the radiologists
    // split out and the mental-health marker is excluded from the paragraph and
    // its LEAD (AS-Q17's default).
    expect(plan.paragraphs[0].individuals.map((i) => i.displayName)).toEqual(['Ines Vantwoud']);
    expect(plan.paragraphs[1].individuals).toHaveLength(2);
    // The rider rides the TREATING paragraph and never the radiology one.
    expect(plan.paragraphs[0].riders.map((i) => i.displayName)).toEqual(['Priya Natarajan']);
    expect(plan.paragraphs[1].riders).toEqual([]);
    // D-65: everyone designated, PLUS the mental-health individual.
    expect(plan.blockIndividuals.map((i) => i.displayName)).toContain('Neriah Halvorsen');
    expect(plan.blockIndividuals).toHaveLength(5);
  });

  it('an ALL-radiologist facility yields the radiology paragraph ALONE, no rider, PA off the block', () => {
    // D-16, and the reason is not mechanical: a rider under the radiology
    // paragraph would tie the PA's testimony scope to the radiologists' reads.
    const r1 = person({ displayName: 'Tobias Skarsgaard', roleMarker: 'radiologist' });
    const pa = person({ displayName: 'Priya Natarajan', roleMarker: 'mid-level' });
    const plan = planFacility(facility('emergency-medicine'), [r1, pa]);

    expect(plan.paragraphs.map((p) => p.shape)).toEqual(['radiology-split']);
    expect(plan.paragraphs[0].riders).toEqual([]);
    // A named person with no testimony beneath is the ND-1 shape, so the
    // mid-level is not on the block either.
    expect(plan.blockIndividuals.map((i) => i.displayName)).toEqual(['Tobias Skarsgaard']);
  });

  it('a chiropractic clinic with a DC and a PT is ONE mixed paragraph, no rider', () => {
    const dc = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'D.C.' });
    const pt = person({ displayName: 'Callum Ferreira-Baptiste', roleMarker: 'physical-therapy' });
    const plan = planFacility(facility('chiropractic'), [dc, pt]);
    expect(plan.paragraphs.map((p) => p.shape)).toEqual(['treating-mixed']);
    expect(plan.paragraphs[0].individuals).toHaveLength(2);
    // The FACILITY's type supplies the sentences (§17.1a), not the markers'.
    expect(plan.paragraphs[0].fixedType).toBe('chiropractic');
  });

  it('a same-type pair is a GROUP, not a mixed paragraph', () => {
    const a = person({ credentialSuffix: 'M.D.' });
    const b = person({ credentialSuffix: 'D.O.' });
    expect(planFacility(facility('pain-management'), [a, b]).paragraphs[0].shape)
      .toBe('treating-group');
  });

  it('an imaging facility takes §9.2 pair; with nobody named it falls to custodian-only', () => {
    const rad = person({ displayName: 'Tobias Skarsgaard' });
    const withName = planFacility(facility('radiologist'), [rad]);
    expect(withName.paragraphs[0].shape).toBe('imaging-facility');
    expect(withName.paragraphs[0].fixedType).toBe('radiologist');

    const empty = planFacility(facility('radiologist'), []);
    expect(empty.paragraphs[0].shape).toBe('custodian-only');
    expect(empty.paragraphs[0].gapFlag).toBe(true);
  });

  it('a treating facility with nobody to name falls to custodian-only WITH the gap flag', () => {
    const empty = planFacility(facility('emergency-medicine'), []);
    expect(empty.paragraphs[0].shape).toBe('custodian-only');
    expect(empty.paragraphs[0].gapFlag).toBe(true);
    // A TYPED custodian-only facility is not a FALLBACK and carries no flag.
    expect(planFacility(facility('custodian-only'), []).paragraphs[0].gapFlag).toBe(false);
  });

  it('a MENTAL-HEALTH facility generates NO paragraph and still renders its block', () => {
    const p = person({ displayName: 'Neriah Halvorsen' });
    const plan = planFacility(facility('mental-health'), [p]);
    expect(plan.paragraphs).toEqual([]);
    expect(plan.handDrafted).toBe(true);
    expect(plan.blockIndividuals).toHaveLength(1);
  });

  it('a pharmacy names NOBODY on its block even with hand-added people (D-46)', () => {
    const p = person({ displayName: 'Osvaldo Quillane', provenance: 'hand' });
    const plan = planFacility(facility('pharmacy'), [p]);
    expect(plan.paragraphs.map((s) => s.shape)).toEqual(['pharmacy']);
    expect(plan.blockIndividuals).toEqual([]);
  });

  it('EXCLUDES a soft-deleted individual from every one of those decisions (D-55)', () => {
    const gone = person({ displayName: 'Removed Person', removedByHandAt: T });
    const plan = planFacility(facility('emergency-medicine'), [gone]);
    expect(plan.paragraphs[0].shape).toBe('custodian-only');
    expect(plan.blockIndividuals).toEqual([]);
  });

  it('orders the radiology paragraph AFTER the treating one (§8.4)', () => {
    const em = person({ credentialSuffix: 'M.D.' });
    const rad = person({ roleMarker: 'radiologist' });
    const ordered = orderParagraphs(planFacility(facility('primary-care'), [rad, em]).paragraphs);
    expect(ordered.map((p) => p.shape)).toEqual(['treating-single', 'radiology-split']);
  });
});

// ------------------------------------------------------ invariants 10/11/23

describe('invariant 10 — plural, and D-21s honorific rule', () => {
  it('renders one name plainly and a doctoral pair as "Drs. A and B", no Oxford comma', () => {
    const a = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' });
    const b = person({ displayName: 'Tobias Skarsgaard', credentialSuffix: 'D.O.' });
    const c = person({ displayName: 'Devin Petrossian', credentialSuffix: 'D.C.' });

    expect(renderNames([a]).provider_dr_name).toBe('Dr. Vantwoud');
    expect(renderNames([a, b, c]).provider_name).toBe('Drs. Vantwoud, Skarsgaard and Petrossian');
    expect(renderNames([a, b, c]).provider_name).not.toContain(', and');
  });

  it('drops the honorific entirely when the credentials are MIXED', () => {
    // A shared "Drs." would be wrong about somebody, which is the whole reason
    // the rule is "every member" rather than "any member".
    const md = person({ displayName: 'Ines Vantwoud', credentialSuffix: 'M.D.' });
    const pt = person({ displayName: 'Callum Halvorsen', credentialSuffix: 'PT' });
    const out = renderNames([md, pt]).provider_name;
    expect(out).toBe('Ines Vantwoud, M.D. and Callum Halvorsen, PT');
    expect(out).not.toContain('Drs.');
  });

  it('uses the full name when the credential is not doctoral, and DPT is not (D-49)', () => {
    expect(isDoctoral('M.D.')).toBe(true);
    expect(isDoctoral('PsyD')).toBe(true);
    expect(isDoctoral('DPT')).toBe(false);      // deliberately, pending hands-on
    expect(isDoctoral(undefined)).toBe(false);
    expect(renderNames([person({ displayName: 'Callum Reyes', credentialSuffix: 'DPT' })])
      .provider_dr_name).toBe('Callum Reyes');
  });

  it('gives the LEAD ONE comma when the credential is NULL (D-42)', () => {
    const noCred = person({ displayName: 'Jane Doe', credentialSuffix: undefined });
    const plan = planFacility(facility('emergency-medicine'), [noCred]).paragraphs[0];
    const out = assembleParagraph(plan, CTX, { opening: 'x', middle: 'y' });
    expect(out.leadText).toBe('Jane Doe,');
    expect(out.leadText).not.toContain(', ,');
  });

  it('inflects the fixed sentence by count, and agrees the verb with the subject', () => {
    const one = tokenValues(CTX, [person({ pronoun: 'he' })]);
    expect(one.s).toBe('');
    expect(one.verb_s).toBe('s');
    expect(one.provider_they).toBe('he');

    const many = tokenValues(CTX, [person({ pronoun: 'he' }), person({ pronoun: 'she' })]);
    expect(many.s).toBe('s');
    expect(many.verb_s).toBe('');
    expect(many.provider_they).toBe('they');
  });

  it('renders the rider subject per D-50 and falls back to the full name', () => {
    expect(midlevelShortName(person({ displayName: 'Priya Natarajan', pronoun: 'she' })))
      .toBe('Ms. Natarajan');
    expect(midlevelShortName(person({ displayName: 'Devin Petrossian', pronoun: 'he' })))
      .toBe('Mr. Petrossian');
    expect(midlevelShortName(person({ displayName: 'Osvaldo Quillane' })))
      .toBe('Osvaldo Quillane');
  });
});

describe('invariant 11 — the event noun', () => {
  it('says "collision" for a motor-vehicle case and "incident" for everything else', () => {
    expect(eventNoun('Motor vehicle collision')).toBe('collision');
    expect(eventNoun('TTCA — Motor Vehicle')).toBe('collision');
    expect(eventNoun('Premises')).toBe('incident');
    expect(eventNoun('Dangerous animal')).toBe('incident');
    expect(eventNoun(undefined)).toBe('incident');
  });

  it('names case types that actually exist in CASE_TYPE_DEFS', async () => {
    // The constant is keyed on the DISPLAY NAME because CASE_TYPE_DEFS is flat
    // and has no key. A typo would silently make every MVC read "incident".
    const { CASE_TYPE_DEFS } = await import('../../domain/caseTypes');
    const all = Object.values(CASE_TYPE_DEFS).flat().map((t) => t.name);
    for (const name of MOTOR_VEHICLE_CASE_TYPES) expect(all).toContain(name);
  });

  it('puts the noun into the EMS fixed sentence, which carries {incident_type}', () => {
    const emt = person({ displayName: 'Devin Petrossian', credentialSuffix: 'EMT-P' });
    const values = tokenValues({ ...CTX, caseType: 'Premises' }, [emt]);
    const text = fillSentence(fixedSentence('causation', 'prehospital-ems')!.text, values);
    expect(text).toContain('incident');
    expect(text).not.toContain('collision');
    expect(text).toContain('March 14, 2025');
  });

  it('renders the incident date long-form from the date parts, with no timezone', () => {
    const values = tokenValues(CTX, [person()]);
    expect(values.incident_date).toBe('March 14, 2025');
  });
});

describe('invariant 23 — the block strings by N (D-64)', () => {
  it('matches the literals exactly at 0, 1 and 2, and for a pharmacy', () => {
    expect(custodianLine(0, false)).toBe('Custodian of Records');
    expect(custodianLine(1, false)).toBe('And/or Custodian of Records');
    expect(custodianLine(2, false)).toBe('And/or Custodians of Records');
    expect(custodianLine(5, false)).toBe('And/or Custodians of Records');
    expect(custodianLine(0, true)).toBe('Pharmacist(s) and/or Custodian of Records');
    expect(custodianLine(3, true)).toBe('Pharmacist(s) and/or Custodian of Records');
  });
});

// ------------------------------------------- the docx mechanics the ruling names

describe('#147 — the split, the rider, and the bold LEAD, as docx mechanics', () => {
  // The master renders ONE narrative per region item, so two paragraphs cannot
  // be two ITEMS (that would print the facility's block twice). Michael ruled:
  // clone the archetype's own <w:p> once per paragraph, fabricating no XML.
  const ARCHETYPE =
    '<w:p><w:pPr><w:jc w:val="both"/></w:pPr>'
    + '<w:r><w:rPr><w:b/><w:bCs/></w:rPr><w:t>ORIGINAL NARRATIVE</w:t></w:r></w:p>';

  it('clones the archetype once per paragraph, keeping its own pPr each time', async () => {
    const { setParagraphRuns } = await import('../docx');
    const two = [ARCHETYPE, ARCHETYPE]
      .map((t, i) => setParagraphRuns(t, [`PARAGRAPH ${i + 1}`])).join('');
    expect((two.match(/<w:p>/g) ?? []).length).toBe(2);
    expect((two.match(/<w:jc w:val="both"\/>/g) ?? []).length).toBe(2);
    expect(two).toContain('PARAGRAPH 1');
    expect(two).toContain('PARAGRAPH 2');
    expect(two).not.toContain('ORIGINAL NARRATIVE');
  });

  it('places the LEAD as its OWN bold run and leaves the body run as the master had it', async () => {
    const { setParagraphLeadAndBody } = await import('../docx');
    const out = setParagraphLeadAndBody(ARCHETYPE, 'Ines Vantwoud, M.D.,', 'is a physician who…');

    // Two runs where the master had one; the paragraph's own pPr untouched.
    expect((out.match(/<w:r>/g) ?? []).length).toBe(2);
    expect(out).toContain('<w:jc w:val="both"/>');
    expect(out).toContain('Ines Vantwoud, M.D.,');
    expect(out).toContain('is a physician who…');
    // The lead's run says bold ITSELF rather than inheriting it, so it stays
    // bold if Michael later makes the narrative body roman (CC-1(b)).
    const leadRun = /<w:r>[\s\S]*?<\/w:r>/.exec(out)![0];
    expect(leadRun).toContain('<w:b/>');
    expect(leadRun).toContain('Ines Vantwoud');
  });

  it('escapes XML in both the lead and the body', async () => {
    const { setParagraphLeadAndBody } = await import('../docx');
    const out = setParagraphLeadAndBody(ARCHETYPE, 'Ram & Sons,', 'treated <the> patient');
    expect(out).toContain('Ram &amp; Sons,');
    expect(out).toContain('&lt;the&gt;');
  });

  it('adds keepNext without disturbing an existing pPr (§12.11)', async () => {
    const { withKeepNext } = await import('../docx');
    const out = withKeepNext(ARCHETYPE);
    expect(out).toContain('<w:keepNext/>');
    expect(out).toContain('<w:jc w:val="both"/>');
    expect(out.indexOf('<w:keepNext/>')).toBeLessThan(out.indexOf('</w:pPr>'));
    // Idempotent — a paragraph already kept is not given a second one.
    expect((withKeepNext(out).match(/<w:keepNext\/>/g) ?? []).length).toBe(1);
  });

  it('opens a pPr when the paragraph has none', async () => {
    const { withKeepNext } = await import('../docx');
    const out = withKeepNext('<w:p><w:r><w:t>x</w:t></w:r></w:p>');
    expect(out).toContain('<w:pPr><w:keepNext/></w:pPr>');
    expect(out.indexOf('<w:pPr>')).toBeLessThan(out.indexOf('<w:r>'));
  });
});
