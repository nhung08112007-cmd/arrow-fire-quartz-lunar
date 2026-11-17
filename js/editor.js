/* =========================================================
   EDITOR — trình soạn thảo đa định dạng (dùng cho bài viết,
   review sách, ghi chú ngữ pháp, lưu trữ…)
   ========================================================= */
const Blocks = {
  callout: (k = 'info') => {
    const m = { info: ['💡', 'Ghi chú'], warn: ['⚠️', 'Lưu ý'], idea: ['🌱', 'Ý tưởng'], q: ['❓', 'Câu hỏi mở'], key: ['🔑', 'Điểm then chốt'] }[k];
    return `<div class="blk callout c-${k}"><span class="ci" contenteditable="false">${m[0]}</span><div><b>${m[1]}:</b> nội dung…</div></div><p><br></p>`;
  },
  speech: (c = 'mascot') => `<div class="blk speech"><span class="sp-av" contenteditable="false" data-c="${c}">${Art.creature(c, { size: 56 })}</span><div class="sp-b">Nhân vật nói gì đó ở đây…</div></div><p><br></p>`,
  pullquote: () => `<blockquote class="blk pullquote">“Một câu trích thật đắt giá.”<cite>— Tác giả</cite></blockquote><p><br></p>`,
  verse: () => `<div class="blk verse">Dòng thơ thứ nhất<br>Dòng thơ thứ hai<br>Dòng thơ thứ ba<br>Dòng thơ thứ tư<div class="verse-src">— Tên bài thơ</div></div><p><br></p>`,
  dialogue: () => `<div class="blk dialogue"><p><b class="who">A:</b> Câu thoại…</p><p><b class="who">B:</b> Câu đáp…</p></div><p><br></p>`,
  timeline: () => `<ul class="blk timeline"><li><b>1802</b> Sự kiện thứ nhất</li><li><b>1858</b> Sự kiện thứ hai</li><li><b>1945</b> Sự kiện thứ ba</li></ul><p><br></p>`,
  bilingual: () => `<div class="blk bilingual"><div class="bl-l"><small>Nguyên văn</small><p>Original text…</p></div><div class="bl-r"><small>Bản dịch</small><p>Bản dịch…</p></div></div><p><br></p>`,
  cols2: () => `<div class="blk cols c2"><div><p>Cột trái…</p></div><div><p>Cột phải…</p></div></div><p><br></p>`,
  cols3: () => `<div class="blk cols c3"><div><p>Cột 1…</p></div><div><p>Cột 2…</p></div><div><p>Cột 3…</p></div></div><p><br></p>`,
  toggle: () => `<details class="blk toggle"><summary>Bấm để mở…</summary><p>Nội dung ẩn…</p></details><p><br></p>`,
  define: () => `<div class="blk define"><div class="df-term">Thuật ngữ <small>/phiên âm/ · danh từ</small></div><div class="df-def">Định nghĩa…</div></div><p><br></p>`,
  etym: () => `<div class="blk etym"><div class="et-word">từ</div><div class="et-chain"><span>Gốc Hy Lạp</span> → <span>Latin</span> → <span>Pháp cổ</span> → <span>Hiện đại</span></div><p>Câu chuyện của từ…</p></div><p><br></p>`,
  track: () => `<div class="blk track"><div class="tr-disc" contenteditable="false"></div><div><div class="tr-title">Tên bài hát</div><div class="tr-meta">Nghệ sĩ · Album · Năm</div><p>Cảm nhận…</p></div></div><p><br></p>`,
  artwork: () => `<figure class="blk artwork"><div class="aw-frame"><img src="" alt="" data-ph="1"></div><figcaption><b>Tên tác phẩm</b>, Hoạ sĩ, năm · chất liệu · nơi lưu giữ</figcaption></figure><p><br></p>`,
  person: () => `<div class="blk person"><div class="ps-av" contenteditable="false">${Art.creature('booky', { size: 60, mood: 'calm' })}</div><div><div class="ps-name">Tên nhân vật</div><div class="ps-meta">(năm sinh – năm mất) · quốc gia · trường phái</div><ul><li>Tư tưởng chính…</li><li>Tác phẩm tiêu biểu…</li></ul></div></div><p><br></p>`,
  compare: () => `<table class="blk compare"><thead><tr><th>Tiêu chí</th><th>A</th><th>B</th></tr></thead><tbody><tr><td>…</td><td>…</td><td>…</td></tr><tr><td>…</td><td>…</td><td>…</td></tr></tbody></table><p><br></p>`,
  table: () => `<table class="blk tbl"><thead><tr><th>Cột 1</th><th>Cột 2</th><th>Cột 3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table><p><br></p>`,
  divider: (k = 'stars') => `<div class="blk divider dv-${k}" contenteditable="false"></div><p><br></p>`,
  code: () => `<pre class="blk code"><code>// code…</code></pre><p><br></p>`,
  checklist: () => `<ul class="checklist"><li data-done="0">Việc thứ nhất</li><li data-done="0">Việc thứ hai</li></ul><p><br></p>`,
  letter: () => `<div class="blk letterbox"><p>Thân gửi …,</p><p>…</p><p class="sign">Thương, …</p></div><p><br></p>`,
  rating: () => `<div class="blk rating" contenteditable="false" data-v="4">🥚🥚🥚🥚<span class="off">🥚</span></div><p><br></p>`,
  marginal: () => `<aside class="blk marginal">Ghi chú lề: một ý nhỏ bên cạnh…</aside><p><br></p>`,
  toc: () => `<nav class="blk toc-ph" contenteditable="false">📑 Mục lục tự động (hiển thị khi đọc)</nav><p><br></p>`,
};

const BLOCK_MENU = [
  ['Hộp chú thích', [['💡 Ghi chú', 'callout:info'], ['⚠️ Lưu ý', 'callout:warn'], ['🌱 Ý tưởng', 'callout:idea'], ['❓ Câu hỏi mở', 'callout:q'], ['🔑 Then chốt', 'callout:key']]],
  ['Nhân vật nói', Art.names.map(n => [Art.creature(n, { size: 22 }) + ' ' + n, 'speech:' + n])],
  ['Văn chương', [['❝ Trích dẫn lớn', 'pullquote'], ['🪶 Thơ / câu thơ', 'verse'], ['💬 Hội thoại', 'dialogue'], ['✉️ Thư tay', 'letter'], ['📝 Ghi chú lề', 'marginal']]],
  ['Lịch sử & triết', [['⏳ Dòng thời gian', 'timeline'], ['👤 Thẻ nhân vật', 'person'], ['⚖️ Bảng so sánh', 'compare']]],
  ['Ngôn ngữ', [['📖 Định nghĩa', 'define'], ['🌳 Từ nguyên', 'etym'], ['🌐 Song ngữ', 'bilingual']]],
  ['Nghệ thuật', [['🎵 Thẻ bài hát', 'track'], ['🖼️ Khung tranh', 'artwork'], ['🥚 Chấm điểm trứng', 'rating']]],
  ['Bố cục', [['▥ 2 cột', 'cols2'], ['▦ 3 cột', 'cols3'], ['▸ Khối thu gọn', 'toggle'], ['☑ Checklist', 'checklist'], ['▤ Bảng', 'table'], ['⌨ Code', 'code'], ['📑 Mục lục', 'toc']]],
  ['Đường kẻ', [['✦ Sao', 'divider:stars'], ['🥚 Trứng', 'divider:eggs'], ['〰 Sóng', 'divider:wave'], ['♪ Nốt nhạc', 'divider:notes'], ['• • •', 'divider:dots']]],
];

const FONTS = [['Mặc định', ''], ['Lora (serif)', 'Lora'], ['EB Garamond', 'EB Garamond'], ['Playfair', 'Playfair Display'], ['Noto Serif', 'Noto Serif'], ['Nunito', 'Nunito'], ['Baloo', 'Baloo 2'], ['Viết tay', 'Patrick Hand'], ['Itim', 'Itim'], ['Pixel', 'VT323']];
const COLORS = ['#2a2346', '#e8475f', '#ff8a3d', '#d4a106', '#3aa35a', '#19b5b0', '#2f6fd6', '#7a4fd6', '#d63a9b', '#888'];
const HILITES = ['#fff176', '#ffc6e0', '#c4ecff', '#cff5c0', '#e3d4ff', '#ffd9b0', 'transparent'];

const Editor = {
  /** làm sạch HTML dán từ web / Word / Google Docs: giữ cấu trúc (bảng, tiêu đề,
      danh sách, đậm/nghiêng, link, ảnh), bỏ style lạ làm mất viền bảng, lệch phông */
  cleanPaste(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script,style,meta,link,title,xml,colgroup,col,o\\:p').forEach(n => n.remove());
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_COMMENT); const cm = [];
    while (walker.nextNode()) cm.push(walker.currentNode); cm.forEach(n => n.remove());
    const unwrap = el => el.replaceWith(...el.childNodes);
    const KEEP = { a: ['href'], img: ['src', 'alt'], td: ['colspan', 'rowspan'], th: ['colspan', 'rowspan'], ol: ['start'] };
    [...doc.body.querySelectorAll('*')].reverse().forEach(el => {
      const tag = el.tagName.toLowerCase();
      if (tag.includes(':')) return unwrap(el);
      if (tag === 'b' && /^docs-internal-guid/.test(el.id || '')) return unwrap(el);
      const st = (el.getAttribute('style') || '').toLowerCase();
      if (tag === 'span' || tag === 'font') {
        let inner = el.innerHTML;
        if (/font-weight:\s*(bold|[6-9]00)/.test(st)) inner = `<b>${inner}</b>`;
        if (/font-style:\s*italic/.test(st)) inner = `<i>${inner}</i>`;
        if (/text-decoration[^;]*underline/.test(st)) inner = `<u>${inner}</u>`;
        const t = doc.createElement('template'); t.innerHTML = inner;
        return el.replaceWith(t.content);
      }
      [...el.attributes].forEach(a => { if (!(KEEP[tag] || []).includes(a.name)) el.removeAttribute(a.name); });
      if (tag === 'a') { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
    });
    doc.body.querySelectorAll('table').forEach(t => {
      t.className = 'tbl';
      if (!t.querySelector('th')) { const r = t.querySelector('tr'); if (r && t.rows.length > 1) [...r.cells].forEach(c => { const th = doc.createElement('th'); th.innerHTML = c.innerHTML; c.replaceWith(th); }); }
      const w = doc.createElement('div'); w.className = 'tbl-wrap'; t.replaceWith(w); w.appendChild(t);
    });
    doc.body.querySelectorAll('td p:only-child, th p:only-child').forEach(unwrap);
    return doc.body.innerHTML.replace(/ {2,}/g, ' ');
  },
  mount(host, { html = '', onChange, placeholder = 'Bắt đầu viết…', compact = false, context = () => '' } = {}) {
    host.innerHTML = `
    <div class="ed ${compact ? 'compact' : ''}">
      <div class="ed-tools">
        <div class="tg">
          <button data-c="undo" title="Hoàn tác (Ctrl+Z)">↶</button><button data-c="redo" title="Làm lại">↷</button>
        </div>
        <div class="tg">
          <select data-s="block" title="Kiểu đoạn"><option value="p">Đoạn văn</option><option value="h1">Tiêu đề 1</option><option value="h2">Tiêu đề 2</option><option value="h3">Tiêu đề 3</option><option value="h4">Tiêu đề 4</option><option value="blockquote">Trích dẫn</option><option value="pre">Code</option></select>
          <select data-s="font" title="Phông chữ">${FONTS.map(f => `<option value="${f[1]}">${f[0]}</option>`).join('')}</select>
          <select data-s="size" title="Cỡ chữ"><option value="">Cỡ</option>${[12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64].map(s => `<option>${s}</option>`).join('')}</select>
        </div>
        <div class="tg">
          <button data-c="bold" title="Đậm (Ctrl+B)"><b>B</b></button><button data-c="italic" title="Nghiêng"><i>I</i></button><button data-c="underline" title="Gạch chân"><u>U</u></button><button data-c="strikeThrough" title="Gạch ngang"><s>S</s></button>
          <button data-c="superscript" title="Chỉ số trên">x²</button><button data-c="subscript" title="Chỉ số dưới">x₂</button>
          <button data-x="smallcaps" title="Chữ hoa nhỏ">Aᴀ</button><button data-x="kbd" title="Phím">⌨</button><button data-x="inlinecode" title="Code nội dòng">&lt;/&gt;</button>
          <button data-c="removeFormat" title="Xoá định dạng">⌫</button>
        </div>
        <div class="tg pop-wrap">
          <button data-pop="color" title="Màu chữ">A<span class="cbar" style="background:#e8475f"></span></button>
          <button data-pop="hilite" title="Tô nền">🖍</button>
          <div class="pop" data-for="color">${COLORS.map(c => `<span class="sw" data-color="${c}" style="background:${c}"></span>`).join('')}</div>
          <div class="pop" data-for="hilite">${HILITES.map(c => `<span class="sw" data-hl="${c}" style="background:${c}"></span>`).join('')}</div>
        </div>
        <div class="tg">
          <button data-c="justifyLeft" title="Căn trái">⇤</button><button data-c="justifyCenter" title="Căn giữa">≡</button><button data-c="justifyRight" title="Căn phải">⇥</button><button data-c="justifyFull" title="Đều hai bên">☰</button>
          <button data-c="outdent" title="Lùi ra">⇠</button><button data-c="indent" title="Thụt vào">⇢</button>
          <select data-s="lh" title="Giãn dòng"><option value="">↕</option><option>1.3</option><option>1.6</option><option>1.9</option><option>2.2</option></select>
        </div>
        <div class="tg">
          <button data-c="insertUnorderedList" title="Danh sách">•≡</button><button data-c="insertOrderedList" title="Đánh số">1≡</button><button data-b="checklist" title="Checklist">☑</button>
          <button data-x="dropcap" title="Chữ cái đầu lớn">Ꭰ</button><button data-x="footnote" title="Chú thích cuối">¹</button>
        </div>
        <div class="tg">
          <button data-x="link" title="Liên kết">🔗</button><button data-x="image" title="Ảnh">🖼</button><button data-x="embed" title="Nhúng YouTube/Spotify/…">▶</button><button data-b="table" title="Bảng">▦</button>
        </div>
        <div class="tg pop-wrap">
          <button data-pop="blocks" class="hot" title="Chèn khối trình bày">＋ Khối</button>
          <div class="pop blocks-pop" data-for="blocks">${BLOCK_MENU.map(([g, items]) => `<div class="bp-g"><div class="bp-t">${g}</div>${items.map(([l, v]) => `<button data-b="${v}">${l}</button>`).join('')}</div>`).join('')}</div>
        </div>
        <div class="tg pop-wrap">
          <button data-pop="ai" class="hot ai" title="Trợ lý AI">✦ AI</button>
          <div class="pop ai-pop" data-for="ai">
            <button data-ai="continue">✍️ Viết tiếp đoạn này</button>
            <button data-ai="polish">✨ Trau chuốt đoạn chọn</button>
            <button data-ai="shorten">✂️ Rút gọn</button>
            <button data-ai="expand">🌱 Mở rộng ý</button>
            <button data-ai="poetic">🪶 Giọng văn chương</button>
            <button data-ai="formal">🎓 Giọng học thuật</button>
            <button data-ai="translate">🌐 Dịch đoạn chọn…</button>
            <button data-ai="explain">🔍 Giải thích khái niệm</button>
            <button data-ai="spell">🧹 Soát chính tả</button>
            <button data-ai="outline">🗺️ Gợi ý dàn ý</button>
            <button data-ai="counter">⚔️ Phản biện lập luận</button>
          </div>
        </div>
        <div class="tg"><button data-x="find" title="Tìm & thay (Ctrl+H)">🔎</button><button data-x="md" title="Mẹo Markdown">？</button></div>
      </div>
      <div class="ed-float" hidden></div>
      <div class="ed-area" contenteditable="true" spellcheck="true" data-ph="${esc(placeholder)}"></div>
    </div>`;
    const area = $('.ed-area', host);
    const floater = $('.ed-float', host);
    area.innerHTML = html || '<p><br></p>';
    document.execCommand('defaultParagraphSeparator', false, 'p');
    let savedRange = null;
    const save = () => { const s = getSelection(); if (s.rangeCount && area.contains(s.anchorNode)) savedRange = s.getRangeAt(0).cloneRange(); };
    const restore = () => { if (savedRange) { area.focus(); const s = getSelection(); s.removeAllRanges(); s.addRange(savedRange); } else area.focus(); };
    const changed = debounce(() => onChange && onChange(area.innerHTML), 500);
    const exec = (c, v = null) => { restore(); document.execCommand(c, false, v); changed(); save(); };
    const insert = h => { restore(); document.execCommand('insertHTML', false, h); changed(); };
    const wrapSel = (tag, attrs = '') => {
      restore(); const s = getSelection(); if (!s.rangeCount || s.isCollapsed) return toast('Hãy bôi đen chữ trước', 'err');
      const r = s.getRangeAt(0); const el = document.createElement('div'); el.appendChild(r.cloneContents());
      document.execCommand('insertHTML', false, `<${tag} ${attrs}>${el.innerHTML}</${tag}>`); changed();
    };
    const styleSel = (prop, val) => {
      restore(); document.execCommand('fontSize', false, '7');
      $$('font[size="7"]', area).forEach(f => { const sp = document.createElement('span'); sp.style[prop] = val; sp.innerHTML = f.innerHTML; f.replaceWith(sp); });
      changed();
    };
    const curBlock = () => { const s = getSelection(); let n = s.anchorNode; while (n && n !== area && !(n.nodeType === 1 && /^(P|H\d|LI|BLOCKQUOTE|PRE|DIV)$/.test(n.tagName))) n = n.parentNode; return n !== area ? n : null; };

    area.addEventListener('input', changed);
    area.addEventListener('keyup', save); area.addEventListener('mouseup', save);
    area.addEventListener('blur', save);

    /* toolbar */
    const tools = $('.ed-tools', host);
    tools.addEventListener('mousedown', e => { if (e.target.closest('button,.sw')) e.preventDefault(); });
    tools.addEventListener('click', async e => {
      const b = e.target.closest('button,.sw'); if (!b) return;
      if (b.dataset.pop) {
        const p = $(`.pop[data-for="${b.dataset.pop}"]`, tools);
        const open = p.classList.contains('open');
        $$('.pop.open', tools).forEach(x => x.classList.remove('open'));
        if (!open) p.classList.add('open');
        return;
      }
      $$('.pop.open', tools).forEach(x => x.classList.remove('open'));
      if (b.dataset.c) exec(b.dataset.c);
      else if (b.dataset.color) { exec('foreColor', b.dataset.color); $('.cbar', tools).style.background = b.dataset.color; }
      else if (b.dataset.hl) exec('hiliteColor', b.dataset.hl);
      else if (b.dataset.b) { const [k, a] = b.dataset.b.split(':'); insert(Blocks[k](a)); }
      else if (b.dataset.x) await extra(b.dataset.x);
      else if (b.dataset.ai) await aiAct(b.dataset.ai, b);
    });
    tools.addEventListener('change', e => {
      const s = e.target; const v = s.value;
      if (s.dataset.s === 'block') exec('formatBlock', v);
      if (s.dataset.s === 'font') { if (v) exec('fontName', v); else exec('removeFormat'); }
      if (s.dataset.s === 'size' && v) styleSel('fontSize', v + 'px');
      if (s.dataset.s === 'lh' && v) { restore(); const bl = curBlock(); if (bl) { bl.style.lineHeight = v; changed(); } }
      if (s.dataset.s !== 'block') s.value = '';
    });

    async function extra(x) {
      if (x === 'link') { save(); const u = await promptBox('Đường dẫn liên kết', 'https://'); if (u) exec('createLink', u); }
      if (x === 'image') {
        save();
        modal({
          title: 'Chèn ảnh', body: `<label class="lbl">Dán URL ảnh</label><input class="inp" id="imu" placeholder="https://…"><div class="or">hoặc</div><button class="btn" id="imf">📁 Chọn ảnh từ máy</button><label class="lbl">Chú thích</label><input class="inp" id="imc" placeholder="(không bắt buộc)">`,
          onOpen: (w, close) => { $('#imf', w).onclick = async () => { const f = await pickFile(); if (f) { const d = await fileToDataURL(f); ins(d, $('#imc', w).value); close(); } }; },
          actions: [{ label: 'Chèn', cls: 'pri', onClick: w => { const u = $('#imu', w).value.trim(); if (u) ins(u, $('#imc', w).value); } }]
        });
        const ins = (src, cap) => insert(`<figure class="fig" data-w="100"><img src="${esc(src)}" alt="">${cap ? `<figcaption>${esc(cap)}</figcaption>` : '<figcaption>Chú thích ảnh…</figcaption>'}</figure><p><br></p>`);
      }
      if (x === 'embed') {
        save(); const u = await promptBox('Dán link YouTube / Spotify / SoundCloud / Vimeo', '');
        if (!u) return; let src = u;
        let m;
        if ((m = u.match(/(?:youtu\.be\/|v=)([\w-]{11})/))) src = 'https://www.youtube.com/embed/' + m[1];
        else if ((m = u.match(/open\.spotify\.com\/(track|album|playlist|episode)\/(\w+)/))) src = `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
        else if ((m = u.match(/vimeo\.com\/(\d+)/))) src = 'https://player.vimeo.com/video/' + m[1];
        else if (u.includes('soundcloud.com')) src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(u);
        const tall = src.includes('spotify') ? 'sp' : (src.includes('soundcloud') ? 'sc' : 'vid');
        insert(`<div class="blk embed e-${tall}" contenteditable="false"><iframe src="${esc(src)}" allowfullscreen loading="lazy" allow="autoplay; encrypted-media"></iframe></div><p><br></p>`);
      }
      if (x === 'dropcap') { restore(); const bl = curBlock(); if (bl) { bl.classList.toggle('dropcap'); changed(); } }
      if (x === 'smallcaps') wrapSel('span', 'class="sc"');
      if (x === 'kbd') wrapSel('kbd');
      if (x === 'inlinecode') wrapSel('code');
      if (x === 'footnote') { save(); const t = await promptBox('Nội dung chú thích cuối trang'); if (t) insert(`<sup class="fn" contenteditable="false" data-note="${esc(t)}"></sup>&nbsp;`); }
      if (x === 'find') findReplace();
      if (x === 'md') modal({ title: 'Mẹo gõ nhanh', body: `<ul class="tips"><li><code>#</code> + dấu cách → Tiêu đề 1, <code>##</code> → Tiêu đề 2, <code>###</code> → 3</li><li><code>&gt;</code> + dấu cách → Trích dẫn</li><li><code>-</code> hoặc <code>*</code> + cách → Danh sách</li><li><code>1.</code> + cách → Đánh số</li><li><code>[]</code> + cách → Checklist</li><li><code>---</code> + Enter → Đường kẻ</li><li><code>/</code> ở đầu dòng trống → menu khối</li><li>Ctrl+B / I / U, Ctrl+Z, Ctrl+H tìm & thay</li><li>Bấm vào ảnh để đổi kích cỡ, căn trái/phải</li></ul>` });
    }

    function findReplace() {
      modal({
        title: 'Tìm & thay thế', body: `<input class="inp" id="fq" placeholder="Tìm…"><input class="inp" id="fr" placeholder="Thay bằng…"><p class="muted" id="fcount"></p>`,
        onOpen: w => { $('#fq', w).oninput = () => { const q = $('#fq', w).value; $('#fcount', w).textContent = q ? (area.textContent.split(q).length - 1) + ' kết quả' : ''; }; $('#fq', w).focus(); },
        actions: [{
          label: 'Thay tất cả', cls: 'pri', onClick: w => {
            const q = $('#fq', w).value, r = $('#fr', w).value; if (!q) return;
            const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT); let n, c = 0;
            while ((n = walker.nextNode())) if (n.nodeValue.includes(q)) { c += n.nodeValue.split(q).length - 1; n.nodeValue = n.nodeValue.split(q).join(r); }
            toast(`Đã thay ${c} chỗ`); changed();
          }
        }]
      });
    }

    async function aiAct(kind, btn) {
      save();
      const s = getSelection(); const sel = s.toString().trim();
      const bl = curBlock(); const blockText = bl ? bl.textContent : '';
      const all = area.innerText.slice(-6000);
      const ctx = context();
      const sys = 'Bạn là biên tập viên tinh tế, viết tiếng Việt giàu hình ảnh, chính xác. Bối cảnh bài: ' + ctx;
      const target = sel || blockText;
      const P = {
        continue: `Đây là bài đang viết:\n"""${all}"""\nHãy viết tiếp 1-2 đoạn văn tự nhiên, cùng giọng văn. Chỉ trả về đoạn văn mới.`,
        polish: `Trau chuốt đoạn sau cho mượt, giàu hình ảnh nhưng giữ ý:\n"""${target}"""\nChỉ trả về đoạn đã sửa.`,
        shorten: `Rút gọn còn khoảng một nửa, giữ ý chính:\n"""${target}"""\nChỉ trả về kết quả.`,
        expand: `Mở rộng đoạn sau thành đoạn văn phong phú hơn, thêm ví dụ/hình ảnh:\n"""${target}"""\nChỉ trả về kết quả.`,
        poetic: `Viết lại theo giọng văn chương, giàu nhạc tính:\n"""${target}"""\nChỉ trả về kết quả.`,
        formal: `Viết lại theo giọng học thuật, chặt chẽ:\n"""${target}"""\nChỉ trả về kết quả.`,
        explain: `Giải thích ngắn gọn, dễ hiểu khái niệm/đoạn sau, kèm 1 ví dụ:\n"""${target}"""`,
        spell: `Soát lỗi chính tả, ngữ pháp, dấu câu tiếng Việt cho đoạn sau. Trả về bản đã sửa:\n"""${target}"""`,
        outline: `Dựa trên bài đang viết (có thể mới chỉ là tiêu đề), đề xuất dàn ý chi tiết dạng gạch đầu dòng:\n"""${all || ctx}"""`,
        counter: `Đóng vai người phản biện thông minh: chỉ ra 3 điểm yếu/lỗ hổng trong lập luận sau và gợi ý cách củng cố:\n"""${target || all}"""`,
      };
      let prompt = P[kind];
      if (kind === 'translate') {
        const lang = await promptBox('Dịch sang ngôn ngữ nào?', 'English'); if (!lang) return;
        prompt = `Dịch sang ${lang}, giữ phong cách:\n"""${target}"""\nChỉ trả về bản dịch.`;
      }
      if (!target && !['continue', 'outline', 'counter'].includes(kind)) return toast('Hãy đặt con trỏ vào đoạn hoặc bôi đen chữ', 'err');
      const out = await AI.withSpinner($('[data-pop="ai"]', tools), () => AI.ask({ system: sys, prompt, effort: 'low' }));
      if (!out) return;
      const asHtml = out.split(/\n{2,}/).map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
      if (['explain', 'outline', 'counter'].includes(kind)) {
        modal({
          title: '✦ Trợ lý AI', wide: true, body: `<div class="ai-out">${asHtml}</div>`,
          actions: [{ label: 'Chèn vào bài (dạng hộp)', cls: 'pri', onClick: () => insert(`<div class="blk callout c-idea"><span class="ci" contenteditable="false">✦</span><div>${asHtml}</div></div><p><br></p>`) }]
        });
      } else if (kind === 'continue') {
        restore(); if (bl) { bl.insertAdjacentHTML('afterend', asHtml); changed(); } else insert(asHtml);
      } else {
        modal({
          title: '✦ Đề xuất của AI', wide: true, body: `<div class="ai-cmp"><div><small>Bản gốc</small><div class="ai-old">${esc(target)}</div></div><div><small>Đề xuất</small><div class="ai-out">${asHtml}</div></div></div>`,
          actions: [
            { label: 'Chèn bên dưới', onClick: () => { if (bl) { bl.insertAdjacentHTML('afterend', asHtml); changed(); } } },
            { label: 'Thay thế', cls: 'pri', onClick: () => { restore(); if (sel) document.execCommand('insertHTML', false, asHtml.replace(/^<p>|<\/p>$/g, '')); else if (bl) bl.outerHTML = asHtml; changed(); } }
          ]
        });
      }
    }

    /* markdown shortcuts + checklist + phím tắt */
    area.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') { e.preventDefault(); findReplace(); }
      if (e.key === ' ') {
        const bl = curBlock(); if (!bl || bl.tagName !== 'P') return;
        const t = bl.textContent;
        const map = { '#': 'h1', '##': 'h2', '###': 'h3', '>': 'blockquote' };
        if (map[t]) { e.preventDefault(); bl.textContent = ''; document.execCommand('formatBlock', false, map[t]); changed(); }
        else if (t === '-' || t === '*') { e.preventDefault(); bl.textContent = ''; document.execCommand('insertUnorderedList'); changed(); }
        else if (t === '1.') { e.preventDefault(); bl.textContent = ''; document.execCommand('insertOrderedList'); changed(); }
        else if (t === '[]') { e.preventDefault(); bl.outerHTML = '<ul class="checklist"><li data-done="0"><br></li></ul>'; changed(); }
      }
      if (e.key === 'Enter') {
        const bl = curBlock();
        if (bl && bl.tagName === 'P' && bl.textContent === '---') { e.preventDefault(); bl.outerHTML = Blocks.divider('stars'); changed(); }
      }
      if (pop.open) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); pop.move(e.key === 'ArrowDown' ? 1 : -1); }
        else if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); e.stopImmediatePropagation(); pop.choose(); }
        else if (e.key === 'Escape') { e.preventDefault(); pop.close(); }
      }
    }, true);
    area.addEventListener('keyup', e => {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Tab', 'Escape'].includes(e.key) && pop.open) return;
      const sel = getSelection(); if (!sel.rangeCount) return;
      const r = sel.getRangeAt(0); const bl = curBlock();
      // menu "/" ngay tại con trỏ
      const t = bl ? bl.textContent : '';
      if (bl && /^\/[^\n]{0,24}$/.test(t) && !/\s{2}/.test(t)) return pop.show('slash', t.slice(1), bl);
      // [[ liên kết tới bài khác
      const n = r.startContainer;
      if (n.nodeType === 3) {
        const before = n.textContent.slice(0, r.startOffset);
        const m = before.match(/\[\[([^\[\]]{0,30})$/);
        if (m) return pop.show('wiki', m[1], null, { node: n, end: r.startOffset, len: m[0].length });
      }
      pop.close();
    });

    /* ---- menu nổi tại con trỏ: "/" chèn khối, "[[" liên kết bài ---- */
    const plain = t => (t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase();
    const SLASH = [
      ['Tiêu đề lớn', 'h1 heading tieu de', 'fmt:h1'], ['Tiêu đề vừa', 'h2 heading', 'fmt:h2'], ['Tiêu đề nhỏ', 'h3 heading', 'fmt:h3'],
      ['Đoạn văn', 'p paragraph thuong', 'fmt:p'], ['Trích dẫn', 'quote blockquote', 'fmt:blockquote'],
      ['Danh sách chấm', 'list bullet ul', 'cmd:insertUnorderedList'], ['Danh sách số', 'list number ol', 'cmd:insertOrderedList'],
      ['Ảnh', 'image anh hinh', 'x:image'], ['Nhúng YouTube / Spotify', 'embed video nhac', 'x:embed'], ['Liên kết tới bài khác', 'link wiki lien ket', 'x:wiki'],
      ['Chú thích cuối trang', 'footnote', 'x:footnote'], ['Chữ cái đầu lớn', 'dropcap', 'x:dropcap'],
      ...BLOCK_MENU.flatMap(([g, items]) => items.map(([l, v]) => [l.replace(/<svg[\s\S]*?<\/svg>/g, '').trim(), g, 'b:' + v]))
    ];
    const popEl = document.createElement('div'); popEl.className = 'caret-pop'; popEl.hidden = true; host.querySelector('.ed').appendChild(popEl);
    const pop = {
      open: false, items: [], i: 0, kind: '', block: null, wikiAt: null,
      show(kind, q, block, wikiAt) {
        this.kind = kind; this.block = block; this.wikiAt = wikiAt;
        const pq = plain(q);
        if (kind === 'slash') this.items = SLASH.filter(x => !pq || plain(x[0] + ' ' + x[1]).includes(pq)).slice(0, 9).map(x => ({ label: x[0], sub: x[1], act: x[2] }));
        else {
          const docs = [...Store.list('posts').map(p => ({ id: p.id, title: p.title || 'Không tiêu đề', href: '#/doc/bai/' + p.id, ic: '✎' })), ...Store.list('archive').map(a => ({ id: a.id, title: a.title, href: '#/doc/luu/' + a.id, ic: '🗄️' })), ...Store.list('books').map(b => ({ id: b.id, title: b.title, href: '#/sach/' + b.id, ic: '📚' }))];
          this.items = docs.filter(d => !pq || plain(d.title).includes(pq)).slice(0, 8).map(d => ({ label: d.title, sub: d.ic, doc: d }));
          if (q.trim()) this.items.push({ label: `Tạo bài mới “${q.trim()}”`, sub: '＋', newTitle: q.trim() });
        }
        if (!this.items.length) return this.close();
        this.i = Math.min(this.i, this.items.length - 1);
        popEl.innerHTML = `<div class="cp-h">${kind === 'slash' ? 'Chèn khối · gõ để lọc' : 'Liên kết tới…'}</div>` + this.items.map((x, i) => `<button class="${i === this.i ? 'on' : ''}" data-i="${i}"><span>${esc(x.label)}</span><small>${esc(x.sub)}</small></button>`).join('');
        const rr = getSelection().getRangeAt(0).getBoundingClientRect(), hr = host.querySelector('.ed').getBoundingClientRect();
        popEl.style.left = Math.max(0, Math.min(rr.left - hr.left, hr.width - 280)) + 'px';
        popEl.style.top = (rr.bottom - hr.top + 6) + 'px';
        popEl.hidden = false; this.open = true;
      },
      move(d) { this.i = (this.i + d + this.items.length) % this.items.length; $$('button', popEl).forEach((b, i) => b.classList.toggle('on', i === this.i)); $$('button', popEl)[this.i]?.scrollIntoView({ block: 'nearest' }); },
      close() { popEl.hidden = true; this.open = false; this.i = 0; },
      async choose(i = this.i) {
        const it = this.items[i]; if (!it) return; const kind = this.kind, bl = this.block, w = this.wikiAt; this.close();
        if (kind === 'slash') {
          bl.innerHTML = '<br>'; const r = document.createRange(); r.setStart(bl, 0); r.collapse(true); const s = getSelection(); s.removeAllRanges(); s.addRange(r); save();
          const [t, v] = it.act.split(/:(.*)/s);
          if (t === 'fmt') exec('formatBlock', v);
          else if (t === 'cmd') exec(v);
          else if (t === 'b') { const [k, a] = v.split(':'); insert(Blocks[k](a)); }
          else if (v === 'wiki') { document.execCommand('insertText', false, '[['); setTimeout(() => area.dispatchEvent(new KeyboardEvent('keyup', { key: '[' })), 0); }
          else await extra(v);
        } else {
          let doc = it.doc;
          if (it.newTitle) { const p = Store.upsert('posts', { id: uid(), title: it.newTitle, subtitle: '', cat: '', tags: [], content: '<p><br></p>', paper: 'plain', status: 'draft', words: 0 }); doc = { id: p.id, title: p.title, href: '#/doc/bai/' + p.id }; toast('Đã tạo bài nháp “' + it.newTitle + '”'); }
          const r = document.createRange(); r.setStart(w.node, Math.max(0, w.end - w.len)); r.setEnd(w.node, w.end);
          const s = getSelection(); s.removeAllRanges(); s.addRange(r);
          document.execCommand('insertHTML', false, `<a class="wiki" href="${doc.href}" data-id="${doc.id}">${esc(doc.title)}</a>&nbsp;`); changed();
        }
      }
    };
    popEl.addEventListener('mousedown', e => { e.preventDefault(); const b = e.target.closest('button'); if (b) pop.choose(+b.dataset.i); });
    area.addEventListener('click', e => {
      const wl = e.target.closest('a.wiki');
      if (wl && (e.ctrlKey || e.metaKey)) { e.preventDefault(); location.hash = wl.getAttribute('href'); return; }
      const li = e.target.closest('.checklist li');
      if (li && e.offsetX < 26) { li.dataset.done = li.dataset.done === '1' ? '0' : '1'; changed(); }
      const rt = e.target.closest('.blk.rating');
      if (rt) { const v = ((+rt.dataset.v) % 5) + 1; rt.dataset.v = v; rt.innerHTML = '🥚'.repeat(v) + `<span class="off">${'🥚'.repeat(5 - v)}</span>`; changed(); }
      const ph = e.target.closest('img[data-ph]');
      if (ph) { pickFile().then(async f => { if (f) { ph.src = await fileToDataURL(f); ph.removeAttribute('data-ph'); changed(); } }); }
      // thanh công cụ nổi cho ảnh & bảng
      const fig = e.target.closest('figure.fig, .aw-frame img, img');
      const td = e.target.closest('td,th');
      if (fig && area.contains(fig)) showFloat(fig.closest('figure') || fig, 'img');
      else if (td) showFloat(td, 'table');
      else floater.hidden = true;
    });
    function showFloat(el, kind) {
      const r = el.getBoundingClientRect(), hr = host.getBoundingClientRect();
      floater.hidden = false;
      floater.style.top = (r.top - hr.top - 44) + 'px';
      floater.style.left = Math.max(0, r.left - hr.left) + 'px';
      if (kind === 'img') {
        floater.innerHTML = ['25', '50', '75', '100'].map(w => `<button data-w="${w}">${w}%</button>`).join('') + `<button data-fl="left">⬅ trái</button><button data-fl="none">giữa</button><button data-fl="right">phải ➡</button><button data-fl="polaroid">📷 polaroid</button><button data-fl="tape">🩹 băng dính</button><button data-del>🗑</button>`;
        floater.onclick = ev => {
          const b = ev.target.closest('button'); if (!b) return;
          if (b.dataset.w) el.dataset.w = b.dataset.w;
          if (b.dataset.fl) { if (['polaroid', 'tape'].includes(b.dataset.fl)) el.classList.toggle(b.dataset.fl); else el.dataset.fl = b.dataset.fl; }
          if (b.dataset.del !== undefined) { el.remove(); floater.hidden = true; }
          changed();
        };
      } else {
        const table = el.closest('table'); const tr = el.closest('tr');
        floater.innerHTML = `<button data-t="row">＋ hàng</button><button data-t="col">＋ cột</button><button data-t="drow">－ hàng</button><button data-t="dcol">－ cột</button><button data-t="del">🗑 bảng</button>`;
        floater.onclick = ev => {
          const t = ev.target.closest('button')?.dataset.t; if (!t) return;
          const idx = [...tr.children].indexOf(el);
          if (t === 'row') { const n = tr.cloneNode(true); [...n.children].forEach(c => { const td = document.createElement('td'); td.innerHTML = ' '; c.replaceWith(td); }); tr.after(n); }
          if (t === 'col') $$('tr', table).forEach(r => { const c = document.createElement(r.parentNode.tagName === 'THEAD' ? 'th' : 'td'); c.innerHTML = ' '; r.children[idx].after(c); });
          if (t === 'drow') tr.remove();
          if (t === 'dcol') $$('tr', table).forEach(r => r.children[idx]?.remove());
          if (t === 'del') { table.remove(); floater.hidden = true; }
          changed();
        };
      }
    }
    area.addEventListener('paste', e => {
      const cd = e.clipboardData; if (!cd) return;
      const html = cd.getData('text/html');
      if (html && /<(table|p|div|h\d|ul|ol|li|br|img|b|strong|i|em|a)\b/i.test(html)) {
        e.preventDefault();
        document.execCommand('insertHTML', false, Editor.cleanPaste(html)); changed();
        return;
      }
      const img = [...(cd.items || [])].find(i => i.type.startsWith('image/'));
      if (img) { e.preventDefault(); fileToDataURL(img.getAsFile()).then(d => insert(`<figure class="fig" data-w="100"><img src="${d}"><figcaption>Chú thích…</figcaption></figure><p><br></p>`)); }
    });
    const onDocDown = e => {
      if (!document.body.contains(host)) return cleanup();
      if (!host.contains(e.target)) { $$('.pop.open', tools).forEach(x => x.classList.remove('open')); pop.close(); }
    };
    const onSel = () => {
      if (!document.body.contains(host)) return cleanup();
      if (!edRoot.classList.contains('focus')) return;
      const sel = getSelection(); if (!sel.rangeCount || !area.contains(sel.anchorNode)) return;
      let n = sel.anchorNode; while (n && n.parentNode !== area) n = n.parentNode;
      $$('.cur', area).forEach(x => x !== n && x.classList.remove('cur')); n?.classList?.add('cur');
    };
    const edRoot = host.querySelector('.ed');
    const cleanup = () => { document.removeEventListener('mousedown', onDocDown); document.removeEventListener('selectionchange', onSel); };
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('selectionchange', onSel);

    return {
      el: area,
      getHTML: () => area.innerHTML,
      setHTML: h => { area.innerHTML = h; },
      insert,
      text: () => area.innerText,
      focusMode(on) { edRoot.classList.toggle('focus', on); if (!on) $$('.cur', area).forEach(x => x.classList.remove('cur')); else onSel(); },
      destroy: cleanup
    };
  }
};
