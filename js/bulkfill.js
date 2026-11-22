/* =========================================================
   ✦ AI ĐIỀN Ô TRỐNG HÀNG LOẠT cho thẻ từ
   Quét các thẻ trong phạm vi, tìm ô còn trống (cách đọc, từ loại, định nghĩa,
   lưu ý dùng, ví dụ, đồng/trái nghĩa, cụm đi kèm, họ từ, mẹo nhớ…),
   gửi AI theo từng nhóm nhỏ và CHỈ điền vào ô trống — không ghi đè nội dung bạn đã có.
   ========================================================= */
Object.assign(Lang, {
  FILL_FIELDS: [
    ['ipa', 'Cách đọc / phiên âm'], ['pos', 'Từ loại'], ['meaning', 'Nghĩa tiếng Việt'], ['def', 'Định nghĩa (ngôn ngữ đích / Anh)'],
    ['usage', 'Lưu ý cách dùng'], ['examples', 'Câu ví dụ (đủ 3 câu)'], ['syn', 'Đồng nghĩa'], ['ant', 'Trái nghĩa'],
    ['coll', 'Cụm đi kèm'], ['family', 'Họ từ'], ['note', 'Mẹo nhớ']
  ],
  emptyOf(x, f) {
    if (f === 'examples') return (x.examples || []).filter(e => e.s && e.t !== '(câu của tôi)').length < 3;
    return !String(x[f] || '').trim();
  },
  bulkFill(c, sc, after) {
    const cards = this.cardsIn(c.id, sc);
    const S = Store.settings();
    const picked = new Set(S.fillFields || ['ipa', 'pos', 'def', 'usage', 'examples', 'syn', 'ant', 'coll', 'family', 'note']);
    const count = f => cards.filter(x => this.emptyOf(x, f)).length;
    let running = false, stop = false;
    modal({
      title: '✦ AI điền ô trống hàng loạt', wide: true, body: `
        <p class="muted">Phạm vi đang chọn có <b>${cards.length}</b> thẻ. Chọn những ô muốn AI điền. AI <b>chỉ điền ô còn trống</b>, không sửa nội dung bạn đã có. Mỗi lần gửi 6 thẻ.</p>
        <div class="bf-grid">${this.FILL_FIELDS.map(([f, n]) => { const k = count(f); return `<label class="bf-f ${k ? '' : 'full'}"><input type="checkbox" value="${f}" ${picked.has(f) && k ? 'checked' : ''} ${k ? '' : 'disabled'}><span>${n}</span><b>${k ? `${k} thẻ trống` : 'đã đủ'}</b></label>`; }).join('')}</div>
        <div class="bf-prog" id="bfProg" hidden><div class="ss-bar"><i id="bfBar"></i></div><span id="bfTxt"></span></div>
        <div class="bf-log" id="bfLog"></div>`,
      actions: [{ label: 'Dừng', cls: '', onClick: () => { if (running) { stop = true; return false; } } },
        { label: '✦ Bắt đầu điền', cls: 'pri', onClick: async w => {
          if (running) return false;
          const fields = $$('.bf-grid input:checked', w).map(i => i.value);
          if (!fields.length) { toast('Chọn ít nhất một ô', 'err'); return false; }
          S.fillFields = fields; Store.save('settings');
          const todo = cards.filter(x => fields.some(f => this.emptyOf(x, f)));
          if (!todo.length) { toast('Không còn ô trống nào cần điền 👍', 'ok'); return false; }
          running = true; stop = false;
          const btn = $$('.modal-foot .btn', w)[1]; btn.disabled = true; btn.textContent = '✦ Đang điền…';
          $('#bfProg', w).hidden = false;
          let done = 0, filled = 0, fails = 0;
          const log = m => { const d = $('#bfLog', w); d.insertAdjacentHTML('afterbegin', `<div>${m}</div>`); };
          for (let i = 0; i < todo.length && !stop; i += 6) {
            const chunk = todo.slice(i, i + 6);
            $('#bfTxt', w).textContent = `Đang điền thẻ ${i + 1}–${Math.min(i + 6, todo.length)} / ${todo.length}…`;
            const ask = chunk.map(x => {
              const need = fields.filter(f => this.emptyOf(x, f));
              return { id: x.id, word: x.word, reading: x.ipa || '', meaning: x.meaning || '', pos: x.pos || '', examples: (x.examples || []).filter(e => e.s).map(e => e.s), need };
            });
            try {
              const o = await AI.json({ maxTokens: 7000, prompt: `Ngôn ngữ: ${c.name} (${c.lang}). Người học là người Việt${isJa(c) ? ', trình độ sơ cấp (JLPT N5)' : ''}.
Với từng thẻ dưới đây, CHỈ điền các trường trong "need" (giữ nguyên thông tin đã có, dùng chúng làm ngữ cảnh):
${JSON.stringify(ask)}
Quy ước trường:
- ipa: ${isJa(c) ? 'cách đọc hiragana (katakana nếu là từ ngoại lai)' : 'phiên âm IPA'}
- pos: một trong ${POS.join(', ')}
- meaning: nghĩa tiếng Việt ngắn gọn
- def: định nghĩa ngắn ${isJa(c) ? 'bằng tiếng Anh' : 'bằng chính ngôn ngữ đó'}
- usage: lưu ý cách dùng bằng tiếng Việt (ngữ vực, trợ từ/giới từ đi kèm, chia động từ, lỗi hay gặp)
- examples: mảng câu ví dụ MỚI {"s":"câu","t":"dịch tiếng Việt"} sao cho tổng số câu ví dụ của thẻ đạt 3; câu tự nhiên, đúng trình độ${isJa(c) ? ', viết như sách sơ cấp (có dấu cách giữa các cụm)' : ''}
- syn, ant: đồng nghĩa / trái nghĩa, ngăn bằng dấu phẩy (để "" nếu thật sự không có)
- coll: 2–4 cụm đi kèm phổ biến, ngăn bằng " · "
- family: họ từ / từ cùng gốc (để "" nếu không có)
- note: mẹo nhớ tiếng Việt kiểu từ khoá (âm gần giống + hình ảnh vui), 1 câu
Trả về JSON {"cards":[{"id":"…", …chỉ các trường trong need…}]}` });
              (o.cards || []).forEach(r => {
                const x = chunk.find(y => y.id === r.id); if (!x) return;
                let n = 0;
                fields.forEach(f => {
                  if (!this.emptyOf(x, f) || r[f] == null) return;
                  if (f === 'examples') {
                    const add = (Array.isArray(r.examples) ? r.examples : []).filter(e => e && e.s).map(e => ({ s: String(e.s).trim(), t: String(e.t || '').trim(), ai: true }));
                    const have = new Set((x.examples || []).map(e => normAns(e.s)));
                    const fresh = add.filter(e => !have.has(normAns(e.s)));
                    if (fresh.length) { x.examples = [...(x.examples || []), ...fresh].slice(0, Math.max(3, (x.examples || []).length)); n++; }
                  } else if (f === 'pos') { if (POS.includes(r.pos)) { x.pos = r.pos; n++; } }
                  else { const v = String(r[f] || '').trim(); if (v) { x[f] = v; n++; } }
                });
                if (n) { filled += n; x.updated = Date.now(); }
              });
              Store.save('cards');
              log(`✓ ${chunk.map(x => esc(x.word)).join(', ')}`);
            } catch (er) {
              fails++; log(`<span class="bad">✗ ${chunk.map(x => esc(x.word)).join(', ')} — ${esc(er.message || er)}</span>`);
              if (fails >= 3) { log('<b class="bad">AI lỗi liên tiếp 3 lần, tạm dừng. Thử lại sau hoặc đổi nhà cung cấp AI trong Cài đặt.</b>'); break; }
            }
            done = Math.min(todo.length, i + 6);
            $('#bfBar', w).style.width = (done / todo.length * 100) + '%';
          }
          Store.flush();
          $('#bfTxt', w).textContent = `${stop ? 'Đã dừng' : 'Xong'}: điền ${filled} ô trên ${done} thẻ.`;
          $$('.bf-f', w).forEach(l => { const inp = $('input', l), k = count(inp.value); $('b', l).textContent = k ? `${k} thẻ trống` : 'đã đủ'; l.classList.toggle('full', !k); if (!k) { inp.checked = false; inp.disabled = true; } });
          btn.disabled = false; btn.textContent = '✦ Điền tiếp phần còn trống'; running = false;
          after && after();
          return false;
        } }]
    });
  }
});
