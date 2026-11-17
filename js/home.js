/* =========================================================
   SẢNH CHÍNH — mặt cắt "hành tinh trứng" nhiều tầng
   + thanh biểu tượng kiểu máy nuôi thú
   ========================================================= */
const Nav = {
  items: [
    ['home', '#/', 'Sảnh'], ['pen', '#/viet', 'Viết'], ['box', '#/luu-tru', 'Lưu trữ'], ['book', '#/sach', 'Sách'],
    ['abc', '#/ngoai-ngu', 'Ngoại ngữ'], ['mail', '#/thu', 'Thùng thư'], ['star', '#/so-tem', 'Sổ tem'], ['pet', '#/thu-cung', 'Thú cưng'],
  ],
  render() {
    $('#iconbar').innerHTML = this.items.map(([ic, href, l]) => `<a href="${href}" class="ib" data-h="${href}" title="${l}">${Art.pixel(ic, { w: 22 })}<span>${l}</span></a>`).join('');
    $('#brandEgg').innerHTML = Art.creature('mascot', { size: 44, mood: 'joy' });
  },
  mark(path) {
    $$('#iconbar .ib').forEach(a => {
      const h = a.dataset.h.slice(1);
      a.classList.toggle('on', h === '/' ? path === '/' : path.startsWith(h));
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
    const due = cards.filter(c => (c.due || 0) <= Date.now()).length;
    const letters = Store.list('letters');
    const qs = Store.list('quotes');
    const q = qs.length && Math.random() < .5 ? [qs[Math.floor(Math.random() * qs.length)].text, qs[0].source] : QUOTES[new Date().getDate() % QUOTES.length];
    const name = Store.settings().name || 'bạn';
    const h = new Date().getHours();
    const greet = h < 11 ? 'Chào buổi sáng' : h < 14 ? 'Trưa an lành' : h < 18 ? 'Chiều dịu dàng' : 'Tối ấm áp';
    const reading = books.filter(b => b.status === 'reading');
    const room = (o) => `
      <a class="room ${o.cls || ''}" href="${o.href}" style="--rc:${o.color}">
        <div class="room-lbl">${o.label}<small>${o.sub}</small></div>
        <div class="room-scene">${o.scene}</div>
        <div class="room-stat">${o.stat}</div>
        <span class="room-go">Vào phòng ›</span>
      </a>`;
    view.innerHTML = `
    <div class="hub">
      <div class="tunnel"></div>
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
              ${due ? `<a href="#/ngoai-ngu" class="todo">🃏 ${due} thẻ đến hạn ôn</a>` : '<span class="todo ok">🃏 Không có thẻ đến hạn</span>'}
              ${reading.length ? `<a href="#/sach/${reading[0].id}" class="todo">📖 Đang đọc: ${esc(reading[0].title)}</a>` : ''}
              ${posts[0] ? `<a href="#/viet/sua/${posts[0].id}" class="todo">✎ Viết tiếp: ${esc(posts[0].title || 'bài nháp')}</a>` : '<a href="#/viet" class="todo">✎ Viết bài đầu tiên</a>'}
            </div>
          </div>
        </div>
        <figure class="qotd"><span class="qq">❝</span><blockquote>${esc(q[0])}</blockquote><figcaption>— ${esc(q[1] || '')}</figcaption></figure>
      </section>

      <section class="band b1">
        <div class="band-name">Tầng 1 · Sáng tác</div>
        ${room({ href: '#/viet', label: 'Phòng Viết', sub: 'văn học · triết học · âm nhạc · hội hoạ · lịch sử · văn hoá · ngôn ngữ', color: '#ffb3dd', cls: 'big',
          scene: `<span class="sc-a">${Art.deco.desk(170)}</span><span class="sc-b bob">${Art.creature('pencil', { size: 70, mood: 'joy' })}</span><span class="sc-c bob d2">${Art.creature('mascot', { size: 86, mood: 'wink' })}</span><span class="sc-f">✎ Ꭺ a 字</span>`,
          stat: `${posts.length} bài · ${posts.reduce((s, p) => s + (p.words || 0), 0).toLocaleString('vi')} chữ` })}
        ${room({ href: 'javascript:Music.toggle()', label: 'Hộp Nhạc', sub: 'lên dây cót', color: '#c9b6ff',
          scene: `<span class="sc-a">${Art.deco.musicbox(130)}</span><span class="sc-b bob">${Art.creature('note', { size: 60, mood: 'joy' })}</span><span class="sc-n n1">${Art.deco.note(22)}</span><span class="sc-n n2">${Art.deco.note(18, '#ff8fc8')}</span>`,
          stat: 'giai điệu · âm thanh nền · playlist' })}
      </section>

      <section class="band b2">
        <div class="band-name">Tầng 2 · Tàng thư</div>
        ${room({ href: '#/luu-tru', label: 'Kho Lưu Trữ', sub: 'tủ hồ sơ không đáy', color: '#9fdcff',
          scene: `<span class="sc-a">${Art.deco.cabinet(110)}</span><span class="sc-b bob">${Art.creature('ghost', { size: 66, mood: 'joy' })}</span><span class="sc-c">${Art.deco.envelope(50)}</span>`,
          stat: `${arc.length} tài liệu · ${qs.length} trích dẫn` })}
        ${room({ href: '#/sach', label: 'Thư Viện Thế Giới', sub: '11 vùng đất, một kệ sách vuốt', color: '#ffe680',
          scene: `<span class="sc-a">${Art.deco.shelf(150)}</span><span class="sc-b bob">${Art.creature('booky', { size: 70, mood: 'joy' })}</span><span class="sc-c">${Art.deco.globe(64)}</span>`,
          stat: `${books.length} cuốn · ${books.filter(b => b.status === 'done').length} đã đọc` })}
      </section>

      <section class="band b3">
        <div class="band-name">Tầng 3 · Học đường</div>
        ${room({ href: '#/ngoai-ngu', label: 'Lớp Ngoại Ngữ', sub: 'hành trình nhiệm vụ · học & ôn · nghe chép video · ngữ pháp', color: '#b8f0a0', cls: 'big',
          scene: `<span class="sc-a">${Art.deco.board(170)}</span><span class="sc-b bob">${Art.creature('prof', { size: 84 })}</span><span class="sc-c bob d3">${Art.creature('fish', { size: 56, mood: 'joy' })}</span>`,
          stat: `${Store.list('courses').length} ngôn ngữ · ${cards.length} thẻ · ${due} đến hạn` })}
        ${room({ href: '#/thu', label: 'Thùng Thư', sub: 'góp ý & thư tương lai', color: '#ffc0b0',
          scene: `<span class="sc-a">${Art.deco.mailbox(110)}</span><span class="sc-b floaty">${Art.creature('cloud', { size: 56, mood: 'joy' })}</span>`,
          stat: `${letters.length} lá thư` })}
      </section>

      <section class="band b4">
        <div class="band-name">Tầng hầm · bí mật</div>
        ${room({ href: '#/luu-tru/trich-dan', label: 'Sổ Trích Dẫn', sub: 'câu hay nhặt được khi đọc', color: '#ffd9b0',
          scene: `<span class="sc-a bob">${Art.creature('star', { size: 80, mood: 'joy' })}</span><span class="sc-q">❝ ❞</span>`, stat: `${qs.length} câu` })}
        ${room({ href: '#/so-tem', label: 'Sổ Tem', sub: 'huy hiệu & thống kê', color: '#ffb3c8',
          scene: `<span class="sc-a">${Art.deco.stamp('GIỎI!', '#e8475f', 80)}</span><span class="sc-b bob">${Art.creature('tomato', { size: 60, mood: 'star' })}</span>`, stat: `${Stamps.earned().length}/${Stamps.list.length} tem` })}
        ${room({ href: '#/thu-cung', label: 'Phòng Thú Cưng', sub: 'Chữ-tchi lớn lên nhờ bạn chăm học', color: '#fff4cf',
          scene: `<span class="sc-a bob">${Art.creature(Pet.form(), { size: 90, mood: 'joy' })}</span>`, stat: Pet.stageName() })}
        <div class="worm-run">${Art.deco.worm(70)}</div>
      </section>
    </div>`;
  }
};
