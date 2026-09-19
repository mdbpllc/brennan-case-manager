# Backup vendor — the third copy, one page (Wave 0(d))

**Status:** RULING SHEET (`CAP-2` RULING) — **put back as a choice; nothing ruled, bought or configured.** Canonical repo path: `docs/specs/backup-vendor-one-pager-2026-09-18.md`. Written 2026-09-18 (Central, DT-1) by an Opus 5 Cowork design session (CHAT-DISPATCH v6, Task 5), under the Wave 0 authorization at `#154` (*"a design act, put back to him as a choice"*). Vendor facts: each vendor's OWN pages, fetched 2026-09-18 — the record is `docs/record/backup-vendor-one-pager-2026-09-18/fetch-record-2026-09-18.md`. **The fetch tool summarizes pages; re-read any figure on the live page before you act on it.** No law is characterized here.

## What the choice must satisfy (`#137`, the Voice2 capture PART 4 and PART 7; `#154` memo v2 §3.10)
- **A BAA** — *"The third copy would do the [BAA], obviously."*
- **Independent of Microsoft, and restorable without Microsoft.** Not Azure; Microsoft 365 Backup was declined at `#154`.
- **Monitoring, both habits:** a heartbeat (did it run?) and a restore test (does it come back?) — the firm-obligations module spec's `FOT-24` and `FOT-22` rows schedule the human side.
- **Your ceiling, at source:** *"I'll give you a ceiling of fifty dollars for now"* ($50/month). Every option below is far under it.
- CloudLex is the ORIGIN; OneDrive is the mirror; the vault copies the mirror. A self-hosted server is the destination later (`BR-4`, recorded intent — *attention, not cost*).

## The four, on their own pages
**Backblaze B2** — *recommended*
- BAA: *"happy to provide Business Associate Agreements to customers upon request"* — you email Support your firm's legal name, a contact and expected storage. ⚠ Its compliance page says *"for business customers who are Covered Entities under HIPAA"* — **ask Backblaze whether it signs with your firm.**
- Lock: versions kept by default; Object Lock in compliance mode, which *"cannot be removed by any user"*, for 1 to 3,000 days.
- Restore: *"Free egress up to 3x storage"* — a full restore costs nothing.
- Price: *"$6.95 / TB / mo"*, first 10 GB free → **≈ $0.63 at 100 GB, ≈ $6.88 at 1 TB.**
- Where: its own named sites (Sacramento, Phoenix, Reston). Region is fixed once the account exists.
- Heartbeat hook: webhooks on upload/delete, *"contact the Support team to request access."*

**AWS S3 (with Glacier classes)** — *the choice if `H12-v` lands at AWS*
- BAA: click-through in **AWS Artifact** (admin user); S3, S3 Glacier and AWS Backup are on AWS's BAA services list (*"Last Updated: July 14, 2026"*).
- Lock: Versioning + Object Lock compliance mode — *"can't be overwritten or deleted by any user, including the root user."*
- Restore: *"100 gigabytes per month free"* out to the internet; the paid rate **did not load tonight**. Glacier classes add retrieval fees and 12–48 h waits (Deep Archive).
- Price: **S3 Standard NOT OBTAINED** (the price tables load by script). Deep Archive *"$1 per TB-month"* (180-day minimum; slow restore).
- Why it could win: **one BAA and one relationship with the Bedrock question** (`BR-5`) — less attention.

**Wasabi** — passes both filters
- BAA: via sales, part of its customer agreement; its white paper says *"with HIPAA-covered entities"* — same question to ask.
- Lock: versioning + object lock (set at bucket creation).
- Price: *"$7.99 TB/month"* with a **1 TB minimum** and a **90-day minimum** → **$7.99 at both 100 GB and 1 TB.**
- Restore: free egress while monthly egress ≤ stored volume; otherwise it *"reserve[s] the right to limit or suspend."*
- Heartbeat email needs an **AWS SNS** account.

**Cloudflare R2** — passes both filters, **not recommended**
- BAA for **Enterprise customers only** (plan price not published).
- **No object versioning** (bucket locks exist) — the record's vault is *versioned*.
- Price: $0.015/GB-month, 10 GB free → $1.35 / $14.85, plus Enterprise.

*Checked and not counted:* IDrive e2 (BAA on request, but whose data centers is not stated); Storj (BAA yes; storage nodes' hosts uncertain). Google was not researched — the `#154` memo's not-built list records *"Google in any form (ruled)"*.

## Who runs the copy (the laptop sleeps)
- **(A) A scheduled job on the P1** — *recommended now.* Copies the OneDrive folder on the laptop to the vault, checksums each file, records the run. A sleeping night is only a missed night, and the heartbeat catches it (`#154`'s words). No Microsoft credential in the cloud; no document bytes through Supabase. **Your check:** the files are really on the laptop's disk, not only listed.
- **(B) A cloud runner** — the `#154` runner (a Supabase Edge Function on `pg_cron`) reads OneDrive through Microsoft Graph and writes to the vault. Runs while the laptop sleeps. Costs: a Graph read credential in Vault (**instructions trigger 5 fires**); document bytes pass through Supabase compute, which touches **`Q-API-1`** (where PHI lives — unruled); it waits on the Wave 0(a) deploy; function limits for large files were not checked tonight.
- **Either way:** a heartbeat must notice **silence**, not only success — until a monitor exists, `FOT-24` is the human check; `FOT-22` is the quarterly restore test.

## Put to you (packet-local labels; `BVO-` returned 0 hits repo-wide)
- **`BVO-1` — Which vault?** PROPOSED: **Backblaze B2**, conditional on Backblaze agreeing to sign with your firm; **AWS S3** instead if you would rather the backup ride the same relationship as the Bedrock BAA. Or Wasabi, or something else.
- **`BVO-2` — Who runs the copy?** PROPOSED: **(A) the laptop job now**; revisit (B) after `Q-API-1` is ruled.
- **Your hand, whichever you pick:** request/read the BAA yourself; pick the region once; create a write-only key for the job (never into any file Claude writes).
