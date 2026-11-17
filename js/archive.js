/* =========================================================
   KHO LƯU TRỮ — bài tham khảo từ mọi nguồn + sổ trích dẫn
   ========================================================= */
const ARC_TYPES = [
  ['article', '📰 Bài báo / blog'], ['paper', '🎓 Bài nghiên cứu'], ['book', '📖 Trích sách'], ['video', '🎬 Video'],
  ['podcast', '🎧 Podcast'], ['social', '💬 Mạng xã hội'], ['note', '🗒️ Ghi chép'], ['other', '✦ Khác']
];
const ARC_STATUS = [['inbox', '📥 Chưa đọc'], ['reading', '👀 Đang đọc'], ['done', '✅ Đã đọc'], ['keep', '💎 Kinh điển']];
const typeName = t => (ARC_TYPES.find(x => x[0] === t) || ARC_TYPES[7])[1];

const Archive = {
  list(view, tab = '') {
    if (tab === 'trich-dan') return this.quotes(view);
    const S = Store.settings(); S.arcView = S.arcView || 'drawer';
    let q = '', type = '', status = '', tag = '';
    view.innerHTML = `
    <div class="page arc-page ${S.arcFit ? 'fit' : ''}" id="arcPage">
      <header class="page-hero" style="--hc:#9fdcff">
        <div class="ph-art scene">${Art.scene('archive')}</div>
        <div class="ph-txt">
          <div class="kicker">Tầng 2 · Kho Lưu Trữ</div>
          <h1>Tủ hồ sơ không đáy</h1>
          <p>Cất mọi bài viết tham khảo từ báo, sách, nghiên cứu, video, podcast… Mỗi tài liệu đều mở được ở chế độ đọc với đầy đủ công cụ ghi chú.</p>
          <div class="row"><button class="btn hot big" id="pasteArc">📋 Dán bài báo &amp; ghi chú</button><button class="btn pri big" id="addArc">＋ Cất tài liệu mới</button><a class="btn big" href="#/luu-tru/trich-dan">❝ Sổ trích dẫn</a></div>
        </div>
      </header>
      <div class="filter-row">
        <input class="inp" id="aq" placeholder="🔍 Tìm tiêu đề, tác giả, nguồn, nội dung…">
        <select class="inp sel" id="atype"><option value="">Mọi loại</option>${ARC_TYPES.map(t => `<option value="${t[0]}">${t[1]}</option>`).join('')}</select>
        <select class="inp sel" id="astatus"><option value="">Mọi trạng thái</option>${ARC_STATUS.map(t => `<option value="${t[0]}">${t[1]}</option>`).join('')}</select>
        <button class="btn sm" id="arcFit" title="Đổi bố cục trang">${S.arcFit ? '⇥⇤ Gọn giữa' : '↔ Vừa khung'}</button>
        <div class="seg" id="aview">${[['drawer', '🗄️ Ngăn kéo'], ['grid', '▦ Thẻ'], ['table', '☰ Bảng']].map(v => `<button data-v="${v[0]}" class="${S.arcView === v[0] ? 'on' : ''}">${v[1]}</button>`).join('')}</div>
      </div>
      <div class="tag-cloud" id="atags"></div>
      <div id="alist"></div>
    </div>`;
    const draw = () => {
      const all = Store.list('archive');
      const tags = {}; all.forEach(a => (a.tags || []).forEach(t => tags[t] = (tags[t] || 0) + 1));
      $('#atags').innerHTML = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([t, n]) => `<button class="tag ${tag === t ? 'on' : ''}" data-t="${esc(t)}" style="font-size:${12 + Math.min(8, n * 1.5)}px">#${esc(t)}</button>`).join('');
      const items = all.filter(a => (!type || a.type === type) && (!status || a.status === status) && (!tag || (a.tags || []).includes(tag)) &&
        (!q || [a.title, a.author, a.source, a.url, a.summary, stripHtml(a.content)].join(' ').toLowerCase().includes(q)));
      const el = $('#alist');
      if (!items.length) { el.className = ''; el.innerHTML = `<div class="empty big">${Art.creature('ghost', { size: 110 })}<p>Ngăn kéo trống trơn. Cất tài liệu đầu tiên nhé!</p></div>`; return; }
      if (S.arcView === 'table') {
        el.className = 'arc-table';
        el.innerHTML = `<table><thead><tr><th>Tiêu đề</th><th>Loại</th><th>Tác giả / nguồn</th><th>Trạng thái</th><th>⭐</th><th>Ngày cất</th><th></th></tr></thead><tbody>${items.map(a => `<tr><td><a href="#/doc/luu/${a.id}">${esc(a.title)}</a></td><td>${typeName(a.type)}</td><td>${esc(a.author || '')} <span class="muted">${esc(a.source || '')}</span></td><td>${(ARC_STATUS.find(s => s[0] === a.status) || ARC_STATUS[0])[1]}</td><td>${'★'.repeat(a.rating || 0)}</td><td>${fmtDate(a.created)}</td><td><button class="mini-btn" data-edit="${a.id}">✎</button></td></tr>`).join('')}</tbody></table>`;
      } else if (S.arcView === 'grid') {
        el.className = 'arc-grid';
        el.innerHTML = items.map(card).join('');
      } else {
        el.className = 'drawers';
        el.innerHTML = ARC_TYPES.map(([t, n]) => {
          const its = items.filter(a => (a.type || 'other') === t); if (!its.length) return '';
          return `<details class="drawer" open><summary><span class="dr-handle"></span>${n} <b>${its.length}</b></summary><div class="dr-in">${its.map(card).join('')}</div></details>`;
        }).join('');
      }
    };
    const card = a => `<div class="arc-card st-${a.status || 'inbox'}">
      <div class="ac-tab">${typeName(a.type).split(' ')[0]}</div>
      <h3><a href="#/doc/luu/${a.id}">${esc(a.title)}</a></h3>
      <div class="ac-meta">${esc(a.author || '')}${a.source ? ' · ' + esc(a.source) : ''}${a.url ? ` · <a href="${esc(a.url)}" target="_blank" rel="noopener">nguồn ↗</a>` : ''}</div>
      ${a.summary ? `<p class="ac-sum">${esc(a.summary.slice(0, 220))}</p>` : `<p class="ac-sum muted">${esc(stripHtml(a.content).slice(0, 160))}</p>`}
      <div class="pc-tags">${(a.tags || []).map(t => `<span class="tag">#${esc(t)}</span>`).join('')}</div>
      <div class="pc-foot"><span>${(ARC_STATUS.find(s => s[0] === a.status) || ARC_STATUS[0])[1]}</span>${a.rating ? `<span>${'★'.repeat(a.rating)}</span>` : ''}${a.notes?.length ? `<span>🖍 ${a.notes.length}</span>` : ''}${a.progress ? `<span>👁 ${a.progress}%</span>` : ''}<span class="grow"></span><button class="mini-btn" data-edit="${a.id}">✎</button></div>
    </div>`;
    draw();
    $('#aq').oninput = debounce(e => { q = e.target.value.toLowerCase(); draw(); }, 200);
    $('#atype').onchange = e => { type = e.target.value; draw(); };
    $('#astatus').onchange = e => { status = e.target.value; draw(); };
    $('#atags').onclick = e => { const t = e.target.dataset.t; if (t === undefined) return; tag = tag === t ? '' : t; draw(); };
    $$('#aview button').forEach(b => b.onclick = () => { S.arcView = b.dataset.v; Store.save('settings'); $$('#aview button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    $('#addArc').onclick = () => this.form(null, draw);
    $('#pasteArc').onclick = () => this.pasteNew();
    $('#arcFit').onclick = e => { S.arcFit = !S.arcFit; Store.save('settings'); $('#arcPage').classList.toggle('fit', S.arcFit); e.target.textContent = S.arcFit ? '⇥⇤ Gọn giữa' : '↔ Vừa khung'; };
    // dán thẳng (Ctrl+V) ở bất kỳ đâu trên trang Lưu trữ → tạo tài liệu và mở để ghi chú
    const onPaste = e => {
      if (e.target.closest('input,textarea,[contenteditable]') || document.querySelector('.modal-wrap')) return;
      const html = e.clipboardData?.getData('text/html'), txt = e.clipboardData?.getData('text/plain');
      if (!(html || txt) || (txt || '').trim().length < 80) return;
      e.preventDefault(); this.quickSave(html, txt);
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
    $('#alist').addEventListener('click', e => { const id = e.target.dataset.edit; if (id) this.form(Store.find('archive', id), draw); });
  },

  /** tạo tài liệu từ nội dung dán, đoán tiêu đề/tác giả/nguồn rồi mở chế độ đọc + ghi chú */
  quickSave(html, txt, url = '') {
    let content = html ? Editor.cleanPaste(html) : (txt || '').split(/\n{2,}/).map(p => `<p>${esc(p.trim()).replace(/\n/g, '<br>')}</p>`).join('');
    const d = document.createElement('div'); d.innerHTML = content;
    const h = d.querySelector('h1,h2');
    let title = (h?.textContent || '').trim();
    if (h && title) h.remove();
    if (!title) title = (d.textContent || txt || '').trim().split(/\n|(?<=[.!?。])\s/)[0].slice(0, 110) || 'Bài báo dán ' + fmtDate(Date.now());
    const plain = (() => { const t = document.createElement('div'); t.innerHTML = d.innerHTML.replace(/<\/(p|div|h\d|li|tr)>/g, '$&\n'); return t.textContent; })();
    const by = (plain.match(/(?:^|\n)\s*(?:By|Bởi|Tác giả:?)\s+((?:[A-ZÀ-Ỹ][\p{L}.'-]*\s?){1,4})\s*(?:\n|$)/u) || [])[1] || '';
    let source = ''; try { if (url) source = new URL(url).hostname.replace(/^www\./, ''); } catch (_) { }
    const words = wordCount(d.textContent || '');
    const a = Store.upsert('archive', { id: uid(), title, url, author: by.trim(), source, type: 'article', status: 'reading', tags: [], rating: 0, content: d.innerHTML, summary: '', notes: [] });
    Activity.add('archive', 2);
    toast(`Đã cất “${title.slice(0, 40)}” (${words.toLocaleString('vi')} chữ). Bôi đen để tô & ghi chú.`, 'ok', 4000);
    Router.go('/doc/luu/' + a.id);
  },
  pasteNew() {
    modal({
      title: '📋 Dán bài báo để đọc & ghi chú', wide: true,
      body: `<p class="muted">Mở bài báo trên web, bôi đen toàn bộ bài (Ctrl+A rồi bỏ phần thừa) và chép (Ctrl+C), rồi dán vào ô dưới. App giữ tiêu đề, đoạn, ảnh, bảng và bỏ quảng cáo, kiểu chữ lạ.<br>Mẹo: ở trang Lưu trữ, chỉ cần bấm <kbd>Ctrl</kbd>+<kbd>V</kbd> là tạo luôn.</p>
        <label class="lbl" for="pUrl">Link bài (không bắt buộc)</label><input class="inp" id="pUrl" placeholder="https://…">
        <div class="paste-zone" id="pZone" contenteditable="true" data-ph="Dán bài vào đây (Ctrl+V)…"></div>`,
      onOpen: w => {
        const z = $('#pZone', w); z.focus();
        z.addEventListener('paste', e => {
          const html = e.clipboardData.getData('text/html'), txt = e.clipboardData.getData('text/plain');
          e.preventDefault();
          z.innerHTML = html ? Editor.cleanPaste(html) : txt.split(/\n{2,}/).map(p => `<p>${esc(p)}</p>`).join('');
        });
      },
      actions: [{ label: 'Huỷ' }, { label: '📖 Cất & mở để ghi chú', cls: 'pri', onClick: w => {
        const z = $('#pZone', w); if (!z.textContent.trim()) { toast('Chưa dán gì cả', 'err'); return false; }
        this.quickSave(z.innerHTML, z.textContent, $('#pUrl', w).value.trim());
      } }]
    });
  },

  form(item, after) {
    const a = item || { id: uid(), title: '', url: '', author: '', source: '', type: 'article', status: 'inbox', tags: [], rating: 0, content: '', summary: '', notes: [] };
    let ed;
    modal({
      title: item ? '✎ Sửa tài liệu' : '＋ Cất tài liệu mới', full: true,
      body: `<div class="form-grid">
        <div class="fcol">
          <label class="lbl">Tiêu đề *</label><input class="inp" id="fTitle" value="${esc(a.title)}">
          <label class="lbl">Đường dẫn gốc</label><input class="inp" id="fUrl" value="${esc(a.url)}" placeholder="https://…">
          <div class="row2"><div><label class="lbl">Tác giả</label><input class="inp" id="fAuthor" value="${esc(a.author)}"></div><div><label class="lbl">Nguồn / ấn phẩm</label><input class="inp" id="fSource" value="${esc(a.source)}"></div></div>
          <div class="row2"><div><label class="lbl">Loại</label><select class="inp" id="fType">${ARC_TYPES.map(t => `<option value="${t[0]}" ${a.type === t[0] ? 'selected' : ''}>${t[1]}</option>`).join('')}</select></div>
          <div><label class="lbl">Trạng thái</label><select class="inp" id="fStatus">${ARC_STATUS.map(t => `<option value="${t[0]}" ${a.status === t[0] ? 'selected' : ''}>${t[1]}</option>`).join('')}</select></div></div>
          <label class="lbl">Thẻ</label><input class="inp" id="fTags" value="${esc((a.tags || []).join(', '))}" placeholder="triết học, khắc kỷ…">
          <label class="lbl">Đánh giá</label><div class="stars" id="fRate">${[1, 2, 3, 4, 5].map(i => `<span data-v="${i}" class="${i <= a.rating ? 'on' : ''}">★</span>`).join('')}</div>
          <label class="lbl">Tóm tắt của tôi</label><textarea class="inp" id="fSum" rows="5">${esc(a.summary)}</textarea>
          <div class="row"><button class="btn sm" id="fAiSum">✦ AI tóm tắt</button><button class="btn sm" id="fAiTag">✦ AI gợi ý thẻ</button><button class="btn sm" id="fAiMeta">✦ AI đoán tác giả/nguồn</button></div>
          ${item ? `<button class="btn sm danger" id="fDel">🗑 Xoá tài liệu</button>` : ''}
        </div>
        <div class="fcol grow"><label class="lbl">Nội dung (dán nguyên bài — giữ được định dạng, ảnh)</label><div id="fEd"></div></div>
      </div>`,
      onOpen: (w, close) => {
        ed = Editor.mount($('#fEd', w), { html: a.content, compact: true, placeholder: 'Dán nội dung bài viết vào đây…' });
        $$('#fRate span', w).forEach(s => s.onclick = () => { a.rating = +s.dataset.v; $$('#fRate span', w).forEach(x => x.classList.toggle('on', +x.dataset.v <= a.rating)); });
        const txt = () => ed.text().slice(0, 25000);
        $('#fAiSum', w).onclick = async e => { const o = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: `Tóm tắt tài liệu sau trong 4-6 câu, nêu luận điểm chính và điều đáng nhớ:\n"""${txt()}"""` })); if (o) $('#fSum', w).value = o; };
        $('#fAiTag', w).onclick = async e => { const o = await AI.withSpinner(e.currentTarget, () => AI.json({ prompt: `Gợi ý 4-6 thẻ ngắn tiếng Việt cho tài liệu:\n"""${txt().slice(0, 6000)}"""\nTrả về {"tags":[...]}` })); if (o) $('#fTags', w).value = [...new Set([...$('#fTags', w).value.split(',').map(s => s.trim()).filter(Boolean), ...o.tags])].join(', '); };
        $('#fAiMeta', w).onclick = async e => { const o = await AI.withSpinner(e.currentTarget, () => AI.json({ prompt: `Từ nội dung và URL sau, đoán tiêu đề, tác giả, nguồn. URL: ${$('#fUrl', w).value}\n"""${txt().slice(0, 4000)}"""\nTrả về {"title":"","author":"","source":""} (để trống nếu không chắc)` })); if (o) { if (!$('#fTitle', w).value) $('#fTitle', w).value = o.title || ''; if (!$('#fAuthor', w).value) $('#fAuthor', w).value = o.author || ''; if (!$('#fSource', w).value) $('#fSource', w).value = o.source || ''; } };
        $('#fDel', w) && ($('#fDel', w).onclick = async () => { close(); if (await confirmBox('Xoá tài liệu này?')) { Store.remove('archive', a.id); after && after(); } });
        $('#fUrl', w).onchange = e => { try { if (!$('#fSource', w).value) $('#fSource', w).value = new URL(e.target.value).hostname.replace('www.', ''); } catch (_) { } };
      },
      actions: [{ label: 'Huỷ' }, {
        label: '💾 Cất vào tủ', cls: 'pri', onClick: w => {
          const t = $('#fTitle', w).value.trim(); if (!t) { toast('Cần tiêu đề', 'err'); return false; }
          Object.assign(a, { title: t, url: $('#fUrl', w).value.trim(), author: $('#fAuthor', w).value.trim(), source: $('#fSource', w).value.trim(), type: $('#fType', w).value, status: $('#fStatus', w).value, tags: $('#fTags', w).value.split(',').map(s => s.trim()).filter(Boolean), summary: $('#fSum', w).value, content: ed.getHTML() });
          Store.upsert('archive', a); if (!item) Activity.add('archive', 2);
          toast('Đã cất vào tủ 🗄️'); after && after();
        }
      }]
    });
  },

  read(view, id) {
    const a = Store.find('archive', id); if (!a) return Router.go('/luu-tru');
    if (a.status === 'inbox') { a.status = 'reading'; Store.upsert('archive', a); }
    return Reader.open(view, {
      doc: a, back: '#/luu-tru', kind: 'archive',
      meta: `<span class="chip-c">${typeName(a.type)}</span> ${a.author ? `<span>✍ ${esc(a.author)}</span>` : ''} ${a.source ? `<span>· ${esc(a.source)}</span>` : ''} ${a.url ? `<a href="${esc(a.url)}" target="_blank" rel="noopener" class="mini-btn">Nguồn ↗</a>` : ''} ${a.summary ? `<details class="rd-sum"><summary>Tóm tắt của tôi</summary><p>${esc(a.summary)}</p></details>` : ''}`,
      onSave: d => { if (d.progress >= 98 && d.status !== 'keep') d.status = 'done'; Store.upsert('archive', d); }
    });
  },

  quotes(view) {
    let q = '';
    view.innerHTML = `<div class="page">
      <header class="page-hero" style="--hc:#ffd9b0">
        <div class="ph-art scene">${Art.scene('quotes')}</div>
        <div class="ph-txt"><div class="kicker">Tầng hầm · Sổ Trích Dẫn</div><h1>Những câu hay nhặt được</h1>
        <p>Bôi đen bất kỳ câu nào khi đọc rồi bấm ❝ để cất vào đây. Hoặc tự thêm tay.</p>
        <div class="row"><button class="btn pri" id="qAdd">＋ Thêm trích dẫn</button><button class="btn" id="qCard">🎴 Rút ngẫu nhiên</button><a class="btn" href="#/luu-tru">‹ Kho lưu trữ</a></div></div>
      </header>
      <input class="inp" id="qq" placeholder="🔍 Tìm câu, nguồn…">
      <div class="quote-wall" id="qw"></div></div>`;
    const draw = () => {
      const qs = Store.list('quotes').filter(x => !q || (x.text + x.source).toLowerCase().includes(q));
      $('#qw').innerHTML = qs.length ? qs.map((x, i) => `<figure class="qcard" style="--qc:${Art.palette[i % Art.palette.length]};--rot:${(hashStr(x.id) % 7) - 3}deg">
        <blockquote>${esc(x.text)}</blockquote><figcaption>— ${esc(x.source || 'không rõ')} ${x.ref ? `<a href="${esc(x.ref)}">↗</a>` : ''}</figcaption>
        <button class="qx" data-del="${x.id}">✕</button></figure>`).join('') : `<div class="empty big">${Art.creature('star', { size: 100, mood: 'sleep' })}<p>Chưa nhặt được câu nào.</p></div>`;
    };
    draw();
    $('#qq').oninput = e => { q = e.target.value.toLowerCase(); draw(); };
    $('#qw').onclick = async e => { const id = e.target.dataset.del; if (id && await confirmBox('Xoá trích dẫn?')) { Store.remove('quotes', id); draw(); } };
    $('#qAdd').onclick = () => modal({
      title: '❝ Trích dẫn mới', body: `<textarea class="inp" id="qt" rows="4" placeholder="Câu trích…"></textarea><input class="inp" id="qs" placeholder="Nguồn (tác giả, tác phẩm)">`,
      actions: [{ label: 'Lưu', cls: 'pri', onClick: w => { const t = $('#qt', w).value.trim(); if (t) { Store.upsert('quotes', { id: uid(), text: t, source: $('#qs', w).value }); draw(); } } }]
    });
    $('#qCard').onclick = () => {
      const qs = Store.list('quotes'); if (!qs.length) return toast('Chưa có trích dẫn', 'err');
      const x = qs[Math.floor(Math.random() * qs.length)];
      modal({ title: '🎴 Lá thăm hôm nay', body: `<div class="big-quote">${Art.creature('star', { size: 70, mood: 'joy' })}<blockquote>${esc(x.text)}</blockquote><cite>— ${esc(x.source || '')}</cite></div>` });
    };
  }
};
