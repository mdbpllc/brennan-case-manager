/**
 * Minimal ZIP reader/writer for .docx surgery.
 *
 * Zero dependencies BY DESIGN. A .docx is a ZIP of XML parts, and the engine's
 * binding invariant (form-engine.md §1) is that it *edits* that ZIP rather than
 * regenerating a document — so all this layer has to do is unzip, hand out the
 * parts, and rezip with every untouched part carried through unchanged.
 *
 * Compression is the platform's own `CompressionStream`/`DecompressionStream`
 * with `deflate-raw`, which is what a ZIP stores. That works identically in the
 * browser, in Node (18+), and under vitest, so the engine needs no bundler
 * config and no new package. Measured on Michael's master 2026-08-20: 26
 * members, 25 of them method 8 (deflate), no data descriptors.
 *
 * What this deliberately does NOT support: encryption, ZIP64, data descriptors
 * (bit 3), and multi-disk archives. A .docx written by Word or by python-docx
 * uses none of them; a file that does is rejected loudly rather than parsed
 * half-way, because a silently mis-parsed shell is exactly the class of defect
 * §12.2's expect-count assertions exist to catch.
 */

export interface ZipEntry {
  name: string;
  /** Uncompressed bytes. Directory entries carry an empty array. */
  data: Uint8Array;
  /** Store (0) or deflate (8) — carried through so a rewrite matches the source. */
  method: number;
  /** MS-DOS time/date from the source, preserved so untouched members round-trip. */
  dosTime: number;
  dosDate: number;
  /** External attributes from the central directory (directory bit, etc.). */
  externalAttrs: number;
}

const SIG_LOCAL = 0x04034b50;
const SIG_CENTRAL = 0x02014b50;
const SIG_EOCD = 0x06054b50;

// ---------------------------------------------------------------- crc32

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();

export function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ------------------------------------------------------- deflate helpers

/**
 * Copy into a fresh ArrayBuffer-backed array.
 *
 * A `subarray` of a package view is `Uint8Array<ArrayBufferLike>`, which the
 * stream writer will not accept — its buffer could in principle be a
 * SharedArrayBuffer. Copying is honest about that rather than casting the
 * problem away, and the arrays here are document parts, not large.
 */
function ownBuffer(bytes: Uint8Array): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(bytes.length);
  out.set(bytes);
  return out;
}

async function inflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  const ds = new DecompressionStream('deflate-raw');
  const writer = ds.writable.getWriter();
  void writer.write(ownBuffer(bytes));
  void writer.close();
  return new Uint8Array(await new Response(ds.readable).arrayBuffer());
}

async function deflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream('deflate-raw');
  const writer = cs.writable.getWriter();
  void writer.write(ownBuffer(bytes));
  void writer.close();
  return new Uint8Array(await new Response(cs.readable).arrayBuffer());
}

// ------------------------------------------------------------- reading

/**
 * Read a ZIP from its central directory.
 *
 * The central directory — not a walk of local headers — is the authority on
 * what a ZIP contains; a local-header walk cannot survive an archive with any
 * gap between members.
 */
export async function readZip(bytes: Uint8Array): Promise<ZipEntry[]> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  // End-of-central-directory: scan back from the end past a possible comment.
  let eocd = -1;
  for (let i = bytes.length - 22; i >= 0 && i >= bytes.length - 22 - 0xffff; i--) {
    if (view.getUint32(i, true) === SIG_EOCD) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('Not a ZIP archive: no end-of-central-directory record.');

  const count = view.getUint16(eocd + 10, true);
  let off = view.getUint32(eocd + 16, true);
  if (off === 0xffffffff) throw new Error('ZIP64 archives are not supported.');

  const entries: ZipEntry[] = [];
  for (let i = 0; i < count; i++) {
    if (view.getUint32(off, true) !== SIG_CENTRAL) {
      throw new Error(`Corrupt central directory at entry ${i}.`);
    }
    const flags = view.getUint16(off + 8, true);
    if (flags & 0x1) throw new Error('Encrypted ZIP entries are not supported.');
    if (flags & 0x8) throw new Error('ZIP data descriptors are not supported.');

    const method = view.getUint16(off + 10, true);
    const dosTime = view.getUint16(off + 12, true);
    const dosDate = view.getUint16(off + 14, true);
    const compSize = view.getUint32(off + 20, true);
    const nameLen = view.getUint16(off + 28, true);
    const extraLen = view.getUint16(off + 30, true);
    const commentLen = view.getUint16(off + 32, true);
    const externalAttrs = view.getUint32(off + 38, true);
    const localOff = view.getUint32(off + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(off + 46, off + 46 + nameLen));

    // Jump to the local header to find where the payload actually starts: the
    // local extra field routinely differs in length from the central one.
    if (view.getUint32(localOff, true) !== SIG_LOCAL) {
      throw new Error(`Corrupt local header for ${name}.`);
    }
    const lNameLen = view.getUint16(localOff + 26, true);
    const lExtraLen = view.getUint16(localOff + 28, true);
    const dataStart = localOff + 30 + lNameLen + lExtraLen;
    const raw = bytes.subarray(dataStart, dataStart + compSize);

    let data: Uint8Array;
    if (method === 0) data = new Uint8Array(raw);
    else if (method === 8) data = await inflateRaw(raw);
    else throw new Error(`Unsupported ZIP compression method ${method} for ${name}.`);

    entries.push({ name, data, method, dosTime, dosDate, externalAttrs });
    off += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

// ------------------------------------------------------------- writing

/**
 * Write entries back out in the order given.
 *
 * Order is preserved because a .docx reader is entitled to expect
 * `[Content_Types].xml` where it found it, and because a stable order is what
 * makes the §12.5 parts-diff gate meaningful: a member that moved is noise the
 * gate would have to explain away.
 */
export async function writeZip(entries: ZipEntry[]): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const e of entries) {
    const nameBytes = new TextEncoder().encode(e.name);
    const isDir = e.name.endsWith('/');
    const stored = isDir || e.method === 0;
    const payload = stored ? e.data : await deflateRaw(e.data);
    const crc = crc32(e.data);

    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, SIG_LOCAL, true);
    lv.setUint16(4, 20, true);              // version needed
    lv.setUint16(6, 0, true);               // flags — none; we never emit descriptors
    lv.setUint16(8, stored ? 0 : 8, true);  // method
    lv.setUint16(10, e.dosTime, true);
    lv.setUint16(12, e.dosDate, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, payload.length, true);
    lv.setUint32(22, e.data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);              // extra length
    local.set(nameBytes, 30);

    chunks.push(local, payload);

    const cd = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(cd.buffer);
    cv.setUint32(0, SIG_CENTRAL, true);
    cv.setUint16(4, 20, true);              // version made by
    cv.setUint16(6, 20, true);              // version needed
    cv.setUint16(8, 0, true);
    cv.setUint16(10, stored ? 0 : 8, true);
    cv.setUint16(12, e.dosTime, true);
    cv.setUint16(14, e.dosDate, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, payload.length, true);
    cv.setUint32(24, e.data.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);              // extra
    cv.setUint16(32, 0, true);              // comment
    cv.setUint16(34, 0, true);              // disk
    cv.setUint16(36, 0, true);              // internal attrs
    cv.setUint32(38, e.externalAttrs, true);
    cv.setUint32(42, offset, true);
    cd.set(nameBytes, 46);
    central.push(cd);

    offset += local.length + payload.length;
  }

  const centralSize = central.reduce((n, c) => n + c.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, SIG_EOCD, true);
  ev.setUint16(8, entries.length, true);
  ev.setUint16(10, entries.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);

  const total = offset + centralSize + eocd.length;
  const out = new Uint8Array(total);
  let p = 0;
  for (const c of chunks) { out.set(c, p); p += c.length; }
  for (const c of central) { out.set(c, p); p += c.length; }
  out.set(eocd, p);
  return out;
}

// ------------------------------------------------------------ convenience

export function entryText(entries: ZipEntry[], name: string): string {
  const e = entries.find((x) => x.name === name);
  if (!e) throw new Error(`Part not found in package: ${name}`);
  return new TextDecoder().decode(e.data);
}

export function setEntryText(entries: ZipEntry[], name: string, text: string): ZipEntry[] {
  const data = new TextEncoder().encode(text);
  return entries.map((e) => (e.name === name ? { ...e, data } : e));
}

/**
 * The §12.5 parts-diff ship gate, as a function.
 *
 * Only `word/document.xml` may differ between the shell and the output. Any
 * other changed member is a defect — that is the check that proves the engine
 * substituted rather than regenerated.
 */
export function partsDiff(before: ZipEntry[], after: ZipEntry[]): string[] {
  const changed: string[] = [];
  const names = new Set([...before.map((e) => e.name), ...after.map((e) => e.name)]);
  for (const name of names) {
    const a = before.find((e) => e.name === name);
    const b = after.find((e) => e.name === name);
    if (!a || !b) { changed.push(name); continue; }
    if (a.data.length !== b.data.length) { changed.push(name); continue; }
    for (let i = 0; i < a.data.length; i++) {
      if (a.data[i] !== b.data[i]) { changed.push(name); break; }
    }
  }
  return changed.sort();
}
