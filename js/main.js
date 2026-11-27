/* =========================================================
   MAIN — khởi động, định tuyến, dữ liệu mẫu
   ========================================================= */
const Seed = {
  run(force = false) {
    if (!force && (Store.list('posts').length || Store.list('books').length || Store.list('courses').length)) return;
    const guide = `<p class="dropcap">Chào mừng tới Phòng Viết! Đây là một bài mẫu để bạn xem thử mọi định dạng có thể dùng. Hãy bấm <b>✎ Sửa</b> để mở trình soạn thảo, hoặc đọc ở chế độ đọc và thử bôi đen một câu để tô màu, ghi chú.</p>
${Blocks.speech('mascot').replace('Nhân vật nói gì đó ở đây…', 'Gõ dấu <code>/</code> ở một dòng trống để mở menu khối nhé!')}
<h2>Văn chương</h2>${Blocks.verse().replace('Dòng thơ thứ nhất<br>Dòng thơ thứ hai<br>Dòng thơ thứ ba<br>Dòng thơ thứ tư', 'Trứng nằm im trong ổ chữ<br>Nghe mưa gõ cửa trang đầu<br>Một sớm vỏ kia rạn vỡ<br>Câu văn bé bỏng ló đầu').replace('— Tên bài thơ', '— Bài thơ mẫu của Chữ-tchi')}
<p>Bạn có thể đặt một trích dẫn lớn thật nổi bật:</p>${Blocks.pullquote().replace('Một câu trích thật đắt giá.', 'Viết là cách nghĩ chậm lại.').replace('— Tác giả', '— Sổ tay Chữ-tchi')}
<h2>Lịch sử & triết học</h2>${Blocks.timeline()}${Blocks.callout('q')}
<h2>Ngôn ngữ</h2>${Blocks.etym().replace('<div class="et-word">từ</div>', '<div class="et-word">philosophy</div>').replace('<span>Gốc Hy Lạp</span> → <span>Latin</span> → <span>Pháp cổ</span> → <span>Hiện đại</span>', '<span>philo- (yêu)</span> + <span>sophia (trí tuệ)</span> → <span>philosophia</span> → <span>philosophy</span>').replace('Câu chuyện của từ…', '“Tình yêu dành cho sự khôn ngoan” — triết học bắt đầu từ một tình yêu.')}
${Blocks.divider('eggs')}
<h2>Bố cục</h2>${Blocks.cols2()}${Blocks.toggle()}${Blocks.checklist()}
<p>Chú thích cuối trang trông như thế này<sup class="fn" contenteditable="false" data-note="Đây là một chú thích mẫu."></sup>. Hết bài mẫu!</p>`;
    Store.upsert('posts', { id: uid(), title: 'Hướng dẫn: mọi định dạng trong Phòng Viết', subtitle: 'Một bài mẫu để nghịch thử — xoá đi khi bạn đã quen tay.', cat: 'ngon-ngu', tags: ['hướng dẫn'], paper: 'dots', status: 'done', content: guide, words: wordCount(stripHtml(guide)) });
    Store.upsert('archive', { id: uid(), title: 'Ghi chép mẫu: Thuyết khắc kỷ trong đời thường', author: 'Chữ-tchi', source: 'sổ tay', type: 'note', status: 'inbox', tags: ['triết học', 'khắc kỷ'], rating: 4, summary: 'Phân biệt điều trong tầm tay và ngoài tầm tay — nền móng của Epictetus.', content: '<h2>Hai vòng tròn</h2><p>Epictetus chia mọi thứ thành hai loại: những điều trong tầm kiểm soát của ta (phán đoán, mong muốn, hành động) và những điều ngoài tầm (cơ thể, danh tiếng, của cải). Bình an đến khi ta dồn sức vào vòng trong và buông vòng ngoài.</p><h2>Thực hành buổi sáng</h2><p>Marcus Aurelius tự nhắc mình mỗi sáng rằng hôm nay sẽ gặp người khó chịu — không để than phiền, mà để chuẩn bị tâm thế.</p><blockquote>Hãy bôi đen câu này rồi thử tô màu, ghi chú, lưu vào sổ trích dẫn.</blockquote>', notes: [] });
    const ol = isbn => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
    [['Rừng Na Uy', 'Haruki Murakami', 'dong-a', 'Nhật Bản', '9780375704024', 'done', 4, 1987],
     ['Trăm năm cô đơn', 'Gabriel García Márquez', 'my-latinh', 'Colombia', '9780060883287', 'reading', 0, 1967],
     ['Người xa lạ', 'Albert Camus', 'tay-au', 'Pháp', '9780679720201', 'done', 5, 1942],
     ['Mọi thứ sụp đổ', 'Chinua Achebe', 'chau-phi', 'Nigeria', '9780385474542', 'want', 0, 1958],
     ['Tội ác và hình phạt', 'Fyodor Dostoevsky', 'dong-au', 'Nga', '9780143058144', 'want', 0, 1866],
     ['Truyện Kiều', 'Nguyễn Du', 'dong-nam-a', 'Việt Nam', '', 'done', 5, 1820]
    ].forEach(([title, author, region, country, isbn, status, rating, year]) => Store.upsert('books', { id: uid(), title, author, region, country, isbn, cover: isbn ? ol(isbn) : '', status, rating, year, pages: 300, page: status === 'reading' ? 120 : 0, notes: [], content: '' }));
    const cid = uid(), bid = uid(), u1 = uid();
    Store.upsert('courses', { id: cid, name: 'Tiếng Anh học thuật', lang: 'en-US', flag: '🇬🇧', color: '#b8f0a0' });
    Store.upsert('tbooks', { id: bid, courseId: cid, title: 'Từ vựng triết học & văn chương', units: [{ id: u1, title: 'Bài 1: Ý niệm', parts: ['Phần A', 'Phần B'] }] });
    [
      { word: 'ephemeral', ipa: '/ɪˈfem.ər.əl/', pos: 'adjective', meaning: 'phù du, chóng tàn', def: 'lasting for a very short time', usage: 'Trang trọng/văn chương. Hay đi với: beauty, pleasure, fame. Danh từ: ephemera.', examples: [{ s: 'Fame in the age of social media is often ephemeral.', t: 'Danh tiếng thời mạng xã hội thường phù du.' }, { s: 'Cherry blossoms are loved for their ephemeral beauty.', t: 'Hoa anh đào được yêu vì vẻ đẹp chóng tàn.' }], syn: 'fleeting, transient, short-lived', ant: 'permanent, enduring', coll: 'ephemeral beauty, ephemeral nature', note: 'Gốc Hy Lạp “ephēmeros” = chỉ sống một ngày.', part: 'Phần A' },
      { word: 'epiphany', ipa: '/ɪˈpɪf.ən.i/', pos: 'noun', meaning: 'khoảnh khắc bừng ngộ', def: 'a moment of sudden and great revelation or realization', usage: 'Thường: have an epiphany. Trong văn học (Joyce) chỉ khoảnh khắc nhân vật chợt thấu suốt.', examples: [{ s: 'She had an epiphany while walking in the rain.', t: 'Cô ấy chợt bừng ngộ khi đi dưới mưa.' }], syn: 'revelation, insight', ant: '', coll: 'have an epiphany, sudden epiphany', part: 'Phần A' },
      { word: 'nuance', ipa: '/ˈnjuː.ɑːns/', pos: 'noun', meaning: 'sắc thái tinh tế', def: 'a very slight difference in meaning, expression, or sound', usage: 'Có thể dùng như động từ (nuanced = nhiều sắc thái).', examples: [{ s: 'Translators must capture every nuance of the poem.', t: 'Dịch giả phải nắm bắt mọi sắc thái của bài thơ.' }], syn: 'subtlety, shade', ant: '', coll: 'subtle nuance, cultural nuance', part: 'Phần B' },
      { word: 'ubiquitous', ipa: '/juːˈbɪk.wɪ.təs/', pos: 'adjective', meaning: 'có mặt khắp nơi', def: 'seeming to be everywhere', usage: 'Trang trọng; thường mang ý hơi phàn nàn.', examples: [{ s: 'Smartphones have become ubiquitous.', t: 'Điện thoại thông minh đã có mặt ở khắp nơi.' }], syn: 'omnipresent, pervasive', ant: 'rare, scarce', part: 'Phần B' },
      { word: 'melancholy', ipa: '/ˈmel.əŋ.kɒl.i/', pos: 'noun', meaning: 'nỗi u sầu', def: 'a feeling of pensive sadness, typically with no obvious cause', usage: 'Cũng là tính từ: a melancholy song. Nhẹ hơn depression, mang màu thẩm mỹ.', examples: [{ s: 'There is a gentle melancholy in Chopin’s nocturnes.', t: 'Có một nỗi u sầu dịu dàng trong các dạ khúc của Chopin.' }], syn: 'sorrow, wistfulness', ant: 'cheerfulness, joy', part: 'Phần A' },
    ].forEach(c => Store.upsert('cards', { id: uid(), courseId: cid, bookId: bid, unitId: u1, tags: [], ...c }));
    Store.upsert('grammar', { id: uid(), courseId: cid, bookId: bid, unitId: u1, title: 'Đảo ngữ với “Never / Rarely / Seldom”', form: 'Never/Rarely/Seldom + trợ động từ + S + V', content: '<h3>Giải thích</h3><p>Đặt trạng từ phủ định lên đầu câu để nhấn mạnh, khi đó đảo trợ động từ lên trước chủ ngữ — rất hay gặp trong văn viết trang trọng và văn chương.</p><div class="blk bilingual"><div class="bl-l"><small>Câu</small><p>Never have I read such a moving novel.</p><p>Rarely does she speak of her past.</p></div><div class="bl-r"><small>Dịch</small><p>Chưa bao giờ tôi đọc một cuốn tiểu thuyết cảm động đến thế.</p><p>Hiếm khi cô ấy nói về quá khứ.</p></div></div>' });
    Store.upsert('quotes', { id: uid(), text: 'Giới hạn của ngôn ngữ tôi là giới hạn của thế giới tôi.', source: 'Ludwig Wittgenstein' });
    Store.upsert('letters', { id: uid(), kind: 'pet', day: today(), title: 'Thư chào mừng', body: 'Chào bạn mới ♥\n\nMình là Chữ-tchi, sống trong hành tinh này. Mình lớn lên mỗi khi bạn viết, đọc, ghi chú và ôn từ vựng.\n\nVài mẹo nhỏ:\n• Ctrl+K để tìm mọi thứ\n• Bấm 🎵 để mở hộp nhạc khi đọc sách\n• Viết một lá thư gửi tương lai trong Thùng Thư nhé!\n\nThương,\nChữ-tchi', read: false });
  }
};

(async function boot() {
  await Store.init();
  const S = Store.settings();
  document.body.dataset.theme = S.theme || 'day';
  document.body.classList.toggle('reduce-fx', !!S.lowFx || matchMedia('(prefers-reduced-motion: reduce)').matches);
  Seed.run();
  try { Packs.migrate(); } catch (e) { }
  try { Minna.migrate(); } catch (e) { }
  try { Sync.init(); } catch (e) { }
  try { PWA.init(); } catch (e) { }
  FX.init();
  Nav.render();

  Router.on(/^\/$/, v => Home.render(v));
  Router.on(/^\/viet$/, v => Write.list(v));
  Router.on(/^\/viet\/c\/([\w-]+)$/, (v, c) => Write.list(v, c));
  Router.on(/^\/viet\/sua\/(\w+)$/, (v, id) => Write.edit(v, id));
  Router.on(/^\/doc\/bai\/(\w+)$/, (v, id) => Write.read(v, id));
  Router.on(/^\/luu-tru$/, v => Archive.list(v));
  Router.on(/^\/luu-tru\/([\w-]+)$/, (v, t) => Archive.list(v, t));
  Router.on(/^\/doc\/luu\/(\w+)$/, (v, id) => Archive.read(v, id));
  Router.on(/^\/sach$/, v => Books.page(v));
  Router.on(/^\/sach\/(\w+)$/, (v, id) => Books.detail(v, id));
  Router.on(/^\/doc\/sach\/(\w+)$/, (v, id) => Books.read(v, id));
  Router.on(/^\/ngoai-ngu$/, v => Lang.home(v));
  Router.on(/^\/ngoai-ngu\/(\w+)$/, (v, id) => Lang.course(v, id));
  Router.on(/^\/ngoai-ngu\/(\w+)\/([\w-]+)$/, (v, id, t) => Lang.course(v, id, t));
  Router.on(/^\/lich$/, v => Planner.page(v));
  Router.on(/^\/thu$/, v => Mail.page(v));
  Router.on(/^\/so-tem$/, v => Stamps.page(v));
  Router.on(/^\/thu-cung$/, v => Pet.page(v));
  Router.on(/^\/cai-dat$/, v => Settings.page(v));
  Planner.remind();
  window.addEventListener('hashchange', () => Router.resolve());
  addEventListener('pagehide', () => Store.flush());
  document.addEventListener('visibilitychange', () => { if (document.hidden) Store.flush(); });

  $('#btnSearch').onclick = () => Search.open();
  $('#btnMusic').onclick = () => Music.toggle();
  $('#btnMail').onclick = () => Router.go('/thu');
  $('#btnTimer').onclick = () => Timer.open();
  $('#btnLight').onclick = () => {
    S.theme = S.theme === 'night' ? 'day' : 'night'; document.body.dataset.theme = S.theme; Store.save('settings');
    Sfx.beep(S.theme === 'night' ? 330 : 990, .08); toast(S.theme === 'night' ? 'Tắt đèn rồi, chúc ngủ ngon 🌙' : 'Bật đèn! ☀️');
  };
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); Search.open(); } });

  const enter = () => {
    $('#app').hidden = false;
    Router.resolve();
    Pet.dock(); Mail.checkDaily();
    setInterval(() => Pet.dock(), 60000);
  };
  if (S.showGate && !sessionStorage.getItem('ct_in')) {
    sessionStorage.setItem('ct_in', '1');
    Gate.show(enter);
  } else enter();
})();
