/* =========================================================
   ĐỌC THEO VỐN TỪ: tô màu từ đã thuộc / đang học / chưa học trong bài đọc,
   bấm từ để xem nghĩa, bôi đen từ lạ để tra & thêm thẻ.
   ========================================================= */
Object.assign(Lang, {
  RM_CJK: /[぀-ヿ㐀-鿿々ー]/,
  /* từ điển các dạng viết của thẻ trong lớp: chữ, cách đọc (bỏ ngoặc, dấu ～) */
  vocabIndex(c) {
    const cjk = isJa(c) || /^zh/.test(c.lang || '');
    const map = new Map(); let maxLen = 1;
    const rank = x => !x.seen ? 1 : (x.interval || 0) >= 21 ? 3 : 2;
    Store.list('cards').filter(x => x.courseId === c.id).forEach(x => {
      const forms = new Set();
      const add = f => {
        f = (f || '').replace(/［[^］]*］|\[[^\]]*\]|（[^）]*）|\([^)]*\)|【[^】]*】|[～~〜・\s]/g, '').trim();
        if (!f) return;
        if (cjk) { if (/^[぀-ヿー]+$/.test(f) && f.length < 2) return; }   // kana 1 chữ (は, を…) dễ khớp nhầm
        else f = f.toLowerCase();
        forms.add(f);
        if (cjk && isJa(c) && /ます$/.test(f) && f.length >= 4) forms.add(f.slice(0, -2));   // gốc động từ: たべます → たべ (khớp cả たべました, たべません…)
      };
      add(x.word); (x.ipa || '').split(/[\/／,、]/).forEach(r => cjk && add(r));
      forms.forEach(f => { const old = map.get(f); if (!old || rank(x) > rank(old)) map.set(f, x); maxLen = Math.max(maxLen, f.length); });
    });
    return { map, maxLen: Math.min(maxLen, 10), cjk };
  },
  /* trả về HTML đã tô màu + thống kê độ phủ */
  vocabMarkup(c, text) {
    const { map, maxLen, cjk } = this.vocabIndex(c);
    const cls = x => !x.seen ? 'k-new' : (x.interval || 0) >= 21 ? 'k-mat' : 'k-lrn';
    let html = '', known = 0, total = 0;
    const span = (t, x) => `<span class="rk ${cls(x)}" data-id="${x.id}">${esc(t)}</span>`;
    if (cjk) {
      let i = 0;
      while (i < text.length) {
        const ch = text[i];
        if (!this.RM_CJK.test(ch)) { html += ch === '\n' ? '<br>' : esc(ch); i++; continue; }
        let hit = null;
        for (let L = Math.min(maxLen, text.length - i); L >= 1; L--) { const x = map.get(text.slice(i, i + L)); if (x) { hit = [L, x]; break; } }
        if (hit) { html += span(text.slice(i, i + hit[0]), hit[1]); total += hit[0]; if (hit[1].seen) known += hit[0]; i += hit[0]; }
        else { html += esc(ch); if (!/[\u3040-\u309f]/.test(ch)) total++; i++; }   // hiragana lẻ (trợ từ, đuôi chia) không tính là từ lạ
      }
    } else {
      text.split(/(\s+|[.,!?;:"“”()«»—–-])/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { html += tok.includes('\n') ? '<br>' : ' '; return; }
        const w = tok.toLowerCase().replace(/^['’]+|['’]+$/g, '');
        if (!/\p{L}/u.test(w)) { html += esc(tok); return; }
        total++;
        const x = map.get(w) || map.get(w.replace(/(es|s|ed|ing)$/, '')) || map.get(w.replace(/s$/, ''));
        if (x) { html += span(tok, x); if (x.seen) known++; } else html += `<span class="rk-u">${esc(tok)}</span>`;
      });
    }
    return { html, pct: total ? Math.round(known / total * 100) : 0 };
  },
  /* gắn tương tác lên khung bài đọc */
  bindMarkup(box, c, P) {
    box.addEventListener('click', e => {
      const t = e.target.closest('.rk'), u = e.target.closest('.rk-u');
      if (t) { const x = Store.find('cards', t.dataset.id); if (x) this.rkPop(t, c, x); return; }
      if (u) this.rkAdd(u, c, u.textContent, P);
    });
    box.addEventListener('mouseup', () => setTimeout(() => {
      const s = getSelection(), t = (s?.toString() || '').trim();
      if (!t || t.length > 20 || !box.contains(s.anchorNode)) return;
      const r = s.getRangeAt(0).getBoundingClientRect();
      this.rkAdd({ getBoundingClientRect: () => r }, c, t, P);
    }, 10));
  },
  rkClose() { document.querySelector('.rk-pop')?.remove(); },
  rkAt(anchor, html) {
    this.rkClose();
    const r = anchor.getBoundingClientRect(), d = document.createElement('div');
    d.className = 'rk-pop'; d.innerHTML = html; document.body.appendChild(d);
    const w = d.offsetWidth;
    d.style.left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    d.style.top = (r.bottom + 8 + scrollY) + 'px';
    setTimeout(() => document.addEventListener('mousedown', function f(e) { if (!d.contains(e.target)) { d.remove(); document.removeEventListener('mousedown', f); } }), 0);
    return d;
  },
  rkPop(anchor, c, x) {
    const st = !x.seen ? 'chưa học' : (x.interval || 0) >= 21 ? 'đã thuộc lâu' : 'đang học';
    const d = this.rkAt(anchor, `<div class="rk-w">${esc(x.word)} <small>${esc(x.ipa && x.ipa !== x.word ? x.ipa : '')}</small></div><div>${esc(x.meaning || x.def || '')}</div>
      <div class="rk-st">${st}${x.lapses ? ` · quên ${x.lapses} lần` : ''}</div><div class="row"><button class="btn sm" data-a="say">🔊</button>${!x.seen ? '<button class="btn sm pri" data-a="learn">Học từ này sớm</button>' : ''}</div>`);
    d.onclick = e => {
      const a = e.target.dataset.a;
      if (a === 'say') Speech.speak(x.word, c.lang);
      if (a === 'learn') { const all = Store.list('cards'); const i = all.indexOf(x); if (i > 0) { all.splice(i, 1); const first = all.findIndex(y => y.courseId === c.id && !y.seen); all.splice(first < 0 ? all.length : first, 0, x); Store.save('cards'); } toast('Đã đưa “' + x.word + '” lên đầu hàng thẻ mới'); this.rkClose(); }
    };
  },
  rkAdd(anchor, c, word, P) {
    word = word.trim(); if (!word) return;
    const sent = (P.text.split(/(?<=[。．.!?！？\n])/).find(s => s.includes(word)) || '').trim();
    const d = this.rkAt(anchor, `<div class="rk-w">${esc(word)}</div><div class="muted sm">Từ chưa có trong thẻ của lớp</div>
      <div class="row"><button class="btn sm" data-a="say">🔊</button><button class="btn sm" data-a="tr">Tra nghĩa</button><button class="btn sm pri" data-a="add">＋ Thêm thẻ</button></div><div class="rk-tr"></div>`);
    d.onclick = async e => {
      const a = e.target.dataset.a;
      if (a === 'say') Speech.speak(word, c.lang);
      if (a === 'tr') { e.target.disabled = true; try { $('.rk-tr', d).textContent = await Dict.translate(word, (c.lang || 'en').slice(0, 2)); } catch (_) { $('.rk-tr', d).textContent = 'Không tra được (mất mạng?)'; } }
      if (a === 'add') { this.rkClose(); this.cardForm(c, this.scope[c.id] || {}, null, () => toast('Đã thêm thẻ — tải lại bài đọc để thấy tô màu'), { word, sentence: sent }); Lang.track(c.id, 'mined'); }
    };
  }
});
