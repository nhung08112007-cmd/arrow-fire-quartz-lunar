/* =========================================================
   READER — chế độ đọc tràn màn hình + bộ công cụ ghi chú
   (tô màu theo ý nghĩa, gạch chân, ghi chú lề, thẻ, bút vẽ tay,
   đánh dấu trang, mục lục, đọc to, AI giải thích, xuất ghi chú…)
   ========================================================= */
const HL = [
  ['yellow', '#fff176', 'Quan trọng'],
  ['pink', '#ffc6e0', 'Cảm xúc'],
  ['blue', '#c4ecff', 'Định nghĩa'],
  ['green', '#cff5c0', 'Ý tưởng'],
  ['purple', '#e3d4ff', 'Câu hỏi'],
  ['orange', '#ffd9b0', 'Trích được'],
];

const Reader = {
  open(view, { doc, onSave, back, kind = 'post', meta = '' }) {
    const S = Store.settings();
    S.reader = S.reader || { size: 19, width: 760, theme: 'paper', font: 'Lora', lh: 1.85, focus: false };
    const R = S.reader;
    doc.notes = doc.notes || []; doc.pen = doc.pen || []; doc.marks = doc.marks || []; doc.general = doc.general || '';
    view.classList.add('full');
    view.innerHTML = `
    <div class="rd theme-${R.theme}" id="rd">
      <div class="rd-progress"><i id="rdProg"></i></div>
      <div class="rd-bar">
        <a class="rbtn" href="${back}">‹ Quay lại</a>
        <div class="rd-title">${esc(doc.title || 'Không tiêu đề')}</div>
        <div class="rd-ctrl">
          <button class="rbtn" data-r="toc" title="Mục lục">☰</button>
          <span class="sep"></span>
          <button class="rbtn" data-r="smaller" title="Chữ nhỏ">A−</button><button class="rbtn" data-r="bigger" title="Chữ to">A+</button>
          <select class="rsel" data-r="font">${[['Lora', 'Lora'], ['EB Garamond', 'Garamond'], ['Noto Serif', 'Noto Serif'], ['Nunito', 'Nunito'], ['Patrick Hand', 'Viết tay']].map(f => `<option value="${f[0]}" ${R.font === f[0] ? 'selected' : ''}>${f[1]}</option>`).join('')}</select>
          <select class="rsel" data-r="width">${[[600, 'Hẹp'], [760, 'Vừa'], [960, 'Rộng'], [1240, 'Rất rộng'], [0, 'Tràn']].map(w => `<option value="${w[0]}" ${R.width == w[0] ? 'selected' : ''}>${w[1]}</option>`).join('')}</select>
          <select class="rsel" data-r="lh">${[1.5, 1.7, 1.85, 2.1, 2.4].map(v => `<option ${R.lh == v ? 'selected' : ''}>${v}</option>`).join('')}</select>
          <select class="rsel" data-r="theme">${[['paper', '📄 Giấy'], ['sepia', '📜 Cổ'], ['mint', '🌿 Bạc hà'], ['grid', '▦ Sổ chấm'], ['night', '🌙 Đêm']].map(t => `<option value="${t[0]}" ${R.theme === t[0] ? 'selected' : ''}>${t[1]}</option>`).join('')}</select>
          <span class="sep"></span>
          <button class="rbtn" data-r="focus" title="Chế độ tập trung">◎</button>
          <button class="rbtn" data-r="pen" title="Bút vẽ tay">✒️</button>
          <button class="rbtn" data-r="bookmark" title="Đánh dấu vị trí">🔖</button>
          <button class="rbtn" data-r="speak" title="Đọc to">🔊</button>
          <button class="rbtn" data-r="ask" title="Hỏi AI về bài">✦</button>
          <button class="rbtn" data-r="fs" title="Toàn màn hình">⛶</button>
          <button class="rbtn hot" data-r="notes" title="Bảng ghi chú">📝 <span id="ncount">${doc.notes.length}</span></button>
        </div>
      </div>
      <div class="rd-pen" id="penBar" hidden>
        ${['#2a2346', '#e8475f', '#2f6fd6', '#3aa35a', '#ff8a3d', '#d63a9b'].map((c, i) => `<span class="sw ${i ? '' : 'on'}" data-pc="${c}" style="background:${c}"></span>`).join('')}
        <label>Cỡ <input type="range" min="1" max="14" value="3" id="penW"></label>
        <label><input type="checkbox" id="penHL"> bút dạ quang</label>
        <button class="rbtn" id="penUndo">↶ Hoàn tác</button><button class="rbtn" id="penClear">🗑 Xoá hết</button>
        <span class="muted">Đang vẽ — bấm ✒️ để thoát</span>
      </div>
      <div class="rd-body">
        <aside class="rd-toc" id="rdToc" hidden></aside>
        <div class="rd-scroll" id="rdScroll">
          <div class="rd-page" id="rdPage">
            <header class="rd-head">
              ${doc.cover ? `<div class="rd-cover" style="background-image:url('${esc(doc.cover)}')"></div>` : ''}
              <div class="rd-meta">${meta}</div>
              <h1>${esc(doc.title || '')}</h1>
              ${doc.subtitle ? `<p class="rd-sub">${esc(doc.subtitle)}</p>` : ''}
              <div class="rd-stats" id="rdStats"></div>
            </header>
            <article class="rd-article prose" id="rdArt">${doc.content || '<p class="muted">Chưa có nội dung.</p>'}</article>
            <section class="rd-fns" id="rdFns"></section>
            <div class="rd-end">${Art.creature('mascot', { mood: 'joy', size: 70 })}<span>Hết rồi! Bạn đã đọc xong ♥</span></div>
            <canvas class="rd-canvas" id="rdCanvas"></canvas>
          </div>
        </div>
        <aside class="rd-notes" id="rdNotes" hidden>
          <div class="nt-head">
            <b>Sổ ghi chú</b>
            <div class="nt-tools"><button class="rbtn" id="ntExport" title="Xuất Markdown">⇩ .md</button><button class="rbtn" id="ntSum" title="AI tóm tắt">✦ Tóm tắt</button><button class="rbtn" id="ntClose">✕</button></div>
          </div>
          <div class="nt-legend">${HL.map(h => `<button class="lg" data-f="${h[0]}"><i style="background:${h[1]}"></i>${h[2]}</button>`).join('')}<button class="lg on" data-f="">Tất cả</button></div>
          <input class="inp sm" id="ntSearch" placeholder="Tìm trong ghi chú / thẻ…">
          <details class="nt-general" open><summary>Ghi chú chung cho cả bài</summary><textarea id="ntGeneral" placeholder="Cảm nhận tổng quát, câu hỏi lớn, liên hệ…">${esc(doc.general)}</textarea></details>
          <div class="nt-marks" id="ntBm"></div>
          <div class="nt-list" id="ntList"></div>
        </aside>
      </div>
      <div class="sel-pop" id="selPop" hidden>
        ${HL.map(h => `<span class="sw" data-h="${h[0]}" title="${h[2]}" style="background:${h[1]}"></span>`).join('')}
        <button data-s="ul" title="Gạch chân lượn sóng">U͟</button>
        <button data-s="box" title="Đóng khung">▢</button>
        <button data-s="note" title="Thêm ghi chú">📝</button>
        <button data-s="quote" title="Lưu vào sổ trích dẫn">❝</button>
        <button data-s="card" title="Tạo flashcard">🃏</button>
        <button data-s="explain" title="AI giải thích">✦?</button>
        <button data-s="trans" title="AI dịch">🌐</button>
        <button data-s="speak" title="Đọc to">🔊</button>
        <button data-s="copy" title="Sao chép">⧉</button>
      </div>
      <div class="mark-pop" id="markPop" hidden></div>
    </div>`;

    const rd = $('#rd'), art = $('#rdArt'), page = $('#rdPage'), scroller = $('#rdScroll');
    const applyR = () => {
      rd.className = 'rd theme-' + R.theme + (R.focus ? ' focus' : '');
      page.style.setProperty('--rs', R.size + 'px');
      page.style.setProperty('--rlh', R.lh);
      page.style.setProperty('--rf', `'${R.font}'`);
      page.style.maxWidth = R.width ? R.width + 'px' : 'none';
      Store.save('settings');
      setTimeout(redrawPen, 50);
    };
    applyR();
    const persist = debounce(() => {
      doc.content = art.innerHTML; onSave && onSave(doc); $('#ncount').textContent = doc.notes.length;
    }, 300);

    /* ---- mục lục + chú thích + thống kê ---- */
    const buildToc = () => {
      const hs = $$('h1,h2,h3,h4', art);
      hs.forEach((h, i) => h.id = 'sec-' + i);
      $('#rdToc').innerHTML = `<div class="toc-t">Mục lục</div>` + (hs.length ? hs.map(h => `<a href="javascript:void 0" data-to="${h.id}" class="lv${h.tagName[1]}">${esc(h.textContent)}</a>`).join('') : '<p class="muted">Bài chưa có tiêu đề mục.</p>');
      $$('[data-to]', $('#rdToc')).forEach(a => a.onclick = () => $('#' + a.dataset.to).scrollIntoView({ behavior: 'smooth', block: 'start' }));
      const tocPh = $('.toc-ph', art);
      if (tocPh) tocPh.innerHTML = '<b>Mục lục</b>' + hs.map(h => `<div class="lv${h.tagName[1]}">${esc(h.textContent)}</div>`).join('');
      const fns = $$('sup.fn', art);
      $('#rdFns').innerHTML = fns.length ? '<h4>Chú thích</h4><ol>' + fns.map(f => `<li>${esc(f.dataset.note)}</li>`).join('') + '</ol>' : '';
      const wc = wordCount(art.innerText);
      $('#rdStats').innerHTML = `<span>📖 ${wc.toLocaleString('vi')} chữ</span><span>⏱ ~${Math.max(1, Math.round(wc / 220))} phút</span><span>🖍 ${doc.notes.length} ghi chú</span>`;
    };
    buildToc();

    /* ---- tiến độ đọc ---- */
    const onScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight;
      const p = max > 0 ? scroller.scrollTop / max : 1;
      $('#rdProg').style.width = (p * 100) + '%';
      doc.progress = Math.round(p * 100);
      saveProg();
    };
    const saveProg = debounce(() => { onSave && onSave(doc, true); if (doc.progress >= 98 && !doc.finished) { doc.finished = Date.now(); Activity.add('read', 3); } }, 800);
    scroller.addEventListener('scroll', onScroll);
    if (doc.progress > 3) setTimeout(() => { const max = scroller.scrollHeight - scroller.clientHeight; scroller.scrollTop = max * doc.progress / 100; toast(`Đọc tiếp từ ${doc.progress}% ♥`); }, 120);

    /* ---- popup khi bôi đen ---- */
    const pop = $('#selPop');
    let curRange = null;
    const hidePop = () => { pop.hidden = true; };
    document.addEventListener('selectionchange', onSel);
    function onSel() {
      if (penOn) return;
      const s = getSelection();
      if (!s.rangeCount || s.isCollapsed || !art.contains(s.anchorNode)) { setTimeout(() => { if (getSelection().isCollapsed) hidePop(); }, 150); return; }
      curRange = s.getRangeAt(0).cloneRange();
      const r = curRange.getBoundingClientRect();
      pop.hidden = false;
      pop.style.top = Math.max(60, r.top - 52) + 'px';
      pop.style.left = clamp(r.left + r.width / 2 - pop.offsetWidth / 2, 8, innerWidth - pop.offsetWidth - 8) + 'px';
    }
    pop.addEventListener('mousedown', e => e.preventDefault());
    pop.addEventListener('click', async e => {
      const t = e.target.closest('[data-h],[data-s]'); if (!t || !curRange) return;
      const text = curRange.toString().trim();
      if (t.dataset.h) addMark(t.dataset.h);
      const s = t.dataset.s;
      if (s === 'ul') addMark('yellow', 'ul');
      if (s === 'box') addMark('yellow', 'box');
      if (s === 'note') { const n = addMark('yellow'); openNoteEditor(n); }
      if (s === 'quote') { Store.upsert('quotes', { id: uid(), text, source: doc.title, ref: location.hash, kind }); toast('Đã cất vào Sổ trích dẫn ❝'); }
      if (s === 'card') { const sent = (curRange.startContainer.parentElement?.closest('p,li,blockquote')?.textContent || '').slice(0, 300); Lang.quickAdd(text, sent); }
      if (s === 'copy') { navigator.clipboard?.writeText(text); toast('Đã chép'); }
      if (s === 'speak') Speech.speak(text, /[a-z]/i.test(text) && !/[ăâđêôơưàáảãạ]/i.test(text) ? 'en-US' : 'vi-VN');
      if (s === 'explain' || s === 'trans') {
        const ctxP = curRange.startContainer.parentElement?.closest('p,li,blockquote')?.textContent || '';
        const prompt = s === 'explain'
          ? `Trong ngữ cảnh: "${ctxP.slice(0, 800)}"\nHãy giải thích "${text}" — nghĩa, hàm ý, bối cảnh (lịch sử/triết học/văn hoá nếu có). Ngắn gọn, rõ.`
          : `Dịch "${text}" sang tiếng Việt (nếu đã là tiếng Việt thì dịch sang tiếng Anh). Kèm ghi chú sắc thái nghĩa ngắn.`;
        const out = await AI.withSpinner(t, () => AI.ask({ prompt, effort: 'low' }));
        if (out) {
          modal({
            title: '✦ ' + (s === 'explain' ? 'Giải thích' : 'Dịch'), body: `<blockquote class="q-src">${esc(text)}</blockquote><div class="ai-out">${esc(out).replace(/\n/g, '<br>')}</div>`,
            actions: [{ label: 'Lưu thành ghi chú', cls: 'pri', onClick: () => { const n = addMark(s === 'explain' ? 'blue' : 'green'); if (n) { n.note = out; persist(); renderNotes(); } } }]
          });
        }
      }
      getSelection().removeAllRanges(); hidePop();
    });

    function wrapRange(range, id, cls) {
      let root = range.commonAncestorContainer; if (root.nodeType !== 1) root = root.parentNode;
      const nodes = []; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => range.intersectsNode(n) ? 1 : 2 });
      while (w.nextNode()) nodes.push(w.currentNode);
      nodes.forEach(n => {
        let s = 0, e = n.length;
        if (n === range.startContainer) s = range.startOffset;
        if (n === range.endContainer) e = range.endOffset;
        if (s >= e || !n.nodeValue.slice(s, e).trim()) return;
        const mid = n.splitText(s); mid.splitText(e - s);
        const m = document.createElement('mark'); m.className = cls; m.dataset.id = id;
        mid.parentNode.insertBefore(m, mid); m.appendChild(mid);
      });
    }
    function addMark(color, style = '') {
      if (!curRange) return;
      const id = uid(); const text = curRange.toString().trim();
      if (!text) return;
      wrapRange(curRange, id, `hl hl-${color} ${style ? 'hs-' + style : ''}`);
      const n = { id, color, style, text, note: '', tags: [], ts: Date.now() };
      doc.notes.push(n); persist(); renderNotes(); buildToc();
      Activity.add('note');
      return n;
    }
    const marksOf = id => $$(`mark[data-id="${id}"]`, art);
    function removeMark(id) {
      marksOf(id).forEach(m => { m.replaceWith(...m.childNodes); });
      art.normalize();
      doc.notes = doc.notes.filter(n => n.id !== id); persist(); renderNotes();
    }

    /* ---- popup khi bấm vào chỗ đã tô ---- */
    const mp = $('#markPop');
    art.addEventListener('click', e => {
      const m = e.target.closest('mark.hl'); if (!m || penOn) { mp.hidden = true; return; }
      const n = doc.notes.find(x => x.id === m.dataset.id); if (!n) return;
      const r = m.getBoundingClientRect();
      mp.hidden = false;
      mp.style.top = (r.bottom + 8) + 'px'; mp.style.left = clamp(r.left, 8, innerWidth - 300) + 'px';
      mp.innerHTML = `<div class="mp-row">${HL.map(h => `<span class="sw ${n.color === h[0] ? 'on' : ''}" data-c="${h[0]}" style="background:${h[1]}" title="${h[2]}"></span>`).join('')}</div>
        ${n.note ? `<div class="mp-note">${esc(n.note)}</div>` : ''}
        ${n.tags?.length ? `<div class="mp-tags">${n.tags.map(t => `<span class="tag">#${esc(t)}</span>`).join('')}</div>` : ''}
        <div class="mp-row"><button data-a="edit">📝 Ghi chú</button><button data-a="del">🗑 Bỏ tô</button></div>`;
      mp.onclick = ev => {
        const c = ev.target.closest('[data-c]')?.dataset.c; const a = ev.target.closest('[data-a]')?.dataset.a;
        if (c) { n.color = c; marksOf(n.id).forEach(x => x.className = `hl hl-${c} ${n.style ? 'hs-' + n.style : ''} ${n.note ? 'has-note' : ''}`); persist(); renderNotes(); }
        if (a === 'edit') openNoteEditor(n);
        if (a === 'del') removeMark(n.id);
        mp.hidden = true;
      };
    });
    document.addEventListener('mousedown', closeMp);
    function closeMp(e) { if (!mp.contains(e.target) && !e.target.closest('mark.hl')) mp.hidden = true; }

    function openNoteEditor(n) {
      if (!n) return;
      modal({
        title: '📝 Ghi chú cho đoạn tô', wide: true,
        body: `<blockquote class="q-src hl-${n.color}">${esc(n.text)}</blockquote>
          <label class="lbl">Ghi chú của bạn</label><textarea class="inp" id="nn" rows="6" placeholder="Suy nghĩ, liên hệ, câu hỏi…">${esc(n.note)}</textarea>
          <label class="lbl">Thẻ (cách nhau bởi dấu phẩy)</label><input class="inp" id="nt" value="${esc((n.tags || []).join(', '))}" placeholder="vd: hiện sinh, ẩn dụ, ôn thi">
          <label class="lbl">Mức độ</label><div class="seg" id="nlv">${['⭐', '⭐⭐', '⭐⭐⭐'].map((s, i) => `<button class="${(n.level || 0) === i + 1 ? 'on' : ''}" data-l="${i + 1}">${s}</button>`).join('')}</div>`,
        onOpen: w => { $('#nn', w).focus(); $$('#nlv button', w).forEach(b => b.onclick = () => { $$('#nlv button', w).forEach(x => x.classList.remove('on')); b.classList.add('on'); n.level = +b.dataset.l; }); },
        actions: [{ label: 'Lưu', cls: 'pri', onClick: w => {
          n.note = $('#nn', w).value.trim(); n.tags = $('#nt', w).value.split(',').map(s => s.trim()).filter(Boolean);
          marksOf(n.id).forEach(x => x.classList.toggle('has-note', !!n.note)); persist(); renderNotes();
        } }]
      });
    }

    /* ---- bảng ghi chú ---- */
    let filter = '';
    function renderNotes() {
      const q = ($('#ntSearch').value || '').toLowerCase();
      const order = n => { const m = marksOf(n.id)[0]; return m ? m.getBoundingClientRect().top + scroller.scrollTop : 1e9; };
      const list = doc.notes.filter(n => (!filter || n.color === filter) && (!q || (n.text + n.note + (n.tags || []).join(' ')).toLowerCase().includes(q))).sort((a, b) => order(a) - order(b));
      $('#ntList').innerHTML = list.length ? list.map(n => `
        <div class="nt-item c-${n.color}" data-id="${n.id}">
          <div class="nt-q ${n.style ? 'hs-' + n.style : ''}">“${esc(n.text.slice(0, 280))}”</div>
          ${n.note ? `<div class="nt-n">${esc(n.note)}</div>` : ''}
          <div class="nt-f">${(n.tags || []).map(t => `<span class="tag">#${esc(t)}</span>`).join('')}${n.level ? `<span>${'⭐'.repeat(n.level)}</span>` : ''}<span class="muted">${fmtDateTime(n.ts)}</span>
            <span class="grow"></span><button data-a="go" title="Đi tới">↗</button><button data-a="edit" title="Sửa">✎</button><button data-a="del" title="Xoá">🗑</button></div>
        </div>`).join('') : `<div class="empty sm">${Art.creature('pencil', { size: 60, mood: 'calm' })}<p>Bôi đen chữ trong bài để tô màu & ghi chú.</p></div>`;
      $('#ncount').textContent = doc.notes.length;
      $('#ntBm').innerHTML = (doc.bookmarks || []).map((b, i) => `<span class="bm" data-i="${i}">🔖 ${esc(b.label)} <i data-del="${i}">✕</i></span>`).join('');
    }
    $('#ntList').addEventListener('click', e => {
      const it = e.target.closest('.nt-item'); if (!it) return;
      const n = doc.notes.find(x => x.id === it.dataset.id); const a = e.target.closest('[data-a]')?.dataset.a;
      if (a === 'del') return removeMark(n.id);
      if (a === 'edit') return openNoteEditor(n);
      const m = marksOf(n.id)[0]; if (m) { m.scrollIntoView({ behavior: 'smooth', block: 'center' }); m.classList.add('flash'); setTimeout(() => m.classList.remove('flash'), 1400); }
    });
    $('#ntBm').addEventListener('click', e => {
      const d = e.target.dataset.del; if (d !== undefined) { doc.bookmarks.splice(+d, 1); persist(); renderNotes(); return; }
      const b = e.target.closest('.bm'); if (b) { const bm = doc.bookmarks[+b.dataset.i]; scroller.scrollTo({ top: bm.pct * (scroller.scrollHeight - scroller.clientHeight), behavior: 'smooth' }); }
    });
    $$('.nt-legend .lg', rd).forEach(b => b.onclick = () => { $$('.nt-legend .lg', rd).forEach(x => x.classList.remove('on')); b.classList.add('on'); filter = b.dataset.f; renderNotes(); });
    $('#ntSearch').oninput = renderNotes;
    $('#ntGeneral').oninput = debounce(e => { doc.general = e.target.value; persist(); }, 400);
    $('#ntClose').onclick = () => { $('#rdNotes').hidden = true; setTimeout(redrawPen, 50); };
    $('#ntExport').onclick = () => {
      let md = `# ${doc.title}\n\n> Xuất ngày ${fmtDate(Date.now())}\n\n`;
      if (doc.general) md += `## Ghi chú chung\n\n${doc.general}\n\n`;
      HL.forEach(h => { const ns = doc.notes.filter(n => n.color === h[0]); if (!ns.length) return; md += `## ${h[2]}\n\n`; ns.forEach(n => { md += `- “${n.text}”\n`; if (n.note) md += `  - ✎ ${n.note}\n`; if (n.tags?.length) md += `  - ${n.tags.map(t => '#' + t).join(' ')}\n`; }); md += '\n'; });
      download((doc.title || 'ghi-chu') + ' - ghi chú.md', md, 'text/markdown');
    };
    $('#ntSum').onclick = async e => {
      const out = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: `Tóm tắt bài sau thành: (1) 3 câu ý chính, (2) 5 gạch đầu dòng chi tiết, (3) 3 câu hỏi để suy ngẫm.\n"""${art.innerText.slice(0, 30000)}"""`, effort: 'low' }));
      if (out) { doc.general = (doc.general ? doc.general + '\n\n' : '') + '✦ Tóm tắt AI:\n' + out; $('#ntGeneral').value = doc.general; persist(); }
    };
    renderNotes();

    /* ---- thanh điều khiển ---- */
    let penOn = false, speaking = false;
    $('.rd-ctrl', rd).addEventListener('click', async e => {
      const b = e.target.closest('[data-r]'); if (!b || b.tagName === 'SELECT') return;
      const k = b.dataset.r;
      if (k === 'bigger') { R.size = clamp(R.size + 1, 13, 34); applyR(); }
      if (k === 'smaller') { R.size = clamp(R.size - 1, 13, 34); applyR(); }
      if (k === 'toc') { $('#rdToc').hidden = !$('#rdToc').hidden; setTimeout(redrawPen, 50); }
      if (k === 'notes') { $('#rdNotes').hidden = !$('#rdNotes').hidden; setTimeout(redrawPen, 50); }
      if (k === 'focus') { R.focus = !R.focus; applyR(); }
      if (k === 'fs') { document.fullscreenElement ? document.exitFullscreen() : rd.requestFullscreen?.(); }
      if (k === 'pen') { penOn = !penOn; rd.classList.toggle('pen-on', penOn); $('#penBar').hidden = !penOn; b.classList.toggle('on', penOn); redrawPen(); }
      if (k === 'bookmark') {
        const max = scroller.scrollHeight - scroller.clientHeight; const pct = max > 0 ? scroller.scrollTop / max : 0;
        const label = await promptBox('Tên dấu trang', `Vị trí ${Math.round(pct * 100)}%`);
        if (label) { doc.bookmarks = doc.bookmarks || []; doc.bookmarks.push({ label, pct }); persist(); renderNotes(); $('#rdNotes').hidden = false; }
      }
      if (k === 'speak') {
        if (speaking) { Speech.stop(); speaking = false; $$('.reading-now', art).forEach(x => x.classList.remove('reading-now')); return; }
        speaking = true;
        const paras = $$('p,h1,h2,h3,h4,li,blockquote', art).filter(p => p.textContent.trim());
        const go = i => {
          if (!speaking || i >= paras.length) { speaking = false; return; }
          $$('.reading-now', art).forEach(x => x.classList.remove('reading-now'));
          paras[i].classList.add('reading-now'); paras[i].scrollIntoView({ block: 'center', behavior: 'smooth' });
          const u = Speech.speak(paras[i].textContent, 'vi-VN', 1); if (u) u.onend = () => go(i + 1);
        };
        go(0);
      }
      if (k === 'ask') askDoc();
    });
    $('.rd-ctrl', rd).addEventListener('change', e => {
      const k = e.target.dataset.r, v = e.target.value;
      if (k === 'font') R.font = v; if (k === 'width') R.width = +v; if (k === 'lh') R.lh = +v; if (k === 'theme') R.theme = v;
      applyR();
    });

    function askDoc() {
      const hist = [];
      modal({
        title: '✦ Hỏi Chữ-tchi về bài này', wide: true,
        body: `<div class="chat" id="dchat"><div class="msg ai">${Art.creature('mascot', { size: 34, mood: 'joy' })}<div>Mình đã đọc bài rồi! Hỏi gì cũng được: ý chính, bối cảnh, phản biện, liên hệ…</div></div></div>
        <div class="chat-in"><input class="inp" id="dq" placeholder="Câu hỏi của bạn…"><button class="btn pri" id="dsend">Gửi</button></div>
        <div class="chips">${['Ý chính của bài là gì?', 'Bối cảnh lịch sử?', 'Phản biện lập luận chính', 'Liên hệ với tác phẩm khác', 'Tạo 5 câu hỏi ôn tập'].map(c => `<button class="chip">${c}</button>`).join('')}</div>`,
        onOpen: w => {
          const send = async q => {
            if (!q) return;
            const box = $('#dchat', w);
            box.insertAdjacentHTML('beforeend', `<div class="msg me"><div>${esc(q)}</div></div>`);
            hist.push({ role: 'user', content: hist.length ? q : `Bài viết:\n"""${art.innerText.slice(0, 40000)}"""\n\nCâu hỏi: ${q}` });
            $('#dq', w).value = '';
            const out = await AI.withSpinner($('#dsend', w), () => AI.ask({ messages: hist, system: 'Bạn là bạn đọc uyên bác, trả lời dựa trên bài viết và kiến thức chung.', effort: 'low' }));
            if (out) { hist.push({ role: 'assistant', content: out }); box.insertAdjacentHTML('beforeend', `<div class="msg ai">${Art.creature('mascot', { size: 34 })}<div>${esc(out).replace(/\n/g, '<br>')}</div></div>`); box.scrollTop = 1e9; }
            else hist.pop();
          };
          $('#dsend', w).onclick = () => send($('#dq', w).value.trim());
          $('#dq', w).onkeydown = e => { if (e.key === 'Enter') send($('#dq', w).value.trim()); };
          $$('.chip', w).forEach(c => c.onclick = () => send(c.textContent));
        }
      });
    }

    /* ---- bút vẽ tay ---- */
    const cv = $('#rdCanvas'), cx = cv.getContext('2d');
    let pc = '#2a2346', drawing = null;
    function redrawPen() {
      const W = page.clientWidth, H = page.scrollHeight;
      cv.width = W * devicePixelRatio; cv.height = H * devicePixelRatio; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      cx.clearRect(0, 0, W, H);
      doc.pen.forEach(s => stroke(s, W));
    }
    function stroke(s, W) {
      if (s.pts.length < 2) return;
      cx.globalAlpha = s.hl ? .35 : 1; cx.strokeStyle = s.c; cx.lineWidth = s.w * (s.hl ? 4 : 1) * W / 800; cx.lineCap = 'round'; cx.lineJoin = 'round';
      cx.beginPath(); cx.moveTo(s.pts[0][0] * W, s.pts[0][1] * W);
      s.pts.forEach(p => cx.lineTo(p[0] * W, p[1] * W)); cx.stroke(); cx.globalAlpha = 1;
    }
    cv.addEventListener('pointerdown', e => {
      if (!penOn) return; cv.setPointerCapture(e.pointerId);
      const W = page.clientWidth, r = cv.getBoundingClientRect();
      drawing = { c: pc, w: +$('#penW').value, hl: $('#penHL').checked, pts: [[(e.clientX - r.left) / W, (e.clientY - r.top) / W]] };
    });
    cv.addEventListener('pointermove', e => {
      if (!drawing) return; const W = page.clientWidth, r = cv.getBoundingClientRect();
      drawing.pts.push([(e.clientX - r.left) / W, (e.clientY - r.top) / W]);
      const n = drawing.pts.length; stroke({ ...drawing, pts: drawing.pts.slice(n - 2) }, W);
    });
    cv.addEventListener('pointerup', () => { if (drawing) { doc.pen.push(drawing); drawing = null; persist(); } });
    $$('[data-pc]', rd).forEach(s => s.onclick = () => { $$('[data-pc]', rd).forEach(x => x.classList.remove('on')); s.classList.add('on'); pc = s.dataset.pc; });
    $('#penUndo').onclick = () => { doc.pen.pop(); redrawPen(); persist(); };
    $('#penClear').onclick = async () => { if (await confirmBox('Xoá toàn bộ nét vẽ tay?')) { doc.pen = []; redrawPen(); persist(); } };
    const onResize = debounce(redrawPen, 150);
    window.addEventListener('resize', onResize);
    setTimeout(redrawPen, 300);
    $$('img', art).forEach(i => i.addEventListener('load', redrawPen));

    /* phím tắt */
    const onKey = e => {
      if (e.target.closest('input,textarea,[contenteditable]')) return;
      if (e.key === 'n') $('[data-r="notes"]', rd).click();
      if (e.key === 'f') $('[data-r="focus"]', rd).click();
      if (e.key === '+' || e.key === '=') $('[data-r="bigger"]', rd).click();
      if (e.key === '-') $('[data-r="smaller"]', rd).click();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('selectionchange', onSel);
      document.removeEventListener('mousedown', closeMp);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      Speech.stop();
    };
  }
};
