import { page, price, currencyToggle, guaranteeBadge, billingBox, icon, esc, url, abs, config } from '../lib/layout.mjs';
import { software, faqPage, ids } from '../lib/schema.mjs';

// Demo board data shared with assets/js/site.js through data attributes.
// Per person, per day: b = both shifts, a = morning only, p = evening only, x = unavailable.
export const DEMO_AVAIL = ['bbaxbpb', 'ppbbxba', 'abbpbxp', 'bxpbabb', 'xabbpbx', 'bpxabap'];
// Pre-filled shifts so the board is meaningful before anyone clicks: [person, day, slot].
const DEMO_START = [
  [0, 0, 'a'], [3, 0, 'a'], [1, 0, 'p'], [5, 0, 'p'],
  [2, 1, 'a'], [4, 1, 'a'], [0, 1, 'p'], [1, 1, 'p'],
];

// Hero board mock: [person][day] -> 'a' | 'p' | 'o' (off).
const BOARD = ['aapoapo', 'poapopa', 'aoaopap', 'ppoaaoa', 'oapaapo', 'apopoaa'];

function heroCanvas(t) {
  const h = t.home;
  const nodes = h.nodes
    .map(
      (n, i) => `<li class="node${i === 1 ? ' node-hot' : ''}" style="--i:${i}"><span class="node-icon">${icon(n.icon)}</span><span class="node-t">${n.t}</span><span class="node-s">${n.s}</span></li>`
    )
    .join('');
  const people = t.home.demo.people;
  const rows = BOARD.map(
    (r, p) =>
      `<div class="b-row"><span class="b-name"><span class="avatar" style="--h:${(p * 57) % 360}">${esc(people[p].slice(0, 1))}</span>${esc(people[p])}</span>${[...r]
        .map((c) =>
          c === 'o'
            ? '<span class="b-cell"></span>'
            : `<span class="b-cell"><span class="shift shift-${c}">${c === 'a' ? '7–15' : '15–23'}</span></span>`
        )
        .join('')}</div>`
  ).join('');
  return `<div class="hero-visual" role="img" aria-label="${esc(h.canvasLabel)}">
    <div class="canvas">
      <ol class="flow">${nodes}</ol>
      <div class="chips">${h.chips.map((c, i) => `<span class="chip chip-${i}">${icon(i === 1 ? 'bell' : 'check')} ${c}</span>`).join('')}</div>
    </div>
    <div class="board">
      <div class="board-head"><strong>${icon('calendar')} ${h.boardTitle}</strong><span>${h.boardMeta}</span></div>
      <div class="b-row b-days"><span></span>${t.home.demo.days.map((d) => `<span>${d}</span>`).join('')}</div>
      ${rows}
    </div>
  </div>`;
}

function tabs(t) {
  const tb = t.home.tabs;
  const icons = { plan: 'sparkles', communicate: 'bell', track: 'clock' };
  return `<section class="section" aria-labelledby="tabs-h">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">${tb.eyebrow}</p><h2 id="tabs-h">${tb.title}</h2></div>
    <div class="tabs" data-tabs>
      <div class="tab-list" role="tablist">${tb.items
        .map(
          (it, i) =>
            `<button type="button" role="tab" id="tab-${it.id}" aria-controls="panel-${it.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${icon(icons[it.id])} ${it.tab}</button>`
        )
        .join('')}</div>
      ${tb.items
        .map(
          (it) => `<div class="tab-panel" role="tabpanel" id="panel-${it.id}" aria-labelledby="tab-${it.id}">
        <div class="tab-copy"><h3>${it.title}</h3><p>${it.p}</p><ul class="checks">${it.bullets.map((b) => `<li>${icon('check')}${b}</li>`).join('')}</ul></div>
        <div class="tab-mock" aria-hidden="true"><div class="mock-head"><span class="dots"><i></i><i></i><i></i></span>${tb.mock[it.id].title}</div><ul>${tb.mock[it.id].rows
          .map((r, i) => `<li style="--i:${i}">${icon(i === tb.mock[it.id].rows.length - 1 ? 'check' : icons[it.id])}<span>${r}</span></li>`)
          .join('')}</ul></div>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

function demo(t) {
  const d = t.home.demo;
  const rate = t.lang === 'ja' ? 1150 : 18;
  const start = new Set(DEMO_START.map((s) => s.join(':')));
  // Server-render the starting stats with the same rules as site.js so the board reads
  // correctly before (or without) JavaScript.
  const NEED = 2, SHIFT_H = 8;
  const dayFilled = d.days.map((_, day) =>
    ['a', 'p'].reduce((n, sl) => n + Math.min(NEED, DEMO_START.filter(([, dd, ss]) => dd === day && ss === sl).length), 0)
  );
  const personH = DEMO_AVAIL.map((_, p) => DEMO_START.filter(([pp]) => pp === p).length * SHIFT_H);
  const hours = DEMO_START.length * SHIFT_H;
  const coverage = Math.round((dayFilled.reduce((a, b) => a + b, 0) / (d.days.length * 2 * NEED)) * 100) + '%';
  const cost =
    t.lang === 'ja'
      ? '¥' + (hours * rate).toLocaleString('en-US')
      : '$' + (hours * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const rows = DEMO_AVAIL.map((av, p) => {
    const cells = [...av]
      .map((c, day) => {
        const slot = (s) => {
          const ok = c === 'b' || c === s;
          const on = start.has(`${p}:${day}:${s}`);
          const label = `${d.people[p]}, ${d.days[day]}, ${s === 'a' ? d.legend[0] : d.legend[1]}`;
          return ok
            ? `<button type="button" disabled class="slot slot-${s}" data-p="${p}" data-d="${day}" data-s="${s}" aria-pressed="${on}" aria-label="${esc(label)}">${s === 'a' ? d.am : d.pm}</button>`
            : `<span class="slot slot-off" title="${d.unavailable}"><span class="sr-only">${esc(label)}: ${d.unavailable}</span></span>`;
        };
        return `<div class="d-cell">${slot('a')}${slot('p')}</div>`;
      })
      .join('');
    return `<div class="d-row"><span class="d-name"><span class="avatar" style="--h:${(p * 57) % 360}">${esc(d.people[p].slice(0, 1))}</span>${esc(d.people[p])}<small data-hours="${p}">${personH[p]}h</small></span>${cells}</div>`;
  }).join('');
  return `<section class="section demo-section" id="demo" aria-labelledby="demo-h">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">${d.eyebrow}</p><h2 id="demo-h">${d.title}</h2><p class="lead"><span class="js-only">${d.lead}</span><noscript>${d.leadNoJs}</noscript></p></div>
    <div class="demo" data-demo data-rate="${rate}" data-cur="${t.lang === 'ja' ? 'jpy' : 'usd'}" data-avail="${DEMO_AVAIL.join(',')}">
      <div class="demo-bar">
        <div class="demo-actions">
          <button type="button" class="btn btn-primary btn-sm" data-demo-auto>${icon('sparkles')} ${d.auto}</button>
          <button type="button" class="btn btn-ghost btn-sm" data-demo-clear>${d.clear}</button>
        </div>
        <dl class="demo-stats" aria-live="polite">
          <div><dt>${d.coverage}</dt><dd data-stat="coverage">${coverage}</dd></div>
          <div><dt>${d.hours}</dt><dd data-stat="hours">${hours}h</dd></div>
          <div><dt>${d.cost}</dt><dd data-stat="cost">${cost}</dd></div>
        </dl>
      </div>
      <div class="demo-grid">
        <div class="d-row d-head"><span class="d-name">${d.need}</span>${d.days.map((x, i) => `<span class="d-day">${x}<small data-day="${i}" class="${dayFilled[i] === NEED * 2 ? 'ok' : 'gap'}">${dayFilled[i]}/${NEED * 2}</small></span>`).join('')}</div>
        ${rows}
      </div>
      <ul class="demo-legend"><li><i class="lg lg-a"></i>${d.legend[0]}</li><li><i class="lg lg-p"></i>${d.legend[1]}</li><li><i class="lg lg-off"></i>${d.legend[2]}</li></ul>
      <p class="sr-only">${d.textAlt}</p>
    </div>
  </div>
</section>`;
}

export default function home(t) {
  const h = t.home;
  const L = t.lang;
  const featureList = t.features.groups.flatMap((g) => g.items.map(([n]) => n));

  const body = `
<section class="hero">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    <p class="eyebrow pill">${icon('calendarCheck')} ${h.eyebrow}</p>
    <h1>${h.h1a} <span class="grad">${h.h1b}</span></h1>
    <p class="lead hero-lead"><strong class="hero-def">${t.oneLiner}</strong> ${h.lead}</p>
    <div class="cta-row">
      <a class="btn btn-primary btn-lg" href="${url(L, 'checkout')}">${t.common.startTrial} ${icon('arrow')}</a>
      <a class="btn btn-ghost btn-lg" href="${url(L, 'pricing')}">${t.common.seePricing}</a>
    </div>
    <p class="micro">${h.micro}</p>
  </div>
  <div class="wrap">${heroCanvas(t)}</div>
</section>

<section class="industries" aria-labelledby="ind-h">
  <div class="wrap">
    <h2 id="ind-h" class="kicker">${h.industriesTitle}</h2>
    <ul class="ind-list">${h.industries.map(([ic, n]) => `<li>${icon(ic)}<span>${n}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="section" aria-labelledby="why-h">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">${h.problem.eyebrow}</p><h2 id="why-h">${h.problem.title}</h2><p class="lead">${h.problem.lead}</p></div>
    <div class="grid-3">${h.problem.items
      .map((it) => `<article class="card"><span class="card-icon">${icon(it.icon)}</span><h3>${it.t}</h3><p>${it.p}</p></article>`)
      .join('')}</div>
  </div>
</section>

${tabs(t)}

<section class="section" aria-labelledby="steps-h">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">${h.steps.eyebrow}</p><h2 id="steps-h">${h.steps.title}</h2></div>
    <ol class="steps">${h.steps.items.map((s, i) => `<li><span class="step-n">${i + 1}</span><h3>${s.t}</h3><p>${s.p}</p></li>`).join('')}</ol>
  </div>
</section>

${demo(t)}

<section class="section" aria-labelledby="bi-h">
  <div class="wrap split">
    <div>
      <p class="eyebrow">${h.bilingual.eyebrow}</p>
      <h2 id="bi-h">${h.bilingual.title}</h2>
      <p class="lead">${h.bilingual.p}</p>
      <ul class="checks">${h.bilingual.bullets.map((b) => `<li>${icon('check')}${b}</li>`).join('')}</ul>
    </div>
    <div class="bi-card" aria-hidden="true">
      ${h.bilingual.sample.map(([a, b, c]) => `<div class="bi-row"><span class="bi-a">${a}</span><span class="bi-b">${b}</span><span class="bi-c">${c}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="sec-h">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">${h.security.eyebrow}</p><h2 id="sec-h">${h.security.title}</h2></div>
    <div class="grid-4">${h.security.items
      .map((it) => `<article class="card card-sm"><span class="card-icon">${icon(it.icon)}</span><h3>${it.t}</h3><p>${it.p}</p></article>`)
      .join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="price-h">
  <div class="wrap">
    <div class="section-head"><p class="eyebrow">${h.pricing.eyebrow}</p><h2 id="price-h">${h.pricing.title}</h2><p class="lead">${h.pricing.lead}</p>${currencyToggle(t)}</div>
    <ul class="mini-plans">${config.plans
      .map(
        (p) => `<li class="${p.bestValue ? 'is-best' : ''}">${p.bestValue ? `<span class="badge">${t.money.bestValue}</span>` : ''}<span class="mp-name">${t.plans[p.id].name}</span>${price(p, t)}<span class="mp-per">${t.plans[p.id].per}</span><a class="mp-link" href="${url(L, 'checkout')}?plan=${p.id}">${t.common.startTrial}<span class="sr-only"> — ${t.plans[p.id].name}</span></a></li>`
      )
      .join('')}</ul>
    <p class="fine plan-terms-note">${h.pricing.terms}</p>
    <div class="price-foot">
      ${guaranteeBadge(t)}
      <a class="btn btn-ghost" href="${url(L, 'pricing')}">${t.common.comparePlans} ${icon('arrow')}</a>
    </div>
    ${billingBox(t, { compact: true })}
  </div>
</section>

<section class="section" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <div class="section-head"><h2 id="faq-h">${h.faqTitle}</h2></div>
    <div class="faq">${h.faq.map(([q, a]) => `<details><summary>${q}${icon('chevron')}</summary><p>${a}</p></details>`).join('')}</div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <h2>${h.cta.title}</h2>
    <p>${h.cta.p}</p>
    <div class="cta-row">
      <a class="btn btn-primary btn-lg" href="${url(L, 'checkout')}">${t.common.startTrial} ${icon('arrow')}</a>
      <a class="btn btn-ghost btn-lg" href="${url(L, 'features')}">${t.nav.features}</a>
    </div>
  </div>
</section>`;

  return page({
    t,
    key: 'home',
    title: h.title,
    description: h.description,
    body,
    bodyClass: 'page-home',
    pageExtra: { about: { '@id': ids.software }, mainEntity: { '@id': ids.software } },
    schema: [software(L, t, featureList), faqPage(h.faq, abs(L, 'home'))],
  });
}
