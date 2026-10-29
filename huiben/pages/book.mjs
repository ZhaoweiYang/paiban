import config from '../site.config.mjs';
import { LANGUAGES } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { FN, BAND, REGION, bandSlug, related, awardAnchor } from '../lib/catalog.mjs';
import { bookGrid, sticker, breadcrumb, bandDot } from '../lib/components.mjs';

export const doubanSearch = (b) => `https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(b.titleZh)}&cat=1001`;
export const openLibrarySearch = (b) => `https://openlibrary.org/search?q=${encodeURIComponent(`${b.titleOriginal} ${b.authors[0].name}`)}`;

export default function bookPage(ctx, b) {
  const path = `book/${b.id}/`;
  const u = linker(path);
  const lang = b.language === 'zh' ? '' : ` lang="${esc(b.language)}"`;
  const rel = related(b, ctx.books);
  const primary = FN[b.functions[0]];

  const rows = [
    ['适读年龄', `${sticker(b)} <span class="row-bands">${b.bands.map((k) => `<a href="${u(`age/${bandSlug(k)}/`)}">${bandDot(k)}${esc(BAND[k].label)}</a>`).join('')}</span>`],
    ['作用', b.functions.map((f) => `<a class="tag tag-link" href="${u(`need/${f}/`)}">${esc(FN[f].name)}</a>`).join('')],
    ['作者', b.authors.map((a) => `<span class="person">${esc(a.nameZh)}<span class="person-orig"${lang}>${a.name !== a.nameZh ? esc(a.name) : ''}</span><span class="person-role">${esc(a.role)}</span></span>`).join('')],
    ['国家和地区', `<a href="${u(`world/${b.region}/`)}#c-${b.country.toLowerCase()}">${esc(b.countryName)}</a><span class="muted"> · ${esc(REGION[b.region].name)}</span>`],
    ['原版', `<span${lang}>${esc(b.titleOriginal)}</span><span class="cc-sub">${esc(LANGUAGES[b.language] || b.language)} · ${b.year} 年首版</span>`],
    ['中文版', b.zhEdition ? '有' : '暂无（中文书名为意译）'],
  ];

  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['全部绘本', 'books/'], [b.titleZh, '']])}
</div>
<article class="wrap book">
  <header class="book-head">
    <p class="callno" title="索书号：国家代码 · 首版年份 · 适读年龄">${esc(b.country)} ${b.year} · ${esc(b.ageLabel.replace(' 岁', '岁'))}</p>
    <h1 class="book-title">${esc(b.titleZh)}</h1>
    ${b.titleOriginal !== b.titleZh ? `<p class="book-orig"${lang}>${esc(b.titleOriginal)}</p>` : ''}
    <p class="book-by">${esc(b.credit)}</p>
    ${b.classic ? '<p class="classic-note">经典必读</p>' : ''}
  </header>
  <div class="book-body">
    <div class="book-main">
      <section class="book-section">
        <h2>讲了什么</h2>
        <p class="book-summary">${esc(b.summary)}</p>
      </section>
      <section class="book-section book-tip">
        <h2>共读小建议</h2>
        <p>${esc(b.tip)}</p>
      </section>
      ${
        b.awards.length
          ? `<section class="book-section">
        <h2>获奖</h2>
        <ul class="book-awards">${b.awards
          .map((a) => `<li><span class="seal">奖</span><a href="${u('awards/')}#${esc(awardAnchor(a.name))}">${esc(a.name)}</a><span class="muted">${a.year}</span></li>`)
          .join('')}</ul>
      </section>`
          : ''
      }
      <section class="book-section">
        <h2>主题词</h2>
        <p class="keywords">${b.keywords.map((k) => `<a class="kw" href="${u('books/')}?q=${encodeURIComponent(k)}">${esc(k)}</a>`).join('')}</p>
      </section>
      <p class="book-links">
        ${b.zhEdition ? `<a href="${doubanSearch(b)}" target="_blank" rel="noopener">在豆瓣读书查找中文版</a>` : ''}
        ${b.language !== 'zh' ? `<a href="${openLibrarySearch(b)}" target="_blank" rel="noopener">在 Open Library 查找原版</a>` : ''}
      </p>
    </div>
    <aside class="catalog-card" aria-label="书目信息">
      <dl>${rows.map(([k, v]) => `<div class="cc-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </aside>
  </div>
</article>
${
  rel.length
    ? `<section class="section section-alt"><div class="wrap">
  <div class="section-head"><h2>读完这本，还可以读</h2><p>同样关于${esc(primary.name)}、年龄相近的绘本。</p></div>
  ${bookGrid(u, rel)}
</div></section>`
    : ''
}`;

  return page({
    path,
    title: `《${b.titleZh}》`,
    description: `${b.titleZh}（${b.titleOriginal}），${b.credit}，${b.countryName} ${b.year}。适读年龄 ${b.ageLabel}。${b.summary}`.slice(0, 160),
    body,
    active: 'books',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: b.titleZh,
      alternateName: b.titleOriginal !== b.titleZh ? b.titleOriginal : undefined,
      author: b.authors.filter((a) => a.role !== '图').map((a) => ({ '@type': 'Person', name: a.name })),
      illustrator: b.authors.filter((a) => a.role !== '文').map((a) => ({ '@type': 'Person', name: a.name })),
      datePublished: String(b.year),
      inLanguage: b.language,
      typicalAgeRange: b.ageMax >= 12 ? `${b.ageMin}-` : `${b.ageMin}-${b.ageMax}`,
      genre: b.functions.map((f) => FN[f].name),
      keywords: b.keywords.join(','),
      award: b.awards.map((a) => `${a.name} ${a.year}`),
      description: b.summary,
      ...(config.siteUrl && { url: `${config.siteUrl}/${path}` }),
    },
  });
}
