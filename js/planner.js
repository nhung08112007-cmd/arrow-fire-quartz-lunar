/* =========================================================
   LỊCH HỌC · Study planner
   - Việc cần làm có ngày, giờ, thời lượng, nhóm, độ ưu tiên, lặp lại, checklist
   - Xem theo Hôm nay / Tuần / Tháng, kéo thả việc giữa các ngày
   - Hộp "chưa xếp lịch", gợi ý tự động (thẻ đến hạn, sách đang đọc)
   - Lập kế hoạch học theo giáo trình (vd Minna: mỗi buổi một bài)
   - Bấm ▶ để ấp trứng tập trung đúng thời lượng việc đó; xuất .ics
   ========================================================= */
const Planner = {
  CATS: {
    study: { n: 'Học bài', c: '#b8f0a0', i: '📚' },
    lang: { n: 'Ngoại ngữ', c: '#9fdcff', i: '🈳' },
    read: { n: 'Đọc sách', c: '#ffe680', i: '📖' },
    write: { n: 'Viết', c: '#ffb3dd', i: '✎' },
    work: { n: 'Làm việc', c: '#c9b6ff', i: '💼' },
    life: { n: 'Cá nhân', c: '#ffc0b0', i: '🌱' },
  },
  REPEAT: { '': 'Không lặp', daily: 'Mỗi ngày', weekdays: 'Thứ 2 – Thứ 6', weekly: 'Mỗi tuần (cùng thứ)', monthly: 'Mỗi tháng (cùng ngày)' },
  WD: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  view: 'week', anchor: null,

  /* ---------- ngày giờ (theo giờ máy, không lệch múi) ---------- */
  key(d) { d = new Date(d); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; },
  parse(k) { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); },
  add(k, n) { const d = this.parse(k); d.setDate(d.getDate() + n); return this.key(d); },
  todayK() { return this.key(new Date()); },
  monday(k) { const d = this.parse(k); const w = (d.getDay() + 6) % 7; d.setDate(d.getDate() - w); return this.key(d); },
  label(k, long) { const d = this.parse(k); return long ? d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }) : `${d.getDate()}/${d.getMonth() + 1}`; },
  hm(min) { return min >= 60 ? `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, '0') : ''}` : `${min}′`; },

  /* ---------- dữ liệu ---------- */
  tasks() { return Store.list('tasks'); },
  occurs(t, k) {
    if (!t.date) return false;
    if (!t.repeat) return t.date === k;
    if (k < t.date || (t.until && k > t.until) || (t.skip || []).includes(k)) return false;
    const a = this.parse(t.date), b = this.parse(k);
    if (t.repeat === 'daily') return true;
    if (t.repeat === 'weekdays') return b.getDay() >= 1 && b.getDay() <= 5;
    if (t.repeat === 'weekly') return a.getDay() === b.getDay();
    if (t.repeat === 'monthly') return a.getDate() === b.getDate();
    return false;
  },
  isDone(t, k) { return t.repeat ? (t.doneOn || []).includes(k) : !!t.done; },
  setDone(t, k, v) {
    if (t.repeat) { const s = new Set(t.doneOn || []); v ? s.add(k) : s.delete(k); t.doneOn = [...s]; }
    else { t.done = v; t.doneAt = v ? Date.now() : null; }
    if (v) { Activity.add('finish'); Sfx.beep(880, .08); }
    Store.save('tasks');
  },
  on(k) {
    return this.tasks().filter(t => this.occurs(t, k)).sort((a, b) => (a.start || '99') < (b.start || '99') ? -1 : (a.start || '99') > (b.start || '99') ? 1 : (b.prio || 0) - (a.prio || 0));
  },
  inbox() { return this.tasks().filter(t => !t.date && !t.done); },
  overdue() { const tk = this.todayK(); return this.tasks().filter(t => !t.repeat && t.date && t.date < tk && !t.done); },
  todayCount() { const k = this.todayK(); const l = this.on(k); return { all: l.length, left: l.filter(t => !this.isDone(t, k)).length }; },

  /* gợi ý tự động: thẻ đến hạn mỗi lớp, sách đang đọc */
  suggestions() {
    const out = [];
    Store.list('courses').forEach(c => {
      const cs = Store.list('cards').filter(x => x.courseId === c.id);
      const due = cs.filter(x => x.seen && (x.due || 0) <= Date.now()).length, fresh = cs.filter(x => !x.seen).length;
      if (due || fresh) out.push({ title: `Ôn ${c.name}: ${due} thẻ đến hạn${fresh ? ' + từ mới' : ''}`, cat: 'lang', dur: Math.max(10, Math.min(45, Math.round(due * 8 / 60) + 10)), link: `#/ngoai-ngu/${c.id}/hoc` });
    });
    Store.list('books').filter(b => b.status === 'reading').slice(0, 2).forEach(b => out.push({ title: `Đọc tiếp “${b.title}”`, cat: 'read', dur: 30, link: `#/sach/${b.id}` }));
    const k = this.todayK(), have = this.on(k).map(t => t.title);
    return out.filter(s => !have.includes(s.title));
  },

  /* ---------- trang ---------- */
  page(view) {
    this.anchor = this.anchor || this.todayK();
    const tk = this.todayK(), tc = this.todayCount();
    const wk = this.monday(tk); let wAll = 0, wDone = 0, wMin = 0;
    for (let i = 0; i < 7; i++) { const k = this.add(wk, i); this.on(k).forEach(t => { wAll++; if (this.isDone(t, k)) { wDone++; wMin += +t.dur || 0; } }); }
    view.innerHTML = `
    <div class="page planner">
      <header class="pl-head">
        <div class="pl-title">${Art.creature('star', { size: 64, mood: 'joy' })}<div><div class="kicker">Lịch học & việc cần làm</div><h1>${esc(this.label(tk, true))}</h1>
          <div class="muted">${tc.all ? `Hôm nay còn <b>${tc.left}</b>/${tc.all} việc` : 'Hôm nay chưa có việc nào'} · tuần này xong ${wDone}/${wAll} việc · ${this.hm(wMin)} tập trung</div></div></div>
        <div class="pl-acts">
          <button class="btn pri" id="plAdd">＋ Việc mới</button>
          <button class="btn" id="plPlan">📅 Lập kế hoạch học</button>
          <button class="btn" id="plIcs" title="Tải tệp .ics để nhập vào Google Calendar / Lịch điện thoại">⤓ Xuất lịch</button>
        </div>
      </header>
      <div class="pl-quick"><input class="inp" id="plQuick" placeholder="Thêm nhanh: “Ôn Minna bài 5 mai 20:00 30p”, “Viết bài thứ 7”, “Nộp báo cáo 25/11 !” … rồi Enter"><span class="muted sm">hiểu: hôm nay / mai / mốt / thứ 2…CN / dd/mm · giờ hh:mm hoặc 8h · 30p/1h · ! = quan trọng</span></div>
      <div class="pl-bar">
        <div class="seg" id="plView">${[['day', 'Hôm nay'], ['week', 'Tuần'], ['month', 'Tháng']].map(v => `<button data-v="${v[0]}" class="${this.view === v[0] ? 'on' : ''}">${v[1]}</button>`).join('')}</div>
        <div class="pl-nav"><button class="btn sm" id="plPrev">‹</button><button class="btn sm" id="plToday">Hôm nay</button><button class="btn sm" id="plNext">›</button><b id="plRange"></b></div>
      </div>
      <div class="pl-wrap"><div class="pl-main" id="plMain"></div>
        <aside class="pl-side">
          <section class="pl-box"><h3>📥 Chưa xếp lịch</h3><p class="muted sm">Kéo việc vào một ngày để xếp lịch.</p><div class="pl-list" id="plInbox" data-k=""></div></section>
          <section class="pl-box" id="plSugBox"><h3>💡 Gợi ý hôm nay</h3><div id="plSug"></div></section>
          <section class="pl-box"><h3>🎨 Nhóm việc</h3><div class="pl-legend">${Object.entries(this.CATS).map(([k, c]) => `<span><i style="background:${c.c}"></i>${c.i} ${c.n}</span>`).join('')}</div></section>
        </aside></div>
    </div>`;
    $$('#plView button').forEach(b => b.onclick = () => { this.view = b.dataset.v; if (this.view === 'day') this.anchor = tk; this.page(view); });
    const step = { day: 1, week: 7, month: 0 }[this.view];
    const move = dir => { if (this.view === 'month') { const d = this.parse(this.anchor); d.setDate(1); d.setMonth(d.getMonth() + dir); this.anchor = this.key(d); } else this.anchor = this.add(this.anchor, dir * step); this.draw(); };
    $('#plPrev').onclick = () => move(-1); $('#plNext').onclick = () => move(1);
    $('#plToday').onclick = () => { this.anchor = tk; this.draw(); };
    $('#plAdd').onclick = () => this.form(null, this.view === 'day' ? this.anchor : tk);
    $('#plPlan').onclick = () => this.planForm();
    $('#plIcs').onclick = () => this.ics();
    $('#plQuick').onkeydown = e => { if (e.key === 'Enter' && e.target.value.trim()) { const t = this.quick(e.target.value.trim()); Store.list('tasks').unshift(t); Store.save('tasks'); toast(`Đã thêm: ${t.title}${t.date ? ' · ' + this.label(t.date) : ' · vào hộp chưa xếp lịch'}${t.start ? ' ' + t.start : ''}`, 'ok'); e.target.value = ''; this.draw(); } };
    this.draw();
  },

  draw() {
    const main = $('#plMain'); if (!main) return;
    const tk = this.todayK();
    if (this.view === 'day') main.innerHTML = this.dayView(this.anchor);
    if (this.view === 'week') main.innerHTML = this.weekView(this.monday(this.anchor));
    if (this.view === 'month') main.innerHTML = this.monthView(this.anchor);
    $('#plRange').textContent = this.view === 'day' ? this.label(this.anchor, true) : this.view === 'week' ? `${this.label(this.monday(this.anchor))} – ${this.label(this.add(this.monday(this.anchor), 6))}` : this.parse(this.anchor).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
    $('#plInbox').innerHTML = this.inbox().map(t => this.chip(t, '')).join('') || '<p class="muted sm">Trống.</p>';
    const sug = this.suggestions();
    $('#plSug').innerHTML = sug.length ? sug.map((s, i) => `<div class="pl-sug"><span>${this.CATS[s.cat].i} ${esc(s.title)} <small>${this.hm(s.dur)}</small></span><button class="btn sm" data-sug="${i}">＋ Hôm nay</button></div>`).join('') : '<p class="muted sm">Không có gợi ý — mọi thứ đã trong lịch 👍</p>';
    $$('[data-sug]').forEach(b => b.onclick = () => { const s = sug[+b.dataset.sug]; Store.list('tasks').unshift({ id: uid(), ...s, date: tk, start: '', prio: 1, created: Date.now() }); Store.save('tasks'); this.draw(); });
    this.bind(main.closest('.planner'));
  },

  chip(t, k, opt = {}) {
    const c = this.CATS[t.cat] || this.CATS.study, done = this.isDone(t, k);
    const cl = t.checklist || [], clDone = cl.filter(x => x.done).length;
    const late = !t.repeat && t.date && t.date < this.todayK() && !t.done;
    return `<div class="pl-t ${done ? 'done' : ''} ${late ? 'late' : ''} p${t.prio || 0}" style="--tc:${c.c}" data-id="${t.id}" data-k="${k}" draggable="${t.repeat ? 'false' : 'true'}">
      <input type="checkbox" class="pl-ck" ${done ? 'checked' : ''} title="Xong">
      <div class="pl-tb"><div class="pl-tt">${t.prio === 2 ? '<b class="pl-imp">!</b> ' : ''}${esc(t.title)}</div>
        <div class="pl-tm">${t.start ? `<b>${t.start}</b>` : ''}${t.dur ? ` · ${this.hm(+t.dur)}` : ''}${t.repeat ? ' · 🔁' : ''}${cl.length ? ` · ☑ ${clDone}/${cl.length}` : ''}${late ? ` · <span class="bad">trễ từ ${this.label(t.date)}</span>` : ''}${opt.full && t.note ? `<div class="pl-note">${esc(t.note)}</div>` : ''}</div></div>
      <div class="pl-ta">${t.link ? `<button class="mini-btn" data-go="${esc(t.link)}" title="Mở chỗ làm">↗</button>` : ''}${!done ? `<button class="mini-btn" data-run title="Bắt đầu tập trung">▶</button>` : ''}</div>
    </div>`;
  },

  dayCol(k, opt = {}) {
    const l = this.on(k), tk = this.todayK();
    const mins = l.filter(t => !this.isDone(t, k)).reduce((s, t) => s + (+t.dur || 0), 0);
    return `<div class="pl-day ${k === tk ? 'is-today' : ''} ${k < tk ? 'past' : ''}" data-k="${k}">
      <div class="pl-dh"><span>${this.WD[this.parse(k).getDay()]}</span><b>${this.parse(k).getDate()}</b>${mins ? `<small>${this.hm(mins)}</small>` : ''}<button class="mini-btn pl-plus" data-new="${k}" title="Thêm việc ngày này">＋</button></div>
      <div class="pl-list">${l.map(t => this.chip(t, k, opt)).join('')}</div></div>`;
  },
  weekView(mon) { return `<div class="pl-week">${[...Array(7)].map((_, i) => this.dayCol(this.add(mon, i))).join('')}</div>`; },
  dayView(k) {
    const od = k === this.todayK() ? this.overdue() : [];
    return `${od.length ? `<div class="pl-over"><h3>⏰ Việc trễ hạn (${od.length})</h3><div class="pl-list">${od.map(t => this.chip(t, t.date, { full: 1 })).join('')}</div><button class="btn sm" id="plMoveOver">Dời hết sang hôm nay</button></div>` : ''}
      <div class="pl-dayv">${this.dayCol(k, { full: 1 })}${this.timeline(k)}</div>`;
  },
  /* trục giờ trong ngày cho việc có giờ bắt đầu */
  timeline(k) {
    const l = this.on(k).filter(t => t.start); if (!l.length) return '<div class="pl-tl empty muted sm">Việc có giờ bắt đầu sẽ hiện trên trục giờ ở đây.</div>';
    const toM = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
    const lo = Math.max(0, Math.floor(Math.min(...l.map(t => toM(t.start))) / 60) - 1), hi = Math.min(24, Math.ceil(Math.max(...l.map(t => toM(t.start) + (+t.dur || 30))) / 60) + 1);
    const H = 48, now = new Date(), nowM = now.getHours() * 60 + now.getMinutes();
    return `<div class="pl-tl" style="height:${(hi - lo) * H}px">${[...Array(hi - lo)].map((_, i) => `<div class="pl-hr" style="top:${i * H}px">${String(lo + i).padStart(2, '0')}:00</div>`).join('')}
      ${k === this.todayK() && nowM / 60 >= lo && nowM / 60 <= hi ? `<div class="pl-now" style="top:${(nowM / 60 - lo) * H}px"></div>` : ''}
      ${l.map(t => { const s = toM(t.start), c = this.CATS[t.cat] || this.CATS.study; return `<div class="pl-blk ${this.isDone(t, k) ? 'done' : ''}" data-id="${t.id}" data-k="${k}" style="top:${(s / 60 - lo) * H}px;height:${Math.max(22, (+t.dur || 30) / 60 * H - 3)}px;--tc:${c.c}"><b>${t.start}</b> ${esc(t.title)}</div>`; }).join('')}</div>`;
  },
  monthView(anchor) {
    const d = this.parse(anchor); d.setDate(1); const first = this.key(d), start = this.monday(first), m = d.getMonth(), tk = this.todayK();
    let html = `<div class="pl-month"><div class="pl-mh">${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(w => `<span>${w}</span>`).join('')}</div><div class="pl-mg">`;
    for (let i = 0; i < 42; i++) {
      const k = this.add(start, i), dd = this.parse(k); if (i >= 35 && dd.getMonth() !== m) break;
      const l = this.on(k), done = l.filter(t => this.isDone(t, k)).length;
      html += `<div class="pl-mc ${dd.getMonth() !== m ? 'out' : ''} ${k === tk ? 'is-today' : ''}" data-k="${k}" data-day="${k}"><div class="pl-mn"><b>${dd.getDate()}</b>${l.length ? `<small>${done}/${l.length}</small>` : ''}</div>
        ${l.slice(0, 3).map(t => `<div class="pl-mt ${this.isDone(t, k) ? 'done' : ''}" style="--tc:${(this.CATS[t.cat] || this.CATS.study).c}">${t.start ? t.start + ' ' : ''}${esc(t.title)}</div>`).join('')}${l.length > 3 ? `<div class="muted sm">+${l.length - 3} việc</div>` : ''}</div>`;
    }
    return html + '</div></div>';
  },

  bind(root) {
    if (!root) return;
    const find = id => Store.find('tasks', id);
    $$('.pl-t', root).forEach(el => {
      const t = find(el.dataset.id); if (!t) return;
      const k = el.dataset.k || this.todayK();
      $('.pl-ck', el).onchange = e => { this.setDone(t, k, e.target.checked); this.draw(); };
      $('.pl-tb', el).onclick = () => this.form(t, k);
      $('[data-run]', el) && ($('[data-run]', el).onclick = () => { Timer.start(Math.max(5, +t.dur || 25), t.title); toast('Bắt đầu ấp trứng: ' + t.title); });
      $('[data-go]', el) && ($('[data-go]', el).onclick = () => this.go(t));
      el.ondragstart = e => { e.dataTransfer.setData('text/plain', t.id); el.classList.add('drag'); };
      el.ondragend = () => el.classList.remove('drag');
    });
    $$('.pl-blk', root).forEach(el => el.onclick = () => this.form(find(el.dataset.id), el.dataset.k));
    $$('[data-new]', root).forEach(b => b.onclick = e => { e.stopPropagation(); this.form(null, b.dataset.new); });
    $$('[data-day]', root).forEach(c => c.onclick = () => { this.view = 'day'; this.anchor = c.dataset.day; this.page($('#view')); });
    // kéo thả: thả vào ngày (hoặc hộp chưa xếp lịch)
    $$('.pl-day, .pl-mc, #plInbox', root).forEach(z => {
      z.ondragover = e => { e.preventDefault(); z.classList.add('over'); };
      z.ondragleave = () => z.classList.remove('over');
      z.ondrop = e => { e.preventDefault(); z.classList.remove('over'); const t = find(e.dataTransfer.getData('text/plain')); if (!t || t.repeat) return; t.date = z.dataset.k || ''; Store.save('tasks'); this.draw(); };
    });
    $('#plMoveOver') && ($('#plMoveOver').onclick = () => { this.overdue().forEach(t => t.date = this.todayK()); Store.save('tasks'); this.draw(); });
  },
  go(t) {
    const m = (t.link || '').match(/^#\/ngoai-ngu\/(\w+)/);
    if (m && t.scope) Lang.scope[m[1]] = { ...t.scope };
    location.hash = t.link;
  },

  /* ---------- thêm / sửa ---------- */
  form(t, k) {
    const isNew = !t;
    t = t || { id: uid(), title: '', date: k || this.todayK(), start: '', dur: 30, cat: 'study', prio: 1, repeat: '', note: '', checklist: [] };
    const cl = (t.checklist || []).map(x => ({ ...x }));
    const courses = Store.list('courses');
    modal({
      title: isNew ? '＋ Việc mới' : 'Sửa việc', wide: true, body: `
        <input class="inp big" id="tfTitle" value="${esc(t.title)}" placeholder="Làm gì? (vd: Học Minna bài 6 · Viết tiểu luận triết học)">
        <div class="tf-grid">
          <label>Ngày<input type="date" class="inp" id="tfDate" value="${t.date || ''}"><small class="muted">để trống = chưa xếp lịch</small></label>
          <label>Giờ bắt đầu<input type="time" class="inp" id="tfStart" value="${t.start || ''}"></label>
          <label>Thời lượng (phút)<input type="number" class="inp" id="tfDur" value="${t.dur || ''}" min="5" step="5"></label>
          <label>Lặp lại<select class="inp" id="tfRep">${Object.entries(this.REPEAT).map(([v, n]) => `<option value="${v}" ${t.repeat === v ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
          <label id="tfUntilL" ${t.repeat ? '' : 'hidden'}>Lặp đến ngày<input type="date" class="inp" id="tfUntil" value="${t.until || ''}"></label>
        </div>
        <label class="lbl">Nhóm</label><div class="seg wrap" id="tfCat">${Object.entries(this.CATS).map(([v, c]) => `<button data-c="${v}" class="${t.cat === v ? 'on' : ''}" style="--tc:${c.c}">${c.i} ${c.n}</button>`).join('')}</div>
        <label class="lbl">Mức độ</label><div class="seg" id="tfPrio">${['Thấp', 'Bình thường', '❗ Quan trọng'].map((n, i) => `<button data-p="${i}" class="${(t.prio ?? 1) === i ? 'on' : ''}">${n}</button>`).join('')}</div>
        <label class="lbl">Checklist các bước nhỏ</label><div id="tfCl"></div><input class="inp" id="tfClIn" placeholder="Thêm bước rồi Enter (vd: học 20 từ mới, làm bài nghe…)">
        <label class="lbl">Ghi chú</label><textarea class="inp" id="tfNote" rows="2">${esc(t.note || '')}</textarea>
        <label class="lbl">Liên kết tới</label><select class="inp" id="tfLink"><option value="">— không —</option>
          ${courses.map(c => `<option value="#/ngoai-ngu/${c.id}/hoc" ${t.link === `#/ngoai-ngu/${c.id}/hoc` ? 'selected' : ''}>${c.flag} Học & ôn: ${esc(c.name)}</option>`).join('')}
          ${[['#/viet', '✎ Phòng Viết'], ['#/luu-tru', '🗂 Kho Lưu Trữ'], ['#/sach', '📚 Thư viện sách']].map(([v, n]) => `<option value="${v}" ${t.link === v ? 'selected' : ''}>${n}</option>`).join('')}
          ${t.link && !/^#\/(viet|luu-tru|sach)$/.test(t.link) && !courses.some(c => t.link === `#/ngoai-ngu/${c.id}/hoc`) ? `<option value="${esc(t.link)}" selected>${esc(t.link)}</option>` : ''}</select>`,
      onOpen: w => {
        let cat = t.cat || 'study', prio = t.prio ?? 1;
        $$('#tfCat button', w).forEach(b => b.onclick = () => { cat = b.dataset.c; $$('#tfCat button', w).forEach(x => x.classList.toggle('on', x === b)); });
        $$('#tfPrio button', w).forEach(b => b.onclick = () => { prio = +b.dataset.p; $$('#tfPrio button', w).forEach(x => x.classList.toggle('on', x === b)); });
        $('#tfRep', w).onchange = e => { $('#tfUntilL', w).hidden = !e.target.value; };
        const drawCl = () => { $('#tfCl', w).innerHTML = cl.map((x, i) => `<div class="tf-cl"><input type="checkbox" data-i="${i}" ${x.done ? 'checked' : ''}><span>${esc(x.t)}</span><button class="mini-btn" data-del="${i}">✕</button></div>`).join(''); $$('#tfCl [data-i]', w).forEach(c => c.onchange = () => { cl[+c.dataset.i].done = c.checked; }); $$('#tfCl [data-del]', w).forEach(b => b.onclick = () => { cl.splice(+b.dataset.del, 1); drawCl(); }); };
        drawCl();
        $('#tfClIn', w).onkeydown = e => { if (e.key === 'Enter' && e.target.value.trim()) { e.preventDefault(); cl.push({ t: e.target.value.trim(), done: false }); e.target.value = ''; drawCl(); } };
        w._get = () => ({ cat, prio });
        $('#tfTitle', w).focus();
      },
      actions: [
        ...(!isNew ? [{ label: '🗑 Xoá', cls: 'danger', onClick: async () => { if (!await confirmBox(t.repeat ? 'Xoá cả chuỗi việc lặp lại này?' : 'Xoá việc này?')) return false; Store.remove('tasks', t.id); this.draw(); } }] : []),
        ...(!isNew && t.repeat && k ? [{ label: 'Bỏ qua ngày này', onClick: () => { t.skip = [...(t.skip || []), k]; Store.save('tasks'); this.draw(); } }] : []),
        { label: 'Lưu', cls: 'pri', onClick: w => {
          const title = $('#tfTitle', w).value.trim(); if (!title) { toast('Chưa có tên việc', 'err'); return false; }
          const g = w._get();
          Object.assign(t, { title, date: $('#tfDate', w).value, start: $('#tfStart', w).value, dur: +$('#tfDur', w).value || 0, repeat: $('#tfRep', w).value, until: $('#tfUntil', w).value, cat: g.cat, prio: g.prio, note: $('#tfNote', w).value.trim(), checklist: cl, link: $('#tfLink', w).value });
          if (t.repeat && !t.date) t.date = this.todayK();
          if (isNew) { t.created = Date.now(); Store.list('tasks').unshift(t); }
          if (!isNew && cl.length && cl.every(x => x.done) && !this.isDone(t, k || t.date)) this.setDone(t, k || t.date, true);
          Store.save('tasks'); this.draw();
        } }]
    });
  },

  /* thêm nhanh bằng câu tự nhiên */
  quick(s) {
    const t = { id: uid(), title: s, date: '', start: '', dur: 0, cat: 'study', prio: 1, repeat: '', checklist: [], created: Date.now() };
    const tk = this.todayK(); let x = ' ' + s + ' ';
    const take = (re, fn) => { const m = x.match(re); if (m) { fn(m); x = x.replace(m[0], ' '); } };
    take(/\s!+\s/, () => t.prio = 2);
    take(/\s(mỗi ngày|hằng ngày|hàng ngày)\s/i, () => t.repeat = 'daily');
    take(/\s(mỗi tuần|hằng tuần|hàng tuần)\s/i, () => t.repeat = 'weekly');
    take(/\s(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?\s/, m => { const y = m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : new Date().getFullYear(); t.date = this.key(new Date(y, +m[2] - 1, +m[1])); if (!m[3] && t.date < tk) t.date = this.key(new Date(y + 1, +m[2] - 1, +m[1])); });
    take(/\s(hôm nay|nay)\s/i, () => t.date = tk);
    take(/\s(ngày mai|mai)\s/i, () => t.date = this.add(tk, 1));
    take(/\s(ngày kia|mốt)\s/i, () => t.date = this.add(tk, 2));
    take(/\s(?:thứ\s*(2|3|4|5|6|7|hai|ba|tư|năm|sáu|bảy)|(chủ nhật|cn))\s/i, m => {
      const map = { '2': 1, hai: 1, '3': 2, ba: 2, '4': 3, 'tư': 3, '5': 4, 'năm': 4, '6': 5, 'sáu': 5, '7': 6, 'bảy': 6 };
      const want = m[2] ? 0 : map[m[1].toLowerCase()]; const d = this.parse(tk); let n = (want - d.getDay() + 7) % 7; if (n === 0) n = 7; t.date = this.add(tk, n);
    });
    // thời lượng: “2 tiếng”, “1,5 giờ”, “2h” (số nhỏ ≤ 5 + h = thời lượng), “30p”
    take(/\s(\d+(?:[.,]\d)?)\s*(tiếng|giờ)\s/i, m => t.dur = Math.round(parseFloat(m[1].replace(',', '.')) * 60));
    take(/\s([1-5](?:[.,]5)?)\s*h\s/i, m => t.dur = Math.round(parseFloat(m[1].replace(',', '.')) * 60));
    take(/\s(\d+)\s*(p|phút|ph|m|min)\s/i, m => t.dur = +m[1]);
    // giờ bắt đầu: “20:00”, “8h30”, “lúc 3h”, “21h”
    take(/\s(?:lúc\s*)?(\d{1,2})(?::|h)(\d{2})?\s/i, m => { if (+m[1] > 23) return; t.start = `${String(+m[1]).padStart(2, '0')}:${m[2] || '00'}`; if (!t.date) t.date = tk; });
    if (t.repeat && !t.date) t.date = tk;
    t.title = x.replace(/\s+/g, ' ').trim() || s;
    const low = t.title.toLowerCase();
    t.cat = /ôn|minna|từ vựng|kanji|tiếng|ngữ pháp|jlpt|ielts|toeic|nghe|nói/.test(low) ? 'lang' : /đọc|sách/.test(low) ? 'read' : /viết|bài luận|tiểu luận|blog/.test(low) ? 'write' : /họp|làm việc|báo cáo|deadline|dự án|email/.test(low) ? 'work' : /tập|chạy|ngủ|dọn|nấu|gym|yoga/.test(low) ? 'life' : 'study';
    if (!t.dur) t.dur = 30;
    return t;
  },

  /* ---------- lập kế hoạch học theo giáo trình ---------- */
  planForm() {
    const courses = Store.list('courses');
    const books = Store.list('tbooks').filter(b => (b.units || []).length);
    const tk = this.todayK();
    modal({
      title: '📅 Lập kế hoạch học', wide: true, body: `
        <p class="muted">Chọn sách/giáo trình và các bài cần học. Mỗi buổi học một bài (hoặc nửa bài), rải đều vào các thứ bạn chọn, kèm buổi ôn tập sau mỗi vài bài. Mỗi việc có nút ↗ mở thẳng đúng bài đó.</p>
        ${books.length ? `<label class="lbl">Giáo trình</label><select class="inp" id="pfBook">${books.map(b => { const c = courses.find(x => x.id === b.courseId); return `<option value="${b.id}">${c ? c.flag + ' ' + esc(c.name) + ' · ' : ''}${esc(b.title)} (${b.units.length} bài)</option>`; }).join('')}</select>
        <div class="tf-grid"><label>Từ bài<select class="inp" id="pfFrom"></select></label><label>Đến bài<select class="inp" id="pfTo"></select></label>
          <label>Bắt đầu từ<input type="date" class="inp" id="pfStart" value="${tk}"></label><label>Giờ học<input type="time" class="inp" id="pfTime" value="20:00"></label>
          <label>Mỗi buổi (phút)<input type="number" class="inp" id="pfDur" value="45" min="10" step="5"></label>
          <label>Nhịp<select class="inp" id="pfPace"><option value="1">1 bài / buổi</option><option value="2">1 bài / 2 buổi (học kỹ)</option></select></label>
          <label>Ôn tập tổng hợp<select class="inp" id="pfRev"><option value="3">sau mỗi 3 bài</option><option value="5" selected>sau mỗi 5 bài</option><option value="0">không</option></select></label></div>
        <label class="lbl">Học vào các thứ</label><div class="seg" id="pfDays">${[1, 2, 3, 4, 5, 6, 0].map(d => `<button data-d="${d}" class="${[1, 3, 5, 6].includes(d) ? 'on' : ''}">${this.WD[d]}</button>`).join('')}</div>
        <label class="row" style="margin-top:10px"><input type="checkbox" id="pfDaily" checked> Thêm việc lặp “Ôn thẻ mỗi ngày (15′)”</label>
        <div class="muted" id="pfSum" style="margin-top:8px"></div>` : '<p>Chưa có giáo trình nào có bài. Vào <a href="#/ngoai-ngu">Ngoại ngữ</a> để tạo lớp hoặc nạp Minna no Nihongo N5 trước nhé.</p>'}`,
      onOpen: w => {
        if (!books.length) return;
        const fill = () => { const b = books.find(x => x.id === $('#pfBook', w).value); const opts = b.units.map((u, i) => `<option value="${i}">${esc(u.title)}</option>`).join(''); $('#pfFrom', w).innerHTML = opts; $('#pfTo', w).innerHTML = opts; $('#pfTo', w).value = b.units.length - 1; sum(); };
        const sum = () => {
          const p = this.buildPlan(w, books, true); if (!p) return;
          $('#pfSum', w).innerHTML = p.list.length ? `Sẽ tạo <b>${p.list.length}</b> buổi, từ <b>${this.label(p.list[0].date, true)}</b> đến <b>${this.label(p.list[p.list.length - 1].date, true)}</b>.` : 'Chọn ít nhất một thứ trong tuần.';
        };
        $('#pfBook', w).onchange = fill;
        $$('#pfDays button', w).forEach(b => b.onclick = () => { b.classList.toggle('on'); sum(); });
        $$('input,select', w).forEach(i => i.addEventListener('change', sum));
        fill();
      },
      actions: books.length ? [{ label: 'Tạo lịch', cls: 'pri', onClick: w => {
        const p = this.buildPlan(w, books); if (!p || !p.list.length) { toast('Chưa có buổi nào được tạo', 'err'); return false; }
        Store.list('tasks').push(...p.list);
        if ($('#pfDaily', w).checked && p.course && !this.tasks().some(t => t.repeat === 'daily' && t.link === `#/ngoai-ngu/${p.course.id}/hoc`)) Store.list('tasks').push({ id: uid(), title: `Ôn thẻ ${p.course.name}`, date: p.list[0].date, start: '', dur: 15, cat: 'lang', prio: 1, repeat: 'daily', until: p.list[p.list.length - 1].date, link: `#/ngoai-ngu/${p.course.id}/hoc`, checklist: [], created: Date.now() });
        Store.save('tasks'); toast(`Đã xếp ${p.list.length} buổi học vào lịch 📅`, 'ok');
        this.view = 'month'; this.anchor = p.list[0].date; this.page($('#view'));
      } }] : []
    });
  },
  buildPlan(w, books, dry) {
    const b = books.find(x => x.id === $('#pfBook', w).value); if (!b) return null;
    const c = Store.find('courses', b.courseId);
    let from = +$('#pfFrom', w).value, to = +$('#pfTo', w).value; if (from > to) [from, to] = [to, from];
    const days = $$('#pfDays button.on', w).map(x => +x.dataset.d); if (!days.length) return { list: [], course: c };
    const pace = +$('#pfPace', w).value, rev = +$('#pfRev', w).value, dur = +$('#pfDur', w).value || 45, time = $('#pfTime', w).value;
    const sessions = [];
    b.units.slice(from, to + 1).forEach((u, i) => {
      const scope = { bookId: b.id, unitId: u.id };
      const link = c ? `#/ngoai-ngu/${c.id}/hoc` : '';
      const nCards = Store.list('cards').filter(x => x.unitId === u.id).length;
      if (pace === 1) sessions.push({ title: `${u.title} (${b.title.split("·")[0].trim()})`, scope, link, checklist: [{ t: `Học ${nCards || ''} từ mới`.replace('  ', ' '), done: false }, { t: 'Nghe chép câu ví dụ', done: false }, { t: 'Đặt 3 câu của riêng mình', done: false }] });
      else { sessions.push({ title: `${u.title} · phần 1: từ mới`, scope, link, checklist: [{ t: `Học ${nCards || ''} từ mới`.replace('  ', ' '), done: false }] }); sessions.push({ title: `${u.title} · phần 2: luyện & ôn`, scope, link, checklist: [{ t: 'Nghe chép', done: false }, { t: 'Ôn thẻ của bài', done: false }, { t: 'Đặt câu', done: false }] }); }
      if (rev && (i + 1) % rev === 0) sessions.push({ title: `Ôn tập tổng hợp ${b.units[from + i + 1 - rev].title.split('·')[0].trim()} → ${u.title.split('·')[0].trim()}`, scope: { bookId: b.id }, link, checklist: [{ t: 'Ôn thẻ cả sách', done: false }, { t: 'Chơi trò chơi từ vựng', done: false }] });
    });
    const list = []; let k = $('#pfStart', w).value || this.todayK(), guard = 0;
    while (list.length < sessions.length && guard++ < 2000) {
      if (days.includes(this.parse(k).getDay())) { const s = sessions[list.length]; list.push({ id: uid(), ...s, date: k, start: time, dur, cat: 'lang', prio: 1, repeat: '', note: '', created: Date.now() + list.length }); }
      k = this.add(k, 1);
    }
    return { list, course: c };
  },

  /* ---------- xuất .ics ---------- */
  ics() {
    const pad = n => String(n).padStart(2, '0');
    const dt = (k, hm) => k.replace(/-/g, '') + (hm ? 'T' + hm.replace(':', '') + '00' : '');
    const RR = { daily: 'FREQ=DAILY', weekdays: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', weekly: 'FREQ=WEEKLY', monthly: 'FREQ=MONTHLY' };
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Chu-tchi//Lich hoc//VI'];
    this.tasks().filter(t => t.date && !(t.done && !t.repeat)).forEach(t => {
      const end = () => { const [h, m] = t.start.split(':').map(Number); const e = new Date(2000, 0, 1, h, m + (+t.dur || 30)); return pad(e.getHours()) + ':' + pad(e.getMinutes()); };
      lines.push('BEGIN:VEVENT', `UID:${t.id}@chu-tchi`, `SUMMARY:${(t.title || '').replace(/[,;\\]/g, m => '\\' + m)}`,
        t.start ? `DTSTART:${dt(t.date, t.start)}` : `DTSTART;VALUE=DATE:${dt(t.date)}`,
        t.start ? `DTEND:${dt(t.date, end())}` : `DTEND;VALUE=DATE:${dt(this.add(t.date, 1))}`,
        ...(t.repeat ? [`RRULE:${RR[t.repeat]}${t.until ? ';UNTIL=' + dt(t.until) : ''}`] : []),
        ...(t.note ? [`DESCRIPTION:${t.note.replace(/\n/g, '\\n')}`] : []), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    download('lich-hoc.ics', lines.join('\r\n'), 'text/calendar');
  },

  /* nhắc việc khi đến giờ (lúc trang đang mở) */
  remind() {
    clearInterval(this._r);
    const fired = new Set();
    this._r = setInterval(() => {
      const k = this.todayK(), d = new Date(), now = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      this.on(k).filter(t => t.start === now && !this.isDone(t, k) && !fired.has(t.id + k)).forEach(t => {
        fired.add(t.id + k); Sfx.jingle([659, 784, 988]); toast(`⏰ Đến giờ: ${t.title}`, 'ok');
        try { if (window.Notification && Notification.permission === 'granted') new Notification('Chữ-tchi · đến giờ', { body: t.title }); } catch (e) { }
      });
    }, 20000);
  }
};
