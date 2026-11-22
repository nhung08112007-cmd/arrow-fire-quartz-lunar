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
  }
});
