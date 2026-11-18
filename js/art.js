/* =========================================================
   ART — toàn bộ minh hoạ vẽ bằng SVG (nhân vật gốc, phong cách
   "đồ chơi trứng" thập niên 90: viền đen dày, má hồng, màu kẹo)
   ========================================================= */
const INK = '#2a2346';
const Art = (() => {
  const sw = 3.2;
  const svg = (inner, vb = '0 0 100 100', size = 80, extra = '') =>
    `<svg class="art" viewBox="${vb}" width="${size}" height="${size}" ${extra} xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;

  /* ---- mặt (dùng chung) ---- */
  function face(cx, cy, mood = 'happy', s = 1, eyeColor = INK) {
    const ex = 9 * s, ey = cy - 2 * s;
    let eyes = '', mouth = '';
    const eye = x => `<ellipse cx="${x}" cy="${ey}" rx="${3.6 * s}" ry="${4.4 * s}" fill="${eyeColor}"/><circle cx="${x + 1.2 * s}" cy="${ey - 1.6 * s}" r="${1.3 * s}" fill="#fff"/>`;
    const closed = x => `<path d="M${x - 4 * s} ${ey} q${4 * s} ${-4 * s} ${8 * s} 0" fill="none" stroke="${INK}" stroke-width="${2.6 * s}"/>`;
    const happyArc = x => `<path d="M${x - 4 * s} ${ey + 1 * s} q${4 * s} ${-6 * s} ${8 * s} 0" fill="none" stroke="${INK}" stroke-width="${2.6 * s}"/>`;
    const star = x => `<path d="M${x} ${ey - 5 * s} l${1.5 * s} ${3.5 * s} ${3.8 * s} .5 -${2.8 * s} ${2.5 * s} .8 ${3.8 * s} -${3.3 * s} -${2 * s} -${3.3 * s} ${2 * s} .8 -${3.8 * s} -${2.8 * s} -${2.5 * s} ${3.8 * s} -.5z" fill="${INK}"/>`;
    switch (mood) {
      case 'wink': eyes = eye(cx - ex) + `<path d="M${cx + ex - 4 * s} ${ey} l${7 * s} ${-2 * s} M${cx + ex - 4 * s} ${ey} l${7 * s} ${2.5 * s}" stroke="${INK}" stroke-width="${2.4 * s}"/>`; break;
      case 'sleep': eyes = closed(cx - ex).replace('-4', '-4') + closed(cx + ex); break;
      case 'joy': eyes = happyArc(cx - ex) + happyArc(cx + ex); break;
      case 'star': eyes = star(cx - ex) + star(cx + ex); break;
      case 'sad': eyes = eye(cx - ex) + eye(cx + ex) + `<path d="M${cx - ex - 5 * s} ${ey - 7 * s} l${6 * s} ${2 * s} M${cx + ex + 5 * s} ${ey - 7 * s} l${-6 * s} ${2 * s}" stroke="${INK}" stroke-width="${2 * s}"/>`; break;
      default: eyes = eye(cx - ex) + eye(cx + ex);
    }
    const my = cy + 6 * s;
    switch (mood) {
      case 'sleep': mouth = `<ellipse cx="${cx}" cy="${my + 1 * s}" rx="${2.4 * s}" ry="${2 * s}" fill="${INK}"/>`; break;
      case 'wow': mouth = `<ellipse cx="${cx}" cy="${my + 1 * s}" rx="${3.6 * s}" ry="${4.4 * s}" fill="${INK}"/><ellipse cx="${cx}" cy="${my + 3 * s}" rx="${2.2 * s}" ry="${1.6 * s}" fill="#ff7aa8"/>`; break;
      case 'sad': mouth = `<path d="M${cx - 4 * s} ${my + 3 * s} q${4 * s} ${-5 * s} ${8 * s} 0" fill="none" stroke="${INK}" stroke-width="${2.4 * s}"/>`; break;
      case 'calm': mouth = `<path d="M${cx - 3.5 * s} ${my} q${3.5 * s} ${3.5 * s} ${7 * s} 0" fill="none" stroke="${INK}" stroke-width="${2.4 * s}"/>`; break;
      default: mouth = `<path d="M${cx - 6 * s} ${my - 1 * s} q${6 * s} ${11 * s} ${12 * s} 0 z" fill="${INK}"/><path d="M${cx - 3 * s} ${my + 3.4 * s} q${3 * s} ${-2.6 * s} ${6 * s} 0 q${-3 * s} ${3 * s} ${-6 * s} 0" fill="#ff7aa8"/>`;
    }
    const blush = `<ellipse cx="${cx - ex - 6 * s}" cy="${cy + 4 * s}" rx="${4.6 * s}" ry="${2.8 * s}" fill="#ff9fc4" opacity=".85"/><ellipse cx="${cx + ex + 6 * s}" cy="${cy + 4 * s}" rx="${4.6 * s}" ry="${2.8 * s}" fill="#ff9fc4" opacity=".85"/>`;
    return blush + eyes + mouth;
  }

  /* ---- các nhân vật gốc ---- */
  const C = {
    /* Mực-tchi: linh vật — thân trứng kem, mũ giọt mực tím, lông chim */
    mascot(o) {
      const c = o.color || '#fff4cf';
      return `
      <ellipse cx="50" cy="93" rx="24" ry="4" fill="${INK}" opacity=".12"/>
      <ellipse cx="38" cy="88" rx="8" ry="5" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <ellipse cx="62" cy="88" rx="8" ry="5" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M50 30 C75 30 82 48 82 64 C82 80 68 88 50 88 C32 88 18 80 18 64 C18 48 25 30 50 30Z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M20 66 q-9 -2 -10 -10" fill="none" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M80 66 q9 -3 9 -12" fill="none" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M50 5 C43 16 30 24 30 34 C30 42 40 45 50 45 C60 45 70 42 70 34 C70 24 57 16 50 5Z" fill="${o.hat || '#6c5ce7'}" stroke="${INK}" stroke-width="${sw}"/>
      <ellipse cx="42" cy="28" rx="3" ry="6" fill="#fff" opacity=".55" transform="rotate(25 42 28)"/>
      <path d="M68 36 C78 26 88 22 94 14 C90 26 82 34 70 40Z" fill="#ffe14d" stroke="${INK}" stroke-width="2.4"/>
      ${face(50, 62, o.mood, 1)}`;
    },
    /* Nốt-tchi: hồng, ăng-ten nốt nhạc */
    note(o) {
      const c = o.color || '#ff8fc8';
      return `<ellipse cx="50" cy="93" rx="22" ry="4" fill="${INK}" opacity=".12"/>
      <path d="M58 30 L58 8 q10 3 14 10" fill="none" stroke="${INK}" stroke-width="${sw}"/>
      <ellipse cx="53" cy="30" rx="7" ry="5" fill="${INK}" transform="rotate(-20 53 30)"/>
      <path d="M50 34 C72 34 84 50 84 66 C84 82 70 90 50 90 C30 90 16 82 16 66 C16 50 28 34 50 34Z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M16 70 q-8 6 -4 12 M84 70 q8 6 4 12" fill="none" stroke="${INK}" stroke-width="${sw}"/>
      ${face(50, 64, o.mood, 1)}`;
    },
    /* Trang-tchi: quyển sách sống */
    booky(o) {
      const c = o.color || '#8fd16a';
      return `<ellipse cx="50" cy="94" rx="26" ry="4" fill="${INK}" opacity=".12"/>
      <path d="M36 88 v6 M64 88 v6" stroke="${INK}" stroke-width="${sw}"/>
      <rect x="18" y="22" width="64" height="68" rx="8" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <rect x="24" y="28" width="52" height="56" rx="5" fill="#fffdf4" stroke="${INK}" stroke-width="2.4"/>
      <path d="M18 34 h-4 M18 46 h-4 M18 58 h-4 M18 70 h-4" stroke="${INK}" stroke-width="2.6"/>
      <path d="M62 22 v14 l5 -4 l5 4 v-14" fill="#ff5a5a" stroke="${INK}" stroke-width="2.4"/>
      ${face(50, 58, o.mood, .95)}`;
    },
    /* Mây-tchi: đám mây có vầng hào quang */
    cloud(o) {
      const c = o.color || '#ffffff';
      return `<ellipse cx="50" cy="20" rx="16" ry="5" fill="none" stroke="#ffd23f" stroke-width="3.4"/>
      <path d="M22 80 C8 80 6 60 20 56 C16 38 38 30 46 40 C52 26 76 28 76 46 C92 44 96 70 80 80Z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M10 52 q-8 -8 0 -14 q2 8 8 8 M90 52 q8 -8 0 -14 q-2 8 -8 8" fill="#fff" stroke="${INK}" stroke-width="2.4"/>
      ${face(50, 60, o.mood, .9)}`;
    },
    /* Cà-tchi: cà chua đỏ có lá */
    tomato(o) {
      const c = o.color || '#ff5a5a';
      return `<ellipse cx="50" cy="93" rx="22" ry="4" fill="${INK}" opacity=".12"/>
      <circle cx="50" cy="60" r="31" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M50 30 l-12 -6 l6 10 l-12 2 l14 4 l4 8 l4 -8 l14 -4 l-12 -2 l6 -10z" fill="#5cc44f" stroke="${INK}" stroke-width="2.4"/>
      <path d="M50 26 q2 -10 8 -14" fill="none" stroke="${INK}" stroke-width="${sw}"/>
      <ellipse cx="34" cy="48" rx="4" ry="7" fill="#fff" opacity=".5" transform="rotate(30 34 48)"/>
      ${face(50, 62, o.mood, .95)}`;
    },
    /* Bóng-tchi: con ma nhỏ */
    ghost(o) {
      const c = o.color || '#e9e4ff';
      return `<path d="M22 86 V48 C22 26 36 16 50 16 C64 16 78 26 78 48 V86 l-9 -7 l-9 7 l-10 -7 l-10 7 l-9 -7z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M22 54 q-12 0 -14 -10 M78 54 q12 0 14 -10" fill="none" stroke="${INK}" stroke-width="${sw}"/>
      ${face(50, 48, o.mood || 'wow', 1)}`;
    },
    /* Bút-tchi: cây bút chì */
    pencil(o) {
      const c = o.color || '#ffd23f';
      return `<ellipse cx="50" cy="94" rx="18" ry="4" fill="${INK}" opacity=".12"/>
      <path d="M32 26 h36 v54 l-18 14 l-18 -14z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M32 80 l18 14 l18 -14 z" fill="#ffd9b0" stroke="${INK}" stroke-width="2.4"/>
      <path d="M45 90 l5 4 l5 -4z" fill="${INK}"/>
      <rect x="32" y="12" width="36" height="16" rx="4" fill="#ff8fc8" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M32 26 h36" stroke="${INK}" stroke-width="5"/>
      ${face(50, 50, o.mood, .85)}`;
    },
    /* Sao-tchi: ngôi sao */
    star(o) {
      const c = o.color || '#ffe14d';
      return `<path d="M50 6 l12 27 l30 3 l-23 20 l7 30 l-26 -15 l-26 15 l7 -30 l-23 -20 l30 -3z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      ${face(50, 50, o.mood, .8)}`;
    },
    /* Cá-tchi */
    fish(o) {
      const c = o.color || '#4aa8ff';
      return `<path d="M14 54 C14 30 52 22 72 40 l18 -14 v48 l-18 -14 C52 78 14 76 14 54Z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M40 30 q8 -14 20 -6" fill="${c}" stroke="${INK}" stroke-width="2.6"/>
      ${face(40, 52, o.mood, .8)}`;
    },
    /* Ếch kính: thầy giáo ngôn ngữ */
    prof(o) {
      const c = o.color || '#9be37a';
      return `<ellipse cx="50" cy="94" rx="24" ry="4" fill="${INK}" opacity=".12"/>
      <circle cx="34" cy="30" r="12" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <circle cx="66" cy="30" r="12" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <path d="M50 30 C76 30 86 48 86 64 C86 82 70 90 50 90 C30 90 14 82 14 64 C14 48 24 30 50 30Z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <circle cx="34" cy="30" r="5" fill="${INK}"/><circle cx="66" cy="30" r="5" fill="${INK}"/>
      <circle cx="35.5" cy="28.5" r="1.6" fill="#fff"/><circle cx="67.5" cy="28.5" r="1.6" fill="#fff"/>
      <circle cx="40" cy="58" r="9" fill="#dff4ff" fill-opacity=".6" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="60" cy="58" r="9" fill="#dff4ff" fill-opacity=".6" stroke="${INK}" stroke-width="2.4"/>
      <path d="M49 58 h2" stroke="${INK}" stroke-width="2.4"/>
      <circle cx="40" cy="58" r="2.4" fill="${INK}"/><circle cx="60" cy="58" r="2.4" fill="${INK}"/>
      <path d="M38 74 q12 8 24 0" fill="none" stroke="${INK}" stroke-width="2.6"/>
      <path d="M44 86 l6 -6 l6 6 l-6 4z" fill="#ff5a5a" stroke="${INK}" stroke-width="2"/>
      <ellipse cx="26" cy="68" rx="4" ry="2.4" fill="#ff9fc4"/><ellipse cx="74" cy="68" rx="4" ry="2.4" fill="#ff9fc4"/>`;
    },
    /* Trứng — giai đoạn đầu của thú nuôi */
    egg(o) {
      const c = o.color || '#fff';
      return `<ellipse cx="50" cy="93" rx="20" ry="4" fill="${INK}" opacity=".12"/>
      <path d="M50 8 C72 8 84 44 84 62 C84 80 70 92 50 92 C30 92 16 80 16 62 C16 44 28 8 50 8Z" fill="${c}" stroke="${INK}" stroke-width="${sw}"/>
      <circle cx="38" cy="40" r="6" fill="#ff8fc8"/><circle cx="62" cy="34" r="4" fill="#4aa8ff"/><circle cx="64" cy="64" r="7" fill="#ffe14d"/><circle cx="34" cy="70" r="5" fill="#8fd16a"/>
      ${o.crack ? `<path d="M18 58 l10 -6 l8 8 l10 -10 l8 8 l10 -8 l8 6 l10 -4" fill="none" stroke="${INK}" stroke-width="2.6"/>` : ''}`;
    }
  };

  function creature(name, o = {}) {
    const fn = (typeof TAMA !== 'undefined' && TAMA[name]) || C[name] || C.mascot;
    const anim = o.anim ? ` class="art bob-${o.anim}"` : '';
    return svg(fn(o), '0 0 100 100', o.size || 80, o.flip ? 'style="transform:scaleX(-1)"' : '').replace('class="art"', anim || 'class="art"');
  }
  const names = Object.keys(C).filter(n => n !== 'egg');

  /* ---- đồ trang trí ---- */
  const deco = {
    cloud: (w = 120, c = '#fff') => svg(`<path d="M20 50 C4 50 4 28 20 28 C20 10 46 8 52 22 C60 6 88 10 86 30 C100 30 100 50 86 50Z" fill="${c}" stroke="${INK}" stroke-width="3"/>`, '0 0 104 56', w),
    star: (w = 24, c = '#ffe14d') => svg(`<path d="M12 1 l3 7.5 8 .7 -6 5.4 1.8 8 -6.8 -4.2 -6.8 4.2 1.8 -8 -6 -5.4 8 -.7z" fill="${c}" stroke="${INK}" stroke-width="1.6"/>`, '0 0 24 24', w),
    sparkle: (w = 22, c = '#fff') => svg(`<path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0Z" fill="${c}" stroke="${INK}" stroke-width="1.4"/>`, '0 0 24 24', w),
    heart: (w = 22, c = '#ff6fae') => svg(`<path d="M12 21 C2 14 1 8 5 5 C8 2.5 11 4 12 7 C13 4 16 2.5 19 5 C23 8 22 14 12 21Z" fill="${c}" stroke="${INK}" stroke-width="1.8"/>`, '0 0 24 24', w),
    swirl: (w = 30, c = INK) => svg(`<path d="M15 15 m0 0 a3 3 0 1 1 3 3 a6 6 0 1 1 -6 -6 a9 9 0 1 1 9 9" fill="none" stroke="${c}" stroke-width="2"/>`, '0 0 30 30', w),
    note: (w = 26, c = '#b48cff') => svg(`<path d="M10 20 V5 l12 -3 v14" fill="none" stroke="${INK}" stroke-width="2"/><ellipse cx="7" cy="20" rx="4" ry="3" fill="${c}" stroke="${INK}" stroke-width="1.6"/><ellipse cx="19" cy="17" rx="4" ry="3" fill="${c}" stroke="${INK}" stroke-width="1.6"/>`, '0 0 26 26', w),
    ufo: (w = 120) => svg(`
      <path d="M24 44 q-8 18 -20 22 q14 -2 26 -12" fill="#ff8a3d" stroke="${INK}" stroke-width="2.4"/>
      <path d="M34 30 C34 10 86 10 86 30Z" fill="#ff8fc8" stroke="${INK}" stroke-width="3"/>
      <rect x="44" y="16" width="10" height="11" rx="2" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="47" cy="21" r="1.2" fill="${INK}"/><circle cx="51" cy="21" r="1.2" fill="${INK}"/>
      <circle cx="66" cy="21" r="6" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="64" cy="20" r="1.2" fill="${INK}"/><circle cx="68" cy="20" r="1.2" fill="${INK}"/>
      <ellipse cx="60" cy="34" rx="42" ry="11" fill="#7ec8ff" stroke="${INK}" stroke-width="3"/>
      <text x="60" y="38" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="9" fill="${INK}">CHỮ-TCHI</text>`, '0 0 110 50', w),
    worm: (w = 60) => svg(`<path d="M6 20 q8 -10 16 0 t16 0 t16 0" fill="none" stroke="#ffd23f" stroke-width="9"/><path d="M6 20 q8 -10 16 0 t16 0 t16 0" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="2 4"/><circle cx="54" cy="18" r="1.6" fill="${INK}"/>`, '0 0 62 30', w),
    flower: (w = 40, c = '#ffd23f') => svg(`<path d="M20 30 v16" stroke="#3aa35a" stroke-width="3"/><g fill="${c}" stroke="${INK}" stroke-width="2"><circle cx="20" cy="10" r="6"/><circle cx="29" cy="17" r="6"/><circle cx="26" cy="28" r="6"/><circle cx="14" cy="28" r="6"/><circle cx="11" cy="17" r="6"/></g><circle cx="20" cy="20" r="6" fill="#ff8a3d" stroke="${INK}" stroke-width="2"/><circle cx="18" cy="19" r="1" fill="${INK}"/><circle cx="22" cy="19" r="1" fill="${INK}"/>`, '0 0 40 48', w),
    tree: (w = 90) => svg(`<rect x="38" y="60" width="16" height="34" rx="4" fill="#b8763e" stroke="${INK}" stroke-width="3"/><path d="M20 66 C2 64 2 40 18 38 C14 16 40 6 50 18 C62 4 90 16 82 38 C98 42 94 68 76 66Z" fill="#6fcf5a" stroke="${INK}" stroke-width="3"/><circle cx="40" cy="44" r="2" fill="${INK}"/><circle cx="56" cy="44" r="2" fill="${INK}"/><path d="M44 52 q4 4 8 0" stroke="${INK}" stroke-width="2" fill="none"/>`, '0 0 96 96', w),
    mailbox: (w = 120) => svg(`
      <rect x="54" y="70" width="12" height="44" fill="#b8763e" stroke="${INK}" stroke-width="3"/>
      <path d="M20 40 C20 18 40 10 60 10 h20 C100 10 108 24 108 40 v34 H20z" fill="#ff5a5a" stroke="${INK}" stroke-width="3.4"/>
      <path d="M80 10 C96 10 104 24 104 40" fill="none" stroke="${INK}" stroke-width="2"/>
      <rect x="30" y="40" width="50" height="8" rx="4" fill="${INK}"/>
      <path d="M108 30 v-20 h18 v12 h-18" fill="#ffe14d" stroke="${INK}" stroke-width="3"/>
      <circle cx="44" cy="58" r="3" fill="${INK}"/><circle cx="64" cy="58" r="3" fill="${INK}"/><path d="M48 64 q6 6 12 0" fill="none" stroke="${INK}" stroke-width="2.4"/>
      <ellipse cx="36" cy="64" rx="4" ry="2.4" fill="#ffb3d1"/><ellipse cx="72" cy="64" rx="4" ry="2.4" fill="#ffb3d1"/>`, '0 0 130 116', w),
    musicbox: (w = 140) => svg(`
      <path d="M14 50 l20 -26 h76 l-20 26z" fill="#ffb3dd" stroke="${INK}" stroke-width="3"/>
      <rect x="14" y="50" width="76" height="46" rx="4" fill="#ff8fc8" stroke="${INK}" stroke-width="3"/>
      <path d="M90 50 l20 -26 v46 l-20 26z" fill="#e8669f" stroke="${INK}" stroke-width="3"/>
      <rect x="26" y="60" width="52" height="26" rx="4" fill="#fff6d8" stroke="${INK}" stroke-width="2.4"/>
      <g class="mb-cyl"><rect x="30" y="66" width="44" height="14" rx="7" fill="#ffd23f" stroke="${INK}" stroke-width="2"/><g fill="${INK}"><circle cx="36" cy="70" r="1.3"/><circle cx="44" cy="76" r="1.3"/><circle cx="52" cy="70" r="1.3"/><circle cx="60" cy="74" r="1.3"/><circle cx="68" cy="69" r="1.3"/></g></g>
      <path d="M110 50 h10 v-8 h6 v20 h-6 v-8" fill="#ffd23f" stroke="${INK}" stroke-width="2.4"/>
      <ellipse cx="62" cy="38" rx="10" ry="4" fill="#fff" stroke="${INK}" stroke-width="2"/>
      <path d="M58 37 q4 -16 8 0" fill="#9fdcff" stroke="${INK}" stroke-width="2"/>`, '0 0 130 100', w),
    cabinet: (w = 110) => svg(`
      <rect x="12" y="8" width="76" height="86" rx="6" fill="#9fdcff" stroke="${INK}" stroke-width="3.2"/>
      ${[0, 1, 2].map(i => `<rect x="20" y="${16 + i * 26}" width="60" height="20" rx="4" fill="#fff6d8" stroke="${INK}" stroke-width="2.6"/><rect x="40" y="${23 + i * 26}" width="20" height="6" rx="3" fill="#ffd23f" stroke="${INK}" stroke-width="2"/>`).join('')}
      <rect x="26" y="4" width="18" height="12" fill="#fff" stroke="${INK}" stroke-width="2" transform="rotate(-10 34 10)"/>
      <rect x="54" y="2" width="20" height="14" fill="#ffb3dd" stroke="${INK}" stroke-width="2" transform="rotate(8 64 9)"/>`, '0 0 100 100', w),
    globe: (w = 90) => svg(`<circle cx="50" cy="46" r="34" fill="#7ec8ff" stroke="${INK}" stroke-width="3"/>
      <path d="M30 26 q10 4 6 14 q-8 6 -2 14 q6 4 2 12 M60 18 q-6 10 6 12 q12 2 8 14 q-6 8 4 14" fill="#8fd16a" stroke="${INK}" stroke-width="2.4"/>
      <path d="M50 80 v10 M34 92 h32" stroke="${INK}" stroke-width="3.4"/>
      <path d="M14 46 a36 36 0 0 0 72 0" fill="none" stroke="#ffd23f" stroke-width="4"/>`, '0 0 100 100', w),
    board: (w = 140, txt = 'A あ 字 é') => svg(`<rect x="6" y="6" width="128" height="78" rx="6" fill="#2f8f6a" stroke="${INK}" stroke-width="3.4"/><rect x="6" y="6" width="128" height="78" rx="6" fill="none" stroke="#b8763e" stroke-width="7" transform="translate(0 0)"/>
      ${(() => {
        const units = t => [...t].reduce((n, ch) => n + (/[\u3000-\u9fff\uac00-\ud7af]/.test(ch) ? 1 : .52), 0);
        const lines = units(txt) * 24 <= 112 ? [txt] : txt.split(/\s*·\s*/);
        const fs = Math.min(24, Math.floor(112 / Math.max(...lines.map(units))), Math.floor(64 / lines.length / 1.15));
        const y0 = 47 - (lines.length - 1) * fs * 1.15 / 2 + fs * .35;
        return lines.map((l, i) => `<text x="70" y="${(y0 + i * fs * 1.15).toFixed(1)}" text-anchor="middle" font-family="Patrick Hand, Itim, sans-serif" font-size="${fs}" fill="#fff">${l}</text>`).join('');
      })()}
      <rect x="100" y="76" width="20" height="5" rx="2" fill="#fff" stroke="${INK}" stroke-width="1.4"/>`, '0 0 140 90', w),
    desk: (w = 140) => svg(`<rect x="10" y="40" width="120" height="12" rx="3" fill="#ffad4d" stroke="${INK}" stroke-width="3"/>
      <path d="M20 52 v34 M120 52 v34" stroke="${INK}" stroke-width="4"/>
      <rect x="30" y="20" width="34" height="22" fill="#fff" stroke="${INK}" stroke-width="2.4" transform="rotate(-6 47 31)"/>
      <path d="M36 26 h20 M36 31 h16 M36 36 h20" stroke="#9aa" stroke-width="1.6" transform="rotate(-6 47 31)"/>
      <path d="M86 40 v-16 h14 v16" fill="#9fdcff" stroke="${INK}" stroke-width="2.4"/>
      <path d="M93 24 l8 -20" stroke="${INK}" stroke-width="2"/><path d="M101 4 q8 4 4 12 q-6 -2 -4 -12" fill="#ff8fc8" stroke="${INK}" stroke-width="1.6"/>`, '0 0 140 90', w),
    shelf: (w = 140) => svg(`<rect x="8" y="10" width="124" height="80" rx="4" fill="#ffe0b0" stroke="${INK}" stroke-width="3"/>
      <path d="M8 50 h124" stroke="${INK}" stroke-width="3"/>
      ${['#ff8fc8', '#7ec8ff', '#ffd23f', '#8fd16a', '#b48cff', '#ff8a3d', '#ff5a5a'].map((c, i) => `<rect x="${16 + i * 15}" y="${18 + (i % 3) * 3}" width="12" height="${30 - (i % 3) * 3}" fill="${c}" stroke="${INK}" stroke-width="2"/>`).join('')}
      ${['#9fdcff', '#ffb3dd', '#fff', '#8fd16a', '#ffd23f'].map((c, i) => `<rect x="${20 + i * 18}" y="${58 + (i % 2) * 4}" width="14" height="${30 - (i % 2) * 4}" fill="${c}" stroke="${INK}" stroke-width="2"/>`).join('')}
      <circle cx="116" cy="74" r="10" fill="#7ec8ff" stroke="${INK}" stroke-width="2.4"/>`, '0 0 140 96', w),
    stamp: (label, c = '#ff5a5a', w = 90) => svg(`<circle cx="50" cy="50" r="42" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="4 3"/><circle cx="50" cy="50" r="34" fill="none" stroke="${c}" stroke-width="2.4"/><text x="50" y="56" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="15" fill="${c}">${label}</text>`, '0 0 100 100', w, 'style="transform:rotate(-12deg)"'),
    envelope: (w = 70, c = '#fff6d8') => svg(`<rect x="4" y="12" width="92" height="60" rx="5" fill="${c}" stroke="${INK}" stroke-width="3"/><path d="M4 16 l46 32 l46 -32" fill="none" stroke="${INK}" stroke-width="3"/><path d="M42 52 c-6 -6 2 -12 8 -6 c6 -6 14 0 8 6 l-8 8z" fill="#ff6fae" stroke="${INK}" stroke-width="1.6"/>`, '0 0 100 80', w),
  };

  /* ---- pixel sprite (ma trận điểm) ---- */
  const SPR = {
    egg: ['....####....', '..##....##..', '.#..##....#.', '.#.####...#.', '#...##.....#', '#......##..#', '#.....####.#', '#......##..#', '#..##......#', '.#####....#.', '.#.......##.', '..##...##...', '....###.....'],
    blob: ['....######....', '..##......##..', '.#..........#.', '#...##..##...#', '#...##..##...#', '#............#', '#..#......#..#', '#...######...#', '.#..........#.', '..##########..', '...#.#..#.#...'],
    blob2: ['....######....', '..##......##..', '.#..........#.', '#..#.#..#.#..#', '#...#....#...#', '#............#', '#....####....#', '#.....##.....#', '.#..........#.', '..##########..', '..#..#..#..#..'],
    pen: ['.........##', '........#.#', '.......#.#.', '......#.#..', '.....#.#...', '....#.#....', '...#.#.....', '..##.......', '.###.......', '#..........'],
    book: ['###########', '#....#....#', '#.##.#.##.#', '#....#....#', '#.##.#.##.#', '#....#....#', '#.##.#.##.#', '#....#....#', '###########'],
    box: ['.#########.', '#.........#', '###########', '#.........#', '#...###...#', '#.........#', '#.........#', '###########'],
    globe: ['...#####...', '.##.#..##..', '#..##...#.#', '#.###..##.#', '#..#..###.#', '#.....##..#', '.#....#..#.', '..##...##..', '....###....'],
    abc: ['.#...###...', '#.#..#..#..', '###..###...', '#.#..#..#..', '#.#..###...', '...........', '..###..###.', '.#....#...#', '.#....#...#', '..###..###.'],
    note: ['....######', '....#....#', '....######', '....#....#', '....#....#', '..###..###', '.####.####', '..##...##.'],
    mail: ['###########', '##.......##', '#.#.....#.#', '#..#...#..#', '#...###...#', '#.........#', '###########'],
    gear: ['....##....', '.#.####.#.', '.########.', '.###..###.', '####..####', '####..####', '.###..###.', '.########.', '.#.####.#.', '....##....'],
    home: ['.....#.....', '....###....', '...#####...', '..#######..', '.#########.', '..#.....#..', '..#.##..#..', '..#.##..#..', '..#######..'],
    heart: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'],
    star: ['....#....', '...###...', '#########', '.#######.', '..#####..', '.###.###.', '.##...##.'],
    pet: ['..#....#..', '.##....##.', '.########.', '#.#....#.#', '#........#', '#..####..#', '.#......#.', '..######..', '..#....#..'],
    clock: ['..#####..', '.#..#..#.', '#...#...#', '#...#...#', '#...###.#', '#.......#', '.#.....#.', '..#####..'],
    cal: ['.#.....#.', '#########', '#.......#', '#########', '#.#.#.#.#', '#.......#', '#.#.#.#.#', '#.......#', '#########'],
    fork: ['#.#.#....', '#.#.#....', '#####....', '..#......', '..#......', '..#......']
  };
  function pixel(name, { px = 4, c = INK, w } = {}) {
    const m = SPR[name] || SPR.egg;
    const h = m.length, wd = Math.max(...m.map(r => r.length));
    let rects = '';
    m.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#') rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`; }));
    return `<svg class="pix" viewBox="0 0 ${wd} ${h}" width="${w || wd * px}" height="${(w ? w / wd : px) * h}" shape-rendering="crispEdges" fill="${c}">${rects}</svg>`;
  }

  /* ---- bản đồ màu theo chủ đề ---- */
  const palette = ['#ff8fc8', '#7ec8ff', '#ffd23f', '#8fd16a', '#b48cff', '#ff8a3d', '#ff5a5a', '#19b5b0', '#ffb3dd', '#9fdcff'];
  const mini = mood => creature('mascot', { mood: mood === 'sad' ? 'sad' : 'joy', size: 28 });

  return { creature, names, deco, pixel, SPR, palette, face, mini, svg };
})();

/* =========================================================
   SCENES — mỗi trang một "căn phòng bổ đôi" vẽ tay, có chú thích
   cam viết tay + mũi tên + chữ hiệu ứng tiếng Nhật (kiểu sách tranh 90s)
   ========================================================= */
Art.scene = (() => {
  const put = (x, y, s, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})">${s}</g>`;
  const lamp = `<path d="M30 0 v40" stroke="${INK}" stroke-width="3"/><path d="M8 40 h44 l-8 -14 h-28z" fill="#ff5a5a" stroke="${INK}" stroke-width="3"/><circle cx="30" cy="48" r="7" fill="#fff6a0" stroke="${INK}" stroke-width="2.5"/><path d="M14 62 l-6 10 M30 64 v12 M46 62 l6 10" stroke="#ffd23f" stroke-width="3"/>`;
  const paper = (c = '#fff') => `<rect width="34" height="42" fill="${c}" stroke="${INK}" stroke-width="2.5"/><path d="M6 10 h22 M6 18 h18 M6 26 h22" stroke="#aab" stroke-width="2"/>`;
  const books = n => [...Array(n)].map((_, i) => `<rect x="${i * 13}" y="${(i % 3) * 3}" width="12" height="${46 - (i % 3) * 3}" fill="${Art.palette[i % 10]}" stroke="${INK}" stroke-width="2.4"/>`).join('');
  const box = (c = '#ffd39a') => `<path d="M0 14 l40 -12 l40 12 v40 l-40 12 l-40 -12z" fill="${c}" stroke="${INK}" stroke-width="3"/><path d="M0 14 l40 12 l40 -12 M40 26 v40" fill="none" stroke="${INK}" stroke-width="3"/>`;
  const frame = (c = '#ffe14d') => `<rect width="60" height="46" rx="3" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="5" y="5" width="50" height="36" fill="${c}"/><path d="M10 36 l14 -16 l10 10 l8 -8 l12 14z" fill="#8fd16a" stroke="${INK}" stroke-width="2"/>`;
  const env = (r = 0) => put(0, 0, Art.deco.envelope(44), r);
  const SC = {
    write: { wall: '#ffe0ee', floor: '#ffc98f', sfx: [[338, 64, 'ひらめいた!', -10, 'or'], [236, 96, 'カキカキ', 8]],
      items: [[40, 34, lamp], [300, 40, Art.deco.shelf(120)], [96, 148, Art.deco.desk(200)], [168, 104, Art.creature('mascot', { size: 78, mood: 'joy' })], [300, 168, Art.creature('pencil', { size: 64, mood: 'wink' })], [380, 172, paper('#fff6d8'), -14], [404, 200, paper(), 10], [60, 112, paper('#e2f4ff'), -8]],
      labels: [[22, 278, 'Bàn viết thần kỳ', 'viết bao nhiêu cũng không mỏi tay', [150, 196]], [440, 150, 'Kệ ý tưởng', 'đầy ắp đề bài', [380, 110], 'end']] },
    archive: { wall: '#d9f0ff', floor: '#a9d6f5', sfx: [[300, 68, 'ゴソゴソ', -8], [262, 150, 'ヒュ〜', 10, 'or']],
      items: [[44, 92, Art.deco.cabinet(130)], [168, 92, Art.deco.cabinet(130)], [312, 58, Art.creature('ghost', { size: 82, mood: 'joy' })], [330, 172, box()], [370, 196, box('#ffb3dd')], [300, 210, env(-12)]],
      labels: [[440, 290, 'Ngăn kéo không đáy', 'cất bao nhiêu cũng vừa', [250, 200], 'end'], [22, 62, 'Bóng-tchi trông kho', '', [330, 90]]] },
    books: { wall: '#fff1b8', floor: '#e8b07a', sfx: [[226, 58, 'ペラペラ', -6], [400, 112, 'ワクワク!', 10, 'or']],
      items: [[34, 70, Art.deco.shelf(170)], [226, 130, Art.deco.globe(110)], [340, 150, Art.creature('booky', { size: 82, mood: 'joy' })], [214, 236, books(6)], [372, 70, frame()]],
      labels: [[22, 286, 'Kệ sách 11 vùng đất', 'vuốt ngang để lướt', [110, 196]], [460, 270, 'Quả địa cầu biết nói', 'bấm vùng nào mở kệ vùng ấy', [290, 220], 'end']] },
    lang: { wall: '#d8f5c8', floor: '#c9a27a', sfx: [[408, 80, 'なるほど!', 12, 'or'], [70, 262, 'ハイ!', -8]],
      items: [[120, 40, Art.deco.board(220, 'あ · A · 字 · é')], [30, 150, Art.creature('prof', { size: 100 })], [330, 184, Art.creature('fish', { size: 60, mood: 'joy' })], [400, 170, Art.creature('tomato', { size: 56, mood: 'star' })], [210, 210, `<rect width="80" height="10" fill="#ffad4d" stroke="${INK}" stroke-width="3"/><path d="M8 10 v26 M72 10 v26" stroke="${INK}" stroke-width="4"/>`]],
      labels: [[460, 290, 'Bảng đen biết đọc to', 'bấm 🔊 là nghe', [300, 120], 'end'], [22, 60, 'Thầy Ếch Kính', 'dạy 12 thứ tiếng', [80, 160]]] },
    mail: { wall: '#ffe0d6', floor: '#f5b878', sfx: [[300, 64, 'ビューン', -12], [96, 262, 'とどいた!', 8, 'or']],
      items: [[40, 110, Art.deco.mailbox(140)], [260, 78, Art.creature('cloud', { size: 84, mood: 'joy' })], [330, 150, env(14)], [380, 108, env(-10)], [230, 190, env(6)], [360, 196, Art.creature('tomato', { size: 56, mood: 'wink' })]],
      labels: [[460, 286, 'Mây đưa thư', 'bay khắp hành tinh mỗi sáng', [300, 130], 'end'], [22, 62, 'Thùng thư', 'gửi được cả cho tương lai', [100, 130]]] },
    stamps: { wall: '#ffd6e6', floor: '#f5b8c8', sfx: [[150, 70, 'ペタッ!', -10, 'or'], [380, 70, 'キラキラ', 8]],
      items: [[60, 100, Art.deco.stamp('GIỎI!', '#e8475f', 100)], [180, 120, Art.deco.stamp('★', '#2f6fd6', 90)], [290, 96, Art.deco.stamp('✓', '#3aa35a', 96)], [80, 200, Art.creature('tomato', { size: 70, mood: 'star' })], [370, 180, Art.creature('star', { size: 76, mood: 'joy' })]],
      labels: [[460, 290, 'Sổ tem quý', 'mỗi thói quen tốt một con dấu', [330, 200], 'end']] },
    quotes: { wall: '#ffe9c8', floor: '#f2c48d', sfx: [[330, 60, 'キラキラ', 10, 'or']],
      items: [[60, 60, `<rect width="110" height="70" fill="#fff6a0" stroke="${INK}" stroke-width="3" transform="rotate(-6)"/><path d="M14 22 h70 M14 36 h60 M14 50 h74" stroke="#aa9" stroke-width="3" transform="rotate(-6)"/>`], [190, 70, `<rect width="100" height="64" fill="#ffd0e6" stroke="${INK}" stroke-width="3" transform="rotate(5)"/><path d="M14 22 h64 M14 38 h52" stroke="#a89" stroke-width="3" transform="rotate(5)"/>`], [300, 120, Art.creature('star', { size: 96, mood: 'joy' })], [90, 170, Art.creature('booky', { size: 70, mood: 'calm' })]],
      labels: [[460, 290, 'Câu hay nhặt được', 'bôi đen khi đọc rồi bấm ❝', [330, 190], 'end']] },
    settings: { wall: '#e3d4ff', floor: '#c4b0f0', sfx: [[300, 60, 'カチャカチャ', -8]],
      items: [[60, 70, Art.pixel('gear', { w: 110 })], [200, 120, Art.creature('mascot', { size: 96 })], [330, 150, box('#b8f0a0')], [340, 70, Art.pixel('clock', { w: 70 })]],
      labels: [[460, 290, 'Phòng máy', 'chỉnh AI, sao lưu dữ liệu', [260, 200], 'end']] },
    pet: { wall: '#fff4cf', floor: '#ffc98f', sfx: [[340, 70, 'すやすや', 8]],
      items: [[60, 140, Art.creature('egg', {})], [200, 110, Art.creature('mascot', { size: 90, mood: 'sleep' })], [340, 160, Art.deco.flower(54, '#ff8fc8')]],
      labels: [] }
  };
  return (kind, w = 480) => {
    const S = SC[kind] || SC.write;
    const id = 'sc' + Math.random().toString(36).slice(2, 7);
    const lab = S.labels.map(([x, y, t, d, to, anchor = 'start']) => {
      const ty = d ? y - 16 : y;
      const sx = anchor === 'end' ? x - 4 : x + 4, sy = ty - 22;
      const mx = (sx + to[0]) / 2 + (anchor === 'end' ? -20 : 20), my = (sy + to[1]) / 2 - 20;
      return `<text x="${x}" y="${ty}" class="sc-t" text-anchor="${anchor}">${t}</text>${d ? `<text x="${x}" y="${y}" class="sc-d" text-anchor="${anchor}">${d}</text>` : ''}
        <path d="M${sx} ${sy} Q${mx} ${my} ${to[0]} ${to[1]}" fill="none" stroke="${INK}" stroke-width="2" marker-end="url(#${id}a)"/>`;
    }).join('');
    return `<svg class="art scene-svg" viewBox="0 0 480 300" width="${w}" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">
      <defs><clipPath id="${id}c"><rect x="14" y="14" width="452" height="272" rx="46"/></clipPath>
        <pattern id="${id}p" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="2.6" fill="#fff" opacity=".7"/></pattern>
        <marker id="${id}a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="${INK}" stroke-width="1.8"/></marker></defs>
      <g clip-path="url(#${id}c)">
        <rect x="14" y="14" width="452" height="272" fill="${S.wall}"/><rect x="14" y="14" width="452" height="90" fill="#fff" opacity=".28"/>
        <rect x="14" y="222" width="452" height="64" fill="${S.floor}"/><path d="M14 222 h452" stroke="${INK}" stroke-width="4"/>
        ${[...Array(12)].map((_, i) => `<path d="M${30 + i * 40} 236 l14 10" stroke="${INK}" stroke-width="2" opacity=".25"/>`).join('')}
        ${S.items.map(([x, y, svg, r]) => put(x, y, svg, r || 0)).join('')}
      </g>
      <rect x="14" y="14" width="452" height="272" rx="46" fill="none" stroke="${INK}" stroke-width="6"/>
    </svg>`;
  };
})();
