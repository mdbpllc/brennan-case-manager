import { describe, expect, it } from 'vitest';
import { parseTier1, toIsoDate, toLocalTime } from '../parseTier1';
import { matchOaaTemplate, hasUsableTextLayer } from '../templates';
import { SCANNED_PACKET_TEXT, UVALDE_OAA_TEXT, WRONG_ATTORNEY_OAA_TEXT } from './fixtures';

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
  it('matches the Uvalde/Real form family', () => {
    expect(matchOaaTemplate(UVALDE_OAA_TEXT)?.key).toBe('uvalde-real-v1');
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
    const wrong = parseTier1(WRONG_ATTORNEY_OAA_TEXT, 'uvalde-real-v1');
    expect(wrong.attorneyName?.value).toBe('RAMONA VILLARREAL');
  });
});
