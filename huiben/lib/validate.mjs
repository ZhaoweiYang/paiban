// Checks book records against the schema in data/README.md and the taxonomy. Returns a list
// of human-readable problems; an empty list means the records are valid.
import { FUNCTIONS, COUNTRIES, AWARDS, AGE_OPEN_END } from '../data/taxonomy.mjs';

const FUNCTION_KEYS = new Set(FUNCTIONS.map((f) => f.key));
const AWARD_NAMES = new Set(AWARDS.map((a) => a.name));
const ROLES = new Set(['文/图', '文', '图']);
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HAN = /[㐀-鿿]/;
const THIS_YEAR = new Date().getFullYear();

const len = (s) => [...s].length;
const isText = (v) => typeof v === 'string' && v.trim() === v && v.length > 0;

export function validateBook(b) {
  const p = [];
  const need = (cond, msg) => cond || p.push(msg);

  need(isText(b.id) && ID.test(b.id), 'id 必须是小写字母、数字和连字符');
  need(isText(b.titleZh) && HAN.test(b.titleZh), 'titleZh 必须是中文书名');
  need(isText(b.titleOriginal), 'titleOriginal 缺失');
  need(typeof b.zhEdition === 'boolean', 'zhEdition 必须是 true/false');
  need(Array.isArray(b.authors) && b.authors.length > 0, 'authors 不能为空');
  for (const a of b.authors || []) {
    need(isText(a.name), `作者 name 缺失`);
    need(isText(a.nameZh), `作者 ${a.name} 缺少 nameZh`);
    need(ROLES.has(a.role), `作者 ${a.name} 的 role 只能是 文/图、文、图`);
  }
  need(b.country in COUNTRIES, `country ${b.country} 不在 COUNTRIES 中`);
  need(typeof b.language === 'string' && /^[a-z]{2}$/.test(b.language), 'language 必须是两位小写语言代码');
  need(Number.isInteger(b.year) && b.year >= 1800 && b.year <= THIS_YEAR, 'year 不合理');
  need(Number.isInteger(b.ageMin) && b.ageMin >= 0 && b.ageMin <= AGE_OPEN_END, 'ageMin 必须是 0–12 的整数');
  need(Number.isInteger(b.ageMax) && b.ageMax >= 1 && b.ageMax <= AGE_OPEN_END, 'ageMax 必须是 1–12 的整数');
  need(b.ageMin < b.ageMax, 'ageMin 必须小于 ageMax');
  need(Array.isArray(b.functions) && b.functions.length >= 1 && b.functions.length <= 3, 'functions 需要 1–3 个');
  for (const f of b.functions || []) need(FUNCTION_KEYS.has(f), `未知作用 ${f}`);
  need(new Set(b.functions).size === (b.functions || []).length, 'functions 有重复');
  need(Array.isArray(b.keywords) && b.keywords.length >= 2 && b.keywords.length <= 5, 'keywords 需要 2–5 个');
  for (const k of b.keywords || []) need(isText(k) && len(k) <= 12, `关键词 “${k}” 不合规`);
  need(isText(b.summary) && len(b.summary) >= 40 && len(b.summary) <= 130, `summary 需要 50–100 字（现在 ${len(b.summary || '')}）`);
  need(isText(b.tip) && len(b.tip) >= 15 && len(b.tip) <= 80, `tip 需要 20–60 字（现在 ${len(b.tip || '')}）`);
  if (b.awards !== undefined) {
    need(Array.isArray(b.awards), 'awards 必须是数组');
    for (const a of b.awards || []) {
      need(isText(a.name), '奖项 name 缺失');
      need(Number.isInteger(a.year) && a.year >= b.year && a.year <= THIS_YEAR, `奖项 ${a.name} 的 year 不合理`);
    }
  }
  if (b.classic !== undefined) need(typeof b.classic === 'boolean', 'classic 必须是 true/false');
  const known = new Set(['id', 'titleZh', 'titleOriginal', 'zhEdition', 'authors', 'country', 'language', 'year', 'ageMin', 'ageMax', 'functions', 'keywords', 'summary', 'tip', 'awards', 'classic']);
  for (const k of Object.keys(b)) need(known.has(k), `未知字段 ${k}`);
  return p;
}

export function validateBooks(books) {
  const problems = [];
  const ids = new Map();
  books.forEach((b, i) => {
    const where = `#${i} ${b.id || '?'}（${b.titleZh || b.titleOriginal || ''}）`;
    for (const msg of validateBook(b)) problems.push(`${where}: ${msg}`);
    if (ids.has(b.id)) problems.push(`${where}: id 与 ${ids.get(b.id)} 重复`);
    else ids.set(b.id, where);
  });
  return problems;
}

// Award names outside the canonical list are allowed but reported, so they can be
// normalised or added to the taxonomy.
export function unknownAwards(books) {
  const out = new Set();
  for (const b of books) for (const a of b.awards || []) if (!AWARD_NAMES.has(a.name)) out.add(a.name);
  return [...out];
}
