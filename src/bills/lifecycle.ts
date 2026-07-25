// Bill lifecycle → watch-flag actions (design B3). Pure decision function:
// bills + matches + current flags in, raise/clear actions out — the caller
// applies them through the DataAdapter. Discipline (§8): flags are advisory;
// passage hardens pending-bill → enacted-change-pending; death auto-clears
// with an attributed system clearance. Verified status is never touched.

import type { LegalRule } from '../domain/billing';
import type { BillStatuteRef, TrackedBill } from '../domain/bills';
import type { WatchFlag } from '../domain/statutes';
import { rulesTouchedByRefs } from './matcher';

export interface FlagRaise {
  ruleId: string;
  kind: 'pending-bill' | 'enacted-change-pending';
  sourceRef: string;      // bill number — one flag per rule per bill
  detail: string;
  effectiveDate?: string;
}

export interface FlagClear {
  flagId: string;
  reason: string;         // becomes clearedBy — always attributed
}

export interface LifecycleActions {
  raise: FlagRaise[];
  clear: FlagClear[];
  /** Log lines for the UI ("HB 9901 died — 2 flags auto-cleared"). */
  log: string[];
}

const ACTIVE_STATUSES = new Set(['introduced', 'engrossed', 'enrolled']);

export function processBill(
  bill: TrackedBill,
  refs: Pick<BillStatuteRef, 'code' | 'chapter' | 'section'>[],
  rules: LegalRule[],
  activeFlags: WatchFlag[],
): LifecycleActions {
  const actions: LifecycleActions = { raise: [], clear: [], log: [] };
  const touched = rulesTouchedByRefs(refs, rules);
  const billFlags = activeFlags.filter((f) => f.sourceRef === bill.billNumber && !f.clearedAt);
  const has = (ruleId: string, kind: string) => billFlags.some((f) => f.ruleId === ruleId && f.kind === kind);

  if (ACTIVE_STATUSES.has(bill.status)) {
    for (const { rule, matchedRefs } of touched) {
      if (has(rule.id, 'pending-bill')) continue;
      actions.raise.push({
        ruleId: rule.id, kind: 'pending-bill', sourceRef: bill.billNumber,
        detail: `${bill.billNumber} (${bill.status}): ${bill.title} — touches ${matchedRefs.join(', ')}.`,
      });
    }
    return actions;
  }

  if (bill.status === 'passed') {
    // Harden (B3): pending → enacted-change-pending with the effective date.
    for (const f of billFlags.filter((f) => f.kind === 'pending-bill')) {
      actions.clear.push({ flagId: f.id, reason: `system — ${bill.billNumber} passed (hardened to enacted-change-pending)` });
    }
    for (const { rule, matchedRefs } of touched) {
      if (has(rule.id, 'enacted-change-pending')) continue;
      actions.raise.push({
        ruleId: rule.id, kind: 'enacted-change-pending', sourceRef: bill.billNumber,
        detail: `${bill.billNumber} passed: ${bill.title} — touches ${matchedRefs.join(', ')}. ` +
          (bill.effectiveDate ? `Effective ${bill.effectiveDate}; joins the re-verification worklist that day.` : 'Effective date not yet recorded.'),
        effectiveDate: bill.effectiveDate,
      });
    }
    if (actions.raise.length || actions.clear.length) {
      actions.log.push(`${bill.billNumber} passed — ${actions.raise.length} enacted-change flag(s) raised${bill.effectiveDate ? `, effective ${bill.effectiveDate}` : ''}.`);
    }
    return actions;
  }

  // vetoed / dead: everything this bill raised auto-clears, with a log line.
  const reason = bill.status === 'vetoed' ? `system — ${bill.billNumber} vetoed` : `system — ${bill.billNumber} died (sine die)`;
  for (const f of billFlags) actions.clear.push({ flagId: f.id, reason });
  if (billFlags.length) {
    actions.log.push(`${bill.billNumber} ${bill.status === 'vetoed' ? 'was vetoed' : 'died'} — ${billFlags.length} flag(s) auto-cleared.`);
  }
  return actions;
}
