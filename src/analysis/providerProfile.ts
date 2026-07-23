// ProviderBillingProfile recompute (synthesis Part 4). Deterministic aggregate
// over CONFIRMED runs only — provisional runs never touch the profile, matching
// the only-confirmed-feeds-downstream rule. Cross-case by design: the profile
// lives on the provider-business party record, and it stores ratios and audit
// flags, never client identities (guardrail 7).

import type { DataAdapter } from '../data/adapter';
import { runCodingAudit } from './codingAudit';

/** Rebuild a provider's billing profile from its bills' latest confirmed runs.
 *  Called after a run is confirmed; cheap at practice scale. */
export async function recomputeProviderProfile(db: DataAdapter, providerPartyId: string): Promise<void> {
  const bills = await db.listBillsForProvider(providerPartyId);
  let confirmedBilled = 0;
  let confirmedBenchmark = 0;
  let lastAnalysisDate: string | undefined;
  const flags = new Set<string>();

  for (const bill of bills) {
    const runs = await db.listRunsForBill(bill.id); // newest first
    const latestConfirmed = runs.find((r) => r.status === 'confirmed');
    if (latestConfirmed) {
      confirmedBilled += latestConfirmed.totals.confirmedBilled;
      confirmedBenchmark += latestConfirmed.totals.confirmedBenchmark;
      if (!lastAnalysisDate || latestConfirmed.runDate > lastAnalysisDate) {
        lastAnalysisDate = latestConfirmed.runDate;
      }
    }
    const lines = await db.listLineItems(bill.id);
    for (const f of runCodingAudit(lines)) flags.add(f.check);
  }

  await db.upsertProviderProfile({
    providerPartyId,
    avgBilledToMedicareRatio: confirmedBenchmark > 0
      ? Math.round((confirmedBilled / confirmedBenchmark) * 100) / 100
      : undefined,
    // historicalReductionPct: auto-feeds from settlement outcomes once the
    // settlement module lands — nothing sets it in Phase 1a.
    commonFlags: [...flags].sort(),
    lastAnalysisDate,
  });
}
