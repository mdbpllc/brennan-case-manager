# GATE 9 EVIDENCE RECORD — production SMTP for magic-link sign-in — assembled 2026-09-07, closed by Michael ("sure")

**EVIDENCE (CAP-2).** Against the completion test in `docs/smtp-setup.md` ("Completion — what closes gate 9"). Every item below is Michael's own act or word during the Forward Sitting (`#149`), or a prior record entry named.

| Completion limb | Evidence | Date | Source |
|---|---|---|---|
| Custom SMTP enabled with a verified firm-domain sender | Supabase dashboard → Authentication → Emails, read by his hand: *"1. Custom SMTP on; 2. signin@brennanstx.com; 3. smtp.postmarkapp.com"* | 2026-09-07 | Michael, in-session |
| §4 round trip passed | Round trip one, end to end; Postmark custom SMTP ON, sender `signin@brennanstx.com` | 2026-08-20 | `#122`; BUILD-STATE launch-path line |
| §4.4 outside mailbox — provider and folder | An OUTSIDE mailbox (Proton Mail, an address he controls). The sign-in box refused it — *"Signups are not allowed for the otp"* (signups OFF) — so the test ran by **Authentication → Users → Invite user** (the substitution `#122` flagged for this re-check): *"Sent invite and email arrived from signin@brennanstx.com. I then deleted the user."* · *"1. Landed in inbox; 2. seconds"* | 2026-09-07 | Michael, in-session |
| §4.5 at least one pass on a later day than setup | Saturday's magic links: *"Saturday emails are coming from signin@brennanstx.com."* — and tonight's invite is a second later-day pass | 2026-09-05; 2026-09-07 | Michael, in-session |
| Credential stored nowhere but the provider and Supabase dashboards | *"(a) No, it is nowhere else."* | 2026-09-07 | Michael, in-session |

**Ruling:** *"(b) sure."* — GATE 9 CLOSED. **The invite-for-magic-link substitution is RULED TO COUNT** as the outside round trip: Supabase Auth → the same custom SMTP → the recipient, differing only in template. **Edge recorded:** the magic-link TEMPLATE itself has only ever been delivered to the firm's own M365 tenant (2026-08-20, 2026-09-05); the invite template is what reached the outside inbox. **Collateral finding:** "Allow new users to sign up" is OFF on the live project (BUILD-STATE's open act (1), measured ON at `#125`, closes on live evidence; Michael recalls July — recorded with the discrepancy, unresolved). **Text act queued (slice `SD-11`):** `src/pages/SignInPage.tsx`'s *"the sending limit is low"*, written 2026-07-28 for the default sender.

**Repo act:** an appended closure note beneath gate 9 in `docs/specs/Go_Live_Gates.md` (append-only), exact text in the packet manifest; GL-1 item (3) DONE.
