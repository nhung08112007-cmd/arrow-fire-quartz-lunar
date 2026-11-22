/* =========================================================
   LỚP NGOẠI NGỮ 3
   · Voice: nhận dạng giọng nói + ghi âm để nghe lại
   · Chấm nói: so từng chữ, điểm, AI nhận xét phát âm
   · Tab "Nghe & nói": Chép chính tả · Video · Nhại & chấm nói
   · Tab "Bài tập AI": AI ra đề từ chính từ vựng bạn đã học, chấm & chữa từng câu
   ========================================================= */
const Voice = {
  SR: window.SpeechRecognition || window.webkitSpeechRecognition,
  lastErr: '',
  /* nghe một lượt: trả về {alts:[{t,conf}], url} (url = bản ghi âm để nghe lại) */
  listen(lang) {
    return new Promise(async resolve => {
      let rec = null, chunks = [], stream = null, url = null, alts = null, done = false;
      const finish = () => {
        if (done || alts === null || (rec && url === null)) return;
        done = true; stream && stream.getTracks().forEach(t => t.stop()); resolve({ alts, url });
      };
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        rec = new MediaRecorder(stream);
        rec.ondataavailable = e => chunks.push(e.data);
        rec.onstop = () => { url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })); finish(); };
        rec.start();
      } catch (e) { rec = null; }
      this.lastErr = '';
      if (!this.SR) { setTimeout(() => { alts = []; rec ? rec.stop() : finish(); }, 5000); return; }
      const r = new this.SR(); r.lang = lang; r.maxAlternatives = 5; r.interimResults = false;
      r.onresult = ev => { alts = [...ev.results[0]].map(a => ({ t: a.transcript, conf: a.confidence || 0 })); };
      r.onerror = ev => { this.lastErr = ev.error; };
      r.onend = () => { if (alts === null) alts = []; setTimeout(() => { if (rec && rec.state !== 'inactive') rec.stop(); else finish(); }, 250); };
      try { r.start(); } catch (e) { alts = []; rec ? rec.stop() : finish(); }
    });
  }
};

Object.assign(Lang, {
  /* ---------- chấm nói ---------- */
  speakScore(alts, targets) {
    let best = { pct: 0, alt: alts[0] || { t: '', conf: 0 }, target: targets[0] || '' };
    alts.forEach(a => targets.flatMap(ansForms).forEach(t => {
      const p = normAns(a.t) === normAns(t) ? 100 : similarity(a.t, t);
      if (p > best.pct) best = { pct: p, alt: a, target: t };
    }));
    return best;
  },
  speakDiff(heard, target, c) {
    if (isJa(c) || !/\s/.test(target.trim())) return charDiff(heard, target);
    const got = new Set(heard.split(/\s+/).map(normAns));
    return target.split(/\s+/).map(w => `<span class="${!normAns(w) || got.has(normAns(w)) ? 'd-ok' : 'd-bad'}">${esc(w)}</span>`).join(' ');
  },
  /* khung luyện nói dùng chung: tg = { text, forms[], tr, note } · onScore(pct) */
  speakPanel(box, c, tg, onScore) {
    const has = !!Voice.SR;
    box.innerHTML = `<div class="sp-panel">
      <div class="row center"><button class="btn" data-a="model">🔊 Nghe mẫu</button><button class="btn" data-a="slow">🐢 Chậm</button>
        <button class="btn pri big" data-a="mic">🎙 Bấm rồi nói</button></div>
      ${has ? '' : '<p class="muted sm center">Trình duyệt này chưa nhận dạng được giọng nói (nên dùng Chrome hoặc Edge). Bạn vẫn ghi âm được để tự so với giọng mẫu.</p>'}
      <div class="sp-res" data-r></div></div>`;
    const res = $('[data-r]', box), mic = $('[data-a="mic"]', box);
    $('[data-a="model"]', box).onclick = () => Speech.speak(tg.text, c.lang, .9);
    $('[data-a="slow"]', box).onclick = () => Speech.speak(tg.text, c.lang, .6);
    mic.onclick = async () => {
      Speech.stop(); mic.disabled = true; mic.textContent = has ? '👂 Đang nghe… nói đi' : '⏺ Đang ghi 5 giây…'; mic.classList.add('rec');
      const { alts, url } = await Voice.listen(c.lang);
      mic.disabled = false; mic.textContent = '🎙 Nói lại'; mic.classList.remove('rec');
      const audio = url ? `<button class="btn sm" data-a="me">▶ Giọng mình</button><audio data-au src="${url}"></audio>` : '';
      if (!alts.length) {
        res.innerHTML = has ? `<p class="bad">Máy chưa nghe rõ${Voice.lastErr ? ' (' + esc(Voice.lastErr) + ')' : ''}. Thử nói to, gần micro hơn.</p><div class="row center">${audio}</div>` : `<div class="row center">${audio}<button class="btn sm" data-a="model2">🔊 Mẫu</button></div><p class="muted sm center">Nghe xen kẽ giọng mình và giọng mẫu để tự so.</p>`;
      } else {
        const sc = this.speakScore(alts, tg.forms && tg.forms.length ? tg.forms : [tg.text]);
        const pct = sc.pct, conf = Math.round((sc.alt.conf || 0) * 100);
        const verdict = pct >= 90 ? ['ok', 'Rất rõ! Máy nghe đúng hết.'] : pct >= 75 ? ['near', 'Khá tốt — vài âm chưa chuẩn (chữ đỏ).'] : pct >= 50 ? ['bad', 'Cần luyện thêm: nghe mẫu chậm rồi nhại lại từng cụm.'] : ['bad', 'Máy chưa nghe ra câu này. Nghe mẫu thật kỹ rồi thử lại.'];
        res.innerHTML = `<div class="d-res"><div class="d-score ${pct >= 75 ? 'good' : ''}">${pct}%</div><div>
          <div class="${verdict[0]}"><b>${verdict[1]}</b></div>
          <div class="d-ans">${this.speakDiff(sc.alt.t, tg.text, c)}</div>
          <div class="muted sm">Máy nghe được: <b>${esc(sc.alt.t)}</b>${conf ? ` · độ chắc ${conf}%` : ''}${alts.length > 1 ? ` · phương án khác: ${alts.slice(1, 3).map(a => esc(a.t)).join(' / ')}` : ''}</div>
          <div class="row">${audio}<button class="btn sm" data-a="model2">🔊 Mẫu</button><button class="btn sm" data-a="ai">✦ AI nhận xét phát âm</button></div><div data-ai></div></div></div>`;
        if (pct >= 80) this.track(c.id, 'speakOk');
        Activity.add('dictation');
        onScore && onScore(pct, sc);
        $('[data-a="ai"]', res).onclick = async ev => {
          const b = ev.target; b.disabled = true; b.textContent = '✦ Đang nghe lại…';
          try {
            const o = await AI.json({ prompt: `Học viên người Việt luyện phát âm ${c.name} (${c.lang}).\nCâu/từ mẫu: "${tg.text}"${tg.note ? ` (${tg.note})` : ''}.\nMáy nhận dạng giọng nói nghe được (các phương án, kèm độ tin cậy): ${alts.map(a => `"${a.t}" (${Math.round((a.conf || 0) * 100)}%)`).join(', ')}.\nĐiểm khớp: ${pct}%.\nTừ chỗ máy nghe sai lệch, hãy suy ra các âm/từ học viên có thể phát âm chưa chuẩn và chỉ cách sửa cụ thể cho người Việt (khẩu hình, độ dài nguyên âm, âm cuối, trọng âm, ngữ điệu, âm dài/ngắn, âm ngắt…). Nếu đã khớp tốt thì khen và gợi ý luyện ngữ điệu tự nhiên hơn.\nTrả về JSON {"summary":"nhận xét chung 1-2 câu","issues":[{"word":"từ/cụm","heard":"máy nghe thành","tip":"cách sửa"}],"drill":"cụm ngắn nên nhại lại 3 lần"}` , maxTokens: 900 });
            $('[data-ai]', res).innerHTML = `<div class="ai-fb"><b>${esc(o.summary || '')}</b>${(o.issues || []).length ? `<ul>${o.issues.map(i => `<li><b>${esc(i.word || '')}</b>${i.heard ? ` → máy nghe “${esc(i.heard)}”` : ''}: ${esc(i.tip || '')}</li>`).join('')}</ul>` : ''}${o.drill ? `<div>🔁 Nhại lại: <b>${esc(o.drill)}</b> <button class="btn sm" data-a="drill">🔊</button></div>` : ''}</div>`;
            const d = $('[data-a="drill"]', res); d && (d.onclick = () => Speech.speak(o.drill, c.lang, .8));
          } catch (er) { $('[data-ai]', res).innerHTML = `<p class="bad">AI chưa trả lời được: ${esc(er.message || er)}</p>`; }
          b.remove();
        };
      }
      const me = $('[data-a="me"]', res); me && (me.onclick = () => $('[data-au]', res).play());
      const m2 = $('[data-a="model2"]', res); m2 && (m2.onclick = () => Speech.speak(tg.text, c.lang, .9));
    };
  },

  /* ---------- tab NGHE & NÓI ---------- */
  listenSpeak(el, c, sc) {
    const SUBS = [['dict', '✍️ Nghe chép chính tả'], ['video', '🎬 Nghe chép video'], ['shadow', '🎙 Nhại & chấm nói']];
    const cur = this._ls || 'dict';
    el.innerHTML = `<div class="seg fill ls-sub">${SUBS.map(s => `<button data-s="${s[0]}" class="${cur === s[0] ? 'on' : ''}">${s[1]}</button>`).join('')}</div><div id="lsBody"></div>`;
    $$('.ls-sub button', el).forEach(b => b.onclick = () => { this._ls = b.dataset.s; Speech.stop(); this.listenSpeak(el, c, sc); });
    const body = $('#lsBody', el);
    if (cur === 'video') return this.videos(body, c);
    if (cur === 'shadow') return this.shadow(body, c, sc);
    return this.dictation(body, c, sc);
  },

  /* nhại theo (shadowing) và chấm nói */
  shadow(el, c, sc) {
    const cs = this.cardsIn(c.id, sc);
    let src = this._shSrc || 'sent', hide = !!this._shHide, list = [], i = 0, scores = [];
    el.innerHTML = `<div class="sh-top">
        <div class="seg fill" id="shSrc">${[['word', 'Từ đơn'], ['sent', 'Câu ví dụ'], ['custom', 'Đoạn tự nhập']].map(s => `<button data-s="${s[0]}" class="${src === s[0] ? 'on' : ''}">${s[1]}</button>`).join('')}</div>
        <label class="sh-hide"><input type="checkbox" id="shHide" ${hide ? 'checked' : ''}> Ẩn chữ, chỉ nghe rồi nhại</label>
        <button class="btn pri" id="shGo">▶ Bắt đầu</button></div>
      <textarea class="inp" id="shCustom" rows="3" ${src === 'custom' ? '' : 'hidden'} placeholder="Dán đoạn văn, app tách thành từng câu để nhại…"></textarea>
      <div id="shStage"><div class="empty">${Art.creature('note', { size: 96, mood: 'joy' })}<p><b>Nhại theo (shadowing):</b> nghe câu mẫu → nói lại ngay, bắt chước cả nhịp và ngữ điệu. Máy chấm từng chữ, bạn nghe lại được giọng mình để so với giọng mẫu.</p></div></div>`;
    $$('#shSrc button', el).forEach(b => b.onclick = () => { src = this._shSrc = b.dataset.s; $$('#shSrc button', el).forEach(x => x.classList.toggle('on', x === b)); $('#shCustom', el).hidden = src !== 'custom'; });
    $('#shHide', el).onchange = e => { hide = this._shHide = e.target.checked; };
    $('#shGo', el).onclick = () => {
      if (src === 'word') list = shuffle(cs).slice(0, 20).map(x => ({ text: x.word, forms: cardForms(x), tr: x.meaning, note: x.ipa }));
      if (src === 'sent') list = shuffle(cs.flatMap(x => (x.examples || []).filter(e => e.s && e.t !== '(câu của tôi)').map(e => ({ text: e.s, forms: [e.s], tr: e.t })))).slice(0, 15);
      if (src === 'custom') list = ($('#shCustom', el).value.match(/[^.!?。！？]+[.!?。！？]?/g) || []).map(s => s.trim()).filter(Boolean).map(s => ({ text: s, forms: [s] }));
      if (!list.length) return toast('Không có nội dung để nhại trong phạm vi này', 'err');
      i = 0; scores = []; draw();
    };
    const draw = () => {
      const st = $('#shStage', el);
      if (i >= list.length) {
        const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        st.innerHTML = `<div class="empty big">${Art.creature('note', { size: 110, mood: 'star' })}<h2>Xong ${list.length} câu!</h2><p>Điểm nói trung bình: <b>${avg}%</b>${scores.length < list.length ? ` (đã chấm ${scores.length} câu)` : ''}</p><button class="btn pri" id="shAgain">Luyện lượt mới</button></div>`;
        $('#shAgain', st).onclick = () => $('#shGo', el).click(); return;
      }
      const tg = list[i];
      st.innerHTML = `<div class="d-card sh-card"><div class="d-top"><span>Câu ${i + 1}/${list.length}</span><span class="grow"></span><button class="btn sm" id="shShow" ${hide ? '' : 'hidden'}>👁 Hiện chữ</button></div>
        <div class="sh-text ${hide ? 'blur' : ''}">${esc(tg.text)}</div>${tg.note && tg.note !== tg.text ? `<div class="muted">${esc(tg.note)}</div>` : ''}${tg.tr ? `<div class="muted sh-tr">${esc(tg.tr)}</div>` : ''}
        <div id="shPanel"></div><div class="row"><button class="btn" id="shPrev" ${i ? '' : 'disabled'}>‹ Câu trước</button><span class="grow"></span><button class="btn pri" id="shNext">Câu sau ›</button></div></div>`;
      $('#shShow', st).onclick = () => { $('.sh-text', st).classList.remove('blur'); $('#shShow', st).remove(); };
      let scored = false;
      this.speakPanel($('#shPanel', st), c, tg, pct => { if (!scored) { scores.push(pct); scored = true; } else scores[scores.length - 1] = Math.max(scores[scores.length - 1], pct); $('.sh-text', st).classList.remove('blur'); });
      setTimeout(() => Speech.speak(tg.text, c.lang, .9), 250);
      $('#shPrev', st).onclick = () => { i--; draw(); };
      $('#shNext', st).onclick = () => { i++; draw(); };
    };
  },

  /* ---------- tab BÀI TẬP AI ---------- */
  EX_TYPES: [
    ['tr_to', '🔁 Dịch Việt → đích'], ['tr_from', '🔁 Dịch đích → Việt'], ['fill', '✍️ Điền từ'],
    ['sentence', '🧩 Đặt câu với từ'], ['reading', '📖 Đọc hiểu'], ['write', '📝 Viết đoạn ngắn']
  ],
  aiExercises(el, c, sc) {
    const S = Store.settings();
    S.exTypes = S.exTypes || ['tr_to', 'fill', 'sentence', 'reading'];
    S.exN = S.exN || 8;
    const pool = this.cardsIn(c.id, sc), seen = pool.filter(x => x.seen);
    const hist = Store.list('aiex').filter(h => h.courseId === c.id).slice(0, 6);
    el.innerHTML = `<div class="ax-setup">
      <div class="ax-intro">${Art.creature('prof', { size: 84 })}<div><h3>Bài tập do AI ra đề, chấm & chữa</h3>
        <p class="muted">Đề được tạo từ <b>chính những từ bạn đã học</b> trong phạm vi đang chọn (${seen.length ? `${seen.length} từ đã học` : `chưa học từ nào, sẽ dùng ${Math.min(pool.length, 40)} từ trong phạm vi`}). Làm xong từng câu là AI chấm điểm, sửa lỗi và giải thích. Từ nào làm sai sẽ được đưa lên ôn sớm.</p></div></div>
      <label class="lbl">Dạng bài</label>
      <div class="seg fill" id="axTypes">${this.EX_TYPES.map(t => `<button data-t="${t[0]}" class="${S.exTypes.includes(t[0]) ? 'on' : ''}">${t[1].replace('đích', esc(c.name.replace(/\s*(N\d|A\d|B\d|C\d).*$/i, '')))}</button>`).join('')}</div>
      <div class="ax-opts"><label>Số câu <select class="inp sm" id="axN">${[5, 8, 10, 12].map(n => `<option ${S.exN === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label>Trình độ <input class="inp sm" id="axLv" value="${esc(S.exLevel || (isJa(c) ? 'JLPT N5, ngữ pháp Minna no Nihongo bài 1–25' : 'sơ – trung cấp'))}"></label>
        <label>Chủ đề (tuỳ chọn) <input class="inp sm" id="axTopic" value="${esc(S.exTopic || '')}" placeholder="vd: đi chợ, trường học…"></label>
        <button class="btn pri big" id="axGo">✦ Tạo bài tập</button></div>
      ${hist.length ? `<label class="lbl">Lần làm gần đây</label><div class="ax-hist">${hist.map(h => `<div class="ax-h"><b>${h.score}/${h.max}</b><span>${esc(h.title || 'Bài tập')}</span><small>${new Date(h.at).toLocaleDateString('vi-VN')}</small></div>`).join('')}</div>` : ''}
    </div>`;
    $$('#axTypes button', el).forEach(b => b.onclick = () => { b.classList.toggle('on'); S.exTypes = $$('#axTypes button.on', el).map(x => x.dataset.t); Store.save('settings'); });
    $('#axGo', el).onclick = async () => {
      const types = $$('#axTypes button.on', el).map(x => x.dataset.t);
      if (!types.length) return toast('Chọn ít nhất một dạng bài', 'err');
      if (!pool.length) return toast('Phạm vi này chưa có thẻ từ nào', 'err');
      S.exN = +$('#axN', el).value; S.exLevel = $('#axLv', el).value.trim(); S.exTopic = $('#axTopic', el).value.trim(); Store.save('settings');
      const words = shuffle(seen.length >= 6 ? seen : pool).slice(0, 18);
      const b = $('#axGo', el); b.disabled = true; b.textContent = '✦ AI đang ra đề…';
      try {
        const o = await AI.json({ maxTokens: 6000, prompt: `Bạn là giáo viên ${c.name} cho người Việt. Trình độ học viên: ${S.exLevel || 'sơ cấp'}.${S.exTopic ? ` Chủ đề: ${S.exTopic}.` : ''}
Từ vựng học viên ĐÃ HỌC (ưu tiên dùng, không dùng ngữ pháp/từ quá trình độ): ${words.map(x => `${x.word}${x.ipa && x.ipa !== x.word ? ` (${x.ipa})` : ''} = ${x.meaning}`).join('; ')}.
Soạn ${S.exN} bài tập, trộn đều các dạng: ${types.join(', ')}.
Ý nghĩa dạng: tr_to = dịch câu tiếng Việt sang ${c.name}; tr_from = dịch câu ${c.name} sang tiếng Việt; fill = câu ${c.name} có một chỗ trống ___ cần điền một từ đã học (kèm 4 lựa chọn); sentence = yêu cầu đặt 1 câu ${c.name} có dùng một từ cho trước, theo tình huống cụ thể; reading = đoạn văn ${c.name} 3–5 câu dùng các từ đã học + 1 câu hỏi đọc hiểu (trả lời bằng tiếng Việt hoặc ${c.name}); write = đề viết 2–4 câu ${c.name} theo tình huống.
Mỗi bài: "prompt" là lời yêu cầu bằng tiếng Việt; "text" là câu/đoạn nguồn (nếu có); "options" chỉ cho fill; "answer" là đáp án mẫu tự nhiên; "words" là các từ đã học được dùng.${isJa(c) ? ' Câu tiếng Nhật viết như sách sơ cấp (có dấu cách giữa các cụm), kèm "reading" là cách đọc hiragana của "text" nếu text là tiếng Nhật.' : ''}
Trả về JSON {"title":"tên bộ bài ngắn","exercises":[{"type":"","prompt":"","text":"","reading":"","options":[],"answer":"","words":[]}]}` });
        const ex = (o.exercises || []).filter(e => e && e.type && (e.prompt || e.text));
        if (!ex.length) throw new Error('AI không trả về bài tập nào');
        this.axRun(el, c, sc, { title: o.title || 'Bài tập', ex, words });
      } catch (er) { toast('AI chưa ra đề được: ' + (er.message || er), 'err'); b.disabled = false; b.textContent = '✦ Tạo bài tập'; }
    };
  },
  axRun(el, c, sc, set) {
    let i = 0; const results = [];
    const typeName = t => (this.EX_TYPES.find(x => x[0] === t) || [, '✦ Bài tập'])[1];
    const draw = () => {
      if (i >= set.ex.length) return finish();
      const e = set.ex[i];
      el.innerHTML = `<div class="ax-run"><div class="ss-top"><div class="ss-bar"><i style="width:${i / set.ex.length * 100}%"></i></div><span>Câu ${i + 1}/${set.ex.length}</span><button class="btn sm" id="axEnd">Kết thúc</button></div>
        <div class="rv-q ax-q"><span class="mode-tag">${typeName(e.type)}</span>
          <div class="ax-prompt">${esc(e.prompt || '')}</div>
          ${e.text ? `<div class="ax-text">${esc(e.text)} <button class="btn sm" id="axSay">🔊</button></div>${e.reading && e.reading !== e.text ? `<div class="muted sm">${esc(e.reading)}</div>` : ''}` : ''}
          ${e.type === 'fill' && (e.options || []).length ? `<div class="quiz-opts" id="axOpts">${e.options.map(o => `<button>${esc(o)}</button>`).join('')}</div>` : `<textarea class="inp ax-in" id="axIn" rows="${['reading', 'write'].includes(e.type) ? 4 : 2}" placeholder="Câu trả lời của bạn… (Ctrl+Enter để nộp)"></textarea>`}
          <div class="row"><button class="btn pri" id="axCheck">Nộp & chấm</button><button class="btn" id="axSkip">Bỏ qua</button><button class="btn" id="axHint">💡 Xem đáp án mẫu</button></div>
          <div id="axRes"></div></div></div>`;
      $('#axEnd', el).onclick = finish;
      $('#axSay', el) && ($('#axSay', el).onclick = () => Speech.speak(e.text, c.lang, .9));
      $('#axSkip', el).onclick = () => { results.push({ e, score: 0, skipped: true }); i++; draw(); };
      $('#axHint', el).onclick = () => { $('#axRes', el).innerHTML = `<div class="ai-fb">Đáp án mẫu: <b>${esc(e.answer || '')}</b></div>`; };
      let picked = '';
      $$('#axOpts button', el).forEach(b => b.onclick = () => { picked = b.textContent; $$('#axOpts button', el).forEach(x => x.classList.toggle('on', x === b)); });
      const inp = $('#axIn', el); inp && inp.focus();
      inp && (inp.onkeydown = ev => { if (ev.key === 'Enter' && ev.ctrlKey) { ev.preventDefault(); $('#axCheck', el).click(); } });
      $('#axCheck', el).onclick = async () => {
        const ans = inp ? inp.value.trim() : picked;
        if (!ans) return toast('Bạn chưa trả lời', 'err');
        const btn = $('#axCheck', el); btn.disabled = true; btn.textContent = '✦ AI đang chấm…';
        let g;
        if (e.type === 'fill' && !inp) {
          const ok = normAns(ans) === normAns(e.answer);
          g = { score: ok ? 10 : 0, verdict: ok ? 'đúng' : 'sai', corrected: e.answer, model: e.answer, errors: ok ? [] : [{ part: ans, fix: e.answer, why: '' }] };
        }
        try {
          if (!g || g.score < 10) {
            const o = await AI.json({ maxTokens: 1200, prompt: `Chấm bài tập ${c.name} của học viên người Việt (trình độ: ${Store.settings().exLevel || 'sơ cấp'}).
Dạng: ${e.type}. Yêu cầu: "${e.prompt || ''}". Nguồn: "${e.text || ''}". Đáp án mẫu: "${e.answer || ''}".
Bài làm của học viên: "${ans}".
Chấm công bằng: chấp nhận mọi cách diễn đạt đúng nghĩa và đúng ngữ pháp, không bắt buộc giống đáp án mẫu. Chỉ ra từng lỗi (ngữ pháp, trợ từ/giới từ, chia động từ, từ vựng, chính tả, sắc thái) và giải thích ngắn bằng tiếng Việt.
Trả về JSON {"score":0-10,"verdict":"đúng|gần đúng|sai","corrected":"bài của học viên sau khi sửa tối thiểu","model":"một đáp án tự nhiên","errors":[{"part":"đoạn sai","fix":"sửa thành","why":"giải thích"}],"tip":"một lời khuyên ngắn"}` });
            g = { ...(g || {}), ...o };
          }
        } catch (er) {
          if (!g) { btn.disabled = false; btn.textContent = 'Nộp & chấm'; $('#axRes', el).innerHTML = `<p class="bad">AI chưa chấm được: ${esc(er.message || er)}. Thử lại, hoặc bấm “Xem đáp án mẫu” để tự so.</p>`; return; }
        }
        const sc10 = Math.max(0, Math.min(10, Math.round(+g.score || 0)));
        results.push({ e, ans, score: sc10, g });
        // từ dùng trong câu làm sai → đưa lên ôn sớm
        if (sc10 < 7) (e.words || []).forEach(w => { const x = set.words.find(y => normAns(y.word) === normAns(w) || normAns(y.ipa || '') === normAns(w)); if (x && x.seen) { x.due = Math.min(x.due || Date.now(), Date.now()); } });
        Store.save('cards');
        $('#axRes', el).innerHTML = `<div class="ax-grade ${sc10 >= 8 ? 'good' : sc10 >= 5 ? 'mid' : 'bad'}"><div class="d-score ${sc10 >= 8 ? 'good' : ''}">${sc10}/10</div><div>
          <b>${esc(g.verdict || '')}</b>
          ${g.corrected && normAns(g.corrected) !== normAns(ans) ? `<div>✎ Sửa: <b>${esc(g.corrected)}</b></div>` : ''}
          ${(g.errors || []).length ? `<ul class="ax-errs">${g.errors.map(x => `<li><s>${esc(x.part || '')}</s> → <b>${esc(x.fix || '')}</b>${x.why ? ` — ${esc(x.why)}` : ''}</li>`).join('')}</ul>` : ''}
          ${g.model ? `<div class="muted">Cách nói tự nhiên: <b>${esc(g.model)}</b> <button class="btn sm" id="axSayM">🔊</button></div>` : ''}
          ${g.tip ? `<div class="muted sm">💡 ${esc(g.tip)}</div>` : ''}</div></div>
          <div class="row"><button class="btn pri" id="axNext">Câu tiếp ›</button></div>`;
        $('#axSayM', el) && ($('#axSayM', el).onclick = () => Speech.speak(g.model, c.lang, .9));
        btn.remove(); $('#axNext', el).onclick = () => { i++; draw(); }; $('#axNext', el).focus();
        Activity.add('tutor'); this.track(c.id, 'correct', sc10 >= 8 ? 1 : 0);
      };
    };
    const finish = () => {
      const done = results.filter(r => !r.skipped), total = done.reduce((s, r) => s + r.score, 0);
      Store.list('aiex').unshift({ id: uid(), courseId: c.id, at: Date.now(), title: set.title, score: total, max: results.length * 10, items: results.map(r => ({ type: r.e.type, prompt: r.e.prompt, text: r.e.text, ans: r.ans || '', score: r.score, corrected: r.g?.corrected || '', errors: r.g?.errors || [] })) });
      Store.data.aiex = Store.list('aiex').slice(0, 60); Store.save('aiex');
      const errs = done.flatMap(r => (r.g?.errors || []).map(x => ({ ...x, q: r.e.text || r.e.prompt })));
      el.innerHTML = `<div class="ss-end">${Art.creature('prof', { size: 110, mood: 'star' })}<h2>${esc(set.title)}</h2>
        <div class="st-big"><div><b>${total}/${results.length * 10}</b><span>điểm</span></div><div><b>${done.filter(r => r.score >= 8).length}</b><span>câu tốt</span></div><div><b>${errs.length}</b><span>lỗi đã chữa</span></div></div>
        ${errs.length ? `<div class="ax-sum"><h3>Sổ lỗi lần này</h3><ul class="ax-errs">${errs.map(x => `<li><s>${esc(x.part || '')}</s> → <b>${esc(x.fix || '')}</b>${x.why ? ` — ${esc(x.why)}` : ''}</li>`).join('')}</ul><p class="muted sm">Các từ xuất hiện trong câu làm sai đã được đưa lên ôn sớm ở tab Học & ôn.</p></div>` : '<p class="ok">Không có lỗi nào, xuất sắc!</p>'}
        <div class="row center"><button class="btn pri" id="axNew">✦ Làm bộ mới</button></div></div>`;
      $('#axNew', el).onclick = () => this.aiExercises(el, c, sc);
      Sfx.jingle();
    };
    draw();
  }
});
