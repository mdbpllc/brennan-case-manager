/**
 * THE THREE ENFORCEMENT TIERS (§8, §12.3).
 *
 * Michael ruled the shape of enforcement: ***"Stop and tell me what to do
 * first."*** Three tiers, and the boundaries between them are RULED, not
 * stylistic:
 *
 *  1. **MUST-FIX STOPS — three of them, and they are the ONLY three.** The
 *     generate stops WHOLE and names what to fix. Nothing is transmitted.
 *     §12.3 closed the list by ruling, so a fourth is not this build's to add:
 *     a failed writer call is an ERROR state, not a stop.
 *  2. **`HD-22`** — warns, never blocks. *"let me go ahead."*
 *  3. **The ambient panel** — flags, lists per facility, live in both
 *     directions, and **NEVER blocks**. A line firing on every facility "just
 *     teaches him to ignore warnings" (§11.5), which is why several of these
 *     carry a gate rather than firing whenever they could.
 *
 * ⚠ Every check here runs over RECORDS. Nothing reads a writer part or an
 * assembled paragraph — not for the custodian limbs, not for a date, not for
 * anything (§11.6; the slice's §12).
 */

import {
  activeIndividuals, hasExtractionRun, newestReadableVersion,
  type CaseChronologyVersion, type CaseProvider, type CaseProviderIndividual,
} from '../domain/caseProviders';
import { effectiveMarker, isExtractedType, isTreatingType } from './providerTypes';
import { planFacility } from './assembly';
import { currency } from './grammar';

export type Tier = 'must-fix' | 'warn' | 'panel';

export interface Finding {
  /** §8.2's own numbering, so a line can be traced to the row that ruled it. */
  line: number | 'stop';
  tier: Tier;
  text: string;
  /** Where it is fixed — the stop's "what to fix first". */
  route?: string;
  caseProviderId?: string;
  individualId?: string;
}

export interface TierInput {
  incidentDateIso?: string;
  /** The facilities SELECTED for this instrument. Deselecting one removes its
   *  two stop conditions — Michael's visible act. */
  selected: CaseProvider[];
  individuals: CaseProviderIndividual[];
  facilityNames: Record<string, string>;
  /** `D1` — read from the SELECTED location, not from the party. `hasAddress`
   *  and `hasPhone` answer "does the block get one"; `locationState` answers
   *  WHY not, which is what makes the panel's wording true of the record as
   *  well as of the document (`spec-feedback.md` item 2a's third bullet). */
  facilityAddresses: Record<string, {
    hasAddress: boolean;
    hasPhone: boolean;
    /** `'none'` — the contact record has no locations at all.
     *  `'unselected'` — it has two or more and none is picked for this matter.
     *  `'selected'` — one is resolved (picked, or the only one there is). */
    locationState?: 'none' | 'unselected' | 'selected';
    /** `SD-6` — the resolved location's address was split by rule and he has
     *  not confirmed it. One line per matter, gone once he touches it. */
    unconfirmedSplit?: boolean;
    locationLabel?: string;
  }>;
  chronologyVersions: CaseChronologyVersion[];
  /** Facilities with bills for this client — `ND-7(a)`'s set check. */
  billedFacilityPartyIds: string[];
  /** Billed parties that are INDIVIDUALS and so cannot be a facility row. */
  billedIndividualPartyNames?: string[];
  /** `R1` (ND-7(c), RULED 2026-09-05: *"c"* → *"Take c1."*) — the party TYPE of
   *  each billed party, read through the CALLER's `partyById`. This is the key
   *  the three tiers turn on, and it is a key that already exists: the party
   *  model distinguishes `providerBusiness` ("Facility") from `business`, so no
   *  new concept, no migration and no new party type is needed. A party whose
   *  type is UNKNOWN here is never escalated — absence of information is not
   *  evidence, and a stop raised on it would be a stop he cannot clear. */
  billedPartyTypes?: Record<string, string | undefined>;
  /** `R1` — the provider rows on this matter that are NOT selected for this
   *  instrument. Together with `selected` this is every row there is, which is
   *  the only way to tell "on the list and unticked" (tier 1, a panel line)
   *  from "no provider row at all" (tier 2, a MUST-FIX). `TierInput` held only
   *  `selected` and `billedFacilityPartyIds` before this ruling. */
  unselected?: CaseProvider[];
  /** `R3` (Q5 + Q10, RULED TOGETHER 2026-09-05: *"Go with B"*) — the billed
   *  total per facility party, SCOPED TO THE ACTIVE CLIENT exactly as
   *  `billedFacilityPartyIds` already is. The number is the escalation; there
   *  is NO threshold, and `FE-22`'s "threshold" retires as a concept. */
  billedTotals?: Record<string, number>;
  /** Supplemental posture only: facilities already designated, by party id. */
  alreadyDesignated?: { facilityPartyId: string; date: string; posture: string }[];
  /** Promoted individuals whose period-covering edge names another facility. */
  affiliationMismatches?: { individualId: string; otherFacilityName: string }[];
}

/** `HD-22` — entity suffixes on a PERSON's name. Narrowed to INDIVIDUAL names
 *  by D-26: under `R17` a facility never lands in the designee slot, so the
 *  warning's original object is gone and this is what remains of it. */
const ENTITY_SUFFIXES = /\b(PLLC|LLC|Inc\.?|P\.?C\.?|P\.?A\.?|L\.?L\.?P\.?|Ltd\.?)\b/i;

/** §6.2 signal 3 — "a backstop, never a rule". */
const FACILITY_NOUNS =
  /\b(Hospital|Clinic|Center|Centre|Institute|Imaging|Associates|Group|Practice|Specialists|Health)\b/i;

/**
 * §8.1 — the THREE must-fix stops.
 *
 * Evaluated from the same live read as the panel, at every render and again at
 * the Generate act (D-31), never from a click-time cache. While any holds,
 * NOTHING is generated and NOTHING is transmitted — whole, not partial,
 * because a missing designation is its own exposure and silently dropping the
 * paragraph is what Part 1 forbids.
 */
export function mustFixConditions(input: TierInput): Finding[] {
  const out: Finding[] = [];

  if (!input.incidentDateIso) {
    out.push({
      line: 'stop',
      tier: 'must-fix',
      text: 'This matter has no date of incident.',
      route: 'Set it on the matter record — the fixed causation sentence cannot be written without it.',
    });
  }

  for (const p of input.selected) {
    const name = (input.facilityNames[p.facilityPartyId] ?? '').trim();
    if (name === '') {
      out.push({
        line: 'stop',
        tier: 'must-fix',
        text: 'A selected facility has no name.',
        route: 'Open the contact record and give it a name.',
        caseProviderId: p.id,
      });
    }
    if (!p.providerType) {
      out.push({
        line: 'stop',
        tier: 'must-fix',
        text: `${name || 'A selected facility'} has no type.`,
        route: 'Set the type on the Medical tab — the type is what chooses the two fixed sentences.',
        caseProviderId: p.id,
      });
    }
  }

  // `R1` TIER 2 — THE FOURTH STOP, and the only one this slice adds.
  //
  // ND-7(c) was HELD with the PROVISIONAL default "a PANEL LINE, never a stop".
  // Michael walked it on 2026-09-05 with the Garcia fixture rendering two
  // billed-not-designated lines on the first case he opened, and ruled *"c"* →
  // *"Take c1."*: a billed party TYPED as a facility with no provider row at
  // all is a MUST-FIX. The default is superseded FOR TIER 2 ONLY — tiers 1 and
  // 3 keep their panel lines below.
  //
  // The stop set is now FOUR and CLOSED again. §12.3 closed it by ruling and
  // this ruling reopened it exactly once; nothing else may add a fifth.
  //
  // Both clears are named in the route line, because a stop that does not say
  // how to clear it is the "reflex to skip" failure R1 exists against.
  const rowsAnywhere = new Set(
    [...input.selected, ...(input.unselected ?? [])].map((p) => p.facilityPartyId),
  );
  for (const billed of input.billedFacilityPartyIds) {
    if (rowsAnywhere.has(billed)) continue;
    // ONLY a party the firm has typed "Facility". A `business` is tier 3, and
    // an untyped or unknown party is neither — never stopped on.
    if (input.billedPartyTypes?.[billed] !== 'providerBusiness') continue;
    const who = input.facilityNames[billed] ?? 'A facility';
    out.push({
      line: 'stop',
      tier: 'must-fix',
      text: `${who} has bills on this matter and no provider record.`,
      route: 'Add it on the Medical tab, or retype the party if it is not a treating facility.',
    });
  }

  return out;
}

/**
 * §8.2 — the ambient panel's line set. Flags, never blocks.
 *
 * `signal 5` ("affiliation unverified") is deliberately ABSENT: `CD-14` limb
 * (i) is open, so provenance is recorded on every extracted individual from
 * birth and the line is not built. The LOP flag is deliberately absent too —
 * it is the §5.2 gate beside the facility's checkbox, not a panel line (D-15).
 */
export function panelLines(input: TierInput): Finding[] {
  const out: Finding[] = [];
  const push = (f: Finding) => out.push(f);
  const nameOf = (p: CaseProvider) => input.facilityNames[p.facilityPartyId] ?? '(unnamed)';

  const readable = newestReadableVersion(input.chronologyVersions);
  const removedVersionIds = new Set(
    input.chronologyVersions.filter((v) => v.removedAt).map((v) => v.id),
  );

  for (const p of input.selected) {
    const contact = input.facilityAddresses[p.facilityPartyId];
    const people = activeIndividuals(input.individuals.filter((i) => i.caseProviderId === p.id));
    const plan = planFacility(p, input.individuals);

    // 1 — RULED (`HD-1` "we need an address"; §17.6 "flag it and allow the
    // user to still create the document"), REWRITTEN 2026-09-07 for the address
    // model (`SD-1`). One false sentence becomes THREE TRUE ONES, because the
    // three reasons a block has no street line are three different acts on
    // Michael's part and the old wording named none of them. Every string here
    // is PROVISIONAL and listed for his eye.
    //
    // NOTE the tier: all three are PANEL lines. `SD-10` — a facility with two
    // or more locations and none selected is NEVER a fourth stop. R1/R2 fixed
    // the stop set at four and the amendment slice's DO-NOT bars a fifth.
    if (contact && !contact.hasAddress) {
      const state = contact.locationState ?? 'none';
      push({ line: 1, tier: 'panel', caseProviderId: p.id,
        text: state === 'unselected'
          ? `${nameOf(p)} has no location selected on this matter — pick one on the Medical tab.`
          : `${nameOf(p)} has no locations on its contact record — add one on the Parties page.` });
    }
    // `SD-1`'s third line, and the `SD-6` confirm surface's reach into the
    // instrument: a rule-split address he has not looked at is flagged where he
    // is about to serve it, not only on the party page.
    if (contact?.unconfirmedSplit) {
      push({ line: 1, tier: 'panel', caseProviderId: p.id,
        text: `${nameOf(p)}${contact.locationLabel ? `'s ${contact.locationLabel}` : ''} address was split by rule — confirm it on the Parties page.` });
    }
    // 2 — §17.6's ruled posture, unchanged in substance and reworded to the
    // selected location (`SD-1`, last sentence): the line is still absent and
    // the document still generates; Michael is told rather than not told.
    if (contact && !contact.hasPhone) {
      push({ line: 2, tier: 'panel', caseProviderId: p.id,
        text: `${nameOf(p)} has no phone number on the location the block reads — the block omits the line and the document still generates.` });
    }

    // 3 — gated by D-25: only AFTER an extraction has run for this facility.
    // Before that, ONE line for the client says so (line 13) rather than one
    // per facility, which is the "teaches him to ignore warnings" case.
    const designates = plan.paragraphs.some(
      (par) => par.shape !== 'custodian-only' && par.individuals.length > 0,
    );
    if ((isTreatingType(p.providerType) || p.providerType === 'radiologist')
      && hasExtractionRun(p) && !designates) {
      push({ line: 3, tier: 'panel', caseProviderId: p.id,
        text: p.providerType === 'radiologist'
          ? `${nameOf(p)}: no imaging interpreter named — the facility goes out custodian-only.`
          : `${nameOf(p)}: no treating physician named — the facility goes out custodian-only.` });
    }

    for (const ind of people) {
      // 4 — `HD-22`, warn, never block.
      if (ENTITY_SUFFIXES.test(ind.displayName)) {
        push({ line: 4, tier: 'warn', caseProviderId: p.id, individualId: ind.id,
          text: `"${ind.displayName}" carries an entity suffix — that reads like a business, not a person.` });
      }
      // 5 — a backstop, never a rule.
      if (FACILITY_NOUNS.test(ind.displayName)) {
        push({ line: 5, tier: 'panel', caseProviderId: p.id, individualId: ind.id,
          text: `"${ind.displayName}" reads like a facility name rather than a person's.` });
      }
      // 19 — `R10` (D-11, RULED 2026-09-05: *"b"*). The rendering is UNCHANGED
      // — an individual with no pronoun on record still renders they/their,
      // which is the only choice that is never wrong about a person — AND the
      // panel now carries one line per such individual, mirroring the line the
      // client already had. The §10 default's "no panel line for it" is
      // SUPERSEDED. `SD-n`-free: the wording is the ruling's own sentence.
      if (!ind.pronoun || ind.pronoun.trim() === '') {
        push({ line: 19, tier: 'panel', caseProviderId: p.id, individualId: ind.id,
          text: `${ind.displayName} has no pronoun on record — rendering as they/their.` });
      }
      // 9 — D-12.
      if (ind.missingFromLatest) {
        push({ line: 9, tier: 'panel', caseProviderId: p.id, individualId: ind.id,
          text: `${ind.displayName} is not in the latest chronology — kept, with the summary from the version that named them.` });
      }
      // 18 — D-60.
      if (ind.chronologyVersionId && removedVersionIds.has(ind.chronologyVersionId)) {
        push({ line: 18, tier: 'panel', caseProviderId: p.id, individualId: ind.id,
          text: `${ind.displayName} came from a chronology version that has been removed — the row is kept without a source.` });
      }
    }

    // 7 — `R3` (Q5 + Q10, RULED TOGETHER 2026-09-05: *"Go with B"*). The gap
    // line now CARRIES THE FACILITY'S BILLED TOTAL INLINE, and the gap lines
    // sort charge-descending among themselves (below). NO threshold: the number
    // is the escalation, and `FE-22`'s threshold retires as a concept. Dollars
    // only, as drawn — share-of-total was offered and not taken up. `SD-17`,
    // PROVISIONAL, his eye.
    if (plan.paragraphs.some((par) => par.gapFlag)) {
      const total = input.billedTotals?.[p.facilityPartyId];
      push({ line: 7, tier: 'panel', caseProviderId: p.id,
        text: total !== undefined && total > 0
          ? `${nameOf(p)} (${currency(total)} in charges) goes out under the custodian-only paragraph because no individual could be named.`
          : `${nameOf(p)} goes out under the custodian-only paragraph because no individual could be named.` });
    }

    // 8 — AS-Q12(e), §12.7's imaging-entity question, for imaging-TYPED
    // facilities whose individuals came from the model.
    if (p.providerType === 'radiologist' && people.some((i) => i.provenance === 'model')) {
      push({ line: 8, tier: 'panel', caseProviderId: p.id,
        text: `${nameOf(p)}: are these names the entity's radiologists, or the referring physicians?` });
    }

    // 11 — AS-Q5, and the marker limb by DEFAULT (AS-Q17).
    if (p.providerType === 'mental-health') {
      push({ line: 11, tier: 'panel', caseProviderId: p.id,
        text: `${nameOf(p)} is a mental-health facility — the block renders and the paragraph is drafted by hand in Word.` });
    } else {
      for (const ind of people) {
        if (effectiveMarker(ind.roleMarker, p.providerType) === 'mental-health') {
          push({ line: 11, tier: 'panel', caseProviderId: p.id, individualId: ind.id,
            text: `${ind.displayName} is marked mental health — they stay on the block, are left out of the generated paragraph, and their paragraph is drafted by hand.` });
        }
      }
    }

    // 12 — AS-Q5: degrade, don't invent.
    if (p.providerType === 'other-non-physician') {
      push({ line: 12, tier: 'panel', caseProviderId: p.id,
        text: `${nameOf(p)}: no fixed causation line for this type — the writer describes what the records support.` });
    }

    // 14 — D-16 / AS-Q15's default. Both limbs are Michael's.
    const midLevels = people.filter(
      (i) => effectiveMarker(i.roleMarker, p.providerType) === 'mid-level',
    );
    const ridden = plan.paragraphs.some((par) => par.riders.length > 0);
    if (midLevels.length > 0 && !ridden) {
      push({ line: 14, tier: 'panel', caseProviderId: p.id,
        text: `${midLevels.map((i) => i.displayName).join(', ')}: no treating paragraph to ride, so no rider is generated and they are not on the block.` });
    }

    // 15 — D-46 / AS-Q16's default.
    if ((p.providerType === 'pharmacy' || p.providerType === 'custodian-only')
      && people.length > 0) {
      push({ line: 15, tier: 'panel', caseProviderId: p.id,
        text: `${nameOf(p)} has ${people.length} named individual(s), and this facility type designates only the custodian — retype the facility or remove them.` });
    }

    // 10 — D-27, per facility. Generation PROCEEDS; this says what happened.
    if (!readable) {
      const hand = people.filter((i) => i.provenance === 'hand');
      if ((isTreatingType(p.providerType) || p.providerType === 'radiologist')) {
        push({ line: 10, tier: 'panel', caseProviderId: p.id,
          text: hand.length > 0
            ? `${nameOf(p)}: no readable chronology, so the paragraph is written from the summaries you typed.`
            : `${nameOf(p)}: no readable chronology and no individuals typed, so it goes out custodian-only.` });
      }
    }

    // 16 — D-47, supplemental posture only.
    const prior = input.alreadyDesignated?.find((d) => d.facilityPartyId === p.facilityPartyId);
    if (prior) {
      push({ line: 16, tier: 'panel', caseProviderId: p.id,
        text: `Already designated ${prior.date} (${prior.posture}) — re-selecting generates a new paragraph for this facility.` });
    }

    // 17 — D-8. The block ALWAYS reads the selected facility; a disagreeing
    // edge is FLAGGED and never substituted.
    for (const m of input.affiliationMismatches ?? []) {
      if (people.some((i) => i.id === m.individualId)) {
        push({ line: 17, tier: 'panel', caseProviderId: p.id, individualId: m.individualId,
          text: `The directory records this affiliation at ${m.otherFacilityName} for these dates. The block still reads ${nameOf(p)} — check which is right.` });
      }
    }
  }

  // 13 — ONE line for the CLIENT, never one per facility (D-25's reason).
  const unpulled = input.selected.filter(
    (p) => isExtractedType(p.providerType) && !hasExtractionRun(p),
  );
  if (readable && unpulled.length > 0) {
    push({ line: 13, tier: 'panel',
      text: `${unpulled.length} facility(ies) have not had their individuals pulled from the chronology yet.` });
  }
  if (!readable && input.selected.length > 0) {
    push({ line: 10, tier: 'panel',
      text: 'There is no readable chronology on this client. Paragraphs are written from what is typed on the Medical tab.' });
  }

  // 6 — ND-7(a)'s set check, now `R1`'s TIERS 1 AND 3. Tier 2 (a billed
  // FACILITY with no provider row) left this function on 2026-09-05 and is a
  // must-fix; what stays here are the two tiers Michael ruled remain PANEL:
  //
  //   TIER 1 — a billed `providerBusiness` that HAS a row and is unticked.
  //            Unchanged in substance and in wording: deselecting is his
  //            visible act, and the line reports it rather than blocking it.
  //   TIER 3 — a billed party typed anything else (`business`: a records
  //            vendor, a funding or lien company). INFORMATIONAL. Silent was
  //            offered as c2 and REJECTED.
  //
  // A party whose type is unknown falls to tier 1's wording, which is the
  // conservative reading: it says the fact without asserting a type.
  const selectedParties = new Set(input.selected.map((p) => p.facilityPartyId));
  const rowsAnywhere = new Set(
    [...input.selected, ...(input.unselected ?? [])].map((p) => p.facilityPartyId),
  );
  for (const billed of input.billedFacilityPartyIds) {
    const type = input.billedPartyTypes?.[billed];
    const who = input.facilityNames[billed] ?? 'A facility';
    if (type !== undefined && type !== 'providerBusiness') {
      // Tier 3. `SD-n`-free: the wording is the rulings doc's own sentence.
      push({ line: 6, tier: 'panel',
        text: `${who} has bills but is typed Business, not Facility — retype it if it treated the client.` });
      continue;
    }
    // Tier 2 is a stop and has already been raised; saying it twice would put
    // the same fact in two tiers. NOTE the condition: only a party the firm has
    // TYPED "Facility" reaches tier 2, so a billed party whose type is unknown
    // and which has no row still gets tier 1's line — the pre-ruling ND-7(a)
    // behaviour, kept for the case the ruling does not reach. Dropping it would
    // silence a true fact on the ground that the type was not set.
    if (type === 'providerBusiness' && !rowsAnywhere.has(billed)) continue;
    if (!selectedParties.has(billed)) {
      push({ line: 6, tier: 'panel',
        text: `${who} has bills on this matter but is not selected for designation.` });
    }
  }
  for (const who of input.billedIndividualPartyNames ?? []) {
    push({ line: 6, tier: 'panel',
      text: `A bill is linked to ${who}, who is a person rather than a facility — link the bill to the facility contact.` });
  }

  // `R3` — the gap lines sort CHARGE-DESCENDING among themselves (Q4's "useful
  // SORT for the gap flag"), and nothing else in the panel moves. Sorting the
  // whole list would reorder lines whose order carries meaning — the per-
  // facility groups above are emitted in D-13's treatment order.
  const gaps = out.filter((f) => f.line === 7);
  if (gaps.length > 1) {
    const totalFor = (f: Finding) => {
      const row = input.selected.find((p) => p.id === f.caseProviderId);
      return (row && input.billedTotals?.[row.facilityPartyId]) ?? 0;
    };
    const sorted = [...gaps].sort((a, b) => totalFor(b) - totalFor(a));
    let k = 0;
    for (let i = 0; i < out.length; i += 1) {
      if (out[i].line === 7) { out[i] = sorted[k]; k += 1; }
    }
  }

  return out;
}

/** Everything the surface shows, in one call, from ONE live read (D-31). */
export function evaluateTiers(input: TierInput): {
  stops: Finding[];
  warnings: Finding[];
  panel: Finding[];
  canGenerate: boolean;
} {
  const stops = mustFixConditions(input);
  const all = panelLines(input);
  return {
    stops,
    warnings: all.filter((f) => f.tier === 'warn'),
    panel: all.filter((f) => f.tier === 'panel'),
    // The RULED behaviour: the generate stops. D-1 makes the SURFACE a must-fix
    // tier at the top of the HD-1 panel, PROVISIONAL — the shape is his.
    canGenerate: stops.length === 0,
  };
}
