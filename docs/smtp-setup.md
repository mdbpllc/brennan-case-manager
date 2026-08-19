# Production SMTP for magic-link sign-in — setup (gate 9)

Sign-in is magic-link only (AUTH-1, ruled 2026-07-28), so the email sender is
load-bearing: no email, no access. Supabase's built-in sender is
development-grade — per Supabase's own docs it delivers only to pre-authorized
team addresses, is rate-limited to a small number of messages per hour (a
figure that "can change without notice"), and is best-effort with no SLA. Gate
9 (docs/specs/Go_Live_Gates.md) requires a custom SMTP sender on the firm's
domain **before the app is relied on for real work** — the gate fires on
*reliance*, not on real data, and BUILD-STATE's launch path flags its
DNS-plus-provider lead time as the one item you cannot compress. Start this
days before you need it.

This is dashboard-and-DNS configuration only. **No application code changes,
and nothing here closes gate 9** — completion criteria are at the end; the
gates re-check session records the close.

Everything below was sourced 2026-08-19; each figure names its source and
prices change — re-check the provider's page before purchase.

## 0. Two decisions to make first (yours; nothing proceeds without the first)

**D-SMTP-1 — provider.** Compared in §1. Not pre-picked: all three work with
Supabase custom SMTP (all three are on Supabase's own compatible-provider
list), and at this volume all three cost between $0 and $15/month.

**D-SMTP-2 — sender identity.** Two sub-choices:
- *From address:* something like `signin@brennanstx.com` or
  `no-reply@brennanstx.com`. The address does not need a mailbox; replies are
  not part of the flow. Auth emails carry sign-in links and no client data.
- *Root domain vs subdomain:* providers recommend a send subdomain (e.g.
  `mail.brennanstx.com`) to isolate sending reputation from the domain itself.
  For auth-only volume from a law firm, sending from the root domain is also
  reasonable — the inbox shows the firm's own domain — and none of the three
  providers touches the M365 records that carry the firm's regular mail either
  way (see the SPF warning in §2). Reputation risk at tens of messages a month
  to mostly your own mailbox is small; this is a judgment call, not a math
  problem.

## 1. Provider comparison (D-SMTP-1)

Volume reality first: one user, magic-link only, and Supabase sessions persist
per device — an estimate, not a measurement, but realistic use is **tens of
emails per month**, so free tiers dominate the economics until staff logins
(a later phase) multiply it.

| | Postmark | Resend | Amazon SES |
|---|---|---|---|
| Price at this volume | **Free tier: 100 emails/mo, never expires** (postmarkapp.com/pricing); paid starts $15/mo for 10K | **Free tier: 3,000/mo, 100/day** (resend.com/pricing); Pro $20/mo for 50K | No free tier to speak of; à la carte **$0.10/1,000** (aws.amazon.com/ses/pricing) — pennies/mo |
| Deliverability posture | Transactional-only shared IPs, "vetted IPs" on paid plans; long-standing reputation as the deliverability-first transactional provider (vendor claim + industry reputation, not independently verified here) | "Pristine shared IPs," automatic suppression list (vendor claims); newer provider, rides AWS SES infrastructure underneath | The raw infrastructure itself; deliverability is what you configure, with the least hand-holding |
| Setup friction | Low-moderate: DNS + **new-account human review** — until approved, sending is limited (expect a short approval exchange justifying the use case) | Lowest: DNS + API key; SMTP password is the API key | Highest: AWS account, IAM SMTP credentials, and **new accounts start in a sandbox** (verified recipients only) — production access is a request-and-review step (AWS SES docs) |
| DNS records | DKIM TXT + Return-Path CNAME (§2) | DKIM TXT + MX/SPF TXT on a send subdomain (§2) | DKIM CNAMEs (×3) + optional custom MAIL FROM records |
| Dashboard/logs | Per-message activity log, 45-day retention on free/Basic | Per-message log in dashboard | Nothing comparable without extra AWS setup |

What would decide it: **Postmark** if deliverability reputation and a real
activity log matter most and 100/mo is comfortably enough (it likely is —
but it is the tightest ceiling of the three, and the overage answer is a $15/mo
plan). **Resend** if you want the largest free headroom and the least
friction. **SES** only if you want everything inside AWS and will tolerate the
sandbox-exit process; at this scale its price advantage is worth cents.

## 2. DNS records (at the DNS host for brennanstx.com — wherever the M365 records live)

Every provider generates the **exact** records in its dashboard when you add
the domain — copy them from there verbatim; the shapes below are what to
expect, not values to type.

- **Postmark** (support article "How do I verify a domain," read 2026-08-19):
  one **DKIM TXT** record (name/value shown in its DNS Settings page) and one
  **Return-Path CNAME** — default host `pm-bounces.brennanstx.com` →
  `pm.mtasv.net`. No root-domain SPF edit is required: SPF aligns through the
  Return-Path domain.
- **Resend**: adding a domain yields a **DKIM TXT** record
  (`resend._domainkey...`) plus an **MX and an SPF TXT record on a send
  subdomain** (e.g. `send.brennanstx.com`) — again, no edit to the root SPF.
- **Amazon SES**: three **DKIM CNAME** tokens; a custom MAIL FROM subdomain
  (MX + SPF TXT) is optional but recommended.
- **DMARC** (all providers, optional but recommended): a TXT record at
  `_dmarc.brennanstx.com`, starting at monitor-only — `v=DMARC1; p=none;` plus
  a reporting address if you want the reports.

**Warnings — the ones that bite:**
- **Never create a second `v=spf1` TXT record on a name that already has
  one.** Two SPF records on the same hostname is a permanent SPF failure for
  *all* mail from that name, including the firm's regular M365 mail. None of
  the three providers' standard setup asks you to touch the root SPF record —
  if a wizard appears to, stop and reconcile into the existing record instead.
- **DMARC applies to the whole domain, including Outlook/M365 mail.** A policy
  of `quarantine` or `reject` published before both M365 and the new provider
  pass alignment can send the firm's ordinary email to junk. Publish `p=none`
  first; tighten later, deliberately, and not during the go-live window.
- **Propagation is the slow step.** TXT/CNAME/MX changes honor the zone's TTL
  — often minutes, sometimes 24–48 hours (Postmark's docs say verification
  checks run "within 48 hours," with a manual re-check button). This is the
  lead time BUILD-STATE warns about: add the records early, verify later.

## 3. Supabase configuration (dashboard only; your hand)

Per Supabase docs, "Send email using a custom SMTP provider" (read 2026-08-19):

1. Create the provider account and a sending credential (API key / server
   token / SMTP credentials) in the provider dashboard. **That credential is a
   secret: it lives in the provider dashboard and the Supabase field below and
   nowhere else — never in the repo, a packet, a chat, or this doc** (same
   rule as `LEGISCAN_API_KEY`).
2. Supabase dashboard → the project → **Authentication → Emails / SMTP
   Settings** → enable **Custom SMTP**, then fill in:
   - **Host / Port:** from the provider — Postmark `smtp.postmarkapp.com`
     (ports 25/2525/587, STARTTLS); Resend `smtp.resend.com` (587 or 465);
     SES per its console. Port 587 is the default choice.
   - **Username / Password:** Postmark uses the Server API Token as *both*;
     Resend uses username `resend` with the API key as password; SES uses IAM
     SMTP credentials.
   - **Sender email / Sender name:** the D-SMTP-2 address and "Michael D.
     Brennan, PLLC" (or whatever the inbox should show).
3. Save, then open **Authentication → Rate Limits**: enabling custom SMTP
   moves the email rate limit from the built-in sender's ~2/hour to a default
   of **30/hour** (Supabase docs) — fine for solo use; adjustable there later
   for staff.
4. While in Authentication settings, eyeball the magic-link/OTP **expiry**
   and the email **template** (subject line and body are dashboard config, not
   code). No change is required; know where they are.

## 4. Verification — a real round trip, not "it looks configured"

Each step can fail; run them in order and stop at the first failure.

1. **Provider shows the domain Verified** (DKIM and Return-Path/SPF checks
   green in its dashboard). Fails while DNS is propagating or a record was
   pasted wrong — fix and re-check rather than proceeding.
2. **Provider test message** (send-a-test from the provider dashboard) to
   michael@brennanstx.com. Open the message headers in Outlook and confirm
   `spf=pass`, `dkim=pass` with the firm domain in `d=`, and `dmarc=pass` (or
   `none` if no DMARC record was published). A delivered test that fails
   authentication is a failure — it will junk-folder for anyone else.
3. **The real sign-in round trip:** sign out of the app (Supabase mode, not
   demo) → request a magic link for michael@brennanstx.com → the email arrives
   promptly (minutes, not hours) **from the new sender address**, and its
   Received/headers show the provider's infrastructure, not Supabase's
   built-in sender → the link signs you in. If no email arrives: Supabase
   dashboard → Logs → Auth to see whether Supabase handed it off, then the
   provider's activity log to see whether it was accepted/delivered.
4. **Junk check + an outside mailbox.** Confirm it landed in the inbox, not
   junk. Recommended: run the round trip once against a non-M365 mailbox you
   control (e.g. a Gmail test address) — deliverability to your own tenant
   proves little about anyone else's; staff addresses may not be M365 forever.
5. **Repeat it.** A second and third round trip on later days, from a fresh
   browser/device, catches propagation flukes and rate-limit surprises (a
   ~60-second resend cooldown between requests is normal Supabase behavior,
   not a failure).

## Completion — what closes gate 9 (this doc does not)

Gate 9 closes at the gates re-check when: custom SMTP is enabled with a
verified firm-domain sender; the §4 round trip has passed, including at least
one pass on a later day than setup; and the credential is stored nowhere but
the provider and Supabase dashboards. Recording the close is the re-check
session's act, with Michael — not this runbook's, and not any build session's
by implication.

## Sources (read 2026-08-19)

- Supabase docs: "Send email using a custom SMTP provider" (supabase.com/docs/guides/auth/auth-smtp)
- postmarkapp.com/pricing · Postmark support: "How do I verify a domain" · Postmark developer guide: "Send email with SMTP"
- resend.com/pricing · Resend docs: "Send with SMTP"
- aws.amazon.com/ses/pricing · AWS SES docs (sandbox/production access)
