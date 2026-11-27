/* =========================================================
   ÔN NGỮ PHÁP THEO LỊCH LẶP LẠI (FSRS, chung thuật toán với thẻ từ)
   Mỗi điểm ngữ pháp có lịch ôn riêng (g.srs). Câu hỏi tạo tự động từ câu ví dụ:
   đục lỗ đúng phần cấu trúc (lấy từ công thức), chọn 1 trong 4 đáp án.
   ========================================================= */
const CJK_RE = /[぀-ヿ㐀-鿿々ー]+/g;
const PARTICLES = {
  ja: ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'から', 'まで', 'や', 'か', 'ね', 'よ', 'より', 'までに', 'でも'],
  zh: ['了', '过', '着', '的', '得', '地', '把', '被', '比', '就', '才', '还', '都', '也', '在', '给', '跟', '对', '从', '离']
};
Object.assign(Lang, {
  /* các cụm chữ Nhật/Trung trong công thức: 「N1 は N2 じゃ（では）ありません」 → は, じゃ, では, ありません */
  gramTokens(g) {
    const t = new Set();
    ((g.form || '') + ' ' + (g.title || '').split(/[–—]/)[0]).match(CJK_RE)?.forEach(x => {
      x.split(/[・]/).forEach(y => { if (y) t.add(y); });
    });
    return [...t];
  },
  /* lấy câu ví dụ từ nội dung HTML của điểm ngữ pháp */
  gramExamples(g) {
    const d = document.createElement('div'); d.innerHTML = g.content || '';
    const out = [];
    $$('li', d).forEach(li => {
      const t = li.querySelector('i')?.textContent.trim() || '';
      const s = li.textContent.replace(t, '').replace(/\s*[—–-]\s*$/, '').trim();
      if (s && CJK_RE.test(s)) out.push({ s, t }); CJK_RE.lastIndex = 0;
    });
    if (!out.length) {   // bài do AI soạn: khối song ngữ
      const L = $$('.bl-l p', d).map(p => p.textContent.trim()), R = $$('.bl-r p', d).map(p => p.textContent.trim());
      L.forEach((s, i) => s && out.push({ s, t: R[i] || '' }));
    }
    return out;
  },
  /* một câu hỏi: đục lỗ cụm cấu trúc dài nhất có trong câu */
  gramItem(g, k = 0) {
    const ex = this.gramExamples(g); if (!ex.length) return null;
    const toks = this.gramTokens(g).sort((a, b) => b.length - a.length);
    for (let i = 0; i < ex.length; i++) {
      const e = ex[(k + i) % ex.length];
      const tk = toks.find(t => e.s.includes(t));
      if (tk) { const at = e.s.lastIndexOf(tk); return { ...e, ans: tk, before: e.s.slice(0, at), after: e.s.slice(at + tk.length) }; }
    }
    return { ...ex[k % ex.length], ans: null };   // không tìm được chỗ đục: lật thẻ tự chấm
  },
  gramChoices(c, g, ans, all) {
    const lc = isJa(c) ? 'ja' : (c.lang || '').startsWith('zh') ? 'zh' : '';
    const ok = x => x !== ans && !ans.includes(x) && !x.includes(ans);
    const fit = x => Math.abs(x.length - ans.length) <= 1;
    // ưu tiên: cấu trúc cùng bài + trợ từ hay gặp (dễ nhầm thật), rồi mới tới các bài khác
    const near = [...new Set([...all.filter(x => x.id !== g.id && x.unitId === g.unitId).flatMap(x => this.gramTokens(x)), ...(PARTICLES[lc] || [])])].filter(ok);
    const far = [...new Set(all.filter(x => x.id !== g.id).flatMap(x => this.gramTokens(x)))].filter(ok);
    const pick = [];
    for (const src of [near.filter(fit), far.filter(fit), near, far]) for (const x of shuffle(src)) { if (pick.length < 3 && !pick.includes(x)) pick.push(x); }
    return shuffle([ans, ...pick]);
  },
  gramState(g) {
    const s = g.srs; if (!s?.seen) return 'new';
    return (s.due || 0) <= Date.now() ? 'due' : (s.interval || 0) >= 21 ? 'mature' : 'learning';
  },
  gramQueue(c, sc) {
    const list = Store.list('grammar').filter(g => g.courseId === c.id && (!sc.bookId || g.bookId === sc.bookId) && (!sc.unitId || g.unitId === sc.unitId));
    const S = Store.settings(), per = S.newGramPerDay ?? 3;
    const due = list.filter(g => this.gramState(g) === 'due');
    const fresh = list.filter(g => !g.srs?.seen && this.gramExamples(g).length).slice(0, Math.max(0, per - this.todayStat(c.id, 'gramNew')));
    return { list, due, fresh };
  },
  gramDueCount(c) { return Store.list('grammar').filter(g => g.courseId === c.id && this.gramState(g) === 'due').length; },

  /* thanh trên cùng của tab Ngữ pháp */
  gramBar(c, sc, el, back) {
    const { list, due, fresh } = this.gramQueue(c, sc);
    const seen = list.filter(g => g.srs?.seen).length, S = Store.settings();
    return `<div class="gs-bar"><div class="gs-ic">🔁</div><div class="gs-txt"><b>${due.length + fresh.length ? `Ôn ngữ pháp: ${due.length} điểm đến hạn · ${fresh.length} điểm mới` : 'Đã ôn xong ngữ pháp hôm nay 🎉'}</b>
      <span class="muted">Đang nhớ ${seen}/${list.length} điểm · điểm mới mỗi ngày <input type="number" min="0" max="20" class="inp sm" id="gsNew" value="${S.newGramPerDay ?? 3}" style="width:56px"></span></div>
      ${due.length + fresh.length ? `<button class="btn pri" id="gsGo">▶ Ôn ngữ pháp</button>` : ''}</div>`;
  },
  bindGramBar(c, sc, el, rerender) {
    $('#gsNew', el) && ($('#gsNew', el).onchange = e => { Store.settings().newGramPerDay = Math.max(0, +e.target.value || 0); Store.save('settings'); rerender(); });
    $('#gsGo', el) && ($('#gsGo', el).onclick = () => this.gramReview(el, c, sc, rerender));
  },

  /* phiên ôn ngữ pháp */
  gramReview(el, c, sc, rerender) {
    const { list, due, fresh } = this.gramQueue(c, sc);
    let q = [...shuffle(due), ...fresh.map(g => ({ g, intro: true }))].map(x => x.g ? x : { g: x });
    let done = 0, right = 0;
    const end = () => {
      el.innerHTML = `<div class="empty big">${Art.creature('prof', { size: 110, mood: 'star' })}<h2>Xong buổi ôn ngữ pháp!</h2><p>Đã ôn ${done} lượt · đúng ${right}. Lần ôn tới được xếp tự động theo độ nhớ của bạn.</p><button class="btn pri" id="gsBack">← Về danh sách ngữ pháp</button></div>`;
      if (done) Sfx.jingle();
      $('#gsBack', el).onclick = rerender;
    };
    const head = () => `<div class="gs-head"><button class="btn sm" id="gsQuit">← Thoát</button><span class="grow"></span><span class="muted">Còn ${q.length} · đã ôn ${done}</span></div>`;
    const show = () => {
      if (!q.length) return end();
      const { g, intro } = q[0];
      const quit = () => $('#gsQuit', el).onclick = rerender;
      if (intro) {   // điểm mới: đọc giải thích trước
        el.innerHTML = head() + `<div class="gs-card"><div class="kicker">Điểm ngữ pháp mới</div><div class="gc-title">${esc(g.title)}</div>${g.form ? `<div class="gc-form">${esc(g.form)}</div>` : ''}<div class="gs-body rich">${g.content || ''}</div>
          <div class="row" style="justify-content:flex-end"><button class="btn pri" id="gsOk">Đã hiểu, thử ngay →</button></div></div>`;
        quit(); $('#gsOk', el).onclick = () => { q[0] = { g }; Lang.track(c.id, 'gramNew'); show(); };
        return;
      }
      g.srs = g.srs || {};
      const it = this.gramItem(g, g.srs.k || 0);
      if (!it) { q.shift(); return show(); }
      const btns = `<div class="rv-grade">${[[0, 'Quên', 'again'], [3, 'Khó', 'hard'], [4, 'Được', 'good'], [5, 'Dễ', 'easy']].map(([v, l, k]) => `<button class="g-${k}" data-q="${v}"><b>${l}</b><small>${SRS.preview(g.srs, v).label}</small></button>`).join('')}</div>`;
      const reveal = ok => {
        $('.gs-after', el).hidden = false;
        $(ok === false ? '.g-again' : ok ? '.g-good' : '.g-good', el)?.classList.add('suggest');
        Speech.speak(it.s, c.lang, .95);
      };
      el.innerHTML = head() + `<div class="gs-card"><div class="kicker">${esc(g.title)}</div>
        ${it.ans ? `<div class="cz-sent gs-sent">${esc(it.before)}<span class="gs-gap" id="gsGap">？</span>${esc(it.after)}</div>
          ${it.t ? `<div class="muted">${esc(it.t)}</div>` : ''}
          <div class="gs-opts">${this.gramChoices(c, g, it.ans, list).map((o, i) => `<button class="btn" data-o="${esc(o)}"><kbd>${i + 1}</kbd> ${esc(o)}</button>`).join('')}</div>`
        : `<div class="gs-sent">${esc(it.t || '')}</div><p class="muted">Nói hoặc viết câu này bằng ${esc(c.name)}, rồi bấm xem đáp án.</p><button class="btn pri" id="gsShow">Xem đáp án</button>`}
        <div class="gs-after" hidden><div class="gs-full">${esc(it.s)}</div>${g.form ? `<div class="gc-form">${esc(g.form)}</div>` : ''}
          <details><summary>Xem lại giải thích</summary><div class="gs-body rich">${g.content || ''}</div></details>${btns}</div></div>`;
      quit();
      let answered = false, ok = null;
      $$('.gs-opts button', el).forEach(b => b.onclick = () => {
        if (answered) return; answered = true; ok = b.dataset.o === it.ans;
        $$('.gs-opts button', el).forEach(x => { x.disabled = true; if (x.dataset.o === it.ans) x.classList.add('ok'); });
        if (!ok) b.classList.add('bad');
        const gap = $('#gsGap', el); gap.textContent = it.ans; gap.classList.add(ok ? 'ok' : 'bad');
        reveal(ok);
      });
      $('#gsShow', el) && ($('#gsShow', el).onclick = e => { e.target.hidden = true; reveal(null); });
      $$('.rv-grade button', el).forEach(b => b.onclick = () => grade(+b.dataset.q));
      const grade = v => {
        SRS.grade(g.srs, v);            // dùng chung FSRS
        g.srs.k = (g.srs.k || 0) + 1;   // lần sau dùng câu ví dụ khác
        Store.save('grammar');
        done++; if (v >= 3) right++;
        Lang.track(c.id, 'grammar', v >= 3 ? 1 : 0);
        q.shift(); if (v === 0) q.push({ g });   // quên: hỏi lại cuối buổi
        show();
      };
      this._gsKey && document.removeEventListener('keydown', this._gsKey);
      this._gsKey = e => {
        if (!el.isConnected) return document.removeEventListener('keydown', this._gsKey);
        if (e.target.matches('input,textarea')) return;
        const n = +e.key;
        if (!answered && n >= 1 && n <= 4) $$('.gs-opts button', el)[n - 1]?.click();
        else if (!$('.gs-after', el)?.hidden && n >= 1 && n <= 4) $$('.rv-grade button', el)[n - 1]?.click();
      };
      document.addEventListener('keydown', this._gsKey);
    };
    show();
  }
});
