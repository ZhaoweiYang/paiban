import { page, icon, url } from '../lib/layout.mjs';

export default function notFound(t, other) {
  const n = t.notFound;
  const L = t.lang;
  const links = ['home', 'features', 'pricing', 'support', 'contact', 'legal'];
  const body = `
<section class="page-hero not-found">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="wrap narrow">
    <p class="eyebrow">404</p>
    <h1>${n.h1}</h1>
    <p class="lead">${n.p}</p>
    <ul class="quick">${links.map((k) => `<li><a href="${url(L, k)}">${icon('arrow')}<span>${k === 'home' ? t.nav.home : k === 'legal' ? t.nav.legal : t.nav[k]}</span></a></li>`).join('')}</ul>
    <div lang="${other.lang}" class="nf-other">
      <h2 class="h3">${other.notFound.h1}</h2>
      <p>${other.notFound.p}</p>
      <ul class="quick">${links.map((k) => `<li><a href="${url(other.lang, k)}">${icon('arrow')}<span>${k === 'home' ? other.nav.home : k === 'legal' ? other.nav.legal : other.nav[k]}</span></a></li>`).join('')}</ul>
    </div>
  </div>
</section>`;
  return page({ t, key: '404', title: n.title, description: n.description, body, robots: 'noindex, follow' });
}
