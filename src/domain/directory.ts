// CONTACT DIRECTORY (CD-1) — directory-level identity.
//
// Design authority: docs/specs/contact-directory.md. Build authorization and
// scope: docs/specs/cd1-build-slice.md. On any conflict the spec wins.
//
// §1 (RULED): `parties` IS the contact directory. There is no second identity
// table — a second one would recreate the wrong-level defect class CL-2 was
// built to kill. Everything here evolves the existing table in place.
//
// What lives here is what is true about the CONTACT. What is true about the
// contact ON A CASE lives on the roster link (see roster.ts). The split is
// load-bearing: "provider", "attorney", "adjuster" are roles a contact plays,
// not what a contact is (§3.4).

import { PARTY_TYPES } from './partyRegistry';

/** §3.4 (RULED): `party_type` is superseded by MULTI-VALUED directory role tags.
 *
 *  The vocabulary is derived from the party-type registry rather than retyped,
 *  so the backfill (existing single `partyType` -> first tag position) is
 *  mechanical and lossless, and so the two lists cannot drift apart. Adding a
 *  tag means adding a party type; nothing here invents vocabulary. */
export const DIRECTORY_ROLE_TAGS: string[] = PARTY_TYPES.map((t) => t.key);

const ROLE_TAG_SET = new Set(DIRECTORY_ROLE_TAGS);

export function isKnownRoleTag(tag: string): boolean {
  return ROLE_TAG_SET.has(tag);
}

/** §3.2 (RULED): structured name-forms — legal name plus a TYPED alias set.
 *
 *  Exactly the three kinds the spec names. Deliberately NOT a free-text kind:
 *  the whole point of typing aliases is that d/b/a behaves differently from
 *  f/k/a (one is a trade name that may front several entities; the other is a
 *  chain through time). Adding a kind is a spec-level act. */
export type AliasKind = 'dba' | 'fka' | 'suffix-variant';

export const ALIAS_KINDS: AliasKind[] = ['dba', 'fka', 'suffix-variant'];

export const ALIAS_KIND_LABELS: Record<AliasKind, string> = {
  dba: 'd/b/a',
  fka: 'f/k/a',
  'suffix-variant': 'entity-suffix variant',
};

export interface DirectoryAlias {
  kind: AliasKind;
  name: string;
  note?: string;
}

/** §3.1 (RULED): living/deceased is a DIRECTORY-LEVEL fact of the person —
 *  not a roster fact, because the person is dead on every case at once.
 *  Substitution mechanics (who steps in) ride the roster and the edge layer;
 *  this is only the fact itself. Evidence: roster capture REQ-10. */
export interface DeceasedFact {
  deceased: boolean;
  /** Optional — a suggestion of death often precedes a known date. */
  deceasedDate?: string;
}

/** The CD-1 additions to `PartyRecord`. Kept as its own interface so the
 *  directory surface is readable in one place; `PartyRecord` spreads it. */
export interface DirectoryFields {
  /** Multi-valued. Position 0 is the migrated `partyType` value (backfill
   *  contract — see backfill.ts). Order is meaningful only for that reason. */
  roleTags: string[];
  aliases: DirectoryAlias[];
  deceased: boolean;
  deceasedDate?: string;
}

export const EMPTY_DIRECTORY_FIELDS: DirectoryFields = {
  roleTags: [],
  aliases: [],
  deceased: false,
};

/** Fill the CD-1 directory fields for a record that predates them.
 *
 *  ONE definition of the defaults, used by both adapters, the seed, and the
 *  fixtures, so "what does an un-migrated contact look like" cannot drift
 *  between them. The `roleTags[0] === partyType` contract lives here.
 *
 *  Deliberately generic rather than typed to `PartyRecord`: this module must not
 *  import from `types.ts`, which imports from here. */
export function withDirectoryDefaults<T extends { partyType: string }>(
  party: T & Partial<DirectoryFields>,
): T & DirectoryFields {
  return {
    ...party,
    roleTags: party.roleTags?.length ? party.roleTags : (party.partyType ? [party.partyType] : []),
    aliases: party.aliases ?? [],
    deceased: party.deceased ?? false,
  };
}

/** Every name this contact is known by — legal name first, then aliases.
 *  Used for directory search and for the multi-match check below. */
export function allNameForms(displayName: string, aliases: DirectoryAlias[]): string[] {
  return [displayName, ...aliases.map((a) => a.name)].filter(Boolean);
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

export interface AliasMultiMatch {
  /** The name form that resolves to more than one directory entry. */
  name: string;
  /** Directory entry ids sharing it, in input order. */
  contactIds: string[];
}

/** §3.2 (RULED): "a name matching more than one directory entry surfaces a FLAG."
 *
 *  Live evidence (roster capture REQ-04): one mined caption mapped a single
 *  trade name to two distinct corporations — two separate legal entities behind
 *  one storefront. That is why d/b/a-as-plain-text was killed and why this is a
 *  flag rather than a merge: the answer ("which one?") is the attorney's.
 *
 *  ADVISORY ONLY. This never merges, never picks, never auto-resolves — the
 *  same posture the registry takes toward legal propositions. It reports.
 *
 *  Note the deliberate scope: a shared name is only interesting across DIFFERENT
 *  contacts, so a contact listing the same alias twice is not a match. */
export function findAliasMultiMatches(
  contacts: { id: string; displayName: string; aliases: DirectoryAlias[] }[],
): AliasMultiMatch[] {
  const byName = new Map<string, { display: string; ids: Set<string> }>();

  for (const c of contacts) {
    for (const form of allNameForms(c.displayName, c.aliases)) {
      const key = normalizeName(form);
      if (!key) continue;
      const hit = byName.get(key);
      if (hit) hit.ids.add(c.id);
      else byName.set(key, { display: form, ids: new Set([c.id]) });
    }
  }

  const out: AliasMultiMatch[] = [];
  for (const { display, ids } of byName.values()) {
    if (ids.size > 1) out.push({ name: display, contactIds: [...ids] });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/** Directory-level filter used by the /parties list (§8 UI). Matches a contact
 *  carrying ANY of the requested tags; an empty request matches everything. */
export function hasAnyRoleTag(roleTags: string[], wanted: string[]): boolean {
  if (wanted.length === 0) return true;
  return wanted.some((w) => roleTags.includes(w));
}
