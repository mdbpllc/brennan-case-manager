# Backup vendor one-pager — FETCH RECORD (2026-09-18)

**Status:** EVIDENCE (`CAP-2`). Canonical repo path: `docs/record/backup-vendor-one-pager-2026-09-18/fetch-record-2026-09-18.md`. The source record for `docs/specs/backup-vendor-one-pager-2026-09-18.md`. Fetched 2026-09-18 (Central, DT-1) by two read-only research agents of the Opus 5 Cowork design session (CHAT-DISPATCH v6, Task 5).

## Method, and what it cannot establish
- **WebFetch and WebSearch only**, each vendor's OWN domain only; no curl, script, archive, mirror or cache. A page that could not be fetched is recorded **NOT FETCHED** and was not worked around.
- **WebFetch never returns raw page text:** a small model reads the page and answers. "Verbatim" below means the tool returned a quoted string; it was **not checked byte for byte against the live page**. "Summarized" means the tool paraphrased. **Re-read any figure on the live page before acting.**
- **No law is characterized.** Whether any vendor, BAA or configuration satisfies any duty is not stated anywhere here. Vendor words such as "HIPAA" are the vendors'.
- **The size of his document tree was not measured.** The one-pager uses his stated figures from the `#137` capture (6.87 GB today; ~1 TB ceiling).
- **Requirements** were read from the Voice2 capture (project knowledge) PART 4, PART 7 and PART 12; `docs/record/firm-obligations-sitting-2026-09-10/voice2-definitions-carried-2026-09-10.md` (`BR-1`–`BR-5`); and the `#154` memo v2 §3.10 row (`docs/record/api-integrations-landscape-2026-09-08/api-integrations-proposal-v2-2026-09-09.md`), which also records *"Google in any form (ruled)"* and Microsoft 365 Backup declined.

## Fetch record
| URL (vendor's own) | Result | What it established |
|---|---|---|
| backblaze.com/cloud-storage/pricing | verbatim | *"Starts at $6.95 / TB / mo"*; *"First 10GB storage is always free"*; *"Free egress up to 3x storage"*, overage *"$0.01 per GB"*; *"No minimum storage duration fees"*; Class A–C calls free, Class D *"$0.004 per 10,000 calls"* after 2,500/day; rates for *"the U.S. West region"* |
| help.backblaze.com — "Backblaze Business Associate Agreement (BAA)" (article dated Feb 23, 2023) | verbatim + summarized | *"Backblaze is happy to provide Business Associate Agreements to customers upon request"*; request carries company legal name, a contact, and *"the amount of data storage from B2 Cloud Storage you will need"* (summarized) |
| help.backblaze.com — "Backblaze and HIPAA" (Apr 4, 2023) | verbatim | BAA available |
| backblaze.com/cloud-storage/compliance | verbatim | BAA *"upon request for business customers who are Covered Entities under HIPAA"*; *"Backblaze operates in data centers that are also SOC 2 compliant"* |
| backblaze.com/docs/cloud-storage-object-lock | verbatim | *"preventing a file from being changed or deleted until a given date"*; *"between one and 3,000 days"*; compliance mode *"cannot be removed by any user"*; governance mode *"can be modified or overridden by clients with appropriate app key capabilities"*; legal hold. Whether Object Lock requires versioning: not stated |
| backblaze.com/docs/cloud-storage-lifecycle-rules | verbatim | *"By default, Backblaze B2 retains all of the files that you upload and all of the different versions"* |
| backblaze.com/docs/cloud-storage-event-notifications | verbatim | fires on *"uploads, updates, or deletions"*, by *"an HTTP POST message to the associated webhook endpoint"*; *"contact the Support team to request access"* |
| backblaze.com/docs/cloud-storage-data-regions | verbatim | data centers in *"Sacramento, California; Stockton, California; Phoenix, Arizona; Reston, Virginia; Amsterdam, Netherlands; and Toronto, Ontario"*; US West = Sacramento and Phoenix; US East = Reston; *"After you create your Backblaze B2 account, you cannot change your selected region"*; the Reston operator's name as transcribed by the tool is UNCERTAIN |
| help.backblaze.com — "Where are my files stored" (Mar 21, 2023) | verbatim | older location list |
| backblaze.com/company/datacenter | **NOT FETCHED** (404) | — |
| aws.amazon.com/compliance/services-in-scope/HIPAA_BAA/ | verbatim | lists *"Amazon Simple Storage Service (S3)"*, *"Amazon S3 Glacier"*, *"AWS Backup"*; *"Last Updated: July 14, 2026"*. Whether "Amazon S3 Glacier" means the vault service, the storage classes, or both: UNCERTAIN |
| aws.amazon.com/compliance/hipaa-eligible-services-reference/ | verbatim, partial | *"Last Updated: December 8, 2024"*; **the list did not come through** |
| aws.amazon.com/compliance/hipaa-compliance/ | verbatim | *"To review, accept, and manage the status of the BAA for your account, sign in to AWS Artifact in the AWS Management Console"*; PHI only in the eligible services named in the BAA |
| docs.aws.amazon.com/artifact — managing-agreements; managesingleagreement | verbatim | click-through (*"Select I agree … Choose Accept agreement"*); *"By default, only users with administrative privileges can accept an agreement"*; organization-wide acceptance possible |
| docs.aws.amazon.com/artifact — accepting-agreements | **NOT FETCHED** ("Too many redirects") | — |
| aws.amazon.com/s3/pricing/ | fetched; **price tables NOT PRESENT** (loaded by script) | *"we provide 100 gigabytes per month free from AWS Regions to the internet"*; the only per-GB figure an example (*"Europe (Ireland) to internet is $0.09 per GB"*) |
| aws.amazon.com/s3/glacier/pricing/; aws.amazon.com/backup/pricing/ | fetched; **tables NOT PRESENT** | AWS Backup worked example only (*"@$0.05 per GB-Month"*, US East) |
| aws.amazon.com/s3/storage-classes/glacier/ | verbatim | Deep Archive *"$0.00099 per GB-month (or $1 per TB-month)"* (region not stated); retrieval times |
| aws.amazon.com/s3/storage-classes/; docs storage-class-intro | verbatim | minimum durations: Instant Retrieval 90 d, Flexible Retrieval 90 d, Deep Archive 180 d; Instant Retrieval 128 KB minimum object |
| docs … restoring-objects-retrieval-options | verbatim | Flexible Retrieval: expedited *"1–5 minutes"*, standard *"3–5 hours"*, bulk *"5–12 hours"*; Deep Archive *"Within 12 hours"* / *"Within 48 hours"* |
| aws.amazon.com/blogs — S3 Glacier Instant Retrieval launch (Nov 30, 2021) | verbatim | *"$0.004 per GB-month"*, retrieval *"$0.03 per GB"* — **2021 prices; current price UNCERTAIN** |
| aws.amazon.com/blogs — free data transfer out when moving out of AWS | verbatim | free transfer out on leaving AWS via Support |
| docs … object-lock; Versioning; EventNotifications | verbatim | Object Lock is WORM and *"works only in buckets that have S3 Versioning enabled"*; compliance mode *"can't be overwritten or deleted by any user, including the root user"*; event notifications to SNS, SQS, Lambda, *"Amazon EventBridge"* |
| docs.aws.amazon.com/aws-backup — vault-lock; backup-notifications | verbatim | Vault Lock compliance-mode grace *"must be at least 3 days (72 hours)"*; SNS events incl. `BACKUP_JOB_FAILED` |
| knowledgebase.wasabi.com (BAA article) | verbatim | *"Wasabi will sign a health care Business Associate Agreement (BAA)"*; *"Please contact our sales team for assistance with a BAA"* |
| wasabi.com/hipaa-white-paper | verbatim | BAAs *"with HIPAA-covered entities (hospitals, insurers, etc.)"* — whether that limits who can sign: UNCERTAIN |
| wasabi.com/legal/business-associate-agreement | partial | BAA *"incorporated into and made a part of the Wasabi Technologies Customer Agreement"*; no effective date shown |
| wasabi.com/pricing; /pricing/faq | verbatim | *"Starting at $7.99 TB/month"*; under 1 TB *"you will still be charged for 1 TB"*; 90-day minimum (Timed Deleted Storage); 4 KB minimum object; *"No fees for egress or API requests"* while monthly egress ≤ active storage, else *"we reserve the right to limit or suspend your service"* |
| docs.wasabi.com — immutability/object locking | verbatim | *"Versioning must be enabled for object lock"*; object lock only at bucket creation |
| docs.wasabi.com — where is my data stored | verbatim (provider list partly summarized) | e.g. us-central-1 *"Flexential, 3500 E Plano Pkwy, Plano, TX 75074"*; Iron Mountain, Stack, Equinix, Digital Realty named; no Microsoft or Google facility named; whose servers: not stated |
| docs.wasabi.com — event notifications | verbatim + summary | email on events *"requires that you have an AWS SNS account"* |
| docs.wasabi.com — health-care privacy compliance | **NOT FETCHED** (302 to homepage, not followed) | — |
| cloudflare.com/…/trust-hub/compliance-resources/hipaa/ | verbatim | *"Cloudflare enters into a BAA with Enterprise-level customers whose use of our services involves PHI"*; R2 in scope |
| developers.cloudflare.com/r2/pricing/ | verbatim | Standard *"$0.015 / GB-month"*; free tier *"10 GB-month / month"*; egress *"Free"*; Class A *"$4.50 / million"*, Class B *"$0.36 / million"* |
| developers.cloudflare.com/r2/api/s3/api/ | summarized | Get/PutBucketVersioning ❌; PutObjectLockConfiguration ❌ |
| developers.cloudflare.com/r2/buckets/bucket-locks/ | verbatim | bucket locks *"prevent the deletion and overwriting of objects … for a specified period — or indefinitely"*; removability not stated |
| cloudflare.com/developer-platform/products/r2/ | verbatim | *"R2 runs on the same infrastructure Cloudflare uses to build Cloudflare"* |
| idrive.com/s3-storage-e2/compliance, /pricing, /faq, /object-lock; /locations, /multi-cloud | verbatim / summarized | BAA *"available on request"*; *"$0.006/GB per month($6/TB per month)"*, *"a minimum storage fee of $6 associated with 1 TB"*; whose data centers: **"Not stated"** → not counted |
| storj.io/object-storage/compliance/hipaa | verbatim | *"Storj will sign a Business Associate Agreement (BAA)"*; data *"across a global network of storage nodes"*; hosts UNCERTAIN → not counted (checked for the BAA only) |

## Arithmetic (1 TB = 1,000 GB; before request fees)
| Option | 100 GB / month | 1 TB / month | Note |
|---|---|---|---|
| Backblaze B2 ($6.95/TB; 10 GB free) | 90 × $0.00695 = **$0.63** | 990 × $0.00695 = **$6.88** | whether B2 counts a TB as 1,000 GB, and whether the 10 GB is per account: not stated |
| Wasabi ($7.99/TB; 1 TB minimum) | **$7.99** | **$7.99** | plus Timed Deleted Storage if deleted before 90 days |
| Cloudflare R2 ($0.015/GB; 10 GB free) | 90 × $0.015 = **$1.35** | 990 × $0.015 = **$14.85** | plus the Enterprise plan (not published) |
| AWS S3 Standard | **not obtained** | **not obtained** | price tables loaded by script |
| AWS Deep Archive ($0.00099/GB) | $0.10 | $0.99 | 180-day minimum; 12–48 h restore |
| AWS Glacier Instant Retrieval ($0.004/GB, 2021) | $0.40 | $4.00 | 2021 price, UNCERTAIN; 90-day minimum |

**The ceiling at source:** the Voice2 capture PART 4, row 5 — *"I'll give you a ceiling of fifty dollars for now"* ($50/month), CONFIRMED there. Every figure above is under it.
