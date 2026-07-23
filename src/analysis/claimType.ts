// Claim-type detection (A4): professional vs facility. Deterministic hint only —
// the attorney's setting always wins (claimTypeSource: 'attorney').
// Facility bills carry a hard disclaimer in Phase 1: benchmarks here are
// professional-schedule numbers; the dry run showed facility rates running
// 4–10× the professional estimate, so the label is load-bearing.

import type { BillLineItem, ClaimType } from '../domain/billing';

export function detectClaimType(lines: BillLineItem[]): { claimType: ClaimType; reason: string } {
  if (lines.length === 0) return { claimType: 'unknown', reason: 'No line items yet.' };
  const withRevCode = lines.filter((l) => l.revenueCode && l.revenueCode.trim() !== '');
  if (withRevCode.length > 0) {
    return {
      claimType: 'facility',
      reason: `${withRevCode.length} of ${lines.length} lines carry revenue codes — revenue codes appear on facility (UB-04) claims, not professional (CMS-1500) claims.`,
    };
  }
  return { claimType: 'professional', reason: 'No revenue codes on any line — consistent with a professional (CMS-1500) claim.' };
}
