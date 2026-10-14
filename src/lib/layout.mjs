import { config, url, abs, asset, absAsset, esc, fmtUsd, fmtJpy, companyName, companyAddress, POLICY_KEYS } from './util.mjs';
import { logo, cardRow } from './brand.mjs';
import { icon } from './icons.mjs';
import { organization, website, webPage, graph } from './schema.mjs';

const ASSET_VERSION = Date.now().toString(36);

/** Dual-currency price; CSS shows the one matching <html data-currency>. */
export function price(plan, t, { big = false } = {}) {
  const tax = t.lang === 'ja' ? `<span class="tax">${t.money.taxNote}</span>` : '';
  return `<span class="price${big ? ' price-big' : ''}"><span class="p-usd">${fmtUsd(plan.usd)}<small> USD</small></span><span class="p-jpy">${fmtJpy(plan.jpy)}<small> JPY</small>${tax}</span></span>`;
}

/** Plain-text price in the page's default currency (for copy that must read as a sentence). */
export const priceText = (plan, cur) => (cur === 'jpy' ? `${fmtJpy(plan.jpy)} JPY` : `${fmtUsd(plan.usd)} USD`);

export function currencyToggle(t) {
  return `<div class="cur-toggle" role="group" aria-label="${t.money.currency}">
    <button type="button" data-set-currency="usd" aria-pressed="${t.defaultCurrency === 'usd'}">$ USD</button>
    <button type="button" data-set-currency="jpy" aria-pressed="${t.defaultCurrency === 'jpy'}">¥ JPY</button>
  </div>`;
}

export function guaranteeBadge(t) {
  return `<div class="guarantee">${icon('shield', 'icon guarantee-icon')}<div><strong>${t.common.guarantee}</strong><span>${t.common.guaranteeText}</span></div></div>`;
}

export function billingBox(t, { compact = false } = {}) {
  return `<div class="billing-box${compact ? ' compact' : ''}">
    <p class="billing-title">${icon('lock')} ${t.common.weAccept}</p>
    ${cardRow(config.cards)}
    <p class="descriptor">${icon('receipt')} ${esc(t.common.statement(config.billingDescriptor))}</p>
    <p class="fine">${t.common.secure}</p>
  </div>`;
}

export function crumbsHtml(t, crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  return `<nav class="crumbs" aria-label="${t.nav.breadcrumb}"><ol>${crumbs
    .map((c, i) =>
      i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.href}">${esc(c.name)}</a></li>`
    )
    .join('')}</ol></nav>`;
}

function header(t, key) {
  const L = t.lang;
  const item = (k) =>
    `<li><a href="${url(L, k)}"${k === key ? ' aria-current="page"' : ''}>${t.nav[k]}</a></li>`;
  return `<a class="skip-link" href="#main">${t.nav.skip}</a>
<div class="announce"><div class="wrap"><p>${icon('sparkles')} <span>${t.announce.text}</span> <a href="${url(L, 'pricing')}">${t.announce.link} →</a></p></div></div>
<header class="site-header" data-header>
  <div class="wrap nav">
    <a class="logo" href="${url(L, 'home')}" aria-label="${config.brand} — ${t.nav.home}">${logo(config.brand)}</a>
    <nav class="primary-nav" id="primary-nav" aria-label="${t.nav.primary}">
      <ul>${['features', 'pricing', 'about', 'support', 'contact'].map(item).join('')}</ul>
    </nav>
    <div class="nav-actions">
      ${langSwitch(t, key)}
      <a class="btn btn-primary btn-sm nav-cta" href="${url(L, 'checkout')}">${t.nav.cta}</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">${icon('menu')}<span class="sr-only">${t.nav.menu}</span></button>
    </div>
  </div>
</header>`;
}

function langSwitch(t, key) {
  const k = key === '404' ? 'home' : key;
  return `<div class="lang-switch" role="group" aria-label="${t.nav.language}">${icon('globe')}
    <a href="${url('en', k)}" hreflang="en" lang="en" data-set-lang="en"${t.lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
    <a href="${url('ja', k)}" hreflang="ja" lang="ja" data-set-lang="ja"${t.lang === 'ja' ? ' aria-current="true"' : ''}>日本語</a>
  </div>`;
}

function footer(t, key) {
  const L = t.lang;
  const a = (k, label) => `<li><a href="${url(L, k)}">${label ?? t.policyNames[k] ?? t.nav[k]}</a></li>`;
  const year = config.lastUpdated.slice(0, 4);
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="logo" href="${url(L, 'home')}">${logo(config.brand)}</a>
        <p>${t.footer.tagline}</p>
        <address class="footer-address">
          <p class="footer-contact">${icon('building')} <strong>${esc(companyName(L))}</strong></p>
          ${companyAddress(L) ? `<p class="footer-contact">${icon('pin')} <span>${esc(companyAddress(L))}</span></p>` : ''}
          <p class="footer-contact">${icon('mail')} <a href="mailto:${config.supportEmail}">${config.supportEmail}</a></p>
          <p class="footer-contact">${icon('clock')} <span>${t.common.supportHours}</span></p>
        </address>
      </div>
      <nav aria-label="${t.footer.product}"><h2>${t.footer.product}</h2><ul>
        ${a('features')}${a('pricing')}${a('checkout', t.footer.startTrial)}${a('home', t.nav.home)}
      </ul></nav>
      <nav aria-label="${t.footer.company}"><h2>${t.footer.company}</h2><ul>
        ${a('about')}${a('contact')}${a('support')}${a('commerce-disclosure')}
      </ul></nav>
      <nav aria-label="${t.footer.legal}"><h2>${t.footer.legal}</h2><ul>
        ${POLICY_KEYS.slice(0, 5).map((k) => a(k)).join('')}
      </ul></nav>
      <nav aria-label="${t.footer.moreLegal}"><h2>${t.footer.moreLegal}</h2><ul>
        ${POLICY_KEYS.slice(5).map((k) => a(k)).join('')}${a('legal', t.footer.allPolicies)}
      </ul></nav>
    </div>
    <div class="footer-billing">
      ${cardRow(config.cards)}
      <p>${icon('receipt')} ${esc(t.common.statement(config.billingDescriptor))} ${t.common.guarantee}.</p>
    </div>
    <div class="footer-bottom">
      <p>© ${year} ${esc(companyName(L))}. ${t.footer.rights}</p>
      ${langSwitch(t, key)}
    </div>
  </div>
</footer>
<div class="cookie-notice" data-cookie-notice hidden>
  <p>${icon('cookie')} <span>${t.cookie.text} <a href="${url(L, 'cookie-policy')}">${t.cookie.link}</a></span></p>
  <button type="button" class="btn btn-ghost btn-sm" data-cookie-ok>${t.cookie.ok}</button>
</div>`;
}

/** Encode bare "&" outside <script> blocks (copy such as "Restaurants & cafés", query strings). */
function encodeAmpersands(html) {
  return html
    .split(/(<script[\s\S]*?<\/script>)/)
    .map((part, i) => (i % 2 ? part : part.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;')))
    .join('');
}

/**
 * Wrap page content in the full HTML document.
 * crumbs: [{name, href}] including the current page last (omit for home).
 */
export function page({ t, key, title, description, body, schema = [], crumbs, pageType = 'WebPage', pageExtra, robots, bodyClass = '' }) {
  const L = t.lang;
  const isNotFound = key === '404';
  const canonical = isNotFound ? null : abs(L, key);
  const og = absAsset(`img/og-${L}.png`);
  const nodes = [organization(L), website(L)];
  if (!isNotFound) nodes.push(...webPage({ lang: L, key, type: pageType, title, description, crumbs, extra: pageExtra }), ...schema);

  // Language auto-detection: only the English (default) pages redirect, and only when the
  // visitor has not chosen a language yet and their browser prefers Japanese.
  const detect =
    L === 'en' && !isNotFound
      ? `<script>(function(){try{var p=localStorage.getItem('sk_lang');var l=(navigator.languages&&navigator.languages[0])||navigator.language||'';if(p==='ja'||(!p&&/^ja\\b/i.test(l))){location.replace(${JSON.stringify(url('ja', key))}+location.search+location.hash)}}catch(e){}})();</script>`
      : '';
  const curInit = `<script>(function(){var d=document.documentElement;try{var c=localStorage.getItem('sk_currency');if(c==='usd'||c==='jpy')d.setAttribute('data-currency',c)}catch(e){}d.classList.add('js')})();</script>`;

  return encodeAmpersands(`<!doctype html>
<html lang="${L}" data-currency="${t.defaultCurrency}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${robots ? `<meta name="robots" content="${robots}">` : '<meta name="robots" content="index, follow, max-image-preview:large">'}
${canonical ? `<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${abs('en', key)}">
<link rel="alternate" hreflang="ja" href="${abs('ja', key)}">
<link rel="alternate" hreflang="x-default" href="${abs('en', key)}">` : ''}
${detect}
${curInit}
<meta name="theme-color" content="#0c0817">
<meta name="color-scheme" content="dark">
<meta name="application-name" content="${config.brand}">
<meta name="author" content="${esc(companyName(L))}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${config.brand}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
<meta property="og:image" content="${og}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(t.home.title)}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:locale:alternate" content="${L === 'ja' ? 'en_US' : 'ja_JP'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="${asset('img/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${asset('img/favicon-32.png')}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${asset('img/apple-touch-icon.png')}">
<link rel="manifest" href="${config.siteUrl.replace(/^https?:\/\/[^/]+/, '')}/site.webmanifest">
<link rel="sitemap" type="application/xml" href="${config.siteUrl.replace(/^https?:\/\/[^/]+/, '')}/sitemap.xml">
<link rel="preload" href="${asset('fonts/plus-jakarta-sans-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('css/site.css')}?v=${ASSET_VERSION}">
<script type="application/ld+json">${graph(nodes)}</script>
</head>
<body class="lang-${L} ${bodyClass}">
${header(t, key)}
<main id="main" tabindex="-1">
${crumbsHtml(t, crumbs)}
${body}
</main>
${footer(t, key)}
<script src="${asset('js/site.js')}?v=${ASSET_VERSION}" defer></script>
</body>
</html>
`);
}

export { icon, esc, url, abs, config };
