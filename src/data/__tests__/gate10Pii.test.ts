// Gate 10, front-end half — the data layer: adapter parity, the v11 → v12
// demo-store migration, and the column list that must never grow a PII column.
//
// Authority: docs/specs/gate10-pii-frontend-slice.md §§2-3 and §7 item 7,
// authorized by Michael's `G10-5` ruling 2026-08-19.
//
// PARITY IS THE POINT OF THE SEAM. The binding architecture rule is that every
// feature works in both modes; the failure this suite guards is one adapter
// stripping the four keys and the other quietly storing them, which would make
// demo mode a liar about what live mode does.

import { describe, it, expect, beforeEach } from 'vitest';
import adapterSource from '../supabaseAdapter.ts?raw';

// Minimal localStorage stub — the migration backs the old store up before
// touching anything, and that backup is a ruled part of the pattern.
const mem = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => { mem.set(k, v); },
  removeItem: (k: string) => { mem.delete(k); },
  clear: () => mem.clear(),
};

const { LocalAdapter, migrateV11ToV12, STORE_VERSION } = await import('../localAdapter');

const KEY = 'brennan-case-manager-v1';

describe('adapter parity — the local adapter honours the destinations (§7 item 7, test 3)', () => {
  beforeEach(() => { mem.clear(); });

  it('createParty strips the four keys from the blob even when handed them raw', () => {
    const db = new LocalAdapter();
    return db.createParty({
      partyType: 'client', kind: 'individual', displayName: 'Ada Byron',
      // Deliberately handed the OLD shape, as a stale caller would hand it.
      fields: { firstName: 'Ada', ssn: '000-00-0000', dlNumber: 'X1', dob: '1815-12-10' },
    }).then(async (rec) => {
      expect('ssn' in rec.fields).toBe(false);
      expect('dlNumber' in rec.fields).toBe(false);
      expect('dob' in rec.fields).toBe(false);
      expect(rec.fields.firstName).toBe('Ada');
      // ...and the value is not hiding in a re-read either.
      const read = await db.getParty(rec.id);
      expect('ssn' in (read!.fields)).toBe(false);
    });
  });

  it('updateParty strips them too — a guard on create alone is not a guard', async () => {
    const db = new LocalAdapter();
    const rec = await db.createParty({
      partyType: 'client', kind: 'individual', displayName: 'Ada', fields: { firstName: 'Ada' },
    });
    const updated = await db.updateParty(rec.id, { fields: { firstName: 'Ada', ssn: '000-00-0000' } });
    expect('ssn' in updated.fields).toBe(false);
    expect(updated.fields.firstName).toBe('Ada');
  });

  it('round-trips the PII through its own methods, not through the party record', async () => {
    const db = new LocalAdapter();
    const rec = await db.createParty({
      partyType: 'client', kind: 'individual', displayName: 'Ada', fields: {},
    });
    await db.savePartyPii(rec.id, { ssn: '000-00-0000', driversLicense: 'X1', driversLicenseState: 'TX' });
    const pii = await db.getPartyPii(rec.id);
    expect(pii).toEqual({
      partyId: rec.id, ssn: '000-00-0000', driversLicense: 'X1', driversLicenseState: 'TX',
    });
    // The list read carries no trace of it. This is the assertion the slice is for.
    const list = await db.listParties();
    expect(JSON.stringify(list)).not.toContain('000-00-0000');
  });

  it('an all-empty patch DELETES the record rather than storing a row of nulls', async () => {
    const db = new LocalAdapter();
    const rec = await db.createParty({
      partyType: 'client', kind: 'individual', displayName: 'Ada', fields: {},
    });
    await db.savePartyPii(rec.id, { ssn: '000-00-0000' });
    expect(await db.getPartyPii(rec.id)).not.toBeNull();
    const cleared = await db.savePartyPii(rec.id, { ssn: '', driversLicense: null });
    expect(cleared).toBeNull();
    expect(await db.getPartyPii(rec.id)).toBeNull();
  });

  it('stores dob on the typed field and keeps it out of the blob', async () => {
    const db = new LocalAdapter();
    const rec = await db.createParty({
      partyType: 'client', kind: 'individual', displayName: 'Ada',
      fields: { firstName: 'Ada' }, dateOfBirth: '1815-12-10',
    });
    expect(rec.dateOfBirth).toBe('1815-12-10');
    expect('dob' in rec.fields).toBe(false);
  });

  it('seeds a store whose parties carry no blob dob and no PII at all', async () => {
    const db = new LocalAdapter();
    const parties = await db.listParties();
    expect(parties.length).toBeGreaterThan(0);
    for (const p of parties) expect('dob' in p.fields).toBe(false);
    // Two demo fixtures carry a date of birth — on the typed field.
    expect(parties.filter((p) => p.dateOfBirth).length).toBe(2);
    const store = JSON.parse(mem.get(KEY)!);
    expect(store.partyPii).toEqual([]);
  });
});

describe('v11 → v12: the demo-store PII promotion', () => {
  beforeEach(() => { mem.clear(); });

  function v11Store() {
    return {
      version: 11,
      parties: [
        {
          id: 'p1', partyType: 'client', kind: 'individual' as const, displayName: 'Ada Byron',
          fields: {
            firstName: 'Ada', phone: '2545550100',
            dob: '1815-12-10', ssn: '000-00-0000', dlNumber: 'X0000000', dlState: 'TX',
          },
          roleTags: ['client'], aliases: [], deceased: false,
          createdAt: 't', updatedAt: 't',
        },
        {
          id: 'p2', partyType: 'person', kind: 'individual' as const, displayName: 'No Pii',
          fields: { firstName: 'No' }, roleTags: ['person'], aliases: [], deceased: false,
          createdAt: 't', updatedAt: 't',
        },
      ],
      reviewLog: [],
    };
  }

  it('moves each value to its home and REMOVES the blob keys rather than copying', () => {
    const old = v11Store();
    const out = migrateV11ToV12(old, JSON.stringify(old));
    const p1 = out.parties.find((p) => p.id === 'p1')!;

    expect(p1.dateOfBirth).toBe('1815-12-10');
    expect(p1.fields).toEqual({ firstName: 'Ada', phone: '2545550100' });
    // "Migrated" must not mean "duplicated" — a value left behind in the blob is
    // exactly the exposure this slice exists to close.
    for (const k of ['dob', 'ssn', 'dlNumber', 'dlState']) expect(k in p1.fields).toBe(false);

    expect(out.partyPii).toEqual([{
      partyId: 'p1', ssn: '000-00-0000', driversLicense: 'X0000000', driversLicenseState: 'TX',
    }]);
  });

  it('gives a contact with no PII no record at all', () => {
    const old = v11Store();
    const out = migrateV11ToV12(old, JSON.stringify(old));
    expect(out.partyPii.some((r) => r.partyId === 'p2')).toBe(false);
  });

  it('lands on v12 — the version this step actually produces', () => {
    // Literal, and deliberately not STORE_VERSION: this step's job is v11→v12.
    // The v10→v11 step read STORE_VERSION and was correct only while that
    // constant happened to be 11; gate 10's bump to 12 made it stamp a v11 store
    // as v12, which would have made the v10 chain SKIP this migration entirely
    // and leave SSNs in the blob. Both are pinned to literals now.
    const old = v11Store();
    expect(migrateV11ToV12(old, JSON.stringify(old)).version).toBe(12);
    // STORE_VERSION moves with every bump; this step's OWN output must not.
    // FE-D1 took the constant to 13 on 2026-08-20 and this line is what made
    // that visible — which is the whole reason it is pinned to a literal here
    // rather than compared against the constant.
    expect(STORE_VERSION).toBe(15);
    expect(STORE_VERSION).toBeGreaterThan(
      migrateV11ToV12(old, JSON.stringify(old)).version,
    );
  });

  it('writes a full pre-migration backup before changing anything', () => {
    const old = v11Store();
    migrateV11ToV12(old, JSON.stringify(old));
    const backup = mem.get(`${KEY}-backup-v11`);
    expect(backup).toBeTruthy();
    const parsed = JSON.parse(backup!);
    expect(parsed.version).toBe(11);
    // The backup is only useful if the ORIGINAL is still readable in it.
    expect(parsed.parties[0].fields.ssn).toBe('000-00-0000');
  });

  it('records what it did in the review log rather than migrating silently', () => {
    const old = v11Store();
    const out = migrateV11ToV12(old, JSON.stringify(old));
    const entry = out.reviewLog.at(-1)!;
    expect(entry.user).toContain('gate 10');
    expect(entry.reason).toContain('REMOVED');
  });
});

describe('the Supabase party column list', () => {
  const src = adapterSource;

  it('no longer selects * from parties', () => {
    // `select('*')` is the mechanism by which blob contents ride every read.
    expect(src).not.toContain("from('parties').select('*')");
  });

  it('names date_of_birth and NO party_pii column', () => {
    const m = /const PARTY_COLUMNS =\s*([\s\S]*?);/.exec(src)!;
    const list = m[1];
    expect(list).toContain('date_of_birth');
    // The child table is never joined into a party read. If this ever fails,
    // someone has widened the list and undone the slice.
    for (const forbidden of ['ssn', 'drivers_license', 'party_pii']) {
      expect(list).not.toContain(forbidden);
    }
  });
});
