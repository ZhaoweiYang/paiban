import { REGIONS } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { groupBy } from '../lib/catalog.mjs';
import { bookGrid, breadcrumb, sectionHead } from '../lib/components.mjs';

const countriesOf = (list) => [...groupBy(list, (b) => b.country).entries()].sort((a, b) => b[1].length - a[1].length);

export function worldIndex(ctx) {
  const u = linker('world/');
  const regions = REGIONS.map((r) => ({ ...r, books: ctx.books.filter((b) => b.region === r.key) })).filter((r) => r.books.length);
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['世界各地', '']])}
  <h1>世界各地的绘本</h1>
  <p class="lead">来自 ${ctx.stats.countries} 个国家和地区。按作者所在的国家归类；合作作品按文字作者归类。</p>
</div>
<div class="wrap world-list">
  ${regions
    .map(
      (r) => `<section class="world-region">
    <h2><a href="${u(`world/${r.key}/`)}">${esc(r.name)}</a> <span class="count">${r.books.length} 本</span></h2>
    <ul class="country-list">
      ${countriesOf(r.books).map(([code, list]) => `<li><a href="${u(`world/${r.key}/`)}#c-${code.toLowerCase()}">${esc(list[0].countryName)}</a><span>${list.length}</span></li>`).join('')}
    </ul>
  </section>`,
    )
    .join('')}
</div>`;
  return page({ path: 'world/', title: '世界各地的绘本', body, active: 'world' });
}

export function regionPage(ctx, region) {
  const path = `world/${region.key}/`;
  const u = linker(path);
  const list = ctx.books.filter((b) => b.region === region.key);
  const countries = countriesOf(list);
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['世界各地', 'world/'], [region.name, '']])}
  <h1>${esc(region.name)}<span class="h1-sub">${list.length} 本</span></h1>
  ${countries.length > 1 ? `<nav class="jump" aria-label="按国家跳转">${countries.map(([code, l]) => `<a href="#c-${code.toLowerCase()}">${esc(l[0].countryName)} <span>${l.length}</span></a>`).join('')}</nav>` : ''}
</div>
${countries
  .map(
    ([code, l]) => `<section class="section section-tight"><div class="wrap">
  ${sectionHead(l[0].countryName, { id: `c-${code.toLowerCase()}`, count: l.length })}
  ${bookGrid(u, l)}
</div></section>`,
  )
  .join('')}`;
  return page({
    path,
    title: `${region.name}绘本`,
    description: `来自${countries.map(([, l]) => l[0].countryName).join('、')}的 ${list.length} 本儿童绘本。`,
    body,
    active: 'world',
  });
}
