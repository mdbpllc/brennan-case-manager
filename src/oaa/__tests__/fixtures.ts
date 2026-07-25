// Fictional Tier 1 OAA fixture — mimics the Uvalde digital form's regions per
// the spec §1a field map. ENTIRELY FICTIONAL (names, numbers, addresses).
// The real sample OAAs are real case data and stay OUT of the repo; when a
// real Uvalde order is available in-session, tune the parser against it and
// extend this fixture to match any layout differences found.

export const UVALDE_OAA_TEXT = `ORDER OF ATTORNEY APPOINTMENT

THE STATE OF TEXAS VS. DANIEL R. OKAFOR
IN THE 38TH JUDICIAL DISTRICT COURT, UVALDE COUNTY, TEXAS

OFFENSE(S):
DATE        OFFENSE                        COURT          CAUSE NO.      COMPLAINT NO.  MTR/MTA  APPEAL
01/12/2026  POSS CS PG 2 < 1G (FS)         38TH DISTRICT  2026-05-14822  C-26-0141      [ ]      [ ]
11/03/2025  EVADING ARREST DET W/VEH (F3)  38TH DISTRICT  2025-11-13990  C-25-1187      [X]      [ ]

DEFENDANT INFORMATION:
LOCAL ID: UV-30112
DOB: 09/22/1994
PHONE:
CELL:
ADDRESS: 388 HACKBERRY ST
CITY/STATE/ZIP: UVALDE, TX 78801
CUSTODY LOCATION: UVALDE COUNTY JAIL
INDIGENCY STATUS: FOUND INDIGENT

APPOINTED ATTORNEY: MICHAEL BRENNAN
PHONE: (830) 555-0102   FAX: (830) 555-0103

The appointed attorney shall represent the defendant in the above cause(s) until the case is
disposed, including through motion for new trial and notice of appeal, unless relieved by the Court.

REMARKS: ATTORNEY AVAILABLE FOR DOCKET ON 08/14/2026. DEFENDANT IN CUSTODY.

APPOINTMENT MADE BY DESIGNEE: LINDA SAENZ
DATE OF APPOINTMENT: 07/20/2026 9:05 AM
`;

/** Same form, but the appointed attorney is someone else — the DeWitt
 *  substitution scenario driving the §1c hard stop. */
export const WRONG_ATTORNEY_OAA_TEXT = UVALDE_OAA_TEXT.replace(
  'APPOINTED ATTORNEY: MICHAEL BRENNAN',
  'APPOINTED ATTORNEY: RAMONA VILLARREAL',
);

/** A scanned Tier 2 packet as pdf text extraction sees it: no text layer. */
export const SCANNED_PACKET_TEXT = '\n \n  \n';
