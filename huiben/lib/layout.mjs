// Page shell (head, header, footer) and the relative-URL helper every template uses.
// Links are relative so the same build works at a domain root, under a sub-path, from
// file:// and in the single-folder preview.
import config from '../site.config.mjs';
import { esc, join } from './html.mjs';

const mode = { preview: false, assetVersion: '1', stats: null, updated: '' };
export const setMode = (m) => Object.assign(mode, m);
export const isPreview = () => mode.preview;

// `from` is the page's own directory ('' for the home page, 'book/xyz/' …); `to` is a site
// path such as 'books/' or 'assets/css/site.css'. The preview has no directory indexes, so
// directory links point at their index.html there.
// Passing `base` (an absolute path such as '/') makes links absolute instead, for the 404 page,
// which is served at whatever path was requested.
export function linker(from, base = null) {
  const up = base ?? '../'.repeat(from.split('/').filter(Boolean).length);
  return (to = '') => {
    let [, path, rest] = to.match(/^([^?#]*)(.*)$/);
    if (mode.preview && (path === '' || path.endsWith('/'))) path += 'index.html';
    return (up + path || './') + rest;
  };
}

const NAV = [
  ['books/', '全部绘本', 'books'],
  ['age/', '按年龄', 'age'],
  ['need/', '按作用', 'need'],
  ['world/', '世界各地', 'world'],
  ['awards/', '获奖绘本', 'awards'],
  ['about/', '关于', 'about'],
];

function header(u, active) {
  return `<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="${u('')}" aria-label="${esc(config.name)} 首页">
      <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="6" height="20" rx="1" class="bm-a"/><rect x="11" y="3" width="6" height="23" rx="1" class="bm-b"/><rect x="18.5" y="8" width="6" height="18" rx="1" transform="rotate(-12 21.5 17)" class="bm-c"/><rect x="2" y="26" width="28" height="3" rx="1" class="bm-shelf"/></svg>
      <span class="brand-name">${esc(config.name)}</span>
    </a>
    <form class="header-search" action="${u('books/')}" method="get" role="search" data-search-form>
      <label class="sr-only" for="header-q">搜索书名、作者或主题</label>
      <input id="header-q" name="q" type="search" placeholder="搜书名、作者、主题…" autocomplete="off" enterkeyhint="search">
      <button type="submit" aria-label="搜索"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4.5 4.5"/></svg></button>
    </form>
    <nav class="site-nav" aria-label="主导航">
      ${NAV.map(([href, label, key]) => `<a href="${u(href)}"${key === active ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
    </nav>
  </div>
</header>`;
}

function footer(u) {
  const s = mode.stats;
  return `<footer class="site-footer">
  <div class="wrap footer-row">
    <div class="footer-about">
      <p class="footer-name">${esc(config.name)}</p>
      <p>${esc(config.tagline)}。${s ? `目前收录 ${s.books} 本绘本，来自 ${s.countries} 个国家和地区。` : ''}</p>
      <p class="footer-note">书目信息由编辑整理，仅作选书参考；版本与译名以实际出版物为准。发现错误或想推荐好书，欢迎到 <a href="${esc(config.repoUrl)}/issues" rel="noopener" target="_blank">GitHub</a> 告诉我们。</p>
    </div>
    <nav class="footer-nav" aria-label="页脚导航">
      ${NAV.map(([href, label]) => `<a href="${u(href)}">${label}</a>`).join('')}
      <a href="${u('books.json')}">数据下载（JSON）</a>
    </nav>
  </div>
  ${mode.updated ? `<div class="wrap footer-meta">数据更新：${esc(mode.updated)}</div>` : ''}
</footer>`;
}

export function page({ path, title, description, body, active = '', jsonLd = null, bare = false, base = null }) {
  const u = linker(path, base);
  // The preview is published under the site's bare name.
  const fullTitle = title ? `${title} · ${config.name}` : mode.preview ? config.name : `${config.name} · ${config.tagline}`;
  const desc = description || config.description;
  const canonical = config.siteUrl && !mode.preview ? `${config.siteUrl}/${path}` : '';
  const v = mode.preview ? '' : `?v=${mode.assetVersion}`;
  const head = join(
    [
      `<title>${esc(fullTitle)}</title>`,
      `<meta name="claude:viewport-fit-sides" content="cover">`,
      `<meta name="description" content="${esc(desc)}">`,
      `<meta name="theme-color" content="#f7f8fb" media="(prefers-color-scheme: light)">`,
      `<meta name="theme-color" content="#141824" media="(prefers-color-scheme: dark)">`,
      canonical && `<link rel="canonical" href="${esc(canonical)}">`,
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="${esc(config.name)}">`,
      `<meta property="og:title" content="${esc(title || config.name)}">`,
      `<meta property="og:description" content="${esc(desc)}">`,
      canonical && `<meta property="og:url" content="${esc(canonical)}">`,
      `<meta property="og:locale" content="zh_CN">`,
      `<link rel="icon" href="${u('assets/img/favicon.svg')}" type="image/svg+xml">`,
      `<link rel="stylesheet" href="${u(`assets/css/site.css${v}`)}">`,
      jsonLd && `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
    ],
    '\n',
  );
  const content = `${header(u, active)}
<main id="main">
${body}
</main>
${footer(u)}
<div class="quick-view" data-quick-view hidden></div>
<script src="${u(`assets/js/site.js${v}`)}" data-root="${u('')}" data-preview="${mode.preview ? '1' : ''}" defer></script>`;

  // The preview's root page is wrapped in a document skeleton by the host.
  if (bare) return `${head}\n<a class="skip" href="#main">跳到正文</a>\n${content}\n`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
</head>
<body>
<a class="skip" href="#main">跳到正文</a>
${content}
</body>
</html>
`;
}
