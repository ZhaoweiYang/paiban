// Static site generator for the picture-book catalogue. No dependencies.
//   node build.mjs            → dist/ (one page per book, sitemap when SITE_URL is set)
//   node build.mjs --preview  → dist-preview/ (no per-book pages; books open in a quick view,
//                               and directory links point at index.html, for single-folder hosts)
import { rm, mkdir, writeFile, cp, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import config from './site.config.mjs';
import { AGE_BANDS, FUNCTIONS, REGIONS } from './data/taxonomy.mjs';
import { loadBooks, awardIndex, bandSlug } from './lib/catalog.mjs';
import { setMode } from './lib/layout.mjs';
import { hash } from './lib/html.mjs';
import home from './pages/home.mjs';
import books from './pages/books.mjs';
import { ageIndex, agePage } from './pages/age.mjs';
import { needIndex, needPage } from './pages/need.mjs';
import { worldIndex, regionPage } from './pages/world.mjs';
import bookPage from './pages/book.mjs';
import awards from './pages/awards.mjs';
import about from './pages/about.mjs';
import notFound from './pages/notfound.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const PREVIEW = process.argv.includes('--preview');
const out = join(root, PREVIEW ? 'dist-preview' : 'dist');
const dataDir = process.env.HUIBEN_DATA || join(root, 'data', 'books');

// Copy that must never ship.
const FORBIDDEN = /lorem ipsum|coming soon|\bTBD\b|\bTODO\b|placeholder|待补充|敬请期待|\{\{|\}\}|undefined|NaN|\[object /i;

async function write(rel, content) {
  const file = join(out, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

async function main() {
  const list = await loadBooks(dataDir);
  if (!list.length) throw new Error(`没有找到任何绘本数据（${dataDir}）`);
  const stats = {
    books: list.length,
    countries: new Set(list.map((b) => b.country)).size,
    zh: list.filter((b) => b.zhEdition).length,
    awarded: list.filter((b) => b.awards.length).length,
  };
  const css = await readFile(join(root, 'static', 'css', 'site.css'), 'utf8');
  const js = await readFile(join(root, 'static', 'js', 'site.js'), 'utf8');
  setMode({
    preview: PREVIEW,
    assetVersion: hash(css + js).toString(36),
    stats,
    updated: config.dataUpdated,
  });
  const basePath = config.siteUrl ? new URL(`${config.siteUrl}/`).pathname : '/';
  const ctx = { books: list, stats, awards: awardIndex(list), preview: PREVIEW, basePath };

  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(join(root, 'static'), join(out, 'assets'), { recursive: true });

  const pages = [
    ['index.html', home(ctx, { bare: false })],
    ['books/index.html', books(ctx)],
    ['age/index.html', ageIndex(ctx)],
    ...AGE_BANDS.map((b) => [`age/${bandSlug(b.key)}/index.html`, agePage(ctx, b)]),
    ['need/index.html', needIndex(ctx)],
    ...FUNCTIONS.map((f) => [`need/${f.key}/index.html`, needPage(ctx, f)]),
    ['world/index.html', worldIndex(ctx)],
    ...REGIONS.filter((r) => list.some((b) => b.region === r.key)).map((r) => [`world/${r.key}/index.html`, regionPage(ctx, r)]),
    ['awards/index.html', awards(ctx)],
    ['about/index.html', about(ctx)],
    ...(PREVIEW ? [] : list.map((b) => [`book/${b.id}/index.html`, bookPage(ctx, b)])),
  ];
  if (PREVIEW) pages[0] = ['index.html', home(ctx, { bare: true })];
  else pages.push(['404.html', notFound(ctx)]);

  for (const [rel, html] of pages) {
    const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    const bad = text.match(FORBIDDEN);
    if (bad) throw new Error(`页面 ${rel} 含有不应发布的文字 “${bad[0]}”`);
    await write(rel, html);
  }

  // Data for the quick view and for anyone who wants the list.
  const pick = ({ search, rank, ...b }) => b;
  await write(
    'books.json',
    JSON.stringify({
      name: config.name,
      updated: config.dataUpdated,
      functions: FUNCTIONS.map(({ key, name }) => ({ key, name })),
      ageBands: AGE_BANDS.map(({ key, label, name }) => ({ key, slug: bandSlug(key), label, name })),
      books: list.map(pick),
    }),
  );

  if (!PREVIEW) {
    await write(
      '_headers',
      ['/assets/*', '  Cache-Control: public, max-age=31536000, immutable', '/*', '  X-Content-Type-Options: nosniff', '  Referrer-Policy: strict-origin-when-cross-origin', ''].join('\n'),
    );
    if (config.siteUrl) {
      const urls = pages.filter(([rel]) => rel.endsWith('index.html')).map(([rel]) => `${config.siteUrl}/${rel.replace(/index\.html$/, '')}`);
      await write(
        'sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((l) => `  <url><loc>${l}</loc><lastmod>${config.dataUpdated}</lastmod></url>`).join('\n')}\n</urlset>\n`,
      );
      await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
    } else {
      await write('robots.txt', 'User-agent: *\nAllow: /\n');
    }
  }

  console.log(
    `已生成 ${pages.length} 个页面 → ${out}\n` +
      `${stats.books} 本绘本，${stats.countries} 个国家和地区，${stats.zh} 本有中文版，${stats.awarded} 本获奖` +
      (config.siteUrl || PREVIEW ? '' : '\n提示：未设置 SITE_URL，已跳过 canonical 链接和 sitemap.xml'),
  );
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
