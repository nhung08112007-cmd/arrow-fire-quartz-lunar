/* =========================================================
   GIÁO TRÌNH CÓ SẴN · Minna no Nihongo I (JLPT N5)
   Biến dữ liệu thô MINNA_N5 thành thẻ đầy đủ: chữ, cách đọc,
   từ loại, nghĩa Việt, nghĩa Anh, ví dụ có dịch, lưu ý dùng, cụm đi kèm.
   Nạp từng bài, không tạo trùng khi nạp lại.
   ========================================================= */
const Minna = {
  POS: { n: 'noun', v1: 'verb', v2: 'verb', v3: 'verb', ai: 'adjective', ana: 'adjective', adv: 'adverb', ex: 'phrase', sf: 'other', pr: 'pronoun', cj: 'conjunction', it: 'interjection', ctr: 'counter', q: 'other', pt: 'particle', num: 'counter' },
  KIND: { v1: 'Động từ nhóm I', v2: 'Động từ nhóm II', v3: 'Động từ nhóm III', ai: 'Tính từ đuôi い', ana: 'Tính từ đuôi な', q: 'Từ để hỏi', sf: 'Hậu tố / tiếp vị ngữ', num: 'Số từ', ctr: 'Trợ số từ (đếm)', pt: 'Trợ từ', pr: 'Đại từ', cj: 'Liên từ', it: 'Thán từ', ex: 'Mẫu câu / cách nói cố định' },
  PART: { v1: 'Động từ', v2: 'Động từ', v3: 'Động từ', ai: 'Tính từ', ana: 'Tính từ', n: 'Danh từ', ex: 'Mẫu câu & hội thoại' },
  PART_ORDER: ['Động từ', 'Tính từ', 'Danh từ', 'Từ khác', 'Mẫu câu & hội thoại'],
  partOf(pos) { return this.PART[pos] || 'Từ khác'; },
  /** tách phần ngữ cảnh ở cuối: すいます［たばこを～］ → base, ctx */
  split(s) {
    const m = (s || '').match(/^(.*?)［([^［］]*～[^［］]*)］$/);
    return m && m[1] ? { base: m[1].trim(), ctx: m[2] } : { base: (s || '').trim(), ctx: '' };
  },
  readings(k) {
    const out = [];
    const add = t => { t = t.trim(); if (t && !out.includes(t)) out.push(t); };
    k.split('／').forEach(part => {
      const paren = part.match(/^(.*?)（(.+?)）$/);
      if (paren) { add(paren[1]); add(paren[2]); return; }
      if (/］$/.test(part)) add(part.replace(/［.*?］/g, ''));   // すき［な］ → すき trước
      add(part.replace(/[［］]/g, ''));
      if (/［.*?］/.test(part)) add(part.replace(/［.*?］/g, ''));
    });
    return out;
  },
  card(row, lesson, i) {
    const [kana, kanji, pos, vi, en, ex, note] = row;
    const k = this.split(kana), j = this.split(kanji);
    const ctx = k.ctx || j.ctx;
    const word = (kanji ? j.base : k.base).replace(/（.*?）/g, '');
    const [s, t] = ex.split('／');
    const tip = /^v/.test(pos) ? (note || '').replace(/^Nhóm I{1,3}\s*·\s*/, '') : note;   // tránh lặp “Nhóm I”
    const usage = [this.KIND[pos], ctx ? `Thường đi với: ［${ctx}］` : '', tip].filter(Boolean).join(' · ');
    return {
      id: `mn5-${lesson.n}-${i}`, word, ipa: this.readings(k.base).join('／'), pos: this.POS[pos] || 'other',
      meaning: vi, def: en, usage, examples: [{ s: s.trim(), t: (t || '').trim() }],
      syn: '', ant: '', coll: ctx ? ctx.replace('～', k.base) : '', family: '', note: '',
      tags: ['JLPT N5', 'Minna', lesson.n ? `Bài ${lesson.n}` : 'Nhập môn'], source: 'Minna no Nihongo I · ' + lesson.title, part: this.partOf(pos)
    };
  },
  have() { const ids = new Set(Store.list('cards').map(c => c.id)); return n => MINNA_N5.lessons.find(l => l.n === n).rows.filter((_, i) => ids.has(`mn5-${n}-${i}`)).length; },

  /** nạp các bài vào lớp cid; trả về số thẻ mới */
  load(cid, nums) {
    let book = Store.list('tbooks').find(b => b.courseId === cid && b.src === 'minna-n5');
    if (!book) { book = { id: uid(), courseId: cid, src: 'minna-n5', title: 'Minna no Nihongo I · N5', units: [] }; Store.list('tbooks').push(book); }
    const ids = new Set(Store.list('cards').map(c => c.id));
    const fresh = []; const now = Date.now();
    nums.sort((a, b) => a - b).forEach(n => {
      const L = MINNA_N5.lessons.find(l => l.n === n); if (!L) return;
      let u = book.units.find(x => x.mn === n);
      const parts = this.PART_ORDER.filter(p => L.rows.some(r => this.partOf(r[2]) === p));
      if (!u) { u = { id: uid(), mn: n, title: `${L.title} · ${L.jp}`, parts }; book.units.push(u); }
      else u.parts = [...new Set([...(u.parts || []), ...parts])];
      L.rows.forEach((r, i) => {
        const c = this.card(r, L, i);
        if (ids.has(c.id)) return;
        fresh.push({ ...c, courseId: cid, bookId: book.id, unitId: u.id, created: now + fresh.length });
      });
    });
    book.units.sort((a, b) => (a.mn ?? 99) - (b.mn ?? 99));
    // thêm vào cuối để phiên học giới thiệu từ mới theo đúng thứ tự bài
    Store.data.cards = [...Store.list('cards'), ...fresh];
    Store.save('tbooks'); Store.save('cards'); Store.flush();
    return { added: fresh.length, book };
  },

  /** dữ liệu (~170KB) chỉ tải khi cần */
  ensure() {
    if (window.MINNA_N5) return Promise.resolve();
    return this._p = this._p || new Promise((ok, no) => { const sc = document.createElement('script'); sc.src = 'js/data/minna-n5.js'; sc.onload = () => { window.MINNA_N5 = MINNA_N5; ok(); }; sc.onerror = () => { this._p = null; no(); }; document.head.appendChild(sc); });
  },
  /** hộp thoại chọn lớp & bài */
  async open(preCid) {
    try { await this.ensure(); } catch (e) { toast('Không tải được dữ liệu giáo trình', 'err'); return; }
    const jaCourses = Store.list('courses').filter(c => isJa(c));
    const has = this.have();
    const L = MINNA_N5.lessons;
    modal({
      title: '📚 Giáo trình Minna no Nihongo I · JLPT N5', wide: true, body: `
        <p class="muted">${MINNA_N5.total.toLocaleString('vi')} thẻ từ, chia theo <b>Bài nhập môn → Bài 25</b>. Mỗi thẻ có: chữ Hán + furigana, cách đọc kana, từ loại (nhóm động từ, loại tính từ), nghĩa tiếng Việt, nghĩa tiếng Anh, câu ví dụ kèm dịch, lưu ý cách dùng và cụm đi kèm. Nạp lại không tạo thẻ trùng.</p>
        <label class="lbl">Nạp vào lớp</label>
        <select class="inp" id="mnCourse">
          ${jaCourses.map(c => `<option value="${c.id}" ${c.id === preCid ? 'selected' : ''}>${c.flag} ${esc(c.name)}</option>`).join('')}
          <option value="__new" ${jaCourses.length ? '' : 'selected'}>＋ Tạo lớp mới “Tiếng Nhật N5”</option>
        </select>
        <div class="row" style="margin:12px 0 6px;justify-content:space-between"><label class="lbl" style="margin:0">Chọn bài</label>
          <span><button class="btn sm" id="mnAll">Chọn hết</button> <button class="btn sm" id="mnNone">Bỏ chọn</button></span></div>
        <div class="mn-grid">${L.map(l => {
          const got = has(l.n), done = got === l.rows.length;
          return `<label class="mn-l ${done ? 'done' : ''}"><input type="checkbox" value="${l.n}" ${done ? '' : 'checked'}>
            <b>${l.title}</b><span class="mn-jp">${esc(l.jp)}</span><small>${esc(l.sub)}</small>
            <i>${done ? '✓ đã có' : got ? `${got}/${l.rows.length}` : l.rows.length + ' từ'}</i></label>`;
        }).join('')}</div>
        <div class="muted" id="mnSum" style="margin-top:8px"></div>`,
      onOpen: w => {
        const boxes = () => $$('.mn-grid input', w);
        const sum = () => { const n = boxes().filter(b => b.checked).reduce((s, b) => s + L.find(l => l.n === +b.value).rows.length, 0); $('#mnSum', w).textContent = `Đã chọn ${boxes().filter(b => b.checked).length} bài · khoảng ${n} thẻ`; };
        boxes().forEach(b => b.onchange = sum);
        $('#mnAll', w).onclick = () => { boxes().forEach(b => b.checked = true); sum(); };
        $('#mnNone', w).onclick = () => { boxes().forEach(b => b.checked = false); sum(); };
        sum();
      },
      actions: [{ label: 'Nạp thẻ', cls: 'pri', onClick: w => {
        const nums = $$('.mn-grid input', w).filter(b => b.checked).map(b => +b.value);
        if (!nums.length) { toast('Chưa chọn bài nào'); return false; }
        let cid = $('#mnCourse', w).value;
        if (cid === '__new') {
          const c = { id: uid(), name: 'Tiếng Nhật N5', lang: 'ja-JP', flag: '🇯🇵', color: '#ffb3c8', native: 'vi' };
          Store.upsert('courses', c); cid = c.id;
        }
        const r = this.load(cid, nums);
        toast(r.added ? `Đã nạp ${r.added} thẻ vào “${r.book.title}” 🎉` : 'Các bài này đã có đủ thẻ rồi');
        Router.go('/ngoai-ngu/' + cid + '/tu-vung');
      } }]
    });
  }
};
