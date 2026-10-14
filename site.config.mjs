// Central site configuration. Everything business-specific lives here so it can be
// changed in one place; the build renders it into every page, policy and JSON-LD block.

export default {
  brand: 'ShiftKumo',
  domain: 'shiftkumo.com',
  supportEmail: 'support@shiftkumo.com',
  // Text that appears on the customer's card statement.
  billingDescriptor: 'SHIFTKUMO.COM',

  // Public URL the site is served from (no trailing slash). The GitHub Pages workflow
  // passes the real URL in SITE_URL; this default is used for local builds.
  siteUrl: (process.env.SITE_URL || 'https://zhaoweiyang.github.io/paiban').replace(/\/+$/, ''),

  // Legal entity that operates the service. While `legalName` is empty the brand name is
  // used; empty address/phone/representative fields are omitted from pages, and the
  // commerce disclosure uses the "disclosed without delay on request" wording instead.
  company: {
    legalName: { en: 'AVERCYN GLOBAL INC', ja: 'AVERCYN GLOBAL INC' },
    address: {
      en: '1660 Lincoln Street, Denver, CO 80264, USA',
      ja: '1660 Lincoln Street, Denver, CO 80264, USA（アメリカ合衆国 コロラド州 デンバー）',
    },
    // Structured form of the address for Schema.org PostalAddress.
    postalAddress: {
      streetAddress: '1660 Lincoln Street',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80264',
      addressCountry: 'US',
    },
    phone: '',
    representative: { en: '', ja: '' },
    foundingYear: '',
  },

  lastUpdated: '2026-10-14',
  trialHours: 1,
  refundDays: 30,

  // Prices are the total charged per billing period (any applicable taxes included).
  plans: [
    { id: 'monthly', months: 1, usd: 9.9, jpy: 1599, iso: 'P1M' },
    { id: 'quarterly', months: 3, usd: 19.9, jpy: 2999, iso: 'P3M' },
    { id: 'annual', months: 12, usd: 99, jpy: 15999, iso: 'P1Y' },
    { id: 'biennial', months: 24, usd: 129, jpy: 19999, iso: 'P2Y', bestValue: true },
    { id: 'triennial', months: 36, usd: 199, jpy: 29999, iso: 'P3Y' },
  ],

  // Hosted checkout links from your payment provider (e.g. Stripe Payment Links), per plan
  // and currency. When a link is empty the checkout button opens a pre-filled e-mail to
  // support instead, so the flow always works.
  paymentLinks: {
    monthly: { usd: '', jpy: '' },
    quarterly: { usd: '', jpy: '' },
    annual: { usd: '', jpy: '' },
    biennial: { usd: '', jpy: '' },
    triennial: { usd: '', jpy: '' },
  },

  cards: ['visa', 'mastercard', 'amex', 'jcb', 'discover', 'diners', 'unionpay'],
};
