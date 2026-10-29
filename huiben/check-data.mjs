// Validates book data files without building the site: node huiben/check-data.mjs [file…]
// With no arguments every file in data/books/ is checked, including cross-file duplicates.
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBooks, unknownAwards } from './lib/validate.mjs';

const dir = join(dirname(fileURLToPath(import.meta.url)), 'data', 'books');
const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : (await readdir(dir)).filter((f) => f.endsWith('.json')).map((f) => join(dir, f));

const all = [];
for (const file of files) {
  const books = JSON.parse(await readFile(file, 'utf8'));
  if (!Array.isArray(books)) throw new Error(`${file} 必须是 JSON 数组`);
  for (const b of books) all.push(b);
  console.log(`${basename(file)}: ${books.length} 本`);
}
const problems = validateBooks(all);
// Same original title by the same first author is almost certainly the same book listed twice.
const titles = new Map();
const norm = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
for (const b of all) {
  const key = `${norm(b.titleOriginal)}|${norm(b.authors?.[0]?.name)}`;
  if (titles.has(key)) problems.push(`疑似重复：${b.id} 与 ${titles.get(key)}（原书名和作者相同）`);
  else titles.set(key, b.id);
}
const awards = unknownAwards(all);
if (awards.length) console.log(`非标准奖项名称（请确认）：${awards.join('、')}`);
if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`共 ${problems.length} 个问题`);
  process.exit(1);
}
console.log(`共 ${all.length} 本，全部通过校验`);
