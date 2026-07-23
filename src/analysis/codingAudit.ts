// Light coding audit (A3-light): duplicates, truncated descriptions, quantity
// anomalies, extended-charge mismatches. Deterministic checks only — findings
// are flags for attorney attention, never conclusions.

import type { BillLineItem } from '../domain/billing';
import { normalizeDescription } from './trigram';

export interface AuditFinding {
  lineItemId: string;
  check: 'duplicate' | 'qty-anomaly' | 'extended-mismatch' | 'truncated-description';
  detail: string;
}

/** Quantities above this on a single line get flagged for a look (therapy units,
 *  supplies etc. can legitimately run high — it's a flag, not an error). */
const QTY_FLAG_THRESHOLD = 24;

/** Extended-charge tolerance in dollars (rounding on unit-price cents). */
const EXTENDED_TOLERANCE = 0.02;

function looksTruncated(desc: string): boolean {
  const norm = normalizeDescription(desc);
  if (norm.length < 20) return false;
  const lastWord = norm.split(' ').pop() ?? '';
  if (lastWord.length < 5) return false;
  // Chargemaster truncation shows up as a long trailing token with almost no
  // vowels ("TRPNIN QUANT" style) — a cheap, deterministic heuristic.
  const vowels = (lastWord.match(/[AEIOU]/g) ?? []).length;
  return vowels / lastWord.length < 0.2;
}

export function runCodingAudit(lines: BillLineItem[]): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const seen = new Map<string, BillLineItem>();

  for (const line of lines) {
    // Duplicate: same service date + normalized description + extended charge.
    const dupKey = `${line.serviceDate ?? ''}|${normalizeDescription(line.rawDescription)}|${line.extendedCharge}`;
    const prior = seen.get(dupKey);
    if (prior) {
      findings.push({
        lineItemId: line.id,
        check: 'duplicate',
        detail: `Same date, description, and charge as another line ("${prior.rawDescription}", $${prior.extendedCharge.toFixed(2)}).`,
      });
    } else {
      seen.set(dupKey, line);
    }

    if (line.qty <= 0) {
      findings.push({ lineItemId: line.id, check: 'qty-anomaly', detail: `Quantity is ${line.qty} — zero/negative quantities need a look.` });
    } else if (line.qty > QTY_FLAG_THRESHOLD) {
      findings.push({ lineItemId: line.id, check: 'qty-anomaly', detail: `Quantity ${line.qty} exceeds ${QTY_FLAG_THRESHOLD} on one line — confirm against the record.` });
    }

    const expected = line.qty * line.unitCharge;
    if (Math.abs(expected - line.extendedCharge) > EXTENDED_TOLERANCE) {
      findings.push({
        lineItemId: line.id,
        check: 'extended-mismatch',
        detail: `Extended charge $${line.extendedCharge.toFixed(2)} ≠ qty ${line.qty} × unit $${line.unitCharge.toFixed(2)} (= $${expected.toFixed(2)}).`,
      });
    }

    if (looksTruncated(line.rawDescription)) {
      findings.push({
        lineItemId: line.id,
        check: 'truncated-description',
        detail: 'Description looks like a truncated chargemaster abbreviation — confirm what was actually billed before relying on the mapping.',
      });
    }
  }
  return findings;
}
