/* =========================================================
   GIÁO TRÌNH — học theo từng bài của một giáo trình ngoại ngữ thật
   (vd 新HSK教程3). Mỗi bài đi đúng các mục của sách:
   目标/热身 → 课文1–4 (nghe chọn đáp án · bài khoá · 生词 · đọc phân vai · 小语讲堂)
   → 综合练习 → 课堂活动 → sách bài tập → 小语加油站 → tổng kết.
   · Nội dung sách KHÔNG nằm trong repo: người học tự nhập tệp giáo trình (.json),
     lưu ở Store 'tbdata' — chỉ trên máy này, không đồng bộ (xem Sync.LOCAL_ONLY).
   · Tiến độ, đáp án, ghi chép lưu ở Store 'acad' (mục G:…), có đồng bộ.
   · Từ mới & ngữ pháp có thể đưa vào lớp ngoại ngữ (thẻ ôn lặp lại, Viết chữ, Nghe & nói…).
   ========================================================= */
const TB = {
  FORMAT: 'chutchi-textbook@1',
  POS: { 'n.': 'noun', 'v.': 'verb', 'adj.': 'adjective', 'adv.': 'adverb', 'pron.': 'pronoun', 'conj.': 'conjunction', 'prep.': 'preposition', 'm.': 'counter', 'num.': 'counter', 'mod.': 'verb', 'part.': 'particle', 'int.': 'interjection', 'onom.': 'other', 'pn.': 'noun' },
  POSVI: { 'n.': 'danh từ', 'v.': 'động từ', 'adj.': 'tính từ', 'adv.': 'phó từ', 'pron.': 'đại từ', 'conj.': 'liên từ', 'prep.': 'giới từ', 'm.': 'lượng từ', 'num.': 'số từ', 'mod.': 'động từ năng nguyện', 'part.': 'trợ từ', 'int.': 'thán từ', 'onom.': 'từ tượng thanh', 'pn.': 'danh từ riêng' },

  /* ---------- dữ liệu ---------- */
  books() { return Store.list('tbdata'); },
  book(id) { return Store.find('tbdata', id)?.data || null; },
  lesson(B, n) { return B.lessons.find(l => l.n === +n); },
  rec(bid, n) { return Academy.rec(`G:${bid}:${n}`, { kind: 'tblesson', book: bid, lesson: +n, step: 0, ans: {}, n: {} }); },
  peek(bid, n) { return Store.find('acad', `G:${bid}:${n}`); },
  save() { Academy.save(); },
  au(a) { return !a ? '' : /^https?:/.test(a) ? a : `https://drive.usercontent.google.com/download?id=${encodeURIComponent(a)}&export=download`; },
  audio(a, label = '🎧 Audio gốc') { return a ? `<div class="tb-audio"><span>${label}</span><audio controls preload="none" src="${esc(this.au(a))}"></audio></div>` : ''; },
  lang(B) { return B.lang || 'zh-CN'; },
  say(B, t, rate = .85) { Speech.speak(t, this.lang(B), rate); },
  tri(o) { return o ? `<span class="tb-zh">${esc(o.zh || '')}</span>${o.vi ? `<span class="tb-vi">${esc(o.vi)}</span>` : ''}${o.en ? `<span class="tb-en">${esc(o.en)}</span>` : ''}` : ''; },

  /* ---------- nhập giáo trình ---------- */
  async importFile() {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = async () => {
      const f = inp.files[0]; if (!f) return;
      try { this.importData(JSON.parse(await f.text())); } catch (e) { toast('Tệp không đọc được: ' + e.message, 'err', 5000); }
    };
    inp.click();
  },
  importData(d) {
    if (!d || d.format !== this.FORMAT || !Array.isArray(d.lessons)) throw new Error('không phải tệp giáo trình của Chữ-tchi');
    const old = Store.find('tbdata', d.id);
    Store.upsert('tbdata', { id: d.id, data: d, at: Date.now() }); Store.flush();
    toast(`📘 ${old ? 'Đã cập nhật' : 'Đã nhập'} “${d.title}” · ${d.lessons.filter(l => l.texts?.length).length} bài có nội dung`, 'ok', 4000);
    Router.go('/ngoai-ngu/giao-trinh/' + d.id);
  },

  /* ---------- kệ giáo trình ---------- */
  home(view) {
    const bs = this.books();
    view.innerHTML = `<div class="page acad tb">
      <div class="ac-crumb"><a href="#/ngoai-ngu">🌍 Ngoại ngữ</a> › Giáo trình</div>
      <header class="page-hero" style="--hc:#ffe680"><div class="ph-txt"><div class="kicker">Học theo sách</div><h1>📘 Giáo trình</h1>
        <p>Học <b>từng bài theo đúng thứ tự và các mục của sách</b>: mục tiêu, khởi động, bài khoá có audio gốc, từ mới, ngữ pháp, luyện tập, hoạt động, sách bài tập. Từ mới của bài có thể đưa thẳng vào lớp ngoại ngữ để ôn bằng thẻ.</p>
        <div class="lh-acts"><button class="btn pri big" id="tbImp">📥 Nhập tệp giáo trình (.json)</button></div>
        <p class="muted sm">Tệp giáo trình chỉ lưu trên máy này (không đồng bộ, không đưa lên mạng) vì là nội dung sách có bản quyền; tiến độ học thì có đồng bộ. Đổi máy thì nhập lại tệp — tiến độ vẫn còn.</p></div></header>
      <div class="course-grid">${bs.map(b => { const B = b.data, done = B.lessons.filter(l => this.peek(B.id, l.n)?.done).length; return `<a class="course-card" href="#/ngoai-ngu/giao-trinh/${esc(B.id)}" style="--cc:${esc(B.color || '#ffe680')}"><span class="cc-flag">${esc(B.flag || '📘')}</span><h3>${esc(B.title)}</h3><p class="muted sm">${esc(B.sub || '')}</p><div class="cc-stats"><span>📖 ${B.lessons.length} bài</span><span>✓ ${done} đã học</span></div><div class="cc-bar"><i style="width:${done / B.lessons.length * 100}%"></i></div></a>`; }).join('')}
      ${bs.length ? '' : `<div class="empty big">${Art.creature('prof', { size: 100 })}<p>Chưa có giáo trình nào. Bấm “Nhập tệp giáo trình” và chọn tệp .json Claude soạn cho bạn.</p></div>`}</div></div>`;
    $('#tbImp', view).onclick = () => this.importFile();
  },

  /* ---------- đề cương một giáo trình ---------- */
  outline(view, bid) {
    const B = this.book(bid);
    if (!B) { view.innerHTML = `<div class="page"><div class="empty big">${Art.creature('prof', { size: 90 })}<p>Máy này chưa có tệp giáo trình này. Nhập tệp .json để học tiếp (tiến độ cũ vẫn còn).</p><button class="btn pri" id="tbImp">📥 Nhập tệp</button> <a class="btn" href="#/ngoai-ngu/giao-trinh">← Kệ giáo trình</a></div></div>`; $('#tbImp', view).onclick = () => this.importFile(); return; }
    const groups = []; B.lessons.forEach((l, i) => { const g = Math.floor(i / 3); (groups[g] = groups[g] || []).push(l); });
    const nWords = B.lessons.reduce((s, l) => s + (l.texts || []).reduce((t, x) => t + (x.words || []).length, 0), 0);
    view.innerHTML = `<div class="page acad tb">
      <div class="ac-crumb"><a href="#/ngoai-ngu">🌍 Ngoại ngữ</a> › <a href="#/ngoai-ngu/giao-trinh">Giáo trình</a> › ${esc(B.title)}</div>
      <header class="ac-chead" style="--cc:${esc(B.color || '#ffe680')}"><div class="kicker">${esc(B.level || '')}</div><h1>${esc(B.flag || '📘')} ${esc(B.title)}</h1><p class="muted">${esc(B.sub || '')}</p>
        <div class="row"><button class="btn pri" id="tbVoc">➕ Đưa từ mới vào lớp ngoại ngữ</button><span class="muted sm">${B.lessons.length} bài · ${nWords} từ mới đã soạn</span></div></header>
      ${B.intro ? `<details class="ac-intro"><summary>📌 Giới thiệu giáo trình & cách học</summary><div class="rich">${B.intro}</div></details>` : ''}
      ${groups.map((g, gi) => `<section class="ac-part"><h2>Bài ${g[0].n}–${g[g.length - 1].n}</h2><div class="ac-lessons">${g.map(l => {
        const r = this.peek(B.id, l.n), ready = !!l.texts?.length;
        return `<a class="ac-lesson ${ready ? '' : 'soon'} ${r?.done ? 'done' : ''}" href="#/ngoai-ngu/giao-trinh/${esc(B.id)}/${l.n}"><span class="ac-ln">${l.n}</span><div><b class="tb-zh">${esc(l.zh)}</b><small>${esc(l.vi || l.en || '')}</small>${l.points?.length ? `<small class="muted">📐 ${l.points.map(p => esc(p.zh || p.title)).join(' · ')}</small>` : ''}</div><i>${r?.done ? '✓' : ready ? (r ? '…' : '') : 'sắp có'}</i></a>`;
      }).join('')}</div>${B.reviews?.[gi] ? `<div class="ac-book">🔁 <b>学习小结 · Tổng kết bài ${g[0].n}–${g[g.length - 1].n}</b> — có ở bước cuối của bài ${g[g.length - 1].n}.</div>` : ''}</section>`).join('')}
    </div>`;
    $('#tbVoc', view).onclick = () => this.vocabDialog(B);
  },

  /* ---------- các bước của một bài, theo đúng mục sách ---------- */
  steps(L) {
    const s = [['goal', '🎯', '目标 · 热身']];
    (L.texts || []).forEach((t, i) => s.push(['t' + i, '📖', `课文${i + 1}`]));
    if (L.ex?.length) s.push(['ex', '🧩', '综合练习']);
    if (L.act?.length) s.push(['act', '🗣', '课堂活动']);
    if (L.wb?.length) s.push(['wb', '📒', 'Sách bài tập']);
    if (L.bonus) s.push(['bonus', '🌟', '小语加油站']);
    s.push(['sum', '✅', L.review ? '学习小结 · Tổng kết' : 'Tổng kết']);
    return s;
  },
  async lessonPage(view, bid, n, step) {
    const B = this.book(bid); if (!B) return this.outline(view, bid);
    const L = this.lesson(B, n);
    if (!L) return Router.go('/ngoai-ngu/giao-trinh/' + bid);
    if (!L.texts?.length) { view.innerHTML = `<div class="page acad tb"><div class="ac-crumb"><a href="#/ngoai-ngu/giao-trinh/${esc(bid)}">${esc(B.title)}</a></div><div class="empty big">${Art.creature('prof', { size: 100, mood: 'joy' })}<h2 class="tb-zh">${esc(L.zh)}</h2><p>Bài ${L.n} đang được soạn — nhập tệp giáo trình mới khi có nhé.</p><a class="btn pri" href="#/ngoai-ngu/giao-trinh/${esc(bid)}">← Về đề cương</a></div></div>`; return; }
    const r = this.rec(bid, n); r.ans = r.ans || {}; r.n = r.n || {};
    const steps = this.steps(L), LAST = steps.length - 1;
    if (step != null) r.step = step;
    const S = Math.min(r.step || 0, LAST);
    const nextL = B.lessons.find(x => x.n === L.n + 1);
    view.innerHTML = `<div class="page acad ac-lp tb ${r.py === false ? 'nopy' : ''} ${r.vi === false ? 'novi' : ''}">
      <div class="ac-crumb"><a href="#/ngoai-ngu/giao-trinh">📘 Giáo trình</a> › <a href="#/ngoai-ngu/giao-trinh/${esc(bid)}">${esc(B.title)}</a> › 第${L.n}课</div>
      <header class="ac-lhead"><div class="kicker">Lesson ${L.n}${L.page ? ` · sách tr. ${L.page}` : ''}</div><h1 class="tb-zh">${esc(L.zh)}</h1><p class="muted">${esc(L.vi || '')}${L.en ? ` · <i>${esc(L.en)}</i>` : ''}</p>
        <div class="seg sm tb-tg"><button data-tg="py" class="${r.py === false ? '' : 'on'}">Pinyin</button><button data-tg="vi" class="${r.vi === false ? '' : 'on'}">Tiếng Việt</button></div></header>
      <nav class="ac-steps">${steps.map((s, i) => `<button data-s="${i}" class="${i === S ? 'on' : ''} ${(r.seen || []).includes(i) ? 'seen' : ''}"><span>${s[1]}</span><small>${s[2]}</small></button>`).join('')}</nav>
      <section class="ac-body" id="acBody"></section>
      <div class="ac-foot">${S > 0 ? '<button class="btn" id="acPrev">← Trước</button>' : ''}<span class="grow"></span>
        ${S < LAST ? `<button class="btn pri" id="acNext">Tiếp: ${steps[S + 1][2]} →</button>` : r.done ? `<span class="tag ok">✓ Đã học xong ${fmtDate(r.done)}</span>${nextL ? `<a class="btn pri" href="#/ngoai-ngu/giao-trinh/${esc(bid)}/${nextL.n}">Bài ${nextL.n} →</a>` : ''}` : '<button class="btn pri" id="acDone">✓ Hoàn thành bài</button>'}</div></div>`;
    r.seen = [...new Set([...(r.seen || []), S])]; this.save();
    const go = i => { this.lessonPage(view, bid, n, i); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    $$('.ac-steps button', view).forEach(b => b.onclick = () => go(+b.dataset.s));
    $('#acPrev') && ($('#acPrev').onclick = () => go(S - 1));
    $('#acNext') && ($('#acNext').onclick = () => go(S + 1));
    $('#acDone') && ($('#acDone').onclick = () => { r.done = Date.now(); this.save(); Activity.add('lang'); toast(`🎉 Xong 第${L.n}课!`, 'ok'); Sfx.jingle && Sfx.jingle(); go(LAST); });
    $$('[data-tg]', view).forEach(b => b.onclick = () => { const k = b.dataset.tg; if (k === 'py') r.py = r.py === false; else r.vi = r.vi === false; this.save(); $('.tb', view).classList.toggle('nopy', r.py === false); $('.tb', view).classList.toggle('novi', r.vi === false); b.classList.toggle('on'); });
    const body = $('#acBody', view), key = steps[S][0];
    if (/^t\d+$/.test(key)) this.step_text(body, B, L, r, +key.slice(1)); else this['step_' + key](body, B, L, r);
    this.bindNotes(body, r);
    $$('[data-say]', body).forEach(x => x.addEventListener('click', e => { if (e.target.closest('button:not([data-say]),audio,a,input,textarea,select')) return; this.say(B, x.dataset.say); }));
    $$('[data-wr]', body).forEach(b => b.onclick = e => { e.stopPropagation(); Academy.writeModal(b.dataset.wr); });
  },
  ta(r, k, ph, rows = 2) { return `<textarea class="inp" rows="${rows}" data-n="${esc(k)}" placeholder="${esc(ph)}">${esc(r.n?.[k] || '')}</textarea>`; },
  bindNotes(el, r) { const put = debounce(() => this.save(), 500); $$('[data-n]', el).forEach(t => t.addEventListener('input', () => { r.n[t.dataset.n] = t.value; r.at = Date.now(); put(); })); },
  sent(s, B) { return `<div class="tb-sent" data-say="${esc(s.zh || s.s)}">${s.py ? `<div class="tb-py">${esc(s.py)}</div>` : ''}<div class="tb-zh">${esc(s.zh || s.s)}</div>${(s.vi || s.t) ? `<div class="tb-vi">${esc(s.vi || s.t)}</div>` : ''}</div>`; },

  /* ---------- 目标 + 热身 ---------- */
  step_goal(el, B, L, r) {
    const W = L.warm || {};
    el.innerHTML = `<div class="ac-goals"><b>🎯 目标 Objectives — học xong bài này bạn có thể:</b><ul class="tb-goals">${(L.goals || []).map((g, i) => `<li>${this.tri(g)}</li>`).join('')}</ul></div>
      <h3>🔥 热身 Warm-up</h3>
      ${W.match?.length ? `<p><b>1.</b> ${this.tri(W.matchTitle || { zh: '给下面的词语选择对应的图片。', vi: 'Nối từ với nghĩa (sách: chọn tranh tương ứng).' })}</p>${this.exHTML({ t: 'match', items: W.match }, 'w', r, B)}` : ''}
      ${W.talk?.length ? `<p><b>2.</b> ${this.tri(W.talkTitle || { zh: '两人一组，根据实际情况对话。', vi: 'Hai người một nhóm, hội thoại theo tình huống thực tế.' })}</p>${W.talk.map((q, i) => `<div class="ac-guide">${this.sent(q, B)}${this.ta(r, 'wt' + i, 'Trả lời bằng tiếng Trung (gõ hoặc nói rồi ghi lại)…')}${q.a ? `<details class="tb-hint"><summary>Gợi ý trả lời</summary>${this.sent(q.a, B)}</details>` : ''}</div>`).join('')}` : ''}
      <h3>Bạn đang vướng ở đâu?</h3>${this.ta(r, 'q0', 'Ghi chỗ khó trên lớp — gia sư ở bước 课堂活动 sẽ dựa vào đây.', 3)}`;
    this.bindEx(el, { t: 'match', items: W.match || [] }, 'w', r, B);
  },

  /* ---------- 课文 i ---------- */
  step_text(el, B, L, r, i) {
    const T = L.texts[i], open = r.n['open' + i] || !T.listen?.length;
    const pts = (T.points || []).map(j => L.points[j]).filter(Boolean);
    el.innerHTML = `<div class="tb-scene">📍 ${this.tri(T.scene)}</div>
      ${T.listen?.length ? `<h3>🎧 听两遍，选择正确答案 <small class="muted">Nghe hai lần, chọn đáp án đúng${T.audioNo ? ` · track ${esc(T.audioNo)}` : ''}</small></h3>${this.audio(T.audio)}${this.exHTML({ t: 'mcq', items: T.listen }, 'L' + i, r, B)}` : ''}
      <h3>💬 课文${i + 1} <small class="muted">${T.kind === 'para' ? 'Bài đọc' : 'Hội thoại'} · bấm vào câu để nghe máy đọc</small></h3>
      ${!T.listen?.length ? this.audio(T.audio) : ''}
      <div class="tb-text ${open ? '' : 'shut'}" id="tbText">${open ? this.linesHTML(T, B) : `<button class="btn" id="tbOpen">👀 Mở bài khoá <small class="muted">(nên nghe và làm câu hỏi trước)</small></button>`}</div>
      ${T.words?.length ? `<h3>🆕 生词 New Words <small class="muted">${T.words.length} từ</small></h3>${this.audio(T.wAudio, '🎧 Đọc từ mới')}${this.wordsHTML(T.words)}` : ''}
      ${T.ask?.length ? `<h3>🎭 ${T.kind === 'para' ? '朗读课文' : '分角色朗读对话'}，读后回答问题 <small class="muted">${T.kind === 'para' ? 'Đọc to bài, rồi trả lời' : 'Đọc phân vai, rồi trả lời'}</small></h3>${T.ask.map((q, j) => `<div class="ac-guide">${this.sent(q, B)}${this.ta(r, `a${i}_${j}`, 'Trả lời bằng tiếng Trung…')}${q.a ? `<details class="tb-hint"><summary>Đáp án gợi ý</summary>${this.sent(q.a, B)}</details>` : ''}</div>`).join('')}` : ''}
      ${pts.map(p => this.pointHTML(p, L, r, B)).join('')}`;
    if (!open) $('#tbOpen', el).onclick = () => { r.n['open' + i] = 1; this.save(); $('#tbText', el).classList.remove('shut'); $('#tbText', el).innerHTML = this.linesHTML(T, B); $$('#tbText [data-say]', el).forEach(x => x.onclick = () => this.say(B, x.dataset.say)); };
    if (T.listen?.length) this.bindEx(el, { t: 'mcq', items: T.listen }, 'L' + i, r, B);
    pts.forEach(p => (p.drill || []).forEach((d, k) => this.bindEx(el, d, `P${p.id}_${k}`, r, B)));
  },
  linesHTML(T, B) {
    if (T.kind === 'para') return `<div class="tb-para">${T.lines.map(x => `<p class="tb-sent" data-say="${esc(x.zh)}">${x.py ? `<span class="tb-py">${esc(x.py)}</span>` : ''}<span class="tb-zh">${esc(x.zh)}</span>${x.vi ? `<span class="tb-vi">${esc(x.vi)}</span>` : ''}</p>`).join('')}</div>`;
    const who = {}; let k = 0; T.lines.forEach(x => { if (!(x.who in who)) who[x.who] = k++ % 2; });
    return `<div class="tb-dlg">${T.lines.map(x => `<div class="tb-line s${who[x.who]}"><span class="tb-who">${esc(x.who)}</span><div class="tb-bub" data-say="${esc(x.zh)}">${x.py ? `<div class="tb-py">${esc(x.py)}</div>` : ''}<div class="tb-zh">${esc(x.zh)}</div>${x.vi ? `<div class="tb-vi">${esc(x.vi)}</div>` : ''}</div></div>`).join('')}</div>`;
  },
  wordsHTML(W) {
    return `<div class="tb-words">${W.map((w, j) => `<details class="tb-w"><summary data-say="${esc(w.w)}"><span class="tb-wn">${j + 1}</span><b class="tb-zh">${esc(w.w)}</b><span class="tb-wpy">${esc(w.py || '')}</span><i>${esc(w.pos || '')}</i><span class="tb-wvi">${esc(w.vi || '')}</span><button class="btn sm" data-wr="${esc(w.w)}" title="Tập viết">✍️</button></summary>
      <div class="tb-wd">${w.en ? `<div class="muted sm">EN: ${esc(w.en)}</div>` : ''}${w.hv ? `<div class="sm">Hán Việt: <b>${esc(w.hv)}</b></div>` : ''}${w.note ? `<div class="sm">💡 ${esc(w.note)}</div>` : ''}${(w.ex || []).map(e => `<div class="tb-sent sm" data-say="${esc(e.s)}"><span class="tb-zh">${esc(e.s)}</span>${e.py ? ` <span class="tb-py">${esc(e.py)}</span>` : ''}${e.t ? ` — <span class="tb-vi">${esc(e.t)}</span>` : ''}</div>`).join('')}${w.coll ? `<div class="sm">🔗 ${esc(w.coll)}</div>` : ''}</div></details>`).join('')}</div>`;
  },
  pointHTML(p, L, r, B) {
    return `<section class="tb-point"><h3>🎓 小语讲堂 · ${esc(p.zh || '')}</h3><div class="muted sm">${esc(p.en || '')}${p.vi ? ` · <b>${esc(p.vi)}</b>` : ''}</div>
      ${p.form ? `<div class="tb-form">${esc(p.form)}</div>` : ''}<div class="rich">${p.html || ''}</div>
      ${p.ex?.length ? `<div class="tb-exs"><b>Ví dụ trong sách</b>${p.ex.map(e => this.sent(e, B)).join('')}</div>` : ''}
      ${(p.drill || []).map((d, k) => `<div class="tb-set"><b>${this.tri(d.title || { zh: '练习' })}</b>${this.exHTML(d, `P${p.id}_${k}`, r, B)}</div>`).join('')}</section>`;
  },

  /* ---------- 综合练习 / sách bài tập ---------- */
  sets(el, sets, pre, r, B, intro) {
    el.innerHTML = `${intro || ''}${sets.map((s, k) => `<div class="tb-set"><h3>${k + 1}. ${this.tri(s.title || {})}</h3>${s.audio ? this.audio(s.audio, '🎧 Audio bài tập') : ''}${s.note ? `<p class="muted sm">${esc(s.note)}</p>` : ''}${this.exHTML(s, pre + k, r, B)}</div>`).join('')}
      <div class="row"><span id="tbScore" class="muted"></span><span class="grow"></span><button class="btn sm" id="tbRedo">↺ Làm lại phần này</button></div>`;
    sets.forEach((s, k) => this.bindEx(el, s, pre + k, r, B));
    $('#tbRedo', el).onclick = async () => { if (!(await confirmBox('Xoá các câu đã làm ở phần này?'))) return; Object.keys(r.ans).filter(x => x.startsWith(pre)).forEach(x => delete r.ans[x]); this.save(); this.sets(el, sets, pre, r, B, intro); this.bindNotes(el, r); };
    el._score = () => this.scoreLine(el, sets, pre, r); el._score();
  },
  step_ex(el, B, L, r) { this.sets(el, L.ex, 'E', r, B, `<p class="muted">综合练习 · Luyện tập tổng hợp từ vựng và ngữ pháp của cả bài (sách tr. ${L.exPage || '…'}). Câu tự luận: làm trước, rồi mở đáp án gợi ý hoặc nhờ AI chấm.</p>`); },
  step_wb(el, B, L, r) { this.sets(el, L.wb, 'W', r, B, `<p class="muted">📒 Bài tập theo <b>${esc(B.workbook || 'sách bài tập')}</b>, bài ${L.n}. Dạng nghe có audio gốc nếu sách có.</p>`); },
  scoreLine(el, sets, pre, r) {
    let tot = 0, ok = 0;
    sets.forEach((s, k) => (s.items || []).forEach((it, i) => { const t = it.t || s.t; if (['free', 'say'].includes(t)) return; tot++; if (r.ans[`${pre}${k}:${i}`]?.ok) ok++; }));
    const box = $('#tbScore', el); if (box) box.innerHTML = tot ? `Đã đúng <b>${ok}/${tot}</b> câu chấm tự động` : '';
  },

  /* ---------- trình bày & chấm các dạng bài ---------- */
  norm(s) { return String(s || '').replace(/[\s，。,.!?！？、；;：:“”"'‘’（）()]/g, '').toLowerCase(); },
  okFill(v, a) { return String(a).split('|').some(x => this.norm(x) === this.norm(v)); },
  exHTML(s, key, r, B) {
    const T = s.t;
    if (T === 'match') {
      const opts = s.items.map(x => x.b);
      const order = Academy.perm(opts.length, key);
      return `<div class="tb-match">${s.items.map((x, i) => { const a = r.ans[`${key}:${i}`]; return `<div class="tb-mrow ${a ? (a.ok ? 'ok' : 'bad') : ''}"><span class="tb-ma" data-say="${esc(x.a)}"><b class="tb-zh">${esc(x.a)}</b>${x.py ? ` <span class="tb-py">${esc(x.py)}</span>` : ''}</span><select class="inp sm" data-mk="${key}:${i}"><option value="">— chọn —</option>${order.map(j => `<option ${a?.v === opts[j] ? 'selected' : ''}>${esc(opts[j])}</option>`).join('')}</select></div>`; }).join('')}</div>`;
    }
    const bank = s.bank?.length ? `<div class="tb-bank">${s.bank.map(w => `<span>${esc(w)}</span>`).join('')}</div>` : '';
    return bank + `<ol class="tb-items">${(s.items || []).map((it, i) => {
      const t = it.t || T, k = `${key}:${i}`, a = r.ans[k];
      const head = `${it.audio ? this.audio(it.audio, '🎧') : ''}${it.ctx ? `<div class="tb-ctx">${esc(it.ctx)}</div>` : ''}${it.q ? `<div class="tb-q" ${/[一-鿿]/.test(it.q) ? `data-say="${esc(it.q.replace(/_+/g, '…'))}"` : ''}>${esc(it.q).replace(/_{2,}|（\s*）|\(\s*\)/g, '<span class="tb-blank">____</span>')}</div>` : ''}${it.qvi ? `<div class="tb-vi sm">${esc(it.qvi)}</div>` : ''}`;
      const why = it.why ? `<div class="dwhy" ${a ? '' : 'hidden'}>💡 ${esc(it.why)}</div>` : '';
      if (t === 'mcq' || t === 'tf') {
        const o = t === 'tf' ? ['✔ 对 (đúng)', '✘ 错 (sai)'] : it.o, ans = t === 'tf' ? (it.a ? 0 : 1) : it.a;
        const ord = o.map((_, j) => j);   // giữ thứ tự A/B/C như sách
        return `<li class="ac-drill" data-k="${k}" data-ans="${ans}">${head}<div class="dopts">${ord.map(j => `<button class="btn sm ${a ? (j === ans ? 'ok' : j === a.v ? 'bad' : '') : ''}" data-j="${j}" ${a ? 'disabled' : ''}>${t === 'mcq' ? String.fromCharCode(65 + j) + ' ' : ''}${esc(o[j])}</button>`).join('')}</div>${why}</li>`;
      }
      if (t === 'order') {
        const ws = it.w || [], ord = Academy.perm(ws.length, k);
        return `<li class="ac-drill tb-ord" data-k="${k}">${head}<div class="tb-chips">${ord.map(j => `<button class="btn sm" data-w="${j}">${esc(ws[j])}</button>`).join('')}</div><div class="tb-built tb-zh">${esc(a?.v || '')}</div><div class="row"><button class="btn sm" data-a="undo">⌫</button><button class="btn sm pri" data-a="chk">Kiểm tra</button><span class="tb-res">${a ? (a.ok ? '✓ Đúng' : `✗ Đáp án: <b class="tb-zh">${esc(it.a)}</b>`) : ''}</span></div>${why}</li>`;
      }
      if (t === 'fill' || t === 'bank') {
        return `<li class="ac-drill" data-k="${k}">${head}<div class="row"><input class="inp sm tb-in" value="${esc(a?.v || '')}" placeholder="${t === 'bank' ? 'chọn từ trong khung' : 'điền…'}"><button class="btn sm" data-a="chk">Kiểm tra</button><span class="tb-res">${a ? (a.ok ? '✓' : `✗ <b class="tb-zh">${esc(String(it.a).split('|')[0])}</b>`) : ''}</span></div>${why}</li>`;
      }
      /* free / say: tự luận */
      return `<li class="ac-drill tr" data-k="${k}">${head}${this.ta(r, 'F' + k, t === 'say' ? 'Nói to rồi ghi lại câu của bạn…' : 'Câu trả lời của bạn…')}<div class="row">${it.a ? `<button class="btn sm" data-a="show">Đáp án gợi ý</button>` : ''}<button class="btn sm" data-a="ai">✦ AI chấm</button></div>${it.a ? `<div class="dans" ${r.n['S' + k] ? '' : 'hidden'}>${this.sent(typeof it.a === 'string' ? { zh: it.a, py: it.apy, vi: it.avi } : it.a, B)}</div>` : ''}<div class="dfb">${r.n['FB' + k] ? `<div class="ac-fb rich">${Academy.md(r.n['FB' + k])}</div>` : ''}</div></li>`;
    }).join('')}</ol>`;
  },
  bindEx(el, s, key, r, B) {
    const T = s.t, mark = (k, ok, v) => { r.ans[k] = { v, ok, at: Date.now() }; this.save(); if (ok) Sfx.click?.(); el._score?.(); };
    if (T === 'match') {
      $$(`[data-mk^="${key}:"]`, el).forEach(sel => sel.onchange = () => { const i = +sel.dataset.mk.split(':').pop(), it = s.items[i]; mark(sel.dataset.mk, sel.value === it.b, sel.value); sel.closest('.tb-mrow').className = 'tb-mrow ' + (sel.value === it.b ? 'ok' : 'bad'); });
      return;
    }
    (s.items || []).forEach((it, i) => {
      const k = `${key}:${i}`, box = $(`.ac-drill[data-k="${k}"]`, el); if (!box) return;
      const t = it.t || T, showWhy = () => { const w = $('.dwhy', box); if (w) w.hidden = false; };
      if (t === 'mcq' || t === 'tf') $$('.dopts button', box).forEach(b => b.onclick = () => {
        if (r.ans[k]) return; const ans = +box.dataset.ans, j = +b.dataset.j; mark(k, j === ans, j);
        $$('.dopts button', box).forEach(x => { x.disabled = true; if (+x.dataset.j === ans) x.classList.add('ok'); else if (x === b) x.classList.add('bad'); }); showWhy();
      });
      if (t === 'order') {
        let built = []; const out = $('.tb-built', box), ws = it.w || [];
        $$('[data-w]', box).forEach(b => b.onclick = () => { built.push(+b.dataset.w); b.disabled = true; out.textContent = built.map(j => ws[j]).join(''); });
        $('[data-a="undo"]', box).onclick = () => { const j = built.pop(); if (j != null) $(`[data-w="${j}"]`, box).disabled = false; out.textContent = built.map(j => ws[j]).join(''); };
        $('[data-a="chk"]', box).onclick = () => { const v = out.textContent, ok = this.okFill(v, it.a); mark(k, ok, v); $('.tb-res', box).innerHTML = ok ? '✓ Đúng' : `✗ Đáp án: <b class="tb-zh">${esc(String(it.a).split('|')[0])}</b>`; showWhy(); };
      }
      if (t === 'fill' || t === 'bank') {
        const inp = $('.tb-in', box), chk = () => { const ok = this.okFill(inp.value, it.a); mark(k, ok, inp.value); $('.tb-res', box).innerHTML = ok ? '✓' : `✗ <b class="tb-zh">${esc(String(it.a).split('|')[0])}</b>`; showWhy(); };
        $('[data-a="chk"]', box).onclick = chk; inp.onkeydown = e => { if (e.key === 'Enter') chk(); };
      }
      if (t === 'free' || t === 'say') {
        const sh = $('[data-a="show"]', box); sh && (sh.onclick = () => { const d = $('.dans', box); d.hidden = !d.hidden; r.n['S' + k] = d.hidden ? '' : '1'; this.save(); });
        $('[data-a="ai"]', box).onclick = e => AI.withSpinner(e.target, async () => {
          const v = $(`[data-n="F${k}"]`, box).value.trim(); if (!v) { toast('Viết câu trả lời trước đã nhé', 'err'); return; }
          const fb = await AI.ask({ system: 'Bạn là giáo viên tiếng Trung dạy người Việt trình độ HSK 3. Chấm câu trả lời của học viên bằng tiếng Việt, ngắn gọn: (1) đúng/sai về ngữ pháp, từ vựng, chữ Hán; (2) sửa lại câu cho tự nhiên (kèm pinyin); (3) nếu có điểm ngữ pháp của bài thì nhắc cách dùng. Không chê nếu câu đã đúng.', prompt: `Yêu cầu / câu hỏi: ${[it.ctx, it.q, it.qvi].filter(Boolean).join(' · ')}\nĐáp án tham khảo: ${typeof it.a === 'string' ? it.a : it.a?.zh || '(không có — câu mở)'}\nCâu trả lời của học viên: ${v}` });
          r.n['FB' + k] = fb; this.save(); $('.dfb', box).innerHTML = `<div class="ac-fb rich">${Academy.md(fb)}</div>`;
        });
      }
    });
  },

  /* ---------- 课堂活动: đóng vai với gia sư AI ---------- */
  step_act(el, B, L, r) {
    r.chat = r.chat || [];
    const sc = r.n.scene || '0', A = L.act[+sc] || L.act[0];
    const draw = () => {
      el.innerHTML = `<p class="muted">课堂活动 · Hoạt động nhóm trong sách. Ở đây bạn đóng vai với gia sư AI (hoặc tự viết đoạn hội thoại nếu chưa có AI). Cố dùng <b>từ mới và điểm ngữ pháp của bài</b>.</p>
        ${L.act.map((a, i) => `<div class="ac-guide tb-act ${String(i) === sc ? 'on' : ''}" data-sc="${i}"><b>${esc(a.label || '场景' + (i + 1))}</b> ${this.tri(a)}</div>`).join('')}
        ${AI.ready() ? `<div class="ac-chat" id="acChat">${r.chat.length ? r.chat.map(m => `<div class="msg ${m.role === 'user' ? 'me' : 'so'}">${m.role === 'user' ? '' : '<span class="who">🧑‍🏫</span>'}<div>${Academy.md(m.content)}</div></div>`).join('') : `<div class="msg so"><span class="who">🧑‍🏫</span><div>Chọn một tình huống ở trên rồi nói câu đầu tiên bằng tiếng Trung nhé. Mình sẽ đóng vai người còn lại và sửa lỗi cho bạn sau mỗi lượt.</div></div>`}</div>
          <div class="ac-say"><textarea class="inp" id="acMsg" rows="2" placeholder="Nói bằng tiếng Trung… (Ctrl+Enter để gửi)"></textarea><button class="btn pri" id="acSend">Gửi</button></div><div class="row"><button class="btn sm" id="acNew">↺ Bắt đầu lại</button></div>`
        : `${this.ta(r, 'actw', 'Viết đoạn hội thoại của bạn (A: … / B: …)…', 8)}<div class="ac-fb">Thêm key AI miễn phí ở ⚙️ Cài đặt → Trợ lý AI để luyện nói với gia sư.</div>`}`;
      $$('[data-sc]', el).forEach(d => d.onclick = () => { r.n.scene = d.dataset.sc; this.save(); this.step_act(el, B, L, r); });
      if (!AI.ready()) return this.bindNotes(el, r);
      const box = $('#acChat', el); box.scrollTop = box.scrollHeight;
      const words = (L.texts || []).flatMap(t => (t.words || []).map(w => w.w)).join('、'), pts = (L.points || []).map(p => p.zh).join('；');
      const send = async () => {
        const t = $('#acMsg', el).value.trim(); if (!t) return;
        r.chat.push({ role: 'user', content: t }); this.save(); draw();
        const btn = $('#acSend', el); btn.disabled = true; btn.innerHTML = '<span class="spin">✦</span>';
        try {
          const a = await AI.ask({ system: `Bạn là bạn diễn kiêm giáo viên tiếng Trung cho người Việt học ${B.title} (trình độ HSK 3). Tình huống: ${A.zh} (${A.vi || A.en || ''}). Đóng vai người còn lại trong tình huống.
Mỗi lượt: (1) trả lời 1–2 câu tiếng Trung đơn giản (chỉ dùng từ HSK 1–3), kèm pinyin ở dòng dưới; (2) nếu câu của học viên có lỗi thì thêm một dòng "✏️ Sửa:" ngắn bằng tiếng Việt; (3) thỉnh thoảng gợi ý dùng từ/ngữ pháp của bài.
Từ mới của bài: ${words}. Ngữ pháp của bài: ${pts}. Chỗ học viên nói là đang vướng: ${r.n.q0 || '(chưa ghi)'}.`, messages: r.chat.slice(-14), maxTokens: 350 });
          r.chat.push({ role: 'assistant', content: a.trim() }); this.save();
        } catch (e) { toast('AI lỗi: ' + e.message, 'err', 5000); }
        draw(); $('#acMsg', el)?.focus();
      };
      $('#acSend', el).onclick = send;
      $('#acMsg', el).onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } };
      $('#acNew', el).onclick = async () => { if (r.chat.length && !(await confirmBox('Xoá đoạn hội thoại này?'))) return; r.chat = []; this.save(); draw(); };
    };
    draw();
  },

  /* ---------- 小语加油站 ---------- */
  step_bonus(el, B, L, r) {
    el.innerHTML = `<div class="tb-point"><h3>🌟 小语加油站 · ${esc(L.bonus.zh || '')}</h3><div class="muted sm">${esc(L.bonus.en || '')}${L.bonus.vi ? ` · <b>${esc(L.bonus.vi)}</b>` : ''}</div><div class="rich">${L.bonus.html || ''}</div></div>`;
  },

  /* ---------- tổng kết ---------- */
  step_sum(el, B, L, r) {
    const words = (L.texts || []).flatMap(t => t.words || []);
    r.goal = r.goal || {};
    el.innerHTML = `${L.review ? `<div class="tb-point"><h3>🔁 学习小结 · ${esc(L.review.zh || 'Tổng kết')}</h3><div class="rich">${L.review.html || ''}</div></div>` : ''}
      <h3>🎯 Tự đánh giá mục tiêu</h3><div class="tb-goals">${(L.goals || []).map((g, i) => `<label class="tb-gl"><input type="checkbox" data-g="${i}" ${r.goal[i] ? 'checked' : ''}> ${this.tri(g)}</label>`).join('')}</div>
      <h3>🆕 ${words.length} từ mới của bài</h3><div class="tb-chipw">${words.map(w => `<span data-say="${esc(w.w)}" title="${esc(w.py + ' · ' + (w.vi || ''))}"><b class="tb-zh">${esc(w.w)}</b> ${esc(w.vi || '')}</span>`).join('')}</div>
      <div class="row"><button class="btn pri" id="tbAdd">➕ Đưa từ mới & ngữ pháp bài này vào lớp ngoại ngữ</button><span class="muted sm">để ôn bằng thẻ, tập viết, nghe chép, trò chơi</span></div>
      <h3>📐 Ngữ pháp đã học</h3><ul>${(L.points || []).map(p => `<li><b class="tb-zh">${esc(p.zh)}</b> — ${esc(p.vi || p.en || '')}</li>`).join('')}</ul>
      <h3>✍️ Ghi chép cuối bài</h3>${this.ta(r, 'end', 'Điều mình nhớ nhất / còn hay sai…', 3)}`;
    $$('[data-g]', el).forEach(c => c.onchange = () => { r.goal[c.dataset.g] = c.checked; this.save(); });
    $('#tbAdd', el).onclick = () => this.vocabDialog(B, [L.n]);
  },

  /* ---------- đưa từ & ngữ pháp vào lớp ngoại ngữ ---------- */
  vocabDialog(B, pre) {
    const zh = Store.list('courses').filter(c => (c.lang || '').startsWith(B.lang?.slice(0, 2) || 'zh'));
    const ready = B.lessons.filter(l => l.texts?.length);
    const inBook = this.cardIds();
    modal({ title: '➕ Đưa từ mới vào lớp ngoại ngữ', wide: true, body: `
      <p class="muted">Mỗi bài thành một “Bài” trong sách <b>${esc(B.title)}</b> của lớp; mỗi 课文 là một “Phần”. Từ đã có sẵn trong lớp (vd từ gói HSK) sẽ không tạo trùng — giữ nguyên tiến độ ôn.</p>
      <label class="lbl">Vào lớp</label><select class="inp" id="tbC">${zh.map(c => `<option value="${c.id}">${c.flag} ${esc(c.name)}</option>`).join('')}<option value="__new" ${zh.length ? '' : 'selected'}>＋ Tạo lớp mới “Tiếng Trung”</option></select>
      <div class="mn-grid">${ready.map(l => { const tot = (l.texts || []).reduce((s, t) => s + (t.words || []).length, 0), got = (l.texts || []).flatMap((t, ti) => (t.words || []).map((_, wi) => `tb-${B.id}-${l.n}-${ti}-${wi}`)).filter(id => inBook.has(id)).length; return `<label class="mn-l ${got === tot ? 'done' : ''}"><input type="checkbox" value="${l.n}" ${(pre ? pre.includes(l.n) : got < tot) ? 'checked' : ''}><b>第${l.n}课</b><span class="mn-jp">${esc(l.zh)}</span><i>${got === tot ? '✓ đã có' : got ? `${got}/${tot}` : tot + ' từ'}</i></label>`; }).join('')}</div>`,
      actions: [{ label: 'Đưa vào lớp', cls: 'pri', onClick: w => {
        let cid = $('#tbC', w).value;
        if (cid === '__new') { const c = { id: uid(), name: 'Tiếng Trung', lang: B.lang || 'zh-CN', flag: '🇨🇳', color: '#ffb3b3', native: 'vi' }; Store.upsert('courses', c); cid = c.id; }
        const nums = $$('.mn-grid input', w).filter(b => b.checked).map(b => +b.value);
        const res = this.toCourse(B, cid, nums);
        toast(`✓ ${res.added} thẻ mới · ${res.g} điểm ngữ pháp${res.dup ? ` · ${res.dup} từ đã có sẵn` : ''}`, 'ok', 5000);
        return true;
      } }] });
  },
  cardIds() { return new Set(Store.list('cards').map(c => c.id)); },
  toCourse(B, cid, nums) {
    let book = Store.list('tbooks').find(b => b.courseId === cid && b.src === 'tb-' + B.id);
    if (!book) { book = { id: uid(), courseId: cid, src: 'tb-' + B.id, tb: B.id, title: B.title, units: [] }; Store.list('tbooks').push(book); }
    const ids = this.cardIds(), have = new Set(Store.list('cards').filter(c => c.courseId === cid).map(c => c.word));
    const gids = new Set(Store.list('grammar').map(g => g.id));
    const fresh = [], now = Date.now(); let g = 0, dup = 0;
    nums.sort((a, b) => a - b).forEach(n => {
      const L = this.lesson(B, n); if (!L?.texts) return;
      let u = book.units.find(x => x.tn === n);
      const parts = L.texts.map((_, i) => `课文${i + 1}`);
      if (!u) { u = { id: uid(), tn: n, title: `第${n}课 ${L.zh}`, sub: L.vi || L.en || '', parts }; book.units.push(u); }
      L.texts.forEach((T, ti) => (T.words || []).forEach((w, wi) => {
        const id = `tb-${B.id}-${n}-${ti}-${wi}`; if (ids.has(id)) return;
        if (have.has(w.w)) { dup++; return; }
        have.add(w.w);
        fresh.push({ id, word: w.w, ipa: w.py || '', pos: this.POS[w.pos] || 'other', meaning: w.vi || '', def: w.en || '', usage: [this.POSVI[w.pos], w.hv ? 'Hán Việt: ' + w.hv : '', w.note].filter(Boolean).join(' · '),
          examples: (w.ex || []).map(e => ({ s: e.s, t: e.t || '' })), syn: '', ant: '', coll: w.coll || '', family: '', note: '', tags: [B.short || B.title, `Bài ${n}`], source: `${B.title} · 第${n}课 · 课文${ti + 1}`, part: `课文${ti + 1}`,
          courseId: cid, bookId: book.id, unitId: u.id, created: now + fresh.length });
      }));
      (L.points || []).forEach((p, j) => {
        const id = `tb-${B.id}-g${n}-${j}`; if (gids.has(id)) return;
        Store.list('grammar').push({ id, courseId: cid, bookId: book.id, unitId: u.id, title: `${p.zh} — ${p.vi || p.en || ''}`, form: p.form || '', content: `${p.html || ''}${p.ex?.length ? `<h3>Ví dụ</h3><ul>${p.ex.map(e => `<li>${esc(e.zh || e.s)}${e.py ? ` <i>${esc(e.py)}</i>` : ''}${(e.vi || e.t) ? ` — ${esc(e.vi || e.t)}` : ''}</li>`).join('')}</ul>` : ''}`, created: now + j }); g++;
      });
    });
    book.units.sort((a, b) => (a.tn ?? 99) - (b.tn ?? 99));
    Store.data.cards = [...Store.list('cards'), ...fresh];
    Store.save('tbooks'); Store.save('cards'); Store.save('grammar'); Store.flush();
    return { added: fresh.length, g, dup };
  }
};
