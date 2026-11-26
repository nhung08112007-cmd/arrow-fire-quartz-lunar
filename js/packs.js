/* =========================================================
   📚 THƯ VIỆN GIÁO TRÌNH
   · Giáo trình có sẵn (Minna no Nihongo I · N5, và những bộ Claude thêm vào repo)
   · Giáo trình nhận qua chat: nhắn Claude soạn → nhận đoạn mã JSON → dán vào đây
   Định dạng chung (chutchi-pack@1):
   { "format":"chutchi-pack@1", "id":"…", "title":"…", "lang":"ja-JP", "flag":"🇯🇵",
     "units":[ { "title":"Bài 1", "sub":"chủ đề / ngữ pháp chính",
       "cards":[ {"word","ipa","pos","meaning","def","usage","examples":[{"s","t"}],"syn","ant","coll","family","note","part"} ],
       "grammar":[ {"title","form","explain","examples":[{"s","t"}]} ] } ] }
   ========================================================= */
const Packs = {
  /* giáo trình có sẵn trong app (Claude thêm file vào js/data/ rồi khai báo ở đây) */
  builtin: [
    { id: 'minna-n5', title: 'Minna no Nihongo I · JLPT N5', lang: 'ja-JP', flag: '🇯🇵', desc: 'Bài nhập môn – Bài 25: từ vựng chính + từ tham khảo của sách (chữ Hán, cách đọc, nghĩa Việt/Anh, ví dụ có dịch) và giải thích ngữ pháp từng bài.', units: 26, cards: 1502, grammarN: 150, open: cid => Minna.open(cid) },
    { id: 'hsk3', title: 'HSK 3.0 · Cấp 1–4', lang: 'zh-CN', flag: '🇨🇳', desc: 'Từ vựng HSK 3.0 cấp 1–4 xếp theo từ loại: chữ Hán, pinyin, nghĩa Việt, âm Hán Việt, ví dụ có dịch; kèm 118 chủ điểm ngữ pháp.', units: 4, cards: 2000, grammarN: 118, open: cid => Packs.loadBuiltin('js/data/hsk3.js', 'HSK3_PACK').then(p => Packs.choose(p, cid)).catch(() => toast('Không tải được dữ liệu HSK', 'err')) },
  ],
  /* dữ liệu giáo trình lớn chỉ tải khi cần */
  _loaded: {},
  loadBuiltin(src, name) {
    if (this._loaded[name]) return Promise.resolve(this._loaded[name]);
    return new Promise((ok, no) => {
      const sc = document.createElement('script'); sc.src = src;
      sc.onload = () => { try { this._loaded[name] = (0, eval)(name); ok(this._loaded[name]); } catch (e) { no(e); } };
      sc.onerror = no; document.head.appendChild(sc);
    });
  },
  saved() { return Store.list('packs'); },

  /* ---------- kiểm tra & chuẩn hoá một giáo trình dán vào ---------- */
  parse(txt) {
    const m = String(txt || '').match(/\{[\s\S]*\}/);
    if (!m) throw new Error('Không thấy đoạn mã giáo trình (JSON) trong nội dung dán vào');
    let o; try { o = JSON.parse(m[0]); } catch (e) { throw new Error('Đoạn mã bị lỗi định dạng: ' + e.message); }
    if (!Array.isArray(o.units) || !o.units.length) throw new Error('Giáo trình không có bài nào ("units")');
    const s = v => String(v == null ? '' : v).trim();
    const ex = a => (Array.isArray(a) ? a : []).filter(e => e && e.s).map(e => ({ s: s(e.s), t: s(e.t) }));
    const pack = {
      format: 'chutchi-pack@1', id: s(o.id) || ('p' + hashStr(s(o.title) + o.units.length).toString(36)), title: s(o.title) || 'Giáo trình mới',
      lang: s(o.lang) || 'en-US', flag: s(o.flag) || '📘', desc: s(o.desc), partOrder: Array.isArray(o.partOrder) ? o.partOrder.map(s) : undefined,
      units: o.units.map((u, i) => ({
        title: s(u.title) || `Bài ${i + 1}`, sub: s(u.sub),
        cards: (u.cards || []).filter(x => x && s(x.word) && s(x.meaning)).map(x => ({
          word: s(x.word), ipa: s(x.ipa), pos: POS.includes(s(x.pos)) ? s(x.pos) : 'other', meaning: s(x.meaning), def: s(x.def), usage: s(x.usage),
          examples: ex(x.examples), syn: s(x.syn), ant: s(x.ant), coll: s(x.coll), family: s(x.family), note: s(x.note), part: s(x.part)
        })),
        grammar: (u.grammar || []).filter(g => g && s(g.title)).map(g => ({ title: s(g.title), form: s(g.form), explain: s(g.explain), tip: s(g.tip), examples: ex(g.examples) }))
      }))
    };
    if (!pack.units.some(u => u.cards.length || u.grammar.length)) throw new Error('Giáo trình chưa có thẻ từ hay điểm ngữ pháp nào');
    return pack;
  },

  /* ---------- nạp các bài đã chọn vào lớp ---------- */
  importPack(pack, cid, idxs) {
    let book = Store.list('tbooks').find(b => b.courseId === cid && b.src === 'pack:' + pack.id);
    if (!book) { book = { id: uid(), courseId: cid, src: 'pack:' + pack.id, title: pack.title, units: [] }; Store.list('tbooks').push(book); }
    if (pack.gv) book.gv = pack.gv;
    const ids = new Set(Store.list('cards').map(c => c.id)), gids = new Set(Store.list('grammar').map(g => g.id));
    const fresh = [], now = Date.now(); let gAdded = 0;
    const byId = new Map(Store.list('cards').map(c => [c.id, c]));
    idxs.sort((a, b) => a - b).forEach(i => {
      const U = pack.units[i]; if (!U) return;
      const parts = this.orderParts([...new Set(U.cards.map(x => x.part).filter(Boolean))], pack.partOrder);
      let u = book.units.find(x => x.pk === i);
      if (!u) { u = { id: uid(), pk: i, title: U.title, sub: U.sub, parts }; book.units.push(u); }
      else { u.parts = parts; u.title = U.title; u.sub = U.sub || u.sub; }
      U.cards.forEach((x, j) => {
        const id = `pk-${pack.id}-${i}-${j}`;
        if (ids.has(id)) { const old = byId.get(id); if (old && x.part && old.part !== x.part) old.part = x.part; return; }   // giáo trình cập nhật: đổi nhóm, giữ tiến độ
        fresh.push({ ...x, id, courseId: cid, bookId: book.id, unitId: u.id, tags: [pack.title, U.title], source: `${pack.title} · ${U.title}`, created: now + fresh.length });
      });
      U.grammar.forEach((g, j) => {
        const id = `pkg-${pack.id}-${i}-${j}`; if (gids.has(id)) return;
        const content = `${g.explain ? `<h3>Giải thích</h3>${g.explain.split(/\n{2,}/).map(p => `<p>${esc(p)}</p>`).join('')}` : ''}${g.examples.length ? `<h3>Ví dụ</h3><ul>${g.examples.map(e => `<li>${esc(e.s)}${e.t ? ` — <i>${esc(e.t)}</i>` : ''}</li>`).join('')}</ul>` : ''}${g.tip ? `<div class="blk callout c-warn"><span class="ci" contenteditable="false">⚠️</span><div><b>Lỗi hay gặp:</b> ${esc(g.tip)}</div></div>` : ''}`;
        Store.list('grammar').push({ id, courseId: cid, bookId: book.id, unitId: u.id, title: g.title, form: g.form, content, created: now }); gAdded++;
      });
    });
    book.units.sort((a, b) => (a.pk ?? 99) - (b.pk ?? 99));
    Store.data.cards = [...Store.list('cards'), ...fresh];
    Store.save('tbooks'); Store.save('cards'); Store.save('grammar'); Store.flush();
    return { added: fresh.length, gAdded, book };
  },

  /* xếp nhóm trong bài theo thứ tự hợp lý (theo giáo trình, rồi theo từ loại) */
  PART_ORDER: ['Danh từ', 'Động từ', 'Tính từ', 'Phó từ', 'Đại từ', 'Số từ & lượng từ', 'Hư từ', 'Cụm từ & câu giao tiếp', 'Từ khác'],
  orderParts(parts, order) {
    const o = [...(order || []), ...this.PART_ORDER];
    const rank = p => { const k = o.indexOf(p); return k < 0 ? 999 : k; };
    return [...parts].sort((a, b) => rank(a) - rank(b));
  },
  /* thẻ HSK nạp từ bản cũ (chia “Nhóm 1, 2…”) → chuyển sang chia theo từ loại, giữ nguyên tiến độ học */
  migrate() {
    this.migrateGrammar();
    const cards = Store.list('cards').filter(c => /^pk-hsk3-/.test(c.id) && /^Nhóm \d/.test(c.part || ''));
    if (!cards.length) return;
    const H = 'Hư từ';
    const map = { noun: 'Danh từ', verb: 'Động từ', adjective: 'Tính từ', adverb: 'Phó từ', pronoun: 'Đại từ', counter: 'Số từ & lượng từ', particle: H, conjunction: H, preposition: H, interjection: H, phrase: 'Cụm từ & câu giao tiếp' };
    cards.forEach(c => { c.part = map[c.pos] || (/Số từ/.test(c.usage || '') ? 'Số từ & lượng từ' : 'Từ khác'); });
    Store.list('tbooks').filter(b => b.src === 'pack:hsk3').forEach(b => (b.units || []).forEach(u => {
      u.parts = this.orderParts([...new Set(Store.list('cards').filter(c => c.unitId === u.id).map(c => c.part).filter(Boolean))]);
    }));
    Store.save('cards'); Store.save('tbooks');
  },

  /* lớp HSK đã nạp từ trước khi có ngữ pháp → tự bổ sung chủ điểm ngữ pháp cho các cấp đã nạp */
  migrateGrammar() {
    const GV = 2;   // phiên bản ngữ pháp HSK hiện tại (đổi khi sắp xếp lại chủ điểm)
    const books = Store.list('tbooks').filter(b => b.src === 'pack:hsk3' && (b.gv !== GV || (b.units || []).some(u => u.pk != null && !Store.list('grammar').some(g => g.id === `pkg-hsk3-${u.pk}-0`))));
    if (!books.length) return;
    this.loadBuiltin('js/data/hsk3.js', 'HSK3_PACK').then(p => {
      let n = 0;
      books.forEach(b => {
        const old = Store.list('grammar').filter(g => g.courseId === b.courseId && /^pkg-hsk3-/.test(g.id));
        const keep = new Map(old.filter(g => g.exercises?.length).map(g => [g.title, g.exercises]));   // giữ bài tập đã tạo
        Store.data.grammar = Store.list('grammar').filter(g => !old.includes(g));
        const idx = (b.units || []).map(u => u.pk).filter(i => i != null);
        n += this.importPack(p, b.courseId, idx).gAdded - old.length;
        Store.list('grammar').forEach(g => { if (g.courseId === b.courseId && keep.has(g.title)) g.exercises = keep.get(g.title); });
        b.gv = GV;
      });
      Store.save('grammar'); Store.save('tbooks'); Store.flush();
      if (typeof toast === 'function') toast(n > 0 ? `📐 Đã thêm ${n} chủ điểm ngữ pháp HSK vào tab Ngữ pháp` : '📐 Đã cập nhật ngữ pháp HSK theo danh sách mới');
    }).catch(() => { });
  },

  /* lời nhắn mẫu để gửi Claude trong chat */
  request(title = '…') {
    return `Soạn giáo trình "${title}" cho app Chữ-tchi (bài … đến bài …).
Trả về một khối JSON đúng định dạng chutchi-pack@1:
{"format":"chutchi-pack@1","id":"ma-ngan","title":"…","lang":"mã giọng đọc, vd ja-JP / en-US / zh-CN","flag":"cờ emoji",
 "units":[{"title":"Bài 1 · …","sub":"chủ đề & ngữ pháp chính",
   "cards":[{"word":"","ipa":"cách đọc","pos":"noun|verb|adjective|adverb|pronoun|conjunction|interjection|phrase|particle|counter|other","meaning":"nghĩa Việt","def":"định nghĩa ngắn","usage":"lưu ý cách dùng (tiếng Việt)","examples":[{"s":"câu ví dụ","t":"dịch"}],"syn":"","ant":"","coll":"","family":"","note":"mẹo nhớ","part":"nhóm trong bài, vd Động từ"}],
   "grammar":[{"title":"","form":"công thức","explain":"giải thích tiếng Việt","examples":[{"s":"","t":""}]}]}]}
Mỗi thẻ đủ các ô, mỗi thẻ 2–3 ví dụ.`;
  },

  /* ---------- hộp thoại thư viện ---------- */
  open(preCid, tab = 'lib') {
    const all = [...this.builtin, ...this.saved().map(p => ({ ...p, saved: true, units: p.units.length, cards: p.units.reduce((s, u) => s + u.cards.length, 0), grammarN: p.units.reduce((s, u) => s + u.grammar.length, 0) }))];
    const m = modal({
      title: '📚 Thư viện giáo trình', wide: true, body: `
        <div class="seg fill pk-tabs"><button data-t="lib" class="${tab === 'lib' ? 'on' : ''}">📚 Giáo trình có sẵn</button><button data-t="paste" class="${tab === 'paste' ? 'on' : ''}">💬 Nạp qua chat với Claude</button></div>
        <div class="pk-body" ${tab === 'lib' ? '' : 'hidden'} data-p="lib">
          <div class="pk-list">${all.map((p, i) => `<div class="pk-item" data-i="${i}"><span class="pk-flag">${esc(p.flag)}</span><div><b>${esc(p.title)}</b><small>${p.units} bài · ${p.cards} thẻ${p.grammarN ? ` · ${p.grammarN} điểm ngữ pháp` : ''}${p.saved ? ' · nhận qua chat' : ''}</small>${p.desc ? `<p>${esc(p.desc)}</p>` : ''}</div>${p.saved ? `<button class="mini-btn" data-del="${esc(p.id)}" title="Xoá khỏi thư viện">✕</button>` : ''}<button class="btn sm pri" data-open="${i}">Chọn bài ›</button></div>`).join('')}</div>
          <p class="muted sm">Muốn thêm giáo trình khác (Genki, HSK, Tiếng Anh giao tiếp, giáo trình trường bạn…)? Nhắn Claude trong khung chat, hoặc dùng tab “Nạp qua chat”.</p>
        </div>
        <div class="pk-body" ${tab === 'paste' ? '' : 'hidden'} data-p="paste">
          <ol class="pk-steps"><li>Trong khung chat với Claude, nhắn ví dụ: <i>“Soạn giáo trình HSK 1 bài 1–5 cho app Chữ-tchi”</i>. Bấm nút dưới để sao chép lời nhắn mẫu có sẵn định dạng.</li>
            <li>Claude gửi lại một đoạn mã (JSON). Sao chép toàn bộ rồi dán vào ô bên dưới.</li>
            <li>Bấm <b>Kiểm tra & lưu</b>: giáo trình vào thư viện, chọn bài để nạp vào lớp.</li></ol>
          <div class="row"><button class="btn sm" id="pkCopy">📋 Sao chép lời nhắn mẫu</button><span class="muted sm">(Claude có thể thêm thẳng giáo trình vào thư viện có sẵn của app nếu bạn nhờ.)</span></div>
          <textarea class="inp" id="pkTxt" rows="8" placeholder='Dán đoạn mã giáo trình vào đây… { "format": "chutchi-pack@1", … }'></textarea>
          <div class="row"><button class="btn pri" id="pkCheck">Kiểm tra & lưu</button><span id="pkMsg" class="muted sm"></span></div>
        </div>`,
      onOpen: (w, close) => {
        $$('.pk-tabs button', w).forEach(b => b.onclick = () => { $$('.pk-tabs button', w).forEach(x => x.classList.toggle('on', x === b)); $$('.pk-body', w).forEach(d => d.hidden = d.dataset.p !== b.dataset.t); });
        $$('[data-open]', w).forEach(b => b.onclick = () => { const p = all[+b.dataset.open]; close(); if (p.open) p.open(preCid); else this.choose(this.saved().find(x => x.id === p.id), preCid); });
        $$('[data-del]', w).forEach(b => b.onclick = async e => { e.stopPropagation(); if (!await confirmBox('Xoá giáo trình này khỏi thư viện? (thẻ đã nạp vào lớp vẫn giữ)')) return; Store.data.packs = this.saved().filter(p => p.id !== b.dataset.del); Store.save('packs'); close(); this.open(preCid); });
        $('#pkCopy', w).onclick = async () => { try { await navigator.clipboard.writeText(this.request()); toast('Đã sao chép lời nhắn mẫu — dán vào khung chat với Claude', 'ok'); } catch (e) { $('#pkTxt', w).value = this.request(); toast('Không sao chép được, lời nhắn mẫu đã hiện trong ô bên dưới', 'err'); } };
        $('#pkCheck', w).onclick = () => {
          try {
            const p = this.parse($('#pkTxt', w).value);
            Store.data.packs = [p, ...this.saved().filter(x => x.id !== p.id)]; Store.save('packs');
            toast(`Đã lưu “${p.title}” vào thư viện`, 'ok'); close(); this.choose(p, preCid);
          } catch (e) { $('#pkMsg', w).innerHTML = `<span class="bad">${esc(e.message)}</span>`; }
        };
      }
    });
    return m;
  },

  /* ---------- chọn lớp & bài để nạp ---------- */
  choose(p, preCid) {
    const lc = (p.lang || '').slice(0, 2).toLowerCase();
    const same = Store.list('courses').filter(c => (c.lang || '').slice(0, 2).toLowerCase() === lc);
    const ids = new Set(Store.list('cards').map(c => c.id));
    const have = i => p.units[i].cards.filter((_, j) => ids.has(`pk-${p.id}-${i}-${j}`)).length;
    modal({
      title: `${esc(p.flag)} ${esc(p.title)}`, wide: true, body: `
        <label class="lbl">Nạp vào lớp</label>
        <select class="inp" id="pcCourse">${same.map(c => `<option value="${c.id}" ${c.id === preCid ? 'selected' : ''}>${c.flag} ${esc(c.name)}</option>`).join('')}<option value="__new" ${same.length ? '' : 'selected'}>＋ Tạo lớp mới “${esc(p.title)}”</option></select>
        <div class="row" style="margin:12px 0 6px;justify-content:space-between"><label class="lbl" style="margin:0">Chọn bài</label><span><button class="btn sm" id="pcAll">Chọn hết</button> <button class="btn sm" id="pcNone">Bỏ chọn</button></span></div>
        <div class="mn-grid">${p.units.map((u, i) => { const h = have(i), done = u.cards.length && h === u.cards.length; return `<label class="mn-l ${done ? 'done' : ''}"><input type="checkbox" value="${i}" ${done ? '' : 'checked'}><b>${esc(u.title)}</b>${u.sub ? `<small>${esc(u.sub)}</small>` : ''}<i>${done ? '✓ đã có' : `${u.cards.length} từ${u.grammar.length ? ` · ${u.grammar.length} ngữ pháp` : ''}`}</i></label>`; }).join('')}</div>`,
      onOpen: w => {
        $('#pcAll', w).onclick = () => $$('.mn-grid input', w).forEach(b => b.checked = true);
        $('#pcNone', w).onclick = () => $$('.mn-grid input', w).forEach(b => b.checked = false);
      },
      actions: [{ label: 'Nạp vào lớp', cls: 'pri', onClick: w => {
        const idxs = $$('.mn-grid input', w).filter(b => b.checked).map(b => +b.value);
        if (!idxs.length) { toast('Chưa chọn bài nào', 'err'); return false; }
        let cid = $('#pcCourse', w).value;
        if (cid === '__new') { const c = { id: uid(), name: p.title, lang: p.lang, flag: p.flag, color: Art.palette[hashStr(p.id) % 10], native: 'vi' }; Store.upsert('courses', c); cid = c.id; }
        const r = this.importPack(p, cid, idxs);
        toast(`Đã nạp ${r.added} thẻ${r.gAdded ? ` và ${r.gAdded} điểm ngữ pháp` : ''} 🎉`, 'ok');
        Router.go('/ngoai-ngu/' + cid + '/tu-vung');
      } }]
    });
  }
};
