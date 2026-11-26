/* =========================================================
   EXTRAS — Hộp nhạc · Thùng thư · Thú cưng · Sổ tem ·
            Ấp trứng (Pomodoro) · Tìm kiếm · Cài đặt
   ========================================================= */

/* ================= HỘP NHẠC ================= */
const NOTE = n => { const m = n.match(/^([A-G])(#|b)?(\d)$/); if (!m) return 0; const i = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0); return 440 * Math.pow(2, (i - 9) / 12 + (+m[3] - 4)); };
/* giai điệu gốc, sáng tác riêng cho hành tinh */
const TUNES = [
  { name: 'Ru trứng', bpm: 84, n: 'E5 1,G5 1,C6 2,B5 1,G5 1,A5 2,G5 1,E5 1,F5 1,E5 1,D5 2,R 1,E5 1,G5 1,C6 2,D6 1,C6 1,B5 2,G5 1,A5 1,G5 1,F5 1,E5 3,R 1' },
  { name: 'Sáng trên hành tinh', bpm: 120, n: 'C5 .5,E5 .5,G5 .5,C6 .5,B5 1,G5 1,A5 .5,G5 .5,F5 .5,E5 .5,D5 2,D5 .5,F5 .5,A5 .5,D6 .5,C6 1,A5 1,B5 .5,A5 .5,G5 .5,F5 .5,E5 2' },
  { name: 'Mưa tím', bpm: 72, n: 'A4 1,C5 1,E5 1,A5 1,G5 2,E5 2,F5 1,E5 1,D5 1,C5 1,E5 4,D5 1,F5 1,A5 1,D6 1,C6 2,A5 2,B5 1,G5 1,E5 1,G#5 1,A5 4' },
  { name: 'Vòng quay hộp nhạc', bpm: 100, n: 'G5 .5,E5 .5,C5 .5,E5 .5,G5 .5,C6 .5,E6 1,D6 .5,C6 .5,B5 .5,A5 .5,G5 2,F5 .5,A5 .5,C6 .5,A5 .5,G5 .5,E5 .5,C5 1,D5 .5,E5 .5,F5 .5,D5 .5,C5 2' },
];
const Music = {
  open: false, playing: null, timer: null, loop: true, ambient: {},
  toggle() { this.open = !this.open; this.open ? this.render() : $('#musicPanel')?.remove(); },
  pluck(f, t, dur = 1.6, vol = .16) {
    const a = Sfx.ac(); const g = a.createGain(); g.connect(a.destination);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    [[1, 'sine', 1], [2.01, 'sine', .3], [3.98, 'triangle', .08]].forEach(([m, type, v]) => { const o = a.createOscillator(), og = a.createGain(); o.type = type; o.frequency.value = f * m; og.gain.value = v; o.connect(og).connect(g); o.start(t); o.stop(t + dur); });
  },
  play(i) {
    this.stop(); const tune = TUNES[i]; const a = Sfx.ac(); const beat = 60 / tune.bpm;
    const seq = tune.n.split(',').map(s => s.trim().split(' '));
    const total = seq.reduce((s, [, d]) => s + +d, 0) * beat;
    const schedule = () => { let t = a.currentTime + .05; seq.forEach(([n, d]) => { if (n !== 'R') this.pluck(NOTE(n), t); t += +d * beat; }); };
    schedule(); this.playing = i;
    this.timer = setInterval(() => { if (this.loop) schedule(); else this.stop(); }, total * 1000);
    $('#musicPanel')?.classList.add('spinning'); this.renderBody();
  },
  stop() { clearInterval(this.timer); this.playing = null; $('#musicPanel')?.classList.remove('spinning'); },
  /* âm thanh nền tổng hợp */
  noiseBuf(kind) {
    const a = Sfx.ac(); const len = a.sampleRate * 4; const b = a.createBuffer(1, len, a.sampleRate); const d = b.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; if (kind === 'brown') { last = (last + .02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w; }
    return b;
  },
  amb(kind, vol) {
    const a = Sfx.ac();
    if (this.ambient[kind]) { this.ambient[kind].g.gain.value = vol; if (vol > 0) return; this.ambient[kind].stop(); delete this.ambient[kind]; return; }
    if (vol <= 0) return;
    const src = a.createBufferSource(); src.buffer = this.noiseBuf(kind === 'brown' || kind === 'ocean' ? 'brown' : 'white'); src.loop = true;
    const f = a.createBiquadFilter(); const g = a.createGain(); g.gain.value = vol;
    const extra = [];
    if (kind === 'rain') { f.type = 'highpass'; f.frequency.value = 900; }
    if (kind === 'wind') { f.type = 'bandpass'; f.frequency.value = 500; f.Q.value = .7; const l = a.createOscillator(), lg = a.createGain(); l.frequency.value = .12; lg.gain.value = 300; l.connect(lg).connect(f.frequency); l.start(); extra.push(l); }
    if (kind === 'ocean') { f.type = 'lowpass'; f.frequency.value = 700; const l = a.createOscillator(), lg = a.createGain(); l.frequency.value = .09; lg.gain.value = .5; const mg = a.createGain(); mg.gain.value = .6; l.connect(lg).connect(mg.gain); l.start(); extra.push(l); src.connect(f).connect(mg).connect(g).connect(a.destination); }
    if (kind === 'brown') { f.type = 'lowpass'; f.frequency.value = 400; }
    if (kind === 'fire') { f.type = 'lowpass'; f.frequency.value = 300; const crack = () => { if (!this.ambient.fire) return; const o = a.createBufferSource(); o.buffer = this.noiseBuf('white'); const cg = a.createGain(); const t = a.currentTime; cg.gain.setValueAtTime(this.ambient.fire.g.gain.value * .8, t); cg.gain.exponentialRampToValueAtTime(.0001, t + .04); o.connect(cg).connect(a.destination); o.start(t, Math.random()); o.stop(t + .05); setTimeout(crack, 80 + Math.random() * 600); }; setTimeout(crack, 200); }
    if (kind !== 'ocean') src.connect(f).connect(g).connect(a.destination);
    src.start();
    this.ambient[kind] = { g, stop: () => { src.stop(); extra.forEach(x => x.stop()); } };
  },
  render() {
    $('#musicPanel')?.remove();
    const p = document.createElement('div'); p.id = 'musicPanel'; p.className = 'music-panel' + (this.playing !== null ? ' spinning' : '');
    p.innerHTML = `<div class="mp-head"><span class="mp-art">${Art.deco.musicbox(110)}</span><div><b>Hộp Nhạc</b><small>lên dây cót là hát ♪</small></div><button class="x" id="mpX">✕</button></div>
      <div class="seg" id="mpTabs"><button data-t="tunes" class="on">🎼 Giai điệu</button><button data-t="amb">🌧️ Âm nền</button><button data-t="list">📻 Playlist</button></div>
      <div id="mpBody"></div>`;
    document.body.appendChild(p);
    $('#mpX').onclick = () => this.toggle();
    this.tab = this.tab || 'tunes';
    $$('#mpTabs button').forEach(b => { b.classList.toggle('on', b.dataset.t === this.tab); b.onclick = () => { this.tab = b.dataset.t; $$('#mpTabs button').forEach(x => x.classList.toggle('on', x === b)); this.renderBody(); }; });
    this.renderBody();
  },
  renderBody() {
    const b = $('#mpBody'); if (!b) return;
    if (this.tab === 'tunes') {
      b.innerHTML = TUNES.map((t, i) => `<button class="tune ${this.playing === i ? 'on' : ''}" data-i="${i}">${this.playing === i ? '⏸' : '▶'} ${t.name}</button>`).join('') + `<label class="row"><input type="checkbox" id="mpLoop" ${this.loop ? 'checked' : ''}> lặp lại</label><p class="muted sm">Giai điệu gốc tổng hợp bằng Web Audio — như tiếng răng lược thép gảy vào trục quay.</p>`;
      $$('.tune', b).forEach(x => x.onclick = () => this.playing === +x.dataset.i ? (this.stop(), this.renderBody()) : this.play(+x.dataset.i));
      $('#mpLoop').onchange = e => this.loop = e.target.checked;
    } else if (this.tab === 'amb') {
      const A = [['rain', '🌧️ Mưa'], ['ocean', '🌊 Sóng biển'], ['fire', '🔥 Lửa trại'], ['wind', '🍃 Gió'], ['brown', '🟤 Tiếng ồn nâu (tập trung)']];
      b.innerHTML = A.map(([k, l]) => `<label class="amb"><span>${l}</span><input type="range" min="0" max=".6" step=".02" value="${this.ambient[k]?.g.gain.value || 0}" data-k="${k}"></label>`).join('') + '<p class="muted sm">Trộn nhiều âm cùng lúc để tạo không khí đọc sách riêng.</p>';
      $$('input[data-k]', b).forEach(r => r.oninput = () => this.amb(r.dataset.k, +r.value));
    } else {
      const pl = Store.list('playlist');
      b.innerHTML = `<div class="row"><input class="inp sm grow" id="plU" placeholder="Link YouTube / Spotify / mp3…"><button class="btn sm pri" id="plA">＋</button></div>
        <button class="btn sm" id="plF">📁 Phát file nhạc trong máy</button>
        <div class="pl-list">${pl.map((x, i) => `<div class="pl-it"><button data-p="${i}">▶</button><span>${esc(x.title)}</span><button data-d="${i}">✕</button></div>`).join('') || '<p class="muted sm">Chưa có bài nào.</p>'}</div><div id="plPlayer"></div>`;
      $('#plA').onclick = async () => { const u = $('#plU').value.trim(); if (!u) return; const t = await promptBox('Tên bài', u.split('/').pop().slice(0, 40)); pl.push({ url: u, title: t || u }); Store.save('playlist'); this.renderBody(); };
      $('#plF').onclick = async () => { const f = await pickFile('audio/*'); if (f) this.embed(URL.createObjectURL(f), true); };
      b.onclick = e => { const p = e.target.dataset.p, d = e.target.dataset.d; if (p !== undefined) this.embed(pl[+p].url); if (d !== undefined) { pl.splice(+d, 1); Store.save('playlist'); this.renderBody(); } };
    }
  },
  embed(u, isFile) {
    let h; let m;
    if (isFile || /\.(mp3|ogg|wav|m4a|flac)(\?|$)/i.test(u)) h = `<audio controls autoplay src="${esc(u)}"></audio>`;
    else if ((m = u.match(/(?:youtu\.be\/|v=)([\w-]{11})/))) h = `<iframe src="https://www.youtube.com/embed/${m[1]}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    else if ((m = u.match(/open\.spotify\.com\/(track|album|playlist|episode)\/(\w+)/))) h = `<iframe src="https://open.spotify.com/embed/${m[1]}/${m[2]}" allow="autoplay; encrypted-media" style="height:152px"></iframe>`;
    else h = `<a href="${esc(u)}" target="_blank" rel="noopener">Mở liên kết ↗</a>`;
    $('#plPlayer').innerHTML = h;
  }
};

/* ================= THÚ CƯNG ================= */
const STAGES = [[0, 'Trứng', 'egg'], [30, 'Bé Mây', 'cloud'], [150, 'Nốt Nhí', 'note'], [500, 'Trang Thiếu Niên', 'booky'], [1500, 'Mực-tchi Trưởng Thành', 'mascot'], [4000, 'Hiền Triết Ếch Kính', 'prof']];
const Pet = {
  data() { return Store.get('pet', { xp: 0, hunger: 70, happy: 70, smart: 50, last: Date.now(), name: 'Chữ-tchi', poop: 0 }); },
  tick() {
    const p = this.data(); const h = (Date.now() - p.last) / 3600000;
    if (h > .25) { p.hunger = clamp(p.hunger - h * 2, 0, 100); p.happy = clamp(p.happy - h * 1.5, 0, 100); p.smart = clamp(p.smart - h * .5, 0, 100); p.poop = Math.min(3, p.poop + Math.floor(h / 6)); p.last = Date.now(); Store.save('pet'); }
    return p;
  },
  stage() { const xp = this.data().xp; let s = STAGES[0]; STAGES.forEach(x => { if (xp >= x[0]) s = x; }); return s; },
  form() { return this.stage()[2]; },
  stageName() { return this.stage()[1]; },
  gain(type, amt) {
    const p = this.data(); const before = this.stage();
    const W = { write: .06, review: 1, card: 1.5, note: 1, read: 3, book: 10, game: 1, archive: 2, dictation: 1, tutor: 1, finish: 5, grammar: 1, focus: 4 };
    p.xp += (W[type] || 1) * amt;
    if (['review', 'card', 'dictation', 'grammar'].includes(type)) p.hunger = clamp(p.hunger + 2 * amt, 0, 100);
    if (['write', 'game', 'finish', 'focus'].includes(type)) p.happy = clamp(p.happy + (type === 'write' ? .1 : 3) * amt, 0, 100);
    if (['read', 'note', 'book', 'archive', 'tutor'].includes(type)) p.smart = clamp(p.smart + 2 * amt, 0, 100);
    p.last = Date.now(); Store.save('pet');
    const after = this.stage();
    if (after !== before) { Sfx.jingle([523, 659, 784, 1047, 1319]); modal({ title: '🎉 Tiến hoá!', body: `<div class="evolve">${Art.creature(before[2], { size: 90 })}<span>➜</span>${Art.creature(after[2], { size: 130, mood: 'star' })}<p><b>${esc(p.name)}</b> đã lớn thành <b>${after[1]}</b>!</p></div>` }); }
    this.dock();
  },
  mood() { const p = this.data(); const avg = (p.hunger + p.happy + p.smart) / 3; return p.poop > 1 ? 'sad' : avg > 70 ? 'joy' : avg > 40 ? 'happy' : avg > 20 ? 'calm' : 'sad'; },
  dock() {
    const el = $('#pet'); if (!el) return; const p = this.tick();
    el.innerHTML = `<a href="#/thu-cung" class="pd-cre walk" title="${esc(p.name)} · ${this.stageName()}">${Art.creature(this.form(), { size: 58, mood: this.mood() })}${p.poop ? '<span class="pd-poop">💩</span>' : ''}</a>
      <div class="pd-bars"><i title="No" style="--v:${p.hunger}%;--c:#ff8a3d"></i><i title="Vui" style="--v:${p.happy}%;--c:#ff6fae"></i><i title="Khôn" style="--v:${p.smart}%;--c:#4aa8ff"></i></div>`;
  },
  page(view) {
    const p = this.tick(); const st = this.stage(); const next = STAGES[STAGES.indexOf(st) + 1];
    const meter = (l, v, c, ic) => `<div class="meter"><span>${ic} ${l}</span><div class="m-bar"><i style="width:${v}%;background:${c}"></i></div><b>${Math.round(v)}</b></div>`;
    view.innerHTML = `<div class="page pet-page">
      <div class="pet-room">
        <div class="pr-wall"><span class="pr-win">${Art.deco.sparkle(20)}${Art.deco.star(18)}</span><span class="pr-clock">${Art.pixel('clock', { w: 50 })}</span><span class="pr-plant">${Art.deco.flower(50, '#ff8fc8')}</span></div>
        <div class="pr-floor"></div>
        <div class="pr-pet bob" id="prPet">${Art.creature(st[2], { size: 190, mood: this.mood() })}</div>
        <div class="pr-poops">${'<button class="poop">💩</button>'.repeat(p.poop)}</div>
        <div class="pr-bubble" id="prBub">${this.say()}</div>
      </div>
      <div class="pet-info">
        <h1>${esc(p.name)} <button class="mini-btn" id="petRen">✎</button></h1>
        <p class="kicker">${st[1]} · ${Math.round(p.xp)} XP ${next ? `· còn ${Math.ceil(next[0] - p.xp)} XP để thành <b>${next[1]}</b>` : '· cấp tối đa!'}</p>
        ${meter('No bụng', p.hunger, '#ff8a3d', '🍙')}${meter('Vui vẻ', p.happy, '#ff6fae', '💗')}${meter('Hiểu biết', p.smart, '#4aa8ff', '📚')}
        <div class="pet-acts">
          <a class="btn" href="#/ngoai-ngu">🍙 Cho ăn = ôn thẻ</a><a class="btn" href="#/viet">💗 Làm vui = viết bài</a><a class="btn" href="#/luu-tru">📚 Thông minh = đọc & ghi chú</a>
          <button class="btn" id="petPat">🤲 Xoa đầu</button><button class="btn" id="petDance">💃 Nhảy</button>
        </div>
        <h3>Biểu đồ trưởng thành</h3>
        <div class="growth">${STAGES.map((s, i) => `<div class="gr-st ${p.xp >= s[0] ? 'got' : ''} ${s === st ? 'cur' : ''}"><span>${p.xp >= s[0] ? Art.creature(s[2], { size: 56, mood: 'joy' }) : Art.creature('egg', { size: 46, color: '#ddd' })}</span><b>${p.xp >= s[0] ? s[1] : '???'}</b><small>${s[0]} XP</small></div>${i < STAGES.length - 1 ? '<i class="gr-tube"></i>' : ''}`).join('')}</div>
      </div></div>`;
    $('#petRen').onclick = async () => { const n = await promptBox('Đặt tên cho thú cưng', p.name); if (n) { p.name = n; Store.save('pet'); this.page(view); this.dock(); } };
    $('#petPat').onclick = () => { p.happy = clamp(p.happy + 1, 0, 100); Store.save('pet'); Sfx.jingle([784, 988]); $('#prBub').textContent = ['Hì hì~', 'Thích quá!', '♥ ♥ ♥', 'Nữa đi!'][Math.floor(Math.random() * 4)]; $('#prPet').classList.add('jump'); setTimeout(() => $('#prPet').classList.remove('jump'), 600); this.dock(); };
    $('#petDance').onclick = () => { $('#prPet').classList.toggle('dance'); Music.play(Math.floor(Math.random() * TUNES.length)); };
    $$('.poop').forEach(b => b.onclick = () => { b.remove(); p.poop = Math.max(0, p.poop - 1); Store.save('pet'); Sfx.beep(660); $('#prBub').textContent = 'Sạch sẽ rồi! Cảm ơn ♥'; this.dock(); });
  },
  say() {
    const p = this.data(); const due = Store.list('cards').filter(c => c.seen && c.due <= Date.now()).length;
    if (p.hunger < 30) return due ? `Đói quá… còn ${due} thẻ đến hạn kìa 🍙` : 'Đói bụng… học vài từ mới nhé?';
    if (p.happy < 30) return 'Buồn ghê… viết gì đó đi mà ✎';
    if (p.poop) return 'Ơ… dọn giúp mình với 💩';
    return ['Hôm nay đọc gì hay không?', 'Mình thích nghe bạn kể về cuốn sách mới!', 'Một trang mỗi ngày là đủ ♥', 'Ôn thẻ xong mình sẽ lớn nhanh lắm!'][new Date().getMinutes() % 4];
  }
};

/* ================= SỔ TEM ================= */
const Stamps = {
  list: [
    ['first-post', 'Ngòi bút đầu tiên', 'Viết bài đầu tiên', () => Store.list('posts').length >= 1, '#ff8fc8'],
    ['ten-posts', 'Mười trang nở', 'Viết 10 bài', () => Store.list('posts').length >= 10, '#ff8fc8'],
    ['10k', 'Vạn chữ', 'Tổng 10.000 chữ', () => Store.list('posts').reduce((s, p) => s + (p.words || 0), 0) >= 10000, '#e8475f'],
    ['all-cats', 'Bảy sắc cầu vồng', 'Có bài ở cả 7 chủ đề', () => new Set(Store.list('posts').map(p => p.cat).filter(Boolean)).size >= 7, '#b48cff'],
    ['first-arc', 'Người sưu tầm', 'Cất tài liệu đầu tiên', () => Store.list('archive').length >= 1, '#4aa8ff'],
    ['fifty-arc', 'Thủ thư', 'Cất 50 tài liệu', () => Store.list('archive').length >= 50, '#4aa8ff'],
    ['notes-100', 'Bút dạ quang', '100 đoạn tô màu', () => [...Store.list('posts'), ...Store.list('archive'), ...Store.list('books')].reduce((s, d) => s + (d.notes?.length || 0), 0) >= 100, '#d4a106'],
    ['quote-10', 'Nhặt ngọc', '10 câu trích dẫn', () => Store.list('quotes').length >= 10, '#ff8a3d'],
    ['first-book', 'Mở trang', 'Đọc xong 1 cuốn', () => Store.list('books').some(b => b.status === 'done'), '#3aa35a'],
    ['5-regions', 'Lữ khách', 'Đọc sách từ 5 vùng', () => new Set(Store.list('books').filter(b => b.status === 'done').map(b => b.region).filter(Boolean)).size >= 5, '#19b5b0'],
    ['11-regions', 'Vòng quanh thế giới', 'Đủ 11 vùng đất', () => new Set(Store.list('books').filter(b => b.status === 'done').map(b => b.region).filter(Boolean)).size >= 11, '#19b5b0'],
    ['cards-100', 'Trăm thẻ', '100 thẻ từ vựng', () => Store.list('cards').length >= 100, '#7a4fd6'],
    ['rev-1000', 'Kiên nhẫn', '1.000 lượt ôn', () => Store.list('cards').reduce((s, c) => s + (c.history?.length || 0), 0) >= 1000, '#7a4fd6'],
    ['mature-50', 'Gà con thông thái', '50 thẻ đã thuộc', () => Store.list('cards').filter(c => (c.interval || 0) >= 21).length >= 50, '#7a4fd6'],
    ['streak-7', 'Bảy ngày lửa', 'Chuỗi 7 ngày', () => Activity.streak() >= 7, '#e8475f'],
    ['streak-30', 'Tháng chăm chỉ', 'Chuỗi 30 ngày', () => Activity.streak() >= 30, '#e8475f'],
    ['letter', 'Bưu tá', 'Gửi lá thư đầu tiên', () => Store.list('letters').some(l => l.kind !== 'pet'), '#ff8a3d'],
    ['polyglot', 'Đa ngữ', 'Học 3 ngôn ngữ', () => Store.list('courses').length >= 3, '#3aa35a'],
    ['evolve', 'Trưởng thành', 'Thú cưng thành Mực-tchi', () => Pet.data().xp >= 1500, '#6c5ce7'],
  ],
  earned() { return this.list.filter(s => { try { return s[3](); } catch (_) { return false; } }); },
  page(view) {
    const got = this.earned().map(s => s[0]);
    const log = Store.get('log', {});
    const weeks = 22; const start = new Date(Date.now() - (weeks * 7 - 1) * DAY);
    const cells = [...Array(weeks * 7)].map((_, i) => { const d = new Date(+start + i * DAY).toISOString().slice(0, 10); const v = Object.values(log[d] || {}).reduce((s, x) => s + x, 0); return `<i class="hm l${v ? Math.min(4, Math.ceil(Math.log2(v + 1))) : 0}" title="${d}: ${Math.round(v)}"></i>`; }).join('');
    const tot = k => Object.values(log).reduce((s, d) => s + (d[k] || 0), 0);
    view.innerHTML = `<div class="page stamps-page">
      <header class="page-hero" style="--hc:#ffb3c8"><div class="ph-art scene">${Art.scene('stamps')}</div>
        <div class="ph-txt"><div class="kicker">Tầng hầm · Sổ Tem</div><h1>${got.length}/${this.list.length} con tem</h1><p>Mỗi thói quen tốt được đóng một con dấu. Chuỗi hiện tại: <b>${Activity.streak()} ngày 🔥</b></p></div></header>
      <h2>Bản đồ chăm chỉ (22 tuần)</h2><div class="heatmap">${cells}</div>
      <div class="st-eggs"><div>✎<b>${Math.round(tot('write')).toLocaleString('vi')}</b><small>chữ đã viết</small></div><div>🔁<b>${tot('review')}</b><small>lượt ôn</small></div><div>🖍<b>${tot('note')}</b><small>ghi chú</small></div><div>🎮<b>${tot('game')}</b><small>điểm game</small></div><div>⏱️<b>${tot('focus')}</b><small>phiên ấp trứng</small></div></div>
      <h2>Bộ sưu tập tem</h2>
      <div class="stamp-grid">${this.list.map(s => `<div class="stamp-it ${got.includes(s[0]) ? 'got' : ''}">${Art.deco.stamp(got.includes(s[0]) ? '★' : '?', got.includes(s[0]) ? s[4] : '#bbb', 86)}<b>${s[1]}</b><small>${s[2]}</small></div>`).join('')}</div></div>`;
  }
};

/* ================= THÙNG THƯ ================= */
const LETTER_KINDS = [['gop-y', '💌 Góp ý / mong muốn', '#ffc0b0'], ['tuong-lai', '⏳ Thư gửi tương lai', '#c4ecff'], ['nhat-ky', '📔 Nhật ký', '#fff6d8'], ['gui-ai', '✉️ Thư gửi ai đó (nháp)', '#e3d4ff'], ['pet', '🐣 Thư từ Chữ-tchi', '#d8f5c8']];
const Mail = {
  checkDaily() {
    const ls = Store.list('letters'); const d = today();
    if (!ls.some(l => l.kind === 'pet' && l.day === d) && (Store.list('posts').length || Store.list('cards').length)) {
      const log = Store.get('log', {}); let w = 0, r = 0; for (let i = 0; i < 7; i++) { const k = new Date(Date.now() - i * DAY).toISOString().slice(0, 10); w += log[k]?.write || 0; r += log[k]?.review || 0; }
      const due = Store.list('cards').filter(c => c.seen && c.due <= Date.now()).length;
      Store.upsert('letters', { id: uid(), kind: 'pet', day: d, title: 'Thư buổi sáng từ ' + Pet.data().name, body: `Chào bạn ♥\n\nTuần này bạn đã viết ${Math.round(w)} chữ và ôn ${r} lượt thẻ. ${due ? `Hôm nay có ${due} thẻ đang chờ bạn.` : 'Không có thẻ nào đến hạn, thảnh thơi nhé!'}\n\n${Pet.say()}\n\nThương,\n${Pet.data().name}`, read: false });
    }
    this.dot();
  },
  dot() {
    const n = Store.list('letters').filter(l => !l.read && (!l.openAt || l.openAt <= Date.now())).length;
    $('#mailDot').hidden = !n;
  },
  page(view) {
    let filter = '';
    view.innerHTML = `<div class="page mail-page">
      <header class="page-hero" style="--hc:#ffc0b0"><div class="ph-art scene">${Art.scene('mail')}</div>
        <div class="ph-txt"><div class="kicker">Tầng 3 · Thùng Thư</div><h1>Thùng thư nhỏ</h1><p>Góp ý cho hành tinh, viết nhật ký, gửi thư cho chính mình ở tương lai (khoá cho tới ngày mở), hay nháp một lá thư cho ai đó.</p>
        <button class="btn pri big" id="mNew">✎ Viết thư</button></div></header>
      <div class="cat-row">${[['', '✦ Tất cả'], ...LETTER_KINDS.map(k => [k[0], k[1]])].map(k => `<button class="cat ${filter === k[0] ? 'on' : ''}" data-k="${k[0]}">${k[1]}</button>`).join('')}</div>
      <div class="env-grid" id="envs"></div></div>`;
    const draw = () => {
      const ls = Store.list('letters').filter(l => !filter || l.kind === filter);
      $('#envs').innerHTML = ls.length ? ls.map(l => {
        const k = LETTER_KINDS.find(x => x[0] === l.kind) || LETTER_KINDS[0]; const locked = l.openAt && l.openAt > Date.now();
        return `<button class="env ${l.read ? 'read' : ''} ${locked ? 'locked' : ''}" data-id="${l.id}" style="--ec:${k[2]};--rot:${(hashStr(l.id) % 7) - 3}deg">
          <span class="env-flap"></span><span class="env-seal">${locked ? '🔒' : (l.read ? '✉️' : '💌')}</span>
          <b>${esc(l.title || 'Không tiêu đề')}</b><small>${k[1]} · ${fmtDate(l.created)}</small>
          ${locked ? `<small class="lock">mở vào ${fmtDate(l.openAt)} (còn ${Math.ceil((l.openAt - Date.now()) / DAY)} ngày)</small>` : ''}</button>`;
      }).join('') : `<div class="empty big">${Art.deco.mailbox(110)}<p>Thùng thư trống. Viết lá đầu tiên nhé!</p></div>`;
    };
    draw();
    $$('.cat').forEach(b => b.onclick = () => { filter = b.dataset.k; $$('.cat').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    $('#mNew').onclick = () => this.compose(draw);
    $('#envs').onclick = e => {
      const id = e.target.closest('.env')?.dataset.id; if (!id) return; const l = Store.find('letters', id);
      if (l.openAt && l.openAt > Date.now()) return toast(`Lá thư này được niêm phong tới ${fmtDate(l.openAt)} 🔒`);
      l.read = true; Store.upsert('letters', l); this.dot();
      modal({ title: '', wide: true, cls: 'letter-modal', body: `<div class="letter-paper st-${l.paper || 'rose'}"><div class="lp-stamp">${Art.deco.stamp(l.kind === 'pet' ? '♥' : '✉', '#e8475f', 70)}</div><h2>${esc(l.title || '')}</h2>${l.to ? `<p class="muted">Gửi: ${esc(l.to)}</p>` : ''}<div class="lp-body">${esc(l.body).replace(/\n/g, '<br>')}</div><p class="lp-date">${fmtDate(l.created)}${l.openAt ? ' · mở ' + fmtDate(l.openAt) : ''}</p></div>`,
        actions: [{ label: '🗑 Xoá', cls: 'danger', onClick: async () => { if (await confirmBox('Xoá lá thư?')) { Store.remove('letters', l.id); draw(); } } }, ...(l.kind === 'gop-y' ? [{ label: '✦ AI biến góp ý thành kế hoạch', onClick: async () => { const o = await AI.withSpinner(null, () => AI.ask({ prompt: `Đây là góp ý/mong muốn tôi tự viết cho góc học tập cá nhân: "${l.body}". Biến nó thành 3-5 việc cụ thể nhỏ tôi có thể làm tuần này.` })); if (o) modal({ title: '✦ Kế hoạch nhỏ', body: `<div class="ai-out">${esc(o).replace(/\n/g, '<br>')}</div>` }); } }] : []), { label: 'Đóng', cls: 'pri' }]
      });
      draw();
    };
  },
  compose(after) {
    modal({
      title: '✎ Viết thư', wide: true, body: `
        <div class="seg wrap" id="lk">${LETTER_KINDS.filter(k => k[0] !== 'pet').map((k, i) => `<button data-k="${k[0]}" class="${i ? '' : 'on'}">${k[1]}</button>`).join('')}</div>
        <div class="row2"><input class="inp" id="lt" placeholder="Tiêu đề"><input class="inp" id="lto" placeholder="Gửi ai? (không bắt buộc)"></div>
        <div id="lDate" hidden><label class="lbl">Mở thư vào ngày</label><input type="date" class="inp" id="lo" min="${today()}"></div>
        <label class="lbl">Giấy viết</label><div class="seg" id="lp">${[['rose', '🌸 Hồng'], ['sky', '☁️ Trời'], ['mint', '🌿 Bạc hà'], ['kraft', '📦 Giấy kraft'], ['lined', '📒 Kẻ dòng']].map((p, i) => `<button data-p="${p[0]}" class="${i ? '' : 'on'}">${p[1]}</button>`).join('')}</div>
        <textarea class="inp letter-ta" id="lb" rows="12" placeholder="Thân gửi…"></textarea>`,
      onOpen: w => {
        let kind = 'gop-y', paper = 'rose';
        $$('#lk button', w).forEach(b => b.onclick = () => { kind = b.dataset.k; $$('#lk button', w).forEach(x => x.classList.toggle('on', x === b)); $('#lDate', w).hidden = kind !== 'tuong-lai'; });
        $$('#lp button', w).forEach(b => b.onclick = () => { paper = b.dataset.p; $$('#lp button', w).forEach(x => x.classList.toggle('on', x === b)); $('#lb', w).className = 'inp letter-ta st-' + paper; });
        w._get = () => ({ kind, paper });
      },
      actions: [{ label: '📮 Bỏ vào thùng', cls: 'pri', onClick: w => {
        const { kind, paper } = w._get(); const body = $('#lb', w).value.trim(); if (!body) { toast('Thư trống trơn kìa', 'err'); return false; }
        const od = $('#lo', w).value;
        if (kind === 'tuong-lai' && !od) { toast('Chọn ngày mở thư', 'err'); return false; }
        Store.upsert('letters', { id: uid(), kind, paper, title: $('#lt', w).value.trim(), to: $('#lto', w).value.trim(), body, openAt: kind === 'tuong-lai' ? new Date(od).getTime() : null, read: kind !== 'tuong-lai' });
        Sfx.jingle([659, 523]); toast(kind === 'tuong-lai' ? `Đã niêm phong tới ${fmtDate(new Date(od))} 🔒` : 'Đã gửi 📮'); after && after();
      } }]
    });
  }
};

/* ================= ẤP TRỨNG (POMODORO) ================= */
const Timer = {
  t: null, end: 0, total: 0, label: '',
  open() {
    if (this.t) return this.widget();
    modal({
      title: '⏱️ Ấp trứng — phiên tập trung', body: `<div class="timer-pick">${Art.creature('egg', { size: 90 })}<p>Chọn thời gian ấp. Trứng sẽ nứt dần, và nở khi bạn hoàn thành!</p>
        <div class="seg">${[[15, '15′'], [25, '25′ Pomodoro'], [45, '45′'], [60, '60′']].map(m => `<button data-m="${m[0]}">${m[1]}</button>`).join('')}</div>
        <input class="inp" id="tLabel" placeholder="Đang làm gì? (vd: đọc chương 3)"></div>`,
      onOpen: (w, close) => $$('[data-m]', w).forEach(b => b.onclick = () => { this.start(+b.dataset.m, $('#tLabel', w).value); close(); })
    });
  },
  start(min, label) { this.total = min * 60000; this.end = Date.now() + this.total; this.label = label; this.t = setInterval(() => this.tickW(), 1000); this.widget(); Sfx.click(); },
  widget() {
    let w = $('#timerW'); if (!w) { w = document.createElement('div'); w.id = 'timerW'; w.className = 'timer-w'; document.body.appendChild(w); }
    this.tickW();
  },
  tickW() {
    const w = $('#timerW'); if (!w) return;
    const left = Math.max(0, this.end - Date.now()); const p = 1 - left / this.total;
    const mm = String(Math.floor(left / 60000)).padStart(2, '0'), ss = String(Math.floor(left / 1000) % 60).padStart(2, '0');
    w.innerHTML = `<span class="tw-egg ${p > .5 ? 'shake' : ''}">${Art.creature('egg', { size: 46, crack: p > .66 })}</span><div><b>${mm}:${ss}</b><small>${esc(this.label || 'đang ấp…')}</small><div class="m-bar"><i style="width:${p * 100}%;background:#ffd23f"></i></div></div><button class="x" id="tStop">✕</button>`;
    $('#tStop').onclick = () => { clearInterval(this.t); this.t = null; w.remove(); };
    if (left <= 0) {
      clearInterval(this.t); this.t = null; w.remove(); Activity.add('focus'); Sfx.jingle([523, 659, 784, 1047, 784, 1047]);
      modal({ title: '🐣 Trứng đã nở!', body: `<div class="evolve">${Art.creature(['tomato', 'note', 'fish', 'star', 'cloud'][Math.floor(Math.random() * 5)], { size: 130, mood: 'star' })}<p>Hoàn thành phiên ${Math.round(this.total / 60000)} phút${this.label ? ': ' + esc(this.label) : ''}. Nghỉ 5 phút nhé!</p></div>` });
    }
  }
};

/* ================= TÌM KIẾM ================= */
const Search = {
  open() {
    modal({
      title: '🔍 Tìm khắp hành tinh', wide: true, cls: 'search-modal',
      body: `<input class="inp big" id="sq" placeholder="Gõ để tìm bài viết, tài liệu, sách, từ vựng, ngữ pháp, trích dẫn, thư…"><div id="sr" class="sr"></div>`,
      onOpen: (w, close) => {
        const inp = $('#sq', w); inp.focus();
        const run = () => {
          const q = inp.value.trim().toLowerCase(); if (q.length < 1) { $('#sr', w).innerHTML = '<p class="muted">Mẹo: Ctrl+K mở tìm kiếm ở bất kỳ đâu.</p>'; return; }
          const hit = (s) => (s || '').toLowerCase().includes(q);
          const R = [
            ...Store.list('posts').filter(p => hit(p.title) || hit(stripHtml(p.content))).map(p => ['✎ Bài viết', p.title || 'Không tiêu đề', '#/doc/bai/' + p.id]),
            ...Store.list('archive').filter(a => hit(a.title) || hit(a.author) || hit(stripHtml(a.content))).map(a => ['🗄️ Lưu trữ', a.title, '#/doc/luu/' + a.id]),
            ...Store.list('books').filter(b => hit(b.title) || hit(b.author)).map(b => ['📚 Sách', `${b.title} — ${b.author || ''}`, '#/sach/' + b.id]),
            ...Store.list('cards').filter(c => hit(c.word) || hit(c.meaning)).map(c => ['🃏 Từ vựng', `${c.word} · ${c.meaning || ''}`, '#/ngoai-ngu/' + c.courseId]),
            ...Store.list('grammar').filter(g => hit(g.title)).map(g => ['📐 Ngữ pháp', g.title, '#/ngoai-ngu/' + g.courseId + '/ngu-phap']),
            ...Store.list('quotes').filter(x => hit(x.text)).map(x => ['❝ Trích dẫn', x.text.slice(0, 90), '#/luu-tru/trich-dan']),
            ...Store.list('letters').filter(l => hit(l.title) || (hit(l.body) && !(l.openAt > Date.now()))).map(l => ['✉️ Thư', l.title || 'Thư', '#/thu']),
          ].slice(0, 60);
          $('#sr', w).innerHTML = R.length ? R.map(r => `<a href="${r[2]}" class="sr-it"><span class="tag">${r[0]}</span>${esc(r[1])}</a>`).join('') : `<div class="empty sm">${Art.creature('ghost', { size: 60 })}<p>Không thấy gì cả…</p></div>`;
          $$('.sr-it', w).forEach(a => a.onclick = close);
        };
        inp.oninput = debounce(run, 120); run();
      }
    });
  }
};

/* ================= CÀI ĐẶT ================= */
const Settings = {
  page(view) {
    const S = Store.settings();
    view.innerHTML = `<div class="page settings-page">
      <header class="page-hero" style="--hc:#e3d4ff"><div class="ph-art scene">${Art.scene('settings')}</div>
        <div class="ph-txt"><div class="kicker">Phòng máy</div><h1>Cài đặt</h1><p>Dữ liệu được lưu ngay trong trình duyệt của bạn. Bật ☁️ Đồng bộ để dùng chung giữa máy tính và điện thoại, hoặc xuất bản sao lưu thường xuyên.</p></div></header>
      <section class="set-sec"><h2>👤 Bạn</h2><label class="lbl">Tên gọi</label><input class="inp" id="sName" value="${esc(S.name)}">
        <label class="row"><input type="checkbox" id="sGate" ${S.showGate ? 'checked' : ''}> Hiện cảnh “máy trứng” mỗi lần mở trang</label></section>
      <section class="set-sec"><h2>✦ Trợ lý AI</h2>
        <p class="muted">Thêm key của một hoặc nhiều nơi. Khi một nơi lỗi, hết hạn mức hay quá tải, app <b>tự chuyển sang nơi tiếp theo</b> trong danh sách. Key chỉ lưu trên máy này.</p>
        <div class="ai-tip">${Art.creature('prof', { size: 54 })}<div><b>Gợi ý miễn phí:</b> tạo key <b>Gemini</b> và <b>Groq</b> (đều không cần thẻ), thêm <b>OpenRouter</b> làm dự phòng. Gói ChatGPT Plus <b>không</b> kèm tiền dùng API nên không dùng được ở đây.</div></div>
        <div id="aiList" class="ai-list"></div>
        <div class="row"><button class="btn pri" id="sTest">✦ Thử cả chuỗi</button><span class="muted sm" id="sTestOut"></span></div>
        <details class="ai-adv"><summary>Nâng cao: Claude Base URL, máy chủ tương thích OpenAI</summary>
          <label class="lbl" for="sBase">Claude Base URL</label><input class="inp" id="sBase" value="${esc(S.baseUrl)}">
          <label class="lbl" for="sOaiBase">Địa chỉ máy chủ “OpenAI / tương thích” (DeepSeek, Mistral, LM Studio…)</label><input class="inp" id="sOaiBase" value="${esc(S.oaiBase || 'https://api.openai.com/v1')}">
        </details></section>
      <section class="set-sec"><h2>💾 Dữ liệu</h2>
        <div class="row"><button class="btn" id="sExp">⇩ Xuất bản sao lưu (.json)</button><button class="btn" id="sImp">⇧ Nhập bản sao lưu</button><button class="btn" id="sSeed">🌱 Nạp dữ liệu mẫu</button><button class="btn danger" id="sWipe">🗑 Xoá sạch</button></div>
        <p class="muted" id="sUsage"></p></section>
      ${Sync.section()}
      <section class="set-sec"><h2>⌨️ Phím tắt</h2><ul class="tips"><li><kbd>Ctrl</kbd>+<kbd>K</kbd> tìm kiếm</li><li><kbd>Ctrl</kbd>+<kbd>S</kbd> lưu khi viết · <kbd>Ctrl</kbd>+<kbd>H</kbd> tìm & thay</li><li>Chế độ đọc: <kbd>N</kbd> ghi chú · <kbd>F</kbd> tập trung · <kbd>+</kbd>/<kbd>-</kbd> cỡ chữ</li><li>Ôn thẻ: <kbd>Space</kbd> lật · <kbd>1</kbd>–<kbd>4</kbd> chấm điểm</li><li>Lật thẻ: <kbd>←</kbd> <kbd>→</kbd> · <kbd>S</kbd> đọc to</li></ul></section>
    </div>`;
    AI.cfg();
    const KEYLINK = { gemini: 'https://aistudio.google.com/apikey', openrouter: 'https://openrouter.ai/keys', groq: 'https://console.groq.com/keys', claude: 'https://console.anthropic.com/settings/keys', openai: 'https://platform.openai.com/api-keys' };
    const NOTE = { gemini: 'Miễn phí có hạn mức theo ngày. Ưu tiên model Flash.', openrouter: 'Chỉ dùng các model đuôi :free. Hạn mức theo ngày, đôi khi chậm.', groq: 'Miễn phí, rất nhanh, giới hạn theo phút. Model Llama/Qwen/GPT-OSS.', claude: 'Trả phí theo token. Haiku rất rẻ.', openai: 'Trả phí theo token (không dùng gói ChatGPT Plus được).' };
    const save = () => {
      S.name = $('#sName').value; S.showGate = $('#sGate').checked;
      S.baseUrl = $('#sBase').value.trim() || 'https://api.anthropic.com'; S.oaiBase = $('#sOaiBase').value.trim();
      Store.save('settings');
    };
    const drawAI = () => {
      const chain = AI.chain();
      $('#aiList').innerHTML = S.aiOrder.map((k, i) => {
        const P = AI_PROVIDERS[k], key = S[P.keyField] || '', on = !(S.aiOff || []).includes(k);
        const models = k === 'gemini' ? (S.geminiList || []) : k === 'claude' ? ['claude-haiku-5-5', 'claude-sonnet-5-5', 'claude-opus-5-5'] : (S[k + 'List'] || []);
        const cur = k === 'gemini' ? S.geminiModel : k === 'claude' ? S.model : (S[k + 'Model'] || 'auto');
        const pos = chain.indexOf(k);
        return `<div class="ai-card ${key ? 'has' : ''} ${on ? '' : 'off'}" data-k="${k}">
          <div class="ai-top"><span class="ai-no">${pos >= 0 ? pos + 1 : '–'}</span><b>${P.name}</b>${P.free ? '<span class="tag free">có gói miễn phí</span>' : '<span class="tag">trả phí</span>'}
            <span class="grow"></span><button class="mini-btn" data-mv="-1" ${i ? '' : 'disabled'} title="Ưu tiên hơn">↑</button><button class="mini-btn" data-mv="1" ${i < S.aiOrder.length - 1 ? '' : 'disabled'} title="Ưu tiên kém hơn">↓</button>
            <label class="sw-tg"><input type="checkbox" data-on ${on ? 'checked' : ''}> bật</label></div>
          <p class="muted sm">${NOTE[k]} <a href="${KEYLINK[k]}" target="_blank" rel="noopener">Lấy key ↗</a></p>
          <div class="row"><input class="inp grow" type="password" data-key value="${esc(key)}" placeholder="Dán API key…" autocomplete="off"><button class="btn sm" data-show>👁</button></div>
          <div class="row"><select class="inp grow sm" data-model>${k === 'claude' ? '' : '<option value="auto">Tự động chọn model (khuyên dùng)</option>'}${models.map(m => `<option value="${esc(m)}" ${cur === m ? 'selected' : ''}>${esc(m)}</option>`).join('')}</select>
            ${k === 'claude' ? '' : '<button class="btn sm" data-list>↻ Danh sách model</button>'}<button class="btn sm" data-test>✦ Thử</button></div>
          <div class="muted sm" data-out>${(k === 'gemini' ? S.geminiWorking : S[k + 'Working']) ? 'Model chạy được gần nhất: <b>' + esc(k === 'gemini' ? S.geminiWorking : S[k + 'Working']) + '</b>' : ''}</div>
        </div>`;
      }).join('');
    };
    drawAI();
    $('#aiList').addEventListener('change', e => {
      const card = e.target.closest('.ai-card'); if (!card) return; const k = card.dataset.k, P = AI_PROVIDERS[k];
      if (e.target.matches('[data-key]')) { S[P.keyField] = e.target.value.trim(); if (k === 'gemini') S.geminiList = []; else S[k + 'List'] = []; AI._bad.clear(); delete AI._cool[k]; }
      if (e.target.matches('[data-model]')) { if (k === 'gemini') S.geminiModel = e.target.value; else if (k === 'claude') S.model = e.target.value; else S[k + 'Model'] = e.target.value; }
      if (e.target.matches('[data-on]')) { S.aiOff = (S.aiOff || []).filter(x => x !== k); if (!e.target.checked) S.aiOff.push(k); }
      Store.save('settings'); drawAI(); toast('Đã lưu');
    });
    $('#aiList').addEventListener('click', async e => {
      const card = e.target.closest('.ai-card'); if (!card) return; const k = card.dataset.k;
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.mv) { const i = S.aiOrder.indexOf(k), j = i + +b.dataset.mv; [S.aiOrder[i], S.aiOrder[j]] = [S.aiOrder[j], S.aiOrder[i]]; Store.save('settings'); drawAI(); }
      if (b.hasAttribute('data-show')) { const i = $('[data-key]', card); i.type = i.type === 'password' ? 'text' : 'password'; }
      if (b.hasAttribute('data-list')) {
        if (!(S[AI_PROVIDERS[k].keyField] || '').trim()) return toast('Dán key trước đã', 'err');
        b.disabled = true;
        try { const l = k === 'gemini' ? await AI.listGemini(true) : await AI.listCompat(k, true); AI._bad.clear(); drawAI(); toast(`Tìm thấy ${l.length} model dùng được`); }
        catch (err) { toast(err.message, 'err', 6000); b.disabled = false; }
      }
      if (b.hasAttribute('data-test')) {
        if (!(S[AI_PROVIDERS[k].keyField] || '').trim()) return toast('Dán key trước đã', 'err');
        const out = $('[data-out]', card); out.textContent = 'Đang thử…'; b.disabled = true;
        try { const o = await AI.ask({ prompt: 'Chào một câu thật dễ thương, xưng là Chữ-tchi, dưới 20 chữ.', maxTokens: 200 }, k); out.innerHTML = `✅ Chạy được qua <b>${esc(AI.lastModel)}</b>: “${esc(o)}”`; }
        catch (err) { out.innerHTML = '❌ ' + err.message; }
        b.disabled = false;
      }
    });
    $$('#sName,#sGate,#sBase,#sOaiBase', view).forEach(i => i.addEventListener('change', () => { save(); toast('Đã lưu cài đặt'); }));
    $('#sTest').onclick = async e => {
      save(); $('#sTestOut').textContent = '';
      const o = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: 'Chào một câu thật dễ thương, xưng là Chữ-tchi, dưới 20 chữ.', maxTokens: 200 }));
      if (o) { toast('✦ ' + o, 'ok', 5000); $('#sTestOut').innerHTML = `Chạy được qua <b>${esc(AI_PROVIDERS[AI.lastProvider].name)}</b> · ${esc(AI.lastModel)}`; drawAI(); }
    };
    $('#sExp').onclick = () => download(`chutchi-backup-${today()}.json`, JSON.stringify(Store.exportAll()), 'application/json');
    $('#sImp').onclick = async () => { const f = await pickFile('.json,application/json'); if (!f) return; try { const o = JSON.parse(await f.text()); if (await confirmBox('Nhập sẽ GHI ĐÈ dữ liệu hiện tại. Tiếp tục?')) { Store.importAll(o); toast('Đã nhập xong'); setTimeout(() => location.reload(), 400); } } catch (e) { toast('File không hợp lệ', 'err'); } };
    Sync.bind(view);
    $('#sSeed').onclick = () => { Seed.run(true); toast('Đã nạp dữ liệu mẫu 🌱'); };
    $('#sWipe').onclick = async () => { if (await confirmBox('XOÁ SẠCH mọi dữ liệu? Không thể hoàn tác!') && await confirmBox('Thật sự chắc chứ? Hãy xuất sao lưu trước!')) { Store.keys.forEach(k => { if (k !== 'settings') { delete Store.data[k]; Store.saveNow(k); } }); setTimeout(() => location.reload(), 300); } };
    navigator.storage?.estimate?.().then(e => { $('#sUsage').textContent = `Đang dùng ~${(e.usage / 1048576).toFixed(1)} MB / ${(e.quota / 1048576).toFixed(0)} MB cho phép.`; });
  }
};
