import { AWARDS, COUNTRIES } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { awardAnchor } from '../lib/catalog.mjs';
import { breadcrumb, sticker, bookHref } from '../lib/components.mjs';

export default function awards(ctx) {
  const u = linker('awards/');
  // Canonical awards in taxonomy order, then any other award names found in the data.
  const known = AWARDS.filter((a) => ctx.awards.has(a.name));
  const other = [...ctx.awards.keys()].filter((n) => !AWARDS.some((a) => a.name === n)).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  const entries = [
    ...known.map((a) => ({ name: a.name, original: a.original, country: COUNTRIES[a.country]?.name, desc: a.desc, list: ctx.awards.get(a.name) })),
    ...other.map((n) => ({ name: n, original: '', country: '', desc: '', list: ctx.awards.get(n) })),
  ];
  const total = new Set([...ctx.awards.values()].flat().map((x) => x.book.id)).size;
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['获奖绘本', '']])}
  <h1>获奖绘本</h1>
  <p class="lead">本站收录的书中，有 ${total} 本获得过 ${entries.length} 个书目级奖项。奖项按设立国家和影响力排列，年份为获奖年份。</p>
  <nav class="jump" aria-label="跳转到奖项">${entries.map((e) => `<a href="#${awardAnchor(e.name)}">${esc(e.name)} <span>${e.list.length}</span></a>`).join('')}</nav>
</div>
<div class="wrap award-sections">
  ${entries
    .map(
      (e) => `<section class="award-section" id="${awardAnchor(e.name)}">
    <h2>${esc(e.name)}</h2>
    ${e.original || e.country ? `<p class="award-orig">${esc([e.original, e.country].filter(Boolean).join(' · '))}</p>` : ''}
    ${e.desc ? `<p class="award-desc">${esc(e.desc)}</p>` : ''}
    <ol class="award-table">
      ${e.list
        .map(
          ({ book, year }) => `<li>
        <span class="award-year">${year}</span>
        <a class="award-book" href="${bookHref(u, book)}" data-book="${esc(book.id)}">${esc(book.titleZh)}</a>
        <span class="award-by">${esc(book.credit)}</span>
        ${sticker(book, ' sticker-sm')}
      </li>`,
        )
        .join('')}
    </ol>
  </section>`,
    )
    .join('')}
</div>`;
  return page({ path: 'awards/', title: '获奖绘本', description: `凯迪克奖、凯特·格林纳威奖、丰子恺儿童图画书奖等 ${entries.length} 个奖项的获奖绘本。`, body, active: 'awards' });
}
