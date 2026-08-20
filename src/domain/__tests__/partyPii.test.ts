// Gate 10, front-end half — the routing and the write-guard.
//
// Authority: docs/specs/gate10-pii-frontend-slice.md §7 item 7, authorized by
// Michael's `G10-5` ruling 2026-08-19. Four of the five named tests live here;
// the fifth (probe-panel text) lives beside the panel's own suite.
//
// The point of the slice is a negative: these values must not be in the blob.
// A test that only checks the positive — that an SSN can be stored and read
// back — would pass on a build that ALSO left a copy in `fields`, which is the
// exact failure this slice exists to remove. Every test below asserts the
// absence as well as the presence.

import { describe, it, expect } from 'vitest';
import {
  splitPartyFields, mergePartyFields, applyPii, stripDestinationKeys, destinationKeys,
  piiFieldKeys, isEmptyPii, maskValue, preFlipScan,
  RULED_EIGHT_KEYS, AS_BUILT_KEYS,
} from '../partyPii';
import { PARTY_TYPES, PARTY_TYPE_MAP } from '../partyRegistry';

describe('registry destination routing (§7 item 7, test 1)', () => {
  it('declares a destination for exactly the four gate-10 keys', () => {
    const keys = [...destinationKeys().keys()].sort();
    expect(keys).toEqual(['dlNumber', 'dlState', 'dob', 'ssn']);
  });

  it('sends dob to the typed parties column and the other three to the child table', () => {
    const d = destinationKeys();
    expect(d.get('dob')).toEqual({ table: 'parties', column: 'date_of_birth' });
    expect(d.get('ssn')).toEqual({ table: 'party_pii', column: 'ssn' });
    expect(d.get('dlNumber')).toEqual({ table: 'party_pii', column: 'drivers_license' });
    expect(d.get('dlState')).toEqual({ table: 'party_pii', column: 'drivers_license_state' });
    expect(piiFieldKeys().sort()).toEqual(['dlNumber', 'dlState', 'ssn']);
  });

  it('gives dob the SAME destination on every party type that declares it', () => {
    // The `client` and `person` types both declare `dob`. A destination on one
    // and not the other is how a blob copy survives a slice like this, and
    // destinationKeys() throws on a genuine conflict — so this asserts the
    // agreement rather than merely that the call did not blow up.
    const declaring = PARTY_TYPES.filter((t) => t.fields.some((f) => f.key === 'dob'));
    expect(declaring.length).toBeGreaterThan(1);
    for (const t of declaring) {
      const f = t.fields.find((x) => x.key === 'dob')!;
      expect(f.destination).toEqual({ table: 'parties', column: 'date_of_birth' });
    }
  });

  it('routes a full form payload to three homes and leaves the blob clean', () => {
    const split = splitPartyFields({
      firstName: 'Ada', lastName: 'Byron', phone: '2545550100',
      dob: '1815-12-10', ssn: '000-00-0000', dlNumber: 'X0000000', dlState: 'TX',
    });
    expect(split.fields).toEqual({ firstName: 'Ada', lastName: 'Byron', phone: '2545550100' });
    expect(split.dateOfBirth).toBe('1815-12-10');
    expect(split.pii).toEqual({
      ssn: '000-00-0000', driversLicense: 'X0000000', driversLicenseState: 'TX',
    });
  });

  it('says NOTHING about a column the payload did not mention', () => {
    // The difference between "set it to empty" and "say nothing about it". If
    // these collapsed, editing a phone number would wipe a stored SSN.
    const split = splitPartyFields({ phone: '2545550100' });
    expect(split.dateOfBirth).toBeUndefined();
    expect(split.pii).toBeUndefined();
    expect(isEmptyPii(split.pii)).toBe(true);
  });

  it('treats an empty string as an explicit clear, not as silence', () => {
    const split = splitPartyFields({ ssn: '', dob: '  ' });
    expect(split.dateOfBirth).toBeNull();
    expect(split.pii).toEqual({ ssn: null });
  });
});

describe('the write-guard (§7 item 7, test 2)', () => {
  it('a fields object carrying ssn never persists it', () => {
    // The slice's own words for this test. The guard is unconditional.
    const out = stripDestinationKeys({ ssn: '000-00-0000', note: 'keep me' });
    expect(out).toEqual({ note: 'keep me' });
    expect('ssn' in out).toBe(false);
  });

  it('strips the keys on a party type that never declared them', () => {
    // Deliberately NOT scoped by party type: a blob key arriving on a type that
    // never rendered it is precisely the regression the belt-and-braces rule is
    // aimed at, and a type-scoped guard would wave it through.
    const org = PARTY_TYPE_MAP['organization'] ?? PARTY_TYPES.find((t) => t.key !== 'client')!;
    expect(org.fields.some((f) => f.key === 'ssn')).toBe(false);
    expect(stripDestinationKeys({ ssn: '000-00-0000', name: 'Acme' })).toEqual({ name: 'Acme' });
  });

  it('does not mutate its argument', () => {
    const input = { ssn: '000-00-0000', note: 'x' };
    stripDestinationKeys(input);
    expect(input.ssn).toBe('000-00-0000');
  });

  it('leaves every non-destination key untouched, including falsy values', () => {
    const out = stripDestinationKeys({ a: '', b: 0, c: false, d: null, dob: '2000-01-01' });
    expect(out).toEqual({ a: '', b: 0, c: false, d: null });
  });
});

describe('merge — the form still renders one flat field set', () => {
  it('reassembles dob from the typed column', () => {
    expect(mergePartyFields({ firstName: 'Ada' }, '1815-12-10').dob).toBe('1815-12-10');
  });

  it('omits PII entirely when the caller does not pass it', () => {
    // A list view simply does not pass `pii`, and therefore cannot render one.
    const out = mergePartyFields({ firstName: 'Ada' }, '1815-12-10');
    expect('ssn' in out).toBe(false);
    expect('dlNumber' in out).toBe(false);
  });

  it('drops a stale blob copy rather than preferring it', () => {
    // A row written before this slice landed may still carry blob keys. The
    // merge must not resurrect them: the typed value is the truth.
    const out = mergePartyFields({ dob: '1900-01-01', ssn: 'stale' }, '1815-12-10');
    expect(out.dob).toBe('1815-12-10');
    expect('ssn' in out).toBe(false);
  });

  it('REGRESSION: revealing PII must not clear the date of birth', () => {
    // Found on a running page, not by a unit test, and the reason it hid is that
    // NEITHER CALL IS WRONG ALONE — so this asserts the SEQUENCE a user performs:
    // open the edit form (merge from the record), then press Show identifying
    // numbers (overlay the child row), then save (split).
    //
    // The defect: the reveal re-ran mergePartyFields with no typed dateOfBirth.
    // That call strips every destination key first and then declines to restore
    // `dob` because none was passed, so the date silently left the form and the
    // next save persisted the clearing.
    const onLoad = mergePartyFields({ firstName: 'Ada' }, '1815-12-10');
    expect(onLoad.dob).toBe('1815-12-10');

    const afterReveal = applyPii(onLoad, { ssn: '000-00-0000', driversLicense: 'X1', driversLicenseState: 'TX' });
    expect(afterReveal.dob).toBe('1815-12-10'); // the assertion that used to fail
    expect(afterReveal.ssn).toBe('000-00-0000');

    const onSave = splitPartyFields(afterReveal);
    expect(onSave.dateOfBirth).toBe('1815-12-10');
    expect(onSave.pii).toEqual({ ssn: '000-00-0000', driversLicense: 'X1', driversLicenseState: 'TX' });
  });

  it('applyPii clears the inputs when the contact has no PII record', () => {
    const out = applyPii({ firstName: 'Ada', dob: '1815-12-10' }, null);
    expect(out.ssn).toBe('');
    expect(out.dlNumber).toBe('');
    expect(out.dob).toBe('1815-12-10');
  });

  it('round-trips split → merge without loss', () => {
    const original = { firstName: 'Ada', dob: '1815-12-10', ssn: '000-00-0000', dlNumber: 'X1', dlState: 'TX' };
    const s = splitPartyFields(original);
    expect(mergePartyFields(s.fields, s.dateOfBirth, s.pii)).toEqual(original);
  });
});

describe('masked by default (§7 item 7, test 4)', () => {
  it('masks ssn in SSN punctuation, showing only the last four', () => {
    expect(maskValue('ssn', '123-45-6789')).toBe('•••–••–6789');
  });

  it('does NOT render a licence number in SSN punctuation', () => {
    // A licence shown as •••–••–1234 reads as an SSN. The mask is per field for
    // that reason and not as a stylistic preference.
    const masked = maskValue('dlNumber', '12345678');
    expect(masked).not.toContain('–');
    expect(masked.endsWith('5678')).toBe(true);
  });

  it('marks both ssn and the licence number sensitive in the registry', () => {
    // `sensitive` drives the display mask. §4 masks the licence as well as the
    // SSN, so the flag has to be on both or the mask silently skips one.
    const client = PARTY_TYPE_MAP['client'];
    expect(client.fields.find((f) => f.key === 'ssn')?.sensitive).toBe(true);
    expect(client.fields.find((f) => f.key === 'dlNumber')?.sensitive).toBe(true);
  });

  it('masks an empty value to an empty string rather than to bullets', () => {
    expect(maskValue('ssn', '')).toBe('');
    expect(maskValue('ssn', null)).toBe('');
  });
});

describe('the §5 pre-flip report', () => {
  it('carries the ruled eight exactly as the migration defines them', () => {
    // Extracted from db/migrations/2026-08-19-gate10-pii-columns.sql, never
    // retyped. A first draft of the module invented a plausible-looking list
    // that shared only three keys with the real one.
    expect([...RULED_EIGHT_KEYS]).toEqual([
      'dob', 'date_of_birth', 'ssn', 'social_security',
      'dl', 'drivers_license', 'driver_license', 'license_number',
    ]);
    expect(RULED_EIGHT_KEYS.length).toBe(8);
  });

  it('needs the as-built list, because the ruled eight cannot see a licence number', () => {
    // The load-bearing distinction: on the ruled list ALONE a stored driver's
    // licence comes back CLEAN, because none of its four licence guesses matches
    // this app's actual keys. That is the schema slice's stated heuristic limit
    // turning out to be real on first contact.
    expect(RULED_EIGHT_KEYS as readonly string[]).not.toContain('dlNumber');
    expect(RULED_EIGHT_KEYS as readonly string[]).not.toContain('dlState');
    expect(AS_BUILT_KEYS as readonly string[]).toContain('dlNumber');

    const rows = [{ id: 'p1', displayName: 'Test', fields: { dlNumber: 'X0000000' } }];
    const hits = preFlipScan(rows);
    expect(hits.map((h) => h.list)).toEqual(['as-built']);
    expect(hits[0].keys).toEqual(['dlNumber']);
  });

  it('reports zero on a blob the slice has already cleaned', () => {
    const clean = splitPartyFields({ firstName: 'Ada', ssn: '000-00-0000', dob: '1815-12-10' }).fields;
    expect(preFlipScan([{ id: 'p1', displayName: 'Ada', fields: clean }])).toEqual([]);
  });

  it('labels both lists separately when a row trips both', () => {
    const hits = preFlipScan([{ id: 'p1', displayName: 'X', fields: { ssn: '1', dlState: 'TX' } }]);
    expect(hits.map((h) => h.list).sort()).toEqual(['as-built', 'ruled-eight']);
  });
});
