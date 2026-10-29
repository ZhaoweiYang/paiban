# ShiftKumo — website

Marketing website for **ShiftKumo** (shiftkumo.com), online employee scheduling software.
English is served at the site root and Japanese under `/ja/`. Visitors whose browser prefers
Japanese are sent to the Japanese pages automatically; an explicit choice in the language
switcher is remembered.

The site is a dependency-free static build (Node 20+) deployed to GitHub Pages by
`.github/workflows/pages.yml` on every push.

## Commands

```bash
npm run build   # renders every page into dist/
npm run serve   # builds for http://localhost:8080 and serves dist/
```

The build fails if any page contains placeholder wording (lorem ipsum, "coming soon", TBD,
unreplaced `{{tokens}}`, …).

## Deploying to Cloudflare Pages

```bash
npm run build:cloudflare    # dist/ for https://shiftkumo.com, with Cloudflare _headers
npm run export:cloudflare   # same, zipped to exports/shiftkumo-cloudflare-pages.zip
```

- **Direct upload:** Cloudflare dashboard → Workers & Pages → Create → Pages → *Upload assets*,
  then upload the zip (or the contents of `dist/`). Or `npx wrangler pages deploy dist`.
- **Git integration:** connect this repository, build command `npm run build`, output directory
  `dist`. Cloudflare sets `CF_PAGES`, which switches the build to Cloudflare mode automatically.
- The site targets `https://shiftkumo.com` (canonical links, hreflang, sitemap, Open Graph). To
  build for another address, set `SITE_URL`, e.g. `SITE_URL=https://shiftkumo.pages.dev`.
- `404.html` is served automatically for unknown paths; `_headers` adds security headers and
  long-lived caching for versioned CSS/JS and fonts.

## Where things live

| What | File |
|---|---|
| Brand, domain, support e-mail, card descriptor, prices, payment links, company details | `site.config.mjs` |
| Business facts every page and policy follows | `docs/FACTS.md` |
| English / Japanese page copy | `src/i18n/en.mjs`, `src/i18n/ja.mjs` |
| Legal policies (10 per language) | `src/legal/en.mjs`, `src/legal/ja.mjs` |
| Page templates | `src/pages/*.mjs` |
| Schema.org JSON-LD | `src/lib/schema.mjs` |
| Styles / scripts / images | `static/assets/` |

## Before going live

1. **Company details** — AVERCYN GLOBAL INC, 1660 LINCOLN STREET, DENVER, CO 80264, USA is set in
   `site.config.mjs`. Optionally add `phone` and `representative`; until then the Japanese commerce
   disclosure (特定商取引法に基づく表記) states that they are disclosed on request.
2. **Payment links** — add your payment provider's hosted checkout URLs to `paymentLinks`
   (per plan and currency). Until a link is set, the checkout button opens a pre-filled e-mail
   to support so the flow still works.
3. **Custom domain** — after registering shiftkumo.com, set it as the custom domain in the
   repository's Pages settings. The workflow picks up the new URL automatically for canonical
   links, hreflang, the sitemap and Open Graph tags.
4. **Mailbox** — create `support@shiftkumo.com`; it is the single contact address used across
   the site.

## Other projects in this repository

`huiben/` holds a separate static site, 世界绘本大全 (a catalogue of children's picture books from
around the world, classified by reading age and purpose). It has its own build and data and does
not affect this site; see `huiben/README.md`.
