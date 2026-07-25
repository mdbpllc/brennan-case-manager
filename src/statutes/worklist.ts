// Unified re-verification worklist (design T4) — one list from both feeds:
//   A4  text-changed-since-verified  → due immediately
//   A4  section-removed              → due immediately, listed first (most urgent)
//   B3  enacted-change-pending       → joins on its effective date
// pending-bill flags are watch INFO (shown on rules/bills), never worklist
// items — nothing is due until text actually changes or a change is enacted.

import type { LegalRule } from '../domain/billing';
import type { WatchFlag } from '../domain/statutes';

export interface WorklistItem {
  rule: LegalRule;
  flags: WatchFlag[];
}

export interface Worklist {
  /** Re-verify now: text moved, or an enacted change is in effect. */
  due: WorklistItem[];
  /** Enacted changes with a future (or unrecorded) effective date. */
  upcoming: WorklistItem[];
  /** Distinct bill numbers with active pending-bill flags — context count. */
  pendingBills: number;
}

export function buildWorklist(rules: LegalRule[], activeFlags: WatchFlag[], todayIso: string): Worklist {
  const today = todayIso.slice(0, 10);
  const dueByRule = new Map<string, WatchFlag[]>();
  const upcomingByRule = new Map<string, WatchFlag[]>();
  const pendingBillNumbers = new Set<string>();

  for (const flag of activeFlags) {
    if (flag.clearedAt) continue;
    if (flag.kind === 'pending-bill') {
      pendingBillNumbers.add(flag.sourceRef);
      continue;
    }
    const isDue =
      flag.kind === 'text-changed-since-verified' ||
      flag.kind === 'section-removed' ||
      (flag.kind === 'enacted-change-pending' && !!flag.effectiveDate && flag.effectiveDate <= today);
    const bucket = isDue ? dueByRule : upcomingByRule;
    const list = bucket.get(flag.ruleId);
    if (list) list.push(flag); else bucket.set(flag.ruleId, [flag]);
  }

  const toItems = (bucket: Map<string, WatchFlag[]>): WorklistItem[] =>
    [...bucket.entries()]
      .map(([ruleId, flags]) => ({ rule: rules.find((r) => r.id === ruleId), flags }))
      .filter((i): i is WorklistItem => i.rule !== undefined)
      .sort((a, b) => a.rule.ruleKey.localeCompare(b.rule.ruleKey));

  // A rule already due doesn't also appear under upcoming. Rules with a
  // removed section (cite points at nothing) outrank plain text changes.
  const due = toItems(dueByRule).sort((a, b) =>
    Number(b.flags.some((f) => f.kind === 'section-removed')) -
    Number(a.flags.some((f) => f.kind === 'section-removed')));
  const dueIds = new Set(due.map((i) => i.rule.id));
  const upcoming = toItems(upcomingByRule).filter((i) => !dueIds.has(i.rule.id));

  return { due, upcoming, pendingBills: pendingBillNumbers.size };
}
