// The full catalogue with filters. Every card is in the HTML, so the page works without
// JavaScript; site.js adds filtering, sorting, search and URL state on top.
import { AGE_BANDS, FUNCTIONS, REGIONS } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { groupBy } from '../lib/catalog.mjs';
import { bookCard, bandDot } from '../lib/components.mjs';

export default function books(ctx) {
  const { books, stats } = ctx;
  const u = linker('books/');
  const regionOptions = REGIONS.map((r) => {
    const list = books.filter((b) => b.region === r.key);
    if (!list.length) return '';
    const countries = [...groupBy(list, (b) => b.country).entries()].sort((a, b) => b[1].length - a[1].length);
    return `<optgroup label="${esc(r.name)}">
      <option value="${esc(r.key)}">${esc(r.name)}（全部 ${list.length}）</option>
      ${countries.map(([code, l]) => `<option value="${esc(code)}">${esc(l[0].countryName)}（${l.length}）</option>`).join('')}
    </optgroup>`;
  }).join('');

  const body = `
<div class="wrap page-head">
  <h1>全部绘本</h1>
  <p class="lead">${stats.books} 本绘本，按年龄、作用和国家随意组合筛选。</p>
</div>
<div class="wrap catalog" data-catalog>
  <aside class="filters" aria-label="筛选">
    <details class="filters-box" open data-filters>
      <summary>筛选条件</summary>
      <form class="filter-form" data-filter-form>
        <div class="filter-group">
          <label class="filter-label" for="f-q">搜索</label>
          <input id="f-q" name="q" type="search" placeholder="书名、作者、主题词" autocomplete="off" enterkeyhint="search">
        </div>
        <fieldset class="filter-group">
          <legend class="filter-label">孩子的年龄</legend>
          <div class="chips">
            <label class="chip"><input type="radio" name="age" value="" checked><span>不限</span></label>
            ${AGE_BANDS.map((b) => `<label class="chip"><input type="radio" name="age" value="${esc(b.key)}"><span>${bandDot(b.key)}${esc(b.label)}</span></label>`).join('')}
          </div>
        </fieldset>
        <fieldset class="filter-group">
          <legend class="filter-label">作用 <span class="filter-hint">可多选</span></legend>
          <div class="chips">
            ${FUNCTIONS.map((f) => `<label class="chip"><input type="checkbox" name="fn" value="${esc(f.key)}"><span>${esc(f.name)}</span></label>`).join('')}
          </div>
        </fieldset>
        <div class="filter-group">
          <label class="filter-label" for="f-where">国家和地区</label>
          <select id="f-where" name="where">
            <option value="">全部</option>
            ${regionOptions}
          </select>
        </div>
        <fieldset class="filter-group">
          <legend class="filter-label">只看</legend>
          <div class="chips">
            <label class="chip"><input type="checkbox" name="zh" value="1"><span>有中文版</span></label>
            <label class="chip"><input type="checkbox" name="award" value="1"><span>获奖作品</span></label>
            <label class="chip"><input type="checkbox" name="classic" value="1"><span>经典必读</span></label>
          </div>
        </fieldset>
        <button type="reset" class="btn-quiet" data-reset>清除全部筛选</button>
      </form>
    </details>
  </aside>
  <section class="results" aria-label="绘本列表">
    <div class="results-bar">
      <p class="results-count" aria-live="polite" data-count>共 ${stats.books} 本</p>
      <label class="sort"><span>排序</span>
        <select id="f-sort" name="sort" data-sort>
          <option value="rank">推荐</option>
          <option value="new">出版年份（新→旧）</option>
          <option value="old">出版年份（旧→新）</option>
          <option value="title">书名</option>
        </select>
      </label>
    </div>
    <div class="grid" data-grid>
      ${books.map((b) => bookCard(u, b, { headingLevel: 2 })).join('\n')}
    </div>
    <div class="empty" data-empty hidden>
      <p>没有同时满足这些条件的绘本。</p>
      <p>试试减少一个作用，或者把年龄放宽一些。</p>
    </div>
  </section>
</div>`;

  return page({
    path: 'books/',
    title: '全部绘本',
    description: `浏览 ${stats.books} 本世界各地的儿童绘本，可按适读年龄、作用、国家和奖项筛选。`,
    body,
    active: 'books',
  });
}
