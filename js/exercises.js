/* =========================================================
   ✦ BÀI TẬP AI (bản 2)
   · Đề kết hợp TỪ VỰNG + NGỮ PHÁP trong phạm vi đang học
   · Dạng chọn đáp án (từ vựng / ngữ pháp), đúng–sai, điền từ: chấm ngay, có giải thích
   · Dạng tự luận (dịch, đặt câu, viết đoạn): AI chấm & chữa
   · ĐỌC HIỂU: đoạn văn từ nguồn thật (Kho lưu trữ, Wikipedia, tự dán) hoặc bài AI viết theo trình độ,
     câu hỏi chọn đáp án / đúng–sai / trả lời ngắn, đoạn văn hiển thị cạnh câu hỏi
   ========================================================= */
Object.assign(Lang, {
  EX_TYPES: [
    ['mcq_vocab', '🔤 Chọn nghĩa từ vựng'], ['mcq_grammar', '📐 Chọn đáp án ngữ pháp'], ['tf', '✅ Đúng hay sai'], ['fill', '✍️ Điền từ vào câu'],
    ['tr_to', '🔁 Dịch Việt → đích'], ['tr_from', '🔁 Dịch đích → Việt'], ['sentence', '🧩 Đặt câu với từ'], ['write', '📝 Viết đoạn ngắn']
  ],
  LOCAL: ['mcq_vocab', 'mcq_grammar', 'tf', 'fill'],
  langShort(c) { return c.name.replace(/\s*(N\d|A\d|B\d|C\d|HSK\s*\d).*$/i, ''); },

  /* điểm ngữ pháp trong phạm vi: từ tab Ngữ pháp + chủ đề ngữ pháp của từng bài giáo trình */
  async grammarCtx(c, sc) {
    const gs = Store.list('grammar').filter(g => g.courseId === c.id && (!sc.bookId || g.bookId === sc.bookId) && (!sc.unitId || g.unitId === sc.unitId));
    const books = Store.list('tbooks').filter(b => b.courseId === c.id && (!sc.bookId || b.id === sc.bookId));
    if (books.some(b => b.src === 'minna-n5')) { try { await Minna.ensure(); } catch (_) { } }
    const subs = books.flatMap(b => (b.units || []).filter(u => !sc.unitId || u.id === sc.unitId).map(u => {
      const sub = u.sub || (window.MINNA_N5 && u.mn != null ? (MINNA_N5.lessons.find(l => l.n === u.mn) || {}).sub : '');
      return sub ? `${u.title.split('·')[0].trim()}: ${sub}` : '';
    })).filter(Boolean);
    return [...gs.map(g => `${g.title}${g.form ? ` (${g.form.replace(/\s+/g, ' ')})` : ''}`), ...subs].slice(0, 30);
  },
  wordsFor(c, sc, n = 18) {
    const pool = this.cardsIn(c.id, sc), seen = pool.filter(x => x.seen);
    return shuffle(seen.length >= 6 ? seen : pool).slice(0, n);
  },

  aiExercises(el, c, sc) {
    const S = Store.settings();
    S.exTypes = (S.exTypes || []).filter(t => this.EX_TYPES.some(x => x[0] === t));
    if (!S.exTypes.length) S.exTypes = ['mcq_vocab', 'mcq_grammar', 'tf', 'fill', 'tr_to'];
    S.exN = S.exN || 10;
    const pool = this.cardsIn(c.id, sc), seen = pool.filter(x => x.seen);
    const gN = Store.list('grammar').filter(g => g.courseId === c.id && (!sc.bookId || g.bookId === sc.bookId) && (!sc.unitId || g.unitId === sc.unitId)).length;
    const hist = Store.list('aiex').filter(h => h.courseId === c.id).slice(0, 6);
    const L = esc(this.langShort(c));
    el.innerHTML = `<div class="ax-setup">
      <div class="ax-modes">
        <div class="ax-mode"><div class="ax-mh">${Art.creature('prof', { size: 64 })}<div><h3>Bài tập từ vựng + ngữ pháp</h3>
          <p class="muted sm">Đề lấy từ <b>${seen.length ? seen.length + ' từ đã học' : Math.min(pool.length, 40) + ' từ trong phạm vi'}</b> và <b>${gN ? gN + ' điểm ngữ pháp' : 'ngữ pháp của các bài'}</b> trong phạm vi. Câu chọn đáp án chấm ngay; câu tự luận AI chấm & chữa.</p></div></div>
          <div class="seg fill" id="axTypes">${this.EX_TYPES.map(t => `<button data-t="${t[0]}" class="${S.exTypes.includes(t[0]) ? 'on' : ''}">${t[1].replace('đích', L)}</button>`).join('')}</div>
          <div class="ax-opts"><label>Số câu <select class="inp sm" id="axN">${[5, 10, 15, 20].map(n => `<option ${S.exN === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
            <label>Trình độ <input class="inp sm" id="axLv" value="${esc(S.exLevel || (isJa(c) ? 'JLPT N5, ngữ pháp Minna no Nihongo bài 1–25' : 'sơ – trung cấp'))}"></label>
            <label>Chủ đề (tuỳ chọn) <input class="inp sm" id="axTopic" value="${esc(S.exTopic || '')}" placeholder="vd: đi chợ, trường học…"></label>
            <button class="btn pri big" id="axGo">✦ Tạo bài tập</button></div></div>
        <div class="ax-mode rd"><div class="ax-mh">${Art.creature('booky', { size: 64, mood: 'joy' })}<div><h3>📖 Đọc hiểu</h3>
          <p class="muted sm">Đọc một đoạn văn thật rồi trả lời câu hỏi chọn đáp án, đúng–sai, trả lời ngắn. Đoạn văn hiện ngay cạnh câu hỏi.</p></div></div>
          <div class="seg fill" id="rdSrc">${[['ai', '✦ Bài đọc theo trình độ'], ['archive', '🗂 Bài trong Kho lưu trữ'], ['wiki', '🌐 Wikipedia'], ['paste', '📋 Tự dán đoạn văn']].map(s => `<button data-s="${s[0]}" class="${(S.rdSrc || 'ai') === s[0] ? 'on' : ''}">${s[1]}</button>`).join('')}</div>
          <div id="rdOpt"></div>
          <button class="btn pri big" id="rdGo">📖 Tạo bài đọc hiểu</button></div>
      </div>
      ${hist.length ? `<label class="lbl">Lần làm gần đây</label><div class="ax-hist">${hist.map(h => `<div class="ax-h"><b>${h.score}/${h.max}</b><span>${esc(h.title || 'Bài tập')}</span><small>${new Date(h.at).toLocaleDateString('vi-VN')}</small></div>`).join('')}</div>` : ''}
    </div>`;
    $$('#axTypes button', el).forEach(b => b.onclick = () => { b.classList.toggle('on'); S.exTypes = $$('#axTypes button.on', el).map(x => x.dataset.t); Store.save('settings'); });
    // tuỳ chọn nguồn đọc
    const drawRd = () => {
      const src = S.rdSrc || 'ai', arc = Store.list('archive');
      $('#rdOpt', el).innerHTML = src === 'archive' ? (arc.length ? `<select class="inp" id="rdArc">${arc.map(a => `<option value="${a.id}">${esc(a.title || 'Không tiêu đề')}</option>`).join('')}</select><p class="muted sm">Mẹo: dán bài báo ${L} vào Kho lưu trữ (nút “Dán bài báo”) rồi chọn ở đây.</p>` : `<p class="muted sm">Kho lưu trữ chưa có bài nào. Dán một bài báo ${L} vào Kho lưu trữ trước nhé.</p>`)
        : src === 'paste' ? `<textarea class="inp" id="rdTxt" rows="4" placeholder="Dán đoạn văn ${L} (từ sách, báo, trang web…)"></textarea><input class="inp sm" id="rdSrcName" placeholder="Nguồn (tuỳ chọn), vd: NHK Easy, sách giáo khoa…">`
        : `<input class="inp" id="rdTopic" value="${esc(S.rdTopic || '')}" placeholder="${src === 'wiki' ? `Chủ đề tìm trên Wikipedia ${L}, vd: 富士山, Hà Nội… (để trống = bài ngẫu nhiên)` : 'Chủ đề bài đọc (tuỳ chọn), vd: gia đình, mua sắm…'}">${src === 'wiki' ? '<p class="muted sm">Wikipedia viết cho người bản xứ nên thường khó hơn trình độ sơ cấp; app kèm bảng từ khó và câu hỏi bằng tiếng Việt.</p>' : '<p class="muted sm">Bài đọc do AI viết, chỉ dùng từ vựng & ngữ pháp bạn đã học.</p>'}`;
    };
    $$('#rdSrc button', el).forEach(b => b.onclick = () => { S.rdSrc = b.dataset.s; Store.save('settings'); $$('#rdSrc button', el).forEach(x => x.classList.toggle('on', x === b)); drawRd(); });
    drawRd();

    $('#axGo', el).onclick = async () => {
      const types = $$('#axTypes button.on', el).map(x => x.dataset.t);
      if (!types.length) return toast('Chọn ít nhất một dạng bài', 'err');
      if (!pool.length) return toast('Phạm vi này chưa có thẻ từ nào', 'err');
      S.exN = +$('#axN', el).value; S.exLevel = $('#axLv', el).value.trim(); S.exTopic = $('#axTopic', el).value.trim(); Store.save('settings');
      const b = $('#axGo', el); b.disabled = true; b.textContent = '✦ AI đang ra đề…';
      try {
        const words = this.wordsFor(c, sc), gram = await this.grammarCtx(c, sc);
        const o = await AI.json({ maxTokens: 8000, prompt: `Bạn là giáo viên ${c.name} cho người Việt. Trình độ: ${S.exLevel || 'sơ cấp'}.${S.exTopic ? ` Chủ đề: ${S.exTopic}.` : ''}
TỪ VỰNG đã học: ${words.map(x => `${x.word}${x.ipa && x.ipa !== x.word ? ` (${x.ipa})` : ''} = ${x.meaning}`).join('; ')}.
NGỮ PHÁP đã học: ${gram.length ? gram.join('; ') : '(ngữ pháp cơ bản đúng trình độ)'}.
Soạn đúng ${S.exN} câu, trộn đều các dạng: ${types.join(', ')}. Mỗi câu phải dùng TỪ VỰNG và (nếu hợp) NGỮ PHÁP ở trên — kết hợp cả hai, không ra đề ngoài trình độ.
Dạng:
- mcq_vocab: hỏi nghĩa của một từ/cụm ${c.name} (hoặc ngược lại từ nghĩa Việt chọn từ đúng); 4 lựa chọn, nhiễu hợp lý cùng chủ đề.
- mcq_grammar: câu ${c.name} có chỗ trống ___ cần trợ từ / dạng chia / cấu trúc đúng, HOẶC "chọn câu đúng ngữ pháp" với 3–4 câu gần giống nhau (lựa chọn sai là lỗi người học hay mắc).
- tf: một câu ${c.name} — hỏi câu này đúng ngữ pháp/đúng nghĩa với bản dịch không (answer true/false).
- fill: câu ${c.name} có ___ cần điền một từ vựng đã học, 4 lựa chọn.
- tr_to: dịch câu tiếng Việt sang ${c.name}. tr_from: dịch câu ${c.name} sang tiếng Việt. sentence: đặt câu với từ cho trước theo tình huống. write: viết 2–4 câu theo tình huống.
Trường của mỗi câu: "type"; "prompt" = yêu cầu bằng tiếng Việt; "text" = câu/từ được hỏi; "reading" = cách đọc của text nếu là ${isJa(c) ? 'tiếng Nhật (hiragana)' : c.lang.startsWith('zh') ? 'tiếng Trung (pinyin)' : 'ngôn ngữ cần phiên âm, không thì ""'}; "options" = mảng lựa chọn (mcq_vocab, mcq_grammar, fill); "correct" = chỉ số lựa chọn đúng (bắt đầu từ 0); "answer" = đáp án (tf: true/false; tự luận: đáp án mẫu); "explain" = giải thích tiếng Việt vì sao đúng và vì sao các lựa chọn kia sai; "words" = từ vựng dùng; "grammar" = điểm ngữ pháp kiểm tra (nếu có).${isJa(c) ? ' Câu tiếng Nhật viết như sách sơ cấp (có dấu cách giữa các cụm).' : ''}
Trả về JSON {"title":"tên bộ đề ngắn","exercises":[…]}` });
        const ex = (o.exercises || []).filter(e => e && e.type && (e.prompt || e.text));
        if (!ex.length) throw new Error('AI không trả về câu hỏi nào');
        this.axRun(el, c, sc, { title: o.title || 'Bài tập', ex, words });
      } catch (er) { toast('AI chưa ra đề được: ' + (er.message || er), 'err'); b.disabled = false; b.textContent = '✦ Tạo bài tập'; }
    };
    $('#rdGo', el).onclick = () => this.readingStart(el, c, sc);
  },

  /* xáo lựa chọn nhưng giữ đúng đáp án */
  shuffleOpts(e) {
    const opts = (e.options || []).map(String);
    let ci = Number.isInteger(e.correct) ? e.correct : opts.findIndex(o => normAns(o) === normAns(e.answer));
    if (ci < 0 || ci >= opts.length) ci = 0;
    const order = shuffle(opts.map((o, i) => i));
    return { opts: order.map(i => opts[i]), correct: order.indexOf(ci) };
  },
  optsHTML(opts) { return `<div class="ax-opts2">${opts.map((o, i) => `<button class="ax-op" data-i="${i}"><i>${'abcd'[i] || i + 1}.</i><span>${esc(o)}</span></button>`).join('')}</div>`; },

  axRun(el, c, sc, set) {
    let i = 0; const results = [];
    const typeName = t => ((this.EX_TYPES.find(x => x[0] === t) || [, '✦ Bài tập'])[1]).replace('đích', esc(this.langShort(c)));
    const draw = () => {
      if (i >= set.ex.length) return finish();
      this.axKeyOff();
      const e = set.ex[i], local = this.LOCAL.includes(e.type) && (e.type === 'tf' || (e.options || []).length >= 2);
      const sh = local && e.type !== 'tf' ? this.shuffleOpts(e) : null;
      el.innerHTML = `<div class="ax-run"><div class="ss-top"><div class="ss-bar"><i style="width:${i / set.ex.length * 100}%"></i></div><span>Câu ${i + 1}/${set.ex.length}</span><button class="btn sm" id="axEnd">Kết thúc</button></div>
        <div class="rv-q ax-q"><span class="mode-tag">${typeName(e.type)}</span>${e.grammar ? `<span class="tag">📐 ${esc(e.grammar)}</span>` : ''}
          <div class="ax-prompt">${esc(e.prompt || '')}</div>
          ${e.text ? `<div class="ax-text">${esc(e.text)} <button class="btn sm" id="axSay">🔊</button></div>${e.reading && e.reading !== e.text ? `<div class="muted sm">${esc(e.reading)}</div>` : ''}` : ''}
          ${local ? (e.type === 'tf' ? `<div class="ax-opts2 tf"><button class="ax-op" data-i="1"><i>✓</i><span>Đúng</span></button><button class="ax-op" data-i="0"><i>✗</i><span>Sai</span></button></div>` : this.optsHTML(sh.opts))
          : `<textarea class="inp ax-in" id="axIn" rows="${e.type === 'write' ? 4 : 2}" placeholder="Câu trả lời của bạn… (Ctrl+Enter để nộp)"></textarea>
             <div class="row"><button class="btn pri" id="axCheck">Nộp & chấm</button><button class="btn" id="axSkip">Bỏ qua</button><button class="btn" id="axHint">💡 Xem đáp án mẫu</button></div>`}
          <div id="axRes"></div></div></div>`;
      $('#axEnd', el).onclick = finish;
      $('#axSay', el) && ($('#axSay', el).onclick = () => Speech.speak(e.text, c.lang, .9));
      const showNext = () => { const b = $('#axNext', el); b.focus(); b.onclick = () => { i++; draw(); }; };
      if (local) {
        const pick = btn => {
          if (el.querySelector('.ax-op.locked')) return;
          this.axKeyOff();
          const v = +btn.dataset.i;
          const ok = e.type === 'tf' ? (v === 1) === (e.answer === true || String(e.answer).toLowerCase() === 'true' || e.answer === 'đúng') : v === sh.correct;
          $$('.ax-op', el).forEach(b => b.classList.add('locked'));
          btn.classList.add(ok ? 'ok' : 'bad');
          if (!ok) { const right = e.type === 'tf' ? $(`.ax-op[data-i="${v ? 0 : 1}"]`, el) : $(`.ax-op[data-i="${sh.correct}"]`, el); right && right.classList.add('ok'); }
          results.push({ e, ans: btn.textContent.trim(), score: ok ? 10 : 0, g: { verdict: ok ? 'đúng' : 'sai', errors: ok ? [] : [{ part: btn.querySelector('span').textContent, fix: e.type === 'tf' ? (v ? 'Sai' : 'Đúng') : sh.opts[sh.correct], why: e.explain || '' }] } });
          this.penalize(set, e, ok ? 10 : 0);
          $('#axRes', el).innerHTML = `<div class="ax-grade ${ok ? 'good' : 'bad'}"><div class="d-score ${ok ? 'good' : ''}">${ok ? '✓' : '✗'}</div><div><b>${ok ? 'Chính xác!' : 'Chưa đúng'}</b>${e.explain ? `<div>${esc(e.explain)}</div>` : ''}</div></div><div class="row"><button class="btn pri" id="axNext">Câu tiếp ›</button></div>`;
          if (e.text) Speech.speak(e.text, c.lang, .9);
          (ok ? Sfx.beep(988) : Sfx.beep(260, .15)); showNext();
        };
        $$('.ax-op', el).forEach(b => b.onclick = () => pick(b));
        const onKey = ev => { if (!document.body.contains(el) || !el.querySelector('.ax-op')) return this.axKeyOff(); if (ev.target.closest('input,textarea')) return; const n = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 }[ev.key]; const bt = $$('.ax-op', el)[n]; if (bt) pick(bt); };
        this._axKey = onKey; addEventListener('keydown', onKey);
        return;
      }
      $('#axSkip', el).onclick = () => { results.push({ e, score: 0, skipped: true }); i++; draw(); };
      $('#axHint', el).onclick = () => { $('#axRes', el).innerHTML = `<div class="ai-fb">Đáp án mẫu: <b>${esc(e.answer || '')}</b>${e.explain ? `<div>${esc(e.explain)}</div>` : ''}</div>`; };
      const inp = $('#axIn', el); inp.focus();
      inp.onkeydown = ev => { if (ev.key === 'Enter' && ev.ctrlKey) { ev.preventDefault(); $('#axCheck', el).click(); } };
      $('#axCheck', el).onclick = async () => {
        const ans = inp.value.trim(); if (!ans) return toast('Bạn chưa trả lời', 'err');
        const btn = $('#axCheck', el); btn.disabled = true; btn.textContent = '✦ AI đang chấm…';
        let g;
        try {
          g = await AI.json({ maxTokens: 1200, prompt: `Chấm bài tập ${c.name} của học viên người Việt (trình độ: ${Store.settings().exLevel || 'sơ cấp'}).
Dạng: ${e.type}. Yêu cầu: "${e.prompt || ''}". Nguồn: "${e.text || ''}". Đáp án mẫu: "${e.answer || ''}".${e.grammar ? ` Điểm ngữ pháp kiểm tra: ${e.grammar}.` : ''}
Bài làm: "${ans}".
Chấm công bằng: chấp nhận mọi cách diễn đạt đúng nghĩa, đúng ngữ pháp. Chỉ ra từng lỗi (ngữ pháp, trợ từ/giới từ, chia động từ, từ vựng, chính tả, sắc thái), giải thích ngắn bằng tiếng Việt.
Trả về JSON {"score":0-10,"verdict":"đúng|gần đúng|sai","corrected":"bài sau khi sửa tối thiểu","model":"một đáp án tự nhiên","errors":[{"part":"","fix":"","why":""}],"tip":""}` });
        } catch (er) { btn.disabled = false; btn.textContent = 'Nộp & chấm'; $('#axRes', el).innerHTML = `<p class="bad">AI chưa chấm được: ${esc(er.message || er)}. Thử lại, hoặc bấm “Xem đáp án mẫu” để tự so.</p>`; return; }
        const s10 = Math.max(0, Math.min(10, Math.round(+g.score || 0)));
        results.push({ e, ans, score: s10, g }); this.penalize(set, e, s10);
        $('#axRes', el).innerHTML = `<div class="ax-grade ${s10 >= 8 ? 'good' : s10 >= 5 ? 'mid' : 'bad'}"><div class="d-score ${s10 >= 8 ? 'good' : ''}">${s10}/10</div><div>
          <b>${esc(g.verdict || '')}</b>
          ${g.corrected && normAns(g.corrected) !== normAns(ans) ? `<div>✎ Sửa: <b>${esc(g.corrected)}</b></div>` : ''}
          ${(g.errors || []).length ? `<ul class="ax-errs">${g.errors.map(x => `<li><s>${esc(x.part || '')}</s> → <b>${esc(x.fix || '')}</b>${x.why ? ` — ${esc(x.why)}` : ''}</li>`).join('')}</ul>` : ''}
          ${g.model ? `<div class="muted">Cách nói tự nhiên: <b>${esc(g.model)}</b></div>` : ''}${g.tip ? `<div class="muted sm">💡 ${esc(g.tip)}</div>` : ''}</div></div>
          <div class="row"><button class="btn pri" id="axNext">Câu tiếp ›</button></div>`;
        btn.closest('.row').remove(); showNext();
        Activity.add('tutor'); if (s10 >= 8) this.track(c.id, 'correct');
      };
    };
    const finish = () => this.axFinish(el, c, sc, set.title, results);
    draw();
  },
  /* mỗi câu chỉ một bộ nghe phím a/b/c/d — gỡ khi đã trả lời hoặc sang câu khác */
  axKeyOff() { if (this._axKey) { removeEventListener('keydown', this._axKey); this._axKey = null; } },
  /* từ trong câu làm sai → đưa lên ôn sớm */
  penalize(set, e, score) {
    if (score >= 7) return;
    (e.words || []).forEach(w => { const x = (set.words || []).find(y => normAns(y.word) === normAns(w) || normAns(y.ipa || '') === normAns(w)); if (x && x.seen) x.due = Math.min(x.due || Date.now(), Date.now()); });
    Store.save('cards');
  },
  axFinish(el, c, sc, title, results) {
    const done = results.filter(r => !r.skipped), total = done.reduce((s, r) => s + r.score, 0);
    Store.list('aiex').unshift({ id: uid(), courseId: c.id, at: Date.now(), title, score: total, max: results.length * 10, items: results.map(r => ({ type: r.e.type, prompt: r.e.prompt, text: r.e.text, ans: r.ans || '', score: r.score, errors: r.g?.errors || [] })) });
    Store.data.aiex = Store.list('aiex').slice(0, 60); Store.save('aiex');
    const errs = done.flatMap(r => (r.g?.errors || []));
    el.innerHTML = `<div class="ss-end">${Art.creature('prof', { size: 110, mood: 'star' })}<h2>${esc(title)}</h2>
      <div class="st-big"><div><b>${total}/${results.length * 10}</b><span>điểm</span></div><div><b>${done.filter(r => r.score >= 8).length}/${results.length}</b><span>câu đúng / tốt</span></div><div><b>${errs.length}</b><span>lỗi đã chữa</span></div></div>
      ${errs.length ? `<div class="ax-sum"><h3>Sổ lỗi lần này</h3><ul class="ax-errs">${errs.map(x => `<li><s>${esc(x.part || '')}</s> → <b>${esc(x.fix || '')}</b>${x.why ? ` — ${esc(x.why)}` : ''}</li>`).join('')}</ul><p class="muted sm">Các từ trong câu làm sai đã được đưa lên ôn sớm ở tab Học & ôn.</p></div>` : '<p class="ok">Không có lỗi nào, xuất sắc!</p>'}
      <div class="row center"><button class="btn pri" id="axNew">✦ Làm bộ mới</button></div></div>`;
    $('#axNew', el).onclick = () => this.aiExercises(el, c, sc);
    Sfx.jingle();
  },

  /* ---------- ĐỌC HIỂU ---------- */
  async readingStart(el, c, sc) {
    const S = Store.settings(), src = S.rdSrc || 'ai', lc = (c.lang || 'en').slice(0, 2).toLowerCase();
    const btn = $('#rdGo', el); const busy = t => { btn.disabled = true; btn.textContent = t; };
    const fail = m => { toast(m, 'err'); btn.disabled = false; btn.textContent = '📖 Tạo bài đọc hiểu'; };
    let passage = null;
    try {
      if (src === 'paste') {
        const t = ($('#rdTxt', el)?.value || '').trim(); if (t.length < 20) return fail('Dán một đoạn văn dài hơn nhé');
        passage = { title: 'Đoạn văn tự dán', text: t.slice(0, 2500), source: $('#rdSrcName', el)?.value.trim() || 'Bạn tự dán' };
      } else if (src === 'archive') {
        const a = Store.find('archive', $('#rdArc', el)?.value); if (!a) return fail('Chưa chọn bài trong Kho lưu trữ');
        const txt = stripHtml((a.content || '').replace(/<\/(p|h\d|li|div)>/gi, '\n')).replace(/\n{3,}/g, '\n\n').trim();
        passage = { title: a.title || 'Bài trong Kho lưu trữ', text: this.cutText(txt, 1600), source: a.source || a.url || 'Kho lưu trữ của bạn', url: a.url };
      } else if (src === 'wiki') {
        S.rdTopic = ($('#rdTopic', el)?.value || '').trim(); Store.save('settings');
        busy('🌐 Đang lấy bài từ Wikipedia…');
        passage = await this.wiki(lc, S.rdTopic);
      } else {
        S.rdTopic = ($('#rdTopic', el)?.value || '').trim(); Store.save('settings');
        busy('✦ AI đang viết bài đọc…');
        const pool = this.cardsIn(c.id, sc), gram = await this.grammarCtx(c, sc);
        const knownW = shuffle(pool.filter(x => x.seen)).slice(0, 40), newW = pool.filter(x => !x.seen).slice(0, 4);
        const words = knownW.length >= 6 ? knownW : this.wordsFor(c, sc, 15);
        const o = await AI.json({ maxTokens: 2500, prompt: `Viết một bài đọc ${c.name} (6–10 câu) cho người Việt trình độ ${S.exLevel || 'sơ cấp'}${S.rdTopic ? `, chủ đề "${S.rdTopic}"` : ''}, kiểu bài đọc trong sách luyện thi (thư, nhật ký, thông báo, đoạn hội thoại hoặc đoạn kể). Dùng CHỦ YẾU các từ người học đã biết: ${words.map(x => x.word).join(', ')}${newW.length && knownW.length >= 6 ? `; lồng ghép tự nhiên thêm ${newW.length} từ mới sắp học: ${newW.map(x => x.word).join(', ')}` : ''}; ngữ pháp: ${gram.join('; ') || 'cơ bản'}. Hạn chế tối đa từ ngoài danh sách (≈95% từ trong bài phải là từ đã biết).${isJa(c) ? ' Viết như sách sơ cấp (có dấu cách giữa các cụm).' : ''} Trả về JSON {"title":"","text":""}` });
        passage = { title: o.title || 'Bài đọc', text: o.text || '', source: 'Bài đọc do AI viết theo trình độ của bạn' };
      }
      if (!passage || !passage.text) return fail('Không lấy được đoạn văn');
      busy('✦ AI đang soạn câu hỏi…');
      const q = await AI.json({ maxTokens: 4000, prompt: `Đoạn văn ${c.name}:\n"""${passage.text}"""\nNgười học: người Việt, trình độ ${S.exLevel || 'sơ cấp'}.
Soạn bài đọc hiểu kiểu đề thi: 6 câu hỏi, trộn: "mcq" (4 lựa chọn, có một đáp án đúng, nhiễu dựa vào chi tiết trong bài), "tf" (nhận định đúng/sai theo nội dung bài), "short" (trả lời ngắn 1 câu). Hỏi cả ý chính, chi tiết, suy luận, nghĩa của từ trong ngữ cảnh. ${/sơ cấp|N5|N4|A1|A2|HSK ?[12]/i.test(S.exLevel || 'sơ cấp') ? 'Câu hỏi và lựa chọn viết bằng tiếng Việt.' : `Câu hỏi viết bằng ${c.name}.`}
Kèm "glossary": 5–10 từ/cụm khó trong bài {"w":"từ","r":"cách đọc","m":"nghĩa Việt"}.
Mỗi câu: {"type":"mcq|tf|short","q":"câu hỏi","options":[…chỉ mcq],"correct":chỉ số đúng (mcq),"answer":"đáp án (tf: true/false; short: đáp án mẫu)","explain":"giải thích, trích câu trong bài làm căn cứ"}.
Trả về JSON {"glossary":[…],"questions":[…]}` });
      const qs = (q.questions || []).filter(x => x && x.q);
      if (!qs.length) return fail('AI chưa soạn được câu hỏi');
      this.readingRun(el, c, sc, passage, qs, q.glossary || []);
    } catch (er) { fail('Chưa tạo được bài đọc: ' + (er.message || er)); }
  },
  cutText(t, n) { if (t.length <= n) return t; const cut = t.slice(0, n); const k = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('. '), cut.lastIndexOf('\n')); return (k > n * .5 ? cut.slice(0, k + 1) : cut) + ' …'; },
  async wiki(lc, topic) {
    const base = `https://${lc}.wikipedia.org`;
    let page;
    if (topic) {
      const r = await fetch(`${base}/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=${encodeURIComponent(topic)}&gsrlimit=1&prop=extracts&exintro=1&explaintext=1`);
      const j = await r.json(); page = Object.values(j?.query?.pages || {})[0];
      if (!page) throw new Error(`Không tìm thấy bài Wikipedia nào về “${topic}”`);
      page = { title: page.title, extract: page.extract };
    } else {
      const r = await fetch(`${base}/api/rest_v1/page/random/summary`); const j = await r.json();
      page = { title: j.title, extract: j.extract };
    }
    if (!page.extract) throw new Error('Bài Wikipedia này không có đoạn mở đầu');
    return { title: page.title, text: this.cutText(page.extract.trim(), 1200), source: `Wikipedia (${lc}) · CC BY-SA`, url: `${base}/wiki/${encodeURIComponent(page.title)}` };
  },
  readingRun(el, c, sc, P, qs, gl) {
    const sh = qs.map(q => q.type === 'mcq' && (q.options || []).length >= 2 ? this.shuffleOpts(q) : null);
    const mk = this.vocabMarkup(c, P.text);
    el.innerHTML = `<div class="rd-wrap">
      <aside class="rd-pass"><div class="rd-ph"><h3>${esc(P.title)}</h3><button class="btn sm" id="rdSay">🔊 Đọc to</button></div>
        <div class="rk-legend"><span class="rk-cov">Bạn đã học ~<b>${mk.pct}%</b> từ trong bài</span><span class="rk k-mat">thuộc lâu</span><span class="rk k-lrn">đang học</span><span class="rk k-new">có thẻ, chưa học</span><span class="muted sm">· bấm từ để xem nghĩa · bôi đen từ lạ để thêm thẻ</span></div>
        <div class="rd-text">${mk.html}</div>
        <div class="muted sm rd-src">Nguồn: ${P.url ? `<a href="${esc(P.url)}" target="_blank" rel="noopener">${esc(P.source)}</a>` : esc(P.source)}</div>
        ${gl.length ? `<details class="rd-gl"><summary>📒 Từ khó (${gl.length})</summary><ul>${gl.map(g => `<li><b>${esc(g.w || '')}</b>${g.r && g.r !== g.w ? ` <small>${esc(g.r)}</small>` : ''} — ${esc(g.m || '')}</li>`).join('')}</ul></details>` : ''}</aside>
      <section class="rd-qs">${qs.map((q, i) => `<div class="rd-q" data-i="${i}"><div class="rd-qn"><span>問${String(i + 1).padStart(2, '0')}</span><b>${esc(q.q)}</b></div>
        ${q.type === 'mcq' && sh[i] ? this.optsHTML(sh[i].opts) : q.type === 'tf' ? `<div class="ax-opts2 tf"><button class="ax-op" data-i="1"><i>✓</i><span>Đúng</span></button><button class="ax-op" data-i="0"><i>✗</i><span>Sai</span></button></div>` : `<textarea class="inp" rows="2" placeholder="Trả lời ngắn…"></textarea>`}
        <div class="rd-fb"></div></div>`).join('')}
        <div class="row"><button class="btn pri big" id="rdSubmit">Nộp bài</button><button class="btn" id="rdBack">‹ Quay lại</button></div></section></div>`;
    $('#rdSay', el).onclick = () => Speech.speak(P.text, c.lang, .9);
    this.bindMarkup($('.rd-text', el), c, P);
    $('#rdBack', el).onclick = () => this.aiExercises(el, c, sc);
    $$('.rd-q .ax-op', el).forEach(b => b.onclick = () => { if (el.dataset.done) return; $$('.ax-op', b.closest('.rd-q')).forEach(x => x.classList.toggle('on', x === b)); });
    $('#rdSubmit', el).onclick = async () => {
      if (el.dataset.done) return;
      const btn = $('#rdSubmit', el); btn.disabled = true; btn.textContent = '✦ Đang chấm…';
      const res = qs.map(() => ({ score: 0 }));
      const shorts = [];
      qs.forEach((q, i) => {
        const box = $(`.rd-q[data-i="${i}"]`, el), on = $('.ax-op.on', box);
        if (q.type === 'short') { const a = $('textarea', box).value.trim(); shorts.push({ i, q: q.q, model: q.answer, a }); return; }
        if (!on) { res[i] = { score: 0, ans: '(bỏ trống)' }; return; }
        const v = +on.dataset.i;
        const ok = q.type === 'tf' ? (v === 1) === (q.answer === true || String(q.answer).toLowerCase() === 'true' || q.answer === 'đúng') : v === sh[i].correct;
        res[i] = { score: ok ? 10 : 0, ans: on.textContent.trim() };
      });
      if (shorts.some(s => s.a)) {
        try {
          const g = await AI.json({ maxTokens: 1500, prompt: `Chấm các câu trả lời ngắn cho bài đọc hiểu sau.\nĐoạn văn: """${P.text}"""\n${shorts.map(s => `Câu ${s.i + 1}: "${s.q}" · Đáp án mẫu: "${s.model}" · Học viên: "${s.a || '(bỏ trống)'}"`).join('\n')}\nChấm theo ý, không bắt buộc đúng từng chữ; học viên có thể trả lời bằng tiếng Việt hoặc ${c.name}. Trả về JSON {"results":[{"i":số câu (bắt đầu từ 1),"score":0-10,"comment":"nhận xét ngắn tiếng Việt"}]}` });
          (g.results || []).forEach(r => { const s = shorts.find(x => x.i === (+r.i) - 1); if (s) res[s.i] = { score: Math.max(0, Math.min(10, Math.round(+r.score || 0))), ans: s.a, comment: r.comment }; });
        } catch (er) { toast('AI chưa chấm được câu trả lời ngắn — xem đáp án mẫu để tự so', 'err'); }
      }
      shorts.forEach(s => { if (!res[s.i].ans) res[s.i] = { ...res[s.i], ans: s.a || '(bỏ trống)' }; });
      el.dataset.done = 1;
      qs.forEach((q, i) => {
        const box = $(`.rd-q[data-i="${i}"]`, el), r = res[i], ok = r.score >= 8;
        box.classList.add(ok ? 'ok' : r.score >= 5 ? 'mid' : 'bad');
        if (q.type === 'mcq' && sh[i]) { const right = $(`.ax-op[data-i="${sh[i].correct}"]`, box); right && right.classList.add('ok'); const on = $('.ax-op.on', box); on && !ok && on.classList.add('bad'); }
        if (q.type === 'tf') { const t = q.answer === true || String(q.answer).toLowerCase() === 'true' || q.answer === 'đúng'; $(`.ax-op[data-i="${t ? 1 : 0}"]`, box)?.classList.add('ok'); const on = $('.ax-op.on', box); on && !ok && on.classList.add('bad'); }
        $('.rd-fb', box).innerHTML = `<b class="${ok ? 'ok' : 'bad'}">${q.type === 'short' ? r.score + '/10' : ok ? '✓ Đúng' : '✗ Sai'}</b>${r.comment ? ` · ${esc(r.comment)}` : ''}${q.type === 'short' ? `<div>Đáp án mẫu: <b>${esc(q.answer || '')}</b></div>` : ''}${q.explain ? `<div class="muted">${esc(q.explain)}</div>` : ''}`;
      });
      const total = res.reduce((s, r) => s + r.score, 0);
      btn.textContent = `Điểm: ${total}/${qs.length * 10}`;
      Store.list('aiex').unshift({ id: uid(), courseId: c.id, at: Date.now(), title: '📖 ' + P.title, score: total, max: qs.length * 10, items: [] });
      Store.data.aiex = Store.list('aiex').slice(0, 60); Store.save('aiex');
      Activity.add('read'); Sfx.jingle();
      $('#rdBack', el).textContent = '✦ Bài khác';
    };
  }
});
