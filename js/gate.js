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
    const icon = n => Art.pixel(n, { px: 1.5, c: '#8f86b8' });
    g.innerHTML = `
    <div class="g2-bg" aria-hidden="true"><i class="o1"></i><i class="o2"></i><i class="o3"></i><i class="o4"></i><div class="g2-grain"></div></div>

    <header class="g2-top">
      <span class="g2-mark">${Art.creature('egg', { size: 26 })}<b>chữ-tchi</b></span>
      <button class="g2-skip" id="gSkip">Bỏ qua <span aria-hidden="true">→</span></button>
    </header>

    <main class="g2-main">
      <section class="g2-copy">
        <p class="g2-eyebrow">Sổ tay cá nhân · Số 01</p>
        <h1 class="g2-title"><span>Hành tinh</span><strong>Chữ‑tchi</strong></h1>
        <p class="g2-lede">Nơi tôi viết, đọc, lưu giữ và học ngoại ngữ. Mọi thứ được ấp trong một quả trứng nhỏ.</p>
        <ul class="g2-rooms">
          <li style="--d:#ff7eb6"><b>Phòng viết</b><span>văn học, triết học, âm nhạc, hội hoạ…</span></li>
          <li style="--d:#7cc4ff"><b>Kho lưu trữ</b><span>tài liệu từ mọi nguồn</span></li>
          <li style="--d:#ffcf4a"><b>Thư viện</b><span>sách theo bản đồ thế giới</span></li>
          <li style="--d:#8fd16a"><b>Lớp ngoại ngữ</b><span>thẻ từ, ôn tập, trò chơi</span></li>
        </ul>
      </section>

      <section class="g2-stage">
        <div class="g2-zoom" id="gZoom">
          <div class="g2-float" id="gFloat">
            <div class="g2-tilt" id="gTilt">
              <svg viewBox="0 0 360 470" class="g2-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Máy trứng Chữ-tchi">
                <defs>
                  <radialGradient id="gShell" cx="34%" cy="26%" r="80%">
                    <stop offset="0" stop-color="#ffffff"/><stop offset=".32" stop-color="#fdeaf6"/><stop offset=".68" stop-color="#e4d8ff"/><stop offset="1" stop-color="#b9a6f2"/>
                  </radialGradient>
                  <linearGradient id="gIri" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#9fdcff" stop-opacity=".0"/><stop offset=".5" stop-color="#9fdcff" stop-opacity=".35"/><stop offset="1" stop-color="#ffb3dd" stop-opacity=".0"/>
                  </linearGradient>
                  <linearGradient id="gPlate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#efe8ff"/></linearGradient>
                  <linearGradient id="gLcd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcebd0"/><stop offset="1" stop-color="#c8dcba"/></linearGradient>
                  <radialGradient id="gBtn" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2d8fb"/></radialGradient>
                  <radialGradient id="gBtnB" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ffb6d6"/><stop offset=".55" stop-color="#ff6fa8"/><stop offset="1" stop-color="#e64a8c"/></radialGradient>
                  <linearGradient id="gMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#c7c3d6"/><stop offset="1" stop-color="#8e89a6"/></linearGradient>
                  <filter id="gBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
                  <filter id="gSoft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#5b4a9a" flood-opacity=".25"/></filter>
                  <filter id="gInset"><feOffset dy="2"/><feGaussianBlur stdDeviation="2.5" result="b"/><feComposite in="SourceGraphic" in2="b" operator="arithmetic" k2="-1" k3="1" result="s"/><feFlood flood-color="#2a2346" flood-opacity=".35"/><feComposite in2="s" operator="in"/><feComposite in2="SourceGraphic" operator="over"/></filter>
                </defs>

                <!-- móc khoá -->
                <circle cx="180" cy="30" r="20" fill="none" stroke="url(#gMetal)" stroke-width="5"/>
                ${[0, 1, 2, 3, 4].map(i => `<circle cx="180" cy="${58 + i * 9}" r="4.2" fill="url(#gMetal)"/>`).join('')}
                <rect x="166" y="96" width="28" height="18" rx="7" fill="#dcd3f7"/>

                <!-- vỏ trứng -->
                <path d="M180 106 C288 106 340 236 340 318 C340 412 270 462 180 462 C90 462 20 412 20 318 C20 236 72 106 180 106Z" fill="url(#gShell)"/>
                <path d="M180 106 C288 106 340 236 340 318 C340 412 270 462 180 462 C90 462 20 412 20 318 C20 236 72 106 180 106Z" fill="url(#gIri)"/>
                <path d="M180 106 C288 106 340 236 340 318 C340 412 270 462 180 462 C90 462 20 412 20 318 C20 236 72 106 180 106Z" fill="none" stroke="#7a68c4" stroke-opacity=".28" stroke-width="2"/>
                <ellipse cx="118" cy="190" rx="44" ry="22" fill="#fff" opacity=".7" filter="url(#gBlur)" transform="rotate(-32 118 190)"/>

                <!-- mặt máy -->
                <rect x="72" y="176" width="216" height="168" rx="34" fill="url(#gPlate)" filter="url(#gSoft)"/>
                <text x="180" y="200" text-anchor="middle" class="g2-brand">CHỮ · TCHI</text>
                <g transform="translate(104 208)">${['pen', 'box', 'book', 'abc'].map((n, i) => `<g transform="translate(${i * 40} 0)" opacity=".75">${icon(n)}</g>`).join('')}</g>
                <rect x="96" y="226" width="168" height="98" rx="14" fill="#2a2346"/>
                <rect x="104" y="232" width="152" height="86" rx="9" fill="url(#gLcd)" filter="url(#gInset)"/>
                <g transform="translate(104 328)">${['note', 'mail', 'pet', 'gear'].map((n, i) => `<g transform="translate(${i * 40} 0)" opacity=".75">${icon(n)}</g>`).join('')}</g>

                <!-- nút -->
                <g class="g2-btn" data-b="A" tabindex="0" role="button" aria-label="Nút A"><circle cx="118" cy="398" r="17" fill="url(#gBtn)" filter="url(#gSoft)"/><text x="118" y="432" class="g2-lbl">A</text></g>
                <g class="g2-btn g2-b" data-b="B" tabindex="0" role="button" aria-label="Nút B: mở trứng">
                  <circle class="g2-ring" cx="180" cy="410" r="24" fill="none" stroke="#ff6fa8" stroke-width="2"/>
                  <circle cx="180" cy="410" r="24" fill="url(#gBtnB)" filter="url(#gSoft)"/>
                  <ellipse cx="173" cy="401" rx="9" ry="5" fill="#fff" opacity=".55"/>
                  <text x="180" y="450" class="g2-lbl">B</text>
                </g>
                <g class="g2-btn" data-b="C" tabindex="0" role="button" aria-label="Nút C: bỏ qua"><circle cx="242" cy="398" r="17" fill="url(#gBtn)" filter="url(#gSoft)"/><text x="242" y="432" class="g2-lbl">C</text></g>
              </svg>
              <canvas id="lcd" width="320" height="160"></canvas>
            </div>
          </div>
          <div class="g2-floor" aria-hidden="true"></div>
        </div>
        <p class="g2-hint" id="gHint">Nhấn nút giữa để mở <kbd>Enter</kbd></p>
      </section>
    </main>
    <div class="g2-flash" id="gFlash"></div>`;

    /* ---- màn LCD ma trận điểm ---- */
    const cv = $('#lcd'), ctx = cv.getContext('2d');
    const W = 32, H = 16, cs = 10;
    let frame = 0, state = 'idle', t0 = 0, raf;
    const grid = () => Array.from({ length: H }, () => new Array(W).fill(0));
    const blit = (gr, spr, ox, oy) => spr.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#' && gr[oy + y] && ox + x >= 0 && ox + x < W) gr[oy + y][ox + x] = 1; }));
    const draw = gr => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        ctx.fillStyle = gr[y][x] ? 'rgba(42,35,70,.92)' : 'rgba(42,35,70,.06)';
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
        if (el > 1200 && state === 'hatch') { state = 'zoom'; zoom(); }
      }
      draw(gr);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    /* ---- nghiêng theo chuột ---- */
    const tilt = $('#gTilt');
    const onMove = e => {
      if (reduce || state === 'zoom') return;
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      tilt.style.setProperty('--ry', (x * 14).toFixed(2) + 'deg');
      tilt.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
    };
    addEventListener('pointermove', onMove);

    /* ---- phóng vào màn hình ---- */
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey); removeEventListener('pointermove', onMove);
      g.classList.add('leave');
      setTimeout(() => { g.hidden = true; g.innerHTML = ''; g.className = 'gate'; onDone(); }, 600);
    };
    const zoom = () => {
      if (reduce) return setTimeout(finish, 300);
      g.classList.add('zooming');
      tilt.style.setProperty('--rx', '0deg'); tilt.style.setProperty('--ry', '0deg');
      requestAnimationFrame(() => {
        const z = $('#gZoom'), zr = z.getBoundingClientRect(), r = cv.getBoundingClientRect();
        const ox = r.left + r.width / 2 - zr.left, oy = r.top + r.height / 2 - zr.top;
        const s = Math.max(innerWidth / r.width, innerHeight / r.height) * 1.08;
        z.style.transformOrigin = `${ox}px ${oy}px`;
        z.style.transform = `translate(${innerWidth / 2 - (zr.left + ox)}px, ${innerHeight / 2 - (zr.top + oy)}px) scale(${s})`;
        setTimeout(() => $('#gFlash').classList.add('on'), 700);
        setTimeout(finish, 1050);
      });
    };
    const press = b => {
      Sfx.click();
      const el = $(`.g2-btn[data-b="${b}"]`, g); el?.classList.add('down'); setTimeout(() => el?.classList.remove('down'), 140);
      if (b === 'B' && state === 'idle') { state = 'shake'; t0 = performance.now(); g.classList.add('opening'); $('#gHint').textContent = 'Trứng đang nở…'; }
      else if (b === 'A') { Sfx.jingle([659, 784, 988]); $('#gHint').innerHTML = 'Thử nút giữa nhé <kbd>Enter</kbd>'; }
      else if (b === 'C') finish();
    };
    $$('.g2-btn', g).forEach(el => {
      el.addEventListener('click', () => press(el.dataset.b));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); press(el.dataset.b); } });
    });
    const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press('B'); } if (e.key === 'Escape') finish(); };
    document.addEventListener('keydown', onKey);
    $('#gSkip').onclick = finish;
  }
};
