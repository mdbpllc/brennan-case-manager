/**
 * THE SURFACES AND THE MIGRATION FILES — the slice's §7 items 7, 13, 14, 20
 * and 22.
 *
 * This repo has no jsdom, by convention, so a claim about a SCREEN is made over
 * SOURCE. That is a weaker check than a rendered one and is named as such: it
 * proves a string or a call is where the ruling puts it, not that a user sees
 * it. The click-through in the build session is what covers the rest, and its
 * findings are in the session entry.
 *
 * The two SQL files are checked the same way. `db/migrations/*.sql` is
 * exercised only by Michael's hand against the live database — the slice says
 * so in terms — so what a test can honestly assert about them is STRUCTURE: the
 * gate is first, nothing is dropped by a guessed name, the checks are present
 * and answerable, and the rule they state is the rule the TypeScript implements.
 */

import { describe, it, expect } from 'vitest';
import { splitAddress } from '../../domain/addressSplit';

// `?raw` imports, which is this repo's convention for reading source in a test
// (`formsTab.test.ts`'s own note): no `node:fs`, no `@types/node`, no new
// dependency. Vite serves the file bytes; vitest and `tsc -b` both accept it.
import schemaSql from '../../../db/migrations/2026-09-07-address-model-schema.sql?raw';
import splitSql from '../../../db/migrations/2026-09-07-address-model-split.sql?raw';
import formsTab from '../../pages/FormsTab.tsx?raw';
import rosterPanel from '../../pages/RosterPanel.tsx?raw';
import clientsCard from '../../pages/ClientsCard.tsx?raw';
import caseDetail from '../../pages/CaseDetailPage.tsx?raw';
import medicalTab from '../../pages/MedicalTab.tsx?raw';
import templatesPage from '../../pages/TemplatesPage.tsx?raw';
import signInPage from '../../pages/SignInPage.tsx?raw';
import readme from '../../../README.md?raw';
import diffModule from '../versionDiff.ts?raw';

/** Source with COMMENTS STRIPPED. An absence claim over raw source is answered
 *  by any comment that quotes the retired string — which is exactly what
 *  happened writing this file: the comment recording why the sign-in sentence
 *  changed contained the sentence, and the "it is gone" assertion failed
 *  against the explanation of its going. */
const code = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

/** SQL prose with the comment markers and line wrapping removed, so a phrase
 *  that breaks across two `--` lines is still findable. A line-anchored search
 *  cannot see a wrapped sentence, and calling one absent on that basis is a
 *  false finding, not a real one. */
const sqlProse = (src: string) =>
  src.split('\n').map((l) => l.replace(/^\s*--\s?/, '')).join(' ').replace(/\s+/g, ' ');


// ------------------------------------------------------------- §7 item 14

describe('R16 — the no-client flag renders in the TOP flag area', () => {
  it('the FLAGGED notice is in the roster panel, beside the caption flags', () => {
    // *"Move it up."* His reason was his own test: on 26-0003 he read the top
    // of the Parties page and reported no flag, because it rendered at the
    // bottom inside the damages-scope card.
    expect(rosterPanel).toContain('FLAGGED — this case has no client record.');
    expect(rosterPanel).toContain('export function ClientFlagsCard');
  });

  it('and is GONE from the damages-scope card, so it is not in two places', () => {
    expect(code(clientsCard)).not.toContain('FLAGGED — this case has no client record.');
  });

  it('the RESOLVING CONTROL stays below, and the flag points at it', () => {
    // The other half of the ruling. Moving the write into a read-only region
    // would be a different change than the one he made.
    expect(clientsCard).toContain('Create client record');
    expect(rosterPanel).toContain('Clients — damages scope');
  });

  it('R6 — the party map covers CLIENT-RECORD parties, not only linked ones', () => {
    // State 1 names a party whose LINK IS GONE — that is what an orphan damages
    // record IS. Fetching only the linked parties left the flag reading "A
    // contact has a damages record but no Client role", which is the one
    // sentence it exists to make specific. Found by unlinking on the walk.
    expect(caseDetail).toContain('...ls.map((l) => l.partyId), ...cs.map((c) => c.partyId)');
  });

  it('the top flag area renders BEFORE the damages-scope card on the page', () => {
    // Position, not merely presence: "move it up" is a claim about order.
    const flags = caseDetail.indexOf('<ClientFlagsCard');
    const card = caseDetail.indexOf('<ClientsCard');
    expect(flags).toBeGreaterThan(-1);
    expect(card).toBeGreaterThan(-1);
    expect(flags).toBeLessThan(card);
  });
});

// -------------------------------------------------------------- §7 item 7

describe('R7 — the bill label pre-fills from the provider and stays editable', () => {
  it('picking a provider fills the label, and typing in the label stops it', () => {
    expect(medicalTab).toContain('labelIsPrefilled');
    // `#156` §2 (B6) moved the source: the pre-fill now fills from the PICKED
    // ROW's label (a `case_providers` facility), not a linked party's name.
    expect(medicalTab).toContain("setLabel(providerOptions.find((o) => o.value === id)?.label ?? '')");
    expect(medicalTab).toContain('setLabelIsPrefilled(false)');
  });

  it('the label is still a free-text input — the pre-fill is not a lock', () => {
    expect(medicalTab).toMatch(/value=\{label\}[\s\S]{0,200}onChange=/);
  });
});

// ------------------------------------------------------- #156 §2 (B6)

describe('#156 §2 (B6) — the new-bill picker reads this case\'s case_providers rows', () => {
  // Michael: "The Providers section's list (case_providers)". Asserted over
  // SOURCE, as R7 is: THIRD TRANCHE item 12 records that the Combobox would not
  // commit a selection under automation in this form, so a click-through result
  // is not available and a source-asserted one is said to be so.
  const form = code(medicalTab.slice(medicalTab.indexOf('function NewBillForm')));
  const page = code(medicalTab.slice(0, medicalTab.indexOf('function NewBillForm')));

  it('the page reads the case_providers rows and builds the options with the pure helper', () => {
    expect(page).toContain('db.listCaseProviders(caseRec.id)');
    expect(page).toContain('db.listProviderIndividuals(caseRec.id)');
    expect(page).toContain('db.listProviderVisits(caseRec.id)');
    expect(page).toContain('billProviderOptions(');
    expect(page).toContain('providerOptions={billProviders}');
  });

  it('the FORM offers those options, and no longer maps the linked parties', () => {
    expect(form).toContain('options={providerOptions}');
    expect(form).not.toContain('providers.map((p) => ({ value: p.id, label: p.displayName }))');
    expect(form).not.toMatch(/\bproviders\b/);
    // The bill still keys on the FACILITY PARTY id (the option's value).
    expect(form).toContain('facilityPartyId: providerId || undefined');
  });

  it('the linked-parties list is kept for the ledger\'s Provider column only', () => {
    // B6 moves the FORM's source; the ledger column is another use and stays.
    expect(page).toContain("setProviders(parties.filter((p) => p.partyType === 'providerBusiness'))");
    expect(page).toContain('providers.find((p) => p.id === id)?.displayName');
    expect(page).not.toContain('providers={providers}');
  });

  it('every change in the Providers section re-reads the picker\'s sources, and only those', () => {
    // Found at the FOS-2 fix build's review: the section was rendered with no
    // `onChanged`, so a facility added, retyped or removed there — directly above
    // the ledger — did not reach "+ New bill" until the tab remounted.
    const element = page.slice(page.indexOf('<ProvidersSection'));
    expect(element.slice(0, element.indexOf('/>'))).toMatch(/\bonChanged=\{refreshProviderSources\}/);

    // The re-read is the picker's sources — the three row lists and the facility
    // names — and nothing else on the tab.
    const start = page.indexOf('const refreshProviderSources = useCallback(');
    expect(start).toBeGreaterThan(-1);
    const reread = page.slice(start, page.indexOf('const refresh = useCallback(', start));
    for (const call of [
      'db.listCaseProviders(caseRec.id)', 'db.listProviderIndividuals(caseRec.id)',
      'db.listProviderVisits(caseRec.id)', 'db.getParties(',
      'setCaseProviderRows(cps)', 'setProviderIndividuals(inds)', 'setProviderVisits(vs)', 'setFacilityNames(',
    ]) expect(reread).toContain(call);
    expect(reread).not.toMatch(
      /listBillsForCase|listRunsForCase|listDocumentsForCase|listLinksForCase|listClientsForCase|setAllBills|setClients|setProviders\(/,
    );

    // It is the ONLY writer of those four, and the tab's own refresh (the mount
    // read) runs it, so there is one way the picker's sources are loaded.
    for (const setter of ['setCaseProviderRows(', 'setProviderIndividuals(', 'setProviderVisits(', 'setFacilityNames(']) {
      expect(page.split(setter)).toHaveLength(2);
    }
    expect(page.slice(page.indexOf('const refresh = useCallback('))).toContain('refreshProviderSources(),');
  });

  it('the ledger\'s Provider column falls back to the case_providers facility name', () => {
    // Found at the FOS-2 fix build's review: a bill made from the picker for a
    // facility NOT linked to the case read '—'. The order is the linked party's
    // name (kept), then the facility name, then '—'. The expression is
    // recomputed from the seed in billProviderPicker.test.ts.
    expect(page).toMatch(
      /providers\.find\(\(p\) => p\.id === id\)\?\.displayName\s*\?\?\s*\(id \? facilityNames\[id\] : undefined\),\s*\[providers, facilityNames\],/,
    );
    expect(page).toContain("providerName(b.facilityPartyId) ?? '—'");
  });
});

// ------------------------------------------------------------- R2 and R8

describe('R2 and R8 — what the two surfaces say', () => {
  it('R2 — the card says FOUR conditions and the provisional footnote is gone', () => {
    expect(formsTab).toContain('exactly four conditions that do this');
    expect(code(formsTab)).not.toContain('There are exactly three conditions');
    expect(code(formsTab)).not.toContain('it sits here provisionally');
  });

  it('R2 — the Generate button STATES the count while it is blocked (SD-16)', () => {
    expect(formsTab).toContain('must-fix item');
    expect(formsTab).toContain('tiers.stops.length > 0');
    // No dialog: the shape he ruled against is not built.
    expect(formsTab).not.toMatch(/window\.confirm|<dialog|showModal/);
  });

  it('R8 UX-1 — the verb is "Save as a new version", and the subtitle matches', () => {
    expect(templatesPage).toContain('Save as a new version');
    expect(code(templatesPage)).not.toContain('Publish new version');
    expect(templatesPage).toContain('Saving creates a new version');
  });

  it('R8 UX-4 — the note is generated from the diff, with NO network call', () => {
    expect(templatesPage).toContain('autoChangeNote(diffBodies(');
    // A model-written note was NAMED at the sitting and EXCLUDED. Neither the
    // page nor the module that computes the note may reach a network.
    for (const src of [templatesPage, diffModule]) {
      expect(src).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|functions\.invoke|resolveParagraphWriter/);
    }
  });

  it('R8 UX-4 — a hand-typed note is not overwritten by the generated one', () => {
    expect(templatesPage).toContain("note.trim() !== '' ? note.trim()");
  });
});

// ------------------------------------------------------------- §3 item 16

describe('the two text acts outside the instrument', () => {
  it('SD-11 — the stale sending-limit sentence is gone from the sign-in page', () => {
    // Gate 9 CLOSED 2026-09-07 on Postmark; the sentence was written against
    // Supabase's default sender on 2026-07-28.
    expect(code(signInPage)).not.toContain('the sending limit is low');
    expect(signInPage).toContain('junk folder before requesting another');
  });

  it('SD-12 — the README no longer says there is no sign-in screen', () => {
    expect(readme).not.toContain('has no sign-in screen yet');
    expect(readme).toContain('magic link');
    // The no-real-data warning is KEPT, which is the half of HS-6 that was
    // never wrong.
    expect(readme).toContain('Do **not** put real client data in');
    expect(readme).toContain('Go_Live_Gates.md');
  });
});

// ------------------------------------------------------------- §7 item 22

describe('the two migration files — structure, and the rule they share', () => {
  it('the SCHEMA file gates on `case_providers` before it alters anything', () => {
    const gate = schemaSql.indexOf('raise exception');
    const alter = schemaSql.indexOf('alter table');
    expect(gate).toBeGreaterThan(-1);
    expect(gate).toBeLessThan(alter);
  });

  it('the DATA file refuses to run before the schema file', () => {
    expect(splitSql).toContain('facility_location_id');
    expect(splitSql).toContain('raise exception');
    const gate = splitSql.indexOf('raise exception');
    const update = splitSql.indexOf('update public.parties');
    expect(gate).toBeLessThan(update);
  });

  it('neither file DROPS anything, and neither deletes the legacy address', () => {
    // SD-5, and the slice's DO-NOT in terms. The only `drop` in either file is
    // the scaffolding function the split file creates and removes itself.
    for (const sql of [schemaSql, splitSql]) {
      expect(sql).not.toMatch(/drop\s+table/i);
      expect(sql).not.toMatch(/drop\s+column/i);
      expect(sql).not.toMatch(/\bdelete\s+from\b/i);
    }
    expect(splitSql).toContain('drop function if exists public.__cc1_split_address');
    expect(splitSql).not.toMatch(/-\s*'address'|#-\s*'address'/);
  });

  it('the DATA file carries STEP 0 counts and checks answered in words', () => {
    expect(splitSql).toContain('STEP 0 — BEFORE YOU RUN ANYTHING');
    expect(splitSql).toContain('VERIFICATION — ANSWER THESE IN WORDS');
    expect(splitSql).toContain('BACK UP FIRST');
    // The rule-unsplit records are listed BY NAME so he can fix them by hand.
    expect(splitSql).toContain('rule-unsplit');
    expect(splitSql).toContain('display_name');
  });

  it('both say plainly that they were written and NOT run', () => {
    for (const sql of [schemaSql, splitSql]) {
      const prose = sqlProse(sql);
      expect(prose).toContain("RUN BY MICHAEL'S HAND");
      expect(prose).toContain('did not run it and connected to no database');
    }
  });

  it('the SQL states §5.3\'s rule, and the TypeScript implements that rule', () => {
    // The SQL cannot be executed here, so what is asserted is that the two
    // carry the SAME three worked examples — the ones §5.3 states — and that
    // the TypeScript really produces them. A divergence in the SQL is
    // Michael's to catch at the checks; a divergence in the rule as WRITTEN is
    // catchable here.
    const cases: [string, string, string][] = [
      ['400 Tourmaline Way, Suite 210, Rockvale, TX 78200', '400 Tourmaline Way, Suite 210', 'Rockvale, TX 78200'],
      ['3100 S 31st St, Temple, TX', '3100 S 31st St', 'Temple, TX'],
    ];
    for (const [raw, line1, csz] of cases) {
      expect(splitSql).toContain(raw);
      const out = splitAddress(raw);
      expect(out.addressLine1).toBe(line1);
      expect(out.cityStateZip).toBe(csz);
      expect(out.mark).toBe('rule');
    }
    expect(splitSql).toContain('3100 S 31st St, Temple TX 76502');
    expect(splitAddress('3100 S 31st St, Temple TX 76502').mark).toBe('rule-unsplit');
    // And the SQL's own statement of the rule, in the same terms.
    expect(splitSql).toContain('FEWER THAN THREE parts');
    expect(splitSql).toContain('LAST TWO parts');
  });
});
