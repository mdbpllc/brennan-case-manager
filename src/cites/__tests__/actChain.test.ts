// Act-chain grammar tests (#32–35 of the design table) plus real credit
// strings harvested verbatim from the project's statute-text file
// (Nondisclosure_Expunction_Clemency_Statutes.txt) — public statute text,
// per the table's "real-text fixtures" instruction.

import { describe, expect, it } from 'vitest';
import { parseActCredits } from '../actChain';

describe('act-chain grammar (#32–35)', () => {
  it('#32 Added-by credit (real string, harvested)', () => {
    const [c] = parseActCredits(
      'Added by Acts 2023, 88th Leg., R.S., Ch. 765 (H.B. 4504), Sec. 1.001, eff. January 1, 2025.',
    );
    expect(c).toMatchObject({
      action: 'added', year: 2023, leg: 88, sess: 'RS', chapter: 765,
      bill: 'HB 4504', sec: '1.001', eff: '2025-01-01',
    });
  });

  it('#33 Amended-by credit', () => {
    const [c] = parseActCredits(
      'Amended by Acts 2025, 89th Leg., R.S., Ch. 123 (S.B. 456), Sec. 2, eff. September 1, 2025.',
    );
    expect(c).toMatchObject({ action: 'amended', year: 2025, leg: 89, bill: 'SB 456', eff: '2025-09-01' });
  });

  it('#34 pre-bill-number era: page cite, no bill ref, abbreviated month', () => {
    const [c] = parseActCredits(
      'Acts 1973, 63rd Leg., p. 883, ch. 399, Sec. 1, eff. Jan. 1, 1974.',
    );
    // Bare leading credits (no "Added by") are the old-style enacting act.
    expect(c).toMatchObject({ action: 'added', year: 1973, leg: 63, page: 883, chapter: 399, sec: '1', eff: '1974-01-01' });
    expect(c.bill).toBeUndefined();
  });

  it('#35 chained credits — ALL captured in order (real strings, harvested)', () => {
    const block = [
      'Added by Acts 2023, 88th Leg., R.S., Ch. 765 (H.B. 4504), Sec. 1.001, eff. January 1, 2025.',
      '',
      'Amended by: ',
      '',
      'Acts 2025, 89th Leg., R.S., Ch. 850 (S.B. 1667), Sec. 1, eff. September 1, 2025.',
      '',
      'Acts 2025, 89th Leg., R.S., Ch. 204 (H.B. 1620), Sec. 5.028(a), eff. September 1, 2025.',
    ].join('\n');
    const credits = parseActCredits(block);
    expect(credits).toHaveLength(3);
    expect(credits[0]).toMatchObject({ action: 'added', year: 2023, bill: 'HB 4504' });
    expect(credits[1]).toMatchObject({ action: 'amended', year: 2025, bill: 'SB 1667', sec: '1' });
    expect(credits[2]).toMatchObject({ action: 'amended', year: 2025, bill: 'HB 1620', sec: '5.028(a)' });
  });
});
