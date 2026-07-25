// Manual watch-target seed rows — verbatim from docs/specs/watch-targets-seed.md
// (Michael's O4 decision: all sweep groups in). These are the standing
// getSearchRaw topic sweeps; registry-derived targets are NOT seeded — the
// live list regenerates from Legal Rule Registry cites at poll time.
import type { WatchTarget } from '../domain/bills';

const G1 = 'Group 1 — §18.001 overhaul successors';
const G2 = 'Group 2 — Expunction / nondisclosure (renumbering-robust)';
const G3 = 'Group 3 — Hospital liens / billing';
const G4 = 'Group 4 — Court costs & fees';

const PHRASES: [string, string][] = [
  ['"18.001"', G1],
  ['"counter-affidavit"', G1],
  ['"counteraffidavit"', G1],
  ['"affidavit concerning cost and necessity of services"', G1],
  ['"expunction"', G2],
  ['"order of nondisclosure"', G2],
  ['"criminal history record information"', G2],
  ['"Chapter 55A"', G2],
  ['"Article 55A"', G2],
  ['"Section 411.072"', G2],
  ['"Subchapter E-1, Chapter 411"', G2],
  ['"hospital lien"', G3],
  ['"Chapter 55, Property Code"', G3],
  ['"balance billing"', G3],
  ['"price transparency"', G3],
  ['"itemized statement"', G3],
  ['"court costs"', G4],
  ['"local consolidated fee"', G4],
  ['"state consolidated fee"', G4],
  ['"fine and costs"', G4],
];

export function billsSeedData(): { watchTargets: WatchTarget[] } {
  return {
    watchTargets: PHRASES.map(([citeOrQuery, note], i) => ({
      id: `wt-manual-${String(i + 1).padStart(2, '0')}`,
      kind: 'manual' as const,
      citeOrQuery, note, active: true,
    })),
  };
}
