/* =========================================================
   SẢNH CHÍNH — mặt cắt "hành tinh trứng" nhiều tầng
   + thanh biểu tượng kiểu máy nuôi thú
   ========================================================= */
const Nav = {
  items: [
    ['home', '#/', 'Sảnh'], ['pen', '#/viet', 'Viết'], ['box', '#/luu-tru', 'Lưu trữ'], ['book', '#/sach', 'Sách'],
    ['abc', '#/ngoai-ngu', 'Ngoại ngữ'], ['cal', '#/lich', 'Lịch học'], ['mail', '#/thu', 'Thùng thư'], ['star', '#/so-tem', 'Sổ tem'], ['pet', '#/thu-cung', 'Thú cưng'],
  ],
  render() {
    $('#iconbar').innerHTML = this.items.map(([ic, href, l]) => `<a href="${href}" class="ib" data-h="${href}" title="${l}">${Art.pixel(ic, { w: 22 })}<span>${l}</span></a>`).join('');
    $('#brandEgg').innerHTML = Art.creature('mascot', { size: 44, mood: 'joy' });
  },
  mark(path) {
    $$('#iconbar .ib').forEach(a => {
      const h = a.dataset.h.slice(1);
      a.classList.toggle('on', h === '/' ? path === '/' : path === h || path.startsWith(h + '/'));
    });
  }
};

const QUOTES = [
  ['Giới hạn của ngôn ngữ tôi là giới hạn của thế giới tôi.', 'Ludwig Wittgenstein'],
  ['Cuộc đời không được kiểm nghiệm thì không đáng sống.', 'Socrates'],
  ['Không có âm nhạc, cuộc sống sẽ là một sai lầm.', 'Friedrich Nietzsche'],
  ['Nghệ thuật rửa trôi khỏi tâm hồn bụi bặm của đời thường.', 'Pablo Picasso'],
  ['Đọc sách là được sống nghìn cuộc đời.', 'G. R. R. Martin (ý)'],
  ['Ta phải tưởng tượng Sisyphus hạnh phúc.', 'Albert Camus'],
  ['Học một ngôn ngữ khác là có thêm một tâm hồn.', 'Tục ngữ (thường gán cho Charlemagne)'],
  ['Lịch sử không lặp lại, nhưng nó thường gieo vần.', 'thường gán cho Mark Twain'],
  ['Văn chương là nhân học.', 'Maxim Gorky'],
  ['Cái đẹp sẽ cứu rỗi thế giới.', 'Fyodor Dostoevsky'],
];

const Home = {
  render(view) {
    const posts = Store.list('posts'), arc = Store.list('archive'), books = Store.list('books'), cards = Store.list('cards');
    const due = cards.filter(c => c.seen && (c.due || 0) <= Date.now()).length;
    const letters = Store.list('letters');
    const qs = Store.list('quotes');
    const q = qs.length && Math.random() < .5 ? [qs[Math.floor(Math.random() * qs.length)].text, qs[0].source] : QUOTES[new Date().getDate() % QUOTES.length];
    const name = Store.settings().name || 'bạn';
    const h = new Date().getHours();
    const greet = h < 11 ? 'Chào buổi sáng' : h < 14 ? 'Trưa an lành' : h < 18 ? 'Chiều dịu dàng' : 'Tối ấm áp';
    const reading = books.filter(b => b.status === 'reading');
    const room = (o) => `
      <a class="room2" href="${o.href}" style="--rc:${o.color}">
        <div class="r2-scene">${o.scene}</div>
        <div class="r2-body"><span class="r2-floor">${o.floor}</span><div class="r2-lbl">${o.label}</div><small>${o.sub}</small>
          <div class="r2-foot"><span class="room-stat">${o.stat}</span><span class="r2-go">Vào ›</span></div></div>
      </a>`;
    const tc = Planner.todayCount();
    const R = {
      write: { k: 'write', href: '#/viet', name: 'Phòng Viết', stat: `${posts.length} bài · ${posts.reduce((s, p) => s + (p.words || 0), 0).toLocaleString('vi')} chữ`, c: '#ffb3dd' },
      music: { k: 'music', href: 'javascript:Music.toggle()', name: 'Hộp Nhạc', stat: 'bấm để bật nhạc nền', c: '#c9b6ff' },
      plan: { k: 'plan', href: '#/lich', name: 'Lịch Học', stat: tc.all ? `${tc.left}/${tc.all} việc còn lại` : 'chưa có việc hôm nay', c: '#ffe680' },
      archive: { k: 'archive', href: '#/luu-tru', name: 'Kho Lưu Trữ', stat: `${arc.length} tài liệu`, c: '#9fdcff' },
      books: { k: 'books', href: '#/sach', name: 'Thư Viện', stat: `${books.length} cuốn · ${books.filter(b => b.status === 'done').length} đã đọc`, c: '#ffe680' },
      quotes: { k: 'quotes', href: '#/luu-tru/trich-dan', name: 'Sổ Trích Dẫn', stat: `${qs.length} câu hay`, c: '#ffd9b0' },
      lang: { k: 'lang', href: '#/ngoai-ngu', name: 'Lớp Ngoại Ngữ', stat: `${cards.length} thẻ · ${due} đến hạn`, c: '#b8f0a0', hot: due },
      mail: { k: 'mail', href: '#/thu', name: 'Thùng Thư', stat: `${letters.length} lá thư`, c: '#ffc0b0' },
      stamps: { k: 'stamps', href: '#/so-tem', name: 'Sổ Tem', stat: `${Stamps.earned().length}/${Stamps.list.length} tem`, c: '#ffb3c8' },
      pet: { k: 'pet', href: '#/thu-cung', name: 'Phòng Thú Cưng', stat: Pet.stageName(), c: '#fff4cf' },
      settings: { k: 'settings', href: '#/cai-dat', name: 'Phòng Máy', stat: 'cài đặt · AI · sao lưu', c: '#e3d4ff' },
    };
    const roomCell = (r, cls = '') => `<a class="hroom ${cls}" href="${r.href}" style="--rc:${r.c}">${cls === 'wide' ? Art.scene(r.k, { bare: true }).replace('xMidYMid slice', 'xMidYMax slice') : Art.scene(r.k, { bare: true })}
      <span class="hr-plate">${r.name}${r.hot ? `<b>${r.hot}</b>` : ''}</span><span class="hr-stat">${r.stat}</span></a>`;
    const floorRow = (n, left, right) => `<div class="hfloor" data-f="${n}"><span class="hf-no">${n}F</span>${left.map(r => roomCell(r)).join('')}<div class="shaft"><i></i></div>${roomCell(right)}</div>`;
    view.innerHTML = `
    <div class="hub">
      
      <section class="band sky">
        <div class="sky-deco">
          <span class="s-ufo">${Art.deco.ufo(130)}</span>
          <span class="s-c1">${Art.deco.cloud(130)}</span><span class="s-c2">${Art.deco.cloud(90, '#fff4fb')}</span>
          ${[...Array(8)].map((_, i) => `<span class="tw" style="left:${8 + i * 12}%;top:${10 + (i % 3) * 22}%">${Art.deco.sparkle(12 + (i % 3) * 4)}</span>`).join('')}
        </div>
        <div class="hello">
          <div class="hello-pet">${Art.creature(Pet.form(), { size: 120, mood: 'joy', anim: 1 })}</div>
          <div class="hello-bub">
            <div class="hb-t">${greet}, ${esc(name)}!</div>
            <div class="hb-s">Hôm nay là ${new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })} · chuỗi ${Activity.streak()} ngày 🔥</div>
            <div class="hb-todo">
              ${(() => { const t = Planner.todayCount(); return `<a href="#/lich" class="todo ${t.all && !t.left ? 'ok' : ''}">📅 ${t.all ? (t.left ? `${t.left}/${t.all} việc hôm nay` : 'Xong hết việc hôm nay ✓') : 'Lên lịch hôm nay'}</a>`; })()}
              ${due ? `<a href="#/ngoai-ngu" class="todo">🃏 ${due} thẻ đến hạn ôn</a>` : '<span class="todo ok">🃏 Không có thẻ đến hạn</span>'}
              ${reading.length ? `<a href="#/sach/${reading[0].id}" class="todo">📖 Đang đọc: ${esc(reading[0].title)}</a>` : ''}
              ${posts[0] ? `<a href="#/viet/sua/${posts[0].id}" class="todo">✎ Viết tiếp: ${esc(posts[0].title || 'bài nháp')}</a>` : '<a href="#/viet" class="todo">✎ Viết bài đầu tiên</a>'}
            </div>
          </div>
        </div>
        <figure class="qotd"><span class="qq">❝</span><blockquote>${esc(q[0])}</blockquote><figcaption>— ${esc(q[1] || '')}</figcaption></figure>
      </section>

      <section class="house-wrap">
        <div class="house" id="house">
          <div class="roof">
            <svg class="roof-shape" viewBox="0 0 1000 150" preserveAspectRatio="none"><path d="M10 150 L120 8 H880 L990 150Z" fill="#ff7a6b" stroke="#2a2346" stroke-width="5" vector-effect="non-scaling-stroke"/>
              ${[34, 62, 90, 118].map((y, i) => `<path d="M${120 - y * .78 + 4} ${y + 8} H${880 + y * .78 - 4}" stroke="#2a2346" stroke-width="2" opacity=".35" vector-effect="non-scaling-stroke"/>`).join('')}</svg>
            <div class="chimney"></div>
            <div class="antenna">${Art.pixel('heart', { w: 22, c: '#ff4f98' })}</div>
            <div class="roof-sign"><span>Chữ-tchi</span><small>nhà của những con chữ</small></div>
            <div class="roof-cre">${Art.creature('cloud', { size: 64, mood: 'joy' })}</div>
          </div>
          <div class="floors">
            ${floorRow(3, [R.lang, R.mail], R.stamps)}
            ${floorRow(2, [R.archive, R.books], R.quotes)}
            ${floorRow(1, [R.write, R.music], R.plan)}
          </div>
          <div class="ground"><svg viewBox="0 0 1000 40" preserveAspectRatio="none"><path d="M0 40 V14 ${[...Array(40)].map((_, i) => `q12.5 -14 25 0`).join(' ')} V40Z" fill="#8fd16a" stroke="#2a2346" stroke-width="4" vector-effect="non-scaling-stroke"/></svg>
            ${[6, 22, 41, 63, 80, 94].map((x, i) => `<span class="flower" style="left:${x}%">${Art.deco.flower(30, ['#ffd23f', '#ff8fc8', '#fff', '#9fdcff'][i % 4])}</span>`).join('')}</div>
          <div class="hfloor basement" data-f="0">
            <span class="hf-no">B1</span>
            ${roomCell(R.pet, 'wide')}
            <div class="shaft"><i></i></div>
            ${roomCell(R.settings)}
          </div>
          <div class="lift" id="lift"><div class="lift-car">${Art.creature('mascot', { size: 52, mood: 'joy' })}</div></div>
        </div>
      </section>
    </div>`;
    this.lift();
  },
  lift() {
    const house = $('#house'), lift = $('#lift'); if (!house || !lift) return;
    const go = fl => {
      const sh = $('.shaft', fl); if (!sh) return;
      const hb = house.getBoundingClientRect(), sb = sh.getBoundingClientRect();
      lift.style.left = (sb.left - hb.left) + 'px'; lift.style.width = sb.width + 'px';
      lift.style.top = (sb.top - hb.top) + 'px'; lift.style.height = sb.height + 'px';
      const ft = $('.floors', house).getBoundingClientRect().top; lift.style.setProperty('--cab', Math.max(0, sb.top - ft) + 'px');
    };
    const floors = $$('.hfloor', house);
    let cur = floors[floors.length - 2] || floors[0];
    requestAnimationFrame(() => { lift.classList.add('instant'); go(cur); requestAnimationFrame(() => lift.classList.remove('instant')); });
    floors.forEach(fl => fl.addEventListener('mouseenter', () => { if (fl !== cur) { cur = fl; go(fl); } }));
    const onR = () => { if (!document.body.contains(house)) return removeEventListener('resize', onR); go(cur); };
    addEventListener('resize', onR);
  }
};
