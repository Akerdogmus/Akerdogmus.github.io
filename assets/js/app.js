(function () {
  'use strict';

  // ---- UI strings (content lives in /data/*.json) ----
  var UI = {
    en: {
      skip: 'Skip to content',
      navMap: './research-map', navBook: './book', navApps: './apps',
      langBtn: '[TR]', langLabel: "Türkçe'ye geç",
      mapEyebrow: '// research map', mapTitle: 'Themes, projects, papers & code',
      appsEyebrow: '// apps & software', appsTitle: "Things I've built",
      toolsTitle: '// robotics & simulation tools',
      built: 'built with GitHub Pages',
      all: 'All', filterLabel: 'Filter by theme',
      perYear: '// publications per year',
      statsCmd: 'stats --source researchgate',
      stat: { publications: 'publications', books: 'books', citations: 'citations', reads: 'reads' },
      asOf: 'as of',
      book: '// book', viewBook: 'View book →', otherStore: 'Kitapyurdu',
      pages: 'pp',
      liveDemo: 'Live demo ↗', source: 'Source code', screenshots: 'Screenshots',
      type: { article: 'Article', conference: 'Conference', preprint: 'Preprint' },
      fullText: 'full text',
      loadError: 'Content could not be loaded. If you opened the file directly, serve the folder over HTTP (e.g. python -m http.server).'
    },
    tr: {
      skip: 'İçeriğe geç',
      navMap: './araştırma', navBook: './kitap', navApps: './uygulamalar',
      langBtn: '[EN]', langLabel: 'Switch to English',
      mapEyebrow: '// araştırma haritası', mapTitle: 'Alanlar, projeler, yayınlar ve kod',
      appsEyebrow: '// uygulamalar ve yazılım', appsTitle: 'Geliştirdiklerim',
      toolsTitle: '// robotik ve simülasyon araçları',
      built: 'GitHub Pages ile yayında',
      all: 'Tümü', filterLabel: 'Alana göre filtrele',
      perYear: '// yıllara göre yayınlar',
      statsCmd: 'stats --source researchgate',
      stat: { publications: 'yayın', books: 'kitap', citations: 'atıf', reads: 'okunma' },
      asOf: 'tarih',
      book: '// kitap', viewBook: 'Kitabı incele →', otherStore: 'Kitapyurdu',
      pages: 's.',
      liveDemo: 'Canlı demo ↗', source: 'Kaynak kod', screenshots: 'Ekran görüntüleri',
      type: { article: 'Makale', conference: 'Bildiri', preprint: 'Ön baskı' },
      fullText: 'tam metin',
      loadError: 'İçerik yüklenemedi. Dosyayı doğrudan açtıysanız klasörü bir HTTP sunucusuyla açın (ör. python -m http.server).'
    }
  };

  var ICON = {
    code: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    book: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    pin: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    codeSm: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
  };

  var state = { lang: initialLang(), theme: 'all', shots: {} };
  var D = null;

  function initialLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'tr' || q === 'en') return q;
    try { var s = localStorage.getItem('lang'); if (s === 'tr' || s === 'en') return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Pick the current language from a {en, tr} object, or return plain values unchanged.
  function L(v) { return v && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'tr' in v) ? (v[state.lang] || v.en) : v; }
  function t(k) { return UI[state.lang][k]; }
  function $(id) { return document.getElementById(id); }

  function renderStatic() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    var b = $('langToggle'); b.textContent = t('langBtn'); b.setAttribute('aria-label', t('langLabel'));
    $('themeTabs').setAttribute('aria-label', t('filterLabel'));
    $('year').textContent = new Date().getFullYear();
  }

  function renderProfile() {
    var p = D.profile;
    var avatar = p.photo ? '<img src="' + esc(p.photo) + '" alt="">' : esc(p.initials);
    var links = p.links.map(function (l) { return '<a href="' + esc(l.url) + '">' + (ICON[l.icon] || '') + esc(l.label) + '</a>'; }).join('');
    $('profile').innerHTML =
      '<div class="avatar" aria-hidden="true">' + avatar + '</div>' +
      '<p class="status">● ' + esc(L(p.status)) + '</p>' +
      '<h1 class="name">' + esc(p.name) + '</h1>' +
      '<p class="roles">' + L(p.roles).map(esc).join('<br>') + '</p>' +
      '<p class="summary">' + esc(L(p.summary)) + '</p>' +
      '<nav class="links" aria-label="Profiles">' + links + '<span>' + ICON.pin + esc(L(p.location)) + '</span></nav>';

    var labels = t('stat');
    var w = Math.max.apply(null, p.stats.items.map(function (s) { return labels[s.key].length; })) + 1;
    var rows = p.stats.items.map(function (s) {
      var lab = labels[s.key];
      return '<div><span class="k">' + esc(lab + ' ' + Array(Math.max(1, w - lab.length)).join('.')) + '</span> <span class="v">' + esc(s.value) + '</span></div>';
    }).join('');
    $('stats').innerHTML =
      '<div><span class="prompt">$</span> ' + esc(t('statsCmd')) + '</div>' + rows +
      '<div><span class="prompt">$</span> <span class="caret">▍</span></div>' +
      '<p class="note">' + esc(t('asOf')) + ' ' + esc(p.stats.asOf) + ' · ResearchGate</p>';
  }

  function renderYears() {
    var c = {};
    D.pubs.forEach(function (p) { c[p.year] = (c[p.year] || 0) + 1; });
    var ys = Object.keys(c).sort().reverse();
    var max = Math.max.apply(null, ys.map(function (y) { return c[y]; }));
    $('years').innerHTML = '<p class="eyebrow eyebrow--muted" style="font-size:13px">' + esc(t('perYear')) + '</p><div class="years__list">' +
      ys.map(function (y) {
        return '<div class="yr"><span class="yr__y">' + y + '</span><span class="yr__bar" role="img" aria-label="' + y + ': ' + c[y] + '"><span style="width:' + Math.round(c[y] / max * 100) + '%"></span></span><span class="yr__c">' + c[y] + '</span></div>';
      }).join('') + '</div>';
  }

  function papersOf(id) { return D.pubs.filter(function (p) { return p.theme === id; }); }

  function renderThemes() {
    var tabs = [{ id: 'all', label: t('all'), n: D.pubs.length }].concat(D.themes.map(function (th) {
      return { id: th.id, label: L(th.short), n: papersOf(th.id).length };
    }));
    $('themeTabs').innerHTML = tabs.map(function (tb) {
      return '<button type="button" class="tab" data-theme="' + esc(tb.id) + '" aria-pressed="' + (state.theme === tb.id) + '">' + esc(tb.label) + ' (' + tb.n + ')</button>';
    }).join('');

    var list = state.theme === 'all' ? D.themes : D.themes.filter(function (th) { return th.id === state.theme; });
    var types = t('type');
    $('themes').innerHTML = list.map(function (th) {
      var repos = (th.repos || []).map(function (r) { return '<a class="repo" href="' + esc(r.url) + '">' + ICON.codeSm + esc(r.name) + '</a>'; }).join('');
      var papers = papersOf(th.id).map(function (p) {
        return '<li class="paper"><a href="' + esc(p.url) + '">' + esc(p.title) + '</a>' +
          (p.titleAlt ? '<span class="paper__alt">' + esc(p.titleAlt) + '</span>' : '') +
          '<span class="paper__auth">' + esc(p.authors) + '</span>' +
          '<span class="paper__meta"><span>' + p.year + '</span><span>·</span><span>' + esc(p.venue) + '</span>' +
          '<span class="badge">' + esc(types[p.type] || p.type) + '</span>' +
          (p.fullText ? '<span class="badge badge--ok">' + esc(t('fullText')) + '</span>' : '') + '</span></li>';
      }).join('');
      return '<article class="card theme"><div class="theme__info"><span class="chip">' + esc(L(th.project)) + '</span>' +
        '<h3 class="theme__name">' + esc(L(th.name)) + '</h3><p class="theme__desc">' + esc(L(th.description)) + '</p>' +
        (repos ? '<div class="repos">' + repos + '</div>' : '') + '</div>' +
        '<ul class="papers">' + papers + '</ul></article>';
    }).join('');
  }

  function renderBook() {
    var b = D.profile.book;
    $('book').innerHTML =
      '<div class="cover" aria-hidden="true"><small>NOBEL AKADEMİK</small><strong>' + esc(b.title) + '</strong></div>' +
      '<div class="book__body"><p class="eyebrow">' + esc(t('book')) + '</p><h2 id="bookTitle" class="book__title">' + esc(b.title) + '</h2>' +
      '<p class="book__desc">' + esc(L(b.description)) + '</p>' +
      '<p class="book__meta">' + esc(b.publisher) + ' · ' + b.pages + ' ' + esc(t('pages')) + ' · ISBN ' + esc(b.isbn) + '</p></div>' +
      '<div class="book__actions"><a class="btn btn--outline" href="' + esc(b.url) + '">' + esc(t('viewBook')) + '</a>' +
      (b.altUrl ? '<a class="btn" href="' + esc(b.altUrl) + '">' + esc(t('otherStore')) + '</a>' : '') + '</div>';
  }

  function renderApps() {
    $('featured').innerHTML = D.apps.featured.map(function (a, i) {
      var cur = state.shots[a.id] || 0;
      var s = a.shots[cur];
      var thumbs = a.shots.length > 1 ? '<div class="shots" role="group" aria-label="' + esc(t('screenshots')) + '">' + a.shots.map(function (sh, j) {
        return '<button type="button" class="tab" data-app="' + esc(a.id) + '" data-shot="' + j + '" aria-pressed="' + (j === cur) + '">' + esc(L(sh.label)) + '</button>';
      }).join('') + '</div>' : '';
      var feats = L(a.features).map(function (f) { return '<li><span><b>' + esc(f[0]) + '</b> <span>— ' + esc(f[1]) + '</span></span></li>'; }).join('');
      return '<article class="app">' +
        '<div class="app__media"><div class="window"><div class="window__bar"><span class="dots" aria-hidden="true"><span></span><span></span><span></span></span><span class="window__url">' + esc(a.bar) + '</span></div>' +
        '<img src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" width="' + s.w + '" height="' + s.h + '" loading="lazy" decoding="async"></div>' + thumbs + '</div>' +
        '<div class="app__info"><span class="app__kind">0' + (i + 1) + ' · ' + esc(L(a.kind)) + '</span>' +
        '<h3 class="app__name">' + esc(a.name) + '</h3><p class="app__tag">' + esc(L(a.tagline)) + '</p>' +
        '<p class="app__desc">' + esc(L(a.description)) + '</p><ul class="feats">' + feats + '</ul>' +
        '<div class="stack">' + a.stack.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>' +
        '<div class="app__actions">' + (a.live ? '<a class="btn btn--primary" href="' + esc(a.live) + '">' + esc(t('liveDemo')) + '</a>' : '') +
        '<a class="btn" href="' + esc(a.code) + '">' + ICON.codeSm + esc(t('source')) + '</a></div></div></article>';
    }).join('');

    $('tools').innerHTML = D.apps.tools.map(function (x) {
      return '<a class="card tool" href="' + esc(x.url) + '"><img src="' + esc(x.img) + '" alt="' + esc(x.alt) + '" loading="lazy" decoding="async">' +
        '<span class="tool__body"><span class="tool__name">' + esc(x.name) + '</span><span class="tool__desc">' + esc(L(x.description)) + '</span><span class="tool__meta">' + esc(x.meta) + '</span></span></a>';
    }).join('');
  }

  function renderAll() {
    renderStatic(); renderProfile(); renderYears(); renderThemes(); renderBook(); renderApps();
  }

  document.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-theme]');
    if (tab) { state.theme = tab.getAttribute('data-theme'); renderThemes(); return; }
    var sh = e.target.closest('[data-shot]');
    if (sh) { state.shots[sh.getAttribute('data-app')] = +sh.getAttribute('data-shot'); renderApps(); return; }
    if (e.target.closest('#langToggle')) {
      state.lang = state.lang === 'tr' ? 'en' : 'tr';
      try { localStorage.setItem('lang', state.lang); } catch (err) {}
      if (D) renderAll(); else renderStatic();
    }
  });

  function get(path) { return fetch(path, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(path); return r.json(); }); }

  renderStatic();
  Promise.all([get('data/profile.json'), get('data/publications.json'), get('data/themes.json'), get('data/apps.json')])
    .then(function (r) {
      D = { profile: r[0], pubs: r[1].slice().sort(function (a, b) { return b.year - a.year; }), themes: r[2], apps: r[3] };
      renderAll();
    })
    .catch(function () {
      $('themes').innerHTML = '<p class="error">' + esc(t('loadError')) + '</p>';
    });
})();
