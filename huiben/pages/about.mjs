import config from '../site.config.mjs';
import { AGE_BANDS, FUNCTIONS } from '../data/taxonomy.mjs';
import { esc } from '../lib/html.mjs';
import { page, linker } from '../lib/layout.mjs';
import { breadcrumb, bandDot } from '../lib/components.mjs';

export default function about(ctx) {
  const u = linker('about/');
  const { stats } = ctx;
  const body = `
<div class="wrap page-head">
  ${breadcrumb(u, [['关于', '']])}
  <h1>关于${esc(config.name)}</h1>
  <p class="lead">${esc(config.description)}</p>
</div>
<div class="wrap prose">
  <h2>收录了什么</h2>
  <p>目前收录 ${stats.books} 本绘本，来自 ${stats.countries} 个国家和地区，其中 ${stats.zh} 本已有中文版，${stats.awarded} 本获得过书目级奖项。既有出版半个多世纪仍在加印的经典，也有近十年的新作。选书的标准是：在本国或国际上被广泛认可、至今仍值得给孩子读，并且尽量照顾到每个年龄段和每种需要。</p>

  <h2>年龄怎么分</h2>
  <p>每本书记录一个适读年龄范围（例如 3–6 岁），它会出现在这个范围覆盖到的每个年龄段里。范围是参考，不是限制：孩子的阅读经验比实际年龄更重要。</p>
  <div class="table-scroll">
    <table class="plain-table">
      <thead><tr><th>年龄段</th><th>阶段</th><th>适合的书</th></tr></thead>
      <tbody>${AGE_BANDS.map((b) => `<tr><td class="nowrap">${bandDot(b.key)}${esc(b.label)}</td><td class="nowrap">${esc(b.name)}</td><td>${esc(b.intro)}</td></tr>`).join('')}</tbody>
    </table>
  </div>

  <h2>作用怎么分</h2>
  <p>“作用”指一本书最能帮到孩子的地方。每本书标注 1–3 个，最主要的排在最前面。好的绘本首先是好故事，作用只是帮家长在合适的时候找到合适的书。</p>
  <div class="table-scroll">
    <table class="plain-table">
      <thead><tr><th>作用</th><th>家长常见的情况</th><th>包括</th></tr></thead>
      <tbody>${FUNCTIONS.map((f) => `<tr><td class="nowrap"><a href="${u(`need/${f.key}/`)}">${esc(f.name)}</a></td><td>${esc(f.scenario)}</td><td>${esc(f.desc)}</td></tr>`).join('')}</tbody>
    </table>
  </div>

  <h2>国家和书名</h2>
  <p>书按主要创作者（文图作者，或文字作者）所在的国家归类。有中文版的书使用最通行的简体中文版书名和译名；同一本书常有多个版本，书名和译者以你手上的版本为准。还没有中文版的书，中文书名是意译，并标注“暂无中文版”。</p>

  <h2>纠错与推荐</h2>
  <p>书目信息由编辑整理并尽力核实，难免有疏漏。发现错误、想推荐一本好书，欢迎在 <a href="${esc(config.repoUrl)}/issues" target="_blank" rel="noopener">GitHub Issues</a> 留言，或直接修改 <a href="${esc(config.repoUrl)}/tree/main/${esc(config.dataPath)}" target="_blank" rel="noopener">数据文件</a> 并提交合并请求。</p>
  <p>全部书目数据可以下载为 <a href="${u('books.json')}">JSON 文件</a>。</p>
</div>`;
  return page({ path: 'about/', title: '关于', body, active: 'about' });
}
