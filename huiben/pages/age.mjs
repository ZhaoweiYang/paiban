import { AGE_BANDS, FUNCTIONS } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { bandSlug, groupBy } from '../lib/catalog.mjs';
import { bookGrid, bandDot, breadcrumb, sectionHead } from '../lib/components.mjs';

export function ageIndex(ctx) {
  const u = linker('age/');
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['按年龄', '']])}
  <h1>按年龄找绘本</h1>
  <p class="lead">年龄只是参考：同一本书，两岁时看画面，五岁时听故事，十岁时读出另一层意思。每本书会出现在它适合的每个年龄段里。</p>
</div>
<div class="wrap band-list">
  ${AGE_BANDS.map((band) => {
    const list = ctx.books.filter((b) => b.bands.includes(band.key));
    return `<a class="band-card" href="${u(`age/${bandSlug(band.key)}/`)}">
      <span class="band-card-head">${bandDot(band.key)}<span class="band-card-label">${esc(band.label)}</span><span class="band-card-name">${esc(band.name)}</span><span class="band-card-count">${list.length} 本</span></span>
      <span class="band-card-intro">${esc(band.intro)}</span>
      <span class="band-card-picks">${list.filter((b) => b.classic).slice(0, 6).map((b) => `《${esc(b.titleZh)}》`).join('')}</span>
    </a>`;
  }).join('')}
</div>`;
  return page({ path: 'age/', title: '按年龄找绘本', body, active: 'age' });
}

export function agePage(ctx, band) {
  const path = `age/${bandSlug(band.key)}/`;
  const u = linker(path);
  const list = ctx.books.filter((b) => b.bands.includes(band.key));
  const picks = list.filter((b) => b.classic).slice(0, 8);
  const groups = groupBy(list, (b) => b.functions[0]);
  const order = FUNCTIONS.filter((f) => groups.has(f.key));
  const body = `
<div class="wrap page-head band-head">
  ${breadcrumb(u, [['按年龄', 'age/'], [band.label, '']])}
  <h1>${bandDot(band.key)}${esc(band.label)}<span class="h1-sub">${esc(band.name)}</span></h1>
  <p class="lead">${esc(band.intro)}</p>
  <div class="tips">
    <h2 class="tips-title">这个年龄怎么读</h2>
    <ul>${band.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  </div>
  <nav class="jump" aria-label="按作用跳转">
    ${order.map((f) => `<a href="#${f.key}">${esc(f.name)} <span>${groups.get(f.key).length}</span></a>`).join('')}
  </nav>
</div>
${
  picks.length
    ? `<section class="section"><div class="wrap">
  ${sectionHead('先读这几本', { note: `这个年龄段里最经典的 ${picks.length} 本，不知道从哪开始就从这里开始。` })}
  ${bookGrid(u, picks)}
</div></section>`
    : ''
}
${order
  .map(
    (f) => `<section class="section section-tight"><div class="wrap">
  ${sectionHead(f.name, { id: f.key, count: groups.get(f.key).length, note: `${esc(f.desc)} <a href="${u(`need/${f.key}/`)}">看全部年龄的${esc(f.name)}绘本</a>` })}
  ${bookGrid(u, groups.get(f.key))}
</div></section>`,
  )
  .join('')}`;
  return page({
    path,
    title: `${band.label}绘本推荐`,
    description: `适合${band.label}（${band.name}）孩子的 ${list.length} 本绘本，按作用分类，附亲子共读建议。`,
    body,
    active: 'age',
  });
}

