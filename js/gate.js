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
    const cre = (n, o, cls, style) => `<div class="g-cre ${cls}" style="${style}">${Art.creature(n, o)}</div>`;
    const label = (txt, sub, style, arrow = 'r') => `<div class="callout-lbl" style="${style}"><b>${txt}</b><span>${sub}</span><i class="arr arr-${arrow}"></i></div>`;
    g.innerHTML = `
    <div class="g-sky">
      <div class="g-dots"></div>
      ${[...Array(14)].map((_, i) => `<span class="g-star" style="left:${(i * 37) % 100}%;top:${(i * 23) % 60}%;animation-delay:${i * .3}s">${Art.deco.sparkle(14 + (i % 3) * 6, i % 2 ? '#fff' : '#ffe14d')}</span>`).join('')}
      <div class="g-cloud c1">${Art.deco.cloud(170)}</div>
      <div class="g-cloud c2">${Art.deco.cloud(120, '#fff6fb')}</div>
      <div class="g-cloud c3">${Art.deco.cloud(140)}</div>
      <div class="g-ufo">${Art.deco.ufo(150)}</div>
    </div>

    <div class="g-title">
      <div class="g-kicker">✦ Sổ tay đặc biệt · số 01 ✦</div>
      <h1><span class="t-small">Hành tinh</span><span class="t-big">Chữ-tchi</span></h1>
      <p class="g-sub">cuốn sổ hiểu hết mọi điều tôi yêu — <em>văn chương, triết học, âm nhạc, hội hoạ, sách & ngôn ngữ</em></p>
    </div>

    <div class="g-stage">
      ${label('Phòng Viết', 'nơi chữ được ấp cho nở', 'left:2%;top:6%', 'r')}
      ${label('Kho Lưu Trữ', 'tủ hồ sơ không đáy, cất mọi bài hay', 'left:0%;top:36%', 'r')}
      ${label('Hộp Nhạc', 'lên dây cót là hát', 'left:4%;top:66%', 'r')}
      ${label('Thư Viện Thế Giới', 'sách từ 11 vùng đất', 'right:2%;top:6%', 'l')}
      ${label('Lớp Ngoại Ngữ', 'thầy Ếch Kính chờ bạn', 'right:0%;top:36%', 'l')}
      ${label('Thùng Thư', 'gửi được cả cho tương lai', 'right:4%;top:66%', 'l')}

      <div class="g-device" id="gDevice">
        <svg viewBox="0 0 360 440" class="dev-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3.4" fill="#fff" opacity=".7"/><circle cx="16" cy="16" r="2.2" fill="#ff8fc8" opacity=".6"/></pattern>
          </defs>
          ${[...Array(11)].map((_, i) => { const a = Math.PI * (1.05 + i * .09); return `<circle cx="${180 + Math.cos(a) * 64 + 64}" cy="${70 + Math.sin(a) * 60}" r="9" fill="#d9dde3" stroke="${INK}" stroke-width="3"/>`; }).join('')}
          <rect x="166" y="54" width="28" height="16" rx="5" fill="#d9dde3" stroke="${INK}" stroke-width="3"/>
          <path d="M180 66 C292 66 342 196 342 286 C342 384 272 432 180 432 C88 432 18 384 18 286 C18 196 68 66 180 66Z" fill="#9fdcff" stroke="${INK}" stroke-width="6"/>
          <path d="M180 66 C292 66 342 196 342 286 C342 384 272 432 180 432 C88 432 18 384 18 286 C18 196 68 66 180 66Z" fill="url(#dots)"/>
          <path d="M70 160 l20 -18 h180 l20 18 v150 l-20 18 h-180 l-20 -18z" fill="#ffe14d" stroke="${INK}" stroke-width="5"/>
          <g transform="translate(96 150)">${['pen', 'box', 'book', 'abc'].map((n, i) => `<g transform="translate(${i * 46} 0)">${Art.pixel(n, { px: 1.6 })}</g>`).join('')}</g>
          <g transform="translate(96 302)">${['note', 'mail', 'pet', 'gear'].map((n, i) => `<g transform="translate(${i * 46} 0)">${Art.pixel(n, { px: 1.6 })}</g>`).join('')}</g>
          <rect x="94" y="176" width="172" height="120" rx="8" fill="#c9e3b4" stroke="${INK}" stroke-width="4"/>
          <g class="dev-btn" data-b="A"><circle cx="122" cy="372" r="19" fill="#ffe14d" stroke="${INK}" stroke-width="4.5"/><text x="122" y="408" text-anchor="middle" font-family="VT323" font-size="20" fill="${INK}">A</text></g>
          <g class="dev-btn pulse" data-b="B"><circle cx="180" cy="386" r="21" fill="#ffe14d" stroke="${INK}" stroke-width="4.5"/><text x="180" y="425" text-anchor="middle" font-family="VT323" font-size="20" fill="${INK}">B</text></g>
          <g class="dev-btn" data-b="C"><circle cx="238" cy="372" r="19" fill="#ffe14d" stroke="${INK}" stroke-width="4.5"/><text x="238" y="408" text-anchor="middle" font-family="VT323" font-size="20" fill="${INK}">C</text></g>
          <text x="180" y="122" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="20" fill="${INK}" letter-spacing="2">CHỮ·TCHI</text>
        </svg>
        <canvas id="lcd" width="320" height="160"></canvas>
        <div class="g-hint" id="gHint">bấm <b>B</b> (hoặc Enter) để nở trứng ↓</div>
      </div>

      ${cre('mascot', { mood: 'wink', size: 130 }, 'cl1 bob', 'left:22%;bottom:4%')}
      ${cre('prof', { size: 120 }, 'cl2 bob d2', 'right:21%;bottom:3%')}
      ${cre('note', { size: 74 }, 'cl3 bob d3', 'right:28%;top:2%')}
      ${cre('cloud', { size: 80, mood: 'joy' }, 'cl4 floaty', 'left:27%;top:0%')}
      ${cre('booky', { size: 84, mood: 'joy' }, 'cl5 bob d1', 'left:12%;bottom:22%')}
      ${cre('tomato', { size: 70, mood: 'star' }, 'cl6 bob d2', 'right:12%;bottom:22%')}
    </div>

    <div class="g-ground">
      ${[8, 22, 70, 86].map((l, i) => `<span style="left:${l}%">${Art.deco.flower(34, ['#ffd23f', '#ff8fc8', '#7ec8ff', '#b48cff'][i])}</span>`).join('')}
      <span style="left:46%;bottom:6px">${Art.deco.worm(60)}</span>
    </div>

    <div class="g-bubbles">
      <span class="bub" style="left:29%;bottom:30%">chào~!</span>
      <span class="bub" style="right:27%;bottom:30%">vào học thôi!</span>
    </div>
    <button class="g-skip" id="gSkip">bỏ qua ›</button>
    <div class="g-flash" id="gFlash"></div>`;

    /* ---- màn LCD ---- */
    const cv = $('#lcd'), ctx = cv.getContext('2d');
    const W = 32, H = 16, cs = 10;
    let frame = 0, state = 'idle', t0 = 0, raf;
    const grid = () => { const a = []; for (let y = 0; y < H; y++) a.push(new Array(W).fill(0)); return a; };
    const blit = (g, spr, ox, oy) => spr.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#' && g[oy + y] && ox + x >= 0 && ox + x < W) g[oy + y][ox + x] = 1; }));
    const draw = g => {
      ctx.fillStyle = '#c9e3b4'; ctx.fillRect(0, 0, cv.width, cv.height);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        ctx.fillStyle = g[y][x] ? '#2a2346' : 'rgba(42,35,70,.07)';
        ctx.fillRect(x * cs + 1, y * cs + 1, cs - 2, cs - 2);
      }
    };
    const S = Art.SPR;
    const loop = ts => {
      frame++;
      const g = grid();
      const el = ts - t0;
      if (state === 'idle') {
        const off = Math.floor(frame / 30) % 2 ? 1 : -1;
        blit(g, S.egg, 10 + off, 2);
        if (Math.floor(frame / 45) % 2) blit(g, S.note.map(r => r.slice(4)), 25, 2);
        blit(g, ['#.#', '.#.', '#.#'], 2, 2);
      } else if (state === 'shake') {
        const off = (frame % 6 < 3) ? 2 : -2;
        blit(g, S.egg, 10 + off, 2);
        if (el > 600) blit(g, ['#.....#', '.#...#.', '..#.#..'], 12 + off, 6);
        if (el > 1400) { state = 'hatch'; t0 = ts; flash(); Sfx.jingle([392, 523, 659, 784, 1047]); }
      } else if (state === 'hatch') {
        const jump = Math.floor(el / 250) % 2 ? 0 : 2;
        blit(g, el % 800 < 400 ? S.blob : S.blob2, 9, 3 - jump + 2);
        blit(g, S.heart, 24, 2 + (jump ? 1 : 0));
        blit(g, S.heart, 1, 7 - (jump ? 1 : 0));
        if (el > 1700 && state !== 'zoom') { state = 'zoom'; zoom(); }
      } else {
        blit(g, S.blob2, 9, 4);
      }
      draw(g);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const flash = () => { const f = $('#gFlash'); f.classList.add('on'); setTimeout(() => f.classList.remove('on'), 260); };
    const finish = () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      g.classList.add('leave');
      setTimeout(() => { g.hidden = true; g.innerHTML = ''; g.classList.remove('leave'); onDone(); }, 650);
    };
    const zoom = () => {
      $('#gHint').textContent = 'chào mừng về nhà ♥';
      $('#gDevice').classList.add('zoom'); g.classList.add('zooming');
      setTimeout(finish, 900);
    };
    const press = b => {
      Sfx.click();
      if (b === 'B' && state === 'idle') { state = 'shake'; t0 = performance.now(); $('#gHint').textContent = 'rắc… rắc…'; $('.dev-btn.pulse')?.classList.remove('pulse'); }
      else if (b === 'A') { Sfx.jingle([659, 784, 988]); $('#gHint').innerHTML = 'nút A: chọn — thử nút <b>B</b> nhé!'; }
      else if (b === 'C') finish();
    };
    $$('.dev-btn', g).forEach(el => el.addEventListener('click', () => { el.classList.add('down'); setTimeout(() => el.classList.remove('down'), 120); press(el.dataset.b); }));
    const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press('B'); } if (e.key === 'Escape') finish(); };
    document.addEventListener('keydown', onKey);
    $('#gSkip').onclick = finish;
  }
};
