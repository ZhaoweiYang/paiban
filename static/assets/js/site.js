/* ShiftKumo — progressive enhancements. Every page works without this file. */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };
  var fmt = {
    usd: function (n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD'; },
    jpy: function (n) { return '¥' + Math.round(n).toLocaleString('en-US') + ' JPY'; },
  };

  /* Header: shadow once scrolled; mobile menu toggle. */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  var toggle = $('.nav-toggle');
  var nav = $('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* Remember an explicit language choice so auto-detection never overrides it. The switcher
     links carry ?hl=<lang> (so the choice also sticks when opened in a new tab) plus the page's
     other query parameters (so e.g. the selected checkout plan survives a language switch). */
  var startParams = new URLSearchParams(location.search);
  var hl = startParams.get('hl');
  if (hl === 'en' || hl === 'ja') {
    store.set('sk_lang', hl);
    startParams.delete('hl');
    var rest = startParams.toString();
    if (history.replaceState) history.replaceState(null, '', location.pathname + (rest ? '?' + rest : '') + location.hash);
  }
  function syncLangLinks() {
    var keep = new URLSearchParams(location.search);
    keep.delete('hl');
    $$('[data-set-lang]').forEach(function (a) {
      var q = new URLSearchParams(keep.toString());
      q.set('hl', a.getAttribute('data-set-lang'));
      a.href = new URL(a.href, location.href).pathname + '?' + q.toString();
    });
  }
  $$('[data-set-lang]').forEach(function (a) {
    a.addEventListener('click', function () { store.set('sk_lang', a.getAttribute('data-set-lang')); });
  });
  syncLangLinks();

  /* Currency (USD / JPY). */
  function setCurrency(cur, persist) {
    if (cur !== 'usd' && cur !== 'jpy') return;
    root.setAttribute('data-currency', cur);
    $$('[data-set-currency]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-currency') === cur));
    });
    if (persist) store.set('sk_currency', cur);
    doc.dispatchEvent(new CustomEvent('sk:currency', { detail: cur }));
  }
  var params = new URLSearchParams(location.search);
  setCurrency(params.get('currency') || root.getAttribute('data-currency'), !!params.get('currency'));
  $$('[data-set-currency]').forEach(function (b) {
    b.addEventListener('click', function () { setCurrency(b.getAttribute('data-set-currency'), true); });
  });

  /* Tabs (WAI-ARIA tabs pattern). */
  $$('[data-tabs]').forEach(function (box) {
    var tabs = $$('[role="tab"]', box);
    var panels = $$('[role="tabpanel"]', box);
    function select(i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', String(i === j));
        t.tabIndex = i === j ? 0 : -1;
        panels[j].hidden = i !== j;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
          e.preventDefault();
          var n = k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : (i + (k === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
          select(n, true);
        }
      });
    });
    select(0);
  });

  /* Interactive scheduling demo. */
  var demo = $('[data-demo]');
  if (demo) {
    var avail = demo.getAttribute('data-avail').split(',');
    var rate = Number(demo.getAttribute('data-rate'));
    var demoCur = demo.getAttribute('data-cur');
    var NEED = 2, SHIFT_H = 8, MAX_SHIFTS = 5, DAYS = 7;
    var buttons = $$('.slot[data-p]', demo);
    var btn = function (p, d, s) { return $('.slot[data-p="' + p + '"][data-d="' + d + '"][data-s="' + s + '"]', demo); };
    var on = function (b) { return b && b.getAttribute('aria-pressed') === 'true'; };
    var canWork = function (p, d, s) { var c = avail[p][d]; return c === 'b' || c === s; };

    var stats = function () {
      var filled = 0, total = 0;
      for (var d = 0; d < DAYS; d++) {
        var dayFilled = 0;
        ['a', 'p'].forEach(function (s) {
          var n = 0;
          for (var p = 0; p < avail.length; p++) if (on(btn(p, d, s))) n++;
          dayFilled += Math.min(n, NEED);
        });
        filled += dayFilled;
        var lab = $('[data-day="' + d + '"]', demo);
        if (lab) {
          lab.textContent = dayFilled + '/' + NEED * 2;
          lab.className = dayFilled === NEED * 2 ? 'ok' : 'gap';
        }
      }
      for (var p = 0; p < avail.length; p++) {
        var cnt = buttons.filter(function (b) { return b.getAttribute('data-p') === String(p) && on(b); }).length;
        total += cnt;
        var h = $('[data-hours="' + p + '"]', demo);
        if (h) h.textContent = cnt * SHIFT_H + 'h';
      }
      var hours = total * SHIFT_H;
      $('[data-stat="coverage"]', demo).textContent = Math.round((filled / (DAYS * 2 * NEED)) * 100) + '%';
      $('[data-stat="hours"]', demo).textContent = hours + 'h';
      $('[data-stat="cost"]', demo).textContent = fmt[demoCur](hours * rate).replace(/ (USD|JPY)$/, '');
    };

    var setSlot = function (b, val, animate) {
      b.setAttribute('aria-pressed', String(val));
      if (animate) {
        b.classList.remove('pop');
        void b.offsetWidth;
        b.classList.add('pop');
      }
    };

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var p = b.getAttribute('data-p'), d = b.getAttribute('data-d'), s = b.getAttribute('data-s');
        var other = btn(p, d, s === 'a' ? 'p' : 'a');
        var next = !on(b);
        if (next && on(other)) setSlot(other, false); // one shift per person per day
        setSlot(b, next, true);
        stats();
      });
    });

    // Greedy, fairness-first: fill each shift with the available people who have the
    // fewest shifts so far; one shift per day; no evening followed by next-day morning.
    var plan = function () {
      var count = avail.map(function () { return 0; });
      var a = {};
      var key = function (p, d, s) { return p + ':' + d + ':' + s; };
      for (var d = 0; d < DAYS; d++) {
        ['a', 'p'].forEach(function (s) {
          var cands = [];
          for (var p = 0; p < avail.length; p++) {
            if (!canWork(p, d, s) || a[key(p, d, 'a')] || a[key(p, d, 'p')] || count[p] >= MAX_SHIFTS) continue;
            if (s === 'a' && d > 0 && a[key(p, d - 1, 'p')]) continue;
            cands.push(p);
          }
          cands.sort(function (x, y) { return count[x] - count[y] || x - y; });
          cands.slice(0, NEED).forEach(function (p) { a[key(p, d, s)] = true; count[p]++; });
        });
      }
      return a;
    };

    var timers = [];
    var run = function () {
      timers.forEach(clearTimeout);
      timers = [];
      var target = plan();
      buttons.forEach(function (b) { setSlot(b, false); });
      stats();
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var list = buttons.filter(function (b) {
        return target[b.getAttribute('data-p') + ':' + b.getAttribute('data-d') + ':' + b.getAttribute('data-s')];
      });
      list.sort(function (x, y) { return x.getAttribute('data-d') - y.getAttribute('data-d'); });
      list.forEach(function (b, i) {
        if (reduce) { setSlot(b, true); return; }
        timers.push(setTimeout(function () { setSlot(b, true, true); stats(); }, 40 * i));
      });
      if (reduce) stats();
    };
    $('[data-demo-auto]', demo).addEventListener('click', run);
    $('[data-demo-clear]', demo).addEventListener('click', function () {
      timers.forEach(clearTimeout);
      buttons.forEach(function (b) { setSlot(b, false); });
      stats();
    });
    stats();
  }

  /* Checkout: plan selection, live order summary, validation and hand-off. */
  var form = $('[data-checkout]');
  var coData = $('#checkout-data');
  if (form && coData) {
    form.noValidate = true; // custom messages below replace the native bubbles
    var data = JSON.parse(coData.textContent);
    var byId = {};
    data.plans.forEach(function (p) { byId[p.id] = p; });
    var radios = $$('input[name="plan"]', form);
    var errBox = $('[data-co-error]', form);
    var want = params.get('plan');
    if (want && byId[want]) radios.forEach(function (r) { r.checked = r.value === want; });

    var current = function () {
      var r = radios.filter(function (x) { return x.checked; })[0];
      return byId[r ? r.value : data.plans[0].id];
    };
    var cur = function () { return root.getAttribute('data-currency') === 'jpy' ? 'jpy' : 'usd'; };
    var update = function () {
      var p = current();
      var price = fmt[cur()](p[cur()]);
      $$('[data-co="name"]').forEach(function (el) { el.textContent = p.name; });
      $$('[data-co="term"]').forEach(function (el) { el.textContent = p.term; });
      $$('[data-co="price"]').forEach(function (el) { el.textContent = price; });
      $$('[data-co="every"]').forEach(function (el) { el.textContent = p.every; });
      $$('[data-co="renews"]').forEach(function (el) { el.textContent = p.renews; });
      var note = $('[data-co-note]', form);
      if (note) note.textContent = p.links && p.links[cur()] ? data.submitNote : data.fallbackNote;
      if (history.replaceState) {
        var q = new URLSearchParams(location.search);
        q.set('plan', p.id);
        q.set('currency', cur());
        history.replaceState(null, '', location.pathname + '?' + q.toString() + location.hash);
      }
      syncLangLinks();
    };
    radios.forEach(function (r) { r.addEventListener('change', update); });
    doc.addEventListener('sk:currency', update);
    update();

    var showError = function (msg, field) {
      errBox.textContent = msg;
      errBox.hidden = false;
      if (field) {
        field.setAttribute('aria-invalid', 'true');
        field.focus();
      }
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errBox.hidden = true;
      var email = form.elements.email;
      email.removeAttribute('aria-invalid');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) return showError(data.errEmail, email);
      if (!form.elements.agree.checked) return showError(data.errAgree, form.elements.agree);

      var p = current();
      var c = cur();
      var link = p.links && p.links[c];
      if (link) {
        location.href = link + (link.indexOf('?') > -1 ? '&' : '?') + 'prefilled_email=' + encodeURIComponent(email.value.trim());
        return;
      }
      var L = data.labels;
      var body = [
        data.intro,
        '',
        L.plan + ': ' + p.name,
        L.period + ': ' + p.term,
        L.firstCharge + ': ' + fmt[c](p[c]),
        L.renews + ': ' + p.renews,
        L.email + ': ' + email.value.trim(),
        L.name + ': ' + form.elements.name.value.trim(),
        L.company + ': ' + form.elements.company.value.trim(),
      ].join('\n');
      var subject = data.subject.replace('{plan}', p.name).replace('{cur}', c.toUpperCase());
      $('[data-co-note]', form).textContent = data.fallbackNote;
      location.href = 'mailto:' + data.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* Contact form: compose an e-mail in the visitor's mail app. */
  var cf = $('[data-contact-form]');
  if (cf) {
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!cf.reportValidity()) return;
      var el = cf.elements;
      var subject = el.topic.value + ' — ' + el.name.value.trim();
      var body = el.message.value.trim() + '\n\n' + el.name.value.trim() + '\n' + el.email.value.trim();
      location.href = 'mailto:' + cf.getAttribute('data-to') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  /* Legal pages: highlight the current section in the table of contents. */
  var tocLinks = $$('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
          var a = map[en.target.id];
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    $$('.legal-body h2[id]').forEach(function (h) { io.observe(h); });
  }

  /* Storage notice (informational: only strictly necessary preferences are stored). */
  var notice = $('[data-cookie-notice]');
  if (notice && !store.get('sk_notice')) {
    notice.hidden = false;
    $('[data-cookie-ok]', notice).addEventListener('click', function () {
      store.set('sk_notice', '1');
      notice.hidden = true;
    });
  }
})();
