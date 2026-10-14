import { page, icon, esc, url, abs, config } from '../lib/layout.mjs';
import { companyName, companyAddress, representative } from '../lib/util.mjs';
import { ids } from '../lib/schema.mjs';

/** Company facts table, shared by About and Contact. Empty config fields are omitted. */
export function companyTable(t) {
  const a = t.about.info;
  const L = t.lang;
  const rows = [
    [a.company, esc(companyName(L))],
    [a.brand, config.brand],
    [a.business, a.businessVal],
    companyAddress(L) && [a.address, esc(companyAddress(L))],
    [a.email, `<a href="mailto:${config.supportEmail}">${config.supportEmail}</a>`],
    [a.website, `<a href="https://${config.domain}">${config.domain}</a>`],
    [a.hours, t.common.supportHours],
    [a.languages, t.common.languages],
  ].filter(Boolean);
  return `<dl class="info-table">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

export default function about(t) {
  const a = t.about;
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.about, href: url(L, 'about') },
  ];
  const body = `
<section class="page-hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${a.eyebrow}</p>
    <h1>${a.h1}</h1>
    <p class="lead">${a.lead}</p>
  </div>
</section>

<section class="section section-tight" aria-labelledby="info-h">
  <div class="wrap split split-top">
    <div>
      <h2 id="info-h">${a.infoTitle}</h2>
      ${companyTable(t)}
    </div>
    <div class="mv">
      <article class="card mv-card"><span class="card-icon">${icon('target')}</span><h2>${a.mission.t}</h2><p>${a.mission.p}</p></article>
      <article class="card mv-card"><span class="card-icon">${icon('eye')}</span><h2>${a.vision.t}</h2><p>${a.vision.p}</p></article>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="prob-h">
  <div class="wrap narrow prose">
    <h2 id="prob-h">${a.problemTitle}</h2>
    ${a.problem.map((p) => `<p>${p}</p>`).join('')}
  </div>
</section>

<section class="section" aria-labelledby="cust-h">
  <div class="wrap">
    <div class="section-head"><h2 id="cust-h">${a.customersTitle}</h2><p class="lead">${a.customersLead}</p></div>
    <ul class="ind-list ind-grid">${a.customers.map(([ic, n]) => `<li>${icon(ic)}<span>${n}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="val-h">
  <div class="wrap">
    <div class="section-head"><h2 id="val-h">${a.valuesTitle}</h2></div>
    <div class="grid-3 values">${a.values
      .map(([ic, n, d]) => `<article class="card card-sm"><span class="card-icon">${icon(ic)}</span><h3>${n}</h3><p>${d}</p></article>`)
      .join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="name-h">
  <div class="wrap narrow">
    <div class="name-card"><span class="kumo" aria-hidden="true">雲</span><div><h2 id="name-h">${a.nameTitle}</h2><p>${a.name}</p></div></div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <h2>${a.cta.title}</h2>
    <p>${a.cta.p}</p>
    <div class="cta-row">
      <a class="btn btn-primary btn-lg" href="${url(L, 'contact')}">${t.common.contactUs} ${icon('arrow')}</a>
      <a class="btn btn-ghost btn-lg" href="mailto:${config.supportEmail}">${config.supportEmail}</a>
    </div>
  </div>
</section>`;

  return page({
    t,
    key: 'about',
    title: a.title,
    description: a.description,
    body,
    crumbs,
    pageType: 'AboutPage',
    pageExtra: { about: { '@id': ids.org }, mainEntity: { '@id': ids.org } },
    schema: [
      {
        '@type': 'Organization',
        '@id': ids.org,
        slogan: a.mission.p,
        brand: { '@type': 'Brand', name: config.brand, logo: { '@id': ids.logo } },
        makesOffer: { '@type': 'Offer', itemOffered: { '@id': ids.software } },
        areaServed: 'Worldwide',
        ...(representative(L) ? { founder: { '@type': 'Person', name: representative(L) } } : {}),
      },
    ],
  });
}
