/* =========================================================
   HIỆU ỨNG — dùng các thư viện trong /vendor (giấy phép MIT)
   · Lenis  : cuộn mượt cả trang
   · AOS    : nội dung hiện dần khi cuộn tới
   · Motion : hiệu ứng nảy nhỏ (nút, thẻ, huy hiệu)
   · Chuyển trang mượt: CSS (app một trang nên không cần Swup/Barba)
   · Swiper : kệ sách vuốt (gắn trong books.js qua FX.shelf)
   Tắt hết khi bật "giảm hiệu ứng" hoặc máy đặt giảm chuyển động.
   ========================================================= */
const FX = {
  lenis: null,
  reduced() { return document.body.classList.contains('reduce-fx'); },

  init() {
    const off = this.reduced();
    // cuộn mượt; bỏ qua các vùng có thanh cuộn riêng
    if (window.Lenis && !off) {
      try {
        this.lenis = new Lenis({
          autoRaf: true, lerp: .12, smoothWheel: true,
          prevent: node => !!(node.closest && node.closest('.modal-wrap, .wt-body, .rd-notes, .rd-toc, .ed-area, textarea, select, .swiper, .pl-list, .heatmap, .chat, .ai-out, .drawer, [data-lenis-prevent]'))
        });
      } catch (e) { this.lenis = null; }
    }
    if (window.AOS) AOS.init({ once: true, duration: 650, easing: 'ease-out-cubic', offset: 30, disable: off });
    // nảy nhẹ khi bấm nút chính / tick xong việc
    document.addEventListener('click', e => {
      if (off || !window.Motion) return;
      const t = e.target.closest('.btn.pri, .tbtn, .ib, .r2-go, .hr-plate');
      if (t) this.pop(t, 1.08);
    }, true);
  },

  /* gọi sau mỗi lần đổi trang */
  afterRoute(view) {
    if (this.lenis) this.lenis.scrollTo(0, { immediate: true, force: true });
    if (this.reduced()) return;
    view.classList.remove('pg-in'); void view.offsetWidth; view.classList.add('pg-in');
    if (!window.AOS) return;
    const tag = (sel, anim, step = 70, max = 60) => $$(sel, view).slice(0, max).forEach((el, i) => {
      if (el.hasAttribute('data-aos')) return;
      el.setAttribute('data-aos', anim); el.setAttribute('data-aos-delay', String((i % 3) * step));
    });
    tag('.page-hero', 'fade-down', 0, 1);
    tag('.house .hfloor', 'fade-up', 0, 6);
    tag('.course-card, .pc, .post-card, .vd-card, .gram-card, .bg-item, .letter-card, .shelf, .wmap, .map-side', 'fade-up');
    tag('.pl-day', 'fade-up', 40, 7);
    setTimeout(() => AOS.refreshHard(), 40);
  },

  pop(el, s = 1.15) {
    if (!el || !window.Motion || this.reduced()) return;
    try { Motion.animate(el, { scale: [1, s, 1] }, { duration: .32, ease: 'easeOut' }); } catch (_) { }
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
    const sw = new Swiper(track, {
      slidesPerView: 'auto', slidesPerGroup: 3, slidesPerGroupAuto: true, spaceBetween: 28, freeMode: { enabled: true, momentumRatio: .6 }, grabCursor: true,
      mousewheel: { forceToAxis: true }, keyboard: { enabled: true, onlyInViewport: true },
      navigation: { prevEl: prev, nextEl: next }, preventClicks: true, preventClicksPropagation: true
    });
    return sw;
  }
};
