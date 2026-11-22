/* =========================================================
   HIỆU ỨNG NHẸ — chỉ giữ thứ không làm chậm trang
   · Swiper : kệ sách vuốt (gắn trong books.js qua FX.shelf)
   · Motion : nảy nhỏ khi bấm nút
   · Chuyển trang: hiện dần rất ngắn bằng CSS
   (Đã bỏ cuộn mượt Lenis và hiện-dần-khi-cuộn AOS vì gây giật khi cuộn.)
   Tắt hết khi bật "giảm hiệu ứng" hoặc máy đặt giảm chuyển động.
   ========================================================= */
const FX = {
  reduced() { return document.body.classList.contains('reduce-fx'); },
  init() {
    document.addEventListener('click', e => {
      if (this.reduced() || !window.Motion) return;
      const t = e.target.closest('.btn.pri, .tbtn, .ib, .hr-plate');
      if (t) this.pop(t, 1.06);
    }, true);
  },
  afterRoute(view) {
    if (this.reduced()) return;
    view.classList.remove('pg-in'); void view.offsetWidth; view.classList.add('pg-in');
  },
  pop(el, s = 1.1) {
    if (!el || !window.Motion || this.reduced()) return;
    try { Motion.animate(el, { scale: [1, s, 1] }, { duration: .25, ease: 'easeOut' }); } catch (_) { }
  },
  /* kệ sách vuốt bằng Swiper (kéo chuột, vuốt tay, lăn chuột ngang, nút ‹ ›) */
  shelf(track, prev, next) {
    if (!window.Swiper) return false;
    const items = [...track.children];
    track.classList.add('swiper');
    track.innerHTML = '';
    const wrap = document.createElement('div'); wrap.className = 'swiper-wrapper';
    items.forEach(it => { it.classList.add('swiper-slide'); wrap.appendChild(it); });
    track.appendChild(wrap);
    return new Swiper(track, {
      slidesPerView: 'auto', slidesPerGroup: 3, slidesPerGroupAuto: true, spaceBetween: 28, freeMode: { enabled: true, momentumRatio: .6 }, grabCursor: true,
      mousewheel: { forceToAxis: true }, keyboard: { enabled: true, onlyInViewport: true },
      navigation: { prevEl: prev, nextEl: next }, preventClicks: true, preventClicksPropagation: true
    });
  }
};
