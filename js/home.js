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

      <section class="rooms-grid">
        ${room({ href: '#/viet', floor: 'Tầng 1 · Sáng tác', label: 'Phòng Viết', sub: 'văn học · triết học · âm nhạc · hội hoạ · lịch sử', color: '#ffb3dd', scene: Art.scene('write'),
          stat: `${posts.length} bài · ${posts.reduce((s, p) => s + (p.words || 0), 0).toLocaleString('vi')} chữ` })}
        ${room({ href: 'javascript:Music.toggle()', floor: 'Tầng 1 · Sáng tác', label: 'Hộp Nhạc', sub: 'lên dây cót, nghe nhạc nền', color: '#c9b6ff', scene: Art.scene('music'), stat: 'giai điệu · âm thanh nền · playlist' })}
        ${room({ href: '#/lich', floor: 'Tầng 1 · Sáng tác', label: 'Lịch Học', sub: 'việc hôm nay · tuần · tháng', color: '#ffe680', scene: Art.scene('settings'),
          stat: (() => { const t = Planner.todayCount(); return t.all ? `${t.left}/${t.all} việc còn lại hôm nay` : 'chưa có việc hôm nay'; })() })}
        ${room({ href: '#/luu-tru', floor: 'Tầng 2 · Tàng thư', label: 'Kho Lưu Trữ', sub: 'tủ hồ sơ không đáy', color: '#9fdcff', scene: Art.scene('archive'), stat: `${arc.length} tài liệu` })}
        ${room({ href: '#/sach', floor: 'Tầng 2 · Tàng thư', label: 'Thư Viện Thế Giới', sub: '11 vùng đất, một kệ sách vuốt', color: '#ffe680', scene: Art.scene('books'),
          stat: `${books.length} cuốn · ${books.filter(b => b.status === 'done').length} đã đọc` })}
        ${room({ href: '#/luu-tru/trich-dan', floor: 'Tầng 2 · Tàng thư', label: 'Sổ Trích Dẫn', sub: 'câu hay nhặt được khi đọc', color: '#ffd9b0', scene: Art.scene('quotes'), stat: `${qs.length} câu` })}
        ${room({ href: '#/ngoai-ngu', floor: 'Tầng 3 · Học đường', label: 'Lớp Ngoại Ngữ', sub: 'học & ôn · nghe chép · ngữ pháp', color: '#b8f0a0', scene: Art.scene('lang'),
          stat: `${cards.length} thẻ · ${due} đến hạn` })}
        ${room({ href: '#/thu', floor: 'Tầng 3 · Học đường', label: 'Thùng Thư', sub: 'góp ý & thư tương lai', color: '#ffc0b0', scene: Art.scene('mail'), stat: `${letters.length} lá thư` })}
        ${room({ href: '#/so-tem', floor: 'Tầng 3 · Học đường', label: 'Sổ Tem', sub: 'huy hiệu & thống kê', color: '#ffb3c8', scene: Art.scene('stamps'), stat: `${Stamps.earned().length}/${Stamps.list.length} tem` })}
      </section>
      <a class="pet-strip" href="#/thu-cung">${Art.scene('pet')}<div><b>Phòng Thú Cưng</b><span>${esc(Pet.stageName())} · Chữ-tchi lớn lên nhờ bạn chăm học</span></div><span class="room-go">Vào phòng ›</span></a>
    </div>`;
  }
};
