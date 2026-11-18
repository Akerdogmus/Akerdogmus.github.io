(function () {
  'use strict';

  // ---- UI strings (content lives in /data/*.json) ----
  var UI = {
    en: {
      skip: 'Skip to content',
      navMap: './research-map', navBook: './book', navApps: './apps', navProjects: './projects',
      projEyebrow: '// r&d projects', projTitle: "Projects I've worked on", projNote: 'EU & national R&D, via acd | veri mühendisliği',
      expTitle: '// experience', present: 'present', ongoing: 'active', done: 'completed', left: 'my part ended', planned: 'planned',
      authors: 'Authors',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      langBtn: '[TR]', langLabel: "Türkçe'ye geç",
      heroEyebrow: '// what I work on', heroTitle: 'From robot inspection cells to local LLMs',
      mapEyebrow: '// research map', mapTitle: 'Themes, projects, papers & code',
      appsEyebrow: '// apps & software', appsTitle: "Things I've built",
      toolsTitle: '// robotics & simulation tools', allRepos: 'All repositories on GitHub →',
      built: 'built with GitHub Pages',
      all: 'All', filterLabel: 'Filter by theme',
      perYear: '// publications per year',
      statsCmd: 'stats --source researchgate',
      stat: { publications: 'publications', books: 'books', citations: 'citations', reads: 'reads' },
      asOf: 'as of',
      book: '// book', viewBook: 'View book →', readMore: 'Read more', otherStore: 'Kitapyurdu',
      pages: 'pp', editor: 'Editor', coverAlt: 'Cover of the book ROS ile Robotik Uygulamalar',
      liveDemo: 'Live demo ↗', source: 'Source code', screenshots: 'Screenshots',
      papers: function (n) { return n + (n === 1 ? ' paper' : ' papers'); },
      type: { article: 'Article', conference: 'Conference', preprint: 'Preprint' },
      fullText: 'full text',
      loadError: 'Content could not be loaded. If you opened the file directly, serve the folder over HTTP (e.g. python -m http.server).'
    },
    tr: {
      skip: 'İçeriğe geç',
      navMap: './araştırma', navBook: './kitap', navApps: './uygulamalar', navProjects: './projeler',
      projEyebrow: '// ar-ge projeleri', projTitle: 'Çalıştığım projeler', projNote: 'AB ve ulusal Ar-Ge, acd | veri mühendisliği bünyesinde',
      expTitle: '// deneyim', present: 'devam ediyor', ongoing: 'aktif', done: 'tamamlandı', left: 'katkım sona erdi', planned: 'planlanan',
      authors: 'Yazarlar',
      months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
      langBtn: '[EN]', langLabel: 'Switch to English',
      heroEyebrow: '// neler üzerinde çalışıyorum', heroTitle: "Robot denetim hücrelerinden lokal LLM'lere",
      mapEyebrow: '// araştırma haritası', mapTitle: 'Alanlar, projeler, yayınlar ve kod',
      appsEyebrow: '// uygulamalar ve yazılım', appsTitle: 'Geliştirdiklerim',
      toolsTitle: '// robotik ve simülasyon araçları', allRepos: "GitHub'daki tüm depolar →",
      built: 'GitHub Pages ile yayında',
      all: 'Tümü', filterLabel: 'Alana göre filtrele',
      perYear: '// yıllara göre yayınlar',
      statsCmd: 'stats --source researchgate',
      stat: { publications: 'yayın', books: 'kitap', citations: 'atıf', reads: 'okunma' },
      asOf: 'tarih',
      book: '// kitap', viewBook: 'Kitabı incele →', readMore: 'Devamını oku', otherStore: 'Kitapyurdu',
      pages: 's.', editor: 'Editör', coverAlt: 'ROS ile Robotik Uygulamalar kitabının kapağı',
      liveDemo: 'Canlı demo ↗', source: 'Kaynak kod', screenshots: 'Ekran görüntüleri',
      papers: function (n) { return n + ' yayın'; },
      type: { article: 'Makale', conference: 'Bildiri', preprint: 'Ön baskı' },
      fullText: 'tam metin',
      loadError: 'İçerik yüklenemedi. Dosyayı doğrudan açtıysanız klasörü bir HTTP sunucusuyla açın (ör. python -m http.server).'
    }
  };

  function svg(body, size) {
    var s = size || 18;
    return '<svg aria-hidden="true" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }
  var ICON = {
    code: svg('<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>'),
    book: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>'),
    linkedin: svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>'),
    pin: svg('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>'),
    codeSm: svg('<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>', 14),
    briefcase: svg('<rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><path d="M2 13h20"></path>'),
    cap: svg('<path d="M22 10L12 5 2 10l10 5 10-5z"></path><path d="M6 12v5c3 2 9 2 12 0v-5"></path>'),
    chipSm: svg('<rect x="6" y="6" width="12" height="12" rx="2"></rect><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"></path>', 13),
    sparklesSm: svg('<path d="M11 3l1.9 4.9L18 10l-5.1 2.1L11 17l-1.9-4.9L4 10l5.1-2.1z"></path><path d="M19 15l.8 2.1 2.2.9-2.2.9-.8 2.1-.8-2.1-2.2-.9 2.2-.9z"></path>', 13),
    robotSm: svg('<path d="M3 21h11"></path><path d="M6 21v-3l3.5-5"></path><circle cx="9.5" cy="13" r="1.6"></circle><path d="M10.8 12l5.2-4.4"></path><circle cx="16.5" cy="7.2" r="1.6"></circle><path d="M17.8 8.4l2.4 2.4"></path>', 13),
    eyeSm: svg('<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle>', 13)
  };
  // One icon per research theme (themes.json may name another with "icon")
  var THEME_ICON = {
    robot: svg('<path d="M3 21h11"></path><path d="M6 21v-3l3.5-5"></path><circle cx="9.5" cy="13" r="1.6"></circle><path d="M10.8 12l5.2-4.4"></path><circle cx="16.5" cy="7.2" r="1.6"></circle><path d="M17.8 8.4l2.4 2.4"></path><path d="M19 13.5v2"></path><path d="M21 14.5h-4"></path>', 26),
    sparkles: svg('<path d="M11 3l1.9 4.9L18 10l-5.1 2.1L11 17l-1.9-4.9L4 10l5.1-2.1z"></path><path d="M19 15l.8 2.1 2.2.9-2.2.9-.8 2.1-.8-2.1-2.2-.9 2.2-.9z"></path>', 26),
    blocks: svg('<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"></rect><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"></rect><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"></rect><path d="M17.25 14v7"></path><path d="M13.75 17.5h7"></path>', 26),
    battery: svg('<rect x="2" y="7" width="17" height="10" rx="2"></rect><path d="M22 11v2"></path><path d="M11.5 8.5l-3 4h4l-3 4"></path>', 26),
    cap: svg('<path d="M22 10L12 5 2 10l10 5 10-5z"></path><path d="M6 12v5c3 2 9 2 12 0v-5"></path><path d="M22 10v6"></path>', 26),
    wave: svg('<path d="M2 12h3l2.5-7 4 14 3.5-10 2 3H22"></path>', 26),
    leaf: svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"></path><path d="M2 21c0-3 1.9-5.4 5.2-6.1"></path>', 26),
    shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path>', 26),
    layers: svg('<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>', 26),
    radio: svg('<circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8a6 6 0 0 1 0 8.4"></path><path d="M7.8 16.2a6 6 0 0 1 0-8.4"></path><path d="M19.1 4.9a10 10 0 0 1 0 14.2"></path><path d="M4.9 19.1a10 10 0 0 1 0-14.2"></path>', 26),
    chip: svg('<rect x="6" y="6" width="12" height="12" rx="2"></rect><rect x="9.5" y="9.5" width="5" height="5"></rect><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"></path>', 26),
    factory: svg('<path d="M2 20V9l6 4V9l6 4V4h4l2 16z"></path><path d="M2 20h20"></path>', 26)
  };
  var THEME_DEFAULT_ICON = { vv: 'robot', genai: 'sparkles', nocode: 'blocks', ev: 'battery', edu: 'cap', other: 'wave' };

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
    var avatar = p.photo ? '<img src="' + esc(p.photo) + '" alt="" width="80" height="80">' : esc(p.initials);
    var links = p.links.map(function (l) {
      return '<a class="link" href="' + esc(l.url) + '"><span class="ico">' + (ICON[l.icon] || '') + '</span><span>' + esc(l.label) + '</span><span class="link__arrow" aria-hidden="true">↗</span></a>';
    }).join('');
    var roles = (Array.isArray(p.roles) ? p.roles : []).map(function (r) {
      return '<li class="role"><span class="ico ico--soft">' + (ICON[r.icon] || '') + '</span><span><b>' + esc(L(r.title)) + '</b><br><span class="role__org">' + esc(L(r.org)) + '</span></span></li>';
    }).join('');
    var focus = (p.focus || []).map(function (f) {
      return '<span class="focus">' + (ICON[f.icon + 'Sm'] || '') + esc(L(f.label)) + '</span>';
    }).join('');
    $('profile').innerHTML =
      '<div class="profile__top"><div class="avatar" aria-hidden="true">' + avatar + '</div>' +
      '<p class="status"><span class="pulse" aria-hidden="true"></span>' + esc(L(p.status)) + '</p></div>' +
      '<h1 class="name">' + esc(p.name) + '</h1>' +
      '<ul class="roles">' + roles + '</ul>' +
      '<p class="summary">' + esc(L(p.summary)) + '</p>' +
      (focus ? '<div class="focus__list">' + focus + '</div>' : '') +
      '<nav class="links" aria-label="Profiles">' + links + '</nav>' +
      '<p class="loc">' + ICON.pin + esc(L(p.location)) + '</p>';
  }

  // "2024-03" → "Mar 2024"; a bare year ("2025") stays as is
  function ym(s) { if (!s) return ''; var p = String(s).split('-'); return p.length < 2 ? p[0] : t('months')[+p[1] - 1] + ' ' + p[0]; }

  function renderExperience() {
    var items = D.experience.map(function (e) {
      var roles = e.roles.map(function (r) {
        var when = r.from ? ym(r.from) + ' – ' + (r.to ? ym(r.to) : t('present')) : '';
        var note = r.note ? L(r.note) : '';
        return '<li class="exp__role"><span class="exp__dot' + (r.to ? '' : ' exp__dot--now') + '" aria-hidden="true"></span>' +
          '<span><b>' + esc(L(r.title)) + '</b><span class="exp__when">' + esc([when, note].filter(Boolean).join(' · ')) + '</span></span></li>';
      }).join('');
      return '<div class="exp__org"><div class="exp__head"><span class="ico ico--soft">' + (ICON[e.icon] || '') + '</span>' +
        '<span><b>' + esc(L(e.org)) + '</b>' + (e.place ? '<span class="exp__place">' + esc(L(e.place)) + '</span>' : '') + '</span></div>' +
        '<ul class="exp__roles">' + roles + '</ul></div>';
    }).join('');
    $('experience').innerHTML = '<p id="expTitle" class="eyebrow">' + esc(t('expTitle')) + '</p>' + items;
  }

  function renderProjects() {
    $('projectList').innerHTML = D.projects.map(function (p) {
      // Status: "left" = my part ended (project may go on); a future "to" = planned end, still active;
      // no "to" = ongoing unless marked "done" (finished, end month unknown).
      var now = new Date().toISOString().slice(0, 7);
      var planned = p.to && p.to > now;
      var live = !p.left && !p.done && (!p.to || planned);
      var when = p.to ? ym(p.from) + ' – ' + ym(p.to) + (planned ? ' (' + t('planned') + ')' : '') : (live ? ym(p.from) + ' –' : ym(p.from));
      var stateLabel = p.left ? t('left') : (live ? t('ongoing') : t('done'));
      return '<article class="card proj"><div class="proj__top"><span class="theme__icon">' + (THEME_ICON[p.icon] || THEME_ICON.wave) + '</span>' +
        '<div class="proj__head"><h3 class="proj__name">' + esc(p.name) + '</h3><span class="proj__when">' + esc(when) +
        '<span class="proj__state' + (live ? ' proj__state--live' : '') + '">' + esc(stateLabel) + '</span></span></div></div>' +
        '<p class="proj__full">' + esc(p.full) + '</p><p class="proj__sum">' + esc(L(p.summary)) + '</p></article>';
    }).join('');
  }

  function renderStats() {
    var p = D.profile, labels = t('stat');
    var c = {};
    D.pubs.forEach(function (x) { c[x.year] = (c[x.year] || 0) + 1; });
    var ys = Object.keys(c).sort().reverse();
    var max = Math.max.apply(null, ys.map(function (y) { return c[y]; }));
    $('stats').innerHTML =
      '<div><span class="prompt">$</span> ' + esc(t('statsCmd')) + '</div>' +
      '<div class="stats__grid">' + p.stats.items.map(function (s) {
        return '<span>' + esc(labels[s.key]) + ' <b>' + esc(s.value) + '</b></span>';
      }).join('') + '</div>' +
      '<p class="note">' + esc(t('asOf')) + ' ' + esc(p.stats.asOf) + ' · ResearchGate</p>' +
      '<p class="years__title">' + esc(t('perYear')) + '</p><div class="years__list">' +
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
    $('themes').classList.toggle('themes--single', list.length === 1);
    $('themes').innerHTML = list.map(function (th) {
      var ps = papersOf(th.id);
      var icon = THEME_ICON[th.icon || THEME_DEFAULT_ICON[th.id]] || THEME_ICON.wave;
      var repos = (th.repos || []).map(function (r) { return '<a class="repo" href="' + esc(r.url) + '">' + ICON.codeSm + esc(r.name) + '</a>'; }).join('');
      var papers = ps.map(function (p) {
        return '<li class="paper"><a href="' + esc(p.url) + '">' + esc(p.title) + '</a>' +
          (p.titleAlt ? '<span class="paper__alt">' + esc(p.titleAlt) + '</span>' : '') +
          '<span class="paper__auth">' + esc(p.authors) + '</span>' +
          '<span class="paper__meta"><span>' + p.year + '</span><span>·</span><span>' + esc(p.venue) + '</span>' +
          '<span class="badge">' + esc(types[p.type] || p.type) + '</span>' +
          (p.fullText ? '<span class="badge badge--ok">' + esc(t('fullText')) + '</span>' : '') +
          (p.doi ? '<a class="badge badge--doi" href="https://doi.org/' + esc(p.doi) + '">DOI ' + esc(p.doi) + '</a>' : '') + '</span></li>';
      }).join('');
      return '<article class="card theme"><div class="theme__top"><span class="theme__icon">' + icon + '</span>' +
        '<div class="theme__head"><div class="theme__meta"><span class="chip">' + esc(L(th.project)) + '</span>' +
        '<span class="theme__count">' + esc(t('papers')(ps.length)) + '</span></div>' +
        '<h3 class="theme__name">' + esc(L(th.name)) + '</h3></div></div>' +
        '<p class="theme__desc">' + esc(L(th.description)) + '</p>' +
        (repos ? '<div class="repos">' + repos + '</div>' : '') +
        '<ul class="papers">' + papers + '</ul></article>';
    }).join('');
  }

  // Description may be one string or a list of paragraphs; extra paragraphs fold under "read more".
  function bookDesc(d) {
    var ps = Array.isArray(d) ? d : [d];
    var first = '<p class="book__desc">' + esc(ps[0]) + '</p>';
    if (ps.length < 2) return first;
    return first + '<details class="book__more"><summary>' + esc(t('readMore')) + '</summary>' +
      ps.slice(1).map(function (p) { return '<p class="book__desc">' + esc(p) + '</p>'; }).join('') + '</details>';
  }

  function renderBook() {
    var b = D.profile.book;
    $('book').innerHTML =
      '<p class="eyebrow">' + esc(t('book')) + '</p>' +
      '<div class="book__row" style="margin-top:12px">' +
      (b.cover ? '<img class="cover" src="' + esc(b.cover) + '" alt="' + esc(t('coverAlt')) + '" width="205" height="300" loading="lazy">' : '') +
      '<div class="book__body"><h2 id="bookTitle" class="book__title">' + esc(b.title) + '</h2>' +
      (b.authors ? '<p class="book__authors"><span>' + esc(t('authors')) + ':</span> ' + esc(b.authors) + '</p>' : '') +
      '<p class="book__meta">' + esc(b.publisher) + (b.edition ? '<br>' + esc(L(b.edition)) : '') + ' · ' + b.pages + ' ' + esc(t('pages')) +
      '<br>ISBN ' + esc(b.isbn) + (b.editor ? '<br>' + esc(t('editor')) + ': ' + esc(b.editor) : '') + '</p></div></div>' +
      bookDesc(L(b.description)) +
      '<div class="book__actions"><a class="btn btn--outline" href="' + esc(b.url) + '">' + esc(t('viewBook')) + '</a>' +
      (b.altUrl ? '<a class="btn" href="' + esc(b.altUrl) + '">' + esc(t('otherStore')) + '</a>' : '') + '</div>';
  }

  function renderApps() {
    $('featured').innerHTML = D.apps.featured.map(function (a) {
      var cur = state.shots[a.id] || 0;
      var s = a.shots[cur];
      var thumbs = a.shots.length > 1 ? '<div class="shots" role="group" aria-label="' + esc(t('screenshots')) + '">' + a.shots.map(function (sh, j) {
        return '<button type="button" class="tab" data-app="' + esc(a.id) + '" data-shot="' + j + '" aria-pressed="' + (j === cur) + '">' + esc(L(sh.label)) + '</button>';
      }).join('') + '</div>' : '';
      var feats = L(a.features).slice(0, 3).map(function (f) { return '<li><span><b>' + esc(f[0]) + '</b> — ' + esc(f[1]) + '</span></li>'; }).join('');
      return '<article class="card app">' +
        '<img class="app__shot" src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" width="' + s.w + '" height="' + s.h + '" loading="lazy" decoding="async">' +
        '<div class="app__body"><div class="app__top"><h3 class="app__name">' + esc(a.name) + '</h3><span class="app__kind">' + esc(L(a.kind)) + '</span></div>' +
        thumbs +
        '<p class="app__tag">' + esc(L(a.tagline)) + '</p>' +
        '<ul class="feats">' + feats + '</ul>' +
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
    renderStatic(); renderProfile(); renderExperience(); renderStats(); renderProjects(); renderThemes(); renderBook(); renderApps();
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
      document.dispatchEvent(new Event('langchange'));
    }
  });

  function get(path) { return fetch(path, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(path); return r.json(); }); }

  renderStatic();
  Promise.all([get('data/profile.json'), get('data/publications.json'), get('data/themes.json'), get('data/apps.json'), get('data/experience.json'), get('data/projects.json')])
    .then(function (r) {
      D = { profile: r[0], pubs: r[1].slice().sort(function (a, b) { return b.year - a.year; }), themes: r[2], apps: r[3], experience: r[4], projects: r[5] };
      renderAll();
    })
    .catch(function () {
      $('themes').innerHTML = '<p class="error">' + esc(t('loadError')) + '</p>';
    });
})();
