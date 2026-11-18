/* Animated hero scene: four panels that illustrate the main lines of work.
   01 robot arm on an inspection line · 02 camera fault injection
   03 neural network / generative AI   · 04 local LLM streaming an answer
   Pure canvas, no dependencies. Pauses off-screen; static frame for reduced motion. */
(function () {
  'use strict';
  var cv = document.getElementById('scene');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');

  var C = {
    panel: '#11161D', border: '#2A3340', grid: '#1A212B', text: '#9DA7B3', hi: '#E6EDF3',
    acc: '#F2B84B', ok: '#7EE787', blue: '#79C0FF', red: '#FF7B72', dim: '#3A4553'
  };
  var MONO = '"JetBrains Mono", ui-monospace, Consolas, monospace';

  var TXT = {
    en: {
      labels: ['robotics V&V', 'camera fault injection', 'generative AI', 'local LLMs'],
      faults: ['clean', 'salt & pepper', 'motion blur', 'glitch'], faultLabel: 'fault:',
      ok: 'PASS', bad: 'ANOMALY',
      prompt: '> summarize CNC spindle log',
      answer: 'Vibration rose steadily over 3 shifts while temperature stayed flat: early bearing wear is likely. Schedule an inspection before the next batch.',
      offline: '● local · offline',
      aria: 'Animation: a robot arm inspecting parts, camera images with injected faults, a neural network, and a local language model answering a question.'
    },
    tr: {
      labels: ['robotik doğrulama', 'kamera hata enjeksiyonu', 'üretken yapay zekâ', "lokal LLM'ler"],
      faults: ['temiz', 'tuz & biber', 'hareket bulanıklığı', 'bozulma'], faultLabel: 'hata:',
      ok: 'GEÇTİ', bad: 'ANOMALİ',
      prompt: '> CNC iş mili kaydını özetle',
      answer: 'Titreşim 3 vardiya boyunca artarken sıcaklık sabit kaldı: erken rulman aşınması olası. Sonraki partiden önce bakım planlayın.',
      offline: '● lokal · çevrimdışı',
      aria: 'Animasyon: parçaları denetleyen robot kol, hata enjekte edilmiş kamera görüntüleri, bir sinir ağı ve soruyu yanıtlayan lokal dil modeli.'
    }
  };
  function T() { return TXT[document.documentElement.lang === 'tr' ? 'tr' : 'en']; }

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, cols = 4, panels = [], visible = true, raf = 0, lastLang = '';
  var start = performance.now();

  // deterministic pseudo random
  function rnd(seed) { var x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  function rr(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  function resize() {
    var rect = cv.parentElement.getBoundingClientRect();
    W = Math.max(280, Math.floor(rect.width));
    cols = W >= 960 ? 4 : (W >= 560 ? 2 : 1);
    var rows = 4 / cols;
    var ph = cols === 4 ? 260 : (cols === 2 ? 240 : 180);
    var gap = cols === 4 ? 28 : 14;
    H = rows * ph + (rows - 1) * gap;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var pw = (W - (cols - 1) * gap) / cols;
    panels = [];
    for (var i = 0; i < 4; i++) {
      var c = i % cols, r = Math.floor(i / cols);
      panels.push({ x: c * (pw + gap), y: r * (ph + gap), w: pw, h: ph });
    }
    panels.gap = gap;
    if (!raf) frame(performance.now());
  }

  function panelFrame(p, i) {
    rr(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1, 10);
    ctx.fillStyle = C.panel; ctx.fill();
    ctx.strokeStyle = C.border; ctx.lineWidth = 1; ctx.stroke();
    // dotted grid
    ctx.fillStyle = C.grid;
    for (var gx = p.x + 14; gx < p.x + p.w - 8; gx += 16)
      for (var gy = p.y + 14; gy < p.y + p.h - 30; gy += 16) ctx.fillRect(gx, gy, 1.5, 1.5);
    ctx.font = '12px ' + MONO; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.acc; ctx.fillText('0' + (i + 1), p.x + 14, p.y + p.h - 12);
    ctx.fillStyle = C.text; ctx.fillText('· ' + T().labels[i], p.x + 36, p.y + p.h - 12);
  }

  // 01 — robot inspection cell: an arm with a camera tool sweeps a vehicle chassis.
  // Two-link inverse kinematics keeps the tool on a smooth path just above the body.
  function drawRobot(p, t) {
    var floor = p.y + p.h - 40;
    // chassis (body-in-white) on the right
    var cx0 = p.x + p.w * 0.40, cx1 = p.x + p.w - 14, ctop = floor - 46, cbot = floor - 12;
    var ribs = 7, rw = (cx1 - cx0) / ribs;
    // arm geometry
    var sx = p.x + Math.max(34, p.w * 0.17), sy = floor - 30;
    var ty = ctop - Math.max(26, p.h * 0.12);
    var room = sy - (p.y + 12);                       // keep the elbow inside the panel
    var far = Math.hypot(cx1 - rw * 0.5 - sx, ty - sy);
    var L = Math.min(far * 0.53, room * 0.98);
    var L1 = L, L2 = L * 0.92;
    var reach = (L1 + L2) * 0.97;
    var xMax = Math.min(cx1 - rw * 0.5, sx + Math.sqrt(Math.max(0, reach * reach - (ty - sy) * (ty - sy))));
    var xMin = cx0 + rw * 0.5;
    // eased back-and-forth sweep with a short dwell at each end
    var ph = (t * 0.32) % 2, dirRight = ph < 1, u = dirRight ? ph : 2 - ph;
    u = u < 0.08 ? 0 : u > 0.92 ? 1 : (u - 0.08) / 0.84;
    u = u * u * (3 - 2 * u);
    var tx = xMin + (xMax - xMin) * u;
    var bob = Math.sin(t * 2.4) * 1.5;
    // IK (elbow up)
    var dx = tx - sx, dy = (ty + bob) - sy, d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.5);
    var c2 = (d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2); c2 = Math.max(-1, Math.min(1, c2));
    var q2 = Math.acos(c2);
    var q1 = Math.atan2(dy, dx) - Math.atan2(L2 * Math.sin(q2), L1 + L2 * Math.cos(q2));
    var ex = sx + L1 * Math.cos(q1), ey = sy + L1 * Math.sin(q1);
    var wx = ex + L2 * Math.cos(q1 + q2), wy = ey + L2 * Math.sin(q1 + q2);

    // floor and rail
    ctx.strokeStyle = C.dim; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(p.x + 12, floor); ctx.lineTo(p.x + p.w - 12, floor); ctx.stroke();
    // chassis frame
    ctx.fillStyle = '#1A212C'; rr(cx0, ctop, cx1 - cx0, cbot - ctop, 6); ctx.fill();
    for (var r = 0; r < ribs; r++) {
      var rx = cx0 + r * rw, mid = rx + rw / 2;
      var scanned = dirRight ? mid < tx - rw * 0.3 : mid > tx + rw * 0.3;
      if (scanned) { ctx.fillStyle = 'rgba(126,231,135,0.10)'; ctx.fillRect(rx + 2, ctop + 2, rw - 4, cbot - ctop - 4); }
      ctx.strokeStyle = '#2A3340'; ctx.lineWidth = 1;
      if (r) { ctx.beginPath(); ctx.moveTo(rx, ctop + 3); ctx.lineTo(rx, cbot - 3); ctx.stroke(); }
      if (scanned && rw > 18) {
        ctx.strokeStyle = C.ok; ctx.lineWidth = 1.5; ctx.beginPath();
        ctx.moveTo(mid - 4, ctop + 12); ctx.lineTo(mid - 1, ctop + 15); ctx.lineTo(mid + 5, ctop + 9); ctx.stroke();
      }
    }
    ctx.strokeStyle = C.blue; ctx.lineWidth = 1.5; rr(cx0, ctop, cx1 - cx0, cbot - ctop, 6); ctx.stroke();
    ctx.fillStyle = '#0D1117'; ctx.strokeStyle = C.dim; ctx.lineWidth = 2;
    [cx0 + (cx1 - cx0) * 0.18, cx1 - (cx1 - cx0) * 0.18].forEach(function (wxp) { ctx.beginPath(); ctx.arc(wxp, cbot + 4, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });

    // camera cone onto the body + inspection window
    var camY = wy + 14;
    var g = ctx.createLinearGradient(wx, camY, wx, ctop);
    g.addColorStop(0, 'rgba(126,231,135,0.32)'); g.addColorStop(1, 'rgba(126,231,135,0.05)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(wx - 3, camY); ctx.lineTo(wx - rw * 0.55, ctop); ctx.lineTo(wx + rw * 0.55, ctop); ctx.lineTo(wx + 3, camY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.ok; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.strokeRect(wx - rw * 0.55, ctop + 2, rw * 1.1, cbot - ctop - 4); ctx.setLineDash([]);

    // pedestal + base
    ctx.fillStyle = '#2B3442';
    ctx.beginPath(); ctx.moveTo(sx - 22, floor); ctx.lineTo(sx - 14, sy + 10); ctx.lineTo(sx + 14, sy + 10); ctx.lineTo(sx + 22, floor); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#323C4C'; rr(sx - 12, sy - 4, 24, 16, 4); ctx.fill();
    // links
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#B98A2F'; ctx.lineWidth = 11; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.strokeStyle = C.acc; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.strokeStyle = '#B98A2F'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(wx, wy); ctx.stroke();
    ctx.strokeStyle = C.acc; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(wx, wy); ctx.stroke();
    // wrist always points down to the body
    ctx.strokeStyle = C.acc; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx, wy + 8); ctx.stroke();
    ctx.lineCap = 'butt';
    // joints
    [[sx, sy, 7], [ex, ey, 6], [wx, wy, 4.5]].forEach(function (j) {
      ctx.fillStyle = C.panel; ctx.strokeStyle = C.acc; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(j[0], j[1], j[2], 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    // camera tool
    ctx.fillStyle = '#2B3442'; rr(wx - 8, wy + 7, 16, 9, 2); ctx.fill();
    ctx.strokeStyle = C.ok; ctx.lineWidth = 1; rr(wx - 8, wy + 7, 16, 9, 2); ctx.stroke();
    ctx.fillStyle = (Math.floor(t * 4) % 2) ? C.ok : '#3E7A45'; ctx.beginPath(); ctx.arc(wx, wy + 11.5, 2, 0, Math.PI * 2); ctx.fill();
  }

  // 02 — reference part image, scan line, cycling injected faults
  function drawPart(x, y, s) {
    ctx.fillStyle = '#1D2532'; ctx.fillRect(x, y, s, s);
    var cx = x + s / 2, cy = y + s / 2, R = s * 0.32;
    ctx.fillStyle = '#4A5568';
    ctx.beginPath();
    for (var k = 0; k < 16; k++) {
      var a = k / 16 * Math.PI * 2, r = k % 2 ? R : R * 1.18;
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#1D2532'; ctx.beginPath(); ctx.arc(cx, cy, R * 0.42, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#6B7A90';
    for (var h = 0; h < 4; h++) { var b = h / 4 * Math.PI * 2 + 0.4; ctx.beginPath(); ctx.arc(cx + Math.cos(b) * R * 0.7, cy + Math.sin(b) * R * 0.7, R * 0.09, 0, Math.PI * 2); ctx.fill(); }
  }
  function drawFault(p, t) {
    var tt = T();
    var s = Math.min(p.w * 0.52, p.h - 76), x = p.x + 18, y = p.y + 22;
    var phase = Math.floor(t / 2.2) % 4, local = (t % 2.2) / 2.2;
    if (phase === 2) {
      ctx.globalAlpha = 0.28;
      for (var m = 0; m < 6; m++) drawPart(x + m * 2.2, y, s);
      ctx.globalAlpha = 1;
    } else {
      drawPart(x, y, s);
    }
    if (phase === 1) {
      var seed = Math.floor(t * 12);
      for (var n = 0; n < 160; n++) {
        ctx.fillStyle = rnd(seed + n * 3.1) > 0.5 ? '#FFFFFF' : '#000000';
        ctx.fillRect(x + rnd(seed + n) * s, y + rnd(seed + n * 7.7) * s, 2, 2);
      }
    }
    if (phase === 3) {
      var sd = Math.floor(t * 8);
      for (var sl = 0; sl < 6; sl++) {
        var yy = y + rnd(sd + sl) * s, hh = 4 + rnd(sd + sl * 2) * 10, dx = (rnd(sd + sl * 5) - 0.5) * 26;
        ctx.drawImage(cv, x * dpr(), yy * dpr(), s * dpr(), hh * dpr(), x + dx, yy, s, hh);
        ctx.fillStyle = sl % 2 ? 'rgba(255,123,114,0.35)' : 'rgba(121,192,255,0.35)';
        ctx.fillRect(x, yy, s, hh);
      }
    }
    // scan line
    var sy = y + local * s;
    ctx.fillStyle = 'rgba(126,231,135,0.5)'; ctx.fillRect(x, sy, s, 1.5);
    ctx.strokeStyle = C.border; ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
    // verdict panel
    var ix = x + s + 16, iw = p.x + p.w - ix - 14;
    ctx.font = '11px ' + MONO; ctx.fillStyle = C.text;
    ctx.fillText(tt.faultLabel, ix, y + 14);
    ctx.fillStyle = phase === 0 ? C.ok : C.acc; ctx.font = '12px ' + MONO;
    wrapText(tt.faults[phase], ix, y + 32, iw, 16);
    var bad = phase !== 0 && local > 0.45;
    ctx.fillStyle = bad ? 'rgba(255,123,114,0.14)' : 'rgba(126,231,135,0.12)';
    rr(ix, y + s - 30, Math.min(iw, 96), 26, 5); ctx.fill();
    ctx.fillStyle = bad ? C.red : C.ok; ctx.font = '600 12px ' + MONO;
    ctx.fillText(bad ? tt.bad : tt.ok, ix + 10, y + s - 12);
    if (bad) { ctx.strokeStyle = C.red; ctx.lineWidth = 1.5; ctx.strokeRect(x + s * 0.18, y + s * 0.18, s * 0.64, s * 0.64); }
    ctx.lineWidth = 1;
  }
  function dpr() { return cv.width / W; }

  // 03 — neural net with signals flowing layer by layer, generated tiles on the right
  function drawNet(p, t) {
    var layers = [3, 5, 5, 3], x0 = p.x + 26, x1 = p.x + p.w * 0.72, top = p.y + 26, bot = p.y + p.h - 46;
    var pts = layers.map(function (n, li) {
      var x = x0 + (x1 - x0) * li / (layers.length - 1), arr = [];
      for (var k = 0; k < n; k++) arr.push([x, top + (bot - top) * (k + 1) / (n + 1)]);
      return arr;
    });
    ctx.strokeStyle = '#232C38'; ctx.lineWidth = 1;
    for (var l = 0; l < pts.length - 1; l++)
      pts[l].forEach(function (a) { pts[l + 1].forEach(function (b) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }); });
    // pulses
    var cycle = 2.6, ph = (t % cycle) / cycle * (layers.length - 1), li2 = Math.floor(ph), f = ph - li2;
    if (li2 < layers.length - 1) {
      for (var q = 0; q < 7; q++) {
        var a = pts[li2][Math.floor(rnd(q + Math.floor(t / cycle) * 13 + li2) * pts[li2].length)];
        var b = pts[li2 + 1][Math.floor(rnd(q * 3.3 + Math.floor(t / cycle) * 7 + li2) * pts[li2 + 1].length)];
        var px = a[0] + (b[0] - a[0]) * f, py = a[1] + (b[1] - a[1]) * f;
        ctx.strokeStyle = 'rgba(121,192,255,0.5)'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(px, py); ctx.stroke();
        ctx.fillStyle = C.blue; ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    pts.forEach(function (layer, li) {
      layer.forEach(function (n, k) {
        var act = 0.5 + 0.5 * Math.sin(t * 2 + li * 1.3 + k);
        ctx.fillStyle = C.panel; ctx.strokeStyle = li === Math.round(ph) ? C.blue : C.dim; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n[0], n[1], 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(121,192,255,' + (0.15 + 0.6 * act).toFixed(2) + ')';
        ctx.beginPath(); ctx.arc(n[0], n[1], 3, 0, Math.PI * 2); ctx.fill();
      });
    });
    // generated samples: tiles that "develop" from noise to an image
    var tx = x1 + 22, tw = Math.min(p.x + p.w - tx - 14, 46);
    if (tw > 18) {
      for (var g = 0; g < 3; g++) {
        var ty = top + g * (tw + 10);
        if (ty + tw > p.y + p.h - 34) break;
        var dev = Math.min(1, Math.max(0, ((t + g * 0.8) % 3.6) / 2.4));
        ctx.fillStyle = '#1D2532'; ctx.fillRect(tx, ty, tw, tw);
        var cells = 6, cs = tw / cells;
        for (var cx = 0; cx < cells; cx++) for (var cy = 0; cy < cells; cy++) {
          var target = ((cx - 2.5) * (cx - 2.5) + (cy - 2.5) * (cy - 2.5)) < 5 ? 0.85 : 0.18;
          var noise = rnd(cx * 9 + cy * 31 + g * 101 + Math.floor(t * 6));
          var v = noise * (1 - dev) + target * dev;
          ctx.fillStyle = 'rgba(242,184,75,' + v.toFixed(2) + ')'; ctx.fillRect(tx + cx * cs, ty + cy * cs, cs - 0.5, cs - 0.5);
        }
        ctx.strokeStyle = C.border; ctx.strokeRect(tx + 0.5, ty + 0.5, tw - 1, tw - 1);
      }
    }
    ctx.lineWidth = 1;
  }

  // 04 — terminal with a local model streaming an answer
  function wrapText(str, x, y, maxW, lh, maxLines) {
    var words = str.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y + n * lh); n++; line = words[i];
        if (maxLines && n >= maxLines) return n;
      } else line = test;
    }
    if (line) { ctx.fillText(line, x, y + n * lh); n++; }
    return n;
  }
  function drawLLM(p, t) {
    var tt = T();
    var x = p.x + 16, y = p.y + 16, w = p.w - 32, h = p.h - 58;
    rr(x, y, w, h, 6); ctx.fillStyle = '#0B0F14'; ctx.fill(); ctx.strokeStyle = C.border; ctx.stroke();
    ctx.fillStyle = C.dim; [0, 1, 2].forEach(function (k) { ctx.beginPath(); ctx.arc(x + 12 + k * 10, y + 11, 3, 0, Math.PI * 2); ctx.fill(); });
    ctx.font = '11px ' + MONO; ctx.fillStyle = C.ok;
    var off = tt.offline, ow = ctx.measureText(off).width;
    if (ow < w - 60) ctx.fillText(off, x + w - ow - 10, y + 15);
    var period = 9, lt = t % period;
    var lh = 16, ix = x + 12, iw = w - 24, iy = y + 40;
    ctx.font = '12px ' + MONO;
    var blink = Math.floor(t * 3) % 2 === 0;
    var pChars = Math.min(tt.prompt.length, Math.floor(lt * 22));
    ctx.fillStyle = C.acc;
    var pl = splitLines(tt.prompt.slice(0, pChars), iw);
    pl.forEach(function (ln, k) { ctx.fillText(ln, ix, iy + k * lh); });
    var fullPromptLines = splitLines(tt.prompt, iw).length;
    if (pChars < tt.prompt.length) {
      if (blink) cursor(ix, iy, pl, lh);
      return;
    }
    var ay = iy + fullPromptLines * lh + 8;
    var at = lt - tt.prompt.length / 22 - 0.4;
    var aChars = Math.max(0, Math.min(tt.answer.length, Math.floor(at * 38)));
    var maxLines = Math.max(1, Math.floor((y + h - 8 - ay) / lh) + 1);
    var al = splitLines(tt.answer.slice(0, aChars), iw);
    if (al.length > maxLines) al = al.slice(al.length - maxLines); // scroll like a terminal
    ctx.fillStyle = C.hi;
    al.forEach(function (ln, k) { ctx.fillText(ln, ix, ay + k * lh); });
    if (aChars < tt.answer.length && blink) cursor(ix, ay, al, lh);
  }
  function splitLines(str, maxW) {
    var out = [], line = '';
    str.split(' ').forEach(function (wd) {
      var test = line ? line + ' ' + wd : wd;
      if (ctx.measureText(test).width > maxW && line) { out.push(line); line = wd; } else line = test;
    });
    out.push(line);
    return out;
  }
  function cursor(x, y, lines, lh) {
    var li = lines.length - 1;
    ctx.fillStyle = C.acc; ctx.fillRect(x + ctx.measureText(lines[li] || '').width + 3, y + li * lh - 11, 7, 13);
  }

  // packets flowing between panels
  function drawLinks(t) {
    for (var i = 0; i < 3; i++) {
      var a = panels[i], b = panels[i + 1];
      if (Math.abs(a.y - b.y) > 1) continue;
      var y = a.y + a.h * 0.42, x0 = a.x + a.w, x1 = b.x;
      ctx.strokeStyle = C.dim; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(x0 + 2, y); ctx.lineTo(x1 - 2, y); ctx.stroke(); ctx.setLineDash([]);
      var f = (t * 0.8 + i * 0.33) % 1;
      ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(x0 + (x1 - x0) * f, y, 2.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  var drawers = [drawRobot, drawFault, drawNet, drawLLM];

  function render(t) {
    var lang = document.documentElement.lang;
    if (lang !== lastLang) { lastLang = lang; cv.setAttribute('aria-label', T().aria); }
    ctx.clearRect(0, 0, W, H);
    panels.forEach(function (p, i) {
      panelFrame(p, i);
      ctx.save(); rr(p.x, p.y, p.w, p.h, 10); ctx.clip();
      drawers[i](p, t);
      ctx.restore();
    });
    drawLinks(t);
  }

  function frame(now) {
    raf = 0;
    render(reduce ? 7.3 : (now - start) / 1000);
    if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function wake() { if (!raf && !reduce && visible && !document.hidden) raf = requestAnimationFrame(frame); }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; wake(); }).observe(cv);
  }
  document.addEventListener('visibilitychange', wake);
  window.addEventListener('resize', resize);
  // The column width changes after the page content loads (sidebar/rail fill in, fonts swap),
  // which is not a window resize — watch the container itself and redraw when it changes.
  if ('ResizeObserver' in window) {
    var lastW = 0;
    new ResizeObserver(function (entries) {
      var w = Math.floor(entries[0].contentRect.width);
      if (w && Math.abs(w - lastW) > 1) { lastW = w; resize(); }
    }).observe(cv.parentElement);
  }
  // Also re-measure once the page content has rendered and once everything has loaded.
  document.addEventListener('contentrendered', resize);
  window.addEventListener('load', resize);
  document.addEventListener('langchange', function () { if (reduce || !raf) render(reduce ? 7.3 : (performance.now() - start) / 1000); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (reduce) render(7.3); });
  resize();
})();
