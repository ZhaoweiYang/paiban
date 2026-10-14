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

1. **Company details** — fill `company.legalName`, `company.address` (and optionally `phone`,
   `representative`) in `site.config.mjs`. They appear on the About and Contact pages, in every
   policy's contact block, in the Japanese commerce disclosure (特定商取引法に基づく表記) and in
   the Organization JSON-LD. Empty fields are omitted rather than shown as blanks.
2. **Payment links** — add your payment provider's hosted checkout URLs to `paymentLinks`
   (per plan and currency). Until a link is set, the checkout button opens a pre-filled e-mail
   to support so the flow still works.
3. **Custom domain** — after registering shiftkumo.com, set it as the custom domain in the
   repository's Pages settings. The workflow picks up the new URL automatically for canonical
   links, hreflang, the sitemap and Open Graph tags.
4. **Mailbox** — create `support@shiftkumo.com`; it is the single contact address used across
   the site.
