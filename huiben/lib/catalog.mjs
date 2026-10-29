// Loads every book record, validates it and adds the derived fields the pages use
// (age bands, region, labels, search text), plus the lookups and orderings shared by pages.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { AGE_BANDS, AGE_OPEN_END, FUNCTIONS, REGIONS, COUNTRIES, AWARDS } from '../data/taxonomy.mjs';
import { validateBooks } from './validate.mjs';
import { hash } from './html.mjs';

export const FN = Object.fromEntries(FUNCTIONS.map((f) => [f.key, f]));
export const BAND = Object.fromEntries(AGE_BANDS.map((b) => [b.key, b]));
export const REGION = Object.fromEntries(REGIONS.map((r) => [r.key, r]));
export const AWARD = Object.fromEntries(AWARDS.map((a) => [a.name, a]));

// URL-safe slug for an age band key ('10+' → '10-plus').
export const bandSlug = (key) => key.replace('+', '-plus');

export const ageLabel = (b) =>
  b.ageMax >= AGE_OPEN_END ? `${b.ageMin} 岁以上` : `${b.ageMin}–${b.ageMax} 岁`;

export const bandsOf = (b) => AGE_BANDS.filter((x) => b.ageMin <= x.max && b.ageMax >= x.min);

// The band a book starts in: where it first becomes suitable.
export const startBand = (b) => AGE_BANDS.find((x) => b.ageMin <= x.max);

export const byTitle = (a, b) => a.titleZh.localeCompare(b.titleZh, 'zh-Hans-CN');

// Default “recommended” order: classics, then award winners, then books with a Chinese
// edition; older books first within each group, since they have stood the test of time.
export const byRecommended = (a, b) =>
  b.classic - a.classic ||
  (b.awards.length > 0) - (a.awards.length > 0) ||
  b.zhEdition - a.zhEdition ||
  a.year - b.year ||
  byTitle(a, b);

export function creditLine(b) {
  return b.authors.map((a) => `${a.nameZh} ${a.role}`).join('，');
}

export async function loadBooks(dir) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.json')).sort();
  const raw = [];
  for (const f of files) {
    const list = JSON.parse(await readFile(join(dir, f), 'utf8'));
    if (!Array.isArray(list)) throw new Error(`${f} 必须是 JSON 数组`);
    raw.push(...list);
  }
  const problems = validateBooks(raw);
  if (problems.length) throw new Error(`绘本数据有 ${problems.length} 个问题：\n${problems.join('\n')}`);

  const books = raw.map((b) => {
    const country = COUNTRIES[b.country];
    const bands = bandsOf(b);
    return {
      ...b,
      awards: b.awards || [],
      classic: !!b.classic,
      countryName: country.name,
      region: country.region,
      bands: bands.map((x) => x.key),
      startBand: startBand(b).key,
      ageLabel: ageLabel(b),
      credit: creditLine(b),
      search: [
        b.titleZh,
        b.titleOriginal,
        ...b.authors.flatMap((a) => [a.name, a.nameZh]),
        ...b.keywords,
        country.name,
        String(b.year),
      ]
        .join(' ')
        .toLowerCase(),
    };
  });
  books.sort(byRecommended);
  books.forEach((b, i) => (b.rank = i));
  return books;
}

// Books most like `book`: shared functions count most, then overlapping ages, then region.
export function related(book, books, n = 6) {
  const fns = new Set(book.functions);
  const bands = new Set(book.bands);
  return books
    .filter((b) => b.id !== book.id)
    .map((b) => {
      const sharedFn = b.functions.filter((f) => fns.has(f)).length;
      const primary = b.functions[0] === book.functions[0] ? 1 : 0;
      const sharedBand = b.bands.filter((x) => bands.has(x)).length;
      return { b, score: sharedFn * 4 + primary * 3 + sharedBand + (b.region === book.region ? 0.5 : 0) };
    })
    .filter((x) => x.score >= 5)
    .sort((x, y) => y.score - x.score || (hash(book.id + x.b.id) % 97) - (hash(book.id + y.b.id) % 97))
    .slice(0, n)
    .map((x) => x.b);
}

// Award name → books that won it (newest award first).
export function awardIndex(books) {
  const map = new Map();
  for (const b of books)
    for (const a of b.awards) {
      if (!map.has(a.name)) map.set(a.name, []);
      map.get(a.name).push({ book: b, year: a.year });
    }
  for (const list of map.values()) list.sort((x, y) => y.year - x.year || byTitle(x.book, y.book));
  return map;
}

// Anchor id for an award on the awards page; stable for any award name.
export const awardAnchor = (name) => `a-${hash(name).toString(36)}`;

export function groupBy(list, keyFn) {
  const map = new Map();
  for (const item of list) {
    const k = keyFn(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}
