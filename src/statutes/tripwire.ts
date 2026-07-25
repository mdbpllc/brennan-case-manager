// A4 hash tripwire — the registry re-verification loop.
//
//   verify (attorney sign-off) ──▶ snapshot: section hash as verification saw it
//   refresh (biennial / manual) ─▶ re-fetch, re-hash, diff vs snapshots
//   hash moved ──────────────────▶ raise `text-changed-since-verified` flag
//
// Advisory only, by design (§8): a raised flag never changes verified
// status; Michael re-verifying is what clears it (and re-pins the snapshot).

import { db } from '../data';
import type { LegalRule } from '../domain/billing';
import type {
  RegistryVerificationSnapshot, StatuteSection, WatchFlag,
} from '../domain/statutes';
import { chapterRef, sectionRef, snapshotRefForCite } from '../domain/statutes';
import { parseCite } from '../cites/parser';
import { chapterAggregateHash } from './sections';
import { getOrFetchChapter, StatuteFetchError } from './fetcher';

/** sectionRef → current hash, incl. per-chapter aggregates for
 *  chapter-level cites ('PR ch. 55'). */
export function buildHashIndex(sections: StatuteSection[]): Map<string, string> {
  const index = new Map<string, string>();
  const byChapter = new Map<string, StatuteSection[]>();
  for (const s of sections) {
    index.set(sectionRef(s.code, s.sectionNumber), s.contentHash);
    const key = chapterRef(s.code, s.chapter);
    const list = byChapter.get(key);
    if (list) list.push(s); else byChapter.set(key, [s]);
  }
  for (const [key, list] of byChapter) {
    list.sort((a, b) => a.sectionNumber.localeCompare(b.sectionNumber, undefined, { numeric: true }));
    index.set(key, chapterAggregateHash(list));
  }
  return index;
}

export interface TripwireHit {
  ruleId: string;
  sourceRef: string;
  kind: 'text-changed-since-verified' | 'section-removed';
  detail: string;
}

/** The chapter a snapshot ref lives in, as a chapterRef key:
 *  'CP 41.0105' → 'CP ch. 41', 'CR 55A.053' → 'CR ch. 55A',
 *  'PR ch. 55' → itself. */
export function chapterRefForSnapshotRef(ref: string): string {
  if (/ ch\. /.test(ref)) return ref;
  const m = /^(\S+) (\d+[A-Z]?)\./.exec(ref);
  return m ? chapterRef(m[1], m[2]) : ref;
}

/** The diff at the heart of A4. Pure: snapshots + current hashes + active
 *  flags in, flags-to-raise out. A ref with no current hash normally is
 *  NOT a hit (chapter fell out of cache — no evidence of change), EXCEPT
 *  when its chapter is in `refreshedChapterRefs` (just re-fetched
 *  successfully): then the section itself is gone from the current file —
 *  repeal or renumbering (e.g. the CCP art. 55A recodification) — and the
 *  more urgent `section-removed` flag is raised. Refs already carrying an
 *  active same-kind flag don't re-raise. */
export function diffSnapshots(
  snapshots: RegistryVerificationSnapshot[],
  currentHashes: Map<string, string>,
  activeFlags: WatchFlag[],
  refreshedChapterRefs: Set<string> = new Set(),
): TripwireHit[] {
  const alreadyFlagged = new Set(
    activeFlags
      .filter((f) => (f.kind === 'text-changed-since-verified' || f.kind === 'section-removed') && !f.clearedAt)
      .map((f) => `${f.ruleId}|${f.sourceRef}|${f.kind}`),
  );
  const hits: TripwireHit[] = [];
  for (const snap of snapshots) {
    const current = currentHashes.get(snap.sectionRef);
    let hit: Omit<TripwireHit, 'ruleId' | 'sourceRef'> | undefined;
    if (current === undefined) {
      if (!refreshedChapterRefs.has(chapterRefForSnapshotRef(snap.sectionRef))) continue;
      hit = {
        kind: 'section-removed',
        detail: `Section verified on ${snap.verifiedAt.slice(0, 10)} no longer exists in the refreshed chapter — repealed or renumbered. Locate the successor provision, update the cite, and re-verify.`,
      };
    } else if (current !== snap.contentHash) {
      hit = {
        kind: 'text-changed-since-verified',
        detail: `Statute text changed since verification on ${snap.verifiedAt.slice(0, 10)} — re-verify against current text.`,
      };
    } else {
      continue;
    }
    if (alreadyFlagged.has(`${snap.ruleId}|${snap.sectionRef}|${hit.kind}`)) continue;
    hits.push({ ruleId: snap.ruleId, sourceRef: snap.sectionRef, ...hit });
  }
  return hits;
}

/** Snapshot targets for a rule: every cite that resolves to a cacheable TX
 *  statute section or chapter. Case law, federal, and rule cites are not
 *  snapshot targets (nothing here can watch them — CourtListener design
 *  covers case law separately). */
export function snapshotTargetsForRule(rule: Pick<LegalRule, 'cites'>): {
  ref: string; code: string; chapter: string; section?: string;
}[] {
  const out: { ref: string; code: string; chapter: string; section?: string }[] = [];
  const seen = new Set<string>();
  for (const cite of rule.cites) {
    const target = snapshotRefForCite(parseCite(cite));
    if (target && !seen.has(target.ref)) {
      seen.add(target.ref);
      out.push(target);
    }
  }
  return out;
}

export interface SnapshotResult {
  saved: RegistryVerificationSnapshot[];
  /** Refs that couldn't be pinned (chapter not fetchable) — surfaced, never silent. */
  skipped: { ref: string; reason: string }[];
}

/** Pin a rule's cited statute text at verification time. Fetches chapters
 *  on demand; a chapter that can't be fetched is reported as skipped. */
export async function snapshotRuleCites(rule: Pick<LegalRule, 'id' | 'cites'>): Promise<SnapshotResult> {
  const targets = snapshotTargetsForRule(rule);
  const verifiedAt = new Date().toISOString();
  const snaps: Omit<RegistryVerificationSnapshot, 'id' | 'ruleId'>[] = [];
  const skipped: { ref: string; reason: string }[] = [];

  for (const target of targets) {
    try {
      await getOrFetchChapter(target.code, target.chapter);
      const sections = await db.listSectionsForChapter(target.code, target.chapter);
      const index = buildHashIndex(sections);
      const hash = index.get(target.ref);
      if (hash === undefined) {
        skipped.push({ ref: target.ref, reason: 'section not found in the chapter file' });
        continue;
      }
      snaps.push({ sectionRef: target.ref, contentHash: hash, verifiedAt });
    } catch (e) {
      skipped.push({
        ref: target.ref,
        reason: e instanceof StatuteFetchError ? e.message : 'fetch failed',
      });
    }
  }

  const saved = await db.saveSnapshotsForRule(rule.id, snaps);
  return { saved, skipped };
}

/** Michael re-verifying IS the act that clears the tripwire flags —
 *  both A4 kinds (text-changed and section-removed). */
export async function clearTripwireFlags(ruleId: string, clearedBy: string): Promise<number> {
  const active = await db.listWatchFlags(true);
  const mine = active.filter((f) =>
    f.ruleId === ruleId && (f.kind === 'text-changed-since-verified' || f.kind === 'section-removed'));
  for (const f of mine) await db.clearWatchFlag(f.id, clearedBy);
  return mine.length;
}

export interface RefreshResult {
  refreshed: number;
  failed: { code: string; chapter: string; reason: string }[];
  raised: WatchFlag[];
}

/** The biennial-refresh action: re-fetch every cached chapter from source,
 *  re-hash, and raise flags where verified text moved — or, for chapters
 *  that DID refresh, where a pinned section is gone entirely
 *  (`section-removed`, the more urgent A4 signal). Sequential fetches
 *  on purpose (courtesy to the source). */
export async function refreshCacheAndRunTripwire(): Promise<RefreshResult> {
  const chapters = await db.listStatuteChapters();
  const failed: RefreshResult['failed'] = [];
  const allSections: StatuteSection[] = [];
  // Only a chapter we KNOW is current can prove a section's absence; a
  // failed refresh keeps the stale cache and stays out of this set.
  const refreshedChapterRefs = new Set<string>();

  for (const ch of chapters) {
    try {
      await getOrFetchChapter(ch.code, ch.chapter, true);
      refreshedChapterRefs.add(chapterRef(ch.code, ch.chapter));
    } catch (e) {
      // Keep the stale cache — a refresh failure must not lose text.
      failed.push({ code: ch.code, chapter: ch.chapter, reason: e instanceof Error ? e.message : 'fetch failed' });
    }
    allSections.push(...await db.listSectionsForChapter(ch.code, ch.chapter));
  }

  const [snapshots, activeFlags] = await Promise.all([db.listAllSnapshots(), db.listWatchFlags(true)]);
  const hits = diffSnapshots(snapshots, buildHashIndex(allSections), activeFlags, refreshedChapterRefs);

  const raised: WatchFlag[] = [];
  for (const hit of hits) {
    raised.push(await db.createWatchFlag({
      ruleId: hit.ruleId, kind: hit.kind,
      sourceRef: hit.sourceRef, detail: hit.detail,
    }));
  }

  return { refreshed: chapters.length - failed.length, failed, raised };
}
