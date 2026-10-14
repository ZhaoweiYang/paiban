import { page, price, priceText, currencyToggle, guaranteeBadge, billingBox, icon, esc, url, config } from '../lib/layout.mjs';
import { mailto } from '../lib/util.mjs';
import { ids } from '../lib/schema.mjs';

export default function checkout(t) {
  const c = t.checkout;
  const L = t.lang;
  const def = config.plans[0];
  const cur = t.defaultCurrency;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.pricing, href: url(L, 'pricing') },
    { name: c.eyebrow, href: url(L, 'checkout') },
  ];
  const policy = (k) => `<a href="${url(L, k)}" target="_blank" rel="noopener">${t.policyNames[k]}</a>`;
  const both = (fn) => `<span class="p-usd">${fn('usd')}</span><span class="p-jpy">${fn('jpy')}</span>`;

  const data = {
    plans: config.plans.map((p) => ({
      id: p.id,
      usd: p.usd,
      jpy: p.jpy,
      name: t.plans[p.id].name,
      term: t.plans[p.id].term,
      every: t.plans[p.id].every,
      renews: c.renewsVal(t.plans[p.id].every),
      links: config.paymentLinks[p.id] || {},
    })),
    email: config.supportEmail,
    subject: c.mailSubject('{plan}', '{cur}'),
    intro: c.mailIntro,
    labels: { plan: c.plan, period: c.period, email: c.email, name: c.name, company: c.company, firstCharge: c.firstCharge, renews: c.renews },
    errEmail: c.errEmail,
    errAgree: c.errAgree,
    fallbackNote: c.fallbackNote,
    submitNote: c.submitNote,
  };

  const options = config.plans
    .map(
      (p, i) => `<label class="plan-opt${p.bestValue ? ' is-best' : ''}">
        <input type="radio" name="plan" value="${p.id}"${i === 0 ? ' checked' : ''}>
        <span class="po-main"><span class="po-name">${t.plans[p.id].name}${p.bestValue ? ` <span class="badge badge-inline">${t.money.bestValue}</span>` : ''}</span><span class="po-term">${t.pricing.billed(t.plans[p.id].term)}</span></span>
        <span class="po-price">${price(p, t)}<span class="po-per">${t.plans[p.id].per}</span></span>
      </label>`
    )
    .join('');

  const fallback = mailto(c.mailSubject(t.plans[def.id].name, cur.toUpperCase()), c.mailIntro);
  // Until a payment link is configured the hand-off is an e-mail, and the copy says so.
  const hasLink = !!(config.paymentLinks[def.id] || {})[cur];

  const body = `
<section class="page-hero compact">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${c.eyebrow}</p>
    <h1>${c.h1}</h1>
    <p class="lead">${hasLink ? c.lead : c.leadFallback}</p>
  </div>
</section>

<section class="section section-tight">
  <div class="wrap checkout">
    <form class="co-form" data-checkout action="${esc(fallback)}" method="post" enctype="text/plain">
      <fieldset>
        <legend>${c.step1}</legend>
        ${currencyToggle(t)}
        <div class="plan-opts">${options}</div>
      </fieldset>
      <fieldset>
        <legend>${c.step2}</legend>
        <div class="field"><label for="co-email">${c.email} <span class="req">(${c.required})</span></label><input id="co-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field-2">
          <div class="field"><label for="co-name">${c.name}</label><input id="co-name" name="name" type="text" autocomplete="name"></div>
          <div class="field"><label for="co-company">${c.company}</label><input id="co-company" name="company" type="text" autocomplete="organization"></div>
        </div>
      </fieldset>
      <label class="agree"><input type="checkbox" name="agree" required> <span>${c.agree(policy('terms-of-service'), policy('refund-policy'), policy('cancellation-policy'))} ${c.authorize(
        `${both((x) => priceText(def, x))}`,
        t.plans[def.id].every,
        esc(config.brand)
      )}</span></label>
      <p class="form-error" role="alert" data-co-error hidden></p>
      <button type="submit" class="btn btn-primary btn-lg btn-block">${icon('lock')} ${c.submit}</button>
      <p class="fine center" data-co-note>${hasLink ? c.submitNote : c.fallbackNote}</p>
    </form>

    <aside class="co-summary" aria-labelledby="sum-h">
      <h2 id="sum-h">${c.summary}</h2>
      <dl class="summary">
        <div><dt>${c.plan}</dt><dd data-co="name">${t.plans[def.id].name}</dd></div>
        <div><dt>${c.period}</dt><dd data-co="term">${t.plans[def.id].term}</dd></div>
        <div><dt>${c.trialEnds}</dt><dd>${c.trialEndsVal}</dd></div>
        <div class="sum-today"><dt>${c.dueToday}</dt><dd>${both((x) => (x === 'usd' ? '$0.00 USD' : '¥0 JPY'))}</dd></div>
        <div class="sum-charge"><dt>${c.firstCharge}</dt><dd data-co="price">${both((x) => priceText(def, x))}</dd></div>
        <div><dt>${c.renews}</dt><dd data-co="renews">${c.renewsVal(t.plans[def.id].every)}</dd></div>
      </dl>
      <p class="sum-note">${icon('check')} ${c.included}</p>
      <p class="sum-note">${icon('ban')} ${c.cancelNote}</p>
      ${guaranteeBadge(t)}
      ${billingBox(t)}
    </aside>
  </div>
</section>
<script type="application/json" id="checkout-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

  return page({
    t,
    key: 'checkout',
    title: c.title,
    description: c.description,
    body,
    crumbs,
    pageType: 'CheckoutPage',
    pageExtra: { about: { '@id': ids.product } },
  });
}
