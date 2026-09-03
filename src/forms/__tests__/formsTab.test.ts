// THE FORMS TAB — asserted over its SOURCE, which is this repo's convention
// for a component (no jsdom is installed, deliberately, and adding one would be
// a new dependency).
//
// Authority: docs/specs/fe-d1-amendment-slice.md §9.2, §9.3, AS-Q9, D-52, D-61.
//
// These assertions are about SHAPE, not behaviour, and they are worth having
// because the things being held shut are ABSENCES: the wizard no longer picks a
// variant, no longer asks a facility's address, and no longer renders four
// interview cards it did not delete.

import { describe, it, expect } from 'vitest';
import formsTab from '../../pages/FormsTab.tsx?raw';
import retiredCard from '../../components/RetiredInterviewCard.tsx?raw';
import providersSection from '../../components/ProvidersSection.tsx?raw';
import { DISCLOSURE_VARIANTS } from '../variants';

describe('§9.2 — the wizard no longer selects variants', () => {
  it('has no variant dropdown, and reaches §9 only as voice examples', () => {
    // RC-1 moved the §9 twelve from a THING THE WIZARD PICKS to VOICE EXAMPLES
    // the writer is shown. A dropdown here would be the old design surviving.
    expect(formsTab).not.toContain('Approved narrative variant');
    expect(formsTab).not.toContain('DISCLOSURE_VARIANTS.map');
    expect(formsTab).not.toContain('variantKey:');
  });

  it('selects over the R17 facility record, not over party roleTags', () => {
    expect(formsTab).toContain('listCaseProviders');
    expect(formsTab).toContain('sortProvidersOldestFirst');
    // The old selection filtered parties by a /provider/i regex over roleTags.
    expect(formsTab).not.toMatch(/roleTags\.some\(\(t\) => \/provider\/i\.test\(t\)\)/);
  });

  it('shows the chronology version in use as a READ-ONLY pointer, with no second drop', () => {
    expect(formsTab).toContain('chronology v');
    // ONE drop zone (D-9), and it is on the Medical tab.
    expect(formsTab).not.toContain('ChronologyDropZone');
    expect(providersSection).toContain('ChronologyDropZone');
  });
});

describe('AS-Q9 — the four interview cards are RETIRED, and NOT deleted', () => {
  it('renders no card in the treating track', () => {
    expect(formsTab).not.toContain('<ProviderCard');
    expect(formsTab).not.toContain('TREATMENT_OPTIONS');
    expect(formsTab).not.toContain('boardCertificationKnown');
  });

  it('keeps the component, with its machinery intact', () => {
    // "The build removes no card component" — the option's own words. Deleting
    // it would have turned a retirement into a demolition.
    expect(retiredCard).toContain('export function ProviderCard');
    expect(retiredCard).toContain('Board certification');
    expect(retiredCard).toContain('Treatment provided');
    expect(retiredCard).toContain('Future care recommended');
    expect(retiredCard).toContain('Treated this client before the incident?');
    expect(retiredCard).toContain('TREATMENT_OPTIONS');
    // And it says on its face why it is here and not rendered.
    expect(retiredCard).toMatch(/RETIRED FOR THE TREATING TRACK/);
    expect(retiredCard).toMatch(/nothing renders this component today/i);
  });

  it('is imported by nothing — retired means retired', () => {
    expect(formsTab).not.toContain('RetiredInterviewCard');
    expect(providersSection).not.toContain('RetiredInterviewCard');
  });
});

describe('§9.3 — the edit surface, and what the wizard may not ask', () => {
  it('never asks for a facility address, phone or type', () => {
    // §17.8: "an address is never edited inside the form". The panel flags
    // them and points at the Medical tab; the wizard has no input for one.
    expect(formsTab).not.toContain('Facility address');
    expect(formsTab).not.toContain('setFacilityPhone');
    expect(formsTab).toContain('edit them there, not here');
  });

  it('has no editor for a returned or assembled paragraph (HD-20-b)', () => {
    // Edits happen in Word. A textarea bound to assembledText would be the
    // in-app editor the ruling forbids.
    expect(formsTab).not.toMatch(/value=\{[^}]*assembledText/);
    expect(formsTab).not.toMatch(/onChange[^}]*assembledText/);
  });

  it('offers the retained track as AUTHORING, with the §5.3 labels UNVERIFIED (D-52)', () => {
    expect(formsTab).toContain('RETAINED_CHECKLIST');
    expect(formsTab).toContain('TRCP 195.5(a)(3)–(4) — UNVERIFIED; source: playbook E2 row');
    expect(formsTab).toContain('there is no model call on this step');
    // The five labels are §5.3's own words — no new rule text is typed.
    for (const label of ['resume / bibliography', '10-year publications list',
      '4-year testimony list', 'compensation statement']) {
      expect(formsTab).toContain(label);
    }
  });

  it('shows a CLIENT selector only on a multi-client case (D-61)', () => {
    expect(formsTab).toContain('multiClient && (');
    expect(formsTab).toContain('One instrument per plaintiff');
  });
});

describe('the 195.2 panel is UNCHANGED from the FE-D1 build', () => {
  it('states the rule, names its UNVERIFIED status, and asserts NO date', () => {
    expect(formsTab).toContain('<strong>Not computed.</strong>');
    expect(formsTab).toContain('UNVERIFIED');
    expect(formsTab).toContain('Work the date yourself against the DCO');
    // No date arithmetic anywhere near it.
    expect(formsTab).not.toMatch(/deadline\s*=\s*new Date/);
    expect(formsTab).not.toContain('addDays');
  });
});

describe('the §9 library is still twelve, and still reaches the writer', () => {
  it('has twelve voice examples for the writer to draw on', () => {
    expect(DISCLOSURE_VARIANTS).toHaveLength(12);
  });
});
