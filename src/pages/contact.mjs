import { page, icon, esc, url, config } from '../lib/layout.mjs';
import { mailto } from '../lib/util.mjs';
import { ids } from '../lib/schema.mjs';
import { companyTable } from './about.mjs';

export default function contact(t) {
  const c = t.contact;
  const L = t.lang;
  const crumbs = [
    { name: t.nav.home, href: url(L, 'home') },
    { name: t.nav.contact, href: url(L, 'contact') },
  ];
  const body = `
<section class="page-hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap">
    <p class="eyebrow">${c.eyebrow}</p>
    <h1>${c.h1}</h1>
    <p class="lead">${c.lead}</p>
    <p class="big-mail">${icon('mail')} <a href="mailto:${config.supportEmail}">${config.supportEmail}</a></p>
  </div>
</section>

<section class="section section-tight" aria-labelledby="tp-h">
  <div class="wrap">
    <div class="section-head"><h2 id="tp-h">${c.topicsTitle}</h2></div>
    <div class="grid-3">${c.topics
      .map(
        (x) => `<article class="card card-sm topic"><span class="card-icon">${icon(x.icon)}</span><h3>${x.t}</h3><p>${x.p}</p>
        <p class="subject">${L === 'ja' ? `${c.subjectLabel}「${esc(x.subject)}」` : `${c.subjectLabel}: “${esc(x.subject)}”`}</p>
        <a class="text-link" href="${esc(mailto(x.subject))}">${t.common.emailUs} ${icon('arrow')}</a></article>`
      )
      .join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="form-h">
  <div class="wrap split split-top">
    <div>
      <h2 id="form-h">${c.formTitle}</h2>
      <p>${c.formLead}</p>
      <form class="contact-form" data-contact-form data-to="${config.supportEmail}">
        <noscript><p class="note">${c.noJs(`<a href="mailto:${config.supportEmail}">${config.supportEmail}</a>`)}</p></noscript>
        <div class="field-2">
          <div class="field"><label for="cf-name">${c.form.name}</label><input id="cf-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="cf-email">${c.form.email}</label><input id="cf-email" name="email" type="email" autocomplete="email" required></div>
        </div>
        <div class="field"><label for="cf-topic">${c.form.topic}</label><select id="cf-topic" name="subject">${c.topics
          .map((x) => `<option value="${esc(x.subject)}">${x.t}</option>`)
          .join('')}</select></div>
        <div class="field"><label for="cf-msg">${c.form.message}</label><textarea id="cf-msg" name="body" rows="6" required></textarea></div>
        <button class="btn btn-primary" type="submit" disabled data-js-enable>${icon('send')} ${c.form.send}</button>
      </form>
    </div>
    <div class="stack">
      <div class="card">
        <h2 class="h3">${c.detailsTitle}</h2>
        ${companyTable(t)}
      </div>
      <div class="card">
        <h2 class="h3">${c.responseTitle}</h2>
        <dl class="info-table">${c.response.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      </div>
    </div>
  </div>
</section>`;

  return page({
    t,
    key: 'contact',
    title: c.title,
    description: c.description,
    body,
    crumbs,
    pageType: 'ContactPage',
    pageExtra: { about: { '@id': ids.org }, mainEntity: { '@id': ids.org } },
  });
}
