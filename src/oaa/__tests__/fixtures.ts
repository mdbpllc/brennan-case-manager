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

/** Fictionalized replica of the REAL standard-form layout (from a scanned
 *  Medina County order reviewed 2026-07-25 — the real document stays out of
 *  the repo; every name/number here is invented). Layout differences from the
 *  Uvalde fixture above: boxed caption with "&" column separators, two-column
 *  label rows WITHOUT colons, blank Phone row above a filled Cell Phone row,
 *  right-hand column sharing printed rows (Indigency Status), an "Appointed
 *  Attorney" heading block, cause column reading "NOT FILED", and a
 *  "Court Appointed Designee  Date  Time" footer table. */
/** Fictionalized replica of a REAL Uvalde County order with an OCR text layer
 *  (reviewed 2026-07-25; every name/number invented). What it adds over the
 *  Medina fixture: SINGLE-space label rows ("Name DEREK WAYNE COLE"), a
 *  wrapped offense row whose continuation line carries the degree, court,
 *  cause, and complaint tails, "☐" checkbox glyphs, right-column bleed with
 *  single spaces, a free-text "DOCKET SETTING" line with dotted dates, and
 *  the designee value row landing on page 2 (blank line from the page join,
 *  single-spaced cells). */
export const UVALDE_OCR_OAA_TEXT = `ORDER OF ATTORNEY APPOINTMENT
STATE OF TEXAS & 38th District Court
VS & OF
DEREK WAYNE COLE & Uvalde County, TEXAS
Offense(s)
Date Offense Court Cause Complaint MTR/  Appeal
MTA
11/14/25 POSS CS PG 1/1-B >=1G<4G  38th District  2026-05-19342-  8155201990-  ☐ ☐
(F3)  Court  CR  A001
Defendant
Name DEREK WAYNE COLE
Local Id 40218
Date of Birth 4/8/1985
Phone 830-555-0166
Cell Phone 830-555-0167 Indigency Status:
Address 5510 PECAN HOLLOW DR Full
City, State Zip SAN ANTONIO, Texas 78247
Gender Male
Race White
Custody Location
Appointed Attorney
Name Michael Brennan
Phone 830-555-0102
Fax 830-555-0103
Address PO Box 91104
City, State Zip San Antonio, Texas 78209
The above attorney is appointed to represent the defendant in the above numbered and entitled
cause/complaint/case in all litigation in the trial court through and including a ruling on a Motion for New
Trial, and filing a notice of appeal, if appropriate, unless released by written order of this Court at an earlier
date or by the Court's appointment of appellate counsel.
Attorney appointed from the County Approved Attorney Wheel and is the next attorney qualified to represent
the defendant.
DOCKET SETTING 08.19.2026 --XFERRED FR. BEXAR CO. 07.08.2026--ARRIVED AT UC JAIL @ 13.16 ON
07.08.2026
Court Appointed Designee Date Time

Lupe Ortiz 7/9/2026 3:59 PM
`;

export const MEDINA_OAA_TEXT = `ORDER OF ATTORNEY APPOINTMENT

STATE OF TEXAS  &  CCL Courthouse
VS  &  OF
MARCUS DEAN HOLLOWAY  &  Medina County, TEXAS

Offense(s)
Date  Offense  Court  Cause  Complaint  MTR/ MTA  Appeal
05/02/25  POSS MARIJ <2OZ (MB)  CCL Courthouse  NOT FILED

Defendant
Name  MARCUS DEAN HOLLOWAY
Local Id  31544
Date of Birth  9/14/1992
Phone
Cell Phone  830-555-0147  Indigency Status:
Address  4410 CR 241  Full
City, State Zip  HONDO, Texas 78861
Gender  Male
Race  White
Custody Location

Appointed Attorney
Name  MICHAEL BRENNAN
Phone  830-555-0102
Fax
Address  1100 MAIN ST SUITE 200
City, State Zip  HONDO, Texas 78861

The above attorney is appointed to represent the defendant in the above numbered and entitled
cause/complaint/case in all litigation in the trial court through and including a ruling on a Motion for New
Trial, and filing a notice of appeal, if appropriate, unless released by written order of this Court at an earlier
date or by the Court's appointment of appellate counsel.

Attorney appointed out of rotation by signed judicial order or appointed by judges' designee according to
Medina County's Approved Policy.

Court Appointed Designee  Date  Time
Linda Saenz  5/5/2026  10:28 AM
`;
