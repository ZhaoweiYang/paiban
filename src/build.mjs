// Static site generator: renders every page in English (site root) and Japanese (/ja/)
// into dist/, plus sitemap, robots, manifest and llms.txt. No dependencies.
import { rm, mkdir, writeFile, cp, readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { config, LANGS, ROUTES, POLICY_KEYS, abs, BASE, ORIGIN, langPrefix } from './lib/util.mjs';
import en from './i18n/en.mjs';
import ja from './i18n/ja.mjs';
import legalEn from './legal/en.mjs';
import legalJa from './legal/ja.mjs';
import home from './pages/home.mjs';
import features from './pages/features.mjs';
import pricing from './pages/pricing.mjs';
import checkout from './pages/checkout.mjs';
import about from './pages/about.mjs';
import support from './pages/support.mjs';
import contact from './pages/contact.mjs';
import notFound from './pages/notfound.mjs';
import { policyPage, commercePage, legalIndex } from './pages/legal.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Cloudflare Pages build: set by Cloudflare's build system, or pass --cloudflare locally.
const CLOUDFLARE = !!process.env.CF_PAGES || process.argv.includes('--cloudflare');
const out = join(root, 'dist');
const dict = { en, ja };
const legal = { en: legalEn, ja: legalJa };

const renderers = {
  home,
  features,
  pricing,
  checkout,
  about,
  support,
  contact,
  legal: legalIndex,
  'commerce-disclosure': commercePage,
};

async function write(rel, content) {
  const file = join(out, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

// Copy that must never ship: placeholder or test wording.
const FORBIDDEN = /lorem ipsum|coming soon|\bTBD\b|placeholder text|\[insert|準備中|近日公開|〇〇|\{\{|\}\}/i;

async function main() {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(join(root, 'static'), out, { recursive: true });

  const pages = [];
  for (const lang of LANGS) {
    const t = dict[lang];
    for (const key of Object.keys(ROUTES)) {
      let html;
      if (POLICY_KEYS.includes(key)) {
        const doc = legal[lang][key];
        if (!doc) throw new Error(`Missing ${lang} policy: ${key}`);
        html = policyPage(t, key, doc);
      } else {
        html = renderers[key](t);
      }
      const rel = langPrefix(lang) + ROUTES[key] + 'index.html';
      const text = html.replace(/<script[\s\S]*?<\/script>/g, '');
      const bad = text.match(FORBIDDEN);
      if (bad) throw new Error(`Forbidden copy "${bad[0]}" in ${rel}`);
      await write(rel, html);
      pages.push({ lang, key });
    }
  }
  await write('404.html', notFound(en, ja));

  // Sitemap with hreflang alternates.
  const urls = Object.keys(ROUTES)
    .flatMap((key) =>
      LANGS.map(
        (lang) => `  <url>
    <loc>${abs(lang, key)}</loc>
    <lastmod>${config.lastUpdated}</lastmod>
    <changefreq>${key === 'home' || key === 'pricing' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${key === 'home' ? '1.0' : ['pricing', 'features'].includes(key) ? '0.9' : POLICY_KEYS.includes(key) ? '0.5' : '0.7'}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${abs('en', key)}"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${abs('ja', key)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs('en', key)}"/>
  </url>`
      )
    )
    .join('\n');
  await write(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
  );

  await write(
    'robots.txt',
    `# ${config.brand} — all content may be crawled.
User-agent: *
Allow: /

Sitemap: ${ORIGIN}${BASE}sitemap.xml
`
  );

  await write(
    'site.webmanifest',
    JSON.stringify(
      {
        name: config.brand,
        short_name: config.brand,
        description: en.home.description,
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        background_color: '#0c0817',
        theme_color: '#0c0817',
        icons: [
          { src: BASE + 'assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: BASE + 'assets/img/logo-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      null,
      2
    )
  );

  // Plain-text summary for AI crawlers and answer engines.
  const p = config.plans;
  await write(
    'llms.txt',
    `# ${config.brand}

> ${en.home.description}

${config.brand} (${config.domain}) is web-based employee scheduling software for businesses whose staff work in shifts: auto-scheduling from availability and labor rules, availability and time-off requests, shift swaps and open shifts, time clock and timesheets, labor-cost forecasting and CSV/Excel payroll export. Available in English and Japanese.

## Pricing (all features, unlimited employees and locations)
${p.map((x) => `- ${en.plans[x.id].name}: $${x.usd.toFixed(2)} USD or ¥${x.jpy.toLocaleString('en-US')} JPY, billed ${en.plans[x.id].every}`).join('\n')}
- 1-hour free trial on every plan; card required; $0 charged at sign-up; plan price charged automatically 1 hour after the trial starts unless cancelled.
- Auto-renews at the same price until cancelled. Cancel anytime in Settings → Billing.
- 30-Day Money-Back Guarantee: full refund on any payment within 30 days, no questions asked.
- Card statement descriptor: ${config.billingDescriptor}
- Accepted cards: Visa, Mastercard, American Express, JCB, Discover, Diners Club, UnionPay.

## Contact
- Support: ${config.supportEmail} (Mon–Fri 9:00–18:00 JST, reply within 1 business day)

## Pages
${['home', 'features', 'pricing', 'about', 'support', 'contact', 'legal', ...POLICY_KEYS, 'commerce-disclosure']
  .map((k) => `- [${k === 'home' ? 'Home' : en.policyNames[k] || en.nav[k] || k}](${abs('en', k)}) · [日本語](${abs('ja', k)})`)
  .join('\n')}
`
  );

  if (CLOUDFLARE) {
    // Cloudflare Pages response headers (https://developers.cloudflare.com/pages/configuration/headers/).
    // CSS/JS URLs carry a ?v= build stamp and fonts never change, so they can be cached for a year.
    await write(
      '_headers',
      `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000

/assets/css/*
  Cache-Control: public, max-age=31536000, immutable

/assets/js/*
  Cache-Control: public, max-age=31536000, immutable

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/assets/img/*
  Cache-Control: public, max-age=86400

/site.webmanifest
  Content-Type: application/manifest+json
`
    );
  } else {
    await write('.nojekyll', '');
  }
  console.log(`Built ${pages.length} pages + 404 into dist/ for ${ORIGIN}${BASE}${CLOUDFLARE ? ' (Cloudflare Pages)' : ''}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
