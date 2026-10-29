import { page, linker } from '../lib/layout.mjs';

// Served for unknown paths at any depth, so its links are absolute from the site's base path.
export default function notFound(ctx) {
  const u = linker('', ctx.basePath);
  const body = `
<div class="wrap page-head notfound">
  <p class="callno">404</p>
  <h1>这一页不在书架上</h1>
  <p class="lead">链接可能写错了，或者这本书换了位置。</p>
  <p class="pill-row"><a class="pill" href="${u('')}">回到首页</a><a class="pill" href="${u('books/')}">浏览全部绘本</a></p>
</div>`;
  return page({ path: '', title: '页面不存在', body, base: ctx.basePath });
}
