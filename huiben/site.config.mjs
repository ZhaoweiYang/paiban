// Site-wide settings. SITE_URL (no trailing slash) turns on canonical links, Open Graph URLs
// and the sitemap; without it the site still works from any address, because every
// internal link is relative.
export default {
  name: '世界绘本大全',
  tagline: '按适读年龄和作用分类的全球儿童绘本目录',
  description:
    '收录世界各地的经典与新近儿童绘本，按 0–12 岁适读年龄和情绪管理、习惯养成、入园适应、生命教育等 18 种作用分类，附内容简介与亲子共读建议。',
  siteUrl: (process.env.SITE_URL || '').replace(/\/+$/, ''),
  repoUrl: 'https://github.com/ZhaoweiYang/paiban',
  dataPath: 'huiben/data',
  // Shown in the footer; update when the book list changes.
  dataUpdated: '2026-10-29',
};
