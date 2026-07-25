// Registry-derived watch targets (design B: "watch list = derived, not
// hand-built"). The app compiles registry cites into drafting-order search
// phrases and keeps the watch_targets rows in sync; the poller (edge
// function) just reads active rows — no cite logic on the Deno side.

import { db } from '../data';
import { codeByCd } from '../cites/codes';
import { snapshotTargetsForRule } from '../statutes/tripwire';

/** The literal string Texas bills use when amending this target — what
 *  getSearchRaw should quote. */
export function draftingOrderPhrase(target: { code: string; chapter: string; section?: string }): string | null {
  const def = codeByCd(target.code);
  if (!def) return null;
  if (def.kind === 'constitution') return null; // amended by joint resolution, not trackable this way
  if (target.section) {
    return def.kind === 'ccp'
      ? `"Article ${target.section}, Code of Criminal Procedure"`
      : `"Section ${target.section}, ${def.name}"`;
  }
  return def.kind === 'ccp'
    ? `"Chapter ${target.chapter}, Code of Criminal Procedure"`
    : `"Chapter ${target.chapter}, ${def.name}"`;
}

/** Regenerate kind='registry-derived' rows from current registry cites:
 *  add new, drop stale AND duplicate rows, leave manual rows alone.
 *  Concurrent calls share one run (React dev-mode double-effects would
 *  otherwise double-insert), and the duplicate sweep self-heals any store
 *  that raced before this guard existed. */
let inFlight: Promise<{ added: number; removed: number }> | null = null;

export function syncDerivedWatchTargets(): Promise<{ added: number; removed: number }> {
  if (!inFlight) {
    inFlight = doSync().finally(() => { inFlight = null; });
  }
  return inFlight;
}

async function doSync(): Promise<{ added: number; removed: number }> {
  const [rules, targets] = await Promise.all([db.listLegalRules(), db.listWatchTargets()]);

  const wanted = new Map<string, string>(); // phrase → source rule keys
  for (const rule of rules) {
    for (const target of snapshotTargetsForRule(rule)) {
      const phrase = draftingOrderPhrase(target);
      if (!phrase) continue;
      const existing = wanted.get(phrase);
      wanted.set(phrase, existing ? `${existing}, ${rule.ruleKey}` : rule.ruleKey);
    }
  }

  const derived = targets.filter((t) => t.kind === 'registry-derived');
  let added = 0, removed = 0;
  const kept = new Set<string>();

  for (const t of derived) {
    if (!wanted.has(t.citeOrQuery) || kept.has(t.citeOrQuery)) {
      await db.deleteWatchTarget(t.id); // stale or duplicate
      removed++;
    } else {
      kept.add(t.citeOrQuery);
    }
  }
  for (const [phrase, sources] of wanted) {
    if (!kept.has(phrase)) {
      await db.createWatchTarget({
        kind: 'registry-derived', citeOrQuery: phrase,
        note: `from registry: ${sources}`, active: true,
      });
      added++;
    }
  }

  return { added, removed };
}
