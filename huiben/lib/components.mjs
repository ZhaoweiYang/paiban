// Building blocks shared by the page templates: age stickers, book cards, shelf spines.
import { esc, hash } from './html.mjs';
import { FN } from './catalog.mjs';
import { isPreview } from './layout.mjs';

// The preview build has no per-book pages; there a book link opens the catalogue's quick view.
export const bookHref = (u, b) => (isPreview() ? `${u('books/')}#b-${b.id}` : u(`book/${b.id}/`));

// Coloured dot sticker, like the reading-level labels libraries put on spines. Its colour is
// the band the book starts in.
export const sticker = (b, extra = '') =>
  `<span class="sticker band-${esc(b.startBand.replace('+', 'p'))}${extra}" title="适读年龄 ${esc(b.ageLabel)}">${esc(b.ageLabel)}</span>`;

const LANG_ATTR = (b) => (b.language === 'zh' ? '' : ` lang="${esc(b.language)}"`);

export function bookCard(u, b, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  const tags = b.functions.map((f) => `<span class="tag">${esc(FN[f].name)}</span>`).join('');
  const marks = [
    b.awards.length ? `<span class="seal" title="${esc(b.awards.map((a) => `${a.name} ${a.year}`).join('；'))}">获奖</span>` : '',
    !b.zhEdition ? '<span class="mark-nozh" title="暂无中文版，书名为意译">暂无中文版</span>' : '',
  ].join('');
  const original = b.titleOriginal !== b.titleZh ? `<p class="card-orig"${LANG_ATTR(b)}>${esc(b.titleOriginal)}</p>` : '';
  return `<article class="card" data-id="${esc(b.id)}" data-bands="${esc(b.bands.join(' '))}" data-fn="${esc(b.functions.join(' '))}" data-country="${esc(b.country)}" data-region="${esc(b.region)}" data-year="${b.year}" data-rank="${b.rank}" data-zh="${b.zhEdition ? 1 : 0}" data-award="${b.awards.length ? 1 : 0}" data-classic="${b.classic ? 1 : 0}" data-q="${esc(b.search)}">
  <a class="card-link" href="${bookHref(u, b)}" data-book="${esc(b.id)}">
    <div class="card-top">${sticker(b)}<span class="card-meta">${esc(b.countryName)} · ${b.year}</span></div>
    <${h} class="card-title">${esc(b.titleZh)}</${h}>
    ${original}
    <p class="card-by">${esc(b.credit)}</p>
    <p class="card-sum">${esc(b.summary)}</p>
    <div class="card-tags">${tags}${marks}</div>
  </a>
</article>`;
}

export const bookGrid = (u, books, opts) =>
  `<div class="grid">${books.map((b) => bookCard(u, b, opts)).join('\n')}</div>`;

// In vertical text, runs of up to three digits sit upright side by side (纵中横) instead of
// lying on their side.
const verticalText = (title) =>
  esc(title).replace(/(?<![0-9])[0-9]{1,3}(?![0-9])/g, (d) => `<span class="tcy">${d}</span>`);

// Spine colours cycle through the risograph inks defined in site.css (.ink-0 … .ink-7).
export function spine(u, b) {
  const h = hash(b.id);
  const len = [...b.titleZh].length;
  const height = 150 + (h % 6) * 11 + Math.min(len, 9) * 3;
  const width = 34 + (len > 8 ? 8 : len > 5 ? 4 : 0) + ((h >> 4) % 3) * 3;
  return `<a class="spine ink-${h % 8}" href="${bookHref(u, b)}" data-book="${esc(b.id)}" style="--h:${height}px;--w:${width}px" title="${esc(`${b.titleZh} · ${b.countryName} ${b.year}`)}">
  <span class="spine-title">${verticalText(b.titleZh)}</span>
  <span class="spine-mark">${esc(b.country)}</span>
</a>`;
}

export function sectionHead(title, { id = '', count = null, note = '', level = 2 } = {}) {
  return `<div class="section-head"${id ? ` id="${esc(id)}"` : ''}>
  <h${level}>${esc(title)}${count != null ? ` <span class="count">${count} 本</span>` : ''}</h${level}>
  ${note ? `<p>${note}</p>` : ''}
</div>`;
}

export const bandDot = (key) => `<span class="dot band-${esc(key.replace('+', 'p'))}" aria-hidden="true"></span>`;

export const breadcrumb = (u, items) =>
  `<nav class="crumbs" aria-label="当前位置"><a href="${u('')}">首页</a>${items
    .map(([label, href]) => (href ? `<a href="${u(href)}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`))
    .join('')}</nav>`;

