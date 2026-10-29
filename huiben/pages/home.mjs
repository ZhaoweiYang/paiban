import config from '../site.config.mjs';
import { AGE_BANDS, FUNCTIONS, REGIONS } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { bandSlug, groupBy, AWARD } from '../lib/catalog.mjs';
import { bookGrid, spine, bandDot, bookHref } from '../lib/components.mjs';

// Classics for the hero shelf, taken in turn from each region so the shelf reads as “the world”.
function shelfBooks(books, n) {
  const byRegion = [...groupBy(books.filter((b) => b.classic), (b) => b.region).values()];
  const out = [];
  for (let i = 0; out.length < n && byRegion.some((l) => l.length > i); i++)
    for (const list of byRegion) if (list[i] && out.length < n) out.push(list[i]);
  return out;
}

export default function home(ctx, { bare = false } = {}) {
  const { books, stats } = ctx;
  const u = linker('');
  const byBand = (key) => books.filter((b) => b.bands.includes(key)).length;
  const byFn = (key) => books.filter((b) => b.functions.includes(key)).length;
  const regions = REGIONS.map((r) => ({ ...r, books: books.filter((b) => b.region === r.key) })).filter((r) => r.books.length);
  const newest = books.filter((b) => b.year >= 2015).sort((a, b) => b.year - a.year || a.rank - b.rank).slice(0, 8);
  const caldecott = (ctx.awards.get('凯迪克金奖') || []).slice(0, 5);
  const fengzikai = (ctx.awards.get('丰子恺儿童图画书奖') || []).slice(0, 5);

  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">收录 ${stats.books} 本 · ${stats.countries} 个国家和地区 · ${FUNCTIONS.length} 种作用</p>
      <h1>${esc(config.name)}</h1>
      <p class="lead">给 0–12 岁的孩子选绘本：按年龄找，按孩子眼下的需要找，也可以看看世界各地的孩子在读什么。</p>
      <form class="big-search" action="${u('books/')}" method="get" role="search" data-search-form>
        <label class="sr-only" for="home-q">搜索绘本</label>
        <input id="home-q" name="q" type="search" placeholder="试试“好饿的毛毛虫”“分离焦虑”或“宫西达也”" autocomplete="off" enterkeyhint="search">
        <button type="submit">找绘本</button>
      </form>
    </div>
  </div>
  <div class="shelf-wrap">
    <div class="shelf" role="list" aria-label="各国经典绘本书架">
      ${shelfBooks(books, 28).map((b) => `<div role="listitem">${spine(u, b)}</div>`).join('')}
    </div>
    <div class="shelf-board" aria-hidden="true"></div>
    <p class="wrap shelf-caption">书架上是各国公认的经典。点一本，看看讲了什么。</p>
  </div>
</section>

<section class="section" aria-labelledby="by-age">
  <div class="wrap">
    <div class="section-head">
      <h2 id="by-age">按年龄找</h2>
      <p>同一本书会出现在它适合的每个年龄段。色点和图书馆书脊上的分级贴纸一样，标出这本书从几岁开始适合读。</p>
    </div>
    <div class="age-row">
      ${AGE_BANDS.map(
        (band) => `<a class="age-tile" href="${u(`age/${bandSlug(band.key)}/`)}">
        <span class="age-tile-top">${bandDot(band.key)}<span class="age-tile-label">${esc(band.label)}</span></span>
        <span class="age-tile-name">${esc(band.name)}</span>
        <span class="age-tile-intro">${esc(band.intro)}</span>
        <span class="age-tile-count">${byBand(band.key)} 本</span>
      </a>`,
      ).join('')}
    </div>
  </div>
</section>

<section class="section section-alt" aria-labelledby="by-need">
  <div class="wrap">
    <div class="section-head">
      <h2 id="by-need">孩子最近……</h2>
      <p>从孩子眼下的状况出发。每一种作用下都按年龄排好了书单。</p>
    </div>
    <div class="need-grid">
      ${FUNCTIONS.map(
        (f) => `<a class="need" href="${u(`need/${f.key}/`)}">
        <span class="need-scenario">${esc(f.scenario)}</span>
        <span class="need-meta"><span class="need-name">${esc(f.name)}</span><span class="need-count">${byFn(f.key)} 本</span></span>
      </a>`,
      ).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="by-world">
  <div class="wrap">
    <div class="section-head">
      <h2 id="by-world">世界各地的绘本</h2>
      <p>同样是讲爱、勇气和告别，不同文化的画家会画出完全不同的样子。</p>
    </div>
    <div class="region-grid">
      ${regions
        .map((r) => {
          const countries = [...groupBy(r.books, (b) => b.country).entries()].sort((a, b) => b[1].length - a[1].length);
          return `<a class="region" href="${u(`world/${r.key}/`)}">
          <span class="region-name">${esc(r.name)}</span>
          <span class="region-count">${r.books.length} 本</span>
          <span class="region-countries">${countries.map(([, list]) => esc(list[0].countryName)).join(' · ')}</span>
        </a>`;
        })
        .join('')}
    </div>
  </div>
</section>

${
  caldecott.length || fengzikai.length
    ? `<section class="section section-alt" aria-labelledby="by-award">
  <div class="wrap">
    <div class="section-head">
      <h2 id="by-award">获奖绘本</h2>
      <p>奖项不是选书的唯一标准，但它是了解一个地区绘本水准的好入口。</p>
    </div>
    <div class="award-cols">
      ${[['凯迪克金奖', caldecott], ['丰子恺儿童图画书奖', fengzikai]]
        .filter(([, list]) => list.length)
        .map(
          ([name, list]) => `<div class="award-col">
        <h3>${esc(name)}</h3>
        <p class="award-desc">${esc(AWARD[name].desc)}</p>
        <ol class="award-list">
          ${list.map(({ book, year }) => `<li><span class="award-year">${year}</span><a href="${bookHref(u, book)}" data-book="${esc(book.id)}">${esc(book.titleZh)}</a><span class="award-by">${esc(book.authors[0].nameZh)}</span></li>`).join('')}
        </ol>
      </div>`,
        )
        .join('')}
    </div>
    <p class="more"><a href="${u('awards/')}">查看全部 ${ctx.awards.size} 个奖项的获奖书目</a></p>
  </div>
</section>`
    : ''
}

${
  newest.length
    ? `<section class="section" aria-labelledby="newest">
  <div class="wrap">
    <div class="section-head">
      <h2 id="newest">近十年的新经典</h2>
      <p>2015 年以后出版、已经被各国读者和评委认可的作品。</p>
    </div>
    ${bookGrid(u, newest)}
    <p class="more"><a href="${u('books/')}">浏览全部 ${stats.books} 本绘本</a></p>
  </div>
</section>`
    : ''
}
`;

  return page({
    path: '',
    title: '',
    body,
    bare,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.name,
      description: config.description,
      inLanguage: 'zh-CN',
      ...(config.siteUrl && {
        url: `${config.siteUrl}/`,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${config.siteUrl}/books/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  });
}
