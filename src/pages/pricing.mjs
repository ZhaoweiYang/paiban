import { page, price, priceText, currencyToggle, guaranteeBadge, billingBox, icon, esc, url, abs, config } from '../lib/layout.mjs';
import { fmtUsd, fmtJpy } from '../lib/util.mjs';
import { product, faqPage, ids } from '../lib/schema.mjs';

export default function pricing(t) {
  const pr = t.pricing;
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.pricing, href: url(L, 'pricing') },
  ];

  const cards = config.plans
    .map((p) => {
      const pl = t.plans[p.id];
      const both = (fn) => `<span class="p-usd">${fn(priceText(p, 'usd'))}</span><span class="p-jpy">${fn(priceText(p, 'jpy'))}</span>`;
      return `<article class="plan${p.bestValue ? ' is-best' : ''}" id="plan-${p.id}" aria-labelledby="plan-${p.id}-h">
      ${p.bestValue ? `<span class="badge">${t.money.bestValue}</span>` : ''}
      <h3 id="plan-${p.id}-h">${pl.name}</h3>
      <p class="plan-price">${price(p, t, { big: true })}<span class="plan-per">${pl.per}</span></p>
      <p class="plan-billed">${pr.billed(pl.term)}</p>
      <a class="btn ${p.bestValue ? 'btn-primary' : 'btn-ghost'} btn-block" href="${url(L, 'checkout')}?plan=${p.id}">${t.common.startTrial}<span class="sr-only"> — ${pl.name}</span></a>
      <ul class="plan-terms">
        <li>${icon('timer')}<span>${both((x) => pr.then(x, pl.every))}</span></li>
        <li>${icon('refund')}<span>${both((x) => pr.renews(x, pl.every))}</span></li>
        <li>${icon('shield')}<span>${t.common.guarantee}</span></li>
        <li>${icon('check')}<span>${t.common.allFeatures}</span></li>
      </ul>
    </article>`;
    })
    .join('');

  const tb = pr.table;
  const table = `<div class="table-wrap"><table class="data-table">
    <caption class="sr-only">${pr.tableTitle}</caption>
    <thead><tr><th scope="col">${tb.plan}</th><th scope="col">${tb.usd}</th><th scope="col">${tb.jpy}</th><th scope="col">${tb.period}</th><th scope="col">${tb.today}</th><th scope="col">${tb.first}</th><th scope="col">${tb.renewal}</th></tr></thead>
    <tbody>${config.plans
      .map(
        (p) =>
          `<tr><th scope="row">${t.plans[p.id].name}</th><td>${fmtUsd(p.usd)}</td><td>${fmtJpy(p.jpy)}</td><td>${t.plans[p.id].term}</td><td>$0.00 / ¥0</td><td>${tb.firstWhen}</td><td>${t.plans[p.id].every}</td></tr>`
      )
      .join('')}</tbody>
  </table></div>`;

  const body = `
<section class="page-hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${pr.eyebrow}</p>
    <h1>${pr.h1}</h1>
    <p class="lead">${pr.lead}</p>
    ${currencyToggle(t)}
  </div>
</section>

<section class="section section-tight" aria-label="${pr.eyebrow}">
  <div class="wrap">
    <div class="plans">${cards}</div>
    <div class="price-foot">${guaranteeBadge(t)}<p class="fine">${t.money.taxNote} · ${t.common.cancelAnytime} · ${t.common.trialShort}</p></div>
  </div>
</section>

<section class="section" aria-labelledby="how-h">
  <div class="wrap">
    <div class="section-head"><h2 id="how-h">${pr.howTitle}</h2></div>
    <ol class="timeline">${pr.how.map((s, i) => `<li><span class="step-n">${i + 1}</span><h3>${s.t}</h3><p>${s.p}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="section" aria-labelledby="inc-h">
  <div class="wrap">
    <div class="included-box">
      <h2 id="inc-h">${pr.includedTitle}</h2>
      <ul class="checks cols-3">${pr.included.map((x) => `<li>${icon('check')}${x}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="cmp-h">
  <div class="wrap">
    <div class="section-head"><h2 id="cmp-h">${pr.tableTitle}</h2></div>
    ${table}
  </div>
</section>

<section class="section" aria-labelledby="det-h">
  <div class="wrap split split-top">
    <div>
      <h2 id="det-h">${pr.detailsTitle}</h2>
      <dl class="details">${pr.details.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <p class="policy-links">${['terms-of-service', 'refund-policy', 'cancellation-policy']
        .map((k) => `<a href="${url(L, k)}">${t.policyNames[k]}</a>`)
        .join(' · ')}</p>
    </div>
    <div class="stack">
      ${guaranteeBadge(t)}
      ${billingBox(t)}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="pfaq-h">
  <div class="wrap narrow">
    <div class="section-head"><h2 id="pfaq-h">${t.home.faqTitle}</h2></div>
    <div class="faq">${pr.faq.map(([q, a]) => `<details><summary>${q}${icon('chevron')}</summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <h2>${t.home.cta.title}</h2>
    <p>${t.home.cta.p}</p>
    <div class="cta-row"><a class="btn btn-primary btn-lg" href="${url(L, 'checkout')}">${t.common.startTrial} ${icon('arrow')}</a></div>
  </div>
</section>`;

  return page({
    t,
    key: 'pricing',
    title: pr.title,
    description: pr.description,
    body,
    crumbs,
    pageExtra: { mainEntity: { '@id': ids.product } },
    schema: [product(L, t), faqPage(pr.faq, abs(L, 'pricing'))],
  });
}
