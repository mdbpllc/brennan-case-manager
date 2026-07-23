// Stale-analysis detection (synthesis Part 1.1 item 5). Deterministic: a run
// is stale when the inputs it pinned — the loaded fee schedules and the
// registry-rule versions it stamped — have changed since it ran. Full
// date-of-service pinning (schedule in force on the DOS) arrives with
// effective-dated schedules in Phase 2; until then the schedule set is the pin.

import type { AnalysisRun, FeeSchedule, LegalRule } from '../domain/billing';

/** Reasons this run's inputs have changed since it ran. Empty = not stale. */
export function runStalenessReasons(
  run: AnalysisRun,
  currentSchedules: FeeSchedule[],
  currentRules: LegalRule[],
): string[] {
  const reasons: string[] = [];

  const currentIds = new Set(currentSchedules.map((s) => s.id));
  const usedIds = new Set(run.scheduleIds);
  const removed = run.scheduleIds.filter((id) => !currentIds.has(id));
  if (removed.length > 0) {
    reasons.push(`${removed.length} fee schedule${removed.length === 1 ? '' : 's'} this run relied on ${removed.length === 1 ? 'has' : 'have'} been removed.`);
  }
  const added = currentSchedules.filter((s) => !usedIds.has(s.id));
  if (added.length > 0) {
    reasons.push(`New fee schedule${added.length === 1 ? '' : 's'} loaded since this run: ${added.map((s) => s.name).join(', ')}.`);
  }

  const ruleById = new Map(currentRules.map((r) => [r.id, r]));
  for (const stamp of run.registryStamps) {
    const cur = ruleById.get(stamp.ruleId);
    if (cur && cur.version !== stamp.version) {
      reasons.push(`Registry rule ${stamp.ruleKey} changed since this run (v${stamp.version} → v${cur.version}).`);
    }
  }

  return reasons;
}
