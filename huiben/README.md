# 世界绘本大全

按**适读年龄**和**作用**分类的全球儿童绘本目录网站。收录世界各地的经典与新近绘本，每本书附中文简介、
亲子共读建议、获奖信息和主题词，可按年龄、作用、国家和地区、奖项组合筛选。

这是一个独立的子项目，与仓库根目录的 ShiftKumo 网站互不影响。零依赖静态生成（Node 20+）。

## 常用命令

在 `huiben/` 目录下运行：

```bash
npm run check    # 只校验绘本数据
npm run build    # 生成网站到 dist/
npm run serve    # 生成并在 http://localhost:8081 预览
npm run export   # 生成并打包成 exports/huiben-site.zip，方便直接上传
```

`node build.mjs --preview` 会生成一个不含单本详情页的精简版（`dist-preview/`），单本书在目录页的弹窗里查看，
适合只能放少量文件的托管环境。

## 网站结构

| 页面 | 路径 |
|---|---|
| 首页：书架、按年龄、按需求、世界各地、获奖、新经典 | `/` |
| 全部绘本（筛选、搜索、排序，筛选条件会写进网址，可直接分享） | `/books/` |
| 按年龄：总览 + 5 个年龄段，每段附阅读建议，按作用分组 | `/age/`、`/age/3-4/` … |
| 按作用：总览 + 18 种作用，按起读年龄分组 | `/need/`、`/need/emotion/` … |
| 世界各地：按地区和国家 | `/world/`、`/world/east-asia/` … |
| 获奖绘本：按奖项列出获奖书目 | `/awards/` |
| 单本详情（含结构化数据 Schema.org Book） | `/book/<id>/` |
| 全部数据 | `/books.json` |

所有站内链接都是相对路径，所以网站放在域名根目录、子目录或直接用浏览器打开本地文件都能用。

## 数据

- 分类体系（年龄段、作用、国家和地区、奖项）：`data/taxonomy.mjs`
- 绘本数据：`data/books/*.json`，每个地区一个文件
- 字段说明：`data/README.md`

构建前会逐条校验数据（字段、取值、id 唯一、疑似重复书目），有问题会直接报错并指出是哪一本。
新增或修改书目后运行 `npm run check` 即可。改完记得更新 `site.config.mjs` 里的 `dataUpdated`。

## 部署

### Cloudflare Pages（推荐）

- **连接 Git 仓库**：Root directory 填 `huiben`，Build command 填 `npm run build`，Build output directory 填 `dist`。
  环境变量 `SITE_URL` 填正式网址（例如 `https://huiben.example.com`），用于 canonical 链接和 sitemap。
- **直接上传**：本地运行 `SITE_URL=https://你的域名 npm run export`，在 Cloudflare 控制台 Workers & Pages →
  Create → Pages → Upload assets 上传 `exports/huiben-site.zip`。

`dist/_headers` 为静态资源设置了长期缓存，`404.html` 会自动用于不存在的路径。

### 其他静态托管

把 `dist/` 上传到任意静态托管即可（GitHub Pages、Netlify、腾讯云 COS、阿里云 OSS 等）。
本仓库的 GitHub Pages 已用于 ShiftKumo 网站，如需用 GitHub Pages 托管本站，建议单独建一个仓库。

网站不加载任何第三方字体或脚本，中国大陆访问不受影响。

## 校验

`.github/workflows/huiben.yml` 会在改动 `huiben/` 的提交和合并请求上运行数据校验与完整构建。
