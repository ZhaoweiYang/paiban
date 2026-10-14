# ShiftKumo — business facts (single source of truth for all copy)

Every page, policy and translation must agree with this sheet. Values that live in
`site.config.mjs` are rendered through tokens (see bottom) so they can be changed in one place.

## Brand
- Product / brand name: **ShiftKumo** ("Kumo" = 雲, "cloud" in Japanese)
- Domain: **shiftkumo.com**
- Support e-mail (the only mailbox — used for support, billing, refunds, privacy, legal and DMCA):
  **support@shiftkumo.com**
- Card statement / billing descriptor: **SHIFTKUMO.COM**
- Operator ("we", "us"): AVERCYN GLOBAL INC, 1660 LINCOLN STREET, DENVER, CO 80264, USA (configured in
  `site.config.mjs` and inserted by the build as `{{company}}` / `{{companyBlock}}`, never typed into copy).
  Personal data is handled in the United States.

## What we sell
ShiftKumo is web-based **employee scheduling (shift scheduling / rostering) software** delivered as a
subscription (SaaS). Businesses whose staff work in shifts (restaurants & cafés, retail, clinics &
care, hotels, logistics & warehouses, salons, call centers, schools) use it to:
- build weekly / monthly shift schedules with drag-and-drop and reusable shift templates;
- **auto-schedule**: generate a draft roster from staff availability, skills, contracted hours and
  labor rules (max hours, minimum rest between shifts, overtime limits) — managers review and publish;
- collect **availability and time-off requests** with an approval workflow;
- handle **shift swaps and open shifts** that staff can claim, with manager approval;
- publish schedules and notify staff by e-mail and in-app notifications; staff use any phone browser
  (mobile web app, nothing to install);
- **time clock** (clock in / out from a phone or shared tablet) and **timesheets**;
- **labor cost** forecasting, overtime alerts and budget vs. actual;
- export hours to **CSV / Excel** for payroll;
- manage **multiple locations, departments and roles** with manager / staff permissions;
- interface in **English and Japanese** (each user picks their language).

All plans include **every feature**, **unlimited employees**, **unlimited locations** and
**unlimited schedules**. One subscription = one workspace (one business account).

The service is delivered digitally. **No physical goods are shipped.**

## Plans and prices (identical features; only the billing period differs)
| Plan | USD | JPY | Billed every |
|---|---|---|---|
| Monthly | US$9.90 | ¥1,599 | 1 month |
| Quarterly | US$19.90 | ¥2,999 | 3 months |
| Annual | US$99.00 | ¥15,999 | 12 months |
| 2-Year | US$129.00 | ¥19,999 | 24 months |
| 3-Year | US$199.00 | ¥29,999 | 36 months |

- Customers choose USD or JPY at checkout; they are charged in that currency.
- The price shown is the total price per billing period. No setup fees, no hidden fees. Any applicable
  taxes are included in the price shown. The customer's bank may add its own foreign-transaction fee.

## Free trial (1 hour)
- Every plan starts with a **1-hour free trial**. A payment card is required to start it.
- **US$0 / ¥0 is charged at sign-up.** The card issuer may show a temporary authorization hold that is
  released automatically.
- **Exactly 1 hour after the trial starts, the full price of the selected plan is charged** to the card
  unless the customer cancels before the hour ends.
- Cancel during the trial instantly in the app: **Settings → Billing → Cancel trial**. No charge.
  (If someone e-mails a cancellation during the trial and the hour runs out before we process it, we
  refund that charge in full.)
- One free trial per customer / business.

## Renewal
- Subscriptions **renew automatically** at the end of each billing period at the same plan price, charged
  to the card on file, until cancelled.
- A receipt e-mail is sent for every charge. For plans of 12 months or longer, a **renewal reminder
  e-mail is sent 7 days before** renewal.
- Price changes are announced by e-mail at least **30 days** in advance and apply only from the next
  renewal; customers can cancel before then.
- Customers can switch to a longer or shorter billing period in **Settings → Billing**; the new plan and
  price apply from the next renewal. The period already paid for does not change.

## Cancellation
- Cancel any time, no cancellation fee: in the app (**Settings → Billing → Cancel subscription**) or by
  e-mailing support@shiftkumo.com with the subject "Cancel subscription" from the account e-mail.
- Cancellation stops all future renewals. Access continues until the end of the period already paid for.
- After the subscription ends, workspace data is kept for **30 days** (so the customer can reactivate or
  export), then permanently deleted. Export to CSV/Excel is available at any time.
- Cancellation confirmation is e-mailed immediately.

## Refunds — 30-Day Money-Back Guarantee
- Headline (use verbatim in English): **"30-Day Money-Back Guarantee — Full refund on unused credits.
  No questions asked."**
- Every payment (first payment and every renewal) can be refunded **in full within 30 days of the
  charge date**, no questions asked. "Unused credits" = the prepaid subscription time you paid for.
- How: e-mail support@shiftkumo.com with subject "Refund request" from the account e-mail (include the
  charge date and amount, or the last 4 digits of the card), or use **Settings → Billing → Request refund**.
- We confirm within **1 business day** and process within **3 business days**. Refunds go back to the
  original payment method in the original currency; banks usually show them within **5–10 business
  days**.
- When a payment is refunded under the 30-day guarantee the related subscription is cancelled and access
  ends at that time. Refunding a charge made in error (e.g. a duplicate) does not affect the subscription.
- After 30 days payments are not refundable, except where the law requires otherwise, for charges made
  in error by us (e.g. duplicate charges — always refunded in full), or if we discontinue the service
  (at least 30 days' notice and a refund of the unused prepaid period).
- Please contact us before filing a chargeback; we resolve billing issues quickly.

## Payments
- Accepted cards: **Visa, Mastercard, American Express, JCB, Discover, Diners Club, UnionPay**.
- Payments are processed by a PCI DSS Level 1 certified payment processor. ShiftKumo never stores full
  card numbers.

## Delivery
- Account access is activated **immediately** after checkout; a confirmation e-mail with the login
  link is sent within **5 minutes**. If it has not arrived within 1 hour, contact support.
- Available worldwide wherever we can lawfully provide the service. No shipping fees.

## Support
- E-mail: support@shiftkumo.com — first reply within **1 business day**.
- Hours: **Monday–Friday, 9:00–18:00 JST (UTC+9)**, excluding Japanese public holidays.
- Languages: English and Japanese.
- Product feedback / feature requests: e-mail with subject "Product feedback", or in the app
  **Help → Send feedback**.

## Privacy & data (for policies)
- Customers (businesses) are the **controller** of the employee data they put into ShiftKumo; we process
  it on their behalf as **processor / service provider**. We are controller of account, billing and
  website data.
- Data we collect: account data (name, work e-mail, company, role, language); workspace data entered by
  customers (employee names, contact details, availability, shifts, clock-in times, hourly rates);
  billing data (handled by the payment processor; we receive only card brand, last 4 digits, expiry,
  billing country); support correspondence; technical data (IP address, browser, device, logs).
- Purposes: provide the service, billing, support, security, legal compliance, product improvement
  (aggregated), service e-mails. **No selling of personal information. No sharing for cross-context
  behavioral advertising. No advertising or analytics cookies on the website.**
- Sub-processor categories: cloud hosting, payment processing, transactional e-mail, customer support
  tooling. All under contract.
- Security: TLS 1.2+ in transit, AES-256 at rest, daily encrypted backups, role-based access, least-
  privilege staff access.
- Retention: account/workspace data for the life of the account + 30 days; billing records as required
  by tax law (up to 7 years); support e-mails 3 years.
- Rights: access, correction, deletion, portability, restriction, objection, withdraw consent (GDPR /
  UK GDPR), CCPA/CPRA rights (know, delete, correct, opt-out of sale/sharing, limit sensitive PI,
  non-discrimination), Japan's APPI (disclosure, correction, suspension of use). We reply within 30 days.
  Global Privacy Control (GPC) signals are honored. Authorized agents may submit requests.
- International transfers safeguarded by Standard Contractual Clauses or equivalent.
- Not directed to children under 16; purchasers must be 18+ and acting for a business or themselves.

## Website storage (for cookie policy)
- The marketing website stores only these strictly necessary preference keys in the browser's local
  storage: `sk_lang` (language), `sk_currency` (USD/JPY on pricing pages), `sk_notice` (cookie notice
  dismissed). No tracking. Fonts are self-hosted (no third-party font requests).
- The ShiftKumo app uses a strictly necessary session cookie (`sk_session`) and a CSRF cookie
  (`sk_csrf`).
- The payment processor sets its own strictly necessary fraud-prevention cookies on the secure
  checkout page.

## Accessibility
- Target: **WCAG 2.1 Level AA**. Keyboard navigable, skip link, visible focus, sufficient contrast,
  `prefers-reduced-motion` respected, text alternatives, language of each page declared.
- Feedback: support@shiftkumo.com, subject "Accessibility"; reply within 5 business days.

## Tokens available in legal copy (replaced at build time)
- `{{brand}}` ShiftKumo · `{{company}}` operator legal name · `{{domain}}` shiftkumo.com
- `{{email}}` support@shiftkumo.com · `{{descriptor}}` SHIFTKUMO.COM · `{{updated}}` last-updated date
- `{{dmcaAgent}}` postal contact block for copyright notices (company, address, phone when configured, e-mail)
- `{{companyBlock}}` formatted contact block (company name, address when configured, e-mail, website)
- `{{priceTable}}` localized table of all plans and prices
- `{{url:KEY}}` localized link target, KEY ∈ home, features, pricing, checkout, about, support, contact,
  legal, terms-of-service, privacy-policy, refund-policy, cancellation-policy, shipping-policy,
  cookie-policy, accessibility, dmca, disclaimer, do-not-sell-or-share, commerce-disclosure
