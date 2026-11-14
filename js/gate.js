/* =========================================================
   CỔNG VÀO — cảnh minh hoạ "máy trứng" trước khi vào hành tinh
   ========================================================= */
const Sfx = {
  ctx: null,
  ac() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); if (this.ctx.state === 'suspended') this.ctx.resume(); return this.ctx; },
  beep(f = 880, d = .08, type = 'square', vol = .05, when = 0) {
    try {
      const a = this.ac(), o = a.createOscillator(), g = a.createGain();
      o.type = type; o.frequency.value = f;
      const t = a.currentTime + when;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g).connect(a.destination); o.start(t); o.stop(t + d + .02);
    } catch (_) { }
  },
  jingle(notes = [523, 659, 784, 1047], step = .09) { notes.forEach((n, i) => this.beep(n, .12, 'square', .045, i * step)); },
  click() { this.beep(1200, .03, 'square', .03); }
};

const Gate = {
  show(onDone) {
    const g = $('#gate');
    g.hidden = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const put = (x, y, svgStr) => `<g transform="translate(${x} ${y})">${svgStr}</g>`;
    const icon = n => Art.pixel(n, { px: 2.1 });
    /* chú thích kiểu tạp chí: tiêu đề cam viết tay + mô tả + mũi tên vẽ tay */
    const co = (x, y, title, lines, arrow, go, end = false, hot = false) => `
      <g class="g3-co ${hot ? 'hot' : ''}" data-go="${go}" tabindex="0" role="link" aria-label="${title}">
        <text x="${x}" y="${y}" class="co-t" text-anchor="${end ? 'end' : 'start'}">${title}</text>
        ${lines.map((l, i) => `<text x="${x}" y="${y + 27 + i * 24}" class="co-d" text-anchor="${end ? 'end' : 'start'}">${l}</text>`).join('')}
        ${arrow ? `<path d="${arrow}" class="co-arr" marker-end="url(#ah)"/>` : ''}
      </g>`;
    const egg = 'M500 560 C640 560 735 760 735 900 C735 1060 630 1180 500 1180 C370 1180 265 1060 265 900 C265 760 360 560 500 560Z';
    g.innerHTML = `
    <button class="g3-skip" id="gSkip">Bỏ qua →</button>
    <div class="g3-wrap">
      <div class="g3-cover" id="gZoom">
        <svg viewBox="0 0 1000 1300" class="g3-svg" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="${INK}" stroke-width="1.8"/></marker>
            <pattern id="shellDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="4" fill="#fff" opacity=".55"/></pattern>
          </defs>
          <rect width="1000" height="1300" fill="#fffdf8"/>

          <!-- đầu trang -->
          ${put(12, 14, Art.deco.ufo(140))}
          <path d="M60 128 q-14 -10 -26 -2 M54 140 q-18 -4 -30 6" fill="none" stroke="${INK}" stroke-width="2.5"/>
          <text x="180" y="48" class="g3-kick">SỔ TAY ĐẶC BIỆT · SỐ 01 · NĂM 2026</text>
          <text x="180" y="96" class="g3-head">Tạp chí Học Mỗi Ngày · Đặc biệt</text>
          <path d="M180 126 ${[...Array(19)].map(() => 'c10 -16 26 -12 18 0 c-6 10 4 10 10 0').join(' ')}" fill="none" stroke="#ffd23f" stroke-width="4"/>
          ${put(905, 18, Art.creature('note', { size: 74, mood: 'joy' }))}
          <text x="890" y="40" class="g3-sfx" text-anchor="end">♪ la la~</text>

          <!-- con dấu đỏ -->
          <g transform="rotate(-12 80 255)"><circle cx="80" cy="255" r="54" fill="#fff" stroke="#e8475f" stroke-width="5"/><circle cx="80" cy="255" r="45" fill="none" stroke="#e8475f" stroke-width="2"/>
            <text x="80" y="249" class="g3-stamp">Chữ-tchi</text><text x="80" y="274" class="g3-stamp">giám tu</text></g>

          <!-- chuỗi hạt (vẽ bằng JS) nằm sau chữ -->
          <path id="gChain" d="M500 550 C480 520 400 535 395 490 C390 430 470 398 600 395 C760 390 930 398 945 452 C958 506 880 532 760 530 C700 529 655 535 646 548" fill="none" stroke="none"/>
          <g id="gBeads"></g>

          <!-- tiêu đề -->
          <text x="565" y="342" class="g3-t1">Chữ‑tchi</text>
          <text x="540" y="492" class="g3-t2"><tspan font-size="66">hiểu hết </tspan><tspan font-size="118">mọi điều</tspan></text>

          <!-- máy trứng bổ đôi -->
          <rect x="484" y="545" width="32" height="22" rx="7" fill="#d9dde3" stroke="${INK}" stroke-width="4"/>
          <path d="${egg}" fill="#9fdcff" stroke="${INK}" stroke-width="7"/>
          <path d="${egg}" fill="url(#shellDots)"/>
          <circle cx="440" cy="622" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="440" cy="622" r="9" fill="#ffe14d" stroke="${INK}" stroke-width="3"/>
          <path d="M478 600 h44 M482 612 h36" stroke="${INK}" stroke-width="3.5"/>
          <!-- cửa hầm mở -->
          <path d="M354 638 L333 674 L352 690 L372 652Z" fill="${INK}"/>
          <path d="M354 638 L333 674 L292 650 L318 608Z" fill="#9fdcff" stroke="${INK}" stroke-width="5"/>
          <path d="M300 638 l20 -24 M296 650 l-30 -12 l6 -12 l30 12" fill="none" stroke="${INK}" stroke-width="3"/>
          <!-- khoang hộp nhạc -->
          <path d="M515 650 L600 645 L645 680 L662 735 L515 735Z" fill="#fff0f8" stroke="${INK}" stroke-width="4.5"/>
          ${put(522, 664, Art.deco.musicbox(92))}
          ${put(606, 648, Art.deco.note(22))}
          <path d="M600 640 q8 -18 2 -32 q14 6 10 -14" fill="none" stroke="${INK}" stroke-width="2.5"/>
          <!-- vách các khoang -->
          <path d="M360 748 L298 754 M640 748 L706 754 M360 906 L292 914 M640 906 L712 914" stroke="${INK}" stroke-width="4"/>
          <!-- kho lưu trữ (trái) -->
          <path d="M292 756 L356 752 V904 L290 910 Q284 830 292 756Z" fill="#fff6d8" stroke="${INK}" stroke-width="4"/>
          ${[0, 1, 2].map(i => `<rect x="300" y="${768 + i * 44}" width="48" height="34" rx="4" fill="#ffe0b0" stroke="${INK}" stroke-width="3"/><rect x="314" y="${780 + i * 44}" width="20" height="8" rx="4" fill="#ffe14d" stroke="${INK}" stroke-width="2"/>`).join('')}
          <!-- thư viện (phải) -->
          <path d="M644 752 L708 756 Q716 830 710 910 L644 904Z" fill="#ffe8f3" stroke="${INK}" stroke-width="4"/>
          <path d="M648 828 h60 M648 900 h58" stroke="${INK}" stroke-width="3"/>
          ${['#ff8fc8', '#7ec8ff', '#ffd23f', '#8fd16a', '#b48cff'].map((c, i) => `<rect x="${652 + i * 11}" y="${790 + (i % 2) * 6}" width="10" height="${38 - (i % 2) * 6}" fill="${c}" stroke="${INK}" stroke-width="2"/>`).join('')}
          ${['#ffad4d', '#9fdcff', '#ff5a5a', '#fff'].map((c, i) => `<rect x="${654 + i * 12}" y="${862 + (i % 2) * 5}" width="11" height="${38 - (i % 2) * 5}" fill="${c}" stroke="${INK}" stroke-width="2"/>`).join('')}
          <!-- mặt vàng + màn hình -->
          <path d="M380 720 H620 L645 742 V908 L620 930 H380 L355 908 V742Z" fill="#ffe14d" stroke="${INK}" stroke-width="5"/>
          <g transform="translate(392 729)">${['pen', 'box', 'book', 'abc'].map((n, i) => `<g transform="translate(${i * 60} 0)">${icon(n)}</g>`).join('')}</g>
          <rect x="380" y="765" width="240" height="120" rx="8" fill="#f6fbf2" stroke="${INK}" stroke-width="4"/>
          <g transform="translate(392 893)">${['note', 'mail', 'pet', 'gear'].map((n, i) => `<g transform="translate(${i * 60} 0)">${icon(n)}</g>`).join('')}</g>
          <!-- phòng viết (dưới trái) -->
          <path d="M335 948 H486 V1036 H372 Q338 1000 335 948Z" fill="#ffe0ee" stroke="${INK}" stroke-width="4.5"/>
          ${put(372, 968, Art.deco.desk(108))}
          ${put(340, 962, Art.creature('pencil', { size: 50, mood: 'joy' }))}
          <!-- lớp ngoại ngữ (dưới phải) -->
          <path d="M514 948 H665 Q662 1000 628 1036 H514Z" fill="#e1f7d6" stroke="${INK}" stroke-width="4.5"/>
          ${put(522, 958, Art.deco.board(96, 'A あ 字'))}
          ${put(612, 990, Art.creature('fish', { size: 40, mood: 'joy' }))}
          <!-- nút -->
          <g class="g3-btn" data-b="A" tabindex="0" role="button" aria-label="Nút A"><circle cx="420" cy="1094" r="24" fill="#ffe14d" stroke="${INK}" stroke-width="5"/><text x="420" y="1140" class="g3-bl">A</text></g>
          <g class="g3-btn g3-b" data-b="B" tabindex="0" role="button" aria-label="Nút B: mở trứng">
            <circle class="g3-ring" cx="500" cy="1110" r="31" fill="none" stroke="#ff6fa8" stroke-width="5"/>
            <circle cx="500" cy="1110" r="31" fill="#ffe14d" stroke="${INK}" stroke-width="5.5"/><ellipse cx="490" cy="1099" rx="10" ry="6" fill="#fff" opacity=".7"/>
            <text x="500" y="1162" class="g3-bl">B</text></g>
          <g class="g3-btn" data-b="C" tabindex="0" role="button" aria-label="Nút C: bỏ qua"><circle cx="580" cy="1094" r="24" fill="#ffe14d" stroke="${INK}" stroke-width="5"/><text x="580" y="1140" class="g3-bl">C</text></g>

          <!-- thùng thư phản lực -->
          <g class="g3-co" data-go="/thu" tabindex="0" role="link" aria-label="Thùng thư">
            <path d="M486 1268 q14 26 0 30 q16 -4 28 -30" fill="#ff8a3d" stroke="${INK}" stroke-width="3"/>
            <path d="M456 1214 Q456 1190 484 1190 H516 Q544 1190 544 1214 V1266 H456Z" fill="#ff5a5a" stroke="${INK}" stroke-width="4.5"/>
            <rect x="472" y="1214" width="56" height="8" rx="4" fill="${INK}"/>
            <path d="M544 1230 h18 v-26 h16 v12 h-16" fill="#ffe14d" stroke="${INK}" stroke-width="3"/>
            <circle cx="486" cy="1240" r="3.5" fill="${INK}"/><circle cx="514" cy="1240" r="3.5" fill="${INK}"/><path d="M492 1248 q8 7 16 0" fill="none" stroke="${INK}" stroke-width="3"/>
            <path d="M436 1220 l-26 -6 M432 1240 l-30 0 M436 1258 l-24 8" stroke="${INK}" stroke-width="3"/>
            <text x="404" y="1286" class="g3-sfx" text-anchor="end">vèo~</text>
          </g>

          <!-- nhân vật -->
          ${put(18, 688, Art.creature('mascot', { size: 210, mood: 'wink' }))}
          <g><path d="M190 690 h96 a16 16 0 0 1 16 16 v14 a16 16 0 0 1 -16 16 h-58 l-16 16 l2 -16 h-24 a16 16 0 0 1 -16 -16 v-14 a16 16 0 0 1 16 -16z" fill="#fff" stroke="${INK}" stroke-width="3.5"/><text x="238" y="721" class="g3-bub">chào~!</text></g>
          ${put(780, 856, Art.creature('prof', { size: 190 }))}
          <text x="948" y="872" class="g3-sfx big">Ồ!!</text>
          ${put(300, 1212, Art.creature('tomato', { size: 56, mood: 'star' }))}
          ${put(860, 1236, Art.creature('booky', { size: 58, mood: 'joy' }))}

          <!-- chú thích -->
          ${co(40, 585, 'Cửa hầm', ['lối đi dạo của thú cưng,', 'mở cửa mỗi sáng'], 'M200 600 Q260 600 300 628', '/')}
          ${co(966, 582, 'Chuỗi hạt siêu bền', ['đếm từng hạt là ôn', 'từng thẻ từ vựng'], 'M790 566 Q780 548 752 536', '/ngoai-ngu', true)}
          ${co(966, 686, 'Hộp nhạc vũ trụ', ['lên dây cót là hát,', 'mở khi đọc sách'], 'M760 690 Q720 690 668 702', 'music', true)}
          ${co(980, 778, 'Thư viện thế giới', ['sách từ 11 vùng đất', 'xếp trên kệ vuốt'], 'M770 800 Q745 818 716 828', '/sach', true)}
          ${co(26, 960, 'Kho lưu trữ', ['tủ hồ sơ không đáy,', 'cất mọi bài viết hay'], 'M170 928 Q230 880 286 846', '/luu-tru')}
          ${co(26, 1078, 'Phòng viết', ['nơi chữ được ấp', 'cho tới khi nở'], 'M160 1064 Q260 1040 332 1000', '/viet')}
          ${co(980, 1082, 'Lớp ngoại ngữ', ['thầy Ếch Kính dạy', 'đủ 12 thứ tiếng'], 'M776 1072 Q720 1040 668 1002', '/ngoai-ngu', true)}
          ${co(980, 1180, 'Nút B siêu mềm', ['bấm vào đây', 'để trứng nở!'], 'M806 1194 Q660 1188 540 1114', '', true, true)}
          ${co(30, 1182, 'Màn hình 32×16', ['điểm ảnh hiện thú cưng', 'đang lớn từng ngày'], '', '/thu-cung')}
          ${co(560, 1270, 'Thùng thư phản lực', ['gửi được cả cho tương lai'], '', '/thu')}
        </svg>
        <canvas id="lcd" width="320" height="160"></canvas>
        <div class="g3-paper"></div>
      </div>
      <p class="g3-hint" id="gHint">Bấm <b>nút B</b> để mở trứng · <kbd>Enter</kbd> · hoặc chọn một phòng trên bìa</p>
    </div>
    <div class="g3-flash" id="gFlash"></div>`;

    /* chuỗi hạt dọc theo đường cong */
    const chain = $('#gChain'), L = chain.getTotalLength();
    $('#gBeads').innerHTML = Array.from({ length: Math.floor(L / 27) }, (_, i) => { const p = chain.getPointAtLength(i * 27); return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12" fill="#d9dde3" stroke="${INK}" stroke-width="3.5"/>`; }).join('');

    /* màn LCD ma trận điểm */
    const cv = $('#lcd'), ctx = cv.getContext('2d');
    const W = 32, H = 16, cs = 10;
    let frame = 0, state = 'idle', t0 = 0, raf;
    const grid = () => Array.from({ length: H }, () => new Array(W).fill(0));
    const blit = (gr, spr, ox, oy) => spr.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#' && gr[oy + y] && ox + x >= 0 && ox + x < W) gr[oy + y][ox + x] = 1; }));
    const draw = gr => {
      ctx.fillStyle = '#f6fbf2'; ctx.fillRect(0, 0, cv.width, cv.height);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        ctx.fillStyle = gr[y][x] ? '#1d1830' : 'rgba(42,35,70,.05)';
        ctx.fillRect(x * cs + 1, y * cs + 1, cs - 2, cs - 2);
      }
    };
    const S = Art.SPR;
    const loop = ts => {
      frame++;
      const gr = grid(); const el = ts - t0;
      if (state === 'idle') {
        blit(gr, S.egg, 10 + (Math.floor(frame / 32) % 2 ? 1 : -1), 2);
        if (Math.floor(frame / 48) % 2) blit(gr, S.heart, 25, 3);
      } else if (state === 'shake') {
        const off = frame % 6 < 3 ? 2 : -2;
        blit(gr, S.egg, 10 + off, 2);
        if (el > 600) blit(gr, ['#.....#', '.#...#.', '..#.#..'], 12 + off, 6);
        if (el > 1300) { state = 'hatch'; t0 = ts; Sfx.jingle([392, 523, 659, 784, 1047]); }
      } else {
        const jump = Math.floor(el / 250) % 2 ? 0 : 2;
        blit(gr, el % 800 < 400 ? S.blob : S.blob2, 9, 5 - jump);
        blit(gr, S.heart, 24, 2 + (jump ? 1 : 0)); blit(gr, S.heart, 1, 7 - (jump ? 1 : 0));
        if (el > 1100 && state === 'hatch') { state = 'zoom'; zoom(); }
      }
      draw(gr);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* phóng vào màn hình rồi vào app (có thể đi thẳng tới một phòng) */
    let done = false, target = '';
    const finish = () => {
      if (done) return; done = true;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      if (target && target !== 'music') location.hash = target;
      g.classList.add('leave');
      setTimeout(() => {
        g.hidden = true; g.innerHTML = ''; g.className = 'gate'; onDone();
        if (target === 'music') setTimeout(() => window.Music && Music.toggle(), 200);
      }, 550);
    };
    const zoom = () => {
      if (reduce) return setTimeout(finish, 250);
      g.classList.add('zooming');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const z = $('#gZoom'), zr = z.getBoundingClientRect(), r = cv.getBoundingClientRect();
        const ox = r.left + r.width / 2 - zr.left, oy = r.top + r.height / 2 - zr.top;
        const s = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.08;
        z.style.transformOrigin = `${ox}px ${oy}px`;
        z.style.transform = `translate(${innerWidth / 2 - (zr.left + ox)}px, ${innerHeight / 2 - (zr.top + oy)}px) scale(${s})`;
        setTimeout(() => $('#gFlash').classList.add('on'), 720);
        setTimeout(finish, 1050);
      }));
    };
    const open = (route = '') => {
      if (state !== 'idle') return;
      target = route; state = 'shake'; t0 = performance.now(); g.classList.add('opening');
      $('#gHint').textContent = 'Rắc… rắc… trứng đang nở!';
    };
    const press = b => {
      Sfx.click();
      const el = $(`.g3-btn[data-b="${b}"]`, g); el?.classList.add('down'); setTimeout(() => el?.classList.remove('down'), 140);
      if (b === 'B') open('');
      else if (b === 'A') { Sfx.jingle([659, 784, 988]); $('#gHint').innerHTML = 'Nút A để chọn, thử <b>nút B</b> nhé! <kbd>Enter</kbd>'; }
      else if (b === 'C') finish();
    };
    $$('.g3-btn', g).forEach(el => {
      el.addEventListener('click', () => press(el.dataset.b));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); press(el.dataset.b); } });
    });
    $$('.g3-co', g).forEach(el => {
      const go = () => { Sfx.click(); open(el.dataset.go); };
      el.addEventListener('click', go);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); go(); } });
    });
    const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press('B'); } if (e.key === 'Escape') finish(); };
    document.addEventListener('keydown', onKey);
    $('#gSkip').onclick = finish;
  }
};
