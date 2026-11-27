/* =========================================================
   LUYỆN VIẾT CHỮ HÁN / KANJI / KANA THEO THỨ TỰ NÉT
   Dữ liệu nét (tải khi cần, lưu lại để dùng ngoại tuyến):
   - Tiếng Nhật: KanjiVG (CC BY-SA 3.0) — kanji, hiragana, katakana
   - Tiếng Trung: Hanzi Writer data / Make Me a Hanzi (Arphic Public License)
   Mỗi nét được quy về một đường trung tâm trong khung 100×100 để vẽ & chấm.
   ========================================================= */
const StrokeData = {
  cache: new Map(),
  KVG: 'https://cdn.jsdelivr.net/npm/@madcat/kanjivg@5.0.0/dist/main/',
  HZ: 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/',
  isChar: ch => /[぀-ヿ㐀-鿿々]/.test(ch),
  /* lấy nét: tiếng Nhật ưu tiên KanjiVG, tiếng Trung ưu tiên Hanzi Writer; thiếu thì thử nguồn còn lại */
  async get(ch, ja) {
    const k = (ja ? 'j' : 'z') + ch;
    if (this.cache.has(k)) return this.cache.get(k);
    const p = (async () => {
      const order = ja ? [this.kvg, this.hz] : [this.hz, this.kvg];
      for (const f of order) { try { const r = await f.call(this, ch); if (r && r.length) return r; } catch (_) { } }
      return null;
    })();
    this.cache.set(k, p);
    return p;
  },
  async kvg(ch) {
    const hex = ch.codePointAt(0).toString(16).padStart(5, '0');
    const r = await fetch(this.KVG + hex + '.svg'); if (!r.ok) return null;
    const doc = new DOMParser().parseFromString(await r.text(), 'image/svg+xml');
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 109 109');
    svg.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden'; document.body.appendChild(svg);
    const out = [...doc.querySelectorAll('path')].map(p => {
      const el = document.createElementNS(NS, 'path'); el.setAttribute('d', p.getAttribute('d')); svg.appendChild(el);
      const L = el.getTotalLength(), pts = [];
      for (let i = 0; i <= 24; i++) { const q = el.getPointAtLength(L * i / 24); pts.push([q.x * 100 / 109, q.y * 100 / 109]); }
      return pts;
    });
    svg.remove();
    return out;
  },
  async hz(ch) {
    const r = await fetch(this.HZ + encodeURIComponent(ch) + '.json'); if (!r.ok) return null;
    const d = await r.json();
    return (d.medians || []).map(m => this.resample(m.map(([x, y]) => [x * 100 / 1024, (900 - y) * 100 / 1024]), 24));
  },
  resample(pts, n) {
    if (pts.length < 2) return pts.length ? Array(n + 1).fill(pts[0]) : [];
    const seg = []; let tot = 0;
    for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
    const out = [pts[0]]; let i = 0, acc = 0;
    for (let k = 1; k <= n; k++) {
      const target = tot * k / n;
      while (i < seg.length - 1 && acc + seg[i] < target) { acc += seg[i]; i++; }
      const t = seg[i] ? (target - acc) / seg[i] : 0;
      out.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t]);
    }
    return out;
  },
  d: pts => 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L'),
  /* so nét người viết với nét mẫu: vị trí đầu–cuối, độ lệch trung bình, hướng */
  match(user, exp) {
    if (user.length < 2) return { ok: false, why: 'Nét quá ngắn' };
    const u = this.resample(user, 24), e = exp;
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const avg = u.reduce((s, p, i) => s + dist(p, e[i]), 0) / u.length;
    const rev = u.reduce((s, p, i) => s + dist(p, e[e.length - 1 - i]), 0) / u.length;
    const len = e.reduce((s, p, i) => i ? s + dist(p, e[i - 1]) : 0, 0);
    const tol = Math.max(11, Math.min(18, len * .35));
    if (avg <= tol && dist(u[0], e[0]) <= tol * 1.5 && dist(u[u.length - 1], e[e.length - 1]) <= tol * 1.6) return { ok: true };
    if (rev <= tol) return { ok: false, why: 'Viết ngược chiều nét rồi' };
    return { ok: false, why: dist(u[0], e[0]) > tol * 1.5 ? 'Điểm bắt đầu chưa đúng' : 'Hình nét chưa giống' };
  }
};

/* một ô viết chữ */
function strokeBox(host, strokes, opt = {}) {
  const grid = `<path d="M0 50H100M50 0V100" class="wr-grid"/><path d="M0 0L100 100M100 0L0 100" class="wr-grid wr-diag"/>`;
  host.innerHTML = `<svg class="wr-svg" viewBox="0 0 100 100">${grid}<g class="wr-ghost"></g><g class="wr-done"></g><g class="wr-anim"></g><path class="wr-live" d=""/><g class="wr-hint"></g></svg>`;
  const svg = host.querySelector('svg'), $g = s => svg.querySelector(s);
  const path = (pts, cls) => `<path d="${StrokeData.d(pts)}" class="${cls}"/>`;
  let i = 0, miss = 0, mistakes = 0, drawing = null, onDone = opt.onDone || (() => { });
  const state = { get mistakes() { return mistakes; }, get done() { return i >= strokes.length; } };
  const ghost = on => { $g('.wr-ghost').innerHTML = on ? strokes.map(s => path(s, 'wr-g')).join('') : ''; };
  const hint = () => { const s = strokes[i]; if (!s) return; $g('.wr-hint').innerHTML = path(s, 'wr-h') + `<circle cx="${s[0][0]}" cy="${s[0][1]}" r="4" class="wr-start"/>`; setTimeout(() => { if ($g('.wr-hint')) $g('.wr-hint').innerHTML = ''; }, 1400); };
  state.ghost = ghost; state.hint = hint;
  state.reset = () => { i = 0; miss = 0; mistakes = 0; $g('.wr-done').innerHTML = ''; };
  state.animate = async () => {
    const a = $g('.wr-anim'); a.innerHTML = '';
    for (const s of strokes) {
      if (!svg.isConnected) return;
      a.insertAdjacentHTML('beforeend', path(s, 'wr-a'));
      const p = a.lastElementChild, L = p.getTotalLength();
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      p.getBoundingClientRect(); p.style.transition = 'stroke-dashoffset .5s linear'; p.style.strokeDashoffset = 0;
      await new Promise(r => setTimeout(r, 560));
    }
    await new Promise(r => setTimeout(r, 700)); if (svg.isConnected) a.innerHTML = '';
  };
  const pt = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 100 / r.width, (e.clientY - r.top) * 100 / r.height]; };
  svg.addEventListener('pointerdown', e => { if (state.done || opt.readOnly) return; e.preventDefault(); svg.setPointerCapture(e.pointerId); drawing = [pt(e)]; });
  svg.addEventListener('pointermove', e => { if (!drawing) return; drawing.push(pt(e)); $g('.wr-live').setAttribute('d', StrokeData.d(drawing)); });
  const up = () => {
    if (!drawing) return;
    const u = drawing; drawing = null; $g('.wr-live').setAttribute('d', '');
    if (u.length < 3) return;
    const r = StrokeData.match(u, strokes[i]);
    if (r.ok) {
      $g('.wr-done').insertAdjacentHTML('beforeend', path(strokes[i], 'wr-d')); i++; miss = 0;
      opt.onStroke && opt.onStroke(true, i, strokes.length);
      if (i >= strokes.length) onDone(mistakes);
    } else {
      mistakes++; miss++;
      opt.onStroke && opt.onStroke(false, i, strokes.length, r.why);
      if (miss >= 3) hint();
    }
  };
  svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
  return state;
}

Object.assign(Lang, {
  /* tab ✍️ Viết chữ */
  async writing(el, c, sc) {
    const ja = isJa(c);
    const pool = this.cardsIn(c.id, sc).filter(x => [...(x.word || '')].some(StrokeData.isChar) && [...x.word].filter(StrokeData.isChar).length <= 4);
    const S = Store.settings();
    let src = S.wrSrc || 'study';
    const pick = () => {
      const now = Date.now();
      const list = src === 'study' ? pool.filter(x => x.seen).sort((a, b) => (a.due || 0) - (b.due || 0)) : src === 'leech' ? pool.filter(x => (x.lapses || 0) >= 2) : shuffle([...pool]);
      return (src === 'study' ? list.filter(x => (x.due || 0) <= now + DAY).concat(list) : list).filter((x, i, a) => a.indexOf(x) === i).slice(0, 20);
    };
    if (!pool.length) { el.innerHTML = `<div class="empty big">${Art.creature('booky', { size: 100 })}<p>Phạm vi này chưa có thẻ nào chứa chữ Hán / kana để luyện viết.</p></div>`; return; }
    let queue = pick(), idx = 0, total = 0, perfect = 0;
    el.innerHTML = `<div class="wr-top"><div class="seg" id="wrSrc"><button data-s="study">🧠 Từ đang học</button><button data-s="leech">🐛 Hay quên</button><button data-s="all">🎲 Ngẫu nhiên</button></div>
      <span class="grow"></span><span class="muted" id="wrProg"></span></div><div id="wrStage"></div>
      <p class="muted sm wr-credit">Dữ liệu nét: ${ja ? 'KanjiVG (CC BY-SA 3.0)' : 'Make Me a Hanzi / Hanzi Writer (Arphic Public License)'} · tải từ jsDelivr khi cần.</p>`;
    $$('#wrSrc button', el).forEach(b => { b.classList.toggle('on', b.dataset.s === src); b.onclick = () => { src = S.wrSrc = b.dataset.s; Store.save('settings'); $$('#wrSrc button', el).forEach(x => x.classList.toggle('on', x === b)); queue = pick(); idx = 0; word(); }; });
    const word = async () => {
      const st = $('#wrStage', el); if (!st) return;
      $('#wrProg', el).textContent = queue.length ? `Từ ${Math.min(idx + 1, queue.length)}/${queue.length}` : '';
      if (idx >= queue.length) {
        st.innerHTML = `<div class="empty big">${Art.creature(Pet.form(), { size: 110, mood: 'star' })}<h2>${queue.length ? 'Viết xong rồi! ✍️' : 'Chưa có từ phù hợp'}</h2><p>${queue.length ? `${total} từ · ${perfect} từ viết không sai nét nào.` : 'Hãy học thêm vài thẻ rồi quay lại, hoặc chọn “Ngẫu nhiên”.'}</p>${queue.length ? '<button class="btn pri" id="wrAgain">Luyện lượt mới</button>' : ''}</div>`;
        if (total) Sfx.jingle();
        $('#wrAgain', st) && ($('#wrAgain', st).onclick = () => { queue = pick(); idx = 0; total = perfect = 0; word(); });
        return;
      }
      const x = queue[idx], chars = [...x.word].filter(StrokeData.isChar);
      st.innerHTML = `<div class="wr-card"><div class="wr-q"><div class="wr-mean">${esc(x.meaning || x.def || '')}</div><div class="muted">${esc(x.ipa || '')}${x.pos ? ' · ' + esc(x.pos) : ''}</div>
          <div class="wr-word" hidden>${esc(x.word)}</div></div>
        <div class="wr-boxes">${chars.map((ch, i) => `<div class="wr-box" data-i="${i}"><div class="wr-load">⏳</div></div>`).join('')}</div>
        <div class="wr-msg" id="wrMsg">Viết chữ thứ nhất theo đúng thứ tự nét. Không nhớ thì bấm 👁.</div>
        <div class="row wr-tools"><button class="btn sm" id="wrShow">👁 Xem cách viết</button><button class="btn sm" id="wrGhost">💡 Hiện nét mờ</button><button class="btn sm" id="wrHint">📍 Gợi ý nét này</button><button class="btn sm" id="wrRedo">↺ Viết lại</button><span class="grow"></span><button class="btn sm" id="wrSkip">Bỏ qua ⏭</button></div></div>`;
      const data = await Promise.all(chars.map(ch => StrokeData.get(ch, ja)));
      if (!st.isConnected) return;
      let cur = 0, mist = 0, ghostOn = false; const boxes = [];
      const msg = t => { const m = $('#wrMsg', st); if (m) m.innerHTML = t; };
      const finish = () => {
        $('.wr-word', st).hidden = false; Speech.speak(x.word, c.lang);
        total++; if (!mist) perfect++;
        Lang.track(c.id, 'write');
        msg(mist ? `Xong! Sai ${mist} nét — viết thêm lần nữa cho nhớ nhé.` : '🌟 Hoàn hảo, không sai nét nào!');
        $('#wrSkip', st).textContent = 'Từ tiếp →'; $('#wrSkip', st).classList.add('pri');
      };
      const focus = i => { cur = i; $$('.wr-box', st).forEach((b, k) => b.classList.toggle('on', k === i)); if (boxes[i]) boxes[i].ghost(ghostOn); };
      data.forEach((d, i) => {
        const host = $(`.wr-box[data-i="${i}"]`, st);
        if (!d) { host.innerHTML = `<div class="wr-nodata">${esc(chars[i])}<small>chưa có dữ liệu nét</small></div>`; boxes[i] = null; return; }
        boxes[i] = strokeBox(host, d, {
          onStroke: (ok, n, all, why) => { if (cur !== i) focus(i); if (!ok) { mist++; msg(`✗ ${why || 'Chưa đúng'} — thử lại nét ${n + 1}/${all}.`); Sfx.click?.(); } else msg(`✓ Nét ${n}/${all}`); },
          onDone: () => { const nx = boxes.findIndex((b, k) => k > i && b && !b.done); if (nx >= 0) { focus(nx); msg(`Tốt! Giờ tới chữ thứ ${nx + 1}.`); } else if (boxes.every(b => !b || b.done)) finish(); }
        });
      });
      const first = boxes.findIndex(Boolean); if (first < 0) { msg('Chưa có dữ liệu nét cho từ này.'); } else focus(first);
      if (boxes.every(b => !b)) { $('#wrSkip', st).textContent = 'Từ tiếp →'; }
      $('#wrShow', st).onclick = async () => { const b = boxes[cur]; if (b) await b.animate(); };
      $('#wrGhost', st).onclick = e => { ghostOn = !ghostOn; e.target.classList.toggle('on', ghostOn); boxes.forEach(b => b && b.ghost(ghostOn)); };
      $('#wrHint', st).onclick = () => boxes[cur]?.hint();
      $('#wrRedo', st).onclick = () => { boxes.forEach(b => b && b.reset()); mist = 0; $('.wr-word', st).hidden = true; focus(first); msg('Viết lại từ đầu nhé.'); $('#wrSkip', st).textContent = 'Bỏ qua ⏭'; $('#wrSkip', st).classList.remove('pri'); };
      $('#wrSkip', st).onclick = () => { idx++; word(); };
    };
    word();
  }
});
