/* =========================================================
   THẺ CỨNG ĐẦU (leech): thẻ quên ≥ 3 lần.
   Thường ~10% số thẻ ngốn phần lớn thời gian ôn → chữa riêng:
   mẹo nhớ, so với từ dễ nhầm (tìm trong chính thẻ của bạn), luyện tới khi đúng 2 lần liền.
   ========================================================= */
Object.assign(Lang, {
  LEECH: 3,
  leeches(c, sc) { return this.cardsIn(c.id, sc).filter(x => (x.lapses || 0) >= this.LEECH).sort((a, b) => (b.lapses || 0) - (a.lapses || 0)); },
  leechBanner(c, sc) {
    const L = this.leeches(c, sc); if (!L.length) return '';
    const lastFail = x => Math.max(0, ...(x.history || []).filter(h => h[1] < 3).map(h => h[0]));
    const todo = L.filter(x => !x.leechFix || lastFail(x) > x.leechFix);   // chưa chữa, hoặc chữa rồi mà lại quên
    return `<div class="lc-bar"><span class="lc-ic">🐛</span><div><b>${L.length} thẻ cứng đầu</b> — quên từ ${this.LEECH} lần trở lên${todo.length ? ` · ${todo.length} thẻ cần chữa` : ' · đã chữa hết, giỏi lắm!'}<br><span class="muted sm">Chữa riêng bằng mẹo nhớ, so với từ dễ nhầm và luyện tới khi nhớ.</span></div><button class="btn" id="lcGo">Chữa thẻ cứng đầu →</button></div>`;
  },
  /* từ dễ nhầm: tìm trong thẻ của lớp — giống cách đọc, chung chữ Hán, hoặc cùng nghĩa */
  confusables(c, x) {
    const read = s => (s || '').replace(/[［］\[\]（）()～~・\s]/g, '');
    const han = s => new Set([...(s || '')].filter(ch => /[㐀-鿿]/.test(ch)));
    const xh = han(x.word), xr = read(x.ipa || x.word), xm = (x.meaning || '').toLowerCase().split(/[,;，、]/).map(s => s.trim()).filter(s => s.length > 1);
    return Store.list('cards').filter(y => y.courseId === c.id && y.id !== x.id).map(y => {
      let s = 0, why = [];
      const yr = read(y.ipa || y.word);
      if (xr && yr && xr.length >= 2) { const p = similarity(xr, yr); if (p >= 70 && p < 100) { s += p; why.push('đọc gần giống'); } else if (p === 100) { s += 120; why.push('cùng cách đọc'); } }
      const shared = [...han(y.word)].filter(ch => xh.has(ch)); if (shared.length) { s += 60 + 10 * shared.length; why.push('chung chữ ' + shared.join('')); }
      const ym = (y.meaning || '').toLowerCase(); if (xm.some(m => ym.includes(m))) { s += 70; why.push('nghĩa gần nhau'); }
      return { y, s, why };
    }).filter(o => o.s >= 70).sort((a, b) => b.s - a.s).slice(0, 4);
  },
  leechClinic(el, c, sc, back) {
    const list = this.leeches(c, sc);
    let q = list.map(x => ({ x, need: 2 })), fixed = 0;
    const draw = () => {
      if (!q.length) {
        el.innerHTML = `<div class="empty big">${Art.creature('prof', { size: 110, mood: 'star' })}<h2>Đã chữa ${fixed} thẻ cứng đầu 🐛→🦋</h2><p>Các thẻ này vẫn theo lịch ôn như cũ. Lần sau gặp lại, hãy nhớ tới mẹo nhớ vừa xem nhé.</p><button class="btn pri" id="lcBack">← Quay lại</button></div>`;
        if (fixed) Sfx.jingle(); $('#lcBack', el).onclick = back; return;
      }
      const it = q[0], x = it.x, conf = this.confusables(c, x);
      el.innerHTML = `<div class="gs-head"><button class="btn sm" id="lcQuit">← Thoát</button><span class="grow"></span><span class="muted">Còn ${q.length} thẻ · đã chữa ${fixed}</span></div>
        <div class="lc-card">
          <div class="lc-main"><div class="kicker">🐛 Quên ${x.lapses || 0} lần</div>
            <div class="lc-word">${rubyWord(x, c)} <button class="vc-say" data-say="${esc(x.word)}">🔊</button></div>${x.ipa && x.ipa !== x.word ? `<div class="muted">${esc(x.ipa)}</div>` : ''}
            <div class="lc-mean">${esc(x.meaning || x.def || '')}</div>
            ${(x.examples || []).slice(0, 2).map(e => `<div class="vc-ex">“${esc(e.s)}”${e.t ? `<br><small class="muted">${esc(e.t)}</small>` : ''}</div>`).join('')}
            <div class="lc-mn">${x.note ? `💡 ${esc(x.note)}` : '<span class="muted">Chưa có mẹo nhớ.</span>'}</div>
            <div class="row"><button class="btn sm" id="lcMn">✦ ${x.note ? 'Mẹo nhớ khác' : 'Tạo mẹo nhớ'} (AI)</button>${conf.length ? '<button class="btn sm" id="lcCmp">✦ AI giải thích chỗ khác nhau</button>' : ''}</div><div id="lcAI"></div></div>
          <div class="lc-side"><b>Từ dễ nhầm trong thẻ của bạn</b>${conf.length ? conf.map(o => `<div class="lc-cf"><div><b>${esc(o.y.word)}</b> <small>${esc(o.y.ipa && o.y.ipa !== o.y.word ? o.y.ipa : '')}</small></div><div>${esc(o.y.meaning || '')}</div><small class="muted">${esc(o.why.join(' · '))}</small></div>`).join('') : '<p class="muted sm">Không thấy từ nào dễ nhầm — có lẽ chỉ cần một mẹo nhớ tốt.</p>'}</div>
        </div>
        <div class="lc-drill"><div class="lc-ask">Che thẻ lại và gõ từ có nghĩa <b>“${esc(x.meaning || x.def || '')}”</b> <span class="muted">(cần đúng ${it.need} lần nữa)</span></div>
          <div class="row"><input class="inp big-word" id="lcIn" autocomplete="off" placeholder="Gõ từ…"><button class="btn pri" id="lcOk">Kiểm tra ↵</button></div><div id="lcRes"></div></div>`;
      $('#lcQuit', el).onclick = back;
      $$('[data-say]', el).forEach(b => b.onclick = () => Speech.speak(b.dataset.say, c.lang));
      const card = $('.lc-main', el);
      $('#lcIn', el).onfocus = () => card.classList.add('hide');
      $('#lcMn', el).onclick = async e => {
        const o = await AI.withSpinner(e.currentTarget, () => AI.json({ maxTokens: 500, prompt: `Người Việt học ${c.name} cứ quên từ "${x.word}"${x.ipa ? ` (đọc "${x.ipa}")` : ''} nghĩa "${x.meaning}" (đã quên ${x.lapses} lần). Tạo một mẹo nhớ MỚI, thật dễ hình dung: dùng phương pháp từ khoá (một từ/cụm tiếng Việt nghe giống cách đọc ghép với nghĩa thành hình ảnh vui)${hasKanji(x.word) ? ', thêm mẹo theo bộ thủ/hình chữ' : ''}. Ngắn gọn 1–2 câu. ${x.note ? `Khác với mẹo cũ: "${x.note}".` : ''} Trả về JSON {"mnemonic":""}` }));
        if (o?.mnemonic) { x.note = o.mnemonic; Store.save('cards'); $('.lc-mn', el).innerHTML = '💡 ' + esc(x.note); }
      };
      $('#lcCmp', el) && ($('#lcCmp', el).onclick = async e => {
        const o = await AI.withSpinner(e.currentTarget, () => AI.json({ maxTokens: 900, prompt: `Người Việt học ${c.name} hay nhầm từ "${x.word}" (${x.meaning}) với: ${conf.map(o => `"${o.y.word}" (${o.y.meaning})`).join(', ')}. Giải thích ngắn gọn bằng tiếng Việt chỗ khác nhau (nghĩa, cách đọc, chữ, cách dùng) và một mẹo phân biệt dễ nhớ; mỗi từ kèm một câu ví dụ ngắn có dịch. Trả về JSON {"html":"nội dung, dùng <p>, <b>, <ul><li> đơn giản"}` }));
        if (o?.html) $('#lcAI', el).innerHTML = `<div class="lc-ai">${o.html.replace(/<(?!\/?(p|b|ul|li|i|br)\b)[^>]*>/gi, '')}</div>`;
      });
      const inp = $('#lcIn', el);
      const check = () => {
        const v = inp.value.trim(); if (!v) return;
        const ok = answerOk(v, x) || judgeCard(v, x).near;
        card.classList.remove('hide');
        if (ok) {
          it.need--; Speech.speak(x.word, c.lang);
          $('#lcRes', el).innerHTML = `<b class="ok">✓ Đúng!</b> ${it.need ? 'Thẻ sẽ hỏi lại sau một lượt nữa.' : 'Đã chữa xong thẻ này.'}`;
          q.shift(); if (it.need > 0) q.splice(Math.min(2, q.length), 0, it); else { x.leechFix = Date.now(); Store.save('cards'); fixed++; Lang.track(c.id, 'leechFix'); }
        } else {
          it.need = 2; $('#lcRes', el).innerHTML = `<b class="bad">✗</b> Đáp án: <b>${esc(x.word)}</b> ${esc(x.ipa || '')} — xem lại thẻ và mẹo nhớ, rồi thử lại.`;
          q.shift(); q.splice(Math.min(1, q.length), 0, it);
        }
        inp.disabled = true; $('#lcOk', el).textContent = 'Tiếp →'; $('#lcOk', el).onclick = draw;
        inp.onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); draw(); } };
        setTimeout(() => $('#lcOk', el)?.focus(), 50);
      };
      $('#lcOk', el).onclick = check;
      inp.onkeydown = e => { if (e.key === 'Enter') { e.stopPropagation(); check(); } };
    };
    draw();
  }
});
