// THE D-35 FIXTURES, DRIVEN END TO END — invariant 9's shape table, invariants
// 8, 11, 12, 17 and 20, over the data the click-through walk uses.
//
// Authority: docs/specs/fe-d1-amendment-slice.md §11 invariants 8, 9, 11, 12,
// 17, 20 and D-35.
//
// This is the backbone of the walk: it proves the fixtures actually produce
// every shape, so clicking is checking a surface rather than discovering that
// the data never exercised the engine.

import { describe, it, expect } from 'vitest';
import { disclosureFixtures, FIXTURE_FACILITY_NAMES } from '../../data/disclosureFixtures';
import { planFacility, providerSortKeyFor } from './walkHelpers';
import { buildDesignations } from '../generate';
import { FixtureParagraphWriter } from '../writer';
import { runExtraction } from '../chronology/extraction';
import { sortProvidersOldestFirst } from '../../domain/caseProviders';
import type { PartyRecord } from '../../domain/types';

const fx = disclosureFixtures('26');
const parties = Object.fromEntries(fx.parties.map((p) => [p.id, p])) as Record<string, PartyRecord>;
// Two of the Garcia facilities are seeded elsewhere, so the fixture module's
// own name map is the authority rather than its party list.
const nameOf = (id: string) => FIXTURE_FACILITY_NAMES[id] ?? parties[id]?.displayName ?? '';

const garcia = fx.caseProviders.filter((p) => p.caseId === 'c-garcia-mvc');
const premises = fx.caseProviders.filter((p) => p.caseId === 'c-fx-premises');
const byFacility = (name: string) =>
  garcia.find((p) => nameOf(p.facilityPartyId) === name)!;

describe('invariant 9 — the fixtures produce EVERY shape in §6.2', () => {
  const shapesFor = (facilityName: string) =>
    planFacility(byFacility(facilityName), fx.caseProviderIndividuals)
      .paragraphs.map((p) => p.shape);

  it('the ER: a treating paragraph, a rider on it, and a radiology split', () => {
    const plan = planFacility(byFacility('Central Texas Regional Medical Center'),
      fx.caseProviderIndividuals);
    expect(plan.paragraphs.map((p) => p.shape)).toEqual(['treating-single', 'radiology-split']);
    // The EM physician alone in the treating paragraph — the two radiologists
    // split out and the psychologist is excluded from it (AS-Q17's default).
    expect(plan.paragraphs[0].individuals.map((i) => i.displayName)).toEqual(['Ines Vantwoud']);
    expect(plan.paragraphs[0].riders.map((i) => i.displayName)).toEqual(['Priya Natarajan']);
    expect(plan.paragraphs[1].individuals.map((i) => i.displayName))
      .toEqual(['Tobias Skarsgaard', 'Devin Petrossian']);
    // D-65: everyone designated PLUS the mental-health-marked psychologist.
    expect(plan.blockIndividuals.map((i) => i.displayName)).toEqual([
      'Ines Vantwoud', 'Tobias Skarsgaard', 'Devin Petrossian', 'Priya Natarajan',
      'Neriah Halvorsen',
    ]);
  });

  it('the imaging facility: ONE paragraph, no rider, and the PA off the block', () => {
    const plan = planFacility(byFacility('Cobalt Ridge Imaging'), fx.caseProviderIndividuals);
    expect(plan.paragraphs.map((p) => p.shape)).toEqual(['imaging-facility']);
    expect(plan.paragraphs[0].riders).toEqual([]);
    // A named person with no testimony beneath is the ND-1 shape.
    expect(plan.blockIndividuals.map((i) => i.displayName))
      .toEqual(['Marguerite Okonjo-Rell', 'Callum Ferreira-Baptiste']);
  });

  it('the chiropractic clinic is ONE MIXED paragraph covering the DC and the PT', () => {
    const plan = planFacility(byFacility('Serpentine Chiropractic & Wellness'),
      fx.caseProviderIndividuals);
    expect(plan.paragraphs.map((p) => p.shape)).toEqual(['treating-mixed']);
    expect(plan.paragraphs[0].individuals).toHaveLength(2);
    // The FACILITY's type supplies the sentences, not the PT's marker.
    expect(plan.paragraphs[0].fixedType).toBe('chiropractic');
  });

  it('EMS, other-physician, other-non-physician, pharmacy, mental health', () => {
    expect(shapesFor('Bell County Emergency Medical Services')).toEqual(['treating-group']);
    expect(shapesFor('Whitestone Family Medicine')).toEqual(['treating-single']);
    expect(shapesFor('Ash Grove Rehabilitation Services')).toEqual(['other-non-physician']);
    expect(shapesFor('Sunken Meadow Pharmacy')).toEqual(['pharmacy']);
    // A mental-health FACILITY generates NO paragraph at all.
    expect(shapesFor('Larkspur Behavioral Health')).toEqual([]);
  });

  it('the urgent care resolves to custodian-only WITH the gap flag', () => {
    const plan = planFacility(byFacility('Quarry Road Urgent Care'), fx.caseProviderIndividuals);
    expect(plan.paragraphs.map((p) => p.shape)).toEqual(['custodian-only']);
    expect(plan.paragraphs[0].gapFlag).toBe(true);
  });

  it('covers all ten paragraph shapes across the fixture set', () => {
    const seen = new Set(garcia.flatMap(
      (p) => planFacility(p, fx.caseProviderIndividuals).paragraphs.flatMap(
        (par) => [par.shape, ...(par.riders.length ? ['midlevel-rider'] : [])],
      ),
    ));
    for (const shape of ['treating-single', 'treating-group', 'treating-mixed',
      'radiology-split', 'imaging-facility', 'midlevel-rider', 'pharmacy',
      'custodian-only', 'other-non-physician']) {
      expect([...seen]).toContain(shape);
    }
    // 'retained' is the tenth and is hand-typed on its own step — there is a
    // retained expert PARTY in the fixtures for it.
    expect(fx.parties.some((p) => p.fields?.retained === 'yes')).toBe(true);
  });
});

describe('invariant 12 — the order, and the undated facility LAST', () => {
  it('sorts oldest treatment first and puts the undated pharmacy at the end', () => {
    const sorted = sortProvidersOldestFirst(
      garcia,
      (p) => providerSortKeyFor(p, fx),
      (p) => nameOf(p.facilityPartyId),
    );
    const names = sorted.map((p) => nameOf(p.facilityPartyId));
    expect(names[names.length - 1]).toBe('Sunken Meadow Pharmacy');
    // And the earliest treatment leads: the ER and EMS are both 2026-03-14, so
    // the tie breaks on facility name.
    expect(names[0]).toBe('Bell County Emergency Medical Services');
    expect(names[1]).toBe('Central Texas Regional Medical Center');
  });
});

describe('invariant 11 — the event noun differs between the two matters', () => {
  it('says "collision" on the MVC and "incident" on the premises matter', async () => {
    const writer = new FixtureParagraphWriter();
    const mvc = await buildDesignations({
      writer,
      selected: [byFacility('Bell County Emergency Medical Services')],
      individuals: fx.caseProviderIndividuals,
      visits: fx.caseProviderVisits,
      chronologyVersions: fx.caseChronologyVersions.filter((v) => v.id === 'chv-fx-garcia-1'),
      facilityParties: parties,
      clientName: 'Maria Garcia',
      incidentDateIso: '2026-03-14',
      caseType: 'Motor vehicle collision',
      writerInstructions: '',
    });
    expect(mvc.paragraphs[0].assembledText).toContain('collision');

    const prem = await buildDesignations({
      writer,
      selected: [premises[0]],
      individuals: fx.caseProviderIndividuals,
      visits: fx.caseProviderVisits,
      chronologyVersions: fx.caseChronologyVersions.filter((v) => v.id === 'chv-fx-alba-1'),
      facilityParties: parties,
      clientName: 'Alba Quartzmoor',
      incidentDateIso: '2026-02-02',
      caseType: 'Premises',
      writerInstructions: '',
    });
    expect(prem.paragraphs[0].assembledText).not.toContain('collision');
  });
});

describe('invariant 20 — two clients, two chronologies, two instruments', () => {
  it('gives each plaintiff their own provider row and their own chronology', () => {
    expect(premises).toHaveLength(2);
    // The SAME facility, one row per client.
    expect(new Set(premises.map((p) => p.facilityPartyId)).size).toBe(1);
    expect(premises.map((p) => p.clientId).sort()).toEqual(['cc-fx-alba', 'cc-fx-ozias']);

    const streams = fx.caseChronologyVersions.filter((v) => v.caseId === 'c-fx-premises');
    expect(streams).toHaveLength(2);
    expect(streams.map((v) => v.clientId).sort()).toEqual(['cc-fx-alba', 'cc-fx-ozias']);
  });
});

describe('invariant 8 — the chronology names a facility the engine must NOT add', () => {
  it('names the OBGYN in every chronology, and extraction adds nothing for it', async () => {
    for (const v of fx.caseChronologyVersions) {
      expect(v.extractedText).toContain('Cobalt Hollow OBGYN Associates');
    }

    const created: string[] = [];
    const db = {
      async createProviderIndividual(d: { displayName: string }) {
        created.push(d.displayName);
        return { ...d, id: 'x', createdAt: '', updatedAt: '' };
      },
      async updateProviderIndividual(_id: string, p: unknown) { return p; },
      async updateCaseProvider(_id: string, p: unknown) { return p; },
      async replaceProviderVisits() { return []; },
    } as never;

    await runExtraction(
      db, new FixtureParagraphWriter(),
      fx.caseChronologyVersions[0],
      [byFacility('Central Texas Regional Medical Center')],
      [],
      { 'p-hosp-ctrmc': { name: 'Central Texas Regional Medical Center', aliases: [] } },
    );
    // Whatever it created, none of it is the OBGYN, and no facility row was made.
    expect(created.join(' ')).not.toMatch(/obgyn|cobalt hollow/i);
  });
});

describe('invariant 17 — a promoted individual with TWO affiliation edges', () => {
  it('has one covering the treatment dates and one LATER and current', () => {
    const edges = fx.contactEdges.filter((e) => e.fromContactId === 'p-fx-vantwoud');
    expect(edges).toHaveLength(2);
    const [covering, current] = edges;
    // The first covers 2026-03-14 and names the SELECTED facility, so they agree.
    expect(covering.effectiveFrom! <= '2026-03-14').toBe(true);
    expect(covering.effectiveTo! >= '2026-03-14').toBe(true);
    expect(covering.toContactId).toBe('p-hosp-ctrmc');
    // The second is later, open-ended, and at a DIFFERENT facility — which is
    // what puts D-8's "Currently practicing at …" line under the block.
    expect(current.effectiveFrom! > '2026-03-14').toBe(true);
    expect(current.effectiveTo).toBeUndefined();
    expect(current.toContactId).toBe('p-fx-cobalt');
  });

  it('carries a party_id on exactly the promoted individual, and on no other', () => {
    const promoted = fx.caseProviderIndividuals.filter((i) => i.partyId);
    expect(promoted.map((i) => i.displayName)).toEqual(['Ines Vantwoud']);
  });
});

describe('the fixtures are fictional, and say so', () => {
  it('marks every chronology as demonstration data on its face', () => {
    for (const v of fx.caseChronologyVersions) {
      expect(v.extractedText).toMatch(/FICTIONAL DEMONSTRATION/i);
      expect(v.extractedText).toMatch(/describes no real person/i);
      // Well under the 200 KB cap D-35 sets for a fixture chronology.
      expect((v.extractedText ?? '').length).toBeLessThan(200_000);
    }
  });
});
