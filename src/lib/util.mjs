import config from '../../site.config.mjs';

export const LANGS = ['en', 'ja'];

// Page key -> path relative to the language root.
export const ROUTES = {
  home: '',
  features: 'features/',
  pricing: 'pricing/',
  checkout: 'checkout/',
  about: 'about/',
  support: 'support/',
  contact: 'contact/',
  legal: 'legal/',
  'terms-of-service': 'legal/terms-of-service/',
  'privacy-policy': 'legal/privacy-policy/',
  'refund-policy': 'legal/refund-policy/',
  'cancellation-policy': 'legal/cancellation-policy/',
  'shipping-policy': 'legal/shipping-policy/',
  'cookie-policy': 'legal/cookie-policy/',
  accessibility: 'legal/accessibility/',
  dmca: 'legal/dmca/',
  disclaimer: 'legal/disclaimer/',
  'do-not-sell-or-share': 'legal/do-not-sell-or-share/',
  'commerce-disclosure': 'legal/commerce-disclosure/',
};

export const POLICY_KEYS = [
  'terms-of-service',
  'privacy-policy',
  'refund-policy',
  'cancellation-policy',
  'shipping-policy',
  'cookie-policy',
  'accessibility',
  'dmca',
  'disclaimer',
  'do-not-sell-or-share',
];

const site = new URL(config.siteUrl + '/');
export const ORIGIN = site.origin;
export const BASE = site.pathname; // always ends with "/"

export const langPrefix = (lang) => (lang === 'ja' ? 'ja/' : '');

/** Root-relative link to a page, e.g. "/paiban/ja/pricing/". */
export function url(lang, key) {
  if (!(key in ROUTES)) throw new Error(`Unknown route: ${key}`);
  return BASE + langPrefix(lang) + ROUTES[key];
}

/** Absolute URL to a page. */
export const abs = (lang, key) => ORIGIN + url(lang, key);

/** Root-relative link to a static asset. */
export const asset = (p) => BASE + 'assets/' + p;
export const absAsset = (p) => ORIGIN + asset(p);

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const fmtUsd = (n) => '$' + n.toFixed(2);
export const fmtJpy = (n) => '¥' + n.toLocaleString('en-US');

export const companyName = (lang) => config.company.legalName[lang] || config.company.legalName.en || config.brand;
export const companyAddress = (lang) => config.company.address[lang] || config.company.address.en || '';
export const representative = (lang) =>
  config.company.representative[lang] || config.company.representative.en || '';

export const mailto = (subject, body) =>
  `mailto:${config.supportEmail}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export { config };
