(function () {
  'use strict';

  // ---- UI strings (content lives in /data/*.json) ----
  var UI = {
    en: {
      skip: 'Skip to content',
      navMap: './research-map', navBook: './book', navApps: './apps', navProjects: './projects',
      projEyebrow: '// r&d projects', projTitle: "Projects I've worked on", projNote: 'EU & national R&D, via acd | veri mühendisliği',
      expTitle: '// experience', present: 'present', ongoing: 'active', done: 'completed', left: 'my part ended', planned: 'planned',
      about: 'About', aboutTitle: 'about me', statsTitle: '// stats', profileTitle: '// profile', liveBadge: '● live',
      demo: 'demo', toProject: 'Go to the project card',
      pubCard: '// publication', abstract: 'Abstract', close: 'Close', readDoi: 'Read (publisher)', readRG: 'Read on ResearchGate', readSource: 'Read',
      excerpt: 'Only the beginning of the abstract is available here; the full text is at the link below.', noAbstract: 'The abstract is not available here; use the link below to read the paper.', myShare: 'my involvement', fullRun: 'start to finish', sinceStart: 'since the start',
      units: ['yr', 'mo'], now: 'current', mode: { hybrid: 'Hybrid', office: 'On-site' },
      yearsExp: function (n) { return n + '+ yrs experience'; },
      authors: 'Authors', thesisRef: 'CoHE Thesis Centre no.',
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
      stat: { publications: 'publications', books: 'books', citations: 'citations', reads: 'reads', hindex: 'h-index', ris: 'RI score' },
      statTip: { ris: 'Research Interest Score · ResearchGate', hindex: 'h-index · ResearchGate' },
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
      about: 'Hakkımda', aboutTitle: 'hakkımda', statsTitle: '// istatistikler', profileTitle: '// profil', liveBadge: '● canlı',
      demo: 'demo', toProject: 'Proje kartına git',
      pubCard: '// yayın', abstract: 'Özet', close: 'Kapat', readDoi: 'Oku (yayıncı)', readRG: "ResearchGate'te oku", readSource: 'Oku',
      excerpt: 'Burada özetin yalnızca başı var; tamamı aşağıdaki bağlantıda.', noAbstract: 'Bu yayının özeti burada yok; okumak için aşağıdaki bağlantıyı kullanın.', myShare: 'projedeki katılımım', fullRun: 'baştan sona', sinceStart: 'başından beri',
      units: ['yıl', 'ay'], now: 'şu an', mode: { hybrid: 'Hibrit', office: 'Ofisten' },
      yearsExp: function (n) { return n + '+ yıl deneyim'; },
      authors: 'Yazarlar', thesisRef: 'YÖK Tez Merkezi ref. no',
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
      stat: { publications: 'yayın', books: 'kitap', citations: 'atıf', reads: 'okunma', hindex: 'h-indeks', ris: 'RI skoru' },
      statTip: { ris: 'Research Interest Score · ResearchGate', hindex: 'h-indeks · ResearchGate' },
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
    building: svg('<rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"></path>'),
    briefcaseSm: svg('<rect x="2" y="7" width="20" height="14" rx="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>', 14),
    sparkSm: svg('<path d="M11 3l1.9 4.9L18 10l-5.1 2.1L11 17l-1.9-4.9L4 10l5.1-2.1z"></path>', 13),
    usersSm: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', 13),
    codeSm2: svg('<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>', 13),
    seedSm: svg('<path d="M12 22V12"></path><path d="M12 12C12 7 8 4 3 4c0 5 4 8 9 8z"></path><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"></path>', 13),
    docSm: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>', 13),
    bookSm: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>', 13),
    dotSm: svg('<circle cx="12" cy="12" r="4"></circle>', 13),
    clockSm: svg('<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', 11),
    homeSm: svg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', 11),
    buildingSm: svg('<rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M9 22v-4h6v4"></path>', 11),
    playSm: svg('<polygon points="6 4 20 12 6 20 6 4"></polygon>', 10),
    folderSm: svg('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>', 14),
    monitorSm: svg('<rect x="2" y="3" width="20" height="14" rx="2"></rect><path d="M8 21h8M12 17v4"></path>', 14),
    readerSm: svg('<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2z"></path><path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"></path>', 14),
    cubeSm: svg('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.3 7L12 12l8.7-5M12 22V12"></path>', 14),
    userSm: svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', 14),
    chartSm: svg('<path d="M3 3v18h18"></path><rect x="7" y="12" width="3" height="5"></rect><rect x="12" y="8" width="3" height="9"></rect><rect x="17" y="5" width="3" height="12"></rect>', 14),
    info: svg('<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>', 14),
    factory: svg('<path d="M2 20V9l6 4V9l6 4V4h4l2 16z"></path><path d="M2 20h20"></path>'),
    globe: svg('<circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>'),
    target: svg('<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>'),
    doc: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 13h8M8 17h5"></path>'),
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

  // "About" info box: summary is a list of {icon, en, tr} rows (a plain {en, tr} string still works)
  function aboutBox(s) {
    var rows = Array.isArray(s) ? s : [{ icon: 'info', en: s && s.en, tr: s && s.tr }];
    return '<section class="about" aria-label="' + esc(t('about')) + '"><p class="about__head"><span class="about__badge">' + ICON.info + '</span>' + esc(t('aboutTitle')) + '</p>' +
      '<ul class="about__list">' + rows.map(function (r) {
        return '<li><span class="ico ico--soft">' + (ICON[r.icon] || ICON.info) + '</span><span>' + esc(L(r)) + '</span></li>';
      }).join('') + '</ul></section>';
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
    $('profile').innerHTML = cardHead(ICON.userSm, t('profileTitle'), L(p.location)) +
      '<div class="profile__body"><div class="profile__top"><div class="avatar" aria-hidden="true">' + avatar + '</div>' +
      '<p class="status"><span class="pulse" aria-hidden="true"></span>' + esc(L(p.status)) + '</p></div>' +
      '<h1 class="name">' + esc(p.name) + '</h1>' +
      '<ul class="roles">' + roles + '</ul>' +
      (p.thesis ? '<div class="thesis"><span class="ico ico--soft">' + ICON.doc + '</span><span><span class="thesis__label">' + esc(L(p.thesis.type)) + ' · ' + p.thesis.year + '</span>' +
        '<b class="thesis__title">' + esc(p.thesis.title) + '</b>' +
        (p.thesis.ref ? '<span class="thesis__ref">' + esc(t('thesisRef')) + ' ' + esc(p.thesis.ref) + '</span>' : '') + '</span></div>' : '') +
      aboutBox(p.summary) +
      (focus ? '<div class="focus__list">' + focus + '</div>' : '') +
      '<nav class="links" aria-label="Profiles">' + links + '</nav></div>';
  }

  // "2024-03" → "Mar 2024"; a bare year ("2025") stays as is
  function ym(s) { if (!s) return ''; var p = String(s).split('-'); return p.length < 2 ? p[0] : t('months')[+p[1] - 1] + ' ' + p[0]; }

  // Whole months between two "YYYY-MM" values, counting both ends (LinkedIn style); null for bare years
  function monthsBetween(from, to) {
    if (!from || String(from).length < 7) return null;
    var end = to || new Date().toISOString().slice(0, 7);
    var a = from.split('-'), b = end.split('-');
    return (+b[0] - +a[0]) * 12 + (+b[1] - +a[1]) + 1;
  }
  function dur(m) {
    if (m == null || m < 1) return '';
    var y = Math.floor(m / 12), mo = m % 12, u = t('units');
    return [y ? y + ' ' + u[0] : '', mo ? mo + ' ' + u[1] : ''].filter(Boolean).join(' ');
  }

  function renderExperience() {
    var workStart = null;
    D.experience.forEach(function (e) {
      if (e.kind !== 'work') return;
      e.roles.forEach(function (r) { if (r.from && String(r.from).length >= 7 && (!workStart || r.from < workStart)) workStart = r.from; });
    });
    // full-time experience starts with the first role longer than an internship
    var fullTime = D.experience.filter(function (e) { return e.kind === 'work' && e.place; });
    var ftStart = fullTime.length ? fullTime[0].roles.map(function (r) { return r.from; }).sort()[0] : workStart;
    var years = Math.floor((monthsBetween(ftStart, null) || 0) / 12);

    var items = D.experience.map(function (e) {
      var orgFrom = e.roles.map(function (r) { return r.from; }).filter(Boolean).sort()[0];
      var current = e.roles.some(function (r) { return !r.to; });
      var orgDur = e.kind === 'work' ? dur(monthsBetween(orgFrom, current ? null : e.roles[0].to)) : '';
      var roles = e.roles.map(function (r) {
        var now = !!r.from && !r.to;   // a role without dates is shown without a date line
        var when = r.from ? ym(r.from) + ' – ' + (r.to ? ym(r.to) : t('present')) : '';
        var d = dur(monthsBetween(r.from, r.to));
        var chips = (d ? '<span class="xchip">' + ICON.clockSm + esc(d) + '</span>' : '') +
          (r.mode ? '<span class="xchip">' + (r.mode === 'hybrid' ? ICON.homeSm : ICON.buildingSm) + esc(t('mode')[r.mode]) + '</span>' : '') +
          (now ? '<span class="xchip xchip--now">' + esc(t('now')) + '</span>' : '');
        return '<li class="exp__role' + (now ? ' exp__role--now' : '') + '"><span class="exp__node" aria-hidden="true">' + (ICON[r.icon + 'Sm'] || ICON.dotSm) + '</span>' +
          '<span class="exp__body"><b>' + esc(L(r.title)) + '</b>' + (when ? '<span class="exp__when">' + esc(when) + '</span>' : '') +
          (chips ? '<span class="exp__chips">' + chips + '</span>' : '') + '</span></li>';
      }).join('');
      return '<div class="exp__org"><div class="exp__head"><span class="ico ico--soft">' + (ICON[e.icon] || '') + '</span>' +
        '<span class="exp__headtxt"><b>' + esc(L(e.org)) + '</b>' + (e.place ? '<span class="exp__place">' + esc(L(e.place)) + '</span>' : '') + '</span>' +
        (orgDur ? '<span class="exp__total">' + esc(orgDur) + '</span>' : '') + '</div>' +
        '<ul class="exp__roles">' + roles + '</ul></div>';
    }).join('');
    $('experience').innerHTML = cardHead(ICON.briefcaseSm, t('expTitle'), years ? t('yearsExp')(years) : '', 'expTitle') + items;
  }

  // Shared card header: icon, "// title" and an optional pill on the right
  function cardHead(icon, title, badge, id) {
    return '<div class="chead"><span class="chead__icon">' + icon + '</span><span' + (id ? ' id="' + id + '"' : '') + '>' + esc(title) + '</span>' +
      (badge ? '<span class="chead__badge">' + esc(badge) + '</span>' : '') + '</div>';
  }

  function projId(name) { return 'proj-' + String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-'); }

  // Jump from a publication's project tag to the project card and make the card flash briefly
  function focusProject(name) {
    var el = document.getElementById(projId(name));
    if (!el) return false;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    el.classList.remove('proj--flash'); void el.offsetWidth;   // restart the animation on repeated clicks
    el.classList.add('proj--flash');
    clearTimeout(el._flashT); el._flashT = setTimeout(function () { el.classList.remove('proj--flash'); }, 3200);
    try { el.focus({ preventScroll: true }); } catch (e) {}
    if (history.replaceState) history.replaceState(null, '', '#' + projId(name));
    return true;
  }

  // Card media: silent loop (poster when the visitor prefers reduced motion), logo or figure.
  // Cards without media keep an empty slot so rows stay aligned.
  function projMedia(p) {
    var m = p.media;
    if (!m) return '';
    var alt = esc(L(m.alt));
    var img = m.type === 'loop'
      ? '<picture><source media="(prefers-reduced-motion: reduce)" srcset="' + esc(m.poster) + '"><img src="' + esc(m.src) + '" alt="' + alt + '" width="640" height="360" loading="lazy" decoding="async"></picture>'
      : '<img src="' + esc(m.src) + '" alt="' + alt + '" loading="lazy" decoding="async">';
    return '<figure class="proj__media proj__media--' + esc(m.type) + '">' + img +
      (m.type === 'loop' ? '<span class="proj__badge">' + ICON.playSm + esc(t('demo')) + '</span>' : '') + '</figure>';
  }

  // My share of the project's run so far (bar) + what I did (chips and a highlighted deliverable)
  function involvement(p, now) {
    var projEnd = p.to ? (p.to < now ? p.to : now) : now;
    var my = p.my || {};
    var myFrom = my.from || p.from, myTo = my.to || projEnd;
    var total = monthsBetween(p.from, projEnd) || 1;
    var mine = Math.min(total, monthsBetween(myFrom, myTo) || 0);
    var pct = Math.round(mine / total * 100);
    var offset = Math.round(((monthsBetween(p.from, myFrom) || 1) - 1) / total * 100);
    var finished = p.to && p.to <= now;
    var note = pct >= 100 ? (finished ? t('fullRun') : t('sinceStart')) : ym(myFrom) + ' – ' + ym(myTo);
    var chips = (p.contrib || []).map(function (c) {
      return '<span class="xchip">' + (ICON[c.icon + 'Sm'] || ICON[c.icon] || '') + esc(L(c)) + '</span>';
    }).join('');
    var dl = p.deliverable;
    // Each part is a direct child of the card so rows line up across cards (CSS subgrid);
    // empty slots keep their row so neighbouring cards stay aligned.
    // software names I built, as mono tags (linked when public), above the one-line description
    var sw = dl && dl.software ? '<span class="proj__sw">' + dl.software.map(function (s) {
      return s.url ? '<a class="swtag" href="' + esc(s.url) + '">' + esc(s.name) + ' ↗</a>' : '<span class="swtag">' + esc(s.name) + '</span>';
    }).join('') + '</span>' : '';
    var deliverable = dl ? '<div class="proj__deliv"><span class="proj__delivIcon">' + (THEME_ICON[dl.icon] || '') + '</span><span class="proj__delivBody">' + sw + '<span>' + esc(L(dl)) +
      (dl.url ? ' <a href="' + esc(dl.url) + '">' + esc(dl.linkLabel || 'link') + ' ↗</a>' : '') + '</span></span></div>' : '<div class="proj__slot" aria-hidden="true"></div>';
    return '<div class="proj__inv"><div class="proj__invHead"><span>' + esc(t('myShare')) + '</span><span class="proj__pct">%' + pct + ' · ' + esc(note) + '</span></div>' +
      '<div class="proj__bar" role="img" aria-label="' + esc(t('myShare') + ': %' + pct) + '"><span style="margin-left:' + offset + '%;width:' + Math.min(pct, 100 - offset) + '%"></span></div></div>' +
      '<div class="proj__chips">' + chips + '</div>' + deliverable;
  }

  function renderProjects() {
    // Projects with media first, then those without (each keeping its order), so the two cards
    // in a row are always the same kind and no card carries an empty media gap.
    var ordered = D.projects.filter(function (p) { return p.media; }).concat(D.projects.filter(function (p) { return !p.media; }));
    $('projectList').innerHTML = ordered.map(function (p) {
      // Status: "left" = my part ended (project may go on); a future "to" = planned end, still active;
      // no "to" = ongoing unless marked "done" (finished, end month unknown).
      var now = new Date().toISOString().slice(0, 7);
      var planned = p.to && p.to > now;
      var live = !p.left && !p.done && (!p.to || planned);
      var when = p.to ? ym(p.from) + ' – ' + ym(p.to) + (planned ? ' (' + t('planned') + ')' : '') : ((live || p.left) ? ym(p.from) + ' –' : ym(p.from));
      var stateLabel = p.left ? t('left') : (live ? t('ongoing') : t('done'));
      return '<article class="card proj' + (p.media ? '' : ' proj--nomedia') + '" id="' + projId(p.name) + '" tabindex="-1">' + projMedia(p) + '<div class="proj__top"><span class="theme__icon">' + (THEME_ICON[p.icon] || THEME_ICON.wave) + '</span>' +
        '<div class="proj__head"><h3 class="proj__name">' + esc(p.name) + '</h3><span class="proj__when">' + esc(when) +
        '<span class="proj__state' + (live ? ' proj__state--live' : '') + '">' + esc(stateLabel) + '</span></span></div></div>' +
        '<p class="proj__full">' + esc(p.full) + '</p><p class="proj__sum">' + esc(L(p.summary)) + '</p>' +
        involvement(p, now) + '</article>';
    }).join('');
  }

  function renderStats() {
    var p = D.profile, labels = t('stat');
    var c = {};
    D.pubs.forEach(function (x) { c[x.year] = (c[x.year] || 0) + 1; });
    var ys = Object.keys(c).sort().reverse();
    var max = Math.max.apply(null, ys.map(function (y) { return c[y]; }));
    $('stats').innerHTML = cardHead(ICON.chartSm, t('statsTitle'), ym(p.stats.asOf)) +
      '<div class="term__body"><div><span class="prompt">$</span> ' + esc(t('statsCmd')) + '</div>' +
      '<div class="stats__grid">' + p.stats.items.map(function (s) {
        // abbreviated labels get a small bubble with the full name on hover / keyboard focus
        var tip = t('statTip')[s.key];
        return tip
          ? '<span class="tip" tabindex="0" data-tip="' + esc(tip) + '" aria-label="' + esc(tip + ': ' + s.value) + '">' + esc(labels[s.key]) + ' <b>' + esc(s.value) + '</b></span>'
          : '<span>' + esc(labels[s.key]) + ' <b>' + esc(s.value) + '</b></span>';
      }).join('') + '</div>' +
      '<p class="years__title">' + esc(t('perYear')) + '</p><div class="years__list">' +
      ys.map(function (y) {
        return '<div class="yr"><span class="yr__y">' + y + '</span><span class="yr__bar" role="img" aria-label="' + y + ': ' + c[y] + '"><span style="width:' + Math.round(c[y] / max * 100) + '%"></span></span><span class="yr__c">' + c[y] + '</span></div>';
      }).join('') + '</div></div>';
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
        // the title opens a card with the abstract; the direct link is still there for no-JS/ctrl-click
        return '<li class="paper"><a class="paper__title" href="' + esc(p.url) + '" data-pub="' + D.pubs.indexOf(p) + '" aria-haspopup="dialog">' + esc(p.title) + '</a>' +
          (p.titleAlt ? '<span class="paper__alt">' + esc(p.titleAlt) + '</span>' : '') +
          '<span class="paper__auth">' + esc(p.authors) + '</span>' +
          '<span class="paper__meta"><span>' + p.year + '</span><span>·</span><span>' + esc(p.venue) + '</span>' +
          '<span class="badge">' + esc(types[p.type] || p.type) + '</span>' +
          (p.fullText ? '<span class="badge badge--ok">' + esc(t('fullText')) + '</span>' : '') +
          (p.doi ? '<a class="badge badge--doi" href="https://doi.org/' + esc(p.doi) + '">DOI ' + esc(p.doi) + '</a>' : '') +
          (p.projects || []).map(function (n) {
            return '<a class="badge badge--proj" href="#' + projId(n) + '" data-proj="' + esc(n) + '" title="' + esc(t('toProject')) + '">' + ICON.folderSm + esc(n) + '</a>';
          }).join('') + '</span></li>';
      }).join('');
      // project tag becomes the shared amber header; paper count is its pill
      return '<article class="card theme">' + cardHead(ICON.folderSm, '// ' + L(th.project), t('papers')(ps.length)) +
        '<div class="theme__body"><div class="theme__top"><span class="theme__icon">' + icon + '</span>' +
        '<h3 class="theme__name">' + esc(L(th.name)) + '</h3></div>' +
        '<p class="theme__desc">' + esc(L(th.description)) + '</p>' +
        (repos ? '<div class="repos">' + repos + '</div>' : '') +
        '<ul class="papers">' + papers + '</ul></div></article>';
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
    $('book').innerHTML = cardHead(ICON.bookSm, t('book'), b.edition ? L(b.edition).split(',')[0] : '') +
      '<div class="book__inner"><div class="book__row">' +
      (b.cover ? '<img class="cover" src="' + esc(b.cover) + '" alt="' + esc(t('coverAlt')) + '" width="205" height="300" loading="lazy">' : '') +
      '<div class="book__body"><h2 id="bookTitle" class="book__title">' + esc(b.title) + '</h2>' +
      (b.authors ? '<p class="book__authors"><span>' + esc(t('authors')) + ':</span> ' + esc(b.authors) + '</p>' : '') +
      '<p class="book__meta">' + esc(b.publisher) + (b.edition ? '<br>' + esc(L(b.edition)) : '') + ' · ' + b.pages + ' ' + esc(t('pages')) +
      '<br>ISBN ' + esc(b.isbn) + (b.editor ? '<br>' + esc(t('editor')) + ': ' + esc(b.editor) : '') + '</p></div></div>' +
      bookDesc(L(b.description)) +
      '<div class="book__actions"><a class="btn btn--outline" href="' + esc(b.url) + '">' + esc(t('viewBook')) + '</a>' +
      (b.altUrl ? '<a class="btn" href="' + esc(b.altUrl) + '">' + esc(t('otherStore')) + '</a>' : '') + '</div></div>';
  }

  var APP_ICON = { nexus: 'monitor', fastread: 'reader', forklift: 'cube' };

  function renderApps() {
    $('featured').innerHTML = D.apps.featured.map(function (a) {
      var cur = state.shots[a.id] || 0;
      var s = a.shots[cur];
      var thumbs = a.shots.length > 1 ? '<div class="shots" role="group" aria-label="' + esc(t('screenshots')) + '">' + a.shots.map(function (sh, j) {
        return '<button type="button" class="tab" data-app="' + esc(a.id) + '" data-shot="' + j + '" aria-pressed="' + (j === cur) + '">' + esc(L(sh.label)) + '</button>';
      }).join('') + '</div>' : '';
      var feats = L(a.features).slice(0, 3).map(function (f) { return '<li><span><b>' + esc(f[0]) + '</b> — ' + esc(f[1]) + '</span></li>'; }).join('');
      var kindIcon = ICON[(a.icon || APP_ICON[a.id] || 'monitor') + 'Sm'] || ICON.monitorSm;
      return '<article class="card app">' + cardHead(kindIcon, '// ' + L(a.kind), a.live ? t('liveBadge') : a.stack[0]) +
        '<img class="app__shot" src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" width="' + s.w + '" height="' + s.h + '" loading="lazy" decoding="async">' +
        '<div class="app__body"><h3 class="app__name">' + esc(a.name) + '</h3>' +
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

  // ---- Publication card (abstract + read link) ----
  function openPub(i) {
    var p = D.pubs[i], dlg = $('pubModal');
    if (!p || !dlg) return false;
    var types = t('type');
    var isDoi = !!p.doi;
    var readUrl = p.url;
    var readLabel = isDoi ? t('readDoi') : (/researchgate/.test(readUrl) ? t('readRG') : t('readSource'));
    var projects = (p.projects || []).map(function (n) {
      return '<a class="badge badge--proj" href="#' + projId(n) + '" data-proj="' + esc(n) + '">' + ICON.folderSm + esc(n) + '</a>';
    }).join('');
    dlg.innerHTML =
      '<div class="modal__card">' + cardHead(ICON.docSm, t('pubCard'), types[p.type] || p.type) +
      '<div class="modal__body">' +
      '<p class="modal__meta">' + p.year + ' · ' + esc(p.venue) + '</p>' +
      '<h3 id="pubModalTitle" class="modal__title">' + esc(p.title) + '</h3>' +
      (p.titleAlt ? '<p class="modal__alt">' + esc(p.titleAlt) + '</p>' : '') +
      '<p class="modal__authors">' + esc(p.authors) + '</p>' +
      '<p class="modal__label">' + esc(t('abstract')) + '</p>' +
      (p.abstract
        ? '<div class="modal__abstract"><p>' + esc(p.abstract) + '</p>' + (p.abstractExcerpt ? '<p class="modal__note">' + esc(t('excerpt')) + '</p>' : '') + '</div>'
        : '<p class="modal__note">' + esc(t('noAbstract')) + '</p>') +
      ((projects || p.fullText) ? '<div class="modal__tags">' + projects + (p.fullText ? '<span class="badge badge--ok">' + esc(t('fullText')) + '</span>' : '') + '</div>' : '') +
      '</div>' +
      '<div class="modal__actions"><a class="btn btn--primary" href="' + esc(readUrl) + '" target="_blank" rel="noopener">' + esc(readLabel) + ' ↗</a>' +
      (isDoi ? '<span class="modal__doi">DOI ' + esc(p.doi) + '</span>' : '') +
      '<button type="button" class="btn modal__close" data-close>' + esc(t('close')) + '</button></div></div>';
    dlg._returnTo = document.activeElement;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var c = dlg.querySelector('[data-close]'); if (c) c.focus();
    return true;
  }
  // Esc closes the native dialog; give focus back to the title that opened it
  if ($('pubModal')) $('pubModal').addEventListener('close', function () {
    var d = $('pubModal'); if (d._returnTo && d._returnTo.focus) { d._returnTo.focus(); d._returnTo = null; }
  });
  function closePub() {
    var dlg = $('pubModal');
    if (!dlg || !dlg.open) return;
    if (dlg.close) dlg.close(); else dlg.removeAttribute('open');
    if (dlg._returnTo && dlg._returnTo.focus) dlg._returnTo.focus();
  }

  document.addEventListener('click', function (e) {
    var dlg = $('pubModal');
    if (dlg && dlg.open) {
      if (e.target === dlg || e.target.closest('[data-close]')) { closePub(); return; }   // backdrop or close button
      var inside = e.target.closest('[data-proj]');
      if (inside) { e.preventDefault(); closePub(); focusProject(inside.getAttribute('data-proj')); return; }
    }
    var pub = e.target.closest('[data-pub]');
    if (pub && !(e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) && openPub(+pub.getAttribute('data-pub'))) { e.preventDefault(); return; }
    var pt = e.target.closest('[data-proj]');
    if (pt && focusProject(pt.getAttribute('data-proj'))) { e.preventDefault(); return; }
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
      document.dispatchEvent(new Event('contentrendered'));   // lets the hero scene re-measure its column
      // a shared link like #proj-valu3s lands on and highlights that card
      var hit = D.projects.filter(function (p) { return '#' + projId(p.name) === location.hash; })[0];
      if (hit) focusProject(hit.name);
    })
    .catch(function () {
      $('themes').innerHTML = '<p class="error">' + esc(t('loadError')) + '</p>';
    });
})();
