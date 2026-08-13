import { describe, it, expect } from 'vitest';
import {
  DIRECTORY_ROLE_TAGS, isKnownRoleTag, findAliasMultiMatches, hasAnyRoleTag, allNameForms,
} from '../directory';
import type { DirectoryAlias } from '../directory';
import { PARTY_TYPES } from '../partyRegistry';

describe('directory role tags', () => {
  it('derives the tag vocabulary from the party-type registry so the two cannot drift', () => {
    expect(DIRECTORY_ROLE_TAGS).toEqual(PARTY_TYPES.map((t) => t.key));
    expect(isKnownRoleTag('attorney')).toBe(true);
    expect(isKnownRoleTag('not-a-real-tag')).toBe(false);
  });

  it('filters on ANY requested tag, and an empty request matches everything', () => {
    expect(hasAnyRoleTag(['attorney', 'expert'], ['expert'])).toBe(true);
    expect(hasAnyRoleTag(['attorney'], ['expert'])).toBe(false);
    expect(hasAnyRoleTag([], [])).toBe(true);
  });
});

describe('alias multi-match flag (§3.2)', () => {
  const dba = (name: string): DirectoryAlias => ({ kind: 'dba', name });

  it('flags one trade name fronting two distinct corporations — the mined caption', () => {
    const matches = findAliasMultiMatches([
      { id: 'corp-a', displayName: 'Alpha Holdings LLC', aliases: [dba('Corner Market')] },
      { id: 'corp-b', displayName: 'Beta Ventures LLC', aliases: [dba('Corner Market')] },
    ]);
    expect(matches).toHaveLength(1);
    expect(matches[0].name).toBe('Corner Market');
    expect(matches[0].contactIds.sort()).toEqual(['corp-a', 'corp-b']);
  });

  it('normalizes case and whitespace before comparing', () => {
    const matches = findAliasMultiMatches([
      { id: 'a', displayName: 'A LLC', aliases: [dba('  corner   MARKET ')] },
      { id: 'b', displayName: 'B LLC', aliases: [dba('Corner Market')] },
    ]);
    expect(matches).toHaveLength(1);
  });

  it('matches a legal name against another contact\'s alias, not just alias-to-alias', () => {
    const matches = findAliasMultiMatches([
      { id: 'a', displayName: 'Corner Market', aliases: [] },
      { id: 'b', displayName: 'Beta Ventures LLC', aliases: [dba('Corner Market')] },
    ]);
    expect(matches).toHaveLength(1);
    expect(matches[0].contactIds.sort()).toEqual(['a', 'b']);
  });

  it('does NOT flag one contact carrying the same alias twice — a match needs two contacts', () => {
    expect(findAliasMultiMatches([
      { id: 'a', displayName: 'Alpha LLC', aliases: [dba('Corner Market'), dba('Corner Market')] },
    ])).toEqual([]);
  });

  it('is advisory only: it reports and never merges or picks', () => {
    const contacts = [
      { id: 'a', displayName: 'Alpha LLC', aliases: [dba('Shared')] },
      { id: 'b', displayName: 'Beta LLC', aliases: [dba('Shared')] },
    ];
    const before = JSON.parse(JSON.stringify(contacts));
    findAliasMultiMatches(contacts);
    expect(contacts).toEqual(before);
  });

  it('returns nothing when every name is distinct', () => {
    expect(findAliasMultiMatches([
      { id: 'a', displayName: 'Alpha LLC', aliases: [dba('Store One')] },
      { id: 'b', displayName: 'Beta LLC', aliases: [dba('Store Two')] },
    ])).toEqual([]);
  });
});

describe('allNameForms', () => {
  it('puts the legal name first and drops blanks', () => {
    expect(allNameForms('Alpha LLC', [{ kind: 'fka', name: 'Omega LLC' }, { kind: 'dba', name: '' }]))
      .toEqual(['Alpha LLC', 'Omega LLC']);
  });
});
