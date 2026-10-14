import { page, guaranteeBadge, billingBox, icon, esc, url, abs, config } from '../lib/layout.mjs';
import { mailto } from '../lib/util.mjs';
import { faqPage, howTo } from '../lib/schema.mjs';

export default function support(t) {
  const s = t.support;
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.support, href: url(L, 'support') },
  ];
  const steps = (arr) => `<ol class="num-steps">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
  const mailBtn = (label, subject, primary = false) =>
    `<a class="btn ${primary ? 'btn-primary' : 'btn-ghost'}" href="${esc(mailto(subject))}">${icon('mail')} ${label}</a>`;

  const body = `
<section class="page-hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${s.eyebrow}</p>
    <h1>${s.h1}</h1>
    <p class="lead">${s.lead}</p>
    <ul class="quick">${s.quick.map((q) => `<li><a href="${q.href}">${icon(q.icon)}<span>${q.t}</span></a></li>`).join('')}</ul>
  </div>
</section>

<section class="section section-tight" aria-labelledby="ct-h">
  <div class="wrap">
    <div class="contact-card">
      <div>
        <h2 id="ct-h">${s.contactTitle}</h2>
        <p class="big-mail">${icon('mail')} <a href="mailto:${config.supportEmail}">${config.supportEmail}</a></p>
      </div>
      <dl class="mini-dl">
        <div><dt>${icon('clock')} ${t.about.info.hours}</dt><dd>${t.common.supportHours}</dd></div>
        <div><dt>${icon('zap')} ${t.contact.responseTitle}</dt><dd>${t.common.reply}</dd></div>
        <div><dt>${icon('globe')} ${t.about.info.languages}</dt><dd>${t.common.languages}</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="section help-block" id="get-help" aria-labelledby="gh-h">
  <div class="wrap narrow">
    <h2 id="gh-h">${icon('help')} ${s.help.t}</h2>
    <p>${s.help.lead}</p>
    ${steps(s.help.steps)}
    <p>${mailBtn(s.help.mail, s.help.subject, true)}</p>
  </div>
</section>

<section class="section help-block" id="refund" aria-labelledby="rf-h">
  <div class="wrap narrow">
    <h2 id="rf-h">${icon('refund')} ${s.refund.t}</h2>
    ${guaranteeBadge(t)}
    <p>${s.refund.lead}</p>
    ${steps(s.refund.steps)}
    <p class="note">${s.refund.note}</p>
    <p class="btn-row">${mailBtn(s.refund.mail, s.refund.subject, true)} <a class="btn btn-ghost" href="${url(L, 'refund-policy')}">${t.policyNames['refund-policy']}</a></p>
  </div>
</section>

<section class="section help-block" id="cancel" aria-labelledby="cn-h">
  <div class="wrap narrow">
    <h2 id="cn-h">${icon('ban')} ${s.cancel.t}</h2>
    <div class="grid-2">
      <div class="card card-sm"><h3>${s.cancel.trialT}</h3>${steps(s.cancel.trial)}</div>
      <div class="card card-sm"><h3>${s.cancel.subT}</h3>${steps(s.cancel.sub)}</div>
    </div>
    <p class="note">${s.cancel.note}</p>
    <p class="btn-row">${mailBtn(s.cancel.mail, s.cancel.subject)} <a class="btn btn-ghost" href="${url(L, 'cancellation-policy')}">${t.policyNames['cancellation-policy']}</a></p>
  </div>
</section>

<section class="section help-block" id="feedback" aria-labelledby="fb-h">
  <div class="wrap narrow">
    <h2 id="fb-h">${icon('bulb')} ${s.feedback.t}</h2>
    <p>${s.feedback.lead}</p>
    ${steps(s.feedback.steps)}
    <p>${mailBtn(s.feedback.mail, s.feedback.subject, true)}</p>
  </div>
</section>

<section class="section" aria-labelledby="bq-h">
  <div class="wrap split split-top">
    <div>
      <h2 id="bq-h">${s.billingT}</h2>
      <div class="faq">${s.billing.map(([q, a]) => `<details><summary>${q}${icon('chevron')}</summary><p>${a}</p></details>`).join('')}</div>
    </div>
    <div class="stack">${billingBox(t)}</div>
  </div>
</section>

<section class="section" aria-labelledby="sfaq-h">
  <div class="wrap narrow">
    <div class="section-head"><h2 id="sfaq-h">${s.faqT}</h2></div>
    <div class="faq">${s.faq.map(([q, a]) => `<details><summary>${q}${icon('chevron')}</summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>`;

  const here = abs(L, 'support');
  return page({
    t,
    key: 'support',
    title: s.title,
    description: s.description,
    body,
    crumbs,
    schema: [
      faqPage([...s.billing, ...s.faq], here),
      howTo(s.help.t, s.help.steps, here, 'get-help'),
      howTo(s.refund.t, s.refund.steps, here, 'refund'),
      howTo(s.cancel.t, [...s.cancel.trial, ...s.cancel.sub], here, 'cancel'),
      howTo(s.feedback.t, s.feedback.steps, here, 'feedback'),
    ],
  });
}
