// Pending-bill tracking domain — statute-text-and-bill-tracking-design.md
// Module B (T3). Source: the LegiScan API only (registered key, CC BY 4.0,
// attribution required) — never crawling legiscan.com. Everything here is
// advisory: a matched bill raises watch flags; no parsed "what this bill
// does" ever enters the registry as fact (§8, registry rule 2).

/** Normalized from LegiScan's numeric status codes (see statusFromCode). */
export type BillStatus =
  | 'introduced' | 'engrossed' | 'enrolled'   // active — pending-bill flags
  | 'passed'                                   // hardens to enacted-change-pending (B3)
  | 'vetoed' | 'dead';                         // auto-clears flags

/** What the poller watches (design B: derived from registry cites, plus
 *  Michael's manual topic sweeps — seed rows in watch-targets-seed.md). */
export interface WatchTarget {
  id: string;
  kind: 'registry-derived' | 'manual';
  /** A cite ('CPRC §18.001') for derived rows; a quoted search phrase
   *  ('"counter-affidavit"') for manual sweep rows. */
  citeOrQuery: string;
  note?: string;
  active: boolean;
}

export interface TrackedBill {
  id: string;
  legiscanBillId: number;
  sessionId: number;
  sessionName?: string;
  billNumber: string;   // 'HB 9901'
  title: string;
  status: BillStatus;
  statusDate?: string;
  /** Set once known (enrolled/passed); drives when B3 items join the worklist. */
  effectiveDate?: string;
  /** LegiScan change_hash — the cheap "anything new?" poll signal. */
  changeHash: string;
  lastPolled: string;
  url?: string;
  /** Full source payload, kept verbatim so matcher improvements can re-run
   *  over history without re-spending API queries (design §7). */
  rawJson: string;
}

/** One statute reference the matcher found in a bill's text. */
export interface BillStatuteRef {
  id: string;
  trackedBillId: string;
  code: string;          // 'CP'
  chapter: string;       // '18'
  section?: string;      // '18.001' — absent for chapter-level references
  matchConfidence: 'exact' | 'chapter';
  matchedTextExcerpt: string;
}

/** LegiScan status codes → our lifecycle states. Unknown codes stay
 *  'introduced' (safest: keeps the advisory flag alive). */
export function statusFromCode(code: number): BillStatus {
  switch (code) {
    case 2: return 'engrossed';
    case 3: return 'enrolled';
    case 4: return 'passed';
    case 5: return 'vetoed';
    case 6: return 'dead';
    default: return 'introduced';
  }
}

/** The normalized poll-result bundle both the edge function and the manual
 *  "import poll results" action produce/accept (design §7 demo parity). */
export interface PollResultBundle {
  polledAt: string;
  bills: PollResultBill[];
}

export interface PollResultBill {
  billId: number;
  sessionId: number;
  session?: string;
  number: string;
  title: string;
  statusCode: number;
  statusDate?: string;
  effectiveDate?: string | null;
  changeHash: string;
  url?: string;
  /** Bill text (or the amendatory excerpts) the matcher scans. */
  text: string;
}
