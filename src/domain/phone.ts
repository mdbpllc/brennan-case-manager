// Phone storage/format rules (v0.1 feedback item a). Phone numbers are STORED
// as bare digits, with 'x' + digits appended for an extension ("2545550143",
// "8005550177x214"); formatting to (XXX) XXX-XXXX [xEXT] happens only at the
// input/display layer. Values saved before this existed may be formatted
// strings — normalize before use, never assume the stored form is clean.

/** Reduce any phone-ish string to the stored form: 10 main digits + optional 'x' extension. */
export function normalizePhone(raw: string): string {
  const i = raw.toLowerCase().indexOf('x'); // catches "x214", "ext 214", "ext. 214"
  const mainRaw = i === -1 ? raw : raw.slice(0, i);
  let main = mainRaw.replace(/\D/g, '');
  let ext = (i === -1 ? '' : raw.slice(i)).replace(/\D/g, '');
  if (main.length === 11 && main.startsWith('1')) main = main.slice(1);
  if (main.length > 10) {
    ext = main.slice(10) + ext;
    main = main.slice(0, 10);
  }
  return main + (ext ? `x${ext}` : '');
}

/** Format a stored (or legacy formatted) value for display: (XXX) XXX-XXXX xEXT. */
export function formatPhone(stored: string): string {
  const [main = '', ext = ''] = normalizePhone(stored ?? '').split('x');
  let out: string;
  if (main.length === 0) out = '';
  else if (main.length < 4) out = `(${main}`;
  else if (main.length < 7) out = `(${main.slice(0, 3)}) ${main.slice(3)}`;
  else out = `(${main.slice(0, 3)}) ${main.slice(3, 6)}-${main.slice(6)}`;
  return out + (ext ? ` x${ext}` : '');
}
