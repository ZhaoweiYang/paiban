import { page, icon, url, abs } from '../lib/layout.mjs';
import { software, ids } from '../lib/schema.mjs';

export default function features(t) {
  const f = t.features;
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.features, href: url(L, 'features') },
  ];
  const body = `
<section class="page-hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${f.eyebrow}</p>
    <h1>${f.h1}</h1>
    <p class="lead">${f.lead}</p>
    <nav class="jump" aria-label="${t.common.onThisPage}"><ul>${f.groups
      .map((g, i) => `<li><a href="#group-${i + 1}">${icon(g.icon)} ${g.t}</a></li>`)
      .join('')}</ul></nav>
  </div>
</section>

${f.groups
  .map(
    (g, i) => `<section class="section feature-group" id="group-${i + 1}" aria-labelledby="group-${i + 1}-h">
  <div class="wrap">
    <div class="fg-head"><span class="card-icon">${icon(g.icon)}</span><h2 id="group-${i + 1}-h">${g.t}</h2></div>
    <div class="grid-3">${g.items.map(([n, d]) => `<article class="card card-sm"><h3>${n}</h3><p>${d}</p></article>`).join('')}</div>
  </div>
</section>`
  )
  .join('')}

<section class="section" aria-labelledby="inc-h">
  <div class="wrap">
    <div class="included-box">
      <h2 id="inc-h">${f.included.title}</h2>
      <ul class="checks cols-3">${f.included.items.map((x) => `<li>${icon('check')}${x}</li>`).join('')}</ul>
      <p><a class="btn btn-ghost" href="${url(L, 'pricing')}">${t.common.seePricing} ${icon('arrow')}</a></p>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <h2>${f.cta.title}</h2>
    <p>${f.cta.p}</p>
    <div class="cta-row"><a class="btn btn-primary btn-lg" href="${url(L, 'checkout')}">${t.common.startTrial} ${icon('arrow')}</a></div>
  </div>
</section>`;

  const featureList = f.groups.flatMap((g) => g.items.map(([n]) => n));
  return page({
    t,
    key: 'features',
    title: f.title,
    description: f.description,
    body,
    crumbs,
    pageExtra: { about: { '@id': ids.software } },
    schema: [software(L, t, featureList)],
  });
}
