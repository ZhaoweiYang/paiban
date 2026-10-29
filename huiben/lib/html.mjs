// Tiny HTML helpers shared by every page template.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

// Joins template fragments, skipping false/null/undefined so conditionals read cleanly.
export const join = (parts, sep = '') => parts.filter((p) => p !== false && p != null && p !== '').join(sep);

// Stable small hash, used to give every book the same spine colour and height on every build.
export function hash(str) {
  let h = 2166136261;
  for (const ch of String(str)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
