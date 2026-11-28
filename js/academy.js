/* =========================================================
   HỌC VIỆN — khoá học nhân văn (triết học, nghệ thuật, …)
   Khoá › Phần › Bài. Mỗi bài là một hành trình 6 bước:
   câu hỏi lớn → văn bản gốc / nhìn chậm → khái niệm → sơ đồ lập luận → đối thoại Socrates → tự giảng lại (Feynman)
   Tiến độ lưu ở Store 'acad' (danh sách {id, kind,…} nên đồng bộ gộp được từng mục).
   ========================================================= */
const Academy = {
  builtin: [
    { id: 'konrad', src: 'js/data/acad-konrad.js', name: 'ACAD_KONRAD', title: 'Konrad: Phương Tây và Phương Đông', field: 'Văn học phương Đông', icon: '🌏', color: '#ffc0b0', n: 6 },
    { id: 'philo-west', src: 'js/data/acad-philo.js', name: 'ACAD_PHILO', title: 'Nhập môn Triết học phương Tây', field: 'Triết học', icon: '🏛', color: '#c9b6ff', n: 6 },
    { id: 'postmodern', src: 'js/data/acad-pomo.js', name: 'ACAD_POMO', title: 'Hiểu Hậu hiện đại', field: 'Lý luận văn hoá', icon: '🌀', color: '#9fdcff', n: 8 },
    { id: 'art-looking', src: 'js/data/acad-art.js', name: 'ACAD_ART', title: 'Cách xem một bức tranh', field: 'Nghệ thuật', icon: '🎨', color: '#ffd9b0', n: 3 },
  ],
  FIELDS: ['Đạo đức học', 'Triết học phương Đông', 'Lịch sử thế giới', 'Lịch sử Việt Nam', 'Văn học', 'Mỹ học', 'Âm nhạc', 'Kiến trúc', 'Tâm lý học', 'Xã hội học', 'Nhân học', 'Ngôn ngữ học', 'Chính trị học', 'Tôn giáo học', 'Logic & lập luận'],
  STEPS: [['q', '❓', 'Câu hỏi lớn'], ['read', '📜', 'Văn bản gốc'], ['concepts', '💡', 'Khái niệm'], ['arg', '🧩', 'Sơ đồ lập luận'], ['socra', '🗣', 'Đối thoại Socrates'], ['feyn', '✍️', 'Tự giảng lại']],
  LOOK: [['describe', 'Mô tả', 'Chỉ kể những gì mắt thấy: hình, màu, người, vật, vị trí. Chưa đánh giá, chưa đoán ý.'], ['analyze', 'Phân tích', 'Các yếu tố được sắp xếp thế nào: bố cục, đường dẫn mắt, ánh sáng, màu, nét, tỉ lệ.'], ['interpret', 'Diễn giải', 'Theo bạn tác phẩm nói về điều gì? Chỉ ra chi tiết nào làm bằng chứng.'], ['judge', 'Đánh giá', 'Tác phẩm có thành công không — theo tiêu chí nào? Bạn có đổi ý so với ấn tượng đầu không?']],

  /* ---------- dữ liệu ---------- */
  recs() { return Store.list('acad'); },
  rec(id, init) { let r = Store.find('acad', id); if (!r && init) { r = { id, ...init }; Store.list('acad').push(r); } return r; },
  save() { Store.save('acad'); },
  _loaded: {},
  async load(cid) {
    if (this._loaded[cid]) return this._loaded[cid];
    const b = this.builtin.find(x => x.id === cid);
    if (b) return (this._loaded[cid] = await Packs.loadBuiltin(b.src, b.name));
    const r = this.rec('K:' + cid); return r ? r.data : null;
  },
  customs() { return this.recs().filter(r => r.kind === 'course').map(r => r.data); },
  lessons(course) { return course.parts.flatMap((p, pi) => p.lessons.map(l => ({ ...l, pi }))); },
  lrec(cid, lid) { return this.rec(`L:${cid}:${lid}`, { kind: 'lesson', course: cid, lesson: lid, step: 0, n: {} }); },
  lessonDone(cid, lid) { return !!Store.find('acad', `L:${cid}:${lid}`)?.done; },
  concepts(cid) { return this.recs().filter(r => r.kind === 'concept' && (!cid || r.course === cid)); },
  dueConcepts(cid) { const now = Date.now(); return this.concepts(cid).filter(r => (r.srs?.due || 0) <= now); },
  addConcepts(cid, l) {
    let n = 0;
    (l.concepts || []).forEach(k => { const id = `C:${cid}:${k.id}`; if (!Store.find('acad', id)) { Store.list('acad').push({ id, kind: 'concept', course: cid, lesson: l.id, cid: k.id, srs: { due: Date.now() } }); n++; } });
    if (n) this.save();
    return n;
  },

  /* ---------- trang chủ Học viện ---------- */
  async home(view) {
    const due = this.dueConcepts().length, all = this.concepts().length;
    const cards = [...this.builtin.map(b => ({ ...b, builtin: true })), ...this.customs().map(c => ({ id: c.id, title: c.title, field: c.field, icon: c.icon || '📘', color: c.color || '#b8f0a0', n: this.lessons(c).length, desc: c.desc }))];
    view.innerHTML = `
    <div class="page acad">
      <header class="page-hero" style="--hc:#e3d4ff">
        <div class="ph-art ac-art">${Art.creature('prof', { size: 130, mood: 'star' })}</div>
        <div class="ph-txt"><div class="kicker">Học viện · Nhân văn</div><h1>Học để hiểu, không chỉ để nhớ</h1>
          <p>Mỗi bài là một hành trình 6 bước: <b>câu hỏi lớn → đọc văn bản gốc → khái niệm → sơ đồ lập luận → đối thoại Socrates → tự giảng lại</b>. Bài nghệ thuật có thêm bước <b>nhìn chậm</b>. Khái niệm đã học được ôn lại theo lịch, mỗi lần một góc hỏi khác.</p>
          <div class="lh-acts">${due ? `<button class="btn pri big" id="acReview">💡 Ôn ${due} khái niệm</button>` : all ? `<span class="tag ok">💡 ${all} khái niệm · không có thẻ đến hạn</span>` : ''}
            <button class="btn big" id="acNew">✦ Mở khoá mới bằng AI</button><button class="btn big" id="acImp">⤒ Nhập khoá (JSON)</button></div></div>
      </header>
      <h2 class="ac-h">Khoá học</h2>
      <div class="ac-grid">${cards.map(c => {
        const done = this.recs().filter(r => r.kind === 'lesson' && r.course === c.id && r.done).length;
        return `<a class="ac-card" href="#/hoc-vien/${c.id}" style="--cc:${c.color}"><span class="ac-ic">${c.icon}</span><div class="ac-fd">${esc(c.field || '')}</div><b>${esc(c.title)}</b>
          <div class="ac-prog"><i style="width:${c.n ? Math.round(done / c.n * 100) : 0}%"></i></div><small>${done}/${c.n} bài${c.builtin ? '' : ' · tự tạo'}</small></a>`;
      }).join('')}</div>
      <h2 class="ac-h">Thêm lĩnh vực khác</h2>
      <p class="muted">Chọn một lĩnh vực để AI soạn khung khoá theo cùng phương pháp (bạn duyệt trước khi lưu), hoặc nhờ Claude trong khung chat soạn khoá rồi nhập tệp JSON.</p>
      <div class="ac-fields">${this.FIELDS.map(f => `<button class="chip" data-f="${esc(f)}">${esc(f)}</button>`).join('')}</div>
      <details class="ac-method"><summary>Vì sao học theo 6 bước này?</summary><div class="rich">
        <p><b>Câu hỏi lớn</b> trước — viết câu trả lời ngây thơ của bạn, để cuối bài thấy mình đã nghĩ khác đi thế nào.</p>
        <p><b>Văn bản gốc</b> thay vì tóm tắt: các giáo sư nhân văn đều khuyên đọc chậm một đoạn ngắn của chính tác giả, kèm câu hỏi dẫn đường.</p>
        <p><b>Khái niệm</b>: tự định nghĩa trước, rồi mới xem định nghĩa, ví dụ và <i>phản ví dụ</i> — biết cái gì <i>không phải</i> là nó mới thật sự hiểu nó.</p>
        <p><b>Sơ đồ lập luận</b>: tách tiền đề → kết luận → phản bác → trả lời. Đây là lõi của tư duy phản biện.</p>
        <p><b>Đối thoại Socrates</b>: AI chỉ hỏi lại, không giảng — buộc bạn tự lập luận.</p>
        <p><b>Tự giảng lại</b> (kỹ thuật Feynman) và một bài viết ngắn: chỗ nào không giải thích được bằng lời đơn giản là chỗ chưa hiểu.</p></div></details>
    </div>`;
    $('#acReview') && ($('#acReview').onclick = () => this.review(view, null));
    $('#acNew').onclick = () => this.newCourse();
    $('#acImp').onclick = () => this.importCourse();
    $$('.ac-fields [data-f]', view).forEach(b => b.onclick = () => this.newCourse(b.dataset.f));
  },

  /* ---------- trang khoá ---------- */
  async course(view, cid) {
    view.innerHTML = '<div class="page"><p class="muted">Đang mở khoá…</p></div>';
    let c; try { c = await this.load(cid); } catch (e) { }
    if (!c) { view.innerHTML = '<div class="page"><div class="empty">Không tìm thấy khoá học. <a href="#/hoc-vien">← Học viện</a></div></div>'; return; }
    const ls = this.lessons(c), done = ls.filter(l => this.lessonDone(cid, l.id)).length, due = this.dueConcepts(cid).length;
    const custom = !this.builtin.some(b => b.id === cid);
    view.innerHTML = `
    <div class="page acad">
      <div class="ac-crumb"><a href="#/hoc-vien">🏛 Học viện</a> › ${esc(c.field || '')}</div>
      <header class="ac-head" style="--cc:${c.color || '#e3d4ff'}"><span class="ac-ic big">${c.icon || '📘'}</span><div><h1>${esc(c.title)}</h1><p>${esc(c.desc || '')}</p>
        <div class="row"><span class="tag">${done}/${ls.length} bài</span><span class="tag">${this.concepts(cid).length} khái niệm đang ôn</span>
        ${due ? `<button class="btn pri sm" id="acRv">💡 Ôn ${due} khái niệm</button>` : ''}
        ${ls.some(l => l.exam) ? '<button class="btn pri sm" id="acOutline">📌 Tóm tắt khoá</button>' : ''}<button class="btn sm" id="acExp">⤓ Xuất JSON</button>${custom ? '<button class="btn sm" id="acDel">🗑 Xoá khoá</button>' : ''}</div></div></header>
      ${c.parts.map((p, pi) => `<section class="ac-part"><h2>${esc(p.title)}</h2><div class="ac-lessons">${p.lessons.map((l, li) => {
        const r = Store.find('acad', `L:${cid}:${l.id}`), st = r?.done ? 'done' : r ? 'go' : '';
        return `<a class="ac-lesson ${st}" href="#/hoc-vien/${cid}/${l.id}"><span class="ac-no">${st === 'done' ? '✓' : ls.findIndex(x => x.id === l.id) + 1}</span><div><b>${esc(l.title)}</b><small>${esc(l.sub || '')}</small>
          ${st === 'go' ? `<small class="ac-st">Đang ở bước ${(r.step || 0) + 1}/6 · ${this.STEPS[r.step || 0][2]}</small>` : ''}${!l.concepts ? '<small class="ac-st">chưa soạn nội dung</small>' : ''}</div>${l.kind === 'art' ? '<span class="tag">🎨 nhìn chậm</span>' : ''}</a>`;
      }).join('')}</div></section>`).join('')}
      <section class="ac-part"><h2>🕸 Bản đồ khái niệm</h2><p class="muted sm">Các khái niệm của cả khoá và mối liên hệ giữa chúng. Đậm = đã đưa vào lịch ôn. Bấm vào một khái niệm để xem lại.</p><div class="ac-map" id="acMap">${this.mapSVG(c, cid)}</div></section>
    </div>`;
    $('#acRv') && ($('#acRv').onclick = () => this.review(view, cid));
    $('#acOutline') && ($('#acOutline').onclick = () => this.outline(c));
    $('#acExp').onclick = () => download(`${cid}.chutchi-course.json`, JSON.stringify(c, null, 1), 'application/json');
    $('#acDel') && ($('#acDel').onclick = async () => {
      if (!(await confirmBox(`Xoá khoá “${esc(c.title)}” cùng tiến độ và khái niệm của nó?`))) return;
      Store.data.acad = this.recs().filter(r => r.id !== 'K:' + cid && r.course !== cid); this.save(); Router.go('/hoc-vien');
    });
    $$('#acMap [data-k]', view).forEach(g => g.onclick = () => {
      const [lid, kid] = g.dataset.k.split('|'); const l = ls.find(x => x.id === lid); const k = l?.concepts.find(x => x.id === kid);
      if (k) modal({ title: esc(k.term), body: this.conceptHTML(k, l, c) });
    });
  },
  /* bản đồ khái niệm: mỗi bài một cột, đường cong nối các khái niệm liên quan (nét đứt = khác bài) */
  mapSVG(c, cid) {
    const ls = this.lessons(c).filter(l => l.concepts?.length); if (!ls.length) return '<p class="muted">Chưa có khái niệm.</p>';
    const CW = 170, W = Math.max(640, ls.length * CW), H = 70 + Math.max(...ls.map(l => l.concepts.length)) * 62, pos = {}, nodes = [];
    const col = i => Art.palette[i % Art.palette.length];
    ls.forEach((l, i) => l.concepts.forEach((k, j) => { const x = CW / 2 + i * CW + (W - ls.length * CW) / 2, y = 78 + j * 62 + (i % 2) * 18; pos[k.id] = [x, y]; nodes.push({ k, l, i, x, y }); }));
    const seen = new Set(); let edges = '';
    nodes.forEach(n => (n.k.rel || []).forEach(r => {
      const key = [n.k.id, r].sort().join('|'); if (!pos[r] || seen.has(key)) return; seen.add(key);
      const [x2, y2] = pos[r], same = n.l.concepts.some(k => k.id === r);
      const d = same ? `M${n.x - 60},${n.y} C${n.x - 95},${n.y} ${x2 - 95},${y2} ${x2 - 60},${y2}` : `M${n.x},${n.y} C${(n.x + x2) / 2},${n.y} ${(n.x + x2) / 2},${y2} ${x2},${y2}`;
      edges += `<path d="${d}" class="${same ? 'in' : 'out'}"/>`;
    }));
    const lab = (t, max = 21) => { t = t.replace(/\s*\(.*?\)\s*/g, ' ').trim(); return t.length > max ? t.slice(0, max - 1) + '…' : t; };
    return `<svg viewBox="0 0 ${W} ${H}" class="ac-svg" style="min-width:${Math.min(W, ls.length * 150)}px">${edges}
      ${ls.map((l, i) => `<text x="${CW / 2 + i * CW + (W - ls.length * CW) / 2}" y="30" class="hub" fill="${col(i)}">${esc(lab(l.short || l.title.split(':')[0], 16))}</text>`).join('')}
      ${nodes.map(n => { const on = Store.find('acad', `C:${cid}:${n.k.id}`); const t = lab(n.k.term); const w = Math.min(CW - 14, t.length * 6.4 + 18);
        return `<g data-k="${n.l.id}|${n.k.id}" class="nd ${on ? 'on' : ''}"><title>${esc(n.k.term)}</title><rect x="${n.x - w / 2}" y="${n.y - 13}" width="${w}" height="26" rx="13" style="--nc:${col(n.i)}"/><text x="${n.x}" y="${n.y + 4}">${esc(t)}</text></g>`; }).join('')}</svg>`;
  },
  conceptHTML(k, l, c) {
    const rel = (k.rel || []).map(r => this.lessons(c).flatMap(x => x.concepts || []).find(x => x.id === r)).filter(Boolean);
    return `<div class="ac-cdef"><p>${esc(k.def)}</p>
      ${k.ex ? `<div class="ac-ex ok"><b>Ví dụ</b> ${esc(k.ex)}</div>` : ''}${k.counter ? `<div class="ac-ex no"><b>Không phải là nó</b> ${esc(k.counter)}</div>` : ''}
      ${rel.length ? `<div class="ac-rel"><b>Liên quan:</b> ${rel.map(r => `<span class="chip">${esc(r.term)}</span>`).join('')}</div>` : ''}
      ${l ? `<p class="muted sm">Trong bài: ${esc(l.title)}</p>` : ''}</div>`;
  },

  /* ---------- một bài học ---------- */
  async lesson(view, cid, lid, step) {
    let c; try { c = await this.load(cid); } catch (e) { }
    const l = c && this.lessons(c).find(x => x.id === lid);
    if (!l) { view.innerHTML = '<div class="page"><div class="empty">Không tìm thấy bài. <a href="#/hoc-vien">← Học viện</a></div></div>'; return; }
    if (!l.concepts) return this.draftLesson(view, c, l);
    const r = this.lrec(cid, lid); r.n = r.n || {};
    if (step != null) r.step = step;
    const S = r.step || 0, art = l.kind === 'art';
    const steps = this.STEPS.map((s, i) => i === 1 && art ? ['look', '👁', 'Nhìn chậm'] : s);
    const ls = this.lessons(c), idx = ls.findIndex(x => x.id === lid), nextL = ls[idx + 1];
    view.innerHTML = `
    <div class="page acad ac-lp">
      <div class="ac-crumb"><a href="#/hoc-vien">🏛 Học viện</a> › <a href="#/hoc-vien/${cid}">${esc(c.title)}</a> › Bài ${idx + 1}</div>
      <header class="ac-lhead"><div class="kicker">${esc(l.who || '')}</div><h1>${esc(l.title)}</h1>${l.sub ? `<p class="muted">${esc(l.sub)}</p>` : ''}</header>
      <nav class="ac-steps">${steps.map((s, i) => `<button data-s="${i}" class="${i === S ? 'on' : ''} ${(r.seen || []).includes(i) ? 'seen' : ''}"><span>${s[1]}</span><small>${i + 1}. ${s[2]}</small></button>`).join('')}</nav>
      <section class="ac-body" id="acBody"></section>
      <div class="ac-foot">${S > 0 ? '<button class="btn" id="acPrev">← Bước trước</button>' : ''}<span class="grow"></span>
        ${S < 5 ? `<button class="btn pri" id="acNext">Bước tiếp: ${steps[S + 1][2]} →</button>` : r.done ? `<span class="tag ok">✓ Đã hoàn thành ${fmtDate(r.done)}</span>${nextL ? `<a class="btn pri" href="#/hoc-vien/${cid}/${nextL.id}">Bài tiếp: ${esc(nextL.title)} →</a>` : ''}` : '<button class="btn pri" id="acDone">✓ Hoàn thành bài</button>'}</div>
    </div>`;
    r.seen = [...new Set([...(r.seen || []), S])]; this.save();
    const go = i => { this.lesson(view, cid, lid, i); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    $$('.ac-steps button', view).forEach(b => b.onclick = () => go(+b.dataset.s));
    $('#acPrev') && ($('#acPrev').onclick = () => go(S - 1));
    $('#acNext') && ($('#acNext').onclick = () => go(S + 1));
    $('#acDone') && ($('#acDone').onclick = () => {
      r.done = Date.now(); const n = this.addConcepts(cid, l); this.save(); Activity.add('acad');
      toast(`🎓 Xong bài “${l.title}”${n ? ` · ${n} khái niệm vào lịch ôn` : ''}`, 'ok', 4000); Sfx.jingle && Sfx.jingle(); go(5);
    });
    const body = $('#acBody', view);
    this['step_' + steps[S][0]](body, c, l, r, cid);
    /* tự lưu mọi ô ghi chép có data-n */
    const put = debounce(() => this.save(), 500);
    $$('[data-n]', body).forEach(t => t.addEventListener('input', () => { this.setN(r, t.dataset.n, t.value); put(); }));
  },
  getN(r, k) { return r.n?.[k] || ''; },
  setN(r, k, v) { r.n = r.n || {}; r.n[k] = v; r.at = Date.now(); },
  ta(r, k, ph, rows = 3) { return `<textarea class="inp" rows="${rows}" data-n="${k}" placeholder="${esc(ph)}">${esc(this.getN(r, k))}</textarea>`; },

  step_q(el, c, l, r) {
    const art = l.kind === 'art';
    el.innerHTML = `<div class="ac-bigq">${esc(l.q)}</div>
      ${art ? `<p class="muted">Bối cảnh của tác phẩm sẽ mở ra <b>sau</b> khi bạn tự nhìn — để mắt mình đi trước kiến thức.</p>` : `<div class="rich ac-ctx">${l.context || ''}</div>`}
      ${l.book ? `<div class="ac-book">📕 <b>Đọc kèm sách:</b> ${esc(l.book)}</div>` : ''}
      <h3>Câu trả lời đầu tiên của bạn</h3><p class="muted sm">Viết nhanh 2–3 câu, đúng sai không quan trọng. Cuối bài bạn sẽ đọc lại để thấy mình đã nghĩ khác đi thế nào.</p>
      ${this.ta(r, 'q0', art ? 'Ấn tượng đầu tiên khi nhìn tác phẩm…' : 'Theo mình thì…', 4)}`;
    if (art && l.look) el.insertAdjacentHTML('afterbegin', `<figure class="ac-fig sm">${this.img(l)}</figure>`);
  },
  img(l) {
    return `<img src="${esc(l.look.img)}" alt="${esc(l.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ac-noimg',innerHTML:'Không tải được ảnh. <a target=_blank rel=noopener href=&quot;${esc(l.look.link || l.look.img)}&quot;>Mở ảnh trên Wikimedia ↗</a>'}))">
      <figcaption>${esc(l.look.credit || '')} ${l.look.link ? `· <a href="${esc(l.look.link)}" target="_blank" rel="noopener">ảnh lớn ↗</a>` : ''}</figcaption>`;
  },

  step_read(el, c, l, r) {
    const t = l.text || {}, orig = t.orig || t.en, ol = t.lang || 'en-GB', mode = r.lang || (orig ? 'both' : 'vi');
    const para = s => esc(s || '').split('\n').map(x => `<p>${x}</p>`).join('');
    const oname = { en: 'English', zh: 'Nguyên văn 漢', ja: 'Nguyên văn 日本語', vi: 'Nguyên văn' }[ol.slice(0, 2)] || 'Nguyên văn';
    el.innerHTML = `${l.book ? `<div class="ac-book">📕 <b>Đọc kèm sách:</b> ${esc(l.book)}<small>Đọc chương này trước hoặc song song, rồi làm các bước dưới đây. Ghi chép đoạn hay vào Kho lưu trữ.</small></div>` : ''}<div class="ac-src">📜 ${esc(t.src || '')}</div>
      ${orig ? `<div class="seg sm" id="acLang">${[['both', 'Song ngữ'], ['en', oname], ['vi', 'Tiếng Việt']].map(([k, n]) => `<button data-l="${k}" class="${mode === k ? 'on' : ''}">${n}</button>`).join('')}</div>` : ''}
      <div class="ac-text ${mode}">${orig ? `<blockquote class="en ${ol.slice(0, 2) === 'en' ? '' : 'cjk'}" lang="${esc(ol)}">${para(orig)}${t.reading ? `<div class="ac-reading">${para(t.reading)}</div>` : ''}<button class="btn sm" id="acSay" title="Đọc to">🔊</button></blockquote>` : ''}<blockquote class="vi">${para(t.vi)}</blockquote></div>
      <div class="row"><button class="btn sm" id="acArc">📥 Lưu đoạn trích vào Kho lưu trữ</button><span class="muted sm">để bôi đen, tô màu, ghi chú trong trình đọc</span></div>
      <h3>Đọc chậm với câu hỏi dẫn đường</h3>
      ${(t.guide || []).map((g, i) => `<div class="ac-guide"><b>${i + 1}. ${esc(g)}</b>${this.ta(r, 'g' + i, 'Ghi lại ý của bạn, trích câu trong văn bản làm bằng chứng…', 2)}</div>`).join('')}`;
    $$('#acLang button', el).forEach(b => b.onclick = () => { r.lang = b.dataset.l; this.save(); this.step_read(el, c, l, r); this.rebind(el, r); });
    $('#acSay', el) && ($('#acSay', el).onclick = () => Speech.speak(orig, ol, .85));
    $('#acArc', el).onclick = () => {
      const id = 'acx-' + c.id + '-' + l.id;
      if (Store.find('archive', id)) { Router.go('/doc/luu/' + id); return; }
      Store.upsert('archive', { id, title: `${l.title} — trích đoạn`, author: (l.who || '').split('·')[0].trim(), source: t.src || '', type: 'note', status: 'inbox', tags: [c.field || 'nhân văn', 'học viện'], rating: 0, summary: l.q, content: `${orig ? `<blockquote>${para(orig)}</blockquote>${t.reading ? para(t.reading) : ''}` : ''}<h2>Bản dịch</h2>${para(t.vi)}<h2>Câu hỏi dẫn đường</h2><ol>${(t.guide || []).map(g => `<li>${esc(g)}</li>`).join('')}</ol>`, notes: [] });
      toast('Đã lưu vào Kho lưu trữ — bấm lần nữa để mở trình đọc'); $('#acArc', el).textContent = '📖 Mở trong trình đọc';
    };
  },
  rebind(el, r) { const put = debounce(() => this.save(), 500); $$('[data-n]', el).forEach(t => t.addEventListener('input', () => { this.setN(r, t.dataset.n, t.value); put(); })); },

  step_look(el, c, l, r) {
    const lk = l.look || {};
    el.innerHTML = `<figure class="ac-fig">${this.img(l)}</figure>
      <div class="ac-timer"><button class="btn" id="acTm">⏱ Nhìn im lặng 2 phút</button><span class="muted sm">Đừng đọc gì cả. Để mắt đi khắp tác phẩm, kể cả góc và mép tranh.</span></div>
      ${lk.hints?.length ? `<details class="ac-hints"><summary>Gợi ý chỗ để nhìn</summary><ul>${lk.hints.map(h => `<li>${esc(h)}</li>`).join('')}</ul></details>` : ''}
      <div class="ac-look">${this.LOOK.map(([k, n, d], i) => `<div class="ac-lk"><b>${i + 1}. ${n}</b><small>${d}</small>${this.ta(r, 'look_' + k, n + '…', 3)}</div>`).join('')}</div>
      <details class="ac-ctxbox" ${this.getN(r, 'look_describe') ? 'open' : ''}><summary>📖 Bối cảnh tác phẩm (đọc sau khi đã tự nhìn)</summary><div class="rich ac-ctx">${l.context || ''}</div></details>`;
    $('.ac-fig img', el) && ($('.ac-fig img', el).onclick = () => modal({ title: esc(l.title), full: true, body: `<div class="ac-zoom"><img src="${esc(lk.img)}" referrerpolicy="no-referrer" alt=""></div>` }));
    $('#acTm', el).onclick = e => {
      const b = e.target; let s = 120; b.disabled = true; el.classList.add('ac-focus');
      const tick = () => { if (!b.isConnected) return; if (s <= 0) { b.disabled = false; b.textContent = '✓ Xong — giờ viết phần Mô tả'; el.classList.remove('ac-focus'); Sfx.jingle && Sfx.jingle(); return; } b.textContent = `⏱ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; s--; setTimeout(tick, 1000); };
      tick();
    };
  },

  step_concepts(el, c, l, r, cid) {
    el.innerHTML = `<p class="muted">Với mỗi khái niệm: <b>tự định nghĩa bằng lời của bạn trước</b>, rồi mới mở định nghĩa, ví dụ và phản ví dụ để so.</p>
      <div class="ac-concepts">${l.concepts.map((k, i) => `<div class="ac-con" data-i="${i}"><h3>${esc(k.term)}</h3>${this.ta(r, 'def_' + k.id, 'Mình hiểu khái niệm này là…', 2)}
        <button class="btn sm" data-show="${i}">${this.getN(r, 'open_' + k.id) ? 'Ẩn' : 'Mở'} định nghĩa</button><div class="ac-reveal" ${this.getN(r, 'open_' + k.id) ? '' : 'hidden'}>${this.conceptHTML(k, null, c)}</div></div>`).join('')}</div>
      <div class="row"><button class="btn pri" id="acAddK">💡 Đưa ${l.concepts.length} khái niệm vào lịch ôn</button><span class="muted sm">(tự động khi hoàn thành bài)</span></div>`;
    $$('[data-show]', el).forEach(b => b.onclick = () => {
      const k = l.concepts[+b.dataset.show], box = b.nextElementSibling, open = box.hidden;
      box.hidden = !open; b.textContent = (open ? 'Ẩn' : 'Mở') + ' định nghĩa'; this.setN(r, 'open_' + k.id, open ? '1' : ''); this.save();
    });
    const ab = $('#acAddK', el); const have = l.concepts.every(k => Store.find('acad', `C:${cid}:${k.id}`));
    if (have) { ab.disabled = true; ab.textContent = '✓ Các khái niệm đã ở trong lịch ôn'; }
    ab.onclick = () => { const n = this.addConcepts(cid, l); toast(n ? `Đã thêm ${n} khái niệm vào lịch ôn` : 'Đã có sẵn'); ab.disabled = true; ab.textContent = '✓ Các khái niệm đã ở trong lịch ôn'; };
  },

  step_arg(el, c, l, r) {
    const a = l.arg || {}, shown = !!this.getN(r, 'argShown');
    const box = (cls, t, html) => `<div class="am-box ${cls}"><small>${t}</small>${html}</div>`;
    el.innerHTML = `<p class="muted">Dựng lại lập luận: <b>những tiền đề nào</b> dẫn tới kết luận dưới đây? Rồi tìm <b>phản bác mạnh nhất</b> và thử trả lời nó. Làm xong mới mở sơ đồ mẫu.</p>
      <div class="am">
        <div class="am-row">${[0, 1, 2].map(i => box('p', 'Tiền đề ' + (i + 1), this.ta(r, 'p' + i, i === 2 ? '(nếu cần)' : 'Vì…', 2))).join('')}</div>
        <div class="am-arrow">▼ vậy nên</div>
        ${box('c', 'Kết luận', `<b>${esc(a.claim)}</b>`)}
        <div class="am-row two">${box('o', '⚔ Phản bác mạnh nhất', this.ta(r, 'obj', 'Nhưng mà…', 3))}${box('re', '🛡 Trả lời phản bác', this.ta(r, 'rep', 'Có thể đáp lại rằng…', 3))}</div>
        <div class="am-row two">${box('w', '🔍 Tiền đề yếu nhất là…', this.ta(r, 'weak', 'Tiền đề số mấy, vì sao dễ bị tấn công?', 2))}${box('w', '🧭 Lập trường của bạn', this.ta(r, 'stance', 'Mình đồng ý / không đồng ý / đồng ý một phần vì…', 2))}</div>
      </div>
      <div class="row"><button class="btn pri" id="acCmp">${shown ? 'Ẩn' : 'So sánh với'} sơ đồ mẫu</button><button class="btn" id="acArgAI">✦ AI nhận xét lập luận của mình</button></div>
      <div id="acModel" ${shown ? '' : 'hidden'}><h3>Sơ đồ mẫu</h3><div class="am model">
        <div class="am-row">${(a.premises || []).map((p, i) => box('p', 'Tiền đề ' + (i + 1), esc(p))).join('')}</div><div class="am-arrow">▼ vậy nên</div>${box('c', 'Kết luận', `<b>${esc(a.claim)}</b>`)}
        <div class="am-row two">${box('o', '⚔ Phản bác', esc(a.objection))}${box('re', '🛡 Trả lời', esc(a.reply))}</div></div>
        <p class="muted sm">Sơ đồ mẫu không phải “đáp án đúng” — là một cách đọc. Nếu bạn tìm được tiền đề hay phản bác khác, đó là dấu hiệu tốt.</p></div>
      <div id="acArgFb"></div>`;
    $('#acCmp', el).onclick = e => { const m = $('#acModel', el); m.hidden = !m.hidden; e.target.textContent = (m.hidden ? 'So sánh với' : 'Ẩn') + ' sơ đồ mẫu'; this.setN(r, 'argShown', m.hidden ? '' : '1'); this.save(); };
    $('#acArgAI', el).onclick = e => AI.withSpinner(e.target, async () => {
      const mine = `Tiền đề: ${[0, 1, 2].map(i => this.getN(r, 'p' + i)).filter(Boolean).join(' | ') || '(trống)'}\nPhản bác: ${this.getN(r, 'obj') || '(trống)'}\nTrả lời: ${this.getN(r, 'rep') || '(trống)'}\nTiền đề yếu nhất: ${this.getN(r, 'weak') || '(trống)'}\nLập trường: ${this.getN(r, 'stance') || '(trống)'}`;
      const fb = await AI.ask({ system: 'Bạn là giảng viên tư duy phản biện, viết tiếng Việt, ngắn gọn, thẳng thắn mà ấm áp. Định dạng: 3 mục ngắn có tiêu đề in đậm: **Điểm mạnh**, **Lỗ hổng logic** (tiền đề ngầm, bước nhảy, nguỵ biện nếu có), **Một câu hỏi để đào sâu**. Không viết lại toàn bộ lập luận hộ người học.', prompt: `Bài: ${l.title}\nKết luận cần lập luận: ${a.claim}\nSơ đồ tham khảo (đừng chép, chỉ để đối chiếu): ${(a.premises || []).join(' | ')} ; phản bác: ${a.objection}\n\nSơ đồ của người học:\n${mine}` });
      this.setN(r, 'argFb', fb); this.save(); $('#acArgFb', el).innerHTML = `<div class="ac-fb rich">${this.md(fb)}</div>`;
    });
    if (this.getN(r, 'argFb')) $('#acArgFb', el).innerHTML = `<div class="ac-fb rich">${this.md(this.getN(r, 'argFb'))}</div>`;
  },

  socraSystem(c, l) {
    return `Bạn đóng vai Socrates, người thầy dùng phép chất vấn, nói chuyện bằng tiếng Việt với một sinh viên đang học bài “${l.title}” (khoá ${c.title}).
Câu hỏi lớn của bài: ${l.q}
Khái niệm chính: ${(l.concepts || []).map(k => k.term).join(', ')}.
QUY TẮC:
- Mỗi lượt CHỈ hỏi MỘT câu ngắn (tối đa 2 câu văn), có thể kèm 1 câu ghi nhận ngắn ý người học vừa nói.
- KHÔNG giảng bài, KHÔNG đưa đáp án, KHÔNG tóm tắt lý thuyết. Nếu người học xin đáp án, hỏi ngược lại họ đang nghĩ gì.
- Dùng các nước đi: xin định nghĩa → xin ví dụ → đưa phản ví dụ → hỏi hệ quả → chỉ ra mâu thuẫn giữa hai điều họ đã nói → hỏi họ có muốn sửa định nghĩa không.
- Bám sát nội dung người học vừa viết; dùng ví dụ đời thường của người Việt trẻ.
- Giọng ấm áp, tò mò, hơi tinh nghịch như Socrates, xưng "ta" gọi "con" hoặc "bạn" tuỳ người học.`;
  },
  step_socra(el, c, l, r) {
    r.chat = r.chat || [];
    const ready = AI.ready();
    const draw = () => {
      el.innerHTML = `<p class="muted">Socrates không giảng — ông chỉ hỏi. Hãy trả lời thật lòng, kể cả “mình không chắc”. Mục tiêu không phải thắng, mà là thấy rõ mình đang nghĩ gì.</p>
        ${ready ? `<div class="ac-chat" id="acChat">${r.chat.length ? r.chat.map(m => `<div class="msg ${m.role === 'user' ? 'me' : 'so'}">${m.role === 'user' ? '' : '<span class="who">🏛</span>'}<div>${this.md(m.content)}</div></div>`).join('') : `<div class="msg so"><span class="who">🏛</span><div>Chào bạn. Trước khi nói về ${esc(l.title.split(':')[0])}, ta muốn hỏi: <b>${esc(l.socra?.[0] || l.q)}</b></div></div>`}</div>
          <div class="ac-say"><textarea class="inp" id="acMsg" rows="2" placeholder="Trả lời Socrates… (Ctrl+Enter để gửi)"></textarea><button class="btn pri" id="acSend">Gửi</button></div>
          <div class="row"><button class="btn sm" id="acSum" ${r.chat.length >= 4 ? '' : 'disabled'}>📝 Kết thúc & tổng kết điều mình đã nghĩ</button><button class="btn sm" id="acNewChat">↺ Bắt đầu lại</button></div>
          ${r.chatSum ? `<div class="ac-fb rich"><b>Tổng kết cuộc đối thoại</b>${this.md(r.chatSum)}</div>` : ''}`
        : `<div class="ac-fb">Chưa có AI — bạn vẫn có thể tự đối thoại: trả lời từng câu hỏi dưới đây, rồi <b>tự hỏi “ví dụ? phản ví dụ? nếu vậy thì sao?”</b> cho chính câu trả lời của mình. (Thêm key miễn phí ở ⚙️ Cài đặt → Trợ lý AI để có Socrates thật.)</div>
          ${(l.socra || []).map((q, i) => `<div class="ac-guide"><b>${esc(q)}</b>${this.ta(r, 's' + i, 'Mình nghĩ…', 2)}${this.ta(r, 's' + i + 'b', 'Phản ví dụ cho chính câu trả lời trên là…', 1)}</div>`).join('')}`}`;
      if (!ready) return this.rebind(el, r);
      const box = $('#acChat', el); box.scrollTop = box.scrollHeight;
      const send = async () => {
        const t = $('#acMsg', el).value.trim(); if (!t) return;
        if (!r.chat.length) r.chat.push({ role: 'assistant', content: `Chào bạn. Ta muốn hỏi: ${l.socra?.[0] || l.q}` });
        r.chat.push({ role: 'user', content: t }); this.save(); draw();
        const btn = $('#acSend', el); btn.disabled = true; btn.innerHTML = '<span class="spin">✦</span>';
        try { const a = await AI.ask({ system: this.socraSystem(c, l), messages: [{ role: 'user', content: 'Chào thầy Socrates, con sẵn sàng.' }, ...(h => h[0]?.role === 'user' ? h.slice(1) : h)(r.chat.slice(-15))], maxTokens: 400 }); r.chat.push({ role: 'assistant', content: a.trim() }); this.save(); }
        catch (e) { toast('AI lỗi: ' + e.message, 'err', 5000); }
        draw(); $('#acMsg', el)?.focus();
      };
      $('#acSend', el).onclick = send;
      $('#acMsg', el).onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } };
      $('#acNewChat', el).onclick = async () => { if (r.chat.length && !(await confirmBox('Xoá cuộc đối thoại này và bắt đầu lại?'))) return; r.chat = []; delete r.chatSum; this.save(); draw(); };
      $('#acSum', el).onclick = e => AI.withSpinner(e.target, async () => {
        r.chatSum = await AI.ask({ system: 'Tóm tắt bằng tiếng Việt, ngắn, dạng gạch đầu dòng, 3 mục in đậm: **Lập trường của bạn lúc đầu**, **Bạn đã điều chỉnh điều gì**, **Câu hỏi còn bỏ ngỏ**. Chỉ dựa vào lời người học.', prompt: r.chat.map(m => (m.role === 'user' ? 'Người học: ' : 'Socrates: ') + m.content).join('\n') });
        this.save(); draw();
      });
    };
    draw();
  },

  step_feyn(el, c, l, r, cid) {
    const q0 = this.getN(r, 'q0');
    el.innerHTML = `${q0 ? `<div class="ac-then"><small>Lúc đầu bạn đã viết</small><p>${esc(q0)}</p></div>` : ''}
      ${l.exam ? this.examHTML(l) : ''}
      <h3>1 · Tự giảng lại (kỹ thuật Feynman)</h3><p class="muted">${esc(l.feynman || 'Giải thích lại bài này cho một người chưa biết gì, bằng lời đơn giản.')}</p>
      ${this.ta(r, 'feyn', 'Không dùng thuật ngữ nào mà bạn chưa giải thích…', 5)}
      <h3>2 · Bài viết ngắn</h3><p class="muted">${esc(l.essay || 'Bạn nghĩ gì về câu hỏi lớn của bài? Nêu một phản bác và trả lời nó.')}</p>
      ${this.ta(r, 'essay', 'Mở bài nêu lập trường → lý lẽ & ví dụ → phản bác → trả lời → kết…', 8)}
      <div class="row"><span class="muted sm" id="acWc"></span><span class="grow"></span><button class="btn" id="acPost">📝 Lưu sang Phòng Viết</button><button class="btn pri" id="acFeynAI">✦ AI đánh giá mức hiểu</button></div>
      <details class="ac-self"><summary>Tự kiểm tra (không cần AI)</summary><ul class="ac-chk">${[
        'Mình giải thích được mà không cần nhìn lại bài', 'Mình đưa ra được một ví dụ của riêng mình (không có trong bài)', ...(l.concepts || []).slice(0, 4).map(k => `Mình dùng đúng khái niệm “${k.term}”`), 'Bài viết có một phản bác thật sự mạnh, không phải “người rơm”', 'Mình biết mình còn chưa chắc ở điểm nào'
      ].map((t, i) => `<li><label><input type="checkbox" data-c="${i}" ${(r.chk || []).includes(i) ? 'checked' : ''}> ${esc(t)}</label></li>`).join('')}</ul></details>
      <div id="acFeynFb">${r.feynFb ? this.feynHTML(r.feynFb) : ''}</div>
      ${l.read?.length ? `<h3>📚 Đọc thêm</h3><ul class="ac-read">${l.read.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`;
    const wc = () => { $('#acWc', el).textContent = `${wordCount($('[data-n="essay"]', el).value)} chữ`; };
    wc(); $('[data-n="essay"]', el).addEventListener('input', wc);
    $$('.ac-chk input', el).forEach(x => x.onchange = () => { r.chk = $$('.ac-chk input', el).filter(i => i.checked).map(i => +i.dataset.c); this.save(); });
    $('#acPost', el).onclick = () => {
      const e = this.getN(r, 'essay'), f = this.getN(r, 'feyn'); if (!e && !f) return toast('Viết gì đó trước đã nhé', 'err');
      const para = s => esc(s).split(/\n+/).filter(Boolean).map(x => `<p>${x}</p>`).join('');
      const html = `<p><i>${esc(l.q)}</i></p>${f ? `<h2>Tự giảng lại</h2>${para(f)}` : ''}${e ? `<h2>Bài viết</h2>${para(e)}` : ''}`;
      const id = r.post && Store.find('posts', r.post) ? r.post : uid();
      Store.upsert('posts', { ...(Store.find('posts', id) || {}), id, title: l.title, subtitle: `Học viện · ${c.title}`, cat: c.field === 'Nghệ thuật' ? 'hoi-hoa' : c.field === 'Triết học' ? 'triet-hoc' : 'van-hoa', tags: ['học viện', c.field || ''], paper: 'lines', status: 'draft', content: html, words: wordCount(stripHtml(html)) });
      r.post = id; this.save(); toast('Đã lưu vào Phòng Viết (bản nháp)'); Router.go('/viet/sua/' + id);
    };
    $('#acFeynAI', el).onclick = e => AI.withSpinner(e.target, async () => {
      const f = this.getN(r, 'feyn'), es = this.getN(r, 'essay'); if (!f && !es) { toast('Viết phần tự giảng hoặc bài viết trước đã', 'err'); return; }
      const o = await AI.json({ system: 'Bạn là giáo sư nhân văn chấm bài theo tinh thần khích lệ nhưng trung thực, trả lời tiếng Việt.', prompt: `Bài học: ${l.title}\nCâu hỏi lớn: ${l.q}\nKhái niệm chính: ${(l.concepts || []).map(k => `${k.term}: ${k.def}`).join(' || ')}\n\nPhần tự giảng của người học:\n${f || '(trống)'}\n\nBài viết ngắn:\n${es || '(trống)'}\n\nTrả về JSON: {"level":1-5 (1 = còn mơ hồ, 3 = hiểu ý chính, 5 = hiểu sâu và có lập luận riêng),"understood":["điều đã hiểu đúng", …],"gaps":["chỗ còn mờ/chưa giải thích", …],"misconceptions":["hiểu sai cụ thể (nếu có)"],"argument":"nhận xét 1–2 câu về chất lượng lập luận trong bài viết","next":"một câu hỏi để người học đào sâu tiếp"}` });
      r.feynFb = o; this.save(); $('#acFeynFb', el).innerHTML = this.feynHTML(o);
    });
  },
  examHTML(l, open = true) {
    const e = l.exam || {};
    return `<details class="ac-exam" ${open ? 'open' : ''}><summary>📌 Ý chính của bài</summary><ul>${(e.points || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      ${e.qs?.length ? `<b>Câu hỏi để nghĩ tiếp</b><ol>${e.qs.map(q => `<li>${esc(q)}</li>`).join('')}</ol>` : ''}</details>`;
  },
  /* tóm tắt ý chính cả khoá: xem, in, hoặc chép sang Phòng Viết */
  outline(c) {
    const ls = this.lessons(c).filter(l => l.exam);
    const html = ls.map((l, i) => `<h2>${i + 1}. ${esc(l.title)}</h2><ul>${l.exam.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>${l.exam.qs?.length ? `<p><b>Câu hỏi để nghĩ tiếp:</b></p><ol>${l.exam.qs.map(q => `<li>${esc(q)}</li>`).join('')}</ol>` : ''}`).join('');
    modal({
      title: '📌 Tóm tắt khoá · ' + esc(c.title), wide: true, body: `<div class="rich ac-outline">${html}</div>`,
      actions: [
        { label: '📝 Chép sang Phòng Viết', onClick: () => { const id = uid(); Store.upsert('posts', { id, title: 'Tóm tắt: ' + c.title, subtitle: 'Học viện', cat: 'van-hoa', tags: ['tóm tắt', 'học viện'], paper: 'lines', status: 'draft', content: html, words: wordCount(stripHtml(html)) }); toast('Đã chép — sửa, bổ sung tuỳ ý'); Router.go('/viet/sua/' + id); } },
        { label: '🖨 In / lưu PDF', cls: 'pri', onClick: () => { const w = window.open('', '_blank'); if (!w) { toast('Trình duyệt chặn cửa sổ mới', 'err'); return false; } w.document.write(`<!doctype html><meta charset="utf-8"><title>Tóm tắt · ${esc(c.title)}</title><style>body{font:15px/1.6 Georgia,serif;max-width:760px;margin:30px auto;padding:0 20px;color:#222}h1{font-size:22px}h2{font-size:17px;margin:22px 0 6px;border-bottom:1px solid #ccc}li{margin:3px 0}</style><h1>Tóm tắt khoá · ${esc(c.title)}</h1>${html}`); w.document.close(); setTimeout(() => w.print(), 300); return false; } }
      ]
    });
  },
  feynHTML(o) {
    const li = a => (a || []).filter(Boolean).map(x => `<li>${esc(x)}</li>`).join('');
    const lv = clamp(+o.level || 0, 0, 5);
    return `<div class="ac-fb"><div class="ac-lv">Mức hiểu: ${'●'.repeat(lv)}${'○'.repeat(5 - lv)} <small>${['', 'còn mơ hồ', 'nắm được vài ý', 'hiểu ý chính', 'hiểu chắc', 'hiểu sâu, có lập luận riêng'][lv] || ''}</small></div>
      ${li(o.understood) ? `<b>✓ Đã hiểu</b><ul>${li(o.understood)}</ul>` : ''}${li(o.gaps) ? `<b>◌ Còn mờ</b><ul>${li(o.gaps)}</ul>` : ''}${li(o.misconceptions) ? `<b>✗ Hiểu chưa đúng</b><ul>${li(o.misconceptions)}</ul>` : ''}
      ${o.argument ? `<p><b>Lập luận:</b> ${esc(o.argument)}</p>` : ''}${o.next ? `<p class="ac-next">🤔 ${esc(o.next)}</p>` : ''}</div>`;
  },
  /* markdown tối giản cho câu trả lời AI */
  md(s) {
    return esc(s || '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|\s)\*(\S.*?)\*/g, '$1<i>$2</i>')
      .split(/\n{2,}/).map(p => /^\s*[-•]\s/m.test(p) ? `<ul>${p.split('\n').filter(x => x.trim()).map(x => `<li>${x.replace(/^\s*[-•]\s*/, '')}</li>`).join('')}</ul>` : `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  },

  /* ---------- ôn khái niệm: mỗi lần một góc hỏi ---------- */
  async review(view, cid) {
    const list = shuffle(this.dueConcepts(cid));
    const cache = {};
    for (const r of list) { if (!cache[r.course]) { try { cache[r.course] = await this.load(r.course); } catch (e) { } } }
    const items = list.map(r => { const c = cache[r.course]; const l = c && this.lessons(c).find(x => x.id === r.lesson); const k = l?.concepts?.find(x => x.id === r.cid); return k && { r, c, l, k }; }).filter(Boolean);
    let q = items, done = 0;
    const back = () => cid ? this.course(view, cid) : this.home(view);
    const show = () => {
      if (!q.length) {
        view.innerHTML = `<div class="page acad"><div class="empty big">${Art.creature('prof', { size: 110, mood: 'star' })}<h2>Xong buổi ôn khái niệm!</h2><p>Đã ôn ${done} lượt. Lần sau mỗi khái niệm sẽ được hỏi ở một góc khác.</p><button class="btn pri" id="acBk">← Quay lại</button></div></div>`;
        if (done) Sfx.jingle && Sfx.jingle(); $('#acBk', view).onclick = back; return;
      }
      const { r, c, l, k } = q[0]; r.srs = r.srs || {};
      const rel = (k.rel || []).map(id => this.lessons(c).flatMap(x => x.concepts || []).find(x => x.id === id)).filter(Boolean);
      const modes = [['Định nghĩa bằng lời của bạn', `“${k.term}” là gì?`], ['Ví dụ & phản ví dụ', `Cho một ví dụ của “${k.term}” — và một trường hợp trông giống nhưng KHÔNG phải.`],
        ...(rel.length ? [['So sánh', `“${k.term}” liên quan hoặc khác gì với “${rel[(r.srs.k || 0) % rel.length].term}”?`]] : []), ['Áp dụng', `Dùng “${k.term}” để trả lời: ${l.q}`]];
      const [mn, mq] = modes[(r.srs.k || 0) % modes.length];
      const mine = Store.find('acad', `L:${r.course}:${r.lesson}`)?.n?.['def_' + k.id];
      view.innerHTML = `<div class="page acad"><div class="gs-head"><button class="btn sm" id="acQuit">← Thoát</button><span class="grow"></span><span class="muted">Còn ${q.length} · đã ôn ${done}</span></div>
        <div class="gs-card ac-rv"><div class="kicker">${esc(c.title)} · ${esc(l.title)} · ${mn}</div><div class="gc-title">${esc(mq)}</div>
          <textarea class="inp" rows="3" id="acAns" placeholder="Nghĩ hoặc viết câu trả lời trước khi lật…"></textarea>
          <button class="btn pri" id="acFlip">Lật xem</button>
          <div class="ac-after" hidden>${this.conceptHTML(k, null, c)}${mine ? `<div class="ac-then"><small>Định nghĩa bạn viết lúc học</small><p>${esc(mine)}</p></div>` : ''}
            <div class="rv-grade">${[[0, 'Quên', 'again'], [3, 'Khó', 'hard'], [4, 'Được', 'good'], [5, 'Dễ', 'easy']].map(([v, n, x]) => `<button class="g-${x}" data-q="${v}"><b>${n}</b><small>${SRS.preview(r.srs, v).label}</small></button>`).join('')}</div></div></div></div>`;
      $('#acQuit', view).onclick = back;
      $('#acFlip', view).onclick = e => { e.target.hidden = true; $('.ac-after', view).hidden = false; };
      $$('.rv-grade button', view).forEach(b => b.onclick = () => {
        const v = +b.dataset.q; SRS.grade(r.srs, v); r.srs.k = (r.srs.k || 0) + 1; this.save(); done++;
        q.shift(); if (v === 0) q.push({ r, c, l, k }); show();
      });
    };
    show();
  },

  /* ---------- tạo khoá bằng AI ---------- */
  newCourse(field = '') {
    modal({
      title: '✦ Mở khoá mới', wide: true,
      body: `<p class="muted">AI soạn <b>khung khoá</b> (các phần, bài, câu hỏi lớn) trước. Nội dung chi tiết của từng bài sẽ được soạn khi bạn mở bài đó. Hãy coi AI như trợ giảng: có thể sai, nên đối chiếu với sách khi cần.</p>
        <label class="lbl">Lĩnh vực</label><input class="inp" id="ncF" value="${esc(field)}" placeholder="VD: Đạo đức học, Lịch sử Việt Nam, Văn học Nga…">
        <label class="lbl">Chủ đề / trọng tâm (tuỳ chọn)</label><input class="inp" id="ncT" placeholder="VD: Từ Khổng Tử đến Vương Dương Minh; nhạc cổ điển thế kỷ 19; nhập môn tâm lý học nhận thức…">
        <div class="row"><label class="lbl">Số bài</label><select class="inp" id="ncN" style="width:auto">${[3, 4, 5, 6, 8].map(n => `<option ${n === 5 ? 'selected' : ''}>${n}</option>`).join('')}</select>
          <label class="lbl">Loại</label><select class="inp" id="ncK" style="width:auto"><option value="text">Đọc văn bản</option><option value="art">Nhìn tác phẩm (nghệ thuật)</option></select></div>
        <div id="ncOut"></div>`,
      actions: [{ label: 'Huỷ' }, {
        label: '✦ Soạn khung khoá', cls: 'pri', onClick: async (w) => {
          const f = $('#ncF', w).value.trim(); if (!f) { toast('Nhập lĩnh vực đã nhé', 'err'); return false; }
          const btn = $('.modal-foot .pri', w);
          if (btn.dataset.ready) { this.saveCourse(JSON.parse(btn.dataset.ready)); return; }
          await AI.withSpinner(btn, async () => {
            const o = await AI.json({ system: 'Bạn là giáo sư thiết kế chương trình nhân văn nhập môn cho người tự học, viết tiếng Việt chuẩn, chính xác học thuật.', maxTokens: 3000, prompt: `Thiết kế khung một khoá học lĩnh vực “${f}”${$('#ncT', w).value.trim() ? `, trọng tâm: ${$('#ncT', w).value.trim()}` : ''}, gồm đúng ${$('#ncN', w).value} bài, chia 2–3 phần theo trình tự hợp lý (lịch sử hoặc từ nền tảng đến nâng cao). Mỗi bài xoay quanh một tác giả/tác phẩm/khái niệm then chốt và một câu hỏi lớn gợi tò mò.
Trả về JSON: {"title":"tên khoá","icon":"1 emoji","desc":"1–2 câu","parts":[{"title":"Phần I · …","lessons":[{"id":"slug-khong-dau","title":"…: …","sub":"phụ đề ngắn","who":"tác giả/tác phẩm, năm","q":"câu hỏi lớn"}]}]}` });
            if (!o?.parts?.length) throw new Error('AI không trả về khung khoá');
            const c = { format: 'chutchi-course@1', id: 'u' + uid(), field: f, icon: o.icon || '📘', color: Art.palette[hashStr(f) % Art.palette.length], title: o.title || f, desc: o.desc || '', ai: true,
              parts: o.parts.map(p => ({ title: p.title, lessons: (p.lessons || []).map((l, i) => ({ ...l, id: (l.id || 'b' + i).replace(/[^\w-]/g, '').slice(0, 40) || 'b' + i, kind: $('#ncK', w).value === 'art' ? 'art' : undefined })) })) };
            $('#ncOut', w).innerHTML = `<div class="ac-fb"><b>${esc(c.icon)} ${esc(c.title)}</b><p>${esc(c.desc)}</p>${c.parts.map(p => `<b>${esc(p.title)}</b><ol>${p.lessons.map(l => `<li>${esc(l.title)} — <i>${esc(l.q || '')}</i></li>`).join('')}</ol>`).join('')}</div>`;
            btn.dataset.ready = JSON.stringify(c); setTimeout(() => { btn.textContent = '💾 Lưu khoá này'; });
          });
          return false;
        }
      }]
    });
  },
  saveCourse(c) {
    if (Store.find('acad', 'K:' + c.id)) Store.find('acad', 'K:' + c.id).data = c; else Store.list('acad').push({ id: 'K:' + c.id, kind: 'course', data: c });
    this.save(); toast('Đã thêm khoá “' + c.title + '”'); Router.go('/hoc-vien/' + c.id);
  },
  async importCourse() {
    const f = await new Promise(res => { const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json'; i.onchange = () => res(i.files[0]); i.click(); });
    if (!f) return;
    try {
      const c = JSON.parse(await f.text());
      if (c.format !== 'chutchi-course@1' || !Array.isArray(c.parts) || !c.title) throw new Error('Tệp không phải khoá học Chữ-tchi (format chutchi-course@1)');
      if (this.builtin.some(b => b.id === c.id)) c.id = c.id + '-' + uid().slice(-4);
      c.id = String(c.id || 'u' + uid()).replace(/[^\w-]/g, '');
      this.saveCourse(c);
    } catch (e) { toast(e.message, 'err', 5000); }
  },
  /* bài trong khoá tự tạo chưa có nội dung → AI soạn */
  draftLesson(view, c, l) {
    view.innerHTML = `<div class="page acad"><div class="ac-crumb"><a href="#/hoc-vien">🏛 Học viện</a> › <a href="#/hoc-vien/${c.id}">${esc(c.title)}</a></div>
      <div class="empty big">${Art.creature('prof', { size: 100, mood: 'joy' })}<h2>${esc(l.title)}</h2><p class="ac-bigq">${esc(l.q || '')}</p><p class="muted">Bài này chưa có nội dung. AI sẽ soạn: bối cảnh, đoạn trích văn bản gốc (chỉ dùng nguyên văn khi tác phẩm đã thuộc phạm vi công cộng), khái niệm, sơ đồ lập luận, câu hỏi Socrates và đề viết.</p>
      <button class="btn pri big" id="acDraft">✦ Soạn bài này</button></div></div>`;
    $('#acDraft', view).onclick = e => AI.withSpinner(e.target, async () => {
      const art = l.kind === 'art';
      const o = await AI.json({ maxTokens: 6000, system: 'Bạn là giáo sư nhân văn soạn bài cho người tự học, tiếng Việt chuẩn, chính xác học thuật, không bịa trích dẫn. Nếu không chắc nguyên văn một đoạn trích, hãy diễn ý và ghi rõ “diễn ý”.', prompt: `Khoá: ${c.title} (${c.field}). Bài: ${l.title} — ${l.sub || ''} — ${l.who || ''}. Câu hỏi lớn: ${l.q}
Trả về JSON:
{"context":"HTML 2–3 đoạn <p> về bối cảnh","text":${art ? 'null' : '{"src":"nguồn trích, bản dịch, năm","en":"nguyên văn tiếng Anh/bản dịch Anh công cộng nếu có, nếu không để rỗng","vi":"bản dịch Việt hoặc diễn ý","guide":["3 câu hỏi đọc chậm"]}'},
${art ? '"look":{"img":"URL ảnh Wikimedia Commons dạng https://commons.wikimedia.org/wiki/Special:FilePath/Tên_tệp.jpg?width=1200 (chỉ khi chắc chắn tên tệp, nếu không để rỗng)","link":"","credit":"tác giả, tên tác phẩm, nơi lưu","hints":["4 gợi ý chỗ để nhìn"]},' : ''}
"concepts":[{"id":"slug","term":"thuật ngữ (gốc nếu có)","def":"định nghĩa 1–2 câu","ex":"ví dụ đời thường","counter":"phản ví dụ: trông giống nhưng không phải","rel":["id khái niệm liên quan trong bài"]}] (4–5 khái niệm),
"arg":{"claim":"luận điểm trung tâm","premises":["2–3 tiền đề"],"objection":"phản bác mạnh nhất (nêu ai phản bác nếu có)","reply":"cách trả lời phản bác"},
"socra":["3 câu hỏi Socrates gắn với đời sống người học"],"feynman":"đề tự giảng lại","essay":"đề viết 150–300 chữ","read":["2 gợi ý đọc thêm có thật"]}` });
      if (!o?.concepts?.length) throw new Error('AI chưa soạn đủ bài');
      const rec = Store.find('acad', 'K:' + c.id); const tl = rec.data.parts.flatMap(p => p.lessons).find(x => x.id === l.id);
      Object.assign(tl, o, { text: o.text || undefined, look: o.look?.img ? o.look : art ? { ...(o.look || {}), img: '' } : undefined });
      this.save(); this.lesson(view, c.id, l.id, 0);
    });
  }
};
