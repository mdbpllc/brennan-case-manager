import { describe, expect, it } from 'vitest';
import { parseTier1, toIsoDate, toLocalTime } from '../parseTier1';
import { matchOaaTemplate, hasUsableTextLayer } from '../templates';
import {
  MEDINA_OAA_TEXT, SCANNED_PACKET_TEXT, UVALDE_OAA_TEXT, UVALDE_OCR_OAA_TEXT,
  WRONG_ATTORNEY_OAA_TEXT,
} from './fixtures';

describe('date helpers', () => {
  it('parses common date formats', () => {
    expect(toIsoDate('08/14/2026')).toBe('2026-08-14');
    expect(toIsoDate('8-14-26')).toBe('2026-08-14');
    expect(toIsoDate('August 14, 2026')).toBe('2026-08-14');
    expect(toIsoDate('14/88/2026')).toBeNull();
    expect(toIsoDate('N/A')).toBeNull();
  });
  it('parses times', () => {
    expect(toLocalTime('9:05 AM')).toBe('09:05');
    expect(toLocalTime('12:30 PM')).toBe('12:30');
    expect(toLocalTime('12:15 AM')).toBe('00:15');
    expect(toLocalTime('no time here')).toBeNull();
  });
});

describe('template registry', () => {
  it('matches all printed styles of the standard form family', () => {
    expect(matchOaaTemplate(UVALDE_OAA_TEXT)?.key).toBe('oaa-standard-v1');
    expect(matchOaaTemplate(MEDINA_OAA_TEXT)?.key).toBe('oaa-standard-v1');
    expect(matchOaaTemplate(UVALDE_OCR_OAA_TEXT)?.key).toBe('oaa-standard-v1');
  });
  it('falls back to Tier 2 for unrecognized formats', () => {
    expect(matchOaaTemplate('SOME OTHER COUNTY DOCUMENT ENTIRELY')).toBeNull();
  });
  it('treats a missing text layer as a scan', () => {
    expect(hasUsableTextLayer(SCANNED_PACKET_TEXT)).toBe(false);
    expect(hasUsableTextLayer(UVALDE_OAA_TEXT)).toBe(true);
  });
});

describe('parseTier1 — Uvalde fixture', () => {
  const ex = parseTier1(UVALDE_OAA_TEXT, 'uvalde-real-v1');

  it('extracts the case header', () => {
    expect(ex.defendantName?.value).toBe('DANIEL R. OKAFOR');
    expect(ex.court?.value).toMatch(/38TH JUDICIAL DISTRICT COURT/);
    expect(ex.county?.value.toUpperCase()).toBe('UVALDE');
  });

  it('extracts both offense rows with multi-cause support', () => {
    expect(ex.charges).toHaveLength(2);
    const [first, second] = ex.charges;
    expect(first.offense).toBe('POSS CS PG 2 < 1G');
    expect(first.degree).toBe('FS');
    expect(first.offenseDate).toBe('2026-01-12');
    expect(first.causeNumber).toBe('2026-05-14822');
    expect(first.complaintNumber).toBe('C-26-0141');
    expect(first.mtrMta).toBe(false);
    expect(first.appeal).toBe(false);
    expect(second.offense).toBe('EVADING ARREST DET W/VEH');
    expect(second.degree).toBe('F3');
    expect(second.mtrMta).toBe(true); // MTR checked → revocation-adjudication track
  });

  it('extracts the defendant block', () => {
    expect(ex.localId?.value).toBe('UV-30112');
    expect(ex.dob?.value).toBe('1994-09-22');
    expect(ex.phone).toBeUndefined(); // blank on the form — often is
    expect(ex.address?.value).toBe('388 HACKBERRY ST');
    expect(ex.cityStateZip?.value).toBe('UVALDE, TX 78801');
    expect(ex.custodyLocation?.value).toBe('UVALDE COUNTY JAIL');
    expect(ex.indigencyStatus?.value).toBe('FOUND INDIGENT');
  });

  it('extracts the attorney block without stealing the defendant blank phone', () => {
    expect(ex.attorneyName?.value).toBe('MICHAEL BRENNAN');
    expect(ex.attorneyPhone?.value).toContain('830');
    expect(ex.attorneyFax?.value).toContain('0103');
  });

  it('extracts remarks, docket availability, and the designee footer', () => {
    expect(ex.docketAvailability?.value).toBe('2026-08-14');
    expect(ex.remarks?.value).toContain('DEFENDANT IN CUSTODY');
    expect(ex.appointmentDesignee?.value).toBe('LINDA SAENZ');
    expect(ex.appointmentDate?.value).toBe('2026-07-20T09:05');
    expect(ex.scopeNote?.value).toMatch(/motion for new trial/i);
  });

  it('carries provenance on every extracted field', () => {
    expect(ex.defendantName?.provenance).toMatch(/^line \d+/);
    expect(ex.charges[0].provenance).toMatch(/^line \d+/);
  });

  it('still finds the substituted attorney (validation catches it downstream)', () => {
    const wrong = parseTier1(WRONG_ATTORNEY_OAA_TEXT, 'oaa-standard-v1');
    expect(wrong.attorneyName?.value).toBe('RAMONA VILLARREAL');
  });
});

describe('parseTier1 — Medina-layout fixture (real form, fictionalized)', () => {
  const ex = parseTier1(MEDINA_OAA_TEXT, 'oaa-standard-v1');

  it('reads the boxed caption: defendant, court, county', () => {
    expect(ex.defendantName?.value).toBe('MARCUS DEAN HOLLOWAY');
    expect(ex.court?.value).toBe('CCL Courthouse');
    expect(ex.county?.value).toBe('Medina');
  });

  it('reads the offense row and treats NOT FILED as no cause number', () => {
    expect(ex.charges).toHaveLength(1);
    const c = ex.charges[0];
    expect(c.offense).toBe('POSS MARIJ <2OZ');
    expect(c.degree).toBe('MB');
    expect(c.offenseDate).toBe('2025-05-02');
    expect(c.court).toBe('CCL Courthouse');
    expect(c.causeNumber).toBeUndefined();
    expect(c.mtrMta).toBe(false);
  });

  it('reads colon-free two-column label rows, skipping the blank Phone row', () => {
    expect(ex.localId?.value).toBe('31544');
    expect(ex.dob?.value).toBe('1992-09-14');
    expect(ex.phone?.value).toBe('830-555-0147'); // Cell Phone row; blank Phone row skipped
    expect(ex.address?.value).toBe('4410 CR 241'); // right-column "Full" not swallowed
    expect(ex.cityStateZip?.value).toBe('HONDO, Texas 78861');
    expect(ex.custodyLocation).toBeUndefined(); // blank on this order
  });

  it('reads the Appointed Attorney block (heading + Name/Phone rows)', () => {
    expect(ex.attorneyName?.value).toBe('MICHAEL BRENNAN');
    expect(ex.attorneyPhone?.value).toBe('830-555-0102');
  });

  it('reads the designee footer table', () => {
    expect(ex.appointmentDesignee?.value).toBe('Linda Saenz');
    expect(ex.appointmentDate?.value).toBe('2026-05-05T10:28');
  });

  it('captures the scope paragraph as a note', () => {
    expect(ex.scopeNote?.value).toMatch(/Motion for New/i);
  });
});

describe('parseTier1 — Uvalde OCR fixture (single-space labels, wrapped row)', () => {
  const ex = parseTier1(UVALDE_OCR_OAA_TEXT, 'oaa-standard-v1');

  it('reads the boxed caption', () => {
    expect(ex.defendantName?.value).toBe('DEREK WAYNE COLE');
    expect(ex.court?.value).toBe('38th District Court');
    expect(ex.county?.value).toBe('Uvalde');
  });

  it('merges the wrapped offense row: degree, court, cause, and complaint tails', () => {
    expect(ex.charges).toHaveLength(1);
    const c = ex.charges[0];
    expect(c.offenseDate).toBe('2025-11-14');
    expect(c.offense).toBe('POSS CS PG 1/1-B >=1G<4G');
    expect(c.degree).toBe('F3');
    expect(c.court).toBe('38th District Court');
    expect(c.causeNumber).toBe('2026-05-19342-CR');
    expect(c.complaintNumber).toBe('8155201990-A001');
    expect(c.mtrMta).toBe(false); // "☐ ☐" glyphs are unchecked furniture
    expect(c.confidence).toBe('low'); // wrapped rows always get a review glance
  });

  it('reads single-space label rows with right-column bleed cleaned', () => {
    expect(ex.localId?.value).toBe('40218');
    expect(ex.dob?.value).toBe('1985-04-08');
    expect(ex.phone?.value).toBe('830-555-0166'); // first filled phone row
    expect(ex.address?.value).toBe('5510 PECAN HOLLOW DR'); // "Full" bleed stripped
    expect(ex.cityStateZip?.value).toBe('SAN ANTONIO, Texas 78247');
  });

  it('reads the attorney block in mixed case', () => {
    expect(ex.attorneyName?.value).toBe('Michael Brennan');
    expect(ex.attorneyPhone?.value).toBe('830-555-0102');
    expect(ex.attorneyFax?.value).toBe('830-555-0103');
  });

  it('reads the DOCKET SETTING line with dotted dates', () => {
    expect(ex.docketSetting?.value).toBe('2026-08-19');
    expect(ex.remarks?.value).toContain('XFERRED FR. BEXAR CO.');
  });

  it('reads the page-2 single-spaced designee row', () => {
    expect(ex.appointmentDesignee?.value).toBe('Lupe Ortiz');
    expect(ex.appointmentDate?.value).toBe('2026-07-09T15:59');
  });
});
