/** Today's date in the user's local timezone as YYYY-MM-DD.
 *  Never use new Date().toISOString() for calendar dates: it is UTC, so a
 *  Texas evening (past UTC midnight) yields tomorrow's date. */
export function localISODate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
