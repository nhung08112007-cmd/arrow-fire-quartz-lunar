/* =========================================================
   CẢNH PHÒNG (bản dựng lại) — mặt cắt căn phòng kiểu máy nuôi thú
   Bố cục chung cho mọi phòng:
   · Tường có giấy sọc nhạt + chân tường; sàn gỗ có thảm
   · Đồ đạc lớn ĐỨNG trên sàn (không lơ lửng), đồ treo thì có móc/giá
   · Nhân vật đứng trên sàn hoặc ngồi trên đồ vật, cùng một tỉ lệ
   · Trái nặng – phải nhẹ, chừa khoảng thở ở giữa
   Thay thế Art.scene cũ.
   ========================================================= */
(() => {
  const K = '#2a2346';
  const FL = 212;                 // vạch chân tường / bắt đầu sàn
  const S = (w = 3.4) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const g = (x, y, inner, sc = 1) => `<g transform="translate(${x} ${y}) scale(${sc})">${inner}</g>`;
  /* nhân vật đặt theo điểm chân (x giữa, y mặt sàn) */
  const who = (name, x, y, sc = .82, mood = 'joy', flip = false) => {
    const fn = typeof TAMA !== 'undefined' && TAMA[name]; if (!fn) return '';
    return `<g transform="translate(${x - (flip ? -50 : 50) * sc} ${y - 95 * sc}) scale(${flip ? -sc : sc} ${sc})">${fn({ mood })}</g>`;
  };

  /* ---------- đồ treo tường ---------- */
  const windowW = (x, y, w = 96, h = 78, out = '') => `
    <rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="6" fill="#fff" ${S()}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#bfe6ff" ${S(2.6)}/>
    <path d="M${x + 10} ${y + h - 18} q10 -12 22 -4 q8 -10 18 0 q10 -2 10 6z" fill="#fff" opacity=".9"/>
    ${out}
    <path d="M${x + w / 2} ${y} v${h} M${x} ${y + h / 2} h${w}" ${S(3)}/>
    <path d="M${x - 14} ${y - 10} q10 ${h / 2} -2 ${h + 18} h18 q-8 ${-h / 2} 4 ${-h - 18}z" fill="#ff9fc8" ${S(3)}/>
    <path d="M${x + w + 14} ${y - 10} q-10 ${h / 2} 2 ${h + 18} h-18 q8 ${-h / 2} -4 ${-h - 18}z" fill="#ff9fc8" ${S(3)}/>
    <path d="M${x - 20} ${y - 12} h${w + 40}" ${S(4)}/>`;
  const picture = (x, y, w = 56, h = 44, c = '#ffe14d') => `
    <path d="M${x + w / 2} ${y - 14} l${-w / 3} 14 M${x + w / 2} ${y - 14} l${w / 3} 14" ${S(2)}/><circle cx="${x + w / 2}" cy="${y - 14}" r="2.6" fill="${K}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#fff" ${S()}/>
    <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" fill="${c}"/>
    <path d="M${x + 8} ${y + h - 8} l${w * .22} ${-h * .32} l${w * .14} ${h * .14} l${w * .14} ${-h * .2} l${w * .26} ${h * .38}z" fill="#7fd36a" ${S(2)}/>`;
  const clock = (x, y, r = 22) => `
    <circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${S()}/><circle cx="${x}" cy="${y}" r="${r - 6}" fill="#fffbe6" stroke="${K}" stroke-width="1.5" opacity=".9"/>
    ${[0, 90, 180, 270].map(a => `<path d="M${x} ${y - r + 5} v4" ${S(2.4)} transform="rotate(${a} ${x} ${y})"/>`).join('')}
    <path d="M${x} ${y} v${-r + 9} M${x} ${y} l${r - 11} 5" ${S(3)}/><circle cx="${x}" cy="${y}" r="2.6" fill="#ff5a6e" ${S(1.6)}/>`;
  const wallShelf = (x, y, w, items = '') => `${items}
    <rect x="${x}" y="${y}" width="${w}" height="8" rx="2" fill="#f2b56b" ${S()}/>
    <path d="M${x + 12} ${y + 8} v10 l10 -10 M${x + w - 12} ${y + 8} v10 l-10 -10" fill="none" ${S(2.6)}/>`;
  const bookRow = (x, y, n, hs = [34, 30, 36, 28, 33, 31, 35]) => {
    const cs = ['#ff8fc8', '#5cb8ff', '#ffd23f', '#7fd36a', '#b48cff', '#ff9f43', '#ff5a6e'];
    let cx = x; return [...Array(n)].map((_, i) => { const h = hs[i % hs.length], w = 11 + (i % 3); const s = `<rect x="${cx}" y="${y - h}" width="${w}" height="${h}" rx="2" fill="${cs[i % cs.length]}" ${S(2.4)}/><path d="M${cx + 3} ${y - h + 7} h${w - 6}" stroke="#fff" stroke-width="2" opacity=".8"/>`; cx += w + 1; return s; }).join('');
  };
  const note = (x, y, c = '#fff6a0', r = -6) => `<g transform="rotate(${r} ${x + 20} ${y + 18})"><rect x="${x}" y="${y}" width="40" height="36" fill="${c}" ${S(2.6)}/><path d="M${x + 7} ${y + 13} h24 M${x + 7} ${y + 21} h18 M${x + 7} ${y + 29} h22" stroke="#a99" stroke-width="2" stroke-linecap="round"/><rect x="${x + 12}" y="${y - 6}" width="16" height="9" fill="#ff9fc8" opacity=".8"/></g>`;
  const lampHang = (x, len = 40) => `<path d="M${x} 14 v${len}" ${S(2.6)}/><path d="M${x - 22} ${len + 30} q22 -34 44 0z" fill="#ff5a6e" ${S()}/><path d="M${x - 10} ${len + 31} q10 10 20 0" fill="#fff6a0" ${S(2.4)}/>`;

  /* ---------- đồ đứng trên sàn (y = điểm chạm sàn) ---------- */
  const desk = (x, y, w = 150, c = '#ffad4d', top = '') => `
    <path d="M${x + 14} ${y - 52} v52 M${x + w - 14} ${y - 52} v52" ${S(5)}/>
    <rect x="${x + w - 58}" y="${y - 50}" width="44" height="30" rx="3" fill="${c}" ${S()}/><path d="M${x + w - 42} ${y - 36} h12" ${S(3)}/>
    <rect x="${x}" y="${y - 62}" width="${w}" height="12" rx="4" fill="${c}" ${S()}/>
    ${top}`;
  const bookcase = (x, y, w = 110, h = 150) => `
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="5" fill="#f2b56b" ${S()}/>
    <rect x="${x + 8}" y="${y - h + 8}" width="${w - 16}" height="${h - 22}" fill="#c98a4b" ${S(2.4)}/>
    ${[0, 1, 2].map(i => { const sy = y - h + 8 + (i + 1) * (h - 22) / 3; return `${bookRow(x + 12, sy - 2, Math.floor((w - 24) / 13), i === 1 ? [30, 26, 32, 28] : undefined)}<path d="M${x + 8} ${sy} h${w - 16}" ${S(3)}/>`; }).join('')}
    <path d="M${x + 10} ${y} v6 M${x + w - 10} ${y} v6" ${S(4)}/>`;
  const cabinet = (x, y, w = 74, h = 120, c = '#8fd3ff') => `
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="5" fill="${c}" ${S()}/>
    ${[0, 1, 2].map(i => { const dy = y - h + 8 + i * (h - 16) / 3; return `<rect x="${x + 7}" y="${dy}" width="${w - 14}" height="${(h - 16) / 3 - 6}" rx="3" fill="#fffbe9" ${S(2.6)}/><rect x="${x + w / 2 - 10}" y="${dy + 8}" width="20" height="7" rx="3.5" fill="#ffd23f" ${S(2)}/>`; }).join('')}
    <path d="M${x + 8} ${y} v5 M${x + w - 8} ${y} v5" ${S(4)}/>`;
  const box = (x, y, w = 60, h = 44, c = '#ffd39a') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${c}" ${S()}/><path d="M${x + w / 2 - 9} ${y - h} v16 h18 v-16" fill="#fff" opacity=".7" ${S(2)}/>`;
  const plant = (x, y, s = 1) => g(x, y, `<path d="M0 -40 q-24 -16 -20 -40 q16 6 20 30 q4 -30 22 -36 q2 24 -18 46z" fill="#6fcf5a" ${S(3)}/><path d="M-14 -34 h28 l-4 34 h-20z" fill="#ff8a5c" ${S()}/><path d="M-14 -28 h28" ${S(2.4)}/>`, s);
  const rug = (cx, w = 220, c = '#ffd3e6') => `<ellipse cx="${cx}" cy="${FL + 46}" rx="${w / 2}" ry="22" fill="${c}" ${S(3)}/><ellipse cx="${cx}" cy="${FL + 46}" rx="${w / 2 - 14}" ry="14" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="6 6" opacity=".8"/>`;
  const env = (x, y, r = 0) => `<g transform="rotate(${r} ${x + 17} ${y + 12})"><rect x="${x}" y="${y}" width="34" height="24" rx="2" fill="#fffbe6" ${S(2.6)}/><path d="M${x} ${y + 2} l17 12 l17 -12" fill="none" ${S(2.2)}/><path d="M${x + 17} ${y + 13} l-3 -3 a2 2 0 0 1 3 -2 a2 2 0 0 1 3 2z" fill="#ff6fae"/></g>`;
  const stamp = (x, y, c, t, r = 0) => `<g transform="rotate(${r} ${x + 22} ${y + 26})"><path d="M${x} ${y} h44 v52 h-44z" fill="#fff" ${S(2.6)} stroke-dasharray="4 3"/><rect x="${x + 6}" y="${y + 6}" width="32" height="40" fill="${c}" ${S(2)}/><text x="${x + 22}" y="${y + 33}" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="16" fill="#fff" stroke="${K}" stroke-width=".8">${t}</text></g>`;

  /* ---------- khung chung ---------- */
  function room(wall, floor, inner, rugC) {
    const id = 'rm' + Math.random().toString(36).slice(2, 7);
    return `<svg class="art scene-svg" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
      <defs><clipPath id="${id}"><rect x="14" y="14" width="452" height="272" rx="40"/></clipPath>
        <pattern id="${id}s" width="28" height="10" patternUnits="userSpaceOnUse"><rect width="14" height="10" fill="#fff" opacity=".28"/></pattern></defs>
      <g clip-path="url(#${id})">
        <rect x="0" y="0" width="480" height="${FL}" fill="${wall}"/><rect x="0" y="0" width="480" height="${FL}" fill="url(#${id}s)"/>
        <rect x="0" y="${FL}" width="480" height="${300 - FL}" fill="${floor}"/>
        ${[FL + 20, FL + 44, FL + 70].map((y, i) => `<path d="M0 ${y} h480" stroke="${K}" stroke-width="1.6" opacity=".14"/>${[0, 1, 2, 3, 4, 5].map(j => `<path d="M${(j * 96 + i * 40) % 480} ${y - (i ? 24 : 20)} v${i ? 24 : 20}" stroke="${K}" stroke-width="1.6" opacity=".12"/>`).join('')}`).join('')}
        <rect x="0" y="${FL - 10}" width="480" height="12" fill="#fff" opacity=".55"/><path d="M0 ${FL - 10} h480 M0 ${FL + 2} h480" stroke="${K}" stroke-width="3"/>
        ${rugC ? rug(250, 230, rugC) : ''}
        ${inner}
      </g>
      <rect x="14" y="14" width="452" height="272" rx="40" fill="none" stroke="${K}" stroke-width="6"/>
    </svg>`;
  }

  const ROOMS = {
    write: () => room('#ffe3f0', '#ffcf99', `
      ${windowW(54, 46, 92, 74)}
      ${note(172, 60, '#fff6a0', -8)}${note(214, 74, '#d9f1ff', 6)}
      ${wallShelf(330, 104, 112, bookRow(342, 102, 6) + plant(422, 102, .55))}
      ${lampHang(292, 22)}
      ${desk(140, FL + 40, 160, '#ffad4d', `
        <rect x="160" y="${FL - 36}" width="46" height="14" rx="2" fill="#fff" ${S(2.6)} transform="rotate(-4 183 ${FL - 29})"/>
        <path d="M222 ${FL - 22} h28 l-3 -24 h-22z" fill="#8fd3ff" ${S(3)}/><path d="M232 ${FL - 46} l-4 -16 M238 ${FL - 46} l6 -18" ${S(2.6)}/>`)}
      ${who('pencil', 270, FL - 22, .42, 'wink')}
      ${who('mascot', 360, FL + 44, .86, 'joy')}`, '#fff3c4'),

    archive: () => room('#dcefff', '#a9d6f5', `
      ${clock(250, 72)}
      ${picture(310, 64, 70, 54, '#ffd3e6')}
      ${cabinet(40, FL + 34, 80, 140)}${cabinet(126, FL + 34, 80, 140, '#b8e8ff')}
      ${box(334, FL + 40, 70, 48)}${box(352, FL - 8, 56, 40, '#ffb3dd')}${box(404, FL + 40, 46, 34, '#fff3c4')}
      ${env(380, FL - 70, -10)}
      ${who('ghost', 262, FL + 34, .9, 'joy')}`),

    books: () => room('#fff3c4', '#e8b07a', `
      ${bookcase(36, FL + 34, 128, 168)}
      ${windowW(214, 44, 88, 70)}
      ${picture(372, 56, 60, 46, '#bfe6ff')}
      <path d="M262 ${FL + 34} v-40 M248 ${FL + 34} h28" ${S(4)}/>
      <circle cx="262" cy="${FL - 34}" r="30" fill="#7ec8ff" ${S()}/>
      <path d="M244 ${FL - 52} q10 4 12 16 q-12 4 -18 -6z M268 ${FL - 58} q14 2 18 14 q-8 10 -16 4 q-6 -8 -2 -18z M256 ${FL - 20} q8 -6 16 0 q-4 10 -12 8z" fill="#7fd36a" ${S(2.4)}/>
      <path d="M228 ${FL - 34} a34 34 0 0 0 68 0" fill="none" stroke="#ffd23f" stroke-width="5"/>
      ${bookRow(300, FL + 40, 3, [16, 14, 18])}
      ${who('booky', 400, FL + 44, .84, 'joy')}`, '#ffe0b0'),

    lang: () => room('#e1f6d6', '#d1a77c', `
      <rect x="128" y="34" width="210" height="122" rx="6" fill="#b8763e" ${S()}/>
      <rect x="140" y="46" width="186" height="98" fill="#2f8a5f" ${S(2.6)}/>
      <text x="233" y="90" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="28" fill="#fff">あ · A · 字</text>
      <text x="233" y="124" text-anchor="middle" font-family="Patrick Hand,cursive" font-size="20" fill="#fff" opacity=".85">Hello · こんにちは</text>
      <rect x="176" y="156" width="40" height="7" rx="3" fill="#fff" ${S(2)}/>
      ${clock(400, 66, 20)}
      ${desk(300, FL + 40, 150, '#ffad4d', `
        <path d="M330 ${FL - 22} q-4 -40 26 -40 q30 0 26 40z" fill="#d9f4ff" fill-opacity=".85" ${S(3)}/>
        ${who('fish', 356, FL - 26, .34, 'joy')}
        ${who('tomato', 420, FL - 22, .36, 'star')}`)}
      ${who('prof', 92, FL + 44, .9, 'happy')}
      <path d="M128 ${FL - 8} l44 -64" ${S(4)}/>`, '#fff3c4'),

    mail: () => room('#ffe6dc', '#f5b878', `
      ${windowW(300, 44, 104, 80, who('cloud', 352, 116, .5, 'joy'))}
      <path d="M40 52 q100 34 210 0" fill="none" ${S(2.4)}/>
      ${env(70, 58, -8)}${env(130, 70, 4)}${env(190, 62, 10)}
      <path d="M86 ${FL + 38} v-74" stroke="${K}" stroke-width="12" stroke-linecap="round"/><path d="M86 ${FL + 38} v-74" stroke="#b8763e" stroke-width="6" stroke-linecap="round"/>
      <path d="M42 ${FL - 40} q0 -34 34 -34 h22 q32 0 32 34 v28 h-88z" fill="#ff5a5a" ${S()}/>
      <rect x="52" y="${FL - 46}" width="46" height="7" rx="3.5" fill="${K}"/>
      <path d="M130 ${FL - 52} v-26 h20 v12 h-20" fill="#ffd23f" ${S(3)}/>
      <circle cx="68" cy="${FL - 26}" r="2.6" fill="${K}"/><circle cx="96" cy="${FL - 26}" r="2.6" fill="${K}"/><path d="M76 ${FL - 20} q6 5 12 0" fill="none" ${S(2.4)}/>
      <path d="M210 ${FL + 40} v-48 M282 ${FL + 40} v-48" ${S(4)}/><rect x="198" y="${FL - 14}" width="96" height="10" rx="3" fill="#ffad4d" ${S()}/>
      <path d="M216 ${FL - 14} l6 -22 h48 l6 22z" fill="#e6c08a" ${S(3)}/>${env(222, FL - 44, -6)}${env(244, FL - 48, 8)}
      ${who('tomato', 380, FL + 44, .62, 'wink')}`, '#fff1d6'),

    stamps: () => room('#ffe0ec', '#f5b8c8', `
      <rect x="44" y="40" width="200" height="120" rx="6" fill="#e2b178" ${S()}/>
      ${stamp(60, 56, '#ff5a6e', 'GIỎI', -6)}${stamp(118, 60, '#5cb8ff', '★', 4)}${stamp(178, 54, '#7fd36a', '✓', -3)}
      ${[[80, 52], [140, 56], [198, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#ff5a6e" ${S(1.8)}/>`).join('')}
      ${picture(330, 58, 70, 54, '#fff3c4')}
      ${desk(270, FL + 40, 170, '#ff9fc8', `
        <path d="M296 ${FL - 22} l6 -18 h40 l6 18z" fill="#fff" ${S(3)}/><path d="M322 ${FL - 40} v18" ${S(2)}/>
        <rect x="372" y="${FL - 46}" width="20" height="16" rx="3" fill="#ff5a6e" ${S(2.6)}/><path d="M382 ${FL - 30} v8 M372 ${FL - 22} h20" ${S(4)}/>`)}
      ${who('star', 120, FL + 44, .8, 'joy')}
      ${who('tomato', 212, FL + 44, .56, 'star')}`, '#fff3c4'),

    quotes: () => room('#fff0d6', '#f2c48d', `
      <rect x="40" y="38" width="196" height="118" rx="6" fill="#e2b178" ${S()}/>
      ${note(54, 54, '#fff6a0', -6)}${note(104, 62, '#ffd3e6', 5)}${note(156, 52, '#d9f1ff', -3)}${note(80, 104, '#ddf3cc', 4)}${note(140, 108, '#fff6a0', -5)}
      ${windowW(300, 46, 84, 66)}
      <path d="M304 ${FL + 40} v8 M406 ${FL + 40} v8" ${S(5)}/>
      <path d="M300 ${FL + 12} v-72 q0 -24 24 -24 h62 q24 0 24 24 v72z" fill="#b48cff" ${S()}/>
      <path d="M318 ${FL - 60} q37 -14 74 0" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
      ${who('booky', 355, FL + 6, .66, 'calm')}
      <rect x="298" y="${FL + 2}" width="114" height="40" rx="12" fill="#c9b6ff" ${S()}/>
      <rect x="282" y="${FL - 26}" width="30" height="70" rx="14" fill="#a08cf5" ${S()}/>
      <rect x="398" y="${FL - 26}" width="30" height="70" rx="14" fill="#a08cf5" ${S()}/>
      ${who('star', 150, FL + 44, .74, 'joy')}`, '#ffe0b0'),

    settings: () => room('#ece4ff', '#c4b0f0', `
      <rect x="40" y="40" width="150" height="104" rx="6" fill="#d9c9a6" ${S()}/>
      ${[0, 1, 2, 3, 4].map(i => [0, 1, 2, 3].map(j => `<circle cx="${56 + i * 30}" cy="${56 + j * 24}" r="2" fill="${K}" opacity=".35"/>`).join('')).join('')}
      <path d="M66 68 l26 26 M60 62 a8 8 0 1 0 12 0" fill="none" ${S(5)}/>
      <path d="M126 60 v40 M118 100 h16 l-2 16 h-12z" fill="#ff5a6e" ${S(3)}/>
      <path d="M156 60 a14 14 0 1 0 0.1 0" fill="#ffd23f" ${S(3)}/><circle cx="156" cy="74" r="5" fill="#fff" ${S(2)}/>
      ${clock(400, 66, 20)}
      ${desk(230, FL + 40, 200, '#9fd3ff', `
        <rect x="262" y="${FL - 104}" width="84" height="66" rx="8" fill="#fff6e6" ${S()}/>
        <rect x="272" y="${FL - 96}" width="64" height="44" rx="4" fill="#2f8a5f" ${S(2.6)}/>
        <text x="304" y="${FL - 68}" text-anchor="middle" font-family="VT323,monospace" font-size="20" fill="#cfffc0">OK_</text>
        <path d="M290 ${FL - 38} l-6 14 h40 l-6 -14" fill="#fff6e6" ${S(3)}/>
        <rect x="356" y="${FL - 26}" width="58" height="12" rx="3" fill="#fff" ${S(2.6)}/>`)}
      ${box(150, FL + 40, 64, 36, '#ff8a5c')}<path d="M166 ${FL + 4} q16 -16 32 0" fill="none" ${S(4)}/>
      ${who('mascot', 84, FL + 44, .86, 'happy')}`, '#fff3c4'),
  };

  ROOMS.music = () => room('#ece4ff', '#e8b07a', `
    ${windowW(56, 46, 86, 70)}
    ${wallShelf(300, 92, 130, `<rect x="314" y="58" width="34" height="34" rx="2" fill="#ff8fc8" ${S(2.6)}/><circle cx="331" cy="75" r="9" fill="${K}"/><circle cx="331" cy="75" r="3" fill="#ffd23f"/>
      <rect x="352" y="60" width="32" height="32" rx="2" fill="#5cb8ff" ${S(2.6)}/><circle cx="368" cy="76" r="8" fill="${K}"/><circle cx="368" cy="76" r="2.6" fill="#fff"/>${plant(412, 92, .5)}`)}
    <path d="M190 74 q4 -10 12 -6 M236 58 q4 -10 12 -6" fill="none" ${S(2.6)}/>
    <path d="M200 70 v-24 l12 -4 v24" fill="none" ${S(2.6)}/><ellipse cx="197" cy="72" rx="5" ry="4" fill="#b48cff" ${S(2)}/><ellipse cx="209" cy="68" rx="5" ry="4" fill="#b48cff" ${S(2)}/>
    <path d="M246 56 v-22" ${S(2.6)}/><ellipse cx="243" cy="58" rx="5" ry="4" fill="#ff8fc8" ${S(2)}/>
    ${desk(150, FL + 40, 170, '#ffad4d', `
      <path d="M190 ${FL - 22} v-40 l22 -16 h78 l-22 16 v40z" fill="#ff8fc8" ${S()}/>
      <path d="M268 ${FL - 22} v-40 l22 -16 v40z" fill="#e8669f" ${S()}/><path d="M190 ${FL - 62} h78" ${S(3)}/>
      <rect x="202" y="${FL - 54}" width="54" height="24" rx="4" fill="#fff6d8" ${S(2.6)}/><rect x="208" y="${FL - 48}" width="42" height="12" rx="6" fill="#ffd23f" ${S(2)}/>
      <path d="M290 ${FL - 52} h10 v-8 h6 v20 h-6 v-8" fill="#ffd23f" ${S(2.4)}/>`)}
    ${who('note', 390, FL + 44, .8, 'joy')}`, '#fff3c4');

  ROOMS.pet = () => room('#fff3c4', '#ffc98f', `
    ${windowW(300, 44, 100, 74, `<circle cx="378" cy="66" r="10" fill="#ffe14d" ${S(2)}/>`)}
    ${picture(92, 56, 62, 48, '#ffd3e6')}
    <rect x="40" y="${FL - 30}" width="190" height="60" rx="10" fill="#ff9fc8" ${S()}/>
    <rect x="40" y="${FL - 86}" width="22" height="120" rx="8" fill="#f2b56b" ${S()}/>
    <rect x="212" y="${FL - 56}" width="22" height="90" rx="8" fill="#f2b56b" ${S()}/>
    <rect x="66" y="${FL - 46}" width="58" height="24" rx="12" fill="#fff" ${S(3)}/>
    <path d="M62 ${FL - 12} q80 -20 150 0 v26 h-150z" fill="#ffd3e6" ${S(3)}/>
    ${who('mascot', 168, FL - 8, .62, 'sleep')}
    <ellipse cx="350" cy="${FL + 36}" rx="44" ry="12" fill="#c9b6ff" ${S(3)}/>
    ${who('egg', 350, FL + 36, .62)}
    ${plant(440, FL + 40, .9)}`, '#ffe0b0');

  Art.scene = (kind, w) => (ROOMS[kind] || ROOMS.write)();
})();
