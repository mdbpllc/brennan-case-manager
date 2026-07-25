// Poll-result import (design §7) — the ONE ingestion path for bill data.
// The legiscan-poller edge function stores raw rows on cron in live mode;
// this module (a) accepts a normalized PollResultBundle (manual import or
// the demo fixtures) and (b) re-runs matcher + lifecycle over tracked
// bills, so matcher improvements re-apply to history without re-spending
// API queries.

import { db } from '../data';
import type { PollResultBundle, TrackedBill } from '../domain/bills';
import { statusFromCode } from '../domain/bills';
import { extractStatuteRefs } from './matcher';
import { processBill } from './lifecycle';

export interface ImportSummary {
  billsImported: number;
  flagsRaised: number;
  flagsCleared: number;
  log: string[];
}

function isBundle(value: unknown): value is PollResultBundle {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as PollResultBundle;
  return typeof v.polledAt === 'string' && Array.isArray(v.bills) &&
    v.bills.every((b) => typeof b.billId === 'number' && typeof b.number === 'string' &&
      typeof b.statusCode === 'number' && typeof b.text === 'string');
}

export function parseBundle(json: string): PollResultBundle {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Not valid JSON.');
  }
  if (!isBundle(parsed)) {
    throw new Error('Not a poll-result bundle (expected { polledAt, bills: [{ billId, number, statusCode, text, … }] }).');
  }
  return parsed;
}

/** Upsert the bundle's bills, re-match their texts, and apply lifecycle
 *  actions (advisory flags only — §8). */
export async function importPollResults(bundle: PollResultBundle): Promise<ImportSummary> {
  const rules = await db.listLegalRules();
  const summary: ImportSummary = { billsImported: 0, flagsRaised: 0, flagsCleared: 0, log: [] };

  for (const pb of bundle.bills) {
    const bill = await db.upsertTrackedBill({
      legiscanBillId: pb.billId, sessionId: pb.sessionId, sessionName: pb.session,
      billNumber: pb.number, title: pb.title,
      status: statusFromCode(pb.statusCode), statusDate: pb.statusDate,
      effectiveDate: pb.effectiveDate ?? undefined,
      changeHash: pb.changeHash, lastPolled: bundle.polledAt, url: pb.url,
      rawJson: JSON.stringify(pb),
    });
    summary.billsImported++;

    const refs = extractStatuteRefs(pb.text);
    await db.saveBillRefs(bill.id, refs);
    await applyLifecycle(bill, refs, rules, summary);
  }

  return summary;
}

/** Re-run matcher + lifecycle over every tracked bill from its stored raw
 *  payload — the "matcher improved, re-apply to history" path. */
export async function reprocessTrackedBills(): Promise<ImportSummary> {
  const [bills, rules] = await Promise.all([db.listTrackedBills(), db.listLegalRules()]);
  const summary: ImportSummary = { billsImported: 0, flagsRaised: 0, flagsCleared: 0, log: [] };

  for (const bill of bills) {
    let text = '';
    try {
      text = (JSON.parse(bill.rawJson) as { text?: string }).text ?? '';
    } catch {
      summary.log.push(`${bill.billNumber}: stored payload unreadable — skipped.`);
      continue;
    }
    const refs = extractStatuteRefs(text);
    await db.saveBillRefs(bill.id, refs);
    await applyLifecycle(bill, refs, rules, summary);
  }

  return summary;
}

async function applyLifecycle(
  bill: TrackedBill,
  refs: ReturnType<typeof extractStatuteRefs>,
  rules: Awaited<ReturnType<typeof db.listLegalRules>>,
  summary: ImportSummary,
): Promise<void> {
  const activeFlags = await db.listWatchFlags(true);
  const actions = processBill(bill, refs, rules, activeFlags);
  for (const raise of actions.raise) {
    await db.createWatchFlag({
      ruleId: raise.ruleId, kind: raise.kind, sourceRef: raise.sourceRef,
      detail: raise.detail, effectiveDate: raise.effectiveDate,
    });
    summary.flagsRaised++;
  }
  for (const clear of actions.clear) {
    await db.clearWatchFlag(clear.flagId, clear.reason);
    summary.flagsCleared++;
  }
  summary.log.push(...actions.log);
}
