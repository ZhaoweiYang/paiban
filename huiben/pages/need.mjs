import { AGE_BANDS, FUNCTIONS } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { bandSlug, groupBy } from '../lib/catalog.mjs';
import { bookGrid, bandDot, breadcrumb, sectionHead } from '../lib/components.mjs';

export function needIndex(ctx) {
  const u = linker('need/');
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['按作用', '']])}
  <h1>按作用找绘本</h1>
  <p class="lead">绘本最好的用法，是在孩子正好需要的时候递上一本。下面 ${FUNCTIONS.length} 种作用，每种都按年龄排好了书单。</p>
</div>
<div class="wrap fn-list">
  ${FUNCTIONS.map((f) => {
    const list = ctx.books.filter((b) => b.functions.includes(f.key));
    return `<a class="fn-card" href="${u(`need/${f.key}/`)}">
      <span class="fn-card-head"><span class="fn-card-name">${esc(f.name)}</span><span class="fn-card-count">${list.length} 本</span></span>
      <span class="fn-card-scenario">${esc(f.scenario)}</span>
      <span class="fn-card-desc">${esc(f.desc)}</span>
    </a>`;
  }).join('')}
</div>`;
  return page({ path: 'need/', title: '按作用找绘本', body, active: 'need' });
}

export function needPage(ctx, fn) {
  const path = `need/${fn.key}/`;
  const u = linker(path);
  // Books listing this function first come before those where it is secondary.
  const list = ctx.books
    .filter((b) => b.functions.includes(fn.key))
    .sort((a, b) => (a.functions[0] !== fn.key) - (b.functions[0] !== fn.key) || a.rank - b.rank);
  const groups = groupBy(list, (b) => b.startBand);
  const bands = AGE_BANDS.filter((b) => groups.has(b.key));
  const others = FUNCTIONS.filter((f) => f.key !== fn.key);
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['按作用', 'need/'], [fn.name, '']])}
  <h1>${esc(fn.name)}<span class="h1-sub">${list.length} 本</span></h1>
  <p class="scenario-quote">“${esc(fn.scenario)}”</p>
  <p class="lead">${esc(fn.desc)}书单按孩子可以开始读的年龄排列。</p>
  <nav class="jump" aria-label="按年龄跳转">
    ${bands.map((b) => `<a href="#from-${bandSlug(b.key)}">${bandDot(b.key)}${esc(b.label)}起 <span>${groups.get(b.key).length}</span></a>`).join('')}
  </nav>
</div>
${bands
  .map(
    (band) => `<section class="section section-tight"><div class="wrap">
  ${sectionHead(`${band.label}起`, { id: `from-${bandSlug(band.key)}`, count: groups.get(band.key).length, note: esc(band.name) })}
  ${bookGrid(u, groups.get(band.key))}
</div></section>`,
  )
  .join('')}
<section class="section section-alt"><div class="wrap">
  <h2 class="other-title">其他作用</h2>
  <div class="pill-row">${others.map((f) => `<a class="pill" href="${u(`need/${f.key}/`)}">${esc(f.name)}</a>`).join('')}</div>
</div></section>`;
  return page({
    path,
    title: `${fn.name}绘本`,
    description: `${fn.desc}共 ${list.length} 本，按适读年龄排列，附内容简介和亲子共读建议。`,
    body,
    active: 'need',
  });
}
