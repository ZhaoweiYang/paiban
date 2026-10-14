import { page, price, billingBox, guaranteeBadge, icon, esc, url, abs, config } from '../lib/layout.mjs';
import { POLICY_KEYS, ROUTES, fmtUsd, fmtJpy, companyName, companyAddress, representative } from '../lib/util.mjs';
import { ids } from '../lib/schema.mjs';
import { cardName } from '../lib/brand.mjs';

const POLICY_ICONS = {
  'terms-of-service': 'scroll',
  'privacy-policy': 'lock',
  'refund-policy': 'refund',
  'cancellation-policy': 'ban',
  'shipping-policy': 'package',
  'cookie-policy': 'cookie',
  accessibility: 'access',
  dmca: 'copyright',
  disclaimer: 'alert',
  'do-not-sell-or-share': 'eyeOff',
  'commerce-disclosure': 'building',
};

export function priceTable(t) {
  const tb = t.pricing.table;
  return `<div class="table-wrap"><table class="data-table">
<thead><tr><th scope="col">${tb.plan}</th><th scope="col">${tb.usd}</th><th scope="col">${tb.jpy}</th><th scope="col">${tb.period}</th><th scope="col">${tb.renewal}</th></tr></thead>
<tbody>${config.plans
    .map(
      (p) =>
        `<tr><th scope="row">${t.plans[p.id].name}</th><td>${fmtUsd(p.usd)}</td><td>${fmtJpy(p.jpy)}</td><td>${t.plans[p.id].term}</td><td>${t.plans[p.id].every}</td></tr>`
    )
    .join('')}</tbody></table></div>`;
}

export function companyBlock(t) {
  const L = t.lang;
  const addr = companyAddress(L);
  const lab = t.about.info;
  return `<address class="company-block">
<strong>${esc(companyName(L))}</strong>${addr ? `<br>${esc(addr)}` : ''}
<br>${lab.email}: <a href="mailto:${config.supportEmail}">${config.supportEmail}</a>
<br>${lab.website}: <a href="https://${config.domain}">${config.domain}</a>
<br>${lab.hours}: ${t.common.supportHours}
</address>`;
}

/** Designated agent for copyright notices (17 U.S.C. § 512(c)(2)). */
export function dmcaAgent(t) {
  const L = t.lang;
  const addr = companyAddress(L);
  const ja = L === 'ja';
  return `<address class="company-block">
<strong>${ja ? '著作権侵害通知の受領代理人（Designated Copyright Agent）' : 'Designated Copyright Agent'}</strong>
<br>${ja ? '著作権担当（Copyright Agent）' : 'Copyright Agent'}, ${esc(companyName(L))}${addr ? `<br>${esc(addr)}` : ''}${config.company.phone ? `<br>${ja ? '電話' : 'Phone'}: ${esc(config.company.phone)}` : ''}
<br>${t.about.info.email}: <a href="mailto:${config.supportEmail}">${config.supportEmail}</a>
</address>`;
}

/** Replace {{tokens}} in policy copy. Throws on unknown tokens so nothing leaks to the page. */
export function fill(str, t) {
  const L = t.lang;
  const map = {
    brand: config.brand,
    company: esc(companyName(L)),
    domain: config.domain,
    email: config.supportEmail,
    descriptor: config.billingDescriptor,
    updated: t.dateFmt(config.lastUpdated),
    companyBlock: companyBlock(t),
    dmcaAgent: dmcaAgent(t),
    priceTable: priceTable(t),
  };
  const out = str.replace(/\{\{\s*([\w-]+)(?::([\w-]+))?\s*\}\}/g, (m, k, arg) => {
    if (k === 'url') {
      if (!(arg in ROUTES)) throw new Error(`Unknown url token ${m}`);
      return url(L, arg);
    }
    if (!(k in map)) throw new Error(`Unknown token ${m}`);
    return map[k];
  });
  if (/\{\{|\}\}/.test(out)) throw new Error('Unreplaced token in: ' + out.slice(0, 120));
  return out;
}

function toc(html, t) {
  const items = [...html.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)];
  if (items.length < 3) return '';
  return `<nav class="toc" aria-label="${t.common.onThisPage}"><p>${t.common.onThisPage}</p><ol>${items
    .map(([, id, txt]) => `<li><a href="#${id}">${txt.replace(/<[^>]+>/g, '')}</a></li>`)
    .join('')}</ol></nav>`;
}

function related(t, key) {
  const L = t.lang;
  const keys = [...POLICY_KEYS, 'commerce-disclosure'].filter((k) => k !== key);
  return `<aside class="related" aria-labelledby="rel-h"><h2 id="rel-h" class="h3">${t.footer.allPolicies}</h2><ul>${keys
    .map((k) => `<li><a href="${url(L, k)}">${icon(POLICY_ICONS[k])} ${t.policyNames[k]}</a></li>`)
    .join('')}</ul></aside>`;
}

function docLayout(t, key, { title, summary, html }) {
  const L = t.lang;
  return `
<section class="page-hero compact doc-hero">
  <div class="wrap">
    <p class="eyebrow">${icon(POLICY_ICONS[key])} ${t.nav.legal}</p>
    <h1>${esc(title)}</h1>
    <p class="updated">${t.common.lastUpdated}: <time datetime="${config.lastUpdated}">${t.dateFmt(config.lastUpdated)}</time></p>
    ${summary ? `<p class="lead">${summary}</p>` : ''}
  </div>
</section>
<section class="section section-tight">
  <div class="wrap doc">
    ${toc(html, t)}
    <article class="prose legal-body">${html}</article>
  </div>
  <div class="wrap">${related(t, key)}</div>
</section>`;
}

export function policyPage(t, key, doc) {
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.legal, href: url(L, 'legal') },
    { name: doc.title, href: url(L, key) },
  ];
  // Policy tables scroll horizontally on small screens instead of widening the page.
  const body = doc.body.replace(/<table>/g, '<div class="table-wrap"><table class="data-table">').replace(/<\/table>/g, '</table></div>');
  const html = fill(body, t);
  const summary = doc.summary ? fill(doc.summary, t) : '';
  return page({
    t,
    key,
    title: `${doc.title} | ${config.brand}`,
    description: fill(doc.description, t),
    body: docLayout(t, key, { title: doc.title, summary, html }),
    crumbs,
    pageExtra: { about: { '@id': ids.org }, datePublished: config.lastUpdated, lastReviewed: config.lastUpdated },
  });
}

export function commercePage(t) {
  const c = t.commerce;
  const r = c.rows;
  const L = t.lang;
  const req = c.onRequest;
  const rows = [
    [r.seller, esc(companyName(L))],
    [r.rep, representative(L) ? esc(representative(L)) : req],
    [r.address, companyAddress(L) ? esc(companyAddress(L)) : req],
    [r.phone, config.company.phone ? esc(config.company.phone) : req],
    [r.email, `<a href="mailto:${config.supportEmail}">${config.supportEmail}</a>`],
    [r.url, `<a href="https://${config.domain}">https://${config.domain}</a>`],
    [r.price, `${r.priceVal}${priceTable(t)}`],
    [r.fees, r.feesVal],
    [r.pay, r.payVal],
    [r.when, r.whenVal],
    [r.delivery, r.deliveryVal],
    [r.trial, r.trialVal],
    [r.term, r.termVal],
    [r.cancel, `${r.cancelVal} <a href="${url(L, 'cancellation-policy')}">${t.policyNames['cancellation-policy']}</a>`],
    [r.refund, `${r.refundVal} <a href="${url(L, 'refund-policy')}">${t.policyNames['refund-policy']}</a>`],
    [r.descriptor, config.billingDescriptor],
    [r.env, r.envVal],
  ];
  const html = `<div class="table-wrap"><table class="data-table kv-table"><tbody>${rows
    .map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`)
    .join('')}</tbody></table></div>`;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.legal, href: url(L, 'legal') },
    { name: c.h1, href: url(L, 'commerce-disclosure') },
  ];
  return page({
    t,
    key: 'commerce-disclosure',
    title: c.title,
    description: c.description,
    body: docLayout(t, 'commerce-disclosure', { title: c.h1, summary: c.summary, html }),
    crumbs,
    pageExtra: { about: { '@id': ids.org } },
  });
}

export function legalIndex(t) {
  const lg = t.legal;
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.legal, href: url(L, 'legal') },
  ];
  const keys = [...POLICY_KEYS, 'commerce-disclosure'];
  const body = `
<section class="page-hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${lg.eyebrow}</p>
    <h1>${lg.h1}</h1>
    <p class="lead">${lg.lead}</p>
  </div>
</section>
<section class="section section-tight" aria-labelledby="kf-h">
  <div class="wrap">
    <div class="included-box">
      <h2 id="kf-h">${lg.keyFacts}</h2>
      <dl class="facts">${lg.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
  </div>
</section>
<section class="section section-tight" aria-label="${lg.h1}">
  <div class="wrap">
    <ul class="policy-grid">${keys
      .map(
        (k) =>
          `<li><a class="card card-sm policy-card" href="${url(L, k)}"><span class="card-icon">${icon(POLICY_ICONS[k])}</span><h2 class="h3">${t.policyNames[k]}</h2><p>${t.policyBlurbs[k]}</p><span class="text-link">${t.common.readPolicy} ${icon('arrow')}</span></a></li>`
      )
      .join('')}</ul>
  </div>
</section>`;
  return page({
    t,
    key: 'legal',
    title: lg.title,
    description: lg.description,
    body,
    crumbs,
    pageType: 'CollectionPage',
    pageExtra: {
      hasPart: keys.map((k) => ({ '@type': 'WebPage', name: t.policyNames[k], url: abs(L, k) })),
    },
  });
}
