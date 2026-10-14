// English legal pages for ShiftKumo.
// Every statement must agree with docs/FACTS.md. Tokens such as {{brand}}, {{email}},
// {{priceTable}} and {{url:KEY}} are replaced at build time — do not hard-code those values.

const termsOfService = `
<h2 id="agreement">1. Agreement to these Terms</h2>
<p>These Terms of Service (the "Terms") form a binding agreement between you and {{company}} ("{{brand}}", "we", "us" or "our"). They govern your access to and use of the {{brand}} employee scheduling service, including the website at {{domain}}, the {{brand}} web app and mobile web app, and the related e-mails, notifications and support we provide (together, the "Service").</p>
<p>By starting a free trial, purchasing a subscription, creating an account or otherwise using the Service, you confirm that you have read and accept these Terms, together with the documents they refer to: our <a href="{{url:privacy-policy}}">Privacy Policy</a>, <a href="{{url:refund-policy}}">Refund Policy</a>, <a href="{{url:cancellation-policy}}">Cancellation Policy</a> and <a href="{{url:cookie-policy}}">Cookie Policy</a>. If you do not agree, please do not use the Service.</p>
<p>If you accept these Terms on behalf of a company or other organization, "you" and "Customer" mean that organization, and you confirm that you are authorized to bind it to these Terms.</p>
<div class="callout">
<p><strong>The key points in brief</strong></p>
<ul>
<li>Every plan starts with a 1-hour free trial. A card is required, but nothing is charged at sign-up.</li>
<li>Exactly 1 hour after your trial starts, the full price of your plan is charged unless you cancel first in <strong>Settings → Billing → Cancel trial</strong>.</li>
<li>Subscriptions renew automatically until you cancel. You can cancel at any time with no fee.</li>
<li>Every payment is covered by our 30-Day Money-Back Guarantee.</li>
<li>Your business owns its data. We process your employees' information only to provide the Service to you.</li>
</ul>
</div>

<h2 id="eligibility">2. Eligibility</h2>
<p>To use the Service, you must:</p>
<ul>
<li>be at least 18 years old and legally able to enter into a binding contract;</li>
<li>use the Service for business purposes, that is, to schedule and manage the staff of a company, an organization or your own business; and</li>
<li>not be prohibited from receiving the Service under the laws that apply to you, including applicable sanctions and export-control laws.</li>
</ul>
<p>The Service is not directed to children. Staff accounts are created and managed by the Customer, and Section 9 explains the Customer's responsibilities for the people whose information it enters.</p>
<p>If the law of your country treats you as a consumer when you use the Service, you also benefit from any mandatory consumer protections that apply to you. Nothing in these Terms limits those protections.</p>

<h2 id="accounts-and-workspaces">3. Accounts and workspaces</h2>
<p>Each subscription covers one workspace, meaning one business account. A workspace can include unlimited employees, unlimited locations and unlimited schedules. The person who signs up is the account holder. Within the workspace, you can invite managers and staff ("Authorized Users") and give them manager or staff permissions. Staff can use the Service from any phone browser, so nothing needs to be installed.</p>
<p>You agree to:</p>
<ul>
<li>provide accurate, current and complete information when you sign up and keep it up to date. This matters most for your account e-mail address, which we use for receipts, reminders and important notices;</li>
<li>keep sign-in credentials confidential and give each person their own sign-in rather than sharing one;</li>
<li>make sure your Authorized Users follow these Terms, because you are responsible for activity in your workspace; and</li>
<li>tell us promptly at <a href="mailto:{{email}}">{{email}}</a> if you suspect anyone has accessed your account without permission.</li>
</ul>

<h2 id="the-service">4. The Service</h2>
<p>{{brand}} is web-based employee scheduling software (also called shift scheduling or rostering software), sold as a subscription. With the Service you can:</p>
<ul>
<li>build weekly and monthly shift schedules with drag-and-drop and reusable shift templates;</li>
<li>auto-schedule, which generates a draft roster from staff availability, skills, contracted hours and labor rules (such as maximum hours, minimum rest between shifts and overtime limits). Managers then review the draft and publish it;</li>
<li>collect availability and time-off requests, with an approval workflow;</li>
<li>handle shift swaps and open shifts that staff can claim, with manager approval;</li>
<li>publish schedules and notify staff by e-mail and in-app notifications;</li>
<li>record clock-in and clock-out times from a phone or a shared tablet, and review timesheets;</li>
<li>forecast labor costs, get overtime alerts and compare your budget with actual costs;</li>
<li>export hours to CSV or Excel for payroll;</li>
<li>manage multiple locations, departments and roles with manager and staff permissions; and</li>
<li>use the interface in English or Japanese. Each user chooses their own language.</li>
</ul>
<p>Every plan includes every feature, unlimited employees, unlimited locations and unlimited schedules. The plans differ only in their billing period. See our <a href="{{url:features}}">Features</a> page for an overview.</p>
<p>We keep improving the Service, so we may add, change or remove features. We will not materially reduce the core scheduling functionality of the Service during a billing period you have already paid for. Where reasonably possible, we will tell you in advance about any change that would materially and adversely affect you.</p>

<h2 id="free-trial">5. Free trial</h2>
<p>Every plan starts with a <strong>1-hour free trial</strong>, so you can try the full Service before you pay.</p>
<ul>
<li><strong>A payment card is required</strong> to start the trial.</li>
<li><strong>Nothing is charged at sign-up</strong> (US$0 / ¥0). Your card issuer may show a temporary authorization hold, which is released automatically.</li>
<li><strong>Exactly 1 hour after your trial starts, the full price of the plan you selected is charged</strong> to your card unless you cancel before the hour ends. That charge starts your first billing period. After that, your subscription renews automatically as described in Section 7.</li>
<li>During the trial, you can cancel instantly in the app at <strong>Settings → Billing → Cancel trial</strong>. If you cancel before the hour ends, you are not charged.</li>
<li>If you e-mail us to cancel during the trial and the hour runs out before we process your message, we will refund that charge in full.</li>
<li>One free trial is available per customer and per business. We may decline or end a trial that we reasonably believe is a duplicate.</li>
</ul>
<p>If the trial ends and you are charged, that payment is covered by our 30-day money-back guarantee like any other (Section 8).</p>

<h2 id="plans-prices-and-payment">6. Plans, prices and payment</h2>
<p>We offer the plans below. Every plan includes the same features. Only the billing period and the price differ.</p>
{{priceTable}}
<ul>
<li><strong>Currency.</strong> You choose US dollars (USD) or Japanese yen (JPY) at checkout, and you are charged in that currency.</li>
<li><strong>All-in prices.</strong> The price shown is the total price for each billing period. There are no setup fees and no hidden fees, and any applicable taxes are included in the price shown. Your bank or card issuer may add its own foreign-transaction fee. We do not control that fee and do not receive it.</li>
<li><strong>Accepted cards.</strong> We accept Visa, Mastercard, American Express, JCB, Discover, Diners Club and UnionPay.</li>
<li><strong>Secure processing.</strong> Payments are processed by a PCI DSS Level 1 certified payment processor. {{brand}} never stores full card numbers. The payment processor's own terms may also apply to your payment.</li>
<li><strong>Authorization.</strong> By giving us a card, you authorize us (through our payment processor) to charge your plan price when your trial ends and at each renewal until you cancel. You also confirm that you are authorized to use that card.</li>
<li><strong>Statement descriptor.</strong> Charges appear on your card statement as <strong>{{descriptor}}</strong>.</li>
<li><strong>Receipts.</strong> We e-mail a receipt for every charge to your account e-mail address.</li>
<li><strong>Failed payments.</strong> If a charge is declined, we will tell you by e-mail so you can update your card. If payment is not completed, we may suspend access to the Service until it is.</li>
</ul>
<p>The disclosures required for customers in Japan under the Act on Specified Commercial Transactions are on our <a href="{{url:commerce-disclosure}}">Commerce Disclosure</a> page.</p>

<h2 id="automatic-renewal">7. Automatic renewal and price changes</h2>
<p>Your subscription <strong>renews automatically</strong> at the end of each billing period for another period of the same length, unless you switch plans. Each renewal is charged at your current plan's price to the card on file. This continues until you cancel.</p>
<p><strong>Plan changes.</strong> You can switch to a longer or shorter billing period in Settings → Billing. The switch takes effect at your next renewal, which is charged at the new plan's price and lasts for the new plan's period. The period you have already paid for does not change.</p>
<ul>
<li>We e-mail a receipt for every renewal charge.</li>
<li>For plans of 12 months or longer (Annual, 2-Year and 3-Year), we send a renewal reminder e-mail <strong>7 days before</strong> the renewal date.</li>
<li>We announce any price change by e-mail <strong>at least 30 days in advance</strong>. A new price applies only from your next renewal after that notice, and you can cancel before then if you do not want to continue.</li>
</ul>
<p>By starting a subscription, you agree to these recurring charges. To stop future renewals, cancel at any time as described in Section 8.</p>

<h2 id="cancellation-and-refunds">8. Cancellation and refunds</h2>
<h3>Cancellation</h3>
<p>You can cancel at any time, and there is no cancellation fee. You can cancel in either of these ways:</p>
<ul>
<li><strong>In the app:</strong> go to <strong>Settings → Billing → Cancel subscription</strong>. During the free trial, use <strong>Settings → Billing → Cancel trial</strong> instead.</li>
<li><strong>By e-mail:</strong> write to <a href="mailto:{{email}}">{{email}}</a> from your account e-mail address with the subject "Cancel subscription".</li>
</ul>
<p>Cancellation stops all future renewals. You keep access until the end of the period you have already paid for, and we e-mail you a cancellation confirmation immediately. Our <a href="{{url:cancellation-policy}}">Cancellation Policy</a> has the full details.</p>
<h3>30-day money-back guarantee</h3>
<p>Every payment can be refunded <strong>in full within 30 days of the charge date</strong>, no questions asked. This includes your first payment and every renewal. To request a refund, go to <strong>Settings → Billing → Request refund</strong>, or e-mail <a href="mailto:{{email}}">{{email}}</a> from your account e-mail address with the subject "Refund request".</p>
<p>When a payment is refunded, the related subscription is cancelled and access ends at that time. After 30 days, payments are not refundable, except where the law requires otherwise, for charges made in error by us (such as duplicate charges), which we always refund in full, or if we stop offering the Service, as described below. Our <a href="{{url:refund-policy}}">Refund Policy</a> has the full details, including timing.</p>
<p>If you have a billing problem, please contact us before you file a chargeback with your bank. We resolve billing issues quickly.</p>

<h2 id="customer-data">9. Customer Data and data protection</h2>
<h3>Your data belongs to you</h3>
<p>"Customer Data" means the information that you and your Authorized Users enter into or create in your workspace. Examples include employee names and contact details, availability, time-off requests, shifts, clock-in and clock-out times, timesheets and hourly rates. As between you and us, you own Customer Data. You give us a limited right to host, copy, process and display it, only as needed to provide, secure and support the Service for you and as these Terms describe.</p>
<h3>Our roles</h3>
<p>For Customer Data, you are the controller (or "business") and we act as your processor (or "service provider"). For the account, billing and website data that we collect for our own purposes, we are the controller. Our <a href="{{url:privacy-policy}}">Privacy Policy</a> describes that processing.</p>
<h3>Your responsibilities</h3>
<ul>
<li>You are responsible for the lawfulness of Customer Data and for having a valid legal basis to use it. That includes giving your staff any notices and getting any consents that the law requires.</li>
<li>You are responsible for the accuracy of the information you enter, and for answering your staff's requests about their personal information. We will help, as described below.</li>
<li>Enter only the information you need to schedule and pay your staff. Do not enter special categories of data, such as health information, unless you have a lawful basis to process it and it is necessary.</li>
</ul>
<h3>Our commitments as your processor</h3>
<p>When we process Customer Data, we will:</p>
<ul>
<li>process it only on your documented instructions, which are these Terms and the way you use and configure the Service, unless the law requires otherwise. If it does, we will tell you before processing unless the law prohibits that;</li>
<li>make sure that personnel who can access it are bound by confidentiality, and that access is limited to those who need it on a least-privilege basis;</li>
<li>protect it with appropriate technical and organizational measures. These include TLS 1.2 or higher in transit, AES-256 encryption at rest, daily encrypted backups and role-based access controls;</li>
<li>use sub-processors only for cloud hosting, payment processing, transactional e-mail and customer support tooling. Each one is bound by a written contract that protects data at least as well as these Terms, and we remain responsible for them. A current list is available on request;</li>
<li>protect international transfers with Standard Contractual Clauses or an equivalent mechanism;</li>
<li>help you, as far as the nature of the processing allows, to respond to requests from individuals and to meet your obligations on security, breach notification and data protection impact assessments;</li>
<li>tell you without undue delay after we become aware of a personal data breach affecting Customer Data;</li>
<li>when the Service ends, make Customer Data available for export and then delete it, as described in Section 15;</li>
<li>give you the information you reasonably need to show that we meet these commitments; and</li>
<li>as a service provider under the California Consumer Privacy Act, not sell or share Customer Data. We will not retain, use or disclose it for any purpose other than providing the Service to you or as the law otherwise permits, and we will not combine it with personal information from other sources except as the law permits.</li>
</ul>
<h3>Aggregated information</h3>
<p>We may use aggregated, de-identified information about how the Service is used to maintain and improve it. This information does not identify you, your staff or any other individual.</p>

<h2 id="acceptable-use">10. Acceptable use</h2>
<p>You must not do any of the following, or allow anyone else to:</p>
<ul>
<li>use the Service in violation of any law, including employment, labor, privacy and anti-discrimination laws;</li>
<li>enter information that you have no right to use, or that is unlawful, defamatory or harassing, or that infringes anyone else's rights;</li>
<li>use the Service to send spam or other unsolicited messages;</li>
<li>try to access accounts, workspaces or data that are not yours, or probe, scan or test the vulnerability of the Service without our written permission;</li>
<li>introduce malware, or interfere with or disrupt the integrity or performance of the Service;</li>
<li>copy, modify, reverse engineer or create derivative works of the Service, except where the law expressly allows this despite this restriction;</li>
<li>access the Service with bots, scrapers or other automated means, except as we expressly allow;</li>
<li>resell, sublicense or provide the Service to third parties, or use it to build a competing product; or</li>
<li>get around billing, usage limits or the one-free-trial-per-customer rule.</li>
</ul>
<p>We may investigate suspected violations and take appropriate action. That action may include removing content or suspending accounts, as described in Section 14.</p>

<h2 id="intellectual-property">11. Intellectual property and feedback</h2>
<p>The Service and everything we provide as part of it, including software, designs, text, graphics and logos, is owned by {{company}} or its licensors and is protected by intellectual property laws. Customer Data is not included in this. Subject to these Terms, we grant you a limited, non-exclusive, non-transferable and non-sublicensable right, during your trial and subscription, for you and your Authorized Users to access and use the Service for your internal business purposes. We reserve all rights not expressly granted.</p>
<p>"{{brand}}" and our logos are our trademarks. You may not use them without our permission, except to refer accurately to the Service.</p>
<p>We welcome your ideas. You can send feedback by e-mail with the subject "Product feedback", or in the app under <strong>Help → Send feedback</strong>. If you send us feedback, you give us a free, worldwide and perpetual right to use it to improve our products, with no obligation to you. Feedback does not include Customer Data, which remains yours.</p>
<p>To report material that you believe infringes your copyright, see our <a href="{{url:dmca}}">Copyright &amp; DMCA Policy</a>.</p>

<h2 id="third-party-services">12. Third-party services</h2>
<p>The Service relies on third-party providers, such as our payment processor and our cloud hosting and e-mail delivery providers. When you pay, you enter your card details on the payment processor's secure checkout page, and its own terms and privacy notice may also apply. Our website and the Service may link to third-party websites. We are not responsible for their content or practices. Your use of the Service also depends on your own devices and browsers and on your internet and mobile network providers, which are outside our control.</p>

<h2 id="availability-and-support">13. Availability, maintenance and support</h2>
<p>We work hard to keep the Service available around the clock, but we do not guarantee that it will be uninterrupted or error-free. Maintenance, updates, failures at third-party providers and events beyond our reasonable control can all affect availability. We plan maintenance to keep disruption to a minimum. Where reasonably possible, we give advance notice of planned maintenance that we expect to cause significant downtime.</p>
<p>Support is available by e-mail at <a href="mailto:{{email}}">{{email}}</a>, Monday to Friday, 9:00–18:00 JST (UTC+9), except Japanese public holidays. We reply in English or Japanese, with a first reply within 1 business day. You can also visit our <a href="{{url:support}}">Support</a> page.</p>
<p>We make daily encrypted backups for disaster recovery. They do not replace your own records. Export and keep any hours, timesheets and other records that you are legally required to retain.</p>

<h2 id="suspension-and-termination">14. Suspension and termination</h2>
<p>You may stop using the Service and cancel at any time (Section 8).</p>
<p>We may suspend or end your access to all or part of the Service if:</p>
<ul>
<li>you materially breach these Terms, including the acceptable use rules, and you do not fix the breach within a reasonable time after we tell you about it (where it can be fixed);</li>
<li>a payment is not completed;</li>
<li>we reasonably need to act to prevent fraud, abuse of the free trial, or a security risk to the Service, our customers or others; or</li>
<li>the law or a competent authority requires it.</li>
</ul>
<p>Where reasonably possible, we will tell you before we act and give you a chance to resolve the issue. We lift a suspension once the issue is resolved. If we stop offering the Service entirely, we will give you at least 30 days' notice by e-mail so you can export your data, and we will refund any prepaid fees for the unused part of your billing period.</p>
<p>Some provisions continue to apply after these Terms end because of their nature. These include the sections on Customer Data, intellectual property, disclaimers, limitation of liability, indemnification and governing law.</p>

<h2 id="data-export-and-deletion">15. Data export and deletion</h2>
<p>While you have access, you can export your data to CSV or Excel at any time, including hours for payroll.</p>
<p>After your subscription ends, we keep your workspace data for <strong>30 days</strong> so you can reactivate or export it. This applies whether the subscription ended through cancellation, a refund or termination. After those 30 days, the workspace data is permanently deleted.</p>
<p>You can ask us to delete your workspace sooner by e-mailing <a href="mailto:{{email}}">{{email}}</a> from your account e-mail address. We keep billing records for as long as tax law requires (up to 7 years) and support correspondence for 3 years, as our <a href="{{url:privacy-policy}}">Privacy Policy</a> explains.</p>

<h2 id="disclaimer-of-warranties">16. Disclaimer of warranties</h2>
<p>To the maximum extent permitted by law, the Service is provided "as is" and "as available". We disclaim all warranties, express or implied. These include implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and any warranty that the Service will be uninterrupted or error-free or will meet all of your requirements.</p>
<p>Auto-scheduling, labor-rule checks, overtime alerts and labor cost forecasts are tools to help you. They are not legal, labor-law, tax or payroll advice. You are responsible for reviewing schedules before you publish them, for the accuracy of the payroll data you export, and for complying with the employment and labor laws that apply to your business. Our <a href="{{url:disclaimer}}">Disclaimer</a> explains more.</p>
<p>Some jurisdictions do not allow certain warranties to be excluded. Where that is the case, these exclusions apply only as far as the law allows.</p>

<h2 id="limitation-of-liability">17. Limitation of liability</h2>
<p>To the maximum extent permitted by law:</p>
<ul>
<li>{{company}} and its officers, employees and suppliers will not be liable for any indirect, incidental, special, consequential, exemplary or punitive damages, or for any loss of profits, revenue, business, goodwill or data, arising out of or relating to these Terms or the Service, even if we were told such damages were possible. This does not affect our commitments on Customer Data in Section 9; and</li>
<li>our total liability for all claims arising out of or relating to these Terms or the Service is limited to the total fees you paid us for the Service in the 12 months before the claim arose.</li>
</ul>
<p>Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law. That includes liability for fraud, for death or personal injury caused by negligence, and for gross negligence or willful misconduct. Nothing in these Terms affects any mandatory rights you have as a consumer.</p>

<h2 id="indemnification">18. Indemnification</h2>
<p>To the extent permitted by law, you will defend, indemnify and hold harmless {{company}} and its officers, employees and agents against third-party claims, and the related losses, damages, fines and reasonable costs (including reasonable legal fees), that arise from:</p>
<ul>
<li>Customer Data or your instructions about it;</li>
<li>a breach of these Terms, or a violation of law (including employment and labor laws), by you or your Authorized Users; or</li>
<li>scheduling, pay or working-time decisions that you make using the Service.</li>
</ul>
<p>We will tell you promptly about any such claim, let you control the defense and cooperate reasonably at your expense. You may not settle a claim in a way that imposes obligations on us without our consent, which we will not unreasonably withhold. This section does not apply to individuals acting as consumers where local law prohibits it.</p>

<h2 id="changes-to-these-terms">19. Changes to these Terms</h2>
<p>We may update these Terms from time to time, for example to reflect changes to the Service or to the law. We will post the updated version on this page with a new "Last updated" date. For a material change, we will notify you by e-mail or in the app at least 30 days before it takes effect. The only exceptions are changes that the law requires sooner or that are needed to address a security risk. Changes do not apply retroactively.</p>
<p>If you do not agree with a change, you can cancel before it takes effect. If you keep using the Service after the effective date, you accept the updated Terms. Section 7 covers price changes.</p>

<h2 id="governing-law-and-disputes">20. Governing law and disputes</h2>
<p>These Terms, and any dispute arising out of or relating to them or the Service, are governed by the laws of the jurisdiction in which {{company}} is established, without regard to its conflict-of-law rules. The United Nations Convention on Contracts for the International Sale of Goods does not apply.</p>
<p>Nothing in these Terms takes away the protection of the mandatory consumer protection laws of your country of residence. If you are a consumer, you may also bring proceedings in the courts of your country of residence where those laws allow it.</p>
<p><strong>Informal resolution first.</strong> Most concerns can be resolved quickly. Before starting any formal proceedings, e-mail <a href="mailto:{{email}}">{{email}}</a> to describe the issue and the outcome you want. We both agree to try in good faith to resolve the dispute informally for 30 days from receipt of that e-mail. If it is still unresolved after 30 days, either of us may bring proceedings in the competent courts of the jurisdiction whose laws govern these Terms, subject to the consumer protections above. Either of us may seek urgent interim relief at any time, for example to protect intellectual property or the security of the Service.</p>

<h2 id="general-terms">21. General terms</h2>
<ul>
<li><strong>Entire agreement.</strong> These Terms and the policies they refer to are the entire agreement between you and us about the Service. They replace any earlier agreements on the same subject.</li>
<li><strong>Notices.</strong> We may send notices to your account e-mail address or show them in the app. You can send notices to us at <a href="mailto:{{email}}">{{email}}</a>. You agree to receive communications from us electronically.</li>
<li><strong>Assignment.</strong> You may not transfer these Terms without our consent. We may transfer them, with notice to you, as part of a merger, an acquisition or a sale of assets.</li>
<li><strong>Events beyond control.</strong> Neither of us is liable for delays or failures caused by events beyond our reasonable control. This does not apply to payment obligations.</li>
<li><strong>Severability and waiver.</strong> If any provision is found unenforceable, the rest of these Terms remain in effect. If either of us does not enforce a provision, that is not a waiver of it.</li>
<li><strong>Relationship.</strong> We are independent contractors. These Terms do not create a partnership, employment or agency relationship, and they give no rights to third parties.</li>
<li><strong>Language.</strong> These Terms are published in English and Japanese. If the two versions conflict, the version in the language in which you subscribed applies, as far as the law allows.</li>
</ul>

<h2 id="contact-us">22. Contact us</h2>
<p>If you have questions about these Terms, e-mail us at <a href="mailto:{{email}}">{{email}}</a>. We give a first reply within 1 business day (Monday to Friday, 9:00–18:00 JST, except Japanese public holidays). You can also use our <a href="{{url:contact}}">contact page</a>.</p>
{{companyBlock}}
`;

const privacyPolicy = `
<h2 id="who-we-are">1. Who we are and what this policy covers</h2>
<p>This Privacy Policy explains how {{company}} ("{{brand}}", "we", "us" or "our") collects, uses, shares and protects personal information when you visit {{domain}}, start a free trial or subscription, use the {{brand}} app, or contact us. It also explains your choices and rights.</p>
<div class="callout">
<p><strong>The short version:</strong> We collect only what we need to run {{brand}}, bill for it and support you. We do not sell personal information, and we do not share it for cross-context behavioral advertising. Our website uses no advertising or analytics cookies. The businesses that use {{brand}} control the employee data they put into it. You can use your privacy rights at any time by e-mailing <a href="mailto:{{email}}">{{email}}</a>.</p>
</div>
<p>Terms with capital letters that are not defined here, such as "Service", "Customer" and "Customer Data", have the meanings given in our <a href="{{url:terms-of-service}}">Terms of Service</a>.</p>

<h2 id="controller-and-processor">2. Our role: controller and processor</h2>
<ul>
<li><strong>Where we are the controller.</strong> We decide how and why we process account data, billing data, website data and support correspondence. This policy describes that processing.</li>
<li><strong>Where we are the processor (service provider).</strong> Our customers are the businesses that subscribe to {{brand}}. They enter information about their staff into their workspaces, such as names, contact details, availability, shifts, clock-in times and hourly rates. The customer is the controller of that workspace data. We process it on the customer's behalf and on its instructions, as set out in our Terms of Service. How the customer uses its employees' information is governed by the customer's own privacy notice.</li>
</ul>
<p>If your employer uses {{brand}} and you want to access, correct or delete your information, please contact your employer first. If you contact us instead, we will pass your request to your employer and help them respond.</p>

<h2 id="information-we-collect">3. Personal information we collect</h2>
<table>
<thead><tr><th>Category</th><th>What it includes</th><th>When we collect it</th></tr></thead>
<tbody>
<tr><td>Account data</td><td>Name, work e-mail address, company name, role and preferred language</td><td>When you sign up, or when you are invited to a workspace</td></tr>
<tr><td>Workspace data (processed for our customers)</td><td>Employee names, contact details, availability and time-off requests, shifts, clock-in and clock-out times, and hourly rates</td><td>When customers and their staff use the Service</td></tr>
<tr><td>Billing data</td><td>Card brand, last 4 digits, expiry date and billing country, plus your plan, currency, charges and refunds</td><td>At checkout and with each charge</td></tr>
<tr><td>Support correspondence</td><td>Your messages and feedback, and any attachments you choose to send</td><td>When you contact us</td></tr>
<tr><td>Technical data</td><td>IP address, browser type, device information, and server and security logs</td><td>Automatically, when you use the website or the app</td></tr>
<tr><td>Preferences stored in your browser</td><td>Your language, your currency and whether you dismissed the cookie notice</td><td>Kept in your browser's local storage (see our <a href="{{url:cookie-policy}}">Cookie Policy</a>)</td></tr>
</tbody>
</table>
<p>Full card numbers are collected and processed by our PCI DSS Level 1 certified payment processor. {{brand}} never stores full card numbers. We do not ask for sensitive information such as health data, and we ask customers not to enter it into the Service unless they have a lawful basis and it is necessary.</p>

<h2 id="sources">4. Where we get personal information</h2>
<ul>
<li><strong>From you:</strong> when you start a trial, buy a subscription, set up your account, use the Service or contact us.</li>
<li><strong>From the customer you work for:</strong> when a manager adds you to a workspace, assigns you shifts or records your hours.</li>
<li><strong>From our payment processor:</strong> limited card details (card brand, last 4 digits, expiry date and billing country) and the status of each payment.</li>
<li><strong>Automatically:</strong> technical data that your browser or device sends when you use the website or app.</li>
</ul>

<h2 id="how-we-use-information">5. How we use personal information, and our legal bases</h2>
<p>The table below lists each purpose and, for people in the European Economic Area (EEA) and the United Kingdom, the legal basis we rely on.</p>
<table>
<thead><tr><th>Purpose</th><th>Data used</th><th>Legal basis (EEA/UK)</th></tr></thead>
<tbody>
<tr><td>Provide and operate the Service: accounts, workspaces, schedules, notifications and exports</td><td>Account, workspace and technical data</td><td>Performance of our contract with you. For workspace data, we act on the customer's instructions</td></tr>
<tr><td>Process payments, send receipts and renewal reminders, and handle refunds</td><td>Account and billing data</td><td>Performance of a contract; legal obligation (tax and accounting records)</td></tr>
<tr><td>Answer support requests and act on feedback</td><td>Account data and support correspondence</td><td>Performance of a contract; legitimate interests in helping our customers</td></tr>
<tr><td>Keep the Service secure, and prevent fraud and abuse (including enforcing one free trial per customer)</td><td>Account, billing and technical data</td><td>Legitimate interests in protecting our customers, the Service and our business</td></tr>
<tr><td>Send service e-mails, such as sign-up confirmations, receipts, reminders, price-change notices and security alerts</td><td>Account data</td><td>Performance of a contract; legal obligation where notices are required</td></tr>
<tr><td>Improve the Service using aggregated information</td><td>Aggregated, de-identified usage information</td><td>Legitimate interests in improving our product</td></tr>
<tr><td>Comply with the law, enforce our Terms, and establish or defend legal claims</td><td>Any relevant data</td><td>Legal obligation; legitimate interests</td></tr>
</tbody>
</table>
<p>If we ever rely on your consent, we will ask for it clearly, and you can withdraw it at any time. We do not use personal information for advertising, and we do not build profiles to target you. The auto-schedule feature creates draft schedules that the customer's managers review before publishing. {{brand}} does not make decisions about individuals that have legal or similarly significant effects.</p>
<p>Service e-mails are essential to your account, so you receive them for as long as you have one. E-mails to staff about schedules are sent on the customer's instructions.</p>

<h2 id="how-we-share-information">6. How we share personal information</h2>
<p>We do not sell personal information, and we do not share it for cross-context behavioral advertising. We disclose it only as follows:</p>
<ul>
<li><strong>Service providers (sub-processors).</strong> We use providers for cloud hosting, payment processing, transactional e-mail and customer support tooling. All of them work under contract, may use personal information only to provide services to us, and must protect it. A current list of sub-processors is available on request.</li>
<li><strong>Within your workspace.</strong> People in a workspace can see information according to the roles and permissions the customer sets. For example, staff see published schedules, and managers see availability and timesheets.</li>
<li><strong>For legal reasons and safety.</strong> We disclose information when the law, a court order or a competent authority requires it, or when it is necessary to protect the rights, property or safety of our customers, the public or {{brand}}, including to prevent fraud.</li>
<li><strong>Business transfers.</strong> If we are involved in a merger, an acquisition or a sale of assets, personal information may transfer to the successor. The successor remains bound by this policy, and we will notify you.</li>
<li><strong>Professional advisers.</strong> We may share information with lawyers, accountants and auditors who are bound by confidentiality.</li>
<li><strong>With your consent.</strong> We also share information when you ask us to.</li>
</ul>

<h2 id="international-transfers">7. International data transfers</h2>
<p>We serve customers worldwide, and we and our service providers may process personal information in countries other than the one you live in. Those countries may have different data protection laws. When we transfer personal information out of the EEA, the United Kingdom or another region that restricts transfers, we protect it with Standard Contractual Clauses (including the UK Addendum where relevant) or an equivalent safeguard, such as an adequacy decision. For transfers from Japan, we make sure the recipients take measures equivalent to those the Act on the Protection of Personal Information requires. To learn more or get a copy of the relevant safeguards, contact us.</p>

<h2 id="retention">8. How long we keep personal information</h2>
<table>
<thead><tr><th>Data</th><th>How long we keep it</th></tr></thead>
<tbody>
<tr><td>Account data</td><td>For the life of the account, plus 30 days</td></tr>
<tr><td>Workspace data</td><td>For the life of the customer's account, plus 30 days. It is then permanently deleted</td></tr>
<tr><td>Billing records</td><td>For as long as tax law requires, up to 7 years</td></tr>
<tr><td>Support correspondence</td><td>3 years</td></tr>
<tr><td>Technical logs</td><td>Only as long as needed for security, fraud prevention and troubleshooting</td></tr>
<tr><td>Preferences in your browser</td><td>On your device until you clear them</td></tr>
</tbody>
</table>
<p>We may keep aggregated information that no longer identifies anyone. If the law requires us to keep information longer, or we need it to establish or defend a legal claim, we keep it only as long as that purpose requires.</p>

<h2 id="security">9. How we protect personal information</h2>
<ul>
<li>Data is encrypted in transit with TLS 1.2 or higher and encrypted at rest with AES-256.</li>
<li>We make daily encrypted backups.</li>
<li>Role-based access controls apply in the Service, and our staff have least-privilege access, limited to what their role requires.</li>
<li>Payments are handled by a PCI DSS Level 1 certified payment processor, and we never store full card numbers.</li>
<li>Our service providers are bound by contract to protect personal information.</li>
</ul>
<p>No method of transmission or storage is completely secure. If a breach affects your personal information, we will notify you and the relevant authorities as the law requires. You can help by keeping your sign-in details private and telling us about any suspicious activity.</p>

<h2 id="your-rights">10. Your privacy rights and how to use them</h2>
<p>Your rights depend on where you live. Sections 11 to 13 describe them by region. Whatever your location, you can make a request as follows:</p>
<ul>
<li><strong>How to ask:</strong> e-mail <a href="mailto:{{email}}">{{email}}</a>, ideally from your account e-mail address, with the subject "Privacy request". Tell us which right you want to use.</li>
<li><strong>Verification:</strong> to protect your information, we verify your identity before acting, usually by confirming that you control the account e-mail address. We use the information you give us for verification only for that purpose.</li>
<li><strong>Authorized agents:</strong> someone can make a request for you if they have your signed, written permission. We may still ask you to confirm your identity directly with us.</li>
<li><strong>Response time:</strong> we reply within 30 days.</li>
<li><strong>Cost:</strong> we do not charge for requests, unless the law allows a reasonable fee for requests that are manifestly unfounded or excessive.</li>
<li><strong>Workspace data:</strong> requests about information that an employer has entered into {{brand}} should go to that employer, as the controller. We will help them respond.</li>
</ul>

<h2 id="eea-uk-rights">11. Rights in the European Economic Area and the United Kingdom</h2>
<p>Under the GDPR and the UK GDPR, you have the right to:</p>
<ul>
<li><strong>access</strong> your personal information and get a copy of it;</li>
<li><strong>correct</strong> information that is inaccurate or incomplete;</li>
<li><strong>delete</strong> your information (the "right to be forgotten");</li>
<li><strong>data portability</strong>, which means receiving your information in a structured, machine-readable format;</li>
<li><strong>restrict</strong> our processing in certain circumstances;</li>
<li><strong>object</strong> to processing based on our legitimate interests; and</li>
<li><strong>withdraw consent</strong> at any time where we rely on it. This does not affect processing that took place before you withdrew it.</li>
</ul>
<p>You can also complain to a data protection supervisory authority, especially in the country where you live or work or where you believe an infringement occurred. In the United Kingdom, that is the Information Commissioner's Office. We would appreciate the chance to address your concern first.</p>

<h2 id="us-rights">12. Rights in the United States, including California</h2>
<h3>Categories of personal information (last 12 months)</h3>
<p>This section serves as our notice at collection for California residents. In the last 12 months, we have collected the categories of personal information below. We collected them from the sources in Section 4, for the purposes in Section 5, and we keep them for the periods in Section 8.</p>
<table>
<thead><tr><th>Category (CCPA)</th><th>Examples</th><th>Disclosed for a business purpose to</th><th>Sold or shared</th></tr></thead>
<tbody>
<tr><td>Identifiers</td><td>Name, e-mail address, IP address, account identifiers</td><td>Cloud hosting, transactional e-mail, customer support tooling and payment processing providers</td><td>No</td></tr>
<tr><td>Customer records (Cal. Civ. Code § 1798.80(e))</td><td>Name, card brand, last 4 digits, expiry date, billing country</td><td>Payment processing and cloud hosting providers</td><td>No</td></tr>
<tr><td>Commercial information</td><td>Plan, currency, charges, refunds</td><td>Payment processing, cloud hosting and customer support tooling providers</td><td>No</td></tr>
<tr><td>Internet or other electronic network activity</td><td>Browser, device information, logs of activity on the website and in the app</td><td>Cloud hosting providers</td><td>No</td></tr>
<tr><td>Professional or employment-related information</td><td>Company and role. As a service provider, we also hold workspace data such as shifts, hours and hourly rates</td><td>Cloud hosting and transactional e-mail providers</td><td>No</td></tr>
<tr><td>Sensitive personal information</td><td>Account log-in information used to access your {{brand}} account</td><td>Cloud hosting providers</td><td>No</td></tr>
<tr><td>Biometric information, precise geolocation, and inferences used to build profiles</td><td>Not collected</td><td>Not applicable</td><td>No</td></tr>
</tbody>
</table>
<h3>Your California rights</h3>
<p>Under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (CCPA), California residents have the right to:</p>
<ul>
<li><strong>know and access</strong> the personal information we have collected about them, including the categories, sources, purposes and recipients;</li>
<li><strong>delete</strong> personal information we have collected from them;</li>
<li><strong>correct</strong> inaccurate personal information;</li>
<li><strong>opt out of the sale or sharing</strong> of personal information;</li>
<li><strong>limit the use and disclosure of sensitive personal information</strong>; and</li>
<li><strong>not be discriminated against</strong> for using any of these rights. We will not deny you the Service, charge you a different price or give you a different quality of service because you made a request.</li>
</ul>
<h3>We do not sell or share personal information</h3>
<p>We do not sell personal information, and we do not share it for cross-context behavioral advertising. We have not done either in the preceding 12 months. We have no actual knowledge of selling or sharing the personal information of consumers under 16. We use sensitive personal information only for purposes the CCPA regulations permit, such as providing the Service and keeping it secure, so you do not need to take any action to limit it. For more information, see <a href="{{url:do-not-sell-or-share}}">Do Not Sell or Share My Personal Information</a>.</p>
<h3>Making a request</h3>
<p>Follow the steps in Section 10. Authorized agents may submit requests on your behalf. We reply within 30 days, which is within the 45-day period the CCPA allows. We do not disclose personal information to third parties for their own direct marketing purposes, as described in California's "Shine the Light" law.</p>
<h3>Other US states</h3>
<p>Residents of Virginia, Colorado, Connecticut, Utah, Texas, Oregon and other states with comprehensive privacy laws have similar rights. Where those laws apply to us, they generally include the rights to access, correct, delete and obtain a copy of personal information, and to opt out of targeted advertising, sale and certain kinds of profiling. We do not engage in targeted advertising, sale of personal information or profiling that produces legal or similarly significant effects. To make a request, follow the steps in Section 10. If we decline your request, you can appeal by replying to our decision with the subject "Privacy appeal". We will respond within the time your state's law requires, and if you disagree with the outcome, you may contact your state attorney general.</p>

<h2 id="japan-rights">13. Rights in Japan (APPI)</h2>
<p>For users in Japan, we handle personal information in accordance with the Act on the Protection of Personal Information (APPI).</p>
<ul>
<li><strong>Purposes of use.</strong> We use personal information for the purposes described in Section 5. We will not use it beyond those purposes without your consent, unless the law permits it.</li>
<li><strong>Provision to third parties.</strong> We do not provide personal data to third parties without your consent, unless the law permits it. When we entrust handling to service providers within the scope needed to achieve our purposes, that is not provision to a third party. We supervise those providers appropriately.</li>
<li><strong>Transfers to foreign countries.</strong> {{company}} is located in the United States (Colorado), and we handle the personal information of users in Japan in the United States. Some of our service providers may also be located outside Japan. We require by contract that they take measures equivalent to those the APPI requires. On request, we will tell you about these measures and about the personal information protection system of the relevant countries.</li>
<li><strong>Security control measures.</strong> Our measures fall into four groups. Organizational: clear responsibility for data protection and internal rules for handling data. Personnel: confidentiality obligations for staff. Physical: our data is hosted in the secured data centers of our cloud hosting provider. Technical: encryption in transit and at rest, role-based access and least-privilege access. External environment: we handle personal data in the United States and take these measures with an understanding of US federal and Colorado privacy law.</li>
<li><strong>Your requests.</strong> You can ask us to disclose the retained personal data we hold about you, including records of any provision to third parties. You can also ask us to correct, add to or delete it, to suspend its use or erase it, or to stop providing it to third parties. Send your request as described in Section 10. We respond without delay, and within 30 days.</li>
<li><strong>Business operator and inquiries.</strong> The business operator handling your personal information is {{company}}. Our address is shown in the Contact us section below, and the name of our representative is available on request. Please send complaints and inquiries about how we handle personal information to <a href="mailto:{{email}}">{{email}}</a>.</li>
</ul>

<h2 id="global-privacy-control">14. Global Privacy Control and Do Not Track</h2>
<p>We honor the Global Privacy Control (GPC). When your browser sends a GPC signal, we treat it as a valid request to opt out of the sale and sharing of personal information. The request covers that browser and any account we can associate with it. We already do not sell or share personal information, so the website and the Service work the same way for you either way. We also do not track you across other websites, which means Do Not Track signals do not change how our website works.</p>

<h2 id="children">15. Children's privacy</h2>
<p>{{brand}} is not directed to children under 16, and we do not knowingly collect personal information from children under 16 through our website or sign-up process. Purchasers must be 18 or older. If you believe a child has given us personal information, contact us and we will delete it. Some customers employ minors where the law allows and add them to a workspace. In that case, the customer is responsible as controller for giving the required notices and obtaining any required consents, including parental consent.</p>

<h2 id="cookies">16. Cookies and local storage</h2>
<p>Our marketing website stores only three strictly necessary preferences in your browser's local storage: sk_lang, sk_currency and sk_notice. The {{brand}} app uses a strictly necessary session cookie and a security (CSRF) cookie. On the secure checkout page, our payment processor sets its own strictly necessary fraud-prevention cookies. We use no advertising or analytics cookies, and our fonts are self-hosted. See our <a href="{{url:cookie-policy}}">Cookie Policy</a> for details.</p>

<h2 id="changes">17. Changes to this policy</h2>
<p>We may update this policy to reflect changes to the Service, our practices or the law. When we do, we will post the new version on this page and update the "Last updated" date. If a change is material, we will also notify account holders by e-mail before it takes effect.</p>

<h2 id="contact-us">18. Contact us</h2>
<p>For privacy questions or requests, e-mail <a href="mailto:{{email}}">{{email}}</a> with the subject "Privacy request". We give a first reply within 1 business day, and we respond fully within 30 days. You can also use our <a href="{{url:contact}}">contact page</a>.</p>
{{companyBlock}}
`;

const refundPolicy = `
<h2 id="our-guarantee">1. Our guarantee</h2>
<div class="callout">
<p><strong>30-Day Money-Back Guarantee — Full refund on unused credits. No questions asked.</strong></p>
<p>Every {{brand}} payment, including your first payment and every renewal, can be refunded in full within 30 days of the charge date.</p>
</div>
<p>We want you to pay for {{brand}} only if it works for your team. This Refund Policy explains how our guarantee works, how to ask for a refund and how long it takes. It forms part of our <a href="{{url:terms-of-service}}">Terms of Service</a>.</p>

<h2 id="unused-credits">2. What "unused credits" means</h2>
<p>When you pay for {{brand}}, you are prepaying for subscription time: 1, 3, 12, 24 or 36 months, depending on your plan. That prepaid subscription time is your credit. If you ask within 30 days of the charge date, we refund the <strong>full amount</strong> of the payment. We do not pro-rate the refund or deduct the days you have already used.</p>

<h2 id="eligibility">3. Which payments are covered</h2>
<p>The guarantee covers:</p>
<ul>
<li>your first payment, including the charge made when your 1-hour free trial ends;</li>
<li>every renewal payment, on every plan; and</li>
<li>payments in both US dollars (USD) and Japanese yen (JPY).</li>
</ul>
<p>The guarantee applies to all of our plans:</p>
{{priceTable}}
<p>The only condition is timing: you must ask within 30 days of the charge date. You do not need to give a reason, and we will not ask for one. We may ask for details that help us find the payment, such as the charge date and amount or the last 4 digits of the card.</p>

<h2 id="trial-charges">4. Free trial charges</h2>
<p>Every plan starts with a 1-hour free trial. Nothing is charged at sign-up (US$0 / ¥0). Your card issuer may show a temporary authorization hold. That hold is not a charge and is released automatically, so there is nothing to refund. Exactly 1 hour after your trial starts, the full price of the plan you selected is charged, unless you cancel before the hour ends.</p>
<ul>
<li><strong>Cancel in the app before the hour ends</strong> at <strong>Settings → Billing → Cancel trial</strong>, and you are never charged.</li>
<li><strong>Cancelled by e-mail during the trial?</strong> If the hour ran out before we processed your message, we refund that charge in full. You do not need to send a separate refund request.</li>
<li><strong>Forgot to cancel?</strong> The charge after the trial is a normal payment and is covered by the 30-day guarantee. Just ask for a refund as described below.</li>
</ul>

<h2 id="how-to-request">5. How to request a refund</h2>
<ol>
<li><strong>Send your request</strong> in one of two ways:
<ul>
<li>in the app, go to <strong>Settings → Billing → Request refund</strong>; or</li>
<li>e-mail <a href="mailto:{{email}}">{{email}}</a> from your account e-mail address with the subject "Refund request". Include the charge date and amount, or the last 4 digits of the card.</li>
</ul>
</li>
<li><strong>We confirm your request</strong> within 1 business day.</li>
<li><strong>We process your refund</strong> within 3 business days.</li>
<li><strong>Your bank shows the refund</strong>, usually within 5–10 business days.</li>
</ol>
<p>If you can no longer use your account e-mail address, write to us from another address with the details of the charge. We will confirm that you are the account holder before we issue the refund. Never send us your full card number.</p>

<h2 id="timing">6. How long refunds take</h2>
<table>
<thead><tr><th>Step</th><th>Timing</th></tr></thead>
<tbody>
<tr><td>We confirm your request</td><td>Within 1 business day</td></tr>
<tr><td>We process your refund</td><td>Within 3 business days</td></tr>
<tr><td>The refund appears on your statement</td><td>Usually 5–10 business days after processing, depending on your bank</td></tr>
</tbody>
</table>
<p>Our business days are Monday to Friday, excluding Japanese public holidays. Our support hours are 9:00–18:00 JST (UTC+9). The 30-day window is counted in calendar days from the charge date, and any request we receive on or before the 30th day qualifies.</p>

<h2 id="method-and-currency">7. Refund method and currency</h2>
<p>Refunds go back to the <strong>original payment method</strong> in the <strong>original currency</strong>. We refund the full amount we charged, and because taxes are included in our prices, that includes tax. We cannot send a refund to a different card or account, or in a different currency.</p>
<p>If your card is in a different currency from your payment, your bank converts the refund. The exchange rate may differ from the one used for the original charge, so the amount in your own currency may differ slightly. Any foreign-transaction fees are set by your bank and are outside our control. If the original card has been closed or replaced, your bank will usually pass the refund to your new card or account. Your bank can confirm this for you.</p>

<h2 id="effect-on-subscription">8. What happens to your subscription</h2>
<p>When a payment is refunded, the related subscription is cancelled and <strong>access ends at that time</strong>. No further renewals are charged. Your workspace data is kept for 30 days after the subscription ends so you can export it or reactivate. After that, it is permanently deleted.</p>
<p>If you only want to stop future renewals and keep using {{brand}} until the end of the period you paid for, cancel instead of asking for a refund. Our <a href="{{url:cancellation-policy}}">Cancellation Policy</a> explains how.</p>

<h2 id="after-30-days">9. After 30 days</h2>
<p>More than 30 days after the charge date, payments are not refundable, except where the law requires otherwise, for charges made in error by us (such as duplicate charges), which we always refund in full, or if we stop offering {{brand}} entirely, in which case we refund the prepaid fees for the unused part of your billing period (see our <a href="{{url:terms-of-service}}">Terms of Service</a>). You can still cancel at any time to stop future renewals, and you keep access until the end of the period you paid for. For plans of 12 months or longer, we e-mail you a reminder 7 days before each renewal. Each renewal payment is then covered by its own 30-day guarantee.</p>

<h2 id="statutory-rights">10. Your legal rights</h2>
<p>This guarantee is in addition to your rights under the law, and nothing in this policy limits mandatory consumer rights. For example, consumers in the European Union and the United Kingdom may have a legal right to withdraw from a contract for digital services within 14 days. Our 30-day guarantee gives you longer. Customers in Japan can find the information required under the Act on Specified Commercial Transactions on our <a href="{{url:commerce-disclosure}}">Commerce Disclosure</a> page.</p>

<h2 id="chargebacks">11. Chargebacks and payment disputes</h2>
<p>Please contact us before you file a chargeback. We resolve billing issues quickly, and a refund from us is usually much faster than a dispute through your bank. If you see a charge you do not recognize, check for the statement descriptor below and ask colleagues whether someone signed up for {{brand}} for your business. Then e-mail us and we will help.</p>

<h2 id="statement-descriptor">12. How charges appear on your statement</h2>
<p>{{brand}} charges and refunds appear on your card statement as <strong>{{descriptor}}</strong>. At sign-up, you may also see a temporary authorization hold from your card issuer. It is released automatically.</p>

<h2 id="contact-us">13. Contact us</h2>
<p>For refund or billing questions, e-mail <a href="mailto:{{email}}">{{email}}</a>. We give a first reply within 1 business day (Monday to Friday, 9:00–18:00 JST, except Japanese public holidays), in English or Japanese.</p>
{{companyBlock}}
`;

const cancellationPolicy = `
<h2 id="summary">1. Summary</h2>
<div class="callout">
<p><strong>Cancel any time, with no fees.</strong> You can cancel in the app or by e-mail. If you cancel during the 1-hour free trial, you are never charged. If you cancel a paid subscription, it does not renew, and you keep access until the end of the period you paid for. Your data is kept for 30 days after the subscription ends, so you can export it or come back.</p>
</div>
<p>This Cancellation Policy explains how to cancel a {{brand}} trial or subscription and what happens next. It forms part of our <a href="{{url:terms-of-service}}">Terms of Service</a>.</p>

<h2 id="cancel-free-trial">2. Cancelling during the free trial</h2>
<p>Every plan starts with a 1-hour free trial. Nothing is charged at sign-up (US$0 / ¥0). Exactly 1 hour after the trial starts, the full price of the plan you selected is charged to your card, unless you cancel before the hour ends.</p>
<ol>
<li>Sign in to {{brand}}.</li>
<li>Go to <strong>Settings → Billing → Cancel trial</strong>.</li>
<li>Your trial is cancelled instantly. You are not charged, and you receive a cancellation confirmation by e-mail.</li>
</ol>
<p>If your card issuer placed a temporary authorization hold when you signed up, it is released automatically.</p>
<p>Cancelling in the app takes effect immediately, so it is the safest way to cancel during the trial. If you e-mail us to cancel during the trial and the hour runs out before we process your message, we will refund that charge in full.</p>

<h2 id="cancel-subscription">3. Cancelling a paid subscription</h2>
<h3>In the app</h3>
<ol>
<li>Sign in to {{brand}}.</li>
<li>Go to <strong>Settings → Billing → Cancel subscription</strong> and confirm.</li>
<li>We e-mail your cancellation confirmation immediately.</li>
</ol>
<h3>By e-mail</h3>
<p>Send an e-mail to <a href="mailto:{{email}}">{{email}}</a> from your account e-mail address with the subject "Cancel subscription". We process e-mail requests during support hours (Monday to Friday, 9:00–18:00 JST, except Japanese public holidays) and confirm by e-mail. To be sure your cancellation takes effect before your renewal date, cancel in the app or e-mail us well before that date. If a renewal is charged before we can process your e-mail, it is covered by our 30-day money-back guarantee.</p>

<h2 id="when-it-takes-effect">4. When cancellation takes effect</h2>
<p>Cancellation stops all future renewals straight away. You keep full access until the end of the billing period you have already paid for, and then your subscription ends. Cancelling does not, by itself, refund the current period. If your most recent payment was made within the last 30 days, you can also ask for a full refund (see Section 10).</p>

<h2 id="no-fees">5. No cancellation fees</h2>
<p>There is no cancellation fee and no early-termination charge on any plan, whatever its length. You will never be charged for cancelling.</p>

<h2 id="automatic-renewal">6. Automatic renewal and reminders</h2>
<p>Until you cancel, your subscription renews automatically at the end of each billing period, at your current plan's price (if you switch plans in Settings → Billing, the new plan and price apply from your next renewal), and is charged to the card on file. Our plans and prices are:</p>
{{priceTable}}
<ul>
<li>We e-mail a receipt for every charge.</li>
<li>For plans of 12 months or longer (Annual, 2-Year and 3-Year), we send a renewal reminder e-mail 7 days before the renewal date.</li>
<li>We announce any price change by e-mail at least 30 days in advance. The new price applies only from your next renewal, so you can cancel before then.</li>
<li>To avoid the next renewal, cancel at any time before the renewal date.</li>
</ul>

<h2 id="confirmation">7. Cancellation confirmation</h2>
<p>We e-mail a cancellation confirmation to your account e-mail address immediately. Keep it for your records. If you do not see it, check your spam or junk folder. If it is not there either, contact us so we can confirm that your cancellation went through.</p>

<h2 id="your-data">8. What happens to your data</h2>
<ul>
<li>You can <strong>export</strong> your data to CSV or Excel at any time, including hours for payroll.</li>
<li>After your subscription ends, we keep your workspace data for <strong>30 days</strong> so you can reactivate or export it.</li>
<li>After those 30 days, your workspace data is <strong>permanently deleted</strong> and cannot be recovered.</li>
<li>We keep billing records for as long as tax law requires (up to 7 years), as our <a href="{{url:privacy-policy}}">Privacy Policy</a> explains.</li>
</ul>

<h2 id="reactivation">9. Reactivating your subscription</h2>
<ul>
<li><strong>Before your paid period ends:</strong> if you cancelled by mistake, contact us and we will help you keep your subscription running.</li>
<li><strong>Within 30 days after it ends:</strong> your workspace data is still there. Sign in and start a new subscription, or e-mail us and we will help. A new billing period starts at the current price of the plan you choose. One free trial is available per customer and per business, so reactivating does not include a new trial.</li>
<li><strong>More than 30 days after it ends:</strong> your previous workspace data has been deleted, but you are welcome to start a new subscription.</li>
</ul>

<h2 id="cancellation-and-refunds">10. Cancellation and refunds</h2>
<p>Cancelling and getting a refund are two different things:</p>
<table>
<thead><tr><th>Topic</th><th>Cancel subscription</th><th>Request refund</th></tr></thead>
<tbody>
<tr><td>Where</td><td>Settings → Billing → Cancel subscription, or e-mail with the subject "Cancel subscription"</td><td>Settings → Billing → Request refund, or e-mail with the subject "Refund request"</td></tr>
<tr><td>Money back</td><td>No. You keep the time you paid for</td><td>Yes, in full, for payments made in the last 30 days</td></tr>
<tr><td>Access</td><td>Continues until the end of the paid period</td><td>Ends when the payment is refunded</td></tr>
<tr><td>Future renewals</td><td>Stopped</td><td>Stopped, because the subscription is cancelled</td></tr>
</tbody>
</table>
<p>For details, see our <a href="{{url:refund-policy}}">Refund Policy</a>.</p>

<h2 id="cancellation-by-us">11. When we may end a subscription</h2>
<p>In limited cases, such as a material breach of our Terms, a payment that is not completed or a legal requirement, we may suspend or end a subscription as our <a href="{{url:terms-of-service}}">Terms of Service</a> describe. If we ever stop offering {{brand}} entirely, we will give you at least 30 days' notice by e-mail so you can export your data, and we will refund any prepaid fees for the unused part of your billing period.</p>

<h2 id="contact-us">12. Contact us</h2>
<p>If you need help cancelling, e-mail <a href="mailto:{{email}}">{{email}}</a>. We give a first reply within 1 business day (Monday to Friday, 9:00–18:00 JST, except Japanese public holidays), in English or Japanese.</p>
{{companyBlock}}
`;

const shippingPolicy = `
<h2 id="overview">1. Overview</h2>
<div class="callout">
<p><strong>{{brand}} is a digital service. Nothing is shipped.</strong> Your account is activated immediately after checkout, and a confirmation e-mail with your login link arrives within 5 minutes. There are no shipping fees.</p>
</div>
<p>This policy explains how {{company}} ("{{brand}}", "we", "us") delivers the {{brand}} employee scheduling service, and what to do if something does not arrive as expected.</p>

<h2 id="what-you-receive">2. What you receive</h2>
<p>When you start a trial or buy a subscription, you get online access to the {{brand}} web app for one workspace. Every plan includes every feature, unlimited employees, unlimited locations and unlimited schedules. Your staff use {{brand}} from any phone browser, so there is nothing to install or download.</p>

<h2 id="no-physical-shipping">3. No physical goods and no shipping fees</h2>
<p>We do not ship any physical goods. No boxes, discs, devices or printed materials are sent. Because nothing is shipped:</p>
<ul>
<li>there are no shipping, handling or delivery fees;</li>
<li>there are no customs duties or import charges from us; and</li>
<li>you do not need to give us a shipping address.</li>
</ul>
<p>The price shown is the total price for each billing period, and any applicable taxes are included. See our <a href="{{url:pricing}}">Pricing</a> page for current plans.</p>

<h2 id="when-access-starts">4. When access starts</h2>
<p>Your account is activated <strong>immediately</strong> after checkout, so you can start building schedules straight away. Every plan begins with a 1-hour free trial. Nothing is charged at sign-up (US$0 / ¥0). Exactly 1 hour after the trial starts, the full price of the plan you selected is charged, unless you cancel before the hour ends at <strong>Settings → Billing → Cancel trial</strong>.</p>

<h2 id="confirmation-email">5. Your confirmation e-mail</h2>
<p>Within <strong>5 minutes</strong> of checkout, we send a confirmation e-mail with your login link to the e-mail address you entered. Keep this e-mail. It confirms your plan and tells you how to sign in.</p>

<h2 id="not-received">6. If your confirmation e-mail has not arrived</h2>
<ol>
<li>Check your spam, junk and promotions folders.</li>
<li>Search your inbox for "{{domain}}".</li>
<li>Check that the e-mail address you entered at checkout was spelled correctly.</li>
<li>If the e-mail has still not arrived <strong>within 1 hour</strong>, contact <a href="mailto:{{email}}">{{email}}</a> with your name and the e-mail address you used at checkout. Please never send us your full card number.</li>
</ol>
<p>We will confirm your account and resend your login link. Our first reply arrives within 1 business day.</p>

<h2 id="where-available">7. Where the Service is available</h2>
<p>{{brand}} is available worldwide, wherever we can lawfully provide the Service. You can pay in US dollars (USD) or Japanese yen (JPY), and each user can choose English or Japanese for the interface. We may be unable to provide the Service in places where sanctions or other laws prohibit it.</p>

<h2 id="receipts-and-billing-emails">8. Receipts and billing e-mails</h2>
<p>All billing documents are delivered electronically to your account e-mail address:</p>
<ul>
<li>a <strong>receipt</strong> for every charge, including the first charge after your trial and every renewal;</li>
<li>a <strong>renewal reminder</strong> 7 days before renewal, for plans of 12 months or longer;</li>
<li><strong>cancellation confirmations</strong>, sent immediately; and</li>
<li><strong>refund confirmations</strong>.</li>
</ul>
<p>If you need a receipt sent again, e-mail <a href="mailto:{{email}}">{{email}}</a> from your account e-mail address.</p>

<h2 id="ongoing-delivery">9. Ongoing access to the Service</h2>
<p>Your subscription gives you continuous online access for the billing period you paid for, and it renews automatically until you cancel. We work to keep the Service available around the clock. Planned maintenance and other availability matters are covered in our <a href="{{url:terms-of-service}}">Terms of Service</a>.</p>

<h2 id="delivery-problems">10. Delivery problems and refunds</h2>
<p>If you cannot access the Service after checkout, contact us and we will fix it quickly. Every payment is also covered by our 30-Day Money-Back Guarantee — Full refund on unused credits. No questions asked. See our <a href="{{url:refund-policy}}">Refund Policy</a> for details. Charges appear on your card statement as <strong>{{descriptor}}</strong>.</p>

<h2 id="contact-us">11. Contact us</h2>
<p>For questions about access or delivery, e-mail <a href="mailto:{{email}}">{{email}}</a>. Support hours are Monday to Friday, 9:00–18:00 JST (UTC+9), except Japanese public holidays, in English and Japanese.</p>
{{companyBlock}}
`;

const cookiePolicy = `
<h2 id="about-this-policy">1. About this policy</h2>
<p>This Cookie Policy explains how {{company}} ("{{brand}}", "we", "us") uses cookies and similar technologies on {{domain}} and in the {{brand}} app.</p>
<div class="callout">
<p><strong>No tracking.</strong> We use only strictly necessary cookies and browser storage: to remember your preferences, to keep you signed in and to keep payments and accounts secure. We use no advertising or analytics cookies.</p>
</div>

<h2 id="what-are-cookies">2. What cookies and local storage are</h2>
<p><strong>Cookies</strong> are small text files that a website saves in your browser and that are sent back to the site on later requests. <strong>Local storage</strong> is a similar browser feature that lets a website save small pieces of information on your device. Unlike cookies, information in local storage is not sent to the website's servers with every request. Both can be strictly necessary for a site to work, or they can be used for things like analytics and advertising. We use them only for strictly necessary purposes.</p>

<h2 id="what-we-use">3. Exactly what we use</h2>
<table>
<thead><tr><th>Name</th><th>Where</th><th>Purpose</th><th>Type</th><th>Duration</th></tr></thead>
<tbody>
<tr><td>sk_lang</td><td>Website (local storage)</td><td>Remembers your language (English or Japanese)</td><td>Strictly necessary preference</td><td>Until you clear your browser's site data</td></tr>
<tr><td>sk_currency</td><td>Website (local storage)</td><td>Remembers the currency (USD or JPY) shown on pricing pages</td><td>Strictly necessary preference</td><td>Until you clear your browser's site data</td></tr>
<tr><td>sk_notice</td><td>Website (local storage)</td><td>Remembers that you dismissed the cookie notice, so it is not shown again</td><td>Strictly necessary preference</td><td>Until you clear your browser's site data</td></tr>
<tr><td>sk_session</td><td>{{brand}} app (cookie)</td><td>Keeps you signed in during your session</td><td>Strictly necessary</td><td>Session: until you sign out or the session ends</td></tr>
<tr><td>sk_csrf</td><td>{{brand}} app (cookie)</td><td>Protects your account against cross-site request forgery (CSRF) attacks</td><td>Strictly necessary (security)</td><td>Session: until the session ends</td></tr>
<tr><td>Payment processor cookies</td><td>Secure checkout page</td><td>Fraud prevention and payment security, set by our payment processor</td><td>Strictly necessary (security)</td><td>Set by the payment processor</td></tr>
</tbody>
</table>
<p>We use nothing else. The table above is the complete list.</p>

<h2 id="website-storage">4. Our marketing website</h2>
<p>On {{domain}}, we store only the three preference keys listed above (sk_lang, sk_currency and sk_notice) in your browser's local storage. They stay on your device. We do not use them to identify you or to track you across pages or across other websites.</p>

<h2 id="app-cookies">5. The {{brand}} app</h2>
<p>When you sign in to the {{brand}} app, we set two strictly necessary cookies. The session cookie (sk_session) keeps you signed in, and the CSRF cookie (sk_csrf) protects your account from forged requests. Without them, you could not sign in or use the app securely.</p>

<h2 id="payment-processor-cookies">6. Payment processor cookies</h2>
<p>Payments are handled by a PCI DSS Level 1 certified payment processor. On the secure checkout page, the payment processor sets its own strictly necessary cookies to prevent fraud and keep payments secure. Those cookies are controlled by the payment processor and governed by its own privacy notice.</p>

<h2 id="no-analytics-or-advertising">7. No analytics, advertising or third-party tracking</h2>
<ul>
<li>We do not use advertising cookies or analytics cookies.</li>
<li>We do not use tracking pixels, social media tracking plugins or cross-site tracking.</li>
<li>Our fonts are self-hosted, so your browser makes no requests to third-party font services when you visit our website.</li>
<li>We do not sell personal information, and we do not share it for cross-context behavioral advertising. See <a href="{{url:do-not-sell-or-share}}">Do Not Sell or Share My Personal Information</a>.</li>
</ul>

<h2 id="consent">8. Why we do not ask for cookie consent</h2>
<p>Under laws such as the EU ePrivacy rules and the UK's Privacy and Electronic Communications Regulations, cookies and storage that are strictly necessary to provide a service you have asked for do not require consent. Everything we use falls into that category. Our cookie notice is there to inform you, not to ask for permission. If we ever introduce non-essential cookies, we will ask for your consent first and update this policy.</p>

<h2 id="how-to-control">9. How to control cookies and local storage</h2>
<p>You can view and delete cookies and local storage at any time in your browser's settings. Most browsers keep these under privacy or site data settings. You can also block cookies entirely. Please note:</p>
<ul>
<li>if you clear local storage, the website forgets your language and currency choices and shows the cookie notice again;</li>
<li>if you block or delete the app's cookies, you will be signed out and will not be able to sign in to the app; and</li>
<li>if you block the payment processor's cookies, the checkout may not be able to complete your payment.</li>
</ul>
<p>Our website and app honor Global Privacy Control signals, as our <a href="{{url:privacy-policy}}">Privacy Policy</a> explains. Because we do not track you, Do Not Track signals do not change how our website works.</p>

<h2 id="changes">10. Changes to this policy</h2>
<p>If we change the cookies or storage we use, we will update the table above and the "Last updated" date on this page before the change takes effect.</p>

<h2 id="contact-us">11. Contact us</h2>
<p>If you have questions about cookies or browser storage, e-mail <a href="mailto:{{email}}">{{email}}</a>.</p>
{{companyBlock}}
`;

const accessibility = `
<h2 id="our-commitment">1. Our commitment</h2>
<p>{{company}} ("{{brand}}", "we", "us") wants everyone to be able to use {{brand}}, including managers and staff with disabilities. Scheduling affects people's working lives, so it matters that everyone can read their schedule, give their availability and request time off.</p>
<div class="callout">
<p><strong>Our target is WCAG 2.1 Level AA.</strong> If anything on {{domain}} or in the {{brand}} app is hard for you to use, e-mail <a href="mailto:{{email}}">{{email}}</a> with the subject "Accessibility". We reply within 5 business days.</p>
</div>

<h2 id="conformance-target">2. Our standard</h2>
<p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, hearing, motor and cognitive disabilities. We check our pages against these criteria and fix the issues we find. Where part of our website does not yet fully meet the standard, we list it in Section 6.</p>

<h2 id="measures-taken">3. What we do</h2>
<ul>
<li><strong>Keyboard navigation.</strong> You can reach and use all navigation, links, buttons and forms with a keyboard alone.</li>
<li><strong>Skip link.</strong> Each page starts with a "skip to main content" link, so keyboard and screen reader users can bypass repeated navigation.</li>
<li><strong>Visible focus.</strong> The element that has keyboard focus is always clearly highlighted.</li>
<li><strong>Sufficient contrast.</strong> Text and important interface elements meet WCAG contrast requirements.</li>
<li><strong>Reduced motion.</strong> If your device is set to reduce motion (prefers-reduced-motion), we reduce or remove animations.</li>
<li><strong>Text alternatives.</strong> Images that convey information have text alternatives, and decorative images are hidden from assistive technologies.</li>
<li><strong>Declared language.</strong> Each page declares its language (English or Japanese), so screen readers use the correct pronunciation.</li>
<li><strong>Structure.</strong> We use headings, lists, tables and landmarks so that pages are easy to navigate with assistive technologies.</li>
</ul>

<h2 id="compatibility">4. Compatibility</h2>
<p>{{brand}} is designed to work with:</p>
<ul>
<li>recent versions of <strong>Chrome, Edge, Firefox and Safari</strong>, on desktop and on mobile; and</li>
<li>common screen readers, including <strong>VoiceOver</strong> (macOS and iOS), <strong>NVDA</strong> and <strong>JAWS</strong> (Windows).</li>
</ul>
<p>Older browsers and assistive technologies may not display all content correctly.</p>

<h2 id="technical-specifications">5. Technologies we rely on</h2>
<p>Accessibility on {{domain}} relies on HTML, CSS and JavaScript working with your web browser and any assistive technologies or plugins installed on your device.</p>

<h2 id="known-limitations">6. Known limitations</h2>
<ul>
<li><strong>Interactive schedule demo.</strong> The interactive schedule demo on our <a href="{{url:home}}">home page</a> is a visual illustration of how a schedule looks in {{brand}}. The same information is given in text on the page, so you do not need the demo to understand what {{brand}} does.</li>
<li><strong>Third-party checkout.</strong> The secure checkout page is provided by our payment processor, and we do not fully control its accessibility. If you have trouble paying, contact us and we will work with you to resolve it.</li>
<li><strong>Customer-created content.</strong> Shift names, notes and other content that customers enter into their workspaces are written by those customers, and their accessibility is outside our control.</li>
</ul>
<p>We are working to reduce these limitations. If you find any issue not listed here, please tell us.</p>

<h2 id="feedback">7. Feedback and contact</h2>
<p>We welcome your feedback on the accessibility of {{brand}}. Please e-mail <a href="mailto:{{email}}">{{email}}</a> with the subject "Accessibility" and include:</p>
<ul>
<li>the web address (URL) or the part of the app where you had the problem;</li>
<li>what you were trying to do and what happened; and</li>
<li>the browser and any assistive technology you were using, if you know them.</li>
</ul>
<p>We reply within <strong>5 business days</strong> (Monday to Friday, excluding Japanese public holidays). We will tell you how we plan to fix the problem, and we will help you get the information or complete the task in the meantime.</p>

<h2 id="alternative-formats">8. Alternative formats</h2>
<p>If you need information from our website or any of our policies in a different format, such as plain text or large print, please ask. Contact us at <a href="mailto:{{email}}">{{email}}</a> with the subject "Accessibility", and we will provide it as quickly as we reasonably can.</p>

<h2 id="assessment">9. How we assessed accessibility</h2>
<p>This statement is based on a <strong>self-assessment</strong> carried out by our own team, using keyboard-only testing, screen reader checks and reviews against the WCAG 2.1 Level AA success criteria. It was last reviewed on <strong>{{updated}}</strong>. We review it whenever we make significant changes to our website or app.</p>

<h2 id="ongoing-improvement">10. Ongoing improvement</h2>
<p>Accessibility is part of how we design and build {{brand}}, not a one-time project. We consider accessibility when we design new features, test changes before release and act on feedback from our users.</p>

<h2 id="contact-us">11. Contact us</h2>
<p>For accessibility questions or requests, e-mail <a href="mailto:{{email}}">{{email}}</a> with the subject "Accessibility".</p>
{{companyBlock}}
`;

const dmca = `
<h2 id="our-approach">1. Our approach</h2>
<p>{{company}} ("{{brand}}", "we", "us") respects the intellectual property rights of others, and we expect our customers and users to do the same. This policy explains how to tell us about material you believe infringes your copyright, how users can respond, and how we handle repeat infringers. We follow the notice-and-takedown process of the US Digital Millennium Copyright Act (DMCA), 17 U.S.C. § 512.</p>
<div class="callout">
<p><strong>To report infringement,</strong> e-mail <a href="mailto:{{email}}">{{email}}</a> with the subject "Copyright / DMCA notice" and include the information listed in Section 3.</p>
</div>

<h2 id="scope">2. What this policy covers</h2>
<p>This policy covers content on our website at {{domain}} and content stored in or shared through the {{brand}} Service, including content that customers and their users put into their workspaces.</p>

<h2 id="filing-a-notice">3. How to file a copyright notice</h2>
<p>If you believe that material available through {{brand}} infringes a copyright you own or are authorized to represent, send us a written notice. Under 17 U.S.C. § 512(c)(3), your notice must include:</p>
<ol>
<li>a physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that is allegedly infringed;</li>
<li>identification of the copyrighted work claimed to have been infringed or, if a single notice covers multiple works, a representative list of those works;</li>
<li>identification of the material that is claimed to be infringing and that is to be removed or disabled, with information reasonably sufficient for us to locate it (for example, the exact web address);</li>
<li>information reasonably sufficient for us to contact you, such as your name, address, telephone number and e-mail address;</li>
<li>a statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; and</li>
<li>a statement that the information in the notice is accurate and, under penalty of perjury, that you are authorized to act on behalf of the owner of the exclusive right that is allegedly infringed.</li>
</ol>
<p>A notice that does not substantially include these elements may not be valid, and we may ask you for the missing information.</p>

<h2 id="where-to-send">4. Where to send your notice</h2>
<p>Send your notice by e-mail to <a href="mailto:{{email}}">{{email}}</a> with the subject <strong>"Copyright / DMCA notice"</strong>, or by post to our designated agent for copyright notices under 17 U.S.C. § 512(c)(2):</p>
{{dmcaAgent}}
<p>Please send only copyright-related notices to us under this heading. For other questions, use our <a href="{{url:contact}}">contact page</a>.</p>

<h2 id="after-a-notice">5. What happens after we receive a notice</h2>
<p>When we receive a valid notice, we act promptly to remove or disable access to the material identified. Where possible, we notify the user or customer who provided the material, and we include a copy of the notice. We may share your notice, including your contact details, with that user so they can respond.</p>

<h2 id="counter-notice">6. How to file a counter-notice</h2>
<p>If material you provided was removed or disabled and you believe this was a mistake or misidentification, you can send us a counter-notice. Under 17 U.S.C. § 512(g)(3), your counter-notice must include:</p>
<ol>
<li>your physical or electronic signature;</li>
<li>identification of the material that has been removed or to which access has been disabled, and the location where it appeared before it was removed or disabled;</li>
<li>a statement, under penalty of perjury, that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled; and</li>
<li>your name, address and telephone number, and a statement that you consent to the jurisdiction of the US Federal District Court for the judicial district in which your address is located (or, if your address is outside the United States, any judicial district in which we may be found), and that you will accept service of process from the person who provided the original notice or that person's agent.</li>
</ol>
<p>Send your counter-notice to <a href="mailto:{{email}}">{{email}}</a> with the subject "Copyright / DMCA notice".</p>

<h2 id="restoration">7. Restoring material</h2>
<p>When we receive a valid counter-notice, we forward a copy to the person who filed the original notice. We restore the removed material, or stop disabling access to it, no less than 10 and no more than 14 business days after we receive the counter-notice. We will not restore it if the original complainant first tells us that they have filed a court action seeking to stop the alleged infringement.</p>

<h2 id="repeat-infringers">8. Repeat infringers</h2>
<p>In appropriate circumstances, we suspend or terminate the accounts of users and customers who are repeat infringers. We may also limit access to the Service, or terminate accounts, of users who infringe the intellectual property rights of others, whether or not there is repeat infringement.</p>

<h2 id="misrepresentation">9. Misrepresentation</h2>
<p>Under 17 U.S.C. § 512(f), anyone who knowingly and materially misrepresents that material is infringing, or that material was removed or disabled by mistake or misidentification, may be liable for damages, including costs and attorneys' fees. Before you send a notice or counter-notice, consider whether the use may be authorized or permitted, for example as fair use. If you are unsure, you may wish to consult a lawyer.</p>

<h2 id="non-us-notices">10. Notices from outside the United States</h2>
<p>We accept notices from rights holders anywhere in the world, including notices under laws other than the DMCA. Please give us the same information listed in Section 3 so that we can review and act on your notice.</p>

<h2 id="our-rights">11. Our own copyright and trademarks</h2>
<p>The {{brand}} website, app, software, text, graphics and logos are protected by copyright and other intellectual property laws and are owned by {{company}} or its licensors. "{{brand}}" and our logos are trademarks of {{company}}. You may not copy, reproduce or use them except as our <a href="{{url:terms-of-service}}">Terms of Service</a> allow, or with our prior written permission. If you believe someone is misusing our name or content, please let us know.</p>

<h2 id="contact-us">12. Contact us</h2>
<p>Send copyright notices and counter-notices to <a href="mailto:{{email}}">{{email}}</a> with the subject "Copyright / DMCA notice".</p>
{{companyBlock}}
`;

const disclaimer = `
<h2 id="about-this-disclaimer">1. About this disclaimer</h2>
<p>This Disclaimer applies to the website at {{domain}} and to the {{brand}} Service operated by {{company}} ("{{brand}}", "we", "us"). It should be read together with our <a href="{{url:terms-of-service}}">Terms of Service</a>, and if the two conflict, the Terms of Service prevail.</p>
<div class="callout">
<p><strong>In short:</strong> {{brand}} is a tool that helps you build and manage schedules. It does not give legal, labor-law, tax or payroll advice. You remain responsible for checking your schedules and for complying with the employment laws that apply to your business.</p>
</div>

<h2 id="informational-content">2. Information on our website</h2>
<p>The content on our website, including feature descriptions, guides, articles, examples and support materials, is provided for general information only. We work to keep it accurate and current, but we do not guarantee that it is complete, accurate or up to date at all times. Do not rely on it as the sole basis for business, legal or financial decisions.</p>

<h2 id="not-professional-advice">3. Not legal, labor-law, tax or payroll advice</h2>
<p>Nothing on our website or in the Service is legal, labor-law, tax, accounting or payroll advice. Employment laws differ widely between countries, states, provinces and cities, and they change over time. These laws cover areas such as working hours, rest breaks, overtime, minimum wage, predictive scheduling, record-keeping and the employment of minors. For advice about your own situation, consult a qualified lawyer, accountant or payroll professional.</p>

<h2 id="scheduling-tools-are-aids">4. Scheduling tools are aids, not guarantees</h2>
<p>{{brand}} includes features that help you plan and run your workforce: auto-scheduling, labor-rule checks (such as maximum hours, minimum rest between shifts and overtime limits), overtime alerts and labor cost forecasts. These features:</p>
<ul>
<li>work only with the rules, availability, skills, contracted hours and rates that you enter, so they are only as accurate as that information;</li>
<li>produce <strong>drafts and alerts</strong> for your managers to review. They do not make final decisions;</li>
<li>may not reflect every legal requirement, collective agreement or company policy that applies to you; and</li>
<li>do not guarantee that a schedule complies with any law.</li>
</ul>

<h2 id="your-responsibility">5. Your responsibility for compliance</h2>
<p>As the employer, you remain responsible for complying with all employment, labor, wage-and-hour, health-and-safety and anti-discrimination laws that apply to your business. That includes:</p>
<ul>
<li>setting up labor rules in {{brand}} that reflect your legal obligations;</li>
<li>reviewing each schedule before you publish it;</li>
<li>approving or rejecting time-off requests, shift swaps and open-shift claims; and</li>
<li>keeping the employment records the law requires.</li>
</ul>

<h2 id="accuracy-of-exports">6. Time records, labor costs and payroll exports</h2>
<p>Timesheets, clock-in and clock-out records, labor cost figures and CSV or Excel exports are based on the data entered by you and your staff. Before you run payroll, review exported hours and totals, check them against your records, and correct any errors in clock-in times or rates. We are not responsible for payroll errors caused by inaccurate or incomplete data. Labor cost forecasts are estimates, and actual costs may differ.</p>

<h2 id="no-warranties">7. No warranties</h2>
<p>To the maximum extent permitted by law, the website and the Service are provided "as is" and "as available", without warranties of any kind, express or implied. This includes warranties of merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the Service will be uninterrupted or error-free, or that it will meet every requirement of your business. Some jurisdictions do not allow certain warranties to be excluded. Where that is the case, this section applies only as far as the law allows.</p>

<h2 id="external-links">8. Links to other websites</h2>
<p>Our website and the Service may link to third-party websites and resources, such as official government labor information. We provide these links for convenience only. We do not control and are not responsible for their content, accuracy, availability or privacy practices, and a link does not mean we endorse them.</p>

<h2 id="examples-and-testimonials">9. Examples, illustrations and testimonials</h2>
<p>Sample schedules, names, businesses, figures and screenshots on our website are illustrative only. Any people or businesses shown in examples are fictional unless we say otherwise. Customer comments and results reflect individual experiences and are not a promise that you will get the same results. Time savings and cost reductions depend on how you use the Service and on your business.</p>

<h2 id="limitation-of-liability">10. Limitation of liability</h2>
<p>To the maximum extent permitted by law, {{company}} is not liable for any loss or damage arising from your reliance on information on our website, or from scheduling, staffing or pay decisions you make using the Service. Our total liability is limited as set out in our <a href="{{url:terms-of-service}}">Terms of Service</a>, to the fees you paid us for the Service in the 12 months before the claim arose. Nothing in this Disclaimer limits liability that cannot be limited under applicable law, or your mandatory rights as a consumer.</p>

<h2 id="changes">11. Changes to this disclaimer</h2>
<p>We may update this Disclaimer from time to time. The "Last updated" date at the top of this page shows when it last changed.</p>

<h2 id="contact-us">12. Contact us</h2>
<p>If you have questions about this Disclaimer, e-mail <a href="mailto:{{email}}">{{email}}</a>.</p>
{{companyBlock}}
`;

const doNotSellOrShare = `
<h2 id="our-commitment">1. Our commitment</h2>
<div class="callout">
<p><strong>We do not sell or share your personal information.</strong> {{company}} ("{{brand}}", "we", "us") does not sell personal information and does not share it for cross-context behavioral advertising. We have not done either in the past 12 months. You do not need to do anything to opt out, but you are welcome to send us a request anyway.</p>
</div>
<p>This page explains your right to opt out under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (CCPA), and similar laws in other US states. It supplements our <a href="{{url:privacy-policy}}">Privacy Policy</a>.</p>

<h2 id="what-sell-and-share-mean">2. What "sell" and "share" mean</h2>
<p>Under the CCPA, to <strong>"sell"</strong> personal information means to disclose or make it available to a third party for money or other valuable consideration. To <strong>"share"</strong> personal information means to disclose or make it available to a third party for <strong>cross-context behavioral advertising</strong>, whether or not money changes hands. Cross-context behavioral advertising means ads targeted to you based on your activity across other businesses' websites, apps or services.</p>

<h2 id="what-we-do">3. What we do, and do not do</h2>
<ul>
<li>We do not sell personal information to anyone.</li>
<li>We do not share personal information for cross-context behavioral advertising.</li>
<li>We use no advertising cookies, analytics cookies, tracking pixels or third-party tracking on our website.</li>
<li>We disclose personal information only to service providers that help us run {{brand}}: cloud hosting, payment processing, transactional e-mail and customer support tooling. They act under contract and may use it only to provide services to us.</li>
<li>We have no actual knowledge of selling or sharing the personal information of consumers under 16.</li>
</ul>
<p>Our <a href="{{url:cookie-policy}}">Cookie Policy</a> lists every cookie and storage key we use.</p>

<h2 id="global-privacy-control">4. Global Privacy Control</h2>
<p>We honor the Global Privacy Control (GPC) automatically. If your browser sends a GPC signal, we treat it as a valid request to opt out of the sale and sharing of your personal information. The request covers that browser and any account we can associate with it. You do not need to do anything else. Because we already do not sell or share personal information, the website and the Service continue to work exactly the same.</p>

<h2 id="submit-a-request">5. How to submit an opt-out or privacy request</h2>
<p>Although we do not sell or share personal information, you can still send us an opt-out request, for example to make sure it is on record:</p>
<ol>
<li>E-mail <a href="mailto:{{email}}">{{email}}</a> with the subject <strong>"Do Not Sell or Share"</strong>.</li>
<li>Include your name and the e-mail address associated with your {{brand}} account, if you have one.</li>
<li>We confirm receipt and act on your request.</li>
</ol>
<p>You can also use this address to exercise your other privacy rights: to know and access, delete or correct your personal information, or to limit the use of sensitive personal information. Our <a href="{{url:privacy-policy}}">Privacy Policy</a> describes these rights in full.</p>

<h2 id="verification">6. Verifying your request</h2>
<p>Opt-out requests do not require identity verification. For requests to know, delete or correct personal information, we verify your identity before acting to protect your information, usually by confirming that you control the e-mail address linked to your account. We may ask for more information if needed, and we use it only to verify your request.</p>

<h2 id="authorized-agents">7. Authorized agents</h2>
<p>You may use an authorized agent to submit a request on your behalf. The agent must give us proof of your signed, written permission, or a valid power of attorney. For requests to know, delete or correct, we may also ask you to verify your identity directly with us.</p>

<h2 id="response-times">8. How quickly we respond</h2>
<table>
<thead><tr><th>Request</th><th>Our response</th></tr></thead>
<tbody>
<tr><td>Opt out of sale or sharing (including by e-mail)</td><td>Acted on within 15 business days</td></tr>
<tr><td>Global Privacy Control signal</td><td>Honored automatically</td></tr>
<tr><td>Know, access, delete or correct, and limit sensitive personal information</td><td>We reply within 30 days, well within the 45 days the CCPA allows</td></tr>
</tbody>
</table>

<h2 id="sensitive-personal-information">9. Sensitive personal information</h2>
<p>We use sensitive personal information, such as the account log-in information used to access {{brand}}, only for purposes the CCPA regulations permit, such as providing the Service and keeping it secure. We do not use it to infer characteristics about you.</p>

<h2 id="non-discrimination">10. Non-discrimination</h2>
<p>We will never discriminate against you for using your privacy rights. We will not deny you the Service, charge you a different price, or give you a different level or quality of service because you made a request.</p>

<h2 id="employee-data">11. Information held for employers</h2>
<p>If your employer uses {{brand}} to schedule your shifts, we process your information as a service provider on your employer's behalf. We do not sell or share that information either. For requests about information your employer has entered, contact your employer directly. If you contact us, we will pass your request on and help them respond.</p>

<h2 id="other-states">12. Residents of other US states</h2>
<p>Residents of Virginia, Colorado, Connecticut, Utah, Texas, Oregon and other states with comprehensive privacy laws have similar rights. Where those laws apply to us, they include the right to opt out of the sale of personal information, targeted advertising and certain profiling, and the rights to access, correct, delete and obtain a copy of personal information. We do not sell personal information, engage in targeted advertising or carry out profiling that produces legal or similarly significant effects. You can send an opt-out request as described in Section 5, and any other request by e-mail with the subject "Privacy request". If we decline your request, you can appeal by replying to our decision with the subject "Privacy appeal". We will respond within the time your state's law requires, and you may contact your state attorney general if you disagree with the outcome.</p>

<h2 id="contact-us">13. Contact us</h2>
<p>For opt-out requests, e-mail <a href="mailto:{{email}}">{{email}}</a> with the subject "Do Not Sell or Share". For access, correction, deletion or other privacy requests, use the subject "Privacy request".</p>
{{companyBlock}}
`;

export default {
  'terms-of-service': {
    title: 'Terms of Service',
    description:
      'The terms for using {{brand}} shift scheduling software: 1-hour free trial, plans and pricing, auto-renewal, cancellation, refunds and data protection.',
    summary:
      'These Terms govern your use of {{brand}}. Every plan starts with a 1-hour free trial, renews automatically until you cancel, and every payment is covered by our 30-day money-back guarantee.',
    body: termsOfService,
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    description:
      'How {{brand}} collects, uses and protects personal information, your rights under GDPR, CCPA and APPI, and why we never sell or share your data.',
    summary:
      'We collect only what we need to run {{brand}}, never sell or share your personal information, and use no advertising or analytics cookies. Businesses control the employee data they put into {{brand}}.',
    body: privacyPolicy,
  },
  'refund-policy': {
    title: 'Refund Policy',
    description:
      '30-Day Money-Back Guarantee: every {{brand}} payment can be refunded in full within 30 days of the charge date, no questions asked. How to request one.',
    summary:
      'Every payment, your first and every renewal, can be refunded in full within 30 days of the charge date, no questions asked. Request it in Settings → Billing → Request refund or by e-mail.',
    body: refundPolicy,
  },
  'cancellation-policy': {
    title: 'Cancellation Policy',
    description:
      'How to cancel your {{brand}} free trial or subscription at any time with no fees, when cancellation takes effect, and what happens to your data afterwards.',
    summary:
      'Cancel any time with no fees, in Settings → Billing or by e-mail. Cancel during the 1-hour trial and you are never charged. Cancel a subscription and you keep access until the end of the paid period.',
    body: cancellationPolicy,
  },
  'shipping-policy': {
    title: 'Shipping & Delivery Policy',
    description:
      '{{brand}} is a digital service, so nothing is shipped and there are no shipping fees. Access starts immediately, with a confirmation e-mail within 5 minutes.',
    summary:
      '{{brand}} is delivered online, so nothing is shipped and there are no shipping fees. Your account is activated immediately after checkout, and your login link arrives by e-mail within 5 minutes.',
    body: shippingPolicy,
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    description:
      'The complete list of cookies and browser storage that {{brand}} uses. All are strictly necessary, with no advertising, analytics or third-party tracking.',
    summary:
      'We use only strictly necessary cookies and browser storage, to remember your preferences, keep you signed in and secure payments. We use no advertising or analytics cookies.',
    body: cookiePolicy,
  },
  'accessibility': {
    title: 'Accessibility Statement',
    description:
      'Our commitment to making {{brand}} accessible to everyone: WCAG 2.1 Level AA target, supported browsers and screen readers, known limits and how to reach us.',
    summary:
      'We want everyone to be able to use {{brand}}, and our target is WCAG 2.1 Level AA. If something is hard to use, e-mail us with the subject "Accessibility" and we will reply within 5 business days.',
    body: accessibility,
  },
  'dmca': {
    title: 'Copyright & DMCA Policy',
    description:
      'How to report copyright infringement to {{brand}} under the DMCA, how to file a counter-notice, and how we handle repeat infringers and our own trademarks.',
    summary:
      'We respect intellectual property. To report infringing material, e-mail us with the subject "Copyright / DMCA notice" and include the information listed in this policy.',
    body: dmca,
  },
  'disclaimer': {
    title: 'Disclaimer',
    description:
      '{{brand}} helps you plan shifts, but it is not legal, labor-law, tax or payroll advice. You remain responsible for complying with employment laws.',
    summary:
      '{{brand}} is a scheduling tool, not legal, labor-law, tax or payroll advice. Auto-scheduling and labor-rule checks are aids, and you remain responsible for complying with employment laws.',
    body: disclaimer,
  },
  'do-not-sell-or-share': {
    title: 'Do Not Sell or Share My Personal Information',
    description:
      '{{brand}} does not sell or share personal information and honors Global Privacy Control. How to submit an opt-out or privacy request under the CCPA.',
    summary:
      'We do not sell or share your personal information, and we have not done so in the past 12 months. Global Privacy Control signals are honored automatically, and you can still send us a request.',
    body: doNotSellOrShare,
  },
};
