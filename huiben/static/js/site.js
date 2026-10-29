// Progressive enhancement for the catalogue: filters, search, sorting, URL state, and a quick
// view that shows a book's details without leaving the page. Every page works without it.
(() => {
  const script = document.currentScript;
  const ROOT = script.dataset.root || './';
  const PREVIEW = script.dataset.preview === '1';
  const page = (path) => ROOT + path + (PREVIEW && (path === '' || path.endsWith('/')) ? 'index.html' : '');

  // Read before the catalogue rewrites the address bar for its filters.
  const bookFromHash = location.hash.startsWith('#b-') ? location.hash.slice(3) : '';

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // In the preview, query strings may not survive navigation, so state travels in the hash.
  function readParams() {
    const h = location.hash.slice(1);
    if (h && !h.startsWith('b-') && h.includes('=')) return new URLSearchParams(h);
    return new URLSearchParams(location.search);
  }
  function writeParams(params) {
    const s = params.toString();
    try {
      if (PREVIEW) history.replaceState(null, '', s ? `#${s}` : location.pathname);
      else history.replaceState(null, '', s ? `?${s}` : location.pathname);
    } catch {
      /* Some embedded viewers refuse history changes; the filters still work. */
    }
  }

  for (const form of document.querySelectorAll('[data-search-form]')) {
    form.addEventListener('submit', (e) => {
      const q = new FormData(form).get('q')?.toString().trim();
      e.preventDefault();
      const target = page('books/');
      location.href = q ? `${target}${PREVIEW ? '#' : '?'}q=${encodeURIComponent(q)}` : target;
    });
  }

  /* ---------- Catalogue ---------- */
  const catalog = document.querySelector('[data-catalog]');
  if (catalog) {
    const form = catalog.querySelector('[data-filter-form]');
    const grid = catalog.querySelector('[data-grid]');
    const sortSel = catalog.querySelector('[data-sort]');
    const countEl = catalog.querySelector('[data-count]');
    const emptyEl = catalog.querySelector('[data-empty]');
    const details = catalog.querySelector('[data-filters]');
    const cards = [...grid.children];
    const total = cards.length;
    const text = new Map(cards.map((c) => [c, (c.dataset.q + ' ' + c.textContent).toLowerCase()]));

    if (matchMedia('(max-width: 860px)').matches) details.open = false;

    const params = readParams();
    form.elements.q.value = params.get('q') || '';
    const age = params.get('age') || '';
    for (const r of form.querySelectorAll('input[name="age"]')) r.checked = r.value === age;
    const fns = new Set((params.get('fn') || '').split(',').filter(Boolean));
    for (const c of form.querySelectorAll('input[name="fn"]')) c.checked = fns.has(c.value);
    form.elements.where.value = params.get('where') || '';
    if (form.elements.where.selectedIndex < 0) form.elements.where.value = '';
    for (const k of ['zh', 'award', 'classic']) form.elements[k].checked = params.get(k) === '1';
    sortSel.value = ['rank', 'new', 'old', 'title'].includes(params.get('sort')) ? params.get('sort') : 'rank';
    if (params.toString() && [...params.keys()].some((k) => k !== 'q' && k !== 'sort')) details.open = true;

    const collator = new Intl.Collator('zh-Hans-CN');
    const titles = new Map(cards.map((c) => [c, c.querySelector('.card-title').textContent]));
    const sorters = {
      rank: (a, b) => a.dataset.rank - b.dataset.rank,
      new: (a, b) => b.dataset.year - a.dataset.year || a.dataset.rank - b.dataset.rank,
      old: (a, b) => a.dataset.year - b.dataset.year || a.dataset.rank - b.dataset.rank,
      title: (a, b) => collator.compare(titles.get(a), titles.get(b)),
    };

    function apply() {
      const q = form.elements.q.value.trim().toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      const ageVal = form.querySelector('input[name="age"]:checked')?.value || '';
      const fnVals = [...form.querySelectorAll('input[name="fn"]:checked')].map((c) => c.value);
      const where = form.elements.where.value;
      const zh = form.elements.zh.checked;
      const award = form.elements.award.checked;
      const classic = form.elements.classic.checked;
      const isCountry = /^[A-Z]{2}$/.test(where);

      let shown = 0;
      for (const c of cards) {
        const d = c.dataset;
        const ok =
          (!ageVal || d.bands.split(' ').includes(ageVal)) &&
          (!fnVals.length || fnVals.some((f) => d.fn.split(' ').includes(f))) &&
          (!where || (isCountry ? d.country === where : d.region === where)) &&
          (!zh || d.zh === '1') &&
          (!award || d.award === '1') &&
          (!classic || d.classic === '1') &&
          terms.every((t) => text.get(c).includes(t));
        c.hidden = !ok;
        if (ok) shown++;
      }
      const sorted = [...cards].sort(sorters[sortSel.value]);
      if (sorted.some((c, i) => grid.children[i] !== c)) grid.append(...sorted);

      countEl.textContent = shown === total ? `共 ${total} 本` : `找到 ${shown} 本（共 ${total} 本）`;
      emptyEl.hidden = shown > 0;

      const p = new URLSearchParams();
      if (q) p.set('q', form.elements.q.value.trim());
      if (ageVal) p.set('age', ageVal);
      if (fnVals.length) p.set('fn', fnVals.join(','));
      if (where) p.set('where', where);
      if (zh) p.set('zh', '1');
      if (award) p.set('award', '1');
      if (classic) p.set('classic', '1');
      if (sortSel.value !== 'rank') p.set('sort', sortSel.value);
      writeParams(p);
    }

    let timer;
    form.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(apply, e.target.name === 'q' ? 150 : 0);
    });
    form.addEventListener('change', apply);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      apply();
    });
    form.addEventListener('reset', () => setTimeout(apply, 0));
    sortSel.addEventListener('change', apply);
    apply();
  }

  /* ---------- Quick view ---------- */
  const layer = document.querySelector('[data-quick-view]');
  let data = null;
  let lastFocus = null;

  async function load() {
    if (!data) {
      const res = await fetch(ROOT + 'books.json');
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      data = {
        ...json,
        byId: new Map(json.books.map((b) => [b.id, b])),
        fn: new Map(json.functions.map((f) => [f.key, f.name])),
        band: new Map(json.ageBands.map((a) => [a.key, a])),
      };
    }
    return data;
  }

  function relatedTo(book) {
    const fns = new Set(book.functions);
    const bands = new Set(book.bands);
    return data.books
      .filter((b) => b.id !== book.id)
      .map((b) => ({ b, s: b.functions.filter((f) => fns.has(f)).length * 4 + (b.functions[0] === book.functions[0] ? 3 : 0) + b.bands.filter((x) => bands.has(x)).length }))
      .filter((x) => x.s >= 5)
      .sort((x, y) => y.s - x.s)
      .slice(0, 6)
      .map((x) => x.b);
  }

  function render(b) {
    const lang = b.language === 'zh' ? '' : ` lang="${esc(b.language)}"`;
    const band = b.startBand.replace('+', 'p');
    const rel = relatedTo(b);
    return `<div class="qv-panel" role="dialog" aria-modal="true" aria-labelledby="qv-title">
      <button type="button" class="qv-close" data-qv-close aria-label="关闭">×</button>
      <div class="qv-head">
        <p class="callno">${esc(b.country)} ${b.year}</p>
        <h2 class="qv-title" id="qv-title">${esc(b.titleZh)}</h2>
        ${b.titleOriginal !== b.titleZh ? `<p class="book-orig"${lang}>${esc(b.titleOriginal)}</p>` : ''}
        <p class="book-by">${esc(b.credit)}</p>
        <div class="qv-meta">
          <span class="sticker band-${esc(band)}">${esc(b.ageLabel)}</span>
          <span>${esc(b.countryName)} · ${b.year}</span>
          ${b.functions.map((f) => `<a class="tag tag-link" href="${page(`need/${f}/`)}">${esc(data.fn.get(f))}</a>`).join('')}
          ${b.awards.map((a) => `<span class="seal" title="${esc(a.name)}">${esc(a.name)} ${a.year}</span>`).join('')}
          ${b.zhEdition ? '' : '<span class="mark-nozh">暂无中文版</span>'}
        </div>
      </div>
      <p class="book-summary">${esc(b.summary)}</p>
      <div class="qv-tip"><strong>共读小建议</strong>${esc(b.tip)}</div>
      <div><h3 class="qv-section-title">主题词</h3><p class="keywords">${b.keywords.map((k) => `<span class="kw">${esc(k)}</span>`).join('')}</p></div>
      ${rel.length ? `<div><h3 class="qv-section-title">还可以读</h3><div class="qv-related">${rel.map((r) => `<button type="button" data-qv-open="${esc(r.id)}">${esc(r.titleZh)}</button>`).join('')}</div></div>` : ''}
      <div class="qv-actions">
        ${PREVIEW ? '' : `<a href="${page(`book/${b.id}/`)}">打开完整页面</a>`}
        ${b.zhEdition ? `<a href="https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(b.titleZh)}&cat=1001" target="_blank" rel="noopener">在豆瓣读书查找 ↗</a>` : ''}
        ${b.language !== 'zh' ? `<a href="https://openlibrary.org/search?q=${encodeURIComponent(b.titleOriginal + ' ' + b.authors[0].name)}" target="_blank" rel="noopener">在 Open Library 查找原版 ↗</a>` : ''}
      </div>
    </div>`;
  }

  async function open(id) {
    try {
      await load();
    } catch {
      return false;
    }
    const b = data.byId.get(id);
    if (!b) return false;
    if (layer.hidden) lastFocus = document.activeElement;
    layer.innerHTML = render(b);
    layer.hidden = false;
    document.body.classList.add('qv-open');
    layer.querySelector('.qv-panel').scrollTop = 0;
    layer.querySelector('[data-qv-close]').focus();
    return true;
  }

  function close() {
    if (layer.hidden) return;
    layer.hidden = true;
    layer.innerHTML = '';
    document.body.classList.remove('qv-open');
    if (location.hash.startsWith('#b-')) {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch {}
    }
    lastFocus?.focus?.();
  }

  if (layer) {
    document.addEventListener('click', async (e) => {
      const link = e.target.closest('a[data-book]');
      if (link && !layer.contains(link) && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        if (!(await open(link.dataset.book))) location.href = link.href;
        return;
      }
      const rel = e.target.closest('[data-qv-open]');
      if (rel) return void open(rel.dataset.qvOpen);
      if (e.target.closest('[data-qv-close]') || e.target === layer) close();
    });
    document.addEventListener('keydown', (e) => {
      if (layer.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const items = [...layer.querySelectorAll('a[href], button')];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    });
    if (bookFromHash) open(bookFromHash);
  }
})();
