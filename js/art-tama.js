/* =========================================================
   NHÂN VẬT KIỂU MÁY NUÔI THÚ THẬP NIÊN 90 (bản vẽ lại)
   Đầu to · thân nhỏ · chân ngắn · mắt hạt đậu · nét bút dạ dày
   má hồng có gạch chéo · màu kẹo phẳng + vệt bóng trắng.
   Toàn bộ là nhân vật gốc của app (không dùng nhân vật có bản quyền).
   Mỗi hàm trả về nội dung SVG cho viewBox 0 0 100 100.
   ========================================================= */
const TAMA = (() => {
  const K = '#1e1a2e', W = 4.6;
  const st = (w = W) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const shadow = (rx = 22) => `<ellipse cx="50" cy="95" rx="${rx}" ry="3.6" fill="${K}" opacity=".13"/>`;
  const shine = (x, y, r = 0, s = 1) => `<path d="M${x} ${y} q${4 * s} ${-6 * s} ${11 * s} ${-7 * s}" fill="none" stroke="#fff" stroke-width="${3.2 * s}" stroke-linecap="round" opacity=".9" transform="rotate(${r} ${x} ${y})"/>`;
  /* má hồng kiểu bút dạ: ô-van hồng + 3 nét gạch */
  const blush = (x, y, s = 1) => `<ellipse cx="${x}" cy="${y}" rx="${5.4 * s}" ry="${3.2 * s}" fill="#ff9ec8"/>
    <path d="M${x - 3.6 * s} ${y + 1.6 * s} l${2.2 * s} ${-3.4 * s} M${x - .6 * s} ${y + 1.8 * s} l${2.2 * s} ${-3.4 * s} M${x + 2.4 * s} ${y + 1.6 * s} l${2 * s} ${-3 * s}" stroke="#e8609e" stroke-width="${1.1 * s}" stroke-linecap="round"/>`;
  /* mắt hạt đậu */
  function eyes(cx, cy, mood, s = 1, gap = 9) {
    const L = cx - gap * s, R = cx + gap * s;
    const bean = x => `<ellipse cx="${x}" cy="${cy}" rx="${2.9 * s}" ry="${4.3 * s}" fill="${K}"/><circle cx="${x + .9 * s}" cy="${cy - 1.8 * s}" r="${1.05 * s}" fill="#fff"/>`;
    const arc = (x, up = 1) => `<path d="M${x - 4 * s} ${cy + 1.5 * s} q${4 * s} ${-7 * up * s} ${8 * s} 0" fill="none" stroke="${K}" stroke-width="${2.8 * s}" stroke-linecap="round"/>`;
    const line = x => `<path d="M${x - 4 * s} ${cy} h${8 * s}" stroke="${K}" stroke-width="${2.8 * s}" stroke-linecap="round"/>`;
    const star = x => `<path d="M${x} ${cy - 5 * s} l${1.6 * s} ${3.4 * s} ${3.7 * s} .4 -${2.8 * s} ${2.5 * s} .9 ${3.7 * s} -${3.4 * s} -${1.9 * s} -${3.4 * s} ${1.9 * s} .9 -${3.7 * s} -${2.8 * s} -${2.5 * s} ${3.7 * s} -.4z" fill="${K}"/>`;
    switch (mood) {
      case 'joy': return arc(L) + arc(R);
      case 'wink': return bean(L) + `<path d="M${R - 4 * s} ${cy - 3 * s} l${7 * s} ${3 * s} l${-7 * s} ${3 * s}" fill="none" stroke="${K}" stroke-width="${2.6 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 'sleep': return line(L) + line(R);
      case 'star': return star(L) + star(R);
      case 'sad': return bean(L) + bean(R) + `<path d="M${L - 4 * s} ${cy - 8 * s} l${6 * s} ${2.2 * s} M${R + 4 * s} ${cy - 8 * s} l${-6 * s} ${2.2 * s}" stroke="${K}" stroke-width="${2 * s}" stroke-linecap="round"/>`;
      default: return bean(L) + bean(R);
    }
  }
  function mouth(cx, cy, mood, s = 1) {
    switch (mood) {
      case 'sleep': return `<ellipse cx="${cx}" cy="${cy + 1 * s}" rx="${2.2 * s}" ry="${1.8 * s}" fill="${K}"/><text x="${cx + 20 * s}" y="${cy - 14 * s}" font-size="${11 * s}" font-family="Baloo 2,sans-serif" font-weight="800" fill="${K}">z</text>`;
      case 'sad': return `<path d="M${cx - 4 * s} ${cy + 3 * s} q${4 * s} ${-5 * s} ${8 * s} 0" fill="none" stroke="${K}" stroke-width="${2.4 * s}" stroke-linecap="round"/>`;
      case 'calm': return `<path d="M${cx - 4 * s} ${cy} q${2 * s} ${3 * s} ${4 * s} 0 q${2 * s} ${3 * s} ${4 * s} 0" fill="none" stroke="${K}" stroke-width="${2.3 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 'wow': return `<ellipse cx="${cx}" cy="${cy + 1.5 * s}" rx="${3.4 * s}" ry="${4.2 * s}" fill="${K}"/><ellipse cx="${cx}" cy="${cy + 3.6 * s}" rx="${2 * s}" ry="${1.4 * s}" fill="#ff7aa8"/>`;
      default: return `<path d="M${cx - 6 * s} ${cy - 1 * s} q${6 * s} ${12 * s} ${12 * s} 0z" fill="${K}" stroke="${K}" stroke-width="${1.4 * s}" stroke-linejoin="round"/><path d="M${cx - 3.2 * s} ${cy + 3.6 * s} q${3.2 * s} ${-3 * s} ${6.4 * s} 0 q${-3.2 * s} ${2.8 * s} ${-6.4 * s} 0" fill="#ff7aa8"/>`;
    }
  }
  const face = (cx, cy, mood = 'happy', s = 1, gap = 9) =>
    blush(cx - (gap + 8) * s, cy + 5 * s, s * .9) + blush(cx + (gap + 8) * s, cy + 5 * s, s * .9) + eyes(cx, cy, mood, s, gap) + mouth(cx, cy + 7 * s, mood, s);
  /* chân ngắn & tay nhỏ */
  const feet = (c, y = 88, gap = 11) => `<path d="M${50 - gap - 9} ${y + 6} q0 -9 9 -9 q8 0 8 9z" fill="${c}" ${st(3.8)}/><path d="M${50 + gap - 8} ${y + 6} q0 -9 8 -9 q9 0 9 9z" fill="${c}" ${st(3.8)}/>`;
  const arms = (c, y = 70, x = 24) => `<path d="M${x + 2} ${y - 4} q-10 2 -12 10 q6 2 12 -2" fill="${c}" ${st(3.6)}/><path d="M${100 - x - 2} ${y - 4} q10 2 12 10 q-6 2 -12 -2" fill="${c}" ${st(3.6)}/>`;

  return {
    /* Mực-tchi: linh vật — đầu kem tròn, mũ giọt mực, áo tím, cầm bút lông */
    mascot(o) {
      const c = o.color || '#fff3c4', h = o.hat || '#7b6cf0';
      return `${shadow(22)}
      ${feet('#ffcf4d', 86, 10)}
      <path d="M33 70 q-2 14 4 18 h26 q6 -4 4 -18z" fill="${h}" ${st()}/>
      ${arms(c, 76, 30)}
      <path d="M74 64 l16 -26" stroke="${K}" stroke-width="4" stroke-linecap="round"/><path d="M88 41 q8 -14 6 -26 q-10 8 -11 22z" fill="#ffe14d" ${st(3)}/>
      <path d="M50 22 C74 22 82 38 82 50 C82 66 68 74 50 74 C32 74 18 66 18 50 C18 38 26 22 50 22Z" fill="${c}" ${st()}/>
      <path d="M50 1 C46 9 33 16 32 25 C31 31 40 33 50 33 C60 33 69 31 68 25 C67 16 54 9 50 1Z" fill="${h}" ${st()}/>
      ${shine(40, 18, -20, .8)}${shine(27, 44, -60, .9)}
      ${face(50, 50, o.mood, 1)}`;
    },
    /* Nốt-tchi: bé hồng tròn, ăng-ten nốt nhạc */
    note(o) {
      const c = o.color || '#ff8fcf';
      return `${shadow(20)}${feet('#ff6fae', 86, 9)}
      <path d="M57 26 V6 q12 2 15 12" fill="none" ${st(4)}/><ellipse cx="52" cy="26" rx="7" ry="5.4" fill="${K}" transform="rotate(-18 52 26)"/>
      ${arms(c, 70, 18)}
      <path d="M50 28 C74 28 84 44 84 60 C84 78 70 88 50 88 C30 88 16 78 16 60 C16 44 26 28 50 28Z" fill="${c}" ${st()}/>
      ${shine(28, 50, -60)}
      ${face(50, 58, o.mood, 1)}`;
    },
    /* Trang-tchi: quyển sách biết đi */
    booky(o) {
      const c = o.color || '#7fd36a';
      return `${shadow(24)}${feet('#ffcf4d', 86, 12)}${arms(c, 64, 16)}
      <path d="M20 16 h56 q6 0 6 6 v62 q0 6 -6 6 h-56 q-4 0 -4 -4 v-66 q0 -4 4 -4z" fill="${c}" ${st()}/>
      <path d="M26 22 h48 v60 h-48z" fill="#fffdf2" ${st(3)}/>
      <path d="M58 16 v16 l5 -4 l5 4 v-16" fill="#ff5a6e" ${st(3)}/>
      ${face(50, 54, o.mood, .95)}`;
    },
    /* Mây-tchi: đám mây có vầng hào quang */
    cloud(o) {
      const c = o.color || '#ffffff';
      return `<ellipse cx="50" cy="15" rx="17" ry="5" fill="none" stroke="#ffcf3a" stroke-width="4"/>
      <path d="M22 82 C6 82 4 60 19 56 C15 36 39 28 47 40 C53 24 79 26 78 46 C95 44 98 74 80 82Z" fill="${c}" ${st()}/>
      ${shine(26, 62, -70, .8)}
      ${face(50, 60, o.mood, .92)}`;
    },
    /* Cà-tchi: cà chua đội mũ lá */
    tomato(o) {
      const c = o.color || '#ff5a5a';
      return `${shadow(22)}${feet('#ffcf4d', 86, 10)}
      <path d="M50 26 C74 26 84 42 84 58 C84 78 70 88 50 88 C30 88 16 78 16 58 C16 42 26 26 50 26Z" fill="${c}" ${st()}/>
      <path d="M50 30 l-14 -6 l7 9 l-14 3 l16 3 l5 7 l5 -7 l16 -3 l-14 -3 l7 -9z" fill="#5cc44f" ${st(3.2)}/>
      <path d="M50 24 q2 -11 9 -14" fill="none" ${st(4)}/>
      ${shine(28, 52, -60)}
      ${face(50, 60, o.mood, .95)}`;
    },
    /* Bóng-tchi: bé ma */
    ghost(o) {
      const c = o.color || '#ece7ff';
      return `<path d="M20 86 V50 C20 26 34 14 50 14 C66 14 80 26 80 50 V86 q-5 -6 -10 0 q-5 -6 -10 0 q-5 -6 -10 0 q-5 -6 -10 0 q-5 -6 -10 0z" fill="${c}" ${st()}/>
      <path d="M21 56 q-11 0 -13 -9 q8 -2 13 2 M79 56 q11 0 13 -9 q-8 -2 -13 2" fill="${c}" ${st(3.6)}/>
      ${shine(30, 36, -55)}
      ${face(50, 46, o.mood || 'wow', 1)}`;
    },
    /* Bút-tchi: bút chì tí hon */
    pencil(o) {
      const c = o.color || '#ffd23f';
      return `${shadow(18)}${feet('#ff8fc8', 88, 8)}
      <path d="M31 22 h38 v52 l-19 16 l-19 -16z" fill="${c}" ${st()}/>
      <path d="M31 74 l19 16 l19 -16z" fill="#ffd9b0" ${st(3)}/><path d="M45 86 l5 4 l5 -4z" fill="${K}"/>
      <rect x="31" y="8" width="38" height="16" rx="5" fill="#ff8fc8" ${st()}/>
      ${shine(37, 46, -80, .8)}
      ${face(50, 46, o.mood, .85)}`;
    },
    /* Sao-tchi: ngôi sao cánh tròn */
    star(o) {
      const c = o.color || '#ffe14d';
      return `${shadow(18)}
      <path d="M50 6 C54 6 56 24 62 30 C68 35 90 32 92 37 C94 42 76 52 73 60 C70 68 80 88 76 91 C71 94 56 80 50 80 C44 80 29 94 24 91 C20 88 30 68 27 60 C24 52 6 42 8 37 C10 32 32 35 38 30 C44 24 46 6 50 6Z" fill="${c}" ${st()}/>
      ${shine(36, 40, -50, .8)}
      ${face(50, 52, o.mood, .82, 8)}`;
    },
    /* Cá-tchi */
    fish(o) {
      const c = o.color || '#5cb8ff';
      return `<path d="M70 48 l20 -16 q4 18 0 36 l-20 -14z" fill="#ffd23f" ${st(4)}/>
      <path d="M44 22 C66 22 76 38 76 52 C76 68 64 80 44 80 C24 80 12 68 12 52 C12 36 24 22 44 22Z" fill="${c}" ${st()}/>
      <path d="M36 24 q6 -14 20 -8 q-4 6 -6 10" fill="${c}" ${st(3.4)}/>
      ${shine(20, 48, -60)}
      ${face(42, 50, o.mood, .85, 8)}`;
    },
    /* Ếch Kính: thầy giáo — đầu ếch to, kính tròn, nơ đỏ, áo khoác trắng */
    prof(o) {
      const c = o.color || '#8fdc6a';
      return `${shadow(24)}${feet('#ffcf4d', 87, 10)}
      <path d="M32 70 q-3 14 3 18 h30 q6 -4 3 -18z" fill="#fff" ${st()}/><path d="M50 72 v14" stroke="${K}" stroke-width="2.4"/>
      ${arms('#fff', 76, 28)}
      <circle cx="31" cy="24" r="12" fill="${c}" ${st()}/><circle cx="69" cy="24" r="12" fill="${c}" ${st()}/>
      <path d="M50 24 C76 24 86 38 86 50 C86 66 70 74 50 74 C30 74 14 66 14 50 C14 38 24 24 50 24Z" fill="${c}" ${st()}/>
      <ellipse cx="31" cy="24" rx="4.2" ry="5.6" fill="${K}"/><ellipse cx="69" cy="24" rx="4.2" ry="5.6" fill="${K}"/>
      <circle cx="32.4" cy="22" r="1.5" fill="#fff"/><circle cx="70.4" cy="22" r="1.5" fill="#fff"/>
      <circle cx="38" cy="47" r="9.5" fill="#e6f6ff" fill-opacity=".7" ${st(3)}/><circle cx="62" cy="47" r="9.5" fill="#e6f6ff" fill-opacity=".7" ${st(3)}/><path d="M47.5 47 h5" stroke="${K}" stroke-width="3"/>
      <circle cx="38" cy="47.5" r="2.6" fill="${K}"/><circle cx="62" cy="47.5" r="2.6" fill="${K}"/>
      ${blush(22, 58, .9)}${blush(78, 58, .9)}
      <path d="M41 62 q9 7 18 0" fill="none" stroke="${K}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M50 74 l-9 -5 v10z M50 74 l9 -5 v10z" fill="#ff4f6e" ${st(2.6)}/><circle cx="50" cy="74" r="2.6" fill="#ff4f6e" ${st(2)}/>
      ${shine(22, 40, -70, .8)}`;
    },
    /* Trứng — vỏ trứng kem có chấm màu như máy nuôi thú */
    egg(o) {
      const c = o.color || '#fffaf0';
      return `${shadow(20)}
      <path d="M50 6 C72 6 85 42 85 60 C85 80 70 92 50 92 C30 92 15 80 15 60 C15 42 28 6 50 6Z" fill="${c}" ${st()}/>
      <circle cx="37" cy="36" r="6" fill="#ff8fcf" ${st(2.6)}/><circle cx="62" cy="30" r="4.5" fill="#5cb8ff" ${st(2.6)}/>
      <circle cx="65" cy="62" r="7" fill="#ffe14d" ${st(2.6)}/><circle cx="33" cy="68" r="5.5" fill="#7fd36a" ${st(2.6)}/><circle cx="50" cy="50" r="3.6" fill="#b48cff" ${st(2.2)}/>
      ${shine(30, 26, -60, .8)}
      ${o.crack ? `<path d="M17 56 l10 -6 l8 8 l10 -10 l8 8 l10 -8 l8 6 l11 -4" fill="none" ${st(3.4)}/>` : ''}`;
    }
  };
})();
