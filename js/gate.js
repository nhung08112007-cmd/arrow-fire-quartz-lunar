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

/* ---------- bố cục cho màn ngang (W) và màn dọc (P) ---------- */
const GATE_LAYOUTS = {
  W: {
    VW: 1600, VH: 900, dev: { k: .79, cx: 800, top: 352 },
    header: { x: 800, y1: 38, y2: 80, s1: 19, s2: 32 }, title: { x: 800, y: 250, s: 160 }, line2: { x: 800, y: 345, a: 54, b: 92 },
    stamp: { x: 300, y: 178 }, ufo: { x: 30, y: 26, s: 150 }, note: { x: 1490, y: 22 }, rocket: { x: 1335, y: 112 },
    girl: { x: 415, y: 585, s: .98 }, frog: { x: 1005, y: 640, s: 200 }, sz: { t: 34, d: 23 },
    colL: { x: 60, edge: 410 }, colR: { x: 1545, edge: 1225 },
    co: {
      hatch: ['L', 400], archive: ['L', 530], write: ['L', 660], btn: ['L', 790],
      beads: ['R', 380], music: ['R', 480], library: ['R', 580], screen: ['R', 680], lang: ['R', 780],
      mail: { x: 1572, y: 262, anchor: 'end' }
    },
    sfx: { hi: [440, 548], wow: [1012, 884], poc: [870, 838], whoosh: [1262, 178], kira: [1168, 286] }
  },
  P: {
    VW: 1000, VH: 1600, dev: { k: .82, cx: 500, top: 442 },
    header: { x: 500, y1: 42, y2: 88, s1: 22, s2: 38 }, title: { x: 510, y: 292, s: 168 }, line2: { x: 500, y: 404, a: 60, b: 100 },
    stamp: { x: 92, y: 205 }, ufo: { x: 14, y: 14, s: 120 }, note: { x: 892, y: 12 }, rocket: { x: 440, y: 1182 },
    girl: { x: 26, y: 1062, s: 1.12 }, frog: { x: 728, y: 1092, s: 240 }, sz: { t: 37, d: 27 },
    colL: { x: 18, edge: 300 }, colR: { x: 986, edge: 702 },
    co: {
      hatch: ['L', 482], archive: ['L', 640], write: ['L', 800], screen: ['L', 952],
      beads: ['R', 470], music: ['R', 612], library: ['R', 752], lang: ['R', 892],
      btn: { x: 500, y: 1052, anchor: 'middle', from: [500, 1010] },
      mail: { x: 500, y: 1362, anchor: 'middle' }
    },
    sfx: { hi: [196, 1046], wow: [744, 1084], poc: [556, 950], whoosh: [430, 1250], kira: [884, 362] }
  }
};
/* nội dung chú thích + điểm chỉ tới trên máy (toạ độ gốc của máy trứng) */
const GATE_CALLOUTS = {
  hatch: { t: 'Cửa hầm', d: ['lối đi dạo của', 'thú cưng, mở', 'cửa mỗi sáng'], go: '/', at: [316, 628] },
  archive: { t: 'Kho lưu trữ', d: ['tủ hồ sơ không đáy,', 'cất mọi bài hay'], go: '/luu-tru', at: [300, 836] },
  write: { t: 'Phòng viết', d: ['nơi chữ được ấp', 'cho tới khi nở'], go: '/viet', at: [372, 992] },
  screen: { t: 'Màn hình 32×16', d: ['điểm ảnh hiện', 'thú cưng đang lớn'], go: '/thu-cung', at: [500, 825] },
  beads: { t: 'Chuỗi hạt siêu bền', d: ['đếm từng hạt', 'là ôn từng thẻ từ'], go: '/ngoai-ngu', at: null },
  music: { t: 'Hộp nhạc vũ trụ', d: ['lên dây cót là hát,', 'mở khi đọc sách'], go: 'music', at: [612, 696] },
  library: { t: 'Thư viện thế giới', d: ['sách từ 11 vùng đất', 'xếp trên kệ vuốt'], go: '/sach', at: [690, 832] },
  lang: { t: 'Lớp ngoại ngữ', d: ['thầy Ếch Kính dạy', 'đủ 12 thứ tiếng'], go: '/ngoai-ngu', at: [606, 996] },
  btn: { t: 'Nút B siêu mềm', d: ['bấm vào đây', 'để trứng nở!'], go: '', at: [500, 1080], hot: true },
  mail: { t: 'Thùng thư phản lực', d: ['gửi được cả', 'cho tương lai'], go: '/thu', at: null }
};

/* cô bé chibi (nhân vật gốc của hành tinh) — khung 200×300 */
function gateGirl() {
  const skin = '#ffe6d2', hair = '#2c2a5e';
  return `
  <path d="M60 262 q-6 26 -30 30 h52 q4 -16 2 -30z" fill="#ffb84d" stroke="${INK}" stroke-width="4.5"/>
  <path d="M140 262 q6 26 30 30 h-52 q-4 -16 -2 -30z" fill="#ffb84d" stroke="${INK}" stroke-width="4.5"/>
  <rect x="64" y="226" width="16" height="40" fill="${skin}" stroke="${INK}" stroke-width="4"/><rect x="120" y="226" width="16" height="40" fill="${skin}" stroke="${INK}" stroke-width="4"/>
  <path d="M64 148 L38 238 Q100 258 162 238 L136 148Z" fill="#ff8fc8" stroke="${INK}" stroke-width="5"/>
  <path d="M52 212 Q100 226 148 212" fill="none" stroke="#fff" stroke-width="5"/>
  <path d="M68 148 L100 180 L132 148Z" fill="#fff" stroke="${INK}" stroke-width="4.5"/>
  <path d="M92 176 l8 12 l8 -12z" fill="#ff5a5a" stroke="${INK}" stroke-width="3"/>
  <path d="M66 160 Q32 142 24 96" fill="none" stroke="${INK}" stroke-width="17"/><path d="M66 160 Q32 142 24 96" fill="none" stroke="${skin}" stroke-width="10"/>
  <circle cx="24" cy="90" r="12" fill="${skin}" stroke="${INK}" stroke-width="4"/>
  <path d="M134 166 Q168 164 196 140" fill="none" stroke="${INK}" stroke-width="17"/><path d="M134 166 Q168 164 196 140" fill="none" stroke="${skin}" stroke-width="10"/>
  <circle cx="198" cy="137" r="11" fill="${skin}" stroke="${INK}" stroke-width="4"/>
  <path d="M8 74 l-10 -8 M14 64 l-6 -14 M30 66 l4 -14" stroke="${INK}" stroke-width="3"/>
  <circle cx="160" cy="34" r="22" fill="${hair}" stroke="${INK}" stroke-width="4.5"/>
  <path d="M140 18 l-14 -14 l2 20z M146 16 l12 -16 l6 20z" fill="#ff5a5a" stroke="${INK}" stroke-width="3"/>
  <circle cx="100" cy="88" r="62" fill="${skin}" stroke="${INK}" stroke-width="5"/>
  <path d="M38 98 Q30 24 100 22 Q170 24 162 98 Q162 122 152 132 Q152 84 136 64 L124 78 L112 62 L98 80 L84 62 L74 78 L64 66 Q50 86 50 132 Q38 122 38 98Z" fill="${hair}" stroke="${INK}" stroke-width="5"/>
  <path d="M60 40 q14 -14 34 -12" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>
  <g transform="translate(40 38) rotate(-14)"><path d="M0 -12 l3.5 8 9 1 -7 6 2 9 -7.5 -4.6 -7.5 4.6 2 -9 -7 -6 9 -1z" fill="#ffe14d" stroke="${INK}" stroke-width="2.5"/></g>
  <path d="M66 98 q12 -12 24 0" fill="none" stroke="${INK}" stroke-width="5"/>
  <ellipse cx="130" cy="96" rx="10" ry="13" fill="${INK}"/><circle cx="134" cy="91" r="4" fill="#fff"/><circle cx="127" cy="102" r="2" fill="#fff"/>
  <path d="M120 80 l18 -4" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="64" cy="118" rx="11" ry="6" fill="#ff9fc4"/><ellipse cx="146" cy="116" rx="11" ry="6" fill="#ff9fc4"/>
  <path d="M60 116 l6 -4 M68 118 l6 -4" stroke="#e8669f" stroke-width="2"/>
  <path d="M88 114 q14 22 28 0z" fill="${INK}"/><path d="M95 124 q7 -5 14 0 q-7 6 -14 0" fill="#ff7aa8"/>`;
}

/* máy trứng bổ đôi — toạ độ gốc: x 265..735, y 545..1180 */
function gateDevice() {
  const put = (x, y, s) => `<g transform="translate(${x} ${y})">${s}</g>`;
  const icon = n => Art.pixel(n, { px: 2.1 });
  const egg = 'M500 560 C640 560 735 760 735 900 C735 1060 630 1180 500 1180 C370 1180 265 1060 265 900 C265 760 360 560 500 560Z';
  return `
  <rect x="484" y="545" width="32" height="22" rx="7" fill="#d9dde3" stroke="${INK}" stroke-width="4"/>
  <path d="${egg}" fill="#8fd3ff" stroke="${INK}" stroke-width="7"/>
  <path d="M300 760 Q300 640 420 590" fill="none" stroke="#fff" stroke-width="10" opacity=".7"/>
  <circle cx="440" cy="622" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="440" cy="622" r="9" fill="#ffe14d" stroke="${INK}" stroke-width="3"/>
  <path d="M478 600 h44 M482 612 h36" stroke="${INK}" stroke-width="3.5"/>
  <path d="M354 638 L333 674 L352 690 L372 652Z" fill="${INK}"/>
  <path d="M354 638 L333 674 L292 650 L318 608Z" fill="#8fd3ff" stroke="${INK}" stroke-width="5"/>
  <path d="M296 650 l-30 -12 l6 -12 l30 12 M282 644 l-4 22 M268 638 l-4 22" fill="none" stroke="${INK}" stroke-width="3"/>
  <path d="M515 650 L600 645 L645 680 L662 735 L515 735Z" fill="#fff0f8" stroke="${INK}" stroke-width="4.5"/>
  ${put(522, 664, Art.deco.musicbox(92))}${put(606, 648, Art.deco.note(22))}
  <path d="M600 640 q8 -18 2 -32 q14 6 10 -14" fill="none" stroke="${INK}" stroke-width="2.5"/>
  <path d="M360 748 L298 754 M640 748 L706 754 M360 906 L292 914 M640 906 L712 914" stroke="${INK}" stroke-width="4"/>
  <path d="M292 756 L356 752 V904 L290 910 Q284 830 292 756Z" fill="#fff6d8" stroke="${INK}" stroke-width="4"/>
  ${[0, 1, 2].map(i => `<rect x="300" y="${768 + i * 44}" width="48" height="34" rx="4" fill="#ffe0b0" stroke="${INK}" stroke-width="3"/><rect x="314" y="${780 + i * 44}" width="20" height="8" rx="4" fill="#ffe14d" stroke="${INK}" stroke-width="2"/>`).join('')}
  <path d="M644 752 L708 756 Q716 830 710 910 L644 904Z" fill="#ffe8f3" stroke="${INK}" stroke-width="4"/>
  <path d="M648 828 h60 M648 900 h58" stroke="${INK}" stroke-width="3"/>
  ${['#ff8fc8', '#7ec8ff', '#ffd23f', '#8fd16a', '#b48cff'].map((c, i) => `<rect x="${652 + i * 11}" y="${790 + (i % 2) * 6}" width="10" height="${38 - (i % 2) * 6}" fill="${c}" stroke="${INK}" stroke-width="2"/>`).join('')}
  ${['#ffad4d', '#9fdcff', '#ff5a5a', '#fff'].map((c, i) => `<rect x="${654 + i * 12}" y="${862 + (i % 2) * 5}" width="11" height="${38 - (i % 2) * 5}" fill="${c}" stroke="${INK}" stroke-width="2"/>`).join('')}
  <path d="M380 720 H620 L645 742 V908 L620 930 H380 L355 908 V742Z" fill="#ffe14d" stroke="${INK}" stroke-width="5"/>
  <g transform="translate(392 729)">${['pen', 'box', 'book', 'abc'].map((n, i) => `<g transform="translate(${i * 60} 0)">${icon(n)}</g>`).join('')}</g>
  <rect x="380" y="765" width="240" height="120" rx="8" fill="#f6fbf2" stroke="${INK}" stroke-width="4"/>
  <g transform="translate(392 893)">${['note', 'mail', 'pet', 'gear'].map((n, i) => `<g transform="translate(${i * 60} 0)">${icon(n)}</g>`).join('')}</g>
  <path d="M335 948 H486 V1036 H372 Q338 1000 335 948Z" fill="#ffe0ee" stroke="${INK}" stroke-width="4.5"/>
  ${put(372, 968, Art.deco.desk(108))}${put(340, 962, Art.creature('pencil', { size: 50, mood: 'joy' }))}
  <path d="M514 948 H665 Q662 1000 628 1036 H514Z" fill="#e1f7d6" stroke="${INK}" stroke-width="4.5"/>
  ${put(522, 958, Art.deco.board(96, 'A あ 字'))}${put(612, 990, Art.creature('fish', { size: 40, mood: 'joy' }))}
  <g class="g3-btn" data-b="A" tabindex="0" role="button" aria-label="Nút A"><circle cx="420" cy="1094" r="24" fill="#ffe14d" stroke="${INK}" stroke-width="5"/><text x="420" y="1142" class="g3-bl">A</text></g>
  <g class="g3-btn g3-b" data-b="B" tabindex="0" role="button" aria-label="Nút B: mở trứng">
    <circle class="g3-ring" cx="500" cy="1110" r="31" fill="none" stroke="#ff4f98" stroke-width="5"/>
    <circle cx="500" cy="1110" r="31" fill="#ffe14d" stroke="${INK}" stroke-width="5.5"/><ellipse cx="490" cy="1099" rx="10" ry="6" fill="#fff" opacity=".75"/>
    <text x="500" y="1164" class="g3-bl">B</text></g>
  <g class="g3-btn" data-b="C" tabindex="0" role="button" aria-label="Nút C: bỏ qua"><circle cx="580" cy="1094" r="24" fill="#ffe14d" stroke="${INK}" stroke-width="5"/><text x="580" y="1142" class="g3-bl">C</text></g>`;
}

const Gate = {
  show(onDone) {
    const g = $('#gate');
    g.hidden = false;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    g.innerHTML = `
    <div class="g4-scene" id="gZoom"><div class="g4-host" id="g4Host"></div><canvas id="lcd" width="320" height="160"></canvas></div>
    <div class="g4-grain" aria-hidden="true"></div>
    <button class="g3-skip" id="gSkip">Bỏ qua →</button>
    <p class="g4-hint" id="gHint">Bấm <b>nút B</b> để mở trứng · <kbd>Enter</kbd> · hoặc bấm vào một phòng</p>
    <div class="g3-flash" id="gFlash"></div>`;
    const host = $('#g4Host'), cv = $('#lcd');
    let L, mode = '';

    /* ----- dựng cảnh theo bố cục ----- */
    const scene = () => {
      const { VW, VH, dev } = L;
      const k = dev.k, dx = dev.cx - 500 * k, dy = dev.top - 545 * k;
      const T = ([x, y]) => [x * k + dx, y * k + dy];
      const put = (x, y, s, sc = 1) => `<g transform="translate(${x} ${y}) scale(${sc})">${s}</g>`;
      const wob = (n, a = 5) => Array.from({ length: n }, (_, i) => (((i * 37) % 11) - 5) * a / 5).join(' ');
      const curve = (s, t, bend = .22) => {
        const ex = s[0] + (t[0] - s[0]) * .93, ey = s[1] + (t[1] - s[1]) * .93;
        const mx = (s[0] + ex) / 2, my = (s[1] + ey) / 2;
        return `M${s[0].toFixed(0)} ${s[1].toFixed(0)} Q${(mx - (ey - s[1]) * bend).toFixed(0)} ${(my + (ex - s[0]) * bend).toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}`;
      };
      /* chuỗi hạt vòng quanh dòng tiêu đề thứ hai */
      const l2 = L.line2, w2 = 9 * .5 * l2.a + 8 * .56 * l2.b, x0 = l2.x - w2 / 2, x1 = l2.x + w2 / 2, by = l2.y;
      const top = T([500, 548]);
      const chainD = `M${top[0]} ${top[1]} C${top[0] - 30} ${top[1] - 40} ${x0 - 40} ${by + 14} ${x0 - 32} ${by - 40} C${x0 - 24} ${by - 84} ${l2.x - w2 * .1} ${by - 86} ${l2.x + w2 * .2} ${by - 84} C${x1 + 36} ${by - 82} ${x1 + 62} ${by - 36} ${x1 + 34} ${by + 10} C${x1 + 14} ${by + 34} ${x1 - 30} ${by + 40} ${x1 - 70} ${by + 36}`;
      const beadsEnd = [x1 - 66, by + 38];
      /* chú thích */
      const cos = Object.entries(L.co).map(([key, pos]) => {
        const c = GATE_CALLOUTS[key]; const sz = L.sz;
        let x, y, anchor, from;
        if (Array.isArray(pos)) {
          const col = pos[0] === 'L' ? L.colL : L.colR; x = col.x; y = pos[1]; anchor = pos[0] === 'L' ? 'start' : 'end';
          from = [col.edge, y - sz.t * .3];
        } else { x = pos.x; y = pos.y; anchor = pos.anchor; from = pos.from; }
        const target = c.at ? T(c.at) : key === 'beads' ? beadsEnd : null;
        const arrow = target && from ? `<path d="${curve(from, target, anchor === 'end' ? -.2 : .2)}" class="co-arr" marker-end="url(#ah)"/>` : '';
        return `<g class="g3-co ${c.hot ? 'hot' : ''}" data-go="${c.go}" tabindex="0" role="link" aria-label="${c.t}">
          <rect x="${anchor === 'start' ? x - 8 : anchor === 'end' ? x - 300 : x - 160}" y="${y - sz.t}" width="${anchor === 'middle' ? 320 : 308}" height="${sz.t + 12 + c.d.length * (sz.d + 4)}" fill="transparent"/>
          <text x="${x}" y="${y}" class="co-t" style="font-size:${sz.t}px" text-anchor="${anchor}">${c.t}</text>
          ${c.d.map((l, i) => `<text x="${x}" y="${y + (sz.d + 5) * (i + 1)}" class="co-d" style="font-size:${sz.d}px" text-anchor="${anchor}">${l}</text>`).join('')}
          ${arrow}</g>`;
      }).join('');
      const H = L.header, Ti = L.title, S = L.sfx, R = L.rocket;
      const sfx = (p, txt, cls = '', rot = -8) => `<text x="${p[0]}" y="${p[1]}" class="g4-jp ${cls}" transform="rotate(${rot} ${p[0]} ${p[1]})">${txt}</text>`;
      const curl = (x, y, sc = 1) => `<path transform="translate(${x} ${y}) scale(${sc})" d="M0 0 c8 -10 20 -4 14 6 c-6 8 -18 0 -10 -10 c8 -10 24 -6 22 6" fill="none" stroke="${INK}" stroke-width="3"/>`;
      return `
      <svg viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="xMidYMid meet" class="g4-svg" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="${INK}" stroke-width="1.8"/></marker>
          <filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".032" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
          <filter id="roughT" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
          <pattern id="shellDots" width="34" height="34" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="4" fill="#fff" opacity=".55"/></pattern>
        </defs>

        <g filter="url(#rough)">
          ${put(L.ufo.x, L.ufo.y, Art.deco.ufo(L.ufo.s))}
          ${put(L.note.x, L.note.y, Art.creature('note', { size: 72, mood: 'joy' }))}
          <g transform="rotate(-12 ${L.stamp.x} ${L.stamp.y})"><circle cx="${L.stamp.x}" cy="${L.stamp.y}" r="54" fill="#fff" stroke="#e8475f" stroke-width="5"/><circle cx="${L.stamp.x}" cy="${L.stamp.y}" r="45" fill="none" stroke="#e8475f" stroke-width="2"/>
            <text x="${L.stamp.x}" y="${L.stamp.y - 6}" class="g3-stamp">Chữ-tchi</text><text x="${L.stamp.x}" y="${L.stamp.y + 19}" class="g3-stamp">giám tu</text></g>
          <path d="M${H.x - 290} ${H.y2 + 16} ${[...Array(21)].map(() => 'c10 -16 26 -12 18 0 c-6 10 4 10 10 0').join(' ')}" fill="none" stroke="#ffd23f" stroke-width="4.5"/>
          <path id="gChain" d="${chainD}" fill="none" stroke="none"/>
          <g id="gBeads"></g>
          <!-- tên lửa thùng thư -->
          <g class="g3-co" data-go="/thu" tabindex="0" role="link" aria-label="Thùng thư">
            <g transform="translate(${R.x} ${R.y}) rotate(-12 60 50)">
              <path d="M44 100 q14 26 0 30 q16 -4 28 -30" fill="#ff8a3d" stroke="${INK}" stroke-width="3"/>
              <path d="M14 46 Q14 22 42 22 H74 Q102 22 102 46 V98 H14Z" fill="#ff5a5a" stroke="${INK}" stroke-width="4.5"/>
              <rect x="30" y="46" width="56" height="8" rx="4" fill="${INK}"/>
              <path d="M102 62 h18 v-26 h16 v12 h-16" fill="#ffe14d" stroke="${INK}" stroke-width="3"/>
              <circle cx="44" cy="72" r="3.5" fill="${INK}"/><circle cx="72" cy="72" r="3.5" fill="${INK}"/><path d="M50 80 q8 7 16 0" fill="none" stroke="${INK}" stroke-width="3"/>
              <path d="M-6 50 l-30 -4 M-10 70 l-36 0 M-6 90 l-28 6" stroke="${INK}" stroke-width="3"/>
            </g></g>
        </g>

        <g filter="url(#roughT)">
          <text x="${H.x}" y="${H.y1}" class="g3-kick" style="font-size:${H.s1}px" text-anchor="middle">SỔ TAY ĐẶC BIỆT · 特別号 · SỐ 01</text>
          <text x="${H.x}" y="${H.y2}" class="g3-head" style="font-size:${H.s2}px" text-anchor="middle">Tạp chí Học Mỗi Ngày</text>
          <text x="${Ti.x}" y="${Ti.y}" class="g3-t1" style="font-size:${Ti.s}px" rotate="${wob(8, 6)}">Chữ‑tchi</text>
          <text x="${l2.x}" y="${l2.y}" class="g3-t2"><tspan font-size="${l2.a}" rotate="${wob(9, 5)}">hiểu hết </tspan><tspan font-size="${l2.b}" rotate="${wob(8, 6)}">mọi điều</tspan></text>
        </g>

        <g filter="url(#rough)">
          <g transform="translate(${dx} ${dy}) scale(${k})">${gateDevice()}</g>
          ${put(L.girl.x, L.girl.y, gateGirl(), L.girl.s)}
          ${put(L.frog.x, L.frog.y, Art.creature('prof', { size: L.frog.s }))}
          ${curl(L.girl.x - 10, L.girl.y + 40)}${curl(L.frog.x + L.frog.s - 30, L.frog.y + 10, .9)}
          <g transform="translate(${S.hi[0]} ${S.hi[1]})"><path d="M0 0 h132 a18 18 0 0 1 18 18 v12 a18 18 0 0 1 -18 18 h-74 l-22 22 l4 -22 h-40 a18 18 0 0 1 -18 -18 v-12 a18 18 0 0 1 18 -18z" fill="#fff" stroke="${INK}" stroke-width="3.5"/><text x="66" y="34" class="g4-jp sm" text-anchor="middle">やっほー!</text></g>
          ${cos}
        </g>
        ${sfx(S.wow, 'なるほど!!', 'or', -10)}${sfx(S.poc, 'ポチッ', 'pk', 8)}${sfx(S.whoosh, 'ビューン', '', -14)}${sfx(S.kira, 'キラキラ', 'sm', 10)}
      </svg>`;
    };

    const place = () => {
      const svg = $('svg', host); if (!svg) return;
      const r = svg.getBoundingClientRect(), { VW, VH, dev } = L;
      const s = Math.min(r.width / VW, r.height / VH), ox = r.left + (r.width - VW * s) / 2, oy = r.top + (r.height - VH * s) / 2;
      const k = dev.k, dx = dev.cx - 500 * k, dy = dev.top - 545 * k;
      const pad = 4;
      Object.assign(cv.style, { left: (ox + ((380 + pad) * k + dx) * s) + 'px', top: (oy + ((765 + pad) * k + dy) * s) + 'px', width: ((240 - pad * 2) * k * s) + 'px', height: ((120 - pad * 2) * k * s) + 'px' });
    };
    const build = () => {
      const m = innerWidth / innerHeight < .9 ? 'P' : 'W';
      if (m !== mode) {
        mode = m; L = GATE_LAYOUTS[m];
        host.innerHTML = scene();
        const chain = $('#gChain', host), len = chain.getTotalLength();
        $('#gBeads', host).innerHTML = Array.from({ length: Math.floor(len / 27) }, (_, i) => { const p = chain.getPointAtLength(i * 27); return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="12" fill="#e3e6ec" stroke="${INK}" stroke-width="3.5"/>`; }).join('');
      }
      place();
    };
    build();
    const onResize = () => { if (state === 'idle') build(); };
    addEventListener('resize', onResize);

    /* ----- màn LCD ma trận điểm ----- */
    const ctx = cv.getContext('2d');
    const W = 32, Hh = 16, cs = 10;
    let frame = 0, state = 'idle', t0 = 0, raf;
    const grid = () => Array.from({ length: Hh }, () => new Array(W).fill(0));
    const blit = (gr, spr, ox, oy) => spr.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#' && gr[oy + y] && ox + x >= 0 && ox + x < W) gr[oy + y][ox + x] = 1; }));
    const draw = gr => {
      ctx.fillStyle = '#f6fbf2'; ctx.fillRect(0, 0, cv.width, cv.height);
      for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) { ctx.fillStyle = gr[y][x] ? '#1d1830' : 'rgba(42,35,70,.05)'; ctx.fillRect(x * cs + 1, y * cs + 1, cs - 2, cs - 2); }
    };
    const SP = Art.SPR;
    const loop = ts => {
      frame++;
      const gr = grid(); const el = ts - t0;
      if (state === 'idle') { blit(gr, SP.egg, 10 + (Math.floor(frame / 32) % 2 ? 1 : -1), 2); if (Math.floor(frame / 48) % 2) blit(gr, SP.heart, 25, 3); }
      else if (state === 'shake') {
        const off = frame % 6 < 3 ? 2 : -2; blit(gr, SP.egg, 10 + off, 2);
        if (el > 600) blit(gr, ['#.....#', '.#...#.', '..#.#..'], 12 + off, 6);
        if (el > 1300) { state = 'hatch'; t0 = ts; Sfx.jingle([392, 523, 659, 784, 1047]); }
      } else {
        const jump = Math.floor(el / 250) % 2 ? 0 : 2;
        blit(gr, el % 800 < 400 ? SP.blob : SP.blob2, 9, 5 - jump); blit(gr, SP.heart, 24, 2 + (jump ? 1 : 0)); blit(gr, SP.heart, 1, 7 - (jump ? 1 : 0));
        if (el > 1100 && state === 'hatch') { state = 'zoom'; zoom(); }
      }
      draw(gr); raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* ----- mở trứng, phóng vào màn hình ----- */
    let done = false, target = '';
    const finish = () => {
      if (done) return; done = true;
      cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey); removeEventListener('resize', onResize);
      if (target && target !== 'music') location.hash = target;
      g.classList.add('leave');
      setTimeout(() => { g.hidden = true; g.innerHTML = ''; g.className = 'gate'; onDone(); if (target === 'music') setTimeout(() => window.Music && Music.toggle(), 200); }, 550);
    };
    const zoom = () => {
      if (reduce) return setTimeout(finish, 250);
      g.classList.add('zooming');
      requestAnimationFrame(() => {
        const z = $('#gZoom'), r = cv.getBoundingClientRect();
        const ox = r.left + r.width / 2, oy = r.top + r.height / 2;
        const s = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.08;
        z.style.transformOrigin = `${ox}px ${oy}px`;
        z.style.transform = `translate(${innerWidth / 2 - ox}px, ${innerHeight / 2 - oy}px) scale(${s})`;
        setTimeout(() => $('#gFlash').classList.add('on'), 720);
        setTimeout(finish, 1050);
      });
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
    const act = el => {
      const btn = el.closest('.g3-btn'); if (btn) return press(btn.dataset.b);
      const co = el.closest('.g3-co'); if (co) { Sfx.click(); open(co.dataset.go); }
    };
    host.addEventListener('click', e => act(e.target));
    host.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.g3-btn,.g3-co')) { e.preventDefault(); e.stopPropagation(); act(e.target); } });
    const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press('B'); } if (e.key === 'Escape') finish(); };
    document.addEventListener('keydown', onKey);
    $('#gSkip').onclick = finish;
  }
};
