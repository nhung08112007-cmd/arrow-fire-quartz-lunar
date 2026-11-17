/* =========================================================
   PHÒNG VIẾT — danh sách bài + trình soạn thảo toàn màn hình
   ========================================================= */
const CATS = [
  { id: 'van-hoc', name: 'Văn học', color: '#ff8fc8', c: 'booky', icon: '📚' },
  { id: 'triet-hoc', name: 'Triết học', color: '#b48cff', c: 'cloud', icon: '🦉' },
  { id: 'am-nhac', name: 'Âm nhạc', color: '#7ec8ff', c: 'note', icon: '🎼' },
  { id: 'hoi-hoa', name: 'Hội hoạ', color: '#ffd23f', c: 'pencil', icon: '🎨' },
  { id: 'lich-su', name: 'Lịch sử', color: '#ff8a3d', c: 'ghost', icon: '🏺' },
  { id: 'van-hoa', name: 'Văn hoá', color: '#8fd16a', c: 'tomato', icon: '🏮' },
  { id: 'ngon-ngu', name: 'Ngôn ngữ', color: '#19b5b0', c: 'prof', icon: '🔤' },
];
const catOf = id => CATS.find(c => c.id === id) || { id: '', name: 'Tự do', color: '#ddd', c: 'mascot', icon: '✦' };
const PAPERS = [
  ['plain', '📄 Trang trắng'], ['notebook', '📒 Sổ kẻ ngang'], ['dots', '▦ Sổ chấm bi'], ['grid', '▤ Giấy ô li'],
  ['letter', '✉️ Thư tay viền hoa'], ['magazine', '📰 Tạp chí 2 cột'], ['newspaper', '🗞️ Báo cổ 3 cột'],
  ['zine', '🩹 Zine băng dính'], ['scroll', '📜 Giấy cổ'], ['blueprint', '🔷 Bản vẽ xanh'], ['night', '🌙 Bảng đêm'], ['candy', '🍬 Kẹo ngọt'],
];

const TEMPLATES = {
  '': [['Trang trắng', ''], ['Tiểu luận 5 phần', '<h2>Mở đề</h2><p>…</p><h2>Luận điểm 1</h2><p>…</p><h2>Luận điểm 2</h2><p>…</p><h2>Phản đề</h2><p>…</p><h2>Kết luận</h2><p>…</p>'], ['Thư gửi…', Blocks.letter()]],
  'van-hoc': [['Phân tích tác phẩm', `${Blocks.person()}<h2>Hoàn cảnh ra đời</h2><p>…</p><h2>Tóm tắt</h2><p>…</p><h2>Nhân vật</h2><p>…</p><h2>Nghệ thuật</h2><p>…</p>${Blocks.pullquote()}<h2>Cảm nhận</h2><p>…</p>`], ['Bình một bài thơ', `${Blocks.verse()}<h2>Đọc chậm từng câu</h2><p>…</p><h2>Hình ảnh & nhạc điệu</h2><p>…</p>${Blocks.callout('key')}`]],
  'triet-hoc': [['Chân dung triết gia', `${Blocks.person()}<h2>Câu hỏi trung tâm</h2><p>…</p><h2>Lập luận</h2><ol><li>Tiền đề…</li><li>Tiền đề…</li><li>Kết luận…</li></ol>${Blocks.pullquote()}<h2>Phản biện</h2><p>…</p>${Blocks.callout('q')}`], ['Đối thoại kiểu Socrates', `<p>Bối cảnh…</p>${Blocks.dialogue()}<h2>Điều rút ra</h2><p>…</p>`]],
  'am-nhac': [['Review album', `${Blocks.track()}<h2>Không khí chung</h2><p>…</p><h2>Từng bài</h2><ol><li><b>Bài 1</b> — …</li><li><b>Bài 2</b> — …</li></ol>${Blocks.rating()}`], ['Nghe một bài hát', `<p>Dán link bằng nút ▶ trên thanh công cụ.</p>${Blocks.bilingual()}<h2>Cảm nhận</h2><p>…</p>`]],
  'hoi-hoa': [['Đọc một bức tranh', `${Blocks.artwork()}<h2>Cái nhìn đầu tiên</h2><p>…</p><h2>Bố cục</h2><p>…</p><h2>Màu sắc & ánh sáng</h2><p>…</p><h2>Biểu tượng</h2><p>…</p>${Blocks.callout('idea')}`]],
  'lich-su': [['Một sự kiện', `${Blocks.timeline()}<h2>Nguyên nhân</h2><p>…</p><h2>Diễn biến</h2><p>…</p><h2>Hệ quả</h2><p>…</p>${Blocks.compare()}`]],
  'van-hoa': [['Ghi chép văn hoá', `${Blocks.cols2()}<h2>Phong tục</h2><p>…</p>${Blocks.callout('info')}<h2>Món ăn / lễ hội</h2><p>…</p>`]],
  'ngon-ngu': [['Chuyện của một từ', `${Blocks.etym()}${Blocks.define()}<h2>Cách dùng</h2><p>…</p>${Blocks.bilingual()}`]],
};


/* đề bài gợi ý (không cần AI) */
const PROMPTS = {
  '': ['Viết về một buổi chiều bạn nhớ mãi, chỉ bằng âm thanh và mùi hương.', 'Một điều bạn từng tin chắc, giờ không còn tin nữa. Vì sao?', 'Thư gửi chính mình của 10 năm trước.', 'Mô tả căn phòng bạn đang ngồi như thể đây là cảnh mở đầu một cuốn tiểu thuyết.', 'Một từ bạn yêu, và câu chuyện đằng sau nó.'],
  'van-hoc': ['Nhân vật phụ nào trong một cuốn sách bạn đọc đáng được kể lại câu chuyện của riêng họ?', 'So sánh cách hai nhà văn khác nhau viết về cái chết.', 'Viết lại đoạn kết của một truyện ngắn quen thuộc theo hướng khác.', 'Một câu văn mở đầu khiến bạn không thể bỏ sách xuống. Phân tích vì sao.', 'Phong cảnh trong tác phẩm nói gì về nội tâm nhân vật?'],
  'triet-hoc': ['Hạnh phúc có phải là mục đích của đời sống không?', 'Nếu bạn biết mình sẽ sống lại đúng cuộc đời này vô số lần (Nietzsche), bạn sẽ thay đổi điều gì?', 'Tự do ý chí: bạn chọn bữa sáng nay, hay bữa sáng chọn bạn?', 'Đối thoại giữa Epictetus và một người dùng mạng xã hội.', 'Có nên nói dối để bảo vệ người khác không?'],
  'am-nhac': ['Một bài hát gắn với một nơi chốn. Kể lại nơi ấy qua bài hát.', 'Vì sao một số giai điệu buồn lại khiến ta thấy dễ chịu?', 'Review album bạn nghe nhiều nhất năm nay, từng bài một.', 'So sánh bản gốc và một bản cover bạn thích hơn.', 'Âm nhạc của một thập niên kể gì về xã hội thời đó?'],
  'hoi-hoa': ['Đứng trước một bức tranh 10 phút. Ghi lại mọi thứ bạn thấy theo thứ tự.', 'Màu sắc yêu thích của một hoạ sĩ và lý do có thể.', 'Một bức tranh tĩnh vật thực ra đang kể chuyện gì?', 'So sánh hai bức tranh cùng chủ đề ở hai thế kỷ khác nhau.', 'Viết như thể bạn là một nhân vật trong bức tranh.'],
  'lich-su': ['Một quyết định nhỏ đã thay đổi lịch sử lớn.', 'Một ngày bình thường của một người dân thường ở một thời đại xa.', 'Lịch sử được kể bởi kẻ thắng. Hãy kể từ phía bên kia.', 'Điều gì thực sự dẫn tới sự sụp đổ của một đế chế?', 'So sánh hai cuộc cách mạng.'],
  'van-hoa': ['Một món ăn và tất cả những ký ức đi kèm.', 'Phong tục nào ở quê bạn đang dần biến mất?', 'Một từ không thể dịch sang tiếng Việt, và thế giới quan đằng sau nó.', 'Lễ hội bạn muốn được tham dự nhất, và vì sao.', 'Hai nền văn hoá chào hỏi nhau như thế nào?'],
  'ngon-ngu': ['Chuyện của một từ mượn trong tiếng Việt.', 'Ngôn ngữ thứ hai thay đổi cách bạn suy nghĩ ra sao?', 'Một lỗi sai ngoại ngữ đáng nhớ của bạn.', 'So sánh cách tiếng Việt và tiếng Nhật thể hiện sự lịch sự.', 'Từ nào bạn thấy đẹp nhất về âm thanh, ở bất kỳ ngôn ngữ nào?']
};
/* HTML → Markdown đơn giản để xuất bài */
function htmlToMd(html) {
  const d = document.createElement('div'); d.innerHTML = html;
  const walk = (n, ctx = {}) => {
    if (n.nodeType === 3) return n.nodeValue.replace(/\s+/g, ' ');
    if (n.nodeType !== 1) return '';
    const kids = () => [...n.childNodes].map(c => walk(c, ctx)).join('');
    const t = n.tagName.toLowerCase();
    if (/^h[1-6]$/.test(t)) return '\n\n' + '#'.repeat(+t[1]) + ' ' + kids().trim() + '\n\n';
    if (t === 'p' || t === 'div' || t === 'figure' || t === 'aside' || t === 'nav' || t === 'details') return '\n\n' + kids().trim() + '\n\n';
    if (t === 'br') return '  \n';
    if (t === 'b' || t === 'strong') return '**' + kids() + '**';
    if (t === 'i' || t === 'em') return '*' + kids() + '*';
    if (t === 's' || t === 'strike') return '~~' + kids() + '~~';
    if (t === 'code') return '`' + kids() + '`';
    if (t === 'pre') return '\n\n```\n' + n.textContent + '\n```\n\n';
    if (t === 'a') return `[${kids()}](${n.getAttribute('href') || ''})`;
    if (t === 'img') return `![${n.alt || ''}](${(n.src || '').startsWith('data:') ? 'anh-nhung.png' : n.src})`;
    if (t === 'blockquote') return '\n\n' + kids().trim().split('\n').map(l => '> ' + l).join('\n') + '\n\n';
    if (t === 'ul' || t === 'ol') return '\n\n' + [...n.children].map((li, i) => (t === 'ol' ? (i + 1) + '. ' : (li.dataset.done ? (li.dataset.done === '1' ? '- [x] ' : '- [ ] ') : '- ')) + walk(li).trim()).join('\n') + '\n\n';
    if (t === 'table') return '\n\n' + [...n.rows].map((r, i) => '| ' + [...r.cells].map(c => c.textContent.trim().replace(/\|/g, '\\|')).join(' | ') + ' |' + (i === 0 ? '\n|' + [...r.cells].map(() => ' --- |').join('') : '')).join('\n') + '\n\n';
    if (t === 'sup' && n.classList.contains('fn')) return `[^${n.dataset.note}]`;
    if (t === 'mark') return '==' + kids() + '==';
    return kids();
  };
  return walk(d).replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
/* lịch sử phiên bản: lưu ảnh chụp bài theo thời gian */
const Versions = {
  list(id) { return Store.get('versions', {})[id] || []; },
  snap(p, force = false) {
    const all = Store.get('versions', {}); const v = all[p.id] = all[p.id] || [];
    const last = v[0];
    if (!force && last && (Date.now() - last.t < 5 * 60000 || last.content === p.content)) return;
    v.unshift({ t: Date.now(), title: p.title, content: p.content, words: p.words || 0 });
    if (v.length > 40) v.length = 40;
    Store.save('versions');
  }
};

const Write = {
  list(view, cat = '') {
    const S = Store.settings(); S.writeView = S.writeView || 'grid';
    let q = '', sort = 'updated';
    view.innerHTML = `
    <div class="page write-page">
      <header class="page-hero" style="--hc:#ffb3dd">
        <div class="ph-art scene">${Art.scene('write')}</div>
        <div class="ph-txt">
          <div class="kicker">Tầng 1 · Phòng Viết</div>
          <h1>Bàn viết của tôi</h1>
          <p>Nơi những ý nghĩ được ấp cho tới khi nở thành bài. Chọn một chủ đề, một kiểu giấy, rồi viết thật thoả thích.</p>
          <button class="btn pri big" id="newPost">✎ Viết bài mới</button>
        </div>
      </header>
      <div class="cat-row" id="catRow">
        <button class="cat ${!cat ? 'on' : ''}" data-c="">✦ Tất cả <b>${Store.list('posts').length}</b></button>
        ${CATS.map(c => `<button class="cat ${cat === c.id ? 'on' : ''}" data-c="${c.id}" style="--cc:${c.color}">${Art.creature(c.c, { size: 26 })} ${c.name} <b>${Store.list('posts').filter(p => p.cat === c.id).length}</b></button>`).join('')}
      </div>
      <div class="filter-row">
        <input class="inp" id="pq" placeholder="🔍 Tìm theo tiêu đề, nội dung, thẻ…">
        <select class="inp sel" id="psort"><option value="updated">Mới sửa</option><option value="created">Mới tạo</option><option value="title">A → Z</option><option value="words">Dài nhất</option></select>
        <select class="inp sel" id="pstatus"><option value="">Mọi trạng thái</option><option value="draft">Nháp</option><option value="done">Hoàn thành</option></select>
        <div class="seg" id="pview">${[['grid', '▦'], ['list', '☰'], ['mag', '📰']].map(v => `<button data-v="${v[0]}" class="${S.writeView === v[0] ? 'on' : ''}">${v[1]}</button>`).join('')}</div>
      </div>
      <div id="plist"></div>
    </div>`;
    const draw = () => {
      const st = $('#pstatus').value;
      let ps = Store.list('posts').filter(p => (!cat || p.cat === cat) && (!st || (p.status || 'draft') === st) && (!q || (p.title + ' ' + (p.tags || []).join(' ') + ' ' + stripHtml(p.content)).toLowerCase().includes(q)));
      ps.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (sort === 'title' ? (a.title || '').localeCompare(b.title || '') : (b[sort] || 0) - (a[sort] || 0)));
      $('#plist').className = 'posts v-' + S.writeView;
      $('#plist').innerHTML = ps.length ? ps.map(p => {
        const c = catOf(p.cat); const ex = stripHtml(p.content).slice(0, 180);
        return `<article class="post-card paper-${p.paper || 'plain'}" style="--cc:${c.color}">
          ${p.cover ? `<div class="pc-cover" style="background-image:url('${esc(p.cover)}')"></div>` : `<div class="pc-cover none">${Art.creature(c.c, { size: 64, mood: 'calm' })}</div>`}
          <div class="pc-body">
            <div class="pc-cat">${c.icon} ${c.name} ${p.pinned ? '· 📌' : ''} <span class="st st-${p.status || 'draft'}">${p.status === 'done' ? 'Hoàn thành' : 'Nháp'}</span></div>
            <h3><a href="#/doc/bai/${p.id}">${esc(p.title || 'Không tiêu đề')}</a></h3>
            ${p.subtitle ? `<p class="pc-sub">${esc(p.subtitle)}</p>` : ''}
            <p class="pc-ex">${esc(ex)}${ex.length >= 180 ? '…' : ''}</p>
            <div class="pc-tags">${(p.tags || []).map(t => `<span class="tag">#${esc(t)}</span>`).join('')}</div>
            <div class="pc-foot"><span>${(p.words || 0).toLocaleString('vi')} chữ · ${fmtDate(p.updated)}</span>${p.notes?.length ? `<span>🖍 ${p.notes.length}</span>` : ''}${p.progress ? `<span>👁 ${p.progress}%</span>` : ''}
              <span class="grow"></span><a class="mini-btn" href="#/doc/bai/${p.id}">Đọc</a><a class="mini-btn" href="#/viet/sua/${p.id}">Sửa</a><button class="mini-btn" data-more="${p.id}">⋯</button></div>
          </div></article>`;
      }).join('') : `<div class="empty big">${Art.creature('pencil', { size: 110, mood: 'sleep' })}<p>Chưa có bài nào ở đây. Bút chì đang ngủ gật…</p></div>`;
    };
    draw();
    $('#pq').oninput = debounce(e => { q = e.target.value.toLowerCase(); draw(); }, 200);
    $('#psort').onchange = e => { sort = e.target.value; draw(); };
    $('#pstatus').onchange = draw;
    $$('#pview button').forEach(b => b.onclick = () => { S.writeView = b.dataset.v; Store.save('settings'); $$('#pview button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    $$('#catRow .cat').forEach(b => b.onclick = () => Router.go('/viet' + (b.dataset.c ? '/c/' + b.dataset.c : '')));
    $('#newPost').onclick = () => Write.newDialog(cat);
    $('#plist').addEventListener('click', e => {
      const id = e.target.dataset.more; if (!id) return;
      const p = Store.find('posts', id);
      modal({
        title: esc(p.title || 'Bài viết'), body: `<div class="menu-list">
          <button data-a="pin">📌 ${p.pinned ? 'Bỏ ghim' : 'Ghim lên đầu'}</button>
          <button data-a="dup">⧉ Nhân bản</button>
          <button data-a="html">⇩ Xuất HTML</button>
          <button data-a="txt">⇩ Xuất văn bản</button>
          <button data-a="del" class="danger">🗑 Xoá bài</button></div>`,
        onOpen: (w, close) => $$('[data-a]', w).forEach(b => b.onclick = async () => {
          const a = b.dataset.a;
          if (a === 'pin') { p.pinned = !p.pinned; Store.upsert('posts', p); }
          if (a === 'dup') Store.upsert('posts', { ...structuredClone(p), id: uid(), title: p.title + ' (bản sao)', created: Date.now() });
          if (a === 'html') download((p.title || 'bai') + '.html', Write.exportHTML(p), 'text/html');
          if (a === 'txt') download((p.title || 'bai') + '.txt', p.title + '\n\n' + stripHtml(p.content));
          if (a === 'del') { close(); if (await confirmBox('Xoá vĩnh viễn bài này?')) { Store.remove('posts', p.id); draw(); } return; }
          close(); draw();
        })
      });
    });
  },

  newDialog(cat = '') {
    let chosenCat = cat;
    const tplList = () => (TEMPLATES[chosenCat] || []).concat(chosenCat ? TEMPLATES[''] : []);
    modal({
      title: '✎ Bài mới — chọn chủ đề & khuôn', wide: true,
      body: `<div class="pick-cats">${[{ id: '', name: 'Tự do', c: 'mascot', color: '#eee' }, ...CATS].map(c => `<button class="pk ${chosenCat === c.id ? 'on' : ''}" data-c="${c.id}" style="--cc:${c.color}">${Art.creature(c.c, { size: 46 })}<span>${c.name}</span></button>`).join('')}</div>
        <div class="lbl">Khuôn bài</div><div class="pick-tpl" id="ptpl"></div>
        <div class="lbl">Kiểu giấy</div><div class="pick-paper">${PAPERS.map((p, i) => `<button class="pp paper-${p[0]} ${i ? '' : 'on'}" data-p="${p[0]}"><span>${p[1]}</span></button>`).join('')}</div>`,
      onOpen: (w, close) => {
        let paper = 'plain';
        const drawT = () => { $('#ptpl', w).innerHTML = tplList().map((t, i) => `<button class="tp" data-i="${i}">${t[0]}</button>`).join(''); };
        drawT();
        $$('.pk', w).forEach(b => b.onclick = () => { chosenCat = b.dataset.c; $$('.pk', w).forEach(x => x.classList.toggle('on', x === b)); drawT(); });
        $$('.pp', w).forEach(b => b.onclick = () => { paper = b.dataset.p; $$('.pp', w).forEach(x => x.classList.toggle('on', x === b)); });
        $('#ptpl', w).onclick = e => {
          const i = e.target.closest('.tp')?.dataset.i; if (i === undefined) return;
          const t = tplList()[+i];
          const p = Store.upsert('posts', { id: uid(), title: '', subtitle: '', cat: chosenCat, tags: [], content: t[1] || '<p><br></p>', paper, status: 'draft', words: 0 });
          close(); Router.go('/viet/sua/' + p.id);
        };
      }
    });
  },

  edit(view, id) {
    const p = Store.find('posts', id);
    if (!p) return Router.go('/viet');
    const S = Store.settings(); S.ed = S.ed || { zoom: 100, width: 820, side: true };
    view.classList.add('full');
    view.innerHTML = `
    <div class="wed ${S.ed.side ? '' : 'noside'}" id="wed">
      <div class="wed-bar">
        <a class="rbtn" href="#/viet">‹ Bàn viết</a>
        <span class="wed-saved" id="saved">Đã lưu ✓</span>
        <span class="wed-wc" id="wc"></span>
        <span class="grow"></span>
        <label class="rlbl">Giấy <select class="rsel" id="paperSel">${PAPERS.map(x => `<option value="${x[0]}" ${p.paper === x[0] ? 'selected' : ''}>${x[1]}</option>`).join('')}</select></label>
        <label class="rlbl">Khổ <select class="rsel" id="widthSel">${[[640, 'Hẹp'], [820, 'Vừa'], [1040, 'Rộng'], [1320, 'Rất rộng'], [0, 'Tràn màn hình']].map(w => `<option value="${w[0]}" ${S.ed.width == w[0] ? 'selected' : ''}>${w[1]}</option>`).join('')}</select></label>
        <label class="rlbl">Thu phóng <input type="range" min="60" max="200" step="10" value="${S.ed.zoom}" id="zoomR"><b id="zoomV">${S.ed.zoom}%</b></label>
        <button class="rbtn" id="typeW" title="Cuộn giữ dòng đang gõ ở giữa">⌨ Máy chữ</button>
        <button class="rbtn" id="focusB" title="Làm mờ mọi đoạn trừ đoạn đang viết">◎ Tập trung</button>
        <button class="rbtn" id="histB" title="Lịch sử phiên bản">🕓 Lịch sử</button>
        <button class="rbtn" id="expB" title="Xuất bài">⇩ Xuất</button>
        <button class="rbtn" id="fsB" title="Toàn màn hình">⛶</button>
        <button class="rbtn" id="sideB" title="Bảng thông tin">◧</button>
        <a class="rbtn hot" href="#/doc/bai/${p.id}">👁 Đọc</a>
      </div>
      <div class="wed-main">
        <div class="wed-scroll" id="wscroll">
          <div class="wed-paper paper-${p.paper || 'plain'}" id="wpaper">
            <div class="wed-cover" id="wcover" ${p.cover ? `style="background-image:url('${esc(p.cover)}')"` : 'hidden'}></div>
            <div class="wed-cat" style="--cc:${catOf(p.cat).color}">${catOf(p.cat).icon} ${catOf(p.cat).name}</div>
            <textarea class="wed-title" id="wtitle" rows="1" placeholder="Tiêu đề bài viết…">${esc(p.title)}</textarea>
            <input class="wed-sub" id="wsub" placeholder="Phụ đề / sapo (không bắt buộc)" value="${esc(p.subtitle || '')}">
            <div id="edHost"></div>
          </div>
        </div>
        <aside class="wed-side">
          <div class="side-sec"><div class="lbl">Chủ đề</div>
            <div class="mini-cats">${[{ id: '', name: 'Tự do', c: 'mascot' }, ...CATS].map(c => `<button class="${p.cat === c.id ? 'on' : ''}" data-c="${c.id}" title="${c.name}">${Art.creature(c.c, { size: 28 })}<small>${c.name}</small></button>`).join('')}</div></div>
          <div class="side-sec"><div class="lbl">Thẻ</div><input class="inp sm" id="wtags" value="${esc((p.tags || []).join(', '))}" placeholder="cách nhau bởi dấu phẩy"><button class="btn sm" id="aiTags">✦ Gợi ý thẻ</button></div>
          <div class="side-sec"><div class="lbl">Ảnh bìa</div><div class="row"><button class="btn sm" id="coverF">📁 Tải ảnh</button><button class="btn sm" id="coverU">🔗 URL</button><button class="btn sm" id="coverX">✕</button></div></div>
          <div class="side-sec"><div class="lbl">Trạng thái</div><div class="seg" id="wst"><button data-s="draft" class="${p.status !== 'done' ? 'on' : ''}">Nháp</button><button data-s="done" class="${p.status === 'done' ? 'on' : ''}">Hoàn thành</button></div></div>
          <div class="side-sec"><div class="lbl">Bí ý tưởng?</div><button class="btn sm wide" id="promptB">💡 Gợi ý một đề bài</button><div id="promptOut" class="prompt-out"></div></div>
          <div class="side-sec"><div class="lbl">Liên kết</div><div id="wlinks" class="outline"></div><p class="muted sm">Gõ <code>[[</code> để liên kết tới bài, tài liệu hay sách khác. Ctrl + bấm để mở.</p></div>
          <div class="side-sec"><div class="lbl">Trợ lý AI</div>
            <button class="btn sm wide" id="aiTitle">✦ Gợi ý 5 tiêu đề</button>
            <button class="btn sm wide" id="aiSum">✦ Viết sapo</button>
            <button class="btn sm wide" id="aiReview">✦ Nhận xét cả bài</button></div>
          <div class="side-sec"><div class="lbl">Mục tiêu chữ</div><input class="inp sm" type="number" id="wgoal" value="${p.goal || 1000}"><div class="goal"><i id="goalBar"></i></div></div>
          <div class="side-sec"><div class="lbl">Dàn ý (tự động)</div><div class="outline" id="woutline"></div></div>
          <div class="side-sec mascot-tip">${Art.creature(catOf(p.cat).c, { size: 54, mood: 'joy' })}<p id="tip">Gõ <code>/</code> để chèn khối ngay tại chỗ, <code>[[</code> để liên kết bài khác. Bôi đen chữ rồi bấm <b>✦ AI</b> để trau chuốt.</p></div>
        </aside>
      </div>
    </div>`;
    const paper = $('#wpaper');
    const applyEd = () => {
      paper.style.maxWidth = S.ed.width ? S.ed.width + 'px' : 'none';
      paper.style.zoom = S.ed.zoom / 100;
      $('#zoomV').textContent = S.ed.zoom + '%';
      $('#wed').classList.toggle('noside', !S.ed.side);
      Store.save('settings');
    };
    applyEd();
    let lastWords = p.words || 0;
    const saveNow = () => {
      p.title = $('#wtitle').value; p.subtitle = $('#wsub').value;
      p.content = ed.getHTML();
      p.words = wordCount(ed.text());
      if (p.words > lastWords) Activity.add('write', Math.min(50, p.words - lastWords)), lastWords = p.words;
      Store.upsert('posts', p);
      Versions.snap(p);
      $('#saved').textContent = 'Đã lưu ✓ ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      stats();
    };
    const stats = () => {
      const t = ed.text(); const w = wordCount(t);
      const todayW = Math.round((Store.get('log', {})[today()] || {}).write || 0);
      $('#wc').textContent = `${w.toLocaleString('vi')} chữ · ~${Math.max(1, Math.round(w / 220))} phút đọc · hôm nay +${todayW.toLocaleString('vi')} chữ`;
      const links = $$('a.wiki', ed.el);
      $('#wlinks').innerHTML = links.length ? links.map(a => `<a href="${a.getAttribute('href')}">↗ ${esc(a.textContent)}</a>`).join('') : '<span class="muted">Chưa có liên kết.</span>';
      const g = +$('#wgoal').value || 1000; $('#goalBar').style.width = Math.min(100, w / g * 100) + '%';
      const hs = $$('h1,h2,h3,h4', ed.el);
      $('#woutline').innerHTML = hs.length ? hs.map((h, i) => `<a data-i="${i}" class="lv${h.tagName[1]}">${esc(h.textContent || '…')}</a>`).join('') : '<span class="muted">Thêm tiêu đề mục để thấy dàn ý.</span>';
    };
    const ed = Editor.mount($('#edHost'), {
      html: p.content, placeholder: 'Bắt đầu viết… (gõ / để chèn khối)',
      onChange: () => { $('#saved').textContent = 'Đang lưu…'; saveNow(); },
      context: () => `Chủ đề: ${catOf(p.cat).name}. Tiêu đề: ${$('#wtitle').value}`
    });
    stats();
    $('#woutline').onclick = e => { const i = e.target.dataset.i; if (i !== undefined) $$('h1,h2,h3,h4', ed.el)[+i].scrollIntoView({ behavior: 'smooth', block: 'center' }); };
    const fitT = () => { const t = $('#wtitle'); t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }; fitT(); setTimeout(fitT, 300);
    $('#wtitle').addEventListener('input', fitT); $('#wtitle').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); ed.el.focus(); } });
    $('#wtitle').oninput = debounce(saveNow, 500); $('#wsub').oninput = debounce(saveNow, 500);
    $('#wtags').onchange = e => { p.tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean); saveNow(); };
    $('#wgoal').onchange = e => { p.goal = +e.target.value; saveNow(); };
    $('#paperSel').onchange = e => { p.paper = e.target.value; paper.className = 'wed-paper paper-' + p.paper; saveNow(); };
    $('#widthSel').onchange = e => { S.ed.width = +e.target.value; applyEd(); };
    $('#zoomR').oninput = e => { S.ed.zoom = +e.target.value; applyEd(); };
    $('#sideB').onclick = () => { S.ed.side = !S.ed.side; applyEd(); };
    $('#fsB').onclick = () => document.fullscreenElement ? document.exitFullscreen() : $('#wed').requestFullscreen?.();
    let typeW = false;
    $('#typeW').onclick = e => { typeW = !typeW; e.target.classList.toggle('on', typeW); toast(typeW ? 'Chế độ máy chữ: dòng đang gõ luôn ở giữa' : 'Tắt chế độ máy chữ'); };
    ed.el.addEventListener('keyup', () => {
      if (!typeW) return; const s = getSelection(); if (!s.rangeCount) return;
      const r = s.getRangeAt(0).getBoundingClientRect(); const sc = $('#wscroll');
      sc.scrollBy({ top: r.top - sc.getBoundingClientRect().top - sc.clientHeight / 2, behavior: 'smooth' });
    });
    $$('.mini-cats button').forEach(b => b.onclick = () => {
      p.cat = b.dataset.c; $$('.mini-cats button').forEach(x => x.classList.toggle('on', x === b));
      const c = catOf(p.cat); const el = $('.wed-cat'); el.style.setProperty('--cc', c.color); el.innerHTML = `${c.icon} ${c.name}`; saveNow();
    });
    $$('#wst button').forEach(b => b.onclick = () => { p.status = b.dataset.s; $$('#wst button').forEach(x => x.classList.toggle('on', x === b)); if (p.status === 'done') { Activity.add('finish', 5); toast('Một bài nữa đã nở! 🐣'); } saveNow(); });
    const setCover = c => { p.cover = c; const el = $('#wcover'); el.hidden = !c; el.style.backgroundImage = c ? `url('${c}')` : ''; saveNow(); };
    $('#coverF').onclick = async () => { const f = await pickFile(); if (f) setCover(await fileToDataURL(f)); };
    $('#coverU').onclick = async () => { const u = await promptBox('URL ảnh bìa'); if (u) setCover(u); };
    $('#coverX').onclick = () => setCover('');
    const body = () => ed.text().slice(0, 20000);
    $('#aiTitle').onclick = async e => {
      const out = await AI.withSpinner(e.currentTarget, () => AI.json({ prompt: `Bài viết chủ đề ${catOf(p.cat).name}:\n"""${body()}"""\nĐề xuất 5 tiêu đề hay, giàu hình ảnh. Trả về {"titles":[...]}` }));
      if (out) modal({ title: '✦ Tiêu đề gợi ý', body: `<div class="menu-list">${out.titles.map(t => `<button data-t="${esc(t)}">${esc(t)}</button>`).join('')}</div>`, onOpen: (w, close) => $$('[data-t]', w).forEach(b => b.onclick = () => { $('#wtitle').value = b.dataset.t; saveNow(); close(); }) });
    };
    $('#aiSum').onclick = async e => { const out = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: `Viết một câu sapo (≤ 35 chữ) hấp dẫn cho bài:\n"""${body()}"""\nChỉ trả về câu sapo.` })); if (out) { $('#wsub').value = out; saveNow(); } };
    $('#aiTags').onclick = async e => { const out = await AI.withSpinner(e.currentTarget, () => AI.json({ prompt: `Đề xuất 4-6 thẻ (tag) ngắn gọn tiếng Việt cho bài:\n"""${body().slice(0, 6000)}"""\nTrả về {"tags":[...]}` })); if (out) { p.tags = [...new Set([...(p.tags || []), ...out.tags])]; $('#wtags').value = p.tags.join(', '); saveNow(); } };
    $('#aiReview').onclick = async e => {
      const out = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: `Đọc bài sau như một biên tập viên tạp chí văn hoá. Nhận xét: điểm mạnh, điểm cần sửa (cấu trúc, lập luận, câu chữ), 3 gợi ý cụ thể, và chấm điểm /10.\n"""${body()}"""`, effort: 'medium' }));
      if (out) modal({ title: '✦ Nhận xét của biên tập viên Chữ-tchi', wide: true, body: `<div class="ai-out">${esc(out).replace(/\n/g, '<br>')}</div>` });
    };
    let focusOn = false;
    $('#focusB').onclick = e => { focusOn = !focusOn; ed.focusMode(focusOn); e.target.classList.toggle('on', focusOn); };
    $('#histB').onclick = () => {
      saveNow(); Versions.snap(p, false);
      const vs = Versions.list(p.id);
      if (!vs.length) return toast('Chưa có phiên bản cũ. App tự lưu một phiên bản mỗi 5 phút khi bạn viết.');
      modal({
        title: '🕓 Lịch sử phiên bản', full: true,
        body: `<div class="hist"><div class="hist-list">${vs.map((v, i) => `<button data-i="${i}" class="${i ? '' : 'on'}"><b>${new Date(v.t).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}</b><small>${v.words.toLocaleString('vi')} chữ${i < vs.length - 1 ? ` · ${v.words - vs[i + 1].words >= 0 ? '+' : ''}${v.words - vs[i + 1].words}` : ''}</small></button>`).join('')}</div>
          <div class="hist-view prose" id="histView"></div></div>`,
        onOpen: w => {
          let cur = 0;
          const showV = i => { cur = i; $$('.hist-list button', w).forEach((b, j) => b.classList.toggle('on', j === i)); $('#histView', w).innerHTML = `<h1>${esc(vs[i].title || '')}</h1>` + vs[i].content; };
          showV(0); $$('.hist-list button', w).forEach(b => b.onclick = () => showV(+b.dataset.i));
          w._cur = () => cur;
        },
        actions: [{ label: 'Đóng' }, { label: '↺ Khôi phục bản này', cls: 'pri', onClick: async w => {
          const v = vs[w._cur()]; Versions.snap(p, true);
          p.title = v.title; p.content = v.content; $('#wtitle').value = v.title || ''; ed.setHTML(v.content); saveNow(); toast('Đã khôi phục. Bản hiện tại vẫn được giữ trong lịch sử.');
        } }]
      });
    };
    $('#expB').onclick = () => modal({
      title: '⇩ Xuất bài', body: `<div class="menu-list"><button data-x="md">📝 Markdown (.md) — dán vào Notion, Obsidian…</button><button data-x="html">🌐 Trang HTML (.html)</button><button data-x="txt">📄 Văn bản thuần (.txt)</button><button data-x="print">🖨 In / lưu PDF</button><button data-x="copy">⧉ Chép Markdown vào bộ nhớ tạm</button></div>`,
      onOpen: (w, close) => $$('[data-x]', w).forEach(b => b.onclick = () => {
        saveNow(); const x = b.dataset.x, name = (p.title || 'bai-viet').slice(0, 60);
        const md = `# ${p.title || ''}\n\n${p.subtitle ? '*' + p.subtitle + '*\n\n' : ''}` + htmlToMd(p.content);
        if (x === 'md') download(name + '.md', md, 'text/markdown');
        if (x === 'html') download(name + '.html', Write.exportHTML(p), 'text/html');
        if (x === 'txt') download(name + '.txt', p.title + '\n\n' + stripHtml(p.content));
        if (x === 'copy') navigator.clipboard?.writeText(md).then(() => toast('Đã chép Markdown'), () => toast('Trình duyệt không cho chép', 'err'));
        if (x === 'print') { close(); location.hash = '/doc/bai/' + p.id; setTimeout(() => window.print(), 700); return; }
        close();
      })
    });
    $('#promptB').onclick = () => {
      const list = PROMPTS[p.cat] || PROMPTS['']; const q = list[Math.floor(Math.random() * list.length)];
      $('#promptOut').innerHTML = `<blockquote>${esc(q)}</blockquote><button class="btn sm" id="promptIns">＋ Chèn vào bài</button>`;
      $('#promptIns').onclick = () => { ed.el.insertAdjacentHTML('afterbegin', `<div class="blk callout c-q"><span class="ci" contenteditable="false">💡</span><div><b>Đề bài:</b> ${esc(q)}</div></div>`); saveNow(); };
    };
    const onKey = e => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveNow(); toast('Đã lưu ✓'); } };
    document.addEventListener('keydown', onKey);
    if (!p.title) $('#wtitle').focus();
    return () => { document.removeEventListener('keydown', onKey); saveNow(); ed.destroy && ed.destroy(); };
  },

  read(view, id) {
    const p = Store.find('posts', id); if (!p) return Router.go('/viet');
    const c = catOf(p.cat);
    return Reader.open(view, {
      doc: p, back: '#/viet', kind: 'post',
      meta: `<span class="chip-c" style="--cc:${c.color}">${c.icon} ${c.name}</span> <span>${fmtDate(p.created)}</span> ${(p.tags || []).map(t => `<span class="tag">#${esc(t)}</span>`).join(' ')} <a class="mini-btn" href="#/viet/sua/${p.id}">✎ Sửa</a>`,
      onSave: (d) => Store.upsert('posts', d),
      extra: (() => {
        const back = [...Store.list('posts'), ...Store.list('archive')].filter(x => x.id !== p.id && (x.content || '').includes(`data-id="${p.id}"`));
        return back.length ? `<section class="backlinks"><h4>🔗 Được nhắc tới trong</h4>${back.map(x => `<a href="#/doc/${x.cat !== undefined ? 'bai' : 'luu'}/${x.id}">${esc(x.title || 'Không tiêu đề')}</a>`).join('')}</section>` : '';
      })()
    });
  },

  exportHTML(p) {
    return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>${esc(p.title)}</title><style>body{font-family:Lora,Georgia,serif;max-width:760px;margin:40px auto;padding:0 20px;line-height:1.8;color:#2a2346}img{max-width:100%}blockquote{border-left:4px solid #ff8fc8;padding-left:16px;font-style:italic}.blk{margin:1.2em 0;padding:12px 16px;border:2px solid #2a2346;border-radius:12px}mark{background:#fff176}</style></head><body><h1>${esc(p.title)}</h1>${p.subtitle ? `<p><em>${esc(p.subtitle)}</em></p>` : ''}${p.content}</body></html>`;
  }
};
