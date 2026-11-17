/* =========================================================
   THƯ VIỆN THẾ GIỚI — bản đồ vùng đất ↔ kệ sách vuốt + review
   ========================================================= */
const REGIONS = [
  { id: 'bac-my', name: 'Bắc Mỹ', cx: 215, cy: 150, rx: 125, ry: 80, color: '#ffb3dd', c: 'tomato', hint: 'Mỹ, Canada' },
  { id: 'my-latinh', name: 'Mỹ Latinh', cx: 300, cy: 360, rx: 70, ry: 105, color: '#ffd23f', c: 'star', hint: 'Mexico, Brazil, Argentina, Colombia…' },
  { id: 'bac-au', name: 'Bắc Âu', cx: 505, cy: 70, rx: 52, ry: 34, color: '#c4ecff', c: 'cloud', hint: 'Na Uy, Thuỵ Điển, Đan Mạch, Phần Lan, Iceland' },
  { id: 'tay-au', name: 'Tây Âu', cx: 470, cy: 158, rx: 58, ry: 50, color: '#b48cff', c: 'note', hint: 'Anh, Pháp, Đức, Ý, Tây Ban Nha…' },
  { id: 'dong-au', name: 'Đông Âu & Nga', cx: 640, cy: 105, rx: 120, ry: 55, color: '#ff8a3d', c: 'ghost', hint: 'Nga, Ba Lan, Séc, Hungary…' },
  { id: 'trung-dong', name: 'Trung Đông', cx: 590, cy: 235, rx: 55, ry: 40, color: '#ffd9b0', c: 'pencil', hint: 'Iran, Thổ Nhĩ Kỳ, Ả Rập, Israel…' },
  { id: 'chau-phi', name: 'Châu Phi', cx: 510, cy: 345, rx: 80, ry: 100, color: '#8fd16a', c: 'booky', hint: 'Nigeria, Ai Cập, Nam Phi, Kenya…' },
  { id: 'nam-a', name: 'Nam Á', cx: 695, cy: 255, rx: 45, ry: 50, color: '#ff8fc8', c: 'fish', hint: 'Ấn Độ, Pakistan, Sri Lanka…' },
  { id: 'dong-a', name: 'Đông Á', cx: 805, cy: 175, rx: 70, ry: 55, color: '#ff5a5a', c: 'mascot', hint: 'Trung Quốc, Nhật Bản, Hàn Quốc' },
  { id: 'dong-nam-a', name: 'Đông Nam Á', cx: 805, cy: 300, rx: 55, ry: 42, color: '#19b5b0', c: 'prof', hint: 'Việt Nam, Thái Lan, Indonesia, Philippines…' },
  { id: 'dai-duong', name: 'Châu Đại Dương', cx: 885, cy: 420, rx: 65, ry: 42, color: '#7ec8ff', c: 'cloud', hint: 'Úc, New Zealand, quần đảo TBD' },
];
const regOf = id => REGIONS.find(r => r.id === id);
const BSTATUS = [['want', '🌱 Muốn đọc'], ['reading', '📖 Đang đọc'], ['done', '✅ Đã đọc'], ['drop', '💤 Bỏ dở']];

/* tạo "bờ biển" mềm cho mỗi vùng (Catmull-Rom → Bezier) */
function blobPath(cx, cy, rx, ry, seed, n = 9) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2; const w = .78 + ((Math.sin(seed * 9.1 + i * 2.7) + 1) / 2) * .34;
    pts.push([cx + Math.cos(a) * rx * w, cy + Math.sin(a) * ry * w]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

const Books = {
  coverHTML(b, cls = '') {
    const col = Art.palette[hashStr(b.title || '') % Art.palette.length];
    return b.cover
      ? `<img class="cv-img ${cls}" src="${esc(b.cover)}" alt="${esc(b.title)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'cv-gen',innerHTML:'${esc(b.title).replace(/'/g, '')}'}))">`
      : `<div class="cv-gen ${cls}" style="--gc:${col}"><b>${esc(b.title)}</b><small>${esc(b.author || '')}</small>${Art.creature(regOf(b.region)?.c || 'booky', { size: 48, mood: 'calm' })}</div>`;
  },

  page(view) {
    const S = Store.settings(); S.shelfView = S.shelfView || 'shelf';
    let region = '', status = '', q = '';
    const books = () => Store.list('books');
    view.innerHTML = `
    <div class="page lib-page">
      <header class="page-hero" style="--hc:#ffe680">
        <div class="ph-art scene">${Art.scene('books')}</div>
        <div class="ph-txt">
          <div class="kicker">Tầng 2 · Thư Viện Thế Giới</div>
          <h1>Đi vòng quanh thế giới bằng sách</h1>
          <p>Bấm một vùng đất trên bản đồ để mở kệ sách của vùng ấy. Vuốt / kéo / lăn chuột để lướt kệ.</p>
          <div class="row"><button class="btn pri big" id="addBook">＋ Thêm sách</button><div class="goal-egg" id="goalEgg"></div></div>
        </div>
      </header>
      <div class="map-wrap">
        <svg class="wmap" id="wmap" viewBox="0 0 1000 520" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="wave" width="40" height="20" patternUnits="userSpaceOnUse"><path d="M0 10 q10 -8 20 0 t20 0" fill="none" stroke="#fff" stroke-width="2" opacity=".55"/></pattern></defs>
          <rect width="1000" height="520" rx="26" fill="#9fdcff"/><rect width="1000" height="520" rx="26" fill="url(#wave)"/>
          <g class="compass" transform="translate(70 450)"><circle r="32" fill="#fff6d8" stroke="${INK}" stroke-width="3"/><path d="M0 -26 l7 26 l-7 26 l-7 -26z" fill="#ff5a5a" stroke="${INK}" stroke-width="2"/><text y="-34" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="14" fill="${INK}">B</text></g>
          <g transform="translate(380 240) scale(.55)">${Art.creature('fish', { size: 100 }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>
          <g transform="translate(130 300) scale(.5)">${Art.creature('fish', { size: 100, color: '#ff8fc8' }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>
          ${REGIONS.map((r, i) => `<g class="reg" data-r="${r.id}">
            <path d="${blobPath(r.cx, r.cy, r.rx, r.ry, i + 1)}" fill="${r.color}" stroke="${INK}" stroke-width="3.4"/>
            <text x="${r.cx}" y="${r.cy - 4}" text-anchor="middle" class="reg-name">${r.name}</text>
            <g class="reg-pin" transform="translate(${r.cx - 14} ${r.cy + 4})"><rect width="28" height="20" rx="10" fill="#fff" stroke="${INK}" stroke-width="2.4"/><text x="14" y="15" text-anchor="middle" class="reg-count" data-cnt="${r.id}">0</text></g>
          </g>`).join('')}
          <text x="960" y="500" text-anchor="end" font-family="Patrick Hand" font-size="18" fill="${INK}" opacity=".6">bản đồ vẽ tay · không theo tỉ lệ ♥</text>
        </svg>
        <div class="map-side" id="mapSide"></div>
      </div>
      <div class="filter-row">
        <input class="inp" id="bq" placeholder="🔍 Tìm sách, tác giả…">
        <select class="inp sel" id="bstatus"><option value="">Mọi trạng thái</option>${BSTATUS.map(s => `<option value="${s[0]}">${s[1]}</option>`).join('')}</select>
        <div class="seg" id="bview">${[['shelf', '📚 Kệ 3D'], ['spine', '📏 Gáy sách'], ['grid', '▦ Lưới']].map(v => `<button data-v="${v[0]}" class="${S.shelfView === v[0] ? 'on' : ''}">${v[1]}</button>`).join('')}</div>
      </div>
      <div id="shelves"></div>
      <section class="passport"><h2>🛂 Hộ chiếu đọc sách</h2><div class="stamps" id="passport"></div></section>
    </div>`;

    const drawMap = () => {
      REGIONS.forEach(r => { $(`[data-cnt="${r.id}"]`).textContent = books().filter(b => b.region === r.id).length; });
      $$('.reg').forEach(g => g.classList.toggle('on', g.dataset.r === region));
      $('#wmap').classList.toggle('has-sel', !!region);
      const r = regOf(region);
      const bs = books().filter(b => !region || b.region === region);
      $('#mapSide').innerHTML = r
        ? `<div class="ms-cre bob">${Art.creature(r.c, { size: 90, mood: 'joy' })}</div><h3 style="--cc:${r.color}">${r.name}</h3><p class="muted">${r.hint}</p>
           <div class="ms-stats"><b>${bs.length}</b> cuốn · <b>${bs.filter(b => b.status === 'done').length}</b> đã đọc</div>
           <button class="btn sm" id="msAll">↩ Xem tất cả vùng</button> <button class="btn sm pri" id="msAdd">＋ Sách ${r.name}</button>`
        : `<div class="ms-cre bob">${Art.creature('mascot', { size: 90, mood: 'wink' })}</div><h3>Cả thế giới</h3><p class="muted">Chọn một vùng đất trên bản đồ ←</p>
           <div class="ms-stats"><b>${bs.length}</b> cuốn từ <b>${new Set(bs.map(b => b.region).filter(Boolean)).size}</b>/11 vùng</div>`;
      $('#msAll') && ($('#msAll').onclick = () => { region = ''; drawAll(); });
      $('#msAdd') && ($('#msAdd').onclick = () => Books.form(null, drawAll, region));
      const done = books().filter(b => b.status === 'done' && new Date(b.end || b.updated).getFullYear() === new Date().getFullYear()).length;
      const goal = S.yearGoal || 24;
      $('#goalEgg').innerHTML = `<svg viewBox="0 0 60 70" width="54"><path d="M30 4 C46 4 56 30 56 44 C56 58 44 66 30 66 C16 66 4 58 4 44 C4 30 14 4 30 4Z" fill="#fff" stroke="${INK}" stroke-width="3"/><clipPath id="eggc"><path d="M30 4 C46 4 56 30 56 44 C56 58 44 66 30 66 C16 66 4 58 4 44 C4 30 14 4 30 4Z"/></clipPath><rect clip-path="url(#eggc)" x="0" y="${70 - 66 * Math.min(1, done / goal)}" width="60" height="70" fill="#ffd23f"/></svg><span><b>${done}/${goal}</b> cuốn năm nay<br><a href="javascript:void 0" id="setGoal">đặt mục tiêu</a></span>`;
      $('#setGoal').onclick = async () => { const v = await promptBox('Mục tiêu số sách năm nay', goal); if (v) { S.yearGoal = +v; Store.save('settings'); drawMap(); } };
      $('#passport').innerHTML = REGIONS.map(r => { const n = books().filter(b => b.region === r.id && b.status === 'done').length; return `<div class="pstamp ${n ? 'got' : ''}" title="${r.name}">${Art.deco.stamp(r.name.split(' ')[0].toUpperCase().slice(0, 7), n ? '#e8475f' : '#bbb', 76)}<small>${r.name}${n ? ' · ' + n : ''}</small></div>`; }).join('');
    };

    const drawShelves = () => {
      const list = books().filter(b => (!region || b.region === region) && (!status || b.status === status) && (!q || (b.title + ' ' + b.author).toLowerCase().includes(q)));
      const el = $('#shelves');
      if (!list.length) { el.innerHTML = `<div class="empty big">${Art.creature('booky', { size: 110, mood: 'sleep' })}<p>Kệ còn trống. Thêm cuốn sách đầu tiên nhé!</p></div>`; return; }
      const groups = region ? [[regOf(region), list]] : [
        ...(list.some(b => b.status === 'reading') ? [[{ name: '📖 Đang đọc dở', color: '#ffb3dd', c: 'booky' }, list.filter(b => b.status === 'reading')]] : []),
        ...REGIONS.map(r => [r, list.filter(b => b.region === r.id)]).filter(g => g[1].length),
        ...(list.some(b => !b.region) ? [[{ name: 'Chưa xếp vùng', color: '#ddd', c: 'ghost' }, list.filter(b => !b.region)]] : [])
      ];
      if (S.shelfView === 'grid') {
        el.innerHTML = `<div class="book-grid">${list.map(b => `<a class="bg-item" href="#/sach/${b.id}"><div class="bg-cv">${Books.coverHTML(b)}</div><b>${esc(b.title)}</b><small>${esc(b.author || '')}</small><span class="eggs">${'🥚'.repeat(b.rating || 0)}</span></a>`).join('')}</div>`;
        return;
      }
      el.innerHTML = groups.map(([r, bs]) => `
        <section class="shelf ${S.shelfView}" style="--sc:${r.color}">
          <div class="shelf-head"><span class="sh-cre">${Art.creature(r.c, { size: 40, mood: 'joy' })}</span><h3>${r.name}</h3><span class="muted">${bs.length} cuốn</span><span class="grow"></span><button class="sh-arr" data-d="-1">‹</button><button class="sh-arr" data-d="1">›</button></div>
          <div class="shelf-track">${bs.map(b => S.shelfView === 'spine'
            ? `<a class="spine" href="#/sach/${b.id}" style="--bc:${Art.palette[hashStr(b.title) % 10]};height:${150 + (hashStr(b.id) % 50)}px;width:${34 + Math.min(30, (b.pages || 250) / 25)}px" title="${esc(b.title)}"><span>${esc(b.title)}</span><i>${esc((b.author || '').split(' ').pop())}</i></a>`
            : `<a class="book3d st-${b.status}" href="#/sach/${b.id}" title="${esc(b.title)}"><div class="b3-in">${Books.coverHTML(b)}</div><div class="b3-lbl"><b>${esc(b.title)}</b><small>${esc(b.author || '')}</small>${b.rating ? `<span class="eggs">${'🥚'.repeat(b.rating)}</span>` : ''}${b.status === 'reading' && b.pages ? `<div class="mini-prog"><i style="width:${Math.min(100, (b.page || 0) / b.pages * 100)}%"></i></div>` : ''}</div></a>`).join('')}
          </div>
          <div class="plank"></div>
        </section>`).join('');
      $$('.shelf-track', el).forEach(dragScroll);
      $$('.sh-arr', el).forEach(a => a.onclick = () => a.closest('.shelf').querySelector('.shelf-track').scrollBy({ left: +a.dataset.d * 480, behavior: 'smooth' }));
    };
    const drawAll = () => { drawMap(); drawShelves(); };
    drawAll();
    $('#wmap').addEventListener('click', e => { const g = e.target.closest('.reg'); if (g) { region = region === g.dataset.r ? '' : g.dataset.r; Sfx.click(); drawAll(); $('#shelves').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
    $('#bq').oninput = debounce(e => { q = e.target.value.toLowerCase(); drawShelves(); }, 200);
    $('#bstatus').onchange = e => { status = e.target.value; drawShelves(); };
    $$('#bview button').forEach(b => b.onclick = () => { S.shelfView = b.dataset.v; Store.save('settings'); $$('#bview button').forEach(x => x.classList.toggle('on', x === b)); drawShelves(); });
    $('#addBook').onclick = () => Books.form(null, drawAll, region);
  },

  form(book, after, region = '') {
    const b = book || { id: uid(), title: '', author: '', cover: '', region, country: '', year: '', genre: '', pages: '', page: 0, status: 'want', rating: 0, start: '', end: '', isbn: '', content: '', notes: [] };
    modal({
      title: book ? '✎ Sửa thông tin sách' : '＋ Thêm sách vào kệ', wide: true,
      body: `<div class="bform">
        <div class="bf-cover" id="bfCover">${Books.coverHTML(b)}</div>
        <div class="bf-fields">
          <label class="lbl">Tên sách *</label><div class="row"><input class="inp grow" id="bTitle" value="${esc(b.title)}"><button class="btn" id="bSearch">🔎 Tìm bìa & thông tin</button></div>
          <div id="bResults" class="ol-results"></div>
          <div class="row2"><div><label class="lbl">Tác giả</label><input class="inp" id="bAuthor" value="${esc(b.author)}"></div><div><label class="lbl">Năm</label><input class="inp" id="bYear" value="${esc(b.year)}"></div></div>
          <div class="row2"><div><label class="lbl">Vùng đất</label><select class="inp" id="bRegion"><option value="">—</option>${REGIONS.map(r => `<option value="${r.id}" ${b.region === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}</select></div>
          <div><label class="lbl">Quốc gia</label><div class="row"><input class="inp grow" id="bCountry" value="${esc(b.country)}"><button class="btn sm" id="bAiRegion" title="AI đoán vùng/quốc gia theo tác giả">✦</button></div></div></div>
          <div class="row2"><div><label class="lbl">Thể loại</label><input class="inp" id="bGenre" value="${esc(b.genre)}" placeholder="tiểu thuyết, triết học…"></div><div><label class="lbl">Số trang</label><input class="inp" type="number" id="bPages" value="${esc(b.pages)}"></div></div>
          <div class="row2"><div><label class="lbl">Trạng thái</label><select class="inp" id="bStatus">${BSTATUS.map(s => `<option value="${s[0]}" ${b.status === s[0] ? 'selected' : ''}>${s[1]}</option>`).join('')}</select></div><div><label class="lbl">ISBN</label><input class="inp" id="bIsbn" value="${esc(b.isbn)}"></div></div>
          <label class="lbl">Ảnh bìa</label><div class="row"><input class="inp grow" id="bCoverU" value="${b.cover && !b.cover.startsWith('data:') ? esc(b.cover) : ''}" placeholder="URL ảnh bìa"><button class="btn sm" id="bCoverF">📁 Tải lên</button></div>
        </div></div>`,
      onOpen: (w) => {
        const refreshCover = () => { $('#bfCover', w).innerHTML = Books.coverHTML({ ...b, title: $('#bTitle', w).value, author: $('#bAuthor', w).value }); };
        $('#bCoverU', w).onchange = e => { b.cover = e.target.value.trim(); refreshCover(); };
        $('#bCoverF', w).onclick = async () => { const f = await pickFile(); if (f) { b.cover = await fileToDataURL(f, 600); refreshCover(); } };
        $('#bSearch', w).onclick = async e => {
          const t = $('#bTitle', w).value.trim(); if (!t) return toast('Nhập tên sách trước', 'err');
          const btn = e.currentTarget; btn.disabled = true; btn.textContent = '⏳…';
          try {
            const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(t + ' ' + $('#bAuthor', w).value)}&limit=12&fields=title,author_name,first_publish_year,cover_i,isbn,number_of_pages_median,subject`).then(r => r.json());
            const docs = (r.docs || []).filter(d => d.cover_i);
            $('#bResults', w).innerHTML = docs.length ? `<div class="muted">Chọn một bìa:</div>` + docs.map((d, i) => `<button class="olr" data-i="${i}"><img src="https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg" loading="lazy"><small>${esc(d.title)}<br>${esc((d.author_name || [])[0] || '')} ${d.first_publish_year || ''}</small></button>`).join('') : '<p class="muted">Không tìm thấy bìa — thử thêm tên tác giả, hoặc dán URL ảnh.</p>';
            $$('.olr', w).forEach(x => x.onclick = () => {
              const d = docs[+x.dataset.i];
              b.cover = `https://covers.openlibrary.org/b/id/${d.cover_i}-L.jpg`;
              $('#bCoverU', w).value = b.cover;
              if (!$('#bAuthor', w).value) $('#bAuthor', w).value = (d.author_name || [])[0] || '';
              if (!$('#bYear', w).value) $('#bYear', w).value = d.first_publish_year || '';
              if (!$('#bPages', w).value && d.number_of_pages_median) $('#bPages', w).value = d.number_of_pages_median;
              if (!$('#bIsbn', w).value && d.isbn) $('#bIsbn', w).value = d.isbn[0];
              $$('.olr', w).forEach(y => y.classList.toggle('on', y === x)); refreshCover();
            });
          } catch (err) { toast('Không kết nối được Open Library', 'err'); }
          btn.disabled = false; btn.textContent = '🔎 Tìm bìa & thông tin';
        };
        $('#bAiRegion', w).onclick = async e => {
          const o = await AI.withSpinner(e.currentTarget, () => AI.json({ prompt: `Sách "${$('#bTitle', w).value}" của ${$('#bAuthor', w).value}. Tác giả thuộc quốc gia nào, và thuộc vùng nào trong danh sách id sau: ${REGIONS.map(r => r.id + '=' + r.name).join(', ')}. Đồng thời thể loại ngắn gọn. Trả về {"country":"","region":"<id>","genre":""}` }));
          if (o) { $('#bCountry', w).value = o.country || ''; $('#bRegion', w).value = o.region || ''; if (!$('#bGenre', w).value) $('#bGenre', w).value = o.genre || ''; }
        };
      },
      actions: [...(book ? [{ label: '🗑 Xoá', cls: 'danger', onClick: async () => { if (await confirmBox('Xoá sách khỏi kệ?')) { Store.remove('books', b.id); Router.go('/sach'); } } }] : []), { label: 'Huỷ' }, {
        label: '📚 Đặt lên kệ', cls: 'pri', onClick: w => {
          const t = $('#bTitle', w).value.trim(); if (!t) { toast('Cần tên sách', 'err'); return false; }
          const st = $('#bStatus', w).value;
          if (st === 'reading' && !b.start) b.start = today();
          if (st === 'done' && !b.end) { b.end = today(); Activity.add('book', 10); }
          Object.assign(b, { title: t, author: $('#bAuthor', w).value.trim(), year: $('#bYear', w).value, region: $('#bRegion', w).value, country: $('#bCountry', w).value, genre: $('#bGenre', w).value, pages: +$('#bPages', w).value || '', status: st, isbn: $('#bIsbn', w).value, cover: $('#bCoverU', w).value.trim() || (b.cover?.startsWith('data:') ? b.cover : '') });
          Store.upsert('books', b); toast('Đã đặt lên kệ 📚'); after && after();
        }
      }]
    });
  },

  detail(view, id) {
    const b = Store.find('books', id); if (!b) return Router.go('/sach');
    const r = regOf(b.region) || { name: 'Chưa xếp vùng', color: '#ddd', c: 'ghost' };
    b.quotes = b.quotes || [];
    view.innerHTML = `
    <div class="page book-page" style="--rc:${r.color}">
      <a class="back" href="#/sach">‹ Thư viện</a>
      <div class="bk-top">
        <div class="bk-cover tape">${Books.coverHTML(b, 'big')}<span class="bk-cre bob">${Art.creature(r.c, { size: 70, mood: 'joy' })}</span></div>
        <div class="bk-info">
          <div class="kicker">${r.name}${b.country ? ' · ' + esc(b.country) : ''}</div>
          <h1>${esc(b.title)}</h1>
          <p class="bk-author">${esc(b.author || '')} ${b.year ? '· ' + esc(b.year) : ''}</p>
          <div class="bk-tags">${b.genre ? `<span class="tag">${esc(b.genre)}</span>` : ''}${b.pages ? `<span class="tag">${b.pages} trang</span>` : ''}${b.isbn ? `<span class="tag">ISBN ${esc(b.isbn)}</span>` : ''}</div>
          <div class="seg" id="bkSt">${BSTATUS.map(s => `<button data-s="${s[0]}" class="${b.status === s[0] ? 'on' : ''}">${s[1]}</button>`).join('')}</div>
          <div class="egg-rate" id="bkRate" title="Chấm điểm bằng trứng">${[1, 2, 3, 4, 5].map(i => `<span data-v="${i}" class="${i <= (b.rating || 0) ? 'on' : ''}">🥚</span>`).join('')}</div>
          <div class="row2 bk-dates"><label>Bắt đầu <input type="date" class="inp sm" id="bkStart" value="${b.start || ''}"></label><label>Xong <input type="date" class="inp sm" id="bkEnd" value="${b.end || ''}"></label></div>
          ${b.pages ? `<div class="bk-prog"><label>Đang ở trang <input type="number" class="inp sm" id="bkPage" value="${b.page || 0}" min="0" max="${b.pages}"> / ${b.pages}</label><div class="goal"><i style="width:${Math.min(100, (b.page || 0) / b.pages * 100)}%"></i></div></div>` : ''}
          <div class="row"><button class="btn" id="bkEdit">✎ Sửa thông tin</button><a class="btn" href="#/doc/sach/${b.id}">👁 Đọc review (chế độ đọc)</a><button class="btn" id="bkAi">✦ AI gợi ý câu hỏi thảo luận</button></div>
        </div>
      </div>
      <div class="bk-cols">
        <section class="bk-review"><h2>✍️ Review của tôi</h2><div id="bkEd"></div></section>
        <aside class="bk-side">
          <h3>❝ Câu trích</h3>
          <div id="bkQuotes"></div>
          <textarea class="inp" id="bkQ" rows="3" placeholder="Chép một câu hay… (kèm số trang)"></textarea>
          <div class="row"><input class="inp sm" id="bkQp" placeholder="trang"><button class="btn sm pri" id="bkQadd">＋ Lưu câu</button></div>
          <h3>🔗 Sách cùng vùng</h3>
          <div class="mini-shelf">${Store.list('books').filter(x => x.region === b.region && x.id !== b.id).slice(0, 8).map(x => `<a href="#/sach/${x.id}" title="${esc(x.title)}">${Books.coverHTML(x)}</a>`).join('') || '<span class="muted">Chưa có.</span>'}</div>
        </aside>
      </div>
    </div>`;
    const save = () => Store.upsert('books', b);
    Editor.mount($('#bkEd'), {
      html: b.content || `<h3>Cảm nhận chung</h3><p>…</p><h3>Điều đọng lại</h3><p>…</p>${Blocks.rating()}`,
      onChange: h => { b.content = h; save(); }, context: () => `Review sách "${b.title}" của ${b.author}`
    });
    $$('#bkSt button').forEach(x => x.onclick = () => {
      b.status = x.dataset.s; $$('#bkSt button').forEach(y => y.classList.toggle('on', y === x));
      if (b.status === 'reading' && !b.start) { b.start = today(); $('#bkStart').value = b.start; }
      if (b.status === 'done' && !b.end) { b.end = today(); $('#bkEnd').value = b.end; Activity.add('book', 10); toast('Thêm một con tem vào hộ chiếu! 🛂'); }
      save();
    });
    $$('#bkRate span').forEach(s => s.onclick = () => { b.rating = +s.dataset.v; $$('#bkRate span').forEach(x => x.classList.toggle('on', +x.dataset.v <= b.rating)); save(); });
    $('#bkStart').onchange = e => { b.start = e.target.value; save(); };
    $('#bkEnd').onchange = e => { b.end = e.target.value; save(); };
    $('#bkPage') && ($('#bkPage').onchange = e => { b.page = +e.target.value; save(); Books.detail(view, id); });
    $('#bkEdit').onclick = () => Books.form(b, () => Books.detail(view, id));
    $('#bkAi').onclick = async e => {
      const o = await AI.withSpinner(e.currentTarget, () => AI.ask({ prompt: `Cuốn "${b.title}" của ${b.author}. Đưa ra: bối cảnh ngắn của tác phẩm, 6 câu hỏi thảo luận sâu (văn học, triết học, lịch sử), và 3 cuốn sách liên quan nên đọc tiếp (khác vùng văn hoá).`, effort: 'medium' }));
      if (o) modal({ title: '✦ Gợi ý thảo luận', wide: true, body: `<div class="ai-out">${esc(o).replace(/\n/g, '<br>')}</div>` });
    };
    const drawQ = () => { $('#bkQuotes').innerHTML = b.quotes.map((q, i) => `<blockquote class="bq">${esc(q.t)}${q.p ? `<small>tr. ${esc(q.p)}</small>` : ''}<button data-i="${i}">✕</button></blockquote>`).join(''); };
    drawQ();
    $('#bkQuotes').onclick = e => { const i = e.target.dataset.i; if (i !== undefined) { b.quotes.splice(+i, 1); save(); drawQ(); } };
    $('#bkQadd').onclick = () => {
      const t = $('#bkQ').value.trim(); if (!t) return;
      b.quotes.push({ t, p: $('#bkQp').value }); save(); drawQ();
      Store.upsert('quotes', { id: uid(), text: t, source: `${b.title} — ${b.author}${$('#bkQp').value ? ', tr.' + $('#bkQp').value : ''}`, ref: '#/sach/' + b.id });
      $('#bkQ').value = ''; $('#bkQp').value = '';
    };
  },

  read(view, id) {
    const b = Store.find('books', id); if (!b) return Router.go('/sach');
    return Reader.open(view, {
      doc: b, back: '#/sach/' + b.id, kind: 'book',
      meta: `<span class="chip-c">📚 Review sách</span> <span>${esc(b.author || '')}</span> <span class="eggs">${'🥚'.repeat(b.rating || 0)}</span>`,
      onSave: d => Store.upsert('books', d)
    });
  }
};
