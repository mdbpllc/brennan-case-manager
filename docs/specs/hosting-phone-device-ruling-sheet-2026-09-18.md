# HOSTING, THE PHONE, AND THE TRAVELING LAPTOP — the sheet you rule from

**Status:** RULING-class (`CAP-2`). **Canonical repo path:** `docs/specs/hosting-phone-device-ruling-sheet-2026-09-18.md`. Prepared 2026-09-18 (Central, DT-1) by an Opus 5 design session in Cowork running CHAT-DISPATCH v6, Task 3, with the device bridge on the checkout at HEAD `4940ed3`. **Nothing here is ruled. Every recommendation is Claude's, PROPOSED.** The research memo and fetch record behind it are EVIDENCE at `docs/record/hosting-phone-device-2026-09-18/`. Every vendor fact below was fetched from the vendor's own page on 2026-09-18 through a summarizing fetch tool, so spot-check before anything is bought. **No law is characterized here.** Whether any legal rule requires any control on this sheet is routed as an UNVERIFIED candidate question (§6).

**Where this came from, in your words (2026-09-18):** *"Cloudlex also has an app that I use on my iPhone. Are we going to be able to have an app as well for this software? If so, when should we start working on this?"* — and *"I do not have an office PC per se, rather I use the same laptop whether in the office or on the road. I plug the laptop into a docking station. When I am going to be trying to use this app, in all likelihood my PC will be asleep or turned off."*

**Where each question lives.** Each question below points at a row the 2026-09-18 Fable conversation's packet asks the runner to create, by LABEL: `[HOSTING]`, `[DEVICE-GATE]`, `[PHONE-WIDTH]`, `[PHONE-SIGNIN]`. This sheet adds only sub-questions that are new. Two existing rows already carry parts of this, and this sheet points at them rather than repeating them:
- **`Q-API-14`** (HELD, hands-on): Intune app protection on the phone, the OneDrive deep link, and the tenant's SKU.
- **`Q-API-18`**: the subscription type.

`DA-3` (the PHI boundary on the phone) stays HELD and is not pressed here.

---

## 0. The short answer to "can we have an app, and when"

**Yes — and the first step is not an app. It is putting the app somewhere your phone can reach while your laptop sleeps.**

**Where things stand.** The record says the app is a browser single-page app with no server of its own: the UI talks to Supabase directly, and there are three Edge Functions, two undeployed and one a stub. It is hosted **nowhere**. It runs from `npm run dev` on the laptop. The master spec already anticipates the rest: *"An iPhone app is wanted later,"* React was *"chosen because it shares code across Windows + iPhone,"* and the app *"runs locally in the browser at first; can later be wrapped into an installable desktop app and an iPhone app from the same codebase."*

**The three steps, in order:**
1. **Host it** (Q1–Q3). That makes it reachable from anywhere, laptop asleep or not.
2. **Make the screens you use on the phone work at phone width** (Q7).
3. **Add it to your iPhone's Home Screen** (Q4, Q6). From iOS 16.4 a home-screen web app can receive notifications and badge its icon (WebKit's own announcement). A native App Store wrapper is later, only if the home-screen version falls short.

**What a native wrapper costs.** The fetched facts:
- Capacitor, the wrapper that fits this codebase, says *"To build iOS apps, you will need macOS"* and requires Xcode 26.0. Your laptop is Windows.
- The Apple Developer Program is *"99 USD per membership year."*
- TestFlight builds expire after 90 days.
- Unlisted App Store distribution still requires App Review.

**When.** Hosting can start as soon as you rule Q1–Q3. It does not wait on go-live. It is best tested on the one TEST matter before any real record, so the sign-in and session settings are proven first.

---

## Q1 — `[HOSTING]`: which gate stands in front of the app?

**The requirement proposed in the Fable conversation, stated so you can reject it:** nothing — not the page, not the JavaScript — is served to anyone who has not signed in with an account in **your** Microsoft 365 tenant. **Why it is proposed:** the built bundle *probably* carries template text and the disclosures master document (BUILD-STATE records 46 seeded templates and the master `.docx` reached through a base64 module in the app). **That is an ASSUMPTION.** No `src/` file was read. Before any deploy, a Code session makes one read-only check of the production build's output for those strings (§5, V-1).

**The three candidates** (vendor pages, fetched 2026-09-18):

| | **Azure Static Web Apps — Standard** | **Cloudflare Pages + Cloudflare Access** | **Azure App Service with built-in sign-in** |
|---|---|---|---|
| Cost | **$9 / month** (Microsoft's retail price list; the Free plan cannot restrict sign-in to your tenant: *"Custom authentication is only available in the Azure Static Web Apps Standard plan"*) | Pages free; Access *"Free Plan $0 forever. Best for teams under 50 users"* | Linux B1 **$0.018 / hour ≈ $13 / month** (arithmetic from the retail price list) |
| How it gates | A route rule `"/*"` requires `authenticated`; a 401 redirects to Microsoft sign-in | *"Cloudflare checks every HTTP request to your application for a valid application token"* | *"Require authentication: This option rejects any unauthenticated traffic to your application"* |
| The catch | Microsoft's own note: *"Route rules aren't applied on requests that trigger `navigationFallback`"*. A deep link that matches no file may serve the page shell before sign-in. **Must be tested** | Three separate pieces must all be configured (preview links, the `pages.dev` address, your custom domain), or a copy stays public by default. It is a new vendor account. Your domain's DNS likely has to move to Cloudflare for Access on your own domain (INFERENCE, to confirm) | Heavier: a web server for a static site |
| New credential | a client secret on an Entra registration | a client secret on a separate Entra "Web" registration | a client secret, typically |
| HTTPS / custom domain | free managed certificates, custom domains included | free certificate; CNAME for a subdomain | paid tier needed for a custom domain; Basic or higher for the free certificate |
| Where it lives | inside Microsoft (Azure) — no Azure resource exists today | outside Microsoft | inside Microsoft (Azure) |

**Every option adds a credential.** Each gate signs you in with a client secret held by the host. **That is a new credential arrangement, which fires project-instructions trigger 5**, and the instructions' "Where sensitive things live" section gains a line naming the secret's home. It never appears in the repo, a packet or a chat.

**Options, as a way of asking:**
- **(A)** Azure Static Web Apps Standard, conditioned on a named test: an unauthenticated request for a made-up deep link must NOT return the page. If it does, change the config or move to (C).
- **(B)** Cloudflare Pages + Access.
- **(C)** Azure App Service with built-in sign-in.
- **(D)** Relax the requirement to "no DATA before sign-in" and accept the shell. The data already sits behind Supabase sign-in and RLS.
- **(E)** Your own answer.

*Recommendation: (A).* It keeps the front end inside Microsoft, where decision 1 (`#154`) already points the PHI side; it is the cheaper of the two in-Microsoft options (Cloudflare's free tier is cheaper still, at the cost of a new vendor and three pieces of configuration); and its one weakness is testable in an hour. It would be the FIRST Azure resource: an Azure subscription is its own authorization (the `#154` sheet's §5 lists *"any Azure subscription"* as not authorized by anything there).

## Q2 — `[HOSTING]`: when, and on what address?

**Sub-question (new).** Is hosting done **before go-live, proven on the one TEST matter** (proposed), or after go-live? And on what address? For example `app.brennanstx.com`: a subdomain of the domain the sign-in email already uses, with `FOT-27`'s renewal row covering it. **The address is your fact.**

**What changes at the same time, all by your hand in dashboards:**
- Supabase's **Site URL** and **Redirect URLs** list gain the hosted address. Supabase: *"The URL in redirectTo should match the Redirect URLs list configuration"*, and it recommends *"setting the exact redirect URL path for your site URL in production"*.
- The Entra app registration gains the hosted address as a **Single-page application** redirect URI. Microsoft: *"Redirect URIs must begin with the scheme `https`"*.
- "Allow new users to sign up" stays **OFF**. It is measured OFF today and matters more once the app is reachable.

*Recommendation: before go-live, on the TEST matter, at a subdomain of `brennanstx.com`.*

## Q3 — `[HOSTING]`: does the laptop's sleep change anything else?

**Sub-question (new).** Once the app is hosted, the laptop is needed only for building and for the local-only work the record already puts there: transcription, and any scheduled job you choose to run on it. **Do you confirm that no hosted feature may depend on the laptop being awake?** The Edge Functions and the future runners already run in the cloud by design (`Q-WF-4`'s composite). *Recommendation: yes, confirm it, so a future slice cannot quietly make the laptop a server.*

---

## Q4 — `[PHONE-SIGNIN]`: a six-digit code beside the magic link?

**The problem, from Apple's side.** A magic link tapped in Mail on the iPhone opens in **Safari**. A home-screen web app keeps **separate** storage from Safari. A comment on WebKit's own bug tracker (bug 181849, 2022): *"The current behavior (on Apple platforms) is by design. Home Screen apps are created as isolated entities without shared state with the browser."* That is a bug comment, not published policy, and it is labelled as such. So tapping the link signs **Safari** in, not the home-screen app. (If the app uses Supabase's PKCE sign-in flow, the link must be opened *"on the same browser and device where the flow was started"*. Which flow the app uses is a `src/` fact, not read here — ASSUMPTION to check.)

**The fix Supabase supports.** *"Email one-time passwords (OTP) are a form of passwordless sign-in where users key in a six-digit code sent to their email address,"* and *"Email OTPs share an implementation with Magic Links."* You add `{{ .Token }}` to the **Magic Link** email template, so **one email carries both the link and the code**. Codes expire after one hour by default, and a user can request one *"once every 60 seconds."*

**Rendered — signing in on the iPhone, BEFORE and AFTER (fictional times):**
```
BEFORE (link only)                          AFTER (link + code, same email)
1. Open the app from the Home Screen.       1. Open the app from the Home Screen.
2. Type your email → "Send link".           2. Type your email → "Send link".
3. Mail: "Sign in to Brennan Case Manager"  3. Mail: "Sign in… Your code: 482 913"
4. Tap the link → SAFARI opens, signed in.  4. Read the code, switch back to the app.
5. Switch back to the app → still signed    5. Type 482913 → "Verify" → signed in,
   OUT (Safari's sign-in is not the app's).    in the app itself.
```
On the laptop nothing changes: the link still works as it does today.

**What it takes:** a one-line template change in Supabase (your hand), and a small build act to add a "enter the code" box to the sign-in screen (a later Code slice, its own authorization). The sign-in email goes through Postmark, as gate 9 records. The code is a sign-in credential, not client data.

*Recommendation: yes, both limbs — the template change and the code box — before you rely on the phone.*

## Q5 — `[DEVICE-GATE]`: how long does a sign-in last?

**The fact.** Supabase: *"By default, it lasts indefinitely"* — a sign-in never expires on its own. Supabase offers **time-boxed sessions**, an **inactivity timeout**, and **single session per user**, and *"This feature is only available on Pro Plans and up."* Your project is on Pro (gate 1). Changes take effect *"whenever a session is refreshed next."*

**Sub-question (new).** Which two numbers? The values below are **illustrations to react to, not proposals of fact:**
- **Time box** — e.g. 12 hours (sign in once a workday).
- **Inactivity** — e.g. 8 hours, or 1 hour if you want a lost phone to lock itself out fast.
- **Single session** — probably **no**, since you use the laptop and the phone at once.

*Recommendation: set a time box and an inactivity timeout before any real record reaches the phone; leave single-session off.*

## Q6 — `[DEVICE-GATE]`: the laptop that travels, and the phone

**Sub-question (new) — the laptop, all your reads, nothing swept:**
- **Encryption.** Microsoft: BitLocker is supported on Windows **Pro, Enterprise and Education**; **Device encryption** is *"available on a wider range of devices, including those running Windows Home"*, and *"If you're using a local account, Device Encryption isn't turned on automatically."* **Your read:** Settings → Privacy & security → Device encryption (or BitLocker) — on or off?
- **Auto-lock.** How many idle minutes before the screen locks? Intune's own setting notes that *"By default, the OS might set it to 0 (zero), which is no timeout."*
- **Remote wipe.** An Intune wipe needs the laptop enrolled in Intune. Whether your plan includes Intune is **`Q-API-18`'s / `Q-API-14`'s fact** (Microsoft: *"Business Premium includes Microsoft Intune Plan 1"*; Business Basic and Standard carry only the free "Basic Mobility and Security" subset, which does offer factory reset of a mobile device).

**The phone.** Intune app protection (PIN, block copy-out, selective wipe) is **`Q-API-14`, HELD for hands-on**. It is not re-asked here.

**Options:**
- **(A)** Write a short device-and-session gate into `Go_Live_Gates.md`: session limits set (Q5), laptop disk encryption on, auto-lock at or under your number, a named answer on remote wipe.
- **(B)** Keep it as a checklist you run, not a gate.
- **(C)** Your composite.

Appending a gate is your ruling, and it would sit beside GL-1's completed floor, not inside it.

*Recommendation: (A), four lines, all confirmed by your hand.*

---

## Q7 — `[PHONE-WIDTH]`: a build convention, and where to start

**Sub-question (new).** The Fable conversation proposed a build convention: *every new or touched screen works at phone width.* A convention that binds build sessions reaches `CLAUDE.md` and fires trigger 3. **And which screens get a phone pass first?** Proposed first three: the **case list** (with the firm-obligations card), the **case Overview tab**, and the **case Calendar tab**. Heavy screens (Forms, the bill workspace) stay desktop-first.

**Rendered — the case Overview at phone width (fictional matter):**
```
┌────────────────────────────┐
│ ☰  Brennan Case Manager    │
├────────────────────────────┤
│ Garcia v. Halvorsen        │   ← title wraps; no side-by-side panes
│ 2026-0142 · PI · Open      │
├────────────────────────────┤
│ Overview | Parties | Cal ▸ │   ← tabs scroll sideways
├────────────────────────────┤
│ Limitations  2028-03-14    │   ← one field per row, label left
│ Incident     2026-03-14    │
│ Court        (not filed)   │
│ Client       R. Garcia     │
│ [Edit]                     │
├────────────────────────────┤
│ Next on the calendar       │
│ • Thu Oct 1 — Records due  │
│ • Mon Oct 12 — Mediation   │
└────────────────────────────┘
SHOWN: identity, status, limitations, next dates, one-tap call/email.
NOT SHOWN at phone width: the bill workspace, the Forms tab's generator,
the RLS probe, anything that needs two panes side by side.
```

*Recommendation: adopt the convention (trigger 3 fires), with the three screens as the first pass in a later slice of its own.*

---

## §5 — Verifications that are Code acts, not your rulings (listed so they are not lost)
- **V-1** — after `npm run build`, a read-only check of the production output for template text, the base64 master and any seeded content, so Q1's premise is measured, not assumed.
- **V-2** — whether the sign-in uses Supabase's PKCE or implicit flow (Q4's parenthetical), read in `src/` by a Code session.
- **V-3** — the Q1(A) fallback test, if (A) is chosen.

## §6 — Routed, not answered
- **Whether any legal rule requires these controls** — privacy or security regulations, the disciplinary rules — is an **UNVERIFIED candidate question** for the registry. It belongs with the privacy row (`Q-WF-6`) and nowhere is it answered here. Claude characterizes no law.
- **`DA-3`** (the PHI boundary on the phone) stays **HELD**. `Q-API-14` and `Q-API-18` are pointed at, not re-asked.

*Prepared 2026-09-18 (Central). PF-1 did not fire on this packet: no legal characterization and no registry entry — the one legal question is routed, not answered.*
